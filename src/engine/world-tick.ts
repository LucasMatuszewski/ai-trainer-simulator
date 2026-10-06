/**
 * WS4 world-tick scheduler + steered ambient wrapper (ADR-0009 D-48/
 * D-49/D-56, PRD-jev Flow B, C-77).
 *
 * The office decides in BULK: every 6 real seconds of unpaused
 * simulation (plus every period transition) this module builds ONE
 * world projection (`src/game/world-projection.ts`) and sends ONE
 * batched request covering every due decision:
 *
 *  - per chatting pair: who starts (choice over the two speakers) and
 *    WHICH exchange they say — with EVERY eligible exchange from the
 *    period-correct pool (office vs lunch, filtered by BOTH speakers'
 *    SPEAKER_TOPICS affinities, C-77: chatter at scale) as a candidate;
 *  - per destination NPC: where they go NEXT period (choice over
 *    stay-at-desk + every authored random destination), prefetched
 *    during the current period and consumed at the transition.
 *
 * Greetings are deliberately NOT here (WS1's greeting wrapper owns
 * them); purposeful idle actions are WS6. No retries on this path
 * (D-48); 700 ms hard cutoff; single-flight (ticks during a request
 * are skipped, time does not bank); circuit breaker: 3 consecutive
 * provider failures stop ambient calls for 60 s (D-56).
 *
 * Serving follows the greeting-wrapper pattern (prefetch -> store ->
 * instant hook -> honest logging): `install()` swaps the four WS0
 * chatter/destination hooks for memo-backed versions that return the
 * stored answer INSTANTLY and fall back to the injected legacy pickers
 * the moment anything is off (cold cache, stale day, stale pool, unknown
 * candidate, low confidence). A steered `null` destination ("stay at
 * desk") is a DECISION and serves without a legacy roll — the events
 * dispatcher checks hook presence before falling back. Every decision
 * applies exactly once (D-58): the memo is consumed at serve time.
 *
 * Per-subject validation (D-49/Flow B step 3): a bad answer falls back
 * for THAT subject only — valid siblings still steer. Logging is one
 * decision-log entry per judged subject: "applied"/"shadow" per valid
 * answer, "rejected" per invalid one, "legacy" on provider failure,
 * "stale" when a stored answer is discovered outdated at serve time.
 * `?jev=off` (mode "off") constructs nothing; `?jev=shadow` judges and
 * logs but never stores and never installs (D-55).
 */

import type {
  DecisionClient,
  DecisionHooks,
  JevQuestion,
} from "../jev/contracts";
import { createResolvingClient } from "../jev/client";
import { unconfiguredDecisionClient } from "../jev/unconfigured-client";
import { logDecision } from "../jev/decision-log";
import {
  buildWorldTickProjection,
  type ProjectionNpcFact,
} from "../game/world-projection";
import {
  pairKey as chatterPairKey,
  pickExchange,
  pickPair,
  pickStarter,
  type ChatterPair,
} from "./chatter";
import {
  OFFICE_CHATTER,
  SPEAKER_TOPICS,
  chatterWeightFor,
  type ChatterExchange,
} from "../content/office-chatter";
import { LUNCH_CHATTER } from "../content/lunch-dialogues";
import {
  RANDOM_DESTINATIONS,
  pickRandomDestination as legacyPickRandomDestination,
  type Period,
  type ScheduleEntry,
} from "../content/npc-schedule";
import { NPCS } from "../content/npcs";
import type { NpcId } from "../types";

/** D-48/D-56 ambient budget: 700 ms hard cutoff, never retried. */
export const WORLD_TICK_BUDGET_MS = 700;
/** D-48 cadence: one tick every 6 real seconds of unpaused simulation. */
export const WORLD_TICK_INTERVAL_S = 6;
/** D-56 circuit breaker: 3 consecutive provider failures open it. */
export const WORLD_TICK_BREAKER_THRESHOLD = 3;
/** D-56 circuit breaker: ambient calls stop for 60 s while open. */
export const WORLD_TICK_BREAKER_COOLDOWN_S = 60;
/** D-60 chatter rows (starter/exchange): cosmetic, confidence >= 0.3. */
export const CHATTER_MIN_CONFIDENCE = 0.3;
/** D-60 destination row: consequential, conservative confidence >= 0.5. */
export const DESTINATION_MIN_CONFIDENCE = 0.5;
/** Purposeful actions are low-stakes (a walk to the machine) — same
 *  cosmetic bar as chatter: a wrong coffee is cheap. */
export const ACTION_MIN_CONFIDENCE = 0.3;

/** The period each period's destination prefetch is FOR. Evening rolls
 *  over into the next day's morning. */
const NEXT_PERIOD: Readonly<Record<Period, Period>> = {
  morning: "lunch",
  lunch: "afternoon",
  afternoon: "evening",
  evening: "morning",
};

export type WorldTickMode = "live" | "shadow" | "off";

/** Live game-state getters the orchestrator wires (all cheap, sync). */
export interface WorldTickProviders {
  getDay: () => number;
  getPeriod: () => Period;
  /** Chatting pairs currently eligible (the controller's
   *  `candidatePairs` output — radius/cooldown/active-room filtered). */
  getChatCandidates?: () => readonly ChatterPair[];
  /** NPCs due a next-period destination pre-decision. */
  getDestinationNpcs?: () => readonly string[];
  /** Today's fired random-event slugs (allowlisted content ids). */
  getFiredEvents?: () => readonly string[];
  /** Pair relationship bands keyed by `pairs.<a>_<b>` projection keys. */
  getRelationshipBands?: () => Readonly<Record<string, string>>;
  /** Live need levels per NPC id (0-100) — projected as named bands. */
  getNpcNeeds?: () => Readonly<Record<string, { caffeine: number; social: number }>>;
  /** NPCs due a purposeful-action decision this tick (arrived, at desk,
   *  idle — the same gate the legacy craving scan applies). */
  getActionCandidates?: () => readonly string[];
}

/**
 * The WS0 legacy fallbacks this wrapper serves when steering is off for
 * a subject. Production binds these with `createDefaultDecisionHooks`
 * so the controller's rng stream is consumed exactly where the pre-seam
 * call sites consumed it (TAC-01 rng-order preservation).
 */
export interface WorldTickLegacyHooks {
  pickChatterPair?: (pairs: readonly ChatterPair[]) => ChatterPair | null;
  pickChatterStarter?: (a: NpcId, b: NpcId) => string;
  pickChatterExchange?: (pool: readonly ChatterExchange[], starterId: NpcId) => ChatterExchange;
  pickRandomDestination?: (npcId: NpcId, period: Period) => ScheduleEntry | null;
}

export interface WorldTickOptions {
  /** The WS0 hook holder to install into (production: jevDecisionHooks). */
  hooks: DecisionHooks;
  providers: WorldTickProviders;
  /** Decision client. Default: the resolving client (key provider);
   *  mode "off" never constructs one. */
  client?: DecisionClient;
  /** `?jev=` mode. Default "live". */
  mode?: WorldTickMode;
  /** Request budget in ms. Default 700 (D-48 ambient hard cutoff). */
  timeoutMs?: number;
  /** Tick cadence in unpaused real seconds. Default 6 (D-48). */
  tickIntervalSeconds?: number;
  /** Consecutive failures before the breaker opens. Default 3. */
  breakerThreshold?: number;
  /** Breaker cooldown in seconds. Default 60 (D-56). */
  breakerCooldownSeconds?: number;
  /** D-60 threshold overrides (tests). */
  minChatterConfidence?: number;
  minDestinationConfidence?: number;
  minActionConfidence?: number;
  /** Injectable clock (tests). */
  now?: () => number;
  /** Legacy fallback pickers (see WorldTickLegacyHooks). */
  legacy?: WorldTickLegacyHooks;
}

export interface WorldTickHandle {
  /** Feed UNPAUSED active frame time (the orchestrator calls this from
   *  its frame loop only while the simulation clock advances). */
  update(dtRealSeconds: number): void;
  /** Pre-decide immediately at a period transition. */
  onPeriodTransition(): void;
  /**
   * The steered purposeful action for this NPC NOW ("coffee-machine" or
   * "stay"), consuming the memo; null when unsteered or stale (the
   * orchestrator then falls back to its deterministic craving scan).
   */
  getActionMemo(npcId: string): "coffee-machine" | "stay" | null;
  /** Install the steered WS0 hooks. No-op unless live + configured. */
  install(): void;
  /** Remove the steered hooks (restores any pre-existing ones). */
  uninstall(): void;
  isInstalled(): boolean;
  isBreakerOpen(): boolean;
  isInFlight(): boolean;
}

interface ChatMemo {
  key: string;
  a: string;
  b: string;
  day: number;
  /** Steered starter npc id, or null when that answer fell back. */
  starter: string | null;
  /** Steered exchange object (pool identity-checked at serve), or null. */
  exchange: ChatterExchange | null;
}

interface DestMemo {
  day: number;
  /** The period this destination was decided FOR (the next one). */
  period: Period;
  /** Steered entry, or null = stay at desk (a decision, not an absence). */
  entry: ScheduleEntry | null;
}

/** The purposeful action an NPC takes THIS period ("stay" = keep working). */
type SteeredAction = "coffee-machine" | "stay";

interface ActionMemo {
  day: number;
  period: Period;
  action: SteeredAction;
}

/**
 * ALL eligible exchanges for a pair: general lines plus lines whose
 * topic BOTH speakers may start (C-77 scale; the legacy picker filters
 * by the starter only — the steered batch narrows to the intersection
 * so no candidate can embarrass its speaker, per the WS4 brief).
 */
export function eligibleExchangesForPair(
  pool: readonly ChatterExchange[],
  a: string,
  b: string,
): ChatterExchange[] {
  const topicsA = SPEAKER_TOPICS[a] ?? [];
  const topicsB = SPEAKER_TOPICS[b] ?? [];
  return pool.filter(
    (exchange) =>
      exchange.topic === undefined ||
      (topicsA.includes(exchange.topic) && topicsB.includes(exchange.topic)),
  );
}

function poolForPeriod(period: Period): readonly ChatterExchange[] {
  return period === "lunch" ? LUNCH_CHATTER : OFFICE_CHATTER;
}

function poolName(pool: readonly ChatterExchange[]): "office" | "lunch" {
  return pool === LUNCH_CHATTER ? "lunch" : "office";
}

export function createWorldTickWrapper(options: WorldTickOptions): WorldTickHandle {
  const hooks = options.hooks;
  const providers = options.providers;
  const mode = options.mode ?? "live";
  const off = mode === "off";
  const shadow = mode === "shadow";
  const client =
    options.client ?? (off ? unconfiguredDecisionClient : createResolvingClient());
  const timeoutMs = options.timeoutMs ?? WORLD_TICK_BUDGET_MS;
  const tickIntervalSeconds = options.tickIntervalSeconds ?? WORLD_TICK_INTERVAL_S;
  const breakerThreshold = options.breakerThreshold ?? WORLD_TICK_BREAKER_THRESHOLD;
  const breakerCooldownMs =
    (options.breakerCooldownSeconds ?? WORLD_TICK_BREAKER_COOLDOWN_S) * 1000;
  const minChatter = options.minChatterConfidence ?? CHATTER_MIN_CONFIDENCE;
  const minDestination = options.minDestinationConfidence ?? DESTINATION_MIN_CONFIDENCE;
  const minAction = options.minActionConfidence ?? ACTION_MIN_CONFIDENCE;
  const now = options.now ?? (() => Date.now());

  const legacy: Required<WorldTickLegacyHooks> = {
    pickChatterPair: (pairs) => pickPair(pairs, Math.random),
    pickChatterStarter: (a, b) => pickStarter(a, b, Math.random),
    pickChatterExchange: (pool, starterId) => pickExchange(pool, Math.random, starterId),
    pickRandomDestination: (npcId, period) =>
      legacyPickRandomDestination(npcId as NpcId, Math.random, providers.getDay(), period),
    ...options.legacy,
  };

  const chatMemos = new Map<string, ChatMemo>();
  const destMemos = new Map<string, DestMemo>();
  const actionMemos = new Map<string, ActionMemo>();
  let installed = false;
  let previousHooks: Pick<
    DecisionHooks,
    "pickChatterPair" | "pickChatterStarter" | "pickChatterExchange" | "pickRandomDestination"
  > = {};
  let accumulator = 0;
  let inFlight = false;
  let consecutiveFailures = 0;
  let breakerOpenUntil = 0;
  /** The pair the controller is currently starting (pair hook -> starter
   *  hook -> exchange hook run back-to-back inside one frame). */
  let pendingPairKey: string | null = null;
  let requestSeq = 0;

  const breakerOpen = (): boolean => now() < breakerOpenUntil;

  /** Read an optional provider with throw containment: a broken getter
   *  degrades to the default instead of killing the frame. */
  function tryProvider<T>(read: () => T | undefined, fallback: T): T {
    try {
      return read() ?? fallback;
    } catch {
      return fallback;
    }
  }

  function npcFact(id: string, room?: string): ProjectionNpcFact {
    const npc = NPCS.find((candidate) => candidate.id === id);
    return {
      id,
      name: npc?.name ?? id,
      role: npc?.role ?? "",
      ...(room !== undefined ? { room } : {}),
    };
  }

  // ── the tick: one batched request for every due decision ────────────

  async function tick(): Promise<void> {
    if (off || inFlight || breakerOpen() || !client.isConfigured()) return;

    const pairs = tryProvider(() => providers.getChatCandidates?.(), [] as readonly ChatterPair[]);
    const destNpcs = tryProvider(() => providers.getDestinationNpcs?.(), [] as readonly string[]);
    const actionNpcs = tryProvider(
      () =>
        providers.getActionCandidates?.().filter((npcId) => {
          // One decision per NPC per period: a fresh memo skips the
          // re-judge (same freshness rule as the destinations).
          const memo = actionMemos.get(npcId);
          return !(
            memo !== undefined &&
            memo.day === providers.getDay() &&
            memo.period === providers.getPeriod()
          );
        }),
      [] as readonly string[],
    );
    if (pairs.length === 0 && destNpcs.length === 0 && actionNpcs.length === 0) return;

    // A broken day/period getter aborts the tick: every downstream key
    // (generation, freshness, pool choice) would be fabricated.
    let day: number;
    let period: Period;
    try {
      day = providers.getDay();
      period = providers.getPeriod();
    } catch {
      return;
    }
    const next = NEXT_PERIOD[period];
    const pool = poolForPeriod(period);
    const poolId = poolName(pool);

    // Per-subject namespaced projection (D-48/D-49): roster from the due
    // subjects, bands/events from the wired providers.
    const roster: ProjectionNpcFact[] = [];
    const rosterIds = new Set<string>();
    for (const pair of pairs) {
      for (const id of [pair.a, pair.b]) {
        if (!rosterIds.has(id)) {
          rosterIds.add(id);
          roster.push(npcFact(id, pair.room));
        }
      }
    }
    for (const id of destNpcs) {
      if (!rosterIds.has(id)) {
        rosterIds.add(id);
        roster.push(npcFact(id));
      }
    }
    for (const id of actionNpcs) {
      if (!rosterIds.has(id)) {
        rosterIds.add(id);
        roster.push(npcFact(id));
      }
    }
    const needs = tryProvider(
      () => providers.getNpcNeeds?.(),
      {} as Record<string, { caffeine: number; social: number }>,
    );
    for (const rosterEntry of roster) {
      const npcNeeds = needs[rosterEntry.id];
      if (npcNeeds !== undefined) rosterEntry.needs = npcNeeds;
    }
    const projection = buildWorldTickProjection({
      day,
      period,
      npcRoster: roster,
      pairs: pairs.map((pair) => ({ a: pair.a, b: pair.b, distance: pair.distance })),
      events: tryProvider(() => providers.getFiredEvents?.(), [] as readonly string[]),
      relationshipBands: tryProvider(
        () => providers.getRelationshipBands?.(),
        {} as Record<string, string>,
      ),
    });

    // ONE request: two questions per pair (starter + exchange over ALL
    // eligible exchanges, C-77) plus one per destination.
    const plannedPairs: {
      pair: ChatterPair;
      key: string;
      eligible: readonly ChatterExchange[];
    }[] = [];
    const plannedDests: string[] = [];
    const plannedActions: string[] = [];
    const questions: JevQuestion[] = [];
    for (const pair of pairs) {
      const key = chatterPairKey(pair.a, pair.b);
      const eligible = eligibleExchangesForPair(pool, pair.a, pair.b);
      if (eligible.length === 0) continue; // nothing eligible: serve-time legacy
      plannedPairs.push({ pair, key, eligible });
      const factA = npcFact(pair.a);
      const factB = npcFact(pair.b);
      questions.push({
        id: `chatter-starter:${key}`,
        type: "choice",
        subjectId: key,
        prompt:
          `Coworkers ${pair.a} and ${pair.b} (${factA.name} and ${factB.name}) ` +
          `are about to chat in the ${period} office. Choose the candidate id ` +
          `of the one who should speak first.`,
        candidates: [
          {
            id: `starter:${pair.a}`,
            description: `${factA.name} (${factA.role})`,
            priority: chatterWeightFor(pair.a),
          },
          {
            id: `starter:${pair.b}`,
            description: `${factB.name} (${factB.role})`,
            priority: chatterWeightFor(pair.b),
          },
        ],
      });
      questions.push({
        id: `chatter-exchange:${key}`,
        type: "choice",
        subjectId: key,
        prompt:
          `Pick the one-liner the pair ${pair.a}/${pair.b} says in the ` +
          `${period} office. Choose the candidate id whose line fits both ` +
          `speakers and the moment best.`,
        candidates: eligible.map((exchange, index) => ({
          id: `exchange:${poolId}:${index}`,
          description: exchange.starter,
          priority: index,
        })),
      });
    }
    for (const npcId of destNpcs) {
      // Wave-2 verdict fix: skip NPCs whose memo for the UPCOMING period
      // is already fresh — re-judging the same destination every tick
      // burned tokens and could flip an unconsumed pre-decided answer.
      const existing = destMemos.get(npcId);
      if (
        existing !== undefined &&
        existing.day === providers.getDay() &&
        existing.period === next
      ) {
        continue;
      }
      const fact = npcFact(npcId);
      plannedDests.push(npcId);
      questions.push({
        id: `destination:${npcId}`,
        type: "choice",
        subjectId: npcId,
        prompt:
          `Pick where coworker ${npcId} (${fact.name}, ${fact.role}) goes next ` +
          `period (${next}). "stay" keeps them at their desk.`,
        candidates: [
          { id: "dest:stay", description: "stay at the desk", priority: 0 },
          ...RANDOM_DESTINATIONS.map((entry, index) => ({
            id: `dest:${index}`,
            description: entry.state,
            priority: index + 1,
          })),
        ],
      });
    }
    for (const npcId of actionNpcs) {
      const fact = npcFact(npcId);
      const need = needs[npcId];
      const caffeine = need?.caffeine ?? 100;
      plannedActions.push(npcId);
      questions.push({
        id: `action:${npcId}`,
        type: "choice",
        subjectId: npcId,
        prompt:
          `Coworker ${npcId} (${fact.name}, ${fact.role}) has a free moment in ` +
          `the ${period} office. Caffeine ${caffeine}/100 ` +
          `(craving < 25), social ${need?.social ?? 100}/100. ` +
          `Pick what they do: a quick coffee break, or keep working.`,
        candidates: [
          {
            id: "action:coffee-machine",
            description: "walk to the coffee machine and take a short break",
            priority: caffeine < 25 ? 2 : 0,
          },
          {
            id: "action:stay",
            description: "keep working at the desk",
            priority: 1,
          },
        ],
      });
    }
    if (questions.length === 0) return;

    inFlight = true;
    try {
      const startedAt = now();
      let result;
      try {
        result = await client.request(projection, questions, {
          decisionId: `worldtick-day${day}-${(requestSeq += 1)}`,
          generation: `day-${day}`,
          surface: "chatter-exchange",
          timeoutMs,
          retries: 0, // D-48: the ambient path never waits for retries
        });
      } catch {
        result = { ok: false as const, reason: "network" as const };
      }
      const latencyMs = Math.max(0, now() - startedAt);

      if (!result.ok) {
        // One request failed: every due subject falls back together
        // (Flow C), and the breaker counts one consecutive failure.
        consecutiveFailures += 1;
        if (consecutiveFailures >= breakerThreshold) {
          breakerOpenUntil = now() + breakerCooldownMs;
        }
        for (const planned of plannedPairs) {
          logDecision({
            time: now(),
            subject: planned.key,
            surface: "chatter-exchange",
            outcome: "legacy",
            latencyMs,
            fallback: true,
            fallbackReason: `provider-${result.reason}`,
          });
        }
        for (const npcId of plannedDests) {
          logDecision({
            time: now(),
            subject: npcId,
            surface: "destination",
            outcome: "legacy",
            latencyMs,
            fallback: true,
            fallbackReason: `provider-${result.reason}`,
          });
        }
        for (const npcId of plannedActions) {
          logDecision({
            time: now(),
            subject: npcId,
            surface: "purposeful-action",
            outcome: "legacy",
            latencyMs,
            fallback: true,
            fallbackReason: `provider-${result.reason}`,
          });
        }
        return;
      }
      consecutiveFailures = 0;

      // Per-subject validation (D-49 / Flow B step 3): each answer must
      // name a KNOWN candidate id; a bad one falls back for THAT subject
      // only — valid siblings still steer.
      for (const planned of plannedPairs) {
        const entry = { time: now(), subject: planned.key, latencyMs };
        const starterAnswer = result.answers.find(
          (candidate) => candidate.questionId === `chatter-starter:${planned.key}`,
        );
        const exchangeAnswer = result.answers.find(
          (candidate) => candidate.questionId === `chatter-exchange:${planned.key}`,
        );

        let starter: string | null = null;
        if (starterAnswer === undefined) {
          logDecision({ ...entry, surface: "chatter-exchange", outcome: "rejected", fallback: true, fallbackReason: "missing-answer" });
        } else if (starterAnswer.type !== "choice") {
          logDecision({ ...entry, surface: "chatter-exchange", outcome: "rejected", fallback: true, fallbackReason: "malformed-answer" });
        } else if (
          starterAnswer.id !== `starter:${planned.pair.a}` &&
          starterAnswer.id !== `starter:${planned.pair.b}`
        ) {
          logDecision({ ...entry, surface: "chatter-exchange", outcome: "rejected", fallback: true, fallbackReason: "unknown-candidate", confidence: starterAnswer.confidence });
        } else if (!Number.isFinite(starterAnswer.confidence) || starterAnswer.confidence < minChatter) {
          logDecision({ ...entry, surface: "chatter-exchange", outcome: "rejected", fallback: true, fallbackReason: "low-confidence", confidence: starterAnswer.confidence });
        } else {
          starter = starterAnswer.id.slice("starter:".length);
          logDecision({
            ...entry,
            surface: "chatter-exchange",
            outcome: shadow ? "shadow" : "applied",
            fallback: false,
            chosenId: starterAnswer.id,
            confidence: starterAnswer.confidence,
          });
        }

        let exchange: ChatterExchange | null = null;
        if (exchangeAnswer === undefined) {
          logDecision({ ...entry, surface: "chatter-exchange", outcome: "rejected", fallback: true, fallbackReason: "missing-answer" });
        } else if (exchangeAnswer.type !== "choice") {
          logDecision({ ...entry, surface: "chatter-exchange", outcome: "rejected", fallback: true, fallbackReason: "malformed-answer" });
        } else {
          // Candidate ids index into the eligible list that was sent.
          // EXACT membership (closure verdict): rebuild the id that was
          // sent and require equality — "exchange:<pool>:00" or any
          // never-sent id is rejected, never parsed into candidate zero.
          const expectedId = (index: number): string =>
            `exchange:${poolId}:${index}`;
          const index = planned.eligible.findIndex(
            (_entry, i) => exchangeAnswer.id === expectedId(i),
          );
          if (index < 0) {
            logDecision({ ...entry, surface: "chatter-exchange", outcome: "rejected", fallback: true, fallbackReason: "unknown-candidate", confidence: exchangeAnswer.confidence });
          } else if (!Number.isFinite(exchangeAnswer.confidence) || exchangeAnswer.confidence < minChatter) {
            logDecision({ ...entry, surface: "chatter-exchange", outcome: "rejected", fallback: true, fallbackReason: "low-confidence", confidence: exchangeAnswer.confidence });
          } else {
            exchange = planned.eligible[index]!;
            logDecision({
              ...entry,
              surface: "chatter-exchange",
              outcome: shadow ? "shadow" : "applied",
              fallback: false,
              chosenId: exchangeAnswer.id,
              confidence: exchangeAnswer.confidence,
            });
          }
        }

        if (shadow) continue; // D-55: judged + logged, never stored/steering
        chatMemos.set(planned.key, {
          key: planned.key,
          a: planned.pair.a,
          b: planned.pair.b,
          day,
          starter,
          exchange,
        });
      }

      for (const npcId of plannedDests) {
        const entry = { time: now(), subject: npcId, latencyMs };
        const answer = result.answers.find(
          (candidate) => candidate.questionId === `destination:${npcId}`,
        );
        let dest: ScheduleEntry | null = null;
        let chosenId: string | undefined;
        let confidence: number | undefined;
        let fallbackReason: string;
        if (answer === undefined) {
          fallbackReason = "missing-answer";
        } else if (answer.type !== "choice") {
          fallbackReason = "malformed-answer";
        } else if (answer.id !== "dest:stay" && !/^dest:\d+$/.test(answer.id)) {
          fallbackReason = "unknown-candidate";
        } else {
          const index =
            answer.id === "dest:stay" ? -1 : Number(answer.id.slice("dest:".length));
          if (index >= RANDOM_DESTINATIONS.length) {
            fallbackReason = "unknown-candidate";
          } else if (!Number.isFinite(answer.confidence) || answer.confidence < minDestination) {
            fallbackReason = "low-confidence";
          } else {
            // dest:stay maps to null = "stay at desk" (legacy contract).
            dest = index === -1 ? null : RANDOM_DESTINATIONS[index] ?? null;
            chosenId = answer.id;
            confidence = answer.confidence;
            fallbackReason = "";
          }
        }
        const valid = fallbackReason === "";
        logDecision({
          ...entry,
          surface: "destination",
          outcome: valid ? (shadow ? "shadow" : "applied") : "rejected",
          fallback: !valid,
          ...(valid ? { chosenId, confidence } : { fallbackReason }),
        });
        if (shadow || !valid) continue;
        destMemos.set(npcId, { day, period: next, entry: dest });
      }

      // ── purposeful-action answers (closure verdict: the world-tick
      // layer owns the walk/use/return DECISION; the orchestrator only
      // executes it). One choice per NPC per period; "stay" is a
      // decision too (a memo, not an absence).
      for (const npcId of plannedActions) {
        const entry = { time: now(), subject: npcId, latencyMs };
        const answer = result.answers.find(
          (candidate) => candidate.questionId === `action:${npcId}`,
        );
        let action: SteeredAction | null = null;
        let chosenId: string | undefined;
        let confidence: number | undefined;
        let fallbackReason: string;
        if (answer === undefined) {
          fallbackReason = "missing-answer";
        } else if (answer.type !== "choice") {
          fallbackReason = "malformed-answer";
        } else if (answer.id !== "action:coffee-machine" && answer.id !== "action:stay") {
          // EXACT membership: never parse an unknown id into an action.
          fallbackReason = "unknown-candidate";
        } else if (!Number.isFinite(answer.confidence) || answer.confidence < minAction) {
          fallbackReason = "low-confidence";
        } else {
          action = answer.id === "action:coffee-machine" ? "coffee-machine" : "stay";
          chosenId = answer.id;
          confidence = answer.confidence;
          fallbackReason = "";
        }
        const valid = fallbackReason === "";
        logDecision({
          ...entry,
          surface: "purposeful-action",
          outcome: valid ? (shadow ? "shadow" : "applied") : "rejected",
          fallback: !valid,
          ...(valid ? { chosenId, confidence } : { fallbackReason }),
        });
        if (shadow || !valid) continue;
        if (action === null) continue;
        actionMemos.set(npcId, { day, period, action });
      }
    } finally {
      inFlight = false;
    }
  }

  /** Never rejects: the frame loop must not feed on unhandled promises. */
  function runTick(): void {
    void tick().catch(() => undefined);
  }

  // ── scheduler ───────────────────────────────────────────────────────

  function update(dtRealSeconds: number): void {
    // Single-flight: ticks during a request are skipped and the time in
    // between is dropped — no banked catch-up burst after settle.
    if (off || inFlight || breakerOpen()) return;
    accumulator += Math.max(0, dtRealSeconds);
    if (accumulator < tickIntervalSeconds) return;
    accumulator = 0;
    runTick();
  }

  function onPeriodTransition(): void {
    if (off) return;
    runTick();
  }

  // ── WS0 hooks: instant serve, per-subject legacy fallback ───────────

  function hookPickChatterPair(pairs: readonly ChatterPair[]): ChatterPair | null {
    pendingPairKey = null;
    try {
      const day = providers.getDay();
      for (const pair of pairs) {
        const key = chatterPairKey(pair.a, pair.b);
        const memo = chatMemos.get(key);
        if (memo === undefined) continue;
        if (memo.day !== day) {
          // Freshness (D-49): a stored answer for a finished day is
          // discarded, with legacy recomputed if the opportunity persists.
          chatMemos.delete(key);
          logDecision({
            time: now(),
            subject: key,
            surface: "chatter-exchange",
            outcome: "stale",
            latencyMs: 0,
            fallback: true,
            fallbackReason: "stale-day",
          });
          continue;
        }
        pendingPairKey = key;
        return pair;
      }
    } catch {
      // Frame-loop invariant (WS0): hooks must not throw.
    }
    return legacy.pickChatterPair(pairs);
  }

  function hookPickChatterStarter(a: string, b: string): string {
    try {
      const memo = pendingPairKey !== null ? chatMemos.get(pendingPairKey) : undefined;
      if (
        memo !== undefined &&
        memo.day === providers.getDay() &&
        memo.starter !== null &&
        (memo.starter === a || memo.starter === b)
      ) {
        return memo.starter;
      }
    } catch {
      // contained -> legacy
    }
    return legacy.pickChatterStarter(a as NpcId, b as NpcId);
  }

  function hookPickChatterExchange(
    pool: readonly ChatterExchange[],
    starterId: string,
  ): ChatterExchange {
    const key = pendingPairKey;
    pendingPairKey = null;
    try {
      const memo = key !== null ? chatMemos.get(key) : undefined;
      if (
        key !== null &&
        memo !== undefined &&
        memo.day === providers.getDay() &&
        memo.exchange !== null &&
        // Freshness: the active pool must still contain the steered
        // exchange (a period flip since the tick makes it stale).
        pool.includes(memo.exchange)
      ) {
        chatMemos.delete(key); // exactly once (D-58)
        return memo.exchange;
      }
    } catch {
      // contained -> legacy
    }
    return legacy.pickChatterExchange(pool, starterId as NpcId);
  }

  function hookPickRandomDestination(npcId: NpcId, period: Period): ScheduleEntry | null {
    try {
      const memo = destMemos.get(npcId);
      if (memo !== undefined) {
        destMemos.delete(npcId);
        if (memo.day === providers.getDay() && memo.period === period) {
          // A steered null means "stay at desk": a decision, not an
          // absent hook — it must NOT fall through to the legacy roll.
          return memo.entry;
        }
        logDecision({
          time: now(),
          subject: npcId,
          surface: "destination",
          outcome: "stale",
          latencyMs: 0,
          fallback: true,
          fallbackReason: "stale-period",
        });
      }
    } catch {
      // contained -> legacy
    }
    return legacy.pickRandomDestination(npcId, period);
  }

  // ── install lifecycle (greeting-wrapper pattern) ────────────────────

  function install(): void {
    if (installed || off || shadow || !client.isConfigured()) return;
    previousHooks = {
      pickChatterPair: hooks.pickChatterPair,
      pickChatterStarter: hooks.pickChatterStarter,
      pickChatterExchange: hooks.pickChatterExchange,
      pickRandomDestination: hooks.pickRandomDestination,
    };
    hooks.pickChatterPair = hookPickChatterPair;
    hooks.pickChatterStarter = hookPickChatterStarter;
    hooks.pickChatterExchange = hookPickChatterExchange;
    hooks.pickRandomDestination = hookPickRandomDestination;
    installed = true;
  }

  function uninstall(): void {
    if (!installed) return;
    hooks.pickChatterPair = previousHooks.pickChatterPair;
    hooks.pickChatterStarter = previousHooks.pickChatterStarter;
    hooks.pickChatterExchange = previousHooks.pickChatterExchange;
    hooks.pickRandomDestination = previousHooks.pickRandomDestination;
    previousHooks = {};
    installed = false;
  }

  return {
    update,
    onPeriodTransition,
    install,
    uninstall,
    isInstalled: () => installed,
    isBreakerOpen: breakerOpen,
    isInFlight: () => inFlight,
    getActionMemo: (npcId: string): "coffee-machine" | "stay" | null => {
      const memo = actionMemos.get(npcId);
      if (memo === undefined) return null;
      // Consume-on-read: one steered action per memo, and only while
      // fresh (a stale action must never fire the next period).
      actionMemos.delete(npcId);
      if (memo.day === providers.getDay() && memo.period === providers.getPeriod()) {
        return memo.action;
      }
      return null;
    },
  };
}

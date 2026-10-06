/**
 * WS1 greeting wrapper — the FIRST steered call-site wrapper
 * (ADR-0009 section 3.8, D-47/D-48/D-49/D-60).
 *
 * The WS0 seam exposes `pickMorningGreeting` as a SYNCHRONOUS hook
 * `(npcId) => string` read live by the NPC controller. A request
 * cannot run inside the frame loop, so this wrapper uses the D-48
 * pre-decision shape:
 *
 *   1. `prefetch(npcIds)` — one batched request (700 ms budget, NO
 *      retries, ambient rules) that pre-decides the greeting for each
 *      NPC from its authored pool. Valid answers are stored in a
 *      per-day memo; every other outcome falls back.
 *   2. `install()` — swaps `jevDecisionHooks.pickMorningGreeting` for
 *      a hook that returns the stored answer INSTANTLY, and falls
 *      back to the legacy pool pick the moment anything is off
 *      (unconfigured, never prefetched, stale day, containment
 *      failure). When the client is unconfigured, install() is a
 *      no-op, so the controller consumes its own rng exactly like the
 *      pre-seam build (TAC-01 fallback equivalence).
 *
 * Projection is allowlist-only (D-59): fictional actor ids plus the
 * authored name/role and a pre-computed relationship band. Player
 * text never enters a projection.
 *
 * Logging is one entry per prefetched subject (decision-log counter
 * semantics are pinned in decision-log.test.ts): "applied" = steered
 * answer stored for the day, "rejected" = validation/confidence
 * failure, "legacy" = provider failure. A stale day discovered at
 * serve time logs "stale".
 */

import type {
  DecisionClient,
  DecisionHooks,
  JevQuestion,
} from "./contracts";
import { createResolvingClient } from "./client";
import { GREETINGS_BY_NPC } from "../content/morning-greetings";
import { NPCS } from "../content/npcs";
import { logDecision } from "./decision-log";
import { pickMorningGreeting } from "../content/morning-greetings";

/** D-60 greeting row: cosmetic surface, confidence >= 0.3, live. */
export const GREETING_MIN_CONFIDENCE = 0.3;
/** D-48 ambient budget: 700 ms hard cutoff, never retried. */
export const GREETING_BUDGET_MS = 700;
/** Relationship deadbands (D-50): friend >= 65, enemy <= 35, else neutral. */
const FRIEND_BAND = 65;
const ENEMY_BAND = 35;

export interface GreetingGameState {
  day: number;
  npcRelationships: Record<string, number>;
}

export interface GreetingWrapperOptions {
  /**
   * The hooks holder to install into. Production passes the WS0 seam
   * holder (`jevDecisionHooks` re-exported from src/main.ts); tests
   * pass a local object. The wrapper deliberately does not import the
   * npc-controller module itself.
   */
  hooks: DecisionHooks;
  /** Decision client. Default: the resolving client (key provider). */
  client?: DecisionClient;
  /** Legacy fallback picker. Default: the authored pool picker with a
   *  detached rng (only reachable while steering is active, so TAC-01
   *  rng-stream equivalence is unaffected). */
  legacyPick?: (npcId: string) => string;
  /** Readable game state for freshness (day) + relationship bands.
   *  Omit or return undefined to project without the band. */
  getGameState?: () => GreetingGameState | undefined;
  /** Request budget in ms. Default 700. */
  timeoutMs?: number;
  /** D-60 threshold override (tests). Default 0.3. */
  minConfidence?: number;
  /** Injectable clock (tests). */
  now?: () => number;
  /**
   * D-55 `?jev=shadow`: requests run and land in the decision log, but
   * install() never touches the hook — the game plays legacy while the
   * log accumulates calibration data.
   */
  shadow?: boolean;
}

export interface GreetingWrapperHandle {
  /** Pre-decide greetings for the given NPCs (one batched request). */
  prefetch(npcIds: readonly string[]): Promise<void>;
  /** Install the steered hook. No-op while unconfigured. */
  install(): void;
  /** Remove the steered hook (restores any pre-existing hook). */
  uninstall(): void;
  isInstalled(): boolean;
  /** True when a fresh steered answer is stored for the NPC. */
  hasStored(npcId: string): boolean;
}

interface StoredGreeting {
  line: string;
  chosenId: string;
  confidence: number;
  day: number;
}

export function createGreetingWrapper(options: GreetingWrapperOptions): GreetingWrapperHandle {
  const hooks = options.hooks;
  const client = options.client ?? createResolvingClient();
  const legacyPick =
    options.legacyPick ?? ((npcId: string) => pickMorningGreeting(npcId, Math.random));
  const getGameState = options.getGameState;
  const timeoutMs = options.timeoutMs ?? GREETING_BUDGET_MS;
  const minConfidence = options.minConfidence ?? GREETING_MIN_CONFIDENCE;
  const shadow = options.shadow ?? false;
  const now = options.now ?? (() => Date.now());

  const stored = new Map<string, StoredGreeting>();
  let installed = false;
  let previousHook: DecisionHooks["pickMorningGreeting"];
  let requestSeq = 0;

  const stateOrNull = (): GreetingGameState | undefined => {
    try {
      return getGameState?.();
    } catch {
      return undefined;
    }
  };

  function relationshipBand(npcId: string): string | undefined {
    const state = stateOrNull();
    const value = state?.npcRelationships[npcId];
    if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
    if (value >= FRIEND_BAND) return "friend";
    if (value <= ENEMY_BAND) return "enemy";
    return "neutral";
  }

  function poolFor(npcId: string): readonly string[] | undefined {
    const pool = GREETINGS_BY_NPC[npcId];
    return pool !== undefined && pool.length > 0 ? pool : undefined;
  }

  function currentDay(): number {
    return stateOrNull()?.day ?? 0;
  }

  async function prefetch(npcIds: readonly string[]): Promise<void> {
    if (!client.isConfigured()) return;
    const ids = npcIds.filter((id) => poolFor(id) !== undefined);
    if (ids.length === 0) return;

    const projection: Record<string, unknown> = {};
    const questions: JevQuestion[] = [];
    for (const id of ids) {
      const npc = NPCS.find((candidate) => candidate.id === id);
      const pool = poolFor(id)!;
      const band = relationshipBand(id);
      projection[`npcs.${id}`] = {
        id,
        name: npc?.name ?? id,
        role: npc?.role ?? "",
        ...(band !== undefined ? { relationshipBand: band } : {}),
      };
      questions.push({
        id: `greeting:${id}`,
        type: "choice",
        prompt:
          `Pick the morning greeting line for coworker ${id}` +
          `${npc ? ` (${npc.name}, ${npc.role})` : ""}.` +
          `${band ? ` They feel like a ${band} today.` : ""} ` +
          "Choose the candidate id that best matches their mood and role.",
        subjectId: id,
        candidates: pool.map((line, index) => ({
          id: `${id}:greeting:${index}`,
          description: line,
          priority: index,
        })),
      });
    }

    const day = currentDay();
    const startedAt = now();
    let result;
    try {
      result = await client.request(projection, questions, {
        decisionId: `greeting-day${day}-${(requestSeq += 1)}`,
        generation: `day-${day}`,
        surface: "greeting",
        timeoutMs,
        retries: 0,
      });
    } catch (err) {
      // request() resolves instead of throwing, but containment here is
      // cheap insurance for the frame loop.
      result = { ok: false as const, reason: "network" as const };
      void err;
    }
    const latencyMs = Math.max(0, now() - startedAt);

    for (const id of ids) {
      const entry = {
        time: now(),
        subject: id,
        surface: "greeting" as const,
        latencyMs,
      };
      if (!result.ok) {
        logDecision({
          ...entry,
          outcome: "legacy",
          fallback: true,
          fallbackReason: `provider-${result.reason}`,
        });
        continue;
      }
      const answer = result.answers.find(
        (candidate) => candidate.questionId === `greeting:${id}` && candidate.type === "choice",
      );
      if (answer === undefined || answer.type !== "choice") {
        logDecision({
          ...entry,
          outcome: "rejected",
          fallback: true,
          fallbackReason: "missing-answer",
        });
        continue;
      }
      if (answer.confidence < minConfidence) {
        logDecision({
          ...entry,
          outcome: "rejected",
          fallback: true,
          fallbackReason: "low-confidence",
          confidence: answer.confidence,
        });
        continue;
      }
      const pool = poolFor(id)!;
      const index = Number(answer.id.slice(`${id}:greeting:`.length));
      if (!Number.isInteger(index) || index < 0 || index >= pool.length) {
        logDecision({
          ...entry,
          outcome: "rejected",
          fallback: true,
          fallbackReason: "unknown-candidate",
          confidence: answer.confidence,
        });
        continue;
      }
      stored.set(id, {
        line: pool[index]!,
        chosenId: answer.id,
        confidence: answer.confidence,
        day,
      });
      logDecision({
        ...entry,
        // D-55: in shadow mode the decision is judged and logged but
        // deliberately NOT steering (install() skipped the hook), so it
        // must never inflate the applied counter.
        outcome: shadow ? "shadow" : "applied",
        fallback: false,
        chosenId: answer.id,
        confidence: answer.confidence,
      });
    }
  }

  function install(): void {
    if (installed || shadow || !client.isConfigured()) return;
    previousHook = hooks.pickMorningGreeting;
    hooks.pickMorningGreeting = hook;
    installed = true;
  }

  function uninstall(): void {
    if (!installed) return;
    hooks.pickMorningGreeting = previousHook;
    previousHook = undefined;
    installed = false;
  }

  function hook(npcId: string): string {
    try {
      const entry = stored.get(npcId);
      if (entry === undefined) return legacyPick(npcId);
      if (entry.day !== currentDay()) {
        stored.delete(npcId);
        logDecision({
          time: now(),
          subject: npcId,
          surface: "greeting",
          outcome: "stale",
          latencyMs: 0,
          fallback: true,
          fallbackReason: "stale-day",
          chosenId: entry.chosenId,
          confidence: entry.confidence,
        });
        return legacyPick(npcId);
      }
      return entry.line;
    } catch {
      // Frame-loop invariant (WS0): hook implementations must not throw.
      try {
        return legacyPick(npcId);
      } catch {
        return "Hi.";
      }
    }
  }

  return {
    prefetch,
    install,
    uninstall,
    isInstalled: () => installed,
    hasStored: (npcId: string) => stored.has(npcId),
  };
}

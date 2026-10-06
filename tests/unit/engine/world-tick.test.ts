import { beforeEach, describe, expect, it } from "vitest";
import { FakeDecisionClient, type FakeScript } from "../../../src/jev/fake-client";
import {
  createWorldTickWrapper,
  WORLD_TICK_BUDGET_MS,
  type WorldTickHandle,
} from "../../../src/engine/world-tick";
import { counters, recent, reset as resetLog } from "../../../src/jev/decision-log";
import type { DecisionClient, DecisionHooks, DecisionRequestResult } from "../../../src/jev/contracts";
import { OFFICE_CHATTER, SPEAKER_TOPICS } from "../../../src/content/office-chatter";
import { LUNCH_CHATTER } from "../../../src/content/lunch-dialogues";
import { RANDOM_DESTINATIONS, type Period } from "../../../src/content/npc-schedule";
import type { ChatterPair } from "../../../src/engine/chatter";

/**
 * WS4 world-tick scheduler + steered ambient wrapper (ADR-0009 D-48/
 * D-49/D-56, PRD Flow B, C-77). One batched request per 6 real seconds
 * of unpaused simulation (plus period transitions) covering every due
 * chatting pair (starter + exchange over ALL eligible exchanges — the
 * C-77 scale assertion) and every due next-period destination. Answers
 * are validated per subject; a bad answer falls back for THAT subject
 * only, into the WS0 legacy pickers, synchronously and rng-order
 * preserving. 700 ms hard cutoff, no retries, single-flight, and a
 * 3-failure/60 s circuit breaker (D-56).
 */

// ── harness ──────────────────────────────────────────────────────────

let clockMs = 1_000_000;
const fakeNow = (): number => clockMs;
const advanceClock = (ms: number): void => {
  clockMs += ms;
};
/** Drain every microtask + one macrotask so an in-flight tick settles. */
const settleTick = async (): Promise<void> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
};

/** A client whose request never resolves until the test settles it. */
class PendingClient implements DecisionClient {
  calls = 0;
  private resolver: ((value: DecisionRequestResult) => void) | null = null;
  isConfigured(): boolean {
    return true;
  }
  request(): Promise<DecisionRequestResult> {
    this.calls += 1;
    return new Promise<DecisionRequestResult>((resolve) => {
      this.resolver = resolve;
    });
  }
  settle(): void {
    this.resolver?.({ ok: true, answers: [], rejectedCount: 0, usage: {}, model: "pending" });
    this.resolver = null;
  }
}

interface LegacyCalls {
  pair: number;
  starter: number;
  exchange: number;
  destination: number;
}

interface Harness {
  hooks: DecisionHooks;
  client: FakeDecisionClient;
  wrapper: WorldTickHandle;
  pairs: ChatterPair[];
  destNpcs: string[];
  legacyCalls: LegacyCalls;
  setDay(day: number): void;
  setPeriod(period: Period): void;
}

function makeHarness(options: {
  script?: FakeScript;
  pairs?: ChatterPair[];
  destNpcs?: string[];
  mode?: "live" | "shadow" | "off";
  day?: number;
  period?: Period;
  client?: DecisionClient;
  configured?: boolean;
  actionNpcs?: string[];
  needs?: Record<string, { caffeine: number; social: number }>;
} = {}): Harness {
  let day = options.day ?? 1;
  let period = options.period ?? "morning";
  const hooks: DecisionHooks = {};
  const client = options.client ?? new FakeDecisionClient(options.script ?? {}, { configured: options.configured ?? true });
  const legacyCalls: LegacyCalls = { pair: 0, starter: 0, exchange: 0, destination: 0 };
  const pairs = options.pairs ?? [{ a: "bartek", b: "tomek", room: "main-office", distance: 2.1 }];
  const destNpcs = options.destNpcs ?? [];
  const actionNpcs = options.actionNpcs ?? [];
  const needs = options.needs ?? {};
  const wrapper = createWorldTickWrapper({
    hooks,
    client,
    mode: options.mode,
    now: fakeNow,
    providers: {
      getDay: () => day,
      getPeriod: () => period,
      getChatCandidates: () => pairs,
      getDestinationNpcs: () => destNpcs,
      getFiredEvents: () => ["slack-mention"],
      getRelationshipBands: () => ({ bartek_tomek: "friend" }),
      getNpcNeeds: () => needs,
      getActionCandidates: () => actionNpcs,
    },
    legacy: {
      pickChatterPair: (candidates) => {
        legacyCalls.pair += 1;
        return candidates[0] ?? null;
      },
      pickChatterStarter: (a) => {
        legacyCalls.starter += 1;
        return a;
      },
      pickChatterExchange: (pool) => {
        legacyCalls.exchange += 1;
        return pool[0]!;
      },
      pickRandomDestination: () => {
        legacyCalls.destination += 1;
        return null;
      },
    },
  });
  // main.ts installs right after building (greeting-wrapper pattern).
  wrapper.install();
  return {
    hooks,
    client: client as FakeDecisionClient,
    wrapper,
    pairs,
    destNpcs,
    legacyCalls,
    setDay: (value) => {
      day = value;
    },
    setPeriod: (value) => {
      period = value;
    },
  };
}

/** Independent recomputation of a pair's eligible exchanges (the test
 *  side of the scale assertion — deliberately NOT the production
 *  eligibleExchangesForPair). */
function expectedEligible(a: string, b: string): typeof OFFICE_CHATTER {
  const topicsA = SPEAKER_TOPICS[a] ?? [];
  const topicsB = SPEAKER_TOPICS[b] ?? [];
  return OFFICE_CHATTER.filter(
    (exchange) =>
      exchange.topic === undefined ||
      (topicsA.includes(exchange.topic) && topicsB.includes(exchange.topic)),
  );
}

beforeEach(() => {
  resetLog();
  clockMs = 1_000_000;
});

// ── batch composition: chatter at scale (C-77) ───────────────────────

describe("world tick — one batched request per tick", () => {
  it("covers every due pair (starter + exchange) and destination in ONE request", async () => {
    const h = makeHarness({
      pairs: [
        { a: "bartek", b: "tomek", room: "main-office", distance: 2.1 },
        { a: "grazyna", b: "janusz", room: "kitchen", distance: 3 },
      ],
      destNpcs: ["zosia"],
    });
    h.wrapper.update(6);
    await settleTick();
    expect(h.client.callCount).toBe(1);
    expect(h.client.requests[0]!.questions.map((q) => q.id)).toEqual([
      "chatter-starter:bartek|tomek",
      "chatter-exchange:bartek|tomek",
      "chatter-starter:grazyna|janusz",
      "chatter-exchange:grazyna|janusz",
      "destination:zosia",
    ]);
  });

  it("sends EVERY eligible exchange as a candidate (the C-77 scale assertion)", async () => {
    const h = makeHarness(); // bartek + tomek, both "it" speakers
    h.wrapper.update(6);
    await settleTick();
    const exchangeQuestion = h.client.requests[0]!.questions.find(
      (q) => q.id === "chatter-exchange:bartek|tomek",
    )!;
    const expected = expectedEligible("bartek", "tomek");
    expect(exchangeQuestion.candidates?.map((c) => c.description)).toEqual(
      expected.map((e) => e.starter),
    );
    // Scale sanity: 9 authored "it" exchanges plus a dozen general ones.
    expect(expected.length).toBeGreaterThan(9);
    // Candidate ids index into the ELIGIBLE list, deterministic per pool.
    expect(exchangeQuestion.candidates?.[0]?.id).toBe("exchange:office:0");
  });

  it("filters exchange candidates by BOTH speakers' topic affinities", async () => {
    const h = makeHarness({
      pairs: [{ a: "grazyna", b: "janusz", room: "kitchen", distance: 3 }],
    });
    h.wrapper.update(6);
    await settleTick();
    const exchangeQuestion = h.client.requests[0]!.questions.find(
      (q) => q.id === "chatter-exchange:grazyna|janusz",
    )!;
    const descriptions = exchangeQuestion.candidates?.map((c) => c.description) ?? [];
    expect(descriptions).toContain("The printer is jammed again."); // general: anyone
    expect(descriptions).not.toContain("Quarter closes on Friday. No expenses."); // finance: grazyna only
    expect(descriptions).not.toContain("I was hired to mop. Nobody asked about the commits."); // janitor: janusz only
  });

  it("steers chatter + destinations ONLY — greetings (WS1) and actions (WS6) are out of scope", async () => {
    const h = makeHarness({ destNpcs: ["zosia"] });
    h.wrapper.update(6);
    await settleTick();
    for (const id of h.client.requests[0]!.questions.map((q) => q.id)) {
      expect(id.startsWith("chatter-starter:") || id.startsWith("chatter-exchange:") || id.startsWith("destination:")).toBe(true);
    }
  });

  it("projects per-subject namespaced state with bands and events (D-48/D-49)", async () => {
    const h = makeHarness();
    h.wrapper.update(6);
    await settleTick();
    const state = h.client.requests[0]!.state as Record<string, unknown>;
    expect(state["world"]).toEqual({ day: 1, period: "morning" });
    expect(state["events"]).toEqual(["slack-mention"]);
    expect(state["npcs.bartek"]).toMatchObject({ id: "bartek", room: "main-office" });
    expect(state["npcs.tomek"]).toMatchObject({ id: "tomek" });
    expect(state["pairs.bartek_tomek"]).toMatchObject({
      a: "bartek",
      b: "tomek",
      distance: "adjacent",
      relationshipBand: "friend",
    });
  });

  it("budgets the request at 700 ms with no retries (D-48/D-56 ambient rules)", async () => {
    const h = makeHarness();
    h.wrapper.update(6);
    await settleTick();
    expect(h.client.requests[0]!.opts).toMatchObject({
      timeoutMs: WORLD_TICK_BUDGET_MS,
      retries: 0,
    });
  });

  it("offers stay-at-desk plus every authored random destination", async () => {
    const h = makeHarness({ pairs: [], destNpcs: ["zosia"] });
    h.wrapper.update(6);
    await settleTick();
    const question = h.client.requests[0]!.questions[0]!;
    expect(question.id).toBe("destination:zosia");
    expect(question.candidates?.map((c) => c.id)).toEqual([
      "dest:stay",
      ...RANDOM_DESTINATIONS.map((_, index) => `dest:${index}`),
    ]);
  });
});

// ── steered serve through the WS0 hooks ──────────────────────────────

describe("world tick — steered serve", () => {
  it("serves steered pair/starter/exchange instantly and logs applied", async () => {
    const expected = expectedEligible("bartek", "tomek");
    const h = makeHarness({
      script: {
        "chatter-starter:bartek|tomek": { type: "choice", id: "starter:tomek", confidence: 0.9 },
        "chatter-exchange:bartek|tomek": { type: "choice", id: "exchange:office:1", confidence: 0.9 },
      },
    });
    h.wrapper.update(6);
    await settleTick();
    expect(h.hooks.pickChatterPair?.(h.pairs)).toEqual(h.pairs[0]!);
    expect(h.hooks.pickChatterStarter?.("bartek", "tomek")).toBe("tomek");
    expect(h.hooks.pickChatterExchange?.(OFFICE_CHATTER, "tomek")).toBe(expected[1]);
    expect(h.legacyCalls).toMatchObject({ pair: 0, starter: 0, exchange: 0 });
    expect(counters()).toMatchObject({ applied: 2, legacy: 0, rejected: 0 });
  });

  it("applies each steered decision exactly once (D-58), then falls back", async () => {
    const expected = expectedEligible("bartek", "tomek");
    const h = makeHarness({
      script: {
        "chatter-exchange:bartek|tomek": { type: "choice", id: "exchange:office:0", confidence: 0.9 },
      },
    });
    h.wrapper.update(6);
    await settleTick();
    // The controller's flow: pair -> starter -> exchange, one conversation.
    expect(h.hooks.pickChatterPair?.(h.pairs)).toEqual(h.pairs[0]!);
    expect(h.hooks.pickChatterExchange?.(OFFICE_CHATTER, "bartek")).toBe(expected[0]);
    expect(h.legacyCalls.pair).toBe(0);
    // The memo was consumed with that serve: the NEXT conversation start
    // plays legacy until the next tick pre-decides again.
    expect(h.hooks.pickChatterPair?.(h.pairs)).toEqual(h.pairs[0]!); // same array, legacy pick
    expect(h.legacyCalls.pair).toBe(1);
  });

  it("serves legacy instantly on a cold cache", async () => {
    const h = makeHarness();
    expect(h.hooks.pickChatterPair?.(h.pairs)).toEqual(h.pairs[0]!);
    expect(h.legacyCalls.pair).toBe(1);
    expect(h.hooks.pickRandomDestination?.("zosia", "lunch")).toBeNull();
    expect(h.legacyCalls.destination).toBe(1);
    expect(h.client.callCount).toBe(0);
  });

  it("refuses a steered exchange whose pool changed since the tick (freshness)", async () => {
    const h = makeHarness({
      script: {
        "chatter-exchange:bartek|tomek": { type: "choice", id: "exchange:office:0", confidence: 0.9 },
      },
    });
    h.wrapper.update(6); // morning tick -> office pool
    await settleTick();
    expect(h.hooks.pickChatterPair?.(h.pairs)).toEqual(h.pairs[0]!);
    // The lunch window opened between the tick and the trigger: the
    // office-pool answer is stale for THIS pool and must not serve.
    expect(h.hooks.pickChatterExchange?.(LUNCH_CHATTER, "bartek")).toBe(LUNCH_CHATTER[0]!);
    expect(h.legacyCalls.exchange).toBe(1);
  });

  it("treats a steered decision as stale on a new day and logs stale", async () => {
    const h = makeHarness({
      script: {
        "chatter-starter:bartek|tomek": { type: "choice", id: "starter:tomek", confidence: 0.9 },
      },
    });
    h.wrapper.update(6);
    await settleTick();
    h.setDay(2); // the day rolled over after the pre-decision
    expect(h.hooks.pickChatterPair?.(h.pairs)).toEqual(h.pairs[0]!);
    expect(h.legacyCalls.pair).toBe(1);
    expect(recent().some((entry) => entry.outcome === "stale" && entry.fallbackReason === "stale-day")).toBe(true);
  });

  it("serves a steered null destination as a DECISION (no legacy roll)", async () => {
    const h = makeHarness({
      pairs: [],
      destNpcs: ["zosia"],
      script: { "destination:zosia": { type: "choice", id: "dest:stay", confidence: 0.9 } },
    });
    h.wrapper.update(6);
    await settleTick();
    // Morning tick pre-decided for the NEXT period (lunch).
    expect(h.hooks.pickRandomDestination?.("zosia", "lunch")).toBeNull();
    expect(h.legacyCalls.destination).toBe(0);
  });

  it("prefetches the NEXT period's destinations and consumes them at the transition", async () => {
    const h = makeHarness({
      pairs: [],
      destNpcs: ["zosia"],
      script: { "destination:zosia": { type: "choice", id: "dest:3", confidence: 0.9 } },
    });
    h.wrapper.onPeriodTransition(); // morning -> pre-decides for lunch
    await settleTick();
    expect(h.hooks.pickRandomDestination?.("zosia", "lunch")).toBe(RANDOM_DESTINATIONS[3] ?? null);
    // Consumed once: the next roll for the same period is legacy.
    h.hooks.pickRandomDestination?.("zosia", "lunch");
    expect(h.legacyCalls.destination).toBe(1);
  });

  it("rejects a destination answer for a period it was not decided for", async () => {
    const h = makeHarness({
      pairs: [],
      destNpcs: ["zosia"],
      script: { "destination:zosia": { type: "choice", id: "dest:0", confidence: 0.9 } },
    });
    h.wrapper.onPeriodTransition(); // memo holds period "lunch"
    await settleTick();
    expect(h.hooks.pickRandomDestination?.("zosia", "afternoon")).toBeNull();
    expect(h.legacyCalls.destination).toBe(1);
    expect(recent().some((entry) => entry.outcome === "stale" && entry.fallbackReason === "stale-period")).toBe(true);
  });
});

// ── per-subject fallback (Flow B step 3 / Flow C) ────────────────────

describe("world tick — per-subject fallback", () => {
  it("one bad answer among five destinations => 4 applied, 1 legacy", async () => {
    const h = makeHarness({
      pairs: [],
      destNpcs: ["zosia", "grazyna", "przemek", "ania", "janusz"],
      script: { "destination:grazyna": { failure: "unknown-id" } },
    });
    h.wrapper.update(6);
    await settleTick();
    const snapshot = counters();
    expect(snapshot.applied).toBe(4);
    expect(snapshot.rejected).toBe(1);
    expect(recent().find((entry) => entry.subject === "grazyna")?.fallbackReason).toBe("unknown-candidate");
    // The four valid steered answers serve without touching legacy…
    expect(h.hooks.pickRandomDestination?.("zosia", "lunch")).toBeNull();
    expect(h.hooks.pickRandomDestination?.("przemek", "lunch")).toBeNull();
    expect(h.legacyCalls.destination).toBe(0);
    // …while grazyna falls back synchronously.
    expect(h.hooks.pickRandomDestination?.("grazyna", "lunch")).toBeNull();
    expect(h.legacyCalls.destination).toBe(1);
  });

  it("a bad exchange answer falls back for that pair only", async () => {
    const expectedBartek = expectedEligible("bartek", "tomek");
    const h = makeHarness({
      pairs: [
        { a: "bartek", b: "tomek", room: "main-office", distance: 2.1 },
        { a: "grazyna", b: "janusz", room: "kitchen", distance: 3 },
      ],
      script: { "chatter-exchange:grazyna|janusz": { failure: "unknown-id" } },
    });
    h.wrapper.update(6);
    await settleTick();
    expect(counters()).toMatchObject({ applied: 3, rejected: 1 });
    // Pair 1 fully steered.
    expect(h.hooks.pickChatterPair?.(h.pairs)).toEqual(h.pairs[0]!);
    expect(h.hooks.pickChatterStarter?.("bartek", "tomek")).toBe("bartek"); // default first candidate
    expect(h.hooks.pickChatterExchange?.(OFFICE_CHATTER, "bartek")).toBe(expectedBartek[0]);
    // Pair 2: starter steered, exchange legacy (that subject only).
    expect(h.hooks.pickChatterPair?.(h.pairs)).toEqual(h.pairs[1]!);
    expect(h.hooks.pickChatterStarter?.("grazyna", "janusz")).toBe("grazyna");
    expect(h.hooks.pickChatterExchange?.(OFFICE_CHATTER, "grazyna")).toBe(OFFICE_CHATTER[0]!);
    expect(h.legacyCalls.exchange).toBe(1);
  });

  it("gates destinations on the conservative D-60 threshold (confidence >= 0.5)", async () => {
    const at = makeHarness({
      pairs: [],
      destNpcs: ["zosia"],
      script: { "destination:zosia": { type: "choice", id: "dest:1", confidence: 0.5 } },
    });
    at.wrapper.update(6);
    await settleTick();
    expect(at.hooks.pickRandomDestination?.("zosia", "lunch")).toBe(RANDOM_DESTINATIONS[1] ?? null);
    expect(at.legacyCalls.destination).toBe(0);

    const below = makeHarness({
      pairs: [],
      destNpcs: ["zosia"],
      script: { "destination:zosia": { type: "choice", id: "dest:1", confidence: 0.49 } },
    });
    below.wrapper.update(6);
    await settleTick();
    expect(below.hooks.pickRandomDestination?.("zosia", "lunch")).toBeNull();
    expect(below.legacyCalls.destination).toBe(1);
  });

  it("a provider timeout falls back for every subject together and logs legacy", async () => {
    const h = makeHarness({
      destNpcs: ["zosia"],
      script: { "*": { failure: "timeout" } },
    });
    h.wrapper.update(6);
    await settleTick();
    expect(counters()).toMatchObject({ legacy: 2, applied: 0 }); // 1 pair + 1 destination
    expect(h.hooks.pickChatterPair?.(h.pairs)).toEqual(h.pairs[0]!);
    expect(h.legacyCalls.pair).toBe(1);
    expect(h.hooks.pickRandomDestination?.("zosia", "lunch")).toBeNull();
    expect(h.legacyCalls.destination).toBe(1);
  });
});

// ── cadence, single-flight, circuit breaker (D-48/D-56) ──────────────

describe("world tick — cadence and single-flight", () => {
  it("fires once per 6 accumulated unpaused seconds, with no catch-up", async () => {
    const h = makeHarness();
    h.wrapper.update(2);
    h.wrapper.update(2);
    expect(h.client.callCount).toBe(0);
    h.wrapper.update(2); // 6 s reached
    await settleTick();
    expect(h.client.callCount).toBe(1);
    // The accumulator reset: leftover time is dropped, not banked.
    h.wrapper.update(0.1);
    await settleTick();
    expect(h.client.callCount).toBe(1);
  });

  it("skips ticks while a request is in flight (single-flight)", async () => {
    const pending = new PendingClient();
    const h = makeHarness({ client: pending });
    h.wrapper.update(6);
    expect(pending.calls).toBe(1);
    expect(h.wrapper.isInFlight()).toBe(true);
    h.wrapper.update(6); // during flight: skipped
    h.wrapper.onPeriodTransition(); // transitions are gated too
    expect(pending.calls).toBe(1);
    pending.settle();
    await settleTick();
    expect(h.wrapper.isInFlight()).toBe(false);
    h.wrapper.update(6);
    await settleTick();
    expect(pending.calls).toBe(2);
  });

  it("onPeriodTransition pre-decides immediately (PRD Flow B step 1)", async () => {
    const h = makeHarness();
    h.wrapper.onPeriodTransition();
    await settleTick();
    expect(h.client.callCount).toBe(1);
  });
});

describe("world tick — circuit breaker (D-56)", () => {
  const timeoutScript: FakeScript = {
    "chatter-starter:bartek|tomek": [{ failure: "timeout" }, { failure: "timeout" }, { failure: "timeout" }],
    "chatter-exchange:bartek|tomek": [{ failure: "timeout" }, { failure: "timeout" }, { failure: "timeout" }],
  };

  it("opens after 3 consecutive failures and stops ambient calls for 60 s", async () => {
    const h = makeHarness({ script: timeoutScript });
    for (let i = 0; i < 3; i += 1) {
      h.wrapper.update(6);
      await settleTick();
    }
    expect(h.client.callCount).toBe(3);
    expect(h.wrapper.isBreakerOpen()).toBe(true);
    // Interval ticks AND explicit transition triggers stay silent while open.
    h.wrapper.update(6);
    h.wrapper.onPeriodTransition();
    await settleTick();
    expect(h.client.callCount).toBe(3);
    advanceClock(59_000);
    h.wrapper.update(6);
    await settleTick();
    expect(h.client.callCount).toBe(3);
  });

  it("closes after 60 s and a success resets the failure count", async () => {
    const h = makeHarness({ script: timeoutScript });
    for (let i = 0; i < 3; i += 1) {
      h.wrapper.update(6);
      await settleTick();
    }
    advanceClock(60_000);
    h.wrapper.update(6);
    await settleTick();
    // Half-open probe fired; the scripted failures are exhausted, so the
    // request succeeds and closes the breaker.
    expect(h.client.callCount).toBe(4);
    expect(h.wrapper.isBreakerOpen()).toBe(false);
    // A NEW streak needs 3 fresh failures to re-open (the counter reset).
    // "*" (single spec) fails every request regardless of prior sequences.
    h.client.setScript({ "*": { failure: "timeout" } });
    h.wrapper.update(6);
    await settleTick();
    h.wrapper.update(6);
    await settleTick();
    expect(h.wrapper.isBreakerOpen()).toBe(false);
    h.wrapper.update(6);
    await settleTick();
    expect(h.wrapper.isBreakerOpen()).toBe(true);
    expect(h.client.callCount).toBe(7);
  });
});

// ── modes: ?jev=off | shadow (D-55) ──────────────────────────────────

describe("world tick — modes", () => {
  it("?jev=off constructs nothing: no requests, no hooks", async () => {
    const h = makeHarness({ mode: "off" });
    h.wrapper.update(600);
    h.wrapper.onPeriodTransition();
    await settleTick();
    expect(h.client.callCount).toBe(0);
    expect(h.hooks.pickChatterPair).toBeUndefined();
    expect(h.hooks.pickRandomDestination).toBeUndefined();
  });

  it("shadow judges and logs shadow outcomes but never installs hooks", async () => {
    const h = makeHarness({
      mode: "shadow",
      script: {
        "chatter-starter:bartek|tomek": { type: "choice", id: "starter:tomek", confidence: 0.9 },
      },
    });
    h.wrapper.update(6);
    await settleTick();
    expect(h.client.callCount).toBe(1); // requests run (calibration data)
    const snapshot = counters();
    // BOTH judged questions land as shadow: the scripted starter AND the
    // (default-answered) exchange — judged + logged, never steering.
    expect(snapshot.shadow).toBe(2);
    expect(snapshot.applied).toBe(0);
    expect(h.hooks.pickChatterPair).toBeUndefined(); // the game plays legacy
    // And nothing was stored to steer with anyway.
    expect(h.legacyCalls.pair).toBe(0);
  });

  it("an unconfigured client never requests and never installs", async () => {
    const h = makeHarness({ configured: false });
    h.wrapper.update(6);
    h.wrapper.onPeriodTransition();
    await settleTick();
    expect(h.client.callCount).toBe(0);
    expect(h.hooks.pickChatterPair).toBeUndefined();
  });
});

// ── lifecycle + frame-loop containment (WS0 invariants) ──────────────

describe("world tick — lifecycle and containment", () => {
  it("uninstall restores pre-existing hooks", () => {
    const preExisting = (pairs: readonly ChatterPair[]) => pairs[0] ?? null;
    const hooks: DecisionHooks = { pickChatterPair: preExisting };
    const wrapper = createWorldTickWrapper({
      hooks,
      client: new FakeDecisionClient({}),
      providers: { getDay: () => 1, getPeriod: () => "morning" },
      now: fakeNow,
    });
    wrapper.install();
    expect(hooks.pickChatterPair).not.toBe(preExisting);
    wrapper.uninstall();
    expect(hooks.pickChatterPair).toBe(preExisting);
    expect(wrapper.isInstalled()).toBe(false);
  });

  it("never throws past update() or the WS0 hooks when providers explode", async () => {
    const hooks: DecisionHooks = {};
    const wrapper = createWorldTickWrapper({
      hooks,
      client: new FakeDecisionClient({
        "chatter-starter:bartek|tomek": { type: "choice", id: "starter:tomek", confidence: 0.9 },
      }),
      providers: {
        getDay: () => {
          throw new Error("state exploded");
        },
        getPeriod: () => "morning",
        getChatCandidates: () => [{ a: "bartek", b: "tomek", room: "main-office", distance: 2.1 }],
      },
      now: fakeNow,
      legacy: {
        pickChatterPair: () => null,
        pickChatterStarter: (a) => a,
        pickChatterExchange: (pool) => pool[0]!,
        pickRandomDestination: () => null,
      },
    });
    wrapper.install();
    expect(() => wrapper.update(6)).not.toThrow();
    await settleTick();
    expect(wrapper.isInFlight()).toBe(false); // the tick aborted, contained
    expect(() => hooks.pickChatterPair?.([])).not.toThrow();
    expect(hooks.pickChatterPair?.([])).toBeNull(); // contained -> legacy
  });
});

// ── purposeful-action surface (closure verdict High 3, Wave-4) ───────

describe("world tick — purposeful action choice", () => {
  it("steers a coffee break for a craving NPC and records the needs bands in the projection", async () => {
    const h = makeHarness({
      pairs: [], // no chatter, no destinations: the action question alone
      destNpcs: [],
      actionNpcs: ["kasia"],
      needs: { kasia: { caffeine: 10, social: 90 } },
      script: {
        "action:kasia": { type: "choice", id: "action:coffee-machine", confidence: 0.8 },
      },
    });
    h.wrapper.update(6);
    await settleTick();

    // ONE question for the one candidate, with the named need bands in
    // the projection (the judge sees "craving", never the raw 10).
    expect(h.client.callCount).toBe(1);
    const request = h.client.requests[0]!;
    expect(request.questions.map((q) => q.id)).toEqual(["action:kasia"]);
    const kasia = (request.state as Record<string, any>)["npcs.kasia"];
    expect(kasia.needs).toEqual({ caffeine: "craving", social: "ok" });

    // The orchestrator consumes the steered action while it is fresh.
    expect(h.wrapper.getActionMemo("kasia")).toBe("coffee-machine");
    const applied = recent().find((entry) => entry.surface === "purposeful-action");
    expect(applied?.outcome).toBe("applied");
  });

  it("records a stay decision too (a memo, not an absence)", async () => {
    const h = makeHarness({
      pairs: [],
      actionNpcs: ["bartek"],
      needs: { bartek: { caffeine: 95, social: 80 } },
      script: {
        "action:bartek": { type: "choice", id: "action:stay", confidence: 0.7 },
      },
    });
    h.wrapper.update(6);
    await settleTick();
    expect(h.wrapper.getActionMemo("bartek")).toBe("stay");
  });

  it("skips the re-judge while the action memo is fresh for the period", async () => {
    const h = makeHarness({
      pairs: [],
      actionNpcs: ["kasia"],
      needs: { kasia: { caffeine: 10, social: 90 } },
      script: {
        "action:kasia": { type: "choice", id: "action:coffee-machine", confidence: 0.8 },
      },
    });
    h.wrapper.update(6);
    await settleTick();
    expect(h.client.callCount).toBe(1);
    // Same period again: no second request for the fresh memo.
    h.wrapper.update(6);
    await settleTick();
    expect(h.client.callCount).toBe(1);
  });

  it("getActionMemo consumes the memo and goes stale in the next period", async () => {
    const h = makeHarness({
      pairs: [],
      actionNpcs: ["kasia"],
      needs: { kasia: { caffeine: 10, social: 90 } },
      script: {
        "action:kasia": { type: "choice", id: "action:coffee-machine", confidence: 0.8 },
      },
    });
    h.wrapper.update(6);
    await settleTick();
    expect(h.wrapper.getActionMemo("kasia")).toBe("coffee-machine");
    // Consumed: a second read is null even in the same period.
    expect(h.wrapper.getActionMemo("kasia")).toBeNull();
    // A new decision fires in the next period...
    h.setPeriod("lunch");
    h.wrapper.update(6);
    await settleTick();
    expect(h.client.callCount).toBe(2);
  });

  it("rejects unknown candidates and low confidence (falls back, no memo)", async () => {
    const h = makeHarness({
      pairs: [],
      actionNpcs: ["kasia", "bartek"],
      needs: {
        kasia: { caffeine: 10, social: 90 },
        bartek: { caffeine: 40, social: 50 },
      },
      script: {
        "action:kasia": { type: "choice", id: "action:printer", confidence: 0.9 },
        "action:bartek": { type: "choice", id: "action:coffee-machine", confidence: 0.1 },
      },
    });
    h.wrapper.update(6);
    await settleTick();
    expect(h.wrapper.getActionMemo("kasia")).toBeNull();
    expect(h.wrapper.getActionMemo("bartek")).toBeNull();
    const rejected = recent().filter(
      (entry) => entry.surface === "purposeful-action" && entry.outcome === "rejected",
    );
    expect(rejected.length).toBe(2);
  });

  it("shadow mode judges but never records an action memo", async () => {
    const h = makeHarness({
      pairs: [],
      actionNpcs: ["kasia"],
      needs: { kasia: { caffeine: 10, social: 90 } },
      mode: "shadow",
      script: {
        "action:kasia": { type: "choice", id: "action:coffee-machine", confidence: 0.8 },
      },
    });
    h.wrapper.update(6);
    await settleTick();
    expect(h.wrapper.getActionMemo("kasia")).toBeNull();
    const shadowed = recent().find((entry) => entry.surface === "purposeful-action");
    expect(shadowed?.outcome).toBe("shadow");
  });
});

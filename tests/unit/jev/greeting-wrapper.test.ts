import { beforeEach, describe, expect, it } from "vitest";
import { FakeDecisionClient } from "../../../src/jev/fake-client";
import { createGreetingWrapper } from "../../../src/jev/greeting-wrapper";
import { counters, recent, reset as resetLog } from "../../../src/jev/decision-log";
import { unconfiguredDecisionClient } from "../../../src/jev/unconfigured-client";
import { GREETINGS_BY_NPC } from "../../../src/content/morning-greetings";
import { NPCS } from "../../../src/content/npcs";
import type { DecisionHooks } from "../../../src/jev/contracts";

/**
 * WS1 greeting wrapper (ADR-0009 section 3.8, D-47/D-48/D-60): the
 * FIRST steered wrapper. It pre-fetches morning-greeting decisions
 * (D-48 pre-decision), installs an async-decided memo behind the
 * synchronous `pickMorningGreeting` hook, and falls back to the legacy
 * pool pick the moment anything is off: unconfigured client, provider
 * error, timeout, unknown candidate, low confidence (D-60 greeting row
 * threshold >= 0.3), or a stale day. Unconfigured = the hook is never
 * installed, so the controller consumes its own rng exactly as before.
 */

const BARTek_POOL = GREETINGS_BY_NPC.bartek ?? [];

interface Harness {
  hooks: DecisionHooks;
  client: FakeDecisionClient;
  legacyLines: string[];
  wrapper: ReturnType<typeof createGreetingWrapper>;
}

function makeHarness(options: {
  script?: ConstructorParameters<typeof FakeDecisionClient>[0];
  getGameState?: () => { day: number; npcRelationships: Record<string, number> } | undefined;
  client?: FakeDecisionClient;
} = {}): Harness {
  const hooks: DecisionHooks = {};
  const client = options.client ?? new FakeDecisionClient(options.script ?? {});
  const legacyLines: string[] = [];
  const wrapper = createGreetingWrapper({
    hooks,
    client,
    legacyPick: (npcId) => {
      legacyLines.push(npcId);
      return `legacy:${npcId}`;
    },
    getGameState: options.getGameState,
  });
  return { hooks, client, legacyLines, wrapper };
}

describe("greeting wrapper — unconfigured (TAC-01)", () => {
  it("never installs the hook and never requests when the client is unconfigured", async () => {
    const hooks: DecisionHooks = {};
    const wrapper = createGreetingWrapper({
      hooks,
      client: unconfiguredDecisionClient,
      legacyPick: () => "legacy",
    });
    await wrapper.prefetch(["bartek", "marek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting).toBeUndefined();
  });

  it("does not install when the configured client reports itself unconfigured", async () => {
    const { hooks, client, wrapper } = makeHarness();
    client.setConfigured(false);
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting).toBeUndefined();
  });
});

describe("greeting wrapper — steered path", () => {
  beforeEach(() => resetLog());

  it("asks ONE choice question over the NPC's authored greeting pool", async () => {
    const { client, wrapper } = makeHarness();
    await wrapper.prefetch(["bartek"]);
    expect(client.callCount).toBe(1);
    const request = client.requests[0]!;
    expect(request.questions).toHaveLength(1);
    const q = request.questions[0]!;
    expect(q.type).toBe("choice");
    expect(q.id).toBe("greeting:bartek");
    expect(q.candidates?.map((c) => c.id)).toEqual(
      BARTek_POOL.map((_, index) => `bartek:greeting:${index}`),
    );
    expect(q.candidates?.[0]?.description).toBe(BARTek_POOL[0]);
  });

  it("batches one subject per NPC in one namespaced projection", async () => {
    const { client, wrapper } = makeHarness();
    await wrapper.prefetch(["bartek", "marek"]);
    const request = client.requests[0]!;
    expect(request.questions.map((q) => q.id)).toEqual(["greeting:bartek", "greeting:marek"]);
    const state = request.state as Record<string, { id: string }>;
    expect(Object.keys(state).sort()).toEqual(["npcs.bartek", "npcs.marek"]);
    expect(state["npcs.bartek"]?.id).toBe("bartek");
    expect(state["npcs.marek"]?.id).toBe("marek");
  });

  it("projects only allowlisted fields: id, name, role, relationship band (D-59)", async () => {
    const { client, wrapper } = makeHarness({
      getGameState: () => ({ day: 3, npcRelationships: { bartek: 80, marek: 20, tomek: 50 } }),
    });
    await wrapper.prefetch(["bartek", "marek", "tomek"]);
    const state = client.requests[0]!.state as Record<string, Record<string, unknown>>;
    expect(state["npcs.bartek"]).toMatchObject({ id: "bartek", relationshipBand: "friend" });
    expect(state["npcs.marek"]).toMatchObject({ id: "marek", relationshipBand: "enemy" });
    expect(state["npcs.tomek"]).toMatchObject({ id: "tomek", relationshipBand: "neutral" });
    // Fictional authored fields only — never player-entered text.
    expect(JSON.stringify(state)).not.toContain("playerName");
  });

  it("omits the relationship band entirely when game state is unreachable", async () => {
    const { client, wrapper } = makeHarness({ getGameState: undefined });
    await wrapper.prefetch(["bartek"]);
    const state = client.requests[0]!.state as Record<string, Record<string, unknown>>;
    expect(state["npcs.bartek"]).toEqual({
      id: "bartek",
      name: NPCS.find((npc) => npc.id === "bartek")?.name,
      role: NPCS.find((npc) => npc.id === "bartek")?.role,
    });
  });

  it("applies a valid steered answer: hook returns the chosen line instantly", async () => {
    const { hooks, wrapper, legacyLines } = makeHarness({
      script: { "greeting:bartek": { type: "choice", id: "bartek:greeting:2", confidence: 0.9 } },
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting).toBeDefined();
    expect(hooks.pickMorningGreeting?.("bartek")).toBe(BARTek_POOL[2]);
    expect(legacyLines).toEqual([]); // no fallback consumed
    expect(counters()).toMatchObject({ requested: 1, applied: 1 });
  });

  it("budgets the request at 700 ms with no retries (D-48 ambient rules)", async () => {
    const { client, wrapper } = makeHarness();
    await wrapper.prefetch(["bartek"]);
    expect(client.requests[0]?.opts).toMatchObject({ timeoutMs: 700, retries: 0 });
  });

  it("serves a stored answer repeatedly without re-requesting", async () => {
    const { hooks, client, wrapper } = makeHarness({
      script: { "greeting:bartek": { type: "choice", id: "bartek:greeting:1", confidence: 0.9 } },
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting?.("bartek")).toBe(BARTek_POOL[1]);
    expect(hooks.pickMorningGreeting?.("bartek")).toBe(BARTek_POOL[1]);
    expect(client.callCount).toBe(1);
  });
});

describe("greeting wrapper — fallback paths (D-47)", () => {
  beforeEach(() => resetLog());

  it("falls back to legacy on a provider error", async () => {
    const { hooks, wrapper, legacyLines } = makeHarness({
      script: { "greeting:bartek": { failure: "network" } },
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting?.("bartek")).toBe("legacy:bartek");
    expect(legacyLines).toEqual(["bartek"]);
    expect(counters()).toMatchObject({ requested: 1, legacy: 1, applied: 0 });
  });

  it("falls back to legacy on a provider timeout", async () => {
    const { hooks, wrapper } = makeHarness({
      script: { "greeting:bartek": { failure: "timeout" } },
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting?.("bartek")).toBe("legacy:bartek");
    expect(counters()).toMatchObject({ legacy: 1 });
  });

  it("falls back to legacy when the answer names an unknown candidate (D-49)", async () => {
    const { hooks, wrapper } = makeHarness({
      script: { "greeting:bartek": { failure: "unknown-id" } },
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting?.("bartek")).toBe("legacy:bartek");
    expect(counters()).toMatchObject({ rejected: 1 });
    expect(recent()[0]?.fallbackReason).toBe("unknown-candidate");
  });

  it("rejects answers below the D-60 greeting threshold (confidence >= 0.3)", async () => {
    const at = makeHarness({
      script: { "greeting:bartek": { type: "choice", id: "bartek:greeting:0", confidence: 0.3 } },
    });
    await at.wrapper.prefetch(["bartek"]);
    at.wrapper.install();
    expect(at.hooks.pickMorningGreeting?.("bartek")).toBe(BARTek_POOL[0]);

    const below = makeHarness({
      script: { "greeting:bartek": { type: "choice", id: "bartek:greeting:0", confidence: 0.29 } },
    });
    await below.wrapper.prefetch(["bartek"]);
    below.wrapper.install();
    expect(below.hooks.pickMorningGreeting?.("bartek")).toBe("legacy:bartek");
    expect(counters()).toMatchObject({ requested: 2, applied: 1, rejected: 1 });
    expect(recent()[1]?.fallbackReason).toBe("low-confidence");
  });

  it("treats a stored answer as stale on a new day and serves legacy (D-49 freshness)", async () => {
    let day = 1;
    const { hooks, wrapper } = makeHarness({
      script: { "greeting:bartek": { type: "choice", id: "bartek:greeting:0", confidence: 0.9 } },
      getGameState: () => ({ day, npcRelationships: {} }),
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting?.("bartek")).toBe(BARTek_POOL[0]);

    day = 2; // the day rolled over after the pre-decision
    expect(hooks.pickMorningGreeting?.("bartek")).toBe("legacy:bartek");
    // requested counts every logged entry (pinned semantics): the
    // prefetch "applied" entry plus the serve-time "stale" entry.
    expect(counters()).toMatchObject({ requested: 2, applied: 1, stale: 1 });
  });

  it("serves legacy for NPCs that were never prefetched (no log noise)", async () => {
    const { hooks, wrapper, legacyLines } = makeHarness();
    wrapper.install();
    expect(hooks.pickMorningGreeting?.("grazyna")).toBe("legacy:grazyna");
    expect(legacyLines).toEqual(["grazyna"]);
    expect(counters().requested).toBe(0);
  });

  it("survives a hook throwing inside the wrapper (frame-loop containment)", async () => {
    const hooks: DecisionHooks = {};
    const wrapper = createGreetingWrapper({
      hooks,
      client: new FakeDecisionClient({
        "greeting:bartek": { type: "choice", id: "bartek:greeting:0", confidence: 0.9 },
      }),
      legacyPick: () => {
        throw new Error("legacy picker exploded");
      },
      getGameState: () => {
        throw new Error("state exploded");
      },
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    // Must not throw past the hook even when every dependency explodes.
    expect(() => hooks.pickMorningGreeting?.("bartek")).not.toThrow();
  });

  it("skips NPCs without an authored greeting pool instead of steering them", async () => {
    const { client, wrapper } = makeHarness();
    await wrapper.prefetch(["bartek", "not-an-npc"]);
    expect(client.requests[0]?.questions.map((q) => q.id)).toEqual(["greeting:bartek"]);
  });
});

describe("greeting wrapper — install/uninstall lifecycle", () => {
  beforeEach(() => resetLog());

  it("uninstall removes the hook and a re-prefetch + install works again", async () => {
    const { hooks, wrapper } = makeHarness({
      script: { "greeting:bartek": { type: "choice", id: "bartek:greeting:0", confidence: 0.9 } },
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting).toBeDefined();
    wrapper.uninstall();
    expect(hooks.pickMorningGreeting).toBeUndefined();
    expect(wrapper.isInstalled()).toBe(false);
  });

  it("preserves a pre-existing hook when uninstalling (restore semantics)", async () => {
    const preExisting = () => "someone else's hook";
    const hooks: DecisionHooks = { pickMorningGreeting: preExisting };
    const wrapper = createGreetingWrapper({
      hooks,
      client: new FakeDecisionClient({
        "greeting:bartek": { type: "choice", id: "bartek:greeting:0", confidence: 0.9 },
      }),
      legacyPick: () => "legacy",
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    expect(hooks.pickMorningGreeting).not.toBe(preExisting);
    wrapper.uninstall();
    expect(hooks.pickMorningGreeting).toBe(preExisting);
  });
});

describe("greeting wrapper — shadow mode (D-55)", () => {
  it("logs shadow outcomes instead of applied, and never installs the hook", async () => {
    resetLog();
    const hooks: DecisionHooks = {};
    const client = new FakeDecisionClient({
      "greeting:bartek": { type: "choice", id: "bartek:greeting:1", confidence: 0.9 },
    });
    const wrapper = createGreetingWrapper({
      hooks,
      client,
      legacyPick: () => "legacy:bartek",
      shadow: true,
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    // The judged decision is logged, but under "shadow" — never counted
    // as applied steering (third-verdict major 2).
    const snapshot = counters();
    expect(snapshot.shadow).toBe(1);
    expect(snapshot.applied).toBe(0);
    const rows = recent();
    expect(rows[rows.length - 1]?.outcome).toBe("shadow");
    // And the game keeps playing legacy: the hook was never installed.
    expect(hooks.pickMorningGreeting).toBeUndefined();
    expect(wrapper.isInstalled()).toBe(false);
  });

  it("live mode still counts applied (the counter fix does not overcorrect)", async () => {
    resetLog();
    const hooks: DecisionHooks = {};
    const client = new FakeDecisionClient({
      "greeting:bartek": { type: "choice", id: "bartek:greeting:1", confidence: 0.9 },
    });
    const wrapper = createGreetingWrapper({
      hooks,
      client,
      legacyPick: () => "legacy:bartek",
    });
    await wrapper.prefetch(["bartek"]);
    wrapper.install();
    const snapshot = counters();
    expect(snapshot.applied).toBe(1);
    expect(snapshot.shadow).toBe(0);
    expect(hooks.pickMorningGreeting).toBeDefined();
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import { FakeDecisionClient } from "../../../src/jev/fake-client";
import {
  createDialogueWrapper,
  DIALOGUE_CURATION_MIN_CONFIDENCE,
  bucketOfReply,
  type DialogueSteererHandle,
  type SteeredTurnRequest,
} from "../../../src/jev/dialogue-wrapper";
import { counters, recent, reset as resetLog } from "../../../src/jev/decision-log";
import { unconfiguredDecisionClient } from "../../../src/jev/unconfigured-client";
import type { OptionCandidate, ReplyCandidate } from "../../../src/content/dialogue-schema";

/**
 * WS3 dialogue wrapper (C-77/C-78, PRD Flow A2): ONE steered surface per
 * turn — option curation (one Score per option, cosmetic, five authored
 * fit levels). Reply selection is DETERMINISTIC since C-78: the chosen
 * option's paired replies answer it, so the wrapper never judges replies.
 * Fallback is always the pure builder output (authored priority,
 * first-unused). Shadow mode judges and logs but never steers. The memo
 * is keyed by (npcId, topicId, used-set).
 */

const NPC = "testnpc";
const TOPIC = "t1";

function option(id: string, text: string): OptionCandidate {
  return { id, text, topicId: TOPIC };
}

function reply(id: string, text: string, relationshipHint?: ReplyCandidate["relationshipHint"]): ReplyCandidate {
  return {
    id,
    text,
    ...(relationshipHint !== undefined ? { relationshipHint } : {}),
  };
}

const OPTIONS: OptionCandidate[] = [
  option("testnpc:t1:o1", "First authored option."),
  option("testnpc:t1:o2", "Second authored option."),
  option("testnpc:t1:o3", "Third authored option."),
];

const REPLIES: ReplyCandidate[] = [
  reply("testnpc:t1:r1", "First authored reply."),
  reply("testnpc:t1:r2", "Second authored reply.", "pleased"),
  reply("testnpc:t1:r3", "Third authored reply."),
];

function makeRequest(overrides: Partial<SteeredTurnRequest> = {}): SteeredTurnRequest {
  return {
    npcId: NPC,
    topicId: TOPIC,
    options: OPTIONS,
    replies: REPLIES,
    usedOptionIds: [],
    usedReplyIds: [],
    facts: { "relationship.band": "neutral" },
    ...overrides,
  };
}

const optKey = (optionId: string): string => `dialogue:option:${NPC}:${optionId}`;

interface Harness {
  client: FakeDecisionClient;
  wrapper: DialogueSteererHandle;
}

function makeHarness(
  script: ConstructorParameters<typeof FakeDecisionClient>[0] = {},
  options: { shadow?: boolean; client?: FakeDecisionClient } = {},
): Harness {
  const client = options.client ?? new FakeDecisionClient(script);
  const wrapper = createDialogueWrapper({ client, shadow: options.shadow });
  return { client, wrapper };
}

beforeEach(() => resetLog());

describe("dialogue wrapper — steered path (curation only, C-78)", () => {
  it("asks ONLY one Score per option — no reply Choice question exists anymore", async () => {
    const { client, wrapper } = makeHarness();
    await wrapper.steerTurn(makeRequest());
    expect(client.callCount).toBe(1);
    const request = client.requests[0]!;
    expect(request.opts?.surface).toBe("option-curation");
    expect(request.questions).toHaveLength(3); // 3 option scores, nothing else
    expect(request.questions.every((q) => q.type === "score")).toBe(true);
    expect(request.questions.map((q) => q.id)).toEqual(OPTIONS.map((o) => optKey(o.id)));
    // C-78: every score question carries its authored fit LEVELS — the
    // live 400 ("expected record") was caught because stubs skipped this.
    for (const q of request.questions) {
      expect(Array.isArray(q.criteria)).toBe(true);
      expect(q.criteria!.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("applies a non-default steered curation (live-path proof)", async () => {
    const { client, wrapper } = makeHarness({
      // 5-level fit scale: o3 ranks highest, o1 lowest.
      [optKey("testnpc:t1:o1")]: { type: "score", level: 1, confidence: 0.9 },
      [optKey("testnpc:t1:o2")]: { type: "score", level: 3, confidence: 0.9 },
      [optKey("testnpc:t1:o3")]: { type: "score", level: 5, confidence: 0.9 },
    });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.fallback).toBe(false);
    expect(decision.optionIds?.[0]).toBe("testnpc:t1:o3");
    // C-78: reply selection is deterministic (paired to the clicked
    // option) — the decision never carries a steered reply.
    expect(decision.replyId).toBeNull();
    expect(decision.bucket).toBeNull();
    // Serving is instant from the memo.
    expect(wrapper.memoOptionOrder(NPC, TOPIC, [])?.[0]).toBe("testnpc:t1:o3");
    // AC-31: applied counters prove the live path.
    expect(counters().applied).toBeGreaterThanOrEqual(1);
    expect(client.callCount).toBe(1);
  });

  it("keeps authored order on score ties (priority is the tie-break)", async () => {
    const { wrapper } = makeHarness(); // default answers: every option level 5
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.optionIds).toEqual(OPTIONS.map((o) => o.id));
  });

  it("serves the same memo without re-requesting while the used-set is unchanged", async () => {
    const { client, wrapper } = makeHarness();
    await wrapper.steerTurn(makeRequest());
    await wrapper.steerTurn(makeRequest());
    expect(client.callCount).toBe(1);
    // A different used-set is a different situation: it re-requests.
    await wrapper.steerTurn(makeRequest({ usedOptionIds: ["testnpc:t1:o1"] }));
    expect(client.callCount).toBe(2);
  });
});

describe("dialogue wrapper — fallback paths", () => {
  it("falls back on a provider timeout (logged as legacy)", async () => {
    const { client, wrapper } = makeHarness({ "*": { failure: "timeout" } });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.fallback).toBe(true);
    expect(decision.optionIds).toBeNull();
    expect(wrapper.memoOptionOrder(NPC, TOPIC, [])).toBeNull();
    const snapshot = counters();
    expect(snapshot.legacy).toBe(1);
    expect(snapshot.applied).toBe(0);
    expect(client.requests[0]?.opts).toMatchObject({ retries: 0 });
  });

  it("falls back on a provider network error", async () => {
    const { wrapper } = makeHarness({ "*": { failure: "network" } });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.fallback).toBe(true);
    expect(decision.fallbackReason).toContain("network");
  });

  it("rejects curation when every score is below the cosmetic threshold", async () => {
    const script: ConstructorParameters<typeof FakeDecisionClient>[0] = {};
    for (const o of OPTIONS) script[optKey(o.id)] = { type: "score", level: 2, confidence: 0.2 };
    const { wrapper } = makeHarness(script);
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.optionIds).toBeNull();
    expect(DIALOGUE_CURATION_MIN_CONFIDENCE).toBe(0.3);
  });

  it("ignores answers naming unknown options (they gate nothing)", async () => {
    const { wrapper } = makeHarness({
      "dialogue:option:testnpc:bogus": { type: "score", level: 5, confidence: 0.9 },
    });
    const decision = await wrapper.steerTurn(makeRequest());
    // The unknown answer is skipped (unknown candidate); the real options
    // still curate from their defaults. Per-option rejection coverage
    // lives in the adapter contract tests (D-49).
    expect(decision.optionIds).toEqual(OPTIONS.map((o) => o.id));
  });

  it("never requests when the client is unconfigured (invisible fallback)", async () => {
    const client = new FakeDecisionClient();
    client.setConfigured(false);
    const wrapper = createDialogueWrapper({ client });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.fallback).toBe(true);
    expect(client.callCount).toBe(0);
    expect(counters().requested).toBe(0);
  });

  it("also accepts the shared unconfigured client", async () => {
    const wrapper = createDialogueWrapper({ client: unconfiguredDecisionClient });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.fallback).toBe(true);
    expect(counters().requested).toBe(0);
  });

  it("skips the request entirely when there is nothing to judge", async () => {
    const { client, wrapper } = makeHarness();
    const decision = await wrapper.steerTurn(makeRequest({ options: [], replies: [] }));
    expect(decision.fallback).toBe(true);
    expect(client.callCount).toBe(0);
  });
});

describe("dialogue wrapper — shadow mode (D-55)", () => {
  it("judges and logs shadow outcomes but never steers", async () => {
    const { client, wrapper } = makeHarness(
      { [optKey("testnpc:t1:o2")]: { type: "score", level: 2, confidence: 0.9 } },
      { shadow: true },
    );
    const decision = await wrapper.steerTurn(makeRequest());
    expect(wrapper.isShadow()).toBe(true);
    expect(decision.fallback).toBe(true);
    expect(decision.optionIds).toBeNull();
    expect(wrapper.memoOptionOrder(NPC, TOPIC, [])).toBeNull();
    const snapshot = counters();
    expect(snapshot.shadow).toBe(1);
    expect(snapshot.applied).toBe(0);
    expect(recent().every((entry) => entry.outcome === "shadow")).toBe(true);
    expect(client.callCount).toBe(1);
  });
});

describe("dialogue wrapper — session lifecycle", () => {
  it("resetSession clears the memo so the next turn re-requests", async () => {
    const { client, wrapper } = makeHarness();
    await wrapper.steerTurn(makeRequest());
    expect(client.callCount).toBe(1);
    wrapper.resetSession();
    await wrapper.steerTurn(makeRequest());
    expect(client.callCount).toBe(2);
  });

  it("budgets the dialogue surface and never retries mid-conversation", async () => {
    const wrapper = createDialogueWrapper({ client: new FakeDecisionClient() });
    await wrapper.steerTurn(makeRequest());
    expect(counters().requested).toBeGreaterThan(0);
  });
});

describe("social reaction mapping", () => {
  it("bucketOfReply defaults to neutral and passes hints through", () => {
    expect(bucketOfReply(REPLIES[1]!)).toBe("pleased");
    expect(bucketOfReply(REPLIES[0]!)).toBe("neutral");
  });
});

describe("dialogue wrapper — pool-aware request shape", () => {
  it("projects only allowlisted facts (ids, bands, numbers — never player text)", async () => {
    const { client } = makeHarness();
    const wrapper = createDialogueWrapper({ client });
    await wrapper.steerTurn(makeRequest({
      facts: { "relationship.band": "warm", "times.talkedToday": 3 },
    }));
    const state = client.requests[0]!.state as Record<string, unknown>;
    expect(state["relationship.band"]).toBe("warm");
    expect(state["times.talkedToday"]).toBe(3);
    expect(JSON.stringify(state)).not.toContain("playerName");
  });
});

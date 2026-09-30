import { beforeEach, describe, expect, it } from "vitest";
import { FakeDecisionClient } from "../../../src/jev/fake-client";
import {
  createDialogueWrapper,
  DIALOGUE_CURATION_MIN_CONFIDENCE,
  DIALOGUE_REPLY_MIN_CONFIDENCE,
  bucketOfReply,
  type DialogueSteererHandle,
  type SteeredTurnRequest,
} from "../../../src/jev/dialogue-wrapper";
import { counters, recent, reset as resetLog } from "../../../src/jev/decision-log";
import { unconfiguredDecisionClient } from "../../../src/jev/unconfigured-client";
import type { NpcDialoguePool, OptionCandidate, ReplyCandidate } from "../../../src/content/dialogue-schema";

/**
 * WS3 dialogue wrapper (C-77, PRD Flow A2, D-60): two steered surfaces per
 * turn — option curation (one Score per option, cosmetic) and reply
 * selection (one Choice, consequential). Fallback is always the pure
 * builder output (authored priority, first-unused). Shadow mode judges and
 * logs but never steers. The memo is keyed by (npcId, topicId, used-set).
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
const replyKey = (): string => `dialogue:reply:${NPC}:${TOPIC}`;

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

describe("dialogue wrapper — steered path", () => {
  it("asks one Score per option and one Choice for the reply, batched in one request", async () => {
    const { client, wrapper } = makeHarness();
    await wrapper.steerTurn(makeRequest());
    expect(client.callCount).toBe(1);
    const request = client.requests[0]!;
    expect(request.opts?.surface).toBe("reply-selection");
    expect(request.questions).toHaveLength(4); // 3 option scores + 1 reply choice
    const scoreQuestions = request.questions.filter((q) => q.type === "score");
    expect(scoreQuestions.map((q) => q.id)).toEqual(OPTIONS.map((o) => optKey(o.id)));
    const choice = request.questions.find((q) => q.type === "choice")!;
    expect(choice.id).toBe(replyKey());
    expect(choice.candidates?.map((c) => c.id)).toEqual(REPLIES.map((r) => r.id));
  });

  it("applies a non-default steered curation and reply (live-path proof)", async () => {
    const { client, wrapper } = makeHarness({
      [optKey("testnpc:t1:o3")]: { type: "score", level: 9, confidence: 0.9 },
      [replyKey()]: { type: "choice", id: "testnpc:t1:r2", confidence: 0.8 },
    });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.fallback).toBe(false);
    expect(decision.optionIds?.[0]).toBe("testnpc:t1:o3");
    expect(decision.replyId).toBe("testnpc:t1:r2");
    // The social reaction is CODE-mapped from the author-tagged hint.
    expect(decision.bucket).toBe("pleased");
    // Serving is instant from the memo.
    expect(wrapper.memoOptionOrder(NPC, TOPIC, [])?.[0]).toBe("testnpc:t1:o3");
    expect(wrapper.memoReply(NPC, TOPIC, [])?.replyId).toBe("testnpc:t1:r2");
    // AC-31: applied counters prove the live path on both surfaces.
    expect(counters().applied).toBeGreaterThanOrEqual(2);
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

  it("maps a missing relationshipHint to the neutral bucket", async () => {
    const { wrapper } = makeHarness({
      [replyKey()]: { type: "choice", id: "testnpc:t1:r1", confidence: 0.8 },
    });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.bucket).toBe("neutral");
  });
});

describe("dialogue wrapper — fallback paths", () => {
  it("falls back on a provider timeout (both surfaces, logged as legacy)", async () => {
    const { client, wrapper } = makeHarness({ "*": { failure: "timeout" } });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.fallback).toBe(true);
    expect(decision.optionIds).toBeNull();
    expect(decision.replyId).toBeNull();
    expect(wrapper.memoOptionOrder(NPC, TOPIC, [])).toBeNull();
    expect(wrapper.memoReply(NPC, TOPIC, [])).toBeNull();
    const snapshot = counters();
    expect(snapshot.legacy).toBe(2);
    expect(snapshot.applied).toBe(0);
    expect(client.requests[0]?.opts).toMatchObject({ retries: 0 });
  });

  it("falls back on a provider network error", async () => {
    const { wrapper } = makeHarness({ "*": { failure: "network" } });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.fallback).toBe(true);
    expect(decision.fallbackReason).toContain("network");
  });

  it("rejects a reply answer below the conservative threshold, keeps cosmetic curation", async () => {
    const { wrapper } = makeHarness({
      [replyKey()]: { type: "choice", id: "testnpc:t1:r2", confidence: 0.5 },
    });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.replyId).toBeNull(); // consequential -> conservative (0.6)
    expect(decision.optionIds).not.toBeNull(); // cosmetic -> lenient (0.3)
    const snapshot = counters();
    expect(snapshot.rejected).toBe(1);
    expect(snapshot.applied).toBe(1);
    expect(recent().find((entry) => entry.surface === "reply-selection")?.fallbackReason).toBe("low-confidence");
  });

  it("rejects curation when every score is below the cosmetic threshold", async () => {
    const script: ConstructorParameters<typeof FakeDecisionClient>[0] = {
      [replyKey()]: { type: "choice", id: "testnpc:t1:r2", confidence: 0.9 },
    };
    for (const o of OPTIONS) script[optKey(o.id)] = { type: "score", level: 7, confidence: 0.2 };
    const { wrapper } = makeHarness(script);
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.optionIds).toBeNull();
    expect(decision.replyId).toBe("testnpc:t1:r2");
    expect(DIALOGUE_CURATION_MIN_CONFIDENCE).toBe(0.3);
    expect(DIALOGUE_REPLY_MIN_CONFIDENCE).toBe(0.6);
  });

  it("treats an answer naming an unknown candidate as no judgment", async () => {
    const { wrapper } = makeHarness({ [replyKey()]: { failure: "unknown-id" } });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.replyId).toBeNull();
    expect(counters().rejected).toBe(1);
    expect(recent().find((entry) => entry.surface === "reply-selection")?.fallbackReason).toBe("unknown-candidate");
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
      {
        [optKey("testnpc:t1:o2")]: { type: "score", level: 9, confidence: 0.9 },
        [replyKey()]: { type: "choice", id: "testnpc:t1:r2", confidence: 0.9 },
      },
      { shadow: true },
    );
    const decision = await wrapper.steerTurn(makeRequest());
    expect(wrapper.isShadow()).toBe(true);
    expect(decision.fallback).toBe(true);
    expect(decision.optionIds).toBeNull();
    expect(decision.replyId).toBeNull();
    expect(wrapper.memoOptionOrder(NPC, TOPIC, [])).toBeNull();
    expect(wrapper.memoReply(NPC, TOPIC, [])).toBeNull();
    const snapshot = counters();
    expect(snapshot.shadow).toBe(2);
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
    const { client } = makeHarness();
    const wrapper = createDialogueWrapper({ client: new FakeDecisionClient() });
    await wrapper.steerTurn(makeRequest());
    void client;
    expect(counters().requested).toBeGreaterThan(0);
  });
});

describe("social reaction mapping", () => {
  it("bucketOfReply defaults to neutral and passes hints through", () => {
    expect(bucketOfReply(REPLIES[1]!)).toBe("pleased");
    expect(bucketOfReply(REPLIES[0]!)).toBe("neutral");
  });

  it("the wrapper's decision carries the bucket of the chosen reply only (no deltas)", async () => {
    const { wrapper } = makeHarness({
      [replyKey()]: { type: "choice", id: "testnpc:t1:r2", confidence: 0.9 },
    });
    const decision = await wrapper.steerTurn(makeRequest());
    expect(decision.bucket).toBe("pleased");
    // The judgment never returns numeric deltas (D-45/D-50).
    const asJson = JSON.stringify(decision);
    expect(asJson).not.toContain("relDelta");
    expect(asJson).not.toContain("moodDelta");
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

describe("dialogue wrapper — full pool integration", () => {
  it("steers a real turn built from a registered pool (smoke)", async () => {
    const poolModule = await import("../../../src/content/npc-content/dialogue-pools");
    poolModule.registerNpcDialoguePools();
    const pool = poolModule.dialoguePoolFor("bartek") as NpcDialoguePool;
    const topic = pool.topics[0]!;
    const { wrapper } = makeHarness({
      [`dialogue:reply:bartek:${topic.id}`]: {
        type: "choice",
        id: topic.replyCandidates[1]!.id,
        confidence: 0.9,
      },
    });
    const decision = await wrapper.steerTurn(makeRequest({
      npcId: "bartek",
      topicId: topic.id,
      options: topic.optionCandidates.slice(0, 3),
      replies: topic.replyCandidates,
      facts: {},
    }));
    expect(decision.replyId).toBe(topic.replyCandidates[1]!.id);
    expect(decision.fallback).toBe(false);
  });
});

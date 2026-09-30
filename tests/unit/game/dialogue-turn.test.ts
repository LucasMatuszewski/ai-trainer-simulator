import { describe, expect, it } from "vitest";
import {
  buildTurn,
  newConversationSession,
  recordExchange,
  turnContextFor,
  usedSetFingerprint,
  type ConversationSession,
  type DialogueTurn,
} from "../../../src/game/dialogue-turn";
import {
  EXIT_TOPIC_ID,
  V2_MEMORY_TREE_ID,
  WRAP_UP_OPTION_ID,
  type ContextTag,
  type DialogueTurnMemory,
  type NpcDialoguePool,
  type OptionCandidate,
  type ReplyCandidate,
  type TaskOffer,
} from "../../../src/content/dialogue-schema";
import type { GameStats, GameState, TimeOfDay } from "../../../src/types";

/**
 * WS3 dialogue v2 turn builder (C-77, PRD Flow A2): pure per-turn
 * construction. Hard context filters, exclusion of used candidate ids,
 * the < 2 unused pivot, the always-available exit set, and the
 * deterministic fallback order (first-unused by authored priority).
 */

const NPC = "testnpc";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeState(overrides: {
  relationship?: number;
  flags?: Record<string, boolean>;
  period?: TimeOfDay;
  stats?: Partial<GameStats>;
} = {}): GameState {
  return {
    npcRelationships: { [NPC]: overrides.relationship ?? 50 },
    flags: overrides.flags ?? {},
    timeOfDay: overrides.period ?? "morning",
    stats: { credibility: 50, caffeine: 50, patience: 50, focus: 50, ...overrides.stats },
  } as unknown as GameState;
}

function emptyMemory(): DialogueTurnMemory {
  return { usedOptionIds: new Set<string>(), usedReplyIds: new Set<string>() };
}

function memoryWith(optionIds: string[]): DialogueTurnMemory {
  return { usedOptionIds: new Set(optionIds), usedReplyIds: new Set<string>() };
}

function opts(
  topicId: string,
  ids: readonly string[],
  tags?: Record<string, readonly ContextTag[]>,
): OptionCandidate[] {
  return ids.map((id): OptionCandidate => ({
    id: `${topicId}:${id}`,
    topicId,
    text: `Say ${id} to the NPC.`,
    ...(tags?.[id] !== undefined ? { tags: tags[id] } : {}),
  }));
}

function replies(
  topicId: string,
  entries: ReadonlyArray<{ id: string; tags?: readonly ContextTag[]; task?: string }>,
): ReplyCandidate[] {
  return entries.map((entry): ReplyCandidate => ({
    id: `${topicId}:${entry.id}`,
    text: `The NPC answers ${entry.id} at length, in character, with an ironic observation about office life.`,
    ...(entry.tags !== undefined ? { tags: entry.tags } : {}),
    ...(entry.task !== undefined ? { offersTaskId: entry.task } : {}),
  }));
}

const TASKS: TaskOffer[] = [
  {
    id: "test:task-1",
    title: "Test task",
    description: "A synthetic task offer used by the turn builder tests.",
    flagToSet: "test-task-flag",
  },
];

function makePool(): NpcDialoguePool {
  return {
    npcId: NPC,
    topics: [
      {
        id: "t:main",
        label: "Main",
        optionCandidates: opts("t:main", ["o1", "o2", "o3", "o4", "o5"]),
        replyCandidates: replies("t:main", [
          { id: "r1", task: "test:task-1" },
          { id: "r2" },
          { id: "r3" },
          { id: "r4" },
          { id: "r5" },
          { id: "r6" },
        ]),
      },
      {
        id: "t:rich",
        label: "Richest",
        optionCandidates: opts("t:rich", ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"]),
        replyCandidates: replies("t:rich", [
          { id: "q1" },
          { id: "q2" },
          { id: "q3" },
          { id: "q4" },
          { id: "q5" },
          { id: "q6" },
        ]),
      },
      {
        id: "t:gated",
        label: "Flag gated",
        requiresFlags: ["gate-on"],
        blockedByFlags: ["gate-off"],
        optionCandidates: opts("t:gated", ["g1", "g2", "g3", "g4"]),
        replyCandidates: replies("t:gated", [{ id: "h1" }, { id: "h2" }, { id: "h3" }, { id: "h4" }]),
      },
      {
        id: "t:warm",
        label: "Warm friends only",
        minRelationship: 60,
        optionCandidates: [
          ...opts("t:warm", ["w1", "w2", "w3"]),
          ...opts("t:warm", ["w4"], { w4: ["relationship:warm"] }),
        ],
        replyCandidates: [
          ...replies("t:warm", [{ id: "s1" }, { id: "s2" }]),
          ...replies("t:warm", [{ id: "s3" }], ).map((r) => ({ ...r, tags: ["relationship:hostile" as const] })),
        ],
      },
      {
        id: "t:morning",
        label: "Mornings only",
        periods: ["morning"],
        optionCandidates: opts("t:morning", ["m1", "m2", "m3"], {
          m3: ["period:lunch"],
        }),
        replyCandidates: replies("t:morning", [{ id: "n1" }, { id: "n2" }, { id: "n3" }]),
      },
    ],
    taskOffers: TASKS,
  };
}

/** Returns the ids of the turn's non-exit options, in order. */
function optionIds(turn: DialogueTurn): string[] {
  return turn.options.filter((entry) => !entry.isExit).map((entry) => entry.option.id);
}

function exitOption(turn: DialogueTurn): { found: boolean } {
  return { found: turn.options.some((entry) => entry.isExit && entry.option.id === WRAP_UP_OPTION_ID) };
}

function sessionWith(
  currentTopicId: string | null,
  usage: Record<string, { options?: string[]; replys?: string[] }>,
): ConversationSession {
  const session = newConversationSession();
  session.currentTopicId = currentTopicId;
  for (const [topicId, entry] of Object.entries(usage)) {
    session.usage[topicId] = {
      usedOptionIds: new Set(entry.options ?? []),
      usedReplyIds: new Set(entry.replys ?? []),
    };
  }
  return session;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("buildTurn — pool resolution", () => {
  it("returns null when the NPC has no pool and no override was given", () => {
    const turn = buildTurn(makeState(), "grazyna", emptyMemory(), newConversationSession());
    expect(turn).toBeNull();
  });

  it("uses the override pool when given", () => {
    const turn = buildTurn(makeState(), NPC, emptyMemory(), newConversationSession(), makePool());
    expect(turn).not.toBeNull();
    expect(turn!.topicId).toBe("t:rich"); // 8 unused options beats 6
  });
});

describe("buildTurn — curation fallback order and the exit slot", () => {
  it("shows at most 3 topic options plus the always-available exit", () => {
    const turn = buildTurn(makeState(), NPC, emptyMemory(), newConversationSession(), makePool())!;
    expect(turn.options.length).toBe(4);
    expect(optionIds(turn)).toEqual(["t:rich:p1", "t:rich:p2", "t:rich:p3"]);
    expect(exitOption(turn).found).toBe(true);
  });

  it("prefers authored priority order (first-unused first) deterministically", () => {
    const memory = memoryWith(["t:rich:p1", "t:rich:p3"]);
    const turn = buildTurn(makeState(), NPC, memory, newConversationSession(), makePool())!;
    expect(optionIds(turn)).toEqual(["t:rich:p2", "t:rich:p4", "t:rich:p5"]);
  });

  it("excludes candidates used in the session as well as in memory", () => {
    const session = sessionWith(null, { "t:rich": { options: ["t:rich:p1", "t:rich:p2"] } });
    const turn = buildTurn(makeState(), NPC, emptyMemory(), session, makePool())!;
    expect(optionIds(turn)).toEqual(["t:rich:p3", "t:rich:p4", "t:rich:p5"]);
  });
});

describe("buildTurn — hard context filters", () => {
  it("respects requiresFlags and blockedByFlags on topics", () => {
    const on = buildTurn(
      makeState({ flags: { "gate-on": true } }),
      NPC, emptyMemory(), newConversationSession(), makePool(),
    )!;
    expect(on.topicId).not.toBe("t:gated"); // rich still wins on richness

    // Consume rich + main so only the gated thread could serve.
    const memory = memoryWith([
      "t:rich:p1", "t:rich:p2", "t:rich:p3", "t:rich:p4", "t:rich:p5", "t:rich:p6", "t:rich:p7", "t:rich:p8",
      "t:main:o1", "t:main:o2", "t:main:o3", "t:main:o4", "t:main:o5", "t:main:o6",
    ]);
    const gated = buildTurn(
      makeState({ flags: { "gate-on": true } }),
      NPC, memory, newConversationSession(), makePool(),
    )!;
    expect(gated.topicId).toBe("t:gated");
    expect(optionIds(gated)).toEqual(["t:gated:g1", "t:gated:g2", "t:gated:g3"]);

    const blocked = buildTurn(
      makeState({ flags: { "gate-on": true, "gate-off": true }, period: "afternoon" }),
      NPC, memory, newConversationSession(), makePool(),
    )!;
    expect(blocked.exhausted).toBe(true);
  });

  it("respects the topic relationship window", () => {
    // Neutral player (50): t:warm (min 60) is ineligible; consume the rest.
    const memory = memoryWith([
      "t:rich:p1", "t:rich:p2", "t:rich:p3", "t:rich:p4", "t:rich:p5", "t:rich:p6", "t:rich:p7", "t:rich:p8",
      "t:main:o1", "t:main:o2", "t:main:o3", "t:main:o4", "t:main:o5", "t:main:o6",
      "t:morning:m1", "t:morning:m2",
    ]);
    const neutral = buildTurn(makeState({ period: "afternoon" }), NPC, memory, newConversationSession(), makePool())!;
    expect(neutral.exhausted).toBe(true);

    // Warm player (70): t:warm becomes eligible and serves.
    const warm = buildTurn(
      makeState({ relationship: 70, period: "afternoon" }),
      NPC, memory, newConversationSession(), makePool(),
    )!;
    expect(warm.topicId).toBe("t:warm");
  });  it("filters candidates by relationship band tags", () => {
    const state = makeState({ relationship: 70, period: "afternoon" });
    const memory = memoryWith([
      "t:rich:p1", "t:rich:p2", "t:rich:p3", "t:rich:p4", "t:rich:p5", "t:rich:p6", "t:rich:p7", "t:rich:p8",
      "t:main:o1", "t:main:o2", "t:main:o3", "t:main:o4", "t:main:o5", "t:main:o6",
      "t:warm:w1", "t:warm:w2", "t:warm:w3",
    ]);
    const turn = buildTurn(state, NPC, memory, newConversationSession(), makePool())!;
    // w4 is relationship:warm: eligible at 70.
    expect(optionIds(turn)).toEqual(["t:warm:w4"]);
    expect(turn.replyCandidates.map((r) => r.id)).toEqual(["t:warm:s1", "t:warm:s2"]); // s3 is hostile-only

    const neutralTurn = buildTurn(
      makeState({ relationship: 50, period: "afternoon" }),
      NPC,
      memoryWith([
        "t:rich:p1", "t:rich:p2", "t:rich:p3", "t:rich:p4", "t:rich:p5", "t:rich:p6", "t:rich:p7", "t:rich:p8",
        "t:main:o1", "t:main:o2", "t:main:o3", "t:main:o4", "t:main:o5", "t:main:o6",
        "t:warm:w1", "t:warm:w2", "t:warm:w3", "t:warm:w4",
      ]),
      newConversationSession(),
      makePool(),
    )!;
    // At 50, w4 (warm tag) is filtered; no warm-topic option remains -> exit.
    expect(neutralTurn.exhausted).toBe(true);
  });

  it("filters candidates by period tags and topics by periods", () => {
    // t:morning is morning-only, with one option further gated to lunch.
    const morning = buildTurn(
      makeState({ period: "morning" }),
      NPC,
      memoryWith([
        "t:rich:p1", "t:rich:p2", "t:rich:p3", "t:rich:p4", "t:rich:p5", "t:rich:p6", "t:rich:p7", "t:rich:p8",
        "t:main:o1", "t:main:o2", "t:main:o3", "t:main:o4", "t:main:o5", "t:main:o6",
      ]),
      newConversationSession(),
      makePool(),
    )!;
    expect(morning.topicId).toBe("t:morning");
    expect(optionIds(morning)).toEqual(["t:morning:m1", "t:morning:m2"]); // m3 is period:lunch

    // In the afternoon the topic itself is ineligible: nothing remains.
    const afternoon = buildTurn(
      makeState({ period: "afternoon" }),
      NPC,
      memoryWith([
        "t:rich:p1", "t:rich:p2", "t:rich:p3", "t:rich:p4", "t:rich:p5", "t:rich:p6", "t:rich:p7", "t:rich:p8",
        "t:main:o1", "t:main:o2", "t:main:o3", "t:main:o4", "t:main:o5", "t:main:o6",
        "t:morning:m1", "t:morning:m2", "t:morning:m3",
      ]),
      newConversationSession(),
      makePool(),
    )!;
    expect(afternoon.exhausted).toBe(true);
  });

  it("filters candidates by stats tags", () => {
    const pool: NpcDialoguePool = {
      npcId: NPC,
      topics: [
        {
          id: "t:stat",
          label: "Stats",
          optionCandidates: [
            { id: "t:stat:low", topicId: "t:stat", text: "Low caffeine line.", tags: ["stats:low-caffeine"] },
            { id: "t:stat:high", topicId: "t:stat", text: "High credibility line.", tags: ["stats:high-credibility"] },
            { id: "t:stat:any", topicId: "t:stat", text: "Always eligible line." },
          ],
          replyCandidates: replies("t:stat", [{ id: "a1" }, { id: "a2" }]),
        },
      ],
      taskOffers: [],
    };
    const mid = buildTurn(makeState(), NPC, emptyMemory(), newConversationSession(), pool)!;
    expect(optionIds(mid)).toEqual(["t:stat:any"]);
    const low = buildTurn(makeState({ stats: { caffeine: 30 } }), NPC, emptyMemory(), newConversationSession(), pool)!;
    expect(optionIds(low)).toEqual(["t:stat:low", "t:stat:any"]);
    const high = buildTurn(
      makeState({ stats: { credibility: 70, caffeine: 50 } }),
      NPC, emptyMemory(), newConversationSession(), pool,
    )!;
    expect(optionIds(high)).toEqual(["t:stat:high", "t:stat:any"]);
  });

  it("filters candidates by event and quest tags", () => {
    const pool: NpcDialoguePool = {
      npcId: NPC,
      topics: [
        {
          id: "t:flags",
          label: "Flags",
          optionCandidates: [
            { id: "t:stat:event", topicId: "t:flags", text: "Event line.", tags: ["event:test-event"] },
            { id: "t:stat:quest", topicId: "t:flags", text: "Quest line.", tags: ["quest:test-quest"] },
            { id: "t:stat:none", topicId: "t:flags", text: "Always eligible line." },
          ],
          replyCandidates: replies("t:flags", [{ id: "a1" }, { id: "a2" }]),
        },
      ],
      taskOffers: [],
    };
    const off = buildTurn(makeState(), NPC, emptyMemory(), newConversationSession(), pool)!;
    expect(optionIds(off)).toEqual(["t:stat:none"]);
    const on = buildTurn(
      makeState({ flags: { "test-event": true, "test-quest": true } }),
      NPC, emptyMemory(), newConversationSession(), pool,
    )!;
    expect(optionIds(on)).toEqual(["t:stat:event", "t:stat:quest", "t:stat:none"]);
  });
});

describe("buildTurn — the pivot (C-77: never loops)", () => {
  it("stays on the current topic while it has at least 2 unused options", () => {
    const session = sessionWith("t:main", { "t:main": { options: ["t:main:o1", "t:main:o2", "t:main:o3"] } });
    const turn = buildTurn(makeState(), NPC, emptyMemory(), session, makePool())!;
    expect(turn.topicId).toBe("t:main"); // even though t:rich has more unused
    expect(turn.pivotedFromTopicId).toBeNull();
  });

  it("pivots to the richest eligible topic when the current one has < 2 unused", () => {
    const session = sessionWith("t:main", {
      "t:main": { options: ["t:main:o1", "t:main:o2", "t:main:o3", "t:main:o4"] },
    });
    const turn = buildTurn(makeState(), NPC, emptyMemory(), session, makePool())!;
    expect(turn.topicId).toBe("t:rich");
    expect(turn.pivotedFromTopicId).toBe("t:main");
    expect(optionIds(turn)).toEqual(["t:rich:p1", "t:rich:p2", "t:rich:p3"]);
  });

  it("serves a 1-option current topic only when nothing richer exists", () => {
    const memory = memoryWith([
      "t:rich:p1", "t:rich:p2", "t:rich:p3", "t:rich:p4", "t:rich:p5", "t:rich:p6", "t:rich:p7", "t:rich:p8",
      "t:main:o1", "t:main:o2", "t:main:o3", "t:main:o4",
      "t:morning:m1", "t:morning:m2",
    ]);
    const session = sessionWith("t:main", {});
    const turn = buildTurn(makeState(), NPC, memory, session, makePool())!;
    expect(turn.topicId).toBe("t:main");
    expect(optionIds(turn)).toEqual(["t:main:o5"]);
    expect(turn.pivotedFromTopicId).toBeNull();
  });
});

describe("buildTurn — exhaustion and the exit set", () => {
  const everythingUsed = [
    "t:rich:p1", "t:rich:p2", "t:rich:p3", "t:rich:p4", "t:rich:p5", "t:rich:p6", "t:rich:p7", "t:rich:p8",
    "t:main:o1", "t:main:o2", "t:main:o3", "t:main:o4", "t:main:o5", "t:main:o6",
    "t:morning:m1", "t:morning:m2", "t:morning:m3",
  ];

  it("returns the always-available exit set when nothing is left", () => {
    const turn = buildTurn(
      makeState({ period: "afternoon" }),
      NPC,
      memoryWith(everythingUsed),
      newConversationSession(),
      makePool(),
    )!;
    expect(turn.exhausted).toBe(true);
    expect(turn.topicId).toBe(EXIT_TOPIC_ID);
    expect(exitOption(turn).found).toBe(true);
    expect(turn.options.length).toBeGreaterThanOrEqual(2);
    expect(turn.replyCandidates.length).toBeGreaterThan(0);
    // Small talk comes from the generic fallback pool.
    expect(turn.replyCandidates[0]!.id.startsWith("generic:")).toBe(true);
  });

  it("generic exit small talk is NOT memory-suppressed", () => {
    const turn = buildTurn(
      makeState({ period: "afternoon" }),
      NPC,
      memoryWith([...everythingUsed, "generic:smalltalk:opt-1", "generic:smalltalk:opt-2"]),
      newConversationSession(),
      makePool(),
    )!;
    const ids = optionIds(turn);
    expect(ids).toContain("generic:smalltalk:opt-1");
    expect(ids).toContain("generic:smalltalk:opt-2");
  });
});

describe("buildTurn — a session never repeats an option", () => {
  it("plays a full conversation without any option id repeating", () => {
    let memory = emptyMemory();
    let session = newConversationSession();
    const seen = new Set<string>();
    const turns: DialogueTurn[] = [];

    for (let i = 0; i < 30; i += 1) {
      const turn = buildTurn(makeState(), NPC, memory, session, makePool());
      if (turn === null) throw new Error("pool vanished mid-conversation");
      turns.push(turn);
      if (turn.exhausted) break;
      const pick = turn.options.find((entry) => !entry.isExit);
      if (pick === undefined) break;
      expect(seen.has(pick.option.id), `option repeated: ${pick.option.id}`).toBe(false);
      seen.add(pick.option.id);
      const reply = turn.replyCandidates[0]!;
      memory = {
        usedOptionIds: new Set([...memory.usedOptionIds, pick.option.id]),
        usedReplyIds: memory.usedReplyIds,
      };
      session = recordExchange(session, turn.topicId, pick.option.id, reply.id);
    }

    // The conversation must eventually exhaust (finite pools) and must have
    // served several distinct threads on the way.
    expect(turns[turns.length - 1]!.exhausted).toBe(true);
    expect(new Set(turns.map((t) => t.topicId)).size).toBeGreaterThanOrEqual(3);
  });
});

describe("buildTurn — task offers", () => {
  it("offers the referenced task while its flag is unset", () => {
    const seeded = sessionWith("t:main", { "t:main": { options: ["t:main:o1", "t:main:o2", "t:main:o3"] } });
    const turnOnMain = buildTurn(makeState(), NPC, emptyMemory(), seeded, makePool())!;
    expect(turnOnMain.topicId).toBe("t:main");
    expect(turnOnMain.replyCandidates[0]!.offersTaskId).toBe("test:task-1");
    expect(turnOnMain.taskOffers.map((t) => t.flagToSet)).toEqual(["test-task-flag"]);
  });

  it("gates a task offer away once its flag is set (never re-offers)", () => {
    const seeded = sessionWith("t:main", { "t:main": { options: ["t:main:o1"] } });
    const turn = buildTurn(
      makeState({ flags: { "test-task-flag": true } }),
      NPC, emptyMemory(), seeded, makePool(),
    )!;
    expect(turn.replyCandidates.map((r) => r.id)).not.toContain("t:main:r1");
    expect(turn.taskOffers).toEqual([]);
  });
});

describe("buildTurn — reply fallback order", () => {
  it("recycles replies (never returns an empty reply pool) while options remain", () => {
    const seeded = sessionWith("t:main", {
      "t:main": {
        options: ["t:main:o1", "t:main:o2", "t:main:o3"],
        replys: ["t:main:r1", "t:main:r2", "t:main:r3", "t:main:r4", "t:main:r5", "t:main:r6"],
      },
    });
    const turn = buildTurn(makeState(), NPC, emptyMemory(), seeded, makePool())!;
    expect(turn.topicId).toBe("t:main");
    expect(turn.replyCandidates.length).toBe(6); // recycled, authored order
    expect(turn.replyCandidates[0]!.id).toBe("t:main:r1");
  });
});

describe("conversation helpers", () => {
  it("recordExchange is pure: it returns a new session and never mutates the input", () => {
    const session = newConversationSession();
    const frozenUsage = JSON.stringify(Object.keys(session.usage));
    const next = recordExchange(session, "t:main", "t:main:o1", "t:main:r1");
    expect(next.currentTopicId).toBe("t:main");
    expect(next.usage["t:main"]!.usedOptionIds.has("t:main:o1")).toBe(true);
    expect(next.usage["t:main"]!.usedReplyIds.has("t:main:r1")).toBe(true);
    expect(session.currentTopicId).toBeNull();
    expect(JSON.stringify(Object.keys(session.usage))).toBe(frozenUsage);
  });

  it("usedSetFingerprint is order-independent and content-sensitive", () => {
    expect(usedSetFingerprint(["a", "b", "c"])).toBe(usedSetFingerprint(["c", "a", "b"]));
    expect(usedSetFingerprint(["a", "b"])).not.toBe(usedSetFingerprint(["a", "b", "c"]));
    expect(usedSetFingerprint([])).toBe("");
  });

  it("turnContextFor reads relationship, flags, period and stats from state", () => {
    const ctx = turnContextFor(makeState({ relationship: 70, period: "lunch", flags: { x: true } }), NPC);
    expect(ctx.relationship).toBe(70);
    expect(ctx.period).toBe("lunch");
    expect(ctx.flags["x"]).toBe(true);
    expect(ctx.stats.caffeine).toBe(50);
  });
});

describe("v2 memory tree id", () => {
  it("uses the dedicated dialogue-v2 tree id in the per-NPC memory", () => {
    expect(V2_MEMORY_TREE_ID).toBe("dialogue-v2");
  });
});

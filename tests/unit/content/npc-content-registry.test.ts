import { afterEach, describe, expect, it } from "vitest";
import {
  NPC_CONTENT,
  registerNpcContent,
  type NpcContentEntry,
} from "../../../src/content/npc-content/registry";
import type {
  DecisionAnswer,
  DecisionHooks,
  DecisionRequest,
} from "../../../src/jev/contracts";
import type { NpcId } from "../../../src/types";

/**
 * WS0 seam (ADR-0009 D-52): the npc-content registry is pre-created so
 * the Wave-3 content authors never share a file, and the shared Jev
 * contract types exist before any wave builds on them. Nothing imports
 * content yet - these tests pin the SHAPE only.
 */

const KNOWN_IDS: NpcId[] = [
  "bartek", "klaudia", "marek", "zosia", "pawel", "kasia", "tomek",
  "ania", "janusz", "burek", "grazyna", "maciek", "przemek", "dawid", "renata",
];

afterEach(() => {
  // Registry tests must not leak entries into other suites.
  for (const key of Object.keys(NPC_CONTENT) as NpcId[]) {
    delete NPC_CONTENT[key];
  }
});

describe("npc-content registry (WS0 pre-created, D-52)", () => {
  it("starts empty: no NPC has content registered", () => {
    for (const id of KNOWN_IDS) {
      expect(NPC_CONTENT[id]).toBeUndefined();
    }
  });

  it("registerNpcContent stores the entry under the NPC id", () => {
    const entry: NpcContentEntry = {
      replyCandidates: [{ id: "rc-1", text: "Works on my machine." }],
    };
    registerNpcContent("bartek", entry);
    expect(NPC_CONTENT.bartek).toBe(entry);
  });

  it("re-registering for the same NPC overwrites the previous entry", () => {
    const first: NpcContentEntry = { replyCandidates: [{ id: "a", text: "a" }] };
    const second: NpcContentEntry = { replyCandidates: [{ id: "b", text: "b" }] };
    registerNpcContent("klaudia", first);
    registerNpcContent("klaudia", second);
    expect(NPC_CONTENT.klaudia).toBe(second);
    expect(NPC_CONTENT.klaudia).not.toBe(first);
  });

  it("NpcContentEntry fields are optional and independent", () => {
    const empty: NpcContentEntry = {};
    registerNpcContent("zosia", empty);
    expect(NPC_CONTENT.zosia).toEqual({});

    const poolsOnly: NpcContentEntry = {
      argumentPools: [{ id: "arg-it", topic: "it", lines: ["Tabs are spaces."] }],
      questionPools: [{ id: "q-hard", topic: "ai", questions: ["Define AI."] }],
    };
    registerNpcContent("tomek", poolsOnly);
    expect(NPC_CONTENT.tomek?.replyCandidates).toBeUndefined();
    expect(NPC_CONTENT.tomek?.argumentPools).toEqual(poolsOnly.argumentPools);
    expect(NPC_CONTENT.tomek?.questionPools).toEqual(poolsOnly.questionPools);
  });
});

describe("Jev shared contract types (ADR-0009 section 4)", () => {
  it("DecisionHooks exposes the six WS0 surfaces as optional members", () => {
    // The empty object must typecheck: every member is optional.
    const none: DecisionHooks = {};
    for (const key of [
      "pickMorningGreeting",
      "pickEveningGoodbye",
      "pickChatterPair",
      "pickChatterStarter",
      "pickChatterExchange",
      "pickRandomDestination",
    ]) {
      expect(key in none).toBe(false);
    }
    // A fully populated hook set must typecheck too.
    const full: DecisionHooks = {
      pickMorningGreeting: () => "hi",
      pickEveningGoodbye: () => "bye",
      pickChatterPair: () => null,
      pickChatterStarter: (a, _b) => a,
      pickChatterExchange: (_pool, _starterId) => ({ starter: "s", responses: ["r"] }),
      pickRandomDestination: () => null,
    };
    expect(Object.keys(full)).toHaveLength(6);
  });

  it("DecisionAnswer is discriminated and the noul variant carries noul with NO confidence field", () => {
    const noul: DecisionAnswer = {
      type: "noul",
      decisionId: "d1",
      subjectId: "bartek",
      surface: "argument-trigger",
      questionId: "veto",
      noul: 0.42,
    };
    expect(noul.type).toBe("noul");
    expect(noul.noul).toBe(0.42);
    expect("confidence" in noul).toBe(false);

    const choice: DecisionAnswer = {
      type: "choice",
      decisionId: "d1",
      subjectId: "marek",
      surface: "greeting",
      questionId: "pick",
      id: "greet-2",
      confidence: 0.9,
    };
    expect(choice.type).toBe("choice");
    expect(choice.id).toBe("greet-2");
    expect(choice.confidence).toBe(0.9);

    const subset: DecisionAnswer = {
      type: "subset",
      decisionId: "d2",
      subjectId: "zosia",
      surface: "option-curation",
      questionId: "curate",
      ids: ["opt-3", "opt-1"],
      confidences: [0.8, 0.6],
    };
    expect(subset.ids).toEqual(["opt-3", "opt-1"]);

    const score: DecisionAnswer = {
      type: "score",
      decisionId: "d3",
      subjectId: "dawid",
      surface: "mission-answer",
      questionId: "q1",
      level: 7,
      confidence: 0.75,
    };
    expect(score.level).toBe(7);
  });

  it("DecisionRequest carries the decision id, generation, surface, subjects and projection", () => {
    const request: DecisionRequest = {
      decisionId: "dec-42",
      generation: "session-1",
      surface: "chatter-exchange",
      subjects: [
        {
          id: "bartek",
          candidates: [
            { id: "ex-1", description: "IT joke about the build", priority: 1 },
            { id: "ex-2", description: "Coffee small talk" },
          ],
          facts: { "relationship.band": "neutral", "needs.caffeine": "low" },
        },
      ],
      projection: { "npcs.bartek": { mood: "ok" } },
    };
    expect(request.decisionId).toBe("dec-42");
    expect(request.generation).toBe("session-1");
    expect(request.surface).toBe("chatter-exchange");
    expect(request.subjects).toHaveLength(1);
    expect(request.subjects[0]!.candidates).toHaveLength(2);
    expect(request.subjects[0]!.facts["needs.caffeine"]).toBe("low");
    expect(request.projection["npcs.bartek"]).toEqual({ mood: "ok" });
  });
});

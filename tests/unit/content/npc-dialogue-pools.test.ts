import { describe, expect, it } from "vitest";
import {
  EXIT_TOPIC_ID,
  OPTION_MAX_LENGTH,
  REPLY_MAX_LENGTH,
  VALIDATE_OK,
  validatePool,
  WRAP_UP_OPTION_ID,
  type DialogueTopic,
  type NpcDialoguePool,
} from "../../../src/content/dialogue-schema";
import {
  dialoguePoolFor,
  GENERIC_DIALOGUE_POOL,
  hasDialoguePool,
  registerNpcDialoguePools,
} from "../../../src/content/npc-content/dialogue-pools";
import { QUESTS } from "../../../src/content/quests";

/**
 * WS3 dialogue v2 pools (C-77, PRD Flow A2): authored pool data for
 * bartek, renata, klaudia, marek plus the generic fallback pool. These
 * tests pin schema validity, id uniqueness, the flag vocabulary, the tag
 * conventions, and tone spot-checks so future pure-data authoring cannot
 * silently corrupt the conversation engine.
 */

// The game's flag vocabulary: every flag the code base sets or reads via
// dialogue effects, actions, quest completion flags and event flags.
const QUEST_FLAGS = QUESTS.flatMap((q) => (q.completionFlag ? [q.completionFlag] : []));
const TREE_FLAGS = [
  "ania-killed-persona",
  "ania-saw-the-funnel",
  "ania-season-two",
  "ania-webinar-volunteered",
  "bartek-recommended-you",
  "bartek-shared-consulting-secret",
  "burek-fed",
  "burek-person",
  "burek-standup-observed",
  "ceo-met",
  "ceo-reviewed",
  "ceo-workshop-offered",
  "event-coffee-broken",
  "event-coffee-fixed",
  "got-acme-contract",
  "grazyna-candle-partner",
  "grazyna-course-idea",
  "grazyna-showed-the-books",
  "intro-seen",
  "janusz-knows-the-plug",
  "janusz-leave-printer",
  "janusz-told-the-flood",
  "kasia-leaked-bands",
  "kasia-referral-open",
  "kasia-revealed-the-role",
  "klaudia-course-partner",
  "klaudia-rebranded-you",
  "maciek-ai-first-deal",
  "maciek-blockchain-wins",
  "maciek-briefed-you",
  "maciek-training-buzzword",
  "marek-showed-the-log",
  "marek-trusted-review",
  "pawel-apprentice",
  "pawel-read-the-script",
  "przemek-bootcamp-sold",
  "przemek-legend-teacher",
  "przemek-robot-plan",
  "ran-debug-game",
  "renata-tut-asked-intro",
  "renata-tut-finished",
  "tutorial-offered",
  "tomek-apprentice",
  "tomek-reviewed-pr",
  "zosia-opened-up",
  "zosia-training-block",
];
const KNOWN_FLAGS = new Set([...QUEST_FLAGS, ...TREE_FLAGS]);

const POOLS: Record<string, NpcDialoguePool> = (() => {
  registerNpcDialoguePools();
  return {
    bartek: dialoguePoolFor("bartek")!,
    renata: dialoguePoolFor("renata")!,
    klaudia: dialoguePoolFor("klaudia")!,
    marek: dialoguePoolFor("marek")!,
    generic: GENERIC_DIALOGUE_POOL,
  };
})();

const AUTHORED_NPC_IDS = ["bartek", "renata", "klaudia", "marek"] as const;

describe("dialogue v2 pool registration", () => {
  it("registers the authored pools and leaves unregistered NPCs on legacy trees", () => {
    registerNpcDialoguePools();
    // WS3 wave.
    expect(hasDialoguePool("bartek")).toBe(true);
    expect(hasDialoguePool("renata")).toBe(true);
    expect(hasDialoguePool("klaudia")).toBe(true);
    expect(hasDialoguePool("marek")).toBe(true);
    // WS5 wave (C-77 authored expansion): every remaining roster NPC.
    expect(hasDialoguePool("zosia")).toBe(true);
    expect(hasDialoguePool("pawel")).toBe(true);
    expect(hasDialoguePool("kasia")).toBe(true);
    expect(hasDialoguePool("tomek")).toBe(true);
    expect(hasDialoguePool("ania")).toBe(true);
    expect(hasDialoguePool("janusz")).toBe(true);
    expect(hasDialoguePool("grazyna")).toBe(true);
    expect(hasDialoguePool("maciek")).toBe(true);
    expect(hasDialoguePool("przemek")).toBe(true);
    expect(hasDialoguePool("dawid")).toBe(true);
    expect(hasDialoguePool("burek")).toBe(true);
    // The generic fallback stays unregistered (it is the pivot target), and
    // unknown ids resolve to nothing.
    expect(hasDialoguePool("generic")).toBe(false);
    expect(hasDialoguePool("nobody")).toBe(false);
  });

  it("resolution is stable: the same pool object comes back per NPC", () => {
    registerNpcDialoguePools();
    expect(dialoguePoolFor("bartek")).toBe(POOLS.bartek);
    expect(dialoguePoolFor("nobody")).toBeUndefined();
  });
});

describe("dialogue v2 pool schema validity", () => {
  it("every pool (including generic) validates against the schema", () => {
    for (const [id, pool] of Object.entries(POOLS)) {
      expect(pool, `pool ${id} must exist`).toBeDefined();
      expect(validatePool(pool), `pool ${id}: ${validatePool(pool).join("; ")}`).toEqual(VALIDATE_OK);
    }
  });

  it("every candidate and task id is unique within its pool", () => {
    for (const pool of Object.values(POOLS)) {
      const ids = new Set<string>();
      for (const topic of pool.topics) {
        for (const option of topic.optionCandidates) {
          expect(ids.has(option.id), `duplicate option id ${option.id} in ${pool.npcId}`).toBe(false);
          ids.add(option.id);
        }
        for (const reply of topic.replyCandidates ?? []) {
          expect(ids.has(reply.id), `duplicate reply id ${reply.id} in ${pool.npcId}`).toBe(false);
          ids.add(reply.id);
        }
      }
      for (const task of pool.taskOffers) {
        expect(ids.has(task.id), `duplicate task id ${task.id} in ${pool.npcId}`).toBe(false);
        ids.add(task.id);
      }
    }
  });

  it("every authored NPC has >= 4 topics with 6-8 options and 6-8 replies, plus 1-2 tasks", () => {
    for (const npcId of AUTHORED_NPC_IDS) {
      const pool = POOLS[npcId]!;
      // WS5 round 2: 4 was the round-1 count; it is a floor now so the
      // pools can keep growing toward the 10x volume target.
      expect(pool.topics.length, `${npcId} topic count`).toBeGreaterThanOrEqual(4);
      for (const topic of pool.topics) {
        expect(
          topic.optionCandidates.length,
          `${npcId}/${topic.id} option count`,
        ).toBeGreaterThanOrEqual(6);
        expect(topic.optionCandidates.length, `${npcId}/${topic.id} option count`).toBeLessThanOrEqual(8);
        expect(
          (topic.replyCandidates ?? []).length,
          `${npcId}/${topic.id} reply count`,
        ).toBeGreaterThanOrEqual(6);
        expect((topic.replyCandidates ?? []).length, `${npcId}/${topic.id} reply count`).toBeLessThanOrEqual(8);
        // C-78 dialogue architecture v3: replies are POSITIONALLY PAIRED
        // to options (option i answers reply i). The counts must match —
        // a drift silently mis-pairs questions and answers.
        expect(
          topic.optionCandidates.length,
          `${npcId}/${topic.id} option/reply alignment`,
        ).toBe((topic.replyCandidates ?? []).length);
      }
      expect(pool.taskOffers.length, `${npcId} task count`).toBeGreaterThanOrEqual(1);
      expect(pool.taskOffers.length, `${npcId} task count`).toBeLessThanOrEqual(2);
    }
  });

  it("the generic fallback pool has small-talk topics and no task offers", () => {
    expect(GENERIC_DIALOGUE_POOL.npcId).toBe("generic");
    expect(GENERIC_DIALOGUE_POOL.topics.length).toBeGreaterThanOrEqual(3);
    for (const topic of GENERIC_DIALOGUE_POOL.topics) {
      expect(topic.optionCandidates.length).toBeGreaterThanOrEqual(4);
      expect((topic.replyCandidates ?? []).length).toBeGreaterThanOrEqual(4);
    }
    // A fallback pool must never re-offer NPC-specific tasks from every desk.
    expect(GENERIC_DIALOGUE_POOL.taskOffers).toEqual([]);
  });
});

describe("dialogue v2 task offers set existing flags", () => {
  it("every task flag exists in the game's flag vocabulary", () => {
    for (const pool of Object.values(POOLS)) {
      for (const task of pool.taskOffers) {
        expect(
          KNOWN_FLAGS.has(task.flagToSet),
          `${pool.npcId} task "${task.id}" sets unknown flag "${task.flagToSet}"`,
        ).toBe(true);
      }
    }
  });

  it("spot-checks the known lore tasks", () => {
    const flags = (npcId: string): string[] =>
      (POOLS[npcId]!).taskOffers.map((t) => t.flagToSet);
    // Burek duty lives somewhere (Renata), the push-to-main aftermath with
    // Bartek, the coffee emergency with Klaudia, and Marek owns the sticker
    // gambit plus the firewatch.
    expect(flags("renata")).toContain("burek-fed");
    expect(flags("bartek")).toContain("tomek-reviewed-pr");
    expect(flags("bartek")).toContain("bartek-shared-consulting-secret");
    expect(flags("klaudia")).toContain("klaudia-rebranded-you");
    expect(flags("marek")).toContain("marek-trusted-review");
    expect(flags("marek")).toContain("janusz-leave-printer");
  });

  it("every offered task id is actually referenced by at least one reply", () => {
    for (const pool of Object.values(POOLS)) {
      const offered = new Set<string>();
      for (const topic of pool.topics) {
        for (const reply of topic.replyCandidates ?? []) {
          if (reply.offersTaskId !== undefined) offered.add(reply.offersTaskId);
        }
      }
      for (const task of pool.taskOffers) {
        expect(offered.has(task.id), `${pool.npcId} task ${task.id} is unreachable`).toBe(true);
      }
    }
  });
});

describe("dialogue v2 tag conventions are exercised", () => {
  it("klaudia's coffee emergency is period-gated", () => {
    const pool = POOLS.klaudia!;
    const topic = pool.topics.find((t) => t.id.includes("coffee"));
    expect(topic).toBeDefined();
    expect(topic!.periods).toContain("morning");
  });

  it("marek's prod thread is afternoon-only", () => {
    const pool = POOLS.marek!;
    const topic = pool.topics.find((t) => t.id.includes("prod"));
    expect(topic).toBeDefined();
    expect(topic!.periods).toEqual(["afternoon"]);
  });

  it("bartek's client stories require the ACME contract", () => {
    const pool = POOLS.bartek!;
    const topic = pool.topics.find((t) => t.id.includes("client"));
    expect(topic).toBeDefined();
    expect(topic!.requiresFlags).toContain("got-acme-contract");
  });

  it("relationship, stats, event and quest tags all appear somewhere", () => {
    const allTags = new Set<string>();
    for (const pool of Object.values(POOLS)) {
      for (const topic of pool.topics as readonly DialogueTopic[]) {
        for (const option of topic.optionCandidates) for (const tag of option.tags ?? []) allTags.add(tag);
        for (const reply of topic.replyCandidates ?? []) for (const tag of reply.tags ?? []) allTags.add(tag);
      }
    }
    expect([...allTags].some((tag) => tag.startsWith("relationship:"))).toBe(true);
    expect([...allTags].some((tag) => tag.startsWith("stats:"))).toBe(true);
    expect([...allTags].some((tag) => tag.startsWith("event:"))).toBe(true);
    expect([...allTags].some((tag) => tag.startsWith("quest:"))).toBe(true);
    expect([...allTags].some((tag) => tag.startsWith("period:"))).toBe(true);
  });

  it("a relationshipHint is a social-model bucket name wherever present", () => {
    const buckets = new Set(["offended", "annoyed", "neutral", "pleased", "delighted"]);
    for (const pool of Object.values(POOLS)) {
      for (const topic of pool.topics) {
        for (const reply of topic.replyCandidates ?? []) {
          if (reply.relationshipHint !== undefined) {
            expect(buckets.has(reply.relationshipHint), reply.id).toBe(true);
          }
        }
      }
    }
  });
});

describe("dialogue v2 tone spot-assertions", () => {
  it("every option is a capitalized question or sentence within bounds", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of pool.topics) {
        for (const option of topic.optionCandidates) {
          expect(option.text.length, option.id).toBeLessThanOrEqual(OPTION_MAX_LENGTH);
          expect(option.text[0], option.id).toMatch(/[A-Z]/);
          expect(option.text.endsWith("?") || option.text.endsWith("."), option.id).toBe(true);
        }
      }
    }
  });

  it("every reply is substantial and within bounds", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of pool.topics) {
        for (const reply of topic.replyCandidates ?? []) {
          expect(reply.text.length, reply.id).toBeGreaterThanOrEqual(20);
          expect(reply.text.length, reply.id).toBeLessThanOrEqual(REPLY_MAX_LENGTH);
          expect(reply.text, reply.id).not.toMatch(/lorem|todo|placeholder|xxx/i);
        }
      }
    }
  });

  it("the pools are lore-consistent with the office (spot-checks)", () => {
    const textOf = (pool: NpcDialoguePool): string =>
      (pool.topics
        .flatMap((t) => [
          ...t.optionCandidates.map((o) => o.text),
          ...(t.replyCandidates ?? []).map((r) => r.text),
        ])
        .join(" "));

    // Tomek pushing to main is Bartek's story; the printer is office-wide
    // lore; Burek belongs to Renata's duty roster; the algorithm owns
    // Klaudia; the keyboard perimeter owns Marek.
    expect(textOf(POOLS.bartek!)).toMatch(/Tomek/);
    expect(textOf(POOLS.bartek!)).toMatch(/main/);
    expect(textOf(POOLS.renata!)).toMatch(/Burek/);
    expect(textOf(POOLS.klaudia!)).toMatch(/algorithm|LinkedIn/);
    expect(textOf(POOLS.marek!)).toMatch(/keyboard/);
    expect(textOf(GENERIC_DIALOGUE_POOL)).toMatch(/printer/);
    expect(textOf(GENERIC_DIALOGUE_POOL)).toMatch(/Burek/);
  });

  it("no pool TEXT leaks engine identifiers or flag names", () => {
    for (const pool of Object.values(POOLS)) {
      const texts = pool.topics
        .flatMap((t) => [
          ...t.optionCandidates.map((o) => o.text),
          ...(t.replyCandidates ?? []).map((r) => r.text),
        ])
        .concat(pool.taskOffers.map((t) => `${t.title} ${t.description} ${t.rewardHint ?? ""}`));
      for (const text of texts) {
        expect(text).not.toMatch(/topicId|offersTaskId|relationshipHint|flagToSet/);
        expect(text).not.toMatch(/exit:wrap-up|__exit__/);
        expect(text).not.toMatch(/dialogue-v2/);
      }
    }
  });
});

describe("exit constants", () => {
  it("the wrap-up exit option is defined and reserved", () => {
    expect(WRAP_UP_OPTION_ID).toBe("exit:wrap-up");
    expect(VALIDATE_OK).toEqual([]);
    expect(EXIT_TOPIC_ID).toBeDefined();
  });
});

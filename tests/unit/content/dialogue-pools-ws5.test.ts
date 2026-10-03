import { describe, expect, it } from "vitest";
import {
  OPTION_MAX_LENGTH,
  OPTION_MIN_LENGTH,
  REPLY_MAX_LENGTH,
  REPLY_MIN_LENGTH,
  VALIDATE_OK,
  validatePool,
  type DialogueTopic,
  type NpcDialoguePool,
} from "../../../src/content/dialogue-schema";
import { ZOSIA_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-zosia";
import { PAWEL_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-pawel";
import { KASIA_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-kasia";
import { TOMEK_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-tomek";
import { ANIA_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-ania";
import { JANUSZ_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-janusz";
import { GRAZYNA_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-grazyna";
import { MACIEK_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-maciek";
import { PRZEMEK_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-przemek";
import { DAWID_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-dawid";
import { BUREK_DIALOGUE_POOL } from "../../../src/content/npc-content/dialogue-pool-burek";
import {
  dialoguePoolFor,
  GENERIC_DIALOGUE_POOL,
  hasDialoguePool,
  registerNpcDialoguePools,
} from "../../../src/content/npc-content/dialogue-pools";
import { QUESTS } from "../../../src/content/quests";

/**
 * WS5 dialogue v2 pools — authored expansion batch 1 (C-77): zosia, pawel,
 * kasia, tomek, ania, janusz, grazyna, maciek, przemek, dawid and burek.
 * These tests pin schema validity, per-NPC minimum counts, global id
 * uniqueness, the flag vocabulary for task offers, the authoring quality
 * rules from the brief (relationshipHints, gated replies, tone bounds), and
 * the registration in the WS0 registry.
 *
 * WS5 round 2 (sacs-xtma.14 volume push): the round-1 EXACT counts
 * (3 topics, 6x6, 1 task) became FLOORS so the pools can keep growing
 * toward the 10x volume target. Everything else (pairing, quality, flags,
 * lore) is unchanged.
 */

const QUEST_FLAGS = QUESTS.flatMap((q) => (q.completionFlag ? [q.completionFlag] : []));
// The game's legacy dialogue-tree flag vocabulary (same list the WS3 pool
// tests pin; a task may also mint a NEW npc-prefixed kebab flag).
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
  // WS5-r2 minted flags (set via task offers; Flow A2 naming note):
  "pawel-restore-drill",
  "dawid-graph-memo",
  "kasia-referral-open",
  "tomek-apprentice",
  "ania-webinar-volunteered",
  "janusz-knows-the-plug",
  "grazyna-candle-partner",
  "maciek-training-buzzword",
  "przemek-robot-plan",
  "zosia-sticker-campaign",
  "burek-person",
];
const KNOWN_FLAGS = new Set([...QUEST_FLAGS, ...TREE_FLAGS]);

const WS5_POOLS: readonly NpcDialoguePool[] = [
  ZOSIA_DIALOGUE_POOL,
  PAWEL_DIALOGUE_POOL,
  KASIA_DIALOGUE_POOL,
  TOMEK_DIALOGUE_POOL,
  ANIA_DIALOGUE_POOL,
  JANUSZ_DIALOGUE_POOL,
  GRAZYNA_DIALOGUE_POOL,
  MACIEK_DIALOGUE_POOL,
  PRZEMEK_DIALOGUE_POOL,
  DAWID_DIALOGUE_POOL,
  BUREK_DIALOGUE_POOL,
];

/** All humans get the full 3x6x6 structure; burek is species-appropriate. */
const FULL_STRUCTURE_NPC_IDS = [
  "zosia", "pawel", "kasia", "tomek", "ania",
  "janusz", "grazyna", "maciek", "przemek", "dawid",
] as const;

function textOf(pool: NpcDialoguePool): string {
  return pool.topics
    .flatMap((t) => [
      ...t.optionCandidates.map((o) => o.text),
      ...(t.replyCandidates ?? []).map((r) => r.text),
    ])
    .concat(pool.taskOffers.map((t) => `${t.title} ${t.description} ${t.rewardHint ?? ""}`))
    .join(" ");
}

describe("WS5 pool schema validity", () => {
  it("every new pool validates against the schema", () => {
    for (const pool of WS5_POOLS) {
      expect(validatePool(pool), `${pool.npcId}: ${validatePool(pool).join("; ")}`).toEqual(
        VALIDATE_OK,
      );
    }
  });

  it("every candidate id is unique across ALL pools (new and existing)", () => {
    const seen = new Set<string>();
    const all = [...WS5_POOLS, GENERIC_DIALOGUE_POOL];
    for (const pool of all) {
      for (const topic of pool.topics) {
        for (const candidate of [...topic.optionCandidates, ...topic.replyCandidates ?? []]) {
          expect(seen.has(candidate.id), `duplicate candidate id ${candidate.id}`).toBe(false);
          seen.add(candidate.id);
        }
      }
    }
  });

  it("each pool is registered under its own npcId", () => {
    for (const pool of WS5_POOLS) {
      expect(pool.npcId.length).toBeGreaterThan(0);
      // Ids are npc-prefixed so a candidate can never collide across NPCs.
      for (const topic of pool.topics) {
        expect(topic.id.startsWith(`${pool.npcId}:`), topic.id).toBe(true);
      }
    }
  });
});

describe("WS5 per-NPC structure (the brief's counts)", () => {
  it("the ten human NPCs have >= 3 topics of >= 6 options + >= 6 replies and >= 1 task", () => {
    for (const npcId of FULL_STRUCTURE_NPC_IDS) {
      const pool = WS5_POOLS.find((p) => p.npcId === npcId)!;
      expect(pool.topics.length, `${npcId} topic count`).toBeGreaterThanOrEqual(3);
      for (const topic of pool.topics) {
        expect(topic.optionCandidates.length, `${npcId}/${topic.id} options`).toBeGreaterThanOrEqual(6);
        expect((topic.replyCandidates ?? []).length, `${npcId}/${topic.id} replies`).toBeGreaterThanOrEqual(6);
      }
      expect(pool.taskOffers.length, `${npcId} task count`).toBeGreaterThanOrEqual(1);
    }
  });

  it("burek gets species-appropriate half-size pools around his themes", () => {
    expect(BUREK_DIALOGUE_POOL.topics.length).toBeGreaterThanOrEqual(2);
    for (const topic of BUREK_DIALOGUE_POOL.topics) {
      expect(topic.optionCandidates.length).toBeGreaterThanOrEqual(4);
      expect((topic.replyCandidates ?? []).length).toBeGreaterThanOrEqual(4);
    }
    // Every burek reply speaks dog: at least one *sound*, [action] or (thought).
    for (const topic of BUREK_DIALOGUE_POOL.topics) {
      for (const reply of topic.replyCandidates ?? []) {
        expect(
          /\*[^*]+\*|\[[^\]]+\]|\([^)]+\)/.test(reply.text),
          `burek reply not in dog marker form: ${reply.id}`,
        ).toBe(true);
      }
    }
  });

  it("every offered task id is reachable from at least one reply", () => {
    for (const pool of WS5_POOLS) {
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

describe("WS5 authoring quality rules", () => {
  it("option texts are player-plausible and within tone bounds", () => {
    for (const pool of WS5_POOLS) {
      for (const topic of pool.topics) {
        for (const option of topic.optionCandidates) {
          expect(option.text.length, option.id).toBeGreaterThanOrEqual(OPTION_MIN_LENGTH);
          expect(option.text.length, option.id).toBeLessThanOrEqual(100);
          expect(option.text.length, option.id).toBeLessThanOrEqual(OPTION_MAX_LENGTH);
          expect(option.text[0], option.id).toMatch(/[A-Z]/);
          expect(option.text.endsWith("?") || option.text.endsWith("."), option.id).toBe(true);
        }
      }
    }
  });

  it("reply texts are substantial and within bounds", () => {
    for (const pool of WS5_POOLS) {
      for (const topic of pool.topics) {
        for (const reply of topic.replyCandidates ?? []) {
          expect(reply.text.length, reply.id).toBeGreaterThanOrEqual(REPLY_MIN_LENGTH);
          expect(reply.text.length, reply.id).toBeLessThanOrEqual(REPLY_MAX_LENGTH);
          expect(reply.text.length, reply.id).toBeLessThanOrEqual(380);
          expect(reply.text, reply.id).not.toMatch(/lorem|todo|placeholder|xxx/i);
        }
      }
    }
  });

  it("every topic answers with at least 2 relationshipHint replies and 1 gated reply", () => {
    for (const pool of WS5_POOLS) {
      for (const topic of pool.topics) {
        const hinted = (topic.replyCandidates ?? []).filter((r) => r.relationshipHint !== undefined);
        expect(hinted.length, `${pool.npcId}/${topic.id} relationshipHint count`).toBeGreaterThanOrEqual(2);
        const gated = (topic.replyCandidates ?? []).filter((r) => (r.tags ?? []).length > 0);
        expect(gated.length, `${pool.npcId}/${topic.id} tagged-reply count`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("the batch uses interesting tag COMBINATIONS (multi-tag replies)", () => {
    for (const pool of WS5_POOLS) {
      const combinations = pool.topics
        .flatMap((t) => t.replyCandidates ?? [])
        .filter((r) => (r.tags ?? []).length >= 2);
      expect(combinations.length, `${pool.npcId} multi-tag replies`).toBeGreaterThanOrEqual(2);
    }
  });

  it("every task flagToSet is an existing game flag or a new npc-prefixed kebab flag", () => {
    for (const pool of WS5_POOLS) {
      for (const task of pool.taskOffers) {
        const known = KNOWN_FLAGS.has(task.flagToSet);
        const minted = new RegExp(`^${pool.npcId}-[a-z0-9-]+$`).test(task.flagToSet);
        expect(
          known || minted,
          `${pool.npcId} task "${task.id}" sets implausible flag "${task.flagToSet}"`,
        ).toBe(true);
      }
    }
  });

  it("no pool TEXT leaks engine identifiers or flag names", () => {
    for (const pool of WS5_POOLS) {
      for (const text of [...(textOf(pool) ? [textOf(pool)] : [])]) {
        expect(text).not.toMatch(/topicId|offersTaskId|relationshipHint|flagToSet/);
        expect(text).not.toMatch(/exit:wrap-up|__exit__/);
        expect(text).not.toMatch(/dialogue-v2/);
      }
    }
  });

  it("no candidate text duplicates another candidate's text inside the batch", () => {
    const seen = new Map<string, string>();
    for (const pool of WS5_POOLS) {
      for (const topic of pool.topics) {
        for (const candidate of [...topic.optionCandidates, ...topic.replyCandidates ?? []]) {
          const key = candidate.text.toLowerCase();
          const prev = seen.get(key);
          expect(prev, `${candidate.id} repeats ${prev}`).toBeUndefined();
          seen.set(key, candidate.id);
        }
      }
    }
  });
});

describe("WS5 lore consistency (the office is real)", () => {
  it("each NPC's pool references their own lore", () => {
    const lore: Record<string, RegExp> = {
      zosia: /roadmap|standup|one-on-one/i,
      pawel: /backup|script|intern/i,
      kasia: /role|candidate|refer|salary/i,
      tomek: /main|paste|hotfix|Stack Overflow/i,
      ania: /funnel|webinar|thumbnail|persona/i,
      janusz: /robot|bin|flood|closet|mop/i,
      grazyna: /budget|invoice|candle|spreadsheet/i,
      maciek: /board|slide|buzzword|vision/i,
      przemek: /client|robot|promise|bootcamp/i,
      dawid: /graph|Bruce|meeting|KPI/i,
      burek: /audit|pizza|toy|treat|ball/i,
    };
    for (const [npcId, pattern] of Object.entries(lore)) {
      const pool = WS5_POOLS.find((p) => p.npcId === npcId)!;
      expect(textOf(pool), `${npcId} lore`).toMatch(pattern);
    }
  });

  it("cross-NPC lore is respected (prod on fire, Burek, the printer, coffee)", () => {
    expect(textOf(TOMEK_DIALOGUE_POOL)).toMatch(/main|prod/i);
    expect(textOf(JANUSZ_DIALOGUE_POOL)).toMatch(/Zdzislaw|Halina|Seba/);
    expect(textOf(GRAZYNA_DIALOGUE_POOL)).toMatch(/printer|coffee/i);
    expect(textOf(BUREK_DIALOGUE_POOL)).toMatch(/Przemek|standup/i);
    expect(textOf(DAWID_DIALOGUE_POOL)).toMatch(/Batman|Bruce/);
  });
});

describe("WS5 tag conventions are exercised across the batch", () => {
  it("all five tag families appear somewhere in the batch", () => {
    const allTags = new Set<string>();
    for (const pool of WS5_POOLS) {
      for (const topic of pool.topics as readonly DialogueTopic[]) {
        for (const option of topic.optionCandidates) {
          for (const tag of option.tags ?? []) allTags.add(tag);
        }
        for (const reply of topic.replyCandidates ?? []) {
          for (const tag of reply.tags ?? []) allTags.add(tag);
        }
      }
    }
    expect([...allTags].some((t) => t.startsWith("relationship:"))).toBe(true);
    expect([...allTags].some((t) => t.startsWith("stats:"))).toBe(true);
    expect([...allTags].some((t) => t.startsWith("period:"))).toBe(true);
    expect([...allTags].some((t) => t.startsWith("event:"))).toBe(true);
    expect([...allTags].some((t) => t.startsWith("quest:"))).toBe(true);
  });

  it("quest and event tags reference flags that exist in the game's vocabulary", () => {
    for (const pool of WS5_POOLS) {
      for (const topic of pool.topics) {
        for (const candidate of [...topic.optionCandidates, ...topic.replyCandidates ?? []]) {
          for (const tag of candidate.tags ?? []) {
            if (tag.startsWith("quest:") || tag.startsWith("event:")) {
              const flag = tag.slice(tag.indexOf(":") + 1);
              expect(
                KNOWN_FLAGS.has(flag),
                `${candidate.id} gates on unknown flag "${flag}"`,
              ).toBe(true);
            }
          }
        }
        for (const flag of topic.requiresFlags ?? []) {
          expect(KNOWN_FLAGS.has(flag), `${topic.id} requires unknown flag "${flag}"`).toBe(true);
        }
        for (const flag of topic.blockedByFlags ?? []) {
          expect(KNOWN_FLAGS.has(flag), `${topic.id} blocked by unknown flag "${flag}"`).toBe(true);
        }
      }
    }
  });
});

describe("WS5 registration", () => {
  it("registerNpcDialoguePools activates all eleven new pools", () => {
    registerNpcDialoguePools();
    for (const npcId of [...FULL_STRUCTURE_NPC_IDS, "burek"]) {
      expect(hasDialoguePool(npcId), npcId).toBe(true);
      expect(dialoguePoolFor(npcId), npcId).toBeDefined();
    }
    // The batch does not accidentally own NPCs from another author.
    expect(hasDialoguePool("bartek")).toBe(true);
    expect(hasDialoguePool("generic")).toBe(false);
    expect(dialoguePoolFor("nobody")).toBeUndefined();
  });

  it("dialoguePoolFor returns exactly the pool object authored for the NPC", () => {
    registerNpcDialoguePools();
    expect(dialoguePoolFor("zosia")).toBe(ZOSIA_DIALOGUE_POOL);
    expect(dialoguePoolFor("burek")).toBe(BUREK_DIALOGUE_POOL);
  });
});

describe("WS5 pools — C-78 positional pairing invariant", () => {
  it("pairs every option 1:1 with a reply in every assigned pool", () => {
    for (const pool of WS5_POOLS) {
      for (const topic of pool.topics) {
        expect(
          topic.optionCandidates.length,
          `${pool.npcId}/${topic.id} option/reply alignment`,
        ).toBe((topic.replyCandidates ?? []).length);
      }
    }
  });
});

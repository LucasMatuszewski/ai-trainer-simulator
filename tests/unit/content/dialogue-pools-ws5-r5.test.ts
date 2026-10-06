import { describe, expect, it } from "vitest";
import {
  VALIDATE_OK,
  validatePool,
  type ContextTag,
  type NpcDialoguePool,
} from "../../../src/content/dialogue-schema";
import {
  GENERIC_DIALOGUE_POOL,
  dialoguePoolFor,
  registerNpcDialoguePools,
} from "../../../src/content/npc-content/dialogue-pools";
import { NPC_IDS } from "../../../src/content/npc-profiles";
import { QUESTS } from "../../../src/content/quests";

/**
 * WS5 round 5 — the CLOSING batch (sacs-xtma.14 volume push): 217 new
 * topics (14 per roster NPC, 7 for the generic fallback), each with 6
 * positionally-paired option/reply pairs, pushing the v2 pools across the
 * 10x content-volume milestone. Rounds 1-4 are untouched; this suite pins:
 *   - schema validity for every pool (rounds 1-5 combined),
 *   - the C-78 per-topic option/reply alignment invariant (whole pools),
 *   - no id collisions with rounds 1-4 (global candidate/topic id set),
 *   - no flagged tokens (the /lorem|todo|placeholder|xxx/i quality gate),
 *   - per-NPC NEW-string counts: >= 156 distinct option/reply texts per
 *     roster NPC, >= 84 for the generic fallback (floors whose sum
 *     guarantees the batch floor of 2400),
 *   - the batch total (>= 2400 distinct new strings),
 *   - the 10x milestone: the volume counter's v2PoolStrings category
 *     (mirrored here over the roster pools) >= 8000 distinct,
 *   - freshness: no round-5 string repeats any string from rounds 1-4,
 *   - the authoring quality bar (bounds, hints, tags, flag vocabulary).
 *
 * The manifest below is the round-5 contract: exactly these topic ids are
 * the new batch. A missing topic id means content was silently dropped.
 */

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
  "pawel-restore-drill",
  "dawid-graph-memo",
  "zosia-sticker-campaign",
];
const KNOWN_FLAGS = new Set([...QUEST_FLAGS, ...TREE_FLAGS]);

const ROSTER_NPCS = [
  "zosia", "pawel", "kasia", "tomek", "ania",
  "janusz", "grazyna", "maciek", "przemek", "dawid",
  "burek", "bartek", "marek", "klaudia", "renata",
] as const;

/** The round-5 topic manifest: exactly these topics are the new batch. */
const R5_TOPICS: Record<string, readonly string[]> = {
  generic: [
    "generic:parking-lot", "generic:stairwell", "generic:window-seat",
    "generic:wrong-floor", "generic:elevator-broken", "generic:thermal-mug",
    "generic:out-of-office",
  ],
  zosia: [
    "zosia:exit-interviews", "zosia:timezone-matrix", "zosia:icebreakers",
    "zosia:lanyards", "zosia:fire-marshal", "zosia:open-door-policy",
    "zosia:priority-matrix", "zosia:culture-deck", "zosia:silent-meetings",
    "zosia:retro-notes", "zosia:tote-bags", "zosia:welcome-lunch",
    "zosia:vision-board", "zosia:org-chart",
  ],
  pawel: [
    "pawel:laptop-stickers", "pawel:chain-of-command", "pawel:two-factor",
    "pawel:first-incident", "pawel:hydration", "pawel:flashcards",
    "pawel:github-streak", "pawel:desk-plant", "pawel:pair-programming",
    "pawel:onboarding-doc", "pawel:focus-playlist", "pawel:pomodoro",
    "pawel:dream-setup", "pawel:works-on-my-machine",
  ],
  kasia: [
    "kasia:laptop-return", "kasia:name-pronunciation", "kasia:walking-club",
    "kasia:soft-skills", "kasia:bank-holidays", "kasia:nepotism",
    "kasia:ergonomic-audit", "kasia:gift-vouchers", "kasia:policy-updates",
    "kasia:return-to-office", "kasia:recommendation-letters",
    "kasia:fruit-tuesday", "kasia:eyesight-vouchers", "kasia:job-title-audit",
  ],
  tomek: [
    "tomek:monorepo", "tomek:git-blame", "tomek:bisect", "tomek:changelog",
    "tomek:code-names", "tomek:off-by-one", "tomek:cron-jobs", "tomek:regex",
    "tomek:semver", "tomek:cloud-down", "tomek:forum-posts",
    "tomek:manual-first", "tomek:build-times", "tomek:handwritten-sql",
  ],
  ania: [
    "ania:font-licensing", "ania:email-signature", "ania:diy-design",
    "ania:landing-pages", "ania:utm-parameters", "ania:emoji-policy",
    "ania:apology-drafts", "ania:ab-subject-lines", "ania:brand-book",
    "ania:mood-boards", "ania:friday-meme", "ania:photo-credits",
    "ania:qr-codes", "ania:boosted-posts",
  ],
  janusz: [
    "janusz:door-squeak", "janusz:lightbulbs", "janusz:mop-technique",
    "janusz:vending-rescue", "janusz:thermostat", "janusz:carpet-stain",
    "janusz:the-trolley", "janusz:spider-corner", "janusz:paint-matching",
    "janusz:ladder", "janusz:grandkids", "janusz:building-history",
    "janusz:fridge-defrost", "janusz:night-sounds",
  ],
  grazyna: [
    "grazyna:coin-jar", "grazyna:the-macro", "grazyna:numbering-gap",
    "grazyna:exchange-rates", "grazyna:the-stamp", "grazyna:paper-clips",
    "grazyna:savings-advice", "grazyna:mileage-allowance",
    "grazyna:mental-math", "grazyna:expense-app", "grazyna:locked-drawer",
    "grazyna:niece", "grazyna:tv-series", "grazyna:retirement-countdown",
  ],
  maciek: [
    "maciek:desk-toys", "maciek:karaoke", "maciek:first-tshirt",
    "maciek:fancy-water", "maciek:padel", "maciek:misquotes",
    "maciek:electric-car", "maciek:exit-strategy", "maciek:writing-a-book",
    "maciek:espresso-machine", "maciek:pivot-pizza", "maciek:rebrand-itch",
    "maciek:tv-dream", "maciek:dead-startups",
  ],
  przemek: [
    "przemek:cologne", "przemek:shortcuts", "przemek:client-lore",
    "przemek:verbal-yes", "przemek:posture", "przemek:handwritten-notes",
    "przemek:upsell", "przemek:objections", "przemek:never-discount",
    "przemek:pep-talk", "przemek:nineties-clients", "przemek:his-table",
    "przemek:backup-phone", "przemek:the-1997-deal",
  ],
  dawid: [
    "dawid:paper-planes", "dawid:chess-by-mail", "dawid:analog-watch",
    "dawid:handwriting", "dawid:barometer", "dawid:phone-hour",
    "dawid:monday-apples", "dawid:river-names", "dawid:telescope",
    "dawid:dawn-cycling", "dawid:sleep-myth", "dawid:coin-flip",
    "dawid:one-line-emails", "dawid:reliable-umbrella",
  ],
  burek: [
    "burek:doorbell", "burek:leash", "burek:first-snow",
    "burek:keyboard-walk", "burek:bins", "burek:crows",
    "burek:desk-begging", "burek:raincoat", "burek:the-vet",
    "burek:squeaky-duck", "burek:water-bowl", "burek:weather-ear",
    "burek:dreams", "burek:photoshoot",
  ],
  bartek: [
    "bartek:room-temperature", "bartek:name-tents", "bartek:energizers",
    "bartek:hdmi-adapter", "bartek:webcam-era", "bartek:break-negotiations",
    "bartek:get-back-to-you", "bartek:the-boat", "bartek:the-jacket",
    "bartek:flipchart", "bartek:budget-cuts", "bartek:co-trainer",
    "bartek:homework", "bartek:hotel-breakfast",
  ],
  marek: [
    "marek:sixty-tabs", "marek:i-changed-nothing", "marek:headset-hair",
    "marek:morning-checklist", "marek:laptop-shelf",
    "marek:can-you-see-my-screen", "marek:self-healing-bug",
    "marek:jet-engine-laptop", "marek:candy-drawer", "marek:photo-tickets",
    "marek:friday-ticket", "marek:adapter-bag", "marek:toner-stain",
    "marek:its-slow",
  ],
  klaudia: [
    "klaudia:storage-full", "klaudia:caption-drafts", "klaudia:close-friends",
    "klaudia:app-subscriptions", "klaudia:camera-roll",
    "klaudia:ad-disclosure", "klaudia:second-viral", "klaudia:team-series",
    "klaudia:export-bar", "klaudia:ghost-followers", "klaudia:link-in-bio",
    "klaudia:first-post", "klaudia:rival-watching", "klaudia:sound-licensing",
  ],
  renata: [
    "renata:the-bell", "renata:taxi-line", "renata:the-chair",
    "renata:coat-corner", "renata:last-lamp", "renata:tea-drawer",
    "renata:name-memory", "renata:bus-lore", "renata:crossword",
    "renata:paper-planner", "renata:stamp-collection", "renata:the-sparrow",
    "renata:temperature-complaints", "renata:sea-photo",
  ],
};

/** Batch volume floors. Their sum (2424) guarantees the 2400 batch floor. */
const ROSTER_FLOOR = 156;
const GENERIC_FLOOR = 84;
const BATCH_FLOOR = 2400;
/** The 10x milestone for the volume counter's v2PoolStrings category. */
const V2_POOL_MILESTONE = 8000;

const POOLS: Record<string, NpcDialoguePool> = (() => {
  registerNpcDialoguePools();
  const pools: Record<string, NpcDialoguePool> = {};
  for (const npcId of ROSTER_NPCS) {
    pools[npcId] = dialoguePoolFor(npcId)!;
  }
  pools.generic = GENERIC_DIALOGUE_POOL;
  return pools;
})();

function normalize(text: string): string {
  return text.trim().replace(/\s+/g, " ").toLowerCase();
}

/** All option/reply texts of a topic, plus its label as debug metadata. */
function textsOfTopic(topic: NpcDialoguePool["topics"][number]): string[] {
  return [
    ...topic.optionCandidates.map((o) => o.text),
    ...(topic.replyCandidates ?? []).map((r) => r.text),
  ];
}

function r5TopicsOf(pool: NpcDialoguePool) {
  const manifest = R5_TOPICS[pool.npcId] ?? [];
  const byId = new Map(pool.topics.map((t) => [t.id, t]));
  return manifest.map((id) => {
    const topic = byId.get(id);
    expect(topic, `${pool.npcId} round-5 topic "${id}" is missing`).toBeDefined();
    return topic!;
  });
}

/**
 * Mirrors scripts/content-volume.mjs's v2PoolStrings category exactly:
 * roster pools only (NPC_IDS), counting topic labels, option texts,
 * nested paired replies, topic-level replies and task composite strings,
 * normalized and deduplicated across pools.
 */
function mirroredV2PoolStrings(): number {
  const distinct = new Set<string>();
  for (const npcId of NPC_IDS) {
    const pool = dialoguePoolFor(npcId);
    if (pool === undefined) continue;
    for (const topic of pool.topics) {
      distinct.add(normalize(topic.label ?? topic.id));
      for (const option of topic.optionCandidates) {
        distinct.add(normalize(option.text));
        for (const reply of option.replies ?? []) distinct.add(normalize(reply.text));
      }
      for (const reply of topic.replyCandidates ?? []) distinct.add(normalize(reply.text));
    }
    for (const task of pool.taskOffers ?? []) {
      distinct.add(normalize(`${task.title} ${task.description} ${task.rewardHint ?? ""}`));
    }
  }
  return distinct.size;
}

describe("WS5-r5 schema validity and alignment", () => {
  it("every pool (15 roster + generic) validates against the schema", () => {
    for (const pool of Object.values(POOLS)) {
      expect(validatePool(pool), `${pool.npcId}: ${validatePool(pool).join("; ")}`).toEqual(
        VALIDATE_OK,
      );
    }
  });

  it("every round-5 topic id from the manifest exists in its pool", () => {
    for (const pool of Object.values(POOLS)) {
      r5TopicsOf(pool); // throws with a clear message when something is missing
    }
  });

  it("option and reply counts are EQUAL in every topic of every pool (C-78)", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of pool.topics) {
        expect(
          topic.optionCandidates.length,
          `${pool.npcId}/${topic.id} option/reply alignment`,
        ).toBe((topic.replyCandidates ?? []).length);
      }
    }
  });

  it("no candidate or topic id collides with rounds 1-4 (global uniqueness)", () => {
    const seenCandidateIds = new Set<string>();
    const seenTopicIds = new Set<string>();
    for (const pool of Object.values(POOLS)) {
      for (const topic of pool.topics) {
        expect(seenTopicIds.has(topic.id), `duplicate topic id ${topic.id}`).toBe(false);
        seenTopicIds.add(topic.id);
        for (const candidate of [...topic.optionCandidates, ...topic.replyCandidates ?? []]) {
          expect(seenCandidateIds.has(candidate.id), `duplicate candidate id ${candidate.id}`).toBe(false);
          seenCandidateIds.add(candidate.id);
        }
      }
    }
  });
});

describe("WS5-r5 per-NPC new-string volume (the batch floor)", () => {
  it("the floors guarantee the batch floor (meta, protects the arithmetic)", () => {
    expect(ROSTER_NPCS.length * ROSTER_FLOOR + GENERIC_FLOOR).toBeGreaterThanOrEqual(BATCH_FLOOR);
  });

  it("every roster NPC gains >= 156 distinct new option/reply strings", () => {
    for (const npcId of ROSTER_NPCS) {
      const pool = POOLS[npcId]!;
      const strings = r5TopicsOf(pool).flatMap((topic) => textsOfTopic(topic));
      const distinct = new Set(strings.map(normalize));
      expect(
        distinct.size,
        `${npcId} new-string count (needs >= ${ROSTER_FLOOR}, has ${distinct.size})`,
      ).toBeGreaterThanOrEqual(ROSTER_FLOOR);
    }
  });

  it("the generic fallback gains >= 84 distinct new strings", () => {
    const strings = r5TopicsOf(POOLS.generic!).flatMap((topic) => textsOfTopic(topic));
    const distinct = new Set(strings.map(normalize));
    expect(
      distinct.size,
      `generic new-string count (needs >= ${GENERIC_FLOOR}, has ${distinct.size})`,
    ).toBeGreaterThanOrEqual(GENERIC_FLOOR);
  });

  it("the batch adds >= 2400 distinct new strings in total", () => {
    const distinct = new Set<string>();
    for (const pool of Object.values(POOLS)) {
      for (const topic of r5TopicsOf(pool)) {
        for (const text of textsOfTopic(topic)) distinct.add(normalize(text));
      }
    }
    expect(distinct.size, `batch total (has ${distinct.size})`).toBeGreaterThanOrEqual(BATCH_FLOOR);
  });

  it("the 10x milestone: v2PoolStrings (volume-counter mirror) >= 8000 distinct", () => {
    const total = mirroredV2PoolStrings();
    expect(
      total,
      `v2PoolStrings distinct (mirrored; has ${total}, milestone ${V2_POOL_MILESTONE})`,
    ).toBeGreaterThanOrEqual(V2_POOL_MILESTONE);
  });

  it("no round-5 string repeats rounds 1-4 or any other pool string", () => {
    const preexisting = new Set<string>();
    for (const pool of Object.values(POOLS)) {
      const r5Ids = new Set(R5_TOPICS[pool.npcId] ?? []);
      for (const topic of pool.topics) {
        if (r5Ids.has(topic.id)) continue;
        for (const text of textsOfTopic(topic)) preexisting.add(normalize(text));
      }
    }
    for (const pool of Object.values(POOLS)) {
      for (const topic of r5TopicsOf(pool)) {
        for (const text of textsOfTopic(topic)) {
          const key = normalize(text);
          expect(
            preexisting.has(key),
            `${pool.npcId}/${topic.id} repeats an older pool string: "${text.slice(0, 60)}"`,
          ).toBe(false);
        }
      }
    }
  });

  it("no round-5 string (including labels) duplicates another round-5 string", () => {
    const seen = new Map<string, string>();
    for (const pool of Object.values(POOLS)) {
      for (const topic of r5TopicsOf(pool)) {
        for (const text of [topic.label, ...textsOfTopic(topic)]) {
          const key = normalize(text);
          const prev = seen.get(key);
          expect(prev, `${pool.npcId}/${topic.id} repeats ${prev ?? ""}`).toBeUndefined();
          seen.set(key, `${pool.npcId}/${topic.id}`);
        }
      }
    }
  });

  it("no flagged tokens anywhere in round-5 text (options, replies, labels)", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r5TopicsOf(pool)) {
        const all = [topic.label, ...textsOfTopic(topic)];
        for (const text of all) {
          expect(text, `${pool.npcId}/${topic.id}`).not.toMatch(/lorem|todo|placeholder|xxx/i);
        }
      }
    }
  });
});

describe("WS5-r5 authoring quality bar", () => {
  it("round-5 options are capitalized questions or sentences within 4-100 chars", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r5TopicsOf(pool)) {
        for (const option of topic.optionCandidates) {
          expect(option.text.length, option.id).toBeGreaterThanOrEqual(4);
          expect(option.text.length, option.id).toBeLessThanOrEqual(100);
          expect(option.text[0], option.id).toMatch(/[A-Z]/);
          expect(option.text.endsWith("?") || option.text.endsWith("."), option.id).toBe(true);
        }
      }
    }
  });

  it("round-5 replies are substantial and within 20-380 chars", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r5TopicsOf(pool)) {
        for (const reply of topic.replyCandidates ?? []) {
          expect(reply.text.length, reply.id).toBeGreaterThanOrEqual(20);
          expect(reply.text.length, reply.id).toBeLessThanOrEqual(380);
        }
      }
    }
  });

  it("every round-5 topic answers with >= 2 relationshipHint replies and >= 1 tagged reply", () => {
    const buckets = new Set(["offended", "annoyed", "neutral", "pleased", "delighted"]);
    for (const pool of Object.values(POOLS)) {
      for (const topic of r5TopicsOf(pool)) {
        const hinted = (topic.replyCandidates ?? []).filter((r) => r.relationshipHint !== undefined);
        expect(hinted.length, `${pool.npcId}/${topic.id} relationshipHint count`).toBeGreaterThanOrEqual(2);
        const tagged = (topic.replyCandidates ?? []).filter((r) => (r.tags ?? []).length > 0);
        expect(tagged.length, `${pool.npcId}/${topic.id} tagged-reply count`).toBeGreaterThanOrEqual(1);
        for (const reply of topic.replyCandidates ?? []) {
          if (reply.relationshipHint !== undefined) {
            expect(buckets.has(reply.relationshipHint), reply.id).toBe(true);
          }
        }
      }
    }
  });

  it("every pool carries >= 2 multi-tag round-5 replies (context combinations)", () => {
    for (const pool of Object.values(POOLS)) {
      const combos = r5TopicsOf(pool)
        .flatMap((topic) => topic.replyCandidates ?? [])
        .filter((r) => (r.tags ?? []).length >= 2);
      expect(combos.length, `${pool.npcId} multi-tag replies`).toBeGreaterThanOrEqual(2);
    }
  });

  it("round-5 quest and event tags reference flags from the game's vocabulary", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r5TopicsOf(pool)) {
        for (const candidate of [...topic.optionCandidates, ...topic.replyCandidates ?? []]) {
          for (const tag of (candidate.tags ?? []) as readonly ContextTag[]) {
            if (tag.startsWith("quest:") || tag.startsWith("event:")) {
              const flag = tag.slice(tag.indexOf(":") + 1);
              expect(KNOWN_FLAGS.has(flag), `${candidate.id} gates on unknown flag "${flag}"`).toBe(true);
            }
          }
        }
      }
    }
  });

  it("burek's round-5 replies all speak dog (marker form)", () => {
    for (const topic of r5TopicsOf(POOLS.burek!)) {
      for (const reply of topic.replyCandidates ?? []) {
        expect(
          /\*[^*]+\*|\[[^\]]+\]|\([^)]+\)/.test(reply.text),
          `burek reply not in dog marker form: ${reply.id}`,
        ).toBe(true);
      }
    }
  });
});

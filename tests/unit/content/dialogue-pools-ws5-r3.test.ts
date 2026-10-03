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
import { QUESTS } from "../../../src/content/quests";

/**
 * WS5 round 3 (sacs-xtma.14 volume push, batch 3): +2500 distinct strings
 * across the 16 v2 dialogue pools — 13 new topics per roster NPC and 7 for
 * the generic fallback, each topic 6 positionally-paired option/reply
 * pairs. These tests pin:
 *   - schema validity for every pool (rounds 1-3 combined),
 *   - the C-78 per-topic option/reply alignment invariant (whole pools),
 *   - no id collisions with rounds 1-2 (global candidate/topic id set),
 *   - no flagged tokens (the /lorem|todo|placeholder|xxx/i quality gate),
 *   - per-NPC NEW-string counts: >= 150 distinct option/reply texts per
 *     roster NPC, >= 75 for the generic fallback (the round-3 floor),
 *   - freshness: no round-3 string repeats any string from rounds 1-2,
 *   - the authoring quality bar (bounds, hints, tags, flag vocabulary).
 *
 * The manifest below is the round-3 contract: exactly these topic ids are
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
  // WS5-r2 minted flags:
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

/** The round-3 topic manifest: exactly these topics are the new batch. */
const R3_TOPICS: Record<string, readonly string[]> = {
  generic: [
    "generic:weather", "generic:weekend-plans", "generic:commute",
    "generic:lunch-plans", "generic:office-noise", "generic:printer-grief",
    "generic:elevator-smalltalk",
  ],
  zosia: [
    "zosia:budgets", "zosia:remote", "zosia:offsite", "zosia:headcount",
    "zosia:book-club", "zosia:linkedin", "zosia:okrs", "zosia:perks",
    "zosia:dog-policy", "zosia:dress-code", "zosia:party", "zosia:survey",
    "zosia:mentorship",
  ],
  pawel: [
    "pawel:sick-day", "pawel:first-pr", "pawel:ergonomics",
    "pawel:hackathon", "pawel:open-source", "pawel:home-lab",
    "pawel:energy-drinks", "pawel:meetups", "pawel:hr-visit",
    "pawel:bus-factor", "pawel:gear-envy", "pawel:commute", "pawel:impostor",
  ],
  kasia: [
    "kasia:wellness", "kasia:confidentiality", "kasia:probation",
    "kasia:contracts", "kasia:handbook", "kasia:vacation",
    "kasia:presenteeism", "kasia:referral-bonus", "kasia:training-budget",
    "kasia:comms-tone", "kasia:diversity", "kasia:hot-desking",
    "kasia:burek-hr",
  ],
  tomek: [
    "tomek:code-review", "tomek:editors", "tomek:refactor-urge", "tomek:flow",
    "tomek:legacy", "tomek:sleep", "tomek:tech-interviews",
    "tomek:dependencies", "tomek:ai-tools", "tomek:oncall",
    "tomek:naming", "tomek:talk-submission", "tomek:local-env",
  ],
  ania: [
    "ania:marketing-budget", "ania:influencers", "ania:seo", "ania:billboards",
    "ania:awards", "ania:dark-social", "ania:stock-photos", "ania:hashtags",
    "ania:case-studies", "ania:launch-day", "ania:competitor-content",
    "ania:comments-section", "ania:merch-ideas",
  ],
  janusz: [
    "janusz:keys", "janusz:recycling", "janusz:pigeon", "janusz:roof",
    "janusz:weather-sense", "janusz:radio", "janusz:soup", "janusz:elevator",
    "janusz:one-week-off", "janusz:lost-found", "janusz:suppliers",
    "janusz:snow", "janusz:superstition",
  ],
  grazyna: [
    "grazyna:petty-cash", "grazyna:expenses", "grazyna:licenses",
    "grazyna:vat", "grazyna:insurance", "grazyna:paperless",
    "grazyna:calculators", "grazyna:vendor-talks", "grazyna:payroll",
    "grazyna:candle-shipping", "grazyna:archive", "grazyna:pens",
    "grazyna:fines",
  ],
  maciek: [
    "maciek:keynotes", "maciek:business-books", "maciek:podcast-guest",
    "maciek:innovation-lab", "maciek:mornings", "maciek:feng-shui",
    "maciek:art", "maciek:travel", "maciek:slack-etiquette",
    "maciek:rivals", "maciek:retreat", "maciek:numbers", "maciek:origins",
  ],
  przemek: [
    "przemek:handshakes", "przemek:ties", "przemek:car",
    "przemek:trade-shows", "przemek:phone-voice", "przemek:contracts",
    "przemek:business-cards", "przemek:followup", "przemek:motivation",
    "przemek:leads-board", "przemek:competitors", "przemek:archetypes",
    "przemek:success-book",
  ],
  dawid: [
    "dawid:silence", "dawid:migration", "dawid:reading", "dawid:chair",
    "dawid:whiteboard", "dawid:oncall-creed", "dawid:bats",
    "dawid:interview-loop", "dawid:patents", "dawid:decision-log",
    "dawid:coffee-order", "dawid:boardgames", "dawid:predictions",
  ],
  burek: [
    "burek:ball", "burek:standup", "burek:courier", "burek:pizza",
    "burek:printer-fear", "burek:vacuum", "burek:hr-visit", "burek:renata",
    "burek:cables", "burek:rain", "burek:server-room", "burek:reflection",
    "burek:janusz",
  ],
  bartek: [
    "bartek:scope-creep", "bartek:client-travel",
    "bartek:email-tone", "bartek:first-client", "bartek:the-handover",
    "bartek:espresso", "bartek:leverage", "bartek:mentees",
    "bartek:hotel-points", "bartek:demo-fails", "bartek:rate-card",
    "bartek:workshop-craft", "bartek:slow-months",
  ],
  marek: [
    "marek:firmware", "marek:cables", "marek:backups",
    "marek:deploy-freeze", "marek:vpn", "marek:passwords",
    "marek:server-room", "marek:alerts", "marek:hostnames",
    "marek:home-rack", "marek:logs", "marek:maintenance-window",
    "marek:uptime",
  ],
  klaudia: [
    "klaudia:aesthetic", "klaudia:hashtags", "klaudia:brand-deals",
    "klaudia:unfollows", "klaudia:morning-routine", "klaudia:catchphrases",
    "klaudia:editing-backlog", "klaudia:barter", "klaudia:content-calendar",
    "klaudia:viral-post", "klaudia:copycats", "klaudia:backdrop",
    "klaudia:analytics-app",
  ],
  renata: [
    "renata:reception", "renata:mailroom", "renata:key-drawer",
    "renata:room-booking", "renata:packages", "renata:phone-voice",
    "renata:candy-bowl", "renata:noticeboard", "renata:drivers",
    "renata:first-aid", "renata:office-tours", "renata:quiet-hours",
    "renata:myths",
  ],
};

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

function r3TopicsOf(pool: NpcDialoguePool) {
  const manifest = R3_TOPICS[pool.npcId] ?? [];
  const byId = new Map(pool.topics.map((t) => [t.id, t]));
  return manifest.map((id) => {
    const topic = byId.get(id);
    expect(topic, `${pool.npcId} round-3 topic "${id}" is missing`).toBeDefined();
    return topic!;
  });
}

describe("WS5-r3 schema validity and alignment", () => {
  it("every pool (15 roster + generic) validates against the schema", () => {
    for (const pool of Object.values(POOLS)) {
      expect(validatePool(pool), `${pool.npcId}: ${validatePool(pool).join("; ")}`).toEqual(
        VALIDATE_OK,
      );
    }
  });

  it("every round-3 topic id from the manifest exists in its pool", () => {
    for (const pool of Object.values(POOLS)) {
      r3TopicsOf(pool); // throws with a clear message when something is missing
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

  it("no candidate or topic id collides with rounds 1-2 (global uniqueness)", () => {
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

describe("WS5-r3 per-NPC new-string volume (the batch floor)", () => {
  it("every roster NPC gains >= 150 distinct new option/reply strings", () => {
    for (const npcId of ROSTER_NPCS) {
      const pool = POOLS[npcId]!;
      const strings = r3TopicsOf(pool).flatMap((topic) => textsOfTopic(topic));
      const distinct = new Set(strings.map(normalize));
      expect(
        distinct.size,
        `${npcId} new-string count (needs >= 150, has ${distinct.size})`,
      ).toBeGreaterThanOrEqual(150);
    }
  });

  it("the generic fallback gains >= 75 distinct new strings", () => {
    const strings = r3TopicsOf(POOLS.generic!).flatMap((topic) => textsOfTopic(topic));
    const distinct = new Set(strings.map(normalize));
    expect(distinct.size, `generic new-string count (has ${distinct.size})`).toBeGreaterThanOrEqual(75);
  });

  it("the batch adds >= 2300 distinct new strings in total", () => {
    const distinct = new Set<string>();
    for (const pool of Object.values(POOLS)) {
      for (const topic of r3TopicsOf(pool)) {
        for (const text of textsOfTopic(topic)) distinct.add(normalize(text));
      }
    }
    expect(distinct.size, `batch total (has ${distinct.size})`).toBeGreaterThanOrEqual(2300);
  });

  it("no round-3 string repeats rounds 1-2 or any other pool string", () => {
    const preexisting = new Set<string>();
    for (const pool of Object.values(POOLS)) {
      const r3Ids = new Set(R3_TOPICS[pool.npcId] ?? []);
      for (const topic of pool.topics) {
        if (r3Ids.has(topic.id)) continue;
        for (const text of textsOfTopic(topic)) preexisting.add(normalize(text));
      }
    }
    for (const pool of Object.values(POOLS)) {
      for (const topic of r3TopicsOf(pool)) {
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

  it("no round-3 string duplicates another round-3 string", () => {
    const seen = new Map<string, string>();
    for (const pool of Object.values(POOLS)) {
      for (const topic of r3TopicsOf(pool)) {
        for (const text of textsOfTopic(topic)) {
          const key = normalize(text);
          const prev = seen.get(key);
          expect(prev, `${pool.npcId}/${topic.id} repeats ${prev ?? ""}`).toBeUndefined();
          seen.set(key, `${pool.npcId}/${topic.id}`);
        }
      }
    }
  });

  it("no flagged tokens anywhere in round-3 text (options, replies, labels)", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r3TopicsOf(pool)) {
        const all = [topic.label, ...textsOfTopic(topic)];
        for (const text of all) {
          expect(text, `${pool.npcId}/${topic.id}`).not.toMatch(/lorem|todo|placeholder|xxx/i);
        }
      }
    }
  });
});

describe("WS5-r3 authoring quality bar", () => {
  it("round-3 options are capitalized questions or sentences within 4-100 chars", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r3TopicsOf(pool)) {
        for (const option of topic.optionCandidates) {
          expect(option.text.length, option.id).toBeGreaterThanOrEqual(4);
          expect(option.text.length, option.id).toBeLessThanOrEqual(100);
          expect(option.text[0], option.id).toMatch(/[A-Z]/);
          expect(option.text.endsWith("?") || option.text.endsWith("."), option.id).toBe(true);
        }
      }
    }
  });

  it("round-3 replies are substantial and within 20-380 chars", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r3TopicsOf(pool)) {
        for (const reply of topic.replyCandidates ?? []) {
          expect(reply.text.length, reply.id).toBeGreaterThanOrEqual(20);
          expect(reply.text.length, reply.id).toBeLessThanOrEqual(380);
        }
      }
    }
  });

  it("every round-3 topic answers with >= 2 relationshipHint replies and >= 1 tagged reply", () => {
    const buckets = new Set(["offended", "annoyed", "neutral", "pleased", "delighted"]);
    for (const pool of Object.values(POOLS)) {
      for (const topic of r3TopicsOf(pool)) {
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

  it("every pool carries >= 2 multi-tag round-3 replies (context combinations)", () => {
    for (const pool of Object.values(POOLS)) {
      const combos = r3TopicsOf(pool)
        .flatMap((topic) => topic.replyCandidates ?? [])
        .filter((r) => (r.tags ?? []).length >= 2);
      expect(combos.length, `${pool.npcId} multi-tag replies`).toBeGreaterThanOrEqual(2);
    }
  });

  it("round-3 quest and event tags reference flags from the game's vocabulary", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r3TopicsOf(pool)) {
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

  it("burek's round-3 replies all speak dog (marker form)", () => {
    for (const topic of r3TopicsOf(POOLS.burek!)) {
      for (const reply of topic.replyCandidates ?? []) {
        expect(
          /\*[^*]+\*|\[[^\]]+\]|\([^)]+\)/.test(reply.text),
          `burek reply not in dog marker form: ${reply.id}`,
        ).toBe(true);
      }
    }
  });
});

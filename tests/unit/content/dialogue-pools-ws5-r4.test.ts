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
 * WS5 round 4 RELAUNCH (sacs-xtma.14 volume push, batch 4): ~2600 distinct
 * new strings across the 16 v2 dialogue pools — 14 new topics per roster NPC
 * and 7 for the generic fallback, each topic 6 positionally-paired
 * option/reply pairs. Rounds 1-3 are untouched; this suite pins:
 *   - schema validity for every pool (rounds 1-4 combined),
 *   - the C-78 per-topic option/reply alignment invariant (whole pools),
 *   - no id collisions with rounds 1-3 (global candidate/topic id set),
 *   - no flagged tokens (the /lorem|todo|placeholder|xxx/i quality gate),
 *   - per-NPC NEW-string counts: >= 150 distinct option/reply texts per
 *     roster NPC, >= 75 for the generic fallback (the round-4 floor),
 *   - freshness: no round-4 string repeats any string from rounds 1-3,
 *   - the authoring quality bar (bounds, hints, tags, flag vocabulary).
 *
 * The manifest below is the round-4 contract: exactly these topic ids are
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

/** The round-4 topic manifest: exactly these topics are the new batch. */
const R4_TOPICS: Record<string, readonly string[]> = {
  generic: [
    "generic:desk-snacks", "generic:meeting-survival", "generic:plant-duty",
    "generic:friday-curve", "generic:monday-mood", "generic:cardigan-season",
    "generic:afternoon-wall",
  ],
  zosia: [
    "zosia:calendars", "zosia:fridge-rules", "zosia:focus-wednesday",
    "zosia:townhall", "zosia:announcements", "zosia:room-names",
    "zosia:snack-rotation", "zosia:mediation", "zosia:burnout-watch",
    "zosia:summer-intake", "zosia:papercuts", "zosia:charity-drive",
    "zosia:suggestion-box", "zosia:appreciation-wall",
  ],
  pawel: [
    "pawel:certifications", "pawel:standup-notes", "pawel:dotfiles",
    "pawel:newsletters", "pawel:portfolio", "pawel:afraid-to-ask",
    "pawel:deadlines", "pawel:styleguide", "pawel:study-group",
    "pawel:lightning-talk", "pawel:dark-mode", "pawel:linux-rice",
    "pawel:rubber-duck", "pawel:shadow-oncall",
  ],
  kasia: [
    "kasia:benefits", "kasia:sick-notes", "kasia:feedback-forms",
    "kasia:office-grapevine", "kasia:working-hours", "kasia:speak-up",
    "kasia:reference-checks", "kasia:party-committee", "kasia:remote-onboarding",
    "kasia:certificates", "kasia:payslip-question", "kasia:meditation-room",
    "kasia:photo-wall", "kasia:work-anniversaries",
  ],
  tomek: [
    "tomek:commit-messages", "tomek:meeting-refusals", "tomek:readme",
    "tomek:trackball", "tomek:code-music", "tomek:estimates",
    "tomek:dogma", "tomek:pen-and-paper", "tomek:breaking-changes",
    "tomek:comments", "tomek:fraud-feeling", "tomek:woodworking",
    "tomek:deprecated", "tomek:linting",
  ],
  ania: [
    "ania:podcast", "ania:ai-copy", "ania:logo-rounds", "ania:press-release",
    "ania:sponsorships", "ania:blog-nobody-reads", "ania:agency-pitch",
    "ania:intern-ideas", "ania:testimonial-hunt", "ania:trend-reports",
    "ania:behind-the-scenes", "ania:unsubscribe-zen", "ania:typo-tweet",
    "ania:jingle",
  ],
  janusz: [
    "janusz:soap", "janusz:night-shift", "janusz:warnings",
    "janusz:chair-repairs", "janusz:plant-corner", "janusz:tradesman",
    "janusz:coffee-machine-doctor", "janusz:screw-drawer", "janusz:winter-99",
    "janusz:five-am", "janusz:steps", "janusz:seasons",
    "janusz:robot-apprentice", "janusz:boiler-room",
  ],
  grazyna: [
    "grazyna:master-workbook", "grazyna:overdue-invoices",
    "grazyna:cake-accounting", "grazyna:euro-question", "grazyna:round-numbers",
    "grazyna:bank-lunch", "grazyna:forecasting", "grazyna:stapler-famine",
    "grazyna:shortcut-scripture", "grazyna:winter-market",
    "grazyna:depreciation", "grazyna:shredder", "grazyna:laminator",
    "grazyna:tea-ritual",
  ],
  maciek: [
    "maciek:elevator-pitch", "maciek:standing-desk", "maciek:big-call",
    "maciek:jetlag", "maciek:borrowed-guru", "maciek:logo-bigger",
    "maciek:smart-office", "maciek:announcement-voice", "maciek:biohacking",
    "maciek:networking-events", "maciek:plaque-shelf", "maciek:future-of-work",
    "maciek:failure-story", "maciek:thought-leadership",
  ],
  przemek: [
    "przemek:voicemail", "przemek:slow-quarter", "przemek:ninety-slides",
    "przemek:swag-bags", "przemek:power-breakfast", "przemek:eye-contact",
    "przemek:client-baskets", "przemek:cassette-course", "przemek:rescue-calls",
    "przemek:shoebox-era", "przemek:rain-calls", "przemek:heir",
    "przemek:free-trial", "przemek:fax",
  ],
  dawid: [
    "dawid:one-pencil", "dawid:typing-speed", "dawid:printed-diagrams",
    "dawid:declined-meetings", "dawid:windowsill", "dawid:retro-machines",
    "dawid:camera-off", "dawid:three-word-replies", "dawid:margin-notes",
    "dawid:one-question", "dawid:bridges", "dawid:headphones",
    "dawid:pricing", "dawid:friday-1700",
  ],
  burek: [
    "burek:postman", "burek:shoes", "burek:window", "burek:puddles",
    "burek:crumbs", "burek:night-patrol", "burek:squirrel", "burek:elevator",
    "burek:car-rides", "burek:camera", "burek:thunder", "burek:nap-map",
    "burek:hot-days", "burek:new-humans",
  ],
  bartek: [
    "bartek:training-room", "bartek:handouts", "bartek:difficult-students",
    "bartek:half-day-vs-full", "bartek:slide-fonts", "bartek:microphone",
    "bartek:evaluation-sheets", "bartek:recorded-courses",
    "bartek:parking-lot-technique", "bartek:dry-markers", "bartek:client-lunch",
    "bartek:trainer-clock", "bartek:war-stories", "bartek:legacy-students",
  ],
  marek: [
    "marek:ticket-queue", "marek:wifi-map", "marek:shadow-it",
    "marek:helpdesk-manners", "marek:label-maker", "marek:power-strips",
    "marek:windows-update", "marek:inventory-sheet", "marek:door-camera",
    "marek:kb-articles", "marek:phone-instead-of-ticket", "marek:scared-reboot",
    "marek:third-monitor", "marek:warranty-calls",
  ],
  klaudia: [
    "klaudia:comment-voice", "klaudia:posting-times", "klaudia:golden-hour",
    "klaudia:outfit-repeat", "klaudia:office-shoot", "klaudia:brand-safety",
    "klaudia:shadowban-fear", "klaudia:highlights-archive",
    "klaudia:family-audience", "klaudia:unboxing", "klaudia:transition-pack",
    "klaudia:milestone", "klaudia:office-cameos", "klaudia:idea-notebook",
  ],
  renata: [
    "renata:signature-book", "renata:umbrella-graveyard", "renata:extensions",
    "renata:glass-knocks", "renata:sticky-note-system", "renata:fridge-notes",
    "renata:reception-flowers", "renata:reception-radio", "renata:early-client",
    "renata:post-office", "renata:mug-cabinet", "renata:late-comers",
    "renata:solution-drawer", "renata:badge-photos",
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

function r4TopicsOf(pool: NpcDialoguePool) {
  const manifest = R4_TOPICS[pool.npcId] ?? [];
  const byId = new Map(pool.topics.map((t) => [t.id, t]));
  return manifest.map((id) => {
    const topic = byId.get(id);
    expect(topic, `${pool.npcId} round-4 topic "${id}" is missing`).toBeDefined();
    return topic!;
  });
}

describe("WS5-r4 schema validity and alignment", () => {
  it("every pool (15 roster + generic) validates against the schema", () => {
    for (const pool of Object.values(POOLS)) {
      expect(validatePool(pool), `${pool.npcId}: ${validatePool(pool).join("; ")}`).toEqual(
        VALIDATE_OK,
      );
    }
  });

  it("every round-4 topic id from the manifest exists in its pool", () => {
    for (const pool of Object.values(POOLS)) {
      r4TopicsOf(pool); // throws with a clear message when something is missing
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

  it("no candidate or topic id collides with rounds 1-3 (global uniqueness)", () => {
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

describe("WS5-r4 per-NPC new-string volume (the batch floor)", () => {
  it("every roster NPC gains >= 150 distinct new option/reply strings", () => {
    for (const npcId of ROSTER_NPCS) {
      const pool = POOLS[npcId]!;
      const strings = r4TopicsOf(pool).flatMap((topic) => textsOfTopic(topic));
      const distinct = new Set(strings.map(normalize));
      expect(
        distinct.size,
        `${npcId} new-string count (needs >= 150, has ${distinct.size})`,
      ).toBeGreaterThanOrEqual(150);
    }
  });

  it("the generic fallback gains >= 75 distinct new strings", () => {
    const strings = r4TopicsOf(POOLS.generic!).flatMap((topic) => textsOfTopic(topic));
    const distinct = new Set(strings.map(normalize));
    expect(distinct.size, `generic new-string count (has ${distinct.size})`).toBeGreaterThanOrEqual(75);
  });

  it("the batch adds >= 2400 distinct new strings in total", () => {
    const distinct = new Set<string>();
    for (const pool of Object.values(POOLS)) {
      for (const topic of r4TopicsOf(pool)) {
        for (const text of textsOfTopic(topic)) distinct.add(normalize(text));
      }
    }
    expect(distinct.size, `batch total (has ${distinct.size})`).toBeGreaterThanOrEqual(2400);
  });

  it("no round-4 string repeats rounds 1-3 or any other pool string", () => {
    const preexisting = new Set<string>();
    for (const pool of Object.values(POOLS)) {
      const r4Ids = new Set(R4_TOPICS[pool.npcId] ?? []);
      for (const topic of pool.topics) {
        if (r4Ids.has(topic.id)) continue;
        for (const text of textsOfTopic(topic)) preexisting.add(normalize(text));
      }
    }
    for (const pool of Object.values(POOLS)) {
      for (const topic of r4TopicsOf(pool)) {
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

  it("no round-4 string duplicates another round-4 string", () => {
    const seen = new Map<string, string>();
    for (const pool of Object.values(POOLS)) {
      for (const topic of r4TopicsOf(pool)) {
        for (const text of textsOfTopic(topic)) {
          const key = normalize(text);
          const prev = seen.get(key);
          expect(prev, `${pool.npcId}/${topic.id} repeats ${prev ?? ""}`).toBeUndefined();
          seen.set(key, `${pool.npcId}/${topic.id}`);
        }
      }
    }
  });

  it("no flagged tokens anywhere in round-4 text (options, replies, labels)", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r4TopicsOf(pool)) {
        const all = [topic.label, ...textsOfTopic(topic)];
        for (const text of all) {
          expect(text, `${pool.npcId}/${topic.id}`).not.toMatch(/lorem|todo|placeholder|xxx/i);
        }
      }
    }
  });
});

describe("WS5-r4 authoring quality bar", () => {
  it("round-4 options are capitalized questions or sentences within 4-100 chars", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r4TopicsOf(pool)) {
        for (const option of topic.optionCandidates) {
          expect(option.text.length, option.id).toBeGreaterThanOrEqual(4);
          expect(option.text.length, option.id).toBeLessThanOrEqual(100);
          expect(option.text[0], option.id).toMatch(/[A-Z]/);
          expect(option.text.endsWith("?") || option.text.endsWith("."), option.id).toBe(true);
        }
      }
    }
  });

  it("round-4 replies are substantial and within 20-380 chars", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r4TopicsOf(pool)) {
        for (const reply of topic.replyCandidates ?? []) {
          expect(reply.text.length, reply.id).toBeGreaterThanOrEqual(20);
          expect(reply.text.length, reply.id).toBeLessThanOrEqual(380);
        }
      }
    }
  });

  it("every round-4 topic answers with >= 2 relationshipHint replies and >= 1 tagged reply", () => {
    const buckets = new Set(["offended", "annoyed", "neutral", "pleased", "delighted"]);
    for (const pool of Object.values(POOLS)) {
      for (const topic of r4TopicsOf(pool)) {
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

  it("every pool carries >= 2 multi-tag round-4 replies (context combinations)", () => {
    for (const pool of Object.values(POOLS)) {
      const combos = r4TopicsOf(pool)
        .flatMap((topic) => topic.replyCandidates ?? [])
        .filter((r) => (r.tags ?? []).length >= 2);
      expect(combos.length, `${pool.npcId} multi-tag replies`).toBeGreaterThanOrEqual(2);
    }
  });

  it("round-4 quest and event tags reference flags from the game's vocabulary", () => {
    for (const pool of Object.values(POOLS)) {
      for (const topic of r4TopicsOf(pool)) {
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

  it("burek's round-4 replies all speak dog (marker form)", () => {
    for (const topic of r4TopicsOf(POOLS.burek!)) {
      for (const reply of topic.replyCandidates ?? []) {
        expect(
          /\*[^*]+\*|\[[^\]]+\]|\([^)]+\)/.test(reply.text),
          `burek reply not in dog marker form: ${reply.id}`,
        ).toBe(true);
      }
    }
  });
});

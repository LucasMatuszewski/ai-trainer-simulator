/**
 * Authored social profiles for the 15-NPC roster (ADR-0009 D-50, WS2).
 *
 * This is the data half of the social simulation: the OCEAN (Big Five)
 * personality traits, the authored mood baselines, and the archetype seed
 * table every NPC<->NPC pair regresses toward each night. Traits are
 * 0-100; mood valence is -100..100; energy 0..100; seeds are absolute
 * relationship values 0-100 where 50 is the neutral default.
 *
 * Authoring notes (coherent with `npcs.ts` / the dialogue trees):
 * - PoC wires only extraversion (chatter), agreeableness (reaction delta
 *   scaling) and neuroticism (mood volatility) — see ADR-0009 §4. The other
 *   two traits are authored now (dead data is still cheaper than a schema
 *   migration later) and stay unused until a surface needs them.
 * - Burek is a dog: a fixed simple profile. Everyone loves him and he loves
 *   everyone; his mood baseline is high and the reducer never shifts it
 *   (D-50: "Burek: matrix row, no arguments, fixed mood").
 * - The seed table covers ALL 105 pairs so a fresh save is archetype-seeded,
 *   never flat 50 (AC-15). Each pair is authored exactly once, in the
 *   alphabetically-first NPC's row; `ARCHETYPE_SEEDS` derives the canonical
 *   pairKey map and the unit tests reject conflicting double definitions.
 *
 * Anchor pairs from the WS2 brief:
 * - manager <-> assistant warm (+20): zosia <-> pawel = 70
 * - sales <-> engineering hostile (-15): marek <-> przemek = 35
 * - janitor <-> everyone neutral-to-warm: janusz rows are 50-62
 */

import { pairKey, type Mood } from "../game/social";
import type { NpcId } from "../types";

/** Bump this when the profile table changes materially (D-51 re-seed rule). */
export const SOCIAL_PROFILES_VERSION = 2;

/** Default archetype seed for pairs without an authored value (unused today:
 * the table covers all 105 pairs, but the migration chain keeps this default
 * so future partial tables stay safe). */
export const DEFAULT_SEED = 50;

/** An authored social personality profile. */
export interface SocialProfile {
  extraversion: number;
  agreeableness: number;
  conscientiousness: number;
  neuroticism: number;
  openness: number;
  /** Mood the NPC returns to in finite time (AC-17). */
  moodBaseline: Mood;
  /**
   * Seed relationship values (0-100) for pairs THIS NPC anchors. Each pair is
   * authored once across the whole table (tests enforce this); keys may point
   * at any other NpcId.
   */
  archetypeSeeds: Record<string, number>;
}

/** Canonical roster order (matches `npcs.ts` and the memory roster). */
export const NPC_IDS: NpcId[] = [
  "renata",
  "bartek",
  "klaudia",
  "marek",
  "zosia",
  "pawel",
  "kasia",
  "tomek",
  "ania",
  "janusz",
  "burek",
  "grazyna",
  "maciek",
  "przemek",
  "dawid",
];

export const SOCIAL_PROFILES: Record<NpcId, SocialProfile> = {
  // Warm, unflappable support/office manager. Runs the place, remembers
  // everything, de-escalates everything.
  renata: {
    extraversion: 60,
    agreeableness: 80,
    conscientiousness: 85,
    neuroticism: 35,
    openness: 60,
    moodBaseline: { valence: 20, energy: 60 },
    archetypeSeeds: {
      ania: 60,
      bartek: 60,
      burek: 85,
      dawid: 55,
      grazyna: 58,
      janusz: 60,
      kasia: 58,
      klaudia: 55,
      maciek: 55,
      marek: 52,
      pawel: 58,
      przemek: 52,
      tomek: 55,
      zosia: 62,
    },
  },
  // The steady senior consultant: plain, reliable, quietly liked.
  bartek: {
    extraversion: 50,
    agreeableness: 60,
    conscientiousness: 70,
    neuroticism: 40,
    openness: 50,
    moodBaseline: { valence: 10, energy: 55 },
    archetypeSeeds: {
      burek: 75,
      dawid: 55,
      grazyna: 55,
      janusz: 58,
      kasia: 52,
      klaudia: 52,
      maciek: 55,
      marek: 55,
      pawel: 60,
      przemek: 52,
      tomek: 58,
      zosia: 65,
    },
  },
  // The LinkedIn influencer: maximum visibility, moderate depth.
  klaudia: {
    extraversion: 90,
    agreeableness: 55,
    conscientiousness: 45,
    neuroticism: 55,
    openness: 75,
    moodBaseline: { valence: 15, energy: 70 },
    archetypeSeeds: {
      maciek: 50,
      marek: 40,
      pawel: 55,
      przemek: 65,
      tomek: 55,
      zosia: 55,
    },
  },
  // The grumpy 10x DevOps: few words, strong opinions, loves the dog.
  marek: {
    extraversion: 25,
    agreeableness: 25,
    conscientiousness: 80,
    neuroticism: 50,
    openness: 65,
    moodBaseline: { valence: -10, energy: 45 },
    archetypeSeeds: {
      pawel: 52,
      przemek: 35, // sales <-> engineering (-15 per the WS2 brief)
      tomek: 60,
      zosia: 55,
    },
  },
  // The manager (owns the only blazer): high extraversion per the brief.
  zosia: {
    extraversion: 80,
    agreeableness: 65,
    conscientiousness: 75,
    neuroticism: 45,
    openness: 55,
    moodBaseline: { valence: 10, energy: 60 },
    archetypeSeeds: {
      // Every zosia pair is anchored from the other NPC's row (each pair is
      // authored exactly once across the table; the tests enforce this).
    },
  },
  // The eager intern: agreeable, anxious, everyone's junior.
  pawel: {
    extraversion: 55,
    agreeableness: 75,
    conscientiousness: 50,
    neuroticism: 65,
    openness: 60,
    moodBaseline: { valence: 5, energy: 65 },
    archetypeSeeds: {
      przemek: 55,
      tomek: 65,
      zosia: 70, // manager <-> assistant warm (+20 per the WS2 brief)
    },
  },
  // The recruiter: dressed to be remembered, networked to the teeth.
  kasia: {
    extraversion: 85,
    agreeableness: 60,
    conscientiousness: 60,
    neuroticism: 45,
    openness: 65,
    moodBaseline: { valence: 15, energy: 65 },
    archetypeSeeds: {
      klaudia: 62,
      maciek: 52,
      marek: 45,
      pawel: 55,
      przemek: 70, // sales <-> recruiter alliance
      tomek: 52,
      zosia: 58,
    },
  },
  // The junior developer: dyed-hair phase, curious, slightly chaotic.
  tomek: {
    extraversion: 60,
    agreeableness: 65,
    conscientiousness: 40,
    neuroticism: 60,
    openness: 80,
    moodBaseline: { valence: 10, energy: 60 },
    archetypeSeeds: {
      zosia: 55,
    },
  },
  // Marketing & synergy: brand voice, best friends with the influencer.
  ania: {
    extraversion: 85,
    agreeableness: 70,
    conscientiousness: 55,
    neuroticism: 50,
    openness: 75,
    moodBaseline: { valence: 20, energy: 70 },
    archetypeSeeds: {
      bartek: 55,
      burek: 78,
      dawid: 60,
      grazyna: 48,
      janusz: 52,
      kasia: 62,
      klaudia: 68,
      maciek: 52,
      marek: 40, // marketing vs DevOps friction
      pawel: 58,
      przemek: 70, // marketing <-> sales partnership
      tomek: 55,
      zosia: 58,
    },
  },
  // The janitor: twenty years of grey, calm, quietly warm with everyone.
  janusz: {
    extraversion: 45,
    agreeableness: 75,
    conscientiousness: 85,
    neuroticism: 25,
    openness: 40,
    moodBaseline: { valence: 10, energy: 50 },
    archetypeSeeds: {
      kasia: 52,
      klaudia: 52,
      maciek: 55,
      marek: 55,
      pawel: 55,
      przemek: 52,
      tomek: 55,
      zosia: 55,
    },
  },
  // The office dog: fixed simple profile. Feeds and affection determine all.
  burek: {
    extraversion: 70,
    agreeableness: 90,
    conscientiousness: 10,
    neuroticism: 10,
    openness: 40,
    moodBaseline: { valence: 60, energy: 75 },
    archetypeSeeds: {
      dawid: 72,
      grazyna: 75,
      janusz: 90, // feeds him
      kasia: 80,
      klaudia: 80,
      maciek: 78,
      marek: 85,
      pawel: 85,
      przemek: 75,
      tomek: 85,
      zosia: 82,
    },
  },
  // The accountant: dry, precise, allergic to creative expense reports.
  grazyna: {
    extraversion: 40,
    agreeableness: 55,
    conscientiousness: 90,
    neuroticism: 40,
    openness: 35,
    moodBaseline: { valence: 0, energy: 50 },
    archetypeSeeds: {
      janusz: 55,
      kasia: 50,
      klaudia: 45,
      maciek: 52,
      marek: 50,
      pawel: 50,
      przemek: 45, // audits the expense accounts sales submit
      tomek: 48,
      zosia: 62,
    },
  },
  // The CTO: rocket energy, respects engineers, tolerates demos that work.
  maciek: {
    extraversion: 55,
    agreeableness: 45,
    conscientiousness: 70,
    neuroticism: 40,
    openness: 85,
    moodBaseline: { valence: 10, energy: 60 },
    archetypeSeeds: {
      marek: 58,
      pawel: 52,
      przemek: 50,
      tomek: 55,
      zosia: 58,
    },
  },
  // Sales: the loudest shirt on the floor, allergic to "no".
  przemek: {
    extraversion: 95,
    agreeableness: 60,
    conscientiousness: 50,
    neuroticism: 55,
    openness: 60,
    moodBaseline: { valence: 20, energy: 75 },
    archetypeSeeds: {
      tomek: 38, // sales <-> engineering (-15 territory)
      zosia: 60,
    },
  },
  // The CEO: one good navy suit, guarded warmth, guards the cap table.
  dawid: {
    extraversion: 65,
    agreeableness: 50,
    conscientiousness: 75,
    neuroticism: 30,
    openness: 70,
    moodBaseline: { valence: 15, energy: 55 },
    archetypeSeeds: {
      grazyna: 58,
      janusz: 52,
      kasia: 55,
      klaudia: 55,
      maciek: 60, // CTO <-> CEO trust
      marek: 52,
      pawel: 50,
      przemek: 58,
      tomek: 50,
      zosia: 60,
    },
  },
};

// ---------------------------------------------------------------------------
// Derived tables
// ---------------------------------------------------------------------------

/** Ids sorted lexicographically — the pair-universe enumeration order. */
const SORTED_IDS: NpcId[] = [...NPC_IDS].sort();

/** All C(15, 2) = 105 canonical pair keys, sorted. */
export const ALL_PAIR_KEYS: readonly string[] = SORTED_IDS.flatMap((a, i) =>
  SORTED_IDS.slice(i + 1).map((b) => pairKey(a, b)),
);

/** Fresh array of all pair keys (callers may mutate their copy). */
export function allPairKeys(): string[] {
  return [...ALL_PAIR_KEYS];
}

/**
 * The canonical pairKey -> seed table derived from the per-NPC rows. If both
 * directions of a pair are ever authored, the first (lexicographically
 * smaller id's row) wins — and the unit tests reject any differing duplicate
 * so authoring mistakes surface immediately.
 */
export const ARCHETYPE_SEEDS: Record<string, number> = (() => {
  const seeds: Record<string, number> = {};
  for (const [self, profile] of Object.entries(SOCIAL_PROFILES)) {
    for (const [other, value] of Object.entries(profile.archetypeSeeds)) {
      const key = pairKey(self, other);
      if (seeds[key] === undefined) seeds[key] = value;
    }
  }
  // C-78 REVISE: real poles — a seed table with no hostile pairs and no
  // warm human pairs makes band-gated NPC-NPC talk flat on day 1. These
  // overrides are the drama anchors (authors gate conversations on them):
  // hostile office rivalries and warm friendships that actually qualify
  // for the warm band (> 65).
  const poles: Array<[[NpcId, NpcId], number]> = [
    [[("kasia"), ("marek")], 25],
    [[("tomek"), ("grazyna")], 22],
    [[("ania"), ("tomek")], 30],
    [[("klaudia"), ("maciek")], 28],
    [[("pawel"), ("zosia")], 70],
    [[("kasia"), ("przemek")], 72],
    [[("ania"), ("klaudia")], 68],
    [[("marek"), ("przemek")], 35],
  ];
  for (const [[a, b], v] of poles) {
    seeds[pairKey(a, b)] = v;
  }
  return seeds;
})();

/** Fresh baseline-mood map (new objects every call; never share references). */
export function defaultMoods(): Record<NpcId, Mood> {
  return Object.fromEntries(
    NPC_IDS.map((id) => {
      const baseline = SOCIAL_PROFILES[id].moodBaseline;
      return [id, { valence: baseline.valence, energy: baseline.energy }];
    }),
  ) as Record<NpcId, Mood>;
}

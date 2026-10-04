/**
 * Data-shape tests for the authored social profiles (PR-11, WS2).
 *
 * The profiles are pure data, so the tests assert the shape, the ranges, the
 * roster coverage (all 15 NpcIds incl. burek), the derived pair-seed table
 * (105 unique pairs, no conflicting double definitions, no NaN) and that the
 * seed table stays in sync with the runtime dialogue-memory roster.
 */

import { describe, expect, it } from "vitest";

import { NPC_MEMORY } from "../../../src/content/dialogue-memory";
import {
  ALL_PAIR_KEYS,
  ARCHETYPE_SEEDS,
  DEFAULT_SEED,
  NPC_IDS,
  SOCIAL_PROFILES,
  SOCIAL_PROFILES_VERSION,
  allPairKeys,
  defaultMoods,
  type SocialProfile,
} from "../../../src/content/npc-profiles";
import { NPCS } from "../../../src/content/npcs";
import { pairKey } from "../../../src/game/social";

const ROSTER_IDS = NPCS.map((npc) => npc.id).sort();

function isFiniteIn(value: number, min: number, max: number): boolean {
  return Number.isFinite(value) && value >= min && value <= max;
}

function profileEntries(): Array<[string, SocialProfile]> {
  return Object.entries(SOCIAL_PROFILES);
}

describe("SOCIAL_PROFILES_VERSION", () => {
  it("is 1 for the first authored profile table", () => {
    // C-78 REVISE (v2): the seed table gained real poles (hostile + warm
    // human anchors) — the version bump re-seeds untouched pairs per D-51.
    expect(SOCIAL_PROFILES_VERSION).toBe(2);
  });
});

describe("roster coverage", () => {
  it("has exactly one profile per NpcId of the 15-NPC roster (incl. burek)", () => {
    expect(ROSTER_IDS).toHaveLength(15);
    expect(NPC_IDS.sort()).toEqual(ROSTER_IDS);
    expect(Object.keys(SOCIAL_PROFILES).sort()).toEqual(ROSTER_IDS);
  });

  it("stays in sync with the runtime dialogue-memory roster", () => {
    expect([...NPC_IDS].sort()).toEqual(Object.keys(NPC_MEMORY).sort());
  });

  it("covers the dog burek with a fixed simple profile", () => {
    const burek = SOCIAL_PROFILES.burek!;
    // fixed simple profile: friendly, calm, not a deep character (D-50)
    expect(burek.agreeableness).toBeGreaterThanOrEqual(80);
    expect(burek.neuroticism).toBeLessThanOrEqual(20);
    expect(burek.moodBaseline.valence).toBeGreaterThan(0);
  });
});

describe("profile shapes (no NaN, ranges respected)", () => {
  it("authors all five OCEAN traits in 0-100 for every NPC", () => {
    for (const [id, profile] of profileEntries()) {
      for (const trait of [
        "extraversion",
        "agreeableness",
        "conscientiousness",
        "neuroticism",
        "openness",
      ] as const) {
        expect(isFiniteIn(profile[trait], 0, 100), `${id}.${trait}`).toBe(true);
      }
    }
  });

  it("authors moodBaseline with valence in [-100, 100] and energy in [0, 100]", () => {
    for (const [id, profile] of profileEntries()) {
      expect(isFiniteIn(profile.moodBaseline.valence, -100, 100), `${id}.valence`).toBe(true);
      expect(isFiniteIn(profile.moodBaseline.energy, 0, 100), `${id}.energy`).toBe(true);
    }
  });

  it("is consistent with the characterizations in npcs.ts", () => {
    // Zosia (the manager) is the office's high-extraversion authority.
    expect(SOCIAL_PROFILES.zosia!.extraversion).toBeGreaterThanOrEqual(75);
    // Renata (support / office manager) runs the place: high conscientiousness.
    expect(SOCIAL_PROFILES.renata!.conscientiousness).toBeGreaterThanOrEqual(80);
    // Marek (grumpy DevOps) is the least agreeable human on the floor.
    const humans = profileEntries().filter(([id]) => id !== "burek");
    const leastAgreeable = humans.reduce((min, [, p]) => Math.min(min, p.agreeableness), 100);
    expect(SOCIAL_PROFILES.marek!.agreeableness).toBe(leastAgreeable);
  });

  it("returns fresh mood objects from defaultMoods() (no shared references)", () => {
    const a = defaultMoods();
    const b = defaultMoods();
    expect(a).toEqual(b);
    expect(a.zosia).not.toBe(b.zosia);
    a.zosia!.valence = -100;
    expect(b.zosia!.valence).not.toBe(-100);
  });
});

describe("pair universe", () => {
  it("derives exactly 105 unique pair keys for the 15-NPC roster", () => {
    expect(ALL_PAIR_KEYS).toHaveLength(105);
    expect(allPairKeys()).toHaveLength(105);
    expect(new Set(ALL_PAIR_KEYS).size).toBe(105);
  });

  it("builds canonical, self-consistent keys over known ids only", () => {
    const roster = new Set<string>(ROSTER_IDS);
    for (const key of ALL_PAIR_KEYS) {
      const [a, b] = key.split("|") as [string, string];
      expect(a < b, `${key} must be canonical (a < b)`).toBe(true);
      expect(roster.has(a), key).toBe(true);
      expect(roster.has(b), key).toBe(true);
      expect(a).not.toBe(b);
    }
    expect(allPairKeys()).toEqual(allPairKeys().slice().sort());
  });
});

describe("archetype seed table", () => {
  it("authors every seed in 0-100 with no NaN", () => {
    for (const [key, value] of Object.entries(ARCHETYPE_SEEDS)) {
      expect(isFiniteIn(value, 0, 100), key).toBe(true);
    }
  });

  it("never defines the same pair twice with different values", () => {
    const seen = new Map<string, number>();
    for (const [self, profile] of profileEntries()) {
      for (const [other, value] of Object.entries(profile.archetypeSeeds)) {
        const key = pairKey(self, other);
        const previous = seen.get(key);
        expect(previous, `conflicting seed for ${key}`).toBeUndefined();
        seen.set(key, value);
      }
    }
    expect(seen.size).toBe(Object.keys(ARCHETYPE_SEEDS).length);
  });

  it("seeds every one of the 105 pairs (no flat-50 fill needed)", () => {
    // AC-15: the matrix is archetype-seeded, not flat 50. The authored table
    // covers the full universe so a fresh save never needs the default.
    expect(new Set(Object.keys(ARCHETYPE_SEEDS))).toEqual(new Set(ALL_PAIR_KEYS));
    // and the table is not flat: it must contain values on both sides of 50
    const values = Object.values(ARCHETYPE_SEEDS);
    expect(Math.min(...values)).toBeLessThan(DEFAULT_SEED);
    expect(Math.max(...values)).toBeGreaterThan(DEFAULT_SEED);
  });

  it("keeps the brief's anchor pairs", () => {
    // manager <-> assistant warm (+20 over the 50 default)
    expect(ARCHETYPE_SEEDS[pairKey("zosia", "pawel")]).toBe(70);
    // sales <-> engineering hostile (-15)
    expect(ARCHETYPE_SEEDS[pairKey("marek", "przemek")]).toBe(35);
    // janitor <-> everyone neutral-to-warm
    for (const [key, value] of Object.entries(ARCHETYPE_SEEDS)) {
      if (!key.startsWith("janusz|")) continue;
      expect(value, key).toBeGreaterThanOrEqual(50);
      expect(value, key).toBeLessThanOrEqual(62);
    }
    // the dog is loved by everyone and loves everyone back
    for (const [key, value] of Object.entries(ARCHETYPE_SEEDS)) {
      if (!key.includes("burek")) continue;
      expect(value, key).toBeGreaterThanOrEqual(70);
    }
  });
});

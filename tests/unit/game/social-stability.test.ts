import { describe, expect, it } from "vitest";
import type { NpcId } from "../../../src/types";
import {
  ARCHETYPE_SEEDS,
  ALL_PAIR_KEYS,
  SOCIAL_PROFILES,
} from "../../../src/content/npc-profiles";
import {
  applyReaction,
  pairKey,
  regressNightly,
  type RelationshipMatrix,
} from "../../../src/game/social";

/**
 * PRD AC-19b / ADR-0009 D-50: 30 simulated in-game days of random
 * relationship deltas with the nightly regression must keep the
 * matrix OFF the 0/100 clamps — no pair may end pinned at an extreme,
 * and extremes must regress back toward the archetype seeds.
 */

// Deterministic LCG so the "random" day is reproducible.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BUCKETS = ["offended", "annoyed", "neutral", "pleased", "delighted"] as const;
type Bucket = (typeof BUCKETS)[number];

function freshMatrix(): RelationshipMatrix {
  const matrix: RelationshipMatrix = {};
  for (const key of ALL_PAIR_KEYS) matrix[key] = ARCHETYPE_SEEDS[key] ?? 50;
  return matrix;
}

function runThirtyDays(seed: number): RelationshipMatrix {
  const rng = mulberry32(seed);
  let matrix = freshMatrix();
  const pairs = ALL_PAIR_KEYS.map((key) => key.split("|") as [NpcId, NpcId]);
  for (let day = 0; day < 30; day += 1) {
    // Several judged actions per day across random pairs.
    for (let action = 0; action < 12; action += 1) {
      const [a, b] = pairs[Math.floor(rng() * pairs.length)]!;
      const bucket = BUCKETS[Math.floor(rng() * BUCKETS.length)] as Bucket;
      matrix = applyReaction(matrix, [a, b], bucket);
    }
    // Nightly regression toward archetype seeds (D-50).
    matrix = regressNightly(matrix, ARCHETYPE_SEEDS, 0.1);
  }
  return matrix;
}

describe("30-day social stability (AC-19b)", () => {
  it("keeps every pair off the 0/100 clamps after 30 days (multiple seeds)", () => {
    for (const seed of [1, 42, 1337]) {
      const matrix = runThirtyDays(seed);
      for (const [key, value] of Object.entries(matrix)) {
        expect(value, `${seed}/${key}`).toBeGreaterThan(0);
        expect(value, `${seed}/${key}`).toBeLessThan(100);
      }
    }
  });

  it("pulls an artificially extreme pair back toward its seed within days", () => {
    let matrix = freshMatrix();
    const key = pairKey("zosia", "pawel");
    matrix = { ...matrix, [key]: 0 };
    for (let day = 0; day < 15; day += 1) {
      matrix = regressNightly(matrix, ARCHETYPE_SEEDS, 0.1);
    }
    const value = matrix[key]!;
    expect(value).toBeGreaterThan(20);
    const seedValue = ARCHETYPE_SEEDS[key] ?? 50;
    expect(Math.abs(value - seedValue)).toBeLessThan(Math.abs(0 - seedValue));
  });

  it("is deterministic for the same seed", () => {
    expect(runThirtyDays(7)).toEqual(runThirtyDays(7));
  });

  it("the whole run never throws and every value stays finite in [0,100]", () => {
    const matrix = runThirtyDays(99);
    for (const value of Object.values(matrix)) {
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    }
    // The profiles' baselines this simulation leans on exist for all 15.
    expect(Object.keys(SOCIAL_PROFILES)).toHaveLength(15);
  });
});

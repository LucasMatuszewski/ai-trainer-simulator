/**
 * Unit tests for the pure social model (ADR-0009 D-50, WS2).
 *
 * Covers: pair key normalization, clamp bounds, the bucket -> delta mapping
 * table with trait scaling, the witness delta cap, the deadband helper,
 * nightly regression, mood/needs decay, lazy pair seeding, the seeded RNG and
 * imbalanced-triad detection (shadow-only fact).
 */

import { describe, expect, it } from "vitest";

import {
  BUCKET_DELTAS,
  DEFAULT_RELATIONSHIP,
  MOOD_DELTA_LIMIT,
  REL_DELTA_LIMIT,
  WITNESS_DELTA_CAP,
  applyReaction,
  applyWitnessDelta,
  band,
  capWitnessDelta,
  createSeededRng,
  decayMood,
  decayNeeds,
  detectImbalancedTriads,
  pairKey,
  parsePairKey,
  reactionDeltas,
  regressNightly,
  seedMissingPairs,
  witnessDeltaForBucket,
} from "../../../src/game/social";

describe("pairKey", () => {
  it("normalizes a pair to sorted id order so both directions share one key", () => {
    expect(pairKey("zosia", "marek")).toBe("marek|zosia");
    expect(pairKey("marek", "zosia")).toBe("marek|zosia");
    expect(pairKey("zosia", "marek")).toBe(pairKey("marek", "zosia"));
  });

  it("parses a key back into its ordered ids and rejects malformed keys", () => {
    expect(parsePairKey("ania|marek")).toEqual(["ania", "marek"]);
    expect(parsePairKey("marek|zosia")).toEqual(["marek", "zosia"]);
    // wrong order was never produced by pairKey; treat as invalid
    expect(parsePairKey("zosia|marek")).toBeNull();
    expect(parsePairKey("zosia")).toBeNull();
    expect(parsePairKey("zosia|marek|ania")).toBeNull();
    expect(parsePairKey("")).toBeNull();
  });

  it("produces a deterministic self-pair key (callers must ignore it)", () => {
    expect(pairKey("zosia", "zosia")).toBe("zosia|zosia");
  });
});

describe("reactionDeltas (bucket mapping + trait scaling)", () => {
  it("maps every bucket to its base rel/mood deltas", () => {
    expect(BUCKET_DELTAS.delighted).toEqual({ relDelta: 5, moodDelta: 6 });
    expect(BUCKET_DELTAS.pleased).toEqual({ relDelta: 2, moodDelta: 3 });
    expect(BUCKET_DELTAS.neutral).toEqual({ relDelta: 0, moodDelta: 0 });
    expect(BUCKET_DELTAS.annoyed).toEqual({ relDelta: -2, moodDelta: -3 });
    expect(BUCKET_DELTAS.offended).toEqual({ relDelta: -5, moodDelta: -6 });
  });

  it("is neutral by default (trait 50 scales nothing)", () => {
    expect(reactionDeltas("delighted")).toEqual({ relDelta: 5, moodDelta: 6 });
    expect(reactionDeltas("offended")).toEqual({ relDelta: -5, moodDelta: -6 });
    expect(reactionDeltas("neutral", { agreeableness: 90, neuroticism: 90 })).toEqual({
      relDelta: 0,
      moodDelta: 0,
    });
  });

  it("scales hostile buckets up for low-agreeableness receivers (x1.5 below 30)", () => {
    // offended: -5 * 1.5 = -7.5 -> rounds away from zero to -8 -> clamped to -5
    expect(reactionDeltas("offended", { agreeableness: 20 }).relDelta).toBe(-REL_DELTA_LIMIT);
    // annoyed: -2 * 1.5 = -3 (within the limit)
    expect(reactionDeltas("annoyed", { agreeableness: 20 }).relDelta).toBe(-3);
    // warm buckets are NOT scaled by low agreeableness
    expect(reactionDeltas("delighted", { agreeableness: 20 }).relDelta).toBe(5);
    expect(reactionDeltas("pleased", { agreeableness: 20 }).relDelta).toBe(2);
  });

  it("scales warm buckets up for high-agreeableness receivers (x1.2 above 70)", () => {
    // delighted: 5 * 1.2 = 6 -> clamped to +5 (ADR scenario 4: never above +5)
    expect(reactionDeltas("delighted", { agreeableness: 80 }).relDelta).toBe(REL_DELTA_LIMIT);
    // pleased: 2 * 1.2 = 2.4 -> rounds to 2
    expect(reactionDeltas("pleased", { agreeableness: 80 }).relDelta).toBe(2);
    // hostile buckets are NOT scaled by high agreeableness
    expect(reactionDeltas("offended", { agreeableness: 80 }).relDelta).toBe(-5);
    expect(reactionDeltas("annoyed", { agreeableness: 80 }).relDelta).toBe(-2);
  });

  it("treats the 30 and 70 boundaries as unscaled (dead zone)", () => {
    expect(reactionDeltas("offended", { agreeableness: 30 }).relDelta).toBe(-5);
    expect(reactionDeltas("delighted", { agreeableness: 70 }).relDelta).toBe(5);
  });

  it("scales the mood delta by neuroticism, clamped to +-8", () => {
    expect(MOOD_DELTA_LIMIT).toBe(8);
    // offended: -6 * 1.25 = -7.5 -> rounds away from zero to -8
    expect(reactionDeltas("offended", { neuroticism: 80 }).moodDelta).toBe(-8);
    // delighted: 6 * 1.25 = 7.5 -> 8
    expect(reactionDeltas("delighted", { neuroticism: 80 }).moodDelta).toBe(8);
    // low neuroticism mutes the swing: -6 * 0.75 = -4.5 -> -5
    expect(reactionDeltas("offended", { neuroticism: 20 }).moodDelta).toBe(-5);
    // agreeableness must not leak into the mood delta
    expect(reactionDeltas("offended", { agreeableness: 20 }).moodDelta).toBe(-6);
  });

  it("treats non-finite traits as the neutral default", () => {
    expect(reactionDeltas("offended", { agreeableness: Number.NaN }).relDelta).toBe(-5);
    expect(reactionDeltas("offended", { neuroticism: Number.NaN }).moodDelta).toBe(-6);
  });
});

describe("witness deltas (capped at +-2)", () => {
  it("caps magnitude at 2 and preserves sign", () => {
    expect(WITNESS_DELTA_CAP).toBe(2);
    expect(capWitnessDelta(10)).toBe(2);
    expect(capWitnessDelta(-10)).toBe(-2);
    expect(capWitnessDelta(2)).toBe(2);
    expect(capWitnessDelta(1.5)).toBe(1.5);
    expect(capWitnessDelta(0)).toBe(0);
    expect(capWitnessDelta(Number.NaN)).toBe(0);
  });

  it("maps each bucket to a half-strength witness delta within the cap", () => {
    expect(witnessDeltaForBucket("delighted")).toBe(2); // 5/2 = 2.5 -> 3 -> capped 2
    expect(witnessDeltaForBucket("pleased")).toBe(1);
    expect(witnessDeltaForBucket("neutral")).toBe(0);
    expect(witnessDeltaForBucket("annoyed")).toBe(-1);
    expect(witnessDeltaForBucket("offended")).toBe(-2); // -5/2 = -2.5 -> -3 -> capped -2
  });

  it("applies the capped delta to the matrix with clamping and immutability", () => {
    const matrix = { "ania|zosia": 50, "burek|janusz": 1 };
    const next = applyWitnessDelta(matrix, ["zosia", "ania"], -10);
    expect(next["ania|zosia"]).toBe(48);
    // capped -2 on a value of 1 clamps at 0, never negative
    const clamped = applyWitnessDelta(matrix, ["janusz", "burek"], -10);
    expect(clamped["burek|janusz"]).toBe(0);
    // input untouched
    expect(matrix["ania|zosia"]).toBe(50);
  });
});

describe("applyReaction (one aggregated, clamped transaction)", () => {
  it("clamps at the 0/100 bounds", () => {
    const high = applyReaction({ "marek|zosia": 99 }, ["marek", "zosia"], "delighted");
    expect(high["marek|zosia"]).toBe(100);
    const low = applyReaction({ "marek|zosia": 1 }, ["zosia", "marek"], "offended");
    expect(low["marek|zosia"]).toBe(0);
  });

  it("lazy-fills a missing pair at the default and applies the delta", () => {
    const next = applyReaction({}, ["marek", "zosia"], "pleased");
    expect(next["marek|zosia"]).toBe(DEFAULT_RELATIONSHIP + 2);
  });

  it("aggregates the authored delta and the judged bucket into ONE clamped write", () => {
    const next = applyReaction({ "marek|zosia": 50 }, ["zosia", "marek"], "pleased", {
      authoredRelDelta: 3,
    });
    expect(next["marek|zosia"]).toBe(55); // 50 + 3 + 2, not two sequential clamps
    // even a large authored effect cannot exceed +100 total (clamped once)
    const maxed = applyReaction({ "marek|zosia": 90 }, ["marek", "zosia"], "delighted", {
      authoredRelDelta: 50,
    });
    expect(maxed["marek|zosia"]).toBe(100);
  });

  it("ignores the transaction on a self-pair", () => {
    const matrix = { "zosia|zosia": 50 };
    expect(applyReaction(matrix, ["zosia", "zosia"], "delighted")).toBe(matrix);
  });

  it("is a no-op (same reference) when nothing changes", () => {
    const matrix = { "marek|zosia": 50 };
    expect(applyReaction(matrix, ["marek", "zosia"], "neutral")).toBe(matrix);
  });

  it("applies witness deltas per witness entry, aggregated per pair", () => {
    const next = applyReaction({}, ["marek", "zosia"], "offended", {
      witnesses: [
        { pair: ["zosia", "ania"], delta: -10 }, // capped to -2
        { pair: ["zosia", "ania"], delta: -1 }, // second witness entry on the same pair
      ],
    });
    expect(next["marek|zosia"]).toBe(45);
    expect(next["ania|zosia"]).toBe(47); // 50 - 2 - 1
  });

  it("never mutates the input matrix", () => {
    const matrix = { "marek|zosia": 50 };
    const snapshot = { ...matrix };
    applyReaction(matrix, ["marek", "zosia"], "delighted", {
      witnesses: [{ pair: ["ania", "marek"], delta: 2 }],
    });
    expect(matrix).toEqual(snapshot);
  });
});

describe("band (deadband helper)", () => {
  it("splits hostile / neutral / warm at 35 and 65 (exclusive)", () => {
    expect(band(0)).toBe("hostile");
    expect(band(34)).toBe("hostile");
    expect(band(34.99)).toBe("hostile");
    expect(band(35)).toBe("neutral");
    expect(band(50)).toBe("neutral");
    expect(band(65)).toBe("neutral");
    expect(band(65.01)).toBe("warm");
    expect(band(100)).toBe("warm");
  });
});

describe("regressNightly (D-50: 10% pull toward the archetype seed)", () => {
  it("pulls each pair 10% toward its seed", () => {
    const next = regressNightly({ "marek|zosia": 100 }, { "marek|zosia": 50 });
    expect(next["marek|zosia"]).toBe(95);
  });

  it("uses the default seed (50) for pairs without an authored seed", () => {
    const next = regressNightly({ "ania|marek": 90 }, {});
    expect(next["ania|marek"]).toBeCloseTo(86, 10);
  });

  it("honours a custom rate; rate 1 snaps to the seed, rate 0 is a no-op", () => {
    const matrix = { "marek|zosia": 100 };
    expect(regressNightly(matrix, { "marek|zosia": 40 }, 0.5)["marek|zosia"]).toBe(70);
    expect(regressNightly(matrix, { "marek|zosia": 40 }, 1)["marek|zosia"]).toBe(40);
    expect(regressNightly(matrix, { "marek|zosia": 40 }, 0)).toBe(matrix);
  });

  it("does not invent pairs and returns the same reference when nothing moves", () => {
    const matrix = { "marek|zosia": 50 };
    const next = regressNightly(matrix, { "marek|zosia": 50 });
    expect(next).toBe(matrix);
    expect(Object.keys(regressNightly({}, { "marek|zosia": 50 }))).toEqual([]);
  });

  it("never mutates the input matrix", () => {
    const matrix = { "marek|zosia": 100 };
    regressNightly(matrix, { "marek|zosia": 50 });
    expect(matrix["marek|zosia"]).toBe(100);
  });
});

describe("seedMissingPairs (lazy fill)", () => {
  it("fills only missing pairs from the seeds, preserving existing values", () => {
    const seeds = { "ania|marek": 40, "marek|zosia": 55 };
    const existing = { "ania|marek": 70 };
    const next = seedMissingPairs(existing, seeds, ["ania|marek", "marek|zosia", "burek|zosia"]);
    expect(next["ania|marek"]).toBe(70); // preserved, NOT re-seeded
    expect(next["marek|zosia"]).toBe(55); // seeded
    expect(next["burek|zosia"]).toBe(DEFAULT_RELATIONSHIP); // unspecified -> 50
  });

  it("seeds everything when starting empty", () => {
    const next = seedMissingPairs(undefined, { "marek|zosia": 55 }, ["marek|zosia", "ania|marek"]);
    expect(next).toEqual({ "ania|marek": 50, "marek|zosia": 55 });
  });
});

describe("decayMood (bounded exponential toward the authored baseline)", () => {
  const baseline = { valence: 10, energy: 60 };

  it("decays exponentially per in-game hour (rate 0.5)", () => {
    const next = decayMood({ valence: -50, energy: 20 }, baseline, 1);
    // 10 + (-60) * e^(-0.5) = -26.39184 (independent constant, not mirrored code)
    expect(next.valence).toBeCloseTo(-26.39184, 4);
    expect(next.energy).toBeCloseTo(60 - 40 * Math.exp(-0.5), 10);
  });

  it("returns the mood to the baseline in finite time (AC-17)", () => {
    const next = decayMood({ valence: -50, energy: 20 }, baseline, 10);
    // deviation after 10h is < 0.5 -> snaps to the baseline exactly
    expect(next).toEqual({ valence: 10, energy: 60 });
  });

  it("leaves an already-baseline mood alone (same reference)", () => {
    const mood = { valence: 10, energy: 60 };
    expect(decayMood(mood, baseline, 3)).toBe(mood);
  });

  it("treats a non-positive or non-finite dt as no change", () => {
    const mood = { valence: -50, energy: 20 };
    expect(decayMood(mood, baseline, 0)).toEqual(mood);
    expect(decayMood(mood, baseline, -1)).toEqual(mood);
    expect(decayMood(mood, baseline, Number.NaN)).toEqual(mood);
  });

  it("clamps valence to [-100, 100] and energy to [0, 100]", () => {
    const next = decayMood({ valence: -150, energy: 200 }, baseline, 0.5);
    expect(next.valence).toBeGreaterThanOrEqual(-100);
    expect(next.energy).toBeLessThanOrEqual(100);
  });
});

describe("decayNeeds", () => {
  it("decays caffeine by 8/h and social by 6/h, floored at 0", () => {
    expect(decayNeeds({ caffeine: 100, social: 100 }, 2)).toEqual({ caffeine: 84, social: 88 });
    expect(decayNeeds({ caffeine: 100, social: 100 }, 25)).toEqual({ caffeine: 0, social: 0 });
  });

  it("treats a non-positive or non-finite dt as no change and never mutates", () => {
    const needs = { caffeine: 50, social: 50 };
    expect(decayNeeds(needs, 0)).toEqual(needs);
    expect(decayNeeds(needs, Number.NaN)).toEqual(needs);
    const before = { ...needs };
    decayNeeds(needs, 5);
    expect(needs).toEqual(before);
  });
});

describe("createSeededRng (deterministic simulation source)", () => {
  it("produces the same sequence for the same seed", () => {
    const a = createSeededRng(42);
    const b = createSeededRng(42);
    const seqA = [a(), a(), a(), a(), a()];
    const seqB = [b(), b(), b(), b(), b()];
    expect(seqA).toEqual(seqB);
  });

  it("produces values in [0, 1) and diverges for different seeds", () => {
    const a = createSeededRng(42);
    const seq = [a(), a(), a(), a(), a()];
    expect(seq.every((v) => v >= 0 && v < 1)).toBe(true);
    expect(createSeededRng(43)()).not.toBe(seq[0]!);
  });
});

describe("detectImbalancedTriads (shadow-only fact)", () => {
  it("flags the hand-built imbalanced triangle (two warm edges + one hostile)", () => {
    // ania <-> marek warm, marek <-> przemek warm, ania <-> przemek hostile:
    // friend-of-my-friend-is-my-enemy violation.
    const matrix = { "ania|marek": 90, "marek|przemek": 90, "ania|przemek": 10 };
    const triads = detectImbalancedTriads(matrix);
    expect(triads).toEqual([{ a: "ania", b: "marek", c: "przemek", tension: 71 }]);
  });

  it("ignores structurally balanced triangles", () => {
    // all warm: balanced
    expect(detectImbalancedTriads({ "ania|marek": 90, "marek|przemek": 90, "ania|przemek": 90 })).toEqual([]);
    // one warm + two hostile: enemy-of-my-enemy is my friend -> balanced
    expect(detectImbalancedTriads({ "ania|marek": 90, "marek|przemek": 10, "ania|przemek": 10 })).toEqual([]);
  });

  it("counts only non-neutral edges and skips incomplete triangles", () => {
    // 50 is inside the neutral deadband: the triangle is not evaluated
    expect(detectImbalancedTriads({ "ania|marek": 90, "marek|przemek": 90, "ania|przemek": 50 })).toEqual([]);
    // a missing edge means incomplete data, not imbalance
    expect(detectImbalancedTriads({ "ania|marek": 90, "marek|przemek": 90 })).toEqual([]);
  });

  it("flags the all-hostile triangle as imbalanced", () => {
    const triads = detectImbalancedTriads({ "ania|marek": 10, "marek|przemek": 10, "ania|przemek": 10 });
    expect(triads).toHaveLength(1);
    expect(triads[0]).toMatchObject({ a: "ania", b: "marek", c: "przemek" });
    expect(triads[0]!.tension).toBeGreaterThan(0);
  });

  it("scores tension from edge extremity with band boundaries contributing ~0", () => {
    // 66 / 66 / 34: just past the deadband -> tiny tension (round(100 * 1/35) = 3)
    const triads = detectImbalancedTriads({ "ania|marek": 66, "marek|przemek": 66, "ania|przemek": 34 });
    expect(triads).toEqual([{ a: "ania", b: "marek", c: "przemek", tension: 3 }]);
  });

  it("sorts output by descending tension (deterministic)", () => {
    const matrix = {
      "ania|marek": 90, // warm
      "marek|przemek": 90, // warm
      "ania|przemek": 10, // hostile  -> triad A (tension 71)
      "burek|marek": 70, // warm
      "burek|przemek": 30, // hostile -> triad with marek|przemek (tension lower)
    };
    const triads = detectImbalancedTriads(matrix);
    expect(triads.length).toBeGreaterThanOrEqual(2);
    for (let i = 1; i < triads.length; i += 1) {
      expect(triads[i - 1]!.tension).toBeGreaterThanOrEqual(triads[i]!.tension);
    }
    expect(triads[0]!.tension).toBe(71);
  });

  it("ignores malformed or reversed pair keys", () => {
    const matrix = { "marek|ania": 90, "marek|przemek": 90, "ania|przemek": 10 };
    expect(detectImbalancedTriads(matrix)).toEqual([]);
  });
});

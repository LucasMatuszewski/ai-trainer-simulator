/**
 * Pure social simulation model (ADR-0009 D-50, WS2).
 *
 * No imports from the engine or the UI. Everything here is a pure function or
 * a constant so it is trivially unit-testable and reusable from the reducer,
 * the save migration and the Jev world projector.
 *
 * Model summary:
 * - NPC<->NPC relationships live in a 105-pair matrix keyed "<a>|<b>" with
 *   a < b. Player<->NPC values stay in `GameState.npcRelationships` (one
 *   authority per pair; ADR-0009 §4).
 * - A judged social reaction is a Choice over authored BUCKETS (never a raw
 *   number across the model boundary, D-45); this module owns the single
 *   bucket -> (relDelta, moodDelta) mapping table and its trait scaling.
 * - One action = ONE aggregated relationship transaction (authored effect +
 *   judged reaction summed, then clamped once; AC-16, max +-5).
 * - Witness deltas are capped at +-2 (D-50).
 * - Stability: nightly 10% regression toward the archetype seed keeps the
 *   distribution off the 0/100 clamps (AC-19b); mood decays exponentially to
 *   the authored baseline in finite time (AC-17); needs decay over the day.
 *
 * Scaling formulas (authored here so tests and reviewers can pin them):
 * - Relationship delta scaling by the RECEIVING NPC's agreeableness (0-100):
 *     hostile buckets (annoyed, offended): factor = A < 30 ? 1.5 : 1.0
 *     warm buckets    (pleased, delighted): factor = A > 70 ? 1.2 : 1.0
 *     neutral: always 0.
 *   The scaled delta is rounded half-away-from-zero, then clamped to +-5.
 *   A low-agreeableness NPC does not enjoy kindness extra (only hostility
 *   cuts deeper); a high-agreeableness NPC is not extra-hurt (only warmth
 *   lands harder). Boundaries 30/70 are unscaled (dead zone).
 * - Mood delta scaling by the RECEIVING NPC's neuroticism (0-100):
 *     factor = N > 70 ? 1.25 : N < 30 ? 0.75 : 1.0
 *   rounded half-away-from-zero, clamped to +-8. Agreeableness never leaks
 *   into the mood delta; neuroticism is the wired mood-volatility trait
 *   (ADR-0009 §4).
 */

import type { NpcId } from "../types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Normalized pair key: "<a>|<b>" with a < b (lexicographic). */
export type SocialPairKey = string;

/** An (unordered) NPC pair as authored at call sites; normalized internally. */
export type NpcPair = readonly [string, string];

/** Mood per NPC. valence -100..100, energy 0..100. */
export interface Mood {
  valence: number;
  energy: number;
}

/** Per-NPC needs (runtime-only, never saved; ADR-0009 §4). 0..100. */
export interface NpcNeeds {
  caffeine: number;
  social: number;
}

/** The authored reaction buckets a Jev Choice may return (D-45). */
export type ReactionBucket = "offended" | "annoyed" | "neutral" | "pleased" | "delighted";

/** Record keyed by `pairKey(a, b)`; value 0..100. Missing pair = default 50. */
export type RelationshipMatrix = Record<string, number>;

/** Relationship deadband (D-50): hostile < 35, neutral 35-65, warm > 65. */
export type RelBand = "hostile" | "neutral" | "warm";

/**
 * Social simulation state persisted in save schema v2 (D-51). Kept here so
 * types.ts can import it without introducing a runtime dependency.
 */
export interface SocialState {
  relationships: RelationshipMatrix;
  mood: Record<NpcId, Mood>;
  /** Version of the authored profile table this state was seeded from. */
  profilesVersion: number;
  /** Pair keys moved by at least one delta; re-seeding skips them. */
  touched?: string[];
}

/** A triad with structural-balance tension (shadow-only projection fact). */
export interface ImbalancedTriad {
  a: string;
  b: string;
  c: string;
  /** 0-100; 0 would mean the triad only barely left the deadband. */
  tension: number;
}

export interface ReactionDeltas {
  relDelta: number;
  moodDelta: number;
}

export interface ReactionOptions {
  /** Authored content effect folded into the same clamped write (D-50). */
  authoredRelDelta?: number;
  /** Agreeableness (0-100) of the receiving NPC. Default 50 (no scaling). */
  agreeableness?: number;
  /**
   * Witness entries: each is capped to +-2 and aggregated per pair into the
   * same transaction. `delta` carries direction+strength as computed by the
   * caller; this module enforces only the cap.
   */
  witnesses?: ReadonlyArray<{ pair: NpcPair; delta: number }>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default relationship value and default archetype seed. */
export const DEFAULT_RELATIONSHIP = 50;

/** Deadband thresholds (D-50; hostile < 35, warm > 65). */
export const REL_HOSTILE_THRESHOLD = 35;
export const REL_WARM_THRESHOLD = 65;

/** AC-16: one judged action moves a relationship by at most +-5. */
export const REL_DELTA_LIMIT = 5;
/** Mood swings are felt harder than they move relationships; bounded at +-8. */
export const MOOD_DELTA_LIMIT = 8;

/** D-50: witnessed actions move a witness pair by at most +-2. */
export const WITNESS_DELTA_CAP = 2;

/** Mood decay rate per in-game hour (e^-0.5 per hour -> baseline within a day). */
export const MOOD_DECAY_PER_HOUR = 0.5;

/** Needs decay per in-game hour; reset daily by the day-start flow. */
export const NEEDS_DECAY_PER_HOUR: NpcNeeds = { caffeine: 8, social: 6 };

/**
 * The single bucket -> delta mapping table (D-45/D-50). relDelta is scaled by
 * agreeableness (see module header), moodDelta by neuroticism.
 */
export const BUCKET_DELTAS: Record<ReactionBucket, ReactionDeltas> = {
  delighted: { relDelta: 5, moodDelta: 6 },
  pleased: { relDelta: 2, moodDelta: 3 },
  neutral: { relDelta: 0, moodDelta: 0 },
  annoyed: { relDelta: -2, moodDelta: -3 },
  offended: { relDelta: -5, moodDelta: -6 },
};

const HOSTILE_BUCKETS: ReadonlySet<ReactionBucket> = new Set(["annoyed", "offended"]);
const WARM_BUCKETS: ReadonlySet<ReactionBucket> = new Set(["pleased", "delighted"]);

// ---------------------------------------------------------------------------
// Pair keys
// ---------------------------------------------------------------------------

/** Normalizes an unordered pair into the canonical "<a>|<b>" key (a < b). */
export function pairKey(a: string, b: string): SocialPairKey {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

/**
 * Parses a canonical pair key back into its ordered ids. Returns null for
 * malformed or non-canonical keys (wrong order, wrong shape), so hand-built
 * or corrupted matrices can never smuggle in phantom pairs.
 */
export function parsePairKey(key: string): NpcPair | null {
  const parts = key.split("|");
  if (parts.length !== 2) return null;
  const [a, b] = parts as [string, string];
  if (!a || !b || a >= b) return null;
  return [a, b];
}

/** Rounds half away from zero so symmetric deltas behave symmetrically. */
export function roundHalfAwayFromZero(x: number): number {
  return x < 0 ? -Math.round(-x) : Math.round(x);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function finiteOr(value: number, fallback: number): number {
  return Number.isFinite(value) ? value : fallback;
}

// ---------------------------------------------------------------------------
// Reactions
// ---------------------------------------------------------------------------

/**
 * Bucket -> scaled, clamped deltas for one receiving NPC. Pure; used by
 * `applyReaction` (relationship side) and by the reducer (mood side).
 */
export function reactionDeltas(
  bucket: ReactionBucket,
  opts?: { agreeableness?: number; neuroticism?: number },
): ReactionDeltas {
  const base = BUCKET_DELTAS[bucket] ?? BUCKET_DELTAS.neutral;
  const agreeableness = clamp(finiteOr(opts?.agreeableness ?? 50, 50), 0, 100);
  const neuroticism = clamp(finiteOr(opts?.neuroticism ?? 50, 50), 0, 100);

  let relFactor = 1;
  if (HOSTILE_BUCKETS.has(bucket) && agreeableness < 30) relFactor = 1.5;
  if (WARM_BUCKETS.has(bucket) && agreeableness > 70) relFactor = 1.2;

  let moodFactor = 1;
  if (neuroticism > 70) moodFactor = 1.25;
  else if (neuroticism < 30) moodFactor = 0.75;

  return {
    relDelta: clamp(
      roundHalfAwayFromZero(base.relDelta * relFactor),
      -REL_DELTA_LIMIT,
      REL_DELTA_LIMIT,
    ),
    moodDelta: clamp(
      roundHalfAwayFromZero(base.moodDelta * moodFactor),
      -MOOD_DELTA_LIMIT,
      MOOD_DELTA_LIMIT,
    ),
  };
}

/**
 * Witness reaction for a bucket: half the relationship delta, capped at +-2
 * (D-50). Used by the reducer for `apply-social-reaction { witnessOf }`.
 */
export function witnessDeltaForBucket(bucket: ReactionBucket): number {
  const half = roundHalfAwayFromZero(BUCKET_DELTAS[bucket].relDelta / 2);
  return clamp(half, -WITNESS_DELTA_CAP, WITNESS_DELTA_CAP);
}

/** Applies a map of pairKey -> total delta as one clamped write per pair. */
function applyAggregated(
  matrix: RelationshipMatrix,
  deltas: Map<string, number>,
): RelationshipMatrix {
  let changed = false;
  const next: RelationshipMatrix = { ...matrix };
  for (const [key, delta] of deltas) {
    if (delta === 0) continue;
    const current = next[key] ?? DEFAULT_RELATIONSHIP;
    const updated = clamp(current + delta, 0, 100);
    if (updated === current) continue;
    next[key] = updated;
    changed = true;
  }
  return changed ? next : matrix;
}

/**
 * Applies one social reaction as a SINGLE aggregated transaction:
 * authoredRelDelta + scaled bucket delta (+ capped witness deltas) are summed
 * per pair, then clamped 0-100 once. Immutable; returns the SAME reference
 * when nothing changed (so the store's no-op detection keeps working).
 * Self-pairs and malformed input are ignored.
 */
export function applyReaction(
  matrix: RelationshipMatrix,
  pair: NpcPair,
  bucket: ReactionBucket,
  opts?: ReactionOptions,
): RelationshipMatrix {
  const [a, b] = pair;
  if (!a || !b || a === b) return matrix;
  const deltas = new Map<string, number>();
  const key = pairKey(a, b);

  const { relDelta } = reactionDeltas(bucket, { agreeableness: opts?.agreeableness });
  const authored = finiteOr(opts?.authoredRelDelta ?? 0, 0);
  const total = relDelta + authored;
  if (total !== 0) deltas.set(key, total);

  if (opts?.witnesses) {
    for (const witness of opts.witnesses) {
      const [wa, wb] = witness.pair;
      if (!wa || !wb || wa === wb) continue;
      const witnessKey = pairKey(wa, wb);
      const capped = capWitnessDelta(witness.delta);
      if (capped === 0) continue;
      deltas.set(witnessKey, (deltas.get(witnessKey) ?? 0) + capped);
    }
  }

  return applyAggregated(matrix, deltas);
}

/**
 * Applies a single witness delta, capped at +-2 and clamped 0-100. Immutable;
 * returns the same reference when nothing changed. Self-pairs are ignored.
 */
export function applyWitnessDelta(
  matrix: RelationshipMatrix,
  pair: NpcPair,
  delta: number,
): RelationshipMatrix {
  const [a, b] = pair;
  if (!a || !b || a === b) return matrix;
  const capped = capWitnessDelta(delta);
  if (capped === 0) return matrix;
  const deltas = new Map<string, number>([[pairKey(a, b), capped]]);
  return applyAggregated(matrix, deltas);
}

/** Caps a witness delta at +-2; non-finite deltas count as 0. */
export function capWitnessDelta(delta: number): number {
  if (!Number.isFinite(delta)) return 0;
  return clamp(delta, -WITNESS_DELTA_CAP, WITNESS_DELTA_CAP);
}

// ---------------------------------------------------------------------------
// Stability rules (D-50)
// ---------------------------------------------------------------------------

/** Relationship deadband: hostile < 35, neutral 35-65, warm > 65. */
export function band(value: number): RelBand {
  if (value < REL_HOSTILE_THRESHOLD) return "hostile";
  if (value > REL_WARM_THRESHOLD) return "warm";
  return "neutral";
}

/**
 * Nightly regression: pulls every EXISTING pair `rate` of the way toward its
 * archetype seed (missing seed = DEFAULT_RELATIONSHIP). Never invents pairs;
 * immutable; same reference when nothing moves. Rate is clamped to [0, 1].
 */
export function regressNightly(
  matrix: RelationshipMatrix,
  seeds: Record<string, number>,
  rate = 0.1,
): RelationshipMatrix {
  const r = clamp(finiteOr(rate, 0.1), 0, 1);
  if (r === 0) return matrix;
  let changed = false;
  const next: RelationshipMatrix = { ...matrix };
  for (const key of Object.keys(matrix)) {
    const value = matrix[key]!;
    const seed = finiteOr(seeds[key] ?? DEFAULT_RELATIONSHIP, DEFAULT_RELATIONSHIP);
    const target = clamp(value + (seed - value) * r, 0, 100);
    const rounded = Math.round(target * 100) / 100;
    if (rounded === value) continue;
    next[key] = rounded;
    changed = true;
  }
  return changed ? next : matrix;
}

/**
 * Lazy pair fill: keeps every existing value, adds every pair from
 * `allKeys` that is missing, seeded from `seeds` (missing seed =
 * DEFAULT_RELATIONSHIP). Used on load (D-51) and to build fresh matrices.
 */
export function seedMissingPairs(
  existing?: RelationshipMatrix | null,
  seeds: Record<string, number> = {},
  allKeys?: Iterable<string>,
): RelationshipMatrix {
  const next: RelationshipMatrix = { ...(existing ?? {}) };
  const universe = allKeys ?? Object.keys(seeds);
  for (const key of universe) {
    if (next[key] !== undefined) continue;
    const seed = finiteOr(seeds[key] ?? DEFAULT_RELATIONSHIP, DEFAULT_RELATIONSHIP);
    next[key] = clamp(seed, 0, 100);
  }
  return next;
}

// ---------------------------------------------------------------------------
// Mood and needs
// ---------------------------------------------------------------------------

/**
 * Bounded exponential decay toward the authored baseline, per in-game hour:
 *   next = baseline + (value - baseline) * e^(-rate * dt)
 * Deviations smaller than 0.5 snap to the baseline, so mood returns in finite
 * time (AC-17) instead of asymptotically. Immutable; non-positive or
 * non-finite dt means no change.
 */
export function decayMood(mood: Mood, baseline: Mood, dt: number, rate = MOOD_DECAY_PER_HOUR): Mood {
  const currentValence = clamp(finiteOr(mood.valence, 0), -100, 100);
  const currentEnergy = clamp(finiteOr(mood.energy, 0), 0, 100);
  if (!Number.isFinite(dt) || dt <= 0) {
    return currentValence === mood.valence && currentEnergy === mood.energy
      ? mood
      : { valence: currentValence, energy: currentEnergy };
  }
  const factor = Math.exp(-rate * dt);

  const rawValence = baseline.valence + (currentValence - baseline.valence) * factor;
  const valence =
    Math.abs(rawValence - baseline.valence) < 0.5
      ? baseline.valence
      : clamp(rawValence, -100, 100);

  const rawEnergy = baseline.energy + (currentEnergy - baseline.energy) * factor;
  const energy =
    Math.abs(rawEnergy - baseline.energy) < 0.5 ? baseline.energy : clamp(rawEnergy, 0, 100);

  if (valence === mood.valence && energy === mood.energy) return mood;
  return { valence, energy };
}

/**
 * Linear needs decay per in-game hour, floored at 0 (and capped at 100 so a
 * daily reset or a coffee can top up). Immutable; non-positive or non-finite
 * dt means no change.
 */
export function decayNeeds(needs: NpcNeeds, dt: number): NpcNeeds {
  const caffeine = clamp(finiteOr(needs.caffeine, 0), 0, 100);
  const social = clamp(finiteOr(needs.social, 0), 0, 100);
  if (!Number.isFinite(dt) || dt <= 0) {
    return caffeine === needs.caffeine && social === needs.social
      ? needs
      : { caffeine, social };
  }
  const nextCaffeine = clamp(caffeine - NEEDS_DECAY_PER_HOUR.caffeine * dt, 0, 100);
  const nextSocial = clamp(social - NEEDS_DECAY_PER_HOUR.social * dt, 0, 100);
  if (nextCaffeine === caffeine && nextSocial === social) return needs;
  return { caffeine: nextCaffeine, social: nextSocial };
}

// ---------------------------------------------------------------------------
// Deterministic RNG (30-day stability simulation, per-day quirks)
// ---------------------------------------------------------------------------

/** mulberry32 — small, fast, deterministic; returns values in [0, 1). */
export function createSeededRng(seed: number): () => number {
  let a = Number.isFinite(seed) ? Math.floor(seed) >>> 0 : 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Triads (shadow-only projection fact — never drives events in this PoC)
// ---------------------------------------------------------------------------

/**
 * Detects structurally imbalanced triangles (Heider balance): a triad is
 * imbalanced when the product of its edge signs is negative — i.e. two warm
 * edges + one hostile ("my friend's friend is my enemy") or three hostile
 * edges ("my enemy's enemy is my enemy"). Only non-neutral edges count
 * (D-50); a triangle with a missing edge is skipped (incomplete data, not
 * imbalance).
 *
 * Tension = round(100 * mean edge extremity), where extremity is how far an
 * edge sits past its deadband threshold, normalized 0..1
 * (warm: (v-65)/35, hostile: (35-v)/35). Output is sorted by descending
 * tension, then ids, so the result is deterministic.
 */
export function detectImbalancedTriads(matrix: RelationshipMatrix): ImbalancedTriad[] {
  const edges = new Map<string, number>();
  const ids = new Set<string>();
  for (const [key, value] of Object.entries(matrix)) {
    const pair = parsePairKey(key);
    if (!pair || !Number.isFinite(value)) continue;
    edges.set(key, value);
    ids.add(pair[0]);
    ids.add(pair[1]);
  }
  const sortedIds = [...ids].sort();
  const out: ImbalancedTriad[] = [];
  for (let i = 0; i < sortedIds.length; i += 1) {
    for (let j = i + 1; j < sortedIds.length; j += 1) {
      for (let k = j + 1; k < sortedIds.length; k += 1) {
        const a = sortedIds[i]!;
        const b = sortedIds[j]!;
        const c = sortedIds[k]!;
        const va = edges.get(pairKey(a, b));
        const vb = edges.get(pairKey(a, c));
        const vc = edges.get(pairKey(b, c));
        if (va === undefined || vb === undefined || vc === undefined) continue;
        const ba = band(va);
        const bb = band(vb);
        const bc = band(vc);
        if (ba === "neutral" || bb === "neutral" || bc === "neutral") continue;
        const sign = (bn: RelBand): number => (bn === "warm" ? 1 : -1);
        const extremity = (value: number, bn: RelBand): number =>
          bn === "warm"
            ? clamp((value - REL_WARM_THRESHOLD) / (100 - REL_WARM_THRESHOLD), 0, 1)
            : clamp((REL_HOSTILE_THRESHOLD - value) / REL_HOSTILE_THRESHOLD, 0, 1);
        const product = sign(ba) * sign(bb) * sign(bc);
        if (product >= 0) continue; // balanced
        const mean = (extremity(va, ba) + extremity(vb, bb) + extremity(vc, bc)) / 3;
        out.push({ a, b, c, tension: Math.round(100 * mean) });
      }
    }
  }
  out.sort((x, y) => y.tension - x.tension || x.a.localeCompare(y.a) || x.b.localeCompare(y.b) || x.c.localeCompare(y.c));
  return out;
}

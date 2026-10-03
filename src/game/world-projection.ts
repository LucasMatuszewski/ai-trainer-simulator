/**
 * WS4 world projection (ADR-0009 D-48/D-49, PRD-jev Flow B): the PURE
 * projector that turns one world tick's worth of live state into the
 * compact, per-subject-namespaced slice the Jev decision client judges.
 *
 * Design rules pinned here (see tests/unit/game/world-projection.test.ts):
 *
 *  - Per-subject namespacing (D-49, context-rot defense): every NPC's
 *    facts live in `npcs.<id>`, every chatting pair's facts in
 *    `pairs.<a>_<b>`. A question references only its own subtree — the
 *    model never has to wade through another subject's context.
 *  - No raw arithmetic is left for the model: the projector PRE-COMPUTES
 *    every fact into a named value. Live positions become a named room;
 *    pair distances become an adjacent/nearby/far band. The model reads,
 *    it never computes.
 *  - Allowlist discipline (D-59 spirit): only fictional actor ids and
 *    authored name/role strings, a room name, a distance band, a
 *    relationship band and today's fired event slugs cross the boundary.
 *    Player text never enters a projection.
 *  - Purity: no three.js, no DOM, no clock. Same input in, equal output
 *    out; the caller's arrays are copied, never mutated.
 *
 * The engine-side scheduler that builds this projection once per tick is
 * `src/engine/world-tick.ts` (single request per tick, D-48).
 */

import { CHATTER_RADIUS } from "../engine/chatter";

/** One judged NPC: authored identity plus the named place fact. */
export interface ProjectionNpcFact {
  /** Stable fictional actor id (D-59) — never player-entered text. */
  id: string;
  name: string;
  role: string;
  /**
   * Live position. Consumed by the CALLER (pairing, distances) before
   * projection; deliberately NOT projected raw — the room name below is
   * the fact the model gets.
   */
  position?: { x: number; z: number };
  /** Pre-classified room (`roomAt`), e.g. "main-office". Omit if unknown. */
  room?: string;
}

/** One judged chatting pair with the raw distance the projector bands. */
export interface ProjectionPairFact {
  a: string;
  b: string;
  /** Metres apart; projected as a named band, never as a float. */
  distance: number;
}

export interface WorldTickProjectionInput {
  day: number;
  period: string;
  npcRoster: readonly ProjectionNpcFact[];
  /** Chatting pairs currently eligible (already radius/cooldown filtered). */
  pairs: readonly ProjectionPairFact[];
  /** Today's fired random-event slugs (allowlisted content ids). */
  events: readonly string[];
  /**
   * Pre-computed relationship band per pair, keyed by
   * `pairProjectionKey(a, b)` (e.g. "bartek_grazyna" -> "friend").
   */
  relationshipBands?: Readonly<Record<string, string>>;
}

/**
 * The projection payload: the two known top-level facts plus one
 * namespaced subtree per subject (`npcs.<id>` / `pairs.<a>_<b>`).
 */
export interface WorldTickProjection {
  world: { day: number; period: string };
  events: readonly string[];
  [subject: string]: unknown;
}

/** Stable, order-independent projection key for a pair (sorted "a_b"). */
export function pairProjectionKey(a: string, b: string): string {
  return a < b ? `${a}_${b}` : `${b}_${a}`;
}

export type DistanceBand = "adjacent" | "nearby" | "far";

/** Desks-next-to-each-other vs across-the-room. CHATTER_RADIUS is the
 *  chat-eligibility ceiling the pair provider already enforces; "far"
 *  is defensive (a pair beyond the radius should never be projected). */
export function distanceBand(distance: number): DistanceBand {
  if (!Number.isFinite(distance)) return "far";
  if (distance < 2.5) return "adjacent";
  if (distance <= CHATTER_RADIUS) return "nearby";
  return "far";
}

/** Build one tick's projection. Pure; see the module doc for the rules. */
export function buildWorldTickProjection(
  input: WorldTickProjectionInput,
): WorldTickProjection {
  const projection: WorldTickProjection = {
    world: { day: input.day, period: input.period },
    events: [...input.events],
  };
  for (const npc of input.npcRoster) {
    projection[`npcs.${npc.id}`] = {
      id: npc.id,
      name: npc.name,
      role: npc.role,
      ...(npc.room !== undefined ? { room: npc.room } : {}),
    };
  }
  for (const pair of input.pairs) {
    const key = pairProjectionKey(pair.a, pair.b);
    const band = input.relationshipBands?.[key];
    projection[`pairs.${key}`] = {
      a: pair.a,
      b: pair.b,
      distance: distanceBand(pair.distance),
      ...(band !== undefined ? { relationshipBand: band } : {}),
    };
  }
  return projection;
}

/**
 * Pure helpers for the rotating NPC conversation system (PRD C-46).
 *
 * The old bubble block picked THE nearest pair every second and
 * always let the pair's first member speak, so one NPC visibly talked
 * all the time. C-46 replaces that with short two-turn exchanges
 * between RANDOM nearby pairs:
 *
 *  - every candidate pair within CHATTER_RADIUS is eligible (picked
 *    uniformly at random, not always-nearest);
 *  - a pair that just talked goes on a cooldown so the NEXT
 *    conversation is a different pair;
 *  - who STARTS is a chattiness-weighted roll (TALKATIVE_WEIGHTS);
 *  - up to MAX_CONVERSATIONS exchanges may run at once, but never
 *    two in the same room;
 *  - the pool is time-gated: lunch lines during the lunch window,
 *    work lines otherwise (decided by the caller's `isLunchActive`).
 *
 * Everything here is pure and unit-tested; the imperative state
 * (active conversations, cooldown clocks) lives in npc-controller.ts.
 */

import { chatterWeightFor, type ChatterExchange } from "../content/office-chatter";

export type RoomId =
  | "main-office"
  | "kitchen"
  | "meeting"
  | "toilet"
  | "training"
  | "ceo"
  | "corridor";

/** Max distance between two NPCs for a conversation to fire. */
export const CHATTER_RADIUS = 2.5;

/** Seconds between the starter bubble and the partner's response. */
export const RESPONSE_DELAY_S = 2.2;

/** Seconds a finished pair waits before it may talk again. */
export const PAIR_COOLDOWN_S = 40;

/** Max simultaneous conversations (C-46: "allow 2 pairs talking"). */
export const MAX_CONVERSATIONS = 2;

/**
 * Classify a world position into a room, matching the floor AABBs in
 * `src/content/world-layout.ts` (training x [19,27] z [-19,-3]; CEO
 * office x [-8,8] z [-19,-9]; kitchen x [9,19] z [-7,7]; toilet
 * x [-19,-6.5] z [9,19]; meeting x [-6,6] z [9,19]; the main office
 * fills the rest of the central block; anything else is corridor).
 */
export function roomAt(x: number, z: number): RoomId {
  if (x >= 19 && z <= -3) return "training";
  if (z <= -9) return "ceo";
  if (x >= 9 && z >= -7 && z <= 7) return "kitchen";
  if (z >= 9) return x <= -6.5 ? "toilet" : "meeting";
  return "main-office";
}

export interface ChatterCandidate {
  id: string;
  x: number;
  z: number;
  room: RoomId;
}

export interface ChatterPair {
  a: string;
  b: string;
  room: RoomId;
  distance: number;
}

/** Stable, order-independent key for a pair (used for cooldowns). */
export function pairKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

/**
 * All candidate pairs within `radius`, excluding:
 *  - pairs whose cooldown has not elapsed yet (cooldowns[pairKey] > now),
 *  - pairs in a room that already hosts a conversation (activeRooms).
 */
export function candidatePairs(
  candidates: readonly ChatterCandidate[],
  radius: number,
  options: {
    cooldowns: ReadonlyMap<string, number>;
    now: number;
    activeRooms: ReadonlySet<RoomId>;
  },
): ChatterPair[] {
  const pairs: ChatterPair[] = [];
  for (let first = 0; first < candidates.length; first += 1) {
    for (let second = first + 1; second < candidates.length; second += 1) {
      const a = candidates[first]!;
      const b = candidates[second]!;
      // C-46: two conversations may run at once, but never in the same
      // room. A pair straddling a doorway counts as occupying BOTH
      // rooms, so it yields to whichever room is busy.
      if (options.activeRooms.has(a.room) || options.activeRooms.has(b.room)) continue;
      const cooldownEndsAt = options.cooldowns.get(pairKey(a.id, b.id));
      if (cooldownEndsAt !== undefined && cooldownEndsAt > options.now) continue;
      const distance = Math.hypot(a.x - b.x, a.z - b.z);
      if (distance > radius) continue;
      pairs.push({ a: a.id, b: b.id, room: a.room, distance });
    }
  }
  return pairs;
}

/** Uniform random pick (C-46: not always-nearest). Returns null for
 *  an empty candidate list. */
export function pickPair<T>(pairs: readonly T[], rng: () => number): T | null {
  if (pairs.length === 0) return null;
  return pairs[Math.min(pairs.length - 1, Math.floor(rng() * pairs.length))]!;
}

/**
 * Pacing gate for STARTING an exchange: a 50% chance roll plus a
 * since-last-start interval. The FIRST conversation keeps the
 * office-wide 3-6 s rhythm; a SECOND simultaneous one may start after
 * only 1-2.5 s, so two pairs can genuinely overlap (C-46: "allow 2
 * pairs talking in the same time") - an exchange only lasts
 * RESPONSE_DELAY_S, so the full 3-6 s rhythm would make concurrency
 * mathematically impossible. Spam is still bounded by MAX_CONVERSATIONS,
 * the per-pair cooldown, and the room rule.
 */
export function shouldStartExchange(
  activeConversations: number,
  secondsSinceLastStart: number,
  rng: () => number,
): boolean {
  if (rng() >= 0.5) return false;
  const interval = activeConversations === 0
    ? 3 + rng() * 3
    : 1 + rng() * 1.5;
  return secondsSinceLastStart >= interval;
}

/**
 * Chattiness-weighted roll: who starts the exchange. The weights only
 * tilt the coin inside an already-chosen close pair, so quiet NPCs
 * still RESPOND normally - they just start fewer conversations.
 */
export function pickStarter(a: string, b: string, rng: () => number): string {
  const weightA = chatterWeightFor(a);
  const weightB = chatterWeightFor(b);
  return rng() * (weightA + weightB) < weightA ? a : b;
}

const lastExchangeByPool = new WeakMap<readonly ChatterExchange[], number>();

/** Pick an exchange from a pool without repeating the previous pick. */
export function pickExchange(
  pool: readonly ChatterExchange[],
  rng: () => number,
): ChatterExchange {
  if (pool.length === 0) throw new Error("pickExchange: empty chatter pool");
  let index = Math.min(pool.length - 1, Math.floor(rng() * pool.length));
  const previous = lastExchangeByPool.get(pool);
  if (pool.length > 1 && index === previous) index = (index + 1) % pool.length;
  lastExchangeByPool.set(pool, index);
  return pool[index]!;
}

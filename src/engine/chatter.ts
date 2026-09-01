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

import {
  SPEAKER_TOPICS,
  chatterWeightFor,
  type ChatterExchange,
  type ChatterTopic,
} from "../content/office-chatter";

export type RoomId =
  | "main-office"
  | "kitchen"
  | "meeting"
  | "toilet"
  | "training"
  | "ceo"
  | "corridor";

/** Max distance between two NPCs for a conversation to fire.
 *  C-57 (Lucas: "friends sitting on the desk next to each other should
 *  talk sometimes"): the old 2.5 m excluded every desk neighbour - the
 *  morning schedule seats desk columns with 2.5-4.5 m between adjacent
 *  seats (measured from NPC_SCHEDULES; the largest neighbour gap is
 *  4.5 m, east column ania -> grazyna). 4.6 m covers all desk pairs
 *  while the two 15.4 m-apart columns stay separate pools. Frequency
 *  is not raised: starts still fire on the 6-12 s schedule within
 *  MAX_CONVERSATIONS, so the extra eligible pairs SPLIT the same
 *  number of exchanges - everyone chats occasionally, everyone works. */
export const CHATTER_RADIUS = 4.6;

/** Seconds between the starter bubble and the partner's response.
 *  Raised 2.2 -> 3.8 on 2026-09-01 (Lucas: "response is displayed also
 *  too fast, we should delay 1-2s more, so that user manage to read
 *  first message"). The bubble lifetime in bubbles.ts is longer than
 *  this, so the starter is still on screen when the reply lands. */
export const RESPONSE_DELAY_S = 3.8;

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
 * Pacing for STARTING exchanges (C-46 amendment 2026-09-01, Lucas:
 * "sometimes too often, other time not often enough ... make it more
 * even"). The controller SCHEDULES the next start instead of rolling
 * dice every second: after a start, the next one lands 6-12 s out
 * (uniform). When a conversation is already active there is a 35%
 * chance the gap is a short 2.5-4 s instead - that is what
 * occasionally produces the C-46 "two pairs talking at once" overlap
 * (an exchange only lasts RESPONSE_DELAY_S, so only a short gap can
 * ever overlap it). With no conversation active the gap is always the
 * normal 6-12 s, which keeps the office "quite often, but not all the
 * time" and prevents bursts entirely: there are no chance rolls.
 */
export const CHATTER_GAP_MIN_S = 6;
export const CHATTER_GAP_MAX_S = 12;
export const CHATTER_OVERLAP_CHANCE = 0.35;
export const CHATTER_OVERLAP_GAP_MIN_S = 2.5;
export const CHATTER_OVERLAP_GAP_MAX_S = 4;

export function nextStartDelay(
  activeConversations: number,
  rng: () => number,
): number {
  if (activeConversations > 0 && rng() < CHATTER_OVERLAP_CHANCE) {
    const spread = CHATTER_OVERLAP_GAP_MAX_S - CHATTER_OVERLAP_GAP_MIN_S;
    return CHATTER_OVERLAP_GAP_MIN_S + rng() * spread;
  }
  const spread = CHATTER_GAP_MAX_S - CHATTER_GAP_MIN_S;
  return CHATTER_GAP_MIN_S + rng() * spread;
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

const lastExchangeByPool = new WeakMap<readonly ChatterExchange[], ChatterExchange>();

/**
 * Pick an exchange from a pool without repeating the previous pick
 * (per source pool). With a `speaker` given, the pool is first
 * filtered by the speaker's topic affinities (C-46 amendment:
 * non-tech roles do not start IT jokes; finance ones belong to
 * Grazyna/Zosia, janitor ones to Janusz) - falling back to the full
 * pool if the filter comes up empty. Responses are unrestricted.
 */
export function pickExchange(
  pool: readonly ChatterExchange[],
  rng: () => number,
  speaker?: string,
): ChatterExchange {
  if (pool.length === 0) throw new Error("pickExchange: empty chatter pool");
  // null = no speaker given (unfiltered); [] = real speaker with no
  // affinities, i.e. GENERAL-ONLY (absence in SPEAKER_TOPICS is a
  // restriction, not a free pass).
  const allowed: readonly ChatterTopic[] | null = speaker === undefined
    ? null
    : SPEAKER_TOPICS[speaker] ?? [];
  const usable = allowed === null
    ? pool
    : pool.filter((exchange) => exchange.topic === undefined || allowed.includes(exchange.topic));
  const source = usable.length > 0 ? usable : pool;

  let index = Math.min(source.length - 1, Math.floor(rng() * source.length));
  const previous = lastExchangeByPool.get(pool);
  if (source.length > 1 && previous !== undefined && source[index] === previous) {
    index = (index + 1) % source.length;
  }
  const chosen = source[index]!;
  lastExchangeByPool.set(pool, chosen);
  return chosen;
}

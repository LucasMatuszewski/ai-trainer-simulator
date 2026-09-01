/**
 * C-48 NPC-vs-NPC movement policy: pure helpers, no three.js.
 *
 * v1 used continuous lateral steering - per-frame nudges that curved
 * the walk paths into arcs, and two (or three) NPCs arcing around each
 * other read as a slow dance (Lucas playtest, 2026-09-01: "they are
 * dancing in the ring, rotating"). v2 replaced it with DISCRETE,
 * straight-line discipline, but its blocked ladder was terminal, so a
 * jammed NPC eventually gave up for good (Lucas: "if the group is big
 * some people in the middle will just stop trying to get out ... maybe
 * we just need to loop"). v3 is the same discipline with a ladder that
 * never gives up; the controller applies the policy:
 *
 *   1. STOP AT A DISTANCE - `walkBlockedAhead`: if anyone stands in
 *      the straight walk line (a capsule ahead of the NPC), the NPC
 *      does not advance at all. It stops ~1 m short, faces the
 *      blocker, and the chatter system makes a meeting of it.
 *   2. TURN IN PLACE, WALK STRAIGHT - `escapeWaypoint`: a widening fan
 *      of candidate directions (right, left, sideways, and finally
 *      straight back), rotated by the attempt index so consecutive
 *      retries lead elsewhere. The controller splices the winner into
 *      the path and retries forever while blocked. Movement is always
 *      straight segments; rotation happens in place between segments,
 *      so orbiting/dancing is impossible by construction.
 *   3. CURE - `separationCorrection`: hard minimum-distance constraint
 *      applied every frame by the controller. Overlap is impossible.
 *   4. PARK BESIDE - `arrivalClearOf`: a destination occupied by
 *      another NPC means settle on the ring around it, never stack.
 *
 * The gait freeze while blocked lives in npc-walk-cycle (amplitude).
 */

/** Minimum NPC centre-to-centre distance (Lucas: "minimal distance,
 *  small but needed"; bumped 0.7 -> 0.8 after the v1 playtest - the
 *  0.7 clusters read as "hugging"). */
export const MIN_SEPARATION = 0.8;

/** How far ahead of the walker the blocked capsule reaches: stop HERE,
 *  face the blocker, and talk - do not press up to their face. */
export const BLOCKED_LOOKAHEAD = 1.1;

/** Half-width of the walk-line capsule (NPC radius 0.3 + margin). */
export const BLOCKED_HALF_WIDTH = 0.5;

/** A walking NPC that moved less than this fraction of `speed * dt` is blocked. */
export const BLOCKED_PROGRESS_RATIO = 0.25;

/** C-48 v3 escape fan. Turn angles relative to the walk heading, in
 *  the order they are tried: own-right first, then the mirrored left,
 *  widening to sideways and behind, ending STRAIGHT BACK - Lucas:
 *  "movement in new direction, even opposite direction if needed".
 *  Positive angles turn toward the walker's own right. */
export const ESCAPE_TURNS: readonly number[] = [
  Math.PI / 3, -Math.PI / 3,
  Math.PI / 2, -Math.PI / 2,
  (2 * Math.PI) / 3, -(2 * Math.PI) / 3,
  Math.PI,
];

/** Escape step lengths, nearest first. */
export const ESCAPE_DISTANCES: readonly number[] = [1, 1.5];

/** Clearance required along an escape leg - tighter than the stop
 *  capsule, because an escape is deliberately a squeeze-out move. */
export const ESCAPE_HALF_WIDTH = 0.4;

export interface XZPoint {
  x: number;
  z: number;
}

export interface IdentifiedPoint extends XZPoint {
  id: string;
}

export interface SeparationCorrection {
  /** Unit axis pointing FROM a TOWARD b. */
  nx: number;
  nz: number;
  /** Metres of separation missing between the pair. */
  penetration: number;
}

/** True when any of `others` stands inside a capsule of `halfWidth`
 *  around the straight segment from -> to. */
export function capsuleBlocked(
  from: XZPoint,
  to: XZPoint,
  others: readonly XZPoint[],
  halfWidth: number,
): boolean {
  if (!(halfWidth > 0)) return false;
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  const length = Math.hypot(dx, dz);
  if (!(length > 1e-9)) return false;
  const unitX = dx / length;
  const unitZ = dz / length;
  for (const other of others) {
    const offsetX = other.x - from.x;
    const offsetZ = other.z - from.z;
    const along = offsetX * unitX + offsetZ * unitZ;
    const t = Math.max(0, Math.min(length, along));
    const closestX = unitX * t;
    const closestZ = unitZ * t;
    const distanceSquared = (offsetX - closestX) ** 2 + (offsetZ - closestZ) ** 2;
    if (distanceSquared < halfWidth * halfWidth) return true;
  }
  return false;
}

/** The NEAREST NPC standing in the straight walk line from `self`
 *  along (forwardX, forwardZ), within `lookahead`. Only NPCs actually
 *  in front (positive projection) count. */
function nearestBlocker<T extends XZPoint>(
  self: XZPoint,
  forwardX: number,
  forwardZ: number,
  others: readonly T[],
  lookahead: number,
  halfWidth: number,
): T | null {
  const length = Math.hypot(forwardX, forwardZ);
  if (length <= 1e-6) return null;
  const unitX = forwardX / length;
  const unitZ = forwardZ / length;
  let best: T | null = null;
  let bestAlong = Infinity;
  for (const other of others) {
    const dx = other.x - self.x;
    const dz = other.z - self.z;
    const along = dx * unitX + dz * unitZ;
    if (along <= 0.01 || along > lookahead) continue;
    if (Math.abs(dx * unitZ - dz * unitX) >= halfWidth) continue;
    if (along < bestAlong) {
      bestAlong = along;
      best = other;
    }
  }
  return best;
}

/** True when the straight walk line from `self` is occupied. */
export function walkBlockedAhead(
  self: XZPoint,
  forwardX: number,
  forwardZ: number,
  others: readonly XZPoint[],
  lookahead: number = BLOCKED_LOOKAHEAD,
  halfWidth: number = BLOCKED_HALF_WIDTH,
): boolean {
  return nearestBlocker(self, forwardX, forwardZ, others, lookahead, halfWidth) !== null;
}

/** WHO is standing in the walk line - the controller needs the id to
 *  spot a mutual standoff (I am blocked by you, you are blocked by
 *  me), which is the case that needs a tie-break rather than two
 *  identical escapes. */
export function blockerAhead(
  self: XZPoint,
  forwardX: number,
  forwardZ: number,
  others: readonly IdentifiedPoint[],
  lookahead: number = BLOCKED_LOOKAHEAD,
  halfWidth: number = BLOCKED_HALF_WIDTH,
): string | null {
  return nearestBlocker(self, forwardX, forwardZ, others, lookahead, halfWidth)?.id ?? null;
}

/**
 * Head-on tie-break: which of a blocked pair steps aside.
 *
 * Two NPCs blocking each other are a perfect mirror - identical rule,
 * identical timing - so both escape at the same instant, both come
 * back, and they oscillate in sync forever (Lucas, 2026-09-01: "they
 * loop over and over by getting back few steps, stopping, and getting
 * back again to the exact same place ... both do the same in the loop,
 * almost in sync"). Exactly ONE of the pair must move, so the rule is
 * antisymmetric by construction: `givesWayTo(a, b) !== givesWayTo(b, a)`
 * for any two distinct ids. The one that gives way steps aside; the
 * other holds still (and keeps chatting) until the lane clears.
 */
export function givesWayTo(selfId: string, otherId: string): boolean {
  return selfId.localeCompare(otherId) > 0;
}

/** Rotate (x, z) by `turn` radians; positive turns toward the walker's
 *  own right, matching `rotation.y = atan2(forwardX, forwardZ)`. */
function rotateXZ(x: number, z: number, turn: number): XZPoint {
  const cos = Math.cos(turn);
  const sin = Math.sin(turn);
  return { x: x * cos + z * sin, z: -x * sin + z * cos };
}

/**
 * C-48 v3: where a blocked walker should step next.
 *
 * Tries a widening fan of directions (ESCAPE_TURNS) at each of
 * ESCAPE_DISTANCES, rotated by `attempt` so consecutive retries lead
 * with a different direction - which also breaks the mirror symmetry
 * between two NPCs facing each other off. A candidate wins when it is
 * off furniture, has nobody within MIN_SEPARATION, and the straight
 * line to it is clear.
 *
 * If the whole fan fails - the dense-crowd middle, where every
 * direction has a neighbour - the LAST RESORT steps directly away from
 * the local crowd centroid with the line-of-travel requirement
 * dropped. Hard separation still guarantees nobody ends up overlapped,
 * so a jammed NPC always has somewhere to go and the ladder never
 * dead-ends (Lucas: "we just need to loop, at least loop on last
 * element"). Returns null only when even that lands on furniture.
 */
export function escapeWaypoint(
  self: XZPoint,
  forwardX: number,
  forwardZ: number,
  attempt: number,
  others: readonly XZPoint[],
  isBlockedAt: (x: number, z: number) => boolean,
): XZPoint | null {
  const length = Math.hypot(forwardX, forwardZ);
  if (length <= 1e-6) return null;
  const unitX = forwardX / length;
  const unitZ = forwardZ / length;
  const rotation = ((Math.trunc(attempt) % ESCAPE_TURNS.length) + ESCAPE_TURNS.length) % ESCAPE_TURNS.length;
  const clearOfEveryone = (point: XZPoint): boolean =>
    others.every((other) => Math.hypot(other.x - point.x, other.z - point.z) >= MIN_SEPARATION);

  for (const distance of ESCAPE_DISTANCES) {
    for (let i = 0; i < ESCAPE_TURNS.length; i += 1) {
      const turn = ESCAPE_TURNS[(i + rotation) % ESCAPE_TURNS.length]!;
      const direction = rotateXZ(unitX, unitZ, turn);
      const point: XZPoint = {
        x: self.x + direction.x * distance,
        z: self.z + direction.z * distance,
      };
      if (isBlockedAt(point.x, point.z)) continue;
      if (!clearOfEveryone(point)) continue;
      if (capsuleBlocked(self, point, others, ESCAPE_HALF_WIDTH)) continue;
      return point;
    }
  }

  // Last resort: squeeze straight out of the crowd.
  const crowd = others.filter((other) => Math.hypot(other.x - self.x, other.z - self.z) < 2.5);
  if (crowd.length === 0) return null;
  let centroidX = 0;
  let centroidZ = 0;
  for (const other of crowd) {
    centroidX += other.x;
    centroidZ += other.z;
  }
  centroidX /= crowd.length;
  centroidZ /= crowd.length;
  let awayX = self.x - centroidX;
  let awayZ = self.z - centroidZ;
  const awayLength = Math.hypot(awayX, awayZ);
  if (awayLength <= 1e-6) {
    // Dead centre of the crowd: back the way we came.
    awayX = -unitX;
    awayZ = -unitZ;
  } else {
    awayX /= awayLength;
    awayZ /= awayLength;
  }
  for (const distance of ESCAPE_DISTANCES) {
    const point: XZPoint = { x: self.x + awayX * distance, z: self.z + awayZ * distance };
    if (!isBlockedAt(point.x, point.z)) return point;
  }
  return null;
}

export function separationCorrection(
  a: XZPoint,
  b: XZPoint,
  minSeparation: number = MIN_SEPARATION,
): SeparationCorrection | null {
  if (!(minSeparation > 0)) return null;
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const distance = Math.hypot(dx, dz);
  if (distance >= minSeparation) return null;
  if (distance < 1e-9) {
    // Coincident points (the morning door crowd): a deterministic axis
    // so the stack resolves the same way every frame.
    return { nx: 1, nz: 0, penetration: minSeparation };
  }
  return { nx: dx / distance, nz: dz / distance, penetration: minSeparation - distance };
}

const ARRIVAL_RING_RADII = [0.8, 1.2, 1.6];

/** Where to actually stand when arriving at `target`. Returns `target`
 *  unless another NPC is inside `minSeparation` of it (or it is
 *  blocked), in which case the first free ring spot wins - the NPC
 *  parks BESIDE the blocker (the C-48 "meeting") instead of stacking. */
export function arrivalClearOf(
  target: XZPoint,
  occupants: readonly XZPoint[],
  minSeparation: number,
  isBlockedAt: (x: number, z: number) => boolean,
): XZPoint {
  const tooClose = (x: number, z: number): boolean =>
    occupants.some((occupant) => Math.hypot(occupant.x - x, occupant.z - z) < minSeparation);
  if (!tooClose(target.x, target.z) && !isBlockedAt(target.x, target.z)) return target;
  for (const radius of ARRIVAL_RING_RADII) {
    for (let i = 0; i < 8; i += 1) {
      const angle = (i / 8) * Math.PI * 2;
      const x = target.x + Math.cos(angle) * radius;
      const z = target.z + Math.sin(angle) * radius;
      if (!tooClose(x, z) && !isBlockedAt(x, z)) return { x, z };
    }
  }
  return target;
}

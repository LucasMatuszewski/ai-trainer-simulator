/**
 * Pure AABB collision for the player's walk controller.
 *
 * The original `applyWithCollision` was a closure inside `createControls`,
 * reading the module-level OFFICE_BOUNDS / OBSTACLES. That made it
 * impossible to test without booting three.js + the office scene.
 *
 * This module is the pure-function extract: same math, but the bounds
 * and obstacles are parameters. The closure-based version in controls.ts
 * wraps this one and feeds it the same data.
 *
 * Coordinate system: x/z plane (y is up; we don't collide on y because
 * the office is one floor). Bounds and obstacles are AABBs defined by
 * their min/max corners. The player is a circle of `radius` — we
 * inflate the player's AABB by `radius` on each side and inflate the
 * obstacles too, which is the standard AABB-vs-circle test.
 *
 * One axis at a time: when the player tries to move diagonally into a
 * wall, this lets the unblocked axis still apply, so the player slides
 * along the wall instead of sticking to it.
 */

export interface AABB {
  minX: number;
  minZ: number;
  maxX: number;
  maxZ: number;
}

export interface XZ {
  x: number;
  z: number;
}

/**
 * Apply motion on a single axis, clamped by world bounds and reverting
 * if it would push the player into an obstacle.
 *
 * The caller is expected to call this once per axis (x, then z) so that
 * a diagonal move into a wall slides along the wall rather than sticking.
 * The radius inflates both the player and the obstacles.
 */
export function applyWithCollision(
  pos: XZ,
  radius: number,
  deltaX: number,
  deltaZ: number,
  bounds: AABB,
  obstacles: readonly AABB[],
): XZ {
  // We accumulate the result so that, if deltaX succeeds and deltaZ is
  // also requested, the second axis starts from the post-X position. The
  // caller still gets one outcome, not two.
  let outX = pos.x;
  let outZ = pos.z;
  if (deltaX !== 0) {
    let x = pos.x + deltaX;
    // Bounds clamp first; bounds always win.
    if (x - radius < bounds.minX) x = bounds.minX + radius;
    if (x + radius > bounds.maxX) x = bounds.maxX - radius;
    // Then obstacles; if any would overlap, revert this axis.
    if (!overlapsAny(x, pos.z, radius, obstacles)) {
      outX = x;
    }
  }
  if (deltaZ !== 0) {
    let z = pos.z + deltaZ;
    if (z - radius < bounds.minZ) z = bounds.minZ + radius;
    if (z + radius > bounds.maxZ) z = bounds.maxZ - radius;
    // Note: check against outX, not pos.x, so an X-clamp from this call
    // doesn't get clobbered by a stale z-axis overlap test.
    if (!overlapsAny(outX, z, radius, obstacles)) {
      outZ = z;
    }
  }
  return { x: outX, z: outZ };
}

function overlapsAny(x: number, z: number, radius: number, obstacles: readonly AABB[]): boolean {
  for (const o of obstacles) {
    if (
      x + radius > o.minX &&
      x - radius < o.maxX &&
      z + radius > o.minZ &&
      z - radius < o.maxZ
    ) {
      return true;
    }
  }
  return false;
}

/**
 * C-54: place a point safely for a teleport-style placement (the
 * conversation spot). Bounds clamp first (bounds always win, same as
 * applyWithCollision). Any overlapping obstacle is escaped through the
 * cheapest face whose landing spot is clear of EVERY obstacle - the
 * naive nearest-face push oscillates forever when two obstacles sit
 * closer together than 2x the radius. A fully fenced-in point falls
 * back to the plain nearest-face push.
 */
export function pushOutOfObstacles(
  pos: XZ,
  radius: number,
  bounds: AABB,
  obstacles: readonly AABB[],
): XZ {
  const clamp = (p: XZ): XZ => ({
    x: Math.max(bounds.minX + radius, Math.min(bounds.maxX - radius, p.x)),
    z: Math.max(bounds.minZ + radius, Math.min(bounds.maxZ - radius, p.z)),
  });
  const overlaps = (p: XZ, o: AABB): boolean =>
    p.x + radius > o.minX && p.x - radius < o.maxX &&
    p.z + radius > o.minZ && p.z - radius < o.maxZ;
  const clearOfAll = (p: XZ): boolean => obstacles.every((o) => !overlaps(p, o));

  const start = clamp(pos);
  if (clearOfAll(start)) return start;

  /** Face pushes for one obstacle, cheapest first. */
  const facePushes = (o: AABB): Array<{ cost: number; p: XZ }> => {
    const west = start.x - (o.minX - radius);
    const east = o.maxX + radius - start.x;
    const north = start.z - (o.minZ - radius);
    const south = o.maxZ + radius - start.z;
    return [
      { cost: west, p: { x: o.minX - radius, z: start.z } },
      { cost: east, p: { x: o.maxX + radius, z: start.z } },
      { cost: north, p: { x: start.x, z: o.minZ - radius } },
      { cost: south, p: { x: start.x, z: o.maxZ + radius } },
    ].sort((a, b) => a.cost - b.cost);
  };

  const touching = obstacles.filter((o) => overlaps(start, o));
  for (const o of touching) {
    for (const candidate of facePushes(o)) {
      const p = clamp(candidate.p);
      if (clearOfAll(p)) return p;
    }
  }
  // Fenced in on every side: take the cheapest local escape so the
  // point at least ends up on an obstacle boundary, not inside it.
  const cheapest = touching
    .flatMap((o) => facePushes(o))
    .sort((a, b) => a.cost - b.cost)[0]!;
  return clamp(cheapest.p);
}

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

/**
 * NPC spawn / destination validator.
 *
 * The NPC controller interpolates each NPC from its previous position
 * to a target destination over 2 seconds. Before today, the destination
 * was trusted blindly: if a random destination had the same XZ as a
 * piece of furniture (e.g. the kitchen coffee machine at x=11, z=-6.2),
 * the NPC visually spawned inside the box.
 *
 * This module is the pure-function fix. Three pieces:
 *
 *   1. `NPC_OBSTACLES` — the static AABBs the NPCs must not overlap.
 *      Built from the main-office OBSTACLES, the multi-room furniture
 *      (fridge, microwave, sink, counter, etc.), and the room walls.
 *
 *   2. `findFreeSpawnNear(desired, obstacles, maxRadius)` — if the
 *      desired spawn is blocked, sample a ring of offsets around it
 *      and return the first free position. The standard "sample around
 *      the point" technique from the three.js community
 *      (https://dev.to/bandinopla/collision-detection-in-threejs-made-easy-using-bvh-41g5).
 *
 *   3. `depenetrate(pos, obstacles)` — push the NPC out of any
 *      overlapping AABB along the minimum-translation vector. One
 *      pass is enough for our ~20-NPC / ~50-furniture scale.
 *
 * This file has zero dependencies on three.js, the scene, or any
 * DOM. It is unit-testable.
 */
import type { AABB } from "./collision";
import { OBSTACLES } from "../content/npcs";
import { WORLD_COLLISION_WALLS } from "../content/world-layout";

export interface NpcSpawn {
  x: number;
  z: number;
  /** NPC circle radius. The kitchen coffee machine NPC uses 0.3. */
  radius: number;
}

/**
 * Default NPC circle radius (matching the player radius used by
 * controls.ts). 0.3m is a comfortable office-corridor width.
 */
export const NPC_DEFAULT_RADIUS = 0.3;

/** A static set of additional furniture AABBs in the multi-room
 *  layout (kitchen, training, meeting, toilet, CEO office). The
 *  generic `furniture` typed entries in `WORLD_ROOMS.furniture` are
 *  not AABBs by themselves; this list is hand-curated to cover the
 *  kitchen's dense new furniture, where the random-walk destinations
 *  land most often.
 *
 *  Coords are matched to the world-layout.ts placements so an NPC
 *  standing at, say, (11, -6.2) (the coffee machine destination) is
 *  detected as overlapping the coffee machine / counter.
 *
 *  L-2026-08-31-06: the counter is 7.55m wide, x=[11.475, 19.025].
 *  The fridge is at x=[10.1, 11.1] - WEST of the counter, not
 *  under it. The bin is at x=[19.175, 19.625] - sticking out
 *  past the east wall, by design.
 *
 *  Why hand-curated and not auto-derived? The `position` field in
 *  `WorldFurniture` is the GROUP origin; the actual AABB depends on
 *  the factory function. Curating the list is the right call for our
 *  scale: ~15 entries, updated whenever a new furniture item lands
 *  in a place NPCs walk.
 */
export const ROOM_FURNITURE_AABBS: readonly AABB[] = [
  // ---- KITCHEN (C-36, x=[9, 19], z=[-7, 7]) ----
  // The counter (one continuous unit: cabinet + top + splash + doors).
  // 7.55m wide, 0.7m deep, from z=-6.95 to z=-6.25.
  { minX: 11.475, maxX: 19.025, minZ: -6.95, maxZ: -5.85 },
  // Fridge (free-standing against the wall, x=10.1-11.1, z=-7.0 to -6.1).
  { minX: 10.1, maxX: 11.1, minZ: -7.0, maxZ: -6.1 },
  // Kitchen coffee machine (sits on the counter top).
  { minX: 12.65, maxX: 13.35, minZ: -6.95, maxZ: -6.25 },
  // Microwave on the counter.
  { minX: 14.85, maxX: 15.55, minZ: -6.95, maxZ: -6.25 },
  // Sink (the counter section with the basin).
  { minX: 16.7, maxX: 18.3, minZ: -6.95, maxZ: -6.25 },
  // Dishwasher (built into the cabinet, east end).
  { minX: 18.25, maxX: 18.95, minZ: -6.55, maxZ: -5.85 },
  // Bin against the north wall, EAST of the counter (sticks out
  // past the east wall by design - the user said this is fine).
  { minX: 19.175, maxX: 19.625, minZ: -6.6, maxZ: -6.2 },
  // The two round kitchen tables and their six chairs (C-36 layout in
  // world-layout.ts: tables at (12, 2.8) and (16, 2.5)). This list used
  // to carry a single stale table at (14, 2.5) from before the second
  // table landed, which let NPCs (and now Janusz's robots, C-70) walk
  // through the real furniture.
  { minX: 11.3, maxX: 12.7, minZ: 2.1, maxZ: 3.5 },
  { minX: 15.3, maxX: 16.7, minZ: 1.8, maxZ: 3.2 },
  // Chairs: (11, 2.8), (13, 2.8), (12, 4.1), (15, 2.5), (17, 2.5), (16, 3.6).
  { minX: 10.78, maxX: 11.22, minZ: 2.58, maxZ: 3.02 },
  { minX: 12.78, maxX: 13.22, minZ: 2.58, maxZ: 3.02 },
  { minX: 11.78, maxX: 12.22, minZ: 3.88, maxZ: 4.32 },
  { minX: 14.78, maxX: 15.22, minZ: 2.28, maxZ: 2.72 },
  { minX: 16.78, maxX: 17.22, minZ: 2.28, maxZ: 2.72 },
  { minX: 15.78, maxX: 16.22, minZ: 3.38, maxZ: 3.82 },
  // ---- TOILET (C-57, x=[19, 24], z=[2, 7]) ----
  // Two stalls against the south wall, next to each other. Stalls
  // are 1.2m wide, 1.6m deep. After the user's 2026-09-01 re-layout
  // the stalls are at world centers [20.6, 0, 2.9] and
  // [21.6, 0, 2.9] (centers 1.0m apart, walls touch with a 0.14m
  // visible gap). The west stall's right wall is at x=[21.17,
  // 21.23]; the east stall's left wall is at x=[20.97, 21.03].
  { minX: 20.0, maxX: 21.2, minZ: 2.1, maxZ: 3.7 },
  { minX: 21.0, maxX: 22.2, minZ: 2.1, maxZ: 3.7 },
  // Washbasin on the north wall (z=6.7, depth 0.55m, width 1.2m).
  // After the 2026-09-01 re-layout the basin is still at world
  // [22, 0, 6.7] but with rotationY = Math.PI (the mirror now
  // faces -Z, into the room). The AABB is unchanged.
  { minX: 21.4, maxX: 22.6, minZ: 6.15, maxZ: 6.7 },
  // Urinal in the back-east corner (south wall + east wall) after
  // the 2026-09-01 re-layout. Now at world [23.5, -0.4, 2], mounted
  // on the south wall. The bowl is at local z=0.18-0.34 which
  // projects to world z=1.82-2.16 (sticking out from the south
  // wall at z=2 toward the room center).
  { minX: 23.25, maxX: 23.75, minZ: 1.75, maxZ: 2.2 },
  // ---- MEETING ROOM (C-64, x=[9.5, 19], z=[7.5, 17.5]) ----
  // Table, eight chairs and the wall-mounted projector screen.
  { minX: 12.75, maxX: 15.75, minZ: 9.75, maxZ: 15.25 },
  ...[11.85, 16.65].flatMap((x) => [10.3, 11.8, 13.3, 14.8].map((z) => ({
    minX: x - 0.22,
    maxX: x + 0.22,
    minZ: z - 0.22,
    maxZ: z + 0.22,
  }))),
  { minX: 12, maxX: 16.5, minZ: 17.16, maxZ: 17.28 },
  // ---- RECEPTION (C-64, x=[-6, 6], z=[9, 19]) ----
  // Reception desk and return. The visitor face remains reachable from -X.
  { minX: 2.95, maxX: 4.55, minZ: 12.15, maxZ: 14.85 },
  // Sofa, coffee table, floor planter, and the two inside door planters.
  { minX: -4.05, maxX: -3.05, minZ: 12.35, maxZ: 14.65 },
  { minX: -2.75, maxX: -1.55, minZ: 13.15, maxZ: 13.85 },
  { minX: -4.55, maxX: -3.85, minZ: 10.85, maxZ: 11.55 },
  { minX: -3.35, maxX: -2.75, minZ: 18.05, maxZ: 18.65 },
  { minX: 2.75, maxX: 3.35, minZ: 18.05, maxZ: 18.65 },
  // The Xerox is solid; wall foliage and glass doors are visual-only.
  { minX: 4.79, maxX: 5.51, minZ: 16.325, maxZ: 17.175 },
  // ---- TRAINING ROOM (x=[19, 27], z=[-19, -3]) ----
  // Projector screen (a thin wall on the far north wall).
  { minX: 20.5, maxX: 25.5, minZ: -19.06, maxZ: -18.34 },
  // Lectern.
  { minX: 22.4, maxX: 23.6, minZ: -17.4, maxZ: -16.6 },
  // Whiteboard on the south wall.
  { minX: 21.0, maxX: 25.0, minZ: -3.12, maxZ: -3.0 },
  // CEO office desk (a wide bar, north side of the room).
  { minX: -1.6, maxX: 1.6, minZ: -16.4, maxZ: -15.6 },
  // CEO office chair.
  { minX: -0.25, maxX: 0.25, minZ: -17.4, maxZ: -16.9 },
];

/**
 * The complete set of static obstacles for NPC collision. Built
 * lazily on first call so importing the module doesn't pay the
 * construction cost when an NPC validator is never used.
 */
let cachedNpcObstacles: ReadonlyArray<AABB> | null = null;
export function getNpcObstacles(): ReadonlyArray<AABB> {
  if (cachedNpcObstacles === null) {
    cachedNpcObstacles = [...OBSTACLES, ...ROOM_FURNITURE_AABBS, ...WORLD_COLLISION_WALLS];
  }
  return cachedNpcObstacles;
}

/** Returns true if the spawn circle overlaps any static AABB.
 *  Uses the proper circle-vs-AABB test (Christer Ericke §5.5): clamp
 *  the center to the AABB, compute the squared distance, compare to
 *  the squared radius. This is the same test that `depenetrate`
 *  uses internally, so the two functions stay in sync. */
export function isSpawnBlocked(spawn: NpcSpawn, obstacles: ReadonlyArray<AABB>): boolean {
  for (const o of obstacles) {
    if (circleOverlapsAabb(spawn.x, spawn.z, spawn.radius, o)) return true;
  }
  return false;
}

/**
 * Pick a free spawn point near `desired`. Samples a ring of offsets
 * at increasing radius. Returns the first non-blocked point, or
 * `null` if none found within `maxRadius`. The caller should fall
 * back to staying at the desk when this returns null.
 *
 * Strategy (the standard AABB-sampling pattern from the three.js
 * community BVH guide):
 *   1. Try the desired point as-is.
 *   2. For each radius in [0.5, 1.0, 1.5, 2.0], sample 8 directions
 *      (cardinal + diagonal). Return the first non-blocked.
 *   3. If all 32 sample points are blocked, return null.
 *
 * 8 directions at 4 radii = 32 candidates, which is fine for the
 * 1-in-10 random walk that picks a kitchen destination.
 */
export function findFreeSpawnNear(
  desired: NpcSpawn,
  obstacles: ReadonlyArray<AABB>,
  maxRadius = 2.0,
): NpcSpawn | null {
  if (!isSpawnBlocked(desired, obstacles)) return desired;
  for (const r of [0.5, 1.0, 1.5, 2.0]) {
    if (r > maxRadius) break;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const candidate: NpcSpawn = {
        x: desired.x + Math.cos(angle) * r,
        z: desired.z + Math.sin(angle) * r,
        radius: desired.radius,
      };
      if (!isSpawnBlocked(candidate, obstacles)) return candidate;
    }
  }
  return null;
}

/** Circle-vs-AABB overlap test (the correct test for a circle NPC).
 *  Returns true if any part of the circle overlaps the AABB.
 *
 *  The trick: clamp the circle center to the AABB, get the closest
 *  point on the AABB to the center, and check if the distance from
 *  the center to that point is less than the radius. This is the
 *  standard circle-vs-AABB test from real-time collision detection
 *  (Christer Ericke, "Real-Time Collision Detection", 2004, §5.5). */
function circleOverlapsAabb(
  cx: number,
  cz: number,
  radius: number,
  o: AABB,
): boolean {
  const closestX = Math.max(o.minX, Math.min(cx, o.maxX));
  const closestZ = Math.max(o.minZ, Math.min(cz, o.maxZ));
  const dx = cx - closestX;
  const dz = cz - closestZ;
  return dx * dx + dz * dz < radius * radius;
}

/**
 * Push the NPC out of any overlapping AABB using the closest-point
 * normal (Christer Ericke §5.5.5). The push direction is FROM the
 * closest point on the AABB TO the circle center, normalized, times
 * (radius - currentDistance) so the circle sits exactly at the
 * boundary after the push.
 *
 * Multiple passes (up to 4) handle the corner case where pushing
 * out of one AABB lands the NPC into another.
 *
 * The 0.001m epsilon on the final position prevents the NPC from
 * resting exactly on the boundary, where float drift could cause
 * the next frame's overlap test to flicker.
 */
export function depenetrate(
  pos: NpcSpawn,
  obstacles: ReadonlyArray<AABB>,
): NpcSpawn {
  let { x, z } = pos;
  let changed = true;
  let iterations = 0;
  while (changed && iterations < 4) {
    changed = false;
    iterations++;
    for (const o of obstacles) {
      if (!circleOverlapsAabb(x, z, pos.radius, o)) continue;
      const closestX = Math.max(o.minX, Math.min(x, o.maxX));
      const closestZ = Math.max(o.minZ, Math.min(z, o.maxZ));
      let dx = x - closestX;
      let dz = z - closestZ;
      let dist = Math.hypot(dx, dz);
      if (dist < 1e-6) {
        // The center is exactly on the AABB — pick a deterministic
        // push direction (the axis of minimum penetration, which is
        // also the largest gap).
        const pushLeft = x - o.minX;
        const pushRight = o.maxX - x;
        const pushBack = z - o.minZ;
        const pushFront = o.maxZ - z;
        const maxGap = Math.max(pushLeft, pushRight, pushBack, pushFront);
        if (maxGap === pushLeft) { dx = -1; dz = 0; dist = 0; }
        else if (maxGap === pushRight) { dx = 1; dz = 0; dist = 0; }
        else if (maxGap === pushBack) { dx = 0; dz = -1; dist = 0; }
        else { dx = 0; dz = 1; dist = 0; }
      }
      const push = (pos.radius - dist) / dist;
      x += dx * push + (dx / Math.max(dist, 1e-6)) * 0.001;
      z += dz * push + (dz / Math.max(dist, 1e-6)) * 0.001;
      changed = true;
    }
  }
  return { x, z, radius: pos.radius };
}

/**
 * Convenience: validate AND depenetrate. The pipeline used by the
 * NPC controller on every destination choice and every arrival.
 *
 *   1. If the desired point is free, return it.
 *   2. Otherwise, sample around it for a free point.
 *   3. If no free point is found within `maxRadius`, return null
 *      (the caller should keep the NPC at its desk).
 *   4. Otherwise, depenetrate the chosen point (handles the rare
 *      case where a sampled point is still slightly inside a thin
 *      corner).
 */
export function findValidNpcSpawn(
  desired: NpcSpawn,
  obstacles: ReadonlyArray<AABB> = getNpcObstacles(),
  maxRadius = 2.0,
): NpcSpawn | null {
  const candidate = findFreeSpawnNear(desired, obstacles, maxRadius);
  if (candidate === null) return null;
  return depenetrate(candidate, obstacles);
}

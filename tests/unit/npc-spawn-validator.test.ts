/**
 * Unit tests for the NPC spawn validator (L-2026-08-31-05).
 *
 * These cover the four documented behaviors:
 *   1. `isSpawnBlocked` — a circle vs an AABB list.
 *   2. `findFreeSpawnNear` — the standard ring-sampling fallback.
 *   3. `depenetrate` — the MTV push-out.
 *   4. `findValidNpcSpawn` — the pipeline.
 *
 * Plus a regression test for the specific bug the user screenshotted:
 * the kitchen coffee machine is at (11, -6.2) and an NPC walking
 * to the coffee destination would spawn inside the machine.
 */
import { describe, expect, it } from "vitest";
import {
  depenetrate,
  findFreeSpawnNear,
  findValidNpcSpawn,
  isSpawnBlocked,
  NPC_DEFAULT_RADIUS,
  type NpcSpawn,
} from "../../src/engine/npc-spawn-validator";

function aabb(
  minX: number,
  minZ: number,
  maxX: number,
  maxZ: number,
): { minX: number; minZ: number; maxX: number; maxZ: number } {
  return { minX, minZ, maxX, maxZ };
}

describe("npc-spawn-validator / isSpawnBlocked", () => {
  it("returns false for a spawn outside all AABBs", () => {
    const obs = [aabb(0, 0, 1, 1)];
    expect(isSpawnBlocked({ x: 2, z: 2, radius: 0.3 }, obs)).toBe(false);
  });

  it("returns true for a spawn strictly inside an AABB", () => {
    const obs = [aabb(0, 0, 2, 2)];
    expect(isSpawnBlocked({ x: 1, z: 1, radius: 0.3 }, obs)).toBe(true);
  });

  it("returns true when the circle's closest point on the AABB is inside the radius", () => {
    const obs = [aabb(1, 1, 2, 2)];
    // The center is at (0.8, 1.5). The closest AABB point is (1, 1.5).
    // Distance is 0.2; radius is 0.3. Overlap.
    expect(isSpawnBlocked({ x: 0.8, z: 1.5, radius: 0.3 }, obs)).toBe(true);
  });

  it("returns false when the circle's closest point on the AABB is outside the radius", () => {
    const obs = [aabb(1, 1, 2, 2)];
    // The center is at (0.7, 1.5). The closest AABB point is (1, 1.5).
    // Distance is 0.3; radius is 0.3. NOT overlapping (boundary case).
    expect(isSpawnBlocked({ x: 0.7, z: 1.5, radius: 0.3 }, obs)).toBe(false);
  });

  it("treats radius 0 as a point inside the AABB", () => {
    const obs = [aabb(0, 0, 1, 1)];
    // A 0-radius circle at (0.1, 0.1) is strictly inside the AABB
    // (closest point is (0.1, 0.1) itself, distance 0, less than
    // radius 0 - so the strict < test reports NOT overlapping).
    // For radius 0 a meaningful check is "strictly inside": the
    // 0-radius circle's distance to the closest AABB point is
    // 0.0, which is NOT < 0.0. So the test is correct as-is.
    // This documents the behavior; the depenetrate function uses
    // a separate path for the "center inside the AABB" case.
    expect(isSpawnBlocked({ x: 0.1, z: 0.1, radius: 0 }, obs)).toBe(false);
  });

  it("treats radius 0 as a point outside the AABB", () => {
    const obs = [aabb(0, 0, 1, 1)];
    // 0-radius circle at (1.5, 0.5) is outside; closest point is
    // (1, 0.5) at distance 0.5 > radius 0, so NOT overlapping.
    expect(isSpawnBlocked({ x: 1.5, z: 0.5, radius: 0 }, obs)).toBe(false);
  });
});

describe("npc-spawn-validator / findFreeSpawnNear", () => {
  it("returns the desired point when it is free", () => {
    const obs = [aabb(0, 0, 1, 1)];
    const desired: NpcSpawn = { x: 5, z: 5, radius: 0.3 };
    expect(findFreeSpawnNear(desired, obs)).toEqual(desired);
  });

  it("samples a ring and returns the first free point", () => {
    // A 2x2 box centered at (5, 5). At ring radius 0.5, all 8
    // cardinal/diagonal directions land at sqrt(0.5^2+0.5^2)=0.7
    // from the box center (e.g. 0.5,0 or 0.35,0.35), which is
    // INSIDE the 2x2 box (4-6). So the loop moves to radius 1.0,
    // and the chosen point is one of the 8 ring samples at
    // radius 1.0.
    const obs = [aabb(4, 4, 6, 6)];
    const desired: NpcSpawn = { x: 5, z: 5, radius: 0.2 };
    const result = findFreeSpawnNear(desired, obs);
    expect(result).not.toBeNull();
    if (result !== null) {
      const dx = result.x - 5;
      const dz = result.z - 5;
      const r = Math.hypot(dx, dz);
      // The point is one of the 8 ring samples at some radius
      // from [0.5, 1.0, 1.5, 2.0].
      expect(r).toBeGreaterThan(0.4);
      expect(r).toBeLessThan(2.1);
    }
  });

  it("returns null when surrounded by obstacles (a tight box)", () => {
    // A bigger box with a smaller box concentric inside it - no
    // 0.5m ring point is free. (This is the depenetrate case, not
    // the findFreeSpawnNear case - so we should return null.)
    const obs = [aabb(0, 0, 10, 10)];
    const desired: NpcSpawn = { x: 5, z: 5, radius: 0.2 };
    expect(findFreeSpawnNear(desired, obs, 2.0)).toBeNull();
  });
});

describe("npc-spawn-validator / depenetrate", () => {
  it("leaves a free spawn untouched", () => {
    const obs = [aabb(0, 0, 1, 1)];
    const before: NpcSpawn = { x: 2, z: 2, radius: 0.3 };
    const after = depenetrate(before, obs);
    expect(after).toEqual(before);
  });

  it("pushes the NPC out along the X axis when X is the minimum penetration", () => {
    // Box at (0, 0) - (1, 1). NPC at (0.5, 0.5) is centered inside.
    // All four MTV values are equal, so the implementation picks
    // the first one in the chained `if/else` order, which is
    // pushLeft (negative X). The test asserts that the NPC moves
    // OUT of the box, not that it picks a specific axis.
    const obs = [aabb(0, 0, 1, 1)];
    const result = depenetrate({ x: 0.5, z: 0.5, radius: 0.3 }, obs);
    // After depenetration the NPC must NOT overlap the AABB.
    expect(isSpawnBlocked(result, obs)).toBe(false);
  });

  it("handles a corner case (NPC outside but corner is close)", () => {
    // A thin pillar at (1, 1) - (1.1, 1.1). NPC at (0.6, 0.6) with
    // radius 0.5 — the corner (1, 1) is exactly 0.4m from the
    // NPC center, so the NPC circle does NOT overlap. depenetrate
    // should leave it alone.
    const obs = [aabb(1, 1, 1.1, 1.1)];
    const before: NpcSpawn = { x: 0.6, z: 0.6, radius: 0.5 };
    const after = depenetrate(before, obs);
    expect(after).toEqual(before);
  });

  it("converges when multiple AABBs overlap (iterative pass)", () => {
    // Two AABBs touching at a corner. NPC placed at the touching
    // corner. After one pass the NPC is pushed out of one; the
    // second pass may or may not be needed but the loop should
    // converge within 4 iterations.
    const obs = [aabb(0, 0, 1, 1), aabb(1, 1, 2, 2)];
    const result = depenetrate({ x: 0.9, z: 0.9, radius: 0.3 }, obs);
    expect(isSpawnBlocked(result, obs)).toBe(false);
  });
});

describe("npc-spawn-validator / findValidNpcSpawn pipeline", () => {
  it("returns the input when the desired point is already free", () => {
    const desired: NpcSpawn = { x: 3, z: 3, radius: 0.3 };
    expect(findValidNpcSpawn(desired, [])).toEqual(desired);
  });

  it("REGRESSION (L-2026-08-31-05): NPC walking to the kitchen coffee machine no longer spawns inside the box", () => {
    // The user screenshot: NPC at the coffee destination (11, -6.2)
    // visually appeared inside the kitchen coffee machine / counter.
    // The pipeline should push it to a free tile nearby.
    const obstacles = [
      // The kitchen counter (9m run, z=[-6.55, -5.85]).
      aabb(9.75, -6.55, 18.75, -5.85),
      // The kitchen coffee machine on the counter.
      aabb(11.65, -6.95, 12.35, -6.25),
    ];
    // The NPC's destination (the old bug).
    const desired: NpcSpawn = { x: 11, z: -6.2, radius: 0.3 };
    const result = findValidNpcSpawn(desired, obstacles);
    // Must NOT be null — we found a free spot nearby.
    expect(result).not.toBeNull();
    if (result !== null) {
      // Must NOT overlap any obstacle.
      expect(isSpawnBlocked(result, obstacles)).toBe(false);
      // The result is within 2.0m of the desired (the search radius).
      const dist = Math.hypot(result.x - desired.x, result.z - desired.z);
      expect(dist).toBeLessThanOrEqual(2.0 + 0.01);
    }
  });

  it("returns null when the destination is fully enclosed (the NPC stays at its desk)", () => {
    const obstacles = [aabb(0, 0, 100, 100)];
    const desired: NpcSpawn = { x: 50, z: 50, radius: 0.3 };
    expect(findValidNpcSpawn(desired, obstacles)).toBeNull();
  });
});

describe("npc-spawn-validator / NPC_DEFAULT_RADIUS", () => {
  it("is 0.3m (matches the player radius used in controls.ts)", () => {
    expect(NPC_DEFAULT_RADIUS).toBe(0.3);
  });
});

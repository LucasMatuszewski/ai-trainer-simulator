/**
 * Tests for the pure AABB collision helper.
 *
 * The original `applyWithCollision` was a closure inside createControls,
 * referencing the module-level OFFICE_BOUNDS and OBSTACLES. That made
 * it impossible to test without booting the engine. Extracting it
 * into a pure function — the obstacles and bounds as parameters —
 * lets us pin down the corner cases:
 *
 *   - clear path: full motion
 *   - wall in x: x clamped, z unchanged
 *   - wall in z: z clamped, x unchanged
 *   - obstacle on the new position: motion on that axis is reverted
 *   - sliding along a wall: x blocked, z still applies (or vice versa)
 *   - bounds minus radius: player stops flush with the wall
 *   - obstacle fully surrounds: all motion blocked
 *
 * If the collision math ever changes (it has, twice), these tests catch
 * regressions in the player's ability to move at all.
 */

import { describe, expect, it } from "vitest";
import { applyWithCollision, type AABB } from "../../src/engine/collision";

const WIDE_BOUNDS: AABB = { minX: -10, maxX: 10, minZ: -10, maxZ: 10 };
const TIGHT_BOUNDS: AABB = { minX: -2, maxX: 2, minZ: -2, maxZ: 2 };
const NO_OBSTACLES: readonly AABB[] = [];

function makeOb(minX: number, minZ: number, maxX: number, maxZ: number): AABB {
  return { minX, minZ, maxX, maxZ };
}

describe("applyWithCollision", () => {
  it("moves the player when there is clear space and bounds are wide", () => {
    const result = applyWithCollision({ x: 0, z: 0 }, 0.3, 0.5, 0, WIDE_BOUNDS, NO_OBSTACLES);
    expect(result.x).toBeCloseTo(0.5, 5);
    expect(result.z).toBe(0);
  });

  it("moves the player on the z axis independently", () => {
    const result = applyWithCollision({ x: 0, z: 0 }, 0.3, 0, -0.7, WIDE_BOUNDS, NO_OBSTACLES);
    expect(result.x).toBe(0);
    expect(result.z).toBeCloseTo(-0.7, 5);
  });

  it("returns the original position when there is no motion on either axis", () => {
    const result = applyWithCollision({ x: 1, z: 2 }, 0.3, 0, 0, WIDE_BOUNDS, NO_OBSTACLES);
    expect(result).toEqual({ x: 1, z: 2 });
  });

  it("clamps the player inside the bounds minus the radius (x side)", () => {
    // Player at x=1.7 (radius=0.3, so player right edge is at x=2.0 = maxX).
    // Tries to move +x=1. Result should stay clamped at 1.7.
    const result = applyWithCollision({ x: 1.7, z: 0 }, 0.3, 1, 0, TIGHT_BOUNDS, NO_OBSTACLES);
    expect(result.x).toBe(1.7);
    expect(result.z).toBe(0);
  });

  it("clamps the player inside the bounds minus the radius (z side)", () => {
    const result = applyWithCollision({ x: 0, z: 1.7 }, 0.3, 0, 1, TIGHT_BOUNDS, NO_OBSTACLES);
    expect(result.x).toBe(0);
    expect(result.z).toBe(1.7);
  });

  it("clamps the player inside the bounds minus the radius (negative side)", () => {
    const result = applyWithCollision({ x: -1.7, z: 0 }, 0.3, -1, 0, TIGHT_BOUNDS, NO_OBSTACLES);
    expect(result.x).toBe(-1.7);
  });

  it("reverts motion that would push the player into an obstacle", () => {
    // Obstacle at x=1.6..3, spans z=-1..1. Player at (1.5, 0) with radius 0.3
    // tries to move +x=1. Inflated player bbox would be x=2.2..2.8 which
    // overlaps obstacle x=1.6..3. Revert.
    const obstacle = makeOb(1.6, -1, 3, 1);
    const result = applyWithCollision({ x: 1.5, z: 0 }, 0.3, 1, 0, WIDE_BOUNDS, [obstacle]);
    expect(result).toEqual({ x: 1.5, z: 0 });
  });

  it("allows motion that does NOT overlap the obstacle (with margin)", () => {
    // Obstacle at x=3..5. Player at (1.5, 0) with radius 0.3 moves +x=1.
    // Inflated player x would be 2.2..2.8, which is < 3. No overlap, motion
    // lands at 2.5.
    const obstacle = makeOb(3, -1, 5, 1);
    const result = applyWithCollision({ x: 1.5, z: 0 }, 0.3, 1, 0, WIDE_BOUNDS, [obstacle]);
    expect(result.x).toBeCloseTo(2.5, 5);
    expect(result.z).toBe(0);
  });

  it("slides along an obstacle: one axis blocked, the other still moves", () => {
    // Blocker in the +x direction. We pick a thin obstacle that only
    // spans z=0.1..0.5 so the player can still move +z freely.
    const blocker = makeOb(1.6, 0.1, 10, 0.5);
    // Player at (1.5, 0) tries (+1, +1). x blocked, z free.
    const result = applyWithCollision({ x: 1.5, z: 0 }, 0.3, 1, 1, WIDE_BOUNDS, [blocker]);
    expect(result.x).toBe(1.5);
    expect(result.z).toBeCloseTo(1, 5);
  });

  it("does not move the player diagonally into a wall corner — reverts both axes", () => {
    // Player at the corner of the tight bounds trying to move out diagonally.
    const result = applyWithCollision({ x: 1.7, z: 1.7 }, 0.3, 1, 1, TIGHT_BOUNDS, NO_OBSTACLES);
    expect(result.x).toBe(1.7);
    expect(result.z).toBe(1.7);
  });

  it("treats a zero-radius player as a single point (no inflation)", () => {
    // Edge case: controller always uses 0.3, but the function should
    // accept any radius. With radius 0, the player's AABB is just (x, z).
    // Obstacle at x=0.99..5, player at x=0 moving +x=0.5. With radius 0,
    // candidate x=0.5 < 0.99, so no overlap. Motion lands.
    const ok = applyWithCollision({ x: 0, z: 0 }, 0, 0.5, 0, WIDE_BOUNDS, [makeOb(0.99, -1, 5, 1)]);
    expect(ok.x).toBeCloseTo(0.5, 5);
    // Same setup, but the obstacle starts at x=0.4 so the player would
    // land inside it. With radius 0, candidate x=0.5 > 0.4 => overlap => revert.
    const blocked = applyWithCollision({ x: 0, z: 0 }, 0, 0.5, 0, WIDE_BOUNDS, [makeOb(0.4, -1, 5, 1)]);
    expect(blocked.x).toBe(0);
  });

  it("reverts when both bounds AND obstacle would push back (obstacle wins)", () => {
    // Bounds say x must stay <= 1.7. Obstacle spans x=1.6..5 which also
    // blocks the bounds-clamped position (1.7, 0). The function should
    // not move: bounds is the floor plan, obstacles are furniture inside
    // the room, and if both would push back, the more restrictive one
    // wins (the obstacle — the player just stops).
    const obstacle = makeOb(1.6, -1, 5, 1);
    const result = applyWithCollision({ x: 1.5, z: 0 }, 0.3, 1, 0, TIGHT_BOUNDS, [obstacle]);
    expect(result.x).toBe(1.5);
  });
});

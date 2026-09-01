import { describe, expect, it } from "vitest";
import { pushOutOfObstacles } from "../../src/engine/collision";

const BOUNDS = { minX: -10, maxX: 10, minZ: -10, maxZ: 10 };

describe("pushOutOfObstacles (C-54 conversation placement)", () => {
  it("leaves a free point alone", () => {
    const spot = pushOutOfObstacles({ x: 0, z: 0 }, 0.3, BOUNDS, [
      { minX: 5, minZ: 5, maxX: 7, maxZ: 7 },
    ]);
    expect(spot).toEqual({ x: 0, z: 0 });
  });

  it("pushes a point out along the nearest face of an obstacle", () => {
    // Point is 0.1 inside the obstacle's -X face; nearest escape is west.
    const obstacle = { minX: 1, minZ: -1, maxX: 3, maxZ: 1 };
    const spot = pushOutOfObstacles({ x: 1.2, z: 0 }, 0.3, BOUNDS, [obstacle]);
    expect(spot.x).toBeCloseTo(obstacle.minX - 0.3, 5);
    expect(spot.z).toBeCloseTo(0, 5);
  });

  it("escapes through the cheaper face, not the entry side", () => {
    // Deep inside a wide obstacle: the +Z face is the closest.
    const obstacle = { minX: -4, minZ: -4, maxX: 4, maxZ: 4 };
    const spot = pushOutOfObstacles({ x: 0, z: 3 }, 0.3, BOUNDS, [obstacle]);
    expect(spot.z).toBeCloseTo(obstacle.maxZ + 0.3, 5);
  });

  it("is still clear after resolving against several obstacles in a row", () => {
    const obstacles = [
      { minX: -2, minZ: -1, maxX: 0, maxZ: 1 },
      { minX: 0.4, minZ: -1, maxX: 2.4, maxZ: 1 },
    ];
    const spot = pushOutOfObstacles({ x: 0.2, z: 0 }, 0.3, BOUNDS, obstacles);
    for (const o of obstacles) {
      const overlapX = spot.x + 0.3 > o.minX && spot.x - 0.3 < o.maxX;
      const overlapZ = spot.z + 0.3 > o.minZ && spot.z - 0.3 < o.maxZ;
      expect(overlapX && overlapZ).toBe(false);
    }
  });

  it("clamps to the world bounds last", () => {
    const spot = pushOutOfObstacles({ x: 12, z: 0 }, 0.3, BOUNDS, []);
    expect(spot.x).toBe(BOUNDS.maxX - 0.3);
  });
});

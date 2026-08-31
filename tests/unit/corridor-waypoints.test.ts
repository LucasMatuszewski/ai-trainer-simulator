import { describe, expect, it } from "vitest";

import {
  buildWaypointEdges,
  CORRIDOR_WAYPOINTS,
  DEFAULT_MAX_EDGE_LENGTH,
} from "../../src/content/corridor-waypoints";
import { OBSTACLES } from "../../src/content/npcs";
import {
  WORLD_BOUNDS,
  WORLD_COLLISION_WALLS,
  WORLD_ROOMS,
} from "../../src/content/world-layout";
import { ROOM_FURNITURE_AABBS } from "../../src/engine/npc-spawn-validator";
import type { AABB } from "../../src/engine/collision";

const ALL_OBSTACLES: readonly AABB[] = [
  ...OBSTACLES,
  ...ROOM_FURNITURE_AABBS,
  ...WORLD_COLLISION_WALLS,
];

function containsPoint(box: AABB, x: number, z: number): boolean {
  return x >= box.minX && x <= box.maxX && z >= box.minZ && z <= box.maxZ;
}

function segmentTouchesBox(
  a: { x: number; z: number },
  b: { x: number; z: number },
  box: AABB,
): boolean {
  let near = 0;
  let far = 1;
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  for (const [origin, delta, min, max] of [
    [a.x, dx, box.minX, box.maxX],
    [a.z, dz, box.minZ, box.maxZ],
  ] as const) {
    if (Math.abs(delta) < 1e-12) {
      if (origin < min || origin > max) return false;
      continue;
    }
    const first = (min - origin) / delta;
    const second = (max - origin) / delta;
    near = Math.max(near, Math.min(first, second));
    far = Math.min(far, Math.max(first, second));
    if (near > far) return false;
  }
  return true;
}

describe("corridor waypoint graph", () => {
  it("places every waypoint inside the world and a room, outside every obstacle", () => {
    for (const waypoint of CORRIDOR_WAYPOINTS) {
      const { x, z } = waypoint.position;
      expect(containsPoint(WORLD_BOUNDS, x, z), waypoint.id).toBe(true);
      expect(
        WORLD_ROOMS.some((room) => containsPoint(room.floor, x, z)) ||
          (x >= -9 && x <= 9 && z >= -9 && z <= 9),
        waypoint.id,
      ).toBe(true);
      expect(ALL_OBSTACLES.some((box) => containsPoint(box, x, z)), waypoint.id).toBe(false);
    }
  });

  it("builds only short, obstacle-clear edges", () => {
    const byId = new Map(CORRIDOR_WAYPOINTS.map((waypoint) => [waypoint.id, waypoint]));
    const edges = buildWaypointEdges(CORRIDOR_WAYPOINTS, ALL_OBSTACLES, DEFAULT_MAX_EDGE_LENGTH);
    for (const [fromId, toId] of edges) {
      const from = byId.get(fromId)!.position;
      const to = byId.get(toId)!.position;
      expect(Math.hypot(to.x - from.x, to.z - from.z)).toBeLessThanOrEqual(DEFAULT_MAX_EDGE_LENGTH);
      expect(ALL_OBSTACLES.some((box) => segmentTouchesBox(from, to, box))).toBe(false);
    }
  });

  it.each([
    ["kitchen-fridge", 10.6, -5.5],
    ["kitchen-coffee", 13, -5.3],
    ["kitchen-microwave", 15.2, -5.3],
    ["kitchen-sink", 17.5, -5.3],
    ["kitchen-table", 14, 1.2],
  ])("includes corrected clear stop %s near (%s, %s)", (id, x, z) => {
    const waypoint = CORRIDOR_WAYPOINTS.find((candidate) => candidate.id === id);
    expect(waypoint).toBeDefined();
    expect(Math.hypot(waypoint!.position.x - x, waypoint!.position.z - z)).toBeLessThanOrEqual(0.6);
  });

  it("builds deterministic edges", () => {
    expect(buildWaypointEdges(CORRIDOR_WAYPOINTS, ALL_OBSTACLES, DEFAULT_MAX_EDGE_LENGTH)).toEqual(
      buildWaypointEdges(CORRIDOR_WAYPOINTS, ALL_OBSTACLES, DEFAULT_MAX_EDGE_LENGTH),
    );
  });
});

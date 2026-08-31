import * as THREE from "three";
import { describe, expect, it } from "vitest";

import {
  buildWaypointEdges,
  CORRIDOR_WAYPOINTS,
  DEFAULT_MAX_EDGE_LENGTH,
  type Waypoint,
} from "../../src/content/corridor-waypoints";
import { OBSTACLES } from "../../src/content/npcs";
import { WORLD_COLLISION_WALLS } from "../../src/content/world-layout";
import type { AABB } from "../../src/engine/collision";
import { planNpcPath } from "../../src/engine/npc-path";
import { ROOM_FURNITURE_AABBS } from "../../src/engine/npc-spawn-validator";

const point = (x: number, z: number): THREE.Vector3 => new THREE.Vector3(x, 0, z);

function segmentTouchesBox(a: THREE.Vector3, b: THREE.Vector3, box: AABB): boolean {
  let near = 0;
  let far = 1;
  for (const [origin, delta, min, max] of [
    [a.x, b.x - a.x, box.minX, box.maxX],
    [a.z, b.z - a.z, box.minZ, box.maxZ],
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

function expectClear(path: readonly THREE.Vector3[], obstacles: readonly AABB[]): void {
  for (let index = 1; index < path.length; index++) {
    expect(
      obstacles.some((box) => segmentTouchesBox(path[index - 1]!, path[index]!, box)),
    ).toBe(false);
  }
}

describe("planNpcPath", () => {
  it("returns exactly the direct two-point path when line of sight is clear", () => {
    const from = point(0, 0);
    const to = point(4, 0);
    const waypoints: Waypoint[] = [
      { id: "a", position: { x: 0, y: 0, z: 2 } },
      { id: "b", position: { x: 4, y: 0, z: 2 } },
    ];
    const path = planNpcPath(from, to, waypoints, [["a", "b"]], []);
    expect(path).toHaveLength(2);
    expect(path![0]).not.toBe(from);
    expect(path![1]).not.toBe(to);
    expect(path!.map((entry) => entry.toArray())).toEqual([from.toArray(), to.toArray()]);
  });

  it("routes a blocked direct path through clear waypoints", () => {
    const obstacle: AABB = { minX: 2, maxX: 4, minZ: -1, maxZ: 1 };
    const waypoints: Waypoint[] = [
      { id: "left", position: { x: 1, y: 0, z: 2 } },
      { id: "right", position: { x: 5, y: 0, z: 2 } },
    ];
    const path = planNpcPath(point(0, 0), point(6, 0), waypoints, [["left", "right"]], [obstacle]);
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThan(2);
    expectClear(path!, [obstacle]);
  });

  it("returns null when a clear target is fully enclosed and no graph route exists", () => {
    const obstacles: AABB[] = [
      { minX: 3, maxX: 5, minZ: 1, maxZ: 2 },
      { minX: 3, maxX: 5, minZ: -2, maxZ: -1 },
      { minX: 2, maxX: 3, minZ: -2, maxZ: 2 },
      { minX: 5, maxX: 6, minZ: -2, maxZ: 2 },
    ];
    expect(planNpcPath(point(0, 0), point(4, 0), [], [], obstacles)).toBeNull();
  });

  it("depenetrates an endpoint inside an obstacle when no graph route exists", () => {
    const obstacle: AABB = { minX: 3, maxX: 5, minZ: -1, maxZ: 1 };
    const path = planNpcPath(point(0, 0), point(4, 0), [], [], [obstacle]);
    expect(path).not.toBeNull();
    expect(path).toHaveLength(2);
    const endpoint = path![1]!;
    expect(
      endpoint.x >= obstacle.minX && endpoint.x <= obstacle.maxX &&
        endpoint.z >= obstacle.minZ && endpoint.z <= obstacle.maxZ,
    ).toBe(false);
  });

  it("uses stable waypoint-id tie-breaking for equal-cost routes", () => {
    const obstacle: AABB = { minX: 2, maxX: 4, minZ: -1, maxZ: 1 };
    const waypoints: Waypoint[] = [
      { id: "start", position: { x: 1, y: 0, z: 0 } },
      { id: "alpha", position: { x: 3, y: 0, z: 2 } },
      { id: "beta", position: { x: 3, y: 0, z: -2 } },
      { id: "goal", position: { x: 5, y: 0, z: 0 } },
    ];
    const edges: readonly [string, string][] = [
      ["start", "alpha"], ["alpha", "goal"],
      ["start", "beta"], ["beta", "goal"],
    ];
    const first = planNpcPath(point(0, 0), point(6, 0), waypoints, edges, [obstacle]);
    const second = planNpcPath(point(0, 0), point(6, 0), waypoints, edges, [obstacle]);
    expect(first!.map((entry) => entry.toArray())).toEqual(second!.map((entry) => entry.toArray()));
    expect(first!.some((entry) => entry.z === 2)).toBe(true);
    expect(first!.some((entry) => entry.z === -2)).toBe(false);
  });

  it("connects every ordered pair in the real waypoint graph with clear segments", () => {
    const obstacles: readonly AABB[] = [
      ...OBSTACLES,
      ...ROOM_FURNITURE_AABBS,
      ...WORLD_COLLISION_WALLS,
    ];
    const edges = buildWaypointEdges(CORRIDOR_WAYPOINTS, obstacles, DEFAULT_MAX_EDGE_LENGTH);
    for (const fromWaypoint of CORRIDOR_WAYPOINTS) {
      for (const toWaypoint of CORRIDOR_WAYPOINTS) {
        if (fromWaypoint.id === toWaypoint.id) continue;
        const path = planNpcPath(
          new THREE.Vector3(fromWaypoint.position.x, fromWaypoint.position.y, fromWaypoint.position.z),
          new THREE.Vector3(toWaypoint.position.x, toWaypoint.position.y, toWaypoint.position.z),
          CORRIDOR_WAYPOINTS,
          edges,
          obstacles,
        );
        expect(path, `${fromWaypoint.id} -> ${toWaypoint.id}`).not.toBeNull();
        expectClear(path!, obstacles);
      }
    }
  });
});

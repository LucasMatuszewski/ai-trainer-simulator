// @vitest-environment jsdom
import * as THREE from "three";
import { describe, expect, it } from "vitest";
import {
  buildWaypointEdges,
  CORRIDOR_WAYPOINTS,
  DEFAULT_MAX_EDGE_LENGTH,
  type Waypoint,
} from "../../../src/content/corridor-waypoints";
import { NPCS } from "../../../src/content/npcs";
import { withRobotObstacle, type AABB } from "../../../src/engine/collision";
import { createNpcController } from "../../../src/engine/npc-controller";
import { planNpcPath } from "../../../src/engine/npc-path";
import { getNpcObstacles } from "../../../src/engine/npc-spawn-validator";
import type { NpcId } from "../../../src/types";
import { planRobotPath, traceRobotStep } from "../../../src/webmcp/robot-collision";

const point = (x: number, z: number) => new THREE.Vector3(x, 0, z);
const desk: AABB = { minX: 2, maxX: 4, minZ: -1, maxZ: 1 };
const waypoints: Waypoint[] = [
  { id: "left", position: { x: 1, y: 0, z: 2 } },
  { id: "right", position: { x: 5, y: 0, z: 2 } },
];
const edges: readonly [string, string][] = [["left", "right"]];

function segmentIntersectsBox(a: THREE.Vector3, b: THREE.Vector3, box: AABB): boolean {
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

function pathCrosses(path: readonly THREE.Vector3[], box: AABB): boolean {
  return path.slice(1).some((end, index) => segmentIntersectsBox(path[index]!, end, box));
}

describe("robot route planning", () => {
  it("routes a robot around a desk with body clearance", () => {
    const path = planRobotPath(point(0, 0), point(6, 0), waypoints, edges, [desk], 0.3);
    expect(path).not.toBeNull();
    expect(path!.length).toBeGreaterThan(2);
    expect(pathCrosses(path!, { minX: 1.7, maxX: 4.3, minZ: -1.3, maxZ: 1.3 })).toBe(false);
  });

  it("keeps an unobstructed robot route direct", () => {
    expect(planRobotPath(point(0, 0), point(6, 0), waypoints, edges, [], 0.3)?.map((p) => p.toArray()))
      .toEqual([[0, 0, 0], [6, 0, 0]]);
  });

  it("stops a raw step at a narrow desk instead of tunneling past it", () => {
    const narrowDesk = { minX: 1, maxX: 2, minZ: -1, maxZ: 1 };
    const path = traceRobotStep(
      { x: 0, z: 0 }, 3, 0, 0.3,
      { minX: -10, maxX: 10, minZ: -10, maxZ: 10 }, [narrowDesk],
    );
    expect(path.at(-1)!.x).toBeLessThanOrEqual(0.7 + 1e-6);
    expect(path.at(-1)!.x).toBeGreaterThan(0.5);
    for (let index = 1; index < path.length; index += 1) {
      expect(segmentIntersectsBox(point(path[index - 1]!.x, path[index - 1]!.z),
        point(path[index]!.x, path[index]!.z), narrowDesk)).toBe(false);
    }
  });

  it("uses the full NPC obstacle set for a route from reception into the office", () => {
    const obstacles = getNpcObstacles();
    const graph = buildWaypointEdges(CORRIDOR_WAYPOINTS, obstacles, DEFAULT_MAX_EDGE_LENGTH);
    const path = planRobotPath(point(0, 14), point(0, 0), CORRIDOR_WAYPOINTS, graph, obstacles, 0.3);
    expect(path).not.toBeNull();
    for (const box of obstacles) {
      expect(pathCrosses(path!, {
        minX: box.minX - 0.3,
        maxX: box.maxX + 0.3,
        minZ: box.minZ - 0.3,
        maxZ: box.maxZ + 0.3,
      })).toBe(false);
    }
  });

  it("gives the NPC planner a robot obstacle without changing its no-robot input", () => {
    const start = point(-2, 0);
    const goal = point(2, 0);
    const robot = { x: 0, z: 0 };
    const detourWaypoints: Waypoint[] = [
      { id: "left", position: { x: -1, y: 0, z: 1.5 } },
      { id: "right", position: { x: 1, y: 0, z: 1.5 } },
    ];
    const staticObstacles: AABB[] = [];
    const withRobot = withRobotObstacle(staticObstacles, robot, 0.45);
    const routed = planNpcPath(start, goal, detourWaypoints, [["left", "right"]], withRobot);
    expect(routed).not.toBeNull();
    expect(pathCrosses(routed!, { minX: -0.45, maxX: 0.45, minZ: -0.45, maxZ: 0.45 })).toBe(false);
    expect(withRobotObstacle(staticObstacles, null, 0.45)).toBe(staticObstacles);
    expect(planNpcPath(start, goal, detourWaypoints, [["left", "right"]], withRobotObstacle(staticObstacles, null, 0.45))?.map((p) => p.toArray()))
      .toEqual([[ -2, 0, 0 ], [ 2, 0, 0 ]]);
  });
});

function runNpcWalk(withRobot: boolean): THREE.Vector3[] {
  const scene = new THREE.Scene();
  const actor = new THREE.Group();
  actor.position.set(-2, 0, 0);
  scene.add(actor);
  if (withRobot) {
    // Parked BESIDE the corridor centre line (a realistic stop), so the
    // direct lane is blocked but the escape ladder has graph room to
    // detour — a robot dead-centre on the only corridor line is the
    // pathological jam case, not the WS9a scenario.
    const robot = new THREE.Group();
    robot.name = "agent-companion-body";
    robot.position.set(0, 0, 0.55);
    scene.add(robot);
  }
  const bartek = NPCS.find((npc) => npc.id === "bartek")!;
  const controller = createNpcController(
    [bartek], { bartek: actor } as unknown as Record<NpcId, THREE.Object3D>,
    () => "afternoon", () => 1, () => 0.5, () => false,
    { arrivals: false, chatter: false, playSfx: () => {} },
  );
  controller.update(0);
  actor.position.set(-2, 0, 0);
  controller.setOverride("bartek", { position: { x: 2, y: 0, z: 0 }, face: 0, state: "at-desk" });
  const path = [actor.position.clone()];
  for (let i = 0; i < 120; i += 1) {
    controller.update(0.1);
    path.push(actor.position.clone());
    if (actor.userData.npcState !== "walking") break;
  }
  controller.destroy();
  return path;
}

describe("NPC avoidance of the companion", () => {
  it("routes around the robot instead of crossing its body", () => {
    const path = runNpcWalk(true);
    expect(path[path.length - 1]!.x).toBeGreaterThan(1.5);
    expect(pathCrosses(path, { minX: -0.45, maxX: 0.45, minZ: 0.25, maxZ: 0.85 })).toBe(false);
  });

  it("keeps the direct NPC walk when no robot exists", () => {
    const path = runNpcWalk(false);
    expect(path[path.length - 1]!.x).toBeGreaterThan(1.5);
    expect(path.every((p) => Math.abs(p.z) < 1e-6)).toBe(true);
  });
});

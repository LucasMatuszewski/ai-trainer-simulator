/**
 * C-70: wires the pure `robot-brain` state machines to their meshes
 * and drops them into the scene. This is the only file that touches
 * three.js for the robot fleet - the brain and the route data are
 * pure and unit-tested on their own.
 */
import * as THREE from "three";
import type { TimeOfDay } from "../types";
import { ROBOT_OBSTACLES, ROBOT_PATROLS, type RobotId } from "../content/robot-patrols";
import { createRobotBrain, type JanuszSnapshot, type RobotBrain } from "./robot-brain";
import { makeRobotVacuum } from "./furniture/robot-vacuum";
import { makeRobotGardener } from "./furniture/robot-gardener";
import { makeRobotRunner } from "./furniture/robot-runner";

interface RobotMeshHandle {
  group: THREE.Group;
  setWorking: (working: boolean) => void;
  animate: (dt: number, moving: boolean) => void;
}

const MESH_FACTORIES: Record<RobotId, () => RobotMeshHandle> = {
  vacuum: makeRobotVacuum,
  gardener: makeRobotGardener,
  runner: makeRobotRunner,
};

export interface RobotFleetInspection {
  id: RobotId;
  state: string;
  position: { x: number; z: number };
  working: boolean;
  followingJanusz: boolean;
}

export interface JanuszRobotFleet {
  group: THREE.Group;
  update: (dt: number) => void;
  /** Debug/e2e hook: the live state of every robot in the fleet. */
  inspect: () => RobotFleetInspection[];
}

export function createJanuszRobotFleet(
  scene: THREE.Scene,
  getPeriod: () => TimeOfDay,
  getJanusz: () => JanuszSnapshot | null,
  rng: () => number = Math.random,
): JanuszRobotFleet {
  const group = new THREE.Group();
  group.name = "janusz-robot-fleet";
  scene.add(group);

  const entries = (Object.keys(ROBOT_PATROLS) as RobotId[]).map((id) => {
    const route = ROBOT_PATROLS[id];
    const brain: RobotBrain = createRobotBrain({
      route,
      obstacles: ROBOT_OBSTACLES,
      rng,
      getPeriod,
      getJanusz,
    });
    const mesh = MESH_FACTORIES[id]();
    mesh.group.name = `robot-${id}`;
    mesh.group.position.set(route.dock.x, 0, route.dock.z);
    group.add(mesh.group);
    return { id, brain, mesh, lastX: route.dock.x, lastZ: route.dock.z };
  });

  function update(dt: number): void {
    for (const entry of entries) {
      const view = entry.brain.update(dt);
      entry.mesh.group.position.set(view.x, 0, view.z);
      entry.mesh.group.rotation.y = view.face;
      const moving = Math.abs(view.x - entry.lastX) > 1e-5 || Math.abs(view.z - entry.lastZ) > 1e-5;
      entry.lastX = view.x;
      entry.lastZ = view.z;
      entry.mesh.setWorking(view.working);
      entry.mesh.animate(dt, moving);
    }
  }

  function inspect(): RobotFleetInspection[] {
    return entries.map((entry) => {
      const view = entry.brain.getView();
      return {
        id: entry.id,
        state: view.state,
        position: { x: view.x, z: view.z },
        working: view.working,
        followingJanusz: view.followingJanusz,
      };
    });
  }

  return { group, update, inspect };
}

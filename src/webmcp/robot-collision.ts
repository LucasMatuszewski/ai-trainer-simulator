/** Headless collision contracts shared by the WebMCP companion and NPC avoidance. */
import * as THREE from "three";
import type { Waypoint } from "../content/corridor-waypoints";
import { applyWithCollision, type AABB, type XZ } from "../engine/collision";
import { planNpcPath } from "../engine/npc-path";

function segmentIntersects(a: THREE.Vector3, b: THREE.Vector3, box: AABB): boolean {
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

/** Plan through the shared NPC graph, treating the robot as a circle of radius `radius`. */
export function planRobotPath(
  start: THREE.Vector3,
  goal: THREE.Vector3,
  waypoints: readonly Waypoint[],
  edges: readonly [string, string][],
  obstacles: readonly AABB[],
  radius: number,
): THREE.Vector3[] | null {
  const inflated = obstacles.map((box) => ({
    minX: box.minX - radius,
    maxX: box.maxX + radius,
    minZ: box.minZ - radius,
    maxZ: box.maxZ + radius,
  }));
  const route = planNpcPath(start, goal, waypoints, edges, inflated);
  if (route === null) return null;
  // planNpcPath may return a last-resort two-point depenetration route.
  // Reject one that still clips furniture instead of animating through it.
  for (let index = 1; index < route.length; index += 1) {
    if (inflated.some((box) => segmentIntersects(route[index - 1]!, route[index]!, box))) return null;
  }
  return route;
}

/** Trace a short manual step in small axis-aligned legs so an endpoint cannot tunnel through furniture. */
export function traceRobotStep(
  start: XZ,
  deltaX: number,
  deltaZ: number,
  radius: number,
  bounds: AABB,
  obstacles: readonly AABB[],
): XZ[] {
  const distance = Math.hypot(deltaX, deltaZ);
  const count = Math.max(1, Math.ceil(distance / 0.1));
  const path: XZ[] = [{ ...start }];
  let current = { ...start };
  for (let index = 0; index < count; index += 1) {
    const before = current;
    const xStep = applyWithCollision(current, radius, deltaX / count, 0, bounds, obstacles);
    if (xStep.x !== current.x) {
      path.push(xStep);
      current = xStep;
    }
    const zStep = applyWithCollision(current, radius, 0, deltaZ / count, bounds, obstacles);
    if (zStep.z !== current.z) {
      path.push(zStep);
      current = zStep;
    }
    if (current.x === before.x && current.z === before.z) break;
  }
  return path;
}

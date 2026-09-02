import * as THREE from "three";

import type { Waypoint } from "../content/corridor-waypoints";
import type { AABB } from "./collision";

interface HeapEntry {
  id: string;
  score: number;
}

class MinHeap {
  private readonly entries: HeapEntry[] = [];

  get size(): number {
    return this.entries.length;
  }

  push(entry: HeapEntry): void {
    this.entries.push(entry);
    let index = this.entries.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (compareEntries(this.entries[parent]!, entry) <= 0) break;
      this.entries[index] = this.entries[parent]!;
      index = parent;
    }
    this.entries[index] = entry;
  }

  pop(): HeapEntry | undefined {
    const first = this.entries[0];
    const last = this.entries.pop();
    if (first === undefined || last === undefined || this.entries.length === 0) return first;
    let index = 0;
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      if (left >= this.entries.length) break;
      const child = right < this.entries.length &&
        compareEntries(this.entries[right]!, this.entries[left]!) < 0 ? right : left;
      if (compareEntries(last, this.entries[child]!) <= 0) break;
      this.entries[index] = this.entries[child]!;
      index = child;
    }
    this.entries[index] = last;
    return first;
  }
}

function compareEntries(left: HeapEntry, right: HeapEntry): number {
  return left.score - right.score || left.id.localeCompare(right.id);
}

function distanceXZ(left: THREE.Vector3, right: THREE.Vector3): number {
  return Math.hypot(right.x - left.x, right.z - left.z);
}

function waypointVector(waypoint: Waypoint): THREE.Vector3 {
  return new THREE.Vector3(waypoint.position.x, waypoint.position.y, waypoint.position.z);
}

function segmentTouchesAabb(from: THREE.Vector3, to: THREE.Vector3, obstacle: AABB): boolean {
  let near = 0;
  let far = 1;
  for (const [origin, delta, min, max] of [
    [from.x, to.x - from.x, obstacle.minX, obstacle.maxX],
    [from.z, to.z - from.z, obstacle.minZ, obstacle.maxZ],
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

function isClear(from: THREE.Vector3, to: THREE.Vector3, obstacles: readonly AABB[]): boolean {
  return !obstacles.some((obstacle) => segmentTouchesAabb(from, to, obstacle));
}

function nearestReachableWaypoint(
  point: THREE.Vector3,
  waypoints: readonly Waypoint[],
  obstacles: readonly AABB[],
): Waypoint | undefined {
  return [...waypoints]
    .filter((waypoint) => isClear(point, waypointVector(waypoint), obstacles))
    .sort((left, right) => {
      const distanceDifference = distanceXZ(point, waypointVector(left)) -
        distanceXZ(point, waypointVector(right));
      return distanceDifference || left.id.localeCompare(right.id);
    })[0];
}

function depenetrateEndpoint(point: THREE.Vector3, obstacles: readonly AABB[]): THREE.Vector3 | null {
  const result = point.clone();
  let changed = false;
  for (let iteration = 0; iteration < obstacles.length + 1; iteration++) {
    const containing = obstacles.find((obstacle) =>
      result.x >= obstacle.minX && result.x <= obstacle.maxX &&
      result.z >= obstacle.minZ && result.z <= obstacle.maxZ);
    if (containing === undefined) return changed ? result : null;
    changed = true;
    const candidates = [
      { distance: result.x - containing.minX, axis: "x" as const, value: containing.minX - 0.001 },
      { distance: containing.maxX - result.x, axis: "x" as const, value: containing.maxX + 0.001 },
      { distance: result.z - containing.minZ, axis: "z" as const, value: containing.minZ - 0.001 },
      { distance: containing.maxZ - result.z, axis: "z" as const, value: containing.maxZ + 0.001 },
    ].sort((left, right) => left.distance - right.distance || left.axis.localeCompare(right.axis));
    result[candidates[0]!.axis] = candidates[0]!.value;
  }
  return null;
}

export function planNpcPath(
  from: THREE.Vector3,
  to: THREE.Vector3,
  waypoints: readonly Waypoint[],
  edges: readonly [string, string][],
  obstacles: readonly AABB[],
): THREE.Vector3[] | null {
  if (isClear(from, to, obstacles)) return [from.clone(), to.clone()];

  const start = nearestReachableWaypoint(from, waypoints, obstacles);
  const goal = nearestReachableWaypoint(to, waypoints, obstacles);
  if (start !== undefined && goal !== undefined) {
    const waypointById = new Map(waypoints.map((waypoint) => [waypoint.id, waypoint]));
    const neighbors = new Map<string, string[]>();
    for (const [left, right] of edges) {
      neighbors.set(left, [...(neighbors.get(left) ?? []), right]);
      neighbors.set(right, [...(neighbors.get(right) ?? []), left]);
    }
    for (const adjacent of neighbors.values()) adjacent.sort((left, right) => left.localeCompare(right));

    const goalVector = waypointVector(goal);
    // Boundary contact along a waypoint edge is fine (grazing a corner
    // is part of the tie-breaking geometry the tests pin), so the
    // re-validation shrinks obstacles by an epsilon and only rejects
    // real crossings.
    const planningAabbs = obstacles.map((obstacle) => ({
      minX: obstacle.minX + 1e-6,
      maxX: obstacle.maxX - 1e-6,
      minZ: obstacle.minZ + 1e-6,
      maxZ: obstacle.maxZ - 1e-6,
    }));
    const open = new MinHeap();
    const cost = new Map<string, number>([[start.id, 0]]);
    const previous = new Map<string, string>();
    open.push({ id: start.id, score: distanceXZ(waypointVector(start), goalVector) });

    while (open.size > 0) {
      const current = open.pop()!;
      if (current.id === goal.id) {
        const ids = [goal.id];
        while (ids[0] !== start.id) ids.unshift(previous.get(ids[0]!)!);
        return [
          from.clone(),
          ...ids.map((id) => waypointVector(waypointById.get(id)!)),
          to.clone(),
        ];
      }
      const currentWaypoint = waypointById.get(current.id);
      if (currentWaypoint === undefined) continue;
      for (const neighborId of neighbors.get(current.id) ?? []) {
        const neighbor = waypointById.get(neighborId);
        if (neighbor === undefined) continue;
        // C-62 fix: re-validate each edge against the caller's
        // obstacles. The static edges are built without the dynamic
        // blocker boxes (avoid-people replans), so an A* that trusts
        // them blindly routes straight through the person the replan
        // is trying to avoid - the Janusz-at-Klaudia's-desk jam.
        if (!isClear(waypointVector(currentWaypoint), waypointVector(neighbor), planningAabbs)) {
          continue;
        }
        const candidateCost = cost.get(current.id)! +
          distanceXZ(waypointVector(currentWaypoint), waypointVector(neighbor));
        const knownCost = cost.get(neighborId);
        if (knownCost !== undefined && candidateCost >= knownCost - 1e-9) continue;
        cost.set(neighborId, candidateCost);
        previous.set(neighborId, current.id);
        open.push({
          id: neighborId,
          score: candidateCost + distanceXZ(waypointVector(neighbor), goalVector),
        });
      }
    }
  }

  const depenetrated = depenetrateEndpoint(to, obstacles);
  return depenetrated === null ? null : [from.clone(), depenetrated];
}

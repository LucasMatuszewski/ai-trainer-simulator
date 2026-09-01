interface AabbLike {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface Waypoint {
  id: string;
  position: { x: number; y: number; z: number };
}

export const DEFAULT_MAX_EDGE_LENGTH = 10;

export const CORRIDOR_WAYPOINTS: readonly Waypoint[] = [
  { id: "main-center", position: { x: 0, y: 0, z: 0 } },
  { id: "main-west", position: { x: -4.5, y: 0, z: 0 } },
  { id: "main-east", position: { x: 4.5, y: 0, z: 0 } },
  { id: "main-north", position: { x: 0, y: 0, z: -5 } },
  { id: "main-south", position: { x: 0, y: 0, z: 5 } },
  { id: "door-main-kitchen", position: { x: 9.65, y: 0, z: 0 } },
  { id: "door-main-ceo", position: { x: 0, y: 0, z: -9.8 } },
  { id: "door-main-meeting", position: { x: 0, y: 0, z: 9.9 } },
  // C-51: the office entrance itself. Without a node here, an NPC
  // standing at the front door (0, 8.4) snaps to `door-main-meeting`
  // (1.5 m away, but BEHIND them inside the meeting room) instead of
  // `main-south` (3.4 m ahead), so every morning arrival walked north
  // into the meeting room before turning back - measured as a 23.7 s
  // pacing loop for Klaudia on the C-51 morning probe.
  { id: "door-main-entry", position: { x: 0, y: 0, z: 8.4 } },
  // The toilet is entered through the narrow door at the main
  // office's SW corner (gap x [-9, -8.5], z [9, 9.5]), then north
  // through the antechamber strip east of the toilet-east-south
  // sliver (x [-9, -8.78], z [9.5, 10.25]), then west through the
  // toilet's open east side (z [10.25, 17.75]). Four waypoints
  // thread it: office-side approach, both sides of the door, and
  // the antechamber.
  { id: "door-main-toilet", position: { x: -7.2, y: 0, z: 8.6 } },
  { id: "toilet-door-west", position: { x: -8.7, y: 0, z: 8.75 } },
  { id: "toilet-door-north", position: { x: -8.7, y: 0, z: 9.7 } },
  { id: "toilet-antechamber", position: { x: -8.64, y: 0, z: 11.5 } },
  { id: "toilet-entry", position: { x: -9.4, y: 0, z: 12 } },

  { id: "desk-bartek", position: { x: -7.7, y: 0, z: -5 } },
  { id: "desk-tomek", position: { x: -7.7, y: 0, z: -1.5 } },
  { id: "desk-janusz", position: { x: -7.7, y: 0, z: 2 } },
  { id: "desk-klaudia", position: { x: -7.7, y: 0, z: 5.5 } },
  { id: "desk-marek", position: { x: 7.7, y: 0, z: -5 } },
  { id: "desk-ania", position: { x: 7.7, y: 0, z: -2.5 } },
  { id: "desk-grazyna", position: { x: 7.7, y: 0, z: 2 } },
  { id: "desk-kasia", position: { x: 7.7, y: 0, z: 5.5 } },
  { id: "desk-maciek", position: { x: -3, y: 0, z: -7.7 } },
  { id: "desk-przemek", position: { x: 3, y: 0, z: -7.7 } },
  { id: "desk-pawel", position: { x: -3, y: 0, z: 7.7 } },
  { id: "desk-zosia", position: { x: 3, y: 0, z: 7.7 } },
  { id: "desk-dawid", position: { x: 0, y: 0, z: -14.8 } },

  { id: "kitchen-fridge", position: { x: 10.6, y: 0, z: -5.5 } },
  { id: "kitchen-coffee", position: { x: 13, y: 0, z: -5.3 } },
  { id: "kitchen-microwave", position: { x: 15.2, y: 0, z: -5.3 } },
  { id: "kitchen-sink", position: { x: 17.5, y: 0, z: -5.3 } },
  { id: "kitchen-table", position: { x: 14, y: 0, z: 1.2 } },
  { id: "door-kitchen-training", position: { x: 19.8, y: 0, z: -5 } },

  { id: "meeting-table", position: { x: -2.2, y: 0, z: 14 } },
  { id: "meeting-south", position: { x: 0, y: 0, z: 18 } },
  // The big table (x [-1.5, 1.5], z [11.25, 16.75]) splits the
  // room: meeting-south sits in the north aisle and needs the west
  // aisle to reach the door or the table waypoint.
  { id: "meeting-west-north", position: { x: -3, y: 0, z: 17 } },
  { id: "meeting-west-south", position: { x: -3, y: 0, z: 10.5 } },
  { id: "toilet-sink", position: { x: -14, y: 0, z: 10.7 } },
  { id: "toilet-stall", position: { x: -16, y: 0, z: 14.5 } },
  { id: "training-row-front", position: { x: 20, y: 0, z: -10 } },
  { id: "training-row-back", position: { x: 26, y: 0, z: -14 } },
  { id: "training-speaker", position: { x: 21.5, y: 0, z: -17 } },
] as const;

function segmentTouchesAabb(
  from: { x: number; z: number },
  to: { x: number; z: number },
  obstacle: AabbLike,
): boolean {
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

export function buildWaypointEdges(
  waypoints: readonly Waypoint[],
  obstacles: readonly AabbLike[],
  maxEdgeLength: number,
): readonly [string, string][] {
  const ordered = [...waypoints].sort((left, right) => left.id.localeCompare(right.id));
  const edges: [string, string][] = [];
  for (let leftIndex = 0; leftIndex < ordered.length; leftIndex++) {
    const left = ordered[leftIndex]!;
    for (let rightIndex = leftIndex + 1; rightIndex < ordered.length; rightIndex++) {
      const right = ordered[rightIndex]!;
      const distance = Math.hypot(
        right.position.x - left.position.x,
        right.position.z - left.position.z,
      );
      if (distance > maxEdgeLength) continue;
      if (obstacles.some((obstacle) => segmentTouchesAabb(left.position, right.position, obstacle))) {
        continue;
      }
      edges.push([left.id, right.id]);
    }
  }
  return edges;
}

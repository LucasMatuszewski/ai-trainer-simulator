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
  // C-57: a waypoint in the SW corner of the main office,
  // OUTSIDE the server rack (which is at x=[-8.5, -7.5],
  // z=[7.5, 8.5]). x=-8.7 is between the west wall (-9.5..-9)
  // and the server rack. z=8.6 is north of the server rack
  // (z>8.5). The line from here to the W-wall desk column
  // (x=-7.7) goes diagonally through the SW corner, clearing
  // the server rack (the line at z=8 is at x=-8.7 + (8-8.6)/
  // (any_z-8.6) * delta_x, and as long as the line stays west
  // of the server rack at z=8, it doesn't cross).
  { id: "desk-aisle-west", position: { x: -8.7, y: 0, z: 8.6 } },
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
  // C-57 (Lucas, 2026-09-01): the toilet moved from the back-SW
  // corner of the main office to a new room east of the kitchen.
  // The doorway is in the kitchen's east wall at z=[5, 7] (the
  // south end of the kitchen, under the menu sign). Six waypoints
  // thread the route: the kitchen side of the door, the toilet
  // side of the door, the basin by the door, the urinal on the
  // east wall, and a stop in front of each stall.
  //
  // After Lucas's 2026-09-01 re-layout: stall 1 at [20.6, 0, 2.9]
  // (west) and stall 2 at [21.6, 0, 2.9] (east), with 1.0m
  // between centers (walls touch with a 0.14m visible gap). The
  // urinal moved from z=5 to z=2 (back-east corner, on the south
  // wall). Stops in front of the stall doors (which are at z=3.7,
  // the front of each stall, +Z) are placed at z=4.2 so the NPC
  // stands just south of the door looking +Z into the stall.
  { id: "door-kitchen-toilet", position: { x: 19.25, y: 0, z: 6 } },
  { id: "toilet-entry", position: { x: 20.5, y: 0, z: 6 } },
  { id: "toilet-basin", position: { x: 22, y: 0, z: 5.5 } },
  { id: "toilet-urinal", position: { x: 23.0, y: 0, z: 2.5 } },
  { id: "toilet-stall-west", position: { x: 20.6, y: 0, z: 4.2 } },
  { id: "toilet-stall-east", position: { x: 21.6, y: 0, z: 4.2 } },

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
  // C-57: a waypoint in the south-east of the kitchen, in front
  // of the new toilet doorway. Bridges the route from
  // kitchen-table (14, 1.2) to door-kitchen-toilet (19.25, 6) -
  // the direct line passes through both kitchen tables, so the
  // graph needs this intermediate stop to thread the path.
  { id: "kitchen-toilet-corner", position: { x: 17, y: 0, z: 4 } },
  { id: "door-kitchen-training", position: { x: 19.8, y: 0, z: -5 } },

  { id: "meeting-table", position: { x: -2.2, y: 0, z: 14 } },
  { id: "meeting-south", position: { x: 0, y: 0, z: 18 } },
  // The big table (x [-1.5, 1.5], z [11.25, 16.75]) splits the
  // room: meeting-south sits in the north aisle and needs the west
  // aisle to reach the door or the table waypoint.
  { id: "meeting-west-north", position: { x: -3, y: 0, z: 17 } },
  { id: "meeting-west-south", position: { x: -3, y: 0, z: 10.5 } },
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

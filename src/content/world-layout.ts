import type { AABB } from "../engine/collision";

export type Vector3Tuple = readonly [number, number, number];

export interface WorldWall extends AABB {
  id: string;
}

export interface WorldDoorway {
  id: string;
  from: AABB;
  to: AABB;
  width: number;
}

export interface WorldFurniture {
  type: string;
  position: Vector3Tuple;
  size?: Vector3Tuple;
  rotationY?: number;
  color?: number;
  label?: string;
}

export interface WorldSign {
  text: string;
  position: Vector3Tuple;
  face: number;
  color: number;
  size?: readonly [number, number];
}

export interface WorldRoom {
  id: string;
  name: string;
  floor: AABB;
  walls: WorldWall[];
  doorways: WorldDoorway[];
  furniture: WorldFurniture[];
  signs: WorldSign[];
  floorColor: number;
  wallColor: number;
}

const wall = (id: string, minX: number, maxX: number, minZ: number, maxZ: number): WorldWall => ({
  id,
  minX,
  maxX,
  minZ,
  maxZ,
});

const gap = (
  id: string,
  from: AABB,
  to: AABB,
  width = 2.5,
): WorldDoorway => ({ id, from, to, width });

/** The original office shell, split only where the three open doorways are. */
export const MAIN_OFFICE_WALLS: WorldWall[] = [
  wall("main-north-west", -9, -1.25, -9.5, -9),
  wall("main-north-east", 1.25, 9, -9.5, -9),
  wall("main-east-north", 9, 9.5, -9, -1.25),
  wall("main-east-south", 9, 9.5, 1.25, 9),
  // L-2026-08-30-01: south wall split to leave a doorway into the
  // toilet room (gap from x=-9 to x=-8.5 at z=9..9.5). The toilet
  // room's own south wall (inside the toilet) doubles as the main
  // office's south wall for that x range, so the main office does
  // not need a separate wall segment there.
  wall("main-south-west", -8.5, -1.25, 9, 9.5),
  wall("main-south-east", 1.25, 9, 9, 9.5),
  wall("main-west", -9.5, -9, -9, 9),
];

export const MAIN_OFFICE_DOORWAYS: WorldDoorway[] = [
  // C-35 / L-2026-08-31-02 + L-2026-08-31-03: the doorway at
  // z=-9 now opens into the CEO office (formerly the training
  // room). The training room has moved to the former CEO office
  // footprint east of the kitchen. The doorway id is now
  // "main-to-ceo"; downstream code uses the doorway coordinates,
  // not the id, so this is a naming fix only.
  gap(
    "main-to-ceo",
    { minX: -1.25, maxX: 1.25, minZ: -9.5, maxZ: -9 },
    { minX: -1.25, maxX: 1.25, minZ: -9, maxZ: -8.5 },
  ),
  gap(
    "main-to-kitchen",
    { minX: 9, maxX: 9.5, minZ: -1.25, maxZ: 1.25 },
    { minX: 8.5, maxX: 9, minZ: -1.25, maxZ: 1.25 },
  ),
  gap(
    "main-to-meeting",
    { minX: -1.25, maxX: 1.25, minZ: 9, maxZ: 9.5 },
    { minX: -1.25, maxX: 1.25, minZ: 8.5, maxZ: 9 },
  ),
  // L-2026-08-30-01: doorway to the new toilet room off the
  // south-west corner of the main office. The main office's south
  // wall has a gap here for the door.
  gap(
    "main-to-toilet",
    { minX: -9, maxX: -8.5, minZ: 9, maxZ: 9.5 },
    { minX: -8.5, maxX: -9, minZ: 9, maxZ: 9.5 },
  ),
];

export const WORLD_ROOMS: WorldRoom[] = [
  {
    // C-35 / L-2026-08-31-02: the CEO office now sits where the
    // training room used to be (north of the main office, x=[-8, 8],
    // z=[-19, -9]). The glass wall is on the SOUTH side (z=-9 to
    // z=-8.78) so the player in the main office can see the CEO at
    // his desk. The Batman sign is on the NORTH wall facing south
    // so it is visible through the glass to the main office. The
    // doorway from the main office (MAIN_OFFICE_DOORWAYS[0]) opens
    // into this room.
    id: "ceo-office",
    name: "CEO Office",
    floor: { minX: -8, maxX: 8, minZ: -19, maxZ: -9 },
    walls: [
      wall("ceo-north", -8, 8, -19.5, -19),
      wall("ceo-west", -8.5, -8, -19, -9),
      wall("ceo-east", 8, 8.5, -19, -9),
      // Keep the shared boundary inside the CEO office so it
      // cannot occupy the same depth range as the main office's
      // north wall. There is a doorway gap at x=[-1.25, 1.25] for
      // the door.
      wall("ceo-south-west", -8, -1.25, -9.5, -9.22),
      wall("ceo-south-east", 1.25, 8, -9.5, -9.22),
      // Glass wall facing the main office. Split into two
      // segments around the doorway so the doorway itself stays
      // open.
      wall("glass", -8, -1.25, -9, -8.78),
      wall("glass", 1.25, 8, -9, -8.78),
    ],
    doorways: [MAIN_OFFICE_DOORWAYS[0]!],
    floorColor: 0x4d3b2b,
    wallColor: 0x4a2f24,
    furniture: [
      // The CEO desk is huge (C-38) and faces the glass wall
      // (south) so the player can see the CEO at it from the
      // main office.
      { type: "executive-desk", position: [0, 0.55, -16], size: [4, 1.1, 1.6] },
      { type: "chair", position: [0, 0.35, -17.5] },
      { type: "bookshelf", position: [-7.5, 1.25, -17], size: [0.7, 2.5, 3.5] },
      { type: "bookshelf", position: [7.5, 1.25, -17], size: [0.7, 2.5, 3.5] },
    ],
    signs: [
      // The Batman sign is on the NORTH wall of the CEO office
      // facing south, so it is visible through the south glass
      // wall to the player in the main office. face=PI makes the
      // plane face +Z (south).
      { text: "BATMAN", position: [0, 1.65, -18.78], face: Math.PI, color: 0xffdd22, size: [4.5, 2.5] },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen / Coffee Room",
    floor: { minX: 9, maxX: 19, minZ: -7, maxZ: 7 },
    walls: [
      wall("kitchen-north", 9, 19, -7.5, -7),
      wall("kitchen-south", 9, 19, 7, 7.5),
      wall("kitchen-east-north", 19, 19.5, -7, -7),
      // C-35 / L-2026-08-31-03: the kitchen now has a wide
      // doorway on its east wall (x=[19, 19.5], z=[-7, -3]) that
      // opens into the new training room. The kitchen's east wall
      // is split into two solid segments: one above the doorway
      // (none, since the doorway reaches the corner) and one
      // below. To keep the wall valid we leave a thin solid
      // segment just south of the doorway at z=[-3, -2.75] so
      // the player can read "KITCHEN" sign there, and a wider
      // solid segment further south at z=[-2.75, 7].
      wall("kitchen-east-south", 19, 19.5, -3, -2.75),
      wall("kitchen-east-far-south", 19, 19.5, -2.75, 7),
      // Offset shared walls into the kitchen, away from the main-office shell.
      wall("kitchen-west-north", 9.22, 9.5, -7, -1.25),
      wall("kitchen-west-south", 9.22, 9.5, 1.25, 7),
    ],
    doorways: [
      MAIN_OFFICE_DOORWAYS[1]!,
      // Wide doorway from the kitchen to the new training room
      // (formerly cto-to-kitchen). The training room is east of
      // the kitchen; the doorway is 4m wide.
      gap(
        "kitchen-to-training",
        { minX: 19, maxX: 19.5, minZ: -7, maxZ: -3 },
        { minX: 19.5, maxX: 20, minZ: -7, maxZ: -3 },
      ),
    ],
    floorColor: 0xc7b98b,
    wallColor: 0xb8dce8,
    furniture: [
      { type: "coffee-machine", position: [11, 0.8, -6.2], size: [1, 1.6, 0.8] },
      { type: "fridge", position: [13, 1.1, -6.2], size: [1.2, 2.2, 1] },
      { type: "microwave", position: [15, 1.15, -6.2], size: [1.1, 0.7, 0.8] },
      { type: "sink", position: [17.3, 0.55, -6.2], size: [2, 1.1, 0.9] },
      { type: "table", position: [14, 0.45, 2.5], size: [2.5, 0.9, 2] },
      { type: "chair", position: [12.2, 0.25, 2.5] },
      { type: "chair", position: [15.8, 0.25, 2.5] },
      { type: "chair", position: [14, 0.25, 4] },
    ],
    signs: [{ text: "TODAY'S MENU: COFFEE", position: [14, 2.25, 6.72], face: Math.PI, color: 0x9b3f2f }],
  },
  {
    // C-35 / L-2026-08-31-03: the training room now sits in the
    // former CEO office footprint, east of the kitchen. The
    // training room is accessed from the KITCHEN (not the main
    // office) and has huge east-facing windows showing pixel-art
    // trees, a sun, and birds outside.
    id: "training-room",
    name: "Training Room",
    floor: { minX: 19, maxX: 27, minZ: -13, maxZ: -3 },
    walls: [
      wall("training-north", 19, 27, -13.5, -13),
      wall("training-south", 19, 27, -3, -2.5),
      // East side: glass wall (full height, z=-13 to z=-3) so
      // the player can see the outdoor trees and sun.
      wall("glass", 27, 27.5, -13, -3),
      // The solid west segments sit inside the training room
      // rather than sharing the kitchen east wall's depth volume.
      // They bracket the kitchen-to-training doorway (z=-7..-3).
      wall("training-west-north", 19.5, 19.8, -13, -7),
      wall("training-west-south", 19.5, 19.8, -3, -3),
    ],
    doorways: [
      // Kitchen-to-training doorway (matches the kitchen's
      // east wall gap).
      gap(
        "training-to-kitchen",
        { minX: 19, maxX: 19.5, minZ: -7, maxZ: -3 },
        { minX: 19.5, maxX: 20, minZ: -7, maxZ: -3 },
      ),
    ],
    floorColor: 0x9b7653,
    wallColor: 0x245c54,
    furniture: [
      // The training room keeps its old layout: projector screen
      // on the north wall, lectern in the middle, whiteboard on
      // the west wall, rows of audience chairs facing north.
      { type: "projector-screen", position: [23, 1.7, -12.7], size: [5, 2.2, 0.12] },
      { type: "lectern", position: [23, 0.6, -10.7], size: [1.2, 1.2, 0.8] },
      // The whiteboard is flush with the west wall's inner face.
      // The west wall volume is x=[19.5, 19.8], so the inner face
      // is at x=19.8 and the 0.12m-deep board centers at 19.86.
      { type: "whiteboard", position: [19.86, 1.5, -8], size: [0.12, 2, 4], rotationY: 0 },
      ...[-5.8, -3.9, -2, -0.1].flatMap((z) =>
        [-4.5, -1.5, 1.5, 4.5].map((x) => ({
          type: "chair",
          // Chairs are placed in the southern half of the room,
          // facing the lectern (which is at z=-10.7). The chair
          // positions use the x grid from the old room but
          // shifted to the new room's x range (19..27).
          position: [19 + (x + 4.5) / 9 * 8, 0.25, -3 + (z - 0.1) * -0.25] as Vector3Tuple,
        })),
      ),
    ],
    signs: [
      // The "TRAINING ROOM" sign is on the south wall, facing
      // south (face=PI) so the player in the kitchen sees it on
      // the way in.
      { text: "TRAINING ROOM", position: [23, 2.45, -2.78], face: Math.PI, color: 0x2255aa },
    ],
  },
  {
    id: "meeting-room",
    name: "Meeting Room",
    floor: { minX: -6, maxX: 6, minZ: 9, maxZ: 19 },
    walls: [
      wall("meeting-south", -6, 6, 19, 19.5),
      wall("meeting-west", -6.5, -6, 9, 19),
      wall("meeting-east", 6, 6.5, 9, 19),
      // Offset shared walls into the meeting room, away from the office shell.
      wall("meeting-north-west", -6, -1.25, 9.22, 9.5),
      wall("meeting-north-east", 1.25, 6, 9.22, 9.5),
    ],
    doorways: [MAIN_OFFICE_DOORWAYS[2]!],
    floorColor: 0x76543d,
    wallColor: 0x8a7968,
    furniture: [
      { type: "table", position: [0, 0.45, 14], size: [3, 0.9, 5.5] },
      ...[-2.4, 2.4].flatMap((x) => [11.8, 13.3, 14.8, 16.3].map((z) => ({
        type: "chair",
        position: [x, 0.25, z] as Vector3Tuple,
      }))),
      { type: "projector-screen", position: [0, 1.7, 18.72], size: [4.5, 2, 0.12] },
    ],
    signs: [{ text: "NEXT MEETING: 5 MIN AGO", position: [4, 2.2, 9.28], face: 0, color: 0xaa3322 }],
  },
  {
    // L-2026-08-30-01: "NPCs should RANDOMLY walk to: the toilet (a new
    // room to be added)." The toilet is a small back-corner room off
    // the main office, south-west, with two stalls, a sink, and the
    // mandatory "OUT OF ORDER" sign (IT Crowd homage).
    id: "toilet",
    name: "Toilet",
    floor: { minX: -19, maxX: -9, minZ: 9, maxZ: 19 },
    walls: [
      wall("toilet-west", -19.5, -19, 9, 19),
      wall("toilet-north", -19, -9, 19, 19.5),
      wall("toilet-east-north", -9, -8.78, 19, 17.75),
      wall("toilet-east-south", -9, -8.78, 10.25, 9),
      // The south wall sits inside the toilet at z=[9, 9.5]. There
      // is a doorway gap at x=[-9, -8.5], z=[9, 9.5] so the player
      // can pass from the main office to the toilet.
      wall("toilet-south", -19, -8.5, 9, 9.5),
    ],
    doorways: [
      gap(
        "toilet-to-main",
        { minX: -9, maxX: -8.5, minZ: 9, maxZ: 9.5 },
        { minX: -9, maxX: -8.5, minZ: 9, maxZ: 9.5 },
      ),
    ],
    floorColor: 0xb0b6c0,
    wallColor: 0xd6dee5,
    furniture: [
      { type: "toilet-stall", position: [-16, 0.5, 16], size: [1.2, 1.6, 1.6] },
      { type: "toilet-stall", position: [-12, 0.5, 16], size: [1.2, 1.6, 1.6] },
      { type: "sink", position: [-14, 0.55, 11.5], size: [2, 1.1, 0.6] },
    ],
    signs: [
      { text: "WC", position: [-12, 2.2, 8.86], face: 0, color: 0x4477aa },
      { text: "OUT OF ORDER (just the one with the good vibes)", position: [-16, 1.7, 14.8], face: Math.PI, color: 0xaa3322, size: [2, 0.6] },
    ],
  },
];

export const WORLD_BOUNDS: AABB = { minX: -19, maxX: 27, minZ: -19, maxZ: 19 };

/** Static walls used by player collision. Glass is visual/raycast-only. */
export const WORLD_COLLISION_WALLS: readonly AABB[] = [
  ...MAIN_OFFICE_WALLS,
  ...WORLD_ROOMS.flatMap((room) => room.walls.filter((entry) => entry.id !== "glass")),
];

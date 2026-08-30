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
  gap(
    "main-to-training",
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
    id: "training-room",
    name: "Training Room",
    floor: { minX: -8, maxX: 8, minZ: -19, maxZ: -9 },
    walls: [
      wall("training-north", -8, 8, -19.5, -19),
      wall("training-west", -8.5, -8, -19, -9),
      wall("training-east", 8, 8.5, -19, -9),
      // Keep the shared boundary inside the training room so it cannot occupy
      // the same depth range as the main office's north wall.
      wall("training-south-west", -8, -1.25, -9.5, -9.22),
      wall("training-south-east", 1.25, 8, -9.5, -9.22),
    ],
    doorways: [MAIN_OFFICE_DOORWAYS[0]!],
    floorColor: 0x9b7653,
    wallColor: 0x245c54,
    furniture: [
      { type: "projector-screen", position: [0, 1.7, -18.7], size: [5, 2.2, 0.12] },
      { type: "lectern", position: [0, 0.6, -16.7], size: [1.2, 1.2, 0.8] },
      // The 0.12 m-deep board is flush with the west wall's inner face at x=-8.
      { type: "whiteboard", position: [-7.94, 1.5, -14], size: [0.12, 2, 4], rotationY: 0 },
      ...[-5.8, -3.9, -2, -0.1].flatMap((z) =>
        [-4.5, -1.5, 1.5, 4.5].map((x) => ({
          type: "chair",
          position: [x, 0.25, z - 9] as Vector3Tuple,
        })),
      ),
    ],
    signs: [{ text: "TRAINING ROOM", position: [0, 2.45, -19.22], face: 0, color: 0x2255aa }],
  },
  {
    id: "kitchen",
    name: "Kitchen / Coffee Room",
    floor: { minX: 9, maxX: 19, minZ: -7, maxZ: 7 },
    walls: [
      wall("kitchen-north", 9, 19, -7.5, -7),
      wall("kitchen-south", 9, 19, 7, 7.5),
      wall("kitchen-east-north", 19, 19.5, -7, -5.25),
      wall("kitchen-east-south", 19, 19.5, -2.75, 7),
      // Offset shared walls into the kitchen, away from the main-office shell.
      wall("kitchen-west-north", 9.22, 9.5, -7, -1.25),
      wall("kitchen-west-south", 9.22, 9.5, 1.25, 7),
    ],
    doorways: [
      MAIN_OFFICE_DOORWAYS[1]!,
      gap(
        "kitchen-to-cto",
        { minX: 19, maxX: 19.5, minZ: -5.25, maxZ: -2.75 },
        { minX: 19.5, maxX: 20, minZ: -5.25, maxZ: -2.75 },
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
    id: "cto-office",
    name: "CTO Office",
    floor: { minX: 19, maxX: 27, minZ: -13, maxZ: -3 },
    walls: [
      wall("cto-north", 19, 27, -13.5, -13),
      wall("cto-south", 19, 27, -3, -2.5),
      wall("cto-east", 27, 27.5, -13, -3),
      wall("glass", 19, 19.18, -13, -8),
      // The solid west segments sit inside the CTO office rather than sharing
      // the kitchen east wall's depth volume.
      wall("cto-west-north", 19.5, 19.8, -8, -5.25),
      wall("cto-west-south", 19.5, 19.8, -2.75, -3),
    ],
    doorways: [
      gap(
        "cto-to-kitchen",
        { minX: 19, maxX: 19.5, minZ: -5.25, maxZ: -2.75 },
        { minX: 19.5, maxX: 20, minZ: -5.25, maxZ: -2.75 },
      ),
    ],
    floorColor: 0x4d3b2b,
    wallColor: 0x4a2f24,
    furniture: [
      { type: "executive-desk", position: [24, 0.55, -9.5], size: [3.4, 1.1, 1.4] },
      { type: "chair", position: [24, 0.35, -11] },
      { type: "bookshelf", position: [26.5, 1.25, -7], size: [0.7, 2.5, 4] },
    ],
    signs: [{ text: "BATMAN", position: [24, 1.65, -12.72], face: 0, color: 0xffdd22, size: [4.5, 2.5] }],
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

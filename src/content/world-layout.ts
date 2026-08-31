import type { AABB } from "../engine/collision";

export type Vector3Tuple = readonly [number, number, number];

export interface WorldWall extends AABB {
  id: string;
  /**
   * Optional accent color for this wall's inner face
   * (L-2026-08-31-04 #6: premium accent walls). When set, the
   * wall material uses this color instead of the room color.
   */
  accentColor?: number;
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
  /**
   * Explicit ceiling light positions ([x, z] pairs,
   * L-2026-08-31-04 #7). When set, one PointLight AND one
   * visible fixture mesh is created per entry instead of the
   * single invisible center light.
   */
  lightPositions?: readonly (readonly [number, number])[];
}

const wall = (
  id: string,
  minX: number,
  maxX: number,
  minZ: number,
  maxZ: number,
  accentColor?: number,
): WorldWall => ({
  id,
  minX,
  maxX,
  minZ,
  maxZ,
  ...(accentColor === undefined ? {} : { accentColor }),
});

const gap = (
  id: string,
  from: AABB,
  to: AABB,
  width = 2.5,
): WorldDoorway => ({ id, from, to, width });

/** The original office shell, split only where the three open doorways are. */
export const MAIN_OFFICE_WALLS: WorldWall[] = [
  // L-2026-08-31-04 #5: the old solid north-wall segments
  // (main-north-west/east) covered the CEO office's glass wall,
  // so the player in the office could not see through it. They
  // are removed; the CEO office's own south glass (see
  // WORLD_ROOMS) is now the wall on this boundary, with the
  // doorway gap at x=[-1.25, 1.25]. Only the two corner strips
  // beyond the CEO office's side walls remain solid.
  wall("main-north-far-west", -9, -8, -9.5, -9),
  wall("main-north-far-east", 8, 9, -9.5, -9),
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
    // C-35 / L-2026-08-31-02 + C-44: the CEO office sits where
    // the training room used to be (north of the main office,
    // x=[-8, 8], z=[-19, -9]). THREE glass walls:
    //   - south glass: the CEO watches the employees (kept from
    //     C-35; the solid wall that covered it is gone, #5).
    //   - east glass: looks into the internal garden shared
    //     with the training room across the courtyard (#9).
    // The north wall is a dark accent wall (#6) carrying the
    // huge Batman emblem (#4). Premium furniture (#1-#3, #8):
    // 0.75m executive desk with laptop + 2nd monitor, a real
    // executive chair, a sofa + coffee-table meeting corner,
    // a bookshelf, and funny posters on the west wall.
    id: "ceo-office",
    name: "CEO Office",
    floor: { minX: -8, maxX: 8, minZ: -19, maxZ: -9 },
    walls: [
      // Accent wall: dark navy inner face (L-2026-08-31-04 #6).
      wall("ceo-north", -8, 8, -19.5, -19, 0x1a1f3a),
      // The side walls stop at z=-9.5 so they never share a
      // volume with the main office's corner strips (which own
      // the z=[-9.5, -9] band at x=[-9, -8] and [8, 9]).
      wall("ceo-west", -8.5, -8, -19, -9.5),
      // East glass: the internal garden view (#9). On the right
      // when entering the office from the main office.
      wall("glass", 8, 8.5, -19, -9.5),
      // South glass facing the main office, split around the
      // doorway. This is now the ONLY wall on the boundary (the
      // main office's solid north wall was removed, #5).
      wall("glass", -8, -1.25, -9.5, -9.3),
      wall("glass", 1.25, 8, -9.5, -9.3),
    ],
    doorways: [MAIN_OFFICE_DOORWAYS[0]!],
    floorColor: 0x4d3b2b,
    wallColor: 0x4a2f24,
    // Two visible ceiling lights (#7), fixtures rendered by the
    // room builder via makeCeilingLight().
    lightPositions: [
      [-3, -14],
      [3, -14],
    ],
    furniture: [
      // The executive desk (surface at y=0.75, laptop + 2nd
      // monitor + nameplate + plant + mug + books) faces south
      // so the CEO watches the office over it.
      { type: "executive-desk", position: [0, 0, -16] },
      { type: "executive-chair", position: [0, 0, -17.15] },
      // Real bookshelf (screenshot #48: the old placeholder was
      // one huge brown box): frame, shelves, book rows, trophy
      // and plant. Runs along the west wall.
      { type: "bookshelf", position: [-7.6, 0, -17], rotationY: Math.PI / 2 },
      // Meeting corner against the west wall.
      { type: "sofa", position: [-6.35, 0, -10.9], rotationY: Math.PI / 2 },
      { type: "coffee-table", position: [-5.05, 0, -10.9] },
    ],
    signs: [
      // The huge Batman emblem on the north accent wall, facing
      // south toward the glass and the main office (#4 + #49:
      // kept 1m of wall margin on each side so it does not span
      // the whole wall).
      { text: "BATMAN", position: [0, 1.5, -18.85], face: 0, color: 0xffdd22, size: [14, 2.85] },
      // West-wall posters (#48: fewer, muted, wrapped by the new
      // drawPoster renderer - copy from the GLM content pack).
      { text: "KEEP CALM AND SHIP IT", position: [-7.9, 1.7, -13.6], face: Math.PI / 2, color: 0x7a3b32, size: [1.9, 0.95] },
      { text: "DISRUPTION IS JUST PIVOTING WITH CONFIDENCE", position: [-7.9, 1.7, -11.5], face: Math.PI / 2, color: 0x6e5a2e, size: [1.9, 0.95] },
      // The BATCAVE door sign greets visitors from the office
      // side of the south glass, next to the doorway (#49: the
      // renderer wraps it onto two lines; tall enough to read).
      { text: "BATCAVE - KNOCK TWICE", position: [2.1, 2.1, -9.31], face: 0, color: 0x8a6d1f, size: [1.6, 0.7] },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen / Coffee Room",
    floor: { minX: 9, maxX: 19, minZ: -7, maxZ: 7 },
    walls: [
      // x starts at 9.5, east of the main office's east-wall band
      // (x=[9, 9.5]), so the two shells never share a volume.
      wall("kitchen-north", 9.5, 19, -7.5, -7),
      wall("kitchen-south", 9.5, 19, 7, 7.5),
      // L-2026-08-31 (#47): the kitchen's east wall used to start
      // at z=-3, volumetrically overlapping the training room's
      // south wall in the corner cube x=[19,19.5] z=[-3,-2.5]
      // (the blue/green z-fight Lucas screenshotted). It now
      // starts at z=-2.5 so the corner belongs to the training
      // room's green wall alone.
      wall("kitchen-east", 19, 19.5, -2.5, 7),
      // Offset shared walls into the kitchen (east of the main
      // office's east wall band x=[9, 9.5]) so the two shells
      // never overlap. The old x=[9.22, 9.5] sat INSIDE the
      // main-office wall band - same overlap bug class as #47.
      wall("kitchen-west-north", 9.5, 9.78, -7, -1.25),
      wall("kitchen-west-south", 9.5, 9.78, 1.25, 7),
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
    // C-36: full kitchen premium pass. The counter runs along the
    // north wall (z=-6.6, the room's z range is [-7, 7]). The
    // counter is 0.7m deep so it actually meets the back wall
    // (L-2026-08-31-06). The fridge is the LAST element on the
    // WEST end (free-standing, not built into the cabinet). The
    // cabinet AND countertop end where the cabinet ends so the
    // bin sits on the floor just past the counter (it can stick
    // out slightly past the east wall, that's fine).
    //
    // L-2026-08-31-06 (after Lucas's screenshot): the whole kitchen
    // equipment row is shifted RIGHT by 1.0m so the fridge's west
    // edge clears the west wall (x=9.78) with 0.32m of breathing
    // room. The fridge's back face is at z=-6.9 (0.1m off the back
    // wall at z=-7). The counter, all the counter-top appliances,
    // and the bin are shifted by the same 1.0m.
    furniture: [
      // The counter is 7.55m wide, centered at x=15.25, so it
      // spans world x = [11.475, 19.025]. The fridge sits to the
      // WEST of the counter (NOT under it). The bin sits just
      // east of the counter.
      { type: "kitchen-counter", position: [15.25, 0, -6.6] },
      // The fridge is the LAST element on the west end, free-
      // standing against the wall (NOT on the counter top, NOT in
      // a built-in cabinet). West face at x=10.1 (0.32m from the
      // west wall inner face at x=9.78). Back face at z=-7.0...
      // wait, the wall inner face IS at z=-7. The fridge depth
      // center is at z=-6.5, depth 0.95m, so back at z=-6.5-0.475
      // = -6.975 (0.025m from the wall). The makeFridge() body
      // depth is 0.95, so it fits.
      { type: "fridge", position: [10.6, 0, -6.5] },
      // The coffee machine (the new detailed C-36 one) sits on
      // the counter top. Counter top surface y = 0.89.
      { type: "coffee-machine-kitchen", position: [13.0, 0, -6.6] },
      // A kettle next to the coffee machine.
      { type: "kettle", position: [13.7, 0.91, -6.6] },
      // A coffee grinder.
      { type: "coffee-grinder", position: [14.2, 0.91, -6.6] },
      // The microwave (sits on the counter).
      { type: "microwave", position: [15.2, 0.91, -6.6] },
      // A soap dispenser.
      { type: "soap-dispenser", position: [16.0, 0.91, -6.6] },
      // A small houseplant.
      { type: "plant-counter", position: [16.4, 0.91, -6.6] },
      // The sink (a big counter section with basin + faucet).
      { type: "sink", position: [17.5, 0, -6.6] },
      // A dish rack on the counter next to the sink.
      { type: "dish-rack", position: [18.6, 0.91, -6.6] },
      // The dishwasher (built into the cabinet, in the east end).
      { type: "dishwasher", position: [18.6, 0, -6.6] },
      // The bin sits on the floor JUST EAST of the counter. The
      // counter ends at x=19.025; the bin is 0.45m wide, so place
      // its CENTER at x=19.4 (it spans x=19.175 to 19.625,
      // sticking out past the east wall at x=19 by 0.625m). The
      // bin can be partially outside the kitchen — that is fine.
      { type: "bin", position: [19.4, 0, -6.4] },
      // Fire extinguisher mounted on the west wall, in the corner
      // near the doorway (x=9.78 is the kitchen's west wall inner
      // face). Placed at x=9.95 (0.17m east of the wall) so it
      // sits against the wall without clipping.
      { type: "fire-extinguisher-kitchen", position: [9.95, 0, -3] },
      // The kitchen table (round) and three chairs in the middle of the room.
      { type: "kitchen-table", position: [16, 0, 2.5] },
      { type: "kitchen-chair", position: [15.0, 0, 2.5], rotationY: Math.PI / 2 },
      { type: "kitchen-chair", position: [17.0, 0, 2.5], rotationY: -Math.PI / 2 },
      { type: "kitchen-chair", position: [16, 0, 3.6], rotationY: Math.PI },
      // The kitchen table 2nd (round) and three chairs in the middle of the room.
      { type: "kitchen-table", position: [12, 0, 2.8], rotationY: Math.PI / 1.3 },
      { type: "kitchen-chair", position: [11.0, 0, 2.8], rotationY: Math.PI / 1.8 },
      { type: "kitchen-chair", position: [13.0, 0, 2.8], rotationY: -Math.PI / 2.1 },
      { type: "kitchen-chair", position: [12, 0, 4.1], rotationY: Math.PI },
    ],
    signs: [
      { text: "TODAY'S MENU: COFFEE", position: [14, 2.1, 6.72], face: Math.PI, color: 0x9b3f2f },
      // CLEAN AS YOU GO poster: above the counter, against the back
      // wall (z=-6.95, the wall inner face is at z=-7). Face 0 so it
      // faces the room (toward the player walking in).
      { text: "CLEAN AS YOU GO", position: [16.5, 2.1, -6.95], face: 0, color: 0x4a7d3a },
    ],
  },
  {
    // C-35 / L-2026-08-31-03 + C-44 #9: the training room sits
    // east of the kitchen, entered from the KITCHEN. It is now
    // LONGER: the projector wall moved north from z=-13 to
    // z=-19, so the room spans z=[-19, -3]. The west wall is
    // GLASS facing the internal garden it shares with the CEO
    // office across the courtyard; the east wall is GLASS facing
    // the outdoor trees, hills and sun.
    id: "training-room",
    name: "Training Room",
    floor: { minX: 19, maxX: 27, minZ: -19, maxZ: -3 },
    walls: [
      wall("training-north", 19, 27, -19.5, -19),
      wall("training-south", 19, 27, -3, -2.5),
      // East glass: the outdoor view (trees, hills, sun).
      wall("glass", 27, 27.5, -19, -3),
      // West glass: the internal garden shared with the CEO
      // office. On the left when entering from the kitchen
      // doorway (the wall extends north of the entrance).
      // L-2026-08-31 (screenshot #46): flush with the kitchen's
      // east wall band (x=[19, 19.5]) so there is no empty
      // pocket between the glass and the kitchen wall.
      wall("glass", 19, 19.5, -19, -7),
    ],
    doorways: [
      // Kitchen-to-training doorway (matches the kitchen's
      // east wall gap): z=[-7, -3] on the west side.
      gap(
        "training-to-kitchen",
        { minX: 19, maxX: 19.5, minZ: -7, maxZ: -3 },
        { minX: 19.5, maxX: 20, minZ: -7, maxZ: -3 },
      ),
    ],
    floorColor: 0x9b7653,
    wallColor: 0x245c54,
    furniture: [
      // Projector screen on the far (north) wall, lectern in
      // front of it; the audience sits between the lectern and
      // the entrance, facing north.
      { type: "projector-screen", position: [23, 1.7, -18.7], size: [5, 2.2, 0.12] },
      { type: "lectern", position: [23, 0.6, -17], size: [1.2, 1.2, 0.8] },
      // The whiteboard is flush with the south wall's inner
      // face (the wall volume is z=[-3, -2.5], inner face
      // z=-3; the 0.12m-deep board centers at z=-3.06).
      { type: "whiteboard", position: [23, 1.5, -3.06], size: [4, 2, 0.12], rotationY: 0 },
      // Audience rows, safely inside the room (L-2026-08-31-04:
      // the old rows computed positions OUTSIDE the room). Three
      // rows of four chairs facing the lectern.
      ...[-15, -13.2, -11.4].flatMap((z) =>
        [20.8, 22.2, 23.8, 25.2].map((x) => ({
          type: "chair",
          position: [x, 0.25, z] as Vector3Tuple,
          rotationY: Math.PI,
        })),
      ),
    ],
    signs: [
      // Room sign just east of the kitchen-to-training doorway,
      // mounted on the KITCHEN side of the south wall .
      { text: "TRAINING ROOM", position: [20, 2.2, -3.05], face: Math.PI, color: 0x2255aa, size: [1.6, 0.6] },
    ],
  },
  {
    id: "meeting-room",
    name: "Meeting Room",
    floor: { minX: -6, maxX: 6, minZ: 9, maxZ: 19 },
    walls: [
      wall("meeting-south", -6, 6, 19, 19.5),
      // L-2026-08-31 (#47 class): the side walls start at z=9.5
      // (south of the main office's south-wall band z=[9, 9.5])
      // and the north walls sit inside the meeting room at
      // z=[9.5, 9.78], so no wall pair ever shares a volume.
      wall("meeting-west", -6.5, -6, 9.5, 19),
      wall("meeting-east", 6, 6.5, 9.5, 19),
      wall("meeting-north-west", -6, -1.25, 9.5, 9.78),
      wall("meeting-north-east", 1.25, 6, 9.5, 9.78),
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
      wall("toilet-east-north", -9, -8.78, 17.75, 19),
      // Starts at z=9.5, south of the toilet's own south wall
      // band (z=[9, 9.5]), so the pair never shares a volume.
      wall("toilet-east-south", -9, -8.78, 9.5, 10.25),
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

/**
 * Static walls used by player collision. C-44: glass walls are
 * now included - they are transparent, not passable. This keeps
 * the player out of the internal garden and stops them walking
 * through the CEO office's glass walls.
 */
export const WORLD_COLLISION_WALLS: readonly AABB[] = [
  ...MAIN_OFFICE_WALLS,
  ...WORLD_ROOMS.flatMap((room) => room.walls),
];

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
  fontSize?: number;
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
  // C-57 (Lucas, 2026-09-01): the toilet moved from the back-
  // south-west corner of the main office (off the south wall at
  // x=[-9, -8.5]) to its new home east of the kitchen (door
  // opens off the kitchen's east wall). The main office's south
  // wall is now SOLID end to end - no gap. The old gap segment
  // (-9 to -8.5) is gone.
  wall("main-south-west", -9, -1.25, 9, 9.5),
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
  // C-57: the toilet door moved off the main office entirely.
  // The new door is a kitchen-level doorway (kitchen-to-toilet)
  // and the main office no longer has a 4th doorway. Index
  // layout stays: [0]=main-to-ceo, [1]=main-to-kitchen,
  // [2]=main-to-meeting.
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
      // C-64: Lucas moved the meeting room south of the kitchen.
      // Split this wall around x=[10, 12] so the kitchen doorway
      // and the meeting room's matching doorway share a real gap.
      wall("kitchen-south-west", 9.5, 10, 7, 7.5),
      wall("kitchen-south-east", 12, 19, 7, 7.5),
      // L-2026-08-31 (#47): the kitchen's east wall used to start
      // at z=-3, volumetrically overlapping the training room's
      // south wall in the corner cube x=[19,19.5] z=[-3,-2.5]
      // (the blue/green z-fight Lucas screenshotted). It now
      // starts at z=-2.5 so the corner belongs to the training
      // room's green wall alone.
      //
      // C-57 (2026-09-01): a doorway gap at z=[5, 7] opens the
      // new toilet on the right of the "TODAY'S MENU: COFFEE"
      // sign. The wall stops at z=5; the toilet's own west
      // wall (in WORLD_ROOMS) takes over for z=[2, 5].
      wall("kitchen-east", 19, 19.5, -2.5, 5),
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
      // C-57: 2m doorway from the kitchen's east wall into the
      // new toilet. z=[5, 7] is the south end of the kitchen's
      // east wall, directly under and to the right of the
      // "TODAY'S MENU: COFFEE" sign at (14, 2.1, 6.72) - a
      // player standing in the kitchen facing the south wall
      // sees the toilet door on the right.
      gap(
        "kitchen-to-toilet",
        { minX: 19, maxX: 19.5, minZ: 5, maxZ: 7 },
        { minX: 19.5, maxX: 20, minZ: 5, maxZ: 7 },
      ),
      gap(
        "kitchen-to-meeting",
        { minX: 9.75, maxX: 12.25, minZ: 7, maxZ: 7.5 },
        { minX: 9.75, maxX: 12.25, minZ: 7.5, maxZ: 7.78 },
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
      // C-64 D2-D3: from the kitchen facing +Z, Lucas's left side
      // of the new doorway is +X. The menu moves east to keep the
      // two signs from overlapping.
      { text: "MEETING ROOM", position: [12.9, 2.1, 7], face: Math.PI, color: 0x2255aa, size: [1.4, 0.6] },
      { text: "TODAY'S MENU: COFFEE", position: [15.57, 2.1, 7], face: Math.PI, color: 0x9b3f2f },
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
      { text: "TRAINING ROOM", position: [19, 2.2, -1.5], face: -Math.PI / 2, color: 0x2255aa, size: [1.6, 0.6] },
    ],
  },
  {
    // C-64: the old meeting room keeps the load-bearing entrance
    // and becomes the reception shell. Wave 2 owns its interior.
    id: "reception",
    name: "Reception",
    floor: { minX: -6, maxX: 6, minZ: 9, maxZ: 19 },
    walls: [
      wall("reception-south", -6, 6, 19, 19.5),
      // L-2026-08-31 (#47 class): the side walls start at z=9.5
      // (south of the main office's south-wall band z=[9, 9.5])
      // and the north walls sit inside the reception at
      // z=[9.5, 9.78], so no wall pair ever shares a volume.
      wall("glass", -6.5, -6, 9.5, 19),
      wall("reception-east", 6, 6.5, 9.5, 19),
      wall("reception-north-west", -6, -1.25, 9.5, 9.78),
      wall("reception-north-east", 1.25, 6, 9.5, 9.78),
    ],
    doorways: [MAIN_OFFICE_DOORWAYS[2]!],
    floorColor: 0x76543d,
    wallColor: 0x71877b,
    lightPositions: [
      [3.4, 13.5],
      [-3.4, 13.5],
      [0, 16.8],
    ],
    furniture: [
      { type: "reception-desk", position: [3.4, 0, 13.5], rotationY: -Math.PI / 2 },
      // C-64: local +X is the foliage side, so PI points it west
      // into reception while the backing remains against the east wall.
      { type: "plant-wall", position: [5.88, 0, 13.5], rotationY: Math.PI },
      { type: "desk-led-bar", position: [3.4, 0, 13.5], rotationY: -Math.PI / 2 },
      { type: "reception-sofa", position: [-3.55, 0, 13.5], rotationY: Math.PI / 2 },
      { type: "reception-coffee-table", position: [-2.15, 0, 13.5] },
      { type: "lobby-planter", position: [-4.2, 0, 11.2] },
      { type: "lobby-planter", position: [-3.05, 0, 18.35] },
      { type: "lobby-planter", position: [3.05, 0, 18.35] },
      { type: "glass-doors", position: [0, 0, 18.92] },
      { type: "xerox-printer", position: [5.15, 0, 16.75], rotationY: -Math.PI / 2 },
    ],
    signs: [
      // AC-BRAND-02: the two brands that BUILT the game, on the wall
      // between reception and the main office - so the player sees them
      // once on the way in and is never shown them again.
      //
      // Wording is "BUILT BY", never a company nameplate: the fictional
      // office here is a deliberate comedy of dysfunction, and neither
      // Edukey nor DevPowers is being depicted by it (AC-BRAND-03).
      //
      // The inner face of the reception's north wall is z=9.78, and the
      // doorway to the main office is at x=0, so the pair flanks it.
      // face: 0 points +Z, toward a player walking in from the entrance.
      // Both plaques go on the WEST band, stacked, not one per side. The
      // roster panel is a permanent right-side HUD covering ~28% of the
      // viewport, so an east-band plaque is half-hidden behind it from the
      // walk-in view - which is the one view this branding exists for.
      { text: "BUILT BY", position: [-2.7, 2.62, 9.8], face: 0, color: 0x9a9a9a, size: [1.5, 0.4] },
      { text: "EDUKEY", position: [-2.7, 2.02, 9.8], face: 0, color: 0x2fa8d8, size: [2.3, 0.72] },
      { text: "DEVPOWERS", position: [-2.7, 1.18, 9.8], face: 0, color: 0xf0902f, size: [2.3, 0.72] },
    ],
  },
  {
    // C-64 D10: the meeting-room id follows the meeting concept,
    // while its coordinates move south of the kitchen.
    id: "meeting-room",
    name: "Meeting Room",
    floor: { minX: 9.5, maxX: 19, minZ: 7.5, maxZ: 17.5 },
    walls: [
      wall("meeting-south", 9.5, 19, 17.5, 18),
      wall("meeting-west", 9.5, 9.78, 7.78, 17.5),
      wall("meeting-east", 19, 19.5, 7.78, 17.5),
      wall("meeting-north-west", 9.5, 9.75, 7.5, 7.78),
      wall("meeting-north-east", 12.25, 19, 7.5, 7.78),
    ],
    doorways: [
      gap(
        "meeting-to-kitchen",
        { minX: 9.75, maxX: 12.25, minZ: 7, maxZ: 7.5 },
        { minX: 9.75, maxX: 12.25, minZ: 7.5, maxZ: 7.78 },
      ),
    ],
    floorColor: 0x76543d,
    wallColor: 0x8a7968,
    lightPositions: [
      [12, 12.5],
      [16.5, 12.5],
    ],
    furniture: [
      { type: "table", position: [14.25, 0.45, 12.5], size: [3, 0.9, 5.5] },
      ...[11.85, 16.65].flatMap((x, columnIndex) => [10.3, 11.8, 13.3, 14.8].map((z) => ({
        type: "chair",
        position: [x, 0.25, z] as Vector3Tuple,
        rotationY: columnIndex === 0 ? Math.PI / 2 : -Math.PI / 2,
      }))),
      { type: "projector-screen", position: [14.25, 1.7, 17.22], size: [4.5, 2, 0.12] },
    ],
    signs: [{ text: "NEXT MEETING: 5 MIN AGO", position: [16.5, 2.2, 7.8], face: 0, color: 0xaa3322 }],
  },
  {
    // C-57 (Lucas, 2026-09-01): the toilet moved from the back-
    // south-west corner of the main office to a new room east of
    // the kitchen. Doorway is on the kitchen's east wall (z=[5, 7]),
    // which is the right side of the "TODAY'S MENU: COFFEE" sign
    // (the sign is at (14, 2.1, 6.72), the player in the kitchen
    // facing south sees the toilet door on the right).
    //
    // Layout: 5m wide (x=[19, 24]), 5m deep (z=[2, 7]). The door
    // is in the west wall (x=19, z=[5, 7]) leading into the kitchen.
    // The washbasin is on the wall by the door (north wall, the
    // shared boundary with the kitchen), the urinal is on the east
    // wall, and the two stalls sit against the south wall.
    //
    // 3D models: the C-57 stall, urinal, and basin are detailed
    // pixelart (partition walls with tile rows, porcelain toilet
    // bowl + cistern, chrome flush pipe, mirror + soap dispenser),
    // matching the kitchen premium-pass quality.
    id: "toilet",
    name: "Toilet",
    floor: { minX: 19, maxX: 24, minZ: 2, maxZ: 7 },
    walls: [
      // North wall - shared with the kitchen's south wall (z=7, the
      // shared boundary). This is the toilet's back wall, the one
      // the washbasin mounts to.
      wall("toilet-north", 19, 24, 7, 7.5),
      // East wall - the outer wall of the world. The urinal mounts
      // on this wall.
      wall("toilet-east", 24, 24.5, 2, 7),
      // South wall - the back wall where the stalls stand. Starts
      // at x=19.5 (the outer face of the kitchen's east wall band)
      // so it does not share a volume with the kitchen-east wall.
      wall("toilet-south", 19.5, 24, 1.5, 2),
      // West wall - south of the doorway. The wall on the north
      // side of the doorway is the north wall (toilet-north)
      // which already covers z=[7, 7.5]. This segment covers
      // z=[2, 5] (south of the doorway, on the toilet's side of
      // the shared boundary at x=[19.5, 20]).
      wall("toilet-west-south", 19.5, 20, 2, 5),
    ],
    doorways: [
      // C-57: the doorway between kitchen and toilet, in the shared
      // east-west wall. The kitchen's doorway (kitchen-to-toilet) is
      // the canonical one; the toilet references it for symmetry.
      gap(
        "toilet-to-kitchen",
        { minX: 19, maxX: 19.5, minZ: 5, maxZ: 7 },
        { minX: 19.5, maxX: 20, minZ: 5, maxZ: 7 },
      ),
    ],
    floorColor: 0xc4cad0,
    wallColor: 0xe2e8ee,
    // Two visible ceiling lights, centred on the room (x=21.5, z=4.5).
    lightPositions: [
      [21.5, 4.5],
    ],
    furniture: [
      // Two stalls against the south wall. The user sits facing
      // NORTH (toward the door / washbasin). Stall at x=20 (west
      // side of the room) and x=23 (east side), both 0.5m off the
      // south wall. The stalls are 1.2m wide so the east one is
      // shifted slightly east to fit (the room is 5m wide).
      { type: "toilet-stall", position: [20.6, 0, 2.9] },
      { type: "toilet-stall", position: [21.8, 0, 2.9] },
      // Washbasin on the NORTH wall (z=7), right by the door so
      // you wash your hands on the way out. The basin faces -Z
      // (toward the user standing in the room).
      { type: "toilet-sink", position: [22, 0, 6.7], rotationY: Math.PI  },
      // Urinal on the EAST wall (x=24), facing the user. Sits
      // against the wall, between the two stalls (z=3) and the
      // washbasin (z=6.7). Mounted at y=0.4-1.1, faces -X.
      { type: "urinal", position: [23.5, -0.4, 2] },
    ],
    signs: [
      // "WC" sign on the kitchen side of the doorway (mounted on
      // the kitchen's east wall, just above the door, facing into
      // the kitchen so the player sees it from inside the kitchen).
      // Position is on the toilet's north wall face to keep the
      // sign visible from the kitchen.
      { text: "WC", position: [18, 2.2, 6.85], face: Math.PI, color: 0x4477aa, size: [1, 0.6], fontSize: 16 },
      // "OUT OF ORDER" sign on the west stall's door panel - the
      // classic IT Crowd homage. Per Lucas 2026-09-01: the door
      // is now pushed forward (panel z=0.85, world z=3.75 for stall
      // 1 at z=2.9) so the sign sits on the door's front face
      // (z=0.85 - 0.02 = 0.83 in local coords = 3.73 in world, but
      // the sign is 0.02m in front of the door to avoid z-fight, so
      // world z=3.78 - 0.02 = 3.76 is on the door's front face).
      { text: "OUT OF ORDER", position: [20.5, 1.4, 3.76], face: 0, color: 0xaa3322, size: [0.9, 0.25] },
      // A second stall mirror "Please wash your hands" sign on the
      // north wall to the right of the basin.
      { text: "WASH YOUR HANDS", position: [22, 2.4, 6.85], face: Math.PI, color: 0x2e6e3a, size: [1.2, 0.3] },
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

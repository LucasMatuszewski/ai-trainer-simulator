/**
 * C-70: patrol routes for Janusz's robot fleet.
 *
 * Janusz does not clean. Three of the six robots he built do the rounds
 * while he supervises: Zdzislaw the vacuum sweeps the main office in
 * wall-to-wall lanes, Halina the gardener tours every plant the fleet
 * can reach, and Seba the runner collects mugs from the desks and takes
 * them to the dishwasher (Seba has opinions about the dishwasher).
 *
 * This file is PURE DATA, same split as `npc-schedule.ts`: the routes
 * live here where they are unit-testable, and
 * `src/engine/robot-brain.ts` only executes them.
 *
 * Route semantics:
 *   - `stops[0]` is ALWAYS the robot's dock pad in the kitchen dining
 *     area. Its `dwellSeconds` is 0 because the dock idle is the
 *     brain's `dockWait`, not a duty stop.
 *   - `stops[1..]` are duty stops and pass-through waypoints in loop
 *     order. The loop is closed: after the last stop the robot rolls
 *     the rare follow-Janusz check, then heads back to `stops[0]`.
 *   - A stop with `dwellSeconds > 0` is a WORK stop: the robot pauses,
 *     turns to `face` (yaw, 0 = +Z), and its mesh plays the duty
 *     animation. A stop with `dwellSeconds === 0` is a pass-through
 *     corner; its `face` is only cosmetic for one frame.
 *   - Every consecutive leg (including the wrap-around leg back to the
 *     dock) is authored clear of every obstacle AABB, and pinned so by
 *     `tests/unit/janusz-robots.test.ts`. Dockway crossings happen only
 *     through the real doorway gaps.
 *
 * The dock pads are 3 cm high chargers and deliberately NOT in
 * `ROOM_FURNITURE_AABBS`: robots drive onto them (that is what docking
 * means) and a knee-high pad would only disturb NPC pathing.
 */
import type { AABB } from "../engine/collision";
import { MAIN_OFFICE_PLANTS, OBSTACLES } from "./npcs";
import { WORLD_COLLISION_WALLS } from "./world-layout";
import { ROOM_FURNITURE_AABBS } from "../engine/npc-spawn-validator";
import { DOCK_PADS } from "./robot-dock-pads";

export { DOCK_PADS };

export type RobotId = "vacuum" | "gardener" | "runner";

export interface RobotStop {
  /** World position the robot drives to. */
  x: number;
  z: number;
  /** Yaw (radians, 0 = +Z) held while working at this stop. */
  face: number;
  /** Seconds of duty animation at this stop; 0 = drive through. */
  dwellSeconds: number;
  /** Human-readable label for tests and debugging. */
  label: string;
}

export interface RobotPatrolRoute {
  robotId: RobotId;
  /** Janusz's name for the robot (he built them; they have names). */
  name: string;
  /** Collision radius in metres (kept small; they are knee-high). */
  radius: number;
  /** Drive speed in m/s. Slower than any colleague; they are robots. */
  speed: number;
  /** The robot's dock pad in the kitchen (== stops[0] position). */
  dock: { x: number; z: number };
  /** Closed duty loop; stops[0] is the dock. */
  stops: readonly RobotStop[];
}

/* Face helpers: yaw = atan2(dx, dz) of the incoming travel direction. */
const FACE_N = Math.PI; // -Z, toward the kitchen counter
const FACE_S = 0; // +Z, toward the kitchen's south wall
const FACE_E = Math.PI / 2; // +X
const FACE_W = -Math.PI / 2; // -X

const vacuum: RobotPatrolRoute = {
  robotId: "vacuum",
  name: "Zdzislaw",
  radius: 0.19,
  speed: 0.7,
  dock: DOCK_PADS[0]!,
  stops: [
    // ---- Kitchen: out of the dock, around the tables (the gap between
    // the two round tables and their chairs is tighter than a robot),
    // so the lane runs along the south corridor and the east side.
    { x: 12.9, z: 6.4, face: FACE_S, dwellSeconds: 0, label: "dock" },
    { x: 12.9, z: 5.2, face: FACE_N, dwellSeconds: 0, label: "dock bay" },
    { x: 17.9, z: 5.2, face: FACE_E, dwellSeconds: 0.4, label: "kitchen south sweep" },
    { x: 17.9, z: 0.8, face: FACE_N, dwellSeconds: 0, label: "kitchen east lane" },
    { x: 12.9, z: 0.8, face: FACE_W, dwellSeconds: 0.4, label: "kitchen north sweep" },
    // ---- Through the main-to-kitchen doorway into the office. The
    // lane start cuts the corner diagonally: the x=8 strip hugs the
    // coffee machine too tightly at the north end.
    { x: 9.2, z: 0.8, face: FACE_W, dwellSeconds: 0, label: "doorway (kitchen side)" },
    { x: 8.0, z: 0.8, face: FACE_W, dwellSeconds: 0, label: "doorway (office side)" },
    // ---- Wall-to-wall lawnmower lanes down the clear office strip.
    // Lane x = 7.5 (east, between the desks and the machines), then
    // 5 / 0 / -5 (open centre), then -7.5 (west, between the desks and
    // the wall). Strip ends pause for the turn (the working wiggle).
    { x: 7.5, z: -7.8, face: FACE_W, dwellSeconds: 0.6, label: "lane 7.5 north end" },
    { x: 7.5, z: 7.8, face: FACE_S, dwellSeconds: 0, label: "lane 7.5 south end" },
    { x: 5.0, z: 7.8, face: FACE_W, dwellSeconds: 0.6, label: "lane 5 south end" },
    { x: 5.0, z: -7.8, face: FACE_N, dwellSeconds: 0, label: "lane 5 north end" },
    { x: 0.0, z: -7.8, face: FACE_W, dwellSeconds: 0.6, label: "lane 0 north end" },
    { x: 0.0, z: 7.8, face: FACE_S, dwellSeconds: 0, label: "lane 0 south end" },
    { x: -5.0, z: 7.8, face: FACE_W, dwellSeconds: 0.6, label: "lane -5 south end" },
    { x: -5.0, z: -7.8, face: FACE_N, dwellSeconds: 0, label: "lane -5 north end" },
    { x: -7.5, z: -7.8, face: FACE_W, dwellSeconds: 0.6, label: "lane -7.5 north end" },
    { x: -7.5, z: 7.8, face: FACE_S, dwellSeconds: 0, label: "lane -7.5 south end" },
    // ---- Home along the south edge, through the doorway, back east.
    { x: 0.0, z: 8.2, face: FACE_E, dwellSeconds: 0, label: "south edge east" },
    { x: 7.5, z: 8.2, face: FACE_E, dwellSeconds: 0, label: "south edge east end" },
    { x: 7.5, z: 0.8, face: FACE_N, dwellSeconds: 0, label: "east lane south" },
    { x: 8.0, z: 0.8, face: FACE_N, dwellSeconds: 0, label: "doorway (office side)" },
    { x: 9.2, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "doorway (kitchen side)" },
    { x: 10.2, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "kitchen west lane" },
    { x: 12.9, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "kitchen north sweep back" },
    { x: 17.9, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "kitchen east lane back" },
    { x: 17.9, z: 5.2, face: FACE_S, dwellSeconds: 0, label: "kitchen south sweep back" },
    { x: 12.9, z: 5.2, face: FACE_W, dwellSeconds: 0, label: "dock bay return" },
  ],
};

const gardener: RobotPatrolRoute = {
  robotId: "gardener",
  name: "Halina",
  radius: 0.18,
  speed: 0.5,
  dock: DOCK_PADS[1]!,
  stops: [
    // ---- Kitchen counter plant first (the plant pot on the counter at
    // x=16.4; Halina parks south of the counter and reaches up).
    { x: 15.0, z: 6.4, face: FACE_S, dwellSeconds: 0, label: "dock" },
    { x: 14.0, z: 4.9, face: FACE_N, dwellSeconds: 0, label: "between the tables" },
    { x: 14.0, z: -5.4, face: FACE_N, dwellSeconds: 0, label: "counter approach" },
    { x: 16.4, z: -5.35, face: FACE_N, dwellSeconds: 6, label: "water: counter plant" },
    { x: 14.0, z: -5.4, face: FACE_W, dwellSeconds: 0, label: "counter return" },
    // ---- Through the doorway to the two main-office floor plants.
    { x: 10.2, z: -5.4, face: FACE_W, dwellSeconds: 0, label: "kitchen west lane" },
    { x: 10.2, z: 0.8, face: FACE_S, dwellSeconds: 0, label: "kitchen door lane" },
    { x: 9.2, z: 0.8, face: FACE_W, dwellSeconds: 0, label: "doorway (kitchen side)" },
    { x: 8.0, z: 0.8, face: FACE_W, dwellSeconds: 0, label: "doorway (office side)" },
    { x: 8.0, z: -7.6, face: FACE_N, dwellSeconds: 0, label: "office north edge" },
    { x: -6.0, z: -7.6, face: FACE_N, dwellSeconds: 7, label: "water: north-wall plant" },
    { x: -8.5, z: -7.6, face: FACE_N, dwellSeconds: 7, label: "water: north-west plant" },
    // ---- West lane to the reception doorway, then the south-wall
    // planters in the reception (the sofa corner planter is skipped:
    // there is no clean line for even a knee-high robot).
    { x: -7.5, z: -7.6, face: FACE_E, dwellSeconds: 0, label: "west lane north end" },
    { x: -7.5, z: 7.5, face: FACE_S, dwellSeconds: 0, label: "west lane south end" },
    { x: 0.0, z: 8.6, face: FACE_E, dwellSeconds: 0, label: "reception doorway (office side)" },
    { x: 0.0, z: 10.0, face: FACE_S, dwellSeconds: 0, label: "reception doorway (reception side)" },
    { x: 0.0, z: 16.5, face: FACE_S, dwellSeconds: 0, label: "reception centre lane" },
    { x: -3.05, z: 16.9, face: FACE_W, dwellSeconds: 0, label: "planter west approach" },
    { x: -3.05, z: 17.55, face: FACE_S, dwellSeconds: 6, label: "water: west planter" },
    { x: 3.05, z: 17.55, face: FACE_S, dwellSeconds: 6, label: "water: east planter" },
    // ---- Home the same way.
    { x: 0.0, z: 16.5, face: FACE_N, dwellSeconds: 0, label: "reception centre lane back" },
    { x: 0.0, z: 10.0, face: FACE_N, dwellSeconds: 0, label: "reception doorway back" },
    { x: 0.0, z: 8.6, face: FACE_N, dwellSeconds: 0, label: "reception doorway (office side)" },
    { x: 7.5, z: 7.5, face: FACE_E, dwellSeconds: 0, label: "office south edge" },
    { x: 7.5, z: 0.8, face: FACE_N, dwellSeconds: 0, label: "east lane south" },
    { x: 8.0, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "doorway (office side)" },
    { x: 9.2, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "doorway (kitchen side)" },
    { x: 10.2, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "kitchen west lane" },
    { x: 14.0, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "kitchen centre lane" },
    { x: 14.0, z: 4.9, face: FACE_S, dwellSeconds: 0, label: "between the tables back" },
  ],
};

const runner: RobotPatrolRoute = {
  robotId: "runner",
  name: "Seba",
  radius: 0.2,
  speed: 0.65,
  dock: DOCK_PADS[2]!,
  stops: [
    // ---- Dishwasher first (Seba's favourite appliance; the opinions
    // live in Janusz's dialogue, the round trip lives here).
    { x: 17.2, z: 6.4, face: FACE_S, dwellSeconds: 0, label: "dock" },
    { x: 18.4, z: 4.6, face: FACE_E, dwellSeconds: 0, label: "kitchen east lane" },
    { x: 18.4, z: -5.35, face: FACE_N, dwellSeconds: 5, label: "dishwasher round trip" },
    // ---- Into the office, down the east desk row.
    { x: 14.0, z: -5.4, face: FACE_W, dwellSeconds: 0, label: "counter approach" },
    { x: 10.2, z: -5.4, face: FACE_W, dwellSeconds: 0, label: "kitchen west lane" },
    { x: 10.2, z: 0.8, face: FACE_S, dwellSeconds: 0, label: "kitchen door lane" },
    { x: 9.2, z: 0.8, face: FACE_W, dwellSeconds: 0, label: "doorway (kitchen side)" },
    { x: 8.0, z: 0.8, face: FACE_W, dwellSeconds: 0, label: "doorway (office side)" },
    { x: 7.55, z: 0.8, face: FACE_W, dwellSeconds: 0, label: "east desk lane" },
    { x: 7.55, z: -5.0, face: FACE_W, dwellSeconds: 4, label: "mugs: Marek" },
    { x: 7.55, z: -2.5, face: FACE_W, dwellSeconds: 4, label: "mugs: Ania" },
    { x: 7.55, z: 2.0, face: FACE_W, dwellSeconds: 4, label: "mugs: Grazyna" },
    { x: 7.55, z: 5.5, face: FACE_W, dwellSeconds: 4, label: "mugs: Kasia" },
    // ---- South edge across to the west desk row.
    { x: 7.55, z: 8.0, face: FACE_N, dwellSeconds: 0, label: "south edge east end" },
    { x: 0.0, z: 8.0, face: FACE_E, dwellSeconds: 0, label: "south edge centre" },
    { x: -7.55, z: 8.0, face: FACE_E, dwellSeconds: 0, label: "south edge west end" },
    { x: -7.55, z: 5.5, face: FACE_E, dwellSeconds: 4, label: "mugs: Klaudia" },
    { x: -7.55, z: 2.0, face: FACE_E, dwellSeconds: 5, label: "mugs: Janusz (extra long pause)" },
    { x: -7.55, z: -1.5, face: FACE_E, dwellSeconds: 4, label: "mugs: Tomek" },
    { x: -7.55, z: -5.0, face: FACE_E, dwellSeconds: 4, label: "mugs: Bartek" },
    // ---- North edge home (the x=8 lane cuts the corner diagonally:
    // the coffee machine leaves no room for a robot at the north end).
    { x: -7.55, z: -7.8, face: FACE_N, dwellSeconds: 0, label: "west lane north end" },
    { x: 7.5, z: -7.8, face: FACE_E, dwellSeconds: 0, label: "north edge east" },
    { x: 8.0, z: 0.8, face: FACE_S, dwellSeconds: 0, label: "east lane south" },
    { x: 9.2, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "doorway (kitchen side)" },
    { x: 10.2, z: 0.8, face: FACE_E, dwellSeconds: 0, label: "kitchen west lane" },
    { x: 10.2, z: 4.6, face: FACE_S, dwellSeconds: 0, label: "kitchen centre lane" },
    { x: 12.9, z: 4.6, face: FACE_E, dwellSeconds: 0, label: "dock approach west" },
    { x: 15.0, z: 4.6, face: FACE_E, dwellSeconds: 0, label: "dock approach centre" },
    { x: 17.2, z: 4.6, face: FACE_E, dwellSeconds: 0, label: "dock approach" },
  ],
};

export const ROBOT_PATROLS: Record<RobotId, RobotPatrolRoute> = {
  vacuum,
  gardener,
  runner,
};

/* ------------------------------------------------------------------ */
/* The obstacle list the robots are held to                            */
/* ------------------------------------------------------------------ */

/** Foliage-only footprints for the main-office floor plants. They are
 *  decoration for NPC collision, but a robot driving over a pot would
 *  look broken, so the fleet treats them as solid. */
const PLANT_AABBS: ReadonlyArray<AABB> = MAIN_OFFICE_PLANTS.map((plant) => ({
  minX: plant.x - plant.radius,
  maxX: plant.x + plant.radius,
  minZ: plant.z - plant.radius,
  maxZ: plant.z + plant.radius,
}));

/** Everything a robot must not drive through: the same furniture and
 *  wall AABBs the NPCs collide against, plus the floor plants. */
export const ROBOT_OBSTACLES: ReadonlyArray<AABB> = [
  ...OBSTACLES,
  ...ROOM_FURNITURE_AABBS,
  ...WORLD_COLLISION_WALLS,
  ...PLANT_AABBS,
];

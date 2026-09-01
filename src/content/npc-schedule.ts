import type { NPC, NpcId } from "../types";
import type { GameState } from "../types";
import { NPCS } from "./npcs";

export type Period = "morning" | "afternoon" | "evening";

export type NpcState =
  | "at-desk"
  | "walking"
  | "break-room"
  | "coffee"
  | "meeting"
  | "lunch"
  | "gone-home"
  | "toilet"
  | "training"
  | "kitchen"
  | "deal-wall"
  | "content-booth";

export interface ScheduleEntry {
  position: { x: number; y: number; z: number };
  face: number;
  state: NpcState;
}

export type KitchenStopId = "fridge" | "coffee" | "microwave" | "sink" | "table";

export const KITCHEN_MICRO_STOPS: Readonly<Record<KitchenStopId, ScheduleEntry>> = {
  // Standing spots ~0.5 m south of each appliance AABB, facing it
  // (Math.PI = face -Z = toward the counter on the north wall).
  // Corrected per PRD C-45 amendment (j): the sketched z = -6.2 row
  // sits inside the C-36 counter/fridge AABBs, and (14, 2.5) was on
  // the table itself.
  fridge: { position: { x: 10.6, y: 0, z: -5.5 }, face: Math.PI, state: "kitchen" },
  coffee: { position: { x: 13.0, y: 0, z: -5.3 }, face: Math.PI, state: "kitchen" },
  microwave: { position: { x: 15.2, y: 0, z: -5.3 }, face: Math.PI, state: "kitchen" },
  sink: { position: { x: 17.5, y: 0, z: -5.3 }, face: Math.PI, state: "kitchen" },
  table: { position: { x: 14.0, y: 0, z: 1.2 }, face: Math.PI, state: "kitchen" },
};

export const KITCHEN_STOP_DWELL: Readonly<Record<KitchenStopId, number>> = {
  fridge: 5,
  coffee: 8,
  microwave: 4,
  sink: 6,
  table: 10,
};

export const KITCHEN_STOP_JITTER_RADIUS = 0.4;

export interface KitchenSequenceStop {
  id: KitchenStopId;
  entry: ScheduleEntry;
  dwellSeconds: number;
}

const KITCHEN_STOP_IDS: readonly KitchenStopId[] = [
  "fridge",
  "coffee",
  "microwave",
  "sink",
  "table",
];

function npcJitterAngle(npcId: NpcId): number {
  let hash = 0;
  for (const char of npcId) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return (hash / 0x1_0000_0000) * Math.PI * 2;
}

export function pickKitchenSequence(
  npcId: NpcId,
  rng: () => number,
): KitchenSequenceStop[] {
  const ids = [...KITCHEN_STOP_IDS];
  for (let i = ids.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [ids[i], ids[j]] = [ids[j]!, ids[i]!];
  }

  const count = rng() < 0.5 ? 3 : 4;
  const angleSalt = npcJitterAngle(npcId);
  return ids.slice(0, count).map((id) => {
    const base = KITCHEN_MICRO_STOPS[id];
    const angle = rng() * Math.PI * 2 + angleSalt;
    const radius = Math.sqrt(rng()) * KITCHEN_STOP_JITTER_RADIUS;
    return {
      id,
      entry: {
        ...base,
        position: {
          x: base.position.x + Math.cos(angle) * radius,
          y: base.position.y,
          z: base.position.z + Math.sin(angle) * radius,
        },
      },
      dwellSeconds: KITCHEN_STOP_DWELL[id],
    };
  });
}

export const LUNCH_OUTSIDERS: ReadonlySet<NpcId> = new Set(["maciek", "marek"]);

export const SOCIAL_LUNCHERS: ReadonlySet<NpcId> = new Set(
  NPCS.filter(
    (npc) => (npc.gender !== "dog" || npc.id === "burek") && !LUNCH_OUTSIDERS.has(npc.id),
  ).map((npc) => npc.id),
);

export const LUNCH_WINDOW_SECONDS = 120;

export interface LunchContext {
  period: GameState["timeOfDay"];
  periodElapsed: number;
}

export function isLunchWindow(ctx: LunchContext): boolean {
  return ctx.period === "afternoon" && ctx.periodElapsed < LUNCH_WINDOW_SECONDS;
}

export function LUNCH_STAGGER_OFFSET(
  _npcId: NpcId,
  _day: number,
  rng: () => number,
): number {
  return rng() * 2;
}

/* -------------------------------------------------------------------
 * C-51: morning arrivals.
 *
 * An IT company does not open a gate at 9:00. A few people are already
 * at their desks before the player gets in, most trickle in over the
 * morning, and one is reliably late. This block is the pure data +
 * pure planner; `npc-controller.ts` only executes the plan.
 *
 * The MEASURED problem this replaces: the controller used to teleport
 * all 13 humans onto the single door point (0, 8.4) on frame 0 and
 * release them within 9.5 s. On the C-50 day harness that put 13 of 14
 * NPCs within 3 m of the door at once, and 147.2 s of the morning's
 * 165.5 s of frozen-while-walking happened AT the door - 89% of all the
 * morning jamming was created by the arrival itself.
 * ----------------------------------------------------------------- */

export type ArrivalMode = "already-in" | "arrives";

/** They beat the player in. PRD 11.4 names Marek and Bartek at their
 *  desks during the day-1 fade-in; Maciek is the CTO who "only appears
 *  in the morning" (PRD 11.1), Dawid is the CEO in his own office, and
 *  Burek the dog sleeps here. */
export const ALREADY_IN_AT_DAY_START: ReadonlySet<NpcId> = new Set([
  "bartek", "marek", "maciek", "dawid", "burek",
]);

/** PRD 11.1: "Janusz (the janitor) - arrives late (10am)". Only his
 *  arrival TIME is late; his schedule STATE stays `at-desk` in all
 *  three periods (L-2026-08-31-02), so this changes when he walks in,
 *  not where he stands. Seconds into the morning period. */
export const LATE_ARRIVAL_AT: ReadonlyMap<NpcId, number> = new Map([["janusz", 130]]);

/** The regular arrivals are spread evenly across this many seconds of
 *  the 180 s morning, so the office visibly fills up. Sized so that the
 *  late arrival (130 s) is clearly last AND still has time to reach his
 *  desk before the period ends. */
export const ARRIVAL_WINDOW_SECONDS = 95;

/** THE crowd fix. Consecutive arrivals are pushed apart to at least
 *  this gap, which at a 1.2 m/s walk is ~4.8 m of clearance - the
 *  previous arrival is well out of the doorway before the next one
 *  appears. Preventing the crowd in data beats handing it to the
 *  C-48/C-50 avoidance system to untangle. */
export const MIN_ARRIVAL_GAP_S = 4;

/** Per-day wobble on each arrival time, so no two mornings replay
 *  identically while the pecking order stays stable. */
export const ARRIVAL_JITTER_S = 6;

/** The main office's south-wall door gap. */
export const OFFICE_DOOR = { x: 0, y: 0, z: 8.4 } as const;

/** Consecutive arrivals step through the doorway on slightly different
 *  lines instead of retracing one point. */
export const DOOR_LANE_HALF_WIDTH = 0.8;

export interface MorningArrival {
  npcId: NpcId;
  mode: ArrivalMode;
  /** Seconds after the morning period starts. Always 0 for `already-in`. */
  at: number;
  /** Where this NPC steps in. Unused for `already-in`. */
  door: { x: number; y: number; z: number };
}

/** Stable per-NPC ordering key: the same person is always the early
 *  bird and the same person is always last through the door. */
function arrivalRank(npcId: NpcId): number {
  let hash = 2166136261;
  for (const char of npcId) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash / 0x1_0000_0000;
}

/**
 * Build the day's arrival plan. Pure: same ids + day + rng sequence
 * gives the same plan.
 *
 * 1. Early birds are `already-in` at t = 0.
 * 2. Everyone else is ranked by `arrivalRank` (stable personality) and
 *    laid out evenly across `ARRIVAL_WINDOW_SECONDS`; pinned late
 *    arrivals take their fixed time instead of a slot.
 * 3. A per-day jitter wobbles each time.
 * 4. The list is sorted and each arrival pushed forward until it is at
 *    least `MIN_ARRIVAL_GAP_S` after the one before it.
 */
export function planMorningArrivals(
  npcIds: readonly NpcId[],
  _day: number,
  rng: () => number,
): MorningArrival[] {
  const doorLane = (): { x: number; y: number; z: number } => ({
    x: OFFICE_DOOR.x + (rng() * 2 - 1) * DOOR_LANE_HALF_WIDTH,
    y: OFFICE_DOOR.y,
    z: OFFICE_DOOR.z,
  });

  const alreadyIn: MorningArrival[] = [];
  const arriving: NpcId[] = [];
  for (const npcId of npcIds) {
    if (ALREADY_IN_AT_DAY_START.has(npcId)) {
      alreadyIn.push({ npcId, mode: "already-in", at: 0, door: { ...OFFICE_DOOR } });
    } else {
      arriving.push(npcId);
    }
  }

  const byRank = [...arriving].sort(
    (a, b) => arrivalRank(a) - arrivalRank(b) || (a < b ? -1 : 1),
  );
  const onTime = byRank.filter((id) => !LATE_ARRIVAL_AT.has(id));
  const spacing = onTime.length > 1 ? ARRIVAL_WINDOW_SECONDS / (onTime.length - 1) : 0;

  const planned: MorningArrival[] = [];
  for (const npcId of byRank) {
    const pinned = LATE_ARRIVAL_AT.get(npcId);
    const slot = pinned ?? onTime.indexOf(npcId) * spacing;
    const jitter = (rng() * 2 - 1) * (ARRIVAL_JITTER_S / 2);
    planned.push({
      npcId,
      mode: "arrives",
      at: Math.max(0, slot + jitter),
      door: doorLane(),
    });
  }

  planned.sort((a, b) => a.at - b.at || (a.npcId < b.npcId ? -1 : 1));
  for (let index = 1; index < planned.length; index += 1) {
    const previous = planned[index - 1]!;
    const current = planned[index]!;
    if (current.at - previous.at < MIN_ARRIVAL_GAP_S) {
      current.at = previous.at + MIN_ARRIVAL_GAP_S;
    }
  }

  return [...alreadyIn, ...planned];
}

export const NPC_SCHEDULES: Record<NpcId, Record<Period, ScheduleEntry>> = {
  // L-2026-08-31-02: NPC schedule positions and face rotations
  // match the new wall-aligned desk layout (see npcs.ts). Each
  // "at-desk" position is 0.7m past the desk's wall-side edge,
  // facing the office center.
  bartek: {
    morning: { position: { x: -7.7, y: 0, z: -5 }, face: Math.PI / 2, state: "at-desk" },
    afternoon: { position: { x: -7.7, y: 0, z: -5 }, face: Math.PI / 2, state: "at-desk" },
    evening: { position: { x: -7.7, y: 0, z: -5 }, face: Math.PI / 2, state: "at-desk" },
  },
  klaudia: {
    morning: { position: { x: -7.7, y: 0, z: 5.5 }, face: Math.PI / 2, state: "at-desk" },
    afternoon: { position: { x: -7.7, y: 0, z: 5.5 }, face: Math.PI / 2, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  marek: {
    morning: { position: { x: 7.7, y: 0, z: -5 }, face: -Math.PI / 2, state: "at-desk" },
    afternoon: { position: { x: 7.7, y: 0, z: -5 }, face: -Math.PI / 2, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  zosia: {
    morning: { position: { x: 3, y: 0, z: 7.7 }, face: Math.PI, state: "at-desk" },
    afternoon: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "meeting" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  pawel: {
    morning: { position: { x: -3, y: 0, z: 7.7 }, face: Math.PI, state: "at-desk" },
    afternoon: { position: { x: 7.5, y: 0, z: -7.5 }, face: 0, state: "coffee" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  kasia: {
    morning: { position: { x: 7.7, y: 0, z: 5.5 }, face: -Math.PI / 2, state: "at-desk" },
    afternoon: { position: { x: 7.7, y: 0, z: 5.5 }, face: -Math.PI / 2, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  tomek: {
    morning: { position: { x: -7.7, y: 0, z: -1.5 }, face: Math.PI / 2, state: "at-desk" },
    afternoon: { position: { x: -7.7, y: 0, z: -1.5 }, face: Math.PI / 2, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  ania: {
    morning: { position: { x: 7.7, y: 0, z: -2.5 }, face: -Math.PI / 2, state: "at-desk" },
    afternoon: { position: { x: 7.7, y: 0, z: -2.5 }, face: -Math.PI / 2, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  janusz: {
    morning: { position: { x: -7.7, y: 0, z: 2 }, face: Math.PI / 2, state: "at-desk" },
    afternoon: { position: { x: -7.7, y: 0, z: 2 }, face: Math.PI / 2, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  burek: {
    morning: { position: { x: -5, y: 0, z: 4 }, face: Math.PI, state: "at-desk" },
    afternoon: { position: { x: 7.5, y: 0, z: -7.5 }, face: 0, state: "coffee" },
    evening: { position: { x: -5, y: 0, z: 4 }, face: Math.PI, state: "at-desk" },
  },
  grazyna: {
    morning: { position: { x: 7.7, y: 0, z: 2 }, face: -Math.PI / 2, state: "at-desk" },
    afternoon: { position: { x: 7.7, y: 0, z: 2 }, face: -Math.PI / 2, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  maciek: {
    morning: { position: { x: -3, y: 0, z: -7.7 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  przemek: {
    morning: { position: { x: 3, y: 0, z: -7.7 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 3, y: 0, z: -7.7 }, face: 0, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
  // C-38: the new CEO (Dawid) sits at the CEO desk in the new
  // CEO office (former training room footprint, north of the
  // main office) every period. He faces south (face=0 in this
  // convention means facing +Z = south) so the player in the
  // main office can see him at his desk through the glass wall.
  // He does not random-walk.
  dawid: {
    morning: { position: { x: 0, y: 0, z: -17 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: 0, y: 0, z: -17 }, face: 0, state: "at-desk" },
    evening: { position: { x: 0, y: 0, z: 0 }, face: 0, state: "gone-home" },
  },
};

/**
 * Random-walk destinations NPCs may pick during a period (L-2026-08-30-01).
 * Used by `pickRandomDestination` to drop NPCs in the kitchen for a
 * coffee, the toilet, a meeting, or a training without having to author
 * a fresh schedule per day. The position is the center of the room
 * (or a meaningful spot in it); the controller's interpolator handles
 * the walk there.
 */
export const RANDOM_DESTINATIONS: ReadonlyArray<ScheduleEntry> = [
  // Coffee / kitchen: stand by the coffee machine, facing the
  // wall (Math.PI = face -Z, the coffee machine is at z=-6.2
  // on the wall; the NPC at z=-6.2 facing -Z looks AT the
  // machine). Wait — face Math.PI means facing -Z, the
  // machine is at z=-6.2 (further north). To face the wall
  // (the machine is ON the wall), the NPC should look +Z, so
  // face=0... hmm. Let me think: the coffee machine is at
  // z=-6.2, the NPC is also at z=-6.2 (same z), so to look at
  // it the NPC needs to face +X (east, where the machine is on
  // the east wall) or -X (west, looking away). The machine is
  // at x=11 (east). The NPC at x=11 facing the machine means
  // facing -X. In three.js coords, face=-PI/2 is west. But
  // the convention here is face is "yaw of NPC mesh where 0
  // means facing +Z (south)". To face west (the wall on -X
  // side), the NPC needs yaw = -PI/2. But the machine is on
  // the +X (east) wall. So NPC should look at +X = east. Yaw=PI/2.
  // face: Math.PI / 2,
  // Corrected per C-45 amendment (j): (11, -6.2) is inside the
  // fridge AABB (x [10.1, 11.1], z [-7, -6.1]); stand south of the
  // counter at the coffee-machine x instead, facing the counter
  // (Math.PI = face -Z = north).
  { position: { x: 13.0, y: 0, z: -5.3 }, face: Math.PI, state: "coffee" },
  // Kitchen table: stand south of it (the old (14, 2.5) was ON the
  // table), facing north toward it.
  { position: { x: 14.0, y: 0, z: 1.2 }, face: Math.PI, state: "kitchen" },
  // C-57 (Lucas, 2026-09-01): the toilet moved east of the kitchen.
  // The new room is x=[19, 24], z=[2, 7]. The user enters from the
  // north (doorway z=[5, 7]) and the stalls are against the south
  // wall (z=3). NPCs at the stalls face +Z (north) - away from the
  // stalls, toward the door / washbasin.
  { position: { x: 20, y: 0, z: 2.8 }, face: 0, state: "toilet" },
  { position: { x: 23, y: 0, z: 2.8 }, face: 0, state: "toilet" },
  // Toilet: at the urinal (on the east wall, x=23.5). The NPC
  // stands 0.5m west of the urinal facing east.
  { position: { x: 22.5, y: 0, z: 5 }, face: Math.PI / 2, state: "toilet" },
  // Toilet: at the basin (on the north wall, z=6.7). The NPC
  // stands 0.5m south facing north.
  { position: { x: 22, y: 0, z: 6.0 }, face: Math.PI, state: "toilet" },
  // Meeting room: by the meeting table (center of room).
  // The table is in the center; just stand there.
  { position: { x: 0, y: 0, z: 14 }, face: 0, state: "meeting" },
  // Training room (C-44: elongated, z=[-19, -3]). The lectern
  // stands at x=23, z=-17 in front of the projector screen; the
  // audience rows are at z=-15, -13.2, -11.4. The speaker faces
  // south (face 0) toward the audience; students face north
  // (face PI) toward the lectern.
  { position: { x: 23, y: 0, z: -16.4 }, face: 0, state: "training" },
  { position: { x: 21, y: 0, z: -15 }, face: Math.PI, state: "training" },
  { position: { x: 25.2, y: 0, z: -13.2 }, face: Math.PI, state: "training" },
  // C-47 revenue corner (relocated per Lucas 2026-09-01): gathering
  // spots in the MEETING ROOM, in front of the Deal Wall (west wall)
  // and the Content Booth (east wall), facing the props. Spots sit
  // 1.5m off the walls, clear of the meeting table (x [-1.5, 1.5])
  // and the chair rows (x = +/-2.4). The affinity weighting in
  // pickRandomDestination sends sales people to the wall and
  // marketing to the booth.
  { position: { x: -4.6, y: 0, z: 12.6 }, face: -Math.PI / 2, state: "deal-wall" },
  { position: { x: 4.6, y: 0, z: 12.6 }, face: Math.PI / 2, state: "content-booth" },
];

/**
 * C-47: who gravitates to the revenue-corner props. Sales-flavored
 * NPCs favor the Deal Wall, marketing favors the Content Booth; the
 * manager and the CEO visit both (the CEO's stare at the numbers IS
 * the joke, per Lucas: "point people to them (including CEO)").
 */
export const DEAL_WALL_NPC_IDS: ReadonlySet<NpcId> = new Set([
  "przemek", "kasia", "zosia", "dawid",
]);
export const CONTENT_BOOTH_NPC_IDS: ReadonlySet<NpcId> = new Set([
  "ania", "klaudia", "zosia", "dawid",
]);
/** Chance per random-walk roll that an affinity NPC heads to their prop. */
export const REVENUE_SPOT_CHANCE = 0.35;

/** Pick a random destination for the given NPC, weighted by role.
 *  Returns null when the NPC should stay at the desk (e.g. they are
 *  already at a meeting and it is not yet lunch).
 *
 *  L-2026-08-30-01: Lucas reported that "Ania / Kasia / Bartek
 *  empty desks" because the random walks were pulling NPCs away
 *  from their desks too often (and onto other NPCs' desks). The
 *  fix: raise the stay probability to 90% and add a soft
 *  cooldown so an NPC that walked in this period does not walk
 *  again in the next one. The walking NPC slots (coffee, toilet,
 *  meeting, training) are still populated, but only 1-2 NPCs
 *  are ever out of their desks at a time. */
export function pickRandomDestination(
  npcId: NpcId,
  rng: () => number,
  _day: number,
  ctx?: LunchContext,
): ScheduleEntry | null {
  const lunchWindow = ctx !== undefined && isLunchWindow(ctx);
  if (lunchWindow) {
    if (npcId === "burek") return pickKitchenSequence(npcId, rng)[0]!.entry;
    if (LUNCH_OUTSIDERS.has(npcId)) {
      return rng() < 0.3 ? null : pickKitchenSequence(npcId, rng)[0]!.entry;
    }
    if (SOCIAL_LUNCHERS.has(npcId)) {
      return rng() < 0.6 ? pickKitchenSequence(npcId, rng)[0]!.entry : null;
    }
  }

  // 90% chance to stay at the desk for everyone except the
  // manager (Zosia) who has meetings more often, and the dog
  // (Burek) who wanders the most.
  const r = rng();
  const stay = npcId === "burek" ? 0.5 : npcId === "zosia" ? 0.7 : 0.9;
  if (r < stay) return null;
  if (npcId === "burek" && rng() < 0.6) {
    return pickKitchenSequence(npcId, rng)[0]!.entry;
  }
  if (LUNCH_OUTSIDERS.has(npcId) && rng() < 0.3) {
    return pickKitchenSequence(npcId, rng)[0]!.entry;
  }
  // C-47: affinity NPCs visit their revenue-corner prop instead of a
  // generic destination.
  if (rng() < REVENUE_SPOT_CHANCE) {
    if (DEAL_WALL_NPC_IDS.has(npcId)) {
      return RANDOM_DESTINATIONS.find((entry) => entry.state === "deal-wall") ?? null;
    }
    if (CONTENT_BOOTH_NPC_IDS.has(npcId)) {
      return RANDOM_DESTINATIONS.find((entry) => entry.state === "content-booth") ?? null;
    }
  }
  // 20% of walks: visit a colleague at their desk.
  if (rng() < 0.2) {
    return pickColleagueDesk(npcId, rng);
  }
  const idx = Math.floor(rng() * RANDOM_DESTINATIONS.length);
  return RANDOM_DESTINATIONS[idx] ?? null;
}

/** Pick a random colleague's desk as a destination. The visitor
 *  walks to a spot 1.2m in front of the colleague's NPC position
 *  (the same spot the colleague occupies), and the existing
 *  bubble system (which fires within 2.5m) will start a
 *  conversation. The face is rotated to look at the colleague.
 *  Returns null if no colleagues are eligible (e.g. the dog has
 *  no human colleagues to visit). */
function pickColleagueDesk(
  npcId: NpcId,
  rng: () => number,
): ScheduleEntry | null {
  const candidates: readonly NPC[] = NPCS.filter(
    (n) => n.id !== npcId && n.gender !== "dog",
  );
  if (candidates.length === 0) return null;
  const target = candidates[Math.floor(rng() * candidates.length)]!;
  // Visitor stands 1.2m in front of the target (south, so they
  // can see the colleague's monitor and face them). Visitor faces
  // -Z (Math.PI) to look at the colleague who is to the north.
  return {
    position: { x: target.position.x, y: 0, z: target.position.z - 1.2 },
    face: Math.PI,
    state: "walking",
  };
}

import * as THREE from "three";
import {
  CORRIDOR_WAYPOINTS,
  DEFAULT_MAX_EDGE_LENGTH,
  buildWaypointEdges,
} from "../content/corridor-waypoints";
import { BUREK_LINES } from "../content/dog-dialogues";
import { LUNCH_CHATTER } from "../content/lunch-dialogues";
import { OFFICE_CHATTER } from "../content/office-chatter";
import {
  KITCHEN_STOP_DWELL,
  LUNCH_STAGGER_OFFSET,
  NPC_SCHEDULES,
  pickKitchenSequence,
  type KitchenSequenceStop,
  type Period,
  type ScheduleEntry,
} from "../content/npc-schedule";
import type { AABB } from "./collision";
import type { NPC, NpcId } from "../types";
import { createBubbleSystem, pickLine } from "./bubbles";
import {
  CHATTER_RADIUS,
  MAX_CONVERSATIONS,
  PAIR_COOLDOWN_S,
  RESPONSE_DELAY_S,
  candidatePairs,
  nextStartDelay,
  pairKey,
  pickExchange,
  pickPair,
  pickStarter,
  roomAt,
  type RoomId,
} from "./chatter";
import {
  BLOCKED_PROGRESS_RATIO,
  MIN_SEPARATION,
  RETURN_MEMORY_SPOTS,
  arrivalClearOf,
  blockerAhead,
  escapeWaypoint,
  givesWayTo,
  separationCorrection,
} from "./npc-avoidance";
import { createInitialIdleState, updateIdle, type IdleState } from "./npc-idle";
import { planNpcPath } from "./npc-path";
import {
  findValidNpcSpawn,
  getNpcObstacles,
  isSpawnBlocked,
  NPC_DEFAULT_RADIUS,
} from "./npc-spawn-validator";
import { updateWalkCycle, type WalkCycleState } from "./npc-walk-cycle";

export interface ActiveConversationView {
  a: string;
  b: string;
  /** Seconds until the partner's response bubble fires. */
  responseIn: number;
  /** The line the starter said (debug/test/WebMCP visibility). */
  starterLine: string;
}

export interface NpcController {
  update: (dt: number) => void;
  destroy: () => void;
  setOverride: (npcId: NpcId, entry: ScheduleEntry | null) => void;
  getNpcIds: () => readonly NpcId[];
  /** C-46 debug/test hook: the conversations currently in flight. */
  getActiveConversations: () => readonly ActiveConversationView[];
}

export interface PathAdvanceResult {
  position: THREE.Vector3;
  segmentIndex: number;
  distanceInSegment: number;
  finished: boolean;
  face: number;
}

interface NpcRuntime {
  path: THREE.Vector3[] | null;
  segmentIndex: number;
  distanceInSegment: number;
  walkCycle: WalkCycleState;
  target: ScheduleEntry | null;
  departureDelay: number;
  kitchenStops: KitchenSequenceStop[] | null;
  kitchenIndex: number;
  dwellRemaining: number;
  returnEntry: ScheduleEntry | null;
  baseY: number;
  velocity: { x: number; z: number };
  /** C-48: seconds spent blocked (< 25% of expected progress) while walking. */
  blockedFor: number;
  /** C-48 v3: escape attempts made this block episode. Never caps - it
   *  drives the rotating escape fan and the periodic re-plan. */
  escapeAttempt: number;
  /** C-48 v3: `blockedFor` value at which the next escape fires. */
  nextEscapeAt: number;
  /** C-48 v3: who is standing in this NPC's walk line right now. */
  blockedBy: NpcId | null;
  /** C-48 v5: distance to target at the previous escape, and how many
   *  escapes in a row have failed to improve it. */
  lastEscapeDistance: number;
  futileEscapes: number;
  /** C-48 v5: seconds spent on the current walk, and the budget it was
   *  given when the route was planned. */
  tripElapsed: number;
  tripAllowance: number;
  /** C-48 v5: hold position until this controller time - the calm
   *  alternative to shuffling once escapes have not worked. */
  waitingUntil: number;
  /** C-48 v5: where this NPC was when the livelock window opened. */
  progressAnchor: { x: number; z: number };
  /** C-48 v5: seconds accumulated in the current livelock window. */
  progressWindow: number;
  /** C-48 v5: latched when a window closed without real progress. */
  livelocked: boolean;
  /** C-48 v5: controllerElapsed before which this NPC will not re-plan
   *  again - route commitment, so it cannot pace between alternatives. */
  replanCooldownUntil: number;
  /** C-48 v4: spots this NPC just backed away from, with their expiry.
   *  Escape candidates never step back into them. */
  retreats: { x: number; z: number; until: number }[];
  /** C-48 v3: seconds of unblocked walking. The escape ladder's memory
   *  survives short bursts of progress, so repeated collisions with the
   *  same NPC escalate instead of restarting from rung one. */
  clearFor: number;
  /** C-48 v3: how many times this NPC has stood aside for a standoff
   *  partner. Capped so a stalled partner cannot freeze it forever. */
  yieldWaits: number;
  /** C-48 v3: where this NPC settled, so a crowd that parted to let a
   *  stuck walker through closes back up afterwards. */
  anchor: { x: number; z: number } | null;
  /** C-48 v3: path index of the escape waypoint currently being walked
   *  to, or -1. While set, the stop-at-distance check is suspended for
   *  this NPC so the escape leg cannot be frozen by the rule that
   *  triggered it. */
  escapeIndex: number;
}

// C-48 v3 blocked-walker LOOP (Lucas: "maybe we just need to loop ...
// so the movement in new direction, even opposite direction if
// needed"). All times are seconds of accumulated block. Stuck next to
// the destination -> settle beside the blocker (the "meeting").
// Otherwise: talk for a moment, then retry an escape every
// ESCAPE_RETRY_S FOREVER - the fan rotates per attempt and every third
// attempt is a full A* re-plan instead. v2's ladder was terminal (one
// re-plan ever, and a failed detour never escalated), which is why
// NPCs in the middle of a group gave up for good. Counters reset on
// real progress.
const BLOCKED_ARRIVAL_RADIUS = 1.2;
const BLOCKED_SETTLE_AFTER_S = 1;
// How long a stopped NPC stands before it tries to get around. This is
// also the "stop and chat like friends" beat (Lucas, 2026-09-01: "they
// stop for too short, not natural for a chat with friends, could be
// just 3-5s longer to finish one dialogue"), so it comfortably covers
// a full starter + response exchange.
export const CHAT_PAUSE_S = 5;
// Anyone not actually mid-conversation starts looking for a way around
// this soon instead.
const FIRST_ESCAPE_AFTER_S = 1.2;
const ESCAPE_RETRY_S = 1.5;
// Sustained clear walking needed before the escape ladder forgets what
// it already tried. Without this, a pair that bumps, backs off and
// re-approaches resets to rung one every cycle and oscillates forever.
const ESCAPE_MEMORY_S = 3;
// A standoff partner only gets to hold the lane for so long.
const MAX_YIELD_WAITS = 2;
// C-48 v3: MIN_SEPARATION alone fences a crowd in - passing between two
// NPCs needs a 2 x MIN_SEPARATION gap, which a real cluster never has,
// so whoever ends up in the middle can never get out however many
// escapes they try (Lucas: "some people in the middle will just stop
// trying to get out"). While a walker is actively escaping, the pair
// floor drops to a brush-past distance and the SETTLED blockers get
// pushed aside instead of being immovable - the crowd parts. They
// drift back to where they settled once the walker is through.
export const SQUEEZE_SEPARATION = 0.62;
const ANCHOR_RETURN_SPEED = 0.6;
// Half-size of the temporary AABB a STANDING NPC presents to the path
// planner while someone re-routes around them.
const BLOCKER_BOX_HALF = 0.45;
// A neighbour moving faster than this clears the way by itself, so it
// never triggers a stop - only standing or head-on traffic does.
const CROSSING_SPEED = 0.15;
// How much of a neighbour's motion must point at us to count as
// head-on rather than crossing.
const CLOSING_DOT = 0.3;
// Seconds a just-abandoned spot stays off-limits to escape candidates.
const RETURN_MEMORY_S = 3;
// Once an NPC commits to a route it sticks with it for a while. Without
// this, every blocked retry re-planned, the alternatives flip-flopped as
// people moved, and the NPC paced between two routes instead of walking
// one - measured at 905 m walked in a day against a normal 50 m.
const REPLAN_COOLDOWN_S = 4;
// A detour more than this much longer than the direct line is not worth
// taking; waiting a moment for the way to clear beats crossing the
// office to dodge one person.
const ROUTE_DETOUR_LIMIT = 2.5;
// LIVELOCK: an NPC can walk hard and get nowhere - path advance drives
// it forward, hard separation shoves it back, and it paces the same
// two metres forever. It never looks "blocked" for a single frame, so
// every stuck-policy that keys off per-frame stillness misses it
// completely (measured: 900 m walked inside a 2.3 m stretch). Net
// displacement over a window is the honest test of progress.
const LIVELOCK_WINDOW_S = 4;
const LIVELOCK_MIN_PROGRESS = 1;
// After this many escape attempts in one episode the NPC stops trying
// to force its way and simply WAITS where it stands - Lucas has been
// explicit that standing (and chatting) beats shuffling: "if they
// colide and block, they should at least stay", "they can keep talking
// like they do now, to simulate a meeting". Pacing back and forth is
// the one outcome nobody wants, so once a couple of routes have failed
// the NPC holds position, re-checks every WAIT_RECHECK_S, and then
// starts a fresh round of attempts.
const MAX_ESCAPE_ATTEMPTS = 3;
// Escapes that leave the NPC no closer to where it is going are futile:
// it is stepping aside and coming straight back. Two of those and it
// stops manoeuvring and simply waits, which is what stops the visible
// back-and-forth (Lucas: "they just should avoid going back to the same
// place ... they go back, and going forth in the same place should be
// blocked").
const MAX_FUTILE_ESCAPES = 2;
const WAIT_RECHECK_S = 3;
// Hard ceiling on one trip, as a multiple of how long the planned route
// SHOULD take plus a fixed grace. Past it the NPC stops walking and
// settles where it stands - it joins whoever it was stuck behind and
// chats until the next period re-plans everyone. Keying this off the
// whole trip rather than a consecutive-blocked timer is deliberate: an
// NPC pacing back and forth keeps making "progress" and so never trips
// a consecutive-blocked ceiling, which is exactly the case we need to
// catch. An NPC visibly struggling for minutes is the one thing worse
// than an NPC standing somewhere slightly unintended.
const TRIP_ALLOWANCE_FACTOR = 3;
const TRIP_ALLOWANCE_GRACE_S = 12;

export function advanceAlongPath(
  position: THREE.Vector3,
  path: readonly THREE.Vector3[],
  segmentIndex: number,
  distanceInSegment: number,
  walkSpeed: number,
  dt: number,
): PathAdvanceResult {
  if (path.length < 2 || segmentIndex >= path.length - 1) {
    return { position: position.clone(), segmentIndex, distanceInSegment, finished: true, face: 0 };
  }
  let index = Math.max(0, segmentIndex);
  let progressed = Math.max(0, distanceInSegment);
  let remaining = Math.max(0, walkSpeed) * Math.max(0, dt);
  // Advance FROM THE CURRENT POSITION toward the next waypoint, not
  // by re-projecting onto the ideal segment line: a lateral
  // avoidance push applied between frames must persist (otherwise
  // the next update snaps the NPC back into the neighbour it was
  // pushed away from).
  const result = position.clone();
  let face = 0;
  while (index < path.length - 1) {
    const to = path[index + 1]!;
    const dx = to.x - result.x;
    const dz = to.z - result.z;
    const distToTo = Math.hypot(dx, dz);
    if (distToTo <= 1e-9) { index += 1; progressed = 0; continue; }
    face = Math.atan2(dx, dz);
    if (remaining >= distToTo) {
      result.copy(to);
      remaining -= distToTo;
      progressed = 0;
      index += 1;
      continue;
    }
    const step = remaining / distToTo;
    result.set(
      result.x + dx * step,
      result.y + (to.y - result.y) * step,
      result.z + dz * step,
    );
    progressed += remaining;
    remaining = 0;
    break;
  }
  return {
    position: result,
    segmentIndex: index,
    distanceInSegment: progressed,
    finished: index >= path.length - 1,
    face,
  };
}

export function nextBarkDelay(rng: () => number): number {
  return 150 + Math.max(0, Math.min(1, rng())) * 150;
}

/** An exchange in flight between two NPCs (C-46). The starter's line
 *  is already on screen; `response` is what the partner will say. */
interface ActiveConversation {
  aId: NpcId;
  bId: NpcId;
  starterLine: string;
  response: string;
  starterAt: number;
}

export function createNpcController(
  npcs: readonly NPC[],
  npcObjects: Readonly<Record<NpcId, THREE.Object3D>>,
  getCurrentPeriod: () => Period,
  getDay: () => number = () => 1,
  rng: () => number = Math.random,
  isLunchActive: () => boolean = () => false,
): NpcController {
  const obstacles = getNpcObstacles();
  const edges = buildWaypointEdges(CORRIDOR_WAYPOINTS, obstacles, DEFAULT_MAX_EDGE_LENGTH);
  const runtime = new Map<NpcId, NpcRuntime>();
  const idleStates = new Map<NpcId, IdleState>();
  const overrides = new Map<NpcId, ScheduleEntry>();
  const validatedDestinations = new Map<NpcId, ScheduleEntry>();
  // C-46 conversation state. Keyed by pairKey so a pair cannot hold
  // two conversations with itself, and cooled down after finishing so
  // the same two NPCs do not monopolize the office chatter.
  const conversations = new Map<string, ActiveConversation>();
  const pairCooldowns = new Map<string, number>();
  let lastPeriod: Period | null = null;
  let destroyed = false;
  let idleElapsed = 0;
  let bubbleElapsed = 0;
  // C-46 amendment: the next exchange START is SCHEDULED, not diced
  // for every second (Lucas: "sometimes too often, other time not
  // often enough"). The first chatter lands 4-8 s after mount.
  let nextStartAt = 4 + rng() * 4;
  let controllerElapsed = 0;
  let lastBurekBubbleAt = -Infinity;
  let barkAt = nextBarkDelay(rng);

  const firstNpc = npcs[0];
  let root: THREE.Object3D | null = firstNpc === undefined ? null : npcObjects[firstNpc.id];
  while (root?.parent) root = root.parent;
  const sceneRoot = root instanceof THREE.Scene ? root : null;
  const bubbleSystem = sceneRoot === null ? null : createBubbleSystem(sceneRoot);
  const fallbackCamera = new THREE.PerspectiveCamera();

  for (const npc of npcs) {
    runtime.set(npc.id, {
      path: null, segmentIndex: 0, distanceInSegment: 0,
      walkCycle: { distanceTraveled: 0, amplitude: 1 }, target: null, departureDelay: 0,
      kitchenStops: null, kitchenIndex: 0, dwellRemaining: 0, returnEntry: null,
      baseY: npcObjects[npc.id].position.y, velocity: { x: 0, z: 0 },
      blockedFor: 0, escapeAttempt: 0, nextEscapeAt: FIRST_ESCAPE_AFTER_S, escapeIndex: -1,
      anchor: null, blockedBy: null, clearFor: 0, yieldWaits: 0, retreats: [], replanCooldownUntil: 0,
      progressAnchor: { x: npcObjects[npc.id].position.x, z: npcObjects[npc.id].position.z },
      progressWindow: 0, livelocked: false, waitingUntil: 0, tripElapsed: 0, tripAllowance: Infinity,
      lastEscapeDistance: -1, futileEscapes: 0,
    });
  }

  const validateOverride = (npcId: NpcId, entry: ScheduleEntry): ScheduleEntry | null => {
    const cached = validatedDestinations.get(npcId);
    if (cached !== undefined) return cached;
    const valid = findValidNpcSpawn(
      { x: entry.position.x, z: entry.position.z, radius: NPC_DEFAULT_RADIUS }, obstacles, 2,
    );
    if (valid === null) return null;
    const result: ScheduleEntry = {
      position: { x: valid.x, y: entry.position.y, z: valid.z }, face: entry.face, state: entry.state,
    };
    validatedDestinations.set(npcId, result);
    return result;
  };

  const settle = (npcId: NpcId, entry: ScheduleEntry): void => {
    const object = npcObjects[npcId];
    const state = runtime.get(npcId)!;
    state.path = null;
    state.target = entry;
    state.velocity = { x: 0, z: 0 };
    object.position.set(entry.position.x, entry.position.y, entry.position.z);
    object.rotation.y = entry.face;
    object.rotation.z = 0;
    // C-48: park the gait in a neutral pose - the walk cycle leaves
    // the limbs mid-swing the moment the NPC stops, and nothing else
    // resets them.
    for (const part of ["left-leg", "right-leg", "arm-left", "arm-right"]) {
      const node = object.getObjectByName(part);
      if (node) node.rotation.x = 0;
    }
    object.visible = entry.state !== "gone-home";
    object.userData.npcState = entry.state;
    state.anchor = { x: entry.position.x, z: entry.position.z };
  };

  /** C-48: apply one separation displacement per axis, keeping the NPC
   *  out of furniture AABBs (a shove can never push through a wall). */
  const applyDisplacement = (object: THREE.Object3D, dx: number, dz: number): void => {
    if (dx !== 0 && !isSpawnBlocked({ x: object.position.x + dx, z: object.position.z, radius: NPC_DEFAULT_RADIUS }, obstacles)) {
      object.position.x += dx;
    }
    if (dz !== 0 && !isSpawnBlocked({ x: object.position.x, z: object.position.z + dz, radius: NPC_DEFAULT_RADIUS }, obstacles)) {
      object.position.z += dz;
    }
  };

  /** C-48 v3: splice ONE straight-line escape waypoint into the path.
   *  The direction comes from the rotating escape fan, so consecutive
   *  attempts lead elsewhere and a jam always has a next thing to try.
   *  The NPC turns in place, walks the straight segment, then re-aims
   *  at the original route - no curved arcs, no dancing. An escape
   *  that is still pending is REPLACED rather than stacked, so a long
   *  jam cannot grow the path without bound. */
  const insertEscape = (npcId: NpcId, attempt: number): boolean => {
    const state = runtime.get(npcId)!;
    const object = npcObjects[npcId];
    if (state.path === null) return false;
    const next = state.path[state.segmentIndex + 1];
    if (next === undefined) return false;
    const self = { x: object.position.x, z: object.position.z };
    const others: { x: number; z: number }[] = [];
    for (const other of npcs) {
      if (other.id === npcId) continue;
      const otherObject = npcObjects[other.id];
      if (!otherObject.visible) continue;
      others.push({ x: otherObject.position.x, z: otherObject.position.z });
    }
    const escape = escapeWaypoint(
      self, next.x - self.x, next.z - self.z, others,
      (x, z) => isSpawnBlocked({ x, z, radius: NPC_DEFAULT_RADIUS }, obstacles),
      {
        attempt,
        rng,
        forbidden: state.retreats
          .filter((spot) => spot.until > controllerElapsed)
          .map((spot) => ({ x: spot.x, z: spot.z })),
      },
    );
    if (escape === null) return false;
    // Remember where we are standing: whatever happens, do not let a
    // later escape walk straight back into this blocked spot.
    state.retreats = [
      ...state.retreats.filter((spot) => spot.until > controllerElapsed).slice(1 - RETURN_MEMORY_SPOTS),
      { x: self.x, z: self.z, until: controllerElapsed + RETURN_MEMORY_S },
    ].slice(-RETURN_MEMORY_SPOTS);
    const point = new THREE.Vector3(escape.x, object.position.y, escape.z);
    if (state.escapeIndex === state.segmentIndex + 1) state.path[state.escapeIndex] = point;
    else {
      state.path.splice(state.segmentIndex + 1, 0, point);
      state.escapeIndex = state.segmentIndex + 1;
    }
    state.distanceInSegment = 0;
    return true;
  };

  /** C-48 v4: standing NPCs as temporary obstacles for the planner.
   *
   *  THE structural fix. `planNpcPath` only ever knew about furniture,
   *  so re-planning around a person returned the identical straight
   *  line - the NPC stepped aside and then walked right back into the
   *  blocker, forever (Lucas: "go back and forth in a loop"). Feeding
   *  the blockers in as obstacles makes A* produce a genuinely
   *  different route that cannot lead back into them.
   *
   *  Only STANDING NPCs become obstacles: someone walking will clear
   *  the way by themselves, and boxing them would rewrite every route
   *  every frame. A box covering this NPC's own position or its
   *  destination is skipped, or the plan could never start or finish. */
  const blockerBoxes = (npcId: NpcId, from: THREE.Vector3, to: THREE.Vector3): AABB[] => {
    const boxes: AABB[] = [];
    for (const other of npcs) {
      if (other.id === npcId) continue;
      const otherObject = npcObjects[other.id];
      if (!otherObject.visible) continue;
      const otherState = runtime.get(other.id)!;
      if (Math.hypot(otherState.velocity.x, otherState.velocity.z) > 0.15) continue;
      if (Math.hypot(otherObject.position.x - from.x, otherObject.position.z - from.z) > 6) continue;
      const box: AABB = {
        minX: otherObject.position.x - BLOCKER_BOX_HALF,
        maxX: otherObject.position.x + BLOCKER_BOX_HALF,
        minZ: otherObject.position.z - BLOCKER_BOX_HALF,
        maxZ: otherObject.position.z + BLOCKER_BOX_HALF,
      };
      const covers = (point: THREE.Vector3): boolean =>
        point.x >= box.minX && point.x <= box.maxX && point.z >= box.minZ && point.z <= box.maxZ;
      if (covers(from) || covers(to)) continue;
      boxes.push(box);
    }
    return boxes;
  };

  /** C-48 v3/v4: a fresh A* route from where the NPC actually stands,
   *  routed AROUND the people currently standing in the way. */
  const replanFrom = (npcId: NpcId, target: THREE.Vector3, avoidPeople: boolean): boolean => {
    const state = runtime.get(npcId)!;
    const object = npcObjects[npcId];
    const from = object.position.clone();
    const to = target.clone();
    const planningObstacles = avoidPeople
      ? [...obstacles, ...blockerBoxes(npcId, from, to)]
      : obstacles;
    const replanned = planNpcPath(from, to, CORRIDOR_WAYPOINTS, edges, planningObstacles);
    if (replanned === null) return false;
    if (avoidPeople) {
      const direct = Math.hypot(to.x - from.x, to.z - from.z);
      let length = 0;
      for (let index = 1; index < replanned.length; index += 1) {
        length += replanned[index]!.distanceTo(replanned[index - 1]!);
      }
      if (direct > 0.5 && length > direct * ROUTE_DETOUR_LIMIT) return false;
    }
    state.replanCooldownUntil = controllerElapsed + REPLAN_COOLDOWN_S;
    state.path = replanned;
    state.segmentIndex = 0;
    state.distanceInSegment = 0;
    state.escapeIndex = -1;
    return true;
  };

  const startPath = (npcId: NpcId, entry: ScheduleEntry, delay: number): boolean => {
    const object = npcObjects[npcId];
    const state = runtime.get(npcId)!;
    const target = new THREE.Vector3(entry.position.x, entry.position.y, entry.position.z);
    if (object.position.distanceTo(target) <= 1e-6) { settle(npcId, entry); return true; }
    const path = planNpcPath(object.position.clone(), target, CORRIDOR_WAYPOINTS, edges, obstacles);
    if (path === null) return false;
    state.path = path;
    state.segmentIndex = 0;
    state.distanceInSegment = 0;
    state.target = entry;
    state.departureDelay = Math.max(0, delay);
    state.baseY = entry.position.y;
    state.velocity = { x: 0, z: 0 };
    state.blockedFor = 0;
    state.escapeAttempt = 0;
    state.nextEscapeAt = FIRST_ESCAPE_AFTER_S;
    state.escapeIndex = -1;
    state.anchor = null;
    state.blockedBy = null;
    state.clearFor = 0;
    state.yieldWaits = 0;
    state.retreats = [];
    state.replanCooldownUntil = 0;
    state.progressAnchor = { x: object.position.x, z: object.position.z };
    state.progressWindow = 0;
    state.livelocked = false;
    state.waitingUntil = 0;
    state.lastEscapeDistance = -1;
    state.futileEscapes = 0;
    state.tripElapsed = 0;
    let routeLength = 0;
    for (let index = 1; index < path.length; index += 1) {
      routeLength += path[index]!.distanceTo(path[index - 1]!);
    }
    state.tripAllowance =
      (routeLength / Math.max(0.1, npcs.find((candidate) => candidate.id === npcId)?.walkSpeed ?? 1.2)) *
        TRIP_ALLOWANCE_FACTOR + TRIP_ALLOWANCE_GRACE_S;
    object.visible = entry.state !== "gone-home";
    object.userData.npcState = "walking";
    return true;
  };

  const startKitchen = (npcId: NpcId, returnEntry: ScheduleEntry, lunch: boolean): void => {
    const state = runtime.get(npcId)!;
    state.kitchenStops = pickKitchenSequence(npcId, rng);
    state.kitchenIndex = 0;
    state.dwellRemaining = 0;
    state.returnEntry = returnEntry;
    const first = state.kitchenStops[0];
    if (first === undefined) return;
    const delay = lunch ? LUNCH_STAGGER_OFFSET(npcId, getDay(), rng) : rng() * 0.3;
    if (!startPath(npcId, first.entry, delay)) {
      state.kitchenStops = null;
      state.returnEntry = null;
      strand(npcId);
    }
  };

  /** No route exists: rather than leaving the NPC frozen mid-office
   *  with a stale "walking" state (which also blocks the idle
   *  animation), strand it in place as at-desk. */
  const strand = (npcId: NpcId): void => {
    const state = runtime.get(npcId)!;
    state.path = null;
    state.kitchenStops = null;
    state.returnEntry = null;
    state.target = null;
    state.anchor = { x: npcObjects[npcId].position.x, z: npcObjects[npcId].position.z };
    npcObjects[npcId].userData.npcState = "at-desk";
  };

  const planForEntry = (npcId: NpcId, entry: ScheduleEntry, lunch = false): void => {
    if (entry.state === "kitchen") startKitchen(npcId, NPC_SCHEDULES[npcId][getCurrentPeriod()], lunch);
    else if (!startPath(npcId, entry, rng() * 0.3)) strand(npcId);
  };

  const synchronizePeriod = (period: Period): void => {
    lastPeriod = period;
    overrides.clear();
    validatedDestinations.clear();
    // Everyone re-plans across the office, so any in-flight exchange
    // would end up as bubbles over NPCs walking away from each other.
    conversations.clear();
    for (const npc of npcs) {
      const state = runtime.get(npc.id)!;
      state.path = null; state.kitchenStops = null; state.dwellRemaining = 0; state.returnEntry = null;
      planForEntry(npc.id, NPC_SCHEDULES[npc.id][period]);
    }
  };

  const finishWalk = (npcId: NpcId): void => {
    const state = runtime.get(npcId)!;
    const target = state.target;
    if (target === null) return;
    // C-48: never settle on top of someone. If the destination is
    // taken, park on the arrival ring beside them (the "meeting") -
    // the chatter system picks the pair up from there.
    const occupants: { x: number; z: number }[] = [];
    for (const other of npcs) {
      if (other.id === npcId) continue;
      const object = npcObjects[other.id];
      if (!object.visible) continue;
      occupants.push({ x: object.position.x, z: object.position.z });
    }
    const spot = arrivalClearOf(
      { x: target.position.x, z: target.position.z },
      occupants,
      MIN_SEPARATION,
      (x, z) => isSpawnBlocked({ x, z, radius: NPC_DEFAULT_RADIUS }, obstacles),
    );
    settle(npcId, { ...target, position: { x: spot.x, y: target.position.y, z: spot.z } });
    if (state.kitchenStops !== null && state.kitchenIndex < state.kitchenStops.length) {
      const stop = state.kitchenStops[state.kitchenIndex]!;
      state.dwellRemaining = KITCHEN_STOP_DWELL[stop.id];
      npcObjects[npcId].userData.npcState = "dwelling";
    }
  };

  /** C-48 v5: stop trying and stand where you are. Used when a trip has
   *  been contested for too long - the NPC keeps its schedule state but
   *  gives up on the exact spot, which is invisible to the player and
   *  ends the shuffling for good. */
  const settleInPlace = (npcId: NpcId): void => {
    const state = runtime.get(npcId)!;
    const object = npcObjects[npcId];
    const target = state.target;
    if (target === null) { strand(npcId); return; }
    const occupants: { x: number; z: number }[] = [];
    for (const other of npcs) {
      if (other.id === npcId) continue;
      const otherObject = npcObjects[other.id];
      if (otherObject.visible) occupants.push({ x: otherObject.position.x, z: otherObject.position.z });
    }
    const spot = arrivalClearOf(
      { x: object.position.x, z: object.position.z },
      occupants,
      MIN_SEPARATION,
      (x, z) => isSpawnBlocked({ x, z, radius: NPC_DEFAULT_RADIUS }, obstacles),
    );
    state.kitchenStops = null;
    state.returnEntry = null;
    settle(npcId, {
      position: { x: spot.x, y: state.baseY, z: spot.z },
      face: object.rotation.y,
      state: target.state === "gone-home" ? target.state : "at-desk",
    });
  };

  const continueKitchen = (npcId: NpcId): void => {
    const state = runtime.get(npcId)!;
    if (state.kitchenStops === null) return;
    state.kitchenIndex += 1;
    const next = state.kitchenStops[state.kitchenIndex];
    if (next !== undefined) { startPath(npcId, next.entry, 0); return; }
    const returnEntry = state.returnEntry;
    state.kitchenStops = null;
    state.returnEntry = null;
    if (returnEntry !== null) startPath(npcId, returnEntry, 0);
  };

  const update = (dt: number): void => {
    if (destroyed) return;
    const safeDt = Number.isFinite(dt) ? Math.max(0, dt) : 0;
    idleElapsed += safeDt; bubbleElapsed += safeDt; controllerElapsed += safeDt;
    if (bubbleSystem !== null && sceneRoot !== null) {
      const camera = sceneRoot.getObjectByProperty("isCamera", true) as THREE.Camera | undefined;
      bubbleSystem.update(safeDt, camera ?? fallbackCamera);
    }

    const period = getCurrentPeriod();
    if (lastPeriod === null) {
      lastPeriod = period;
      // C-45 amendment (l)/morning entry: every NPC starts the day
      // at the front door and walks to their morning destination.
      // Each NPC gets a per-NPC delay (rng) so they don't all enter
      // on the same frame; some are "late" (up to 8 s), some are
      // on time (0-1 s), some are mid (2-4 s). The door is at
      // (0, 0, 8.4) - the main office's south wall gap. The morning
      // schedule entry is the walk target. The stagger means the
      // office "fills up" over a few seconds at game start.
      const doorTarget = { x: 0, y: 0, z: 8.4 };
      for (const npc of npcs) {
        const morning = NPC_SCHEDULES[npc.id][period];
        if (npc.id === "burek") { settle(npc.id, morning); continue; }
        // Per-NPC late/early/mid delay: hash from id (stable) +
        // a per-NPC jitter (rng) so the day looks varied.
        let h = 0;
        for (let i = 0; i < npc.id.length; i += 1) h = (h * 31 + npc.id.charCodeAt(i)) >>> 0;
        const baseDelay = (h & 0xff) / 0xff; // 0..1, stable per NPC
        const jitter = rng() * 1.5;          // 0..1.5 s of frame noise
        const delay = baseDelay * 8 + jitter; // 0..9.5 s, mostly late-arrivers
        npcObjects[npc.id].position.set(doorTarget.x, doorTarget.y, doorTarget.z);
        startPath(npc.id, morning, delay);
      }
    } else if (period !== lastPeriod) synchronizePeriod(period);

    // Who is mid-conversation this frame: they hold still for the chat
    // instead of creeping onward.
    const chattingNow = new Set<NpcId>();
    for (const conversation of conversations.values()) {
      chattingNow.add(conversation.aId);
      chattingNow.add(conversation.bId);
    }

    // --- C-48 movement, pass 1: advance along paths -----------------
    // (The old single loop advanced AND animated AND "avoided" per
    // NPC; splitting it lets the stop check, separation and the gait
    // see every NPC's final position for the frame.)
    interface WalkFrame {
      npc: NPC;
      before: THREE.Vector3;
      movementDt: number;
    }
    const walkFrames: WalkFrame[] = [];
    // Positions at the start of the frame - the straight-line (capsule)
    // stop check and the detour selector read these.
    interface Neighbour { id: NpcId; x: number; z: number; vx: number; vz: number }
    const snapshot = new Map<NpcId, Neighbour>();
    for (const npc of npcs) {
      const object = npcObjects[npc.id];
      const velocity = runtime.get(npc.id)!.velocity;
      if (object.visible) {
        snapshot.set(npc.id, {
          id: npc.id, x: object.position.x, z: object.position.z, vx: velocity.x, vz: velocity.z,
        });
      }
    }
    const othersOf = (npcId: NpcId): Neighbour[] => {
      const others: Neighbour[] = [];
      for (const [id, point] of snapshot) {
        if (id !== npcId) others.push(point);
      }
      return others;
    };
    /** C-48 v4: only STANDING or HEAD-ON neighbours are worth stopping
     *  for. Freezing for someone merely crossing our line was the bulk
     *  of the standing-around: they walk on by themselves within a
     *  stride, and hard separation keeps the near-miss honest. */
    const obstructing = (self: { x: number; z: number }, other: Neighbour): boolean => {
      const speed = Math.hypot(other.vx, other.vz);
      if (speed <= CROSSING_SPEED) return true;
      const dx = self.x - other.x;
      const dz = self.z - other.z;
      const distance = Math.hypot(dx, dz);
      if (distance <= 1e-6) return true;
      return (other.vx * dx + other.vz * dz) / (speed * distance) > CLOSING_DOT;
    };
    for (const npc of npcs) {
      const state = runtime.get(npc.id)!;
      const object = npcObjects[npc.id];
      state.velocity = { x: 0, z: 0 };
      if (state.dwellRemaining > 0) {
        state.dwellRemaining = Math.max(0, state.dwellRemaining - safeDt);
        if (state.dwellRemaining === 0) continueKitchen(npc.id);
      }
      if (state.path === null) {
        object.position.y = state.baseY;
        continue;
      }
      let movementDt = safeDt;
      if (state.departureDelay > 0) {
        const waited = Math.min(state.departureDelay, movementDt);
        state.departureDelay -= waited;
        movementDt -= waited;
        if (movementDt <= 0) {
          object.position.y = state.baseY;
          continue;
        }
      }
      // C-48 v2: stop at a distance. Anyone standing inside the
      // straight walk line freezes this NPC RIGHT HERE - they face
      // each other and chat instead of pressing together - and the
      // blocked ladder in pass 4 re-routes afterwards.
      const nextWaypoint = state.path[state.segmentIndex + 1];
      const here = { x: object.position.x, z: object.position.z };
      state.blockedBy = nextWaypoint === undefined ? null : blockerAhead(
        here,
        nextWaypoint.x - here.x,
        nextWaypoint.z - here.z,
        othersOf(npc.id).filter((other) => obstructing(here, other)),
      ) as NpcId | null;
      // While an escape leg is pending, the stop check is suspended for
      // this NPC: the escape exists precisely to break a jam, and the
      // rule that triggered it must not freeze it. Hard separation
      // still keeps everyone MIN_SEPARATION apart.
      const blockedByCapsule = state.escapeIndex < 0 && state.blockedBy !== null;
      // Stop, do not creep. Creeping into the person ahead was measured
      // WORSE across a full day (jam episodes 63 -> 155): pressing
      // forward fights the separation constraint every frame and simply
      // spreads the contention around.
      if (blockedByCapsule || controllerElapsed < state.waitingUntil || chattingNow.has(npc.id)) {
        state.velocity = { x: 0, z: 0 };
        walkFrames.push({ npc, before: object.position.clone(), movementDt });
        continue;
      }
      const before = object.position.clone();
      const advanced = advanceAlongPath(before, state.path, state.segmentIndex, state.distanceInSegment, npc.walkSpeed, movementDt);
      state.segmentIndex = advanced.segmentIndex;
      state.distanceInSegment = advanced.distanceInSegment;
      object.position.copy(advanced.position);
      object.rotation.y = advanced.face;
      state.velocity = movementDt > 0
        ? { x: (object.position.x - before.x) / movementDt, z: (object.position.z - before.z) / movementDt }
        : { x: 0, z: 0 };
      if (advanced.finished) finishWalk(npc.id);
      else {
        object.userData.npcState = "walking";
        walkFrames.push({ npc, before, movementDt });
      }
    }

    // --- C-48 pass 3: hard separation (CURE) ------------------------
    // Nobody closer than MIN_SEPARATION, ever. Two walkers split the
    // correction 50/50; a walker normally yields the FULL correction to
    // a settled NPC (schedule-owned positions do not drift).
    //
    // EXCEPT when the walker is escaping a jam: then the pair floor
    // drops to SQUEEZE_SEPARATION and the settled blocker takes half
    // the correction, so the crowd PARTS instead of fencing the walker
    // in. Without this a cluster is impassable by construction - a gap
    // between two NPCs is only 0.8-1.5 m wide, but passing at the full
    // floor would need 1.6 m, so whoever is in the middle is trapped
    // no matter how many escape routes they try.
    const isEscaping = (npcId: NpcId): boolean => {
      const state = runtime.get(npcId)!;
      return state.path !== null &&
        (state.escapeIndex >= 0 || state.blockedBy !== null ||
          state.blockedFor >= FIRST_ESCAPE_AFTER_S);
    };
    for (let iteration = 0; iteration < 2; iteration += 1) {
      for (let i = 0; i < npcs.length; i += 1) {
        const a = npcs[i]!;
        const aObject = npcObjects[a.id];
        if (!aObject.visible) continue;
        for (let j = i + 1; j < npcs.length; j += 1) {
          const b = npcs[j]!;
          const bObject = npcObjects[b.id];
          if (!bObject.visible) continue;
          const aWalking = aObject.userData.npcState === "walking";
          const bWalking = bObject.userData.npcState === "walking";
          if (!aWalking && !bWalking) continue;
          const aEscaping = aWalking && isEscaping(a.id);
          const bEscaping = bWalking && isEscaping(b.id);
          const floor = aEscaping || bEscaping ? SQUEEZE_SEPARATION : MIN_SEPARATION;
          const correction = separationCorrection(aObject.position, bObject.position, floor);
          if (correction === null) continue;
          const aShare = aWalking && bWalking ? 0.5 : aWalking ? (aEscaping ? 0.5 : 1) : (bEscaping ? 0.5 : 0);
          const bShare = 1 - aShare;
          applyDisplacement(aObject, -correction.nx * correction.penetration * aShare, -correction.nz * correction.penetration * aShare);
          applyDisplacement(bObject, correction.nx * correction.penetration * bShare, correction.nz * correction.penetration * bShare);
        }
      }
    }

    // --- C-48 v3 pass 3b: the crowd closes back up ------------------
    // A settled NPC that was shoved aside walks back to where it
    // settled, once its spot is free again.
    for (const npc of npcs) {
      const state = runtime.get(npc.id)!;
      const object = npcObjects[npc.id];
      const anchor = state.anchor;
      if (anchor === null || state.path !== null || !object.visible) continue;
      if (object.userData.npcState === "walking") continue;
      const dx = anchor.x - object.position.x;
      const dz = anchor.z - object.position.z;
      const distance = Math.hypot(dx, dz);
      if (distance < 0.02) continue;
      const occupied = npcs.some((other) => {
        if (other.id === npc.id) return false;
        const otherObject = npcObjects[other.id];
        if (!otherObject.visible) return false;
        return Math.hypot(otherObject.position.x - anchor.x, otherObject.position.z - anchor.z) < MIN_SEPARATION;
      });
      if (occupied) continue;
      const step = Math.min(distance, ANCHOR_RETURN_SPEED * safeDt);
      applyDisplacement(object, (dx / distance) * step, (dz / distance) * step);
    }

    // --- C-48 v2 pass 4: gait + blocked ladder (DEADLOCK) -----------
    // The gait advances by the metres ACTUALLY moved, so a stopped NPC
    // stands still instead of marching in place ("no more jumping").
    // The ladder: settle beside the blocker when near the destination;
    // else straight detour right, then left, then a full A* re-plan;
    // then stand and chat until the way clears.
    for (const frame of walkFrames) {
      const state = runtime.get(frame.npc.id)!;
      if (state.path === null) continue;
      const object = npcObjects[frame.npc.id];
      const moved = Math.hypot(object.position.x - frame.before.x, object.position.z - frame.before.z);
      const cycle = updateWalkCycle(state.walkCycle, frame.movementDt, frame.npc.walkSpeed, moved);
      state.walkCycle = cycle.state;
      object.position.y = state.baseY + cycle.bobAmount;
      const leftLeg = object.getObjectByName("left-leg");
      const rightLeg = object.getObjectByName("right-leg");
      const leftArm = object.getObjectByName("arm-left");
      const rightArm = object.getObjectByName("arm-right");
      if (leftLeg) leftLeg.rotation.x = cycle.legSwing;
      if (rightLeg) rightLeg.rotation.x = -cycle.legSwing;
      if (leftArm) leftArm.rotation.x = cycle.armSwing;
      if (rightArm) rightArm.rotation.x = -cycle.armSwing;

      state.tripElapsed += frame.movementDt;
      if (state.tripElapsed > state.tripAllowance) {
        settleInPlace(frame.npc.id);
        continue;
      }

      // Livelock window: did this NPC actually get anywhere?
      state.progressWindow += frame.movementDt;
      if (state.progressWindow >= LIVELOCK_WINDOW_S) {
        const net = Math.hypot(
          object.position.x - state.progressAnchor.x,
          object.position.z - state.progressAnchor.z,
        );
        state.livelocked = net < LIVELOCK_MIN_PROGRESS;
        state.progressAnchor = { x: object.position.x, z: object.position.z };
        state.progressWindow = 0;
      }

      const expected = frame.npc.walkSpeed * frame.movementDt;
      const frozen = expected > 0 && moved < expected * BLOCKED_PROGRESS_RATIO;
      // Walking on the spot counts as stuck exactly like standing still,
      // which is what arms the escape ladder AND the squeeze floor that
      // lets the NPC slip past whoever it is fighting.
      const blocked = frozen || state.livelocked;
      if (!blocked) {
        state.blockedFor = 0;
        state.nextEscapeAt = FIRST_ESCAPE_AFTER_S;
        // The ladder REMEMBERS across short bursts of movement: only
        // sustained clear walking wipes it. Resetting on any progress
        // is what let a pair bump, back off, re-approach and repeat the
        // identical rung forever.
        state.clearFor += frame.movementDt;
        state.livelocked = false;
        if (state.clearFor >= ESCAPE_MEMORY_S) {
          state.escapeAttempt = 0;
          state.yieldWaits = 0;
          state.futileEscapes = 0;
          state.lastEscapeDistance = -1;
        }
        // The escape leg is done once the NPC has walked past it.
        if (state.escapeIndex >= 0 && state.segmentIndex >= state.escapeIndex) state.escapeIndex = -1;
        continue;
      }
      state.clearFor = 0;
      state.blockedFor += frame.movementDt;
      if (state.livelocked) state.blockedFor = Math.max(state.blockedFor, FIRST_ESCAPE_AFTER_S);
      const target = state.path[state.path.length - 1]!;
      const distanceToTarget = Math.hypot(target.x - object.position.x, target.z - object.position.z);
      if (distanceToTarget <= BLOCKED_ARRIVAL_RADIUS) {
        // The "meeting": park beside whoever occupies the destination.
        if (state.blockedFor >= BLOCKED_SETTLE_AFTER_S) finishWalk(frame.npc.id);
        continue;
      }
      // The long "stop and chat" beat belongs to NPCs that are ACTUALLY
      // talking; anyone merely in the way gets going promptly. A
      // universal 5 s pause just left the office standing around.
      const chatting = [...conversations.values()].some(
        (conversation) => conversation.aId === frame.npc.id || conversation.bId === frame.npc.id,
      );
      const pause = chatting ? CHAT_PAUSE_S : FIRST_ESCAPE_AFTER_S;
      if (state.blockedFor < pause || state.blockedFor < state.nextEscapeAt) continue;
      // Head-on standoff: exactly one of the pair steps aside. Both
      // acting at once is a perfect mirror - they retreat together and
      // re-approach together, forever. The other one holds the lane
      // (and keeps chatting), capped so a stalled partner cannot freeze
      // it for good.
      const blockerId = state.blockedBy;
      const partner = blockerId === null ? undefined : runtime.get(blockerId);
      if (
        blockerId !== null && partner?.blockedBy === frame.npc.id &&
        !givesWayTo(frame.npc.id, blockerId) && state.yieldWaits < MAX_YIELD_WAITS
      ) {
        state.yieldWaits += 1;
        state.nextEscapeAt = state.blockedFor + ESCAPE_RETRY_S;
        continue;
      }
      // The loop that never gives up. The attempt counter advances
      // whether or not the attempt succeeds, so a failed escape can
      // never swallow the escalation (v2's deadlock), and the retry is
      // rescheduled every time - there is no terminal rung.

      // Is this manoeuvring actually getting us anywhere?
      if (state.lastEscapeDistance >= 0) {
        if (distanceToTarget >= state.lastEscapeDistance - 0.2) state.futileEscapes += 1;
        else state.futileEscapes = 0;
      }
      state.lastEscapeDistance = distanceToTarget;
      if (state.escapeAttempt >= MAX_ESCAPE_ATTEMPTS || state.futileEscapes >= MAX_FUTILE_ESCAPES) {
        // Enough shuffling: hold position, keep chatting, and look
        // again shortly. The attempt counter restarts so the ladder
        // still never dead-ends.
        state.waitingUntil = controllerElapsed + WAIT_RECHECK_S;
        state.nextEscapeAt = state.blockedFor + WAIT_RECHECK_S;
        state.escapeAttempt = 0;
        state.futileEscapes = 0;
        state.livelocked = false;
        continue;
      }
      state.escapeAttempt += 1;
      // Retry cadence is jittered per NPC so a pair cannot stay in
      // lockstep even when they start blocked on the same frame.
      state.nextEscapeAt = state.blockedFor + ESCAPE_RETRY_S * (0.75 + rng() * 0.5);
      // ROUTE AROUND THE PEOPLE FIRST - but only around people who are
      // actually STANDING there, and only if we have not just committed
      // to a route. Re-routing the whole trip to dodge someone who is
      // walking past anyway is how an NPC ends up pacing all day.
      const blockerState = blockerId === null ? undefined : runtime.get(blockerId);
      const blockerStanding = blockerState === undefined ||
        Math.hypot(blockerState.velocity.x, blockerState.velocity.z) <= CROSSING_SPEED;
      const mayReplan = controllerElapsed >= state.replanCooldownUntil;
      if (blockerStanding && mayReplan && replanFrom(frame.npc.id, target, true)) continue;
      // Enclosed: shoulder out of the jam with a local escape step.
      if (insertEscape(frame.npc.id, state.escapeAttempt)) continue;
      // Last resort: any route at all, people ignored.
      if (mayReplan) replanFrom(frame.npc.id, target, false);
    }

    for (const npc of npcs) {
      const object = npcObjects[npc.id];
      if (!object.visible || object.userData.npcState === "walking") continue;
      const idle = idleStates.get(npc.id) ?? createInitialIdleState(0, npc.id);
      idleStates.set(npc.id, updateIdle(idle, safeDt, object.position, object.rotation.y, object, idleElapsed, rng));
    }

    // --- C-46 conversation manager ---------------------------------
    // Responses: each frame, deliver the partner's reply when the
    // starter's bubble has had its moment. The pair then cools down so
    // the NEXT exchange belongs to a different pair.
    for (const [key, conversation] of [...conversations]) {
      if (controllerElapsed - conversation.starterAt < RESPONSE_DELAY_S) continue;
      conversations.delete(key);
      pairCooldowns.set(key, controllerElapsed + PAIR_COOLDOWN_S);
      const responder = npcObjects[conversation.bId];
      if (responder === undefined || !responder.visible || responder.userData.npcState === "gone-home") continue;
      bubbleSystem?.show(responder.position, conversation.response);
      if (conversation.bId === "burek") lastBurekBubbleAt = controllerElapsed;
    }

    if (bubbleElapsed >= 1) {
      bubbleElapsed = 0;
      if (conversations.size < MAX_CONVERSATIONS && controllerElapsed >= nextStartAt) {
        // Candidates: everyone visible, out of home, not already mid-
        // conversation. The room comes from the position so the
        // second simultaneous conversation lands in a different room.
        const busy = new Set<string>();
        for (const conversation of conversations.values()) {
          busy.add(conversation.aId); busy.add(conversation.bId);
        }
        const candidates = npcs
          .filter((npc) => {
            const object = npcObjects[npc.id];
            return object.visible && object.userData.npcState !== "gone-home" && !busy.has(npc.id);
          })
          .map((npc) => {
            const object = npcObjects[npc.id];
            return { id: npc.id, x: object.position.x, z: object.position.z, room: roomAt(object.position.x, object.position.z) };
          });
        const activeRooms = new Set<RoomId>();
        for (const conversation of conversations.values()) {
          const a = npcObjects[conversation.aId];
          const b = npcObjects[conversation.bId];
          activeRooms.add(roomAt(a.position.x, a.position.z));
          activeRooms.add(roomAt(b.position.x, b.position.z));
        }
        const pairs = candidatePairs(candidates, CHATTER_RADIUS, {
          cooldowns: pairCooldowns,
          now: controllerElapsed,
          activeRooms,
        });
        const pair = pickPair(pairs, rng);
        const first = pair === null ? undefined : npcObjects[pair.a as NpcId];
        const second = pair === null ? undefined : npcObjects[pair.b as NpcId];
        // candidatePairs already enforces CHATTER_RADIUS on every pair;
        // nextStartAt is the pacing schedule (see nextStartDelay). If
        // no pair qualifies we simply keep waiting - the schedule stays
        // due, so chatter resumes the moment two NPCs are nearby.
        if (pair !== null && first !== undefined && second !== undefined) {
          // C-46: the STARTER is a chattiness-weighted coin flip
          // inside the pair - this is what stops "only one person
          // talks all the time".
          const starterId = pickStarter(pair.a, pair.b, rng) as NpcId;
          const responderId = (starterId === pair.a ? pair.b : pair.a) as NpcId;
          // C-46 (Lucas): lunch lines are TIME-gated, not
          // location-gated - during the lunch window every human pair
          // sounds like lunch, wherever they stand. The starter's
          // topic affinities filter the pool (C-46 amendment).
          const exchange = pickExchange(isLunchActive() ? LUNCH_CHATTER : OFFICE_CHATTER, rng, starterId);
          // Burek cannot do small talk: as a starter he just barks
          // (one turn); as a responder he barks back.
          const starterLine = starterId === "burek"
            ? pickLine(BUREK_LINES, rng)
            : exchange.starter;
          const responseLine = starterId === "burek"
            ? null
            : responderId === "burek"
              ? pickLine(BUREK_LINES, rng)
              : pickLine(exchange.responses, rng);
          bubbleSystem?.show(npcObjects[starterId].position, starterLine);
          // Face each other for the exchange.
          const dx = second.position.x - first.position.x;
          const dz = second.position.z - first.position.z;
          first.rotation.y = Math.atan2(dx, dz);
          second.rotation.y = Math.atan2(-dx, -dz);
          if (starterId === "burek") lastBurekBubbleAt = controllerElapsed;
          const key = pairKey(pair.a, pair.b);
          if (responseLine === null) {
            pairCooldowns.set(key, controllerElapsed + PAIR_COOLDOWN_S);
          } else {
            conversations.set(key, { aId: starterId, bId: responderId, starterLine: starterLine, response: responseLine, starterAt: controllerElapsed });
          }
          // Schedule the next start AFTER recording this one, so the
          // 35% overlap gap can fire against the just-started exchange.
          nextStartAt = controllerElapsed + nextStartDelay(conversations.size, rng);
        }
      }
    }

    if (controllerElapsed >= barkAt) {
      const burek = npcs.find((npc) => npc.id === "burek");
      const object = burek === undefined ? undefined : npcObjects.burek;
      if (object !== undefined && object.visible && object.userData.npcState !== "gone-home" && controllerElapsed - lastBurekBubbleAt >= 60) {
        bubbleSystem?.show(object.position, pickLine(BUREK_LINES, rng));
        lastBurekBubbleAt = controllerElapsed;
        barkAt = controllerElapsed + nextBarkDelay(rng);
      } else barkAt = Math.max(barkAt + 1, lastBurekBubbleAt + 60);
    }
  };

  return {
    update,
    destroy: () => { destroyed = true; bubbleSystem?.destroy(); },
    getNpcIds: () => npcs.map((npc) => npc.id),
    getActiveConversations: () => [...conversations.values()].map((conversation) => ({
      a: conversation.aId,
      b: conversation.bId,
      responseIn: Math.max(0, RESPONSE_DELAY_S - (controllerElapsed - conversation.starterAt)),
      starterLine: conversation.starterLine,
    })),
    setOverride: (npcId, entry) => {
      const period = getCurrentPeriod();
      if (lastPeriod !== null && period !== lastPeriod) synchronizePeriod(period);
      const state = runtime.get(npcId);
      if (state === undefined) return;
      state.path = null; state.kitchenStops = null; state.dwellRemaining = 0; state.returnEntry = null;
      if (entry === null) {
        overrides.delete(npcId); validatedDestinations.delete(npcId);
        planForEntry(npcId, NPC_SCHEDULES[npcId][period]);
        return;
      }
      if (entry.state === "kitchen") {
        overrides.set(npcId, entry);
        startKitchen(npcId, NPC_SCHEDULES[npcId][period], period === "afternoon");
        return;
      }
      const validated = validateOverride(npcId, entry);
      if (validated === null) { settle(npcId, NPC_SCHEDULES[npcId][period]); return; }
      overrides.set(npcId, validated);
      startPath(npcId, validated, rng() * 0.3);
    },
  };
}

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
  MEETING_SEATS,
  NPC_SCHEDULES,
  OFFICE_DOOR,
  pickKitchenSequence,
  planMorningArrivals,
  DEPARTURE_FIRST_AT_S,
  DEPARTURE_SPREAD_S,
  MIN_DEPARTURE_GAP_S,
  DEPARTURE_JITTER_S,
  ENTRANCE_EXIT_AREA,
  type KitchenSequenceStop,
  type MorningArrival,
  type Period,
  type ScheduleEntry,
} from "../content/npc-schedule";
import { pickMorningGreeting } from "../content/morning-greetings";
import { pickEveningGoodbye } from "../content/evening-goodbyes";
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
import { createInitialIdleState, isWorkingAtDesk, resetIdlePose, updateIdle, type IdleState } from "./npc-idle";
import { planNpcPath } from "./npc-path";
import {
  findValidNpcSpawn,
  getNpcObstacles,
  isSpawnBlocked,
  NPC_DEFAULT_RADIUS,
} from "./npc-spawn-validator";
import { updateWalkCycle, type WalkCycleState } from "./npc-walk-cycle";
import { audio } from "../audio/AudioManager";
import {
  PRINTER_FLASH_SWEEP_COUNT,
  PRINTER_FLASH_SWEEP_INTERVAL_S,
  printerFlashIntensity,
} from "./printer-flash";

export const COPY_RUN_INTERVAL_S = { min: 60, max: 120 } as const;
export const COPY_RUN_DWELL_S = { min: 6, max: 10 } as const;
export const RENATA_COPY_NPC_ID: NpcId = "renata";
const PRINTER_STOP: ScheduleEntry = {
  position: { x: 4.4, y: 0, z: 15.6 },
  face: 0,
  state: "at-desk",
};

const MEETING_STATION_BOUND_NPC_IDS: ReadonlySet<NpcId> = new Set([
  "burek",
  "dawid",
  "renata",
]);

/** Pick Zosia's 1-2 meeting guests from colleagues who are physically
 * in the building. Pure so arrival/meeting eligibility cannot regress
 * behind controller timing again. */
export function selectMeetingGuestIds(
  npcs: readonly NPC[],
  period: Period,
  hasArrived: (npcId: NpcId) => boolean,
  rng: () => number,
): NpcId[] {
  const eligible = npcs
    .filter((npc) => npc.id !== "zosia" && !MEETING_STATION_BOUND_NPC_IDS.has(npc.id))
    .filter((npc) => hasArrived(npc.id))
    .filter((npc) => NPC_SCHEDULES[npc.id]![period]!.state === "at-desk")
    .map((npc) => npc.id);
  for (let i = eligible.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [eligible[i], eligible[j]] = [eligible[j]!, eligible[i]!];
  }
  return eligible.slice(0, 1 + Math.floor(rng() * 2));
}

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
  /** C-51: false while an NPC has not walked in through the door yet. */
  hasArrived: (npcId: NpcId) => boolean;
  /** C-46 debug/test hook: the conversations currently in flight. */
  getActiveConversations: () => readonly ActiveConversationView[];
  /**
   * C-54: while the PLAYER is talking to an NPC, that NPC holds still
   * and keeps the face-the-player yaw for the whole dialogue - no
   * schedule walking, no separation shoves, no new chatter pairing,
   * no Burek bark stealing the scene. Null when no player dialogue is
   * open. The NPC's path is kept, so they simply resume where they
   * were when the conversation ends.
   */
  setTalkingToPlayer: (npcId: NpcId | null) => void;
  /**
   * C-61: the controller owns the inter-NPC bubble system (DOM text).
   * main.ts forwards screen state here: bubbles hide outside the
   * office (they are DOM now and would float above other screens'
   * UI) and are cleared when a player dialogue opens.
   */
  setBubblesVisible: (visible: boolean) => void;
  clearBubbles: () => void;
  /** C-61 fix: the real engine camera for DOM bubble projection. */
  setBubblesCamera: (camera: THREE.Camera | null) => void;
  /**
   * ADR 0008: let a non-NPC speaker (the agent companion) use the same
   * bubble layer. Sharing the pool keeps one style, one push-apart pass
   * and one visibility gate, instead of a second layer that would float
   * over the summary and minigame panels.
   */
  showBubble: (position: THREE.Vector3, line: string) => void;
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
  copyPhase: "none" | "outbound" | "copying" | "returning";
  copyElapsed: number;
  copySweepsPlayed: number;
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

/** A blocker may be omitted only when it owns the destination. A box
 * containing the current walker must remain visible to the planner so
 * the failed plan falls through to the escape rung. */
export function blockerBoxCoversDestination(box: AABB, destination: THREE.Vector3): boolean {
  return destination.x >= box.minX && destination.x <= box.maxX &&
    destination.z >= box.minZ && destination.z <= box.maxZ;
}

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

export interface NpcControllerOptions {
  /** C-51: run the staggered morning arrival (early birds at their
   *  desks, everyone else walking in through the door over the
   *  morning). Default true. Tests that exercise the collision and
   *  chatter models set this false so they can place NPCs directly
   *  without the arrival schedule moving them. */
  arrivals?: boolean;
  /** C-57: run the inter-NPC conversation manager. Default true.
   *  Movement-physics tests set this false for the same reason as
   *  `arrivals`: the conversation dice share the controller's rng, so
   *  any chatter tuning would silently reshuffle every escape-jitter
   *  roll and make jam tests seed-fragile. */
  chatter?: boolean;
  /** C-64: injectable so controller tests do not need a browser AudioContext. */
  playSfx?: (id: "sfx_photocopier") => void;
  /** C-64: explicit printer host for isolated controller tests. */
  printerObject?: THREE.Object3D;
}

export function createNpcController(
  npcs: readonly NPC[],
  npcObjects: Readonly<Record<NpcId, THREE.Object3D>>,
  getCurrentPeriod: () => Period,
  getDay: () => number = () => 1,
  rng: () => number = Math.random,
  isLunchActive: () => boolean = () => false,
  options: NpcControllerOptions = {},
): NpcController {
  const arrivalsEnabled = options.arrivals ?? true;
  const chatterEnabled = options.chatter ?? true;
  const playSfx = options.playSfx ?? ((id: "sfx_photocopier") => {
    // Unit simulations run without a DOM or AudioContext. Production
    // browsers use the shared manager; headless runs stay silent.
    if (typeof window !== "undefined") audio().sfx.play(id);
  });
  const obstacles = getNpcObstacles();
  const edges = buildWaypointEdges(CORRIDOR_WAYPOINTS, obstacles, DEFAULT_MAX_EDGE_LENGTH);
  const runtime = new Map<NpcId, NpcRuntime>();
  const idleStates = new Map<NpcId, IdleState>();
  const overrides = new Map<NpcId, ScheduleEntry>();
  /**
   * Cache of depenetrated override destinations.
   *
   * Keyed by NPC *and by the requested position*. Keying on the NPC alone was
   * a real bug: a second setOverride for the same NPC silently reused the
   * FIRST destination, so an NPC could never be sent anywhere twice within a
   * period. It surfaced when the Renata tutorial started summoning Bartek to
   * the player - he walked toward a stale destination and stopped 17 m short.
   */
  const validatedDestinations = new Map<NpcId, { requested: { x: number; z: number }; result: ScheduleEntry }>();
  // C-46 conversation state. Keyed by pairKey so a pair cannot hold
  // two conversations with itself, and cooled down after finishing so
  // the same two NPCs do not monopolize the office chatter.
  const conversations = new Map<string, ActiveConversation>();
  const pairCooldowns = new Map<string, number>();
  // C-56: every morning, every NPC that has shown up fires one
  // random greeting bubble. door-entering NPCs greet on
  // `releaseArrival`; the already-in crowd is spread across the first
  // 2-12 s so the office doesn't open with everyone shouting at once.
  const morningGreeted = new Set<NpcId>();
  // C-56: order in which the already-in crowd greets. Rebuilt every
  // morning by beginMorningArrivals (Fisher-Yates with the same rng as
  // the rest of the system) so two mornings in a row do not greet in
  // the same order.
  let alreadyInGreetOrder: NpcId[] = [];
  let morningGreetIndex = 0;
  let nextMorningGreetAt = 0;
  // C-56: per-NPC "next speech allowed" timestamp. Any bubble (door
  // greet, inter-NPC starter/response, Burek bark) calls
  // `markSpoke(id)`; the chatter manager then refuses to pick a pair
  // where either side is still on cooldown. 4 s is short enough to
  // never kill natural chatter (the cadence is 6-12 s) and long enough
  // to leave ~2 s silence after a 6-8 s greeting bubble expires.
  const nextSpeechAt = new Map<NpcId, number>();
  const SPEECH_COOLDOWN_S = 4;
  const canSpeak = (npcId: NpcId, now: number): boolean =>
    (nextSpeechAt.get(npcId) ?? 0) <= now;
  const markSpoke = (npcId: NpcId, now: number): void => {
    nextSpeechAt.set(npcId, now + SPEECH_COOLDOWN_S);
  };
  // C-54: the NPC currently in a player dialogue, if any.
  let playerTalkingTo: NpcId | null = null;
  let lastPeriod: Period | null = null;
  // C-51: the day the current period bookkeeping belongs to, so a new
  // day's morning re-runs the arrival instead of re-planning everyone
  // from wherever `gone-home` parked them.
  let lastDay: number | null = null;
  // C-51: NPCs who have not walked in yet, and when they will.
  const pendingArrivals = new Map<NpcId, MorningArrival>();
  let arrivalClock = 0;
  // C-62: greetings held until the greeter walks into the office.
  const pendingGreetings = new Set<NpcId>();
  const greetWaitSince = new Map<NpcId, number>();
  /** z below this line = inside the main office (doorway at z≈9.5). */
  const GREET_OFFICE_Z = 9.2;
  // C-62: NPCs waiting for their staggered evening departure, and the
  // clock that releases them (runs while the evening period is on).
  interface Departure {
    npcId: NpcId;
    at: number;
    /** Random point in the entrance zone - not one shared doormat. */
    target: { x: number; z: number };
  }
  const pendingDepartures = new Map<NpcId, Departure>();
  /** C-62: leavers already walking to the exit (no new chatter). */
  const departing = new Set<NpcId>();
  let departureClock = 0;
  // C-62: per-day quirks, derived from the day number so the pattern
  // varies across days but stays deterministic for tests.
  let maciekLeavesEarly = true; // the CTO leaves after the morning
  let ceoOutToday = false; // CEO at a conference: out the whole day
  let destroyed = false;
  let idleElapsed = 0;
  let bubbleElapsed = 0;
  // C-46 amendment: the next exchange START is SCHEDULED, not diced
  // for every second (Lucas: "sometimes too often, other time not
  // often enough"). The first chatter lands 4-8 s after mount.
  let nextStartAt = 4 + rng() * 4;
  let controllerElapsed = 0;
  // C-64: cosmetic copier timing must not consume the simulation RNG;
  // doing so reshuffles arrivals, meetings and departures for everyone.
  let copyRandomState = (getDay() * 2654435761) >>> 0;
  const copyRandom = (): number => {
    copyRandomState = (copyRandomState * 1664525 + 1013904223) >>> 0;
    return copyRandomState / 0x100000000;
  };
  let nextCopyRunAt = npcs.some((npc) => npc.id === RENATA_COPY_NPC_ID)
    ? COPY_RUN_INTERVAL_S.min + copyRandom() * (COPY_RUN_INTERVAL_S.max - COPY_RUN_INTERVAL_S.min)
    : Infinity;
  let lastBurekBubbleAt = -Infinity;
  let barkAt = nextBarkDelay(rng);

  const firstNpc = npcs[0];
  let root: THREE.Object3D | null = firstNpc === undefined ? null : npcObjects[firstNpc.id];
  while (root?.parent) root = root.parent;
  const sceneRoot = root instanceof THREE.Scene ? root : null;
  const printer = options.printerObject ?? sceneRoot?.getObjectByName("xerox-printer") ?? null;
  const scannerFlash = printer === null ? null : new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.09),
    new THREE.MeshBasicMaterial({ color: 0xd8fbff, transparent: true, opacity: 0 }),
  );
  if (scannerFlash !== null && printer !== null) {
    scannerFlash.name = "xerox-scanner-flash";
    scannerFlash.rotation.x = -Math.PI / 2;
    scannerFlash.position.set(0, 1.083, 0);
    scannerFlash.visible = false;
    printer.add(scannerFlash);
  }
  const bubbleSystem = sceneRoot === null ? null : createBubbleSystem(sceneRoot);
  const fallbackCamera = new THREE.PerspectiveCamera();

  for (const npc of npcs) {
    runtime.set(npc.id, {
      path: null, segmentIndex: 0, distanceInSegment: 0,
      walkCycle: { distanceTraveled: 0, amplitude: 1 }, target: null, departureDelay: 0,
      kitchenStops: null, kitchenIndex: 0, dwellRemaining: 0, returnEntry: null,
      copyPhase: "none", copyElapsed: 0, copySweepsPlayed: 0,
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
    // Only a hit when the SAME spot is being requested again; a different
    // destination must be validated afresh.
    if (
      cached !== undefined &&
      Math.abs(cached.requested.x - entry.position.x) < 1e-6 &&
      Math.abs(cached.requested.z - entry.position.z) < 1e-6
    ) {
      return cached.result;
    }
    const valid = findValidNpcSpawn(
      { x: entry.position.x, z: entry.position.z, radius: NPC_DEFAULT_RADIUS }, obstacles, 2,
    );
    if (valid === null) return null;
    const result: ScheduleEntry = {
      position: { x: valid.x, y: entry.position.y, z: valid.z }, face: entry.face, state: entry.state,
    };
    validatedDestinations.set(npcId, {
      requested: { x: entry.position.x, z: entry.position.z },
      result,
    });
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
    // resets them. C-63 extends that to the arm ROLL and the head, which
    // only the desk gestures ever touch.
    for (const part of ["left-leg", "right-leg"]) {
      const node = object.getObjectByName(part);
      if (node) node.rotation.x = 0;
    }
    resetIdlePose(object);
    object.visible = entry.state !== "gone-home" && entry.state !== "conference";
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
   *  every frame. A box covering the destination is skipped so the
   *  route can finish. A box covering the walker's current position is
   *  deliberately KEPT: dropping the blocker at exactly the moment the
   *  walker brushes its box lets A* plan straight back through that
   *  person. A failed re-plan correctly falls through to the local
   *  escape rung, which moves the walker clear before the next re-plan. */
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
      if (blockerBoxCoversDestination(box, to)) continue;
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
    // C-64: authored working points can deliberately sit inside a desk
    // footprint (Renata stands behind/within the reception counter).
    // Ignore only obstacles containing an endpoint so the shared path
    // machinery can walk her out and back; every obstacle between the
    // endpoints remains solid.
    const pathObstacles = obstacles.filter((obstacle) => {
      const contains = (point: THREE.Vector3): boolean =>
        point.x >= obstacle.minX && point.x <= obstacle.maxX &&
        point.z >= obstacle.minZ && point.z <= obstacle.maxZ;
      return !contains(object.position) && !contains(target);
    });
    const path = planNpcPath(object.position.clone(), target, CORRIDOR_WAYPOINTS, edges, pathObstacles);
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
    // C-63: an NPC that leaves the desk mid-facepalm would keep the bent
    // arm for the whole walk - updateIdle is not called for walkers, and
    // the walk cycle only ever writes rotation.x.
    resetIdlePose(object);
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

  const scheduleNextCopyRun = (): void => {
    nextCopyRunAt = controllerElapsed + COPY_RUN_INTERVAL_S.min +
      copyRandom() * (COPY_RUN_INTERVAL_S.max - COPY_RUN_INTERVAL_S.min);
  };

  const startCopyRun = (): void => {
    const state = runtime.get(RENATA_COPY_NPC_ID);
    if (state === undefined || playerTalkingTo === RENATA_COPY_NPC_ID) return;
    const desk = scheduleFor(RENATA_COPY_NPC_ID, getCurrentPeriod());
    state.returnEntry = desk;
    state.copyElapsed = 0;
    state.copySweepsPlayed = 0;
    if (startPath(RENATA_COPY_NPC_ID, PRINTER_STOP, 0)) state.copyPhase = "outbound";
    else {
      state.copyPhase = "none";
      state.returnEntry = null;
      settle(RENATA_COPY_NPC_ID, desk);
      scheduleNextCopyRun();
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

  /**
   * C-62: the day's schedule with the per-day quirks applied. Maciek
   * (CTO) only leaves early on even days; on conference days the CEO
   * is out of the office entirely (invisible, roster says so).
   */
  const scheduleFor = (npcId: NpcId, period: Period): ScheduleEntry => {
    const base = NPC_SCHEDULES[npcId]![period]!;
    if (npcId === "maciek" && period === "afternoon" && !maciekLeavesEarly) {
      return NPC_SCHEDULES.maciek!.morning!;
    }
    if (ceoOutToday && npcId === "dawid") {
      return {
        position: { x: OFFICE_DOOR.x, y: OFFICE_DOOR.y, z: OFFICE_DOOR.z },
        face: Math.PI,
        state: "conference",
      };
    }
    return base;
  };

  const cancelCopyRun = (period: Period): void => {
    const state = runtime.get(RENATA_COPY_NPC_ID);
    if (state === undefined || state.copyPhase === "none") return;
    state.copyPhase = "none";
    state.copyElapsed = 0;
    state.copySweepsPlayed = 0;
    state.dwellRemaining = 0;
    state.returnEntry = null;
    if (scannerFlash !== null) scannerFlash.visible = false;
    settle(RENATA_COPY_NPC_ID, scheduleFor(RENATA_COPY_NPC_ID, period));
    scheduleNextCopyRun();
  };

  const synchronizePeriod = (period: Period): void => {
    lastPeriod = period;
    lastDay = getDay();
    overrides.clear();
    validatedDestinations.clear();
    // Everyone re-plans across the office, so any in-flight exchange
    // would end up as bubbles over NPCs walking away from each other.
    conversations.clear();
    // C-62/C-64 (Lucas: "Zosia's meeting with who?"): 1-2 colleagues
    // join whichever period currently contains Zosia's meeting. Reading
    // the schedule keeps guests aligned if the authored period moves again.
    const meetingGuests = new Map<NpcId, ScheduleEntry>();
    const zosiaMeetingPeriod = (Object.keys(NPC_SCHEDULES.zosia) as Period[])
      .find((candidatePeriod) => NPC_SCHEDULES.zosia[candidatePeriod].state === "meeting");
    if (period === zosiaMeetingPeriod) {
      // C-64: these roles must remain at their public-facing stations;
      // pulling reception or leadership into a random guest slot breaks
      // the tutorial and the authored office hierarchy.
      const guests = selectMeetingGuestIds(
        npcs,
        period,
        (npcId) => !pendingArrivals.has(npcId),
        rng,
      );
      guests.forEach((npcId, index) => {
        const seat = MEETING_SEATS[index % MEETING_SEATS.length]!;
        meetingGuests.set(npcId, seat);
      });
    }
    for (const npc of npcs) {
      // Arrival state is owned exclusively by beginMorningArrivals /
      // releaseArrival. A period synchronization must not cancel the
      // slot, reveal the parked object, or install a path ahead of time.
      if (pendingArrivals.has(npc.id)) continue;
      const state = runtime.get(npc.id)!;
      state.path = null; state.kitchenStops = null; state.dwellRemaining = 0; state.returnEntry = null;
      planForEntry(npc.id, meetingGuests.get(npc.id) ?? scheduleFor(npc.id, period));
    }
  };

  /**
   * C-51: start a day. A few NPCs are already at their desks; the rest
   * wait invisible on the doormat until their arrival moment, then
   * become visible and walk to their morning spot. At most one person
   * is ever visibly in the doorway, because `planMorningArrivals`
   * guarantees a minimum gap between consecutive arrivals.
   */
  const beginMorningArrivals = (period: Period): void => {
    lastPeriod = period;
    lastDay = getDay();
    arrivalClock = 0;
    pendingDepartures.clear();
    departing.clear();
    pendingGreetings.clear();
    greetWaitSince.clear();
    // C-62: roll today's quirks off the day number. The CTO leaves
    // early every other day; the CEO is "Out. Conference" roughly one
    // day a week (and on those days he is simply not in the office).
    maciekLeavesEarly = getDay() % 2 === 0;
    ceoOutToday = getDay() % 7 === 0;
    overrides.clear();
    validatedDestinations.clear();
    conversations.clear();
    pendingArrivals.clear();
    const plan = planMorningArrivals(npcs.map((npc) => npc.id), getDay(), rng);
    // C-56: build the staggered-greeting order for the already-in
    // crowd. Fisher-Yates with the same rng as the rest of the system,
    // so a test that seeds with lcg(N) gets a deterministic order.
    morningGreeted.clear();
    morningGreetIndex = 0;
    nextMorningGreetAt = 0;
    alreadyInGreetOrder = plan
      .filter((arrival) => arrival.mode === "already-in")
      .map((arrival) => arrival.npcId);
    for (let i = alreadyInGreetOrder.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [alreadyInGreetOrder[i], alreadyInGreetOrder[j]] = [
        alreadyInGreetOrder[j]!,
        alreadyInGreetOrder[i]!,
      ];
    }
    for (const arrival of plan) {
      const state = runtime.get(arrival.npcId);
      if (state === undefined) continue;
      state.path = null;
      state.kitchenStops = null;
      state.dwellRemaining = 0;
      state.returnEntry = null;
      state.velocity = { x: 0, z: 0 };
      const entry = scheduleFor(arrival.npcId, period);
      if (arrival.mode === "already-in") {
        settle(arrival.npcId, entry);
        continue;
      }
      // Not here yet: parked INVISIBLE on their own doormat, so the
      // door never accumulates a crowd of people waiting for their cue.
      // Invisible NPCs are excluded from the movement snapshot, the
      // separation pass, chatter pairing, the roster (as "Not in yet")
      // and the interaction raycast, so they are inert until released
      // - and releasing costs no movement, which keeps the crowd-flow
      // metrics honest.
      pendingArrivals.set(arrival.npcId, arrival);
      const object = npcObjects[arrival.npcId];
      object.visible = false;
      object.position.set(arrival.door.x, arrival.door.y, arrival.door.z);
      object.userData.npcState = "arriving";
      state.target = null;
      state.anchor = null;
    }
  };

  /**
   * C-62: start the evening walk-out. Leavers keep doing whatever they
   * were doing until their staggered departure time, then say goodbye
   * and WALK to a random spot in the entrance zone (deep meeting
   * room) - the old transition made them vanish at their desks the
   * moment the evening started. The CEO never leaves (his evening
   * entry is at-desk), Burek stays, and 0-2 random humans stay after
   * hours. NPCs who never walked in today quietly count as absent.
   */
  const beginEveningDepartures = (period: Period): void => {
    lastPeriod = period;
    lastDay = getDay();
    departureClock = 0;
    pendingArrivals.clear();
    pendingDepartures.clear();
    departing.clear();
    overrides.clear();
    validatedDestinations.clear();
    conversations.clear();
        const leavers: NpcId[] = [];
    for (const npc of npcs) {
      const entry = scheduleFor(npc.id, period);
      if (entry.state !== "gone-home") {
        settle(npc.id, entry);
        continue;
      }
      // Still invisible (never walked in today): quietly absent - no
      // departure, no popping into existence at the door later.
      if (!npcObjects[npc.id].visible) {
        settle(npc.id, entry);
        continue;
      }
      leavers.push(npc.id);
    }
    // A couple of lucky humans stay after hours (0-2 of the leavers,
    // deterministic under the seeded rng). They simply keep doing what
    // they were doing - no departure is scheduled for them.
    const shuffled = [...leavers];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }
    const stayLate = new Set(shuffled.slice(0, Math.floor(rng() * 3)));
    const due = shuffled.filter((npcId) => !stayLate.has(npcId));
    due.sort((a, b) => (a < b ? -1 : 1));
    const spacing = due.length > 1 ? DEPARTURE_SPREAD_S / (due.length - 1) : 0;
    for (const npcId of due) {
      const at = DEPARTURE_FIRST_AT_S + due.indexOf(npcId) * spacing + (rng() * 2 - 1) * (DEPARTURE_JITTER_S / 2);
      // Random exit point in the entrance zone - a single doormat made
      // the whole office converge, park on top of each other and get
      // shoved back inside (Lucas, 2026-09-02).
      const target = {
        x: ENTRANCE_EXIT_AREA.minX + rng() * (ENTRANCE_EXIT_AREA.maxX - ENTRANCE_EXIT_AREA.minX),
        z: ENTRANCE_EXIT_AREA.minZ + rng() * (ENTRANCE_EXIT_AREA.maxZ - ENTRANCE_EXIT_AREA.minZ),
      };
      pendingDepartures.set(npcId, { npcId, at, target });
    }
    // Enforce the minimum gap (the jitter can pair two departures).
    const ordered = [...pendingDepartures.values()].sort((a, b) => a.at - b.at);
    for (let index = 1; index < ordered.length; index += 1) {
      const previous = ordered[index - 1]!;
      const current = ordered[index]!;
      if (current.at - previous.at < MIN_DEPARTURE_GAP_S) {
        current.at = previous.at + MIN_DEPARTURE_GAP_S;
        pendingDepartures.set(current.npcId, current);
      }
    }
  };

  /** C-62: put a leaver on the exit path. They say goodbye and WALK to
   *  their random entrance-zone spot; settle() hides them only once
   *  they arrive. */
  const releaseDeparture = (npcId: NpcId): void => {
    const departure = pendingDepartures.get(npcId);
    if (departure === undefined) return;
    pendingDepartures.delete(npcId);
    departing.add(npcId);
    const object = npcObjects[npcId];
    const entry: ScheduleEntry = {
      position: { x: departure.target.x, y: 0, z: departure.target.z },
      face: Math.PI,
      state: "gone-home",
    };
    planForEntry(npcId, entry);
    // startPath hides a gone-home walk at its start; a leaver must be
    // SEEN walking out. If the route failed (strand), they slip out
    // silently instead of standing around as a phantom "at-desk".
    if (object.userData.npcState === "walking") {
      object.visible = true;
      bubbleSystem?.show(object.position, pickEveningGoodbye(npcId, rng));
      markSpoke(npcId, controllerElapsed);
    } else {
      object.visible = false;
      object.userData.npcState = "gone-home";
    }
  };

  /** C-62: release every leaver whose departure time has come. */
  const advanceDepartures = (dt: number): void => {
    if (pendingDepartures.size === 0) return;
    departureClock += dt;
    for (const [npcId, departure] of [...pendingDepartures]) {
      if (departure.at <= departureClock) releaseDeparture(npcId);
    }
  };

  /** C-51: fold the period AND day bookkeeping into one place, so a new
   *  day's morning always runs the arrival and every other transition
   *  runs the ordinary re-plan. */
  const ensureCurrentPeriod = (): Period => {
    const period = getCurrentPeriod();
    const day = getDay();
    const morningArrival = arrivalsEnabled && period === "morning";
    if (lastPeriod === null) {
      if (morningArrival) beginMorningArrivals(period);
      else synchronizePeriod(period);
    } else if (morningArrival && day !== lastDay) {
      beginMorningArrivals(period);
    } else if (period !== lastPeriod) {
      // C-64: period placement supersedes an in-flight copy errand.
      cancelCopyRun(period);
      // C-62: the evening is a staged walk-out, not a mass vanish -
      // leavers get staggered departure times and walk to the
      // entrance; a few (plus the CEO) stay after hours.
      if (period === "evening" && arrivalsEnabled) beginEveningDepartures(period);
      else synchronizePeriod(period);
    }
    return period;
  };

  /** C-51: put a waiting NPC on the doormat and send them to their
   *  spot. The only way an NPC ever enters the world in the morning. */
  const releaseArrival = (npcId: NpcId, period: Period): void => {
    const arrival = pendingArrivals.get(npcId);
    if (arrival === undefined) return;
    pendingArrivals.delete(npcId);
    const object = npcObjects[npcId];
    object.position.set(arrival.door.x, arrival.door.y, arrival.door.z);
    runtime.get(npcId)!.baseY = arrival.door.y;
    planForEntry(npcId, scheduleFor(npcId, period));
    // After planning, not before: an unroutable destination strands the
    // NPC (which leaves `visible` alone), and someone who walked in
    // must be in the room either way.
    object.visible = true;
    // C-56: greet on entry. C-62 (Lucas): not HERE - the spawn is deep
    // in the meeting room and greeting into an empty room reads wrong.
    // The greeting waits until they have walked through the doorway
    // into the office (see advanceArrivals).
    pendingGreetings.add(npcId);
    greetWaitSince.set(npcId, controllerElapsed);
  };

  /** C-51: release everyone whose arrival time has come. */
  const advanceArrivals = (period: Period, dt: number): void => {
    if (pendingArrivals.size > 0) {
      arrivalClock += dt;
      for (const [npcId, arrival] of [...pendingArrivals]) {
        if (arrival.at <= arrivalClock) releaseArrival(npcId, period);
      }
    }
    // C-62 (Lucas): fire the held greetings only once the NPC has
    // walked through the doorway INTO the office - a hello into the
    // empty meeting room is wasted. The 25 s fallback covers anyone
    // whose route never crosses the threshold.
    for (const npcId of [...pendingGreetings]) {
      const object = npcObjects[npcId];
      if (object === undefined || !object.visible) continue;
      const since = greetWaitSince.get(npcId) ?? controllerElapsed;
      const inOffice = object.position.z < GREET_OFFICE_Z;
      const waitedLong = controllerElapsed - since > 25;
      if (inOffice || waitedLong) {
        pendingGreetings.delete(npcId);
        greetWaitSince.delete(npcId);
        bubbleSystem?.show(object.position, pickMorningGreeting(npcId, rng));
        markSpoke(npcId, controllerElapsed);
      }
    }
    // C-56: the already-in crowd greets once each, staggered across
    // the first 2-12 s of the morning. The list is randomized so two
    // mornings in a row do not greet in the same order. The bubble is
    // anchored to the NPC's at-desk position; if they happen to be
    // mid-conversation when their turn comes, the bubble still fires
    // (a 6-8 s bubble over a stationary chat is fine).
    if (controllerElapsed >= nextMorningGreetAt && morningGreetIndex < alreadyInGreetOrder.length) {
      const npcId = alreadyInGreetOrder[morningGreetIndex] as NpcId;
      const object = npcObjects[npcId];
      if (object && object.visible && object.userData.npcState !== "gone-home") {
        bubbleSystem?.show(object.position, pickMorningGreeting(npcId, rng));
        markSpoke(npcId, controllerElapsed);
        morningGreeted.add(npcId);
      }
      morningGreetIndex += 1;
      nextMorningGreetAt = controllerElapsed + 2 + rng() * 10;
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
    if (npcId === RENATA_COPY_NPC_ID && state.copyPhase === "outbound") {
      state.copyPhase = "copying";
      state.copyElapsed = 0;
      state.copySweepsPlayed = 0;
      state.dwellRemaining = COPY_RUN_DWELL_S.min + copyRandom() * (COPY_RUN_DWELL_S.max - COPY_RUN_DWELL_S.min);
      npcObjects[npcId].userData.npcState = "dwelling";
      return;
    }
    if (npcId === RENATA_COPY_NPC_ID && state.copyPhase === "returning") {
      // The working point is intentionally inside the reception desk's
      // broad AABB. The route has finished safely, then the final settle
      // restores the authored behind-counter pose instead of parking her
      // on the generic arrival-clearance ring.
      settle(npcId, target);
      state.copyPhase = "none";
      scheduleNextCopyRun();
    }
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
    const renataState = runtime.get(RENATA_COPY_NPC_ID);
    if (renataState?.copyPhase === "copying") {
      const previousSweep = Math.floor(renataState.copyElapsed / PRINTER_FLASH_SWEEP_INTERVAL_S);
      renataState.copyElapsed += safeDt;
      const intensity = printerFlashIntensity(renataState.copyElapsed);
      if (scannerFlash !== null) {
        const material = scannerFlash.material as THREE.MeshBasicMaterial;
        material.opacity = intensity;
        scannerFlash.visible = intensity > 0;
        const sweepProgress = (renataState.copyElapsed % PRINTER_FLASH_SWEEP_INTERVAL_S) / PRINTER_FLASH_SWEEP_INTERVAL_S;
        scannerFlash.position.z = -0.28 + sweepProgress * 0.56;
      }
      const currentSweep = Math.floor(renataState.copyElapsed / PRINTER_FLASH_SWEEP_INTERVAL_S);
      if (renataState.copySweepsPlayed < PRINTER_FLASH_SWEEP_COUNT && currentSweep >= previousSweep) {
        while (renataState.copySweepsPlayed <= currentSweep && renataState.copySweepsPlayed < PRINTER_FLASH_SWEEP_COUNT) {
          playSfx("sfx_photocopier");
          renataState.copySweepsPlayed += 1;
        }
      }
    } else if (scannerFlash !== null) scannerFlash.visible = false;
    if (bubbleSystem !== null && sceneRoot !== null) {
      // C-61 fix: projection uses the camera set via setBubblesCamera
      // (main.ts wires engine.camera). The old scene-graph sniffing
      // never found it - the engine camera is not added to the scene -
      // and the sprite renderer ignored the camera anyway; DOM
      // projection from the fallback rendered from a phantom camera.
      bubbleSystem.update(safeDt, fallbackCamera);
    }

    // C-51: period + day bookkeeping, then release anyone whose
    // arrival time has come. The old code teleported all 13 humans onto
    // the single door point on frame 0 and released them within 9.5 s -
    // 89% of the morning's jamming was created right there.
    const period = ensureCurrentPeriod();
    advanceArrivals(period, safeDt);
    advanceDepartures(safeDt);

    // Who is mid-conversation this frame: they hold still for the chat
    // instead of creeping onward.
    const chattingNow = new Set<NpcId>();
    for (const conversation of conversations.values()) {
      chattingNow.add(conversation.aId);
      chattingNow.add(conversation.bId);
    }
    // C-54: an NPC in a PLAYER dialogue holds still for the same
    // reason - and keeps the face-the-player yaw main.ts set.
    if (playerTalkingTo !== null) chattingNow.add(playerTalkingTo);

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
        if (state.dwellRemaining === 0 && npc.id === RENATA_COPY_NPC_ID && state.copyPhase === "copying") {
          const returnEntry = state.returnEntry;
          state.returnEntry = null;
          state.copyPhase = "returning";
          if (returnEntry === null || !startPath(npc.id, returnEntry, 0)) {
            state.copyPhase = "none";
            if (returnEntry !== null) settle(npc.id, returnEntry);
            scheduleNextCopyRun();
          }
        } else if (state.dwellRemaining === 0) continueKitchen(npc.id);
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

    if (
      controllerElapsed >= nextCopyRunAt && renataState !== undefined &&
      renataState.copyPhase === "none" && renataState.path === null &&
      npcObjects[RENATA_COPY_NPC_ID].userData.npcState === "at-desk" &&
      playerTalkingTo !== RENATA_COPY_NPC_ID
    ) startCopyRun();

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
          // C-54: the player's dialogue partner must not be shoved
          // mid-conversation - they are standing exactly where the
          // player expects them.
          if (a.id === playerTalkingTo || b.id === playerTalkingTo) continue;
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
      if (leftArm) {
        leftArm.rotation.x = cycle.armSwing;
        // C-63: the gait owns the arms while walking - zero the roll the
        // desk gestures use, so no pose can bleed into the walk cycle.
        leftArm.rotation.z = 0;
      }
      if (rightArm) {
        rightArm.rotation.x = -cycle.armSwing;
        rightArm.rotation.z = 0;
      }

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
      // C-63: Lucas asked for the typing animation "when npc is working
      // next to the desk (only then)" - this flag is that "only then".
      // Amendment (Lucas, 2026-09-02): "only played when npc is facing
      // the desk, on working position. Now it plays when npc's are
      // talking looking on each other, not on the computer." Chatter and
      // walk-to-face rotate a settled NPC without leaving the `at-desk`
      // state, so the state alone is not enough - the NPC must still be
      // pointed at the workstation the schedule settled them at.
      const atDesk = isWorkingAtDesk(
        object.userData.npcState,
        object.rotation.y,
        runtime.get(npc.id)?.target?.face,
      );
      idleStates.set(
        npc.id,
        updateIdle(idle, safeDt, object.position, object.rotation.y, object, idleElapsed, rng, { atDesk }),
      );
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
      markSpoke(conversation.bId, controllerElapsed);
      if (conversation.bId === "burek") lastBurekBubbleAt = controllerElapsed;
    }

    if (chatterEnabled && bubbleElapsed >= 1) {
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
            // C-54: an NPC talking to the PLAYER is not a chatter candidate.
            // C-62: neither is anyone who has ALREADY set off for the
            // exit - they would stop and chat at the door instead of
            // leaving (Lucas: "they stay there all evening and talk").
            // NPCs still waiting for their departure slot keep
            // chatting normally, so the evening is not silent.
            if (!object.visible || object.userData.npcState === "gone-home" || busy.has(npc.id) || npc.id === playerTalkingTo) return false;
            if (departing.has(npc.id)) return false;
            // C-56: refuse to start a conversation with an NPC whose
            // bubble is still on screen (greeting, in-flight response,
            // burek bark). Without this guard the same NPC could chain
            // a greeting into an immediate chatter line, the visual
            // overlap Lucas flagged: "the same person should not say
            // other dialogue" while a greeting is still visible.
            if (!canSpeak(npc.id, controllerElapsed)) return false;
            // C-57: never START a conversation with an NPC whose walk is
            // contested (blocked, escaping, or squeezing past someone).
            // Chatting freezes the walker, so pairing a jammed NPC
            // absorbs them into small talk exactly when the escape
            // ladder needs them moving - the C-48 "still gets around"
            // contract failed on exactly that. Settled desk pals chat
            // as before.
            const state = runtime.get(npc.id)!;
            const walkContested = state.path !== null &&
              (state.blockedBy !== null || state.blockedFor > 0 || state.escapeIndex >= 0);
            return !walkContested;
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
          markSpoke(starterId, controllerElapsed);
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

    if (chatterEnabled && controllerElapsed >= barkAt) {
      const burek = npcs.find((npc) => npc.id === "burek");
      const object = burek === undefined ? undefined : npcObjects.burek;
      // C-54: no ambient bark while the player has Burek's attention.
      if (playerTalkingTo === "burek") {
        barkAt = Math.max(barkAt, controllerElapsed + 2);
      } else if (object !== undefined && object.visible && object.userData.npcState !== "gone-home" && controllerElapsed - lastBurekBubbleAt >= 60) {
        bubbleSystem?.show(object.position, pickLine(BUREK_LINES, rng));
        markSpoke("burek", controllerElapsed);
        lastBurekBubbleAt = controllerElapsed;
        barkAt = controllerElapsed + nextBarkDelay(rng);
      } else barkAt = Math.max(barkAt + 1, lastBurekBubbleAt + 60);
    }
  };

  return {
    update,
    destroy: () => {
      destroyed = true;
      bubbleSystem?.destroy();
      scannerFlash?.removeFromParent();
      scannerFlash?.geometry.dispose();
      (scannerFlash?.material as THREE.Material | undefined)?.dispose();
    },
    getNpcIds: () => npcs.map((npc) => npc.id),
    /** C-51: false while an NPC has not walked in yet this morning. */
    hasArrived: (npcId) => !pendingArrivals.has(npcId),
    setTalkingToPlayer: (npcId) => {
      playerTalkingTo = npcId;
    },
    setBubblesVisible: (visible) => bubbleSystem?.setVisible(visible),
    clearBubbles: () => bubbleSystem?.clear(),
    showBubble: (position, line) => bubbleSystem?.show(position, line),
    setBubblesCamera: (camera) => bubbleSystem?.setCamera(camera),
    getActiveConversations: () => [...conversations.values()].map((conversation) => ({
      a: conversation.aId,
      b: conversation.bId,
      responseIn: Math.max(0, RESPONSE_DELAY_S - (controllerElapsed - conversation.starterAt)),
      starterLine: conversation.starterLine,
    })),
    setOverride: (npcId, entry) => {
      const period = ensureCurrentPeriod();
      const state = runtime.get(npcId);
      if (state === undefined) return;
      // C-51: this NPC is not in the building yet, so it has no
      // position to override from. Walk them in NOW rather than
      // teleporting them into the middle of the office - the override
      // becomes the destination they head for once through the door.
      // (The events layer skips unarrived NPCs via `hasArrived`, so in
      // the real game this only fires for deliberate placement.)
      releaseArrival(npcId, period);
      state.path = null; state.kitchenStops = null; state.dwellRemaining = 0; state.returnEntry = null;
      if (entry === null) {
        overrides.delete(npcId); validatedDestinations.delete(npcId);
        planForEntry(npcId, scheduleFor(npcId, period));
        return;
      }
      if (entry.state === "kitchen") {
        overrides.set(npcId, entry);
        startKitchen(npcId, scheduleFor(npcId, period), period === "lunch");
        return;
      }
      const validated = validateOverride(npcId, entry);
      if (validated === null) { settle(npcId, scheduleFor(npcId, period)); return; }
      overrides.set(npcId, validated);
      startPath(npcId, validated, rng() * 0.3);
    },
  };
}

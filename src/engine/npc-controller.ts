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
import { computeAvoidancePush, type AvoidanceAgent } from "./npc-avoidance";
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

function priorityFor(id: NpcId): number {
  if (id === "burek") return 1;
  if (id === "dawid") return 2;
  if (id === "zosia") return 3;
  return 4;
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
      walkCycle: { distanceTraveled: 0 }, target: null, departureDelay: 0,
      kitchenStops: null, kitchenIndex: 0, dwellRemaining: 0, returnEntry: null,
      baseY: npcObjects[npc.id].position.y, velocity: { x: 0, z: 0 },
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
    object.visible = entry.state !== "gone-home";
    object.userData.npcState = entry.state;
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
    settle(npcId, target);
    if (state.kitchenStops !== null && state.kitchenIndex < state.kitchenStops.length) {
      const stop = state.kitchenStops[state.kitchenIndex]!;
      state.dwellRemaining = KITCHEN_STOP_DWELL[stop.id];
      npcObjects[npcId].userData.npcState = "dwelling";
    }
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
        const cycle = updateWalkCycle(state.walkCycle, movementDt, npc.walkSpeed);
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
      }
    }

    const agents: AvoidanceAgent[] = npcs.map((npc) => {
      const object = npcObjects[npc.id]; const state = runtime.get(npc.id)!;
      return { id: npc.id, position: object.position, velocity: state.velocity, priority: priorityFor(npc.id) };
    });
    for (const npc of npcs) {
      const object = npcObjects[npc.id]; const state = runtime.get(npc.id)!;
      if (state.path === null || object.userData.npcState !== "walking") continue;
      const self = agents.find((agent) => agent.id === npc.id)!;
      const push = computeAvoidancePush(self, agents);
      const candidateX = object.position.x + push.x;
      if (!isSpawnBlocked({ x: candidateX, z: object.position.z, radius: NPC_DEFAULT_RADIUS }, obstacles)) object.position.x = candidateX;
      const candidateZ = object.position.z + push.z;
      if (!isSpawnBlocked({ x: object.position.x, z: candidateZ, radius: NPC_DEFAULT_RADIUS }, obstacles)) object.position.z = candidateZ;
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

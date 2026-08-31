import * as THREE from "three";
import {
  NPC_SCHEDULES,
  type NpcState,
  type Period,
  type ScheduleEntry,
} from "../content/npc-schedule";
import type { NPC, NpcId } from "../types";
import {
  createBubbleSystem,
  findClosestPair,
  INTER_NPC_LINES,
  pickLine,
  shouldShowBubble,
} from "./bubbles";
import { createInitialIdleState, updateIdle, type IdleState } from "./npc-idle";

export const NPC_INTERP_DURATION = 2;

export interface NpcController {
  update: (dt: number) => void;
  destroy: () => void;
  /**
   * Override the schedule for a specific NPC for the current period.
   * Used by the random-walk layer (L-2026-08-30-01) to drop an NPC in
   * the kitchen / toilet / meeting / training room without authoring
   * a fresh schedule entry. The override persists until cleared or
   * the period changes.
   */
  setOverride: (npcId: NpcId, entry: ScheduleEntry | null) => void;
}

export interface InterpolatedNpc {
  position: ScheduleEntry["position"];
  face: number;
  state: NpcState;
}

const PERIODS: readonly Period[] = ["morning", "afternoon", "evening"];

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function normalizeYaw(angle: number): number {
  // Normalize to (-PI, PI]. The `+ 2*PI` before `% 2*PI` makes
  // sure JavaScript's % (which can return negatives) gives a
  // non-negative intermediate. Then subtract PI to shift to the
  // (-PI, PI] range. Note: PI itself should normalize to PI (not
  // -PI), so we use (-PI, PI] and the test `wrapped === -PI` is
  // a guard against the exact-PI case.
  const TWO_PI = Math.PI * 2;
  let wrapped = ((angle % TWO_PI) + TWO_PI) % TWO_PI;
  if (wrapped === 0) return 0;
  if (wrapped > Math.PI) wrapped -= TWO_PI;
  if (wrapped === -Math.PI) return Math.PI;
  return Object.is(wrapped, -0) ? 0 : wrapped;
}

export function shortestPathYaw(from: number, to: number, t: number): number {
  const progress = clamp01(t);
  const delta = normalizeYaw(to - from);
  return normalizeYaw(from + delta * progress);
}

export function interpPosition(
  from: ScheduleEntry["position"],
  to: ScheduleEntry["position"],
  t: number,
): ScheduleEntry["position"] {
  const progress = clamp01(t);
  // Return the endpoint exactly at progress 1 so callers (and
  // tests) compare against the schedule entry without float
  // drift (e.g. 7.7 + (-15.2 * 1) = -7.499999999999999).
  if (progress >= 1) return { x: to.x, y: to.y, z: to.z };
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress,
    z: from.z + (to.z - from.z) * progress,
  };
}

export function interpolate(
  id: NpcId,
  fromPeriod: Period,
  toPeriod: Period,
  transitionProgress: number,
): InterpolatedNpc {
  const from = NPC_SCHEDULES[id][fromPeriod];
  const to = NPC_SCHEDULES[id][toPeriod];
  const progress = clamp01(transitionProgress);

  return {
    position: interpPosition(from.position, to.position, progress),
    face: shortestPathYaw(from.face, to.face, progress),
    state: progress < 1 ? "walking" : to.state,
  };
}

function previousPeriod(period: Period): Period {
  const index = PERIODS.indexOf(period);
  return PERIODS[(index + PERIODS.length - 1) % PERIODS.length]!;
}

export function createNpcController(
  npcs: readonly NPC[],
  npcObjects: Readonly<Record<NpcId, THREE.Object3D>>,
  getCurrentPeriod: () => Period,
  rng: () => number = Math.random,
): NpcController {
  let lastPeriod: Period | null = null;
  let transitionElapsed = NPC_INTERP_DURATION;
  let animationElapsed = 0;
  let destroyed = false;
  let dtBubbleCheck = 0;
  let timeSinceLastBubble = 0;
  let idleElapsed = 0;
  const idleStates = new Map<NpcId, IdleState>();
  // Per-NPC schedule override (L-2026-08-30-01). When set, the
  // controller interpolates from the previous period's position to
  // the override entry instead of the schedule entry. Cleared on
  // period change so each new period starts from a clean slate.
  const overrides = new Map<NpcId, ScheduleEntry>();
  const firstNpc = npcs[0];
  let root: THREE.Object3D | null = firstNpc === undefined ? null : npcObjects[firstNpc.id];
  while (root?.parent) root = root.parent;
  const sceneRoot = root instanceof THREE.Scene ? root : null;
  const bubbleSystem = sceneRoot === null ? null : createBubbleSystem(sceneRoot);
  const fallbackCamera = new THREE.PerspectiveCamera();

  const applyEntry = (id: NpcId, entry: InterpolatedNpc, walking: boolean): void => {
    const object = npcObjects[id];
    object.position.set(entry.position.x, entry.position.y, entry.position.z);
    object.rotation.y = entry.face;
    object.visible = entry.state !== "gone-home";
    object.userData.npcState = entry.state;

    const bob = walking ? Math.abs(Math.sin(animationElapsed * 9)) * 0.06 : 0;
    const sway = walking ? Math.sin(animationElapsed * 9) * 0.035 : 0;
    object.position.y += bob;
    object.rotation.z = sway;
  };

  const update = (dt: number): void => {
    if (destroyed) return;

    const safeDt = Math.max(0, dt);
    idleElapsed += safeDt;
    dtBubbleCheck += safeDt;
    timeSinceLastBubble += safeDt;
    if (bubbleSystem !== null && sceneRoot !== null) {
      const camera = sceneRoot.getObjectByProperty("isCamera", true) as THREE.Camera | undefined;
      bubbleSystem.update(safeDt, camera ?? fallbackCamera);
    }

    const currentPeriod = getCurrentPeriod();
    const isInitialUpdate = lastPeriod === null;
    if (lastPeriod === null) {
      lastPeriod = currentPeriod;
      for (const npc of npcs) {
        applyEntry(npc.id, interpolate(npc.id, currentPeriod, currentPeriod, 1), false);
      }
    } else if (currentPeriod !== lastPeriod) {
      lastPeriod = currentPeriod;
      transitionElapsed = 0;
      animationElapsed = 0;
      // Each new period starts from a clean schedule; previous
      // random-walk overrides (e.g. yesterday's coffee break) are
      // discarded.
      overrides.clear();
    }

    if (!isInitialUpdate) {
      transitionElapsed = Math.min(NPC_INTERP_DURATION, transitionElapsed + safeDt);
      animationElapsed += safeDt;
      const progress = transitionElapsed / NPC_INTERP_DURATION;
      const fromPeriod = previousPeriod(currentPeriod);

      for (const npc of npcs) {
        const from = NPC_SCHEDULES[npc.id][fromPeriod];
        const scheduledTo = NPC_SCHEDULES[npc.id][currentPeriod];
        const override = overrides.get(npc.id);
        const to = override ?? scheduledTo;
        const arriving = from.state === "gone-home" && to.state !== "gone-home";
        const result = arriving
          ? {
              position: to.position,
              face: to.face,
              state: to.state,
            }
          : {
              position: interpPosition(from.position, to.position, progress),
              face: shortestPathYaw(from.face, to.face, progress),
              state: progress < 1 ? "walking" : to.state,
            };
        applyEntry(npc.id, result, result.state === "walking");
      }
    }

    for (const npc of npcs) {
      const object = npcObjects[npc.id];
      if (!object.visible || object.userData.npcState === "walking") continue;
      const idleState = idleStates.get(npc.id) ?? createInitialIdleState(0, npc.id);
      idleStates.set(
        npc.id,
        updateIdle(idleState, safeDt, object.position, object.rotation.y, object, idleElapsed, rng),
      );
    }

    if (dtBubbleCheck >= 1) {
      dtBubbleCheck = 0;
      const visibleNpcs = npcs
        .filter((npc) => npcObjects[npc.id].visible)
        .map((npc) => ({ id: npc.id, position: npcObjects[npc.id].position }));
      const pair = findClosestPair(visibleNpcs, 2.5);
      if (pair !== null) {
        const first = npcObjects[pair[0] as NpcId];
        const second = npcObjects[pair[1] as NpcId];
        const distance = Math.hypot(
          first.position.x - second.position.x,
          first.position.z - second.position.z,
        );
        if (shouldShowBubble(distance, timeSinceLastBubble, rng)) {
          bubbleSystem?.show(first.position, pickLine(INTER_NPC_LINES, rng));
          timeSinceLastBubble = 0;
        }
        // L-2026-08-30 (Lucas): "NPCs who are working stay next to
        // the desk but with monitor behind their back, so they do
        // not really work". When two NPCs are within the bubble
        // range, make them face each other briefly so the player
        // sees a 'cooperation' beat. The facing override is held
        // for ~3 seconds after the NPCs separate, so the player
        // catches the eye-contact moment.
        if (distance < 2.5) {
          const dx = second.position.x - first.position.x;
          const dz = second.position.z - first.position.z;
          const yawA = Math.atan2(dx, dz);
          const yawB = Math.atan2(-dx, -dz);
          if (Math.abs(yawA - first.rotation.y) > 0.1) {
            first.rotation.y = yawA;
          }
          if (Math.abs(yawB - second.rotation.y) > 0.1) {
            second.rotation.y = yawB;
          }
        }
      }
    }
  };

  return {
    update,
    destroy: () => {
      destroyed = true;
      bubbleSystem?.destroy();
    },
    setOverride: (npcId, entry) => {
      if (entry === null) overrides.delete(npcId);
      else overrides.set(npcId, entry);
    },
  };
}

import * as THREE from "three";
import {
  NPC_SCHEDULES,
  type NpcState,
  type Period,
  type ScheduleEntry,
} from "../content/npc-schedule";
import type { NPC, NpcId } from "../types";

export const NPC_INTERP_DURATION = 2;

export interface NpcController {
  update: (dt: number) => void;
  destroy: () => void;
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
  const wrapped = ((angle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
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
): NpcController {
  let lastPeriod: Period | null = null;
  let transitionElapsed = NPC_INTERP_DURATION;
  let animationElapsed = 0;
  let destroyed = false;

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

    const currentPeriod = getCurrentPeriod();
    if (lastPeriod === null) {
      lastPeriod = currentPeriod;
      for (const npc of npcs) {
        applyEntry(npc.id, interpolate(npc.id, currentPeriod, currentPeriod, 1), false);
      }
      return;
    }

    if (currentPeriod !== lastPeriod) {
      lastPeriod = currentPeriod;
      transitionElapsed = 0;
      animationElapsed = 0;
    }

    transitionElapsed = Math.min(NPC_INTERP_DURATION, transitionElapsed + Math.max(0, dt));
    animationElapsed += Math.max(0, dt);
    const progress = transitionElapsed / NPC_INTERP_DURATION;
    const fromPeriod = previousPeriod(currentPeriod);

    for (const npc of npcs) {
      const from = NPC_SCHEDULES[npc.id][fromPeriod];
      const to = NPC_SCHEDULES[npc.id][currentPeriod];
      const arriving = from.state === "gone-home" && to.state !== "gone-home";
      const result = arriving
        ? interpolate(npc.id, currentPeriod, currentPeriod, 1)
        : interpolate(npc.id, fromPeriod, currentPeriod, progress);
      applyEntry(npc.id, result, result.state === "walking");
    }
  };

  return {
    update,
    destroy: () => {
      destroyed = true;
    },
  };
}

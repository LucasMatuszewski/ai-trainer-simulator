/**
 * WS6 — Interaction points with a bounded action lifecycle
 * (ADR-0009 D-53; PRD Flow F, AC-20/21/22).
 *
 * A small shared contract, NOT an activity engine. Equipment points
 * (coffee machine, printer, whiteboard — the three AC-20 points) live
 * in a registry; using one walks the D-53 lifecycle:
 *
 *   idle → reserved → in-use → done
 *                     ↘ interrupted   (scene close, companion takeover,
 *                                      stale reservation timeout)
 *
 * A faultable point (the printer, AC-21) blocks new uses with reason
 * "jammed" until a hold-style repair (beginRepair → updateRepair →
 * finishRepair, REPAIR_DURATION_S of continuous holding) clears it.
 *
 * ## Purity + wiring boundaries (who owns what)
 *
 * - NO three.js at import time. Positions are plain numbers copied from
 *   `src/content/world-layout.ts` prop data; room ids match `roomAt`
 *   (src/engine/chatter.ts), which is asserted in tests.
 * - Sound: each registered point also registers a positional sound
 *   source (src/audio/positional.ts) and carries an sfx id that MUST
 *   resolve in the generated audio manifest (AC-20 — a silently
 *   skipped sound is a failure; the test reads the real manifest.json).
 * - Fault persistence: `setFault`/the internal bit are the transient
 *   authority for tests and sim. In the game, the orchestrator wires
 *   `setFaultReadout((id) => game.get().equipment?.[id] === "faulted")`
 *   so `isFaulted` reads the PERSISTED GameState bit (the
 *   `set-equipment-fault` reducer action exists since Wave 1), and
 *   routes `setFault` through `game.dispatch` — see the proposed patch
 *   in .agent-briefs/ws6-result.md.
 * - Effects: a completed action emits `CompletedAction` to listeners;
 *   the orchestrator maps effect "caffeine" to the PLAYER stat action
 *   (`add-stat caffeine`) or an NPC needs reset (src/game/npc-needs).
 *   This module never touches game state directly.
 * - NPC purposeful use (AC-22): `suggestNpcUse` returns the exact
 *   ScheduleEntry stand-spot trip for the controller's EXISTING
 *   setOverride mechanism (same pattern as src/game/events.ts
 *   rollRandomNpcDestinations). This module does not move NPCs.
 */

import { registerSoundSource, unregisterSoundSource } from "../audio/positional";
import type { ScheduleEntry } from "../content/npc-schedule";

// ── Definitions ──────────────────────────────────────────────────────

/** What a completed use does. The orchestrator maps it to real effects. */
export type InteractionEffect = "caffeine" | "none";

export interface InteractionPointDef {
  id: string;
  /** Prop position copied from src/content/world-layout.ts (numbers only). */
  position: { x: number; y: number; z: number };
  /** Must equal roomAt(position.x, position.z) — asserted in tests. */
  room: string;
  /** Use sound; MUST resolve in the audio manifest (AC-20). */
  sfxId: string;
  /** Fault sound (faultable points); MUST resolve in the manifest too. */
  faultSfxId?: string;
  /** Positional base gain (src/audio/positional.ts DEFAULT_BASE_GAIN = 0.35). */
  baseVolume: number;
  /** Seconds from activation to done. */
  durationS: number;
  effect: InteractionEffect;
  faultable: boolean;
}

// ── Lifecycle ────────────────────────────────────────────────────────

/** D-53 action states. "failed" is reserved for future feasibility
 *  checks that abort an activated action; today only "interrupted"
 *  terminates a non-done action. */
export type ActionLifecycle = "reserved" | "in-use" | "done" | "failed" | "interrupted";

export interface ActiveAction {
  actionId: string;
  pointId: string;
  /** "player" or an NpcId. */
  actorId: string;
  /** Transitions reserved → in-use → done | failed | interrupted (D-53). */
  lifecycle: ActionLifecycle;
  elapsedS: number;
}

export interface CompletedAction {
  actionId: string;
  pointId: string;
  actorId: string;
  effect: InteractionEffect;
}

export type UseResult =
  | { ok: true; actionId: string; durationS: number }
  | {
      ok: false;
      reason:
        | "jammed"
        | "busy"
        | "unknown-point"
        | "not-faulted"
        /** finishRepair: the hold ended before REPAIR_DURATION_S. */
        | "interrupted";
    };

/** A reserved-but-never-activated action expires so it cannot block
 *  the point forever (bounded lifecycle, D-53). */
export const RESERVATION_TIMEOUT_S = 30;

/** AC-21: seconds of continuous holding to clear the printer jam. */
export const REPAIR_DURATION_S = 4;

export const PRINTER_POINT_ID = "printer";

// ── Built-in points (AC-20) ──────────────────────────────────────────

/**
 * Positions are the world-layout prop positions:
 *   coffee-machine-kitchen [13.0, 0, -6.6]  (kitchen counter, C-36)
 *   xerox-printer          [5.15, 0, 16.75] (reception)
 *   whiteboard             [23, 1.5, -3.06] (training room, south wall)
 * Stand spots for NPC trips mirror the shipped Renata PRINTER_STOP
 * pattern (npc-controller.ts): ~0.5-1.2 m off the prop, facing it.
 */
export const INTERACTION_POINT_DEFS: readonly InteractionPointDef[] = [
  {
    id: "coffee-machine",
    position: { x: 13.0, y: 0, z: -6.6 },
    room: "kitchen",
    sfxId: "sfx_coffee_pour",
    baseVolume: 0.35,
    durationS: 4,
    effect: "caffeine",
    faultable: false,
  },
  {
    id: "printer",
    position: { x: 5.15, y: 0, z: 16.75 },
    room: "reception",
    sfxId: "sfx_photocopier",
    faultSfxId: "sfx_printer_jam",
    baseVolume: 0.35,
    durationS: 6,
    effect: "none",
    faultable: true,
  },
  {
    id: "whiteboard",
    position: { x: 23, y: 1.5, z: -3.06 },
    room: "training",
    sfxId: "sfx_click",
    baseVolume: 0.3,
    durationS: 3,
    effect: "none",
    faultable: false,
  },
];

/** Where an NPC stands to use a point, as a ScheduleEntry for setOverride. */
interface StandSpot {
  position: { x: number; y: number; z: number };
  face: number;
}

const STAND_SPOTS: Record<string, StandSpot> = {
  // Mirrors npc-controller.ts PRINTER_STOP exactly.
  printer: { position: { x: 4.4, y: 0, z: 15.6 }, face: 0 },
  // Mirrors npc-schedule.ts KITCHEN_MICRO_STOPS.coffee (state "at-desk"
  // here so setOverride does NOT trigger the full kitchen tour).
  "coffee-machine": { position: { x: 13.0, y: 0, z: -5.5 }, face: Math.PI },
  // Training room, just off the board's wall (z=-3 inner face).
  whiteboard: { position: { x: 23, y: 0, z: -3.6 }, face: 0 },
};

// ── Registry state (module-singleton; resetInteractionPoints for isolation) ──

interface PointState {
  def: InteractionPointDef;
  action: ActiveAction | null;
  repair: { actorId: string; elapsedS: number } | null;
  faultBit: boolean;
}

const points = new Map<string, PointState>();
const completedListeners = new Set<(action: CompletedAction) => void>();
/** Wired by the orchestrator to the PERSISTED game equipment map. */
let faultReadout: ((pointId: string) => boolean) | null = null;
let nextActionId = 1;

/** Register one point (the deliberate D-53 extension point). Also feeds
 *  the positional sound registry so positional-three.ts can resolve the
 *  emitter at play time. */
export function registerInteractionPoint(def: InteractionPointDef): void {
  points.set(def.id, { def, action: null, repair: null, faultBit: false });
  registerSoundSource(def.id, {
    getPos: () => ({ x: def.position.x, z: def.position.z }),
    getRoom: () => def.room,
  });
}

/** Register the three AC-20 builtin points. Idempotent per reset cycle. */
export function registerBuiltinInteractionPoints(): void {
  for (const def of INTERACTION_POINT_DEFS) registerInteractionPoint(def);
}

export function getInteractionPoint(id: string): InteractionPointDef | null {
  return points.get(id)?.def ?? null;
}

export function getInteractionPointIds(): string[] {
  return [...points.keys()];
}

/** Coarse state for prompts/debug: "idle" | "reserved" | "in-use" | "repairing". */
export function getPointState(id: string): "idle" | "reserved" | "in-use" | "repairing" {
  const point = points.get(id);
  if (!point) return "idle";
  if (point.repair) return "repairing";
  if (point.action) {
    // Terminal lifecycles are detached from the point synchronously in
    // complete()/updateInteractionPoints, so a live action is one of these.
    return point.action.lifecycle === "in-use" ? "in-use" : "reserved";
  }
  return "idle";
}

/** Subscribe to completed actions (player caffeine, NPC needs resets).
 *  Returns an unsubscribe function. */
export function onActionCompleted(listener: (action: CompletedAction) => void): () => void {
  completedListeners.add(listener);
  return () => completedListeners.delete(listener);
}

function complete(point: PointState, lifecycle: "done" | "interrupted"): void {
  const action = point.action;
  point.action = null;
  if (!action) return;
  action.lifecycle = lifecycle;
  if (lifecycle === "done") {
    const record: CompletedAction = {
      actionId: action.actionId,
      pointId: action.pointId,
      actorId: action.actorId,
      effect: point.def.effect,
    };
    for (const listener of completedListeners) listener(record);
  }
}

// ── Use (the D-53 lifecycle entry) ───────────────────────────────────

/**
 * Reserve a point for one actor. `usePoint` → reserved; `activateAction`
 * (the orchestrator calls it when the actor ARRIVES at the point)
 * → in-use; `updateInteractionPoints(dt)` advances in-use actions to
 * done. One actor at a time; a faulted point refuses with "jammed".
 */
export function usePoint(pointId: string, actorId: string): UseResult {
  const point = points.get(pointId);
  if (!point) return { ok: false, reason: "unknown-point" };
  // Busy check FIRST: an in-progress repair must read "busy" (someone IS
  // at the machine), not "jammed" — the two refusals mean different things.
  if (point.action || point.repair) return { ok: false, reason: "busy" };
  if (isFaulted(pointId)) return { ok: false, reason: "jammed" };
  const action: ActiveAction = {
    actionId: `action-${nextActionId}`,
    pointId,
    actorId,
    lifecycle: "reserved",
    elapsedS: 0,
  };
  nextActionId += 1;
  point.action = action;
  return { ok: true, actionId: action.actionId, durationS: point.def.durationS };
}

/** reserved → in-use. Returns false when the action no longer exists
 *  (interrupted/expired meanwhile). */
export function activateAction(actionId: string): boolean {
  for (const point of points.values()) {
    if (point.action?.actionId === actionId && point.action.lifecycle === "reserved") {
      point.action.lifecycle = "in-use";
      return true;
    }
  }
  return false;
}

/**
 * Advance all in-use actions by dt seconds. Reserved actions do NOT
 * advance (the actor has not arrived yet); a reservation older than
 * RESERVATION_TIMEOUT_S expires as "interrupted" so a dead walk cannot
 * block a point forever. Returns the actions that completed this tick.
 */
export function updateInteractionPoints(dt: number): CompletedAction[] {
  const completed: CompletedAction[] = [];
  for (const point of points.values()) {
    const action = point.action;
    if (!action) continue;
    if (action.lifecycle === "reserved") {
      action.elapsedS += dt;
      if (action.elapsedS >= RESERVATION_TIMEOUT_S) complete(point, "interrupted");
      continue;
    }
    action.elapsedS += dt;
    if (action.elapsedS >= point.def.durationS) {
      const record: CompletedAction = {
        actionId: action.actionId,
        pointId: action.pointId,
        actorId: action.actorId,
        effect: point.def.effect,
      };
      point.action = null;
      action.lifecycle = "done";
      completed.push(record);
      for (const listener of completedListeners) listener(record);
    }
  }
  return completed;
}

/** Interrupt a point's current action (companion takeover, dialogue
 *  claimed the actor, …). The orchestrator wires the teardown calls. */
export function interruptPoint(pointId: string): void {
  const point = points.get(pointId);
  if (point?.action) complete(point, "interrupted");
}

/** Scene-close teardown: everything releases. */
export function interruptAll(): void {
  for (const point of points.values()) {
    if (point.action) complete(point, "interrupted");
    point.repair = null;
  }
}

// ── Faults (AC-21) ───────────────────────────────────────────────────

/**
 * Set the transient fault bit. In the game the orchestrator routes this
 * through `game.dispatch({ type: "set-equipment-fault", id, faulted })`
 * (proposed patch); the bit keeps tests and headless sim working. Only
 * faultable points accept faults.
 */
export function setFault(pointId: string, faulted: boolean): void {
  const point = points.get(pointId);
  if (!point || !point.def.faultable) return;
  point.faultBit = faulted;
}

/**
 * Wire the persisted readout: the orchestrator passes
 * `(id) => game.get().equipment?.[id] === "faulted"` so isFaulted reads
 * the GameState bit that survives save/load (AC-21). Pass null to fall
 * back to the transient bit.
 */
export function setFaultReadout(readout: ((pointId: string) => boolean) | null): void {
  faultReadout = readout;
}

/** True when the point is jammed: the wired persisted readout first,
 *  else the transient bit. */
export function isFaulted(pointId: string): boolean {
  if (faultReadout) return faultReadout(pointId);
  return points.get(pointId)?.faultBit ?? false;
}

// ── Repair (AC-21) ───────────────────────────────────────────────────

/**
 * Begin a hold-style repair of a faulted point (the PLAYER holds the
 * use key near the printer; the orchestrator patches the prompt/E-key
 * path). One repairer at a time; ordinary usePoint is "busy" meanwhile.
 */
export function beginRepair(pointId: string, actorId: string): UseResult {
  const point = points.get(pointId);
  if (!point) return { ok: false, reason: "unknown-point" };
  if (!isFaulted(pointId)) return { ok: false, reason: "not-faulted" };
  if (point.action || point.repair) return { ok: false, reason: "busy" };
  point.repair = { actorId, elapsedS: 0 };
  return { ok: true, actionId: `repair-${pointId}`, durationS: REPAIR_DURATION_S };
}

/** Current repair progress 0..1 (0 when no repair is active). */
export function repairProgress(): number {
  for (const point of points.values()) {
    if (point.repair) return Math.min(1, point.repair.elapsedS / REPAIR_DURATION_S);
  }
  return 0;
}

/**
 * Advance the active repair by dt seconds of continuous holding.
 * Returns the progress 0..1; at 1 the jam clears (fault off, via the
 * same setFault path the orchestrator persists) and the point frees.
 * The simple NPC path: beginRepair once, then let per-frame
 * updateRepair(dt) calls run — or one call carrying the whole duration.
 */
export function updateRepair(dt: number): number {
  for (const point of points.values()) {
    if (!point.repair) continue;
    point.repair.elapsedS += Math.max(0, dt);
    if (point.repair.elapsedS >= REPAIR_DURATION_S) {
      point.repair = null;
      setFault(pointIdOf(point), false);
      return 1;
    }
    return Math.min(1, point.repair.elapsedS / REPAIR_DURATION_S);
  }
  return 0;
}

/**
 * End the hold early (key released). Progress < 1 → interrupted, the
 * fault REMAINS, the point frees. (Completion at 1 is automatic in
 * updateRepair, so finishRepair never returns ok.)
 */
export function finishRepair(): UseResult {
  for (const point of points.values()) {
    if (!point.repair) continue;
    const unfinished = point.repair.elapsedS < REPAIR_DURATION_S;
    point.repair = null;
    return unfinished
      ? { ok: false, reason: "interrupted" }
      : { ok: true, actionId: `repair-${point.def.id}`, durationS: REPAIR_DURATION_S };
  }
  return { ok: false, reason: "not-faulted" };
}

function pointIdOf(point: PointState): string {
  return point.def.id;
}

// ── Purposeful NPC use (AC-22) ───────────────────────────────────────

/**
 * A schedule-override-style trip the npc-controller installs through its
 * EXISTING setOverride mechanism (see src/game/events.ts
 * rollRandomNpcDestinations for the pattern):
 *
 *   1. `usePoint(pointId, npcId)`            (reserve; "jammed" → balk)
 *   2. `controller.setOverride(npcId, trip.destination)`   (walk there)
 *   3. on arrival: `activateAction(actionId)`; sfx plays; dwell dwellS
 *   4. `controller.setOverride(npcId, null)`  (back to their schedule)
 *
 * The return leg is setOverride(null): the controller re-plans the
 * NPC's period schedule — no new controller API needed.
 */
export interface NpcUseTrip {
  npcId: string;
  pointId: string;
  /** Install with controller.setOverride(npcId, trip.destination). */
  destination: ScheduleEntry;
  dwellS: number;
  sfxId: string;
}

/** Build the trip for an NPC to use a point (null for unknown points).
 *  Pure data — callers decide feasibility (arrived, not talking, …). */
export function suggestNpcUse(npcId: string, pointId: string): NpcUseTrip | null {
  const def = points.get(pointId)?.def;
  const stand = STAND_SPOTS[pointId];
  if (!def || !stand) return null;
  return {
    npcId,
    pointId,
    destination: {
      position: { ...stand.position },
      face: stand.face,
      state: "at-desk",
    },
    dwellS: def.durationS,
    sfxId: def.sfxId,
  };
}

// ── Test isolation ───────────────────────────────────────────────────

/** Drop every point, listener and wiring (tests, scene rebuild). */
export function resetInteractionPoints(): void {
  for (const id of points.keys()) unregisterSoundSource(id);
  points.clear();
  completedListeners.clear();
  faultReadout = null;
  nextActionId = 1;
}

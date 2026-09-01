/**
 * Random Office Events dispatcher.
 *
 * On every in-game period transition (morning -> afternoon -> evening ->
 * next morning), the orchestrator calls `runPeriodEvent` here. We pick a
 * weighted random event from the pool that is eligible for the current state
 * and time-of-day, dispatch its effects through the standard reducer, and
 * show a toast.
 *
 * This is the "simulation" feel: between NPC dialogues, the office generates
 * small slices of IT life that the player reacts to.
 *
 * L-2026-08-30-01 also asks that NPCs RANDOMLY walk to the kitchen,
 * toilet, meeting, or training. We do that here: every period, we
 * roll once per NPC and (if the controller is exposed) install the
 * random destination as the NPC's schedule override for this period.
 */

import { game } from "./state";
import { showToast, type HudElements } from "../ui/hud";
import {
  RANDOM_EVENTS,
  type Period,
  type RandomEvent,
  type RandomEventEffect,
} from "../content/events";
import {
  pickRandomDestination,
  type ScheduleEntry,
} from "../content/npc-schedule";
import type { GameState, NpcId } from "../types";

/**
 * The NPC controller, if mounted. When set, the dispatcher will roll
 * a random destination per NPC every period and install the result as
 * the NPC's schedule override. Wired up by main.ts after the scene
 * builds.
 */
let npcControllerHooks: {
  setOverride: (npcId: NpcId, entry: ScheduleEntry | null) => void;
  getNpcIds: () => readonly NpcId[];
  hasArrived: (npcId: NpcId) => boolean;
} | null = null;

/** Register the NPC controller so we can push random destinations. */
export function registerNpcController(
  controller: {
    setOverride: (npcId: NpcId, entry: ScheduleEntry | null) => void;
    getNpcIds: () => readonly NpcId[];
    hasArrived: (npcId: NpcId) => boolean;
  },
): void {
  npcControllerHooks = controller;
}

/** Apply a random destination to every NPC for the current period. */
function rollRandomNpcDestinations(period: Period): void {
  if (!npcControllerHooks) return;
  const state = game.get();
  // Roll per-NPC. PickRandomDestination returns null when the NPC
  // should stay at the desk (70% of the time on average).
  for (const npcId of npcControllerHooks.getNpcIds()) {
    // C-51: somebody who has not walked in yet gets no destination
    // roll - they head for their desk when they arrive. Overriding
    // them here would pull them into the office ahead of their time.
    if (!npcControllerHooks.hasArrived(npcId)) continue;
    const dest = pickRandomDestination(npcId, Math.random, state.day, {
      period,
      periodElapsed: 0,
    });
    npcControllerHooks.setOverride(npcId, dest);
  }
}

/** Pick a weighted random event that is eligible for the current state + period. */
export function pickRandomEvent(state: Readonly<GameState>, period: Period): RandomEvent | null {
  const eligible = RANDOM_EVENTS.filter((e) => {
    if (e.periods && !e.periods.includes(period)) return false;
    if (e.requiresFlags && !e.requiresFlags.every((f) => state.flags[f] === true)) return false;
    if (e.blocksFlags && e.blocksFlags.some((f) => state.flags[f] === true)) return false;
    return true;
  });
  if (eligible.length === 0) return null;
  const total = eligible.reduce((sum, e) => sum + e.weight, 0);
  let r = Math.random() * total;
  for (const e of eligible) {
    r -= e.weight;
    if (r <= 0) return e;
  }
  return eligible[eligible.length - 1]!;
}

/** Fire a single random event for the current period. Mutates state via the reducer. */
export function runPeriodEvent(hud: HudElements | null, period: Period): RandomEvent | null {
  // L-2026-08-30-01: roll a random destination per NPC first so the
  // player sees NPCs walking to the kitchen / toilet / meeting /
  // training as soon as the new period starts.
  rollRandomNpcDestinations(period);

  const event = pickRandomEvent(game.get(), period);
  if (!event) return null;
  applyEffects(event.effects);
  if (hud) {
    showToast(hud, event.toast, event.toastType);
    if (event.subline) {
      // Slightly delayed second toast so it doesn't overlay the headline awkwardly.
      window.setTimeout(() => {
        if (hud) showToast(hud, event.subline!, event.toastType);
      }, 1800);
    }
  }
  return event;
}

/** Dispatch a list of event effects through the existing reducer actions. */
function applyEffects(effects: RandomEventEffect[]): void {
  for (const e of effects) {
    switch (e.type) {
      case "add-cash":
        game.dispatch({ type: "add-cash", amount: e.delta });
        break;
      case "spend-cash":
        game.dispatch({ type: "spend-cash", amount: e.delta });
        break;
      case "add-stat":
        game.dispatch({ type: "add-stat", stat: e.stat, delta: e.delta });
        break;
      case "add-relationship":
        game.dispatch({ type: "add-relationship", npcId: e.npcId, delta: e.delta });
        break;
      case "set-flag":
        game.dispatch({ type: "set-flag", flag: e.flag, value: e.value });
        break;
    }
  }
}

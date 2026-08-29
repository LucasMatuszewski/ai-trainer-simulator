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
 */

import { game } from "./state";
import { showToast, type HudElements } from "../ui/hud";
import {
  RANDOM_EVENTS,
  type Period,
  type RandomEvent,
  type RandomEventEffect,
} from "../content/events";
import type { GameState } from "../types";

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

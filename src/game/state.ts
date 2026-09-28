/**
 * Game state: the single source of truth.
 *
 * Pattern: a tiny pub-sub store. UI subscribes to changes; the rest of the game
 * dispatches Actions to mutate state. State is JSON-serializable so it can be
 * saved to localStorage.
 */

import type { Action, GameState } from "../types";
import { PERIOD_ORDER } from "./pacing";
import {
  freshV2State,
  migrate,
  writeV1Backup,
  WORLD_DIARY_LIMIT,
} from "./migrate";
import {
  applyReaction,
  pairKey,
  regressNightly,
  type SocialState,
} from "./social";
import { ARCHETYPE_SEEDS } from "../content/npc-profiles";

type Listener = (state: Readonly<GameState>) => void;

class GameStore {
  private state: GameState;
  private listeners = new Set<Listener>();
  private readonly storageKey = "aitrainer:save:v1";

  constructor() {
    this.state = this.load();
  }

  get(): Readonly<GameState> {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  dispatch(action: Action): void {
    const next = reduce(this.state, action);
    if (next === this.state) return; // no-op
    this.state = next;
    // C-58: pose updates are persistence-only - no UI renders the player
    // pose, and the tracker dispatches ~1 Hz while walking, so emitting
    // would re-render the HUD / roster / quest log every second for no
    // visible change. Everything else notifies as usual.
    if (action.type !== "set-player-pose") {
      this.emit();
    }
    if (action.type !== "load" && action.type !== "reset") {
      this.save();
    }
  }

  private emit(): void {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("GameStore listener threw:", err);
      }
    }
  }

  save(): void {
    try {
      // D-51: before the first v2 write overwrites the slot, keep the
      // untouched v1 blob under the backup key (branch switches then
      // degrade instead of losing the player's v1 save).
      const existing = localStorage.getItem(this.storageKey);
      if (existing) writeV1Backup(existing);
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to save game:", err);
    }
  }

  load(): GameState {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return freshV2State();
      const parsed = JSON.parse(raw) as { saveVersion?: number };
      // D-51 migration chain: v1 -> v2 (player data preserved, missing
      // social pairs seeded); malformed or future versions become a
      // fresh v2 game rather than throwing or silently wiping.
      if (parsed.saveVersion === 1 || parsed.saveVersion === 2) {
        return migrate(parsed);
      }
      return freshV2State();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Failed to load save, using initial state:", err);
      return freshV2State();
    }
  }

  reset(): void {
    this.state = freshV2State();
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // ignore
    }
    this.emit();
  }
}

export function reduce(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "add-cash": {
      const cash = state.cash + action.amount;
      const totals = {
        ...state.totals,
        cashEarned: state.totals.cashEarned + Math.max(0, action.amount),
      };
      return { ...state, cash, totals };
    }
    case "spend-cash": {
      return { ...state, cash: state.cash - action.amount };
    }
    case "set-stat": {
      return {
        ...state,
        stats: { ...state.stats, [action.stat]: clamp(action.value, 0, 100) },
      };
    }
    case "add-stat": {
      const cur = state.stats[action.stat];
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.stat]: clamp(cur + action.delta, 0, 100),
        },
      };
    }
    case "set-relationship": {
      return {
        ...state,
        npcRelationships: {
          ...state.npcRelationships,
          [action.npcId]: clamp(action.value, 0, 100),
        },
      };
    }
    case "add-relationship": {
      const cur = state.npcRelationships[action.npcId] ?? 50;
      return {
        ...state,
        npcRelationships: {
          ...state.npcRelationships,
          [action.npcId]: clamp(cur + action.delta, 0, 100),
        },
      };
    }
    case "set-flag": {
      return {
        ...state,
        flags: { ...state.flags, [action.flag]: action.value },
      };
    }
    case "advance-time": {
      const i = PERIOD_ORDER.indexOf(state.timeOfDay);
      if (i < PERIOD_ORDER.length - 1) {
        return { ...state, timeOfDay: PERIOD_ORDER[i + 1]! };
      }
      // end of day
      return { ...state, day: state.day + 1, timeOfDay: "morning" };
    }
    case "start-bankruptcy-countdown": {
      if (state.bankruptcyStartedOnDay > 0) return state;
      return { ...state, bankruptcyStartedOnDay: state.day };
    }
    case "increment-total": {
      return {
        ...state,
        totals: {
          ...state.totals,
          [action.key]: state.totals[action.key] + 1,
        },
      };
    }
    case "set-player-pose":
      return { ...state, playerPose: action.pose };
    case "load":
      return action.state;
    case "reset":
      // D-51: New Game starts on the CURRENT schema. The UI's reset
      // path (character creation) dispatches this action, so it must
      // produce a v2 state — initialGameState() stays v1 as the
      // migration source of truth, never as a live state.
      return freshV2State();
    case "apply-social-reaction": {
      // D-50: one aggregated, clamped transaction (bucket delta +
      // optional authored delta + capped witness deltas). The social
      // block is lazy-seeded for states predating the v2 wiring.
      const social: SocialState =
        state.social ?? freshV2State().social ?? {
          relationships: {},
          mood: {},
          profilesVersion: 0,
        };
      const relationships = applyReaction(
        social.relationships,
        action.pair,
        action.bucket,
        {
          witnesses: action.witnesses,
          authoredRelDelta: action.authoredRelDelta,
        },
      );
      const touched = [
        ...new Set([...(social.touched ?? []), pairKey(action.pair[0], action.pair[1])]),
      ];
      return { ...state, social: { ...social, relationships, touched } };
    }
    case "regress-social-nightly": {
      if (!state.social) return state;
      return {
        ...state,
        social: {
          ...state.social,
          relationships: regressNightly(state.social.relationships, ARCHETYPE_SEEDS, 0.1),
        },
      };
    }
    case "append-diary": {
      const diary = [...(state.worldDiary ?? []), action.entry].slice(-WORLD_DIARY_LIMIT);
      return { ...state, worldDiary: diary };
    }
    case "set-equipment-fault": {
      const equipment = { ...(state.equipment ?? {}) };
      if (action.faulted) equipment[action.id] = "faulted";
      else delete equipment[action.id];
      return { ...state, equipment };
    }
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export const game = new GameStore();

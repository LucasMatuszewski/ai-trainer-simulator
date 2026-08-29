/**
 * The initial state of a brand-new game. Used when no save exists or when the
 * player resets. Player is named "Alex" by default; can be changed in character creation.
 */

import type { GameState } from "../types";

export function initialGameState(): GameState {
  return {
    saveVersion: 1,
    cash: 1500,
    day: 1,
    timeOfDay: "morning",
    character: {
      name: "Alex",
      specialization: "generalist",
      trait: "debugger",
    },
    stats: {
      credibility: 50,
      caffeine: 30,
      patience: 50,
      focus: 50,
    },
    npcRelationships: {
      bartek: 50,
      klaudia: 50,
      marek: 50,
      zosia: 50,
      pawel: 50,
    },
    flags: {},
    inventory: [],
    bankruptcyStartedOnDay: 0,
    totals: {
      cashEarned: 0,
      miniGamesWon: 0,
      miniGamesLost: 0,
      dialoguesFinished: 0,
    },
  };
}

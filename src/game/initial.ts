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
    // C-78 (Lucas): "We just joined the company as a new trainer!" —
    // nobody starts as your BFF. Low acquaintances; Renata is warm-est
    // because onboarding is her job. Everyone else (janusz, dawid, ...)
    // defaults via the `?? 20` reads.
    npcRelationships: {
      bartek: 20,
      klaudia: 15,
      marek: 10,
      zosia: 25,
      pawel: 20,
      renata: 30,
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

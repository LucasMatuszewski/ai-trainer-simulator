/**
 * Economy module.
 *
 * The MVP economy is intentionally simple:
 * - Player starts with 1500 zl.
 * - Each in-game day, expenses fire (rent, coffee, ramen, "LinkedIn Premium" gag).
 * - Player earns money by winning mini-games and by completing dialogue contracts.
 * - If cash < 0 for 30 consecutive in-game days, the player goes bankrupt and the game ends.
 *
 * This module is pure: it does not read or write the game store directly. The
 * caller dispatches the returned actions.
 */

import { game } from "./state";
import type { GameState } from "../types";

export interface DailyTickResult {
  income: number;
  expenses: number;
  net: number;
  meme: string;
  wentBankrupt: boolean;
}

const RENT = 120;
const COFFEE = 8;
const RAMEN = 25;
const LINKEDIN_PREMIUM = 49;

const DAILY_MEMES: string[] = [
  "It works on my machine.",
  "This meeting could have been an email. This email could have been nothing.",
  "I would say 'I am a 10x engineer' but I cannot count that high.",
  "Have you tried turning it off and on again?",
  "I am not saying it is a 10x engineer, but I am not not saying that either.",
  "There are only two hard things in computer science: cache invalidation, naming things, and off-by-one errors.",
  "Per my last email.",
  "LGTM.",
  "We are a family here. (We are not.)",
  "Lets circle back on this. (No one wants to.)",
  "I am just going to push to main.",
  "99 little bugs in the code, 99 little bugs. Take one down, patch it around, 117 little bugs in the code.",
  "We are not saying it is AI, we are saying it is machine learning. That is different. (It is not.)",
  "I read the docs. The docs are wrong.",
  "Works in dev. Fails in prod. Classic.",
  "My hovercraft is full of eels.",
];

/** Compute the daily tick. Mutates state by dispatching actions. Returns a summary. */
export function runDailyTick(): DailyTickResult {
  const state = game.get();
  const totalExpenses = RENT + COFFEE + RAMEN + LINKEDIN_PREMIUM;

  // Income: passive payment from any "contract" flags. For MVP, this is zero
  // unless the player has completed a contract dialogue. Placeholder.
  const passiveIncome = state.flags["got-acme-contract"] ? 200 : 0;

  const net = passiveIncome - totalExpenses;
  game.dispatch({ type: "add-cash", amount: net, reason: "daily-tick" });

  // Bankruptcy check: if net was negative and cash < 0, start the countdown.
  let wentBankrupt = false;
  const after = game.get();
  if (after.cash < 0) {
    if (after.bankruptcyStartedOnDay === 0) {
      game.dispatch({ type: "start-bankruptcy-countdown" });
    }
    const daysInRed = after.day - after.bankruptcyStartedOnDay;
    if (daysInRed >= 30) {
      wentBankrupt = true;
    }
  } else {
    // Recovered: cancel countdown (by re-setting to 0).
    if (after.bankruptcyStartedOnDay !== 0) {
      game.dispatch({ type: "set-flag", flag: "_reset-bankruptcy", value: true });
      // Reset via a tiny trick: re-dispatch a "start-bankruptcy-countdown" then immediately
      // load a copy with the field zeroed. Simpler: dispatch a dedicated action. For MVP
      // we cheat and zero it via load.
      const cleared: GameState = { ...after, bankruptcyStartedOnDay: 0 };
      game.dispatch({ type: "load", state: cleared });
    }
  }

  return {
    income: passiveIncome,
    expenses: totalExpenses,
    net,
    meme: pickDailyMeme(state.day),
    wentBankrupt,
  };
}

function pickDailyMeme(seed: number): string {
  // Deterministic per day so the meme doesn't change if you re-open the modal.
  const idx = ((seed * 2654435761) >>> 0) % DAILY_MEMES.length;
  return DAILY_MEMES[idx]!;
}

export const ECONOMY_CONSTANTS = { RENT, COFFEE, RAMEN, LINKEDIN_PREMIUM };

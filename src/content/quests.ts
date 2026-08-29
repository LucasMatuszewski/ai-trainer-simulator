/**
 * Quest content for the onboarding arc (Day 1-7).
 *
 * Each quest is a unit the quest log can render. The orchestrator advances
 * through the chain by checking `completionFlag` on the game state. The
 * visual "what to do next" comes from the roster card or the office interior,
 * not from a separate mini-quest UI. This file is pure data so it is easy to
 * edit and to test.
 *
 * Day-1 "first day at the office" arc was written by the maintainer to give
 * the player a clear path. Day-2..7 are skeleton arcs the GLM brainstorm
 * will flesh out — these read like chain-of-custody placeholders until then.
 */

import type { NpcId } from "../types";

export interface Quest {
  /** Unique id; matches `flags[quest.id]` when active, set true on completion. */
  id: string;
  /** Short imperative title for the quest log. */
  title: string;
  /** One sentence describing what the player should do. */
  description: string;
  /** Which NPC the quest drives the player to talk to (if any). */
  who?: NpcId;
  /** What the player gets on completion (rendered as "+50 zl, +5 credibility"). */
  reward?: string;
  /** The quest id to auto-start after this one completes. */
  chainsTo?: string;
  /** When this quest should be available. Defaults to always. */
  availableWhen?: (state: Readonly<import("../types").GameState>) => boolean;
  /**
   * A flag-name that, when true, marks the quest complete. Every quest
   * should have a flag — even intro blurbs (the cinematic sets it) and
   * "end the day" gates (the End Day button sets it). The orchestrator
   * skips quests whose flag is set, so a missing flag means a quest that
   * never advances, which is a bug.
   */
  completionFlag?: string;
  /** Day the quest auto-starts. The first quest with no chainsTo is Day 1. */
  day: number;
}

export const QUESTS: Quest[] = [
  // Day 1
  {
    id: "q-intro-1",
    title: "Find your desk",
    description: "You're the new IT trainer. Walk in, look around, don't stare at the receptionist too long.",
    completionFlag: "intro-seen",
    day: 1,
  },
  {
    id: "q-talk-bartek",
    title: "Talk to Bartek",
    description: "Bartek is your team lead. He needs to know you exist before HR notices you're not in the system.",
    who: "bartek",
    reward: "+relationship with Bartek",
    chainsTo: "q-accept-tutoring",
    completionFlag: "got-acme-contract",
    day: 1,
  },
  {
    id: "q-accept-tutoring",
    title: "Accept the training assignment",
    description: "Bartek has an ACME Corp contract on his desk. Take it. They want JavaScript for Excel people.",
    who: "bartek",
    reward: "+250 zl on completion, +10 credibility",
    chainsTo: "q-meet-the-team",
    completionFlag: "tutorial-accepted",
    day: 1,
  },
  {
    id: "q-meet-the-team",
    title: "Meet the team",
    description: "Klaudia is loud, Marek is busy, Zosia will ask if you read the wiki. Say yes to all three.",
    chainsTo: "q-debug-something",
    completionFlag: "met-team",
    day: 1,
  },
  {
    id: "q-debug-something",
    title: "Open the computer",
    description: "There is a minigame on your desk. Fix the bug. The client does not care how you do it. Do not push to main.",
    reward: "+50-150 zl per bug, +5 focus per win",
    chainsTo: "q-end-day-1",
    completionFlag: "ran-debug-game",
    day: 1,
  },
  {
    id: "q-end-day-1",
    title: "End Day 1",
    description: "You have read the wiki. You have a contract. You survived. End the day before you become a meme.",
    completionFlag: "day-1-ended",
    day: 1,
  },

  // Day 2 - placeholder arc until the GLM brainstorm lands
  {
    id: "q-day2-standup",
    title: "Survive the standup",
    description: "It is Day 2. Zosia runs standup. Yesterday: 3 meetings. Today: 4 meetings. Blockers: the printer.",
    who: "zosia",
    chainsTo: "q-day2-klaudia",
    completionFlag: "day2-standup-done",
    day: 2,
  },
  {
    id: "q-day2-klaudia",
    title: "Endure a LinkedIn pitch",
    description: "Klaudia wants you to like her post. The post is about synergy. You do not have to read it. She will tell you what to like.",
    who: "klaudia",
    completionFlag: "day2-klaudia-done",
    day: 2,
  },

  // Day 3
  {
    id: "q-day3-tomek",
    title: "Mentor Tomek",
    description: "Tomek is stuck. He has been stuck since Tuesday. Show him the Stack Overflow link you used.",
    who: "tomek",
    completionFlag: "day3-tomek-done",
    day: 3,
  },

  // Day 7
  {
    id: "q-week1-review",
    title: "Week 1 review with Zosia",
    description: "Zosia wants numbers. Cashflow, relationships, and whether the printer is still broken. Bring numbers.",
    who: "zosia",
    completionFlag: "week1-review-done",
    day: 7,
  },
];

/**
 * Return the quest with the given id, or undefined if not found.
 * Extracted into a pure function so the quest orchestrator can test it
 * without booting the full game.
 */
export function getQuest(id: string): Quest | undefined {
  return QUESTS.find((q) => q.id === id);
}

/**
 * Find the quest that should be active on the given day, considering
 * which quests the player has already finished. The "active" quest is the
 * first one whose `day` matches AND whose `completionFlag` is NOT set
 * AND whose `chainsTo` (the previous quest) is either undefined or
 * whose completion flag IS set.
 *
 * On Day 1 with a fresh save, the active quest is `q-intro-1`.
 * After talking to Bartek and getting the contract, `q-talk-bartek`
 * is complete and the active quest becomes `q-accept-tutoring`.
 */
export function getActiveQuest(state: Readonly<import("../types").GameState>): Quest | undefined {
  // Walk through QUESTS in order; the first quest that:
  //   - matches today's day (state.day)
  //   - has not been completed
  //   - has its prerequisite complete (if a quest with the same day has
  //     a `chainsTo` pointing at me, the prerequisite's completionFlag
  //     must be set before I can start)
  //
  // A quest with no completionFlag is "always shown" — it represents
  // a step the player is on right now (an intro blurb, a final "end the
  // day" reminder). The orchestrator returns it, and the game wires
  // the dismissal separately (cinematic sets a flag, end-day button
  // advances, etc). Flagless quests that the player has effectively
  // passed are skipped by adding a completionFlag to them.
  for (const q of QUESTS) {
    if (q.day !== state.day) continue;
    if (q.completionFlag !== undefined && state.flags[q.completionFlag] === true) continue;
    // Prereq check: if another quest chains to me, that one must be
    // complete first.
    const blockedBy = QUESTS.find((other) => other.day === q.day && other.chainsTo === q.id);
    if (blockedBy !== undefined && blockedBy.completionFlag !== undefined && state.flags[blockedBy.completionFlag] !== true) {
      continue;
    }
    return q;
  }
  return undefined;
}

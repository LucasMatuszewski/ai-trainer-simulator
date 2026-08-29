/**
 * Tests for the quest orchestrator.
 *
 * The quest log is the only piece of UI the player has to understand "what
 * should I do next". A bug here means the player is stuck with no obvious
 * way out — the worst possible failure mode. These tests pin down the
 * "what quest is active on what day, with what flags" behavior.
 */

import { describe, expect, it } from "vitest";
import { initialGameState } from "../../src/game/initial";
import type { GameState } from "../../src/types";
import { QUESTS, getActiveQuest, getQuest } from "../../src/content/quests";

describe("getQuest", () => {
  it("returns the quest for a known id", () => {
    const q = getQuest("q-talk-bartek");
    expect(q).toBeDefined();
    expect(q?.title).toBe("Talk to Bartek");
  });

  it("returns undefined for an unknown id", () => {
    expect(getQuest("q-does-not-exist")).toBeUndefined();
  });
});

describe("getActiveQuest", () => {
  it("returns the first Day 1 quest on a fresh save (no flags set)", () => {
    const state = initialGameState();
    expect(state.day).toBe(1);
    const q = getActiveQuest(state);
    expect(q).toBeDefined();
    expect(q?.id).toBe("q-intro-1");
  });

  it("advances to 'Talk to Bartek' once the intro cinematic has been seen", () => {
    // The intro cinematic sets the intro-seen flag; only then is the
    // walker allowed past q-intro-1.
    const state = initialGameState();
    state.flags["intro-seen"] = true;
    const q = getActiveQuest(state);
    expect(q).toBeDefined();
    expect(q?.id).toBe("q-talk-bartek");
  });

  it("keeps q-talk-bartek active until the player accepts the contract", () => {
    const state = initialGameState();
    state.flags["intro-seen"] = true;
    const before = getActiveQuest(state);
    expect(before?.id).toBe("q-talk-bartek");
    state.flags["got-acme-contract"] = true;
    const next = getActiveQuest(state);
    expect(next?.id).toBe("q-accept-tutoring");
  });

  it("unlocks q-day2-standup on Day 2", () => {
    const state: GameState = { ...initialGameState(), day: 2 };
    const q = getActiveQuest(state);
    expect(q).toBeDefined();
    expect(q?.id).toBe("q-day2-standup");
    expect(q?.day).toBe(2);
  });

  it("returns undefined if no quest matches the current day", () => {
    // No quest has day=99 in the current data set; the function should
    // gracefully return undefined so the UI can show "Free time".
    const state: GameState = { ...initialGameState(), day: 99 };
    expect(getActiveQuest(state)).toBeUndefined();
  });

  it("a chainsTo chain is honored: prerequisite must be complete", () => {
    // q-accept-tutoring has chainsTo="q-meet-the-team". meet-the-team
    // should NOT be active until tutorial-accepted is true. (This is a
    // regression guard: if someone reorders the array, this catches it.)
    const state: GameState = { ...initialGameState(), day: 1 };
    state.flags["intro-seen"] = true;
    state.flags["got-acme-contract"] = true; // skip q-talk-bartek
    const afterBartek = getActiveQuest(state);
    expect(afterBartek?.id).toBe("q-accept-tutoring");
    // Now set the tutorial-accepted flag, and meet-the-team should
    // become the next available quest for day 1.
    state.flags["tutorial-accepted"] = true;
    const afterAccepted = getActiveQuest(state);
    expect(afterAccepted?.id).toBe("q-meet-the-team");
  });
});

describe("QUEST data integrity", () => {
  it("every quest id is unique", () => {
    const ids = QUESTS.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("every chainsTo points at an existing quest", () => {
    for (const q of QUESTS) {
      if (q.chainsTo !== undefined) {
        expect(getQuest(q.chainsTo), `chainsTo broken on ${q.id}`).toBeDefined();
      }
    }
  });

  it("no quest points chainsTo at itself", () => {
    for (const q of QUESTS) {
      expect(q.chainsTo, `self-chain on ${q.id}`).not.toBe(q.id);
    }
  });

  it("every quest has a completionFlag", () => {
    // The orchestrator skips a quest only when its flag is set. A quest
    // with no flag is "always active" — the player can never advance
    // past it. That's a real bug we just hit; pin it down.
    for (const q of QUESTS) {
      expect(q.completionFlag, `quest ${q.id} has no completionFlag`).toBeDefined();
    }
  });
});

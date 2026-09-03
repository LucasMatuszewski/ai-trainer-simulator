/**
 * Tests for the game state reducer.
 *
 * The reducer is a pure function over a switch, so it's the natural starting
 * point for TDD in this project. Every action gets one happy-path test and
 * (where relevant) a clamp / boundary test.
 */

import { describe, expect, it, vi } from "vitest";

vi.hoisted(() => {
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
      clear: () => values.clear(),
    },
  });
});
import { initialGameState } from "../../src/game/initial";
import { game, reduce } from "../../src/game/state";

const baseState = () => initialGameState();

describe("reducer: cash", () => {
  it("add-cash increases cash and bumps cashEarned", () => {
    const s = baseState();
    const next = reduce(s, { type: "add-cash", amount: 200 });
    expect(next.cash).toBe(s.cash + 200);
    expect(next.totals.cashEarned).toBe(200);
  });

  it("spend-cash decreases cash but does not touch totals.cashEarned", () => {
    // baseState starts at 1500. Add 500 -> 2000. Spend 100 -> 1900.
    const s = reduce(baseState(), { type: "add-cash", amount: 500 });
    expect(s.cash).toBe(2000);
    const next = reduce(s, { type: "spend-cash", amount: 100 });
    expect(next.cash).toBe(1900);
    expect(next.totals.cashEarned).toBe(500); // unchanged
  });
});

describe("reducer: stats", () => {
  it("add-stat clamps to 0..100", () => {
    const s = baseState();
    const top = reduce(s, { type: "add-stat", stat: "focus", delta: 9999 });
    expect(top.stats.focus).toBe(100);
    const bottom = reduce(s, { type: "add-stat", stat: "focus", delta: -9999 });
    expect(bottom.stats.focus).toBe(0);
  });

  it("set-stat replaces value and clamps", () => {
    const s = baseState();
    const next = reduce(s, { type: "set-stat", stat: "caffeine", value: 150 });
    expect(next.stats.caffeine).toBe(100);
  });
});

describe("reducer: relationships", () => {
  it("add-relationship defaults to 50 when unknown NPC", () => {
    const s = baseState();
    const next = reduce(s, { type: "add-relationship", npcId: "maciek", delta: 5 });
    expect(next.npcRelationships.maciek).toBe(55);
  });

  it("add-relationship clamps to 0..100", () => {
    let s = baseState();
    s = reduce(s, { type: "add-relationship", npcId: "bartek", delta: 9999 });
    expect(s.npcRelationships.bartek).toBe(100);
  });
});

describe("reducer: flags", () => {
  it("set-flag stores boolean", () => {
    const s = baseState();
    const next = reduce(s, { type: "set-flag", flag: "tutorial-done", value: true });
    expect(next.flags["tutorial-done"]).toBe(true);
  });
});

describe("reducer: advance-time", () => {
  it("advances morning -> lunch -> afternoon -> evening", () => {
    let s = baseState();
    s = reduce(s, { type: "advance-time" });
    expect(s.timeOfDay).toBe("lunch");
    s = reduce(s, { type: "advance-time" });
    expect(s.timeOfDay).toBe("afternoon");
    s = reduce(s, { type: "advance-time" });
    expect(s.timeOfDay).toBe("evening");
  });

  it("wraps evening -> next day morning and bumps day", () => {
    let s = baseState();
    s = reduce(s, { type: "advance-time" });
    s = reduce(s, { type: "advance-time" });
    s = reduce(s, { type: "advance-time" });
    const wrapped = reduce(s, { type: "advance-time" });
    expect(wrapped.day).toBe(s.day + 1);
    expect(wrapped.timeOfDay).toBe("morning");
  });
});

describe("reducer: totals", () => {
  it("increment-total adds 1 to the named key", () => {
    const s = baseState();
    const next = reduce(s, { type: "increment-total", key: "miniGamesWon" });
    expect(next.totals.miniGamesWon).toBe(1);
  });
});

describe("reducer: player pose (C-58)", () => {
  it("set-player-pose stores the pose", () => {
    const pose = { x: 12.5, z: -3.25, yaw: 1.2, pitch: -0.1 };
    const next = reduce(baseState(), { type: "set-player-pose", pose });
    expect(next.playerPose).toEqual(pose);
  });

  it("set-player-pose leaves the rest of the state untouched", () => {
    const s = baseState();
    const next = reduce(s, { type: "set-player-pose", pose: { x: 1, z: 2, yaw: 0, pitch: 0 } });
    expect(next.cash).toBe(s.cash);
    expect(next.day).toBe(s.day);
    expect(next.stats).toEqual(s.stats);
  });

  it("a fresh game state has no playerPose (new games start at the door)", () => {
    expect(baseState().playerPose).toBeUndefined();
  });
});

describe("store: pose persistence (C-58)", () => {
  it("set-player-pose persists to localStorage WITHOUT notifying UI listeners", () => {
    // The pose tracker dispatches ~1 Hz while walking. No UI renders
    // the pose, so the store must persist it silently - otherwise the
    // HUD / roster / quest log would re-render every second for no
    // visible change.
    let notified = 0;
    const unsub = game.subscribe(() => {
      notified += 1;
    });
    game.dispatch({ type: "set-player-pose", pose: { x: 5, z: 6, yaw: 0.5, pitch: 0 } });
    unsub();
    expect(notified).toBe(0);
    const saved = JSON.parse(localStorage.getItem("aitrainer:save:v1")!) as { playerPose?: unknown };
    expect(saved.playerPose).toEqual({ x: 5, z: 6, yaw: 0.5, pitch: 0 });
  });
});

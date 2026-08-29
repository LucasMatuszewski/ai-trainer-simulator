/**
 * Tests for the game state reducer.
 *
 * The reducer is a pure function over a switch, so it's the natural starting
 * point for TDD in this project. Every action gets one happy-path test and
 * (where relevant) a clamp / boundary test.
 */

import { describe, expect, it } from "vitest";
import { initialGameState } from "../../src/game/initial";
import { reduce } from "../../src/game/state";

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
  it("advances morning -> afternoon -> evening", () => {
    let s = baseState();
    s = reduce(s, { type: "advance-time" });
    expect(s.timeOfDay).toBe("afternoon");
    s = reduce(s, { type: "advance-time" });
    expect(s.timeOfDay).toBe("evening");
  });

  it("wraps evening -> next day morning and bumps day", () => {
    let s = baseState();
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

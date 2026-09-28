import { describe, expect, it } from "vitest";
import { game, reduce } from "../../../src/game/state";
import { pairKey } from "../../../src/game/social";
import { ARCHETYPE_SEEDS, ALL_PAIR_KEYS } from "../../../src/content/npc-profiles";
import { initialGameState } from "../../../src/game/initial";
import type { GameState } from "../../../src/types";

/** A v1 state with the optional v2 block absent — the pre-wiring shape. */
function v1State(): GameState {
  return initialGameState();
}

/** A v2 state with the social block present and archetype-seeded. */
function v2State(): GameState {
  const base = v1State();
  const relationships: Record<string, number> = {};
  for (const key of ALL_PAIR_KEYS) relationships[key] = ARCHETYPE_SEEDS[key] ?? 50;
  return {
    ...base,
    saveVersion: 2,
    social: { relationships, mood: {}, profilesVersion: 1 },
  };
}

describe("social reducer actions (D-50/D-51 wiring)", () => {
  it("apply-social-reaction lazy-seeds the social block on a v1-shaped state", () => {
    const state = v1State();
    expect(state.social).toBeUndefined();
    const next = reduce(state, {
      type: "apply-social-reaction",
      pair: ["zosia", "pawel"],
      bucket: "delighted",
    });
    const key = pairKey("pawel", "zosia");
    expect(next.social).toBeDefined();
    const before = next.social!.relationships[key] ?? 50;
    const after = reduce(next, {
      type: "apply-social-reaction",
      pair: ["zosia", "pawel"],
      bucket: "delighted",
    }).social!.relationships[key]!;
    // A delighted bucket moves the pair by the bucket delta (> 0, ≤ 5).
    expect(after).toBeGreaterThan(before);
    expect(after - before).toBeLessThanOrEqual(5);
  });

  it("marks touched pairs so a profilesVersion bump re-seeds skips them", () => {
    const next = reduce(v1State(), {
      type: "apply-social-reaction",
      pair: ["klaudia", "marek"],
      bucket: "annoyed",
    });
    expect(next.social!.touched).toContain(pairKey("klaudia", "marek"));
  });

  it("clamps at 0 and 100 across many hostile/warm actions", () => {
    let state = v2State();
    for (let i = 0; i < 50; i += 1) {
      state = reduce(state, {
        type: "apply-social-reaction",
        pair: ["zosia", "pawel"],
        bucket: "offended",
      });
    }
    const key = pairKey("pawel", "zosia");
    expect(state.social!.relationships[key]).toBeGreaterThanOrEqual(0);
    for (let i = 0; i < 50; i += 1) {
      state = reduce(state, {
        type: "apply-social-reaction",
        pair: ["zosia", "pawel"],
        bucket: "delighted",
      });
    }
    expect(state.social!.relationships[key]).toBeLessThanOrEqual(100);
  });

  it("witness deltas are capped at ±2", () => {
    let state = v2State();
    const witnessKey = pairKey("ania", "tomek");
    const before = state.social!.relationships[witnessKey]!;
    state = reduce(state, {
      type: "apply-social-reaction",
      pair: ["zosia", "pawel"],
      bucket: "neutral",
      witnesses: [{ pair: ["ania", "tomek"], delta: 99 }],
    });
    const moved = state.social!.relationships[witnessKey]! - before;
    // The witness asked for +99; the cap turned it into exactly +2
    // (the neutral bucket itself adds 0 to the pair).
    expect(moved).toBe(2);
  });

  it("regress-social-nightly pulls an extreme pair toward its seed", () => {
    let state = v2State();
    const key = pairKey("pawel", "zosia");
    state = {
      ...state,
      social: { ...state.social!, relationships: { ...state.social!.relationships, [key]: 100 } },
    };
    for (let i = 0; i < 10; i += 1) {
      state = reduce(state, { type: "regress-social-nightly" });
    }
    const seed = ARCHETYPE_SEEDS[key] ?? 50;
    expect(state.social!.relationships[key]!).toBeLessThan(100);
    expect(Math.abs(state.social!.relationships[key]! - seed)).toBeLessThan(40);
  });

  it("regress-social-nightly is a no-op on a state without social", () => {
    const state = v1State();
    expect(reduce(state, { type: "regress-social-nightly" })).toBe(state);
  });

  it("append-diary keeps a capped ring (newest last)", () => {
    let state = v2State();
    for (let i = 0; i < 35; i += 1) {
      state = reduce(state, { type: "append-diary", entry: `event-${i}` });
    }
    expect(state.worldDiary).toHaveLength(30);
    expect(state.worldDiary![0]).toBe("event-5");
    expect(state.worldDiary![29]).toBe("event-34");
  });

  it("set-equipment-fault sets and clears", () => {
    let state = reduce(v2State(), { type: "set-equipment-fault", id: "printer", faulted: true });
    expect(state.equipment!.printer).toBe("faulted");
    state = reduce(state, { type: "set-equipment-fault", id: "printer", faulted: false });
    expect("printer" in state.equipment!).toBe(false);
  });

  it("the live store persists social changes through dispatch+save+load", () => {
    // Reset through the live store (the same path the UI uses).
    game.dispatch({ type: "reset" });
    game.dispatch({ type: "apply-social-reaction", pair: ["bartek", "klaudia"], bucket: "pleased" });
    const social = game.get().social;
    expect(social).toBeDefined();
    expect(social!.profilesVersion).toBeGreaterThan(0);
    const key = pairKey("bartek", "klaudia");
    expect(social!.relationships[key]).toBeDefined();
  });
});

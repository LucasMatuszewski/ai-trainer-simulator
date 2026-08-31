import { describe, expect, it } from "vitest";

import {
  ARM_SWING_AMPLITUDE,
  BOB_AMPLITUDE,
  DEFAULT_WALK_SPEED_MPS,
  GAIT_HZ_AT_DEFAULT,
  LEG_SWING_AMPLITUDE,
  RADIANS_PER_METRE,
  updateWalkCycle,
  type WalkCycleState,
} from "../../src/engine/npc-walk-cycle";

describe("updateWalkCycle", () => {
  it("freezes distance and gait angles while speed is zero", () => {
    const state: WalkCycleState = { distanceTraveled: 0.137 };

    const first = updateWalkCycle(state, 10, 0);
    const second = updateWalkCycle(first.state, 10, 0);

    expect(first.state.distanceTraveled).toBe(state.distanceTraveled);
    expect(second.state.distanceTraveled).toBe(state.distanceTraveled);
    expect(second.legSwing).toBe(first.legSwing);
    expect(second.armSwing).toBe(first.armSwing);
    expect(second.bobAmount).toBe(first.bobAmount);
  });

  it("travels 1.2 metres and completes four gait cycles in one second", () => {
    let state: WalkCycleState = { distanceTraveled: 0 };
    let positiveZeroCrossings = 0;
    let previousLegSwing = updateWalkCycle(state, 0, DEFAULT_WALK_SPEED_MPS).legSwing;
    let wasPositive = false;

    for (let step = 0; step < 60; step += 1) {
      const output = updateWalkCycle(state, 1 / 60, DEFAULT_WALK_SPEED_MPS);
      const isPositive = output.legSwing > 1e-10;
      if (!wasPositive && isPositive) positiveZeroCrossings += 1;
      wasPositive = isPositive;
      previousLegSwing = output.legSwing;
      state = output.state;
    }

    expect(state.distanceTraveled).toBeCloseTo(DEFAULT_WALK_SPEED_MPS, 10);
    expect(positiveZeroCrossings).toBe(GAIT_HZ_AT_DEFAULT);
    expect(previousLegSwing).toBeCloseTo(0, 10);
  });

  it("resumes from the stored phase without snapping after a freeze", () => {
    const moving = updateWalkCycle({ distanceTraveled: 0 }, 0.37, DEFAULT_WALK_SPEED_MPS);
    const frozen = updateWalkCycle(moving.state, 20, 0);
    const resumed = updateWalkCycle(frozen.state, 1 / 60, DEFAULT_WALK_SPEED_MPS);
    const expected = updateWalkCycle(moving.state, 1 / 60, DEFAULT_WALK_SPEED_MPS);

    expect(frozen.legSwing).toBe(moving.legSwing);
    expect(frozen.armSwing).toBe(moving.armSwing);
    expect(frozen.bobAmount).toBe(moving.bobAmount);
    expect(resumed).toEqual(expected);
  });

  it("keeps bob non-negative and freezes safely for invalid inputs", () => {
    const states = Array.from({ length: 100 }, (_, index) => ({
      distanceTraveled: index / 100,
    }));

    for (const state of states) {
      expect(updateWalkCycle(state, 0, 0).bobAmount).toBeGreaterThanOrEqual(0);
    }

    const state: WalkCycleState = { distanceTraveled: 0.42 };
    const negativeDt = updateWalkCycle(state, -1, DEFAULT_WALK_SPEED_MPS);
    const nanSpeed = updateWalkCycle(state, 1, Number.NaN);

    for (const output of [negativeDt, nanSpeed]) {
      expect(output.state.distanceTraveled).toBe(state.distanceTraveled);
      expect(Number.isFinite(output.legSwing)).toBe(true);
      expect(Number.isFinite(output.armSwing)).toBe(true);
      expect(Number.isFinite(output.bobAmount)).toBe(true);
    }
  });

  it("is pure and returns a new state object", () => {
    const state: WalkCycleState = { distanceTraveled: 0.25 };
    const snapshot = { ...state };

    const first = updateWalkCycle(state, 0.1, DEFAULT_WALK_SPEED_MPS);
    const second = updateWalkCycle(state, 0.1, DEFAULT_WALK_SPEED_MPS);

    expect(first).toEqual(second);
    expect(state).toEqual(snapshot);
    expect(first.state).not.toBe(state);
  });

  it("exports the specified gait reference values and amplitudes", () => {
    expect(DEFAULT_WALK_SPEED_MPS).toBe(1.2);
    expect(GAIT_HZ_AT_DEFAULT).toBe(4);
    expect(RADIANS_PER_METRE).toBeCloseTo(2 * Math.PI * 4 / 1.2, 12);
    expect(LEG_SWING_AMPLITUDE).toBe(0.6);
    expect(ARM_SWING_AMPLITUDE).toBe(0.35);
    expect(BOB_AMPLITUDE).toBe(0.05);
  });
});

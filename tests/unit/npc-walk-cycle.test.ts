import { describe, expect, it } from "vitest";

import {
  ARM_SWING_AMPLITUDE,
  BOB_AMPLITUDE,
  DEFAULT_WALK_SPEED_MPS,
  GAIT_AMPLITUDE_RATE,
  GAIT_HZ_AT_DEFAULT,
  LEG_SWING_AMPLITUDE,
  RADIANS_PER_METRE,
  updateWalkCycle,
  type WalkCycleOutput,
  type WalkCycleState,
} from "../../src/engine/npc-walk-cycle";

const STEP = 1 / 60;
const FREE = (state: WalkCycleState, dt = STEP): WalkCycleOutput =>
  updateWalkCycle(state, dt, DEFAULT_WALK_SPEED_MPS, DEFAULT_WALK_SPEED_MPS * dt);
const BLOCKED = (state: WalkCycleState, dt = STEP): WalkCycleOutput =>
  updateWalkCycle(state, dt, DEFAULT_WALK_SPEED_MPS, 0);

describe("updateWalkCycle (C-48 progress-driven gait)", () => {
  it("advances the phase by metres actually moved, not by time", () => {
    const state: WalkCycleState = { distanceTraveled: 1, amplitude: 1 };
    // One second of wall time but only 0.3 m of real movement.
    const output = updateWalkCycle(state, 1, DEFAULT_WALK_SPEED_MPS, 0.3);
    expect(output.state.distanceTraveled).toBeCloseTo(1.3, 12);
  });

  it("keeps full amplitude and the legacy swing envelope while freely moving", () => {
    let state: WalkCycleState = { distanceTraveled: 0, amplitude: 1 };
    let maxLegSwing = 0;
    for (let step = 0; step < 120; step += 1) {
      const output = FREE(state);
      state = output.state;
      maxLegSwing = Math.max(maxLegSwing, Math.abs(output.legSwing));
      expect(output.state.amplitude).toBe(1);
    }
    expect(state.distanceTraveled).toBeCloseTo(DEFAULT_WALK_SPEED_MPS * 2, 10);
    // 3 dp: 1/60 s sampling misses the exact swing peak by < 1e-3.
    expect(maxLegSwing).toBeCloseTo(LEG_SWING_AMPLITUDE, 3);
  });

  it("eases the amplitude to zero while blocked, so a stopped NPC cannot march in place", () => {
    let state: WalkCycleState = { distanceTraveled: 1, amplitude: 1 };
    let previous = 1;
    for (let step = 0; step < 60; step += 1) {
      const output = BLOCKED(state);
      state = output.state;
      expect(output.state.distanceTraveled).toBe(1); // phase frozen
      expect(output.state.amplitude).toBeLessThanOrEqual(previous);
      previous = output.state.amplitude;
    }
    expect(state.amplitude).toBeLessThan(0.05);
    // With the amplitude gone, the visible gait is silent.
    expect(Math.abs(updateWalkCycle(state, STEP, DEFAULT_WALK_SPEED_MPS, 0).legSwing)).toBeLessThan(1e-6);
  });

  it("recovers the amplitude once movement resumes", () => {
    let state: WalkCycleState = { distanceTraveled: 0, amplitude: 1 };
    for (let step = 0; step < 60; step += 1) state = BLOCKED(state).state;
    for (let step = 0; step < 60; step += 1) state = FREE(state).state;
    expect(state.amplitude).toBe(1);
  });

  it("scales bob by the current amplitude", () => {
    let state: WalkCycleState = { distanceTraveled: 0.11, amplitude: 1 };
    for (let step = 0; step < 20; step += 1) {
      const output = BLOCKED(state);
      state = output.state;
      expect(output.bobAmount).toBeLessThanOrEqual(BOB_AMPLITUDE * state.amplitude + 1e-12);
    }
  });

  it("resumes from the stored phase without snapping after a block", () => {
    const moving = FREE({ distanceTraveled: 0, amplitude: 1 });
    let frozen = moving.state;
    for (let step = 0; step < 1200; step += 1) frozen = BLOCKED(frozen).state; // 20 s stuck
    const resumed = updateWalkCycle(frozen, STEP, DEFAULT_WALK_SPEED_MPS, 0.02);
    const expected = updateWalkCycle(moving.state, STEP, DEFAULT_WALK_SPEED_MPS, 0.02);

    expect(resumed.state.distanceTraveled).toBeCloseTo(expected.state.distanceTraveled, 12);
    // The phase is continuous; only the amplitude ramp differs.
    expect(resumed.state.amplitude).toBeLessThan(expected.state.amplitude);
  });

  it("travels 1.2 metres in one second at the 1.6 Hz gait (C-45 l)(3), fed by progress", () => {
    let state: WalkCycleState = { distanceTraveled: 0, amplitude: 1 };
    let positiveZeroCrossings = 0;
    let wasPositive = false;

    for (let step = 0; step < 100; step += 1) {
      const output = FREE(state, 1 / 100);
      const isPositive = output.legSwing > 1e-10;
      if (!wasPositive && isPositive) positiveZeroCrossings += 1;
      wasPositive = isPositive;
      state = output.state;
    }

    expect(state.distanceTraveled).toBeCloseTo(DEFAULT_WALK_SPEED_MPS, 10);
    expect(positiveZeroCrossings).toBe(2);
  });

  it("freezes safely for invalid inputs and treats them as not-moving", () => {
    const state: WalkCycleState = { distanceTraveled: 0.42, amplitude: 0.8 };
    const negativeProgress = updateWalkCycle(state, STEP, DEFAULT_WALK_SPEED_MPS, -1);
    const nanProgress = updateWalkCycle(state, STEP, DEFAULT_WALK_SPEED_MPS, Number.NaN);
    const negativeDt = updateWalkCycle(state, -1, DEFAULT_WALK_SPEED_MPS, 0.02);

    for (const output of [negativeProgress, nanProgress, negativeDt]) {
      expect(output.state.distanceTraveled).toBe(0.42);
      expect(Number.isFinite(output.legSwing)).toBe(true);
      expect(Number.isFinite(output.armSwing)).toBe(true);
      expect(Number.isFinite(output.bobAmount)).toBe(true);
    }
    // Garbage progress reads as "not moving": the gait eases down.
    expect(negativeProgress.state.amplitude).toBeLessThan(0.8);
    expect(nanProgress.state.amplitude).toBeLessThan(0.8);
    // An invalid dt is a caller bug: freeze entirely, no amplitude drift.
    expect(negativeDt.state.amplitude).toBe(0.8);

    // Progress is the ground truth for the phase, so a NaN speed with
    // a real displacement still advances the cycle (but eases down,
    // because expected speed is unknown).
    const nanSpeed = updateWalkCycle(state, STEP, Number.NaN, 0.02);
    expect(nanSpeed.state.distanceTraveled).toBeCloseTo(0.44, 12);
    expect(nanSpeed.state.amplitude).toBeLessThan(0.8);
  });

  it("is pure and returns a new state object", () => {
    const state: WalkCycleState = { distanceTraveled: 0.25, amplitude: 1 };
    const snapshot = { ...state };

    const first = FREE(state);
    const second = FREE(state);

    expect(first).toEqual(second);
    expect(state).toEqual(snapshot);
    expect(first.state).not.toBe(state);
  });

  it("exports the gait reference values and amplitudes", () => {
    expect(DEFAULT_WALK_SPEED_MPS).toBe(1.2);
    expect(GAIT_HZ_AT_DEFAULT).toBe(1.6);
    expect(RADIANS_PER_METRE).toBeCloseTo(2 * Math.PI * 1.6 / 1.2, 12);
    expect(LEG_SWING_AMPLITUDE).toBe(0.3);
    expect(ARM_SWING_AMPLITUDE).toBe(0.18);
    expect(BOB_AMPLITUDE).toBe(0.025);
    expect(GAIT_AMPLITUDE_RATE).toBe(6);
  });
});

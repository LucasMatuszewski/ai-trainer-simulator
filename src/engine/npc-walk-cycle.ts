export interface WalkCycleState {
  /** Total metres travelled since the cycle started (the phase source). */
  distanceTraveled: number;
}

export interface WalkCycleOutput {
  /** Symmetric leg angle in radians; the right leg uses the negative value. */
  legSwing: number;
  /** Arm angle in radians, counter-phase to the corresponding leg. */
  armSwing: number;
  /** Non-negative vertical offset in metres. */
  bobAmount: number;
  state: WalkCycleState;
}

export const DEFAULT_WALK_SPEED_MPS = 1.2;
export const GAIT_HZ_AT_DEFAULT = 4;
export const LEG_SWING_AMPLITUDE = 0.6;
export const ARM_SWING_AMPLITUDE = 0.35;
export const BOB_AMPLITUDE = 0.05;
export const RADIANS_PER_METRE = (
  2 * Math.PI * GAIT_HZ_AT_DEFAULT / DEFAULT_WALK_SPEED_MPS
);

export function updateWalkCycle(
  state: WalkCycleState,
  dt: number,
  speed: number,
): WalkCycleOutput {
  const safeDistance = Number.isFinite(state.distanceTraveled)
    ? state.distanceTraveled
    : 0;
  const safeDt = Number.isFinite(dt) && dt > 0 ? dt : 0;
  const safeSpeed = Number.isFinite(speed) && speed > 0 ? speed : 0;
  const distanceTraveled = safeDistance + safeSpeed * safeDt;
  const phase = distanceTraveled * RADIANS_PER_METRE;
  const phaseAmount = Math.sin(phase);

  return {
    legSwing: phaseAmount * LEG_SWING_AMPLITUDE,
    armSwing: -phaseAmount * ARM_SWING_AMPLITUDE,
    bobAmount: Math.abs(phaseAmount) * BOB_AMPLITUDE,
    state: { distanceTraveled },
  };
}

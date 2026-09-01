import { BLOCKED_PROGRESS_RATIO } from "./npc-avoidance";

export interface WalkCycleState {
  /** Total metres travelled since the cycle started (the phase source). */
  distanceTraveled: number;
  /** 0..1 gait amplitude: 1 while moving, easing to 0 while blocked. */
  amplitude: number;
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
// C-45 amendment (l)(3): real human walking is ~0.9 Hz per full
// gait cycle, not 4 Hz. Drop the rate, halve the swing and bob
// so the NPCs read as walking instead of "broken robots".
export const GAIT_HZ_AT_DEFAULT = 1.6;
export const LEG_SWING_AMPLITUDE = 0.3;
export const ARM_SWING_AMPLITUDE = 0.18;
export const BOB_AMPLITUDE = 0.025;
export const RADIANS_PER_METRE = (
  2 * Math.PI * GAIT_HZ_AT_DEFAULT / DEFAULT_WALK_SPEED_MPS
);
// C-48: how fast the gait amplitude ramps (per second) between the
// walking pose and the blocked "standing still" pose. ~0.17 s for a
// full ramp: fast enough to stop the in-place march within a few
// frames of getting stuck, slow enough not to look like a switch.
export const GAIT_AMPLITUDE_RATE = 6;

/**
 * C-48: the phase advances by `progressMetres` - the distance the NPC
 * ACTUALLY moved this frame, as measured by the controller - never by
 * raw time. A blocked NPC therefore freezes mid-gait instead of
 * marching in place, and the amplitude eases all three outputs toward
 * zero so it visibly stands still (no more "jumping while talking").
 */
export function updateWalkCycle(
  state: WalkCycleState,
  dt: number,
  speed: number,
  progressMetres: number,
): WalkCycleOutput {
  const safeDistance = Number.isFinite(state.distanceTraveled)
    ? state.distanceTraveled
    : 0;
  const safeAmplitude = Number.isFinite(state.amplitude)
    ? Math.max(0, Math.min(1, state.amplitude))
    : 1;
  const safeDt = Number.isFinite(dt) && dt > 0 ? dt : 0;
  const pose = (distanceTraveled: number, amplitude: number): WalkCycleOutput => {
    const phaseAmount = Math.sin(distanceTraveled * RADIANS_PER_METRE);
    return {
      legSwing: phaseAmount * LEG_SWING_AMPLITUDE * amplitude,
      armSwing: -phaseAmount * ARM_SWING_AMPLITUDE * amplitude,
      bobAmount: Math.abs(phaseAmount) * BOB_AMPLITUDE * amplitude,
      state: { distanceTraveled, amplitude },
    };
  };
  // An invalid dt is a caller bug: freeze entirely (the historical
  // contract) rather than half-advancing on untrusted time.
  if (safeDt === 0) return pose(safeDistance, safeAmplitude);
  const safeSpeed = Number.isFinite(speed) && speed > 0 ? speed : 0;
  const progress = Number.isFinite(progressMetres) ? Math.max(0, progressMetres) : 0;
  const distanceTraveled = safeDistance + progress;
  const expected = safeSpeed * safeDt;
  const moving = expected > 0 && progress >= expected * BLOCKED_PROGRESS_RATIO;
  const target = moving ? 1 : 0;
  const rate = GAIT_AMPLITUDE_RATE * safeDt;
  const amplitude = safeAmplitude + Math.max(-rate, Math.min(rate, target - safeAmplitude));
  return pose(distanceTraveled, amplitude);
}

/**
 * NPC face-toward-player rotation helper (Phase 3.5).
 *
 * When a player starts talking to an NPC, the NPC's `Object3D`
 * smoothly rotates its yaw to face the player. The rotation
 * completes BEFORE the dialogue overlay appears. After the dialogue
 * closes, the NPC smoothly returns to the `face` value from the
 * schedule.
 *
 * This module is pure: it computes the target yaw given the NPC's
 * position and the player's position. The animation is driven from
 * `main.ts:openDialogueWith` (and the corresponding close), which
 * gradually interpolates `Object3D.rotation.y` from the current yaw
 * to the target yaw over a 250 ms ease-out interval.
 *
 * The convention matches `src/engine/controls.ts`: yaw=0 means
 * facing -Z (the player's "north" at spawn), yaw=π/2 means facing
 * -X (west), yaw=π means facing +Z (south, toward the door), and
 * yaw=-π/2 means facing +X (east).
 *
 * Why the sign inversion on dx: a body whose rotation.y is θ has
 * its forward vector equal to (-sin θ, 0, -cos θ). For the body to
 * point at a target at relative position (dx, dz), we need
 * -sin θ = dx / r  and  -cos θ = dz / r. So θ = atan2(-dx, -dz).
 */

/**
 * Compute the yaw (radians) the NPC should hold so its body
 * forward points at `target` from `from`. The result is in
 * [-π, π].
 */
export function yawToFace(
  from: { x: number; z: number },
  target: { x: number; z: number },
): number {
  const dx = target.x - from.x;
  const dz = target.z - from.z;
  // Degenerate: same point. Return 0 (preserve the existing yaw).
  if (dx === 0 && dz === 0) return 0;
  // atan2 returns a value in (-π, π]. atan2(-0, -5) is -π (a
  // negative number). When the result is -π exactly, the helper
  // would normally return +π so callers get a value in (-π, π]
  // that the player can rotate the body through without
  // wrapping. THREE.js rotation.y is internally a single float
  // anyway; -π and +π are the same orientation, but the test
  // (and visual easing) prefer the positive value.
  const y = Math.atan2(-dx, -dz);
  return y === -Math.PI ? Math.PI : y;
}

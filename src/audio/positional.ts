/**
 * Positional audio core (WS10, C-77) — PURE geometry, no three.js.
 *
 * Lucas: the photocopier sound is "strange and way too loud". It must be
 * background-level overall, louder when the source is closer and in front
 * of the listener, quiet in a separate room. This module owns the exact
 * gain math; `positional-three.ts` applies it to the existing SfxBus.
 *
 * ## The exact formulas
 *
 * finalGain = clamp01(base * distanceFactor * roomFactor * facingFactor)
 *
 * 1. distanceFactor(d), piecewise linear on distance d (metres):
 *      d <= 3                -> 1.0                      (at the machine)
 *      3 < d <= 15           -> 1.0 - 0.75 * (d - 3)/12  (1.0 -> 0.25)
 *      15 < d <= 30          -> 0.25 - 0.20 * (d - 15)/15(0.25 -> 0.05)
 *      d > 30                -> 0.05                     (floor)
 *    Monotonically decreasing; 0.05 floor keeps the copier faintly
 *    present office-wide instead of popping in and out of audibility.
 *
 * 2. roomFactor (sameRoom resolved by the caller via sameRoomFor):
 *      same room   -> 1.0
 *      other room  -> 0.25   (the walls muffle it)
 *
 * 3. facingFactor(a), a = angle between the listener's forward vector and
 *    the direction to the source (0 = dead ahead, PI = directly behind),
 *    using the controls.ts yaw convention (yaw=0 faces -Z,
 *    forward = (-sin yaw, -cos yaw)):
 *      a <= PI/3   (front hemisphere) -> 1.0
 *      a <= 2*PI/3 (side)             -> 0.8
 *      a >  2*PI/3 (behind)           -> 0.6
 *    Subtle on purpose — not disorienting.
 *
 * Defaults: base = 0.35, so the copier peaks at 0.35 next to it and is
 * ~0.20 at 10 m, ~0.09 at 15 m, ~0.02 in another room across the office —
 * background everywhere except near it. Max possible gain is clamped to 1.
 *
 * Room RESOLUTION (which room a coordinate is in) belongs to the caller —
 * the engine knows WORLD_ROOMS (`roomAt` in src/engine/chatter.ts). This
 * module only compares room ids.
 */

export interface Vec2 {
  x: number;
  z: number;
}

export interface ListenerState {
  x: number;
  z: number;
  /** Yaw in radians; 0 faces -Z (see src/engine/controls.ts). */
  facingRad: number;
}

export interface ComputeSoundGainArgs {
  listener: ListenerState;
  source: Vec2;
  /** True when both are in the same room (see sameRoomFor). */
  sameRoom: boolean;
  /** Overall loudness of the source. Default 0.35 = background-level. */
  base?: number;
}

export const DISTANCE_NEAR_M = 3;
export const DISTANCE_FAR_M = 15;
export const DISTANCE_FLOOR_M = 30;
export const MIN_DISTANCE_GAIN = 0.05;
export const CROSS_ROOM_FACTOR = 0.25;
export const FACING_SIDE_FACTOR = 0.8;
export const FACING_BEHIND_FACTOR = 0.6;
export const DEFAULT_BASE_GAIN = 0.35;

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

/** Piecewise-linear distance attenuation (see module docs). */
export function distanceFactor(d: number): number {
  const dist = Number.isFinite(d) ? Math.max(0, d) : 0;
  if (dist <= DISTANCE_NEAR_M) return 1;
  if (dist <= DISTANCE_FAR_M) {
    return 1 - (1 - 0.25) * ((dist - DISTANCE_NEAR_M) / (DISTANCE_FAR_M - DISTANCE_NEAR_M));
  }
  if (dist <= DISTANCE_FLOOR_M) {
    // Max() guards float rounding just before the knot (0.05 - 1e-17).
    return Math.max(
      MIN_DISTANCE_GAIN,
      0.25 - (0.25 - MIN_DISTANCE_GAIN) * ((dist - DISTANCE_FAR_M) / (DISTANCE_FLOOR_M - DISTANCE_FAR_M)),
    );
  }
  return MIN_DISTANCE_GAIN;
}

/** Same-room vs cross-room muffle. Unknown rooms never mute a sound. */
export function sameRoomFor(listenerRoom: string | null, sourceRoom: string | null): boolean {
  if (listenerRoom === null || sourceRoom === null) return true;
  return listenerRoom === sourceRoom;
}

/** Facing factor from the angle off the listener's nose (see module docs). */
export function facingFactor(angleRad: number): number {
  const a = Math.abs(angleRad);
  if (a <= Math.PI / 3) return 1;
  if (a <= (2 * Math.PI) / 3) return FACING_SIDE_FACTOR;
  return FACING_BEHIND_FACTOR;
}

/**
 * Angle between the listener's forward vector and the direction to the
 * source, in [0, PI]. 0 = dead ahead, PI/2 = to the side, PI = behind.
 * A co-located source (zero-length direction) is treated as dead ahead.
 */
export function angleOffNose(listener: ListenerState, source: Vec2): number {
  const dx = source.x - listener.x;
  const dz = source.z - listener.z;
  const len = Math.hypot(dx, dz);
  if (len === 0) return 0;
  // controls.ts: forward = (-sin(yaw), -cos(yaw)).
  const fx = -Math.sin(listener.facingRad);
  const fz = -Math.cos(listener.facingRad);
  const cos = (fx * dx + fz * dz) / len;
  return Math.acos(Math.max(-1, Math.min(1, cos)));
}

/** The complete positional gain in [0, 1] (see module docs). */
export function computeSoundGain({ listener, source, sameRoom, base = DEFAULT_BASE_GAIN }: ComputeSoundGainArgs): number {
  const dx = source.x - listener.x;
  const dz = source.z - listener.z;
  const d = Math.hypot(dx, dz);
  return clamp01(base * distanceFactor(d) * (sameRoom ? 1 : CROSS_ROOM_FACTOR) * facingFactor(angleOffNose(listener, source)));
}

// ── Sound-source registry ────────────────────────────────────────────
// Future sources (coffee machine, robots, …) plug in here; the adapter
// in positional-three.ts resolves positions through it at play time.

export interface SoundSourceDef {
  /** Current world position of the sound emitter (re-read per play). */
  getPos: () => Vec2;
  /** Room id the emitter lives in (caller resolves geometry). */
  getRoom?: () => string | null;
}

const sources = new Map<string, SoundSourceDef>();

export function registerSoundSource(id: string, def: SoundSourceDef): void {
  sources.set(id, def);
}

export function getSoundSource(id: string): SoundSourceDef | undefined {
  return sources.get(id);
}

export function unregisterSoundSource(id: string): void {
  sources.delete(id);
}

/** Test isolation only. */
export function clearSoundSources(): void {
  sources.clear();
}

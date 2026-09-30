/**
 * WS10 (C-77): pure positional-audio gain formulas.
 *
 * Lucas: the photocopier sound is "strange and way too loud" — it must be
 * background-level overall, louder when the source is closer and in front of
 * the listener, quiet in a separate room. These tests pin the exact gain
 * curve so "background everywhere except near it" is guaranteed by math,
 * not by hope. No three.js import: this module is geometry-only.
 */

import { afterEach, describe, expect, it } from "vitest";
import {
  clearSoundSources,
  computeSoundGain,
  getSoundSource,
  MIN_DISTANCE_GAIN,
  registerSoundSource,
  sameRoomFor,
  unregisterSoundSource,
  type ComputeSoundGainArgs,
} from "../../../src/audio/positional";

const LISTENER_AT_ORIGIN_FACING_NEG_Z = { x: 0, z: 0, facingRad: 0 };

/** Run computeSoundGain with the default base (0.35), same room. */
function gain(args: Partial<ComputeSoundGainArgs> = {}): number {
  return computeSoundGain({
    listener: LISTENER_AT_ORIGIN_FACING_NEG_Z,
    source: { x: 0, z: -5 },
    sameRoom: true,
    ...args,
  });
}

/** The pure distance-attenuation factor, isolated via base=1 and perfect factors. */
function distanceFactor(d: number): number {
  // Facing -Z, source straight ahead at distance d, same room, base 1.
  return computeSoundGain({
    listener: LISTENER_AT_ORIGIN_FACING_NEG_Z,
    source: { x: 0, z: -d },
    sameRoom: true,
    base: 1,
  });
}

describe("computeSoundGain — distance attenuation", () => {
  it("is full gain at or under 3 m", () => {
    expect(distanceFactor(0)).toBe(1);
    expect(distanceFactor(3)).toBe(1);
  });

  it("is ~0.25 at 15 m", () => {
    expect(distanceFactor(15)).toBeCloseTo(0.25, 5);
  });

  it("floors at 0.05 beyond 30 m", () => {
    expect(distanceFactor(30)).toBeCloseTo(0.05, 5);
    expect(distanceFactor(50)).toBeCloseTo(0.05, 5);
    expect(distanceFactor(500)).toBeCloseTo(0.05, 5);
  });

  it("decreases monotonically from 0 to 60 m", () => {
    let previous = distanceFactor(0);
    for (let i = 1; i <= 120; i++) {
      const d = i * 0.5; // integer steps: no accumulation drift at knots
      const current = distanceFactor(d);
      expect(current).toBeLessThanOrEqual(previous);
      // 1e-9: float rounding of the linear interpolation at the knot.
      expect(current).toBeGreaterThanOrEqual(MIN_DISTANCE_GAIN - 1e-9);
      previous = current;
    }
  });
});

describe("computeSoundGain — same-room factor", () => {
  it("muffles a different room to 0.25x of the same-room gain", () => {
    const args: ComputeSoundGainArgs = {
      listener: LISTENER_AT_ORIGIN_FACING_NEG_Z,
      source: { x: 3, z: -6 },
      sameRoom: true,
    };
    const same = computeSoundGain(args);
    const cross = computeSoundGain({ ...args, sameRoom: false });
    expect(cross).toBeCloseTo(same * 0.25, 5);
  });

  it("keeps the muffle even right at a wall between rooms", () => {
    // 1 m away but in another room: heavily attenuated, not blaring.
    const cross = gain({ source: { x: 0, z: -1 }, sameRoom: false });
    expect(cross).toBeLessThan(0.12);
  });
});

describe("computeSoundGain — facing factor", () => {
  // Yaw convention (src/engine/controls.ts): yaw=0 faces -Z,
  // forward = (-sin yaw, -cos yaw).
  const front = gain({ source: { x: 0, z: -5 } }); // straight ahead
  const side = gain({ source: { x: 5, z: 0 } }); // 90 deg off the nose
  const behind = gain({ source: { x: 0, z: 5 } }); // directly behind

  it("gives full gain for a source in the front hemisphere", () => {
    expect(front).toBeGreaterThan(side);
    // front factor is exactly 1.0: gain = base * dist(5m)
    expect(front).toBeCloseTo(0.35 * (1 - (0.75 * (5 - 3)) / 12), 5);
  });

  it("scales a source on the side by 0.8", () => {
    expect(side).toBeCloseTo(front * 0.8, 5);
  });

  it("scales a source behind the listener by 0.6", () => {
    expect(behind).toBeCloseTo(front * 0.6, 5);
    expect(behind).toBeLessThan(side);
  });

  it("honors arbitrary yaw, not just 0", () => {
    // Listener facing +Z (yaw = PI); a source at -Z is now BEHIND.
    const facingAway = computeSoundGain({
      listener: { x: 0, z: 0, facingRad: Math.PI },
      source: { x: 0, z: -5 },
      sameRoom: true,
    });
    expect(facingAway).toBeCloseTo(behind, 5);
    // Facing +X (yaw = -PI/2): a source at +X is dead ahead.
    const facingEast = computeSoundGain({
      listener: { x: 0, z: 0, facingRad: -Math.PI / 2 },
      source: { x: 5, z: 0 },
      sameRoom: true,
    });
    expect(facingEast).toBeCloseTo(front, 5);
  });

  it("treats a source at the listener position as full facing", () => {
    const coLocated = computeSoundGain({
      listener: LISTENER_AT_ORIGIN_FACING_NEG_Z,
      source: { x: 0, z: 0 },
      sameRoom: true,
      base: 1,
    });
    expect(coLocated).toBe(1);
  });
});

describe("computeSoundGain — clamping", () => {
  it("clamps to [0, 1] with an oversized base", () => {
    expect(gain({ base: 5 })).toBeLessThanOrEqual(1);
    expect(gain({ source: { x: 0, z: 0 }, base: 5 })).toBe(1);
  });

  it("clamps to 0 with a zero base and never goes negative", () => {
    expect(gain({ base: 0 })).toBe(0);
    expect(gain({ base: -1 })).toBeGreaterThanOrEqual(0);
  });
});

describe("computeSoundGain — background everywhere (C-77)", () => {
  it("is below 0.3 beyond 10 m even same-room and dead ahead", () => {
    for (const d of [10, 12, 15, 20, 30]) {
      const g = gain({ source: { x: 0, z: -d } });
      expect(g).toBeLessThan(0.3);
    }
  });

  it("is quiet in a separate room at ANY distance", () => {
    for (const d of [1, 3, 5, 10, 20]) {
      const g = gain({ source: { x: 0, z: -d }, sameRoom: false });
      expect(g).toBeLessThan(0.1);
    }
  });

  it("is clearly above background right next to the source", () => {
    const near = gain({ source: { x: 0, z: -2 } });
    const far = gain({ source: { x: 0, z: -12 } });
    expect(near).toBeGreaterThan(0.3);
    expect(near).toBeGreaterThan(far * 2);
  });
});

describe("sameRoomFor", () => {
  it("matches equal room ids and rejects different ones", () => {
    expect(sameRoomFor("reception", "reception")).toBe(true);
    expect(sameRoomFor("reception", "kitchen")).toBe(false);
  });

  it("treats missing room metadata as same-room (never mute an existing sound)", () => {
    expect(sameRoomFor(null, null)).toBe(true);
    expect(sameRoomFor("reception", null)).toBe(true);
    expect(sameRoomFor(null, "kitchen")).toBe(true);
  });
});

describe("sound-source registry", () => {
  afterEach(() => {
    clearSoundSources();
  });

  it("registers, resolves and unregisters sources by id", () => {
    expect(getSoundSource("photocopier")).toBeUndefined();
    registerSoundSource("photocopier", { getPos: () => ({ x: 5.15, z: 16.75 }) });
    const def = getSoundSource("photocopier");
    expect(def).toBeDefined();
    expect(def?.getPos()).toEqual({ x: 5.15, z: 16.75 });
    unregisterSoundSource("photocopier");
    expect(getSoundSource("photocopier")).toBeUndefined();
  });

  it("re-evaluates the position getter on every read (moving sources)", () => {
    let x = 1;
    registerSoundSource("robot", { getPos: () => ({ x, z: 0 }) });
    expect(getSoundSource("robot")?.getPos().x).toBe(1);
    x = 9;
    expect(getSoundSource("robot")?.getPos().x).toBe(9);
  });

  it("carries an optional room getter for the adapter", () => {
    registerSoundSource("photocopier", {
      getPos: () => ({ x: 5.15, z: 16.75 }),
      getRoom: () => "reception",
    });
    expect(getSoundSource("photocopier")?.getRoom?.()).toBe("reception");
  });
});

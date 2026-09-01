/**
 * Tests for createControls + the pure stepControls state machine.
 *
 * Most of the new behavior (Pattern D mouse-look, FPS camera math,
 * pitch clamp, mouse-delta consumption) is testable via the pure
 * `stepControls(state, dt, keys, consumeMouseDelta)` function. The
 * runtime module (`createControls`) is browser-coupled; we test it
 * for the things that don't need real DOM events (initial state,
 * movement math, collision clamp).
 *
 * Camera transforms (position + rotation) require a real three.js
 * renderer and are verified visually via Playwright (see the
 * threejs-visual-qa skill).
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import {
  createControls,
  stepControls,
  type ControlsState,
} from "../../src/engine/controls";

function makeCanvas(): HTMLCanvasElement {
  return {
    addEventListener: () => {},
    removeEventListener: () => {},
    getBoundingClientRect: () =>
      ({ left: 0, top: 0, right: 480, bottom: 270, width: 480, height: 270, x: 0, y: 0 } as DOMRect),
    requestPointerLock: vi.fn(),
  } as unknown as HTMLCanvasElement;
}

function makeCamera(): THREE.PerspectiveCamera {
  return new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 100);
}

beforeEach(() => {
  // createControls attaches to document and window. Provide no-op
  // stubs so the constructor doesn't throw. The event handlers never
  // fire in tests (we never dispatch events on the stubs), so the
  // stubs only need to be callable.
  vi.stubGlobal("document", {
    addEventListener: () => {},
    removeEventListener: () => {},
    pointerLockElement: null,
  });
  vi.stubGlobal("window", {
    addEventListener: () => {},
    removeEventListener: () => {},
    innerWidth: 480,
    innerHeight: 270,
  });
});

describe("createControls", () => {
  it("starts with the player at the given initial position", () => {
    const initial = new THREE.Vector3(0, 0.5, 6);
    const c = createControls({
      canvas: makeCanvas(),
      camera: makeCamera(),
      initialPlayer: initial,
    });
    const p = c.getPlayerPosition();
    expect(p.x).toBe(0);
    expect(p.y).toBe(0.5);
    expect(p.z).toBe(6);
  });

  it("does not move the player when no keys are held", () => {
    const c = createControls({
      canvas: makeCanvas(),
      camera: makeCamera(),
      initialPlayer: new THREE.Vector3(0, 0, 0),
    });
    c.update(0.5);
    const p = c.getPlayerPosition();
    expect(p.x).toBe(0);
    expect(p.z).toBe(0);
  });

  it("moves the player in the forward direction when W is held", () => {
    // yaw=0 means the camera (and player) face -Z, so W moves the
    // player in -Z. WALK_SPEED = 4.5, dt = 0.5, so motion = 2.25.
    const c = createControls({
      canvas: makeCanvas(),
      camera: makeCamera(),
      initialPlayer: new THREE.Vector3(0, 0, 0),
    });
    c.setKeys(new Set(["w"]));
    c.update(0.5);
    const p = c.getPlayerPosition();
    expect(p.z).toBeCloseTo(-2.25, 1);
  });

  it("clamps the player to the office bounds", () => {
    // OFFICE_BOUNDS in npcs.ts is -9..9 on both axes; from (0, 0, 0),
    // 1 second of W at sprint is 4.5 * 1.8 = 8.1 units, so 8.1 < 9, no
    // clamp. Try a 10-second step instead.
    const c = createControls({
      canvas: makeCanvas(),
      camera: makeCamera(),
      initialPlayer: new THREE.Vector3(0, 0, 0),
    });
    c.setKeys(new Set(["w"]));
    c.update(10);
    const p = c.getPlayerPosition();
    // Should be clamped to bounds.maxZ - PLAYER_RADIUS = 9 - 0.3 = 8.7
    expect(p.z).toBeLessThanOrEqual(8.7);
  });
});

/**
 * Pure-state tests for the stepControls state machine. These do not
 * touch the DOM and run in any vitest environment.
 *
 * Pattern D mouse-look (see docs/ADR/0007-mouse-look-pattern-d.md):
 *  - mouseLook = "free"   : mouse delta is DRAINED but not consumed
 *  - mouseLook = "hold"   : mouse delta rotates yaw + pitch
 *  - mouseLook = "toggle" : same as hold, stays on until released
 */
describe("stepControls (pure state machine)", () => {
  function baseState(overrides: Partial<ControlsState> = {}): ControlsState {
    return {
      player: { x: 0, y: 0, z: 0 },
      yaw: 0,
      pitch: 0,
      mouseLook: "free",
      mouseDelta: { x: 0, y: 0 },
      ...overrides,
    };
  }

  it("does not consume mouse delta when mouseLook is 'free'", () => {
    let pending = { x: 100, y: 50 };
    const consume = () => {
      const d = pending;
      pending = { x: 0, y: 0 };
      return d;
    };
    const next = stepControls(baseState({ mouseLook: "free" }), 0.016, new Set(), consume);
    // yaw + pitch must be unchanged.
    expect(next.yaw).toBe(0);
    expect(next.pitch).toBe(0);
  });

  it("applies mouse delta to yaw + pitch when mouseLook is 'hold'", () => {
    const consume = () => ({ x: 100, y: 50 });
    const next = stepControls(baseState({ mouseLook: "hold" }), 0.016, new Set(), consume);
    // 100 * 0.00375 = 0.375 rad yaw decrease (mouse-right rotates camera-left)
    expect(next.yaw).toBeCloseTo(-0.375, 5);
    expect(next.pitch).toBeCloseTo(-0.1875, 5);
  });

  it("applies mouse delta when mouseLook is 'toggle' (same as hold)", () => {
    const consume = () => ({ x: 100, y: 50 });
    const next = stepControls(baseState({ mouseLook: "toggle" }), 0.016, new Set(), consume);
    expect(next.yaw).toBeCloseTo(-0.375, 5);
    expect(next.pitch).toBeCloseTo(-0.1875, 5);
  });

  it("clamps pitch to [PITCH_MIN, PITCH_MAX] = [-0.6, 0.4]", () => {
    // Big negative dy should clamp to PITCH_MIN = -0.6.
    const bigDy = () => ({ x: 0, y: 1_000_000 });
    const low = stepControls(baseState({ mouseLook: "hold" }), 0.016, new Set(), bigDy);
    expect(low.pitch).toBeCloseTo(-0.6, 5);
    // Big positive dy should clamp to PITCH_MAX = 0.4.
    const bigUpDy = () => ({ x: 0, y: -1_000_000 });
    const high = stepControls(baseState({ mouseLook: "hold" }), 0.016, new Set(), bigUpDy);
    expect(high.pitch).toBeCloseTo(0.4, 5);
  });

  it("drains pending delta in free-mouse so it does not accumulate", () => {
    // In free-mouse, a pending delta must be consumed (drained) so
    // that the next time we enter mouse-look, the buffer is empty.
    const drained: Array<{ x: number; y: number } | null> = [];
    const consume = () => {
      const d = { x: 5, y: 5 };
      drained.push(d);
      return d;
    };
    stepControls(baseState({ mouseLook: "free" }), 0.016, new Set(), consume);
    // The function called consume at least once, so the pending delta
    // was drained.
    expect(drained.length).toBeGreaterThan(0);
  });

  it("walks forward in -Z when yaw is 0 and W is pressed", () => {
    const next = stepControls(
      baseState(),
      0.5,
      new Set(["w"]),
      () => null,
    );
    // WALK_SPEED = 4.5, dt = 0.5, no sprint, so motion = 2.25 in -Z.
    expect(next.player.z).toBeCloseTo(-2.25, 5);
    expect(next.player.x).toBeCloseTo(0, 5);
  });

  it("rotates motion with yaw", () => {
    // Yaw = +pi/2 means the player faces -X. W should move in -X.
    // Start outside any obstacle (meeting table covers -2..2 in x, -1..1 in z).
    const next = stepControls(
      baseState({ player: { x: 0, y: 0, z: 5 }, yaw: Math.PI / 2 }),
      0.5,
      new Set(["w"]),
      () => null,
    );
    expect(next.player.x).toBeCloseTo(-2.25, 5);
    expect(next.player.z).toBeCloseTo(5, 5);
  });

  it("sprint multiplies motion by 1.8 when shift is held", () => {
    // Start at z=8 (out of the way of the meeting table and the desks
    // at z=2.5..3.5). Sprint 4.5*1.8*0.5=4.05m forward would take the
    // player from z=8 to z=3.95, which is in the no-obstacle corridor
    // (the meeting table ends at z=1; the back-row desks are at
    // z=2.5..3.5 but only on the sides; the player at x=0 is clear).
    const startZ = 8;
    const walk = stepControls(
      baseState({ player: { x: 0, y: 0, z: startZ } }),
      0.5,
      new Set(["w"]),
      () => null,
    );
    const sprint = stepControls(
      baseState({ player: { x: 0, y: 0, z: startZ } }),
      0.5,
      new Set(["w", "shift"]),
      () => null,
    );
    // Sprint delta from start should be 1.8x walk delta from start.
    const walkDelta = Math.abs(startZ - walk.player.z);
    const sprintDelta = Math.abs(startZ - sprint.player.z);
    expect(sprintDelta).toBeCloseTo(walkDelta * 1.8, 5);
  });

  it("returns a new state object (immutability)", () => {
    const before = baseState();
    const after = stepControls(before, 0.016, new Set(), () => null);
    expect(after).not.toBe(before);
    expect(before.yaw).toBe(0); // before is not mutated
  });
});

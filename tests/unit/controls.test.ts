/**
 * Smoke tests for createControls.
 *
 * The controls module is browser-coupled (addEventListener, document,
 * window). We stub those globals in beforeEach so the module can load
 * under node. Anything that genuinely needs the DOM (pointer lock,
 * pointermove) returns gracefully when those globals are stubs.
 *
 * These tests cover the pure-data side of the controls surface:
 * - initial state (player position from initialPlayer)
 * - movement math (forward = -Z when yaw is 0)
 * - collision clamp (player cannot exit OFFICE_BOUNDS)
 *
 * Camera math (per-frame position / lookAt) and FOV are NOT tested
 * here. They require a real three.js renderer and are verified
 * visually via Playwright (see threejs-visual-qa skill). Phase 2 will
 * convert the camera mode to FPS (C-01) and add `getYaw` + FOV
 * setters; this test will be extended then.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { createControls } from "../../src/engine/controls";

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
    // player in -Z. WALK_SPEED = 3, dt = 0.5, so motion = 1.5.
    const c = createControls({
      canvas: makeCanvas(),
      camera: makeCamera(),
      initialPlayer: new THREE.Vector3(0, 0, 0),
    });
    c.setKeys(new Set(["w"]));
    c.update(0.5);
    const p = c.getPlayerPosition();
    expect(p.z).toBeCloseTo(-1.5, 1);
  });

  it("clamps the player to the office bounds", () => {
    // OFFICE_BOUNDS in npcs.ts is -9..9 on both axes; from (0, 0, 0),
    // 1 second of W at sprint is 3 * 1.6 = 4.8 units, so 4.8 < 9, no
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

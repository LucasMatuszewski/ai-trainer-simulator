// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { createControls, type Controls } from "../../src/engine/controls";

// Simulate a browser animation frame. Returns a promise that
// resolves when requestAnimationFrame callbacks have run.
function tickFrame(): Promise<void> {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      // Chain a second frame so any deferred-release callbacks
      // queued by the previous frame get a chance to run.
      requestAnimationFrame(() => resolve());
    });
  });
}

describe("createControls browser events", () => {
  let canvas: HTMLCanvasElement;
  let controls: Controls;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    document.body.append(canvas);
    controls = createControls({
      canvas,
      camera: new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 100),
      initialPlayer: new THREE.Vector3(0, 0.5, 6),
    });
  });

  afterEach(() => {
    controls.destroy();
    canvas.remove();
    vi.restoreAllMocks();
  });

  function keyboard(type: "keydown" | "keyup", code: string, key: string, repeat = false): void {
    window.dispatchEvent(new KeyboardEvent(type, { bubbles: true, code, key, repeat }));
  }

  it("moves forward while W is held and stops after W is released", () => {
    const start = controls.getPlayerPosition();
    keyboard("keydown", "KeyW", "w");
    controls.update(0.25);
    const moving = controls.getPlayerPosition();
    expect(moving.z).toBeLessThan(start.z);

    keyboard("keyup", "KeyW", "w");
    controls.update(0.25);
    expect(controls.getPlayerPosition().z).toBeCloseTo(moving.z, 8);
  });

  it("keeps S held when W is released", () => {
    keyboard("keydown", "KeyW", "w");
    keyboard("keydown", "KeyS", "s");
    keyboard("keyup", "KeyW", "w");
    const before = controls.getPlayerPosition();
    controls.update(0.25);
    expect(controls.getPlayerPosition().z).toBeGreaterThan(before.z);
  });

  it("stops after one keyup following repeated W keydowns", () => {
    for (let index = 0; index < 30; index += 1) {
      keyboard("keydown", "KeyW", "w", index > 0);
    }
    controls.update(0.1);
    keyboard("keyup", "KeyW", "w");
    const releasedAt = controls.getPlayerPosition();
    controls.update(0.25);
    expect(controls.getPlayerPosition().z).toBeCloseTo(releasedAt.z, 8);
  });

  it("clears held movement when the window blurs", () => {
    keyboard("keydown", "KeyW", "w");
    controls.update(0.1);
    window.dispatchEvent(new Event("blur"));
    const blurredAt = controls.getPlayerPosition();
    controls.update(0.25);
    expect(controls.getPlayerPosition().z).toBeCloseTo(blurredAt.z, 8);
  });

  it("clears held movement when the document becomes hidden", () => {
    keyboard("keydown", "KeyW", "w");
    controls.update(0.1);
    vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    document.dispatchEvent(new Event("visibilitychange"));
    const hiddenAt = controls.getPlayerPosition();
    controls.update(0.25);
    expect(controls.getPlayerPosition().z).toBeCloseTo(hiddenAt.z, 8);
  });

  it("toggles mouse-look with Space", () => {
    keyboard("keydown", "Space", " ");
    expect(controls.isMouseLookActive()).toBe(true);
    keyboard("keydown", "Space", " ");
    expect(controls.isMouseLookActive()).toBe(false);
  });

  it("holds mouse-look with RMB and releases on mouseup or mouseleave", () => {
    canvas.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, button: 2 }));
    expect(controls.isMouseLookActive()).toBe(true);
    canvas.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, button: 2 }));
    expect(controls.isMouseLookActive()).toBe(false);

    canvas.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, button: 2 }));
    expect(controls.isMouseLookActive()).toBe(true);
    canvas.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    expect(controls.isMouseLookActive()).toBe(false);
  });

  // Lucas's runtime (a Playwright-launched Chromium that forwards
  // keyboard events to the page) supplies code-less events whose
  // reported `key` is unreliable: every keyup arrives with
  // `key: 'w'` regardless of which key the user released. This
  // test reproduces the exact symptom from Lucas's console log:
  // a quick W-A-D-S sequence fires keydown + keyup in the same
  // browser tick, the frame loop never observes the held key, and
  // the user sees "Nothing moved."
  it("reproduces Lucas's symptom: code-less WASD releases in same tick", async () => {
    const moves: Array<{ key: string; deltaX: number; deltaZ: number }> = [];

    async function pressAndMeasure(key: string) {
      const start = controls.getPlayerPosition();
      keyboard("keydown", "", key);
      keyboard("keyup", "", key);
      // The production frame loop calls controls.update(dt) BEFORE
      // the deferred-release rAF fires (rAF runs after the next
      // paint). So in this test we call update() between the
      // event dispatch and the rAF tick.
      controls.update(0.25);
      // Now tick a frame to run the deferred release.
      await tickFrame();
      const after = controls.getPlayerPosition();
      moves.push({
        key,
        deltaX: after.x - start.x,
        deltaZ: after.z - start.z,
      });
    }

    await pressAndMeasure("d");
    await pressAndMeasure("a");
    await pressAndMeasure("s");
    await pressAndMeasure("w");

    // Each press should have moved the player in the expected
    // direction by approximately WALK_SPEED * small_dt, since
    // the keydown and keyup arrived in the same tick and the
    // deferred-release logic should have kept the key in the Set
    // for at least one frame.
    expect(moves[0]?.deltaX, "D should move +X").toBeGreaterThan(0);
    expect(moves[1]?.deltaX, "A should move -X").toBeLessThan(0);
    expect(moves[2]?.deltaZ, "S should move +Z").toBeGreaterThan(0);
    expect(moves[3]?.deltaZ, "W should move -Z").toBeLessThan(0);

    // Final resting position: the deferred release should have
    // cleared all four keys by now.
    const final = controls.getPlayerPosition();
    // Player should have moved a net ~0 in each axis because the
    // four movements cancel out. The deferred-release logic should
    // also have ensured no key is still held.
    expect(Math.abs(final.x - 0)).toBeLessThan(0.1);
    expect(Math.abs(final.z - 6)).toBeLessThan(0.1);
  });
});

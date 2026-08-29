// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { createControls, type Controls } from "../../src/engine/controls";

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
});

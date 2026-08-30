import { describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { createInitialIdleState, updateIdle, type IdleState } from "../../src/engine/npc-idle";

function npcMesh(): THREE.Group {
  const mesh = new THREE.Group();
  const head = new THREE.Object3D();
  head.name = "head";
  head.position.y = 1.25;
  mesh.add(head);
  return mesh;
}

function state(overrides: Partial<IdleState> = {}): IdleState {
  return { nextTypeAt: 6, nextLookAt: 7, currentLookYaw: null, lookUntil: 0, ...overrides };
}

const position = { x: 0, y: 0, z: 0 };

describe("NPC idle animations", () => {
  it("initializes typing and looking inside their timing windows", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.5).mockReturnValueOnce(0.5);
    const initial = createInitialIdleState(20);
    expect(initial.nextTypeAt).toBe(26);
    expect(initial.nextLookAt).toBe(27.5);
    vi.restoreAllMocks();
  });

  it("counts down both pending animations", () => {
    const updated = updateIdle(state(), 1, position, 0, npcMesh(), 1, () => 0.5);
    expect(updated.nextTypeAt).toBe(5);
    expect(updated.nextLookAt).toBe(6);
  });

  it("starts a bounded head look when its timer elapses", () => {
    const mesh = npcMesh();
    const updated = updateIdle(state({ nextLookAt: 0.5 }), 1, position, 0, mesh, 1, () => 0.75);
    expect(updated.currentLookYaw).not.toBeNull();
    expect(Math.abs(updated.currentLookYaw!)).toBeLessThanOrEqual(Math.PI / 3);
    expect(mesh.getObjectByName("head")!.rotation.y).not.toBe(0);
  });

  it("returns the head to neutral after a look completes", () => {
    const mesh = npcMesh();
    const updated = updateIdle(
      state({ currentLookYaw: Math.PI / 6, lookUntil: 0.25, nextLookAt: 8 }),
      0.5,
      position,
      0,
      mesh,
      2,
      () => 0.5,
    );
    expect(updated.currentLookYaw).toBeNull();
    expect(mesh.getObjectByName("head")!.rotation.y).toBe(0);
  });

  it("bobs the head during typing and preserves its base height afterwards", () => {
    const mesh = npcMesh();
    let updated = updateIdle(state({ nextTypeAt: 0 }), 0.1, position, 0, mesh, 0.1, () => 0.5);
    updateIdle(updated, 0.025, position, 0, mesh, 0.125, () => 0.5);
    expect(mesh.getObjectByName("head")!.position.y).not.toBe(1.25);

    updated = updateIdle(updated, 2, position, 0, mesh, 2.125, () => 0.5);
    expect(mesh.getObjectByName("head")!.position.y).toBe(1.25);
  });

  it("is a no-op for meshes without named body parts", () => {
    const mesh = new THREE.Group();
    expect(() => updateIdle(state({ nextTypeAt: 0, nextLookAt: 0 }), 1, position, 0, mesh, 1, () => 0.5)).not.toThrow();
  });
});

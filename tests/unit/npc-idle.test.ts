import { describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import {
  GESTURE_INTERVAL_S,
  STRETCH_INTERVAL_S,
  createInitialIdleState,
  updateIdle,
  type IdleState,
} from "../../src/engine/npc-idle";

function npcMesh(): THREE.Group {
  const mesh = new THREE.Group();
  const head = new THREE.Object3D();
  head.name = "head";
  head.position.y = 1.25;
  mesh.add(head);
  // C-63: typing is an ARM pose now, so the stand-in mesh needs arms.
  for (const name of ["arm-left", "arm-right"]) {
    const arm = new THREE.Object3D();
    arm.name = name;
    arm.position.y = 0.95;
    mesh.add(arm);
  }
  return mesh;
}

function animatedDogMesh(): THREE.Group {
  const mesh = npcMesh();
  for (const name of ["body", "left-ear", "right-ear", "tail"]) {
    const part = new THREE.Object3D();
    part.name = name;
    mesh.add(part);
  }
  return mesh;
}

function state(overrides: Partial<IdleState> = {}): IdleState {
  return { nextTypeAt: 6, nextLookAt: 7, currentLookYaw: null, lookUntil: 0, ...overrides };
}

const position = { x: 0, y: 0, z: 0 };

describe("NPC idle animations", () => {
  it("initializes typing and looking inside their timing windows", () => {
    // C-63: the first typing burst is scheduled off TYPING_PAUSE_S
    // ([3, 7]), not off the old 4-8 s window, so a midpoint roll is
    // now +5 s rather than +6 s.
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const initial = createInitialIdleState(20);
    expect(initial.nextTypeAt).toBe(25);
    expect(initial.nextLookAt).toBe(27.5);
    expect(initial.nextStretchAt).toBe(20 + (STRETCH_INTERVAL_S[0] + STRETCH_INTERVAL_S[1]) / 2);
    expect(initial.nextGestureAt).toBe(20 + (GESTURE_INTERVAL_S[0] + GESTURE_INTERVAL_S[1]) / 2);
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
    // C-63: typing only runs AT THE DESK now (Lucas: "when npc is
    // working next to the desk (only then)"), and a burst is seconds
    // long rather than a sub-second twitch, so the "afterwards" check
    // has to step past the whole burst.
    const mesh = npcMesh();
    const atDesk = { atDesk: true };
    let updated = updateIdle(state({ nextTypeAt: 0 }), 0.1, position, 0, mesh, 0.1, () => 0.5, atDesk);
    for (let step = 0; step < 12; step += 1) {
      updated = updateIdle(updated, 0.05, position, 0, mesh, 0.15 + step * 0.05, () => 0.5, atDesk);
    }
    expect(mesh.getObjectByName("head")!.position.y).not.toBe(1.25);

    updated = updateIdle(updated, 10, position, 0, mesh, 12, () => 0.5, atDesk);
    expect(updated.typing!.left).toBe(0);
    expect(mesh.getObjectByName("head")!.position.y).toBe(1.25);
  });

  it("leaves the arms alone entirely when the NPC is not at a desk", () => {
    const mesh = npcMesh();
    let updated = state({ nextTypeAt: 0 });
    for (let step = 0; step < 40; step += 1) {
      updated = updateIdle(updated, 0.1, position, 0, mesh, step * 0.1, () => 0.5);
    }
    expect(mesh.getObjectByName("arm-left")!.rotation.x).toBe(0);
    expect(mesh.getObjectByName("arm-right")!.rotation.x).toBe(0);
  });

  it("is a no-op for meshes without named body parts", () => {
    const mesh = new THREE.Group();
    expect(() => updateIdle(state({ nextTypeAt: 0, nextLookAt: 0 }), 1, position, 0, mesh, 1, () => 0.5)).not.toThrow();
  });

  it("twitches ears and bounces the body on independent timers", () => {
    const mesh = animatedDogMesh();
    const updated = updateIdle(
      state({ nextEarTwitchAt: 0, nextBounceAt: 0 }),
      0.1,
      position,
      0,
      mesh,
      0.1,
      () => 0.5,
    );

    expect(mesh.getObjectByName("left-ear")!.rotation.z).not.toBe(0);
    expect(mesh.getObjectByName("right-ear")!.rotation.z).toBeLessThan(0);
    expect(mesh.getObjectByName("body")!.scale.y).toBeCloseTo(1.05);
    expect(updated.nextEarTwitchAt).toBeGreaterThan(0);
    expect(updated.nextBounceAt).toBeGreaterThan(0);
  });

  it("wags a dog's tail using its per-NPC animation phase", () => {
    const mesh = animatedDogMesh();
    updateIdle(state({ animationPhase: 1 }), 0.1, position, 0, mesh, 0.1, () => 0.5);
    expect(mesh.getObjectByName("tail")!.rotation.y).not.toBe(0);
  });
});

/**
 * C-63 desk poses (Lucas, 2026-09-02):
 *   "when npc is working next to the desk (only then) the keyboard
 *    typing animation, like arms extended forward and micro movements,
 *    not too fast."
 *   "streatching / extending arms and looking a little up, rarelly (if
 *    we can regulate how often animation happens)."
 *   "any other nice idea, aligned with the style of the game, IT/AI
 *    company, jokes, funny ???"
 *
 * The "only then" is the load-bearing word here: before C-63 the typing
 * bob played wherever an NPC stood, including in the toilet.
 */
import * as THREE from "three";
import { describe, expect, it } from "vitest";
import {
  DESK_GESTURES,
  GESTURE_INTERVAL_S,
  STRETCH_DURATION_S,
  STRETCH_INTERVAL_S,
  TYPING_ARM_PITCH,
  TYPING_BURST_S,
  createInitialIdleState,
  resetIdlePose,
  updateIdle,
  type IdleState,
} from "../../src/engine/npc-idle";
import { ARM_TOTAL_LENGTH, SHOULDER_Y, createNpcMesh } from "../../src/engine/npc-mesh";

const position = { x: 0, y: 0, z: 0 };

function human(): THREE.Group {
  return createNpcMesh("male", 0, "bartek");
}

function base(overrides: Partial<IdleState> = {}): IdleState {
  return {
    ...createInitialIdleState(0, "bartek"),
    // Park every timer far away so a test only fires what it asks for.
    nextTypeAt: 999,
    nextLookAt: 999,
    nextStretchAt: 999,
    nextGestureAt: 999,
    ...overrides,
  };
}

function armPitch(mesh: THREE.Object3D, side: "left" | "right"): number {
  return mesh.getObjectByName(`arm-${side}`)!.rotation.x;
}

/** Run the pose forward in small steps, returning the peak arm pitch. */
function playOut(
  mesh: THREE.Group,
  state: IdleState,
  seconds: number,
  atDesk: boolean,
  rng: () => number = () => 0.5,
): { state: IdleState; peakPitch: number; peakHeadPitch: number } {
  let current = state;
  let now = 0;
  let peakPitch = 0;
  let peakHeadPitch = 0;
  const dt = 1 / 30;
  for (let step = 0; step * dt < seconds; step += 1) {
    now += dt;
    current = updateIdle(current, dt, position, 0, mesh, now, rng, { atDesk });
    const pitch = armPitch(mesh, "right");
    if (Math.abs(pitch) > Math.abs(peakPitch)) peakPitch = pitch;
    const headPitch = mesh.getObjectByName("head")!.rotation.x;
    if (Math.abs(headPitch) > Math.abs(peakHeadPitch)) peakHeadPitch = headPitch;
  }
  return { state: current, peakPitch, peakHeadPitch };
}

describe("typing is a desk-only pose (C-63)", () => {
  it("extends both arms forward when the NPC is at their desk", () => {
    const mesh = human();
    const { peakPitch } = playOut(mesh, base({ nextTypeAt: 0 }), 2, true);
    // Negative pitch swings the arm toward +Z, which is the direction
    // the NPC faces - i.e. forward, over the keyboard.
    expect(peakPitch).toBeLessThan(-1);
    expect(peakPitch).toBeGreaterThanOrEqual(TYPING_ARM_PITCH - 0.2);
  });

  it("puts the hands at desk height, over the desk", () => {
    // The desk surface is at y=0.75 and the NPC stands 0.45 m from the
    // desk edge (C-63), so the hands must land near that height and
    // reach forward far enough to be over the desk, not in mid-air.
    const mesh = human();
    playOut(mesh, base({ nextTypeAt: 0 }), 1.5, true);
    mesh.updateMatrixWorld(true);
    const hand = mesh.getObjectByName("hand-right")!.getWorldPosition(new THREE.Vector3());
    expect(hand.y).toBeGreaterThan(0.7);
    expect(hand.y).toBeLessThan(0.9);
    expect(hand.z).toBeGreaterThan(0.45);
    expect(hand.z).toBeLessThan(ARM_TOTAL_LENGTH + 0.01);
    expect(SHOULDER_Y).toBe(0.95);
  });

  it("never types when the NPC is away from their desk", () => {
    const mesh = human();
    const { peakPitch } = playOut(mesh, base({ nextTypeAt: 0 }), 12, false);
    expect(peakPitch).toBe(0);
  });

  it("moves the hands in small alternating strokes, not in lockstep", () => {
    const mesh = human();
    let state = base({ nextTypeAt: 0 });
    let now = 0;
    const gaps: number[] = [];
    for (let step = 0; step < 60; step += 1) {
      now += 1 / 30;
      state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.5, { atDesk: true });
      gaps.push(armPitch(mesh, "left") - armPitch(mesh, "right"));
    }
    const spread = Math.max(...gaps) - Math.min(...gaps);
    expect(spread, "the hands must not move as one block").toBeGreaterThan(0.02);
    expect(spread, "micro movements - Lucas asked for 'not too fast'").toBeLessThan(0.3);
  });

  it("holds a typing burst for seconds, not for a twitch", () => {
    expect(TYPING_BURST_S[0]).toBeGreaterThanOrEqual(4);
    const mesh = human();
    const { state } = playOut(mesh, base({ nextTypeAt: 0 }), 3, true);
    expect(state.typing!.left, "still typing 3 s in").toBeGreaterThan(0);
  });
});

describe("stretch (C-63)", () => {
  it("raises both arms and tilts the head up", () => {
    const mesh = human();
    const { peakPitch, peakHeadPitch } = playOut(
      mesh, base({ nextStretchAt: 0 }), STRETCH_DURATION_S, true,
    );
    expect(peakPitch).toBeLessThan(-2);
    expect(armPitch(mesh, "left")).toBeCloseTo(armPitch(mesh, "right"), 5);
    expect(peakHeadPitch, "looking a little up").toBeGreaterThan(0.1);
  });

  it("stretches away from the desk too - it is not a desk-only pose", () => {
    const mesh = human();
    const { peakPitch } = playOut(mesh, base({ nextStretchAt: 0 }), STRETCH_DURATION_S, false);
    expect(peakPitch).toBeLessThan(-2);
  });

  it("is rare, and the rate is one adjustable knob", () => {
    expect(STRETCH_INTERVAL_S[0]).toBeGreaterThanOrEqual(30);
    expect(STRETCH_INTERVAL_S[1]).toBeGreaterThan(STRETCH_INTERVAL_S[0]);
    expect(GESTURE_INTERVAL_S[0]).toBeGreaterThanOrEqual(15);
  });

  it("returns the arms to neutral once it is over", () => {
    const mesh = human();
    playOut(mesh, base({ nextStretchAt: 0 }), STRETCH_DURATION_S + 1, false);
    expect(armPitch(mesh, "right")).toBeCloseTo(0, 5);
    expect(mesh.getObjectByName("head")!.rotation.x).toBeCloseTo(0, 5);
  });
});

describe("desk gestures - the IT-office jokes (C-63)", () => {
  it("offers facepalm, coffee-sip, fist-pump and shrug", () => {
    expect([...DESK_GESTURES].sort()).toEqual(["coffee-sip", "facepalm", "fist-pump", "shrug"]);
  });

  it("plays a gesture at the desk and names which one is running", () => {
    const mesh = human();
    const { state } = playOut(mesh, base({ nextGestureAt: 0 }), 0.5, true);
    expect(state.gesture).not.toBeNull();
    expect(DESK_GESTURES).toContain(state.gesture!.kind);
  });

  it("never plays a gesture away from the desk", () => {
    const mesh = human();
    const { state } = playOut(mesh, base({ nextGestureAt: 0 }), 5, false);
    expect(state.gesture ?? null).toBeNull();
  });

  it("shows the coffee mug only while the sip is running", () => {
    const mesh = human();
    const mug = mesh.getObjectByName("mug")!;
    // rng 0.3 lands on "coffee-sip" (index 1 of 4).
    const sip = () => 0.3;
    let state = base({ nextGestureAt: 0 });
    let now = 0;
    let everVisible = false;
    for (let step = 0; step < 120; step += 1) {
      now += 1 / 30;
      state = updateIdle(state, 1 / 30, position, 0, mesh, now, sip, { atDesk: true });
      if (state.gesture?.kind === "coffee-sip" && mug.visible) everVisible = true;
    }
    expect(state.gesture?.kind ?? "coffee-sip").toBe("coffee-sip");
    expect(everVisible).toBe(true);
  });

  it("hides the mug again after the gesture ends", () => {
    const mesh = human();
    playOut(mesh, base({ nextGestureAt: 0 }), 6, true, () => 0.3);
    expect(mesh.getObjectByName("mug")!.visible).toBe(false);
  });

  it("never runs two poses on the same arm in one frame", () => {
    // Every timer fires at once: exactly one pose may take the arms.
    const mesh = human();
    const { state } = playOut(
      mesh, base({ nextTypeAt: 0, nextStretchAt: 0, nextGestureAt: 0 }), 0.5, true,
    );
    const running = [
      (state.typing?.left ?? 0) > 0,
      (state.stretch?.left ?? 0) > 0,
      (state.gesture?.left ?? 0) > 0,
    ].filter(Boolean);
    expect(running).toHaveLength(1);
  });
});

describe("resetIdlePose (C-63)", () => {
  it("clears a held pose so a walk never starts from bent arms", () => {
    const mesh = human();
    playOut(mesh, base({ nextStretchAt: 0 }), 1, true);
    expect(armPitch(mesh, "right")).not.toBe(0);

    resetIdlePose(mesh);
    expect(armPitch(mesh, "right")).toBe(0);
    expect(mesh.getObjectByName("arm-right")!.rotation.z).toBe(0);
    expect(mesh.getObjectByName("head")!.rotation.x).toBe(0);
    expect(mesh.getObjectByName("head")!.position.y).toBe(1.25);
    expect(mesh.getObjectByName("mug")!.visible).toBe(false);
  });

  it("is safe on a mesh that has never idled", () => {
    expect(() => resetIdlePose(new THREE.Group())).not.toThrow();
  });
});

describe("per-NPC desync (C-63)", () => {
  it("does not type in lockstep across the office", () => {
    const pitches = new Set<number>();
    for (const id of ["bartek", "tomek", "marek", "janusz"]) {
      const mesh = createNpcMesh("male", 0, id);
      let state = { ...createInitialIdleState(0, id), nextTypeAt: 0 };
      let now = 0;
      for (let step = 0; step < 20; step += 1) {
        now += 1 / 30;
        state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.5, { atDesk: true });
      }
      pitches.add(Number(armPitch(mesh, "right").toFixed(6)));
    }
    expect(pitches.size, "every NPC hits the same keystroke on the same frame").toBeGreaterThan(1);
  });
});

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
  SHRUG_ARM_ROLL,
  TYPING_ARM_PITCH,
  TYPING_BURST_S,
  createInitialIdleState,
  isWorkingAtDesk,
  resetIdlePose,
  updateIdle,
  yawDifference,
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

describe("typing requires the WORKING position, not just the desk (C-63 amendment)", () => {
  /**
   * Lucas, 2026-09-02: "the typing animation should be only played when
   * npc is facing the desk, on working position. Now it plays when npc's
   * are talking looking on each other, not on the computer."
   *
   * Chatter (npc-controller: `first.rotation.y = Math.atan2(dx, dz)`) and
   * the player's walk-to-face both spin a settled NPC without touching
   * their `at-desk` state, so the state alone was never enough.
   */
  it("counts an NPC still pointed at their desk as working", () => {
    expect(isWorkingAtDesk("at-desk", Math.PI / 2, Math.PI / 2)).toBe(true);
    // A small drift (the yaw lerp has not fully converged) still counts.
    expect(isWorkingAtDesk("at-desk", Math.PI / 2 + 0.2, Math.PI / 2)).toBe(true);
  });

  it("does not count an NPC who has turned to talk to someone", () => {
    // Turned 90 degrees to face a colleague: still `at-desk`, not working.
    expect(isWorkingAtDesk("at-desk", 0, Math.PI / 2)).toBe(false);
    // Turned right around to face the room.
    expect(isWorkingAtDesk("at-desk", -Math.PI / 2, Math.PI / 2)).toBe(false);
  });

  it("wraps around the +/-pi seam instead of reporting a full turn", () => {
    expect(yawDifference(Math.PI - 0.05, -Math.PI + 0.05)).toBeCloseTo(0.1, 5);
    expect(isWorkingAtDesk("at-desk", Math.PI - 0.05, -Math.PI + 0.05)).toBe(true);
  });

  it("is never working when away from a desk or with no workstation yaw", () => {
    expect(isWorkingAtDesk("kitchen", Math.PI / 2, Math.PI / 2)).toBe(false);
    expect(isWorkingAtDesk("walking", Math.PI / 2, Math.PI / 2)).toBe(false);
    // A stranded NPC is marked at-desk but has no settled target.
    expect(isWorkingAtDesk("at-desk", Math.PI / 2, undefined)).toBe(false);
  });
});

describe("shrug reaches out to the sides (C-63 amendment)", () => {
  /** Lucas, 2026-09-02: "shrug should extend arms on the sides + up, not
   *  forward-up". */
  it("swings the arms sideways and slightly up, not forward", () => {
    const mesh = human();
    let state = base({ nextGestureAt: 0 });
    let now = 0;
    let peakRoll = 0;
    let peakPitch = 0;
    // rng 0.99 lands on the last gesture, "shrug".
    for (let step = 0; step < 60; step += 1) {
      now += 1 / 30;
      state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.99, { atDesk: true });
      const arm = mesh.getObjectByName("arm-right")!;
      if (Math.abs(arm.rotation.z) > Math.abs(peakRoll)) peakRoll = arm.rotation.z;
      if (Math.abs(arm.rotation.x) > Math.abs(peakPitch)) peakPitch = arm.rotation.x;
    }
    expect(state.gesture?.kind ?? "shrug").toBe("shrug");
    expect(peakRoll, "the arms go OUT to the side").toBeGreaterThan(1.5);
    expect(Math.abs(peakPitch), "and not forward").toBeLessThan(0.05);
  });

  it("puts the hands out past the shoulders and above them", () => {
    const mesh = human();
    const arm = mesh.getObjectByName("arm-right")!;
    arm.rotation.set(0, 0, SHRUG_ARM_ROLL);
    mesh.updateMatrixWorld(true);
    const hand = mesh.getObjectByName("hand-right")!.getWorldPosition(new THREE.Vector3());
    expect(hand.x, "out past the shoulder at x=0.38").toBeGreaterThan(0.9);
    expect(hand.y, "and up, above the shoulder at y=0.95").toBeGreaterThan(SHOULDER_Y);
  });
});

describe("a desk pose is CANCELLED when the working position is lost (C-63 amendment 2)", () => {
  /**
   * Lucas, 2026-09-02: "the typing animation still plays when people are
   * not on the working position, facing the laptop... they can be even
   * not on the desk."
   *
   * Amendment 1 gated the START of a burst. But poses were designed to
   * always FINISH once running, so an NPC who turned to talk mid-burst
   * kept typing for up to nine more seconds. Losing the working position
   * has to cancel the pose, not just stop the next one.
   */
  it("stops a running typing burst within the ease-out ramp", () => {
    const mesh = human();
    let state = base({ nextTypeAt: 0 });
    let now = 0;
    // Type for a second at the desk.
    for (let step = 0; step < 30; step += 1) {
      now += 1 / 30;
      state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.5, { atDesk: true });
    }
    expect(armPitch(mesh, "right")).toBeLessThan(-1);
    const burstLeft = state.typing!.left;
    expect(burstLeft, "the burst still had seconds to run").toBeGreaterThan(2);

    // The NPC turns to talk to someone: atDesk goes false mid-burst.
    for (let step = 0; step < 30; step += 1) {
      now += 1 / 30;
      state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.5, { atDesk: false });
    }
    expect(state.typing!.left, "the burst was cancelled, not left to run").toBe(0);
    expect(armPitch(mesh, "right"), "and the arms came back down").toBeCloseTo(0, 5);
  });

  it("eases the arms down instead of snapping them", () => {
    const mesh = human();
    let state = base({ nextTypeAt: 0 });
    let now = 0;
    for (let step = 0; step < 30; step += 1) {
      now += 1 / 30;
      state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.5, { atDesk: true });
    }
    const before = armPitch(mesh, "right");
    // One frame after losing the position: the arm has moved toward
    // neutral but is nowhere near it yet.
    state = updateIdle(state, 1 / 30, position, 0, mesh, now + 1 / 30, () => 0.5, { atDesk: false });
    const after = armPitch(mesh, "right");
    expect(Math.abs(after)).toBeLessThan(Math.abs(before));
    expect(Math.abs(after), "must not snap to zero in one frame").toBeGreaterThan(0.2);
  });

  it("cancels a running desk gesture too", () => {
    const mesh = human();
    let state = base({ nextGestureAt: 0 });
    let now = 0;
    state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.3, { atDesk: true });
    expect(state.gesture?.kind).toBe("coffee-sip");
    for (let step = 0; step < 20; step += 1) {
      now += 1 / 30;
      state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.3, { atDesk: false });
    }
    expect(state.gesture ?? null).toBeNull();
    expect(mesh.getObjectByName("mug")!.visible).toBe(false);
  });

  it("lets a stretch run to its end - it is not a desk pose", () => {
    const mesh = human();
    let state = base({ nextStretchAt: 0 });
    let now = 0;
    state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.5, { atDesk: true });
    for (let step = 0; step < 15; step += 1) {
      now += 1 / 30;
      state = updateIdle(state, 1 / 30, position, 0, mesh, now, () => 0.5, { atDesk: false });
    }
    expect(state.stretch!.left, "a stretch survives turning around").toBeGreaterThan(1);
  });
});

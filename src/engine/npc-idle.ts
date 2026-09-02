import type * as THREE from "three";

/**
 * C-63 desk gestures - the "any other nice idea, aligned with the style
 * of the game, IT/AI company, jokes, funny" slot Lucas left open. Four
 * one-shot poses for the price of one pose system, and each one is the
 * visual half of a joke the chatter pools already tell in text:
 *
 *   facepalm   - somebody pushed to main on a Friday
 *   coffee-sip - the office runs on it; the game even has a caffeine stat
 *   fist-pump  - the build went green
 *   shrug      - "works on my machine"
 */
export const DESK_GESTURES = ["facepalm", "coffee-sip", "fist-pump", "shrug"] as const;
export type DeskGesture = (typeof DESK_GESTURES)[number];

/** Seconds a typing burst runs, and the pause between bursts. Bursts are
 *  LONG on purpose: an NPC at a desk should mostly look like they are
 *  working, not twitch for a second every ten. */
export const TYPING_BURST_S: readonly [number, number] = [4, 9];
export const TYPING_PAUSE_S: readonly [number, number] = [3, 7];

/** Lucas: "rarelly (if we can regulate how often animation happens)".
 *  These two ranges ARE that regulator - one knob per animation. */
export const STRETCH_INTERVAL_S: readonly [number, number] = [45, 90];
export const GESTURE_INTERVAL_S: readonly [number, number] = [25, 50];

export const STRETCH_DURATION_S = 2.2;
export const GESTURE_DURATION_S: Readonly<Record<DeskGesture, number>> = {
  facepalm: 1.4,
  "coffee-sip": 1.3,
  "fist-pump": 1,
  shrug: 1,
};

/** How long a pose takes to ease in and out. Without it the arms snap. */
export const POSE_RAMP_S = 0.35;
const GESTURE_RAMP_S = 0.25;

/**
 * Arm pitch (rotation.x) for typing. NEGATIVE swings the arm toward
 * local +Z, which is the direction the NPC's eyes face - so the arms
 * reach forward over the keyboard. At -1.28 rad the 0.65 m arm puts the
 * hands at y = 0.76 and 0.62 m forward of the shoulder: right at the
 * 0.75 m desk surface and over the keyboard, given the C-63 standing
 * distance of 0.45 m from the desk edge.
 */
export const TYPING_ARM_PITCH = -1.28;
/** Keystroke rate. Lucas: "micro movements, not too fast". */
export const TYPING_STROKE_HZ = 3.2;
const TYPING_STROKE_AMPLITUDE = 0.05;
const TYPING_HEAD_BOB = 0.02;

const STRETCH_ARM_PITCH = -2.5;
const STRETCH_HEAD_PITCH = 0.28;

export interface PoseTimer {
  /** Seconds remaining in the pose. 0 means "not playing". */
  left: number;
  /** Total length of the pose, kept for the ease envelope. */
  span: number;
}

export interface GestureTimer extends PoseTimer {
  kind: DeskGesture;
}

export interface IdleState {
  /** Seconds until the next typing burst fires. */
  nextTypeAt: number;
  /** Seconds until the next head-look fires. */
  nextLookAt: number;
  /** The current head-look yaw offset (if looking around). */
  currentLookYaw: number | null;
  /** Seconds until the current look completes. */
  lookUntil: number;
  /** Seconds until the next brief ear twitch. */
  nextEarTwitchAt?: number;
  /** Seconds remaining in the current ear twitch. */
  earTwitchUntil?: number;
  /** Seconds until the next whole-body bounce. */
  nextBounceAt?: number;
  /** Seconds remaining in the current bounce. */
  bounceUntil?: number;
  /** Stable per-NPC phase used to keep looping animations out of sync. */
  animationPhase?: number;
  /** C-63: the running typing burst, if any. */
  typing?: PoseTimer;
  /** C-63: seconds until the next stretch. */
  nextStretchAt?: number;
  /** C-63: the running stretch, if any. */
  stretch?: PoseTimer;
  /** C-63: seconds until the next desk gesture. */
  nextGestureAt?: number;
  /** C-63: the running desk gesture, if any. */
  gesture?: GestureTimer | null;
}

export interface IdleOptions {
  /**
   * C-63: true only while the NPC is settled AT THEIR DESK. Lucas asked
   * for the typing animation "when npc is working next to the desk (only
   * then)"; before this, the typing bob played wherever an NPC stood.
   */
  atDesk?: boolean;
}

interface MeshIdleRuntime {
  headBaseY?: number;
  armBaseY?: number;
  bodyBaseScaleY?: number;
}

const runtimeByMesh = new WeakMap<THREE.Object3D, MeshIdleRuntime>();

function randomBetween(min: number, max: number, rng: () => number): number {
  return min + (max - min) * Math.max(0, Math.min(1, rng()));
}

function randomIn(range: readonly [number, number], rng: () => number): number {
  return randomBetween(range[0], range[1], rng);
}

function hashNpcId(id: string): number {
  let hash = 2166136261;
  for (const character of id) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: number): () => number {
  let value = seed || 1;
  return () => {
    value += 0x6d2b79f5;
    let mixed = value;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

export function createInitialIdleState(now: number, npcId?: string): IdleState {
  const seed = npcId === undefined ? 0 : hashNpcId(npcId);
  const rng = npcId === undefined ? Math.random : seededRandom(seed);
  return {
    nextTypeAt: now + randomIn(TYPING_PAUSE_S, rng),
    nextLookAt: now + randomBetween(5, 10, rng),
    currentLookYaw: null,
    lookUntil: 0,
    nextEarTwitchAt: now + randomBetween(6, 12, rng),
    earTwitchUntil: 0,
    nextBounceAt: now + randomBetween(8, 15, rng),
    bounceUntil: 0,
    animationPhase: npcId === undefined ? 0 : (seed % 1000) / 1000 * Math.PI * 2,
    typing: { left: 0, span: 0 },
    nextStretchAt: now + randomIn(STRETCH_INTERVAL_S, rng),
    stretch: { left: 0, span: 0 },
    nextGestureAt: now + randomIn(GESTURE_INTERVAL_S, rng),
    gesture: null,
  };
}

/**
 * Flat-topped ease: ramps 0 -> 1 over `ramp` seconds, holds, then ramps
 * back to 0 over the last `ramp` seconds. A pose shorter than 2 ramps
 * never reaches full amplitude, which is the correct behaviour (it reads
 * as a smaller version of the same move).
 */
function trapezoid(elapsed: number, span: number, ramp: number): number {
  if (span <= 0 || ramp <= 0) return 0;
  return Math.max(0, Math.min(1, Math.min(elapsed, span - elapsed) / ramp));
}

interface PoseOutput {
  leftArmPitch: number;
  rightArmPitch: number;
  leftArmRoll: number;
  rightArmRoll: number;
  headPitch: number;
  headBobY: number;
  mugVisible: boolean;
}

const NEUTRAL_POSE: PoseOutput = {
  leftArmPitch: 0,
  rightArmPitch: 0,
  leftArmRoll: 0,
  rightArmRoll: 0,
  headPitch: 0,
  headBobY: 0,
  mugVisible: false,
};

function typingPose(timer: PoseTimer, now: number, phase: number): PoseOutput {
  const ease = trapezoid(timer.span - timer.left, timer.span, POSE_RAMP_S);
  // The two hands alternate (antiphase), and `phase` is the per-NPC
  // offset - without it the whole office would hit the same keystroke
  // on the same frame.
  const stroke = Math.sin(now * 2 * Math.PI * TYPING_STROKE_HZ + phase) * TYPING_STROKE_AMPLITUDE;
  return {
    ...NEUTRAL_POSE,
    leftArmPitch: (TYPING_ARM_PITCH + stroke) * ease,
    rightArmPitch: (TYPING_ARM_PITCH - stroke) * ease,
    headBobY: Math.sin(now * Math.PI * 4 + phase) * TYPING_HEAD_BOB * ease,
  };
}

function stretchPose(timer: PoseTimer): PoseOutput {
  // A full sine hump: no hold, because a stretch is a single smooth
  // reach rather than a held pose.
  const progress = timer.span <= 0 ? 0 : (timer.span - timer.left) / timer.span;
  const ease = Math.sin(Math.max(0, Math.min(1, progress)) * Math.PI);
  return {
    ...NEUTRAL_POSE,
    leftArmPitch: STRETCH_ARM_PITCH * ease,
    rightArmPitch: STRETCH_ARM_PITCH * ease,
    headPitch: STRETCH_HEAD_PITCH * ease,
  };
}

function gesturePose(timer: GestureTimer): PoseOutput {
  const elapsed = timer.span - timer.left;
  const progress = timer.span <= 0 ? 0 : elapsed / timer.span;
  const ease = trapezoid(elapsed, timer.span, GESTURE_RAMP_S);
  switch (timer.kind) {
    case "facepalm":
      // The right arm swings inward (roll) and up (pitch) so the hand
      // lands in front of the face. A rigid arm cannot reach the cheek,
      // but at this scale hand-in-front-of-face reads as a facepalm.
      return {
        ...NEUTRAL_POSE,
        rightArmPitch: -2.3 * ease,
        rightArmRoll: -0.55 * ease,
        headPitch: -0.12 * ease,
      };
    case "coffee-sip":
      return {
        ...NEUTRAL_POSE,
        rightArmPitch: -2.1 * ease,
        rightArmRoll: -0.5 * ease,
        headPitch: 0.18 * ease,
        mugVisible: ease > 0.15,
      };
    case "fist-pump": {
      // Two pumps rather than one hold - a single raise reads as a
      // stretch, and the office already has one of those.
      const pump = Math.abs(Math.sin(progress * 2 * Math.PI));
      return {
        ...NEUTRAL_POSE,
        leftArmPitch: -2.8 * pump,
        rightArmPitch: -2.8 * pump,
        headPitch: 0.1 * pump,
      };
    }
    case "shrug":
    default:
      return {
        ...NEUTRAL_POSE,
        leftArmPitch: -0.35 * ease,
        rightArmPitch: -0.35 * ease,
        leftArmRoll: -0.55 * ease,
        rightArmRoll: 0.55 * ease,
        headPitch: 0.05 * ease,
      };
  }
}

/**
 * C-63: drop any held pose and restore the neutral rest position.
 *
 * The controller calls this the moment an NPC starts walking. Without
 * it, an NPC that leaves the desk mid-facepalm keeps the bent arm for
 * the whole walk: `updateIdle` is not called for walkers, and the walk
 * cycle only ever writes rotation.x, so a gesture's rotation.z would
 * survive untouched.
 */
export function resetIdlePose(mesh: THREE.Object3D): void {
  const runtime = runtimeByMesh.get(mesh);
  for (const name of ["arm-left", "arm-right"]) {
    const arm = mesh.getObjectByName(name);
    if (arm === undefined) continue;
    arm.rotation.x = 0;
    arm.rotation.z = 0;
    if (runtime?.armBaseY !== undefined) arm.position.y = runtime.armBaseY;
  }
  const head = mesh.getObjectByName("head");
  if (head !== undefined) {
    head.rotation.x = 0;
    if (runtime?.headBaseY !== undefined) head.position.y = runtime.headBaseY;
  }
  const mug = mesh.getObjectByName("mug");
  if (mug !== undefined) mug.visible = false;
}

export function updateIdle(
  state: IdleState,
  dt: number,
  npcPosition: { x: number; y: number; z: number },
  npcBaseYaw: number,
  mesh: THREE.Object3D,
  now: number,
  rng: () => number,
  options: IdleOptions = {},
): IdleState {
  void npcPosition;
  void npcBaseYaw;

  const safeDt = Math.max(0, dt);
  const atDesk = options.atDesk ?? false;
  const runtime = runtimeByMesh.get(mesh) ?? {};
  runtimeByMesh.set(mesh, runtime);

  const head = mesh.getObjectByName("head");
  const leftArm = mesh.getObjectByName("arm-left");
  const rightArm = mesh.getObjectByName("arm-right");
  const body = mesh.getObjectByName("body");
  const leftEar = mesh.getObjectByName("left-ear");
  const rightEar = mesh.getObjectByName("right-ear");
  const tail = mesh.getObjectByName("tail");
  const mug = mesh.getObjectByName("mug");
  if (head !== undefined && runtime.headBaseY === undefined) runtime.headBaseY = head.position.y;
  if (rightArm !== undefined && runtime.armBaseY === undefined) runtime.armBaseY = rightArm.position.y;
  if (body !== undefined && runtime.bodyBaseScaleY === undefined) runtime.bodyBaseScaleY = body.scale.y;

  // Only a humanoid has arms to pose with. Burek gets the ear twitch,
  // the body bounce and the tail wag below, and none of the desk poses.
  const humanoid = leftArm !== undefined && rightArm !== undefined;

  let nextTypeAt = state.nextTypeAt - safeDt;
  let nextLookAt = state.nextLookAt - safeDt;
  let currentLookYaw = state.currentLookYaw;
  let lookUntil = Math.max(0, state.lookUntil - safeDt);
  let nextEarTwitchAt = (state.nextEarTwitchAt ?? 6) - safeDt;
  let earTwitchUntil = Math.max(0, (state.earTwitchUntil ?? 0) - safeDt);
  let nextBounceAt = (state.nextBounceAt ?? 8) - safeDt;
  let bounceUntil = Math.max(0, (state.bounceUntil ?? 0) - safeDt);
  const animationPhase = state.animationPhase ?? 0;

  let nextStretchAt = (state.nextStretchAt ?? randomIn(STRETCH_INTERVAL_S, rng)) - safeDt;
  let nextGestureAt = (state.nextGestureAt ?? randomIn(GESTURE_INTERVAL_S, rng)) - safeDt;
  let typing: PoseTimer = {
    left: Math.max(0, (state.typing?.left ?? 0) - safeDt),
    span: state.typing?.span ?? 0,
  };
  let stretch: PoseTimer = {
    left: Math.max(0, (state.stretch?.left ?? 0) - safeDt),
    span: state.stretch?.span ?? 0,
  };
  let gesture: GestureTimer | null = state.gesture == null
    ? null
    : { ...state.gesture, left: Math.max(0, state.gesture.left - safeDt) };
  if (gesture !== null && gesture.left <= 0) gesture = null;

  // A pose that is already running always finishes; a new one is never
  // started on top of it, so two poses can never drive the same arm in
  // the same frame. Priority when several timers are due at once:
  // stretch > gesture > typing.
  const posing = typing.left > 0 || stretch.left > 0 || gesture !== null;
  if (humanoid && !posing) {
    if (nextStretchAt <= 0) {
      stretch = { left: STRETCH_DURATION_S, span: STRETCH_DURATION_S };
      nextStretchAt = randomIn(STRETCH_INTERVAL_S, rng);
    } else if (atDesk && nextGestureAt <= 0) {
      const kind = DESK_GESTURES[
        Math.min(DESK_GESTURES.length - 1, Math.floor(Math.max(0, rng()) * DESK_GESTURES.length))
      ]!;
      const span = GESTURE_DURATION_S[kind];
      gesture = { kind, left: span, span };
      nextGestureAt = randomIn(GESTURE_INTERVAL_S, rng);
    } else if (atDesk && nextTypeAt <= 0) {
      const span = randomIn(TYPING_BURST_S, rng);
      typing = { left: span, span };
      nextTypeAt = randomIn(TYPING_PAUSE_S, rng) + span;
    }
  }
  // Away from the desk the typing timer must not sit at a negative
  // value all day, or the NPC would fire a burst on the very frame they
  // sit back down. Re-arm it instead.
  if (!atDesk && nextTypeAt <= 0) nextTypeAt = randomIn(TYPING_PAUSE_S, rng);
  if (!atDesk && nextGestureAt <= 0) nextGestureAt = randomIn(GESTURE_INTERVAL_S, rng);

  const pose = stretch.left > 0
    ? stretchPose(stretch)
    : gesture !== null
      ? gesturePose(gesture)
      : typing.left > 0
        ? typingPose(typing, now, animationPhase)
        : NEUTRAL_POSE;

  // The pose is written EVERY frame, neutral included, so the limbs
  // always return to rest on their own instead of needing a cleanup
  // branch when a pose ends.
  if (leftArm !== undefined) {
    leftArm.rotation.x = pose.leftArmPitch;
    leftArm.rotation.z = pose.leftArmRoll;
    if (runtime.armBaseY !== undefined) leftArm.position.y = runtime.armBaseY;
  }
  if (rightArm !== undefined) {
    rightArm.rotation.x = pose.rightArmPitch;
    rightArm.rotation.z = pose.rightArmRoll;
    if (runtime.armBaseY !== undefined) rightArm.position.y = runtime.armBaseY;
  }
  if (head !== undefined && runtime.headBaseY !== undefined) {
    head.position.y = runtime.headBaseY + pose.headBobY;
  }
  if (mug !== undefined) mug.visible = pose.mugVisible;

  if (currentLookYaw !== null && lookUntil <= 0) {
    currentLookYaw = null;
  }
  if (currentLookYaw === null && nextLookAt <= 0) {
    const direction = rng() < 0.5 ? -1 : 1;
    currentLookYaw = direction * randomBetween(Math.PI / 12, Math.PI / 6, rng);
    lookUntil = randomBetween(1, 2, rng);
    nextLookAt = randomBetween(5, 10, rng);
  }

  if (head !== undefined) {
    head.rotation.y = currentLookYaw ?? 0;
    head.rotation.x = pose.headPitch;
  }

  if (nextEarTwitchAt <= 0) {
    earTwitchUntil = 0.2;
    nextEarTwitchAt = randomBetween(6, 12, rng);
  }
  const twitch = earTwitchUntil > 0 ? Math.sin((earTwitchUntil / 0.2) * Math.PI) * 0.1 : 0;
  if (leftEar !== undefined) leftEar.rotation.z = twitch;
  if (rightEar !== undefined) rightEar.rotation.z = -twitch;

  if (nextBounceAt <= 0) {
    bounceUntil = 0.15;
    nextBounceAt = randomBetween(8, 15, rng);
  }
  if (body !== undefined && runtime.bodyBaseScaleY !== undefined) {
    body.scale.y = runtime.bodyBaseScaleY * (bounceUntil > 0 ? 1.05 : 1);
  }

  if (tail !== undefined) {
    tail.rotation.y = Math.sin(now * Math.PI * 2 / 0.3 + animationPhase) * 0.2;
  }

  return {
    nextTypeAt,
    nextLookAt,
    currentLookYaw,
    lookUntil,
    nextEarTwitchAt,
    earTwitchUntil,
    nextBounceAt,
    bounceUntil,
    animationPhase,
    typing,
    nextStretchAt,
    stretch,
    nextGestureAt,
    gesture,
  };
}

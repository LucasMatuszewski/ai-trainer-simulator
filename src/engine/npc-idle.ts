import type * as THREE from "three";

export interface IdleState {
  /** Seconds until the next typing animation fires. */
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
}

interface MeshIdleRuntime {
  typeUntil: number;
  headBaseY?: number;
  armBaseY?: number;
  bodyBaseScaleY?: number;
}

const runtimeByMesh = new WeakMap<THREE.Object3D, MeshIdleRuntime>();

function randomBetween(min: number, max: number, rng: () => number): number {
  return min + (max - min) * Math.max(0, Math.min(1, rng()));
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
    nextTypeAt: now + randomBetween(4, 8, rng),
    nextLookAt: now + randomBetween(5, 10, rng),
    currentLookYaw: null,
    lookUntil: 0,
    nextEarTwitchAt: now + randomBetween(6, 12, rng),
    earTwitchUntil: 0,
    nextBounceAt: now + randomBetween(8, 15, rng),
    bounceUntil: 0,
    animationPhase: npcId === undefined ? 0 : (seed % 1000) / 1000 * Math.PI * 2,
  };
}

export function updateIdle(
  state: IdleState,
  dt: number,
  npcPosition: { x: number; y: number; z: number },
  npcBaseYaw: number,
  mesh: THREE.Object3D,
  now: number,
  rng: () => number,
): IdleState {
  void npcPosition;
  void npcBaseYaw;

  const safeDt = Math.max(0, dt);
  const runtime = runtimeByMesh.get(mesh) ?? { typeUntil: 0 };
  runtimeByMesh.set(mesh, runtime);

  const head = mesh.getObjectByName("head");
  const rightArm = mesh.getObjectByName("arm-right");
  const body = mesh.getObjectByName("body");
  const leftEar = mesh.getObjectByName("left-ear");
  const rightEar = mesh.getObjectByName("right-ear");
  const tail = mesh.getObjectByName("tail");
  if (head !== undefined && runtime.headBaseY === undefined) runtime.headBaseY = head.position.y;
  if (rightArm !== undefined && runtime.armBaseY === undefined) runtime.armBaseY = rightArm.position.y;
  if (body !== undefined && runtime.bodyBaseScaleY === undefined) runtime.bodyBaseScaleY = body.scale.y;

  let nextTypeAt = state.nextTypeAt - safeDt;
  let nextLookAt = state.nextLookAt - safeDt;
  let currentLookYaw = state.currentLookYaw;
  let lookUntil = Math.max(0, state.lookUntil - safeDt);
  let nextEarTwitchAt = (state.nextEarTwitchAt ?? 6) - safeDt;
  let earTwitchUntil = Math.max(0, (state.earTwitchUntil ?? 0) - safeDt);
  let nextBounceAt = (state.nextBounceAt ?? 8) - safeDt;
  let bounceUntil = Math.max(0, (state.bounceUntil ?? 0) - safeDt);
  const animationPhase = state.animationPhase ?? 0;

  if (nextTypeAt <= 0) {
    runtime.typeUntil = now + randomBetween(0.5, 1.5, rng);
    nextTypeAt = randomBetween(4, 8, rng);
  }

  const typing = now < runtime.typeUntil;
  const typingBob = typing ? Math.sin(now * Math.PI * 4) : 0;
  if (head !== undefined && runtime.headBaseY !== undefined) {
    head.position.y = runtime.headBaseY + typingBob * 0.02;
  }
  if (rightArm !== undefined && runtime.armBaseY !== undefined) {
    rightArm.position.y = runtime.armBaseY + Math.abs(typingBob) * 0.1;
  }

  if (currentLookYaw !== null && lookUntil <= 0) {
    currentLookYaw = null;
  }
  if (currentLookYaw === null && nextLookAt <= 0) {
    const direction = rng() < 0.5 ? -1 : 1;
    currentLookYaw = direction * randomBetween(Math.PI / 12, Math.PI / 6, rng);
    lookUntil = randomBetween(1, 2, rng);
    nextLookAt = randomBetween(5, 10, rng);
  }

  if (head !== undefined) head.rotation.y = currentLookYaw ?? 0;

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
  };
}

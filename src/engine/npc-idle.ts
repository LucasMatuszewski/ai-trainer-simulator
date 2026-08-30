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
}

interface MeshIdleRuntime {
  typeUntil: number;
  headBaseY?: number;
  armBaseY?: number;
}

const runtimeByMesh = new WeakMap<THREE.Object3D, MeshIdleRuntime>();

function randomBetween(min: number, max: number, rng: () => number): number {
  return min + (max - min) * Math.max(0, Math.min(1, rng()));
}

export function createInitialIdleState(now: number): IdleState {
  return {
    nextTypeAt: now + randomBetween(4, 8, Math.random),
    nextLookAt: now + randomBetween(5, 10, Math.random),
    currentLookYaw: null,
    lookUntil: 0,
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
  if (head !== undefined && runtime.headBaseY === undefined) runtime.headBaseY = head.position.y;
  if (rightArm !== undefined && runtime.armBaseY === undefined) runtime.armBaseY = rightArm.position.y;

  let nextTypeAt = state.nextTypeAt - safeDt;
  let nextLookAt = state.nextLookAt - safeDt;
  let currentLookYaw = state.currentLookYaw;
  let lookUntil = Math.max(0, state.lookUntil - safeDt);

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

  return { nextTypeAt, nextLookAt, currentLookYaw, lookUntil };
}

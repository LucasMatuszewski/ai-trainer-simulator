/**
 * Player controls: WASD walk + mouse-look camera orbit.
 *
 * - WASD or arrow keys move the player in world space.
 * - Shift = sprint.
 * - Mouse moves the camera (yaw + clamped pitch), orbiting the player.
 * - E is the interact key (handled by the input layer, not here).
 * - The camera follows the player.
 *
 * Movement uses simple AABB collision against office walls and obstacles.
 */

import * as THREE from "three";
import { OFFICE_BOUNDS, OBSTACLES } from "../content/npcs";

const WALK_SPEED = 3; // units per second
const SPRINT_MULT = 1.6;
const PLAYER_RADIUS = 0.3; // half-width for AABB collision
const MOUSE_SENSITIVITY = 0.0025;
const PITCH_MIN = -0.6;
const PITCH_MAX = 0.4;
const CAMERA_DISTANCE = 6;
const CAMERA_HEIGHT = 3.5;

export interface Controls {
  update: (deltaSeconds: number) => void;
  setKeys: (keys: Set<string>) => void;
  setMouseDelta: (dx: number, dy: number) => void;
  getCameraTarget: () => THREE.Vector3;
  getPlayerPosition: () => THREE.Vector3;
  isPointerLocked: () => boolean;
}

export interface ControlsOptions {
  canvas: HTMLCanvasElement;
  camera: THREE.PerspectiveCamera;
  initialPlayer: THREE.Vector3;
}

export function createControls(opts: ControlsOptions): Controls {
  const { canvas, camera } = opts;
  const player = opts.initialPlayer.clone();
  let yaw = 0;
  let pitch = 0.3;

  let keys: Set<string> = new Set();
  let mouseDelta = { x: 0, y: 0 };
  let pointerLocked = false;

  // Pointer lock
  canvas.addEventListener("click", () => {
    if (!pointerLocked) {
      canvas.requestPointerLock?.();
    }
  });
  document.addEventListener("pointerlockchange", () => {
    pointerLocked = document.pointerLockElement === canvas;
  });
  document.addEventListener("mousemove", (e) => {
    // Allow mouse-look whenever the canvas is hovered, not just when pointer
    // is locked. Without this, the only way to look around is to click (which
    // engages pointer lock), and pointer lock fails in headless test
    // environments. The trade-off is tiny: a passive mouse won't generate
    // movementX/Y, so it only rotates while the user actually moves it.
    if (pointerLocked || e.target === canvas) {
      mouseDelta.x += e.movementX;
      mouseDelta.y += e.movementY;
    }
  });

  function update(dt: number): void {
    // Apply mouse delta to yaw/pitch.
    yaw -= mouseDelta.x * MOUSE_SENSITIVITY;
    pitch -= mouseDelta.y * MOUSE_SENSITIVITY;
    pitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, pitch));
    mouseDelta.x = 0;
    mouseDelta.y = 0;

    // Compute forward and right vectors from yaw (XZ plane).
    const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
    const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));

    // Read input.
    let mx = 0;
    let mz = 0;
    if (keys.has("w") || keys.has("arrowup")) mz += 1;
    if (keys.has("s") || keys.has("arrowdown")) mz -= 1;
    if (keys.has("a") || keys.has("arrowleft")) mx -= 1;
    if (keys.has("d") || keys.has("arrowright")) mx += 1;
    const sprint = keys.has("shift") ? SPRINT_MULT : 1;

    // Compose move vector.
    const move = new THREE.Vector3()
      .addScaledVector(forward, mz)
      .addScaledVector(right, mx);
    if (move.lengthSq() > 0) move.normalize();
    move.multiplyScalar(WALK_SPEED * sprint * dt);

    // Apply collision separately on each axis to allow wall sliding.
    applyWithCollision(player, "x", move.x);
    applyWithCollision(player, "z", move.z);

    // Camera follows the player.
    const camTarget = new THREE.Vector3(
      player.x,
      player.y + CAMERA_HEIGHT,
      player.z,
    );
    const camOffset = new THREE.Vector3(
      Math.sin(yaw) * CAMERA_DISTANCE * Math.cos(pitch),
      CAMERA_HEIGHT * (1 - Math.cos(pitch)) + 1,
      Math.cos(yaw) * CAMERA_DISTANCE * Math.cos(pitch),
    );
    camera.position.copy(camTarget.clone().add(camOffset));
    camera.lookAt(camTarget);
  }

  function applyWithCollision(p: THREE.Vector3, axis: "x" | "z", delta: number): void {
    if (delta === 0) return;
    const oldVal = p[axis];
    p[axis] = oldVal + delta;

    // Wall bounds.
    if (axis === "x") {
      if (p.x - PLAYER_RADIUS < OFFICE_BOUNDS.minX) p.x = OFFICE_BOUNDS.minX + PLAYER_RADIUS;
      if (p.x + PLAYER_RADIUS > OFFICE_BOUNDS.maxX) p.x = OFFICE_BOUNDS.maxX - PLAYER_RADIUS;
    } else {
      if (p.z - PLAYER_RADIUS < OFFICE_BOUNDS.minZ) p.z = OFFICE_BOUNDS.minZ + PLAYER_RADIUS;
      if (p.z + PLAYER_RADIUS > OFFICE_BOUNDS.maxZ) p.z = OFFICE_BOUNDS.maxZ - PLAYER_RADIUS;
    }

    // Obstacles.
    for (const o of OBSTACLES) {
      if (
        p.x + PLAYER_RADIUS > o.minX &&
        p.x - PLAYER_RADIUS < o.maxX &&
        p.z + PLAYER_RADIUS > o.minZ &&
        p.z - PLAYER_RADIUS < o.maxZ
      ) {
        p[axis] = oldVal;
        return;
      }
    }
  }

  return {
    update,
    setKeys: (k) => {
      keys = k;
    },
    setMouseDelta: (dx, dy) => {
      mouseDelta.x += dx;
      mouseDelta.y += dy;
    },
    getCameraTarget: () => new THREE.Vector3(player.x, player.y, player.z),
    getPlayerPosition: () => player.clone(),
    isPointerLocked: () => pointerLocked,
  };
}

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
 * The collision math lives in ./collision as a pure function so the
 * edge cases (wall sliding, bounds clamping, obstacle reverts) can be
 * unit-tested without booting three.js.
 */

import * as THREE from "three";
import { OFFICE_BOUNDS, OBSTACLES } from "../content/npcs";
import { applyWithCollision } from "./collision";

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
  // Last known mouse position in viewport coords, so we can compute deltas
  // when the pointer is NOT locked. When pointer IS locked, the browser gives
  // us movementX/Y directly, but in regular hover state those are 0 — we
  // have to compute them from clientX deltas ourselves.
  let lastClient = { x: 0, y: 0, valid: false };

  // Pointer lock
  canvas.addEventListener("click", () => {
    if (!pointerLocked) {
      try {
        canvas.requestPointerLock?.();
      } catch {
        // Some headless / sandboxed browsers throw on requestPointerLock.
        // Fall back to "hover-to-look" — the mousemove handler below still
        // applies mouse-look when the cursor is over the canvas, so the
        // game is still playable.
      }
    }
  });
  document.addEventListener("pointerlockchange", () => {
    pointerLocked = document.pointerLockElement === canvas;
    // When the lock state changes, reset the client tracker so the first
    // move after (un)lock doesn't generate a giant spike from wherever the
    // cursor was.
    lastClient.valid = false;
  });
  document.addEventListener("mousemove", (e) => {
    // Apply mouse-look both during pointer lock AND when the cursor is over
    // the canvas. This is the only way it works in headless / Playwright
    // environments where requestPointerLock is denied.
    if (!(pointerLocked || e.target === canvas)) return;
    if (pointerLocked) {
      // movementX/Y are valid only when pointer-locked.
      mouseDelta.x += e.movementX;
      mouseDelta.y += e.movementY;
    } else {
      // Fallback for the no-pointer-lock path: compute our own delta from
      // clientX/Y. We track the last seen client position; the very first
      // event primes the tracker instead of applying a fake 0,0 delta.
      if (!lastClient.valid) {
        lastClient.x = e.clientX;
        lastClient.y = e.clientY;
        lastClient.valid = true;
      } else {
        mouseDelta.x += e.clientX - lastClient.x;
        mouseDelta.y += e.clientY - lastClient.y;
        lastClient.x = e.clientX;
        lastClient.y = e.clientY;
      }
    }
  });
  // If the cursor leaves the canvas mid-drag, reset the tracker so re-entry
  // doesn't cause a single huge rotation step.
  canvas.addEventListener("mouseleave", () => {
    lastClient.valid = false;
  });

  // Keyboard: listen on the canvas itself too, so that even if the global
  // window listener in main.ts is somehow shadowed (e.g. when a focused
  // button intercepts), we still get the keys. preventDefault on the
  // movement keys so the browser can't try to scroll/find-on-page.
  const moveKeys = new Set(["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", "shift"]);
  canvas.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    keys.add(k);
    if (moveKeys.has(k)) e.preventDefault();
  });
  canvas.addEventListener("keyup", (e) => {
    keys.delete(e.key.toLowerCase());
  });
  // Keys arriving while the document has focus (e.g. before the canvas
  // has been clicked) also need to land in the Set.
  window.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    keys.add(k);
    if (moveKeys.has(k)) e.preventDefault();
  });
  window.addEventListener("keyup", (e) => {
    keys.delete(e.key.toLowerCase());
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
    const ax = applyWithCollision({ x: player.x, z: player.z }, PLAYER_RADIUS, move.x, 0, OFFICE_BOUNDS, OBSTACLES);
    player.x = ax.x;
    player.z = ax.z;
    const az = applyWithCollision({ x: player.x, z: player.z }, PLAYER_RADIUS, 0, move.z, OFFICE_BOUNDS, OBSTACLES);
    player.x = az.x;
    player.z = az.z;

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

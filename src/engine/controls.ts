/**
 * Player controls: WASD walk + first-person camera + Pattern D mouse-look.
 *
 * State machine (per docs/ADR/0007-mouse-look-pattern-d.md):
 *   FREE_MOUSE (default)        OS cursor visible. WASD moves player.
 *                               Mouse deltas are NOT consumed (the OS cursor
 *                               handles its own movement). LMB raycast and
 *                               click-to-talk are handled by main.ts.
 *   MOUSE_LOOK_HOLD             RMB held. Cursor hidden. Mouse deltas are
 *                               consumed and applied to yaw + pitch.
 *   MOUSE_LOOK_TOGGLE           Space pressed. Same as HOLD, but stays
 *                               engaged until Space or Esc.
 *
 * - WASD or arrow keys move the player in world space (camera-relative).
 * - Shift = sprint.
 * - Mouse-look (RMB hold or Space toggle) updates yaw + pitch directly.
 * - Camera is at player position + (0, EYE_HEIGHT, 0); rotation is
 *   (pitch, yaw, 0) in YXZ order. No avatar visible during play.
 * - E / LMB interact with what is in front (handled by main.ts + the
 *   interaction raycaster; this module exposes getYaw / getPlayerPosition
 *   for the raycaster to use).
 * - Movement uses simple AABB collision against office walls and
 *   obstacles; the math lives in ./collision as a pure function.
 */

import * as THREE from "three";
import { OFFICE_BOUNDS, OBSTACLES } from "../content/npcs";
import { applyWithCollision } from "./collision";

const WALK_SPEED = 3; // units per second
const SPRINT_MULT = 1.6;
const PLAYER_RADIUS = 0.3; // half-width for AABB collision
const MOUSE_SENSITIVITY = 0.0025;
const PITCH_MIN = -0.6; // can look slightly down at the floor
const PITCH_MAX = 0.4; // can look up at a standing NPC's head
const EYE_HEIGHT = 1.65; // C-01: 1.65m, standard eye height for FPS-RPG

/**
 * Pure state for the controls module. Exported for unit testing; the
 * runtime module keeps one of these in a closure and exposes actions
 * through the Controls interface.
 */
export type MouseLookState = "free" | "hold" | "toggle";

export interface ControlsState {
  player: { x: number; y: number; z: number };
  yaw: number;
  pitch: number;
  mouseLook: MouseLookState;
  mouseDelta: { x: number; y: number };
}

/**
 * Pure step function: given a state, dt, and a set of pressed keys,
 * return the next state. Used by the runtime module and by unit tests
 * to validate the math without a real three.js scene.
 */
export function stepControls(
  state: ControlsState,
  dt: number,
  keys: ReadonlySet<string>,
  consumeMouseDelta: () => { x: number; y: number } | null,
): ControlsState {
  // Consume mouse delta only when in a mouse-look state. In free-mouse,
  // the OS cursor owns the movement.
  if (state.mouseLook !== "free") {
    const d = consumeMouseDelta();
    if (d) {
      state.yaw -= d.x * MOUSE_SENSITIVITY;
      state.pitch -= d.y * MOUSE_SENSITIVITY;
      state.pitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, state.pitch));
    }
  } else {
    // Drain any pending deltas so they don't accumulate while in free-mouse.
    consumeMouseDelta();
  }

  // Forward / right from yaw (XZ plane). yaw=0 means facing -Z.
  const forward = { x: -Math.sin(state.yaw), y: 0, z: -Math.cos(state.yaw) };
  const right = { x: Math.cos(state.yaw), y: 0, z: -Math.sin(state.yaw) };

  let mx = 0;
  let mz = 0;
  if (keys.has("w") || keys.has("arrowup")) mz += 1;
  if (keys.has("s") || keys.has("arrowdown")) mz -= 1;
  if (keys.has("a") || keys.has("arrowleft")) mx -= 1;
  if (keys.has("d") || keys.has("arrowright")) mx += 1;
  const sprint = keys.has("shift") ? SPRINT_MULT : 1;

  // Compose + normalize + scale. Pure math.
  let moveX = forward.x * mz + right.x * mx;
  let moveZ = forward.z * mz + right.z * mx;
  const moveLen = Math.hypot(moveX, moveZ);
  if (moveLen > 0) {
    moveX = (moveX / moveLen) * WALK_SPEED * sprint * dt;
    moveZ = (moveZ / moveLen) * WALK_SPEED * sprint * dt;
  }

  // Apply AABB collision on each axis (allow wall sliding). Pure.
  const ax = applyWithCollision(
    { x: state.player.x, z: state.player.z },
    PLAYER_RADIUS,
    moveX,
    0,
    OFFICE_BOUNDS,
    OBSTACLES,
  );
  const az = applyWithCollision(
    { x: ax.x, z: ax.z },
    PLAYER_RADIUS,
    0,
    moveZ,
    OFFICE_BOUNDS,
    OBSTACLES,
  );

  return {
    ...state,
    player: { x: az.x, y: state.player.y, z: az.z },
  };
}

export interface Controls {
  update: (deltaSeconds: number) => void;
  setKeys: (keys: Set<string>) => void;
  setMouseDelta: (dx: number, dy: number) => void;
  setMouseLookActive: (active: boolean) => void; // RMB hold/release
  toggleMouseLook: () => void; // Space
  isMouseLookActive: () => boolean;
  getYaw: () => number;
  getPitch: () => number;
  getPlayerPosition: () => THREE.Vector3;
}

export interface ControlsOptions {
  canvas: HTMLCanvasElement;
  camera: THREE.PerspectiveCamera;
  initialPlayer: THREE.Vector3;
}

export function createControls(opts: ControlsOptions): Controls {
  const { canvas, camera } = opts;
  const player = opts.initialPlayer.clone();

  // Pure state lives here. The runtime module mutates a single
  // ControlsState and runs stepControls() each frame.
  let state: ControlsState = {
    player: { x: player.x, y: player.y, z: player.z },
    yaw: 0,
    pitch: 0,
    mouseLook: "free",
    mouseDelta: { x: 0, y: 0 },
  };

  let keys: Set<string> = new Set();
  let pendingMouseDelta = { x: 0, y: 0 };

  // Suppress the right-click context menu (RMB is for mouse-look).
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());

  // RMB hold: engage mouse-look. RMB release: return to free.
  // We use mousedown/mouseup with button === 2 on the canvas.
  // The OS contextmenu is preventDefault-ed above.
  canvas.addEventListener("mousedown", (e) => {
    if (e.button === 2) {
      state = { ...state, mouseLook: "hold" };
      canvas.style.cursor = "none";
    }
  });
  canvas.addEventListener("mouseup", (e) => {
    if (e.button === 2) {
      if (state.mouseLook === "hold") {
        state = { ...state, mouseLook: "free" };
        canvas.style.cursor = "";
      }
    }
  });
  // If the cursor leaves the canvas mid-RMB-hold, release the hold so
  // the player is not stuck in mouse-look when the cursor goes to the
  // HUD.
  canvas.addEventListener("mouseleave", () => {
    if (state.mouseLook === "hold") {
      state = { ...state, mouseLook: "free" };
      canvas.style.cursor = "";
    }
  });

  // Space toggles mouse-look. Esc releases the toggle.
  window.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (k === " " || e.code === "Space") {
      // Only toggle if the event target is not a text input.
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      e.preventDefault();
      if (state.mouseLook === "free") {
        state = { ...state, mouseLook: "toggle" };
        canvas.style.cursor = "none";
      } else if (state.mouseLook === "toggle") {
        state = { ...state, mouseLook: "free" };
        canvas.style.cursor = "";
      }
    } else if (k === "escape") {
      if (state.mouseLook === "toggle" || state.mouseLook === "hold") {
        state = { ...state, mouseLook: "free" };
        canvas.style.cursor = "";
      }
    }
  });

  // Keyboard movement. Listen on window so the canvas does not need
  // to be focusable. preventDefault on movement keys to keep the
  // browser from scrolling / find-on-page.
  const moveKeys = new Set([
    "w", "a", "s", "d",
    "arrowup", "arrowdown", "arrowleft", "arrowright",
    "shift",
  ]);
  window.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    keys.add(k);
    if (moveKeys.has(k)) e.preventDefault();
  });
  window.addEventListener("keyup", (e) => {
    keys.delete(e.key.toLowerCase());
  });
  // If the window loses focus (alt-tab, click on the address bar,
  // dev tools, OS dialog, ...) the browser drops any in-flight keyup
  // events. The movement key stays in our `keys` Set forever and the
  // player keeps walking in that direction. Clear the set on blur so
  // the player stops immediately when focus is lost. This is the
  // classic "stuck WASD" bug in browser games.
  window.addEventListener("blur", () => {
    keys.clear();
  });
  // Same for the canvas — the page can blur without the window
  // blurring (e.g. when a modal opens and the focus moves inside it).
  canvas.addEventListener("blur", () => {
    keys.clear();
  });
  // Also clear on `visibilitychange` — when the user switches tabs,
  // keyup events may not fire. This is belt-and-braces with `blur`
  // but covers the cases where `blur` doesn't fire (some browsers
  // when the tab is hidden by the OS).
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) keys.clear();
  });

  // Mouse delta: the browser provides movementX/Y when pointer-locked,
  // but we are not using pointer lock (Pattern D uses a free OS cursor
  // by default). We therefore compute deltas from clientX/Y for both
  // the "free" and "look" states, but only CONSUME the delta in
  // stepControls() when mouseLook != "free". The tracking variable
  // lastClient is only updated when in mouse-look, so free-mouse
  // movement does not accumulate spurious deltas.
  let lastClient = { x: 0, y: 0, valid: false };
  document.addEventListener("mousemove", (e) => {
    if (state.mouseLook === "free") {
      // Prime / re-prime the tracker so the first frame after
      // entering mouse-look does not jump.
      lastClient.x = e.clientX;
      lastClient.y = e.clientY;
      lastClient.valid = true;
      return;
    }
    if (!lastClient.valid) {
      lastClient.x = e.clientX;
      lastClient.y = e.clientY;
      lastClient.valid = true;
      return;
    }
    pendingMouseDelta.x += e.clientX - lastClient.x;
    pendingMouseDelta.y += e.clientY - lastClient.y;
    lastClient.x = e.clientX;
    lastClient.y = e.clientY;
  });

  function consumeMouseDelta(): { x: number; y: number } | null {
    if (pendingMouseDelta.x === 0 && pendingMouseDelta.y === 0) return null;
    const d = { x: pendingMouseDelta.x, y: pendingMouseDelta.y };
    pendingMouseDelta.x = 0;
    pendingMouseDelta.y = 0;
    return d;
  }

  function update(dt: number): void {
    // Step the pure state.
    state = stepControls(state, dt, keys, consumeMouseDelta);

    // Apply the player position + camera transform (FPS).
    player.x = state.player.x;
    player.y = state.player.y;
    player.z = state.player.z;

    // Camera at eye height above the player, rotation = (pitch, yaw, 0).
    // YXZ Euler order: yaw first, then pitch, no roll. Standard FPS.
    camera.position.set(player.x, player.y + EYE_HEIGHT, player.z);
    camera.rotation.set(state.pitch, state.yaw, 0, "YXZ");
  }

  return {
    update,
    setKeys: (k) => {
      keys = k;
    },
    setMouseDelta: (dx, dy) => {
      pendingMouseDelta.x += dx;
      pendingMouseDelta.y += dy;
    },
    setMouseLookActive: (active) => {
      state = { ...state, mouseLook: active ? "hold" : "free" };
      canvas.style.cursor = active ? "none" : "";
    },
    toggleMouseLook: () => {
      if (state.mouseLook === "free") {
        state = { ...state, mouseLook: "toggle" };
        canvas.style.cursor = "none";
      } else {
        state = { ...state, mouseLook: "free" };
        canvas.style.cursor = "";
      }
    },
    isMouseLookActive: () => state.mouseLook !== "free",
    getYaw: () => state.yaw,
    getPitch: () => state.pitch,
    getPlayerPosition: () => player.clone(),
  };
}

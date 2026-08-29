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
  destroy: () => void;
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
  const onContextMenu = (e: MouseEvent): void => e.preventDefault();
  canvas.addEventListener("contextmenu", onContextMenu);

  // RMB hold: engage mouse-look. RMB release: return to free.
  // We use mousedown/mouseup with button === 2 on the canvas.
  // The OS contextmenu is preventDefault-ed above.
  const onMouseDown = (e: MouseEvent): void => {
    if (e.button === 2) {
      state = { ...state, mouseLook: "hold" };
      canvas.style.cursor = "none";
    }
  };
  const onMouseUp = (e: MouseEvent): void => {
    if (e.button === 2) {
      if (state.mouseLook === "hold") {
        state = { ...state, mouseLook: "free" };
        canvas.style.cursor = "";
      }
    }
  };
  // If the cursor leaves the canvas mid-RMB-hold, release the hold so
  // the player is not stuck in mouse-look when the cursor goes to the
  // HUD.
  const onMouseLeave = (): void => {
    if (state.mouseLook === "hold") {
      state = { ...state, mouseLook: "free" };
      canvas.style.cursor = "";
    }
  };
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", onMouseLeave);

  // Space toggles mouse-look. Esc releases the toggle.
  const isTextEntryTarget = (target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) return false;
    return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
  };
  const onMouseLookKeyDown = (e: KeyboardEvent): void => {
    const k = e.key.toLowerCase();
    if (k === " " || e.code === "Space") {
      // Only toggle if the event target is not a text input.
      if (isTextEntryTarget(e.target)) return;
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
  };
  window.addEventListener("keydown", onMouseLookKeyDown);

  // Keyboard movement. Listen on window so the canvas does not need
  // to be focusable. preventDefault on movement keys to keep the
  // browser from scrolling / find-on-page.
  //
  // CRITICAL: we identify movement keys by their PHYSICAL `e.code`
  // (e.g. "KeyW"), not by `e.key` ("w" or "W" depending on Shift /
  // layout). `e.key` can differ between keydown and keyup (Caps
  // Lock, Shift released before the letter, IME composition, AZERTY
  // layout where the physical W key produces "z"), which would leave
  // the movement key stuck in our Set forever. `e.code` is
  // keyboard-layout-independent and matches between press and release.
  // The pure stepControls() still reads the lowercase "w"/"a"/"s"/"d"
  // names, so we map the physical code to the logical key here.
  const codeToMoveKey: Readonly<Record<string, string>> = {
    KeyW: "w", KeyA: "a", KeyS: "s", KeyD: "d",
    ArrowUp: "arrowup", ArrowDown: "arrowdown",
    ArrowLeft: "arrowleft", ArrowRight: "arrowright",
    ShiftLeft: "shift", ShiftRight: "shift",
  };
  const keyToMoveKey: Readonly<Record<string, string>> = {
    w: "w", a: "a", s: "s", d: "d",
    arrowup: "arrowup", arrowdown: "arrowdown",
    arrowleft: "arrowleft", arrowright: "arrowright",
    shift: "shift",
  };
  const physicalToMoveKey = (e: KeyboardEvent): string | null => {
    const byCode = codeToMoveKey[e.code];
    if (byCode !== undefined) return byCode;

    // Some embedded/remote browser paths and synthetic KeyboardEvents do
    // not populate `code`. Keep physical codes as the primary identity,
    // but fall back to `key` so a missing code cannot disable WASD.
    return keyToMoveKey[e.key.toLowerCase()] ?? null;
  };
  const onKeyDown = (e: KeyboardEvent): void => {
    const moveKey = physicalToMoveKey(e);
    // eslint-disable-next-line no-console
    console.log("[controls] keydown", { key: e.key, code: e.code, moveKey, target: (e.target as HTMLElement | null)?.tagName });
    if (moveKey === null) return;
    // Don't capture movement when the user is typing into a text
    // input (the character-creation name field, a future text
    // input). Sol found that the old code added every key including
    // Escape and F1, growing the Set unnecessarily.
    if (isTextEntryTarget(e.target)) return;
    keys.add(moveKey);
    // eslint-disable-next-line no-console
    console.log("[controls] keys Set after add", Array.from(keys));
    e.preventDefault();
  };
  const onKeyUp = (e: KeyboardEvent): void => {
    const moveKey = physicalToMoveKey(e);
    // eslint-disable-next-line no-console
    console.log("[controls] keyup", { key: e.key, code: e.code, moveKey, target: (e.target as HTMLElement | null)?.tagName });
    if (moveKey === null) return;
    // Two failure modes in Lucas's runtime:
    //
    //   1. The keyup event's reported `key` does not match the
    //      previously-pressed key (every keyup arrives with `key: 'w'`,
    //      regardless of which key the user released). Trusting the
    //      fallback `key` on the release path leaves the held key in
    //      the Set forever.
    //
    //   2. The keyup arrives in the same browser tick as the keydown.
    //      Even if the release identity were correct, the frame
    //      loop never observes the key in the Set, so the player
    //      does not move.
    //
    // Fix: when `e.code` is empty (Lucas's runtime), schedule the
    // release one frame later. This:
    //   (a) gives the frame loop at least one frame to apply the
    //       input (mode 2);
    //   (b) only removes the *most recently added* key, by re-
    //       ordering the Set's iteration to remove that one. Since
    //       Lucas's runtime fires the keyup immediately after the
    //       keydown, the "most recently added" key is the one the
    //       user just released (mode 1).
    if (e.code === "") {
      // Defer: the Set is observed for one frame with the key in it,
      // then the key is removed.
      requestAnimationFrame(() => {
        // Find the key that was added most recently. The Set in
        // JavaScript preserves insertion order. The last element is
        // the one we just pressed. Remove that one.
        if (keys.size > 0) {
          let lastKey: string | undefined;
          for (const k of keys) lastKey = k;
          if (lastKey !== undefined) keys.delete(lastKey);
        }
        // eslint-disable-next-line no-console
        console.log("[controls] keys Set after deferred delete", Array.from(keys));
      });
    } else {
      keys.delete(moveKey);
    }
    // eslint-disable-next-line no-console
    console.log("[controls] keys Set after delete (sync)", Array.from(keys));
    if (!isTextEntryTarget(e.target)) e.preventDefault();
  };
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  // If the window loses focus (alt-tab, click on the address bar,
  // dev tools, OS dialog, ...) the browser drops any in-flight keyup
  // events. The movement key stays in our `keys` Set forever and the
  // player keeps walking in that direction. Clear the set on blur so
  // the player stops immediately when focus is lost. This is the
  // classic "stuck WASD" bug in browser games.
  const onClearInput = (): void => keys.clear();
  window.addEventListener("blur", onClearInput);
  // Same for the canvas — the page can blur without the window
  // blurring (e.g. when a modal opens and the focus moves inside it).
  canvas.addEventListener("blur", onClearInput);
  // Also clear on `visibilitychange` and `pagehide` — when the user
  // switches tabs or the OS hides the window, keyup events may not
  // fire. This is belt-and-braces with `blur` but covers the cases
  // where `blur` doesn't fire (some browsers when the tab is hidden
  // by the OS).
  const onVisibilityChange = (): void => {
    if (document.hidden) onClearInput();
  };
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("pagehide", onClearInput);

  // Mouse delta: the browser provides movementX/Y when pointer-locked,
  // but we are not using pointer lock (Pattern D uses a free OS cursor
  // by default). We therefore compute deltas from clientX/Y for both
  // the "free" and "look" states, but only CONSUME the delta in
  // stepControls() when mouseLook != "free". The tracking variable
  // lastClient is only updated when in mouse-look, so free-mouse
  // movement does not accumulate spurious deltas.
  let lastClient = { x: 0, y: 0, valid: false };
  const onMouseMove = (e: MouseEvent): void => {
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
  };
  document.addEventListener("mousemove", onMouseMove);

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
    /**
     * Remove every event listener this Controls instance registered.
     * Without this, the listeners stay installed for the lifetime of
     * the page, so integration tests that call createControls()
     * multiple times leak listeners into each other (and HMR reloads
     * leave the old listeners behind). Test code MUST call destroy()
     * in afterEach().
     */
    destroy: () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keydown", onMouseLookKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onClearInput);
      window.removeEventListener("pagehide", onClearInput);
      canvas.removeEventListener("blur", onClearInput);
      canvas.removeEventListener("contextmenu", onContextMenu);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("mousemove", onMouseMove);
    },
  };
}

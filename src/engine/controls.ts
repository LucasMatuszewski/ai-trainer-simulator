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
import { OBSTACLES } from "../content/npcs";
import { WORLD_BOUNDS, WORLD_COLLISION_WALLS } from "../content/world-layout";
import { applyWithCollision } from "./collision";

const WALK_SPEED = 4.5; // units per second
const SPRINT_MULT = 1.8;
const PLAYER_RADIUS = 0.3; // half-width for AABB collision
// 0.0025 rad/px made a medium flick swing the view wildly once OS
// acceleration multiplied the deltas (Lucas: "rotation accelerates
// suddenly"). 0.0014 keeps slow pans precise and flicks bounded.
const MOUSE_SENSITIVITY = 0.0014;
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
    WORLD_BOUNDS,
    [...OBSTACLES, ...WORLD_COLLISION_WALLS],
  );
  const az = applyWithCollision(
    { x: ax.x, z: ax.z },
    PLAYER_RADIUS,
    0,
    moveZ,
    WORLD_BOUNDS,
    [...OBSTACLES, ...WORLD_COLLISION_WALLS],
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
  // Press order. When a key is pressed we append to this list;
  // when the keyup arrives we remove the corresponding entry. The
  // Set preserves insertion order, so iterating `keys` gives the
  // same order, but a separate list is clearer and lets us pop
  // the most-recently-pressed key for the deferred-release flush.
  // L-2026-08-30: the previous "last" implementation broke
  // diagonal movement (press W then D, release W deletes D).
  let keyOrder: string[] = [];
  // When the runtime supplies code-less events whose reported `key` is
  // unreliable, the keyup handler queues a "last" release here
  // instead of deleting `key` directly (which would leave the actual
  // pressed key held forever). The `update` method flushes the queue
  // AFTER moving, so the held key is observed by the frame loop
  // for at least one frame before being released.
  let pendingReleases: string[] = [];
  let pendingMouseDelta = { x: 0, y: 0 };

  // Suppress the right-click context menu (RMB is for mouse-look).
  const onContextMenu = (e: MouseEvent): void => e.preventDefault();
  canvas.addEventListener("contextmenu", onContextMenu);

  // C-48: two mouse modes, the standard game pattern.
  //  - FREE mouse (default): the OS cursor is visible; hover labels
  //    and LMB click-to-talk work; HUD is interactive.
  //  - MOUSE-LOOK (RMB hold or Space toggle): the cursor is captured
  //    with the POINTER LOCK API, so it cannot leave the window, hit
  //    the roster, or pop the OS context menu - rotation keeps running
  //    no matter where the (now invisible) pointer would drift.
  // If pointer lock is unavailable or rejected (iframes, some
  // browsers), we degrade gracefully to the old cursor-hidden look.
  const syncMouseLook = (mouseLook: ControlsState["mouseLook"]): void => {
    state = { ...state, mouseLook };
    canvas.style.cursor = mouseLook === "free" ? "" : "none";
  };
  const requestLookLock = (): void => {
    const canvasWithLock = canvas as HTMLCanvasElement & {
      requestPointerLock?: (options?: { unadjustedMovement?: boolean }) => Promise<void> | void;
    };
    // unadjustedMovement: true bypasses the OS mouse-acceleration
    // curve ("Enhance pointer precision"); without it, fast flicks
    // arrive multiplied 2-3x and the camera suddenly spins (Lucas).
    // Falls back to the plain request, then to cursor-only look.
    try {
      const raw = canvasWithLock.requestPointerLock?.({ unadjustedMovement: true });
      if (raw && typeof (raw as Promise<void>).catch === "function") {
        (raw as Promise<void>).catch(() => {
          const plain = canvasWithLock.requestPointerLock?.();
          if (plain && typeof (plain as Promise<void>).catch === "function") {
            (plain as Promise<void>).catch(() => { /* cursor-only fallback */ });
          }
        });
      }
    } catch {
      // Browser without the options overload: plain request.
      canvasWithLock.requestPointerLock?.();
    }
  };
  const releaseLookLock = (): void => {
    if (typeof document !== "undefined" && document.pointerLockElement === canvas) {
      document.exitPointerLock();
    }
  };
  // The browser can exit pointer lock on its own (Esc). Re-sync our
  // state so the player is not stuck in a look mode with no lock.
  const onPointerLockChange = (): void => {
    if (document.pointerLockElement !== canvas && state.mouseLook !== "free") {
      syncMouseLook("free");
    }
  };
  document.addEventListener("pointerlockchange", onPointerLockChange);

  // RMB hold: engage mouse-look. RMB release: return to free.
  // We use mousedown/mouseup with button === 2 on the canvas.
  // The OS contextmenu is preventDefault-ed above.
  const onMouseDown = (e: MouseEvent): void => {
    if (e.button === 2) {
      syncMouseLook("hold");
      requestLookLock();
    }
  };
  const onMouseUp = (e: MouseEvent): void => {
    if (e.button === 2) {
      if (state.mouseLook === "hold") {
        syncMouseLook("free");
        releaseLookLock();
      }
    }
  };
  // If the cursor leaves the canvas mid-RMB-hold (pointer lock
  // unavailable), release the hold so the player is not stuck in
  // mouse-look when the cursor goes to the HUD.
  const onMouseLeave = (): void => {
    if (state.mouseLook === "hold") {
      syncMouseLook("free");
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
        syncMouseLook("toggle");
        requestLookLock();
      } else if (state.mouseLook === "toggle") {
        syncMouseLook("free");
        releaseLookLock();
      }
    } else if (k === "escape") {
      if (state.mouseLook === "toggle" || state.mouseLook === "hold") {
        syncMouseLook("free");
        releaseLookLock();
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
    if (moveKey === null) return;
    // Don't capture movement when the user is typing into a text
    // input (the character-creation name field, a future text
    // input). Sol found that the old code added every key including
    // Escape and F1, growing the Set unnecessarily.
    if (isTextEntryTarget(e.target)) return;
    if (!keys.has(moveKey)) {
      keyOrder.push(moveKey);
    }
    keys.add(moveKey);
    e.preventDefault();
  };
  const onKeyUp = (e: KeyboardEvent): void => {
    const moveKey = physicalToMoveKey(e);
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
    // Fix: when `e.code` is empty (Lucas's runtime), queue a release
    // of the most-recently-added key. The `update` method flushes
    // the queue AFTER moving, so the player observes the key in
    // the Set for the frame between the press and the release. This
    // gives the frame loop at least one frame to apply the input
    // (fixes failure mode 2) AND removes the actual pressed key
    // (the mislabeled 'w' in the event does not match any held key,
    // so it cannot be deleted directly; the Set preserves insertion
    // order and the most-recently-added entry is the one the user
    // actually pressed — fix for failure mode 1).
    //
    // L-2026-08-30 (Lucas): "I still can't move combining WSAD
    // keys". The earlier 'last' approach used the last entry of
    // the Set, which BREAKS diagonal movement: press W then D,
    // release W. Set is {w, d}; last = d. Deferred flush deletes
    // d, leaving w. So pressing D did not stick. The fix: track
    // the press order (a stack of keys), and use the TOP of the
    // stack (last-pressed) as the deferred-release target.
    if (e.code === "") {
      pendingReleases.push("last");
    } else {
      keys.delete(moveKey);
      const i = keyOrder.indexOf(moveKey);
      if (i >= 0) keyOrder.splice(i, 1);
    }
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
  const onClearInput = (): void => {
    keys.clear();
    keyOrder = [];
  };
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

  // Mouse delta (C-48): mouse-look consumes RAW movementX/Y deltas -
  // they work identically pointer-locked and unlocked, and never
  // produce the stale-client "jump" the previous clientX/Y tracker
  // could inject on lock exit/re-enter (Lucas: rotation suddenly
  // "spins like crazy"). Each EVENT is clamped (not the per-frame
  // sum): clamping per event keeps rotation proportional to real
  // hand speed - a per-frame cap would saturate with high-polling
  // mice (hundreds of px/frame => constant max-rate spin) - while a
  // single glitch event (lock transition, OS hiccup) can still never
  // whip the camera.
  const MOUSE_EVENT_MAX_DELTA = 25;
  const MOUSE_FRAME_MAX_DELTA = 80;
  const clampTo = (limit: number, v: number): number =>
    Math.max(-limit, Math.min(limit, v));
  const onMouseMove = (e: MouseEvent): void => {
    if (state.mouseLook === "free") return;
    pendingMouseDelta.x += clampTo(MOUSE_EVENT_MAX_DELTA, e.movementX ?? 0);
    pendingMouseDelta.y += clampTo(MOUSE_EVENT_MAX_DELTA, e.movementY ?? 0);
  };
  document.addEventListener("mousemove", onMouseMove);

  function consumeMouseDelta(): { x: number; y: number } | null {
    if (pendingMouseDelta.x === 0 && pendingMouseDelta.y === 0) return null;
    // Events are clamped at accumulation time; this second, generous
    // per-frame cap only trims pathological frames (lock transitions).
    const d = {
      x: clampTo(MOUSE_FRAME_MAX_DELTA, pendingMouseDelta.x),
      y: clampTo(MOUSE_FRAME_MAX_DELTA, pendingMouseDelta.y),
    };
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

    // Flush deferred releases from code-less keyup events. The
    // `stepControls` call above has already read the `keys` Set, so
    // applying the releases now does not affect this frame's
    // movement. The next frame starts with the released Set.
    //
    // L-2026-08-30 (Lucas): the previous "delete the last key in
    // the Set" implementation broke diagonal movement because the
    // Set's iteration order is insertion order, not LIFO press
    // order. Pressing W then D gave Set={w, d}; releasing W deleted
    // d (the "last" iterated value). The fix: use `keyOrder`, the
    // LIFO press stack. The most-recently-pressed key is the top.
    if (pendingReleases.length > 0) {
      for (const _ of pendingReleases) {
        if (keyOrder.length > 0) {
          const top = keyOrder.pop();
          if (top !== undefined) {
            keys.delete(top);
          }
        }
      }
      pendingReleases = [];
    }
  }

  return {
    update,
    setKeys: (k) => {
      keys = k;
      // Re-derive the press order from the new Set so the deferred
      // flush (which pops from `keyOrder`) keeps working after a
      // synthetic setKeys call. We use Set iteration order, which
      // for an externally-supplied Set is undefined per the spec, so
      // we copy the keys out and trust the caller's insertion order.
      keyOrder = Array.from(k);
    },
    setMouseDelta: (dx, dy) => {
      pendingMouseDelta.x += dx;
      pendingMouseDelta.y += dy;
    },
    setMouseLookActive: (active) => {
      // Synthetic/external switch (tests, WebMCP): never grab the
      // pointer lock here - it requires a user gesture anyway. The
      // cursor fallback keeps the state machine consistent.
      syncMouseLook(active ? "hold" : "free");
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
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("mousemove", onMouseMove);
    },
  };
}

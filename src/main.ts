/**
 * AI Trainer Simulator - main entry point.
 *
 * Wires the engine, game state, UI, dialogue, and mini-games into a single game loop.
 *
 * Phase 2 (current): first-person camera (C-01) + Pattern D mouse-look
 * (ADR-0007). The player walks around the office with WASD, looks with
 * RMB-hold or Space-toggle, and clicks NPCs with LMB to start a
 * conversation. The roster remains a parallel input — clicking a
 * roster card also walks to the NPC and opens the dialogue.
 *
 * See docs/ADR/0007-mouse-look-pattern-d.md for the full design and
 * the pattern's rationale.
 */

import "./style.css";
import * as THREE from "three";
import { createEngine, type Engine } from "./engine/renderer";
import { buildOfficeScene } from "./engine/scene";
import { createCameraDirector, type CameraDirector } from "./engine/camera-director";
import { createControls, type Controls } from "./engine/controls";
import { game } from "./game/state";
import { runDailyTick, publishCashflow } from "./game/economy";
import { runPeriodEvent, registerNpcController } from "./game/events";
import { registerPlayerActions } from "./webmcp/tools";
import { NPCS, OBSTACLES } from "./content/npcs";
import { LUNCH_WINDOW_SECONDS } from "./content/npc-schedule";
import type { GameState, NPC, NpcId } from "./types";
import { mountHud, renderHud, showToast, type HudElements } from "./ui/hud";
import { mountFpsMeter, type FpsMeter } from "./ui/fps-meter";
import { mountTitleScreen, mountCharacterCreate, showDailySummary, showGameOver } from "./ui/title";
import { mountOfficeRoster, rosterStatusFor, type OfficeRosterHandle } from "./ui/office-roster";
import {
  closeDialogueForScreenTransition,
  createDialogue,
  type DialogueController,
} from "./ui/dialogue";
import { mountDebugScript, type DebugScriptHandle } from "./minigames/debug-script";
import { audio, type MusicId } from "./audio/AudioManager";
import { resolveUrl, type Manifest, loadManifest } from "./audio/manifest";
import { SECONDS_PER_PERIOD, periodsUntilDayEnd } from "./game/pacing";
import { mountQuestLog, type QuestLogHandle } from "./ui/quest-log";
import { mountHelpModal, type HelpModalHandle } from "./ui/help-modal";
import { ndcFromMouse, pickFromCamera } from "./engine/interaction-raycaster";
import { PLAYER_RADIUS, getMouseSensitivity, setMouseSensitivity } from "./engine/controls";
import { pushOutOfObstacles } from "./engine/collision";
import { planWalkToFace } from "./engine/walk-to-face";
import { WORLD_BOUNDS, WORLD_COLLISION_WALLS } from "./content/world-layout";

type Screen = "title" | "create" | "office" | "summary" | "minigame" | "gameover";

const uiRoot = document.getElementById("ui-root")!;
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

let engine: Engine | null = null;
let cameraDirector: CameraDirector | null = null;
let sceneObjects: ReturnType<typeof buildOfficeScene> | null = null;
let controls: Controls | null = null;
let raycaster: THREE.Raycaster | null = null;
let screen: Screen = "title";
let hud: HudElements | null = null;
let dialogue: DialogueController | null = null;
let debugGame: DebugScriptHandle | null = null;
let roster: OfficeRosterHandle | null = null;
let questLog: QuestLogHandle | null = null;
let helpModal: HelpModalHandle | null = null;
let unsubscribeGame: (() => void) | null = null;
let focusedNpcId: NpcId | null = null;
// C-54: who the currently-open player dialogue is with (null when
// none). The dialogue controller is created once, so its close
// callback cannot capture the per-conversation NPC.
let dialogueNpcId: NpcId | null = null;
let officeStartedAt = 0;
let lastTime = performance.now();
// C-46: seconds elapsed inside the CURRENT period, updated each frame
// from the same clock the period advancement uses. The lunch window
// is the first LUNCH_WINDOW_SECONDS of the afternoon.
let currentPeriodElapsed = 0;
// C-46 hover label state: the last pointer position over the canvas
// (the raycast itself runs once per frame in updateHoverLabel so the
// label tracks NPCs that move under a still cursor).
let hoverLabel: HTMLDivElement | null = null;
let pointerClientX = 0;
let pointerClientY = 0;
let pointerInsideCanvas = false;
let lastRosterRefreshAt = 0;
/**
 * True while the day-1 intro cinematic is animating the camera. While
 * set, the controls do not write to the camera (their default would
 * snap the camera back to the player each frame). Cleared once the
 * cinematic resolves.
 */
let cinematicPlaying = false;

// NPC face-toward-player animation. When the player starts a
// conversation, the NPC smoothly rotates to face the player. When
// the dialogue closes, the NPC returns to its schedule-driven yaw.
// Each map holds the data needed to drive the interpolation: the
// current target yaw, and the schedule yaw to restore on close.
// C-65: the F3 frame-time meter. Mounted once for the life of the page
// rather than per screen, so a measurement survives menu/office
// transitions and #ui-root being cleared by setScreen.
let fpsMeter: FpsMeter | null = null;

const npcFaceAnimations = new Map<string, number>(); // npcId -> target yaw
const npcScheduleYaws = new Map<string, number>();    // npcId -> schedule yaw

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (dialogue?.isOpen()) dialogue.close();
    return;
  }
  // C-66: Renata and the roster's keycap both promise Z = End Day.
  // Keep it inert outside the office and while the player is reading
  // a modal/dialogue so a stray key cannot discard their current flow.
  if ((e.code === "KeyZ" || e.key.toLowerCase() === "z") && !e.repeat) {
    const target = e.target;
    const isTextEntry = target instanceof HTMLElement && (
      target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable
    );
    if (
      !isTextEntry &&
      screen === "office" &&
      !dialogue?.isOpen() &&
      !helpModal?.isOpen()
    ) {
      e.preventDefault();
      endDay();
    }
  }
});

function setScreen(next: Screen): void {
  closeDialogueForScreenTransition(dialogue);
  const prevScreen = screen;
  screen = next;
  if (next !== "minigame" && next !== "summary" && next !== "gameover") {
    uiRoot.innerHTML = "";
  }
  if (prevScreen !== next) {
    onScreenMusicChange(next, prevScreen);
  }
}

let cachedManifest: Manifest | null = null;
async function getManifest(): Promise<Manifest | null> {
  if (cachedManifest) return cachedManifest;
  cachedManifest = await loadManifest();
  return cachedManifest;
}

function musicUrl(id: MusicId): string | null {
  return resolveUrl(cachedManifest, id);
}

function onScreenMusicChange(next: Screen, _prev: Screen): void {
  void (async () => {
    await audio().init();
    if (!audio().context) return;
    cachedManifest = await getManifest();
    const a = audio();
    a.music.attachContext(a.context!);
    a.sfx.attachContext(a.context!);
    a.tts.attachContext(a.context!);
    if (next === "title") a.music.play("music_title", musicUrl("music_title"), { loop: false, fadeMs: 800 });
    else if (next === "create" || next === "office") a.music.play("music_office_ambient", musicUrl("music_office_ambient"), { loop: true, fadeMs: 1200 });
    else if (next === "minigame") a.music.play("music_minigame_debug", musicUrl("music_minigame_debug"), { loop: true, fadeMs: 400 });
    else if (next === "summary") a.music.play("music_day_end_calm", musicUrl("music_day_end_calm"), { loop: false, fadeMs: 800 });
    else if (next === "gameover") a.music.play("music_minigame_lose", musicUrl("music_minigame_lose"), { loop: false, fadeMs: 400 });
  })();
}

function showTitle(): void {
  setScreen("title");
  mountTitleScreen(uiRoot, hasSave(), () => showCharacterCreate(), () => startOffice());
}

function hasSave(): boolean {
  return localStorage.getItem("aitrainer:save:v1") !== null;
}

function showCharacterCreate(): void {
  setScreen("create");
  mountCharacterCreate(
    uiRoot,
    (data) => {
      game.dispatch({ type: "reset" });
      game.dispatch({ type: "load", state: { ...game.get(), character: { ...data }, stats: applyTrait(data.trait, game.get().stats) } });
      // First time the player reaches the office: play the day-1 intro
      // cinematic. On Continue (returning save), skip it.
      const isFirstRun = !game.get().flags["_intro-played"];
      if (isFirstRun) {
        game.dispatch({ type: "set-flag", flag: "_intro-played", value: true });
      }
      startOffice(isFirstRun);
    },
    () => showTitle(),
  );
}

function applyTrait(trait: string, stats: GameState["stats"]): GameState["stats"] {
  switch (trait) {
    case "coffee-fueled":
      return { ...stats, caffeine: stats.caffeine + 10, patience: stats.patience - 5 };
    case "linkedin-influencer":
      return { ...stats, credibility: stats.credibility + 10 };
    case "debugger":
      return { ...stats, focus: stats.focus + 10, caffeine: stats.caffeine - 5 };
    case "wing-it":
      return {
        credibility: stats.credibility + 5,
        caffeine: stats.caffeine + 5,
        patience: stats.patience + 5,
        focus: stats.focus + 5,
      };
  }
  return stats;
}

function focusNpc(id: NpcId | null): void {
  focusedNpcId = id;
  if (!cameraDirector || !engine || !sceneObjects) return;
  if (id === null) {
    // Phase 2 (C-01, ADR-0007): the controls own the camera every
    // frame in the office. focusNpc(null) only has to cancel any
    // in-flight camera animation (so it doesn't fight the controls
    // for the camera) and clear the focused NPC. The next
    // controls.update() call will set the camera to the player at
    // eye height, looking down -Z (the default rotation).
    cameraDirector.cancel();
    return;
  }
  const npc = NPCS.find((n) => n.id === id);
  if (!npc) return;
  // L-2026-08-30 (Lucas): "clicking on NPC name should move
  // camera to the NPC model object, not to the fixed desk". The
  // NPC may have walked away from their desk for a random
  // meeting/coffee/toilet break. Use the LIVE position from
  // the scene's mesh, not the static npc.position (which is
  // the desk).
  const liveMesh = sceneObjects.npcMeshes.get(id) ?? sceneObjects.npcObjects[id];
  const livePos = liveMesh?.position;
  const targetX = livePos?.x ?? npc.position.x;
  const targetZ = livePos?.z ?? npc.position.z;
  const targetY = (livePos?.y ?? npc.position.y) + 0.6;
  // Roster-driven NPC focus: still pan the camera to frame the NPC.
  // The controls will continue to update the player position from
  // WASD, so the player can still walk during the pan.
  const target = new THREE.Vector3(targetX, targetY, targetZ);
  const offset = new THREE.Vector3(0, 1.6, 3.2);
  cameraDirector.panTo(target, offset);
}

/**
 * C-46: the lunch dialogue window is the first LUNCH_WINDOW_SECONDS
 * of the afternoon period, measured on the same wall clock the period
 * advancement uses. Injected into the NPC controller so lunch lines
 * fire by TIME - wherever the NPCs happen to be standing.
 */
function isLunchActive(): boolean {
  return game.get().timeOfDay === "afternoon" && currentPeriodElapsed < LUNCH_WINDOW_SECONDS;
}

function startOffice(playIntro = false): void {
  setScreen("office");
  if (!engine) {
    engine = createEngine(canvas);
    const built = buildOfficeScene(
      engine.scene,
      () => game.get().timeOfDay,
      () => game.get().day,
      isLunchActive,
    );
    sceneObjects = built;
    // C-61 fix: hand the REAL engine camera to the bubble system. DOM
    // bubbles project with it every frame - the sprite renderer ignored
    // cameras, so nothing needed this wiring before.
    built.npcController.setBubblesCamera(engine.camera);
    // L-2026-08-30-01: register the NPC controller with the events
    // dispatcher so every period transition can roll a random
    // destination (kitchen, toilet, meeting, training) and install
    // it as the NPC's schedule override.
    registerNpcController({
      setOverride: (id, entry) => built.npcController.setOverride(id, entry),
      getNpcIds: () => built.npcController.getNpcIds(),
      hasArrived: (id) => built.npcController.hasArrived(id),
    });
    // L-2026-08-30-01: wire the WebMCP player-action hooks so an
    // external agent can play the game the same way the user does
    // (talk to NPCs, pick dialogue options, end the day, run the
    // minigame). See webmcp/tools.ts for the player-side tool set.
    registerPlayerActions({
      isDialogueOpen: () => dialogue?.isOpen() ?? false,
      openDialogue: (npcId) => {
        const npc = NPCS.find((n) => n.id === npcId);
        if (!npc) return false;
        openDialogueWith(npc);
        return dialogue?.isOpen() ?? false;
      },
      pickDialogueOption: (optionId) => dialogue?.pickOption(optionId) ?? false,
      closeDialogue: () => {
        if (!dialogue?.isOpen()) return false;
        dialogue.close();
        return true;
      },
      endDay: () => {
        endDay();
        return true;
      },
      openMinigame: () => {
        openDebugMinigame();
        return true;
      },
      getDialogueSnapshot: () => dialogue?.snapshot() ?? null,
    });
    cameraDirector = createCameraDirector(engine.camera);
    // Phase 2: WASD walk + first-person camera (C-01) + Pattern D
    // mouse-look (ADR-0007). The player starts at the office door
    // (z=6, looking into the office at -Z). The controls own the
    // camera position and rotation from this point on; the camera
    // director is still used for the intro cinematic and any
    // future scripted camera moves (but is cancelled by the first
    // controls.update() call).
    //
    // C-58: Continue (a returning save after a page load) restores the
    // last persisted pose instead - position + view yaw/pitch. A fresh
    // game has no saved pose (the reset dispatch drops it) and falls
    // through to the door spawn. pushOutOfObstacles nudges a stale
    // coordinate out of furniture that moved since the save (layouts
    // change between builds - e.g. the C-57 toilet relocation), so a
    // saved spot can never trap the player inside a desk.
    const savedPose = game.get().playerPose;
    const startPose = sceneObjects.playerStart.clone();
    let startYaw = 0;
    let startPitch = 0;
    if (savedPose && Number.isFinite(savedPose.x) && Number.isFinite(savedPose.z)) {
      const spot = pushOutOfObstacles(
        { x: savedPose.x, z: savedPose.z },
        PLAYER_RADIUS,
        WORLD_BOUNDS,
        [...OBSTACLES, ...WORLD_COLLISION_WALLS],
      );
      startPose.set(spot.x, startPose.y, spot.z);
      if (Number.isFinite(savedPose.yaw)) startYaw = savedPose.yaw;
      if (Number.isFinite(savedPose.pitch)) startPitch = savedPose.pitch;
    }
    controls = createControls({
      canvas,
      camera: engine.camera,
      initialPlayer: startPose,
      initialYaw: startYaw,
      initialPitch: startPitch,
    });
    raycaster = new THREE.Raycaster();
    // LMB click-to-talk in free-mouse mode (Pattern D). The handler
    // is a closure over sceneObjects and the dialogue state so it
    // always sees the latest references. We add it once on the
    // canvas — re-adding on every startOffice() would duplicate the
    // handler. The `controls?.isMouseLookActive()` check skips the
    // raycast when we're in mouse-look (the LMB should be the
    // "interact with crosshair target" action there, not the free
    // raycast — that comes in a later commit).
    canvas.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return; // LMB only
      if (!controls || !sceneObjects || !engine) return;
      if (controls.isMouseLookActive()) return;
      if (dialogue?.isOpen()) return;
      const rect = canvas.getBoundingClientRect();
      const ndc = ndcFromMouse(e.clientX, e.clientY, rect);
      raycaster!.setFromCamera(new THREE.Vector2(ndc.x, ndc.y), engine.camera);
      // Debug: log whatever is under the cursor (walks up the parent
      // chain so we always see a name, even for child meshes like the
      // "clothing-shirt" or "monitor" sub-parts of a desk group).
      const debugHits = raycaster!.intersectObjects(engine.scene.children, true);
      for (const h of debugHits.slice(0, 5)) {
        let o: THREE.Object3D | null = h.object;
        const names: string[] = [];
        while (o) {
          if (o.name) names.push(o.name);
          o = o.parent;
        }
        const worldPos = h.object.getWorldPosition(new THREE.Vector3());
        // eslint-disable-next-line no-console
        console.info(
          `[click] ${names.join(" < ") || "(unnamed)"}`,
          `\n  local: (${h.object.position.x.toFixed(2)}, ${h.object.position.y.toFixed(2)}, ${h.object.position.z.toFixed(2)})`,
          `\n  world: (${worldPos.x.toFixed(2)}, ${worldPos.y.toFixed(2)}, ${worldPos.z.toFixed(2)})`,
          `\n  dist: ${h.distance.toFixed(2)}m`,
        );
      }
      const hit = pickFromCamera({
        raycaster: raycaster!,
        npcMeshes: sceneObjects.npcMeshes,
        interactableMeshes: sceneObjects.interactableMeshes,
        // C-46: 25 m so NPCs at the far desks (12.5 m+ from the wide
        // shot) and the CEO behind his glass are hoverable/clickable.
        maxDistance: 25,
      });
      if (hit.kind === "npc") {
        // C-46: an NPC who is not in the office (gone-home) cannot be
        // talked to - same rule as the disabled roster card.
        const target = NPCS.find((n) => n.id === hit.npcId);
        const targetObject = sceneObjects.npcObjects[hit.npcId as NpcId];
        if (target && targetObject && !targetObject.visible) {
          if (hud) showToast(hud, `${target.name} is not in the office right now.`, "info");
          return;
        }
        if (target) openDialogueWith(target);
      }
      // hit.kind === "object" -> activate it (Phase 4)
      // hit.kind === "none"   -> no-op
    });
    // C-46 hover labels: remember where the pointer is; the per-frame
    // updateHoverLabel() does the (cheap) raycast so the label keeps
    // tracking an NPC that walks under a still cursor.
    canvas.addEventListener("pointermove", (e) => {
      pointerClientX = e.clientX;
      pointerClientY = e.clientY;
      pointerInsideCanvas = true;
    });
    canvas.addEventListener("pointerleave", () => {
      pointerInsideCanvas = false;
    });
    focusNpc(null);
  }
  // Always re-frame to the wide office shot when entering office screen.
  focusNpc(null);
  officeStartedAt = performance.now();
  focusedNpcId = null;

  hud = mountHud(uiRoot);
  roster = mountOfficeRoster(
    uiRoot,
    NPCS,
    (npc) => openDialogueWith(npc),
    () => endDay(),
    () => openDebugMinigame(),
    game.get().flags["got-acme-contract"] === true,
  );
  questLog = mountQuestLog(uiRoot);
  helpModal = mountHelpModal(uiRoot);
  // C-46: the NPC hover label lives in uiRoot so it is wiped with the
  // rest of the office UI on screen transitions and remounted here.
  hoverLabel = document.createElement("div");
  hoverLabel.className = "npc-hover-label";
  hoverLabel.hidden = true;
  uiRoot.appendChild(hoverLabel);
  // Wire the "?" button in the quest log to open the help modal.
  // The handle exposes the button directly to avoid a circular import
  // between quest-log and help-modal.
  questLog.helpButton.addEventListener("click", () => helpModal?.open());
  refreshRoster();

  if (playIntro) {
    void playIntroCinematic();
  } else {
    // Show the active quest in the quest log right away for returning players.
    questLog.refresh(game.get());
  }

  // Re-entering the office after each day remounts the UI. Replace the prior
  // subscription so stale closures do not accumulate and refresh detached UI.
  unsubscribeGame?.();
  unsubscribeGame = game.subscribe(() => {
    if (hud) renderHud(hud, game.get());
    if (questLog) questLog.refresh(game.get());
    refreshRoster();
    // Cash register SFX when cash goes up.
    const cur = game.get();
    if (hud) {
      if (cur.cash > prevCash) audio().sfx.play("sfx_cash_register");
      if (cur.stats.patience < prevPatience - 3 || cur.stats.credibility < prevCredibility - 3) {
        audio().sfx.play("sfx_error_buzzer");
      }
    }
    prevCash = cur.cash;
    prevPatience = cur.stats.patience;
    prevCredibility = cur.stats.credibility;
  });
  if (hud) renderHud(hud, game.get());

  if (!game.get().flags["_seen-intro-toast"]) {
    game.dispatch({ type: "set-flag", flag: "_seen-intro-toast", value: true });
    setTimeout(() => {
      if (hud) showToast(hud, "Click a coworker to talk. Use the computer once you have a contract. End day when you are done.", "info");
    }, 400);
  }

  // Fire a morning random event a moment after the office loads, so the
  // player sees the simulation humming right away. Skip on the very first
  // entry to avoid stacking with the intro toast.
  if (game.get().flags["_seen-intro-toast"]) {
    setTimeout(() => {
      runPeriodEvent(hud, "morning");
    }, 1200);
  }
}

let prevCash = 0;
let prevPatience = 0;
let prevCredibility = 0;

/**
 * Day-1 intro cinematic. Placed in main.ts because it touches the engine
 * + UI directly and the timing is tied to other state changes. Kept small
 * and self-contained so the Quest Log can be its own file.
 *
 * C-62 (Lucas): the sweep starts at a bird's-eye view of the WHOLE
 * building and dives into the meeting room, landing exactly at the
 * player's start pose - eye height, facing north through the doorway
 * into the office, where the morning arrivals walk in with you.
 *
 * The cinematic does 4 things in 4.5s:
 *   1. Fade from black (0.4s)
 *   2. Bird's-eye establishing shot of the whole building. 0.5s.
 *   3. Long dive from the sky into the meeting room. 3.0s.
 *   4. Land at the player's start pose, view through the door. 1.0s.
 *
 * During the cinematic, the quest log fades in at step 4 so the player
 * sees "Talk to Bartek" the moment the world becomes interactive.
 */
async function playIntroCinematic(): Promise<void> {
  if (!engine) return;
  // Pause time during the cinematic; the day timer starts AFTER.
  cinematicPlaying = true;
  const cinematicStartMs = performance.now();
  const CINEMATIC_DURATION_MS = 4500;

  // Step 1: fade from black via a CSS overlay.
  const overlay = document.createElement("div");
  overlay.className = "intro-fade";
  uiRoot.appendChild(overlay);
  // Force a layout pass so the initial opacity:1 actually paints before
  // we transition to 0.
  void overlay.offsetHeight;
  requestAnimationFrame(() => overlay.classList.add("fade-out"));
  // After the fade transition (600ms in style.css), remove the
  // overlay from the DOM entirely. Leaving it at opacity:0 with
  // pointer-events:none still intercepts pointer events in some
  // test runners (Playwright sees the element bounding box and
  // reports it as "obscuring the click target"), so we clean it up.
  setTimeout(() => overlay.remove(), 700);

  // Step 2: bird's-eye establishing shot - the whole building in frame
  // (office + meeting room south, kitchen/training east).
  engine.camera.position.set(30, 50, 70);
  engine.camera.lookAt(5, 0, 2);
  engine.camera.fov = 55;
  engine.camera.updateProjectionMatrix();

  const cam = engine.camera;
  const fromPos = cam.position.clone();
  const fromFov = cam.fov;
  // Final framing = the player's own FPS pose: eye height at the
  // meeting-room start, looking -Z through the doorway into the office.
  // When the cinematic ends, focusNpc(null) hands the camera to the
  // controls and the view does not move a single frame.
  const toPos = new THREE.Vector3(0, 1.65, 17.8);
  const toFov = 40;

  try {
    await new Promise<void>((resolve) => {
      function step(): void {
        const elapsed = performance.now() - cinematicStartMs;
        const t = Math.min(1, elapsed / CINEMATIC_DURATION_MS);
        // 0..0.5s = fade in + establishing shot holds; 0.5..1.0 = dive
        // + fov tighten.
        const u = Math.max(0, (elapsed - 500) / (CINEMATIC_DURATION_MS - 500));
        const ease = u < 0 ? 0 : 1 - Math.pow(1 - Math.min(1, u), 3); // ease-out cubic
        cam.position.set(
          fromPos.x + (toPos.x - fromPos.x) * ease,
          fromPos.y + (toPos.y - fromPos.y) * ease,
          fromPos.z + (toPos.z - fromPos.z) * ease,
        );
        cam.fov = fromFov + (toFov - fromFov) * ease;
        cam.updateProjectionMatrix();
        // Look from the building's heart down into the meeting room,
        // ending at the office-door view the player will have.
        const lookY = 1.45 * ease + 0 * (1 - ease);
        const lookZ = 7.8 * ease + 2 * (1 - ease);
        cam.lookAt(0, lookY, lookZ);
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(step);
    });
  } finally {
    // Always hand the camera back to the controls, even if the
    // cinematic errors. Otherwise the camera would be stuck wherever
    // the tween last left it and the player would see a frozen frame.
    cinematicPlaying = false;
  }

  // Step 4: reveal the quest log so the player sees the first quest.
  // Mark the intro as seen so the orchestrator advances past q-intro-1
  // to "Talk to Bartek" on the next refresh.
  game.dispatch({ type: "set-flag", flag: "intro-seen", value: true });
  if (questLog) questLog.refresh(game.get());
  // After 600ms, also show the intro toast. This is intentionally after
  // the cinematic so the toast doesn't fight the camera for attention.
  setTimeout(() => {
    if (hud) showToast(hud, "Welcome to DevPowers. Click Bartek's card to start.", "info");
  }, 600);
}

function refreshRoster(): void {
  if (!roster) return;
  const state = game.get();
  // C-46: the roster tells the truth. Read each NPC's LIVE state from
  // the controller-maintained userData (the same source the debug
  // inspector uses) and map it to a real location label via the pure
  // rosterStatusFor(). Called on game updates AND at ~2 Hz from the
  // frame loop, because NPCs move between dispatches.
  const map = new Map<NpcId, { relationship: number; available: boolean; status: string }>();
  for (const npc of NPCS) {
    const liveState = sceneObjects !== null
      ? (sceneObjects.npcObjects[npc.id]?.userData.npcState as string | undefined) ?? "at-desk"
      : "at-desk";
    const status = rosterStatusFor(liveState);
    map.set(npc.id, {
      relationship: state.npcRelationships[npc.id] ?? 0,
      available: status.available,
      status: status.label,
    });
  }
  roster.refresh(map);
  roster.setFocus(focusedNpcId);
}

/**
 * C-46: hover label over the NPC's head - "Name - Role", no borders,
 * just text. Runs once per frame while the office is on screen: the
 * raycast uses the last pointer position, and the label is positioned
 * by projecting the NPC head into screen space so it tracks an NPC
 * that walks under a still cursor. Same pick path as the click, so
 * hover and click always agree.
 */
function updateHoverLabel(): void {
  if (
    !hoverLabel || !engine || !sceneObjects || !controls || raycaster === null ||
    screen !== "office" || dialogue?.isOpen() || cinematicPlaying ||
    controls.isMouseLookActive() || !pointerInsideCanvas
  ) {
    if (hoverLabel) hoverLabel.hidden = true;
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const ndc = ndcFromMouse(pointerClientX, pointerClientY, rect);
  raycaster.setFromCamera(new THREE.Vector2(ndc.x, ndc.y), engine.camera);
  const hit = pickFromCamera({
    raycaster,
    npcMeshes: sceneObjects.npcMeshes,
    interactableMeshes: sceneObjects.interactableMeshes,
    // Same reach as the click so hover and click always agree.
    maxDistance: 25,
  });
  let id: NpcId | null = null;
  if (hit.kind === "npc") {
    const object = sceneObjects.npcObjects[hit.npcId as NpcId];
    // Invisible (gone-home) NPCs are not hoverable - matches the
    // disabled roster card and the click guard.
    if (object?.visible) id = hit.npcId as NpcId;
  }
  if (id === null) {
    hoverLabel.hidden = true;
    return;
  }
  const npc = NPCS.find((candidate) => candidate.id === id);
  const object = sceneObjects.npcObjects[id];
  if (npc === undefined || object === undefined) {
    hoverLabel.hidden = true;
    return;
  }
  const head = new THREE.Vector3(object.position.x, object.position.y + 2.1, object.position.z);
  head.project(engine.camera);
  // head.z > 1 means the point is behind / clipped by the far plane.
  if (head.z > 1 || head.z < -1) {
    hoverLabel.hidden = true;
    return;
  }
  const x = (head.x * 0.5 + 0.5) * rect.width;
  const y = (-head.y * 0.5 + 0.5) * rect.height;
  hoverLabel.textContent = `${npc.name} - ${npc.role}`;
  hoverLabel.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
  hoverLabel.hidden = false;
}

function endDay(dayAlreadyAdvanced = false): void {
  if (screen !== "office") return;
  // Close any open dialogue first. showDailySummary will clear uiRoot.innerHTML
  // which would otherwise orphan the dialogue DOM but leave the controller's
  // `state` set, and the next openDialogueWith() call would early-return as
  // "already open" — the "dialog never appears again" bug.
  if (dialogue?.isOpen()) {
    dialogue.close();
  }
  // C-52: ending the day must END the day. Advance the calendar to the
  // next morning (skipping the remaining periods - their random events
  // are not fired, the day is over) before running the tick, so the
  // summary shows the day that just ended and the clock does not make
  // the player sit through the same day again after "Continue". The
  // natural evening rollover in advanceOfficePeriods already advanced
  // the day before calling here and passes dayAlreadyAdvanced.
  if (!dayAlreadyAdvanced) {
    const dispatches = periodsUntilDayEnd(game.get().timeOfDay);
    for (let i = 0; i < dispatches; i += 1) {
      game.dispatch({ type: "advance-time" });
    }
    if (game.get().day - 1 === 1) {
      game.dispatch({ type: "set-flag", flag: "day-1-ended", value: true });
    }
  }
  const result = runDailyTick();
  if (hud) publishCashflow(hud);
  setScreen("summary");
  showDailySummary(uiRoot, {
    day: game.get().day - 1,
    income: result.income,
    expenses: result.expenses,
    net: result.net,
    meme: result.meme,
    onContinue: () => {
      if (result.wentBankrupt) {
        showBankruptcy();
      } else {
        startOffice();
      }
    },
  });
}

function showBankruptcy(): void {
  setScreen("gameover");
  const s = game.get();
  showGameOver(uiRoot, {
    days: s.day,
    cashEarned: s.totals.cashEarned,
    miniGamesWon: s.totals.miniGamesWon,
    miniGamesLost: s.totals.miniGamesLost,
    dialoguesFinished: s.totals.dialoguesFinished,
    finalLine: pickFinalLine(s),
  });
}

function pickFinalLine(state: GameState): string {
  const lines = [
    "Maybe try Generalist next time. Or a LinkedIn Premium subscription.",
    "You lasted longer than the previous contractor. He lasted 3 days.",
    "The printer is still broken. It outlived you.",
    "Pawel has been promoted. You have not.",
    "Stack Overflow will remember you. As a deleted question.",
    "Marek has taken your desk. It was bigger than his, so he won.",
  ];
  const idx = (state.day * 7 + state.totals.miniGamesWon) % lines.length;
  return lines[idx]!;
}

function openDialogueWith(npc: NPC): void {
  // Phase 3.3: when the player starts a conversation, clear any
  // active inter-NPC speech bubble so the player is not visually
  // overloaded with overlapping text. The bubble system lives in the
  // NPC controller (C-61); clearing our own copy would be a no-op.
  sceneObjects?.npcController.clearBubbles();
  // C-54: the roster stays clickable while a dialogue is open; a new
  // pick switches the conversation instead of silently keeping the
  // old one (the controller's open() is a no-op while already open).
  if (dialogue?.isOpen()) dialogue.close();
  if (!dialogue) {
    dialogue = createDialogue(uiRoot, () => {
      audio().tts.stop();
      audio().sfx.play("sfx_dialogue_close");
      // C-54: hand the NPC back to the schedule (its yaw returns to
      // the schedule face) but the PLAYER stays exactly where the
      // conversation left them - no reset to the spawn, no camera
      // pan. dialogueNpcId tracks WHO the dialogue was with: the
      // controller is created once, so a closure over the first
      // openDialogueWith() call's `npc` would restore the wrong NPC
      // on every later conversation.
      if (dialogueNpcId !== null) {
        sceneObjects?.npcController.setTalkingToPlayer(null);
        const restoredYaw = npcScheduleYaws.get(dialogueNpcId) ?? null;
        if (restoredYaw !== null) npcFaceAnimations.set(dialogueNpcId, restoredYaw);
        npcScheduleYaws.delete(dialogueNpcId);
        dialogueNpcId = null;
      }
      focusNpc(null);
      roster?.setFocus(null);
    });
    dialogue.onNodeShown((npc, nodeId) => {
      void (async () => {
        await audio().init();
        if (audio().isMuted()) return;
        let ttsId = `${npc.id}_${nodeId}`;
        if (npc.id === "bartek" && nodeId === "greeting") {
          const which = (window as unknown as { __aitLastTree?: string }).__aitLastTree;
          if (which === "after-tutorial") ttsId = "bartek_after_tut_greeting";
          else if (which === "after-contract") ttsId = "bartek_after_contract";
        }
        await audio().tts.play(ttsId);
      })();
    });
  }
  // C-54: stage the conversation like a conversation. The player is
  // placed at a collision-clear spot 1.6 m from the NPC's LIVE
  // position (they wander - npc.position is just their desk), both
  // facing each other, and the NPC is frozen for the dialogue so
  // nothing walks them off or overwrites the face-the-player yaw.
  // The first-person camera is the player's own eyes, so it can no
  // longer end up inside a wall via a cameraDirector pan.
  const mesh = sceneObjects?.npcMeshes.get(npc.id);
  if (mesh && controls) {
    const playerPos = controls.getPlayerPosition();
    const plan = planWalkToFace({
      player: { x: playerPos.x, y: playerPos.y, z: playerPos.z },
      npc: { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z },
      officeBounds: WORLD_BOUNDS,
    });
    // planWalkToFace only clamps to the room bounds; the push then
    // clears any furniture the spot landed in (the planner is
    // AABB-blind by design).
    const spot = pushOutOfObstacles(
      { x: plan.target[0], z: plan.target[2] },
      PLAYER_RADIUS,
      WORLD_BOUNDS,
      [...OBSTACLES, ...WORLD_COLLISION_WALLS],
    );
    controls.setPlayerPose(spot.x, spot.z, plan.playerYaw);
    if (!npcScheduleYaws.has(npc.id)) {
      npcScheduleYaws.set(npc.id, mesh.rotation.y);
    }
    npcFaceAnimations.set(npc.id, plan.npcYaw);
    sceneObjects?.npcController.setTalkingToPlayer(npc.id);
    dialogueNpcId = npc.id;
  }
  const state = game.get();
  let treeKey = "default";
  if (npc.id === "bartek") {
    if (state.flags["got-acme-contract"] && state.flags["bartek-advanced-contract"]) treeKey = "afterContract";
    else if (state.flags["got-acme-contract"]) treeKey = "after-tutorial";
  } else if (npc.id === "dawid") {
    // C-38: the CEO's arc. He brushes the player off until the
    // first contract, then: first-meeting -> give-task ->
    // performance-review -> fireside (the always-warm easter
    // egg). Flags are set by the trees' own effects.
    if (!state.flags["got-acme-contract"]) treeKey = "default";
    else if (!state.flags["ceo-met"]) treeKey = "first-meeting";
    else if (!state.flags["ceo-workshop-offered"]) treeKey = "give-task";
    else if (!state.flags["ceo-reviewed"]) treeKey = "performance-review";
    else treeKey = "fireside";
  } else if (npc.id === "renata") {
    // C-64: the receptionist is the player's first guide and the
    // standing FAQ / help centre. The first time the player meets
    // her (the `renata-tut-finished` flag is unset) the
    // `first-meeting` tree runs the orientation; every later
    // visit opens the `default` FAQ menu. The flag is set by the
    // first-meeting tree's own effects.
    if (!state.flags["renata-tut-finished"]) treeKey = "first-meeting";
  }
  const tree = npc.dialogues[treeKey] ?? npc.dialogues.default;
  if (!tree) return;
  (window as unknown as { __aitLastTree?: string }).__aitLastTree = treeKey;
  audio().sfx.play("sfx_dialogue_open");
  // C-54: no cameraDirector pan - the player IS at the conversation
  // spot now. The roster card keeps its highlight.
  roster?.setFocus(npc.id);
  dialogue.open(npc, tree, treeKey);
}

function openDebugMinigame(): void {
  if (!debugGame) {
    debugGame = mountDebugScript(uiRoot, (result) => {
      if (result.won) {
        audio().sfx.play("sfx_quest_done");
        audio().music.play("music_minigame_win", musicUrl("music_minigame_win"), { loop: false, fadeMs: 200, musicVolume: 0.7 });
        setTimeout(() => {
          if (screen === "office" || screen === "minigame") {
            audio().music.play("music_office_ambient", musicUrl("music_office_ambient"), { loop: true, fadeMs: 1000 });
          }
        }, 3500);
      } else {
        audio().sfx.play("sfx_error_buzzer");
      }
      showToast(hud!, result.won ? `Debugged it. +${result.payout} zl.` : "Failed. The client is disappointed. So is your manager. So is the dog.", result.won ? "success" : "error");
      setScreen("office");
      // Re-mount the office roster (the minigame wiped ui-root).
      mountOfficeRosterFresh();
      if (hud) renderHud(hud, game.get());
      focusNpc(focusedNpcId);
      roster?.setFocus(focusedNpcId);
      game.dispatch({ type: "set-flag", flag: "ran-debug-game", value: true });
    });
  }
  setScreen("minigame");
  debugGame.start();
}

function mountOfficeRosterFresh(): void {
  if (!hud) return;
  roster = mountOfficeRoster(
    uiRoot,
    NPCS,
    (npc) => openDialogueWith(npc),
    () => endDay(),
    () => openDebugMinigame(),
    game.get().flags["got-acme-contract"] === true,
  );
  refreshRoster();
}

// --- Main loop ---

// C-58: persist the player pose while it changes, so a page reload +
// Continue resumes in place (title screen restore; see startOffice).
// Throttled to 1 Hz AND change-gated: an idle player costs zero
// localStorage writes and zero store dispatches. Runs even while a
// dialogue is open - the C-54 conversation spot IS the player's
// position and is what a reload should restore.
const POSE_SAVE_INTERVAL_MS = 1000;
let lastPoseSaveAt = 0;
let lastSavedPoseKey = "";

function poseKey(x: number, z: number, yaw: number, pitch: number): string {
  // Quantized: sub-centimetre jitter / sub-milliradian drift from the
  // walk math must not count as a change.
  return `${x.toFixed(2)}|${z.toFixed(2)}|${yaw.toFixed(3)}|${pitch.toFixed(3)}`;
}

function maybeSavePlayerPose(now: number): void {
  if (!controls || screen !== "office") return;
  if (now - lastPoseSaveAt < POSE_SAVE_INTERVAL_MS) return;
  const p = controls.getPlayerPosition();
  const yaw = controls.getYaw();
  const pitch = controls.getPitch();
  const key = poseKey(p.x, p.z, yaw, pitch);
  if (key === lastSavedPoseKey) return;
  lastPoseSaveAt = now;
  lastSavedPoseKey = key;
  game.dispatch({ type: "set-player-pose", pose: { x: p.x, z: p.z, yaw, pitch } });
}

// C-58: flush the exact pose when the tab goes away. The RAF loop
// pauses on hidden tabs, so the last 1 Hz save can be up to a second
// stale exactly when it matters most (closing / switching the tab).
function flushPlayerPose(): void {
  if (!controls || screen !== "office") return;
  const p = controls.getPlayerPosition();
  const yaw = controls.getYaw();
  const pitch = controls.getPitch();
  const key = poseKey(p.x, p.z, yaw, pitch);
  if (key === lastSavedPoseKey) return;
  lastSavedPoseKey = key;
  game.dispatch({ type: "set-player-pose", pose: { x: p.x, z: p.z, yaw, pitch } });
}
window.addEventListener("pagehide", flushPlayerPose);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") flushPlayerPose();
});

function advanceOfficePeriods(periodCount: number, now: number): void {
  const prevDay = game.get().day;
  for (let i = 0; i < periodCount; i++) {
    game.dispatch({ type: "advance-time" });
    if (game.get().day === prevDay) runPeriodEvent(hud, game.get().timeOfDay);
  }
  if (game.get().day !== prevDay) {
    officeStartedAt = now;
    // The rollover already moved the calendar; endDay must not advance
    // it a second time (C-52).
    endDay(true);
  } else {
    officeStartedAt += periodCount * SECONDS_PER_PERIOD * 1000;
  }
}

function frame(): void {
  const now = performance.now();
  const rawFrameMs = now - lastTime;
  const dt = Math.min(0.1, rawFrameMs / 1000);
  lastTime = now;
  // C-65: the meter reads the RAW frame time, never the clamped `dt`.
  // `dt` is capped at 0.1 s so a stalled tab cannot teleport the
  // simulation - which means a `dt`-based readout would bottom out at a
  // reassuring 10 fps however bad the real frame rate got. That is
  // exactly the number a measurement tool must not lie about.
  // three's render.info counts the LAST frame, so reading it before this
  // frame's render is the honest number for the frame just measured.
  fpsMeter?.frame(
    rawFrameMs,
    engine ? { calls: engine.renderer.info.render.calls, triangles: engine.renderer.info.render.triangles } : null,
  );

  // C-46: keep the in-period clock fresh for the lunch window. The
  // office-start timestamp is rebased on day change and advanced by
  // whole periods, so the remainder IS the current period's elapsed
  // time (time "pauses" only because period advancement pauses).
  if (officeStartedAt !== 0) {
    const totalElapsed = (now - officeStartedAt) / 1000;
    currentPeriodElapsed = totalElapsed % SECONDS_PER_PERIOD;
  }

  if (engine) {
    engine.update(dt);
    if (sceneObjects) {
      for (const u of sceneObjects.updatables) u(dt);
      // Phase 3.5: smooth NPC face-toward-player animation. When a
      // player starts a conversation with an NPC, the NPC's body
      // rotates to face the player. When the conversation closes, it
      // rotates back to the schedule-driven yaw. The interpolation
      // runs at NPC_ANIM_RATE per second (1 / 0.25 s = 4) for a
      // 250 ms ease-in feel.
      const NPC_ANIM_RATE = 4;
      if (npcFaceAnimations.size > 0 && sceneObjects) {
        const t = Math.min(1, dt * NPC_ANIM_RATE);
        for (const [npcId, targetYaw] of npcFaceAnimations) {
          const mesh = sceneObjects.npcMeshes.get(npcId);
          if (!mesh) continue;
          // Shortest-path lerp on the unit circle: avoid jumping
          // across the ±π wrap point.
          let delta = targetYaw - mesh.rotation.y;
          if (delta > Math.PI) delta -= 2 * Math.PI;
          if (delta < -Math.PI) delta += 2 * Math.PI;
          mesh.rotation.y += delta * t;
          if (Math.abs(delta) < 0.01) {
            // Snapped: clear the animation target so we don't keep
            // running the interpolation for an already-converged
            // rotation. The schedule yaw (if any) is preserved.
            npcFaceAnimations.delete(npcId);
          }
        }
      }
    }
  }
  if (cameraDirector) cameraDirector.update(dt);
  // Phase 2: WASD + mouse-look (C-01, ADR-0007). Run after the
  // camera director so the controls overwrite any in-flight camera
  // animation once the player is on the office screen. Skip while
  // the dialogue is open (so the camera does not drift during a
  // long read) and while the intro cinematic is animating the
  // camera (the cinematic's tween is the camera at this moment).
  if (
    controls &&
    screen === "office" &&
    !dialogue?.isOpen() &&
    !cinematicPlaying
  ) {
    controls.update(dt);
  }
  // C-58: persist the live pose (throttled + change-gated; see
  // maybeSavePlayerPose). Deliberately OUTSIDE the update guard above so
  // a dialogue's staged conversation spot is saved too.
  maybeSavePlayerPose(now);

  if (engine) engine.render();

  // C-46: hover label every frame (cheap: one raycast + one DOM write)
  // and the roster at ~2 Hz, so locations stay truthful between
  // game-state dispatches while NPCs wander.
  updateHoverLabel();
  // C-61: bubbles are DOM text now - gate them to the office screen so
  // they never float above the summary / minigame UI.
  sceneObjects?.npcController.setBubblesVisible(screen === "office");
  if (screen === "office" && now - lastRosterRefreshAt >= 500) {
    lastRosterRefreshAt = now;
    refreshRoster();
  }

  // Time tick: each real second is some fraction of an in-game period.
  // Time pauses while a dialogue is open (no one likes reading a punchline
  // and then the day ending under them) and while we're in any other screen.
  if (screen === "office" && !dialogue?.isOpen()) {
    if (officeStartedAt === 0) officeStartedAt = now;
    const elapsed = (now - officeStartedAt) / 1000;
    // SECONDS_PER_PERIOD = 180 by default; see top of file. 3 periods/day =
    // ~9 real minutes per in-game day.
    const periodsElapsed = Math.floor(elapsed / SECONDS_PER_PERIOD);
    if (periodsElapsed > 0) {
      advanceOfficePeriods(periodsElapsed, now);
    }
  }

  requestAnimationFrame(frame);
}

declare global {
  interface Window {
    __aitrainer?: {
      getPlayer: () => { x: number; y: number; z: number };
      getCamera: () => { x: number; y: number; z: number };
      getYaw: () => number;
      getPitch: () => number;
      isMouseLook: () => boolean;
      getFocus: () => string | null;
      getScreen: () => string;
      /** C-48 live mouse-feel knobs (rad per raw mouse count; persisted). */
      setSensitivity: (radPerPixel: number) => void;
      getSensitivity: () => number;
      getSceneObjects: () => { keys: string[]; hasPlayerGroup: boolean } | null;
      inspectNpcs: () => Array<{
        npcId: string;
        position: { x: number; z: number };
        childNames: string[];
        state: unknown | null;
        /** C-63: live limb pose, so an e2e can assert a desk animation
         *  actually ran instead of only eyeballing a screenshot. */
        pose: {
          leftArmPitch: number; rightArmPitch: number;
          rightArmRoll: number; headPitch: number; mugVisible: boolean;
        };
      }> | null;
      inspectFurniture: () => Array<{ name: string; position: { x: number; y: number; z: number }; size?: readonly [number, number, number] }> | null;
      debugSkipPeriod: () => void;
      /** Dev/QA hook: teleport the player to (x, z) with a yaw (radians). */
      teleport: (x: number, z: number, yaw: number) => void;
      /** C-65: toggle the F3 frame-time meter; returns its new state. */
      toggleFps: () => boolean;
    };
  }
}
window.__aitrainer = {
  getPlayer: () => {
    if (!controls) return { x: 0, y: 0, z: 0 };
    const p = controls.getPlayerPosition();
    return { x: p.x, y: p.y, z: p.z };
  },
  getCamera: () => {
    if (!engine) return { x: 0, y: 0, z: 0 };
    return { x: engine.camera.position.x, y: engine.camera.position.y, z: engine.camera.position.z };
  },
  getYaw: () => controls?.getYaw() ?? 0,
  getPitch: () => controls?.getPitch() ?? 0,
  isMouseLook: () => controls?.isMouseLookActive() ?? false,
  getFocus: () => focusedNpcId,
  getSceneObjects: () => {
    if (!sceneObjects) return null;
    return { keys: Object.keys(sceneObjects), hasPlayerGroup: false };
  },
  getScreen: () => screen,
  setSensitivity: (radPerPixel: number): void => {
    setMouseSensitivity(radPerPixel);
    // eslint-disable-next-line no-console
    console.info(`[mouse] sensitivity = ${getMouseSensitivity()} rad/count`);
  },
  getSensitivity: () => getMouseSensitivity(),
  // Dev/QA hook: teleport the player to (x, z) with a yaw (radians).
  // Used by the Playwright e2e / QA scripts to inspect specific rooms
  // without fighting the keyboard focus in the UI overlay. Production
  // builds keep this in place (it is harmless without console access).
  teleport: (x: number, z: number, yaw: number): void => {
    if (!controls) return;
    controls.setPlayerPose(x, z, yaw);
  },
  // Debug helper: returns the gender + child-mesh kinds of every
  // NPC group in the scene. Used by the gender-bug triage script
  // (see `.agent-briefs/agy-gender-qa-brief.md`).
  inspectNpcs: () => {
    if (!sceneObjects) return null;
    const out = [];
    for (const [npcId, obj] of Object.entries(sceneObjects.npcObjects)) {
      const childNames: string[] = [];
      obj.traverse((c: { name: string }) => {
        if (c.name) childNames.push(c.name);
      });
      // C-63: the live limb pose. `getObjectByName` is used rather than
      // a cached lookup because this hook runs at most a few times per
      // QA run, never in the frame loop.
      const leftArm = obj.getObjectByName("arm-left");
      const rightArm = obj.getObjectByName("arm-right");
      const head = obj.getObjectByName("head");
      const mug = obj.getObjectByName("mug");
      out.push({
        npcId,
        position: { x: obj.position.x, z: obj.position.z },
        childNames,
        state: obj.userData.npcState ?? null,
        pose: {
          leftArmPitch: leftArm?.rotation.x ?? 0,
          rightArmPitch: rightArm?.rotation.x ?? 0,
          rightArmRoll: rightArm?.rotation.z ?? 0,
          headPitch: head?.rotation.x ?? 0,
          mugVisible: mug?.visible ?? false,
        },
      });
    }
    return out;
  },
  inspectFurniture: () => {
    if (!engine) return null;
    const out: Array<{ name: string; position: { x: number; y: number; z: number }; color?: number; rotationY?: number; npcId?: string }> = [];
    engine.scene.traverse((c: { name?: string; isMesh?: boolean; userData?: { npcId?: string }; position: { x: number; y: number; z: number }; rotation: { y?: number }; material?: { color?: { getHex: () => number } } }) => {
      // Include meshes with a name OR NPC groups (no name but
      // userData.npcId is set).
      const isNpcGroup = !c.isMesh && c.userData?.npcId !== undefined;
      if ((c.isMesh && c.name) || isNpcGroup) {
        const entry: { name: string; position: { x: number; y: number; z: number }; color?: number; rotationY?: number; npcId?: string } = {
          name: c.name ?? "(npc-group)",
          position: { x: c.position.x, y: c.position.y, z: c.position.z },
        };
        if (isNpcGroup && c.userData?.npcId) entry.npcId = c.userData.npcId;
        const rot = c.rotation;
        if (rot && typeof (rot as { y?: number }).y === "number") {
          entry.rotationY = (rot as { y: number }).y;
        }
        const color = c.material?.color?.getHex?.();
        if (typeof color === "number") entry.color = color;
        out.push(entry);
      }
    });
    return out;
  },
  toggleFps: (): boolean => {
    fpsMeter?.toggle();
    return fpsMeter?.isVisible() ?? false;
  },
  debugSkipPeriod: () => {
    const now = performance.now();
    officeStartedAt = now;
    advanceOfficePeriods(1, now);
  },
};

// C-65: mount the meter before the loop starts so the very first frames
// are sampled. Hidden until F3 unless the player left it on last time.
fpsMeter = mountFpsMeter(document.body);

frame();

// ---------------------------------------------------------------
// Build version banner
//
// Every commit-worthy change must bump BUILD_VERSION below. The
// banner prints to the browser console at startup so the user (or
// the agent) can confirm the browser is running the latest code.
// Lucas asked for this on 2026-08-29 after the WASD stuck-key fix
// did not appear to take effect — turned out the issue was a stale
// browser tab. A console banner makes the staleness obvious.
//
// Format: "AI Trainer Simulator vYYYY.MM.DD-NN" where NN is the
// commit ordinal in the day. The dev server is the only build that
// matters here; the prod build embeds the same string via
// `vite build`'s `define` (TODO if/when we add a CI pipeline).
// ---------------------------------------------------------------
// Bump after every commit so the console line in the browser
// confirms the user is on the right build. See AGENTS.md
// "Verify the build you are testing" section.
const BUILD_VERSION = "v2026.09.02-09";
// eslint-disable-next-line no-console
console.info(
  "%cAI Trainer Simulator %c" + BUILD_VERSION,
  "color:#00ff7f;font-weight:bold",
  "color:#888",
);
showTitle();

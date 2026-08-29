/**
 * AI Trainer Simulator - main entry point.
 *
 * Wires the engine, game state, UI, dialogue, and mini-games into a single game loop.
 *
 * The 3D office is a backdrop, NOT an action space. The player does not walk
 * around. They click a name in the roster, the camera pans to that NPC, and
 * the dialogue opens. This is a dialogue-driven economic sim, not a 3D action
 * game, and the previous WASD+pointer-lock design got in the way of playing
 * it. See the office-roster UI for the clickable roster that drives the scene.
 */

import "./style.css";
import * as THREE from "three";
import { createEngine, type Engine } from "./engine/renderer";
import { buildOfficeScene } from "./engine/scene";
import { createCameraDirector, type CameraDirector } from "./engine/camera-director";
import { createControls, type Controls } from "./engine/controls";
import { game } from "./game/state";
import { runDailyTick } from "./game/economy";
import { runPeriodEvent } from "./game/events";
import { NPCS } from "./content/npcs";
import type { GameState, NPC, NpcId } from "./types";
import { mountHud, renderHud, showToast, type HudElements } from "./ui/hud";
import { mountTitleScreen, mountCharacterCreate, showDailySummary, showGameOver } from "./ui/title";
import { mountOfficeRoster, type OfficeRosterHandle } from "./ui/office-roster";
import {
  closeDialogueForScreenTransition,
  createDialogue,
  type DialogueController,
} from "./ui/dialogue";
import { mountDebugScript, type DebugScriptHandle } from "./minigames/debug-script";
import { audio, type MusicId } from "./audio/AudioManager";
import { resolveUrl, type Manifest, loadManifest } from "./audio/manifest";
import { SECONDS_PER_PERIOD } from "./game/pacing";
import { mountQuestLog, type QuestLogHandle } from "./ui/quest-log";
import { mountHelpModal, type HelpModalHandle } from "./ui/help-modal";

type Screen = "title" | "create" | "office" | "summary" | "minigame" | "gameover";

const uiRoot = document.getElementById("ui-root")!;
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

let engine: Engine | null = null;
let cameraDirector: CameraDirector | null = null;
let sceneObjects: ReturnType<typeof buildOfficeScene> | null = null;
let controls: Controls | null = null;
let screen: Screen = "title";
let hud: HudElements | null = null;
let dialogue: DialogueController | null = null;
let debugGame: DebugScriptHandle | null = null;
let roster: OfficeRosterHandle | null = null;
let questLog: QuestLogHandle | null = null;
let helpModal: HelpModalHandle | null = null;
let focusedNpcId: NpcId | null = null;
let officeStartedAt = 0;
let lastTime = performance.now();

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (dialogue?.isOpen()) dialogue.close();
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
    // Default framing: player stands at the office door (south wall, z=+9),
    // eye level (~1.7m), looking at the central row of desks (z=-2). The
    // lookAt y=1.1 (NPC head height for a seated person) puts the NPCs in
    // the middle of the frame instead of the back wall (z=-9) dominating.
    // Bypassing the director avoids its default (0, 2.5, 5.5) offset which
    // used to put the camera 3.7m up — the original "looking at the roof"
    // bug. See also the over-shoulder follow camera Phase 2 will introduce.
    engine.camera.position.set(0, 1.7, 7.5);
    engine.camera.lookAt(0, 1.1, -2);
    cameraDirector.cancel();
    // Tighten FOV to 40° so the NPCs read as actual figures rather than
    // tiny dots in a sea of floor/wall. 55° (the renderer default) frames
    // the whole 20×20m office but the desks shrink to nothing.
    engine.camera.fov = 40;
    engine.camera.updateProjectionMatrix();
    return;
  }
  const npc = NPCS.find((n) => n.id === id);
  if (!npc) return;
  // Frame the NPC at their desk. Offset puts the camera in front of and above them
  // so the player can see both the NPC and the dialogue overlay.
  const target = new THREE.Vector3(npc.position.x, npc.position.y + 0.6, npc.position.z);
  const offset = new THREE.Vector3(0, 1.6, 3.2);
  cameraDirector.panTo(target, offset);
}

function startOffice(playIntro = false): void {
  setScreen("office");
  if (!engine) {
    engine = createEngine(canvas);
    const built = buildOfficeScene(engine.scene);
    sceneObjects = built;
    cameraDirector = createCameraDirector(engine.camera);
    // Phase 2: WASD walk + first-person camera (C-01) + Pattern D
    // mouse-look (ADR-0007). The player starts at the office door
    // (z=6, looking into the office at -Z). The controls own the
    // camera position and rotation from this point on; the camera
    // director is still used for the intro cinematic and any
    // future scripted camera moves (but is cancelled by the first
    // controls.update() call).
    controls = createControls({
      canvas,
      camera: engine.camera,
      initialPlayer: sceneObjects.playerStart,
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
  // Wire the "?" button in the quest log to open the help modal.
  // The handle exposes the button directly to avoid a circular import
  // between quest-log and help-modal.
  (questLog as unknown as { helpButton: HTMLButtonElement }).helpButton
    .addEventListener("click", () => helpModal?.open());
  refreshRoster();

  if (playIntro) {
    void playIntroCinematic();
  } else {
    // Show the active quest in the quest log right away for returning players.
    questLog.refresh(game.get());
  }

  game.subscribe(() => {
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
 * The cinematic does 4 things in 3.5s:
 *   1. Fade from black (0.4s)
 *   2. Establishing shot from outside (camera at +y=14, looking at the
 *      building). 1.0s.
 *   3. Dolly down through the front wall (no clipping yet — the office
 *      ceiling is opaque; once we're inside it doesn't matter). 1.5s.
 *   4. Land on the default over-shoulder framing. 0.6s.
 *
 * During the cinematic, the quest log fades in at step 4 so the player
 * sees "Talk to Bartek" the moment the world becomes interactive.
 */
async function playIntroCinematic(): Promise<void> {
  if (!engine) return;
  // Pause time during the cinematic; the day timer starts AFTER.
  const cinematicStartMs = performance.now();
  const CINEMATIC_DURATION_MS = 3500;

  // Step 1: fade from black via a CSS overlay.
  const overlay = document.createElement("div");
  overlay.className = "intro-fade";
  uiRoot.appendChild(overlay);
  // Force a layout pass so the initial opacity:1 actually paints before
  // we transition to 0.
  void overlay.offsetHeight;
  requestAnimationFrame(() => overlay.classList.add("fade-out"));

  // Step 2: establishing shot — outside the office, looking down.
  engine.camera.position.set(0, 14, 20);
  engine.camera.lookAt(0, 0, -5);
  engine.camera.fov = 55;
  engine.camera.updateProjectionMatrix();

  const cam = engine.camera;
  const fromPos = cam.position.clone();
  const fromFov = cam.fov;
  // Final framing matches focusNpc(null) so the cinematic lands exactly
  // where the player will start interacting.
  const toPos = new THREE.Vector3(0, 1.7, 7.5);
  const toFov = 40;

  await new Promise<void>((resolve) => {
    function step(): void {
      const elapsed = performance.now() - cinematicStartMs;
      const t = Math.min(1, elapsed / CINEMATIC_DURATION_MS);
      // 0..0.15s = fade in + establishing shot holds; 0.15..1.0 = dolly
      // + fov tighten.
      const u = Math.max(0, (elapsed - 400) / (CINEMATIC_DURATION_MS - 400));
      const ease = u < 0 ? 0 : 1 - Math.pow(1 - Math.min(1, u), 3); // ease-out cubic
      cam.position.set(
        fromPos.x + (toPos.x - fromPos.x) * ease,
        fromPos.y + (toPos.y - fromPos.y) * ease,
        fromPos.z + (toPos.z - fromPos.z) * ease,
      );
      cam.fov = fromFov + (toFov - fromFov) * ease;
      cam.updateProjectionMatrix();
      // Look at NPC head height as we approach the final frame.
      const lookY = 1.1 * ease + 0 * (1 - ease);
      const lookZ = -2 * ease + -5 * (1 - ease);
      cam.lookAt(0, lookY, lookZ);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });

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
  const map = new Map<NpcId, { relationship: number; available: boolean }>();
  for (const npc of NPCS) {
    map.set(npc.id, {
      relationship: state.npcRelationships[npc.id] ?? 0,
      available: true, // MVP: everyone is in. Random absences come later.
    });
  }
  roster.refresh(map);
  roster.setFocus(focusedNpcId);
}

function endDay(): void {
  if (screen !== "office") return;
  // Close any open dialogue first. showDailySummary will clear uiRoot.innerHTML
  // which would otherwise orphan the dialogue DOM but leave the controller's
  // `state` set, and the next openDialogueWith() call would early-return as
  // "already open" — the "dialog never appears again" bug.
  if (dialogue?.isOpen()) {
    dialogue.close();
  }
  const result = runDailyTick();
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
  if (!dialogue) {
    dialogue = createDialogue(uiRoot, () => {
      audio().tts.stop();
      audio().sfx.play("sfx_dialogue_close");
      // Return focus to the roster, not the wide office shot, so the
      // player sees the NPC they were just talking to.
      focusNpc(focusedNpcId);
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
  const state = game.get();
  let treeKey = "default";
  if (npc.id === "bartek") {
    if (state.flags["got-acme-contract"] && state.flags["bartek-advanced-contract"]) treeKey = "afterContract";
    else if (state.flags["got-acme-contract"]) treeKey = "after-tutorial";
  }
  const tree = npc.dialogues[treeKey] ?? npc.dialogues.default;
  if (!tree) return;
  (window as unknown as { __aitLastTree?: string }).__aitLastTree = treeKey;
  audio().sfx.play("sfx_dialogue_open");
  focusNpc(npc.id);
  roster?.setFocus(npc.id);
  dialogue.open(npc, tree);
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

function frame(): void {
  const now = performance.now();
  const dt = Math.min(0.1, (now - lastTime) / 1000);
  lastTime = now;

  if (engine) {
    engine.update(dt);
    if (sceneObjects) {
      for (const u of sceneObjects.updatables) u(dt);
    }
  }
  if (cameraDirector) cameraDirector.update(dt);
  // Phase 2: WASD + mouse-look (C-01, ADR-0007). Run after the
  // camera director so the controls overwrite any in-flight camera
  // animation once the player is on the office screen. Skip while
  // the dialogue is open so the camera does not drift during a
  // long read.
  if (controls && screen === "office" && !dialogue?.isOpen()) {
    controls.update(dt);
  }

  if (engine) engine.render();

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
      const prevDay = game.get().day;
      for (let i = 0; i < periodsElapsed; i++) {
        game.dispatch({ type: "advance-time" });
        // After advancing, the player's *new* period is the one we should
        // flavor with a random event. Skip if a day wrapped (endDay handles
        // the new-day opening event).
        if (game.get().day === prevDay) {
          runPeriodEvent(hud, game.get().timeOfDay);
        }
      }
      const afterDay = game.get().day;
      if (afterDay !== prevDay) {
        officeStartedAt = now;
        endDay();
      }
    }
  }

  requestAnimationFrame(frame);
}

declare global {
  interface Window {
    __aitrainer?: {
      getPlayer: () => { x: number; y: number; z: number };
      getCamera: () => { x: number; y: number; z: number };
      getFocus: () => string | null;
      getScreen: () => string;
      getSceneObjects: () => { keys: string[]; hasPlayerGroup: boolean } | null;
    };
  }
}
window.__aitrainer = {
  getPlayer: () => ({ x: 0, y: 0, z: 0 }),
  getCamera: () => {
    if (!engine) return { x: 0, y: 0, z: 0 };
    return { x: engine.camera.position.x, y: engine.camera.position.y, z: engine.camera.position.z };
  },
  getFocus: () => focusedNpcId,
  getSceneObjects: () => {
    if (!sceneObjects) return null;
    return { keys: Object.keys(sceneObjects), hasPlayerGroup: false };
  },
  getScreen: () => screen,
};

frame();
showTitle();

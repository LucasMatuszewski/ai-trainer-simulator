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
import { game } from "./game/state";
import { runDailyTick } from "./game/economy";
import { NPCS } from "./content/npcs";
import type { GameState, NPC, NpcId } from "./types";
import { mountHud, renderHud, showToast, type HudElements } from "./ui/hud";
import { mountTitleScreen, mountCharacterCreate, showDailySummary, showGameOver } from "./ui/title";
import { mountOfficeRoster, type OfficeRosterHandle } from "./ui/office-roster";
import { createDialogue, type DialogueController } from "./ui/dialogue";
import { mountDebugScript, type DebugScriptHandle } from "./minigames/debug-script";
import { audio, type MusicId } from "./audio/AudioManager";
import { resolveUrl, type Manifest, loadManifest } from "./audio/manifest";

type Screen = "title" | "create" | "office" | "summary" | "minigame" | "gameover";

const uiRoot = document.getElementById("ui-root")!;
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

let engine: Engine | null = null;
let cameraDirector: CameraDirector | null = null;
let sceneObjects: ReturnType<typeof buildOfficeScene> | null = null;
let screen: Screen = "title";
let hud: HudElements | null = null;
let dialogue: DialogueController | null = null;
let debugGame: DebugScriptHandle | null = null;
let roster: OfficeRosterHandle | null = null;
let focusedNpcId: NpcId | null = null;
let officeStartedAt = 0;
let lastTime = performance.now();

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (dialogue?.isOpen()) dialogue.close();
  }
});

function setScreen(next: Screen): void {
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
      startOffice();
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
    // Default framing: a wide shot of the whole office.
    cameraDirector.snapTo(new THREE.Vector3(0, 0.5, 6), new THREE.Vector3(0, 4.5, 9));
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

function startOffice(): void {
  setScreen("office");
  if (!engine) {
    engine = createEngine(canvas);
    const built = buildOfficeScene(engine.scene);
    sceneObjects = built;
    cameraDirector = createCameraDirector(engine.camera);
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
  refreshRoster();

  game.subscribe(() => {
    if (hud) renderHud(hud, game.get());
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
}

let prevCash = 0;
let prevPatience = 0;
let prevCredibility = 0;

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

  if (engine) engine.render();

  // Time tick: each real second is some fraction of an in-game period.
  if (screen === "office") {
    if (officeStartedAt === 0) officeStartedAt = now;
    const elapsed = (now - officeStartedAt) / 1000;
    // ~60 real seconds = 1 period. 3 periods per day = 180s per day.
    const periodsElapsed = Math.floor(elapsed / 60);
    if (periodsElapsed > 0) {
      const prevDay = game.get().day;
      for (let i = 0; i < periodsElapsed; i++) {
        game.dispatch({ type: "advance-time" });
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
  getScreen: () => screen,
};

frame();
showTitle();

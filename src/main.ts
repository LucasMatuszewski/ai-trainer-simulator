/**
 * AI Trainer Simulator - main entry point.
 *
 * Wires the engine, game state, UI, dialogue, and mini-games into a single game loop.
 */

import "./style.css";
import * as THREE from "three";
import { createEngine, type Engine } from "./engine/renderer";
import { buildOfficeScene } from "./engine/scene";
import { createControls, type Controls } from "./engine/controls";
import { game } from "./game/state";
import { runDailyTick } from "./game/economy";
import { NPCS } from "./content/npcs";
import type { GameState, GameStats, NPC } from "./types";
import { mountHud, renderHud, showPrompt, showToast, type HudElements } from "./ui/hud";
import { mountTitleScreen, mountCharacterCreate, showDailySummary, showGameOver } from "./ui/title";
import { createDialogue, type DialogueController } from "./ui/dialogue";
import { mountDebugScript, type DebugScriptHandle } from "./minigames/debug-script";
import { audio, type MusicId } from "./audio/AudioManager";
import { resolveUrl, type Manifest, loadManifest } from "./audio/manifest";

type Screen = "title" | "create" | "office" | "summary" | "minigame" | "gameover";

const uiRoot = document.getElementById("ui-root")!;
const canvas = document.getElementById("game-canvas") as HTMLCanvasElement;

let engine: Engine | null = null;
let controls: Controls | null = null;
let sceneUpdatables: Array<(dt: number) => void> = [];
let playerPos = new THREE.Vector3(0, 0.5, 8);
let screen: Screen = "title";
let hud: HudElements | null = null;
let dialogue: DialogueController | null = null;
let debugGame: DebugScriptHandle | null = null;

const keys = new Set<string>();
window.addEventListener("keydown", (e) => {
  keys.add(e.key.toLowerCase());
  if (e.key === "e" || e.key === "E") {
    tryInteract();
  }
  if (e.key === "Escape") {
    if (dialogue?.isOpen()) {
      dialogue.close();
    }
  }
});
window.addEventListener("keyup", (e) => {
  keys.delete(e.key.toLowerCase());
});

function setScreen(next: Screen): void {
  const prevScreen = screen;
  screen = next;
  if (next !== "minigame" && next !== "summary" && next !== "gameover") {
    uiRoot.innerHTML = "";
  }
  // Music crossfades on screen change.
  if (prevScreen !== next) {
    onScreenMusicChange(next, prevScreen);
  }
}

/** Resolve a music id from the manifest, with fallback to no-op. */
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

    if (next === "title") {
      a.music.play("music_title", musicUrl("music_title"), { loop: false, fadeMs: 800 });
    } else if (next === "create" || next === "office") {
      a.music.play("music_office_ambient", musicUrl("music_office_ambient"), { loop: true, fadeMs: 1200 });
    } else if (next === "minigame") {
      a.music.play("music_minigame_debug", musicUrl("music_minigame_debug"), { loop: true, fadeMs: 400 });
    } else if (next === "summary") {
      a.music.play("music_day_end_calm", musicUrl("music_day_end_calm"), { loop: false, fadeMs: 800 });
    } else if (next === "gameover") {
      a.music.play("music_minigame_lose", musicUrl("music_minigame_lose"), { loop: false, fadeMs: 400 });
    }
  })();
}

function showTitle(): void {
  setScreen("title");
  mountTitleScreen(
    uiRoot,
    hasSave(),
    () => showCharacterCreate(),
    () => {
      // Continue: game state is already loaded by the store, so just start the office.
      startOffice();
    },
  );
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
      // Apply character.
      game.dispatch({ type: "load", state: { ...game.get(), character: { ...data }, stats: applyTrait(data.trait, game.get().stats) } });
      startOffice();
    },
    () => showTitle(),
  );
}

function applyTrait(trait: string, stats: GameStats): GameStats {
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

function startOffice(): void {
  setScreen("office");
  if (!engine) {
    engine = createEngine(canvas);
    const scene = buildOfficeScene(engine.scene);
    sceneUpdatables = scene.updatables;
    playerPos.copy(scene.playerStart);
    controls = createControls({
      canvas,
      camera: engine.camera,
      initialPlayer: playerPos,
    });
    controls.setKeys(keys);
    dialogue = createDialogue(uiRoot, () => {
      // After dialogue closes, ensure mouse can click the canvas to re-engage pointer lock.
      audio().tts.stop();
      audio().sfx.play("sfx_dialogue_close");
      canvas.click();
    });
    dialogue.onNodeShown((npc, nodeId) => {
      void (async () => {
        await audio().init();
        if (audio().isMuted()) return;
        // Map NPC + nodeId -> TTS id. NPCs use the same node ids in their tree,
        // except for the after-tutorial greeting in bartek which lives in a
        // separate tree; the spec still uses bartek_after_tut_greeting etc.
        let ttsId = `${npc.id}_${nodeId}`;
        // Translate known rename: bartek has trees default, after-tutorial, after-contract.
        // The "after-tutorial" tree's greeting is `bartek_after_tut_greeting` in the spec.
        if (npc.id === "bartek" && nodeId === "greeting") {
          // Caller picks which tree to open; the audio system needs to know.
          // main.ts set the treeKey before opening; we read it off a global var.
          const which = (window as unknown as { __aitLastTree?: string }).__aitLastTree;
          if (which === "after-tutorial") ttsId = "bartek_after_tut_greeting";
          else if (which === "after-contract") ttsId = "bartek_after_contract";
        }
        await audio().tts.play(ttsId);
      })();
    });
    debugGame = mountDebugScript(uiRoot, (result) => {
      // Show a result toast and go back to the office.
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
      showToast(
        hud!,
        result.won
          ? `Debugged it. +${result.payout} zl.`
          : "Failed. The client is disappointed. So is your manager. So is the dog.",
        result.won ? "success" : "error",
      );
      setScreen("office");
      uiRoot.innerHTML = "";
      if (hud) renderHud(hud, game.get());
      controls?.setKeys(keys);
      game.dispatch({
        type: "set-flag",
        flag: "ran-debug-game",
        value: true,
      });
      canvas.click(); // re-engage pointer lock
    });
  } else {
    // Re-load position from state.
    // For MVP, just keep the player where they were.
  }

  hud = mountHud(uiRoot);
  let prevCash = game.get().cash;
  let prevPatience = game.get().stats.patience;
  let prevCredibility = game.get().stats.credibility;
  game.subscribe((s) => {
    if (hud) renderHud(hud, s);
    // Cash register SFX when cash goes up.
    if (s.cash > prevCash) {
      audio().sfx.play("sfx_cash_register");
    }
    // Error buzzer when patience or credibility tank.
    if (s.stats.patience < prevPatience - 3 || s.stats.credibility < prevCredibility - 3) {
      audio().sfx.play("sfx_error_buzzer");
    }
    prevCash = s.cash;
    prevPatience = s.stats.patience;
    prevCredibility = s.stats.credibility;
  });
  renderHud(hud, game.get());

  // First time entering the office, show a gag toast.
  if (!game.get().flags["_seen-intro-toast"]) {
    game.dispatch({ type: "set-flag", flag: "_seen-intro-toast", value: true });
    setTimeout(() => showToast(hud!, "Welcome to Stack Underflow. Click to capture mouse. WASD to walk. E to interact.", "info"), 400);
  }

  // Re-engage pointer lock.
  setTimeout(() => canvas.click(), 100);

  // Time tick: advance time every 60 seconds of real time. Triggers the daily tick
  // when the day changes.
  // (Started in main loop below.)
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
        setScreen("office");
        uiRoot.innerHTML = "";
        if (hud) {
          // Re-render HUD.
          uiRoot.appendChild(hud.root.firstElementChild!);
          uiRoot.appendChild(hud.root.lastElementChild!);
        }
        renderHud(hud!, game.get());
        canvas.click();
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

function tryInteract(): void {
  if (!controls) return;
  if (screen !== "office") return;
  const player = controls.getPlayerPosition();
  // Find nearest NPC within trigger radius.
  let nearest: NPC | null = null;
  let nearestDist = Infinity;
  for (const npc of NPCS) {
    const dx = npc.position.x - player.x;
    const dz = npc.position.z - player.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < npc.triggerRadius && dist < nearestDist) {
      nearest = npc;
      nearestDist = dist;
    }
  }
  if (nearest) {
    openDialogueWith(nearest);
  } else {
    // Check for special interactables: server rack, coffee machine, computer (debug game)
    // For MVP, if near the meeting table OR a desk, the player can open the mini-game
    // on any desk after they have a contract.
    const canDebug = game.get().flags["got-acme-contract"];
    if (canDebug) {
      // Look for any desk nearby.
      for (const npc of NPCS) {
        if (npc.id === "pawel") continue; // pawel is the only NPC on a desk
        const dx = npc.position.x - player.x;
        const dz = npc.position.z - player.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 2.5) {
          // Open the debug mini-game.
          setScreen("minigame");
          debugGame!.start();
          return;
        }
      }
    }
  }
}

function openDialogueWith(npc: NPC): void {
  if (!dialogue) return;
  // Pick the right dialogue tree.
  const state = game.get();
  let treeKey = "default";
  if (npc.id === "bartek") {
    if (state.flags["got-acme-contract"] && state.flags["bartek-advanced-contract"]) {
      treeKey = "afterContract";
    } else if (state.flags["got-acme-contract"]) {
      treeKey = "after-tutorial";
    }
  }
  const tree = npc.dialogues[treeKey] ?? npc.dialogues.default;
  if (!tree) return;
  // Stash the treeKey so the audio layer can pick the right TTS id.
  (window as unknown as { __aitLastTree?: string }).__aitLastTree = treeKey;
  audio().sfx.play("sfx_dialogue_open");
  dialogue.open(npc, tree);
  // Set a flag if Bartek offered the advanced contract for the afterContract key.
  if (npc.id === "bartek" && state.flags["got-acme-contract"] && !state.flags["bartek-advanced-contract"]) {
    // (Just visiting Bartek again triggers the after-tutorial dialogue.)
  }
  // When bartek hands out the advanced contract in afterTutorial, mark it.
  // We can detect this in a future state-change listener; for MVP we mark it
  // here when the player opens the afterTutorial dialogue and picks yes.
}

// --- Main loop ---

let lastTime = performance.now();
let inOfficeSince = 0;
let lastFootstepPos: { x: number; z: number } | null = null;

function frame(): void {
  const now = performance.now();
  const dt = Math.min(0.1, (now - lastTime) / 1000);
  lastTime = now;

  if (engine) {
    engine.update(dt);
    for (const u of sceneUpdatables) u(dt);
  }

  if (controls && (screen === "office" || screen === "minigame")) {
    controls.update(dt);
    // Footstep SFX: track distance traveled; play a step every ~1.4m.
    const player = controls.getPlayerPosition();
    if (lastFootstepPos) {
      const dx = player.x - lastFootstepPos.x;
      const dz = player.z - lastFootstepPos.z;
      const moved = Math.sqrt(dx * dx + dz * dz);
      if (moved > 1.4) {
        audio().sfx.play(Math.random() < 0.5 ? "sfx_footstep_1" : "sfx_footstep_2");
        lastFootstepPos = { x: player.x, z: player.z };
      }
    } else {
      lastFootstepPos = { x: player.x, z: player.z };
    }
    // Update prompt based on proximity.
    if (screen === "office") {
      let nearestNPC: NPC | null = null;
      let nearestDist = Infinity;
      for (const npc of NPCS) {
        const dx = npc.position.x - player.x;
        const dz = npc.position.z - player.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < npc.triggerRadius && dist < nearestDist) {
          nearestNPC = npc;
          nearestDist = dist;
        }
      }
      if (hud) {
        if (nearestNPC) {
          showPrompt(hud, `Talk to ${nearestNPC.name}`);
        } else {
          // Check for desk near player for debug mini-game.
          let nearDesk = false;
          if (game.get().flags["got-acme-contract"]) {
            for (const npc of NPCS) {
              if (npc.id === "pawel") continue;
              const dx = npc.position.x - player.x;
              const dz = npc.position.z - player.z;
              const dist = Math.sqrt(dx * dx + dz * dz);
              if (dist < 2.5) {
                nearDesk = true;
                break;
              }
            }
          }
          showPrompt(hud, nearDesk ? "Use computer (Debug the Script)" : null);
        }
      }
    }
  }

  if (engine) {
    // Update server rack blinking light: not strictly needed for MVP; skipping.
    engine.render();
  }

  // Time tick: every 60 real seconds = 1 in-game time period (morning/afternoon/evening).
  // When time period changes, advance. When day changes (i.e. evening -> morning), end day.
  if (screen === "office") {
    if (inOfficeSince === 0) inOfficeSince = now;
    const elapsed = (now - inOfficeSince) / 1000;
    // 60s per period, 3 periods per day = 180s per day.
    const periodsElapsed = Math.floor(elapsed / 60);
    if (periodsElapsed > 0) {
      const prevDay = game.get().day;
      for (let i = 0; i < periodsElapsed; i++) {
        game.dispatch({ type: "advance-time" });
      }
      const afterDay = game.get().day;
      if (afterDay !== prevDay) {
        // Day changed -> end of previous day -> daily tick.
        inOfficeSince = now; // reset for the new day
        endDay();
      }
    }
  }

  requestAnimationFrame(frame);
}

// --- Boot ---

// Debug: expose engine + controls + player position on window for Playwright
// verification and dev-time inspection. Cheap, dev-only.
declare global {
  interface Window {
    __aitrainer?: {
      getPlayer: () => { x: number; y: number; z: number };
      getCamera: () => { x: number; y: number; z: number };
      getKeys: () => string[];
      isLocked: () => boolean;
    };
  }
}
window.__aitrainer = {
  getPlayer: () => {
    const p = controls?.getPlayerPosition();
    return p ? { x: p.x, y: p.y, z: p.z } : { x: 0, y: 0, z: 0 };
  },
  getCamera: () => {
    if (!engine) return { x: 0, y: 0, z: 0 };
    return { x: engine.camera.position.x, y: engine.camera.position.y, z: engine.camera.position.z };
  },
  getKeys: () => Array.from(keys),
  isLocked: () => controls?.isPointerLocked() ?? false,
};

frame();
showTitle();

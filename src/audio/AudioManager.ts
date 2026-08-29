/**
 * AudioManager: one facade for all in-game audio.
 *
 * Three layers sharing a single AudioContext:
 *
 *   - MusicLayer   crossfades between background tracks, ducks during TTS
 *   - SfxBus       short one-shots (footsteps, clicks, register) with priority
 *   - TtsPlayer    plays per-NPC voice clips, preloads a small ring buffer
 *
 * Plus an LLM helper for optional free-text NPC chat.
 *
 * Lazy init: nothing starts until the user first interacts (browser autoplay
 * policy). After init, the AudioContext stays warm.
 *
 * Silence-tolerant: any id that isn't in the manifest just no-ops, so the
 * game keeps working even if asset generation is still in progress.
 */

import { type Manifest, loadManifest, resolveUrl } from "./manifest";
import { MusicLayer } from "./music";
import { SfxBus } from "./sfx";
import { TtsPlayer } from "./tts";

export type MusicId = "music_title" | "music_office_ambient" | "music_minigame_debug" | "music_minigame_win" | "music_minigame_lose" | "music_day_end_calm" | "music_easter_egg" | "music_title_alt_jingle";

export type SfxId =
  | "sfx_footstep_1" | "sfx_footstep_2" | "sfx_click" | "sfx_hover"
  | "sfx_cash_register" | "sfx_error_buzzer" | "sfx_glitch" | "sfx_easter_chime"
  | "sfx_dialogue_open" | "sfx_dialogue_close" | "sfx_alarm" | "sfx_typing_burst"
  | "sfx_coffee_pour" | "sfx_printer_jam" | "sfx_server_beep" | "sfx_glitch_long"
  | "sfx_suspense" | "sfx_quest_done";

export interface AudioManagerAPI {
  /** Lazy init on first user gesture. Safe to call repeatedly. */
  init(): Promise<void>;
  /** Master mute (toggle from title screen). */
  setMuted(muted: boolean): void;
  isMuted(): boolean;
  /** Master volume 0..1 (default 0.7). */
  setMasterVolume(v: number): void;
  /** Music layer. */
  music: MusicLayer;
  /** SFX bus. */
  sfx: SfxBus;
  /** TTS player. */
  tts: TtsPlayer;
  /** Underlying AudioContext (for advanced callers). */
  context: AudioContext | null;
  /** True once the manifest is loaded. */
  isReady(): boolean;
  /** Per-NPC dialogue id for a given nodeId, e.g. "bartek_greeting". */
  dialogueId(npcId: string, nodeId: string): string;
}

export function createAudioManager(): AudioManagerAPI {
  let ctx: AudioContext | null = null;
  let masterGain: GainNode | null = null;
  let musicGain: GainNode | null = null;
  let sfxGain: GainNode | null = null;
  let ttsGain: GainNode | null = null;
  let muted = false;
  let masterVol = 0.7;
  let manifest: Manifest | null = null;
  let initPromise: Promise<void> | null = null;

  function ensureContext(): AudioContext | null {
    if (ctx) return ctx;
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      masterGain = ctx.createGain();
      musicGain = ctx.createGain();
      sfxGain = ctx.createGain();
      ttsGain = ctx.createGain();
      musicGain.connect(masterGain);
      sfxGain.connect(masterGain);
      ttsGain.connect(masterGain);
      masterGain.connect(ctx.destination);
      applyVolumes();
    } catch (e) {
      console.warn("AudioContext init failed:", e);
      ctx = null;
    }
    return ctx;
  }

  function applyVolumes(): void {
    if (!ctx || !masterGain) return;
    masterGain.gain.setValueAtTime(muted ? 0 : masterVol, ctx.currentTime);
  }

  const music = new MusicLayer(() => musicGain, () => resolveUrl(manifest, "music_office_ambient") /* placeholder */);
  const sfx = new SfxBus(() => sfxGain, (id) => resolveUrl(manifest, id));
  const tts = new TtsPlayer(() => ttsGain, (id) => resolveUrl(manifest, id), () => music);

  function init(): Promise<void> {
    if (initPromise) return initPromise;
    initPromise = (async () => {
      const c = ensureContext();
      if (c) {
        music.attachContext(c);
        sfx.attachContext(c);
        tts.attachContext(c);
      }
      manifest = await loadManifest();
      // Try to resume (autoplay policy).
      if (ctx && ctx.state === "suspended") {
        try { await ctx.resume(); } catch { /* ignore */ }
      }
    })();
    return initPromise;
  }

  // Some browsers fire the first user gesture in the title screen. We hook
  // a one-shot global listener so any click/key activates audio without
  // having to wire it through every UI mount.
  const activate = (): void => {
    void init();
  };
  window.addEventListener("pointerdown", activate, { once: true, passive: true });
  window.addEventListener("keydown", activate, { once: true });

  return {
    init,
    context: ctx,
    music,
    sfx,
    tts,
    setMuted(m: boolean) {
      muted = m;
      applyVolumes();
    },
    isMuted: () => muted,
    setMasterVolume(v: number) {
      masterVol = Math.max(0, Math.min(1, v));
      applyVolumes();
    },
    isReady: () => manifest !== null,
    dialogueId(npcId, nodeId) {
      return `${npcId}_${nodeId}`;
    },
  };
}

// Module-level singleton so all callers share the same context.
let _singleton: AudioManagerAPI | null = null;
export function audio(): AudioManagerAPI {
  if (!_singleton) _singleton = createAudioManager();
  return _singleton;
}

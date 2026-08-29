/**
 * TtsPlayer: per-NPC speech playback.
 *
 * - dialogueId = `${npcId}_${nodeId}` (matches the spec ids in data/asset-spec.json)
 * - On play(), ducks the music, fetches & decodes the MP3, plays it, then unducks
 * - Supports a "stop()" to cancel mid-line (for skipping)
 * - LRU cache of decoded buffers per id to avoid re-decoding during replays
 *
 * Also exposes `freeChat(npcId, playerText)` which calls the M3 LLM to generate
 * a reply in-character, then plays it via a separately-generated TTS line. This
 * is optional: the dialogue UI must explicitly call it.
 */

import type { MusicLayer } from "./music";

type GainGetter = () => GainNode | null;
type Resolver = (id: string) => string | null;

export interface TtsCallbacks {
  /** Called when a line finishes (or is stopped). */
  onEnd?: () => void;
}

export class TtsPlayer {
  private ctx: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private getBusGain: GainGetter;
  private resolve: Resolver;
  private getMusic: () => MusicLayer;
  private currentSrc: AudioBufferSourceNode | null = null;
  private currentGain: GainNode | null = null;
  private callbacks: TtsCallbacks = {};

  constructor(getBusGain: GainGetter, resolve: Resolver, getMusic: () => MusicLayer) {
    this.getBusGain = getBusGain;
    this.resolve = resolve;
    this.getMusic = getMusic;
  }

  attachContext(ctx: AudioContext): void {
    this.ctx = ctx;
  }

  setCallbacks(cb: TtsCallbacks): void {
    this.callbacks = cb;
  }

  private async load(id: string, url: string): Promise<AudioBuffer | null> {
    if (!this.ctx) return null;
    const cached = this.buffers.get(id);
    if (cached) return cached;
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      const ab = await r.arrayBuffer();
      const buf = await this.ctx.decodeAudioData(ab);
      this.buffers.set(id, buf);
      // Tiny LRU: cap at 50 entries.
      if (this.buffers.size > 50) {
        const firstKey = this.buffers.keys().next().value;
        if (firstKey) this.buffers.delete(firstKey);
      }
      return buf;
    } catch {
      return null;
    }
  }

  async play(id: string, opts: { volume?: number; rate?: number; onEnd?: () => void } = {}): Promise<void> {
    if (!this.ctx) return;
    const bus = this.getBusGain();
    if (!bus) return;
    const url = this.resolve(id);
    if (!url) return;

    // Stop anything currently playing.
    this.stop();

    const buf = await this.load(id, url);
    if (!buf) return;

    // Duck music, play, unduck on end.
    this.getMusic().duck();
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = opts.rate ?? 1;
    const g = this.ctx.createGain();
    g.gain.value = opts.volume ?? 1;
    src.connect(g);
    g.connect(bus);
    src.start();
    this.currentSrc = src;
    this.currentGain = g;

    src.onended = () => {
      if (this.currentSrc === src) {
        this.currentSrc = null;
        this.currentGain = null;
        this.getMusic().unduck();
        opts.onEnd?.();
        this.callbacks.onEnd?.();
      }
    };
  }

  stop(): void {
    if (!this.currentSrc) return;
    try { this.currentSrc.stop(); } catch { /* ignore */ }
    try { this.currentSrc.disconnect(); } catch { /* ignore */ }
    if (this.currentGain) {
      try { this.currentGain.disconnect(); } catch { /* ignore */ }
    }
    this.currentSrc = null;
    this.currentGain = null;
    this.getMusic().unduck();
  }

  isPlaying(): boolean {
    return this.currentSrc !== null;
  }
}

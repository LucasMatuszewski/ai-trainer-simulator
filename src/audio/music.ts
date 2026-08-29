/**
 * MusicLayer: handles background music with crossfade and TTS ducking.
 *
 * - One track plays at a time.
 * - `play(id)` crossfades from the current track (or silence) over 600ms.
 * - `stop()` fades out and detaches.
 * - `duck()` lowers volume to 0.15 (called by TtsPlayer while speaking);
 *   `unduck()` restores. Tracks the current duck level so multiple callers
 *   don't fight.
 *
 * Tracks are preloaded as AudioBuffers. If the manifest is missing an id
 * the call is a no-op.
 */

type GainGetter = () => GainNode | null;

export class MusicLayer {
  private ctx: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private currentSource: AudioBufferSourceNode | null = null;
  private currentGain: GainNode | null = null;
  private currentId: string | null = null;
  private getBusGain: GainGetter;
  private duckLevel = 0; // 0 = no duck, 1 = full duck
  private musicVolume = 0.55;
  private isLooping = false;

  constructor(getBusGain: GainGetter, _unusedResolveUrl: (id: string) => string | null) {
    this.getBusGain = getBusGain;
  }

  /** Wire the AudioContext once the manager has created it. */
  attachContext(ctx: AudioContext): void {
    this.ctx = ctx;
  }

  private async load(id: string, url: string): Promise<AudioBuffer | null> {
    if (!this.ctx) return null;
    if (this.buffers.has(id)) return this.buffers.get(id) ?? null;
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      const ab = await r.arrayBuffer();
      const buf = await this.ctx.decodeAudioData(ab);
      this.buffers.set(id, buf);
      return buf;
    } catch (e) {
      console.warn(`[music] failed to load ${id}:`, e);
      return null;
    }
  }

  async play(id: string, url: string | null, opts: { loop?: boolean; fadeMs?: number; musicVolume?: number } = {}): Promise<void> {
    if (!url || !this.ctx) return;
    const busGain = this.getBusGain();
    if (!busGain) return;
    const fadeSec = (opts.fadeMs ?? 600) / 1000;
    this.musicVolume = opts.musicVolume ?? this.musicVolume;
    this.isLooping = opts.loop ?? false;

    const buf = await this.load(id, url);
    if (!buf) return;

    // Same id already playing? Don't restart.
    if (this.currentId === id) return;

    // Build the new source + its own gain node so we can fade it in
    // independently.
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.loop = this.isLooping;
    const g = this.ctx.createGain();
    g.gain.value = 0;
    src.connect(g);
    g.connect(busGain);
    src.start();

    // Fade in.
    const now = this.ctx.currentTime;
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(this.musicVolume * (1 - this.duckLevel * 0.85), now + fadeSec);

    // Fade out the old one.
    if (this.currentGain && this.currentSource) {
      const old = this.currentGain;
      const oldSrc = this.currentSource;
      old.gain.cancelScheduledValues(now);
      old.gain.setValueAtTime(old.gain.value, now);
      old.gain.linearRampToValueAtTime(0, now + fadeSec);
      // Stop + disconnect after fade.
      setTimeout(() => {
        try { oldSrc.stop(); } catch { /* already stopped */ }
        try { oldSrc.disconnect(); } catch { /* ignore */ }
        try { old.disconnect(); } catch { /* ignore */ }
      }, fadeSec * 1000 + 50);
    }

    this.currentSource = src;
    this.currentGain = g;
    this.currentId = id;

    src.onended = () => {
      if (this.currentSource === src) {
        this.currentSource = null;
        this.currentGain = null;
        this.currentId = null;
      }
    };
  }

  stop(fadeMs = 400): void {
    if (!this.ctx || !this.currentGain || !this.currentSource) return;
    const fadeSec = fadeMs / 1000;
    const now = this.ctx.currentTime;
    this.currentGain.gain.cancelScheduledValues(now);
    this.currentGain.gain.setValueAtTime(this.currentGain.gain.value, now);
    this.currentGain.gain.linearRampToValueAtTime(0, now + fadeSec);
    const src = this.currentSource;
    setTimeout(() => {
      try { src.stop(); } catch { /* ignore */ }
    }, fadeSec * 1000 + 50);
    this.currentSource = null;
    this.currentGain = null;
    this.currentId = null;
  }

  duck(): void {
    this.duckLevel = Math.max(0, Math.min(1, this.duckLevel + 1));
    this.applyDuck();
  }
  unduck(): void {
    this.duckLevel = Math.max(0, this.duckLevel - 1);
    this.applyDuck();
  }
  private applyDuck(): void {
    if (!this.ctx || !this.currentGain) return;
    const now = this.ctx.currentTime;
    const target = this.musicVolume * (1 - this.duckLevel * 0.85);
    this.currentGain.gain.cancelScheduledValues(now);
    this.currentGain.gain.setValueAtTime(this.currentGain.gain.value, now);
    this.currentGain.gain.linearRampToValueAtTime(target, now + 0.15);
  }

  getCurrentId(): string | null {
    return this.currentId;
  }
}

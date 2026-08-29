/**
 * SfxBus: one-shot sound effects.
 *
 * Each call to play() spawns its own AudioBufferSourceNode, applies a small
 * random pitch/volume variation for variety, and lets it run to completion.
 * No tail clipping, no polyphony cap (most SFX are <1s so this is fine).
 *
 * If an id is missing, play() no-ops (does not throw).
 */

type GainGetter = () => GainNode | null;
type Resolver = (id: string) => string | null;

export class SfxBus {
  private ctx: AudioContext | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private getBusGain: GainGetter;
  private resolve: Resolver;
  private volume = 0.85;

  constructor(getBusGain: GainGetter, resolve: Resolver) {
    this.getBusGain = getBusGain;
    this.resolve = resolve;
  }

  attachContext(ctx: AudioContext): void {
    this.ctx = ctx;
  }

  setVolume(v: number): void {
    this.volume = Math.max(0, Math.min(1, v));
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
      // Most SFX are tiny and decode reliably; if one fails, just skip it.
      return null;
    }
  }

  /** Play an SFX. Returns immediately. Safe to call before context is ready. */
  play(id: string, opts: { volume?: number; pitchJitter?: number; rate?: number } = {}): void {
    if (!this.ctx) return;
    const bus = this.getBusGain();
    if (!bus) return;
    const url = this.resolve(id);
    if (!url) return;

    // Fire and forget. Load in background; if it succeeds, schedule the play.
    void this.load(id, url).then((buf) => {
      if (!buf || !this.ctx) return;
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      // Small rate jitter so repeated footsteps/clicks don't sound robotic.
      const jitter = opts.pitchJitter ?? 0.06;
      src.playbackRate.value = (opts.rate ?? 1) * (1 + (Math.random() * 2 - 1) * jitter);

      const g = this.ctx.createGain();
      const v = (opts.volume ?? 1) * this.volume;
      g.gain.value = v;
      src.connect(g);
      g.connect(bus);
      src.start();
      // Cleanup when done.
      src.onended = () => {
        try { src.disconnect(); } catch { /* ignore */ }
        try { g.disconnect(); } catch { /* ignore */ }
      };
    });
  }
}

/**
 * UI: live FPS / frame-time meter, bottom-left, toggled with F3.
 *
 * C-65 (Lucas, 2026-09-02): "can you add FPS counter live in the
 * left-bottom corner? Toggled with some shortcut to hide it? For me game
 * is very smooth but we should measure it."
 *
 * "We should measure it" is why this reports more than one number. A
 * smoothed average hides exactly the thing that makes a game feel bad -
 * a single 250 ms hitch inside an otherwise perfect second still averages
 * out to a healthy-looking figure. The 1% low (the 99th-percentile frame
 * time, expressed as fps) is the standard metric for that, so a stutter
 * shows up as a number that drops even while the headline fps does not.
 *
 * F3 is the binding because it is the near-universal "debug overlay" key
 * (Minecraft and most engines), and nothing in this game used it.
 */

/** Frames kept for the rolling statistics: ~2 s at 60 fps. Shorter and
 *  the 1% low degenerates into "the worst of the last few frames", which
 *  flickers and tells you nothing. */
export const FPS_WINDOW_FRAMES = 120;

/** How often the DOM text is rewritten. The sampler still sees every
 *  frame; only the readout is throttled, because text that changes 60
 *  times a second is unreadable. */
export const FPS_READOUT_INTERVAL_MS = 250;

/** localStorage key for the visibility toggle, so the choice survives a
 *  reload the way the rest of the game's preferences do. */
export const FPS_VISIBLE_STORAGE_KEY = "aitrainer:fps-meter:v1";

export interface FpsStats {
  /** Frames per second over the window (from the MEAN frame time). */
  fps: number;
  /** Mean frame time in milliseconds. */
  avgMs: number;
  /** The slowest single frame in the window, in milliseconds. */
  worstMs: number;
  /** 99th-percentile frame time expressed as fps - the "1% low". */
  lowFps: number;
  /** How many frames the window currently holds. */
  samples: number;
}

export interface FpsSampler {
  /** Record one frame's duration in milliseconds. */
  push(frameMs: number): void;
  stats(): FpsStats;
}

const EMPTY_STATS: FpsStats = { fps: 0, avgMs: 0, worstMs: 0, lowFps: 0, samples: 0 };

/**
 * A fixed-size ring of recent frame times.
 *
 * Deliberately allocation-free per frame: this runs inside the render
 * loop, and a meter that causes the stutter it is measuring would be
 * worse than no meter at all.
 */
export function createFpsSampler(windowFrames: number = FPS_WINDOW_FRAMES): FpsSampler {
  const size = Math.max(1, Math.trunc(windowFrames));
  const times = new Float64Array(size);
  let count = 0;
  let head = 0;
  // Scratch buffer for the percentile sort, reused between calls.
  const sorted = new Float64Array(size);

  return {
    push(frameMs: number): void {
      if (!Number.isFinite(frameMs) || frameMs <= 0) return;
      times[head] = frameMs;
      head = (head + 1) % size;
      if (count < size) count += 1;
    },
    stats(): FpsStats {
      if (count === 0) return EMPTY_STATS;
      let total = 0;
      let worst = 0;
      for (let i = 0; i < count; i += 1) {
        const value = times[i]!;
        total += value;
        if (value > worst) worst = value;
        sorted[i] = value;
      }
      const window = sorted.subarray(0, count);
      window.sort();
      // 99th percentile frame time: the slowest 1% of frames start here.
      const index = Math.min(count - 1, Math.floor(count * 0.99));
      const p99 = window[index]!;
      const avgMs = total / count;
      return {
        fps: avgMs > 0 ? 1000 / avgMs : 0,
        avgMs,
        worstMs: worst,
        lowFps: p99 > 0 ? 1000 / p99 : 0,
        samples: count,
      };
    },
  };
}

/**
 * Chrome-only, non-standard, and absent in Firefox and Safari - so it is
 * read through a narrow shape and treated as optional rather than typed
 * as `any`.
 */
interface PerformanceWithMemory {
  memory?: { usedJSHeapSize?: number };
}

export function readJsHeapBytes(perf: Performance = performance): number | null {
  const memory = (perf as Performance & PerformanceWithMemory).memory;
  const used = memory?.usedJSHeapSize;
  return typeof used === "number" && Number.isFinite(used) ? used : null;
}

/**
 * What the renderer did last frame. Supplied by the caller from
 * `WebGLRenderer.info.render` so this module never imports three.js.
 *
 * C-65 amendment (Lucas: "It seams low FPS? Does it mean we should
 * optimize the game?"): fps alone cannot answer that. Draw calls and
 * triangle count are what separate "this scene is too heavy" from "this
 * machine has no GPU" - on software rendering the frame rate collapses
 * while the draw-call count stays perfectly reasonable.
 */
export interface RenderCost {
  calls: number;
  triangles: number;
}

/** Build the readout text. Pure, so the wording is testable. */
export function formatFpsLine(
  stats: FpsStats,
  heapBytes: number | null,
  cost: RenderCost | null = null,
): string {
  if (stats.samples === 0) return "measuring...";
  // Below 10 the 1% low needs a decimal: rounding a genuine 0.4 fps
  // stutter to "0" reads as a broken meter rather than a measurement.
  const low = stats.lowFps < 10 ? stats.lowFps.toFixed(1) : String(Math.round(stats.lowFps));
  const parts = [
    `${Math.round(stats.fps)} FPS`,
    `${stats.avgMs.toFixed(1)} ms`,
    `1% low ${low}`,
  ];
  if (heapBytes !== null) parts.push(`${Math.round(heapBytes / (1024 * 1024))} MB`);
  if (cost !== null) {
    parts.push(`${cost.calls} draws`);
    parts.push(`${formatTriangles(cost.triangles)} tris`);
  }
  return parts.join("  ");
}

function formatTriangles(triangles: number): string {
  if (triangles >= 1_000_000) return `${(triangles / 1_000_000).toFixed(1)}M`;
  if (triangles >= 1000) return `${Math.round(triangles / 1000)}k`;
  return String(triangles);
}

export interface FpsMeter {
  /** Feed one frame. Safe to call every frame; the DOM update is throttled. */
  frame(frameMs: number, cost?: RenderCost | null): void;
  toggle(): void;
  isVisible(): boolean;
  destroy(): void;
}

function readStoredVisibility(): boolean {
  try {
    return localStorage.getItem(FPS_VISIBLE_STORAGE_KEY) === "1";
  } catch {
    // Private mode / blocked storage: default to hidden.
    return false;
  }
}

function storeVisibility(visible: boolean): void {
  try {
    localStorage.setItem(FPS_VISIBLE_STORAGE_KEY, visible ? "1" : "0");
  } catch {
    // Not worth breaking the game over a rejected write.
  }
}

/**
 * Mount the meter into `parent` and wire the F3 toggle.
 *
 * Hidden by default: the counter is a measurement tool, not decoration,
 * and the first thing a new player sees should not be a debug overlay.
 */
export function mountFpsMeter(parent: HTMLElement = document.body): FpsMeter {
  const el = document.createElement("div");
  el.className = "fps-meter";
  el.setAttribute("aria-hidden", "true");
  el.textContent = "measuring...";
  parent.appendChild(el);

  const sampler = createFpsSampler();
  let visible = readStoredVisibility();
  let lastReadoutAt = 0;

  const apply = (): void => {
    el.classList.toggle("visible", visible);
  };
  apply();

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "F3") return;
    // F3 is "search again" in some browsers; the game owns it here.
    event.preventDefault();
    visible = !visible;
    storeVisibility(visible);
    apply();
  };
  window.addEventListener("keydown", onKeyDown);

  return {
    frame(frameMs: number, cost: RenderCost | null = null): void {
      sampler.push(frameMs);
      if (!visible) return;
      const now = performance.now();
      if (now - lastReadoutAt < FPS_READOUT_INTERVAL_MS) return;
      lastReadoutAt = now;
      el.textContent = formatFpsLine(sampler.stats(), readJsHeapBytes(), cost);
    },
    toggle(): void {
      visible = !visible;
      storeVisibility(visible);
      apply();
    },
    isVisible(): boolean {
      return visible;
    },
    destroy(): void {
      window.removeEventListener("keydown", onKeyDown);
      el.remove();
    },
  };
}

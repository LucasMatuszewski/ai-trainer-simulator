/**
 * C-65 (Lucas, 2026-09-02): "can you add FPS counter live in the
 * left-bottom corner? Toggled with some shortcut to hide it? For me game
 * is very smooth but we should measure it."
 *
 * The point is measurement, so the sampler reports more than a single
 * smoothed number: a bare "60 FPS" hides exactly the stutter that makes
 * a game feel bad. The 1% low is the standard metric for that.
 */
import { describe, expect, it } from "vitest";
import {
  FPS_WINDOW_FRAMES,
  createFpsSampler,
  formatFpsLine,
} from "../../src/ui/fps-meter";

describe("fps sampler", () => {
  it("reports nothing useful until it has a sample", () => {
    const stats = createFpsSampler().stats();
    expect(stats.samples).toBe(0);
    expect(stats.fps).toBe(0);
    expect(stats.avgMs).toBe(0);
  });

  it("computes fps from steady frame times", () => {
    const sampler = createFpsSampler();
    for (let i = 0; i < 60; i += 1) sampler.push(16.667);
    const stats = sampler.stats();
    expect(stats.fps).toBeCloseTo(60, 0);
    expect(stats.avgMs).toBeCloseTo(16.667, 2);
    expect(stats.samples).toBe(60);
  });

  it("keeps only the most recent window of frames", () => {
    const sampler = createFpsSampler(10);
    // Ten slow frames, then ten fast ones: the slow ones must age out.
    for (let i = 0; i < 10; i += 1) sampler.push(100);
    for (let i = 0; i < 10; i += 1) sampler.push(10);
    const stats = sampler.stats();
    expect(stats.samples).toBe(10);
    expect(stats.avgMs).toBeCloseTo(10, 5);
    expect(stats.fps).toBeCloseTo(100, 0);
  });

  it("surfaces a stutter as a 1% low well under the average fps", () => {
    // 99 good frames and one 250 ms hitch. The average still looks fine;
    // the 1% low is what a player actually notices.
    const sampler = createFpsSampler(100);
    for (let i = 0; i < 99; i += 1) sampler.push(16.667);
    sampler.push(250);
    const stats = sampler.stats();
    expect(stats.fps).toBeGreaterThan(30);
    expect(stats.lowFps).toBeLessThan(10);
    expect(stats.worstMs).toBeCloseTo(250, 5);
  });

  it("ignores frame times that are zero, negative or not finite", () => {
    const sampler = createFpsSampler();
    sampler.push(Number.NaN);
    sampler.push(Number.POSITIVE_INFINITY);
    sampler.push(0);
    sampler.push(-5);
    expect(sampler.stats().samples).toBe(0);
    sampler.push(20);
    expect(sampler.stats().samples).toBe(1);
  });

  it("uses a window long enough to hold a couple of seconds of frames", () => {
    // Too short and the 1% low is just "the worst of the last few
    // frames", which flickers and means nothing.
    expect(FPS_WINDOW_FRAMES).toBeGreaterThanOrEqual(60);
  });
});

describe("fps readout formatting", () => {
  it("renders fps, frame time and the 1% low", () => {
    const sampler = createFpsSampler();
    for (let i = 0; i < 60; i += 1) sampler.push(16.667);
    const line = formatFpsLine(sampler.stats(), null);
    expect(line).toContain("60 FPS");
    expect(line).toContain("16.7 ms");
    expect(line).toContain("1% low");
  });

  it("appends JS heap only when the browser exposes it", () => {
    const sampler = createFpsSampler();
    sampler.push(16.667);
    expect(formatFpsLine(sampler.stats(), null)).not.toContain("MB");
    expect(formatFpsLine(sampler.stats(), 41 * 1024 * 1024)).toContain("41 MB");
  });

  it("says so instead of printing a fake zero before the first frame", () => {
    expect(formatFpsLine(createFpsSampler().stats(), null)).toContain("measuring");
  });
});

describe("fps readout precision (C-65)", () => {
  it("keeps a decimal on a sub-10 1% low so it does not read as broken", () => {
    const sampler = createFpsSampler(100);
    for (let i = 0; i < 99; i += 1) sampler.push(16.667);
    sampler.push(2500); // a 2.5 s hitch: 0.4 fps
    const line = formatFpsLine(sampler.stats(), null);
    expect(line).toContain("1% low 0.4");
    expect(line).not.toContain("1% low 0 ");
  });

  it("rounds the 1% low once it is a normal frame rate", () => {
    const sampler = createFpsSampler(100);
    for (let i = 0; i < 100; i += 1) sampler.push(20);
    expect(formatFpsLine(sampler.stats(), null)).toContain("1% low 50");
  });
});

describe("render cost readout (C-65 amendment)", () => {
  /**
   * Lucas: "It seams low FPS? Does it mean we should optimize the game?"
   * FPS alone cannot answer that. Draw calls and triangles separate "the
   * scene is too heavy" from "this machine has no GPU".
   */
  it("omits render cost when the caller has no renderer yet", () => {
    const sampler = createFpsSampler();
    sampler.push(16.667);
    const line = formatFpsLine(sampler.stats(), null, null);
    expect(line).not.toContain("draws");
  });

  it("shows draw calls and triangles when supplied", () => {
    const sampler = createFpsSampler();
    sampler.push(16.667);
    const line = formatFpsLine(sampler.stats(), null, { calls: 214, triangles: 48_500 });
    expect(line).toContain("214 draws");
    expect(line).toContain("49k tris");
  });

  it("scales triangle counts so the line stays readable", () => {
    const sampler = createFpsSampler();
    sampler.push(16.667);
    expect(formatFpsLine(sampler.stats(), null, { calls: 1, triangles: 900 })).toContain("900 tris");
    expect(formatFpsLine(sampler.stats(), null, { calls: 1, triangles: 2_400_000 })).toContain("2.4M tris");
  });
});

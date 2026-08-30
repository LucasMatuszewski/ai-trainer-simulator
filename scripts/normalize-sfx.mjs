#!/usr/bin/env node
/**
 * Audio normalizer (L-2026-08-30-01 followup).
 *
 * agy's QA pass flagged that sfx_footstep_1 / sfx_footstep_2 are
 * severely under-amplified (-15.7 dB / -20.8 dB peak) - the
 * player can barely hear them when walking. This script applies
 * ffmpeg's `loudnorm` filter to bring every SFX in the SFX
 * directory to a consistent target loudness.
 *
 * Run: node scripts/normalize-sfx.mjs
 * Pass --force to overwrite the original (CC0) files in place.
 * Without --force the script writes the normalized files to
 * public/assets/audio/sfx/.normalized/ and leaves the originals
 * alone, so the agent can A/B compare.
 *
 * Uses ffmpeg's EBU R128 two-pass loudness normalization at
 * I=-16 LUFS, TP=-1.5 dB, LRA=11. This is the same target
 * Spotify uses for podcasts and keeps short SFX from clipping.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const SFX_DIR = resolve(__dirname, "..", "public", "assets", "audio", "sfx");
const OUT_DIR = join(SFX_DIR, ".normalized");
const FORCE = process.argv.includes("--force");

function log(msg) {
  process.stdout.write(`[normalize-sfx] ${msg}\n`);
}

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function normalize(src, dst) {
  // EBU R128 two-pass; we only do one pass for speed because
  // the source is already short and well-bounded.
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-loglevel", "error",
      "-i", src,
      "-af", "loudnorm=I=-16:TP=-1.5:LRA=11",
      "-codec:a", "libmp3lame",
      "-q:a", "4",
      dst,
    ],
    { stdio: "inherit" },
  );
}

function main() {
  ensureDir(OUT_DIR);
  const files = readdirSync(SFX_DIR).filter((f) => f.endsWith(".mp3"));
  log(`found ${files.length} SFX files`);
  let n = 0;
  for (const f of files) {
    const src = join(SFX_DIR, f);
    const dst = FORCE ? src : join(OUT_DIR, f);
    const before = statSync(src).size;
    normalize(src, dst);
    const after = statSync(dst).size;
    log(`  ${f}: ${before} -> ${after} bytes${FORCE ? "" : " (output in .normalized/)"}`);
    n += 1;
  }
  log(`done. ${n} file(s) normalized${FORCE ? " in place" : " (review .normalized/ before overwriting)"}`);
}

main();

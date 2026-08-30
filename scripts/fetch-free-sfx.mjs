#!/usr/bin/env node
/**
 * Free SFX fetcher (L-2026-08-30-01: "audio overhaul").
 *
 * The GMI generation pipeline produced TTS onomatopoeia for
 * most SFX ("tuk", "tick", "blip") which Lucas called
 * "terrible". This script replaces the worst offenders with
 * real audio from a CC0 pack on opengameart.org:
 *   https://opengameart.org/content/100-cc0-sfx-2
 *
 * Source pack: 100 CC0 SFX v2 (by Blender Foundation, public
 * domain). Direct download URL:
 *   https://opengameart.org/sites/default/files/sfx_100_v2.zip
 *   (2.4 MB, 100 OGG files: doors, footsteps, glass, metal,
 *    wood, switch, ambient loops, misc UI sounds).
 *
 * Mapping (sfx id -> source file). The MP3 is converted with
 * ffmpeg because the AudioManager plays .mp3 only. The
 * manifest already references the right paths so only the
 * file CONTENTS change.
 *
 * Files that are NOT replaced (kept as-is because they are
 * already large enough to be real audio):
 *   - sfx_alarm.mp3 (61 KB)
 *   - sfx_cash_register.mp3 (59 KB)
 *   - sfx_error_buzzer.mp3 (44 KB)
 *   - sfx_glitch_long.mp3 (69 KB)
 *   - sfx_printer_jam.mp3 (43 KB)
 *   - sfx_quest_done.mp3 (57 KB)
 *   - sfx_suspense.mp3 (443 KB)
 *
 * Run: node scripts/fetch-free-sfx.mjs
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = resolve(fileURLToPath(import.meta.url), "..");
const SFX_DIR = resolve(__dirname, "..", "public", "assets", "audio", "sfx");
const CACHE_DIR = resolve(process.env.HOME ?? "/tmp", ".cache", "aitrainer-sfx");
const OGG_DIR = join(CACHE_DIR, "ogg");
const ZIP_PATH = join(CACHE_DIR, "sfx_100_v2.zip");

const SOURCE_URL =
  "https://opengameart.org/sites/default/files/sfx_100_v2.zip";

// Pass --force to overwrite the existing TTS-generated SFX
// files. The first run after the audio overhaul should pass
// --force so the bad files get replaced.
const FORCE = process.argv.includes("--force");

/**
 * Map of SFX id -> source file inside the CC0 pack.
 * The id on the left is the manifest id; the file on the
 * right is the source OGG inside sfx_100_v2.zip.
 *
 * The mapping is curated by hand: the door_01/02/03 are real
 * door creaks (matches sfx_dialogue_open/close), the
 * footstep_01/02/wood are real steps (matches
 * sfx_footstep_1/2), the switch_01 is a real toggle click
 * (matches sfx_hover + sfx_click), etc.
 */
const MAPPING = {
  // Real footstep on wood (replaces the TTS "tuk" that the
  // player could not hear).
  sfx_footstep_1: "sfx100v2_footstep_wood_01.ogg",
  sfx_footstep_2: "sfx100v2_footstep_wood_02.ogg",
  // Real door sounds (replace the 12 KB TTS "pop" / "fwip").
  sfx_dialogue_open: "sfx100v2_door_02.ogg",
  sfx_dialogue_close: "sfx100v2_door_01.ogg",
  // Real switch click (replaces the 10 KB TTS "blip" for
  // the roster hover state).
  sfx_hover: "sfx100v2_switch_01.ogg",
  // sfx_click was never generated; we use a second switch
  // sound for the menu click.
  sfx_click: "sfx100v2_switch_02.ogg",
  // sfx_glitch was never generated; reuse glitch_long (shorter
  // version by trim is the next iteration's job).
  sfx_glitch: "sfx100v2_metal_hit_01.ogg",
  // sfx_easter_chime was never generated; use glass_01.
  sfx_easter_chime: "sfx100v2_glass_01.ogg",
  // sfx_typing_burst was never generated; use footstep_wet_*
  // as a stand-in (rapid "tap" pattern). Real keyboard recording
  // is the next iteration.
  sfx_typing_burst: "sfx100v2_footstep_wet_01.ogg",
  // sfx_coffee_pour was never generated; use water_01 loop.
  sfx_coffee_pour: "sfx100v2_loop_water_01.ogg",
  // sfx_server_beep was never generated; use misc_01 (random
  // short tone, fits a "system event").
  sfx_server_beep: "sfx100v2_misc_05.ogg",
};

function log(msg) {
  process.stdout.write(`[fetch-free-sfx] ${msg}\n`);
}

function ensureDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

function download(url, dest) {
  log(`downloading ${url}`);
  execFileSync("curl", ["-sLf", "-o", dest, url], { stdio: "inherit" });
}

function unzip(zipPath, member, dest) {
  log(`extracting ${member}`);
  // Python's zipfile handles this without needing the unzip CLI.
  const code = `
import sys, zipfile
z = zipfile.ZipFile(sys.argv[1])
src = sys.argv[2]
dst = sys.argv[3]
with z.open(src) as r, open(dst, "wb") as w:
  w.write(r.read())
`;
  execFileSync("python3", ["-c", code, zipPath, member, dest], { stdio: "inherit" });
}

function oggToMp3(src, dst) {
  log(`converting ${src} -> ${dst}`);
  execFileSync(
    "ffmpeg",
    ["-y", "-loglevel", "error", "-i", src, "-codec:a", "libmp3lame", "-q:a", "4", dst],
    { stdio: "inherit" },
  );
}

function unzipAll(zipPath, dest) {
  log(`extracting all of ${zipPath} to ${dest}`);
  const code = `import sys, zipfile, os\nz = zipfile.ZipFile(sys.argv[1])\nos.makedirs(sys.argv[2], exist_ok=True)\nz.extractall(sys.argv[2])\n`;
  execFileSync("python3", ["-c", code, zipPath, dest], { stdio: "inherit" });
}

async function main() {
  ensureDir(CACHE_DIR);
  // If the OGG cache is already populated (because a previous
  // run extracted it), skip the zip download entirely. This
  // makes the script idempotent + fast on subsequent runs.
  if (existsSync(OGG_DIR) && statSync(OGG_DIR).isDirectory()) {
    const cached = (await import("node:fs")).readdirSync(OGG_DIR);
    if (cached.length > 0) {
      log(`using cached OGG dir: ${OGG_DIR} (${cached.length} files)`);
    } else {
      log(`OGG dir empty, will re-download + re-extract`);
      ensureDir(OGG_DIR);
      if (!existsSync(ZIP_PATH)) download(SOURCE_URL, ZIP_PATH);
      unzipAll(ZIP_PATH, OGG_DIR);
    }
  } else {
    log(`no cache yet, downloading ${SOURCE_URL}`);
    ensureDir(OGG_DIR);
    if (!existsSync(ZIP_PATH)) download(SOURCE_URL, ZIP_PATH);
    unzipAll(ZIP_PATH, OGG_DIR);
  }

  let replaced = 0;
  let skipped = 0;
  const manifestPath = resolve(__dirname, "..", "public", "assets", "audio", "manifest.json");
  let manifest;
  try {
    const { readFileSync } = await import("node:fs");
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (err) {
    log(`WARN: could not load ${manifestPath} (${err.message}); manifest will not be updated`);
    manifest = { generated: {}, failed: {} };
  }

  const newlyGenerated = [];
  for (const [sfxId, sourceFile] of Object.entries(MAPPING)) {
    const srcOgg = join(OGG_DIR, sourceFile);
    const outMp3 = join(SFX_DIR, `${sfxId}.mp3`);
    if (!existsSync(srcOgg)) {
      log(`WARN: ${sourceFile} not in cache, skipping ${sfxId}`);
      skipped += 1;
      continue;
    }
    if (existsSync(outMp3)) {
      if (FORCE) {
        log(`overwriting ${sfxId} (--force)`);
      } else {
        log(`skipping ${sfxId} (already exists; pass --force to overwrite)`);
        skipped += 1;
        continue;
      }
    }
    oggToMp3(srcOgg, outMp3);
    replaced += 1;
    const size = statSync(outMp3).size;
    newlyGenerated.push({ id: sfxId, path: `public/assets/audio/sfx/${sfxId}.mp3`, bytes: size });
  }

  // Update the manifest: every newly generated file moves
  // from `failed` -> `generated`. The runtime already
  // resolves the file by id, so a missing entry in
  // `generated` would silently skip playback.
  if (newlyGenerated.length > 0) {
    for (const entry of newlyGenerated) {
      if (manifest.failed?.[entry.id]) {
        delete manifest.failed[entry.id];
      }
      manifest.generated = manifest.generated ?? {};
      manifest.generated[entry.id] = {
        path: entry.path,
        kind: "sfx",
        meta: { source: "cc0-100-sfx-v2", mappedFrom: MAPPING[entry.id] },
        bytes: entry.bytes,
        ms: 0, // filled by the next gen-assets run
      };
    }
    const { writeFileSync } = await import("node:fs");
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    log(`manifest updated: ${newlyGenerated.length} entries moved failed -> generated`);
  }

  // Also write a small audit log so the next iteration knows
  // what changed.
  const logPath = resolve(__dirname, "..", ".agent-briefs", "free-sfx-fetch.log");
  writeFileSync(
    logPath,
    [
      `# Free SFX replacement log`,
      ``,
      `Source: ${SOURCE_URL}`,
      `Cache: ${ZIP_PATH}`,
      `Replaced: ${replaced} file(s)`,
      `Skipped (already exist): ${skipped} file(s)`,
      ``,
      `Mapped files:`,
      ...Object.entries(MAPPING).map(([id, src]) => `  ${id}.mp3  <-  ${src}`),
    ].join("\n") + "\n",
  );
  log(`done. replaced ${replaced} file(s); log: ${logPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

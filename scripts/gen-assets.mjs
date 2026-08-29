#!/usr/bin/env node
/**
 * Asset generator: pulls down a pre-authored content spec, calls the GMI
 * TTS / Music APIs, and writes mp3 files under public/assets/audio/ plus a
 * manifest.json that the browser runtime fetches at startup.
 *
 * Usage:
 *   node scripts/gen-assets.mjs --only music
 *   node scripts/gen-assets.mjs --only speech-en
 *   node scripts/gen-assets.mjs --only sfx
 *   node scripts/gen-assets.mjs              # everything (sequential)
 *
 * The spec is data/asset-spec.json (edited by humans, not generated).
 * Items already in the manifest are skipped (resumable).
 *
 * Output goes to public/ so Vite copies it to dist as-is at build time.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tts, music, llm, saveAudio, paths, loadEnv } from "./gmi-client.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SPEC = resolve(ROOT, "data", "asset-spec.json");
const MANIFEST = paths.manifest;

await loadEnv();

const only = (process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : "all").trim();

// --- spec + manifest --------------------------------------------------------

function loadSpec() {
  if (!existsSync(SPEC)) {
    console.error("missing spec:", SPEC);
    process.exit(1);
  }
  return JSON.parse(readFileSync(SPEC, "utf8"));
}

function loadManifest() {
  if (!existsSync(MANIFEST)) return { generated: {}, failed: {} };
  return JSON.parse(readFileSync(MANIFEST, "utf8"));
}

function saveManifest(m) {
  writeFileSync(MANIFEST, JSON.stringify(m, null, 2));
}

function alreadyDone(m, id) {
  if (!m.generated[id]) return false;
  const p = resolve(ROOT, m.generated[id].path);
  if (existsSync(p)) return true;
  // Tolerate stale paths from before we moved audio from src/ to public/.
  const alt = p.replace("/src/assets/", "/public/assets/");
  return existsSync(alt);
}

// --- run a single job -------------------------------------------------------

async function runOne(m, id, job) {
  if (alreadyDone(m, id)) {
    process.stdout.write(`[skip] ${id}\n`);
    return;
  }
  process.stdout.write(`[gen ] ${id} ... `);
  const t0 = Date.now();
  try {
    let buf;
    let outRel;
    if (job.kind === "tts") {
      buf = await tts(job.text, job.opts || {});
      outRel = join("public/assets/audio/speech", `${id}.${job.opts?.format ?? "mp3"}`);
    } else if (job.kind === "music") {
      buf = await music(job.lyrics, job.prompt, job.opts || {});
      outRel = join("public/assets/audio/music", `${id}.${job.opts?.format ?? "mp3"}`);
    } else if (job.kind === "sfx-tts") {
      // SFX delivered via TTS with sound_effects (e.g. spacious_echo + robotic)
      buf = await tts(job.text, job.opts || {});
      outRel = join("public/assets/audio/sfx", `${id}.${job.opts?.format ?? "mp3"}`);
    } else {
      throw new Error(`unknown job kind: ${job.kind}`);
    }
    const outAbs = resolve(ROOT, outRel);
    await saveAudio(buf, outAbs);
    m.generated[id] = { path: outRel, kind: job.kind, meta: job.meta ?? {}, bytes: buf.length, ms: Date.now() - t0 };
    saveManifest(m);
    process.stdout.write(`ok (${(buf.length/1024).toFixed(1)} KB in ${m.generated[id].ms}ms)\n`);
  } catch (e) {
    process.stdout.write(`FAIL: ${e.message.slice(0, 80)}\n`);
    m.failed[id] = { error: e.message, ts: Date.now() };
    saveManifest(m);
  }
}

// --- runner -----------------------------------------------------------------

const spec = loadSpec();
const m = loadManifest();

const groups = {
  music: spec.music ?? [],
  sfx: spec.sfx ?? [],
  "speech-en": spec.speech?.en ?? [],
  "speech-es": spec.speech?.es ?? [],
  "speech-pt": spec.speech?.pt ?? [],
  "speech-zh": spec.speech?.zh ?? [],
  "speech-pl": spec.speech?.pl ?? [],
};

let totalQueued = 0;
let totalSkipped = 0;

for (const [groupName, items] of Object.entries(groups)) {
  if (only !== "all" && only !== groupName) continue;
  console.log(`\n=== ${groupName} (${items.length} jobs) ===`);
  for (const [id, job] of items) {
    if (alreadyDone(m, id)) {
      totalSkipped++;
      continue;
    }
    totalQueued++;
    await runOne(m, id, job);
    // tiny breather so we don't slam the API
    await new Promise((res) => setTimeout(res, 250));
  }
}

console.log(`\nDone. queued=${totalQueued} skipped=${totalSkipped} generated=${Object.keys(m.generated).length} failed=${Object.keys(m.failed).length}`);
if (Object.keys(m.failed).length) {
  console.log("Failed ids:");
  for (const k of Object.keys(m.failed)) console.log("  -", k);
}

/**
 * GMI (gmicloud.ai) API client for the ai-trainer-simulator asset pipeline.
 *
 * Provides:
 *   - tts(text, opts)        -> mp3 buffer  (uses minmax-tts-speech-2.8-hd)
 *   - music(lyrics, prompt)  -> mp3 buffer  (uses minmax-music-3.0)
 *   - llm(messages, opts)    -> string      (uses MiniMaxAI/MiniMax-M3)
 *
 * All three calls share the same bearer key (env GMI_API_KEY). TTS and Music
 * are submitted to the GMI request queue and polled to completion. The LLM
 * call is OpenAI-compatible and synchronous.
 *
 * NOT bundled into the browser - the browser fetches already-generated
 * pre-rendered files from /assets/audio/ at runtime.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- env loading (Node only) -----------------------------------------------

export async function loadEnv() {
  const envPath = resolve(__dirname, "..", ".env");
  if (!existsSync(envPath)) return;
  const fs = await import("node:fs");
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (k && process.env[k] === undefined) process.env[k] = v;
  }
}

// --- core fetch helpers ----------------------------------------------------

const QUEUE_BASE = "https://console.gmicloud.ai/api/v1/ie/requestqueue/apikey/requests";
const LLM_BASE = "https://api.gmi-serving.com/v1/chat/completions";

function authHeader() {
  const k = process.env.GMI_API_KEY;
  if (!k) throw new Error("GMI_API_KEY not set in .env");
  return { Authorization: `Bearer ${k}`, "Content-Type": "application/json" };
}

async function submitAndPoll(body, timeoutMs = 300_000) {
  const r = await fetch(QUEUE_BASE, { method: "POST", headers: authHeader(), body: JSON.stringify(body) });
  const j = await r.json();
  if (!j.request_id) throw new Error(`submit failed: ${JSON.stringify(j).slice(0, 400)}`);
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    await new Promise((res) => setTimeout(res, 1500));
    const pr = await fetch(`${QUEUE_BASE}/${j.request_id}`, { headers: authHeader() });
    const pj = await pr.json();
    if (pj.status === "success") return pj;
    if (pj.status === "failed") throw new Error(`job failed: ${JSON.stringify(pj).slice(0, 400)}`);
  }
  throw new Error(`poll timeout after ${timeoutMs}ms`);
}

function pickAudioUrl(outcome) {
  return outcome?.media_urls?.[0]?.url ?? outcome?.audio_url ?? outcome?.medias?.[0]?.url;
}

async function downloadToBuffer(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download failed ${r.status}: ${url}`);
  const ab = await r.arrayBuffer();
  return Buffer.from(ab);
}

// --- public API ------------------------------------------------------------

export async function tts(text, opts = {}) {
  const model = process.env.GMI_SPEECH_MODEL || "minimax-tts-speech-2.8-hd";
  const payload = {
    text,
    voice_id: opts.voice_id ?? "English_expressive_narrator",
    speed: opts.speed ?? 1,
    vol: opts.vol ?? 1,
    pitch: opts.pitch ?? 0,
    emotion: opts.emotion ?? "auto",
    language_boost: opts.language_boost ?? "auto",
    format: opts.format ?? "mp3",
    audio_sample_rate: String(opts.sample_rate ?? 32000),
    bitrate: String(opts.bitrate ?? 128000),
    channel: String(opts.channel ?? 2),
    sound_effects: opts.sound_effects ?? "",
  };
  const out = await submitAndPoll({ model, payload }, 180_000);
  const url = pickAudioUrl(out.outcome);
  if (!url) throw new Error(`no audio url: ${JSON.stringify(out.outcome).slice(0, 400)}`);
  return await downloadToBuffer(url);
}

export async function music(lyrics, prompt, opts = {}) {
  const model = process.env.GMI_MUSIC_MODEL || "minimax-music-3.0";
  const payload = {
    lyrics,
    prompt: prompt ?? "",
    sample_rate: opts.sample_rate ?? 44100,
    bitrate: opts.bitrate ?? 256000,
    format: opts.format ?? "mp3",
  };
  const out = await submitAndPoll({ model, payload }, 300_000);
  const url = pickAudioUrl(out.outcome);
  if (!url) throw new Error(`no audio url: ${JSON.stringify(out.outcome).slice(0, 400)}`);
  return await downloadToBuffer(url);
}

export async function llm(messages, opts = {}) {
  const model = process.env.GMI_LLM_MODEL || "MiniMaxAI/MiniMax-M3";
  const r = await fetch(LLM_BASE, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ model, messages, max_tokens: opts.max_tokens ?? 512, temperature: opts.temperature ?? 0.7 }),
  });
  if (!r.ok) throw new Error(`llm http ${r.status}: ${await r.text()}`);
  const j = await r.json();
  return j.choices?.[0]?.message?.content ?? "";
}

// --- helper: save buffer to asset path ------------------------------------

export async function saveAudio(buffer, outPath) {
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, buffer);
  return outPath;
}

export const paths = {
  audioRoot: resolve(__dirname, "..", "public", "assets", "audio"),
  sfx: resolve(__dirname, "..", "public", "assets", "audio", "sfx"),
  music: resolve(__dirname, "..", "public", "assets", "audio", "music"),
  speech: resolve(__dirname, "..", "public", "assets", "audio", "speech"),
  manifest: resolve(__dirname, "..", "public", "assets", "audio", "manifest.json"),
};

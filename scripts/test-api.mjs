#!/usr/bin/env node
/**
 * Quick test that the GMI TTS + Music + LLM APIs work with our key.
 * Runs 1 sample per API and prints results without leaking secrets.
 */
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (k && process.env[k] === undefined) process.env[k] = v;
  }
}

const KEY = process.env.GMI_API_KEY;
const SPEECH_MODEL = process.env.GMI_SPEECH_MODEL;
const MUSIC_MODEL = process.env.GMI_MUSIC_MODEL;
const LLM_MODEL = process.env.GMI_LLM_MODEL;
const BASE = "https://console.gmicloud.ai/api/v1/ie/requestqueue/apikey/requests";

if (!KEY) { console.error("no GMI_API_KEY"); process.exit(1); }

async function poll(requestId, timeoutMs = 180_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const r = await fetch(`${BASE}/${requestId}`, { headers: { Authorization: `Bearer ${KEY}` }});
    const j = await r.json();
    if (j.status === "success" || j.status === "failed") return j;
    await new Promise((res) => setTimeout(res, 2000));
  }
  throw new Error("timeout");
}

async function tts(text) {
  const r = await fetch(BASE, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: SPEECH_MODEL,
      payload: { text, voice_id: "English_expressive_narrator", emotion: "happy", format: "mp3" },
    }),
  });
  const j = await r.json();
  if (!j.request_id) throw new Error("no request_id: " + JSON.stringify(j));
  const out = await poll(j.request_id);
  if (out.status !== "success") throw new Error("tts failed: " + JSON.stringify(out));
  return out.outcome?.media_urls?.[0]?.url ?? out.outcome?.audio_url ?? out.outcome?.medias?.[0]?.url;
}

async function music(lyrics, prompt) {
  const r = await fetch(BASE, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MUSIC_MODEL,
      payload: { lyrics, prompt, sample_rate: 44100, bitrate: 256000, format: "mp3" },
    }),
  });
  const j = await r.json();
  if (!j.request_id) throw new Error("no request_id: " + JSON.stringify(j));
  const out = await poll(j.request_id, 300_000);
  if (out.status !== "success") throw new Error("music failed: " + JSON.stringify(out));
  return out.outcome?.media_urls?.[0]?.url ?? out.outcome?.audio_url ?? out.outcome?.medias?.[0]?.url;
}

async function llm(prompt) {
  const r = await fetch("https://api.gmi-serving.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    }),
  });
  const j = await r.json();
  return j.choices?.[0]?.message?.content;
}

(async () => {
  console.log("=== TTS ===");
  const ttsUrl = await tts("Hello. The server is up. This is a one second test.");
  console.log("tts url:", ttsUrl?.slice(0, 80) + "...");

  console.log("=== Music ===");
  const musicUrl = await music("[verse]\nTest beep boop.\nLine two.\n", "chiptune, 8-bit retro, 120bpm");
  console.log("music url:", musicUrl?.slice(0, 80) + "...");

  console.log("=== LLM ===");
  const llmOut = await llm("Reply with one short sentence in the style of a bored IT consultant.");
  console.log("llm:", llmOut);

  console.log("\nALL OK");
})().catch((e) => { console.error("FAIL:", e.message); process.exit(1); });

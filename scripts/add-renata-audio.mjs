/**
 * C-64: add Renata's tutorial speech + the photocopier SFX to the asset spec.
 *
 * The dialogue UI already resolves TTS by `${npcId}_${nodeId}` (main.ts), so
 * generating files under those ids is the whole job - no runtime wiring.
 *
 * Run: node scripts/add-renata-audio.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SPEC_PATH = resolve(ROOT, "data", "asset-spec.json");
const TREE_PATH = resolve(ROOT, "src", "content", "dialogues-renata.ts");

// Renata: warm, unflappable office manager. The Graceful Lady voice is the
// existing female timbre in the voice map; slightly slower than Klaudia's
// influencer cadence because these lines are the tutorial and must be
// followable on first hearing.
const RENATA_VOICE = {
  voice_id: "English_Graceful_Lady",
  emotion: "happy",
  speed: 1.0,
  pitch: 1,
};

/**
 * Pull `id: "x"` / `text: "..."` pairs out of the tutorial tree source.
 * A regex rather than an import because this is a .ts module with type-only
 * imports, and the spec only needs the strings.
 */
function extractNodes(source) {
  // Only the first tree in the file is the tutorial (RENATA_FIRST_MEETING).
  const start = source.indexOf("nodes: {");
  const secondTree = source.indexOf("nodes: {", start + 1);
  const region = source.slice(start, secondTree === -1 ? undefined : secondTree);
  const out = [];
  const re = /id:\s*"([a-z0-9_-]+)"[\s\S]{0,80}?text:\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(region)) !== null) {
    const id = m[1];
    const text = m[2].replace(/\\"/g, '"').replace(/\\n/g, " ").trim();
    if (id === "_end" || text.length === 0) continue;
    out.push({ id, text });
  }
  return out;
}

const spec = JSON.parse(readFileSync(SPEC_PATH, "utf8"));
const nodes = extractNodes(readFileSync(TREE_PATH, "utf8"));
if (nodes.length === 0) {
  console.error("no tutorial nodes found - the tree shape changed");
  process.exit(1);
}

spec._voice_map.renata = RENATA_VOICE;

const existing = new Set(spec.speech.en.map(([id]) => id));
let added = 0;
for (const { id, text } of nodes) {
  const specId = `renata_${id}`;
  if (existing.has(specId)) continue;
  spec.speech.en.push([
    specId,
    {
      kind: "tts",
      text,
      opts: { ...RENATA_VOICE },
      meta: { npc: "renata", node: id, use: "C-64 tutorial / help centre" },
    },
  ]);
  added += 1;
}

// The photocopier: a short mechanical whirr-clunk. `sfx-tts` is how every
// other effect in this project is made - TTS is coaxed into making the noise
// because there is no separate SFX model in the pipeline.
const sfxIds = new Set(spec.sfx.map(([id]) => id));
if (!sfxIds.has("sfx_photocopier")) {
  spec.sfx.push([
    "sfx_photocopier",
    {
      kind: "sfx-tts",
      text: "vzhoom ka-chunk",
      opts: {
        voice_id: "English_expressive_narrator",
        speed: 0.85,
        pitch: -8,
        emotion: "calm",
        format: "mp3",
        sound_effects: "",
      },
      meta: { use: "C-64 Xerox scanner sweep during Renata's copy run" },
    },
  ]);
  added += 1;
}

writeFileSync(SPEC_PATH, `${JSON.stringify(spec, null, 2)}\n`, "utf8");
console.log(`added ${added} entries`);
for (const { id, text } of nodes) console.log(`  renata_${id}: ${text.slice(0, 70)}`);

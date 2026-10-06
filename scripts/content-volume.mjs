/**
 * Content volume baseline (WS0, ADR-0009 AC-27 / TAC-07 / test scenario 8).
 *
 * Imports the ACTUAL authored content modules at the current commit
 * through Vite's SSR module loader (no regex parsing, no duplicated
 * data) and counts the distinct normalized authored strings per
 * category:
 *
 *   - dialogueNodes     — every dialogue tree node's spoken text
 *   - dialogueOptions   — every player option label
 *   - chatterStarters   — office + lunch chatter starter lines
 *   - chatterResponses  — office + lunch chatter response lines
 *   - greetingLines     — morning greeting pools (per-NPC + per-category)
 *   - goodbyeLines      — evening goodbye pools (per-NPC)
 *   - burekLines        — the dog's marked lines
 *
 * Normalization: trim, collapse internal whitespace, lowercase. The
 * totals written to `tests/unit/content/volume-baseline.json` are the
 * FROZEN baseline the later 10x content-volume test (AC-27) measures
 * against: the content tree is identical to commit 42000fd (the plan
 * commit the ADR names), and this script must not be re-run to move
 * the baseline — moving it is an orchestrator decision (C-68-style
 * immutability for numbers).
 *
 * Usage: node scripts/content-volume.mjs
 */

import { createServer } from "vite";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { execSync } from "node:child_process";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(repoRoot, "tests/unit/content/volume-baseline.json");

/** Trim, collapse whitespace, lowercase — the scenario-8 normalization. */
function normalize(line) {
  return String(line).trim().replace(/\s+/g, " ").toLowerCase();
}

class Bucket {
  constructor(name) {
    this.name = name;
    this.raw = 0;
    this.distinct = new Set();
  }

  add(line) {
    if (typeof line !== "string" || line.length === 0) return;
    this.raw += 1;
    this.distinct.add(normalize(line));
  }

  addAll(lines) {
    for (const line of lines ?? []) this.add(line);
  }

  toJSON() {
    return { raw: this.raw, distinct: this.distinct.size };
  }
}

const buckets = {
  dialogueNodes: new Bucket("dialogueNodes"),
  dialogueOptions: new Bucket("dialogueOptions"),
  chatterStarters: new Bucket("chatterStarters"),
  chatterResponses: new Bucket("chatterResponses"),
  greetingLines: new Bucket("greetingLines"),
  goodbyeLines: new Bucket("goodbyeLines"),
  burekLines: new Bucket("burekLines"),
  v2PoolStrings: new Bucket("v2PoolStrings"),
};

const everything = new Set();

function record(bucket, lines) {
  bucket.addAll(lines);
  for (const line of lines ?? []) {
    if (typeof line === "string" && line.length > 0) everything.add(normalize(line));
  }
}

function headShort() {
  try {
    return execSync("git rev-parse --short HEAD", { cwd: repoRoot }).toString().trim();
  } catch {
    return "unknown";
  }
}

const server = await createServer({
  root: repoRoot,
  logLevel: "error",
  clearScreen: false,
  server: { middlewareMode: true, hmr: false },
});

try {
  // Dialogue trees: DIALOGUES already merges dialogues-more.ts and
  // dialogues-renata.ts into itself (see the bottom of dialogues.ts).
  const dialoguesMod = await server.ssrLoadModule("/src/content/dialogues.ts");
  const officeChatterMod = await server.ssrLoadModule("/src/content/office-chatter.ts");
  const lunchMod = await server.ssrLoadModule("/src/content/lunch-dialogues.ts");
  const dogMod = await server.ssrLoadModule("/src/content/dog-dialogues.ts");
  const greetingsMod = await server.ssrLoadModule("/src/content/morning-greetings.ts");
  const goodbyesMod = await server.ssrLoadModule("/src/content/evening-goodbyes.ts");
  // C-78/sacs-xtma.14 audit: the v2 dialogue pools (paired option/reply
  // content) count as their own category — legacy trees are untouched, so
  // the 10x growth lands here.
  const poolsMod = await server.ssrLoadModule("/src/content/npc-content/dialogue-pools.ts");
  const poolsBucket = buckets.v2PoolStrings;
  const poolRegistryMod = await server.ssrLoadModule("/src/content/npc-content/registry.ts");
  // NPC ids come from the profiles module (the roster source of truth).
  const profilesMod = await server.ssrLoadModule("/src/content/npc-profiles.ts");
  const npcIds = profilesMod.NPC_IDS;
  poolsMod.registerNpcDialoguePools();
  for (const npcId of npcIds) {
    const pool = poolsMod.dialoguePoolFor(npcId);
    if (pool === undefined) continue;
    for (const topic of pool.topics) {
      poolsBucket.add(topic.label ?? topic.id);
      for (const option of topic.optionCandidates) {
        poolsBucket.add(option.text);
        for (const reply of option.replies ?? []) poolsBucket.add(reply.text);
      }
      for (const reply of topic.replyCandidates ?? []) poolsBucket.add(reply.text);
    }
    for (const task of pool.taskOffers ?? []) {
      poolsBucket.add(`${task.title} ${task.description} ${task.rewardHint ?? ""}`);
    }
  }

  // Shape-agnostic walk: each DIALOGUES value is normally a
  // Record<treeId, DialogueTree>, but tolerate a bare tree as well.
  for (const [npcId, npcValue] of Object.entries(dialoguesMod.DIALOGUES)) {
    const trees = npcValue !== null && typeof npcValue === "object" && npcValue.nodes === undefined
      ? Object.values(npcValue)
      : [npcValue];
    for (const tree of trees) {
      for (const node of Object.values(tree?.nodes ?? {})) {
        record(buckets.dialogueNodes, [node.text]);
        record(buckets.dialogueOptions, (node.options ?? []).map((option) => option.text));
      }
    }
    if (trees.length === 0) console.warn(`  note: no trees for "${npcId}"`);
  }

  for (const pool of [officeChatterMod.OFFICE_CHATTER, lunchMod.LUNCH_CHATTER]) {
    for (const exchange of pool) {
      record(buckets.chatterStarters, [exchange.starter]);
      record(buckets.chatterResponses, exchange.responses);
    }
  }

  for (const lines of Object.values(greetingsMod.GREETINGS_BY_NPC)) {
    record(buckets.greetingLines, lines);
  }
  for (const lines of Object.values(greetingsMod.GREETINGS_BY_CATEGORY)) {
    record(buckets.greetingLines, lines);
  }

  for (const lines of Object.values(goodbyesMod.GOODBYE_BY_NPC)) {
    record(buckets.goodbyeLines, lines);
  }

  record(buckets.burekLines, dogMod.BUREK_LINES);
} finally {
  await server.close();
}

const categories = Object.fromEntries(
  Object.entries(buckets).map(([name, bucket]) => [name, bucket.toJSON()]),
);

const baseline = {
  generatedBy: "node scripts/content-volume.mjs (imports the real content modules via Vite SSR)",
  frozenAgainstCommit: "42000fd",
  sourceCommit: headShort(),
  normalization: "trim + collapse whitespace + lowercase; per-category distinct sets",
  scopeNotes: [
    "dialogueNodes/dialogueOptions come from DIALOGUES (dialogues.ts, which already merges dialogues-more.ts and dialogues-renata.ts).",
    "chatter pools are OFFICE_CHATTER + LUNCH_CHATTER (starters and responses counted separately).",
    "greetingLines cover GREETINGS_BY_NPC + GREETINGS_BY_CATEGORY (the one-line FALLBACK pool is not exported and not counted).",
    "goodbyeLines cover GOODBYE_BY_NPC (the private GENERIC/DOG pools are not exported and not counted).",
    "Node/link/button copy is UI affordance text, not authored dialogue, and is not counted.",
  ],
  categories,
  totals: {
    raw: Object.values(buckets).reduce((sum, bucket) => sum + bucket.raw, 0),
    distinctNormalized: Object.values(buckets).reduce((sum, bucket) => sum + bucket.distinct.size, 0),
    distinctNormalizedGlobal: everything.size,
  },
};

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(baseline, null, 2)}\n`);

console.log(`Content volume baseline written to ${path.relative(repoRoot, outputPath)}`);
for (const [name, stats] of Object.entries(categories)) {
  console.log(`  ${name.padEnd(18)} raw=${String(stats.raw).padStart(5)}  distinct=${stats.distinct}`);
}
console.log(
  `  TOTAL              raw=${String(baseline.totals.raw).padStart(5)}  distinct=${baseline.totals.distinctNormalized} (global unique ${baseline.totals.distinctNormalizedGlobal})`,
);

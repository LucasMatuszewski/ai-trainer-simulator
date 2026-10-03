// PR-14 live smoke: exercise createOpenRouterAdapter (the REAL game path)
// with REAL credentials, then record provider-side evidence (generation id).
// Run: npx tsx scripts/live-smoke-pr14.mjs   (needs OPENROUTER_API_KEY in
// ~/.config/secrets.env). Never prints the key.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url).href);

const env = readFileSync(process.env.HOME + "/.config/secrets.env", "utf8");
const line = env.split("\n").find((l) => l.trim().replace(/^export\s+/, "").startsWith("OPENROUTER_API_KEY="));
const apiKey = line.trim().replace(/^export\s+/, "").split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
process.env.OPENROUTER_API_KEY = apiKey;

const { createOpenRouterAdapter } = await import(new URL("../src/jev/openrouter-adapter.ts", import.meta.url).href);

const adapter = createOpenRouterAdapter({ apiKey });
console.log("isConfigured:", adapter.isConfigured());

const result = await adapter.request(
  {
    "npcs.tomek": { id: "tomek", name: "Tomek", role: "Junior Developer" },
    relationship: { value: 15, band: "cold", daysWorked: 1, rapport: "barely know each other, still formal" },
    period: "morning",
    place: "open space",
    events: ["prod-outage"],
    question: "Is prod on fire? Be honest.",
    candidate_replies: {
      "tomek:prod:rep-1": "Prod is not on fire. Prod is WARM...",
      "tomek:prod:rep-2": "Red is the dashboard's resting color...",
      "tomek:prod:rep-3": "Okay, honest? It burned last night. I hotfixed it at 2am from my phone...",
    },
  },
  [
    {
      id: "dialogue:reply:tomek",
      type: "choice",
      prompt: "The player asked Tomek: 'Is prod on fire? Be honest.' Given the relationship and today's events, which reply in candidate_replies would Tomek actually say right now?",
      subjectId: "tomek",
      candidates: [
        { id: "tomek:prod:rep-1", description: "Prod is not on fire. Prod is WARM...", priority: 0 },
        { id: "tomek:prod:rep-2", description: "Red is the dashboard's resting color...", priority: 1 },
        { id: "tomek:prod:rep-3", description: "Okay, honest? It burned last night. I hotfixed it at 2am from my phone...", priority: 2 },
      ],
    },
    {
      id: "dialogue:reaction:tomek",
      type: "noul",
      prompt: "Would Tomek be pleased that the player asked about prod?",
      subjectId: "tomek",
    },
  ],
  { decisionId: "live-smoke-pr14-001", generation: "day-1", surface: "reply-selection", timeoutMs: 15000, retries: 0 },
);

console.log(JSON.stringify(result, null, 1).slice(0, 600));
writeFileSync(new URL("../tests/eval-results/live-smoke-pr14.json", import.meta.url), JSON.stringify({ ran: new Date().toISOString(), result }, null, 2));
console.log("saved: tests/eval-results/live-smoke-pr14.json");

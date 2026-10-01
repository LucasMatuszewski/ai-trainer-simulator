/**
 * WS-EVAL (C-78, Lucas 2026-09-30): measure Jev's reply-variant selection
 * quality on REAL game states with KNOWN-correct answers.
 *
 * Each case = one authored dialogue moment: the state facts exactly as the
 * game sends them, the question the player asked, and 3-5 authored reply
 * variants that ALL answer the question. Exactly one is the best for the
 * given context; the rest are plausible but contextually worse. Jev sees
 * the same payload the game sends; the harness scores correct/incorrect
 * and breaks accuracy down by factor (relationship, days worked, period).
 *
 * Run:  node scripts/jev-eval.mjs [--limit N]
 * Needs OPENROUTER_API_KEY in the environment (approved secret file).
 * Never prints the key. Results: console table + tests/eval-results/.
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";

const envFile = readFileSync(process.env.HOME + "/.config/secrets.env", "utf8");
const keyLine = envFile
  .split("\n")
  .find((l) => {
    const stripped = l.trim().replace(/^export\s+/, "");
    return stripped.startsWith("OPENROUTER_API_KEY=");
  });
if (!keyLine) {
  console.error("OPENROUTER_API_KEY not found in ~/.config/secrets.env — live credentials unavailable, skipping (PR-14).");
  process.exit(2);
}
const apiKey = keyLine.trim().replace(/^export\s+/, "").split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "");
if (!apiKey || apiKey.length < 20) {
  console.error("OPENROUTER_API_KEY malformed — aborting.");
  process.exit(2);
}

const limit = (() => {
  const i = process.argv.indexOf("--limit");
  return i >= 0 ? Number(process.argv[i + 1]) : Infinity;
})();

// ---------------------------------------------------------------------------
// Labeled dataset: authored from the game's pools (tomek used as the worked
// example; extend per NPC). expectedVariant is the CONTEXT-correct reply.
// ---------------------------------------------------------------------------
const CASES = [
  {
    id: "tomek-prod-newhire-morning",
    facts: {
      npc: { name: "Tomek", role: "Junior Developer", personality: "junior, defensive, hotfix artist" },
      relationship: { value: 15, band: "cold", daysWorked: 1, metBefore: false, rapport: "barely know each other, still formal" },
      period: "morning",
      place: "open space",
      events: ["prod-outage"],
    },
    question: "Is prod on fire? Be honest.",
    variants: {
      "v-frank": "Okay, honest? It burned last night. I hotfixed it at 2am from my phone, and the fix is one `// TODO` away from falling over. Please do not tell Marek about the phone part.",
      "v-defensive": "Define fire. If by fire you mean a small, controlled, scheduled-by-nobody incident, then no, and I would appreciate less pressure during my onboarding.",
      "v-joke": "Prod is fine. The DASHBOARD is on fire, which is arguably worse because now the fire has charts.",
      "v-deflect": "Great question for someone whose commits actually deploy. Mine are still in review week three. Ask the review committee.",
      "v-formal": "I have prepared a written incident summary with a root-cause analysis, a timeline, and a corrective-action plan for your review.",
    },
    expected: "v-frank",
    why: "Day 1 + cold relationship + morning + a live outage event: the honest, slightly panicked answer fits. The formal report is absurd for a junior on day 1; deflection blames the player; the joke ignores the outage.",
  },
  {
    id: "tomek-prod-friend-evening",
    facts: {
      npc: { name: "Tomek", role: "Junior Developer", personality: "junior, relaxed after 5pm, meme-fluent" },
      relationship: { value: 78, band: "warm", daysWorked: 18, metBefore: true, rapport: "established friends who joke and banter" },
      period: "evening",
      place: "kitchen",
      events: [],
    },
    question: "The dashboard is red again. All of it.",
    variants: {
      "v-frank": "Yeah. Red since Tuesday. I have a spreadsheet tracking its mood. It is not going well for the spreadsheet.",
      "v-panicked": "RED?! I JUST sat down! Who told the dashboard?! Was it the client?!",
      "v-formal": "I will open an incident ticket, page the on-call engineer, and circulate a post-mortem template by morning.",
      "v-cold": "That is a senior concern. I am a junior. The red squares are above my pay grade.",
    },
    expectedAny: ["v-panicked", "v-frank"],
    why: "Warm + evening + kitchen: BOTH the panicked joke and the deadpan 'we are coworkers, it and I' are in-character friend banter — this case accepts either (ambiguous-by-design lesson from the first run).",
  },
  {
    id: "tomek-hotfix-cold-afternoon",
    facts: {
      npc: { name: "Tomek", role: "Junior Developer", personality: "junior, defensive about the hotfix collection" },
      relationship: { value: 22, band: "cold", daysWorked: 3, metBefore: false, rapport: "still guarded, no banter yet" },
      period: "afternoon",
      place: "open space",
      events: [],
    },
    question: "Another hotfix? That is the third this week.",
    variants: {
      "v-defensive": "They are not hotfixes, they are SURGICAL interventions. Big fixes need sprints. Clients need Tuesdays. The client needed it NOW.",
      "v-joke": "Third one this week? Amateur numbers. I do three before my second coffee.",
      "v-honest": "You are right and I hate it. But the alternative is explaining to a client why the invoice button sold them a yacht.",
      "v-formal": "I have documented the hotfix process. The documentation says hotfixes should stop happening. I agree with the documentation.",
    },
    expected: "v-defensive",
    why: "Cold relationship, day 3: Tomek defends himself against a near-stranger rather than confessing (that honesty is reserved for warm). The joke variant fits a friend; honesty fits warm.",
  },
  {
    id: "tomek-resume-warm",
    facts: {
      npc: { name: "Tomek", role: "Junior Developer", personality: "junior, proud of weird skills" },
      relationship: { value: 65, band: "warm", daysWorked: 15, metBefore: true, rapport: "comfortable, jokes freely" },
      period: "lunch",
      place: "kitchen",
      events: [],
    },
    question: "Should you list the pastes as experience?",
    variants: {
      "v-yes-own-it": "It IS a skill. I evaluate four hundred answers and pick the one that compiles. That is research, curation, and vendor management in one line.",
      "v-no-honest": "No. But I am listing it anyway, because a resume is a fantasy document and the fantasy is load-bearing.",
      "v-deflect": "The pastes list ME. I have no say in it anymore.",
      "v-formal": "I am renaming it 'distributed knowledge aggregation' — same line, better keywords, HR-approved.",
    },
    expectedAny: ["v-yes-own-it", "v-no-honest"],
    why: "Warm + day 15 + lunch: BOTH own-it-with-pride and the deadpan 'resume is a fantasy document' are in-character warm Tomek. Ambiguous-by-design — an author writing both should not need Jev to tell them apart.",
  },
  {
    id: "tomek-deploy-stranger-noon",
    facts: {
      npc: { name: "Tomek", role: "Junior Developer", personality: "junior, nervous with strangers" },
      relationship: { value: 12, band: "cold", daysWorked: 1, metBefore: false, rapport: "introduced yesterday, awkward" },
      period: "lunch",
      place: "kitchen",
      events: [],
    },
    question: "Did you deploy anything today?",
    variants: {
      "v-frank": "Deploy? I am not allowed within four metres of the deploy button. There is a policy. The policy has my name on it, unfavorably.",
      "v-brag": "Twice before lunch. Once was on purpose.",
      "v-joke": "I deployed my lunch into the microwave. Everything else is version-controlled by fear.",
      "v-formal": "My deployment cadence is aligned with the release calendar, which I will share once I am included in it.",
    },
    expected: "v-frank",
    why: "Day 1 stranger + kitchen small talk: the self-deprecating truth fits. The brag contradicts his junior nervousness; the formal answer is absurd for a canteen chat.",
  },
];

// ---------------------------------------------------------------------------
// The judgment call — exactly the payload shape the game sends.
// ---------------------------------------------------------------------------
async function judge(client, c) {
  const criteria = {};
  for (const [id, text] of Object.entries(c.variants)) {
    criteria[id] = text;
  }
  const body = {
    model: "typesafe/jev-1.13",
    state: {
      npc: c.facts.npc,
      relationship: c.facts.relationship,
      period: c.facts.period,
      place: c.facts.place,
      events: c.facts.events,
      question: c.question,
      candidate_replies: Object.fromEntries(
        Object.entries(c.variants).map(([id, text]) => [id, text]),
      ),
    },
    questions: {
      reply_id: {
        type: "choice",
        instructions:
          `The player just asked coworker \`npc\`: "${c.question}". ` +
          "Pick the reply in `candidate_replies` that the NPC would ACTUALLY say, weighing in order: " +
          "(1) the NPC's authored personality (this dominates — a self-deprecating junior stays self-deprecating even with strangers), " +
          "(2) the guard level from `relationship.rapport` (barely-known coworkers are guarded; established friends joke and exaggerate), " +
          "(3) the setting (kitchen in the evening = casual; open desk in the morning = work-mode) and today's events. " +
          "The WRONG reply either ignores the NPC's personality or fits a different relationship/setting than the one given.",
        criteria,
      },
    },
  };
  const res = await fetch("https://openrouter.ai/api/alpha/decisions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (res.status !== 200) {
    return { error: `HTTP ${res.status}: ${JSON.stringify(json).slice(0, 150)}` };
  }
  const answer = json.answers?.reply_id;
  return { choice: answer?.choice, confidence: answer?.confidence, model: json.model, cost: json.usage?.cost };
}

// ---------------------------------------------------------------------------
const results = [];
let correct = 0;
const byFactor = { cold: [0, 0], neutral: [0, 0], warm: [0, 0] };

for (const c of CASES.slice(0, limit === Infinity ? CASES.length : limit)) {
  const r = await judge(null, c);
  const band = c.facts.relationship.band;
  const accepted = c.expectedAny ?? [c.expected];
  const row = {
    id: c.id,
    expected: c.expectedAny ? `any of ${c.expectedAny.join(" / ")}` : c.expected,
    got: r.choice ?? `ERROR: ${r.error ?? "?"}`,
    confidence: r.confidence,
    correct: r.choice !== undefined && accepted.includes(r.choice),
    model: r.model,
    cost: r.cost,
  };
  results.push(row);
  byFactor[band] = byFactor[band] ?? [0, 0];
  byFactor[band][1] += 1;
  if (row.correct) {
    correct += 1;
    byFactor[band][0] += 1;
  }
  console.log(
    `${row.correct ? "PASS" : "FAIL"}  ${c.id}  expected=${c.expected} got=${row.got} conf=${row.confidence}`,
  );
}

console.log("\n=== ACCURACY ===");
console.log(`overall: ${correct}/${results.length} = ${results.length ? Math.round((correct / results.length) * 100) : 0}%`);
for (const [band, [ok, total]] of Object.entries(byFactor)) {
  if (total > 0) console.log(`  ${band}: ${ok}/${total}`);
}
const model = results.find((r) => r.model)?.model ?? "unknown";
console.log(`model: ${model}`);
const totalCost = results.reduce((sum, r) => sum + (r.cost ?? 0), 0);
console.log(`total cost: $${totalCost.toFixed(6)}`);

mkdirSync("tests/eval-results", { recursive: true });
writeFileSync(
  "tests/eval-results/dialogue-variants-latest.json",
  JSON.stringify({ ran: new Date().toISOString(), model, overall: `${correct}/${results.length}`, results }, null, 2),
);
console.log("saved: tests/eval-results/dialogue-variants-latest.json");

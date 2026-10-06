# Research — Jev / TypeSafe System One platform (2026-09-28)

**Purpose.** Input for a future ADR on steering NPC decisions in Stack Underflow with
Jev. This file covers the platform: what Jev is, what it returns, how to call it, what
it costs, where it fails. The companion file
[`2026-09-28-jev-npc-steering-analysis.md`](./2026-09-28-jev-npc-steering-analysis.md)
covers the game side: decision points, state, integration options, and open questions.

**Sources (all read 2026-09-28):** docs.typesafe.ai (`llms.txt` index, System One,
State, primitives, Confidence, HTTP API, JS SDK, Models, Jev 1.13 jaggedness,
intent-routing pattern), openrouter.ai Jev tutorial, plus the local Edukey skills
`jev-decision-routing` and `typesafe-ai` (both loaded this session).

---

## 1. What Jev is

Jev (TypeSafe's flagship, currently `jev-1.13.0`) is a **System One model**: an AI
model built for fast, structured decisions that software consumes directly, named for
Kahneman's fast/intuitive System 1. It takes natural-language-friendly **state**
(strings, JSON objects, arrays — text only) plus typed **questions**, and returns
**typed answers with calibrated probabilities**. It does not generate text, does not
explain itself, and cannot produce values outside the answer space you define.

Difference from a generative LLM:

| | Generative LLM | Jev (System One) |
| --- | --- | --- |
| Output | Free-form text | Typed answers + probabilities (Choice / Score / Noul) |
| Answer space | Unbounded | Defined up front by `criteria` (options / levels) |
| Latency | Seconds | ~100 ms, "suitable for real-time paths" |
| Pricing model | Input + output tokens | Input tokens only (output free) |
| Calibration | Overconfident by default | Trained for calibrated probabilities (RLCD) |
| Failure mode | Hallucination | Wrong judgment inside a valid schema — typed output guarantees the interface, **not truth** |

Key mental model from the building guide: **AI-powered software, not agents** —
deterministic code owns control flow, policy, thresholds, and side effects; the model
appears only where programmable common sense is needed. This maps 1:1 onto our game:
the game loop, clock, effects, and persistence stay code; Jev only steers bounded
NPC judgments.

## 2. The three primitives

| Primitive | Meaning | Criteria | Returns |
| --- | --- | --- | --- |
| **Choice** | "Which of these?" — one of a defined unordered set | Map of option → description (max 255 options); add an `other`/`none` option when the list may not cover the input | `choice`, `probabilities` (full distribution), `confidence` (0–1) |
| **Score** | Degree along an ordered dimension | Ordered list of 2–10 level descriptions | probability-weighted `score` (may fall between levels), `legend`, `probabilities`, `confidence` |
| **Noul** | "Is this true?" — yes/no | Optional true/false definitions | single `noul` value 0–1 (probability of yes). **No separate confidence field** — near 1 = strong yes, near 0.5 = both equally likely, near 0 = confident no (not "low confidence") |

Rules that matter for question design:

- Question **IDs are for code only** (never sent to the model) — the full meaning must
  live in `instructions`.
- State parts are referenced from instructions with backticked paths:
  `` Does `npc.relationship` … ``, `` `state.flags["got-acme-contract"]` ``.
- Ask **one narrow judgment per question**; split independently useful dimensions.
  Broad questions ("is this NPC happy with the player?") hide multiple judgments.
- **Independent questions over the same state batch into one request** — they run in
  parallel, cannot see each other's answers, and batching 13 questions was measured by
  the docs at "11.5x cheaper and 9.6x faster" than 13 separate calls.
- A second request is warranted **only** when an earlier answer is needed to build the
  next state or option set (dependent questions).
- Use structured objects/arrays in `instructions`/`criteria` when definitions,
  contrasts, exclusions, or examples clarify the judgment.

## 3. Request/response anatomy

HTTP (direct TypeSafe):

```
POST https://api.typesafe.ai/v1/systemone
Authorization: Bearer $TYPESAFE_API_KEY

{
  "model": "jev-1.13.0",
  "state": { "player_message": "...", "npc": {...}, "game": {...} },
  "questions": {
    "reply_id": { "type": "choice", "instructions": "...", "criteria": {...} },
    "pleased":   { "type": "noul",   "instructions": "..." }
  }
}
```

Response:

```json
{
  "model": "jev-1.13.0",
  "answers": {
    "reply_id": { "type": "choice", "choice": "reply_grateful",
                  "probabilities": {"reply_grateful": 0.82, "reply_guarded": 0.18},
                  "confidence": 0.64 },
    "pleased":  { "type": "noul", "noul": 0.77 }
  },
  "usage": { "input_tokens": 318, "output_tokens": 34 }
}
```

Errors: 401 (bad key), 422 (validation, names the field), 429 (rate limit), 529
(overloaded). SDKs retry 429/529 with exponential backoff by default.

JavaScript SDK: `@typesafe-ai/sdk` (ESM + CJS + TS declarations, Node ≥ 20 for the
Node client; a `fetch`-based config exists for other runtimes).

```ts
import { choice, noul, score, TypeSafeClient } from "@typesafe-ai/sdk";
const client = new TypeSafeClient({ apiKey, baseURL });
const res = await client.systemOne({
  state, // string | object | array
  questions: {
    reply_id: choice("Which reply does the NPC give?", { grateful: "...", guarded: "..." }),
    pleased:  noul("Is the NPC pleased by `player.last_line`?"),
    mood:     score("How warm does the NPC feel?", ["cold", "neutral", "warm"]),
  },
});
res.answers.reply_id.choice;       // fully typed from the question map
res.answers.reply_id.confidence;
```

## 4. Routes to the model

| Route | Endpoint | Notes |
| --- | --- | --- |
| Direct TypeSafe HTTP | `POST https://api.typesafe.ai/v1/systemone` | `TYPESAFE_API_KEY` |
| TypeSafe JS SDK (direct) | `new TypeSafeClient({ apiKey })` | default base `https://api.typesafe.ai` |
| **OpenRouter Decisions API** | `POST https://openrouter.ai/api/alpha/decisions` | `OPENROUTER_API_KEY`; plain HTTP or OpenRouter TS/Python/Go SDKs; model id `typesafe/jev-1.13` |
| OpenRouter System One surface | `POST https://openrouter.ai/api/v1/systemone` | existing `@typesafe-ai/sdk` client with `baseURL: "https://openrouter.ai/api"` and the OpenRouter key; SDK appends `/v1/systemone` |

**Edukey default is OpenRouter** (per the `jev-decision-routing` skill): per-request
model/provider/latency/usage/cost observability is centralized in OpenRouter's logs,
and the Edukey adapter (`jev-openrouter.mjs`) pins `typesafe/jev-1.13`. Direct
TypeSafe is a deliberate fallback/comparison path, never an automatic retry
destination. A BYOK TypeSafe key in OpenRouter's panel does not guarantee zero
OpenRouter charges — check the BYOK "never use shared capacity" setting and the
generation log. Do not use the `~typesafe/jev-latest` alias in calibrated workflows;
pin the version. OpenRouter may return a resolved dated id (e.g.
`typesafe/jev-1.13-20260917`) — record it, don't normalize it.

Credential handling: `OPENROUTER_API_KEY` from the process environment or a mode-600
`~/.config/edukey/openrouter.env` (Linux/macOS/WSL). Never in request JSON, logs,
git, Beads, or chat.

## 5. Model versions, limits, pricing

- **Model:** `jev-1.13.0`; aliases `jev-latest` and `jev-preview` both currently
  resolve to it. Pin the versioned ID in code; re-evaluate thresholds on upgrades.
- **Price:** $42 per Btok = **$0.042 per Mtok, input tokens only** (output free).
  OpenRouter tutorial's worked example: ~$0.00002 for a 476-token request.
- **Rate limits:** 250,000 tokens/s and 1,200 requests/min (429 above; SDK retries).
  Enterprise/custom plans higher; limits "can change without notice".
- **Context:** 64k tokens per request (state + all questions); 32k for state plus the
  single longest question.
- **Input:** text only — string, JSON object, array. No images/audio/video.
- **Language:** English is the primary training language; other languages (incl. CJK)
  work but with lower accuracy. (Our game dialogue is English — fine.)
- **No fine-tuning:** domain knowledge goes in `state`; rules go in
  `instructions`/`criteria`. `GET /v1/models` lists available models.

## 6. Confidence semantics

- `confidence` (Choice/Score only) summarizes the **shape of the distribution**
  (TypeSafe's default for 3 options: `(3 × max_probability − 1) / 2`; all-in = 1.0,
  even split = 0). Full `probabilities` are always returned, so code can use its own
  measure.
- Confidence ≠ probability of correctness. Low confidence on a Choice can mean
  **several options are comparably good**, not that all are bad — for a harmless
  preference choice that's fine; for a consequential one it is not.
- Docs' banding pattern: high → act automatically; medium → proceed cautiously
  (confirm/flag); low → don't act (fallback/escalate). Thresholds **scale with the
  stakes of the action** and must be calibrated on our own data (their example:
  read-only action needs no gate; destructive action needs > 0.9).
- Noul has no confidence; use the probability itself. A Noul near its decision
  boundary (~0.5) means both answers are equally probable; near 0 is a confident "no".

## 7. Jaggedness of jev-1.13 (failure modes and mitigations)

Last reviewed upstream 2026-09-17. Directly relevant to NPC steering:

1. **Literal reading** — answers the question as written; negations and scoping words
   taken at face value. → State exact conditions; put boundary cases in criteria.
2. **No arithmetic / counting** — "Jev is not a calculator." → Count and compute in
   code; pass named buckets ("relationship: warm") or computed values, never raw
   numbers the model must compare. Don't reconstruct magnitudes from Scores.
3. **No date/time math** — reads dates as text. → Code computes "met 3 times today",
   "day 4 of 7"; send the computed fact, not the dates.
4. **No indirection** — double negatives and multi-hop reasoning cost accuracy. →
   Direct instructions, explicit state naming.
5. **Context rot** — irrelevant state is a distractor and hurts accuracy. → Send only
   the fields the question needs; filter in code first (this kills the tempting
   "dump the whole GameState into every call" design).
6. **Adversarial content** — state is not treated as hostile; injected instructions in
   state can move the answer. → In our game, the only untrusted text in state is the
   player's dialogue choices (authored) and WebMCP agent-authored lines (bounded at
   240 chars). Keep criteria explicit; this is a low-stakes, fictional domain —
   acceptable residual risk, but worth an ADR note for agent-authored text.
7. **Contradictory instructions/criteria confuse it.** → Criteria are an extension of
   the instruction; keep both aligned.
8. **No structural identities across questions** — a question and its negation can sum
   to > 1; Noul and Choice probabilities are not comparable; don't carry thresholds
   across question types. Choices are relative; Nouls are absolute (all can be low).
9. **Not a generator** — forcing generation via chained choices is poor and slow. The
   correct pattern (and exactly our plan): **code/authors provide candidate values,
   Jev selects among them.**

## 8. Patterns most relevant to this game

- **Intent routing** — one request, a Choice (which handler) + a Score (complexity);
  code routes to deterministic logic / specialist LLM / human, with confidence gates
  on both answers. Maps to "which dialogue tree does this NPC open?" and "does this
  need the generative companion or just an authored line?".
- **Speculative fan-out** — ask questions that only sometimes matter in the same
  batch; ignore unused answers. Maps to "ask every due NPC-decision question in one
  request per tick".
- **Composite scoring** — several atomic Scores combined with code-owned weights.
  Maps to a possible "NPC mood/attitude toward player" aggregate.
- **Confidence-gated routing** — answer says *what*; confidence says *whether to act*.
  Maps to the fallback policy below.

## 9. Cost model for our use case (estimate)

Assume a steering call carries ~800–2,500 input tokens (compact NPC state + a few
questions with criteria — criteria text dominates). At $0.042/Mtok:

| Call size | Cost/call | 1,000 calls | 100,000 calls |
| --- | --- | --- | --- |
| 800 tok | ~$0.000034 | ~$0.03 | ~$3.4 |
| 2,500 tok | ~$0.000105 | ~$0.11 | ~$10.5 |

Even an aggressive 50k calls/day of ambient steering is **a few dollars a day**; a
normal play session (hundreds of judgments) costs fractions of a cent. Latency (~100
ms class) is the tighter budget, not cost — see the analysis file for the
latency-by-decision-surface budget.

## 10. Data boundary & compliance notes

- The state we would send is **fictional game content**: NPC definitions, authored
  lines, relationship numbers, flags, period/clock. No protected personal data. The
  `jev-decision-routing` data-boundary rule (SACS EU route, minimized features) is
  satisfied trivially; still: never include real user identity, OS user names, or
  `.env` values in state, and keep decision logs keyed by safe IDs (npc id, tree id,
  option id), not raw transcript dumps.
- **API key must stay server-side** in any public deployment (docs + skills both say
  this). A pure static browser build cannot hold the key. Options for this game are
  analyzed in the companion file (Vercel function proxy vs BYO-key vs WebMCP-driven).
- Calibration/eval obligation (Edukey skill): before automating any judgment, test
  representative labeled cases against the current rng/hardcoded baseline, measure
  calibration/coverage at the intended thresholds, and run in shadow/dry-run first.
  The skill ships `scripts/evaluate.mjs` for labeled datasets; a provider or model
  change invalidates prior calibration.

## 11. What Jev is NOT for (decisions already made for us)

- Generating any dialogue text (authored content stays authored; the companion player
  robot remains the WebMCP agent's job, not Jev's).
- Any exact computation the code already does (money, clock, thresholds, cooldowns).
- Anything irreversible without code-owned confirmation.
- Replacement of the deterministic schedule engine — Jev steers *within* the
  schedule's override slots; code still decides feasibility (collision, cooldowns,
  periods).

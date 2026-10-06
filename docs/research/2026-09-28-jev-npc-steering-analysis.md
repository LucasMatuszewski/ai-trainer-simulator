# Research — NPC decision points in Stack Underflow and where Jev steers them (2026-09-28)

**Purpose.** Input for a future ADR (and the source analysis behind
[`docs/PRD-jev-npc-steering.md`](../PRD-jev-npc-steering.md)). Companion to
[`2026-09-28-jev-typesafe-platform.md`](./2026-09-28-jev-typesafe-platform.md), which
covers the Jev platform itself. This file maps every place the game currently decides
what an NPC says or does, what state each decision can see, and how a Jev judgment
would replace or steer the current hardcoded/random choice.

**Method:** full codebase survey (agent sweep of `src/`, 2026-09-28, branch
`feat/jev-npc-decision-steering` at master `fdc61d3`) + platform research the same
day. File:line references are accurate as of this branch.

---

## 1. Where NPC "decisions" happen today

### 1.1 Player-facing dialogue

| # | Decision | Today | Where |
| --- | --- | --- | --- |
| D1 | Which dialogue tree opens per NPC | Hardcoded `if/else` on flags inside `openDialogueWith()` | `src/main.ts:1135` |
| D2 | Tree availability gating | Authored `available?: (state) => boolean` predicates exist on 26 trees but are **dormant** (only tests evaluate them) | `src/content/dialogues-more.ts` |
| D3 | NPC's reply to a picked option | Deterministic graph walk: fixed `nextNodeId` per option; zero randomness | `src/ui/dialogue.ts` (`render()`, `pickOption()`, `showNode()`) |
| D4 | Which options the player is shown | All authored options of the node, minus ones already picked (memory filter) | `src/ui/dialogue.ts` + `src/content/dialogue-memory.ts` |
| D5 | NPC memory of past conversations | Module-level `NpcMemory {lastTopic, visitCount, seenNodes, pickedOptions}` — **runtime-only, not in GameState, not persisted** | `src/content/dialogue-memory.ts:4` |

### 1.2 Ambient inter-NPC speech

| # | Decision | Today | Where |
| --- | --- | --- | --- |
| D6 | Which pair chats, who starts | Uniform-random pair within 4.6 m + chattiness-weighted starter; per-room exclusivity; 40 s pair cooldown | `src/engine/npc-controller.ts:1696-1814` |
| D7 | What they say | Uniform random `ChatterExchange` from `LUNCH_CHATTER`/`OFFICE_CHATTER`, filtered by starter's topic affinities (`SPEAKER_TOPICS`), no-immediate-repeat; response picked after fixed 3.8 s | `src/engine/chatter.ts:202` (`pickExchange`), pools in `src/content/office-chatter.ts` |
| D8 | Morning greeting line | Per-NPC pool → category → generic, uniform random, one per NPC per morning | `src/content/morning-greetings.ts:245` |
| D9 | Evening goodbye line | Same pattern | `src/content/evening-goodbyes.ts:115` |

### 1.3 Movement / actions

| # | Decision | Today | Where |
| --- | --- | --- | --- |
| D10 | Random-walk destination per NPC per period | Weighted rng: stay-at-desk probability per NPC (0.5–0.9), lunch social rules, role-affinity spots (35%), 20% visit-a-colleague, else uniform over 11 destinations — installed as schedule override | `src/content/npc-schedule.ts:519` (`pickRandomDestination`), call site `src/game/events.ts:57` |
| D11 | Period event pick | Weighted-random over 43 `RANDOM_EVENTS`, filtered by `periods`/`requiresFlags`/`blocksFlags` | `src/game/events.ts:73-110` |
| D12 | Meeting guests, kitchen micro-trips, arrivals, departures | Deterministic planners + uniform rng jitters | `npc-controller.ts:91`, `npc-schedule.ts:72/247`, `npc-controller.ts:1005` |
| D13 | NPC reaction to events/quests | **None** — events and quests change world state; NPCs never visibly react beyond scheduled motion | — |

### 1.4 External agents (WebMCP)

- `agent_talk_to_npc` → `createNpcExchange()` (`src/webmcp/npc-exchange.ts`): the
  external agent authors both sides of a robot↔NPC exchange. Currently the only path
  where a model writes an NPC line.
- `createDialogueBroker()` (`src/webmcp/agent-dialogue.ts:237`): poll-and-supply
  broker with 12 s timeout → in-character **fixed** `FALLBACK_LINE`. This
  request/response-with-fallback shape is the natural template for async Jev calls.
- 24 registered tools (`src/webmcp/tools.ts`, registered in `src/webmcp/bridge.ts:188`).

### 1.5 Randomness map

Shared controller `rng` (injectable, `src/engine/scene.ts:333`) drives
arrivals/chatter/departures; separate LCG for Renata's copier errands; per-NPC seeded
rng for idle animations; `Math.random()` for event picks. **No mood system, no
relationship-driven NPC choices, no conversation history beyond
`seenNodes`/`pickedOptions`.** `GameState.npcRelationships` (0–100, default 50) exists
and is mutated by dialogue effects but currently influences **nothing** an NPC says or
does — the biggest dead lever in the game.

## 2. State available for steering

Global (`src/types.ts:190`): `cash`, `day`, `timeOfDay` (morning/lunch/afternoon/
evening), `character`, `stats {credibility, caffeine, patience, focus}`,
`npcRelationships: Record<string, number>`, `flags: Record<string, boolean>`,
`inventory`, `totals`. Runtime-only: `NpcMemory` per NPC, positions/`userData.npcState`,
active conversations, pair cooldowns, today's fired events, WebMCP companion state.

Derived facts code should compute **before** sending to Jev (Jev must not do
arithmetic — jaggedness §7.2–7.3): relationship bucket ("cold/neutral/warm/close" from
the 0–100 number), "talked N times today", "day X of the contract arc", "met before /
never met", "caffeine low / ok", period, who is in the room, who is already talking.

## 3. Opportunity map — Jev judgment surfaces

Design rule for all of them: **authors write the candidates, Jev picks among them,
code owns policy, thresholds, effects, and fallback.** Jev never generates text; every
line remains authored content. Every surface falls back to the exact current behavior
(rng pick / hardcoded branch) on: provider error, timeout, low confidence, or
calibration drift.

| Surface | Replaces | Jev question (primitive) | Why Jev beats the current mechanism |
| --- | --- | --- | --- |
| S1. NPC reply selection | D3's single fixed `nextNodeId` | Choice among the **authored reply nodes** of the picked option, conditioned on relationship bucket, memory, flags, period, player stats | Turns 1 fixed reply into authored variety (2–5 candidates/node) with zero UI cost; the "previous actions influence future answers" RPG feeling Lucas asked for |
| S2. Which options to show the player | D4's show-everything | Code hard-filters by flags/memory, then Choice/Score ranks a pool of 8–12 authored options down to the 4 shown | Directly answers "many more dialogue options" without cluttering the UI: author 3x options, show a state-appropriate 4 |
| S3. Which tree opens | D1's hardcoded if/else | Choice over the NPC's available trees (the 26 dormant `available` predicates become code-side pre-filter, Jev disambiguates) | Deletes brittle flag chains; multiple plausible trees (small talk vs work vs story) get picked by situation |
| S4. Chatter exchange pick | D7's uniform rng | Choice among candidate exchanges for the picked pair, conditioned on both NPCs' roles, relationship, today's events, period | Office feels alive: conversations reference what actually happened today |
| S5. Greetings/goodbyes | D8/D9 uniform rng | Choice among per-NPC pools conditioned on relationship + day events + who else is around | Cheap, high-frequency variety; good first integration for calibration |
| S6. Micro-action / destination | D10's weighted rng | Choice over the destination catalogue (stay-at-desk, coffee, visit-NPC-X, deal-wall, …) conditioned on personality, stats, relationships, events | **NPCs taking actions**: Klaudia goes for coffee because caffeine is low; Maciek visits the player after a successful training |
| S7. Event reactions | D13 (missing) | Noul per relevant NPC: "would NPC X visibly react to event Y right now?" + Choice of authored reaction line | Today events happen *around* NPCs; this makes NPCs respond |
| S8. Relationship drift | (missing) | Noul/Score after a dialogue turn: "did this choice land well with this NPC?" → code applies bounded ±delta to `npcRelationships` | Makes the 0–100 number mean something and feed S1–S6 |
| S9. WebMCP fallback persona | DialogueBroker's fixed `FALLBACK_LINE` | Choice among authored in-character fallback lines | Better than a constant when the external agent times out |

Anti-scope (explicitly out): generating text, choosing quest logic, overriding
schedule feasibility (collision/cooldown/period checks stay code), anything during
cinematics/minigames.

## 4. Question sketches (illustrative, not final copy)

One request per decision tick, batching all independent questions that share state.
Example for S1 (player just picked "Ask about the ACME contract" — Bartek has 3
authored replies):

```json
{
  "model": "typesafe/jev-1.13",
  "state": {
    "npc": { "name": "Bartek", "role": "IT manager", "personality": "friendly, overeager mentor" },
    "facts": {
      "relationship": "warm",
      "met_count_today": 2,
      "heard_contract_pitch": true,
      "told_consulting_secret": false,
      "player_credibility": "solid",
      "period": "afternoon"
    },
    "player_pick": { "text": "Ask about the ACME contract", "topic": "work" },
    "candidate_replies": {
      "reply_pitch": "Bartek launches into the pitch he rehearsed",
      "reply_guarded": "Bartek hesitates, tests the player's intent first",
      "reply_delegating": "Bartek pushes the meeting onto Klaudia"
    }
  },
  "questions": {
    "reply_id": {
      "type": "choice",
      "instructions": "Given `facts` and `player_pick`, which reply in `candidate_replies` would `npc` naturally give right now?",
      "criteria": {
        "reply_pitch": "eager to involve the player in the ACME story",
        "reply_guarded": "unsure of the player's motives, probes first",
        "reply_delegating": "too busy; hands the topic off"
      }
    },
    "pleased": {
      "type": "noul",
      "instructions": "Would `npc` be pleased that the player asked about `player_pick.topic`?"
    }
  }
}
```

Notes: relationship arrives as a **named bucket computed in code** (not the raw
number); counts arrive pre-computed; the answer id maps 1:1 onto an authored node id;
`pleased` feeds S8's bounded drift. If `reply_id.confidence` is low and the
distribution is flat among acceptable replies, code treats any pick as fine (harmless
preference); if a *consequential* branch (e.g. a contract-gated reply) wins with low
confidence, code falls back to the historical fixed `nextNodeId`.

## 5. Integration architecture options

The game is a pure static client (Vite + three.js on Vercel, no backend). The API key
must stay server-side (platform research §10).

| Option | Shape | Pros | Cons |
| --- | --- | --- | --- |
| A. Thin proxy | Vercel serverless/edge function holds `OPENROUTER_API_KEY` (or `TYPESAFE_API_KEY`); browser POSTs a compact decision request; proxy forwards and returns typed answers | Correct key hygiene for production; per-request observability preserved; small, stateless | First backend component in the project; needs the same route on localhost dev (Vite middleware mirror) |
| B. Bring-your-own key | Settings modal stores a key in localStorage; browser calls OpenRouter directly | Zero backend; works offline of our infra; player controls spend | Key in browser storage (acceptable for a BYO hackathon mode, not the default path); CORS/observability depend on OpenRouter |
| C. WebMCP-driven only | External agent performs the judgments | No new infra | Contradicts the goal (NPCs must act alive for *solo* players); latency depends on the user's agent |

**Recommendation for the ADR: A as the production path, B as an explicit fallback
mode** (hackathon demo without deployment), C unchanged. The decision client lives
behind one pure, injectable interface (e.g. `NpcDecisionClient.request(state,
questions)`) so the game code stays unit-testable per PR-8/PR-11 with a fake client,
and the real client (OpenRouter Decisions API via `fetch`, pinned
`typesafe/jev-1.13`) is a thin adapter.

## 6. Runtime fit — latency and the clock

- The simulation clock **already freezes during dialogue, cinematics, and blocking
  modals** (`shouldAdvanceSimulationClock()` in `src/game/pacing.ts:79`), so an async
  judgment inside a dialogue turn cannot tick time — S1/S2/S3 are safe by
  construction.
- Ambient surfaces (S4–S7) fire from the 1 Hz chatter scheduler and period
  transitions, not per-frame: a ~100 ms-class call fits comfortably; deadline policy
  is "if the answer isn't back in N ms (e.g. 700 ms), use the current rng pick" —
  identical to the DialogueBroker's timeout-then-fallback shape.
- Batching: one request covers all due decisions in a tick (fan-out pattern). At the
  observed cadence (a few pair-picks/minute, ≤15 greetings/morning, 4 period
  transitions) we are orders of magnitude below the 1,200 req/min limit.
- Persistence: decisions are ephemeral steering, not save data. Only their *effects*
  (relationship deltas via the existing reducer, flags) persist through the existing
  `GameState` save. `NpcMemory` should move into `GameState` (or its own persisted
  store) as part of this work — today it dies on reload, which would also make Jev's
  "remembered" context amnesiac across sessions.

## 7. Fallback and safety policy (draft for the ADR)

1. Code pre-filters candidates with hard rules (flags, cooldowns, periods,
   collision/feasibility) before Jev sees them — Jev can never choose an infeasible
   action because it never sees one.
2. Abstain-or-fallback triggers: provider error, timeout, 429/529 after retries,
   confidence below the surface's calibrated threshold on a **consequential** branch,
   malformed/unknown answer id. Fallback = the exact current behavior (fixed
   `nextNodeId` / uniform rng pick). Gameplay never blocks or waits visibly.
3. No Jev surface can spend cash, end the day, or mutate state directly — it returns
   judgments; the reducer applies effects exactly as today.
4. Shadow mode first: log (safe ids only: npc, surface, question ids, chosen option,
   confidence, latency) alongside what the rng would have picked; compare before
   enabling live steering. The Edukey `evaluate.mjs` harness runs labeled datasets
   against both.
5. Calibration is pinned to `typesafe/jev-1.13`; a model/route change re-runs the
   labeled evaluation before thresholds are trusted.

## 8. Evaluation plan (pre-implementation, per the jev-decision-routing skill)

- Build a small labeled set per surface (30–100 cases): authored scenes with known
  "right" picks, paraphrases, boundary relationships (cold vs warm), irrelevant-state
  distractors, and Polish/English mixed names (NPC names are Polish; dialogue is
  English).
- Baseline = current mechanism (fixed node / uniform rng). Measure: agreement with
  labels, calibration at candidate thresholds, fallback rate, p50/p95 latency, cost.
- Shadow-run in the real game (`?jev=shadow` flag) before enabling steering.

## 9. Open questions for the ADR

1. Proxy host: Vercel function (matches existing deployment) vs a separate tiny
   service? Vercel is already in use (`.vercel/`, `vercel.json`).
2. Does `NpcMemory` move into `GameState` (persisted, save-schema bump) or get its
   own store? Touches the save/versioning decision D-33/C-68 only indirectly.
3. Relationship vocabulary: map 0–100 to how many buckets? (3 buckets —
   cold/neutral/warm — keeps criteria small; 4 adds "close" for arc gating.)
4. Budget guardrails for BYO-key mode (per-session cap? visible counter?).
5. Do we expose a dev HUD/debug panel showing Jev's live judgments (names + ids only)
   for Lucas's QA and calibration demos?
6. Which surface ships first? (Recommendation: S5 greetings → S1 replies → S4
   chatter; S6 actions after the destination catalogue is enriched.)
7. Interaction with the WebMCP companion robot: when an external agent is connected,
   do Jev surfaces for the companion yield to the agent (recommend: yes — agent wins,
   Jev fills the gaps)?

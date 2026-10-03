# Review — Jev NPC decision steering docs (PRD v2, ADR-0009, parallel plan)

**Reviewer:** Claude (Opus 5.5), independent second opinion · **Date:** 2026-09-28
**Inputs:** `docs/PRD-jev-npc-steering.md` (v2), `docs/ADR/0009-jev-npc-decision-steering.md`,
`docs/plans/2026-09-28-jev-parallel-implementation.md`; spot-checked against
`docs/research/2026-09-28-jev-typesafe-platform.md` and `src/` at commit `42000fd`.

## 1. Verdict

**approve-with-changes.** The core bet (D-45 selection-only, D-47 legacy-as-fallback, pure
projector/validator under TDD) is right and I would not change it. But four problems must be
fixed before Wave 1 starts: the response contract asks Jev for numeric deltas it cannot emit,
the tick cadence is specified in the wrong time unit, the plan's "disjoint" file ownership
misses the one file every ambient workstream must edit (`src/engine/npc-controller.ts`), and
"offline == today's game" contradicts shipping 10x content and brand-new surfaces.

## 2. Top strengths

- **D-45 selection-only** matches the platform's documented strength (research §2, §7.9) and
  makes every failure degrade to authored text. This is the right foundation.
- **D-47 fallback = preserved legacy picker** avoids building a second decision system; the
  legacy pickers (`pickPair`, `pickStarter`, `pickExchange` in `src/engine/chatter.ts`,
  `pickMorningGreeting`, `pickEveningGoodbye`) are already pure with injected `rng`, so the
  wrapper pattern is cheap and testable.
- **D-49 pure projector + validator** puts all arithmetic and feasibility in code, which is
  exactly the jaggedness mitigation (research §7.2-7.5).
- **D-55 shadow mode + D-57 fake client** give a risk-free way to gather calibration data
  during normal play, before anything consequential goes live.
- **PRD §11 "NOT allowed" list** is concrete and enforceable (no text, no math, no state
  writes, no unilateral escalation).

## 3. Findings by severity

### Blocker

**B1. The response contract asks Jev for outputs it cannot produce.**
*Where:* ADR-0009 §4 DecisionResponse (`relDelta (−5…+5)`, `moodDelta {valence, energy}`),
§5 validator, D-49 ("|Δ| ≤ 5, confidence present"), TAC-04; PRD Flow A.5, §11 "Return bounded
relationship deltas".
*Problem:* Jev returns only Choice / Score / Noul (research §2). There is no integer field.
Score allows 2-10 levels, so −5…+5 (11 values) does not even fit, and research §7.2 says
"don't reconstruct magnitudes from Scores". Noul has **no confidence field** (research §2, §6),
so the validator rule "confidence present" rejects every Noul answer ("would these two argue
now?", "would this NPC react?") and every one of those surfaces silently falls back forever.
*Change:* In ADR §4 replace `relDelta`/`moodDelta` with: "Social reaction is a **Choice** over
authored reaction buckets (e.g. `offended`, `annoyed`, `neutral`, `pleased`, `delighted`); code
maps each bucket to a delta (−5, −2, 0, +2, +5) and a mood shift from a table in
`src/game/social.ts`." In D-49/TAC-04 replace "confidence present" with "per question type:
Choice/Score require `confidence` and a known id/level; Noul requires `noul ∈ [0,1]` and is
gated on distance from 0.5, never on a confidence field."

**B2. The world-tick cadence is in the wrong unit.**
*Where:* ADR-0009 D-48 ("every ~6 in-game seconds"), §8.2 diagram; plan WS4 ("6 s in-game
cadence"); PRD Flow B.1 ("every few in-game seconds").
*Problem:* At 1x, one real minute is one in-game hour (AGENTS.md, C-67). Six in-game seconds is
0.1 real seconds: 10 requests/s, which contradicts single-flight (D-56) and the 700 ms budget.
The existing chatter scheduler actually uses real-time gaps of 6-12 s, checked at 1 Hz
(`src/engine/npc-controller.ts:470`, `:1711`).
*Change:* Everywhere, write "every 6 **real** seconds of unpaused simulation (scaled by the game
speed multiplier, frozen while a blocking overlay is open) and on every period transition".
Add one sentence on what happens at 2x/4x speed.

**B3. File ownership is not disjoint: the real call sites live in an unowned 1,884-line file.**
*Where:* Plan §1.2 ("no two concurrent workers touch the same file"), §3 WS1/WS4/WS6/WS7
"Owns" lines.
*Problem:* Greetings (`npc-controller.ts:1169`, `:1183`), goodbyes (`:1085`), chatter pairing
(`:1711` onward) and schedule overrides (`:438`) are all in `src/engine/npc-controller.ts`,
which no workstream owns. WS1 (greeting wrapper), WS4 (chatter/destinations), WS6 (NPC
purposeful-use overrides) and WS7 (audience seating) all need it. WS4's declared files
(`chatter.ts`, `npc-schedule.ts`) are the pure pickers, not the call sites. Also: after Wave 1,
`src/types.ts` and `src/game/state.ts` are unowned, yet WS3 (memory), WS6 (fault state/needs)
and WS7 (mission outcome) all need new actions; `src/main.ts` is owned by WS3 but WS4/WS6/WS7
need wiring there; the prompt UI lives in `src/ui/hud.ts:69`, not the plan's nonexistent
`src/ui/prompt.ts`; WS8 owns `src/jev/decision-log.ts` while WS1 owns `src/jev/*` in the same
wave.
*Change:* Add to plan §3 a **WS0 seam commit** (orchestrator, before Wave 1 fans out): add a
`DecisionHooks` injection object to `createNpcController` (greeting, goodbye, pair, starter,
exchange, destination, override-install), defaulting to today's functions; add empty
extension points in `main.ts` and a pre-created content registry. After WS0, workers only
*inject* from their own new files. Declare `types.ts`, `state.ts`, `main.ts`, `hud.ts`,
`npc-controller.ts` **orchestrator-owned from Wave 2 on**: workers return proposed patches in
their result, the orchestrator applies them serially. Move `decision-log.ts` into WS1.

**B4. "Offline plays exactly as today" contradicts the feature itself.**
*Where:* PRD §1 last line, Flow C.1, AC-10, User stories ("behave exactly as today"); ADR D-47
("byte-for-byte"), TAC-01; plan WS3 Done ("legacy replies byte-identical").
*Problem:* WS3 migrates the 48 trees into a new schema and WS5 adds 10x content, so with Jev off
the player sees new trees, new options and new pools: not today's game. Worse, several surfaces
have **no legacy picker at all**: option curation when >4 are eligible (today `dialogue.ts:295`
shows all unpicked options, no cap), equipment actions, arguments, plant-question selection,
answer scoring, audience reactions. "Wrap the legacy pick" is undefined for them.
*Change:* Redefine in PRD Flow C and ADR D-47: "Fallback = the **deterministic authored
default** for the surface. For surfaces that existed before C-75 this is the preserved legacy
picker. For new surfaces it is declared in content: `replyCandidates[0]` is the default reply;
options carry an authored `priority` and the fallback shows the top 4; each mission answer has
an authored `baseScore`; question pools have an authored order; purposeful actions default to
no action." Scope TAC-01 to "pre-existing surfaces with pre-existing content" and add
**TAC-01b**: every new surface has a unit-tested default that never touches the network.

### Major

**M1. No per-surface table of question type, stakes, threshold and PoC mode.**
*Where:* PRD Flow C.2 and §11 ("consequential" vs "cosmetic"), ADR D-57(5), TAC-10.
*Problem:* Nothing says which surfaces are consequential. D-57(5) says new surfaces stay in
shadow until calibrated, which, read literally, means the PoC shows **no visible steering**
(AC-02, AC-07, AC-19, AC-26 cannot be demonstrated) until labeled datasets exist. The default
mode with no URL parameter is also unstated.
*Change:* Add an ADR §7 table: surface · primitive (Choice/Score/Noul) · consequential? ·
threshold · PoC mode (live/shadow) · fallback default. Suggested PoC stance: cosmetic surfaces
(greeting, chatter exchange, reply flavor, audience reaction) **live** without calibration;
consequential ones (relationship bucket, mission scoring, argument veto, destination) **live
with a conservative threshold and authored-default clamp**, calibration before any
post-PoC release. Default URL mode: live if configured, off otherwise.

**M2. Batching adds latency at the trigger moment unless decisions are pre-fetched.**
*Where:* PRD §8 Ambient budget, Flow B; ADR D-48, D-56, §8.2.
*Problem:* As drawn, a chatter pair that becomes eligible waits for the next tick (up to 6 s)
and then up to 700 ms more. PRD §8 promises the cadence is "never visibly delayed". D-56's
freshness rule ("do not apply judgments to changed situations") has no definition of "changed".
*Change:* Add to D-48: "The tick **pre-decides** upcoming decisions (pairs within approach
range, NPCs whose greeting/goodbye is due within the next tick, idle NPCs). Answers are stored
with a freshness key (subject ids, period, relevant flags, relationship band). At the trigger
moment the consumer uses the stored answer if the key still matches, else the fallback
**immediately**. Triggers never await a request." Also: no 429/529 retries on the ambient path
(backoff cannot fit in 700 ms); retries only on dialogue, inside its budget.

**M3. Dialogue turns can stall up to 1.2 s per click, three times per conversation.**
*Where:* ADR D-56 (1200 ms), §8.3; PRD Flow A.1-A.3.
*Problem:* Tree pick → option curation → reply are dependent (research §2: batched questions
cannot see each other's answers), so a new conversation can cost 3 serial requests. Curation is
also not a Choice: Choice returns one option, but curation needs up to 4.
*Change:* In D-56: "Tree + curation are requested when walk-to-face **starts** (the walk hides
the latency). When options render, one batched request pre-judges the reply for **every**
visible option; the click then applies a stored answer instantly." In D-48/§4: "Curation = one
Score per eligible option (relevance to the current state) in one request; code takes the top 4
with authored `priority` as tie-break."

**M4. Determinism ACs are unenforceable with a tick-scoped cache.**
*Where:* PRD AC-03, AC-04; ADR D-56 ("cache… within the same tick"), TAC-03.
*Problem:* The research does not document Jev as deterministic. AC-03/AC-04 need the same
answer for the same state across the session, but D-56 caches only per tick.
*Change:* D-56: "Dialogue surfaces use a **session-scoped** memo keyed by (surface, subject,
projection hash); ambient surfaces use the tick-scoped cache." TAC-03 gains the session case.

**M5. The social model has no long-run stability rules.**
*Where:* ADR D-50, §4 RelationshipMatrix/Mood; PRD Flow H, AC-18.
*Problem:* Relationships never regress, so repeated bounded deltas random-walk to the clamps
(0/100) over a few in-game days. The balance sign at 50 flickers with ±2 noise. Argument →
negative delta → more imbalance → more arguments is a positive feedback loop; the cooldown is
per pair, not global.
*Change:* Add to D-50: deadbands (friend ≥ 65, enemy ≤ 35, else neutral; triads count only
non-neutral edges); nightly regression of 10% toward the archetype seed; an office-wide
**drama budget** (≤ 2 arguments per in-game day, per-pair cooldown ≥ 1 day); witness deltas
capped at ±2. Add a unit test that simulates 30 days of random deltas and asserts the
distribution stays off the clamps.

**M6. Matrix scope contradicts itself and duplicates player state.**
*Where:* ADR §4 ("Player pairs included"), D-50/D-51 ("105 pairs"), TAC-05 ("n·(n−1)/2 for
the 15-NPC roster").
*Problem:* 105 = 15·14/2, NPCs only. Including the player makes 120. The player↔NPC value
already exists as `GameState.npcRelationships` (`src/types.ts:198`) with `add-relationship`
actions and effects, so there would be two sources of truth. The roster includes `burek` (the
dog, `npcs.ts:215`): OCEAN traits and loud arguments for a dog need an explicit rule.
*Change:* "Matrix = NPC↔NPC only (105 pairs). Player pairs stay in `npcRelationships`. The
projector reads both. Burek has a matrix row (others' fondness for him) but is excluded from
argument eligibility and has a fixed mood."

**M7. NPC "needs" are used everywhere but defined nowhere.**
*Where:* PRD Flow B.1 ("current needs/mood"), Flow F.4 ("NPC with low caffeine"), §11
("caffeine: low"); ADR §3.3.
*Problem:* `caffeine` is a **player** stat (`GameStats` in `src/types.ts:22`). No NPC needs
model exists in ADR §4 or in any workstream, yet AC-22 (steered purposeful equipment use)
depends on it.
*Change:* Add `NpcNeeds { caffeine, social }` (0-100, runtime-only, decays per in-game hour,
reset daily) to ADR §4 and D-50. Assign it to WS6. The projector emits named bands only.

**M8. Save v2 migration hazards are understated.**
*Where:* ADR D-51, TAC-06; plan WS2, risk register row "Save migration".
*Problem:* `src/game/state.ts:74` returns a **fresh game** for any `saveVersion !== 1`. So (a)
the loader must become a migration chain, not a version check; (b) checking out `master` or
reverting the branch silently wipes every v2 save; (c) `NpcMemory` uses `Set` fields
(`src/content/dialogue-memory.ts`) that `JSON.stringify` turns into `{}`; (d)
`profilesVersion` has no defined behavior; (e) a future NPC leaves missing matrix pairs.
*Change:* D-51: "`migrate(raw)` chains v1→v2; Sets are serialized as sorted arrays; the first
v2 write keeps the untouched v1 blob under a backup key; missing pairs default-fill lazily on
load; a `profilesVersion` bump re-seeds only pairs never touched by a delta." Put
`src/content/dialogue-memory.ts` in WS2's owned files (it is unowned today).

**M9. The judge topology is not independent.**
*Where:* Plan §4 (all judges GLM), §1.5; AGENTS.md PR-4.6, PR-5.
*Problem:* GLM implementers are judged by GLM judges, and the GLM-drafted content is judged by a
GLM tone judge. Correlated blind spots. PR-4.6 explicitly requires the phase QA verdict from
`codex exec` or `agy -p`. Lucas chose GLM for implementers (plan header). That decision stands,
but it does not waive PR-4.6.
*Change:* Plan §4: "Per-workstream code judges may be GLM; the **per-wave QA verdict** that
gates a phase is run by `codex exec --sandbox workspace-write` (different model family). The
WS5 tone judge samples ≥ 10% of each batch for review by the orchestrator/Lucas."

**M10. The 10x volume metric is easy to game and the baseline is an estimate.**
*Where:* PRD AC-27 ("nodes + options + candidate replies", "~218 / ~210"), ADR TAC-07, plan
WS5.
*Problem:* Reply variants are the cheapest unit to pad, so a GLM author can hit "10x" with
near-duplicate candidates. The baseline uses "~" numbers, so the counted test has no fixed
target. Each candidate also needs a Jev-facing `description` (ADR §4 DecisionRequest), which
roughly doubles authoring and is not in the volume estimate.
*Change:* AC-27: "Count **distinct normalized authored strings**; a near-duplicate check (token
Jaccard > 0.8 within a pool) fails the test; each NPC reaches ≥ 7x its own baseline and the
roster ≥ 10x; the baseline is computed by the same counter at commit `42000fd` and frozen as a
constant in the test." Plan §6: "The PoC mechanics demo (Wave 4) does **not** wait for 10x; it
needs ≥ 3 reply candidates on every steered node shown in the demo."

**M11. The invisible fallback can hide a completely broken integration.**
*Where:* PRD Flow C, AC-10; ADR D-47, D-55, key scenario 2.
*Problem:* The fallback-equivalence test proves the **off** path only. If the live path never
applies an answer (a mis-wired hook, a validator that rejects everything as in B1, wrong model
id), the game still looks fine and every test passes.
*Change:* Add to D-55: `?jev=strict` (dev only) shows a toast on each fallback; the debug panel
header shows counters (applied / fallback by reason / p95 ms); a startup console line states the
mode. Add key scenario 11: "With the fake client returning answers that differ from every legacy
pick, each wrapper applies the Jev answer (the live path is proven, not only the off path)."

**M12. World-tick batching reintroduces the context rot D-48 claims to avoid.**
*Where:* ADR D-48 context/decision/review trigger; PRD §8 External limits.
*Problem:* One shared projection for ~15 subjects means every question sees 14 NPCs' irrelevant
facts: that is context rot (research §7.5). D-48's review trigger watches latency and
**reject** rate, but a valid-but-wrong answer is never rejected.
*Change:* D-48: "State is namespaced per subject (`npcs.<id>`, `pairs.<a>_<b>`); each question's
instructions reference only its subtree. The measurement harness compares tick vs per-subject
on **labeled accuracy** (shadow agreement on the evaluation set), not only latency and reject
rate."

**M13. Key access and the proxy are unowned and partly unsafe.**
*Where:* PRD Flow D, AC-13/14; ADR §3.2, §6, D-46; plan (no workstream owns them).
*Problem:* No workstream builds the Settings UI or the Vite dev-proxy middleware (ADR §2 lists
Vite for it). `JEV_PROXY_URL` without a `VITE_` prefix never reaches the browser. Browser CORS
on `openrouter.ai/api/alpha/decisions` is unverified, and BYO mode depends on it. A key in
localStorage is readable by any XSS. A deployed proxy that forwards anything is an open relay
on Lucas's key.
*Change:* Plan WS1 owns `vite.config.ts` middleware and `src/ui/jev-settings.ts`. ADR §6:
`VITE_JEV_PROXY_URL` (URL only, not a secret). D-46: "Verify browser CORS for the decisions
endpoint before building BYO mode; if absent, BYO goes through the dev proxy too." Flow D: the
UI recommends a credit-limited OpenRouter key. Review trigger before any deploy: origin
allow-list, per-IP rate limit, model pinned server-side, payload size cap.

**M14. The data boundary must exclude player- and agent-entered text.**
*Where:* PRD §8 Data boundary, §11 Adversarial input; ADR §3.3 projector.
*Problem:* The character name comes from `character-create` (player-typed, possibly a real
name). WebMCP agent lines are untrusted text (research §7.6). Neither is excluded explicitly.
*Change:* ADR §3.3: "The projector never includes `character.name` (the player is `the
player`) or any agent-authored string; agent turns appear as safe ids only. A unit test asserts
their absence from projections (alongside key scenario 10)."

### Minor

- **m1.** ADR §3.8 cites "PRD AC-18-of-v1 note", which no longer exists in v2 (AC-18 is now
  arguments). Replace it with the actual exception list (tests asserting an exact random pick).
- **m2.** ADR §4 Mood decays "toward the profile baseline", but PersonalityProfile has no
  baseline field. Add `moodBaseline {valence, energy}` (authored or derived from OCEAN) and
  reconcile "each in-game hour" (ADR) with "within one day" (PRD AC-17).
- **m3.** PRD §11 lists "argument triggering judgments" and Flow B "tension checks", while §11
  also says arguments trigger on code thresholds only. State it once: "Code decides
  eligibility; a Jev Noul may only veto an eligible argument or choose its flavor."
- **m4.** Plan WS5 writes `src/content/dialogues/<npc>.ts` next to the existing
  `src/content/dialogues.ts`, so `./dialogues` becomes ambiguous to readers. Use
  `src/content/npc-content/<npc>.ts`. The registry that imports the 15 files must be
  pre-created by the orchestrator (see B3), or all 4 authors edit it.
- **m5.** Author D's argument, question and audience pools need types, but WS7 defines mission
  types in the same wave. Define all pool types in WS3's schema (Wave 2).
- **m6.** `SfxBus.play` silently no-ops on missing ids (`src/audio/sfx.ts` header), so AC-20
  "sound feedback" can pass with no sound. Add a test that every interaction sfx id resolves in
  the manifest, and say where the assets come from (manifest kinds are `tts|music|sfx-tts`).
- **m7.** WS1 wraps greetings in Wave 1 and WS4 wraps "greetings" again in Wave 2. Say that WS4
  generalizes WS1's wrapper and does not re-wrap it.
- **m8.** TAC-01 "same rng seed": `createNpcController` defaults to `rng = Math.random`
  (`npc-controller.ts:423`). The fallback must run synchronously at the original moment so rng
  consumption order is unchanged, and tests inject a seeded rng.
- **m9.** Plan tests go to `tests/unit/jev/*`, `game/*`, `engine/*`, while existing tests are
  flat in `tests/unit/`. This is fine per PR-11.4, but state it so workers do not scatter files.
- **m10.** Plan WS8 Done says "recorded in Beads", but delegates may not run `bd`. The
  orchestrator records it.

## 4. Direct answers

**(a) Tick cadence and budget.** Keep 6 s, but in **real, pause-aware** seconds (B2): it matches
the existing 6-12 s chatter gap, so the world will not feel slower than today. 700 ms is
generous against the ~100 ms typical latency. Target p95 ≤ 300 ms and keep 700 ms as the hard
cutoff. The budget is not what makes the world feel alive, though; pre-fetching is (M2). If any
trigger ever awaits a request, the game will feel laggy at any budget. Recommendation: 6 s tick
+ period/event triggers, pre-decide, consume-or-fallback at the trigger, no ambient retries.

**(b) All-pairs matrix and Heider triads.** The matrix is right-sized: 105 numbers, and needed
for AC-19. Keep it NPC↔NPC only (M6). Heider triads are **over-built for a PoC**. Keep
`detectImbalancedTriads` as a cheap pure function that only feeds a projection fact, and
**defer triad-driven events** (argument seeds, alliance nudges) until playtests show
pair-level dynamics feel flat. The PoC actually lacks the stability rules (M5). Of OCEAN, use
only 3 traits in code at first (extraversion → chatter, agreeableness → delta scaling,
neuroticism → mood volatility). Author all 5, but do not build math for traits nothing reads
(D-52 dead-data rule).

**(c) Invisible fallback as preserved legacy pickers.** Sound for pre-existing surfaces, and the
best decision in the ADR. It has two holes: it hides integration bugs (M11: needs strict mode,
counters and a live-path test), and it does not exist for new surfaces (B4: needs authored
defaults). Add a **circuit breaker** too: after 3 consecutive failures, stop calling for 60 s,
so an offline or broken session does not burn a timeout every tick.

**(d) Conference mission scope.** Over-scoped for a first playable. D-54 itself calls the crowd
"the largest new visual work item", and it is coupled to question pools, scoring, prep and
results UIs, a state machine, and calibration of a consequential score. Split it into two
deliverables. **(1) Speech loop:** 1 topic, 5 talking points, 2 plants × 2 questions, answers
scored as authored `baseScore` ± a bounded Jev Score adjustment (never Jev-only, because it
moves cash), and a panel-only engagement meter. **(2) Crowd:** 8 seated background bodies, 4
reactions (lean, phone-check, applause, walk-out). Ship (1) first; it proves AC-24/25/26 without
the crowd.

**(e) Plan file ownership.** Not disjoint (B3). `npc-controller.ts` alone is touched by WS1,
WS4, WS6 and WS7. `types.ts`/`state.ts` by WS2, WS3, WS6 and WS7. `main.ts` by WS3, WS4, WS6
and WS7. `src/jev/*` by WS1 and WS8. The content registry by 4 authors. Fix: a WS0 seam commit
with injection hooks, orchestrator-owned shared files applied serially from worker patches, and
Wave 2 limited to WS3 + WS4 in parallel with WS6 after them. If they stay parallel, WS6's
`npc-controller` changes go only through the seam.

**(f) The failure mode that worries me most:** the feature "works" and nobody can tell. Jev is
live, the tests are green, but steered pools have 1-2 near-identical candidates, fallbacks
quietly dominate (B1 alone would make every Noul surface fall back forever), and the office
feels the same as `?jev=off`. The docs half-address this: the debug panel exists, but nothing
defines success. Add a **perceptibility gate** to Wave 4: in one 10-minute in-game day, ≥ 30
applied steered decisions, fallback rate < 20%, ≥ 1 visible NPC↔NPC relationship effect, and a
side-by-side `?jev=off` vs live log and screenshot pair shown to Lucas under PR-2.

## 5. Missing entirely

- **Per-surface table** (primitive, stakes, threshold, PoC mode, fallback default); see M1/B4.
- **NPC needs model** (M7).
- **Success metric for "feels alive"**: the perceptibility gate in 4(f), plus an A/B playtest
  protocol for Lucas.
- **Circuit breaker and session cost guard** for offline or broken-provider sessions (4c).
- **Time-scale semantics**: tick behavior at 2x/4x game speed, and during overlays or pause.
- **WebMCP coexistence detail**: the agent companion character excluded from judgment subjects;
  whether an agent's dialogue with an NPC is steered (ADR-0008 frozen contract vs Flow A).
- **Content kill-switch**: a flag that loads only pre-C-75 content, so TAC-01 can actually be
  verified after WS5 lands.
- **Branch/save compatibility with `master`**: a v2 save opened by a master build is wiped
  (M8).
- **Authoring cost of Jev `description` fields** for every candidate (M10) in the WS5 estimate.
- **Ownership of the Settings UI and the Vite proxy middleware** (M13).

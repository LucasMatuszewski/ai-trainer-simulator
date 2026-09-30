You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `.agent-briefs/ws4-result.md`.

# Task: WS4 — World-tick batching: the office decides in bulk (Wave 2)

Branch `feat/jev-npc-decision-steering`. Read first: `docs/PRD-jev-npc-steering.md` **Flow B** (pre-decide, per-subject fallback), `docs/ADR/0009-jev-npc-decision-steering.md` **D-48/D-49/D-56** and the **D-60 surface table**, `src/jev/greeting-wrapper.ts` (the established wrapper pattern: prefetch/store/install/instant-hook/decision-log), `src/jev/decision-log.ts` (counters incl. `shadow`), `src/engine/npc-controller.ts` — the WS0 `jevDecisionHooks` holder (pickChatterPair/pickChatterStarter/pickChatterExchange/pickRandomDestination) — read-only for you, and `src/engine/chatter.ts` + `src/content/office-chatter.ts` (the candidate pools + `SPEAKER_TOPICS`).

## The problem (Lucas, C-77)

Chatter picks are uniform-random today. Lucas wants **massive scale**: ALL eligible exchanges for a chatting pair go to Jev as candidates, and Jev decides which match the pair and the moment — batched, one request per world tick for every due decision.

## Build

1. **`src/game/world-projection.ts`** (new, PURE, TDD): builds the tick projection —
   `buildWorldTickProjection({ day, period, npcRoster: [{id,name,role,position,room}], pairs: [{a,b,distance}], events: string[] (today's fired event names), relationshipBands: Record<pairKey, band> }) => projection` with **per-subject namespacing** (`npcs.<id>`, `pairs.<a>_<b>`) — each subject's facts live in its own subtree (context-rot defense, D-49). Pure; no three.js.
2. **`src/engine/world-tick.ts`** (new): the scheduler + steered wrapper —
   - cadence: every **6 real seconds of unpaused simulation** (a single `setInterval`-free design: driven by an `update(dtRealSeconds)` accumulator the orchestrator wires — submit that wiring as a patch for `main.ts`'s frame loop), plus an explicit `onPeriodTransition()` trigger;
   - **single-flight**: never two requests in flight; ticks during flight are skipped;
   - **no retries** on this path; **700 ms hard cutoff**;
   - **circuit breaker**: 3 consecutive failures ⇒ ambient calls stop for 60 s;
   - due subjects per tick: chatting pairs (from a candidate-pair provider the orchestrator wires to the controller's conversation candidates) + due greetings (ALREADY covered by WS1's greeting wrapper — do NOT duplicate; skip greetings) + idle-NPC purposeful suggestions are OUT of scope here (WS6 owns actions) — this task is **chatter pair/starter/exchange + destination steering only**;
   - **chatter at scale (the headline):** for each candidate pair, EVERY eligible exchange from the period-correct pool (filtered by both speakers' `SPEAKER_TOPICS` affinities — read `SPEAKER_TOPICS` usage in chatter.ts) is a Choice candidate; Jev picks per pair. Batched: one request covering all due pairs + destinations.
   - answers validated per subject (known candidate id); any invalid/missing answer ⇒ fallback for THAT subject only (the WS0 legacy pickers, synchronous, rng-order preserving — call the hook holder's semantics: the wrapper installs into `jevDecisionHooks` exactly like the greeting wrapper);
   - every decision logged (decision-log, incl. fallback + shadow outcomes);
   - `?jev=off|shadow` honored via constructor options (the orchestrator passes the mode).
3. **Destinations:** same tick steers `pickRandomDestination`-class decisions when the orchestrator marks them due (the hook already exists — install an async-decided memo like the greeting wrapper: prefetch destination decisions for the NEXT period during the current one, consume at the transition; if the cache is cold, legacy fallback instantly).
4. **Tests (TDD red→green, mutation-check):**
   - `tests/unit/engine/world-tick.test.ts` (fake client): batch contains ALL eligible exchanges as candidates (the scale assertion); single-flight (second tick skipped during flight); 700 ms cutoff ⇒ per-subject fallback; circuit breaker opens after 3 failures and closes after 60 s; per-subject partial fallback (one bad answer among five good ones ⇒ 4 applied, 1 legacy); shadow never installs hooks; `?jev=off` constructs nothing.
   - `tests/unit/game/world-projection.test.ts`: namespacing; bands/events included; no raw arithmetic left for the model (pre-computed facts only).

## Constraints

- Allowed files: `src/game/world-projection.ts`, `src/engine/world-tick.ts`, `tests/unit/engine/world-tick.test.ts`, `tests/unit/game/world-projection.test.ts`. NOTHING else. `npc-controller.ts`, `chatter.ts`, `main.ts`, `npc-schedule.ts` are orchestrator-owned — submit exact patches for: the frame-loop accumulator wiring, the conversation-candidate provider, and the chatter hook install point.
- Your module must be constructible headless (no window/document at import).
- `pnpm typecheck` + `pnpm test` green for your scope (concurrent WS3/WS6 workers own their files; failures there are theirs — note, don't fix).
- Do not bump `src/version.ts`.

## Definition of done

Report at `.agent-briefs/ws4-result.md`: changed files, red→green evidence, vitest summary, proposed shared-file patches, deviations. Disagreement invited on the batch composition (what belongs in one request vs split) — justify with the context-rot tradeoff.

You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `.agent-briefs/ws7-result.md`.

# Task: WS7 — Conference-speech mission (the trainer's core-fantasy quest)

Branch `feat/jev-npc-decision-steering`. Read first: `docs/PRD-jev-npc-steering.md` **Flow G** + **AC-23..26** (bounded slice: 1 topic, 5 talking points, 2 plants × 2 questions, panel engagement meter, `baseScore` ± bounded Jev adjustment), `docs/ADR/0009-jev-npc-decision-steering.md` **D-54**, `src/game/state.ts` (reducer + `missionCompletions` from save v2 + `set-equipment-fault` pattern), `src/content/quests.ts` (quest layer + flag vocabulary), `src/content/npcs.ts` (mesh factory reuse for the audience), `src/ui/dialogue.ts` (panel styling conventions), `src/engine/world-tick.ts` (wrapper conventions: modes, decision-log, client usage), and `src/jev/contracts.ts`.

## What you are building (the bounded first slice — no seated crowd yet)

A complete, replayable **speech mission** the player can win or lose:

1. **`src/content/missions.ts`** (new, data): one mission definition — id `conference-acme-training`, title, unlock flag (`got-acme-contract` — already in the game), topic ("ACME onboarding training"), **5 authored talking points** (advance in order), **2 plant questioners** (use existing NPC ids present in the office — e.g. marek + kasia — as the "outside" voices), **2 authored hard questions per plant** (uncomfortable, funny, lore-grounded: "Why should we trust these numbers?", "Your last trainee quit in a week."), **baseScore per answer option** (authored), reward (cash + credibility via EXISTING effects), completion flag `mission-conference-acme-done`. 4 answer options per question. Ironic tone per the game's voice.
2. **`src/game/mission.ts`** (new, PURE, TDD): `MissionRuntime` state machine —
   `start(missionId, {jesterEnabled})` → phase "talking-point" → advance → phase "plant-question" (plant i, question j) → answer(optionId) → score = authored baseScore ± 1 level from the Jev Score judgment ("how does this answer land with this audience?") → audience engagement meter value (panel-only, 0-100, moves ±10 max per answer) → next → ... → `finish()` → `{ outcome: "won"|"lost"|"aborted", engagement, credibilityDelta, cashReward, quotes[] }`. Outcome thresholds authored. Deterministic given the same judgment inputs (fake client testable). **Jev adjustment is bounded to ±1 level (±1 score) and NEVER decides the payout alone.** Abort/reload semantics: `abort()` → no reward; the completion marker is only set by `finish`.
3. **`src/jev/mission-wrapper.ts`** (new): two steered surfaces per D-60 — `pickQuestion` (Choice over the eligible authored questions for this plant, fitting engagement/credibility) and `scoreAnswer` (Score over "lands poorly / lands / lands well" bounded ±1). Cosmetic/question-pick may run live; the score is CONSEQUENSUAL (moves cash) — conservative threshold, authored `baseScore` fallback, decision-log entries, shadow support. 700 ms budget; fallback per D-47.
4. **`src/ui/mission.ts`** (new): the speech UI — full-screen overlay panel (reuse dialogue/help-modal styling conventions): mission intro card (title, topic, "Begin speech" / cancel), the speech view (current talking point, engagement meter bar, plant question highlighted with the asker's name, 4 answer buttons), results card (credibility change, payment, audience quote) with "Continue". Keyboard: 1-4 to answer, Space to advance points. No free text input.
5. **`src/main.ts` PATCH (submit, do not apply):** mount point — how `openMission("conference-acme-training")` is reached (proposal: extend the roster/quest UI hook the orchestrator wires; also the `missionCompletions` readout wiring `() => game.get().missionCompletions` and the reward dispatch path through the standard `add-cash`/`add-stat`/`set-flag` actions).
6. **The audience (AC-23's bounded version):** a `panel-only engagement meter` this slice — NO seated crowd meshes (that's the follow-up deliverable sacs-xtma.15's crowd half). Audience reactions are TEXT quotes in the results/engagement feedback ("Marek from Finance looks unconvinced.").

## Tests (TDD red→green, mutation-check)

- `tests/unit/game/mission.test.ts`: full happy path; two different answer paths → different engagement outcomes; abort → no reward; reload mid-mission → runtime resets, completion marker intact-if-finished; duplicate finish → no double payout; judgment timeout/low-confidence → baseScore only; question selection without Jev → authored order.
- `tests/unit/jev/mission-wrapper.test.ts` (fake client): question pick applies; score bounded ±1; fallback to baseScore on timeout/low-confidence; shadow logs `shadow`.
- `tests/unit/content/missions.test.ts`: schema (ids unique, 5 points, 2 plants × 2 questions × 4 options, baseScores present), unlock flag + completion flag exist in the game's flag vocabulary, tone bounds.
- jsdom test for the mission UI flow: intro → answer → results → no double-reward on re-open.

## Constraints

- Allowed files: `src/content/missions.ts`, `src/game/mission.ts`, `src/jev/mission-wrapper.ts`, `src/ui/mission.ts`, plus the four new test files. NOTHING else. main.ts wiring + any `types.ts` action additions (a `set-mission-complete` action or reuse `set-flag` — prefer `set-flag` for the completion marker; rewards via existing actions) = proposed patches in the report.
- All text authored. No new dependencies. No three.js scene changes (no crowd meshes this slice).
- `pnpm typecheck` + `pnpm test` green for your scope (concurrent content workers own `src/content/npc-content/*` — if their new files fail, note it, don't fix).
- Do not bump `src/version.ts`.

## Definition of done

Report at `.agent-briefs/ws7-result.md`: changed files, red→green evidence, vitest summary, the exact main.ts/types.ts patches, deviations. Disagreement invited on the state-machine shape and scoring bands.

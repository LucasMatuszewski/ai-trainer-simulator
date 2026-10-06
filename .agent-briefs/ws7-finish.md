You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Write your result to `.agent-briefs/ws7-finish-result.md`.

# Task: Finish the mission UI integration — make the worker's own tests pass

Branch `feat/jev-npc-decision-steering`. A previous worker built the conference-speech mission (src/content/missions.ts, src/game/mission.ts, src/jev/mission-wrapper.ts, src/ui/mission.ts + tests) but died on quota before making its last tests pass. **The tests are the spec — do not modify any test file.**

## Current state

- `pnpm vitest run tests/unit/game/mission.test.ts tests/unit/jev/mission-wrapper.test.ts tests/unit/content/missions.test.ts` — GREEN.
- `pnpm vitest run tests/unit/ui/mission.test.ts` — 3 FAILING tests:
  1. "a finished run pays through the standard actions and sets the flag" — "mission did not reach the results card" (the drive: window keydown Space/1-4 through `driveToResults`).
  2. "re-opening a completed mission never pays again" — same.
  3. "the steered question is asked and the steered score moves the meter" — `snap?.question?.questionId` is undefined where the fake steerer's question ("kq-headhunt") should be asked.

## Your job

Debug `src/ui/mission.ts` (and ONLY that file, plus possibly `src/game/mission.ts` if the runtime has a genuine state-machine gap the UI tests expose) until those 3 tests pass WITHOUT changing any test file. Likely areas (from orchestrator analysis): the keydown path answers/advances correctly for the first steps but something in the late phases (post-last-question → complete → results) doesn't progress; and the steered-question wiring (adjustments/adjustmentsQuestionId, prefetchForCurrentStep) may not populate the question phase properly when a steerer is provided.

## Constraints

- Allowed files: `src/ui/mission.ts`, `src/game/mission.ts`. NOTHING else. Tests are immutable.
- `pnpm typecheck` + full `pnpm test` must stay green (1098+ tests; the WS5 content worker may be landing pool files concurrently — failures in tests/unit/content/dialogue-pools-ws5.test.ts are NOT yours).
- Do not bump `src/version.ts`.

## Definition of done

All 4 mission suites green; report at `.agent-briefs/ws7-finish-result.md`: root causes found, what you changed, vitest summary, deviations.

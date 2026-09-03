---
goal: "Stack Underflow Game: clearer, extensible office-day simulation"
beads:
  - sacs-xtma.1
  - sacs-xtma.4
  - sacs-xtma.5
approval: approved
---

# Lunch, Game Clock, CalVer, and Shared Plans Implementation Plan

> Execution status and dependencies live in Beads. This document is the code-bound implementation recipe approved by Lucas on 2026-09-02.

## Goal

Replace the implicit lunch window with a first-class Lunch period while keeping each game day at ten real minutes, expose the corresponding in-world time in the HUD, adopt one CalVer source for visible builds, and make project plans discoverable to every agent inside the repository.

## Approved behavior

- Morning: 09:00–12:00, 180 active real seconds.
- Lunch: 12:00–14:00, 120 active real seconds.
- Afternoon: 14:00–17:00, 180 active real seconds.
- Evening: 17:00–19:00, 120 active real seconds.
- One active real minute represents one in-game hour; the displayed clock advances in 15-minute steps every 15 active real seconds.
- Dialogue, cinematic, help, and non-office screens pause simulation time without catch-up.
- Lunch movement and lunch chatter are eligible only during the Lunch period.
- Evening departures are retuned to fit comfortably inside 120 seconds.
- The visible version is `vYYYY.MM.DD-NN`, imported by the title screen and console from one source. The private package version remains independent.
- Claude Code saves new plans in `docs/plans`; Beads remains the source of truth for work status.

## Authority boundary

This plan authorizes repository-local documentation, tests, source code, screenshots, and Beads updates for `sacs-xtma.1`, `sacs-xtma.4`, and `sacs-xtma.5`. It does not authorize deployment or pushing the branch. Per project policy, pushing waits for Lucas to review the fresh screenshot and QA result.

## Dependency matrix

| Work item | Depends on | Blocks |
| --- | --- | --- |
| Shared pacing model | Approved C-67/D-32 | Reducer, schedules, HUD, runtime clock |
| Four-period content | Shared pacing model | Runtime NPC behavior and events |
| Active simulation clock | Shared pacing model | Accurate HUD clock and pause behavior |
| Evening departure retune | Four-period content | Complete ten-minute day |
| CalVer source | None | Title/console version consistency |
| Shared plan directory | Approved repository convention | Future cross-agent planning |
| Browser verification | All implementation items | Visual acceptance and push eligibility |

## Task 1: Consolidate time-domain primitives with TDD

**Files:**

- Modify: `src/types.ts`
- Modify: `src/game/pacing.ts`
- Modify: `tests/unit/main-constants.test.ts`
- Modify: `tests/unit/end-day.test.ts`
- Create: `tests/unit/pacing.test.ts`

- [ ] Write failing assertions for the four-period order, exact 180/120/180/120 durations, 600-second day, period-boundary rollover, multi-boundary advancement, and quarter-hour formatting.
- [ ] Run the focused tests and confirm failures describe the missing Lunch/pacing behavior.
- [ ] Add `lunch` to `TimeOfDay` and centralize `PERIOD_ORDER` plus period definitions in `src/game/pacing.ts`.
- [ ] Implement typed helpers for period duration, periods remaining, advancing elapsed active time across variable periods, and formatting the in-world clock.
- [ ] Run the focused tests and make them pass.

## Task 2: Make Lunch a real reducer and content period with TDD

**Files:**

- Modify: `src/game/state.ts`
- Modify: `src/content/npc-schedule.ts`
- Modify: `src/content/events.ts`
- Modify: `src/game/events.ts`
- Modify: `src/webmcp/tools.ts`
- Modify: `tests/unit/state.test.ts`
- Modify: `tests/unit/npc-schedule.test.ts`
- Modify: `tests/unit/webmcp-tools.test.ts`

- [ ] Change tests first so one period advance from Morning reaches Lunch, two reaches Afternoon, three reaches Evening, and four reaches the next Morning/day.
- [ ] Add failing schedule assertions that every NPC has four entries and lunch routing is eligible only in Lunch.
- [ ] Run focused tests to observe the expected failures.
- [ ] Replace local three-period unions/orders with the shared `TimeOfDay` and `PERIOD_ORDER` model.
- [ ] Add explicit Lunch schedule entries. Preserve work locations in Morning/Afternoon, CTO absence from Afternoon, and existing Evening destinations.
- [ ] Simplify lunch routing so callers pass the current period rather than an elapsed-time window.
- [ ] Run focused tests to green.

## Task 3: Use active simulation time and render the digital HUD clock

**Files:**

- Modify: `src/main.ts`
- Modify: `src/ui/hud.ts`
- Modify: `src/styles.css`
- Modify: `tests/unit/hud.test.ts`
- Modify: `tests/e2e/smoke.spec.ts`

- [ ] Add failing HUD tests for period labels and representative clock values such as 09:00, 12:45, 16:45, and 18:45.
- [ ] Add or update an end-to-end assertion proving the visible HUD includes Lunch and the digital clock.
- [ ] Run focused tests and confirm the new assertions fail before implementation.
- [ ] Remove wall-clock rebasing from `src/main.ts`; accumulate only frame delta while the office simulation is unpaused.
- [ ] Treat dialogue, cinematic, help, and non-office screens as paused. Do not accumulate or catch up elapsed time while paused.
- [ ] Advance through variable-duration periods using the tested pacing helper and update the HUD clock each frame.
- [ ] Render the clock as a distinct, readable HUD value without crowding cash/day/quest controls.
- [ ] Run focused unit tests and typecheck to green.

## Task 4: Restrict lunch behavior and fit departures into Evening

**Files:**

- Modify: `src/engine/npc-controller.ts`
- Modify: `src/engine/scene.ts`
- Modify: `src/content/npc-schedule.ts`
- Modify: `tests/unit/evening-departure.test.ts`
- Modify: `tests/unit/npc-controller.test.ts`

- [ ] First change the departure simulation test to run for only the new 120-second Evening and assert scheduled leavers finish before day end.
- [ ] Add failing controller assertions that Kitchen lunch behavior begins during Lunch, not Afternoon.
- [ ] Run the focused tests and confirm the old 165-second departure spread or Afternoon check fails.
- [ ] Retune first-departure, spread, minimum-gap, and jitter constants so the final departure leaves walking buffer before 19:00.
- [ ] Switch Kitchen override and lunch chatter eligibility to the Lunch period.
- [ ] Run focused tests to green.

## Task 5: Adopt one visible CalVer source

**Files:**

- Create: `src/version.ts`
- Modify: `src/main.ts`
- Modify: `src/ui/title.ts`
- Create: `tests/unit/title.test.ts`
- Modify: `tests/unit/main-constants.test.ts`

- [ ] Add failing tests requiring the title screen and startup source to use the same exported `GAME_VERSION` in `vYYYY.MM.DD-NN` form.
- [ ] Run the focused tests and confirm the hard-coded `v0.0.1 MVP` title fails.
- [ ] Add `GAME_VERSION` as the single visible version source, beginning this gameplay implementation at `v2026.09.02-11` and incrementing it for any later commit made the same day.
- [ ] Import it in both the title UI and startup console message; leave `package.json` at its private package version.
- [ ] Run focused tests to green.

## Task 6: Consolidate project plans in the repository

**Files:**

- Create: `.claude/settings.json`
- Move: `.claude/plans/c64-reception-and-meeting-room-move.md` to `docs/plans/2026-09-02-c64-reception-and-meeting-room-move.md`
- Create: `docs/plans/game-roadmap.md`
- Modify: `AGENTS.md`
- Modify: `README.md`
- Modify: `docs/CHANGELOG.md`
- Modify: `docs/LUCAS-FEEDBACK-INDEX.md`

- [ ] Preserve and move the surviving C-64 plan into `docs/plans`.
- [ ] Record that the formerly referenced `glistening-napping-hinton.md` file is absent and reconstruct a concise roadmap/navigation document from the PRD, ADR, changelog, and Beads epic without inventing lost detail.
- [ ] Add `.claude/settings.json` containing only `{ "plansDirectory": "./docs/plans" }`, the current official Claude Code project setting.
- [ ] Add a brief `docs/plans` description to `AGENTS.md` and update repository references to point at the shared plan location.
- [ ] Keep historical feedback entries intact while adding a supersession note where an obsolete path could mislead future agents.
- [ ] Verify JSON syntax and search the repository for remaining active references to `.claude/plans` or the missing plan filename.

## Task 7: Mutation checks, full verification, and visual QA

**Files:**

- Modify only if verification reveals a defect.
- Create: `screenshots/c67-lunch-clock.png`
- Create: `screenshots/c67-lunch-clock.txt`

- [ ] Perform the mandated mutation checks: temporarily restore three-period advancement, the old Afternoon lunch condition, and the old title version independently; confirm their targeted tests fail, then restore the implementation and confirm they pass.
- [ ] Run `pnpm typecheck`, `pnpm test`, `pnpm build`, and relevant Playwright tests.
- [ ] Stop stale Vite processes, start one fresh dev server on port 5173, and confirm the browser console reports the exact current `GAME_VERSION`.
- [ ] Capture a Lunch-state screenshot showing the Lunch label and digital clock in `screenshots/c67-lunch-clock.png`.
- [ ] Describe the screenshot with the required vision review and save the description beside it.
- [ ] Run an independent QA review and report its verdict.
- [ ] Update/close the three Beads issues only when their acceptance criteria are met.
- [ ] Show Lucas the screenshot, exact version, test results, and QA verdict. Do not push until Lucas accepts the visual result.

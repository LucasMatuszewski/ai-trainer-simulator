# Independent QA: C-67 Lunch clock, C-68 CalVer, shared plans

## Review task

Review the current uncommitted diff in `/home/lucas/DEV/Projects/ai-trainer-simulator`. Do not edit any file. Do not commit or push.

## Approved behavior

- Four periods: Morning 09:00-12:00/180 s, Lunch 12:00-14:00/120 s, Afternoon 14:00-17:00/180 s, Evening 17:00-19:00/120 s.
- One active real second equals one game minute. HUD display is quantized to 15-minute steps.
- Dialogue, cinematic, help, and non-office screens pause the simulation clock with no catch-up.
- Lunch routing and chatter are Lunch-only; Afternoon is work time.
- Evening departures complete within the 120-second Evening.
- Title and console import one CalVer-style `GAME_VERSION`; package version stays independent.
- Plans live in `docs/plans`; `.claude/settings.json` contains only `plansDirectory`.

## Evidence already run

- TDD red/green cycles for pacing, reducer, schedules, departure timing, HUD, and title.
- Mutation checks caught removal of Lunch, Afternoon lunch leakage, old departure constants, disabled quarter-hour/pause logic, and the old title version.
- `pnpm test`: 60 files, 558 tests passed before the final E2E-only edits.
- `pnpm typecheck`: passed after implementation.
- Focused Playwright smoke: passed and produced `screenshots/c67-lunch-clock.png`.
- Vision review: PASS in `screenshots/c67-lunch-clock.txt`.

## What to inspect

1. Check period-boundary math and day rollover for variable durations.
2. Check the runtime really uses active `dt`, does not catch up after pauses, and updates the HUD coherently.
3. Check Lunch semantics in schedules, random routing, chatter injection, and WebMCP advancement.
4. Check departure constants/tests leave adequate walking buffer.
5. Check visible version and plan-directory consolidation for duplication or stale active references.
6. Identify regressions, missing cases, incorrect docs, or unnecessary scope.

Return a concise verdict: `PASS`, `PASS WITH MINOR NITS`, or `FAIL`, followed by findings ordered by severity and exact file/line references where possible.

Do not edit. Do not commit. Do not push.

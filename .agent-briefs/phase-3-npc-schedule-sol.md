# Phase 3.0 NPC schedule - Codex Sol report

## Delivered

- Added `src/content/npc-schedule.ts`.
- Added deterministic morning, afternoon, and evening schedule entries for all 13 NPCs (39 entries total).
- Added the requested `Period`, `NpcState`, and `ScheduleEntry` types.
- Included the non-default schedules for Bartek, Maciek, Janusz, Burek, Zosia, and Pawel.
- Added `tests/unit/npc-schedule.test.ts` with 14 tests covering completeness, valid angles, office bounds, absence of deterministic `walking` destinations, and all requested character cases.

## Type import decision

The brief suggested importing `NpcId` from `./npcs`, but that file does not export it. The canonical `NpcId` already exists in `src/types.ts`. Because the task explicitly forbids modifying existing files, the new schedule imports `NpcId` from `../types` instead.

## Verification

- `corepack pnpm test tests/unit/npc-schedule.test.ts`: PASS, 1 file and 14 tests passed.
- `corepack pnpm typecheck`: PASS.

The bare `pnpm` command is not on PATH in this non-interactive shell. Corepack supplies pnpm 11.2.2, so the requested scripts were run through `corepack pnpm`. Both also passed when invoked directly through the local `node_modules/.bin` executables.

## Scope audit

- No existing file was modified by this task.
- Only the two requested implementation/test files and this report were added.
- Pre-existing dirty and untracked workspace files were left untouched.
- No commit or push was made.

## Remaining work

None for the Phase 3.0 schedule data task. Runtime integration remains intentionally out of scope.

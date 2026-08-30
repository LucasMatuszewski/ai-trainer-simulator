# Brief: fix the pre-existing TypeScript error in `src/main.ts:640` and add the regression test for the stuck-dialogue bug

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game in `/home/lucas/DEV/Projects/ai-trainer-simulator/`.

Two pieces of work, both small. They are independent — the typecheck fix is a one-liner; the regression test is a small vitest file.

## Task 1: Fix the pre-existing TypeScript error

`pnpm typecheck` fails with:
```
src/main.ts(640,3): error TS2353: Object literal may only specify known properties, and 'getSceneObjects' does not exist in type '{ getPlayer: () => { x: number; y: number; z: number; }; getCamera: () => { x: number; y: number; z: number; }; getFocus: () => string | null; getScreen: () => string; }'.
```

The line 640 is the `sceneObjects` field of a wiring object in `main.ts`. It references `controls.getSceneObjects()`, but the `controls` module's surface does not export that method. Read `src/main.ts` around line 640 and `src/engine/controls.ts` to figure out what `getSceneObjects` was supposed to return. Either:
- (a) Add the method to `controls.ts` (if it's a real refactor that's needed), OR
- (b) Remove the `sceneObjects: controls.getSceneObjects()` line (if it's a stale call).

Read the surrounding code to decide which. The right answer is probably (b) — the line was probably left over from a refactor — but verify.

After the fix, `pnpm typecheck` must exit 0. The change should be one commit, one file (or two), with a message that explains what was wrong and what was done.

## Task 2: Add the regression test for the stuck-dialogue bug

PRD C-17 (in `/home/lucas/DEV/Projects/ai-trainer-simulator/docs/PRD.md`) documents a bug: the dialogue controller's `state` is not reset on screen transition, so after `endDay()` → `setScreen("summary")` → next day, `dialogue.open(npc)` early-returns on `if (state) return;` and the player can't talk to anyone.

The fix was applied in Phase 0:
1. `dialogue.close()` sets `state = null` (and removes the DOM).
2. `setScreen()` calls `dialogue?.close()` before transitioning.

Read `/home/lucas/DEV/Projects/ai-trainer-simulator/src/ui/dialogue.ts` to see the current shape. Then write a vitest test in `/home/lucas/DEV/Projects/ai-trainer-simulator/tests/unit/dialogue-state.test.ts` that covers:

1. **open, close, open again** — first `open(npc)` succeeds; `close()` clears state; second `open(npc)` succeeds.
2. **open, setScreen('summary'), open again** — `setScreen('summary')` calls `close()`; next `open(npc)` succeeds.
3. **open, setScreen('minigame'), setScreen('office'), open again** — same.

The test must import the dialogue module the same way `src/main.ts` imports it. Read `src/main.ts` to find the import path. The test must be hermetic (no real DOM, no real WebGL); if the dialogue module touches the DOM, use `happy-dom` or `jsdom` — read `vitest.config.ts` to see what's already configured.

If the dialogue module is hard to import in isolation (e.g. it touches a global `uiRoot`), extract the state machine into a pure function (e.g. `createDialogueState()`) and test that. The pure function is what we want to lock down with the test; the DOM is incidental.

## What to deliver

Two commits, in this order:

1. **Commit 1: `fix(typecheck): resolve pre-existing getSceneObjects error`**
   - The minimal change to `src/main.ts` (or `src/engine/controls.ts`) that makes `pnpm typecheck` exit 0.
   - `git add <the file you changed>` and commit.
   - Do not push.

2. **Commit 2: `test(dialogue): add regression test for stuck-dialogue bug (C-17)`**
   - New file: `tests/unit/dialogue-state.test.ts`.
   - Possibly a refactor of `src/ui/dialogue.ts` to extract the pure-function state machine.
   - `git add <the test file and any refactored files>` and commit.
   - Do not push.

After both commits: `pnpm typecheck && pnpm test` must both pass. The new test count should be 42 + 3 = 45 (or whatever the count of new test cases is; report the count).

## Out of scope

- Do not fix any other typecheck errors (none should exist; if you find one, report it but don't fix).
- Do not add any new features.
- Do not change the dialogue copy.

## Definition of done

- `pnpm typecheck` exits 0.
- `pnpm test` exits 0, with the new tests included.
- The pre-existing error is gone.
- The new regression test would FAIL if `dialogue.close()` reverted to not clearing state.
- Two commits, granular, with clear messages.
- No push.

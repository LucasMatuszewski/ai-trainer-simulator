# URGENT: Fix WASD + write a real test suite

## Context

You previously wrote `.agent-briefs/review-wasd-sol.md` with a thorough analysis. Lucas's verdict on your analysis: "FUCK.... after your fixes WSAD doesn't work at all, zero, nothing... bravo!!! OMG....... why????"

The previous agent (Claude) applied parts of your hardening diff to `src/engine/controls.ts`:
- Switched from `e.key` to `e.code` (your suggestion #1).
- Added `keys.clear()` on `blur`, `canvas.blur`, `visibilitychange`, `pagehide`.
- Added a `destroy()` method to the returned `Controls` interface.
- Ignored movement keys when the target is an `INPUT` or `TEXTAREA`.

After the agent committed, the WASD was reported "completely broken — zero, nothing." The dev server has HMR (port 5173) and Lucas confirmed he sees live reload. So the new code is running.

## Your job

Two tasks. **Do not commit. Do not push.** Write your work to a file `.agent-briefs/wasd-fix-sol.md` and stop. Claude (the orchestrator) will verify, commit, and push.

### Task 1: Diagnose why WASD is broken NOW

Read the current state of `src/engine/controls.ts` and figure out what regressed. Some hypotheses:

1. The new `physicalToMoveKey()` returns `null` for unrecognized codes. But the `keydown`/`keyup` handlers call `e.preventDefault()` only when the code IS recognized. If the user presses a non-movement key (e.g. Shift alone, Tab, etc.) the handlers now do nothing, which is fine. But if a key like Shift IS in the codeToMoveKey map and the user types a letter with Shift held, the movement set gets "shift" added, which is fine — but the letter keyup might not match the letter keydown if there was an IME composition. Verify.

2. The `keys.delete()` in the new `onKeyUp` does `e.preventDefault()`. If this prevents the user from typing in a focused input, that's a real bug. But the `INPUT`/`TEXTAREA` check is in `onKeyDown`, not `onKeyUp` — so the keyup also fires preventDefault on text-input keys, which might break typing. Test this.

3. The two `window.addEventListener("keydown", ...)` calls (the Space/Esc one at line ~189 and the new movement one at line ~264) might both fire on the same event, and BOTH call `e.preventDefault()`. The Space/Esc handler does NOT check for `INPUT`/`TEXTAREA` first for the Escape case, only for the Space case. So Escape in a text input would preventDefault and the cursor's behavior in the input might break. But that doesn't explain WASD.

4. Look at `src/main.ts` line 71-75: there is a third `window.addEventListener("keydown", (e) => { if (e.key === "Escape") { ... } })`. This is independent of controls. It does not call preventDefault, so it should be fine.

5. The `setKeys` setter (line 303) is a test seam. Is anyone calling it? `grep -rn 'setKeys' src/`.

6. The `main.ts` does `if (!engine) { ... }` to create controls once, but does it ever call `destroy()`? Probably not. If a test environment calls `createControls` twice without destroy, the first instance's listeners are still active, but the first instance's `keys` closure is the one being mutated. Hmm.

7. The Space/Esc keydown handler is anonymous and never removed. With the new `destroy()` that does not remove it, this leaks. But that doesn't cause WASD to break; it just leaks.

8. **The most likely cause**: the dev server (port 5173) caches TypeScript transformations. The user has been refreshing manually. But HMR may have updated to the partially-applied state. The user says WASD is "zero, nothing" — not stuck, completely dead. The likely cause is that **the new code has a JavaScript syntax error or runtime error that breaks the entire controls module**, so neither the WASD handler nor the Space/Esc handler is registered. The dev server's error overlay would show this — but maybe the user dismissed it.

**Verify hypothesis 8.** Read the current `src/engine/controls.ts` end-to-end. Look for:
- A function call before it's defined (hoisting issue — `const codeToMoveKey` is used in a closure but defined after? No, it's defined before the listener.)
- A method on an object that doesn't exist (e.g. `e.code.toLowerCase()` — `e.code` is fine).
- An import that's missing.
- An event listener that throws on registration.
- A reference to a non-exported name in a default-export pattern.

Also **read the dev server's HMR log** if possible. The dev server is on port 5173. There may be a recent log file in `/tmp/` or similar.

**Most important diagnostic step**: actually run the dev server (or check if it's already running) and look at its output. The process is something like `node /home/lucas/.nvm/versions/node/v24.18.0/bin/../vite/bin/vite.js`. Find it with `ps -eo pid,cmd | grep vite | grep -v grep`. Then check if it has any compile errors by running the same `pnpm dev` command and seeing what it says.

If you find a regression, fix it. Use a minimal diff: revert only what broke, do NOT remove the new e.code logic unless it's the cause.

### Task 2: Make the test suite ACTUALLY RUN

Sol, you proposed a great test design in your earlier review. Now write the code for it:

1. Add `jsdom` to `package.json` devDependencies (run `pnpm add -D jsdom` — note: this requires user permission but you can do it as a recommendation; the user can install it themselves, OR you can write the tests assuming jsdom is available and Claude will install it before running).

2. Write `tests/unit/controls-events.test.ts` with the integration test from your review. Use the jsdom environment via `// @vitest-environment jsdom` directive. Import `createControls` from `src/engine/controls`. Use `window.dispatchEvent(new KeyboardEvent(...))` to simulate WASD. Use `controls.update(dt)` to advance frames. Assert `getPlayerPosition()` deltas.

3. **Crucial**: the test must call `controls.destroy()` in `afterEach`. If you don't, the listeners leak across tests and the second test sees ghost state.

4. Add at least these cases:
   - W down → update → position moves in -Z. → W up → update → position stays.
   - W down, S down → both in set → W up → S still down → update → moves in +Z only.
   - 30× W keydown (autorepeat) → 1× W keyup → update → position stops (regression test for the stuck-key bug).
   - W down → `window.dispatchEvent(new Event('blur'))` → update → position stops (regression test for the blur-fix).
   - W down → `document.dispatchEvent(new Event('visibilitychange'))` after setting `document.hidden = true` → update → position stops.
   - Space down → state changes to "toggle" → Space down → state changes to "free".
   - RMB down → state "hold" → RMB up → state "free" → mouseleave while "hold" → state "free".

5. Write `tests/e2e/movement.spec.ts` (Playwright). Use port 5173 (the dev server with HMR, not 4173). Title → character creation → office. Wait for the intro cinematic to finish (~5.5s). Then for each of W, A, S, D:
   - Record player position.
   - Press the key, wait 500ms.
   - Record position; assert it moved in the right direction.
   - Release the key, wait 500ms.
   - Record position; assert it did NOT move (within 0.05 units, accounting for one final-frame residual).

6. Run `pnpm test` and `pnpm test:e2e` to make sure all tests pass.

7. If a test fails, FIX THE CODE so the test passes — not the other way around. The tests are the safety net.

### Output format

Markdown, headed:

```
# Sol's fix

## What I found

(diagnosis of why WASD is broken)

## What I changed

(diff or list of edits)

## Tests added

(path to new test files + count of new test cases)

## Test results

(output of `pnpm test` and `pnpm test:e2e`)

## Anything else
```

The dev server is at `http://localhost:5173/`. The build command is `pnpm build` (output to `dist/`, served by 4173). The test command is `pnpm test`. The e2e command is `pnpm test:e2e`. Use these.

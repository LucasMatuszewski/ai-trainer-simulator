# URGENT take 2: WASD still broken in the real browser

## What happened

You (Sol) wrote a great analysis and tests in your previous round, AND you correctly identified the stale .js shadowing issue. Claude applied your `noEmit: true` fix in tsconfig.json and your Vite `resolve.extensions` fix in vite.config.ts. The dev server on 5173 now serves the new TypeScript code (verified: `curl http://localhost:5173/src/engine/controls.ts` shows the imports as `.ts` not `.js`).

The jsdom integration tests pass (7/7 in `tests/unit/controls-events.test.ts`).

**But the game is STILL broken in the real browser.** Lucas just reported: "Right now on 5173 we are back on the same error we had before your previous fixes that just broke WSAD totally.... now I just have same issues with blocking ASD buttons and W doesn't work at all, exactly the same as before."

So the new controls code, when run in a real browser, has a regression. The jsdom tests passed but they were not actually testing the runtime. They were testing the *pure* `stepControls` function via `createControls`, but the actual user-facing WASD input in the real game still doesn't work.

## Your job (different from last time — USE THE REAL BROWSER)

Three tasks. **Do not commit. Do not push.** Write your findings to `.agent-briefs/wasd-fix-take-2-sol.md`.

### Task 1: Run the game in a real browser and observe what happens

Use Playwright (already installed). The system Chrome is at `/usr/bin/google-chrome`. The dev server is at `http://localhost:5173/`. The game's debug hook is `window.__aitrainer` with `getPlayer()`, `getCamera()`, `getYaw()`, `getPitch()`, `isMouseLook()`. There's also `setKeys` on the Controls interface but it bypasses the event handlers.

Write a script (or use `playwright` CLI directly via `npx playwright test`) that:

1. Opens `http://localhost:5173/`.
2. Clears localStorage. Reloads.
3. Clicks "New Game" → AI spec → debugger trait → "Begin Career".
4. Waits for the HUD to be visible and the intro cinematic to finish (the cinematic lasts 3.5s; wait 5.5s to be safe).
5. Records `player = window.__aitrainer.getPlayer()`. Logs it.
6. Dispatches a real `KeyboardEvent('keydown', { key: 'w', code: 'KeyW', bubbles: true })` on `window` via `page.keyboard.down('w')` (Playwright's `page.keyboard.down` is the standard way).
7. Calls `window.__aitrainer.update()` or advances time so the controls tick. Actually, the game's frame loop calls `controls.update(dt)` from the requestAnimationFrame loop, so the real-game integration is "press the key, wait a few frames, observe". So do `await page.waitForTimeout(500)` after pressing the key.
8. Records the new player position. Logs it. Asserts (just for the script) that it changed.
9. Releases W with `page.keyboard.up('w')`.
10. Waits 500ms.
11. Records the player position again. Asserts it has NOT changed (within 0.05 units, allowing for one final-frame residual).
12. Repeats 5-9 for A, S, D.
13. **For each direction, the test must report the actual deltas** (start, after-press, after-release, drift-after-release). If any key is stuck, the test will show: after-release drift > 0.05 units, OR after-press delta < 0.2 units.

If this is too hard to run in a real browser, you can use the unit-test jsdom path BUT you must add a console.error / page.on('pageerror') handler that catches any JS error during the page load. The runtime error that was causing the silent failure (per your last analysis: stale .js shadowing) might now be a different one. Check the dev server's transform output and the browser's console.

### Task 2: Find the real cause

Based on the Playwright observation, identify the actual cause. Some hypotheses:

A. **`e.preventDefault()` on Space/Esc is breaking the canvas's keydown chain.** The Space/Esc handler (line 188-209) calls `e.preventDefault()`. Maybe this prevents the movement handler (line 252) from receiving the same event? Test: disable the Space/Esc handler and see if WASD works.

B. **The `e.code` from Playwright is empty or different.** Playwright's `page.keyboard.down('w')` might dispatch a `KeyboardEvent` with `code: ''` and `key: 'w'`. If `code` is empty, the movement handler returns early (the `if (moveKey === null) return;` check). Test: log the actual `e.code` from a real keydown event in the browser console.

C. **There's a hot-module-reload artifact.** HMR can leave old closures alive with old `keys` state. Force a hard reload (Ctrl+Shift+R) before testing. Or test in an incognito window with a clean session.

D. **The cinematic is still running.** The `cinematicPlaying` flag blocks `controls.update()`. If the test waits only 3.5s and the cinematic takes longer due to lag, no movement. Wait 6s.

E. **There's a JS error in another file that's crashing the page.** Open the browser console (or use Playwright's `page.on('pageerror')`) and report any errors.

F. **The event target check is the issue.** Line 241-242: `if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;`. If the canvas is somehow the event target, the tagName is "CANVAS", not INPUT, so this is fine. But maybe with HMR the target is a stale element. Test by removing the check temporarily.

G. **The Space/Esc handler is calling preventDefault on the WASD event.** Wait — line 189-209 is a SEPARATE listener from the movement one at line 252. Both fire on the same `keydown` event. The Space/Esc one calls `e.preventDefault()` for Space and Esc keys only. For W/A/S/D, the Space/Esc handler does NOT call preventDefault. So the movement handler still gets the event. Unless... let me re-read.

Actually wait. The Space/Esc handler is at line 189-209. It's `window.addEventListener("keydown", (e) => { ... if (k === " " || e.code === "Space") { ... } else if (k === "escape") { ... } })`. So for a W keydown, `k === "w"`, neither branch matches, the handler does nothing. The movement handler at line 252 then fires separately. Both run because they're separate listeners.

H. **`e.preventDefault()` on keyup is preventing the browser from sending the next keydown.** Probably not — preventDefault on keyup doesn't block the next keydown. But test anyway.

### Task 3: Fix the actual bug

Once you find it, fix it. The fix should be minimal — a small diff. Then:

- Run the Playwright test (Task 1) and confirm it passes.
- Run `pnpm test` and confirm the 7 jsdom tests still pass.
- Run `pnpm typecheck` and confirm 0 errors.
- Run `pnpm build` and confirm it produces a working dist (optional but recommended).

### Output format

```
# Sol's fix take 2

## What I observed in the real browser

(Playwright output, with the actual player positions at each step)

## Root cause

(One-line answer: "the bug is X, at src/engine/controls.ts:LINE, because Y")

## The fix

(diff or list of edits)

## Verification

(pnpm test, pnpm typecheck, Playwright re-run — show outputs)

## Anything else
```

The orchestrator (Claude) will verify and commit. Don't push. Don't modify AGENTS.md or README.md unless the fix requires it.

# URGENT: real user is broken in real browser. Find the bug.

## What Lucas (the user) reported, verbatim

> "first key down D moved left (blocked, constant movement all the time after release), then next key down a stopped movement. The all other keys does nothing. no movement. And then S key move back and blocks the movement after key release, it keeps moving back. All other keys doesn nothing."

## Lucas's exact console log from his real browser

```
[controls] keydown {key: 'd', code: '', moveKey: 'd', target: 'BODY'}
controls.ts:266 [controls] keys Set after add ['d']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete ['d']
controls.ts:257 [controls] keydown {key: 'a', code: '', moveKey: 'a', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (2) ['d', 'a']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (2) ['d', 'a']
controls.ts:257 [controls] keydown {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (3) ['d', 'a', 'w']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (2) ['d', 'a']
controls.ts:257 [controls] keydown {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (3) ['d', 'a', 'w']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (2) ['d', 'a']
controls.ts:257 [controls] keydown {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (3) ['d', 'a', 'w']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (2) ['d', 'a']
controls.ts:257 [controls] keydown {key: 'a', code: '', moveKey: 'a', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (2) ['d', 'a']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (2) ['d', 'a']
controls.ts:257 [controls] keydown {key: 'a', code: '', moveKey: 'a', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (2) ['d', 'a']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (2) ['d', 'a']
controls.ts:257 [controls] keydown {key: 'd', code: '', moveKey: 'd', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (2) ['d', 'a']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (2) ['d', 'a']
controls.ts:257 [controls] keydown {key: 'd', code: '', moveKey: 'd', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (2) ['d', 'a']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (2) ['d', 'a']
controls.ts:257 [controls] keydown {key: 'a', code: '', moveKey: 'a', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (2) ['d', 'a']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (2) ['d', 'a']
controls.ts:257 [controls] keydown {key: 's', code: '', moveKey: 's', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (3) ['d', 'a', 's']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (3) ['d', 'a', 's']
controls.ts:257 [controls] keydown {key: 'a', code: '', moveKey: 'a', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (3) ['d', 'a', 's']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (3) ['d', 'a', 's']
controls.ts:257 [controls] keydown {key: 'd', code: '', moveKey: 'd', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (3) ['d', 'a', 's']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (3) ['d', 'a', 's']
controls.ts:257 [controls] keydown {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:266 [controls] keys Set after add (4) ['d', 'a', 's', 'w']
controls.ts:272 [controls] keyup {key: 'w', code: '', moveKey: 'w', target: 'BODY'}
controls.ts:276 [controls] keys Set after delete (3) ['d', 'a', 's']
```

## Observations from Lucas's log

1. `e.code: ''` on EVERY event. Lucas's browser is not populating `e.code`.
2. Every `keyup` has `key: 'w'`, regardless of which key Lucas actually released.
3. The `keys` Set never loses its entries — `d` and `a` are present throughout.
4. Lucas's keyboard works fine in all other applications (his words).

## What the agent (Claude M3) has done so far — DO NOT REPEAT

- Rewrote controls.ts multiple times.
- Added `e.code` fallback to `e.key` because `e.code` was empty.
- Added `blur` / `visibilitychange` / `pagehide` clear-the-Set handlers.
- Set `noEmit: true` in tsconfig.json so tsc never emits stale .js files.
- Added `resolve.extensions` in vite.config.ts so Vite prefers .ts over .js.
- Added the debug console.log in `onKeyDown` / `onKeyUp` so Lucas could see what is happening.
- Wrote a Playwright test that passes in headless mode (so the code IS correct in a synthetic browser environment).
- Bumped the build version banner to v2026.08.29-05.

NONE of this helped. The bug only manifests in Lucas's real browser.

## Your job

Read Lucas's log above. Read the codebase. Find the bug.

### Specific questions to answer

1. **Why is every `keyup` `key: 'w'`?** Lucas's keyboard is fine, so the OS is not sending a keyup for W. Something in our code, or the browser, is generating these. What?

2. **Why is `e.code: ''` on every event?** This is unusual. It means the browser is not getting the physical-key info from the OS. Could this be related to focus? Could the events be coming from a non-keyboard source (IME, accessibility tool, virtual keyboard)?

3. **The `keys` Set keeps growing and never shrinks.** Why does the keyup event for `'w'` only delete `'w'` and not the other keys the user released? Or is the user not actually pressing D/A/S — is the log showing only the events that DO fire, while the D/A/S keydown events are getting lost somewhere?

4. **Is there a focus issue?** The events have `target: 'BODY'`. Lucas is not typing in a text input. But the controls check `isTextEntryTarget` and return early. Could the BODY be incorrectly identified as a text entry target? (No — `isTextEntryTarget` only returns true for INPUT/TEXTAREA/contentEditable.)

5. **Is there HMR state corruption?** The dev server is on 5173. HMR may have left the page in a bad state. But Lucas reloaded and the build version banner is current.

6. **Look at the FULL set of key listeners.** Grep for `keydown`, `keyup`, `keypress`, `addEventListener.*key`, `document.addEventListener`, `window.addEventListener` across the entire `src/` tree. Is there a listener that runs synchronously and consumes events?

7. **Look at any focus-management code.** The roster UI, the help modal, the dialogue UI, the toast UI — does any of them grab focus and absorb keyboard events? The `target: 'BODY'` in the log says the event was NOT absorbed by an input, but the event might have been redirected by `e.preventDefault()` or `e.stopPropagation()` in a parent listener.

8. **Look at the frame loop.** `src/main.ts` `frame()` calls `controls.update(dt)` only when `screen === "office" && !dialogue?.isOpen() && !cinematicPlaying`. If the user is in a different screen (e.g., the dialogue UI captured focus), `controls.update()` is NOT called, but the keydown/keyup handlers ARE still installed. So Lucas's keys are being added/removed from the Set but the Set is not consulted. Wait — but the user said the player IS moving. So `controls.update()` IS being called.

9. **Is there a second `createControls` invocation happening in the dev environment?** If HMR reloaded controls.ts, the module re-evaluates and a new `createControls` is exported. But `main.ts` only calls it once (`if (!engine)`). Unless something is wrong.

10. **Look at `setScreen` in main.ts.** It calls `closeDialogueForScreenTransition(dialogue)` and `uiRoot.innerHTML = ""`. The `uiRoot.innerHTML = ""` could be removing and re-adding DOM elements, which can cause focus to be lost. After focus loss, the `blur` handler fires, which clears the Set. If the user is mid-press when the screen changes, the Set could be cleared mid-press.

### What to return

- A specific, code-level explanation of what is wrong.
- A specific, minimal fix.
- A test that catches this specific bug.
- **No opinions, no hypotheses, no "I think it might be".** Read the log, read the code, find the bug. Be precise.

### Code locations to start from

- `src/engine/controls.ts` lines 1–400 (the full file)
- `src/main.ts` lines 60–220 (the frame loop, screen management, controls wiring)
- `src/ui/dialogue.ts` (focus management for the dialogue UI)
- `src/ui/office-roster.ts` (focus management for the roster)
- `src/ui/help-modal.ts` (focus for the help modal)
- `src/ui/hud.ts` (toasts — does the toast take focus?)
- `src/main.ts` lines 326–360 (the intro cinematic — does it set `cinematicPlaying` and forget to clear it?)

Run `git log --oneline -20` to see the recent history. Run `git diff HEAD~5` to see the last 5 commits. Understand what's there, then find the bug.

Claude (the orchestrator) will verify your fix and commit. Do not commit yourself.

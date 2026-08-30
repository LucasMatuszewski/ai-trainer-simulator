# Sol's fix

## What I found

The primary regression was source shadowing, not a syntax error in the new `e.code` mapping.

The repository contained ignored JavaScript files emitted beside the TypeScript sources, including `src/engine/controls.js`. Vite and Vitest resolve extensionless imports to `.js` before `.ts` by default. As a result, edits and HMR updates to `src/engine/controls.ts` were not necessarily the controls implementation executing in the browser. The stale JavaScript copy also lacked `destroy()`, which the new jsdom suite proved immediately: all seven event tests initially failed with `controls.destroy is not a function` even though the TypeScript implementation returned it.

The project build script used `tsc -b` while `tsconfig.json` had no `noEmit`, which is how side-by-side JavaScript could keep being regenerated. This made the problem persistent and made HMR misleading: Vite reloaded, but extensionless imports continued to select stale JavaScript dependencies.

I also found the previous hardening change was incomplete:

- `destroy()` was missing from the `Controls` interface.
- The Space/Escape, mouse, context-menu, visibility, and mousemove handlers were anonymous or removed with the wrong callback reference, so `destroy()` leaked listeners.
- `keyup` called `preventDefault()` even when a text input owned the event.
- Depending exclusively on `KeyboardEvent.code` made movement fail in embedded, remote, or synthetic event paths that omit `code`.

## What I changed

- Added `noEmit: true` to `tsconfig.json` so type checking/build validation cannot emit JavaScript beside TypeScript again.
- Configured Vite/Vitest resolution to prefer `.ts`/`.mts` over `.js`, preventing any existing ignored stale JavaScript from shadowing source files.
- Kept `e.code` as the primary, layout-independent movement-key identity and added a conservative `e.key` fallback when `code` is absent.
- Added `destroy()` to the public `Controls` interface.
- Named and removed every listener registered by `createControls()`:
  - movement keydown/keyup
  - Space/Escape keydown
  - blur/pagehide/visibilitychange
  - contextmenu/mousedown/mouseup/mouseleave
  - document mousemove
- Preserved key deletion on keyup but stopped preventing default behavior for keyups owned by input, textarea, or contenteditable elements.
- Added `jsdom` 30.0.1 as a dev dependency and updated the lockfile.

## Tests added

- `tests/unit/controls-events.test.ts`: 7 jsdom integration tests covering:
  - W movement and release
  - simultaneous W/S state and independent release
  - 30 repeated keydowns followed by one keyup
  - window blur clearing input
  - hidden-document visibilitychange clearing input
  - Space mouse-look toggle
  - RMB hold/release and mouseleave release
- `tests/e2e/movement.spec.ts`: 1 Playwright scenario with four movement cases (W, A, S, D), asserting the correct world-axis direction and less than 0.05 units of movement after release.

The browser test uses the live HMR server at port 5173 and system Google Chrome.

## Test results

`pnpm typecheck`:

```text
$ tsc --noEmit
exit 0
```

`pnpm test`:

```text
Test Files  9 passed (9)
Tests       75 passed (75)
Duration    2.65s
exit 0
```

There is a pre-existing reducer-suite stderr warning that `localStorage` is unavailable in the Node environment; the reducer tests still pass.

`pnpm test:e2e`:

```text
Running 3 tests using 3 workers
3 passed (17.3s)
exit 0
```

The passing browser suite includes the new WASD direction/release test, the existing smoke flow, and the existing Phase 2 FPS spawn/movement test.

## Anything else

The first Playwright run exposed a test-boundary issue: it compared the position sampled before keyup with the position 500 ms later, so it counted frames legitimately rendered between the sample and the keyup call. I corrected the test to sample immediately after keyup and measure only post-release drift. The full suite then passed.

I did not commit or push.

# C-64 Wave 4 report - Renata Xerox copy run

## Built

- Added a periodic Renata copy run to the existing NPC controller state machine.
- Renata leaves her reception desk, uses the shared path machinery, dwells beside the Xerox, and returns through the same machinery.
- Added a controller-owned `xerox-scanner-flash` plane under the existing printer group. It sweeps across the glass without allocating lights.
- Added the pure `printerFlashIntensity(elapsedSeconds)` timing curve and unit tests written before its implementation.
- Registered `sfx_photocopier` in the typed SFX id union and trigger it once at the start of each scanner sweep.
- Copy runs are suppressed while the player talks to Renata. Period changes cancel an active run and restore the new period's schedule.
- Path failures restore Renata to her desk instead of leaving her in the room.

## Tuning constants

- `COPY_RUN_INTERVAL_S`: 60 to 120 seconds.
- `COPY_RUN_DWELL_S`: 6 to 10 seconds.
- `PRINTER_FLASH_SWEEP_COUNT`: 4 sweeps.
- `PRINTER_FLASH_SWEEP_INTERVAL_S`: 1.6 seconds.
- Each pulse ramps for 0.12 seconds and decays for 0.32 seconds, with zero intensity between sweeps.

## Missing-audio behavior

Confirmed in `src/audio/manifest.ts` and `src/audio/sfx.ts`: an absent manifest entry makes `resolveUrl` return `null`; `SfxBus.play` immediately returns when its resolver returns `null`. The new call therefore safely no-ops until Wave 5 generates `sfx_photocopier`.

## Assumptions and brief corrections

- The printer currently has no named scanner-light mesh. Because this wave does not own `src/engine/furniture/**`, the controller attaches and disposes the cheap flash plane at runtime instead of editing the printer factory.
- Renata's authored working point `(4.4, 13.5)` is inside the reception desk's broad navigation AABB. The shared `startPath` now ignores only obstacles containing its start or destination endpoint. This lets an NPC leave or enter an intentionally embedded working point while every obstacle between the endpoints stays solid.
- The safe copy position is `(4.4, 15.6)`, immediately south of the printer, facing it. The printer center itself is solid and cannot be a valid NPC destination.

## Verification

- Test-first red state confirmed: `printer-flash.test.ts` failed because the new module did not exist.
- Focused tests cover the timing curve, full desk-copy-return cycle, four SFX triggers, visible flash, and dialogue suppression.
- `./node_modules/.bin/tsc --noEmit`: passed.
- `./node_modules/.bin/vitest run`: 56 files passed, 526 tests passed, zero failures.
- No dev server, build, Playwright, external API, commit, or push was used.

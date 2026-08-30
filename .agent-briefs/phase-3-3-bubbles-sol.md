# Phase 3.3 inter-NPC speech bubbles - Codex Sol report

## Delivered

- Added `src/engine/bubbles.ts` with:
  - reusable `THREE.Sprite` bubble system and `BubbleHandle` lifecycle
  - fresh 256x64 `CanvasTexture` rendering on every `show`
  - constant screen size, speaker-position tracking, 4-6 second lifetime, and final 0.5 second fade
  - wrapping/truncation, texture disposal, clearing, and destruction
  - 10 curated starter lines
  - pure `shouldShowBubble` and `findClosestPair` helpers
  - `pickLine` with consecutive-repeat prevention
- Added minimal bubble wiring to `src/engine/npc-controller.ts`:
  - optional injectable RNG, defaulting to `Math.random`
  - once-per-second proximity checks among visible NPCs
  - 2.5m pair threshold, 8-12 second eligibility, and 25% chance
  - bubble lifetime updates and teardown
  - scene discovery through the already-parented NPC objects, avoiding changes to `scene.ts`
- Added `tests/unit/bubbles.test.ts` with 9 tests, including the requested 20-second simulation.

## Verification

- `pnpm typecheck`: PASS
- `pnpm test tests/unit/bubbles.test.ts`: PASS, 1 file and 9 tests
- `pnpm test`: PASS, 15 files and 129 tests
- The full suite emits the pre-existing `localStorage is not defined` diagnostic from `reducer.test.ts`, but the test and suite pass.

## Scope audit

- Existing file modified: `src/engine/npc-controller.ts` only.
- New implementation/test/report files added as requested.
- Pre-existing changes in `src/engine/scene.ts`, screenshot files, `src/engine/npc-mesh.ts`, and other brief files were not modified by this task.
- No dependencies added.
- No commit created.

## Integration note

`BubbleHandle.clear()` is implemented for dialogue-open suppression. Wiring that call to the dialogue UI would require modifying another existing file, which this brief explicitly prohibited, so that follow-up integration is intentionally not included here.

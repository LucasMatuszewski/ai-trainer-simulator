# C-64 Wave 2 Report

## Result

Implemented the modern reception interior, entrance treatment, and corporate garden from the Wave 2 brief and `c64-design-ideas.md`.

## What was built

- A charcoal and warm-stone reception desk at `(3.4, 0, 13.5)`, including the raised visitor ledge, monitor, keyboard, phone, paper stack, mug, flower vase, and complimentary-dongle bowl.
- A 5m living wall using four `THREE.InstancedMesh` foliage batches, deterministic stagger and tilt, a dark backing, frame, trough, soil, and 12 flower accents.
- A warm LED channel, Basic-material core, halo, desk pool, and three downlights. The room layout supplies the real PointLight rather than creating one per fixture.
- A navy reception sofa with two cushions, arms, four legs, and two accent pillows.
- A reception coffee table based on the existing glass/chrome table, with two magazines and a `SIGN THE SLA` visitor binder.
- Five flower planters: one sofa-end planter, two inside entrance planters, and two outside scenery planters.
- A framed, slightly open glass double-door set with chrome handles, kick plates, transom glass, and a DevPowers transom plaque.
- A multi-part Xerox printer next to the desk, including scanner, lid, output slot, control panel, lit display, and paper.
- A non-walkable corporate garden outside the west glass: two-tone grass, four overlapping low hills, a literal row of seven trees, and six understory bushes.
- Collision AABBs for the desk, sofa, coffee table, floor planters, and Xerox. The center aisle `x=[-1.5, 1.5]` stays free; the doors and outdoor scenery remain visual-only.

## Design-document adaptations

- Kept the existing reception floor and shell colors unchanged because the Wave 2 ownership boundary explicitly limited `world-layout.ts` edits to the reception `furniture` and `lightPositions` arrays. The detailed furniture palette still follows the art direction.
- Used a geometry plaque for the DevPowers transom mark instead of a canvas-text label. This avoids adding a new runtime canvas dependency to the door factory while preserving the branded transom read.
- Did not build the optional blinking incident sign. It was an optional witty detail and would overlap the Xerox area's visual hierarchy; the dongle bowl, SLA binder, and magazine pair supply the requested comedy density.
- Outside planters are spawned directly by `scene.ts`, because room furniture is intended for room-bound solid placements. They render beyond `WORLD_BOUNDS` and deliberately receive no collision AABBs.
- Exported the existing `makeTree` helper from `garden.ts` so the reception garden reuses the established tree language rather than forking it.

## Tests changed

- `tests/unit/furniture-library.test.ts`: added structural tests for every new factory: reception desk, plant wall, desk lighting, sofa, coffee table, planter, glass doors, Xerox, and reception garden.
- `tests/unit/world-layout.test.ts`: replaced the Wave 1 assertion that the reception must be empty with Wave 2 placement, lighting, and clear-aisle assertions.

## Verification

- `./node_modules/.bin/tsc --noEmit`: pass.
- `./node_modules/.bin/vitest run`: pass, 54 files and 508 tests.
- `git diff --check`: pass.
- No dev server, build, Playwright, commit, staging, or push was performed, as required.

## Brief concerns

- The brief's top-level work list does not explicitly number the Xerox printer, but the C-64 plan and Wave 2 work breakdown include it. I implemented it because omitting it would leave the reception visually and functionally incomplete for Renata's later copy-run behavior.
- The design note proposes an east-wall accent and lighter floor, while the file-ownership rule forbids changing those room fields. I followed the narrower ownership rule to avoid overwriting Wave 1 shell decisions.

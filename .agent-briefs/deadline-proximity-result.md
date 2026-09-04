# Deadline robot proximity patch — implementation handoff

Owned files changed: `src/engine/agent-companion.ts`, `tests/unit/agent-companion.test.ts`. No helper file was needed. No commits or pushes. No edits to docs, main.ts, tools.ts, version.ts, browser or dev server.

## Public API for parent integration

- Added `companion.awaitMoveTo(targetName: string, timeoutMs = 15_000): Promise<{ arrived: boolean; reason?: string }>`. Starts the same named move as `moveTo`, waits until settled and facing the NPC, and stops movement on timeout. Suitable for the bounded NPC bubble exchange: await it and check `arrived` before speaking. Unknown/unreachable targets, disappeared NPCs, retarget exhaustion, departure and superseding movement return failure.
- Existing `walkToPoint(point, timeoutMs = 15_000)` retains its signature and result. It approaches to 3 m, including backing away if too close or exactly overlapping. Timeout stops movement and reports failure. Parent must check `arrived` before opening human dialogue.
- `lookAround().companion` now includes `walking` and `movingTo`.
- Exported `MAX_PERSONA_LENGTH = 500`; name and speech caps remain unchanged (120).

## Behavior

NPC approaches stop at a collision-safe 1.75 m ring point and face the current NPC position. The bounded candidate search tries 16 angles, nearest side first, rejects out-of-bounds/furniture spots, and uses the existing path planner against body-radius-expanded obstacles. This is a variable-distance equivalent of `approachSpotFor`; its fixed 2.5 m distance and depenetration cannot guarantee the requested NPC spacing. Room navigation remains on its original path code.

While approaching, NPC position is checked every 0.5 seconds; movements of at least 0.5 m trigger a replan, with a maximum of 20 replans. Settling rechecks the actual 1.5–2 m spacing, replans if necessary, and faces the NPC. This does not create indefinite following after arrival or change the scheduled NPC separation system.

Speech now passes the stable internal position vector to the bubble layer so the bubble follows walking; `getPosition()` still returns a defensive clone. Persona whitespace is normalized separately and capped at 500 characters.

## Verification

- Initial focused regression run: 11 expected failures, 18 passing tests.
- Added bounded-wait coverage before implementation: 6 expected failures for the absent API.
- Focused final run: 35/35 tests passing.
- Mutation check: temporarily restored the original production file while retaining new tests; 17 tests failed, 18 passed. Restored implementation; 35/35 passed again.
- `pnpm typecheck`: exit 0.
- `pnpm test`: 66 files, 664 tests passed (exit 0). Existing localStorage/canvas and pnpm-config warnings appeared; no failing tests.
- `git diff --check`: clean.

The shared checkout contains concurrent changes from other agents; they were neither edited nor reverted. Browser appearance/framing and live bubble projection remain the parent's visual QA responsibility, as required by the brief.

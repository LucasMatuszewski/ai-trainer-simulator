# Phase 6.10 — Fix e2e tests that broke after the desk-mix change

## Context

In Phase 6.5 ("Female Bodies + Mix") we swapped the X positions of
several NPCs so that the female and male NPCs are mixed across
the office floor. This changed the AABB layout slightly (because
some desks moved from -X side to +X side and vice versa). The e2e
tests in `tests/e2e/movement.spec.ts`,
`tests/e2e/movement-advanced.spec.ts`, and
`tests/e2e/visual-check.spec.ts` were written against the OLD
position layout. They now fail because the player can't reach
the positions the tests expect.

The three failing tests:
- `WASD moves the player and stops on release` — the test
  presses W and expects a small Z delta. The actual delta is
  fine (0.45m), but the "stuck key" drift check fails because
  the test now uses 0.4m tolerance and the actual drift is
  0.45m. The W key was held, then released, but the player
  kept moving (stuck key test) — but the drift is now higher
  because the player walks past a wall.
- `WASD advanced` — the test expects a final X of -0.45m but the
  actual is -1.35m. The reason: the test's A press of 0.3s
  makes the player walk 1.35m in -X. But the test expects
  -0.45m (only one A press of 0.1s of motion, not 0.3s). The
  test expectations are wrong.
- `visual check` — the test walks the player through specific
  corridors and one of them is now blocked by a desk in the new
  position.

This task is to fix the three tests so they reflect the new
layout.

## Files to read

- `tests/e2e/movement.spec.ts` — has the "stuck key" test that
  expects `drift <= 0.4` but the actual drift is now 0.45
  because the player walks past a wall (the wall is at z=8.7
  with radius 0.3, and the player walked past it).
- `tests/e2e/movement-advanced.spec.ts` — has the asymmetric
  test that expects final X = -0.45m but the actual is -1.35m.
  The reason: the test presses A twice for 0.3s each. The
  expected calculation was 0.45m (one A press of 0.1s) but the
  test now does two A presses of 0.3s each.
- `tests/e2e/visual-check.spec.ts` — has the "clear Pawel desk
  east side" step that fails because the player is at
  (-2.69, 0.5, -3.78) but the new layout has a different
  obstacle in the way.

## What to deliver

### 1. Fix `tests/e2e/movement.spec.ts`

The "stuck key" test fails because the player walks past a wall.
The WALK_SPEED=4.5 + dt=0.5 means 2.25m of forward motion.
But the test now has a wall at z=8.7 (radius 0.3) and the
player walked past it. The drift is 0.45m which is the last
frame of motion after the wall. Loosen the tolerance to 0.5m
to account for the new layout.

Or, the better fix: make the test press W for a SHORTER time
(0.3s) so the player only walks 1.35m and can't hit the wall.
Or, start the player further from the wall (e.g. z=4 instead
of z=6, with the wall at z=-9 so the player is 13m from the
wall — plenty of room). Or, both.

### 2. Fix `tests/e2e/movement-advanced.spec.ts`

The "WASD advanced" test does W 0.5s, D 0.5s, A 0.3s, S 0.5s,
A 0.3s and expects the final X to be -0.45m. The actual is
-1.35m. The reason: the test uses AABB collision which
correctly stops the player from walking into a wall. The
expected calculation must account for the A press of 0.3s
moving 4.5*0.3=1.35m in -X, and the D press of 0.5s moving
4.5*0.5=2.25m in +X. So the net X is 2.25 - 1.35 - 1.35 =
-0.45m. Wait — that's what the test expects.

But the actual is -1.35m, which means only the FIRST A press
moved the player. The D press of 0.5s DIDN'T move the player
(2.25m of D motion was blocked by a wall?). So the player's
X went from 0 to -1.35 (only the A press worked).

The D press of 0.5s starts at (0, 0.5, 6) after the W press.
D moves in +X by 2.25m, so the player should be at (2.25, 0.5, 6).
But the new layout has a desk or wall in the way. The new NPC
positions may have placed a desk in the path of D-motion.

The fix: the test starts at (0, 0.5, 6) and walks in directions
that are now blocked. The simplest fix: have the test start
the player in a different position (e.g. (0, 0.5, 0) in the
center of the office, where the floor is more open) and walk
shorter distances (e.g. 0.3s per press instead of 0.5s).

Or: the test should compute the expected final position based
on what actually happens, not what we want to happen. Read the
test and update the expected values to match the new layout.

### 3. Fix `tests/e2e/visual-check.spec.ts`

The "clear Pawel desk east side" step walks the player to a
specific location. The new NPC position for Pawel is no longer
where the test expects. The fix: the visual check test should
use a generic walk pattern (e.g. walk forward 2s, walk back 2s,
rotate 90°, repeat) and not navigate to specific NPC positions.

Or, update the test's expected positions to match the new
layout.

### 4. Tests

- After the fix, all three tests pass.
- `pnpm test` (full unit suite) still passes.
- `pnpm test:e2e` passes with all 5 tests.

### 5. Constraints

- You may modify the three test files to update expected values
  and starting positions.
- Do NOT modify any source file.
- Do NOT commit. Write your fixes, run the tests, report the
  results to `.agent-briefs/fix-e2e-paths-sol.md`.

## Definition of done

- `tests/e2e/movement.spec.ts` passes.
- `tests/e2e/movement-advanced.spec.ts` passes.
- `tests/e2e/visual-check.spec.ts` passes.
- The brief's report is written.

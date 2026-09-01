# C-57 toilet relocation re-QA

## Verdict: FAIL

Issue 2 is fixed: `roomAt(-16, 14.5)` and `roomAt(-14, 11.5)` now return `"meeting"`, and the old-toilet regression is covered.

Issue 3 remains blocking. The NPC mesh faces +Z at yaw `0`; therefore an NPC at stall position z=2.8 must face +Z toward the stall door at z=3.78, and an NPC at basin position z=6.0 must face +Z toward the basin at z=6.7. Both currently use `Math.PI`, which faces -Z and points away from their fixtures. The updated stall comment is internally contradictory. The schedule tests still do not assert fixture-facing yaw.

Issue 1 is accepted as the documented product decision that east of the menu sign means "right" in the intended 2D layout.

Focused chatter, NPC schedule, furniture-library tests and `pnpm typecheck` pass.

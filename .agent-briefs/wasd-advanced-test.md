# URGENT: write a PROPER advanced WASD test for the real game

## Why this exists (corrected)

The first advanced test I wrote was wrong. Lucas called it out:
- Each key pressed for 1s with WALK_SPEED=3 m/s → W moves -3, D moves +3, S moves +3, A moves -3 → net 0. So even if NOTHING worked, the test would pass.
- The test must use DIFFERENT durations so the expected final position is a calculated non-zero value.

Lucas's exact spec: "press W for 3s, then D for 1s, then S for 2s, then A for 5s, and we should expect specific position".

With WALK_SPEED=3 m/s (no sprint, no obstacles in the way — the player starts at (0, 0.5, 6) inside the office, so all 3-4-5s presses should be able to run fully):

- W for 3s → -9 in Z. Position: (0, 0.5, -3)
- D for 1s → +3 in X. Position: (3, 0.5, -3)
- S for 2s → +6 in Z. Position: (3, 0.5, 3)
- A for 5s → -15 in X. Position: (-12, 0.5, 3)

But X=-12 is OUTSIDE the office bounds (which are -9 to 9). The player will collide with the west wall before reaching -12. So either:
- Pick durations where the player can actually reach the target, OR
- Allow for collision (assert the final position is between the unobstructed target and the wall).

Let me pick safe durations that:
1. Have different durations (so the test is not trivially passing on no-movement).
2. Sum to a non-zero final position in both X and Z.
3. Stay within the office bounds so we can assert the EXACT final position.

With office bounds -9..9 in both X and Z, and starting at (0, 0.5, 6):

Option A (Z-only test, X-balanced to assert 0):
- W for 1s → (0, 0.5, 3)
- S for 1s → (0, 0.5, 6)  (back to start)
- This doesn't work because S balances W.

Option B (asymmetric):
- W for 1s → (0, 0.5, 3)   (-3 in Z)
- D for 2s → (6, 0.5, 3)    (+6 in X)
- S for 1s → (6, 0.5, 6)    (+3 in Z, back to z=6)
- A for 2s → (0, 0.5, 6)    (-6 in X, back to start)
- Final: (0, 0.5, 6). Still trivially zero.

The issue: the office is small (20x20) and symmetric, so any symmetric key press ends at start.

Better option — use SPRINT (hold Shift) to vary speed:
- W for 1s at sprint (1.6x) → -4.8 in Z
- D for 1s at sprint → +4.8 in X  
- S for 1s at walk (1.0x) → +3 in Z
- A for 1s at walk → -3 in X
- Final: (1.8, 0.5, 4.2). Non-zero!

But the user said "W for 3s, D for 1s, S for 2s, A for 5s" — they want a clean asymmetric test. Let me design one:

If WALK_SPEED=3 m/s with no obstacles in path (start at (0, 0.5, 6) inside the office):
- W for 0.5s → -1.5 in Z
- D for 1.0s → +3 in X (4.5 in X, but limited to 9 - 0.3 = 8.7 wall)
- S for 0.5s → +1.5 in Z
- A for 1.0s → -3 in X (back to 1.5 X)
- Final: (1.5, 0.5, 6) — but A 1.0s brings us back to 1.5 X. Yes!

Or simpler — different durations and assert the exact position:

Start: (0, 0.5, 6). WALK_SPEED=3 m/s. Office bounds -9..9 in X and Z.

- W for 1.0s → moves -3 in Z. Position: (0, 0.5, 3)
- D for 0.5s → moves +1.5 in X. Position: (1.5, 0.5, 3)
- S for 1.0s → moves +3 in Z. Position: (1.5, 0.5, 6)
- A for 0.5s → moves -1.5 in X. Position: (0, 0.5, 6)

That's also zero. Hmm.

Let me think. The fundamental issue: the office is 20x20 and the player starts at the south end. To have a non-zero final position, the player needs to not be symmetric.

What if the player has to navigate around obstacles (desks, walls)? The test then becomes "asserts the final position is approximately the calculated target modulo collision". But that's fragile.

Better: do the asymmetric test in just one axis, and assert non-zero final position in that axis. For example:

- W for 1.0s → -3 in Z. Position: (0, 0.5, 3)
- S for 0.3s → +0.9 in Z. Position: (0, 0.5, 3.9)
- W for 0.2s → -0.6 in Z. Position: (0, 0.5, 3.3)

Final: (0, 0.5, 3.3). Non-zero. If a key was stuck, the final position would be different.

Or use the user's exact spec (W 3s, D 1s, S 2s, A 5s) and assert the final position matches the collision-constrained target:

- W for 3.0s → -9 in Z (if no wall). But player starts at z=6, so 3s of W moves to z=6-9=-3. Within bounds. Position: (0, 0.5, -3)
- D for 1.0s → +3 in X. Position: (3, 0.5, -3)
- S for 2.0s → +6 in Z. Position: (3, 0.5, 3)
- A for 5.0s → -15 in X. Player at x=3, would try to go to x=-12. Wall at x=-9. Player stops at x=-9+0.3=-8.7. Final: (-8.7, 0.5, 3).

But the test is fragile if the office bounds or the player's radius changes. Let me pick smaller durations that don't hit the walls:

- W for 0.5s → -1.5 in Z. Position: (0, 0.5, 4.5)
- D for 1.0s → +3 in X. Position: (3, 0.5, 4.5)
- S for 0.5s → +1.5 in Z. Position: (3, 0.5, 6) (back to start Z)
- A for 1.0s → -3 in X. Position: (0, 0.5, 6) (back to start)

Final: (0, 0.5, 6). Trivially zero. Symmetric.

Let me pick truly asymmetric:

- W for 0.5s → -1.5 in Z. Position: (0, 0.5, 4.5)
- D for 1.0s → +3 in X. Position: (3, 0.5, 4.5)
- A for 0.5s → -1.5 in X. Position: (1.5, 0.5, 4.5)
- S for 0.5s → +1.5 in Z. Position: (1.5, 0.5, 6)

Final: (1.5, 0.5, 6). Non-zero. If keys were stuck, would be different.

But the office has obstacles (desks at various positions). The player might collide with a desk. Let me check the layout.

From `src/content/npcs.ts`:
- desk-bartek: minX=-5, maxX=-3, minZ=-3.5, maxZ=-2.5 (after Sol's change for the desk depth)
- desk-klaudia: minX=3, maxX=5, minZ=-3.5, maxZ=-2.5
- desk-marek: minX=-5, maxX=-3, minZ=2.5, maxZ=3.5
- desk-zosia: minX=3, maxX=5, minZ=2.5, maxZ=3.5
- desk-pawel: minX=-1, maxX=1, minZ=-6.5, maxZ=-5.5
- desk-ania: minX=6, maxX=8, minZ=-0.5, maxZ=0.5
- desk-janusz: minX=-8, maxX=-6, minZ=-0.5, maxZ=0.5
- desk-maciek: minX=-4, maxX=-2, minZ=-7.5, maxZ=-6.5
- desk-przemek: minX=2, maxX=4, minZ=-7.5, maxZ=-6.5
- meeting-table: minX=-2, maxX=2, minZ=-1, maxZ=1
- server-rack, coffee-machine, vending, etc.

So the path from (0, 0.5, 6) pressing W (heading -Z) would encounter the meeting-table at z=-1 first. The player would stop at z=-1+0.3=-0.7 (radius 0.3). So 0.5s of W (1.5m) would actually be capped at z=-0.7 by the table. Then D moves X=+1.5, but the path is blocked by desk-zosia at x=3..5, z=2.5..3.5. So the player can only go to x=2.7 (3 - 0.3 = 2.7). Then A -1.5 X = x=1.2. Then S +1.5 Z = back to where the W was capped.

This is getting complex. The "intended" position without collision is (1.5, 0.5, 6). The "actual" position will be different due to collision. The test would have to allow a large tolerance.

**Simplest robust test**: pick durations so small that no obstacles are hit, but asymmetric so the final position is non-zero.

What if I make the player run AGAINST a wall? Then I know the final position.

OR: what if I just check the final position is SOMEWHERE in the office (not back at start)? That catches the "all keys are stuck" case but not individual key stuckness.

OR — best idea — do the user's spec (W 3s, D 1s, S 2s, A 5s) and check the final position is within a small tolerance of the collision-constrained target. Since I have the OBSTACLE list, I can compute the exact target. If a key is stuck, the position will be very different.

But: if S is stuck (the user's main complaint), then after S 2s the position would be (3, 0.5, 6+6=12) which is OUT OF BOUNDS (the wall at z=9 caps it at 8.7). The final position would be (3, 0.5, 8.7) instead of the calculated (-8.7, 0.5, 3). That's a clear difference.

So the test SHOULD detect the bug. Let me design the test:

Expected trajectory (no stuck keys, no walls in the way):
- start: (0, 0.5, 6)
- W 3s: -9 in Z → (0, 0.5, -3) [Z=-3 is between desk-pawel (z=-6.5..-5.5) and meeting-table (z=-1..1), so no collision in this segment if heading -Z from z=6]
  - Wait, at z=-1..1 is the meeting-table. So from z=6 going -Z, the player would hit the meeting-table at z=-1+0.3=-0.7 (front edge) and stop. So W 3s caps at (0, 0.5, -0.7). 
  - Hmm. The W 3s would collide with the meeting table. The actual final would be (0, 0.5, -0.7).
  - Unless the player goes around the table. The meeting table is -2..2 in X, -1..1 in Z. The player could go left (around the table) or right. But our collision algorithm just clamps axis-by-axis without pathfinding. So the player stops dead at the table.
  - This means W 3s only moves 6.3m (from z=6 to z=-0.7), not 9m.

This makes the test fragile. The collision logic doesn't allow for pathfinding, so a long press just stops at the obstacle.

OK, let me design the test differently. Use SHORT durations that the player can complete within the office, but with different durations so the final position is non-zero.

WALK_SPEED=3 m/s. Office bounds -9..9 in X and Z, plus obstacles.

From (0, 0.5, 6):
- W 0.5s → -1.5 in Z, position (0, 0.5, 4.5). [The desk-przemek is at z=-7.5..-6.5 so not in the way. Desk-pawel is at z=-6.5..-5.5 so not in the way. No collision. OK.]
- D 0.5s → +1.5 in X, position (1.5, 0.5, 4.5). [No obstacles at z=4.5.]
- A 0.3s → -0.9 in X, position (0.6, 0.5, 4.5). [No obstacles.]
- S 0.5s → +1.5 in Z, position (0.6, 0.5, 6). [No obstacles.]

Final: (0.6, 0.5, 6). Non-zero. If a key is stuck, the final position will be very different.

But I need to check: is there any obstacle in the player's path that I missed?

The desks are at z=-7.5..-6.5, -6.5..-5.5, -3.5..-2.5, -0.5..0.5, 2.5..3.5, -7.5..-6.5 (Przemek at x=2..4). The player at (0, 0.5, 6) pressing W heads to z=4.5. No obstacles in the z=6..4.5 range for the player's path. Wait, what about the meeting table at z=-1..1? That's far away.

What about the path from (0, 0.5, 4.5) pressing D heads to (1.5, 0.5, 4.5)? The player is at z=4.5, x=0 going to x=1.5. Desk-zosia is at x=3..5, z=2.5..3.5. So desk-zosia is at z=3.5 max, but the player is at z=4.5. So the player passes ABOVE the desk (the desk is at z=2.5..3.5, the player is at z=4.5 going east, not south, so no collision). OK.

What about pressing A from (1.5, 0.5, 4.5) heading to (0.6, 0.5, 4.5)? The player is at x=1.5..0.6, z=4.5. Desk-marek is at x=-5..-3, z=2.5..3.5. So desk-marek is at z=3.5 max, but the player is at z=4.5. So the player passes ABOVE the desk. OK.

What about pressing S from (0.6, 0.5, 4.5) heading to (0.6, 0.5, 6)? The player is at x=0.6, z=4.5..6. Desk-przemek is at x=2..4, z=-7.5..-6.5. So the player is at x=0.6, not x=2..4. No collision.

But wait — the player at x=0.6, z=5 going south to z=6: is there any obstacle? Desk-przemek at x=2..4 — no. Meeting table at x=-2..2, z=-1..1 — no. So the player is clear.

OK the path is clear. Final position should be exactly (0.6, 0.5, 6) with no obstacles hit. Tolerance ±0.05 (one-frame residual).

This is the test. With different durations (0.5, 0.5, 0.3, 0.5) and an asymmetric final position (0.6, 0.5, 6), the test catches both:
1. Keys not responding at all (final position stays at 0, 0.5, 6).
2. Keys stuck (final position drifts further than 0.05 from the target).
3. The user's reported bug specifically: S is stuck → after the S 0.5s, position would continue increasing in Z, overshooting 6.

Let me also use Sprint (Shift+W) to make the test more discriminating, but actually keep it simple: just WALK_SPEED, no Shift.

Actually wait — I want to also test the user's specific complaint: "A works once then blocks, then S blocks permanently". The test should detect this. Let me think:

If A is stuck after one use: the first A press (0.3s) works, but the second A press (in a different sequence) might not work. But my sequence only has one A press.

Let me make the sequence: W D A S. So A is in the middle, S is at the end. If A is stuck after first use, the second A press would not work — but I don't have a second A press in my sequence.

Better: W A D S. Or W A A D S. Multiple A presses test "A works twice".

Even better: W D A A D S. Test that A works twice in a row (which is what the user reported as broken).

Let me go with:
- W 0.5s → (0, 0.5, 4.5)
- D 0.5s → (1.5, 0.5, 4.5)
- A 0.3s → (0.6, 0.5, 4.5)
- S 0.5s → (0.6, 0.5, 6)

Hmm, still just one A press. Let me redesign:

The user said A works once, then is stuck. To catch that, do two A presses. After the first A press, the second A press should also work. If the first A press gets stuck (key remains in the Set), the player would keep moving left after the release, and the second A press would compound.

Test sequence: W D A S A
- W 0.5s → (0, 0.5, 4.5)
- D 0.5s → (1.5, 0.5, 4.5)
- A 0.3s → (0.6, 0.5, 4.5)
- S 0.5s → (0.6, 0.5, 6)
- A 0.3s → (-0.3, 0.5, 6)

Final: (-0.3, 0.5, 6). Non-zero. If A was stuck after the first press, the player would have continued moving left during the gap, and the second A press would compound, ending at a very different position.

OK final design:

```ts
test("WASD advanced: full sequence with multiple A presses, asymmetric final position", async ({ page }) => {
  // ... setup ...
  const start = await page.evaluate(() => window.__aitrainer!.getPlayer());

  const WALK_SPEED_MS = 3.0;  // m/s, the real walk speed
  
  // Expected trajectory (no stuck keys, no collision):
  // start: (0, 0.5, 6)
  // W 0.5s → -1.5 in Z → (0, 0.5, 4.5)
  // D 0.5s → +1.5 in X → (1.5, 0.5, 4.5)
  // A 0.3s → -0.9 in X → (0.6, 0.5, 4.5)
  // S 0.5s → +1.5 in Z → (0.6, 0.5, 6)
  // A 0.3s → -0.9 in X → (-0.3, 0.5, 6)
  // Final: (-0.3, 0.5, 6)
  
  // Tolerance: ±0.10 (1 frame at 3m/s is 0.05m, 2 frames is 0.10m)
  const TOL = 0.10;
  
  const expected = { x: -0.3, y: 0.5, z: 6 };
  const final = await ...;
  
  expect(Math.abs(final.x - expected.x)).toBeLessThanOrEqual(TOL);
  expect(Math.abs(final.y - expected.y)).toBeLessThanOrEqual(TOL);
  expect(Math.abs(final.z - expected.z)).toBeLessThanOrEqual(TOL);
});
```

This is the test. Per release, ALSO check the drift (stuck-key detector):
- After W release, wait 300ms, check position didn't change by more than 0.05.
- After D release, same.
- After A release, same.
- After S release, same.
- After second A release, same.

If any release shows > 0.05 drift in 300ms, a key is stuck.

This test is comprehensive. It will catch the user's bug because:
- If A is stuck after the first press, the second A press would compound and the final position would be way off.
- If S is stuck, the final Z would be >> 6.
- If W is stuck, the player would be at much lower Z than 4.5 after the first W.

This is the test. Implement it, run it, and report the result.

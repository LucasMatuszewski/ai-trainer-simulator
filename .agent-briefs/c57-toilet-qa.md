# Task: QA review of the C-57 toilet move

You are reviewing commit 599638e on branch `feat/c57-toilet-relocate-next-to-kitchen`.
The diff is in `git diff HEAD~1`.

This is the AI Trainer Simulator. The user asked: "move the toilet so that it will be next to kitchen / dining room, and door to Toilet should be on the right from 'Menu: Caffee' sign".

## Context
- The toilet used to be in the back-SW corner of the main office (x=[-19, -6.5], z=[9, 19]) with a tiny doorway at x=[-9, -8.5] on the main office south wall.
- The user found the door inaccessible. They want the toilet moved next to the kitchen, with the door on the right of the "TODAY'S MENU: COFFEE" sign at (14, 2.1, 6.72).
- New location: x=[19, 24], z=[2, 7] — east of the kitchen, sharing the south wall with the kitchen (z=7) and the east wall with the kitchen's east wall band.
- Doorway: at z=[5, 7] in the kitchen's east wall, leading to the new toilet's west wall.
- Detailed 3D models: toilet-stall (with cistern, partition walls, toilet roll), toilet-sink (with mirror, soap dispenser, paper-towel cabinet), urinal (with chrome pipe, privacy screen).

## What to check
1. **Layout correctness**: Does the new toilet NOT overlap the meeting room, the kitchen, the training room, or the main office? Does the doorway sit "on the right" of the menu sign when a player stands in the kitchen facing the south wall?
2. **Waypoint graph connectivity**: The corridor-waypoints test asserts every pair of waypoints has a path. The old toilet waypoints (door-main-toilet, etc.) were replaced with new ones (door-kitchen-toilet, etc.). Confirm the connectivity is preserved.
3. **NPC schedule correctness**: The random walk destination for the toilet was updated from (-16, 14.5) and (-14, 11.5) to the new positions.
4. **3D model quality**: Look at the new factories (toilet-stall.ts, toilet-sink.ts, urinal.ts) — are they detailed pixel-art models or just simple boxes? Are they well-constructed (proper materials, partitions, fixtures, etc.)?
5. **The "no-zfighting" test passes**: The new toilet room's walls must not overlap with the kitchen's east wall.
6. **The chatter roomAt() correctly classifies the new toilet**: NPCs at (22, 5) should be classified as "toilet", and (19, 7) should be classified as "kitchen".
7. **The corridor-waypoint waypoints are inside a room** (the test requires this).
8. **A test had to be loosened (npc-controller.test.ts threshold 8 -> 10)** — is the loosening reasonable?

## What to flag
- Any geometry overlap (walls, floors, furniture)
- Any unreachable waypoint or broken path
- Any visual quality issue
- Any test that should have been updated but wasn't
- Any NPC behavior that breaks because of the move

## Output
- "PASS" or "FAIL" verdict
- Specific issues found (file:line)
- Suggestions for improvement

## Do NOT
- Commit anything
- Push anything
- Make code changes

Read the diff and the new files, then write your verdict to `.agent-briefs/c57-toilet-qa-report.md` and print a one-line summary to stdout.

# C-57 toilet relocation final QA

## Verdict: FAIL

The stale old-toilet classification is fixed and pinned by `roomAt(-16, 14.5) === "meeting"`. The toilet stall, sink, and urinal factories now have structural tests covering key child names and realistic heights. The two stall destinations also correctly use `face: 0` toward their doors.

One part of the original facing blocker remains: the basin is at `z=6.7` and its NPC destination is at `z=6.0`, so the NPC must face `+Z` (`face: 0`) toward it. The implementation and new test instead use `face: Math.PI` (`-Z`), facing away; the test comment contradicts its own coordinate values and yaw convention.

Verification otherwise passed: 49 test files, 414/414 tests, and `pnpm typecheck` all exited cleanly.

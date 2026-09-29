# Wave 1 phase QA verdict (current HEAD `b84dbd4`)

Checks: `pnpm typecheck` passed; `pnpm test` passed (964/964); `pnpm test:e2e --project=chromium tests/e2e/ws9a-robot-collision.spec.ts` passed (2/2, 2.9 min); `git diff --check d85da34..HEAD` passed. `src/version.ts` is `v2026.09.28-09`. Temporary focused Vitest probes were removed after execution. The occupied join point avoided the nearby furniture box, and the ordinary 0.1 s centre-crossing probe held correctly.

## Findings

- **BLOCKER: a blocked final frame reports successful arrival without moving.** `src/engine/agent-companion.ts:941-1005,1017-1039` handles a person blocker but then processes `result.finished` from the rejected `advanceAlongPath` result. Probe: robot at `(0,0)` starts `awaitMoveTo` for room centre `(0,1)`; the NPC moves onto `(0,1)` before `update(1)`. The robot remains at `(0,0)`, stops walking, and the promise resolves `{ arrived: true }`. This gives an agent a false success and can trigger an interaction from the wrong location.
- **MAJOR: the new centre-crossing guard traps an outward escape at high refresh rates.** `src/engine/agent-companion.ts:918-938` applies its `nextDist <= curDist + 0.01` tolerance even when the robot is moving strictly away from a nearby NPC. At 200 Hz (`dt = 0.005`, 0.006 m steps), a robot at `(0,0)` headed east to `(1,0)` with an NPC at `(-0.05,0)` cannot take any outward step: the segment's closest point is the starting position, 0.05 m from the NPC, so every frame is held. After dodge/replan escalation, the move ends `{ arrived: false, reason: "destination is occupied" }` at `(0,0)`. This reverses the escape guarantee the strict-deeper rule was meant to preserve.

The farthest-candidate NPC nudge at `src/engine/npc-controller.ts:710-740` now selects by maximum robot distance as intended. Its exhaustion branch still knowingly chooses a `blockedAt` candidate, so it cannot guarantee furniture clearance when all 64 samples are blocked; I did not establish a normal world state that reaches this branch.

PHASE-VERDICT: FAIL — blocked final frames report false arrival, and high-refresh outward escapes can be trapped.

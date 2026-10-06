You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `.agent-briefs/ws9a-result.md`.

# Task: WS9a — Companion robot must not walk through furniture; NPCs must avoid it (Wave 1, Lucas's bug)

Branch `feat/jev-npc-decision-steering` (base commit `d85da34`). Beads context: `sacs-xtma.16` — Lucas (2026-09-28): "the AI Agent / Robot model can go through some objects, and NPC do not avoid him, just go through it as it would be an air."

Read first: `docs/ADR/0009-jev-npc-decision-steering.md` §3 item 8 and D-53 (action lifecycle — you only need the collision part), then the actual code: the WebMCP companion robot movement (`src/webmcp/` — find the robot/companion movement and pathing code; likely `companion-*.ts` and wherever `agent_talk_to_npc`/approach walks are implemented), `src/engine/collision.ts` (AABB helpers), `src/engine/npc-controller.ts` (path planning + the WS0 seam — pass 4 avoidance/escape around lines 1500–1700, and `getNpcObstacles`), and how NPC obstacles are built (`getNpcObstacles` / furniture AABBs).

## The two defects

1. **Robot pathing ignores furniture**: the companion robot walks straight through desks/props. Its movement must consult the same obstacle set as NPCs: plan its route with the existing waypoint/A* machinery (or a filtered obstacle set appropriate for the robot's size), so it routes AROUND furniture like every other walking actor. If the robot deliberately crosses open floor where NPCs walk, that is fine — it must not intersect furniture AABBs.
2. **NPCs ignore the robot**: a walking NPC passes through the robot. Include the robot's current AABB as a dynamic obstacle in the NPC avoidance/pass-4 replan logic, so an NPC whose path crosses the robot replans/escapes exactly like it does for other blocked NPCs. Do not let the robot freeze NPCs: the existing escape/replan behavior with its usual retry limits is the expected outcome.

## Constraints

- Allowed files: `src/webmcp/*` (robot/companion movement files only — you may add a new helper file), `src/engine/collision.ts` (only if a helper is genuinely missing), `src/engine/npc-controller.ts` (ONLY the avoidance/obstacle assembly needed to register the robot as a dynamic obstacle — the WS0 seam block around lines 399–530 and all DecisionHooks code must remain untouched), and new test files. NOTHING else (`main.ts`, `types.ts`, `scene.ts`, `hud.ts` are off-limits — submit proposed patches in the report if e.g. the robot's mesh root must expose an AABB getter from scene wiring).
- The fix must be testable headlessly: expose whatever pure function you add (e.g. `planRobotPath(start, goal, obstacles)` or `isBlockedByRobot(position)`) from a module that does not require a WebGL context.
- Behavior guard: all 771 existing tests must stay green; NPC schedule/path behavior for normal NPCs must be unchanged when the robot is absent (the obstacle list without a robot must be identical to today's).

## Tests (TDD red→green; mutation-check before reporting done)

- `tests/unit/engine/robot-collision.test.ts`: (a) a straight robot path from A to B that would cross a known desk AABB gets routed around it (planned waypoints never intersect the AABB — assert segment-vs-AABB for each segment); (b) an open path with no obstacles between two points stays direct; (c) NPC avoidance: with a robot obstacle present at position P, an NPC path crossing P replans (path no longer intersects the robot's inflated AABB); (d) with the robot absent, the NPC path is identical to the pre-change planner output for the same seed (regression guard).
- If the robot movement lives behind a class/factory, test the pure planner it delegates to.

## Definition of done

Report at `.agent-briefs/ws9a-result.md`: where the robot movement actually lives (file:line), what you changed, red→green evidence, vitest summary lines, proposed shared-file patches if any, deviations. Disagreement invited: if the robot's movement cannot consult the waypoint graph cleanly, propose and implement the smallest correct alternative (e.g. segment-vs-AABB slide) and explain the trade-off.

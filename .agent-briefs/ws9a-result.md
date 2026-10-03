# WS9a result - robot and NPC collision

## Status

**Partial by the brief's file boundary.** NPC avoidance is connected to the live companion body. Robot route and step collision helpers are implemented and tested headlessly. The companion's runtime is in `src/engine/agent-companion.ts`, which is outside the allowed files, so the robot still uses its old movement until the orchestrator applies the patches below. No commit or push was made.

## Root cause and location

- `src/engine/agent-companion.ts:432` plans NPC approaches with `planNpcPath` and inflated `deps.obstacles`; `:534` plans room moves with `planNpcPath` and **uninflated** `deps.obstacles`; `:578` checks only the end of a raw step with `applyWithCollision`, so a step may cross a narrow obstacle and end beyond it.
- `src/main.ts:469` supplies the companion `OBSTACLES + WORLD_COLLISION_WALLS`, omitting `ROOM_FURNITURE_AABBS` included by the NPC set `getNpcObstacles()`.
- `src/engine/npc-controller.ts` built its blocker snapshot and replan boxes only from the fixed NPC cast. The robot is a separate scene object and never entered either path.

## Changed within scope

- `src/engine/collision.ts`: `withRobotObstacle` appends a temporary companion AABB and returns the exact original list when the robot is absent.
- `src/engine/npc-controller.ts`: obtains the live `agent-companion-body` position from its existing scene root; includes it in stop, escape and replan checks; prevents the next NPC movement step from entering the robot's footprint. The WS0 `DecisionHooks` block is untouched.
- `src/webmcp/robot-collision.ts`: `planRobotPath` uses the existing A* graph with furniture inflated by the robot radius and rejects fallback paths crossing a box. `traceRobotStep` splits short manual motion into collision-tested axis legs so a clear endpoint cannot tunnel through an obstacle.
- `tests/unit/engine/robot-collision.test.ts`: seven tests, including desk detour, direct open route, real reception route with the full NPC obstacle set, step tunneling, NPC replan, and no-robot regression.

## Red, green, mutation evidence

- Initial focused run: failed because the new robot collision module was absent.
- Once the helper existed, the live NPC test failed as expected: its sampled path intersected the robot AABB. After the controller change: 5/5 focused tests passed.
- The step-tunneling test failed before implementation (`traceRobotStep is not a function`); after implementation: 7/7 passed.
- Mutation checks: ignoring the robot obstacle failed the planner test; changing the scene lookup name failed the NPC avoidance test; removing furniture from `planRobotPath` failed the desk test; bypassing `traceRobotStep` failed the narrow desk test. Each mutation was restored.
- Final verification: `pnpm typecheck` exit 0; `pnpm test` exit 0, **85 files and 950 tests passed**; `git diff --check` exit 0. The suite printed existing `localStorage` and jsdom canvas warnings but no failures.

## Required shared-file patches for the orchestrator

### `src/main.ts` companion obstacle wiring only

Add `import { getNpcObstacles } from "./engine/npc-spawn-validator";` and replace the companion-specific line `const obstacles = [...OBSTACLES, ...WORLD_COLLISION_WALLS];` at approximately line 469 with `const obstacles = getNpcObstacles();`. Keep the other uses of `OBSTACLES` and `WORLD_COLLISION_WALLS` unchanged. `buildWaypointEdges` will then receive the same static furniture and wall AABBs as the NPC controller.

### `src/engine/agent-companion.ts` movement calls

Import `planRobotPath` and `traceRobotStep` from `../webmcp/robot-collision`; remove the now-unused `planNpcPath` and `applyWithCollision` imports.

1. In `planApproach`, replace `planNpcPath(position, destination, deps.waypoints, deps.edges, obstacles)` with `planRobotPath(position, destination, deps.waypoints, deps.edges, deps.obstacles, COMPANION_RADIUS + 0.001)`. Keep the locally inflated `obstacles` for testing candidate destinations. Do **not** pass that inflated array into `planRobotPath`, which inflates it itself.
2. In `moveTo`, replace the room branch's `planNpcPath(position, destination, deps.waypoints, deps.edges, deps.obstacles)` with `planRobotPath(position, destination, deps.waypoints, deps.edges, deps.obstacles, COMPANION_RADIUS + 0.001)`.
3. In `step`, replace the single `applyWithCollision(...)` call with:

   ```ts
   const stepPoints = traceRobotStep(
     before,
     Math.sin(heading) * distance,
     Math.cos(heading) * distance,
     COMPANION_RADIUS,
     deps.bounds,
     deps.obstacles,
   );
   const after = stepPoints.at(-1)!;
   const moved = stepPoints.slice(1).reduce((sum, end, index) =>
     sum + Math.hypot(end.x - stepPoints[index]!.x, end.z - stepPoints[index]!.z), 0);
   ```

   In the `moved > 0.01` branch, replace the two-point assignment with `beginPath(stepPoints.map((p) => new THREE.Vector3(p.x, position.y, p.z)), null);`. The existing `movedMetres`, `blocked`, `position`, and `walkSeconds` return values can then use the traced `moved` and `after`. Update the two-point-path comment. This keeps the step animated at the existing 1.2 m/s and prevents path interpolation from cutting through furniture.

Add a headless runtime test for `moveTo` and `step` after applying these patches: a companion starting at (0,0) must neither cross a desk on a named room move nor cross a narrow AABB on a 3 m step. The existing helper tests do not prove that the runtime calls the helpers.

## Limits and deviations

- No live robot movement files were edited because the movement factory lives outside the allowed `src/webmcp/*` scope. The user-visible robot furniture bug remains until the shared-file patches are applied and verified.
- The NPC controller discovers the robot from the scene object already named `agent-companion-body`, so it needs no `main.ts` getter patch. Its no-robot obstacle list and planner input remain identical to the previous behavior.
- A visual screenshot and phase push belong to the orchestrator after integration; this delegate did not start a preview server, commit, or push.

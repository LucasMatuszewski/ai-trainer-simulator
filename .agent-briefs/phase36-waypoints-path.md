# Phase 3.6 (part 1): corridor waypoint graph + A* path planner

You are implementing part 1 of PRD C-45 (docs/PRD.md, section 13, entry C-45; spec sub-section 11.6) for a three.js office-simulator game. Work ONLY on the files listed under "Files you create". Do NOT touch any other file. Do NOT commit, do NOT push, do NOT run git write commands.

## Context

- Repo: ~/DEV/Projects/ai-trainer-simulator (TypeScript, vitest, three.js). Node is at /usr/bin/node; run tests with `./node_modules/.bin/vitest run <file>` and typecheck with `./node_modules/.bin/tsc --noEmit` (nvm/pnpm may not be on PATH in your shell).
- Today NPCs lerp linearly between schedule positions (src/engine/npc-controller.ts, `interpPosition`) and walk through walls. This phase replaces that with an A* path-follower over a hand-authored waypoint graph.
- READ these files first to understand geometry and types:
  - `src/content/world-layout.ts` (rooms, walls, kitchen at x in [9.78, 19], z in [-7, 7]; doorway `main-to-kitchen` is the gap at x ~ 9.6, z in [-1.25, 1.25]; also `kitchen-to-training`, CEO office, toilet, meeting room definitions)
  - `src/content/npcs.ts` (`OBSTACLES` desk AABBs, `NPCS` roster with desk positions, `OFFICE_BOUNDS`)
  - `src/engine/npc-spawn-validator.ts` (`ROOM_FURNITURE_AABBS`, `getNpcObstacles()`, circle-vs-AABB and depenetration logic, `AABB` re-exported from `src/engine/collision.ts`)
  - `src/engine/collision.ts` (the `AABB` type)
  - `src/content/npc-schedule.ts` (existing schedule types)

## Files you create

### 1. `src/content/corridor-waypoints.ts` (pure data + one pure helper)

Export:

```ts
export interface Waypoint {
  id: string;
  position: { x: number; y: number; z: number };
}
export const CORRIDOR_WAYPOINTS: readonly Waypoint[];
export function buildWaypointEdges(
  waypoints: readonly Waypoint[],
  obstacles: readonly AABB[],
  maxEdgeLength: number,
): readonly [string, string][];
```

- IMPORTANT dependency rule: `src/content/**` must NOT import from `src/engine/**`. Import `type { AABB }` via a local structural type declaration (`interface AabbLike { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number }`) or re-declare the shape; do not import from engine. You MAY import from `./npcs` (content-to-content is fine).
- `CORRIDOR_WAYPOINTS`: 25-35 hand-authored waypoints covering: the `main-to-kitchen` doorway gap center (~x 9.6, z 0), the `kitchen-to-training` doorway, every other room doorway, corridor midpoints of the main office, the 5 kitchen micro-stops (REQUIRED, corrected standing spots - the originally sketched z = -6.2 row sits inside the C-36 counter/fridge AABBs, which span z in [-6.95, -5.85]; these are clear standable positions ~0.5 m south of each appliance): fridge (10.6, 0, -5.5), coffee machine (13.0, 0, -5.3), microwave (15.2, 0, -5.3), sink (17.5, 0, -5.3), kitchen table (14.0, 0, 1.2); the meeting-table center, toilet stall + toilet sink spots, training-room row spots, the CEO office doorway, and one front-of-chair spot per desk in `NPCS` (read the desk positions from npcs.ts and place each waypoint ~0.7 m in front of the chair side of the desk, clear of the desk AABB). If any anchor coordinate still collides with an AABB in the composed obstacle list, nudge it by up to 0.3 m toward clear space (the containment test is the invariant that must hold; the anchors are approximate).
- Every waypoint must be inside a room and NOT inside any obstacle AABB (test this).
- `buildWaypointEdges` is PURE: connect every waypoint pair whose distance <= maxEdgeLength AND whose connecting segment does not cross any obstacle AABB (2D segment-vs-AABB on the XZ plane; a segment touching an AABB edge counts as blocked). Deterministic output order (sort pairs by id pair) so tests are stable. Export a sensible default `export const DEFAULT_MAX_EDGE_LENGTH = 10;`.

### 2. `src/engine/npc-path.ts` (pure planner)

```ts
import * as THREE from "three";
export function planNpcPath(
  from: THREE.Vector3,
  to: THREE.Vector3,
  waypoints: readonly Waypoint[],
  edges: readonly [string, string][],
  obstacles: readonly AABB[],
): THREE.Vector3[] | null
```

- DIRECT-PATH-FIRST: if the straight segment from->to crosses no obstacle AABB, return `[from.clone(), to.clone()]` immediately (do NOT route through waypoints when the target is in line of sight, even if a graph route exists).
- Otherwise A* over the waypoint graph: binary-heap open set, Euclidean heuristic on XZ, cost = segment length. Start node = nearest reachable waypoint to `from` (the segment from->waypoint must be clear), goal = nearest reachable waypoint to `to`. Return the full point sequence INCLUDING `from` and `to` as the first and last points.
- If no graph route exists, fall back to a direct two-point path plus depenetration of the endpoint: push `to` out of any overlapping AABB along the minimum-translation vector (same approach as npc-spawn-validator).
- Return `null` only when no walk is possible at all (e.g. target fully surrounded). The caller keeps the NPC where it is in that case.
- Reuse `AABB` from `./collision`. Keep it pure: no globals, no three.js scene access — `THREE.Vector3` only as a value type.

### 3. `tests/unit/npc-path.test.ts` + `tests/unit/corridor-waypoints.test.ts` (WRITE THE TESTS FIRST, watch them fail, then implement)

Tests required (per the plan):

npc-path.test.ts (use small synthetic waypoint/obstacle fixtures, plus the REAL graph for the connectivity test):
- direct clear path returns exactly the 2-point path, even when a graph route also exists (direct-path-first);
- blocked direct path routes through a waypoint (multi-segment result, segments consecutive, no segment crosses an AABB);
- no path exists (target enclosed by obstacles) returns null;
- endpoint depenetration: a `to` inside an AABB (unreachable-by-graph scenario) comes back outside all AABBs;
- A* tie-breaking: when two routes have equal cost, the deterministic order wins (assert stable output for identical inputs);
- ALL-PAIRS connectivity on the real graph: build edges from `CORRIDOR_WAYPOINTS` + obstacles composed as `[...OBSTACLES, ...ROOM_FURNITURE_AABBS, ...WORLD_COLLISION_WALLS]` (import ROOM_FURNITURE_AABBS from engine/npc-spawn-validator, WORLD_COLLISION_WALLS from wherever it is exported - find it), then for EVERY ordered pair of waypoints `planNpcPath` must return a non-null path whose segments cross no AABB. If your initial waypoint/edge set fails this, FIX THE WAYPOINTS (add doorway/corridor nodes) until it passes.

corridor-waypoints.test.ts:
- every waypoint is inside the office bounds and not inside any obstacle AABB (use the same composed obstacle list);
- every built edge's segment crosses no AABB and its length <= maxEdgeLength;
- the 5 kitchen stops are present at the corrected anchor coordinates (within epsilon 0.6, to allow the permitted nudge);
- `buildWaypointEdges` is deterministic (two calls give identical arrays).

## Definition of done

- The two source files and two test files exist; `./node_modules/.bin/vitest run tests/unit/npc-path.test.ts tests/unit/corridor-waypoints.test.ts` is GREEN; `./node_modules/.bin/tsc --noEmit` exits 0.
- `git status --short` shows ONLY your four new files (untracked). Nothing else modified.
- No commits, no pushes.

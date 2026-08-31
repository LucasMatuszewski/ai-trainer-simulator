# Phase 3.6 (part 3b): controller integration - path-following, kitchen sequences, lunch, avoidance, barking

You are implementing the integration part of PRD C-45 (docs/PRD.md section 13 entry C-45; spec sub-section 11.6). This is the largest single piece of Phase 3.6. Do NOT commit, push, or run git write commands.

## Prerequisites (already landed - READ these first and verify the real signatures)

- `src/content/corridor-waypoints.ts` - `CORRIDOR_WAYPOINTS`, `buildWaypointEdges(waypoints, obstacles, maxEdgeLength)`, `DEFAULT_MAX_EDGE_LENGTH`
- `src/engine/npc-path.ts` - `planNpcPath(from, to, waypoints, edges, obstacles): Vector3[] | null` (direct-path-first A*)
- `src/engine/npc-walk-cycle.ts` - `updateWalkCycle(state, dt, speed)`, amplitudes and `RADIANS_PER_METRE`
- `src/content/npc-schedule.ts` - `KITCHEN_MICRO_STOPS`, `KITCHEN_STOP_DWELL`, `pickKitchenSequence(npcId, rng)`, `SOCIAL_LUNCHERS`, `LUNCH_OUTSIDERS`, `isLunchWindow`, `LunchContext`, `LUNCH_STAGGER_OFFSET(npcId, day, rng)`, `NpcState` now includes `"dwelling"`
- `src/content/npcs.ts` - every `NPC` now has `walkSpeed` (burek 1.6, CEO/manager 1.0, default 1.2)
- `src/content/lunch-dialogues.ts` (`LUNCH_DIALOGUES_HUMAN`), `src/content/dog-dialogues.ts` (`BUREK_LINES`)
- `src/engine/npc-controller.ts` (current 2 s lerp you are replacing), `src/game/events.ts` (`rollRandomNpcDestinations` / `runPeriodEvent` / `registerNpcController`), `src/main.ts` (`window.__aitrainer` debug hooks, the wrapper at ~line 222), `src/engine/scene.ts` line ~301 (createNpcController call)
- Verify signatures by reading the landed files; they were built to the specs above. If something differs, adapt to the LANDED code.

## Files you touch

1. `src/engine/npc-controller.ts` - the rewrite (keep the exported `NpcController` interface shape: `update`, `destroy`, `setOverride`; ADD `getNpcIds(): readonly NpcId[]` to it - `src/game/events.ts` already expects it via `registerNpcController`).
2. `src/engine/npc-avoidance.ts` - NEW pure module.
3. `src/engine/bubbles.ts` - add `resolveBubblePool` (see below). Do NOT remove or rename any existing export.
4. `src/game/events.ts` - pass a `LunchContext` into `pickRandomDestination` (period + real elapsed seconds into the period if the caller knows it, else 0).
5. `src/main.ts` - only if needed to wire period elapsed / getNpcIds; keep `window.__aitrainer` fully working (the e2e tests and Playwright scripts depend on `getPlayer`, `inspectNpcs`, and friends - do not remove or rename any hook).
6. Tests: rewrite `tests/unit/npc-controller.test.ts` for the new behaviour; NEW `tests/unit/npc-avoidance.test.ts`; extend `tests/unit/bubbles.test.ts`.

## The rewrite, requirement by requirement

### R1 - Path-following replaces the 2 s lerp

- Build the graph ONCE at controller creation: `const obstacles = getNpcObstacles(); const edges = buildWaypointEdges(CORRIDOR_WAYPOINTS, obstacles, DEFAULT_MAX_EDGE_LENGTH);`
- Per-NPC runtime state (a Map): `path: THREE.Vector3[] | null`, `segmentIndex`, `distanceInSegment`, `walkCycle: WalkCycleState`, plus whatever the dwell/depart logic needs.
- When a walk starts (period change, override set, next kitchen stop, return to desk), call `planNpcPath(currentPosition, target, CORRIDOR_WAYPOINTS, edges, obstacles)`. If it returns `null`, keep the NPC where it is (skip the walk entirely - keep the previous schedule state).
- Export a PURE helper `advanceAlongPath(position, path, segmentIndex, distanceInSegment, walkSpeed, dt)` returning `{ position, segmentIndex, distanceInSegment, finished, face }` where `face` is the yaw of the current segment direction (atan2 of the segment's x/z, matching how the rest of the codebase maps yaw). Unit-test THIS function; the per-frame loop just drives it.
- Remove `NPC_INTERP_DURATION`, the `interpPosition`-driven walk and the always-on bob/sway at old lines ~164-167. Keep `interpPosition`/`interpolate` exported ONLY if other modules still import them (grep first; if nothing does, delete them and their tests).

### R2 - Walk cycle application

- While walking: `walkCycle = updateWalkCycle(walkCycle, dt, npc.walkSpeed)` and apply: `leg-left.rotation.x = legSwing`, `leg-right.rotation.x = -legSwing`, `arm-left.rotation.x = armSwing`, `arm-right.rotation.x = -armSwing` (match the actual child names in `src/engine/npc-mesh.ts` - read it; if a child is missing, skip it silently). Body bob: `object.position.y = baseY + bobAmount` where baseY is the entry's y (do not accumulate). Do NOT add rotation.z sway.
- While NOT walking (at-desk, dwelling, gone-home): the existing `updateIdle` path keeps running (change the current gating from `npcState === "walking"` skip to: idle runs whenever the NPC is not actively walking). Reset/leave the walk-cycle state alone (it resumes by distance).
- Burek: his mesh has no leg/arm children - the walk cycle no-ops for missing parts (this falls out of the "skip missing children" rule). His tail wag stays as-is.

### R3 - Kitchen micro-sequence + dwelling

- When an NPC's target/override has `state === "kitchen"`, generate `pickKitchenSequence(npcId, rng)` and walk the stops in order: walk -> `dwelling` for `KITCHEN_STOP_DWELL[id]` seconds (write `userData.npcState = "dwelling"`) -> walk to the next stop. After the last stop, walk back to the period's scheduled entry (usually the desk) and set its state.
- The first leg starts from the NPC's CURRENT position (not the previous period's schedule position).

### R4 - Interruption

- A period change cancels any in-flight path and kitchen sequence immediately and re-plans from the CURRENT position to the new period's target. An NPC never continues a sequence from a dead period. Overrides clear on period change (existing behaviour - keep it).

### R5 - Lunch staggering + general departure jitter

- When the afternoon period starts (lunch window): each NPC that received a kitchen target waits `LUNCH_STAGGER_OFFSET(npcId, day, rng)` seconds (0-2 s) before starting to walk. The controller needs the day number - extend `createNpcController`'s signature with a `getDay: () => number` (or take `GameState` accessors; scene.ts line ~301 and main.ts are the call sites to update).
- Non-lunch walks get a small 0-0.3 s random departure delay so period changes do not move everyone on the exact same frame.

### R6 - Local avoidance (NEW `src/engine/npc-avoidance.ts`)

```ts
export interface AvoidanceAgent { id: string; position: { x: number; z: number }; velocity: { x: number; z: number }; priority: number; }
export function computeAvoidancePush(self: AvoidanceAgent, others: readonly AvoidanceAgent[], radius = 1.5, pushMeters = 0.3): { x: number; z: number };
```
- Consider the 2 nearest agents within `radius`; push only applies when BOTH are moving (velocity length > 0.05). Push direction: perpendicular to `self.velocity`, pointing away from the other agent; magnitude `pushMeters * (1 - distance / radius)` (closer = stronger). Sum over the (up to 2) contributors. Priority: the LOWER-priority agent yields (no push on the higher-priority one); priority order player > Burek > CEO > named NPCs > rest - encode as a `priority` number the caller computes (higher number = yields more; document it).
- The controller applies the push to walking NPCs only, then CLAMPS the result: run the pushed position through the same depenetration idea used at endpoints (a pushed position may not end up inside any obstacle AABB - if it would, zero that push component).
- Tests (tests/unit/npc-avoidance.test.ts): 2 agents 0.5 m apart same direction -> perpendicular push of expected magnitude; 2 m apart -> zero; one stationary -> zero; 3 in a line -> middle gets the strongest push; higher-priority agent receives nothing from a lower-priority one.

### R7 - Bubble pools + lunch context (`src/engine/bubbles.ts`)

```ts
export function resolveBubblePool(speakerIsBurek: boolean, bothInKitchen: boolean): ReadonlyArray<string>;
```
- speakerIsBurek -> `BUREK_LINES` (always, any context); else bothInKitchen -> `LUNCH_DIALOGUES_HUMAN`; else `INTER_NPC_LINES`. Import the two content pools here (engine -> content is the correct direction). Extend tests/unit/bubbles.test.ts with a table test for the three cases.
- In the controller's existing 1 s bubble block: pick the speaker - if exactly one of the pair is Burek, Burek is the speaker; otherwise keep `first` as today. `bothInKitchen` = both pair members have `userData.npcState === "kitchen"` OR (`"dwelling"` - a dwellers' chat is a lunch chat). Use `pickLine(resolveBubblePool(...), rng)`.
- Keep the face-each-other cooperation beat exactly as it is.

### R8 - Burek ambient bark trigger

- A controller-level timer, independent of pairing: every `150 + rng() * 150` seconds (re-drawn after each bark), if Burek is visible and not gone-home, show `pickLine(BUREK_LINES, rng)` at his position via the bubble system. Never within 60 s of any previous Burek bubble (track his last bubble time; if the pair-trigger showed Burek as speaker recently, delay the ambient bark). Over a simulated 1200 s day this yields ~4-8 barks. Export the pure interval-draw helper (`nextBarkDelay(rng)`) and unit-test it (bounds + determinism).

### R9 - events.ts wiring

- `rollRandomNpcDestinations` passes a `LunchContext` to `pickRandomDestination`: `{ period, periodElapsed: <seconds into the period if the caller knows it, else 0> }`. Find where the period timer lives (grep main.ts / game/state.ts for the countdown) and pass the real value if cheaply available; otherwise 0 (the roll runs at period start, so 0 is correct for the lunch fire).
- Do not change when rolls happen.

## Hard constraints

- TypeScript strict; no `any` unless unavoidable; match surrounding code style (they use `readonly`, explicit types, no semicolon-free style changes).
- `window.__aitrainer` hooks must keep working; `inspectNpcs` output shape must not change.
- All existing tests that do not test the lerp must keep passing unmodified.
- Run the FULL suite + typecheck; fix everything you broke (you WILL break npc-controller.test.ts - rewrite it for path-following, including: no movement when speed applied to a completed path; interruption re-plans from current position; kitchen sequence visits stops in order with dwells; stagger delays departure; a stationary morning==afternoon NPC never bobs - the regression Lucas reported).

## Definition of done

- `./node_modules/.bin/vitest run` FULL suite GREEN; `./node_modules/.bin/tsc --noEmit` exits 0;
- `git status --short` shows changes ONLY in the files listed above;
- No commits, no pushes.

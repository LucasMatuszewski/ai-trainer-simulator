# Phase 3.6 (part 3a): kitchen micro-sequence, lunch window, walk speeds (content layer)

You are implementing the content-layer part of PRD C-45 (docs/PRD.md section 13 entry C-45; spec sub-section 11.6). Work ONLY on the files listed under "Files you touch". Do NOT commit, push, or run git write commands.

## Context

- Repo: ~/DEV/Projects/ai-trainer-simulator (TypeScript, vitest). Node at /usr/bin/node; run tests with `./node_modules/.bin/vitest run <file>`; typecheck with `./node_modules/.bin/tsc --noEmit`.
- Two other agents are concurrently creating NEW files (`src/content/corridor-waypoints.ts`, `src/engine/npc-path.ts`, `src/engine/npc-walk-cycle.ts` + their tests). Do NOT create, edit, or read-import those; your scope is disjoint.
- READ first: `src/content/npc-schedule.ts` (whole file), `src/content/npcs.ts` (NPC roster, `NPC` type location), `src/game/state.ts` (`GameState.timeOfDay`, `day`), `tests/unit/npc-schedule.test.ts` (style to extend).
- Period pacing is 5/10/5 minutes (morning 300 s, afternoon 600 s, evening 300 s) - see `src/game/pacing.ts` if it exports period lengths.

## Files you touch

1. `src/content/npcs.ts` (and the file that declares the `NPC` interface if it is elsewhere): add a required `walkSpeed: number` field to every NPC. Defaults: 1.2 m/s; `burek` 1.6; the CEO and the manager (`zosia`) 1.0; two or three fitting "nerdy" NPCs 1.4 (your choice which, keep it tasteful). Every value positive and finite.
2. `src/content/npc-schedule.ts`: everything below.
3. `tests/unit/npc-schedule.test.ts` (extend) and NEW `tests/unit/npc-kitchen-sequence.test.ts`.

## What to add to `src/content/npc-schedule.ts`

```ts
export type KitchenStopId = "fridge" | "coffee" | "microwave" | "sink" | "table";
export const KITCHEN_MICRO_STOPS: Readonly<Record<KitchenStopId, ScheduleEntry>>;  // exact coords below
export const KITCHEN_STOP_DWELL: Readonly<Record<KitchenStopId, number>>;          // seconds
export const KITCHEN_STOP_JITTER_RADIUS = 0.4; // metres
export interface KitchenSequenceStop { id: KitchenStopId; entry: ScheduleEntry; dwellSeconds: number; }
export function pickKitchenSequence(npcId: NpcId, rng: () => number): KitchenSequenceStop[];
export const SOCIAL_LUNCHERS: ReadonlySet<NpcId>;
export const LUNCH_OUTSIDERS: ReadonlySet<NpcId>;   // maciek (CTO), marek (DevOps)
export const LUNCH_WINDOW_SECONDS = 120;
export interface LunchContext { period: GameState["timeOfDay"]; periodElapsed: number; }
export function isLunchWindow(ctx: LunchContext): boolean;  // afternoon && periodElapsed < 120
export function LUNCH_STAGGER_OFFSET(npcId: NpcId, day: number, rng: () => number): number; // [0, 2] s
```

- `KITCHEN_MICRO_STOPS` exact coordinates (PRD-mandated, state "kitchen", `face: -Math.PI / 2`): fridge (10.6, 0, -6.2), coffee (12, 0, -6.2), microwave (14.5, 0, -6.2), sink (17.5, 0, -6.2), table (14, 0, 2.5).
- `KITCHEN_STOP_DWELL`: fridge 5, coffee 8, microwave 4, sink 6, table 10 (seconds).
- `pickKitchenSequence`: Fisher-Yates a full shuffle of the 5 stop ids with `rng`, keep 3 or 4 (random count), and jitter each stop position by a random offset inside a disc of radius `KITCHEN_STOP_JITTER_RADIUS` (draw angle + radius from `rng`; use sqrt for uniform disc). Deterministic for a given rng stream. The jitter is what stops two dwellers at the same stop from standing inside each other.
- `SOCIAL_LUNCHERS` = every human NPC id + `burek`. `LUNCH_OUTSIDERS` = `maciek`, `marek` (they are NOT social lunchers).
- Extend `pickRandomDestination(npcId, rng, day)` with a 4th optional parameter `ctx?: LunchContext`. New behaviour (keeping the existing 90%-stay / colleague-visit logic for the default case):
  - **Burek**: during the lunch window he ALWAYS goes to the kitchen (return a kitchen entry, probability 1 - "Where is food there is Burek!"). Outside the window he keeps his wandering behaviour but kitchen-biased (60% of his walks go to the kitchen).
  - **Social lunchers (humans)**: during the lunch window, 60% chance to go to the kitchen (i.e. only 40% stay); outside it, unchanged.
  - **LUNCH_OUTSIDERS**: during the window, 30% chance to skip lunch entirely (stay), otherwise they go to the kitchen (70%); outside the window, 30% of their walks go to the kitchen (eat alone).
  - A "go to the kitchen" result = the FIRST stop of `pickKitchenSequence(npcId, rng)` mapped to a `ScheduleEntry` (jittered position, state "kitchen"). Do not return an un-jittered base coordinate.
  - Keep the function pure and the existing call sites compiling (the 4th param is optional).
- `LUNCH_STAGGER_OFFSET(npcId, day, rng)`: returns `rng() * 2` (the per-NPC, per-day 0-2 s lunch fire delay; determinism comes from the caller's seeded stream).

## Tests (write failing tests FIRST, then implement)

`tests/unit/npc-kitchen-sequence.test.ts`:
- every sequence has 3-4 stops, all unique ids;
- deterministic for a given rng seed (two identical seeded streams give identical sequences);
- two different npcIds with the same seed get different jitter offsets (same stop id, different positions);
- every jittered stop is within KITCHEN_STOP_JITTER_RADIUS of its base coordinate;
- dwell seconds match KITCHEN_STOP_DWELL for the chosen ids.

Extend `tests/unit/npc-schedule.test.ts`:
- every NPC has a positive finite walkSpeed (import NPCS);
- Burek walkSpeed 1.6; SOCIAL_LUNCHERS contains all human ids + burek; LUNCH_OUTSIDERS is exactly {maciek, marek};
- `isLunchWindow` true only for afternoon with periodElapsed < 120 (test boundaries 0, 119.9, 120, morning/evening);
- `pickRandomDestination` with a lunch ctx: for `burek` it ALWAYS returns a kitchen entry (state "kitchen", position near a base stop); for a social-luncher human with a forced-low rng stream the kitchen chance dominates (assert with a mocked rng returning 0.5 -> kitchen, since threshold is 0.6);
- without ctx the old behaviour is unchanged (a fixed seed returns null for a 90%-stay NPC);
- `LUNCH_STAGGER_OFFSET` returns values in [0, 2].

## Definition of done

- `./node_modules/.bin/vitest run` (FULL suite) GREEN - including all pre-existing tests;
- `./node_modules/.bin/tsc --noEmit` exits 0;
- `git status --short` shows changes ONLY in: src/content/npcs.ts, the NPC-interface file if separate, src/content/npc-schedule.ts, tests/unit/npc-schedule.test.ts, tests/unit/npc-kitchen-sequence.test.ts (new);
- No commits, no pushes.

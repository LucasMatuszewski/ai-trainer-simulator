# Phase 3.0 — NPC schedule (deterministic per-period positions and states)

## Context

We are building AI Trainer Simulator, a 3D pixel-art IT-training game.
The current code is at `src/`. The office has 13 NPCs (see `src/content/npcs.ts`).
Each NPC currently stands at a fixed position with no animation, no schedule,
no inter-NPC speech, no idle variations. This task creates the schedule
foundation that everything else in Phase 3 builds on.

Read `.claude/plans/glistening-napping-hinton.md` §"Phase 3 — NPC life and
inter-NPC dialogue" for the full Phase 3 spec. Read `docs/PRD.md` §13
C-08 (NPCs at desks, animations, variation) and C-15 (NPC life = schedule
+ per-day random seed + named events).

The plan: deterministic per-period schedule as the BACKBONE, with
small stochastic variation on top (delivered in a later task). The schedule
is a `Record<NpcId, Record<Period, ScheduleEntry>>` — exactly the shape
in the plan.

## What to deliver

### 1. New file: `src/content/npc-schedule.ts`

```ts
import type { NpcId } from "./npcs";

export type Period = "morning" | "afternoon" | "evening";

export type NpcState =
  | "at-desk"      // sitting at the desk, facing the monitor
  | "walking"      // moving between waypoints (filled in by npc-controller)
  | "break-room"   // in the kitchen (when the kitchen exists; for now,
                   //   treat as "standing" at the kitchen AABB)
  | "coffee"       // at the coffee machine
  | "meeting"      // in the meeting room (when it exists; for now,
                   //   treat as "standing" at the meeting-table AABB)
  | "lunch"        // away from the office
  | "gone-home"    // away from the office
  ;

export interface ScheduleEntry {
  position: { x: number; y: number; z: number };
  face: number;            // yaw in radians
  state: NpcState;
}

export const NPC_SCHEDULES: Record<NpcId, Record<Period, ScheduleEntry>>;
```

### 2. The schedule content

You must fill in the schedule for all 13 NPCs (bartek, klaudia, marek,
zosia, pawel, kasia, tomek, ania, janusz, burek, grazyna, maciek, przemek).

**Defaults (apply unless the character is "interesting"):**
- All NPCs at their desk in morning and afternoon.
- All NPCs gone-home in evening, EXCEPT those listed below as "interesting".

**Interesting characters with non-default schedules:**

1. **Bartek** (Senior Consultant, the player's first contact).
   The most stable person. Always at his desk all day. morning/afternoon
   at the desk; evening: still at the desk (he stays late, this is
   signaled to the player through dialogue).

2. **Maciek** (CTO).
   Morning: at his desk. Afternoon: gone-home (he has meetings
   off-site in the afternoon; this is signaled to the player through
   dialogue). Evening: gone-home.

3. **Janusz** (the Janitor).
   Morning: gone-home (he arrives late). Afternoon: at his desk
   (his "desk" is a small area near the back wall — for now, use
   the position (0, 0, -8) which is near the back wall, away from
   the other desks). Evening: at his desk.

4. **Burek** (the Office Dog).
   Burek does not sit at a desk — he roams. For now:
   Morning: at the dog bed (the "desk-burek" obstacle center: (-7, 0, 3)).
   Afternoon: at the coffee machine (coffe-machine center: (7.5, 0, -7.5)).
   Evening: at the dog bed.
   Face: 0 (look toward -Z).
   State: "at-desk" still (he has a bed and a coffee spot — they
   are his "desks"). A future task will animate him walking between
   them.

5. **Zosia** (The Manager).
   Morning: at her desk. Afternoon: at the meeting table (the
   "meeting-table" obstacle center: (0, 0, 0)). Evening: gone-home.
   This signals to the player that Zosia runs the afternoon
   standup.

6. **Pawel** (The Intern).
   Morning: at his desk. Afternoon: at the coffee machine (he's
   always getting coffee). Evening: gone-home.

7. **Grazyna** (The Accountant).
   Morning: at her desk. Afternoon: at her desk. Evening: gone-home.
   Grazyna is the most regular person — she works all day and never
   socializes.

**All other NPCs (klaudia, marek, kasia, tomek, ania, przemek):**
Default. Morning: at-desk. Afternoon: at-desk. Evening: gone-home.

### 3. Position data

The current NPC positions are in `src/content/npcs.ts` in the
`position: { x, y, z }` field. Use those positions as the "at-desk"
position. Each NPC's desk obstacle center is the place they "sit"
(see `src/content/npcs.ts` `OBSTACLES` for desk-bartek etc.; the
center is `(minX+maxX)/2, 0, (minZ+maxZ)/2`).

For the at-desk position, the NPC should sit slightly in front of
the desk (the chair is on the +Z side of the desk, since the monitor
is on the -Z side). Use:
- y = 0 (the NPC marker is on the floor; the chair is implied)
- x = desk center x
- z = desk center z + 0.6 (chair is 0.6m in front of the desk's +Z edge)

For the desk-zosia at-desk: same as above using desk-zosia's
center: (4, 0, 3). So at-desk = (4, 0, 3.6).

For desk-maciek at-desk: desk-maciek center is (-3, 0, -7). So
at-desk = (-3, 0, -6.4).

For desk-burek (the dog bed): the obstacle is (-8..-6, 2..4), center
(-7, 0, 3). At-desk = (-7, 0, 3.6). Face = π (look +X toward the
office). Wait — the plan said face 0. The plan is right — looking
toward -Z means looking into the office. Use face 0.

For coffe-machine (the "coffee" state): center (7.5, 0, -7.5).
Position: (7.5, 0, -7.5). Face = 0 (toward -Z).

For meeting-table (the "meeting" state): center (0, 0, 0). Position
(0, 0, 0). Face = 0.

For janusz's "afternoon desk" position: (0, 0, -8). Face = π/2
(face +X toward the office). This puts him near the back wall
facing the room, as a janitor would.

For "gone-home": position (0, 0, 0) is fine. State = "gone-home"
already signals "not in the office". A future task will move
"gone-home" NPCs off-screen (out of camera frustum).

### 4. Face direction (yaw)

`face` is yaw in radians, matching `controls.ts`'s convention where
yaw=0 means facing -Z. Convert from "compass" to radians as:
- Facing -Z (north, into the office): face = 0
- Facing +Z (south, toward the door): face = π
- Facing -X (west, left wall): face = π/2
- Facing +X (east, right wall): face = -π/2 (or 3π/2)

For at-desk: NPC faces the monitor (which is on the -Z side of the
desk). So face = 0 for all at-desk NPCs whose desk has the monitor
on -Z (all of them, given the current desk layout).

For coffee at the coffee machine: face = 0 (the machine is
facing -Z).

For meeting at the meeting table: face = 0 (looking at the
table from the south side).

For janusz: face = π/2 (facing the office from the back wall).

### 5. The NpcId type

`NpcId` is the union of all NPC id strings. It should be derived
from `NPCS` in `src/content/npcs.ts`. Check how the file currently
exports it and reuse the same import.

```ts
import type { NpcId } from "./npcs";
```

If `NpcId` is not exported from `npcs.ts`, add the export there —
do not redefine it in this file.

### 6. Example structure

```ts
import type { NpcId } from "./npcs";

export type Period = "morning" | "afternoon" | "evening";

export type NpcState =
  | "at-desk"
  | "walking"
  | "break-room"
  | "coffee"
  | "meeting"
  | "lunch"
  | "gone-home";

export interface ScheduleEntry {
  position: { x: number; y: number; z: number };
  face: number;
  state: NpcState;
}

export const NPC_SCHEDULES: Record<NpcId, Record<Period, ScheduleEntry>> = {
  bartek: {
    morning:   { position: { x: -4, y: 0, z: -1.4 }, face: 0, state: "at-desk" },
    afternoon: { position: { x: -4, y: 0, z: -1.4 }, face: 0, state: "at-desk" },
    evening:   { position: { x: -4, y: 0, z: -1.4 }, face: 0, state: "at-desk" },
  },
  // ... rest of the NPCs
};
```

### 7. Tests

Create `tests/unit/npc-schedule.test.ts`. Use plain vitest (no
jsdom). Cover:

- `getScheduleFor(npcId, period)` returns a non-null entry.
  - Implement `getScheduleFor` as a helper in the test file (a
    simple `(id, period) => NPC_SCHEDULES[id][period]`).
- The schedule covers all NPCs and all three periods.
- The schedule entries have valid `face` values (in [-2π, 2π]).
- The schedule positions are within the office bounds
  (`OFFICE_BOUNDS` in `src/content/npcs.ts`).
- Specific character checks:
  - `getScheduleFor("maciek", "afternoon").state === "gone-home"`
  - `getScheduleFor("janusz", "morning").state === "gone-home"`
  - `getScheduleFor("janusz", "afternoon").state === "at-desk"`
  - `getScheduleFor("zosia", "afternoon").state === "meeting"`
  - `getScheduleFor("pawel", "afternoon").state === "coffee"`
  - `getScheduleFor("burek", "afternoon").state === "coffee"`
  - `getScheduleFor("grazyna", "evening").state === "gone-home"`

### 8. The `walking` state

The `walking` state is included in the type for completeness, but no
entry in the initial schedule should use it — the deterministic
schedule has NPCs at their destination, and a future npc-controller
will interpolate between destinations (creating the "walking" state
during transitions).

## Constraints

- Do NOT modify `src/content/npcs.ts` (the NPC data) or any other
  existing file. Only ADD `src/content/npc-schedule.ts` and the test
  file.
- Do NOT introduce runtime behavior changes. This task is
  data + a pure helper function only. The runtime integration
  (using the schedule in `frame()`) is a SEPARATE task.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-3-npc-schedule-sol.md` and stop.

## Definition of done

- `src/content/npc-schedule.ts` exists with the full schedule for
  all 13 NPCs × 3 periods.
- `tests/unit/npc-schedule.test.ts` exists with at least 10 test
  cases covering: completeness, validity, and the specific
  character checks above.
- `pnpm test tests/unit/npc-schedule.test.ts` passes.
- `pnpm typecheck` passes.
- The brief's report is written.

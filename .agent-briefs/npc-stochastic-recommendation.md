# NPC Stochastic Layer — Recommendation Summary

**Source:** `.agent-briefs/npc-stochastic-report.md` (agy / Gemini, 2026-08-29)
**PRD cross-ref:** C-15 (NPC life: deterministic + per-day stochastic), D-22
**Plan cross-ref:** Phase 3 (NPC life and inter-NPC dialogue)

## The recommendation: Option D — Tiered Priority Schedule Stack

A 4-tier resolution pipeline that layers stochastic variation on top of a deterministic backbone, with quest hard-pins to keep the gameplay readable.

### The 4 tiers (highest priority first)

1. **Tier 1 — Quest Hard-Pins.** Active quest targets are immutably positioned where the story requires them. If the quest says "talk to Zosia in the meeting room at 10am," Zosia is there. Stochastic overrides cannot move her.
2. **Tier 2 — Daily Office Quirk.** 1 macro atmospheric modifier per day, drawn from a seeded deck (e.g. *Release Day Panic*, *AC Malfunction*, *Free Pizza in Kitchen*, *Quiet Heads-Down Sprint*). Shifts general location weights and ambient speech bubbles.
3. **Tier 3 — Bounded Micro-Events.** 2-3 specific NPC stochastic deviations per day (late arrival with custom apology, lingering evening gamer, hallway watercooler debate).
4. **Tier 4 — Base Routine.** Default desk/chair work poses with procedural idle animations.

### Budget

**2-4 micro-events per day** across the 3 in-game periods. Concrete allocation:

- **Morning:** 1-2 late arrivals (NPC spawns at doorway at T+30s instead of desk; apologizes on arrival)
- **Afternoon:** 1 away-from-desk quirk (Marek in server rack, Klaudia taking LinkedIn photos in kitchen, etc.)
- **Evening:** 1 overtime worker + 1-2 kitchen relaxers (Pawel + Bartek playing retro console)

### Seed formula

```
seed = murmur3("aitrainer:day:" + dayNumber + ":" + saveSlotId)
```

Same day = same stochastic decisions (regression-testable). Different save slots = different sequences.

### Conflict resolution pipeline

```ts
[ Evaluate NPC Schedule ]
         │
         ├── [ Is NPC Pinned by Quest? ] → YES → [ Tier 1: Return Quest Target ]
         │
         └── [ No Quest Pin ] → [ Evaluate Daily Quirk Deck ] → [ Apply Seeded Micro-Event ]
                              → [ Clamp Room Capacity (Max 3) ] → [ Tier 2/3: Return Override ]
                                                                              │
                              [ Tier 4: Fallback to Base ] ←─────────────────┘
```

### Why this wins

| Metric | Option A (calm) | Option B (themes) | Option C (weekly) | **Option D (tiered)** |
|---|---|---|---|---|
| Complexity (1-5) | 2 | 4.5 | 3 | **3** |
| Test cost (1-5) | 1 | 4 | 2.5 | **2** |
| Liveliness (1-5) | 2.5 | 4.5 | 3.5 | **4.5** |
| Narrative cohesion (1-5) | 4.5 | 3 | 3.5 | **5** |

### Reference games

- **Stardew Valley** — deterministic waypoints with conditional overrides (rain, season, heart level). Lesson: when an NPC is not at their desk, the player should understand *why* via visual props or roster status.
- **The Sims** — utility AI; too chaotic for 13 NPCs. Lesson: treat rooms (kitchen, TV, whiteboard) as attractor slots with bounded capacity.
- **Two Point Campus** — staff traits bias state transitions. Lesson: traits make stochasticity feel earned. Marek (DevOps) staying late = in-character. Pawel (intern) playing console = comedic.
- **Papers, Please** — strictly deterministic story beats with seeded random attributes. Lesson: anchor each day with a guaranteed narrative beat; let stochastic quirks serve as texture.
- **Dwarf Fortress** — unbounded simulation; impossible to author punchlines. Lesson: avoid unbounded state.
- **Disco Elysium** — static placement + extreme dynamism in dialogue. Lesson: liveliness comes from reactivity, not frantic wandering.

### Impact on the codebase

1. **New pure function** `resolveDailySchedule(day, period, flags, quests) -> ResolvedNpcSchedule` in `src/engine/npc-schedule-resolver.ts`. Easy to TDD.
2. **New content** `src/content/npc-quirks.ts` with 15 daily quirks and 30 micro-events (late arrivals, evening gamers, etc.).
3. **Quest data model** gains `requiredNpcs: [{ id, location, period }]` so quests can hard-pin NPCs to specific rooms.
4. **Dialogue trees** gain dynamic greeting injection: if `npcState.isLate`, Bartek opens with "Sorry I'm late, the tram caught fire on Jana Pawła II."
5. **Roster UI** gets a status badge per NPC: "Late (Arriving...)", "In Kitchen (Gaming)", etc.
6. **State store** stays clean: the schedule is a pure projection over `(day, period, flags, quests)`, not stored state. Only player-driven consequences dispatch actions.

### Test suite (`tests/unit/npc-schedule.test.ts`)

1. **Determinism:** `resolveDailySchedule(day=3, seed=123)` returns identical output across 1000 consecutive runs.
2. **Quest safety:** Inject a quest pinning Zosia to the meeting room; assert Zosia's position is invariant across 100 different daily random seeds.
3. **Room capacity:** No room resolves more NPCs than its slot count (kitchen ≤ 3, meeting room ≤ 6).
4. **Collision clamping:** No two resolved NPC positions are within 1.2m of each other.

### Open question for Lucas

The 4-tier stack is the recommended architecture, but the **content deck** (15 quirks, 30 micro-events) is the part that needs Lucas's voice. The agent drafted 4 sample quirks; the other 11 + 26 micro-events need to be written. Authoring is Phase 3 work; this report is just the architecture.

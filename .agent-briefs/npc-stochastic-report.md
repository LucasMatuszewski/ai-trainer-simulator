# NPC Stochastic Behavior & Schedule Architecture Report

**Document Status:** Research & Architectural Recommendation  
**Target Project:** `AI Trainer Simulator` (`/home/lucas/DEV/Projects/ai-trainer-simulator/`)  
**Scope:** NPC schedule systems, per-day stochasticity, liveliness balancing, and implementation design.  

---

## Executive Summary

The user vision (PRD C-15 / C-19 / C-22) demands an office simulation that feels vibrant, comedic, and unpredictable without degenerating into chaotic, untestable randomness. In a 13-NPC, 50x50 multi-room first-person game with 5–15 minute periods, pure randomness breaks player navigation and quest readability, while a static schedule quickly turns stale.

This report evaluates four architectural approaches, synthesizes lessons from key commercial simulators (*The Sims*, *Stardew Valley*, *Two Point Campus*, *Papers, Please*, *Dwarf Fortress*, *Disco Elysium*), and presents a concrete architectural blueprint: **The Tiered Priority Schedule Stack with Seeded Daily Quirks (Option D)**.

---

## 1. Evaluation of Stochastic Architectures

| Metric | Option A: Calm Backbone | Option B: Daily Theme Drivers | Option C: Rotating 7-Day Cycle | Option D: Tiered Priority Stack (Recommended) |
| :--- | :--- | :--- | :--- | :--- |
| **Architectural Complexity** | 2 / 5 | 4.5 / 5 | 3 / 5 | **3 / 5** |
| **Testing & Regression Cost** | 1 / 5 | 4 / 5 | 2.5 / 5 | **2 / 5** |
| **Perceived Liveliness** | 2.5 / 5 | 4.5 / 5 | 3.5 / 5 | **4.5 / 5** |
| **Narrative Cohesion** | 4.5 / 5 | 3 / 5 | 3.5 / 5 | **5 / 5** |

---

### Option A: Deterministic Backbone + Bounded Stochastic
* **Mechanics:** Each period has fixed desk/room targets. A daily PRNG seed triggers 1–2 minor variations (e.g., Marek is late; Tomek is in the kitchen in the evening).
* **Pros:** Highly predictable, trivial unit testing, zero risk of broken quest NPC locations.
* **Cons:** Player learns base coordinates within 2 in-game days; the office quickly feels like an animatronic set rather than a living workplace.
* **Failure Mode:** *Mechanical sterility.* The player ignores the simulation and treats NPCs as static dialogue vending machines.

---

### Option B: Thematic Daily Overhauls (Firedrill, All-Hands, Client Visit)
* **Mechanics:** Each day draws a heavy "theme" that dictates 5–8 global stochastic events, room reassignments, and mass NPC movements.
* **Pros:** High immediate novelty; every day feels dramatically distinct.
* **Cons:** Exponential content authoring burden, high risk of cognitive overload, difficult spatial routing in tight rooms, and extreme fragility when quests require specific NPCs at specific desks.
* **Failure Mode:** *Simulation circus & narrative derailment.* Player opens the game to complete a trainer quest but gets blocked because half the office is running a firedrill or locked in an all-hands meeting.

---

### Option C: Hybrid Rotating Weekly Calendar (7-Day Pool)
* **Mechanics:** Deterministic daily base + day-of-week archetype (Monday Standup, Wednesday Demo, Friday Social, etc.) with minor micro-events.
* **Pros:** Gives players a mental model to plan ahead; mimics real agile office cadences.
* **Cons:** In a 30-day narrative arc, a repeating 7-day loop becomes predictable by Day 15.
* **Failure Mode:** *Calendar fatigue.* Players recognize "Oh, it's Wednesday, that means Marek will complain about the demo again."

---

### Option D (Recommended): Tiered Priority Stack with Seeded Daily Quirks
* **Mechanics:** A deterministic schedule foundation layered under an explicit **4-tier resolution pipeline**:
  1. **Tier 1 — Quest Hard-Pins:** Active quest targets are immutably positioned where the story requires them.
  2. **Tier 2 — Daily Office Quirk:** 1 macro atmospheric modifier drawn from a seeded deck (e.g., *Release Day Panic*, *AC Malfunction*, *Free Pizza in Kitchen*, *Quiet Heads-Down Sprint*). This shifts general location weights and ambient speech bubbles.
  3. **Tier 3 — Bounded Micro-Events:** 2–3 specific NPC stochastic deviations per day (late arrival with custom apology, lingering evening gamer, hallway watercooler debate).
  4. **Tier 4 — Base Routine:** Default desk/chair work poses with procedural idle animations.
* **Pros:** 100% testable via pure functions, zero quest breakage, natural comedic variation, and manageable content scope.
* **Cons:** Requires a structured schedule resolver and capacity limits on rooms (e.g., kitchen can only fit 3 NPCs).
* **Failure Mode Mitigation:** Quest targets are protected by Tier 1 pins; capacity clamping prevents NPC clipping in small rooms; all deviations auto-decay back to the base routine upon period change.

---

## 2. Reference Research: Commercial Games & Literature

```
             HIGH CHAOS / UNBOUNDED
                     |
                     |       * Dwarf Fortress (Emergent chaos, high overhead)
                     |
                     |       * The Sims (Utility-driven autonomous desires)
                     |
STOCHASTIC ----------+---------------------- DETERMINISTIC
                     |
                     |   * Two Point Campus (Staff traits + room queues)
                     |
                     |   * OPTION D (Seeded Tiered Stack)
                     |
                     |   * Stardew Valley (Deterministic waypoint overrides)
                     |   * Papers, Please (Scripted ledger + seeded arrivals)
                     |   * Disco Elysium (Fixed placement + deep dialogue)
                     |
             BOUNDED / PREDICTABLE
```

### 1. Stardew Valley (ConcernedApe)
* **Architecture:** Deterministic waypoint schedules driven by conditional override layers: `Schedule = Base -> Season Override -> Weather/Rain Override -> Day-of-Month/Event Override -> Heart Level Override`.
* **Player Experience:** The player builds a mental map ("Robin is at her carpentry shop except on Tuesdays when she goes to Pierre's").
* **Key Takeaway for AI Trainer Simulator:** Overrides must be **legible**. When an NPC is not at their desk, the player should immediately understand *why* via visual props (a coffee cup left behind) or roster status ("In Kitchen").

### 2. The Sims Series (Maxis / EA)
* **Architecture:** Autonomy driven by need-decay curves (Hunger, Energy, Fun) and "Smart Object Advertising" (the TV advertises Fun; the fridge advertises Hunger).
* **Player Experience:** High emergence, but frequent pathfinding lockups and erratic social behavior.
* **Key Takeaway for AI Trainer Simulator:** Full utility AI is too chaotic for a 13-NPC narrative office. However, treating rooms (Kitchen, TV/Console, Whiteboard) as **attractor slots with bounded capacity** creates natural clustering without full autonomous simulation.

### 3. Two Point Hospital / Two Point Campus (Two Point Studios)
* **Architecture:** Staff have personality traits (Slacker, Workaholic, Coffee Junkie) that bias state transitions between work, break rooms, and training courses.
* **Player Experience:** Delivers systemic humor through character quirks while maintaining business sim stability.
* **Key Takeaway for AI Trainer Simulator:** Traits make stochasticity feel earned. Marek (10x DevOps) staying late to debug servers feels in-character; Pawel (Intern) playing console games in the kitchen feels comedic.

### 4. Papers, Please (Lucas Pope)
* **Architecture:** Strictly deterministic day-by-day story beats interleaved with seeded random applicant attributes.
* **Player Experience:** Pacing is tight and dramatic, but individual interactions feel distinct each run.
* **Key Takeaway for AI Trainer Simulator:** Anchor each day with a guaranteed narrative beat, letting stochastic quirks serve as comedic texture rather than structural roadblocks.

### 5. Dwarf Fortress (Bay 12 Games)
* **Architecture:** Unbounded systemic simulation (needs, memories, stress breakdowns, relationship graphs).
* **Player Experience:** Incredible emergent storytelling, but impossible to author tightly scripted punchlines or ensure predictable 15-minute game loops.
* **Key Takeaway for AI Trainer Simulator:** Avoid unbounded simulation state. We want authored comedic punchlines delivered through a reliable procedural schedule.

### 6. Disco Elysium (ZA/UM)
* **Architecture:** Static NPC placement according to the clock; extreme dynamism in internal thoughts, reactivity, and dialogue branch unlocking.
* **Player Experience:** World feels intensely alive despite NPCs standing in place for hours.
* **Key Takeaway for AI Trainer Simulator:** Liveliness comes from **reactivity** (an NPC commenting on what happened 5 minutes ago) more than frantic wandering.

---

## 3. Recommended Schedule & Stochastic Blueprint for AI Trainer Simulator

### 3.1 Daily Event Budget & Cadence
Across the 3 in-game periods (Morning $\rightarrow$ Afternoon $\rightarrow$ Evening), the engine allocates a fixed budget of **2 to 4 micro-events per day**:

```
[ DAY START: Seed Initialization (murmur3 hash of dayNumber + saveId) ]
   │
   ├── MORNING (Period 1)
   │     ├── 1–2 Late Arrivals: Target NPC spawns at Doorway at T + 30s instead of Desk.
   │     │     └── Trigger: Apology thought bubble upon reaching desk.
   │     └── Base: Rest of team at workstations / standup prep.
   │
   ├── AFTERNOON (Period 2)
   │     ├── 1 Away-from-Desk Quirk:
   │     │     ├── Option A: Marek in Server Rack / Meeting Room.
   │     │     ├── Option B: Klaudia taking LinkedIn photos in Kitchen.
   │     │     └── Option C: Janusz inspecting the projector in Training Room.
   │     └── Base: Desk work, occasional coffee run.
   │
   └── EVENING (Period 3)
         ├── 1 Overtime Worker: Tomek or Marek stays at desk under desk lamp.
         ├── 1–2 Kitchen Relaxers: Pawel + Bartek playing retro console on the TV.
         └── Base: Rest of office heads out (markers hidden/despawned).
```

### 3.2 Seed & Randomness Architecture
To guarantee test reproducibility and prevent save-scumming discrepancies, all stochastic decisions derive from a pure pseudo-random number generator (PRNG):

$$\text{seed} = \text{murmur3}(\text{"aitrainer:day:"} + \text{dayNumber} + \text{":"} + \text{saveSlotId})$$

* Replaying Day 3 in a unit test or regression run produces the exact same schedule and arrival order.
* Starting a new game produces a fresh unique seed sequence.

### 3.3 Conflict Resolution & Priority Pipeline

```ts
export interface ResolvedNpcSchedule {
  position: { x: number; y: number; z: number };
  facingYaw: number;
  room: "main-office" | "kitchen" | "training-room" | "meeting-room" | "cto-office";
  pose: "sitting-desk" | "standing" | "playing-console" | "walking" | "late-arrival";
  speechBubbleOverride?: string;
  dialogueGreetingPrefix?: string;
}
```

```
                     [ Evaluate NPC Schedule ]
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       [ Is NPC Pinned by Quest? ]         [ No Quest Pin ]
                 │                               │
                YES                              ▼
                 │                 [ Evaluate Daily Quirk Deck ]
                 │                               │
                 │                 [ Apply Seeded Micro-Event ]
                 │                               │
                 │                 [ Clamp Room Capacity (Max 3) ]
                 │                               │
                 ▼                               ▼
      [ Tier 1: Return Quest Target ]   [ Tier 2/3: Return Override ]
                 │                               │
                 └───────────────┬───────────────┘
                                 ▼
                    [ Tier 4: Fallback to Base ]
```

---

## 4. Implementation Implications

### 4.1 Impact on Quest Chains (`src/content/quests.ts`)
* **NPC Reservation Locks:** Quests define requirements like `requiredNpcs: [{ id: "bartek", location: "training-room", period: "morning" }]`.
* When the schedule resolver runs, any reserved NPC skips stochastic overrides, ensuring players never find a quest giver missing from their expected objective location.

### 4.2 Impact on Dialogue Trees (`src/content/dialogues.ts`)
* **Dynamic Topic & Greeting Injection:** Rather than cloning dialogue trees, stochastic states inject dynamic greeting prefixes and situational options:
  * If `npcState.isLate`: Bartek's dialogue opens with: *"Sorry I'm late, the tram caught fire on Jana Pawła II. Anyway, about your sprint..."*
  * If `npcState.inKitchenPlayingConsole`: Pawel's dialogue includes an extra branch: *"[E] Challenge Pawel to Tekken 3"*.

### 4.3 Impact on State Store & Reducer (`src/game/state.ts`)
* **Pure Functional Derivation:** The stochastic schedule does **not** require stateful reducer clutter.
* The schedule is computed as a pure projection:
  ```ts
  const currentSchedule = resolveDailySchedule(state.day, state.period, state.flags, state.quests);
  ```
* Only player-driven consequences (e.g., player talked to late Bartek and scolded him $\rightarrow$ `-2 patience`, `flag: scolded-bartek-day-3`) dispatch actions to the reducer.

### 4.4 Testing Strategy (`tests/unit/npc-schedule.test.ts`)
1. **Determinism Test:** Assert `resolveDailySchedule(day=3, seed=123)` returns identical output across 1,000 consecutive runs.
2. **Quest Safety Test:** Inject an active quest pinning Zosia to the meeting room; assert Zosia's position is invariant across 100 different daily random seeds.
3. **Room Capacity Test:** Assert no room ever resolves more NPCs than its physical slot count (e.g., Kitchen chairs $\le 3$, Meeting room $\le 6$).
4. **Collision Clamping Test:** Assert no two resolved NPC positions are within $< 1.2\text{m}$ of each other.

---

## 5. Summary Action Plan for Phase 3

1. **Extract Schedule Resolver:** Create `src/engine/npc-schedule-resolver.ts` as a pure function adhering to the 4-tier stack.
2. **Define Quirk & Micro-Event Decks:** Author 15 daily quirks and 30 comedic late/evening micro-events in `src/content/npc-quirks.ts`.
3. **Connect Roster UI:** Update `src/ui/office-roster.ts` to display the resolved room and status badge (e.g. *Bartek: "Late (Arriving...)"*, *Pawel: "In Kitchen (Gaming)"*).
4. **Unit Test Suite (TDD):** Implement `tests/unit/npc-schedule.test.ts` covering determinism, quest pins, and capacity clamping before wiring into `src/main.ts`.

# Independent Critical Review: C-64 Plan (Reception and Meeting Room Move)

**Target Document:** `.claude/plans/c64-reception-and-meeting-room-move.md`  
**Reviewer:** Independent Review Agent  
**Date:** 2026-09-02  
**Scope:** Geometric verification, coordinate math validation, codebase reference audit, and architectural gap analysis.

---

## Executive Summary

The plan for **C-64** proposes a substantial world layout restructuring: moving the `meeting-room` south of the `kitchen` (`x=[9.5, 19], z=[7.5, 17.5]`) and converting the old southern room (`x=[-6, 6], z=[9, 19]`) into a `reception` shell with a glass exterior wall, garden, and a new receptionist NPC (Renata).

While the high-level intent aligns with Lucas's prompt, this review identified **critical geometric omissions, coordinate ambiguity issues, extensive codebase breakage from D10, and multiple unaddressed engine dependencies** that will cause build/test failures and gameplay breakage if implemented as written.

---

## 1. Geometric & Overlap Verification: New Meeting Room `x=[9.5, 19], z=[7.5, 17.5]`

### 1.1 Floor Rectangle Disjointness (Exact Numbers)

Comparing the proposed new meeting room floor ($x \in [9.5, 19]$, $z \in [7.5, 17.5]$, area $9.5\text{m} \times 10.0\text{m} = 95.0\text{m}^2$, center $(14.25, 12.5)$) against all existing room floors in `src/content/world-layout.ts`:

| Room | Existing Floor Bounds | X Gap / Overlap | Z Gap / Overlap | Floor Overlap Status |
|---|---|---|---|---|
| **CEO Office** | `x=[-8, 8], z=[-19, -9]` | Gap: $+1.5\text{m}$ ($x=8$ to $9.5$) | Gap: $+16.5\text{m}$ ($z=-9$ to $7.5$) | **Disjoint (Clean)** |
| **Kitchen** | `x=[9, 19], z=[-7, 7]` | Overlaps in X ($[9.5, 19] \subset [9, 19]$) | Gap: $+0.5\text{m}$ ($z=7$ to $7.5$) | **Disjoint** (Separated by $0.5\text{m}$ wall band $z=[7, 7.5]$) |
| **Training Room** | `x=[19, 27], z=[-19, -3]` | Adjacent at $x=19$ | Gap: $+10.5\text{m}$ ($z=-3$ to $7.5$) | **Disjoint (Clean)** |
| **Toilet** | `x=[19, 24], z=[2, 7]` | Adjacent at $x=19$ | Gap: $+0.5\text{m}$ ($z=7$ to $7.5$) | **Disjoint** (Corner point touch at $(19, 7.5)$) |
| **Old Meeting (Reception)** | `x=[-6, 6], z=[9, 19]` | Gap: $+3.5\text{m}$ ($x=6$ to $9.5$) | Overlaps in Z ($z \in [9, 17.5]$) | **Disjoint** (Separated by $3.5\text{m}$ exterior gap $x=[6, 9.5]$) |
| **Main Office** | `x=[-9, 9], z=[-9, 9]` | Gap: $+0.5\text{m}$ ($x=9$ to $9.5$) | Overlaps in Z ($z \in [7.5, 9]$) | **Disjoint** (Separated by $0.5\text{m}$ wall band $x=[9, 9.5]$) |

*Floor Conclusion:* The floor rectangle `x=[9.5, 19], z=[7.5, 17.5]` is topologically disjoint from all existing room floor volumes.

---

### 1.2 Wall Band Overlaps & Volumetric Collisions (CRITICAL DEFECTS)

While the floors do not overlap, the **wall band geometry has severe conflicts**:

1. **North Boundary ($z = [7.0, 7.5]$) — Blocking Solid Wall**:
   - `world-layout.ts` line 215 defines: `wall("kitchen-south", 9.5, 19, 7, 7.5)`.
   - The plan places a doorway `kitchen-to-meeting` at `x=[10, 12]`, but **fails to split `kitchen-south`**.
   - If `kitchen-south` is not split into `wall("kitchen-south-west", 9.5, 10, 7, 7.5)` and `wall("kitchen-south-east", 12, 19, 7, 7.5)`, the original solid wall remains in `WORLD_COLLISION_WALLS`, creating an invisible solid barrier across the doorway for player collision and NPC pathing.

2. **West Boundary ($x = [9.0, 9.5]$) — Overlap with Main Office Shell**:
   - `MAIN_OFFICE_WALLS` contains:
     - `wall("main-east-south", 9, 9.5, 1.25, 9)` (occupies $x=[9, 9.5], z=[1.25, 9]$)
     - `wall("main-south-east", 1.25, 9, 9, 9.5)` (occupies $x=[1.25, 9], z=[9, 9.5]$)
   - For $z \in [7.5, 9.0]$, the band $x=[9, 9.5]$ is **already fully occupied** by `main-east-south`.
   - If the new meeting room defines an outer west wall at `x=[9, 9.5]`, it will **volumetrically collide** with `main-east-south` along $z \in [7.5, 9.0]$ ($\Delta z = 1.5\text{m}$ overlap), immediately failing `tests/unit/no-zfighting.test.ts`.
   - The west wall must use an inner offset ($x=[9.5, 9.78]$) for $z \in [7.5, 9.0]$, and an exterior wall volume for $z \in [9.0, 17.5]$. The plan completely omitted these coordinates.

3. **East Boundary ($x = [19.0, 19.5]$)**:
   - Touches `toilet-north` (`wall("toilet-north", 19, 24, 7, 7.5)`) at corner $(19, 7.5)$.
   - Outer east wall along $x=[19.0, 19.5]$ from $z=7.5$ to $z=17.5$ is volume-disjoint.

4. **World Bounds Verification**:
   - `WORLD_BOUNDS = { minX: -19, maxX: 27, minZ: -19, maxZ: 19 }`.
   - New room bounds with exterior walls ($x \in [9.0, 19.5]$, $z \in [7.0, 18.0]$) fit entirely within `WORLD_BOUNDS`.

---

## 2. Mathematical Vector Analysis of Decision D2 (Coordinate Frame & Cross Product)

### 2.1 The Math

In Three.js standard right-handed Cartesian 3D coordinates:
- Basis: $\hat{i} = (1,0,0) = +X$, $\hat{j} = (0,1,0) = +Y$, $\hat{k} = (0,0,1) = +Z$.
- Character orientation facing $+Z$:
  - Forward vector: $\vec{F} = (0, 0, 1) = +\hat{k} = +Z$.
  - Up vector: $\vec{U} = (0, 1, 0) = +\hat{j} = +Y$.

Calculating local directional vectors:
$$\vec{\text{Right}} = \vec{F} \times \vec{U} = \hat{k} \times \hat{j} = -\hat{i} = (-1, 0, 0) = -X$$
$$\vec{\text{Left}} = -\vec{\text{Right}} = \vec{U} \times \vec{F} = \hat{j} \times \hat{k} = +\hat{i} = (1, 0, 0) = +X$$

**Verdict on Pure Mathematical Claim:**  
The statement in D2 that *"for a character facing +Z with up=+Y in a right-handed three.js coordinate system, LEFT is +X"* is **MATHEMATICALLY ACCURATE**.

---

### 2.2 The Practical & Semantic Flaw in D2 / D3

Although the vector math is correct for character-relative local space, **D2 and D3 misapply it to Lucas's instructions**, creating an unnecessary conflict:

1. **Screen-Relative (Top-Down) vs. Character-Relative Ambiguity:**
   - On a top-down screen/map view (North $= -Z$ at top, South $= +Z$ at bottom, East $= +X$ at right, West $= -X$ at left):
     - The toilet is at $x=[19, 24]$ (East / Screen-Right).
     - Lucas said: *"clone the meeting room next to the kitchen, so move it in one direction, with entrance from the kitchen, on the other side than the toilet is. ... move the sign next to the door to the kitchen, on the left of the door."*
     - If the toilet is on the $+X$ side, "on the other side" is the $-X$ side ($x=[9.5, 12]$).
     - Looking at the map/screen, "left of the door" ($x \in [10, 12]$) means $x < 10$ ($x \approx 9.7$, West).
2. **Artificial Sign Collision (D3):**
   - By deciding "left of the door" means $+X$ ($x \approx 12.9$), D2 placed the new sign right beside the existing `TODAY'S MENU: COFFEE` sign at $x=14$, forcing D3 to move the menu sign to $x=16.5$.
   - If placed at screen-left ($x \approx 9.7$), the sign sits on the empty kitchen south wall segment ($x=[9.5, 10]$) with **zero collision** and no need to move the menu sign.
3. **Internal Inconsistency in `world-layout.ts`:**
   - Line 248 of `world-layout.ts` says: `"TODAY'S MENU: COFFEE" sign at (14, 2.1, 6.72) - a player standing in the kitchen facing the south wall sees the toilet door on the right.` (Even though the toilet is at $+X$!). The codebase itself has mixed conventions between 2D screen-space and 3D eye-space.

---

## 3. Comprehensive Breakage Audit for Decision D10 ("Keep room id `meeting-room`, rename old room to `reception`")

Decision D10 assumes keeping `id: "meeting-room"` avoids a rename cascade. In reality, **moving the coordinates while reusing the ID breaks multiple systems and tests across the codebase**:

### 3.1 `src/engine/chatter.ts` (`RoomId` and `roomAt`)
- **Missing Type:** `RoomId` (line 30) is `export type RoomId = "main-office" | "kitchen" | "meeting" | "toilet" | "training" | "ceo" | "corridor";`. It does not contain `"reception"`.
- **Classification Inversion:**
  ```ts
  if (z >= 9) return "meeting";
  ```
  - For the new meeting room ($x \in [9.5, 19], z \in [7.5, 17.5]$), any position with $z \in [7.5, 9.0)$ returns `"main-office"`, NOT `"meeting"`.
  - For the old room (now Reception, $x \in [-6, 6], z \in [9, 19]$), `roomAt` returns `"meeting"`.
- **Dialogue Concurrency Lockout:** `candidatePairs` restricts simultaneous conversations to 1 per room (`activeRooms`). Because both Reception and the new Meeting Room will be classified as `"meeting"`, an exchange in Reception will block an exchange in the Meeting Room (and vice versa).

### 3.2 Corridor Waypoints (`src/content/corridor-waypoints.ts`)
- The old waypoints:
  - `meeting-table`: `(-2.2, 0, 14)`
  - `meeting-south`: `(0, 0, 18)`
  - `meeting-west-north`: `(-3, 0, 17)`
  - `meeting-west-south`: `(-3, 0, 10.5)`
- **Breakages:**
  1. The new Reception places the **Sofa at `(-3.4, 0, 13.5)`** and a coffee table at `(-2.0, 0, 13.5)`. The existing waypoints at $x = -3$ will route NPCs directly through the sofa and coffee table.
  2. The **new meeting room has ZERO waypoints**. No doorway waypoint (`door-kitchen-meeting`), no table waypoints, no destination waypoints for `deal-wall` ($10.9, 12.6$) or `content-booth` ($17.6, 12.6$). Any NPC walking to a meeting or random destination will fail A* pathing and freeze.

### 3.3 NPC Spawn Validator AABBs (`src/engine/npc-spawn-validator.ts`)
- `ROOM_FURNITURE_AABBS` line 114 currently defines the meeting table AABB at `{ minX: -1.5, maxX: 1.5, minZ: 11.25, maxZ: 16.75 }`.
- **Breakages:**
  1. If unchanged, a **phantom obstacle** remains in the middle of Reception, blocking arriving NPCs spawning at `OFFICE_DOOR` $(0, 18.2)$ from walking through Reception into the office.
  2. The new meeting table at $[12.75, 15.75], z=[9.75, 15.25]$ has no AABB in `ROOM_FURNITURE_AABBS`, allowing NPCs to walk straight through the table mesh.

### 3.4 NPC Schedules & Controller (`src/content/npc-schedule.ts` & `src/engine/npc-controller.ts`)
- `RANDOM_DESTINATIONS` line 446: `{ position: { x: 0, y: 0, z: 14 }, face: 0, state: "meeting" }` is at the center of the old room (Reception). NPCs picking `"meeting"` will walk into Reception instead of the meeting room.
- `MEETING_SEATS` lines 199-204: All 4 seats are at $x < 0, z \in [12.6, 15.4]$ (old room).
- `npc-controller.ts` line 736:
  ```ts
  if (period === "afternoon") {
    // C-62: 1-2 colleagues join the manager's afternoon meeting at the meeting-room table
  }
  ```
  The controller hardcodes `period === "afternoon"` for meeting guest seating. If Zosia's meeting is moved to `morning` (Decision D7), this logic will run in the afternoon when Zosia is at her desk, leaving the morning meeting completely unattended by guests!

### 3.5 Scene Setup & Main Game Loop (`src/engine/scene.ts`, `src/main.ts`)
- `DOOR_SIGN_MOUNTS.meeting` in `scene.ts` is mounted on the south wall at `[-2.4, 2.1, 8.84]` with text `"Meeting Room"`. It must be updated to `"Reception"`, and a new mount created for the kitchen doorway to the meeting room.
- `src/main.ts` (lines 529-535) opening cinematic camera dives into `(0, 1.65, 17.8)` looking at `(0, 1.45, 7.8)`. The player spawns at `(0, 0, 17.8)` inside Reception.

### 3.6 Automated Test Suite Breakages
- `tests/unit/world-layout.test.ts`: Fails `WORLD_ROOMS.map(r => r.id)` check (line 44) if `reception` is added or array order changes.
- `tests/unit/no-zfighting.test.ts`: Fails `roomWall("meeting-room", "meeting-north-west")` if old room walls are renamed `reception-*`.
- `tests/unit/signs-and-walls.test.ts`: Fails `expect(DOOR_SIGN_MOUNTS.meeting.text).toBe("Meeting Room")` (line 53).
- `tests/unit/chatter.test.ts`: Fails `expect(roomAt(0, 14)).toBe("meeting")` (line 52).
- `tests/unit/npc-schedule.test.ts`: Fails `expect(getScheduleFor("zosia", "afternoon").state).toBe("meeting")` (line 116).
- `tests/e2e/c60-door-signs.spec.ts`: Fails assertion looking for "Meeting Room" sign at the main office doorway.

---

## 4. What Has the Plan Missed Entirely? (Blunt & Specific)

1. **Unauthored Wall Coordinates for the New Meeting Room:**
   - §2.1 of the plan only specifies the Floor and shared North wall. It **omits the West, East, and South wall definitions**, their thicknesses, their accent colors, and ceiling light fixture positions (`lightPositions`).

2. **Omission of Kitchen South Wall Split in `world-layout.ts`:**
   - The plan prescribes a doorway `kitchen-to-meeting` at $x=[10, 12]$, but never instructs splitting the existing solid `wall("kitchen-south", 9.5, 19, 7, 7.5)` into two segments. Without this, the doorway is impassable.

3. **Collision AABBs for Reception Furniture:**
   - Adding the Reception Desk ($3.4, 13.5$), Sofa ($-3.4, 13.5$), Coffee Table, and Xerox Printer ($5.0, 16.5$) requires adding explicit AABBs to `ROOM_FURNITURE_AABBS`. The plan details the visual meshes in W2, but omits the collision specifications in W1, which will cause pathing and collision bugs.

4. **Receptionist (Renata) Interaction Distance & Walk-to-Face:**
   - Renata sits behind a counter at $(4.4, 0, 13.5)$ facing $-X$.
   - The walk-to-face system moves the player to 1.5m in front of the NPC's position.
   - If the player approaches Renata, walking to $(4.4 - 1.5, 13.5) = (2.9, 13.5)$ puts the player directly inside the reception desk counter ($x \approx 3.4$). The plan must define a dedicated visitor interaction point in front of the counter ($x \approx 2.2$).

5. **`npc-controller.ts` Hardcoded Afternoon Meeting Logic:**
   - Moving Zosia's meeting to morning breaks the guest assignment logic in `npc-controller.ts:736`, which only executes when `period === "afternoon"`. The plan did not include `src/engine/npc-controller.ts` in Wave 1 or Wave 3 file ownership.

6. **Missing Waypoints Specification:**
   - Wave 1 brief states "add waypoints", but provides no concrete coordinate layout for:
     - The new central reception aisle ($x = 0, z \in [9.9, 18.2]$).
     - Renata's desk and printer route ($x \approx 4.4 \to 5.0$).
     - The kitchen-to-meeting doorway transition ($x \approx 11, z \approx 7.2$).
     - The new meeting room interior ($x \approx 14.25, z \approx 10..16$).

7. **The `NEXT MEETING: 5 MIN AGO` Sign Coordinates:**
   - The plan says to move this sign to the new meeting room, but leaves its new position and orientation completely unauthored (previously at `position: [4, 2.2, 9.28], face: 0`).

8. **Roster Status Mapping for Reception:**
   - `src/content/office-roster-status.ts` has no entry for `"reception"`. If Renata's state is `at-desk`, the roster UI must display her location accurately.

---

## 5. Actionable Recommendations for Wave 1 Brief

1. **Explicitly split `kitchen-south`** in `WORLD_ROOMS[kitchen].walls`:
   - `wall("kitchen-south-west", 9.5, 10, 7, 7.5)`
   - `wall("kitchen-south-east", 12, 19, 7, 7.5)`
2. **Author complete wall bounds for `meeting-room`**:
   - North: `wall("meeting-north-west", 9.5, 10, 7.5, 7.78)` and `wall("meeting-north-east", 12, 19, 7.5, 7.78)`
   - West: `wall("meeting-west-north", 9.5, 9.78, 7.5, 9.0)` (inner offset to avoid `main-east-south`) and `wall("meeting-west-south", 9.0, 9.5, 9.0, 17.5)` (outer exterior wall)
   - East: `wall("meeting-east", 19.0, 19.5, 7.5, 17.5)`
   - South: `wall("meeting-south", 9.5, 19.0, 17.5, 18.0)`
3. **Update `src/engine/chatter.ts`**:
   - Add `"reception"` to `RoomId`.
   - Update `roomAt(x, z)` to classify $x \in [-6, 6], z \ge 9$ as `"reception"` and $x \in [9.5, 19], z \in [7.5, 17.5]$ as `"meeting"`.
4. **Synchronize `npc-controller.ts`**:
   - Update meeting guest assignment from `period === "afternoon"` to `period === "morning"`.
5. **Re-evaluate Sign Placement (D2/D3)**:
   - Mount the meeting room door sign at $x = 9.7$ (West of door $x=[10, 12]$) on the kitchen south wall to avoid displacing the `TODAY'S MENU: COFFEE` sign at $x = 14$.

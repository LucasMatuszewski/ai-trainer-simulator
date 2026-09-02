# C-64 — Reception, relocated Meeting Room, and the Receptionist

Status: IN FLIGHT (started 2026-09-02, ~04:30 Portugal time)
Branch: `feat/c64-reception-and-meeting-room-move-opus`
Owner: Claude Opus 5 (orchestrator). Implementation delegated to CLI agents.
Source: Lucas, 2026-09-02, night batch. He went to sleep and asked for this to be planned, delegated and executed autonomously, with decisions made rather than questions asked.

---

## 0. Lucas's request, verbatim (the source of truth for intent)

> - clone the meeting room next to the kitchen, so move it in one direction, with entrance from the kitchen, on the other side than the toilet is. We should move there all furnitures and the sales chart and content booth, and the points we have there for the 2 groups of npcs. move the sign next to the door to the kitchen, on the left of the door.
>
> - at existing room we should make a modern reception, with reception desk, flowers, maybe one wall (behind the reception) whole in green flowers, like plant wall, with nice leds/lamps above the reception desk + a sofa on the other side. Reception could be on the right from the entrance (so on the side where the kitchen is), the sofa on the other side. the wall with the sofa (facing outside of the building) should be from glass or have huge glass window, same as we have in the training room. outside the building, visible through this window, should be hills and grass and trees or bushes in a raw. like nice corporate garden.
>
> - and in the place where we have now the entrance (the npc spawning point) we should make nice big glass door with some plans on the both sides, both inside the building and outside the building. Make it modern and detailed.
>
> - replace the text on the sign to the reception, instead of the training room.
>
> - if we had any references to "meeting room" we should remap them to the new building. e.g. Zosia has a meetings in meeting room, we should move them to the new location, and I would also move these meetings on the morning, not on the afternoon
>
> - add a new NPC, the receptionist, add here a new dialogues both for the player and other automatic bubble chats. adequate to her role as a receptionist and office manager. she should also have a big Xero printer next to the reception. the reception desk should be her working point. and she should go to the printer to make xero copies, it would be nice to have some flash animation when she does them + some audio effect
>
> - we should use receptionist as the first guide and tutorial at the game start! we need audio for this, and we can do some kind of tutorial and FAQ from this first dialogue, she can be some kind of Help Center for a player.

---

## 1. Decisions taken without asking (Lucas is asleep)

Every one of these was ambiguous in the request. They are decided here so the delegates never have to guess, and are listed so Lucas can overrule any of them in one line tomorrow.

| # | Ambiguity | Decision | Why |
|---|---|---|---|
| D1 | "next to the kitchen ... on the other side than the toilet is" - which side? | **South of the kitchen.** New floor `x=[9.5, 19], z=[7.5, 17.5]`. | The toilet is EAST of the kitchen (`x=[19,24], z=[2,7]`) and the training room takes the rest of the east wall (`z=[-7,-3]`). North of the kitchen is free but faces the CEO office. South is genuinely "the other side", is empty world space, and keeps the new room in the same southern half as the entrance. |
| D2 | "move the sign ... on the left of the door" - left in which frame? | **The +X side of the doorway**, sign at `x≈12.9` on the kitchen face of the kitchen's south wall. | A player in the kitchen walking toward the new room faces +Z; with forward=+Z and up=+Y, left is +X. This is the same frame Lucas used himself for the reception ("on the right from the entrance (so on the side where the kitchen is)" - entering northbound, right is +X), so it is his convention, confirmed. |
| D3 | The existing "TODAY'S MENU: COFFEE" sign sits at `x=14` on that same wall and would collide. | **Move the menu sign to `x=16.5`.** | It is a kitchen decoration with no dependencies. Cheaper than squeezing the new sign. A test asserts no two signs on one wall overlap. |
| D4 | "replace the text on the sign to the reception, instead of the training room" - which sign? | **The C-60 door sign at the main-office <-> old-meeting-room doorway now reads `RECEPTION`** (it currently reads `MEETING ROOM`). The genuine "TRAINING ROOM" sign at `(19, 2.2, -1.5)` STAYS - it correctly points at the training room. The in-room `NEXT MEETING: 5 MIN AGO` sign moves to the new meeting room. | The room behind that door stops being the meeting room, so its door sign is the one that must change. Reading it as "delete the training room sign" makes the training room unlabelled, which cannot be what he wants. FLAG THIS ONE for Lucas - it is the least certain decision in the list. |
| D5 | Which wall of the reception is glass? | **The WEST wall (`x=-6.5`), the one the sofa stands against.** Garden outside at `x < -6.5`. | Lucas put the sofa "on the other side" from the reception desk, i.e. the left/-X side, and said "the wall with the sofa (facing outside of the building) should be from glass". West of the old meeting room is empty world, so it is a true exterior wall. |
| D6 | Receptionist's name | **Renata.** Role: "Receptionist / Office Manager". | Polish, fits the cast, collides with no existing id (`bartek klaudia marek zosia pawel kasia tomek ania janusz burek grazyna maciek przemek dawid`). |
| D7 | Zosia's meeting period | **Morning**, per Lucas. Her afternoon slot becomes `at-desk`. | Explicit in the request. `MEETING_SEATS` move to the new room. |
| D8 | Xerox printer position | East side of the reception, `x≈5.0, z≈16.5`, against the east wall, 1.6 m from the reception desk. | "next to the reception". Close enough that her copy trip is a short, readable walk rather than a hike. |
| D9 | Tutorial audio scope | Generate TTS for Renata's FIRST-MEETING tutorial tree only (~8-12 lines), plus one printer SFX. Not the whole cast. | MiniMax is free but slow. The tutorial is the part Lucas actually asked to be voiced. Everything else stays text. |
| D10 | Does the old room keep the name "meeting room" anywhere? | No. `world-layout` room id becomes `reception`; the new room takes id `meeting-room`. | Keeps every existing `"meeting"` NPC state, roster label and dialogue reference working by pointing at the new coordinates, instead of renaming a concept across the codebase. This is the single most important structural decision: **the room ID stays, the coordinates move.** |

---

## 2. Target geometry (authoritative numbers)

Existing rooms, for reference:

| room | floor |
|---|---|
| main office | `x=[-9,9], z=[-9,9]` |
| CEO office | `x=[-8,8], z=[-19,-9]` |
| kitchen | `x=[9,19], z=[-7,7]` |
| training room | `x=[19,27], z=[-19,-3]` |
| toilet | `x=[19,24], z=[2,7]` |
| meeting room (OLD, becomes reception) | `x=[-6,6], z=[9,19]` |

### 2.1 New meeting room (id stays `meeting-room`)

- Floor: `x=[9.5, 19], z=[7.5, 17.5]`.
- North wall is shared with the kitchen's south wall (`z=[7,7.5]`). Follow the established offset pattern: the new room's own north wall segments sit INSIDE the new room at `z=[7.5, 7.78]`, so no two wall volumes ever share space (the #47 z-fight bug class).
- Doorway `kitchen-to-meeting` in that shared boundary at `x=[10, 12]`, built with the same `gap(...)` helper and two-band form as `kitchen-to-toilet`.
- Furniture, carried over from the old room with the same relative layout, re-centred on the new floor centre `(14.25, 12.5)`:
  - table `[14.25, 0.45, 12.5]`, size `[3, 0.9, 5.5]`
  - 8 chairs, two columns at `x = 11.85` and `x = 16.65`, rows at `z = 10.3, 11.8, 13.3, 14.8`
  - projector screen on the south wall, `[14.25, 1.7, 17.22]`, size `[4.5, 2, 0.12]`
  - the `NEXT MEETING: 5 MIN AGO` sign moves here
- NPC group points (these are the "points we have there for the 2 groups of npcs"), currently in `RANDOM_DESTINATIONS`:
  - `deal-wall` (the sales chart): move `(-4.6, 12.6)` -> `(10.9, 12.6)`, face `-pi/2` -> keep pointing at the wall it stands against
  - `content-booth`: move `(4.6, 12.6)` -> `(17.6, 12.6)`, face `+pi/2`
  - The sales chart and content booth PROPS must move with them; if they are currently only implied by the destination points and have no mesh, give them one (see §4.2).
- `MEETING_SEATS` (the four afternoon-meeting seats) move to the new table, keeping the same relative offsets.

### 2.2 Reception (old meeting room, id becomes `reception`, name "Reception")

Orientation: the entrance is the south wall (`z=19`); everyone walks in heading -Z (north). Facing that way, **right = +X = the kitchen side**, left = -X.

- **Reception desk**: right side, centred about `(3.4, 0, 13.5)`, facing -X into the room so Renata behind it looks across at whoever walks in. Detailed: counter top, front panel, a raised transaction ledge, a monitor, a phone, a small stack of paper.
- **Renata's working point**: behind the desk at approximately `(4.4, 0, 13.5)`, face `-pi/2` (looking -X, at arrivals). This is her `at-desk` schedule position in all periods.
- **Plant wall**: the full east wall behind the desk (`x=6`), `z=[11, 16]` - a dense green foliage wall, mixed leaf tones, not one flat green box.
- **LED / lamps above the desk**: a warm linear light strip plus 2-3 small downlights over the counter, with a real (cheap) light so the desk visibly glows.
- **Sofa**: left side, about `(-3.4, 0, 13.5)`, facing +X across the room, with a low coffee table and a magazine.
- **Flowers**: 2-3 planters/vases - one on the reception counter, one or two on the floor.
- **Glass west wall**: replace the solid `meeting-west` wall with a glass wall / huge window using the SAME technique as the training room's glass (find it in `world-layout.ts` / `multi-room.ts` and reuse it, do not invent a second glass style).
- **Garden outside the glass** (`x < -6.5`, roughly `z=[8, 20]`, extending out to `x=-16`): grass ground plane, 2-3 low rolling hills, a ROW of trees or bushes (Lucas said "in a raw" = in a row), a few scattered shrubs. Low-poly, matching the game's chunky style. Must be cullable/cheap - it is scenery, never walkable.
- **Glass entrance doors**: at the current entrance / NPC spawn point (`z=18.2` area, south wall around `x=[-2.4, 2.4]`). A big modern double glass door with a frame, plus planters on BOTH sides and on BOTH faces (inside the lobby and outside in the garden). Must not block the existing arrival/departure pathing.
- **Door sign** at the main-office doorway: text becomes `RECEPTION` (see D4).

---

## 2.3 Autonomy rule for every delegate

Every brief spawned from this plan carries an explicit autonomy clause: the delegate runs with
nobody awake to answer it, so it must DECIDE rather than ask, implement under a stated assumption
rather than stop, and record every judgement call in its report. A question in a log file at 4am
is a failed run. Disagreement is welcome, but it goes in the report alongside a finished
implementation, never instead of one.

## 3. Non-negotiable constraints for every delegate

1. **Do not break the pathing graph.** `corridor-waypoints.ts` builds its edges at module load by testing segments against furniture AABBs. Every new room needs waypoints (doorway + room interior points), and the existing all-pairs connectivity test in `tests/unit/npc-path.test.ts` must still pass.
2. **Every new solid prop needs a matching AABB** in `npc-spawn-validator.ts` (`ROOM_FURNITURE_AABBS`) or NPCs will walk through it.
3. **No wall volume may overlap another wall volume** (the #47 z-fight class). `tests/unit/no-zfighting.test.ts` guards this.
4. **`pnpm typecheck` and the full `vitest` suite must pass** - currently 481 tests, all green on this branch. Never delete or weaken an existing test to make a change pass; if a test genuinely encodes old behaviour, update it AND say so in the report.
5. **TDD for pure functions** (HR-6): new pure logic gets its test written first.
6. **Do not commit and do not push.** The orchestrator reviews the diff and commits. Leave the working tree dirty.
7. **No `git add -A` / `git add .`** under any circumstance.
8. **Plain ASCII** in all code comments and content strings (no em dashes, smart quotes, emoji) - a unit test enforces this for dialogue pools.
9. Match the surrounding code's comment style: comments explain WHY, and reference the correction id (C-64) plus Lucas's own words where relevant.

---

## 4. Work breakdown and delegation

### Wave 1 - geometry foundation (BLOCKING, everything else depends on the coordinates)

**W1. Rooms, walls, doorways, waypoints, destinations.**
Files owned: `src/content/world-layout.ts`, `src/content/corridor-waypoints.ts`, `src/engine/npc-spawn-validator.ts`, and the ROOM/DESTINATION parts of `src/content/npc-schedule.ts` (`RANDOM_DESTINATIONS`, `MEETING_SEATS`, Zosia's periods).
Deliverable: new meeting room exists and is reachable from the kitchen; the old room is re-identified as `reception` with a glass west wall; deal-wall and content-booth points moved; Zosia's meeting is in the morning at the new table; all existing tests pass plus new ones for the room rectangle, the doorway, sign non-overlap, and waypoint connectivity.
Agent: **Codex (gpt-5.6 Sol)** - structural, high-precision, lots of existing-pattern matching.

### Wave 2 - runs in parallel once W1 lands (disjoint file sets)

**W2. Reception interior + garden + glass doors (visual/taste).**
Files owned: `src/engine/furniture/*` (new modules), `src/engine/scene.ts`, `src/engine/multi-room.ts` if the glass wall needs it.
Deliverable: reception desk, plant wall, LED strip, sofa + coffee table, flowers, Xerox printer prop, glass entrance doors with planters inside and out, and the exterior garden (hills, grass, tree row).
Agent: **GLM-5.2 via OpenCode** if its quota is back (Lucas said ~5-6am), otherwise **Codex**. This is the taste-sensitive half.

**W3. Renata: data, dialogues, chatter.**
Files owned: `src/types.ts` (add `renata` to `NpcId`), `src/content/npcs.ts`, `src/content/dialogues*.ts`, `src/content/office-chatter.ts`, `src/content/morning-greetings.ts`, `src/content/evening-goodbyes.ts`, and the RECEPTIONIST rows of `src/content/npc-schedule.ts`.
Deliverable: Renata as a full NPC with an authored `appearance` (C-63), a working point behind the reception desk, a first-meeting TUTORIAL/FAQ tree that doubles as the game's help centre, a normal dialogue tree, and receptionist-flavoured lines in the chatter/greeting/goodbye pools.
Agent: **GLM-5.2 via OpenCode** (writing + humour) or **cco with MiniMax M3** as the fallback while GLM is out of quota.

### Wave 3 - after W1 + W3

**W4. The copy-run behaviour.**
Files owned: `src/engine/npc-controller.ts`, new `src/engine/printer-flash.ts`.
Deliverable: Renata periodically walks from her desk to the Xerox printer, "makes copies" for a few seconds with a flash animation (a bright plane / emissive pulse sweeping the scanner bar), triggers an SFX, then walks back. The flash timing is a pure, unit-tested function; the controller only executes it.
Agent: **Codex**.

### Wave 4 - last

**W5. Audio.**
Files owned: `data/asset-spec.json`, `public/assets/audio/**`, `src/audio/*` wiring if needed.
Deliverable: MiniMax TTS for Renata's tutorial lines via the existing `scripts/gen-assets.mjs` + `scripts/gmi-client.mjs` pipeline (`node scripts/with-env.mjs -- node scripts/gen-assets.mjs --only speech-en`), plus one photocopier SFX. MiniMax is free right now but SLOW - use long timeouts and run it in the background.
Agent: **Codex** to wire the spec; the generation itself is a long-running script the orchestrator babysits.

---

## 5. Verification gate (the orchestrator runs this, not the delegates)

After every wave:
1. `./node_modules/.bin/tsc --noEmit`
2. `./node_modules/.bin/vitest run` - must be >= 481 passing, zero failing
3. `git diff` read in full by the orchestrator
4. After Wave 2: Playwright screenshots of the reception (from the entrance looking north, and from inside looking west through the glass at the garden) and of the new meeting room, inspected by the orchestrator
5. Commit with a message that says WHAT and WHY, per repo convention

Only then does the next wave start.

---

## 6. Risks, called out in advance

- **The waypoint graph is the fragile part.** Moving a room means every route into it is re-derived. If the all-pairs connectivity test fails, the fix is more waypoints, never loosening the test.
- **The entrance is load-bearing.** `OFFICE_DOOR` (`z=18.2`), `ENTRANCE_EXIT_AREA` and the C-62 arrival/departure logic all live in the old meeting room. The reception rebuild must not move the spawn point or the C-62 e2e tests break.
- **`meeting` is an NPC state, a roster label and a dialogue topic.** D10 keeps the id and moves the coordinates precisely to avoid a rename cascade.
- **GLM quota.** If it is still out, Codex does the taste work and the result will be more literal. Acceptable; Lucas can re-run a polish pass on the visuals later.

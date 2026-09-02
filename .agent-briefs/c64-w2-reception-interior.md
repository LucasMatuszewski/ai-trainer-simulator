# C-64 Wave 2 — the modern reception interior, the glass doors, and the garden

You are implementing Wave 2 of correction C-64 in `/home/lucas/DEV/Projects/ai-trainer-simulator`
on branch `feat/c64-reception-and-meeting-room-move-opus`.

## Autonomy (read this before asking anything)

**You are running fully autonomously. Nobody is awake to answer you.** Lucas is asleep. Never stop
to ask a question - if something is ambiguous, DECIDE, implement it, and record the decision in
your report. A finished implementation under a stated assumption is worth far more than a question
in a log nobody reads until morning. Disagreement goes in the report ALONGSIDE finished work,
never instead of it.

## Read these two files first

1. `.agent-briefs/c64-design-ideas.md` — a full art-direction document for exactly this room:
   palette, primitive breakdowns, the cheap plant-wall trick, the LED glow technique, the floor
   plan with world coordinates, and the collision AABBs. **It was written for this task. Follow
   it.** It is a design document, not gospel: if something in it does not survive contact with the
   real code, adapt and say so in your report.
2. `.claude/plans/c64-reception-and-meeting-room-move.md` — context and decisions D1-D10.

Wave 1 has already landed: the meeting room moved south of the kitchen, and the old room
(`x=[-6,6], z=[9,19]`) is now the `reception` room with a GLASS west wall and an empty interior
waiting for you.

## What Lucas asked for

> at existing room we should make a modern reception, with reception desk, flowers, maybe one wall
> (behind the reception) whole in green flowers, like plant wall, with nice leds/lamps above the
> reception desk + a sofa on the other side. Reception could be on the right from the entrance (so
> on the side where the kitchen is), the sofa on the other side. the wall with the sofa (facing
> outside of the building) should be from glass or have huge glass window, same as we have in the
> training room. outside the building, visible through this window, should be hills and grass and
> trees or bushes in a raw. like nice corporate garden.
>
> and in the place where we have now the entrance (the npc spawning point) we should make nice big
> glass door with some plans on the both sides, both inside the building and outside the building.
> Make it modern and detailed.

"Make it modern and detailed" is the acceptance bar. This room is the first thing a player sees
when the game starts, so it carries the game's first impression.

## Files you own

- `src/engine/furniture/*.ts` — new factory modules (one per prop, matching the existing style)
- `src/engine/furniture/index.ts` or wherever the registry lives — wire up new types
- `src/engine/scene.ts` and `src/engine/multi-room.ts` — placement and the garden
- `src/content/world-layout.ts` — ONLY the `reception` room's `furniture` and `lightPositions`
  arrays. Do not touch its walls, doorways or any other room; Wave 1 owns those and got them right.
- `src/engine/npc-spawn-validator.ts` — ONLY to ADD AABBs for the solid props you add
- `tests/unit/**`

Do NOT touch `src/content/npcs.ts`, `src/types.ts`, the dialogue files, `src/engine/npc-idle.ts`,
`src/engine/npc-controller.ts` or `src/content/corridor-waypoints.ts` — other agents own those.

## The work

Build these, following the design document's primitive breakdowns and palette:

1. **Reception desk** at `(3.40, 0, 13.50)`, `rotationY = -pi/2`, visitors approaching from -X.
   Chunky hotel-style counter with a raised visitor ledge, a monitor, a phone, a small paper tray.
2. **Plant wall** on the east wall behind the desk. Use the instanced-box trick from the design
   doc — four leaf tones, never one flat green. This is Lucas's "one wall whole in green flowers".
3. **LED strip + downlights** over the desk. Emissive/basic material for the glow plus ONE real
   PointLight; do not add a light per fixture.
4. **Sofa + coffee table** on the -X side at about `(-3.55, 0, 13.50)`, facing +X across the room.
5. **Flowers**: a vase on the counter and one or two floor planters.
6. **Big glass double entrance doors** on the south wall at the existing entrance, with planters
   on both sides AND on both faces (inside the lobby and outside in the garden). The doors are
   decoration around the existing opening.
7. **The garden**, visible through the west glass and around the entrance: grass ground, 2-3 low
   rolling hills, and a ROW of trees or bushes (Lucas wrote "in a raw", meaning in a row), plus
   scattered shrubs. Low-poly, matching the game's chunky style.

### Three constraints that will bite you

- **Do not move or block the entrance.** `OFFICE_DOOR` is at `(0, 18.2)` and the C-62 arrival and
  departure system spawns every NPC there. Nothing solid may sit in the aisle `x=[-1.5, 1.5]` for
  the room's full depth, or you will wall NPCs out of the office. There are e2e tests for this.
- **The garden is scenery, never walkable.** It lives outside `WORLD_BOUNDS`
  (`maxZ = 19`), which is fine for rendering — the intro cinematic already draws exterior
  geometry — but give it NO collision AABBs and keep it cheap. If you add outside-the-wall
  planters at `z > 19` as the design doc suggests, confirm they actually render and are not culled
  by a room-bounds check; if they are culled, park them just inside instead and say so.
- **Every solid prop needs an AABB** in `ROOM_FURNITURE_AABBS` (`src/engine/npc-spawn-validator.ts`),
  or NPCs walk through it. The design doc lists the world-space AABBs after rotation. The reception
  desk AABB matters most: the receptionist NPC will stand behind it and the player must be able to
  reach a spot in front of it without ending up inside the counter.

## Hard rules

1. **Do NOT commit. Do NOT push.** Leave the working tree dirty.
2. Never `git add -A` / `git add .`.
3. `./node_modules/.bin/tsc --noEmit` must exit 0.
4. `./node_modules/.bin/vitest run` must pass. Baseline is **497 passing, 0 failing**. Fix your
   code, not the tests — unless a test genuinely encoded the empty room, in which case update it
   and name it in your report.
5. Plain ASCII in comments and strings. No em dashes, smart quotes or emoji.
6. Comments explain WHY, reference C-64, and quote Lucas where it helps a future reader.
7. Add a unit test per new furniture factory, in the style of the existing
   `tests/unit/furniture-library.test.ts` — assert the real structural properties (a desk has a
   worktop at a sane height, the plant wall has many leaf meshes in more than one color, the sofa
   has a seat and a back), not just "it returns a Group".
8. Do not run the dev server, a build, or playwright. The orchestrator takes the screenshots.

## Definition of done

- A reception that reads as modern and detailed from the entrance: desk, plant wall, glowing LED
  strip, sofa corner, flowers, glass doors with planters inside and out.
- A garden visible through the west glass with hills, grass and a row of trees.
- Every solid prop has a collision AABB; the entrance aisle is clear.
- typecheck clean, full suite green, new tests for every new factory.
- Report to `.agent-briefs/c64-w2-report.md`: what you built, which design-doc suggestions you
  changed and why, every test you touched, and anything in this brief you think is wrong.

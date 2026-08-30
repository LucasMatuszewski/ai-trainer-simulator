# Phase 6.5 — Fix the female body shape + randomize clothing + mix desk sides

## Context

Lucas just reported (2026-08-30):

> "women has hand to far away from body so they are disconnected! And
>  they have like big belly and but, maybe it was going to be a
>  shirt? We should add them a brest for sure, and a little bit of
>  bud/ass, but now too sexist, and some may have shirt, but not
>  all of them! Some may have trousers too! Maix them.
>  And why all women are on the right side of the office??? Mix
>  them with man!!!"

The screenshot confirms:

1. The female body has arms that are visibly disconnected from
   the torso (the user can see the gap between arm and body).
2. The female silhouette has a "big belly" / "butt" effect that
   Lucas didn't intend — looks like the torso and skirt geometry
   aren't aligned cleanly.
3. The desk layout is gendered: all female NPCs sit on the right
   side of the office, all male on the left. The user explicitly
   wants them mixed.

## Files to read

- `src/engine/npc-mesh.ts` — the female body factory. The arms
  are positioned at `±0.3` on X but the body is narrower than the
  male (0.45 wide vs 0.6). The arm root position is too far out
  and the arms look detached.
- `src/content/npcs.ts` — the NPC positions. Female NPCs (klaudia,
  zosia, kasia, ania, grazyna) are mostly on the +X side; male
  NPCs on the -X side.
- `docs/PRD.md` §13 C-08 — NPC visual variety.

## What to deliver

### 1. Fix the female body geometry

In `src/engine/npc-mesh.ts`, the female `createBody` / female
factory function:

- Move the arms closer to the torso so they don't look
  disconnected. The current arm position is `±0.3` on X; reduce
  it to `±0.22` on X so the arms attach to the body sides
  cleanly.
- Reshape the torso: the current torso is 0.45 wide, 0.85 tall,
  0.4 deep. Reshape it to be 0.5 wide, 0.85 tall, 0.4 deep —
  slightly wider so the silhouette is more natural.
- Remove the "big belly" / "butt" visual. The "skirt" or lower
  body shape should NOT extend out wider than the torso. Make
  the skirt a tapered shape: top (around the hips) is 0.45 wide,
  bottom is 0.35 wide. The current code probably has a flat
  rectangular skirt; change it to a tapered one.
- The chest area should have a small subtle shape (Lucas said
  "breast for sure" — interpret as a slight forward bulge in the
  upper torso, not exaggerated). If the implementation uses a
  BoxGeometry for the torso, add a small SphereGeometry on the
  front of the upper torso with radius 0.13, position z=+0.22
  (slightly forward of the body), with the same torso color.
  This gives a subtle shape without being exaggerated.

Update the existing `tests/unit/npc-mesh.test.ts` to verify:
- The female arms are positioned at `x = ±0.22 ± 0.02` (i.e.
  the arm root is at x in [-0.24, -0.20] and [+0.20, +0.24]).
- The female torso width is 0.5 ± 0.05.

### 2. Add per-NPC clothing variation

In `src/engine/npc-mesh.ts`, extend the `createNpcMesh` factory to
draw clothing based on the NPC's `gender` AND a deterministic
random seed derived from the NPC's id. For each NPC, randomly pick:

- shirt OR no-shirt (50/50). If shirt, draw a colored
  BoxGeometry (0.42 × 0.3 × 0.3) in front of the torso with a
  randomly chosen color from a palette of 5.
- trousers OR no-trousers OR skirt (33/33/33). The skirt code
  path is for females only. Trousers are a 0.3 × 0.4 × 0.3
  BoxGeometry around the legs.
- shoes OR no-shoes (50/50). Shoes are two small dark boxes
  around the feet.

Make sure the same NPC always gets the same clothing choices
(deterministic by NPC id), but different NPCs get different
clothing. This avoids the "all women look the same" complaint
without making the implementation random per-render.

Update `tests/unit/npc-mesh.test.ts` to verify:
- Two NPCs with different ids have different clothing sets
  (this is a probabilistic test — sample 3 NPCs and assert that
  the chosen clothing items differ between at least 2 of them).
- One NPC always gets the same clothing on repeated calls.

### 3. Mix the desk sides

In `src/content/npcs.ts`, swap the X positions of some NPCs so
that female and male NPCs are intermixed across the office.
Currently the layout is roughly:

  West side (x = -8 to -3):
    -7, 0, -2  Tomek (male)
    -7, 0, 1   Janusz (male)
    -4, 0, -2  Bartek (male)
    -4, 0, 4   Marek (male)
    -3, 0, -6  Maciek (male)

  East side (x = +3 to +8):
    +4, 0, -2  Klaudia (female)
    +4, 0, 4   Zosia (female)
    +7, 0, -2  Kasia (female)
    +7, 0, 1   Ania (female)
    +7, 0, 4   Grazyna (female)

Mix them up. The exact mix is up to you, but the final layout
should have BOTH female and male NPCs on BOTH the -X and +X
sides. For example:
- Keep Bartek (-4, 0, -2) on the west.
- Keep Maciek (-3, 0, -6) on the west.
- Keep Grazyna (+7, 0, 4) on the east.
- SWAP Klaudia and Tomek: Klaudia goes to (-7, 0, -2), Tomek
  to (+4, 0, -2).
- SWAP Ania and Janusz: Ania goes to (-7, 0, 1), Janusz
  to (+7, 0, 1).
- SWAP Kasia and Marek: Kasia goes to (-4, 0, 4), Marek
  to (+7, 0, -2).
- Zosia stays at (+4, 0, 4) on the east.

After the swap, the layout is:
  West side: Bartek, Klaudia, Ania, Kasia, Maciek.
  East side: Tomek, Janusz, Grazyna, Zosia, Marek.

Update the existing `tests/unit/npc-schedule.test.ts` and any
other tests that hardcode NPC positions to use the new positions.

### 4. Tests

- `tests/unit/female-body.test.ts`:
  - Female arm X position is between 0.20 and 0.24 (inclusive).
  - Female torso width is between 0.45 and 0.55.
  - Female chest has a small sphere mesh in front of the torso
    (radius around 0.13).
- `tests/unit/npc-clothing.test.ts`:
  - Two NPCs with different ids have at least one differing
    clothing element (probabilistic test).
  - The same NPC always gets the same clothing (deterministic).
- `tests/unit/npc-positions.test.ts`:
  - Both female and male NPCs are on both the -X and +X sides.
  - No two NPCs occupy the same position.

### 5. Constraints

- Do NOT change the existing main office wall / furniture / NPC
  schedule.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-female-bodies-mix-sol.md`.

## Definition of done

- Female body has arms attached to the torso without visible gap.
- Female chest has a subtle shape, not a "big belly".
- Per-NPC clothing variation is deterministic but differs between
  NPCs.
- The desk layout mixes female and male NPCs across both sides.
- All tests pass.
- The brief's report is written.

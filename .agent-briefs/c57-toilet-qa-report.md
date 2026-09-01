# C-57 toilet relocation QA report

## Verdict: FAIL

Commit `599638e` preserves waypoint connectivity and passes the focused automated checks, and the new fixture factories are materially detailed. However, the implementation does not satisfy the requested door placement from the stated viewing direction, retains stale room classification for the old toilet, and gives multiple new toilet schedule destinations the wrong facing direction.

## Blocking issues

1. **The doorway is on the player's left, not the right, when facing the south wall.**
   - `src/content/world-layout.ts:209` establishes the kitchen as `x=[9,19], z=[-7,7]`; the menu sign is at approximately `(14, 6.72)`, while the new doorway is east of it at `x=[19,20]` (`src/content/world-layout.ts:244-254`).
   - The project's own yaw convention says `face: 0` faces `+Z` (south) (`src/content/npc-schedule.ts:375-377`). When facing `+Z`, screen/player-right is `-X` (west), but the doorway is at `+X` (east). Therefore it appears on the left. The assertions in comments at `src/content/world-layout.ts:246-249` and `src/content/world-layout.ts:430-433` are geometrically reversed.
   - Suggestion: place the doorway west (`-X`) of the sign if the literal requirement is authoritative, or obtain a screenshot/user confirmation if "right" was intended from the opposite viewing direction.

2. **`roomAt()` still classifies the former toilet area as toilet.**
   - `src/engine/chatter.ts:81` retains the legacy fallback `if (z >= 9) return x <= -6.5 ? "toilet" : "meeting";` after adding the new toilet check at lines 71-77.
   - Positions in the removed southwest toilet, for example `(-16, 14.5)`, remain `"toilet"` even though no toilet room exists there. This can make chatter/room-dependent NPC behavior incorrect outside the new WC.
   - Suggestion: remove the legacy toilet branch and classify the actual meeting-room bounds explicitly, with regression assertions that former toilet coordinates are no longer `"toilet"`.

3. **The new toilet random destinations face away from their fixtures.**
   - At `src/content/npc-schedule.ts:392-393`, NPCs stand at `z=2.8` in front of stalls centered at `z=3`/backed toward the south wall, but `face: 0` points `+Z`; the comments also contradict the established convention by calling `+Z` north. Depending on the intended interaction point, these entries/comments need a consistent fixture-facing definition.
   - More clearly, the basin is on the north/south-wall coordinate `z=6.7`; an NPC at `z=6.0` must face `+Z` (`0`) toward it, but `src/content/npc-schedule.ts:397-399` uses `Math.PI`, which faces `-Z`, away from it.
   - Suggestion: correct the basin yaw to `0`, verify stall orientation in-engine, and add tests asserting both destination position and facing rather than bounds alone.

## Checks that passed

- Focused Vitest suites passed: `corridor-waypoints`, `npc-path`, `npc-schedule`, `chatter`, `no-zfighting`, `world-layout`, and `npc-controller`.
- `pnpm typecheck` passed.
- The real waypoint graph remains connected for every ordered waypoint pair, and its waypoints remain inside a room/world and outside registered obstacles.
- The general no-z-fighting test passes. The new west toilet wall uses `x=[19.5,20]` while the kitchen east wall uses `x=[19,19.5]`, so they touch but do not volumetrically overlap.
- The toilet floor only touches the kitchen at the `x=19` boundary and does not overlap the main office, meeting room, or training room by positive area.
- New random toilet destinations were moved into the new room bounds.
- `roomAt(22,5)` is classified as `toilet`, and `roomAt(19,7)` is classified as `kitchen`.
- The new `toilet-stall`, `toilet-sink`, and `urinal` factories are more than simple placeholder boxes: they include partitions/frames, bowl/cistern/seat/flush details, toilet roll, basin/faucet/drain, mirror, soap and towel dispensers, urinal pipe/rim/drain, and a privacy screen.

## Non-blocking review notes

- The `npc-controller.test.ts` reversal threshold increase from 8 to 10 (`tests/unit/npc-controller.test.ts:473-482`) is small and the test still asserts both NPCs settle and the lead NPC reaches its destination. It is reasonable, though the claimed causal link to the unrelated southwest waypoint is weak and would be stronger with recorded before/after reversal counts.
- The new renderable fixture factories do not have dedicated structural unit tests. Project rule PR-11 calls for tests of new `THREE.Object3D` factories (child count, positions, materials). Add mirrored tests for `toilet-stall.ts`, `toilet-sink.ts`, and `urinal.ts` so accidental fixture loss is caught.
- The chatter test covers the new room and the `x=19` boundary but omits a negative regression for the removed toilet. That omission allowed the stale legacy classification to survive.
- The schedule test checks only that toilet destinations fall within broad floor bounds; it does not detect collision with furniture or incorrect yaw. Add obstacle-clearance and fixture-facing assertions.

## Verification command result

The following completed with exit code 0 after loading the repository's documented non-interactive nvm/pnpm PATH:

`pnpm exec vitest run tests/unit/corridor-waypoints.test.ts tests/unit/npc-path.test.ts tests/unit/npc-schedule.test.ts tests/unit/chatter.test.ts tests/unit/no-zfighting.test.ts tests/unit/world-layout.test.ts tests/unit/npc-controller.test.ts && pnpm typecheck`

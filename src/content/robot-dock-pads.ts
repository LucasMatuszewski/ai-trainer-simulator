/**
 * C-70: the three charging pad coordinates for Janusz's robot fleet.
 *
 * A standalone leaf module (no imports) so both `world-layout.ts`
 * (which places the visible `robot-dock` furniture) and
 * `robot-patrols.ts` (which anchors each route's `dock`) can import
 * the SAME numbers without a circular dependency - `robot-patrols.ts`
 * already imports `WORLD_COLLISION_WALLS` from `world-layout.ts`, so
 * the reverse import would cycle.
 *
 * Pads sit along the kitchen's south wall in the dining area, next to
 * the two round tables (at (12, 2.8) and (16, 2.5)), clear of the
 * meeting-room doorway traffic (x <= 12.25) and the toilet doorway.
 */
export const DOCK_PADS: ReadonlyArray<{ x: number; z: number }> = [
  { x: 12.9, z: 6.4 }, // Zdzislaw the vacuum
  { x: 15.0, z: 6.4 }, // Halina the gardener
  { x: 17.2, z: 6.4 }, // Seba the runner
];

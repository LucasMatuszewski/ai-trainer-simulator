/**
 * Where an NPC should stand when it walks over to the player unprompted.
 *
 * Introduced for the Renata-then-Bartek onboarding (Lucas, 2026-09-03:
 * "Bartek comes when it is finished"). Being summoned to the player is a new
 * kind of movement for the scheduled cast - every other destination they have
 * is a fixed spot in the world - so the geometry lives here as a pure
 * function rather than inline in main.ts, and can be tested without booting
 * three.js.
 */

import type { AABB, XZ } from "../engine/collision";
import { pushOutOfObstacles } from "../engine/collision";

/**
 * How far the approaching NPC stops from the player.
 *
 * Matches the agent companion's CONVERSATION_DISTANCE. A first-person camera
 * compresses distance, so the number that reads as "came over to talk" is
 * larger than the real-world equivalent - 2.5 m was arrived at by looking at
 * the screen rather than by reasoning about metres, twice.
 */
export const APPROACH_DISTANCE = 2.5;

export interface ApproachSpot {
  position: { x: number; y: number; z: number };
  /** Yaw that looks at the player, in radians (0 looks +Z). */
  face: number;
}

/**
 * Pick a spot `APPROACH_DISTANCE` from the player, on the side the NPC is
 * already coming from, and nudge it out of any furniture it lands in.
 *
 * Approaching from the NPC's own side matters: walking around the player to
 * stand on the far side would look like the NPC is avoiding them, and it
 * makes the walk longer for no gain.
 */
export function approachSpotFor(
  player: XZ,
  npc: XZ,
  bounds: AABB,
  obstacles: readonly AABB[],
  radius = 0.3,
): ApproachSpot {
  const dx = npc.x - player.x;
  const dz = npc.z - player.z;
  const distance = Math.hypot(dx, dz);

  // Degenerate case: the NPC is standing exactly on the player. Pick an
  // arbitrary but stable direction rather than dividing by zero.
  const ux = distance < 1e-4 ? 0 : dx / distance;
  const uz = distance < 1e-4 ? 1 : dz / distance;

  const target = pushOutOfObstacles(
    { x: player.x + ux * APPROACH_DISTANCE, z: player.z + uz * APPROACH_DISTANCE },
    radius,
    bounds,
    obstacles,
  );

  return {
    position: { x: target.x, y: 0, z: target.z },
    // Look back at the player from wherever depenetration actually put us.
    face: Math.atan2(player.x - target.x, player.z - target.z),
  };
}

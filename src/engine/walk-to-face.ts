/**
 * Walk-to-face planner.
 *
 * Given the player's current position and an NPC's position, plan
 * where the player should walk to and which direction the NPC should
 * face, so that when the player arrives, the two are facing each other
 * at a short conversational distance.
 *
 * The plan is a pure data object: the caller (the dialogue controller
 * in main.ts) animates the player toward the target and lerps the NPC
 * yaw toward the targetYaw. There is no pathfinding in this function;
 * the caller uses the AABB collision-aware walking in controls.ts.
 *
 * Distance model:
 *  - CONVERSATION_DISTANCE = 1.6 m. Close enough to read a dialogue
 *    overlay, far enough not to clip into the NPC.
 *  - If the player is already within CONVERSATION_DISTANCE + 0.2 m of
 *    the NPC, we still return a target (the player stays put) so the
 *    caller knows to skip the walk and just open the dialogue.
 *  - If the player is further away, the target is on the line from
 *    NPC to player, at CONVERSATION_DISTANCE from the NPC, snapped to
 *    the office bounds so the player doesn't end up inside a wall.
 *
 * Facing model:
 *  - npcYaw: the NPC rotates to face the player at the target
 *    position. yaw=0 means facing -Z; this is consistent with
 *    controls.ts.
 *  - playerYaw: the player rotates to face the NPC, so when the walk
 *    ends, the player is looking at the NPC.
 *
 * See docs/ADR/0007-mouse-look-pattern-d.md §4 for the role of
 * walk-to-face in the click-to-talk flow.
 */

/** 3-tuple [x, y, z]. Plain alias; matches the runtime THREE.Vector3 shape. */
export type Vec3Tuple = [number, number, number];

export interface WalkToFaceInput {
  player: { x: number; y: number; z: number };
  npc: { x: number; y: number; z: number };
  /** Office wall AABBs. Pure data; the caller passes them in. */
  officeBounds: { minX: number; maxX: number; minZ: number; maxZ: number };
}

export interface WalkToFaceResult {
  /** The position the player should walk to. */
  target: Vec3Tuple;
  /** True if the player is already within walking distance (skip walk). */
  alreadyClose: boolean;
  /** The yaw the player should face at the end of the walk (radians). */
  playerYaw: number;
  /** The yaw the NPC should face (radians). */
  npcYaw: number;
}

/** Conversational distance: how far the player stands from the NPC. */
export const CONVERSATION_DISTANCE = 1.6;

/** Tolerance: if the player is within this much of the target, skip the walk. */
export const ALREADY_CLOSE_EPSILON = 0.2;

/**
 * Plan a walk-to-face.
 *
 * The math:
 *  1. Compute the vector from NPC to player.
 *  2. Normalize it (in the XZ plane; y is irrelevant on a single floor).
 *  3. The target is NPC + dir * CONVERSATION_DISTANCE.
 *  4. Clamp the target to the office bounds (minus a small margin so
 *     the player doesn't end up in a wall).
 *  5. Player yaw = atan2(-(target - npc).x, -(target - npc).z) so the
 *     player faces the NPC.
 *  6. NPC yaw = atan2(player.x - npc.x, player.z - npc.z) so the NPC
 *     faces the player.
 *
 * (These are mirror images of each other; when both arrive, they
 * face each other.)
 */
export function planWalkToFace(input: WalkToFaceInput): WalkToFaceResult {
  const { player, npc, officeBounds } = input;

  // Direction from NPC to player, XZ only.
  const dx = player.x - npc.x;
  const dz = player.z - npc.z;
  const dist = Math.hypot(dx, dz);

  // Degenerate case: the player is standing on top of the NPC. Pick an
  // arbitrary direction (toward -Z, the office entrance) so the
  // conversation distance is preserved.
  if (dist < 1e-4) {
    const target: Vec3Tuple = [npc.x, player.y, npc.z - CONVERSATION_DISTANCE];
    return {
      target: clampToBounds(target, officeBounds),
      alreadyClose: true,
      playerYaw: 0,
      npcYaw: 0,
    };
  }

  // Already close enough? Skip the walk; just face the NPC.
  if (dist <= CONVERSATION_DISTANCE + ALREADY_CLOSE_EPSILON) {
    const playerYaw = yawToward(player, npc);
    const npcYaw = yawToward(npc, player);
    return {
      target: [player.x, player.y, player.z],
      alreadyClose: true,
      playerYaw,
      npcYaw,
    };
  }

  // Walk to NPC + dir * CONVERSATION_DISTANCE.
  const ux = dx / dist;
  const uz = dz / dist;
  const targetRaw: Vec3Tuple = [
    npc.x + ux * CONVERSATION_DISTANCE,
    player.y,
    npc.z + uz * CONVERSATION_DISTANCE,
  ];
  const target = clampToBounds(targetRaw, officeBounds);

  // When the player arrives, the player should face the NPC and the
  // NPC should face the player. We compute both yaws from the FINAL
  // target position (so the NPC rotates to face where the player
  // lands, not where the player started).
  const playerYaw = yawToward({ x: target[0], z: target[2] }, npc);
  const npcYaw = yawToward(npc, { x: target[0], z: target[2] });

  return {
    target,
    alreadyClose: false,
    playerYaw,
    npcYaw,
  };
}

/**
 * Yaw (in radians, consistent with controls.ts: yaw=0 means -Z) for
 * `from` to face `to`. Pure helper.
 */
export function yawToward(
  from: { x: number; z: number },
  to: { x: number; z: number },
): number {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  // Forward = (-sin(yaw), 0, -cos(yaw)). To make this point at (dx, dz),
  // we need -sin(yaw) = dx/r, -cos(yaw) = dz/r. So yaw = atan2(-dx, -dz).
  return Math.atan2(-dx, -dz);
}

function clampToBounds(
  p: Vec3Tuple,
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number },
): Vec3Tuple {
  const margin = 0.3; // PLAYER_RADIUS, so we don't end up in a wall
  return [
    Math.max(bounds.minX + margin, Math.min(bounds.maxX - margin, p[0])),
    p[1],
    Math.max(bounds.minZ + margin, Math.min(bounds.maxZ - margin, p[2])),
  ];
}

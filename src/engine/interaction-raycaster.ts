/**
 * Pure helpers for the click-to-talk raycaster.
 *
 * Pattern D (see docs/ADR/0007-mouse-look-pattern-d.md §2.3): when
 * the player LMB-clicks in free-mouse mode, we cast a ray from the
 * camera through the cursor and check what it hits. If an NPC, we
 * plan a walk-to-face + open the dialogue. If an interactive object,
 * we activate it.
 *
 * The three.js Raycaster itself is the heavy lifter. This module
 * wraps it in:
 *  1. ndcFromMouse(x, y, w, h): convert pixel coordinates to NDC.
 *     The canvas is the only thing that needs DOM-coupled access, so
 *     we accept the rect and viewport size as plain numbers and the
 *     function is pure.
 *  2. pickFromCamera({ raycaster, camera, npcMeshes, interactableMeshes,
 *     ndc, maxDistance }): given a configured Raycaster + a set of
 *     meshes, return which (if any) was hit and the hit point.
 *
 * The caller (main.ts) is responsible for:
 *  - Instantiating the THREE.Raycaster (one per scene).
 *  - Calling setFromCamera(ndc, camera) on it.
 *  - Passing the maps of npcMeshes and interactableMeshes.
 *  - Wiring up the result into a walk-to-face + dialogue.
 *
 * We keep this module pure so it can be unit-tested without a real
 * three.js scene. The unit tests mock Raycaster + Camera + a few
 * meshes.
 */

import * as THREE from "three";

export interface NDC {
  x: number;
  y: number;
}

/**
 * Convert a mouse pixel position (origin top-left) to normalized
 * device coordinates in [-1, +1] for the three.js raycaster. The
 * canvas rect is the bounding box; the cursor position is relative
 * to the page, not the canvas, so we subtract the rect's left/top.
 */
export function ndcFromMouse(
  mouseX: number,
  mouseY: number,
  rect: { left: number; top: number; width: number; height: number },
): NDC {
  const x = ((mouseX - rect.left) / rect.width) * 2 - 1;
  const y = -(((mouseY - rect.top) / rect.height) * 2 - 1);
  return { x, y };
}

export type InteractionHit =
  | { kind: "npc"; npcId: string; point: THREE.Vector3; distance: number }
  | { kind: "object"; objectId: string; point: THREE.Vector3; distance: number }
  | { kind: "none" };

/**
 * Resolve which entry (NPC group / interactable) a hit belongs to.
 * NPCs are GROUPS of body-part meshes (head, torso, limbs) since the
 * mesh-NPC rework, so a hit lands on a CHILD: walk up the parent
 * chain until we reach the entry itself or an object carrying the
 * entry's id in `userData.npcId`.
 */
function resolveOwner(
  object: THREE.Object3D,
  entries: ReadonlyMap<string, THREE.Object3D>,
): string | null {
  let current: THREE.Object3D | null = object;
  while (current !== null) {
    for (const [id, entry] of entries) {
      if (entry === current) return id;
    }
    const npcId = (current.userData as { npcId?: string } | undefined)?.npcId;
    if (npcId !== undefined && entries.has(npcId)) return npcId;
    current = current.parent;
  }
  return null;
}

/**
 * Pick the first object (or NPC) under the cursor. We check NPCs
 * first because in Pattern D the roster card and the 3D click are
 * equivalent — but in the 3D view, an NPC is almost always more
 * "interesting" than a wall or a coffee machine, so NPC-wins is the
 * right priority.
 *
 * The raycast is RECURSIVE: the npcMeshes/interactableMeshes maps
 * hold GROUPS, and a non-recursive ray against a group hits nothing
 * (the "clicking an NPC does nothing" regression from the mesh-NPC
 * rework).
 *
 * The raycaster is mutated by `setFromCamera` and `intersectObjects`
 * in three.js; we do not clone it.
 */
export function pickFromCamera(args: {
  raycaster: THREE.Raycaster;
  npcMeshes: ReadonlyMap<string, THREE.Mesh>;
  interactableMeshes: ReadonlyMap<string, THREE.Mesh>;
  maxDistance?: number;
}): InteractionHit {
  const { raycaster, npcMeshes, interactableMeshes } = args;
  const max = args.maxDistance ?? 50;

  // NPCs first. `visible` is filtered explicitly: three.js does NOT
  // skip invisible objects when raycasting, and the controller leaves
  // hidden bodies parked in the world - gone-home NPCs at the origin,
  // and (C-51) not-yet-arrived ones on the doormat. The player must
  // not be able to hover or click someone who is not in the room.
  const npcArr = Array.from(npcMeshes.values()).filter((mesh) => mesh.visible);
  if (npcArr.length > 0) {
    const hits = raycaster.intersectObjects(npcArr, true);
    const first = hits.find((h) => h.distance <= max);
    if (first) {
      const npcId = resolveOwner(first.object, npcMeshes as ReadonlyMap<string, THREE.Object3D>);
      if (npcId !== null) {
        return { kind: "npc", npcId, point: first.point, distance: first.distance };
      }
    }
  }

  // Then interactable objects.
  const objArr = Array.from(interactableMeshes.values());
  if (objArr.length > 0) {
    const hits = raycaster.intersectObjects(objArr, true);
    const first = hits.find((h) => h.distance <= max);
    if (first) {
      const objectId = resolveOwner(first.object, interactableMeshes as ReadonlyMap<string, THREE.Object3D>);
      if (objectId !== null) {
        return { kind: "object", objectId, point: first.point, distance: first.distance };
      }
    }
  }

  return { kind: "none" };
}

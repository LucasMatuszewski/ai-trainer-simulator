/**
 * The agent companion: a robot coworker driven entirely by an external
 * WebMCP agent (ADR 0008, D-36).
 *
 * DELIBERATELY NOT an NpcController NPC. That system is schedule-driven
 * around a closed NpcId union, with morning arrivals, period transitions,
 * kitchen micro-sequences, avoidance ladders and a spawn validator all
 * assuming a fixed cast - every one of them covered by tests encoding that
 * assumption. Injecting a runtime-created, externally-driven character into
 * it would touch all of them. Instead this composes the pure functions those
 * systems are built from: planNpcPath, advanceAlongPath, updateWalkCycle,
 * createNpcMesh, and the shared bubble layer.
 *
 * What we give up: the companion has no schedule, joins no chatter pairing,
 * and is not part of NPC-to-NPC separation. For a character whose entire
 * purpose is to do what an agent tells it, wandering off to the kitchen on a
 * schedule would be a bug rather than a feature.
 */

import * as THREE from "three";
import { advanceAlongPath } from "./npc-controller";
import { planNpcPath } from "./npc-path";
import { createNpcMesh } from "./npc-mesh";
import { updateWalkCycle, DEFAULT_WALK_SPEED_MPS, type WalkCycleState } from "./npc-walk-cycle";
import type { AABB, XZ } from "./collision";
import type { Waypoint } from "../content/corridor-waypoints";

/** Bubble text cap. The layer is one line of DOM text; longer strings
 *  push the bubble wider than the viewport rather than wrapping. */
export const MAX_SAY_LENGTH = 120;

/** How close the companion must get before a move is reported as arrived. */
export const ARRIVAL_RADIUS = 1.1;

/** Body radius, matching the NPC bodies so collision reads the same. */
export const COMPANION_RADIUS = 0.3;

export type TargetKind = "npc" | "room";

export interface CompanionTarget {
  id: string;
  /** Human name, matched case-insensitively alongside the id. */
  label: string;
  kind: TargetKind;
  position: XZ;
  /** Shown to the agent in look_around, so it can choose meaningfully. */
  description: string;
}

interface NpcLike {
  id: string;
  name: string;
  role: string;
  position: { x: number; y: number; z: number };
}

interface RoomLike {
  id: string;
  name: string;
  floor: AABB;
}

/**
 * Everything the agent is allowed to address by name. Built fresh on each
 * look_around so a companion sees the world as it is now, not as it was at
 * join time.
 */
export function buildTargetCatalog(
  npcs: readonly NpcLike[],
  rooms: readonly RoomLike[],
): CompanionTarget[] {
  const catalog: CompanionTarget[] = [];

  for (const npc of npcs) {
    catalog.push({
      id: npc.id,
      label: npc.name,
      kind: "npc",
      position: { x: npc.position.x, z: npc.position.z },
      description: `${npc.name} - ${npc.role}`,
    });
  }

  for (const room of rooms) {
    catalog.push({
      id: room.id,
      label: room.name,
      kind: "room",
      // The floor centre, so "go to the kitchen" ends inside the kitchen
      // rather than on its threshold.
      position: {
        x: (room.floor.minX + room.floor.maxX) / 2,
        z: (room.floor.minZ + room.floor.maxZ) / 2,
      },
      description: `${room.name} (room)`,
    });
  }

  return catalog;
}

export type ResolveResult =
  | { ok: true; target: CompanionTarget }
  | { ok: false; reason: string; candidates: string[] };

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Resolve a name to a target (D-39).
 *
 * Matches the id or the display name, case-insensitively, and NOTHING else.
 * Partial and fuzzy matching are deliberately absent: a wrong guess walks a
 * character across an office the human is watching, and an agent that gets
 * the candidate list back can simply retry correctly. An honest failure with
 * alternatives beats a plausible wrong answer.
 */
export function resolveTarget(query: string, catalog: readonly CompanionTarget[]): ResolveResult {
  const wanted = normalize(query);
  const candidates = catalog.map((t) => t.id);

  if (wanted.length === 0) {
    return { ok: false, reason: "target must be a non-empty name", candidates };
  }

  const match = catalog.find((t) => normalize(t.id) === wanted || normalize(t.label) === wanted);
  if (match === undefined) {
    return {
      ok: false,
      reason: `unknown target "${query.trim()}"`,
      candidates,
    };
  }

  return { ok: true, target: match };
}

/**
 * Normalise a line the agent supplied for display (D-38).
 *
 * Agent output is untrusted: it lands in our DOM and is written with
 * textContent by the bubble layer, so markup is never interpreted. This
 * handles the two remaining hazards - unbounded length breaking layout, and
 * embedded newlines breaking a single-line bubble.
 */
export function clampSpokenLine(line: string): string {
  const collapsed = line.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  if (collapsed.length <= MAX_SAY_LENGTH) return collapsed;
  return `${collapsed.slice(0, MAX_SAY_LENGTH - 1).trimEnd()}…`;
}

// ---------------------------------------------------------------
// Runtime
// ---------------------------------------------------------------

export interface CompanionDeps {
  scene: THREE.Scene;
  obstacles: readonly AABB[];
  waypoints: readonly Waypoint[];
  edges: readonly [string, string][];
  /** Live NPC positions, so a "walk to Bartek" tracks where Bartek is now. */
  listNpcs: () => readonly NpcLike[];
  listRooms: () => readonly RoomLike[];
  /** Speak through the shared bubble layer, keeping one pool and one style. */
  showBubble: (position: THREE.Vector3, line: string) => void;
  /** Where a joining companion appears (the office entrance). */
  spawn: XZ;
}

export interface CompanionSnapshot {
  active: boolean;
  name: string;
  position: XZ;
  walking: boolean;
  /** The target it is currently walking to, if any. */
  movingTo: string | null;
}

export interface MoveOutcome {
  ok: boolean;
  reason?: string;
  candidates?: string[];
  target?: string;
}

export interface AgentCompanion {
  join: (name: string, persona: string) => { ok: boolean; reason?: string; name?: string };
  leave: () => boolean;
  isActive: () => boolean;
  snapshot: () => CompanionSnapshot;
  /** Begin walking to a named target. Arrival is reported via snapshot. */
  moveTo: (targetName: string) => MoveOutcome;
  say: (line: string) => { ok: boolean; reason?: string; spoken?: string };
  lookAround: () => unknown;
  update: (dt: number) => void;
  getPosition: () => THREE.Vector3;
  getPersona: () => string;
  destroy: () => void;
}

/** Recolor the reused human mesh into a robot (Lucas: "same mesh
 *  different textures, better for performance"). Metal body, dark
 *  joints, and an emissive visor so it reads as a machine at a glance. */
function applyRobotSkin(group: THREE.Group): void {
  const METAL = 0xb8c2cc;
  const DARK = 0x39424d;
  const VISOR = 0x22e0ff;

  let index = 0;
  group.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const material = child.material;
    if (Array.isArray(material) || !(material instanceof THREE.MeshLambertMaterial)) return;
    // Give the head an emissive visor; everything else alternates metal
    // and dark so panel lines read at the game's low internal resolution.
    const isHead = child.name === "head" || index === 0;
    material.color.setHex(isHead ? METAL : index % 2 === 0 ? METAL : DARK);
    if (isHead) material.emissive = new THREE.Color(VISOR).multiplyScalar(0.25);
    index += 1;
  });
}

export function createAgentCompanion(deps: CompanionDeps): AgentCompanion {
  let group: THREE.Group | null = null;
  let persona = "";
  let displayName = "";
  const position = new THREE.Vector3(deps.spawn.x, 0, deps.spawn.z);
  let path: THREE.Vector3[] | null = null;
  let segmentIndex = 0;
  let distanceInSegment = 0;
  let movingTo: string | null = null;
  let walkCycle: WalkCycleState = { distanceTraveled: 0, amplitude: 0 };

  function isActive(): boolean {
    return group !== null;
  }

  return {
    isActive,
    getPersona: () => persona,
    getPosition: () => position.clone(),

    join(name, personaText) {
      // AC-COMP-02: one seat. A second join must not produce a second body.
      if (isActive()) {
        return { ok: false, reason: `companion "${displayName}" is already in the office` };
      }

      displayName = clampSpokenLine(name) || "Rusty";
      persona = clampSpokenLine(personaText);
      position.set(deps.spawn.x, 0, deps.spawn.z);
      path = null;
      movingTo = null;
      walkCycle = { distanceTraveled: 0, amplitude: 0 };

      group = createNpcMesh("male", 0, "agent-companion", {
        skin: "porcelain",
        hair: "grey",
        shirt: "teal",
      });
      applyRobotSkin(group);
      // Tagged so main.ts's click raycast can identify the companion:
      // it is not in npcMeshes, because it has no NpcId.
      group.name = "agent-companion-body";
      group.position.copy(position);
      deps.scene.add(group);

      return { ok: true, name: displayName };
    },

    leave() {
      if (group === null) return false;
      deps.scene.remove(group);
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          const material = child.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
      group = null;
      path = null;
      movingTo = null;
      return true;
    },

    snapshot() {
      return {
        active: isActive(),
        name: displayName,
        position: { x: position.x, z: position.z },
        walking: path !== null,
        movingTo,
      };
    },

    moveTo(targetName) {
      if (!isActive()) return { ok: false, reason: "no companion has joined the game" };

      const catalog = buildTargetCatalog(deps.listNpcs(), deps.listRooms());
      const resolved = resolveTarget(targetName, catalog);
      if (!resolved.ok) {
        // D-39: hand back what IS valid, so the agent recovers in one step.
        return { ok: false, reason: resolved.reason, candidates: resolved.candidates };
      }

      const destination = new THREE.Vector3(resolved.target.position.x, 0, resolved.target.position.z);
      const planned = planNpcPath(position, destination, deps.waypoints, deps.edges, deps.obstacles);
      if (planned === null) {
        return {
          ok: false,
          reason: `no walkable route to "${resolved.target.label}" from here`,
          candidates: catalog.map((t) => t.id),
        };
      }

      path = planned;
      segmentIndex = 0;
      distanceInSegment = 0;
      movingTo = resolved.target.id;
      return { ok: true, target: resolved.target.id };
    },

    say(line) {
      if (!isActive()) return { ok: false, reason: "no companion has joined the game" };
      const spoken = clampSpokenLine(line);
      if (spoken.length === 0) return { ok: false, reason: "line must contain visible text" };
      deps.showBubble(position.clone(), spoken);
      return { ok: true, spoken };
    },

    lookAround() {
      if (!isActive()) return { error: "no companion has joined the game" };

      const npcs = deps.listNpcs();
      const catalog = buildTargetCatalog(npcs, deps.listRooms());
      const near = npcs
        .map((npc) => ({
          id: npc.id,
          name: npc.name,
          role: npc.role,
          distance: Math.round(
            Math.hypot(npc.position.x - position.x, npc.position.z - position.z) * 10,
          ) / 10,
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 6);

      return {
        companion: { name: displayName, position: { x: position.x, z: position.z } },
        nearbyPeople: near,
        // The full addressable set, so the agent never has to guess a name.
        canWalkTo: catalog.map((t) => ({ id: t.id, what: t.description })),
      };
    },

    update(dt) {
      if (group === null) return;

      let movedThisFrame = 0;
      if (path !== null) {
        const result = advanceAlongPath(
          position,
          path,
          segmentIndex,
          distanceInSegment,
          DEFAULT_WALK_SPEED_MPS,
          dt,
        );
        movedThisFrame = position.distanceTo(result.position);
        position.copy(result.position);
        segmentIndex = result.segmentIndex;
        distanceInSegment = result.distanceInSegment;
        group.rotation.y = result.face;

        if (result.finished) {
          path = null;
          movingTo = null;
        }
      }

      // Phase advances by metres ACTUALLY moved, never by raw time, so a
      // stalled companion cannot march in place (the C-48 rule).
      const output = updateWalkCycle(
        walkCycle,
        dt,
        path === null ? 0 : DEFAULT_WALK_SPEED_MPS,
        movedThisFrame,
      );
      walkCycle = output.state;
      group.position.set(position.x, position.y + output.bobAmount, position.z);

      const legLeft = group.getObjectByName("leg-left");
      const legRight = group.getObjectByName("leg-right");
      const armLeft = group.getObjectByName("arm-left");
      const armRight = group.getObjectByName("arm-right");
      if (legLeft) legLeft.rotation.x = output.legSwing;
      if (legRight) legRight.rotation.x = -output.legSwing;
      if (armLeft) armLeft.rotation.x = -output.armSwing;
      if (armRight) armRight.rotation.x = output.armSwing;
    },

    destroy() {
      this.leave();
    },
  };
}

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
import { applyWithCollision, type AABB, type XZ } from "./collision";
import type { Waypoint } from "../content/corridor-waypoints";

/** Bubble text cap. The layer is one line of DOM text; longer strings
 *  push the bubble wider than the viewport rather than wrapping. */
export const MAX_SAY_LENGTH = 120;
export const MAX_PERSONA_LENGTH = 500;

/** How close the companion must get before a move is reported as arrived. */
export const ARRIVAL_RADIUS = 1.1;

/** Body radius, matching the NPC bodies so collision reads the same. */
export const COMPANION_RADIUS = 0.3;

/**
 * Facing the companion spawns with, in radians.
 *
 * PI looks -Z, which is INTO the office. The reception spawn sits between the
 * entrance and the office door, and the previous value of 0 pointed the robot
 * back at the door it never came through (Lucas, 2026-09-03: "should spawn
 * looking on the office"). Exported so the rule is testable without three.js.
 */
export const SPAWN_FACING = Math.PI;

/**
 * How far the companion stops from the player when it walks over to talk.
 *
 * Three metres leaves the full robot comfortably in the human's view.
 */
export const CONVERSATION_DISTANCE = 3;

/** Personal space for approaching another coworker. */
const NPC_CONVERSATION_DISTANCE = 1.75;

/**
 * Gestures the agent may play by name. Deliberately the same vocabulary the
 * scheduled NPCs use (`DESK_GESTURES` in npc-idle.ts) plus the two standing
 * poses, so the robot moves like a member of the cast rather than having its
 * own private animation set.
 */
export const AGENT_ANIMATIONS = [
  "wave",
  "facepalm",
  "coffee-sip",
  "fist-pump",
  "shrug",
  "stretch",
  "nod",
] as const;
export type AgentAnimation = (typeof AGENT_ANIMATIONS)[number];

/** How long each gesture holds before easing back to neutral, in seconds. */
const ANIMATION_DURATION_S: Readonly<Record<AgentAnimation, number>> = {
  wave: 2.0,
  facepalm: 1.6,
  "coffee-sip": 1.3,
  "fist-pump": 1.8,
  shrug: 1.4,
  stretch: 2.2,
  nod: 1.2,
};

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
  /** Keep approach destinations clear of the human observer too. */
  getPlayerPosition?: () => XZ | null;
  /** Speak through the shared bubble layer, keeping one pool and one style. */
  showBubble: (position: THREE.Vector3, line: string) => void;
  /** Where a joining companion appears (the office entrance). */
  spawn: XZ;
  /** Outer walkable bounds, for the raw movement controls. */
  bounds: AABB;
}

export interface CompanionSnapshot {
  active: boolean;
  name: string;
  position: XZ;
  walking: boolean;
  /** The target it is currently walking to, if any. */
  movingTo: string | null;
}

export type StepDirection = "forward" | "back" | "left" | "right";

/** Longest single step, in metres. A step is a nudge, not a journey - use
 *  agent_move_to to cross the office. */
export const MAX_STEP_METRES = 3;

export interface StepOutcome {
  ok: boolean;
  reason?: string;
  /** How far it actually got - less than asked when something was in the way. */
  movedMetres?: number;
  /** How long the walk takes; the step is animated, not instant. */
  walkSeconds?: number;
  blocked?: boolean;
  position?: XZ;
  facingDegrees?: number;
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
  /** Cancel movement and any outstanding arrival wait. */
  stop: () => void;
  /** Begin walking to a named target. Arrival is reported via snapshot. */
  moveTo: (targetName: string) => MoveOutcome;
  /** Begin a named move and wait for actual arrival; timeout stops the walk. */
  awaitMoveTo: (targetName: string, timeoutMs?: number) => Promise<{ arrived: boolean; reason?: string }>;
  /**
   * Raw movement, the equivalent of holding W/A/S/D for a moment
   * (L-2026-09-03-04). `metres` is clamped, collision still applies, and a
   * step that would end inside furniture stops at the obstacle instead.
   */
  step: (direction: StepDirection, metres: number) => StepOutcome;
  /** Rotate in place, the equivalent of moving the mouse. */
  turn: (degrees: number) => StepOutcome;
  /** Turn to look at a world point - used to face the player on dialogue. */
  faceTowards: (point: XZ) => void;
  /**
   * Walk to a raw world point and resolve when the companion arrives (or when
   * `timeoutMs` elapses). Used by start_conversation so the robot walks over
   * to the player instead of speaking from across the room.
   */
  walkToPoint: (point: XZ, timeoutMs?: number) => Promise<{ arrived: boolean; reason?: string }>;
  /** Play a named gesture. Returns false for an unknown name. */
  playAnimation: (name: string) => boolean;
  /** Every gesture name playAnimation accepts. */
  animationNames: () => readonly string[];
  say: (line: string) => { ok: boolean; reason?: string; spoken?: string };
  lookAround: () => unknown;
  update: (dt: number) => void;
  getPosition: () => THREE.Vector3;
  getPersona: () => string;
  destroy: () => void;
}

/**
 * Recolor the reused human mesh into a robot (Lucas: "same mesh different
 * textures, better for performance" - so no new geometry, only materials).
 *
 * Matches on the child NAMES the mesh builder assigns rather than on child
 * order, which was fragile: an index-based guess put the visor on whichever
 * part happened to come first.
 */
function applyRobotSkin(group: THREE.Group): void {
  const CHASSIS = 0x9aa7b4;   // brushed metal body
  const FACEPLATE = 0x2b3138; // dark faceplate, so the visor reads
  const VISOR = 0x2ce8ff;     // emissive cyan
  const TRIM = 0x596570;

  group.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const material = child.material;
    if (Array.isArray(material) || !(material instanceof THREE.MeshLambertMaterial)) {
      // The eyes use MeshBasicMaterial; turn them into glowing lamps.
      if (!Array.isArray(material) && material instanceof THREE.MeshBasicMaterial) {
        if (child.name === "left-eye" || child.name === "right-eye") {
          material.color.setHex(VISOR);
          // Widen the eye into a visor slit - the single clearest robot cue.
          child.scale.set(2.6, 1.4, 1);
        }
      }
      return;
    }

    switch (child.name) {
      case "head-mesh":
        material.color.setHex(FACEPLATE);
        material.emissive = new THREE.Color(VISOR).multiplyScalar(0.08);
        break;
      case "hair":
      case "clothing-skirt":
      case "breast":
        // No hair, no skirt on a robot: hide rather than recolor, so the
        // silhouette reads as a machine.
        child.visible = false;
        break;
      default:
        material.color.setHex(child.name.includes("arm") || child.name.includes("leg") ? TRIM : CHASSIS);
        break;
    }
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
  /**
   * Facing in radians; 0 looks +Z, matching the NPC mesh convention.
   *
   * Spawns at PI, looking INTO the office (-Z). The reception spawn sits
   * between the entrance and the office door, and facing 0 pointed the robot
   * back at the door it did not come through (Lucas, 2026-09-03).
   */
  let facing = SPAWN_FACING;
  /** Currently playing gesture, or null. */
  let animation: { name: AgentAnimation; elapsed: number; duration: number } | null = null;
  /** Resolver for an in-flight walkToPoint. */
  let arrivalResolver: ((result: { arrived: boolean; reason?: string }) => void) | null = null;

  let trackedNpc: { id: string; position: XZ; replans: number } | null = null;
  let retargetElapsed = 0;

  function stopWalk(result: { arrived: boolean; reason?: string }): void {
    path = null;
    movingTo = null;
    trackedNpc = null;
    const resolve = arrivalResolver;
    arrivalResolver = null;
    resolve?.(result);
  }

  function beginPath(planned: THREE.Vector3[], target: string | null): void {
    path = planned;
    segmentIndex = 0;
    distanceInSegment = 0;
    movingTo = target;
  }

  function facePoint(point: XZ): void {
    const dx = point.x - position.x;
    const dz = point.z - position.z;
    if (Math.hypot(dx, dz) < 1e-4) return;
    facing = Math.atan2(dx, dz);
    if (group) group.rotation.y = facing;
  }

  // A bounded ring search is the variable-distance equivalent of
  // approachSpotFor. Reject blocked spots rather than depenetrating one
  // into the person's space. The existing path planner owns routing.
  function planApproach(point: XZ, distance: number): THREE.Vector3[] | null {
    const heading = Math.atan2(position.x - point.x, position.z - point.z);
    const clearance = COMPANION_RADIUS + 0.001;
    const obstacles = deps.obstacles.map((o) => ({
      minX: o.minX - clearance, maxX: o.maxX + clearance,
      minZ: o.minZ - clearance, maxZ: o.maxZ + clearance,
    }));
    for (const radius of distance === NPC_CONVERSATION_DISTANCE ? [distance, 2.25, 2.75] : [distance]) {
    for (let i = 0; i < 16; i++) {
      // Alternate sides, trying the shortest approach first.
      const offset = Math.ceil(i / 2) * (i % 2 ? 1 : -1) * Math.PI / 8;
      const destination = new THREE.Vector3(
        point.x + Math.sin(heading + offset) * radius, 0,
        point.z + Math.cos(heading + offset) * radius,
      );
      const human = deps.getPlayerPosition?.();
      if (human && Math.hypot(destination.x - human.x, destination.z - human.z) < 1.5) continue;
      if (destination.x < deps.bounds.minX + clearance || destination.x > deps.bounds.maxX - clearance ||
          destination.z < deps.bounds.minZ + clearance || destination.z > deps.bounds.maxZ - clearance) continue;
      if (obstacles.some((o) => destination.x >= o.minX && destination.x <= o.maxX &&
          destination.z >= o.minZ && destination.z <= o.maxZ)) continue;
      const planned = planNpcPath(position, destination, deps.waypoints, deps.edges, obstacles);
      if (planned !== null) return planned;
    }
    }
    return null;
  }

  function waitForArrival(timeoutMs: number): Promise<{ arrived: boolean; reason?: string }> {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        stopWalk({ arrived: false, reason: "could not reach the destination in time" });
      }, timeoutMs);
      arrivalResolver = (result) => {
        clearTimeout(timer);
        resolve(result);
      };
    });
  }

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
      persona = personaText.replace(/\s+/g, " ").trim().slice(0, MAX_PERSONA_LENGTH);
      position.set(deps.spawn.x, 0, deps.spawn.z);
      facing = SPAWN_FACING;
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
      group.rotation.y = facing;
      deps.scene.add(group);

      return { ok: true, name: displayName };
    },

    leave() {
      if (group === null) return false;
      stopWalk({ arrived: false, reason: "companion left the game" });
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

    stop: () => stopWalk({ arrived: false, reason: "walk cancelled" }),

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

      stopWalk({ arrived: false, reason: "walk replaced by a new move" });
      const destination = new THREE.Vector3(resolved.target.position.x, 0, resolved.target.position.z);
      const planned = resolved.target.kind === "npc"
        ? planApproach(resolved.target.position, NPC_CONVERSATION_DISTANCE)
        : planNpcPath(position, destination, deps.waypoints, deps.edges, deps.obstacles);
      if (planned === null) {
        return {
          ok: false,
          reason: `no walkable route to "${resolved.target.label}" from here`,
          candidates: catalog.map((t) => t.id),
        };
      }

      beginPath(planned, resolved.target.id);
      if (resolved.target.kind === "npc") {
        trackedNpc = { id: resolved.target.id, position: { ...resolved.target.position }, replans: 0 };
        retargetElapsed = 0;
      }
      return { ok: true, target: resolved.target.id };
    },

    async awaitMoveTo(targetName, timeoutMs = 15_000) {
      const result = this.moveTo(targetName);
      if (!result.ok) return { arrived: false, reason: result.reason };
      return waitForArrival(timeoutMs);
    },

    step(direction, metres) {
      if (!isActive()) return { ok: false, reason: "no companion has joined the game" };
      if (!Number.isFinite(metres) || metres <= 0) {
        return { ok: false, reason: "metres must be a positive number" };
      }
      // A raw step is a nudge. Anything longer is a journey and belongs to
      // agent_move_to, which paths around furniture instead of bumping it.
      const distance = Math.min(metres, MAX_STEP_METRES);
      stopWalk({ arrived: false, reason: "walk replaced by a step" });

      // Camera-relative, exactly like the player's WASD: forward is wherever
      // the companion is currently facing.
      const heading =
        direction === "forward" ? facing
        : direction === "back" ? facing + Math.PI
        : direction === "left" ? facing + Math.PI / 2
        : facing - Math.PI / 2;

      const before = { x: position.x, z: position.z };
      // Resolve the destination against collision FIRST, so the reported
      // distance is honest, then WALK there rather than jumping.
      const after = applyWithCollision(
        before,
        COMPANION_RADIUS,
        Math.sin(heading) * distance,
        Math.cos(heading) * distance,
        deps.bounds,
        deps.obstacles,
      );

      const moved = Math.hypot(after.x - before.x, after.z - before.z);

      // A step is a short WALK, not a displacement. Setting the destination
      // as a two-point path hands it to the same per-frame advance and walk
      // cycle everything else uses, so the player sees the robot cover the
      // ground at 1.2 m/s. Writing position directly - which is what this did
      // first - teleported it (Lucas: "works like a teleport or walks crazy
      // fast"), because the whole distance landed in a single frame.
      if (moved > 0.01) {
        path = [position.clone(), new THREE.Vector3(after.x, position.y, after.z)];
        segmentIndex = 0;
        distanceInSegment = 0;
        movingTo = null;
      } else {
        // Nowhere to go - cancel any walk in progress rather than leaving the
        // companion drifting along a path the agent has overridden.
        path = null;
        movingTo = null;
      }

      return {
        ok: true,
        movedMetres: Math.round(moved * 100) / 100,
        blocked: moved < distance - 0.01,
        // Where it will BE once the step finishes; the walk takes
        // moved / 1.2 seconds.
        position: { x: after.x, z: after.z },
        facingDegrees: Math.round((facing * 180) / Math.PI),
        walkSeconds: Math.round((moved / DEFAULT_WALK_SPEED_MPS) * 10) / 10,
      };
    },

    turn(degrees) {
      if (!isActive()) return { ok: false, reason: "no companion has joined the game" };
      if (!Number.isFinite(degrees)) return { ok: false, reason: "degrees must be a number" };
      facing = (facing + (degrees * Math.PI) / 180) % (Math.PI * 2);
      if (group) group.rotation.y = facing;
      return {
        ok: true,
        position: { x: position.x, z: position.z },
        facingDegrees: Math.round(((facing * 180) / Math.PI + 360) % 360),
      };
    },

    faceTowards: facePoint,

    async walkToPoint(point, timeoutMs = 15_000) {
      if (!isActive()) return { arrived: false, reason: "no companion has joined the game" };
      stopWalk({ arrived: false, reason: "walk replaced by a new approach" });
      const destinationPerson = { x: point.x, z: point.z };
      const planned = planApproach(destinationPerson, CONVERSATION_DISTANCE);
      if (planned === null) return { arrived: false, reason: "no walkable route to the player" };
      beginPath(planned, "player");
      const result = await waitForArrival(timeoutMs);
      if (result.arrived) facePoint(destinationPerson);
      return result;
    },

    playAnimation(name) {
      if (!isActive()) return false;
      if (!(AGENT_ANIMATIONS as readonly string[]).includes(name)) return false;
      const gesture = name as AgentAnimation;
      animation = { name: gesture, elapsed: 0, duration: ANIMATION_DURATION_S[gesture] };
      return true;
    },

    animationNames: () => AGENT_ANIMATIONS,

    say(line) {
      if (!isActive()) return { ok: false, reason: "no companion has joined the game" };
      const spoken = clampSpokenLine(line);
      if (spoken.length === 0) return { ok: false, reason: "line must contain visible text" };
      deps.showBubble(position, spoken);
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
        companion: {
          name: displayName,
          walking: path !== null,
          movingTo,
          position: { x: position.x, z: position.z },
          // Which way it is facing, so an agent can reason about what
          // "forward" means for agent_step without guessing.
          facingDegrees: Math.round(((facing * 180) / Math.PI + 360) % 360),
        },
        nearbyPeople: near,
        // The full addressable set, so the agent never has to guess a name.
        canWalkTo: catalog.map((t) => ({ id: t.id, what: t.description })),
      };
    },

    update(dt) {
      if (group === null) return;

      retargetElapsed += dt;
      if (path !== null && trackedNpc !== null && retargetElapsed >= 0.5) {
        retargetElapsed = 0;
        const npc = deps.listNpcs().find((npc) => npc.id === trackedNpc!.id);
        if (npc === undefined) {
          stopWalk({ arrived: false, reason: "target person is no longer present" });
        } else if (Math.hypot(npc.position.x - trackedNpc.position.x, npc.position.z - trackedNpc.position.z) >= 0.5) {
          const planned = trackedNpc.replans < 20 ? planApproach(npc.position, NPC_CONVERSATION_DISTANCE) : null;
          if (planned === null) {
            stopWalk({ arrived: false, reason: "could not keep up with the target person" });
          } else {
            trackedNpc.position = { x: npc.position.x, z: npc.position.z };
            trackedNpc.replans++;
            beginPath(planned, trackedNpc.id);
          }
        }
      }

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
        facing = result.face;

        if (result.finished) {
          const npc = trackedNpc === null ? undefined : deps.listNpcs().find((npc) => npc.id === trackedNpc!.id);
          if (trackedNpc !== null && npc === undefined) {
            stopWalk({ arrived: false, reason: "target person is no longer present" });
          } else if (npc !== undefined && trackedNpc !== null) {
            const separation = Math.hypot(npc.position.x - position.x, npc.position.z - position.z);
            if (separation < 1.5 || separation > 3) {
              const planned = trackedNpc.replans < 20 ? planApproach(npc.position, NPC_CONVERSATION_DISTANCE) : null;
              if (planned === null) {
                stopWalk({ arrived: false, reason: "could not settle beside the target person" });
              } else {
                trackedNpc.position = { x: npc.position.x, z: npc.position.z };
                trackedNpc.replans++;
                beginPath(planned, trackedNpc.id);
              }
            } else {
              facePoint(npc.position);
              stopWalk({ arrived: true });
            }
          } else {
            stopWalk({ arrived: true });
          }
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

      // A gesture plays OVER the walk cycle rather than replacing it, so a
      // wave while walking still swings the legs. It is written after the
      // cycle for that reason - last write wins on the limbs it touches.
      if (animation !== null) {
        animation.elapsed += dt;
        const t = Math.min(1, animation.elapsed / animation.duration);
        // Sine ease in and out, so a gesture never snaps on or off.
        const amount = Math.sin(t * Math.PI);
        const head = group.getObjectByName("head");

        switch (animation.name) {
          case "wave":
            // Right arm up, forearm oscillating.
            if (armRight) {
              armRight.rotation.x = -2.2 * amount;
              armRight.rotation.z = Math.sin(animation.elapsed * 9) * 0.5 * amount;
            }
            break;
          case "facepalm":
            if (armRight) {
              armRight.rotation.x = -2.5 * amount;
              armRight.rotation.z = 0.6 * amount;
            }
            if (head) head.rotation.x = 0.35 * amount;
            break;
          case "coffee-sip":
            if (armRight) armRight.rotation.x = -2.1 * amount;
            if (head) head.rotation.x = -0.3 * amount;
            break;
          case "fist-pump":
            // Two pumps across the gesture.
            if (armLeft) armLeft.rotation.x = -2.4 * amount * Math.abs(Math.sin(t * Math.PI * 2));
            if (armRight) armRight.rotation.x = -2.4 * amount * Math.abs(Math.sin(t * Math.PI * 2));
            break;
          case "shrug":
            if (armLeft) armLeft.rotation.z = -1.75 * amount;
            if (armRight) armRight.rotation.z = 1.75 * amount;
            break;
          case "stretch":
            if (armLeft) armLeft.rotation.x = -2.6 * amount;
            if (armRight) armRight.rotation.x = -2.6 * amount;
            if (head) head.rotation.x = -0.4 * amount;
            break;
          case "nod":
            if (head) head.rotation.x = Math.sin(animation.elapsed * 7) * 0.35 * amount;
            break;
        }

        if (t >= 1) {
          animation = null;
          // Return the head to neutral; the limbs are rewritten every frame
          // by the walk cycle above, but the head is not.
          const restingHead = group.getObjectByName("head");
          if (restingHead) restingHead.rotation.x = 0;
          if (armLeft) armLeft.rotation.z = 0;
          if (armRight) armRight.rotation.z = 0;
        }
      }
    },

    destroy() {
      this.leave();
    },
  };
}

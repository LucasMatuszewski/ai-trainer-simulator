/**
 * C-70: the state machine driving one of Janusz's robots.
 *
 * Pure: no three.js, no DOM, no scene. The mesh wrapper lives in
 * `janusz-robots.ts`; tests drive this module directly with an
 * injected rng, period and Janusz snapshot, the same way the NPC
 * controller tests inject their schedule.
 *
 * States:
 *
 *   docked    charging on its pad; waits `dockWaitS` (jittered), then
 *             undocks unless it is Evening - in Evening it stays put.
 *   to-work   driving to the current duty stop / pass-through corner.
 *   working   paused at a duty stop, playing its duty animation for the
 *             stop's dwell time.
 *   to-dock   driving home to its pad (loop done, or Evening).
 *   following the RARE detour: swinging by Janusz so everyone can see
 *             whose fleet this is. The check rolls at the end of every
 *             duty stop and only passes when Janusz is visible, the
 *             period is not Evening, the cooldown has elapsed, and the
 *             robot is already near him (same room, within
 *             `followRange` - it is a "passing by the master" beat,
 *             never a cross-building commute). The detour approaches to
 *             `standoffDistance`, lingers `lingerS`, and always ends
 *             (hard cap `followDurationS`).
 *
 * Movement is `stepToward`: obstacle-aware stepping that tries the
 * direct step first and then a fan of sidesteps, so a robot that has
 * left its authored route (only `following` can do that) slides around
 * furniture instead of clipping through it. On the authored routes the
 * direct step always succeeds - the route data is pinned clear by
 * tests.
 *
 * Room changes (only ever toward Janusz or home) go through doorway
 * hops (`routeBetween`): kitchen <-> main office <-> reception. That is
 * the whole walkable world for a floor robot.
 */
import type { AABB } from "./collision";
import type { TimeOfDay } from "../types";
import type { RobotPatrolRoute } from "../content/robot-patrols";

export type RobotBrainStateName =
  | "docked"
  | "to-work"
  | "working"
  | "to-dock"
  | "following";

export interface JanuszSnapshot {
  x: number;
  z: number;
  /** False while Janusz has not walked in yet (C-51) or is gone home. */
  visible: boolean;
}

export interface RobotBrainOptions {
  route: RobotPatrolRoute;
  obstacles: ReadonlyArray<AABB>;
  rng: () => number;
  getPeriod: () => TimeOfDay;
  getJanusz: () => JanuszSnapshot | null;
  /** Chance, per finished duty stop, that the robot swings by Janusz. */
  followChance?: number;
  /** Minimum seconds between follow detours. */
  followCooldownS?: number;
  /** A detour never lasts longer than this (hard cap). */
  followDurationS?: number;
  /** Seconds spent parked near Janusz before breaking off. */
  lingerS?: number;
  /** How close the robot parks to Janusz while following. */
  standoffDistance?: number;
  /** The detour only fires when the robot is already this close. */
  followRange?: number;
  /** Base seconds spent charging on the pad before undocking. */
  dockWaitS?: number;
}

export interface RobotBrainView {
  state: RobotBrainStateName;
  x: number;
  z: number;
  face: number;
  /** True while paused at a duty stop (the mesh plays the work anim). */
  working: boolean;
  /** True while on the rare Janusz detour. */
  followingJanusz: boolean;
}

interface Vec2 {
  x: number;
  z: number;
}

const DEFAULTS = {
  followChance: 0.06,
  followCooldownS: 90,
  followDurationS: 16,
  lingerS: 3,
  standoffDistance: 1.1,
  followRange: 10,
  dockWaitS: 6,
} as const;

/** Seconds between follow-target recomputes (Janusz does move). */
const FOLLOW_RETARGET_S = 1;

/* ------------------------------------------------------------------ */
/* Movement primitive                                                  */
/* ------------------------------------------------------------------ */

/** True when a circle at (x, z) overlaps any obstacle AABB. */
function pointBlocked(
  x: number,
  z: number,
  radius: number,
  obstacles: ReadonlyArray<AABB>,
): boolean {
  for (const o of obstacles) {
    const closestX = Math.max(o.minX, Math.min(x, o.maxX));
    const closestZ = Math.max(o.minZ, Math.min(z, o.maxZ));
    const dx = x - closestX;
    const dz = z - closestZ;
    if (dx * dx + dz * dz < radius * radius) return true;
  }
  return false;
}

/**
 * Advance from `pos` toward `target` by at most `dist`, never stepping
 * into an inflated obstacle. Tries the direct step first; if it is
 * blocked, tries a fan of sidesteps around the heading (the same
 * slide-around-a-convex-corner idea as the NPC blocked ladder). When
 * every candidate is blocked the robot stands still for this frame -
 * standing somewhere safe beats clipping through a desk.
 */
export function stepToward(
  pos: Vec2,
  target: Vec2,
  dist: number,
  radius: number,
  obstacles: ReadonlyArray<AABB>,
): { x: number; z: number; arrived: boolean } {
  const dx = target.x - pos.x;
  const dz = target.z - pos.z;
  const distance = Math.hypot(dx, dz);

  if (distance <= dist) {
    if (!pointBlocked(target.x, target.z, radius, obstacles)) {
      return { x: target.x, z: target.z, arrived: true };
    }
    // The target cell itself is blocked: creep as close as the fan
    // allows instead of teleporting onto the obstacle.
  }

  const step = Math.min(dist, distance);
  const heading = Math.atan2(dx, dz);
  const candidateAngles = [
    0,
    Math.PI / 6,
    -Math.PI / 6,
    Math.PI / 3,
    -Math.PI / 3,
    Math.PI / 2,
    -Math.PI / 2,
    (2 * Math.PI) / 3,
    -(2 * Math.PI) / 3,
    (5 * Math.PI) / 6,
    -(5 * Math.PI) / 6,
  ];
  for (const offset of candidateAngles) {
    const angle = heading + offset;
    const cx = pos.x + Math.sin(angle) * step;
    const cz = pos.z + Math.cos(angle) * step;
    if (!pointBlocked(cx, cz, radius, obstacles)) {
      return { x: cx, z: cz, arrived: false };
    }
  }
  return { x: pos.x, z: pos.z, arrived: false };
}

/* ------------------------------------------------------------------ */
/* Rooms and doorway chain                                             */
/* ------------------------------------------------------------------ */

/** The three rooms a floor robot can be in. */
type RobotRoom = "office" | "kitchen" | "reception";

const ROOM_RECTS: ReadonlyArray<{
  room: RobotRoom;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}> = [
  { room: "kitchen", minX: 9, maxX: 19, minZ: -7, maxZ: 7 },
  { room: "reception", minX: -6, maxX: 6, minZ: 9, maxZ: 19 },
  { room: "office", minX: -9, maxX: 9, minZ: -9, maxZ: 9 },
];

function roomAt(p: Vec2): RobotRoom {
  for (const r of ROOM_RECTS) {
    if (p.x >= r.minX && p.x <= r.maxX && p.z >= r.minZ && p.z <= r.maxZ) {
      return r.room;
    }
  }
  return "office";
}

/** Doorway hops: a point inside the DESTINATION room, just past the
 *  doorway gap, so a leg that ends here is fully inside one room. */
const DOORWAY_HOPS: Readonly<Record<RobotRoom, Partial<Record<RobotRoom, Vec2>>>> = {
  office: { kitchen: { x: 10.2, z: 0.8 }, reception: { x: 0, z: 10.0 } },
  kitchen: { office: { x: 8.0, z: 0.8 } },
  reception: { office: { x: 0, z: 8.6 } },
};

/** Waypoints between `from` and `to`: empty when they share a room,
 *  otherwise the chain of doorway hops through the office (the kitchen
 *  and reception only connect through the office). */
function routeBetween(from: Vec2, to: Vec2): Vec2[] {
  const start = roomAt(from);
  const goal = roomAt(to);
  if (start === goal) return [];

  const chain: Vec2[] = [];
  let current: RobotRoom = start;
  let guard = 0;
  while (current !== goal && guard < 4) {
    guard += 1;
    const next: RobotRoom =
      current === "office"
        ? goal
        : goal === "office"
          ? "office"
          : "office"; // kitchen <-> reception detours through the office
    const hop = DOORWAY_HOPS[current][next];
    if (!hop) break; // unreachable: should not happen for these 3 rooms
    chain.push(hop);
    current = next;
  }
  return chain;
}

/* ------------------------------------------------------------------ */
/* The brain                                                           */
/* ------------------------------------------------------------------ */

export interface RobotBrain {
  update: (dt: number) => RobotBrainView;
  getView: () => RobotBrainView;
}

export function createRobotBrain(options: RobotBrainOptions): RobotBrain {
  const { route, obstacles, rng, getPeriod, getJanusz } = options;
  const followChance = options.followChance ?? DEFAULTS.followChance;
  const followCooldownS = options.followCooldownS ?? DEFAULTS.followCooldownS;
  const followDurationS = options.followDurationS ?? DEFAULTS.followDurationS;
  const lingerS = options.lingerS ?? DEFAULTS.lingerS;
  const standoffDistance = options.standoffDistance ?? DEFAULTS.standoffDistance;
  const followRange = options.followRange ?? DEFAULTS.followRange;
  const dockWaitS = options.dockWaitS ?? DEFAULTS.dockWaitS;

  const dock = route.stops[0]!;

  let state: RobotBrainStateName = "docked";
  let x = route.dock.x;
  let z = route.dock.z;
  let face = dock.face;

  /** Index of the stop currently targeted (to-work) or parked at. */
  let stopIndex = 1;
  let dwellRemaining = 0;
  let dockWaitRemaining = nextDockWait();
  let followCooldown = followCooldownS; // no detour right at boot
  let followElapsed = 0;
  let followHeld = 0;
  let retargetIn = 0;
  let legChain: Vec2[] = [];
  let legTarget: Vec2 = { x, z };

  function nextDockWait(): number {
    return dockWaitS + Math.max(0, (rng() - 0.5) * 3);
  }

  function isEvening(): boolean {
    return getPeriod() === "evening";
  }

  function currentStop(): RobotPatrolRoute["stops"][number] {
    return route.stops[stopIndex]!;
  }

  /** Waypoints to reach `target`: doorway hops first, then the target. */
  function beginLeg(target: Vec2): void {
    legChain = [...routeBetween({ x, z }, target), target];
    legTarget = legChain[0]!;
  }

  /** Advance one movement step along the current leg; returns true
   *  when the FINAL leg target has been reached. */
  function advanceLeg(speed: number, dt: number): boolean {
    const result = stepToward({ x, z }, legTarget, speed * dt, route.radius, obstacles);
    if (result.x !== x || result.z !== z) {
      face = Math.atan2(legTarget.x - x, legTarget.z - z);
      x = result.x;
      z = result.z;
    }
    if (!result.arrived) return false;
    if (legChain.length > 1) {
      legChain = legChain.slice(1);
      legTarget = legChain[0]!;
      return false;
    }
    return true;
  }

  /** The rare check: pass by the master when he is nearby. */
  function rollFollowDetour(): boolean {
    if (followCooldown > 0 || isEvening()) return false;
    const janusz = getJanusz();
    if (!janusz || !janusz.visible) return false;
    const distance = Math.hypot(x - janusz.x, z - janusz.z);
    if (distance > followRange) return false;
    if (roomAt({ x, z }) !== roomAt({ x: janusz.x, z: janusz.z })) return false;
    return rng() < followChance;
  }

  function beginFollow(): void {
    state = "following";
    followElapsed = 0;
    followHeld = 0;
    retargetIn = 0;
  }

  function endFollow(): void {
    followCooldown = followCooldownS;
    state = "to-dock";
    beginLeg({ x: route.dock.x, z: route.dock.z });
  }

  /** Called when a duty stop's dwell ends. */
  function afterDwell(): void {
    if (rollFollowDetour()) {
      beginFollow();
      return;
    }
    if (isEvening()) {
      state = "to-dock";
      beginLeg({ x: route.dock.x, z: route.dock.z });
      return;
    }
    const lastIndex = route.stops.length - 1;
    if (stopIndex === lastIndex) {
      state = "to-dock";
      beginLeg({ x: route.dock.x, z: route.dock.z });
      return;
    }
    stopIndex += 1;
    state = "to-work";
    beginLeg({ x: currentStop().x, z: currentStop().z });
  }

  function dockArrived(): void {
    state = "docked";
    x = route.dock.x;
    z = route.dock.z;
    face = dock.face;
    dockWaitRemaining = nextDockWait();
  }

  function update(dt: number): RobotBrainView {
    followCooldown = Math.max(0, followCooldown - dt);

    switch (state) {
      case "docked": {
        dockWaitRemaining -= dt;
        if (dockWaitRemaining <= 0) {
          if (isEvening()) {
            // Evening: stay plugged in. Re-check periodically so a
            // period change is picked up without busy-looping.
            dockWaitRemaining = 4;
          } else {
            stopIndex = 1;
            state = "to-work";
            beginLeg({ x: currentStop().x, z: currentStop().z });
          }
        }
        break;
      }

      case "to-work": {
        if (isEvening()) {
          state = "to-dock";
          beginLeg({ x: route.dock.x, z: route.dock.z });
          break;
        }
        if (advanceLeg(route.speed, dt)) {
          const stop = currentStop();
          face = stop.face;
          if (stop.dwellSeconds > 0.01) {
            state = "working";
            dwellRemaining = stop.dwellSeconds;
          } else {
            afterDwell();
          }
        }
        break;
      }

      case "working": {
        dwellRemaining -= dt;
        if (dwellRemaining <= 0) {
          afterDwell();
        }
        break;
      }

      case "to-dock": {
        if (advanceLeg(route.speed, dt)) {
          dockArrived();
        }
        break;
      }

      case "following": {
        const janusz = getJanusz();
        followElapsed += dt;
        if (!janusz || !janusz.visible || isEvening()) {
          endFollow();
          break;
        }
        const distance = Math.hypot(x - janusz.x, z - janusz.z);
        if (distance <= standoffDistance + 0.35) {
          // Parked at the master's side; linger, then break off.
          followHeld += dt;
          if (followHeld >= lingerS) {
            endFollow();
            break;
          }
        }
        retargetIn -= dt;
        if (retargetIn <= 0) {
          beginLeg(computeFollowTarget(janusz));
          retargetIn = FOLLOW_RETARGET_S;
        }
        advanceLeg(route.speed, dt);
        if (followElapsed >= followDurationS) {
          endFollow();
        }
        break;
      }
    }

    return getView();
  }

  /** The spot to park at: just outside Janusz on the robot's side, or
   *  the nearest free ring spot when that is inside furniture (Janusz
   *  stands next to his desk). */
  function computeFollowTarget(janusz: JanuszSnapshot): Vec2 {
    const dx = x - janusz.x;
    const dz = z - janusz.z;
    const distance = Math.hypot(dx, dz) || 1;
    const desired = {
      x: janusz.x + (dx / distance) * standoffDistance,
      z: janusz.z + (dz / distance) * standoffDistance,
    };
    if (!pointBlocked(desired.x, desired.z, route.radius, obstacles)) {
      return desired;
    }
    for (let i = 0; i < 12; i += 1) {
      const angle = (i / 12) * Math.PI * 2;
      const candidate = {
        x: janusz.x + Math.cos(angle) * standoffDistance,
        z: janusz.z + Math.sin(angle) * standoffDistance,
      };
      if (!pointBlocked(candidate.x, candidate.z, route.radius, obstacles)) {
        return candidate;
      }
    }
    return desired; // stepToward stalls safely against the obstacle
  }

  function getView(): RobotBrainView {
    return {
      state,
      x,
      z,
      face,
      working: state === "working",
      followingJanusz: state === "following",
    };
  }

  return { update, getView };
}

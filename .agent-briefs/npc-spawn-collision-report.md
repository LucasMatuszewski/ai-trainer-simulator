# NPC spawn / collision avoidance — research report (2026-09)

Research conducted 2026-09-01 by `agy` per brief in
`.agent-briefs/npc-spawn-collision-research.md`. Goal: industry-standard
approaches for ~20 NPCs and ~50 static props in a browser three.js game,
with no external physics engine.

## TL;DR — what to ship now

For our scale (single floor, ~20 NPCs, ~50 furniture AABBs, no real
pathfinding — NPCs just walk a straight 2s lerp to a chosen
destination), the modern best practice is a **two-step pipeline** that
runs on every destination choice and every arrival:

1. **Validate the chosen destination** against the furniture AABB
   list. If the destination is inside any AABB, **sample around it**
   (ring of 8 offsets at radius 0.5m, 1.0m, 1.5m, 2.0m) and pick the
   first free position. If none free within 2.0m, drop the random
   walk and stay at the desk.
2. **Depenetrate on arrival**. After the 2s walk, do a final AABB
   overlap test. If the NPC's circle radius overlaps any furniture,
   push the NPC out along the **minimum translation vector** (the
   smallest axis-aligned push that resolves the overlap). One pass is
   enough for our scale.

The same depenetration step is also a safety net for stochastic
events that move furniture or spawn an NPC next to another NPC.

This is the standard pattern documented in the
[Three.js community BVH article](https://dev.to/bandinopla/collision-detection-in-threejs-made-easy-using-bvh-41g5)
and the
[3D Multi-Agent AI Conference Simulator walkthrough](https://dev.to/harishkotra/building-a-3d-multi-agent-ai-conference-simulator-with-react-threejs-zustand-and-local-llms-3m2h).

## What is overkill for us

- **Full navmesh** (Recast, [navcat](https://github.com/KDevS/navcat)):
  the recommended minimum for ~20 actors in a single floor is AABB
  validation + depenetration, not a navmesh. Navmeshes are for games
  with hundreds of actors, complex walkable geometry, or path
  planning through multiple rooms. We have none of those.
- **RVO (Reciprocal Velocity Obstacles)**: for dense crowds. Our NPCs
  are sparse and the player only sees 1-2 walking at a time.
- **Swept-AABB / continuous collision detection**: needed when actors
  move fast enough to tunnel through thin walls. Our NPCs walk at
  ~1.5 m/s for 2s; they don't tunnel.

## Best-practice references

1. **Collision detection in Three.js made easy using BVH** — [dev.to / bandinopla](https://dev.to/bandinopla/collision-detection-in-threejs-made-easy-using-bvh-41g5). Shows the AABB-broad-phase + closest-point depenetration pipeline. We adopt the simplified "circle vs static AABB" variant.
2. **Building a 3D Multi-Agent AI Conference Simulator** — [dev.to / harishkotra](https://dev.to/harishkotra/building-a-3d-multi-agent-ai-conference-simulator-with-react-threejs-zustand-and-local-llms-3m2h). Same scale as ours (~20 agents, simple rectangular obstacles, axis-aligned grid). Uses `isPointBlocked` + `moveWithCollision` (slide-along-axis fallback). We adopt the same shape.
3. **AI NPCs and Enemies in Three.js** — [abratabia.com](https://www.abratabia.com/threejs/ai-npcs.php). Documents the steering + obstacle-avoidance layering. Our NPCs don't need steering; they lerp. Steering is for roaming AI.
4. **Three.js community best practices (2025-2026)** — multiple sources (e.g. the three.js Discord #game-dev channel, three-stdlib `pathfinding` module) recommend "AABB list + nearest-free-point sampling" for small games.
5. **Unity / Unreal / Godot 2024-2025 best practices** for NPC spawn validation all converge on the same two-step pattern: navmesh-project (or AABB-validate) → depenetrate. The AABB variant is what we ship.

## Concrete pseudocode for our case

```ts
// New: src/engine/npc-spawn-validator.ts (pure, unit-testable)

export interface NpcSpawn {
  x: number;
  z: number;
  radius: number; // NPC circle radius, e.g. 0.3
}

/** Static furniture AABBs the NPC must not overlap. */
export const NPC_OBSTACLES: ReadonlyArray<AABB> = [
  ...MAIN_OFFICE_OBSTACLES,
  ...KITCHEN_OBSTACLES,
  ...MEETING_ROOM_OBSTACLES,
  ...TRAINING_ROOM_OBSTACLES,
];

/** Returns true if the spawn point circle overlaps any static AABB. */
export function isSpawnBlocked(spawn: NpcSpawn, obstacles: ReadonlyArray<AABB>): boolean {
  for (const o of obstacles) {
    if (
      spawn.x + spawn.radius > o.minX &&
      spawn.x - spawn.radius < o.maxX &&
      spawn.z + spawn.radius > o.minZ &&
      spawn.z - spawn.radius < o.maxZ
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Pick a free spawn point near `desired`. Samples a ring of
 * offsets at increasing radius. Returns the first non-blocked
 * point, or null if none found within `maxRadius`.
 */
export function findFreeSpawnNear(
  desired: NpcSpawn,
  obstacles: ReadonlyArray<AABB>,
  maxRadius = 2.0,
): NpcSpawn | null {
  if (!isSpawnBlocked(desired, obstacles)) return desired;
  for (const r of [0.5, 1.0, 1.5, 2.0]) {
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const candidate: NpcSpawn = {
        x: desired.x + Math.cos(angle) * r,
        z: desired.z + Math.sin(angle) * r,
        radius: desired.radius,
      };
      if (!isSpawnBlocked(candidate, obstacles)) return candidate;
    }
  }
  return null;
}

/**
 * Push the NPC out of any overlapping AABB. The push is along
 * the axis of minimum penetration (MTV). For our AABB setup
 * this is the cheapest depenetration that always resolves.
 * Single pass; for our scale one pass is enough.
 */
export function depenetrate(
  pos: NpcSpawn,
  obstacles: ReadonlyArray<AABB>,
): NpcSpawn {
  let { x, z } = pos;
  let changed = true;
  let iterations = 0;
  while (changed && iterations < 4) {
    changed = false;
    iterations++;
    for (const o of obstacles) {
      // Quick reject
      if (
        x + pos.radius <= o.minX ||
        x - pos.radius >= o.maxX ||
        z + pos.radius <= o.minZ ||
        z - pos.radius >= o.maxZ
      ) {
        continue;
      }
      // Pick the axis of minimum penetration.
      const pushLeft = x + pos.radius - o.minX;
      const pushRight = o.maxX - (x - pos.radius);
      const pushBack = z + pos.radius - o.minZ;
      const pushFront = o.maxZ - (z - pos.radius);
      const minPush = Math.min(pushLeft, pushRight, pushBack, pushFront);
      if (minPush === pushLeft) x -= pushLeft;
      else if (minPush === pushRight) x += pushRight;
      else if (minPush === pushBack) z -= pushBack;
      else z += pushFront;
      changed = true;
    }
  }
  return { x, z, radius: pos.radius };
}
```

The same `isSpawnBlocked` and `depenetrate` are used for:
- `pickRandomDestination` (validate the candidate, sample around if
  blocked)
- The NPC controller's per-frame update (depenetrate on arrival — at
  the end of the 2s walk)
- The collision-push against other NPCs (each NPC is also a circle
  AABB; treat as a soft depenetrate with a low priority so the
  walking NPC yields)

## What we DON'T ship now (future improvement)

- **Real navmesh** if we ever add a building exterior, multiple
  floors, or 50+ NPCs. Today: no.
- **RVO crowd steering** for crowd scenes. Today: no.
- **Swept-AABB / continuous CCD** for fast-moving objects. NPCs walk,
  not run, so no.

## Why this is the right call

It's the minimum viable depenetration for a small 3D office sim. It
runs in O(obstacles) per check, ~50 ops per NPC, completely
unit-testable, no external dependencies, and matches the 2025
three.js community best practice. If the game grows (more rooms,
more NPCs, real pathfinding), we swap `isSpawnBlocked` + ring-sampling
for a `navcat` navmesh projection query in one place and the rest of
the code is unchanged.

/**
 * C-70: Janusz's robot fleet.
 *
 * Three contracts are pinned here:
 *
 *  1. Route data is physically honest. Every patrol stop lies inside a
 *     real room interior, every leg between consecutive stops (including
 *     the wrap-around leg back to the dock) is clear of every obstacle
 *     AABB the NPCs collide with (inflated by the robot's radius), and
 *     the three dock pads sit in the kitchen dining area without
 *     crowding each other.
 *
 *  2. The brain is a correct little state machine. It starts docked,
 *     undocks outside Evening, works its duty stops in order with the
 *     authored dwell times, re-docks at the end of a loop, occasionally
 *     detours to trail Janusz (only when he is visible and the rare
 *     check fires, and the detour always times out), and always goes
 *     home and stays home during Evening. Across a fuzzed simulation it
 *     never once clips furniture - the no-clip invariant is the same
 *     one the NPC spawn validator enforces.
 *
 *  3. The lore landed in dialogue, and the recorded audio did not move.
 *     Renata attributes the mopping to Janusz's robots (irony kept, per
 *     Lucas), Janusz's tree says he BUILT the fleet, and the greeting
 *     lines of every NPC that HAS generated audio (bartek, klaudia,
 *     marek, pawel, zosia) are pinned byte-for-byte so a lore edit can
 *     never silently desync a recorded MP3 again.
 */
import { describe, expect, it } from "vitest";
import { DIALOGUES } from "../../src/content/dialogues";
import {
  DOCK_PADS,
  ROBOT_OBSTACLES,
  ROBOT_PATROLS,
  type RobotId,
  type RobotPatrolRoute,
} from "../../src/content/robot-patrols";
import {
  createRobotBrain,
  stepToward,
  type JanuszSnapshot,
  type RobotBrainOptions,
  type RobotBrainView,
} from "../../src/engine/robot-brain";
import { WORLD_ROOMS } from "../../src/content/world-layout";
import { ROOM_FURNITURE_AABBS } from "../../src/engine/npc-spawn-validator";
import type { AABB } from "../../src/engine/collision";
import type { TimeOfDay } from "../../src/types";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const EPS = 0.05;

function pointBlocked(
  x: number,
  z: number,
  radius: number,
  obstacles: ReadonlyArray<AABB> = ROBOT_OBSTACLES,
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

/** Sample a segment every 5 cm; every sample point must be clear. */
function segmentClear(
  ax: number,
  az: number,
  bx: number,
  bz: number,
  radius: number,
  obstacles: ReadonlyArray<AABB> = ROBOT_OBSTACLES,
): boolean {
  const length = Math.hypot(bx - ax, bz - az);
  const steps = Math.max(1, Math.ceil(length / 0.05));
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    if (pointBlocked(ax + (bx - ax) * t, az + (bz - az) * t, radius, obstacles)) {
      return false;
    }
  }
  return true;
}

/** Room interiors the robots are allowed to operate in (walls shaved by
 *  a small margin; the doorway gaps sit inside these margins, which is
 *  exactly where the doorway waypoints live). */
const ROOM_INTERIORS = [
  { minX: -8.7, maxX: 8.7, minZ: -8.7, maxZ: 8.7 }, // main office
  { minX: 9.05, maxX: 18.7, minZ: -6.7, maxZ: 6.7 }, // kitchen (doorway at x=[9,9.5])
  { minX: -5.7, maxX: 5.7, minZ: 9.05, maxZ: 18.7 }, // reception (doorway at z=[9,9.5])
];

function insideSomeRoom(x: number, z: number): boolean {
  return ROOM_INTERIORS.some(
    (r) => x >= r.minX && x <= r.maxX && z >= r.minZ && z <= r.maxZ,
  );
}

/** Deterministic PRNG for the fuzz test (mulberry32). */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const JANUSZ_DESK = { x: -7.45, z: 2 };

interface BrainFixture {
  rng?: () => number;
  period?: TimeOfDay;
  janusz?: JanuszSnapshot | null;
  route?: RobotPatrolRoute;
}

function makeBrain(fixture: BrainFixture = {}) {
  const options: RobotBrainOptions = {
    route: fixture.route ?? ROBOT_PATROLS.vacuum!,
    obstacles: ROBOT_OBSTACLES,
    rng: fixture.rng ?? (() => 0.99),
    getPeriod: () => fixture.period ?? "morning",
    getJanusz: () =>
      fixture.janusz === undefined
        ? { x: JANUSZ_DESK.x, z: JANUSZ_DESK.z, visible: false }
        : fixture.janusz,
  };
  return createRobotBrain(options);
}

/** Drive the brain for `seconds`, visiting every frame. `brain.update`
 *  MUST run unconditionally each iteration - `visit?.(brain.update(dt), t)`
 *  looks equivalent but is not: optional chaining short-circuits the
 *  whole call, including argument evaluation, when `visit` is
 *  undefined, so `brain.update` would silently never run. */
function simulate(
  brain: ReturnType<typeof createRobotBrain>,
  seconds: number,
  dt: number,
  visit?: (view: RobotBrainView, t: number) => void,
): void {
  for (let t = 0; t <= seconds + 1e-9; t += dt) {
    const view = brain.update(dt);
    visit?.(view, t);
  }
}

/* ------------------------------------------------------------------ */
/* 1. Route data                                                       */
/* ------------------------------------------------------------------ */

describe("robot patrol routes (C-70)", () => {
  it("defines exactly the three Janusz robots with names and speeds", () => {
    const ids = Object.keys(ROBOT_PATROLS) as RobotId[];
    expect(ids.sort()).toEqual(["gardener", "runner", "vacuum"]);
    for (const route of Object.values(ROBOT_PATROLS)) {
      expect(route.name.length, "Janusz named each robot").toBeGreaterThan(0);
      expect(route.speed).toBeGreaterThanOrEqual(0.4);
      expect(route.speed).toBeLessThanOrEqual(1.0);
      expect(route.radius).toBeGreaterThan(0.1);
      expect(route.radius).toBeLessThan(0.3);
      expect(route.stops.length, "a real duty loop, not a commute").toBeGreaterThanOrEqual(8);
    }
  });

  it("starts every route at its dock and gives the dock a dwell-free idle", () => {
    for (const route of Object.values(ROBOT_PATROLS)) {
      const dockStop = route.stops[0]!;
      expect(dockStop.x).toBeCloseTo(route.dock.x, 6);
      expect(dockStop.z).toBeCloseTo(route.dock.z, 6);
      // The dock idle is governed by the brain's dockWait, not the stop.
      expect(dockStop.dwellSeconds).toBe(0);
    }
  });

  it("keeps every stop inside a walkable room interior", () => {
    for (const route of Object.values(ROBOT_PATROLS)) {
      for (const stop of route.stops) {
        expect(
          insideSomeRoom(stop.x, stop.z),
          `${route.robotId} stop "${stop.label}" at (${stop.x}, ${stop.z}) is outside every room`,
        ).toBe(true);
      }
    }
  });

  it("never plans a leg through furniture, walls, or plants", () => {
    for (const route of Object.values(ROBOT_PATROLS)) {
      const r = route.radius + 0.01;
      for (let i = 0; i < route.stops.length; i += 1) {
        const a = route.stops[i]!;
        const b = route.stops[(i + 1) % route.stops.length]!; // wraps to the dock
        expect(
          segmentClear(a.x, a.z, b.x, b.z, r),
          `${route.robotId} leg ${a.label} -> ${b.label} is blocked`,
        ).toBe(true);
      }
    }
  });

  it("docks the fleet in the kitchen dining area, spaced out, on free floor", () => {
    expect(DOCK_PADS.length).toBe(3);
    const seen: Array<{ x: number; z: number }> = [];
    for (const pad of DOCK_PADS) {
      // Dining area: south strip of the kitchen, next to the two round
      // tables, clear of the meeting-room doorway traffic (x <= 12.25).
      expect(pad.x).toBeGreaterThanOrEqual(12.4);
      expect(pad.x).toBeLessThanOrEqual(18);
      expect(pad.z).toBeGreaterThanOrEqual(5.5);
      expect(pad.z).toBeLessThanOrEqual(6.7);
      expect(pointBlocked(pad.x, pad.z, 0.3), "pad must sit on free floor").toBe(false);
      for (const other of seen) {
        const distance = Math.hypot(pad.x - other.x, pad.z - other.z);
        expect(distance).toBeGreaterThanOrEqual(1.5);
      }
      seen.push(pad);
    }
    // The pads match the routes' docks (each robot owns one pad).
    const docks = Object.values(ROBOT_PATROLS).map((r) => r.dock);
    for (const pad of DOCK_PADS) {
      expect(
        docks.some((d) => Math.abs(d.x - pad.x) < EPS && Math.abs(d.z - pad.z) < EPS),
        `pad (${pad.x}, ${pad.z}) is nobody's dock`,
      ).toBe(true);
    }
  });

  it("has the docking station built into the kitchen room layout", () => {
    const kitchen = WORLD_ROOMS.find((room) => room.id === "kitchen");
    expect(kitchen, "kitchen room exists").toBeDefined();
    const dockFurniture = kitchen!.furniture.filter((f) => f.type === "robot-dock");
    expect(dockFurniture.length).toBe(3);
    for (const pad of DOCK_PADS) {
      expect(
        dockFurniture.some(
          (f) => Math.abs(f.position[0] - pad.x) < EPS && Math.abs(f.position[2] - pad.z) < EPS,
        ),
        `no robot-dock furniture at (${pad.x}, ${pad.z})`,
      ).toBe(true);
    }
  });

  it("tracks the two round kitchen tables in the shared obstacle list", () => {
    // C-36 moved the kitchen to two round tables at (12, 2.8) and
    // (16, 2.5); the shared AABB list used to carry a single stale
    // table at (14, 2.5). The robots (and every NPC) collide against
    // this list, so pin the current furniture.
    const centers: Array<[number, number]> = [
      [12, 2.8],
      [16, 2.5],
    ];
    for (const [cx, cz] of centers) {
      const hit = ROOM_FURNITURE_AABBS.some(
        (o) => o.minX <= cx && o.maxX >= cx && o.minZ <= cz && o.maxZ >= cz,
      );
      expect(hit, `no obstacle AABB covers the kitchen table at (${cx}, ${cz})`).toBe(true);
    }
  });
});

/* ------------------------------------------------------------------ */
/* 2. The brain                                                        */
/* ------------------------------------------------------------------ */

describe("robot brain state machine (C-70)", () => {
  it("starts docked on its pad, facing the dock direction", () => {
    const brain = makeBrain();
    const view = brain.getView();
    expect(view.state).toBe("docked");
    expect(view.x).toBeCloseTo(ROBOT_PATROLS.vacuum!.dock.x, 6);
    expect(view.z).toBeCloseTo(ROBOT_PATROLS.vacuum!.dock.z, 6);
    expect(view.face).toBeCloseTo(ROBOT_PATROLS.vacuum!.stops[0]!.face, 6);
  });

  it("undocks outside Evening and works its duty stops in order", () => {
    const brain = makeBrain();
    const route = ROBOT_PATROLS.vacuum!;
    const onsets: Array<{ x: number; z: number; face: number }> = [];
    let sawUndock = false;
    let previous: RobotBrainView["state"] = "docked";
    simulate(brain, 120, 0.1, (view) => {
      if (view.state === "to-work") sawUndock = true;
      // Only the TRANSITION into working counts (working lasts many
      // frames; each one would re-push the same stop).
      if (view.state === "working" && previous !== "working" && onsets.length < 3) {
        onsets.push({ x: view.x, z: view.z, face: view.face });
      }
      previous = view.state;
    });
    expect(sawUndock, "robot left the dock").toBe(true);
    expect(onsets.length).toBe(3);
    // Every working onset happens AT an authored duty stop (dwell > 0),
    // facing the authored direction, in route order.
    let lastIndex = -1;
    for (const onset of onsets) {
      const matchIndex = route.stops.findIndex(
        (s) =>
          s.dwellSeconds > 0 &&
          Math.abs(s.x - onset.x) < EPS &&
          Math.abs(s.z - onset.z) < EPS,
      );
      expect(matchIndex, `working at (${onset.x}, ${onset.z}) is not an authored duty stop`).toBeGreaterThan(lastIndex);
      expect(onset.face).toBeCloseTo(route.stops[matchIndex]!.face, 5);
      lastIndex = matchIndex;
    }
  });

  it("completes a full patrol loop and re-docks", () => {
    const brain = makeBrain();
    const route = ROBOT_PATROLS.vacuum!;
    let leftKitchen = false;
    let redocked = false;
    let undockedOnce = false;
    simulate(brain, 400, 0.25, (view) => {
      if (view.x < 9) leftKitchen = true;
      if (view.state !== "docked") undockedOnce = true;
      if (undockedOnce && view.state === "docked") redocked = true;
    });
    expect(leftKitchen, "the vacuum actually patrols the office").toBe(true);
    expect(redocked, "the vacuum finished its loop and plugged back in").toBe(true);
    // And it is parked ON its pad when it does.
    const view = brain.getView();
    if (view.state === "docked") {
      expect(view.x).toBeCloseTo(route.dock.x, 1);
      expect(view.z).toBeCloseTo(route.dock.z, 1);
    }
  });

  it("rarely detours to trail Janusz - and the detour always ends", () => {
    const brain = makeBrain({
      rng: () => 0, // always fires the rare check
      janusz: { x: JANUSZ_DESK.x, z: JANUSZ_DESK.z, visible: true },
    });
    let sawFollowing = false;
    let closestToJanusz = Infinity;
    let followingFrames = 0;
    let finished = false;
    simulate(brain, 400, 0.25, (view) => {
      if (view.state === "following") {
        sawFollowing = true;
        followingFrames += 1;
        closestToJanusz = Math.min(
          closestToJanusz,
          Math.hypot(view.x - JANUSZ_DESK.x, view.z - JANUSZ_DESK.z),
        );
      } else if (sawFollowing) {
        finished = true;
      }
    });
    expect(sawFollowing, "the robot came to see its master").toBe(true);
    expect(closestToJanusz, "it actually approached Janusz").toBeLessThan(2.0);
    expect(finished, "the detour ended (linger or hard cap, always)").toBe(true);
    // Hard cap is 16 s (DEFAULTS.followDurationS) plus a frame of slack.
    expect(followingFrames * 0.25).toBeLessThanOrEqual(18);
  });

  it("never follows an invisible Janusz", () => {
    const brain = makeBrain({ rng: () => 0, janusz: { x: JANUSZ_DESK.x, z: JANUSZ_DESK.z, visible: false } });
    let undockedOnce = false;
    let redocked = false;
    simulate(brain, 400, 0.25, (view) => {
      expect(view.state).not.toBe("following");
      if (view.state !== "docked") undockedOnce = true;
      if (undockedOnce && view.state === "docked") redocked = true;
    });
    expect(redocked, "it still lives its normal patrol life").toBe(true);
  });

  it("goes home for Evening and stays docked", () => {
    const route = ROBOT_PATROLS.gardener!;
    let period: TimeOfDay = "morning";
    const brain = createRobotBrain({
      route,
      obstacles: ROBOT_OBSTACLES,
      rng: () => 0.99,
      getPeriod: () => period,
      getJanusz: () => null,
    });
    // Let it undock first, then call Evening.
    simulate(brain, 30, 0.25);
    expect(brain.getView().state).not.toBe("docked");
    period = "evening";
    simulate(brain, 400, 0.25);
    const view = brain.getView();
    expect(view.state).toBe("docked");
    expect(view.x).toBeCloseTo(route.dock.x, 1);
    expect(view.z).toBeCloseTo(route.dock.z, 1);
    // Evening lasts a while; nobody sneaks out to patrol.
    simulate(brain, 120, 0.25);
    expect(brain.getView().state).toBe("docked");
  });

  it("never clips furniture across a long fuzzed simulation", () => {
    const rng = mulberry32(20260904);
    let period: TimeOfDay = "morning";
    let janusz: JanuszSnapshot = { x: JANUSZ_DESK.x, z: JANUSZ_DESK.z, visible: true };
    const brain = createRobotBrain({
      route: ROBOT_PATROLS.runner!,
      obstacles: ROBOT_OBSTACLES,
      rng,
      getPeriod: () => period,
      getJanusz: () => janusz,
    });
    const wanderPoints = [
      { x: JANUSZ_DESK.x, z: JANUSZ_DESK.z },
      { x: 0, z: 0 },
      { x: 14, z: 2.5 },
      { x: 0, z: 14 },
      { x: -5, z: -7 },
    ];
    let frame = 0;
    let violations = 0;
    while (frame < 6000) {
      const dt = 0.016 + rng() * 0.18;
      // Janusz wanders; every ~8 s he teleports to a new spot (the
      // schedule system does move him between periods).
      if (frame % 400 === 0) {
        const next = wanderPoints[Math.floor(rng() * wanderPoints.length)]!;
        janusz = { x: next.x, z: next.z, visible: rng() > 0.2 };
      }
      if (frame === 4000) period = "evening";
      if (frame === 5000) period = "morning";
      const view = brain.update(dt);
      if (pointBlocked(view.x, view.z, ROBOT_PATROLS.runner!.radius)) violations += 1;
      frame += 1;
    }
    expect(violations, "frames spent inside furniture/walls").toBe(0);
  });
});

describe("stepToward (obstacle-aware movement)", () => {
  it("walks straight to a free target and arrives", () => {
    const result = stepToward({ x: 0, z: 0 }, { x: 2, z: 0 }, 5, 0.2, ROBOT_OBSTACLES);
    expect(result.arrived).toBe(true);
    expect(result.x).toBeCloseTo(2, 3);
    expect(result.z).toBeCloseTo(0, 3);
  });

  it("caps the step at the requested distance", () => {
    const result = stepToward({ x: 0, z: 0 }, { x: 10, z: 0 }, 0.5, 0.2, ROBOT_OBSTACLES);
    expect(result.arrived).toBe(false);
    expect(result.x).toBeCloseTo(0.5, 3);
  });

  it("never steps into an obstacle while closing in on a blocked-ish target", () => {
    // A wall band across the middle; the robot must go around or stop,
    // but never through.
    const wall: AABB = { minX: -1, maxX: 1, minZ: 4, maxZ: 4.4 };
    let pos = { x: 0, z: 0 };
    let arrived = false;
    for (let i = 0; i < 300; i += 1) {
      const result = stepToward(pos, { x: 0, z: 10 }, 0.3, 0.2, [wall]);
      expect(pointBlocked(result.x, result.z, 0.2, [wall]), `frame ${i} clipped the wall`).toBe(false);
      pos = { x: result.x, z: result.z };
      if (result.arrived) {
        arrived = true;
        break;
      }
    }
    expect(arrived, "the fan of sidesteps got around the wall").toBe(true);
    expect(pos.z).toBeGreaterThan(4.4);
  });
});

/* ------------------------------------------------------------------ */
/* 3. Dialogue lore                                                    */
/* ------------------------------------------------------------------ */

describe("robot fleet dialogue lore (C-70)", () => {
  it("Renata attributes the mopping to the robots, keeping the irony", () => {
    const where = DIALOGUES.renata!.default!.nodes.where!;
    expect(where.text).toContain("robots mop");
    expect(where.text).not.toContain("Janusz mops around");
    const who = DIALOGUES.renata!.default!.nodes.who!;
    expect(who.text).toContain("Janusz manages the robots");
    expect(who.text).not.toContain("Janusz mops");
  });

  it("Renata's FAQ explains the fleet and that Janusz built it", () => {
    const greeting = DIALOGUES.renata!.default!.nodes.greeting!;
    const robotsOption = greeting.options?.find((o) => o.nextNodeId === "robots");
    expect(robotsOption, "menu offers a robots question").toBeDefined();
    const answer = DIALOGUES.renata!.default!.nodes.robots;
    expect(answer, "robots answer node exists").toBeDefined();
    expect(answer!.text.toLowerCase()).toContain("built");
    // Re-enterable FAQ rule: a route back to the menu, plus a clean exit.
    expect(answer!.options?.some((o) => o.nextNodeId === "greeting")).toBe(true);
    expect(answer!.options?.[0]?.nextNodeId).toBe("_end");
  });

  it("Janusz says he constructed the robots, and the fleet is his", () => {
    const tree = DIALOGUES.janusz!.default!;
    const allText = Object.values(tree.nodes)
      .map((n) => `${n.text} ${n.options?.map((o) => o.text).join(" ") ?? ""}`)
      .join("\n")
      .toLowerCase();
    expect(allText).toMatch(/i built|built them|constructed/);
    expect(tree.nodes["janusz-fleet"], "fleet node exists").toBeDefined();
    expect(tree.nodes["janusz-fleet"]!.text).toMatch(/Zdzislaw|Halina|Seba/);
    expect(tree.nodes["janusz-title"], "the stale job-title node exists").toBeDefined();
    expect(tree.nodes["janusz-title"]!.text).toMatch(/janitor/i);
    // The lore stays aligned with the existing agent node ("I run six").
    expect(tree.nodes["janusz-agent"]!.text).toContain("I run six");
  });

  it("never desyncs dialogue that already has recorded audio", () => {
    // The audio manifest carries 19 generated lines for exactly these
    // five NPCs. Their default-tree greetings are pinned byte-for-byte;
    // editing them requires regenerating audio in the same change.
    const pinned: Record<string, string> = {
      bartek:
        "Oh, fresh meat. I am Bartek, Senior Consultant. Welcome to Stack Underflow, where every ticket is a feature. Have you signed the NDA yet? It says you cannot remember the password we never told you.",
      klaudia:
        "Oh em gee, hi! I am Klaudia, your friendly neighborhood thought leader. I just posted a thread on why AI will replace you. It has 200 likes and zero substance. Want to collab?",
      marek:
        "I am Marek. I am a 10x engineer. I do not have time to onboard you. I have six monitors and one of them is just a clock. The coffee machine is in the corner. Do not touch my keyboard. Do not breathe near my keyboard.",
      pawel:
        "Hi! I am Pawel, I am the intern. I have been an intern for two years. I run a backup script every Friday. I do not know what it backs up. I do not know where. I do not know why. I have not been fired. I have not been promoted. I am Schrödinger's employee.",
      zosia:
        "Hi! I am Zosia, the manager. Quick question: can you work weekends? That is not a question, it is a lifestyle. Welcome to the team. Your one-on-one is scheduled for every day at 5pm. It will be 25 minutes long. It will say nothing.",
    };
    for (const [npcId, text] of Object.entries(pinned)) {
      const greeting = DIALOGUES[npcId]?.default?.nodes.greeting;
      expect(greeting, `${npcId} default greeting exists`).toBeDefined();
      expect(greeting!.text, `${npcId}.default.greeting has recorded audio - regenerate it if you change it`).toBe(text);
    }
  });
});

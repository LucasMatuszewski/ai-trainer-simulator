import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { NPCS } from "../../src/content/npcs";
import {
  ALREADY_IN_AT_DAY_START,
  ARRIVAL_WINDOW_SECONDS,
  DOOR_LANE_HALF_WIDTH,
  LATE_ARRIVAL_AT,
  MIN_ARRIVAL_GAP_S,
  planMorningArrivals,
} from "../../src/content/npc-schedule";
import { createNpcController } from "../../src/engine/npc-controller";
import type { NpcId } from "../../src/types";

const ALL_IDS: NpcId[] = NPCS.map((npc) => npc.id);

function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0x1_0000_0000; };
}

function makeObject(id: NpcId): THREE.Object3D {
  const o = new THREE.Group();
  o.userData.npcId = id;
  for (const n of ["left-leg", "right-leg", "arm-left", "arm-right", "head", "body"]) {
    const c = new THREE.Object3D();
    c.name = n;
    o.add(c);
  }
  return o;
}

describe("planMorningArrivals (C-51)", () => {
  it("puts the five early birds at their desks with no walk", () => {
    const plan = planMorningArrivals(ALL_IDS, 1, lcg(7));
    const alreadyIn = plan.filter((a) => a.mode === "already-in").map((a) => a.npcId);
    expect(alreadyIn.sort()).toEqual([...ALREADY_IN_AT_DAY_START].sort());
    for (const arrival of plan) {
      if (arrival.mode === "already-in") expect(arrival.at).toBe(0);
    }
  });

  it("covers every NPC exactly once", () => {
    const plan = planMorningArrivals(ALL_IDS, 1, lcg(7));
    expect(plan.map((a) => a.npcId).sort()).toEqual([...ALL_IDS].sort());
  });

  it("never lets two people come through the door together", () => {
    // The whole point of C-51: the gap, not the avoidance system, is
    // what stops the door crowd. 13 humans on one point was the bug.
    for (const seed of [1, 2, 3, 11, 99]) {
      const walking = planMorningArrivals(ALL_IDS, 1, lcg(seed))
        .filter((a) => a.mode === "arrives")
        .sort((a, b) => a.at - b.at);
      for (let i = 1; i < walking.length; i += 1) {
        expect(walking[i]!.at - walking[i - 1]!.at).toBeGreaterThanOrEqual(MIN_ARRIVAL_GAP_S - 1e-9);
      }
    }
  });

  it("spreads the arrivals across the morning instead of the first 10 seconds", () => {
    const walking = planMorningArrivals(ALL_IDS, 1, lcg(7)).filter((a) => a.mode === "arrives");
    const last = Math.max(...walking.map((a) => a.at));
    // The old controller released everyone within 9.5 s.
    expect(last).toBeGreaterThan(60);
  });

  it("makes Janusz the late one, well after everyone else (PRD 11.1)", () => {
    const plan = planMorningArrivals(ALL_IDS, 1, lcg(7));
    const janusz = plan.find((a) => a.npcId === "janusz")!;
    expect(janusz.mode).toBe("arrives");
    const others = plan.filter((a) => a.mode === "arrives" && a.npcId !== "janusz");
    expect(janusz.at).toBeGreaterThan(Math.max(...others.map((a) => a.at)) + 20);
    expect(janusz.at).toBeGreaterThanOrEqual(LATE_ARRIVAL_AT.get("janusz")! - 10);
  });

  it("keeps a stable pecking order but a different day", () => {
    const dayOne = planMorningArrivals(ALL_IDS, 1, lcg(7));
    const dayTwo = planMorningArrivals(ALL_IDS, 2, lcg(31));
    const order = (plan: typeof dayOne): NpcId[] =>
      plan.filter((a) => a.mode === "arrives").sort((a, b) => a.at - b.at).map((a) => a.npcId);
    // Same people, same broad order (personality), different times.
    expect(order(dayOne)).toEqual(order(dayTwo));
    const at = (plan: typeof dayOne, id: NpcId): number => plan.find((a) => a.npcId === id)!.at;
    expect(ALL_IDS.some((id) => Math.abs(at(dayOne, id) - at(dayTwo, id)) > 0.5)).toBe(true);
  });

  it("gives each arrival its own door lane", () => {
    const plan = planMorningArrivals(ALL_IDS, 1, lcg(7));
    for (const arrival of plan) {
      expect(Math.abs(arrival.door.x)).toBeLessThanOrEqual(DOOR_LANE_HALF_WIDTH + 1e-9);
      // C-62: the spawn is deep inside the meeting room now, not on
      // the office side of the doorway.
      expect(arrival.door.z).toBeCloseTo(18.2, 5);
    }
    const lanes = plan.filter((a) => a.mode === "arrives").map((a) => a.door.x);
    expect(new Set(lanes.map((x) => x.toFixed(4))).size).toBeGreaterThan(1);
  });

  it("keeps the arrival window inside the morning period", () => {
    const walking = planMorningArrivals(ALL_IDS, 1, lcg(7)).filter((a) => a.mode === "arrives");
    for (const arrival of walking) {
      expect(arrival.at).toBeGreaterThanOrEqual(0);
      expect(arrival.at).toBeLessThan(180);
    }
    expect(ARRIVAL_WINDOW_SECONDS).toBeLessThan(180);
  });
});

describe("morning entry in the controller (C-51)", () => {
  it("shows the early birds at their desks and hides the rest until they arrive", () => {
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const n of NPCS) objects[n.id] = makeObject(n.id);
    const controller = createNpcController(NPCS, objects, () => "morning", () => 1, lcg(2024), () => false);
    controller.update(0);
    for (const id of ALREADY_IN_AT_DAY_START) {
      expect(objects[id]!.visible).toBe(true);
      expect(objects[id]!.userData.npcState).not.toBe("walking");
    }
    // Nobody is stacked on the door point at t=0 any more.
    const atDoor = NPCS.filter(
      (n) => objects[n.id]!.visible && Math.hypot(objects[n.id]!.position.x, objects[n.id]!.position.z - 8.4) < 3,
    );
    expect(atDoor.length).toBeLessThanOrEqual(2);
  });

  it("never crowds the door, and everyone still reaches their desk", () => {
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const n of NPCS) objects[n.id] = makeObject(n.id);
    const controller = createNpcController(NPCS, objects, () => "morning", () => 1, lcg(2024), () => false);
    const dt = 1 / 30;
    let peakAtDoor = 0;
    let frozenAtDoor = 0;
    let longestSingleFreeze = 0;
    const runNow = new Map<NpcId, number>();
    const prev = new Map<NpcId, THREE.Vector3>();
    for (const n of NPCS) prev.set(n.id, objects[n.id]!.position.clone());
    for (let i = 0; i < Math.round(180 / dt); i += 1) {
      controller.update(dt);
      let near = 0;
      for (const n of NPCS) {
        const o = objects[n.id]!;
        if (!o.visible) { prev.set(n.id, o.position.clone()); continue; }
        const atDoor = Math.hypot(o.position.x, o.position.z - 8.4) < 3;
        if (atDoor) near += 1;
        if (o.userData.npcState === "walking" && o.position.distanceTo(prev.get(n.id)!) < 1e-4 && atDoor) {
          frozenAtDoor += dt;
          const run = (runNow.get(n.id) ?? 0) + dt;
          runNow.set(n.id, run);
          longestSingleFreeze = Math.max(longestSingleFreeze, run);
        } else runNow.set(n.id, 0);
        prev.set(n.id, o.position.clone());
      }
      peakAtDoor = Math.max(peakAtDoor, near);
    }
    // Was 13 of 14 NPCs at the door at once and 147.2 s of
    // frozen-at-the-door time across the morning.
    expect(peakAtDoor).toBeLessThanOrEqual(4);
    // The remaining stopped time is the C-49 chat pause (5 s when two
    // NPCs meet), not jamming - which is what the per-episode ceiling
    // below actually pins. The total is kept as a coarse regression
    // guard with headroom over the measured ~22 s.
    expect(frozenAtDoor).toBeLessThan(45);
    // No single stop at the door outlasts a chat plus a beat. A jam
    // would show up here long before it showed up in the total.
    expect(longestSingleFreeze).toBeLessThan(9);
    // And by the end of the morning everyone is in and settled.
    for (const n of NPCS) {
      expect(objects[n.id]!.visible).toBe(true);
      expect(objects[n.id]!.userData.npcState).not.toBe("walking");
    }
  });

  it("walks people in through the door again on day 2 instead of popping them into the office centre", () => {
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const n of NPCS) objects[n.id] = makeObject(n.id);
    let period: "morning" | "afternoon" | "evening" = "morning";
    let day = 1;
    const controller = createNpcController(NPCS, objects, () => period, () => day, lcg(5), () => false);
    const dt = 1 / 30;
    const run = (seconds: number): void => {
      for (let i = 0; i < Math.round(seconds / dt); i += 1) controller.update(dt);
    };
    run(180);
    period = "afternoon"; run(180);
    period = "evening"; run(180);
    // New day.
    period = "morning"; day = 2;
    controller.update(dt);
    // Nobody materialises in the middle of the office: every visible
    // NPC is either an early bird on their desk spot or at the door.
    for (const n of NPCS) {
      const o = objects[n.id]!;
      if (!o.visible) continue;
      const nearCentre = Math.hypot(o.position.x, o.position.z) < 1.5;
      expect(nearCentre).toBe(false);
    }
    run(180);
    for (const n of NPCS) expect(objects[n.id]!.visible).toBe(true);
  });
});

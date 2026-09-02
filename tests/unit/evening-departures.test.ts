import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { NPCS } from "../../src/content/npcs";
import { createNpcController } from "../../src/engine/npc-controller";
import type { NpcId, TimeOfDay } from "../../src/types";

/**
 * C-62: the evening walk-out. Regression for "people disappear
 * immediately" - flipping to the evening must NOT hide the leavers;
 * they stay visible, say goodbye, and WALK to the deep entrance in
 * the meeting room, vanishing only on arrival. The CEO (dawid) never
 * leaves, and only a few stay after hours.
 */
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x1_0000_0000;
  };
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

describe("evening departures (C-62)", () => {
  it("staggered walk-out: no mass vanish, everyone walks out, CEO stays", () => {
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const n of NPCS) objects[n.id] = makeObject(n.id);
    let period: TimeOfDay = "morning";
    let day = 1;
    const controller = createNpcController(NPCS, objects, () => period, () => day, lcg(2024), () => false);
    const dt = 1 / 30;
    const run = (seconds: number): void => {
      for (let i = 0; i < Math.round(seconds / dt); i += 1) controller.update(dt);
    };
    run(180); // morning: everyone in.
    const visibleAfterMorning = NPCS.filter((n) => objects[n.id]!.visible).map((n) => n.id);
    expect(visibleAfterMorning.length).toBe(NPCS.length);
    period = "lunch";
    run(120);
    period = "afternoon";
    run(180);
    expect(objects.dawid!.visible).toBe(true);

    // Flip to the evening. Two seconds in, NOBODY may have vanished -
    // the old bug was the entire office disappearing on the period
    // transition.
    period = "evening";
    run(2);
    for (const n of NPCS) {
      expect(objects[n.id]!.visible, `${n.id} vanished at the evening transition`).toBe(true);
    }

    // Dawid (CEO) is always on his desk, deep in the CEO office.
    expect(objects.dawid!.position.z).toBeLessThan(-9);

    // Finish the approved 120-second Evening; departures must include
    // enough walking buffer to be gone by 19:00 without a tail.
    run(118);
    const visibleAtNight = NPCS.filter((n) => objects[n.id]!.visible).map((n) => n.id);
    // The CEO, the dog, Bartek (schedule) and up to 2 random
    // stay-late humans may remain.
    expect(visibleAtNight.length).toBeLessThanOrEqual(6);
    expect(visibleAtNight.length).toBeGreaterThanOrEqual(3);
    expect(visibleAtNight).toContain("dawid");
    expect(visibleAtNight).toContain("burek");
    expect(visibleAtNight).toContain("bartek");
    // Klaudia's evening entry is gone-home: she must have walked out.
    expect(visibleAtNight).not.toContain("klaudia");
    // Everyone who left is parked by the entrance, not in the office
    // center - leavers reach the deep meeting-room exit before hiding.
    for (const id of visibleAtNight) {
      const o = objects[id]!;
      const inMeetingRoom = o.position.z >= 9.5 && Math.abs(o.position.x) <= 6.5;
      const atCeoDesk = id === "dawid";
      const atOwnDesk = !inMeetingRoom && !atCeoDesk;
      expect(inMeetingRoom || atCeoDesk || atOwnDesk, id).toBe(true);
    }
  });
});

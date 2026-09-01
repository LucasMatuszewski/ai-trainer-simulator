import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { NPCS } from "../../src/content/npcs";
import { createNpcController } from "../../src/engine/npc-controller";
import type { NpcId } from "../../src/types";
import type { Period } from "../../src/content/npc-schedule";

function makeObject(id: NpcId): THREE.Object3D {
  const o = new THREE.Group(); o.userData.npcId = id;
  for (const n of ["left-leg", "right-leg", "arm-left", "arm-right", "head", "body"]) {
    const c = new THREE.Object3D(); c.name = n; o.add(c);
  }
  return o;
}
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 0x1_0000_0000; };
}

describe("office day (C-48 v5 crowd-flow regression)", () => {
  it("keeps the office flowing - no standing around, no pacing marathons", () => {
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const n of NPCS) objects[n.id] = makeObject(n.id);
    let period: Period = "morning";
    let lunch = false;
    const controller = createNpcController(NPCS, objects, () => period, () => 1, lcg(2024), () => lunch);

    const frozenTotal = new Map<NpcId, number>();
    const frozenMax = new Map<NpcId, number>();
    const frozenNow = new Map<NpcId, number>();
    const reversals = new Map<NpcId, number>();
    const walked = new Map<NpcId, number>();
    const episodes = new Map<NpcId, number>();
    const lastDir = new Map<NpcId, number>();
    const prev = new Map<NpcId, THREE.Vector3>();
    for (const n of NPCS) {
      frozenTotal.set(n.id, 0); frozenMax.set(n.id, 0); frozenNow.set(n.id, 0);
      reversals.set(n.id, 0); lastDir.set(n.id, 0); prev.set(n.id, objects[n.id]!.position.clone());
      walked.set(n.id, 0); episodes.set(n.id, 0);
    }

    const dt = 1 / 30;
    const run = (seconds: number) => {
      for (let i = 0; i < Math.round(seconds / dt); i += 1) {
        controller.update(dt);

        for (const n of NPCS) {
          const o = objects[n.id]!;
          const moved = o.position.distanceTo(prev.get(n.id)!);
          const walking = o.userData.npcState === "walking";
          if (walking && moved < 1e-4) {
            frozenTotal.set(n.id, frozenTotal.get(n.id)! + dt);
            frozenNow.set(n.id, frozenNow.get(n.id)! + dt);
            frozenMax.set(n.id, Math.max(frozenMax.get(n.id)!, frozenNow.get(n.id)!));
          } else frozenNow.set(n.id, 0);
          if (walking && Math.abs(o.position.x - prev.get(n.id)!.x) > 0.01) {
            const d = Math.sign(o.position.x - prev.get(n.id)!.x);
            if (d !== 0 && lastDir.get(n.id)! !== 0 && d !== lastDir.get(n.id)!) reversals.set(n.id, reversals.get(n.id)! + 1);
            if (d !== 0) lastDir.set(n.id, d);
          }
          if (walking) { walked.set(n.id, walked.get(n.id)! + moved); }
          if (frozenNow.get(n.id)! >= 2 && frozenNow.get(n.id)! - dt < 2) episodes.set(n.id, episodes.get(n.id)! + 1);
          prev.set(n.id, o.position.clone());
        }
      }
    };

    run(300);                       // morning
    period = "afternoon"; lunch = true; run(120);  // lunch rush
    lunch = false; run(480);        // rest of afternoon
    period = "evening"; run(300);   // evening

    const rows = NPCS.map((n) => ({
      id: n.id,
      total: frozenTotal.get(n.id)!,
      max: frozenMax.get(n.id)!,
      rev: reversals.get(n.id)!,
      walked: walked.get(n.id)!,
      episodes: episodes.get(n.id)!,
    }));
    const totalFrozen = rows.reduce((sum, r) => sum + r.total, 0);
    const totalEpisodes = rows.reduce((sum, r) => sum + r.episodes, 0);
    const worstWalked = Math.max(...rows.map((r) => r.walked));
    const worstFreeze = Math.max(...rows.map((r) => r.max));

    // Measured against the pre-C-48-v5 controller on this exact
    // scenario: 2014s frozen, 375 jam episodes. These ceilings are set
    // well above the current numbers (270s / 54) so ordinary tuning
    // does not trip them, but a return of the old standing-around or
    // the pacing marathons would.
    expect(totalFrozen).toBeLessThan(800);
    expect(totalEpisodes).toBeLessThan(150);
    // Nobody paces: a day of walking is tens of metres, not hundreds.
    // The worst offender covered 905m before this was fixed.
    expect(worstWalked).toBeLessThan(250);
    // And no single stall runs long enough to read as "stuck".
    expect(worstFreeze).toBeLessThan(15);
  });
});

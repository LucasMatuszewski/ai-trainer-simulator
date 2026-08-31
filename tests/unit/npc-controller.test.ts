import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { KITCHEN_STOP_DWELL, type Period } from "../../src/content/npc-schedule";
import { NPCS } from "../../src/content/npcs";
import { advanceAlongPath, createNpcController, nextBarkDelay } from "../../src/engine/npc-controller";
import type { NPC, NpcId } from "../../src/types";

function npc(id: NpcId): NPC { return NPCS.find((candidate) => candidate.id === id)!; }
function makeObject(id: NpcId): THREE.Object3D {
  const object = new THREE.Group();
  object.userData.npcId = id;
  for (const name of ["left-leg", "right-leg", "arm-left", "arm-right"]) {
    const child = new THREE.Object3D(); child.name = name; object.add(child);
  }
  return object;
}

describe("advanceAlongPath", () => {
  it("advances across path segments using speed and delta time", () => {
    const result = advanceAlongPath(new THREE.Vector3(), [new THREE.Vector3(), new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 0, 2)], 0, 0, 1, 2);
    expect(result.position.toArray()).toEqual([1, 0, 1]);
    expect(result.segmentIndex).toBe(1);
    expect(result.distanceInSegment).toBeCloseTo(1);
    expect(result.finished).toBe(false);
    expect(result.face).toBeCloseTo(0);
  });

  it("does not move when speed is applied to a completed path", () => {
    const end = new THREE.Vector3(2, 0, 3);
    const result = advanceAlongPath(end, [new THREE.Vector3(), end], 1, 0, 4, 10);
    expect(result.position.toArray()).toEqual([2, 0, 3]);
    expect(result.finished).toBe(true);
  });
});

describe("nextBarkDelay", () => {
  it("draws deterministic delays in the inclusive 150-300 second range", () => {
    expect(nextBarkDelay(() => 0)).toBe(150);
    expect(nextBarkDelay(() => 0.5)).toBe(225);
    expect(nextBarkDelay(() => 1)).toBe(300);
  });
});

describe("createNpcController", () => {
  it("supports an empty NPC list and exposes its ids", () => {
    const controller = createNpcController([], {} as never, () => "morning", () => 1);
    expect(controller.getNpcIds()).toEqual([]);
    expect(() => controller.update(1 / 60)).not.toThrow();
    expect(() => controller.destroy()).not.toThrow();
  });

  it("re-plans an interrupted walk from the current position", () => {
    let period: Period = "morning";
    const object = makeObject("pawel");
    const controller = createNpcController([npc("pawel")], { pawel: object } as Record<NpcId, THREE.Object3D>, () => period, () => 1, () => 0);
    controller.update(0); period = "afternoon"; controller.update(1);
    const interrupted = object.position.clone();
    period = "evening"; controller.update(0); controller.update(0.5);
    expect(object.position.distanceTo(interrupted)).toBeLessThanOrEqual(npc("pawel").walkSpeed * 0.5 + 1e-6);
    expect(object.userData.npcState).toBe("walking");
  });

  it("visits kitchen stops in order with a dwell between walks", () => {
    const object = makeObject("bartek");
    const controller = createNpcController([npc("bartek")], { bartek: object } as Record<NpcId, THREE.Object3D>, () => "morning", () => 1, () => 0);
    controller.update(0);
    controller.setOverride("bartek", { position: { x: 14, y: 0, z: 1.2 }, face: Math.PI, state: "kitchen" });
    const dwellPositions: THREE.Vector3[] = [];
    let wasDwelling = false;
    for (let step = 0; step < 500; step += 1) {
      controller.update(0.25);
      const dwelling = object.userData.npcState === "dwelling";
      if (dwelling && !wasDwelling) dwellPositions.push(object.position.clone());
      wasDwelling = dwelling;
      if (dwellPositions.length === 3) break;
    }
    expect(dwellPositions.map((position) => [position.x, position.z])).toEqual([
      [13, -5.3],
      [15.2, -5.3],
      [17.5, -5.3],
    ]);
    expect(KITCHEN_STOP_DWELL.table).toBe(10);
  });

  it("delays lunch departure by the stagger offset", () => {
    let period: Period = "morning";
    const object = makeObject("bartek");
    const controller = createNpcController([npc("bartek")], { bartek: object } as Record<NpcId, THREE.Object3D>, () => period, () => 2, () => 0.5);
    controller.update(0); period = "afternoon"; controller.update(0);
    controller.setOverride("bartek", { position: { x: 14, y: 0, z: 1.2 }, face: Math.PI, state: "kitchen" });
    const before = object.position.clone();
    controller.update(0.9); expect(object.position.toArray()).toEqual(before.toArray());
    controller.update(0.2); expect(object.position.distanceTo(before)).toBeGreaterThan(0);
  });

  it("never bobs a stationary NPC that has arrived at its desk", () => {
    // C-45 morning entry: NPCs spawn at the door and WALK to the desk,
    // so the walk bob is legitimate until arrival. The invariant under
    // test is: once settled, the controller pins the ROOT y to baseY
    // (idle animations live on child bones only, never on the root).
    const object = makeObject("bartek");
    const controller = createNpcController([npc("bartek")], { bartek: object } as Record<NpcId, THREE.Object3D>, () => "morning", () => 1, () => 0);
    controller.update(0);
    // 50 s at 0.25 s steps: comfortably longer than the door -> desk walk.
    for (let step = 0; step < 200; step += 1) controller.update(0.25);
    expect(object.userData.npcState).toBe("at-desk");
    expect(object.position.y).toBe(0);
    controller.update(0.5); controller.update(1);
    expect(object.position.y).toBe(0);
    expect(object.userData.npcState).toBe("at-desk");
  });
});

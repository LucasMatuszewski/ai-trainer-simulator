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

  // --- C-46: rotating chatter pairs --------------------------------

  interface Harness {
    controller: ReturnType<typeof createNpcController>;
    objects: Record<NpcId, THREE.Object3D>;
    setRoll: (value: number) => void;
  }

  /** Mount a controller whose conversation gate is scriptable: roll
   *  >= 0.5 never passes the shouldStartExchange chance, roll = 0
   *  always does (after the interval has elapsed). */
  function mountHarness(ids: NpcId[], rng = (): number => 0): Harness {
    let roll = rng();
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const id of ids) objects[id] = makeObject(id);
    const controller = createNpcController(
      ids.map((id) => npc(id)),
      objects,
      () => "morning",
      () => 1,
      () => roll,
    );
    return { controller, objects, setRoll: (value: number) => { roll = value; } };
  }

  /** Teleport-free settle: run the morning entry until every NPC is
   *  at-desk at the given position (they walk there from the door). */
  function settleAt(harness: Harness, id: NpcId, x: number, z: number): void {
    harness.controller.setOverride(id, { position: { x, y: 0, z }, face: 0, state: "at-desk" });
  }

  function settled(harness: Harness): boolean {
    return harness.controller.getNpcIds().every((id) => harness.objects[id].userData.npcState === "at-desk");
  }

  it("starts a two-turn exchange and then cools the pair down", () => {
    const harness = mountHarness(["przemek", "ania"]);
    harness.controller.update(0);
    settleAt(harness, "przemek", 0, 0);
    settleAt(harness, "ania", 0.6, 0);
    harness.setRoll(0.6); // gate closed while they walk in
    for (let step = 0; step < 200 && !settled(harness); step += 1) harness.controller.update(0.25);
    expect(settled(harness)).toBe(true);
    expect(harness.controller.getActiveConversations()).toHaveLength(0);

    // 6 s of quiet satisfies the 3-6 s interval; then force one roll.
    harness.controller.update(1); harness.controller.update(1); harness.controller.update(1);
    harness.controller.update(1); harness.controller.update(1); harness.controller.update(1);
    harness.setRoll(0);
    harness.controller.update(1);
    const active = harness.controller.getActiveConversations();
    expect(active).toHaveLength(1);
    expect([active[0]!.a, active[0]!.b].sort()).toEqual(["ania", "przemek"]);
    expect(active[0]!.responseIn).toBeGreaterThan(0);

    // The partner answers after ~2.2 s: the exchange ends, total turns
    // were at most 2 (starter + response).
    harness.setRoll(0.6);
    for (let step = 0; step < 12; step += 1) harness.controller.update(0.25);
    expect(harness.controller.getActiveConversations()).toHaveLength(0);

    // Cooldown: the same pair may NOT immediately talk again even with
    // a passing roll.
    harness.setRoll(0);
    for (let step = 0; step < 8; step += 1) harness.controller.update(1);
    expect(harness.controller.getActiveConversations()).toHaveLength(0);
  });

  it("allows two simultaneous conversations only in different rooms", () => {
    const harness = mountHarness(["bartek", "zosia", "klaudia", "kasia"]);
    harness.controller.update(0);
    // Office pair + kitchen pair (floors per world-layout.ts).
    settleAt(harness, "bartek", 0, 0);
    settleAt(harness, "zosia", 1, 0);
    settleAt(harness, "klaudia", 13, -5);
    settleAt(harness, "kasia", 14, -5);
    harness.setRoll(0.6);
    for (let step = 0; step < 250 && !settled(harness); step += 1) harness.controller.update(0.25);
    expect(settled(harness)).toBe(true);

    harness.controller.update(1); harness.controller.update(1); harness.controller.update(1);
    harness.controller.update(1); harness.controller.update(1); harness.controller.update(1);
    // First roll: the first enumerated pair (bartek+zosia, office).
    harness.setRoll(0);
    harness.controller.update(1);
    expect(harness.controller.getActiveConversations()).toHaveLength(1);
    // Second roll one second later: the kitchen pair is allowed
    // because the active conversation is in a DIFFERENT room.
    harness.setRoll(0.6);
    harness.controller.update(1);
    harness.setRoll(0);
    harness.controller.update(1);
    const active = harness.controller.getActiveConversations();
    expect(active).toHaveLength(2);
    const pairIds = active.map((conversation) => [conversation.a, conversation.b].sort().join("+")).sort();
    expect(pairIds).toEqual(["bartek+zosia", "kasia+klaudia"]);

    // Both exchanges end after their responses.
    harness.setRoll(0.6);
    for (let step = 0; step < 16; step += 1) harness.controller.update(0.25);
    expect(harness.controller.getActiveConversations()).toHaveLength(0);
  });

  it("burek exchanges are one turn (a bark has no response)", () => {
    const harness = mountHarness(["burek", "ania"]);
    harness.controller.update(0);
    settleAt(harness, "burek", 0, 0);
    settleAt(harness, "ania", 0.6, 0);
    harness.setRoll(0.6);
    for (let step = 0; step < 200 && !settled(harness); step += 1) harness.controller.update(0.25);
    expect(settled(harness)).toBe(true);
    harness.controller.update(1); harness.controller.update(1); harness.controller.update(1);
    harness.controller.update(1); harness.controller.update(1); harness.controller.update(1);
    harness.setRoll(0);
    harness.controller.update(1);
    // Burek starts (rng 0 lands on his share of the weighted coin), so
    // the exchange is a single bark: nothing is awaiting a response.
    expect(harness.controller.getActiveConversations()).toHaveLength(0);
  });
});

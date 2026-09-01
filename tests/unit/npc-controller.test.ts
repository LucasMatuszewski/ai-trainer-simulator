import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { INTER_NPC_LINES, OFFICE_CHATTER } from "../../src/content/office-chatter";
import { LUNCH_DIALOGUES_HUMAN } from "../../src/content/lunch-dialogues";
import { KITCHEN_STOP_DWELL, type Period } from "../../src/content/npc-schedule";
import { NPCS } from "../../src/content/npcs";
import { advanceAlongPath, createNpcController, nextBarkDelay } from "../../src/engine/npc-controller";
import { PAIR_COOLDOWN_S, roomAt } from "../../src/engine/chatter";
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

  // --- C-46: rotating chatter pairs (invariant simulation) ---------

  interface Harness {
    controller: ReturnType<typeof createNpcController>;
    objects: Record<NpcId, THREE.Object3D>;
  }

  /** Deterministic LCG so long simulations are reproducible. */
  function lcg(seed: number): () => number {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0x1_0000_0000;
    };
  }

  function mountHarness(ids: NpcId[], rng: () => number): Harness {
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const id of ids) objects[id] = makeObject(id);
    const controller = createNpcController(
      ids.map((id) => npc(id)),
      objects,
      () => "morning",
      () => 1,
      rng,
    );
    return { controller, objects };
  }

  function placeAt(harness: Harness, id: NpcId, x: number, z: number): void {
    harness.controller.setOverride(id, { position: { x, y: 0, z }, face: 0, state: "at-desk" });
  }

  interface RecordedStart {
    pair: string;
    a: string;
    starterLine: string;
    at: number;
  }

  /** Simulate `seconds` of office life, recording chatter starts and
   *  checking the C-46 invariants on every step. */
  function simulate(harness: Harness, seconds: number): RecordedStart[] {
    const starts: RecordedStart[] = [];
    let previousKeys = new Set<string>();
    const steps = Math.round(seconds / 0.25);
    for (let step = 0; step < steps; step += 1) {
      harness.controller.update(0.25);
      const now = (step + 1) * 0.25;
      const active = harness.controller.getActiveConversations();
      // INVARIANT: never more than MAX_CONVERSATIONS at once...
      if (active.length > 2) throw new Error(`concurrency=${active.length}`);
      // ...and when two are active, they are in DIFFERENT rooms.
      if (active.length === 2) {
        const firstId = active[0]!.a as NpcId;
        const secondId = active[1]!.a as NpcId;
        const roomA = roomAt(harness.objects[firstId].position.x, harness.objects[firstId].position.z);
        const roomB = roomAt(harness.objects[secondId].position.x, harness.objects[secondId].position.z);
        if (roomA === roomB) throw new Error(`two conversations in ${roomA}`);
      }
      const keys = new Set(active.map((c) => [c.a, c.b].sort().join("|")));
      for (const conversation of active) {
        const key = [conversation.a, conversation.b].sort().join("|");
        if (!previousKeys.has(key)) {
          starts.push({ pair: key, a: conversation.a, starterLine: conversation.starterLine, at: now });
        }
      }
      previousKeys = keys;
    }
    return starts;
  }

  it("keeps chatter even, rotating and room-separated over five minutes", () => {
    const rng = lcg(42);
    const harness = mountHarness(["przemek", "maciek", "bartek", "kasia", "zosia", "dawid"], rng);
    harness.controller.update(0);
    // Office pair + kitchen pair + two loners far away.
    placeAt(harness, "przemek", 0, 0);
    placeAt(harness, "maciek", 0.8, 0);
    placeAt(harness, "bartek", 13, -5);
    placeAt(harness, "kasia", 14, -5);
    placeAt(harness, "zosia", 0, 14);
    placeAt(harness, "dawid", 0, -17);
    const starts = simulate(harness, 300);

    // Chatter happens, steadily: ~one start per 6-12 s plus overlap
    // gaps, so 5 minutes yield a bounded, non-bursty count.
    expect(starts.length).toBeGreaterThanOrEqual(15);
    expect(starts.length).toBeLessThanOrEqual(70);

    // Pair rotation: the same pair never starts twice within the
    // cooldown (cooldown is armed when the exchange resolves, which is
    // always after the start, so start-to-start >= COOLDOWN is safe).
    const previousStartByKey = new Map<string, number>();
    for (const start of starts) {
      const before = previousStartByKey.get(start.pair);
      if (before !== undefined) {
        expect(start.at - before).toBeGreaterThanOrEqual(PAIR_COOLDOWN_S);
      }
      previousStartByKey.set(start.pair, start.at);
    }

    // Chattiness weights: Sales (1.8) starts far more often than the
    // quiet CTO (0.3) when they are the standing office pair.
    const startsBy = (id: string) => starts.filter((s) => s.a === id).length;
    expect(startsBy("przemek")).toBeGreaterThan(startsBy("maciek"));
    // The CEO (0.3, and far away in his office) rarely or never starts.
    expect(startsBy("dawid")).toBeLessThanOrEqual(2);
  });

  it("respects topic affinities: quiet accountant never starts IT or janitor jokes", () => {
    const rng = lcg(7);
    const harness = mountHarness(["grazyna", "przemek", "bartek", "janusz"], rng);
    harness.controller.update(0);
    placeAt(harness, "grazyna", 0, 0);
    placeAt(harness, "przemek", 0.8, 0);
    placeAt(harness, "bartek", 13, -5);
    placeAt(harness, "janusz", 14, -5);
    const starts = simulate(harness, 240);
    expect(starts.length).toBeGreaterThan(0);
    const workLines = new Set(INTER_NPC_LINES);
    for (const start of starts) {
      expect(workLines.has(start.starterLine)).toBe(true);
      // grazyna may only start general or finance exchanges.
      if (start.a === "grazyna") {
        const exchange = OFFICE_CHATTER.find((candidate) => candidate.starter === start.starterLine);
        expect(exchange).toBeDefined();
        expect(["it", "janitor"]).not.toContain(exchange!.topic);
      }
    }
  });

  it("uses lunch lines by TIME and work lines otherwise", () => {
    const mountWithLunch = (lunch: boolean, seed: number): Harness => {
      const ids: NpcId[] = ["bartek", "kasia"];
      const rng = lcg(seed);
      const objects = {} as Record<NpcId, THREE.Object3D>;
      for (const id of ids) objects[id] = makeObject(id);
      const controller = createNpcController(
        ids.map((id) => npc(id)),
        objects,
        () => (lunch ? "afternoon" : "morning"),
        () => 1,
        rng,
        () => lunch,
      );
      controller.update(0);
      placeAt({ controller, objects }, "bartek", 0, 0);
      placeAt({ controller, objects }, "kasia", 0.8, 0);
      return { controller, objects };
    };

    // Lunch clock ON: every starter line comes from the lunch pool.
    const lunchHarness = mountWithLunch(true, 123);
    const lunchLines = new Set(LUNCH_DIALOGUES_HUMAN);
    const lunchStarts = simulate(lunchHarness, 120);
    expect(lunchStarts.length).toBeGreaterThan(0);
    for (const start of lunchStarts) {
      expect(lunchLines.has(start.starterLine)).toBe(true);
    }

    // Lunch clock OFF: every starter line comes from the work pool,
    // and none of them are lunch lines.
    const workHarness = mountWithLunch(false, 124);
    const workLines = new Set(INTER_NPC_LINES);
    const workStarts = simulate(workHarness, 120);
    expect(workStarts.length).toBeGreaterThan(0);
    for (const start of workStarts) {
      expect(workLines.has(start.starterLine)).toBe(true);
    }
  });
});

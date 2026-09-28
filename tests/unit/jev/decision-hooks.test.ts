import * as THREE from "three";
import { describe, expect, it, vi } from "vitest";
import { LUNCH_CHATTER } from "../../../src/content/lunch-dialogues";
import { pickMorningGreeting } from "../../../src/content/morning-greetings";
import { pickEveningGoodbye } from "../../../src/content/evening-goodbyes";
import { NPC_SCHEDULES, pickRandomDestination, type Period } from "../../../src/content/npc-schedule";
import { OFFICE_CHATTER } from "../../../src/content/office-chatter";
import { NPCS } from "../../../src/content/npcs";
import { pickPair, pickStarter, pickExchange, type ChatterPair } from "../../../src/engine/chatter";
import {
  createDefaultDecisionHooks,
  createNpcController,
  jevDecisionHooks,
} from "../../../src/engine/npc-controller";
import type { DecisionHooks } from "../../../src/jev/contracts";
import type { NpcId } from "../../../src/types";

/**
 * WS0 seam (ADR-0009 section 3.8 / section 10): the DecisionHooks
 * injection seam must be behavior-neutral. These tests prove:
 *
 *  1. the pre-bound hook defaults reproduce the legacy pickers
 *     exactly, under identically-seeded CONTINUOUS rng streams (same
 *     seed => same greeting / goodbye / pair / starter / exchange /
 *     destination picks as before the seam existed, and the same
 *     number of draws per call, so the streams never desync);
 *  2. an installed hook actually steers the controller;
 *  3. a full controller run driven purely through the hook API
 *     (explicit hooks pre-bound to the controller's own rng) produces
 *     a conversation timeline identical to the default path.
 */

/** Deterministic LCG matching the controller's own copyRandom constants. */
function lcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

const NPC_IDS = NPCS.map((npc) => npc.id);
const PERIODS: readonly Period[] = ["morning", "lunch", "afternoon", "evening"];
const SEEDS = [3, 77, 90210];

/** All NPCs placed at their authored morning desks, with limb children
 *  like the existing controller tests, so synchronizePeriod settles
 *  everyone instantly and chatter pairing has desk neighbours. */
function makeOfficeObjects(): Record<NpcId, THREE.Object3D> {
  const objects = {} as Record<NpcId, THREE.Object3D>;
  for (const npc of NPCS) {
    const object = new THREE.Group();
    object.userData.npcId = npc.id;
    for (const name of ["left-leg", "right-leg", "arm-left", "arm-right"]) {
      const child = new THREE.Object3D();
      child.name = name;
      object.add(child);
    }
    const morning = NPC_SCHEDULES[npc.id]!.morning!;
    object.position.set(morning.position.x, morning.position.y, morning.position.z);
    objects[npc.id] = object;
  }
  return objects;
}

describe("WS0 DecisionHooks: pre-bound defaults reproduce the legacy pickers", () => {
  it("default pickMorningGreeting tracks pickMorningGreeting(npcId, rng) in lockstep for every NPC", () => {
    for (const seed of SEEDS) {
      // Two identically-seeded CONTINUOUS streams: if the default
      // wrapper drew a different number of rng values than the legacy
      // call, the streams would desync and a later comparison fail.
      const hooks = createDefaultDecisionHooks({ rng: lcg(seed), getDay: () => 1 });
      const legacyRng = lcg(seed);
      for (const npcId of NPC_IDS) {
        expect(hooks.pickMorningGreeting(npcId)).toBe(pickMorningGreeting(npcId, legacyRng));
      }
    }
  });

  it("default pickEveningGoodbye tracks pickEveningGoodbye(npcId, rng) in lockstep for every NPC", () => {
    for (const seed of SEEDS) {
      const hooks = createDefaultDecisionHooks({ rng: lcg(seed), getDay: () => 1 });
      const legacyRng = lcg(seed);
      for (const npcId of NPC_IDS) {
        expect(hooks.pickEveningGoodbye(npcId)).toBe(pickEveningGoodbye(npcId, legacyRng));
      }
    }
  });

  it("default pickChatterPair tracks pickPair(pairs, rng), including the empty-list null", () => {
    const pairs: ChatterPair[] = [
      { a: "bartek", b: "marek", room: "main-office", distance: 2 },
      { a: "zosia", b: "kasia", room: "main-office", distance: 3.1 },
      { a: "janusz", b: "burek", room: "corridor", distance: 1.2 },
    ];
    for (const seed of SEEDS) {
      const hooks = createDefaultDecisionHooks({ rng: lcg(seed), getDay: () => 1 });
      const legacyRng = lcg(seed);
      for (let round = 0; round < 5; round += 1) {
        expect(hooks.pickChatterPair(pairs)).toEqual(pickPair(pairs, legacyRng));
      }
      // An empty candidate list yields null on both sides without
      // touching the stream.
      expect(hooks.pickChatterPair([])).toBeNull();
      expect(pickPair([], legacyRng)).toBeNull();
    }
  });

  it("default pickChatterStarter tracks pickStarter(a, b, rng) for sampled duos", () => {
    const duos: Array<[string, string]> = [
      ["bartek", "marek"],
      ["zosia", "grazyna"],
      ["burek", "janusz"],
      ["ania", "tomek"],
      ["dawid", "przemek"],
    ];
    for (const seed of SEEDS) {
      const hooks = createDefaultDecisionHooks({ rng: lcg(seed), getDay: () => 1 });
      const legacyRng = lcg(seed);
      for (let round = 0; round < 5; round += 1) {
        for (const [a, b] of duos) {
          expect(hooks.pickChatterStarter(a, b)).toBe(pickStarter(a, b, legacyRng));
        }
      }
    }
  });

  it("default pickChatterExchange reproduces a whole seeded pickExchange stream on both pools", () => {
    for (const seed of SEEDS) {
      for (const sourcePool of [OFFICE_CHATTER, LUNCH_CHATTER]) {
        // pickExchange remembers its last pick per pool IDENTITY (a
        // module-level WeakMap), so each side needs its own copy of the
        // pool: identical content, independent memory.
        const legacyPool = [...sourcePool];
        const hookPool = [...sourcePool];
        const hooks = createDefaultDecisionHooks({ rng: lcg(seed), getDay: () => 1 });
        const legacyRng = lcg(seed);
        for (let round = 0; round < 50; round += 1) {
          const speaker = NPC_IDS[round % NPC_IDS.length]!;
          const viaHook = hooks.pickChatterExchange(hookPool, speaker);
          const legacy = pickExchange(legacyPool, legacyRng, speaker);
          expect(viaHook.starter).toBe(legacy.starter);
          expect([...viaHook.responses]).toEqual([...legacy.responses]);
          expect(viaHook.topic).toBe(legacy.topic);
        }
      }
    }
  });

  it("default pickRandomDestination tracks pickRandomDestination(npcId, rng, day, period) in lockstep", () => {
    for (const seed of SEEDS) {
      const hooks = createDefaultDecisionHooks({ rng: lcg(seed), getDay: () => 4 });
      const legacyRng = lcg(seed);
      for (const npcId of NPC_IDS) {
        for (const period of PERIODS) {
          expect(hooks.pickRandomDestination(npcId, period))
            .toEqual(pickRandomDestination(npcId, legacyRng, 4, period));
        }
      }
    }
  });
});

describe("WS0 DecisionHooks: installed hooks steer the controller", () => {
  it("a pickChatterPair hook returning null prevents every conversation", () => {
    const controller = createNpcController(
      NPCS,
      makeOfficeObjects(),
      () => "morning",
      () => 1,
      lcg(5),
      () => false,
      { arrivals: false, chatter: true, hooks: { pickChatterPair: () => null } },
    );
    for (let step = 0; step < 80; step += 1) {
      controller.update(0.5);
      expect(controller.getActiveConversations()).toEqual([]);
    }
    controller.destroy();
  });

  it("a pickChatterStarter hook decides who starts every exchange", () => {
    const controller = createNpcController(
      NPCS,
      makeOfficeObjects(),
      () => "morning",
      () => 1,
      lcg(6),
      () => false,
      {
        arrivals: false,
        chatter: true,
        hooks: { pickChatterStarter: (a, b) => (a < b ? a : b) },
      },
    );
    const started: Array<[string, string]> = [];
    for (let step = 0; step < 140 && started.length < 3; step += 1) {
      controller.update(0.5);
      for (const conversation of controller.getActiveConversations()) {
        started.push([conversation.a, conversation.b]);
      }
    }
    expect(started.length).toBeGreaterThan(0);
    for (const [starter, responder] of started) {
      // The hook always picks the lexicographically smaller id as starter.
      expect(starter < responder).toBe(true);
    }
    controller.destroy();
  });

  it("hooks installed on the module-level jevDecisionHooks holder are picked up live", () => {
    jevDecisionHooks.pickChatterPair = () => null;
    try {
      const controller = createNpcController(
        NPCS,
        makeOfficeObjects(),
        () => "morning",
        () => 1,
        lcg(9),
        () => false,
        { arrivals: false, chatter: true },
      );
      for (let step = 0; step < 80; step += 1) {
        controller.update(0.5);
        expect(controller.getActiveConversations()).toEqual([]);
      }
      controller.destroy();
    } finally {
      delete jevDecisionHooks.pickChatterPair;
    }
  });
});

describe("WS0 DecisionHooks: hook-API run equals default run (same seed)", () => {
  /**
   * Runs a full-office timeline inside a FRESH module registry
   * (vi.resetModules + dynamic imports). This is what makes the A/B
   * comparison airtight: pickLine and pickExchange both remember the
   * last pick per ARRAY IDENTITY in module-level WeakMaps, so two runs
   * sharing one registry would desync each other. With one fresh
   * registry per run every module starts from the same clean state,
   * and the only difference between the runs is that run B routes
   * every decision through the DecisionHooks API (pre-bound to the
   * controller's own rng, exactly as a later wave would install it).
   */
  async function runFreshTimeline(withHooks: boolean): Promise<string[]> {
    vi.resetModules();
    const controllerMod = await import("../../../src/engine/npc-controller");
    const chatterMod = await import("../../../src/engine/chatter");
    const npcsMod = await import("../../../src/content/npcs");
    const schedulesMod = await import("../../../src/content/npc-schedule");
    const greetingsMod = await import("../../../src/content/morning-greetings");
    const goodbyesMod = await import("../../../src/content/evening-goodbyes");

    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const npc of npcsMod.NPCS) {
      const object = new THREE.Group();
      object.userData.npcId = npc.id;
      for (const name of ["left-leg", "right-leg", "arm-left", "arm-right"]) {
        const child = new THREE.Object3D();
        child.name = name;
        object.add(child);
      }
      const morning = schedulesMod.NPC_SCHEDULES[npc.id]!.morning!;
      object.position.set(morning.position.x, morning.position.y, morning.position.z);
      objects[npc.id] = object;
    }

    const rng = lcg(20260928);
    const hooks: DecisionHooks | undefined = withHooks
      ? {
          pickMorningGreeting: (npcId) => greetingsMod.pickMorningGreeting(npcId, rng),
          pickEveningGoodbye: (npcId) => goodbyesMod.pickEveningGoodbye(npcId, rng),
          pickChatterPair: (pairs) => chatterMod.pickPair(pairs, rng),
          pickChatterStarter: (a, b) => chatterMod.pickStarter(a, b, rng),
          pickChatterExchange: (pool, starterId) => chatterMod.pickExchange(pool, rng, starterId),
        }
      : undefined;
    const controller = controllerMod.createNpcController(
      npcsMod.NPCS,
      objects,
      () => "morning",
      () => 1,
      rng,
      () => false,
      { arrivals: false, chatter: true, hooks },
    );
    const frames: string[] = [];
    for (let step = 0; step < 140; step += 1) {
      controller.update(0.5);
      const snapshot = controller
        .getActiveConversations()
        .map((conversation) =>
          `${conversation.a}|${conversation.b}|${conversation.starterLine}|` +
          `${conversation.responseIn.toFixed(3)}`,
        )
        .sort();
      frames.push(snapshot.join(";;"));
    }
    controller.destroy();
    return frames;
  }

  it("explicit legacy-bound hooks produce the identical conversation timeline as the defaults", async () => {
    const defaults = await runFreshTimeline(false);
    const viaHooks = await runFreshTimeline(true);
    // The scenario must actually exercise chatter, or the comparison
    // proves nothing.
    expect(defaults.some((frame) => frame.length > 0)).toBe(true);
    expect(viaHooks).toEqual(defaults);
  });
});

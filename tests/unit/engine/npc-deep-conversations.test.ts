import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { NPCS } from "../../../src/content/npcs";
import { createNpcController } from "../../../src/engine/npc-controller";
import type { DeepConversationView } from "../../../src/engine/npc-controller";
import type { ReactionBucket } from "../../../src/game/social";
import type { NPC, NpcId } from "../../../src/types";

// C-78 REVISE v1: the controller integration of the authored NPC-NPC
// deep conversations. The pure pieces (selection runtime, runner) have
// their own suites; these tests pin the WIRING: an eligible pair plays
// the authored script through the live relationship band, the runner's
// lines render over time, the run settles exactly one bounded reaction
// through the callback, and a player dialogue hushes the run.

function npc(id: NpcId): NPC {
  return NPCS.find((candidate) => candidate.id === id)!;
}

function makeObject(id: NpcId): THREE.Object3D {
  const object = new THREE.Group();
  object.userData.npcId = id;
  for (const name of ["left-leg", "right-leg", "arm-left", "arm-right"]) {
    const child = new THREE.Object3D();
    child.name = name;
    object.add(child);
  }
  return object;
}

/** Deterministic LCG so long simulations are reproducible. */
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x1_0000_0000;
  };
}

interface HarnessOptions {
  getRelationship?: (a: NpcId, b: NpcId) => number;
  onConversationReaction?: (pair: [NpcId, NpcId], bucket: ReactionBucket) => void;
}

interface Harness {
  controller: ReturnType<typeof createNpcController>;
  objects: Record<NpcId, THREE.Object3D>;
}

function mountHarness(ids: NpcId[], rng: () => number, harnessOptions: HarnessOptions = {}): Harness {
  const objects = {} as Record<NpcId, THREE.Object3D>;
  for (const id of ids) objects[id] = makeObject(id);
  const controller = createNpcController(
    ids.map((id) => npc(id)),
    objects,
    () => "morning",
    () => 1,
    rng,
    () => false,
    { arrivals: false, ...harnessOptions },
  );
  return { controller, objects };
}

function placeAt(harness: Harness, id: NpcId, x: number, z: number): void {
  harness.controller.setOverride(id, { position: { x, y: 0, z }, face: 0, state: "at-desk" });
}

/** Drive `seconds` of office life, returning every deep-conversation
 *  view observed after each step (empty arrays included). */
function simulate(harness: Harness, seconds: number): DeepConversationView[][] {
  const observations: DeepConversationView[][] = [];
  const steps = Math.round(seconds / 0.25);
  for (let step = 0; step < steps; step += 1) {
    harness.controller.update(0.25);
    observations.push([...harness.controller.getActiveDeepConversations()]);
  }
  return observations;
}

describe("NPC-NPC deep conversations (controller integration, C-78 REVISE v1)", () => {
  it("plays an eligible authored script (with its full flattened path) instead of a single exchange", () => {
    // kasia + pawel at relationship 50 = neutral band: the evergreen
    // pipeline script (npcnpc-pk-pipeline, neutral x2) is eligible and
    // must REPLACE the legacy single-exchange flow.
    const harness = mountHarness(["kasia", "pawel"], lcg(11), {
      getRelationship: () => 50,
    });
    harness.controller.update(0);
    placeAt(harness, "kasia", 0, 0);
    placeAt(harness, "pawel", 0.8, 0);

    const observations = simulate(harness, 90);

    const started = observations.filter((views) => views.length > 0);
    expect(started.length).toBeGreaterThan(0);
    const scriptIds = new Set(started.flatMap((views) => views.map((view) => view.scriptId)));
    expect(scriptIds).toContain("npcnpc-pk-pipeline");

    // Deeper than starter+response: a 2-exchange script flattens to
    // starter, response, starter, response, band ending = 5 lines.
    const first = started[0]![0]!;
    expect(first.totalCount).toBeGreaterThanOrEqual(5);

    // The lines actually RENDER over time: the line index advances
    // while the run is on the air.
    const lineIndexes = started.map((views) => views[0]!.lineIndex);
    expect(Math.max(...lineIndexes)).toBeGreaterThan(0);
  });

  it("stages a rendezvous when a scripted cast is eligible but far apart (C-78 v1.1)", () => {
    // Desk geography rarely puts a scripted cast within CHATTER_RADIUS.
    // When the office is quiet and no adjacent pair qualified, the
    // controller stages a meeting: both members walk to validated
    // spots ~1.5 m apart, and the regular pairing dice fires the deep
    // script there. The placement overrides are RELEASED after setup
    // (production desk NPCs are schedule-driven, not overridden) and
    // the two re-plan to their authored desks, 10.7 m apart.
    const harness = mountHarness(["kasia", "pawel"], lcg(31), {
      getRelationship: () => 50,
    });
    harness.controller.update(0);
    placeAt(harness, "kasia", 0, 0);
    placeAt(harness, "pawel", 10, 0);
    simulate(harness, 6); // arrive at the far-apart spots
    harness.controller.setOverride("kasia", null);
    harness.controller.setOverride("pawel", null);

    const observations = simulate(harness, 240);

    const started = observations.filter((views) => views.length > 0);
    expect(started.length).toBeGreaterThan(0);
    expect(new Set(started.flatMap((views) => views.map((view) => view.scriptId))))
      .toContain("npcnpc-pk-pipeline");
  });

  it("releases the rendezvous pair back to their desks when the run settles (verdict finding 6)", () => {
    // Without the release, both participants stay pinned at the
    // meeting spot until the next period transition (and
    // rendezvousFree() then refuses to ever stage them again). After
    // the staged run completes, pawel must WALK HOME to his authored
    // desk - the pair separates again within a minute.
    const harness = mountHarness(["kasia", "pawel"], lcg(41), {
      getRelationship: () => 50,
    });
    harness.controller.update(0);
    placeAt(harness, "kasia", 0, 0);
    placeAt(harness, "pawel", 10, 0);
    simulate(harness, 6);
    harness.controller.setOverride("kasia", null);
    harness.controller.setOverride("pawel", null);

    // Drive until a deep run has actually PLAYED (not just staged)
    // and then fully settled.
    let sawRun = false;
    let settled = false;
    for (let step = 0; step < 360 * 2; step += 1) {
      harness.controller.update(0.25);
      const deep = harness.controller.getActiveDeepConversations().length;
      if (deep > 0) sawRun = true;
      if (sawRun && deep === 0 && step > 240) {
        settled = true;
        break;
      }
    }
    expect(settled).toBe(true);

    // Wait for the walk home; the pair must separate beyond chatter
    // radius (pawel's desk is 10.7 m from kasia's).
    let separated = false;
    for (let step = 0; step < 240; step += 1) {
      harness.controller.update(0.25);
      const d = harness.objects.kasia.position.distanceTo(harness.objects.pawel.position);
      if (d > 5) {
        separated = true;
        break;
      }
    }
    expect(separated).toBe(true);
  });

  it("does not stage a rendezvous while a member is already overridden", () => {
    // An override means another system owns the NPC (coffee trip,
    // event placement) - staging must not hijack it.
    const harness = mountHarness(["kasia", "pawel"], lcg(37), {
      getRelationship: () => 50,
    });
    harness.controller.update(0);
    placeAt(harness, "kasia", 0, 0);
    placeAt(harness, "pawel", 10, 0);
    simulate(harness, 6);
    // kasia stays overridden (a "coffee trip" stand-in); pawel is
    // released and re-plans to his authored desk, far from kasia.
    harness.controller.setOverride("pawel", null);

    const observations = simulate(harness, 240);
    expect(observations.every((views) => views.length === 0)).toBe(true);
  });

  it("settles exactly ONE non-neutral reaction through the callback when the run completes", () => {
    // kasia + marek at 25 = hostile band: the ticket-queue script's
    // last delivered beat is "offended". The callback must fire once
    // for the whole run - never per line, never "neutral".
    const reactions: Array<{ pair: [NpcId, NpcId]; bucket: ReactionBucket }> = [];
    const harness = mountHarness(["kasia", "marek"], lcg(23), {
      getRelationship: () => 25,
      onConversationReaction: (pair, bucket) => reactions.push({ pair, bucket }),
    });
    harness.controller.update(0);
    placeAt(harness, "kasia", 0, 0);
    placeAt(harness, "marek", 0.8, 0);

    const observations = simulate(harness, 120);

    const started = observations.filter((views) => views.length > 0);
    expect(started.length).toBeGreaterThan(0);
    expect(new Set(started.flatMap((views) => views.map((view) => view.scriptId))))
      .toContain("npcnpc-km-ticket-queue");

    // Exactly one settlement for the one completed run, with the
    // script's final emotional beat.
    expect(reactions.length).toBe(1);
    const settled = reactions[0]!;
    expect([...settled.pair].sort()).toEqual(["kasia", "marek"]);
    expect(settled.bucket).toBe("offended");

    // After the run completes, the deep list drains.
    expect(observations[observations.length - 1]!.length).toBe(0);
  });

  it("hushes the run when the player opens a dialogue with a participant", () => {
    const reactions: Array<{ pair: [NpcId, NpcId]; bucket: ReactionBucket }> = [];
    const harness = mountHarness(["kasia", "pawel"], lcg(5), {
      getRelationship: () => 50,
      onConversationReaction: (pair, bucket) => reactions.push({ pair, bucket }),
    });
    harness.controller.update(0);
    placeAt(harness, "kasia", 0, 0);
    placeAt(harness, "pawel", 0.8, 0);

    // Drive step by step until the deep run is on the air, then hush
    // in the same instant - the first line (pk-s1) is still on screen
    // and its dwell has not expired.
    let started = false;
    for (let step = 0; step < 360; step += 1) {
      harness.controller.update(0.25);
      if (harness.controller.getActiveDeepConversations().length > 0) {
        started = true;
        break;
      }
    }
    expect(started).toBe(true);

    // The delivered-beats rule: the pipeline's "annoyed" beat sits on
    // line 0, whose dwell has not expired, so nothing has settled yet.
    expect(reactions.length).toBe(0);
    harness.controller.setTalkingToPlayer("kasia");
    expect(harness.controller.getActiveDeepConversations().length).toBe(0);
    // A hush this early settles NOTHING - no emotional beat was fully
    // delivered before the player interrupted.
    expect(reactions.length).toBe(0);

    // ...and the hushed pair does not instantly restart: the deep
    // cooldown (2x the single-exchange cooldown) keeps the list empty
    // for the rest of a short window.
    const after = simulate(harness, 10);
    expect(after.every((views) => views.length === 0)).toBe(true);
  });

  it("leaves the legacy single-exchange flow alone when no script is eligible", () => {
    // Two NPCs whose pair has NO authored script at all: chatter must
    // fall back to the C-46 single-exchange flow (no deep runs, no
    // reaction dispatch).
    const reactions: Array<{ pair: [NpcId, NpcId]; bucket: ReactionBucket }> = [];
    const harness = mountHarness(["bartek", "zosia"], lcg(3), {
      getRelationship: () => 50,
      onConversationReaction: (pair, bucket) => reactions.push({ pair, bucket }),
    });
    harness.controller.update(0);
    placeAt(harness, "bartek", 0, 0);
    placeAt(harness, "zosia", 0.8, 0);

    let legacyStarts = 0;
    let deepSeen = false;
    let previous = new Set<string>();
    for (let step = 0; step < 360; step += 1) {
      harness.controller.update(0.25);
      if (harness.controller.getActiveDeepConversations().length > 0) deepSeen = true;
      const keys = new Set(
        harness.controller
          .getActiveConversations()
          .map((c) => [c.a, c.b].sort().join("|")),
      );
      for (const key of keys) {
        if (!previous.has(key)) legacyStarts += 1;
      }
      previous = keys;
    }
    expect(deepSeen).toBe(false);
    expect(reactions.length).toBe(0);
    // The legacy flow still ran: at least one exchange started.
    expect(legacyStarts).toBeGreaterThan(0);
  });
});

describe("NPC-NPC deep conversations (verdict re-round)", () => {
  it("settlement does not erase a REPLACEMENT pin from a stale staging marker", () => {
    // Staging records ownership; a period transition wipes the overrides
    // it owned. If the marker survived the transition, the NEXT deep
    // run's settlement would release pins owned by ANOTHER system (here:
    // the placement pins that let the dice fire a fresh run between the
    // two) and send both NPCs walking home to their desks.
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const id of ["kasia", "pawel"] as NpcId[]) objects[id] = makeObject(id);
    let currentPeriod: "morning" | "lunch" = "morning";
    const controller = createNpcController(
      (["kasia", "pawel"] as NpcId[]).map((id) => npc(id)),
      objects,
      () => currentPeriod,
      () => 1,
      lcg(31), // the proven staging seed (same as the staging test)
      () => false,
      { arrivals: false, getRelationship: () => 50 },
    );
    controller.update(0);
    placeAt({ controller, objects }, "kasia", 0, 0);
    placeAt({ controller, objects }, "pawel", 10, 0);
    for (let step = 0; step < 24; step += 1) controller.update(0.25);
    controller.setOverride("kasia", null);
    controller.setOverride("pawel", null);

    // PHASE 1: wait for the staging to CAPTURE the pair mid-walk. Both
    // settle at their desks first (the placement release re-plans them);
    // the staging then moves one of them AGAIN - that second movement
    // is the observable moment its ownership markers exist while NO run
    // has played or settled yet: exactly the stale-marker shape.
    const pawelDesk = { x: -3, z: 7.5 };
    let parked = false;
    for (let step = 0; step < 240 && !parked; step += 1) {
      controller.update(0.25);
      const atDesk =
        Math.hypot(objects.pawel!.position.x - pawelDesk.x, objects.pawel!.position.z - pawelDesk.z) < 0.6 &&
        Math.hypot(objects.kasia!.position.x - 7.5, objects.kasia!.position.z - 5.5) < 0.6;
      if (atDesk && step > 40) parked = true;
    }
    expect(parked, "the pair never settled at their desks").toBe(true);
    let stagedWalk = false;
    for (let step = 0; step < 240 * 3 && !stagedWalk; step += 1) {
      controller.update(0.25);
      const moved =
        Math.hypot(objects.pawel!.position.x - pawelDesk.x, objects.pawel!.position.z - pawelDesk.z) > 1.5 ||
        Math.hypot(objects.kasia!.position.x - 7.5, objects.kasia!.position.z - 5.5) > 1.5;
      if (moved) stagedWalk = true;
    }
    expect(stagedWalk, "staging never captured the pair (no second movement)").toBe(true);

    // PERIOD TRANSITION, mid-staged-walk: overrides wiped; the staging
    // ownership markers must die WITH them (no run ever settled).
    currentPeriod = "lunch";
    controller.update(0.25);

    // Replacement pins: both placed adjacent mid-office (NOT their
    // desks), so the dice fires a fresh deep run between them.
    placeAt({ controller, objects }, "kasia", 0, 0);
    placeAt({ controller, objects }, "pawel", 0.8, 0);

    // PHASE 2: drive until the fresh run plays AND settles.
    let sawRun2 = false;
    let settled2 = false;
    for (let step = 0; step < 240 * 2 && !settled2; step += 1) {
      controller.update(0.25);
      const deep = controller.getActiveDeepConversations().length;
      if (deep > 0) sawRun2 = true;
      else if (sawRun2 && step > 40) settled2 = true;
    }
    expect(sawRun2, "the replacement-pin run never played").toBe(true);
    expect(settled2, "the replacement-pin run never settled").toBe(true);

    // THE CONTRACT: the replacement pins survive settlement - both stay
    // at their PLACED mid-office spots. (A pair-distance assert would
    // pass vacuously: the lunch re-plan parks both in the small kitchen,
    // 6 m apart again.) With the stale-release bug they walk to their
    // schedule targets, ~10 m from the placed spots.
    for (let step = 0; step < 120; step += 1) controller.update(0.25);
    const kasiaDrift = Math.hypot(
      objects.kasia!.position.x - 0,
      objects.kasia!.position.z - 0,
    );
    const pawelDrift = Math.hypot(
      objects.pawel!.position.x - 0.8,
      objects.pawel!.position.z - 0,
    );
    expect(
      kasiaDrift,
      `kasia left her placed spot (${kasiaDrift.toFixed(1)} m) - replacement pin erased`,
    ).toBeLessThan(4);
    expect(
      pawelDrift,
      `pawel left his placed spot (${pawelDrift.toFixed(1)} m) - replacement pin erased`,
    ).toBeLessThan(4);
  });
});

describe("NPC-NPC deep conversations (re-check hardening)", () => {
  it("settlement preserves a pin an external system replaced mid-run", () => {
    // The re-check's own repro: staging owns Pawel's pin, the staged run
    // is ACTIVE, another system replaces his pin mid-run (a coffee trip
    // south). Settlement must leave the replacement alone - he walks
    // SOUTH to the replacement target, not home to his desk.
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const id of ["kasia", "pawel"] as NpcId[]) objects[id] = makeObject(id);
    const controller = createNpcController(
      (["kasia", "pawel"] as NpcId[]).map((id) => npc(id)),
      objects,
      () => "morning",
      () => 1,
      lcg(41), // the re-check's repro seed
      () => false,
      { arrivals: false, getRelationship: () => 50 },
    );
    controller.update(0);
    placeAt({ controller, objects }, "kasia", 0, 0);
    placeAt({ controller, objects }, "pawel", 10, 0);
    for (let step = 0; step < 24; step += 1) controller.update(0.25);
    controller.setOverride("kasia", null);
    controller.setOverride("pawel", null);

    // Wait for the staged run to be ACTIVE.
    let sawRun = false;
    for (let step = 0; step < 240 * 3 && !sawRun; step += 1) {
      controller.update(0.25);
      if (controller.getActiveDeepConversations().length > 0) sawRun = true;
    }
    expect(sawRun, "staged run never became active").toBe(true);

    // Mid-run replacement: Pawel is re-pinned deep south (a "coffee
    // trip" style walk). The drive loop abandons the run (his path is
    // now non-null) and settles it.
    controller.setOverride("pawel", { position: { x: 0, y: 0, z: -7 }, face: 0, state: "at-desk" });

    // Give settlement + the walk south time to play out.
    for (let step = 0; step < 240; step += 1) controller.update(0.25);

    expect(
      objects.pawel!.position.z,
      `pawel ended at z=${objects.pawel!.position.z.toFixed(2)} - the replacement pin was erased and he walked home`,
    ).toBeLessThan(-4);
  });
});

describe("NPC-NPC deep conversations (same-position replacement)", () => {
  it("a same-coords replacement during an active run survives settlement (cache-hit edge)", () => {
    // validateOverride caches per (npc, coords): a replacement at the
    // SAME coordinates would hand back the staged object and defeat
    // reference identity. The external-write boundary deletes the ref
    // regardless, so settlement cannot erase the replacement.
    const objects = {} as Record<NpcId, THREE.Object3D>;
    for (const id of ["kasia", "pawel"] as NpcId[]) objects[id] = makeObject(id);
    const controller = createNpcController(
      (["kasia", "pawel"] as NpcId[]).map((id) => npc(id)),
      objects,
      () => "morning",
      () => 1,
      lcg(41),
      () => false,
      { arrivals: false, getRelationship: () => 50 },
    );
    controller.update(0);
    placeAt({ controller, objects }, "kasia", 0, 0);
    placeAt({ controller, objects }, "pawel", 10, 0);
    for (let step = 0; step < 24; step += 1) controller.update(0.25);
    controller.setOverride("kasia", null);
    controller.setOverride("pawel", null);

    let sawRun = false;
    for (let step = 0; step < 240 * 3 && !sawRun; step += 1) {
      controller.update(0.25);
      if (controller.getActiveDeepConversations().length > 0) sawRun = true;
    }
    expect(sawRun, "staged run never became active").toBe(true);

    // Replacement at the STAGED coords themselves: the anchor is the
    // walk-home spot kasia settled at (her desk, ~(7.5, 5.5)); the bare
    // harness has no obstacles, so staging validated spoke 0 =
    // anchor + 1.5 m east. Issuing that exact request hits the
    // validateOverride cache and hands back the STAGED object - the
    // case where reference identity alone would erase a replacement.
    const stagedX = objects.kasia!.position.x + 1.5;
    const stagedZ = objects.kasia!.position.z;
    controller.setOverride("pawel", { position: { x: stagedX, y: 0, z: stagedZ }, face: 0, state: "at-desk" });

    for (let step = 0; step < 240; step += 1) controller.update(0.25);

    const drift = Math.hypot(
      objects.pawel!.position.x - stagedX,
      objects.pawel!.position.z - stagedZ,
    );
    expect(
      drift,
      `pawel drifted ${drift.toFixed(2)} m from the staged spot - the same-coords replacement was erased`,
    ).toBeLessThan(4);
  });
});

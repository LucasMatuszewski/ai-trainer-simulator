/**
 * WS6 (ADR-0009 D-53, PRD Flow F + AC-20/21/22): interaction points with
 * a bounded action lifecycle (reserved → in-use → done | failed |
 * interrupted), the faultable printer with its hold-repair, and the
 * schedule-override-style NPC trips.
 *
 * The module is pure data + state: no three.js at import time, positions
 * are numbers taken from src/content/world-layout.ts, and every sfx id
 * MUST resolve in the real generated audio manifest (a silently skipped
 * sound is a failure — eighth-verdict N2 / AC-20).
 */
import { describe, expect, it, beforeEach, afterEach } from "vitest";
// Vite-native JSON import (@types/node is not installed, so unit tests
// cannot use node:fs) — this is the same generated manifest the
// production loader fetches at runtime.
import manifestJson from "../../../public/assets/audio/manifest.json";
import {
  PRINTER_POINT_ID,
  REPAIR_DURATION_S,
  RESERVATION_TIMEOUT_S,
  activateAction,
  beginRepair,
  finishRepair,
  getInteractionPoint,
  getInteractionPointIds,
  getPointState,
  interruptAll,
  interruptPoint,
  isFaulted,
  onActionCompleted,
  registerBuiltinInteractionPoints,
  registerInteractionPoint,
  repairProgress,
  resetInteractionPoints,
  setFault,
  setFaultReadout,
  suggestNpcUse,
  updateInteractionPoints,
  updateRepair,
  usePoint,
  type CompletedAction,
} from "../../../src/engine/interaction-points";
import { resolveUrl, type Manifest } from "../../../src/audio/manifest";
import { roomAt } from "../../../src/engine/chatter";
import { getSoundSource, clearSoundSources } from "../../../src/audio/positional";

const manifest = manifestJson as unknown as Manifest;

beforeEach(() => {
  resetInteractionPoints();
  registerBuiltinInteractionPoints();
});

afterEach(() => {
  resetInteractionPoints();
  clearSoundSources();
});

describe("builtin interaction points (AC-20: at least three usable points)", () => {
  it("registers exactly the coffee machine, printer and whiteboard", () => {
    expect([...getInteractionPointIds()].sort()).toEqual(["coffee-machine", "printer", "whiteboard"]);
  });

  it("positions match the world-layout prop data", () => {
    // src/content/world-layout.ts: coffee-machine-kitchen [13.0, 0, -6.6],
    // xerox-printer [5.15, 0, 16.75], whiteboard [23, 1.5, -3.06].
    expect(getInteractionPoint("coffee-machine")?.position).toEqual({ x: 13.0, y: 0, z: -6.6 });
    expect(getInteractionPoint("printer")?.position).toEqual({ x: 5.15, y: 0, z: 16.75 });
    expect(getInteractionPoint("whiteboard")?.position).toEqual({ x: 23, y: 1.5, z: -3.06 });
  });

  it("declares the room the position actually classifies to (roomAt authority)", () => {
    for (const id of getInteractionPointIds()) {
      const def = getInteractionPoint(id)!;
      expect(roomAt(def.position.x, def.position.z), `room of ${id}`).toBe(def.room);
    }
  });

  it("the coffee machine carries the caffeine effect, the others are flavor", () => {
    expect(getInteractionPoint("coffee-machine")?.effect).toBe("caffeine");
    expect(getInteractionPoint("printer")?.effect).toBe("none");
    expect(getInteractionPoint("whiteboard")?.effect).toBe("none");
  });

  it("only the printer is faultable", () => {
    expect(getInteractionPoint("printer")?.faultable).toBe(true);
    expect(getInteractionPoint("coffee-machine")?.faultable).toBe(false);
    expect(getInteractionPoint("whiteboard")?.faultable).toBe(false);
  });

  it("feeds the positional sound registry (src/audio/positional.ts)", () => {
    for (const id of getInteractionPointIds()) {
      const source = getSoundSource(id);
      const def = getInteractionPoint(id)!;
      expect(source, `sound source for ${id}`).toBeDefined();
      expect(source!.getRoom!()).toBe(def.room);
      expect(source!.getPos()).toEqual({ x: def.position.x, z: def.position.z });
    }
  });
});

describe("sfx ids resolve in the real manifest (AC-20: a silently skipped sound is a failure)", () => {
  it("resolves every point's use sound through the production resolver", () => {
    for (const id of getInteractionPointIds()) {
      const def = getInteractionPoint(id)!;
      expect(resolveUrl(manifest, def.sfxId), `sfx of ${id}`).not.toBeNull();
    }
  });

  it("resolves the printer's fault sound (sfx_printer_jam exists as an asset)", () => {
    const faultSfx = getInteractionPoint(PRINTER_POINT_ID)?.faultSfxId;
    expect(faultSfx).toBeDefined();
    expect(resolveUrl(manifest, faultSfx!)).not.toBeNull();
  });
});

describe("bounded action lifecycle (D-53: reserved → in-use → done)", () => {
  it("usePoint reserves the point for exactly one actor", () => {
    const first = usePoint("whiteboard", "renata");
    expect(first).toEqual({ ok: true, actionId: expect.any(String), durationS: expect.any(Number) });
    expect(getPointState("whiteboard")).toBe("reserved");
    const second = usePoint("whiteboard", "bartek");
    expect(second).toEqual({ ok: false, reason: "busy" });
  });

  it("unknown points are rejected without state changes", () => {
    expect(usePoint("dishwasher", "bartek")).toEqual({ ok: false, reason: "unknown-point" });
  });

  it("a reserved action does not advance until activated", () => {
    const { actionId } = usePoint("whiteboard", "renata") as { actionId: string };
    const def = getInteractionPoint("whiteboard")!;
    updateInteractionPoints(def.durationS + 1);
    expect(getPointState("whiteboard")).toBe("reserved");
    activateAction(actionId);
    expect(getPointState("whiteboard")).toBe("in-use");
  });

  it("completes after durationS and frees the point, emitting the completed action", () => {
    const seen: CompletedAction[] = [];
    onActionCompleted((action) => seen.push(action));
    const { actionId, durationS } = usePoint("whiteboard", "renata") as {
      actionId: string;
      durationS: number;
    };
    activateAction(actionId);
    updateInteractionPoints(durationS / 2);
    expect(getPointState("whiteboard")).toBe("in-use");
    updateInteractionPoints(durationS);
    expect(getPointState("whiteboard")).toBe("idle");
    expect(seen).toEqual([
      { actionId, pointId: "whiteboard", actorId: "renata", effect: "none" },
    ]);
  });

  it("expires a stale reservation after RESERVATION_TIMEOUT_S (interrupted, freed)", () => {
    usePoint("whiteboard", "renata");
    updateInteractionPoints(RESERVATION_TIMEOUT_S - 1);
    expect(getPointState("whiteboard")).toBe("reserved");
    updateInteractionPoints(1);
    expect(getPointState("whiteboard")).toBe("idle");
    // The freed point accepts a new actor again.
    expect(usePoint("whiteboard", "bartek").ok).toBe(true);
  });
});

describe("interruption (scene close / companion takeover teardown seam)", () => {
  it("interruptPoint releases a reservation and an in-flight use", () => {
    const { actionId } = usePoint("whiteboard", "renata") as { actionId: string };
    interruptPoint("whiteboard");
    expect(getPointState("whiteboard")).toBe("idle");
    expect(activateAction(actionId)).toBe(false);
  });

  it("interruptAll tears everything down (scene close)", () => {
    usePoint("whiteboard", "renata");
    const printerUse = usePoint("printer", "bartek") as { actionId: string };
    activateAction(printerUse.actionId);
    interruptAll();
    expect(getPointState("whiteboard")).toBe("idle");
    expect(getPointState("printer")).toBe("idle");
  });
});

describe("printer fault state (AC-21: fault survives via the wired persisted bit)", () => {
  it("starts ok", () => {
    expect(isFaulted("printer")).toBe(false);
  });

  it("setFault jams new uses but leaves other points alone", () => {
    setFault("printer", true);
    expect(isFaulted("printer")).toBe(true);
    expect(usePoint("printer", "renata")).toEqual({ ok: false, reason: "jammed" });
    expect(usePoint("coffee-machine", "renata").ok).toBe(true);
  });

  it("only faultable points accept faults", () => {
    setFault("coffee-machine", true);
    expect(isFaulted("coffee-machine")).toBe(false);
  });

  it("isFaulted reads through the callback the orchestrator wires to game.get().equipment", () => {
    // No internal bit set — the persisted GameState is the authority.
    setFaultReadout((id) => (id === "printer" ? true : false));
    expect(isFaulted("printer")).toBe(true);
    expect(isFaulted("coffee-machine")).toBe(false);
    // Null restores the internal transient bit (tests / pre-wiring).
    setFaultReadout(null);
    expect(isFaulted("printer")).toBe(false);
  });

  it("clearing the fault re-opens the point", () => {
    setFault("printer", true);
    setFault("printer", false);
    expect(isFaulted("printer")).toBe(false);
    expect(usePoint("printer", "renata").ok).toBe(true);
  });
});

describe("hold-style repair (AC-21: player or NPC unjams the printer)", () => {
  it("REPAIR_DURATION_S is the specified 4 seconds of continuous holding", () => {
    expect(REPAIR_DURATION_S).toBe(4);
  });

  it("refuses to repair a printer that is not faulted", () => {
    expect(beginRepair("printer", "player")).toEqual({ ok: false, reason: "not-faulted" });
  });

  it("blocks ordinary use while a repair holds the point", () => {
    setFault("printer", true);
    expect(beginRepair("printer", "player").ok).toBe(true);
    expect(usePoint("printer", "renata")).toEqual({ ok: false, reason: "busy" });
    expect(beginRepair("printer", "bartek")).toEqual({ ok: false, reason: "busy" });
  });

  it("progresses 0..1 and auto-completes at REPAIR_DURATION_S, clearing the fault", () => {
    setFault("printer", true);
    beginRepair("printer", "player");
    expect(updateRepair(REPAIR_DURATION_S / 2)).toBeCloseTo(0.5, 10);
    expect(isFaulted("printer")).toBe(true);
    expect(updateRepair(REPAIR_DURATION_S)).toBe(1);
    expect(isFaulted("printer")).toBe(false);
    expect(repairProgress()).toBe(0);
    expect(getPointState("printer")).toBe("idle");
    expect(usePoint("printer", "renata").ok).toBe(true);
  });

  it("releasing the hold early interrupts the repair and the fault REMAINS", () => {
    setFault("printer", true);
    beginRepair("printer", "player");
    updateRepair(1);
    expect(finishRepair()).toMatchObject({ ok: false, reason: "interrupted" });
    expect(isFaulted("printer")).toBe(true);
    expect(repairProgress()).toBe(0);
    expect(getPointState("printer")).toBe("idle");
  });
});

describe("suggestNpcUse — schedule-override-style trips (AC-22)", () => {
  it("returns the exact ScheduleEntry stand spot for the printer (the Renata pattern)", () => {
    const trip = suggestNpcUse("renata", "printer");
    expect(trip).not.toBeNull();
    expect(trip!.npcId).toBe("renata");
    expect(trip!.pointId).toBe("printer");
    // Mirrors npc-controller.ts PRINTER_STOP: stand south of the xerox,
    // face 0 = +Z toward the machine.
    expect(trip!.destination).toEqual({ position: { x: 4.4, y: 0, z: 15.6 }, face: 0, state: "at-desk" });
    expect(trip!.dwellS).toBe(getInteractionPoint("printer")!.durationS);
    expect(trip!.sfxId).toBe("sfx_photocopier");
  });

  it("returns the kitchen coffee stand spot facing the machine", () => {
    const trip = suggestNpcUse("bartek", "coffee-machine");
    expect(trip!.destination).toEqual({
      position: { x: 13.0, y: 0, z: -5.5 },
      face: Math.PI,
      state: "at-desk",
    });
  });

  it("returns the training-room whiteboard stand spot facing the board", () => {
    const trip = suggestNpcUse("zosia", "whiteboard");
    expect(trip!.destination).toEqual({
      position: { x: 23, y: 0, z: -3.6 },
      face: 0,
      state: "at-desk",
    });
  });

  it("rejects unknown points", () => {
    expect(suggestNpcUse("renata", "dishwasher")).toBeNull();
  });
});

describe("registerInteractionPoint — the deliberate extension point (D-53 review trigger)", () => {
  it("accepts additional authored points with full lifecycle support", () => {
    registerInteractionPoint({
      id: "supply-shelf",
      position: { x: 0, y: 0, z: 0 },
      room: "main-office",
      sfxId: "sfx_click",
      baseVolume: 0.3,
      durationS: 1,
      effect: "none",
      faultable: false,
    });
    expect(usePoint("supply-shelf", "dawid").ok).toBe(true);
    expect(roomAt(0, 0)).toBe("main-office");
  });
});

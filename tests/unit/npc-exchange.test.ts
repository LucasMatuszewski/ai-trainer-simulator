import { describe, expect, it, vi } from "vitest";
import { createNpcExchange, type NpcExchangeDeps } from "../../src/webmcp/npc-exchange";

function setup() {
  const world = {
    busy: false, active: true,
    npc: { position: { x: 2, z: 0 }, visible: true } as ReturnType<NpcExchangeDeps["getNpc"]>,
    robot: { position: { x: 0, z: 0 }, walking: true },
  };
  const effects: string[] = [];
  const deps: NpcExchangeDeps = {
    isHumanBusy: () => world.busy,
    isActive: () => world.active,
    getNpc: () => world.npc,
    getRobot: () => world.robot,
    holdNpc: id => { effects.push(`hold:${id}`); },
    moveTo: vi.fn(() => { effects.push("move"); return { ok: true }; }),
    stopRobot: () => { effects.push("stop"); world.robot.walking = false; },
    faceEachOther: id => { effects.push(`face:${id}`); },
    sayRobot: line => { effects.push(`robot:${line}`); },
    sayNpc: (id, line) => { effects.push(`npc:${id}:${line}`); },
  };
  const exchange = createNpcExchange(deps);
  const start = () => exchange.start("bartek", "Hello", "Hi robot");
  const arrive = () => { world.robot.walking = false; exchange.update(0); };
  return { world, deps, effects, exchange, start, arrive };
}

describe("NPC exchange", () => {
  it("holds before moving, speaks each line once, and releases four seconds after the reply", () => {
    const { exchange, start, arrive, effects } = setup();
    expect(exchange.snapshot()).toBeNull();
    expect(start()).toEqual({ ok: true });
    expect(effects).toEqual(["hold:bartek", "move"]);
    expect(exchange.snapshot()).toEqual({ npcId: "bartek", status: "walking" });
    exchange.update(2);
    expect(effects).toHaveLength(2);
    arrive();
    expect(exchange.snapshot()?.status).toBe("waiting-reply");
    expect(effects.slice(-2)).toEqual(["face:bartek", "robot:Hello"]);
    exchange.update(2.5);
    expect(effects).not.toContain("npc:bartek:Hi robot");
    exchange.update(0.5);
    expect(exchange.snapshot()?.status).toBe("finishing");
    expect(effects.at(-1)).toBe("npc:bartek:Hi robot");
    exchange.update(3.5);
    expect(exchange.snapshot()).not.toBeNull();
    exchange.update(0.5);
    expect(exchange.snapshot()).toBeNull();
    exchange.update(100);
    expect(effects.filter(e => e.startsWith("robot:"))).toEqual(["robot:Hello"]);
    expect(effects.filter(e => e.startsWith("npc:"))).toEqual(["npc:bartek:Hi robot"]);
    expect(effects.filter(e => e === "face:bartek")).toHaveLength(5);
    expect(effects.at(-1)).toBe("hold:null");
  });

  it.each(["", "  ", "x".repeat(121)])("rejects invalid text %j without effects", text => {
    const { exchange, effects } = setup();
    expect(exchange.start("bartek", text, "reply").ok).toBe(false);
    expect(exchange.start("bartek", "line", text).ok).toBe(false);
    expect(exchange.start(text, "line", "reply").ok).toBe(false);
    expect(effects).toEqual([]);
  });

  it("preserves valid text exactly and accepts the 120 character boundary", () => {
    const { exchange, arrive, effects } = setup();
    const line = "x".repeat(120);
    expect(exchange.start("bartek", line, " Hi ").ok).toBe(true);
    arrive();
    exchange.update(3);
    expect(effects).toContain(`robot:${line}`);
    expect(effects).toContain("npc:bartek: Hi ");
  });

  it.each(["busy", "inactive", "missing", "hidden"])("rejects an unavailable start: %s", reason => {
    const { world, start, effects } = setup();
    if (reason === "busy") world.busy = true;
    if (reason === "inactive") world.active = false;
    if (reason === "missing") world.npc = null;
    if (reason === "hidden") world.npc!.visible = false;
    expect(start().ok).toBe(false);
    expect(effects).toEqual([]);
  });

  it("does not replace an exchange when another start is requested", () => {
    const { exchange, start, arrive, effects } = setup();
    start();
    expect(exchange.start("other", "Wrong", "Wrong reply").ok).toBe(false);
    expect(effects).toEqual(["hold:bartek", "move"]);
    arrive();
    exchange.update(3);
    expect(effects).toContain("npc:bartek:Hi robot");
  });

  it.each([true, false])("releases and stops after movement failure with reason=%s", withReason => {
    const { deps, exchange, start, effects } = setup();
    deps.moveTo = () => withReason ? { ok: false, reason: "blocked" } : { ok: false };
    const result = start();
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBeTruthy();
    if (withReason) expect(result).toEqual({ ok: false, reason: "blocked" });
    expect(exchange.snapshot()).toBeNull();
    expect(effects).toEqual(["hold:bartek", "stop", "hold:null"]);
  });

  it("times out an approach at 25 accumulated seconds without speaking", () => {
    const { exchange, start, effects } = setup();
    start();
    exchange.update(24.5);
    expect(exchange.snapshot()?.status).toBe("walking");
    exchange.update(0.5);
    expect(exchange.snapshot()).toBeNull();
    expect(effects).toEqual(["hold:bartek", "move", "stop", "hold:null"]);
  });

  it.each([0.69, 3.51, NaN, Infinity])("never speaks after stopping outside range at %s", x => {
    const { world, exchange, start, arrive, effects } = setup();
    world.npc!.position.x = x;
    start();
    arrive();
    exchange.update(100);
    expect(exchange.snapshot()).toBeNull();
    expect(effects).toEqual(["hold:bartek", "move", "stop", "hold:null"]);
  });

  it.each([0.7, 3.5])("accepts conversational distance boundary %s", x => {
    const { world, start, arrive, effects } = setup();
    world.npc!.position.x = x;
    start();
    arrive();
    expect(effects).toContain("robot:Hello");
  });

  it.each(["walking", "waiting-reply", "finishing"])("cancels safely twice during %s and allows a fresh exchange", phase => {
    const { exchange, start, arrive, effects } = setup();
    start();
    if (phase !== "walking") arrive();
    if (phase === "finishing") exchange.update(3);
    exchange.cancel();
    const count = effects.length;
    exchange.cancel();
    exchange.update(100);
    expect(effects).toHaveLength(count);
    expect(effects.slice(-2)).toEqual(["stop", "hold:null"]);
    expect(exchange.snapshot()).toBeNull();
    expect(start().ok).toBe(true);
  });

  it.each(["busy", "inactive", "missing", "hidden", "distant", "walking"])("cancels before a late reply when %s", reason => {
    const { world, exchange, start, arrive, effects } = setup();
    start();
    arrive();
    if (reason === "busy") world.busy = true;
    if (reason === "inactive") world.active = false;
    if (reason === "missing") world.npc = null;
    if (reason === "hidden") world.npc!.visible = false;
    if (reason === "distant") world.robot.position.z = 10;
    if (reason === "walking") world.robot.walking = true;
    exchange.update(3);
    exchange.update(100);
    expect(exchange.snapshot()).toBeNull();
    expect(effects).not.toContain("npc:bartek:Hi robot");
    expect(effects.slice(-2)).toEqual(["stop", "hold:null"]);
  });

  it("does not carry walking time into speech or skip the reply's four second display", () => {
    const { exchange, start, world, effects } = setup();
    start();
    world.robot.walking = false;
    exchange.update(20);
    expect(effects).not.toContain("npc:bartek:Hi robot");
    exchange.update(20);
    expect(exchange.snapshot()?.status).toBe("finishing");
    exchange.update(3.5);
    expect(exchange.snapshot()).not.toBeNull();
    exchange.update(0.5);
    expect(exchange.snapshot()).toBeNull();
  });

  it("ignores invalid elapsed time and returns a detached snapshot", () => {
    const { exchange, start, arrive, effects } = setup();
    start();
    const snapshot = exchange.snapshot()!;
    snapshot.status = "finishing";
    snapshot.npcId = "other";
    expect(exchange.snapshot()).toEqual({ npcId: "bartek", status: "walking" });
    arrive();
    for (const dt of [-10, NaN, Infinity]) exchange.update(dt);
    exchange.update(3);
    expect(effects).toContain("npc:bartek:Hi robot");
  });
});

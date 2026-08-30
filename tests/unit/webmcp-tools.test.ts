import { beforeEach, describe, expect, it, vi } from "vitest";

vi.hoisted(() => {
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
      clear: () => values.clear(),
    },
  });
});

import { game } from "../../src/game/state";
import { callTool, TOOLS } from "../../src/webmcp/tools";

describe("WebMCP tools", () => {
  beforeEach(() => {
    game.dispatch({ type: "reset" });
  });

  it("publishes at least six tool definitions", () => {
    expect(TOOLS.length).toBeGreaterThanOrEqual(6);
  });

  it("gives every tool a non-empty description", () => {
    expect(TOOLS.every((tool) => tool.description.trim().length > 0)).toBe(true);
  });

  it("returns a state-like JSON snapshot", () => {
    const result = callTool({ name: "get_state", parameters: {} });

    expect(result).toMatchObject({
      ok: true,
      data: { saveVersion: 1, day: 1, timeOfDay: "morning" },
    });
    if (result.ok) expect(result.data).not.toBe(game.get());
  });

  it("rejects an unknown tool", () => {
    expect(callTool({ name: "unknown_tool", parameters: {} })).toEqual({
      ok: false,
      error: "unknown tool",
    });
  });

  it("rejects set_flag when required parameters are missing", () => {
    expect(callTool({ name: "set_flag", parameters: {} })).toMatchObject({ ok: false });
  });

  it("sets a boolean flag in game state", () => {
    expect(callTool({
      name: "set_flag",
      parameters: { name: "test", value: true },
    })).toEqual({ ok: true, data: { name: "test", value: true } });
    expect(game.get().flags.test).toBe(true);
  });

  it("accepts the numeric flag form required by the tool contract", () => {
    expect(callTool({
      name: "set_flag",
      parameters: { name: "attempts", value: 3 },
    })).toEqual({ ok: true, data: { name: "attempts", value: 3 } });
    expect(game.get().flags.attempts).toBe(3);
  });

  it("lists NPC summaries", () => {
    const result = callTool({ name: "list_npcs", parameters: {} });

    expect(result).toMatchObject({ ok: true });
    if (!result.ok) return;
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "bartek", name: "Bartek", visitCount: 0 }),
    ]));
  });

  it("returns Bartek's full NPC record", () => {
    expect(callTool({ name: "get_npc", parameters: { id: "bartek" } })).toMatchObject({
      ok: true,
      data: { id: "bartek", name: "Bartek", role: "Senior Consultant" },
    });
  });

  it("reports a missing NPC", () => {
    expect(callTool({ name: "get_npc", parameters: { id: "unknown" } })).toEqual({
      ok: false,
      error: "npc not found",
    });
  });

  it("validates and applies relationship changes", () => {
    expect(callTool({
      name: "add_relationship",
      parameters: { npcId: "bartek", delta: 7 },
    })).toEqual({ ok: true, data: { npcId: "bartek", relationship: 57 } });
    expect(game.get().npcRelationships.bartek).toBe(57);
  });

  it("rejects relationship changes for an unknown NPC", () => {
    expect(callTool({
      name: "add_relationship",
      parameters: { npcId: "not-an-npc", delta: 7 },
    })).toEqual({ ok: false, error: "npc not found" });
    expect(game.get().npcRelationships["not-an-npc"]).toBeUndefined();
  });

  it("advances time", () => {
    expect(callTool({ name: "advance_time", parameters: {} })).toEqual({
      ok: true,
      data: { day: 1, timeOfDay: "afternoon" },
    });
  });
});

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
import { DIALOGUES } from "../../src/content/dialogues";
import { callTool, registerPlayerActions, TOOLS } from "../../src/webmcp/tools";

describe("WebMCP tools", () => {
  beforeEach(() => {
    registerPlayerActions(null);
    game.dispatch({ type: "reset" });
  });

  it("publishes at least six tool definitions", async () => {
    expect(TOOLS.length).toBeGreaterThanOrEqual(6);
  });

  it("exposes a player-action set: talk_to_npc, pick_dialogue_option, close_dialogue, end_day, open_minigame (L-2026-08-30-01)", async () => {
    const names = new Set(TOOLS.map((t) => t.name));
    for (const required of [
      "talk_to_npc",
      "pick_dialogue_option",
      "close_dialogue",
      "end_day",
      "open_minigame",
      "get_dialogue",
    ]) {
      expect(names.has(required), `missing tool: ${required}`).toBe(true);
    }
  });

  it("returns a clear 'not wired' error when the player-action registry is empty (test env)", async () => {
    expect(await callTool({ name: "talk_to_npc", parameters: { npcId: "bartek" } })).toEqual({
      ok: false,
      error: "Player actions are not wired in this environment (test mode)",
    });
    expect(await callTool({ name: "pick_dialogue_option", parameters: { optionId: "x" } })).toEqual({
      ok: false,
      error: "Player actions are not wired in this environment (test mode)",
    });
    expect(await callTool({ name: "end_day", parameters: {} })).toEqual({
      ok: false,
      error: "Player actions are not wired in this environment (test mode)",
    });
  });

  it("gives every tool a non-empty description", async () => {
    expect(TOOLS.every((tool) => tool.description.trim().length > 0)).toBe(true);
  });

  it("returns a state-like JSON snapshot", async () => {
    const result = await callTool({ name: "get_state", parameters: {} });

    expect(result).toMatchObject({
      ok: true,
      data: { saveVersion: 1, day: 1, timeOfDay: "morning" },
    });
    if (result.ok) expect(result.data).not.toBe(game.get());
  });

  it("rejects an unknown tool", async () => {
    expect(await callTool({ name: "unknown_tool", parameters: {} })).toEqual({
      ok: false,
      error: "unknown tool",
    });
  });

  it("rejects set_flag when required parameters are missing", async () => {
    expect(await callTool({ name: "set_flag", parameters: {} })).toMatchObject({ ok: false });
  });



  it("lists NPC summaries", async () => {
    const result = await callTool({ name: "list_npcs", parameters: {} });

    expect(result).toMatchObject({ ok: true });
    if (!result.ok) return;
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: "bartek", name: "Bartek", visitCount: 0 }),
    ]));
  });

  it("returns Bartek's full NPC record", async () => {
    expect(await callTool({ name: "get_npc", parameters: { id: "bartek" } })).toMatchObject({
      ok: true,
      data: { id: "bartek", name: "Bartek", role: "Senior Consultant" },
    });
  });

  it("reports a missing NPC", async () => {
    expect(await callTool({ name: "get_npc", parameters: { id: "unknown" } })).toEqual({
      ok: false,
      error: "npc not found",
    });
  });



  it("advances time through the runtime hook so events, NPCs, and the HUD stay synchronized", async () => {
    const advanceTime = vi.fn(() => {
      game.dispatch({ type: "advance-time" });
      return true;
    });
    registerPlayerActions({
      isDialogueOpen: () => false,
      openDialogue: () => false,
      pickDialogueOption: () => false,
      closeDialogue: () => false,
      advanceTime,
      endDay: () => false,
      openMinigame: () => false,
      getDialogueSnapshot: () => null,
    });

    expect(await callTool({ name: "advance_time", parameters: {} })).toEqual({
      ok: true,
      data: { day: 1, timeOfDay: "lunch" },
    });
    expect(advanceTime).toHaveBeenCalledOnce();
  });

  it("exposes the dialogue greeting and remaining options for a player agent (L-2026-08-30-01)", async () => {
    const result = await callTool({ name: "get_dialogue", parameters: { npcId: "bartek" } });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const data = result.data as { npcId: string; text: string; availableOptions: Array<{ id: string; text: string }> };
    expect(data.npcId).toBe("bartek");
    expect(typeof data.text).toBe("string");
    // Bartek's greeting has 3 options initially (README, SO, printer).
    expect(data.availableOptions.length).toBe(3);
    expect(data.availableOptions.map((o) => o.id)).toEqual([
      "tutorial-0",
      "tutorial-1",
      "printer",
    ]);
  });

  it("rejects get_dialogue for unknown NPCs", async () => {
    expect(await callTool({ name: "get_dialogue", parameters: { npcId: "ghost" } })).toEqual({
      ok: false,
      error: "npc not found",
    });
  });
});

describe("DIALOGUES merge (GLM 5.3 enrichment, L-2026-08-30-02)", () => {
  it("exposes at least one 'more' tree per NPC from dialogues-more", async () => {
    const { MORE_DIALOGUES } = await import("../../src/content/dialogues-more");
    for (const npcId of Object.keys(MORE_DIALOGUES)) {
      const moreKeys = Object.keys(MORE_DIALOGUES[npcId] ?? {});
      expect(moreKeys.length, `${npcId} should have at least one tree in MORE_DIALOGUES`).toBeGreaterThan(0);
      for (const treeKey of moreKeys) {
        expect(
          DIALOGUES[npcId]?.[treeKey],
          `DIALOGUES.${npcId}.${treeKey} should be present after the merge`,
        ).toBeDefined();
      }
    }
  });
});


describe("deadline coworker protocol", () => {
  it("explains actor boundaries, asynchronous motion and recoverable listening", async () => {
    const result = await callTool({ name: "get_instructions", parameters: {} });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    const text = (result.data as { instructions: string }).instructions;
    for (const phrase of ["IT trainer", "IT Crowd", "Silicon Valley", "LARP", "user-shared",
      "join once", "human-control tools are exposed", "prohibited", "asynchronously",
      "timeout_seconds: 10", "25", "get_pending_dialogue_request", "feedback"])
      expect(text).toContain(phrase);
    expect(text).toMatch(/supply_dialogue.*before.*gestures/);
    expect(text).not.toMatch(/nothing is lost|Those tools do not exist/);
    for (const name of ["talk_to_npc", "pick_dialogue_option", "close_dialogue", "advance_time", "end_day", "open_minigame"])
      expect(text).toContain(name);
  });

  it("recommends wait as primary and pending context for recovery without guaranteeing delivery", () => {
    const pending = TOOLS.find((tool) => tool.name === "get_pending_dialogue_request")!;
    const wait = TOOLS.find((tool) => tool.name === "wait_for_player_message")!;
    expect(pending.description).toMatch(/recovery|recover/i);
    expect(pending.description).toContain("wait_for_player_message");
    expect(wait.description).not.toMatch(/nothing is ever lost/i);
    expect(wait.parameters.timeout_seconds!.example).toBe(10);
  });
});

it("exposes NPC co-authorship separately from human dialogue controls", () => {
  const tool = TOOLS.find((tool) => tool.name === "agent_talk_to_npc");
  expect(tool).toBeDefined();
  expect(tool!.parameters.line!.required).toBe(true);
  expect(tool!.parameters.reply!.required).toBe(true);
  expect(tool!.description).toContain("does not open or choose the human's dialogue");
});

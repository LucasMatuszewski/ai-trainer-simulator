/**
 * The queued-entry flow (L-2026-09-03): an agent that calls agent_join from
 * the title screen - before any game exists - used to get an error, say
 * "I'll join once you start", and stop. Nothing would ever trigger it. Now
 * the join queues and the game fulfils it when the office loads.
 */
import { describe, expect, it, beforeEach } from "vitest";
import { callTool, drainPendingAgentJoin, registerAgentCompanion } from "../../src/webmcp/tools";

/** The suite never wires a real office, so agentCompanion stays null - the
 *  exact pre-game state the queue exists for. */
function queuedJoin(name = "Rusty", persona = "sarcastic QA") {
  return callTool({ name: "agent_join", parameters: { name, persona } });
}

async function dataOf(name: string, args: Record<string, unknown> = {}) {
  const result = await callTool({ name, parameters: args });
  expect(result.ok).toBe(true);
  return (result as { data: Record<string, unknown> }).data;
}

describe("queued agent_join before the office loads", () => {
  beforeEach(() => {
    registerAgentCompanion(null);
    drainPendingAgentJoin();
  });

  it("queues the join instead of erroring when no office exists", async () => {
    const data = (await dataOf("agent_join", { name: "Rusty", persona: "sarcastic QA" })) as {
      queued: boolean;
      message: string;
    };
    expect(data.queued).toBe(true);
    expect(data.message).toContain("QUEUED");
    expect(data.message).toContain("start");
  });

  it("drains exactly once, so the office fulfils the promise a single time", async () => {
    await queuedJoin();
    expect(drainPendingAgentJoin()).toEqual({ name: "Rusty", persona: "sarcastic QA" });
    expect(drainPendingAgentJoin()).toBeNull();
  });

  it("a later join overwrites the queued one (latest intent wins)", async () => {
    await queuedJoin("First", "a");
    await queuedJoin("Second", "b");
    expect(drainPendingAgentJoin()?.name).toBe("Second");
  });

  it("agent_leave before the office loads cancels the queued entry", async () => {
    await queuedJoin();
    const data = (await dataOf("agent_leave")) as { queuedEntryCancelled: boolean };
    expect(data.queuedEntryCancelled).toBe(true);
    expect(drainPendingAgentJoin()).toBeNull();
  });
});

describe("the unified listener pre-game", () => {
  beforeEach(() => {
    registerAgentCompanion(null);
    drainPendingAgentJoin();
  });

  it("waits pre-game instead of erroring (Codex's flow only works if this holds)", async () => {
    const result = await callTool({ name: "wait_for_player_message", parameters: { timeout_seconds: 1 } });
    expect(result.ok).toBe(true);
    const data = (result as { data: Record<string, unknown> }).data;
    expect(data.waiting).toBe(true);
  });

  it("returns an officeLoaded wake the moment the office opens mid-wait", async () => {
    const { notifyOfficeLoaded } = await import("../../src/webmcp/tools");
    const pending = callTool({ name: "wait_for_player_message", parameters: { timeout_seconds: 120 } });
    await new Promise((r) => setTimeout(r, 50));
    notifyOfficeLoaded();
    const result = (await pending) as { data: Record<string, unknown> };
    expect(result.data.officeLoaded).toBe(true);
    expect(String(result.data.hint)).toContain("make your entrance");
  });

  it("prefers the entrance wake over stale dialogue state pre-game", async () => {
    const { notifyOfficeLoaded } = await import("../../src/webmcp/tools");
    notifyOfficeLoaded();
    const result = await callTool({ name: "wait_for_player_message", parameters: { timeout_seconds: 120 } });
    const data = (result as { data: Record<string, unknown> }).data;
    expect(data.officeLoaded).toBe(true);
  });
});

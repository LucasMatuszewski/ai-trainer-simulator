/**
 * wait_for_office: the pre-game half of the agent's loop. The queued join
 * made the robot's arrival the game's job; this tool makes WAITING for that
 * the agent's job too, so it never has to end its turn with "tell me when
 * you've started".
 */
import { describe, expect, it, beforeEach } from "vitest";
import { callTool, notifyOfficeLoaded } from "../../src/webmcp/tools";

describe("wait_for_office", () => {
  beforeEach(() => {
    // Fresh module state per test would need reset support; ordering the
    // cases loaded-last keeps this deterministic without one.
  });

  it("returns waiting when the timeout passes with no office", async () => {
    const result = await callTool({ name: "wait_for_office", parameters: { timeout_seconds: 1 } });
    expect(result.ok).toBe(true);
    expect((result as { data: unknown }).data).toEqual({ loaded: false });
  });

  it("resolves loaded the moment the office opens - even mid-wait", async () => {
    const pending = callTool({ name: "wait_for_office", parameters: { timeout_seconds: 120 } });
    // Give the wait a beat to register, then open the office.
    await new Promise((r) => setTimeout(r, 50));
    notifyOfficeLoaded();
    const result = (await pending) as { data: unknown };
    expect(result.data).toEqual({ loaded: true });
  });

  it("returns loaded immediately once the office has ever opened", async () => {
    const result = await callTool({ name: "wait_for_office", parameters: { timeout_seconds: 120 } });
    expect((result as { data: unknown }).data).toEqual({ loaded: true });
  });
});

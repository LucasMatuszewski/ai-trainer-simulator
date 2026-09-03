/**
 * ADR 0008 D-37/D-38. The handshake that lets an agent author the robot
 * companion's lines and the reply options the human is offered.
 *
 * The property that matters most here is that a silent agent can never
 * freeze the human's game (AC-AUTH-05) - that is the difference between a
 * demo that survives a judge's flaky connection and one that hangs on stage.
 */
import { describe, expect, it, vi } from "vitest";
import {
  createDialogueBroker,
  validateSupply,
  FALLBACK_LINE,
  MAX_LINE_LENGTH,
  MAX_OPTIONS,
  MIN_OPTIONS,
  SUPPLY_TIMEOUT_MS,
} from "../../src/webmcp/agent-dialogue";

const CONTEXT = {
  companionName: "Rusty",
  persona: "sarcastic but helpful",
  location: { x: 1, z: 2 },
  clock: "10:15",
  turn: 1,
  lastPlayerChoice: null,
};

describe("validateSupply", () => {
  it("accepts a well-formed turn", () => {
    const result = validateSupply("Coffee?", ["Yes", "No"]);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.options).toEqual(["Yes", "No"]);
  });

  it("accepts the maximum option count", () => {
    expect(validateSupply("Pick", ["a", "b", "c", "d"]).ok).toBe(true);
  });

  it("rejects too few options with a reason instead of padding them", () => {
    const result = validateSupply("Hi", ["only one"]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toContain(`${MIN_OPTIONS}-${MAX_OPTIONS}`);
  });

  it("rejects too many options instead of silently truncating", () => {
    // Silently reshaping the agent's output teaches it nothing.
    expect(validateSupply("Hi", ["a", "b", "c", "d", "e"]).ok).toBe(false);
  });

  it("rejects an empty line", () => {
    expect(validateSupply("   ", ["a", "b"]).ok).toBe(false);
  });

  it("rejects options that are not an array", () => {
    expect(validateSupply("Hi", "a, b").ok).toBe(false);
  });

  it("drops blank options before counting, so padding cannot sneak past", () => {
    expect(validateSupply("Hi", ["real", "  ", ""]).ok).toBe(false);
  });

  it("caps an overlong line rather than letting it overflow the panel", () => {
    const result = validateSupply("y".repeat(MAX_LINE_LENGTH + 500), ["a", "b"]);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.line.length).toBeLessThanOrEqual(MAX_LINE_LENGTH);
  });

  it("collapses newlines that would break the single-line layout", () => {
    const result = validateSupply("one\ntwo", ["a", "b"]);
    if (result.ok) expect(result.value.line).toBe("one two");
  });

  it("passes markup through as literal text, never interpreting it", () => {
    // Rendered downstream with textContent; this asserts we do not mangle or
    // execute it, only that it survives as characters.
    const result = validateSupply("<img src=x onerror=alert(1)>", ["a", "b"]);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.line).toContain("<img");
  });
});

describe("createDialogueBroker", () => {
  it("has nothing pending until the human starts a conversation", () => {
    expect(createDialogueBroker().peek()).toBeNull();
  });

  it("exposes the conversation context for the agent to answer", () => {
    const broker = createDialogueBroker();
    broker.request(CONTEXT);
    const pending = broker.peek();
    expect(pending?.companionName).toBe("Rusty");
    expect(pending?.persona).toBe("sarcastic but helpful");
    expect(pending?.clock).toBe("10:15");
  });

  it("refuses a supply when nobody is talking to the companion", () => {
    const result = createDialogueBroker().supply("Hi", ["a", "b"]);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toContain("no conversation");
  });

  it("hands the supplied turn to the renderer and clears the pending state", () => {
    const rendered = vi.fn();
    const broker = createDialogueBroker(() => 0, rendered);
    broker.request(CONTEXT);
    broker.supply("Coffee?", ["Yes", "No"]);

    expect(rendered).toHaveBeenCalledWith({ line: "Coffee?", options: ["Yes", "No"] });
    expect(broker.isPending()).toBe(false);
  });

  it("keeps the turn pending when the supply was invalid", () => {
    const broker = createDialogueBroker();
    broker.request(CONTEXT);
    broker.supply("Hi", ["one"]);
    expect(broker.isPending()).toBe(true);
  });

  it("reports the human's choice back to the agent on the next turn", () => {
    const broker = createDialogueBroker();
    broker.request(CONTEXT);
    broker.supply("Coffee?", ["Yes", "No"]);
    broker.recordChoice("Yes");
    broker.request({ ...CONTEXT, turn: 2 });

    expect(broker.peek()?.lastPlayerChoice).toBe("Yes");
  });

  it("does not time out before the wait elapses", () => {
    let clock = 1000;
    const broker = createDialogueBroker(() => clock);
    broker.request(CONTEXT);
    clock += SUPPLY_TIMEOUT_MS - 1;
    expect(broker.hasTimedOut()).toBe(false);
  });

  it("times out a silent agent so the human is never stuck (AC-AUTH-05)", () => {
    let clock = 1000;
    const broker = createDialogueBroker(() => clock);
    broker.request(CONTEXT);
    clock += SUPPLY_TIMEOUT_MS;
    expect(broker.hasTimedOut()).toBe(true);
  });

  it("never times out when no conversation is open", () => {
    expect(createDialogueBroker(() => 10 ** 9).hasTimedOut()).toBe(false);
  });

  it("reports waiting time, so an agent can tell it is late", () => {
    let clock = 0;
    const broker = createDialogueBroker(() => clock);
    broker.request(CONTEXT);
    clock = 500;
    expect(broker.peek()?.waitingMs).toBe(500);
  });

  it("clears pending state and choice history on reset", () => {
    const broker = createDialogueBroker();
    broker.request(CONTEXT);
    broker.recordChoice("Yes");
    broker.reset();
    expect(broker.peek()).toBeNull();
    expect(broker.lastChoice()).toBeNull();
  });

  it("ships an in-character fallback, not a system error string", () => {
    expect(FALLBACK_LINE).not.toMatch(/error|timeout|failed/i);
  });
});

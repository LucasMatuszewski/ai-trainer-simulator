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
    if (result.ok) {
      expect(result.value.options).toEqual([
        { text: "Yes", ends: false },
        { text: "No", ends: false },
      ]);
    }
  });

  it("accepts the maximum option count", () => {
    expect(validateSupply("Pick", ["a", "b", "c", "d"]).ok).toBe(true);
  });

  it("accepts a single option, which an agent-opened conversation may offer", () => {
    // MIN_OPTIONS dropped to 1 with agent-initiated conversations
    // (L-2026-09-03-04): "sure, what's up?" is a legitimate lone reply.
    expect(validateSupply("Got a second?", ["Sure."]).ok).toBe(true);
  });

  it("rejects an empty option list with a reason instead of inventing one", () => {
    const result = validateSupply("Hi", []);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toContain(`${MIN_OPTIONS}-${MAX_OPTIONS}`);
  });

  it("accepts {text, ends} objects and carries the ends flag through", () => {
    const result = validateSupply("Anyway.", [
      { text: "Tell me more." },
      { text: "See you around.", ends: true },
    ]);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.options[0]).toEqual({ text: "Tell me more.", ends: false });
      expect(result.value.options[1]).toEqual({ text: "See you around.", ends: true });
    }
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
    const result = validateSupply("Hi", ["real", "  ", ""]);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.options).toHaveLength(1);
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

    expect(rendered).toHaveBeenCalledWith({
      line: "Coffee?",
      options: [
        { text: "Yes", ends: false },
        { text: "No", ends: false },
      ],
    });
    expect(broker.isPending()).toBe(false);
  });

  it("keeps the turn pending when the supply was invalid", () => {
    const broker = createDialogueBroker();
    broker.request(CONTEXT);
    broker.supply("Hi", []);
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

describe("awaitPlayerMessage (the long-poll that fakes a push)", () => {
  it("resolves the moment the player answers, not on a timer", async () => {
    const broker = createDialogueBroker();
    broker.request(CONTEXT);
    broker.supply("Coffee?", ["Yes", "No"]);

    const waiting = broker.awaitPlayerMessage(10_000);
    broker.recordChoice("Yes", 0, false);

    const message = await waiting;
    expect(message.waiting).toBe(false);
    expect(message.choice).toBe("Yes");
    expect(message.optionIndex).toBe(0);
  });

  it("returns an already-waiting answer immediately instead of blocking", async () => {
    const broker = createDialogueBroker();
    broker.recordChoice("Yes", 0, false);
    const message = await broker.awaitPlayerMessage(10_000);
    expect(message.choice).toBe("Yes");
  });

  it("times out cleanly, so a quiet player is not an error", async () => {
    const broker = createDialogueBroker();
    const message = await broker.awaitPlayerMessage(1000);
    expect(message.waiting).toBe(true);
    expect(message.hint).toContain("again");
  });

  it("reports when the player picked the option that ends the conversation", async () => {
    const broker = createDialogueBroker();
    const waiting = broker.awaitPlayerMessage(10_000);
    broker.recordChoice("See you around.", 1, true);
    const message = await waiting;
    expect(message.conversationEnded).toBe(true);
    expect(broker.isFinished()).toBe(true);
  });

  it("never strands a waiter across a reset", async () => {
    // An agent still holding the promise would otherwise hang until its own
    // host gave up on the call.
    const broker = createDialogueBroker();
    const waiting = broker.awaitPlayerMessage(60_000);
    broker.reset();
    expect((await waiting).waiting).toBe(true);
  });
});

describe("startConversation", () => {
  it("renders the agent's opening turn without a pending request", () => {
    // The agent walked up and spoke first - nobody clicked the robot.
    const rendered = vi.fn();
    const broker = createDialogueBroker(() => 0, rendered);
    const result = broker.startConversation("Got a second?", ["Sure.", "Not now."]);
    expect(result.ok).toBe(true);
    expect(rendered).toHaveBeenCalledOnce();
  });

  it("refuses a malformed opening without opening the panel", () => {
    const rendered = vi.fn();
    const broker = createDialogueBroker(() => 0, rendered);
    expect(broker.startConversation("", ["Sure."]).ok).toBe(false);
    expect(rendered).not.toHaveBeenCalled();
  });
});

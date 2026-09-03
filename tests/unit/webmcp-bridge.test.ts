/**
 * P1 (ADR 0008 D-34/D-35): the bridge is what makes the twelve tools in
 * webmcp/tools.ts visible to a browser agent at all. Before this existed,
 * nothing in src/ ever referenced modelContext, so a judge opening the
 * deployed page discovered zero tools.
 *
 * These tests use a fake modelContext because the real one only exists in
 * a WebMCP-enabled browser. They assert translation and wrapping only -
 * tool BEHAVIOUR stays the responsibility of webmcp-tools.test.ts, per
 * D-35's "single implementation, single test surface".
 */
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  registerWebmcpTools,
  toJsonSchema,
  toToolResponse,
  type WebmcpToolDescriptor,
} from "../../src/webmcp/bridge";
import { TOOLS } from "../../src/webmcp/tools";

function makeHost() {
  const registered: WebmcpToolDescriptor[] = [];
  return {
    registered,
    host: {
      registerTool: (tool: WebmcpToolDescriptor) => {
        registered.push(tool);
      },
    },
  };
}

describe("toJsonSchema", () => {
  it("converts the flat parameter record into a JSON Schema object", () => {
    const schema = toJsonSchema({
      npcId: { type: "string", description: "who to talk to", required: true },
      count: { type: "number", description: "how many" },
    });

    expect(schema).toEqual({
      type: "object",
      properties: {
        npcId: { type: "string", description: "who to talk to" },
        count: { type: "number", description: "how many" },
      },
      required: ["npcId"],
      additionalProperties: false,
    });
  });

  it("omits the required array entirely when nothing is required", () => {
    const schema = toJsonSchema({ a: { type: "boolean", description: "x" } });
    expect(schema).not.toHaveProperty("required");
  });

  it("produces a valid empty-object schema for a no-parameter tool", () => {
    // The `examples: [{}]` says "there are no arguments" rather than leaving
    // an inspector to render a bare {} that reads as a missing example.
    expect(toJsonSchema({})).toEqual({
      type: "object",
      properties: {},
      additionalProperties: false,
      examples: [{}],
    });
  });

  it("surfaces a parameter's example value as JSON Schema `examples`", () => {
    const schema = toJsonSchema({
      target: { type: "string", description: "who to walk to", example: "bartek" },
    });
    expect(schema.properties.target!.examples).toEqual(["bartek"]);
  });
});

describe("toToolResponse", () => {
  it("wraps a success in the spec's content shape", () => {
    const response = toToolResponse({ ok: true, data: { cash: 500 } });
    expect(response.content).toHaveLength(1);
    expect(response.content[0]!.type).toBe("text");
    expect(JSON.parse(response.content[0]!.text)).toEqual({ cash: 500 });
  });

  it("wraps a failure as text rather than throwing, so the agent can recover", () => {
    const response = toToolResponse({ ok: false, error: "unknown tool" });
    expect(response.content[0]!.text).toContain("unknown tool");
    expect(response.isError).toBe(true);
  });
});

describe("registerWebmcpTools", () => {
  const original = { doc: globalThis.document, nav: globalThis.navigator };

  beforeEach(() => { vi.restoreAllMocks(); });
  afterEach(() => {
    Object.defineProperty(globalThis, "document", { value: original.doc, configurable: true, writable: true });
    Object.defineProperty(globalThis, "navigator", { value: original.nav, configurable: true, writable: true });
  });

  it("registers every tool from the registry", () => {
    const { registered, host } = makeHost();
    const result = registerWebmcpTools({ hostOverride: host });

    expect(result.registered).toBe(TOOLS.length);
    expect(registered.map((t) => t.name).sort()).toEqual(TOOLS.map((t) => t.name).sort());
    for (const tool of registered) {
      expect(tool.description.length).toBeGreaterThan(0);
      expect(tool.inputSchema.type).toBe("object");
    }
  });

  it("routes an executed tool through callTool and returns the content shape", async () => {
    const { registered, host } = makeHost();
    registerWebmcpTools({ hostOverride: host });

    const getState = registered.find((t) => t.name === "get_state");
    expect(getState).toBeDefined();
    const response = await getState!.execute({});
    expect(() => JSON.parse(response.content[0]!.text)).not.toThrow();
  });

  it("reports unsupported and does NOT throw when no namespace exists", () => {
    // AC-REG-03: a browser with no WebMCP must still reach a playable state.
    Object.defineProperty(globalThis, "document", { value: {}, configurable: true, writable: true });
    Object.defineProperty(globalThis, "navigator", { value: {}, configurable: true, writable: true });

    const result = registerWebmcpTools();
    expect(result.supported).toBe(false);
    expect(result.registered).toBe(0);
  });

  it("prefers document.modelContext over navigator.modelContext (D-34 probe order)", () => {
    const docHost = makeHost();
    const navHost = makeHost();
    Object.defineProperty(globalThis, "document", {
      value: { modelContext: docHost.host }, configurable: true, writable: true,
    });
    Object.defineProperty(globalThis, "navigator", {
      value: { modelContext: navHost.host }, configurable: true, writable: true,
    });

    const result = registerWebmcpTools();
    expect(result.namespace).toBe("document.modelContext");
    expect(docHost.registered.length).toBe(TOOLS.length);
    expect(navHost.registered.length).toBe(0);
  });

  it("falls back to navigator.modelContext when document has none", () => {
    const navHost = makeHost();
    Object.defineProperty(globalThis, "document", { value: {}, configurable: true, writable: true });
    Object.defineProperty(globalThis, "navigator", {
      value: { modelContext: navHost.host }, configurable: true, writable: true,
    });

    expect(registerWebmcpTools().namespace).toBe("navigator.modelContext");
    expect(navHost.registered.length).toBe(TOOLS.length);
  });

  it("gives every parameter of every tool a concrete example", () => {
    // L-2026-09-03-04: without this, inspectors render "example_string" and
    // an agent has to infer the shape from prose. Asserted here as well as
    // in e2e so a new tool missing an example fails in seconds, not minutes.
    for (const tool of TOOLS) {
      for (const [param, spec] of Object.entries(tool.parameters)) {
        expect(spec.example, `${tool.name}.${param} needs an example`).toBeDefined();
      }
    }
  });

  it("survives a host whose registerTool throws, and keeps registering the rest", () => {
    let calls = 0;
    const host = {
      registerTool: () => {
        calls += 1;
        if (calls === 1) throw new Error("duplicate tool name");
      },
    };
    const result = registerWebmcpTools({ hostOverride: host });
    expect(result.registered).toBe(TOOLS.length - 1);
    expect(result.failed).toBe(1);
  });
});

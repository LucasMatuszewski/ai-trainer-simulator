/**
 * WebMCP browser bridge (ADR 0008, D-34 and D-35).
 *
 * `webmcp/tools.ts` has always been an INTERNAL registry: twelve tools with
 * validation and tests, wired by main.ts to real game actions, but never
 * exposed to the browser. Nothing in src/ referenced modelContext, so an
 * agent opening the deployed page discovered nothing at all. This file is
 * the missing half.
 *
 * It is deliberately thin. It translates a ToolDefinition into a WebMCP tool
 * descriptor, calls the existing `callTool`, and wraps the existing
 * ToolResult into the spec's content shape. No game logic lives here, so the
 * tools keep one implementation and one test surface.
 *
 * Namespace probing (D-34): the spec repo and the challenge's own example
 * both show `document.modelContext.registerTool(...)`, but several current
 * write-ups document `navigator.modelContext` instead, and the spec is still
 * moving. We cannot iterate after the deadline, and a wrong bet is a silently
 * dead integration on the judge's machine, so we probe rather than assume.
 */

import { callTool, TOOLS, type ToolDefinition, type ToolResult, type ToolValueSchema } from "./tools";

/** The subset of the WebMCP host object we actually use. */
export interface ModelContextHost {
  registerTool: (tool: WebmcpToolDescriptor, options?: { signal?: AbortSignal }) => unknown;
}

export interface WebmcpToolDescriptor {
  name: string;
  description: string;
  inputSchema: JsonSchemaObject;
  execute: (args: Record<string, unknown>) => Promise<WebmcpToolResponse>;
}

export interface JsonSchemaProperty {
  type: string;
  description: string;
  items?: ToolValueSchema;
  minItems?: number;
  maxItems?: number;
  minLength?: number;
  maxLength?: number;
  /** Standard JSON Schema. Tool inspectors show these instead of a
   *  placeholder, so an agent sees a real value rather than "example_string". */
  examples?: unknown[];
}

export interface JsonSchemaObject {
  type: "object";
  properties: Record<string, JsonSchemaProperty>;
  required?: string[];
  additionalProperties: false;
  /** Whole-object example. Set to `[{}]` for no-argument tools. */
  examples?: unknown[];
}

export interface WebmcpToolResponse {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}

/**
 * Convert our flat `{name: {type, description, required}}` parameter record
 * into the JSON Schema an agent needs in order to call the tool correctly.
 *
 * `additionalProperties: false` is set on purpose: several tools reject
 * unexpected parameters at validation time anyway, so declaring the
 * restriction up front lets the agent get it right the first time instead of
 * discovering it through a failed call.
 */
export function toJsonSchema(parameters: ToolDefinition["parameters"]): JsonSchemaObject {
  const properties: JsonSchemaObject["properties"] = {};
  const required: string[] = [];

  for (const [name, spec] of Object.entries(parameters)) {
    const property: JsonSchemaProperty =
      spec.type === "array"
        ? {
            type: "array",
            description: spec.description,
            // Without `items` an agent has no idea what to put in the array
            // and will guess - usually a JSON string.
            items: typeof spec.items === "object" ? spec.items : { type: spec.items ?? "string" },
          }
        : { type: spec.type, description: spec.description };
    // `examples` is standard JSON Schema and is what tool inspectors render
    // instead of a "example_string" placeholder. An agent reading a schema
    // with a real value in it does not have to infer the shape from prose.
    for (const limit of ["minItems", "maxItems", "minLength", "maxLength"] as const) {
      if (spec[limit] !== undefined) property[limit] = spec[limit];
    }
    if (spec.example !== undefined) property.examples = [spec.example];
    properties[name] = property;
    if (spec.required === true) required.push(name);
  }

  const schema: JsonSchemaObject = { type: "object", properties, additionalProperties: false };
  // An empty `required: []` is legal JSON Schema but noise in a tool listing.
  if (required.length > 0) schema.required = required;
  // A no-argument tool otherwise renders as a bare {} with no example at all,
  // which reads as "the example is missing" rather than "there are no
  // arguments" (Lucas, 2026-09-03). An explicit {} example says which it is.
  if (Object.keys(properties).length === 0) schema.examples = [{}];
  return schema;
}

/**
 * Wrap a ToolResult in the spec's content shape.
 *
 * A failure is returned as content with `isError`, never thrown. An agent
 * that gets an exception learns nothing; an agent that gets our error string
 * learns what to do differently, and every tool in the registry writes
 * actionable failure messages.
 */
export function toToolResponse(result: ToolResult): WebmcpToolResponse {
  if (result.ok) {
    return { content: [{ type: "text", text: JSON.stringify(result.data) }] };
  }
  return { content: [{ type: "text", text: `Error: ${result.error}` }], isError: true };
}

export interface RegisterOptions {
  /** Inject a host directly. Used by tests; never set in the game. */
  hostOverride?: ModelContextHost;
  /** Aborts registration, so a future settings toggle can unregister. */
  signal?: AbortSignal;
}

export interface RegisterResult {
  supported: boolean;
  /** Which namespace answered the probe, for the title-screen status line. */
  namespace: string | null;
  registered: number;
  failed: number;
}

function hasRegisterTool(value: unknown): value is ModelContextHost {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as ModelContextHost).registerTool === "function"
  );
}

/**
 * Probe order matters. `document.modelContext` is what the specification repo
 * and the challenge example both show, so it wins. `navigator.modelContext`
 * is what several current write-ups document. The testing shim is last: it
 * only appears when a developer has explicitly enabled it, so preferring it
 * over a real host would be wrong, but it is exactly what we want when
 * nothing else is present.
 */
function findHost(): { host: ModelContextHost; namespace: string } | null {
  const candidates: Array<[string, unknown]> = [
    ["document.modelContext", typeof document === "undefined" ? undefined : (document as unknown as Record<string, unknown>).modelContext],
    ["navigator.modelContext", typeof navigator === "undefined" ? undefined : (navigator as unknown as Record<string, unknown>).modelContext],
    ["navigator.modelContextTesting", typeof navigator === "undefined" ? undefined : (navigator as unknown as Record<string, unknown>).modelContextTesting],
  ];

  for (const [namespace, candidate] of candidates) {
    if (hasRegisterTool(candidate)) return { host: candidate, namespace };
  }
  return null;
}

export function buildDescriptor(definition: ToolDefinition): WebmcpToolDescriptor {
  return {
    name: definition.name,
    description: definition.description,
    inputSchema: toJsonSchema(definition.parameters),
    // `await` matters: wait_for_player_message returns a promise it holds
    // open until the human answers, which is how a pull-only protocol
    // imitates a push.
    execute: async (args: Record<string, unknown>) =>
      toToolResponse(await callTool({ name: definition.name, parameters: args ?? {} })),
  };
}

/**
 * Register every tool with the browser's model-context surface.
 *
 * Never throws (AC-REG-03). A browser with no WebMCP support - which is most
 * browsers today - must reach a playable game with no visible error and no
 * behavioural difference, so an unsupported result is an ordinary return
 * value, not an exceptional one.
 */
export function registerWebmcpTools(options: RegisterOptions = {}): RegisterResult {
  const found = options.hostOverride
    ? { host: options.hostOverride, namespace: "override" }
    : findHost();

  if (found === null) {
    return { supported: false, namespace: null, registered: 0, failed: 0 };
  }

  let registered = 0;
  let failed = 0;

  for (const definition of TOOLS) {
    try {
      found.host.registerTool(buildDescriptor(definition), { signal: options.signal });
      registered += 1;
    } catch {
      // One rejected tool (a duplicate name, a schema the host dislikes) must
      // not cost us the other eleven.
      failed += 1;
    }
  }

  return { supported: true, namespace: found.namespace, registered, failed };
}

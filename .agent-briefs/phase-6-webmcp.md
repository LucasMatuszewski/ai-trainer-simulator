# Phase 6.0 — WebMCP tool definitions (slice 1: pure-function tool list)

## Context

We are building AI Trainer Simulator. Lucas wants the game state
exposed to external AI agents via the WebMCP protocol (OpenAI's
WebMCP challenge entry). The full integration requires a transport
and a server. This task delivers the **first slice**: the pure-function
tool definitions and a tiny dispatcher that takes a tool call and
returns a JSON result. The transport can be added later.

Read `docs/PRD.md` §13 C-14 for the spec, and
`~/.claude/plans/glistening-napping-hinton.md` §"Endgame additions"
for the rationale.

## Files to read

- `src/game/state.ts` — `GameState`, `game.get()`, `game.dispatch()`.
- `src/content/npcs.ts` — NPC list (for the `list_npcs` and
  `get_npc` tools).
- `src/types.ts` — the shared types.
- `src/content/dialogue-memory.ts` — the per-NPC memory (for the
  `npc_memory` tool).

## What to deliver

### 1. New file: `src/webmcp/tools.ts`

A pure-function module exporting a list of tool definitions and a
function that calls one of them.

```ts
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, {
    type: "string" | "number" | "boolean";
    description: string;
    required?: boolean;
  }>;
}

export const TOOLS: ToolDefinition[];

export interface ToolCall {
  name: string;
  parameters: Record<string, unknown>;
}

export type ToolResult =
  | { ok: true; data: unknown }
  | { ok: false; error: string };

export function callTool(call: ToolCall): ToolResult;
```

Implement at least these tools:

1. `get_state` — no params. Returns the full `GameState` (read-only).
2. `list_npcs` — no params. Returns an array of `{ id, name, role,
   position: {x, y, z}, gender, lastTopic?, visitCount? }`.
3. `get_npc` — params: `{ id: string }`. Returns one NPC's full
   record or `{ ok: false, error: "npc not found" }`.
4. `set_flag` — params: `{ name: string, value: boolean | number }`.
   Dispatches `set-flag` action.
5. `add_relationship` — params: `{ npcId: string, delta: number }`.
   Dispatches `add-relationship`.
6. `advance_time` — no params. Dispatches `advance-time`.

For each tool, write a `validate(call): string | null` that returns
an error message string if the call is invalid, or null if valid.
The `callTool` function should:

1. Look up the tool by name. If not found, return
   `{ ok: false, error: "unknown tool" }`.
2. Call `validate(call)`. If non-null, return
   `{ ok: false, error: validate(...) }`.
3. Dispatch the corresponding game action via `game.dispatch(...)`
   for state-mutating tools.
4. For `get_state` / `list_npcs` / `get_npc`, return a JSON-friendly
   snapshot of the relevant slice.
5. Return `{ ok: true, data: ... }`.

The implementation must NOT import three.js, the audio system,
or any browser-only module. It must work in node.

### 2. Tests

`tests/unit/webmcp-tools.test.ts`:
- `TOOLS` has at least 6 entries.
- Each tool's `description` is non-empty.
- `callTool({name: "get_state", parameters: {}})` returns
  `{ ok: true, data: { ... } }` with a state-like object.
- `callTool({name: "unknown_tool", parameters: {}})` returns
  `{ ok: false, error: ... }`.
- `callTool({name: "set_flag", parameters: {}})` (missing required
  param) returns `{ ok: false, error: ... }`.
- `callTool({name: "set_flag", parameters: {name: "test",
  value: true}})` returns `{ ok: true, data: ... }` and actually
  sets the flag in the game state.
- `callTool({name: "list_npcs", parameters: {}})` returns an array
  of NPCs.
- `callTool({name: "get_npc", parameters: {id: "bartek"}})` returns
  the Bartek NPC.
- `callTool({name: "get_npc", parameters: {id: "unknown"}})`
  returns `{ ok: false, error: "npc not found" }`.

Use a small setup that resets the game state between tests. The
`game` module already has a `reset` action — use it.

### 3. Constraints

- Do NOT add any transport (no WebSocket, no HTTP, no event source).
  This task is pure-function tool definitions only.
- Do NOT modify the game state in a way that requires migration of
  existing save files. If you need to add a new field to
  `GameState`, give it a default that makes older saves compatible.
- Do NOT add a new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-webmcp-sol.md`.

## Definition of done

- `src/webmcp/tools.ts` exists with `TOOLS`, `callTool`, and the
  types.
- `tests/unit/webmcp-tools.test.ts` exists with at least 8 test
  cases.
- `pnpm test tests/unit/webmcp-tools.test.ts` passes.
- `pnpm typecheck` passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.

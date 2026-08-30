# Phase 6.0 WebMCP tool definitions - Codex Sol report

## Delivered

- Added `src/webmcp/tools.ts`.
- Added `tests/unit/webmcp-tools.test.ts` with 12 test cases.
- Exported `ToolDefinition`, `ToolCall`, `ToolResult`, `TOOLS`, and `callTool`.
- Implemented `get_state`, `list_npcs`, `get_npc`, `set_flag`,
  `add_relationship`, and `advance_time`.
- Added per-tool validation and exact errors for unknown tools and missing NPCs.
- Kept state reads JSON-friendly by returning snapshots rather than live state or
  NPC objects.
- Added no transport, dependency, three.js import, audio import, or browser-only
  module import.

## Compatibility note

The brief allows `set_flag.value` to be a boolean or number, but the existing
`Action` and `GameState.flags` types declare boolean values only. Existing files
were explicitly out of scope, so numeric compatibility is isolated at the
WebMCP dispatch boundary. Tests cover both boolean and numeric calls. A future
save-schema change should widen the underlying types deliberately if numeric
flags become a general game-state feature.

## Verification

- Focused tests: PASS - 1 file, 12 tests.
- Typecheck: PASS - `tsc --noEmit` exited 0.
- Full unit suite: PASS - 19 files, 166 tests.
- `git diff --check`: PASS.
- Browser-only dependency scan of the two delivered source/test files: PASS -
  no matches for three.js, audio, `window`, or `document`.

The full suite still prints a pre-existing `localStorage is not defined` warning
from `tests/unit/reducer.test.ts`; that test passes and was not modified. The new
WebMCP test supplies a small in-memory `localStorage` implementation and runs
cleanly in Vitest's Node environment.

## Scope and repository state

No existing file was modified. Other pre-existing modified and untracked files
were left untouched. No commit or push was made.

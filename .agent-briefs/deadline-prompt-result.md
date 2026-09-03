# Deadline prompt/schema patch result

Implemented only the seven assigned source/test files, plus this requested handoff. No commits, pushes, browser runs or server restarts. Other agents' edits were preserved.

## Changes

- Copyable prompt now supplies IT trainer/consultant office lore, DevPowers/Edukey identity, dry IT Crowd/Silicon Valley humour, consistent robot persona, relevant user-shared context only, LARP, natural movement and occasional gestures.
- Discovery starts with native host WebMCP tools. Raw document.modelContext.getTools/executeTool is explicitly conditional on both function presence and host JavaScript permission; ordinary browser support is not assumed.
- Instructions teach human-led startup, get_instructions first, joining once/reusing the robot, observation and a start_conversation greeting. Pending dialogue takes priority over gestures/walking. Explicit 10-second waits, idle re-arming, ending replies, pending-context recovery and stopping for feedback are covered.
- Human-control tools are truthfully described as exposed but prohibited for the robot coworker. Movement acceptance is distinguished from arrival. Universal delivery guarantees were removed from the owned instructions/descriptions. Broker behavior is unchanged: actual default remains 25 seconds, maximum 120.
- Both dialogue schemas publish 1–4 entries: strings or objects with text and boolean ends. Object ends remains optional (defaults false) to preserve existing runtime compatibility. Examples include ends:true. Published limits match the existing 240-character line and 120-character option limits. Legacy flat/string-array parameter specifications still work. No runtime broker validation/protocol redesign.
- FAQ explains host/model delay and recovery instead of blaming every pause on a missing listener. Unsupported model/account-gate assertions removed; availability depends on host/account/permissions and detected tools.
- Setup modal explains no game-side API key or AI backend, while the user's AI subscription/usage charges still apply. No styling redesign.

## Verification

- Tests written first. Initial run detected eight expected failures (three owned suites). The initial `pnpm test -- ...` invocation unexpectedly ran the whole test suite: 635 passed, eight failed, with all failures in the owned suites. Subsequent commands used `pnpm exec vitest run <paths>` for proper filtering.
- Green: 42/42 tests passed across webmcp-help, webmcp-tools and webmcp-bridge.
- Mutation: temporarily restored all four owned implementation files to their pre-patch HEAD content, retaining new tests. Focused run exited 1: eight failed, 34 passed. A finally block restored all implementation files.
- Final restored run: 42/42 passed, three suites, exit 0.
- `pnpm typecheck`: exit 0. `git diff --check`: clean.
- Existing non-failing warnings remain: missing localStorage in the bridge suite's Node environment and pnpm's ignored package.json settings notice.

Logs: /tmp/deadline-prompt-red.log, /tmp/deadline-prompt-green.log, /tmp/deadline-prompt-mutation.log, /tmp/deadline-prompt-final.log.

## Parent integration

The owned files are ready for the parent's NPC-tool addition and final visual QA. This patch does not add that tool. Keep the actual broker default and instruction text synchronized if another patch changes the 25-second default. Visual layout was not verified, per the explicit instruction not to run a browser.

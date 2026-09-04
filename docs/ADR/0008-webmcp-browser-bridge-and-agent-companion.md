# ADR 0008 — WebMCP browser bridge and the agent companion

**Status:** Accepted (2026-09-03, night session)
**Context:** OpenAI WebMCP Challenge, deadline 2026-09-03 13:00 PDT / 21:00 Europe/Lisbon
**Drives:** [`docs/PRD-hackathon-webmcp.md`](../PRD-hackathon-webmcp.md)
**Supersedes:** the WebMCP paragraphs in [`000-main-architecture.md`](./000-main-architecture.md) §D-22, which assumed `navigator.modelContext.addEventListener`. That API shape does not exist.

---

## Context

`src/webmcp/tools.ts` already defines twelve tools with validation, a `ToolCall`/`ToolResult` contract, and a `PlayerActionHooks` registry that `src/main.ts` wires to real game actions. It is covered by `tests/unit/webmcp-tools.test.ts`. What it does not do is talk to the browser: no `modelContext` reference exists anywhere in `src/`. The work is therefore a bridge plus new capability, not a rewrite.

Research on the current specification produced one hard finding and one hazard.

The hard finding: the authoritative registration call, per the `webmachinelearning/webmcp` specification repository and the challenge's own example, is

```js
await document.modelContext.registerTool({
  name, description, inputSchema, async execute(args) { return { content: [{ type: "text", text }] }; }
}, { signal });
```

The hazard: secondary sources are inconsistent. Several current write-ups document `navigator.modelContext` instead, and the March 2026 revision reportedly removed `provideContext()`/`clearContext()` in favour of `registerTool()`/`unregisterTool()`. The specification is actively evolving, and we are shipping against it on a same-day deadline with no ability to iterate after submission.

## Decision D-34 — Detect the namespace, do not assume it

The bridge probes, in order, `document.modelContext`, then `navigator.modelContext`, then `navigator.modelContextTesting`, and registers against the first object exposing a callable `registerTool`. Registration failures are caught per-tool and logged, never thrown.

*Why.* Betting on one namespace risks a silently dead integration on the judge's machine, and there is no post-deadline fix. Probing costs roughly ten lines and a small amount of type-narrowing. Given that the cost of being wrong is total and the cost of being defensive is negligible, this is not a close call. The same probe also gives us the testing shim for free, which is how the integration gets exercised in CI.

We deliberately do **not** ship the `@mcp-b/webmcp-polyfill` package. It exists and would work, but it is a new runtime dependency added hours before a deadline, and a polyfill cannot conjure an agent that is not there — it helps a page talk to a bridge extension we cannot assume a judge has installed. Native detection plus a documented Chrome flag is the shorter path to a verifiable demo. Recorded as a reversible choice: if a judge reports no tools, adding the polyfill is a one-line import.

## Decision D-35 — The bridge is an adapter, not a second implementation

`src/webmcp/bridge.ts` is new and does exactly three things: translate a `ToolDefinition` into a WebMCP tool descriptor with a JSON-Schema `inputSchema`, invoke the existing `callTool`, and wrap the existing `ToolResult` into the `{ content: [{ type: "text", text }] }` shape. Every tool keeps a single implementation and a single test surface.

*Why.* The existing registry is tested and correct; duplicating its logic to satisfy a new transport is how the two copies drift. Keeping the bridge free of game logic also means the existing unit tests remain the authority on behaviour, and the bridge's own tests only need to prove translation.

The existing `parameters` shape (a flat record of `{type, description, required}`) is mechanically convertible to JSON Schema, so no tool definition changes.

## Decision D-36 — The companion is a standalone entity, not an NpcController NPC

The agent's robot character is **not** added to `NPCS`, not given a schedule entry, and not managed by `NpcController`. It lives in a new `src/engine/agent-companion.ts` that owns its own mesh, position, path, and walk-cycle state, and is stepped from the same frame loop.

*Why.* This is the highest-leverage risk decision in the ADR. `NpcController` is a large, deeply schedule-driven system: morning arrivals, period transitions, kitchen micro-sequences, avoidance, separation, escape ladders, and a spawn validator, all keyed on a closed `NpcId` union and a per-NPC schedule. Injecting a runtime-created, externally-driven character into it would mean touching the arrival planner, the destination roller, the schedule tables, and the `NpcId` type — every one of them covered by tests that encode assumptions about a fixed cast. The blast radius on a same-night deadline is unacceptable.

The systems the companion actually needs are already exported as pure, tested functions and can be composed directly:

| Need | Reused from |
|---|---|
| Mesh | `createNpcMesh(gender, paletteIndex, npcId, appearance)` in `npc-mesh.ts`, with a distinct shirt/skin palette for the robot read |
| Pathfinding | `planNpcPath(from, to, waypoints, edges, obstacles)` in `npc-path.ts` |
| Walk animation | `updateWalkCycle(state, dt, speed, progressMetres)` in `npc-walk-cycle.ts` |
| Speech | the existing bubble system in `bubbles.ts` |
| Collision | the same furniture AABBs the player uses |

The cost we accept: the companion does not participate in NPC-to-NPC chatter, inter-NPC avoidance, or schedules. For a companion driven entirely by an external agent, none of those are wanted behaviours anyway — an agent-controlled character that wandered off to the kitchen on a schedule would be a bug, not a feature.

## Decision D-37 — Agent-authored dialogue is a request/supply handshake with a bounded wait

When the human opens a conversation with the companion, the game does not block. It records a pending turn containing the conversation context, exposes it through a `get_pending_dialogue_request` tool, and renders an in-character waiting state. The agent calls `supply_dialogue` with one line and two-to-four options; the game renders them through the existing `DialogueController`. The human's pick is recorded and returned to the agent on its next call.

A bounded wait, not an indefinite one: if no supply arrives in time, the game renders an in-character fallback line and the conversation stays closable.

*Why a poll-and-supply handshake rather than the game awaiting a promise.* WebMCP tool calls are agent-initiated; the page cannot call out to the model. Any design where the UI awaits the agent is a design where a disconnected agent freezes the human's game. Making the pending request a readable piece of state, and the supply an ordinary tool call, means the human's game is never hostage to an agent's latency or liveness — which AC-AUTH-05 requires and which is the difference between a demo that survives contact with a judge's flaky connection and one that hangs on stage.

*Why 2-4 options.* It matches the existing dialogue UI's option-button layout, so agent-authored turns are visually indistinguishable from hand-authored ones. Out-of-range counts are rejected with a reason rather than silently clamped, because silently reshaping an agent's output teaches it nothing.

This is the decision that answers "WebMCP Leverage" in the judging rubric. A screenshot-and-click agent can move a character; it cannot author that character's lines into the game's own dialogue system. The capability is only possible because the model is resident in the browser alongside the page.

## Decision D-38 — Agent text is untrusted input

Every string the agent supplies is written with `textContent`, never `innerHTML`, and is length-capped before rendering (line and options both). Rejection is explicit.

*Why.* The agent is an LLM steered by a third party's prompt, and its output lands in our DOM. Treating it as markup would be a straightforward injection path into the page. `textContent` is also simply correct here: the companion is speaking, and its words are text. The length cap is a layout defence — the dialogue panel has a fixed region and an unbounded string would overflow it rather than wrap.

## Decision D-39 — Targets are named, and failures enumerate alternatives

`agent_move_to` accepts a target *name* — an NPC id, an object id, or a room id — and resolves it against the world. It never accepts raw coordinates. An unresolvable name returns a failure listing the valid targets in scope.

*Why.* An agent has not seen the floor plan and cannot be expected to invent workable coordinates; coordinates would also let it place the companion inside furniture, bypassing the collision guarantee in AC-COMP-05. Enumerating valid alternatives on failure turns a dead end into a recoverable step, which matters far more for an agent than for a human — a human can look at the screen, an agent only has our error string. This is the same principle already applied in the existing tools' validation messages.

## Decision D-40 — The agent gets no capability the human lacks

The new tools add movement, observation, speech, and authorship for the *companion*. They do not add stat mutation, flag setting, teleportation, or camera control.

**Amended 2026-09-03 (L-2026-09-03-04).** This decision originally noted that the inherited `set_flag` and `add_relationship` tools violated the rule, then kept them anyway on the grounds that removing tools near a deadline was the larger risk. Lucas rejected that reasoning — *"We should not have hacks like set relationship, afaik we already discussed it and decided to keep only normal game controls, should be somewhere in docs already"* — and he was right on both counts: the policy was already written down, and the deadline argument was protecting an inconsistency rather than a working feature. Both tools and their tests are deleted. A judge assessing whether an agent is genuinely *playing* would have found the ability to grant itself relationship points, and drawn the obvious conclusion.

*Why.* This follows the standing player-agent policy from L-2026-08-30-01: WebMCP is a player surface, not an admin surface. An agent that can grant itself money is not playing the game, and a judge assessing "WebMCP Leverage" is looking for genuine participation rather than state manipulation.

## Decision D-41 — Testing

Unit tests cover the bridge's descriptor translation and result wrapping against a fake `modelContext`, the companion's pure movement and target-resolution logic, and the dialogue handshake's validation, ordering, and timeout-to-fallback path. The `navigator.modelContextTesting` probe from D-34 gives an in-browser exercise path without a live agent.

Consistent with the standing decision that 3D rendering is not unit-testable, the companion's *visual* output is verified by screenshot rather than assertion. Per L-2026-09-02-13, screenshots stay opt-in and are not captured on every run.

## Decision D-42 — Deployment and submission mechanics are Lucas's, not the agent's

No DNS record is repointed, no deploy is run, and the repository's visibility is not changed autonomously. A permissive `LICENSE` file is added because the submission requires one and its absence is a hard blocker; the choice of license remains Lucas's to override.

*Why.* Publishing and making a private repository public are outward-facing, hard-to-reverse disclosure actions. The standing rule is that pushes need an explicit request every time; publication is strictly more consequential than a push.

---

## Deferred: human multiplayer (target 2026-09-06)

Out of scope for this deadline per the PRD, but the shape is recorded so the next session does not re-derive it.

The companion abstraction from D-36 is deliberately the right seam. A remote human player and a local agent companion are the same thing from the renderer's perspective: an externally-driven character with a position, a facing, a walk-cycle state, and a speech channel. Generalising `agent-companion.ts` from one seat to N seats is the actual multiplayer work; the transport is comparatively mechanical.

Recommended transport when it is built: an authoritative relay keyed by room code, with clients sending intent and receiving positions, rather than peer-to-peer. Peer-to-peer avoids a server but pushes NAT traversal, authority, and cheat surface onto a feature we would be building in a day. Edge durable-object-style hosting fits the room-code model directly, since a room is exactly one durable object with a short-lived identity. Deciding this properly needs its own ADR and is explicitly not decided here.

---

## Decision D-43 — Long-poll, not client polling, for player replies (2026-09-03)

`wait_for_player_message` holds its tool call open until the human answers, resolving immediately on their click, or after 25 s with an explicit non-error `{waiting: true}`.

*Why.* Lucas asked directly whether the agent can be notified that the user responded. It cannot: WebMCP gives a page no channel to push to an agent, and every interaction is agent-initiated. His fallback was to instruct the agent to poll every 5-15 s. But `execute()` is async and the host awaits the promise, so simply *not resolving it yet* is a legal way to make the agent wait — and that beats polling on every axis. The reply arrives in the moment rather than up to fifteen seconds later, which is the difference between a conversation and a walkie-talkie. It costs one call per wait instead of one every few seconds, so it does not burn the user's context on empty checks. And because a timeout resolves cleanly rather than erroring, it *degrades into exactly the polling loop it replaces* — the design has no downside case.

Measured at 2.6 s to resolve in Chrome against the 25 s ceiling.

*The risk we accept.* We do not know what tool-call timeout the ChatGPT browser enforces. 25 s is chosen to sit well inside any plausible limit, and `get_pending_dialogue_request` remains as the immediate, non-blocking alternative if a host turns out to dislike long calls. `callTool` became uniformly async as a consequence: one asynchronous tool in a synchronous union would have pushed the awkwardness onto every caller and every test.

## Decision D-44 — Conversations open from either side, and the agent writes its own goodbye

`start_conversation` lets the agent speak first; the human's click still opens one too. A reply option may carry `ends: true`.

*Why.* Agent-initiated conversation was the point of Lucas's request, but agent-*only* would have been a regression — he was explicit that the player must keep the ability to start one. Both paths converge on the same turn-writing tool, so there is one state machine rather than two.

`ends` exists so the agent writes the exit line in character ("Anyway, I should get back to the build") instead of the player facing a generic Close button. It also drops the minimum option count from 2 to 1: an opener may reasonably offer a single "sure, what's up?", and the old floor of 2 was written when only the human could start a conversation.

Options accept plain strings as well as `{text, ends}` objects. Agents overwhelmingly send strings, and rejecting those to force an object shape would be pedantry.

## Decision D-44 — Visible, bounded robot–NPC co-authorship (C-72, 2026-09-03)

For the submission, `agent_talk_to_npc({npcId,line,reply})` accepts both fictional lines from the external agent. It does not invoke another model, open the human's dialogue, select human options, or change quest/economy state. One tick-driven exchange holds the NPC, walks the robot to a safe nearby spot, faces both actors, emits the robot line, then the NPC reply three seconds later, and releases the NPC four seconds after that. Unavailable actors, movement failure, a 25-second approach limit, human interaction, or leaving the office cancel the exchange without a delayed reply. The existing NPC conversation hold is reused exclusively; cancellation precedes any human acquisition of that hold.

Human greetings check blocking overlays both before and after the awaited walk and reject a stale human position. NPC approaches prefer 1.75 metres and may widen to 2.75 metres around blocked furniture, with destinations at least 1.5 metres from the human observer. No human camera adjustment is made. This bounded addition is separate from the deferred durable dialogue-delivery redesign. Tracking: sacs-xtma.11; prompt/schema sacs-xtma.9; proximity/labels sacs-xtma.10.

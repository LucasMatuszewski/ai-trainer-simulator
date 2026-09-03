# Rusty WebMCP playtest review — 2026-09-03

Evidence baseline: checkout `2a3d2d9`, live in-app browser session in this task, feedback L-2026-09-03-07, Beads `sacs-xtma.8`. Review only: recommendations below are not approved implementation decisions. Lucas owns the robot-to-NPC conversation fix. No game source or server settings changed.

## What the session demonstrated

The generative coworker idea works: the agent joined as Rusty, approached the human, authored branching dialogue, remembered the coffee story, walked to the kitchen, played gestures, performed a deliberately silly literal “API key rotation,” and approached Bartek. The user found this enjoyable. That validates the social interaction loop, not every game mechanic or visual quality criterion.

Discovery was automatic after opening the page: the browser notification listed 23 site-defined tools and their schemas. The agent called them through the supported in-app browser adapter:

```js
const webmcp = await tab.capabilities.get("webmcp");
const gameTools = await webmcp.fetchTools();
await gameTools.call("get_instructions", {});
await gameTools.call("agent_join", { name: "Rusty", persona: "..." });
```

These are the game's registered tools, accessed through a host wrapper. The agent did not directly invoke `document.modelContext.getTools()` or `executeTool()`, inject an alternative registry, or use DOM clicks to simulate robot actions. This observation establishes compatibility with this host adapter, not universal compatibility of either raw browser namespace.

The browser returned results in `content: [{type: "text", text: "<JSON>"}]`, consistent with `src/webmcp/bridge.ts:109`. This was usable. The shape itself was not a blocker.

## Tool experience

| Tools | Session evidence | Assessment |
|---|---|---|
| get_instructions | Read successfully | Good entry point; remove contract contradictions below |
| agent_join | Clear rejection at title screen; success after human started | Good error; add readiness to instructions/status |
| agent_look_around | Nearby people, roles, distances, valid targets | Excellent semantic navigation; missing player and movement state |
| start_conversation | Walked to the human, opened authored line | Strong embodiment; success output overpromises in failure cases |
| supply_dialogue | Authored lines/options and ending objects rendered | Main success; schema and event identity need correction |
| wait_for_player_message | Delivered real choices and clean empty waits | Useful concept, but transport limits and delivery state need repair |
| get_pending_dialogue_request | Returned context for recovery | Useful inspection path; observed previous choice was null |
| agent_move_to | Reached kitchen; several attempts to catch moving Bartek | Needs moving-target tracking, personal space, completion feedback |
| agent_step | One metre back from Bartek, unblocked | Worked; output position describes destination, not current position |
| agent_turn | Accepted three 120-degree turns | API worked; implementation snaps yaw rather than animating a full spin |
| agent_say / agent_play_animation | Successful speech and gestures | Good expressive vocabulary; combine with dialogue to reduce latency |
| talk_to_npc | Deliberately not called | Described and wired as controlling the human; not a tested robot conversation failure |

Player-action tools, minigame, end-day, time advancement, and leave were not exercised. No claim is made that all 23 tools passed.

## Dialogue latency and reliability

### Observed transport constraint

During the live session, 20–25-second waits sometimes failed with a CDP `Runtime.evaluate` timeout. One call batched gestures and a supplied line before waiting, increasing total duration; a subsequent standalone 20-second wait also failed. Repeated standalone 10-second and later 15-second waits returned successfully. This does not establish an exact host timeout, but disproves the comment that 25 seconds is safely inside any plausible host limit (`agent-dialogue.ts`).

Start conservatively at 10 seconds for this adapter and adjust only after measuring. Do not confuse maximum wait duration with reply latency: a live waiter should return immediately on an event. Longer idle waits are efficient only when transport cancellation and delivery are reliable.

### Confirmed broker defects and recovery hazards

Direct, isolated Node assertions against the existing `src/webmcp/agent-dialogue.ts` reproduced these cases without altering the live game:

1. **History is also the delivery buffer.** `recordChoice()` wakes listeners; the listener's `onMessage` clears `lastPlayerChoice` synchronously (`:276`, `:364`). The UI then calls `requestAgentTurn()` (`main.ts:1296`), whose `request()` captures the already-cleared value (`agent-dialogue.ts:249`). The awaiting caller gets the choice, but `peek()` loses it. Separate durable conversation history from delivery state.
2. **Abandoned deliveries cannot be replayed.** If the browser stops awaiting a tool but the underlying waiter later receives a choice, the broker consumes that choice. A retry can return the turn as a fresh opening without the choice. Reproduced at broker level by abandoning the returned event; whether every live timeout left such a waiter running is unverified. Add event IDs and acknowledgement/replay, plus cancellation when the host supports it. Promise resolution is not acknowledgement by the agent.
3. **Stale events can outlive a supplied line.** A choice can remain unread while a replacement line is supplied. A later wait returns that old choice although no turn is pending; supplying a response then fails. This is consistent with the live “No rush, take your time” event followed by “no conversation is waiting,” but the exact live scheduling was not captured. Bind replies to conversation and turn IDs; reject stale supplies explicitly and return current context.
4. **request() alone does not wake listeners.** Confirmed as a broker-level gap, not the primary current human-click delay: `startAgentConversation()` currently resets the broker before requesting, which wakes existing listeners with a generic ended/empty result. A typed conversation-open event would eliminate this indirect wake/re-arm path and make the broker safe for other callers.

The statement “nothing is ever lost” in tool instructions is therefore too strong.

Suggested event contract: `eventId`, `conversationId`, `turnId`, `type` (`conversation_started`, `reply_selected`, `conversation_ended`, `idle`), current pending context, previous choice and short history. Supply should include the matching turn ID and return whether that exact turn was accepted. Keep reads replayable until explicitly acknowledged or fulfilled.

### Agent-side delays also mattered

I sometimes issued a gesture before supplying the next line. A gesture is a separate browser round trip; several individual calls took roughly 2–4 seconds and some batches much longer. Waiting for decoration before the actual answer was my mistake. Deliver text first, then gesture, or accept an optional gesture in the same supply call.

The game falls back after 12 seconds (`agent-dialogue.ts:28`). That budget includes time the agent spends obtaining context, generating a response, and getting tool calls through the browser. Fallback options can introduce additional events and stale-choice complexity. Prefer an acknowledgement/typing indicator that does not create a new conversational choice just to say “still waiting.” Preserve an explicit leave option and prevent late output from replacing a newer conversation.

Instrument four stages: player clicked; event delivered to host; supply reached game; line rendered. Include event IDs and pending-listener state. Report median and p95 click-to-render latency, timeout count and stale-event count. Without these, we cannot apportion delay precisely between model, browser adapter and game.

## Concrete tool-contract corrections

1. **Correct option schemas.** `supply_dialogue` describes 2–4 string replies, while runtime accepts 1–4 strings or `{text, ends}` objects. `start_conversation` documents objects but also publishes string-only items. `bridge.ts:80` cannot represent the union. Publish the actual union, min/max item counts, string limits and a real ending example. Our host accepted objects, but a stricter schema validator could reject them.
2. **Separate human controls from coworker controls.** Instructions claim tools for answering the human do not exist; `pick_dialogue_option`, `talk_to_npc`, `close_dialogue`, `advance_time`, `end_day` and `open_minigame` remain exposed. `main.ts:382` wires NPC talk to the human dialogue flow. Offer an explicit solo-agent versus companion mode, registering or enforcing only the appropriate actions. This is about who the agent controls, not whether the action is an admin cheat. Keep useful solo-agent tools rather than deleting them globally.
3. **Expose arrival truthfully.** `agent_move_to` immediately returns `walkingTo`, while the hackathon PRD says completion is reported after settling. Choose a clear asynchronous contract with action ID/status and an arrival event, or bounded wait mode. Never label command acceptance as arrival. `agent_step` should name its reported position `destination`.
4. **Track people, stop beside them.** `agent-companion.ts:429` resolves a person's location only at command time and paths to that exact point. The companion is excluded from NPC separation. Live output ultimately reported Bartek at distance 0; I had to step back. Reuse collision-safe approach spots, retarget while a person moves, face them, and expose blocked/cancelled/arrived outcomes.
5. **Report actual conversation approach outcome.** `main.ts:476` ignores the result of `walkToPoint`; `tools.ts:768` always returns `walkedToPlayer: true`. Return the actual outcome and do not silently open a distant conversation after a failed approach.
6. **Make look-around sufficient for roleplay.** Add current room, clock, player name/distance and valid `player` target, current walking target/status, nearby interactable objects, and pending conversation status. Keep distant target catalog separate or cached. Currently I cannot simply choose `player` from its catalog and cannot see whether a move finished.
7. **Publish and respect text limits.** Speech is capped at 120 characters; supplied lines at 240 and options at 120. Persona is also passed through the 120-character speech clamp (`agent-companion.ts:379`), which silently truncated Rusty's persona in the recovery response. Give persona its own limit, echo accepted persona on join, and flag or reject truncation so authored jokes do not silently lose their ending.
8. **Keep polling as recovery, not competing instructions.** `get_pending_dialogue_request` tells the agent to poll after joining; the instructions tool tells it to long-poll. Describe peek as a non-destructive diagnostic/recovery tool and wait as the normal event path.

## What to add, simplify, or defer

- Add optional animation to speech and supplied dialogue: one expressive action, one round trip. Short gestures currently can finish before the spoken line appears.
- Add an agent status/observe tool or extend look-around: joined identity, accepted persona, current action, pending turn, listener freshness. Reattachment should not depend on remembering JavaScript variables from a previous host turn.
- Add named object interactions with small real consequences: inspect coffee machine, use whiteboard, sit, help with a training exercise. Coffee drinking was pantomime; the tool only played an animation. Keep a few purposeful actions rather than a large emote catalogue.
- Add the robot-to-NPC conversation flow Lucas is already implementing, with separate actor identity, NPC response, and robot choices; never borrow the human's camera or dialogue state.
- Consider free-text player messages alongside authored options: the human currently chooses only from what the model offers.
- Reduce repeated empty-result prose once the protocol is established. Keep errors actionable and concise. Structured JSON inside text was manageable; fixing reliable event identity matters more than cosmetic result formatting.
- Do not claim “say to everyone” proves all NPCs hear/respond: the observed tool renders a bubble. Distinguish visible speech, directed conversation and actual simulation effects.

## Instructions and initial prompt

Keep the identity, tone, agency and no-cheating boundaries. The roleplay brief gave Rusty enough character to improvise without scripted content. Remove implementation-specific JavaScript from the ordinary player prompt; put it in a developer integration example. Ask agents to use the host's supported WebMCP interface.

Improve get_instructions with a short ordered protocol: readiness and existing companion check; join once; observe; approach and greet; respond to pending turns before side actions; re-arm a bounded listener; recover via current context on timeout; stop when the user ends play. Document exact option shapes, actor scope, movement acceptance versus completion, text limits, and the fact that speech does not itself cause an NPC reply. Avoid universal no-loss or timeout guarantees.

Suggested user prompt (compatible with the current tools):

> Open or reuse my Stack Underflow game at http://localhost:5173 in the built-in browser. Use its WebMCP tools through the interface your browser provides. Call get_instructions first. If the office isn't loaded, let me finish starting my character.
>
> Join as a distinctive robot coworker: dry IT Crowd / Silicon Valley humour, loyal to the team, with a consistent name and personality. Look around, approach me, and greet me. Walk naturally, use occasional gestures, and improvise small office adventures.
>
> Control only your robot. Never move my character or camera, choose my replies, advance the day, or grant resources. Don't invent other characters' responses or claim interactions the tools didn't perform.
>
> When I speak, prioritize supply_dialogue over gestures or commentary. Use concise lines, human-voice reply options and an explicit ending option when appropriate. Re-arm wait_for_player_message after every result; begin with a 10-second timeout for this browser, and recover from errors by checking the current pending request. During a conversation, stay available; when idle, occasional antics are welcome.
>
> Keep narration inside the game where possible. Continue until I say stop or switch to feedback. If a capability is unavailable, explain briefly instead of taking over my controls.

Host instructions can still require occasional outside-game commentary; a page prompt cannot override them. A dedicated play task without repository-development instructions would also reduce irrelevant coding-workflow overhead.

## Model choice

The tools require little deep reasoning. Consistent voice, correct event handling and quick short replies are the relevant capabilities. Test Luna at low reasoning first, and compare Terra at low if Luna loses continuity or mishandles state. This is a proposed experiment, not a measured performance ranking from this session. “Terra Light” was not a verified model identifier here; Terra with a lighter reasoning setting is a separate concept.

Official sources checked: [GPT-5.6 Luna](https://developers.openai.com/api/docs/models/gpt-5.6-luna) supports function calling and structured outputs and targets high-volume, cost-sensitive work; [model guidance](https://developers.openai.com/api/docs/guides/latest-model) recommends low reasoning for latency-sensitive work. These API descriptions do not benchmark this desktop browser route. Host-supported settings can differ.

Compare the same short scenario on each model: 15 dialogue replies, moving-target approach, wait timeout/reconnect, explicit goodbye, and conflicting human-control tools. Measure click-to-render latency and tool/state errors, then separately judge humour and character memory. Smaller models cannot fix consumed events, false success results or browser transport limits.

## Validation and limits

- Four focused existing suites passed: **79 tests** across agent dialogue, WebMCP tools, WebMCP bridge and agent companion. An existing Node localStorage warning appeared in the bridge suite without failing it.
- Four extra direct broker assertions reproduced the state cases above. They were run from an inline Node script; no tests or source were added to the checkout.
- No live event timestamps were instrumented, so exact attribution of individual delays remains unproven.
- No browser/server restart, gameplay change, deployment, or NPC-conversation implementation was performed for this review.

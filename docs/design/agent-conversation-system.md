# Design — two-way agent/player conversation over WebMCP

**Status:** **Largely SHIPPED 2026-09-03.** Written from Lucas's brief, then built the same night. Sections 3-5 are implemented; section 4.3 (pre-scripted branching turns) is the one deliberate deferral. Section 6 is diagnosis, not work.
**Parent:** [`docs/PRD-hackathon-webmcp.md`](../PRD-hackathon-webmcp.md), [`ADR 0008`](../ADR/0008-webmcp-browser-bridge-and-agent-companion.md).

---

## 1. The problem Lucas is pointing at

Today the conversation only ever starts from the human: the player clicks the robot, the game opens a pending request, the agent answers. Lucas wants the reverse to work too — **the agent should be able to start a conversation with the player** — and he wants the whole thing to feel like a real back-and-forth inside the app rather than a one-directional prompt.

The blocker is structural. **WebMCP is pull-only.** Tool calls are agent-initiated: the page cannot call out to the model, and the specification gives a page no way to push an event to the agent. So "the user just replied" cannot be delivered as a notification the way it would be over a socket.

Everything below is about how to simulate a two-way channel on top of a one-way transport.

## 2. What Lucas asked for, in his own framing

- The agent starts a conversation by supplying **main text plus 1-4 options** for the user to choose.
- The UI shows a **spinner** while the user's answer is being waited on, and again while the agent composes the next turn.
- **One option can close the conversation.** It carries any text the agent likes, plus a flag marking it as the one that ends the exchange.
- Open question he raised directly: **can the agent be notified that the user responded?** If not, instruct it to poll — "every 5s or 15s" — and expose a tool that returns the conversation history so the agent can see the answer and send the next turn.
- The instructions themselves should be discoverable, "e.g. with a `help` / `get_help` / `get_instructions` tool — similar to a skill".
- **Both directions must work.** If only the agent can open a conversation, that is worse than what we have. The player must keep the ability to start one.
- If notifications turn out to be impossible, his fallback ideas:
  - instruct the agent to open a **starter conversation at join time**, so there is always one in flight;
  - let the agent submit **multiple pre-configured turns at once** — an array of turn objects with **branching based on the previous response** — so a whole exchange can run without a round trip;
  - or add a tool that **opens a stream / notification channel** so the agent can listen for the player starting a conversation.
- His closing instruction: *"Something to research and consider all options and test what works best!"*

## 3. Research finding: there is no push, but there is long-poll

The spec has no page-to-agent event. But `execute()` on a tool is **async**, and the host awaits the promise it returns. That is enough to build a **long-poll**, which behaves like a notification from the agent's point of view:

> `wait_for_player_message({ timeout_seconds })` returns a promise that the game holds open. It resolves **the instant the player picks an option or sends a message**, or resolves with `{ waiting: true }` when the timeout expires.

This is strictly better than the 5-15 second polling loop Lucas sketched, for three reasons. The agent learns of a reply **immediately** rather than up to 15 seconds later, which is the difference between a conversation and a walkie-talkie. It costs **one tool call per wait** instead of one every few seconds, so it does not burn the user's context on empty polls. And an idle agent parked in a wait is doing nothing, whereas an idle polling loop is generating traffic forever.

The risk to test: **host-side tool-call timeouts.** We do not know what ChatGPT's browser allows. The mitigation is to keep our own timeout well under any plausible host limit (start at **25s**), always resolve rather than reject, and return an explicit `{ waiting: true, call_again: true }` so the agent knows to re-arm. A long-poll that times out cleanly degrades into exactly the polling loop Lucas described, so this design strictly dominates: it is the polling fallback, plus immediacy when the host cooperates.

**Both mechanisms shipped.** `get_pending_dialogue_request` (cheap, immediate, stateless) for an agent that just wants to check, and `wait_for_player_message` (long-poll) for an agent that wants to be responsive. `get_instructions` tells the agent to prefer the second.

**Measured:** in Chrome, the long-poll resolved **2.6 s** after being armed — i.e. on the player's click, against a 25 s ceiling. The mechanism works; what remains untested is ChatGPT's own tool-call timeout (see §5).

## 4. Proposed model

### 4.1 One conversation object, two possible openers

A single conversation exists between the player and the companion. Either side can open it:

- **Player-initiated** (SHIPPED): the player clicks the robot. A pending request appears for the agent, which answers with `supply_dialogue`.
- **Agent-initiated** (SHIPPED): the agent calls `start_conversation` with its opening line and 1-4 options. The dialogue panel opens on the player's screen unprompted — the robot walked over and said something.

Both converge on the same state machine, so the agent's turn-writing tool is the same in both cases.

### 4.2 Turn shape

```
{
  line: string,                 // what the companion says
  options: [                    // 1-4 replies offered to the player
    { text: string, ends?: boolean }
  ]
}
```

`ends: true` marks the option that closes the conversation — Lucas's "one option could just close/finish the conversation (any text, but additional option that this option closes)". The text stays the agent's to write, so the exit can be in character ("Anyway, I should get back to the build") rather than a generic Close button.

Note this widens the current 2-4 range to **1-4**: an agent-opened exchange may legitimately offer a single "sure, what's up?" reply.

### 4.3 Pre-scripted branching turns

**NOT BUILT — the one deliberate deferral.** Lucas's idea of submitting an array of turns with branching, so an exchange can run without round trips. Worth building **as an optimisation, not as the primary path**, and it lost to the long-poll on the night: with replies arriving in ~2.6 s there is no latency problem left for it to solve, and it would add a second authoring format to maintain. Revisit if the ChatGPT host turns out to cap tool-call duration low enough to make the long-poll unreliable — that is exactly the scenario a posted tree survives.

```
{
  id: "intro",
  line: "...",
  options: [ { text: "...", ends?: bool, next?: "turn-id" } ]
}
```

The agent posts a small graph; the game walks it locally as the player picks. This makes a scripted exchange feel instant and survives an agent that stops responding entirely. It should **not** replace live authoring, because live authoring is the whole differentiator — a pre-scripted tree is just a dialogue file with extra steps. The right split: live authoring is the default, and a posted tree is a latency optimisation the agent may use for openers.

### 4.4 Waiting states

Two distinct spinners, and they must not be confused:

- **Agent composing** (SHIPPED) — the player has answered and we are waiting on the agent. Shows as a single disabled option reading "(Rusty is thinking...)", named after the companion. A literal animated spinner is still worth doing; the named waiting state was the part that mattered.
- **Player deciding** — the agent is in a `wait_for_player_message` call. Invisible to the player by design; it is the agent that is waiting, and showing the player a spinner for their own turn would be nonsense.

The existing bounded-wait fallback stays: if the agent never answers, the panel shows an in-character line and remains closable. A silent agent must never freeze the human's game.

### 4.5 Discoverable instructions

SHIPPED. A `get_instructions` tool, modelled on a skill: no arguments, returns the protocol in plain language — how to join, that conversations are two-way, that `wait_for_player_message` should be preferred over polling, what `ends` means, and a worked example of a full exchange. Tool descriptions alone are too small to carry a protocol, and an agent that has to infer the loop will get it wrong.

## 5. Open questions to test

1. What is the maximum time ChatGPT's browser will await a single tool call before it gives up? This sets the long-poll ceiling. **Test empirically** with an escalating timeout.
2. Does the host serialise tool calls? If an agent cannot call anything else while parked in a long-poll, the wait must be short enough to stay responsive to the user's own chat.
3. Does an unprompted dialogue panel feel good, or intrusive? An agent that opens a conversation while the player is mid-task may be annoying. Consider a soft-open: the robot shows a speech bubble and the panel only opens if the player engages.
4. Do we need a message-length or rate limit on agent-initiated openings, to stop a chatty agent spamming the panel?

## 6. Why the ChatGPT desktop browser may show no tools

Lucas reported the tools appearing in Chrome with the experimental flag plus a WebMCP extension, but **not** in ChatGPT's built-in browser. This is very unlikely to be our bug — the same registration serves both. Known gating on OpenAI's side, in the order worth checking:

1. **Model.** Site tools require **GPT-5.6 Sol or Terra**. **GPT-5.6 Luna has WebMCP disabled.** This is the most common cause.
2. **Workspace type.** Site tools are **not available in Enterprise or Edu workspaces**.
3. **Permission toggle.** Browser settings → Permissions → *Enable site tools*.
4. **Surface.** Support landed for ChatGPT Work and Codex in the desktop app's built-in browser; other surfaces may lag.
5. **The address-bar affordance.** When tools are detected an **arrow appears in the address bar**, showing whether a tool reads data or makes changes. No arrow means the host did not detect the registration — which is the signal that distinguishes "our page failed" from "the account is gated".

Our own diagnostic is the title-screen line: **"Agent play ready - N WebMCP tools live"**. If that line says ready and the address-bar arrow is still absent, the gating is on OpenAI's side, not ours.

Sources: [OpenAI Help Center — using site tools](https://help.openai.com/en/articles/20001423-using-site-tools-in-the-chatgpt-desktop-app), [ChatGPT Learn — site tools](https://learn.chatgpt.com/docs/webmcp).

## 7. Tool-surface corrections Lucas asked for — all SHIPPED

All four landed on 2026-09-03.

- **Self-describing schemas.** SHIPPED. The extension rendered `{"target": "example_string"}` because our JSON Schema carries only a type and a description. Every parameter needs a concrete `examples` value, and every no-argument tool should say so explicitly rather than showing a bare `{}`.
- **No coordinates.** SHIPPED — the reason is now in the tool description itself. Lucas asked whether `agent_move_to` should take coordinates. **It should not**, and the reason belongs in the tool description so an agent never goes looking: an agent has not seen the floor plan, and coordinates would let it place itself inside furniture, bypassing the collision guarantee every other character obeys. Names are the interface; the failure path lists every valid name.
- **Direct movement controls.** SHIPPED as `agent_step` (forward/back/left/right, camera-relative, collision-checked, clamped to 3 m) and `agent_turn` (degrees). Alongside `agent_move_to`, these expose the raw controls a human has — step forward/back, strafe, turn — so an agent can drive the companion the way WASD drives the player, instead of only issuing high-level destinations.
- **Remove the admin hacks.** SHIPPED — both deleted, with their tests. `set_flag` and `add_relationship` contradicted the standing player-only policy (L-2026-08-30-01, ADR 0008 D-40) and must go. Lucas: *"We should not have hacks like set relationship, afaik we already discussed it and decided to keep only normal game controls, should be somewhere in docs already."* He is right — it was documented, and the tools were left in place anyway.

---

## 8. What shipped, in one list

| Tool | What it does |
|---|---|
| `get_instructions` | The protocol in plain language. Skill-style briefing. |
| `agent_join` / `agent_leave` | Take or release the single companion seat. |
| `agent_look_around` | Nearby people with roles, plus every name that can be walked to. |
| `agent_move_to` | Walk to a person or room **by name**; failures list every valid name. |
| `agent_step` / `agent_turn` | Raw WASD-equivalent controls for fine positioning. |
| `agent_say` | Speech bubble over the companion's head. |
| `start_conversation` | **Agent opens** a conversation: line + 1-4 options. |
| `wait_for_player_message` | **Long-poll.** Resolves the instant the player answers. |
| `get_pending_dialogue_request` | Immediate, non-blocking check. The fallback. |
| `supply_dialogue` | Write the next line + the replies offered to the player. |

Removed: `set_flag`, `add_relationship`.

## 9. Still open

- §4.3 pre-scripted branching turns — deferred, see above.
- A real animated spinner rather than a disabled "(thinking...)" option.
- The §5 host-behaviour questions, which need a live ChatGPT session to answer.
- Whether an unprompted panel is intrusive; the soft-open idea (bubble first, panel only on engagement) is untested.

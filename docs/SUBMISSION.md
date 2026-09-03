# Devpost submission draft — Stack Underflow

Draft for the OpenAI WebMCP Challenge (deadline **2026-09-03, 13:00 PDT / 21:00 Europe/Lisbon**). Lucas edits and submits; nothing here is posted automatically.

The challenge asks for a written description covering **use-case fit, user-experience improvement, collaborative capability, and implementation approach**, judged on **WebMCP Leverage, Execution, Potential Impact, Creativity & Ambition**.

---

## Tagline

An office comedy where your browser's AI agent doesn't operate the game — it plays it, as a coworker whose lines it writes itself.

---

## What it is

Stack Underflow is a 3D browser game about being an IT trainer at a dysfunctional software company. You walk around an office, talk to colleagues who have schedules and opinions, and try not to go bankrupt.

With WebMCP, an AI agent in your browser can join that office as a second character: a robot coworker with a body, a position, and a voice. You can see it. You can walk up to it. You can talk to it.

## Why this needs WebMCP specifically

Most agent-on-a-webpage demos are remote controls. The agent reads the screen and clicks things a person could have clicked. Useful, but it does not need a model inside the browser — a screenshot pipeline gets you the same thing.

This does need one.

When you start a conversation with the robot, the game hands the agent the situation — who is speaking, where, what time it is in-game, what you chose on the previous turn — and the agent writes **the robot's spoken line and the two-to-four replies you are offered**. Those lines were never written by the game's author. They render in the game's own dialogue window, in the same panel, in the same font, indistinguishable from hand-authored content.

That is an NPC driven by a large language model with **no API key in the game, no inference backend, and no per-player cost**, because the model is already in the player's browser. A screenshot-and-click agent cannot do this at any price: it can press a dialogue button, but it cannot author a character into the game's dialogue system.

The same property is what makes it distributable. A hobby game cannot afford an LLM NPC for every visitor. With WebMCP, the player brings the model.

## What the agent can and cannot do

The agent is a **player, not an administrator** — a rule the project has held since well before this contest.

It can join and leave, look around, walk to people and rooms **by name**, speak aloud, and author its own character's dialogue.

It cannot move your camera, choose your dialogue options, give itself money or reputation, set game flags, or teleport past collision. It walks with the same pathfinding, the same walk cycle, and the same collision as every other character in the office.

## The user experience this improves

Without WebMCP, "play alongside me" means an agent narrating what it would do, or driving your cursor and taking the game away from you. Here the collaboration is legible and non-exclusive: the agent has its own body, and you keep yours. You can both be in the room. Neither blocks the other — if the agent goes quiet mid-conversation, the robot falls back to an in-character line and the panel stays closable, so a slow or disconnected agent can never freeze the human's game.

## Implementation

- **Registration** (`src/webmcp/bridge.ts`). Tools are registered with the browser's model-context surface at page load. The namespace is *probed*, not assumed — `document.modelContext`, then `navigator.modelContext`, then the testing shim — because the specification is still moving and current sources disagree, and a wrong guess is an invisible dead integration with no chance to patch after the deadline. Registration never throws: a browser without WebMCP reaches a fully playable game with no visible difference.
- **The tool surface** (`src/webmcp/tools.ts`). 19 tools. Every failure is actionable — an unknown destination comes back with the list of valid ones, because an agent that has never seen the floor plan cannot be expected to guess coordinates.
- **The companion** (`src/engine/agent-companion.ts`). Composed from the same pure functions the scheduled NPCs use — A* pathfinding, the procedural walk cycle, the mesh builder, the shared speech-bubble layer — rather than injected into the NPC scheduler, which is built around a fixed cast.
- **Authored dialogue** (`src/webmcp/agent-dialogue.ts`). A poll-and-supply handshake with a bounded wait, never an await. WebMCP calls are agent-initiated; the page cannot call out to the model, so the pending turn is readable state and the human is never held hostage to the agent's latency.
- **Safety.** Agent-supplied text is untrusted input: rendered as text, never as markup, and length-bounded. There is an end-to-end test that supplies an XSS payload and asserts it appears as literal characters.

Verified end to end in a real browser: 5 Playwright tests drive the whole loop through injected WebMCP tool calls, alongside 605 unit tests.

## Try it

1. Open the game in ChatGPT's browser, or in Chrome with `chrome://flags/#enable-webmcp-testing` enabled.
2. The title screen prints **"Agent play ready — N WebMCP tools live"**. If it says agent play is unavailable, the browser has no model-context surface; the game still plays normally.
3. Ask your agent: *"Join my game as a coworker called Rusty who is a sarcastic QA engineer. Walk over to Bartek and say hello."*
4. Walk up to the robot and click it. Ask your agent to keep answering — it is writing every line you read.

## Honest limitations

The game underneath is a good-looking, funny simulation, but it is still light on challenge: quests resolve quickly and there is not yet a fatigue or resource loop to push against. The agent integration is the finished part; the surrounding game is a work in progress and the roadmap for it is in the repository.

Multiplayer between humans is designed but not built — the companion abstraction is deliberately the right seam for it, since a remote player and a local agent are the same thing to the renderer.

## Credits

Built by **Edukey** and **DevPowers**. The fictional company in the game is a comedy of dysfunction and is not either of them.

Much of the game — including its music and text-to-speech — was produced with **MiniMax M3**.

---

## Submission checklist

- [ ] Public repository (currently **private** — must be flipped)
- [x] Open-source license (MIT)
- [x] Complete source and assets
- [x] Setup and run instructions (`README.md`)
- [ ] Live public URL over HTTPS
- [ ] Public YouTube demo video, **under 3 minutes, with audio**
- [x] Written description (this document)

### Suggested video beats (~2:30)

1. **0:00** Title screen. Point at "Agent play ready — 19 WebMCP tools live". *"The page told the browser what it can do."*
2. **0:15** Walk into the office. It is a real game, with real people.
3. **0:35** Ask the agent to join. The robot appears. Show the tool call.
4. **0:55** Ask it to walk to a named colleague and speak. It walks; the bubble appears.
5. **1:20** Walk up to the robot. Open the conversation. **Say plainly: the game's author never wrote these lines.**
6. **1:50** Pick a reply. Show the agent reading the choice back and answering it.
7. **2:10** Close on the point: no API key, no backend, no per-player cost — the player brought the model.

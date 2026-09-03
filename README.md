# AI Trainer Simulator

A 3D retro pixel-art browser game where you are an IT trainer at a quirky office in Warsaw. Walk around, talk to coworkers, deliver training, run standups, debug client scripts, and try not to go bankrupt. Full vision in `docs/PRD.md`; the shared roadmap is in `docs/plans/game-roadmap.md`.

> "Make this the best simulator business retro game in the history, a real game, not just a demo." — Lucas

## WebMCP: play alongside an AI agent

This game exposes its own gameplay to a browser-resident AI agent through
[WebMCP](https://github.com/webmachinelearning/webmcp). The agent does not
screenshot the page and guess at pixels - it calls real tools that drive the
same code paths the human player's input drives.

The agent is a **player, not an administrator**. It can join as a visible
robot coworker, look around, walk to named people and places, and speak. It
cannot give itself money, set flags, teleport, move your camera, or answer
your dialogue choices for you.

The capability worth looking at is **agent-authored dialogue**: when you talk
to the robot, the game hands the agent the conversation context, and the agent
writes that character's spoken line and the reply options you are offered.
Those lines were never written by this game's author. It is an LLM-driven NPC
whose inference runs in your browser, so the game ships no API key and costs
nothing per player.

### Trying it

1. Open the game in a browser with WebMCP available - ChatGPT's browser, or
   Chrome with `chrome://flags/#enable-webmcp-testing` set to **Enabled** and
   relaunched.
2. **Verify it is live before you start:** the title screen prints
   `Agent play ready - N WebMCP tools live`. If it says agent play is
   unavailable, the browser has no model-context surface and the game will
   still play normally, just without the agent. The browser console carries
   the same result under `[webmcp]`.
3. Ask your agent to play along - for example, *"join my game as a coworker
   called Rusty, walk over to Bartek, and say hello."*
4. Walk up to the robot and press the interact control to start a
   conversation with it.

### How it is built

- `src/webmcp/tools.ts` - the tool implementations and their validation.
- `src/webmcp/bridge.ts` - registration with the browser. Probes
  `document.modelContext`, then `navigator.modelContext`, then the testing
  shim, because the specification is still moving and sources disagree on the
  namespace.
- `docs/ADR/0008-webmcp-browser-bridge-and-agent-companion.md` - why it is
  built this way, including why the agent companion deliberately sits outside
  the NPC scheduling system.
- `docs/PRD-hackathon-webmcp.md` - the requirements and acceptance criteria.

Registration never throws. A browser without WebMCP support reaches a fully
playable game with no visible difference.

## How to run the game

### Live preview (RECOMMENDED — has HMR)

```bash
pnpm dev
```

Open `http://localhost:5173/` in your browser.

Every time you save a `.ts` / `.css` file, the page reloads automatically (Vite HMR). **This is the URL to use during development.** The dev server is already running; you don't need to start it.

### Production preview (static build on port 4173)

```bash
pnpm build          # one-off production build
pnpm build:watch    # rebuilds dist/ on every save
pnpm preview        # serves dist/ at http://localhost:4173/
```

`pnpm preview` is a **static file server** — it does NOT watch for source changes. To see changes on 4173, you must run `pnpm build` (or `pnpm build:watch`) first.

**Common mistake (Lucas, 2026-08-29):** testing on 4173 while the agent edits source on 5173 → "the fix didn't work!" — but it did, 4173 was just serving the old `dist/`. Use 5173 for live preview.

### Run both side by side (live preview at 5173, production at 4173)

```bash
# Terminal 1: dev server with HMR (live preview)
pnpm dev

# Terminal 2: rebuild dist/ on every save
pnpm build:watch

# Terminal 3: serve dist/ at 4173 (optional, for "real" production build)
pnpm preview
```

## Tests

```bash
pnpm typecheck   # TypeScript only, fast
pnpm test        # vitest, unit tests (68 tests as of 2026-08-29)
pnpm test:e2e    # Playwright e2e smoke
```

## Project layout

```
src/             game source (TypeScript)
tests/unit/      vitest unit tests
tests/e2e/       Playwright end-to-end tests
docs/PRD.md      what we're building (with corrections log)
docs/ADR/        architecture decisions
docs/plans/      shared roadmap and code-bound plans (status stays in Beads)
AGENTS.md        agent rules (read this if you're a new agent)
```

## Project status

The game has progressed beyond the original numbered phase snapshot, so status is intentionally not duplicated here. Current work and known issues live under Beads epic `sacs-xtma`; the product progression is in `docs/plans/game-roadmap.md`, and Lucas's complete append-only feedback record is in `docs/LUCAS-FEEDBACK-INDEX.md`.

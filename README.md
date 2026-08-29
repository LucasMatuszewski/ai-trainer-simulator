# AI Trainer Simulator

A 3D retro pixel-art browser game where you are an IT trainer at a quirky office in Warsaw. Walk around, talk to coworkers, deliver training, run standups, debug client scripts, and try not to go bankrupt. Full vision in `docs/PRD.md` and `~/.claude/plans/glistening-napping-hinton.md`.

> "Make this the best simulator business retro game in the history, a real game, not just a demo." — Lucas

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
~/.claude/plans/ active phase plan (shared across agents)
AGENTS.md        agent rules (read this if you're a new agent)
```

## Status (as of 2026-08-29)

- **Phase 0** (fix obvious bugs): done.
- **Phase 1** (intro cinematic + onboarding + quest log): done.
- **Phase 2** (FPS walking, Pattern D mouse-look, LMB click-to-talk): done, but unverified on 4173 by Lucas — use 5173 to confirm.
- **Phase 3** (NPC life, schedules, speech bubbles): pending.
- **Phase 3.5** (NPC visuals — Burek = real dog, gendered NPCs, desk proportions): pending (started, only desk depth done).
- **Phase 4-6** (multi-room world, multi-turn dialogue, polish): pending.

The full list of known issues + Lucas's bug reports is in `~/.claude/plans/glistening-napping-hinton.md` §"Lucas's mid-turn bug report" and §"Phase 3.5".

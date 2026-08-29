# AGENTS.md — AI Trainer Simulator

Project-specific instructions for every agent (Claude Code, Codex CLI, agy, opencode, grok, T3) working on the AI Trainer Simulator. The global rules in `~/AGENTS.md` apply on top of these.

## What this game is

A single-player 3D retro pixel-art browser game where the player is an IT trainer/consultant. The full vision is in `docs/PRD.md`. The phased roadmap is in `~/.claude/plans/glistening-napping-hinton.md`. The architecture is in `docs/ADR/000-main-architecture.md`.

**The user's mandate (verbatim):** "make it the best simulator business retro game in the history, a real game, not just simple demo, make it huge and ambitious! Do not stop until you have detailed graphics, funny storyline, high engagement, working mechanics, and no bugs at all." This is not an MVP. The Definition of Done is a polished, full game.

**Project source of truth (read these BEFORE designing anything):**
1. `docs/PRD.md` — what to build, including the corrections log
2. `~/.claude/plans/glistening-napping-hinton.md` — what is in flight, phase by phase
3. `docs/ADR/000-main-architecture.md` — technical decisions
4. `~/AGENTS.md` — global hard rules (NEVER skip)
5. `~/.claude/CLAUDE.md` — model orchestration rules (which CLI to use for what)

## Hard rules for this project

These project-specific rules are non-negotiable. The global HR-1, HR-2, HR-3, HR-4, HR-5 from `~/AGENTS.md` apply on top.

### PR-1: Design decisions live in the PRD corrections log, not in chat.

When the user gives a design decision or correction:
1. The agent reads `docs/PRD.md` first.
2. The agent updates the PRD, adding a "C-NN" entry to §13 (Corrections Log) and changing the affected section.
3. The agent updates `~/.claude/plans/glistening-napping-hinton.md` if the change affects phase scope or order.
4. The agent confirms the doc updates with the user BEFORE writing any code.

This rule exists because the user got fed up on 2026-08-29 with the agent making changes without documenting them.

### PR-2: The user MUST see a screenshot after every phase.

After completing a phase (or a meaningful sub-step within a phase), the agent MUST:
1. Run a Playwright screenshot of the key state of the phase.
2. Save the screenshot to `screenshots/`.
3. Describe the screenshot with `agy -p "describe this screenshot"`.
4. Show both to the user before starting the next phase.
5. The user is the visual QA. The agent does not declare a phase "done" without the user seeing the screenshot.

The user has explicitly said: "Continue until you make this game perfect!" That does not mean "ship without showing me." It means "iterate until the user is happy." The screenshot is the iteration loop.

### PR-3: Every pure function has a unit test.

- TDD is mandatory for any new pure function in `src/`.
- The `pnpm test` script is `vitest` (`vitest run`).
- New tests go in `tests/unit/<name>.test.ts` (mirroring `src/<name>.ts`).
- 3D rendering is NOT unit-tested; it is verified by Playwright screenshots.
- The agent does not mark a phase "done" if `pnpm test` is failing or has fewer tests than before the phase.

### PR-4: Commit granularly. Never sweep. Push at the end of each phase.

Per `~/AGENTS.md` global rule HR-6:
- One logical change per commit. The commit message says WHAT and WHY.
- `git add -A`, `git add .`, `git commit -a` are forbidden. Always stage explicit paths.
- The agent commits without being asked (each verified logical step).
- A "logical change" for this project includes: extracting a pure function, adding tests, fixing a bug, adding one new NPC, adding one new dialogue tree, fixing the camera, etc. NOT a whole phase.
- **Push at the end of each phase**, NOT mid-phase. A phase is "finished" only when ALL of these are true:
  1. All PRD acceptance criteria for the phase are met.
  2. `pnpm typecheck` exits 0.
  3. `pnpm test` exits 0 (new + existing tests).
  4. Playwright screenshot of the phase's key state is in `screenshots/`.
  5. `agy -p "describe this screenshot"` describes the screenshot and the description does not contain a regression ("no clear office interior visible", "looks like a roof from outside", "no NPCs visible", etc.).
  6. An independent QA review has been run by `codex exec --sandbox workspace-write` or `agy -p` and the verdict is pass.
  7. Lucas has been shown the screenshot + QA verdict and has not asked for changes.
  8. THEN push: `git push origin <current-branch>`. The agent reports the push URL to Lucas in the final message.
- **Revert is always available.** If a phase "broke something seriously" and the agent can't fix it, the agent reverts (`git revert <bad-commit>` or `git reset --hard <last-good>`), reports what was reverted, and continues. The agent does NOT keep going on a broken state.
- **Never push mid-phase or as a "backup."** Mid-phase pushes pollute the history and confuse reviewers. The push IS the phase boundary.

### PR-5: Use the right CLI for the work.

Per `~/.claude/CLAUDE.md` model orchestration:
- Architecture / plans / final review / judgment: Claude (this session) does it.
- Implementation / bulk code / refactors / backend: `codex exec` (gpt-5.6 Sol).
- Well-specified mechanical batches / overflow: `grok` (grok-4.5).
- Taste work (UI, GUI, copy, dialogue humor, marketing): `opencode run` (glm-5.2).
- Vision (screenshot description, image analysis): `agy -p`.
- Research / independent second opinion: `agy -p`.

The agent does NOT spawn a Claude subagent to relay a brief to a CLI. The agent calls the CLI directly via Bash.

### PR-6: Briefs use `.agent-briefs/<task>.md`.

Every delegate gets a self-contained brief:
- Title, what to do, exact files to change, definition of done.
- Context the delegate does not have (the relevant PRD section, the relevant code excerpt).
- "Do not commit" / "Do not push" at the bottom.

Multiple parallel delegates get DIFFERENT files / scopes so there are no shared-file races.

### PR-7: The agent verifies delegated work before committing.

After any delegated implementation, the agent:
1. Runs `git status --short` and `git diff --stat`.
2. Inspects the diff to make sure the delegate did what was asked (and nothing else).
3. Runs the cheap checks: `pnpm typecheck`, `pnpm test`, focused Playwright screenshot.
4. If anything looks wrong, the agent fixes it or sends a follow-up to the delegate.
5. The agent commits the verified work. The delegate does not commit.

### PR-8: TDD process + research 3D testing (2026-08-29, from Lucas)

Lucas flagged: "not sure how to test 3D game in three.js - you should research this (I suggest to delegate this task and writing tests to other agent), you can then add TDD process here." Two obligations:

1. **Research the current best practice for testing three.js code.** This is a one-shot research task delegated to `agy -p` (best Google data access). The output goes to `.agent-briefs/threejs-testing-research.md` and is summarized in this rule.
   - The brief for the research: "What is the current (2026) best practice for testing three.js code? What can be unit-tested (pure functions, math, raycasters), what requires headless browser (jsdom + WebGL stub or a real Chromium), and what requires visual regression (Playwright screenshots + image diff or AI description diff)?"
   - The research MUST answer: (a) what frameworks / libraries exist (e.g. `three-test`, `vitest-canvas-mock`, `playwright`), (b) what is the trade-off, (c) what does this project already have (we have vitest + Playwright), (d) what is the recommended minimal stack for this game.
   - The agent reviews the research and either adopts the recommendation or explains why we deviate.
2. **Apply TDD to every new pure function.** From this point on, every new pure function in `src/` gets a vitest test FIRST. The test fails (red), the function is written (green), the function is refactored (still green). The TDD cycle is a single commit per function: `[red] failing test`, `[green] function passing test`, `[refactor] cleanup`. Or the agent collapses the cycle into one commit when the function is small and obvious.
   - **What is "pure" in this project:** the AABB collision (`src/engine/collision.ts`), the reducer (`src/game/state.ts`), the dialogue tree walker, the NPC schedule lookup, the bubble trigger check, the walk-to-face planner, the cinematic timeline, the game-event eligibility check, the economy tick, the save/load round-trip, the room/doorway geometry queries, the WebMCP tool definitions (in the future).
   - **What is NOT pure and is exempt from TDD:** the three.js scene setup, the renderer config, the camera math (it's math but the assertions are visual), the UI components, the audio playback, the dialogue UI state.
   - **Delegate the test-writing to Codex.** Per `~/.claude/CLAUDE.md`, mechanical work goes to `codex exec --sandbox workspace-write`. The agent writes a brief: "Here is the function signature and its behavior. Write a vitest test suite covering: X, Y, Z edge cases. Do not commit." Codex writes the test, the agent runs it (it should fail), the agent writes the function, the agent runs the test again (it should pass), the agent commits both.
3. **Visual regression for the 3D layer.** The 3D rendering is verified by Playwright screenshots + `agy -p "describe this screenshot"` descriptions. The workflow is:
   - Take a screenshot of the phase's key state. Save to `screenshots/<phase>-<state>.png`.
   - Run `agy -p "describe this screenshot in one paragraph, including: what room is shown, are NPCs visible, is the player visible, is there any 'roof' or 'outside' visible, is the lighting correct"`.
   - Save the description alongside the screenshot as `screenshots/<phase>-<state>.txt` (or in the commit body).
   - The description is part of the Definition of Done for the phase.
   - For automated visual regression (future iteration), the description can be JSON-diffed or the image can be pixel-diffed with a baseline. The current approach is human-review (agy + Lucas). The baseline-diff approach is a Phase 6+ task.

This is the new TDD process. It is added to the project's Definition of Done and to the orchestrator's per-phase checklist.

## Current design direction (post-2026-08-29 corrections)

The user's corrections on 2026-08-29 changed the design direction. The corrected PRD is in `docs/PRD.md` §13. Summary:

- **Camera is first-person, not over-the-shoulder.** `camera.position = player.position + (0, EYE_HEIGHT, 0)`. Mouse does not orbit the player. The player avatar turns to face the yaw direction.
- **Default state is free mouse.** RMB-hold = mouse-look mode. Click (LMB) = raycast interaction. Roster panel is the primary way to choose an NPC from a distance.
- **Custom pixel-art cursor** (Amiga style). 4 states: default, hover NPC, hover object, busy.
- **Walk-to-face** before every dialogue. The player walks to 1.5m in front of the NPC; the NPC turns to face the player; dialogue opens.
- **Multi-turn dialogues** (4-8 turns minimum per conversation). NPCs remember past conversations. Greetings vary by "how many times talked today."
- **NPCs sit AT desks, face their monitors, have idle animations.** Procedural variation: each desk has a random wood tint, each NPC has random items (mug color, sticky notes, plant).
- **NPC schedule per period** (morning/afternoon/evening). NPCs move between their schedule targets. The CTO is gone by afternoon. The janitor arrives late.
- **Inter-NPC speech bubbles** when 2 NPCs are within 2.5m of each other. 50+ curated lines.
- **Day-1 intro cinematic** with sky, trees, birds, neighboring buildings, road with cars. Exterior meshes disposed after the cinematic.
- **Roster panel and trigger prompts are larger** (16-18px font, generous padding).
- **Camera is NEVER through walls** — first-person by construction.

A new agent on this project should READ the corrections log in `docs/PRD.md` §13 BEFORE making any design decision. The "obvious" choice (over-the-shoulder camera, always-rotating mouse, single-turn dialogue) was already tried and rejected.

## Build & test commands

- `pnpm typecheck` — TypeScript only, fast.
- `pnpm test` — vitest, unit tests.
- `pnpm test:e2e` — Playwright e2e smoke.
- `pnpm dev` — Vite dev server. Already running on `http://localhost:5173/` (don't restart it).
- `pnpm build` — Vite production build. Don't run unless asked.

The dev server is on WSL2 at `http://localhost:5173/`. Use Playwright MCP (`mcp__plugin_playwright_playwright__*`) to drive it.

## File map

```
src/
  main.ts                  # Wiring, frame loop, screen transitions
  engine/
    renderer.ts            # three.js renderer, pixel-art upscale
    scene.ts               # Office scene, NPCs, furniture
    controls.ts            # Player controls (WASD, mouse, sprint)
    collision.ts           # AABB collision (pure function)
    cinematic.ts           # Intro / end-of-day cinematics (Phase 1+)
    npc-idle.ts            # NPC idle animations (Phase 3)
    walk-to-face.ts        # Auto-walk before dialogue (Phase 2+)
    npc-controller.ts      # Per-NPC update (position lerp, rotation)
    bubbles.ts             # Inter-NPC speech bubbles
  content/
    npcs.ts                # NPC definitions, positions, dialogue trees
    dialogues.ts           # All dialogue lines + trees
    npc-schedule.ts        # Per-NPC per-period schedule (Phase 3)
    quests.ts              # Quest chain data (Phase 1)
    events.ts              # Random events (Phase 3.5 — done)
  game/
    state.ts               # GameState + reducer
    __tests__/             # state.test.ts
  ui/
    dialogue.ts            # Dialogue overlay (multi-turn)
    hud.ts                 # HUD: cash, day, time, prompt
    office-roster.ts       # Roster card list
    quest-log.ts           # Quest log panel (Phase 1)
    help-modal.ts          # Help button modal (Phase 1)
    title.ts               # Title screen
    character-create.ts    # Character creation modal
  minigames/
    debug-script.ts        # The "Debug the Script" minigame
tests/
  unit/                    # vitest
  e2e/                     # Playwright
.agent-briefs/             # Briefs for delegates (not shipped)
screenshots/               # Playwright screenshots (committed)
docs/
  PRD.md                   # WHAT to build (including corrections log)
  ADR/
    000-main-architecture.md  # Technical decisions
```

## Open corrections / known issues

As of 2026-08-29:
- The currently-shipped camera is over-the-shoulder. The first task for any new agent is to migrate it to first-person per C-01.
- The currently-shipped dialogue is single Q-and-A. The first dialogue task is to migrate to multi-turn per C-10.
- The currently-shipped intro is a broken roof shot. The intro task per C-07.
- No custom cursor (PR-3, C-03).
- NPCs sit in the middle of the desk (C-08 / C-19).
- Mouse always rotates the view (C-02).
- The currently-shipped world is the 20x20 office only. Multi-room world per C-12 / D-18 is the next phase.
- No quests. First-day quest chain per C-22 / D-29 is Phase 1.
- No NPC variation. Procedural variation (mug colors, items, wood tints) per C-19 / D-26 is Phase 3.
- Stuck-dialogue bug per C-17 / D-24 is Phase 0 (done).
- Time runs at 60s/period. Bump to 300s/period per C-16 / D-23 is Phase 0 (done).
- No DevPowers + Edukey branding. Soft rebrand per C-13 / D-20 is a single commit.
- No WebMCP. WebMCP layer per C-14 / D-21 is Phase 7.
- No NPC stochastic life. Per-day random seed per C-15 / D-22 is Phase 3.
- TTS only for important moments. Audio scope per C-20 / D-27 is a scope rule, no code change.

A new agent should pick up at the next unfinished phase per the plan, but FIRST confirm with the user which of the open corrections they want tackled first. The full corrections log is in `docs/PRD.md` §13 (C-01..C-24) and the architecture is in `docs/ADR/000-main-architecture.md` §13 (D-08..D-19) and the new §14 (D-20..D-31).

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

## Shared Beads epic — start here for game work

The umbrella issue for this growing game is **`sacs-xtma` — “Stack Underflow / AI Trainer Simulator game.”** It is the durable entry point for the game backlog across agents and devices.

Before creating any game issue:
1. Run `bd show sacs-xtma` to recover the epic context and inspect its children.
2. Search the shared backlog by meaning (`bd search "<concept>"`) and enrich an existing issue instead of creating a duplicate.
3. If the work is a genuinely new game deliverable, create exactly one child under the epic with `--parent sacs-xtma`. Keep one deliverable per issue; split independent outcomes into separate children.
4. Link the relevant feedback (`docs/LUCAS-FEEDBACK-INDEX.md` ID), PRD/ADR, and implementation plan from the issue rather than copying those documents into Beads.

Do not put unrelated repository maintenance or machine-specific work under this epic merely because it touches this checkout. The global SACS workflow in `~/AGENTS.md` and the `agents-workflow-sacs` skill remains authoritative for priorities, claiming, dependencies, notes, and closing.

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

### PR-9: Lucas's "do not ignore" rules (2026-08-29)

Lucas has been emphatic that the agent must not ignore his messages. These rules are non-negotiable, on top of HR-1 / HR-2 / HR-3 from `~/AGENTS.md`:

1. **Every message from Lucas is read, parsed, and acknowledged.** No message is dropped. If a message contains multiple decisions (e.g. "ad.1... ad.2... ad.3..."), each decision is handled. (HR-1 supersedes; this rule is the operational version.)
2. **Decisions from the message go into the PRD/ADR/Plan BEFORE any code work.** Same as HR-2 but restated: "do not ignore this message again" means do not start coding on a new instruction without first updating the docs.
3. **When research contradicts a direct user decision, the user decision wins UNLESS the agent has a strong argument.** If the agent overrides, the override must be explicit ("I am overriding X because Y from research report Z") and defensible.
4. **"Make your own decisions when needed."** If Lucas is silent on a question, the agent picks a reasonable default, documents it in the PRD/ADR, and proceeds. The default is reversible.
5. **"We can do both" / "Mix both" — no either/or interpretations.** When Lucas says "mix both" (e.g. C-15 stochastic), the agent mixes all the layers Lucas mentioned, not just one.
6. **The agent never declares a phase "done" unilaterally.** The phase is "done" only when: typecheck ✓, tests ✓, screenshot ✓, agy description ✓, codex/agy QA verdict ✓, Lucas has acked the screenshot.

These rules apply to every phase, every commit, every interaction with Lucas.

### PR-10: Lucas's overall mandate — "the best simulator business retro game in the history" (2026-08-29)

Lucas's verbatim mandate: "make this the best simulator business retro game in the history, a real game, not just simple demo, make it huge and ambitious! Do not stop untill you have detailed graphics, funny storyline, high engagement, working mechanics, and not bugs at all."

This is the project's north star. Every phase is checked against this mandate before declaring it "done." A phase that does not move the game toward "the best simulator business retro game in the history" is the wrong phase.

The mandate is captured in PRD §13 C-26 and the plan's Endgame additions (C-26). The agent reviews C-26 at the start of every phase and reports progress against it.

### PR-12: Lucas's feedback is captured before it gets lost (2026-08-30)

Every message from Lucas may contain feedback that must not be
forgotten between sessions. The agent MUST:

1. **Write the feedback to `docs/LUCAS-FEEDBACK-INDEX.md`** before
   doing anything else. The entry is timestamped, has a unique
   id (`L-YYYY-MM-DD-NN`), and lists every concrete item from
   the message.
2. **Cross-reference** the items to be added in `docs/PRD.md`
   (new §13 entry) and the plan file
   (`~/.claude/plans/glistening-napping-hinton.md`).
3. **Create new ADRs** for any technical decision that emerges
   (e.g. ADR-0010, ADR-0011, ADR-0012).
4. **Link the index from this file** so future agents find it.

The index is a running log; never delete or compress entries.

### PR-11: TDD methodology for every feature (2026-08-30)

The TDD rule in PR-8 covers pure functions. It does not cover data files, event-loop handlers, or the "did the test actually catch the bug?" verification step. This rule extends PR-8 to cover all of those.

1. **Every new feature has at least one test that fails before the implementation.** This applies to:
   - Pure functions (already covered by PR-8).
   - Data files: every new typed data export (an NPC schedule, a dialogue tree, a world layout, an action list) must have at least one unit test that imports the data, asserts its shape (correct types, correct values for the specific "interesting" cases the data was designed to model), and would FAIL if the data were corrupted.
   - Event-loop handlers: every new `window.addEventListener` or `document.addEventListener` in the controls / input layer must have an integration test in jsdom (or equivalent) that dispatches the real event and asserts the resulting state.
   - Renderable entities: every new THREE.Object3D factory (NPCs, room walls, furniture, signs) must have a unit test that constructs the mesh and asserts its child count, position, and material. See the existing `npc-mesh.test.ts` for the pattern.

2. **Mutation test before commit.** Before committing a feature, revert the implementation, run the test, confirm it FAILS, then restore the implementation, run the test, confirm it PASSES. If the test does not fail when the implementation is broken, the test is not actually testing the feature - rewrite it. This step is mandatory and applies to every commit. A test that does not fail when the code is broken is worse than no test at all (it gives false confidence).

3. **The framework the test must use depends on the layer:**
   - Pure functions and data files: vitest (node env).
   - Event-loop handlers: vitest with `@vitest-environment jsdom`.
   - 3D rendering: do not unit-test (visual regression is verified via Playwright screenshots + agy descriptions).
   - End-to-end browser behavior: Playwright.

4. **Test naming.** The test file mirrors the source file: `src/foo/bar.ts` is tested by `tests/unit/foo/bar.test.ts` (or `tests/foo/bar.spec.ts` for E2E). The test cases describe the expected behavior in plain English, e.g. "stops after one keyup following repeated W keydowns" not "test 1".

5. **Tests run before the commit is created.** A commit that adds a feature without a passing test for it is reversed and rewritten. Agents verify by running `pnpm test` (and `pnpm test:e2e` for end-to-end) and pasting the test results into the commit body.

### PR-13: Verify the build you are testing (2026-08-30, from Lucas)

Lucas has been bitten multiple times by stale preview servers
running from previous sessions. The symptom: an agent says "I
fixed it", Lucas reloads, and the fix is not there. Root cause:
the dev server (`pnpm dev` on 5173) or the preview server
(`pnpm preview` on 4173) was started by a previous session and
serves an old bundle.

The mandatory verification, every time you take a screenshot or
hand control back to Lucas:

1. **Kill any leftover vite / preview / esbuild processes before
   starting a fresh one.** Multiple sessions leave zombie
   processes; the right move is `pkill -f vite` (or
   `ps aux | grep vite | awk '{print $2}' | xargs kill`) then
   start a single fresh dev server.
2. **Use 5173 (the dev server) by default**, not 4173. 5173 has
   HMR so saves reload automatically. 4173 is a static preview of
   `dist/` and only updates after `pnpm build`. PR-2 already
   documents this; PR-13 makes it the only path.
3. **Read the console line.** `main.ts` prints a build version
   on startup: `AI Trainer Simulator vYYYY.MM.DD-NN`. The
   `BUILD_VERSION` constant lives at the bottom of `src/main.ts`
   and is bumped on every commit. The agent MUST bump it as part
   of every commit (`vYYYY.MM.DD-NN` where NN is the next ordinal
   for the day, counting from 1). The agent MUST read the
   console line in the Playwright snapshot and confirm it matches
   the latest commit before claiming "fixed" or "screenshot
   attached".
4. **No `pnpm dev` until the previous process is dead.** The
   dev server is single-tenant; starting a second one binds to a
   different port and Lucas cannot tell which one is current.

## Current design direction (post-2026-08-29 corrections)

The user's corrections on 2026-08-29 changed the design direction. The corrected PRD is in `docs/PRD.md` §13. Summary:

- **Camera is first-person, not over-the-shoulder.** `camera.position = player.position + (0, EYE_HEIGHT, 0)`. Mouse does not orbit the player. The player avatar turns to face the yaw direction.
- **Default state is free mouse.** RMB-hold = mouse-look mode. Click (LMB) = raycast interaction. Roster panel is the primary way to choose an NPC from a distance.
- **Custom pixel-art cursor** (Amiga style). 4 states: default, hover NPC, hover object, busy.
- **Walk-to-face** before every dialogue. The player walks to 1.5m in front of the NPC; the NPC turns to face the player; dialogue opens.
- **Multi-turn dialogues** (4-8 turns minimum per conversation, no hard cap — Lucas: "I just need this game to be real game, not a demo, so we need enough options, branching, decisions trees etc to make this a real simulation, with simulation of relations, previous actions influencing future actions and dialogues and answer options. Like in real RPG!"). NPCs remember past conversations. Greetings vary by "how many times talked today." 5-layer structure: greetings + topic threads + follow-up branches + memory callbacks + gated options. ~2,300 authored strings across ~730 tree nodes (13x today's volume, ~100x perceived variety).
- **NPCs sit AT desks, face their monitors, have idle animations.** Procedural variation: each desk has a random wood tint, each NPC has random items (mug color, sticky notes, plant).
- **NPC schedule per period** (morning/afternoon/evening). NPCs move between their schedule targets. The CTO is gone by afternoon. The janitor arrives late.
- **Inter-NPC speech bubbles** when 2 NPCs are within 2.5m of each other. 50+ curated lines.
- **Day-1 intro cinematic** with sky, trees, birds, neighboring buildings, road with cars. Establishing shot from a distance (~50-80m), not a wall closeup. Exterior meshes disposed after the cinematic.
- **Roster panel and trigger prompts are larger** (16-18px font, generous padding).
- **Camera is NEVER through walls** — first-person by construction.
- **NPC life = deterministic schedule + per-day random seed + named events (birthdays, team lunches, firedrills, hackathons).** Lucas: "mix both your ideas... BOTH!!!" Per the agy report, the architecture is the 4-tier priority stack (Option D): quest hard-pins + daily quirk + bounded micro-events + base routine. The event calendar is a separate higher-priority layer (Tier 0) that overrides even quest-pinned NPCs.
- **Time = 10 real minutes per period, 3 periods per day = 30 min/in-game day.** Lucas: "10 min/period should be enough. lets test it." Time NEVER advances while a dialogue is open — this is a hard rule, not a soft check. Period-rollover toast does not fire during dialogue.
- **Onboarding = cinematic + first quest + in-dialogue introductions + help modal + quest log, all mixed.** Lucas: "longer and more clear what we are doing here, who we are, what is a goal, and more like simulations, we should have dialogs explaining who we are like in a game!!!" Each of the 13 NPCs gets an in-character introduction in Bartek's onboarding conversation.
- **Multi-room world.** Main office (existing 20x20) + Training Room + Kitchen + Meeting Room + CTO Office. Open doorways, no real doors. The CTO office has a huge window onto the main office and a huge Batman sign on the wall. Glass wall (transmission material or fallback opacity). The existing office MUST NOT BE BROKEN.
- **DevPowers + Edukey two-brand identity.** Wall poster, CEO office logo, classroom title, day-end KPIs. Soft rebrand (add assets, don't sweep dialogue).
- **WebMCP layer (C-14) for AI agents.** External agents can play the game via a standardized tool API. OpenAI WebMCP challenge entry.
- **MMORPG endgame (C-25) — vision only.** Players + AI agents + NPCs in a shared world. Post-Phase 6.
- **The mandate (C-26).** "The best simulator business retro game in the history." Every phase is checked against this.

A new agent on this project should READ the corrections log in `docs/PRD.md` §13 BEFORE making any design decision. The "obvious" choice (over-the-shoulder camera, always-rotating mouse, single-turn dialogue) was already tried and rejected.

## Build & test commands

- `pnpm typecheck` — TypeScript only, fast.
- `pnpm test` — vitest, unit tests.
- `pnpm test:e2e` — Playwright e2e smoke.
- `pnpm dev` — Vite dev server on `http://localhost:5173/` with HMR (hot module replacement). **Use this for live preview.** Already running; don't restart.
- `pnpm build` — Vite production build to `dist/`. The 4173 static preview serves this folder.
- `pnpm build:watch` — Vite build in watch mode. Rebuilds `dist/` on every file save. Use together with `pnpm preview` if you want a live preview at 4173.
- `pnpm preview` — Static file server for `dist/` on `http://localhost:4173/`. **This does NOT watch for source changes.** 4173 only updates after `pnpm build` runs.

### Which port to use (READ THIS, AGENTS + Lucas)

- **5173 = live preview (HMR).** Every time you save a `.ts` / `.css` / `.tsx` file, the page reloads automatically. **This is the port you should use during development.**
- **4173 = static preview.** The file is served as-is from the `dist/` folder. To see changes on 4173, you must run `pnpm build` (or `pnpm build:watch`) first.

**Lucas's rule (2026-08-29):** "remember to provide some kind of Live preview, Live Dev Server with live preview, HRM or something similar. I need a way to always see what you are working on." The live preview is **5173, not 4173.** If you have only ever tested on 4173, you have been seeing a stale build.

**On 2026-08-29 Lucas was on 4173 and the WASD / mouse-look fixes were not visible** because `pnpm build` had not been re-run after the code changes. The agent had to re-run `pnpm build` to refresh 4173. Going forward: **use 5173 for live preview, never 4173 unless you specifically need the production build.**

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

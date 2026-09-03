# Lucas's feedback index

This document is a running index of every feedback item Lucas has
given. Every item MUST be reflected in `docs/PRD.md` and the
plan. The agent MUST update this file when Lucas sends feedback so
nothing is lost again.

## 2026-09-03 (night) — hackathon pivot, WebMCP agent play, real branding

**ID: L-2026-09-03-02 — Enter the OpenAI WebMCP Challenge, and the MiniMax/GMI contest**
- Deadline confirmed by research: **2026-09-03, 13:00 PDT = 21:00 Europe/Lisbon**. MiniMax/GMI is **2026-09-06**.
- Lucas's own assessment of the game: visually nice, well-polished UX and controls, funny, but (1) no challenge - a tech demo rather than a game, and (2) the WebMCP implementation is very basic.
- **Agent finding that reframed the night:** `src/webmcp/tools.ts` was an internal registry that nothing ever registered with the browser - no `modelContext` reference existed anywhere in `src/`, so an agent opening the page discovered zero tools. A qualification gap, not polish.
- Decisions Lucas made: build order is real registration -> agent agency -> agent-authored dialogue -> branding; human multiplayer is **out for 03.09 and in for 06.09**; work goes to committed code on a branch but is **not pushed and not deployed**.
- **Cross-reference:** `docs/briefs/2026-09-03-lucas-hackathon-brief.md` (the full brief, including every deferred idea), `docs/PRD-hackathon-webmcp.md`, `docs/ADR/0008-webmcp-browser-bridge-and-agent-companion.md`, `docs/plans/2026-09-03-hackathon-webmcp.md`, `docs/SUBMISSION.md`, `docs/DEPLOY.md`.

**ID: L-2026-09-03-03 — Branding must be real artwork, not a room sign**
- Lucas: "where did you took the logo of edukey and devpowers from???" - the agent had shipped placeholder TEXT plaques using the game's room-sign renderer, with invented colours and guessed URLs. No artwork had been copied from anywhere, but the need for real assets should have been raised explicitly rather than left in a commit body.
- Real SVGs (logo, emblem, favicon, wordmark, horizontal + vertical lockups) were pushed to master under `public/assets/edukey/` and `public/assets/devpowers/`.
- **A room-name plaque is right for "MEETING ROOM" and wrong for branding.** Requirements: "Made by" as **plain text painted directly on the wall**; below it **both SVG logos rendered**, one under another, DevPowers in its **vertical** version for now; simulate the **3D standoff logos typical of real reception walls**.
- Implemented as `src/engine/furniture/brand-wall.ts` (painted caption + rasterised SVG marks at a standoff with drop shadows). Marked as first-pass - Lucas: "we can polish it later."
- **Two asset hazards found and handled:** the Edukey files are pure white (invisible on a light surface), and the DevPowers files draw with `currentColor` plus their own `@media (prefers-color-scheme: dark)` rule, which the browser honours when rasterising - so an untreated DevPowers mark changes colour with **each player's OS theme**. Both are forced to an explicit colour before rendering, in the world and on the title screen.
- Favicon switched from the placeholder emoji to the DevPowers mark. **Open question for Lucas:** the game is its own product ("Stack Underflow"), so a game-specific favicon may beat either company's.
- **Also open:** the title-screen links use guessed URLs (`https://edukey.ai`, `https://devpowers.com`) and need confirming.
- **Cross-reference:** `src/engine/furniture/brand-wall.ts`, `src/ui/title.ts`, `src/content/world-layout.ts` (reception furniture), `index.html`.

## 2026-09-03 — end-day safety and UI text size

**ID: L-2026-09-03-01 — End Day (Z and button) must confirm; modal copy must be large**
- Relayed the C-66 audit finding ("Renata and the UI already promise Z to end the day, but no Z listener exists") for verification. Resolution: the Z listener did ship with C-66, so the tutorial is no longer lying.
- New requirement: Z and the roster End Day button open a **confirmation modal** first — "modal would prevent accidental Z end day, it's quite easy to hit." Both triggers confirm (Lucas chose "both" over "Z only"). The **WebMCP `end_day` tool bypasses the modal** — a tool call is already deliberate. Implemented as C-69.
- On seeing the modal live: "this text should be bigger, **never use so small fonts**." Body copy bumped 15px → 19px, buttons 15px → 16px, title 18px → 20px. Standing rule for all future UI surfaces.
- **Cross-reference:** C-69 in `docs/CHANGELOG.md`; `src/ui/end-day-modal.ts`; `src/style.css` (`.endday-*`).

## 2026-09-02 — four-period day, real course simulation, and multiplayer vision

**ID: L-2026-09-02-05 — Dedicated Lunch period with a shorter 3/2/3/2 day**
- The current day already feels long; a 20-real-minute day would be too long.
- Confirmed pacing at 1x is **Morning 3 min / Lunch 2 min / Afternoon 3 min / Evening 2 min** = **10 real minutes per in-game day**.
- Lunch must be a real period shown as **Lunch** in the HUD, not the first part of Afternoon. Lunch movement and lunch chatter belong only to this period.
- Afternoon is working time and should become the clean attachment point for meetings, client work, training-room courses, and future activity paths.
- Lucas approved the focused time refactor. Keep the activity scheduler simple because the larger quest/course design is not decided yet; preserve a clean transition interface for that later system.
- **Cross-reference:** Beads epic `sacs-xtma`; Lunch feature `sacs-xtma.1`. The PRD correction and time architecture update are the next documentation gate; no code work starts before Lucas reviews those changes.

**ID: L-2026-09-02-08 — Quarter-hour digital clock in the HUD**
- Add a digital clock to the HUD alongside the named period.
- The clock advances at **1 real minute = 1 in-game hour**. To keep it readable, display quarter-hour steps, so the visible clock changes every 15 real seconds (`09:00`, `09:15`, `09:30`, and so on).
- Confirmed clock ranges are **Morning 09:00-12:00 / Lunch 12:00-14:00 / Afternoon 14:00-17:00 / Evening 17:00-19:00**. These align exactly with the confirmed 3/2/3/2 real-minute durations.
- **Resolved by Lucas:** the day starts at **09:00**, not 08:00, and ends at 19:00.
- Dialogue, cinematic, modal, and any future explicit pause must freeze both the named period and digital clock without catch-up afterward.
- **Cross-reference:** Beads Lunch feature `sacs-xtma.1`. Include this in the same future pacing PRD/ADR correction and implementation, not as a separate clock system.

**ID: L-2026-09-02-06 — Courses and quests must consume real time and create challenge**
- Future quests should represent real courses in the Training Room and real client meetings, potentially surfaced through a calendar view.
- The current quest flow is much too simple: selecting one dialogue option can immediately complete a quest, making an entire training course appear to finish in a microsecond.
- The game currently lacks meaningful challenge. Course preparation, delivery, participant behavior, outcomes, failure, rewards, and consequences need deliberate gameplay design soon.
- A calendar / appointment / timeline scheduler may be needed, but its requirements are not known yet. Do not guess them or build the full scheduler as part of the Lunch-period change.
- Run a **separate PRD and Q&A round** before designing or implementing the course, quest, challenge, calendar, or appointment system.
- **Cross-reference:** Beads epic `sacs-xtma`; design task `sacs-xtma.2`. PRD/ADR/implementation-plan changes are deliberately deferred until that Q&A produces approved requirements.

**ID: L-2026-09-02-07 — Shared offices for 5-10 humans and WebMCP AI agents**
- Preserve single-player so either a human or an AI agent can play the user role through player-level WebMCP tools.
- Add multiplayer soon: an **office code / invitation code** lets approximately **5-10 players** share an office and plan together.
- Human players and AI agents must be able to participate together in the same office. AI agents play alongside humans rather than receiving admin-only powers.
- This is Lucas's intended advanced, fun entry for the current OpenAI WebMCP contest / hackathon, and he expects to work on it today and tomorrow.
- Multiplayer details still need their own approved design: lobby/invite flow, shared state, authority, identity, disconnect/rejoin, persistence, hosting, security, and the smallest contest-ready cooperative gameplay loop.
- **Cross-reference:** Beads epic `sacs-xtma`; multiplayer/WebMCP feature `sacs-xtma.3`. A separate multiplayer PRD/ADR is required before implementation decisions are locked.

**ID: L-2026-09-02-09 — One umbrella Beads epic for the growing game**
- The game is becoming large enough to require a durable umbrella epic for all related product and engineering work.
- The umbrella epic is **`sacs-xtma` — “Stack Underflow / AI Trainer Simulator game.”**
- Record this epic ID in the project `AGENTS.md` so every agent knows where to recover game backlog context and where to add new deduplicated child issues.
- Agents must search the epic and shared backlog before creating a child, keep one deliverable per issue, and must not attach unrelated work merely because it happens in the same repository.
- **Cross-reference:** Beads epic `sacs-xtma`; project coordination instructions in `AGENTS.md`. No PRD or ADR change is required because this is workflow metadata, not a gameplay decision.

**ID: L-2026-09-02-10 — Align pacing docs, expose one game version, and decide Evening length**
- Align every maintained project document to the final four-period pacing model; remove or explicitly supersede stale 3/3/3, 5/5/5, 5/10/5, and 10-minutes-per-period claims.
- After the documentation gate, implement the dedicated Lunch period, pause-safe clock, HUD clock, schedule/event changes, and tests.
- **Decision:** keep **3/2/3/2 (09:00-19:00)**. Do not lengthen the day to preserve the old 165-second departure constants; retune departures to fit the 120-second Evening with a buffer. Preserve **1 real minute = 1 in-game hour**.
- The player can always end the day early with the UI action or `Z`, so Evening does not need to force the player to wait after most colleagues have left.
- **Research decision:** use one CalVer-style `vYYYY.MM.DD-NN` game build identifier. This browser game needs dated build identity for visual QA more than SemVer compatibility signalling. OpenClaw is inspiration only: its PATCH is a monthly release-train number, while this game keeps a full date and daily ordinal.
- Show the same canonical version on the start menu and in the browser console; do not maintain unrelated `0.0.1` and date-version strings by hand.
- `v2026.09.02-10` remains the identity of the preceding committed documentation build and must not be reused for different committed gameplay code; the next committed build will use `v2026.09.02-11` (or the next date's `-01`).
- **Cross-reference:** Beads epic `sacs-xtma`; Lunch feature `sacs-xtma.1`; versioning task `sacs-xtma.4`; PRD corrections C-67/C-68; architecture D-32/D-33. Gameplay code still waits for Lucas's documentation review.

**ID: L-2026-09-02-11 — Approve C-67/C-68 and make plans repository-local**
- Lucas approved implementation of the documented 3/2/3/2 Lunch/clock design and canonical CalVer-style build version.
- Move the formerly referenced global plan `~/.claude/plans/glistening-napping-hinton.md` into the repository's `docs/plans/` directory and give it a descriptive name so every agent can use it.
- Audit every reference to the old global plan path and update it to the repository-local path.
- Find any other project plan stored in a Claude-only directory and move it into `docs/plans/` as well.
- Add project `.claude/settings.json` containing only Claude Code's `plansDirectory` setting pointing to `./docs/plans`, so future Claude plan-mode files are shared through the repository.
- Add `docs/plans/` to `AGENTS.md` with a brief description.
- **Discovery:** the referenced `glistening-napping-hinton.md` file is no longer present anywhere under `/home/lucas`; its content cannot be moved byte-for-byte. The repository does contain `.claude/plans/c64-reception-and-meeting-room-move.md`, which will be relocated. The missing roadmap will be reconstructed under a descriptive repository-local name from the current PRD, CHANGELOG, ADR, Beads epic, and surviving references, with the absence recorded rather than hidden.
- **Cross-reference:** Beads epic `sacs-xtma`; Lunch feature `sacs-xtma.1`; versioning task `sacs-xtma.4`; plan consolidation gets its own deduplicated child issue.

**ID: L-2026-09-02-12 — Desktop resolution is the priority for tests and screenshots**
- Lucas questioned a "640×360 test viewport" as ridiculous; resolved: that is the canvas' internal pixel buffer (retro renderer, CSS-scaled), while the Playwright viewport is already **1280×720**.
- Standing directive: the game targets **desktop first** (not phones); e2e tests and screenshots must use a popular desktop resolution (1280×720) and stay there.
- **Cross-reference:** e2e viewport assertions in `tests/e2e/`; no code change required (already conformant). This entry was first written and then accidentally dropped during the C-67 commit split; re-recorded verbatim afterwards.

## 2026-09-02 — e2e suite cost

**ID: L-2026-09-02-13 — E2E screenshots opt-in, long wait-tests slow-gated**
- Screenshots are low value per run, take work and time, and overheat the CPU; nobody analyses them on every run. They are occasional vision-QA artifacts, not assertions.
- Make screenshots **opt-in via a flag** (implemented: `E2E_SCREENSHOTS=1`, default off), with a package.json script that runs the **full suite with screens included** (`pnpm test:e2e:screens`) that is **not the default**.
- The longest waiting tests (real-time passes, e.g. morning fill and evening walk-out) should be optional or ordered last. Implemented: `@slow` tag + `pnpm test:e2e:fast`; the default `pnpm test:e2e` still runs everything.
- The suite "takes CRAZY long and CPU gets so hot even with 1 worker" — one worker stays (parallel SwiftShader instances hang on ReadPixels); further reduction comes from not capturing by default.
- **Cross-reference:** `tests/e2e/shots.ts`; Beads `sacs-m2b9` (CPU profiling follow-up) and `sacs-omcq` (re-author stale vantage points).

## 2026-09-02 — workflow directives

**ID: L-2026-09-02-14 — Commit granularly as you work, not at the end**
- Granular commits must happen **while working**, one per logical change, so any step can be reverted; do not accumulate one huge diff and split it synthetically at the end (risky, wastes time — happened twice: Codex's C-67 diff and this session's initial seam reconstruction).
- No synthetic intermediate states for past work: finish what exists, then follow the rule going forward.
- The **project** `AGENTS.md` (not the home one) must state this explicitly.
- **Cross-reference:** project `AGENTS.md` git-workflow section; home `AGENTS.md` already had the staging rule.

**ID: L-2026-09-02-15 — The spawn area is the reception (naming sweep)**
- Lucas confirmed the C-64 spawn: "we moved spawn to the reception now". The room south of the office where the player starts is the **reception**; "meeting room" for it is stale naming (the actual meeting room is south of the kitchen; its room id stays `meeting-room` per ADR decision D10).
- Sweep comments, test titles, and docs that still describe the spawn as "meeting room".
- While auditing spawn definitions, the stale duplicate `PLAYER_START` in `src/content/npcs.ts` was removed; the follow-up recommendation is one home for game-configuration constants (a `config.ts`-style module) rather than per-file constants — tracked as a deduplicated Beads child under the epic.
- **Cross-reference:** Beads epic `sacs-xtma` children (naming/spawn audit + config consolidation); `src/engine/scene.ts` playerStart.

## 2026-09-02 — visual acceptance and local CPU usage

**ID: L-2026-09-02-04 — Keep Vite running; optimize test CPU later**
- Restart and keep the Vite HMR dev server running; Lucas only wanted the CPU-heavy test/QA processes stopped.
- Test CPU optimization is optional follow-up work. Record it in `docs/PERFORMANCE.md`, including bounded Vitest/Playwright concurrency and reliable automated-browser teardown as investigation candidates.
- **Cross-reference:** optional Beads task `sacs-m2b9`, `docs/PERFORMANCE.md`, and the active plan's C-66 operational note. No PRD correction or ADR is required until profiling produces a gameplay/runtime architecture decision.

## 2026-09-02 — repository hygiene

**ID: L-2026-09-02-01 — Ignore Playwright CLI artifacts**
- Add `.playwright-cli/` to `.gitignore`; local browser-verification snapshots and logs must not dirty the working tree.
- **Cross-reference:** operational repository hygiene only; no gameplay/design scope changes, so no PRD, ADR, or phase-plan update is required.

## 2026-09-02 — help and onboarding

**ID: L-2026-09-02-02 — The `?` help modal must explain every control**
- The current help modal is incomplete and does not repeat all controls taught by Renata the receptionist.
- It must explicitly cover at least: **WASD movement**, **hold Right Mouse Button for mouse-look**, **Space to lock the mouse/pointer**, and **Shift to run/sprint**.
- Audit the live input bindings and Renata's full onboarding so the modal covers everything else the player can do; it must be the reliable complete reference, not a partial reminder.
- **Cross-reference:** add a new correction entry to `docs/CHANGELOG.md`/PRD corrections and add this bounded polish item to the active phase plan; no ADR is required because no control architecture changes.

## 2026-08-31 — feedback captured (this message)

**ID: L-2026-08-31-02 — Make the game perfect, playable, and fun**
- **Toilet door location** — the toilet exists as a back-corner room with no real door. The door should be in the kitchen (kitchen must have direct access to the toilet).

- **NPC rotation on dialogue** — when we start a conversation, the NPC should always rotate in our direction so we talk to their face, not to their back. After the conversation the NPC should get back to the previous position. The rotation should be animated (slerp), not instant.
- **Women arms/shoulders** — too close to the body, almost inside. Make them a little bit wider.
- **Intros with dialogue explaining the game, goal, and rules** — where are they? Add a real intro cinematic that explains who the player is, what the goal is (survive 30 days, don't go bankrupt, run training sessions), and the rules (talk to people, work the contracts, etc).
- **Cutscenes and events** — the game has none. Add a real morning walk-in cutscene, the CEO entering his office cutscene, and at least one random in-game event with its own little cutscene.


## 2026-08-30 — feedback captured

**ID: L-2026-08-30-01**
- NPCs should RANDOMLY walk to:
  - the toilet (a new room to be added)
  - the kitchen
  - meetings (in the meeting room)
  - training (in the training room, where they TEACH or
    ATTEND)
- 3-4 times a week the training room should have "participants from outside"
  (anonymous NPC) — not just office workers — so the training
  scene is populated.
- Office workers may RARELY go to the meeting room (have a
  meeting) or the training room (have a training).
- NPCs should walk to work in the morning with a morning intro
  cutscene + animations.
- NPCs should walk out of the building in the evening with the
  same animation.
- WebMCP tools must let agents PLAY the game the same way the
  user does: walk, look around, talk to people, choose dialogue
  options, etc. No admin-only operations (NO set-relation, etc.).
  It is for PLAYER agents, not admins.
- Sound: current SFX are "terrible" — need better. The agent
  should use the project's model (M3 / audio stack) to generate
  or source better SFX and music (e.g. download from internet
  sources).
- Audio QA: a model that can HEAR audio files (e.g. Gemini
  Pro with audio support, or local Ollama Gemma 4) must
  review the generated audio files and report quality.
- Background music: needed.
- Dialogues: more speech (TTS) for intros, important dialogue
  nodes, and possibly background.


---

## Cross-references (pending update in PRD/plan)

These historical items were not yet in `docs/PRD.md` §13 (Corrections Log)
or the then-current global roadmap. The obsolete global plan path was
superseded by `docs/plans/game-roadmap.md` on 2026-09-02. They MUST
be added before any more code work happens.

- L-2026-08-30-01 → PRD §13 new entry C-27 (NPC walk animations +
  realistic movement + morning/evening walk-to-work) +
  C-28 (toilet room) + C-29 (anonymous training participants)
- L-2026-08-30-01 → PRD §13 new entry C-30 (WebMCP: player-only
  tools, NO admin operations)
- L-2026-08-30-01 → PRD §13 new entry C-31 (audio: better SFX,
  music, audio QA via Gemini/Ollama)
- L-2026-08-30-02 → PRD §13 new entry C-32 (branching
  dialogues with per-NPC memory of answered options, no repeat,
  and visible player stats HUD)
- L-2026-08-30-03 → PRD §13 new entry C-33 (detailed Kitchen:
  real kitchen equipment, 3D models in separate files,
  per-room content list, fun/ironic decoration items)
- L-2026-08-30-03 → New ADR ADR-0015 (3D model file layout:
  one .ts per object, reusable across rooms and cutscenes,
  a registry/factory pattern)
- L-2026-08-30-01 → New ADR ADR-0010 (NPC walk animations and
  random destination selection)
- L-2026-08-30-01 → New ADR ADR-0011 (WebMCP player-only toolset
  policy)
- L-2026-08-30-01 → New ADR ADR-0012 (audio generation / QA
  pipeline)
- L-2026-08-30-02 → New ADR ADR-0013 (per-NPC dialogue memory
  and no-repeat policy)
- L-2026-08-30-02 → New ADR ADR-0014 (player stats HUD)
- L-2026-08-30-01 → Plan §Phase 3.6 (NPC random walks) + new
  Phase 8 (audio overhaul) + Phase 9 (dialogue depth)
- L-2026-08-30-03 → Plan §Phase 7 (3D model library +
  per-room content lists)


---

## DONE

---

These items are done or outdated and no longer need to be addressed.


- NPCs must have walk-cycle animations while moving (not just
  slide/teleport between schedule entries).
- NPCs should mostly look at their screens (work posture).

- **Dog (Burek) should move around the office** — either laying or playing, interacting with people. Right now the dog is a static marker.
- **NPCs have walk animations but they do not actually walk** — they sit at their desk and "teleport" between schedule positions. The walk cycle needs to be visible.
- **All NPCs should say something in a speech bubble from time to time** — unique to them, connected to their profession and character. Not just generic "Did you restart it?" lines.
- 
**ID: L-2026-08-31-07 — NPC real walking, path-following, kitchen micro-sequence, lunch dialogues (2026-08-31)**
Lucas reported that NPCs "walk but at the same place, bouncing with animation". He wants:
- **Path-following** with **obstacle avoidance** while NPCs walk (currently they teleport through walls in a 2 s linear lerp).
- **Walk animation** that's tied to actual movement, not to wall-clock (currently the bob/sway runs on stationary meshes when morning.position === afternoon.position).
- **Sub-state sequencing inside the kitchen** — work → fridge → coffee / sink / microwave / table (random order) → desk. Same template for every NPC; the order is randomised per walk. Some NPCs go outside lunch time ("outsiders" who eat alone).
- **Lunch window** — at lunch time multiple people go to the kitchen together, staggered by **0-2 s per NPC** so they don't all start at once. The order of kitchen stops is randomised so they don't walk the same path. If they avoid obstacles (including other NPCs) they "walk together and stand together, like they are talking". Window length: **120 s** (≈ 2 min, 20% of the 10-min afternoon at 5/10/5).
- **A separate `LUNCH_DIALOGUES` pool** for in-kitchen chatter. **50 lines total** (~45 human + 5-8 dog). Funny lines about: IT jokes, startup jokes, gaming, AI, coffee, dinner, farting, diet, fat, beer, pizza, vege, eco, and work. The lunch pool must not be mixed with the work pool (`INTER_NPC_LINES`).
- **Outsiders (confirmed 2026-08-31):** **Maciek — the CTO** and **Marek — the DevOps** eat alone 30% of the time outside the lunch window and skip lunch 30% of the time.
- **Burek always joins the lunch, no exceptions** (Lucas, 2026-08-31: "Where is food there is Burek!"). He's in the social-lunchers set with 100% probability during the window and 60% outside. He has his own dog-sound dialogue pool (`LUNCH_DIALOGUES_DOG`).
- **Lunch dialogue contest** (Lucas, 2026-08-31): run the brief against both **grok-4.5** and **agy / sonnet 4.6** in parallel, pick the funniest / sharpest / most specific lines, and merge.
- **Cross-references:** PRD §13 new entry C-45 (NPC real walking). Plan new section "Phase 3.6 — NPC real walking: A* pathfinding, walk cycle, kitchen micro-sequence (PRD C-45)".


- **Kitchen equipment is too low quality** — random blocks. Make a high-quality detailed pixelart kitchen: fridge, microwave, bin, sink, dishwasher, funny stickers and details. 3D models in separate files, reusable.
- **CEO office location** — the CEO office should be where the Training Room is right now (i.e. north of the main office, with a glass wall looking into the main office). The Batman sign on the wall should be visible through this glass wall from the office so everybody knows the bat is there.
- **Add a CEO character** — new, with unique personality, unique dialogues (delegate to GLM-5.3 via `opencode`). The CEO should sit inside the CEO office at his huge desk. The CEO is a typical IT/startup CEO: funny, pseudo-motivational, mentoring in a funny way, pushing, etc. The CEO may not want to talk to us at the beginning (we just started work), but later the CEO may give us tasks, come to us directly and ask for something.
**ID: L-2026-08-31-03 — CEO office + training room swap refinement (2026-08-31)**
- The training room must connect to the KITCHEN, not to the main office, so the training facility is "off the back" of the office (kitchen → training).
- The training room has huge windows on its east wall facing OUTSIDE: trees, sun, and sky are visible through the glass. The trees and sun are pixel-art decoration; the sun moves slowly across the sky with the in-game time of day.
- The CEO office (which now sits where the training room was) keeps the glass wall to the main office and the Batman sign.
- The main office, kitchen, and training room are now physically separated; the player goes through the kitchen to reach a class.

**Already implemented in earlier commits (2026-08-31):**
- L-2026-08-31-01: chest rectangle removed (commit 2a2dd27). Done.
- Desk rotation / NPC sitting position / window frame: commit 980100d. Done.
- Center meeting table removed: commit d9bdfc3. Done.
- Vending machine rotation: commit 65df90a. Done.
- Visit-colleague random-walk destination: commit 0033ca8. Done.

**ID: L-2026-08-31-04 — CEO office premium pass (9 specific issues)**
Lucas looked at the new CEO office from the inside (screenshot #45). 9 specific issues to fix:
1. Desk too high (like a reception desk) — lower it.
2. Add laptop + 2nd monitor + premium decorative elements for a modern CEO of an IT company.
3. Remove the stool (the chair is a simple blue block and the CEO looks like he's INSIDE it) — use a real executive chair.
4. BATMAN emblem: make it huge on the WHOLE wall, in a black background, identical to the real Batman logo. Lucas could not see it from his current position.
5. Remove the solid wall that covers the glass wall — the existing south glass wall is being hidden by a normal wall in front of it.
6. The wall opposite the door should have a different (premium) color on the inner side — accent wall.
7. Make the ceiling light fixture visible (currently invisible) — and add 2 light sources.
8. Add premium furniture: sofa, small table for meetings, posters on the walls, pictures. Something funny (delegate to GLM for ideas).
9. **Second big glass wall with an internal garden view** — keep the existing south glass wall (CEO sees employees), ADD a new glass wall on the RIGHT side of the entrance (the west wall of the CEO office). Through this wall the CEO sees trees + grass. On the OTHER side of this garden, the conference/training room has its own glass wall facing the same garden. The training room is bigger: the projector screen wall moves back (north) and the east/west walls extend.

**Cross-references (pending update in PRD/plan):**
- L-2026-08-31-02 → PRD §13 new entry C-34 (dog behavior) + C-35 (CEO office relocation + glass wall) + C-36 (kitchen detailed pixelart) + C-37 (per-NPC unique speech bubbles) + C-38 (new CEO character + dialogues) + C-39 (NPC animated face-to-player + post-dialogue return) + C-40 (women arm width) + C-41 (intro cinematic explaining game/goal) + C-42 (cutscenes and events).
- L-2026-08-31-04 → PRD §13 new entry C-44 (CEO office premium pass: 9 items above).
- L-2026-08-31-02 → New ADR ADR-0016 (3D model library: one .ts per object, reusable across rooms and cutscenes).
- L-2026-08-31-02 → New ADR ADR-0017 (kitchen equipment content list).
- L-2026-08-31-04 → New ADR ADR-0019 (CEO office premium content list: GLM-authored premium furniture, posters, accent color).
- L-2026-08-31-02 → Plan §Phase 11 (dog life) + Phase 12 (CEO office relocation) + Phase 13 (kitchen equipment) + Phase 14 (per-NPC bubbles + CEO dialogues via GLM) + Phase 15 (animated NPC rotation + women arms) + Phase 16 (intro cinematic + cutscenes).
- L-2026-08-31-04 → Plan §Phase 12.1 (CEO office premium pass: C-44) + Phase 12.2 (internal garden: glass wall on CEO west + training room extension).



**ID: L-2026-08-30-02** (just now)
- Every NPC currently has only ONE set of dialogues. Talking to
  them again gives the same line. This is unacceptable.
- Real branching / decision trees. Actions and decisions must
  affect parameters (popularity, relationship) and must change
  what dialogue options are available.
- What the player said last time must affect what the NPC says
  next time. NPC memory of the player's previous option.
- The NPC must NEVER repeat a dialogue the player has already
  answered (only re-show un-answered ones).
- The player needs a visible character / stats panel: focus,
  energy / caffeine, cash flow, financial situation. The
  notifications show them but there's no persistent HUD panel.
- "We need more options! Make it a REAL GAME!!!! It is a piece of
  shit, not even a demo right now."

**ID: L-2026-08-30-03** (the kitchen screenshot)
- The current Kitchen looks like an empty room with floating
  boxes. It is NOT recognizable as a kitchen.
- The kitchen MUST have real kitchen equipment and detailed
  3d pixelart: a fridge, coffee maker, dishwasher, sink,
  microwave, drawers, and some funny / ironical elements
  (e.g. a forgotten lunch, a "do not eat my yogurt" sign).
- All 3D models in the game must be saved in SEPARATE FILES
  (separate objects, reusable, easy to import anywhere) so the
  same fridge, sink, monitor, chair, etc. can be reused in
  different rooms and in cutscenes.
- For content ideas, ask GLM-5.3 (or similar) for the
  authoritative list of kitchen / office / training-room
  equipment and add the most photogenic / funny items first.
- High quality 3D pixelart, more details, more variety per
  object. The current rooms look empty and the geometry is too
  plain.


- Search the agent's message history for ALL missed ideas and
  feedback — the agent lost 50% of what Lucas said because it
  wasn't written down.

## 2026-09-01 — feedback captured

**ID: L-2026-09-01-01 — Five playability fixes (C-52..C-55)**
- **End the day must END the day (C-52)** — clicking "End the day" only showed the summary modal; the clock kept the same day going, so the player had to wait until late evening every time anyway. The button must advance the calendar to the next morning (skipping the remaining periods' random events), run the daily tick once, and show the summary for the day that just ended.
- **Dog (Burek) has strange red objects on his sides (C-53)** — remove them. Root cause: the collar box is wider than the body and passes through it, so its ends show as red squares on both flanks. Also make the legs the same color as the body; the two-tone legs read as artifacts.
- **Skip must not reset the player (C-54)** — the Skip button in the dialogue window teleported the view back to the starting position. The player prefers to stay where they are, next to the person they just talked to.
- **Conversations must be staged like conversations (C-54)** — starting a conversation often left the player inside a wall or somewhere strange, and the NPC rarely faced the player ("most people keep some eye contact when they talk, so should the NPC"). Fix: place the player at a collision-safe conversation spot facing the NPC, and the NPC turns to the player and holds it (frozen schedule, no chatter stealing) for the whole dialogue.
- **Speech-bubble text is unreadable (C-55)** — even up close. The hover labels ("name - role") are sharp DOM text; the bubbles are a 256x64 canvas with a 16px monospace font and NearestFilter upscaling. Rebuild the bubble texture at high resolution with the hover-label font and linear filtering.

**ID: L-2026-09-01-02 — Morning greetings (C-56)**
- NPCs should ALWAYS say hello when they enter the room in the morning - the arrival is currently unnatural, strange, and dead.
- Create an array/objects with greetings, varied by specialization: IT people greet differently than the CEO, CTO, marketing, or accounting. Variety and a nice character element.
- (Side benefit Lucas named: more bubbles on screen to test the speech-bubble font with.)

**ID: L-2026-09-01-03 — Toilet relocation (C-57)**
- Move the toilet so that it will be next to kitchen / dining room, and door to Toilet should be on the right from "Menu: Caffee" sign. Now these door are in the corner of the office and I can't access the corner.
- (Per Lucas 2026-09-01: "Use GLM to cemerate ideas, do QA check of these audio files with agy in permiisions allowed mode if needed, I agree to do this. it should be able to read audio files, and decide if it is good or not.")
- Branch `feat/c57-toilet-relocate-next-to-kitchen`, 4 commits (599638e feat, d53d5b3 QA fixes, 6d62003 fixture tests, dbb52b7 stall facing). Done on master.

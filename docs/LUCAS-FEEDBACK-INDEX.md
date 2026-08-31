# Lucas's feedback index

This document is a running index of every feedback item Lucas has
given. Every item MUST be reflected in `docs/PRD.md` and the
plan. The agent MUST update this file when Lucas sends feedback so
nothing is lost again.

## 2026-08-31 — feedback captured (this message)

**ID: L-2026-08-31-02 — Make the game perfect, playable, and fun**
- **Dog (Burek) should move around the office** — either laying or playing, interacting with people. Right now the dog is a static marker.
- **NPCs have walk animations but they do not actually walk** — they sit at their desk and "teleport" between schedule positions. The walk cycle needs to be visible.
- **Toilet door location** — the toilet exists as a back-corner room with no real door. The door should be in the kitchen (kitchen must have direct access to the toilet).
- **All NPCs should say something in a speech bubble from time to time** — unique to them, connected to their profession and character. Not just generic "Did you restart it?" lines.
- **NPC rotation on dialogue** — when we start a conversation, the NPC should always rotate in our direction so we talk to their face, not to their back. After the conversation the NPC should get back to the previous position. The rotation should be animated (slerp), not instant.
- **Women arms/shoulders** — too close to the body, almost inside. Make them a little bit wider.
- **Intros with dialogue explaining the game, goal, and rules** — where are they? Add a real intro cinematic that explains who the player is, what the goal is (survive 30 days, don't go bankrupt, run training sessions), and the rules (talk to people, work the contracts, etc).
- **Cutscenes and events** — the game has none. Add a real morning walk-in cutscene, the CEO entering his office cutscene, and at least one random in-game event with its own little cutscene.

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

## 2026-08-30 — feedback captured

**ID: L-2026-08-30-01**
- NPCs must have walk-cycle animations while moving (not just
  slide/teleport between schedule entries).
- NPCs should mostly look at their screens (work posture).
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


## Cross-references (pending update in PRD/plan)

These items are NOT yet in `docs/PRD.md` §13 (Corrections Log)
or in `~/.claude/plans/glistening-napping-hinton.md`. They MUST
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

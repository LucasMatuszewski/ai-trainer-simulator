# Lucas's feedback index

This document is a running index of every feedback item Lucas has
given. Every item MUST be reflected in `docs/PRD.md` and the
plan. The agent MUST update this file when Lucas sends feedback so
nothing is lost again.

## 2026-08-30 — feedback captured (this message)

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
- The training room should have "participants from outside"
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
- Search the agent's message history for ALL missed ideas and
  feedback — the agent lost 50% of what Lucas said because it
  wasn't written down.

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

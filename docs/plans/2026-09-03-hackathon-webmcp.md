# Plan — WebMCP hackathon night, 2026-09-03

**Deadline:** 2026-09-03 13:00 PDT = 21:00 Europe/Lisbon. Hard, external.
**Drives:** [`docs/PRD-hackathon-webmcp.md`](../PRD-hackathon-webmcp.md), [`ADR 0008`](../ADR/0008-webmcp-browser-bridge-and-agent-companion.md).
**Branch:** `feat/hackathon-webmcp`. Committed granularly, **not pushed, not deployed** (Lucas, 2026-09-03).

Phases are ordered by what loses the contest if missing, not by what is most interesting. P1 and P2 are qualification; P3-P4 are the judged capability; P5 is Lucas's brand ask.

## P1 — Browser registration (qualification)

Without this the entry does not qualify: an agent visiting the page discovers zero tools.

- `src/webmcp/bridge.ts`: namespace probe (D-34), descriptor translation to JSON Schema, result wrapping (D-35).
- Wire into `src/main.ts` at startup, after the player-action hooks exist.
- Title-screen status line reporting whether an agent surface was detected, so a judge can confirm before playing.
- Tests: translation, wrapping, probe order, and the no-support path staying silent.

**Done when:** a fake `modelContext` receives every tool with a valid schema; a browser with none reaches a playable state with no thrown error.

## P2 — Submission blockers (qualification)

- `LICENSE` at repo root (D-42).
- `README.md`: what the game is, how to run from a clean checkout, which browser/flag exposes WebMCP, and how to verify tools are discoverable.

**Done when:** a judge can clone, run, and confirm the integration without asking a question.

**Not automatable:** repository is private and must be made public; the demo video needs recording. Both are Lucas's.

## P3 — The agent companion (judged: Execution, Creativity)

- `src/engine/agent-companion.ts`: standalone entity per D-36, composing `createNpcMesh`, `planNpcPath`, `updateWalkCycle`, the bubble system, and player collision.
- Tools: `agent_join`, `agent_leave`, `agent_look_around`, `agent_move_to`, `agent_say`.
- Named target resolution with candidate enumeration on failure (D-39).
- Roster card marked agent-controlled.

**Done when:** an agent joins, sees the office, walks to a named NPC, and speaks — all visible to the human, whose own play is uninterrupted.

## P4 — Agent-authored dialogue (judged: WebMCP Leverage)

The differentiator. A screenshot-and-click agent cannot do this.

- Pending-request state + bounded wait + in-character fallback (D-37).
- Tools: `get_pending_dialogue_request`, `supply_dialogue`.
- `textContent` rendering, length caps, 2-4 option validation (D-38).

**Done when:** the human talks to the companion and reads lines the game's author never wrote, rendered indistinguishably from hand-authored dialogue, with a graceful fallback if the agent goes quiet.

## P5 — Branding (Lucas's ask)

- Both logos + links in the title-screen footer.
- Both logos on the reception wall facing the main office.
- Creator attribution wording only — never "this is our office" (AC-BRAND-03).

## Explicitly not tonight

Human multiplayer (2026-09-06). The whole game-depth backlog — quest engine, coffee/fatigue loop, training-room course simulation, junior debugging terminal, player desk and computer, Renata-first tutorial, Janusz and CEO rewrites, TTS regeneration. All captured in the brief; all deferred by Lucas's own prioritisation.

## Verification each phase

`pnpm typecheck` and `pnpm test` green before the commit. Screenshots stay opt-in per L-2026-09-02-13.

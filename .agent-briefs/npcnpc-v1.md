You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Write your result to `.agent-briefs/npcnpc-v1-result.md`.

# Task: Implement NPC↔NPC deep conversations v1 — content + controller wiring

Branch `feat/jev-npc-decision-steering` (HEAD `f031cd8` or later; the tree also has `src/engine/npc-npc-runner.ts` + `src/content/npc-npc-conversations-schema.ts` already written by the orchestrator — READ BOTH FIRST, they are the foundation you build on).

## Read first
- `src/engine/npc-npc-runner.ts` — the pure runner state machine (flatten path → timed lines → advance → hush/abandon).
- `src/content/npc-npc-conversations-schema.ts` — the script schema (cast × band, exchanges, next-chains, endings, onPlayerApproach).
- `docs/plans/2026-09-30-npc-npc-deep-conversations.md` — the REVISE contract (both reviews' findings: whole-path pre-decision, cast × band split, session lifecycle, 69-char lines, interruption table, 70/25/5 depth pyramid).
- `src/engine/npc-controller.ts` — the WS0 DecisionHooks seam + the C-46 conversation block (~1696-1960) that starts/stops pairs today.
- `src/engine/chatter.ts` — pickPair/pickStarter/pickExchange (the legacy pickers that remain the fallback).
- `src/game/social.ts` — `band()`, `REL_HOSTILE_THRESHOLD`, `REL_WARM_THRESHOLD`, `ARCHETYPE_SEEDS` (the matrix now has REAL POLES: hostile pairs kasia/marek=25, tomek/grazyna=22, ania/tomek=30, klaudia/maciek=28; warm pairs pawel/zosia=70, kasia/przemek=72, ania/klaudia=68; rest neutral 35-65).

## Build

1. **`src/content/npc-npc-conversations.ts`** (new, data): 6 authored scripts across the three bands, using the schema:
   - **warm, 3 levels** — pawel + zosia (the anchor pair): the restore-drill callback (pawel's `pawel-restore-drill` flag exists in his pool — reference the shared story).
   - **warm, 2 levels** — kasia + przemek: the kasia-referral banter.
   - **neutral, 2 levels** — pawel + kasia: the pipeline handoff friction.
   - **cold, 3 levels** — kasia + marek: the ticket-queue dispute (hostile band: pointed, no banter).
   - **cold, 2 levels** — tomek + grazyna: the hotfix-vs-expense clash.
   - **neutral, 1 level** — janusz + burek: the robot-and-dog beat (short, comedic, burek "responds" in dog markers).
   Each script: `cast`, `bands`, `priority`, `exchanges` with starters/responses carrying `next` chains, `endings` per band on the final responses, `onPlayerApproach` hush lines on at least one exchange per script, `reaction` buckets on emotional beats. All lines <= 69 chars. Ironic IT-office voice, lore-consistent.
2. **`src/content/npc-npc-conversations-runtime.ts`** (new, PURE, TDD): selection + flattening —
   `eligibleConversations(a, b, band, flags, period) => NpcNpcConversation[]` (cast contains both ids in either order; band match; flag gates),
   `pickConversation(conversations, seededRng)` — deterministic seeded pick (highest priority first, then seeded round-robin; NO Jev here — the REVISE contract is deterministic playback, Jev branch-picking is deferred pending the eval gate),
   `flattenPath(script, startExchangeId, rng)` → the ordered RunnerEvent[] (follow `next` chains, cap at maxLevels, band-appropriate endings where authored).
3. **Controller wiring (PATCH src/engine/npc-controller.ts — submit as a precise patch, the orchestrator applies it)**: inside the C-46 conversation block, after `pickPair` selects a pair, check `npcNpcConversationFor(a, b, band, flags, period)`; when a script is eligible AND the pair cooldown allows deep mode, create the runner and drive it from the conversation-manager block's update path (replacing the single-exchange bubble flow for that pair). On hush/abandon/complete: settle the reaction via the existing `apply-social-reaction` dispatch (one per conversation, bounded), record both lines in usedReplyIds-style memory, and start the pair cooldown.
4. **Tests (TDD)**:
   - `tests/unit/content/npc-npc-conversations.test.ts`: schema validation (the runner's invariants: unique ids, 69-char bound, next resolution, alternation); eligibility (cast both orders, band match, flag gates); deterministic seeded pick stability.
   - `tests/unit/engine/npc-npc-runner.test.ts`: flatten + advance timing (dwell scales with length); hush keeps delivered count; abandon ends without hush; completion fires onEnd once; reaction settles from the last emotional beat.
   - Selection determinism: same seed → same script; different band → different eligible set.

## Constraints

- Allowed: `src/content/npc-npc-conversations.ts`, `src/engine/npc-npc-runner.ts` (may extend), `tests/unit/content/npc-npc-conversations.test.ts`, `tests/unit/engine/npc-npc-runner.test.ts`, plus the controller patch TEXT in the report. NOTHING else. Do not modify the WS0 seam block, main.ts, types.ts, state.ts.
- All lines <= 69 chars. Ironic voice. No flagged tokens. Reactions only from the bucket vocabulary.
- `pnpm typecheck` + full `pnpm test` green.

## Definition of done

Report at `.agent-briefs/npcnpc-v1-result.md`: files, red→green evidence, vitest summary, the controller patch (exact), deviations. Disagreement invited on the runner API shape.

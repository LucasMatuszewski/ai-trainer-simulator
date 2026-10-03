# PR #4 review - feat/jev-npc-decision-steering (Claude, independent)

## Context

This is an independent review of `git diff master...HEAD`: 56 commits, 157 files, about 28k added lines. All findings came from reading the code without changing anything.

Baseline at HEAD 7e5f34f: `tsc --noEmit` exits 0 and `vitest run` passes 1235 tests in 101 files. Every Jev surface is unit-tested through `fake-client`, so the green suite does not prove the real wire format.

When plan mode is lifted, copy the "Review" section below verbatim to `.agent-briefs/pr-review-claude.md`. That file currently exists but is empty.

---

## Review

### Blocker

1. **Every Score-question request fails before it reaches the network. This kills dialogue option curation, dialogue reply selection and mission answer scoring.**
   - Where: `src/jev/dialogue-wrapper.ts:158-167` and `src/jev/mission-wrapper.ts:275-284` build `type: "score"` questions with no `candidates`.
   - Why it fails: `src/jev/openrouter-adapter.ts:131-134` (`toProviderQuestions`) throws `score question "<id>" has no levels` for that shape. The adapter turns the throw into `invalid-request`.
   - Dialogue impact: the wrapper sends option Scores and the reply Choice in the same batch. One bad question therefore sinks the whole request, and every v2 turn with at least one option falls back with `provider-invalid-request`.
   - Mission impact: `scoreOptions` always returns `fallbackScore("provider-invalid-request")`.
   - Why tests miss it: `tests/unit/jev/adapter-contract.test.ts:171` only tests Score questions that carry candidates. The wrapper tests use the fake client.
   - Second problem behind the first: even with levels added, the provider's `score` is a position on the `criteria` levels array (see the adapter comment "may fall BETWEEN levels"). The wrappers read it as a raw 0-10 value (dialogue prompt "Score 0-10", mission `adjustmentFromScoreLevel`, "2-4 poor / 6-10 well"). The level scale has to be defined in one place and shared by the question builder and the consumer.
   - Under PR-14, a live smoke call per surface is required. That call would have caught this.

2. **The v2 dialogue UI ignores the C-78 option-to-reply pairing. The player never sees the answer to the option they clicked.**
   - Where: `src/ui/dialogue.ts:711-715` and `:745`.
   - On click, `pickV2` takes the reply from `steerer.memoReply(...)`, otherwise `v2.turn.replyCandidates[0]`. Neither depends on the clicked `option`.
   - `buildTurn` serves the deduplicated union of all visible options' replies, sorted by pool order (`src/game/dialogue-turn.ts:320-348`). With Jev off, every option therefore resolves to the first visible option's paired reply.
   - That hidden `reply` drives the relationship delta, the task offer and memory. Line 745 then replaces it on screen with `nextTurn.replyCandidates[0]`, an answer to a question the player has not asked yet. The panel also opens on an answer before any question (`:655`).
   - With Jev on, the reply Choice is made over every visible option's replies before the click. The model therefore picks the social bucket independently of what the player chose, which breaks D-45/D-50 ("the player's choice + author tag decide the delta").
   - Root cause: commit 7e5f34f (C-78) changed `dialogue-turn.ts` but not `ui/dialogue.ts`. `DialogueTurn` does not expose `repliesFor(optionId)`, so the UI has no way to resolve a paired reply.
   - Fix direction:
     - Expose per-option replies on the turn (`replies: Record<optionId, ReplyCandidate[]>`).
     - Resolve the reply from the clicked option and render that reply.
     - Steer the reply only among the clicked option's variants: per option on prefetch, or one Choice per visible option.
   - Missing test: a jsdom test of `openV2` → `pickOption` that checks the shown text is the clicked option's paired reply.

### Major

3. **The dev proxy spends the server key for any network peer and for drive-by POSTs.** `vite.config.ts:24-75` with `host: "0.0.0.0"` at `:92`.
   - Exposure: `/api/jev` has no Origin/Host check and no Content-Type check, and the server listens on all interfaces (LAN, Tailscale, WSL bridge). Anyone who can reach port 5173 can make requests billed to `OPENROUTER_API_KEY`.
   - Drive-by: any web page open in the user's browser can fire a `text/plain` simple POST to `http://localhost:5173/api/jev`. The body is still parsed as JSON and forwarded. CORS only hides the response; the paid call still happens.
   - Fields: `{...parsed}` forwards every client-supplied field except `model`.
   - The header comment says "origin-agnostic on localhost by design", but the bind address is not localhost.
   - Fix:
     - Require `Origin`/`Host` to be the dev server's own origin.
     - Require `content-type: application/json`.
     - Allow-list the forwarded fields (`state`, `questions`).
     - Optionally refuse non-loopback `req.socket.remoteAddress`.

4. **Save schema v2 fields are declared but never written or read at runtime.**
   - `npcMemory`: `serializeAllMemories()` and `hydrateMemories()` (`src/content/dialogue-memory.ts:163,172`) have no callers in `src/`. Saves always carry the empty DTOs from `freshV2State`/`migrate`. Dialogue memory, including the v2 used-option set ("an option the player answered never comes back", L-2026-08-30-02), resets on every reload.
   - Social, diary and mission completions: `apply-social-reaction`, `regress-social-nightly` and `append-diary` (`src/game/state.ts:201-237`) are never dispatched. `missionCompletions` is read in `src/ui/mission.ts:175` but never written. `getRelationshipBands` returns `{}` (main.ts `buildWorldTick`).
   - Net effect: the D-50 social model and the D-51 persisted fields are inert, while migration and tests suggest they work.
   - Fix: wire `npcMemory` into save/load. Either wire the remaining fields or mark them deferred in ADR-0009 with a Beads child.

5. **World-tick chatter memos violate D-58 exactly-once.** `src/engine/world-tick.ts:547-554, 627-700`.
   - A pair memo is deleted only when the exchange hook serves a non-null, in-pool exchange (`:693`).
   - When the exchange answer fell back (`exchange: null`), or the pool flipped since the tick, the memo survives. `hookPickChatterPair` then returns that same pair first on every pick for the rest of the day, and `hookPickChatterStarter` re-serves the stored starter.
   - This biases pair selection and re-applies one decision many times.
   - Fix: consume the memo (delete it) when the pair hook serves it, and carry starter and exchange in a pending local.

6. **Late Jev activation only re-arms greetings.** `src/main.ts:992-1003`.
   - `onConfigured` rebuilds and installs only the greeting wrapper.
   - `worldTick.install()` returned early at office mount because the client was unconfigured (`world-tick.ts:731`). Chatter and destination steering therefore stay off until the next office mount, even though `tick()` now runs and burns tokens on memos that are never served.
   - This contradicts AC-14 ("no reload"). Fix: call `worldTick?.install()` in `onConfigured`.

7. **The BYO key is invisible to the game when localStorage is denied.**
   - `src/ui/jev-settings.ts:31` creates its own `createKeyProvider()`. Every wrapper also builds its own provider through `createResolvingClient()` (`src/jev/client.ts:40`).
   - In memory-only mode the key lives only in the settings provider's `memoryKey`. The UI says "Personal key (this session only)" and fires `onConfigured`, but all wrappers still resolve to `none`.
   - Fix: use `defaultKeyProvider()` everywhere (`src/jev/key-provider.ts:173`).

8. **The E-key handler hijacks typing and fires under modals.** `src/main.ts:429-444`.
   - The handler checks neither the text-entry target (unlike the Z handler below it), nor help-modal/mission/minigame state, nor `e.repeat`.
   - Within 1.8 m of the coffee machine, printer or whiteboard, typing "e" into the Jev key input in the help modal is `preventDefault`-ed. OpenRouter keys are hex and contain "e".
   - The same keypress also uses the coffee machine (+15 caffeine) while the clock is paused, including behind the mission overlay.

9. **The eval harness does not measure what the game sends.**
   - `scripts/jev-eval.mjs:9,147-175` says "exactly the payload shape the game sends".
   - What the harness sends: the player's question, `candidate_replies`, rich facts (npc/relationship/period/place/events) and long weighting instructions.
   - What the game's `dialogue-wrapper.ts` sends: `{ "relationship.value": n }` and a one-line prompt, decided before the player picks a question (see blocker 2).
   - The C-78 accuracy numbers therefore do not transfer to the shipped surface. Either drive the harness through `createDialogueWrapper` with the real adapter, or make the wrapper send the harness payload.

### Minor

- **Provider fields can override validated identity.** `src/jev/openrouter-adapter.ts:331-335`: `{questionId, subjectId, ...rawEntry}` lets fields in the provider's answer override `questionId`/`subjectId`. An answer for question A can be re-attributed to question B or to another NPC. Spread first, then set the identity keys.
- **The timeout does not cover reading the response body.** `src/jev/openrouter-adapter.ts:277`: `return parseSuccessResponse(...)` without `await` lets `finally` clear the abort timer before the body is read. A stalled body is then unbounded by `timeoutMs`. Use `return await`.
- **Dead code paths in the adapter.**
  - `src/jev/openrouter-adapter.ts:62`: `import.meta.env.JEV_MODEL` is never exposed to the browser (no `VITE_` prefix), so it is dead in client code.
  - The `subset` normalization branch (`:424-443`) is unreachable because `toProviderQuestions` rejects subset questions.
- **Evening destination prefetch is always stale.** `src/engine/world-tick.ts:93-98, 394, 596`: evening prefetches "morning" stamped with today's `day`. The next morning `getDay()` is `day+1`, so every evening prefetch is served as `stale-period`. That wastes tokens and inflates the stale counter. Store `day+1` when rolling over, or skip evening.
- **A period-transition tick can be dropped.** `src/engine/world-tick.ts:285, 620-623`: `onPeriodTransition` is skipped while a tick is in flight, so the pre-decision for the new period can be lost until the next 6 s tick. Queue one pending transition run.
- **Fallback pickers use Math.random.** `world-tick.ts:236-240` (`legacy` defaults), `greeting-wrapper.ts:111`, and main.ts `buildWorldTick` (`rng: Math.random`) bind fallbacks to `Math.random`, not the controller rng. This is harmless in production today (the controller also uses `Math.random`), but the "TAC-01 rng-order preservation" comments overstate it. A seeded controller would diverge as soon as Jev is configured.
- **Exit-turn option order is inconsistent.** `src/game/dialogue-turn.ts` `exitTurn` puts `WRAP_UP_OPTION` first, while `serveSlice` and the `TurnOption` doc say the exit is always last (AC-04 slot reservation).
- **The dialogue memo key ignores replies.** `src/jev/dialogue-wrapper.ts:133-134` keys on used options only. Changes to `usedReplyIds` or relationship can serve a stale memoized reply in the same session.
- **The steered mission question swaps on screen, and the original is marked asked.** `src/ui/mission.ts:450-466`: the steered question replaces the authored one after it is already rendered. The authored id is added to `askedQuestionIds` (`:452`) even when the steer replaces it, which shrinks the remaining pool.
- **Unconditional HUD prompt writes.** `src/main.ts` frame loop calls `showPrompt(hud, null)` every office frame, which will clobber any future prompt owner. The repair hold also has no distance check (walk away while holding E and the repair still completes).
- **A future-version save is replaced.** `src/game/migrate.ts:161`: such a save becomes a fresh game and is overwritten on the next save. The header comment claims the opposite ("instead of silently wiping"). Back up the blob before the first overwrite, as `writeV1Backup` does for v1.
- **Process (AGENTS.md).**
  - C-78 (dialogue architecture v3) is not recorded in `docs/CHANGELOG.md` or `docs/PRD.md` (PR-1).
  - 5 source commits did not bump `src/version.ts` (67e2b4e, 8df6152, 5573d66, 7129724, f765615) (PR-13).
  - No live provider evidence for the Score surfaces (PR-14), which is exactly why blocker 1 survived.

### Verified OK

- The key is sent only in the Authorization header, is redacted from error details, and never appears in projections.
- No player-typed text (character name) enters any Jev payload (D-59).
- Exchange, destination and greeting candidate ids are validated by exact membership.
- The greeting stale-day handling and the session fencing on dialogue close look correct.
- Migration sanitizes field by field and never throws.
- `missionResultActions` sets the completion flag before paying out.

REVIEW: CHANGES-REQUESTED - Score questions are sent without levels, so the adapter rejects every dialogue and mission steering request, and the v2 dialogue UI never shows the paired reply to the option the player clicked.

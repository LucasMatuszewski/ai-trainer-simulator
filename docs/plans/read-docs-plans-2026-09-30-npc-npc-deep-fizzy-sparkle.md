# Plan - deliver the NPC-NPC deep-conversations review

## Context

The orchestrator asked for an independent review of
`docs/plans/2026-09-30-npc-npc-deep-conversations.md` (architecture + game direction), to be
written to `.agent-briefs/npcnpc-review-claude.md`. This session ran in plan mode, where only
this plan file may be written, so the finished review is below. Nothing else was changed.

## Action on approval

Write everything under "REVIEW CONTENT" verbatim to `.agent-briefs/npcnpc-review-claude.md`.
No code changes, no commit (briefs directory, review artifact only).

## Verification

- `.agent-briefs/npcnpc-review-claude.md` exists and ends with the `PLAN: REVISE - ...` line
  followed by the top-3 list.
- Spot-check the evidence: `src/main.ts:295`, `src/content/npc-profiles.ts` seed table,
  `tests/eval-results/dialogue-variants-latest.json`.

---

# REVIEW CONTENT

# Review - NPC-NPC deep conversations plan (Claude / Opus)

**Reviewed:** `docs/plans/2026-09-30-npc-npc-deep-conversations.md`, against
`docs/PRD-jev-npc-steering.md` (v2.2), `src/engine/world-tick.ts`, `src/engine/chatter.ts`,
`src/engine/npc-controller.ts` (C-46 block), `src/game/social.ts`, `src/content/npc-profiles.ts`,
`scripts/jev-eval.mjs`. Date: 2026-10-03.

**Verdict: PLAN: REVISE.** The direction (authored scripts, pairing contract, Jev only where
measured) is right. Five things in the plan do not survive contact with the code, and the game
direction puts the authoring budget in the wrong place (wide trees nobody sees instead of
state-driven variety).

---

## A. Architecture findings

### High

**H1. `pairClass` conflates two axes, and the seed table has no enemies.**
The plan gates on `pairClass: friends | enemies | neutral` and pilots "friends: klaudia+zosia,
enemies: marek+grazyna". In the authored seeds (`src/content/npc-profiles.ts`):

- `klaudia|zosia` = 55, `grazyna|marek` = 50, `kasia|pawel` = 55. All three pilots are in the
  neutral band (35-65, `src/game/social.ts:119`).
- Hostile pairs (< 35) at seed: **zero**. The lowest pair is `marek|przemek` = 35, which
  `band()` still calls neutral.
- Warm human pairs (> 65): four (`pawel|zosia` 70, `kasia|przemek` 70, `ania|przemek` 70,
  `ania|klaudia` 68). The other 14 warm pairs are all Burek, who cannot hold a conversation.

So a relationship-gated "enemies" script never plays on day 1, and the "friends" pilot pair
would not qualify for its own script. Fix: split the axis.

- `cast` (static, authored): who may speak these lines - role slots or an explicit pair list.
- `band` (dynamic, from the live matrix): hostile / neutral / warm gate and line variants.

And re-seed the table so it has real poles (3-5 hostile pairs, 6-8 warm human pairs), bumping
`SOCIAL_PROFILES_VERSION`, or choose pilots from the actual extremes (warm: `pawel+zosia`,
`ania+klaudia`; cold: `marek+przemek`, `przemek+tomek`, `klaudia+marek`). Without poles the
whole "relationships drive who talks and how" premise is flat.

**H2. Relationship input is not wired, and step order hides it.**
`getRelationshipBands: () => ({})` (`src/main.ts:295`) - the world projection carries no pair
bands today. `apply-social-reaction` and `regress-social-nightly` exist in the reducer but have
no production dispatch site. Step 1 ships "Jev picks the branch from relationship state" while
the runtime sends no relationship state; the eval would measure a signal the game does not
transmit. Reorder: step 0 = matrix read side (bands into projection and pair weighting) +
dispatch + nightly regression. It is small plumbing and everything else depends on it.

**H3. Mid-conversation branch picks do not fit the prefetch architecture.**
World-tick is prefetch -> memo -> instant serve: 6 s cadence, 700 ms cutoff, single-flight, no
retries (`world-tick.ts:78-85`, PRD Flow B "a trigger never waits for a request"). Levels play
3.8 s apart (`chatter.ts:57`). A branch decided while the conversation is running will either
wait (forbidden) or miss and fall back to "first", meaning Jev effectively never steers.
Fix: decide the **whole path at pair formation**, in the existing batched request. Flatten each
script into its enumerated root-to-leaf paths (cap ~8) and ask one Choice: "which path". That
keeps exact-membership validation, the day/pool staleness check and exactly-once serving exactly
as `chatter-exchange` has them today, and one eval case = one label.

**H4. The runtime change is much bigger than "world-tick integration".**
Today a conversation is one starter plus one pre-baked response, deleted after 3.8 s
(`npc-controller.ts:404`, `:1917`). Nothing holds the NPCs: facing is set once at start
(`:2018`) and schedule walking continues. A 5-level chain lasts 20-30 s and needs:

- a hold state (both pinned, facing, exempt from schedule, random destinations and separation
  shoves), and an **interruption table**: period transition, Tier-0 event, quest pin, player
  opens dialogue with a participant, a participant leaves radius or goes home;
- authored exit lines for interrupted conversations (a cut-off mid-thought looks like a bug);
- a budget decision: one conversation per room and `MAX_CONVERSATIONS = 2` (`chatter.ts:63`)
  mean a 30 s conversation silences its room for everyone else - deep talk makes the office
  quieter unless deep conversations get their own slot;
- line constraints: bubbles ellipsize beyond 69 characters (`bubbles.ts:71`) and live 6-8 s.

Build it as a pure `conversation-runner` state machine with its own tests (PR-8/PR-11), not as
more branches inside the 2000-line controller.

**H5. "Fallback = first branch" makes the no-Jev game repeat itself.**
With Jev off, every play of a script takes the same path forever. Use a seeded deterministic
pick (day seed + pair key + script id) among the branches whose tags match the state. It is
still an authored deterministic default (AC-10), stable within a day, different across days.

### Medium

**M1. The 80% gate is not a measurement yet.** The latest harness run is 5 cases, 5/5
(`tests/eval-results/dialogue-variants-latest.json`). With 2-4 branches chance is 25-50%.
Requirements before the number means anything: at least 40-50 labeled NPC-NPC cases, baselines
reported side by side (first-branch, seeded-random, tag-rule), per-factor breakdown. Deeper
problem: if the "correct" branch is derivable from tags (band, event, period), code should pick
it and Jev adds nothing. Jev earns the surface only as a tie-breaker among several tag-eligible
candidates, so the gate should be "Jev beats seeded-random on blind preference", not accuracy
against labels written by the line author.

**M2. Delta budget.** "Bounded +-5 per conversation" with a 40 s pair cooldown lets desk
neighbours move 15-25 points in one 10-minute day against a 10% nightly regression, while pairs
that never meet never move. Add a per-pair daily cap (about +-6). Source the bucket from the
**authored leaf** (`outcome: "annoyed"`), not a second judgment: the path determines the result,
it is testable, and interrupted conversations apply nothing.

**M3. Schema fragility ("options jump" risk).** `next: turns-index` breaks silently when a turn
is inserted. Use string node ids and a data-shape test that proves: every `next` resolves, the
graph is acyclic, every path terminates within `[minLevels, maxLevels]`, speakers strictly
alternate, each response belongs to exactly one starter (C-78), every line is <= 69 characters,
no line duplicates another pool. Also define where the branch lives - the sketch says
`responses[].next` but the text says "a response may offer 2-4 next options"; those are
different trees. The `pairClass` union lists four values (one is `" coworkers"` with a leading
space) while the text says three and later "~8 classes".

**M4. Unobserved depth is wasted content.** Nothing in the plan ties depth to whether the player
can see it. Play scripts deeper than one level only when the player is in the room or within
about 10-12 m; mark a script as "heard" only if the player was in range for most of it. Otherwise
the no-repeat memory burns the best content off-screen.

**M5. Persistence.** A no-repeat window over days needs per-pair history in the save (schema
bump, D-51 migration, round-trip test). The plan does not mention it.

### Low

- Cut `taskOffer` from step 1. NPC-NPC tasks belong to purposeful actions (AC-22).
- Add a dedicated `npc-conversation` surface for the debug panel instead of reusing
  `chatter-exchange`, or AC-30 counters become unreadable.
- Burek stays on the bark path; exclude him from `cast` explicitly.
- PR-1: this needs a C-NN entry, PRD-jev acceptance criteria (Flow H) and ADR-0009 decisions
  after D-61 before code.

### Answers to the plan's open questions

1. **Class or band?** Both, as two axes: static `cast` x dynamic `band` (H1).
2. **Branch memory?** Yes: per-pair seen list, no repeat until that pair's eligible set is
   exhausted, then oldest first; persisted; counted only when heard (M4, M5).
3. **Pause the walk?** Yes, hold both NPCs, with the interruption table (H4). Keep 3.8 s as the
   base and scale by line length (roughly 3-5.5 s).
4. **Dispatch per level or once?** Once, at the end, from the authored leaf, with a per-pair
   daily cap (M2).

---

## B. Game direction - what makes NPC-NPC talk feel alive

**Causality beats length.** A two-line exchange about the printer that jammed 30 seconds ago
feels more alive than a five-level evergreen about coffee. The plan optimises depth; the PRD
problem statement is "ambient speech ignores the world". Conversation selection should be
priority-ordered: (1) something that just happened (fired event, equipment fault, an argument,
a player action), (2) an open pair storyline, (3) evergreen pool. Today's fired events are
already in the projection; faults, flags and player actions should join them.

**Depth vs frequency: a pyramid, not a dial.** A day has roughly 60 chatter starts. Keep about
70% as one-two liners (texture), 25% as 2-3 levels, 5% as 4-5 level set pieces, i.e. three to
five deep conversations per day, played near the player. Rarity is what makes them noticed; a
player can follow one bubble thread at a time.

**Branches are invisible to a spectator.** In player dialogue a branch is agency. In NPC-NPC
talk the player only ever sees the path taken, so a 3-wide, 5-deep tree spends most of its
lines on content nobody can perceive as a choice. Spend that budget on more scripts and on
state-conditional entry and **endings** (same skeleton, warm ending vs cold ending). This also
settles the Jev question: its best surface is "which script fits this moment" plus "which
ending", decided at pair formation - the surface world-tick already serves - not intra-tree
steering.

**Voice needs named characters.** The existing 65 office and 27 lunch exchanges are
speaker-agnostic. Class-level five-level scripts would be five times more anonymous. Three
tiers: generic one-liners (exist), role-slot scripts (mid tier), and signature scripts written
for about 10-12 anchor pairs in their own voices. The anchor pairs carry the drama.

**Drama is an arc, not a state.** A band value is not a story. Multi-day pair threads are:
conversation N sets a pair flag that unlocks N+1 (passive-aggressive remark -> argument per
AC-18 -> two days of pointed silence -> thaw, or the player intervenes). Use the third person:
A complains about B to C (`detectImbalancedTriads` exists and is unused). And use **silence**:
a hostile pair that turns away, or leaves the kitchen when the other walks in, is cheap and
reads instantly.

**How it should differ from player dialogue.**

| | Player dialogue | NPC-NPC |
|---|---|---|
| Clock | paused | real time, interruptible |
| Lines | long, panel | <= 69 characters, bubbles |
| Content | exposition, choices, effects on the player | subtext, in-jokes, candour, gossip |
| Value of branching | high (agency) | low (invisible) |
| Effects | stats, quests, player relationship | NPC-NPC matrix, pair flags, overheard flags |
| Player presence | required | reacted to |

NPCs should be more candid with each other than with the player, and should notice the player:
hushing or changing the subject when you walk up ("...anyway.") is the cheapest alive-signal
available, one authored `onPlayerApproach` line per script.

---

**PLAN: REVISE - (1) split `pairClass` into static cast x dynamic band and re-seed the matrix so
hostile and warm pairs exist (pilots are all neutral today); (2) wire relationship bands,
dispatch and nightly regression first; (3) pre-decide the whole path at pair formation as one
Choice instead of per-branch mid-conversation picks, with a seeded fallback instead of "first";
(4) specify the conversation runner: hold state, interruption table, room budget, 69-char lines,
persistence; (5) replace the 80% gate with a 40+ case eval against first/seeded/tag-rule
baselines; (6) shift authoring from wide trees to state-triggered scripts with band-specific
endings.**

**Top-3 suggestions for alive NPC-NPC talk in this game**

1. **Eavesdropping as a mechanic.** Overhearing a conversation sets a "heard" flag that unlocks
   a gated option with either speaker ("I heard you and Marek..."), feeds quests and tells the
   player who to befriend. NPCs gossiping about the player hush when approached. Ambient talk
   becomes gameplay instead of wallpaper.
2. **Multi-day feuds and friendships for ~6 anchor pairs.** Hand-written in the characters'
   voices, with real poles in the seed table, escalation into the AC-18 argument scene, silence
   and avoidance as content, and a reconciliation the player can cause or miss.
3. **They talk about what just happened, especially about you.** Event-, fault- and
   player-action-triggered scripts outrank the evergreen pool: the firedrill, the jammed
   printer, the training you botched, the contract you signed. Jev picks which eligible script
   fits the moment; code guarantees it is relevant.

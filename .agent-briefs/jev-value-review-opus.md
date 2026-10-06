# Jev value review (Opus) - does the Jev integration pull its weight?

## Context

Lucas: "Review if using Jev for what we use now makes any sense and provides value. Keep Jev
where it makes the game better and more realistic, use deterministic logic where it makes more
sense."

This file IS the review. Plan mode allows writes only to this file, so the requested target
`.agent-briefs/jev-value-review-opus.md` is not written yet.

On approval (no code changes are part of this task):
1. Copy the section "REVIEW" below verbatim to `.agent-briefs/jev-value-review-opus.md`.
2. `docs/plans/you-are-auditing-whether-declarative-yeti.md` (untracked) is an earlier run of the
   same audit. This file supersedes it: same verdicts, plus three defects it missed (D1-D3
   below). Lucas decides whether to delete the older one.
3. The verdicts change scope of ADR-0009 D-60, so per PR-1 they need a C-NN entry + D-60 table
   update before any code follows. Not done here.

Method and limits: code reading only (`src/jev/*`, `src/engine/world-tick.ts`,
`src/game/world-projection.ts`, `src/game/social.ts`, `src/game/dialogue-turn.ts`,
`src/ui/dialogue.ts`, `src/ui/mission.ts`, `src/game/mission.ts`, `src/main.ts` wiring, ADR-0009
section 7). Nothing was executed: no live Jev call, no shadow-log data, no test run. Claims
marked (inference) are reasoned, not measured.

---

# REVIEW

## Headline

On the four production surfaces Jev carries real weight on none of them today, and on three it
is worse than the rule it replaced. The cause is the same everywhere: Jev is asked to judge with
almost no state. A typical projection is name + job title + at most one band. The multi-factor
context that would justify a probabilistic judgment (NPC-NPC relationships, mood, needs, player
money/stats, memory of past days) is either not projected or never changes at runtime.

The plumbing is good and worth keeping: client + adapter, per-type validation, exact-membership
checks, hook seam, shadow mode, circuit breaker, decision log. It is pointed at the wrong
decisions.

## Root cause: the context Jev would need is not there

- NPC-NPC social matrix is never written by gameplay. The reducer case exists
  (`src/game/state.ts:212`) but nothing in `src/` dispatches `apply-social-reaction` (only
  `src/types.ts:255` declares it). The matrix only regresses nightly toward seeds it never left
  (`state.ts:242`).
- Mood never moves: `decayMood`, `reactionDeltas`, `detectImbalancedTriads`
  (`src/game/social.ts:379`, `:194`, `:455`) have no caller outside `social.ts`.
- World tick is wired with empty relationship bands: `getRelationshipBands: () => ({})`
  (`src/main.ts:297`).
- NPC needs are not projected. They drive a deterministic round-robin coffee trip instead
  (`src/main.ts:2075-2092`), which works fine.
- Player money/stats reach Jev exactly once: `credibilityBand` in the mission question pick
  (`src/ui/mission.ts:423`). Cash, burnout, flags, quest state: never.
- Access: Jev runs only with `VITE_JEV_PROXY_URL` or a pasted personal OpenRouter key
  (`src/jev/key-provider.ts:5-11`, `:114-120`). Everyone else plays the deterministic fallback,
  so the fallback is the real game for most players.
- No calibration data exists or can accumulate: the decision log is an in-memory ring of 50
  entries (`src/jev/decision-log.ts:64`), so `?jev=shadow` cannot build the labeled sets D-57
  requires.

## Defects found on the way (independent of the verdicts)

- **D1 - wrong option gets picked when Jev is live (high).** The panel renders before the
  judgment lands, so buttons are in authored order (`src/ui/dialogue.ts:662-663`, `:670`,
  `:681`). The answer is then stored in the memo (`src/jev/dialogue-wrapper.ts:275`) and the
  C-78 fix deliberately does not re-render (`ui/dialogue.ts:632-638`). But the click handler
  resolves the button index against a FRESH `orderedV2Options()` (`ui/dialogue.ts:704`), which
  now reads the memo (`:592`, same key: nothing was picked in between). If Jev ranked the 3
  options in any order other than authored, clicking button i triggers the option at steered
  rank i: the player gets another option's reply, relationship delta and used-marker. No test
  opens `openV2` with a steerer (no `openV2` reference under `tests/`). Not reproduced, read
  from code; a jsdom test would confirm in minutes.
- **D2 - `?jev=off` does not turn the mission surfaces off.** `buildMissionSteerer` has no
  `JEV_MODE === "off"` guard (`src/main.ts:280-282`), unlike the other three builders
  (`:274`, `:285`, `:354`). With a key configured, mission requests still run and still adjust
  scores, which breaks the D-55 off-vs-live comparison.
- **D3 - chatter pair order bias when Jev is live.** `hookPickChatterPair` returns the first
  candidate pair that has a memo (`src/engine/world-tick.ts:619-644`). Every tick judges every
  candidate pair (`:344-386`), so nearly all have memos and the winner is "first in roster
  order". Legacy is a uniform pick (`src/engine/chatter.ts:145-148`).

## Surface 1 - Greeting line pick (per NPC per day)

Facts:
- One batched request per day, one Choice per NPC (`src/jev/greeting-wrapper.ts:149-193`).
- Pool: 4 short lines per NPC (60 lines across the per-NPC pools,
  `src/content/morning-greetings.ts:49+`).
- Projection: id, name, role, relationshipBand (`greeting-wrapper.ts:160-165`). The band is the
  PLAYER-NPC relationship (`src/main.ts:358-361`) but the prompt reports it as the NPC's mood:
  "They feel like a {band} today" (`greeting-wrapper.ts:172`).
- Neither the day nor yesterday's pick is in the input, so the question is identical every
  morning until a band flips.

Notice test: a pick among 4 near-equivalent hellos is not something a player can attribute to
anything. With identical input it likely returns the same line every morning (inference), where
the legacy rng pick at least varies. One factor, mislabeled.

**Verdict: DETERMINISTIC.** Rule: per-NPC no-repeat rotation seeded by `(day, npcId)`
(`createSeededRng` exists, `social.ts:427`), skipping yesterday's index. If warm/cold greetings
are wanted, tag each line with a band and pick the sub-pool in code.

## Surface 2 - Dialogue option curation

Facts:
- It is not "which 4 of N". The builder cuts to the first 3 eligible options in authored order
  BEFORE the steerer sees anything (`src/game/dialogue-turn.ts:312`), and the steerer receives
  exactly those 3 (`src/ui/dialogue.ts:626`). Jev can only reorder the same 3.
- The reorder is never shown for the turn it was computed for (`ui/dialogue.ts:632-638`). It is
  stored "for the next occurrence", but the memo key includes the used-option fingerprint
  (`src/jev/dialogue-wrapper.ts:132-133`), every pick changes it (`ui/dialogue.ts:739-745`), and
  `finishV2` clears the memo (`:758`). So the stored order is effectively read back only by the
  click handler, which is defect D1.
- Only fact sent: `relationship.value` (`ui/dialogue.ts:630`); projection is that one number
  (`dialogue-wrapper.ts:181-183`). No period, mood, stats, events or memory.
- Cost: one request with 3 Score questions on every turn of every conversation.
- Dead leftovers from C-78: `DIALOGUE_REPLY_MIN_CONFIDENCE` (`dialogue-wrapper.ts:42`),
  `memoReply` always null (`:296-300`), header still describes reply selection (`:11-15`).
- D-56 specifies prefetch at walk-to-face start so the first render is already steered
  (ADR-0009 `:314-316`). Not implemented: the request starts at `openV2`.

Notice test: the intended effect is invisible; the actual effect is misrouted clicks.

**Verdict: DETERMINISTIC, remove the request now.** Rule: existing tag gates
(`tagsEligible`, `dialogue-turn.ts:122-144`) + authored `priority` + a relationship-band boost,
then top-3. This also improves on today, where the visible 3 are just "first 3 in file order".
Jev curation is only worth revisiting if it (a) gets ALL eligible options, (b) is prefetched
during walk-to-face, (c) has several facts to judge with, and (d) the render freezes the order
it was clicked against.

## Surface 3 - World tick (every 6 s + period transitions)

Projection per tick: day, period, fired event slugs, per NPC name/role/room, per pair a distance
band (`src/game/world-projection.ts:96-122`). No relationship, mood, needs or player state.

**3a. Chatter pair.** Not a judgment at all: see D3. **Verdict: DETERMINISTIC** - restore
uniform `pickPair`; later weight by the `social` need band.

**3b. Chatter starter.** Choice between two people given name + role
(`src/engine/world-tick.ts:351-371`). The authored chattiness weights
(`pickStarter`, `chatter.ts:186-190`) encode this better and vary per roll.
**Verdict: DETERMINISTIC** (`pickStarter`).

**3c. Chatter exchange.** The one existing surface with real semantic matching: Jev sees the
text of every eligible line (`world-tick.ts:372-385`) plus roles, period and today's event
slugs. Three problems:
- no relationship band (`main.ts:297`), so "fits both speakers" means "fits both job titles";
- no no-repeat rule. Legacy skips the previous pick (`chatter.ts:219-225`); the steered path
  sends the same candidates with the same context, so a pair likely repeats its "best" line
  until the period or event list changes (inference);
- waste: every tick re-judges ALL candidate pairs, two questions each, up to the whole pool as
  candidates, while at most one conversation starts per 6-12 s (`chatter.ts:163-164`). Unused
  answers are overwritten next tick (`world-tick.ts:539`). About 100 requests per 10-minute day.

**Verdict: KEEP-JEV, but only rewired** (Top-3 #3). Factors that make it a real judgment: pair
relationship band + today's events + gossip in circulation + player-stat bands + lines already
heard, over line text. If the rewiring is not done: **DETERMINISTIC**, legacy `pickExchange`
plus the both-speakers topic intersection (`eligibleExchangesForPair`,
`world-tick.ts:196-208`), which is a genuine improvement worth keeping in code.

**3d. Destination.** Choice over "stay" + `RANDOM_DESTINATIONS` state names, given name + role +
next period (`world-tick.ts:399-416`). The candidate list cannot express what the legacy roll
does well: colleague-desk visits (`src/content/npc-schedule.ts:557-560`), lunch kitchen groups
(`:525-533`), role affinity for deal wall / content booth (`:549-555`), the 90% stay rate
(`:535-540`). A steered answer replaces all of that (`src/game/events.ts:87-91`). Needs, the
one input that would make this a decision, are not projected.
**Verdict: DETERMINISTIC** - utility rule: caffeine band -> coffee, social band -> desk of the
warmest colleague, role affinity -> revenue prop, else the existing weighted roll.

## Surface 4 - Mission (question pick + answer score)

**4a. Question pick.** The script already fixes which plant asks at which step and the order of
each plant's two questions (`src/content/missions.ts:327-336`). The pick can only swap a plant's
two questions; with one left there is no request (`src/jev/mission-wrapper.ts:156-160`). It
overrides an authored comedic arc ("LinkedIn ambush" first, "the headhunters" last).
**Verdict: REMOVE** - keep the authored step order.

**4b. Answer score +-1.** Inputs: question text, option text, engagement band
(`mission-wrapper.ts:272-296`). Result: `clamp(baseScore + adj, -2, 2)` x 5 engagement
(`src/game/mission.ts:270-277`, `:41`).
- Stakes: start 50, win at 60, 4 questions (`missions.ts:337-341`). Four +-1 adjustments are up
  to +-20 engagement, enough to flip win/loss: $400 and +8 credibility vs $0 and -3.
- The adjustment is never shown (`src/ui/mission.ts:512-518` passes it through), so the player
  cannot notice it, only be surprised by it. Same answers can pay differently on two runs.
- Each option has an authored `reaction` line; a steered -1 can contradict it.
- D2: it also runs under `?jev=off`.

Right shape (semantic answer x audience state), one input factor, zero visibility, real money.
**Verdict: DETERMINISTIC** - authored per-option modifier (e.g. `landsWhen: "engaged" |
"restless"` -> +-1). Promote back to Jev only when the projection carries audience history,
credibility and the plant's relationship to the player, and the panel shows why it landed.

## Verdict table

| Surface | Verdict | Rule / condition |
|---|---|---|
| Greeting | DETERMINISTIC | seeded no-repeat rotation; band-tagged sub-pools |
| Dialogue option curation | DETERMINISTIC | gates + priority + band boost, top-3; drop the per-turn request (fixes D1) |
| Chatter pair | DETERMINISTIC | uniform `pickPair` (fixes D3) |
| Chatter starter | DETERMINISTIC | chattiness-weighted `pickStarter` |
| Chatter exchange | KEEP-JEV (rewired) | just-in-time, no-repeat, relationship + events + gossip + player bands; else legacy `pickExchange` |
| Destination | DETERMINISTIC | needs/affinity utility + existing weighted roll |
| Mission question pick | REMOVE | authored script order |
| Mission answer score | DETERMINISTIC | authored engagement modifier; revisit when visible + multi-factor |

D-60 drift to record alongside: tree opening, reply selection, reply social reaction, goodbye,
purposeful action, argument trigger and triad tension are in the D-60 table
(ADR-0009 `:381-394`) but have no live wrapper (wrappers present: greeting, dialogue curation,
mission, world tick).

## Is Jev worth keeping at all?

Yes, but not for these decisions. Today it picks among near-equivalent authored lines from a
name and a job title. A seeded pick does that for free, offline, and for every player. Jev earns
its place where the outcome depends on many interacting facts at once and a rule table would
explode: who reacts how to what the player just did, who tells whom, how a grudge carries over
days. Those are also the decisions that write state the player runs into later.

What would make it unmistakably worth it:
1. Make the social state live first: dispatch `apply-social-reaction`, move mood, expose the
   pair matrix to the projection. Without this there is nothing to judge.
2. Fewer, heavier calls: a handful of per-period / per-day judgments that WRITE state, instead
   of ~100 ambient requests a day that pick a speech bubble.
3. Jev decides state, code renders it: the judgment picks a bucket or stance; deterministic code
   turns that into greeting pool, option gates, chatter topic, destination weights.
4. Visible consequence within a minute. If the player cannot point at it, it failed the D-55
   perceptibility gate (ADR-0009 `:305-308`), whatever the counters say.
5. The deterministic fallback stays a complete game for players without a key.
6. Persist shadow decisions so a labeled set per surface can exist before anything
   consequential goes live.

## Top-3 highest-value Jev uses for this office sim

1. **Reaction + gossip propagation after notable player actions.** Trigger: the player insults
   Grazyna, wins or bombs the conference, goes broke, fixes the printer. One batched request at
   the next period transition: per witness a bucket Choice (offended .. delighted), and per
   witness-colleague pair a Noul "does A tell B". Inputs: event tag, each NPC's traits, A-B
   relationship band, B-player band, who was in the room. Code maps buckets through the existing
   table (`BUCKET_DELTAS`, `applyReaction`, witness cap +-2, `src/game/social.ts:140-286`).
   Result: people the player never spoke to greet them differently and unlock "I heard what you
   said to..." options. As rules this is event x 15 personalities x relationship x presence.

2. **Daily stance per NPC with multi-day memory (the mood arc).** One request per day, one
   Choice per NPC over authored stances (warm, guarded, irritable, needy, celebratory, distant).
   Inputs: yesterday's interactions with the player, relationship trend, the last 2-3 stances,
   player cash / credibility / burnout bands, fired events. The stance then deterministically
   drives the greeting sub-pool, dialogue tag gates, chatter topics and destination weights. One
   call replaces surfaces 1, 2 and 3d with something that has continuity: grudges persist and
   thaw, and the office reacts when the player is suddenly rich or visibly struggling.

3. **Ambient talk that reflects the world (surface 3c done right).** Author event-tagged and
   player-tagged exchanges ("Did you hear the trainer's demo died at ACME?", "He is buying
   everyone coffee now, must be the contract"). Jev picks the exchange just-in-time for the one
   pair about to speak, from: pair relationship, gossip items in circulation (from #1),
   player-stat bands, today's events, lines already used. The player overhears the office
   reacting to their own actions, the strongest "this world is alive" signal an office sim has.

Honourable mentions, both needing #1's state first: the argument veto (D-60 row, not built) and
a visible live audience reaction in the mission.

---

## Verification (for whoever acts on this)

- D1: jsdom test - `openV2` with a fake steerer whose `steerTurn` stores a reversed order;
  click button 0 after it resolves; assert the reply belongs to the option whose text is on
  button 0. Expected to fail today.
- D2: with a key configured and `?jev=off`, run the mission and check the debug panel counters
  for `mission-question` / `mission-answer` requests. Expected today: non-zero.
- D3: with the fake client live, log `pickChatterPair` winners over one period; expect roster
  order instead of a spread.
- Perceptibility: for each surface kept on Jev, a side-by-side `?jev=off` vs live run where
  Lucas can name the difference without the debug panel (D-55).

# Jev value review (Opus) - does the Jev integration pull its weight?

## Context

Lucas: "Review if using Jev for what we use now makes any sense and provides value. Keep Jev
where it makes the game better and more realistic, use deterministic logic where it makes more
sense."

This file IS the review. Plan mode allowed writes only here, so the requested target
`.agent-briefs/jev-value-review-opus.md` is not written yet. On approval: copy the section
"REVIEW" below verbatim to `.agent-briefs/jev-value-review-opus.md` (no code changes are part of
this task).

Method and limits: code reading only (src/jev/*, src/engine/world-tick.ts,
src/game/world-projection.ts, src/game/social.ts, src/game/dialogue-turn.ts, src/ui/dialogue.ts,
src/ui/mission.ts, src/game/mission.ts, main.ts wiring, ADR-0009 section 7). No live run, no
shadow-log data was inspected. Claims marked (inference) are not measured.

---

# REVIEW

## Headline

As wired today, Jev does not carry real weight on any of the four production surfaces. The
reason is the same everywhere: **Jev is asked to judge with almost no state**. The typical
projection is name + role (+ one band). The multi-factor context that would justify a judgment
(NPC-NPC relationships, mood, needs, player stats, memory) either is not projected or does not
exist at runtime. In three places the steered path is measurably *worse* than the legacy rule it
replaces.

The infrastructure is good and worth keeping (client, adapter, per-type validation, decision
log, hook seam, shadow mode, circuit breaker). The surfaces are pointed at the wrong decisions.

## Root cause: the context Jev would need is not there

- **NPC-NPC social matrix is never written by gameplay.** The reducer case exists
  (`src/game/state.ts:212`) but nothing in `src/` dispatches `apply-social-reaction` (only
  `src/types.ts:255`, `state.ts`, `social.ts` and two tests mention it). The only thing that
  touches the matrix is nightly regression toward seeds (`state.ts:242`), on values that never
  left their seeds.
- **Mood never moves.** `decayMood`, `reactionDeltas`, `detectImbalancedTriads`
  (`src/game/social.ts:379`, `:194`, `:455`) have no caller outside `social.ts`.
- **World tick is wired with empty relationship bands**: `getRelationshipBands: () => ({})`
  (`src/main.ts:297`, with a "arrives when the pair matrix is exposed" note).
- **NPC needs (caffeine/social) are not projected anywhere.** They drive a deterministic
  round-robin coffee trip instead (`src/main.ts:2075-2092`).
- **Player money/stats reach Jev only once**: `credibilityBand` in the mission question pick
  (`src/ui/mission.ts:423`). Cash, reputation, flags, quest state: never.
- **Access**: Jev is active only with `VITE_JEV_PROXY_URL` or a pasted personal key
  (`src/jev/key-provider.ts:5-11`). Without one of those every surface is the deterministic
  fallback, so the fallback is what most players will actually play.

## Surface 1 - Greeting line pick (per NPC per day)

Facts:
- One batched request per day, 15 Choice questions (`src/jev/greeting-wrapper.ts:149-193`).
- Pool is **4 lines per NPC**, each <= 30 chars, "hello + one flavor tag"
  (`src/content/morning-greetings.ts:49+`, header `:10-11`).
- Projection: id, name, role, relationshipBand (`greeting-wrapper.ts:160-165`). The band is the
  **player-NPC** relationship (`src/main.ts:358-361`) but the prompt presents it as mood:
  "They feel like a {band} today" (`greeting-wrapper.ts:172`).
- The day is not in the projection, so the input is identical every morning until a band flips.

Assessment: a pick among 4 near-equivalent hellos is not noticeable. Worse, identical input day
after day likely yields the same line every morning (inference), where legacy
`pickMorningGreeting` (`src/engine/npc-controller.ts:448`) varies by rng. One factor, mislabeled.

**Verdict: DETERMINISTIC.** Rule: per-NPC no-repeat rotation seeded by `(day, npcId)`
(`createSeededRng` already exists, `social.ts:427`), skipping yesterday's index. If warm/cold
greetings are wanted, split each pool by an authored band tag and pick the sub-pool in code. Cheap
to revisit later: let the daily stance from "Top-3 #2" choose the sub-pool.

## Surface 2 - Dialogue option curation

Facts:
- The builder slices to the first 3 eligible options in authored order **before** the steerer
  sees anything: `slice.options.slice(0, MAX_VISIBLE_OPTIONS - 1)`
  (`src/game/dialogue-turn.ts:312`). The steerer gets exactly those 3
  (`src/ui/dialogue.ts:626`). All 52 authored topics have more than 3 options (avg 6.1, max 7).
  So Jev can only **reorder the same 3**; it never decides "which of N show".
- Since the C-78 "options jump" fix the answer is not applied to the panel on screen
  (`src/ui/dialogue.ts:632-638`); it is stored for "the next occurrence of this situation".
- The memo key is (npc, topic, used-option fingerprint) (`src/jev/dialogue-wrapper.ts:132-133`).
  Every pick changes the fingerprint (`ui/dialogue.ts:739-745`) and `finishV2` clears the memo
  (`ui/dialogue.ts:758`). The stored order is therefore read back only on
  `pickV2Task -> renderV2` (`ui/dialogue.ts:695-699`), where it reintroduces the shuffle under the
  cursor, or after a close that bypasses `finishV2` (`ui/dialogue.ts:261-264` fences but does not
  clear).
- Only fact sent: `relationship.value` (`ui/dialogue.ts:630`).
- Cost: one request with 3 Score questions on **every** turn, 1200 ms budget.
- Dead leftovers: `DIALOGUE_REPLY_MIN_CONFIDENCE` (`dialogue-wrapper.ts:42`), `memoReply` always
  null (`:296-300`), header comment still describes reply selection (`:11-15`).

Assessment: this is a paid no-op. The judgment is almost never displayed, and when displayed it
is a reorder of 3 items based on one number.

**Verdict: DETERMINISTIC (remove the request now).** Rule: tag gates (already there) +
`requiredForProgress` first + authored `priority` + a relationship-band tag boost, then top-3.
That is also a real improvement over today, because the visible 3 are currently just "first 3 in
authored order". Jev curation would only be worth reconsidering if it (a) receives all eligible
options, (b) is prefetched at walk-to-face start so the first render is already steered (D-56
specifies this, it is not implemented), and (c) has more than one fact to judge with.

## Surface 3 - World tick (every 6 s + period transitions)

Projection per tick: day, period, fired event slugs, per NPC name/role/room, per pair a distance
band (`src/game/world-projection.ts:98-123`). No relationship, mood, needs or player state.

**3a. Chatter pair** - not a judgment at all. `hookPickChatterPair` returns the first candidate
pair that has a memo (`src/engine/world-tick.ts:619-649`). The tick judges every candidate pair,
so nearly all have memos, so the winner is "first in NPC-array order". Legacy is a uniform random
pick (`src/engine/chatter.ts:149-152`). With Jev on, chatter walks the roster in order.
**Verdict: DETERMINISTIC** - restore `pickPair`; later weight it by the social need band.

**3b. Chatter starter** - Choice between two people from name + role
(`world-tick.ts:351-371`). The authored chattiness weights (`pickStarter`,
`chatter.ts:187-191`) already encode this better. **Verdict: DETERMINISTIC** (`pickStarter`).

**3c. Chatter exchange** - the one existing surface where semantic matching is real: Jev sees the
actual line text of every eligible exchange (`world-tick.ts:372-385`) plus roles, period and
today's event slugs. But:
- no relationship band (`main.ts:297`), so "fits both speakers" means "fits both job titles";
- **no no-repeat exclusion**. Legacy avoids the previous pick (`chatter.ts:219-225`); the steered
  path sends the same candidates with the same context, so a pair likely repeats its "best" line
  until the period or event list changes (inference);
- waste: every tick re-judges ALL candidate pairs, two questions each with dozens of candidates,
  while at most one conversation starts per 6-12 s (`chatter.ts:168-172`). Unused answers are
  overwritten next tick (`world-tick.ts:539`). About 100 requests per 10-minute day.

**Verdict: KEEP-JEV, but only rewired** (see Top-3 #3): judge just-in-time for the one pair about
to speak, exclude recently used lines, and project pair relationship + events + circulating
gossip + player-stat bands. If that rewiring is not done, fall back to **DETERMINISTIC**: legacy
`pickExchange` with the both-speakers topic intersection (`eligibleExchangesForPair`,
`world-tick.ts:196-208`), which is a genuine improvement worth keeping in code.

**3d. Destination** - Choice over "stay" + `RANDOM_DESTINATIONS` state names from name + role +
next period (`world-tick.ts:399-416`). The candidate set cannot express what the legacy roll does
well: colleague-desk visits (`src/content/npc-schedule.ts:557-560`, `pickColleagueDesk`), lunch
kitchen groups (`:525-533`), role affinity for deal wall / content booth (`:549-555`), the 90%
stay rate (`:539`). A steered answer replaces all of that for the period
(`src/game/events.ts:87-91`). Needs, the one input that would make this a real decision, are not
projected. **Verdict: DETERMINISTIC** - utility rule: caffeine band -> coffee, social band ->
desk of the warmest colleague, role affinity -> revenue prop, else the existing weighted roll.

## Surface 4 - Mission (question pick + answer score)

**4a. Question pick.** The mission script asks both questions of both plants at fixed steps
(`src/content/missions.ts:328-336`). The pick can only swap which of a plant's two questions
comes first; with one left there is no request (`src/jev/mission-wrapper.ts:156-160`). It also
overrides an authored comedic order ("LinkedIn ambush" first, "the headhunters" last).
**Verdict: REMOVE** - keep authored step order.

**4b. Answer score +-1.** Inputs: question text, option text, engagement band
(`mission-wrapper.ts:272-296`). Result: `clamp(baseScore + adj, -2, 2)`
(`src/game/mission.ts:270-271`) on authored scores 2/1/0/-1/-2 (`missions.ts:159-181`).
- The adjustment is never shown to the player (`src/ui/mission.ts:184-186`, `:515-518` only pass
  it through), so it cannot be noticed, only suffered.
- Each option has an authored `reaction` line; a steered -1 can contradict it.
- It moves cash and credibility through the win/loss threshold, so the same answers can pay
  differently on two runs with no explanation.
This is the right *shape* of Jev use (semantic answer x audience state), with one input factor
and no visibility. **Verdict: DETERMINISTIC** - authored per-option engagement modifier (e.g.
`landsWhen: "engaged" | "restless"` -> +-1). Promote back to Jev only when the projection carries
audience history, credibility and plant relationship, and the panel shows the reason.

## Verdict table

| Surface | Verdict | Rule / condition |
|---|---|---|
| Greeting | DETERMINISTIC | seeded no-repeat rotation; band-tagged sub-pools |
| Dialogue option curation | DETERMINISTIC | gates + requiredForProgress + priority + band boost; drop the per-turn request |
| Chatter pair | DETERMINISTIC | uniform `pickPair` (fixes roster-order bias) |
| Chatter starter | DETERMINISTIC | chattiness-weighted `pickStarter` |
| Chatter exchange | KEEP-JEV (rewired) | just-in-time, no-repeat, relationship + events + gossip + player bands; else legacy `pickExchange` |
| Destination | DETERMINISTIC | needs/affinity utility + existing weighted roll |
| Mission question pick | REMOVE | authored step order |
| Mission answer score | DETERMINISTIC | authored engagement modifier; revisit when visible + multi-factor |

## Is Jev worth keeping at all?

Yes, but not for these decisions. Today it selects among near-equivalent authored lines using a
name and a job title; a seeded pick does that for free, offline, and for every player. Jev earns
its place where the outcome depends on many interacting facts at once and a rule table would
explode: who reacts how to what the player just did, who tells whom, how a grudge carries over
days. Those decisions are also the ones that change state the player later runs into.

What would make it unmistakably worth it:
1. **Make the social state live first.** Dispatch `apply-social-reaction`, move mood, expose the
   pair matrix. Without this there is nothing to judge.
2. **Fewer, heavier calls.** A handful of per-period/per-day judgments that write state, instead
   of ~100 ambient requests a day that pick a bubble.
3. **Jev decides state, code renders it.** The judgment picks a bucket/stance; deterministic code
   turns that into greeting pool, option gates, chatter topic, destination weights.
4. **Visible consequence within a minute.** If the player cannot point at it, it failed the D-55
   perceptibility gate, whatever the counters say.
5. **The deterministic fallback stays a complete game** for players without a key.

## Top-3 highest-value Jev uses for this office sim

1. **Reaction + gossip propagation after notable player actions.** Trigger: the player insults
   Grazyna, wins or bombs the conference, goes broke, fixes the printer. One batched request at
   the next period transition: per witness a bucket Choice (offended..delighted) and per warm
   witness-colleague pair a Noul "does A tell B". Inputs: event tag, each NPC's traits, A-B
   relationship band, B-player band, who was in the room. Code maps buckets through the existing
   table (`BUCKET_DELTAS`, `applyReaction`, witness cap +-2, `social.ts:140-286`). Result: people
   the player never spoke to greet them differently and unlock "I heard what you said to..."
   options. A rule version needs event x 15 personalities x relationship x presence.

2. **Daily stance per NPC with multi-day memory.** One request per day (15 Choices) over authored
   stances (warm, guarded, irritable, needy, celebratory, distant). Inputs: yesterday's
   interactions with the player, relationship trend, last 2-3 stances, player cash / credibility
   / reputation bands, fired events, mood carry-over. The stance then deterministically drives
   the greeting sub-pool, dialogue tag gates, chatter topics and destination weights. One call
   replaces surfaces 1, 2 and 3d with something that has continuity: grudges persist and thaw.

3. **Ambient talk that reflects the world (surface 3c done right).** Add event-tagged and
   player-tagged exchanges ("Did you hear the trainer's demo died at Acme?", "He is buying
   everyone coffee now, must be the contract"). Jev picks the exchange for the one pair about to
   speak from: pair relationship, gossip items in circulation (from #1), player-stat bands,
   today's events, lines already used. The player overhears the office reacting to their own
   actions, which is the strongest "this world is alive" signal an office sim has.

Honourable mention: the argument veto (D-60 row, not built) and a visible live audience reaction
in the mission, both of which need #1's state first.

# Dialogue Volume + Structure Design — Multi-Turn Rewrite

Date: 2026-08-29. Scope: design only (no code). Grounded in `src/content/dialogues.ts` (current: ~60 nodes, ~150 authored lines, single Q-and-A), `src/types.ts` (DialogueNode/Option), PRD §4.3 + C-10.

**Headline numbers:** ~2,000 authored dialogue lines across ~730 tree nodes for 13 NPCs, plus ~280 ambient/shared lines (speech bubbles, office-event callbacks) ≈ **2,300 authored strings total — 13x today's volume**. Combined with combinatorial greeting/context variants (§2), the *perceived* variety is ~100x: a 30-day playthrough consumes ~240 conversations out of ~400 distinct variants, and no two days repeat the same lines.

---

## 1. The right amount

### Per-NPC lines (authored: NPC lines + player option text)

Three tiers. The loudest NPC has 6x the quietest.

| Tier | NPCs | Lines each | Why |
|---|---|---|---|
| A (story-critical) | bartek, zosia, maciek | 220–300 | Quest-giver, manager arcs, CTO AI-pivot arc. PRD demands 50+ nodes and 5–10 min conversations for these. |
| B (office life) | marek, klaudia, kasia, tomek, ania, grazyna, przemek | 130–150 | 3–4 threads each; they carry the daily-comedy load and the event hooks. |
| C (flavor) | pawel, janusz, burek | 50–110 | pawel is a running gag with one arc; janusz is a lore vending machine; burek is non-verbal (narration + choices). |

### Turns per conversation

- **Min: 2 turns** (drive-by: greeting → one exchange → contextual farewell). Burek min is **1** (pet / ignore / feed).
- **Standard: 4–6 turns** (a topic thread with real back-and-forth).
- **Max: 10–12 turns** (bartek onboarding, zosia performance review, "we're becoming friends" arcs). **Hard cap: 14** — the walker enforces it.
- PRD C-10's "4–8 turns minimum" applies to *thread conversations*; the 2-turn floor exists only for repeat-today drive-bys, which is what makes an office feel lived-in rather than every chat being an interrogation.

### Distinct player experiences across 30 days

- Target playthrough: **5–8 hours** for days 1–30 (~8 real minutes/day of pure dialogue).
- Conversation instances per run: ~8 meaningful talks/day × 30 = **~240**.
- Distinct conversation variants authored: **~400** (47 threads × ~4 entry contexts × ~2 gated paths). A first playthrough sees ~60% of the content; a second playthrough (different choices/relationship tiers) sees a different slice. That is the replayability budget.
- Multi-NPC set-pieces on top: 10 scripted standup variants, 8 client calls, 6 classroom sessions, 4 weekly 1-on-1s, 3 meeting set-pieces = **31 scripted multi-speaker scenarios**.

### Total nodes in the data model

**~730 dialogue nodes** (vs ~60 today) + greeting/farewell/callback string pools that are not nodes (they decorate entry/exit). Per-NPC node counts in §5 table.

---

## 2. The structure — five layers

The data model must stay composable, or LOC explodes: **greeting pools + thread registry + shared callbacks**, not monolithic trees. Required (small) type additions: `DialogueOption.condition?: (state) => boolean`, `DialogueNode.speakerId?` (multi-NPC modes), per-NPC `threads: { id, weight, once?, cooldownDays? }[]`.

### Layer 1 — Greeting pools (the entry)

Per Tier A/B NPC: **~16 greeting strings**; Tier C: ~8. Parameterized by: first-meeting ever (1), first-today (3 variants), second-today (2), third-plus-today (2), relationship override cold/warm (2 each), schedule period morning/afternoon/evening (2). Greeting selection is a pure function `pickGreeting(state, npc)` — seeded RNG, no repeats within a day.
Total: **~160 greeting lines.**
Example (marek, second-today, neutral): *"You again. Fine. FINE. You have 90 seconds and one of them is already gone."*

### Layer 2 — Topic threads (the meat)

Tier A: **5–6 threads**; Tier B: **3–4**; Tier C: **2**. Total **~47 threads**. Each thread = a 4–6 turn spine. Thread availability is gated (once / cooldown / flag / day range), so the same NPC offers different menus on day 3 vs day 20.
Example (ania, thread 3, days 8+): *"Webinar debrief"* — she presents the engagement numbers; the actual audience was 11 people, 9 of them ania's own accounts.

### Layer 3 — Follow-up branches (the depth)

Every player option gets its own NPC reaction node (PRD C-10 §3 — non-negotiable, this is what was missing). Per thread: 2–3 depth-1 branches, 1–2 depth-2 sub-branches, with convergence back to the spine. **~12–15 nodes per thread.** This layer is ~70% of the node budget.
Example (marek thread "code review", option "Have you tried writing tests?" → depth-1): *"Tried? I've *succeeded*. The test says `expect(true).toBe(true)` and it passes every time. Green means go."* → depth-2: "show him the CI dashboard" / "back away slowly."

### Layer 4 — Memory callbacks (the texture)

Per NPC: **4–6 callback lines** keyed to `lastTopic` / prior flags, injected as the greeting *suffix* on the next meeting (PRD C-10 §6). Plus **~20 shared office-event callbacks** (any NPC can reference "the printer thing," "the keg party," "when the CTO said scale"). Total **~85 callback lines.**
Example (zosia, after player complained about standups yesterday): *"Morning. You survived standup. Nobody dies in standup, that's the policy. The retro, though—"*

### Layer 5 — Gated options (the RPG)

Tier A: 6–10 gated options each; Tier B: 3–5; Tier C: 1–2. Total **~50**. Gates: flags (quest state), stats (credibility ≥ 50 unlocks the "call the bluff" option), relationship tiers (≥ 60 unlocks gossip/janusz lore, < 20 forces an "apologize first" opening).
Example (przemek, only if `maciek-ai-first-deal` flag): **"The board already approved budget. I saw the slide."** → przemek panics with respect: +15 rel, unlocks the double-rate bootcamp.

---

## 3. Tone + variety across 30 days

Voice stays IT Crowd × Silicon Valley: dry, deadpan, self-deprecating. Four anti-repetition systems:

### Verbal tics (1–2 catchphrases per NPC, overuse IS the joke)
- przemek: "BIG fan." / "Let's circle back." (nothing is ever circled back to)
- zosia: "Quick question:" (never quick) / "Let's take this offline" (let's never speak of it again)
- marek: "It's a vibe." / "There are no small questions, only small minds."
- klaudia says "💡" out loud. kasia: "Transparency is a spectrum."

### Topic drift (NPC raises unasked things, tied to world state)
- marek, mid code-review: "…also, why does the fridge inventory app need my location? Don't answer. It was rhetorical and also a crime."
- grazyna, mid invoice talk: "Unrelated: whoever keeps expensing 'consulting — knee' needs to stop. Today."
- janusz: any conversation becomes parking-lot lore after 2 turns if relationship > 40. It's a rule. It's in his contract.

### Comedy-of-errors chains (misunderstanding flags propagating across NPCs)
- Say "I'm basically qualified" to klaudia → next day kasia calls you "the qualified one" → tomek asks if you're the new QA → zosia assigns you the bug backlog in standup. Flag `mistaken-for-qa` resolves 3 days later in the retro.
- Feed burek → ania builds a persona ("the trainer who keeps it real, with dogs") → przemek promises a client a robot AND a dog → the bootcamp Q&A has a dog question.
- Fix the printer (janusz's secret, PRD lore: it's unplugged, not broken) → janusz enters a 3-greeting passive-aggressive cold war with a forgiveness arc.

### Inter-NPC speech bubbles (ambient, no player input)
Target **200 curated lines** (AGENTS.md says 50+; double it), shown when 2 NPCs are within 2.5m, cooldown 90s per pair.
- marek→tomek: "Who approved this?" — "You did." — "…Correct."
- klaudia→ania: "Engagement is up." — "From what?" — "Zero."
- zosia→anyone: "Got 5 minutes?" (it is never 5 minutes). janusz→burek: entire one-sided conversations.

---

## 4. Implementation implications

### Size (LOC)
- Data: ~730 nodes × ~6.5 LOC (formatted, incl. options/effects) + pools ≈ **~5,000 LOC of dialogue data** (current file: 696). **Split per NPC**: `src/content/dialogues/<npc>.ts` (13 files, 100–500 LOC each) + `shared/greetings-pools.ts`, `shared/callbacks.ts`, `bubbles.ts`. One 5k-line file would be unreviewable.
- Engine: ~200–300 LOC new/changed (thread registry walker, `pickGreeting`, gating filter, memory write, turn cap, multi-speaker sequencing).

### Writing time
- Human comedy writer solo at ~100–150 finished lines/day: **3–5 weeks** for 2,300 lines.
- AI-drafted + human punch-up (this project's pipeline): full first draft in 2–3 days; punch-up pass on 100% of Tier A lines and ~30% of the rest: **~2 weeks elapsed** to full quality. Phase 1 subset: **3–4 working days.**

### Testing (vitest, per PR-3/PR-8 — all pure functions)
- **Tree integrity test** (runs over all 13 files): every `nextNodeId`/`next` resolves; every node reachable from root; every non-farewell node has ≥2 options; farewell nodes set `lastTopic`; gated options are satisfiable (condition passes against a state-builder fixture).
- **Walker unit tests**: `pickGreeting` tiering + no-repeat-within-day (seeded RNG); gating filter respects credibility/relationship boundaries; `lastTopic` write→callback read round-trip.
- **Golden-path snapshots**: default walk (always first option) of each thread produces the expected line sequence — catches accidental rewrites.
- **30-day fuzz**: seeded sim of ~240 conversations; asserts termination ≤ 14 turns, zero dead-ends, zero line reused within a day.
- Playwright e2e: bartek onboarding click-through shows turn counter "3/10" and a farewell; screenshot per PR-2.

### Scaling (thin → deep, no orphaned NPCs)
- **Wave 1 (Phase 1, days 1–7):** every NPC ships *thin* — 1 deep thread (5–8 turns) + 2 medium + full greeting pool + 2 callbacks. Bartek onboarding (10 turns), zosia first 1-on-1 (8 turns), first client call, first classroom. ≈ **1,100 lines.**
- **Wave 2 (days 8–14):** performance review, raise arc, maciek AI-pivot arc, friendship tiers, gated options, comedy-of-errors chains. ≈ +700 lines.
- **Wave 3 (days 15–30):** late-game arcs (burnout, rival offer, ending variants), random-event tie-ins, bubbles to 200. ≈ +500 lines.
The walker + pools ship in Wave 1, so Waves 2–3 are *content-only* commits — no engine churn.

---

## 5. Recommendation (the answer)

**Adopt the three-tier budget.** Per-NPC contract:

| NPC | Tier | Threads | Nodes | Lines | Longest convo |
|---|---|---|---|---|---|
| bartek | A+ | 6 | ~110 | 300 | onboarding, 10 turns |
| zosia | A | 5 | ~95 | 260 | performance review, 12 turns |
| maciek | A | 5 | ~80 | 220 | AI-pivot arc, 10 turns |
| marek, przemek | B | 4 | ~55 | 150 | 6 turns |
| kasia, ania | B | 4 | ~50 | 140 | 6 turns |
| klaudia, tomek, grazyna | B | 3–4 | ~48 | 130 | 6 turns |
| pawel | C+ | 3 | ~40 | 110 | backup-script arc, 8 turns |
| janusz | C | 2 + lore pool | ~36 | 100 | 5 turns |
| burek | C | non-verbal pool | ~15 | 50 | 2 turns |
| **Total** | | **~47** | **~730** | **~2,010** | |

Plus: 160 greeting-pool lines, 85 callbacks, 50 gated options, 200 bubbles, 31 multi-speaker set-pieces.

- **Turn counts:** min 2 (burek 1), standard 4–6, max 10–12, hard cap 14.
- **Phase 1 minimum viable set (days 1–7):** the Wave-1 thin-13 above ≈ **1,100 lines / ~380 nodes** — every NPC worth talking to on day one, bartek/zosia/maciek already deep enough to carry the quests.
- **Full 30-day set:** ~2,300 authored strings ≈ 3–5 human-weeks, or ~2 weeks AI-drafted + punch-up. Do NOT attempt the full set before Phase 1 ships — the thin-13 proves the walker, the pools, and the memory system first.

**Why not literally 100x authored lines (15,000):** at 15k lines, per-line quality drops, testing surface becomes unfuzzable, and no player encounters >20% of it in one run. 13x authored × combinatorial entry contexts ≈ 100x *perceived* variety — which is the thing Lucas actually asked for ("real work simulation," no repetition). This is the maximum volume that stays writable, testable, and funny.

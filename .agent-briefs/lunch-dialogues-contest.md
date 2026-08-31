# Lunch dialogues contest — grok-4.5 vs agy / sonnet 4.6

## What this is

A two-way contest between `grok` (grok-4.5 via the local `grok` CLI) and `agy` (sonnet 4.6 via the Antigravity CLI). Both are asked to write **50 funny one-liner dialogue lines** for the office NPCs to say in the kitchen during lunch (and for Burek the dog to "say" as dog-sounds). The orchestrator (Claude Code, the LLM reading this file) picks the funniest / sharpest / most specific lines from each and merges them into a single file. Lucas (the user) reviews the merge.

## Why a contest

Lucas (2026-08-31): "make a contest and make them funny. Choose the best. Irony." The PR-5 / orchestrator rules already name `grok` (grok-4.5) and `agy` (sonnet 4.6) as the two non-Claude fallback models with different style — grok is fast and accurate, agy is the most visual / best at describing things. Both are good for comedy. The contest runs them on the same brief; the orchestrator compares and picks.

## Constraints (hard)

- **50 lines total**, split:
  - `LUNCH_DIALOGUES_HUMAN: string[]` — **45 lines** (or more, the merge keeps the best).
  - `LUNCH_DIALOGUES_DOG: string[]` — **5-8 lines**, all of them. Burek's lines are dog-sounds rendered as text.
- **Every line ≤ 60 characters** (the bubble canvas is hardcoded to 32 chars × 2 lines = 61 max; staying under 60 avoids the `...` truncation in `src/engine/bubbles.ts:fitLine`).
- **No line may appear in both pools** (`LUNCH_DIALOGUES_HUMAN` and `LUNCH_DIALOGUES_DOG`).
- **No line may duplicate any of the existing 18 lines in `src/engine/bubbles.ts:INTER_NPC_LINES`** (lines 11-28 of that file). The orchestrator does the diff after the contest.
- **Tone:** IT Crowd + Silicon Valley — dry, deadpan, brutally accurate to real IT-folk suffering, occasional absurd escalation. The bar is the existing `INTER_NPC_LINES` ("What Freud would say about that bat?", "I guess it's some bat-complex", "Have you seen my pierogi?", "Just KISS, ok?"). The lines should feel like they could be said by an office worker at a kitchen table.
- **Topics** (the brief is a guide, not a checklist — mix freely):
  - IT jokes (bugs, deploys, Stack Overflow, "works on my machine", "have you tried turning it off and on again")
  - startup jokes (funding, pivots, "we're a family", pizza at 11pm, KPI dashboards)
  - gaming (Steam sales, AAA releases, "I'll just play one more match", indie vs AAA)
  - AI (LLMs, hallucinations, "is this AGI yet?", prompt engineering, agents, Copilot, copyright lawsuits)
  - coffee (the state of the machine, "I just had 4", decaf vs real, oat milk)
  - dinner (microwave meals, sad desk lunches, leftovers, the new lunch place)
  - farting (yes, really — IT Crowd does this, so do office workers)
  - diet (keto, vegan, "I'm starting Monday", cheat days, gym in January)
  - fat (body-positive and self-deprecating both work — match the office tone)
  - beer (Friday, "just one", craft beer hipsters, IPAs)
  - pizza (toppings wars, pineapple debate, "the usual?")
  - vege (going vege for a week, fake meat, "where do you get your protein")
  - eco (recycling guilt, paper straws, "we have to save the planet", but also the irony of laptops in the cloud)
  - work (the meeting that should have been an email, the manager who only says "let's circle back", the one who keeps their webcam off)
- **Dog lines** for Burek: "woof!", "bork bork!", "*sniff sniff*", "*tail wag*", "feed me pls", "is that pizza?", "*ears perk*", "*tilts head*", "*yawn*". Keep them short (≤ 25 chars) so they look like dog sounds, not human speech.

## Output format (what the contestants should produce)

Each contestant returns a single text block (not a file — the orchestrator does the file):

```
=== LUNCH_DIALOGUES_HUMAN (45) ===
"line 1"
"line 2"
...
"line 45"

=== LUNCH_DIALOGUES_DOG (5-8) ===
"woof!"
"bork bork!"
...
```

No preamble, no explanation, no apologies. Just the lines.

## How to run the contest

The orchestrator runs **both** of these in parallel (separate Bash calls, do NOT chain with `&&`):

```bash
# Contestant 1: grok-4.5
grok --always-approve -p "<paste brief text below>"

# Contestant 2: agy / sonnet 4.6
agy --mode accept-edits --add-dir /home/lucas/DEV/Projects/ai-trainer-simulator --print-timeout 15m -p "<paste brief text below>"
```

**Important per `~/AGENTS.md` / `~/.claude/CLAUDE.md`:**
- agy in headless mode auto-denies every permission prompt. `--add-dir` is MANDATORY (agy does not adopt cwd as workspace). If it errors with "no output produced - a tool required the X permission", add `--add-dir` and retry.
- grok accepts the brief via `-p`. It runs in cwd; that's fine because it only needs to read `src/engine/bubbles.ts` for the existing `INTER_NPC_LINES` (point it at the file path explicitly so it doesn't try to read it via permissions).
- Both should be run with `< /dev/null` (stdin redirected) to avoid stdin-hang in the background.

## Brief to paste into each contestant

> You are writing funny one-liner dialogue lines for a 3D retro pixel-art office simulator. The lines are said by NPCs (and a dog) standing in a kitchen during their lunch break, in a small speech bubble above their head.
>
> **Required output:** 50 lines total, exactly. Split as 45 human + 5-8 dog.
>
> **Hard constraints:**
> - Every line ≤ 60 characters (the bubble canvas is hardcoded).
> - Dog lines ≤ 25 characters (keep them like sounds, not speech).
> - Plain ASCII. No em dashes, no emoji, no smart quotes, no Unicode.
> - Tone: IT Crowd + Silicon Valley. Dry, deadpan, brutally accurate to real office workers. Occasional absurd escalation. Match the bar of these existing lines: "What Freud would say about that bat?", "I guess it's some bat-complex", "Have you seen my pierogi?", "Just KISS, ok?", "I'll merge it after lunch.", "Coffee? I just had 4."
> - The 18 existing lines in `src/engine/bubbles.ts:INTER_NPC_LINES` (lines 11-28) are off-limits. Do not duplicate any of them. Read the file first if you are unsure.
>
> **Topics** (mix freely, no need to cover all): IT jokes, startup jokes, gaming, AI, coffee, dinner, farting, diet, fat, beer, pizza, vege, eco, work. Some lines about the game world (the CEO, the Batman sign, the office dog, the kitchen equipment) are welcome.
>
> **Dog lines** (Burek the office dog, golden retriever): dog sounds rendered as text, like a comic-book bark. Examples: "woof!", "bork bork!", "*sniff sniff*", "*tail wag*", "feed me pls", "is that pizza?". Be creative but short.
>
> **Output format** (no preamble, no explanation):
> ```
> === LUNCH_DIALOGUES_HUMAN (45) ===
> "line 1"
> "line 2"
> ...
>
> === LUNCH_DIALOGUES_DOG (5-8) ===
> "woof!"
> ...
> ```
>
> Now write the lines. Be funny. Be specific. Real office culture is your friend.

## After the contest

The orchestrator:

1. **Parses** both contestant outputs into two arrays each (human + dog).
2. **Validates** (programmatic check):
   - human count ≥ 45, dog count ≥ 5.
   - every line ≤ 60 chars (human) / ≤ 25 chars (dog).
   - no line in any pool is in `INTER_NPC_LINES` (diff the sets).
   - no line appears in both human and dog pools.
3. **Picks the best 45 human lines from the union** of the two contestants' pools. Bias toward the lines that are: (a) the most specific (not generic), (b) the funniest, (c) the most "office-real" (a thing you would actually hear a coworker say in a kitchen).
4. **Picks the best 5-8 dog lines** from the union. Same bias.
5. **Writes** `src/content/lunch-dialogues.ts` exporting the two arrays. Plus a `pickLunchLine(rng, isBurek)` helper that picks from the right pool.
6. **Adds tests** in `tests/unit/lunch-dialogues.test.ts`:
   - human count ≥ 45, dog count ≥ 5;
   - no line > 60 chars (human) / 25 chars (dog);
   - no overlap with `INTER_NPC_LINES` (programmatic);
   - no overlap between the two pools;
   - `pickLunchLine(rng, true)` returns a dog line, `pickLunchLine(rng, false)` returns a human line.
7. **Stages, typecheck, tests, commits, and pushes** (after Lucas sees the file).

## What to do NOT

- Do NOT commit before the file is written and the tests pass.
- Do NOT push before Lucas has seen the file.
- Do NOT mix lines from one contestant with the other without a merge rationale (the merge is a quality pick, not a 50/50 split).
- Do NOT add Burek's lines to the human pool, even if a contestant mixed them up.
- Do NOT use Claude (this session) to write the lines — that's not the point of a contest.

## Files this work touches

- **NEW** `src/content/lunch-dialogues.ts` — the picked-and-merged lines.
- **NEW** `tests/unit/lunch-dialogues.test.ts` — the validation tests.
- (Possibly) `src/engine/bubbles.ts` — re-export the new arrays from there, or import them in `npc-controller.ts` directly. (Likely direct import in `npc-controller.ts`; the bubble canvas code stays where it is.)
- (Possibly) `src/engine/npc-controller.ts` — add the `dialogueContext: "lunch" | "work"` argument to the bubble trigger. This is Phase 3.6 code, not part of this brief.

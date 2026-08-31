# Lunch dialogues contest — grok-4.5 vs agy / sonnet 4.6 vs GLM-5.3 (subagent)

## What this is

A three-way contest between `grok` (grok-4.5 via the local `grok` CLI), `agy` (sonnet 4.6 via the Antigravity CLI), and GLM-5.3 (a subagent spawned INSIDE the Claude Code session). All three are asked to write **50 funny one-liner dialogue lines** for the office NPCs to say in the kitchen during lunch (and for Burek the dog to "say" as dog-sounds), from the identical brief text. The orchestrator (the LLM reading this file) picks the funniest / sharpest / most specific lines from the union of all three entries and merges them into a single file. Lucas (the user) reviews the merge — he is the final judge.

## Why a contest

Lucas (2026-08-31): "make a contest and make them funny. Choose the best. Irony." The original 2-way plan (grok + agy) was expanded the same day when Lucas added GLM: "join but use subagent, inside this claude session, do not use main session for this." The GLM entry therefore comes from a subagent with the identical brief — the main session never writes or edits contestant lines, it only launches, parses, validates, and merges. (GLM's earlier exclusion was about `opencode` quota; the in-session subagent costs no opencode quota. Full rationale in PRD §13 C-45 amendment (g).)

## Constraints (hard)

- **Exactly 50 lines per contestant**, split:
  - `LUNCH_DIALOGUES_HUMAN: string[]` — **45 lines**.
  - `LUNCH_DIALOGUES_DOG: string[]` — **5-8 lines**, all of them. Burek's lines are dog-sounds rendered as text.
- **The merged output is 45 human lines + 5-8 dog lines, in TWO files** — the dog pool is NOT lunch-specific (Lucas, 2026-08-31: "Dog dialogues should not be LUNCH specific, always the same, lunch or outside the lunch, Burek should say same dialogues at random, rarely, but many times a day"): human lines go to `src/content/lunch-dialogues.ts` (`LUNCH_DIALOGUES_HUMAN`, exactly 45), dog lines go to `src/content/dog-dialogues.ts` (`BUREK_LINES`, 5-8) and fire all day from a dedicated rare ambient bark trigger. The contestants themselves still deliver 45 + 5 in one block — the split into two files happens at merge time.
- **Every line ≤ 60 characters** (the bubble canvas is hardcoded to 32 chars × 2 lines = 61 max; staying under 60 avoids the `...` truncation in `src/engine/bubbles.ts:fitLine`).
- **Every line plain ASCII** (`/^[\x20-\x7E]+$/`): no em dashes, no smart quotes, no emoji, no Unicode — contestant models love typographic characters, so this is validated programmatically after the merge.
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

The orchestrator runs **all three** of these in parallel (separate Bash calls / Agent call, do NOT chain with `&&`). The shared brief text lives in `.agent-briefs/lunch-dialogues-contest-prompt.txt` so all three contestants get byte-identical input:

```bash
# Contestant 1: grok-4.5
grok --always-approve -p "$(cat .agent-briefs/lunch-dialogues-contest-prompt.txt)"

# Contestant 2: agy / sonnet 4.6
agy --mode accept-edits --add-dir /home/lucas/DEV/Projects/ai-trainer-simulator --print-timeout 15m -p "$(cat .agent-briefs/lunch-dialogues-contest-prompt.txt)"
```

Contestant 3 (GLM-5.3) is NOT a CLI call: spawn a subagent inside the Claude session (Agent tool, general-purpose type, no model override — it inherits the session's GLM model) whose prompt is the same brief text plus: "Do not read any files and do not use any tools. Everything you need is in this prompt. Return ONLY the output block." Per Lucas (2026-08-31): "join but use subagent, inside this claude session, do not use main session for this."

**Important per `~/AGENTS.md` / `~/.claude/CLAUDE.md`:**
- agy in headless mode auto-denies every permission prompt. `--add-dir` is MANDATORY (agy does not adopt cwd as workspace). If it errors with "no output produced - a tool required the X permission", add `--add-dir` and retry.
- grok accepts the brief via `-p`. It runs in cwd; the brief is self-contained (the 18 off-limits lines are listed inline), so no file reads are needed.
- Both CLI calls should be run with `< /dev/null` (stdin redirected) to avoid stdin-hang in the background.

## Contestant brief — the verbatim content of `.agent-briefs/lunch-dialogues-contest-prompt.txt`

> You are writing funny one-liner dialogue lines for a 3D retro pixel-art office simulator. The lines are said by NPCs (and a dog) standing in a kitchen during their lunch break, in a small speech bubble above their head.
>
> **Required output:** exactly 50 lines, split exactly as 45 human + 5 dog.
>
> **Hard constraints:**
> - Every line ≤ 60 characters (the bubble canvas is hardcoded).
> - Dog lines ≤ 25 characters (keep them like sounds, not speech).
> - Plain ASCII. No em dashes, no emoji, no smart quotes, no Unicode.
> - Tone: IT Crowd + Silicon Valley. Dry, deadpan, brutally accurate to real office workers. Occasional absurd escalation. Match the bar of these existing lines: "What Freud would say about that bat?", "I guess it's some bat-complex", "Have you seen my pierogi?", "Just KISS, ok?", "I'll merge it after lunch.", "Coffee? I just had 4."
> - The 18 existing lines in `src/engine/bubbles.ts:INTER_NPC_LINES` are off-limits. Do not duplicate (or trivially reword) any of them. They are, verbatim:
>   "Did you restart it?", "The printer is jammed again.", "Standup in 5, be ready.", "At 5?! Am or Pm?", "I'll merge it after lunch.", "Chat Bot is down again.", "Who broke the build? Again!", "Coffee? I just had 4.", "Can you review my PR?", "What Freud would say about that bat?", "I guess it's some bat-complex", "Did the deploy go out?", "The wifi is being weird today.", "!!! $#%#$@$% !!!", "Is he still staring at me?", "Shh... They are watching...", "Have you seen my pierogi?", "Just KISS, ok?"
> - The prompt is self-contained on purpose: all contestants get byte-identical input (no file reads), so the contest stays fair.
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
> === LUNCH_DIALOGUES_DOG (5) ===
> "woof!"
> ...
> ```
>
> Now write the lines. Be funny. Be specific. Real office culture is your friend.

## After the contest

The orchestrator:

1. **Parses** all three contestant outputs into two arrays each (human + dog).
2. **Validates** each contestant (programmatic check):
   - human count ≥ 45, dog count ≥ 5.
   - every line ≤ 60 chars (human) / ≤ 25 chars (dog).
   - every line matches `/^[\x20-\x7E]+$/` (plain ASCII).
   - no line in any pool is in `INTER_NPC_LINES` (diff the sets).
   - no line appears in both human and dog pools.
3. **Picks the best 45 human lines from the union** of the three contestants' pools. Bias toward the lines that are: (a) the most specific (not generic), (b) the funniest, (c) the most "office-real" (a thing you would actually hear a coworker say in a kitchen).
4. **Picks the best 5-8 dog lines** from the union. Same bias.
5. **Writes TWO files.** `src/content/lunch-dialogues.ts` exporting `LUNCH_DIALOGUES_HUMAN` (exactly 45) and `src/content/dog-dialogues.ts` exporting `BUREK_LINES` (5-8). Arrays only — no picker helpers in content: the existing generic `pickLine(lines, rng)` in `src/engine/bubbles.ts` already does no-immediate-repeat picking for any array, and the engine importing content is the right dependency direction (content must not import from engine). The dog pool is context-free: same lines at lunch, at a desk, in the corridor (the ambient bark trigger is Phase 3.6 controller work, not part of this brief).
6. **Adds tests** in `tests/unit/lunch-dialogues.test.ts` and `tests/unit/dog-dialogues.test.ts` (TDD: the test files are written FIRST and fail against the missing modules, then the implementations land):
   - human count exactly 45; dog count 5-8;
   - no line > 60 chars (human) / 25 chars (dog);
   - every line plain ASCII; no duplicates within a pool;
   - no overlap with `INTER_NPC_LINES` (programmatic);
   - no overlap between the two pools;
   - every line is a non-empty string.
7. **Stages, typecheck, tests, commits** (after Lucas sees the file). Push only at the Phase 3.6 end-of-phase gate per HR-6.

## What to do NOT

- Do NOT commit before the file is written and the tests pass.
- Do NOT push before Lucas has seen the file.
- Do NOT mix lines from one contestant with the other without a merge rationale (the merge is a quality pick across all three, not a quota split).
- Do NOT add Burek's lines to the human pool, even if a contestant mixed them up.
- Do NOT write or edit contestant lines in the MAIN session — the GLM entry comes from the subagent with the identical brief; the main session only launches, parses, validates, and merges (Lucas, 2026-08-31: "do not use main session for this").

## Files this work touches

- **NEW** `src/content/lunch-dialogues.ts` — `LUNCH_DIALOGUES_HUMAN` (exactly 45) + `pickLunchLine(rng)`.
- **NEW** `src/content/dog-dialogues.ts` — `BUREK_LINES` (5-8, all-day pool, NOT lunch-specific) + `pickBurekLine(rng)`.
- **NEW** `tests/unit/lunch-dialogues.test.ts` and `tests/unit/dog-dialogues.test.ts` — the validation tests.
- (Later, Phase 3.6 controller work, NOT this brief) `src/engine/npc-controller.ts` — the `dialogueContext: "lunch" | "work"` argument to the bubble trigger + the Burek ambient bark timer (`DOG_BARK_INTERVAL`, randomized 150-300 s, several barks per 20-minute day).

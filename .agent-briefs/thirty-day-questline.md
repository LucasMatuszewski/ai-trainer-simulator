# Brief: write the 30-day quest chain (full career arc) for AI Trainer Simulator

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game in `/home/lucas/DEV/Projects/ai-trainer-simulator/`. Lucas wants a "30-day career arc" where the player is an IT trainer / consultant. Each day has a quest that advances the story. The current state is just the first 7 days in the brainstorm at `.agent-briefs/onboarding-storyline-brainstorm.md`.

The 13 NPCs (recap):
- bartek (team lead, gives assignments)
- klaudia (LinkedIn influencer, loud)
- marek (DevOps, 10x engineer, knows the systems)
- zosia (the manager, gives status updates)
- pawel (the intern, eager, asks questions)
- kasia (the recruiter, calls you "talent")
- tomek (junior dev, Stack Overflow copy-paster, the meme of pushing to main on Friday)
- ania (marketing, wants "synergy webinars")
- janusz (the janitor, knows everything, gives the best advice)
- burek (office dog, bark/pet/feed)
- grazyna (the accountant, watches the budget)
- maciek (the CTO, pivots to AI every 3 days, talks about "scale")
- przemek (sales, "circle back," "let's take this offline")

Player stats: credibility, caffeine, patience, focus. Quest rewards: cash, XP, relationship deltas, stat buffs.

## What I want from you (NO CODE)

A complete 30-day quest chain, one quest per day, with:

### 1. Per-day quest card

For each of the 30 days, deliver:
- **Title** (1 line, evocative, in-character)
- **Objective** (1-2 sentences, what the player does)
- **Who** (the NPC they talk to, or "free" if it's a solo task)
- **Where** (the room — main office, kitchen, meeting room, training room, CTO office)
- **Reward** (cash, XP, relationship, stat buff — concrete numbers)
- **Complication** (what can go wrong; the random event that may fire that day)
- **Bridge to next** (how this quest chains to the next day)

### 2. Story arc

The 30 days are a story arc. Sketch:
- **Days 1-7** (onboarding): "Survive week 1" — learn the office, meet the team, get assigned your first project.
- **Days 8-14** (first project): "Survive sprint 1" — deliver the first client project, learn the codebase, get feedback.
- **Days 15-21** (mid-arc crisis): "The incident" — a big production issue (e.g. Tomek pushed to main on Friday, the client is angry, the CTO pivots to AI mid-crisis). The player has to lead the response.
- **Days 22-28** (recovery + growth): "Earn your stripes" — get a promotion, deliver a conference talk, hire your first junior, get sent to a client onsite.
- **Days 29-30** (endgame chapter 1): "Become the best in the GALAXY" — the closing cinematic, the choice that defines the player's career path.

For each chapter, give 2-3 sentences on the emotional arc and the player's growth.

### 3. Character moments

Some days should have a "character moment" — a 1-on-1 conversation that reveals an NPC's backstory. Examples:
- "Klaudia tells you why she became a LinkedIn influencer"
- "Janusz shows you the office at 3am when everyone's gone"
- "Maciek confesses he's scared of AI taking his job"

Pick 5-7 days and assign a character moment. Make sure they cover all 13 NPCs at least once over 30 days.

### 4. Multi-NPC quests

Some quests should involve 2-3 NPCs working together. Examples:
- "Sit in on the standup with Marek, Tomek, and Bartek" — 3-NPC meeting mode.
- "Pair-program with Tomek on the bug from yesterday" — 2-NPC classroom-like mode.
- "Negotiate with Przemek and the client (Kasia plays the client)" — 2-NPC client call mode.

Pick 5-7 days and assign a multi-NPC quest. Note the conversation mode (D-17): 1-on-1, meeting, standup, classroom, client-call.

### 5. Tone

IT Crowd + Silicon Valley, dry, ironic, self-deprecating. The quests should feel like "real work" but with humor. Some examples of the right tone:
- "Talk to Bartek about your first assignment. Don't mention you Googled half the stack yesterday."
- "Survive the Monday standup. Nobody's happy. The coffee machine is broken."
- "Help Tomek debug his Friday deploy. He pushed to main at 4:55pm. The build is on fire."

## Output

Write a 30-day quest chain to `.agent-briefs/thirty-day-questline.md`. Use markdown. Each day gets a section. Keep the per-day card short (10-15 lines per day). The total document should be 500-800 lines.

Do not commit. Do not push.

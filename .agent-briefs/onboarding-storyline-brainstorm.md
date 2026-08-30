# Brief: brainstorm the day-1 onboarding storyline + first 7 days of quests

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game in `/home/lucas/DEV/Projects/ai-trainer-simulator/`. The player is an IT trainer on day 1. The user is brutally honest: the current game has no onboarding, no goals, no idea of what to do, no intro cinematic. The user wants:
- An intro animation when the game starts
- A quest log with real "what should I do next?" guidance
- After the intro, "Talk to Bartek" as the first quest
- More dialogue, more life
- Each day should be different

The current cast (13 NPCs):
- **bartek** — Senior Consultant (team lead, gives assignments)
- **klaudia** — LinkedIn Influencer (loud, posts)
- **marek** — DevOps / 10x engineer (knows the systems)
- **zosia** — The Manager (gives status updates)
- **pawel** — The Intern (asks questions, eager)
- **kasia** — The Recruiter (calls you "talent")
- **tomek** — Junior Developer (Stack Overflow copy-paster)
- **ania** — Marketing (wants synergy webinars)
- **janusz** — The Janitor (knows everything)
- **burek** — Office Dog (bark/pet/feed)
- **grazyna** — The Accountant (money)
- **maciek** — The CTO (pivots to AI, talks about scale)
- **przemek** — Sales ("circle back")

The user wants the game to be a real work simulation, not just a dialogue tree. NPCs need their own lives, agendas, arcs. The player has 4 stats: credibility, caffeine, patience, focus.

## What I want from you (NO CODE)

Read the existing `src/content/dialogues.ts` briefly to understand the tone (IT Crowd + Silicon Valley, dry, ironic, self-deprecating). Then deliver:

### 1. Day 1 onboarding arc — full breakdown

What happens from "click Begin Career" through end of Day 1. Include:
- What does the player SEE (cinematic / animation / camera moves)?
- What does the player DO (quest list, in order)?
- Who does the player MEET (in what order, what do they each say)?
- What's the WIN condition for Day 1?

Be specific. Example: "After 'Begin Career', screen fades from black. The camera dollies down the OUTSIDE of the building, morning light, you see silhouettes of NPCs already at their desks through frosted windows. Camera cuts to a close-up of the player's hand holding a keycard, swipes it, the door beeps, then cuts to first-person walking into the lobby. The first NPC you see is Janusz (he nods)."

### 2. First 7 days of quests — quest log content

One quest per line, max 7-10 quests for the first 7 days. Each quest has:
- `title` (1-4 words, action verb)
- `description` (1 short sentence, IT-flavored)
- `who` (NPC name)
- `howToComplete` (what the player clicks/does)
- `reward` (cash, stat, relationship)
- `chainsTo` (next quest)

### 3. NPC arc concept — one paragraph per NPC

For each of the 13 NPCs, one paragraph: what do they want from the player? what's their personality tics? what's their "side quest"? Who do they LIKE/DISLIKE among the other NPCs (so we can generate inter-NPC dialogue like "Marek tells Tomek: 'did you push to main again?'").

### 4. 10 random "office inter-NPC dialogue lines"

A line an NPC says to another NPC (visible as a floating bubble, NOT to the player). Format: "BARTEK -> MAREK: 'Your standup was 47 minutes long. The audience has left.'" Style: IT Crowd / The Office / Silicon Valley. Real office tensions — Marek slacking, Klaudia bragging on LinkedIn, Tomek asking Pawel for help, Janusz knowing things, Ania asking Maciek to 'promote' her webinar, etc.

### 5. Day-end summary "fun facts" concept

Right now the day summary shows income/expenses. Add 2-3 fun stat lines per day, like:
- "Conversations overheard: 14"
- "Times you were @here'd on Slack: 3"
- "Coffee cups consumed: 4"
- "Times someone said 'circle back': 2"
- "Tomek pushed to main: 1 (Yikes)"

Suggest 8-10 fun fact categories the player would enjoy seeing each day.

## Style reminder

- IT Crowd + Silicon Valley + The Office (US/UK)
- Self-aware meta-jokes about IT culture
- Polish IT-folk experience (this is a Polish-flavoured game with English copy)
- Long run-on sentences with parentheticals and em-dashes are OK in the dialogue
- Each NPC must feel distinct — emoji + first line of greeting should tell the player who they are

## Hard rules

- DO NOT write code
- DO NOT edit any files
- DO NOT commit or push
- Output a structured markdown response with the 5 sections above
- Be specific and concrete. Generic placeholders like "do training" are useless.

## Output

Just the markdown. I'll use it to design the implementation. Keep it to ~600-1000 lines of markdown — punchy and useful, not a 5000-line PRD.
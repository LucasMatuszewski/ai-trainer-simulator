# Lucas's full hackathon brief - captured verbatim-in-substance 2026-09-03 (night)

This document captures the WHOLE context Lucas gave before going to sleep on the night of 2026-09-03, so that nothing is lost. It is the source for the hackathon PRD, the ADR, and the night plan. Nothing here has been filtered or summarised away; where the agent has added an interpretation it is marked `[agent note]`.

## 0. Why this exists

Lucas created this game to enter the **WebMCP hackathon** run by OpenAI, Cloudflare, Vercel, Google and others:
- https://openai.com/pl-PL/webmcp-challenge/
- https://webmcp.devpost.com/

**~19 hours left** at the time of writing, and it is night, so Lucas is going to sleep. He wants autonomous night work to speed things up and be ready tomorrow. The hackathon exists to show off **WebMCP capabilities**; the linked pages describe the requirements.

He also wants to enter the **MiniMax contest with GMI Cloud** (https://www.gmicloud.ai/minimax-week#submit). Prizes are much lower, but most of this game was built with **MiniMax M3**, and the **music and TTS models also came from MiniMax**, so applying makes sense. That deadline is **2026-09-06**, so there is more time for it.

## 1. Honest assessment of the current state (Lucas's words, paraphrased minimally)

The game is nice visually, has quite well polished UX and controls, and is funny, BUT:

1. **It has no challenge.** Nothing makes it playable or enjoyable. It is just a tech demo, a simulator of an office, not a game yet. No real advanced game mechanics.
2. **The WebMCP implementation is very basic** - just a couple of tools to control the game by the agent.

## 2. Branding / credentials (Edukey + DevPowers)

Goal: impress judges AND make the game a promotional tool for **Edukey** and **DevPowers** (Lucas's two brands).

- Add credentials: **both companies' logos + links**, mentioned somewhere in the game.
- IMPORTANT constraint: do NOT present them as "the companies where we work", because the game deliberately shows a rather unprofessional company where people complain - that is what makes it funny. **We are the creators, not the simulated employer.**
- Placement A: both logos at the **bottom of the starting screen**, with links.
- Placement B: logos **in the reception, on the wall between reception and the main office**, so the player sees them when entering the game but they are not pushed at the player again later.

## 3. Deeper dialogues, real quests, real challenge

- **Dialogues must be deeper and more advanced.**
- **Challenges must be real.** A quest must not end the same moment it starts. Example of the current broken behaviour: the training contract quest is immediately done and the cash lands on the account.
- Instead: the player should have to **go to the training room** and **simulate the training with people from outside the company** - possibly as a funny test where participants ask hard questions or create hard situations, and the player has to make the right decisions (same mechanic as dialogues). Outcomes branch:
  - good decisions -> **cash + credibility**,
  - mediocre -> **cash only**,
  - bad -> **no cash and lost credibility**.
- **Fatigue / coffee loop:** the player should get tired after work and need coffee.
  - Some **equipment must be clickable**, with a **label on hover** (same as NPCs already have).
  - The player walks to the kitchen and makes a coffee, ideally with a **cutscene or animation** and the **sound of the coffee maker**, to gain focus back. Coffee level goes up.
  - If the **coffee level is too high**, focus drops hard and the dialogue options become stupid - like a person on speed / caffeine overdose. Something funny.
- Other actions may be needed for other quests, to make the game harder and to demand that the player plays **real mini-games inside the game** to finish tasks assigned by NPCs.
- Quests should come **not only from the senior consultant** - other people can hand out quests later too.

### Quest ordering and tutorial

- The **first quest should be to talk with Renata at the reception**, not Bartek directly.
- The player needs a **tutorial** first - but without knowing the basics they will not even know how to reach Renata. So show **very basic controls immediately**: on the start screen or in a modal - at minimum **WSAD**, **right mouse hold**, and **click to talk**.
- After Renata, the **Bartek quest** follows.

### Quest failure

- Quests may **fail** if not completed in time, or if completed in the wrong way.

### Other challenge ideas

- **Debugging with the junior developer**: mentoring inside the console. The debugger and the code being debugged must **make sense** - Lucas is not sure the current code even contains real bugs. Right now the player just talks to the junior; ideally the **terminal shows during the conversation** as part of the conversation about debugging the junior's code.
- **Training materials preparation**: to be figured out. Probably uses a **computer**, and then a **printer in the reception**.

### The player needs a desk and a computer

- The player needs a **computer** and a **desk**.
- Idea: add new desks **connected back-to-back with existing desks** in the main office - e.g. on the other side of Janusz and the junior dev, add 2 new desks for the player, usable by them.
- Somebody should **tell the player where their desk is** - a real onboarding, done in a funny way, explaining the basics, the goal of the game, and what the challenge is. Something to make the game interesting.

## 4. NPC depth fixes

Make some NPC dialogues more realistic and show depth:

- **Janitor Janusz**: he has a **fleet of bots** and has worked as a de-facto engineer for years, but is still hired as a janitor to keep everything tidy - **including the code**. This explains why he has a desk and works with a computer. He is not a normal janitor.
- **CEO**: his desk has **drawers on the other side**, where the player stands. Instead of fixing this, the CEO asks the player to pass him a document from a drawer - e.g. an **NDA to sign**. The CEO explains that this is exactly why the drawers are on that side, so he can just tell people to take something out. He calls it **automation**, or **carbon-automation** - something funny to play around with these "wrong"-side drawers, which are not an accident and not wrong at all.

## 5. Audio

- Some **TTS audio needs regenerating**: it should be **faster**; many current files are too slow.
- **Background music has already been generated** and can be used: for the intro, for cutscenes, or as background. For background use it should be **without lyrics**.

## 6. WebMCP - the actual contest centrepiece

**Current state:** very basic, just a couple of tools to control the game.

**Target (Lucas's first idea, open to better ones):**
- The WebMCP integration should let **our AI agent play alongside us as a second character** that we can ideally talk to.
- It could **show options** and maybe **write questions and answers on the go**: i.e. expose a WebMCP tool where the agent passes dialogues and options as arguments.
- This yields a **totally personalised LLM-based character** in the game that **costs us nothing**, because the user must use the ChatGPT browser with WebMCP support (or similar technology), so **ChatGPT generates the LLM character's dialogues and options**.
- This agent player should be **activated by the agent**, and then **show up in the game**, maybe as a **robot character**: same mesh with different textures (ideal, better for performance) or a unique new mesh.

**Next step on the roadmap (rather not tomorrow, but maybe by 2026-09-06): simple online multiplayer.**
- Ability to **create rooms**, invite people with a **code / room id**, up to **4-5 people or agents** joining and playing together with the same mechanics.
- Maybe a **ranking** in cash and stats. Something to figure out.
- This would be a much better demo of WebMCP capabilities and could impress judges. Not sure if feasible for tomorrow - **something to analyse**, including whether there are ready-to-use three.js libraries for this (Lucas believes yes) and how hard it may be. **Maybe it should be the highest priority and easier than expected.**
- Not even sure whether a server with websockets is needed, or whether it could be **pure p2p**.

## 7. Deployment

- We need to deploy it.
- To get the judges' attention we should probably use **Vercel hosting** (not Lucas's Coolify) and **Cloudflare** (e.g. CDN, and maybe Workers for WebMCP / MCP / functions / tools / multiplayer) - **to analyse and decide**. We need the fastest option.
- Our **domains are already on Cloudflare**, so we can use them.
- Publish under **devpowers.com**, maybe as a subdomain with a separate DNS entry pointing to Vercel. Today that domain points to the Coolify server, where Traefik routes traffic to the devpowers.com landing pages.
- Subdomain naming: something funny and short - Lucas floated `under.devpowers.com`, or maybe just `game.` or `play.` - **to discuss, more ideas welcome**.

## 8. Process Lucas asked for

1. First make a **new PRD** and discuss the details (use the `/write-a-prd` skill, ask more questions).
2. Then discuss the **technical decisions with an ADR**.
3. Then create a **plan**.
4. Then work **autonomously on part of that plan**, after prioritising for tomorrow's launch.
5. Write a document with the **whole context** provided (this file), so that none of the ideas or thoughts are missed. It could be saved immediately.

Existing sources of answers and earlier ideas: `docs/PRD.md`, `docs/ADR/`, `docs/plans/`, and the feedback index `docs/LUCAS-FEEDBACK-INDEX.md` (some already applied).

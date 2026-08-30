# 30-Day Quest Chain — Full Career Arc (AI Trainer Simulator)

> Deliverable of `.agent-briefs/thirty-day-questline.md`. Pure design content, no code.
> Employer: **Stack Underflow**. Cast: 13 NPCs. Player stats: **credibility / caffeine / patience / focus**.
> Money in zł. One quest card per day. Conversation modes per D-17: 1-on-1, meeting, standup, classroom, client-call.
> Tone: IT Crowd × Silicon Valley, dry as a sprint retro with no snacks.

## Chapter map (the 30-day shape)

| Chapter | Days | Working title | Emotional arc |
|---|---|---|---|
| 1 | 1–7 | "Survive Week 1" | Panic → belonging. They learn your name; the dog tolerates you. |
| 2 | 8–14 | "Survive Sprint 1" | Task-taker → project owner. Delivering is 20% code, 80% meetings about the code. |
| 3 | 15–21 | "The Incident" | Owner → leader. Incidents are people, not code. The crisis costs patience, buys trust. |
| 4 | 22–28 | "Earn Your Stripes" | Leader → fixture. Promoted, hiring, public, client-facing. From surviving the system to shaping it. |
| 5 | 29–30 | "Best In The Galaxy" | Fixture → legend. The choice that defines Chapter 2, and a hook in a plant. |

Continuity anchors already canon: the ACME Corp contract ("JavaScript for Excel People"), the printer broken since 2019 ("Marek's coffee maker"), Bartek's "do not become a PM" warning, Kasia calling everyone "talent", Maciek's AI pivots, Przemek's "circle back", Tomek's Friday push to main, 400 zł day-one pay.

Card fields: **Objective / Who / Mode / Where / Reward / Complication / Fail state / Fun fact / Bridge**.
"Fail state" is what happens on the worst dialogue pick — never a game-over, always a story tax. "Fun fact" is the day-end summary line (per the day-summary concept in the onboarding brainstorm).

## Quest chain at a glance (for the quest log table)

| Day | Title | Who | Mode | Flag on completion |
|---|---|---|---|---|
| 1 | Press Any Key To Begin | bartek | 1-on-1 | `d1-contract` |
| 2 | The Standup Shall Make You Free | zosia, klaudia | standup | `d2-standup` |
| 3 | Copy, Paste, Pray | tomek | 1-on-1 | `d3-mentored` |
| 4 | Excel With Violence | free | solo | `d4-first-training` |
| 5 | The Dog Ate My Budget | grazyna, burek | 1-on-1 | `d5-expenses` |
| 6 | Do Not Touch Prod | marek | 1-on-1 | `d6-access` |
| 7 | Week One: Zero Fatalities | zosia | 1-on-1 | `d7-review` |
| 8 | Sprint Planning: The Ritual | bartek+3 | meeting | `d8-planned` |
| 9 | Scope Creep Says Hello | przemek+kasia | client-call | `d9-scope` |
| 10 | The Cursed Video Player | tomek | classroom | `d10-player` |
| 11 | The Intern Who Knew Too Much | pawel | classroom | `d11-shadowed` |
| 12 | Synergy Webinar: The Prequel | ania | 1-on-1 | `d12-webinar` |
| 13 | Talent, Reviewed | kasia | 1-on-1 | `d13-review` |
| 14 | Demo Day, Or The Reckoning | maciek+3 | meeting | `d14-demo` |
| 15 | Friday, 16:55 | tomek | 1-on-1 | `d15-ledge` |
| 16 | The War Room | zosia+3 | meeting | `d16-response` |
| 17 | The Backup Of Theseus | marek | 1-on-1 | `d17-restore` |
| 18 | Blameless (*) | zosia | 1-on-1 | `d18-postmortem` |
| 19 | The Client Is Always Angry | przemek+tomek | client-call | `d19-apology` |
| 20 | Roadmap To Sanity | free | solo | `d20-roadmap` |
| 21 | Night Shift | janusz | 1-on-1 | `d21-deploy` |
| 22 | Career Conversation :) | zosia | 1-on-1 | `d22-promotion` |
| 23 | Hire Your First Junior | kasia | meeting | `d23-hire` |
| 24 | Personal Brand... | klaudia | 1-on-1 | `d24-slides` |
| 25 | The Main Stage | audience | meeting | `d25-talk` |
| 26 | Onsite: ACME Tower | przemek | client-call | `d26-onsite` |
| 27 | The Man Who Pivoted Too Much | maciek | 1-on-1 | `d27-pivot` |
| 28 | Retro, Dog, And 4,000 | everyone | meeting | `d28-retro` |
| 29 | The Fork In The Career Road | maciek+3 | meeting | `d29-path` |
| 30 | Best In The Galaxy | everyone | cinematic | `d30-galaxy` |

---

## Chapter 1 — Days 1–7: "Survive Week 1" (onboarding)

The player arrives as a nobody with a keycard that opens every door except the one they need. By Friday they have a contract, a desk, a nemesis printer, and a dog that occasionally lets them pet it. The growth here is small and human: the office stops being a room full of strangers and starts being "my circus, my monkeys."

### Day 1 — "Press Any Key To Begin"

- **Objective:** Swipe in, find your desk, talk to Bartek, and accept the ACME contract ("JavaScript for Excel People"). Do not mention you Googled half the stack yesterday.
- **Who:** Bartek (Janusz nods at you once in the hallway — this is the highest praise he gives).
- **Where:** Main office.
- **Reward:** +400 zł, +10 credibility, +5 relationship Bartek, quest chain started.
- **Complication:** Kasia ambushes you with onboarding paperwork and calls you "talent" four times before lunch. The HR system lists your start date as "TBD (2019?)".
- **Fail state:** Tell Bartek you "have a Stack Overflow account, so basically qualified" — he deducts 5 relationship and upgrades your contract with a clause about "attitude remediation."
- **Fun fact:** "Doors your keycard opened: 7. Doors it should have opened: 1."
- **Bridge to next:** Bartek mentions standup is tomorrow at 9:47. "Zosia counts attendance. Zosia always counts."

### Day 2 — "The Standup Shall Make You Free"

- **Objective:** Survive Zosia's standup (agenda: "align" — it does not say on what), then endure Klaudia's LinkedIn pitch about your onboarding.
- **Who:** Zosia, then Klaudia.
- **Mode:** STANDUP — Zosia, Bartek, Marek, Tomek. 47 minutes. Blockers: the printer. The printer is always a blocker.
- **Where:** Meeting room.
- **Reward:** +50 XP, +5 relationship Zosia, patience −5.
- **Complication:** Klaudia asks you to like her synergy post — publicly, in front of everyone, while maintaining eye contact.
- **Fail state:** Say the standup "could have been an email." You are correct. You are also now the scribe, forever. +1 fun-fact counter: "Meetings you made worse: 1."
- **Fun fact:** "Minutes spent 'aligning': 47. Alignment achieved: none."
- **Bridge to next:** Zosia assigns you an onboarding buddy: Marek. Marek does not look up. This is also praise, in its way.

### Day 3 — "Copy, Paste, Pray"

- **Objective:** Mentor Tomek. He has been stuck since Tuesday on a bug that is, in fact, a typo in an environment variable name. Show him the Stack Overflow link you used. Pretend you knew it by heart.
- **Who:** Tomek.
- **Where:** Main office (Tomek's desk, where the ramen incident of legend once occurred).
- **Reward:** +75 zł, +10 relationship Tomek, +5 credibility, +100 XP.
- **Complication:** Fixing his bug reveals a second bug. And a third. It's turtles all the way down and every turtle is named `temp_final_v2_REAL`.
- **Fail state:** Fix it FOR him while he watches. Quest completes, but Tomek learns nothing and Day 15 gets 10% harder (hidden flag `tomek-unmentored`).
- **Fun fact:** "Stack Overflow tabs opened: 14. Tabs that helped: 2. Tabs that were your own question from 2024: 1."
- **Bridge to next:** Tomek, relieved: "Good news, the client demo is Friday. Bad news, nobody has told the client there is no demo."

### Day 4 — "Excel With Violence"

- **Objective:** Deliver your first training session: "JavaScript for Excel People" to ACME Corp. Three slides, one heckling manager, zero working clickers.
- **Who:** Free (solo performance; Janusz watches through the glass, nodding at the good parts).
- **Where:** Training room.
- **Reward:** +400 zł, +15 credibility, +150 XP, caffeine −20.
- **Complication:** ACME's middle manager thinks "the cloud" is a thing Microsoft owns and demands you "show them the AI." There is no AI. There has never been any AI. You improvise.
- **Fail state:** Say "AI is just statistics" to a room of managers. Technically true. Commercially fatal. ACME's follow-up budget halves (Day 14 reward −500 zł).
- **Fun fact:** "Times asked 'will this be in Excel': 6. Times you said 'yes' to survive: 6."
- **Bridge to next:** ACME wants a follow-up: "AI for Managers Who Fear AI." Bartek is thrilled. You are not.

### Day 5 — "The Dog Ate My Budget"

- **Objective:** Kitchen day: feed Burek (he has opinions about the schedule), submit your onboarding receipts to Grażyna, and do NOT fix the printer without Marek's blessing.
- **Who:** Grażyna (+ Burek, + the printer, spiritually).
- **Where:** Kitchen.
- **Reward:** +100 zł reimbursement, +10 relationship Grażyna, +10 relationship Burek, caffeine +15.
- **Complication:** Burek ate someone's lunch. That someone is Maciek. There will be an all-hands about it. There is an all-hands about everything.
- **Fail state:** Fix the printer without Marek. It works — for 4 hours — then prints one (1) page reading "WHY" on every tray. −10 relationship Marek, +1 legendary office story.
- **Fun fact:** "Burek's lunch crimes this week: 3. Victims: 2 (Maciek twice — he keeps using the same fridge shelf)."
- **Bridge to next:** Grażyna, off the record: the ACME invoice pays late. "Watch day 14. I always watch day 14."

### Day 6 — "Do Not Touch Prod"

- **Objective:** Marek grants you access: VPN, staging, and a README that says "figure it out." Ask three questions maximum. Choose them wisely.
- **Who:** Marek.
- **Where:** Main office (Marek's desk, guarded by the coffee-maker printer).
- **Reward:** +50 XP, +10 focus, +10 relationship Marek.
- **Complication:** You now have root on prod. Marek says only "don't." There is no temptation stat. The urge exists anyway.
- **Fail state:** Ask "what does this button do" about the admin panel. Marek revokes one access level as a teaching moment. You will be reminded of this on Day 16.
- **Fun fact:** "Questions asked: 3. Questions answered: 2. Answers that were just the word 'don't': 2."
- **Bridge to next:** Marek, almost smiling: "Sprint 1 starts Monday. The platform has... history." He does not elaborate. He never elaborates.

### Day 7 — "Week One: Zero Fatalities"

- **Objective:** Week 1 review with Zosia. She wants numbers: cashflow, relationships, and whether the printer is still broken. Bring numbers. The printer answer is "yes."
- **Who:** Zosia.
- **Where:** Meeting room.
- **Reward:** +200 zł bonus, +10 credibility, +5 relationship Zosia, +100 XP.
- **Complication:** Klaudia posts about "our amazing new talent 🚀" with a photo of you mid-sneeze. The post outperforms her synergy content. She is conflicted.
- **Fail state:** Tell Zosia the week went "fine, I guess." The word "fine" triggers a 4-minute follow-up questionnaire. Patience −10. Never say "fine" to a manager.
- **Fun fact:** "Week 1: 0 pushes to main, 1 printer untouched, 1 dog befriended. Statistically your best week ever."
- **Bridge to next:** Zosia slides a tablet across the table: "Sprint 1. The ACME Academy platform. You're leading it." Week 1 ends. Imposter syndrome does not.

---

## Chapter 2 — Days 8–14: "Survive Sprint 1" (first project)

The player graduates from taking tasks to owning a project end-to-end: scope, legacy code, an intern, marketing, HR, and a demo. Every win is immediately complicated by a new vector of chaos entering the frame. The emotional arc is the discovery that "done" is a negotiation, not a state.

### Day 8 — "Sprint Planning: The Ritual"

- **Objective:** Sprint planning for ACME Academy (the e-learning platform for ACME's Excel people). Estimate tickets that do not exist yet, using a template Zosia describes as "vibes."
- **Who:** Bartek, Zosia, Marek, Tomek.
- **Mode:** MEETING — planning poker with cards Marek printed in 2019 and laminated. All cards say "3".
- **Where:** Meeting room.
- **Reward:** +100 XP, +5 relationship with all four attendees.
- **Complication:** Tomek estimates "1 day" for the video player. Marek makes a sound no human should be able to make. The estimate stands.
- **Fail state:** Volunteer to "just do the tickets myself." Congratulations: you are now the ticket writer, forever, in every sprint, until the heat death of the backlog.
- **Fun fact:** "Tickets created: 0. Tickets debated: 34. Cards laminated in 2019: 34. Suspicious."
- **Bridge to next:** Przemek appears with "great news." In sales, "great news" is a weather warning.

### Day 9 — "Scope Creep Says Hello"

- **Objective:** Client call with Przemek. ACME's "Digital Transformation Officer" (played with terrifying realism by Kasia, who has read their org chart) wants "a Netflix, but for Excel, but also AI, by Friday."
- **Who:** Przemek + client (Kasia plays the client).
- **Mode:** CLIENT-CALL — Przemek opens, you negotiate, Przemek says "circle back" to delay the awkwardness.
- **Where:** Meeting room.
- **Reward:** +300 zł budget increase, +10 relationship Przemek, patience −10, +5 focus.
- **Complication:** You negotiate the scope down to one login page and a video player. Przemek calls this "a win-win-win." Nobody locates the third win.
- **Fail state:** Say "yes" to the Netflix-but-AI scope. Grażyna appears (fastest she has ever moved) with a printout of your hourly worth. Budget −300 zł, credibility −5, and the scope shrinks anyway.
- **Fun fact:** "Client 'must-haves' at call start: 11. At call end: 2. Everything is negotiable except the vibe."
- **Bridge to next:** The video player must now exist. Marek says there's "an old one" in the repo. There is. It's cursed.

### Day 10 — "The Cursed Video Player"

- **Objective:** Pair-program with Tomek on the 2019 legacy player. It predates the printer. It predates hope. Get it to play one video without summoning anything.
- **Who:** Tomek.
- **Mode:** CLASSROOM (pair-programming) — you drive, Tomek navigates, the codebase fights back.
- **Where:** Main office (your desk, for proximity to the good monitor).
- **Reward:** +150 zł, +15 relationship Tomek, +10 focus, +150 XP.
- **Complication:** The player only works in a browser nobody has installed. Marek refuses to explain why. At some point he says "you'll see" and walks off. You never see.
- **Fail state:** Refactor it "while you're in there." The player now works in zero browsers. Rollback costs the afternoon and one (1) of Tomek's remaining illusions about seniors.
- **Fun fact:** "Legacy lines read: 400. Legacy lines understood: 90. Legacy lines that are commented 'DO NOT TOUCH (I mean it)': 3, all touching the bug."
- **Bridge to next:** Pawel the intern has questions. Eleven of them. All excellent. All unpaid.

### Day 11 — "The Intern Who Knew Too Much"

- **Objective:** Let Pawel shadow you for a day. Teach him "how to estimate" — nobody can, teach him anyway. Warn him about prod. Warn him about Friday.
- **Who:** Pawel.
- **Mode:** CLASSROOM (mentoring) — the lesson is estimates; the curriculum is humility.
- **Where:** Training room (Bartek says using it for actual training is "a bold choice").
- **Reward:** +100 XP, +15 relationship Pawel, +5 credibility.
- **Complication:** Pawel finds a security hole in your login page. He is right. It stings in a way that feels like education.
- **Fail state:** Dismiss the finding because "it's a demo." Hidden flag `hole-ignored` set. It returns on Day 26, in front of the ACME board, with interest.
- **Fun fact:** "Pawel's questions: 11. Questions you answered with confidence: 4. Confidence-to-accuracy ratio: do not ask."
- **Bridge to next:** Ania from marketing saw the platform demo through the glass. She has IDEAS. Ideas, capitalized, are never good.

### Day 12 — "Synergy Webinar: The Prequel"

- **Objective:** Ania wants a co-hosted "synergy webinar" to promote the ACME Academy launch. Survive the planning meeting. Do not say the word "webinar" with disdain where she can hear you.
- **Who:** Ania.
- **Where:** Meeting room.
- **Reward:** +200 zł, +10 relationship Ania, +5 credibility.
- **Complication:** Klaudia joins and turns it into a live LinkedIn event. Attendance: three. One is Janusz. One is a bot. One is an account named "Burek S." that Burek evidently runs.
- **Fail state:** Pitch Ania "maybe less synergy, more product." She agrees, sadly, and the marketing budget quietly halves. The launch will be promoted by hope alone.
- **Fun fact:** "Webinar attendees: 3 (1 janitor, 1 bot, 1 dog). Engagement rate: technically infinite."
- **Bridge to next:** Kasia pings you: "Talent review tomorrow. Bring your smile. And your contract. Mostly the smile."

### Day 13 — "Talent, Reviewed" *(character moment: KASIA)*

- **Objective:** Your 1-on-1 "talent review" with Kasia. Answer where you see yourself in five years without saying "employed."
- **Who:** Kasia.
- **Where:** Kitchen (the only room without a booking system and therefore the only room with a soul).
- **Moment:** Kasia's backstory — she was rejected 47 times as a junior recruiter; not one rejection used the word "talent." She swore that everyone she ever recruited would hear the word on day one. "I'm not flattering you. I'm fixing an old bug in the industry."
- **Reward:** +200 zł raise, +5 credibility, +20 relationship Kasia.
- **Complication:** The HR system now lists you as "Paweł #2." You must prove you are not the intern. This takes longer than the review.
- **Fail state:** Joke that "talent is a social construct." Kasia writes it down. In the file. The permanent one. It resurfaces in your Day-22 promotion packet.
- **Fun fact:** "Times called 'talent': 9. Times you believed it: approaching 1."
- **Bridge to next:** Kasia, conspiratorial: "Big demo Friday. Maciek is bringing 'investor friends.'" They are his run club. They are worse.

### Day 14 — "Demo Day, Or The Reckoning"

- **Objective:** Sprint 1 demo to ACME plus Maciek's "investor friends." Show the login page, play one video, do not acknowledge the cursed browser requirement.
- **Who:** Bartek, Zosia, Maciek + client.
- **Mode:** MEETING — demo theater. Zosia narrates, you drive, Maciek says "scale" nine times.
- **Where:** Meeting room.
- **Reward:** +1,000 zł, +25 credibility, +10 relationship Maciek, +200 XP.
- **Complication:** The demo environment dies 8 minutes before showtime. Marek revives it with a glare and one command nobody else sees. He denies this forever.
- **Fail state:** Mention the cursed browser out loud. The client's IT lead asks which browser. You say the name. The room goes quiet. −10 credibility, +1 question you will answer quarterly forever.
- **Fun fact:** "Times Maciek said 'scale': 9. Times anyone defined it: 0. The word has lost all meaning. It never had any."
- **Bridge to next:** Maciek says the five words that chill the spine: "We should discuss AI integration." Tomorrow is Friday. Everything is fine.

---

## Chapter 3 — Days 15–21: "The Incident" (mid-arc crisis)

The sprint's victory lap becomes the industry's oldest joke with a timestamp: Friday, 16:55, push to main. The player stops being a person who delivers work and becomes a person who leads people through fire. The crisis chapters spend patience and pay back in credibility, trust, and the uncomfortable discovery that the team is the product.

### Day 15 — "Friday, 16:55"

- **Objective:** Tomek pushed to main at 16:55. The deploy wiped the demo database and auto-emailed 4,000 ACME employees a message reading "TEST TEST TEST hello?". Talk him off the ledge. Do not let him "quick-fix" it live. NEVER let him quick-fix it live.
- **Who:** Tomek.
- **Where:** Main office (everyone else has sensibly gone home).
- **Reward:** +150 XP, +10 relationship Tomek, +5 patience (somehow).
- **Complication:** Przemek already told the client "everything is stable." Klaudia already posted "proud of the team's flawless launch 🚀". The post is aging like milk in the sun.
- **Fail state:** Let Tomek quick-fix it live. The quick-fix emails a SECOND wave: "SORRY ABOUT THE PREVIOUS EMAIL." The Day-16 war room now has a countdown and Grażyna in it.
- **Fun fact:** "Pushes to main on Friday: 1 (Tomek). Emails sent to ACME: 4,000. Dignity remaining: loading…"
- **Bridge to next:** War room, Monday, 9:00. Zosia's calendar invite has no agenda and a red background. Nothing good has ever had a red background.

### Day 16 — "The War Room"

- **Objective:** Lead the incident response. Assign blame to no one, fix order to everyone. Keep Zosia's timeline updated and Maciek away from the client.
- **Who:** Zosia, Bartek, Marek, Tomek.
- **Mode:** MEETING (war room) — one whiteboard, four opinions, zero chairs (standing is policy; standing is always policy).
- **Where:** Meeting room.
- **Reward:** +300 zł crisis pay, +20 credibility, patience −15, +200 XP.
- **Complication:** Maciek pivots mid-crisis: "This is actually a great AI story." Grażyna appears at the door and silently holds up a printout of what 4,000 emails cost. The number has more digits than expected.
- **Fail state:** Point at Tomek when Zosia asks "what happened." The room agrees with you and becomes worse for it: −20 relationship Tomek, and Marek stops sharing knowledge (flag `knowledge-hoarding` — Day 17 gets harder).
- **Fun fact:** "Incident duration so far: 62h. Chairs in war room: 0. Blame assigned: 0 (correct)."
- **Bridge to next:** The only clean restore is a 2019 backup. Only one man knows where it is. He has a mop and no calendar invites.

### Day 17 — "The Backup Of Theseus" *(character moment: MAREK)*

- **Objective:** Restore ACME Academy from the 2019 backup with Marek. Discover together that "the old one in the repo" and "the backup" have been quietly merging for years.
- **Who:** Marek.
- **Where:** Main office (the server closet that etiquette forbids naming).
- **Moment:** Marek's confession — he automated 90% of his job in 2019. The "coffee maker" printer is a cron job in disguise. He lives in fear that someone will find out, fire him, and the scripts will keep running without him. "I'm not 10x. I'm one guy with nine ghosts."
- **Reward:** +500 zł, +25 relationship Marek, +10 credibility, +200 XP.
- **Complication:** The backup restores the platform AND the Day-3 bug. Hello, old friend. You have missed exactly nothing.
- **Fail state:** Promise Marek "your secret's safe" and then mention the cron job in the war room. Marek hears everything. The printer stops making coffee. It was the only warmth it had.
- **Fun fact:** "Backups tested before today: 0. Backups that worked anyway: 1. Marek's ghost-scripts running right now: 9 (do not ask which)."
- **Bridge to next:** The post-mortem is tomorrow. Zosia says "blameless" with an asterisk you can hear.

### Day 18 — "Blameless (*)"

- **Objective:** Write the incident post-mortem. Blameless (*) — the asterisk is Maciek, who wants "root cause: human error," and the human has a name, and it rhymes with "Tomek." Defend the boy. Fix the process.
- **Who:** Zosia (Bartek silently slides you a draft titled "the real story" — it is perfect and unusable).
- **Where:** Meeting room.
- **Reward:** +200 zł, +15 credibility, +20 relationship Tomek, patience −10.
- **Complication:** Maciek suggests the actual long-term fix is "rewriting the platform in AI." Nobody knows what that means. Including Maciek. Especially Maciek.
- **Fail state:** Accept "human error" as the root cause. The post-mortem is filed in minutes, the deploy protections are never funded, and Day 21's deploy gets a hidden 25% failure window.
- **Fun fact:** "Root causes listed: 3 (all systemic). People blamed: 0. Maciek's 'AI rewrite' proposals tabled: 1 (a record low)."
- **Bridge to next:** The client wants "a call." In sales language, a call is never good. Przemek's face confirms it at 3 decimal places.

### Day 19 — "The Client Is Always Angry" *(character moment: TOMEK)*

- **Objective:** Client apology call. Przemek opens with sports small talk, you do the actual apologizing, the roadmap does the actual saving.
- **Who:** Przemek + client.
- **Mode:** CLIENT-CALL — Przemek says "let's take this offline" four times. Nothing goes offline. Everything stays extremely online.
- **Where:** Meeting room.
- **Moment:** After the call, in the kitchen — Tomek's backstory. His bootcamp taught patterns, not judgment: copy, paste, ship. He deploys on Fridays because "Friday is when I stop being scared of the code." Nobody ever sat with him before Day 3. "You were the first person who didn't just send me a link. You sent me a chair."
- **Reward:** +600 zł (client stays), +30 credibility, +10 relationship Przemek, +250 XP.
- **Complication:** The client will stay IF you deliver a "stability roadmap" by day 21 and present it at their HQ next week. Przemek calls this "a partnership deepening moment."
- **Fail state:** Let Przemek lead the apology. He apologizes for "any inconvenience that may have been experienced by stakeholders." The client's silence could freeze helium. −10 credibility, and the roadmap deadline moves up a day.
- **Fun fact:** "'Circle back': 2. 'Take this offline': 4. Things actually taken offline: the platform, briefly, last Friday."
- **Bridge to next:** Solo quest tomorrow: write the roadmap. Burek has volunteered (has been volunteered) as emotional support.

### Day 20 — "Roadmap To Sanity"

- **Objective:** Write the stability roadmap alone. Phases, owners, dates. Every date must be survivable and only one of them may be a lie (choose carefully).
- **Who:** Free (Burek provides moral support; the kitchen coffee provides +caffeine and mild regrets).
- **Where:** Main office (your desk) / kitchen (coffee loop).
- **Reward:** +300 zł, +10 focus, +100 XP, caffeine +10 (net, after the loop).
- **Complication:** Klaudia starts a live "transparency era" thread and tags the client. The client's CEO likes it. Nobody knows how to feel. Feelings are scheduled for Q3.
- **Fail state:** Fill the roadmap with dates you know are fiction (all lies, no spine). It reads beautifully, ships nothing, and Day 26's board asks you which one was the lie. They can tell. Boards can always tell.
- **Fun fact:** "Roadmap phases: 4. Phase names using the word 'stability': 4. Marbles: retained, barely."
- **Bridge to next:** Deploy window: tomorrow, 21:00. Janusz's shift starts at 20:00. This is not a coincidence. Nothing about Janusz is a coincidence.

### Day 21 — "Night Shift" *(character moment: JANUSZ)*

- **Objective:** The 21:00 fix deploy. You at the keyboard, Marek on-call (asleep), the office humming that particular server-room hum.
- **Who:** Janusz (Marek remotely, in spirit and in Slack read receipts).
- **Where:** Main office at night.
- **Moment:** Janusz's monologue while the deploy bar crawls — 19 years, three rebrands, two fires (one electrical). He knows where every cable goes and every secret lives. "The office at night tells the truth. Daytime is just theater." Then the best advice in the game: "Fix the system, not the boy. The boy is also a system."
- **Reward:** +800 zł, +30 credibility, +20 relationship Janusz, +250 XP.
- **Complication:** The deploy hangs at 90%. It always hangs at 90%. Marek, from his bed: "just wait." You wait. It works. Nobody applauds. That's the job.
- **Fail state:** Panic at 90% and cancel the deploy. It was 11 seconds from done. Marek's read receipt arrives on your cancellation message and says more than the entire dialogue system.
- **Fun fact:** "Deploys hung at 90%: 1. Minutes waited: 4. Applause received: 0. Growth: immeasurable."
- **Bridge to next:** A calendar invite lands at 22:47: "Career conversation :)" — from Zosia. The smiley is the scariest character in the game.

---

## Chapter 4 — Days 22–28: "Earn Your Stripes" (recovery + growth)

The incident made the player visible. Now the company keeps handing them bigger levers: a title, a hire, a stage, a client's boardroom. Each stripe is earned by giving something away — credit, comfort, or a Friday. The arc bends from "can I survive this?" to "who do I want to be in this?"

### Day 22 — "Career Conversation :)"

- **Objective:** Zosia offers the promotion: Senior Trainer / Incident Lead. It comes with "people duties" — Tomek's mentorship, formalized, in writing, with a budget line.
- **Who:** Zosia.
- **Where:** Meeting room.
- **Reward:** +1,500 zł, +25 credibility, title unlocked: **Senior Trainer**, +15 relationship Zosia, +200 XP.
- **Complication:** Bartek pretends not to be proud. He fails at pretending. It is, and the game engine will log this, "very sweet."
- **Fail state:** Negotiate "more money, fewer people duties." You get the money. The people get no duties. Day 23's hire becomes an orphan, and orphans push to main (see: Tomek, Day 15).
- **Fun fact:** "Career conversations survived: 1. Emoticons in calendar invites survived: 1. Sleep lost anticipating both: 3 nights."
- **Bridge to next:** The promotion comes with headcount: you may hire your first junior. Kasia has candidates tomorrow, and strong opinions about all of them.

### Day 23 — "Hire Your First Junior"

- **Objective:** Run the interviews with Kasia. Three candidates: one quotes "The Lean Startup" unprompted; one has never seen a keyboard (Maciek's run club connection); one is terrified and brilliant.
- **Who:** Kasia.
- **Mode:** MEETING (interview panel) — Kasia handles "culture add," you handle "can they actually do the job," the terrifying-brilliant one handles your heart.
- **Where:** Meeting room.
- **Reward:** +50 zł, +20 credibility, +20 relationship Kasia, hire flag set (the junior joins on Day 25, naturally, during your conference talk).
- **Complication:** Grażyna, at the door, with a spreadsheet: "Budget approved for 0.6 of a junior." You must find the other 0.4. Pawel volunteers.
- **Fail state:** Hire the Lean Startup quoter because "they interviewed well." Interview skills and deploy skills are different skills. Chapter 2 opens with your junior rebranding the backlog.
- **Fun fact:** "Candidates interviewed: 3. 'Disrupt' heard: 7 times. Keyboard located for candidate #2: eventually."
- **Bridge to next:** The conference accepted your talk. It is in 48 hours. You have no slides. Klaudia has slides. This is how horror begins.

### Day 24 — "Personal Brand Is Not A Dirty Word" *(character moment: KLAUDIA)*

- **Objective:** Slide surgery with Klaudia. Cut 40 slides to 12. Learn to "smile with your eyes." Submit the deck before she adds the rocket emoji.
- **Who:** Klaudia.
- **Where:** Main office (her ring light makes 11am look like a press conference).
- **Moment:** Klaudia's backstory — laid off in the 2022 crunch, mortgage, two-week-old daughter. The posts started as anonymous therapy; the algorithm rewarded the corporate mask; the mask paid the mortgage. "Nobody likes the posts, you know. They like the person the posts pretend I am."
- **Reward:** +20 credibility, +20 relationship Klaudia, +10 focus, slides upgraded to "actually good."
- **Complication:** Her rewrite of your title slide says "10x Trainer." You are not a 10x trainer. Yet. The word does something to you. Note it for Day 29.
- **Fail state:** Refuse the rebrand entirely, submit your 40 slides. The talk runs long, the room thins, and one attendee leaves a note: "slide 38 changed my life, unfortunately I missed 1–37."
- **Fun fact:** "Slides cut: 28. Rocket emojis added anyway: 1 (in the footer, where hope lives)."
- **Bridge to next:** Talk is tomorrow, 10:00, main stage. Burek cannot come. He is devastated (he is asleep).

### Day 25 — "The Main Stage"

- **Objective:** Deliver your conference talk: "How To Survive Your First Incident (And Mine)." Survive Q&A, including one planted hard question from a familiar silhouette in row 3.
- **Who:** Audience + panel (Bartek planted in the back; Tomek asks the hard one, because of course he does).
- **Mode:** MEETING (talk + Q&A) — the clicker dies on slide 2. You improvise. It goes BETTER than the slides.
- **Where:** Conference venue (event map: a stage, 200 chairs, one terrifying waterfall of sponsor logos).
- **Reward:** +2,000 zł speaker fee, +40 credibility, +10 patience (you found your rhythm), +300 XP.
- **Complication:** Your new junior's first day is TODAY, watching from the office stream, taking notes on everything, including the clicker failure. Especially the clicker failure.
- **Fail state:** Freeze when the clicker dies and wait for tech support (11 minutes). The audience sympathizes. The footage ends up on Klaudia's feed captioned "raw, authentic, iconic" — which is somehow worse than failing.
- **Fun fact:** "Clickers used: 2. Clickers that died: 2 (the spare was from 2019; everything here is from 2019)."
- **Bridge to next:** Przemek saw the talk and has "an opportunity." He said "circle back" and then — unprecedented — actually circled back. ACME HQ. You. Onsite.

### Day 26 — "Onsite: ACME Tower"

- **Objective:** Client onsite with Przemek. Present the stability roadmap to ACME's board. Real plants. Terrifying waterfall. A projector that costs more than your annual salary.
- **Who:** Przemek + ACME board.
- **Mode:** CLIENT-CALL (onsite) — Przemek's opening line: "Let's hit the low-hanging fruit first" (there is no fruit; there is a Gantt chart).
- **Where:** ACME HQ boardroom (offsite event map).
- **Reward:** +2,500 zł, +30 credibility, +15 relationship Przemek, +300 XP.
- **Complication:** The board asks "can it be AI?" Przemek, instantly, without blinking: "It already is." You have until Thursday to make this true.
- **Fail state:** If Day 11's `hole-ignored` flag is set: the board's security lead found the hole too, and presents it as a slide. Your roadmap dies in the waterfall. −20 credibility. Pawel's ghostly "I did try to tell you" plays as a kitchen flashback.
- **Fun fact:** "Waterfalls in the lobby: 1 (real). Waterfalls of sweat: classified. 'Low-hanging fruit' referenced: 5 (still no fruit)."
- **Bridge to next:** Back home, Maciek heard about the AI question and is SO excited he has booked a 1:1 tomorrow. In the CTO office. With a whiteboard. God help us all.

### Day 27 — "The Man Who Pivoted Too Much" *(character moment: MACIEK)*

- **Objective:** Maciek's 1:1 in the CTO office. Hear the pitch. See the whiteboard. Resist the whiteboard.
- **Who:** Maciek.
- **Where:** CTO office.
- **Moment:** Maciek's confession — he pivots to AI every three days because he read a study that CTOs who don't pivot get replaced by AI, and he is scared. "Scale" is his mantra because the company never scaled and he fears it's his fault. He was a good dev once. Management ate him. He knows. He let it.
- **Reward:** +500 zł "AI innovation budget", +10 credibility, +10 relationship Maciek.
- **Complication:** He wants "the AI feature" live by Day 30. You have three days. It ships as a rule-based autocomplete. Maciek will call it "the model." Let him. Pick your battles.
- **Fail state:** Tell Maciek "the model is an autocomplete" to his face. True. Insane. Budget −500 zł, and Maciek spends Day 30's gala explaining transformers to the caterer.
- **Fun fact:** "Whiteboard squares labeled 'AI': 11. Squares that contain a plan: 1, and it's autocomplete."
- **Bridge to next:** Tomorrow is the team retro. Ania has prepared "a surprise." Corporate history recommends fleeing the county.

### Day 28 — "Retro, Dog, And The Number 4,000" *(character moment: PAWEL)*

- **Objective:** Sprint retro + team lunch. Ania's surprise is the office's first-ever "Win Wall" — laminated certificates for everyone, including Burek ("Chief Bark Officer"). Accept your certificate. Do not cry at work. (Crying at work is Day 30 content.)
- **Who:** Everyone (Ania hosts; Grażyna caters; Burek accepts his award on all fours).
- **Where:** Main office / kitchen.
- **Moment:** Pawel's reveal — since Day 11 he has been quietly closing the security holes he found, all of them, annotated, in a doc he never showed anyone because "interns don't get to have findings." Your hire from Day 23 has a mentor. It's Pawel. The intern is mentoring the junior. The circle of life is a Jira board.
- **Reward:** +1,000 zł project bonus, +10 relationship with everyone, patience +20 (a rare refill), +200 XP.
- **Complication:** Bartek's certificate reads "Best Mentor." He puts it on his desk facing the room. So that's where you get it from.
- **Fail state:** Skip the retro to "catch up on tickets." The tickets will wait. The Win Wall won't: −10 relationship with everyone, and Burek eats your certificate. It's nothing personal. It's laminated.
- **Fun fact:** "Certificates issued: 13. Certificates chewed: 1. Number 4,000: mentioned 0 times, thought about 4,000 times."
- **Bridge to next:** Grażyna's spreadsheet has a row highlighted red: "day 29: ???" — and an all-hands invite from Maciek titled "THE FUTURE."

---

## Chapter 5 — Days 29–30: "Best In The Galaxy" (endgame, Chapter 1 finale)

Thirty days in, the player is no longer surviving the industry; the industry is asking them what it should become. Day 29 hands them the pen. Day 30 closes Chapter 1 with everything the arc has earned — every NPC, every running gag, every relationship — and one hook, in a plant, for Chapter 2.

### Day 29 — "The Fork In The Career Road"

- **Objective:** Maciek's all-hands: Stack Underflow is going "AI-first training" (he has said this before; this time there is a slide deck, so it's real). Afterward, he offers YOU three doors. The choice defines Chapter 2:
  1. **MANAGEMENT** — take Zosia's track (she's moving up; the calendar smiled at last). Lead the team.
  2. **PRINCIPAL** — Bartek's blessing. Become the top consultant: the best trainer in the galaxy, properly, with a title and a war story.
  3. **FOUNDER** — start your own training studio. Stack Underflow becomes your first client. Janusz slips you the number of a good accountant. It's Grażyna, moonlighting.
- **Who:** Maciek (framing), Zosia, Bartek, Janusz (unofficially).
- **Where:** CTO office / meeting room.
- **Reward:** +3,000 zł retention bonus (any path), +20 credibility, career-path flag set, +300 XP.
- **Complication:** Whichever door you pick, someone is disappointed and someone is proud, and they are never the people you expect. (Pick FOUNDER and Bartek's "Best Mentor" certificate faces the wall for a full day.)
- **Fail state:** Ask Maciek for "a few days to think." There are no fail states left, only doors. He respects it. The slide deck does not: 40 more slides arrive overnight.
- **Fun fact:** "Career paths offered: 3. Sleep had while deciding: 0. '10x Trainer' title from Day 24 whispering in your ear: still there."
- **Bridge to next:** Day 30: the "Best in the Galaxy" gala. It's the meeting room with fairy lights. Ania is responsible. It's perfect.

### Day 30 — "Best In The Galaxy" *(Chapter 1: END)*

- **Objective:** The closing cinematic. The gala. The GALAXY AWARD — a Burek-shaped trophy, 3D-printed by Pawel (who found a printer that works; the irony is noted by everyone, especially Marek). Speeches: Bartek is dry, Zosia brings numbers, Klaudia posts, Tomek pushes nothing to main, Marek's cron job sends congratulations automatically at 21:00 sharp, Janusz nods. Kasia hands you the award and says only: "Told you you were talent."
- **Who:** Everyone. All 13. Yes, the printer gets a title card. Yes, it's still broken.
- **Where:** Meeting room, fairy lights, one suspiciously professional snack wall (Grażyna found the budget).
- **Reward:** +5,000 zł, +100 credibility, achievement: **BEST IN THE GALAXY**, NG+ stats carry over, Day-29 path cinematic plays.
- **Complication:** At 23:00, as the fairy lights go dark, an email arrives from an unknown client: "We need the best trainer in the galaxy. Burner phone in the plant. — V." The plant is new. The plant was not there on Day 29.
- **Fail state:** None. There is no failing the gala. There is only the plant, and the phone, and whatever Chapter 2 decides to do with your remaining patience.
- **Fun fact:** "Days survived: 30. Pushes to main: yours 0, Tomek's 1. Printer status: unchanged since 2019. Galaxy status: best."
- **Bridge to next:** **TO BE CONTINUED — Chapter 2 (Days 31+): "The Client Who Cannot Be Named."**

---

## Character moments index (7 assigned days)

| Day | NPC | The reveal | Why it lands there |
|---|---|---|---|
| 13 | Kasia | 47 rejections; "talent" is a bug fix for the industry | Mid-sprint calm, before demo stress |
| 17 | Marek | Nine ghosts; the 10x engineer is one guy and a cron | In the crisis, restoring the past |
| 19 | Tomek | Copy-paste is fear; "you sent me a chair" | The apology day — his lowest hour |
| 21 | Janusz | The office at night tells the truth | Only possible at the night deploy |
| 24 | Klaudia | The mask pays the mortgage | Before the player takes a stage of their own |
| 27 | Maciek | Pivots are panic; management ate him | Right before his biggest pivot (Day 29) |
| 28 | Pawel | "Interns don't get to have findings" | The arc's pay-off: intern becomes mentor |

Coverage rule satisfied: all 13 NPCs appear across the 30 days (see checklist below); the 7 deep cuts are spread one per chapter-half so no week is backstory-dense.

## Multi-NPC quests index (7 assigned days, modes per D-17)

| Day | NPCs | Mode | Setup |
|---|---|---|---|
| 2 | Zosia, Bartek, Marek, Tomek | STANDUP | The 47-minute alignment ritual |
| 8 | Bartek, Zosia, Marek, Tomek | MEETING | Sprint planning with laminated "3" cards |
| 10 | Tomek | CLASSROOM (pair) | Pair-programming the cursed player |
| 16 | Zosia, Bartek, Marek, Tomek | MEETING (war room) | Incident response, zero chairs |
| 19 | Przemek + client (Kasia voice) | CLIENT-CALL | The apology call |
| 25 | Audience, Bartek, Tomek | MEETING (talk + Q&A) | The main stage |
| 26 | Przemek + ACME board | CLIENT-CALL (onsite) | The boardroom roadmap |

(Day 11's Pawel classroom and Day 23's interview panel also run multi-NPC logic but stay 1-lead-1-guest in feel; they're conversationally cheap.)

## NPC coverage checklist (13/13)

- **bartek** — days 1, 2, 8, 14, 22, 25, 28, 30
- **klaudia** — days 2, 12, 20, 24, 25, 28, 30 *(moment: 24)*
- **marek** — days 2, 6, 8, 10, 14, 16, 17, 21, 30 *(moment: 17)*
- **zosia** — days 2, 7, 8, 14, 16, 18, 22, 30
- **pawel** — days 10 (bridge), 11, 23, 28, 30 *(moment: 28)*
- **kasia** — days 1, 12 (bridge), 13, 19 (voice), 23, 30 *(moment: 13)*
- **tomek** — days 2, 3, 8, 10, 15, 16, 18, 19, 25, 30 *(moment: 19)*
- **ania** — days 12, 27 (bridge), 28, 30
- **janusz** — days 1, 12 (attendee), 19 (background), 21, 29, 30 *(moment: 21)*
- **burek** — days 5, 20, 24, 28 (CBO award), 30 (trophy model)
- **grazyna** — days 5, 16, 23, 28, 29 (the accountant reveal), 30
- **maciek** — days 5 (lunch victim), 13 (bridge), 14, 16, 18, 26 (bridge), 27, 29, 30 *(moment: 27)*
- **przemek** — days 9, 15 (complication), 19, 25, 26, 30

## Economy & balance notes (for implementation)

- Cash curve: ~2,175 zł in week 1, ~3,000 zł week 2, ~2,900 zł week 3 (crisis pay, not bonuses), ~10,750 zł week 4 (promotion, talk, onsite, gala). Day 30 total ≈ 24,000 zł + path bonus — enough that Grażyna's Day-28 "we're not on fire" line is mathematically earned.
- Patience is the crisis currency: −30 across Days 15–21, refilled +20 on Day 28. The dip IS the chapter's mechanic.
- Caffeine spends on performances (Days 4, 25, 26) and refills in the kitchen (Days 5, 20) — the coffee loop is a real loop.
- XP: ~300/week in Chapter 1, ~600/week mid-game, ~800/week in Chapter 4. Level-ups land on Days 7, 14, 21, 28 — one per chapter boundary, by design.
- Hidden flags with consequences: `tomek-unmentored` (Day 3 → Day 15), `hole-ignored` (Day 11 → Day 26), `knowledge-hoarding` (Day 16 → Day 17). Fail states are stories, not walls.
- The Day-29 choice sets three flags (`path-management` / `path-principal` / `path-founder`) that gate Chapter 2 quest content, not Chapter 1 — no content locks retroactively.

## Running gags carried the whole 30 days (use in bubbles + fun facts)

- The printer: broken since 2019, present in 6 days, gets a title card on Day 30. Still broken. Forever.
- "Circle back" counter: Przemek says it daily; the day-summary tracks it. Day 25's actual circled-back callback is the payoff.
- Pushes to main: Tomek Days 3 and 15; the Day-30 line "Tomek pushed nothing to main" is the arc's quiet victory lap.
- The 90% deploy hang: introduced Day 21, becomes a series staple (every future deploy hangs at 90% — players will learn to wait, and to trust).
- Burek's LinkedIn account: Day 12 bot attendee, Day 28 "Chief Bark Officer," Day 30 trophy. Never explained. Never needs to be.
- Everything is from 2019: the printer, the planning cards, the backup, the cursed player, the spare clicker. 2019 is the game's ancient Rome.

## Chapter 2 hook (Days 31+, non-binding teaser)

The plant phone rings on Day 31 if the player picks it up (answering is optional; ignoring it is also a choice, and the game remembers).

- **"V"** is a client that cannot appear on Stack Underflow's books — size, sector, and vibe undisclosed. They want "galaxy-tier" training and they pay in numbers that make Grażyna sit down slowly.
- Each Day-29 path gets a different Chapter 2 opening: MANAGEMENT runs the team through it, PRINCIPAL does it as the face, FOUNDER does it as the deal that makes (or breaks) the studio.
- Recurring threads to pay off: the 90% deploy hang, Marek's nine ghosts (one script starts failing), Pawel's findings doc (V's security team finds IT), and Burek's LinkedIn account (V follows it; nobody knows how; nobody ever will).
- Maciek's redemption beat: the only person not scared of V is the man who pivots every three days. Panic, it turns out, was training.


/**
 * Second-layer dialogue trees ("revisit" content).
 *
 * For every NPC there are two trees:
 *   - `more`:      shown once the player has met the NPC (available until
 *                  the follow-up flag is set). The FIRST option leads to a
 *                  branch that sets a per-NPC topic flag.
 *   - `after-<x>`: gated on that flag — the NPC remembers the earlier
 *                  conversation and offers something different.
 *
 * Not wired in yet: merge these trees into each NPC's dialogue map with
 * priority default -> more -> after-*, or key off the `available`
 * predicates directly. Same shape as `dialogues.ts` (DIALOGUES).
 */

import type { DialogueTree } from "../types";

export const MORE_DIALOGUES: Record<string, Record<string, DialogueTree>> = {
  bartek: {
    more: {
      available: (state) => !state.flags["bartek-shared-consulting-secret"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "Back again. Good. Persistence is the second-best trait in consulting, right after invoicing. The advanced course went fine, by the way — the client left a five-star review that says, quote, 'he had slides'. But you keep asking questions, and questions are how I got started. Want the real secret? The one they do not put in certifications?",
          options: [
            {
              text: "Tell me the real secret.",
              id: "ask-the-secret",
              nextNodeId: "the-secret",
            },
            {
              text: "You already gave me the triangle trick.",
              id: "triangle-again",
              nextNodeId: "triangle-again",
            },
            {
              text: "Is this a pyramid scheme?",
              id: "pyramid",
              nextNodeId: "pyramid",
            },
          ],
        },
        "the-secret": {
          id: "the-secret",
          text: "The Bartek Loop. You say their own idea back to them, slower, with one word changed, and they nod like you invented fire. I once billed two days for changing 'utilize' to 'use'. The client cried. Tears of alignment. I have said too much — you did not hear it from a senior consultant who is definitely not mentoring you.",
          effects: [{ type: "set-flag", target: "bartek-shared-consulting-secret", delta: 1 }],
          options: [
            {
              text: "I am definitely not being mentored.",
              id: "not-mentored",
              nextNodeId: "not-mentored",
              effects: [
                { type: "add-relationship", target: "bartek", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 3 },
              ],
            },
            {
              text: "Can I bill for listening?",
              id: "bill-for-listening",
              nextNodeId: "bill-for-listening",
              effects: [{ type: "add-relationship", target: "bartek", delta: 5 }],
            },
          ],
        },
        "not-mentored": {
          id: "not-mentored",
          text: "Perfect. Deniability is the wrapper the gift comes in. Tomorrow I will insult your slide deck in front of nobody, which is how you will know the mentoring continues.",
          next: "_end",
        },
        "bill-for-listening": {
          id: "bill-for-listening",
          text: "You already do. It is called discovery. Line one of every invoice: 'stakeholder alignment session'. Nobody has ever asked what was discovered. Nothing. The answer is nothing, and it has financed my car.",
          next: "_end",
        },
        "triangle-again": {
          id: "triangle-again",
          text: "That was the free secret. This one has maintenance costs. The triangle is for clients who think in shapes. The Loop is for everyone else — which is everyone. One per customer: if I teach you a third one we are legally a course.",
          next: "_end",
        },
        pyramid: {
          id: "pyramid",
          text: "A pyramid scheme has a product. Consulting has deliverables. The difference is a Word document. Do not make me explain geometry and fraud in the same sentence — I only cleared my calendar for one of them.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-secret": {
      available: (state) => Boolean(state.flags["bartek-shared-consulting-secret"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "Do not look so pleased. Word travels at the speed of Zosia. I mentioned you to my old network — the freelancers with day rates that have a comma in them. One of them wants a co-trainer for a 'Leadership in the Age of AI' gig. I said I would ask. I never ask. Consider yourself asked.",
          options: [
            {
              text: "I'm in. What's the cut?",
              id: "co-train-yes",
              nextNodeId: "co-train-yes",
              effects: [
                { type: "add-cash", target: "cash", delta: 500 },
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "add-relationship", target: "bartek", delta: 5 },
                { type: "set-flag", target: "bartek-recommended-you", delta: 1 },
              ],
            },
            {
              text: "Why me?",
              id: "why-me",
              nextNodeId: "why-me",
            },
            {
              text: "No thanks. I fly solo.",
              id: "solo",
              nextNodeId: "solo",
              effects: [
                { type: "add-relationship", target: "bartek", delta: -5 },
                { type: "add-stat", target: "credibility", delta: 2 },
              ],
            },
          ],
        },
        "co-train-yes": {
          id: "co-train-yes",
          text: "Seventy-thirty. You are the thirty. Before you argue: the thirty includes meeting them, learning from them, and one dinner where they explain invoice psychology over żurek. The dinner alone is worth more than the fee. I would know. I paid for it once.",
          next: "_end",
        },
        "why-me": {
          id: "why-me",
          text: "Because you listen, you paraphrase, and you have not yet learned to hide it when you do not know. That last one fades. Go while it lasts. The network will eat it out of you by Q4 — gently, over dinners, with invoices.",
          next: "_end",
        },
        solo: {
          id: "solo",
          text: "Solo. Bold. I flew solo for six years. Then I met my accountant. Now I fly commercial like everyone else, and I tip the co-trainer — which would be you, who just said no. The offer rots in three days. Offers always do.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  klaudia: {
    more: {
      available: (state) => !state.flags["klaudia-rebranded-you"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "OK so update. The thread about AI replacing you? It popped off. Then it got community-noted. By my cousin. Anyway — pivot time, and you are the pivot: 'From Trainer to Thought Leader', a behind-the-scenes series. I ghostwrite it. You just... exist attractively near insights. Deal?",
          options: [
            {
              text: "Make me look smart, not viral.",
              id: "smart-not-viral",
              nextNodeId: "smart-not-viral",
              effects: [
                { type: "add-relationship", target: "klaudia", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "set-flag", target: "klaudia-rebranded-you", delta: 1 },
              ],
            },
            {
              text: "Exist attractively near insights. Got it.",
              id: "brand-near-insights",
              nextNodeId: "brand-near-insights",
              effects: [
                { type: "add-relationship", target: "klaudia", delta: 5 },
                { type: "add-stat", target: "credibility", delta: -3 },
              ],
            },
            {
              text: "What happened to the last person you featured?",
              id: "last-feature",
              nextNodeId: "last-feature",
            },
          ],
        },
        "smart-not-viral": {
          id: "smart-not-viral",
          text: "Smart AND viral? Honey, that is two algorithms. ...Fine. Smart it is. I will quote you accurately, cite you properly, and the engagement will be in the hundreds. Real hundreds. The DMs will be from humans with problems you can actually solve. I hate it. It is the most valuable thing I have ever posted.",
          next: "_end",
        },
        "brand-near-insights": {
          id: "brand-near-insights",
          text: "PERFECT. The hashtag already exists: #TheLearningHuman. The comments will call you humble. Humble gets speaking invites, invites get honorariums, honorariums get — OK this part is real — taxed. Read the fine print. The fine print is the only honest paragraph on the whole platform.",
          next: "_end",
        },
        "last-feature": {
          id: "last-feature",
          text: "Gareth? He grew a following, quit his job, started a newsletter, and now he is a full-time creator who misses coding so much he dreams in semicolons. We do not talk about Gareth. Gareth is the algorithm's son now.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-rebrand": {
      available: (state) => Boolean(state.flags["klaudia-rebranded-you"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "The series worked. It worked so well it scared me. A CEO commented 'this is the first honest thing I have read on this platform'. Eleven years of posting and YOU get the CEO. So. New offer, and I am nervous, which is my truth: half-and-half on a paid course. Your knowledge, my funnel. Fifty-fifty. Real contract, not vibes.",
          options: [
            {
              text: "Fifty-fifty. In writing.",
              id: "klaudia-contract-yes",
              nextNodeId: "klaudia-contract-yes",
              effects: [
                { type: "add-cash", target: "cash", delta: 300 },
                { type: "add-relationship", target: "klaudia", delta: 5 },
                { type: "set-flag", target: "klaudia-course-partner", delta: 1 },
              ],
            },
            {
              text: "Your funnel keeps the leads. I keep the soul.",
              id: "funnel-soul",
              nextNodeId: "funnel-soul",
              effects: [
                { type: "add-relationship", target: "klaudia", delta: -5 },
                { type: "add-stat", target: "credibility", delta: 3 },
              ],
            },
            {
              text: "No. The algorithm ate Gareth. It will not eat me.",
              id: "protect-from-gareth",
              nextNodeId: "protect-from-gareth",
              effects: [
                { type: "add-relationship", target: "klaudia", delta: -3 },
                { type: "add-stat", target: "credibility", delta: 2 },
              ],
            },
          ],
        },
        "klaudia-contract-yes": {
          id: "klaudia-contract-yes",
          text: "In writing! I have a template. Two templates — one says 'friends', one says 'survivors'. We sign the survivors one. Lesson one of partnerships: the friendship survives longer when the equity is on paper.",
          next: "_end",
        },
        "funnel-soul": {
          id: "funnel-soul",
          text: "Keeping the soul. Bold. The soul does not convert, but it retains — and retention is just slow-motion virality. Fine. We do it your way, and when it works I am taking forty percent of the credit and one hundred percent of the screenshots.",
          next: "_end",
        },
        "protect-from-gareth": {
          id: "protect-from-gareth",
          text: "Respect. Ruthless, but respect. I will put that energy in the caption — 'the trainer who said no'. Oh no. Oh no, that is going to perform SO well. This is what you have done to me. You have made my irony marketable.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  marek: {
    more: {
      available: (state) => !state.flags["marek-showed-the-log"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "You came back. People do not come back. They come once, ask their small question, leave enriched while I leave depleted. Since you are here: everyone asks about the six monitors. Nobody asks about the seventh. There is no seventh. But if there were, it would be the important one. You get one question. Choose.",
          options: [
            {
              text: "What is actually on the six monitors?",
              id: "the-log-question",
              nextNodeId: "the-log",
              effects: [
                { type: "add-relationship", target: "marek", delta: 10 },
                { type: "set-flag", target: "marek-showed-the-log", delta: 1 },
              ],
            },
            {
              text: "What do you do all day if everything is automated?",
              id: "all-day",
              nextNodeId: "all-day",
            },
            {
              text: "Nothing. Wasting the one question would be a tragedy.",
              id: "save-the-question",
              nextNodeId: "save-the-question",
              effects: [{ type: "add-relationship", target: "marek", delta: 5 }],
            },
          ],
        },
        "the-log": {
          id: "the-log",
          text: "Five are uptime dashboards for systems I automated out of existence — pure nostalgia. The sixth is a log with one line. It scrolls once a day, at 04:13, always the same line: 'heartbeat: still here.' I wrote that check nine years ago for a company that no longer exists. It has outlived the company, the server room, and two of my burnouts. I do not scale. It does.",
          next: "_end",
        },
        "all-day": {
          id: "all-day",
          text: "I watch. Watching is the senior skill. Junior fixes, senior prevents, staff engineer watches the prevention prevent itself. Some days I open the cloud console just to feel something. Then I close it. The bill is the only thing that feels anything back.",
          next: "_end",
        },
        "save-the-question": {
          id: "save-the-question",
          text: "...Correct. You are the first person in four years to not spend it. The question accrues interest. Come back when it is worth more. (Something in the room relaxes by one byte.)",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-log": {
      available: (state) => Boolean(state.flags["marek-showed-the-log"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "It scrolled. 04:13. 'Still here.' I read it and thought of someone to tell, which is new, and the someone was you, which is newer. So. I have a rule: nobody touches my keyboard. I am about to break it in a controlled manner. I wrote a function nine years ago. It needs a second pair of eyes. Yours. This is not a small question. This is the opposite.",
          options: [
            {
              text: "Show me the function.",
              id: "review-the-function",
              nextNodeId: "review-the-function",
              effects: [
                { type: "add-relationship", target: "marek", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "set-flag", target: "marek-trusted-review", delta: 1 },
              ],
            },
            {
              text: "Why me and not Tomek?",
              id: "why-not-tomek",
              nextNodeId: "why-not-tomek",
            },
            {
              text: "I am honored. And terrified.",
              id: "honored-terrified",
              nextNodeId: "honored-terrified",
              effects: [{ type: "add-relationship", target: "marek", delta: 5 }],
            },
          ],
        },
        "review-the-function": {
          id: "review-the-function",
          text: "Four hundred lines of cron-guard that have silently saved every deploy since 2017. I need someone to hate it properly. Find what I cannot see. Do not be kind — kindness is for meetings. Be right. (He slides the keyboard one centimeter toward you. In Marek, this is a hug.)",
          next: "_end",
        },
        "why-not-tomek": {
          id: "why-not-tomek",
          text: "Tomek would paste it into the internet and ask it to be his friend. You would read it like it owed you money. Different energies. The function respects the second one.",
          next: "_end",
        },
        "honored-terrified": {
          id: "honored-terrified",
          text: "Good. Correct order. That is exactly how the function feels about you. You will get along.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  zosia: {
    more: {
      available: (state) => !state.flags["zosia-opened-up"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "Five pm. You know what that means. Nothing! It means nothing, that is the point, it has always— (She stops. Looks at the door. Looks at you.) Off the record: do you know what I do after the one-on-ones? I sit in my car for eleven minutes. Only meeting with no agenda, and it is the best one. You have questions behind your eyes. One of them is about me. Ask it and we are both late to something.",
          options: [
            {
              text: "How are you? Actually.",
              id: "ask-zosia",
              nextNodeId: "zosia-opened-up",
              effects: [
                { type: "add-relationship", target: "zosia", delta: 10 },
                { type: "set-flag", target: "zosia-opened-up", delta: 1 },
              ],
            },
            {
              text: "What is on the roadmap for the roadmap?",
              id: "roadmap-meta",
              nextNodeId: "roadmap-meta",
            },
            {
              text: "Nothing. Go — your car is waiting.",
              id: "respect-the-car",
              nextNodeId: "respect-the-car",
              effects: [{ type: "add-relationship", target: "zosia", delta: 8 }],
            },
          ],
        },
        "zosia-opened-up": {
          id: "zosia-opened-up",
          text: "...Nobody asks the manager that. There is no calendar slot for it, so officially it does not exist. (Eleven seconds of silence — an all-time record for this office.) I got promoted for being good at a job, and then they took the job away and left me the title. I manage. That is the whole answer, and you may not quote it, screenshot it, or bring it to a retro.",
          next: "_end",
        },
        "roadmap-meta": {
          id: "roadmap-meta",
          text: "Q3: align on the roadmap. Q4: roadmap the alignment. Q1: a retrospective on both, which becomes the new roadmap. It is an ouroboros with OKRs. I update the doc before every meeting so the doc feels loved. The doc is the only one who reads it. The doc, and now you.",
          next: "_end",
        },
        "respect-the-car": {
          id: "respect-the-car",
          text: "The eleven minutes. You listened. Noted, filed, never mentioned. Your one-on-one tomorrow will be twenty-four minutes of me saying 'circling back' with genuine warmth.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-opened": {
      available: (state) => Boolean(state.flags["zosia-opened-up"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "Organizational announcement: your one-on-ones are cancelled. All of them. Indefinitely. HR asked why, I said 'async alignment', and they apologized to ME. So — with the recovered twenty-five minutes a day, I have been thinking about the real roadmap. The one in my head. Item one: this company trains nobody. You fix that. 'Training' becomes a protected calendar block. Nobody books over it. Not even me.",
          options: [
            {
              text: "Make it official. I will earn the calendar space.",
              id: "training-block",
              nextNodeId: "training-block",
              effects: [
                { type: "add-relationship", target: "zosia", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "set-flag", target: "zosia-training-block", delta: 1 },
              ],
            },
            {
              text: "What changed? Yesterday you were an ouroboros.",
              id: "zosia-what-changed",
              nextNodeId: "zosia-what-changed",
            },
            {
              text: "Cancel mine, but keep Dariusz's.",
              id: "keep-dariusz",
              nextNodeId: "keep-dariusz",
              effects: [
                { type: "add-relationship", target: "zosia", delta: 3 },
                { type: "add-stat", target: "patience", delta: -5 },
              ],
            },
          ],
        },
        "training-block": {
          id: "training-block",
          text: "Done. It is in the shared calendar: 'TRAINING — DO NOT BOOK OVER — THIS MEANS YOU DARIUSZ'. It recurs weekly, and it has never once been booked over, because in the description I called it a 'leadership sync'. The system works if you lie to it correctly.",
          next: "_end",
        },
        "zosia-what-changed": {
          id: "zosia-what-changed",
          text: "Someone asked how I was and then scheduled nothing about it. You would be shocked what that does to a middle manager. It is like defragmentation. Nobody sees the defrag. Everything loads faster.",
          next: "_end",
        },
        "keep-dariusz": {
          id: "keep-dariusz",
          text: "Everyone's is cancelled except Dariusz's. Dariusz needs the one-on-one. Dariusz has been 'circling back' since March and thinks nobody noticed. I notice everything now. It is my superpower, my curse, and mostly my calendar.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  pawel: {
    more: {
      available: (state) => !state.flags["pawel-read-the-script"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "Update from the intern desk: the principal engineer meeting happened. I asked what 'agile' means. He said 'you will know it when you feel it' and left the room. Sir. Ma'am. Trainer. I have been feeling things and none of them are agile. Anyway — it is Friday. Backup day. Would you... look at the script with me? Just read it. Together. Like the previous intern probably did with someone, once, theoretically.",
          options: [
            {
              text: "Let's read it together.",
              id: "read-together",
              nextNodeId: "read-the-script",
              effects: [
                { type: "add-relationship", target: "pawel", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 3 },
                { type: "set-flag", target: "pawel-read-the-script", delta: 1 },
              ],
            },
            {
              text: "What does the principal engineer actually do?",
              id: "principal-does",
              nextNodeId: "principal-does",
            },
            {
              text: "Just delete—",
              id: "delete-callback",
              nextNodeId: "delete-callback",
              effects: [{ type: "add-relationship", target: "pawel", delta: -5 }],
            },
          ],
        },
        "read-the-script": {
          id: "read-the-script",
          text: "Line one: '# do not ask'. Line two: rsync to 192.168.1.66. That IP is Dariusz's old laptop. Dariusz left in 2023. The laptop left in 2023. We have been backing up to a memory of a machine. Two years of Fridays, archived to the void. And you know what the void sent back? Nothing. The void is polite.",
          next: "_end",
        },
        "principal-does": {
          id: "principal-does",
          text: "Nobody knows. He has a standing desk and a haunted look. Last week he said 'I am protecting you from decisions' and closed his laptop like a priest closing a Bible. I think he is the previous intern. The README one. I have no proof. I have only hope.",
          next: "_end",
        },
        "delete-callback": {
          id: "delete-callback",
          text: "Do not finish that sentence. Last time you started the D-word, the fire alarm did a little chirp. The building knows. The building is on the script's side.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-script": {
      available: (state) => Boolean(state.flags["pawel-read-the-script"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "I did it. I fixed the backup. It goes to the cloud now — a real cloud, with a bill and everything. I labeled the old folder 'tribute'. Did not delete it. Some things you archive out of respect. And listen — the principal engineer stopped at my desk. Looked at the new script. Said 'who told you'. I said a trainer. He said, quote, 'finally'. FINALLY. I have been 'finally'-ed. So now I want to write something original. Teach me. One real line, from scratch, mine.",
          options: [
            {
              text: "Lesson one: write the line only you can write.",
              id: "lesson-one",
              nextNodeId: "lesson-one",
              effects: [
                { type: "add-relationship", target: "pawel", delta: 15 },
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "set-flag", target: "pawel-apprentice", delta: 1 },
              ],
            },
            {
              text: "Lesson one: copy, understand, then rewrite.",
              id: "copy-understand",
              nextNodeId: "copy-understand",
              effects: [
                { type: "add-relationship", target: "pawel", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 3 },
              ],
            },
            {
              text: "I charge by the hour, intern.",
              id: "charge-joke",
              nextNodeId: "charge-joke",
              effects: [
                { type: "add-relationship", target: "pawel", delta: -5 },
                { type: "add-stat", target: "credibility", delta: 2 },
                { type: "add-cash", target: "cash", delta: 50 },
              ],
            },
          ],
        },
        "lesson-one": {
          id: "lesson-one",
          text: "Only I can write... (He opens an empty file. Stares. Types: // TODO: be brave. Saves. Closes. Reopens.) It is a start. It is MY start. The TODO is aspirational, and the file has my name in the corner. Tomorrow: a variable. Next week: a function. I am going to be so slow and so proud.",
          next: "_end",
        },
        "copy-understand": {
          id: "copy-understand",
          text: "Copy, understand, rewrite. Like karaoke, but with consequences. I can do that — that is just my current workflow with self-awareness enabled. Self-awareness... is that in npm, or do I install it another way? Do not answer. Some jokes I need to Google myself.",
          next: "_end",
        },
        "charge-joke": {
          id: "charge-joke",
          text: "Fifty zl, cash, from the vending-machine budget I definitely manage. Invoice pending. Narrated invoice. With emojis. (You are being paid in exposure to Pawel's growth. It compounds.)",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  kasia: {
    more: {
      available: (state) => !state.flags["kasia-revealed-the-role"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "Update from Talent Acquisition: forty-seven open roles, still zero salary ranges, BUT — one role has a range now. One. It is the one nobody survives. Not like that! It is a normal job with a normal amount of haunting. Three people have held it. All three 'went to pursue other opportunities', which is HR for 'the role pursued them first'. You train survival. Want to hear about it?",
          options: [
            {
              text: "Tell me about the haunted role.",
              id: "haunted-role",
              nextNodeId: "revealed-the-role",
              effects: [
                { type: "add-relationship", target: "kasia", delta: 5 },
                { type: "set-flag", target: "kasia-revealed-the-role", delta: 1 },
              ],
            },
            {
              text: "Why do you stay in HR?",
              id: "why-hr",
              nextNodeId: "why-hr",
            },
            {
              text: "Can I see the salary range for MY role?",
              id: "my-range",
              nextNodeId: "my-range",
            },
          ],
        },
        "revealed-the-role": {
          id: "revealed-the-role",
          text: "Security Awareness Advocate. The range is finally public: 'competitive'. That is the range. The job: convince four hundred engineers to use a password manager. The last three advocates left after the phishing simulation — we simulated so hard that we phished ourselves, and payroll was briefly in Estonia. You would be perfect. You have the calm of a person who has seen a consultant cry.",
          next: "_end",
        },
        "why-hr": {
          id: "why-hr",
          text: "I like people at scale. Individually: exhausting. At scale: statistics. Somewhere inside four hundred engineers there is exactly one workplace romance, two quiet resignations, and a guy who CCs the CEO on fridge complaints. I know which is which. I am the census with a lanyard.",
          next: "_end",
        },
        "my-range": {
          id: "my-range",
          text: "Oh, sweet. No. Your range is 'commensurate with experience'. Your experience is 'commensurate with the range'. It is a closed loop, like a snake, like everything in this company. Do not get me started on the org chart. I have started on the org chart. It took a week.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-role": {
      available: (state) => Boolean(state.flags["kasia-revealed-the-role"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "It is done. You survived the haunted-role conversation, which means you are officially Talent with a capital T in my spreadsheet. (The spreadsheet is the real org chart.) So — two things, one good, one also good but weird. Good: I can 'accidentally' leave the real salary bands open on my screen while you stand there. Weird-good: refer a friend to any role, they last ninety days, you get 500 zl. It is a bounty. HR calls it 'community sourcing'. Same thing. The friendship surviving is on you.",
          options: [
            {
              text: "Show me the bands. Accidentally.",
              id: "the-bands",
              nextNodeId: "the-bands",
              effects: [
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "add-stat", target: "patience", delta: -5 },
                { type: "set-flag", target: "kasia-leaked-bands", delta: 1 },
              ],
            },
            {
              text: "I will refer someone. I know one employed-adjacent person.",
              id: "the-referral",
              nextNodeId: "the-referral",
              effects: [
                { type: "add-relationship", target: "kasia", delta: 5 },
                { type: "set-flag", target: "kasia-referral-open", delta: 1 },
              ],
            },
            {
              text: "Nothing. I already know too much.",
              id: "knows-too-much",
              nextNodeId: "knows-too-much",
              effects: [
                { type: "add-relationship", target: "kasia", delta: 3 },
                { type: "add-stat", target: "credibility", delta: 2 },
              ],
            },
          ],
        },
        "the-bands": {
          id: "the-bands",
          text: "(She tilts the laptop one degree. You see numbers you cannot unsee. Your band is two tiers below 'Consultant II' — which is Bartek, who has not consulted since spring.) You saw nothing, I showed nothing, and from today you will negotiate everything. This is the real onboarding. This is the whole industry. You are welcome, Talent.",
          next: "_end",
        },
        "the-referral": {
          id: "the-referral",
          text: "A referral with a pulse and a GitHub — that is the dream quota right there. Ninety days, 500 zl, and the warm feeling of outsourcing your friendship to procurement. I will pencil them in as 'culture add', which is what we say instead of 'please'.",
          next: "_end",
        },
        "knows-too-much": {
          id: "knows-too-much",
          text: "Valid. Knowledge is heavy and the bands are the heaviest. Walk away. Unsee. And if anyone asks — and they will, in the kitchen, casually — you were never at this desk. This desk is a mirage with a standing-desk module.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  tomek: {
    more: {
      available: (state) => !state.flags["tomek-reviewed-pr"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "Update: the two-thousand-file pull request is still open. Reviewers keep resigning — that is a joke, probably. But the site says 'review requested: 1,999 files ago' and I feel it in my spine. You offered to walk through it. Were you serious? Everyone offers, and then their calendar 'fills up'. Calendars are the yes of the no-people.",
          options: [
            {
              text: "I was serious. Open the first file.",
              id: "open-first-file",
              nextNodeId: "tomek-reviewed-pr",
              effects: [
                { type: "add-relationship", target: "tomek", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 3 },
                { type: "set-flag", target: "tomek-reviewed-pr", delta: 1 },
              ],
            },
            {
              text: "Why do you paste instead of write?",
              id: "why-paste",
              nextNodeId: "why-paste",
            },
            {
              text: "My calendar... filled up.",
              id: "filled-up",
              nextNodeId: "filled-up",
              effects: [{ type: "add-relationship", target: "tomek", delta: -8 }],
            },
          ],
        },
        "tomek-reviewed-pr": {
          id: "tomek-reviewed-pr",
          text: "File one: package-lock.json. Files two through one-thousand-nine-hundred-ninety-six: also package-lock.json. File 1,997: a haiku, in console.log. 'syntax error at dawn — the build does not know itself — neither do I, friend'. File 1,998: the actual fix. Four lines. Touched by a better developer than me. File 1,999: a picture of a dog. It is Burek. HOW IS BUREK IN THE REPO.",
          next: "_end",
        },
        "why-paste": {
          id: "why-paste",
          text: "My lead said 'do not reinvent the wheel' and it imprinted on me like a duckling. Now every problem is a wheel to me. Round. Previously solved. Someone else's. I am not a developer, I am a wheel distributor.",
          next: "_end",
        },
        "filled-up": {
          id: "filled-up",
          text: "There it is. The classic. No hard feelings — the calendar giveth and the calendar taketh. (He adds you to a follow-up review request anyway. Cycle of life.)",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-review": {
      available: (state) => Boolean(state.flags["tomek-reviewed-pr"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "We merged it. The haiku stayed. Legal said the dog cannot be in the repo, so it is 'documentation media' now. And the four-line fix? The better developer finally reviewed MY review and said: 'you found the bug the fix caused.' Which means I found something ORIGINAL. One original plank in a sea of paste. So here is my ask, and I typed it out first so I would not chicken out: teach me to write the things instead of finding them. Mentorship. Structured. I brought a notebook. A paper one. I mean business.",
          options: [
            {
              text: "Lesson one is tonight: one line, no internet.",
              id: "lesson-tonight",
              nextNodeId: "lesson-tonight",
              effects: [
                { type: "add-relationship", target: "tomek", delta: 15 },
                { type: "add-stat", target: "credibility", delta: 3 },
                { type: "set-flag", target: "tomek-apprentice", delta: 1 },
              ],
            },
            {
              text: "First rule: understand every paste before it ships.",
              id: "paste-rule",
              nextNodeId: "paste-rule",
              effects: [
                { type: "add-relationship", target: "tomek", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 2 },
              ],
            },
            {
              text: "Mentorship costs: one coffee, delivered daily.",
              id: "coffee-tribute",
              nextNodeId: "coffee-tribute",
              effects: [
                { type: "add-relationship", target: "tomek", delta: 8 },
                { type: "add-stat", target: "caffeine", delta: 10 },
              ],
            },
          ],
        },
        "lesson-tonight": {
          id: "lesson-tonight",
          text: "One line. No internet. (He writes: const me = learn(you); — stares — changes it to let — STARES — changes it back to const. 'No,' he whispers. 'I intend to stay changed.') This is the hardest I have ever thought and the most like a developer I have ever felt. Same time next week?",
          next: "_end",
        },
        "paste-rule": {
          id: "paste-rule",
          text: "Understood-before-shipped. I will put it on a sticky note on my monitor, next to the existing sticky note that says 'YOU ARE PAID TO BE CERTAIN' — which I now realize was the actual problem. Do you do interventions for sticky notes? Asking for me.",
          next: "_end",
        },
        "coffee-tribute": {
          id: "coffee-tribute",
          text: "Done. Daily. Medium roast, from the good machine — the one Bartek does not know I know about. (You now have a coffee pipeline. In this office, that is an org-chart-level event. You have been promoted by the junior.)",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  ania: {
    more: {
      available: (state) => !state.flags["ania-saw-the-funnel"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "THURSDAY IS TOMORROW. The webinar is REAL, the thumbnail is LIVE, and registrations are at — hold on — two hundred eleven, which in webinar math is two thousand, which in real math is eleven of my cousins. Before you say anything: I built the whole funnel. Top, middle, bottom. I need you to SEE it. Not judge it. See it. There is a difference, and legally it matters.",
          options: [
            {
              text: "Show me the funnel.",
              id: "show-the-funnel",
              nextNodeId: "ania-saw-the-funnel",
              effects: [
                { type: "add-relationship", target: "ania", delta: 8 },
                { type: "set-flag", target: "ania-saw-the-funnel", delta: 1 },
              ],
            },
            {
              text: "Cancel it. We are not a soufflé.",
              id: "cancel-funnel",
              nextNodeId: "cancel-funnel",
              effects: [
                { type: "add-relationship", target: "ania", delta: -5 },
                { type: "add-stat", target: "credibility", delta: 4 },
              ],
            },
            {
              text: "Where did the eleven cousins come from?",
              id: "the-cousins",
              nextNodeId: "the-cousins",
            },
          ],
        },
        "ania-saw-the-funnel": {
          id: "ania-saw-the-funnel",
          text: "Top: the crying thumbnail — that is awareness. Middle: a landing page where you promise to 'reveal the three AI truths they do not want trained' — that is intrigue, I invented it. Bottom: a buy button for a course we have not made — that is 'pre-demand'. My course coach says demand is just pre-anything. (She looks at it. Really looks.) ...It is beautiful and it is all air. Like a soufflé. Made of nothing. That photographs well.",
          next: "_end",
        },
        "cancel-funnel": {
          id: "cancel-funnel",
          text: "Cancel? You cannot cancel a soufflé, it is already — OK, you can, and it collapses, and that is exactly what happens, and I will spend Friday explaining the collapse as 'intentional scarcity'. The comeback post writes itself. It is writing itself right now. I hate how good it is.",
          next: "_end",
        },
        "the-cousins": {
          id: "the-cousins",
          text: "Referral loop. I put 'bring a relative' in the subject line and the algorithm did the rest. Family converts at ninety percent because unsubscribing from family is emotionally expensive. I should teach this. I WILL teach this. That is your job now, though. Teach it better. You are welcome.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-funnel": {
      available: (state) => Boolean(state.flags["ania-saw-the-funnel"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "It happened. The webinar. You did it LIVE — and at minute forty, when the chatbot demo froze, you did the thing: you told a true story with no slide behind you. Registrations: two-eleven. Watch-through: eighty-four percent. My funnel has never held water like that. So the market has spoken, through me, its vessel: season two. OR — and this idea is so dangerous I biked here fast just to say it — we kill the persona, keep the person, and make 'no-thumbnail' the brand. Your face. Just your face. Thinking.",
          options: [
            {
              text: "Season two. But I pick the title.",
              id: "ania-season-two",
              nextNodeId: "ania-season-two",
              effects: [
                { type: "add-cash", target: "cash", delta: 400 },
                { type: "add-relationship", target: "ania", delta: 5 },
                { type: "set-flag", target: "ania-season-two", delta: 1 },
              ],
            },
            {
              text: "Kill the persona. Keep the person.",
              id: "kill-persona",
              nextNodeId: "kill-persona",
              effects: [
                { type: "add-cash", target: "cash", delta: 200 },
                { type: "add-stat", target: "credibility", delta: 8 },
                { type: "add-relationship", target: "ania", delta: -8 },
                { type: "set-flag", target: "ania-killed-persona", delta: 1 },
              ],
            },
            {
              text: "Sponsors are like weather — explain that.",
              id: "sponsors-weather",
              nextNodeId: "sponsors-weather",
            },
          ],
        },
        "ania-season-two": {
          id: "ania-season-two",
          text: "DEAL. Oh no, wait, the title is load-bearing — fine, FINE, you pick, but know that I have already imagined forty titles and will grieve each one you reject. The sponsor is a mechanical keyboard company. I do not know why. Sponsors are like weather.",
          next: "_end",
        },
        "kill-persona": {
          id: "kill-persona",
          text: "(A silence. Somewhere, a funnel dies.) Do you know what you just did? You turned down RECURRING REVENUE for CONTINUITY OF SELF. My course coach would bill you for saying that out loud. ...But my cousin watched twice. The human one. She said 'I would watch him think forever'. That is not a metric. It might be better than a metric. We do it your way. Once. Softly.",
          next: "_end",
        },
        "sponsors-weather": {
          id: "sponsors-weather",
          text: "Unpredictable, everywhere, and someone is always blaming them for the numbers. The keyboard people emailed at 3am: 'we love the crying'. I replied 'he is evolving'. They replied ':)'. That is the entire contract, spiritually.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  janusz: {
    more: {
      available: (state) => !state.flags["janusz-told-the-flood"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "You are back. Good. Bins talk, by the way — yours is all energy-drink cans and one apple, and the apple is a smokescreen. I know the type. You have the look of someone who heard 'one flood' and has been carrying it around since. Eleven years, and it is still the best story in the building. Better than the statue. Ask me properly and I will tell it with the pauses in the right places.",
          options: [
            {
              text: "Tell me about the flood. Properly.",
              id: "tell-the-flood",
              nextNodeId: "janusz-told-the-flood",
              effects: [
                { type: "add-relationship", target: "janusz", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 3 },
                { type: "set-flag", target: "janusz-told-the-flood", delta: 1 },
              ],
            },
            {
              text: "Better than the statue? Tell the statue one.",
              id: "statue-story",
              nextNodeId: "statue-story",
            },
            {
              text: "What do the bins say about me? Really?",
              id: "bins-say",
              nextNodeId: "bins-say",
            },
          ],
        },
        "janusz-told-the-flood": {
          id: "janusz-told-the-flood",
          text: "March, 2019. 'Chaos engineering day' — they decided to test what fails if you fail things on purpose. What failed was a pipe on the third floor. Water finds server rooms the way bad news finds HR. I will not say I saved the servers. I will say: a mop, a bin, and a man who knows where every drain in this building lives can be, for one afternoon, a firewall. The CEO shook my hand. Then invoiced me for the mop. That last part is a joke. The handshake is not.",
          next: "_end",
        },
        "statue-story": {
          id: "statue-story",
          text: "The founder's dog, bronze, life-size, in reception. The dog's name was Kafka. The sculptor never saw Kafka — only a photo, blurry, mid-shake. So the statue looks like a dog who owes money. The founder loved it more than the real Kafka. That is a lesson about something. Art, probably. Or founders.",
          next: "_end",
        },
        "bins-say": {
          id: "bins-say",
          text: "That you are trying. Cans, yes, but also the apple, the printouts with actual highlights, the parking receipt from the one day you drove. You are not hiding — you are buffering. The bins respect buffering. The bins were all buffers once.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-flood": {
      available: (state) => Boolean(state.flags["janusz-told-the-flood"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "Since the flood story I have been thinking. You listen like someone who stays — this building can smell temporary. So: two keys. First, the supply closet with the GOOD coffee. Not the 'team events' coffee — the real one, behind the mop heads. Second — and you did not get this from me, a mop, or any drain — the printer. I unplugged it in 2019. Water day. Never plugged it back. Eleven years of 'broken'. It works fine. It always worked fine. Now you know a thing, and knowing a thing in this office is a visa. What you do with the plug — that is the citizenship test.",
          options: [
            {
              text: "Where is the plug?",
              id: "the-plug",
              nextNodeId: "the-plug",
              effects: [
                { type: "add-relationship", target: "janusz", delta: 10 },
                { type: "add-stat", target: "patience", delta: 5 },
                { type: "set-flag", target: "janusz-knows-the-plug", delta: 1 },
              ],
            },
            {
              text: "Leave it. Some legends hold up walls.",
              id: "leave-the-legend",
              nextNodeId: "leave-the-legend",
              effects: [
                { type: "add-relationship", target: "janusz", delta: 5 },
                { type: "add-stat", target: "credibility", delta: 3 },
                { type: "set-flag", target: "janusz-leave-printer", delta: 1 },
              ],
            },
            {
              text: "Grazyna hides the coffee behind the mop heads?",
              id: "the-good-coffee",
              nextNodeId: "the-good-coffee",
              effects: [
                { type: "add-relationship", target: "janusz", delta: 5 },
                { type: "add-stat", target: "caffeine", delta: 15 },
              ],
            },
          ],
        },
        "the-plug": {
          id: "the-plug",
          text: "Behind the cabinet, third socket, the one labeled 'DO NOT USE (FIRE)'. I labeled it. There is no fire. There is only consequence. Plug it in and you become the person who fixed 2019 — hero for a week. Then it is just a printer again, asking for toner like everything else in this world: politely, forever.",
          next: "_end",
        },
        "leave-the-legend": {
          id: "leave-the-legend",
          text: "You understand. The printer is not broken — it is RETIRED, with honors. It holds up the story, the story holds up the morale, the morale holds up the office. Cheaper than a statue, and it smells better than the flood. You are learning the building, and the building is learning you back.",
          next: "_end",
        },
        "the-good-coffee": {
          id: "the-good-coffee",
          text: "In a tin marked 'INDUSTRIAL — NOT FOR EVENTS'. She rotates the hiding place monthly, but a man with the building's map in his head is hard to hide from. Take a scoop. Take two. Caffeine from that tin counts double — it has been aging since the flood, like everything good in this office.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  burek: {
    more: {
      available: (state) => !state.flags["burek-standup-observed"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "Burek is not at the dog bed. This is information. At 12:00 sharp, every day, Burek walks to the meeting room, lies under the table, and attends the sales standup. He has never been invited. He has never missed one. When Przemek over-forecasts, Burek exhales — one short blast through the nose. The team calls it 'the audit'. They adjust the numbers. He is back at the bed by 12:20 with the quiet satisfaction of a creature who has kept this company honest through three CEOs and one flood.",
          options: [
            {
              text: "I need to see the audit.",
              id: "see-the-audit",
              nextNodeId: "burek-standup-observed",
              effects: [
                { type: "add-relationship", target: "burek", delta: 10 },
                { type: "add-stat", target: "patience", delta: 5 },
                { type: "set-flag", target: "burek-standup-observed", delta: 1 },
              ],
            },
            {
              text: "Does Burek have a title? An org-chart spot?",
              id: "burek-title",
              nextNodeId: "burek-title",
            },
            {
              text: "Just pet the dog and walk away.",
              id: "pet-and-walk",
              nextNodeId: "pet-and-walk",
              effects: [
                { type: "add-relationship", target: "burek", delta: 5 },
                { type: "add-stat", target: "patience", delta: 5 },
              ],
            },
          ],
        },
        "burek-standup-observed": {
          id: "burek-standup-observed",
          text: "You watch from the corridor, as is proper. 12:04: Przemek says 'conservatively, double'. Burek: the exhale. Przemek, instantly: 'or, realistically, half of that'. Nobody acknowledges the dog. The dog acknowledges no one. The numbers correct themselves, and the meeting ends early — as all meetings do when they are truly supervised. You have witnessed governance.",
          next: "_end",
        },
        "burek-title": {
          id: "burek-title",
          text: "His bowl says 'CHIEF AUDIT OFFICER'. Kasia made it in 2022, when she was 'doing culture'. It is the only title in this company that has never been restructured, downgraded, or 'circling back'-ed. Burek's role has survived every reorg. Burek IS the reorg's purpose.",
          next: "_end",
        },
        "pet-and-walk": {
          id: "pet-and-walk",
          text: "You pet him once, correctly, at the intersection of the ears. He permits it. You walk away a better-rounded professional. Somewhere, a forecast self-corrects out of respect.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-audit": {
      available: (state) => Boolean(state.flags["burek-standup-observed"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "Burek is waiting by your desk. This is new. He has your scent, your schedule, and — he is carrying something. It is the squeaky toy shaped like a server. He drops it at your feet. In dog, this is a contract. The terms: you throw, he returns; the toy squeaks, the office survives; the audit continues. Kasia says if you accept, you are 'his person' now, and there is no offboarding from that. HR has tried.",
          options: [
            {
              text: "I accept the contract. (Throw the toy.)",
              id: "accept-contract",
              nextNodeId: "accept-contract",
              effects: [
                { type: "add-relationship", target: "burek", delta: 20 },
                { type: "add-stat", target: "patience", delta: 10 },
                { type: "set-flag", target: "burek-person", delta: 1 },
              ],
            },
            {
              text: "I am not ready to be someone's person.",
              id: "not-ready",
              nextNodeId: "not-ready",
              effects: [{ type: "add-relationship", target: "burek", delta: -5 }],
            },
            {
              text: "What does the toy squeak say, exactly?",
              id: "squeak-semantics",
              nextNodeId: "squeak-semantics",
            },
          ],
        },
        "accept-contract": {
          id: "accept-contract",
          text: "You throw. He returns. You throw. He returns it FASTER, with corrections. The third throw is intercepted mid-air — a display of reliability the delivery team has never once achieved. From today, Burek walks you to meetings. Colleagues will nod at you differently: you are no longer 'the new trainer'. You are 'Burek's person'. It is the higher rank.",
          next: "_end",
        },
        "not-ready": {
          id: "not-ready",
          text: "Burek looks at the toy. Looks at you. Leaves the toy. It stays by your desk anyway — that is how dog contracts work: declined is a signature. He will re-present the terms daily until market conditions change. They always change. They change because of him.",
          next: "_end",
        },
        "squeak-semantics": {
          id: "squeak-semantics",
          text: "It says 'UPTIME'. Kasia bought a bin of them in 2021 for a launch party that got cancelled. The launch failed; the toy outlived it. In this office, the squeak is the only SLA that has never been breached.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  grazyna: {
    more: {
      available: (state) => !state.flags["grazyna-showed-the-books"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "It is the first of the month. You know what that means. Nothing — I invoice quarterly, the first is for drama. But since you are here: you took my advice. I noticed. Recorded a session, packaged it, put it where money can find it. The advice invoice is in the mail. ALSO — and I have thought about this for eleven seconds, my full annual budget for generosity — there is a tab in my real spreadsheet called 'trainers who survived'. There are names in it. You are not in it yet. The entry fee is one honest conversation.",
          options: [
            {
              text: "Show me the spreadsheet. I did pay attention.",
              id: "show-the-books",
              nextNodeId: "grazyna-showed-the-books",
              effects: [
                { type: "add-relationship", target: "grazyna", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "set-flag", target: "grazyna-showed-the-books", delta: 1 },
              ],
            },
            {
              text: "What is the honest conversation?",
              id: "honest-convo",
              nextNodeId: "honest-convo",
            },
            {
              text: "Bartek is in it TWICE? How?",
              id: "bartek-twice",
              nextNodeId: "bartek-twice",
            },
          ],
        },
        "grazyna-showed-the-books": {
          id: "grazyna-showed-the-books",
          text: "You listened AND implemented. That is rarer than profit. (The spreadsheet opens. It is beautiful. Conditional formatting like a cathedral.) Look — Maciek was in it once, 2019, before vision became his job. Bartek is in it twice, which should be impossible; the man expenses his own resignation annually. The column that matters is not revenue. It is 'came back next year'. That column is the whole business, and it is the only one nobody puts on slides.",
          next: "_end",
        },
        "honest-convo": {
          id: "honest-convo",
          text: "This: are you building a job or an asset? A job ends when you stop. An asset ends when you stop maintaining it — which is slower and more dignified. Your recordings: job or asset? Do not answer now. Answer with your next invoice. The spreadsheet reads invoices like tea leaves.",
          next: "_end",
        },
        "bartek-twice": {
          id: "bartek-twice",
          text: "Administrative error that I chose to keep. In 2021 he resigned, invoiced out his notice period, and consulted BACK to us for one week at a higher rate. On paper he both left and survived in the same quarter. I sent the invoice to myself as a warning. The warning is framed in my kitchen.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-books": {
      available: (state) => Boolean(state.flags["grazyna-showed-the-books"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "You are in the tab. 'Trainers who survived' — entry thirty-one, dated today, annotated: 'listens'. Do not celebrate; two of the thirty above you also listened, and one of them is now a candle competitor. Speaking of which: my candle business needs your brain and your face. 'Syntax Error' — a scent for developers. Notes: ozone, old keyboard, ambition. I handle production and the tax black magic. You record the course that sells it: 'Intro to Focus'. We split it clean. I have thoughts on the split, and a spreadsheet that proves my thoughts.",
          options: [
            {
              text: "Sixty-forty, my favor, and I keep creative control.",
              id: "negotiate-split",
              nextNodeId: "negotiate-split",
              effects: [
                { type: "add-cash", target: "cash", delta: 350 },
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "add-relationship", target: "grazyna", delta: 5 },
                { type: "set-flag", target: "grazyna-candle-partner", delta: 1 },
              ],
            },
            {
              text: "Fifty-fifty. Clean, like you said.",
              id: "fifty-clean",
              nextNodeId: "fifty-clean",
              effects: [
                { type: "add-cash", target: "cash", delta: 300 },
                { type: "add-relationship", target: "grazyna", delta: 8 },
                { type: "set-flag", target: "grazyna-candle-partner", delta: 1 },
              ],
            },
            {
              text: "A candle that smells like ambition? What is ambition?",
              id: "ambition-notes",
              nextNodeId: "ambition-notes",
            },
          ],
        },
        "negotiate-split": {
          id: "negotiate-split",
          text: "Sixty-forty, your favor — counter-offer accepted, which you should know NEVER happens, and will now be priced into everything, forever. You have creative control of the course. I have creative control of the fire. That is the correct division of labor in any partnership: never let both parties hold the matches.",
          next: "_end",
        },
        "fifty-clean": {
          id: "fifty-clean",
          text: "Fifty-fifty, no cells contested, no hidden rows. I will admit — the clean split is more profitable in the long run. Audits of the soul are expensive. The candle is poured, the course is scheduled, and the synergy is accidental, which makes it legal.",
          next: "_end",
        },
        "ambition-notes": {
          id: "ambition-notes",
          text: "Wednesday. Ambition smells like Wednesday — the one day of the week that still believes in you. Ozone, warm plastic, and underneath it all, just a trace of invoice paper. Focus in a jar. Pre-orders open Monday. We are going to disturb the wellness industry, and the wellness industry deserves it.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  maciek: {
    more: {
      available: (state) => !state.flags["maciek-briefed-you"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "Thursday approaches, and with it, the board. Small confession between us, scaling vertically: I told them the AI transformation is 'in flight'. It is not in flight. It is in a Jira ticket. Assigned to me. Opened by me. In February. Here is what I can offer you: the board deck. One slide. Black. The word 'SCALE' in white, forty-point font. It has survived three CEOs and one actual auditor. Want to know why it works?",
          options: [
            {
              text: "Why does the one slide work?",
              id: "why-one-slide",
              nextNodeId: "maciek-briefed-you",
              effects: [
                { type: "add-relationship", target: "maciek", delta: 5 },
                { type: "add-stat", target: "patience", delta: -5 },
                { type: "set-flag", target: "maciek-briefed-you", delta: 1 },
              ],
            },
            {
              text: "Why is the ticket still open since February?",
              id: "open-ticket",
              nextNodeId: "open-ticket",
            },
            {
              text: "What if a board member asks a REAL question?",
              id: "real-question",
              nextNodeId: "real-question",
            },
          ],
        },
        "maciek-briefed-you": {
          id: "maciek-briefed-you",
          text: "Because a board does not read code — it reads confidence, in font sizes. Forty-point says 'I have arrived'. Twenty-point says 'please'. The auditor asked what we scale. I said 'whatever survives the meeting'. He wrote 'visionary' in the margins. Margins are the board's GitHub. Anyway: YOU present Thursday, not me. I have a conflict (golf). Say 'AI-first', show the slide, and answer exactly one question with the word 'compound'. Understood?",
          next: "_end",
        },
        "open-ticket": {
          id: "open-ticket",
          text: "Some tickets are load-bearing. Close it, and someone asks what changed. Boards are snow: every step is a print, prints accumulate, and in spring — audit — they all melt into one puddle called 'accountability'. I do not step. I present. The slide is my snowshoe.",
          next: "_end",
        },
        "real-question": {
          id: "real-question",
          text: "Then we enter the legend zone. It happened once, 2022. A new member, engineering background, asked 'what does it DO'. The room went so quiet I heard the vending machine. And I said — still do not know where this came from — 'it does what we were already doing, but now it is intentional'. He nodded for eleven seconds and invested. The lesson: never again. Hence you, Thursday, 'compound'.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-brief": {
      available: (state) => Boolean(state.flags["maciek-briefed-you"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "The board loved you. 'Compound' landed so hard the chairman wrote it on the whiteboard and underlined it, and now it is company values, plural. You are 'the AI guy' — that is not a title, that is gravity; everything will now roll toward you. One item on the agenda of my soul: next quarter's buzzword poll is open. 'Blockchain' is winning. Blockchain. In THIS economy. In THIS office. You have seen where the bodies are buried. Fight it. Or do not. But if blockchain wins, the slide says 'TRUST', and I will not be able to stop it.",
          options: [
            {
              text: "Nominate 'training'. I will make it true by Friday.",
              id: "nominate-training",
              nextNodeId: "nominate-training",
              effects: [
                { type: "add-stat", target: "credibility", delta: 8 },
                { type: "add-relationship", target: "maciek", delta: 10 },
                { type: "set-flag", target: "maciek-training-buzzword", delta: 1 },
              ],
            },
            {
              text: "Let blockchain win. The wheel turns.",
              id: "let-blockchain",
              nextNodeId: "let-blockchain",
              effects: [
                { type: "add-stat", target: "patience", delta: -8 },
                { type: "add-stat", target: "credibility", delta: 2 },
                { type: "set-flag", target: "maciek-blockchain-wins", delta: 1 },
              ],
            },
            {
              text: "You heard the vending machine in the silence?",
              id: "vending-silence",
              nextNodeId: "vending-silence",
            },
          ],
        },
        "nominate-training": {
          id: "nominate-training",
          text: "'Training'. (He says it slowly, tasting it like a wine that might be poisoned.) It is... not a buzzword. It is a word. Words are harder — they have meanings that persist into Q2. But if anyone can make a real word win a fake poll, it is the guy who said 'compound' with a straight face. I will second the nomination. The slide will say 'GROWTH', and for once it will not be lying.",
          next: "_end",
        },
        "let-blockchain": {
          id: "let-blockchain",
          text: "The wheel turns, the budget renews, and somewhere a consultant gets a second boat. You have learned find-and-replace faster than I did. I am proud in the way that is slightly sad. The slide will say 'TRUST'. The slide does not know what it is saying. The slide never does. That is its superpower.",
          next: "_end",
        },
        "vending-silence": {
          id: "vending-silence",
          text: "Floor two. The one that hums in B-flat when the compressor kicks in. In a quiet room it sounds like judgment. I have made three strategic pivots to that hum. One of them is 'AI-first'. The hum was right. The hum is always right. Do not tell the board about the hum. They think it is vision.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  przemek: {
    more: {
      available: (state) => !state.flags["przemek-robot-plan"],
      nodes: {
        greeting: {
          id: "greeting",
          text: "Big week. HUGE week. The bootcamp — five days, sixty leaders, one you — is Thursday to Monday, which includes a weekend, which I sold as 'immersive'. Before you do the thing you do with your face: the client emailed. Subject line: 'Robotic expectations'. Body: one question mark. They remember the robot, my friend. They REMEMBER. We need a strategy, and we need it before my calendar reminder that says 'strategy' (it is in four minutes).",
          options: [
            {
              text: "Talk to me about the robot. All of it.",
              id: "robot-confession",
              nextNodeId: "przemek-robot-plan",
              effects: [
                { type: "add-relationship", target: "przemek", delta: 10 },
                { type: "add-stat", target: "patience", delta: -3 },
                { type: "set-flag", target: "przemek-robot-plan", delta: 1 },
              ],
            },
            {
              text: "Sell the robot to me as a feature.",
              id: "robot-feature",
              nextNodeId: "robot-feature",
            },
            {
              text: "Why is your strategy meeting only four minutes long?",
              id: "four-minutes",
              nextNodeId: "four-minutes",
            },
          ],
        },
        "przemek-robot-plan": {
          id: "przemek-robot-plan",
          text: "OK. Deep breath. Sales confession booth. The robot is — technically, spiritually, invoice-ly — a Roomba. Named TrainerBot 3000. Ribbon on it. I introduced it to a room in 2024 as 'the future of autonomous learning'. It cleaned the venue DURING my pitch and got a standing ovation. It lives at the client's HQ now. They gave it a LANYARD. Here is the strategy, and it is as old as selling: never deny, redirect. They ask about the robot, you say 'the robot is element two of three', and talk about element one. Nobody has ever asked what the elements are. Nobody ever will.",
          next: "_end",
        },
        "robot-feature": {
          id: "robot-feature",
          text: "WATCH: 'Adaptive learning companion, included.' That is the Roomba with the lanyard. Same machine. The lanyard adds forty percent perceived value — that is not a joke, that is retail. I learned it from a man who sold extended warranties on free trials. He owns a boat now. The boat is named 'LANYARD'.",
          next: "_end",
        },
        "four-minutes": {
          id: "four-minutes",
          text: "Because strategy is a moment, not a process. You either know what you would say with the client's CEO holding your hand in a firm grip, or you do not. Four minutes is generous. The best strategy meeting I ever had was eye contact in an elevator. We closed. The elevator music was 'Careless Whisper'. The universe sells WITH you, if you let it.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    "after-robot": {
      available: (state) => Boolean(state.flags["przemek-robot-plan"]),
      nodes: {
        greeting: {
          id: "greeting",
          text: "IT HAPPENED. Bootcamp: done. You: magnificent. Sixty leaders, five days, one moment of legend — day three, the CFO raises his hand and says 'about the robot'. The room held its breath. You said: 'the robot is element two of three.' Silence. Then he said — and I got it in WRITING — 'what is element one?' (Przemek's eyes shine. This is his World Cup.) NOBODY has ever asked. What did you DO? Whatever it was, they doubled the follow-up contract. Also: TrainerBot sent you a calendar invite. It is recurring. It has no agenda. It never will.",
          options: [
            {
              text: "Element one is the teacher. It was always the teacher.",
              id: "element-one",
              nextNodeId: "element-one",
              effects: [
                { type: "add-cash", target: "cash", delta: 600 },
                { type: "add-stat", target: "credibility", delta: 10 },
                { type: "add-relationship", target: "przemek", delta: 15 },
                { type: "set-flag", target: "przemek-legend-teacher", delta: 1 },
              ],
            },
            {
              text: "I panicked and said element one is the cloud.",
              id: "panicked-cloud",
              nextNodeId: "panicked-cloud",
              effects: [
                { type: "add-cash", target: "cash", delta: 600 },
                { type: "add-stat", target: "credibility", delta: -5 },
                { type: "add-relationship", target: "przemek", delta: 5 },
              ],
            },
            {
              text: "Decline the recurring invite. Robots get no agendas.",
              id: "decline-invite",
              nextNodeId: "decline-invite",
              effects: [
                { type: "add-stat", target: "patience", delta: 3 },
                { type: "add-stat", target: "credibility", delta: 3 },
                { type: "add-relationship", target: "przemek", delta: 3 },
              ],
            },
          ],
        },
        "element-one": {
          id: "element-one",
          text: "...I am not crying, this is sales moisture. THAT is the line. THAT is the close. 'The robot is element two' — and the room realizes element one is the HUMAN. That is not training, that is THEATER. You sold them their own people back to them with a Roomba as the straight man. The follow-up is doubled, the invoice is poetic, and I am putting you on the DO-NOT-SELL list: the people I never over-promise, because they deliver. It is a short list. It is now: you, my mother, and Burek.",
          next: "_end",
        },
        "panicked-cloud": {
          id: "panicked-cloud",
          text: "The CLOUD. The oldest trick in the deck, played with the confidence of a man who did not know it was a trick. The CFO nodded for so long that the room started nodding. Synergy by contagion. The contract doubled anyway — do not ask why. The why is that nobody in that room wanted to be the one to ask what the cloud IS. Welcome to the industry. We have lanyards.",
          next: "_end",
        },
        "decline-invite": {
          id: "decline-invite",
          text: "Strong. Boundaries even with machines — that is the future of human resources, right there. I will decline it 'on your behalf, from your lawyer'. TrainerBot will process it. I am told it processes things now. At night. Alone. We made that robot a promise in 2024, and it has never once let it go. Sales never dies. It just gets a firmware update.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },
};

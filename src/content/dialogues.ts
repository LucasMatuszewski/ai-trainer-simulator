/**
 * All dialogue trees for the MVP NPCs.
 *
 * Each tree is keyed by a state predicate name (e.g. "default", "after-tutorial").
 * The first tree whose predicate matches the player state is shown.
 *
 * Style: short, punchy, IT Crowd / Silicon Valley. The player is the player;
 * NPCs are the NPCs. Lines are 1-2 sentences max.
 *
 * Effects (cash, stat, relationship) are applied when an option is picked.
 */

import type { DialogueTree } from "../types";

// (No shared greeting options; each NPC has its own tree.)

export const DIALOGUES: Record<string, Record<string, DialogueTree>> = {
  bartek: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Oh, fresh meat. I am Bartek, Senior Consultant. Welcome to Stack Underflow, where every ticket is a feature. Have you signed the NDA yet? It says you cannot remember the password we never told you.",
          options: [
            {
              text: "I read the README. It said 'figure it out'.",
              id: "tutorial-0", nextNodeId: "tutorial",
              effects: [{ type: "add-relationship", target: "bartek", delta: 5 }],
            },
            {
              text: "I have a Stack Overflow account. I am basically qualified.",
              id: "tutorial-1", nextNodeId: "tutorial",
              effects: [{ type: "add-relationship", target: "bartek", delta: -5 }],
            },
            {
              text: "Is this the kind of place where the printer works?",
              nextNodeId: "printer",
            },
          ],
        },
        tutorial: {
          id: "tutorial",
          text: "Ha. We have a junior here who once spilled ramen on the server rack and called it 'load testing'. I have a job for you. A client wants a one-day crash course on AI for managers. Pay is 400 zl. You in?",
          effects: [{ type: "set-flag", target: "tutorial-offered", delta: 1 }],
          options: [
            {
              text: "I am in. When do we start?",
              nextNodeId: "tutorial-yes",
              effects: [
                { type: "add-cash", target: "cash", delta: 400 },
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "add-relationship", target: "bartek", delta: 10 },
                { type: "set-flag", target: "got-acme-contract", delta: 1 },
              ],
            },
            {
              text: "I need to think about it. (No you do not.)",
              nextNodeId: "tutorial-maybe",
            },
          ],
        },
        "tutorial-yes": {
          id: "tutorial-yes",
          text: "Excellent. 400 zl wired, client is happy, you have survived week one. Do not let it go to your head. I once knew a contractor who thought being good at their job was enough. They are now a project manager. Avoid that.",
          next: "_end",
        },
        "tutorial-maybe": {
          id: "tutorial-maybe",
          text: "Sure, take your time. The client will hire Pawel. He does not know what he is doing, but he has a fresh LinkedIn profile, so technically more senior than you.",
          next: "_end",
        },
        printer: {
          id: "printer",
          text: "The printer has been broken since 2019. We call it 'Marek's coffee maker'. Nobody touches it. If you fix it, you become the most popular person in the building. If you break it worse, you become the most popular person in a different way.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    afterTutorial: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Hey, glad you came back. I have another client. Same company actually. They liked the first course so much they want a two-day advanced version. Pay is 800 zl. The catch: the manager who attends is the kind of person who thinks 'the cloud' is a thing Microsoft owns.",
          options: [
            {
              text: "Fine, I will smile and nod for 800 zl.",
              nextNodeId: "advanced-yes",
              effects: [
                { type: "add-cash", target: "cash", delta: 800 },
                { type: "add-stat", target: "patience", delta: -10 },
                { type: "add-relationship", target: "bartek", delta: 5 },
              ],
            },
            {
              text: "Maybe I will just answer my emails for two days instead.",
              nextNodeId: "advanced-no",
              effects: [
                { type: "add-relationship", target: "bartek", delta: -10 },
                { type: "add-stat", target: "credibility", delta: 5 },
              ],
            },
          ],
        },
        "advanced-yes": {
          id: "advanced-yes",
          text: "That is the spirit. I will put 'strategic resilience' on the invoice and you can put your phone on silent. If anyone asks a technical question, draw a triangle and label the corners people, process, and platform.",
          options: [],
        },
        "advanced-no": {
          id: "advanced-no",
          text: "Fair. Email is the only training format where everyone can pretend they read the material. I will tell the client you are preserving async alignment. They will respect the jargon, if not the decision.",
          options: [],
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    afterContract: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "You know, you might actually survive this industry. Do not quote me on that. I have a reputation for being wrong, and I would like to keep it.",
          options: [
            {
              text: "What gave me away?",
              nextNodeId: "survival-advice",
            },
          ],
        },
        "survival-advice": {
          id: "survival-advice",
          text: "You asked a useful question before opening a slide deck. Around here, that is practically a leadership competency. Keep doing it quietly or management will notice.",
          options: [],
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  klaudia: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Oh em gee, hi! I am Klaudia, your friendly neighborhood thought leader. I just posted a thread on why AI will replace you. It has 200 likes and zero substance. Want to collab?",
          options: [
            {
              text: "Sure, what is the collab?",
              nextNodeId: "collab-yes",
            },
            {
              text: "I would rather debug a COBOL codebase at 3am.",
              nextNodeId: "collab-no",
              effects: [
                { type: "add-relationship", target: "klaudia", delta: -10 },
                { type: "add-stat", target: "credibility", delta: 2 },
              ],
            },
            {
              text: "I have been meaning to ask, what is your actual job title?",
              nextNodeId: "collab-question",
            },
          ],
        },
        "collab-yes": {
          id: "collab-yes",
          text: "Amazing! I will tag you in a tweet about '10x developer energy'. It will mean nothing and reach 5,000 people. You will get three recruiter DMs and a request to speak at a conference in Lisbon you cannot afford to fly to.",
          effects: [
            { type: "add-relationship", target: "klaudia", delta: 15 },
            { type: "add-stat", target: "credibility", delta: -3 },
          ],
          next: "_end",
        },
        "collab-no": {
          id: "collab-no",
          text: "Wow, OK. I see how it is. I will just keep posting. The algorithm loves me. The algorithm is the only one.",
          next: "_end",
        },
        "collab-question": {
          id: "collab-question",
          text: "I am a 'Senior Innovation Catalyst'. I cannot tell you what that means. Nobody can. My manager has never asked. The job was invented during a meeting in 2021 and has refused to die since.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  marek: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "I am Marek. I am a 10x engineer. I do not have time to onboard you. I have six monitors and one of them is just a clock. The coffee machine is in the corner. Do not touch my keyboard. Do not breathe near my keyboard.",
          options: [
            {
              text: "What is a 10x engineer?",
              nextNodeId: "what-is-10x",
            },
            {
              text: "I see you. Fellow 10x here.",
              nextNodeId: "fellow-10x",
              effects: [
                { type: "add-relationship", target: "marek", delta: 5 },
                { type: "add-stat", target: "credibility", delta: -5 },
              ],
            },
            {
              text: "OK, I will leave you alone. (Relief.)",
              nextNodeId: "leave",
              effects: [{ type: "add-relationship", target: "marek", delta: -5 }],
            },
          ],
        },
        "what-is-10x": {
          id: "what-is-10x",
          text: "It means I produce ten times the output of a regular engineer. Nobody has ever measured this. Including me. It is a vibe.",
          next: "_end",
        },
        "fellow-10x": {
          id: "fellow-10x",
          text: "I knew it. I can smell my own kind. Quick question: do you also refuse to write documentation? I have not written a doc in seven years. I have not been asked. I have not been promoted. The cycle continues.",
          next: "_end",
        },
        leave: {
          id: "leave",
          text: "Thank you. Most people do not. They bring me 'small questions'. There are no small questions. There are only small minds.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  zosia: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Hi! I am Zosia, the manager. Quick question: can you work weekends? That is not a question, it is a lifestyle. Welcome to the team. Your one-on-one is scheduled for every day at 5pm. It will be 25 minutes long. It will say nothing.",
          options: [
            {
              text: "Yes, I can work weekends. (You cannot.)",
              id: "_end-0", nextNodeId: "_end",
              effects: [
                { type: "add-relationship", target: "zosia", delta: 10 },
                { type: "add-stat", target: "patience", delta: -10 },
              ],
            },
            {
              text: "I have a hard boundary on weekends. (You do not, but nice try.)",
              id: "_end-1", nextNodeId: "_end",
              effects: [
                { type: "add-relationship", target: "zosia", delta: -10 },
                { type: "add-stat", target: "credibility", delta: 5 },
              ],
            },
            {
              text: "What is the roadmap?",
              nextNodeId: "roadmap",
            },
          ],
        },
        roadmap: {
          id: "roadmap",
          text: "The roadmap is a Google Doc I update before every meeting. It is the same document every time. It says 'agile', 'synergy', and 'move fast'. Nobody reads it. Including me.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  pawel: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Hi! I am Pawel, I am the intern. I have been an intern for two years. I run a backup script every Friday. I do not know what it backs up. I do not know where. I do not know why. I have not been fired. I have not been promoted. I am Schrödinger's employee.",
          options: [
            {
              text: "Want to pair on a script?",
              nextNodeId: "pair-yes",
              effects: [
                { type: "add-relationship", target: "pawel", delta: 20 },
                { type: "add-stat", target: "credibility", delta: 2 },
              ],
            },
            {
              text: "Have you tried deleting the script?",
              nextNodeId: "delete-script",
              effects: [
                { type: "add-relationship", target: "pawel", delta: -15 },
                { type: "add-stat", target: "credibility", delta: 1 },
              ],
            },
            {
              text: "Did you read the README?",
              nextNodeId: "readme",
            },
          ],
        },
        "pair-yes": {
          id: "pair-yes",
          text: "Really? Nobody has ever asked. Here is what I know: npm install fixes 90% of my problems. The other 10% I solve by turning my laptop off and on again. I have a meeting with the principal engineer in three hours. I am going to ask him what 'agile' means. I will report back.",
          next: "_end",
        },
        "delete-script": {
          id: "delete-script",
          text: "WHAT. No. Do not touch it. That script is the only reason I have a job. Without it I am just a person with a chair and a laptop. I cannot go back to that.",
          next: "_end",
        },
        readme: {
          id: "readme",
          text: "There is no README. The previous intern left and took the README with him. He is now a senior engineer somewhere. I think about him every day.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  kasia: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Hi!! I am Kasia, Talent Acquisition Specialist, which means I find people and acquire them. Do not worry, I already filled in your engagement survey — I put 'thriving'. I have 47 open roles and none of them have a salary range, because transparency is a spectrum, and we are on the shy end of it.",
          options: [
            {
              text: "What does this company actually do?",
              nextNodeId: "kasia-company",
              effects: [{ type: "add-relationship", target: "kasia", delta: 5 }],
            },
            {
              text: "I am actually looking for a raise.",
              nextNodeId: "kasia-raise",
              effects: [
                { type: "add-relationship", target: "kasia", delta: -5 },
                { type: "add-stat", target: "patience", delta: -5 },
              ],
            },
            {
              text: "Do you know what an IT trainer does?",
              nextNodeId: "kasia-job",
            },
          ],
        },
        "kasia-company": {
          id: "kasia-company",
          text: "Great question! We synergize vertical learnings to disrupt the enablement space. I have worked here three years and I have never been more confident. Confidence is most of the job. The rest is scheduling software and closing tabs at 5pm sharp, because work-life balance is also a spectrum, and that one I enforce.",
          next: "_end",
        },
        "kasia-raise": {
          id: "kasia-raise",
          text: "Oh no. Oh no no no. Compensation talk is outside my emotional jurisdiction. I am going to need you to fill in a form, then a different form, then wait for a committee that meets quarterly in a room that does not exist. (The answer was always no. The forms were the no.)",
          next: "_end",
        },
        "kasia-job": {
          id: "kasia-job",
          text: "You train AI? Like... tell it to be better? Kidding. Mostly. The last trainer taught the clients so well they automated themselves out of a job. Legal said we cannot call it a success story, but between us — bullet point on my LinkedIn. Three bullets, actually.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  tomek: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Hey, sorry, quick question, are you the calendar? Never mind, you are not the calendar. I am Tomek, Junior Developer. Today I have written four lines of code and pasted four hundred. Stack Overflow does not know I exist, and yet it carries me. Can you review my pull request? It is two thousand files. I wrote none of them. Do not tell anyone. (Everyone knows.)",
          options: [
            {
              text: "Walk me through what the code does.",
              nextNodeId: "tomek-explain",
              effects: [
                { type: "add-relationship", target: "tomek", delta: 5 },
                { type: "add-stat", target: "credibility", delta: 2 },
              ],
            },
            {
              text: "Have you tried writing it yourself?",
              nextNodeId: "tomek-yourself",
              effects: [
                { type: "add-relationship", target: "tomek", delta: -10 },
                { type: "add-stat", target: "credibility", delta: 3 },
              ],
            },
            {
              text: "Ship it. What is the worst that happens?",
              nextNodeId: "tomek-ship",
              effects: [
                { type: "add-relationship", target: "tomek", delta: 10 },
                { type: "add-stat", target: "credibility", delta: -8 },
              ],
            },
          ],
        },
        "tomek-explain": {
          id: "tomek-explain",
          text: "Honestly? No idea. It is a blend of a 2014 forum post, two blog articles that contradict each other, and one comment in Portuguese that says 'this is wrong but it works'. It is load-bearing. Nobody knows what it holds up. We all walk under it anyway.",
          next: "_end",
        },
        "tomek-yourself": {
          id: "tomek-yourself",
          text: "Write it... myself? Like, from my own brain? That feels arrogant. Smarter people exist on the internet and they already did it — why would I compete with the internet? The internet never sleeps, and technically neither do I, but only one of us has a heartbeat.",
          next: "_end",
        },
        "tomek-ship": {
          id: "tomek-ship",
          text: "You are SO much better than my last lead. He kept saying 'tests' and 'documentation' and 'Tomek, why is there a rainforest API in a banking app'. We deploy Friday. If it explodes, that is Friday's problem, and Friday-me is a stranger to me.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  ania: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "HI! So excited to meet you! I am Ania, Growth and Synergy. I have been stalking you on LinkedIn — love the journey, hate the header image. Quick win for both of us: I signed you up to host a live webinar called 'AI: Friend or Frenemy?'. It is next Thursday. I already made the thumbnail. You are crying in it. On purpose. For engagement.",
          options: [
            {
              text: "I am not doing a webinar called that.",
              nextNodeId: "ania-refuse",
              effects: [
                { type: "add-relationship", target: "ania", delta: -10 },
                { type: "add-stat", target: "credibility", delta: 5 },
              ],
            },
            {
              text: "What is the webinar actually about?",
              nextNodeId: "ania-about",
            },
            {
              text: "Will there at least be pizza?",
              nextNodeId: "ania-pizza",
              effects: [
                { type: "add-relationship", target: "ania", delta: 10 },
                { type: "set-flag", target: "ania-webinar-volunteered", delta: 1 },
              ],
            },
          ],
        },
        "ania-refuse": {
          id: "ania-refuse",
          text: "Totally fine! I already sold two hundred tickets. I will simply morph it into a 'live AI experiment' where I type the audience's questions into a chatbot myself. It is basically the same product. It is slightly worse for the brand, but sure — boundaries, love that for you.",
          next: "_end",
        },
        "ania-about": {
          id: "ania-about",
          text: "AI! All of it. I have eleven slides. One says 'disruption'. One says 'the future is now'. Nine are stock photos of robots shaking hands with humans in suits. The robot is doing the handshake. Nobody gets it. That is exactly why it works.",
          next: "_end",
        },
        "ania-pizza": {
          id: "ania-pizza",
          text: "Pizza is SO on-brand for you. I am putting it in the campaign: 'the trainer who keeps it real'. Congratulations, you have a persona now. Personas cannot eat pizza — personas ARE pizza, for the algorithm. (You are still doing the webinar. It is in the thumbnail.)",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  janusz: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "I am Janusz. I clean this place. Eleven years, three CEOs, one flood. I know where the bodies are buried — figuratively, and once literally, ask about the parking lot. You are the new trainer? Word of advice: the people in this office will tell you they are busy. Nobody here is busy. I empty their bins. I have seen the receipts.",
          options: [
            {
              text: "Tell me about the parking lot.",
              nextNodeId: "janusz-parking",
              effects: [{ type: "add-relationship", target: "janusz", delta: 5 }],
            },
            {
              text: "You must know everything about everyone here.",
              nextNodeId: "janusz-intel",
              effects: [{ type: "add-stat", target: "credibility", delta: 5 }],
            },
            {
              text: "Excuse me, I have a meeting.",
              nextNodeId: "janusz-meeting",
              effects: [{ type: "add-relationship", target: "janusz", delta: -10 }],
            },
          ],
        },
        "janusz-parking": {
          id: "janusz-parking",
          text: "2016. The 'agile transformation' launch party. A kebab truck, a bouncy castle, a drone show nobody remembers ordering. The invoice said 'team building'. The invoice also said 'cash'. Some questions you do not ask twice, and that is one more question than anyone in this office has ever asked.",
          next: "_end",
        },
        "janusz-intel": {
          id: "janusz-intel",
          text: "Bartek cries in stairwell B on Tuesdays. Zosia's roadmap has been the same document since Q2. Pawel's backup script writes to a laptop that left the company in 2023. And the printer? Not broken. Unplugged. Since 2019. I unplugged it. You may ask why. (Do not ask why.)",
          next: "_end",
        },
        "janusz-meeting": {
          id: "janusz-meeting",
          text: "Sure, sure, meeting. I attend those too — I empty the bin while you all pretend the meeting is working. Difference is, something gets done. (The bins see everything. The bins forgive nothing.)",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  burek: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Burek does not look up. He is aware of you the way a mountain is aware of weather. He is lying in the corridor with the calm of a creature who has never once checked Slack. His tail moves one centimeter, which in dog is a standing ovation. You may approach, but know this: he has eaten better lunch than yours.",
          options: [
            {
              text: "Pet the dog.",
              nextNodeId: "burek-pet",
              effects: [
                { type: "add-relationship", target: "burek", delta: 15 },
                { type: "add-stat", target: "patience", delta: 10 },
              ],
            },
            {
              text: "Ignore the dog. You are a professional.",
              nextNodeId: "burek-ignore",
              effects: [
                { type: "add-relationship", target: "burek", delta: -10 },
                { type: "add-stat", target: "focus", delta: 5 },
              ],
            },
            {
              text: "Feed the dog half of your lunch.",
              nextNodeId: "burek-feed",
              effects: [
                { type: "add-relationship", target: "burek", delta: 25 },
                { type: "add-stat", target: "patience", delta: 5 },
                { type: "set-flag", target: "burek-fed", delta: 1 },
              ],
            },
          ],
        },
        "burek-pet": {
          id: "burek-pet",
          text: "You pet Burek. He accepts it as tribute. Time passes. Deadlines stop mattering, then stop existing, then never existed. A calm settles into you that no certified course could provide. His eyes say: you may pass. (Somewhere, an email goes unanswered. It was always going to be unanswered.)",
          next: "_end",
        },
        "burek-ignore": {
          id: "burek-ignore",
          text: "You walk past. Burek does not move, but the office gets one degree colder. The vending machine hums with judgment. You focus up, professional, invincible. A true corporate warrior. (You will think about this at 3am. Burek will not. Burek never does.)",
          next: "_end",
        },
        "burek-feed": {
          id: "burek-feed",
          text: "Burek eats the lunch in one bite, looks at the empty hand, then at you, as if asking what happened to the lunch. You have a friend now. Friends are expensive and worth every zloty. He follows you to your next meeting and sleeps under the table, guarding your laptop bag like a dragon guards gold.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  grazyna: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "I am Grazyna from accounting. Sit down, this will not take long, everything here takes long. I have processed your onboarding — your salary is a number I have opinions about, but I am paid to have them quietly. Between us: this company has two budgets, the real one and the one for 'team events'. Guess which one buys the good coffee.",
          options: [
            {
              text: "Tell me about the real budget.",
              nextNodeId: "grazyna-budget",
              effects: [{ type: "add-relationship", target: "grazyna", delta: 5 }],
            },
            {
              text: "Is my job safe here?",
              nextNodeId: "grazyna-safe",
            },
            {
              text: "You radiate side hustle. Tell me everything.",
              nextNodeId: "grazyna-hustle",
              effects: [
                { type: "add-relationship", target: "grazyna", delta: 10 },
                { type: "add-stat", target: "credibility", delta: 3 },
                { type: "set-flag", target: "grazyna-course-idea", delta: 1 },
              ],
            },
          ],
        },
        "grazyna-budget": {
          id: "grazyna-budget",
          text: "The real budget lives in a spreadsheet only I can open, in a folder only I know, with a password I have told no one — on purpose. If this building burns down, I am the backup. HR calls that 'a single point of failure'. I call it job security. Neither of us is wrong.",
          next: "_end",
        },
        "grazyna-safe": {
          id: "grazyna-safe",
          text: "Safe is a strong word. Last quarter this company paid for a synergy retreat, a bronze statue of the founder's dog, and your salary. Two of those are still in the building. (You are one of them. Probably. Check again on Friday.)",
          next: "_end",
        },
        "grazyna-hustle": {
          id: "grazyna-hustle",
          text: "I sell handmade candles, I import mechanical keyboards, and I do the taxes of four people in this room, one of whom should not be... never mind. My advice to you: record your trainings, package them, sell them while you sleep. Knowledge is the only inventory with zero storage cost. That advice was not free — I invoice on the first.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  maciek: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Maciek. CTO. I have not written code in five years and I have never been stronger. My job now is vision — I look at the horizon, I say the word 'scale', and money appears. You are the new trainer? Perfect timing. I have been telling the board we are an 'AI-first company'. Nobody has asked what that means. Least of all me. Can you make it true by Friday?",
          options: [
            {
              text: "What does AI-first actually mean?",
              nextNodeId: "maciek-meaning",
            },
            {
              text: "I can make it true. For a price.",
              nextNodeId: "maciek-deal",
              effects: [
                { type: "add-cash", target: "cash", delta: 600 },
                { type: "add-stat", target: "credibility", delta: 5 },
                { type: "add-relationship", target: "maciek", delta: 10 },
                { type: "set-flag", target: "maciek-ai-first-deal", delta: 1 },
              ],
            },
            {
              text: "When did you last open a terminal?",
              nextNodeId: "maciek-terminal",
            },
          ],
        },
        "maciek-meaning": {
          id: "maciek-meaning",
          text: "It means whatever survives the meeting. Last year we were 'cloud-native'. Before that, 'mobile-first'. Before that — blockchain, I think? The wheel turns, the budget renews, and the slides stay the same: you just find-and-replace the buzzword. Find-and-replace is the most senior engineering skill there is. That is not a joke. That is the whole industry.",
          next: "_end",
        },
        "maciek-deal": {
          id: "maciek-deal",
          text: "HA. I like you. You have the two qualities I value most in a colleague: cynicism, and a price. Six hundred zl, expensed as 'internal enablement' — the board will nod, because a slide that says 'AI' on it makes them feel like the future is happening to them. One warning: do not teach them too much. An informed board asks questions, and questions are, historically, how CTOs die.",
          next: "_end",
        },
        "maciek-terminal": {
          id: "maciek-terminal",
          text: "Tuesday. I opened it by accident, tried to close it, closed the browser instead, and lost my tabs. I told everyone the laptop was updating for four hours. It was — I made it update. There is a script for that. Pawel wrote it. He thinks it is a backup. Do not tell him what it is actually for. He is happy. Happiness is rare here.",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },

  przemek: {
    default: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "Przemek, Sales. Big fan. HUGE fan. Of you, of this office, of revenue. Quick one — I promised a client you would deliver a five-day 'AI Transformation Bootcamp' for their entire leadership team. I may also have promised a robot. We do not have a robot. You are kind of a robot? (You are not.) Let's circle back on the robot.",
          options: [
            {
              text: "How many people is 'the entire leadership team'?",
              nextNodeId: "przemek-headcount",
            },
            {
              text: "Never promise my time again.",
              nextNodeId: "przemek-boundary",
              effects: [
                { type: "add-relationship", target: "przemek", delta: -10 },
                { type: "add-stat", target: "credibility", delta: 5 },
              ],
            },
            {
              text: "I will do it. Double rate, cash up front.",
              nextNodeId: "przemek-deal",
              effects: [
                { type: "add-cash", target: "cash", delta: 1000 },
                { type: "add-relationship", target: "przemek", delta: 10 },
                { type: "add-stat", target: "patience", delta: -15 },
                { type: "set-flag", target: "przemek-bootcamp-sold", delta: 1 },
              ],
            },
          ],
        },
        "przemek-headcount": {
          id: "przemek-headcount",
          text: "Forty. Maybe sixty. It depends whether the client's ex-wife's company counts, and legally I have decided it does. Great energy in that room, by the way — they cancelled the last trainer because he 'used too many words'. The bar is on the floor. Just walk over it in good shoes.",
          next: "_end",
        },
        "przemek-boundary": {
          id: "przemek-boundary",
          text: "Love that. LOVE it. Boundaries — exactly the kind of clarity I bring to every relationship, usually right before I ignore it. Here is the truth about sales: a promise is not a lie, it is a first draft. And you, my friend, are in a lot of first drafts. (So many drafts.)",
          next: "_end",
        },
        "przemek-deal": {
          id: "przemek-deal",
          text: "DEAL. God, I love it when they negotiate — it makes the number feel real. Done: double rate, 'cash', meaning an invoice with a friendly emoji on it. One thing: you now own the robot question. If they ask about the robot, the room is legally yours to lose. (There is no robot. There never was. Sales.)",
          next: "_end",
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
  },
};

// Phase 7: more dialogue trees for branching + memory (L-2026-08-30-02).
// Imported from dialogues-more.ts and merged into the DIALOGUES export
// so every consumer of DIALOGUES automatically sees the new trees.
import { MORE_DIALOGUES } from "./dialogues-more";

for (const [npcId, trees] of Object.entries(MORE_DIALOGUES)) {
  const existing = (DIALOGUES as Record<string, Record<string, DialogueTree>>)[npcId] ?? {};
  (DIALOGUES as Record<string, Record<string, DialogueTree>>)[npcId] = {
    ...existing,
    ...trees,
  };
}

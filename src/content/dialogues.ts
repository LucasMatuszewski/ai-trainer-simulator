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
              nextNodeId: "tutorial",
              effects: [{ type: "add-relationship", target: "bartek", delta: 5 }],
            },
            {
              text: "I have a Stack Overflow account. I am basically qualified.",
              nextNodeId: "tutorial",
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
                { type: "increment-total", target: "dialoguesFinished", delta: 1 },
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
              nextNodeId: "_end",
              effects: [
                { type: "add-cash", target: "cash", delta: 800 },
                { type: "add-stat", target: "patience", delta: -10 },
                { type: "add-relationship", target: "bartek", delta: 5 },
              ],
            },
            {
              text: "Maybe I will just answer my emails for two days instead.",
              nextNodeId: "_end",
              effects: [
                { type: "add-relationship", target: "bartek", delta: -10 },
                { type: "add-stat", target: "credibility", delta: 5 },
              ],
            },
          ],
        },
        _end: { id: "_end", text: "", next: "_end" },
      },
    },
    afterContract: {
      nodes: {
        greeting: {
          id: "greeting",
          text: "You know, you might actually survive this industry. Do not quote me on that. I have a reputation for being wrong, and I would like to keep it.",
          next: "_end",
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
              nextNodeId: "_end",
              effects: [
                { type: "add-relationship", target: "zosia", delta: 10 },
                { type: "add-stat", target: "patience", delta: -10 },
              ],
            },
            {
              text: "I have a hard boundary on weekends. (You do not, but nice try.)",
              nextNodeId: "_end",
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
};

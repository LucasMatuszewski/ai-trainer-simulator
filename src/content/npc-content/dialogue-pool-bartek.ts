/**
 * WS3 dialogue v2 pool — Bartek, Senior Consultant (C-77, PRD Flow A2).
 *
 * Pure authored data. Topics: consulting trade secrets, the Friday push to
 * main, the printer situation, and post-contract client stories. Task
 * offers: PR fallout duty (sets the existing `tomek-reviewed-pr` flag) and
 * the lunch masterclass (sets the existing `bartek-shared-consulting-secret`
 * flag). Tone matches `dialogues.ts`: IT Crowd / Silicon Valley, invoicing
 * as a love language.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const BARTEK_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "bartek",
  topics: [
    {
      id: "bartek:consulting",
      label: "Consulting trade secrets",
      optionCandidates: [
        {
          id: "bartek:consulting:opt-1",
          topicId: "bartek:consulting",
          text: "How do I bill for a meeting that should have been an email?",
        },
        {
          id: "bartek:consulting:opt-2",
          topicId: "bartek:consulting",
          text: "Teach me the triangle. People, process, platform.",
        },
        {
          id: "bartek:consulting:opt-3",
          topicId: "bartek:consulting",
          text: "A client asked me a question I do not know the answer to.",
        },
        {
          id: "bartek:consulting:opt-4",
          topicId: "bartek:consulting",
          text: "Is consulting just reading the client's mind and invoicing for it?",
        },
        {
          id: "bartek:consulting:opt-5",
          topicId: "bartek:consulting",
          text: "How do I look senior when I am the least senior person in the room?",
        },
        {
          id: "bartek:consulting:opt-6",
          topicId: "bartek:consulting",
          text: "What is the Bartek Loop, really?",
        },
        {
          id: "bartek:consulting:opt-7",
          topicId: "bartek:consulting",
          text: "I have to deliver bad news to a client today.",
        },
      ],
      replyCandidates: [
        {
          id: "bartek:consulting:rep-1",
          text: "You invoice for the meeting AND the email. The email is documentation, and documentation is deliverable number two. I once billed three hours for a calendar invite. The invite had an agenda. That is the difference between us and amateurs: agenda.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:consulting:rep-2",
          text: "The triangle is not a metaphor, it is a load-bearing wall of every audit deck. Draw it big. Label it slower than you think you should. When in doubt, point at 'process' and say 'this is where you are losing money'. Nobody has ever asked which process.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:consulting:rep-3",
          text: "Never answer in the room. Say 'great question, I will follow up in writing'. Then find the answer, or find someone who has it, and send it from a thread titled 'Action Items'. You are now the person who follows up. That person gets contracts.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:consulting:rep-4",
          text: "Careful. That is dangerously close to the business model. Yes. But the mind-reading is ten percent and the invoicing confidence is ninety. The client could have read their own mind. They wanted it read TO them, with slides.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:consulting:rep-5",
          text: "Speak twenty percent less than everyone else, and when you do speak, pause one second before answering. That second says 'I have options'. Also never take notes faster than the most senior person. Match their note-taking speed. Do not ask me why. It just is.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:consulting:rep-6",
          text: "I told you the Loop in confidence, which makes it a trade secret, which means if you use it you owe me... a coffee. Skip lunch with me, bring vending machine change, and I will explain invoicing for outcomes. Officially this never happened.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
          offersTaskId: "bartek:task-masterclass",
        },
        {
          id: "bartek:consulting:rep-7",
          text: "Bad news travels in threes: what happened, what it costs, what we do now. Then stop talking. Silence after a recovery plan reads as leadership. Filling it reads as guilt. I have watched senior people talk themselves into refunds. Do not fill the silence.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:tomek-main",
      label: "The Friday push to main",
      optionCandidates: [
        {
          id: "bartek:tomek-main:opt-1",
          topicId: "bartek:tomek-main",
          text: "Tomek pushed to main again. Do I tell him?",
        },
        {
          id: "bartek:tomek-main:opt-2",
          topicId: "bartek:tomek-main",
          text: "I reviewed two thousand files. They are all Stack Overflow.",
        },
        {
          id: "bartek:tomek-main:opt-3",
          topicId: "bartek:tomek-main",
          text: "Should we roll back the Friday deploy?",
        },
        {
          id: "bartek:tomek-main:opt-4",
          topicId: "bartek:tomek-main",
          text: "Tomek says the rainforest API is load-bearing.",
        },
        {
          id: "bartek:tomek-main:opt-5",
          topicId: "bartek:tomek-main",
          text: "Can we put branch protection on main so this stops happening?",
        },
        {
          id: "bartek:tomek-main:opt-6",
          topicId: "bartek:tomek-main",
          text: "Tomek is crying in stairwell B. Is that bad?",
        },
        {
          id: "bartek:tomek-main:opt-7",
          topicId: "bartek:tomek-main",
          text: "What if we just promote Tomek so it becomes someone else's problem?",
        },
      ],
      replyCandidates: [
        {
          id: "bartek:tomek-main:rep-1",
          text: "Tell him, but as a question: 'walk me through your deployment strategy'. He will review his own crime scene. And while he does that, I need a second pair of eyes on the actual pull request. Officially it is a mentorship. Unofficially you are the fallout shelter.",
          relationshipHint: "neutral",
          offersTaskId: "bartek:task-fallout",
        },
        {
          id: "bartek:tomek-main:rep-2",
          text: "Of course they are. The internet wrote our codebase and the internet does not sign commits. Write 'reviewed, looks intentional' on the three biggest files. If anyone asks, the Portuguese comment was a stylistic choice.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:tomek-main:rep-3",
          text: "Roll back? On a Friday? The rollback instructions lived in a file Tomek deleted. We deploy forward. Forward, into the fire, like professionals.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:tomek-main:rep-4",
          text: "Everything in this office is load-bearing once Tomek has shipped it. That API holds up the invoicing module, the invoicing module holds up this company. Be nice to the rainforest.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:tomek-main:rep-5",
          text: "Branch protection is a great idea and I will forward it to Maciek, who will reply 'great energy' and change nothing. Meanwhile the real protection is that main has been broken so long the client tests against broken.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:tomek-main:rep-6",
          text: "Stairwell B is the designated architecture decompression zone. I do my quarterly review of the ceiling there myself, Tuesdays usually. Tell him the wifi does not reach the stairwell, so nothing he says in there counts.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:tomek-main:rep-7",
          text: "Promotion is the corporate hoverboard: it looks like a solution and it moves the problem onto someone else. Senior Junior Developer. He would be on LinkedIn within the hour. Honestly, the graph might like it.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "bartek:printer",
      label: "The printer situation",
      optionCandidates: [
        {
          id: "bartek:printer:opt-1",
          topicId: "bartek:printer",
          text: "The printer has been broken since 2019. What was it like when it worked?",
        },
        {
          id: "bartek:printer:opt-2",
          topicId: "bartek:printer",
          text: "Marek calls the printer his coffee maker. Should I be worried?",
        },
        {
          id: "bartek:printer:opt-3",
          topicId: "bartek:printer",
          text: "A client asked us to print the training materials.",
        },
        {
          id: "bartek:printer:opt-4",
          topicId: "bartek:printer",
          text: "I heard the printer is not broken, just unplugged.",
        },
        {
          id: "bartek:printer:opt-5",
          topicId: "bartek:printer",
          text: "What did the printer last print, if anything?",
        },
        {
          id: "bartek:printer:opt-6",
          topicId: "bartek:printer",
          text: "Should we chip in for a new printer?",
        },
      ],
      replyCandidates: [
        {
          id: "bartek:printer:rep-1",
          text: "When it worked we printed everything. Onboarding packs, invoices, one whole bookshelf of documentation nobody read. Then it died, we went digital, and productivity went up thirty percent. Which is why nobody has fixed it. It is not broken. It is our most successful automation.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:printer:rep-2",
          text: "Do not touch the naming. Marek named it, the name stuck, and honestly the printer brews about as much as our coffee machine. This office runs on metonyms. Ask the coffee machine how it feels about being load-bearing.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:printer:rep-3",
          text: "Tell the client the materials are 'digital-first for sustainability'. Then send a PDF with the wrong font. The font being wrong is what makes it look official.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:printer:rep-4",
          text: "Who told you that? Was it Janusz? Because Janusz unplugged it in 2019 and has been paying me in silence ever since. That printer stays a mystery. It is the office's only retirement plan.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:printer:rep-5",
          text: "A test page, in 2019. It said 'OK'. It is still the most accurate status report this company has ever produced.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:printer:rep-6",
          text: "We could buy a new printer, or we could keep the current one as a monument. The monument is cheaper, requires zero maintenance, and Grazyna has already amortized it into nostalgia.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:clients",
      label: "Client stories",
      requiresFlags: ["got-acme-contract"],
      optionCandidates: [
        {
          id: "bartek:clients:opt-1",
          topicId: "bartek:clients",
          text: "The ACME manager thinks 'the cloud' is a Microsoft product.",
        },
        {
          id: "bartek:clients:opt-2",
          topicId: "bartek:clients",
          text: "How long have your worst clients actually stayed?",
        },
        {
          id: "bartek:clients:opt-3",
          topicId: "bartek:clients",
          text: "A client asked if AI can just attend the meeting for them.",
        },
        {
          id: "bartek:clients:opt-4",
          topicId: "bartek:clients",
          text: "The client wants a certificate of completion. For a one-day course.",
        },
        {
          id: "bartek:clients:opt-5",
          topicId: "bartek:clients",
          text: "Did you ever lose a client?",
        },
        {
          id: "bartek:clients:opt-6",
          topicId: "bartek:clients",
          text: "What is the most you have ever billed for one slide?",
        },
        {
          id: "bartek:clients:opt-7",
          topicId: "bartek:clients",
          text: "The client underlined the jokes in the contract.",
          tags: ["quest:tutorial-accepted"],
        },
      ],
      replyCandidates: [
        {
          id: "bartek:clients:rep-1",
          text: "Perfect. Those are my favorite clients. You explain the cloud, they nod, and then they describe what they actually want, which is a shared folder. Bill for the cloud. Deliver the folder. Nobody has ever complained.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:clients:rep-2",
          text: "Eleven months. It was a retainer. Retainers turn pain into cashflow. My best client left after one workshop because we fixed everything, which taught me the most important lesson in consulting: never fix everything.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:clients:rep-3",
          text: "Say yes. Take the money, put a chair at the head of the table, and tell them the AI is 'dialing in'. It mutes people at random, which is more than the humans manage.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:clients:rep-4",
          text: "Print them, you say. Ah. The printer. Tell them the certificates are 'in the post'. The post has been 'slow' since 2019. This office has layers, and every layer protects the invoice.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:clients:rep-5",
          text: "Once. A client said our workshop 'created more questions than answers'. That is the PRODUCT. Questions are the top of the funnel for the advanced course. He monopolized the funnel and left. I think about him during quiet quarters.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:clients:rep-6",
          text: "Four hundred an hour, and it said 'synergy'. The client's own brand guidelines demanded the word. I charged extra for the compliance. Invoicing someone's vocabulary back to them is the purest form of the job.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:clients:rep-7",
          text: "Of course they did. The jokes are legally binding in every contract I write. Clause seven is a pun. It has survived three renegotiations. Clients respect what they cannot safely delete.",
          relationshipHint: "pleased",
          tags: ["quest:tutorial-accepted"],
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "bartek:task-fallout",
      title: "PR fallout duty",
      description: "Review Tomek's two-thousand-file pull request before it reaches main again. Bartek calls it a mentorship. It is a fallout shelter.",
      flagToSet: "tomek-reviewed-pr",
      rewardHint: "+Bartek's quiet respect",
    },
    {
      id: "bartek:task-masterclass",
      title: "Lunch masterclass",
      description: "Give up your lunch while Bartek explains 'invoicing for outcomes' over the vending machine's finest. Officially, this never happened.",
      flagToSet: "bartek-shared-consulting-secret",
      rewardHint: "+consulting secrets",
    },
  ],
};

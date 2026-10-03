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
    {
      id: "bartek:invoices",
      label: "The invoice line items",
      optionCandidates: [
        {
          id: "bartek:invoices:opt-1",
          topicId: "bartek:invoices",
          text: "What is the most absurd thing you have invoiced?",
        },
        {
          id: "bartek:invoices:opt-2",
          topicId: "bartek:invoices",
          text: "Is there an art to rounding hours?",
        },
        {
          id: "bartek:invoices:opt-3",
          topicId: "bartek:invoices",
          text: "A client questioned one of my line items.",
        },
        {
          id: "bartek:invoices:opt-4",
          topicId: "bartek:invoices",
          text: "Do you invoice for travel time?",
        },
        {
          id: "bartek:invoices:opt-5",
          topicId: "bartek:invoices",
          text: "What happens when an invoice goes unpaid?",
        },
        {
          id: "bartek:invoices:opt-6",
          topicId: "bartek:invoices",
          text: "Teach me the three-word invoice.",
          tags: ["relationship:warm"],
        },
      ],
      replyCandidates: [
        {
          id: "bartek:invoices:rep-1",
          text: "Two hours of 'ambient awareness'. I attended a meeting, said nothing, and the meeting went well BECAUSE nobody filled the silence. The line item survives in my template to this day. Ambience is a service. Museums charge for it and they do not even attend.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:invoices:rep-2",
          text: "Round to the quarter hour, never to the hour. The quarter is invisible; the hour is a confession. Fifteen minutes of thinking IS work — thinking is where the client's money actually goes, and the invoice simply reports where the time lived.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:invoices:rep-3",
          text: "Never defend a line item. RETITLE it. 'Workshop facilitation' becomes 'stakeholder alignment session' and the question evaporates, because nobody escalates over words they do not understand. The work never changed. The vocabulary did. That is the entire fix.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:invoices:rep-4",
          text: "Travel time is 'knowledge transfer in motion'. The train ride where I listened to two podcasts and read the client's annual report is RESEARCH, and research bills at full rate. I once arrived at a client better informed than their own staff. The travel paid for itself. Literally.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:invoices:rep-5",
          text: "The polite ladder: a reminder, a statement, a friendly call, and then the final email, which is one line — 'per my last'. Nothing frightens an accounts department like a consultant who has stopped being chatty. Silence is the only collection agency I have ever needed.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:invoices:rep-6",
          text: "Since you are in the will: 'Discovery. Ongoing.' Three words, no comma, and the number does the singing. The shorter the line, the bigger the number — the client's imagination bills higher than your hourly rate ever could. This replaces the Loop as my top trade secret. Tell no one.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:bartek-shared-consulting-secret"],
        },
      ],
    },
    {
      id: "bartek:decks",
      label: "Deck aikido",
      optionCandidates: [
        {
          id: "bartek:decks:opt-1",
          topicId: "bartek:decks",
          text: "How many slides does a real deck need?",
        },
        {
          id: "bartek:decks:opt-2",
          topicId: "bartek:decks",
          text: "The client sent their own template.",
        },
        {
          id: "bartek:decks:opt-3",
          topicId: "bartek:decks",
          text: "What goes on the last slide?",
        },
        {
          id: "bartek:decks:opt-4",
          topicId: "bartek:decks",
          text: "Someone fell asleep in my workshop.",
        },
        {
          id: "bartek:decks:opt-5",
          topicId: "bartek:decks",
          text: "Do slide animations ever work?",
        },
        {
          id: "bartek:decks:opt-6",
          topicId: "bartek:decks",
          text: "Can I reuse last year's deck?",
        },
      ],
      replyCandidates: [
        {
          id: "bartek:decks:rep-1",
          text: "Eleven. Ten to talk over and one you refuse to read aloud, because the unread slide is the one they photograph. Twelve is a webinar, nine is a tweet, and thirty is a hostage situation. Eleven has been tested by my entire career and the career is still here.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:decks:rep-2",
          text: "The template is a loyalty test. Use their font, their colors, their logo — and then keep YOUR margins, because margins are where authority lives. I have presented entire strategies inside a client's branding and they approved everything. It felt like their idea. It was my deck.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:decks:rep-3",
          text: "'Next steps' with exactly ONE step. A single step reads as a decision already made; two steps reads as a menu, and menus get argued with. If someone asks what step two is, you say 'step two depends on step one', which is unarguable and slightly profound. I have closed contracts on that sentence.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:decks:rep-4",
          text: "Sleeping means trust. A room that watches you is a room that suspects you; a room that naps has accepted you into the background noise of their life. Wake them gently — ask a question you cannot answer yourself. Vulnerability is the jolt of the industry. Then move on before they remember.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:decks:rep-5",
          text: "One animation per career. Mine is a checkmark that appears after a four-second pause, and I have only used it twice: both times during refund negotiations, both times it worked. Animations are a savings account. Spend yours when the invoice is on the table, never before.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:decks:rep-6",
          text: "Decks age like deadlines: badly, but predictably. Update the dates, swap one verb for 'strategically', and change the example client. Nobody remembers slides; everybody remembers being billed twice for the same deck. We do not do that. We do it once, and then it is 'the framework'.",
          relationshipHint: "neutral",
          tags: ["relationship:warm", "stats:high-credibility"],
        },
      ],
    },
    {
      id: "bartek:mentoring",
      label: "The apprenticeship economics",
      optionCandidates: [
        {
          id: "bartek:mentoring:opt-1",
          topicId: "bartek:mentoring",
          text: "Pawel asked me to mentor him. Am I qualified?",
        },
        {
          id: "bartek:mentoring:opt-2",
          topicId: "bartek:mentoring",
          text: "Tomek pasted something into prod-adjacent code.",
        },
        {
          id: "bartek:mentoring:opt-3",
          topicId: "bartek:mentoring",
          text: "What do I charge for mentoring?",
        },
        {
          id: "bartek:mentoring:opt-4",
          topicId: "bartek:mentoring",
          text: "How do I give feedback that actually lands?",
        },
        {
          id: "bartek:mentoring:opt-5",
          topicId: "bartek:mentoring",
          text: "I taught someone and now they surpass me.",
        },
        {
          id: "bartek:mentoring:opt-6",
          topicId: "bartek:mentoring",
          text: "Marek mentors by silence. Does that work?",
        },
      ],
      replyCandidates: [
        {
          id: "bartek:mentoring:rep-1",
          text: "Qualification is a calendar invite. Say yes, hold the slot, and be two pages ahead of him in the manual. I have mentored people in subjects I learned on the tram ride over. The distance between mentor and mentee is one reusable answer, and you are about to manufacture it.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:mentoring:rep-2",
          text: "Triage, not execution. You cannot stop the pasting — the internet is load-bearing now. Teach retrieval: 'find it, understand it, rename it'. If he renames the variables, the paste becomes his. If he does not, main becomes a museum of other people's work. We already have one museum; it is called the wiki.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:mentoring:rep-3",
          text: "Nothing. Mentoring is invoiced in favors, and favors compound at a rate HR cannot audit. The intern you coach today books you the conference slot in 2028. I once explained a pivot table to a junior who now signs off my invoices. Coincidence? The invoice says no.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:mentoring:rep-4",
          text: "Feedback is a question wearing a gift. Never 'you did this wrong' — always 'what would happen if'. The first starts a defense, the second starts a thought, and a person who arrives at your answer by themselves will defend it with their life. Free labor for the right cause, essentially.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:mentoring:rep-5",
          text: "That is the exit milestone. A mentor whose student surpasses him has finished the product and shipped it. Be proud, then reposition: senior people do not compete with their students, they CONSULT to them. Bill double. Gratitude has the highest margin of any emotion in this building.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:mentoring:rep-6",
          text: "Silence mentoring only works when the silence is monitored. Marek watches you struggle, and the watching IS the lesson — you leave knowing he knows you know. With anyone else it is neglect. With Marek it is pedagogy. Do not copy it unless you can also glower like a firewall.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "bartek:conferences",
      label: "The talk circuit",
      optionCandidates: [
        {
          id: "bartek:conferences:opt-1",
          topicId: "bartek:conferences",
          text: "Should I speak at a conference?",
        },
        {
          id: "bartek:conferences:opt-2",
          topicId: "bartek:conferences",
          text: "My talk got accepted. Panic now?",
        },
        {
          id: "bartek:conferences:opt-3",
          topicId: "bartek:conferences",
          text: "Nobody laughed at my conference joke.",
        },
        {
          id: "bartek:conferences:opt-4",
          topicId: "bartek:conferences",
          text: "They want me to speak for free. For exposure.",
        },
        {
          id: "bartek:conferences:opt-5",
          topicId: "bartek:conferences",
          text: "What is your speaker fee, actually?",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:conferences:opt-6",
          topicId: "bartek:conferences",
          text: "Someone filmed my talk without asking.",
        },
      ],
      replyCandidates: [
        {
          id: "bartek:conferences:rep-1",
          text: "Once. Exactly once, because a talk is an invoice addressed to the entire room. Forty people hear you be right for thirty minutes and a percentage of them call their boss. One of those calls becomes a retainer. I have measured this. The retainer-to-punchline ratio is beautiful.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:conferences:rep-2",
          text: "Panic is preparation with worse posture. The talk has three beats: a problem everyone has, the triangle applied, and hope with a timeline. Rehearse once in an empty room, once to Burek, and never to a mirror — mirrors make you perform, dogs make you honest.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:conferences:rep-3",
          text: "The joke was never for the room — it was for the recording. Laughter is live-only content; the clip needs the JOKE to exist so the editors can cut around it. Some of my best lines died in silent rooms and killed in the highlight reel. Grieve quickly and post the clip.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:conferences:rep-4",
          text: "Exposure is a currency, and like all currencies it has one official exchange rate: one workshop, invoiced. Say yes to the free talk, attend, be brilliant, and then invoice the ORGANIZER's employer for the workshop their staff will beg for. The system funds itself. It has funded mine for years.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:conferences:rep-5",
          text: "Between us: my fee is whatever the client's last invoice to us was, plus eleven percent. It sounds arbitrary. It is ARBITRAGE. They never notice the number, they notice the confidence, and the eleven percent covers the slides. You did not hear this. The slides never existed.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:bartek-shared-consulting-secret"],
        },
        {
          id: "bartek:conferences:rep-6",
          text: "That is not theft, that is distribution. Reply with a thank you, a correction for one slide, and an invoice for the slide deck. Half the time they pay it — paying for the deck is cheaper than admitting they filmed you. Either outcome is a win and neither requires anger before coffee.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:vending",
      label: "Vending machine diplomacy",
      optionCandidates: [
        {
          id: "bartek:vending:opt-1",
          topicId: "bartek:vending",
          text: "The vending machine ate my coin again.",
        },
        {
          id: "bartek:vending:opt-2",
          topicId: "bartek:vending",
          text: "What is the diplomatic way to take the last crisps?",
        },
        {
          id: "bartek:vending:opt-3",
          topicId: "bartek:vending",
          text: "Zosia proposed a snack inclusion initiative.",
        },
        {
          id: "bartek:vending:opt-4",
          topicId: "bartek:vending",
          text: "Is the vending machine cheaper than the coffee?",
        },
        {
          id: "bartek:vending:opt-5",
          topicId: "bartek:vending",
          text: "I bought Burek a treat from the machine.",
        },
        {
          id: "bartek:vending:opt-6",
          topicId: "bartek:vending",
          text: "What does the vending machine say about us?",
          tags: ["stats:low-caffeine", "period:afternoon"],
        },
      ],
      replyCandidates: [
        {
          id: "bartek:vending:rep-1",
          text: "The machine keeps a ledger and the ledger is never wrong. It is owed, and it collects with the patience of a company that has never once discounted. Feed it exact change, thank it out loud, and never shake it — the last person who shook it now buys rounds for the office. Ask around. Nobody will say who.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:vending:rep-2",
          text: "Eleven fifty-eight, before the lunch crowd forms opinions. Take them, walk away at a normal speed, and eat them at your desk with the face of a person who has bought nothing. Guilt is the only evidence this office has ever prosecuted. The stairs witness everything, so use the corridor.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:vending:rep-3",
          text: "An initiative implies a deck, and the machine has operated for eleven years without asking anyone for a single slide. It is the most self-sufficient employee we have. I will support the initiative in the meeting and bury it in the follow-up, which is what 'alignment' is actually for.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:vending:rep-4",
          text: "Cheaper, yes. Braver, no. The machine sells you exactly what the picture shows, at the price on the button, in under nine seconds. The coffee machine makes you WAIT while it decides your future. I trust the vending machine the way I trust an invoice: fully, and only because it is itemized.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:vending:rep-5",
          text: "Then you have made an investment the stock market cannot match. Burek's economy runs on treats and attention, and its exchange rate makes my retainers look sentimental. He will now audit for you first. Marek pays for that privilege in walks. You got it for one vending machine. Well played.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:vending:rep-6",
          text: "Look at the empty rows. Row three — the decent crisps — sells out by eleven. Row seven — the raisins — has never moved. The machine is a morale graph with a coin slot, and we are the raisins if we are not careful. That is why you are tired. The office agrees with you, row by row.",
          relationshipHint: "neutral",
          tags: ["stats:low-caffeine", "period:afternoon"],
        },
      ],
    },
    {
      id: "bartek:escalations",
      label: "The escalation calls",
      optionCandidates: [
        {
          id: "bartek:escalations:opt-1",
          topicId: "bartek:escalations",
          text: "A client escalated to Dawid. About me.",
        },
        {
          id: "bartek:escalations:opt-2",
          topicId: "bartek:escalations",
          text: "The client is shouting. Which voice do I use?",
        },
        {
          id: "bartek:escalations:opt-3",
          topicId: "bartek:escalations",
          text: "Should I apologize for the outage?",
        },
        {
          id: "bartek:escalations:opt-4",
          topicId: "bartek:escalations",
          text: "They threatened to leave us.",
        },
        {
          id: "bartek:escalations:opt-5",
          topicId: "bartek:escalations",
          text: "Dawid took the call and sold an upgrade.",
        },
        {
          id: "bartek:escalations:opt-6",
          topicId: "bartek:escalations",
          text: "How do you end an escalation call?",
        },
      ],
      replyCandidates: [
        {
          id: "bartek:escalations:rep-1",
          text: "Escalation is a redirect, not a verdict. Dawid will align them, I will align the invoice, and your job is the timeline: one page, timestamps, no adjectives. Documentation is the only armor that survives an escalation, and it conveniently also proves you were the calmest person in the file.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:escalations:rep-2",
          text: "The apology voice: half your usual speed, one octave down. Shouting is an auction and volume is a bid — refuse to bid. The slower voice makes them slow down to understand you, and by the third sentence they are matching YOUR pace. I have de-escalated entire boardrooms with punctuation alone.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:escalations:rep-3",
          text: "Apologize for the impact, never the code. The code has a family, the code has a git history, and the code will be reviewed by people who were not on the call. 'I am sorry your team lost the morning' survives. 'I am sorry we shipped it' becomes an exhibit. Words outlive incidents. Choose them like invoices.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:escalations:rep-4",
          text: "A threat to leave is a negotiation opening wearing a coat. Nobody who has already decided says so out loud — decided clients send lawyers, and lawyers do not threaten, they invoice. Book the retention lunch. Bring the triangle. The triangle has saved more accounts than the product ever has.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:escalations:rep-5",
          text: "Escalation is sales in a hi-vis vest. The client came to yell about uptime and left owning more uptime, sold to them by the man they trusted enough to yell at. Dawid does not defuse situations. He REPRICES them. Watch the call recording if he ever makes one. He will not. The skill does not survive documentation.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:escalations:rep-6",
          text: "Book the follow-up before the goodbyes. An ending without a calendar is a rumor, and rumors get re-litigated; an ending with a date is a plan, and plans make people feel heard. Summarize in one sentence, agree the date, hang up FIRST. He who hangs up first, invoices calm.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:estimates",
      label: "The estimation game",
      optionCandidates: [
        {
          id: "bartek:estimates:opt-1",
          topicId: "bartek:estimates",
          text: "How long will this training build take?",
        },
        {
          id: "bartek:estimates:opt-2",
          topicId: "bartek:estimates",
          text: "My estimate was off by a factor of three.",
        },
        {
          id: "bartek:estimates:opt-3",
          topicId: "bartek:estimates",
          text: "Can I pad an estimate ethically?",
        },
        {
          id: "bartek:estimates:opt-4",
          topicId: "bartek:estimates",
          text: "The client set the deadline before the scope.",
        },
        {
          id: "bartek:estimates:opt-5",
          topicId: "bartek:estimates",
          text: "When do I admit an estimate is wrong?",
        },
        {
          id: "bartek:estimates:opt-6",
          topicId: "bartek:estimates",
          text: "What is the real estimation formula?",
          tags: ["relationship:warm", "quest:bartek-shared-consulting-secret"],
        },
      ],
      replyCandidates: [
        {
          id: "bartek:estimates:rep-1",
          text: "Take whatever number you just said in your head, double it, and add a workshop. The doubling is for reality; the workshop is for morale, yours and theirs. An estimate is not a measurement, it is a down payment on a conversation. The conversation is also billable, which is the elegant part.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:estimates:rep-2",
          text: "A factor of three is a rounding error with confidence. Nobody has ever gone to prison for an optimistic estimate; they have gone to bankruptcy. Reframe it in the retro as 'scope discovery' and it becomes a deliverable: you DISCOVERED the true size. Discovery is billable. You basically prepaid.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:estimates:rep-3",
          text: "Padding is not a sin, it is a contingency, and contingencies are professional. Call it what it is on the form — 'risk buffer' — and the ethics committee of your mind can stand down. The client who never needed the buffer thinks you are efficient. The client who needed it thinks you are psychic. Win twice.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:estimates:rep-4",
          text: "Deadline-first means the scope is a surprise party and you are the venue. Respond in writing: 'deliverable by that date: version one'. The words 'version one' are load-bearing — they promise a future, they commit to nothing, and they have saved my weekends more than any boundary speech ever has.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:estimates:rep-5",
          text: "The day you know, not the day it shows. An estimate corrected early is a professional updating a forecast; the same correction a week later is an apology tour. Early admissions compound into trust, and trust is the only asset in this building that appreciates without a spreadsheet.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:estimates:rep-6",
          text: "The formula, mentor-rate: base it on the LAST similar job, add the coefficient of the new client's optimism, then round to a number ending in five because it looks calculated rather than guessed. The rounding is psychology. All of estimation is psychology wearing a calculator. Now you owe me a coffee too.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:bartek-shared-consulting-secret"],
        },
      ],
    },
    {
      id: "bartek:fridays",
      label: "Friday afternoon folklore",
      optionCandidates: [
        {
          id: "bartek:fridays:opt-1",
          topicId: "bartek:fridays",
          text: "Is Friday afternoon safe for big changes?",
        },
        {
          id: "bartek:fridays:opt-2",
          topicId: "bartek:fridays",
          text: "Everyone's out-of-office is on. Should I work?",
        },
        {
          id: "bartek:fridays:opt-3",
          topicId: "bartek:fridays",
          text: "Is there an end-of-week ritual here?",
        },
        {
          id: "bartek:fridays:opt-4",
          topicId: "bartek:fridays",
          text: "I broke something at 4pm on a Friday.",
        },
        {
          id: "bartek:fridays:opt-5",
          topicId: "bartek:fridays",
          text: "Do you actually rest on weekends?",
        },
        {
          id: "bartek:fridays:opt-6",
          topicId: "bartek:fridays",
          text: "Monday morning. What survived?",
        },
      ],
      replyCandidates: [
        {
          id: "bartek:fridays:rep-1",
          text: "Safety is a Tuesday concept. On a Friday afternoon, 'safe' means the blast radius is asleep and the rollback is Monday's problem, which is exactly how Marek likes his deploys and exactly how I like my invoices. Nothing shipped on Friday dies on Friday. It dies on Monday, with witnesses.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:fridays:rep-2",
          text: "Work, yes — but visibly. The empty office amplifies presence by a factor of the absentee rate. Be at your desk with coffee and a focused face at three, and the ONE person who comes back for a forgotten charger reports you as 'the backbone of this place'. Visibility is cheapest when nobody can verify it.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:fridays:rep-3",
          text: "Four forty-five: the shutdown playlist. Marek pretends not to hear it, Janusz harmonizes with the vacuum, and whoever complains loudest is having the worst week and gets the first coffee Monday. Rituals do not need permission. They need witnesses, a start time, and absolutely no documentation.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:fridays:rep-4",
          text: "Congratulations, you have a Monday project and a weekend narrative. Log it, label it 'known issue, fix scheduled', and close the laptop with intention. Do not fix it at eleven pm in a hoodie — that fix is how heroes are made and how weekends are lost. The office reopens. The guilt should not.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:fridays:rep-5",
          text: "Rest is invoicing yourself at zero, and I am excellent at zero because I price it deliberately. Saturday is offline by design: no email, no decks, one glance at main — a glance, not a review. Sunday evening the dread arrives on schedule and I welcome it like a retainer. Boundaries, but booked.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:fridays:rep-6",
          text: "The Monday triage, in order: coffee, tickets, grievances. Coffee first because the tickets lie less on caffeine, tickets second because the grievances amplify them, grievances last because by then half of them have resolved themselves over the weekend, which is the only miracle this office performs regularly.",
          relationshipHint: "pleased",
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

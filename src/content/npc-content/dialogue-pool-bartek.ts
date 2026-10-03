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
    {
      id: "bartek:scope-creep",
      label: "Scope creep",
      optionCandidates: [
        { id: "bartek:scope-creep:opt-1", topicId: "bartek:scope-creep", text: "The client added 'one small thing' to the scope." },
        { id: "bartek:scope-creep:opt-2", topicId: "bartek:scope-creep", text: "How do I spot scope creep before it eats me?" },
        { id: "bartek:scope-creep:opt-3", topicId: "bartek:scope-creep", text: "Scope creep absorbed my Friday. Invoice it?" },
        { id: "bartek:scope-creep:opt-4", topicId: "bartek:scope-creep", text: "The client calls scope creep 'collaboration'." },
        { id: "bartek:scope-creep:opt-5", topicId: "bartek:scope-creep", text: "When does a favor become unpaid work?" },
        { id: "bartek:scope-creep:opt-6", topicId: "bartek:scope-creep", text: "The scope doc has a line called 'etcetera'." },
      ],
      replyCandidates: [
        {
          id: "bartek:scope-creep:rep-1",
          text: "One small thing is a trojan noun. The reply is free and rehearsed: 'Happy to — here is what it touches and here is the change order.' You are not refusing. You are pricing. Clients respect a man with a form. The form is the boundary and the boundary is the friendship. Both survive.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:scope-creep:rep-2",
          text: "Scope creep arrives as vocabulary, not tasks — listen for 'while you are in there', 'quick question', and my favorite, 'the team assumed'. Each phrase is an unpaid line item asking politely. I keep a notebook of trigger phrases. It is worth more than the contract. It is the contract's immune system.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:scope-creep:rep-3",
          text: "Invoice it, kindly, under 'change request — absorbed as goodwill' at half rate, and mention it once, lightly. The client learns the favor had a price without feeling ambushed. Goodwill you can see is trust. Goodwill you cannot see is a discount with no memory. Invoice the memory.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:scope-creep:rep-4",
          text: "Then collaboration has a definition problem. My counter is the whiteboard version: two columns, 'agreed scope' and 'collaboration', and we sort every request live. The exercise is gentle, brutal, and over in fifteen minutes. Nobody argues with their own handwriting once it is in a column. Columns end wars.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:scope-creep:rep-5",
          text: "The moment it has a deadline. Favors float; deadlines are hooks. The test I teach: would you do this on your birthday? If yes, it is a relationship. If no but you are doing it anyway, it is a project, and projects get paper. Send the one-line confirmation email. The email is the boundary wearing a smile.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:scope-creep:rep-6",
          text: "Then the contract is a Ouija board. Etcetera means 'whatever we feel like later' and it will be quoted at you in month three. The fix is one amendment: 'etcetera refers to items listed in annex two'. Make the annex a living list. Now the vagueness has a home and the home has a lock. Ambiguity dies in annexes.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "bartek:client-travel",
      label: "Client-site travel",
      optionCandidates: [
        { id: "bartek:client-travel:opt-1", topicId: "bartek:client-travel", text: "First client-site visit. What do I pack?" },
        { id: "bartek:client-travel:opt-2", topicId: "bartek:client-travel", text: "The client is two hours away. Day trip or overnight?" },
        { id: "bartek:client-travel:opt-3", topicId: "bartek:client-travel", text: "How early is too early for the client visit?" },
        { id: "bartek:client-travel:opt-4", topicId: "bartek:client-travel", text: "The client's office has a dress code. Detect it?" },
        { id: "bartek:client-travel:opt-5", topicId: "bartek:client-travel", text: "Client travel expenses — what flies with Grazyna?" },
        { id: "bartek:client-travel:opt-6", topicId: "bartek:client-travel", text: "What do you actually do on the drive home?" },
      ],
      replyCandidates: [
        {
          id: "bartek:client-travel:rep-1",
          text: "Chargers, business cards, one printed deck in case their projector hates the cloud, and a paperback. The paperback is the prop — a man reading in the lobby is a man with a full calendar. Never arrive busy-looking and desperate. Arrive busy-looking and calm. The bag carries tools. The face carries the invoice.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:client-travel:rep-2",
          text: "Day trip if the meeting is under four hours, overnight if it is over — the marginal hour of travel costs more than the hotel's dignity premium. My rule: never present at four pm after a two-hour drive. Tired consultants discount themselves. Rested ones invoice. The hotel is not a cost. It is a margin-protector.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:client-travel:rep-3",
          text: "Fifteen minutes early is professional. Thirty is a stakeout. I sit in the car for the difference, review the deck, and walk in at the fifteen. The lobby wait teaches the receptionist your face, which is fine, but it teaches the CLIENT your patience, which is negotiable. Patience is billed hourly. Guard it.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:client-travel:rep-4",
          text: "Detect by the shoes in the lobby photo on their website, then pack one level above. The diagnostic is whoever greets you: if they are in jeans, the blazer comes off before coffee. If they are in suits, you keep the jacket through lunch and suffer handsomely. Mimicry plus ten percent. That is the whole travel wardrobe.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:client-travel:rep-5",
          text: "Train tickets, hotel, and one meal a day — everything else is a story for the red pen. The rule I follow: every expense must be explainable to Grazyna in one sentence without the word 'basically'. 'Taxi to client, meeting at nine' passes. 'Taxi, basically raining' dies. Her pen is the finest expense policy ever written.",
          relationshipHint: "annoyed",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "bartek:client-travel:rep-6",
          text: "Two things: the voice memo of everything I agreed to but did not write down, and thirty minutes of silence with the radio off. The drive home is where the meeting's truth surfaces — the real objection, the unasked question, the follow-up that will actually close. Debrief the brain before the road.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:email-tone",
      label: "The email register",
      optionCandidates: [
        { id: "bartek:email-tone:opt-1", topicId: "bartek:email-tone", text: "The client emails at midnight. Reply when?" },
        { id: "bartek:email-tone:opt-2", topicId: "bartek:email-tone", text: "How do you say no in an email without saying no?" },
        { id: "bartek:email-tone:opt-3", topicId: "bartek:email-tone", text: "Is 'per my last email' consultant-grade or peasant?" },
        { id: "bartek:email-tone:opt-4", topicId: "bartek:email-tone", text: "The client's email has three exclamation marks." },
        { id: "bartek:email-tone:opt-5", topicId: "bartek:email-tone", text: "What goes in the subject line of a real email?" },
        { id: "bartek:email-tone:opt-6", topicId: "bartek:email-tone", text: "Teach me the eleven-word email." },
      ],
      replyCandidates: [
        {
          id: "bartek:email-tone:rep-1",
          text: "Never the same night — a midnight reply trains the client that you live in the inbox, and training is permanent. Draft it at midnight if the anxiety demands, schedule for 8:30. The eight-hour delay reads as a man with a life and a process. Both are expensive. Act expensive.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:email-tone:rep-2",
          text: "With a question. 'No' invites negotiation; 'which of these two priorities should move to make room?' invites geometry. The client answers their own no and thanks you for the structure. The best refusals are mirrors wearing calendars. I have said no four hundred times and never once written the word.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:email-tone:rep-3",
          text: "Consultant-grade, once per contract, on the load-bearing thread. It translates to 'the receipts are assembled' and it ends loops that would otherwise outlive the project. More than once per contract and you are a bureaucrat. The phrase is a fire axe. Fire axes are for fires, not for doors.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:email-tone:rep-4",
          text: "Never match — exclamation marks are contagious and someone must hold the cure. One period, one verb, one deadline. The three-mark email is a mood; your reply is a contract. The register gap is the message: I am calm, the project is calm, and your exclamation marks have been gently absorbed.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:email-tone:rep-5",
          text: "The deliverable and the date, in that order. 'Workshop slides — Thursday 15:00' beats 'quick question' the way a signed contract beats a handshake. The subject line is the invoice's header. Clients file by it, lawyers search it, and future you retrieves it at midnight in a panic. Write it for the panic.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:email-tone:rep-6",
          text: "Six words of answer, four of next step, one of thanks. 'Confirmed for Tuesday. Agenda attached. One change: start at ten. Thank you.' Eleven words, zero adjectives, one decision. The eleven-word email is the consultant's haiku — it respects the reader's inbox and proves the writer's rate. Practice on internal mail first.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:first-client",
      label: "The first client",
      optionCandidates: [
        { id: "bartek:first-client:opt-1", topicId: "bartek:first-client", text: "Your first client. The story, mentor rate." },
        { id: "bartek:first-client:opt-2", topicId: "bartek:first-client", text: "What did you charge your first client?" },
        { id: "bartek:first-client:opt-3", topicId: "bartek:first-client", text: "Would you take that first client back today?" },
        { id: "bartek:first-client:opt-4", topicId: "bartek:first-client", text: "The first client sent Christmas cards for years?" },
        { id: "bartek:first-client:opt-5", topicId: "bartek:first-client", text: "What did the first client teach that courses cannot?" },
        { id: "bartek:first-client:opt-6", topicId: "bartek:first-client", text: "Where is the first client now?" },
      ],
      replyCandidates: [
        {
          id: "bartek:first-client:rep-1",
          text: "A bakery, two hundred zloty, and an Excel workshop I was one page ahead of teaching. I prepared for eleven hours for two hours of class. The ratio was insane and the lesson was permanent: preparation is the only discount worth giving. The bakery got a consultant at intern prices. I got the habit that became a career.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:first-client:rep-2",
          text: "Two hundred, and it was too much and not enough — too much because I would have paid THEM for the confidence, not enough because the price taught the client my time was real. The number is not the wage, it is the frame. Charge something. Nothing teaches value like a number on an invoice. Free advice arrives defective.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:first-client:rep-3",
          text: "Tomorrow, at ten times the rate, with a better deck and the same humility. The bakery does not need me anymore — they run circles around their spreadsheets now, which is the only outcome a consultant should want. The best first clients fire you politely. That is the graduation. I keep the card. The card is the diploma.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:first-client:rep-4",
          text: "Fifteen years of cards, signed by the whole staff, and the fifteenth one had a line that undid me: 'you are why the lights stay on'. It lives in the drawer with the invoice stubs. Clients forget invoices. They remember who taught them the thing that stuck. The card is the real invoice. It cleared in full.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:first-client:rep-5",
          text: "That the expert is the one who has read the manual and the client is the one who has read the ROOM. My slides were perfect and useless; their manager's one question was worth a quarter of consulting. Listen at the client's frequency first. Translate later. The manual does not have their accent. Only the room does.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:first-client:rep-6",
          text: "Three bakeries and a wholesale account, which is what a training client becomes when the training works. Their eldest runs the books now. She emails me a question every few years, always good, always at Christmas. The first client is the longest relationship in this business. The invoices end. The referrals do not.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:espresso",
      label: "The espresso diplomacy",
      optionCandidates: [
        { id: "bartek:espresso:opt-1", topicId: "bartek:espresso", text: "The client offered coffee. The machine is terrible." },
        { id: "bartek:espresso:opt-2", topicId: "bartek:espresso", text: "You brought your own beans to a client. Bold?" },
        { id: "bartek:espresso:opt-3", topicId: "bartek:espresso", text: "Coffee before the pitch or after?" },
        { id: "bartek:espresso:opt-4", topicId: "bartek:espresso", text: "The client's assistant makes the coffee. Notice?" },
        { id: "bartek:espresso:opt-5", topicId: "bartek:espresso", text: "Two coffees in, the client gets loose-lipped. Use?" },
        { id: "bartek:espresso:opt-6", topicId: "bartek:espresso", text: "What espresso order says 'expert'?" },
      ],
      replyCandidates: [
        {
          id: "bartek:espresso:rep-1",
          text: "Sip, smile, and compliment something TRUE — the cup, the warmth, the gesture. The coffee is a test of hospitality, not taste, and the consultant who critiques the machine has critiqued the kitchen and the character in one sip. I have drunk conference-center coffee with the gratitude of a man being honored.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:espresso:rep-2",
          text: "Once, for a three-day workshop, as a 'workshop kit' with cups for everyone — shared beans are hospitality, private beans are a statement. The kit closed more ice than any icebreaker I have written. The rule: bring enough for the room or bring nothing. Generosity travels. Snobbery commutes.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:espresso:rep-3",
          text: "Before, always, and never during — the coffee is the pre-meeting, and the pre-meeting is where the real agenda leaks. Fifteen minutes over a bad machine will tell you more than the first four slides. After is for celebration and celebration is for invoices. Pitch during caffeine. Close on water.",
          relationshipHint: "neutral",
          tags: ["period:morning"],
        },
        {
          id: "bartek:espresso:rep-4",
          text: "By name, by day three, and with one genuine question about how the machine works. The assistant runs the building, and the consultant who is kind to the gatekeeper gets the calendar nobody else can reach. Also — this is not cynicism — the assistant knows what the client actually thinks. Coffee with the assistant is research.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:espresso:rep-5",
          text: "Use it for the relationship, never the invoice. Loose-lipped clients reveal the real budget, the internal politics, the true deadline — all of it goes in the notebook, none of it goes into the pricing that visit. The second meeting prices honestly. A man who raises his rate over loosened lips drinks alone.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:espresso:rep-6",
          text: "Whatever they are having, plus water. The expert order is the invisible one — no oat-milk aria, no decaf controversy, no ten-minute negotiation with the barista. The client should remember your question, not your beverage. I order the house coffee everywhere. The house coffee says 'I am here for you, not for the bean'.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:leverage",
      label: "Words that bill",
      optionCandidates: [
        { id: "bartek:leverage:opt-1", topicId: "bartek:leverage", text: "Consultants have twenty words for one thing. Teach?" },
        { id: "bartek:leverage:opt-2", topicId: "bartek:leverage", text: "Is 'leverage' banned, billable, or both?" },
        { id: "bartek:leverage:opt-3", topicId: "bartek:leverage", text: "The client loves jargon. Match it or translate?" },
        { id: "bartek:leverage:opt-4", topicId: "bartek:leverage", text: "Which word raises its rate the most?" },
        { id: "bartek:leverage:opt-5", topicId: "bartek:leverage", text: "You invented a term. It stuck. Confess." },
        { id: "bartek:leverage:opt-6", topicId: "bartek:leverage", text: "How do I de-jargon my own writing?" },
      ],
      replyCandidates: [
        {
          id: "bartek:leverage:rep-1",
          text: "The trick is not vocabulary, it is VARIATION — one idea, three outfits. 'Improve', 'optimize', and 'unlock' are the same verb in different suits, and the client hears progress in the wardrobe. I keep a thesaurus next to the rate card. Both are pricing tools. The dictionary is where the margin lives.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:leverage:rep-2",
          text: "Both, in the classic consultant paradox. It is banned in my writing and billable in my decks — the deck says 'leverage synergies', the appendix says 'use their sales team for our onboarding'. The jargon is the envelope. The appendix is the letter. Clients open envelopes. Read the letter, bill the envelope.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:leverage:rep-3",
          text: "Match, then translate — speak their dialect for two minutes, then say 'in plain terms' and land the sentence. The matching buys membership; the translating buys trust. A consultant who only translates sounds like a critic. A consultant who only matches sounds like a mirror. The fee lives between the two.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:leverage:rep-4",
          text: "'Strategic.' It converts any sentence into an invoice. 'We will look at the printer' is maintenance. 'A strategic review of print infrastructure' is a Thursday in another city. The word adds nothing and costs four hundred an hour. I use it with reverence and it has never once been questioned. Reverence is the tell.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:leverage:rep-5",
          text: "'The Efficiency Ledger' — a spreadsheet of time wasted per meeting, which I present as a gift and upsell as a program. I named it after the third client asked for 'something with a name'. Names are handles. Clients cannot buy a concept. They can buy a handle. Name everything. The naming is the product.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:leverage:rep-6",
          text: "Read it aloud to a friend outside the industry and mark every word they squint at. Each squint is a cliche with a passport — deport it and replace with the plainest sentence that survives. Plain is not cheap. Plain is expensive to write. Jargon is the discount rack of writing. Pay full price in words, charge full price in hours.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:mentees",
      label: "The mentee alumni",
      optionCandidates: [
        { id: "bartek:mentees:opt-1", topicId: "bartek:mentees", text: "Where do your old mentees end up?" },
        { id: "bartek:mentees:opt-2", topicId: "bartek:mentees", text: "A former mentee out-earns you now. Feelings?" },
        { id: "bartek:mentees:opt-3", topicId: "bartek:mentees", text: "You mentor for equity in people. Explain that." },
        { id: "bartek:mentees:opt-4", topicId: "bartek:mentees", text: "The mentee who never made it. Do you carry it?" },
        { id: "bartek:mentees:opt-5", topicId: "bartek:mentees", text: "How many mentees is too many?" },
        { id: "bartek:mentees:opt-6", topicId: "bartek:mentees", text: "What do you ask of mentees in return?" },
      ],
      replyCandidates: [
        {
          id: "bartek:mentees:rep-1",
          text: "Everywhere useful — two run training departments, one teaches at the university, one sells software to the office that fired her. The alumni network is the real product of mentoring and nobody can invoice it, which is why it is worth more than anything I can. The org chart forgets you. The alumni never do.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:mentees:rep-2",
          text: "Then the product shipped and the milestone is MINE to celebrate, not to envy. I keep a list titled 'people who bill more than me' and it is the proudest spreadsheet in my possession. A mentor who resents the mentee's rate was never mentoring. He was franchising. I am not a franchise. I am a garden. Gardens are proud of the tall ones.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:mentees:rep-3",
          text: "I invest time like equity and expect the same return: growth, paid forward. My fee to every mentee is one clause — teach someone within three years. The debt is transferable, never forgivable, and the interest is paid in other people's careers. Half my alumni are mentors now. The portfolio compounds. Nobody audits it.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:mentees:rep-4",
          text: "I carry two, and both taught me the same lesson: you cannot want it more than they do. Mentoring a person who is not ready to move is invoicing a client who never signed. I still write them once a year. Not to collect. To leave the door visibly open. Doors left open cost nothing and get used in year five. Twice so far.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:mentees:rep-5",
          text: "More than three active is a newsletter, not a mentorship. Attention is the entire product and attention does not scale — the one lesson the consulting industry refuses to learn about its own people. Three mentees, met monthly, each with one live problem. The fourth waits a quarter. The queue is a feature. Scarcity is respect.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:mentees:rep-6",
          text: "One thing, once a year: tell me the truth about my blind spots, in writing, unsigned if needed. The fee flows both directions or it is charity, and charity makes bad mentors. My alumni have corrected my pricing, my slides, and once my attitude — all anonymously, all correctly. The reverse-mentorship is why they surpass me.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "bartek:hotel-points",
      label: "The hotel points",
      optionCandidates: [
        { id: "bartek:hotel-points:opt-1", topicId: "bartek:hotel-points", text: "You optimize hotel points. Consultant cliche?" },
        { id: "bartek:hotel-points:opt-2", topicId: "bartek:hotel-points", text: "The hotel chain knows your pillow. Concerning?" },
        { id: "bartek:hotel-points:opt-3", topicId: "bartek:hotel-points", text: "Points or cashback — settle it forever." },
        { id: "bartek:hotel-points:opt-4", topicId: "bartek:hotel-points", text: "Best hotel bar for a solo client debrief?" },
        { id: "bartek:hotel-points:opt-5", topicId: "bartek:hotel-points", text: "The front desk upgraded you unprompted. Why?" },
        { id: "bartek:hotel-points:opt-6", topicId: "bartek:hotel-points", text: "What does the points balance say about a career?" },
      ],
      replyCandidates: [
        {
          id: "bartek:hotel-points:rep-1",
          text: "A cliche is a truth that traveled. The points are the only pension a consultant's travel ever earns — the client bills the room, the chain bills the loyalty, and the difference compounds into December. My December has been funded by points since 2016. The cliche paid for my mother's kitchen. Let them laugh at the funding.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:hotel-points:rep-2",
          text: "The chain knows the pillow, the floor, and the eleven-minute check-in, and I know their fire escape, which makes us even. Concern is for people with nothing to optimize. A man who is known by his hotel is a man with a mobile office. The pillow is infrastructure. I have named it. The name is not your business.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:hotel-points:rep-3",
          text: "Points, and it is not close — cashback is a discount, points are LEVERAGE. Cashback buys groceries. Points buy the upgrade that puts the client meeting in a quiet lounge instead of a lobby. I have closed deals in lounges bought with points. No grocery run ever closed anything. Settled, forever, on the record.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:hotel-points:rep-4",
          text: "Any bar with sightlines to the entrance and one good corner table. The debrief needs three things: distance from the lobby's ears, a table that hides the notebook, and one drink the bartender makes without being told. By night two they make it. The bar becomes the office. The office had terrible coffee anyway.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:hotel-points:rep-5",
          text: "Because I am the guest who tips the housekeeping, learns three names, and never yells about the wifi — upgrades are not luck, they are INVOICES for good behavior, paid by the hotel at rates the client never sees. Be the guest the staff bets on. The bet pays in corner rooms. Corner rooms have better wifi and worse parties.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:hotel-points:rep-6",
          text: "That you chose hotels near the work instead of near the charm. A high balance is not a flex — it is a map of every Tuesday spent in a city that was not home, converting distance into someone's training. My balance says forty cities and one marriage that survived it. The points are the receipt. Receipts add up.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "bartek:demo-fails",
      label: "Demo disasters",
      optionCandidates: [
        { id: "bartek:demo-fails:opt-1", topicId: "bartek:demo-fails", text: "Your worst live demo. The full story." },
        { id: "bartek:demo-fails:opt-2", topicId: "bartek:demo-fails", text: "The wifi died mid-demo. Recovery?" },
        { id: "bartek:demo-fails:opt-3", topicId: "bartek:demo-fails", text: "A client's CEO walked in late and hostile. Save?" },
        { id: "bartek:demo-fails:opt-4", topicId: "bartek:demo-fails", text: "The demo revealed a bug we did not know. Now?" },
        { id: "bartek:demo-fails:opt-5", topicId: "bartek:demo-fails", text: "Should demos be recorded? Always?" },
        { id: "bartek:demo-fails:opt-6", topicId: "bartek:demo-fails", text: "What does a perfect demo actually look like?" },
      ],
      replyCandidates: [
        {
          id: "bartek:demo-fails:rep-1",
          text: "2018: the projector showed my desktop, and my desktop showed a folder named 'CLIENTS WHO PAY LATE'. The room went quiet in a way I have paid tuition to never repeat. I renamed the folder live, to 'CLIENTS: PRIORITY QUEUE', and pitched through it. We signed. The folder taught me more than the deck.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:demo-fails:rep-2",
          text: "With paper — I travel with printed slides for exactly this, and the pivot line is rehearsed: 'the cloud can wait; the content cannot'. Presenting from paper is a flex if you own it and a failure if you apologize. I have presented from paper twice. Both times the client remembered the PAPER. Own the pivot.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:demo-fails:rep-3",
          text: "Hand him the remote. The hostile CEO wants control, not content — I say 'you drive, I will narrate', and the room reorganizes around a gift. He clicks, the demo works, and the walk-in becomes a co-presenter. Hostility is unspent authority. Hand it something to be authoritative ABOUT. Works on boards and toddlers alike.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:demo-fails:rep-4",
          text: "Then the demo did its job — a bug found in front of one client is a bug found before ten thousand. The script: 'you found it faster than our tests. That is why we do this live.' Then log it, fix it, and FOLLOW UP with the fix in writing. The follow-up converts a flaw into a case study. Clients trust 'caught it, fixed it, dated'.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:demo-fails:rep-5",
          text: "Always, twice, from two angles — one for the client, one for the archive. The recording is the alibi, the training asset, and the autopsy in one file. My archive has eleven years of demos and I have watched three of them while pricing new work. The old recordings are the honest rate card. Charisma fades on video. Value does not.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:demo-fails:rep-6",
          text: "Boring. The perfect demo is a walkthrough the client could have done themselves, narrated at their pace, ending five minutes early. No suspense, no surprises, one question asked and answered. Fireworks demo poorly and train beautifully. The client is buying their own Tuesday after we leave. Demo the Tuesday.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "bartek:rate-card",
      label: "The rate card",
      optionCandidates: [
        { id: "bartek:rate-card:opt-1", topicId: "bartek:rate-card", text: "How do you set a rate for a new service?" },
        { id: "bartek:rate-card:opt-2", topicId: "bartek:rate-card", text: "The client asked your rate before the scope. Answer?" },
        { id: "bartek:rate-card:opt-3", topicId: "bartek:rate-card", text: "Raise your rates without losing the client. How?" },
        { id: "bartek:rate-card:opt-4", topicId: "bartek:rate-card", text: "Is there a shame floor for consulting rates?" },
        { id: "bartek:rate-card:opt-5", topicId: "bartek:rate-card", text: "The client's cousin charges half your rate." },
        { id: "bartek:rate-card:opt-6", topicId: "bartek:rate-card", text: "What does your rate card NOT include?" },
      ],
      replyCandidates: [
        {
          id: "bartek:rate-card:rep-1",
          text: "Backwards from the value — what is the outcome worth if it works, what is a tenth of that, and can I say the tenth out loud without laughing. The laugh test is the whole method. If I cannot say the number with a straight face, the number is too high or I am in the wrong business. Usually too low. Say it anyway.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:rate-card:rep-2",
          text: "A range, honestly delivered: 'between X and Y depending on scope, and here is what moves it'. The early number is a filter, not a price — the right clients respect ranges and the wrong ones flee from them. Both outcomes save a month. The scope-less rate question is the client telling you their budget. Answer in ranges.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:rate-card:rep-3",
          text: "With notice, not apology — ninety days, one letter, and the sentence 'my rate adjusts to reflect the last year of results'. Attach one result. The clients who value you read the letter and pay. The ones who argue were paying for a bargain, not a consultant. Rate increases are the industry's honest divorce. Most survive it.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:rate-card:rep-4",
          text: "There is, and it is whatever number makes you resent the work by Wednesday. Resentment is the real floor — below it you are not consulting, you are volunteering with paperwork. I have worked at my shame floor twice and both times the client felt the resentment and left. Cheap work is bad work wearing a discount.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:rate-card:rep-5",
          text: "You do not compete with cousins — you reposition. 'The cousin teaches Excel; I build the model that survives the audit.' Different products, different aisles. If the client wants the cousin, the client was never in your aisle. Wish them well. The cousin sends you their overflow within two years. Overflow is where rate cards retire happy.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:rate-card:rep-6",
          text: "Emergencies, friendship discounts, and exposure — the three holes every beginner falls into. Emergencies bill at two times, friends bill at one time with a real invoice, and exposure bills at zero with a letter of reference. The card has no exceptions because the card IS the exception policy. Print it. Frame it. The frame argues.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "bartek:workshop-craft",
      label: "Workshop room craft",
      optionCandidates: [
        { id: "bartek:workshop-craft:opt-1", topicId: "bartek:workshop-craft", text: "Running a workshop. What do I check before anyone arrives?" },
        { id: "bartek:workshop-craft:opt-2", topicId: "bartek:workshop-craft", text: "The room has bad acoustics. Adapt?" },
        { id: "bartek:workshop-craft:opt-3", topicId: "bartek:workshop-craft", text: "How do you arrange chairs that resist arranging?" },
        { id: "bartek:workshop-craft:opt-4", topicId: "bartek:workshop-craft", text: "The markers are dead. Symbolism aside — disaster?" },
        { id: "bartek:workshop-craft:opt-5", topicId: "bartek:workshop-craft", text: "You arrive an hour early to every workshop. Why?" },
        { id: "bartek:workshop-craft:opt-6", topicId: "bartek:workshop-craft", text: "What breaks a workshop that slides never could?" },
      ],
      replyCandidates: [
        {
          id: "bartek:workshop-craft:rep-1",
          text: "The four checks: chairs, light, power, and the exit. Chairs decide energy, light decides sleep, power decides confidence, and the exit decides honesty — people speak freer when they know where the door is. I walk the room as a student first, then as a teacher. The room is the co-trainer. Brief it or it briefs you.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:workshop-craft:rep-2",
          text: "Close the blinds, put the wall to your back, and stand closer than feels normal — acoustics reward proximity and punish projection. My worst room was a glass box that turned every sentence into a seagull. I moved the whole workshop to the corridor for the discussions. The corridor had carpet. Improvise like the invoice depends on it.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:workshop-craft:rep-3",
          text: "Never leave the default rows — rows are for lectures and lectures are where questions go to die. I build one horseshoe and one island cluster and let the client's culture pick. The arrangement IS the agenda: horseshoe says 'we discuss', islands say 'you discuss', rows say 'I talk and you heal'. Choose the sentence the room says.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:workshop-craft:rep-4",
          text: "A dead marker is a rite of passage — I now travel with my own four, and the ritual of producing them from my bag has closed more ice than any game. 'The consultant brought his own markers' whispers a dangerous sermon: this man prepares. The markers cost three zloty. The whisper is priceless. Buy the markers.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:workshop-craft:rep-5",
          text: "Because the hour before is the real workshop — the room reveals its politics, the early arrivals reveal the culture, and the coffee machine reveals whether this project was budgeted properly. I fix what an hour can fix and note what it cannot. The session is the receipt. The hour is the work. Veterans bill for both.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:workshop-craft:rep-6",
          text: "The energy dip at minute fifty — slides never dip because slides do not run out of attention. Workshops live on attention and attention is a battery. My fix is the standing break at forty-five, before the dip, not after. Breaks placed after the dip are apologies. Breaks placed before are choreography. The room never learns which.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:slow-months",
      label: "The slow months",
      optionCandidates: [
        { id: "bartek:slow-months:opt-1", topicId: "bartek:slow-months", text: "August is dead. Pipeline empty. Panic schedule?" },
        { id: "bartek:slow-months:opt-2", topicId: "bartek:slow-months", text: "What do consultants actually do in slow months?" },
        { id: "bartek:slow-months:opt-3", topicId: "bartek:slow-months", text: "What did the slow month teach that fast ones cannot?" },
        { id: "bartek:slow-months:opt-4", topicId: "bartek:slow-months", text: "Should you discount in a drought?" },
        { id: "bartek:slow-months:opt-5", topicId: "bartek:slow-months", text: "How do you read a slow month — cycle or verdict?" },
        { id: "bartek:slow-months:opt-6", topicId: "bartek:slow-months", text: "Build what in the slow months? Be specific." },
      ],
      replyCandidates: [
        {
          id: "bartek:slow-months:rep-1",
          text: "Panic is a scheduling error. The slow month is the calendar's sabbatical and the pipeline's honest audit — one week of rest, one week of backlog favors, one week building the thing I never have time for. The fourth week is for the walks that produce September. Droughts water roots. Roots are the business.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:slow-months:rep-2",
          text: "The unpaid work that funds the paid work: the course I never finish, the old clients I call with no agenda, the article I owe three people. Slow months are where the NEXT fast month is manufactured. Every consultant has two jobs — the billable one and the pipeline one — and the pipeline job is always fired first. Rehire it.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:slow-months:rep-3",
          text: "That my best clients were won in my worst months — because slow months are when you finally make the call without an agenda, and no-agenda calls are the only calls people accept. Every fast month I skip the courtesy calls. Every slow month restores them. The pattern took a decade to see and one August to believe.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:slow-months:rep-4",
          text: "Never the rate — discount the SHAPE. Same price, smaller scope, shorter runway: a two-hour clinic instead of a two-day workshop. The rate is the reputation and the reputation is the oxygen. A discounted consultant is a discounted promise. I have held my rate through two droughts and priced my way out of both.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:slow-months:rep-5",
          text: "Cycle, unless it is the third cycle in a row — then it is a verdict, and verdicts need answers, not schedules. One slow month is August. Two is a market. Three is a mirror, and the mirror asks whether the pipeline job was fired again. The three-month chart on my wall has never surprised me. It has twice embarrassed me. Usefully.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:slow-months:rep-6",
          text: "The asset — the course, the template pack, the recorded workshop that sells while I sleep. Slow months built every passive line I own, and the passive lines carried the NEXT slow month like a raft. Build the thing clients keep asking for in passing. The passing requests are the market speaking. August is its hearing.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:the-handover",
      label: "The handover art",
      optionCandidates: [
        { id: "bartek:the-handover:opt-1", topicId: "bartek:the-handover", text: "You hand over every project clean. The craft?" },
        { id: "bartek:the-handover:opt-2", topicId: "bartek:the-handover", text: "What goes in a real handover document?" },
        { id: "bartek:the-handover:opt-3", topicId: "bartek:the-handover", text: "The client wants you forever. Handover anyway?" },
        { id: "bartek:the-handover:opt-4", topicId: "bartek:the-handover", text: "The handover meeting — agenda or ceremony?" },
        { id: "bartek:the-handover:opt-5", topicId: "bartek:the-handover", text: "The successor is better than you. Same as mentees?" },
        { id: "bartek:the-handover:opt-6", topicId: "bartek:the-handover", text: "What does a bad handover cost, long-term?" },
      ],
      replyCandidates: [
        {
          id: "bartek:the-handover:rep-1",
          text: "The craft is leaving three layers: the map, the manual, and the myths. The map is what connects to what, the manual is how to run it, and the myths are which parts are secretly held together by belief. Most handovers ship the first two. The myths are the real asset — months to learn, one afternoon to write. Write them.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:the-handover:rep-2",
          text: "Five sections, one page each: what exists, who owns it, what breaks first, what I promised verbally, and what I would do next. The verbal-promises page is the one nobody writes and everybody needs — every project has promises that live only in meetings. Write them down or they become the successor's surprises.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:the-handover:rep-3",
          text: "Always — the client who wants you forever has confused a consultant with a chair. The handover is the exit wearing a gift bow: 'here is everything, here is the person, here is my number for the one question a quarter'. Dependence is bad for the client and worse for the rate. The consultant who cannot leave is an employee.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:the-handover:rep-4",
          text: "Agenda, fifteen minutes, three items: the tour, the traps, and the phone call promise. The tour is the map, the traps are the myths, the promise is the safety net. Anything longer is a second project billed at goodbye rates. I have sat through two-hour handovers that transferred nothing. Focus is the transfer.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral", "period:afternoon"],
        },
        {
          id: "bartek:the-handover:rep-5",
          text: "Identical and twice as sweet — a handover that lands on someone better is the same graduation as mentoring, just with an invoice attached. I have handed three projects to people who outgrew my version of them. All three send referrals. The handover is how a consultant scales past his own calendar. The only honest growth.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:the-handover:rep-6",
          text: "Quarterly, compounding — every unanswered 'how does this work' becomes a support call, every undocumented promise becomes a dispute, and every myth becomes a superstition the client pays to prop up. The bad handover is a subscription the client never signed. Good handovers are the cheapest marketing. They bill for years.",
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

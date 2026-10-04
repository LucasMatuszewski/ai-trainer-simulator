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
    {
      id: "bartek:training-room",
      label: "The training room itself",
      optionCandidates: [
        { id: "bartek:training-room:opt-1", topicId: "bartek:training-room", text: "Why does the training room smell like ambition?" },
        { id: "bartek:training-room:opt-2", topicId: "bartek:training-room", text: "The projector in the training room is from another era." },
        { id: "bartek:training-room:opt-3", topicId: "bartek:training-room", text: "Where should the trainer stand, position-wise?" },
        { id: "bartek:training-room:opt-4", topicId: "bartek:training-room", text: "The U-shape desk layout versus classroom rows?" },
        { id: "bartek:training-room:opt-5", topicId: "bartek:training-room", text: "Someone rearranged your training room overnight." },
        { id: "bartek:training-room:opt-6", topicId: "bartek:training-room", text: "Could you train anywhere, or is the room the trick?" },
      ],
      replyCandidates: [
        {
          id: "bartek:training-room:rep-1",
          text: "Seventeen years of nervous energy soaked into the carpet. Every cohort arrives terrified that they will be found out, and by Thursday they have taught each other more than I taught them. That relief has a smell. Open a window in February and you lose a quarter of the curriculum. We keep it sealed. Like a distillery.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "bartek:training-room:rep-2",
          text: "The projector and I have a bond. It hums in C, it warms the first row, and it fails exactly once per cohort — always on the slide about failure handling, which the room takes as intentional theater. I have replaced it twice. Both replacements were returned. The room rejected them. You do not argue with a room that has seniority.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:training-room:rep-3",
          text: "Not at the front. The front is where authority stands and authority is the enemy of learning. I teach from the sides — near the window, at the back corner, anywhere that forces people to turn their heads and thereby stay awake. The one place I never stand is behind anyone. Teachers who stand behind people are grading them. I am not grading. I am hosting.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:training-room:rep-4",
          text: "U-shape for discussion days, rows for lecture days, and the trick is never telling the room which day it is. They walk in, they read the furniture, and they adjust before I say a word. The room does my introduction. Rows say today we receive. The U says today we think. Furniture is the oldest learning technology and it is free.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:training-room:rep-5",
          text: "That was either Janusz deep-cleaning or Zosia's culture camera needing angles. Either way, the room resists — by morning the chairs drift back to the U like water finding its level. Seventeen years of cohorts have voted on this layout with their bodies. Democracy does not need to know it is a democracy.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:training-room:rep-6",
          text: "I have trained in a warehouse, a restaurant after closing, and once in a car park with the hood of a Skoda as the projector screen. The room is not the trick. The trick is that people learn from people, and the room only decides how honest everyone will be about it. That said — give me my room. The Skoda had no whiteboard and I still dream about it.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "bartek:handouts",
      label: "The handout doctrine",
      optionCandidates: [
        { id: "bartek:handouts:opt-1", topicId: "bartek:handouts", text: "You still print handouts in the year 2026?" },
        { id: "bartek:handouts:opt-2", topicId: "bartek:handouts", text: "Your handouts have blank spaces instead of answers." },
        { id: "bartek:handouts:opt-3", topicId: "bartek:handouts", text: "One client framed the handout from your course." },
        { id: "bartek:handouts:opt-4", topicId: "bartek:handouts", text: "Pawel collects your handouts like trading cards." },
        { id: "bartek:handouts:opt-5", topicId: "bartek:handouts", text: "The PDF version never gets opened, does it?" },
        { id: "bartek:handouts:opt-6", topicId: "bartek:handouts", text: "What makes a handout worth keeping?" },
      ],
      replyCandidates: [
        {
          id: "bartek:handouts:rep-1",
          text: "Paper is the only file format that survives a decade. I found a handout from 2014 in a client's drawer last spring, coffee-ringed and annotated, still being argued with. Show me the PDF that gets argued with. Digital slides die with the login. Paper dies with the reader, and readers are stubborn.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:handouts:rep-2",
          text: "Deliberately. A handout with all the answers gets read once and binned. A handout with holes gets completed, and completion is memory's favorite sport. The blank space is not missing content. The blank space is the content. I have had students defend their filled-in handouts like family documents.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:handouts:rep-3",
          text: "He did — page four, the one about scope conversations, in an actual frame, in reception. I pretended to be humble about it for the whole visit and then asked for a photo of the frame. A trainer's real certificate is not the one the company prints. It is the one the client hangs unprompted.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:bartek-recommended-you"],
        },
        {
          id: "bartek:handouts:rep-4",
          text: "He does, in a folder, by year, and he has asked me to sign two of them. I signed. Then I explained that the handout he treasures is twenty percent wrong and I have taught it differently since. He said the wrong version helped more. That is the secret of teaching — the flawed honest version beats the polished correct one. I have never known which of my handouts is which.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:handouts:rep-5",
          text: "Never, and I have the analytics to prove it, because one client tracked the opens. Two percent. The paper version of the same material gets annotated, folded, stapled to walls. I provide the PDF for legal reasons and the paper for human ones. The legal reasons are a formality. The humans are the point.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:handouts:rep-6",
          text: "One page, one purpose, and at least one thing worth scribbling on. A handout is a letter to the reader on a bad day in eight months' time — tired, stuck, surrounded by strangers. Write for that person. Big type, real examples, and nothing that needs a second document to decode. If it cannot survive a coffee ring, it cannot survive a career.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "bartek:difficult-students",
      label: "The difficult students",
      optionCandidates: [
        { id: "bartek:difficult-students:opt-1", topicId: "bartek:difficult-students", text: "How do you handle the person who knows everything?" },
        { id: "bartek:difficult-students:opt-2", topicId: "bartek:difficult-students", text: "The skeptic in the back with folded arms?" },
        { id: "bartek:difficult-students:opt-3", topicId: "bartek:difficult-students", text: "Someone fell asleep in your class. Your move?" },
        { id: "bartek:difficult-students:opt-4", topicId: "bartek:difficult-students", text: "The student who argues with every exercise?" },
        { id: "bartek:difficult-students:opt-5", topicId: "bartek:difficult-students", text: "A whole cohort went silent on day one. Handling?" },
        { id: "bartek:difficult-students:opt-6", topicId: "bartek:difficult-students", text: "Ever met a student you could not reach?" },
      ],
      replyCandidates: [
        {
          id: "bartek:difficult-students:rep-1",
          text: "I hand them the room. 'You have clearly seen this in production — walk us through what broke.' The know-it-all either becomes my co-trainer or runs out of material by the second slide, and both outcomes teach the room something. The trick is never competing. Competition is the one game a trainer always loses to the loudest person in it.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:difficult-students:rep-2",
          text: "The folded arms are a question mark, not a wall. By lunch I will have asked them for one concrete case from their own work, and the arms unfold when they realize the course is about to become useful. Skeptics are just students who have been burned by bad training before. Respect the burn and they become the room's best ally.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:difficult-students:rep-3",
          text: "Nothing. The sleeper is data about my pacing, not a discipline problem. I drop my voice, change the activity, and let them wake on their own — waking a sleeper in front of a room buys you one laugh and loses you the whole room's safety. Marek once slept through my entire morning session, woke at lunch, and asked the sharpest question of the day. The sleep was the review.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:difficult-students:rep-4",
          text: "Every exercise has a wrong way on purpose and the arguer finds it faster than anyone. I put them on stage to break the exercise publicly. When it breaks in their hands, the room learns twice — once from the exercise and once from the breaking. The arguer gets an audience instead of an enemy, which is all they wanted. Nobody argues after they have taught.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:difficult-students:rep-5",
          text: "Silence on day one is fear wearing professionalism. I break it by being the first to admit something — usually the story of my first production disaster. The room relaxes when the trainer goes first into the embarrassing territory. By coffee, someone laughs, and laughter is the room deciding to exist. Cohorts are not silent. They are waiting for a permit.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:difficult-students:rep-6",
          text: "One. Years ago — brilliant, furious, and gone by Thursday. I did everything right and it did not matter, because the course was not his problem. His problem was a company that had already decided to let him go. No exercise fixes that. I still think about him. He taught me the trainer's limit: I can teach anyone the material, but I cannot teach a room they have already left.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "bartek:half-day-vs-full",
      label: "The half-day versus full-day",
      optionCandidates: [
        { id: "bartek:half-day-vs-full:opt-1", topicId: "bartek:half-day-vs-full", text: "Half-day or full-day training? Settle it." },
        { id: "bartek:half-day-vs-full:opt-2", topicId: "bartek:half-day-vs-full", text: "Clients always want the full day. Why refuse?" },
        { id: "bartek:half-day-vs-full:opt-3", topicId: "bartek:half-day-vs-full", text: "What happens to brains after hour four?" },
        { id: "bartek:half-day-vs-full:opt-4", topicId: "bartek:half-day-vs-full", text: "The full-day course includes lunch. Is lunch curriculum?" },
        { id: "bartek:half-day-vs-full:opt-5", topicId: "bartek:half-day-vs-full", text: "Zosia says two half-days beat one full day. False?" },
        { id: "bartek:half-day-vs-full:opt-6", topicId: "bartek:half-day-vs-full", text: "How do you know which format a client needs?" },
      ],
      replyCandidates: [
        {
          id: "bartek:half-day-vs-full:rep-1",
          text: "Half-day for skills, full-day for culture change, and most clients who ask for a full day actually need two half-days spaced a month apart. Learning is not pouring. It is setting and returning. The return visit is where the material sticks, because the returner arrives with questions that only the first half could plant.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:half-day-vs-full:rep-2",
          text: "Because a full day feels like value and behaves like fatigue. Sales-wise the full day invoices double, so I lose money saying no, and I say no anyway — usually. The exception is when the group is traveling in, or when the client's calendar will never permit a return. Honesty about format is the first lesson I teach. It is also the first thing I sell against.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:half-day-vs-full:rep-3",
          text: "Hour four is where the room becomes polite. Politely nodding, politely typing, politely gone. I schedule the hands-on work for hours three and four, because the hands stay awake after the mind sits down. If someone is drinking their fifth coffee and agreeing with everything, the day is over and only the clock has not been told.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:half-day-vs-full:rep-4",
          text: "Lunch is the fourth module and the most important one. Everything taught before lunch gets tested at lunch — over soup, the students explain the morning to each other, and whatever survives that retelling is real learning. I take the far end of the table, listen hard, and rebuild the afternoon from what the soup report tells me. The menu matters less than the murmur.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:half-day-vs-full:rep-5",
          text: "Zosia is right and I hate it professionally, because the spaced format pays me half as much per engagement and retains twice as much per student. Her calendar brain beats my stage craft. I have quoted her version to three clients this year and all three cohorts came back sharper. She will be unbearable about it and she has earned it.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:half-day-vs-full:rep-6",
          text: "I ask who will be in the room and what happens the morning after. If the after-morning is a full workday, take the half-day — the material needs a place to land. If the team is together and the phones are off, take the full day and use the extra hours for practice, never for content. The format is not about how much I can give. It is about how much they can hold.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "bartek:slide-fonts",
      label: "The slide font opinions",
      optionCandidates: [
        { id: "bartek:slide-fonts:opt-1", topicId: "bartek:slide-fonts", text: "Your slides use one font. All of them. Always." },
        { id: "bartek:slide-fonts:opt-2", topicId: "bartek:slide-fonts", text: "Comic Sans walks in. What do you actually do?" },
        { id: "bartek:slide-fonts:opt-3", topicId: "bartek:slide-fonts", text: "Klaudia offered to redesign your slides." },
        { id: "bartek:slide-fonts:opt-4", topicId: "bartek:slide-fonts", text: "Your font size rule is famous. Say it again." },
        { id: "bartek:slide-fonts:opt-5", topicId: "bartek:slide-fonts", text: "Tomek said fonts are a solved problem. Reaction?" },
        { id: "bartek:slide-fonts:opt-6", topicId: "bartek:slide-fonts", text: "Does the font really change learning?" },
      ],
      replyCandidates: [
        {
          id: "bartek:slide-fonts:rep-1",
          text: "One font, one weight, two sizes. Decorations are taxes on attention and my students pay enough in fear. The font I use is so boring it disappears, which is the entire job. When someone remembers a slide of mine, I want them to remember the sentence, not the lettering. Fonts are stagehands. Stagehands wear black.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:slide-fonts:rep-2",
          text: "Depends whose slides. A client's Comic Sans is their culture and I teach in it without a flicker — the room is theirs. My Comic Sans is a firing offense, though I once used it on purpose for the slide about email etiquette, and the physical groan that left the room proved the point better than the content did. Fonts can be punchlines. Choose the punch deliberately.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:slide-fonts:rep-3",
          text: "She offered a full visual identity — gradients, animations, the works. I said no and then watched her reel about my refusal outperform every deck I have ever built. The compromise we settled on: she made me a single title slide, beautiful as a poster, and I use it as the opening image and then never again. Both of us claim victory. Both of us are right.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:slide-fonts:rep-4",
          text: "The back row decides. Design every slide for the person in the worst seat with the oldest eyes, and if that means four words per slide, the slide has earned its four words. The front row never left a course saying the font was too big. The back row has left many a course saying nothing at all, because they saw nothing at all.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:slide-fonts:rep-5",
          text: "He is right that rendering is solved and wrong that choosing is. The machines can display anything. The question of what a tired human can absorb at minute ninety is not solved and never will be, because the human keeps changing. I told him that. He said 'fair' and changed the subject, which in Tomek is a conversion experience.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:slide-fonts:rep-6",
          text: "More than content, and I say that as someone whose content is decent. A kind font lowers the room's shoulders before you have said a word, and lowered shoulders learn. The research is soft on this and the experience is not — I have taught the same module in a clean font and a chaotic one, and the clean room asked braver questions.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "bartek:microphone",
      label: "The microphone technique",
      optionCandidates: [
        { id: "bartek:microphone:opt-1", topicId: "bartek:microphone", text: "Why do you refuse the lapel mic?" },
        { id: "bartek:microphone:opt-2", topicId: "bartek:microphone", text: "Handheld mic or voice alone in a small room?" },
        { id: "bartek:microphone:opt-3", topicId: "bartek:microphone", text: "Your mic died mid-masterclass once. Recovery?" },
        { id: "bartek:microphone:opt-4", topicId: "bartek:microphone", text: "Klaudia says everyone needs a mic for content." },
        { id: "bartek:microphone:opt-5", topicId: "bartek:microphone", text: "The feedback screech in the big hall last spring?" },
        { id: "bartek:microphone:opt-6", topicId: "bartek:microphone", text: "Teach me to speak so a mic is unnecessary." },
      ],
      replyCandidates: [
        {
          id: "bartek:microphone:rep-1",
          text: "A lapel mic clips the voice to the body, and I teach with my whole body — walking the rows, leaning over shoulders, drawing on walls. The clipped voice stays at the podium even when the man leaves it, and the room hears the lie. Handheld, at arm's length, honestly managed. The mic is a prop. I only carry props I can drop.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:microphone:rep-2",
          text: "Voice alone under twenty people, handheld over twenty, and never trust a room that tells you the acoustics are fine. The acoustics are decided by the person in the back with the hearing aid and the opinion, not by the venue manager. I test my unamplified voice from the worst seat before every session. The walk of shame to the back is the best soundcheck in the business.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:microphone:rep-3",
          text: "I put the dead mic down, walked to the center of the room, and taught the last forty minutes from memory and lungs. The reviews called it the best part of the day. The lesson stuck with me — the tech is scaffolding, and when it falls you find out whether you brought a building.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:microphone:rep-4",
          text: "She is right for the camera and wrong for the room, and we have agreed to film my workshops with mics and run them without. The camera needs the intimacy of the clipped voice. The room needs the honesty of the moving one. Two audiences, two acoustics, one trainer refusing to become a radio host. She edits around me. The footage is somehow better for the fight.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:microphone:rep-5",
          text: "The screech was a rite of passage and the room owned it — three hundred people jumping, then laughing, then completely mine. You cannot buy that kind of shared startle. I thanked the sound tech from the stage and blamed the building, and the building accepted. Every trainer has one feedback story. The good ones turn theirs into the opening joke of the next decade.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:microphone:rep-6",
          text: "Talk to the back row and let the front row overhear. That is the whole secret — projection is not volume, it is aim. Put the sentence at the far wall, breathe before the important part, and land the endings instead of swallowing them. Most speakers are understood by the front and tolerated by the back. Reverse it and you will never need batteries again.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:evaluation-sheets",
      label: "The evaluation sheets",
      optionCandidates: [
        { id: "bartek:evaluation-sheets:opt-1", topicId: "bartek:evaluation-sheets", text: "Do you read the evaluation sheets after every course?" },
        { id: "bartek:evaluation-sheets:opt-2", topicId: "bartek:evaluation-sheets", text: "Everyone rates five stars. Useless data?" },
        { id: "bartek:evaluation-sheets:opt-3", topicId: "bartek:evaluation-sheets", text: "One evaluation called you 'a safe pair of hands'." },
        { id: "bartek:evaluation-sheets:opt-4", topicId: "bartek:evaluation-sheets", text: "The harshest evaluation you ever received?" },
        { id: "bartek:evaluation-sheets:opt-5", topicId: "bartek:evaluation-sheets", text: "Zosia wants evaluation data on the culture dashboard." },
        { id: "bartek:evaluation-sheets:opt-6", topicId: "bartek:evaluation-sheets", text: "What would you ask if you could ask one question?" },
      ],
      replyCandidates: [
        {
          id: "bartek:evaluation-sheets:rep-1",
          text: "Every one, the same night, with tea. The sheets are the only honest mirrors in this trade — clients smile, colleagues nod, but the anonymous sheet after a long Thursday knows things. I have kept every sheet for seventeen years. Three boxes in my basement. My wife calls them the archive. They are. Of my failures, mostly, which are the useful ones.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:evaluation-sheets:rep-2",
          text: "The fives are useless and I read them anyway, because the handwriting matters — a five squeezed into the corner is a two that gave up. The useful data is in the four with a sentence attached, and in anything written in the free-text box at all. Nobody fills the free-text box casually. That box is where the truth does its paperwork.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:evaluation-sheets:rep-3",
          text: "I did, and it is the review I measure the career against. Anyone can be impressive for a day. Safe hands means the room felt allowed to be slow, to be wrong, to ask the question twice. The sheets that call me brilliant are nice. The ones that call me safe are the ones I worked for.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:evaluation-sheets:rep-4",
          text: "2016. Six words: 'Good slides. No idea if learned.' It was correct, it was devastating, and it rebuilt my courses — I added the follow-up call, the practice week, the return visit. The client who wrote it became a client for nine years because I called to thank them. The harshest sheet in the archive is the most valuable thing in it.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:evaluation-sheets:rep-5",
          text: "She can have the averages, never the sheets. The moment evaluations become a dashboard, trainers start teaching to the dashboard, and the free-text box fills with what the metric wanted to hear. I will report the trends and hand her the anonymized themes. The raw sheets stay in the archive, doing the slow honest work that dashboards cannot.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:evaluation-sheets:rep-6",
          text: "Not 'was this useful' — everyone lies on that one, politely. I would ask: 'what did you do differently on Monday?' The honest answers split the room in two, and both halves teach me. The doers tell me what transferred. The non-doers tell me what the company actually permits.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:recorded-courses",
      label: "The recorded courses",
      optionCandidates: [
        { id: "bartek:recorded-courses:opt-1", topicId: "bartek:recorded-courses", text: "Zosia wants to record your courses. Refused again?" },
        { id: "bartek:recorded-courses:opt-2", topicId: "bartek:recorded-courses", text: "Could a recording of you teach as well as you?" },
        { id: "bartek:recorded-courses:opt-3", topicId: "bartek:recorded-courses", text: "Klaudia recorded one session without asking." },
        { id: "bartek:recorded-courses:opt-4", topicId: "bartek:recorded-courses", text: "You watched your own recording once. Verdict?" },
        { id: "bartek:recorded-courses:opt-5", topicId: "bartek:recorded-courses", text: "Dawid asked what a recorded course is worth." },
        { id: "bartek:recorded-courses:opt-6", topicId: "bartek:recorded-courses", text: "If you did record, what would you record?" },
      ],
      replyCandidates: [
        {
          id: "bartek:recorded-courses:rep-1",
          text: "Refused, gently, eleven times. A recording is a perfect course for people who do not exist — the ones with no questions, no bad days, no need to be looked at while confused. My work is two-thirds reading the room. The camera cannot read. It can only testify. I keep telling her: record the exercises, not the explanations. She is starting to hear it.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:recorded-courses:rep-2",
          text: "It would teach the material and lose the teaching. The recording would say everything I say and mean less of it, because meaning in a classroom is negotiated live — the pause that lands, the example swapped for the one this room needs. A recording of me would be an excellent podcast of a man talking to people who are not there. That is a different job. I do not want it.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:recorded-courses:rep-3",
          text: "She did, and I made her delete it, and then asked her to film the exercise section instead — which she did, beautifully, and that footage now trains our new trainers in how the rooms actually work. We converted a violation into a curriculum. She calls it her best edit. I call it my best catch. The client never knew. The training room did.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:recorded-courses:rep-4",
          text: "Ten minutes. That was all I could stand. I say 'essentially' too much, I pace left when I should own the room, and — this is the part I kept — when a student asked the hard question, the recording caught me saying 'I do not know, let us find out' without a flicker of panic. I have watched those four seconds more than the rest combined. The rest is fixable.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:recorded-courses:rep-5",
          text: "He asked, I gave him the honest ledger. A recording scales the content and caps the change — one file, infinite seats, and the seats learn at the file's pace, not theirs. Worth real money for compliance topics. Worth nothing for the courses I actually teach, where the value is the live adjustment. He nodded, put it in the decision log, and dropped it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:recorded-courses:rep-6",
          text: "The exercises, silent, with captions. No me, no voice, just the room solving the problem at human speed — the small victories, the arguments, the moment the quiet one gets it. That recording would teach more than any lecture ever filmed, because it shows what learning looks like instead of what teaching looks like. Nobody has ever sold that video. Everyone has needed it.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:parking-lot-technique",
      label: "The parking lot technique",
      optionCandidates: [
        { id: "bartek:parking-lot-technique:opt-1", topicId: "bartek:parking-lot-technique", text: "Your parking lot flipchart — does it actually work?" },
        { id: "bartek:parking-lot-technique:opt-2", topicId: "bartek:parking-lot-technique", text: "What happens to the questions that get parked?" },
        { id: "bartek:parking-lot-technique:opt-3", topicId: "bartek:parking-lot-technique", text: "Someone parked a personal question once." },
        { id: "bartek:parking-lot-technique:opt-4", topicId: "bartek:parking-lot-technique", text: "Przemek filled your parking lot with sales questions." },
        { id: "bartek:parking-lot-technique:opt-5", topicId: "bartek:parking-lot-technique", text: "Is the parking lot just a polite 'no'?" },
        { id: "bartek:parking-lot-technique:opt-6", topicId: "bartek:parking-lot-technique", text: "Teach me to park a question without killing it." },
      ],
      replyCandidates: [
        {
          id: "bartek:parking-lot-technique:rep-1",
          text: "It works because it makes the detour visible instead of forbidden. A question that would derail the room becomes a marked car in a marked space, and the room relaxes — nothing is lost, everything is just scheduled. The flipchart is the cheapest classroom management tool ever invented and the most respected. People park willingly when they trust the lot is real.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:parking-lot-technique:rep-2",
          text: "They get answered — that is the covenant. Every parked question gets a written answer within the week, sent to the whole cohort, credited to whoever parked it. The parking lot is a promise with a flipchart attached. The year I skipped the follow-ups, the next cohort parked nothing, and I had taught them not to trust me. I have never skipped them since.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:parking-lot-technique:rep-3",
          text: "Someone parked 'what do I do about my manager' in the middle of a Git course. I answered it privately at lunch, and the answer took twenty minutes and had nothing to do with Git. The parking lot held a career question for two hours like it was nothing. That is what the technique is really for — giving hard questions a safe place to wait.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:parking-lot-technique:rep-4",
          text: "He did — seven questions about upselling a training course, during the training course. I answered the first one live because it was genuinely good, parked the rest, and by the afternoon he had converted three of them into course material about positioning. The parking lot does not kill sales energy. It FILTERS it. One Przemek per room, flowing through one flipchart.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:parking-lot-technique:rep-5",
          text: "A polite no kills the question. The parking lot postpones the answer, which is different — and the difference is the follow-through. Parked questions that vanish teach rooms to stop asking. Parked questions that come back answered teach rooms that every question is worth forming. The flipchart is just a calendar with sticky notes and a conscience.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:parking-lot-technique:rep-6",
          text: "Three steps. Write it down word for word — their words, not your tidier version. Say when it will be answered, out loud, with a day attached. Then thank the asker by name, because the question was a gift of attention. The whole trick is to treat the parked question as cargo, not clutter. Cars in a lot are cars people intend to drive away.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:dry-markers",
      label: "The dry marker crisis",
      optionCandidates: [
        { id: "bartek:dry-markers:opt-1", topicId: "bartek:dry-markers", text: "Every marker in the training room is half-dead." },
        { id: "bartek:dry-markers:opt-2", topicId: "bartek:dry-markers", text: "You carry your own markers. Confessed?" },
        { id: "bartek:dry-markers:opt-3", topicId: "bartek:dry-markers", text: "The red one died mid-diagram in the big session." },
        { id: "bartek:dry-markers:opt-4", topicId: "bartek:dry-markers", text: "Janusz restocks the markers now without being asked." },
        { id: "bartek:dry-markers:opt-5", topicId: "bartek:dry-markers", text: "Grazyna flagged marker spending as 'creative'." },
        { id: "bartek:dry-markers:opt-6", topicId: "bartek:dry-markers", text: "Why not presenters use slides instead of walls?" },
      ],
      replyCandidates: [
        {
          id: "bartek:dry-markers:rep-1",
          text: "Half-dead markers are the room's way of testing the trainer. A dying marker writes for exactly one bold stroke, and that stroke had better be the important one. I start every course by testing all four colors on the corner of the flipchart, publicly, like a pilot's walkaround. The room learns something about me. The markers learn something about respect.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:dry-markers:rep-2",
          text: "Three markers, inner pocket, since 2012, and I have stopped being embarrassed about it. The year I trusted the venue's markers, the black one died during the architecture section and I taught the second half in green. The client still calls it 'the green architecture course'. Never again. A tradesman owns his tools. Trainers included.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:dry-markers:rep-3",
          text: "It died halfway through the payment flow, so the second half of the diagram is in my own carried red, two shades braver. The cohort noticed, nobody minded, and one student said the color change 'marked the interesting part'. Out of failure, emphasis. I have since done it on purpose twice. The room never knows which red is which.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:dry-markers:rep-4",
          text: "He does — full box, first Tuesday of the month, no words exchanged. It started the year he found me testing markers in the dark before a 7am session. Now the box is simply there, like weather. The best working relationships in this building are conducted entirely in stationery. I have thanked him twice. He has accepted once.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:dry-markers:rep-5",
          text: "She did, and I showed her the math — markers cost less per trained mind than the coffee, and nobody audits the coffee. She narrowed her eyes, approved the line, and added a column tracking markers per course, which I now fill in honestly. The audit exists. The markers flow. Somewhere in that ledger is the most bureaucratic marker supply chain in Poland.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:dry-markers:rep-6",
          text: "Slides show. Walls hold. When I write the room's ideas on the wall, the wall becomes the room's shared memory for the whole day — nobody asks 'can you go back a slide', because the answer is always visible, growing, owned by everyone. Slides are a lecture. Walls are a negotiation. I negotiate for a living. The markers are the pens of the treaty.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "bartek:client-lunch",
      label: "The client lunch",
      optionCandidates: [
        { id: "bartek:client-lunch:opt-1", topicId: "bartek:client-lunch", text: "You take every client to the same lunch spot?" },
        { id: "bartek:client-lunch:opt-2", topicId: "bartek:client-lunch", text: "Who orders first at a client lunch?" },
        { id: "bartek:client-lunch:opt-3", topicId: "bartek:client-lunch", text: "A client got drunk at a business lunch. Story?" },
        { id: "bartek:client-lunch:opt-4", topicId: "bartek:client-lunch", text: "Grazyna audits your lunch receipts. Fairly?" },
        { id: "bartek:client-lunch:opt-5", topicId: "bartek:client-lunch", text: "The vegetarian client and the pierogi incident." },
        { id: "bartek:client-lunch:opt-6", topicId: "bartek:client-lunch", text: "What is the actual purpose of the client lunch?" },
      ],
      replyCandidates: [
        {
          id: "bartek:client-lunch:rep-1",
          text: "Same place, same table, eleven years. The waitresses know the ritual, the menu has no surprises, and every client gets the same seat facing the window. Familiarity is the message — I am a man who repeats, whose word does not wander. New restaurants are for dates. Contracts are signed at tables where the salt has history.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:client-lunch:rep-2",
          text: "The client, always, and I order second and eat what they order. Not mimicry — reconnaissance. Their choices tell me how they decide: the cautious orderer, the adventurous one, the person who asks the waiter's opinion. Lunch is the interview the calendar never scheduled. I have watched men order like they negotiate, and I adjust the afternoon accordingly.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:client-lunch:rep-3",
          text: "Two glasses of wine became five, and by dessert he was negotiating against himself, offering us more money than we asked for. I declined the extra on the spot and re-set the price at the original number the next morning, in writing. He signed it and never mentioned it. Some deals you win by refusing the win. That lunch bought eleven years of trust for the price of one invoice.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:client-lunch:rep-4",
          text: "Every receipt, with a client name attached, quarterly. Fair does not describe it — her audit is kinder than mine, because she has never once questioned a lunch, only its documentation. I write one line per receipt: who, what was discussed, what moved. She approved the format years ago and now other consultants copy it.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:client-lunch:rep-5",
          text: "I ordered for the table without checking, the platter arrived wall-to-wall meat and potato, and she smiled through two hours of bread and pickled cucumber. I apologized at coffee and she said the incident told her more about us than any pitch — that we moved fast and checked after. She signed anyway and now laughs about it annually. But we check first, always, since.",
          relationshipHint: "annoyed",
        },
        {
          id: "bartek:client-lunch:rep-6",
          text: "Not the deal. The deal gets done in rooms with slides. The lunch is where you find out whether you can survive the deal — whether the client interrupts, how they treat the waiter, whether they ask a single question about your life. Sixty minutes of soup tells me what six weeks of contract law cannot. You are not feeding the client.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "bartek:trainer-clock",
      label: "The trainer's internal clock",
      optionCandidates: [
        { id: "bartek:trainer-clock:opt-1", topicId: "bartek:trainer-clock", text: "You always end courses exactly on time. How?" },
        { id: "bartek:trainer-clock:opt-2", topicId: "bartek:trainer-clock", text: "The energy dip at 14:30 — beatable?" },
        { id: "bartek:trainer-clock:opt-3", topicId: "bartek:trainer-clock", text: "You cut a module live because the clock said so?" },
        { id: "bartek:trainer-clock:opt-4", topicId: "bartek:trainer-clock", text: "Zosia's meetings never end on time. Contrast?" },
        { id: "bartek:trainer-clock:opt-5", topicId: "bartek:trainer-clock", text: "How long can you actually hold a room?" },
        { id: "bartek:trainer-clock:opt-6", topicId: "bartek:trainer-clock", text: "Teach me your time management for a training day." },
      ],
      replyCandidates: [
        {
          id: "bartek:trainer-clock:rep-1",
          text: "Because ending late is stealing from people, and stealing is bad business. I run the day in fifteen-minute blocks with two sacrificial modules — material I will cut without mercy if the morning runs long. The sacrificial modules are chosen in advance, marked in my notes, and mourned never. The room believes the day was effortless. The day was triage.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:trainer-clock:rep-2",
          text: "Not beaten — scheduled. The 14:30 dip is universal, so I put the loudest, most physical work there: the group exercise, the walking activity, anything that happens standing up. You do not fight the dip. You give it something to do with its hands. Coffee is a rumor. Movement is the cure. And if all else fails, I tell them the dip is coming, and being forewarned halves it.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:trainer-clock:rep-3",
          text: "Twice a year, minimum. The module goes on the parking lot with an honest word — 'we do not have the time to do this properly, and badly is worse than never'. Clients respect the cut more than the overrun. The trainer who ends late is a trainer whose promises have a flexible exchange rate. Mine do not. The clock and I have a deal older than most of my clients.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:trainer-clock:rep-4",
          text: "Her overruns are a choice, not a flaw — she runs the room until the room is finished, and the room is often finished late but never unfinished. I run the clock and let the material go. Two philosophies, one company, and we have negotiated exactly one treaty: no meetings run long in the training room. Her time owns the office. Mine owns the classroom. The border is peaceful.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:afternoon"],
        },
        {
          id: "bartek:trainer-clock:rep-5",
          text: "Four hours, twice a day, maximum, and anyone claiming more is selling confidence rather than training. The room's attention is a muscle and I am its interval coach — load, rest, load. My record is a six-hour emergency workshop during a system migration, and I paid for that week with my voice and half my credibility with my own knees. The graph has a shape. I respect the shape.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:trainer-clock:rep-6",
          text: "Plan the day backwards from the ending. Decide what they must be able to DO at 16:50, then buy that outcome with the cheapest hours — their best attention goes on the hardest skill, which is almost always the first two hours after lunch. Write the plan, hold the blocks loosely, and let the questions renovate the middle. The beginning and end are load-bearing.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "bartek:war-stories",
      label: "The war stories",
      optionCandidates: [
        { id: "bartek:war-stories:opt-1", topicId: "bartek:war-stories", text: "Tell a war story. The one you always tell." },
        { id: "bartek:war-stories:opt-2", topicId: "bartek:war-stories", text: "The database migration of 2017. True story?" },
        { id: "bartek:war-stories:opt-3", topicId: "bartek:war-stories", text: "Do war stories actually teach anything?" },
        { id: "bartek:war-stories:opt-4", topicId: "bartek:war-stories", text: "Przemek retells your stories with better endings." },
        { id: "bartek:war-stories:opt-5", topicId: "bartek:war-stories", text: "One story you have never told in a course?" },
        { id: "bartek:war-stories:opt-6", topicId: "bartek:war-stories", text: "When does a war story become a lie?" },
      ],
      replyCandidates: [
        {
          id: "bartek:war-stories:rep-1",
          text: "The Wednesday the client's whole system ran on one spreadsheet owned by one man on holiday. We found it at 2am, printed it, and taped the pages to a wall like a map of a country that should not exist. By morning we had a real database plan, and by Friday the man had a replacement and a new title.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:war-stories:rep-2",
          text: "Mostly. True in every number, which I keep exact on purpose — 2:41am, eleven tables, one backup that was three weeks old. The names are changed and the panic is not. A war story with rounded numbers is entertainment. A war story with exact ones is testimony. The room can feel the difference and trusts the testimony.",
          relationshipHint: "delighted",
        },
        {
          id: "bartek:war-stories:rep-3",
          text: "They teach the one thing slides cannot: that the material has been tested by fire, by someone, in weather. A war story is a receipt proving the theory survived contact with a Tuesday at 3am. Students forget frameworks by Friday. They forget a good war story never — and inside every war story is a framework wearing a costume.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:war-stories:rep-4",
          text: "He does, and his endings are better, and I let him have them. In his version of the migration story I say something heroic at the end. In reality I said nothing and drank cold coffee. But his audiences learn the same lesson and laugh more, and the story outlives both of us either way. Legends are co-authored.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:war-stories:rep-5",
          text: "One, about a student I failed — not the one from the difficult-days story, an earlier one, quieter. I have told it exactly twice, off-stage, to trainers I mentor, because on stage it would teach the wrong thing. The room needs to believe the craft works. It does work, almost always. The exceptions belong in the archive, not the syllabus. Every trainer keeps one.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:war-stories:rep-6",
          text: "When the numbers round up, when the teller becomes the hero, and when the lesson arrives before the disaster does. A true war story has the hero arriving late, unprepared, and slightly ridiculous. The moment the teller was calm and right the whole time, the story has left testimony and entered marketing. I tell mine with the panic intact. The panic is the proof.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "bartek:legacy-students",
      label: "The legacy students",
      optionCandidates: [
        { id: "bartek:legacy-students:opt-1", topicId: "bartek:legacy-students", text: "Do you hear from students years later?" },
        { id: "bartek:legacy-students:opt-2", topicId: "bartek:legacy-students", text: "One of your students now teaches here?" },
        { id: "bartek:legacy-students:opt-3", topicId: "bartek:legacy-students", text: "A student corrected your material at a conference." },
        { id: "bartek:legacy-students:opt-4", topicId: "bartek:legacy-students", text: "Pawel and Tomek were both your students?" },
        { id: "bartek:legacy-students:opt-5", topicId: "bartek:legacy-students", text: "Do you keep a list of everyone you have taught?" },
        { id: "bartek:legacy-students:opt-6", topicId: "bartek:legacy-students", text: "What is the legacy actually worth to you?" },
      ],
      replyCandidates: [
        {
          id: "bartek:legacy-students:rep-1",
          text: "Christmas cards, LinkedIn notes, one wedding invitation, and a monthly coffee with a student from 2013 who now outranks me at a bank. The card from her says the same thing every year — 'still using the parking lot'. One technique, surviving a decade, inside someone else's institution. That is the entire reward structure of this job and it pays better than the invoice.",
          relationshipHint: "pleased",
        },
        {
          id: "bartek:legacy-students:rep-2",
          text: "Tomek sat in my Git course six years ago, back row, arms folded, certain he would hate it. Now he reviews the material and crosses out my examples with a red pen and total love. The student who corrects you is the graduation of the whole craft. I keep his corrections. The course is better than the one I taught him, and he is the reason in writing.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:legacy-students:rep-3",
          text: "She did, from the audience, in front of forty people, and she was right — the pattern I taught had been deprecated. I thanked her, updated the slide on the spot, and made the correction itself the new slide. The room learned the pattern and the deeper lesson: material expires, honesty does not. She sends me errata now, quarterly, like a one-woman standards body.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "bartek:legacy-students:rep-4",
          text: "Different courses, same back row energy. Pawel took notes on everything and asked permission to understand. Tomek took notes on everything I got wrong. Both approaches built the men you see — one checks with me before acting, one checks me before believing. The classroom produces both kinds and needs both kinds. I would fail either one now and be proud of it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "bartek:legacy-students:rep-5",
          text: "No list, and that is deliberate. The moment teaching becomes a collection, students become inventory. I remember the ones who needed something — the quiet one, the angry one, the one who taught me back. The rest I release gladly, like a ferry releasing passengers. Kasia finds this professionally horrifying. She has a spreadsheet of my career.",
          relationshipHint: "neutral",
        },
        {
          id: "bartek:legacy-students:rep-6",
          text: "Nothing measurable, which is why I trust it. My invoice is money. My legacy is a hundred rooms where someone says 'let me park that question' or 'what would the back row see' without knowing where the sentence came from. Techniques outlive their names. Somewhere a training room runs on my habits and my name has never been said there.",
          relationshipHint: "delighted",
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

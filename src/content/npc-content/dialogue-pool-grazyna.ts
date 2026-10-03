/**
 * WS5 dialogue v2 pool — Grazyna, The Accountant (C-77).
 *
 * Pure authored data. Topics: the real budget (there are two), the candle
 * empire ('Syntax Error' — ozone, old keyboard, ambition), and the
 * approval process (alchemy with receipts). Task offer: the 'Intro to
 * Focus' course that sells the candle (sets the existing
 * `grazyna-candle-partner` flag). Tone matches her legacy trees: the
 * password is her, the printer amortized into nostalgia, and knowledge is
 * the only inventory with zero storage cost.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const GRAZYNA_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "grazyna",
  topics: [
    {
      id: "grazyna:budget",
      label: "The real budget",
      optionCandidates: [
        {
          id: "grazyna:budget:opt-1",
          topicId: "grazyna:budget",
          text: "Is there really a second budget?",
        },
        {
          id: "grazyna:budget:opt-2",
          topicId: "grazyna:budget",
          text: "What is the most ridiculous expense you approved?",
        },
        {
          id: "grazyna:budget:opt-3",
          topicId: "grazyna:budget",
          text: "The printer is on the books as what, exactly?",
        },
        {
          id: "grazyna:budget:opt-4",
          topicId: "grazyna:budget",
          text: "Can I expense a second monitor? For training.",
        },
        {
          id: "grazyna:budget:opt-5",
          topicId: "grazyna:budget",
          text: "Who else knows the spreadsheet password?",
        },
        {
          id: "grazyna:budget:opt-6",
          topicId: "grazyna:budget",
          text: "How bad is this quarter, in numbers?",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:budget:rep-1",
          text: "There is the budget I present and the budget that is real. The presentation one has colors and a tab called 'morale'. The real one has a tab called 'survived' and a column called 'came back next year'. Guess which one I read at night.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:budget:rep-2",
          text: "Approved? A bronze statue of the founder's dog, from one blurry photo. The dog's name was Kafka and the statue looks like a dog who owes money. Rejected? A fire extinguisher — 'unbudgeted safety'. I was overruled on the statue and not on the extinguisher. Draw the org chart from that.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:budget:rep-3",
          text: "Depreciating monument, 2019 cohort. It has amortized into nostalgia, which is the only asset class in this building that never dips. The audit once found a receipt for a single bean. I kept the bean receipt. Provenance matters, even in coffee.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:budget:rep-4",
          text: "A second monitor for training is not an expense, it is a classroom. Write 'delivery infrastructure' on the form. I will code it under education, which has budget, unlike 'equipment', which has Marek. Do not tell the equipment why.",
          relationshipHint: "delighted",
          tags: ["stats:high-credibility", "relationship:warm"],
        },
        {
          id: "grazyna:budget:rep-5",
          text: "The password is me. Not a string I know — I AM the password. If the building burns, I walk out with the real numbers and the company continues from my kitchen table. HR calls that a single point of failure. I call it being the only adult with a backup.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:budget:rep-6",
          text: "Bad is a direction, not a number. Cash flows, invoices clear, and the only line growing faster than revenue is the cloud bill, which is now framed on Pawel's wall as insurance. We are fine. We are always fine by exactly as much as I say we are.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "grazyna:side-hustle",
      label: "The candle empire",
      optionCandidates: [
        {
          id: "grazyna:side-hustle:opt-1",
          topicId: "grazyna:side-hustle",
          text: "How is the candle business?",
        },
        {
          id: "grazyna:side-hustle:opt-2",
          topicId: "grazyna:side-hustle",
          text: "The 'Syntax Error' candle smells like WHAT?",
        },
        {
          id: "grazyna:side-hustle:opt-3",
          topicId: "grazyna:side-hustle",
          text: "Whose taxes do you do? You can tell me.",
        },
        {
          id: "grazyna:side-hustle:opt-4",
          topicId: "grazyna:side-hustle",
          text: "Mechanical keyboards, importing, why?",
        },
        {
          id: "grazyna:side-hustle:opt-5",
          topicId: "grazyna:side-hustle",
          text: "Could the side hustle become the main hustle?",
        },
        {
          id: "grazyna:side-hustle:opt-6",
          topicId: "grazyna:side-hustle",
          text: "Can I invest? I have three hundred zloty.",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:side-hustle:rep-1",
          text: "Quarter over quarter, up. Candles are the perfect product: zero storage cost, infinite margin, and the inventory is wax, which is just inventory with patience. Knowledge was my first love, but knowledge needs the customer to do homework. Wax just burns. Respect.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:side-hustle:rep-2",
          text: "Ozone, warm plastic, old keyboard, and a base note of ambition. Ambition smells like Wednesday. Do not ask me how I know. Pre-orders opened Monday and the wellness industry is about to be disturbed, which it deserves, on principle.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:side-hustle:rep-3",
          text: "You are in the tab now, so you get one name free: the person whose taxes I do and should not is in this room, earns more than me, and once tried to expense a boat as 'client entertainment at sea'. The sea, apparently, is a client. I said nothing. I keep a spreadsheet of that too.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:grazyna-showed-the-books"],
        },
        {
          id: "grazyna:side-hustle:rep-4",
          text: "The keyboards pay for the candle wax. A hobby that funds a hobby is called a PORTFOLIO. Also I have opinions about key travel that HR would call 'intense' and I call 'standards'. The click is not noise. The click is accountability.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:side-hustle:rep-5",
          text: "The day candles outsell accounting, I burn this place down — emotionally. Legally I give notice, invoice my notice period, and consult back for a week at a higher rate. Bartek showed me that move. It is in the spreadsheet twice, as a warning.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:side-hustle:rep-6",
          text: "Do not invest. PARTNER. I need a face for the course and you need inventory with zero storage cost. Record 'Intro to Focus', the course that sells the candle, and we split it clean. I have thoughts on the split and a spreadsheet that proves my thoughts.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
          offersTaskId: "grazyna:task-focus-course",
        },
      ],
    },
    {
      id: "grazyna:approvals",
      label: "The approval process",
      optionCandidates: [
        {
          id: "grazyna:approvals:opt-1",
          topicId: "grazyna:approvals",
          text: "How does anything get approved here?",
        },
        {
          id: "grazyna:approvals:opt-2",
          topicId: "grazyna:approvals",
          text: "You rejected the renovation budget again.",
        },
        {
          id: "grazyna:approvals:opt-3",
          topicId: "grazyna:approvals",
          text: "What CAN I get approved by Friday?",
        },
        {
          id: "grazyna:approvals:opt-4",
          topicId: "grazyna:approvals",
          text: "Why does everything take so long?",
        },
        {
          id: "grazyna:approvals:opt-5",
          topicId: "grazyna:approvals",
          text: "Is the 'team events' budget spent on events?",
        },
        {
          id: "grazyna:approvals:opt-6",
          topicId: "grazyna:approvals",
          text: "Klaudia wants a ring light on expenses.",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:approvals:rep-1",
          text: "Slowly, in triplicate, and only if the invoice survives me. Approval is a fire I light at both ends: the requester burns with hope and the budget burns with reality. What is left in the middle is what actually happens. It is not bureaucracy. It is alchemy with receipts.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:approvals:rep-2",
          text: "Of course. New chairs are a Q4 dream, the 'refresh' is a paint swatch, and the glass wall stays because it is already paid for. Tell Zosia the word 'clients' unlocks funds like a password. She knows it already, but she enjoys watching me say no. We both get something out of it.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:approvals:rep-3",
          text: "Morning is when I am merciful; by lunch the mercy is spent. Coffee gets approved daily, pizza gets approved if it is tagged 'culture', and training materials get approved if they exist on paper — which they cannot, because of the printer. The system is perfect.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "grazyna:approvals:rep-4",
          text: "Because fast is expensive and I am paid to be slow. Every rush job is a future audit wearing a disguise. I have seen 'urgent' invoices that took three years to explain. The queue is not a queue. It is a QUARANTINE.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:approvals:rep-5",
          text: "Once, by accident — the receipts folder labeled 'team events' contained an actual team, at an actual event. I nearly framed it. Since then the folder buys the bad coffee, the pizza emergencies, and one bouncy castle in 2016 that nobody discusses.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:approvals:rep-6",
          text: "A ring light is 'content infrastructure' to her and 'a lamp' to me. The lamp has won for three quarters running. Tell her to invoice it as 'workplace lighting with a side hustle' and I will approve it out of respect for the wording alone.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:audits",
      label: "Surviving the external audit",
      optionCandidates: [
        {
          id: "grazyna:audits:opt-1",
          topicId: "grazyna:audits",
          text: "The external auditor is here. What do I do?",
        },
        {
          id: "grazyna:audits:opt-2",
          topicId: "grazyna:audits",
          text: "The auditor asked for the printer's paperwork.",
        },
        {
          id: "grazyna:audits:opt-3",
          topicId: "grazyna:audits",
          text: "What do auditors actually look for?",
        },
        {
          id: "grazyna:audits:opt-4",
          topicId: "grazyna:audits",
          text: "Janusz offered the auditor closet coffee.",
        },
        {
          id: "grazyna:audits:opt-5",
          topicId: "grazyna:audits",
          text: "We passed the audit. Why no celebration?",
        },
        {
          id: "grazyna:audits:opt-6",
          topicId: "grazyna:audits",
          text: "Have you ever failed one?",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:audits:rep-1",
          text: "Answer what is asked. Volunteer nothing. Auditors are not detectives, they are accountants with a checklist, and checklist people are defeated by precision, not charm. Do not offer them coffee stories, do not show them the second budget, and if they ask about morale, the answer is 'adequate and improving'. Every word in that sentence is defensible. I have used it under oath.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:audits:rep-2",
          text: "Then the auditor met the monument. The printer's file is one centimeter thick and contains a purchase receipt, a depreciation schedule, and a memo from 2019 that says 'status: OK'. The auditor read the memo twice, looked at me, and I looked back. Some assets are carried at cost and carried at LEGEND, and the file supports both readings. It passed. It has passed every year.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:audits:rep-3",
          text: "They look for the gap between the story and the receipts. Every company tells itself a story — the deck, the values, the roadmap — and the audit is the annual test of whether the money agrees. Our story and our receipts have agreed for eleven years, mostly because I write the story FROM the receipts. Reverse engineering. The auditors find it boring. Boring is the…",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:audits:rep-4",
          text: "He did what. The INDUSTRIAL tin is for floods, December, and emergencies, and an auditor is none of those. But. The auditor accepted, sat in the closet for eleven minutes, and emerged a different person — softer, humbled, asking gentler questions. Janusz interviews without asking anything. The audit came back cleaner than any year on record. I have entered the coffee…",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:audits:rep-5",
          text: "Because passing is the ABSENCE of catastrophe, and absence does not cake. The celebration for a passed audit is me, closing the folder, and the folder going back on the shelf for another year. If you want a party, celebrate revenue. Revenue is loud. Compliance is silent, and silence, done correctly, sounds like nothing. Nothing is what I have spent eleven years building.…",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:audits:rep-6",
          text: "Once. 2016. One receipt for one training, dated wrong by one day, and the finding was 'timing'. Not fraud, not theft — timing. The correction took an afternoon and the lesson took permanent residence: the date is part of the number. People think accounting is about money. Accounting is about WHEN. I have not been late to anything since, including conversations. Ask anyone.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "grazyna:keyboard-import",
      label: "The keyboard import ledger",
      optionCandidates: [
        {
          id: "grazyna:keyboard-import:opt-1",
          topicId: "grazyna:keyboard-import",
          text: "How big is the keyboard import business, really?",
        },
        {
          id: "grazyna:keyboard-import:opt-2",
          topicId: "grazyna:keyboard-import",
          text: "Customs flagged one of your packages?",
        },
        {
          id: "grazyna:keyboard-import:opt-3",
          topicId: "grazyna:keyboard-import",
          text: "Why switches? Of all the hobbies?",
        },
        {
          id: "grazyna:keyboard-import:opt-4",
          topicId: "grazyna:keyboard-import",
          text: "Tomek wants a custom board. He cannot pay.",
        },
        {
          id: "grazyna:keyboard-import:opt-5",
          topicId: "grazyna:keyboard-import",
          text: "Does Dawid know his CTO's keyboards come from you?",
        },
        {
          id: "grazyna:keyboard-import:opt-6",
          topicId: "grazyna:keyboard-import",
          text: "What is the margin on a keyboard, honestly?",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:keyboard-import:rep-1",
          text: "Two containers a quarter, one spreadsheet of devotees, and a margin that funds the candle wax with change left for dignity. The keyboard community is the ideal customer base: obsessive, documented, and they PRE-PAY. I run it from the same ledger as the day job, one tab over. The tabs do not talk. The tabs have never talked. Discipline is just good filing with a firewall.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:keyboard-import:rep-2",
          text: "Once. A customs officer opened a box of forty switches and typed one to hear the sound. I explained 'tactile, sixty gram, pre-lubed' for six minutes and he waved the shipment through with the expression of a man who has heard enough for one career. The declaration was perfect. The lesson is that paperwork does not persuade people. SOUND does. He typed three switches.…",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:keyboard-import:rep-3",
          text: "Switches are honest labor measured in grams of force. Every other hobby sells you a feeling; switches sell you a SPECIFICATION, and the specification arrives in your hand and proves itself eight hours a day. I have opinions about linear versus tactile the way Marek has opinions about monitoring. The click is accountability, the bump is mercy, and the linear are for…",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:keyboard-import:rep-4",
          text: "Tomek gets the apprentice rate: he pays in documentation. One hand-written build guide per keyboard, ours to keep and sell as 'the experience'. His first guide had typos and SOUL and it outsold the professional ones, because people trust a man who admits the soldering scared him. The boy thinks he is getting a discount. He is getting a PUBLICATION. Neither of us is telling him.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:keyboard-import:rep-5",
          text: "Dawid signs the company's keyboard budget and I sign Maciek's personal invoice, and the two documents live in different worlds like church and state. Maciek pays retail. Maciek pays ON TIME. Maciek once asked for a discount and I quoted him the exact paragraph of my own terms of service where discounts are defined as 'mythical'. He accepted. The CTO respects a…",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:keyboard-import:rep-6",
          text: "Thirty percent on switches, fifty on the boutique cases, and one hundred and ten on the keycaps nobody needs and everyone buys at midnight. The margin funds the wax, the wax funds the course, and the course funds the legend. People ask how the side hustles connect. The hustles are a WHEEL, and the wheel turns on midnight impulses, which are the only renewable energy source…",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:receipts",
      label: "The receipts folder",
      optionCandidates: [
        {
          id: "grazyna:receipts:opt-1",
          topicId: "grazyna:receipts",
          text: "Why do you keep paper receipts in 2026?",
        },
        {
          id: "grazyna:receipts:opt-2",
          topicId: "grazyna:receipts",
          text: "The oldest receipt in the folder is what?",
        },
        {
          id: "grazyna:receipts:opt-3",
          topicId: "grazyna:receipts",
          text: "Someone submitted a receipt for a horse.",
        },
        {
          id: "grazyna:receipts:opt-4",
          topicId: "grazyna:receipts",
          text: "The folder survived the flood how?",
        },
        {
          id: "grazyna:receipts:opt-5",
          topicId: "grazyna:receipts",
          text: "Renata's stationery receipts are 'ink adjacent'?",
        },
        {
          id: "grazyna:receipts:opt-6",
          topicId: "grazyna:receipts",
          text: "What is the strangest thing a receipt proved?",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:receipts:rep-1",
          text: "Because paper burns, fades, and curls, and in doing so it tells you HOW OLD it is. A digital record claims to be from 2019 with the same confidence it claims anything. Paper AGES. An auditor trusts aging the way a doctor trusts symptoms. The cloud is a filing system. The folder is a witness. The witness has been right every single year, including the year the cloud had…",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:receipts:rep-2",
          text: "A coffee, two zloty forty, dated the week before I started here. The previous accountant left it in the drawer like a note: this is where the numbers start. I have kept it ever since. Every empire of receipts I have built stands on that one small coffee. Some people inherit desks. I inherited a PROVENANCE. The coffee is the oldest asset in this company that still…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:receipts:rep-3",
          text: "The horse receipt is Przemek's, and before you ask: 'client engagement, equestrian, strategic'. I rejected it on the grounds that the horse is not a client, the engagement was a birthday, and the strategy section of the receipt is written in the margin of a menu. He appealed. The appeal is in the folder, stapled to the rejection, which is stapled to his original submission.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:receipts:rep-4",
          text: "The folder lives at waist height or higher, always has, since before the flood — not from prophecy, from POSTURE. Paper on the floor is paper with an expiration date. The water came, the water went, and the receipts watched from the shelf like adults at a children's party. Marek's servers were fine because I told him to elevate them, and my receipts were fine because I…",
          relationshipHint: "pleased",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "grazyna:receipts:rep-5",
          text: "Renata solved a problem I had been fighting for a decade. Coffee was uncontrollable — it looked like hospitality, it sounded like hospitality, and hospitality has no budget. 'Ink adjacent' is not a loophole, it is a CLASSIFICATION, and classification is my love language. The coffee is stationery now. Nobody has questioned it in three years. The strong survive. The…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:receipts:rep-6",
          text: "A taxi receipt from 2021 proved Maciek was in the building at 11pm the night he told the board he was 'working remotely'. The receipt surfaced in a routine check and I said nothing, filed nothing, mentioned nothing. But I have seen the man check the folder's location twice since. The folder does not judge. The folder simply REMEMBERS, and the remembering changes…",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:taxes",
      label: "Tax season",
      optionCandidates: [
        {
          id: "grazyna:taxes:opt-1",
          topicId: "grazyna:taxes",
          text: "Tax season. How bad is the office's paperwork?",
        },
        {
          id: "grazyna:taxes:opt-2",
          topicId: "grazyna:taxes",
          text: "Przemek's boat. The full story.",
        },
        {
          id: "grazyna:taxes:opt-3",
          topicId: "grazyna:taxes",
          text: "Can training costs really be written off?",
        },
        {
          id: "grazyna:taxes:opt-4",
          topicId: "grazyna:taxes",
          text: "You do someone's personal taxes. Admit it.",
        },
        {
          id: "grazyna:taxes:opt-5",
          topicId: "grazyna:taxes",
          text: "What is a tax deduction you are proud of?",
        },
        {
          id: "grazyna:taxes:opt-6",
          topicId: "grazyna:taxes",
          text: "April. Are you human in April?",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:taxes:rep-1",
          text: "The office's paperwork is IMMACULATE and that is not pride, it is design — I built the system so that tax season is an extraction, not an excavation. Every receipt lands filed, every category closes monthly, and April finds me calm while other accountants find God. The panic you see in other offices is what happens when people file in May what they should have filed in…",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:taxes:rep-2",
          text: "The boat was submitted as 'client entertainment at sea', which has since entered office law. I rejected it, he appealed citing RELATIONSHIP CAPITAL, and I denied the appeal in a memo that quotes the definition of entertainment. The boat stayed his. The CLIENT, coincidentally, was on the boat. The client paid for his own ticket. That detail cost Przemek the appeal and…",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:taxes:rep-3",
          text: "Training is the last honest deduction left in this economy and I will defend it with my life. Courses, materials, the teacher's coffee — all of it maps to a column the tax office invented themselves, which makes claiming it not cleverness but OBEDIENCE. This office trains for a living. Our paperwork is a love letter to that column. The tax man and I understand each other.…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:taxes:rep-4",
          text: "I will confirm a census: there are personal returns in my kitchen on Sundays, and the number is small, and the names are staying names. Doing someone's personal taxes is not a favor, it is a load-bearing act of friendship — you learn everything in a return. Who they support, what they fear, whether they overpay for a gym they do not attend. The returns come back better…",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:taxes:rep-5",
          text: "The printer. Depreciating monument, 2019 cohort, and every year the schedule asks 'disposal?' and every year I write 'in service'. The deduction is trivial. The line item is THEOLOGY. Somewhere in the tax office there is a file with our printer in it, alive and well and officially not printing, and that is the closest an accountant comes to poetry. I will defend that…",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:taxes:rep-6",
          text: "In April I am a machine with a kettle, and the office knows to leave offerings: coffee at nine, silence at eleven, and no meetings after three. The candle orders pause — no, the candle orders SURGE, because burning wax is the only scent that pairs with depreciation schedules. April ends, the returns go out, and I resurface around the eighth with the complexion of a woman…",
          relationshipHint: "annoyed",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "grazyna:coffee-economics",
      label: "The coffee economics",
      optionCandidates: [
        {
          id: "grazyna:coffee-economics:opt-1",
          topicId: "grazyna:coffee-economics",
          text: "What does the office actually spend on coffee?",
        },
        {
          id: "grazyna:coffee-economics:opt-2",
          topicId: "grazyna:coffee-economics",
          text: "The good beans versus the bad beans — price gap?",
        },
        {
          id: "grazyna:coffee-economics:opt-3",
          topicId: "grazyna:coffee-economics",
          text: "Marek drinks how much? Per day?",
        },
        {
          id: "grazyna:coffee-economics:opt-4",
          topicId: "grazyna:coffee-economics",
          text: "Could we charge for coffee? Would anyone pay?",
        },
        {
          id: "grazyna:coffee-economics:opt-5",
          topicId: "grazyna:coffee-economics",
          text: "The cloud bill is framed and the coffee is not.",
        },
        {
          id: "grazyna:coffee-economics:opt-6",
          topicId: "grazyna:coffee-economics",
          text: "What is coffee worth to this company, in truth?",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:coffee-economics:rep-1",
          text: "Less than the printer's depreciation and more than the candles earn in a slow month, which places coffee precisely in the middle of this company's soul. The spend is stable, the consumption is MALE — no, immovable, and the only line item in eleven years that has never once been questioned. Not by me. Not by the auditors. Coffee is pre-approved by history and history…",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:coffee-economics:rep-2",
          text: "The good beans cost triple the bad ones and deliver, by my measurement, forty percent of the muttering improvement and one hundred percent of the morale theater. The gap is not in the cup. The gap is in the TELLING. Renata hides them, Janusz reserves them, and the office believes Tuesday beans are special. Belief is the active ingredient. I pay triple for belief and I…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:coffee-economics:rep-3",
          text: "I stopped counting Marek's cups in 2021 and started counting them as INFRASTRUCTURE. His consumption is not a cost, it is uptime — the man's outputs justify the inputs the way a server rack justifies electricity. The one time I mentioned the number aloud, he looked at me, and I have never discussed it again. Some line items are load-bearing in ways the spreadsheet…",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:coffee-economics:rep-4",
          text: "Charging for coffee would be the most profitable and fastest-failing initiative in this company's history. The first month generates revenue. The second month generates a revolution. Coffee here is not a product, it is the AIR — you do not meter air, you do not brand air, and you do not put a price on the one ritual this office has never fought about. Some things are…",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:coffee-economics:rep-5",
          text: "Pawel framed the cloud bill and it hangs on his wall like a diploma, which is the correct treatment of an education. The coffee gets no frame because coffee is not a lesson, it is a CONDITION. You frame the things that ended. Coffee never ends. There is no certificate, no completion, no diploma — just next Tuesday, and the beans, and the muttering improving by a…",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:coffee-economics:rep-6",
          text: "It is worth exactly one office. I have run it: remove coffee and the standups drift, the disagreements sharpen, and within a quarter the turnover costs more than a decade of beans. Coffee is not a line item. Coffee is the PRICE of this particular peace. I have priced peace before — it is always more expensive than caffeine, and always cheaper than the alternative. The…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "grazyna:yearend",
      label: "The year-end closing",
      optionCandidates: [
        {
          id: "grazyna:yearend:opt-1",
          topicId: "grazyna:yearend",
          text: "What does closing the year actually involve?",
        },
        {
          id: "grazyna:yearend:opt-2",
          topicId: "grazyna:yearend",
          text: "The closing week — does anyone see you?",
        },
        {
          id: "grazyna:yearend:opt-3",
          topicId: "grazyna:yearend",
          text: "Which year was the hardest close?",
        },
        {
          id: "grazyna:yearend:opt-4",
          topicId: "grazyna:yearend",
          text: "Dawid wants preliminary numbers by December 20th.",
        },
        {
          id: "grazyna:yearend:opt-5",
          topicId: "grazyna:yearend",
          text: "The first spreadsheet of January — ritual?",
        },
        {
          id: "grazyna:yearend:opt-6",
          topicId: "grazyna:yearend",
          text: "What closes that you wish stayed open?",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:yearend:rep-1",
          text: "Closing means every account tells the truth at the same time. The year's transactions reconcile, the accruals confess, and the depreciation makes its annual apology. Eleven months of judgment calls get reviewed by their judge — me, in December, with red ink and no mercy for my own guesses. The close is the one week the company is entirely honest, and it happens inside…",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:yearend:rep-2",
          text: "The office sees a door. Behind the door: one desk lamp, one thermos, the INDUSTRIAL tin at half strength, and the year laid out in columns. I surface for water and Renata leaves food with the discretion of a nurse. Marek leaves batteries. Somebody — the handwriting is careful — left a candle once, from my own line, lit. I let it burn. The close is lonely by design, but…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:yearend:rep-3",
          text: "2020. The year the numbers moved underneath me — revenue halved in a quarter and the close became an act of translation: how do you write down a year nobody planned for? I worked nine days. The books balanced, the company survived, and the spreadsheet from that year still has a note in the margin that says 'they stayed'. I close every year against that note. Some years…",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:yearend:rep-4",
          text: "Dawid receives preliminary numbers on the twentieth the way a pilot receives weather: a direction, a confidence level, and the explicit sentence 'not the truth, the forecast of the truth'. He reads the direction, nods at the confidence, and never quotes the numbers. Eleven years and he has never once quoted a preliminary. That discipline is why he is the CEO and why…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:yearend:rep-5",
          text: "The first sheet of January is always the same ritual: new file, new tab, date it, and enter one line — the opening balance of the year, carried from the close. That single number is a baton pass from one year to the next, and I enter it by hand every time, though the system could do it. The hand makes it a DECISION. The year starts when I say it starts. Everything else…",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:yearend:rep-6",
          text: "The accruals. Every year I close accounts where the work is half-done and the money is half-there, and the columns demand I pretend the year is a clean shape when it was not. The training that ran into the new year, the invoice that will arrive in February for December's coffee. The close is a FICTION, a kind one, agreed by everyone who signs it. I wish the year could…",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "grazyna:printer-ledger",
      label: "The printer's ledger",
      optionCandidates: [
        {
          id: "grazyna:printer-ledger:opt-1",
          topicId: "grazyna:printer-ledger",
          text: "Show me the printer's actual line items.",
        },
        {
          id: "grazyna:printer-ledger:opt-2",
          topicId: "grazyna:printer-ledger",
          text: "The audit found a receipt for a bean?",
        },
        {
          id: "grazyna:printer-ledger:opt-3",
          topicId: "grazyna:printer-ledger",
          text: "Insurance wanted photos of the printer?",
        },
        {
          id: "grazyna:printer-ledger:opt-4",
          topicId: "grazyna:printer-ledger",
          text: "Could the printer be sold? Hypothetically.",
        },
        {
          id: "grazyna:printer-ledger:opt-5",
          topicId: "grazyna:printer-ledger",
          text: "Marek's mug — is that on the books?",
        },
        {
          id: "grazyna:printer-ledger:opt-6",
          topicId: "grazyna:printer-ledger",
          text: "When does the depreciation schedule end?",
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:printer-ledger:rep-1",
          text: "One page, five lines, eleven years. Purchase price, depreciation, a 2019 service call that was never used, the mug — filed as 'fixture, personal property of DevOps' — and this year's carrying value, which rounds to an amount I will not say aloud in front of the machine. The ledger is the only document in this company the printer has ever appeared in, and it appears with…",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:printer-ledger:rep-2",
          text: "One bean, forty groszy, 2021, category 'office provisions, unit of one'. The auditor held it to the light like a jeweler. I explained that the receipt was inaccurate and the correction was the point — the vendor owed us one bean, delivered, and documented. He wrote 'immaterial' in the margin and I have never been so insulted by a correct technical term. Immaterial. That…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:printer-ledger:rep-3",
          text: "The policy renewal listed office equipment and the printer qualifies, so a photographer came, photographed the monument from four angles, and asked what it does. Janusz, from the corridor, said 'it rests'. The insurance company has a file with four photos and the word 'rests' in the notes. Premium unchanged. Some assets are insured for what they cost and some for what…",
          relationshipHint: "pleased",
          tags: ["quest:janusz-knows-the-plug"],
        },
        {
          id: "grazyna:printer-ledger:rep-4",
          text: "Hypothetically, its book value is a rounding error and its market value is zero, which means any sale would be pure folklore transfer. But the disposal question opens a deeper ledger: the printer is collateral in the company's STORY. Remove it and the audit narrative, the office lore, and at least three peoples' personalities lose their anchor. You do not sell the…",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:printer-ledger:rep-5",
          text: "Filed as a fixture: 'mug, one, personal property of DevOps, attached to asset PRN-2019'. Marek has never claimed it and I have never pressed. The mug's value is sentimental and the ledger does not carry sentiment — but it carries POSITION, and the position is documented. If the printer were ever removed, the mug transfers to whatever surface inherits the duty. The mug is…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:printer-ledger:rep-6",
          text: "Five years after full write-off, which came and went in silence in 2024. The schedule is complete; the ASSET continues. That is the loophole nobody talks about in accounting school — the numbers can finish and the thing does not have to. The printer is now carried entirely in narrative, which is the strongest carrying value there is: no one can depreciate a story.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "grazyna:candle-qa",
      label: "The candle quality control",
      optionCandidates: [
        {
          id: "grazyna:candle-qa:opt-1",
          topicId: "grazyna:candle-qa",
          text: "How do you quality-test a candle?",
        },
        {
          id: "grazyna:candle-qa:opt-2",
          topicId: "grazyna:candle-qa",
          text: "The 'Syntax Error' batch — uneven burn reports?",
        },
        {
          id: "grazyna:candle-qa:opt-3",
          topicId: "grazyna:candle-qa",
          text: "You test them where? The kitchen? At work?",
        },
        {
          id: "grazyna:candle-qa:opt-4",
          topicId: "grazyna:candle-qa",
          text: "Janusz rate the candle scents how?",
        },
        {
          id: "grazyna:candle-qa:opt-5",
          topicId: "grazyna:candle-qa",
          text: "A customer returned a candle for burning too fast.",
        },
        {
          id: "grazyna:candle-qa:opt-6",
          topicId: "grazyna:candle-qa",
          text: "Run the next burn test. I want in.",
          tags: ["relationship:warm"],
        },
      ],
      replyCandidates: [
        {
          id: "grazyna:candle-qa:rep-1",
          text: "Like everything else in my life: measured, timed, and written down. Burn one hour per centimeter of diameter, first burn non-negotiable, wax pool checked at each interval, tunneling logged, throw rated at thirty minutes against a control room. The control room is my kitchen and the control nose is mine. Candles are chemistry with marketing on top, and I respect the…",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:candle-qa:rep-2",
          text: "Two reports, both from the same postal code, which tells me the wicks are fine and their DRAFTS are strong. An uneven burn in a drafty room is not a defect, it is physics being rude. Still — the batch is recalled, re-wicked, and re-tested, because reputation is the one inventory I cannot restock. The loss is four hundred zloty. The alternative loss is the legend. The…",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:candle-qa:rep-3",
          text: "The office kitchen, Sundays, when the building belongs to Janusz and me. It is the only room with the ventilation of a laboratory and the forgiveness of a friend. I burn three at a time on the counter, timer beside the kettle, and the notes go into the same ledger as the company — different tab. One Sunday Janusz came in, observed the entire protocol, and said 'thorough'.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:candle-qa:rep-4",
          text: "He rated the whole line in one sentence each. 'Syntax Error': honest. 'Legacy System': accurate. The unreleased one, 'Firewatch': he smelled it for four seconds and said 'not yet', which is the most words of caution he has ever issued about anything non-flood. The candle goes back to the bench. You do not argue with a man who maintains the building's only fire. The…",
          relationshipHint: "pleased",
          tags: ["quest:janusz-knows-the-plug"],
        },
        {
          id: "grazyna:candle-qa:rep-5",
          text: "Returned for burning too fast, which is a customer describing their own evening in wax. I checked the batch, checked the wick, checked the log — the candle was correct. The customer burned it beside an open window through a two-hour argument, per the return note, which was more honest than most tax returns. I refunded anyway, with a note: 'candles burn faster in…",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:candle-qa:rep-6",
          text: "You are in, and you start as the control nose — you will smell three unlabeled candidates and rank them, and your rankings go into the ledger beside mine. Disagreement is DATA. Last cycle a fresh nose ranked 'Legacy System' first and the reorder rate proved the fresh nose right. That is why the panel is two: the auditor and the innocent. You bring the innocence, I bring…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
          offersTaskId: "grazyna:task-burn-test",
        },
      ],
    },
    {
      id: "grazyna:petty-cash",
      label: "The petty cash box",
      optionCandidates: [
        { id: "grazyna:petty-cash:opt-1", topicId: "grazyna:petty-cash", text: "There is a petty cash box? In 2026?" },
        { id: "grazyna:petty-cash:opt-2", topicId: "grazyna:petty-cash", text: "Who audits the petty cash box?" },
        { id: "grazyna:petty-cash:opt-3", topicId: "grazyna:petty-cash", text: "Can I borrow thirty zloty until Friday?" },
        { id: "grazyna:petty-cash:opt-4", topicId: "grazyna:petty-cash", text: "The cash box has a second key. Rumor?" },
        { id: "grazyna:petty-cash:opt-5", topicId: "grazyna:petty-cash", text: "What is the smallest expense you ever logged?" },
        { id: "grazyna:petty-cash:opt-6", topicId: "grazyna:petty-cash", text: "Is the petty cash ever actually petty?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:petty-cash:rep-1",
          text: "There is, and it predates every card reader in this building. Three hundred zloty, one lock, one ledger. Cards failed exactly once — the plumber, cash only, mid-flood logic — and the box has been sacred since. Modernity is fine until the water rises. Then the box is the newest technology in the room.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:petty-cash:rep-2",
          text: "Me, monthly, and myself, quarterly, which is the only honest way to hold a cash box. The ledger balances to the groszy or the difference gets its own line labeled 'mystery' — and I have never once had to write that word. The box fears me. That is the correct relationship with cash.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:petty-cash:rep-3",
          text: "No, because the box is not a bank, it is a fire extinguisher — for emergencies, not convenience. A loan from petty cash is a receipt waiting to be mislaid. Ask Kasia about the salary advance form, which exists, in triplicate, and has been approved four times in eleven years. The box is easier to say no to.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:petty-cash:rep-4",
          text: "Not a rumor — a fact. The second key lives in a sealed envelope in the safe, opened only in my presence or my documented absence. It has been opened once, for an audit, and resealed with a new signature. The envelope has never been needed. Envelopes like that are the point of envelopes.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:petty-cash:rep-5",
          text: "A bean. Forty groszy, 2021, category 'office provisions, unit of one'. It is already an office legend — the auditor held it to the light like a jeweler. The bean teaches the whole system: every groszy has a name, a date, and a purpose. The bean had all three. Best documentation this office has produced.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:petty-cash:rep-6",
          text: "It is, gloriously. Buses when the card terminal dies, stamps for the one client who refuses email, and the annual keyboard batteries. Petty means small and named. The opposite of petty is not big — it is vague. Vague spending is the only theft this office has ever come close to, and the box keeps us honest.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "grazyna:expenses",
      label: "The expense reports",
      optionCandidates: [
        { id: "grazyna:expenses:opt-1", topicId: "grazyna:expenses", text: "My expense report came back in red ink. Why?" },
        { id: "grazyna:expenses:opt-2", topicId: "grazyna:expenses", text: "What is a legitimate business meal here?" },
        { id: "grazyna:expenses:opt-3", topicId: "grazyna:expenses", text: "The client wants a receipt for the coffee I bought." },
        { id: "grazyna:expenses:opt-4", topicId: "grazyna:expenses", text: "Someone expensed a phone charger at the airport." },
        { id: "grazyna:expenses:opt-5", topicId: "grazyna:expenses", text: "Can I expense the training course I did at home?" },
        { id: "grazyna:expenses:opt-6", topicId: "grazyna:expenses", text: "Which expense category gets abused the most?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:expenses:rep-1",
          text: "Red ink is a question, not a verdict — I mark the line that lacks a story. An expense is a sentence with three words: what, whose, why. Two words is a mystery. Three words is money well spent. Resubmit with the third word and watch the ink turn black. The system is slow and perfectly fair.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:expenses:rep-2",
          text: "One where the client's presence is documented and the merchant's name is legible. The rule is proportion: a coffee that closes a contract is intelligence. A dinner that previews one is strategy. A dinner that follows one is gratitude, which is valid, but goes in a different column. Columns are cheap. Clarity is not.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:expenses:rep-3",
          text: "Then print it, because the client's finance team and mine speak the same language: nothing exists without paper. You bought goodwill for four zloty — get the receipt, staple it, and let the goodwill be auditable. The most powerful sentence in finance is 'here is the receipt'. I have ended wars with it.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:expenses:rep-4",
          text: "The charger is fine. The airport is the crime. The same cable costs nine zloty at the kiosk by my office and nineteen at any gate in Europe. I approved it, then printed the price comparison and pinned it by the coffee machine. The charger taught the whole office geography. Best training we never budgeted.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:expenses:rep-5",
          text: "Yes — if the course is real, the invoice is in your name, and the skill lands in this office within a quarter. Learning at home is work done in advance. I fund it under 'capacity'. What I do not fund is a course purchased in December for the deadline and never opened. The browser cache testifies. I check.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:expenses:rep-6",
          text: "'Client entertainment', which is the only category where the expense and the story have to match, and stories grow in the retelling. My defense is arithmetic: entertainment per client per quarter, trended. Numbers do not stop stories, but they do give them a budget. Budgeted stories are called plans.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "grazyna:licenses",
      label: "The license audit",
      optionCandidates: [
        { id: "grazyna:licenses:opt-1", topicId: "grazyna:licenses", text: "The license audit is coming. What gets checked?" },
        { id: "grazyna:licenses:opt-2", topicId: "grazyna:licenses", text: "We pay for software nobody has opened since 2023." },
        { id: "grazyna:licenses:opt-3", topicId: "grazyna:licenses", text: "Can we use the free tier forever? Strategically?" },
        { id: "grazyna:licenses:opt-4", topicId: "grazyna:licenses", text: "The design tool wants per-seat pricing. Ouch." },
        { id: "grazyna:licenses:opt-5", topicId: "grazyna:licenses", text: "An expired license broke the reporting tool. How?" },
        { id: "grazyna:licenses:opt-6", topicId: "grazyna:licenses", text: "Who negotiates the big renewals, you or Dawid?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:licenses:rep-1",
          text: "Seat count against actual logins, renewal dates against calendar reality, and one line nobody expects: who is the administrator of record. Most license horror stories are ownership horror stories — nobody knows who holds the account until the invoice arrives addressed to a man who left in 2021.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:licenses:rep-2",
          text: "Then they go on the list, which is longer than the budget and shorter than the shame. Cancellation is a ritual: one warning, one login check, one quiet removal in a quiet month. The software never complains. The vendor calls. I let it ring twice. Renewal guilt is a sales technique. I am immune. Mostly.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "grazyna:licenses:rep-3",
          text: "The free tier is a guest room, not a residence — fine for prototypes, fatal for anything a client touches. The vendor changes the terms at the exact moment your workflow depends on them, and I have watched a 'forever free' plan become 'per export' in one Tuesday. Document the exit. Then relax.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:licenses:rep-4",
          text: "Per-seat is fair and per-seat is a trap — the seats multiply like chairs in a meeting. I counter with annual flat pricing and one audit right: we count seats quarterly, they bill the truth. Vendors agree when the numbers are pre-washed. The design tool took two calls and one spreadsheet. The spreadsheet won.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:licenses:rep-5",
          text: "Because the license was attached to an email address, the address was attached to a person, and the person was attached to a farewell party. The tool did not expire — the ORGANIZATION did. Now every license has a role owner, not a person owner. Renewals go to the role. People go to the party. Cleanly.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:licenses:rep-6",
          text: "Me, with Dawid in the room for the big ones — he hears the technical promises and I hear the price escalator. A renewal is a negotiation between their growth plan and our memory: I bring last year's usage, three years of trend, and one polite sentence about the competition. Memory is leverage. I am the memory.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "grazyna:vat",
      label: "VAT season",
      optionCandidates: [
        { id: "grazyna:vat:opt-1", topicId: "grazyna:vat", text: "VAT season. What breaks first?" },
        { id: "grazyna:vat:opt-2", topicId: "grazyna:vat", text: "Can I file VAT myself or is that a trap?" },
        { id: "grazyna:vat:opt-3", topicId: "grazyna:vat", text: "The VAT rate changed mid-invoice. Chaos?" },
        { id: "grazyna:vat:opt-4", topicId: "grazyna:vat", text: "Why does every country have its own VAT rule?" },
        { id: "grazyna:vat:opt-5", topicId: "grazyna:vat", text: "Grazyna, do you actually enjoy VAT season?" },
        { id: "grazyna:vat:opt-6", topicId: "grazyna:vat", text: "What is the most common VAT mistake here?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:vat:rep-1",
          text: "Nothing breaks, and the absence of breaking IS the season. Invoices reconcile, filings land, and I sit in the eye of it with tea. The office panics about VAT the way passengers panic about turbulence. The pilots are calm. The paperwork was done in advance. Calm is a filing system wearing a smile.",
          relationshipHint: "neutral",
          tags: ["period:morning"],
        },
        {
          id: "grazyna:vat:rep-2",
          text: "You can, for now — the forms are simple and the portals are patient. The trap is not filing, it is the first anomaly: a cross-border invoice, a corrected rate, one client who registered mid-quarter. That is when amateurs call professionals in April at six pm. File yours. Keep my number. Both truths matter.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:vat:rep-3",
          text: "Not chaos — documentation. The invoice keeps its original rate, the correction gets its own line, and the ledger tells the story in order. Rate changes are just the calendar confirming that arithmetic is a living thing. My ledgers have survived three rate changes and one currency. They will survive you.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:vat:rep-4",
          text: "Because every country agrees VAT is a good idea and disagrees about everything else — rates, thresholds, and the meaning of the word 'receipt'. I file in two jurisdictions and my opinion is uniform: harmonization is a beautiful word for 'never'. The spreadsheets do the diplomacy. They are better at it than people.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:vat:rep-5",
          text: "Enjoy is a strong word. I respect it — VAT is the one tax where honesty is arithmetic, not opinion. Revenue minus costs, times a rate, filed on time. No judgment calls, no creativity invited. After a year of estimates and provisions, VAT is a cold shower. Clean. Boring. Beautiful in its boringness.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:vat:rep-6",
          text: "The missing receipt for a mileage claim, every single quarter. People remember the trip and forget the paper, and the tax office remembers neither. My fix is a photo at the wheel — plate, odometer, parking meter. Thirty seconds of camera saves three hours of correspondence. The camera is the new shoebox.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "grazyna:insurance",
      label: "The insurance files",
      optionCandidates: [
        { id: "grazyna:insurance:opt-1", topicId: "grazyna:insurance", text: "The office insurance renews this month. Worried?" },
        { id: "grazyna:insurance:opt-2", topicId: "grazyna:insurance", text: "What does the policy actually cover? Plainly?" },
        { id: "grazyna:insurance:opt-3", topicId: "grazyna:insurance", text: "The flood — how much did insurance argue?" },
        { id: "grazyna:insurance:opt-4", topicId: "grazyna:insurance", text: "Could we insure the robots? Seriously." },
        { id: "grazyna:insurance:opt-5", topicId: "grazyna:insurance", text: "The premium went up twelve percent. Fight it?" },
        { id: "grazyna:insurance:opt-6", topicId: "grazyna:insurance", text: "Is Burek covered by the liability policy?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:insurance:rep-1",
          text: "Prepared, which is better than worried. The renewal is a formality because the claim history is a love letter: one flood, zero negligence, documentation that arrives before the questions do. Insurers price fear. I provide facts. Facts are cheaper. We have paid for exactly what we used, which is the whole trick.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:insurance:rep-2",
          text: "Fire, water, liability, and 'business interruption', which is insurer for 'the weeks you cannot work'. The exclusions are where the truth lives — read them like a menu of disasters you are self-insuring. Ours: gradual leaks, which is why Janusz's inspection calendar is not just maintenance. It is premium defense.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:insurance:rep-3",
          text: "Nineteen days, and they argued process, not facts — the photos, the timestamps, the ledger all agreed, so they argued the FORM. I refiled the form. They paid. Insurance arguments are won by boring people with folders. Janusz held the folder. I held the pen. The building held. Split the credit three ways.",
          relationshipHint: "delighted",
          tags: ["quest:janusz-told-the-flood", "relationship:warm"],
        },
        {
          id: "grazyna:insurance:rep-4",
          text: "Insurable, but not worth it — three units, self-maintained, with spare parts in a closet. The premium would exceed the replacement cost in two years. I ran the numbers and told Janusz: the fleet is better off self-insured, which means HE is the insurance. He accepted. Cheapest policy in the building and the best.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:insurance:rep-5",
          text: "Fight it, with their own loss ratio — I requested our five-year claims history and compared it to the premium. One claim in five years, paid fast, and they priced us like a hazard. The letter was two paragraphs and a spreadsheet. The renewal came back at four percent. Spreadsheets negotiate better than words.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:insurance:rep-6",
          text: "He is listed as 'office presence, non-employee', which is the most honest category the policy offers. The broker asked if he was 'security'. I said he is an auditor. They priced him as a deterrent. The premium impact was zero zloty and the endorsement is one line long. Best contract clause in the folder.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:paperless",
      label: "The paperless paradox",
      optionCandidates: [
        { id: "grazyna:paperless:opt-1", topicId: "grazyna:paperless", text: "We went paperless in 2022. Explain the folders." },
        { id: "grazyna:paperless:opt-2", topicId: "grazyna:paperless", text: "The scanner has a queue older than some interns." },
        { id: "grazyna:paperless:opt-3", topicId: "grazyna:paperless", text: "Paperless failed because people print anyway." },
        { id: "grazyna:paperless:opt-4", topicId: "grazyna:paperless", text: "Which documents must stay paper by law?" },
        { id: "grazyna:paperless:opt-5", topicId: "grazyna:paperless", text: "What is the math on paper versus cloud storage?" },
        { id: "grazyna:paperless:opt-6", topicId: "grazyna:paperless", text: "Could this office ever be truly paperless?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:paperless:rep-1",
          text: "Easily: paperless means the paper moved, not the habit. Invoices arrive as PDFs and get printed for the ritual of the red pen. My compromise: digital is the record, paper is the thinking surface. I scan everything, I print almost nothing, and the almost is load-bearing. Purism is for offices without audits.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:paperless:rep-2",
          text: "The queue is not a backlog, it is a PRIORITIZATION with a paper trail — the scanner runs on Thursdays, in batches, oldest first, because age is a claim to dignity. Everything in that queue is already backed up digitally. The scanner is ceremony. The archive is the truth. Ceremony keeps the truth human.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:paperless:rep-3",
          text: "It failed because going paperless was announced, not designed. People print because the second screen is missing, or the sign-off is unclear, or the search is worse than the folder. Fix the reason, not the paper. Every printed page is a complaint about the system wearing toner. I read complaints. Then I fix them.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:paperless:rep-4",
          text: "Fewer every year, and that is the revolution nobody notices — contracts with wet signatures, certain tax originals, and one customs form for the keyboard imports. The pile of 'must be paper' fits in one drawer now. When I started, it was a room. Bureaucracy is retreating. I keep the drawer stocked. Respect a retreating enemy.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:paperless:rep-5",
          text: "Uncomfortable and honest: paper costs trees and dies once; the cloud costs rivers and hums forever. A scanned page stored for ten years may outweigh the page. My position is unfashionable — keep paper for originals, scan for access, and delete with prejudice. Storage is not free. It is somebody else's electricity bill.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:paperless:rep-6",
          text: "Yes, when two things happen: signatures get universally legal and the last auditor brings a tablet. I have watched both approach for a decade. The office is eighty percent paperless and the last twenty percent is the load-bearing part. The final page retires with the same honors as the printer. It has earned them.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "grazyna:calculators",
      label: "The calculator collection",
      optionCandidates: [
        { id: "grazyna:calculators:opt-1", topicId: "grazyna:calculators", text: "You have eleven calculators. Why, though?" },
        { id: "grazyna:calculators:opt-2", topicId: "grazyna:calculators", text: "The beige one on the shelf — is it a relic?" },
        { id: "grazyna:calculators:opt-3", topicId: "grazyna:calculators", text: "Do calculators differ, or is it marketing?" },
        { id: "grazyna:calculators:opt-4", topicId: "grazyna:calculators", text: "The office app replaced calculators. Fine?" },
        { id: "grazyna:calculators:opt-5", topicId: "grazyna:calculators", text: "Which calculator would you save in a fire?" },
        { id: "grazyna:calculators:opt-6", topicId: "grazyna:calculators", text: "Ever lose a calculation to a calculator bug?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:calculators:rep-1",
          text: "Eleven is normal. Two are daily, three are backup, and six are testimony — different decades, different logic, same arithmetic. A calculator is a witness: when the spreadsheet lies, the calculator says the truth slowly, one button at a time. Eleven is not a collection. It is a jury.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:calculators:rep-2",
          text: "Relic and functioning — 1984, all keys alive, and the display has the exact amber of a Poland that stood in queues. My predecessor used it. I used it during the flood when the laptops slept. It has never connected to anything and it has never once lied to me. There is a lesson in that. It stays on the shelf.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:calculators:rep-3",
          text: "They differ in the keys and the trust. A ten-key has keys that land like piano, and accountants develop loyalty the way pianists do. The scientific one is for vanity. The printing one is for theater — clients trust what they can hear being computed. The click is the audit trail for the soul.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:calculators:rep-4",
          text: "The app is fine for 'what is fifteen percent'. The calculator is for 'I must be certain while someone watches'. The difference is ritual: buttons commit you. Screens forgive you into error. The app can stay. When the numbers matter, my hands go to the desk drawer. The drawer has seniority.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:calculators:rep-5",
          text: "The beige 1984. It has survived one flood, three offices, and every fashion. Anything on this desk can be rebought. That one cannot — they stopped making honest keys like that in 1989. The fire plan is one calculator, one ledger, one kettle. Priority is a shape. That is the shape.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:calculators:rep-6",
          text: "Once — a floating point rounding made a spreadsheet insist that nine zloty was owed to nobody. The calculator said nine. The spreadsheet said nine and a ghost. I trusted the beige machine, found the float, and fixed it. The lesson is on a sticky note on my monitor: MACHINES AGREE, THEN YOU CHECK.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:vendor-talks",
      label: "Vendor negotiations",
      optionCandidates: [
        { id: "grazyna:vendor-talks:opt-1", topicId: "grazyna:vendor-talks", text: "The vendor raised prices twenty percent. Response?" },
        { id: "grazyna:vendor-talks:opt-2", topicId: "grazyna:vendor-talks", text: "How do you actually get a discount from anyone?" },
        { id: "grazyna:vendor-talks:opt-3", topicId: "grazyna:vendor-talks", text: "Vendors wine and dine you. Does it work?" },
        { id: "grazyna:vendor-talks:opt-4", topicId: "grazyna:vendor-talks", text: "The contract auto-renews in thirty days. Trap?" },
        { id: "grazyna:vendor-talks:opt-5", topicId: "grazyna:vendor-talks", text: "Should we threaten to leave? Does that work?" },
        { id: "grazyna:vendor-talks:opt-6", topicId: "grazyna:vendor-talks", text: "What is the best deal you ever negotiated here?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:vendor-talks:rep-1",
          text: "With their own data. Twenty percent needs twenty percent of reasons — I request the usage report, the price history, and the loss ratio, then reply with one paragraph and a graph. Half the time the increase softens. The other half, we learn what the product is worth. Both outcomes are information. Information is leverage.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:vendor-talks:rep-2",
          text: "You do not ask for a discount. You ask for a different shape — annual billing for two months free, three seats for the price of five, training thrown in. Vendors defend prices and surrender shapes. Prices are identity. Shapes are logistics. I negotiate with logistics. More honest. It works.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:vendor-talks:rep-3",
          text: "The dinner is a version of the invoice — it arrives before the invoice and tastes better. I attend, I enjoy, and I sign nothing that week. The rule is daylight: every offer discussed over wine gets repeated in an email the next morning. If it cannot survive daylight, it was not an offer. It was a mood.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:vendor-talks:rep-4",
          text: "It is a trap with a calendar, and the calendar is the negotiation. My rule: every auto-renewal gets a dated reminder ninety days out, because the cancellation window is the only leverage that comes free. Miss the window and the vendor has won without a call. Calendars are weapons. Mine stays loaded.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:vendor-talks:rep-5",
          text: "The threat works once and then it is noise. The credible version costs effort: one alternative quote, real, in hand, from a vendor you would actually use. Then the sentence is not a threat, it is a weather report. 'Here is the market.' Markets move vendors faster than tempers. I bring markets.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:vendor-talks:rep-6",
          text: "The printer maintenance contract, 2019 — I walked in with eleven years of repair history and walked out with 'monitor forever, fix only when broken'. They thought they won. The printer never needed them again. Best deal I ever did was the one the machine let me stop making. The contract is framed. Not the printer.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:payroll",
      label: "Payroll day",
      optionCandidates: [
        { id: "grazyna:payroll:opt-1", topicId: "grazyna:payroll", text: "Payroll day. What does the office not see?" },
        { id: "grazyna:payroll:opt-2", topicId: "grazyna:payroll", text: "The payslip gross-to-net gap upsets people. Explain?" },
        { id: "grazyna:payroll:opt-3", topicId: "grazyna:payroll", text: "Salaries landed late once. Recount the story." },
        { id: "grazyna:payroll:opt-4", topicId: "grazyna:payroll", text: "Why does payroll take three days of your month?" },
        { id: "grazyna:payroll:opt-5", topicId: "grazyna:payroll", text: "Can payslips be simpler? Nobody reads them." },
        { id: "grazyna:payroll:opt-6", topicId: "grazyna:payroll", text: "What is the best part of payroll day?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:payroll:rep-1",
          text: "The reconciliation: every name, every account, every groszy told the same story twice before it leaves. The office sees a deposit. I see a chain of arithmetic that cannot have one weak link — one wrong digit is a Tuesday of apology emails. Payroll is the one mistake-free zone I maintain with fear and checklists.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:payroll:rep-2",
          text: "The gap is not theft, it is the state arriving in layers — pension, health, tax, each with its own receipt printed on the slip. I tell people: the gross is the negotiation, the net is the delivery, and the middle is the country. Nobody likes the middle. Everyone likes the roads. The payslip holds both truths.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:payroll:rep-3",
          text: "Once, in 2018, by one bank holiday — MY error, my calendar, my confession. I called every affected person before they noticed, paid the instant-transfer fees myself, and built the holiday calendar into the payroll run the same week. The lesson cost one afternoon. The calendar has not missed since. Tuition model.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:payroll:rep-4",
          text: "Because salaries are not numbers, they are promises with paperwork — contracts, bands, overtime, one garnishment order that takes an hour of care. The run itself is minutes. The care is the days. Anyone can move money. Moving it so forty humans are exactly, provably right — that is the three days.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:payroll:rep-5",
          text: "Simpler, no — you cannot simplify a tax code by wishing. Readable, yes, and I added a plain-language line once: 'this is your money before the country's part'. The complaints dropped by half. People do not hate numbers. They hate numbers with no nouns. Nouns are the whole trick of payslips.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:payroll:rep-6",
          text: "The silence after the run — no queries, no corrections, the ledger clean and the building unaware that forty households just got exactly what they were owed. Payroll done perfectly is invisible. Invisible is the highest review this office gives. I collect it monthly. It never gets old.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "grazyna:candle-shipping",
      label: "Candle logistics",
      optionCandidates: [
        { id: "grazyna:candle-shipping:opt-1", topicId: "grazyna:candle-shipping", text: "The candle orders doubled. Can the system hold?" },
        { id: "grazyna:candle-shipping:opt-2", topicId: "grazyna:candle-shipping", text: "Shipping candles in summer — survival rates?" },
        { id: "grazyna:candle-shipping:opt-3", topicId: "grazyna:candle-shipping", text: "A courier dropped a box of 'Syntax Error'. Aftermath?" },
        { id: "grazyna:candle-shipping:opt-4", topicId: "grazyna:candle-shipping", text: "Do the candles ship with instructions?" },
        { id: "grazyna:candle-shipping:opt-5", topicId: "grazyna:candle-shipping", text: "International candle orders. Customs feelings?" },
        { id: "grazyna:candle-shipping:opt-6", topicId: "grazyna:candle-shipping", text: "Could the candle business ship from the office?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:candle-shipping:rep-1",
          text: "It held at double and it will hold at triple — the system is one spreadsheet, one packing station in my kitchen, and a courier who knows the boxes. Capacity is not a warehouse. Capacity is a Saturday and a checklist. When the checklist breaks, I will buy a second Saturday. Until then, wax obeys the ledger.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:candle-shipping:rep-2",
          text: "Ninety-eight percent, thanks to one trick: ship at night, pack with insulation, and include a card that says 'rest in shade for two hours' — candles and interns share the same onboarding. The melted two percent gets rebatched and sold as 'rustic'. Waste is a naming problem. Naming is cheap.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:candle-shipping:rep-3",
          text: "The courier wrote an apology. The wax was rebatched, the wicks were fine, and the customer got two candles for one and a note explaining that 'Syntax Error' had, in transit, achieved its final form. The customer posted it. Sales went up. Losses are content if you file them correctly. The ledger filed it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:candle-shipping:rep-4",
          text: "Every box: one card, four lines — first burn one hour, trim the wick, never in a draft, and 'the candle remembers how you treat it'. The last line is not marketing. It is true, and it cut returns by a third. People obey instructions that sound like wisdom. Wisdom is maintenance with better wording.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:candle-shipping:rep-5",
          text: "Customs opened one box and held the wicks for a week over a classification. I now ship with a typed note: 'scented wax, decorative, non-food'. The note ends the conversation before it starts. Customs and auditors are the same animal — they respect paperwork that anticipates them. Anticipation is the game.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:candle-shipping:rep-6",
          text: "Never — the office is for the ledger and the kitchen is for wax, and the wall between them is the only thing keeping the hobby a profit. Inventory in the storage room would meet the banner graveyard and the crocodile and become lore, not stock. The candle business stays home, where the nights stay quiet.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "grazyna:archive",
      label: "The archive room",
      optionCandidates: [
        { id: "grazyna:archive:opt-1", topicId: "grazyna:archive", text: "The archive room has a smell. What is it?" },
        { id: "grazyna:archive:opt-2", topicId: "grazyna:archive", text: "How far back does this office's paper go?" },
        { id: "grazyna:archive:opt-3", topicId: "grazyna:archive", text: "Can documents be deleted from the archive?" },
        { id: "grazyna:archive:opt-4", topicId: "grazyna:archive", text: "The archive survived the flood. How exactly?" },
        { id: "grazyna:archive:opt-5", topicId: "grazyna:archive", text: "Who has archive access? The complete list." },
        { id: "grazyna:archive:opt-6", topicId: "grazyna:archive", text: "What is the strangest thing filed by mistake?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:archive:rep-1",
          text: "Paper, toner, and time — the smell of facts aging gracefully. Digital files have no smell, which is why nobody trusts them emotionally. The archive announces its contents. You walk in and the building says 'records'. I have considered bottling it. The candles could use a competitor.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:archive:rep-2",
          text: "1998, in theory, and 2004 in practice — the early years are one box labeled 'history, various' by a man who has retired twice since. I re-boxed it in 2019 with dates and dignity. The archive before me was an archaeology dig. After me, it is a library. Libraries have indexes. Digs have brushes.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:archive:rep-3",
          text: "Deleted — no. Retired, yes. Documents get a retention schedule, and when the schedule ends, the paper is pulped and the event is logged. Nothing vanishes. Everything graduates. The archive is not a museum or a tomb. It is a school with strict graduation rules and no alumni newsletter.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:archive:rep-4",
          text: "Waist height, always — the shelves start a meter up, a rule older than my employment. The water came, the water looked at the bottom shelf, and the bottom shelf held nothing but the mop stock. The archive did not survive by luck. It survived by architecture. Architecture is documentation that works.",
          relationshipHint: "neutral",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "grazyna:archive:rep-5",
          text: "Me, Janusz, and the external auditor for the duration of a visit, which is the complete list and has been for a decade. The archive is where the company keeps its promises. Promises do not need an open-door policy. They need one boring person with a ledger and one honest cleaner with keys. We are both.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:archive:rep-6",
          text: "A child's drawing of the office, filed under 'invoices, pending', circa 2015. It was somebody's daughter visiting, and the invoice folder was the nearest folder with a mouth. I refiled it under 'heritage'. It is the only document in the archive that was never a promise. It is the only one anyone asks to see.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:pens",
      label: "The pen cup",
      optionCandidates: [
        { id: "grazyna:pens:opt-1", topicId: "grazyna:pens", text: "The pen cup at reception is empty again. Who?" },
        { id: "grazyna:pens:opt-2", topicId: "grazyna:pens", text: "Why do finance people hoard the good pens?" },
        { id: "grazyna:pens:opt-3", topicId: "grazyna:pens", text: "The office pens — brand them or leave them?" },
        { id: "grazyna:pens:opt-4", topicId: "grazyna:pens", text: "Someone took your pen. The taped one. War?" },
        { id: "grazyna:pens:opt-5", topicId: "grazyna:pens", text: "Do pens still matter in a signature-free age?" },
        { id: "grazyna:pens:opt-6", topicId: "grazyna:pens", text: "Describe your pen. One sentence." },
      ],
      replyCandidates: [
        {
          id: "grazyna:pens:rep-1",
          text: "The cup empties at the speed of honesty — pens leave with the people who needed one at the door. I refill it weekly with the pens nobody loves, and the good ones live in my drawer. This is not stinginess. It is inventory management with a lesson attached. The lesson is the drawer.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:pens:rep-2",
          text: "Because the pen is the last instrument of the trade — contracts, corrections, the red line on a bad invoice. A finance person's pen is a stethoscope. Nobody lends a stethoscope. The cup gets the general population. The drawer gets the specialists. Every profession has a hierarchy. Ours is ink-based.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:pens:rep-3",
          text: "Leave them anonymous — a branded pen is a question ('whose?') and an anonymous pen is furniture. Nobody steals furniture. The day we brand the pens, they become merchandise, and merchandise walks. I ran the experiment in 2022. Branded pens lasted nine days. The anonymous ones are eternal. Marketing can cope.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:pens:rep-4",
          text: "Not war — recovery. The taped pen has my name, my tape, and my handwriting on it, and it came back within the hour, left on my desk with a coffee. The system works because the tape is a joke everyone respects. Possession is nine tenths of the law. The tenth tenth is labeling. I label.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:pens:rep-5",
          text: "More than ever — signatures moved to screens, so the pen's job narrowed to truth: the correction, the note, the margin. A typed comment is a suggestion. A handwritten one on a paper invoice is a decision. Ink is how the ledger knows I was physically present. Presence is an audit trail. Pens are its teeth.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:pens:rep-6",
          text: "Ballpoint, medium, black, bought in dozens, kept in one drawer, never more than an arm's length from the ledger. No sentiment. No collectibles. A pen is a tool that agrees to be lost, and I only buy tools that accept the risk. The tape is for the one that did not. Everyone needs one exception.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "grazyna:fines",
      label: "The internal fine system",
      optionCandidates: [
        { id: "grazyna:fines:opt-1", topicId: "grazyna:fines", text: "Is it true you fine departments? Legally?" },
        { id: "grazyna:fines:opt-2", topicId: "grazyna:fines", text: "The five zloty recycling fine — collected how?" },
        { id: "grazyna:fines:opt-3", topicId: "grazyna:fines", text: "What gets fined that nobody expects?" },
        { id: "grazyna:fines:opt-4", topicId: "grazyna:fines", text: "Has anyone ever refused to pay a fine?" },
        { id: "grazyna:fines:opt-5", topicId: "grazyna:fines", text: "Where does the fine money actually go?" },
        { id: "grazyna:fines:opt-6", topicId: "grazyna:fines", text: "Would you fine the CEO? Hypothetically." },
      ],
      replyCandidates: [
        {
          id: "grazyna:fines:rep-1",
          text: "Legally as 'internal cost allocation', which is accountant for 'we both know what this is'. No law is broken and no court would care — the fines never leave the building, they just move money from the careless column to the careful one. It is the only justice system I have fully understood. It balances.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:fines:rep-2",
          text: "Honor system, with a ledger — you log the fine yourself, next to the incident, and the act of writing is the punishment. Ninety percent self-report, ten percent Janus-eyed memory. Self-filing works because the alternative is being filed BY me, and my handwriting in red is a sentence nobody wants repeated.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:fines:rep-3",
          text: "Meeting rooms left unbooked and unemptied — five zloty, category 'phantom booking'. The fines killed the ghost meetings in one quarter. Not the money. The RECEIPT. Nobody wants to explain a fine for a meeting that never happened. The ledger outperformed every calendar app this office ever bought.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:fines:rep-4",
          text: "Once, 2021, and the refusal was the fine — he argued, I listened, the invoice stood. He paid it a week later with a coffee stapled to it. The system survives on one thing: every fine comes with the rule, the incident, and the amount, pre-written. Argue with the rule. Never with the ledger. The ledger is neutral.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:fines:rep-5",
          text: "The petty cash box, closing the circle — fines fund the bus fares, the stamps, and the annual keyboard batteries. The money never leaves; it descends from the careless to the emergency. It is the most honest tax in the building. The circulation is printed on the closet door. Transparency is a deterrent too.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:fines:rep-6",
          text: "Hypothetically, yes. Practically, the CEO has never been fined, because his expenses arrive with receipts attached in triplicate, out of fear I did not create and cannot explain. The fine system keeps the building honest and the fear keeps the top floor honest. Between them, the ledger sleeps well.",
          relationshipHint: "delighted",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "grazyna:task-focus-course",
      title: "The 'Intro to Focus' course",
      description: "Record the course that sells the candle: 'Intro to Focus', brought to you by 'Syntax Error' (ozone, old keyboard, ambition). Grazyna handles production and the tax black magic. The split is clean, the candle is poured, and the wellness industry will not know what hit it.",
      flagToSet: "grazyna-candle-partner",
      rewardHint: "+candle partnership, sixty-forty",
    },
    {
      id: "grazyna:task-burn-test",
      title: "The burn test panel",
      description: "Sunday morning, office kitchen, three unlabeled candles and a timer. You are the control nose: smell, rank, and sign the ledger beside Grazyna's columns. Disagreement is data. The last fresh nose reordered a whole product line and got a percent of nothing and a percent of everything. Bring nothing. Your nose is the whole resume.",
      flagToSet: "grazyna-burn-test",
      rewardHint: "+control nose, certified",
    },
  ],
};

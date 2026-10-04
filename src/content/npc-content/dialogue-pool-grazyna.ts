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
    {
      id: "grazyna:master-workbook",
      label: "The master workbook",
      optionCandidates: [
        { id: "grazyna:master-workbook:opt-1", topicId: "grazyna:master-workbook", text: "What is in the master workbook, exactly?" },
        { id: "grazyna:master-workbook:opt-2", topicId: "grazyna:master-workbook", text: "The workbook is one file. One. No backups?" },
        { id: "grazyna:master-workbook:opt-3", topicId: "grazyna:master-workbook", text: "Zosia asked to see the master workbook." },
        { id: "grazyna:master-workbook:opt-4", topicId: "grazyna:master-workbook", text: "Sheet forty-one is called 'do not'. Intentional?" },
        { id: "grazyna:master-workbook:opt-5", topicId: "grazyna:master-workbook", text: "Pawel offered to migrate it to the cloud." },
        { id: "grazyna:master-workbook:opt-6", topicId: "grazyna:master-workbook", text: "What happens to the workbook when you retire?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:master-workbook:rep-1",
          text: "Ninety-one sheets. Every zloty this company has moved since 2015, every promise made to a supplier, and one sheet of candles for the market stall, which is none of the company's business and perfectly labeled. The workbook is not a file. It is the company's diary, written in columns, which is the only honest genre.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:master-workbook:rep-2",
          text: "Two backups, on drives that have never touched the internet, in a drawer that has never flooded, in a building I have personally inspected for water risk. The cloud is someone else's drawer with a monthly fee. I have had a drawer for forty years and it has never once charged me for access during an outage.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:master-workbook:rep-3",
          text: "She saw sheet one, the cash summary, for eleven minutes, and left looking like a woman who had visited a shrine. The rest stays closed — not from secrecy, from mercy. Managers who see everything start managing everything, and the workbook works because it judges no one. Judgment is my job and I am salaried for it.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:master-workbook:rep-4",
          text: "It holds three line items from 2019 that I have not been able to explain to my own satisfaction. I document what I cannot prove and I do not delete what I do not understand. Every accountant has a 'do not' sheet. Most hide it. Mine is labeled, which is the entire difference between superstition and bookkeeping.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:master-workbook:rep-5",
          text: "He offered with such hope. I asked him one question: 'if the internet dies on the twenty-eighth, who tells the cleaners they are paid?' He looked at the floor, which is where the drives live, and understood. The boy learns. Not from courses — from questions with floors in them.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:master-workbook:rep-6",
          text: "There is a successor sheet, tabbed, labeled, with a cover note that says 'start at sheet one, do not start at the candles'. Retirement is a handover or it is an evacuation, and I refuse to evacuate a diary. Whoever inherits it will curse the columns for a year and then defend them like a language. Everyone does. The columns are fluent by year two.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "grazyna:overdue-invoices",
      label: "The overdue invoices",
      optionCandidates: [
        { id: "grazyna:overdue-invoices:opt-1", topicId: "grazyna:overdue-invoices", text: "How overdue is the oldest invoice right now?" },
        { id: "grazyna:overdue-invoices:opt-2", topicId: "grazyna:overdue-invoices", text: "Your reminder emails are polite. Suspiciously polite." },
        { id: "grazyna:overdue-invoices:opt-3", topicId: "grazyna:overdue-invoices", text: "A client paid twice by mistake again." },
        { id: "grazyna:overdue-invoices:opt-4", topicId: "grazyna:overdue-invoices", text: "Przemek promised the client would pay 'next week'." },
        { id: "grazyna:overdue-invoices:opt-5", topicId: "grazyna:overdue-invoices", text: "Do you ever write off a debt?" },
        { id: "grazyna:overdue-invoices:opt-6", topicId: "grazyna:overdue-invoices", text: "The 300-day invoice. Tell me it closed." },
      ],
      replyCandidates: [
        {
          id: "grazyna:overdue-invoices:rep-1",
          text: "Two hundred and sixty-one days, a company that renews with us every year and pays like the invoice is a rumor. The age is not the problem. The age is information — I know their cash cycle better than their own finance team by now. Patience is not softness. Patience is a ledger reading itself out loud.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:overdue-invoices:rep-2",
          text: "Polite closes faster than sharp. Reminder one is warm, two is precise, three has the word 'schedule' in it, and four is written as if a lawyer dictated it slowly. The client never knows which reminder is the last one before the tone changes. Neither do I, until the moment. The politeness is a scale, and I own the scale.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:overdue-invoices:rep-3",
          text: "It happens twice a year and each time it is the same dance: I return the money with a note that says what happened and why it is theirs. Six days later the SAME client sends the original amount again, correctly. The double payment is how some companies say thank you. I do not argue with the dialect. I document it and move on.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:overdue-invoices:rep-4",
          text: "He did, and 'next week' is now in its ninth consecutive week, which in sales units is apparently still next week. I have stopped notifying Przemek and started notifying the calendar. The calendar does not believe salesmen. The calendar just gets closer. Eventually next week IS this week, and I am always already sitting in it.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:overdue-invoices:rep-5",
          text: "Twice in twenty years, both times with a funeral involved. You write off a debt when collecting it costs more humanity than the number holds. The write-off is not weakness — it is the ledger admitting the world. I sign those personally, in ink, and I remember the names. The rest of the ledger forgives. I do the remembering.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:overdue-invoices:rep-6",
          text: "It closed at three hundred and eleven days, paid in full, with an apology letter from their new CFO who found it during an onboarding audit. I framed nothing. I filed everything. The apology letter is in the folder behind the invoice, in order, as history. The folder is complete. That is better than a frame. A frame ends a story. A folder keeps it for whoever asks next.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:cake-accounting",
      label: "The cake fund",
      optionCandidates: [
        { id: "grazyna:cake-accounting:opt-1", topicId: "grazyna:cake-accounting", text: "Is there really a formal cake fund?" },
        { id: "grazyna:cake-accounting:opt-2", topicId: "grazyna:cake-accounting", text: "The cake fund is short again. Again." },
        { id: "grazyna:cake-accounting:opt-3", topicId: "grazyna:cake-accounting", text: "Who decides which cake gets bought?" },
        { id: "grazyna:cake-accounting:opt-4", topicId: "grazyna:cake-accounting", text: "Grazyna, do you ever eat the cake?" },
        { id: "grazyna:cake-accounting:opt-5", topicId: "grazyna:cake-accounting", text: "Przemek expensed a cake to the cake fund." },
        { id: "grazyna:cake-accounting:opt-6", topicId: "grazyna:cake-accounting", text: "Why does a cake fund need a ledger?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:cake-accounting:rep-1",
          text: "There is. Five zloty a month, voluntary, collected in a tin that predates the company. Twelve years of birthday arithmetic in one tin. It has covered ninety-one cakes, two emergency cakes, and one cake that was apologized for. The tin has never once been late. Some institutions in this building run on invoices. The best one runs on five zloty and shame.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:cake-accounting:rep-2",
          text: "It is short because four new hires have not been told about the tin, which is an onboarding failure I have now escalated to myself. The shortfall is eleven zloty. I cover it, annotated 'advance', and the tin repays me by March. The cake arrives on time regardless. Cakes do not wait for receivables. That is the fund's entire culture.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:cake-accounting:rep-3",
          text: "The birthday person's desk neighbors decide, by process of asking, and the budget decides the size. There is no committee. Committees ruin cake the way they ruin everything — slowly, with minutes. The system is: two neighbors, one budget line, one hour. It has worked for twelve years and survived three office moves. The tin moves with the office. Priority of transport.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:cake-accounting:rep-4",
          text: "The dry corner piece, with tea, standing, usually discussing the invoice while the others sing. I do not sit for songs. But I eat the corner, because the corner is what is left after fairness and somebody should eat what fairness leaves. That is also my job description, if you want it in one sentence.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:cake-accounting:rep-5",
          text: "He expensed a CLIENT cake to the birthday tin, which is the financial equivalent of using the collection plate as a coaster. The receipt was returned with two words: 'wrong tin'. He repaid it the same day, with interest, in the form of a second cake nobody had ordered. The tin has never been healthier. Sometimes a violation is a deposit.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:cake-accounting:rep-6",
          text: "Because a fund without a ledger is a rumor, and rumors about money end friendships. The cake ledger is one page, in the tin, updated in pen. Five zloty in, cake out, name, date. Twelve years on one page. When people ask what I actually do here, I show them that page. The whole job is: write down what happened, so nobody has to argue about it later.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "grazyna:euro-question",
      label: "The euro question",
      optionCandidates: [
        { id: "grazyna:euro-question:opt-1", topicId: "grazyna:euro-question", text: "What happens to our invoices if we join the euro?" },
        { id: "grazyna:euro-question:opt-2", topicId: "grazyna:euro-question", text: "Would the euro be good for the candle business?" },
        { id: "grazyna:euro-question:opt-3", topicId: "grazyna:euro-question", text: "Zosia says the euro is a communications topic." },
        { id: "grazyna:euro-question:opt-4", topicId: "grazyna:euro-question", text: "Your spreadsheets are currency-proof, right?" },
        { id: "grazyna:euro-question:opt-5", topicId: "grazyna:euro-question", text: "Maciek priced a deal in euros already." },
        { id: "grazyna:euro-question:opt-6", topicId: "grazyna:euro-question", text: "Do you remember the last currency change?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:euro-question:rep-1",
          text: "Nothing dramatic. The numbers keep their relationships; only the names change. Every price in the workbook has a currency column since 2016, because clients drift in and out of euros like weather. The day the country joins, I press one button, check two hundred rows by hand anyway, and sleep well. Preparation is boring. So is a bridge that holds.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:euro-question:rep-2",
          text: "The stall prices round up. Germans pay without counting, which is a kind of economy I respect and do not practice. Candles are an impulse in any currency — nobody has ever needed a candle at a specific exchange rate. The euro would change the ledger, not the wax. Wax is eternal. The rest is accounting.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:euro-question:rep-3",
          text: "Everything is a communications topic to Zosia, including gravity. But she is right this once — a currency change is ten percent arithmetic and ninety percent people being frightened at copy machines. I will handle the ten percent in a weekend. The ninety percent needs her blazer, her voice, and a week of cake in the kitchen. Division of labor.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:euro-question:rep-4",
          text: "Every formula keys off the currency column. The workbooks have been bilingual since a client from Brno made me humble in 2017. Currency-proof is not a feature you add in a crisis. It is a habit you keep for years out of suspicion. Suspicion has saved this company more money than any deal ever brought in.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:euro-question:rep-5",
          text: "He did, at a rate he invented in the taxi. The invoice went out with a euro figure that was off by our whole coffee budget. I corrected it silently and deducted nothing from his confidence, which would have been theft. The deal closed anyway. The client never knew. The workbook knew. The workbook always knows and never tells.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:euro-question:rep-6",
          text: "The denary to zloty, 1995. My mother kept both in a sugar tin for a year, just in case history changed its mind. History did not. But I learned the truth of currency: it is collective belief with a serial number. The euro, the zloty, candles at a market stall — all of it runs on people agreeing. My job is being the one person who checks the agreement against the paper.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "grazyna:round-numbers",
      label: "The round number rule",
      optionCandidates: [
        { id: "grazyna:round-numbers:opt-1", topicId: "grazyna:round-numbers", text: "Why do you reject every round-number receipt?" },
        { id: "grazyna:round-numbers:opt-2", topicId: "grazyna:round-numbers", text: "One receipt was 247.83. You approved it instantly." },
        { id: "grazyna:round-numbers:opt-3", topicId: "grazyna:round-numbers", text: "Przemek submits only round numbers. On purpose?" },
        { id: "grazyna:round-numbers:opt-4", topicId: "grazyna:round-numbers", text: "Is the round number rule a superstition?" },
        { id: "grazyna:round-numbers:opt-5", topicId: "grazyna:round-numbers", text: "A client invoiced us a perfect thousand. React?" },
        { id: "grazyna:round-numbers:opt-6", topicId: "grazyna:round-numbers", text: "Where did the rule come from?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:round-numbers:rep-1",
          text: "Because life does not come in round numbers. A real taxi is 43.70. A real lunch is 61.15. A receipt that says 200.00 is a story someone rounded before I could check it. I do not accuse. I ask for the itemized version, and the itemized version always has a .37 in it somewhere. Honesty has decimals. Always has.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:round-numbers:rep-2",
          text: "247.83 is a receipt with a pulse — someone actually paid it. Approved in eleven seconds and I flagged the vendor as trustworthy, which in my ledger is a promotion. Vendors do not know they are being graded. Every receipt is an exam and most fail on vibes alone. That one had vibes AND arithmetic.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:round-numbers:rep-3",
          text: "On purpose, and we have an arrangement now: he submits 90.00, I return it with a note asking for the actual figure, and he resubmits 87.50. Two emails, every month, for nine years. The dance is not about the money. The dance is how he proves he submitted something real underneath. I could stop the dance. The dance is the audit.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:round-numbers:rep-4",
          text: "It is statistics wearing a superstition costume. Fraud is lazy and laziness rounds. The rule catches nothing on its own — it just decides WHERE I look first. A good auditor is not a machine. A good auditor is a woman with limited hours and a ranked list of suspicions. Round numbers top the list. They have for forty years. The list stays undefeated.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:round-numbers:rep-5",
          text: "I paid it. Client invoices are their confession, not mine — if they bill a thousand flat, that is their culture and my discount. My rule governs what LEAVES this company, not what enters. Money arriving in round numbers is a gift. Money leaving in round numbers is a question. The asymmetry is the whole craft.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:round-numbers:rep-6",
          text: "1988. A warehouse I will not name, a manager who expensed exactly 500 every single month for 'fuel', for a car I had never seen. I asked to see the car. There was no car. There has not been a car since 1988 and I have not trusted a round number since. The rule is not about numbers. The rule is about cars that do not exist.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:bank-lunch",
      label: "The bank lunch",
      optionCandidates: [
        { id: "grazyna:bank-lunch:opt-1", topicId: "grazyna:bank-lunch", text: "You vanish at 11:30 daily. Where to?" },
        { id: "grazyna:bank-lunch:opt-2", topicId: "grazyna:bank-lunch", text: "Why a physical bank in the digital age?" },
        { id: "grazyna:bank-lunch:opt-3", topicId: "grazyna:bank-lunch", text: "The tellers know your order. Confirmed?" },
        { id: "grazyna:bank-lunch:opt-4", topicId: "grazyna:bank-lunch", text: "Zosia scheduled a call at 11:30. Bold." },
        { id: "grazyna:bank-lunch:opt-5", topicId: "grazyna:bank-lunch", text: "Is it true you walk the same route every day?" },
        { id: "grazyna:bank-lunch:opt-6", topicId: "grazyna:bank-lunch", text: "The bank branch might close. Feelings?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:bank-lunch:rep-1",
          text: "The bank, then soup, in that order, at that hour, because the bank empties at 11:30 and the soup line forms at 12:00. The gap is my office away from the office. Deposits, documents, one conversation with a human who knows my account without a screen. Then soup. The schedule has survived four directors and one flood. It will survive you.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:bank-lunch:rep-2",
          text: "Because when something breaks at 16:50 on the last day of the quarter, the app shows me a queue and the branch shows me a person. I have watched two companies lose a week to an app update. The branch is my backup drive. You do not mock a woman's backup drive. You envy it quietly, like everyone else.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:bank-lunch:rep-3",
          text: "Confirmed, and it is not an order, it is a summary. Tea, no sugar, and the room's temperature discussed in one sentence. Fifteen years of Tuesdays. The tellers have watched my signature age like a tree. When Kasia interviews candidates, she does not mention that part of the company culture. The bank tellers are our best reference check.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:bank-lunch:rep-4",
          text: "She did, once, in 2019. The call happened without me and produced a decision she reversed the next morning. My 11:30 has outlived every meeting that ever challenged it. She knows the route now — books around it, like tide. A manager who respects the bank walk is a manager whose budgets clear on time. These things are connected. Nothing here is unconnected.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:bank-lunch:rep-5",
          text: "Same route, twenty years. Past the cobbler, through the small square, past the bench where a man has fed pigeons since before some of these pigeons were born. The route is not ritual for its own sake. It is reconnaissance — I know every shop that opened, every shop that died. The street is a ledger and I read it daily. It has never once needed a reminder email.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:bank-lunch:rep-6",
          text: "The branch closes, the people move two streets over, and I follow, because I bank with PEOPLE who happen to have a building. The building is furniture. The soup schedule adjusts by four minutes. But I will say this — the day they close that branch, the square loses its last reason to be busy, and streets like that do not come back.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "grazyna:forecasting",
      label: "The forecasting",
      optionCandidates: [
        { id: "grazyna:forecasting:opt-1", topicId: "grazyna:forecasting", text: "Your forecast is always lower than Maciek's." },
        { id: "grazyna:forecasting:opt-2", topicId: "grazyna:forecasting", text: "How accurate are your forecasts, honestly?" },
        { id: "grazyna:forecasting:opt-3", topicId: "grazyna:forecasting", text: "What breaks your forecast every time?" },
        { id: "grazyna:forecasting:opt-4", topicId: "grazyna:forecasting", text: "Zosia wants a forecast the team can see." },
        { id: "grazyna:forecasting:opt-5", topicId: "grazyna:forecasting", text: "Dawid reads your forecast before the board deck." },
        { id: "grazyna:forecasting:opt-6", topicId: "grazyna:forecasting", text: "Teach me to forecast in one lesson." },
      ],
      replyCandidates: [
        {
          id: "grazyna:forecasting:rep-1",
          text: "His forecast is a wish in a suit. Mine is the wish minus weather, holidays, one client's moods, and the printer. The gap between our numbers is not disagreement — it is the price of optimism, itemized. When our lines meet, it means either excellent news or excellent lying, and I check which before I congratulate anyone.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:forecasting:rep-2",
          text: "Within five percent on the quarter, within two on the year, and embarrassingly exact on the parts nobody cares about — stationery, drains, the candles. Precision on big numbers is luck. Precision on small numbers is discipline. I publish the big ones with a margin and the small ones with a threat. The threats keep everyone honest and the margins keep me employed.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:forecasting:rep-3",
          text: "August. Every year. Half the country is at the sea, the clients slow-reply, and one deal always slips into September wearing August's clothes. I have built the August dip into the model since 2018 and I still get a call every August asking why revenue is 'suddenly' seasonal. The sea, Zosia. The sea is suddenly seasonal. It is seasonal every year. That is what seasonal means.",
          relationshipHint: "annoyed",
          tags: ["period:afternoon"],
        },
        {
          id: "grazyna:forecasting:rep-4",
          text: "She can have the shape, not the cells. A visible forecast becomes a promise, and a promise becomes a hostage situation when the printer dies in March. I will publish the curve and the confidence, which is honest, and withhold the decimal, which is mercy. Teams need direction, not digits. Digits are for the two of us and our private war.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:forecasting:rep-5",
          text: "He does, and he has never once asked me to raise it. That is the whole relationship. The board deck is where everyone's hopes go dressed as numbers; my forecast is where the numbers go undressed. He reads mine to know what is actually true, then walks upstairs and governs accordingly.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:forecasting:rep-6",
          text: "One lesson: count what already happened, then subtract what could still not happen. Most people forecast by adding hopes to the present. You forecast by subtracting risks from it. The present is the only fact you own. Everything else is a rumor about the future, and I do not book rumors. Start there. The method fits on a napkin. The discipline takes twenty years.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
      ],
    },
    {
      id: "grazyna:stapler-famine",
      label: "The stapler famine",
      optionCandidates: [
        { id: "grazyna:stapler-famine:opt-1", topicId: "grazyna:stapler-famine", text: "There are no working staplers on this floor." },
        { id: "grazyna:stapler-famine:opt-2", topicId: "grazyna:stapler-famine", text: "You keep the good stapler in your desk. Admit it." },
        { id: "grazyna:stapler-famine:opt-3", topicId: "grazyna:stapler-famine", text: "The stapler order was denied. Why?" },
        { id: "grazyna:stapler-famine:opt-4", topicId: "grazyna:stapler-famine", text: "Janusz repairs staplers? Since when?" },
        { id: "grazyna:stapler-famine:opt-5", topicId: "grazyna:stapler-famine", text: "Tomek stapled a cable to his desk. Related?" },
        { id: "grazyna:stapler-famine:opt-6", topicId: "grazyna:stapler-famine", text: "How does a stapler famine even start?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:stapler-famine:rep-1",
          text: "There are three, and their locations are known to me alone. This is not hoarding — it is distribution without a distribution system, which is what happens when nobody wants to own logistics until they need a stapler. Ask, and you will be stapling within the minute. Search, and you will learn why I control the map.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:stapler-famine:rep-2",
          text: "I keep THE stapler, the 1989 one, metal, which has outlived four companies and one marriage. It does not live in my desk. It lives in its case, because things that work deserve cases. You may borrow it, supervised, and return it to the case. This is not a joke. The stapler has outlived better jokes.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:stapler-famine:rep-3",
          text: "Denied because the request was for eleven staplers at a price that assumed gold-plated hinges. I counter-offered three good ones, which covers the actual usage rate I have watched for six years. The order was not denied. The order was rounded down to reality. My whole job is rounding things down to reality.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:stapler-famine:rep-4",
          text: "Since forever. A stapler is a spring, a jaw, and pride. He fixed the 2014 one in nine minutes and now fixes all of them in a batch every February. The repair bench is in his closet, next to the chair hospital. This building's office equipment has better healthcare than most companies' employees, and that is a sentence I choose to stand behind.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:stapler-famine:rep-5",
          text: "Related, and he paid for the desk, not the stapler — the stapler was returned to the famine with a bent jaw and a story. I put the story in the file. The file now says 'staplers: structural role in engineering morale'. Twenty years of accounting and the strangest asset I track is still the truth. It fits in no column. It goes in the file anyway.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:stapler-famine:rep-6",
          text: "Slowly. One stapler breaks and is not replaced because the order is 'pending'. The second one migrates to someone's home desk. The third becomes ceremonial. Within a quarter, a floor of adults is asking the accountant for stapling, which is how I end up knowing everything about everyone's paperwork. The famine is not a shortage of staplers.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "grazyna:shortcut-scripture",
      label: "The shortcut scripture",
      optionCandidates: [
        { id: "grazyna:shortcut-scripture:opt-1", topicId: "grazyna:shortcut-scripture", text: "You do everything with keyboard shortcuts?" },
        { id: "grazyna:shortcut-scripture:opt-2", topicId: "grazyna:shortcut-scripture", text: "Pawel saw your hands move and gasped." },
        { id: "grazyna:shortcut-scripture:opt-3", topicId: "grazyna:shortcut-scripture", text: "Is the mouse really that slow?" },
        { id: "grazyna:shortcut-scripture:opt-4", topicId: "grazyna:shortcut-scripture", text: "You have a laminated shortcut card. Of course you do." },
        { id: "grazyna:shortcut-scripture:opt-5", topicId: "grazyna:shortcut-scripture", text: "Maciek calls your shortcuts 'legacy skills'." },
        { id: "grazyna:shortcut-scripture:opt-6", topicId: "grazyna:shortcut-scripture", text: "Which shortcut is your favorite?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:shortcut-scripture:rep-1",
          text: "The keyboard was finished in 1985 and nothing since has improved it. Every trip to the mouse is a small death of attention. My hands do not leave home row and the work does not leave the screen. Speed is not the point. Continuity is. A thought survives a shortcut. A thought does not always survive a mouse hunt.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:shortcut-scripture:rep-2",
          text: "He did, and then he asked me to slow down so he could write the sequence down. I did not slow down. I made him a card instead — he has it laminated, which is his own religion catching up to mine. The boy learns by gasping first and asking second. It is not a bad method. It is exactly how I learned, from a woman named Halina, in 1989. Different Halina. Same energy.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:morning"],
        },
        {
          id: "grazyna:shortcut-scripture:rep-3",
          text: "Slow is the wrong word. The mouse is a detour that believes it is a route. Every menu click is a question you ask the screen that the keyboard already knew the answer to. Keep the mouse for the internet, where wandering is the point. The ledger is not the internet. The ledger is a place where wandering is a finding.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:shortcut-scripture:rep-4",
          text: "Laminated, dated 2003, updated twice, and it hangs to the left of the monitor like a saint's picture. The card has survived three monitors and one coffee that I will not discuss. Lamination is how you tell the office which knowledge is permanent. The boy Pawel inherited the habit from me, which makes the card an heirloom in the making.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:shortcut-scripture:rep-5",
          text: "Legacy skills built this workbook, and the workbook pays for his glass wall. He can call the shortcuts what he likes from his standing desk. When his machine froze mid-demo last spring, whose hands saved the file in four seconds flat? The legacy's. The legacy is the fire escape. You mock the fire escape until the fire.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:shortcut-scripture:rep-6",
          text: "The one nobody teaches: transpose, then paste-special, then transpose back — three moves that turn any sideways mess into sense. I have watched juniors rebuild an entire table by hand what that sequence fixes in two seconds. The shortcuts I love are not the fast ones. They are the ones that make a problem smaller. Speed is showmanship. Smallness is the craft.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:winter-market",
      label: "The winter market stall",
      optionCandidates: [
        { id: "grazyna:winter-market:opt-1", topicId: "grazyna:winter-market", text: "The candle stall at the market — that is you?" },
        { id: "grazyna:winter-market:opt-2", topicId: "grazyna:winter-market", text: "How did the market stall start?" },
        { id: "grazyna:winter-market:opt-3", topicId: "grazyna:winter-market", text: "The stall sold out by noon last December." },
        { id: "grazyna:winter-market:opt-4", topicId: "grazyna:winter-market", text: "Klaudia wants to film the stall for content." },
        { id: "grazyna:winter-market:opt-5", topicId: "grazyna:winter-market", text: "Zosia calls the stall 'your other startup'." },
        { id: "grazyna:winter-market:opt-6", topicId: "grazyna:winter-market", text: "Who staffs the stall when you cannot?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:winter-market:rep-1",
          text: "Corner pitch, red awning, the good tablecloth. The candles are mine, the arithmetic is mine, and the cashbox is a biscuit tin with a lock Janusz drilled for me in 2019. The market is where the company's accountant is just a woman selling fire in jars. I recommend the experience to everyone with a ledger and a hobby.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:winter-market:rep-2",
          text: "A hobby with receipts. I made candles for gifts, the gifts generated requests, and the requests generated a stall — the exact lifecycle of every business in history, compressed. The first year I tracked profit in my head. The second year the head was not enough. There is a workbook. There is always a workbook. The candle workbook is sheet forty-one and nobody looks at it.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:winter-market:rep-3",
          text: "Sold out, and I had priced for inventory, not for glory. The lesson cost me a January of lost revenue and taught me the whole rule: scarcity is not a strategy, it is a failure to forecast demand, even when the demand is for ozone-scented wax. This year the count doubles. The forecast is mine. The forecast is always mine.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:winter-market:rep-4",
          text: "She asked, and I said one condition: the ledger stays out of frame. She filmed the wax, the awning, the queue, and the BISCUIT TIN, which performed better than the candles. Two strangers asked where to buy the tin. The tin is not for sale. The tin is load-bearing. But the video brought forty new customers, so the tin and I have agreed to a career in cameos.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:winter-market:rep-5",
          text: "It is not a startup. A startup burns money to find out what it is. The stall knows exactly what it is — twelve square meters of December with a margin I can recite. If she wants to call it a startup because that word gets the good coffee, fine. The stall answers to a higher authority: the workbook. The workbook says it is profitable and humble. Both are rarer than buzzwords.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:winter-market:rep-6",
          text: "Renata, one Saturday a season, and she sells BETTER than me — remembers names, wraps in paper, hands children the free tealight with two hands like a ceremony. I sit on the crate doing the book and watch a receptionist outsell a professional. It is humbling in the way only true things are. The tin agrees. The tin counts faster when she works.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "grazyna:depreciation",
      label: "The depreciation philosophy",
      optionCandidates: [
        { id: "grazyna:depreciation:opt-1", topicId: "grazyna:depreciation", text: "You depreciate everything. Even the printer?" },
        { id: "grazyna:depreciation:opt-2", topicId: "grazyna:depreciation", text: "What is the depreciation schedule on the chairs?" },
        { id: "grazyna:depreciation:opt-3", topicId: "grazyna:depreciation", text: "Does anything in this office appreciate?" },
        { id: "grazyna:depreciation:opt-4", topicId: "grazyna:depreciation", text: "Tomek says code does not depreciate, it rots." },
        { id: "grazyna:depreciation:opt-5", topicId: "grazyna:depreciation", text: "Do you depreciate people? Professionally speaking." },
        { id: "grazyna:depreciation:opt-6", topicId: "grazyna:depreciation", text: "The candles — do they depreciate in the workbook?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:depreciation:rep-1",
          text: "The printer is on a seven-year schedule and has outlived it by four, which makes it a depreciation success story and a maintenance nightmare. The books say it is worth almost nothing. The books are wrong about the printer the way they are wrong about every veteran — the numbers describe the cost, never the loyalty. Both truths live on the same sheet. That is bookkeeping.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:depreciation:rep-2",
          text: "Five years, straight line, and the schedule is optimistic by two — the chairs die at year three from swivel fatigue and meetings. The schedule is not a prediction, it is a budget with a memory. When a chair dies early I do not blame the chair. I update the schedule and buy the sturdier model. The schedule learns. Slowly, like everyone in this building.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:depreciation:rep-3",
          text: "Three things. The Batman sign, which a client once valued at a contract renewal — Dawid keeps no books on it, correctly. The recipe archive, which is knowledge and appreciates by use. And the relationship with the bank, which is twenty years of never surprising them. Appreciation is just depreciation you have been kind to. The ledger holds both in the same hand.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:depreciation:rep-4",
          text: "Tomek is right and his word is better than mine. Code does not lose value smoothly — it holds, then drops off a cliff the day the framework dies. I would call that step depreciation, and step depreciation is the most expensive kind. He manages the cliff. I record it. Between the two of us, the company never mistakes a plateau for a future.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:depreciation:rep-5",
          text: "No, and here is the accountant's heresy: people appreciate, if you maintain them. Training is a capital expense, not a cost — Kasia knows it, budgets for it, and I defend the line every year against people who want it cut. A depreciating workforce is a company eating its own furniture. I have seen it from the outside, through a window, at a company I will not name.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:depreciation:rep-6",
          text: "The candles appreciate until December and depreciate by February, which makes them a seasonal asset, the most honest class there is. Wax holds its value; scent does not. The workbook gives them a one-year life and a valuation of cost plus pride. The pride column is unaudited and strictly mine. Every ledger should have one column the auditor cannot touch. One. Only one.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "grazyna:shredder",
      label: "The shredder",
      optionCandidates: [
        { id: "grazyna:shredder:opt-1", topicId: "grazyna:shredder", text: "The shredder runs every evening at five. Ritual?" },
        { id: "grazyna:shredder:opt-2", topicId: "grazyna:shredder", text: "Pawel fed it a staple-filled document. Casualties?" },
        { id: "grazyna:shredder:opt-3", topicId: "grazyna:shredder", text: "What actually gets shredded?" },
        { id: "grazyna:shredder:opt-4", topicId: "grazyna:shredder", text: "The shredder is older than half the staff." },
        { id: "grazyna:shredder:opt-5", topicId: "grazyna:shredder", text: "Kasia asks what the shredding schedule is. Why?" },
        { id: "grazyna:shredder:opt-6", topicId: "grazyna:shredder", text: "Ever shredded something you regretted?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:shredder:rep-1",
          text: "Five o'clock, ten minutes, everything accumulated that day that belongs to no archive. The shredder is how the office forgets safely. Paper that should not exist must not linger overnight — lingering is how drawers fill with future questions. Ten minutes a day and the company sleeps without paper dreams. It is the most restful part of my job.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:shredder:rep-2",
          text: "One jam, forty minutes of my life, and a lesson the whole floor heard through the door — not shouting, just the lesson, in the tone I save for machines. The staples survived. The boy survived. The shredder now has a sign I did not make: 'NO STAPLES — GRAZYNA IS WATCHING'. I did not make the sign. I permit the sign. The sign works better than any policy.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:shredder:rep-3",
          text: "Drafts with numbers that were never true, misprints with names that were misspelled, and any page that shows what we almost did. The shredder is the company's second chance department. Nothing shredded is a secret — it is a DRAFT. People confuse the two and get dramatic. Drafts burn. Records stay. The archive decides which is which, and the archive is me.",
          relationshipHint: "neutral",
        },
        {
          id: "grazyna:shredder:rep-4",
          text: "It predates me by one year, which makes it my senior in this office and I treat it accordingly. Serviced every March by the same man since 2008. It has eaten the financial history of this company one draft at a time and never once jammed on honest paper. Respect is not sentiment. Respect is maintenance schedules. The shredder has one and keeps it.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:shredder:rep-5",
          text: "Because Kasia understands something most people miss: retention schedules and shredding schedules are the same document read in two directions. HR keeps what the law requires for exactly as long as the law requires. My shredder is her policy's executor. We meet quarterly, compare calendars, and the company stays clean on both ends. The most compliant friendship in the building.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:shredder:rep-6",
          text: "One page, 2015, a pricing draft with a joke in the margin that was funnier than the pricing. Gone. I have rebuilt that joke from memory twice at the market stall and it dies in the retelling. The lesson: shred the numbers, keep the margin. Since then, any document with a good margin note gets the note copied out first. The shredder takes the paper.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "grazyna:laminator",
      label: "The laminator",
      optionCandidates: [
        { id: "grazyna:laminator:opt-1", topicId: "grazyna:laminator", text: "Why does accounting own the office laminator?" },
        { id: "grazyna:laminator:opt-2", topicId: "grazyna:laminator", text: "The laminator queue has a sign-up sheet now." },
        { id: "grazyna:laminator:opt-3", topicId: "grazyna:laminator", text: "Pawel laminated his whole cheat sheet. Your influence?" },
        { id: "grazyna:laminator:opt-4", topicId: "grazyna:laminator", text: "What was the first thing you ever laminated?" },
        { id: "grazyna:laminator:opt-5", topicId: "grazyna:laminator", text: "The laminator jammed during quarter close. Drama?" },
        { id: "grazyna:laminator:opt-6", topicId: "grazyna:laminator", text: "Is lamination just accounting superstition?" },
      ],
      replyCandidates: [
        {
          id: "grazyna:laminator:rep-1",
          text: "Because I bought it, in 2009, with petty cash that was legitimately petty. Ownership follows purchase in this office — ask the kettle people, they learned it the hard way. The laminator serves the whole floor, but the drawer it lives in is mine, and so is the schedule. Shared tools with no owner die of politeness. This one has an owner and a queue. It will outlive us all.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:laminator:rep-2",
          text: "There is, and it is honored, which restored my faith in this floor's ability to self-govern. Fifteen-minute slots, one sheet minimum, no wedding invitations — the last rule was added after 2019 and I will not elaborate. The sheet is laminated too, obviously. A queue for a laminator, laminated. At some point the recursion becomes culture. We are at that point.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "grazyna:laminator:rep-3",
          text: "Direct influence and I accept the credit. The boy laminated his shortcut sheet, then his style guide, and now advises others on sleeve selection. Lamination is not about plastic. It is about declaring which knowledge is permanent in a building where everything is renamed quarterly. I taught one intern to laminate. The intern taught a floor.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:afternoon"],
        },
        {
          id: "grazyna:laminator:rep-4",
          text: "A price list from my first job, 1990, which the owner kept re-printing weekly because the sun faded it. I laminated one copy and it outlasted the shop, the owner, and the street it stood on. That is the whole sermon in one object: decide what is true, write it down, protect it from weather. The laminator is just the sacrament. The belief comes first.",
          relationshipHint: "delighted",
        },
        {
          id: "grazyna:laminator:rep-5",
          text: "It jammed at 17:40 on the last day of close, with the summary sheet half-in, and I fixed it myself in silence while Zosia watched from the doorway like a woman at an airport. The sheet survived. The summary shipped. The laminator got serviced that weekend and has behaved since, because it knows. Machines know. The ones that are maintained know twice as well.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:laminator:rep-6",
          text: "Superstition is belief without evidence. Lamination is belief WITH evidence — every laminated thing in this office has outlasted its unlaminated twin. That is not faith, that is a controlled study running for fifteen years with consistent results. The control group keeps fading. The treatment group keeps teaching. I simply published the findings on card stock and sealed them.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "grazyna:tea-ritual",
      label: "The three o'clock tea",
      optionCandidates: [
        { id: "grazyna:tea-ritual:opt-1", topicId: "grazyna:tea-ritual", text: "Your 15:00 tea is office legend. Details?" },
        { id: "grazyna:tea-ritual:opt-2", topicId: "grazyna:tea-ritual", text: "The kitchen knows not to book meetings at three." },
        { id: "grazyna:tea-ritual:opt-3", topicId: "grazyna:tea-ritual", text: "Which tea is it? It smells like a forest." },
        { id: "grazyna:tea-ritual:opt-4", topicId: "grazyna:tea-ritual", text: "Renata joins you sometimes. Officially?" },
        { id: "grazyna:tea-ritual:opt-5", topicId: "grazyna:tea-ritual", text: "Has the tea ritual ever been late?" },
        { id: "grazyna:tea-ritual:opt-6", topicId: "grazyna:tea-ritual", text: "Zosia wants the ritual in the culture deck." },
      ],
      replyCandidates: [
        {
          id: "grazyna:tea-ritual:rep-1",
          text: "Kettle at 14:58, steep for four minutes, first sip at 15:03, standing, at the kitchen window, watching the parking lot become honest in the afternoon light. Ten minutes. No phone, no ledger, no speech. The tea is the only appointment I keep that has never once asked me for a number.",
          relationshipHint: "pleased",
        },
        {
          id: "grazyna:tea-ritual:rep-2",
          text: "The kitchen knows, the calendar knows, and once a sales visit learned it the hard way — booked at three, waited eleven minutes, and closed the deal anyway, so the lesson did not take. The ritual is not a privilege. It is maintenance. Everyone in this building gets theirs in some form; mine is scheduled where others' are improvised.",
          relationshipHint: "neutral",
          tags: ["period:afternoon"],
        },
        {
          id: "grazyna:tea-ritual:rep-3",
          text: "Black, with a spoon of something pine-related that Janusz brings me every autumn from who knows where. I have never asked. The tea is the one line item in my life without a receipt and I intend to keep it that way. Some things must remain unaudited or the audit eats the person doing it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:tea-ritual:rep-4",
          text: "Thursdays, standing, two cups, and the conversation covers nothing that appears in either of our inboxes. We have never once discussed work at tea and we have solved more this way than any committee this floor has produced. The tradition is three years old and has no name. Things with names get meetings. This stays nameless and therefore immortal.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "grazyna:tea-ritual:rep-5",
          text: "Once, the audit of 2022, and the tea was late by forty minutes, cold, and drunk standing in a stairwell. The audit found nothing anyway. Draw your own conclusions about whether the ritual is a luxury. I have drawn mine: a rested accountant finds things a tired one misses. The tea is not a break FROM the work. The tea is part of the control system.",
          relationshipHint: "annoyed",
        },
        {
          id: "grazyna:tea-ritual:rep-6",
          text: "Then it stops working. The deck will make it a policy, the policy will get a slot name, and the slot name will get invitations, and by spring I will be attending my own tea with three other people and an agenda. Some culture must remain undocumented to stay alive. Tell her the tea is 'an accounting control'.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
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

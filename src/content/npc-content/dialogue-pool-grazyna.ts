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

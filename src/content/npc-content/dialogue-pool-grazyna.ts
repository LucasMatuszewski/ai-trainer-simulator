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
  ],
  taskOffers: [
    {
      id: "grazyna:task-focus-course",
      title: "The 'Intro to Focus' course",
      description: "Record the course that sells the candle: 'Intro to Focus', brought to you by 'Syntax Error' (ozone, old keyboard, ambition). Grazyna handles production and the tax black magic. The split is clean, the candle is poured, and the wellness industry will not know what hit it.",
      flagToSet: "grazyna-candle-partner",
      rewardHint: "+candle partnership, sixty-forty",
    },
  ],
};

/**
 * WS5 dialogue v2 pool — Dawid, The CEO (C-77).
 *
 * Pure authored data. Topics: the meeting economy (walking one-on-ones,
 * alignment as cardio), the graph (KPIs, hockey sticks, and the flat
 * part), and Bruce (forty thousand zloty of certified brand equity with
 * wings). Task offer: the one-pager (sets the existing
 * `ceo-workshop-offered` flag). Tone matches his legacy trees: you are
 * seen, you are valued, you are a number on a spreadsheet that goes up.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const DAWID_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "dawid",
  topics: [
    {
      id: "dawid:alignment",
      label: "The meeting economy",
      optionCandidates: [
        {
          id: "dawid:alignment:opt-1",
          topicId: "dawid:alignment",
          text: "Are you ever not in a meeting?",
        },
        {
          id: "dawid:alignment:opt-2",
          topicId: "dawid:alignment",
          text: "What is a walking one-on-one, exactly?",
        },
        {
          id: "dawid:alignment:opt-3",
          topicId: "dawid:alignment",
          text: "How do you prepare for so many meetings?",
        },
        {
          id: "dawid:alignment:opt-4",
          topicId: "dawid:alignment",
          text: "Can we book time that is not a meeting?",
        },
        {
          id: "dawid:alignment:opt-5",
          topicId: "dawid:alignment",
          text: "Who runs the company while you are aligned?",
        },
        {
          id: "dawid:alignment:opt-6",
          topicId: "dawid:alignment",
          text: "I need a decision. A real one. From you.",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:alignment:rep-1",
          text: "If I am not IN a meeting, I am walking TO one, or recovering from one, which I schedule as 'thinking time' so it shows on the graph. The calendar is full, but it is full of alignment, and alignment is the one thing this company cannot have too much of. Nobody has measured. I will not be the one who measures.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:alignment:rep-2",
          text: "We walk, we talk, and it counts as cardio and alignment at the same time. HR calls it overwork. I call it momentum. The route is fixed: past the server rack, past the window, past Burek. Burek has never once asked for a follow-up. Best attendee I have.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:alignment:rep-3",
          text: "Preparation is a strong word. I read the agenda in the elevator and I decide my mood in the lobby. The rest is listening with eyebrows. You noticed the eyebrows. Everyone notices the eyebrows. They are load-bearing.",
          relationshipHint: "pleased",
          tags: ["quest:ceo-met", "relationship:neutral"],
        },
        {
          id: "dawid:alignment:rep-4",
          text: "A non-meeting is called a coffee, and coffee is where the real decisions happen, which is why I hold so many meetings ABOUT coffee. Book one. If it goes well it becomes a walking one-on-one. If it goes very well it becomes a meeting, and then you know you have arrived.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:alignment:rep-5",
          text: "Three systems run it: the invoices, which handle themselves; the building, which handles itself; and the graph, which goes up. I align the people to the graph. Maciek aligns the words to the vision. Zosia aligns the people to the words. It is circles all the way down, and the circles are load-bearing.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:alignment:rep-6",
          text: "A real decision requires a real agenda, and a real agenda requires a proposal. Write me one page: what you would teach, to whom, and what the graph does afterward. If the page is good, it goes to the board as a workshop. That is how everything starts here — one page, then momentum.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
          offersTaskId: "dawid:task-one-pager",
        },
      ],
    },
    {
      id: "dawid:graph",
      label: "The graph",
      optionCandidates: [
        {
          id: "dawid:graph:opt-1",
          topicId: "dawid:graph",
          text: "Why does the graph always go up?",
        },
        {
          id: "dawid:graph:opt-2",
          topicId: "dawid:graph",
          text: "The graph went down once. What happened?",
        },
        {
          id: "dawid:graph:opt-3",
          topicId: "dawid:graph",
          text: "What is a hockey stick, in your words?",
        },
        {
          id: "dawid:graph:opt-4",
          topicId: "dawid:graph",
          text: "Are we a family or a set of KPIs?",
        },
        {
          id: "dawid:graph:opt-5",
          topicId: "dawid:graph",
          text: "Who else can see the graph?",
        },
        {
          id: "dawid:graph:opt-6",
          topicId: "dawid:graph",
          text: "What is the number I am on the spreadsheet?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:graph:rep-1",
          text: "Because it is pointed at up. Half of leadership is the angle you draw the line at, and the other half is believing the line. When it goes up and to the right, that is not a graph, it is a promise. When it goes down we do not panic — we pivot. The stick is always hockey.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:graph:rep-2",
          text: "It dipped, we pivoted, and the pivot became the story we tell at onboarding. The dip was Tuesday, the pivot was Wednesday, and by Thursday the slide said 'growth mindset' and the client had doubled the contract out of pity or respect. The graph cannot tell the difference and neither can I.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract", "relationship:warm"],
        },
        {
          id: "dawid:graph:rep-3",
          text: "A hockey stick is flat, flat, flat, then suddenly the sky. Every quarter is the flat part. Every founder lives in the flat part. The trick is to keep calling the flat part 'momentum' until the sky shows up. It works. Ask any slide.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:graph:rep-4",
          text: "A family, and families have quarterly reviews. The KPIs are how we show love in this economy: I measure you, therefore I care. The alternative is not measuring people, and I have read about companies that do that. They are all 'vibes-based' and none of them have a Batman.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:graph:rep-5",
          text: "You can see it, I can see it, and Burek sleeps next to the printout in the corridor — true story, the light is warm there. The graph does not need to be secret. The graph needs to be BELIEVED. Secrecy is for companies whose graphs go down.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:graph:rep-6",
          text: "A number that goes up. I genuinely do not remember which number you are, and that is a compliment — I remember the numbers that wobbled. You have never wobbled. Keep not wobbling and you will become a trend line, and trend lines get named after themselves.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "dawid:bruce",
      label: "Bruce",
      optionCandidates: [
        {
          id: "dawid:bruce:opt-1",
          topicId: "dawid:bruce",
          text: "Why is there a giant Batman in the CEO office?",
        },
        {
          id: "dawid:bruce:opt-2",
          topicId: "dawid:bruce",
          text: "Did Bruce really cost forty thousand zloty?",
        },
        {
          id: "dawid:bruce:opt-3",
          topicId: "dawid:bruce",
          text: "Can we take Bruce down for the photoshoot?",
        },
        {
          id: "dawid:bruce:opt-4",
          topicId: "dawid:bruce",
          text: "A client thought we do security because of Bruce?",
        },
        {
          id: "dawid:bruce:opt-5",
          topicId: "dawid:bruce",
          text: "Who named him Bruce?",
        },
        {
          id: "dawid:bruce:opt-6",
          topicId: "dawid:bruce",
          text: "What happens to Bruce if the company is sold?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:bruce:rep-1",
          text: "Brand agency, forty thousand zloty, 'a bold brand anchor'. They delivered, literally, a bat. Then a client assumed we do security and doubled the contract. Now removing him costs more than keeping him. That is not decor. That is equity with wings.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:bruce:rep-2",
          text: "Forty thousand, installed, with a certificate of authenticity for the BAT. The certificate lives in the same folder as the office plans. Some days I read it for calm. A company that can afford a certified bat is a company that will survive the quarter.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:bruce:rep-3",
          text: "The movers refuse to touch him, and I refuse to move him twice — once was a test and the test failed. We shoot AROUND Bruce. Klaudia filmed in front of him and the post did numbers no product announcement ever has. Bruce is content. Bruce has always been content.",
          relationshipHint: "annoyed",
          tags: ["period:lunch"],
        },
        {
          id: "dawid:bruce:rep-4",
          text: "Doubled it. Read the room, saw a bat, decided we are the kind of company that takes security seriously, and did not ask one follow-up question. That is the entire secret of this economy, and it has wings.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:bruce:rep-5",
          text: "The invoice. It said 'Batman wall feature' and the previous founder said 'like the city?' and the agency said 'exactly'. By the time anyone suggested 'Bob', the invoice was paid, and paid invoices are canon. Bruce he is, Bruce he stays.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:bruce:rep-6",
          text: "Bruce conveys with the building. It is in the lease fine print, one line, my favorite line. Whoever buys this company inherits a certified bat, and honestly, that is a legacy I can stand behind. Companies are bought for their graphs. They are REMEMBERED for their bats.",
          relationshipHint: "neutral",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "dawid:task-one-pager",
      title: "The one-pager",
      description: "One page for the CEO: what you would teach, to whom, and what the graph does afterward. If the page is good, it goes to the board as a workshop proposal, and momentum does the rest. One page, not two — the second page is where ideas go to wobble.",
      flagToSet: "dawid-graph-memo",
      rewardHint: "+Dawid remembers who does the homework",
    },
  ],
};

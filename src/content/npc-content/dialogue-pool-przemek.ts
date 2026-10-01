/**
 * WS5 dialogue v2 pool — Przemek, Sales (C-77).
 *
 * Pure authored data. Topics: the bootcamp (five days, sixty leaders, one
 * weekend sold as 'immersive'), the robot question (TrainerBot 3000 is a
 * Roomba with a lanyard and a recurring calendar invite), and the craft
 * (a promise is a first draft). Task offer: write the element-one
 * redirect line (sets the existing `przemek-robot-plan` flag). Tone
 * matches his legacy trees: Big fan. HUGE fan. The bar is on the floor —
 * walk over it in good shoes.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const PRZEMEK_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "przemek",
  topics: [
    {
      id: "przemek:bootcamp",
      label: "The bootcamp",
      optionCandidates: [
        {
          id: "przemek:bootcamp:opt-1",
          topicId: "przemek:bootcamp",
          text: "Five days, sixty leaders. How did this happen?",
        },
        {
          id: "przemek:bootcamp:opt-2",
          topicId: "przemek:bootcamp",
          text: "A weekend you sold as 'immersive'? Really?",
        },
        {
          id: "przemek:bootcamp:opt-3",
          topicId: "przemek:bootcamp",
          text: "What did the client's ex-wife's company do?",
        },
        {
          id: "przemek:bootcamp:opt-4",
          topicId: "przemek:bootcamp",
          text: "The last trainer was cancelled for 'too many words'?",
        },
        {
          id: "przemek:bootcamp:opt-5",
          topicId: "przemek:bootcamp",
          text: "Can we cap the room at forty?",
        },
        {
          id: "przemek:bootcamp:opt-6",
          topicId: "przemek:bootcamp",
          text: "What do I get if the bootcamp lands?",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:bootcamp:rep-1",
          text: "Honestly? Enthusiasm, a whiteboard, and a client who said 'can anyone teach AI?' — and I said 'THE best one' and pointed at you. You were in a meeting. Your calendar said 'busy', which I read as 'available for greatness'. Sales is reading the room. The room was you.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:bootcamp:rep-2",
          text: "Immersive means the learning does not stop at five, because the learning NEVER stops — it is on the flyer. Also the venue gave us the weekend rate. Immersion has a price and the price is invoiced as a discount. Everyone wins, mostly the invoice.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:bootcamp:rep-3",
          text: "Sold training to the ex-wife's company, which the client's lawyer calls 'a conflict' and I call 'market coverage'. Legally I have decided the companies are separate. Legally is a spectrum, like transparency. We are on the brave end.",
          relationshipHint: "neutral",
          tags: ["quest:przemek-bootcamp-sold", "relationship:neutral"],
        },
        {
          id: "przemek:bootcamp:rep-4",
          text: "TRUE. Cancelled on day two for 'using too many words'. The bar is on the floor and I have brought good shoes to walk over it. Your opening line should be seven words or fewer. Do it in three and the contract triples. That is not a joke, that is attention economics.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:bootcamp:rep-5",
          text: "Cap at forty? The room holds sixty, the flyer says 'exclusive', and exclusive means we COULD have fit more. I will tell them enrollment is capped — capped AT sixty, which is a cap the way the ocean is a puddle. Words, my friend. Words are the venue.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:bootcamp:rep-6",
          text: "If it lands, you go on the DO-NOT-SELL list: the people I never over-promise, because they deliver. It is a short list. Currently it is you, my mother, and Burek. Getting ON that list is the only award in sales that cannot be bought, and I have checked. For research.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:robot",
      label: "The robot question",
      optionCandidates: [
        {
          id: "przemek:robot:opt-1",
          topicId: "przemek:robot",
          text: "Tell me about the robot. All of it.",
        },
        {
          id: "przemek:robot:opt-2",
          topicId: "przemek:robot",
          text: "The client's email says they remember the robot.",
        },
        {
          id: "przemek:robot:opt-3",
          topicId: "przemek:robot",
          text: "TrainerBot sent me a calendar invite again.",
        },
        {
          id: "przemek:robot:opt-4",
          topicId: "przemek:robot",
          text: "What if the client visits and asks to see it?",
        },
        {
          id: "przemek:robot:opt-5",
          topicId: "przemek:robot",
          text: "Can we buy a Roomba and put a ribbon on it?",
        },
        {
          id: "przemek:robot:opt-6",
          topicId: "przemek:robot",
          text: "Did you at least warn me before promising a robot?",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:robot:rep-1",
          text: "Sales confession booth. Deep breath: the robot is a Roomba. Named TrainerBot 3000. Ribbon. Lanyard. I introduced it in 2024 as 'the future of autonomous learning' and it cleaned the venue DURING my pitch. Standing ovation. It lives at the client's HQ now. They gave it a LANYARD.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:robot:rep-2",
          text: "Remembering is the best thing a client can do. Nobody remembers the slides; everyone remembers the Roomba with a lanyard. The strategy is as old as selling: never deny, redirect. They ask about the robot, you say 'the robot is element two of three', and you talk about element one. Nobody has ever asked what the elements are.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:robot:rep-3",
          text: "Decline it or do not, but know that it is RECURRING, agenda-free, and set for midnight. TrainerBot processes things now. At night. Alone. We made that robot a promise in 2024 and it has never once let it go. Respect the invite. Fear the invite. But answer it — silence confuses the firmware.",
          relationshipHint: "delighted",
          tags: ["quest:przemek-robot-plan", "relationship:warm"],
        },
        {
          id: "przemek:robot:rep-4",
          text: "Then we say the robot is 'on-site, embedded with your team', which is TRUE — it is at their HQ, wearing its lanyard with dignity. A demonstration would require travel. Travel requires budget. Budget requires answering the robot question, which brings us back to redirect. The loop is airtight. I have tested it.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:robot:rep-5",
          text: "Absolutely not. The moment we OWN a robot it is an asset, assets depreciate, and depreciation is Grazyna's jurisdiction. The Roomba is legally THEIRS, which makes it a gift, and gifts are priceless. We are not buying the legend. We are LENDING it, emotionally.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:robot:rep-6",
          text: "Warn you? I promised you greatness BEFORE I met you. That is not a warning, that is a PRE-ORDER. And look — it shipped. You are the product and the product is live. Nobody reads the release notes. Nobody ever reads the release notes.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "przemek:craft",
      label: "The craft of sales",
      optionCandidates: [
        {
          id: "przemek:craft:opt-1",
          topicId: "przemek:craft",
          text: "Is a promise a lie if you cannot keep it?",
        },
        {
          id: "przemek:craft:opt-2",
          topicId: "przemek:craft",
          text: "How do you sell something that does not exist?",
        },
        {
          id: "przemek:craft:opt-3",
          topicId: "przemek:craft",
          text: "Your strategy meeting was four minutes long.",
        },
        {
          id: "przemek:craft:opt-4",
          topicId: "przemek:craft",
          text: "What is the best close you ever made?",
        },
        {
          id: "przemek:craft:opt-5",
          topicId: "przemek:craft",
          text: "Do you ever feel guilt over a sale?",
        },
        {
          id: "przemek:craft:opt-6",
          topicId: "przemek:craft",
          text: "Teach me to be half as confident as you.",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:craft:rep-1",
          text: "A promise is not a lie, it is a first draft. And you, my friend, are in a lot of first drafts. Drafts get revised — sometimes by delivering, sometimes by refunding, and once, memorably, by redefining 'deliverable'. The point is the WRITING. Writing is optimism with a pen.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:craft:rep-2",
          text: "Nothing exists until someone pays for it. Then it exists SO hard. The cloud did not exist, then it was a budget line. AI did not exist, then it was a slide. I sell the moment before existence, which is the cheapest moment there is. Call it presales. Call it prophecy. The invoice is the same.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:craft:rep-3",
          text: "Strategy is a moment, not a process. The best close I ever made was eye contact in an elevator — four floors, 'Careless Whisper' playing. We closed. The music sells WITH you, if you let it. Four minutes is generous. Most people get a glance and a handshake and they WASTE it.",
          relationshipHint: "pleased",
          tags: ["stats:high-credibility"],
        },
        {
          id: "przemek:craft:rep-4",
          text: "Sold a training program to a man by complimenting his pen. Two-year contract. The pen was plastic. But nobody had ever noticed the pen, and being noticed is the product underneath every product. I still have the pen. It does not write anymore. It does not need to.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:craft:rep-5",
          text: "Guilt is for invoices that bounce. I have never sold anyone something they did not secretly want to believe. The bootcamp, the robot, the immersion — they BUY the belief, and belief is non-refundable. I have checked. Legally. Twice.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:craft:rep-6",
          text: "Half? Aim for sixty percent and mumble the rest with conviction. But first, homework: write the redirect line for the robot question. One sentence. If it survives me saying it out loud in the kitchen, it survives a CFO. Bring it Thursday.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
          offersTaskId: "przemek:task-element-one",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "przemek:task-element-one",
      title: "Element one, element two",
      description: "Write the redirect line: when the client asks about the robot, say 'the robot is element two of three' and talk about element one. Nobody has ever asked what the elements are. Nobody ever will. Test it on Przemek in the kitchen before the CFO does.",
      flagToSet: "przemek-robot-plan",
      rewardHint: "+the airtight loop",
    },
  ],
};

/**
 * WS3 dialogue v2 pool — GENERIC fallback (C-77).
 *
 * Pure authored data. This is the pool any conversation falls back onto
 * when every authored thread is exhausted: small talk that is NEVER
 * memory-suppressed and can never dead-end. The replies are written
 * NPC-neutral (any colleague can plausibly say them) but keep the office's
 * ironic register. It carries NO task offers on purpose — NPC-specific
 * tasks must never be re-offered from a fallback pool.
 *
 * Registered nowhere: it is exported for the turn builder's exit set.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const GENERIC_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "generic",
  topics: [
    {
      id: "generic:smalltalk",
      label: "Small talk",
      optionCandidates: [
        {
          id: "generic:smalltalk:opt-1",
          topicId: "generic:smalltalk",
          text: "How is your day going?",
        },
        {
          id: "generic:smalltalk:opt-2",
          topicId: "generic:smalltalk",
          text: "Busy week?",
        },
        {
          id: "generic:smalltalk:opt-3",
          topicId: "generic:smalltalk",
          text: "Any plans for the weekend?",
          tags: ["period:afternoon"],
        },
        {
          id: "generic:smalltalk:opt-4",
          topicId: "generic:smalltalk",
          text: "Crazy weather, right?",
        },
        {
          id: "generic:smalltalk:opt-5",
          topicId: "generic:smalltalk",
          text: "Did you see the fridge in the kitchen?",
        },
        {
          id: "generic:smalltalk:opt-6",
          topicId: "generic:smalltalk",
          text: "Long day, huh?",
        },
      ],
      replyCandidates: [
        {
          id: "generic:smalltalk:rep-1",
          text: "Same as every day here: the tickets multiply, the coffee disappears, and somehow that counts as synergy. But nobody has unplugged anything important since 2019, so by this office's standards it is a good day.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:smalltalk:rep-2",
          text: "Busy the way a server is busy. Mostly waiting, occasionally on fire. I have been in three meetings about a meeting, and the meeting about the meeting ran over. We are scheduling a retrospective. This is my life now.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:smalltalk:rep-3",
          text: "The weekend is a roadmap item. It is on the doc, it is color-coded green, and it slides right every Friday at five. Optimistically: laundry and pretending the laptop is closed. Realistically: the laptop sleeps with one eye open.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:smalltalk:rep-4",
          text: "The weather is the one system nobody has deployed to. No changelog, no incidents, nobody pinging me at 3am about atmospheric regressions. I respect it enormously.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:smalltalk:rep-5",
          text: "The fridge is a natural disaster with a door. There is a yoghurt in there that predates two performance review cycles. Nobody claims it. Nobody dares throw it out. It has become senior to all of us.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:smalltalk:rep-6",
          text: "Long? It is 4pm and I have already lived three sprints. But the printer has not printed anything, which means nothing has gone permanently wrong. Around here, silence from the hardware is the sound of success.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "generic:office-lore",
      label: "Office life",
      optionCandidates: [
        {
          id: "generic:office-lore:opt-1",
          topicId: "generic:office-lore",
          text: "What is standup like here?",
        },
        {
          id: "generic:office-lore:opt-2",
          topicId: "generic:office-lore",
          text: "Is the printer really still broken?",
        },
        {
          id: "generic:office-lore:opt-3",
          topicId: "generic:office-lore",
          text: "Have you met Burek?",
        },
        {
          id: "generic:office-lore:opt-4",
          topicId: "generic:office-lore",
          text: "What does this company actually do?",
        },
        {
          id: "generic:office-lore:opt-5",
          topicId: "generic:office-lore",
          text: "Why is there a giant Batman in the CEO office?",
        },
        {
          id: "generic:office-lore:opt-6",
          topicId: "generic:office-lore",
          text: "Do the robots really do the chores?",
        },
      ],
      replyCandidates: [
        {
          id: "generic:office-lore:rep-1",
          text: "Standup is fifteen minutes scheduled for thirty. You say what you did, what you will do, and everyone says 'blocked on the printer'. It is the only statement that has remained true for six years. That kind of consistency deserves respect.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:office-lore:rep-2",
          text: "'Broken' implies it once worked and might again. The printer is in a stable relationship with the wall. IT calls it decommissioned, accounting calls it amortized, and the rest of us call it Marek's coffee maker. Everyone is right.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:office-lore:rep-3",
          text: "Burek is the only one here who has never checked Slack and never will. He sleeps through standups, deadlines, and at least one fire drill a quarter. If you want to know what peace looks like in this economy, it is forty kilograms and it is asleep by the window.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:office-lore:rep-4",
          text: "DevPowers builds software, Edukey teaches people, and somewhere in between an invoice is born. I stopped asking for details in 2022. Every answer was a synonym for 'meetings' with better branding.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:office-lore:rep-5",
          text: "Brand agency, forty thousand zloty, 'a bold brand anchor'. They delivered, literally, a bat. Then a client assumed we do security and doubled the contract. Now removing it costs more than keeping it. That is not decor. That is equity with wings.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:office-lore:rep-6",
          text: "Janusz built them. Zdzislaw hoovers, Halina waters the plants, Seba ferries mugs to the dishwasher and has OPINIONS about the rinse cycle. Officially Janusz is the janitor. Officially. The robots did not sign an NDA, but they act like it.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "generic:coffee-talk",
      label: "Coffee talk",
      periods: ["morning", "lunch", "afternoon"],
      optionCandidates: [
        {
          id: "generic:coffee-talk:opt-1",
          topicId: "generic:coffee-talk",
          text: "Is the coffee machine working today?",
        },
        {
          id: "generic:coffee-talk:opt-2",
          topicId: "generic:coffee-talk",
          text: "Who drank the last of the good beans?",
        },
        {
          id: "generic:coffee-talk:opt-3",
          topicId: "generic:coffee-talk",
          text: "Decaf? In this office?",
        },
        {
          id: "generic:coffee-talk:opt-4",
          topicId: "generic:coffee-talk",
          text: "How many coffees is too many?",
        },
        {
          id: "generic:coffee-talk:opt-5",
          topicId: "generic:coffee-talk",
          text: "The machine is making that sound again.",
        },
        {
          id: "generic:coffee-talk:opt-6",
          topicId: "generic:coffee-talk",
          text: "Tea drinker, are you?",
        },
        {
          id: "generic:coffee-talk:opt-7",
          topicId: "generic:coffee-talk",
          text: "I need coffee or I will start negotiating with the printer.",
          tags: ["stats:low-caffeine"],
        },
      ],
      replyCandidates: [
        {
          id: "generic:coffee-talk:rep-1",
          text: "Define working. It produces a liquid that is legally coffee. Temperature is a suggestion, quantity is a rumor, but the cup fills and the day continues. That is the deal we all silently agreed to and nobody has renegotiated since 2019.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:coffee-talk:rep-2",
          text: "The good beans are stored behind the 'team building' receipts, which means between three and eleven people know the location, and all eleven are suspects. Office crime runs on one principle: whoever looks most hydrated did it.",
          relationshipHint: "annoyed",
        },
        {
          id: "generic:coffee-talk:rep-3",
          text: "We do not say that word before noon. Decaf is a design decision made by someone who has never been on call. The one decaf tin in the kitchen belongs to the office itself, and we respect it the way you respect a fire alarm: present, important, never yours.",
          relationshipHint: "offended",
        },
        {
          id: "generic:coffee-talk:rep-4",
          text: "The official limit is whatever keeps your hands steady enough to type and unsteady enough to have a personality. Marek has never disclosed his number and no one has the budget to investigate.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:coffee-talk:rep-5",
          text: "The machine has four sounds: grinding, brewing, hope, and 'event day'. If it is the fourth one, back away slowly and find Renata. She has a protocol. The protocol is mostly staring at it until it feels watched. It works. Nobody knows why.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:coffee-talk:rep-6",
          text: "A tea drinker. In THIS economy of deadlines. Respect. Tea people are the real infrastructure: stable, unshakeable, never at the machine at nine causing the event-day sound. The office runs on coffee, but tea people keep it honest.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:coffee-talk:rep-7",
          text: "Then go, before the negotiation starts. The printer wins every standoff. It has been on strike since 2019 and has not given up a single concession. Coffee first. Diplomacy never.",
          relationshipHint: "pleased",
          tags: ["stats:low-caffeine"],
        },
        {
          id: "generic:coffee-talk:rep-8",
          text: "Event day, then. The machine is down, the office pretends it is fine, and somewhere Marek is already unplugging something else out of solidarity. There is an emergency tin. I am not supposed to know where. Do not tell Grazyna it exists.",
          relationshipHint: "pleased",
          tags: ["event:event-coffee-broken"],
        },
      ],
    },
    {
      id: "generic:tech-grief",
      label: "Tech grief",
      optionCandidates: [
        {
          id: "generic:tech-grief:opt-1",
          topicId: "generic:tech-grief",
          text: "My code works and I do not know why.",
        },
        {
          id: "generic:tech-grief:opt-2",
          topicId: "generic:tech-grief",
          text: "My code does not work and I do not know why.",
        },
        {
          id: "generic:tech-grief:opt-3",
          topicId: "generic:tech-grief",
          text: "I pushed to main on a Friday.",
        },
        {
          id: "generic:tech-grief:opt-4",
          topicId: "generic:tech-grief",
          text: "The client wants it 'more AI'.",
        },
        {
          id: "generic:tech-grief:opt-5",
          topicId: "generic:tech-grief",
          text: "Stack Overflow was down for an hour yesterday.",
        },
        {
          id: "generic:tech-grief:opt-6",
          topicId: "generic:tech-grief",
          text: "I dream about the bug now.",
        },
      ],
      replyCandidates: [
        {
          id: "generic:tech-grief:rep-1",
          text: "Write down nothing, change nothing, and back away slowly. Working code is a sleeping animal. Document it and it wakes up. Every senior here has one function they are afraid to refactor and one they are afraid to READ. You are in good company.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:tech-grief:rep-2",
          text: "Classic. It worked in your head, which is the one environment it was never tested in. Walk away, drink something, come back. The bug will still be there, but you will be better at being lied to by it. That is the whole craft, honestly.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:tech-grief:rep-3",
          text: "Friday. To MAIN. I have seen seniors do this, and I have seen the seniors afterwards. The recovery is to own it out loud before anyone finds it. Confessed mistakes become stories. Discovered ones become meetings. Choose the story.",
          relationshipHint: "annoyed",
        },
        {
          id: "generic:tech-grief:rep-4",
          text: "'More AI' means they saw a demo somewhere and now they want the feeling. Add a loading spinner that thinks, name a button 'smart', and invoice for the model. The model is you, tonight, at home, wondering how it came to this. That is AI-first.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:tech-grief:rep-5",
          text: "An hour? The whole industry held its breath. Somewhere a junior discovered documentation, a senior discovered they remember nothing, and one person fixed their own bug out of pure desperation. They say it was transformative. They were never the same.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:tech-grief:rep-6",
          text: "The bug has moved in. It eats with you now. When you fix it, and you will, usually by deleting the line that 'cannot possibly matter', you will feel nothing. That is how you know you are senior: the bugs stop being personal and start being scheduling.",
          relationshipHint: "delighted",
        },
      ],
    },
  ],
  taskOffers: [],
};

/**
 * WS5 dialogue v2 pool — Janusz, The Janitor (C-77).
 *
 * Pure authored data. Topics: the robot fleet (Zdzislaw, Halina, Seba),
 * the cleaning philosophy (the bins are the only honest reports), and the
 * janitor closet (the rack, the locks, the good coffee, the retired
 * printer's socket). Task offer: the citizenship test — a guided tour of
 * the building's truth (sets the existing `janusz-knows-the-plug` flag).
 * Tone matches his legacy trees: eleven years, three CEOs, one flood, and
 * machines welded in his own garage.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const JANUSZ_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "janusz",
  topics: [
    {
      id: "janusz:fleet",
      label: "Robot fleet maintenance",
      optionCandidates: [
        {
          id: "janusz:fleet:opt-1",
          topicId: "janusz:fleet",
          text: "How is the fleet holding up?",
        },
        {
          id: "janusz:fleet:opt-2",
          topicId: "janusz:fleet",
          text: "Zdzislaw has been wheezing on the big rugs.",
        },
        {
          id: "janusz:fleet:opt-3",
          topicId: "janusz:fleet",
          text: "Seba broke another mug. I saw it.",
        },
        {
          id: "janusz:fleet:opt-4",
          topicId: "janusz:fleet",
          text: "Do the robots ever talk to each other?",
        },
        {
          id: "janusz:fleet:opt-5",
          topicId: "janusz:fleet",
          text: "What does Halina do in winter?",
        },
        {
          id: "janusz:fleet:opt-6",
          topicId: "janusz:fleet",
          text: "Could you build a robot for the printer?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:fleet:rep-1",
          text: "Better than the staff. Zdzislaw is due a belt, Halina is on her third pump — the first two drowned, which is a long story involving the flood — and Seba has not missed a mug run since 2021. The fleet does not take sick days. It takes maintenance, and maintenance is love with a schedule.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:fleet:rep-2",
          text: "That is not wheezing, that is Zdzislaw THINKING. He maps the room every run and the big rugs confuse the map. I could upgrade his sensors. I could also move the rug. The rug is cheaper and the rug learns nothing. Some problems you just relocate.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:fleet:rep-3",
          text: "Seba does not break mugs. Seba RELOCATES mugs the audit has flagged. Watch: whatever Burek sighed at in standup, Seba's route touches that desk by three. The fleet and the dog coordinate. Nobody assigned it. It emerged, like traffic.",
          relationshipHint: "delighted",
          tags: ["quest:burek-standup-observed", "relationship:neutral"],
        },
        {
          id: "janusz:fleet:rep-4",
          text: "Constantly, and it is none of our business. Halina pings the kettle so the plant water runs warm, and Seba waits out the dishwasher's first two cycles because they are theater. Machines with routines are colleagues. Machines with routines AND secrets are STAFF.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:fleet:rep-5",
          text: "The winter schedule. Halina waters less, the plants sulk, and I read her the forecast so she can plan. A robot that waters on data instead of habit. Some engineers in this building could learn from a watering can with a brain, but their loss is the ferns' gain.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:fleet:rep-6",
          text: "No. And you know why. The printer is retired with honors, and retirement is sacred. The day I build a printer robot, the printer becomes MAINTAINED, and maintained things ask for toner, and toner asks for budget, and budget asks Grazyna. The fleet ends where the legend begins.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "janusz:philosophy",
      label: "Cleaning philosophy",
      optionCandidates: [
        {
          id: "janusz:philosophy:opt-1",
          topicId: "janusz:philosophy",
          text: "What is your cleaning philosophy?",
        },
        {
          id: "janusz:philosophy:opt-2",
          topicId: "janusz:philosophy",
          text: "The bins know everything, do they.",
        },
        {
          id: "janusz:philosophy:opt-3",
          topicId: "janusz:philosophy",
          text: "Why does the office feel calmer at 7am?",
        },
        {
          id: "janusz:philosophy:opt-4",
          topicId: "janusz:philosophy",
          text: "Is a clean desk a good sign or a bad one?",
        },
        {
          id: "janusz:philosophy:opt-5",
          topicId: "janusz:philosophy",
          text: "You have cleaned this office through three CEOs.",
        },
        {
          id: "janusz:philosophy:opt-6",
          topicId: "janusz:philosophy",
          text: "What is the weirdest thing you have found?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:philosophy:rep-1",
          text: "I do not clean mess. I clean EVIDENCE. The mess is information — whose week is heavy, who is eating at the desk, who printed something in 2019 and hid it. Tidy a mess and the building stops talking to you. I mostly listen, then quietly remove the receipts.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:philosophy:rep-2",
          text: "The bins are the only honest reports in this company. Cans say crunch, apple cores say hope, shredded paper says somebody is starting over. I have read more truth from the bins than from every all-hands combined, and the bins have never once asked me for a deck.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:philosophy:rep-3",
          text: "Relax. The machine is down, not the OFFICE. There is a percolator in the closet, second shelf, behind the rack — it predates the flood and it has never once refused. I brew, the floor drinks, and the event passes without one ticket. This is why the closet has three locks. Emergencies need privacy.",
          relationshipHint: "pleased",
          tags: ["event:event-coffee-broken", "relationship:neutral"],
        },
        {
          id: "janusz:philosophy:rep-4",
          text: "A clean desk at nine is a person who arrived early and cares. A desk that was already clean at seven the night before is a person interviewing elsewhere. I dust both the same. I salute the second one quietly.",
          relationshipHint: "neutral",
          tags: ["period:morning"],
        },
        {
          id: "janusz:philosophy:rep-5",
          text: "Three CEOs, one flood, one rebrand. The building does not care who sits at the top; it cares who unplugs the kettle at Christmas. I have outlasted every vision statement on those walls, because the vision statements do not know where the drains are. I do. That is power, worn modestly.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:philosophy:rep-6",
          text: "A wedding ring, a live lobster, and a business plan for a robot company. The ring went to lost and found, the lobster went home with the founder — long week, that one — and the plan went in a drawer. If the world is ever ready, I know a man.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "janusz:closet",
      label: "The janitor closet",
      optionCandidates: [
        {
          id: "janusz:closet:opt-1",
          topicId: "janusz:closet",
          text: "What is humming inside the janitor closet?",
        },
        {
          id: "janusz:closet:opt-2",
          topicId: "janusz:closet",
          text: "Is that a server rack next to the mop heads?",
        },
        {
          id: "janusz:closet:opt-3",
          topicId: "janusz:closet",
          text: "Why does the closet have three locks?",
        },
        {
          id: "janusz:closet:opt-4",
          topicId: "janusz:closet",
          text: "What is the tin marked INDUSTRIAL?",
        },
        {
          id: "janusz:closet:opt-5",
          topicId: "janusz:closet",
          text: "The socket labeled DO NOT USE (FIRE). Explain.",
        },
        {
          id: "janusz:closet:opt-6",
          topicId: "janusz:closet",
          text: "Can I see the closet? Just once.",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:closet:rep-1",
          text: "The dehumidifier, mostly. And the network cabinet. And Halina's charging dock. The closet is the engine room of this entire building and it is the size of a confession booth. Every office has one room that actually matters. Ours smells of lemon.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:closet:rep-2",
          text: "Mop heads, then the rack, then the shelf of cables I have crimped myself. Marek thinks the office network runs on faith. It runs through MY closet, on MY shelf, with labels only I can read. The labels are in Polish. The important ones are in cursive.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:closet:rep-3",
          text: "One lock is for the cleaning supplies, one is for the equipment, and one is because some questions answer themselves if the door stays shut. The locks are not for thieves. Thieves take things. The locks are for the CURIOUS, who leave worse behind.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:closet:rep-4",
          text: "Grazyna's private reserve, and since the flood story you are one of four people who know it exists. One scoop. Two on a Friday. That coffee has been aging since 2019 — like the printer's retirement, like the drains' map, everything good in this building survives by being left alone.",
          relationshipHint: "delighted",
          tags: ["quest:janusz-told-the-flood", "relationship:warm"],
        },
        {
          id: "janusz:closet:rep-5",
          text: "There is no fire. There is only consequence. The printer is retired and the socket stays labeled. You do not un-retire a monument because a Tuesday is boring. Besides, plugged in, it prints ONE page, unrequested. It said 'OK' in 2019. Let the man rest.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:closet:rep-6",
          text: "Once, properly, with the lights on. I will show you the rack, the drains, and which floor squeak belongs to which office. Everyone should know the building they work in — the building already knows you. Consider it the citizenship test, first attempt, open book.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
          offersTaskId: "janusz:task-citizenship",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "janusz:task-citizenship",
      title: "The citizenship test",
      description: "A guided tour of the building's truth: the rack in the closet, every drain, the third socket behind the cabinet, and the tin marked INDUSTRIAL. Knowing a thing in this office is a visa. What you do with the plug is the citizenship test.",
      flagToSet: "janusz-knows-the-plug",
      rewardHint: "+the building's trust",
    },
  ],
};

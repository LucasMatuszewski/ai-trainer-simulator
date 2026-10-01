/**
 * WS5 dialogue v2 pool — Zosia, The Manager (C-77).
 *
 * Pure authored data. Topics: strategic vocabulary, the office refresh,
 * and the employer-branding scheme. Task offer: the values poster campaign
 * (mints the new `zosia-sticker-campaign` flag). Tone matches her legacy
 * trees: one-on-ones with no agenda, the roadmap doc nobody reads, and
 * eleven minutes in the car that nobody books.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const ZOSIA_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "zosia",
  topics: [
    {
      id: "zosia:corporate",
      label: "Strategic vocabulary",
      optionCandidates: [
        {
          id: "zosia:corporate:opt-1",
          topicId: "zosia:corporate",
          text: "Can you teach me to sound strategic?",
        },
        {
          id: "zosia:corporate:opt-2",
          topicId: "zosia:corporate",
          text: "The roadmap doc has not changed since Q2.",
        },
        {
          id: "zosia:corporate:opt-3",
          topicId: "zosia:corporate",
          text: "I have a blocker. It is the printer.",
        },
        {
          id: "zosia:corporate:opt-4",
          topicId: "zosia:corporate",
          text: "What is on the agenda for my one-on-one?",
        },
        {
          id: "zosia:corporate:opt-5",
          topicId: "zosia:corporate",
          text: "Can we skip today's standup?",
          tags: ["period:morning"],
        },
        {
          id: "zosia:corporate:opt-6",
          topicId: "zosia:corporate",
          text: "How do I say no to a meeting politely?",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:corporate:rep-1",
          text: "Steal my method: take any sentence, add 'strategically', and pause. 'We are hiring' becomes 'we are strategically hiring'. I once ran an entire quarter on the word 'intentional'. Nobody has ever asked intentional ABOUT WHAT. The pause does the work.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:corporate:rep-2",
          text: "It has changed. I renamed the file. That is what Q3 was for. The content is load-bearing, like the printer, like Bruce, like Dariusz's one-on-one. You do not update a monument. You dust it, and you invite people to admire the dust.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:corporate:rep-3",
          text: "Write 'blocked on the printer' in the standup sheet. It is the only blocker that has never been questioned, because nobody wants to be the one who asks. Six years of history, and you are in it now. Welcome.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:corporate:rep-4",
          text: "There is no agenda. That is the design. I ask how you are, you say 'fine', I write 'alignment: strong'. It is theater, but it is YOUR theater, and the alternative is a survey, and surveys have follow-ups.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:corporate:rep-5",
          text: "Skipping is how rumors start, and I RUN the rumors. Come, say 'no blockers', look at Dariusz with compassion, and leave at minute nine. It is fifteen minutes scheduled for thirty. The math forgives us both.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],
        },
        {
          id: "zosia:corporate:rep-6",
          text: "You ask that like someone who has been saying no in their head for a month. Good. Come back at five, off the record, and I will teach you calendar hygiene. The speech has one slide. The slide says 'capacity'. The font does the rest.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:evening"],
        },
      ],
    },
    {
      id: "zosia:renovation",
      label: "The office refresh",
      optionCandidates: [
        {
          id: "zosia:renovation:opt-1",
          topicId: "zosia:renovation",
          text: "Why is there a glass wall on the CTO office?",
        },
        {
          id: "zosia:renovation:opt-2",
          topicId: "zosia:renovation",
          text: "The training room smells like ambition. What was it before?",
        },
        {
          id: "zosia:renovation:opt-3",
          topicId: "zosia:renovation",
          text: "Are we getting new chairs this quarter?",
        },
        {
          id: "zosia:renovation:opt-4",
          topicId: "zosia:renovation",
          text: "Grazyna rejected the renovation budget again.",
        },
        {
          id: "zosia:renovation:opt-5",
          topicId: "zosia:renovation",
          text: "Is the Batman sign part of the brand refresh?",
        },
        {
          id: "zosia:renovation:opt-6",
          topicId: "zosia:renovation",
          text: "The plants look happier than the staff.",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:renovation:rep-1",
          text: "Transparency. Maciek calls it 'radical visibility', which means we can all watch him not write code. The blinds were in the budget, but the budget was in Grazyna's folder, and the folder was in her car. Architecture by procurement.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:renovation:rep-2",
          text: "It was the breakout room. Before that, a storage closet. Before that, the founder's meditation pod. This office accretes purposes like a pearl. Do not clean it too hard or the culture falls out.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:renovation:rep-3",
          text: "Chairs are a Q4 dream. I got approval for ONE chair and I rotate it between the people with the worst posture. It is called hot-desking. It is called cruelty by everyone else, and honestly, the cruelty has better engagement.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:renovation:rep-4",
          text: "Of course she did. Grazyna once rejected a fire extinguisher as 'unbudgeted safety'. Catch her at eleven, after the first-of-month drama, and mention that the CLIENTS will see the office. The word 'clients' unlocks funds like a password.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "zosia:renovation:rep-5",
          text: "Bruce is not part of anything. Bruce simply IS. Dawid will not move him, the movers refuse to touch him, and one client doubled a contract because of him. If the refresh ever finishes, the deliverable is a bigger wall.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:renovation:rep-6",
          text: "That is Halina's work. Janusz built her to water the plants on a schedule, and the schedule has never slipped, unlike ours. Morale has a robot and we do not. I have made peace with it. Mostly. On good days.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "zosia:employer-brand",
      label: "The employer branding scheme",
      optionCandidates: [
        {
          id: "zosia:employer-brand:opt-1",
          topicId: "zosia:employer-brand",
          text: "You and Klaudia post at the same time. War?",
        },
        {
          id: "zosia:employer-brand:opt-2",
          topicId: "zosia:employer-brand",
          text: "Why is our company page posting quotes at 7am?",
        },
        {
          id: "zosia:employer-brand:opt-3",
          topicId: "zosia:employer-brand",
          text: "I saw the hashtag. What is 'synergy season'?",
        },
        {
          id: "zosia:employer-brand:opt-4",
          topicId: "zosia:employer-brand",
          text: "Will you tag me in the culture post?",
        },
        {
          id: "zosia:employer-brand:opt-5",
          topicId: "zosia:employer-brand",
          text: "Your engagement is bots. All of them.",
        },
        {
          id: "zosia:employer-brand:opt-6",
          topicId: "zosia:employer-brand",
          text: "The team fears the culture camera.",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:employer-brand:rep-1",
          text: "War implies an enemy. Klaudia is a colleague with a ring light. We agreed on lanes: she does thought leadership, I do culture, and Marek does nothing, which honestly also performs. The 7am slot is MINE, though. We do not discuss the 7am slot.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:employer-brand:rep-2",
          text: "Engagement peaks while people pretend to start work. It is science. Positivity at 7am, obstacles at 10am, wins at 4pm. The week is a narrative arc and someone has to showrun it, and the someone has a blazer.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "zosia:employer-brand:rep-3",
          text: "It means the quarter where we all use the same adjectives. Last season was 'intentional'. This season is 'momentum'. Next season the team votes, which is democracy, which is content. Two birds, one extremely shareable stone.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:employer-brand:rep-4",
          text: "I will tag you. The caption says 'our newest trainer brings fresh energy'. You will get eleven likes, nine of them mine, one of them Klaudia's alt. And you will earn it: the values posters need hanging, and the printer situation makes that a diplomacy mission.",
          relationshipHint: "delighted",
          offersTaskId: "zosia:task-values-posters",
        },
        {
          id: "zosia:employer-brand:rep-5",
          text: "They are not bots, they are an engagement pod, and the pod is FAMILY. Half are former colleagues, one is my dentist, and the rest I met at a webinar about webinars. The algorithm cannot tell. The algorithm respects effort.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "zosia:employer-brand:rep-6",
          text: "The camera stays until morale improves. Also it is not a camera, it is a 'content capture initiative', and it is off until ten, when the light hits the glass wall. Culture has a golden hour. Ask Klaudia. She bills by it.",
          relationshipHint: "neutral",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "zosia:task-values-posters",
      title: "Values poster campaign",
      description: "Zosia's fourteen hand-lettered company values posters need to reach the walls. The printer is a monument, so this is a two-NPC diplomacy mission. The values include 'momentum'. You are the momentum.",
      flagToSet: "zosia-sticker-campaign",
      rewardHint: "+employer brand (allegedly)",
    },
  ],
};

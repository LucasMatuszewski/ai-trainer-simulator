/**
 * WS5 dialogue v2 pool — Maciek, The CTO (C-77).
 *
 * Pure authored data. Topics: the board deck (one black slide, one word),
 * the buzzword of the quarter (blockchain is winning), and the technical
 * legacy (five years without code, and never stronger). Task offer:
 * second the 'training' nomination in the buzzword poll (sets the
 * existing `maciek-training-buzzword` flag). Tone matches his legacy
 * trees: vision, scale, find-and-replace, and a mercy script that updates
 * laptops during meetings that are going badly.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const MACIEK_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "maciek",
  topics: [
    {
      id: "maciek:board",
      label: "The board deck",
      optionCandidates: [
        {
          id: "maciek:board:opt-1",
          topicId: "maciek:board",
          text: "Thursday is the board. Are you ready?",
        },
        {
          id: "maciek:board:opt-2",
          topicId: "maciek:board",
          text: "One black slide with one word. Really?",
        },
        {
          id: "maciek:board:opt-3",
          topicId: "maciek:board",
          text: "The board asked for metrics.",
        },
        {
          id: "maciek:board:opt-4",
          topicId: "maciek:board",
          text: "What do you say when they ask how it works?",
        },
        {
          id: "maciek:board:opt-5",
          topicId: "maciek:board",
          text: "Can I sit in on a board meeting?",
        },
        {
          id: "maciek:board:opt-6",
          topicId: "maciek:board",
          text: "The chairman underlined 'compound'.",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:board:rep-1",
          text: "The deck is ready because the deck has not changed since 2021: one slide, black, 'SCALE' in white, forty-point font. It has survived three CEOs and one actual auditor. I change the word every quarter and the courage every year.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:board:rep-2",
          text: "Really. A busy slide says you are trying. An empty slide says you have decided. Boards are terrified of people who have decided, so they nod, and the nod is the deliverable. The slide does not know what it is saying. That is its superpower.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:board:rep-3",
          text: "Metrics is a mood, and the mood this quarter is 'compound'. You delivered 'compound' with a straight face, so Thursday I present the compound graph — which is the coffee spend curve, scaled, but the board will feel the future happening to them. That is the job.",
          relationshipHint: "pleased",
          tags: ["quest:maciek-briefed-you", "relationship:neutral"],
        },
        {
          id: "maciek:board:rep-4",
          text: "'Great question — it is a platform play.' Then I drink water slowly. The pause is where the roadmap lives. If they push, I say 'we are sequencing value', which is un-askable, because nobody wants to admit they do not know what it means. Including me. Especially me.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:board:rep-5",
          text: "No. The last trainer who sat in asked one question about margins and set the AI roadmap back two quarters. You may watch through the glass while I do not write code in real time. Radical visibility has tiers, and you are in the free one.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:board:rep-6",
          text: "Underlined it, and now it is company values, plural. The man wrote a sentence fragment on a whiteboard and it has more force of law than the employee handbook. Some days I do not know if I am a CTO or a poet. The invoice does not care either way.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:buzzword",
      label: "The buzzword of the quarter",
      optionCandidates: [
        {
          id: "maciek:buzzword:opt-1",
          topicId: "maciek:buzzword",
          text: "The buzzword poll. Who is winning?",
        },
        {
          id: "maciek:buzzword:opt-2",
          topicId: "maciek:buzzword",
          text: "Blockchain is winning. Do something.",
        },
        {
          id: "maciek:buzzword:opt-3",
          topicId: "maciek:buzzword",
          text: "What was the buzzword before AI-first?",
        },
        {
          id: "maciek:buzzword:opt-4",
          topicId: "maciek:buzzword",
          text: "Could the buzzword be an emoji?",
        },
        {
          id: "maciek:buzzword:opt-5",
          topicId: "maciek:buzzword",
          text: "How do you actually pick the next one?",
        },
        {
          id: "maciek:buzzword:opt-6",
          topicId: "maciek:buzzword",
          text: "The word 'training' is on the ballot. I did that.",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:buzzword:rep-1",
          text: "Blockchain leads, 'training' surges, and 'quantum' polls respectfully from the bottom like a third-party candidate. Democracy is beautiful, and each of those words costs the company roughly a quarter, so choose like it matters. It does. That is the horror.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:buzzword:rep-2",
          text: "If blockchain wins, the slide says 'TRUST', and I will not be able to stop it. The wheel turns, the budget renews, and somewhere a consultant gets a second boat. I have seen this movie. The boat has a lanyard.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:buzzword:rep-3",
          text: "Cloud-native, then mobile-first, then — blockchain, I think? The wheel turns and the slides stay the same: you find-and-replace the buzzword and the courage renews. Find-and-replace is the most senior engineering skill there is. That is not a joke, that is the industry.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:buzzword:rep-4",
          text: "One emoji. Black slide, forty-point emoji, alone. Honestly? It might work — the board cannot ask an emoji a follow-up. I am writing it on the shortlist behind 'scale', 'trust' and 'momentum'. Do not tell anyone the shortlist exists. The shortlist IS the strategy.",
          relationshipHint: "delighted",
          tags: ["stats:high-focus"],
        },
        {
          id: "maciek:buzzword:rep-5",
          text: "I do not pick it. I notice which word the vending-machine crowd is already using, and I claim it a quarter later, like a flag on a moon they landed on by accident. Leadership is noticing. Everything else is slides.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:buzzword:rep-6",
          text: "You did. And 'training' is the first word on that ballot with an actual meaning, which makes it dangerous and honest in the same breath. Second the nomination publicly. If it wins, the slide says 'GROWTH', and for once the slide is not lying. Finish what you started.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
          offersTaskId: "maciek:task-buzzword",
        },
      ],
    },
    {
      id: "maciek:legacy",
      label: "The technical legacy",
      optionCandidates: [
        {
          id: "maciek:legacy:opt-1",
          topicId: "maciek:legacy",
          text: "When did you last write code? Honestly.",
        },
        {
          id: "maciek:legacy:opt-2",
          topicId: "maciek:legacy",
          text: "Five years without coding and you are stronger?",
        },
        {
          id: "maciek:legacy:opt-3",
          topicId: "maciek:legacy",
          text: "The glass wall — whose idea was it?",
        },
        {
          id: "maciek:legacy:opt-4",
          topicId: "maciek:legacy",
          text: "Does Pawel know what his 'backup' script does?",
        },
        {
          id: "maciek:legacy:opt-5",
          topicId: "maciek:legacy",
          text: "What was your best code, ever?",
        },
        {
          id: "maciek:legacy:opt-6",
          topicId: "maciek:legacy",
          text: "Do you miss being an engineer?",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:legacy:rep-1",
          text: "Tuesday. I opened a terminal by accident, tried to close it, closed the browser instead, and lost my tabs. I told everyone the laptop was updating. It was — I made it update. There is a script. The script is the most reliable system I maintain.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:legacy:rep-2",
          text: "Stronger. Code ages you in commits; vision ages you in quarters. I used to solve problems one keyboard at a time. Now I solve them one meeting at a time, and meetings scale worse but the solutions get more budget. I do not make the rules. I fund them.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:legacy:rep-3",
          text: "Mine. I call it radical visibility: everyone can see everyone, and by 'everyone' I mean me not coding, which is the most honest thing a CTO has ever displayed. The blinds were budgeted, then Grazyna's folder ate them, so the transparency is now enforced by procurement. Architecture by invoice.",
          relationshipHint: "delighted",
          tags: ["period:morning", "relationship:neutral"],
        },
        {
          id: "maciek:legacy:rep-4",
          text: "He thinks it is a backup. The script updates laptops, quietly, during meetings that are going badly. It is a mercy deployed at scale. He is happy. Happiness is rare here. Do not tell him what it is actually for, or I will owe him a real backup, and then who protects the meetings?",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:legacy:rep-5",
          text: "A rate limiter, 2019. Forty lines, no dependencies, still in prod, and nobody knows it is there. It has outlived two rewrites, three rebrands, and every architecture diagram that ever claimed to contain it. The best engineering is invisible. That is also the problem with it, career-wise.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:legacy:rep-6",
          text: "Every Thursday, between the board call and the second board call, for exactly eleven minutes. I open the terminal, read the logs like other people read novels, and close it. Then I go say 'scale' at someone. The eleven minutes are mine. The scale is the company's.",
          relationshipHint: "delighted",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "maciek:task-buzzword",
      title: "Second the nomination",
      description: "The buzzword poll is open and 'blockchain' is winning, which means the slide will say 'TRUST'. Champion 'training' across the floor — one word, real meaning, dangerous. If it wins, the slide says 'GROWTH', and for once it is not lying.",
      flagToSet: "maciek-training-buzzword",
      rewardHint: "+one honest slide",
    },
  ],
};

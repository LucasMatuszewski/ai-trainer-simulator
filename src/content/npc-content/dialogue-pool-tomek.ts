/**
 * WS5 dialogue v2 pool — Tomek, Junior Developer (C-77).
 *
 * Pure authored data. Topics: prod is fine (probably), the temporary
 * hotfix collection, and the resume. Task offer: the mentorship trial —
 * one original line, no internet (sets the existing `tomek-apprentice`
 * flag). Tone matches his legacy trees: four lines written, four hundred
 * pasted, the rainforest is load-bearing, and Friday-him is a stranger.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const TOMEK_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "tomek",
  topics: [
    {
      id: "tomek:prod",
      label: "Prod is fine, probably",
      optionCandidates: [
        {
          id: "tomek:prod:opt-1",
          topicId: "tomek:prod",
          text: "Is prod on fire? Be honest.",
        },
        {
          id: "tomek:prod:opt-2",
          topicId: "tomek:prod",
          text: "The dashboard is red again. All of it.",
        },
        {
          id: "tomek:prod:opt-3",
          topicId: "tomek:prod",
          text: "Did you deploy anything today?",
        },
        {
          id: "tomek:prod:opt-4",
          topicId: "tomek:prod",
          text: "The client says the app 'feels haunted'.",
        },
        {
          id: "tomek:prod:opt-5",
          topicId: "tomek:prod",
          text: "How do you know when prod is down?",
        },
        {
          id: "tomek:prod:opt-6",
          topicId: "tomek:prod",
          text: "Should we tell Marek?",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:prod:rep-1",
          text: "Prod is not on fire. Prod is WARM. There is a difference, and the difference is that fire has a ticket and warm has a vibe. If anything were actually burning, Marek would already be standing behind me reading my screen over my shoulder. He is not. See? Fine.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:prod:rep-2",
          text: "Red is the dashboard's resting color. The one panel that never goes green has a nickname and a birthday. Green would be the alarming outcome — green means the monitoring broke, and then the fire is unsupervised.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:prod:rep-3",
          text: "I deployed a fix at nine. It is eleven and nobody has screamed, which is the longest anything I have shipped has ever lived. I typed 'stable' in the channel. If you hear yelling later, the channel lied.",
          relationshipHint: "pleased",
          tags: ["period:morning", "relationship:neutral"],
        },
        {
          id: "tomek:prod:rep-4",
          text: "Haunted is a support-tier word, not an incident-tier word. Haunted means intermittent. Intermittent means nobody can reproduce it, which means it is not MY bug, it is the building's bug. I have logged it as 'environmental'. Technically true.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:prod:rep-5",
          text: "The alerts tell me. Also Burek tells me — when prod is down he sighs from the corridor, same as when Przemek over-forecasts. Two independent monitoring systems, and only one of them is fed.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:prod:rep-6",
          text: "Tell Marek what? He knows. He ALWAYS knows. There is a theory he reads the logs recreationally, like sports results. Prod burning is not a secret, it is a subscription, and Marek has the lifetime plan.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:hotfixes",
      label: "The temporary fixes",
      optionCandidates: [
        {
          id: "tomek:hotfixes:opt-1",
          topicId: "tomek:hotfixes",
          text: "Why is there a file called final_v2_REAL.js?",
        },
        {
          id: "tomek:hotfixes:opt-2",
          topicId: "tomek:hotfixes",
          text: "What does 'temporary' mean in your deploys?",
        },
        {
          id: "tomek:hotfixes:opt-3",
          topicId: "tomek:hotfixes",
          text: "I found a comment in Portuguese.",
        },
        {
          id: "tomek:hotfixes:opt-4",
          topicId: "tomek:hotfixes",
          text: "What is the rainforest API doing in a banking app?",
        },
        {
          id: "tomek:hotfixes:opt-5",
          topicId: "tomek:hotfixes",
          text: "How many hotfixes are live right now?",
        },
        {
          id: "tomek:hotfixes:opt-6",
          topicId: "tomek:hotfixes",
          text: "Did you document any of the hotfixes?",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:hotfixes:rep-1",
          text: "Versioning by adjective. final, final_v2, final_v2_REAL, final_v2_REAL_THIS_ONE. It is not chaos, it is an audit trail of hope. Each file was sincere at the time. I will defend every one of them in a court of code review.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:hotfixes:rep-2",
          text: "Temporary means the fix has no tests, so removing it requires courage, and courage is not covered by the sprint. It has been 'temporary' for two quarters. In dog years that is production.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:hotfixes:rep-3",
          text: "You READ it? The comment says 'this is wrong but it works', and honestly that is the most honest sentence in the repository. When we merged it, legal made me rename the repo dog to 'documentation media'. The haiku stayed. Priorities.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr", "relationship:warm"],
        },
        {
          id: "tomek:hotfixes:rep-4",
          text: "Nobody knows. It appeared during a merge conflict, it returns weather data, and something in the payment flow fails without it. I checked. Twice. The rainforest is load-bearing. Do not water it, do not question it, and NEVER uninstall the rainforest.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:hotfixes:rep-5",
          text: "Eleven that I admit to. The true number is known only to main, and main does not talk. Marek could count them from the logs, but he says the log is for reading, not for judging. That is the closest he has ever come to mercy.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:hotfixes:rep-6",
          text: "Documentation happens at the funeral. While a hotfix is alive, writing about it feels rude, like eulogizing a soldier mid-battle. When one dies I do a full retrospective with slides. It has happened once. The deck was one slide and it said 'goodbye'.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:resume",
      label: "The resume",
      optionCandidates: [
        {
          id: "tomek:resume:opt-1",
          topicId: "tomek:resume",
          text: "What does your resume say you do here?",
        },
        {
          id: "tomek:resume:opt-2",
          topicId: "tomek:resume",
          text: "The phrase 'shipped at scale' is doing a lot of work.",
        },
        {
          id: "tomek:resume:opt-3",
          topicId: "tomek:resume",
          text: "Should you list the pastes as experience?",
        },
        {
          id: "tomek:resume:opt-4",
          topicId: "tomek:resume",
          text: "Stack Overflow is not a skill, Tomek.",
        },
        {
          id: "tomek:resume:opt-5",
          topicId: "tomek:resume",
          text: "Where do you see yourself in five years?",
        },
        {
          id: "tomek:resume:opt-6",
          topicId: "tomek:resume",
          text: "Should I write 'IT trainer' or 'problem solver'?",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:resume:rep-1",
          text: "'Junior Developer and incident survivor'. The survivor part is not a joke, there is a certificate from a webinar. My CV is one page, the page is mostly adjectives, and the adjectives are mostly load-bearing.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:resume:rep-2",
          text: "Two thousand files reached main. That IS scale. Was I supposed to read them? Reading two thousand files is a lifestyle, not a workweek. The resume says 'shipped at scale' and the resume is technically accurate, which is the highest form of accurate.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:resume:rep-3",
          text: "You would actually list them? Fine — 'integrated open-source solutions at volume'. That is resume for paste. Everyone pastes; the difference between a junior and a senior is the senior pastes with confidence and a commit sign-off. I learned the phrasing from a recruiter who ghosted me mid-sentence.",
          relationshipHint: "pleased",
          tags: ["stats:high-credibility"],
        },
        {
          id: "tomek:resume:rep-4",
          text: "It IS a skill. Curation. I evaluate four hundred answers and pick the one that compiles. That is research, citation and shipping in one motion. Museums do the same thing with paintings and nobody calls them juniors.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:resume:rep-5",
          text: "Senior. Here, ideally, because I have finally memorized where everything is buried, and that is worth more than a raise. Five years is eleven hotfixes away. After that: whoever reviews main becomes the actual tech lead, and I intend to be reviewed.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:resume:rep-6",
          text: "'Problem solver' is what people write when the title is embarrassing. You are a trainer: you make knowledge land. Actually — write nothing yet. First take the mentorship trial: teach ME one original line, no internet, and then we will both know what your skill really is.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
          offersTaskId: "tomek:task-one-line",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "tomek:task-one-line",
      title: "One line, no internet",
      description: "Tomek has pasted four hundred lines for every four he wrote. Sit with him after standup and coach one original line out of him — no Stack Overflow, no copying, just const and courage. He brought a paper notebook. He means business.",
      flagToSet: "tomek-apprentice",
      rewardHint: "+Tomek's first original line",
    },
  ],
};

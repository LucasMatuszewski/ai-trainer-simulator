/**
 * WS5 dialogue v2 pool — Burek, Office Dog (C-77).
 *
 * Pure authored data. Species-appropriate half-size pools around his
 * existing themes: the standup audit (twelve sharp, under the table, one
 * exhale when Przemek over-forecasts) and creature comforts (food
 * security, the squeaky server toy, the toy contract). Every reply speaks
 * dog: *sound*, [action] or (thought), matching the legacy dog dialogues.
 * Task offer: the toy contract (sets the existing `burek-person` flag —
 * in dog, this is a contract, and there is no offboarding from it).
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const BUREK_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "burek",
  topics: [
    {
      id: "burek:audit",
      label: "The audit",
      optionCandidates: [
        {
          id: "burek:audit:opt-1",
          topicId: "burek:audit",
          text: "Burek, is prod really fine?",
        },
        {
          id: "burek:audit:opt-2",
          topicId: "burek:audit",
          text: "Przemek just over-forecast. Thoughts?",
        },
        {
          id: "burek:audit:opt-3",
          topicId: "burek:audit",
          text: "Can I see the standup audit today?",
        },
        {
          id: "burek:audit:opt-4",
          topicId: "burek:audit",
          text: "The numbers were corrected. Was that you?",
        },
        {
          id: "burek:audit:opt-5",
          topicId: "burek:audit",
          text: "Who audits the auditor?",
        },
        {
          id: "burek:audit:opt-6",
          topicId: "burek:audit",
          text: "You missed standup. Everything okay?",
        },
      ],
      replyCandidates: [
        {
          id: "burek:audit:rep-1",
          text: "*one short blast through the nose* (The dashboard says fine. The dashboard has never attended a Friday deploy.) [rests chin on paws]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:audit:rep-2",
          text: "*the exhale* (Conservatively, double. Realistically, half of that.) [watches Przemek correct himself in real time]",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:audit:rep-3",
          text: "*tail moves one centimeter* (Twelve sharp, meeting room, under the table. You may observe from the corridor. Do not acknowledge me. That is the ceremony.)",
          relationshipHint: "pleased",
          tags: ["period:lunch", "relationship:neutral"],
        },
        {
          id: "burek:audit:rep-4",
          text: "*ear tilts* (Correction implies guilt. I prefer 'governance'.) [stares at the forecast until it behaves]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:audit:rep-5",
          text: "*slow blink* (There is one. He is called Janusz. We do not speak of the arrangement.) [returns to the warm patch of floor]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:audit:rep-6",
          text: "*head up, both ears* (Twelve-oh-four is sacred, but the audit accepts delegation. The sigh you heard at nine was mine and it stands.) [sighs again, forgives]",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:treats",
      label: "Food and toys",
      optionCandidates: [
        {
          id: "burek:treats:opt-1",
          topicId: "burek:treats",
          text: "Burek, did you eat my lunch?",
        },
        {
          id: "burek:treats:opt-2",
          topicId: "burek:treats",
          text: "Want half of my sandwich?",
        },
        {
          id: "burek:treats:opt-3",
          topicId: "burek:treats",
          text: "Where is the squeaky server toy?",
        },
        {
          id: "burek:treats:opt-4",
          topicId: "burek:treats",
          text: "Fetch? One throw. I am busy.",
        },
        {
          id: "burek:treats:opt-5",
          topicId: "burek:treats",
          text: "Who is a good auditor? Who is?",
        },
        {
          id: "burek:treats:opt-6",
          topicId: "burek:treats",
          text: "Can I be your person?",
        },
      ],
      replyCandidates: [
        {
          id: "burek:treats:rep-1",
          text: "*stares at the empty hand, then at you* (The office failed to guard it. I performed the security audit.) [no remorse detected]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:treats:rep-2",
          text: "*sits instantly, at maximum posture* (Half is a down payment. Friendship is the interest.) [tail: one centimeter, which in dog is applause]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:treats:rep-3",
          text: "*ear perk* (Under the CEO's desk. It is called leverage. Even the chair rotates for me.)",
          relationshipHint: "pleased",
        },
        {
          id: "burek:treats:rep-4",
          text: "*stands, with the gravity of a mountain deciding to move* (One throw. You will want two. They always want two.) [awaits, professionally]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:treats:rep-5",
          text: "*the tail finally betrays him, full wag* (Yes. Obviously. The bowl says so.) [CHIEF AUDIT OFFICER, accepting the record]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:treats:rep-6",
          text: "*drops the squeaky server at your feet* (In dog, this is a contract. You throw, I return; the toy squeaks, the office survives; the audit continues. There is no offboarding. HR has tried.)",
          relationshipHint: "delighted",
          tags: ["quest:burek-standup-observed", "relationship:warm"],
          offersTaskId: "burek:task-toy-contract",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "burek:task-toy-contract",
      title: "The toy contract",
      description: "Burek has dropped the squeaky server toy at your feet. In dog, this is a contract: you throw, he returns, the toy squeaks, the audit continues. There is no offboarding from being his person. HR has tried.",
      flagToSet: "burek-person",
      rewardHint: "+his person (permanent)",
    },
  ],
};

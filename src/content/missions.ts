/**
 * WS7 mission content (AC-23..26, D-54): the conference-speech mission
 * — the trainer's core fantasy, bounded first slice.
 *
 * The ACME contract (quest `q-accept-tutoring`, flag
 * `got-acme-contract`) finally pays off: the player delivers the
 * "JavaScript for Excel People" onboarding keynote to a room of ACME
 * trainees. Bartek sent two chaperones: Marek, to make sure no one
 * promises ACME a Kubernetes cluster by Friday, and Kasia, because she
 * networks at everything. During the speech they are the PLANTS —
 * each asks two hard, uncomfortable questions, and the trainer answers
 * via 4 authored options scored `baseScore` (Jev may adjust by at most
 * one level; it never decides the payout alone).
 *
 * Pure data. Tone: the game's ironic IT-office voice. Every string is
 * authored; every candidate carries a Jev-facing `description`
 * (content schema v2, D-52) so the judgment layer sees what it picks.
 */

import type { NpcId } from "../types";

/** One answer the trainer can give. Exactly 4 per question. */
export interface MissionAnswerOption {
  id: string;
  /** What the trainer actually says. */
  text: string;
  /**
   * Authored baseline score in [-2, 2]. Questions carry real tradeoffs
   * (several distinct values, a genuinely bad and a genuinely good
   * answer) — never one obviously-right option.
   */
  baseScore: number;
  /** The audience's immediate reaction, shown after answering. */
  reaction: string;
}

/** One hard plant question with its 4 answer options. */
export interface PlantQuestion {
  id: string;
  /** The uncomfortable question itself. */
  text: string;
  /** Jev-facing description of what this question tests (D-52). */
  description: string;
  options: readonly MissionAnswerOption[];
}

/** An office NPC planted in the audience. */
export interface MissionPlant {
  npcId: NpcId;
  questions: readonly PlantQuestion[];
}

/** One authored slide of the speech. */
export interface MissionTalkingPoint {
  id: string;
  text: string;
}

/** The authored run order: 5 points and 2x2 questions interleaved. */
export type MissionStep =
  | { kind: "point"; pointId: string }
  | { kind: "question"; plantIndex: number; questionIndex: number };

export interface MissionDef {
  id: string;
  title: string;
  topic: string;
  /** Scene-setting paragraph on the intro card. */
  intro: string;
  /** Jev-facing mission summary (D-52). */
  description: string;
  /** Flag that unlocks the mission (`got-acme-contract` — set by the quest layer). */
  unlockFlag: string;
  /**
   * Flag set EXACTLY ONCE by the first `finish()` — the persisted
   * completion/reward marker that prevents duplicate payouts (D-54).
   */
  completionFlag: string;
  talkingPoints: readonly MissionTalkingPoint[];
  plants: readonly MissionPlant[];
  script: readonly MissionStep[];
  /** Panel-only engagement meter start (0-100). */
  startingEngagement: number;
  /** Engagement at or above this wins the mission. */
  winEngagement: number;
  rewardOnWin: { cash: number; credibility: number };
  rewardOnLoss: { cash: number; credibility: number };
  /** Closing audience quotes, appended to the results card. */
  closingQuotes: { won: readonly string[]; lost: readonly string[] };
}

export const MISSIONS: readonly MissionDef[] = [
  {
    id: "conference-acme-training",
    title: "The ACME Onboarding Keynote",
    topic: "ACME onboarding training",
    intro:
      "Bartek booked you the big room: 'JavaScript for Excel People', client day, ACME Corp. " +
      "He also sent chaperones. Marek came to 'observe' and to make sure you promise nobody a " +
      "Kubernetes cluster by Friday. Kasia came because she networks at everything, including " +
      "funerals. Bartek's parting words: 'Do not push to main.'",
    description:
      "The player delivers the ACME onboarding keynote (JavaScript for Excel people) to a room " +
      "of disengaged corporate trainees. Two coworker plants ask hard questions; the trainer " +
      "answers via four authored options per question.",
    unlockFlag: "got-acme-contract",
    completionFlag: "mission-conference-acme-done",
    talkingPoints: [
      {
        id: "pt-welcome",
        text:
          "Welcome to 'JavaScript for Excel People'. By Friday you will automate the report you " +
          "currently rebuild by hand every morning. Yes, that report. No, coffee breaks are not " +
          "billable learning time.",
      },
      {
        id: "pt-spreadsheets",
        text:
          "Think of a spreadsheet as a program you debug with your eyes. Today we upgrade you to " +
          "a program you debug with Stack Overflow. Progress comes in many forms.",
      },
      {
        id: "pt-numbers",
        text:
          "Our metrics: 97% completion rate, 4.9 stars, zero lawsuits. The other 3% transferred " +
          "to a department with no computers, which we are counting as a placement.",
      },
      {
        id: "pt-demo",
        text:
          "Nothing builds trust like a live demo, which is why today's demo is pre-recorded. " +
          "The laptop remembers what happened at the last client. So do I.",
      },
      {
        id: "pt-qa",
        text:
          "And now, questions. Hard questions build character. Mostly mine. There are no stupid " +
          "questions, only ones that get remembered in the retro.",
      },
    ],
    plants: [
      {
        npcId: "marek",
        questions: [
          {
            id: "mq-trust-numbers",
            text:
              "Why should we trust these numbers? Ninety-seven percent completion, measured by " +
              "whom — the same team that measures printer uptime?",
            description:
              "Skeptic question about data provenance; tests whether the trainer can defend " +
              "shaky metrics without bluffing.",
            options: [
              {
                id: "own-it",
                text:
                  "Measured by the LMS, audited by nobody, rounded up with love. The completion " +
                  "rate is real; the stars are a mood.",
                baseScore: 2,
                reaction:
                  "Marek writes something down. It is either an objection or a compliment.",
              },
              {
                id: "cite-source",
                text:
                  "Straight from the LMS dashboard. I will send you the raw export, and you can " +
                  "find the same three dropouts I did.",
                baseScore: 1,
                reaction: "Marek respects homework. He opens a spreadsheet anyway.",
              },
              {
                id: "deflect",
                text: "Let's take that offline — we have a lot of material to cover.",
                baseScore: -1,
                reaction:
                  "The classic trainer dodge. Marek files it under 'things that rhyme with cover-up'.",
              },
              {
                id: "bluff",
                text: "The numbers are ISO-certified.",
                baseScore: -2,
                reaction: "Marek: 'Which ISO?' The room waits. There is no ISO.",
              },
            ],
          },
          {
            id: "mq-last-trainee",
            text:
              "Your last trainee quit in a week. Walked out mid-merge, I heard. Why is this " +
              "cohort going to be any different?",
            description:
              "Personal credibility attack referencing the trainer's track record; tests " +
              "composure under a direct hit.",
            options: [
              {
                id: "own-record",
                text:
                  "He quit because he got a better offer. I taught him enough JavaScript to get " +
                  "one. That is the product working as designed.",
                baseScore: 2,
                reaction:
                  "The room murmurs approvingly. Marek nods: the refactor of that argument is clean.",
              },
              {
                id: "reframe",
                text:
                  "One departure is anecdote. The completion rate is data. Statistically, you are " +
                  "the exception in either direction.",
                baseScore: 0,
                reaction:
                  "Marek: 'Statistics. My favourite kind of fiction.' But he lets it go.",
              },
              {
                id: "blame-trainee",
                text: "He was not a culture fit. Some people simply should stay in Excel.",
                baseScore: -1,
                reaction:
                  "Somewhere in the room, an Excel person crosses their arms. Excel people are your audience.",
              },
              {
                id: "deny",
                text: "That never happened. Who told you that?",
                baseScore: -2,
                reaction:
                  "Marek, slowly: 'You did. In the kick-off call. It was the only interesting part.'",
              },
            ],
          },
        ],
      },
      {
        npcId: "kasia",
        questions: [
          {
            id: "kq-linkedin",
            text:
              "Quick housekeeping: should the trainees connect with you on LinkedIn after this? " +
              "Asking for me. The banner is already live.",
            description:
              "Meta question about LinkedIn self-promotion mid-training; tests whether the " +
              "trainer can handle a personal-brand ambush without hijacking his own keynote.",
            options: [
              {
                id: "lean-in",
                text:
                  "Everyone here should absolutely connect with me. Networking is the real " +
                  "course content; the certificate is a bonus.",
                baseScore: 2,
                reaction:
                  "Half the room laughs. The other half is checking whether your profile is even complete.",
              },
              {
                id: "deflect",
                text:
                  "Connect with the company page first. Your inbox will thank you, and so will " +
                  "my notification settings.",
                baseScore: 1,
                reaction:
                  "Kasia is already drafting the follow-up message. Engagement is a spectrum.",
              },
              {
                id: "policy",
                text:
                  "This is a learning environment. Career opportunities can wait for the break.",
                baseScore: 0,
                reaction: "The room hears 'no fun allowed'. Someone yawns on principle.",
              },
              {
                id: "hijack",
                text: "Actually, Kasia is hiring. Kasia, tell them about the referral bonus.",
                baseScore: -2,
                reaction:
                  "Kasia perks up. The trainees realize the trainer just outsourced his own keynote.",
              },
            ],
          },
          {
            id: "kq-headhunt",
            text:
              "Two of your trainees just got LinkedIn messages from a competing vendor. " +
              "Mid-slide. Is that a you problem or a market signal?",
            description:
              "Awkward question tying competitor poaching to the trainer's own value; tests " +
              "whether the trainer can address attrition without panic or denial.",
            options: [
              {
                id: "confident",
                text:
                  "A market signal that our training raises market value. If a competitor " +
                  "poaches them, someone has to train the replacements. Call me.",
                baseScore: 2,
                reaction:
                  "Kasia stops typing. That is the sound of a recruiter recognizing content.",
              },
              {
                id: "reassure",
                text:
                  "Finish the course first. Nobody hires a developer who only knows week one.",
                baseScore: 1,
                reaction:
                  "The trainees look at their inboxes. Then at the clock. The clock wins.",
              },
              {
                id: "panic",
                text: "Which vendor? What did the message say? Can I see one?",
                baseScore: 0,
                reaction:
                  "The room watches the trainer negotiate with himself. Kasia takes notes verbatim.",
              },
              {
                id: "dismiss",
                text: "Phones away, please. This is a learning space.",
                baseScore: -2,
                reaction:
                  "Two people open their phones wider. One of them is bookmarking the competitor.",
              },
            ],
          },
        ],
      },
    ],
    // C-77 verdict fix (AC-23): points and questions strictly alternate —
    // the runtime folds consecutive points when advancing (so the steered
    // first question lands after one Space), which silently skipped any
    // point that followed another point. This order shows all five
    // talking points while preserving the question order.
    script: [
      { kind: "point", pointId: "pt-welcome" },
      { kind: "question", plantIndex: 1, questionIndex: 0 }, // kasia: LinkedIn ambush
      { kind: "point", pointId: "pt-spreadsheets" },
      { kind: "question", plantIndex: 0, questionIndex: 0 }, // marek: trust the numbers
      { kind: "point", pointId: "pt-numbers" },
      { kind: "question", plantIndex: 0, questionIndex: 1 }, // marek: the last trainee
      { kind: "point", pointId: "pt-demo" },
      { kind: "question", plantIndex: 1, questionIndex: 1 }, // kasia: the headhunters
      { kind: "point", pointId: "pt-qa" },
    ],
    startingEngagement: 50,
    winEngagement: 60,
    rewardOnWin: { cash: 400, credibility: 8 },
    rewardOnLoss: { cash: 0, credibility: -3 },
    closingQuotes: {
      won: [
        "Marek: 'Acceptable. I have seen worse decks survive production.'",
        "Kasia is already connecting with three ACME people on LinkedIn. Revenue, probably.",
      ],
      lost: [
        "Marek: 'I have notes. All of them are the same note.'",
        "Two ACME people leave to 'take this call'. The call is with another training vendor.",
      ],
    },
  },
];

/** Resolve a mission by id, or undefined. Pure. */
export function getMission(id: string): MissionDef | undefined {
  return MISSIONS.find((mission) => mission.id === id);
}

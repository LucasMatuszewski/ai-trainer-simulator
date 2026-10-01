/**
 * WS5 dialogue v2 pool — Kasia, The Recruiter (C-77).
 *
 * Pure authored data. Topics: the forty-seven open roles, compensation
 * feelings, and the engagement survey. Task offer: the referral bounty
 * (sets the existing `kasia-referral-open` flag — five hundred zl, ninety
 * days, and the friendship surviving is on you). Tone matches her legacy
 * trees: a census with a lanyard, transparency on the shy end of a
 * spectrum, and everything closed at 5pm sharp.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const KASIA_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "kasia",
  topics: [
    {
      id: "kasia:talent",
      label: "The forty-seven open roles",
      optionCandidates: [
        {
          id: "kasia:talent:opt-1",
          topicId: "kasia:talent",
          text: "Forty-seven open roles. How many are real?",
        },
        {
          id: "kasia:talent:opt-2",
          topicId: "kasia:talent",
          text: "What happens to candidates you reject?",
        },
        {
          id: "kasia:talent:opt-3",
          topicId: "kasia:talent",
          text: "Do you actually enjoy recruiting?",
        },
        {
          id: "kasia:talent:opt-4",
          topicId: "kasia:talent",
          text: "How do you spot a good candidate?",
        },
        {
          id: "kasia:talent:opt-5",
          topicId: "kasia:talent",
          text: "I saw you close your tabs at 5pm sharp.",
        },
        {
          id: "kasia:talent:opt-6",
          topicId: "kasia:talent",
          text: "Can you find me a better job? Asking carefully.",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:talent:rep-1",
          text: "Forty-two are real. Three are aspirational, one is a revenge posting, and one is the haunted one, which is real in the way weather is real. All forty-seven have approved headcount, which is accounting for the word 'approved'.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:talent:rep-2",
          text: "Every rejection is a form, and every form goes in the candidate's folder, and the folder is called 'future network'. Nobody here is rejected. Everybody is deferred. It is kinder, and it is also why I always have someone to call when a role catches fire.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:talent:rep-3",
          text: "Enjoy is a survey answer. I love the census of it: four hundred humans, one lanyard, every statistic you could want. Individually people are exhausting. At scale they are weather, and I have a window.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:talent:rep-4",
          text: "The good ones ask about failure rates in the first interview. Anyone can rehearse success. It takes a person who has shipped something to tell you what broke and what it cost. Then I check whether their references use the word 'actually' unprompted.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:talent:rep-5",
          text: "Five pm, closing tabs. It is not a quirk, it is a firewall. Work-life balance is a spectrum and I sit at the enforced end. Anything still open at 4:59 becomes tomorrow's problem with a fresh subject line. The subject line is half the work.",
          relationshipHint: "neutral",
          tags: ["period:afternoon"],
        },
        {
          id: "kasia:talent:rep-6",
          text: "Asking carefully is the correct way to ask. Off the record, as your census and not your recruiter: the best time to job-hunt is while employed, and the best person to apply through is a stranger. Refer yourself to me and I must treat you like any candidate. It is the only vacation I get from knowing you.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:evening"],
        },
      ],
    },
    {
      id: "kasia:compensation",
      label: "Compensation feelings",
      optionCandidates: [
        {
          id: "kasia:compensation:opt-1",
          topicId: "kasia:compensation",
          text: "Why do none of the roles have salary ranges?",
        },
        {
          id: "kasia:compensation:opt-2",
          topicId: "kasia:compensation",
          text: "My salary is 'commensurate'. With what?",
        },
        {
          id: "kasia:compensation:opt-3",
          topicId: "kasia:compensation",
          text: "I asked for a raise and got two forms.",
        },
        {
          id: "kasia:compensation:opt-4",
          topicId: "kasia:compensation",
          text: "Who is on the compensation committee?",
        },
        {
          id: "kasia:compensation:opt-5",
          topicId: "kasia:compensation",
          text: "Is there a raise in this company's future?",
        },
        {
          id: "kasia:compensation:opt-6",
          topicId: "kasia:compensation",
          text: "I heard the salary bands exist. Allegedly.",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:compensation:rep-1",
          text: "Transparency is a spectrum and we are on the shy end of it. A published range attracts candidates who know their worth, and worth is a variable we have not finished modeling. The range exists. It is warm. It is loved. It is not published.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:compensation:rep-2",
          text: "With experience, which is commensurate with the band, which is commensurate with experience. It is a closed loop. Snakes do it too and nobody calls them underpaid.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:compensation:rep-3",
          text: "The forms ARE the process. Form one confirms you exist, form two confirms you would like more money, and then the committee meets quarterly in a room that does not exist. You have completed the pilgrimage. Most people never finish the second form.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:compensation:rep-4",
          text: "We both know the committee is three people and a spreadsheet, and the spreadsheet is me. Being angry at compensation is fine. Being angry at the spreadsheet's author is a career decision, and I like you, so: be angry at the system. The system has no feelings and better hours.",
          relationshipHint: "neutral",
          tags: ["quest:kasia-revealed-the-role", "relationship:warm"],
        },
        {
          id: "kasia:compensation:rep-5",
          text: "There is a raise in everyone's future, in the way there is a bus in everyone's future. It may come. It may be late. It may be a different bus. Your file lists it under 'potential', which is where raises live before they are negotiated into existence.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:compensation:rep-6",
          text: "Change of policy. I am opening the referral scheme to you first, which is favoritism, and favoritism with a form attached is a PROGRAM. Refer one person, they survive ninety days, five hundred zl lands. The friendship surviving is on you.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
          offersTaskId: "kasia:task-referral",
        },
      ],
    },
    {
      id: "kasia:engagement",
      label: "The engagement survey",
      optionCandidates: [
        {
          id: "kasia:engagement:opt-1",
          topicId: "kasia:engagement",
          text: "You filled in my engagement survey. What did I answer?",
        },
        {
          id: "kasia:engagement:opt-2",
          topicId: "kasia:engagement",
          text: "The results are in. We are officially 'thriving'?",
        },
        {
          id: "kasia:engagement:opt-3",
          topicId: "kasia:engagement",
          text: "What does HR actually measure with these surveys?",
        },
        {
          id: "kasia:engagement:opt-4",
          topicId: "kasia:engagement",
          text: "Next time I want to answer the survey honestly.",
        },
        {
          id: "kasia:engagement:opt-5",
          topicId: "kasia:engagement",
          text: "The survey has forty questions about loyalty.",
        },
        {
          id: "kasia:engagement:opt-6",
          topicId: "kasia:engagement",
          text: "Did anyone ever fail the engagement survey?",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:engagement:rep-1",
          text: "'Thriving'. I also gave you 'strong alignment with company values' and flagged you as 'a flight risk in a good way', which is the highest compliment the form supports. You are welcome. The survey is a genre and I am its author.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:engagement:rep-2",
          text: "Thriving, with a footnote: 'based on a 34% response rate, rounded up to optimism'. The trend line is what matters, and the trend line has only ever been fed optimism, so the trend line is thriving. It is a closed loop and it is load-bearing.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:engagement:rep-3",
          text: "Retention risk, belonging, and whether you would recommend this company as a place to work, which everyone answers with their commute in mind. The real metric is who reads the results. Me. Only me. The census reads itself.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:engagement:rep-4",
          text: "I will read every word of it, twice, and action nothing, because honesty in an engagement survey is a grenade with a receipt attached. Write it anyway. The census is strongest when someone tells it the truth. Just — no names. Or names. Your call, really.",
          relationshipHint: "annoyed",
          tags: ["relationship:hostile"],
        },
        {
          id: "kasia:engagement:rep-5",
          text: "Question twelve is the loyalty battery. Forty questions, because one honest question would get honest answers, and honest answers require follow-ups, and follow-ups require budget. The survey is priced honestly, though. Free. Like the coffee. Allegedly.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:engagement:rep-6",
          text: "Once. Marek, 2022. Every answer was the word 'no', including the free-text box. I framed it. It remains the only survey response ever read aloud at an all-hands, and it was read as poetry, because it was.",
          relationshipHint: "delighted",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "kasia:task-referral",
      title: "The referral bounty",
      description: "Refer one employed-adjacent person with a pulse and a GitHub. They last ninety days, five hundred zl lands, and Kasia pencils them in as 'culture add', which is what HR says instead of 'please'. The friendship surviving is on you.",
      flagToSet: "kasia-referral-open",
      rewardHint: "+500 zl (pending committee, allegedly)",
    },
  ],
};

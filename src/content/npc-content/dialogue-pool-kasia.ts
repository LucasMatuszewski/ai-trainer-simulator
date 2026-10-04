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
    {
      id: "kasia:dms",
      label: "The DM economy",
      optionCandidates: [
        {
          id: "kasia:dms:opt-1",
          topicId: "kasia:dms",
          text: "How many unread messages is normal for a recruiter?",
        },
        {
          id: "kasia:dms:opt-2",
          topicId: "kasia:dms",
          text: "Klaudia says your LinkedIn is a census. Fair?",
        },
        {
          id: "kasia:dms:opt-3",
          topicId: "kasia:dms",
          text: "A candidate DMed me asking for a referral. To you.",
        },
        {
          id: "kasia:dms:opt-4",
          topicId: "kasia:dms",
          text: "I get recruiter spam. Should I be flattered?",
        },
        {
          id: "kasia:dms:opt-5",
          topicId: "kasia:dms",
          text: "What makes a DM actually get answered?",
        },
        {
          id: "kasia:dms:opt-6",
          topicId: "kasia:dms",
          text: "Do you ever just want to turn the phone off?",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:dms:rep-1",
          text: "Four hundred and eleven, and the number is an instrument panel, not a shame spiral. Two hundred are bots with confident handshakes, a hundred are candidates I am politely aging, and the rest are real humans with real Tuesdays. I answer the real ones in order of specificity: 'quick question' gets queued; an actual question gets a human. Specificity is the currency. It…",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:dms:rep-2",
          text: "It is a census and Klaudia's feed is the gossip column — same population, different literacy. She counts who is PERCEIVED; I count who is MOVING. Between us we know things about this city's workforce that the government pays consultants for. The difference is I have consent forms. She has ring lights. Both are instruments. Only one survives an audit.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:dms:rep-3",
          text: "That candidate understood the entire game in one message. They did not apply cold — they created a warm path THROUGH you, and warm paths convert at three times the rate. Tell them the correct ritual: you refer, I still run the full process, and nobody is embarrassed. If they are good, the process is a formality. If they are not, the process is a kindness. Either way, the…",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:dms:rep-4",
          text: "Be flattered by the volume and unimpressed by the content. Being recruited by spam is the job market's version of junk mail addressed to 'current resident'. The flattering version is ONE message from someone who read your work, references a specific thing you did, and admits their role is boring. Boring honesty is so rare in my inbox that it gets answered same-day. Every time.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:dms:rep-5",
          text: "Three things: a name, a number, and a reason. Your name, one metric of your work, and why THIS role — not why any role. I read two hundred messages a day and the ones with all three get a reply before my coffee lands. The ones with 'to Whom It May Concern' get forwarded to whom it may concern, which is nobody, and nobody does not hire.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:dms:rep-6",
          text: "Sunday mornings, the phone goes in a drawer for exactly the duration of one long coffee. The inbox survives, the candidates survive, and I survive, which is the part the industry forgets to schedule. A recruiter who answers in three minutes all week is a recruiter who answers in three DAYS eventually. The drawer is what keeps the three minutes honest.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:interviews",
      label: "Running the interview",
      optionCandidates: [
        {
          id: "kasia:interviews:opt-1",
          topicId: "kasia:interviews",
          text: "What is the one question that reveals a candidate?",
        },
        {
          id: "kasia:interviews:opt-2",
          topicId: "kasia:interviews",
          text: "A candidate arrived with a printed CV. In 2026.",
        },
        {
          id: "kasia:interviews:opt-3",
          topicId: "kasia:interviews",
          text: "I froze in an interview once. Recoverable?",
        },
        {
          id: "kasia:interviews:opt-4",
          topicId: "kasia:interviews",
          text: "Do you really ask about failure rates?",
        },
        {
          id: "kasia:interviews:opt-5",
          topicId: "kasia:interviews",
          text: "How many interviews does one role actually need?",
        },
        {
          id: "kasia:interviews:opt-6",
          topicId: "kasia:interviews",
          text: "Who was your worst hire, honestly?",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:interviews:rep-1",
          text: "'Tell me about a time you were the bottleneck.' Everyone prepares triumphs; nobody prepares bottlenecks. The good candidates light up, because they have MET their bottleneck, they have named it, and some have negotiated with it. The bad ones describe a colleague. That answer is a map of how someone's career will actually go — through the thing they refuse to be.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:interviews:rep-2",
          text: "The printed CV is a power move I respect enormously — it says 'I prepared for YOUR systems failing', and our systems fail constantly. The printer is a monument, the projector has opinions, and the candidate who arrives with paper has read the room before entering it. Hired on the spot, technically for the role and spiritually for the instinct.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:interviews:rep-3",
          text: "Freezing is data, not failure — I have seen it happen to excellent people who cared too much, and the recovery is a sentence: 'let me start that answer again'. Candidates who restart soundly are candidates who restart PROD soundly, which is a skill we hire for explicitly. The freeze stays in the room. The restart comes to work with us. I have notes saying exactly this.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:interviews:rep-4",
          text: "Every time, and the answers sort people faster than any puzzle. Some describe a number and its cost. Some describe the aftermath and what they now test. And some say 'we do not really track that', which tells me they have never watched something they shipped hurt a stranger. The good ones get uncomfortable in the telling. Discomfort with specificity is competence wearing…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:interviews:rep-5",
          text: "One conversation with me, one with the team, one with Maciek — and the third exists not to test skill but to see who they become in front of vision, because vision is the weather system they will live under. Three is the maximum before candidates start interviewing US, which, honestly, they should. The best one we ever hired asked more questions than all three rounds combined.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:interviews:rep-6",
          text: "Brilliant in interviews, allergic to Tuesdays. He interviewed like a documentary and worked like a weather warning. I kept him eight months, longer than I should have, because my process had chosen him and my process has an ego. Now I hire for the Tuesday, and the interviews are just Tuesday auditions with better lighting. The worst hire taught me more than the best one.…",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "kasia:onboarding",
      label: "The onboarding papers",
      optionCandidates: [
        {
          id: "kasia:onboarding:opt-1",
          topicId: "kasia:onboarding",
          text: "Why is onboarding forty pages of forms?",
        },
        {
          id: "kasia:onboarding:opt-2",
          topicId: "kasia:onboarding",
          text: "Nobody reads page thirty-one. Confirm?",
        },
        {
          id: "kasia:onboarding:opt-3",
          topicId: "kasia:onboarding",
          text: "My contract says 'other duties'. What are they?",
        },
        {
          id: "kasia:onboarding:opt-4",
          topicId: "kasia:onboarding",
          text: "The welcome email calls us a family.",
        },
        {
          id: "kasia:onboarding:opt-5",
          topicId: "kasia:onboarding",
          text: "Why do I sign the same form twice?",
        },
        {
          id: "kasia:onboarding:opt-6",
          topicId: "kasia:onboarding",
          text: "What is the single best thing about our onboarding?",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:onboarding:rep-1",
          text: "Forty pages is the state's idea of romance. Every page exists because some office, somewhere, did something magnificent and irresponsible, and now we all carry the receipt. I did not write the forms; I maintain the illusion they are one form. The packet is a legal hedgehog — spiky outside, necessary inside, and it curls up if you poke it.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:onboarding:rep-2",
          text: "Page thirty-one is the fire safety annex and it has a 100% skip rate, which I know because I put a recipe for pierogi on page thirty-two and asked the next ten hires if they saw it. Two mentioned pierogi. Nobody mentioned fire. The fire marshal and I now share a long look each spring. The pierogi recipe is real, by the way. It is the best page in the packet.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:onboarding:rep-3",
          text: "'Other duties' is the clause that makes this office possible — it is legal for 'you will carry the cake, judge the dog, and answer the door when sales is hiding'. Every contract in the world has a version of it; ours is just honest enough to be funny. I have invoked it twice. Both times involved Burek. Both times were worth it.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:onboarding:rep-4",
          text: "Family is the word every welcome email reaches for and I have never once let it through. We are a TEAM — a family you are born into, a team you can leave at five pm. The draft that said family got corrected in red pen before Zosia inherited the template, and she has kept my red pen rule as policy. Words in onboarding documents are load-bearing. We build with timber we…",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:onboarding:rep-5",
          text: "Once for you and once for the archive, because the archive is a fireproof box that Grazyna trusts more than servers, and the box does not do copies — it does ORIGINALS. The duplicate signature ceremony is thirty seconds and it is the only ritual where Grazyna and the cloud agree to disagree. You are signing for both of them. Historically significant, practically annoying.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:onboarding:rep-6",
          text: "Renata's tour. Every other company hands you a laptop and a wiki; Renata hands you the BUILDING — who to ask, where the light is good, which plant outranks you. New hires arrive as paperwork and leave the tour as people. It is the only part of onboarding that was never mandated and the only part nobody skips. I have tried to document it. The document is thirty-one…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:appraisals",
      label: "Salary review season",
      optionCandidates: [
        {
          id: "kasia:appraisals:opt-1",
          topicId: "kasia:appraisals",
          text: "When is the best moment to ask for a raise?",
        },
        {
          id: "kasia:appraisals:opt-2",
          topicId: "kasia:appraisals",
          text: "The committee meets quarterly. Where?",
        },
        {
          id: "kasia:appraisals:opt-3",
          topicId: "kasia:appraisals",
          text: "I asked for a raise and got a form. Aggressive?",
        },
        {
          id: "kasia:appraisals:opt-4",
          topicId: "kasia:appraisals",
          text: "Is the market rate real or a rumor with a graph?",
        },
        {
          id: "kasia:appraisals:opt-5",
          topicId: "kasia:appraisals",
          text: "Grazyna said budgets are 'a direction'.",
        },
        {
          id: "kasia:appraisals:opt-6",
          topicId: "kasia:appraisals",
          text: "You once negotiated someone's salary unprompted.",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:appraisals:rep-1",
          text: "Ninety days after you did something undeniable and thirty days before the committee meets. The sweet spot is when the memory is fresh and the budget is still soft. Asking on a Friday is a myth — money conversations happen Tuesday to Thursday, when the spreadsheet is open and the coffee has not curdled. Day matters. The spreadsheet's mood matters more.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:appraisals:rep-2",
          text: "The meeting room that does not exist — technically it is the storage room with the banner graveyard pushed to one side, three chairs, and the real spreadsheet on a laptop with no wifi, because the wifi has opinions. It is the most secure room in the building for the least cinematic reason: no glass wall. Total privacy, one lamp, and it smells of archive. Democracy has…",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:appraisals:rep-3",
          text: "The form is not a rejection, it is a QUEUE TICKET. The system is a machine and the machine runs on paper — the form enters you into the quarterly draw, which is unglamorous and REAL. The people who skip the form are asking for vibes, and vibes are not budget lines. I have watched the form work exactly four times. All four times, the person was surprised. The form works.…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:appraisals:rep-4",
          text: "Market rate is three graphs in a trench coat — surveys, postings, and one confident blog post, all wearing the same average. It is real the way weather is real: locally approximate, globally averaged, and never quite about YOUR window. My job is knowing the trench coat's tailor. The number I defend is always a range, because ranges are honest and points are theater.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:appraisals:rep-5",
          text: "'A direction' means the money exists but the SHAPE is still liquid, which is recruiter for 'now, while she is generous'. I have seen Grazyna approve things in November she burned in January — not mood, CYCLES. The budget breathes. Learn its lungs. Ask on the exhale and the answer arrives with a spreadsheet cell already named after you.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:appraisals:rep-6",
          text: "Once. Pawel. He had kept a server alive out of pure stubbornness for two years at an intern rate, and the committee's spreadsheet could not see stubbornness, so I made it a column. That is the job nobody sees: translating humans into rows before the rows harden. He got 'thriving' and a real number. He framed the review. I framed nothing. The column was the frame.",
          relationshipHint: "delighted",
          tags: ["quest:kasia-revealed-the-role", "relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:away-day",
      label: "The team away day",
      optionCandidates: [
        {
          id: "kasia:away-day:opt-1",
          topicId: "kasia:away-day",
          text: "Away day. What is the actual agenda?",
        },
        {
          id: "kasia:away-day:opt-2",
          topicId: "kasia:away-day",
          text: "The last trust exercise ended a friendship. Details.",
        },
        {
          id: "kasia:away-day:opt-3",
          topicId: "kasia:away-day",
          text: "Przemek wants to sponsor the bus. Consequences?",
        },
        {
          id: "kasia:away-day:opt-4",
          topicId: "kasia:away-day",
          text: "Does Burek attend the away day?",
        },
        {
          id: "kasia:away-day:opt-5",
          topicId: "kasia:away-day",
          text: "Grazyna capped the budget at 'one pizza per head'.",
        },
        {
          id: "kasia:away-day:opt-6",
          topicId: "kasia:away-day",
          text: "Help me plan the schedule. Nobody else can.",
          tags: ["relationship:warm"],
        },
      ],
      replyCandidates: [
        {
          id: "kasia:away-day:rep-1",
          text: "The agenda is three slots: one where we pretend to plan, one where we actually plan, and lunch, which is where the real planning happens and where I schedule the hardest conversation of the year. Every successful away day in history has been a lunch with a venue. The morning is theater. The pierogi are the offsite. I book the restaurant before the workshop. Order of operations.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:away-day:rep-2",
          text: "The trust fall of 2023 — Ania caught Bartek with total commitment, Bartek mentioned the enthusiasm in the follow-up email, and Klaudia read the email as content. A friendship survived, technically, in the way a license survives renewal. Now we do trust exercises that require no falling: collaborative spreadsheets, jointly owned whiteboards. Nothing to catch. Nobody falls.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:away-day:rep-3",
          text: "Przemek sponsoring the bus means the bus has a banner, the banner has a QR code, and the QR code has a pipeline. I allowed it once: forty minutes of captivity, one captive audience, and he closed a workshop booking on the WARSAW BYPASS. The bus sponsorship pays for itself and costs us a little dignity each year. Dignity is a renewable resource. The bypass booking renewed…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:away-day:rep-4",
          text: "Burek attends as an unregistered stakeholder, which is legally a pet and functionally the facilitator. The offsite venue books us BECAUSE of him — the conference center's reviews mention the dog more than the wifi. He attends the morning session, audits the lunch, and naps through the roadmap. The napping is participation. We have all done less at offsites and called…",
          relationshipHint: "delighted",
          tags: ["quest:burek-standup-observed"],
        },
        {
          id: "kasia:away-day:rep-5",
          text: "One pizza per head is not a budget, it is a CHALLENGE, and I have learned to read her caps as starting positions. Last year 'one pizza' became pizza plus a venue plus a bus, because every add-on had a receipt with the word 'learning' on it. She approves the receipt, not the pizza. Word your expenses like lessons and the cap breathes. This is not fraud. This is pedagogy…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "quest:grazyna-showed-the-books"],
        },
        {
          id: "kasia:away-day:rep-6",
          text: "You take the schedule, I take the politics. One page: three slots, one lunch, and every name needs a job and a break — the introverts get the walk, the extroverts get the whiteboard, and nobody gets a trust fall. You plan it like a census and I will run it like a diplomat. The away day lives or dies on the schedule page. Write it like you mean it. I will bring the red pen…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
          offersTaskId: "kasia:task-away-day",
        },
      ],
    },
    {
      id: "kasia:job-ads",
      label: "The job ad poetry",
      optionCandidates: [
        {
          id: "kasia:job-ads:opt-1",
          topicId: "kasia:job-ads",
          text: "Who writes 'rockstar ninja' in 2026?",
        },
        {
          id: "kasia:job-ads:opt-2",
          topicId: "kasia:job-ads",
          text: "Your ads list salary bands now. Radical.",
        },
        {
          id: "kasia:job-ads:opt-3",
          topicId: "kasia:job-ads",
          text: "One of your postings is a revenge ad. Which?",
        },
        {
          id: "kasia:job-ads:opt-4",
          topicId: "kasia:job-ads",
          text: "So the job ads are basically 'perks'. Ok.",
        },
        {
          id: "kasia:job-ads:opt-5",
          topicId: "kasia:job-ads",
          text: "A candidate applied through a comment section.",
        },
        {
          id: "kasia:job-ads:opt-6",
          topicId: "kasia:job-ads",
          text: "What makes a job ad actually good?",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:job-ads:rep-1",
          text: "A desperate agency and a thesaurus, in that order. 'Rockstar' means overtime, 'ninja' means undocumented systems, and 'wizard' means the last person left. I purged the vocabulary from our ads in 2022 and applications from seniors doubled — experienced people read 'rockstar' the way pilots read 'adventure travel'. The words are a filter. Most companies filter for the…",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:job-ads:rep-2",
          text: "Radical like windows. The band went public and the application quality changed overnight — people who would have wasted both our evenings self-selected out, and the ones who stayed negotiated from a shared map. Publishing the band cost me my favorite lever and bought me something better: interviews that start at the actual conversation. Transparency is just efficiency…",
          relationshipHint: "delighted",
          tags: ["quest:kasia-leaked-bands"],
        },
        {
          id: "kasia:job-ads:rep-3",
          text: "The one for 'Senior Collaboration Specialist' that requires 'experience delivering difficult feedback to leadership'. It is not aimed at anyone. It is aimed AT someone, and that someone reads the industry boards at 2am and knows exactly who it is for. The role will never be filled. It does not need to be. The ad IS the feedback. HR cannot say everything; a job posting can.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:job-ads:rep-4",
          text: "It means the queue is the process. Tickets arrive faster than they retire, priorities change with the client's breakfast, and the roadmap is a rumor with a deadline. I put 'fast-paced' in our ads once and removed it the same afternoon — honesty attracts the resilient, and the resilient are the only ones who survive the printer conversation. 'Established pace…",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:job-ads:rep-5",
          text: "Through the comment section, under a post about our own job ad, where they wrote 'I could do this but your process looks slow'. Hired. Obviously. Someone who audits your process in public and is right about it will audit your systems in private, where it pays. The comment is now pinned in our onboarding deck as 'the best cover letter we never received'. They know.…",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:job-ads:rep-6",
          text: "A good ad is a confession with a salary range. It says what the work is, what the Tuesdays cost, and who thrives — and it admits one real flaw, because a role without flaws is a role nobody believes. Ours admits the printer. Candidates reply to that line more than the requirements. Truth is the strongest recruiting tool and it is completely free, which is why nobody…",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:exits",
      label: "The exit interviews",
      optionCandidates: [
        {
          id: "kasia:exits:opt-1",
          topicId: "kasia:exits",
          text: "Who left this office and why? The real version.",
        },
        {
          id: "kasia:exits:opt-2",
          topicId: "kasia:exits",
          text: "Do exit interviews ever change anything?",
        },
        {
          id: "kasia:exits:opt-3",
          topicId: "kasia:exits",
          text: "The guy who left for a competitor — bitter?",
        },
        {
          id: "kasia:exits:opt-4",
          topicId: "kasia:exits",
          text: "What do people say they want versus what they want?",
        },
        {
          id: "kasia:exits:opt-5",
          topicId: "kasia:exits",
          text: "Did anyone ever come back?",
        },
        {
          id: "kasia:exits:opt-6",
          topicId: "kasia:exits",
          text: "What would make YOU leave, Kasia?",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:exits:rep-1",
          text: "Eleven exits in my time and exactly zero were about the stated reason. 'New challenge' means unseen ceiling, 'relocation' means unloved commute, and 'personal project' means the personal project is someone else's payroll. The real reasons live in the last two months of calendar entries — who they stopped booking, who they started. I read calendars the way detectives…",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:exits:rep-2",
          text: "Exit interviews change one thing at a time, usually two years late, and the change is real when it arrives. The coffee machine's second slot exists because of an exit. The quiet room policy exists because of an exit. The exits are the office's only honest feedback channel, which is tragic and useful. Ideally you fix things before the goodbye. Practically, you fix them…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:exits:rep-3",
          text: "He is not bitter, he is EXPORTED. Sends Marek memes about load balancers, once tried to poach Tomek with a signed hoodie as the bribe. The competitor thing was never personal — they offered twice our number and our number is a direction, not a destination. I wrote his reference myself. The best compliment I can give a leaver is that the door does not slam behind them.…",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:exits:rep-4",
          text: "They say growth and mean recognition. They say flexibility and mean one Tuesday, controlled. They say culture and mean whether someone noticed their birthday. None of this is dishonest — it is translation, and exit interviews are just live subtitles. I write down what they say and action what they mean. The gap between those two documents is my entire craft, and it fits…",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:exits:rep-5",
          text: "One. The support hire who left for a big logo and returned in fourteen months, thinner and wiser. The big logo had four approval layers for a coffee machine; our office has a coffee protocol with its own folklore. She calls her return 'the boomerang', and I have hired two more boomerangs since — once someone has seen the alternative, our weird little office becomes…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:exits:rep-6",
          text: "The day I stop being surprised by people. The census is my engine and the day every answer becomes predictable, the census is dead and I am just a woman with forms. But you are asking because you noticed I stay. I stay because this office is a DEMOGRAPHIC I know by name, not a segment. Leaving would be leaving the data. Nobody leaves the data. We just take samples…",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:pipeline",
      label: "The candidate pipeline",
      optionCandidates: [
        {
          id: "kasia:pipeline:opt-1",
          topicId: "kasia:pipeline",
          text: "How big is the pipeline right now?",
        },
        {
          id: "kasia:pipeline:opt-2",
          topicId: "kasia:pipeline",
          text: "What happens to candidates who almost made it?",
        },
        {
          id: "kasia:pipeline:opt-3",
          topicId: "kasia:pipeline",
          text: "The 'future network' folder — how big?",
        },
        {
          id: "kasia:pipeline:opt-4",
          topicId: "kasia:pipeline",
          text: "Przemek keeps referring his gym acquaintances.",
        },
        {
          id: "kasia:pipeline:opt-5",
          topicId: "kasia:pipeline",
          text: "Is a talent pool just a nice word for waiting list?",
        },
        {
          id: "kasia:pipeline:opt-6",
          topicId: "kasia:pipeline",
          text: "Who is the best candidate you never hired?",
        },
      ],
      replyCandidates: [
        {
          id: "kasia:pipeline:rep-1",
          text: "Two hundred and thirty humans in various states of warmth. Forty are active, sixty are warming, a hundred are ambient, and thirty are the haunted folder, which I maintain for reasons that are half archive and half superstition. The pipeline is not a funnel, it is a WEATHER SYSTEM — fronts move, pressure changes, and every so often someone from the ambient layer becomes…",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:pipeline:rep-2",
          text: "The almosts go into a folder I review every quarter, and it is the most emotionally complicated spreadsheet I own. Talent that arrived early, timing that arrived late. Two of the almosts are now clients, one is a supplier, and one is the best interviewer I have, on a day rate, because the almost worked both ways. Rejection is not a door closing. In my hands it is a redirect.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:pipeline:rep-3",
          text: "Six hundred and forty, and it is the only folder in this company that appreciates without maintenance — one birthday message a year, automated, and the folder compounds like interest with feelings. Two hires this year came from messages sent three years ago. The future network is a pension plan for the industry. I am the fund manager and the fees are friendships.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:pipeline:rep-4",
          text: "He has referred eleven gym acquaintances and, and this is the uncomfortable part, THREE were excellent. The gym is apparently a screening process — anyone who shows up at six am without a payroll forcing them has the exact trait we cannot interview for. His conversion rate is better than the job boards. I have stopped questioning the pipeline sources. The pipeline…",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:pipeline:rep-5",
          text: "A waiting list is passive and a pool is CURATED — the difference between a pond and an aquarium. In the pool everyone has a temperature, a note, and a next touch date; the waiting list is just people being patient near a door. Companies that keep waiting lists lose them silently. Companies that keep pools get accused of poaching, which is what happens when you…",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:pipeline:rep-6",
          text: "A trainer in 2019 who asked better questions than the interview, because she had already run the training in her head on the way over. We could not afford her then, and the role she deserved did not exist yet, so I invented it four years too late and she had moved to Berlin. Her questions are still in my notes. I interview everyone against them. The best candidate I…",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "kasia:wellness",
      label: "The wellness program",
      optionCandidates: [
        { id: "kasia:wellness:opt-1", topicId: "kasia:wellness", text: "HR sent a wellness newsletter. Is this mandatory?" },
        { id: "kasia:wellness:opt-2", topicId: "kasia:wellness", text: "The wellness webinar is at lunch. Analysis?" },
        { id: "kasia:wellness:opt-3", topicId: "kasia:wellness", text: "A meditation app subscription was proposed." },
        { id: "kasia:wellness:opt-4", topicId: "kasia:wellness", text: "Is a step-count competition a good idea?" },
        { id: "kasia:wellness:opt-5", topicId: "kasia:wellness", text: "The wellness budget is one zloty. Confirm?" },
        { id: "kasia:wellness:opt-6", topicId: "kasia:wellness", text: "Can wellness include just... fewer meetings?" },
      ],
      replyCandidates: [
        {
          id: "kasia:wellness:rep-1",
          text: "Mandatory wellness is an oxymoron I refuse to administer. The newsletter is an offering, like bread at a restaurant. Read it or do not — the only tracked metric is whether I exist, and I do. Everything else is yours. That is the entire policy, in one breath.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:wellness:rep-2",
          text: "Lunch is the one hour the calendar cannot colonize, so scheduling wellness AT lunch is self-defeating, and I have said so in three lines of excellent prose. The webinar will run to four attendees and a plant. I will count. The plant will not be counted.",
          relationshipHint: "annoyed",
          tags: ["period:lunch"],
        },
        {
          id: "kasia:wellness:rep-3",
          text: "Proposed, costed, and denied — the app wanted per-seat pricing and Grazyna wanted outcomes. I brokered a compromise: one shared account, rotating, which is either generous or hilarious depending on your relationship with booking calendars. It has one five-star review. Mine.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:wellness:rep-4",
          text: "Terrible, and I can prove it with data from the one we ran: participation was forty percent, shaming was one hundred percent, and the winner was Marek, who walks as a lifestyle and made everyone else feel like furniture. Wellness that ranks is a performance review with sneakers.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:wellness:rep-5",
          text: "The wellness budget is one zloty and it is SYMBOLIC — I fought for its existence so the line item exists to be grown. Budgets are arguments that survived paperwork. That zloty has rolled over four years running. It is the most consistent investment this company has ever made.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:wellness:rep-6",
          text: "That is the one intervention with actual evidence behind it, and I put it in the deck: replace two recurring meetings with nothing and measure everyone's mood in a month. Maciek approved it as 'async wellness'. The meetings died. The mood went up. Nobody credits HR. Fine.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "kasia:confidentiality",
      label: "HR confidentiality",
      optionCandidates: [
        { id: "kasia:confidentiality:opt-1", topicId: "kasia:confidentiality", text: "Is what I tell HR actually confidential?" },
        { id: "kasia:confidentiality:opt-2", topicId: "kasia:confidentiality", text: "Gossip says you know everyone's salary. Confirm?" },
        { id: "kasia:confidentiality:opt-3", topicId: "kasia:confidentiality", text: "Someone reported the kitchen. Anonymously. Cowardly?" },
        { id: "kasia:confidentiality:opt-4", topicId: "kasia:confidentiality", text: "If I disclose a conflict, what happens next?" },
        { id: "kasia:confidentiality:opt-5", topicId: "kasia:confidentiality", text: "What can HR never unsee?" },
        { id: "kasia:confidentiality:opt-6", topicId: "kasia:confidentiality", text: "Klaudia offered me confidentiality. In writing." },
      ],
      replyCandidates: [
        {
          id: "kasia:confidentiality:rep-1",
          text: "Confidential with a scope: what you tell me stays with me unless it involves safety, law, or a decision that cannot be made without it. That is not a loophole, it is the job. I hold eleven years of other people's Tuesdays. The folder is fireproof. So is the discretion.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:confidentiality:rep-2",
          text: "I know the bands, the exceptions, and the arithmetic — knowing salaries is the job, the way a doctor knows rashes. Sharing them is a firing offense I have never committed and never will. Test it with your most embarrassing disclosure. The archive holds worse.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:confidentiality:rep-3",
          text: "Anonymous reports are a pressure valve, and pressure valves are ugly and necessary. The kitchen report led to the fridge audit that found the yoghurt, which is now senior to us all. Cowardly? Sometimes. Useful? The fridge says yes. I take the system over the sentiment.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:confidentiality:rep-4",
          text: "Then I map it, quietly: who is affected, what the policy says, and what you actually want. Most conflicts want a conversation, not a committee. I will offer you a script, a room, and a deadline. What I will not offer is a memo. Conflicts handled loudly multiply.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:confidentiality:rep-5",
          text: "The gap between what people say in surveys and what they say at the coffee machine — I hold both datasets, and the distance between them is the actual culture. Every office has one. Ours is three centimeters on a good day. Genuinely good. It will never appear in a deck.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:confidentiality:rep-6",
          text: "Then she learned it from watching me, which is the highest compliment an influencer can pay. Klaudia's NDA covers vibes and hashtags. Mine covers humans. Keep hers for the brand, mine for the person, and never confuse which folder a sentence belongs in. That is the whole skill.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "kasia:probation",
      label: "Probation periods",
      optionCandidates: [
        { id: "kasia:probation:opt-1", topicId: "kasia:probation", text: "My probation ends Friday. What actually happens?" },
        { id: "kasia:probation:opt-2", topicId: "kasia:probation", text: "Can someone actually fail probation here?" },
        { id: "kasia:probation:opt-3", topicId: "kasia:probation", text: "Three months feels long for both sides. Agree?" },
        { id: "kasia:probation:opt-4", topicId: "kasia:probation", text: "Who decides the probation verdict, you or the team?" },
        { id: "kasia:probation:opt-5", topicId: "kasia:probation", text: "The probation form asks for 'gut feeling'." },
        { id: "kasia:probation:opt-6", topicId: "kasia:probation", text: "Does passing probation change anything real?" },
      ],
      replyCandidates: [
        {
          id: "kasia:probation:rep-1",
          text: "A form, a conversation, and a decision that was made around Tuesday. Probation endings are ceremonies — the real evaluation happened weekly, in whether you asked better questions in week eight than week one. You did. The form is a receipt for a verdict that already exists.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:probation:rep-2",
          text: "Twice, and both times it was mutual dishonesty — we hoped, they hoped, and nobody said the true sentence early enough. My rule now: the first real conversation happens at week three. Late verdicts are cruel to everyone, including the paperwork, which can tell.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:probation:rep-3",
          text: "Agreed, and the length is legal tradition, not design. Three months is how long it takes a company to admit it was wrong and a person to admit the job is not the ad. If either side cannot tell by month two, more time will not help. I schedule honesty at day sixty.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:probation:rep-4",
          text: "The team decides, I translate, and the manager signs — three signatures for one verdict, which is why bad hires survive nowhere in this building. If those three disagree, I investigate before I file. The disagreement IS the data. Consensus written too fast is fear of the form.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:probation:rep-5",
          text: "That field is the most honest box in the company. Metrics tell me what happened; the gut field tells me whether we want more of it. I have approved candidates with mediocre metrics and a good gut and never regretted it. The reverse, I have regretted. Twice. It is filed.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:probation:rep-6",
          text: "Your sick days become yours, the training budget unlocks, and the 'other duties' clause becomes legally enforceable — cake carrying is now official. Spiritually: the desk gets a plant. Renata issues plants only to permanents. That is the real ceremony. The form is the permit.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:afternoon"],
        },
      ],
    },
    {
      id: "kasia:contracts",
      label: "Contract types",
      optionCandidates: [
        { id: "kasia:contracts:opt-1", topicId: "kasia:contracts", text: "Why is one desk contracted and another employed?" },
        { id: "kasia:contracts:opt-2", topicId: "kasia:contracts", text: "My contract renewal has a new clause. Read it?" },
        { id: "kasia:contracts:opt-3", topicId: "kasia:contracts", text: "What is a 'letter of intent' actually for?" },
        { id: "kasia:contracts:opt-4", topicId: "kasia:contracts", text: "The contractors bill hourly. We draw salary. Why?" },
        { id: "kasia:contracts:opt-5", topicId: "kasia:contracts", text: "Can a contractor become an employee here?" },
        { id: "kasia:contracts:opt-6", topicId: "kasia:contracts", text: "Grazyna calls contracts 'pre-negotiated exits'. Fair?" },
      ],
      replyCandidates: [
        {
          id: "kasia:contracts:rep-1",
          text: "Law, history, and the price of flexibility. Employment is a relationship; contracts are a transaction, and this office needs one of each per desk-shaped problem. The mix is deliberate — employees hold the culture, contractors hold the peaks. Kasia's taxonomy. Quote it freely.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:contracts:rep-2",
          text: "Read it, then read it to me — clauses breed in renewal season, and one of them once granted 'perpetual desk rights' to a contractor who treated the office as a registered address. I check every renewal against the incident archive. Bring the clause. I bring the history.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:contracts:rep-3",
          text: "It is a promise wearing a suit — non-binding, useful for calendar-blocking a hire who is choosing between us and a bigger logo. I issue them when I believe the person and doubt the timing. They expire like milk. Everyone signs them. Nobody enforces them. Ritual, with a fax machine.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:contracts:rep-4",
          text: "Because risk is priced. The contractor prices their own unemployment; the salary absorbs it. An hourly contractor at peak billing can out-earn a salaried senior, and the salaried one sleeps in August. Neither is better. They are different animals for different weather.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:contracts:rep-5",
          text: "It has happened twice, both times after a winter of the contractor being functionally staff. My trigger is informal: when I catch myself writing their name into the org chart, the conversation starts. Paper follows reality here. It is the only place the paperwork is ever honest.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:contracts:rep-6",
          text: "Grim, accurate, and the most useful definition in her ledger. A contract is an ending agreed in advance, which is why endings here are so boring — the drama was prepaid. Employees get stories. Contractors get terms. I keep both calm and Grazyna keeps both cheap. The system works.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "kasia:handbook",
      label: "The employee handbook",
      optionCandidates: [
        { id: "kasia:handbook:opt-1", topicId: "kasia:handbook", text: "Does anyone actually read the handbook?" },
        { id: "kasia:handbook:opt-2", topicId: "kasia:handbook", text: "The handbook has a section on gift crocodiles?" },
        { id: "kasia:handbook:opt-3", topicId: "kasia:handbook", text: "Which policy would you delete from the handbook?" },
        { id: "kasia:handbook:opt-4", topicId: "kasia:handbook", text: "The handbook's tone changes in chapter nine. Notice?" },
        { id: "kasia:handbook:opt-5", topicId: "kasia:handbook", text: "Can the handbook win an argument with Maciek?" },
        { id: "kasia:handbook:opt-6", topicId: "kasia:handbook", text: "Who updates the handbook, and how often, really?" },
      ],
      replyCandidates: [
        {
          id: "kasia:handbook:rep-1",
          text: "Cover to cover: nobody. As an oracle: everyone, once something breaks. The handbook is read the way insurance is read — after the flood, at the exact page. I maintain it for the day it is needed, and the day always comes, usually involving the printer or a heart.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:handbook:rep-2",
          text: "It does — 'no live animals as gifts between employees' — because of the 2021 aquarium incident, where a client gifted us a crocodile figurine, life-sized, and legal had opinions. The figurine is in the storage room. The policy is in the handbook. Burek remains unbothered by both.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:handbook:rep-3",
          text: "The dress code page. Four paragraphs describing what everyone already does, enforced by nobody, violated weekly, consulted never. I keep it because deleting it requires a committee, and the committee would write six pages to replace four. Bureaucracy conserves itself.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:handbook:rep-4",
          text: "I wrote chapters one through eight and chapter nine onward arrived from a consultant with a thesaurus. 'Utilize' appears eleven times. Every year I translate one chapter back into human. Two remain. The handbook is being restored at a sustainable pace. Progress is a spectrum.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:handbook:rep-5",
          text: "Once. The return-to-office debate of 2022 ended when I placed the handbook, open, at the phrase 'outcomes over presence', and let the silence work. Maciek read it, said 'fine, outcomes', and left. The handbook's power is archival. You do not argue with it. You display it.",
          relationshipHint: "delighted",
          tags: ["quest:ceo-met"],
        },
        {
          id: "kasia:handbook:rep-6",
          text: "Me, annually, and after every incident worth a policy. The changelog is the real history of this company: each date is something that happened once and must never happen twice. Read the changelog instead of the handbook. It is shorter, funnier, and entirely true.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "kasia:vacation",
      label: "Vacation policy",
      optionCandidates: [
        { id: "kasia:vacation:opt-1", topicId: "kasia:vacation", text: "Nobody books August. Is vacation competitive here?" },
        { id: "kasia:vacation:opt-2", topicId: "kasia:vacation", text: "I have forty days saved. Is that a cry for help?" },
        { id: "kasia:vacation:opt-3", topicId: "kasia:vacation", text: "Kasia, when did YOU last take two weeks off?" },
        { id: "kasia:vacation:opt-4", topicId: "kasia:vacation", text: "Can I take a vacation without the guilt attachment?" },
        { id: "kasia:vacation:opt-5", topicId: "kasia:vacation", text: "The out-of-office replies here are literature." },
        { id: "kasia:vacation:opt-6", topicId: "kasia:vacation", text: "What happens to unclaimed vacation days?" },
      ],
      replyCandidates: [
        {
          id: "kasia:vacation:rep-1",
          text: "It inverts — summer is the quietest quarter and the bravest bookers get the calmest office. Vacation feels competitive because calendars are visible and courage is not. I watch booking patterns the way Grazyna watches invoices: the gaps are the actual data.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:vacation:rep-2",
          text: "Yes, and I send the same letter to everyone over thirty: unused vacation is a loan you made to the company at zero percent interest, and we are not a bank. Book the Tuesdays. Banks of days rot. I have archived enough December regrets to know.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:vacation:rep-3",
          text: "October, two weeks, a cabin with one bar of signal, and I checked nothing — my firewall is documented policy, I cannot exempt myself. I came back to zero fires because Renata ran the floor and the census survived without its census-taker. That is what a system is.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:morning"],
        },
        {
          id: "kasia:vacation:rep-4",
          text: "The guilt is not in the policy, it is in the culture, and cultures change from the top of the booking sheet. When the seniors vanish loudly and return tan, permission propagates. I schedule my own vacations like infrastructure maintenance. Leaders may steal the format.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:vacation:rep-5",
          text: "They are. Tomek's 'I am unreachable and the code knows why' is framed in my office. The out-of-office is the one place this company writes truthfully — no buzzword survives the autoresponder. Mine says 'back Monday, delete this'. The delete rate is one hundred percent.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:vacation:rep-6",
          text: "They expire, which is the most quietly violent sentence in any policy. I fight it yearly: carryover of one week, cash-out below grade, anything but the void. The void teaches people that rest is a trap. Grazyna calls carryover 'liability'. I call the void 'turnover'. We compromise in writing.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "kasia:presenteeism",
      label: "Presenteeism",
      optionCandidates: [
        { id: "kasia:presenteeism:opt-1", topicId: "kasia:presenteeism", text: "Tomek worked through a fever. Hero or biohazard?" },
        { id: "kasia:presenteeism:opt-2", topicId: "kasia:presenteeism", text: "Is coming in sick ever the right call?" },
        { id: "kasia:presenteeism:opt-3", topicId: "kasia:presenteeism", text: "We award attendance quietly. What does that teach?" },
        { id: "kasia:presenteeism:opt-4", topicId: "kasia:presenteeism", text: "I answered emails from a hospital queue. Normal?" },
        { id: "kasia:presenteeism:opt-5", topicId: "kasia:presenteeism", text: "How do I unlearn working while ill?" },
        { id: "kasia:presenteeism:opt-6", topicId: "kasia:presenteeism", text: "Does anyone here actually use their sick days?" },
      ],
      replyCandidates: [
        {
          id: "kasia:presenteeism:rep-1",
          text: "Biohazard, affectionately. Tomek at a fever ships code with a cough track. The heroic narrative is a leftover from factories where presence equaled output — our output is judgment, and judgment has a temperature coefficient. I sent him home with a form and a soup.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:presenteeism:rep-2",
          text: "Only for the kind of crisis where a body at a desk matters, which in this office is never. Everything here is remote-capable, which means presenteeism is not dedication, it is a typo. Contagious means camera off. Fever means laptop closed. Heroism means REST.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:presenteeism:rep-3",
          text: "That attendance is loyalty, which breeds the wrong immune system — people start attending to be seen, not to work. I killed the quiet award in 2023. It now exists as a certificate in the storage room, awarded to a chair. Nobody noticed. Healthiest metric we ever produced.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:presenteeism:rep-4",
          text: "Normal, common, and the exact behavior I exist to phase out. A person in a hospital queue answering email is two half-jobs and zero rest. I would rather lose your Tuesday entirely than rent a fraction of you. Half-presence is the most expensive thing nobody invoices.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:presenteeism:rep-5",
          text: "With a script: 'I am out today, back tomorrow, nothing is on fire' — then CLOSE the laptop like Tomek closes tabs at five. The first sick day is the hardest, the third is a habit. I have watched four people unlearn it. All four were promoted within a year. Coincidence is for surveys.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:presenteeism:rep-6",
          text: "Statistically yes — twelve days average, up from four in 2022, which I count as this office's greatest cultural achievement and nobody will ever put on a slide. People got sicker faster and recovered slower. That is what health looks like in a dashboard. It is beautiful.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "kasia:referral-bonus",
      label: "The referral bonus",
      optionCandidates: [
        { id: "kasia:referral-bonus:opt-1", topicId: "kasia:referral-bonus", text: "Is the referral bonus real money or lore?" },
        { id: "kasia:referral-bonus:opt-2", topicId: "kasia:referral-bonus", text: "I referred someone who got hired. Where is my money?" },
        { id: "kasia:referral-bonus:opt-3", topicId: "kasia:referral-bonus", text: "Can I refer my roommate? Total conflict of interest." },
        { id: "kasia:referral-bonus:opt-4", topicId: "kasia:referral-bonus", text: "The bonus is paid after six months. Why so slow?" },
        { id: "kasia:referral-bonus:opt-5", topicId: "kasia:referral-bonus", text: "Przemek wants commission on referrals. Response?" },
        { id: "kasia:referral-bonus:opt-6", topicId: "kasia:referral-bonus", text: "What is the best referral this office ever had?" },
      ],
      replyCandidates: [
        {
          id: "kasia:referral-bonus:rep-1",
          text: "Real, budgeted, and paid through payroll like an adult. The lore version is funnier — 'a bonus paid in coffee beans and Kasia's approval' — but the truth is zloty, taxed, and attached to a form. Lore spreads faster than payroll. I have made peace with being the boring version.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:referral-bonus:rep-2",
          text: "In the payroll after their month three — the bonus waits for mutual survival, because half of referrals fail by coffee-machine standards, not probation standards. You vouched; the company verifies. Then decide together who tells the story at the Christmas party.",
          relationshipHint: "pleased",
          tags: ["quest:kasia-referral-open", "relationship:neutral"],
        },
        {
          id: "kasia:referral-bonus:rep-3",
          text: "Refer them, disclose them, and let the process do its job — nepotism is not hiring your roommate, it is skipping the interview. Disclosed conflicts are my favorite referrals: everyone over-performs to disprove the suspicion. The roommate tax is one extra form. Cheap.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:referral-bonus:rep-4",
          text: "Because referrals that survive probation are worth ten that dazzle for a month, and the delay filters sunk-cost enthusiasm. Six months is one season of Tuesdays. If the hire is still good and you are still proud, the money arrives warm. If not, nobody fakes a smile at payroll.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:referral-bonus:rep-5",
          text: "Denied, with a form. Referrals are favors with accountability, not sales — the moment a bonus becomes commission, people refer resumes instead of people. Przemek's gym pipeline works BECAUSE it is unpaid loyalty. I would pay him in protein bars before I let him invoice friendship.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:referral-bonus:rep-6",
          text: "Pawel, referred by his neighbor, who described him as 'keeps a notebook, apologizes to servers'. Two sentences, zero buzzwords, one perfect hire. The best referrals read like witness statements. I keep that email pinned above the desk. It is the standard every ad should fail against.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "kasia:training-budget",
      label: "The training budget",
      optionCandidates: [
        { id: "kasia:training-budget:opt-1", topicId: "kasia:training-budget", text: "Is there a training budget or is that a myth?" },
        { id: "kasia:training-budget:opt-2", topicId: "kasia:training-budget", text: "The course I want costs more than the budget." },
        { id: "kasia:training-budget:opt-3", topicId: "kasia:training-budget", text: "Do certifications get reimbursed here? Which ones?" },
        { id: "kasia:training-budget:opt-4", topicId: "kasia:training-budget", text: "Can training time count as work time?" },
        { id: "kasia:training-budget:opt-5", topicId: "kasia:training-budget", text: "The budget favors cloud courses. Why?" },
        { id: "kasia:training-budget:opt-6", topicId: "kasia:training-budget", text: "What training would you take with someone else's money?" },
      ],
      replyCandidates: [
        {
          id: "kasia:training-budget:rep-1",
          text: "Real, annual, and underspent — the myth is not the budget but the approval process, which people imagine is harder than asking me. Last year we spent sixty percent and returned the rest, and Grazyna nearly cancelled it as evidence of lacking ambition. Spend it. Underspending kills benefits.",
          relationshipHint: "neutral",
          tags: ["stats:high-credibility"],
        },
        {
          id: "kasia:training-budget:rep-2",
          text: "Then split it: the budget, the project, and one persuasive paragraph about what the gap costs per month. I have approved over-budget courses twice — both written like business cases, both true. The form asks what you will DO. Nobody funds 'growth'. Everyone funds a deadline.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:training-budget:rep-3",
          text: "The ones with exams, dates, and a skill this office will use within a quarter. The cloud cert passed. The blockchain one is still pending in someone's drawer, and its holder now says 'decentralized' at parties. Reimbursement follows relevance. The drawer knows.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:training-budget:rep-4",
          text: "Yes, and I defend that policy against people who call it 'double paying'. Learning ON the clock produces work I can see; learning at home produces burnout I also see, at three am, in my inbox. Thirty minutes of course time daily, logged like a meeting. The policy survives.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:training-budget:rep-5",
          text: "Because the cloud is the only vendor whose bill arrives with a story, and Marek demanded staff who could read it. Demand creates budget. If this office ever loses a client to a bad slide deck, watch presentation courses fund themselves by Friday. Pain writes budgets. That is the rule.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:training-budget:rep-6",
          text: "A negotiation course, for me, at an advanced level — I broker salaries and conflicts daily and I have never once been trained at it. HR is assumed to come pre-installed. It does not. Give me the budget you give Marek's monitoring tools and I will return you a calmer building.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "kasia:comms-tone",
      label: "The office comms tone",
      optionCandidates: [
        { id: "kasia:comms-tone:opt-1", topicId: "kasia:comms-tone", text: "The team channel turned passive-aggressive. Fix?" },
        { id: "kasia:comms-tone:opt-2", topicId: "kasia:comms-tone", text: "Is 'per my last message' banned or legal here?" },
        { id: "kasia:comms-tone:opt-3", topicId: "kasia:comms-tone", text: "Can I use emojis in client emails?" },
        { id: "kasia:comms-tone:opt-4", topicId: "kasia:comms-tone", text: "Someone sent a voice note to the whole channel." },
        { id: "kasia:comms-tone:opt-5", topicId: "kasia:comms-tone", text: "What is the office rule on ALL CAPS?" },
        { id: "kasia:comms-tone:opt-6", topicId: "kasia:comms-tone", text: "Klaudia writes emails like captions. Problem?" },
      ],
      replyCandidates: [
        {
          id: "kasia:comms-tone:rep-1",
          text: "Passive-aggressive is unspoken feedback with extra steps, so the fix is making feedback speakable. I run a one-hour 'say the thing' session quarterly and the channel self-corrects for six weeks. Culture decays at a known rate. Maintenance is scheduled, not miraculous.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:comms-tone:rep-2",
          text: "Legal but radioactive. It translates to 'I am keeping receipts' and everyone can smell the filing cabinet. The house style I coach: restate the ask, add the deadline, drop the archaeology. 'Per my last message' is a trophy — winning it means the thread already failed.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:comms-tone:rep-3",
          text: "One per email, and it must be doing work — a thumbs up is punctuation, a fireworks display is a mood. The client who reads us weekly has learned our dialect: one rocket means 'shipped', two means 'Marek shipped'. Emojis are vocabulary. Fluency is knowing the count.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:comms-tone:rep-4",
          text: "Then we had the conversation about async manners, and the rule wrote itself: voice notes for tone, text for facts, and never the whole channel before coffee. The offender now sends lovely texts. People are navigable. That is the HR thesis nobody believes until they try it.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:comms-tone:rep-5",
          text: "ALL CAPS is reserved for incidents involving prod, the printer, or free cake — a grammar everyone learned by example rather than memo. Caps are our emergency broadcast system. When Tomek types in caps, laptops close. The day caps stop working, we will have bigger problems than typography.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:comms-tone:rep-6",
          text: "Only in length. Klaudia's subject lines could sell a fridge to ice, and the bodies are four words long, but her open rate is perfect and her thread answers arrive in minutes. I fixed one thing only: client emails get a signature block. Even influencers need jurisdictions.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "kasia:diversity",
      label: "The diversity slide",
      optionCandidates: [
        { id: "kasia:diversity:opt-1", topicId: "kasia:diversity", text: "The diversity slide is one chart. Impress me." },
        { id: "kasia:diversity:opt-2", topicId: "kasia:diversity", text: "Are our job ads reaching beyond the usual suspects?" },
        { id: "kasia:diversity:opt-3", topicId: "kasia:diversity", text: "What does an inclusive interview actually change?" },
        { id: "kasia:diversity:opt-4", topicId: "kasia:diversity", text: "Maciek wants a diversity quota. Careful response?" },
        { id: "kasia:diversity:opt-5", topicId: "kasia:diversity", text: "Is Burek part of the inclusion policy?" },
        { id: "kasia:diversity:opt-6", topicId: "kasia:diversity", text: "The office is more diverse than the org chart. Why?" },
      ],
      replyCandidates: [
        {
          id: "kasia:diversity:rep-1",
          text: "Then read the footnote: the chart is headcount and the footnote is retention — who stays is the honest number, because hiring diverse is one campaign and keeping diverse is a culture. Our retention gap narrowed two points last year. Two points is a career of Tuesdays. Quietly proud.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:diversity:rep-2",
          text: "Partly. The band transparency helped more than any campaign — ranges pull in people who were filtering themselves out at the salary step. Inclusion is often just arithmetic made visible. The next lever is the interview loop, which is why I train the panelists twice a year.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:diversity:rep-3",
          text: "The questions. A structured loop asks everyone the same things in the same order, which converts charisma into evidence and gives the nervous candidate a floor. Unstructured interviews measure similarity. Structured ones measure ability. I have the before-and-after data. Not subtle.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:diversity:rep-4",
          text: "I told him: quotas without process are targets with no engine, and the engine is where the work lives — sourcing, structured loops, salary bands, retention metrics. He wrote 'engine' on a slide and took credit. The work survived the theft. That is how you let a CEO be useful.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:diversity:rep-5",
          text: "Burek is the INCLUSION policy — the audit found that offices with a dog report conversations across hierarchies that org charts otherwise prevent. He sits with the intern, the CFO, and the CEO in one afternoon without once reading a title. The paw print on the policy is a joke. It is also correct.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:diversity:rep-6",
          text: "Because the org chart counts titles and the office counts Tuesdays — look at who people actually ask: Renata for the building, Janusz for the truth, Burek for the mood. Influence here is earned in conversations, not granted in meetings. The chart is the map. The office is the territory.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "kasia:hot-desking",
      label: "The desk allocation",
      optionCandidates: [
        { id: "kasia:hot-desking:opt-1", topicId: "kasia:hot-desking", text: "Hot-desking was announced. Survivable?" },
        { id: "kasia:hot-desking:opt-2", topicId: "kasia:hot-desking", text: "The window desks have an informal waiting list." },
        { id: "kasia:hot-desking:opt-3", topicId: "kasia:hot-desking", text: "Marek refuses to hot-desk. Enforcement?" },
        { id: "kasia:hot-desking:opt-4", topicId: "kasia:hot-desking", text: "My desk has someone else's sticky notes. Ethics?" },
        { id: "kasia:hot-desking:opt-5", topicId: "kasia:hot-desking", text: "Who actually assigns desks in this office?" },
        { id: "kasia:hot-desking:opt-6", topicId: "kasia:hot-desking", text: "Can I book the meeting room desk as my office?" },
      ],
      replyCandidates: [
        {
          id: "kasia:hot-desking:rep-1",
          text: "Survivable, and honestly overdue — the desk map was drawn in 2019 for a company that no longer exists, and the map has outlived three reorgs and one flood. My compromise, already in policy: teams cluster, walls are sacred, and Burek's spot is permanent because some infrastructure is not mobile.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:hot-desking:rep-2",
          text: "There is, and it predates the spreadsheet — window seats trade on seniority, light preference, and one legendary dispute involving Klaudia's ring light. I refuse to formalize it. Some markets must stay informal to stay peaceful. The list self-corrects every rebrand.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:hot-desking:rep-3",
          text: "You cannot enforce a desk on Marek. He has a cable ecosystem, a chair from home, and a monitoring rig that would take a day to transplant. The policy has an exception clause and the clause is named Marek. Every office rule has one. Mine is that I never write them down.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:hot-desking:rep-4",
          text: "Read them. Then archive them respectfully — sticky notes are the emails of the previous tenant, and last month someone found 'password is the printer's birthday', which took us an hour and one espresso to undo. Desk archaeology is real. Report the password-grade finds. Keep the jokes.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:hot-desking:rep-5",
          text: "Officially me, actually the building — Renata knows who needs quiet, Janusz knows which desks flood in April, and the map they maintain is better than my spreadsheet. I sign what they draft. Desks are allocated by people who watch the office exist. I just notarize.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:hot-desking:rep-6",
          text: "As a day base, yes — book it, note it on the board, and leave it emptier than you found it. As a siege, no: the meeting room desk was claimed for six weeks in 2022 and we found a civilization — mugs, a blanket, a tiny flag. The flag was returned to Przemek with ceremony. The mugs stayed.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "kasia:burek-hr",
      label: "Burek's HR file",
      optionCandidates: [
        { id: "kasia:burek-hr:opt-1", topicId: "kasia:burek-hr", text: "Does Burek have a contract or just a folder?" },
        { id: "kasia:burek-hr:opt-2", topicId: "kasia:burek-hr", text: "Who is Burek's emergency contact?" },
        { id: "kasia:burek-hr:opt-3", topicId: "kasia:burek-hr", text: "Burek missed two standups. Formal warning?" },
        { id: "kasia:burek-hr:opt-4", topicId: "kasia:burek-hr", text: "Can Burek's role survive an HR audit?" },
        { id: "kasia:burek-hr:opt-5", topicId: "kasia:burek-hr", text: "What is in the drawer marked BUREK?" },
        { id: "kasia:burek-hr:opt-6", topicId: "kasia:burek-hr", text: "If Burek retired, what is the offboarding plan?" },
      ],
      replyCandidates: [
        {
          id: "kasia:burek-hr:rep-1",
          text: "A folder, a schedule, and a title — Chief Audit Officer, unpaid, unfireable, and unhireable elsewhere. The contract question reaches legal twice a year and legal responds with the same sentence: 'the dog is a presence, not a resource'. It has survived two audits. I have it framed.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:burek-hr:rep-2",
          text: "Renata, then Janusz, then me — a chain of care with three links and zero gaps. The emergency contact form lists steak preferences, the vet, and the phrase 'do not let Przemek forecast at him'. It is the most complete file I maintain. Some humans could learn from its completeness.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:burek-hr:rep-3",
          text: "The missed standups were a Monday in June and a Thursday in September, both weather, both excused by Janusz with photographic evidence of rain. Burek's attendance record is better than most and his excuses are better than ours. No warning. A note in the file: 'good year'.",
          relationshipHint: "annoyed",
          tags: ["quest:burek-standup-observed", "relationship:neutral"],
        },
        {
          id: "kasia:burek-hr:rep-4",
          text: "It has — twice. The auditor asked for his role description and I produced one: morale infrastructure, unregistered stakeholder, audit functions performed voluntarily. She wrote 'non-standard but coherent' in the margin, which is the highest praise an auditor has ever issued this office.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:burek-hr:rep-5",
          text: "A vaccination record, a photo from 2019, a cast of the paw print used for the team calendar legend, and one complaint form against the vacuum, filed by Burek and countersigned by Janusz. The form was denied. The complaint was noted. The vacuum is watched.",
          relationshipHint: "neutral",
          tags: ["quest:burek-standup-observed", "relationship:warm"],
        },
        {
          id: "kasia:burek-hr:rep-6",
          text: "There is one, drafted with Renata over tea and seen by nobody else — the paw print retires, the title goes emeritus, and the standup gains one minute of silence, which will be the only minute that office has ever kept quiet voluntarily. I update the plan yearly. I hope to never use it. Both are the job.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "kasia:benefits",
      label: "The benefits sheet",
      optionCandidates: [
        { id: "kasia:benefits:opt-1", topicId: "kasia:benefits", text: "What benefits do we actually have?" },
        { id: "kasia:benefits:opt-2", topicId: "kasia:benefits", text: "The gym discount is at a gym nobody goes to." },
        { id: "kasia:benefits:opt-3", topicId: "kasia:benefits", text: "Is the massage perk real or a rumor?" },
        { id: "kasia:benefits:opt-4", topicId: "kasia:benefits", text: "Can I trade a benefit day for money?" },
        { id: "kasia:benefits:opt-5", topicId: "kasia:benefits", text: "The benefits sheet is four pages long." },
        { id: "kasia:benefits:opt-6", topicId: "kasia:benefits", text: "Which benefit do people actually use?" },
      ],
      replyCandidates: [
        {
          id: "kasia:benefits:rep-1",
          text: "The benefits sheet, the benefits reality, and the space between them — that space is where I live professionally. On paper: gym, massage, duvet day, fruit Thursday, a learning budget with a very specific form. In reality: fruit Thursday, undefeated, attended by everyone including people who claim to hate bananas.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:benefits:rep-2",
          text: "It is twelve minutes away and OPEN TWENTY-FOUR SEVEN, which I say the way the brochure says it. We negotiated that gym in 2021 when the alternative was nothing. The discount is thirty percent. Attendance is two people, one of whom is me, twice, in October, both times by accident.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:benefits:rep-3",
          text: "Real, quarterly, and booked through a form that asks your preferred pressure with a dropdown. The massage chair situation of 2022 is why we have the dropdown. There was an INCIDENT. The word 'incident' is doing heavy lifting there, but the form has prevented a sequel, which is HR in one sentence.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:benefits:rep-4",
          text: "You cannot, and people ask monthly, always in a hush, like a heist. Benefits are not wages, they are a different currency — one that cannot be saved, only spent on wellbeing, which is the whole point and the whole annoyance. Grazyna and I have a standing agreement to both say no together. It is our friendship's spine.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:benefits:rep-5",
          text: "Four pages, and I know all four by heart, which is my party trick and my burden. Page three is the graveyard: benefits we negotiate every year and never use, listed with dignity. The duvet day is on page one. The duvet day has NEVER been used by anyone. Its existence is the purest form of hope in this company.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:benefits:rep-6",
          text: "Fruit Thursday, then the learning budget, then — and this surprises everyone — the coffee. We tallied it once: the coffee subsidy is our third largest benefit and nobody has ever thanked it. I mentioned that in a all-hands. Nobody thanked it then either. I have made peace with coffee's humility.",
          relationshipHint: "neutral",
          tags: ["period:morning"],
        },
      ],
    },
    {
      id: "kasia:sick-notes",
      label: "The sick note process",
      optionCandidates: [
        { id: "kasia:sick-notes:opt-1", topicId: "kasia:sick-notes", text: "Do I really need a note for one sick day?" },
        { id: "kasia:sick-notes:opt-2", topicId: "kasia:sick-notes", text: "The sick note form asks for a diagnosis." },
        { id: "kasia:sick-notes:opt-3", topicId: "kasia:sick-notes", text: "Someone sent a sick note photo from a beach." },
        { id: "kasia:sick-notes:opt-4", topicId: "kasia:sick-notes", text: "How do I call in sick without sounding guilty?" },
        { id: "kasia:sick-notes:opt-5", topicId: "kasia:sick-notes", text: "Burek ate whose sick note this time?" },
        { id: "kasia:sick-notes:opt-6", topicId: "kasia:sick-notes", text: "Why does the sick folder smell of mint?" },
      ],
      replyCandidates: [
        {
          id: "kasia:sick-notes:rep-1",
          text: "Legally yes, spiritually no — bring it whenever, I file it whenever, and the system does not judge. The system is a folder. The JUDGING is also a folder, mine, and it is empty for you because you called before ten, which puts you in the top decile of sick reporters. There is a decile system. Of course there is.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:sick-notes:rep-2",
          text: "The form says 'reason' but 'reason' means 'the word the doctor used', not your life story. Write what the doctor wrote. I once received a form with a full symptom diary and a temperature chart. Beautiful work. Wrong audience. I am HR, not a hospital. The chart is still in the file, though. It was excellent.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:sick-notes:rep-3",
          text: "The beach photo is my favorite document in the entire archive. The note was real, the doctor was real, and the beach was real — the man was sick, and he recovered somewhere with a sea view, and honestly? That is medicine. I filed it. I did not file the judgment. The judgment stayed in my heart where it belongs.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:sick-notes:rep-4",
          text: "Say the sentence, stop, do not apologize your way into a second sentence. 'I am sick, I will rest, back tomorrow maybe.' Every extra word is a handle someone can pull. HR trains managers not to ask, but people confess at the doorway anyway. The doorway confession is an art form and you should not perform it. Rest. That is the whole policy.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "kasia:sick-notes:rep-5",
          text: "Burek consumed a sick note in 2023 and it remains his only documented case of eating paperwork. I reissued the note, annotated the file 'original eaten by dog', and now the file has a dog-related postscript, which makes it the liveliest document in the cabinet. Burek is the only employee here with a bite mark on the archive.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:sick-notes:rep-6",
          text: "The mint is therapeutic, deliberate, and mine. Sick notes arrive with the energy of a sneeze, so I keep mints at the folder. It is a small kindness for a document genre nobody enjoys. Also the mints cover the smell of the folder, which is a mystery I have chosen not to investigate. Some filing cabinets keep secrets.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "kasia:feedback-forms",
      label: "The feedback form after everything",
      optionCandidates: [
        { id: "kasia:feedback-forms:opt-1", topicId: "kasia:feedback-forms", text: "There is a feedback form for the feedback form?" },
        { id: "kasia:feedback-forms:opt-2", topicId: "kasia:feedback-forms", text: "Why does every event need a feedback form?" },
        { id: "kasia:feedback-forms:opt-3", topicId: "kasia:feedback-forms", text: "Everyone writes 'fine' in the feedback forms." },
        { id: "kasia:feedback-forms:opt-4", topicId: "kasia:feedback-forms", text: "I gave honest feedback once. It escalated." },
        { id: "kasia:feedback-forms:opt-5", topicId: "kasia:feedback-forms", text: "The training feedback asked if I felt 'energized'." },
        { id: "kasia:feedback-forms:opt-6", topicId: "kasia:feedback-forms", text: "Do you read the free-text comments?" },
      ],
      replyCandidates: [
        {
          id: "kasia:feedback-forms:rep-1",
          text: "There is, and its name is the meta-review, and I am aware of the recursion. It runs once a year, it takes ninety seconds, and last year it produced ONE actionable insight: that ninety seconds is ninety seconds too many. I have kept it anyway. Consistency is a value. So is irony, apparently.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:feedback-forms:rep-2",
          text: "Because memory is a liar with a calendar. If we ask on Friday how Tuesday's training felt, Tuesday will have become a rumor of itself. The form is a snapshot before the photo fades. Also — and I say this with love — the forms are how I justify the budget for the next event. Forms fund parties. Fill the forms.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:feedback-forms:rep-3",
          text: "'Fine' is data. A room of fines means acceptable. One 'great' among fines means a fluke. One 'horrible' among fines means a conversation, which I will have gently, with coffee, and no forms present. The scale only sings when someone breaks it. I wait for the breakers.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:feedback-forms:rep-4",
          text: "It did, and I apologize — that was the era before the anonymity upgrade, and your honesty deserved better armor. The comment reached a manager with a highlighter, which is the food chain working exactly wrong. It is fixed now: anonymous means anonymous, and I defend it like the fridge accord. With my whole chest.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:feedback-forms:rep-5",
          text: "The 'energized' scale came from a consultant in 2022 and I have defended it ever since, on the grounds that it is the only question people answer with their WHOLE personality. You have not lived until a grown engineer circles 'completely depleted' in pen. The data is unusable. The culture is priceless.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:feedback-forms:rep-6",
          text: "Every one, with a coffee, on Friday afternoons — it is my favorite part of the week and I will deny that too. The comments are where this company keeps its diary. Someone once wrote 'the cookies tasted like morale'. I have no idea what it means. I have framed it. Some things are not data. They are ARCHIVE.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "kasia:office-grapevine",
      label: "The office grapevine",
      optionCandidates: [
        { id: "kasia:office-grapevine:opt-1", topicId: "kasia:office-grapevine", text: "You always know things first. How?" },
        { id: "kasia:office-grapevine:opt-2", topicId: "kasia:office-grapevine", text: "Is the grapevine ever wrong?" },
        { id: "kasia:office-grapevine:opt-3", topicId: "kasia:office-grapevine", text: "Renata and you run separate intel networks." },
        { id: "kasia:office-grapevine:opt-4", topicId: "kasia:office-grapevine", text: "The grapevine says two people are leaving." },
        { id: "kasia:office-grapevine:opt-5", topicId: "kasia:office-grapevine", text: "I started a rumor as a joke and it is winning." },
        { id: "kasia:office-grapevine:opt-6", topicId: "kasia:office-grapevine", text: "What is the biggest grapevine miss in history?" },
      ],
      replyCandidates: [
        {
          id: "kasia:office-grapevine:rep-1",
          text: "Recruiters hear everything twice — once as small talk and once as a resignation risk. I do not run the grapevine, I merely WATER it. My official position is that I know nothing. My unofficial position is also that I know nothing, delivered in a tone that has kept this office informed for years.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:office-grapevine:rep-2",
          text: "The grapevine is never wrong, only early or exaggerated. The kernel is always true — someone IS interviewing, something IS being renamed. The grapevine is a fire alarm with a personality. I read it the way Marek reads graphs: for the slope, not the number.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:office-grapevine:rep-3",
          text: "Renata is a library and I am a newsroom. She stores what happened; I hear what is ABOUT to. We do not compete, we EXCHANGE, at the coffee machine, in glances that would baffle a cryptographer. Between the two of us, this office has no secrets and perfect coverage. It is a public service and neither of us bills for it.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:office-grapevine:rep-4",
          text: "Then I will tell you exactly what I tell the grapevine: nothing, with a smile that confirms nothing and denies nothing. If it is true, they will resign through me, with paperwork. If it is false, the rumor dies of starvation by Friday. Either way I win and nobody knows the game was played.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "kasia:office-grapevine:rep-5",
          text: "Then you have learned the first law of the grapevine: jokes exit the room faster than facts, wearing the facts' coat. Walk it back GENTLY — 'I was clearly joking' reads as a cover-up, so laugh louder instead. Or let it run. The printer rumor of 2021 started as my joke and now it is basically scripture.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:office-grapevine:rep-6",
          text: "The year the grapevine reported a MERGER and the truth was a new coffee supplier. The office grieved and celebrated simultaneously for a week. When the beans arrived, one person cried. I have never fully repaired my trust in the grapevine since, and I say that as its principal landscaper.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "kasia:working-hours",
      label: "The nine-to-five myth",
      optionCandidates: [
        { id: "kasia:working-hours:opt-1", topicId: "kasia:working-hours", text: "Is anyone here actually nine to five?" },
        { id: "kasia:working-hours:opt-2", topicId: "kasia:working-hours", text: "My contract says eight hours. My calendar laughs." },
        { id: "kasia:working-hours:opt-3", topicId: "kasia:working-hours", text: "Marek arrives at seven. Is he the standard?" },
        { id: "kasia:working-hours:opt-4", topicId: "kasia:working-hours", text: "I answered one email at 22:00. Am I fired?" },
        { id: "kasia:working-hours:opt-5", topicId: "kasia:working-hours", text: "Zosia says timing is a message. Confirm?" },
        { id: "kasia:working-hours:opt-6", topicId: "kasia:working-hours", text: "When is staying late a problem?" },
      ],
      replyCandidates: [
        {
          id: "kasia:working-hours:rep-1",
          text: "The contract says nine to five and the office says 'see you when the coffee does'. Officially the hours are the hours. Unofficially the building runs on a wave: Marek at seven, Tomek til midnight, and Przemek existing in a timezone of his own invention. My job is pretending the wave is a schedule.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:working-hours:rep-2",
          text: "The calendar laughs at all of us, and that is why the contract exists — as a floor, not a ceiling, and definitely as a legal document I can point at when someone's 'quick call' arrives at 18:45. The hours are armor. Wear them loosely, but know where the armor is.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:working-hours:rep-3",
          text: "Marek is not a standard, he is a FORCE of nature with a key. He arrives at seven because the servers are honestest before the people arrive. Nobody is asked to match him. Nobody COULD match him. His hours are a personal weather system and the forecast is always 'deploying'.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:working-hours:rep-4",
          text: "You are not fired, you are a statistic. One 22:00 email is a fluke, a weekly 22:00 email is a pattern, and a pattern is a conversation I will start with your manager, gently, armed with the contract and one raised eyebrow. Reply-to-all at midnight helps no one. The email will still be there at nine. So will we.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:working-hours:rep-5",
          text: "Confirmed — she is right, which annoys both of us equally. A 16:58 announcement is a newsletter; a 09:02 announcement is an incident. The content is the same. The heart rate of the readership is not. I schedule my own sends for ten past ten, when the office is caffeinated and merciful.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:working-hours:rep-6",
          text: "When it is secret, silent, and unpaid — that is when staying late stops being a favor and becomes a leak. Stay late for the demo, sure. Stay late every Thursday for a month without telling anyone why, and I will find you, and we will have the conversation about boundaries with the good biscuits. The GOOD ones. That is how serious I am.",
          relationshipHint: "annoyed",
          tags: ["period:evening", "relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:speak-up",
      label: "The speak-up campaign",
      optionCandidates: [
        { id: "kasia:speak-up:opt-1", topicId: "kasia:speak-up", text: "What is the speak-up campaign exactly?" },
        { id: "kasia:speak-up:opt-2", topicId: "kasia:speak-up", text: "The speak-up poster has Burek on it." },
        { id: "kasia:speak-up:opt-3", topicId: "kasia:speak-up", text: "I reported something small. Was that okay?" },
        { id: "kasia:speak-up:opt-4", topicId: "kasia:speak-up", text: "Nobody believes the speak-up channel is real." },
        { id: "kasia:speak-up:opt-5", topicId: "kasia:speak-up", text: "Someone used speak-up to nominate a pizza topping." },
        { id: "kasia:speak-up:opt-6", topicId: "kasia:speak-up", text: "What happens after someone speaks up?" },
      ],
      replyCandidates: [
        {
          id: "kasia:speak-up:rep-1",
          text: "It is a promise wearing a poster: if something is wrong — a process, a manager, a smell — you can say it to me without it costing you anything. The campaign has a jingle Klaudia recorded. The jingle is a lot. The promise underneath the jingle is iron. Focus on the promise.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:speak-up:rep-2",
          text: "Burek is on it because the test audience — Pawel, honestly — said the poster needed 'a face people already trust'. Burek's trust ratings are the highest in this building and he has never once read the poster. The caption says 'Burek speaks up. You can too.' Marketing does the captions. I do the semantics.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:speak-up:rep-3",
          text: "More than okay — small reports are how big things get caught early, like moles. I logged it, I looked, and if nothing grows from it, the log sits quietly doing its job. The reporting muscle only works if it lifts small weights first. You did cardio for the whole office. Thank you, sincerely.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:speak-up:rep-4",
          text: "Then let me say the boring truth: the channel exists, I read it alone, and last quarter it produced two fixes and one compliment that made my month. The disbelief is the biggest obstacle I have, bigger than any actual problem. Belief arrives one kept promise at a time. I am patient. I have a lanyard and tenure.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:speak-up:rep-5",
          text: "The pizza nomination — pineapple, pro-crust audience — went into the official log because my rule is: the channel answers everything, even nonsense, ESPECIALLY nonsense. I forwarded it to Zosia with the subject 'speak-up works'. The pineapple remains unresolved. Democracy is messy and delicious.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:speak-up:rep-6",
          text: "I listen, I check, and something happens — a conversation, a fix, or an explanation of why not, in writing, within the week. The worst outcome is silence, so silence is the one thing I never allow. Speaking up is a contract: you bring the truth, I bring the paperwork. So far the paperwork is winning.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:reference-checks",
      label: "The reference call voice",
      optionCandidates: [
        { id: "kasia:reference-checks:opt-1", topicId: "kasia:reference-checks", text: "Why do you do reference calls in the stairwell?" },
        { id: "kasia:reference-checks:opt-2", topicId: "kasia:reference-checks", text: "Your reference call voice is a different person." },
        { id: "kasia:reference-checks:opt-3", topicId: "kasia:reference-checks", text: "What do you actually ask in a reference check?" },
        { id: "kasia:reference-checks:opt-4", topicId: "kasia:reference-checks", text: "A reference said 'no comment' for everything." },
        { id: "kasia:reference-checks:opt-5", topicId: "kasia:reference-checks", text: "Do references ever ask about us?" },
        { id: "kasia:reference-checks:opt-6", topicId: "kasia:reference-checks", text: "Someone lied on their CV. Big lie?" },
      ],
      replyCandidates: [
        {
          id: "kasia:reference-checks:rep-1",
          text: "The stairwell is my call booth — one bar of signal, total privacy, and acoustics that flatter the voice. The office hears half of 'would you hire this person again' and imagines drama. The stairwell hears all of it and imagines nothing. Reference work is stairwell work. It is also where I get my steps in. Efficiency.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "kasia:reference-checks:rep-2",
          text: "That is my 'professional warm' voice — twenty percent slower, forty percent friendlier, and calibrated to make a stranger say true things they would not say to their own mirror. Everyone has one. Marek's comes out when he talks to the server room. Przemek's is his default. Mine is booked for calls and weddings.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:reference-checks:rep-3",
          text: "Dates, role, and then the only question that matters: 'would you work with them again?' Everything else is choreography. Pauses tell me more than answers — a two-second pause before 'yes' is a full paragraph. I take notes in a code nobody has cracked, mostly because it is just my handwriting after coffee.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:reference-checks:rep-4",
          text: "'No comment' seven times is a COMMENT with a paragraph count. I thank them warmly, log the silence, and read the whole conversation again for what was NOT said. The silence said plenty. The candidate never knew. The reference system protects everyone, including people who do not believe in it. Especially them.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:reference-checks:rep-5",
          text: "Constantly. The moment they learn I am calling from THIS office, the questions reverse: 'is it true about the Batman sign?', 'does the dog really attend standup?', 'is the printer okay?'. I answer as an ambassador. We have gained two candidates and lost zero references to Burek enthusiasm. The sign alone has a fan base.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:reference-checks:rep-6",
          text: "Small lies are nerves — a month here, a title there, forgiven with a note. Big lies are architecture: a whole employer, a whole degree. Architecture I document, the process handles, and I never enjoy. The strange part is that the big liars are always the most charming in the interview. Charm is not evidence. I check anyway. I always check.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "kasia:party-committee",
      label: "The party committee compliance",
      optionCandidates: [
        { id: "kasia:party-committee:opt-1", topicId: "kasia:party-committee", text: "Does the party committee have HR oversight?" },
        { id: "kasia:party-committee:opt-2", topicId: "kasia:party-committee", text: "Why does fun need a risk assessment?" },
        { id: "kasia:party-committee:opt-3", topicId: "kasia:party-committee", text: "You vetoed the mechanical bull. Cowardice?" },
        { id: "kasia:party-committee:opt-4", topicId: "kasia:party-committee", text: "The last party ran out of chairs." },
        { id: "kasia:party-committee:opt-5", topicId: "kasia:party-committee", text: "Is attendance at office parties mandatory?" },
        { id: "kasia:party-committee:opt-6", topicId: "kasia:party-committee", text: "Who signs off the party budget with Grazyna?" },
      ],
      replyCandidates: [
        {
          id: "kasia:party-committee:rep-1",
          text: "I am the oversight, the insurance requirement, and — this surprises people — a member. Renata plans joy, I plan the edges of joy where joy meets insurance. My committee title is 'magical thinking prevention officer'. Klaudia shortened it to 'fun police'. I have it on a mug. The mug was NOT approved by the committee.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:party-committee:rep-2",
          text: "Because joy with hazards is a lawsuit with confetti, and the form takes eleven minutes, which is eleven minutes less of my life spent in an office with a lawyer. The form has saved us from one ceiling, two candles, and the mechanical bull. The bull's vendor still calls me. I have a folder for him.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:party-committee:rep-3",
          text: "PRUDENCE. The bull's insurance excluded 'enthusiastic adults', which is everyone we employ. I offered a compromise — a foam bull, waist height — and the committee said it lacked drama. Since then I am 'the woman who killed the bull'. I have made peace with it. My tombstone may as well say it. Waist-height foam, people. SAFETY.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:party-committee:rep-4",
          text: "Chairs are my department and I take the blame with dignity. The RSVP said forty. The party had sixty, because people bring partners, partners bring friends, and friends bring opinions about the playlist. Since then the formula is RSVP plus thirty percent, and Janusz builds the overflow seating himself. The man is a load-bearing tradition.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:party-committee:rep-5",
          text: "Never — mandatory fun is an HR crime scene and I refuse to author one. Attendance is optional, photos are opt-in, and the speech is survivable. The strange statistic: the parties people are free to skip are the ones everyone attends, which is either culture or math and I do not question my luck.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:party-committee:rep-6",
          text: "I do, armed with three quotes and one justification per zloty. Grazyna reads party budgets the way Dawid reads contracts — for the traps. She has never rejected a party, but she has reduced one by a candle budget, which taught me: never let the line item rhyme with 'celebration'. Call it 'team infrastructure'. She knows. She allows it. That is our dance.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "kasia:remote-onboarding",
      label: "Remote onboarding",
      optionCandidates: [
        { id: "kasia:remote-onboarding:opt-1", topicId: "kasia:remote-onboarding", text: "How do you onboard someone who is never here?" },
        { id: "kasia:remote-onboarding:opt-2", topicId: "kasia:remote-onboarding", text: "The remote hire's laptop arrived before his contract." },
        { id: "kasia:remote-onboarding:opt-3", topicId: "kasia:remote-onboarding", text: "Remote people miss the coffee machine lore." },
        { id: "kasia:remote-onboarding:opt-4", topicId: "kasia:remote-onboarding", text: "Do remote hires meet Burek virtually?" },
        { id: "kasia:remote-onboarding:opt-5", topicId: "kasia:remote-onboarding", text: "The remote checklist has ninety items." },
        { id: "kasia:remote-onboarding:opt-6", topicId: "kasia:remote-onboarding", text: "First day as a remote hire — what actually happens?" },
      ],
      replyCandidates: [
        {
          id: "kasia:remote-onboarding:rep-1",
          text: "With over-correction: a courier box, a video call per day for two weeks, and a buddy who is contractually kind. The office absorbs people by osmosis — the fridge accord, the room names, the printer grief. Remote people need that culture EXPLAINED, which is either my job or my calling. Possibly both, and I am at peace with it.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:remote-onboarding:rep-2",
          text: "That was the courier company's efficiency beating my paperwork by a day, and I have not forgiven the timeline. He was a fully equipped employee and legally a rumor. I couriered the contract to his house within hours. Now the checklist has a step called 'paperwork outranks laptops'. Every rule here has a story and usually it is my face on the story.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:remote-onboarding:rep-3",
          text: "They do, and it is the one loss I cannot ship. You cannot courier standing near someone while they fight the coffee machine. So I wrote it down — the coffee lore, the yogurt law, the B-flat hum — as a document I update quarterly. It is titled 'Things The Hallways Teach'. It is my favorite thing I have ever authored and nobody reads it until they visit. Then they read it twice.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:remote-onboarding:rep-4",
          text: "There is a slot on day three titled 'meet the morale lead' and it is a camera pointed at Burek for five minutes. Attendance is one hundred percent, every cohort, including the two people who pretended to be above it. Nobody is above Burek. That is not policy, that is physics.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:remote-onboarding:rep-5",
          text: "Eighty-nine items and one easter egg. The items are boring on purpose — laptops, accounts, forms — because boring means nobody drowns. The easter egg is item forty-seven and it just says 'you are doing fine'. Three people have cried at item forty-seven. All three are still here. Draw your own conclusions; I have drawn mine.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:remote-onboarding:rep-6",
          text: "A box at the door, three calls, one shadowing session, and by evening a message in the chat from someone random — I rotate the randomizer myself. Day one is engineered loneliness prevention. Everyone remembers their first day here. Remote or not, I intend for the memory to be 'someone was expecting me'. That is the entire philosophy.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "kasia:certificates",
      label: "The framed certificates",
      optionCandidates: [
        { id: "kasia:certificates:opt-1", topicId: "kasia:certificates", text: "Your wall has more certificates than the office has rooms." },
        { id: "kasia:certificates:opt-2", topicId: "kasia:certificates", text: "Are those certificates alphabetical or chronological?" },
        { id: "kasia:certificates:opt-3", topicId: "kasia:certificates", text: "The mediation certificate has its own spotlight." },
        { id: "kasia:certificates:opt-4", topicId: "kasia:certificates", text: "Did Pawel donate you a certificate?" },
        { id: "kasia:certificates:opt-5", topicId: "kasia:certificates", text: "Grazyna audited your certificate wall." },
        { id: "kasia:certificates:opt-6", topicId: "kasia:certificates", text: "Which certificate means the most to you?" },
      ],
      replyCandidates: [
        {
          id: "kasia:certificates:rep-1",
          text: "Fourteen framed, six in the drawer awaiting frames, and one being re-framed after the humidity incident. The wall is not vanity, it is EVIDENCE — when a candidate doubts we know what we are doing, I walk them past the wall. Recruiting is theater and the wall is my set design. Every recruiter has one. Mine is simply better lit.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:certificates:rep-2",
          text: "Chronological, left to right, the story of a career told in fonts. The early ones have borders like wedding invitations. The recent ones look like parking tickets, which is the industry's whole aesthetic decline in one wall. Alphabetical order would be chaos. Dates are destiny. I will die on this wall-arrangement hill and be buried in frame.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:certificates:rep-3",
          text: "It earned the spotlight by being the hardest forty hours of my professional life — two days of roleplay, one real conflict resolved on camera, and a final exam I passed by breathing slowly. The spotlight was Klaudia's idea, for 'content'. It stayed for my sanity. When the office fights, I look at that spotlight and remember I am, officially, calm.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:certificates:rep-4",
          text: "He TRIED to gift me one of his course certificates, with a ceremony and everything. I declined gently — the wall is a personal archive, not a museum of other people's achievements. But the gesture is in my drawer, filed under 'keep'. The boy laminated it. There is a future for him in stationery if code ever breaks his heart.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:certificates:rep-5",
          text: "She checked three dates against the files and pronounced the wall 'audit-clean', which is the highest praise Grazyna issues and the only kind she issues. She then asked why I had framed a RUNNING certificate. It is a 5k, not a professional certification. I framed it anyway. Some achievements do not need her approval to be on the wall.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:certificates:rep-6",
          text: "The one from my first job, where I was terrible, aged twenty-two, and the certificate is for 'attendance'. I frame it first on the wall to remember that everyone starts as a punchline. When a nervous candidate sits down, I point at it and say 'I began here'. The shoulders drop. The interview starts honestly. That certificate works harder than any diploma I own.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:payslip-question",
      label: "Payslip questions",
      optionCandidates: [
        { id: "kasia:payslip-question:opt-1", topicId: "kasia:payslip-question", text: "My payslip has a code on it nobody can explain." },
        { id: "kasia:payslip-question:opt-2", topicId: "kasia:payslip-question", text: "Why does the payslip arrive at 23:40?" },
        { id: "kasia:payslip-question:opt-3", topicId: "kasia:payslip-question", text: "Can you tell me what Tomek earns?" },
        { id: "kasia:payslip-question:opt-4", topicId: "kasia:payslip-question", text: "The bonus line says 'discretionary'. Meaning?" },
        { id: "kasia:payslip-question:opt-5", topicId: "kasia:payslip-question", text: "Someone framed their first payslip in the kitchen." },
        { id: "kasia:payslip-question:opt-6", topicId: "kasia:payslip-question", text: "Why is the payslip portal password so strict?" },
      ],
      replyCandidates: [
        {
          id: "kasia:payslip-question:rep-1",
          text: "The code is a tax thing with a personality disorder and I have a decoder sheet laminated — of course I do. Bring the payslip, I will translate it into human, and you will leave angrier about the system but calmer about your money. That is the trade. I perform it monthly, like a fortune teller with a calculator.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:payslip-question:rep-2",
          text: "Because the payroll system runs at midnight like it is doing something shameful, and honestly, arriving at 23:40 means nobody reads it before coffee, which is when mistakes should be discovered — caffeinated, with witnesses. I have petitioned for a morning release. The system does not negotiate. The system has never once answered my emails.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:payslip-question:rep-3",
          text: "I cannot, will not, and have built a career on the elegant shrug that question requires. Salary confidentiality is the one wall in this office thicker than the glass one. What I CAN say: the bands exist, they are defensible, and Grazyna guards them with the zeal of a dragon on a spreadsheet. Ask about bands, not people. Bands I discuss. People never.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:payslip-question:rep-4",
          text: "'Discretionary' means the company decided, the company may decide differently next year, and no, that is not a loophole, it is the entire genre. I hate the word and its fifteen fonts. My advice, off the record, whispered: treat every bonus as a surprise gift and never a plan. Financial advisors hate this one trick. The trick is grief management.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:payslip-question:rep-5",
          text: "That was Pawel, month one, and the frame is the proudest object in that kitchen. I walked past it every day for a week trying not to cry into my coffee. First payslips are sacred — money you earned, printed, with your name spelled right. If the office ever does a museum, that frame is exhibit one and I will curate the wing for free.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:payslip-question:rep-6",
          text: "Because the portal guards the ONE document that can impersonate you completely, and its password rules were written by a security consultant who feared everything equally. Fourteen characters, one symbol, no dictionary words, and it expires when you have finally memorized it. That last part is deliberate. I have proof. I choose not to present it.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "kasia:meditation-room",
      label: "The meditation room",
      optionCandidates: [
        { id: "kasia:meditation-room:opt-1", topicId: "kasia:meditation-room", text: "Is the meditation room open or still a myth?" },
        { id: "kasia:meditation-room:opt-2", topicId: "kasia:meditation-room", text: "The meditation room booking sheet has three names." },
        { id: "kasia:meditation-room:opt-3", topicId: "kasia:meditation-room", text: "Someone naps in the meditation room. Daily." },
        { id: "kasia:meditation-room:opt-4", topicId: "kasia:meditation-room", text: "Zosia calls it the silence room. Which is it?" },
        { id: "kasia:meditation-room:opt-5", topicId: "kasia:meditation-room", text: "The cushion in there is older than most employees." },
        { id: "kasia:meditation-room:opt-6", topicId: "kasia:meditation-room", text: "Should the meditation room have a policy?" },
      ],
      replyCandidates: [
        {
          id: "kasia:meditation-room:rep-1",
          text: "Open, real, and criminally underbooked. It is the closet that became a wellness room in 2022 — one cushion, one plant with survival instincts, and a sign that says 'be here, not your inbox'. People book it for phone calls and then, changed by the room, actually meditate for four minutes. The conversion rate is small but the room is patient.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:meditation-room:rep-2",
          text: "Three names, and I am one of them, which I will neither confirm nor discuss — confidentiality applies to cushions too. What I CAN say: the bookings are fifteen minutes, respectful, and the sheet has a comment column where someone wrote 'life-changing' and someone else wrote 'ran out of time'. The range is human. I love the range.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:meditation-room:rep-3",
          text: "Napping IS meditation for the overworked — I have read articles, I have made my peace. The booking sheet says 'mindfulness'; the do-not-disturb sign says the rest. My only rule: set an alarm. The one time someone napped through a client call, the room's reputation wobbled for a quarter. The room recovered. The napper transferred to napping at home. Growth.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:meditation-room:rep-4",
          text: "Same room, two marketing strategies. Her 'silence room' is for the tour brochure; my 'meditation room' is for the benefits sheet. The room itself does not care what we call it. The room holds a cushion and our collective pretense, and it does both beautifully. Zosia and I have agreed to disagree in writing. The writing is a sticky note on the door.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:meditation-room:rep-5",
          text: "That cushion predates my employment and possibly some governments. It has been sat on by every generation of this office, including one CEO, and it has never once complained. Janusz refuses to replace it — 'the cushion is broken in, like the building'. He is right. New cushions have no stories. This one hums when you sit. We interpret it as wisdom.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:meditation-room:rep-6",
          text: "One rule only: fifteen minutes, then the room belongs to the next person. No policy survives its first encounter with genuine silence anyway — you cannot enforce calm, you can only schedule it and hope. The rule exists so the room stays a refuge and does not become somebody's second office with better lighting. I guard that line like the payslip codes.",
          relationshipHint: "neutral",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "kasia:photo-wall",
      label: "The new-hire photo wall",
      optionCandidates: [
        { id: "kasia:photo-wall:opt-1", topicId: "kasia:photo-wall", text: "My photo wall picture is terrible. Redo it?" },
        { id: "kasia:photo-wall:opt-2", topicId: "kasia:photo-wall", text: "Who photographs the new hires?" },
        { id: "kasia:photo-wall:opt-3", topicId: "kasia:photo-wall", text: "The first photo on the wall is from 2015." },
        { id: "kasia:photo-wall:opt-4", topicId: "kasia:photo-wall", text: "Burek has three photos on the wall. Policy?" },
        { id: "kasia:photo-wall:opt-5", topicId: "kasia:photo-wall", text: "Klaudia offered to retouch the whole wall." },
        { id: "kasia:photo-wall:opt-6", topicId: "kasia:photo-wall", text: "What happens to photos when someone leaves?" },
      ],
      replyCandidates: [
        {
          id: "kasia:photo-wall:rep-1",
          text: "Terrible is the HOUSE STYLE. The wall is deliberately un-retouched — everyone photographed in the same doorway light, blinking allowances included. The day we allow retouching, the wall stops being a team and becomes a catalog. Yours is terrible. Mine is worse. Welcome to the wall. There are no redos, only eventual fondness.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:photo-wall:rep-2",
          text: "I do, on the first Friday, with the office camera that has survived two floods and one Burek incident. One shot, no warnings, mid-sentence if possible — the brief is 'how you actually look when you talk'. New hires hate it for a week and love it forever. I have the testimonials. I keep them in a folder marked 'future ammunition'. Kidding. Mostly.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:photo-wall:rep-3",
          text: "2015, the founding team, four people squinting next to a wall that had just been painted. The photo is technically awful and emotionally load-bearing — three of those four are still here, and the fourth sends a Christmas card TO THE WALL. I have witnessed people touch it before big meetings, like a shrine. The wall works. I did not plan that part. The wall did.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:photo-wall:rep-4",
          text: "Burek has three because he has attended three first Fridays and the RULE is: present at the photo, on the photo. He sat in frame each time with total professionalism. Legal says the wall is 'unofficial'. The wall contains a dog with better attendance than most humans. I have decided legality is a spectrum. The wall agrees with me.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:photo-wall:rep-5",
          text: "She offered, with filters, a unified tone, and 'a visual identity'. I declined in my kindest voice. The wall's power is its honesty — bad lighting, real faces, zero branding. Klaudia took the refusal professionally and then secretly enhanced ONE photo, mine, and made me look like a skincare ad. It is back to normal now. We do not discuss the week it was not.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:photo-wall:rep-6",
          text: "They stay. That surprises everyone — the wall keeps everyone who ever stood in the doorway light, alumni included. People come back for visits and find themselves between two strangers, older, badly lit, home. The wall is the opposite of a resignation: it says you were HERE. I will defend that policy with the laminated ferocity it deserves.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:work-anniversaries",
      label: "The workiversary posts",
      optionCandidates: [
        { id: "kasia:work-anniversaries:opt-1", topicId: "kasia:work-anniversaries", text: "Why does every workiversary get an announcement?" },
        { id: "kasia:work-anniversaries:opt-2", topicId: "kasia:work-anniversaries", text: "The workiversary posts use the same three adjectives." },
        { id: "kasia:work-anniversaries:opt-3", topicId: "kasia:work-anniversaries", text: "My workiversary is this week. What happens?" },
        { id: "kasia:work-anniversaries:opt-4", topicId: "kasia:work-anniversaries", text: "Can I opt out of my workiversary post?" },
        { id: "kasia:work-anniversaries:opt-5", topicId: "kasia:work-anniversaries", text: "Marek's ten-year workiversary post was one line." },
        { id: "kasia:work-anniversaries:opt-6", topicId: "kasia:work-anniversaries", text: "Who writes the workiversary blurbs?" },
      ],
      replyCandidates: [
        {
          id: "kasia:work-anniversaries:rep-1",
          text: "Because time passing is the only metric this office celebrates without a spreadsheet, and I protect that with my lanyard. The announcement takes me four minutes to write and it is the only document I write where nobody requests edits. Four minutes of pure, unedited HR joy per person per year. I ration myself accordingly.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:work-anniversaries:rep-2",
          text: "'Dedicated', 'reliable', and 'part of the family' — the holy trinity, and yes, I am aware. The adjectives are a template from 2019 that survived because nobody has written a better one sober. I have TRIED. Every synonym sounds like a hostage note. The trinity stays until someone braver than me rewrites HR poetry.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:work-anniversaries:rep-3",
          text: "A post in the channel, one emoji minimum from everyone including Dawid, and a small cake appearance if the calendar cooperates. You will say 'oh you should not have' and mean it in both directions. That is the ritual. It is small, it is slightly embarrassing, and in ten years you will find the post screenshot and feel something. Guaranteed. I have data.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:work-anniversaries:rep-4",
          text: "You can, quietly, and the post becomes a card on your desk instead — same words, smaller audience. Three people have opted out and all three kept the cards, which I know because I see everything on desks, professionally. The post is a service, not a tax. Choose your format. I cater both with equal sincerity.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:work-anniversaries:rep-5",
          text: "'Ten years. Server still up.' Six words and it outperformed every workiversary post in company history by every measure — reactions, replies, one person printing it. I asked Marek if he wanted a longer version. He said 'no'. The brevity was the sentiment. I have learned more about writing from that man than from any course, including his beloved keyboard guy.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:work-anniversaries:rep-6",
          text: "Me, with input from one colleague I survey in secret — the answers are always better than the template. 'He fixed the thing before anyone noticed' made one post legendary. The blurbs are tiny biographies and I treat them like haikus: true, brief, and slightly warm. The adjectives may be three. The facts I hide inside them are chosen.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "kasia:laptop-return",
      label: "Laptop returns",
      optionCandidates: [
        { id: "kasia:laptop-return:opt-1", topicId: "kasia:laptop-return", text: "A leaver kept their laptop for six weeks." },
        { id: "kasia:laptop-return:opt-2", topicId: "kasia:laptop-return", text: "What happens to laptops when people leave?" },
        { id: "kasia:laptop-return:opt-3", topicId: "kasia:laptop-return", text: "Do you really wipe laptops yourselves?" },
        { id: "kasia:laptop-return:opt-4", topicId: "kasia:laptop-return", text: "Someone returned a laptop with stickers everywhere." },
        { id: "kasia:laptop-return:opt-5", topicId: "kasia:laptop-return", text: "Is there a laptop farewell ritual?" },
        { id: "kasia:laptop-return:opt-6", topicId: "kasia:laptop-return", text: "The returned laptop password is still 'password'." },
      ],
      replyCandidates: [
        {
          id: "kasia:laptop-return:rep-1",
          text: "Six weeks is a gap year in laptop-return time. The average is four days and the record is Marek, who once collected one at 7am with a tote bag and a thank-you card. The card was for us. The laptop was for the shelf. The shelf has a waiting list.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:laptop-return:rep-2",
          text: "They go to Marek's shelf, where they are lovingly reimaged and wait for their second life with an intern or a brave client demo. It is genuinely a good system. The laptops get pensions. Some of them outlast the careers that carried them.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:laptop-return:rep-3",
          text: "Marek wipes them and I witness it, because compliance loves a second signature. My role is ceremonial: I initial a form that says the laptop forgot everything, which is either cybersecurity or a very small funeral. I have done it one hundred and six times.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:laptop-return:rep-4",
          text: "We document the stickers as condition notes. One return said 'sticker of a capybara, left intentionally, do not remove' and Marek has honored it across two reimaging cycles. That capybara has seniority now. It watches the shelf.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:laptop-return:rep-5",
          text: "There is a small one: the laptop gets carried out past the kitchen so people can wave. Zosia calls it 'the procession'. It costs nothing, it closes the chapter, and twice it turned into an actual applause. Offboarding is just onboarding in reverse gear.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:laptop-return:rep-6",
          text: "That laptop has seen things and learned nothing, which makes it the most honest employee we ever had. Marek will wipe it with something close to tenderness. I will initial the form. The circle of life, but with passwords.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
      ],
    },
    {
      id: "kasia:name-pronunciation",
      label: "The pronunciation guide",
      optionCandidates: [
        { id: "kasia:name-pronunciation:opt-1", topicId: "kasia:name-pronunciation", text: "The client mangled my name in the intro call." },
        { id: "kasia:name-pronunciation:opt-2", topicId: "kasia:name-pronunciation", text: "Is there really an internal pronunciation guide?" },
        { id: "kasia:name-pronunciation:opt-3", topicId: "kasia:name-pronunciation", text: "How do you correct a mispronounced name politely?" },
        { id: "kasia:name-pronunciation:opt-4", topicId: "kasia:name-pronunciation", text: "Someone called me a completely different name for months." },
        { id: "kasia:name-pronunciation:opt-5", topicId: "kasia:name-pronunciation", text: "Should I put pronunciation in my email signature?" },
        { id: "kasia:name-pronunciation:opt-6", topicId: "kasia:name-pronunciation", text: "Does Burek know his own name by now?" },
      ],
      replyCandidates: [
        {
          id: "kasia:name-pronunciation:rep-1",
          text: "I keep a correction line ready: 'close, and it is X, but the effort was lovely'. Delivered warm, it lands like a gift instead of a fine. Your name is not a typo. People want to be told. Nobody has ever resented the gentle version.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:name-pronunciation:rep-2",
          text: "There is, it is three pages, and it has phonetics, stress marks and one audio link Klaudia recorded that says 'firmly but kindly'. New hires get it with their contract. It is the second most-read document after the wifi password sheet.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:name-pronunciation:rep-3",
          text: "Once, immediately, with a smile. Letting it slide turns into months of being someone else. I model it by correcting my own mispronunciations out loud, which makes correcting others feel like team practice instead of a courtroom.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:name-pronunciation:rep-4",
          text: "The longest case here was nine months, and by the end answering to the wrong name felt like a work skill. We held a gentle re-introduction ceremony at the coffee machine. Two people cried. It was beautiful. It is in the guide now as a warning tale.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:name-pronunciation:rep-5",
          text: "Put it in. 'Name, pronounced like this' is the highest-value line a signature ever carried. Klaudia adds hers with a small heart, Marek with a diagram. The guide began because one intern put hers in a signature and the whole office followed within a week.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:name-pronunciation:rep-6",
          text: "Burek answers to his name, four nicknames, the sound of a cheese wrapper, and the word 'meeting' in any tone. His pronunciation entry is the longest in the guide and entirely made of commas. Renata maintains it. He does not consent to audio recording.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:walking-club",
      label: "The walking club",
      optionCandidates: [
        { id: "kasia:walking-club:opt-1", topicId: "kasia:walking-club", text: "Is the lunch walking club still a thing?" },
        { id: "kasia:walking-club:opt-2", topicId: "kasia:walking-club", text: "How fast does the walking club actually walk?" },
        { id: "kasia:walking-club:opt-3", topicId: "kasia:walking-club", text: "Can I join if I only want to walk silently?" },
        { id: "kasia:walking-club:opt-4", topicId: "kasia:walking-club", text: "The walking club discussed a client on the route." },
        { id: "kasia:walking-club:opt-5", topicId: "kasia:walking-club", text: "It started raining mid-walk again." },
        { id: "kasia:walking-club:opt-6", topicId: "kasia:walking-club", text: "Does Dawid really walk a longer route than everyone?" },
      ],
      replyCandidates: [
        {
          id: "kasia:walking-club:rep-1",
          text: "Tuesdays and Thursdays, twelve twenty, meeting point by the coat corner. It is the cheapest wellbeing program we run and the only one with a zero percent unsubscribe rate. Even Tomasz came once, walked exactly one lap, and described it as 'acceptable'.",
          relationshipHint: "pleased",
          tags: ["period:lunch"],
        },
        {
          id: "kasia:walking-club:rep-2",
          text: "The pace is 'conversation speed', formally defined as brisk enough to feel virtuous, slow enough to finish a sentence. Marek once timed us with a GPS app and announced we average four kilometers an hour. We promoted him to pace marshal immediately.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:walking-club:rep-3",
          text: "The silent lane is respected and mildly legendary. Dawid walks it weekly and says nothing except 'good pace today' at the end, which is the club's equivalent of a standing ovation. Silence is participation. The feet do the talking.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:walking-club:rep-4",
          text: "Then the walk became a meeting and someone owes me a form. Outside voices carry, and the client's name traveled a full block. We added a rule: beyond the corner, we talk about food, weather, or the dog. It is honored about eighty percent of the time.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:walking-club:rep-5",
          text: "Rain is a membership tier, not a cancellation. The hardcore five walk anyway and return looking like survivors of something heroic. Klaudia brought umbrellas for everyone once, branded, of course. We are the best-drenched department in the building.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:walking-club:rep-6",
          text: "He walks the long loop, alone, before we even set out, and passes us near the bridge going the other direction like a lighthouse in a suit. We have stopped asking why. The route is his meditation. We just wave. He nods. The system works.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:soft-skills",
      label: "The soft-skills workshop",
      optionCandidates: [
        { id: "kasia:soft-skills:opt-1", topicId: "kasia:soft-skills", text: "Nobody signed up for the soft-skills workshop." },
        { id: "kasia:soft-skills:opt-2", topicId: "kasia:soft-skills", text: "What does a soft-skills workshop actually contain?" },
        { id: "kasia:soft-skills:opt-3", topicId: "kasia:soft-skills", text: "Tomek called soft skills 'skills with no stack trace'." },
        { id: "kasia:soft-skills:opt-4", topicId: "kasia:soft-skills", text: "Can attendance count as training budget use?" },
        { id: "kasia:soft-skills:opt-5", topicId: "kasia:soft-skills", text: "The role-play exercise made everyone freeze." },
        { id: "kasia:soft-skills:opt-6", topicId: "kasia:soft-skills", text: "Did anyone leave the workshop actually changed?" },
      ],
      replyCandidates: [
        {
          id: "kasia:soft-skills:rep-1",
          text: "Nobody EVER signs up, and then everyone attends and rates it 4.6. Soft skills have a marketing problem: the name sounds like a pillow. I renamed the session 'Difficult Emails: A Live Demo' and it filled in an hour. Same content. New armor.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],
        },
        {
          id: "kasia:soft-skills:rep-2",
          text: "Three parts: how to say no without a funeral, how to receive feedback without armor, and the anatomy of the phrase 'per my last email'. There is a workbook. The workbook is honest. The workbook has a page where you write the email you WANTED to send.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:soft-skills:rep-3",
          text: "I put it on a slide, uncredited, and the room laughed. Then he attended anyway, took four pages of notes, and now handles client disagreements like a diplomat with a keyboard. The loudest skeptics make the quietest conversions. I keep the receipts.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:soft-skills:rep-4",
          text: "It counts, and Grazyna approved the line item with a phrase I have framed: 'cheaper than a lawsuit'. The training budget exists precisely for this. You are not attending a workshop, you are preventively maintaining the office's diplomatic corps.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "kasia:soft-skills:rep-5",
          text: "The freeze is the workshop working. Role-play is everyone's nightmare until minute four, when someone breaks character to say 'this is EXACTLY what Marek from vendor support does' and the room becomes a support group. I schedule the freeze. It always arrives.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:soft-skills:rep-6",
          text: "One person, visibly, forever: Pawel. He walked in apologizing for existing and walked out asking for the difficult client on purpose. Zosia noticed within a week. Transformations that size rarely fit on an evaluation form, but they fit in an office.",
          relationshipHint: "delighted",
          tags: ["quest:pawel-apprentice", "relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:bank-holidays",
      label: "The long-weekend map",
      optionCandidates: [
        { id: "kasia:bank-holidays:opt-1", topicId: "kasia:bank-holidays", text: "When is the next long weekend?" },
        { id: "kasia:bank-holidays:opt-2", topicId: "kasia:bank-holidays", text: "Why do you keep a printed holiday map?" },
        { id: "kasia:bank-holidays:opt-3", topicId: "kasia:bank-holidays", text: "The client forgot our holiday and scheduled a call." },
        { id: "kasia:bank-holidays:opt-4", topicId: "kasia:bank-holidays", text: "Is bridging a holiday with one leave day clever?" },
        { id: "kasia:bank-holidays:opt-5", topicId: "kasia:bank-holidays", text: "Does the whole office vanish on the same bridge day?" },
        { id: "kasia:bank-holidays:opt-6", topicId: "kasia:bank-holidays", text: "Do you work on bank holidays yourself?" },
      ],
      replyCandidates: [
        {
          id: "kasia:bank-holidays:rep-1",
          text: "Three weeks, and the office already smells like planning. I can tell you the exact mood curve: tomorrow nobody thinks about it, in two weeks Marek will mention his tent, and the day before, every ticket will suddenly be urgent. I publish the map so we skip all that.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:bank-holidays:rep-2",
          text: "The map has every holiday, every bridge, and little stars for 'days the client also has off', which are golden. It is laminated because tears of joy are still moisture. People photograph it more than the values posters. I take no offense. Some offense.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:bank-holidays:rep-3",
          text: "Then I send the calendar invite that is actually a diplomatic note: 'we are offline, recharging by law, back Thursday'. Clients respect borders when you draw them early. The ones who ignore the map get the gentlest no in my collection.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:bank-holidays:rep-4",
          text: "Bridging is not clever, it is strategy, and I encourage it with templates. One day of leave bought with five days of freedom is the best exchange rate this office offers. Grazyna calls it 'arbitrage'. I call it Tuesday. We are both right.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:bank-holidays:rep-5",
          text: "They do, all at once, and that is why the map exists: somebody stays anchored every bridge, and we rotate the anchor like real sailors. The rotation sheet is fair, documented, and slightly resented, which in HR terms means it is working.",
          relationshipHint: "neutral",
          tags: ["period:afternoon"],
        },
        {
          id: "kasia:bank-holidays:rep-6",
          text: "I answer two emails, water Renata's flowers if she is away, and let the autoreply do its quiet work. A bank holiday where you truly rest makes you a better colleague on Friday. That is not laziness. That is maintenance, and I will put it in writing.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:nepotism",
      label: "The cousin of a cousin",
      optionCandidates: [
        { id: "kasia:nepotism:opt-1", topicId: "kasia:nepotism", text: "A CV arrived via someone's cousin's cousin." },
        { id: "kasia:nepotism:opt-2", topicId: "kasia:nepotism", text: "How do referrals from family actually work here?" },
        { id: "kasia:nepotism:opt-3", topicId: "kasia:nepotism", text: "Maciek wants to hire someone he met at a wedding." },
        { id: "kasia:nepotism:opt-4", topicId: "kasia:nepotism", text: "The cousin's CV says 'fluent in computers'." },
        { id: "kasia:nepotism:opt-5", topicId: "kasia:nepotism", text: "Do we owe referrals an interview at least?" },
        { id: "kasia:nepotism:opt-6", topicId: "kasia:nepotism", text: "Has a relative hire ever actually worked out?" },
      ],
      replyCandidates: [
        {
          id: "kasia:nepotism:rep-1",
          text: "The cousin of a cousin travels through six inboxes before reaching mine, gaining a subject line of exclamation marks on the way. I treat it exactly like any CV: same form, same process, same kindly worded outcome.Kinship is not a pipeline stage. It barely is a keyword.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:nepotism:rep-2",
          text: "Referrals get one guaranteed look, which is the whole perk. The referrer writes two lines on why, we interview like always, and if it fails, I write the softest no in my repertoire and the family survives dinner. The system bends. It does not break.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:nepotism:rep-3",
          text: "He meets people at weddings the way spiders build webs, and twice it WORKED. My rule for Maciek's wedding finds: interview yes, shortcut no. He gets one candidate slot per quarter. He has never used fewer. The man networks at the dessert table.",
          relationshipHint: "pleased",
          tags: ["quest:ceo-met"],
        },
        {
          id: "kasia:nepotism:rep-4",
          text: "'Fluent in computers' goes into the same archive drawer as 'proficient in MS Office' and 'team player with a sense of humor'. The drawer is deep and well organized. Interviews reveal people. CVs reveal ambition and a thesaurus.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:nepotism:rep-5",
          text: "A fifteen-minute call, yes, out of decency to the referrer. It costs nothing and keeps goodwill alive in every direction. But an owed coffee is not an owed contract, and I explain that difference with the same kindness I use for everything else in this job.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:nepotism:rep-6",
          text: "Once, gloriously: a founder's nephew turned out to be the best QA mind we ever had, and nobody wanted to believe it until he found a bug on his second day that had survived three releases. The family table was smug for a year. Deservedly.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "kasia:ergonomic-audit",
      label: "The ergonomic audit",
      optionCandidates: [
        { id: "kasia:ergonomic-audit:opt-1", topicId: "kasia:ergonomic-audit", text: "Is the ergonomic audit happening this quarter?" },
        { id: "kasia:ergonomic-audit:opt-2", topicId: "kasia:ergonomic-audit", text: "The auditor adjusted my chair without asking." },
        { id: "kasia:ergonomic-audit:opt-3", topicId: "kasia:ergonomic-audit", text: "My monitor is at the wrong height, apparently." },
        { id: "kasia:ergonomic-audit:opt-4", topicId: "kasia:ergonomic-audit", text: "Tomek refused the ergonomic assessment." },
        { id: "kasia:ergonomic-audit:opt-5", topicId: "kasia:ergonomic-audit", text: "The audit report says our office is 'adequate'." },
        { id: "kasia:ergonomic-audit:opt-6", topicId: "kasia:ergonomic-audit", text: "Will the audit finally get us better chairs?" },
      ],
      replyCandidates: [
        {
          id: "kasia:ergonomic-audit:rep-1",
          text: "It is scheduled, it is free, and it comes with a checklist that will judge your posture like a strict aunt. Sign-up sheet is by the coffee machine. Last year's audit found forty-one crimes against wrists, and thirty-nine were in the same corner of the office.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:ergonomic-audit:rep-2",
          text: "The chair adjustment is the auditor's love language and she means no harm by it. She once fixed Renata's lumbar support mid-sentence and Renata thanked her mid-sentence back. Resistance is futile, but complaint forms exist for the principle of it.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:ergonomic-audit:rep-3",
          text: "Monitor height is the audit's headline act: screen top at eye level, arm's length away, like the screen is a respected colleague. Everyone's is wrong. Yours, mine, even Dawid's, and his setup otherwise resembles a shrine. We are all looking down at something.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:ergonomic-audit:rep-4",
          text: "He refused on the grounds that his posture is 'a lifestyle choice'. Then the auditor watched him work for ninety silent seconds and left a note that said 'the trackball stays'. They understand each other. Two monks, one hillside, mutual respect.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:ergonomic-audit:rep-5",
          text: "'Adequate' is audit-speak for 'nobody will be sued and nobody will be celebrated'. I read the whole report hunting for one 'excellent'. We got it for the plants. The PLANTS. Janusz accepted the trophy on their behalf. The chairs remain a villain arc.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:ergonomic-audit:rep-6",
          text: "The audit writes the argument and the budget meeting reads it aloud. Three audits ago the phrase 'repetitive strain liability' unlocked six chairs in one afternoon. I keep that report like a legal weapon. Bureaucacy fights best when it is binded.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "kasia:gift-vouchers",
      label: "The gift voucher system",
      optionCandidates: [
        { id: "kasia:gift-vouchers:opt-1", topicId: "kasia:gift-vouchers", text: "How do birthday vouchers work here?" },
        { id: "kasia:gift-vouchers:opt-2", topicId: "kasia:gift-vouchers", text: "Someone tried to redeem a birthday voucher in January." },
        { id: "kasia:gift-vouchers:opt-3", topicId: "kasia:gift-vouchers", text: "Why vouchers instead of actual presents?" },
        { id: "kasia:gift-vouchers:opt-4", topicId: "kasia:gift-vouchers", text: "The voucher envelopes are color-coded?" },
        { id: "kasia:gift-vouchers:opt-5", topicId: "kasia:gift-vouchers", text: "Grazyna wants to log vouchers as liabilities." },
        { id: "kasia:gift-vouchers:opt-6", topicId: "kasia:gift-vouchers", text: "Can I gift my voucher to someone else?" },
      ],
      replyCandidates: [
        {
          id: "kasia:gift-vouchers:rep-1",
          text: "There is a spreadsheet, a ceremony, and an envelope handed over with two hands and one sentence of sincerity. The amount never changes, the envelope color changes by season, and the whole operation costs one afternoon of my month. Best ROI in HR.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:gift-vouchers:rep-2",
          text: "Expired by four days, and the vendor showed no mercy. I fought them with an email thread that belongs in a museum, lost, and paid the difference from the party fund. Then I moved the expiry. The system now forgives January people. Progress.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:gift-vouchers:rep-3",
          text: "Because I once bought eleven people mugs and watched hope leave the room. Preferences are private, mugs are public, and vouchers let everyone choose their own small joy. It is not romance, but it is dignity, and dignity wraps itself.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:gift-vouchers:rep-4",
          text: "Autumn gold, winter blue, summer a green I would call 'optimistic'. The colors mean nothing operationally and everything culturally. People have favorite envelope seasons. Klaudia photographed the spring one for a post. The system has fans now.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:gift-vouchers:rep-5",
          text: "She booked them as contingent liabilities and now my kindness has a balance sheet. Unredeemed vouchers accrue, apparently. I asked what happens if everyone redeems at once and she said 'then we are a generous company in one loud week'. Fair.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "kasia:gift-vouchers:rep-6",
          text: "Regifting your own birthday voucher is allowed and once caused a beautiful chain: one voucher traveled through four birthdays in a single year like a tiny pension fund of goodwill. I tracked it in the spreadsheet under 'migrations'. It retired with honor.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:policy-updates",
      label: "Policy update announcements",
      optionCandidates: [
        { id: "kasia:policy-updates:opt-1", topicId: "kasia:policy-updates", text: "Another policy update email already?" },
        { id: "kasia:policy-updates:opt-2", topicId: "kasia:policy-updates", text: "Does anyone actually read the policy updates?" },
        { id: "kasia:policy-updates:opt-3", topicId: "kasia:policy-updates", text: "The update is one line long. Progress?" },
        { id: "kasia:policy-updates:opt-4", topicId: "kasia:policy-updates", text: "Can policies ever be deleted instead of updated?" },
        { id: "kasia:policy-updates:opt-5", topicId: "kasia:policy-updates", text: "The sandwich policy finally changed?" },
        { id: "kasia:policy-updates:opt-6", topicId: "kasia:policy-updates", text: "How do you write an update people open?" },
      ],
      replyCandidates: [
        {
          id: "kasia:policy-updates:rep-1",
          text: "Quarterly, and each one is shorter than the last, which is the whole strategy: policies shrink like good code. The last update was two lines and a small cartoon of the printer. Engagement doubled. I credit the printer. The printer takes no credit.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:policy-updates:rep-2",
          text: "Four people do, consistently, and they are the four you would guess: Marek checks for changes that affect the network, Grazyna for anything with a number, Tomasz for sentences with the word 'must', and Janusz for anything about the roof. Coverage is complete.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:policy-updates:rep-3",
          text: "One line IS the progress. The old version was four paragraphs explaining a fridge rule nobody broke. Now it is 'label your leftovers; Fridays are hungry'. Communication is a diet. Most policies just need to lose weight and keep the bones.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:policy-updates:rep-4",
          text: "Deletion day is my favorite day. We removed three policies last year and the office improved measurably: the sock rule, the desk-height memo, and whatever policy 14 ever was. Nobody misses them. Nobody remembers them. That is the metric.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:policy-updates:rep-5",
          text: "It did, after four years of negotiation that made peace treaties look rushed. The new rule is one sentence and a drawing. The old rule had subsections. Somewhere, a lawyer who billed for that sandwich is unaware of the peace he left behind.",
          relationshipHint: "pleased",
          tags: ["period:lunch"],
        },
        {
          id: "kasia:policy-updates:rep-6",
          text: "Open with what changed, close with why it matters, and never send it on a Friday afternoon, because policies deserve weekday attention. I A/B tested subject lines with Ania once and 'one small change' beat 'important update' by a mile. Brevity opens emails.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "kasia:return-to-office",
      label: "The return-to-office memo",
      optionCandidates: [
        { id: "kasia:return-to-office:opt-1", topicId: "kasia:return-to-office", text: "Is the return-to-office plan actually mandatory?" },
        { id: "kasia:return-to-office:opt-2", topicId: "kasia:return-to-office", text: "What does the office offer that home does not?" },
        { id: "kasia:return-to-office:opt-3", topicId: "kasia:return-to-office", text: "Tomek negotiated a special arrangement again?" },
        { id: "kasia:return-to-office:opt-4", topicId: "kasia:return-to-office", text: "The memo used the word 'synergy' twice." },
        { id: "kasia:return-to-office:opt-5", topicId: "kasia:return-to-office", text: "Attendance went up after the coffee machine fix." },
        { id: "kasia:return-to-office:opt-6", topicId: "kasia:return-to-office", text: "Honestly, is hybrid here to stay?" },
      ],
      replyCandidates: [
        {
          id: "kasia:return-to-office:rep-1",
          text: "It is 'strongly encouraged', which is corporate for 'please, but we trust you'. The office works because it is chosen, not patrolled. I track attendance like weather, not like attendance: patterns, seasons, and one storm named Tomasz every Monday.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:return-to-office:rep-2",
          text: "Other people, mostly. The wifi is fine at home, the chair is yours, but the rubber duck cannot nod at you through a screen. Every big idea this year started within four meters of the coffee machine. The building is a collaboration device with a roof.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:return-to-office:rep-3",
          text: "He did, in writing, with a clause about 'air quality and interruption budgets'. It is somehow airtight. Dawid countersigned. The rest of us follow the normal memo and Tomek follows his own tiny constitution. The constitution works. I have checked.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:return-to-office:rep-4",
          text: "That was Maciek's edit and I let it live, because every memo needs one word people can bond over disliking. Synergy is the office's pet word: harmless, fuzzy, slightly warm. I removed the third one. There are limits. The memo had dignity left to defend.",
          relationshipHint: "pleased",
          tags: ["quest:ceo-met"],
        },
        {
          id: "kasia:return-to-office:rep-5",
          text: "Attendance rose nine percent and not a single person credited the memo. They came for the machine, stayed for the gossip, and scheduled their next day from the kitchen. Culture is logistics wearing a mission statement. I fix the logistics. The mission follows.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:return-to-office:rep-6",
          text: "Hybrid is not a policy, it is a truce, and truces hold while both sides keep talking. My job is keeping the conversation boring and functional: fair rotation, honest calendars, a kitchen worth the trip. Stability through maintenance. That is the whole doctrine.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:recommendation-letters",
      label: "Recommendation letters",
      optionCandidates: [
        { id: "kasia:recommendation-letters:opt-1", topicId: "kasia:recommendation-letters", text: "A leaver asked for a recommendation letter." },
        { id: "kasia:recommendation-letters:opt-2", topicId: "kasia:recommendation-letters", text: "How honest are the letters you write?" },
        { id: "kasia:recommendation-letters:opt-3", topicId: "kasia:recommendation-letters", text: "Tomek was asked for a reference and panicked." },
        { id: "kasia:recommendation-letters:opt-4", topicId: "kasia:recommendation-letters", text: "The letter template is older than most staff?" },
        { id: "kasia:recommendation-letters:opt-5", topicId: "kasia:recommendation-letters", text: "Can I see the letter written about me?" },
        { id: "kasia:recommendation-letters:opt-6", topicId: "kasia:recommendation-letters", text: "Renata writes the warmest openings?" },
      ],
      replyCandidates: [
        {
          id: "kasia:recommendation-letters:rep-1",
          text: "Then they get one, on letterhead, within three days, because leavers carry our name into the world like seeds. I have written sixty-one. Three came back framed, one came back as a wedding invitation plus-one, and that is the real metric of this job.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:recommendation-letters:rep-2",
          text: "True, warm, and specific, in that order. 'Reliable' is furniture; 'rebuilt the backup routine during a flood week' is a person. Nobody has ever disputed a fact in my letters. I once spent an hour finding the exact right verb. The verb was 'quietly'.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:recommendation-letters:rep-3",
          text: "He wrote six drafts of four sentences. The final letter said the person 'debugs calmly under pressure' and the recipient framed it. Tomasz believes praise should be scarce to stay valuable, and his scarcity pricing works. His references read like verdicts.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "kasia:recommendation-letters:rep-4",
          text: "The skeleton predates me, and I keep the bones while updating the flesh. Some phrases are heirlooms: 'a credit to any team' has survived four logo changes. Documents age like people. You keep the spine, refresh the stories, and re-sign the soul.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:recommendation-letters:rep-5",
          text: "You may, and most people are changed by it. Letters say the things we think but never say at the coffee machine. One colleague cried at the word 'steadying'. Bring tissues or bravado. The file is in the second cabinet, alphabetized like everything that matters.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:recommendation-letters:rep-6",
          text: "Her openings should be studied. 'Some people hold an office together quietly' has launched three careers and one LinkedIn post that went mildly viral. I write the facts and Renata writes the weather. Together, the letters are complete human beings.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:fruit-tuesday",
      label: "Fruit Tuesday",
      optionCandidates: [
        { id: "kasia:fruit-tuesday:opt-1", topicId: "kasia:fruit-tuesday", text: "The fruit basket arrived early today." },
        { id: "kasia:fruit-tuesday:opt-2", topicId: "kasia:fruit-tuesday", text: "Why Tuesday for the fruit delivery?" },
        { id: "kasia:fruit-tuesday:opt-3", topicId: "kasia:fruit-tuesday", text: "Nobody eats the kiwis. Ever." },
        { id: "kasia:fruit-tuesday:opt-4", topicId: "kasia:fruit-tuesday", text: "Grazyna counted the apples against the invoice?" },
        { id: "kasia:fruit-tuesday:opt-5", topicId: "kasia:fruit-tuesday", text: "Does Burek get something from the basket?" },
        { id: "kasia:fruit-tuesday:opt-6", topicId: "kasia:fruit-tuesday", text: "Should we vote on the fruit selection?" },
      ],
      replyCandidates: [
        {
          id: "kasia:fruit-tuesday:rep-1",
          text: "The early basket means the driver wants to beat the school traffic, and it means fruit before ten, which is a luxury civilization barely deserves. I put the best apples out at eye level. Presentation is half of nutrition. The other half is Tuesday.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "kasia:fruit-tuesday:rep-2",
          text: "Monday is chaos and Friday is hope, so Tuesday is the only day fruit can save. Midweek morale dips at eleven, and an orange at eleven is worth a workshop at two. The science is mine. The science is uncontested because nobody else studied it.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:fruit-tuesday:rep-3",
          text: "The kiwis are a four-year experiment in optimism. Every week I order fewer, and every week they remain. Someone is eating them in secret, with a spoon, like a criminal of vitamins. I will find them. The kiwis and I have time.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:fruit-tuesday:rep-4",
          text: "She counted, found fourteen apples against fourteen invoiced, and gave the basket a clean audit with a small smile. That smile is the highest praise the fruit budget ever received. I keep the audit next to the contract. The basket is ISO certified, spiritually.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "kasia:fruit-tuesday:rep-5",
          text: "Burek gets the apple core if it is clean and the ceremony is respected. Renata supervises. He takes it to his spot under the meeting table and eats it in complete silence, like a tiny board meeting. The fruit budget includes one apple of diplomacy.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "kasia:fruit-tuesday:rep-6",
          text: "We voted once. Democracy chose mango, logistics said no, and the mango faction has never forgiven the spreadsheet. Fruit by vote is how you get a basket of grudges. I curate instead, quietly, and accept complaints at the coffee machine like a monarch.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "kasia:eyesight-vouchers",
      label: "The eyesight vouchers",
      optionCandidates: [
        { id: "kasia:eyesight-vouchers:opt-1", topicId: "kasia:eyesight-vouchers", text: "What is the deal with the eyesight voucher benefit?" },
        { id: "kasia:eyesight-vouchers:opt-2", topicId: "kasia:eyesight-vouchers", text: "Nobody has redeemed the glasses voucher in a year." },
        { id: "kasia:eyesight-vouchers:opt-3", topicId: "kasia:eyesight-vouchers", text: "Can the voucher cover blue-light lenses?" },
        { id: "kasia:eyesight-vouchers:opt-4", topicId: "kasia:eyesight-vouchers", text: "Marek got safety glasses through it?" },
        { id: "kasia:eyesight-vouchers:opt-5", topicId: "kasia:eyesight-vouchers", text: "The optician is next to the bank Grazyna loves." },
        { id: "kasia:eyesight-vouchers:opt-6", topicId: "kasia:eyesight-vouchers", text: "Should I get my eyes checked at all?" },
      ],
      replyCandidates: [
        {
          id: "kasia:eyesight-vouchers:rep-1",
          text: "It is the oldest benefit in the folder and the most forgotten, which breaks my heart annually. One voucher, one optician, one form with three fields. People fight for standing desks and ignore their own retinas. I mention it in every onboarding, like a prophecy.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:eyesight-vouchers:rep-2",
          text: "Eleven months, zero redemptions, then Marek went for a routine check and came back with a prescription and a new personality. Since then, four people a quarter go. Word of mouth beats every memo. I should market benefits through gossip exclusively.",
          relationshipHint: "annoyed",
        },
        {
          id: "kasia:eyesight-vouchers:rep-3",
          text: "They can, with a note from the optician, which is the optician's way of saying 'screens are your whole life, child'. The form has a box for 'display equipment'. Everyone qualifies. Nobody believes they qualify. The box stays empty and my sigh stays load-bearing.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:eyesight-vouchers:rep-4",
          text: "He did, for server room work, and they are the most respected glasses in the building. Tomasz borrowed them once to read a serial number and returned them in silence, like a knight returning a borrowed sword. The voucher bought office lore. Worth every cent.",
          relationshipHint: "delighted",
        },
        {
          id: "kasia:eyesight-vouchers:rep-5",
          text: "They share a street and occasionally a queue, which produces my favorite crossover episode: Grazyna auditing receipts while holding an eyechart brochure. Benefit errands that stack save everyone a trip. I plan the geography of wellness like a small city.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:eyesight-vouchers:rep-6",
          text: "Yes, especially if you squint at the monitor and call it 'zooming with your face'. Eyes decline politely, quietly, like good employees. The check is free, the voucher is funded, and the answer to every future headache might be sitting in a drawer I already paid for.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "kasia:job-title-audit",
      label: "The job title audit",
      optionCandidates: [
        { id: "kasia:job-title-audit:opt-1", topicId: "kasia:job-title-audit", text: "Someone put 'JavaScript Ninja' on a form." },
        { id: "kasia:job-title-audit:opt-2", topicId: "kasia:job-title-audit", text: "What is my actual job title in the system?" },
        { id: "kasia:job-title-audit:opt-3", topicId: "kasia:job-title-audit", text: "Maciek added 'Visionary' to his signature." },
        { id: "kasia:job-title-audit:opt-4", topicId: "kasia:job-title-audit", text: "Klaudia wants 'Chief Vibes Officer' on LinkedIn." },
        { id: "kasia:job-title-audit:opt-5", topicId: "kasia:job-title-audit", text: "Does the payroll system care about titles?" },
        { id: "kasia:job-title-audit:opt-6", topicId: "kasia:job-title-audit", text: "What is the best real job title here?" },
      ],
      replyCandidates: [
        {
          id: "kasia:job-title-audit:rep-1",
          text: "The Ninja incident gave us the audit, so in a way the Ninja is a founder. The form now has a field for 'title as written' and 'title as paid', and the gap between them is where egos go to stretch. I file both. I judge neither. Out loud.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:job-title-audit:rep-2",
          text: "The system holds the legal truth and the website holds the poetry, and my job is keeping the dictionary between them. Ask me quietly and I will read you your system title. It is shorter than your LinkedIn and somehow more you.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:job-title-audit:rep-3",
          text: "He added it, Grazyna asked whether Visionary draws a salary line, and the signature was revised by lunch. That is our system of checks: every title must survive contact with the ledger. Visionary survives as a footnote. Footnotes are where CEOs keep their hobbies.",
          relationshipHint: "pleased",
          tags: ["quest:ceo-met"],
        },
        {
          id: "kasia:job-title-audit:rep-4",
          text: "Denied, gently, with a counteroffer: 'Content and Culture Lead', which is what she does when the cameras are off anyway. She tested both on her audience and the audience chose the real one. Truth won a popularity contest. I framed the poll.",
          relationshipHint: "pleased",
        },
        {
          id: "kasia:job-title-audit:rep-5",
          text: "Payroll cares about numbers; titles are theater until they touch money. The moment a title implies a raise it leaves the theater and enters my spreadsheet. Everything else is identity play, which I support within the boundaries of the alphabet.",
          relationshipHint: "neutral",
        },
        {
          id: "kasia:job-title-audit:rep-6",
          text: "Officially: 'Head of Morale', held by a dog. Unofficially: Janusz's 'building custodian', which he did not choose and perfectly fits. The dog holds the title without a contract; the man holds the building without one. The audit has a sense of humor. I feed it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
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
    {
      id: "kasia:task-away-day",
      title: "The away-day schedule",
      description: "One page, three slots, one lunch, and every name needs a job and a break. Introverts get the walk, extroverts get the whiteboard, nobody gets a trust fall. Plan it like a census and Kasia will run it like a diplomat. The away day lives or dies on the schedule page.",
      flagToSet: "kasia-away-day-planned",
      rewardHint: "+HR's red pen, holstered",
    },
  ],
};

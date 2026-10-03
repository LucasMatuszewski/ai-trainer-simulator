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

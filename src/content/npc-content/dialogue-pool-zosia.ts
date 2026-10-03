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
    {
      id: "zosia:one-on-ones",
      label: "The one-on-one mythology",
      optionCandidates: [
        {
          id: "zosia:one-on-ones:opt-1",
          topicId: "zosia:one-on-ones",
          text: "Why are one-on-never canceled but one-on-ones always moved?",
        },
        {
          id: "zosia:one-on-ones:opt-2",
          topicId: "zosia:one-on-ones",
          text: "Can we have our one-on-one while walking?",
        },
        {
          id: "zosia:one-on-ones:opt-3",
          topicId: "zosia:one-on-ones",
          text: "You wrote 'alignment: strong' about me again.",
        },
        {
          id: "zosia:one-on-ones:opt-4",
          topicId: "zosia:one-on-ones",
          text: "What actually happens in your one-on-one with Dawid?",
        },
        {
          id: "zosia:one-on-ones:opt-5",
          topicId: "zosia:one-on-ones",
          text: "I want to talk about something real for once.",
        },
        {
          id: "zosia:one-on-ones:opt-6",
          topicId: "zosia:one-on-ones",
          text: "Who invented the thirty-minute slot?",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:one-on-ones:rep-1",
          text: "Because the one-on-one is load-bearing and I will not have you learning that from a calendar observation. It moves because it MUST, and it must because it is the only half hour where the org chart goes quiet. Cancel it twice and the third meeting is a resignation letter with better fonts. I hold these things together with recurring events. It is scaffolding all the way down.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:one-on-ones:rep-2",
          text: "Walking one-on-ones are for managers who fear eye contact. I, however, have discovered that movement produces honesty, so yes — but the route matters. Around the block, not the parking lot. The parking loop has been associated with bad news since 2022 and I am not rebuilding that association. The block has coffee at the end. Everything important ends with coffee.",
          relationshipHint: "delighted",
          tags: ["period:afternoon"],
        },
        {
          id: "zosia:one-on-ones:rep-3",
          text: "You are supposed to see it. The phrase means 'this person tells me things before they become incidents', and it is the highest score my private rubric awards. The rubric has four values: strong, fine, quiet — which is a warning — and 'HR', which is a genre. You are strong. Keep telling me things before they are interesting.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:one-on-ones:rep-4",
          text: "Fifteen minutes of him describing the graph and fifteen minutes of me describing the people, and then we compare notes like two weather stations. He tracks the numbers going up; I track who is holding them up. The overlap is the actual company. It is the most honest meeting I attend and it happens in a corridor because his calendar is a hostage situation.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:one-on-ones:rep-5",
          text: "Then close the laptop, because the laptop is where real things go to become notes. I cannot promise action — I stopped promising that years ago and everyone trusted me more — but I can promise the thing stays between us until YOU say otherwise. That is the one policy I have never put in a handbook. Handbooks leak. Conversations with me do not.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "zosia:one-on-ones:rep-6",
          text: "Nobody invented it. It emerged, like the printer's retirement and Bruce. Thirty is the maximum you can hold someone's career in a room without a slide deck, and the minimum that qualifies as respect. Twenty-five feels like a performance review, forty feels like a podcast. Thirty is the exact weight of being managed. The calendar knows things, is what I am saying.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "zosia:perf-reviews",
      label: "Performance review season",
      optionCandidates: [
        {
          id: "zosia:perf-reviews:opt-1",
          topicId: "zosia:perf-reviews",
          text: "When is performance review season?",
        },
        {
          id: "zosia:perf-reviews:opt-2",
          topicId: "zosia:perf-reviews",
          text: "Who writes my review — you or Kasia?",
        },
        {
          id: "zosia:perf-reviews:opt-3",
          topicId: "zosia:perf-reviews",
          text: "The review form has a 'vision' section.",
        },
        {
          id: "zosia:perf-reviews:opt-4",
          topicId: "zosia:perf-reviews",
          text: "Grazyna attached the coffee spend to my review.",
        },
        {
          id: "zosia:perf-reviews:opt-5",
          topicId: "zosia:perf-reviews",
          text: "Can a review ever change my salary?",
        },
        {
          id: "zosia:perf-reviews:opt-6",
          topicId: "zosia:perf-reviews",
          text: "What did Tomek's review actually say?",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:perf-reviews:rep-1",
          text: "Twice a year, officially, and continuously, unofficially — I review everyone every day, I just do not invoice it. The formal season is theater with a deadline: the form is due Friday, the calibration is Monday, and by Tuesday everyone has been 'exceeding expectations' since October. The document lags the truth by roughly a quarter. Keep your receipts.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:perf-reviews:rep-2",
          text: "I draft, Kasia translates me into HR, and Grazyna verifies that no adjective implies money. It is a three-body system and the output is a document everyone signs and nobody reads, which is the correct outcome. The READING happened months earlier, in a kitchen, over coffee. The form just notarizes the conversation. Notaries are important. Ask any invoice.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:perf-reviews:rep-3",
          text: "Write one sentence containing the word 'momentum' and you will pass the section. The vision section is not about your vision — it is about your willingness to hold a vision, the way holding a ladder is a contribution to roof repair. I have read four hundred vision statements. The good ones were all secretly about the roadmap. Which nobody reads. The system is a circle. It…",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:perf-reviews:rep-4",
          text: "She did that to Marek in 2022 and he now drinks EXACTLY eight cups, auditable, in a mug he brought from home. That is what a Grazyna attachment does — it does not judge, it OPTIMIZES. Yours will say 'hydration within band'. You will frame it one day. Everyone frames their first Grazyna note. It is basically a knighthood with a spreadsheet.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "zosia:perf-reviews:rep-5",
          text: "A review can change a salary the way a horoscope can change a Tuesday: through belief, timing, and a committee that meets quarterly in a room that does not exist. The honest path to money is a competing offer, and the honest version of that sentence is between us. My job in review season is to make sure the good people ask. Consider yourself asked.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "zosia:perf-reviews:rep-6",
          text: "'Turns incidents into education at volume.' It is the kindest sentence I have ever put in a form, and every word of it survived legal, Kasia, and one very tense calibration. Tomek cried, which he will deny. The form is laminated somewhere. I deny the lamination. Reviews are where this company keeps its affection. It is a strange filing system but nothing has ever been lost.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:day3-tomek-done"],
        },
      ],
    },
    {
      id: "zosia:job-fairs",
      label: "The job fair circuit",
      optionCandidates: [
        {
          id: "zosia:job-fairs:opt-1",
          topicId: "zosia:job-fairs",
          text: "Why is our job fair booth always next to the coffee sponsor?",
        },
        {
          id: "zosia:job-fairs:opt-2",
          topicId: "zosia:job-fairs",
          text: "Przemek promised a candidate a robot again.",
        },
        {
          id: "zosia:job-fairs:opt-3",
          topicId: "zosia:job-fairs",
          text: "What is the pitch for our stand, in one sentence?",
        },
        {
          id: "zosia:job-fairs:opt-4",
          topicId: "zosia:job-fairs",
          text: "Klaudia filmed the whole fair for content.",
        },
        {
          id: "zosia:job-fairs:opt-5",
          topicId: "zosia:job-fairs",
          text: "We ran out of flyers by eleven again.",
        },
        {
          id: "zosia:job-fairs:opt-6",
          topicId: "zosia:job-fairs",
          text: "Do job fairs actually work?",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:job-fairs:rep-1",
          text: "Because I booked the stand BEFORE the floor plan came out and the coffee sponsor books first, every year, since forever. It looks like strategy and it is actually seniority: I have attended more fairs than the sponsor has existed. The queue for coffee IS our queue. Gravity favors the patient. Also I bring the good pens, and word travels.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:job-fairs:rep-2",
          text: "He did, and the candidate is now in onboarding, and the robot is element two of three, and I have decided this is Przemek's problem to service forever. The man sold a Roomba to a bright graduate as a career path. The graduate is thriving. Honestly, the hiring funnel in this country is so broken that a robot promise ranks as generous. I have notes for the conference.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:job-fairs:rep-3",
          text: "'We teach people, we ship software, and nobody here has died of a meeting.' Three clauses, nine words of substance, and the third one does the selling — every candidate has survived a meeting culture and they flinch at the word alignment. The flinch is the hook. The honest sentence is the net. I have hired eleven people off that sentence and kept ten.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:job-fairs:rep-4",
          text: "She did, and the fair's own social team asked to license her footage, which is the first time in history the booth earned more attention than the coffee. I let her. The employer brand is a garden and she is the loudest watering can we own. My only condition was the values poster in frame. It got eleven seconds. The poster has a fan account now.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "zosia:job-fairs:rep-5",
          text: "Flyers are a proxy metric: they run out when the pitch works and survive when it does not. We reprint at the venue, at a price that offends Grazyna from two hundred kilometers away, and the reprinted batch gets a typo that becomes a collector's item. The 'We beleive in training' flyer of 2023 is in the storage room. Framed. Przemek signed it.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:job-fairs:rep-6",
          text: "Job fairs are three percent hiring and ninety-seven percent intelligence gathering: you learn what competitors promise, what graduates fear, and which buzzwords have gone hollow since spring. The hires are a bonus. The map is the product. Every company that skips the fair is navigating with last year's map, and last year's map still says blockchain.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "zosia:dariusz",
      label: "The Dariusz file",
      optionCandidates: [
        {
          id: "zosia:dariusz:opt-1",
          topicId: "zosia:dariusz",
          text: "Who is Dariusz? His name is on every old calendar.",
        },
        {
          id: "zosia:dariusz:opt-2",
          topicId: "zosia:dariusz",
          text: "Does Dariusz still have a one-on-one slot?",
        },
        {
          id: "zosia:dariusz:opt-3",
          topicId: "zosia:dariusz",
          text: "Kasia says his candidate file is still open.",
        },
        {
          id: "zosia:dariusz:opt-4",
          topicId: "zosia:dariusz",
          text: "Was Dariusz real, or is this an office legend?",
        },
        {
          id: "zosia:dariusz:opt-5",
          topicId: "zosia:dariusz",
          text: "Grazyna carries him as a cost center.",
        },
        {
          id: "zosia:dariusz:opt-6",
          topicId: "zosia:dariusz",
          text: "What would you tell him if he came back?",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:dariusz:rep-1",
          text: "Dariusz was, and in some calendar systems remains, the office's first employee who was not a founder. His recurring events are still in the system because nobody has ever had the courage to delete a man whose series is marked 'never ends'. Janusz dusts his old desk. Burek sleeps near it. The building has decided he is folklore, and folklore does not resign.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:dariusz:rep-2",
          text: "Tuesdays at two, the slot nobody books because the slot is not VACANT, it is MONUMENTAL. I inherited the calendar with the slot and the slot with the warning: 'holds the room'. Superstition, obviously. But the Tuesday two pm slot has never once had a bad meeting in eleven years, and I am not the manager who experiments with that record.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:dariusz:rep-3",
          text: "Of course it is open. Kasia's filing has two states: hired and future network, and Dariusz is technically both, which makes him the most successful candidate in company history. She refreshes his file quarterly. It is either tribute or compliance, and with Kasia the two are the same thing with different fonts.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "zosia:dariusz:rep-4",
          text: "I met him. Once, at the train station, in 2015, when he was already a legend and I was new enough to ask. He signed my onboarding form in the space marked 'manager' and told me the one rule: 'the printer decides'. I have built an entire management philosophy on a sentence I cannot verify. The philosophy works. That is verification enough.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "zosia:dariusz:rep-5",
          text: "As 'legacy alignment', forty zloty a month, unchanged since 2015. I once asked what it covers. She said 'calendar continuity'. I asked again. She showed me the spreadsheet cell and the cell has a comment that just says 'do not'. Grazyna's 'do not' is the most expensive words in this building and I respect them like a fire door.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:dariusz:rep-6",
          text: "Nothing. You do not disturb a man who left perfectly. His one-on-one slot holds, his file stays open, and his rule governs the printer. If he walked in tomorrow I would offer him coffee, his old desk, and a standup invite, and he would decline all three, because that is what perfect timing does — it leaves before the story needs it. The story does not need him. It keeps…",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "zosia:meetings",
      label: "The meeting taxonomy",
      optionCandidates: [
        {
          id: "zosia:meetings:opt-1",
          topicId: "zosia:meetings",
          text: "What is the difference between a sync and a standup?",
        },
        {
          id: "zosia:meetings:opt-2",
          topicId: "zosia:meetings",
          text: "Why does every meeting here start five minutes late?",
        },
        {
          id: "zosia:meetings:opt-3",
          topicId: "zosia:meetings",
          text: "Can I decline a meeting without consequences?",
        },
        {
          id: "zosia:meetings:opt-4",
          topicId: "zosia:meetings",
          text: "The all-hands ran ninety minutes. Again.",
        },
        {
          id: "zosia:meetings:opt-5",
          topicId: "zosia:meetings",
          text: "What is a 'working session', really?",
        },
        {
          id: "zosia:meetings:opt-6",
          topicId: "zosia:meetings",
          text: "How do you end a meeting that will not end?",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:meetings:rep-1",
          text: "A standup is standing, which caps it at fifteen minutes because legs are the original time management tool. A sync is sitting, which means it can breathe — it is where the things standups discovered go to become plans. And a sync about a sync is called a retrospective and is legally required to end with snacks. The taxonomy holds. It has survived three CEOs.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:meetings:rep-2",
          text: "The five minutes are not lateness, they are ARRIVAL RITUAL — coffee procurement, chair negotiation, and one piece of gossip that would otherwise derail the agenda. I have budgeted for it. Every invite I send says 10:00 when I mean 10:05, a practice I learned from trains and I am not ashamed of. Punctuality is a system, not a virtue. I run systems.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:meetings:rep-3",
          text: "Declining is free exactly once. The first decline teaches people you have a calendar with opinions, and opinions get consulted. The second decline needs a delegate or a reason, and 'focus' is not a reason, it is a mood. Send a proxy who takes real notes and the decline becomes a promotion — you were too important, which is the only version of absent that compounds.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:meetings:rep-4",
          text: "The all-hands has a fixed half hour of content and an unbounded tail of questions, and the tail is where the actual culture lives, so I let it run. Cutting the tail buys you thirty minutes and costs you the trust that makes the first thirty work. Dawid gets visibly hungry at minute sixty. That is the real clock. Nobody has ever scheduled past his stomach.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:meetings:rep-5",
          text: "A working session is a meeting that admitted it needs a table. Laptops open, decisions made, and no minutes — the minutes ARE the work product. They are the only meetings where I type instead of nod, and the only ones I never dread. Every company should convert ten percent of its syncs to working sessions. The other ninety percent are load-bearing theater. This is known.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:meetings:rep-6",
          text: "The summary sentence. Say 'so we are agreed on three things' and list whatever exists — even two things, even one and a half. A meeting cannot argue with its own summary; it can only adjourn. Then thank the room by name, one name only, chosen for maximum warmth. The meeting ends. The thanked person books the follow-up. That is the machine.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "zosia:values",
      label: "The values workshop",
      optionCandidates: [
        {
          id: "zosia:values:opt-1",
          topicId: "zosia:values",
          text: "Fourteen values is a lot of values.",
        },
        {
          id: "zosia:values:opt-2",
          topicId: "zosia:values",
          text: "Nobody can remember value number twelve.",
        },
        {
          id: "zosia:values:opt-3",
          topicId: "zosia:values",
          text: "The values poster hangs slightly crooked.",
        },
        {
          id: "zosia:values:opt-4",
          topicId: "zosia:values",
          text: "Maciek proposed 'SCALE' as a value.",
        },
        {
          id: "zosia:values:opt-5",
          topicId: "zosia:values",
          text: "The roadmap doc and the values doc — same doc?",
        },
        {
          id: "zosia:values:opt-6",
          topicId: "zosia:values",
          text: "Help me refresh the roadmap. Please. It hurts.",
          tags: ["relationship:warm"],
        },
      ],
      replyCandidates: [
        {
          id: "zosia:values:rep-1",
          text: "Fourteen is the number the workshop produced and the workshop was sacred: two hours, sticky notes, and one intern who wrote 'lunch' and got it voted to the final round. Values are not a list, they are a CENSUS of the room's better selves. Fourteen is what we were that Tuesday. I will not revise the census. The census keeps us honest. Twice a year. Roughly.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:values:rep-2",
          text: "Value twelve is 'ownership without drama' and people forget it because it is the only one that costs something. The other thirteen are personality traits with branding. Twelve is a WORK POLICY. I quote it in exactly one situation — when someone fixes a thing and tells everyone — and the room goes quiet, because value twelve is watching. It is the scariest poster we have.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:values:rep-3",
          text: "The crookedness is infrastructure. Janusz straightens it, the building settles, it goes crooked again by Thursday — a cycle that has run for three years and outlasted two facilities vendors. I declared it 'organic alignment' in a meeting and now it is policy. The poster breathes. The values breathe. Nothing in this office that is truly alive hangs straight.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "zosia:values:rep-4",
          text: "Maciek proposes 'SCALE' for everything. It was a value, a buzzword, a slide, and almost a child's name in 2023. I veto it in the values context because values must be VERBS you can do on a Tuesday, and you cannot do scale on a Tuesday. You can do momentum. You can do ownership without drama. Scale is what happens while you are busy doing those. I have said this to his face.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:values:rep-5",
          text: "They share a font, a folder, and a spiritual advisor, but no — the values doc says who we are and the roadmap says when we will admit who we are. Both are refreshed annually, both are read by nobody, and both are load-bearing, which is the deepest truth about documents in this office: their job is to EXIST. Reading them is a bonus feature. Existing is the product.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:values:rep-6",
          text: "Sit down. This is the conversation the values workshop was too sacred to have. The roadmap needs a co-author with fresh eyes and no memory of which quarter betrayed us. You bring the optimism, I bring the recurring events, and together we write a document the next person will refuse to update. That is legacy. Bring coffee Thursday. Bring two.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
          offersTaskId: "zosia:task-roadmap",
        },
      ],
    },
    {
      id: "zosia:crisis",
      label: "Crisis communications",
      optionCandidates: [
        {
          id: "zosia:crisis:opt-1",
          topicId: "zosia:crisis",
          text: "The coffee machine died mid-bootcamp. What is the protocol?",
        },
        {
          id: "zosia:crisis:opt-2",
          topicId: "zosia:crisis",
          text: "A client saw the dashboard all red.",
        },
        {
          id: "zosia:crisis:opt-3",
          topicId: "zosia:crisis",
          text: "Someone leaked the rebrand internally.",
        },
        {
          id: "zosia:crisis:opt-4",
          topicId: "zosia:crisis",
          text: "Tomek's deploy is trending on a client's Slack.",
        },
        {
          id: "zosia:crisis:opt-5",
          topicId: "zosia:crisis",
          text: "What is your crisis rule of thumb?",
        },
        {
          id: "zosia:crisis:opt-6",
          topicId: "zosia:crisis",
          text: "After a crisis — how do you close the loop?",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:crisis:rep-1",
          text: "There is a percolator in a closet with three locks and a coffee protocol older than some marriages. I say the word 'ritual', Janusz says nothing and appears with the percolator, and the bootcamp continues with BETTER coffee than planned. The crisis becomes the story the client tells their board. Every crisis here eventually becomes hospitality. It is our one true gift.",
          relationshipHint: "pleased",
          tags: ["event:event-coffee-broken"],
        },
        {
          id: "zosia:crisis:rep-2",
          text: "Then we walk them past the red dashboard quickly and talk about the green plant next to it. Attention is a budget and I control the venue tour. Marek fixes the actual redness in silence while I narrate the roadmap, which is one sentence long and mostly true. Clients do not remember red. Clients remember whether you flinched. Nobody here flinches. We trained it out decades ago.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:crisis:rep-3",
          text: "You cannot leak a rebrand that was already posted by Klaudia with better lighting. The internal leak was scooped by the company's own channel, which is either a communications failure or the most efficient launch in history, and I have decided it is the second one because the second one requires no apology email. I have written enough apology emails. The drafts folder has…",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:crisis:rep-4",
          text: "Trending is only a crisis if the client learns about it from us last. So: I call their manager, say the words 'known, owned, fix incoming', and Marek materializes with the fix while I am still on pleasantries. The client quotes our response time for a year. Tomek gets a review titled 'turns incidents into education'. We have been here before. The ride is familiar now.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr", "relationship:neutral"],
        },
        {
          id: "zosia:crisis:rep-5",
          text: "Speed beats polish, names beat departments, and coffee beats everything. Say who is on it within the hour, say what you know by end of day, and never let a vacuum fill with theories — theories are more expensive than facts. The message can be three sentences long. The third sentence is always 'more soon'. It is the only promise in business that is always true.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:crisis:rep-6",
          text: "With a retro that produces ONE change, written down, owned by a name. Retros that produce seventeen changes produce zero; the office can digest exactly one improvement per crisis. Then I buy the room a cake labeled 'survived', the label does numbers with the team, and the loop closes with sugar. Crisis management is mostly catering with a calendar.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "zosia:career",
      label: "The blazer story",
      optionCandidates: [
        {
          id: "zosia:career:opt-1",
          topicId: "zosia:career",
          text: "Did you always want to be a manager?",
        },
        {
          id: "zosia:career:opt-2",
          topicId: "zosia:career",
          text: "The blazer — is it a uniform or a choice?",
        },
        {
          id: "zosia:career:opt-3",
          topicId: "zosia:career",
          text: "What were you before this office?",
        },
        {
          id: "zosia:career:opt-4",
          topicId: "zosia:career",
          text: "Ever wanted to quit and open a cafe?",
        },
        {
          id: "zosia:career:opt-5",
          topicId: "zosia:career",
          text: "Who manages the manager?",
        },
        {
          id: "zosia:career:opt-6",
          topicId: "zosia:career",
          text: "What is your five-year plan?",
        },
      ],
      replyCandidates: [
        {
          id: "zosia:career:rep-1",
          text: "I wanted to be the person who knew where things were. The title followed the knowledge like a shadow follows a busy person. Management is not a career, it is a diagnosis — you catch it by being the one who reads the room while everyone else performs to it. Eleven years later I manage a company's worth of rooms. The diagnosis was terminal. The prognosis is excellent.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:career:rep-2",
          text: "The blazer is infrastructure. Bought in 2014 for one client meeting, it has since attended every difficult conversation this company has had, and the shoulders have absorbed things no policy could. It is dry-cleaned quarterly, which Grazyna codes as 'client-facing maintenance'. When I retire, the blazer gets a handover ceremony. I am planning it. There will be a slide.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "zosia:career:rep-3",
          text: "A project manager at a company so large that my entire department was one of forty identical departments. I planned escapes for three years and executed the cleanest one — I identified the smallest office where I could matter most, and I negotiated my way into it by being the only candidate who had read the job description's second paragraph. Nobody reads second paragraphs.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:career:rep-4",
          text: "The cafe fantasy visits every manager by year three, and mine lasted exactly one inventory list. Suppliers, permits, the espresso machine's true price — I ran the numbers on a napkin and the napkin is in my desk as a vaccine. Besides, I already run a cafe. It has desks instead of tables, meetings instead of a menu, and the tip jar is a suggestion box nobody opens.…",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:career:rep-5",
          text: "Dawid manages my direction, the team manages my calendar, and Burek manages my expectations — he is the only one whose feedback cannot be negotiated with. But the honest answer is the suggestion box. I read it weekly. Half of it is about the printer, a quarter is about me, and the quarter about me is the most useful management data this company produces. The box is my boss.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:career:rep-6",
          text: "Year one: get the roadmap refreshed by someone with fresh eyes, which is already in motion. Year two: succession — this office must survive my holiday, which means someone else learns where everything is. Year three through five: teach what I know and stop being the single point of failure, because a manager who cannot be replaced is a manager who cannot be promoted.…",
          relationshipHint: "pleased",
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
    {
      id: "zosia:task-roadmap",
      title: "The roadmap refresh",
      description: "Co-author the quarterly roadmap nobody reads and everybody needs. Zosia brings the recurring events and eleven years of scar tissue; you bring fresh eyes and the courage to ask which quarter betrayed us. The result is a monument the next person will refuse to update. That is legacy.",
      flagToSet: "zosia-roadmap-refresh",
      rewardHint: "+strategic vocabulary, unlocked",
    },
  ],
};

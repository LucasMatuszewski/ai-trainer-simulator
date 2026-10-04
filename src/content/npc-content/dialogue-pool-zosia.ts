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
    {
      id: "zosia:budgets",
      label: "Budget season",
      optionCandidates: [
        { id: "zosia:budgets:opt-1", topicId: "zosia:budgets", text: "Budget season opened this week. Hide me." },
        { id: "zosia:budgets:opt-2", topicId: "zosia:budgets", text: "How do I ask for budget without flinching?" },
        { id: "zosia:budgets:opt-3", topicId: "zosia:budgets", text: "Grazyna asked what problem the budget solves." },
        { id: "zosia:budgets:opt-4", topicId: "zosia:budgets", text: "My budget line is called 'miscellaneous morale'." },
        { id: "zosia:budgets:opt-5", topicId: "zosia:budgets", text: "Can I budget for things that do not exist yet?" },
        { id: "zosia:budgets:opt-6", topicId: "zosia:budgets", text: "The budget doc has a column called 'courage'." },
      ],
      replyCandidates: [
        {
          id: "zosia:budgets:rep-1",
          text: "Then you are already late. Budget season rewards the early and devours the honest. Bring me three numbers: what you need, what you actually need, and the number you can survive with. Grazyna only ever reads the third one, but watching you write them teaches me your character.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:budgets:rep-2",
          text: "You flinch before the sentence, not during it. Lead with the outcome, pause, then say the number like it is a fact about the world. 'The course needs two thousand' lands differently than 'I think maybe two thousand'. Confidence is mostly decimal placement.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:budgets:rep-3",
          text: "Then answer on her terms: one sentence, one measurable thing, no adjectives with feelings. She once approved a standing desk because Marek wrote 'reduces future sick days'. She denied mine because I wrote 'wellbeing'. I have made peace with it. Mostly.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:budgets:rep-4",
          text: "Rename it. Miscellaneous is where budgets go to be audited. Call it 'retention infrastructure' and attach the price of one exit interview. Suddenly it is not morale, it is arithmetic, and arithmetic always passes. This is not cynicism. This is translation.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "zosia:budgets:rep-5",
          text: "That is the entire profession. You budget for the printer that will fail, the chair that will break, and the hire you are not allowed to want yet. Grazyna calls it padding. I call it respecting the future, which arrives here unfunded every single quarter.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:budgets:rep-6",
          text: "Grazyna added it herself in 2021, after approving something brave. It is one zloty wide and nobody has ever claimed it. Ask her about it sometime — she will deny it exists, then smile for the rest of the day. That column is the most human thing in this office.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:zosia-opened-up"],
        },
      ],
    },
    {
      id: "zosia:remote",
      label: "Remote work policy",
      optionCandidates: [
        { id: "zosia:remote:opt-1", topicId: "zosia:remote", text: "Can I work from home on Fridays?" },
        { id: "zosia:remote:opt-2", topicId: "zosia:remote", text: "The remote policy is two pages of the word 'trust'." },
        { id: "zosia:remote:opt-3", topicId: "zosia:remote", text: "Maciek wants everyone back in the office for the vibes." },
        { id: "zosia:remote:opt-4", topicId: "zosia:remote", text: "My home office is a kitchen table. That is the whole office." },
        { id: "zosia:remote:opt-5", topicId: "zosia:remote", text: "Does anyone actually measure remote productivity?" },
        { id: "zosia:remote:opt-6", topicId: "zosia:remote", text: "I am more productive when nobody can find me." },
      ],
      replyCandidates: [
        {
          id: "zosia:remote:rep-1",
          text: "Fridays are already unofficially remote — the office just agrees not to notice. Officially, ask in writing so Kasia can file it, and mention 'focus'. Unofficially: the printer does not follow you home, which is its own argument.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:remote:rep-2",
          text: "Two pages of trust and one paragraph of exceptions. That is how every policy here works: the rule is a poem and the exceptions are the meter. Read the paragraph. It is where the company accidentally tells the truth.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:remote:rep-3",
          text: "He does. The word he used in the leadership meeting was 'serendipity', which means he misses an audience. Offer him one scheduled serendipity a week — a demo slot, an audience, applause — and he will sign anything. Egos are easier to schedule than people.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:remote:rep-4",
          text: "Then your kitchen table is doing more infrastructure work than half our servers. Claim the chair on expenses. Grazyna will deny it, but the denial goes in the file, and the file has a memory. Systems here reward patience, not permission.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:remote:rep-5",
          text: "Nobody measures it, which is why it works. The moment a number exists, people manage the number instead of the work. We tried tracking hours in 2021 and got beautiful dashboards and worse software. The dashboards are still up. Nobody dares delete them.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:remote:rep-6",
          text: "Then you learned the senior lesson early: presence is not contribution. Protect two afternoons a week like a doctor's appointment, put 'deep work' in the calendar so it looks official, and defend them like territory. The work thanks you in deploy velocity.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:evening"],
        },
      ],
    },
    {
      id: "zosia:offsite",
      label: "The team offsite",
      optionCandidates: [
        { id: "zosia:offsite:opt-1", topicId: "zosia:offsite", text: "Is the offsite actually happening this year?" },
        { id: "zosia:offsite:opt-2", topicId: "zosia:offsite", text: "Last year's trust fall is still in my spine." },
        { id: "zosia:offsite:opt-3", topicId: "zosia:offsite", text: "Where would we even go on an offsite?" },
        { id: "zosia:offsite:opt-4", topicId: "zosia:offsite", text: "Kasia proposed a silent retreat. For a team meeting." },
        { id: "zosia:offsite:opt-5", topicId: "zosia:offsite", text: "Can the offsite be one honest meeting instead?" },
        { id: "zosia:offsite:opt-6", topicId: "zosia:offsite", text: "Who pays for the offsite, and may I see the receipts?" },
      ],
      replyCandidates: [
        {
          id: "zosia:offsite:rep-1",
          text: "It is happening because I put it in the budget under the word 'culture', which Grazyna cannot veto without admitting culture is a cost. Destination undecided. My method: pick the place with the fewest stairs, because somewhere on those stairs is where the real conversation happens anyway.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:offsite:rep-2",
          text: "The facilitator is banned, yes. He also broke the projector, two expectations, and one internship. The falls are why every offsite plan since has been reviewed by me, Janusz, and a person holding a first aid certificate. Progress has many forms. That was one of them.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:offsite:rep-3",
          text: "Anywhere with wifi worse than ours, so the laptop excuse dies on arrival, and a kitchen, because teams bond over whoever cooks. The lake cabin in 2022 produced the roadmap refresh, two friendships, and one resignation. Strong return on a rented grill.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:offsite:rep-4",
          text: "Kasia books the retreat every year and I approve it every year, and every year the team talks MORE after the silence than after paintball. Do not ask me why. The quietest day of our year produces the loudest retro. I stopped fighting the data.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:offsite:rep-5",
          text: "No, because an honest meeting needs a deadline and a bus home. The offsite is a machine for extracting truth from people who cannot leave the room. In the office, honesty has a calendar escape. At the offsite, the escape rides home in the same van as the truth.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:offsite:rep-6",
          text: "Grazyna pays, which means she attends, which means the receipts are theater. She itemizes marshmallows. She has a line for 'fire'. She once disputed the cabin's own invoice with the cabin. It is the only company event where the finance report outperforms the event.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],        },
      ],
    },
    {
      id: "zosia:headcount",
      label: "Headcount and the freeze",
      optionCandidates: [
        { id: "zosia:headcount:opt-1", topicId: "zosia:headcount", text: "Is the hiring freeze real or a rumor?" },
        { id: "zosia:headcount:opt-2", topicId: "zosia:headcount", text: "When does the freeze lift? Asking for my workload." },
        { id: "zosia:headcount:opt-3", topicId: "zosia:headcount", text: "Maciek wants to hire two people and a robot." },
        { id: "zosia:headcount:opt-4", topicId: "zosia:headcount", text: "Can I refer someone during the freeze?" },
        { id: "zosia:headcount:opt-5", topicId: "zosia:headcount", text: "The freeze is making my team resent the roadmap." },
        { id: "zosia:headcount:opt-6", topicId: "zosia:headcount", text: "Who decides which jobs count as essential?" },
      ],
      replyCandidates: [
        {
          id: "zosia:headcount:rep-1",
          text: "It is real the way the printer is broken: officially permanent, unofficially negotiable, and everyone's workload quietly absorbs the difference. There is a spreadsheet. The spreadsheet has one green row. Ask me again in the quarter that follows a good invoice.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:headcount:rep-2",
          text: "When the ACME invoice clears, and everyone will pretend that is a coincidence. Headcount here follows revenue with a three-month delay and zero communication. You are not asking for a date. You are asking about the invoice. Smart.",
          relationshipHint: "neutral",
          tags: ["quest:got-acme-contract"],        },
        {
          id: "zosia:headcount:rep-3",
          text: "He does, every quarter, and every quarter the robot line item dies in finance and the two people become one intern. The system self-corrects. My job is to let him dream out loud until the spreadsheet does the veto for me. It is gentler than mine.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:headcount:rep-4",
          text: "Refer them anyway. Kasia keeps a 'future network' folder that has survived three freezes and one acquisition rumor. Referrals during a freeze are just applications with better patience. The folder has a heartbeat. Feed it.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:headcount:rep-5",
          text: "Then say that sentence in the retro, exactly as you said it to me, minus the word 'quietly'. Resentment that stays quiet becomes attrition, attrition becomes a job posting, and job postings are frozen. Loud problems get budgets. That is the whole trick.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:headcount:rep-6",
          text: "Grazyna decides, Dawid influences, and I translate. Essential means: does the absence of this person stop an invoice? Everything else is 'important', which is a different budget with better manners. Cold arithmetic. Also the only arithmetic that ever hired anyone.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "zosia:book-club",
      label: "The leadership book club",
      optionCandidates: [
        { id: "zosia:book-club:opt-1", topicId: "zosia:book-club", text: "Is the leadership book club still meeting?" },
        { id: "zosia:book-club:opt-2", topicId: "zosia:book-club", text: "We have been on chapter three for a month." },
        { id: "zosia:book-club:opt-3", topicId: "zosia:book-club", text: "Which business book would you actually recommend?" },
        { id: "zosia:book-club:opt-4", topicId: "zosia:book-club", text: "Maciek quotes the book wrong every meeting." },
        { id: "zosia:book-club:opt-5", topicId: "zosia:book-club", text: "Can we read fiction instead, just once?" },
        { id: "zosia:book-club:opt-6", topicId: "zosia:book-club", text: "The book club has become a second status meeting." },
      ],
      replyCandidates: [
        {
          id: "zosia:book-club:rep-1",
          text: "Meeting, thriving, and undefeated by resignation. Three chapters a month, one hour, and attendance is voluntary in the way the values workshop was voluntary. Read the first chapter and steal one sentence for your next review. That is the entire curriculum.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:book-club:rep-2",
          text: "Chapter three is where books go to die. It is the exact page where authors run out of anecdotes and start inventing frameworks. We have been stuck there since spring. I blame the framework. The club blames the quarter. Nobody blames the chapter.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:book-club:rep-3",
          text: "'The Goal'. It is a novel where the hero saves a factory one bottleneck at a time, and it is the only business book that respects you enough to have a plot. Everything else here is a keynote in a hardcover. Read it on the tram and come back dangerous.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:book-club:rep-4",
          text: "He does, and the club corrects him with the gentleness of a footnote. Last month he attributed 'circle of influence' to himself. We let him have it. The man once pitched a client using a quote from our own roadmap. Community theater needs its lead.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:book-club:rep-5",
          text: "Once, for me, yes. I have campaigned for a novel since 2022. My argument: half of management is predicting what people want before they say it, and that is called literature. The club voted for a book about shrimp. There is always next year.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:book-club:rep-6",
          text: "Then we fix the format, not the club. Status updates are banned, phones go in the bowl by the door, and the only agenda is one page nobody prepared. A book club that produces status was never a book club. It was a meeting wearing a cardigan.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral", "period:afternoon"],
        },
      ],
    },
    {
      id: "zosia:linkedin",
      label: "Zosia on LinkedIn",
      optionCandidates: [
        { id: "zosia:linkedin:opt-1", topicId: "zosia:linkedin", text: "You post on LinkedIn now. Since when?" },
        { id: "zosia:linkedin:opt-2", topicId: "zosia:linkedin", text: "Your post about meeting hygiene went viral." },
        { id: "zosia:linkedin:opt-3", topicId: "zosia:linkedin", text: "Klaudia offered to manage your personal brand." },
        { id: "zosia:linkedin:opt-4", topicId: "zosia:linkedin", text: "Do you actually believe your own posts?" },
        { id: "zosia:linkedin:opt-5", topicId: "zosia:linkedin", text: "Please write fewer posts. For all of us." },
        { id: "zosia:linkedin:opt-6", topicId: "zosia:linkedin", text: "What is your engagement strategy, honestly?" },
      ],
      replyCandidates: [
        {
          id: "zosia:linkedin:rep-1",
          text: "Since the rebrand agency asked for 'executive presence' and I discovered I already had opinions with no outlet. LinkedIn is where managers go to say the true thing slightly too loudly. I post at nine, I regret it by ten, and the metrics forgive everything.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:linkedin:rep-2",
          text: "It did, and HR asked me to write a follow-up about boundaries, which is the funniest request this office has produced. The post took eleven minutes. The comment section has taken years off my life. Engagement is a loan you repay in dignity.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:linkedin:rep-3",
          text: "She did, with a ring light and a content calendar. I declined, then watched her reel about my decline outperform my actual post by four hundred percent. The lesson cost me nothing and I think about it daily. The algorithm prefers whoever agrees to be filmed.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral", "period:afternoon"],        },
        {
          id: "zosia:linkedin:rep-4",
          text: "The posts are ninety percent true and one hundred percent confident, which is the standard ratio. The method: write the thing you would whisper at the coffee machine, remove the names, add a lesson. That is thought leadership. That is all it is.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:linkedin:rep-5",
          text: "I post once a week and the office survives. You consume it voluntarily, the clients quote it in calls, and last quarter it replaced an entire pitch deck. Fewer posts would be kinder to you. That week's post was for the pipeline. We all serve something.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:linkedin:rep-6",
          text: "One true sentence, one number, and the courage to stop typing before the wisdom starts. No hashtags after noon, no engagement bait, and I never punch down — only sideways, at process. It is the same method as the meetings, with a like button as the exit survey.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "zosia:okrs",
      label: "OKRs",
      optionCandidates: [
        { id: "zosia:okrs:opt-1", topicId: "zosia:okrs", text: "Are we doing OKRs now instead of goals?" },
        { id: "zosia:okrs:opt-2", topicId: "zosia:okrs", text: "My OKR has an objective but no key results." },
        { id: "zosia:okrs:opt-3", topicId: "zosia:okrs", text: "Can an OKR just be 'survive the quarter'?" },
        { id: "zosia:okrs:opt-4", topicId: "zosia:okrs", text: "The OKR workshop produced forty objectives." },
        { id: "zosia:okrs:opt-5", topicId: "zosia:okrs", text: "Who reads the OKRs after the workshop ends?" },
        { id: "zosia:okrs:opt-6", topicId: "zosia:okrs", text: "Our key result is literally 'feel more aligned'." },
      ],
      replyCandidates: [
        {
          id: "zosia:okrs:rep-1",
          text: "We are doing OKRs the way we do everything: renamed, rebranded, and fulfilled by the same three people. The letter O stands for objective, and nobody here has ever had one. We have moods with deadlines. The framework is fine. The office is the challenge.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:okrs:rep-2",
          text: "Then it is not an OKR, it is a wish with formatting. Key results are the tax you pay for wanting something out loud. Give it two numbers you would be embarrassed to miss, and if you cannot find them, the objective was decoration. Delete it and feel lighter.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:okrs:rep-3",
          text: "Half this company's OKRs are 'survive the quarter' wearing a suit. Mine last year were 'keep the team intact', 'keep the clients calm', and 'keep the printer blamed'. All three hit. No framework survives contact with this office unchanged. That is its charm.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "quest:got-acme-contract"],
        },
        {
          id: "zosia:okrs:rep-4",
          text: "Forty is the workshop's honest output and the quarter's honest capacity is four. I let everyone keep their forty in the doc, where objectives go to be admired. The real four live on my whiteboard, unformatted, and they are all about the printer and one client.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:okrs:rep-5",
          text: "I read them. That is the secret nobody wants: the OKR document has exactly one reader and she is tired. Write for the one reader. If your objective makes me exhale through the nose, it passes. If it makes me schedule a meeting about it, we have both failed.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:okrs:rep-6",
          text: "That key result was mine, and I stand by it. We measured alignment by counting how many decisions needed a follow-up meeting, and the number fell from eleven to two. Feelings are data once you attach them to a count. It is the only slide from that workshop that survived.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "zosia:perks",
      label: "Office perks",
      optionCandidates: [
        { id: "zosia:perks:opt-1", topicId: "zosia:perks", text: "Are we getting the good coffee back as a perk?" },
        { id: "zosia:perks:opt-2", topicId: "zosia:perks", text: "The job ad promised a ping pong table." },
        { id: "zosia:perks:opt-3", topicId: "zosia:perks", text: "Fruit day is Thursday. Why Thursday?" },
        { id: "zosia:perks:opt-4", topicId: "zosia:perks", text: "Can perks count as salary? Asking seriously." },
        { id: "zosia:perks:opt-5", topicId: "zosia:perks", text: "The nap pod from the job ad became a storage rack." },
        { id: "zosia:perks:opt-6", topicId: "zosia:perks", text: "What perk would you add with unlimited budget?" },
      ],
      replyCandidates: [
        {
          id: "zosia:perks:rep-1",
          text: "The good beans are a Grazyna line item that reappears whenever a client visits and vanishes when the invoice does. My negotiation stance: I link the beans to the ACME account in writing. Perks funded by revenue survive longer than perks funded by hope.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],        },
        {
          id: "zosia:perks:rep-2",
          text: "It is in the training room, under the boxes, next to the projector from the offsite. Ping pong was a hiring-year promise from 2022. Renata has the paddles and issues them like weapons. Nobody has played since March, but the table exists, which is what the ad said.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:perks:rep-3",
          text: "Because Thursday is the day morale measurably dips, and the bananas arrive before the dip becomes a conversation. It is not kindness, it is scheduling. Fruit day was invented by a manager who noticed Wednesday is the new Friday and did the math before HR could.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:perks:rep-4",
          text: "They cannot, and I admire the audacity. Legally the beans are not money. Spiritually the beans have been compensation since 2019. Kasia keeps a benefits sheet that treats coffee as culture and Grazyna treats culture as overhead. Between them, a lifestyle.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:perks:rep-5",
          text: "The nap pod was real for six weeks in 2021. Then someone napped through a client call, and the pod became 'flexible storage'. The job ad is written by marketing, the office is written by incidents. Every perk you were promised is a story with a body count.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:perks:rep-6",
          text: "One silence. A room with no roadmap, no values poster, and a door that locks from the inside. Every other perk performs wellness. That one would fund it. I have drafted the proposal three times, and every time Grazyna asks what it produces, and I say 'people who stay'.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "zosia:dog-policy",
      label: "Burek and office policy",
      optionCandidates: [
        { id: "zosia:dog-policy:opt-1", topicId: "zosia:dog-policy", text: "Is Burek an employee or a policy exception?" },
        { id: "zosia:dog-policy:opt-2", topicId: "zosia:dog-policy", text: "Burek attended the budget review. Again." },
        { id: "zosia:dog-policy:opt-3", topicId: "zosia:dog-policy", text: "Can we legally put Burek in the team photo?" },
        { id: "zosia:dog-policy:opt-4", topicId: "zosia:dog-policy", text: "Who is Burek's manager on paper?" },
        { id: "zosia:dog-policy:opt-5", topicId: "zosia:dog-policy", text: "The client asked if the dog is a partner." },
        { id: "zosia:dog-policy:opt-6", topicId: "zosia:dog-policy", text: "Should Burek have an OKR?" },
      ],
      replyCandidates: [
        {
          id: "zosia:dog-policy:rep-1",
          text: "He is infrastructure with a heartbeat. On paper he is 'a visitor with tenure', which is the strangest sentence HR has ever ratified. Kasia keeps his file between two exits, and inside it there is a photo, a vaccination record, and one complaint that was withdrawn.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:dog-policy:rep-2",
          text: "He attends everything that matters. Budget review, the roadmap read-through, the all-hands tail. He has never once blocked a decision and he has ended three arguments by falling asleep on the agenda. Some chairs could learn from his exit strategy.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:dog-policy:rep-3",
          text: "Legally he is not in the photo. Practically he is the center of it, and the last client calendar used him as the header without asking. Our lawyer said 'the dog is fine'. It is the only legal opinion in this building that nobody has quoted back yet.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],        },
        {
          id: "zosia:dog-policy:rep-4",
          text: "On paper, me. In practice, Renata runs his schedule, Janusz handles logistics, and Kasia keeps the file. I sign the form. Burek delegates better than most directors I have met, and he has never once CC'd the whole office on a feeling.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:dog-policy:rep-5",
          text: "Then the client understands our org chart better than the org chart does. Dawid said 'founder emeritus', legal said nothing, and the client renewed. The dog closes deals by being the only one in the room with no forecast. Some sales teams could study him.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:dog-policy:rep-6",
          text: "He has one. It is unwritten and identical every quarter: audit the standup, guard the kitchen, and keep one exhale in reserve for Przemek's forecast. He has never missed it. I review his performance by watching the office survive another quarter.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "zosia:dress-code",
      label: "Dress code",
      optionCandidates: [
        { id: "zosia:dress-code:opt-1", topicId: "zosia:dress-code", text: "Is there a dress code or is it vibes?" },
        { id: "zosia:dress-code:opt-2", topicId: "zosia:dress-code", text: "Client day: blazer or honesty?" },
        { id: "zosia:dress-code:opt-3", topicId: "zosia:dress-code", text: "Tomek wore slides to the board demo." },
        { id: "zosia:dress-code:opt-4", topicId: "zosia:dress-code", text: "Can I wear the hoodie with the old logo?" },
        { id: "zosia:dress-code:opt-5", topicId: "zosia:dress-code", text: "Klaudia wants a branded staff hoodie line." },
        { id: "zosia:dress-code:opt-6", topicId: "zosia:dress-code", text: "Why does everyone dress up when Grazyna visits?" },
      ],
      replyCandidates: [
        {
          id: "zosia:dress-code:rep-1",
          text: "There is a dress code the way there is a roadmap: unwritten, universally felt, and enforced by one raised eyebrow. The rule is 'client visible means human present'. Everything else is a negotiation between your laundry and your calendar.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:dress-code:rep-2",
          text: "Blazer. Not for the client — for you. The blazer is armor that says the invoice is justified. I have watched Bartek close a renewal in that blazer, and I watched it fail exactly once, in August, when the air conditioning did. Wear the blazer. Repair the AC.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:dress-code:rep-3",
          text: "He did, and the board remembered the demo, not the slides. That is the trick nobody admits: one memorable detail outperforms thirty polished ones. I banned nothing. I did schedule his next board demo for a day when I control the room temperature and the seating chart.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:dress-code:rep-4",
          text: "The old logo hoodie is vintage now. Klaudia calls it heritage wear and Marek calls it the one that survived the flood. Wear it. The only dress rule with teeth is client-facing days, and that hoodie has attended more launches than most employees.",
          relationshipHint: "pleased",
          tags: ["quest:klaudia-rebranded-you"],        },
        {
          id: "zosia:dress-code:rep-5",
          text: "She does, with a waitlist. HR says uniforms need a policy, marketing says hoodies ARE the policy, and the design has Burek in a tiny blazer. It is the single most popular proposal this office has ever produced. Kasia is drafting the wording. The dog is the easy part.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:dress-code:rep-6",
          text: "Because Grazyna once sent a junior home to change, in 2018, and the story has done more compliance work than any policy since. She denies it. The denial is part of the ritual. Fear of one accountant outperforms the entire employee handbook, and it is cheaper.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "zosia:party",
      label: "The anniversary party",
      optionCandidates: [
        { id: "zosia:party:opt-1", topicId: "zosia:party", text: "Are we doing an anniversary party this year?" },
        { id: "zosia:party:opt-2", topicId: "zosia:party", text: "Who is on the party committee? Is it just Renata?" },
        { id: "zosia:party:opt-3", topicId: "zosia:party", text: "Last year's party had a speech and a fire alarm." },
        { id: "zosia:party:opt-4", topicId: "zosia:party", text: "Can we skip the speeches this year?" },
        { id: "zosia:party:opt-5", topicId: "zosia:party", text: "The party budget survived Grazyna. How?" },
        { id: "zosia:party:opt-6", topicId: "zosia:party", text: "Is Burek invited to the anniversary party?" },
      ],
      replyCandidates: [
        {
          id: "zosia:party:rep-1",
          text: "It is happening because the office turned ten and Renata started planning in July without asking anyone, which is how every good tradition here was founded. There will be cake, a photo wall, and one speech I will cut to ninety seconds by force.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:party:rep-2",
          text: "It is Renata, with me for budget, Janusz for logistics, and Klaudia self-appointing as documentarian. The committee has no meetings. Renata has a notebook and a look. Things simply get decided. I have stopped investigating and started funding.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:party:rep-3",
          text: "The alarm was Tomek's candle. The candle was a gift. The gift was from the team. I have reviewed the guest list for gifts since. The speech, by contrast, was mine, and it ran fourteen minutes, and only the fire alarm saved us both. Traditions have casualties.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:party:rep-4",
          text: "We cannot. One speech is the tax the party pays for existing. I have optimized it: ninety seconds, three names, no slide. If I go under ninety, Grazyna speaks. Nobody wants that. Her fiscal-year recap once cleared a room at a wedding. Not ours. Still counts.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:party:rep-5",
          text: "I filed it under 'client retention' with the ACME contract attached. Grazyna read the attachment, approved the line, and asked for the photo rights. The party is now a business expense with a DJ. It is this office's greatest diplomatic achievement, and I will never explain it to anyone.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract", "relationship:warm"],
        },
        {
          id: "zosia:party:rep-6",
          text: "He is the guest of honor and he does not know it, which is the correct mindset for any celebration. Renata orders him a steak. Janusz keeps him away from the cake table. Last year he napped through the speeches, which is the review every speaker deserves and none receive.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "zosia:survey",
      label: "The happiness survey",
      optionCandidates: [
        { id: "zosia:survey:opt-1", topicId: "zosia:survey", text: "The happiness survey is open again." },
        { id: "zosia:survey:opt-2", topicId: "zosia:survey", text: "Everyone writes 'fine' in the happiness survey." },
        { id: "zosia:survey:opt-3", topicId: "zosia:survey", text: "Are the survey results anonymous or theater?" },
        { id: "zosia:survey:opt-4", topicId: "zosia:survey", text: "My survey comment mentioned the chairs. HR replied." },
        { id: "zosia:survey:opt-5", topicId: "zosia:survey", text: "What is the best survey answer you ever got?" },
        { id: "zosia:survey:opt-6", topicId: "zosia:survey", text: "Can we survey the clients' happiness instead?" },
      ],
      replyCandidates: [
        {
          id: "zosia:survey:rep-1",
          text: "It is open, it is anonymous, and it takes four minutes, which makes it the fastest meeting in this company's history. Response rate is sixty percent, which in survey terms is a mandate. Read it or do not, but the comments section is where this office tells the truth.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:survey:rep-2",
          text: "'Fine' is not nothing — it is a baseline. I worry when the fines stop. In 2023 everyone wrote 'busy', which took me three weeks and one budget line to decode into 'we need a second intern'. People answer surveys in code. My job is the cipher.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:survey:rep-3",
          text: "Anonymous in the technical sense: I see word clouds, HR sees sentiment, and Kasia sees comments with the names surgically removed. The system has survived two audits and one very specific accusation. The anonymity is real. The word clouds are just judgmental.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "zosia:survey:rep-4",
          text: "Then the system worked. Chairs were budgeted, backs were saved, and one comment changed a real line item. Most survey comments die in a folder. Yours got furniture. That is the return nobody believes until it happens to them. Complain in writing. It is literally how things move here.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:survey:rep-5",
          text: "Someone wrote 'the printer has better job security than me' in 2022. It was funny, it was fair, and it became the retention discussion that unlocked two salaries. The best survey answers are jokes with a budget attached. I read for the punchlines first.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:survey:rep-6",
          text: "We do, quarterly, disguised as a check-in call, and the clients lie more than we do. They write 'all good' while renewing late and paying late. At least the staff survey has a comments section. The client survey is an invoice with feelings. I stopped reading it in 2023.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "zosia:mentorship",
      label: "The mentorship program",
      optionCandidates: [
        { id: "zosia:mentorship:opt-1", topicId: "zosia:mentorship", text: "Is the mentorship program real or a poster?" },
        { id: "zosia:mentorship:opt-2", topicId: "zosia:mentorship", text: "You paired me with Tomek. Was that revenge?" },
        { id: "zosia:mentorship:opt-3", topicId: "zosia:mentorship", text: "What makes a mentor actually work here?" },
        { id: "zosia:mentorship:opt-4", topicId: "zosia:mentorship", text: "My mentor cancelled twice. Is that the program?" },
        { id: "zosia:mentorship:opt-5", topicId: "zosia:mentorship", text: "Can I mentor someone? I have been here a year." },
        { id: "zosia:mentorship:opt-6", topicId: "zosia:mentorship", text: "Who mentors the mentors?" },
      ],
      replyCandidates: [
        {
          id: "zosia:mentorship:rep-1",
          text: "It is real, it is a spreadsheet, and it has produced two careers, one friendship, and one lawsuit threat that turned out to be a joke. The poster came later, designed by Klaudia, approved by nobody. The program is just adults trading time on purpose. It works.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:mentorship:rep-2",
          text: "It was triage. Tomek reviews code the way surgeons review incisions, and you needed a mentor who would not lie to you. Revenge would have paired you with Przemek — he would have taught you forecasting and left you optimistic. Tomek leaves you accurate. You are welcome.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:mentorship:rep-3",
          text: "Time, honesty, and a shared artifact. Every pairing that worked here had a real thing to review — a script, a deck, a forecast. Every pairing that failed was 'monthly chats'. Mentoring over coffee evaporates. Mentoring over a pull request compounds. That is the program.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:mentorship:rep-4",
          text: "Twice is a pattern, three times is a decision. Tell me and I re-pair you within the week — the program has a bench, and the bench has Marek, who has never cancelled anything, including his own wedding rehearsal. Mentors who flake teach flaking. The program survives a swap.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:mentorship:rep-5",
          text: "Yes, and do it before you feel ready. The best mentor here is one year ahead, not ten — the gap is small enough to remember. Pawel was mentored by Marek and now mentors the new intern with the same spreadsheet. The knowledge compounds. That is the point of the office.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:mentorship:rep-6",
          text: "Me, and it is the loneliest part of the job. Dawid listens, Burek does not judge, and once a year I buy a business book I never finish and call it development. If you ever become the person people bring their calendars to, schedule your own mentor before you need one.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:zosia-opened-up"],
        },
      ],
    },
    {
      id: "zosia:calendars",
      label: "The calendar color regime",
      optionCandidates: [
        { id: "zosia:calendars:opt-1", topicId: "zosia:calendars", text: "Why is my calendar one giant wall of color?" },
        { id: "zosia:calendars:opt-2", topicId: "zosia:calendars", text: "I booked a focus block and it got declined." },
        { id: "zosia:calendars:opt-3", topicId: "zosia:calendars", text: "What does a yellow holding event mean?" },
        { id: "zosia:calendars:opt-4", topicId: "zosia:calendars", text: "Can I make my one-on-one recurring?" },
        { id: "zosia:calendars:opt-5", topicId: "zosia:calendars", text: "Dawid's calendar has a slot labeled 'nothing'." },
        { id: "zosia:calendars:opt-6", topicId: "zosia:calendars", text: "The room is double-booked and both parties are me." },
      ],
      replyCandidates: [
        {
          id: "zosia:calendars:rep-1",
          text: "That is not a wall of color, that is an operating system rendered visible. Green is real work, blue is maintenance, orange is meetings I attend so others do not have to. You were added to three greens this quarter. The calendar understands promotion before HR does.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:calendars:rep-2",
          text: "Then someone needed the room more than you needed the illusion of it. Focus blocks are a request, not a force field. The trick is naming: 'deep work' gets declined, 'interview prep' does not. Words are permissions. Choose yours like passwords.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:calendars:rep-3",
          text: "Yellow holding means I am protecting a slot without admitting a topic exists. It is diplomatic immunity for time. When the topic matures, the yellow turns green. When it dies, the yellow dies quietly, unmourned, like most initiatives.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:calendars:rep-4",
          text: "Yes, and make it Tuesday so it survives Monday chaos and Thursday panic. A recurring one-on-one is the only appointment that defends itself. I have series from 2019 still holding walls like loyal soldiers. Promote yours today.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:calendars:rep-5",
          text: "That slot is his actual thinking time and the label is the most honest thing in this building. 'Nothing' has produced half the roadmap. I defend it the way Grazyna defends decimals — reflexively, and without apology.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "zosia:calendars:rep-6",
          text: "Then you are negotiating with yourself, which is the hardest negotiation there is. Accept one instance, decline the other, and you signal compromise at zero cost. This is what I do at family dinners, at scale.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "zosia:fridge-rules",
      label: "The fridge accord",
      optionCandidates: [
        { id: "zosia:fridge-rules:opt-1", topicId: "zosia:fridge-rules", text: "There is a labeled yogurt that is a week old." },
        { id: "zosia:fridge-rules:opt-2", topicId: "zosia:fridge-rules", text: "Who enforces the fridge rules, legally speaking?" },
        { id: "zosia:fridge-rules:opt-3", topicId: "zosia:fridge-rules", text: "Can I leave a birthday cake in the fridge overnight?" },
        { id: "zosia:fridge-rules:opt-4", topicId: "zosia:fridge-rules", text: "Someone's leftovers have achieved sentience." },
        { id: "zosia:fridge-rules:opt-5", topicId: "zosia:fridge-rules", text: "The Friday cleanout happened on Wednesday again." },
        { id: "zosia:fridge-rules:opt-6", topicId: "zosia:fridge-rules", text: "My lunch has a neighbor leaking onto it." },
      ],
      replyCandidates: [
        {
          id: "zosia:fridge-rules:rep-1",
          text: "That yogurt has been formally abandoned. By the accord, Friday noon it becomes office property, and by experience it becomes a biohazard by three. Do not touch it. The yogurt has more seniority than you and the drama is not worth it.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:fridge-rules:rep-2",
          text: "I do, through the accord, and the accord is iron: label it, date it, lose it on Friday. We wrote it after the 2022 tuna incident, which I will not describe on a full stomach. Kasia keeps a copy in the handbook. The handbook keeps a copy in spirit.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:fridge-rules:rep-3",
          text: "Cake gets diplomatic status — it bypasses labels entirely and is guarded by collective interest. I have seen this office steal a sandwich from its owner and defend a stranger's cake all night. The fridge reveals our true values. Ours are dessert-shaped.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:fridge-rules:rep-4",
          text: "Then it graduates to the trash with full honors and no questions, because the accord says nobody interrogates a leftovers departure. Janusz executes quietly. He has removed things from that fridge that legally should have been reported.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:fridge-rules:rep-5",
          text: "Janusz moves it when the week gets crowded, and honestly the cleanout is a state of mind. The accord lives in our hearts now. The fridge is just where we keep the evidence.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:fridge-rules:rep-6",
          text: "Then deploy the barrier shelf — top is drinks, middle is solid food, bottom is chaos. The system has held since 2023 and it will hold today. If your lunch dies, the office buys you a new one. That is not in the accord. That is just what we do.",
          relationshipHint: "pleased",
          tags: ["period:lunch"],
        },
      ],
    },
    {
      id: "zosia:focus-wednesday",
      label: "No-meeting Wednesday",
      optionCandidates: [
        { id: "zosia:focus-wednesday:opt-1", topicId: "zosia:focus-wednesday", text: "Is Wednesday really meeting-free now?" },
        { id: "zosia:focus-wednesday:opt-2", topicId: "zosia:focus-wednesday", text: "Maciek booked a workshop on Wednesday. Again." },
        { id: "zosia:focus-wednesday:opt-3", topicId: "zosia:focus-wednesday", text: "What am I supposed to do with a quiet Wednesday?" },
        { id: "zosia:focus-wednesday:opt-4", topicId: "zosia:focus-wednesday", text: "The clients do not respect focus Wednesday." },
        { id: "zosia:focus-wednesday:opt-5", topicId: "zosia:focus-wednesday", text: "Focus Wednesday made my Tuesday worse." },
        { id: "zosia:focus-wednesday:opt-6", topicId: "zosia:focus-wednesday", text: "Can focus Wednesday become focus week?" },
      ],
      replyCandidates: [
        {
          id: "zosia:focus-wednesday:rep-1",
          text: "It is policy, aspiration, and a weather condition — in that order. Officially no internal meetings; unofficially the calendar fills anyway, and by Wednesday noon it looks like every other day. But the morning holds. Nobody has ever booked over a Wednesday morning. That hour is sacred and slightly damp.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:focus-wednesday:rep-2",
          text: "He did, and I allow it, because the CTO breaking his own focus policy is content for the retro. The rule has a grandfather clause for men with slides. We forgive it publicly and note it privately. The notes are a genre.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:focus-wednesday:rep-3",
          text: "You finish the thing that has been whispering to you for a month. Focus Wednesday is where side projects go to become real, where docs get written, and where someone brave fixes the printer. Use it or it gets audited. I am joking. Mostly.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:focus-wednesday:rep-4",
          text: "They do not, which is why it applies to internal only — a client emergency outranks any policy we have, including gravity. But after two quiet Wednesdays the clients calmed down anyway. Peace is contagious, like yawning or panic.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:focus-wednesday:rep-5",
          text: "Good. That means the meetings moved, not vanished, and Tuesday now carries the weight Wednesday refused. Scheduling is hydraulics. I would rather Tuesday hurt on purpose than Wednesday pretend to be free.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:focus-wednesday:rep-6",
          text: "Then Wednesday would quietly become Thursday, and by Friday we would have invented a weekend for clients only. One day is the dose. This office can hold one honest day a week. Two days is a retreat, and retreats need a bus.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "zosia:townhall",
      label: "The quarterly town hall",
      optionCandidates: [
        { id: "zosia:townhall:opt-1", topicId: "zosia:townhall", text: "Nobody asks questions in the town hall." },
        { id: "zosia:townhall:opt-2", topicId: "zosia:townhall", text: "The anonymous Q&A tool got forty snarky questions." },
        { id: "zosia:townhall:opt-3", topicId: "zosia:townhall", text: "Why is the town hall on Friday at four?" },
        { id: "zosia:townhall:opt-4", topicId: "zosia:townhall", text: "Dawid's update was one slide. One." },
        { id: "zosia:townhall:opt-5", topicId: "zosia:townhall", text: "Can I skip the town hall this quarter?" },
        { id: "zosia:townhall:opt-6", topicId: "zosia:townhall", text: "Who writes your town hall script?" },
      ],
      replyCandidates: [
        {
          id: "zosia:townhall:rep-1",
          text: "Nobody asks questions in ANY town hall; they ask them in the kitchen afterward, which is where I go, which makes the town hall the warm-up act for my kitchen tour. The tool exists so questions arrive typed and slightly braver.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:townhall:rep-2",
          text: "Forty snarky questions means forty people paid attention, which is forty more than most companies get. I answer the three meanest with total sincerity and the room flips. Snark is just sincerity wearing armor. Take the armor, keep the person.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:townhall:rep-3",
          text: "Because Friday at four means nobody schedules over it, and the honest questions come out when the week is already dead. Also the cookies arrive at four fifteen. Attendance is not mandatory but the cookies are load-bearing.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:townhall:rep-4",
          text: "One slide is a power move and I let him keep it. The slide says three numbers and the numbers are always true, which distinguishes him from every keynote speaker I have flown anywhere. The board gets forty slides. The staff gets the truth. That is the correct direction.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:townhall:rep-5",
          text: "You can, once, quietly, and nobody will chase you — but the town hall is where the quarter gets its official version, and you want to hear the official version live so you can calibrate the real one. Come for the cookies. Stay for the calibration.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:townhall:rep-6",
          text: "Me, on Tuesday nights, with one eye on the metrics and one on the door. The script has three beats: one win, one problem, one promise. Everything else is delivery. Eleven years of management and the material is quarterly numbers.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "zosia:announcements",
      label: "The all-staff email voice",
      optionCandidates: [
        { id: "zosia:announcements:opt-1", topicId: "zosia:announcements", text: "Your announcement emails read like poetry." },
        { id: "zosia:announcements:opt-2", topicId: "zosia:announcements", text: "How do you write an announcement nobody panics at?" },
        { id: "zosia:announcements:opt-3", topicId: "zosia:announcements", text: "The subject line said 'a change'. A CHANGE?" },
        { id: "zosia:announcements:opt-4", topicId: "zosia:announcements", text: "Why do announcements always land at 16:58?" },
        { id: "zosia:announcements:opt-5", topicId: "zosia:announcements", text: "I heard about the rebrand from the announcement. Rude." },
        { id: "zosia:announcements:opt-6", topicId: "zosia:announcements", text: "Teach me to write announcements." },
      ],
      replyCandidates: [
        {
          id: "zosia:announcements:rep-1",
          text: "Announcements are the only writing this company does for the entire building as an audience, so they get my full craft. Subject under six words, first sentence does the news, last sentence does the kindness. The middle is where the tone lives.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:announcements:rep-2",
          text: "You say the thing, you say what it means for Tuesday, and you say when the next update comes. Panic is just a vacuum with good wifi. Three sentences and the vacuum closes. I have announced rebrands, freezes, and one flood with this method.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:announcements:rep-3",
          text: "The phrase 'a change' was a compromise between 'restructure' and 'nothing is wrong', and it pleased nobody, which is how you know it was a compromise. I regret it to this day and to the day it caused. Never again will a subject line carry suspense.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:announcements:rep-4",
          text: "Because sixteen fifty-eight is after the day can spiral and before anyone's evening belongs to me. Timing is half the message. The same sentence at nine am is a crisis; at sixteen fifty-eight it is a newsletter.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:announcements:rep-5",
          text: "The announcement went to everyone simultaneously, which means you were first-row, not last to know. Rumors are how you find out second. An announcement is how you find out at the same time as the CFO, which is the best anyone gets here.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "zosia:announcements:rep-6",
          text: "Rule one: verbs over adjectives. Rule two: numbers beat vibes. Rule three: name the date or there is no announcement, there is a mood. Follow the three rules and you too can move one hundred and four inboxes with a paragraph.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "zosia:room-names",
      label: "The meeting room names",
      optionCandidates: [
        { id: "zosia:room-names:opt-1", topicId: "zosia:room-names", text: "Why is the small meeting room called Momentum?" },
        { id: "zosia:room-names:opt-2", topicId: "zosia:room-names", text: "Who named the meeting rooms?" },
        { id: "zosia:room-names:opt-3", topicId: "zosia:room-names", text: "The new room has no name and it is unsettling." },
        { id: "zosia:room-names:opt-4", topicId: "zosia:room-names", text: "Can we name a room after Burek?" },
        { id: "zosia:room-names:opt-5", topicId: "zosia:room-names", text: "The room names have nothing to do with rooms." },
        { id: "zosia:room-names:opt-6", topicId: "zosia:room-names", text: "What was the meeting room naming contest like?" },
      ],
      replyCandidates: [
        {
          id: "zosia:room-names:rep-1",
          text: "Because Momentum is what happens in it — it is the smallest room and the only one where decisions actually occur. The big rooms host discussion; Momentum hosts signatures. The name is a promise and the room keeps it, mostly.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:room-names:rep-2",
          text: "A committee, which is the honest answer, and the committee took three weeks to produce names a brave intern could have written in an afternoon. The names survived because renaming is a cost nobody wants to pay. Names outlive their creators here.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:room-names:rep-3",
          text: "Then it stays unnamed until something happens in it worth naming. That is the rule the committee never wrote down: rooms earn their names. The glass room was named after an incident. The kitchen was almost named after Grazyna. She declined in writing.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:room-names:rep-4",
          text: "There is a proposal, a folder, and eleven pages of support, and I am holding it until morale needs a win. When it passes, the room gets a water bowl and a plaque. Burek will not understand and will nap in it anyway, which is exactly right.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:room-names:rep-5",
          text: "They are not room names, they are values with addresses. Momentum, Alignment, The Graph — you are literally booked into the culture. Some people find it dystopian. I find it efficient. The office tours love it either way, and the tours are a metric.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:room-names:rep-6",
          text: "It was 2021: four rooms, nine hundred sticky notes, one afternoon. Half the winners were jokes. That contest produced more genuine engagement than any survey I have run since, and I have run surveys ABOUT the contest. Democracy works once per office.",
          relationshipHint: "pleased",
          tags: ["quest:zosia-opened-up"],
        },
      ],
    },
    {
      id: "zosia:snack-rotation",
      label: "The snack rotation",
      optionCandidates: [
        { id: "zosia:snack-rotation:opt-1", topicId: "zosia:snack-rotation", text: "The snack basket only has rice cakes again." },
        { id: "zosia:snack-rotation:opt-2", topicId: "zosia:snack-rotation", text: "Who decides the snack rotation?" },
        { id: "zosia:snack-rotation:opt-3", topicId: "zosia:snack-rotation", text: "Can we vote the rice cakes out?" },
        { id: "zosia:snack-rotation:opt-4", topicId: "zosia:snack-rotation", text: "Grazyna cut the snack budget by a third." },
        { id: "zosia:snack-rotation:opt-5", topicId: "zosia:snack-rotation", text: "The good snacks disappear by ten am." },
        { id: "zosia:snack-rotation:opt-6", topicId: "zosia:snack-rotation", text: "Is the snack rotation a motivation tool?" },
      ],
      replyCandidates: [
        {
          id: "zosia:snack-rotation:rep-1",
          text: "The rice cakes are what remains after Tuesday, and Tuesday is what happens when the vote goes to the loudest. Rice cakes are this office's official punishment snack. They exist so the lesson 'snacks have consequences' stays taught.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:snack-rotation:rep-2",
          text: "A monthly vote I run with the gravity of a national election. Nomination, campaign, ballot, and one spoiled vote every month that just says 'more espresso'. Democracy is expensive, but the alternative is someone buying what THEY like, and we had that regime in 2021. Dark times.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:snack-rotation:rep-3",
          text: "You cannot vote out a snack, only deprioritize it, because the supplier sells bundles. But campaign hard enough and rice cakes sink to the bottom slot, where they wait, patient and terrible, for their turn. Everything returns. That is rotation.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:snack-rotation:rep-4",
          text: "She did, and then quietly restored it when I showed her the coffee spend per exit interview. Grazyna does not love snacks, but she loves arithmetic, and the arithmetic loves snacks. Never fight her. Bring her a spreadsheet with a sad number in it.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:snack-rotation:rep-5",
          text: "The ten am disappearance is the purest data this office produces — it tells me exactly who is actually here. I have considered charging for the good ones at ten oh five as a revenue stream. The idea dies in committee every quarter. Beautiful idea.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:snack-rotation:rep-6",
          text: "Everything is a motivation tool if you are honest about management, but the snacks specifically are a retention program with crumbs. The morning basket is a promise: the day starts and there is something in it for you. Cheap promise. Kept daily. That is the whole trick.",
          relationshipHint: "neutral",
          tags: ["period:morning", "relationship:neutral"],
        },
      ],
    },
    {
      id: "zosia:mediation",
      label: "Conflict mediation",
      optionCandidates: [
        { id: "zosia:mediation:opt-1", topicId: "zosia:mediation", text: "Tomek and Przemek are feuding again." },
        { id: "zosia:mediation:opt-2", topicId: "zosia:mediation", text: "How do you mediate without taking sides?" },
        { id: "zosia:mediation:opt-3", topicId: "zosia:mediation", text: "Marek insulted someone's code at the standup." },
        { id: "zosia:mediation:opt-4", topicId: "zosia:mediation", text: "Two people want the same desk by the window." },
        { id: "zosia:mediation:opt-5", topicId: "zosia:mediation", text: "Can you mediate a dispute about the dishwasher?" },
        { id: "zosia:mediation:opt-6", topicId: "zosia:mediation", text: "I got drafted into someone else's conflict." },
      ],
      replyCandidates: [
        {
          id: "zosia:mediation:rep-1",
          text: "Their feud is load-bearing — it has run since 2022 and neither has called in sick over it. I mediate quarterly, I do not solve it, because solving it would remove the only friction that makes their standups honest. Some conflicts are infrastructure.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:mediation:rep-2",
          text: "You take sides on the PROCESS, never the people. 'You both deserve an answer by Friday' is a side, and it is the only safe one. Pick a person and you inherit their enemies. Pick the process. The process has no enemies. The process has snacks.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:mediation:rep-3",
          text: "Marek's reviews are weather — loud, brief, and gone by lunch. The person he insulted got a coffee from him by ten, which is his entire apology vocabulary. I let it play. Interrupting a Marek apology mid-brew would be cruelty.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:mediation:rep-4",
          text: "Then they share it on alternating days and discover they hate each other's plant choices, which is how friendships actually start. Hot-desking resolved more feuds here than any offsite. Proximity is a solvent. Use it.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:mediation:rep-5",
          text: "Yes, and I have done it twice. The dishwasher is never about the dishwasher; it is about who feels unseen. I run the cycle at night now, which removed the dispute and one job. Management is mostly removing stages where people can be hurt by cutlery.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:mediation:rep-6",
          text: "Then hand it back gently — 'I care about you both and this is yours to resolve' — and notify me so I can sit nearby looking available. Half of mediation is being in the room. The other half is cookies. I keep both stocked.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "zosia:burnout-watch",
      label: "The burnout watch",
      optionCandidates: [
        { id: "zosia:burnout-watch:opt-1", topicId: "zosia:burnout-watch", text: "How do you spot burnout before it lands?" },
        { id: "zosia:burnout-watch:opt-2", topicId: "zosia:burnout-watch", text: "I think Pawel is running on fumes." },
        { id: "zosia:burnout-watch:opt-3", topicId: "zosia:burnout-watch", text: "Is the burnout watch a spreadsheet?" },
        { id: "zosia:burnout-watch:opt-4", topicId: "zosia:burnout-watch", text: "You watch us. That is slightly sinister." },
        { id: "zosia:burnout-watch:opt-5", topicId: "zosia:burnout-watch", text: "What do you do when someone tips over?" },
        { id: "zosia:burnout-watch:opt-6", topicId: "zosia:burnout-watch", text: "Am I on the burnout list?" },
      ],
      replyCandidates: [
        {
          id: "zosia:burnout-watch:rep-1",
          text: "Not by the hours — by the jokes. Burnout arrives when someone stops making the funny reply in standup and starts making the efficient one. The jokes are the canary. I have been reading this room for eleven years and I have never once needed a dashboard.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:burnout-watch:rep-2",
          text: "Then he gets a Friday afternoon that does not exist on any calendar, and I will deny arranging it. Pawel runs hot because everything is new and he thinks rest is a permission. It is not. It is a policy. I wrote it down and everything.",
          relationshipHint: "neutral",
          tags: ["stats:low-caffeine"],
        },
        {
          id: "zosia:burnout-watch:rep-3",
          text: "It is a spreadsheet the way the blazer is a jacket — technically, and missing the point. The sheet has three columns I never share: sleep signals, snack signals, and sarcasm decline. The sarcasm index is the most advanced burnout metric in the industry and I invented it by accident.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:burnout-watch:rep-4",
          text: "I watch the way a lighthouse watches — permanently, impersonally, and so you can stop navigating by fear. The alternative is noticing when the error logs do. Everyone prefers the lighthouse. The lighthouse also brings snacks.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:burnout-watch:rep-5",
          text: "Then the quarter gets quietly renegotiated around them. A deadline moves, a client gets a junior with better energy, and the person wakes up one Monday with room to breathe and no memo explaining why. The best interventions are invisible. Mine have a perfect record and no paper trail.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:burnout-watch:rep-6",
          text: "Everyone is on the burnout list; it is sorted by current risk and you sit in the calm middle, which is where I like my people. If you ever tip, I will know before you do, and the calendar will simply grow a gap. That is the service. That is the whole job.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:evening"],
        },
      ],
    },
    {
      id: "zosia:summer-intake",
      label: "The summer intake",
      optionCandidates: [
        { id: "zosia:summer-intake:opt-1", topicId: "zosia:summer-intake", text: "The summer interns start on Monday. Ready?" },
        { id: "zosia:summer-intake:opt-2", topicId: "zosia:summer-intake", text: "Who mentors the summer intake?" },
        { id: "zosia:summer-intake:opt-3", topicId: "zosia:summer-intake", text: "The interns requested a mentor named Burek." },
        { id: "zosia:summer-intake:opt-4", topicId: "zosia:summer-intake", text: "Last year's intern now runs a team somewhere." },
        { id: "zosia:summer-intake:opt-5", topicId: "zosia:summer-intake", text: "Three interns, two desks, one window. Math?" },
        { id: "zosia:summer-intake:opt-6", topicId: "zosia:summer-intake", text: "Should interns attend the town hall?" },
      ],
      replyCandidates: [
        {
          id: "zosia:summer-intake:rep-1",
          text: "Ready is a strong word — badges printed, desks assigned, one welcome deck polished since June. On day one they are terrified and brilliant and one of them will fix something we tolerated for years. I love the intake. It is the office's birthday.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "zosia:summer-intake:rep-2",
          text: "Whoever survived last year's intake, which is how succession actually works here. Pawel is graduating from mentee to mentor this summer, which is either beautiful or an ouroboros. We will know by August.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:summer-intake:rep-3",
          text: "Burek is already on the mentor list — morale lead, zero code review, perfect attendance. The interns will learn more from watching who feeds the dog than from any onboarding doc. Character analysis via Burek. I should put it in the deck.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:summer-intake:rep-4",
          text: "She does, and she sends us a card every December with her team's numbers on it, the only KPI report I have ever framed. The intake is a slow export business: we raise seniors for the whole city and keep the fees at zero. Somebody should study us.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:summer-intake:rep-5",
          text: "The interns rotate desks on a schedule Marek calls 'the carousel', and the window seat is earned by Friday demo quality. Fairness through rotation is my entire philosophy expressed as furniture.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "zosia:summer-intake:rep-6",
          text: "They attend, they sit in front, and one of them asks the question everyone else was hiding from, every single time. Interns are the town hall's immune system. I seat them where the microphone reaches. Democracy needs fresh blood and no fear.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "zosia:papercuts",
      label: "The papercut list",
      optionCandidates: [
        { id: "zosia:papercuts:opt-1", topicId: "zosia:papercuts", text: "The door hinge squeaks in a sad way." },
        { id: "zosia:papercuts:opt-2", topicId: "zosia:papercuts", text: "What is the papercut list exactly?" },
        { id: "zosia:papercuts:opt-3", topicId: "zosia:papercuts", text: "My papercut has been on the list since spring." },
        { id: "zosia:papercuts:opt-4", topicId: "zosia:papercuts", text: "Can I just fix a papercut myself?" },
        { id: "zosia:papercuts:opt-5", topicId: "zosia:papercuts", text: "The papercut list is longer than the roadmap." },
        { id: "zosia:papercuts:opt-6", topicId: "zosia:papercuts", text: "Who owns the papercut list?" },
      ],
      replyCandidates: [
        {
          id: "zosia:papercuts:rep-1",
          text: "The hinge has been listed since spring, right between 'the third chair wobbles' and 'the kitchen light hums in B flat'. Janusz oils it on a quiet Thursday. The list always wins eventually. The list is patient in a way budgets are not.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:papercuts:rep-2",
          text: "It is the public ledger of tiny wrongs — squeaks, flickers, mislabeled cables, one drawer that opens into destiny. Each item is five minutes of work and five months of waiting, and clearing ten of them does more for morale than any pizza. Papercuts are culture at high resolution.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:papercuts:rep-3",
          text: "Then it has seniority and allies by now — bring it to me and I will bump it above the squeaky hinge, which on that list is a promotion. Papercuts age like cheese. Yours is due.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:papercuts:rep-4",
          text: "Yes, and you become a legend. The list has a column called 'fixed by' and the names in it are the closest thing this office has to an honors list. Someone fixed the kettle wobble in 2023 and people still buy him coffee for it. Small repairs, big reputations.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:papercuts:rep-5",
          text: "It always is, and it should be — the roadmap is what we dream and the papercut list is what we trip on. One is strategy, the other is gravity. I fund gravity first because gravity does not negotiate.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:papercuts:rep-6",
          text: "I do, which surprises people who assume it belongs to Janusz. Janusz executes; I curate. Every Friday I read the list top to bottom with a coffee, like a horoscope written by the building. Some weeks it is the most honest document in my inbox.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:afternoon"],
        },
      ],
    },
    {
      id: "zosia:charity-drive",
      label: "The charity drive",
      optionCandidates: [
        { id: "zosia:charity-drive:opt-1", topicId: "zosia:charity-drive", text: "Is the charity drive happening this month?" },
        { id: "zosia:charity-drive:opt-2", topicId: "zosia:charity-drive", text: "The donation thermometer poster is stuck at forty percent." },
        { id: "zosia:charity-drive:opt-3", topicId: "zosia:charity-drive", text: "Przemek turned the charity drive into a competition." },
        { id: "zosia:charity-drive:opt-4", topicId: "zosia:charity-drive", text: "Can we donate time instead of money?" },
        { id: "zosia:charity-drive:opt-5", topicId: "zosia:charity-drive", text: "Who counts the charity drive money?" },
        { id: "zosia:charity-drive:opt-6", topicId: "zosia:charity-drive", text: "The charity jar has a padlock now." },
      ],
      replyCandidates: [
        {
          id: "zosia:charity-drive:rep-1",
          text: "It is happening, quietly, with a jar at reception and zero all-staff emails, because guilt is a terrible fundraising strategy. Renata runs the jar, I run the match, and the company doubles whatever lands by the last Friday. Generosity with matching funds. That is my love language.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:charity-drive:rep-2",
          text: "The thermometer is decorative — the real number lives in Renata's notebook and moves in private. I let the poster stall so the final week has drama. Fundraising is theater with a receipt at the end, and the receipt is the good part.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:charity-drive:rep-3",
          text: "He does, every year, with leaderboards and a trophy he bought himself, and honestly it works. The year he made it sales versus engineering, donations doubled and one bridge got burned. Net positive. The trophy lives in his car, which feels correct.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:charity-drive:rep-4",
          text: "Time is the premium currency — an afternoon at the shelter beats any payroll deduction, and the stories come back to the kitchen where they multiply. I log hours in the same sheet as money at a rate Grazyna audited and approved. She approved it FAST. Suspiciously fast.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:charity-drive:rep-5",
          text: "Grazyna counts, which means the count is beyond suspicion and slightly terrifying. She once found a twenty-zloty surplus and traced it to a client who donated twice out of enthusiasm. The client got a thank you note. The note got framed.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:charity-drive:rep-6",
          text: "The padlock arrived the year Przemek borrowed the jar for a sales demo and returned it heavier. Now only Renata and Grazyna hold the combination, and frankly the ceremony around it raised more than the jar did. Security theater for a good cause. I allow it.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract"],
        },
      ],
    },
    {
      id: "zosia:suggestion-box",
      label: "The suggestion box",
      optionCandidates: [
        { id: "zosia:suggestion-box:opt-1", topicId: "zosia:suggestion-box", text: "Does anyone actually read the suggestion box?" },
        { id: "zosia:suggestion-box:opt-2", topicId: "zosia:suggestion-box", text: "I left a suggestion and it happened. Witchcraft?" },
        { id: "zosia:suggestion-box:opt-3", topicId: "zosia:suggestion-box", text: "Half the suggestions are about the printer." },
        { id: "zosia:suggestion-box:opt-4", topicId: "zosia:suggestion-box", text: "Are suggestions truly anonymous?" },
        { id: "zosia:suggestion-box:opt-5", topicId: "zosia:suggestion-box", text: "Someone suggested firing management. Bold." },
        { id: "zosia:suggestion-box:opt-6", topicId: "zosia:suggestion-box", text: "Why is the suggestion box locked?" },
      ],
      replyCandidates: [
        {
          id: "zosia:suggestion-box:rep-1",
          text: "I read it every Friday with a coffee, top to bottom, and I have done it since 2019. It is the only feedback channel in this building with a perfect honesty record. Surveys get what people think I want. The box gets the truth, usually in angry capital letters.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:suggestion-box:rep-2",
          text: "Not witchcraft — process. The box feeds a list, the list feeds a Friday, and Friday feeds a decision. Your suggestion will happen by quarter's end or it will earn a written reason why not. The box answers. That is why it works.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:suggestion-box:rep-3",
          text: "The printer gets forty percent of the suggestions and deserves every one. It is the only office appliance with a personality cult and a grievance file. I forward the printer suggestions to the printer, spiritually. Nothing changes. The ritual holds us together.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:suggestion-box:rep-4",
          text: "Truly — no cameras, no handwriting analysis, and I have never once tried, which a skeptic in 2021 did not believe and left anyway. Her suggestions still arrive, mailed from her new job, unsigned. The box outlives us all.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:suggestion-box:rep-5",
          text: "That one I framed and hung in my office, because it is the funniest and most honest feedback this company has produced. My written answer was 'working on it' and the room laughed for a week. You cannot buy that kind of engagement.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:suggestion-box:rep-6",
          text: "The lock is for the charity jar next to it, but the visual confusion generates a steady stream of complaints about suggestion security, which generates engagement with the suggestion system. I have decided this is fine. The system runs on confusion.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "zosia:appreciation-wall",
      label: "The appreciation wall",
      optionCandidates: [
        { id: "zosia:appreciation-wall:opt-1", topicId: "zosia:appreciation-wall", text: "The appreciation wall is out of sticky notes." },
        { id: "zosia:appreciation-wall:opt-2", topicId: "zosia:appreciation-wall", text: "Someone wrote 'nice ceiling' on the appreciation wall." },
        { id: "zosia:appreciation-wall:opt-3", topicId: "zosia:appreciation-wall", text: "Is the appreciation wall mandatory gratitude?" },
        { id: "zosia:appreciation-wall:opt-4", topicId: "zosia:appreciation-wall", text: "My name is on the wall and I did nothing." },
        { id: "zosia:appreciation-wall:opt-5", topicId: "zosia:appreciation-wall", text: "The wall is full. What happens now?" },
        { id: "zosia:appreciation-wall:opt-6", topicId: "zosia:appreciation-wall", text: "Who audits the appreciation wall?" },
      ],
      replyCandidates: [
        {
          id: "zosia:appreciation-wall:rep-1",
          text: "A wall out of notes is a national emergency, and there is a refill budget line Grazyna approved under 'culture consumables'. The phrase is in the ledger forever. Take two pads from my desk. The wall does not close. The wall has never closed.",
          relationshipHint: "annoyed",
        },
        {
          id: "zosia:appreciation-wall:rep-2",
          text: "'Nice ceiling' is my favorite note ever posted, because it proves people read the wall top to bottom and gratitude got weird in a good way. I will not remove it. When the wall is photographed for the culture page, the ceiling note is centered.",
          relationshipHint: "delighted",
        },
        {
          id: "zosia:appreciation-wall:rep-3",
          text: "Mandatory gratitude is an oxymoron and I want that on a poster. The wall is radically optional, which is why it works — nobody has ever been asked to post, and yet it fills weekly. You cannot schedule sincerity. You can only stock the sticky notes and believe.",
          relationshipHint: "pleased",
        },
        {
          id: "zosia:appreciation-wall:rep-4",
          text: "Then someone saw you do the thing you think is invisible — the quiet fix, the stayed-late, the taught-Pawel-patience. The wall sees more than the roadmap ever did. Take the note home or leave it up. Leaving it up is braver.",
          relationshipHint: "neutral",
        },
        {
          id: "zosia:appreciation-wall:rep-5",
          text: "Then we start a second panel and retire the oldest notes into a folder marked 'evidence of civilization'. The first panel is archived by date, like tree rings. Future historians will know exactly which Tuesday we fixed the coffee machine.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "zosia:appreciation-wall:rep-6",
          text: "Nobody audits it, which is the point — it is the only surface in this office that answers to no metric, no budget, and no committee. I guard it the way Dawid guards the cap table. Some things are valuable BECAUSE nobody measures them. Do not quote me in the metrics meeting.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:zosia-opened-up"],
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

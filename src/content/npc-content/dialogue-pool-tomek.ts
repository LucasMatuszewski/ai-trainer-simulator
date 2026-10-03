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
    {
      id: "tomek:stack",
      label: "Paste hygiene",
      optionCandidates: [
        {
          id: "tomek:stack:opt-1",
          topicId: "tomek:stack",
          text: "How do you pick WHICH stack overflow answer to trust?",
        },
        {
          id: "tomek:stack:opt-2",
          topicId: "tomek:stack",
          text: "The accepted answer was wrong and I shipped it.",
        },
        {
          id: "tomek:stack:opt-3",
          topicId: "tomek:stack",
          text: "Do you ever upvote anything?",
        },
        {
          id: "tomek:stack:opt-4",
          topicId: "tomek:stack",
          text: "The answer had a comment thread with a war in it.",
        },
        {
          id: "tomek:stack:opt-5",
          topicId: "tomek:stack",
          text: "What is your paste-to-understand ratio now?",
        },
        {
          id: "tomek:stack:opt-6",
          topicId: "tomek:stack",
          text: "One day the internet will not have my bug.",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:stack:rep-1",
          text: "Trust is a function of edits and scars. I read the answer, then the top comment, then the edit history like a criminal record. An answer with three edits and a humble correction is an adult. An answer with ten thousand upvotes and no edits is a cocktail — everyone liked it, nobody tested it. The scars matter. Reputation points are just scars with better marketing.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:stack:rep-2",
          text: "Congratulations, you are a PEER of the accepted answer now. You have contributed the only thing the internet cannot generate: evidence. Downvote it, write your correction in the comments, and become the top comment with the shame-fueled precision of a survivor. That is literally how the internet improves — somebody ships the wrong answer and has feelings about it.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:stack:rep-3",
          text: "I upvote twice a year, on national holidays of the soul. My upvotes are extremely rare and therefore devastatingly meaningful — ask anyone who has one. There are two accounts that have one. Two. I am the Federal Reserve of upvotes and the currency has never inflated. The recipients do not know the weight. I know. The weight is enormous.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:stack:rep-4",
          text: "The war IS the documentation. When two seniors fight in a comment thread over a semicolon, the fight contains every edge case the answer omitted. Read it like a courtroom — both lawyers are lying but the truth leaks out between them. I have solved bugs using only the insults. The insults are load-bearing. Stack Overflow's greatest product was never the answers.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:stack:rep-5",
          text: "Round numbers are embarrassing, so I will say: it used to be four hundred pastes per original line, and it is now roughly forty, and the forty are all READ before shipping, which is the actual metric. The trend line is the career. Another decade and I might reverse the ratio entirely — one paste for every forty originals, pasted only as citation, like a gentleman.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:stack:rep-6",
          text: "It will, and this is the fear that makes seniors of us all. The internet has answered every question EXCEPT the ones unique to our haunted little stack — and those are accumulating in main like sediment. My plan is to become the person the internet asks. The plan is delusional. The plan is also the only original code I have ever wanted to write.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "tomek:conflicts",
      label: "The merge conflict diaries",
      optionCandidates: [
        {
          id: "tomek:conflicts:opt-1",
          topicId: "tomek:conflicts",
          text: "What is the worst merge conflict you survived?",
        },
        {
          id: "tomek:conflicts:opt-2",
          topicId: "tomek:conflicts",
          text: "How do you pick 'ours' versus 'theirs'?",
        },
        {
          id: "tomek:conflicts:opt-3",
          topicId: "tomek:conflicts",
          text: "I resolved a conflict by deleting everything. Advice?",
        },
        {
          id: "tomek:conflicts:opt-4",
          topicId: "tomek:conflicts",
          text: "The Portuguese comment caused a conflict. Twice.",
        },
        {
          id: "tomek:conflicts:opt-5",
          topicId: "tomek:conflicts",
          text: "Marek fixed a conflict without reading the file.",
        },
        {
          id: "tomek:conflicts:opt-6",
          topicId: "tomek:conflicts",
          text: "Is a rebase just a conflict with extra steps?",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:conflicts:rep-1",
          text: "Eleven files, one Friday, and a file both Marek and I had touched for reasons the git history refuses to explain. We resolved it in a shared document editor like two surgeons doing telemedicine. The commit message was 'peace'. It is the most honest message in the repository and it is protected by branch rules nobody admits to writing.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:conflicts:rep-2",
          text: "Ours is what you believed on Tuesday, theirs is what someone smarter believed on Wednesday. Take theirs UNLESS the Wednesday person is Tomek, in which case take ours and read both slowly like a safety demonstration. The flags are not right and wrong — they are two truths meeting in a doorway, and you are the bouncer. Choose the truth that has tests. Neither has tests?…",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:conflicts:rep-3",
          text: "That is not resolving, that is a BORDER REDRAW. Deleting everything is what the conflict was trying to prevent — the two changes were fighting over the same real estate and you evicted both. The recovery is a walk, a coffee, and rewriting the file from what you now understand it should be. I have done it once. The rewrite was the best code I ever shipped and it was…",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:conflicts:rep-4",
          text: "The comment says 'this is wrong but it works' and git treats it like disputed territory. First conflict: Marek translated it, laughed, and kept it. Second conflict: legal saw the translation and demanded a rename, so now it says 'documented behavior' in English and the Portuguese remains in the history like a buried city. The comment outlived both branches. Comments…",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:conflicts:rep-5",
          text: "He did not read the file because he had already read BOTH futures — he knew which change had survived the weekend in his head, picked it in forty seconds, and said 'the other one was theater'. He was right. I have been chasing that level of git clairvoyance for two years. The skill is not reading the file. The skill is knowing which authors matter and skimming the rest.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:conflicts:rep-6",
          text: "A rebase is a conflict with the timeline — same fights, earlier dates, and you pay for them one commit at a time instead of all at once. I used to merge because a single big conflict felt like one brave decision. Now I rebase because twelve small decisions teach you the code. Conflicts are tuition either way. The rebase just offers a payment plan.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:hair",
      label: "The hair phases",
      optionCandidates: [
        {
          id: "tomek:hair:opt-1",
          topicId: "tomek:hair",
          text: "The blue phase — what was that about?",
        },
        {
          id: "tomek:hair:opt-2",
          topicId: "tomek:hair",
          text: "Klaudia says your hair is personal brand equity.",
        },
        {
          id: "tomek:hair:opt-3",
          topicId: "tomek:hair",
          text: "Does Marek even notice your hair exists?",
        },
        {
          id: "tomek:hair:opt-4",
          topicId: "tomek:hair",
          text: "I am thinking of dyeing mine before the big demo.",
        },
        {
          id: "tomek:hair:opt-5",
          topicId: "tomek:hair",
          text: "Zosia photographed your hair for the culture page.",
        },
        {
          id: "tomek:hair:opt-6",
          topicId: "tomek:hair",
          text: "Natural color returns. Sad?",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:hair:rep-1",
          text: "The blue was a deployment strategy. Nobody questions a person with blue hair about the state of main — they assume the questions are part of a larger aesthetic and leave you alone. It was camouflage. The blue phase ended when I realized the hair was writing better commit messages than me, and I do not compete with infrastructure.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:hair:rep-2",
          text: "She called it 'authentic tech disruption visible from the lobby' and offered to shoot a reel about it. I said no, and the refusal became a post about boundaries, which did numbers, so in a way the hair monetized by NOT being filmed. That is the most marketing thing that has ever happened to my scalp. I think about it weekly.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:hair:rep-3",
          text: "Marek's gaze passes through hair, status flags, and most furniture. But the day I came in with the green — a mistake with a color wheel, not a choice — he looked at me for one full second and said 'at least it compiles'. That is the warmest sentence his face has ever produced and I am wearing green at my wedding if this office ever hosts one.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:hair:rep-4",
          text: "Dyeing before a demo is like pushing to main before a deploy — it works until it becomes the story. The demo should be the loudest thing in the room. That said, the blue phase genuinely made me braver in meetings, so the science is real: the hair does the confidence before the brain catches up. Condition: pick a color that fails gracefully. The green did not fail gracefully.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:hair:rep-5",
          text: "She did, captioned 'our team's creative risk appetite'. I have been described as an APPETITE. The post outperformed the product announcement, which Ania interpreted as a mandate and now there is a slide. My hair has a slide. Somewhere in this company's history, a junior's haircut became strategy, and I have made peace with being the roadmap's most colorful line.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:hair:rep-6",
          text: "The natural color came back with two grey ones in it, which is not sadness, that is seniority arriving early to the party. The dye was for the junior I was — loud, untested, terrified of being unremarkable. The grey is for the developer I am becoming, who has survived eleven hotfixes and no longer needs to shout. The hair settled the way code settles. It compiles now.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "tomek:mentors",
      label: "Being mentored",
      optionCandidates: [
        {
          id: "tomek:mentors:opt-1",
          topicId: "tomek:mentors",
          text: "What has Bartek actually taught you?",
        },
        {
          id: "tomek:mentors:opt-2",
          topicId: "tomek:mentors",
          text: "Marek reviews my code in silence. Is that bad?",
        },
        {
          id: "tomek:mentors:opt-3",
          topicId: "tomek:mentors",
          text: "Everyone mentors me differently. Who do I copy?",
        },
        {
          id: "tomek:mentors:opt-4",
          topicId: "tomek:mentors",
          text: "Bartek invoiced me a coffee for a lesson.",
        },
        {
          id: "tomek:mentors:opt-5",
          topicId: "tomek:mentors",
          text: "When do I stop needing mentors?",
        },
        {
          id: "tomek:mentors:opt-6",
          topicId: "tomek:mentors",
          text: "Should I mentor the next intern?",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:mentors:rep-1",
          text: "Bartek taught me that confidence is a deliverable. Watch him in a client call: the answer can be five percent ready but the delivery is always one hundred percent SHIPPED. He is teaching me invoicing as a worldview — every lesson ends with 'and that is billable', and slowly I am learning that my time has a number attached. The number is small. Numbers grow. That is his…",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:mentors:rep-2",
          text: "Silence from Marek is a WARRANTY — it means nothing broke and he is letting it prove itself. You should worry about the opposite: the day he talks, really talks, with full sentences, is the day your code mattered enough to discuss. His longest sentence to me was eleven words. I wrote it down. It is load-bearing now. The silence is just the shipping method.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:mentors:rep-3",
          text: "Copy none, collect all. Bartek's confidence, Marek's silence, Janusz's maintenance faith, Ania's shamelessness — I keep one folder of techniques and run them like a champion select screen. Meetings get Bartek voice. Deploys get Marek quiet. The printer gets Janusz reverence. You are not a clone of any of them; you are a best-of album, and the album is still recording.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:mentors:rep-4",
          text: "The coffee invoice was a GRADUATION. Bartek only bills people he expects to be peers — with clients he bills money, with me he bills coffee, and the exchange rate is a hint about the future. I paid it at the machine, he nodded like a man receiving a wire transfer, and somewhere in his mental ledger my credit limit went up. The coffee cost three zloty. The lesson was…",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:mentors:rep-5",
          text: "You never stop needing them, you just rotate the SUBJECT. I needed Marek for the code, Bartek for the money, and I will need someone for management, for parenting a build system, for the decade when the industry turns under your feet. The senior move is not exiting mentorship — it is upgrading the questions. The mentee asks how. The senior asks what it costs. I am…",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:mentors:rep-6",
          text: "Yes, and here is the secret they will not tell you: you will teach by confessing. Your disasters are the curriculum the intern actually needs — the paste that broke main, the Friday, the crying in stairwell B, all of it becomes a warning label with your face on it. Mentoring from strength is boring. Mentoring from scar tissue saves people. I have the scars laminated.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "tomek:tests",
      label: "The one test file",
      optionCandidates: [
        {
          id: "tomek:tests:opt-1",
          topicId: "tomek:tests",
          text: "I heard you wrote ONE unit test. Ever.",
        },
        {
          id: "tomek:tests:opt-2",
          topicId: "tomek:tests",
          text: "What does the test actually test?",
        },
        {
          id: "tomek:tests:opt-3",
          topicId: "tomek:tests",
          text: "Marek found the test file. What happened?",
        },
        {
          id: "tomek:tests:opt-4",
          topicId: "tomek:tests",
          text: "Tests feel like writing documentation. Slow.",
        },
        {
          id: "tomek:tests:opt-5",
          topicId: "tomek:tests",
          text: "The test caught one of YOUR hotfixes. Traitor?",
        },
        {
          id: "tomek:tests:opt-6",
          topicId: "tomek:tests",
          text: "Help me write a second one. I need a guide.",
          tags: ["relationship:warm"],
        },
      ],
      replyCandidates: [
        {
          id: "tomek:tests:rep-1",
          text: "One. Officially. The number is a museum plaque, not a confession — one test, written at 2am, after the night main broke and I could not prove the fix worked except by shipping it and watching the sky. The test is named 'the rainforest still returns weather'. It has passed every day since. It is the most loyal relationship in my life and it lives in a file…",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:tests:rep-2",
          text: "It calls the rainforest API and checks the response contains a temperature. That is it. Four lines of assertion guarding the weirdest load-bearing dependency in the company. The test does not test the code. It tests the BELIEF that the rainforest will answer — and every green checkmark is a tiny religious experience. I am not joking. Faith with a CI badge is still faith.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:tests:rep-3",
          text: "He opened the file, read it, closed it, and said 'one'. Just 'one'. The digit has been hanging over my desk ever since like a progress bar at zero. I think it was the highest praise available — he identified the unit of my growth and counted it. The number one is now a target. Every new test I write is chipping at Marek's single syllable. He knows. He is watching…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:tests:rep-4",
          text: "Tests are documentation that runs. It cannot lie, it cannot rot quietly, and it cannot be skipped like the wiki. The slowness is the feature — you are writing the truth at a speed the truth deserves. My hotfixes are fast and temporary; the test is slow and permanent. In five years, guess which artifact still speaks for me. The test. The test speaks. Nothing else I…",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:tests:rep-5",
          text: "The test failed MY OWN hotfix at 9am in front of the standup. Betrayal, grief, and then the strangest pride — the thing I built said no to me, correctly, like a well-raised child. I fixed the actual bug the hotfix was masking. The test caught its father. That is the day I understood what tests are FOR. They are not for code. They are for the 9am version of you, who is…",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:tests:rep-6",
          text: "Guide, yes. Mentor, yes. I have exactly one credential and it is enough: I know what the first test feels like, which is fear with a green checkmark at the end. Pick the function you are most afraid of — not the most important, the most AFRAID. That fear is the test writing itself. Bring the function and your dread to the quiet room Thursday. We start with the name.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
          offersTaskId: "tomek:task-second-test",
        },
      ],
    },
    {
      id: "tomek:side-project",
      label: "The side project",
      optionCandidates: [
        {
          id: "tomek:side-project:opt-1",
          topicId: "tomek:side-project",
          text: "What is the side project this month?",
        },
        {
          id: "tomek:side-project:opt-2",
          topicId: "tomek:side-project",
          text: "A chatbot that argues with your calendar?",
        },
        {
          id: "tomek:side-project:opt-3",
          topicId: "tomek:side-project",
          text: "Every project dies at the database step.",
        },
        {
          id: "tomek:side-project:opt-4",
          topicId: "tomek:side-project",
          text: "Ania wants the side project on the brand account.",
        },
        {
          id: "tomek:side-project:opt-5",
          topicId: "tomek:side-project",
          text: "Did you really paste the whole side project?",
        },
        {
          id: "tomek:side-project:opt-6",
          topicId: "tomek:side-project",
          text: "Show me the folder. I will not judge.",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:side-project:rep-1",
          text: "A script that reads my own commit messages and tells me what kind of week I am having. It ran for the first time last month and diagnosed 'consolidation anxiety' from nine days of git history. A MACHINE read my commits and knew. I closed the laptop and went outside, which is the most the side project has ever taught me, and it taught it for free.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:side-project:rep-2",
          text: "The calendar argument bot is phase two. Phase one just reads; phase two will REPLY — when a meeting invites me at 8am, the bot declines with my authentic voice, pre-written on a Sunday when I am wise. It is automation of boundaries. Marek would call it a cron job. Zosia would call it a policy. I call it a friend with a very narrow purpose.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:side-project:rep-3",
          text: "Every project dies at the database step because the database is where the project stops being a dream and starts having SCHEMA. Schemas are commitments. The workaround I have learned: make the data model ugly on purpose, ship the ugly, and refactor once someone else cares. Nobody has ever cared. Four projects rest in ugly schemas. They are at peace. The peace is load-bearing.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:side-project:rep-4",
          text: "She wants it as 'Tomek builds in public', which is how side projects go to die — the moment there is an audience, the commits become performances and the bot starts being built for applause instead of for me. I told her the project is private like a diary. She said diaries are content. She is not wrong. That is the problem. Some things must not do numbers.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:side-project:rep-5",
          text: "Seventy percent pasted, thirty percent original, and the thirty percent is ALL of the important parts — the decisions, the names, the one algorithm I understood so hard I reinvented it by accident. That is the honest anatomy of every side project in history. The paste is the scaffolding. The thirty percent is the building. Nobody photographs scaffolding. Everybody lives…",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:side-project:rep-6",
          text: "Nobody has ever seen the folder. It has a README that says 'do not read this' and an architecture diagram drawn in a notebook during a standup that I was not following. You can see it — but you have to promise the folder survives as a side project. The day it becomes a product it becomes someone else's. The folder is the last thing in my life with no stakeholders.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "tomek:friday-self",
      label: "Friday-me vs Monday-me",
      optionCandidates: [
        {
          id: "tomek:friday-self:opt-1",
          topicId: "tomek:friday-self",
          text: "Why does Friday-you leave traps for Monday-you?",
        },
        {
          id: "tomek:friday-self:opt-2",
          topicId: "tomek:friday-self",
          text: "The note in the TODO said 'future me will understand'.",
        },
        {
          id: "tomek:friday-self:opt-3",
          topicId: "tomek:friday-self",
          text: "Monday-you found the TODO. Did he understand?",
        },
        {
          id: "tomek:friday-self:opt-4",
          topicId: "tomek:friday-self",
          text: "Do you ever apologize to yourself out loud?",
        },
        {
          id: "tomek:friday-self:opt-5",
          topicId: "tomek:friday-self",
          text: "Which you is the real one?",
        },
        {
          id: "tomek:friday-self:opt-6",
          topicId: "tomek:friday-self",
          text: "Teach me to leave better notes for myself.",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:friday-self:rep-1",
          text: "Friday-me is an optimist with momentum and Monday-me is a forensic accountant. Friday believes in future wisdom; Monday arrives with no wisdom and full context of the damage. The trap is never a trap on purpose — it is a NOTE, written in optimism, discovered in grief. Every developer is a time traveler being robbed by themselves. I have made peace with the timezone.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:friday-self:rep-2",
          text: "The little-letters tradition. Friday-me leaves these notes in the code like a man writing from a sinking ship — 'future me will understand', 'temporary, famous last words', 'ask Marek'. They are the most honest documentation I produce BECAUSE they are written in panic. Panic is a proofreader. The little notes survive. The elegant comments rot. Fear is a better archivist…",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:friday-self:rep-3",
          text: "He did not understand, but he UNDERSTOOD THE FEELING, which is half of comprehension. The little note said 'this cannot go to prod' and Monday-me agreed with a violence that surprised us both. That is the trick that actually works: leave FEELINGS in the notes, not explanations. Explanations rot. Fear keeps. The note was two words and it saved the quarter.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:friday-self:rep-4",
          text: "Once, out loud, in stairwell B, after the two-thousand-file Friday. I said 'I am sorry' to nobody, meaning Friday-me, meaning me, and it echoed in a way that suggested the building agreed. Then I wrote the apology as a commit message because it was the only format available. 'sorry' — single word, my most-reverted commit, my most honest one. Somewhere in the log the…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:friday-self:rep-5",
          text: "Neither. The real one is the Wednesday version — the one who reads Friday's optimism and Monday's damage and makes something that survives to Thursday. Friday dreams, Monday cleans, Wednesday ships. I have stopped identifying with either pole of my own calendar. Identity is a merge conflict and Wednesday is the resolution. This is the wisdom of two years of hotfixes. It…",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:friday-self:rep-6",
          text: "Three rules from the trenches: write the note AS Monday, never as Friday — tired, cynical, holding coffee. One feeling plus one fact per note. And date everything, because future you needs to know WHICH past you to forgive. My notes used to be novels; now they are text messages across time. 'Friday 4pm: afraid of this file, did not touch it. Fact: the rainforest test…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "tomek:keyboards",
      label: "The keyboard dreams",
      optionCandidates: [
        {
          id: "tomek:keyboards:opt-1",
          topicId: "tomek:keyboards",
          text: "Your keyboard has RGB in rainbow mode. Intentional?",
        },
        {
          id: "tomek:keyboards:opt-2",
          topicId: "tomek:keyboards",
          text: "Marek's keyboard has no letters left. Goals?",
        },
        {
          id: "tomek:keyboards:opt-3",
          topicId: "tomek:keyboards",
          text: "Grazyna rates keyboards by key travel?",
        },
        {
          id: "tomek:keyboards:opt-4",
          topicId: "tomek:keyboards",
          text: "I spilled coffee on my keyboard. Confession time.",
        },
        {
          id: "tomek:keyboards:opt-5",
          topicId: "tomek:keyboards",
          text: "Is a new keyboard a legitimate productivity purchase?",
        },
        {
          id: "tomek:keyboards:opt-6",
          topicId: "tomek:keyboards",
          text: "Which key do you wear out first?",
        },
      ],
      replyCandidates: [
        {
          id: "tomek:keyboards:rep-1",
          text: "Rainbow mode is a STATEMENT — it says this developer is still having fun and the fun is visible from space. Marek calls it 'a light show for typing forty words a minute'. Marek types a thousand words a minute in the dark like a man receiving radio transmissions from the future. We are both correct. The spectrum has room for all of us. Literally. It is a spectrum.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:keyboards:rep-2",
          text: "The blank keyboard is the endgame and I am not ready. He removed the letters to stop his eyes from cheating, the way musicians practice without looking. I peek at my keys constantly, which means my fingers still report to my eyes, and his fingers answer only to him. That keyboard is a black belt made of plastic. One day. When my commits stop needing eyes. Until then: rainbow.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:keyboards:rep-3",
          text: "She came to my desk, pressed three keys like a sommelier, and said 'acceptable travel, criminal acoustics'. This is a woman who buys mechanical keyboards by the container for a candle-funded hobby, so the assessment carries weight. She offered to build me one. I said yes before she finished the sentence. The queue for a Grazyna original is a year long. Worth it.…",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "tomek:keyboards:rep-4",
          text: "Confession accepted and mitigated: rice is a myth, the real move is isopropyl and patience. My keyboard survived TWO coffees and now smells faintly of ambition. Marek's survived an energy drink in 2021 and he declared the residue 'fine, it was sugar-free', which is the most Marek risk assessment in recorded history. Keyboards are the true survivors of this office.…",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:keyboards:rep-5",
          text: "Legitimate? The keyboard is the instrument and you are the musician, and nobody questions a guitarist's strings. The math: ten thousand keystrokes a day times a decade is thirty million touches of the same plastic. You are in a LONG-TERM relationship with this object. Three hundred zloty for thirty million touches is the best deal in the building. I have run the numbers.…",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:keyboards:rep-6",
          text: "The spacebar, and I take this as a diagnosis. My code has too many words and not enough courage — spacebar over comma over semicolon, which is the exact opposite of Marek, whose semicolon is worn to a nub like a saint's statue. He touches the ends of sentences; I touch the gaps between them. One day I will wear a semicolon down. That is the whole career plan. One…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
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
    {
      id: "tomek:task-second-test",
      title: "The second test",
      description: "Pick the function you are most afraid of — not the most important, the most afraid — and write its test with Tomek in the quiet room. He has one credential, one passing test, and the complete memory of what the first one felt like. Fear with a green checkmark at the end. Names are half the test. Names are half of everything.",
      flagToSet: "tomek-first-test",
      rewardHint: "+the counter moves toward two",
    },
  ],
};

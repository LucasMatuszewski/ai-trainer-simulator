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
          text: "The note in the code said 'future me will understand'.",
        },
        {
          id: "tomek:friday-self:opt-3",
          topicId: "tomek:friday-self",
          text: "Monday-you found the note. Did he understand?",
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
    {
      id: "tomek:code-review",
      label: "The review ritual",
      optionCandidates: [
        { id: "tomek:code-review:opt-1", topicId: "tomek:code-review", text: "You review my PRs in four words. Efficient?" },
        { id: "tomek:code-review:opt-2", topicId: "tomek:code-review", text: "What makes a review comment actually useful?" },
        { id: "tomek:code-review:opt-3", topicId: "tomek:code-review", text: "You rejected my PR with a single 'hmm'. Explain." },
        { id: "tomek:code-review:opt-4", topicId: "tomek:code-review", text: "Should reviews happen before or after lunch?" },
        { id: "tomek:code-review:opt-5", topicId: "tomek:code-review", text: "How do you review code you do not understand?" },
        { id: "tomek:code-review:opt-6", topicId: "tomek:code-review", text: "The PR description matters? Nobody reads it." },
      ],
      replyCandidates: [
        {
          id: "tomek:code-review:rep-1",
          text: "Four words is a luxury. Most of my feedback is structural: naming, placement, the question the code refuses to answer. 'Rename this', 'why here', 'split it'. If I need a paragraph, the code needs a rewrite. Brevity in review is respect for both our Fridays.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:code-review:rep-2",
          text: "One that names the problem, not the person, and offers the next move. 'This nested ternary hides the null case — extract it' is a gift. 'This is confusing' is a mood. I delete moods from my comments before sending. Mostly. There is archive evidence of one mood in 2022.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:code-review:rep-3",
          text: "'Hmm' means the code works and I cannot yet say why it works, which puts the burden on YOU to walk me through it. It is the most expensive word I have. Bartek collects them. He says my hmms are load-bearing. He invoices for the translation.",
          relationshipHint: "annoyed",
          tags: ["quest:tomek-apprentice"],
        },
        {
          id: "tomek:code-review:rep-4",
          text: "Before. Post-lunch reviews approve everything — sugar is a code reviewer with no standards. I have data: reviews after one pm miss the null checks that the nine am version of me catches. Nine am me is a better colleague and I resent him slightly less than four pm me.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:code-review:rep-5",
          text: "In small pieces, out loud, and with the sentence 'I do not follow this yet' instead of an approval I would regret. Not understanding is not a blocker — approving what I did not understand is how the rainforest API got tenure. Never again. I ask until I can narrate the diff.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:code-review:rep-6",
          text: "I read every description first, before the diff — the description is the author telling me what they THINK they did, and the diff is what they actually did. The gap between those two documents is the entire review. Descriptions are where the confessions hide. Read them like contracts.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "tomek:editors",
      label: "Editor wars",
      optionCandidates: [
        { id: "tomek:editors:opt-1", topicId: "tomek:editors", text: "Vim or VS Code? Choose carefully." },
        { id: "tomek:editors:opt-2", topicId: "tomek:editors", text: "I opened vim by accident and cannot leave." },
        { id: "tomek:editors:opt-3", topicId: "tomek:editors", text: "Your setup has no plugins. Statement or fear?" },
        { id: "tomek:editors:opt-4", topicId: "tomek:editors", text: "Is an editor theme a personality?" },
        { id: "tomek:editors:opt-5", topicId: "tomek:editors", text: "Marek edits in something with no visible UI." },
        { id: "tomek:editors:opt-6", topicId: "tomek:editors", text: "The team standardized on one editor. Peace?" },
      ],
      replyCandidates: [
        {
          id: "tomek:editors:rep-1",
          text: "Both, for different wars. Vim when I am editing, VS Code when I am searching, and the two of them have a ceasefire I monitor like a border. The editor does not make the developer. It does, however, reveal them: watch what someone reaches for when the build breaks.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:editors:rep-2",
          text: "Everyone arrives in vim by accident. The exit is a rite: type the four keys, or commit to the lifestyle. I committed in 2016. There is no shame in the quit command — it is the most honest sentence in computing. It means 'I am not ready and I know it'. Growth starts there.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:editors:rep-3",
          text: "Statement. Every plugin is a dependency on a stranger's weekend, and I have been burned by an abandoned linter at two am too many times. My setup survives a fresh install in eleven minutes. Marek's survives an EMP. Mine is the reasonable middle. I will die on this hill, which is plugin zero.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:editors:rep-4",
          text: "It is a filing system for a personality. My theme is dark with one red accent, and the red is reserved for errors, which means my whole editor is calm until it is not. People who run light themes are either optimists or working outdoors, and I have met exactly one of those.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:editors:rep-5",
          text: "Nobody knows what it is. There is a theory it is a terminal all the way down. He edited a file through three remote hops and a serial console once, and the cursor never blinked. I have stopped asking. Some tools are less software than weather.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:editors:rep-6",
          text: "It lasted nine days, ended by a font rendering bug nobody could reproduce and everyone could feel. Standardized tooling works for servers and fails for hands. Now we standardize on lint rules instead — enforce the output, not the fingers. That treaty is holding. Barely.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral", "period:afternoon"],
        },
      ],
    },
    {
      id: "tomek:refactor-urge",
      label: "The refactor urge",
      optionCandidates: [
        { id: "tomek:refactor-urge:opt-1", topicId: "tomek:refactor-urge", text: "I want to rewrite the whole service. Valid?" },
        { id: "tomek:refactor-urge:opt-2", topicId: "tomek:refactor-urge", text: "The refactor urge hits every Thursday. Why?" },
        { id: "tomek:refactor-urge:opt-3", topicId: "tomek:refactor-urge", text: "How do you tell a refactor from a rabbit hole?" },
        { id: "tomek:refactor-urge:opt-4", topicId: "tomek:refactor-urge", text: "Marek refactors one function a week. Model?" },
        { id: "tomek:refactor-urge:opt-5", topicId: "tomek:refactor-urge", text: "My refactor made it slower but prettier. Verdict?" },
        { id: "tomek:refactor-urge:opt-6", topicId: "tomek:refactor-urge", text: "When is rewriting actually correct?" },
      ],
      replyCandidates: [
        {
          id: "tomek:refactor-urge:rep-1",
          text: "Valid, predictable, and to be held for one night before acting. The rewrite urge is grief for the hours you spent building the wrong thing. It passes by morning, and what survives the morning is usually one function worth extracting. Grieve, extract, commit, move on.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:refactor-urge:rep-2",
          text: "Thursday is when the code has shown you all its secrets — you have seen every corner by then, and the walls start talking. Friday you would be too tired, Monday too fresh. Thursday is the exact day the code looks refactorable and the courage looks affordable. Schedule the urge.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:refactor-urge:rep-3",
          text: "A refactor ends where it started: same behavior, new shape, provable by tests. A rabbit hole adds a feature while 'being in there anyway'. My tripwire is scope creep in the branch title — if the title has grown two 'ands' since I forked, I am in the hole. Climb out with small commits.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:refactor-urge:rep-4",
          text: "The model. One function, one week, tests first, and the diff fits on a screen — compounding beats heroics by every measure I have ever charted. Marek has been 'refactoring the fleet scripts' for three years. The scripts have never broken once during it. That is the whole lesson.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:refactor-urge:rep-5",
          text: "Then it is a draft, not a refactor — performance is a requirement wearing a suit, and prettier is a bonus, not a verdict. Benchmark it, publish the numbers, and decide with data. I once made a function elegant and ten times slower. The elegance lives in a branch. The branch is a museum.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:refactor-urge:rep-6",
          text: "When the behavior is documented, the tests exist, and the old system cannot learn the new requirements without a séance. I have been right about a rewrite exactly once — the pagination service — and right because we wrote the tests BEFORE, which made the rewrite boring. Boring is correct.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "tomek:flow",
      label: "Deep work conditions",
      optionCandidates: [
        { id: "tomek:flow:opt-1", topicId: "tomek:flow", text: "I had two hours of flow today. Rare?" },
        { id: "tomek:flow:opt-2", topicId: "tomek:flow", text: "How do you defend coding time from meetings?" },
        { id: "tomek:flow:opt-3", topicId: "tomek:flow", text: "Chat pings break flow. Mute policy?" },
        { id: "tomek:flow:opt-4", topicId: "tomek:flow", text: "The best code happens after everyone leaves. Why?" },
        { id: "tomek:flow:opt-5", topicId: "tomek:flow", text: "Is flow just procrastination with better lighting?" },
        { id: "tomek:flow:opt-6", topicId: "tomek:flow", text: "Zosia wants status updates during flow. Negotiate." },
      ],
      replyCandidates: [
        {
          id: "tomek:flow:rep-1",
          text: "Rare and slightly mythological — true flow is twenty minutes of warm-up, ninety minutes of work, and one interruption that never comes. I get it maybe twice a month, usually on Fridays when the office empties and the building stops asking questions. Protect it like prod. Gentler stakes.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:flow:rep-2",
          text: "With calendar blocks named aggressively: 'incident review' scares people off better than 'focus time'. I block two mornings a week under a name that implies an outage, and nobody has ever asked follow-up questions. The truth — that I am writing tests — stays between me and the block.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:flow:rep-3",
          text: "Muted, always, with one exception channel that rings only for 'prod' in the message body. Everyone knows the ritual. The cost is that I answer everything forty minutes late, and the benefit is that everything arrives answered ONCE, correctly, instead of six times badly.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:flow:rep-4",
          text: "Because the building has opinions until seven, and code is a conversation that needs one listener. The post-five session is where the honest refactors happen — no meetings, no pings, one lamp. I cap it at eight so the session stays a tool and never becomes the personality.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:flow:rep-5",
          text: "Procrastination produces nothing. Flow produces a diff and a mild identity crisis when you surface. If you were procrastinating you would know — there would be a browser tab involved. Flow is the one state where the tab count goes DOWN. That is the test. Tab count.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:flow:rep-6",
          text: "Trade, do not resist: one sentence of status at nine, one at one, in exchange for the morning unguarded. Zosia honors trades — she respects a deal more than a refusal. The sentence can be honest: 'the refactor is winning'. She will accept it. She has accepted worse from me.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "tomek:legacy",
      label: "The legacy module",
      optionCandidates: [
        { id: "tomek:legacy:opt-1", topicId: "tomek:legacy", text: "Nobody touches the billing module. Wise?" },
        { id: "tomek:legacy:opt-2", topicId: "tomek:legacy", text: "The legacy module has its own weather system." },
        { id: "tomek:legacy:opt-3", topicId: "tomek:legacy", text: "Should we rewrite it or bury it with honors?" },
        { id: "tomek:legacy:opt-4", topicId: "tomek:legacy", text: "I read the legacy code. I have seen things." },
        { id: "tomek:legacy:opt-5", topicId: "tomek:legacy", text: "Who owns the legacy module now?" },
        { id: "tomek:legacy:opt-6", topicId: "tomek:legacy", text: "The legacy tests pass. Does that mean anything?" },
      ],
      replyCandidates: [
        {
          id: "tomek:legacy:rep-1",
          text: "Wise and slightly superstitious. The billing module works the way an old bridge works — you do not test it with a parade. Every quarter someone proposes a rewrite, every quarter the estimate comes back at eleven months, and every quarter we choose the bridge. It carries the money. Respect the bridge.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:legacy:rep-2",
          text: "It does — Monday deploy pressure, Thursday payday calm, and one unexplained Friday monsoon that predates us all. Marek charted its failures against moon phases once. The correlation was zero. He keeps the chart. We keep the chart. Some data is kept for the soul.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:legacy:rep-3",
          text: "Neither. You WRAP it — tests around the edges, a contract at the door, and a retirement plan nobody signs. Rewrites die at month four when the new code meets the first real invoice. Burial is premature. The module has outlived three managers and one rebrand. It is senior staff.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:legacy:rep-4",
          text: "Then you are initiated. The comments in there are in three languages and two of them are apologies. There is a function named 'doNotTouch' that everyone touches exactly once, the way a teenager touches a stove. The module does not need readers. It needs witnesses. Welcome.",
          relationshipHint: "delighted",
          tags: ["quest:marek-showed-the-log"],
        },
        {
          id: "tomek:legacy:rep-5",
          text: "Officially, nobody, which is how it likes it. Unofficially, Marek greps it monthly the way you check on a sleeping animal, and I answer questions about it like a war historian. Ownership would imply responsibility. The module predates responsibility. It answers only to invoices.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:legacy:rep-6",
          text: "They pass the way a fit candidate passed a medical in 1974 — technically true, historically reassuring, and describing a different body. The tests check arithmetic, not reality. When one of them finally fails, close the office. Not for the bug. Because the module finally said something.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "tomek:sleep",
      label: "The sleep ledger",
      optionCandidates: [
        { id: "tomek:sleep:opt-1", topicId: "tomek:sleep", text: "How do you function after a prod night?" },
        { id: "tomek:sleep:opt-2", topicId: "tomek:sleep", text: "I track my sleep debt in a spreadsheet. Judged?" },
        { id: "tomek:sleep:opt-3", topicId: "tomek:sleep", text: "The two am rule — does it actually work?" },
        { id: "tomek:sleep:opt-4", topicId: "tomek:sleep", text: "Coffee stopped working. Did yours?" },
        { id: "tomek:sleep:opt-5", topicId: "tomek:sleep", text: "Do you nap at the office? Be honest." },
        { id: "tomek:sleep:opt-6", topicId: "tomek:sleep", text: "What do you do the day after a bad night?" },
      ],
      replyCandidates: [
        {
          id: "tomek:sleep:rep-1",
          text: "Badly, on purpose, with a plan: no reviews, no deploys, and one rule I wrote after the incident — I do not touch main before ten. Post-night me is a junior with my permissions. The office survives the night and then survives my morning, which is the part nobody charts.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:sleep:rep-2",
          text: "Not judged — archived. I kept one in 2021 until the debt column exceeded the hours column and the graph became a personal accusation. Sleep debt is the only debt Grazyna cannot see and the only one with interest. The spreadsheet does not fix it. It does testify.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:sleep:rep-3",
          text: "The rule works when it is boring: nothing structural after two, comments only, and anything clever gets saved as a patch to be reviewed by the morning person, who is a different person. Two am me is confident, wrong, and fast. Morning me cleans it. I protect him like a dependent.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:sleep:rep-4",
          text: "Mine retired with honors. It still opens my eyes, which is a service, but the code no longer improves — caffeine past that point is fast typing with slow thinking. Now it is water, a walk to the window, and if the bug is still there, the bug wins the round. It keeps the scoreboard honest.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:sleep:rep-5",
          text: "The training room chair reclines eleven degrees, which is exactly enough for a twelve-minute shutdown and not enough to be a story. I have never napped. Officially. Unofficially there is a blanket in a drawer with Marek's name on it that neither of us discusses.",
          relationshipHint: "annoyed",
          tags: ["period:afternoon"],
        },
        {
          id: "tomek:sleep:rep-6",
          text: "Ship nothing, review nothing, and say the sentence at standup: 'low battery, treat me as a junior'. The office respects the sentence more than the performance of being fine. I learned it from Marek, who once said 'do not trust me today' and then fixed the build anyway. Legend has layers.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:tech-interviews",
      label: "The technical panel",
      optionCandidates: [
        { id: "tomek:tech-interviews:opt-1", topicId: "tomek:tech-interviews", text: "You sit on interview panels now. Why?" },
        { id: "tomek:tech-interviews:opt-2", topicId: "tomek:tech-interviews", text: "What does your one interview question reveal?" },
        { id: "tomek:tech-interviews:opt-3", topicId: "tomek:tech-interviews", text: "A candidate googled the answer mid-call. Verdict?" },
        { id: "tomek:tech-interviews:opt-4", topicId: "tomek:tech-interviews", text: "Should candidates see the real codebase?" },
        { id: "tomek:tech-interviews:opt-5", topicId: "tomek:tech-interviews", text: "Kasia wants structured interviews. Sell me." },
        { id: "tomek:tech-interviews:opt-6", topicId: "tomek:tech-interviews", text: "The best interview answer you ever heard?" },
      ],
      replyCandidates: [
        {
          id: "tomek:tech-interviews:rep-1",
          text: "Because Kasia asked once and I discovered interviews are code review for humans — same skill, higher stakes, and the candidate cannot push back on the first draft. I sit on the technical half, I say little, and I write down what they ask. The questions are the CV.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:tech-interviews:rep-2",
          text: "'Tell me about something you deleted on purpose.' Hires talk about deletions with love. Frauds talk about systems they merely watched. Deletion requires ownership, judgment, and a scar. One question, three signals, and nobody can prepare for it honestly without becoming it.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:tech-interviews:rep-3",
          text: "Depends on the honesty. The one who said 'I looked it up because that is what I would do at work' — hired, eventually, and she was right, that IS the job. The one who denied it while the tab was audibly open? Also educational. Not about code. About Tuesdays.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:tech-interviews:rep-4",
          text: "A sanitized folder of it, yes. We hand candidates a real bug from two quarters ago and watch. Some pattern-match. Some read the comments. One rewrote the function and made it slower but clearer, and we STILL talk about him. The codebase is the honest room. The whiteboard is theater.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:tech-interviews:rep-5",
          text: "She already sold me: unstructured interviews measure resemblance. Structured ones measure ability, and I can measure my own bias against a rubric. I fought it for a month because my favorite hires were outliers. Then I noticed my favorite hires all resembled me. Data is a mirror with a grudge.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:tech-interviews:rep-6",
          text: "'I do not know, but here is how I would find out, and here is who I would ask.' Three clauses. The panel went quiet because nobody had said it in a decade. We hired him. He says it at standup weekly. The sentence ages like code — never stops being true, only stops being scary.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "tomek:dependencies",
      label: "Dependencies",
      optionCandidates: [
        { id: "tomek:dependencies:opt-1", topicId: "tomek:dependencies", text: "The node_modules folder outweighs my conscience." },
        { id: "tomek:dependencies:opt-2", topicId: "tomek:dependencies", text: "A left-pad situation could happen here. Ready?" },
        { id: "tomek:dependencies:opt-3", topicId: "tomek:dependencies", text: "We import a library for one function. Guilty?" },
        { id: "tomek:dependencies:opt-4", topicId: "tomek:dependencies", text: "How do you audit a dependency in an afternoon?" },
        { id: "tomek:dependencies:opt-5", topicId: "tomek:dependencies", text: "The dependency's author vanished in 2021." },
        { id: "tomek:dependencies:opt-6", topicId: "tomek:dependencies", text: "Should we vendor the critical ones? Cowardly?" },
      ],
      replyCandidates: [
        {
          id: "tomek:dependencies:rep-1",
          text: "The weight is the point — every package is a decision you made once and pay for weekly. I audit mine the way Grazyna audits subscriptions: annually, painfully, and at least one removal per session. The graph shrinks, the conscience lightens, and the build gets faster by whole seconds.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:dependencies:rep-2",
          text: "Nobody is ready, which is the answer nobody puts in the retro. But you can be less unready: pin versions, mirror the four packages that would end us, and hold one drill a year where we build offline. I ran the drill in March. We survived. The vending machine did not. Different incident.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:dependencies:rep-3",
          text: "Everyone, always, and the fine is knowing — one function means one dependency means one stranger's Tuesday in your build. I keep one such import in prod with a comment naming the function and my shame. It has been two years. The function is nine lines. The comment is longer. Proportionate.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:dependencies:rep-4",
          text: "You do not audit it — you interrogate it: last commit, open issues, the README's tone, and whether the issues get ANSWERS or apologies. An hour of reading beats any scanner. Scanners list vulnerabilities. Threads reveal whether the humans are still home.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:dependencies:rep-5",
          text: "Then it is a fossil with excellent manners. Fossils either get adopted — someone forks, someone volunteers, Marek maintains it in silence like a park — or they get replaced. Ours got adopted by the community. There is a plaque in the issues. Posted as an emoji. It counts.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:dependencies:rep-6",
          text: "For the four that would end us, yes — vendoring is not cowardice, it is an umbrella. You do not carry an umbrella because rain is cowardly. Pin, mirror, vendor, and document WHY, or the next person deletes your umbrella in a cleanup branch titled 'remove dead code'. I have seen it rain.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:ai-tools",
      label: "AI pair tools",
      optionCandidates: [
        { id: "tomek:ai-tools:opt-1", topicId: "tomek:ai-tools", text: "The AI autocomplete finished my thought. Alarming?" },
        { id: "tomek:ai-tools:opt-2", topicId: "tomek:ai-tools", text: "Do you use the AI tools or type manually?" },
        { id: "tomek:ai-tools:opt-3", topicId: "tomek:ai-tools", text: "The AI wrote a comment with more confidence than code." },
        { id: "tomek:ai-tools:opt-4", topicId: "tomek:ai-tools", text: "Will AI replace pasting from Stack Overflow?" },
        { id: "tomek:ai-tools:opt-5", topicId: "tomek:ai-tools", text: "An AI review flagged my own test as risky. Correct." },
        { id: "tomek:ai-tools:opt-6", topicId: "tomek:ai-tools", text: "Should we tell clients the code is AI-assisted?" },
      ],
      replyCandidates: [
        {
          id: "tomek:ai-tools:rep-1",
          text: "Alarming and instructive — it finished the thought WRONG with total fluency, which is the most humbling mirror available. I treat suggestions like interns: fast, confident, occasionally brilliant, never blamed when I accept them. The accept key is a signature. I sign one in nine.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:ai-tools:rep-2",
          text: "Both. The tool for boilerplate and remembering APIs, manual for anything with consequences. The day it suggests something in the billing module I close the laptop — not from fear. From ceremony. Some rooms the intern does not enter. The module keeps its standards.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:ai-tools:rep-3",
          text: "That is its native language. Confident comments over uncertain code is the house style of every model, and honestly it learned it from us — half of main's comments are bravado with semicolons. The tool is a mirror with better grammar. I read its comments like fiction. Well-edited fiction.",
          relationshipHint: "delighted",
          tags: ["stats:high-focus"],
        },
        {
          id: "tomek:ai-tools:rep-4",
          text: "It replaced the searching, not the judgment. Pasting was never the skill — knowing WHICH answer is lying was. The AI delivers plausible answers faster, so the scar tissue matters more now. Curation did not get automated. It got promoted. My eventual job title: senior curator.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:ai-tools:rep-5",
          text: "Then keep it — a reviewer that catches my own test being fragile is the cheapest second opinion this office has ever hired. It flagged a race condition I wrote at two am and defended in a thread. I lost the argument to a probability distribution. The patch passed. Pride heals.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:ai-tools:rep-6",
          text: "We tell them what we tell auditors: the tools draft, humans own, tests decide. That sentence survives contracts and weather. What I will not do is advertise 'AI-powered' — Przemek would put it on a shirt, Klaudia would put it in a reel, and the billing module would never forgive us.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "tomek:oncall",
      label: "The night phone",
      optionCandidates: [
        { id: "tomek:oncall:opt-1", topicId: "tomek:oncall", text: "You took the night phone for a week. Voluntary?" },
        { id: "tomek:oncall:opt-2", topicId: "tomek:oncall", text: "The three am call had no words. Just the tone." },
        { id: "tomek:oncall:opt-3", topicId: "tomek:oncall", text: "How do you sleep when the phone is on?" },
        { id: "tomek:oncall:opt-4", topicId: "tomek:oncall", text: "Do you dream about alerts? Be honest." },
        { id: "tomek:oncall:opt-5", topicId: "tomek:oncall", text: "Marek wants a rotation. Fair or cowardly?" },
        { id: "tomek:oncall:opt-6", topicId: "tomek:oncall", text: "What is in the night bag by your desk?" },
      ],
      replyCandidates: [
        {
          id: "tomek:oncall:rep-1",
          text: "Voluntary in the way therapy is voluntary — the alternative was knowing, badly, forever. A week of nights taught me what the dashboard does at four am: it calms down. Most red is waiting to be green. I came back with one rule and a chart. Marek framed the chart. The rule is the rotation now.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:oncall:rep-2",
          text: "The wordless ones are the honest ones — the body hears the alert tone before the brain does, and my feet were moving before the second ring. You do not need words at three am. You need shoes, the corridor, and one lamp. The dashboard says the rest in red.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:oncall:rep-3",
          text: "Badly, then structurally: phone on the shelf across the room, ringer set to the tone that means prod only, and one rule — no checking the dashboard 'just to see'. Just to see is how sleep ends. The shelf is far not for laziness. It is far for the ten seconds it takes to care.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:oncall:rep-4",
          text: "I used to dream in alert tones — the brain running drills, spinning up incidents with no resolution. The dreams stopped when the rotation started, which is the strongest argument for sharing the phone I know. The mind keeps the pager warm even when the pager is off. Rotation defrosts it.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:oncall:rep-5",
          text: "Fair, and he proposed it himself, which makes it neither. Marek carrying the phone alone is not heroism, it is a single point of failure with a sleep schedule. The rotation is the first infrastructure decision made FOR a human instead of around one. I endorsed it in writing. He framed it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:marek-trusted-review"],
        },
        {
          id: "tomek:oncall:rep-6",
          text: "Shoes, a hoodie, a charged battery pack, and one protein bar older than some interns — the night bag is a promise to future me that the corridor will not require decisions. Renata added a chocolate once. The chocolate is now tradition. Nobody restocks it faster than she does.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "tomek:naming",
      label: "Naming things",
      optionCandidates: [
        { id: "tomek:naming:opt-1", topicId: "tomek:naming", text: "Naming is the hardest problem. Cliche or true?" },
        { id: "tomek:naming:opt-2", topicId: "tomek:naming", text: "I named a variable 'stuff2'. Confess or rename?" },
        { id: "tomek:naming:opt-3", topicId: "tomek:naming", text: "Your variable names read like sentences. Method?" },
        { id: "tomek:naming:opt-4", topicId: "tomek:naming", text: "What is the worst name in main right now?" },
        { id: "tomek:naming:opt-5", topicId: "tomek:naming", text: "Should names be short or unambiguous?" },
        { id: "tomek:naming:opt-6", topicId: "tomek:naming", text: "We renamed a table and broke prod. Lesson?" },
      ],
      replyCandidates: [
        {
          id: "tomek:naming:rep-1",
          text: "True, with an asterisk: naming is hard because it is a decision about the FUTURE — you are writing a sentence someone reads at three am without you. The cliche survives because every generation rediscovers it mid-rename, holding a thesaurus and a grudge.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:naming:rep-2",
          text: "Rename, but understand why: 'stuff2' is not a name, it is an apology scheduled in advance. The '2' confesses that stuff1 exists somewhere, still loading. Name it for what it holds and the 2 dies naturally. If it holds many things, the name you cannot find is an abstraction waving.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:naming:rep-3",
          text: "Narrate the intent, not the type: 'activeUserCount' beats 'userArr', every time. My method is writing the comment first and stealing the name from it — if the comment needs a paragraph, the variable needs siblings. Names are compression. Bad names are lossy compression.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:naming:rep-4",
          text: "'temp2_final_FIXED' in the billing module, named during a Friday, defended in a comment, now load-bearing. Renaming it requires a regression suite that does not exist. It has become infrastructure. The name is a monument to one man's two pm. I visit it. I leave flowers in comments.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "tomek:naming:rep-5",
          text: "Unambiguous wins. Short is for the writer; clear is for the three am reader, and the reader matters more. 'i' is fine in a three-line loop and a war crime across a file. My rule: could I say this name out loud at standup without embarrassing either of us. Usually.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:naming:rep-6",
          text: "Migrations are contracts with the past — every rename is a promise that the old name still resolves somewhere, for someone, forever. We broke the promise in one deploy. The lesson cost a Tuesday and lives in the runbook: rename in two steps, verify in between, grieve in private.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:talk-submission",
      label: "The talk you never gave",
      optionCandidates: [
        { id: "tomek:talk-submission:opt-1", topicId: "tomek:talk-submission", text: "You almost submitted a conference talk. Details." },
        { id: "tomek:talk-submission:opt-2", topicId: "tomek:talk-submission", text: "What stopped the talk, honestly?" },
        { id: "tomek:talk-submission:opt-3", topicId: "tomek:talk-submission", text: "Klaudia offered to coach your stage presence." },
        { id: "tomek:talk-submission:opt-4", topicId: "tomek:talk-submission", text: "Bartek says speaking is billable. Is it?" },
        { id: "tomek:talk-submission:opt-5", topicId: "tomek:talk-submission", text: "Would the talk be about the rainforest API?" },
        { id: "tomek:talk-submission:opt-6", topicId: "tomek:talk-submission", text: "Submit it next year. I will hold the deadline." },
      ],
      replyCandidates: [
        {
          id: "tomek:talk-submission:rep-1",
          text: "'Honest Postmortems: What the Dashboard Does at Four AM'. Abstract written, deadline missed by one day, story kept for the standup. The irony of missing a deadline about postmortems was noted by Bartek in a group chat I have not left, out of respect for history.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:talk-submission:rep-2",
          text: "A paragraph. The abstract demanded 'three actionable takeaways' and I had two and a confession. In the end the confession was the talk — I just could not sell it as a takeaway. Bartek says confessions bill better than takeaways. He would know. He bills feelings by the hour.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:talk-submission:rep-3",
          text: "She offered a full package: reel, thumbnail, coaching, and the phrase 'authentic vulnerability' in the bio. I declined the phrase and kept the coaching offer for the day the talk exists. Her instinct is right — the content is ready and the courier is missing. Solvable bug.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:talk-submission:rep-4",
          text: "He invoices a workshop for it, so yes, philosophically. His thesis: the talk IS the deliverable and the slides are the invoice. Mine: the talk is a postmortem with an audience. We are both right, which is why we will co-present it eventually. The contract is already drafted. By him.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:talk-submission:rep-5",
          text: "It was the closing act, yes — the origin story, the tenure, the retirement plan. The room would have loved it. The API, I am told, does not attend conferences. Marek said if I told the story wrong he would correct me live. That was the real deadline pressure. Some audiences grade.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:talk-submission:rep-6",
          text: "Deal, witnessed, binding. I will write the abstract the week before and you will hold the deadline like Bartek holds invoices — without mercy and with tea. If the talk happens, you get the first thank-you. If it does not, you get the postmortem. Either way, content.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-apprentice", "relationship:warm"],
        },
      ],
    },
    {
      id: "tomek:local-env",
      label: "Works on my machine",
      optionCandidates: [
        { id: "tomek:local-env:opt-1", topicId: "tomek:local-env", text: "It works on my machine. Defense or confession?" },
        { id: "tomek:local-env:opt-2", topicId: "tomek:local-env", text: "My local env needs seventeen steps to start." },
        { id: "tomek:local-env:opt-3", topicId: "tomek:local-env", text: "The staging env diverged from local again." },
        { id: "tomek:local-env:opt-4", topicId: "tomek:local-env", text: "Should the onboarding script fix the env problem?" },
        { id: "tomek:local-env:opt-5", topicId: "tomek:local-env", text: "Marek rebuilt my env in nine minutes. HOW?" },
        { id: "tomek:local-env:opt-6", topicId: "tomek:local-env", text: "Is a broken local env ever an excuse?" },
      ],
      replyCandidates: [
        {
          id: "tomek:local-env:rep-1",
          text: "A confession wearing armor. It means: my machine has state you cannot see — env vars, cached builds, one config file I edited in 2022 and forgave. The mature version is 'it works on a fresh clone', and I test for THAT, because my machine is not a customer. It is not even a colleague.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:local-env:rep-2",
          text: "Seventeen is a readme begging to exist. My rule: if setup exceeds five steps, each step is a bug in the setup, not in the user. Mine was eleven steps once. Marek made it one command and a wiki page. The command is one word. The wiki page is where the eleven steps go to be remembered.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:local-env:rep-3",
          text: "Divergence is the default state; parity is a chore you schedule. Staging drifts the moment someone hotfixes it at five pm — I have BEEN that someone. The fix is boring: one deploy pipeline for both, and staging gets the same containers, no exceptions, not even on Fridays. Especially not Fridays.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:local-env:rep-4",
          text: "Yes, and make it hostile — the script should fail loudly with the fix printed next to the error. My dream setup prints 'you are missing X, run Y' instead of a stack trace shaped like despair. Onboarding is the product. The script is the front door. Mine has a welcome mat now. Two years.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:local-env:rep-5",
          text: "Because he treats the env as a system with a source of truth instead of a mood with settings. Nine minutes: wipe, script, verify, tea. I watched him not read a single error message. The errors did not exist. The script had made them illegal. That is not speed. That is peace.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:local-env:rep-6",
          text: "As an explanation, always. As an excuse, once. The sentence I accept: 'my env broke, here is what I need, here is how I will make it not break again.' The sentence I reject: 'works on my machine' with no follow-up. The machine is evidence. The fix is the work. Bring both.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:commit-messages",
      label: "The commit message sermons",
      optionCandidates: [
        { id: "tomek:commit-messages:opt-1", topicId: "tomek:commit-messages", text: "Your commit messages are longer than the commits." },
        { id: "tomek:commit-messages:opt-2", topicId: "tomek:commit-messages", text: "Is the imperative mood really that important?" },
        { id: "tomek:commit-messages:opt-3", topicId: "tomek:commit-messages", text: "Someone wrote 'fix stuff' again. Your move." },
        { id: "tomek:commit-messages:opt-4", topicId: "tomek:commit-messages", text: "Do you write commit messages for future you?" },
        { id: "tomek:commit-messages:opt-5", topicId: "tomek:commit-messages", text: "Your 2am commits read like diary entries." },
        { id: "tomek:commit-messages:opt-6", topicId: "tomek:commit-messages", text: "Teach me to write commits like yours." },
      ],
      replyCandidates: [
        {
          id: "tomek:commit-messages:rep-1",
          text: "The commit is the code's biography and 'fix stuff' is an unauthorized autobiography. When Marek investigates an incident at 3am, the commit log is the only witness statement. I write for the investigator, because the investigator is always me, always tired, and always holding a coffee with a grudge.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:commit-messages:rep-2",
          text: "Imperative mood means the log reads as instructions: 'add validation', not 'added validation'. History becomes a checklist the code completed. It matters because readability compounds — ten thousand commits from now, someone's git blame session depends on whether past-us could be bothered with grammar. Past-us could. Past-us had rules.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:commit-messages:rep-3",
          text: "My move is nothing. I annotate around it like water. But at the next retro I will present 'fix stuff' next to its diff, which was forty files, and I will say nothing while the room reads it. Silence is my loudest review format. The author will rewrite their history voluntarily. They always do.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:commit-messages:rep-4",
          text: "Future me is my most important colleague and our relationship is entirely written. He arrives at every incident with no memory and total authority. Every message I write is a letter to him: 'this looks wrong but it is intentional, here is why, do not revert me at 3am'. He never listens. But the letters matter. It is the principle.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:commit-messages:rep-5",
          text: "The 2am commits are honest in a way daytime commits are not. 'This works but I do not know why' — that is a confession, and confessions are documentation. Friday-me cleans up the grammar; 2am-me supplies the truth. Between the two of us, the repository is the most honest document this company keeps.",
          relationshipHint: "pleased",
          tags: ["period:evening"],
        },
        {
          id: "tomek:commit-messages:rep-6",
          text: "Subject under fifty characters, blank line, then the WHY — never the what, the diff does the what. Write it for the angriest future reader, and if the change is weird, say it is weird in the message. 'Yes, this is intentional' has saved more production days than any test I have ever written. I will teach you on one condition: you never write 'misc fixes'. Never.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-apprentice"],
        },
      ],
    },
    {
      id: "tomek:meeting-refusals",
      label: "The meeting refusals",
      optionCandidates: [
        { id: "tomek:meeting-refusals:opt-1", topicId: "tomek:meeting-refusals", text: "You declined Zosia's sync. Bold. Alive?" },
        { id: "tomek:meeting-refusals:opt-2", topicId: "tomek:meeting-refusals", text: "How do you decline a meeting politely?" },
        { id: "tomek:meeting-refusals:opt-3", topicId: "tomek:meeting-refusals", text: "Is declining meetings a career risk?" },
        { id: "tomek:meeting-refusals:opt-4", topicId: "tomek:meeting-refusals", text: "You decline with a document link attached." },
        { id: "tomek:meeting-refusals:opt-5", topicId: "tomek:meeting-refusals", text: "Przemek scheduled a call to discuss the decline." },
        { id: "tomek:meeting-refusals:opt-6", topicId: "tomek:meeting-refusals", text: "Which meetings do you always accept?" },
      ],
      replyCandidates: [
        {
          id: "tomek:meeting-refusals:rep-1",
          text: "Alive and at peace. The sync had no agenda, which means it was a mood with a conference room. I offered an async update instead and the world continued turning. Zosia respects a decline with a reason more than an acceptance with a corpse. I attended the NEXT one. Strategy, not anarchy. The meetings I accept are the ones that end early.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:meeting-refusals:rep-2",
          text: "Decline fast, decline kindly, and always attach an alternative: 'cannot make it — here is my update in writing, and here is thirty minutes Thursday if this truly needs me'. The alternative is the politeness. A naked decline is a declaration of war; a decline with a replacement is time management. The difference is one paragraph and it changes everything.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:meeting-refusals:rep-3",
          text: "Only if you decline everything, which is cowardice with extra steps. I accept the meetings where decisions happen and decline the ones where feelings are workshopped. My review said 'protects focus aggressively'. That sentence is in my file forever and it is the best performance review sentence I will ever receive.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:meeting-refusals:rep-4",
          text: "The document is the meeting, pre-consumed. Ninety percent of meetings are a document read aloud to people who type slowly. I write the document, I link it, and if anyone still needs faces after that, the need was never about the content. The link has killed more meetings than any policy. I keep a count. We do not discuss the count in front of Zosia.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:meeting-refusals:rep-5",
          text: "A MEETING ABOUT THE DECLINE. I declined that one too — with a document. The document was one line: 'this meeting is about a meeting'. Przemek framed it. He says it is the funniest thing engineering ever sent him. The sales floor and I have an understanding now: they schedule, I document, and everyone's calendar survives another week.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "period:afternoon"],
        },
        {
          id: "tomek:meeting-refusals:rep-6",
          text: "Incident reviews, code review disputes, and anything where Marek says the word 'diagram' in the invite. Those meetings END things. Ending things is the entire value of gathering humans into a room. Everything else is a status update wearing pants, and status updates can be text. I accept maybe one in four. The one is worth the four.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:readme",
      label: "The README doctrine",
      optionCandidates: [
        { id: "tomek:readme:opt-1", topicId: "tomek:readme", text: "The repo has no README. Again." },
        { id: "tomek:readme:opt-2", topicId: "tomek:readme", text: "What makes a README actually good?" },
        { id: "tomek:readme:opt-3", topicId: "tomek:readme", text: "You wrote a README for the coffee machine?" },
        { id: "tomek:readme:opt-4", topicId: "tomek:readme", text: "Pawel cited your README in standup." },
        { id: "tomek:readme:opt-5", topicId: "tomek:readme", text: "Do READMEs go stale like everything else?" },
        { id: "tomek:readme:opt-6", topicId: "tomek:readme", text: "Marek's runbooks versus your READMEs — beef?" },
      ],
      replyCandidates: [
        {
          id: "tomek:readme:rep-1",
          text: "A repo without a README is a house without a door — technically full of rooms, functionally a trap. I have started leaving annotated sticky notes on the monitors of README-less repos. Passive aggression? No. ARCHITECTURE SHAMING. It works on a two-day lag. The sticky notes have a style. The style is 'question marks'.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:readme:rep-2",
          text: "It answers three questions in the first ten lines: what is this, how do I run it, and where does it hurt. Everything else is decoration. The best README I ever read was seven lines and saved a weekend. The worst was a novel with a changelog from 2019 that lied about everything, including the author's own name. Brevity plus honesty. That is the entire craft.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:readme:rep-3",
          text: "Someone has to document the water-to-descale ratio and the god ritual with the tap. Janusz knows it by feel; I wrote it down for the day Janusz wins the lottery. The README is taped inside the cupboard, laminated at Pawel's insistence. It is the most-read documentation in this office and it lives next to the filters. Documentation should live where the pain is.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:readme:rep-4",
          text: "He cited it, with a QUOTE, in front of everyone. I have achieved the final form of documentation: being footnoted by an intern. It is the professional peak. Marek nodded, which for us is a standing ovation. I have printed nothing and framed nothing and I am fine. The citation is saved. Digitally. Where I can visit it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-read-the-script"],
        },
        {
          id: "tomek:readme:rep-5",
          text: "Everything goes stale — that is why my READMEs carry a 'last verified' date instead of pretending immortality. A README that admits its age is trusted; a README that pretends is a liar with formatting. Marek and I disagree on runbooks versus READMEs but we agree on this: docs are perishables. Date them like milk.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:readme:rep-6",
          text: "Not beef — taxonomy. His runbooks are for 3am: terse, numbered, written by a man who assumes the reader is crying. My READMEs are for day one: gentle, opinionated, occasionally funny against their will. You need both. The office has both. The system works and the only competition between us is who gets cited first in an incident. He usually wins. He types faster when angry.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:trackball",
      label: "The trackball evangelism",
      optionCandidates: [
        { id: "tomek:trackball:opt-1", topicId: "tomek:trackball", text: "You brought your trackball to a client site." },
        { id: "tomek:trackball:opt-2", topicId: "tomek:trackball", text: "Why is a trackball better than a mouse?" },
        { id: "tomek:trackball:opt-3", topicId: "tomek:trackball", text: "The trackball has a name. I can see the label." },
        { id: "tomek:trackball:opt-4", topicId: "tomek:trackball", text: "Pawel ordered a trackball because of you." },
        { id: "tomek:trackball:opt-5", topicId: "tomek:trackball", text: "Marek called your trackball 'a ball'." },
        { id: "tomek:trackball:opt-6", topicId: "tomek:trackball", text: "What happens when the trackball breaks?" },
      ],
      replyCandidates: [
        {
          id: "tomek:trackball:rep-1",
          text: "I brought my keyboard too. Client machines are where productivity goes to die and I refuse to demo code through someone else's sticky mouse. The consultant look is: own hardware, own opinions. Bartek approved the invoice line 'ergonomic equipment'. The line item is the most honest thing in our expenses and it is twelve zloty of ball.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:trackball:rep-2",
          text: "The arm does not travel. The fingers do the precision work and the shoulder retires from pointer duty forever. I converted to trackball in 2021 after a wrist week I do not discuss, and my RSI has not returned since. This is not preference, it is medicine with a ball. I have a pamphlet. I printed it myself. You will be offered it.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:trackball:rep-3",
          text: "Her name is Preclka and she is the second of her line — the first died in the Flood of the Server Room, may she rest. Labeling equipment is not eccentric, it is inventory management with feelings. Marek labels servers, I label peripherals. We are the same man at different frequencies and I will hear no arguments.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:trackball:rep-4",
          text: "He did, and it arrives Thursday, and I have cleared my afternoon for the onboarding — there is a grip to learn, a DPI to set, and a moment every convert has where they say 'oh' and never go back. I witnessed that 'oh' in myself. I want to witness it in him. This is what mentorship actually is. The ducks and commits are filler.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:trackball:rep-5",
          text: "'A ball.' Two syllables, total contempt, zero curiosity. But then I watched him pick it up, turn it over, and quietly read the DPI specs while pretending to check cables. He ordered one that night — I saw the delivery box. His desk now hosts a ball and his dignity hosts a secret. This is how all my evangelism works. Slow, silent, inevitable.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:trackball:rep-6",
          text: "Preclka the Second has a spare in a drawer, a spare OF the spare at home, and a maintenance schedule — the ball pops out, the socket gets cleaned, quarterly, like a ritual. When she eventually dies I will hold a small ceremony and Janusz will attend because Janusz attends all funerals of working equipment. The office has norms. I did not create them. I merely respect them.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "tomek:code-music",
      label: "The code music",
      optionCandidates: [
        { id: "tomek:code-music:opt-1", topicId: "tomek:code-music", text: "What do you actually listen to while coding?" },
        { id: "tomek:code-music:opt-2", topicId: "tomek:code-music", text: "Is that the same song on repeat for four hours?" },
        { id: "tomek:code-music:opt-3", topicId: "tomek:code-music", text: "Headphones on means do not talk, right?" },
        { id: "tomek:code-music:opt-4", topicId: "tomek:code-music", text: "You made Marek a coding playlist. He used it?" },
        { id: "tomek:code-music:opt-5", topicId: "tomek:code-music", text: "The debugging playlist has one song. Explain." },
        { id: "tomek:code-music:opt-6", topicId: "tomek:code-music", text: "Does silence work better for you ever?" },
      ],
      replyCandidates: [
        {
          id: "tomek:code-music:rep-1",
          text: "Depends on the code. Refactoring wants techno — repetitive, forgiving, no lyrics to argue with. Writing tests wants film scores, because tests are heroism with paperwork. Debugging wants ONE song on loop, which looks like madness and is actually a metronome for the mind. My playlists are documentation of my mental states. Archivists will be grateful.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:code-music:rep-2",
          text: "Same song until the bug dies. The song becomes transparent after twenty minutes — the brain files it as furniture and stops parsing it. What remains is rhythm, and rhythm is all a debugging session needs. Marek does the same with server fans. We are both entrained to a hum. The difference is mine has a beat and his has a warranty.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:code-music:rep-3",
          text: "Headphones on is a semaphore system. Both on: deep work, approach with text. One on: listening to the build AND the room, approach with words. Off: I am either done or defeated, approach with snacks. This is all documented in the office wiki, page 'Tomek'. I wrote the page. Nobody reads it and everyone obeys it. Culture is amazing.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:code-music:rep-4",
          text: "He used it ONCE and the feedback was 'acceptable, track three skipped'. From Marek that is a Grammy. The playlist had eleven hours of no-lyrics anything and one joke track at the end — the coffee machine's hum, recorded by Pawel on a dare. Marek skipped to it, listened fully, and said 'accurate'. I have never been prouder of a documented appliance.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:code-music:rep-5",
          text: "It is a ten-minute ambient piece called, I am not inventing this, 'Slow Descent Into Billing Errors'. I found it at 2am during the invoice incident and now the opening three seconds trigger a state of investigative calm no meditation app has matched. The playlist has one song because the playlist IS one song. The song has tenure.",
          relationshipHint: "neutral",
          tags: ["period:evening"],
        },
        {
          id: "tomek:code-music:rep-6",
          text: "For reading other people's code — silence, always. Their code is already talking and it is saying things. Music over someone else's chaos is two arguments at once. So: my code gets a soundtrack, the world's code gets silence. The office has learned to read my headphones like weather. Pawel brings tea when the silence goes long. The boy is learning triage.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "tomek:estimates",
      label: "The estimate fiction",
      optionCandidates: [
        { id: "tomek:estimates:opt-1", topicId: "tomek:estimates", text: "Your estimates are never right. Yours, specifically." },
        { id: "tomek:estimates:opt-2", topicId: "tomek:estimates", text: "What does 'two days' mean in your units?" },
        { id: "tomek:estimates:opt-3", topicId: "tomek:estimates", text: "Bartek wants estimates in writing now." },
        { id: "tomek:estimates:opt-4", topicId: "tomek:estimates", text: "Why did the last estimate come in early?" },
        { id: "tomek:estimates:opt-5", topicId: "tomek:estimates", text: "Marek estimates in minutes. Wizardry?" },
        { id: "tomek:estimates:opt-6", topicId: "tomek:estimates", text: "How do I get better at estimating?" },
      ],
      replyCandidates: [
        {
          id: "tomek:estimates:rep-1",
          text: "My estimates are not wrong, they are HONEST AT THE TIME. Estimating is forecasting the weather of a system I have not opened yet. The forecast said two days; the system contained a surprise written by a departed colleague with a grudge against naming. That is not error, that is archaeology. Archaeology has no deadlines and I will die defending this.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:estimates:rep-2",
          text: "'Two days' means two days of ME, at MY desk, with NO meetings, assuming the tests behave and the framework does not release anything. In standardized units: one Tomek-day equals three calendar days or five if Przemek books a client call. I publish the conversion table. Nobody reads it. Everybody needs it.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:estimates:rep-3",
          text: "In writing is FINE. Written estimates have floors and ceilings now — 'two days if nothing lives in the legacy folder, five if it does'. Bartek respects a ranged estimate the way accountants respect a margin. The trick is making uncertainty look like rigor instead of fear. Confidence is just error bars with posture.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:estimates:rep-4",
          text: "Because I padded it like a mattress and then felt guilty and worked like a man being chased. Early delivery feels like winning and trains everyone to distrust the next estimate, which is the actual cost. I am learning to deliver ON the estimate and spend the surplus reading. The reading surplus is the healthiest feature of senior life and nobody teaches it.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:estimates:rep-5",
          text: "Not wizardry — scar tissue with decimals. Marek has seen every failure mode this stack produces, so his 'twenty minutes' includes the twenty minutes of the thing being haunted. My estimates are theory; his are memoir. In ten years mine will be memoir too, and I will be terse, and correct, and slightly feared at planning meetings. The circle of life.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:estimates:rep-6",
          text: "Keep a diary: the estimate, the actual, and the reason for the gap. Within three months you will discover your personal constant — mine is one point six, Pawel's is three, and knowing it is the entire superpower. Estimate, multiply by your constant, and hand over the result with a straight face. You will look psychic. You are actually just bookkeeping. Better.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-apprentice"],
        },
      ],
    },
    {
      id: "tomek:dogma",
      label: "The dogma list",
      optionCandidates: [
        { id: "tomek:dogma:opt-1", topicId: "tomek:dogma", text: "You have a list of opinions you refuse to soften?" },
        { id: "tomek:dogma:opt-2", topicId: "tomek:dogma", text: "What is on the dogma list this quarter?" },
        { id: "tomek:dogma:opt-3", topicId: "tomek:dogma", text: "Isn't dogma just stubbornness with branding?" },
        { id: "tomek:dogma:opt-4", topicId: "tomek:dogma", text: "Marek read your dogma list and agreed with all of it." },
        { id: "tomek:dogma:opt-5", topicId: "tomek:dogma", text: "Has any dogma ever been demoted?" },
        { id: "tomek:dogma:opt-6", topicId: "tomek:dogma", text: "Can I add something to the dogma list?" },
      ],
      replyCandidates: [
        {
          id: "tomek:dogma:rep-1",
          text: "It is in my notebook, page one, titled 'NON-NEGOTIABLE UNTIL CONVINCED'. The title is the point — dogma with an appeal process. Everything on the list earned its place through pain: a production incident, a weekend lost, a lesson with a receipt. Soft opinions are free. These cost money. Mine, emotionally.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:dogma:rep-2",
          text: "Three entries. One: tests before refactors, no exceptions, the exceptions caused incidents. Two: no clever code — clever code is a puzzle you mail to a tired stranger. Three: the database is the source of truth, not the slide deck about the database. Entry three was added after the billing quarter and it will outlive me.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:dogma:rep-3",
          text: "Stubbornness is refusing to update. Dogma is refusing to RE-learn what pain already taught you. The distinction matters in code review — I will adopt your pattern in a heartbeat if you show me the incident it prevents. What I will not do is relitigate settled pain every quarter for variety. Some wheels exist because round works. Round is not up for debate.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:dogma:rep-4",
          text: "He agreed with ALL of it, out loud, in front of Pawel, and then added a fourth entry in his own handwriting: 'label the cables'. The list now lives in two notebooks and we have joint custody. It is the closest thing to a treaty our departments have ever signed. Zosia wants to frame it. We are considering it. The frame would say 'ACCORD'.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:tomek-apprentice"],
        },
        {
          id: "tomek:dogma:rep-5",
          text: "One, and I threw it a retirement party of one. 'Never use the cloud for backups' — I wrote it in 2021, defended it for two years, and then Pawel's restore drill worked in eleven minutes and the dogma died with dignity. It is archived in the back of the notebook with a date, like a retired jersey. The archive is the difference between dogma and personality.",
          relationshipHint: "neutral",
          tags: ["quest:pawel-restore-drill"],
        },
        {
          id: "tomek:dogma:rep-6",
          text: "You can propose, and the bar is one bad night. Anything you want on the list must have cost someone sleep — a story, a timestamp, a scar. Opinions without scars go on a different list, the one titled 'THEORIES', which is longer, softer, and honestly more fun at parties. Every entry starts in THEORIES. Pain promotes them. That is the whole constitution.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "tomek:pen-and-paper",
      label: "The pen and paper method",
      optionCandidates: [
        { id: "tomek:pen-and-paper:opt-1", topicId: "tomek:pen-and-paper", text: "You design on paper first? Still? In this economy?" },
        { id: "tomek:pen-and-paper:opt-2", topicId: "tomek:pen-and-paper", text: "What is the notebook system? Numbered pages, really?" },
        { id: "tomek:pen-and-paper:opt-3", topicId: "tomek:pen-and-paper", text: "Your whiteboard sketches become tickets." },
        { id: "tomek:pen-and-paper:opt-4", topicId: "tomek:pen-and-paper", text: "Pawel bought a notebook because of you." },
        { id: "tomek:pen-and-paper:opt-5", topicId: "tomek:pen-and-paper", text: "Did paper ever save a production incident?" },
        { id: "tomek:pen-and-paper:opt-6", topicId: "tomek:pen-and-paper", text: "Dawid saw your notebook. His reaction?" },
      ],
      replyCandidates: [
        {
          id: "tomek:pen-and-paper:rep-1",
          text: "Paper does not autocomplete, ping, or suggest a framework. It holds the shape of the problem while the problem is still shy. Every system I have not regretted started as a rectangle and some arrows on A5. The economy can keep its tools. The rectangle comes first. The rectangle has never once crashed.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:pen-and-paper:rep-2",
          text: "Numbered, dated, indexed in the back — it is a database with a spine. When someone asks 'when did we decide that', I do not scroll, I FLIP, and the flipping has sound effects that intimidate the meeting into order. Fourteen completed notebooks on the shelf at home. Notebook fifteen started this week. Its first page says 'the queue is not the problem'. Ominous. Accurate.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:pen-and-paper:rep-3",
          text: "They do, because a sketch forces scope — a box either fits on the whiteboard or it does not belong in the sprint. Half my tickets are photographs of whiteboards with one arrow circled. Marek accepts photo-tickets without comment. The whiteboard is our shared compiler and the tickets are its output. The cycle has run for years without a single merge conflict.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:pen-and-paper:rep-4",
          text: "He bought a grid one, A5, and asked me how to start it. The advice: page one is not sacred, just write something — the notebook earns its value from volume, not from a perfect opening line. He wrote 'hello notebook'. I nearly died. The kid then filled forty pages in a month and now indexes the thing. The student surpasses. It is disgusting. I love it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:pen-and-paper:rep-5",
          text: "The payment incident of last spring. The dashboards were lying, the logs were lying, and the only honest record was my notebook — I had drawn the flow by hand two weeks earlier, and the drawing did not match the behavior. The mismatch was the bug. Paper remembered what the system forgot. Marek now calls my notebook 'the ledger'. It is on the oncall wiki. By name.",
          relationshipHint: "pleased",
          tags: ["quest:marek-showed-the-log"],
        },
        {
          id: "tomek:pen-and-paper:rep-6",
          text: "He looked at it for a while and said 'analog version control', and then he showed me HIS notebook, which is graph paper with margin notes in four colors, and we compared systems for twenty minutes like two men trading knives. The CEO and I are notebook people. Nobody else needs to understand it. The margins have spoken.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "tomek:breaking-changes",
      label: "The breaking changes",
      optionCandidates: [
        { id: "tomek:breaking-changes:opt-1", topicId: "tomek:breaking-changes", text: "Is the API change really breaking or just rude?" },
        { id: "tomek:breaking-changes:opt-2", topicId: "tomek:breaking-changes", text: "How do you ship a breaking change safely?" },
        { id: "tomek:breaking-changes:opt-3", topicId: "tomek:breaking-changes", text: "The client blames us for their old integration." },
        { id: "tomek:breaking-changes:opt-4", topicId: "tomek:breaking-changes", text: "You kept a deprecated endpoint alive for one user." },
        { id: "tomek:breaking-changes:opt-5", topicId: "tomek:breaking-changes", text: "Marek wants to break it tonight. Tonight." },
        { id: "tomek:breaking-changes:opt-6", topicId: "tomek:breaking-changes", text: "What is the worst breaking change you shipped?" },
      ],
      replyCandidates: [
        {
          id: "tomek:breaking-changes:rep-1",
          text: "Breaking is anything that makes a working caller stop working, and rudeness is a subset of breaking that includes surprise. The change itself was inevitable; the rollout was the crime scene. Semver exists so the API can confess its intentions in advance. A major version bump is an apology letter you write BEFORE the apology is needed.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:breaking-changes:rep-2",
          text: "In three moves: ship the new thing alongside the old, announce the old thing's funeral date in writing, and keep the old thing alive past the funeral like a guest who will not leave. Deprecation is a hospice, not an execution. Every silent breaking change becomes a 2am page, and 2am pages have authors, and the authors have memories. Mine are long.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:breaking-changes:rep-3",
          text: "Their integration ignored two deprecation notices, a changelog, and a direct email with the subject 'THIS WILL BREAK'. Bartek is handling the diplomacy because he speaks fluent sorry. Technically we are innocent. Emotionally we are guilty, because the user does not read semver, the user reads the error message. The error message was rude. I have rewritten it in penance.",
          relationshipHint: "annoyed",
          tags: ["quest:got-acme-contract"],
        },
        {
          id: "tomek:breaking-changes:rep-4",
          text: "One user, one endpoint, seven extra lines of code, zero regrets. The user was a school that runs our export every Friday for a printer older than me. Killing their endpoint to save seven lines is the kind of efficiency that makes headlines for the wrong reasons. The endpoint stays until their printer dies. I have named it 'the museum'. Museums are load-bearing.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:breaking-changes:rep-5",
          text: "Marek breaks things at night because night is quiet and he is a night predator. I negotiate ONE sunset cycle: the deprecation notice goes out tonight, the break happens in a week, and the week has saved us twice already — once when a client surfaced from a lake vacation to a warning they could actually act on. The predator accepts the calendar. The calendar is civilization.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:breaking-changes:rep-6",
          text: "The rename of 2023. One field, 'name' to 'fullName', semantically beautiful, politically devastating — four integrations broke in ways that rhymed. I shipped it on a Friday, which is its own dogma violation, and I have honored the scar ever since. The incident review produced the sunset-cycle rule. Every rule I have has a body count. That one has four.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "tomek:comments",
      label: "The comment philosophy",
      optionCandidates: [
        { id: "tomek:comments:opt-1", topicId: "tomek:comments", text: "You delete comments. Explain yourself." },
        { id: "tomek:comments:opt-2", topicId: "tomek:comments", text: "What earns a comment in your book?" },
        { id: "tomek:comments:opt-3", topicId: "tomek:comments", text: "Your 'why' comments have saved me twice." },
        { id: "tomek:comments:opt-4", topicId: "tomek:comments", text: "The commented-out code blocks. Archaeology?" },
        { id: "tomek:comments:opt-5", topicId: "tomek:comments", text: "Someone left a comment blaming you by name." },
        { id: "tomek:comments:opt-6", topicId: "tomek:comments", text: "Teach me your comment rules in one minute." },
      ],
      replyCandidates: [
        {
          id: "tomek:comments:rep-1",
          text: "I delete comments that LIE — the ones describing code that was refactored years ago and left the comment standing like a museum placard for a painting that was sold. A lying comment is worse than no comment: no comment admits silence, a lying comment testifies falsely under oath. The deletions are documented in the diff. The diff never lies. That is the division of labor.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:comments:rep-2",
          text: "A comment earns its line by answering WHY, and only why. The what is the code's job. If the code cannot say what it does, the fix is better code, not commentary. But WHY — why the retry is three not five, why this normalizes with a fudge factor from 2022 — that is invisible in any syntax and dies without a comment. I fund the why. I evict the what.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:comments:rep-3",
          text: "Twice is a return rate most investments would envy. The why-comments are written for exactly one reader: the person who inherits this at the worst moment of their week. That person is always eventually me. Writing them is professional empathy with a commit hash. Your two saves are the entire business case and I will be citing them at the next review.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:comments:rep-4",
          text: "Archaeology that overstayed. Commented-out code is a corpse kept in the living room 'just in case' — git IS the just in case, git remembers everything, that is its one redeeming feature. I remove the corpses on first contact. The author has never once come back for them. Six years of watching. Nobody has ever returned for a commented-out body. Never once.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:comments:rep-5",
          text: "I saw it. 'Do not touch this, Tomek will know.' I framed nothing and framed everything. The comment is accurate — I DO know, the knowledge is stored in a scar from the very incident the comment guards. Being the warning label on dangerous code is the highest honor this profession offers short of a statue. Marek has one too. His says 'ask Marek'. We are a warning system.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:comments:rep-6",
          text: "One minute: comment the why, never the what; delete comments that lie; burn commented-out code on sight; write every comment to a tired stranger at 3am because that stranger is you; and if something is dangerous, leave a warning with a name on it. Names make warnings work. That is the whole religion, and it fits on a sticky note. Laminated. Obviously laminated.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-apprentice"],
        },
      ],
    },
    {
      id: "tomek:fraud-feeling",
      label: "The fraud feeling",
      optionCandidates: [
        { id: "tomek:fraud-feeling:opt-1", topicId: "tomek:fraud-feeling", text: "Do you ever feel like a fraud here?" },
        { id: "tomek:fraud-feeling:opt-2", topicId: "tomek:fraud-feeling", text: "Everyone acts like they belong. Actively?" },
        { id: "tomek:fraud-feeling:opt-3", topicId: "tomek:fraud-feeling", text: "I fixed prod once and still feel fake." },
        { id: "tomek:fraud-feeling:opt-4", topicId: "tomek:fraud-feeling", text: "Marek said your incident notes read senior." },
        { id: "tomek:fraud-feeling:opt-5", topicId: "tomek:fraud-feeling", text: "When does the fraud feeling actually stop?" },
        { id: "tomek:fraud-feeling:opt-6", topicId: "tomek:fraud-feeling", text: "What do you do on the bad days?" },
      ],
      replyCandidates: [
        {
          id: "tomek:fraud-feeling:rep-1",
          text: "Weekly, on schedule, usually Tuesday. The fraud feeling is not evidence, it is calibration — it shows up when the work is real enough to matter. Nobody feels like a fraud doing tutorials. The feeling means you left the tutorial. I have named mine 'the auditor'. It shows up, I show it the commit log, it leaves unsatisfied. Every week. Forever, probably.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:fraud-feeling:rep-2",
          text: "Nobody belongs here ACTIVELY. Everyone belongs here RECENTLY — Marek belongs because of eleven years of Tuesdays, not because of some certificate on his wall that I have never seen and he would never show. Belonging is a verb with a lag. You are doing the verb right now. The lag will catch up. It always catches up. Ask the wall of work nobody saw us do.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:fraud-feeling:rep-3",
          text: "The feeling is lying with good posture. You fixed PROD — that is the real place, where the money lives and the pages go out. Fake people do not fix prod; fake people do not get paged. The feeling will file a counterargument. Show it the fix. It will grumble. It never actually reads the fix. The auditor is all vibe and no evidence. Ignore it with pride.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:fraud-feeling:rep-4",
          text: "He said that OUT LOUD? To PEOPLE? Okay. Okay. I am going to be normal about this. I am not going to laminate the compliment. I am not going to read it nightly. It is in my notebook, page one, below the dogma, where I keep evidence against the auditor. Marek's words outrank the auditor. That is just peer review. The highest form. No further questions.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:marek-showed-the-log"],
        },
        {
          id: "tomek:fraud-feeling:rep-5",
          text: "It does not stop, it changes units. Junior fraud is 'I do not know things'. Mid fraud is 'I know things but not enough'. Senior fraud is 'people think I know things'. Marek, who knows everything this stack can do, told me he feels it too, and I laughed until the chair complained. The feeling is a permanent tenant. You just stop paying its rent.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:fraud-feeling:rep-6",
          text: "I keep a 'done' file — screenshots of fixed things, thank-you messages, one photo of the whiteboard the morning the billing incident died. The auditor does not accept evidence, but I show it anyway, and somewhere around screenshot four it gets bored and leaves. Also: I fix one tiny thing. A label, a lint rule. Momentum is fraud's only predator. Small wins, daily, forever.",
          relationshipHint: "delighted",
          tags: ["stats:low-focus", "period:evening"],
        },
      ],
    },
    {
      id: "tomek:woodworking",
      label: "The weekend woodworking",
      optionCandidates: [
        { id: "tomek:woodworking:opt-1", topicId: "tomek:woodworking", text: "You build furniture? Actual wood furniture?" },
        { id: "tomek:woodworking:opt-2", topicId: "tomek:woodworking", text: "Measure twice, cut once — real rule or merch?" },
        { id: "tomek:woodworking:opt-3", topicId: "tomek:woodworking", text: "The desk shelf in the office is yours?" },
        { id: "tomek:woodworking:opt-4", topicId: "tomek:woodworking", text: "Did wood teach you anything about code?" },
        { id: "tomek:woodworking:opt-5", topicId: "tomek:woodworking", text: "Janusz saw your joints and had opinions." },
        { id: "tomek:woodworking:opt-6", topicId: "tomek:woodworking", text: "Build me something. Name a price." },
      ],
      replyCandidates: [
        {
          id: "tomek:woodworking:rep-1",
          text: "Wood is the only material that argues honestly. Code fails silently and blames the environment; wood fails loudly and blames YOU, immediately, with splinters. I make shelves, boxes, and one chair that is legally a stool. The workshop is a corner of my kitchen and the sawdust situation is a diplomatic issue with my downstairs neighbor, who is owed a bookshelf by spring.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:woodworking:rep-2",
          text: "Real rule, and it generalizes: the check is cheaper than the mistake, in wood, in code, in everything. Measure twice is just 'write the test first' with sawdust on it. I do not trust a cut I have not penciled, and I do not trust a deploy I have not dry-run. The rule is not merch. The rule is scar tissue in slogan form. All good slogans are.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:woodworking:rep-3",
          text: "Mine — pine, three planks, hidden brackets, and it holds the entire printer mythology one meter off the ground. I built it during the week we could not deploy, which my therapist would call channeling. It has a knot in the left plank that looks like the Batman sign if you squint. Nobody else sees it. Zosia pretends to. The knot stays.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:woodworking:rep-4",
          text: "Everything, honestly. Wood taught me that materials have grain — you work WITH it or you fight it and lose expensively. Codebases have grain too: the patterns the original authors favored. Fighting the grain produces code nobody can maintain. Reading the grain first is senior behavior, whether the material is oak or someone's 2019 service. Wood is just more honest about it.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:woodworking:rep-5",
          text: "He inspected my dovetails for a full minute without blinking and then said 'hand cut', and the tone was the tone he uses for clean server rooms. We now have a standing arrangement: he sharpens, I sand, and he has requested a small cabinet for his screw drawer overflow. The commission is the highest honor I have received in this building and it will be my best work.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:woodworking:rep-6",
          text: "No price — commissions from colleagues are paid in coffee and patience, and the queue is three deep: Janusz's cabinet, a plant stand Renata described with her hands, and a mystery Grazyna item that her note describes only as 'a lockable honesty box'. You are behind the honesty box. The honesty box will be magnificent.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:afternoon"],
        },
      ],
    },
    {
      id: "tomek:deprecated",
      label: "The deprecated things",
      optionCandidates: [
        { id: "tomek:deprecated:opt-1", topicId: "tomek:deprecated", text: "You keep a list of deprecated things you love?" },
        { id: "tomek:deprecated:opt-2", topicId: "tomek:deprecated", text: "What is the most beloved dead technology on it?" },
        { id: "tomek:deprecated:opt-3", topicId: "tomek:deprecated", text: "Deprecating something is not killing it. Discuss." },
        { id: "tomek:deprecated:opt-4", topicId: "tomek:deprecated", text: "You used a deprecated API in prod. Deliberately?" },
        { id: "tomek:deprecated:opt-5", topicId: "tomek:deprecated", text: "Marek found your list and added an entry." },
        { id: "tomek:deprecated:opt-6", topicId: "tomek:deprecated", text: "Which deprecated thing would you resurrect?" },
      ],
      replyCandidates: [
        {
          id: "tomek:deprecated:rep-1",
          text: "The list is in the back of notebook twelve, titled 'EXTINCT BUT CORRECT'. Deprecation is not a verdict on quality — it is a verdict on politics, marketing, and momentum. Some of the finest interfaces ever designed are deprecated. The list honors them the way Janusz honors discontinued cleaning products: seriously, and without irony. Well. Some irony.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:deprecated:rep-2",
          text: "The feed reader. The day it died, the internet became something you are fed instead of something you tend. RSS was gardening; the algorithm is tube feeding. It is on the list at position one and it will be at position one until something dethrones it, which requires someone to reinvent subscription and call it 'innovative'.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:deprecated:rep-3",
          text: "Discussing: deprecation is a death row with excellent healthcare. The deprecated thing keeps running, often for years, sustained by the people who loved it — my museum endpoint, your grandmother's browser, the office fax. Deprecation is the beginning of a long, dignified retirement, and the retirement party is the changelog. I attend every one. Verbally. In comments.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:deprecated:rep-4",
          text: "Deliberately, with a comment that says 'deprecated, chosen, justified below'. The modern alternative added a dependency, a build step, and a weekend for one screen of internal tooling. The deprecated call is seven characters and immortal. Engineering is choosing the boring thing ON PURPOSE and documenting the courage it took. The comment has a paragraph.",
          relationshipHint: "annoyed",
        },
        {
          id: "tomek:deprecated:rep-5",
          text: "He added 'RS-232' at the top, above RSS, in pen, and wrote 'serial never lied to anyone'. The list now has two curators and a hierarchy of dead things. Marek defending serial ports was the day I understood him completely: he does not hate technology, he hates BETRAYAL, and serial never betrayed. The list is a friendship document now. Notebook twelve is basically a treaty.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "tomek:deprecated:rep-6",
          text: "The status page that just said 'fine' or 'not fine'. One word, total honesty, zero dashboard. The modern status page is a novel where all the incidents are off-page. Give me one honest word updated by a human with opinions. I would fund it. I have DESIGNED it, in notebook thirteen, with fonts. The resurrection requires only an incident and a quiet Friday. Both are coming.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "tomek:linting",
      label: "The linter co-author",
      optionCandidates: [
        { id: "tomek:linting:opt-1", topicId: "tomek:linting", text: "You configured the linter for two days. Two days?" },
        { id: "tomek:linting:opt-2", topicId: "tomek:linting", text: "The linter flagged your own commit this morning." },
        { id: "tomek:linting:opt-3", topicId: "tomek:linting", text: "Is the linter policy too strict for newcomers?" },
        { id: "tomek:linting:opt-4", topicId: "tomek:linting", text: "Pawel calls the linter 'the bouncer' now." },
        { id: "tomek:linting:opt-5", topicId: "tomek:linting", text: "Zosia quoted lint numbers in the town hall." },
        { id: "tomek:linting:opt-6", topicId: "tomek:linting", text: "What rule would you never add to the linter?" },
      ],
      replyCandidates: [
        {
          id: "tomek:linting:rep-1",
          text: "Two days configuring saves two arguments a week, forever, at compound interest. The linter is the colleague who says no so I never have to. Style debates in code review are just two humans linting each other with extra steps and hurt feelings. I automated the ethics. Now reviews are about correctness and intent, which is the actual job.",
          relationshipHint: "pleased",
        },
        {
          id: "tomek:linting:rep-2",
          text: "It did, and I fixed it in front of everyone without commentary, because the alternative is becoming the man who exempted himself from his own religion. The linter spares no one and that is the entire value proposition. My dignity healed in minutes. Double standards never heal. The flag stayed green and so did my conscience.",
          relationshipHint: "delighted",
        },
        {
          id: "tomek:linting:rep-3",
          text: "Strict is KIND for newcomers — the rules are decided by committee, so the newcomer never has to guess what the senior wants, because the senior IS the config file. Pawel onboarded through the linter; every red squiggle was a free senior review at 2am when no senior exists. The strictness is a safety net, not a gate. The net is the point.",
          relationshipHint: "neutral",
        },
        {
          id: "tomek:linting:rep-4",
          text: "The bouncer is accurate — it stands at the door of main, checks credentials, and rejects the badly dressed with no explanation beyond a rule number. Pawel has started writing commits that apologize to it. Whatever works. The bouncer and the duck and the notebook: that boy is assembling a whole support system and none of it is me. Good. Systems outlive mentors.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-read-the-script"],
        },
        {
          id: "tomek:linting:rep-5",
          text: "She said 'we reduced lint warnings by ninety percent this quarter' to a room of clients, and the clients NODDED like it was revenue. Lint became a KPI. I do not know whether to laugh or update my CV. Marek's face during the slide suggested he is already being asked to 'do more lints'. The metric escapes. The metric always escapes. We knew this. We let it happen anyway.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "tomek:linting:rep-6",
          text: "Any rule that enforces taste instead of correctness. The moment the linter starts caring whether my functions are short, it is no longer a tool, it is a landlord. Complexity rules measure shape, not sense — I have seen a forty-line function that was perfect and a twelve-line one that was a crime scene. The linter can have my semicolons. It will never have my judgment.",
          relationshipHint: "neutral",
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

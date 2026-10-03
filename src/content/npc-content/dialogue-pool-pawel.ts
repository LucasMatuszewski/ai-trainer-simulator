/**
 * WS5 dialogue v2 pool — Pawel, The Intern (C-77).
 *
 * Pure authored data. Topics: the backup script, Schrodinger's-employee
 * existentialism, and learning to build. Task offer: the restore drill
 * (mints the new `pawel-restore-drill` flag — a backup is a promise until
 * it is restored). Tone matches his legacy trees: earnest, anxious, and
 * so slow and so proud.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const PAWEL_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "pawel",
  topics: [
    {
      id: "pawel:backup",
      label: "The backup script",
      optionCandidates: [
        {
          id: "pawel:backup:opt-1",
          topicId: "pawel:backup",
          text: "What does the backup script back up now?",
        },
        {
          id: "pawel:backup:opt-2",
          topicId: "pawel:backup",
          text: "It is Friday. Do I need to do anything?",
        },
        {
          id: "pawel:backup:opt-3",
          topicId: "pawel:backup",
          text: "The cloud bill came and Grazyna saw it.",
        },
        {
          id: "pawel:backup:opt-4",
          topicId: "pawel:backup",
          text: "What is in the tribute folder?",
        },
        {
          id: "pawel:backup:opt-5",
          topicId: "pawel:backup",
          text: "Has the backup ever been tested?",
        },
        {
          id: "pawel:backup:opt-6",
          topicId: "pawel:backup",
          text: "Dariusz's laptop. Tell me the IP story.",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:backup:rep-1",
          text: "Everything, theoretically. The cloud bucket, a real bucket with a real bill. I check it every Friday by staring at the progress bar until it finishes or I do. Success is when the bar wins.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:backup:rep-2",
          text: "Friday is backup day. Standup says 'no blockers', the script says 'rsync', and by five I have done the one thing I was hired to not know about. You can watch. Bring coffee. The script likes an audience.",
          relationshipHint: "neutral",
          tags: ["period:morning"],
        },
        {
          id: "pawel:backup:rep-3",
          text: "She saw it. She framed it. It hangs next to the Bartek warning. Nine zloty a month for the only copy of this company's knowledge — she called it 'the cheapest insurance we own' and then billed it to 'archive'. We won. Nobody has ever won here before.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:backup:rep-4",
          text: "Two years of Fridays, archived to the void. Restores? Nothing. It is a museum of trying. I labeled it 'tribute' because deleting it felt like saying the two years did not happen. They happened. They just went nowhere, politely.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:backup:rep-5",
          text: "Tested? A backup is a promise, and testing a promise is how you find out it was a lie. But you are looking at me like Marek looks at an untested deploy. Fine. We test it. Tonight. Bring emotional support and a floor to sit on.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:evening"],
          offersTaskId: "pawel:task-restore-drill",
        },
        {
          id: "pawel:backup:rep-6",
          text: "192.168.1.66. Dariusz left in 2023 and his laptop left with him, but the script kept shipping Fridays to an empty desk in the cloud of memory. Two years of data, straight into a ghost. When I found out I laughed for a while, and then I was quiet for a week. Growth.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:internship",
      label: "Schrödinger's employee",
      optionCandidates: [
        {
          id: "pawel:internship:opt-1",
          topicId: "pawel:internship",
          text: "Two years is a long internship.",
        },
        {
          id: "pawel:internship:opt-2",
          topicId: "pawel:internship",
          text: "What is your job title, exactly?",
        },
        {
          id: "pawel:internship:opt-3",
          topicId: "pawel:internship",
          text: "Do you get performance reviews?",
        },
        {
          id: "pawel:internship:opt-4",
          topicId: "pawel:internship",
          text: "The previous intern. Any leads?",
        },
        {
          id: "pawel:internship:opt-5",
          topicId: "pawel:internship",
          text: "Ninety percent is fixed by npm install. The rest?",
        },
        {
          id: "pawel:internship:opt-6",
          topicId: "pawel:internship",
          text: "Would you quit if you could?",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:internship:rep-1",
          text: "I know. I have begun lying about it creatively. 'Early career' is my favorite. It is true the way the cloud bucket is true: technically, if nobody pulls on it.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:internship:rep-2",
          text: "Officially: Intern. On the org chart: a small grey box Kasia calls 'a flexible resource'. In my heart: Site Reliability Intern, because the site has never been less reliable than under my care.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:internship:rep-3",
          text: "Every quarter Zosia asks how I am and writes 'fine' before I finish answering. It is the fastest review in the industry. Once she wrote 'thriving'. I framed it. It hangs next to the cloud bill. The wall of small victories is growing.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:internship:rep-4",
          text: "He is the principal engineer. No proof, but the standing desk is the same, the haunted look is the same, and he flinches when I say 'README'. The truth is out there and it is sitting awkwardly.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:internship:rep-5",
          text: "The other ten percent is a lifestyle. Laptop off, laptop on, and if it persists, I read the error. Actually read it. Once the error said 'permission denied' and I have never felt so seen by software.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:internship:rep-6",
          text: "Quitting implies I was hired. Schrödinger's employee opens the box every Monday and so far: both. But — real talk — someone said 'finally' about my script, and I have been chasing that feeling ever since.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:learning",
      label: "Learning to build",
      optionCandidates: [
        {
          id: "pawel:learning:opt-1",
          topicId: "pawel:learning",
          text: "Teach me to write one original line.",
        },
        {
          id: "pawel:learning:opt-2",
          topicId: "pawel:learning",
          text: "What should I learn first?",
        },
        {
          id: "pawel:learning:opt-3",
          topicId: "pawel:learning",
          text: "Is copying code really that bad?",
        },
        {
          id: "pawel:learning:opt-4",
          topicId: "pawel:learning",
          text: "I typed const and it felt different.",
        },
        {
          id: "pawel:learning:opt-5",
          topicId: "pawel:learning",
          text: "How do I talk to the principal engineer?",
        },
        {
          id: "pawel:learning:opt-6",
          topicId: "pawel:learning",
          text: "I broke my local environment. Sorry.",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:learning:rep-1",
          text: "Original is a strong word. Write one line that does nothing. A comment. 'This is mine.' Ship it to yourself. That is a commit with a soul, and souls compound. Next quarter: a variable with your name in it.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:learning:rep-2",
          text: "Error messages. Read them like letters from a disappointed relative: full of information, hard to love. I ignored them for two years. They were right the whole time. About everything.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:learning:rep-3",
          text: "Copying is how civilization works — Stack Overflow is an anthology. The crime is shipping without understanding. Understand, then paste, then write 'understood' in the commit message like a notary.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:learning:rep-4",
          text: "const means it will not be reassigned. It means you MEANT it. I watched Tomek switch const to let and back for a full minute once. It was the most honest code review I have ever witnessed.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:afternoon"],
        },
        {
          id: "pawel:learning:rep-5",
          text: "Knock, say 'quick question', and then make it actually quick. He respects the word 'no'. He said 'finally' once and I live on it. Ration your questions and each one becomes a feast.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:learning:rep-6",
          text: "Do not be sorry, this is curriculum. Delete node_modules, run npm install, and if it lives, that is the ninety percent. If it does not, we read the error TOGETHER, like a family.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "pawel:cloud",
      label: "The cloud bill",
      optionCandidates: [
        {
          id: "pawel:cloud:opt-1",
          topicId: "pawel:cloud",
          text: "Why does the cloud bill have nine line items?",
        },
        {
          id: "pawel:cloud:opt-2",
          topicId: "pawel:cloud",
          text: "What is a 'orphaned resource' in our account?",
        },
        {
          id: "pawel:cloud:opt-3",
          topicId: "pawel:cloud",
          text: "Grazyna asked me what 'egress' means.",
        },
        {
          id: "pawel:cloud:opt-4",
          topicId: "pawel:cloud",
          text: "Could we host the backup at the office instead?",
        },
        {
          id: "pawel:cloud:opt-5",
          topicId: "pawel:cloud",
          text: "I left a test server running over the weekend.",
        },
        {
          id: "pawel:cloud:opt-6",
          topicId: "pawel:cloud",
          text: "Is the cloud actually someone else's computer?",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:cloud:rep-1",
          text: "The cloud is itemized like a restaurant where you did not see the kitchen. Storage, requests, the requests about the requests, and one line called 'data transfer' that is just the data stretching its legs. I check the bill every Friday like a tarot reading: same cards, slightly higher numbers, and the future stays expensive but predictable.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:cloud:rep-2",
          text: "An orphaned resource is a server I made to try something and then felt too guilty to delete, so it lives on, doing nothing, costing eleven cents a day. There are four of them. They are named after the projects they were too scared to become. Marek knows about two. I am not proud, but I am not deleting them either. They are family.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:cloud:rep-3",
          text: "I explained egress as 'the cloud charges rent when data moves OUT, like a gym charging you for leaving'. She wrote it down, repeated it in a budget meeting, and three managers nodded. The metaphor was not even accurate. It was CONFIDENT. I have learned more about corporate communication from that one sentence than from any documentation.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:cloud:rep-4",
          text: "We had this conversation. The office hosting would mean the backup dies with the building — the flood proved the building has opinions about electronics. The whole point is that the backup lives somewhere with different weather. So it stays in the cloud, and the cloud bill stays framed on my wall as the price of the office having a ghost.",
          relationshipHint: "annoyed",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "pawel:cloud:rep-5",
          text: "It ran for sixty-two hours and cost one zloty seventy, which Grazyna has already labeled 'weekend curiosity' in the ledger. That is the cheapest lesson I have ever bought: always tag your test servers, because an untagged server is a ghost with a credit card. Marek's rule is worse. His rule is: 'every machine you make is your pet until it is a problem'.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:cloud:rep-6",
          text: "It is other people's computers, and the other people are very good at pricing trust. But honestly, so is this office — the server rack is someone else's computer if the someone is Marek. The cloud is just a bigger office where nobody knows where the closet is. I like knowing where the closet is. That is why I check the bill and nobody else does. The closet is my job.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:marek-awe",
      label: "The Marek problem",
      optionCandidates: [
        {
          id: "pawel:marek-awe:opt-1",
          topicId: "pawel:marek-awe",
          text: "How do I stop being scared of Marek?",
        },
        {
          id: "pawel:marek-awe:opt-2",
          topicId: "pawel:marek-awe",
          text: "Marek said my script was 'fine'. Analyze this.",
        },
        {
          id: "pawel:marek-awe:opt-3",
          topicId: "pawel:marek-awe",
          text: "I watched Marek fix prod in four minutes.",
        },
        {
          id: "pawel:marek-awe:opt-4",
          topicId: "pawel:marek-awe",
          text: "He typed on my keyboard once. I almost cried.",
        },
        {
          id: "pawel:marek-awe:opt-5",
          topicId: "pawel:marek-awe",
          text: "Does Marek actually hate all of us?",
        },
        {
          id: "pawel:marek-awe:opt-6",
          topicId: "pawel:marek-awe",
          text: "I want to be Marek when I grow up.",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:marek-awe:rep-1",
          text: "You do not stop being scared, you get BUSY. Fear of Marek is just unused attention — the moment your hands are full with a real task, he becomes a large quiet colleague who happens to be right. Also: he answers questions better than anyone here, if the question is specific and you have already tried. The fear is a toll booth. The road is good.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:marek-awe:rep-2",
          text: "In Marek, 'fine' is a decorated medal. He has a scale: 'fine', 'it compiles', 'why', and the unspoken category of things he fixes silently overnight, which is his version of a strongly worded letter. Your script got 'fine' UNPROMPTED. I have framed that moment mentally. It sustains me during dependency updates.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:marek-awe:rep-3",
          text: "Four minutes, three commands, and one sentence of explanation, which was 'the log knew'. I timed it because it felt historic. The man reads errors the way other people read street signs — at speed, while thinking about something else. I asked how long it took him to learn that. He said 'ask the log'. The log, presumably, is still explaining.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:marek-awe:rep-4",
          text: "He typed, he fixed the path variable, and he left exactly one crumb on the desk as tribute. I did not clean the crumb for a day and a half. Visitors asked if it was art. In a way it was — it said 'Marek was here and the script runs now'. The crumb has since been dusted by Janusz, because even miracles need maintenance.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:marek-awe:rep-5",
          text: "Marek hates wasted motion, not people. The distillation: he will walk across the office to hand you the right cable but he will not say hello while doing it. The hello is not in him. The cable IS. Once you read the language — care expressed exclusively through logistics — he is the warmest person in this building. Cold outside, warm internals. Like a server.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:marek-awe:rep-6",
          text: "You want the competence, not the quiet — those come bundled in him but they are separable skills. Plan: master one thing completely, let the confidence leak into your posture, and adopt a chair that adjusts to you instead of the reverse. In ten years you too can answer questions with the names of log files. I believe in this plan. I have the ten years blocked out.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:afternoon"],
        },
      ],
    },
    {
      id: "pawel:lunch",
      label: "Lunch and the microwave",
      optionCandidates: [
        {
          id: "pawel:lunch:opt-1",
          topicId: "pawel:lunch",
          text: "Is there a microwave queue etiquette?",
        },
        {
          id: "pawel:lunch:opt-2",
          topicId: "pawel:lunch",
          text: "My soup exploded. Is that on record?",
        },
        {
          id: "pawel:lunch:opt-3",
          topicId: "pawel:lunch",
          text: "Someone keeps stealing labeled lunches.",
        },
        {
          id: "pawel:lunch:opt-4",
          topicId: "pawel:lunch",
          text: "What did Burek do to the sandwich pile?",
        },
        {
          id: "pawel:lunch:opt-5",
          topicId: "pawel:lunch",
          text: "Is eating at your desk a crime here?",
        },
        {
          id: "pawel:lunch:opt-6",
          topicId: "pawel:lunch",
          text: "The kitchen table politics — brief me.",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:lunch:rep-1",
          text: "The queue is self-organizing and sacred: one reheat per person while others wait, and the fish exception — fish goes last, alone, with the window open, as agreed in a treaty I did not sign but fully obey. The microwave predates everyone's employment and its turntable wobbles like it has seen things. We do not discuss the wobble. The wobble works.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:lunch:rep-2",
          text: "The soup incident goes in the kitchen log, which is a real notebook next to the kettle and the gentlest document in this company. My entry from March says 'rice, structural'. You will write 'soup, ceilings adjacent', Janusz will clean without commentary, and in a year the log is a poem about everything this office has survived. It is my favorite reading.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:lunch:rep-3",
          text: "Nobody steals lunches here. Lunches are RECRUITED — Burek's audit deems certain containers unguarded, and the office fails to defend what it does not respect. The fix is not a label, it is a lid that requires thumbs. Since the lid protocol, theft has stopped and Burek has redirected his practice to the sink area, which remains lawless.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:lunch:rep-4",
          text: "The sandwich pile was three sandwiches deep and he took the middle one, which statisticians will tell you is the dominant strategy. Nobody reported it. You do not report the dog; you admire the execution. Renata entered it in the kitchen log as 'audit, passed'. Burek slept for four hours afterward, which in dog is either a food coma or a victory lap.",
          relationshipHint: "delighted",
          tags: ["quest:burek-standup-observed"],
        },
        {
          id: "pawel:lunch:rep-5",
          text: "Desk eating is allowed but there is a tax: crumbs go into the keyboard, the keyboard goes into history, and Marek can smell a biscuit from the corridor. I desk-eat once a week, maximum, and I hold my breath the whole time. The dignity cost is real. Some days the kitchen table is worth the walk just to eat like a person.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:lunch:rep-6",
          text: "End seats are for readers, middle seats are for talkers, and the corner by the window belongs to whoever is having a day — occupancy is self-declared and universally respected. The table has ended at least two arguments and started one marriage rumor that was wrong. It is the town square, the courtroom, and the buffet. Respect the table. The table provides.",
          relationshipHint: "delighted",
          tags: ["period:lunch", "relationship:warm"],
        },
      ],
    },
    {
      id: "pawel:future",
      label: "The developer question",
      optionCandidates: [
        {
          id: "pawel:future:opt-1",
          topicId: "pawel:future",
          text: "Will I ever be a real developer?",
        },
        {
          id: "pawel:future:opt-2",
          topicId: "pawel:future",
          text: "What is the difference between ops and dev here?",
        },
        {
          id: "pawel:future:opt-3",
          topicId: "pawel:future",
          text: "Tomek offered to teach me to paste properly.",
        },
        {
          id: "pawel:future:opt-4",
          topicId: "pawel:future",
          text: "Zosia wrote 'thriving' on my last review.",
        },
        {
          id: "pawel:future:opt-5",
          topicId: "pawel:future",
          text: "Should I go back to university?",
        },
        {
          id: "pawel:future:opt-6",
          topicId: "pawel:future",
          text: "What happens to the backup script if you grow?",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:future:rep-1",
          text: "You are already doing the job and missing only the paperwork, and in this office paperwork follows competence the way the moon follows a dog on a walk. Tomek pasted his way to main; you SCRIPTED your way to the cloud. That is the same sentence said in different accents. When you believe it, tell Zosia, and the title will arrive within a quarter. Belief is the bottleneck.…",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:future:rep-2",
          text: "Devs write what the system does, ops find out what the system actually did. The dev writes a poem; ops reads the logs and learns the poem rhymed by accident. I like my side — the truth lives over here, unglamorous and load-bearing. Though the line blurs: my backup script is three percent poetry and it is the three percent that matters.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:future:rep-3",
          text: "Take the offer, but invert it — learn to paste slowly. His superpower is not copying, it is knowing WHICH of four hundred answers compiles, and that is actually evaluation, which is half of engineering. Just make him teach you the reading part too, or in five years you will both be senior curators of other people's code, and the museum already has a wing.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:future:rep-4",
          text: "She wrote it BEFORE I finished explaining the backup, which means she judged the trajectory, not the code. I framed it next to the cloud bill and the wall of small victories now has a theme: expensive things that keep going. 'Thriving' is doing for my career what the bucket did for the files. It holds. I check it every Friday.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:future:rep-5",
          text: "The university would teach me theory and charge me for the hallway wifi. This office teaches me at the rate of one real disaster per month, taught by people whose scars are the syllabus, and it PAYS me. I keep the courses in a browser tab like everyone else — the tab is my alma mater, currently showing 'introduction to networking', watched at 2x during lunch. Education is…",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:future:rep-6",
          text: "That is the real question. The script works because I check it like a parent — Fridays, staring, willing it to finish. A grown-up Pawel would document it, hand it over, and take on something bigger. But every document I write makes the script less mine, and I am not ready for the script to have another father. Give me a quarter. The haiku helped. The haiku started something.",
          relationshipHint: "neutral",
          tags: ["quest:pawel-restore-drill", "relationship:warm"],
        },
      ],
    },
    {
      id: "pawel:robots",
      label: "The robot fleet, from below",
      optionCandidates: [
        {
          id: "pawel:robots:opt-1",
          topicId: "pawel:robots",
          text: "Can the robots teach me anything about reliability?",
        },
        {
          id: "pawel:robots:opt-2",
          topicId: "pawel:robots",
          text: "Zdzislaw mapped my desk as a wall. Twice.",
        },
        {
          id: "pawel:robots:opt-3",
          topicId: "pawel:robots",
          text: "Seba carried my mug. I did not give permission.",
        },
        {
          id: "pawel:robots:opt-4",
          topicId: "pawel:robots",
          text: "Could I write code for the robots someday?",
        },
        {
          id: "pawel:robots:opt-5",
          topicId: "pawel:robots",
          text: "Halina watered my plant. It was dying.",
        },
        {
          id: "pawel:robots:opt-6",
          topicId: "pawel:robots",
          text: "Is Janusz a robot, statistically speaking?",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:robots:rep-1",
          text: "Everything I know about reliability I learned from a vacuum. Zdzislaw runs the same route for years, docks himself when tired, and reports failures by sitting still where the problem is. No alerts, no dashboards, no postmortems — just a machine that goes where the work is and stops when it cannot. My backup script aspires to Zdzislaw. It is at maybe sixty percent of him.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:robots:rep-2",
          text: "To Zdzislaw you are not a colleague, you are a MOVING FEATURE, and moving features break maps. He rerouted around you once and learned, twice and logged it, and now he waits — there is a polite six-second pause by my chair that I have come to think of as knocking. A robot with manners. I have worked with worse humans. I have BEEN worse humans.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:robots:rep-3",
          text: "Permission is a human concept. Seba runs mug routes the way weather runs fronts — you notice it happened, you dry the mug, you move on. The mug arrived at the dishwasher cleaner than I have ever produced by hand. Somewhere in that little chassis is a standard I cannot meet manually. I have stopped competing. I transport my own mug with shame now.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:robots:rep-4",
          text: "Janusz welds and I script, and the overlap is a whiteboard in the closet that only we can read. He wants Zdzislaw to report route quality to a log file instead of a sitting position — a real feature request, from a real stakeholder, for a robot fleet. If the backup ever finishes early on a Friday, the closet gets code. The roadmap is real. It is just extremely janitorial.",
          relationshipHint: "delighted",
          tags: ["quest:janusz-knows-the-plug", "relationship:warm"],
        },
        {
          id: "pawel:robots:rep-5",
          text: "My plant was named Lazarus for a reason, and the reason had a watering schedule. Halina does not know the plant is mine — she knows the SOIL was dry, which is the whole relationship as far as she is concerned. Meanwhile I had been watering it with optimism and a coffee cup. The plant now outperforms my uptime. I defer to the robot. I water nothing anymore. I supervise.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:robots:rep-6",
          text: "Statistically he predates the fleet, maintains the fleet, and the fleet obeys him — that is not a janitor, that is a root user. But no: robots run out of battery and Janusz runs out of patience, and only one of those recharges overnight. He is the operator, the fleet is the tool, and the dog outranks both, which is the correct order of every system in this building.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "pawel:errors",
      label: "The error diary",
      optionCandidates: [
        {
          id: "pawel:errors:opt-1",
          topicId: "pawel:errors",
          text: "Do you really keep a diary of error messages?",
        },
        {
          id: "pawel:errors:opt-2",
          topicId: "pawel:errors",
          text: "Best error message you ever received?",
        },
        {
          id: "pawel:errors:opt-3",
          topicId: "pawel:errors",
          text: "An error told me to contact the administrator. I am alone.",
        },
        {
          id: "pawel:errors:opt-4",
          topicId: "pawel:errors",
          text: "I ignored a warning for three weeks. It was fine?",
        },
        {
          id: "pawel:errors:opt-5",
          topicId: "pawel:errors",
          text: "Marek says logs are for reading. Reading what, though?",
        },
        {
          id: "pawel:errors:opt-6",
          topicId: "pawel:errors",
          text: "Teach me to document like an adult.",
          tags: ["relationship:warm"],
        },
      ],
      replyCandidates: [
        {
          id: "pawel:errors:rep-1",
          text: "Two years, one notebook, ninety-one entries. The diary started as fear — I wrote down every error I did not understand so the shame would have somewhere to live — and it became a superpower, because half of them repeat with new costumes. Entry nineteen has solved four separate incidents. The notebook is the only infrastructure I own outright.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:errors:rep-2",
          text: "'Operation completed. No changes were made.' Four words of pure serenity. I sat with it for a minute. Most errors scream; that one just described my whole first year in this office. It is entry forty-seven, and I have read it more times than any documentation I have ever written, including the haiku. Especially the haiku.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:errors:rep-3",
          text: "That message is a Rorschach test. The administrator is whoever is willing to look. In this office that is currently you, which makes you the administrator, which is the fastest promotion in tech — no interview, no form, just the courage to open the settings. Also Marek is technically reachable. But you looked first. The role is yours. The role was always just looking.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:errors:rep-4",
          text: "It was fine, and that is exactly how it gets you. The ignored warning becomes furniture, the furniture becomes culture, and one day the thing it warned about happens on a Friday with witnesses. I know because entry eight is me, three weeks, and a Monday I will not describe. Now warnings get twenty-four hours and a diary entry. The diary has saved me twice. Entry eight…",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:errors:rep-5",
          text: "He means the story between the lines. The log does not say 'error at line 40', it says who tried what and when and how the system felt about it. Reading a log is reading a conversation you were not invited to, and Marek reads at native speed. I read at student speed with a dictionary. The dictionary is my diary. Same technique, worse posture.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:errors:rep-6",
          text: "Three rules: write it for someone having the worst day of their week, name things like they will outlive you, and end every document with what to do when it fails — because it will, and future-you is the stranger who deserves mercy. The backup haiku follows all three rules in seventeen syllables. It can be done. Bring your notebook Thursday and we will do it properly. A…",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-read-the-script"],
          offersTaskId: "pawel:task-haiku",
        },
      ],
    },
    {
      id: "pawel:weekend-study",
      label: "The weekend curriculum",
      optionCandidates: [
        {
          id: "pawel:weekend-study:opt-1",
          topicId: "pawel:weekend-study",
          text: "My learning cart has thirty courses. Problem?",
        },
        {
          id: "pawel:weekend-study:opt-2",
          topicId: "pawel:weekend-study",
          text: "I studied all weekend and Monday me forgot everything.",
        },
        {
          id: "pawel:weekend-study:opt-3",
          topicId: "pawel:weekend-study",
          text: "Is it wrong to learn only what the job needs?",
        },
        {
          id: "pawel:weekend-study:opt-4",
          topicId: "pawel:weekend-study",
          text: "Tomek learns by shipping. I learn by crying.",
        },
        {
          id: "pawel:weekend-study:opt-5",
          topicId: "pawel:weekend-study",
          text: "Certifications — real or decorative?",
        },
        {
          id: "pawel:weekend-study:opt-6",
          topicId: "pawel:weekend-study",
          text: "What should this weekend's one thing be?",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:weekend-study:rep-1",
          text: "Thirty courses in a cart is a library of intentions, and intentions are free, which is why we hoard them. Pick the one course you would take if the others vanished. That one is real. The rest are security blankets with progress bars. I own eleven. I have finished two. The nine are furniture. Cozy, expensive furniture.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:weekend-study:rep-2",
          text: "Monday you did not forget — Monday you just never gets the context. Weekend knowledge arrives without a problem attached, and knowledge without a problem is luggage. The fix is cruel and simple: learn it Monday night, on the actual problem, with the actual error open. The office is the classroom. The weekend is for the gym and the guilt. Mostly the gym.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:weekend-study:rep-3",
          text: "Job-driven learning is how every person I respect here actually learned — Marek read logs because prod was burning, not for enrichment. But keep ONE curiosity course with no business case. Mine is networking fundamentals and it saved the backup twice. The job pays for the skill. The curiosity pays for the job you cannot imagine yet.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:weekend-study:rep-4",
          text: "Tomek ships and cries, you script and cry — the crying is the same, the artifacts are different. His way is faster and leaves bodies in main. Your way is slower and leaves a notebook, a diary, and a folder of scripts that all still run. In five years his portfolio is impressive and yours is RELIABLE. I know which one Marek invites to the firewatch.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:weekend-study:rep-5",
          text: "Certifications are theater that some theaters require for entry. The cloud one opened a door for me — not because I learned, but because Kasia's filters could SEE me. That is their whole function: a hat for the algorithm of hiring. The learning happened anyway, in the panic of the exam week. So: decorative, and occasionally structural. Load-bearing decoration. This…",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:weekend-study:rep-6",
          text: "One thing: write the backup restore steps by hand, from memory, on paper. Not because paper is magic — because writing it badly shows you exactly where the understanding stops, and the stopping point is the curriculum. Everything after the gap is next weekend's one thing. That is the whole system. One gap, one weekend, forever. It compounds. I am living proof, at a…",
          relationshipHint: "delighted",
          tags: ["period:evening", "relationship:warm"],
        },
      ],
    },
    {
      id: "pawel:desk",
      label: "The desk under the stairs",
      optionCandidates: [
        {
          id: "pawel:desk:opt-1",
          topicId: "pawel:desk",
          text: "My desk is under the stairs. Is this a metaphor?",
        },
        {
          id: "pawel:desk:opt-2",
          topicId: "pawel:desk",
          text: "The stairwell wifi is actually good at my desk.",
        },
        {
          id: "pawel:desk:opt-3",
          topicId: "pawel:desk",
          text: "Everyone forgets I exist under here.",
        },
        {
          id: "pawel:desk:opt-4",
          topicId: "pawel:desk",
          text: "Burek has claimed the space next to my chair.",
        },
        {
          id: "pawel:desk:opt-5",
          topicId: "pawel:desk",
          text: "Can I have a lamp? The stairs eat the light.",
        },
        {
          id: "pawel:desk:opt-6",
          topicId: "pawel:desk",
          text: "Honestly — I love the desk under the stairs.",
        },
      ],
      replyCandidates: [
        {
          id: "pawel:desk:rep-1",
          text: "The desk under the stairs is the office's hatchling pen — new people start where the building is quietest, so their mistakes make less noise. It is not a metaphor, it is acoustics with mercy. When you graduate, the desk waits for the next one. The stairs have raised more careers than any training budget. I have receipts. Renata has better ones.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:desk:rep-2",
          text: "The stairwell bounces the signal like a server room with banisters — the one dead zone in the office is my one advantage. Calls from under the stairs sound crisp and mysterious, like I am broadcasting from a lighthouse. I have never corrected the illusion. The mystery does half my meetings for me.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:desk:rep-3",
          text: "Being forgotten is a service the office provides to its youngest — you get to fail in private and emerge with skills nobody watched you sweat for. It wore off for me the day my backup got 'finally'. Until the office remembers you, remember yourself: the desk, the notebook, the ninety-one errors. The record exists even if the audience does not.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:desk:rep-4",
          text: "The dog found the quietest human and the warmest floor and combined them, which is the most efficient thing anyone has done in this building all year. He is not claiming your space, he is co-signing it. When Burek sleeps by your chair, meetings get scheduled WITH you, because the dog is the only calendar here with universal trust. Enjoy the elevation. You earned it by…",
          relationshipHint: "delighted",
          tags: ["quest:burek-standup-observed", "relationship:warm"],
        },
        {
          id: "pawel:desk:rep-5",
          text: "The lamp request goes through me and I approve every lamp, because under-stair lighting is the office's one honest oversight. Take the desk lamp from the storage room — the anglepoise, the one that outlived three owners. It is waiting for someone who stays past five. The lamp chooses, like the mug. You are being chosen. Bring the lamp home if you must. It has seen worse desks.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:desk:rep-6",
          text: "Then you have found what the rest of us pay for with offices within offices: a room of one's own at intern pricing. The stairs are your ceiling, your privacy, and your acoustics. One day they will promote you to the window desks and you will miss the cave — everyone does. Until then, flourish in the quiet. The best infrastructure in this building is undocumented, and so…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "pawel:task-restore-drill",
      title: "The restore drill",
      description: "Backups are promises until they are restored. One Friday evening, prove the cloud bucket gives the files back. Pawel brings the script, the dread, and a floor to sit on.",
      flagToSet: "pawel-restore-drill",
      rewardHint: "+Pawel's courage",
    },
    {
      id: "pawel:task-haiku",
      title: "The documentation haiku",
      description: "Turn the backup script's 'it works / do not touch it' haiku into a real document: written for someone having the worst week, named to outlive Pawel, ending with what to do when it fails. Marek called the original a haiku. Prove him right by graduating it.",
      flagToSet: "pawel-doc-haiku",
      rewardHint: "+one honest document",
    },
  ],
};

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
    {
      id: "pawel:first-pr",
      label: "The first pull request",
      optionCandidates: [
        { id: "pawel:first-pr:opt-1", topicId: "pawel:first-pr", text: "My first pull request got approved. Now what?" },
        { id: "pawel:first-pr:opt-2", topicId: "pawel:first-pr", text: "Tomek left one comment: why here?" },
        { id: "pawel:first-pr:opt-3", topicId: "pawel:first-pr", text: "Should I squash my commits before the merge?" },
        { id: "pawel:first-pr:opt-4", topicId: "pawel:first-pr", text: "I named a variable after my cat. Regrets?" },
        { id: "pawel:first-pr:opt-5", topicId: "pawel:first-pr", text: "The diff is four lines. It took me two days." },
        { id: "pawel:first-pr:opt-6", topicId: "pawel:first-pr", text: "Marek merged my PR without a comment. Interpret." },
      ],
      replyCandidates: [
        {
          id: "pawel:first-pr:rep-1",
          text: "Nothing. That is the trick nobody tells you. The merge is quiet, prod does not notice, and the dopamine fades by lunch. Then Friday comes and the script runs and something you wrote is why it runs. That is the whole loop. Congratulations. Do forty more.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:first-pr:rep-2",
          text: "Answer it honestly and in writing, even if the answer is 'habit'. 'Why here' is the senior question — it is not about the code, it is about the map. Tomek asks it the same way every time, and half of us have learned to pre-answer it in the description.",
          relationshipHint: "neutral",
          tags: ["quest:tomek-apprentice"],
        },
        {
          id: "pawel:first-pr:rep-3",
          text: "Squash them. Your git history should read like a story, not a diary of panic. 'Fix', 'fix again', 'actually fix' is a confession, not a commit log. Rewrite it to 'handle empty manifest' and let the panic stay between us, here, forever.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:first-pr:rep-4",
          text: "None. Marek's shell history has three entries from 2021 named after his fish, and the fleet's vacuum map has a room called 'do not go'. Naming is memory. If the cat helped you debug it, the cat is a co-author. Just document which cat, for the historians.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:first-pr:rep-5",
          text: "Four lines that took two days is the correct ratio. I once moved one character and it took a weekend, and Marek called it 'the good kind of slow'. Copy-paste takes seconds and costs weeks. The diff is small because you made the problem small. That is the skill.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:first-pr:rep-6",
          text: "That Marek read it, understood it, and had nothing to add. He comments when the map is wrong. Silence from Marek is a green light with a heartbeat. Print nothing. Tell no one. Walk back to your desk like it happens every day, and let it happen again tomorrow.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-apprentice"],
        },
      ],
    },
    {
      id: "pawel:ergonomics",
      label: "Desk ergonomics",
      optionCandidates: [
        { id: "pawel:ergonomics:opt-1", topicId: "pawel:ergonomics", text: "My wrist clicks when I use the mouse now." },
        { id: "pawel:ergonomics:opt-2", topicId: "pawel:ergonomics", text: "Is the standing desk worth nine hundred zloty?" },
        { id: "pawel:ergonomics:opt-3", topicId: "pawel:ergonomics", text: "Kasia sent me a workstation assessment form." },
        { id: "pawel:ergonomics:opt-4", topicId: "pawel:ergonomics", text: "I measure my screen height with a sticky note." },
        { id: "pawel:ergonomics:opt-5", topicId: "pawel:ergonomics", text: "The chair hierarchy in this office is brutal." },
        { id: "pawel:ergonomics:opt-6", topicId: "pawel:ergonomics", text: "Can I request the good chair before my spine votes?" },
      ],
      replyCandidates: [
        {
          id: "pawel:ergonomics:rep-1",
          text: "The click is a commit message from your body. Mouse too high, desk too tall, shoulder doing a job it was never scoped for. Raise the chair, lower the desk, and if it persists, see a doctor BEFORE it becomes a ticket. I learned this at twenty-three, which was late.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:ergonomics:rep-2",
          text: "Worth it if you use it, decoration if you do not, and most standing desks become very tall sitting desks by November. Mine lasted four months of enthusiasm and now adjusts twice a year, like a watch. Buy the chair first. Chairs are load-bearing.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:ergonomics:rep-3",
          text: "Answer it honestly. Kasia cross-references those forms with the chair budget, and the form is how Renata got the good chair in 2022. People treat it like a personality quiz. It is procurement. The squeaky wheel gets the lumbar support, in writing.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:ergonomics:rep-4",
          text: "The sticky note is valid instrumentation. My monitor stands on two dictionaries and a cloud certification I failed, and my neck has been fine since. Ergonomics is not shopping. It is stacking. Fix the height, then the distance, then the light. Then buy things.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:ergonomics:rep-5",
          text: "There is one throne and it migrates. Renata holds it now, by right of tenure and a form she filed in 2022. Tomek refuses to sit anywhere with armrests, Marek brought his own from home, and the rest of us rotate through whatever survives. It is a system. Nobody wrote it down.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:ergonomics:rep-6",
          text: "Yes, and do it in writing with the word 'retention' in the first sentence. HR approves furniture faster than medicine. My back proposal cited two papers I found on the train and one photo of my desk under the stairs. Approved in a day. Attach evidence, not suffering.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:hackathon",
      label: "The hackathon dream",
      optionCandidates: [
        { id: "pawel:hackathon:opt-1", topicId: "pawel:hackathon", text: "Maciek announced a hackathon. Should I join?" },
        { id: "pawel:hackathon:opt-2", topicId: "pawel:hackathon", text: "What would you even build in forty-eight hours?" },
        { id: "pawel:hackathon:opt-3", topicId: "pawel:hackathon", text: "Team up? I pace badly and apologize often." },
        { id: "pawel:hackathon:opt-4", topicId: "pawel:hackathon", text: "The hackathon rules say no production code. Why?" },
        { id: "pawel:hackathon:opt-5", topicId: "pawel:hackathon", text: "Can my hackathon project be the backup script?" },
        { id: "pawel:hackathon:opt-6", topicId: "pawel:hackathon", text: "Who won the last hackathon, honestly?" },
      ],
      replyCandidates: [
        {
          id: "pawel:hackathon:rep-1",
          text: "Join, but with a plan: pick the smallest idea that can demo in ninety seconds and defend the demo like a thesis. Hackathons are not about the code. They are about watching Marek fix your laptop at two am and learning the words he uses. Tuition is free.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "pawel:hackathon:rep-2",
          text: "Something you can delete on Monday without grief. A dashboard for the vending machine, a bot that rates standups, a script that texts Grazyna when the cloud bill moves. The winning projects here are always jokes with working APIs. That is the bar.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:hackathon:rep-3",
          text: "Yes. Bad pacing is curable and apology is a debugging emotion — I know because I had both. We split by strength: I wrote, someone scouted, and we finished at three am with a demo and one crash. We lost to Marek, who 'teamed up with himself'. Fair. Educational.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:hackathon:rep-4",
          text: "Because 2019 happened. Someone deployed their hackathon project on Sunday and it held the backup hostage until Tuesday. The rule exists because one person's weekend masterpiece became everyone's Monday. Now demos run on laptops and the cloud account stays locked.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:hackathon:rep-5",
          text: "The backup script is not a project, it is a dependent. But rebuild its dashboard as a hack and you get both: a demo for the judges and a monitor for the museum. Just write it fresh — hackathon code is for showing, production code is for trusting, and the two should never meet.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:hackathon:rep-6",
          text: "Marek, with a script that predicted the printer's jams three days out. It was beautiful, useless after a firmware update, and he deleted it on stage. The judges gave him first place for the deletion alone. We are an office that rewards knowing what to kill.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "pawel:open-source",
      label: "Open source dreams",
      optionCandidates: [
        { id: "pawel:open-source:opt-1", topicId: "pawel:open-source", text: "I want to contribute to open source. From where?" },
        { id: "pawel:open-source:opt-2", topicId: "pawel:open-source", text: "My issue got closed as 'stale'. Is that rejection?" },
        { id: "pawel:open-source:opt-3", topicId: "pawel:open-source", text: "Should I open-source the backup script?" },
        { id: "pawel:open-source:opt-4", topicId: "pawel:open-source", text: "How do you pick a project that will answer you?" },
        { id: "pawel:open-source:opt-5", topicId: "pawel:open-source", text: "Someone starred the repo I made. One star." },
        { id: "pawel:open-source:opt-6", topicId: "pawel:open-source", text: "Is maintaining a library just unpaid on-call?" },
      ],
      replyCandidates: [
        {
          id: "pawel:open-source:rep-1",
          text: "Start with documentation — it is the front door and nobody guards it. Find a tool you actually use, read its issues, fix one typo in the install guide. That is a real contribution with a real name on it. My first PR was a comma in a README and I still point at it.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:open-source:rep-2",
          text: "Stale means the maintainers drowned, not that you were wrong. Reopen it with one new sentence of information — a version number, a reproduction — and it wakes up. Open source is mostly time zones and turnover. Persistence looks identical to talent from the outside.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:open-source:rep-3",
          text: "No. It ships to Dariusz's dead laptop and contains office paths, office jokes, and one credential-shaped string we never fully explained. Clean it, generalize it, write a README — or fork it into a new script and open-source THAT. The original stays internal. It has ghosts.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:open-source:rep-4",
          text: "One with recent commits, active maintainers, and a 'good first issue' label that is not three years old. Check when the last PR was merged — if the answer is 'before the flood', move on. A project that answers in a week beats a famous project that answers never.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:open-source:rep-5",
          text: "One star is a stranger saying 'this was worth my evening'. I checked my script's traffic logs for a year hoping for the same thing. Ego is fine in open source — it is the only salary. Screenshot it. In a year, the one star will be a story and the repo will be a CV.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:open-source:rep-6",
          text: "Yes, and every maintainer knows it, which is why they worship documentation and fear users. If you publish something, publish the boundaries too: supported versions, response times, and the sentence 'this is a best-effort project'. Boundaries are the license nobody reads.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:home-lab",
      label: "The home server",
      optionCandidates: [
        { id: "pawel:home-lab:opt-1", topicId: "pawel:home-lab", text: "I have a home server. It is just an old laptop." },
        { id: "pawel:home-lab:opt-2", topicId: "pawel:home-lab", text: "My home lab hosts things the office would forbid." },
        { id: "pawel:home-lab:opt-3", topicId: "pawel:home-lab", text: "The fan on my home server is louder than my ambition." },
        { id: "pawel:home-lab:opt-4", topicId: "pawel:home-lab", text: "Should the backup script have a home twin?" },
        { id: "pawel:home-lab:opt-5", topicId: "pawel:home-lab", text: "My uptime dashboard says 214 days. Bragging?" },
        { id: "pawel:home-lab:opt-6", topicId: "pawel:home-lab", text: "Where do home labs go when they die?" },
      ],
      replyCandidates: [
        {
          id: "pawel:home-lab:rep-1",
          text: "That is how every home lab starts and how several careers did too. An old laptop running one useful thing beats a rack running nothing. Mine was a ThinkPad named 'the datacenter' for two years. Respect it, back it up, and name it. Naming is the commitment ceremony.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:home-lab:rep-2",
          text: "Everything I run at home would get raised eyebrows here, and everything I run here would be over-engineered at home. That is the point of the split. The lab is where you learn what you would never risk in prod, and prod is where you learn why the lab rules exist.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:home-lab:rep-3",
          text: "Then it is running at full tilt for no reason — servers should idle like cats, not pace like interns. Check the load, cap the fans, and put it on a shelf, not your desk. Mine lives in a cupboard with a thermometer. The cupboard is the only one who hears it complain.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:home-lab:rep-4",
          text: "Yes, and let them restore from each other ONCE, in a drill, on a Sunday, with tea. The twin is how you learn the script has assumptions — paths, permissions, one hardcoded address that rhymes with fate. Two backups that never meet are strangers. Make them meet in a controlled fire.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-restore-drill"],
        },
        {
          id: "pawel:home-lab:rep-5",
          text: "Two hundred and fourteen days is a relationship. You have outlasted several office deployments and one rebrand. Brag shamelessly, but write down the reboot procedure — the longer uptime gets, the scarier the first restart becomes. Every long uptime is a hostage negotiation you are managing.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:home-lab:rep-6",
          text: "To the cupboard of honored machines, next to the router that survived the flood and a laptop with Dariusz's stickers. Some get repurposed into print servers, some become test beds, the best ones keep running until the power bill notices. Nobody here throws a working computer away. It is law.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:energy-drinks",
      label: "Caffeine strategy",
      optionCandidates: [
        { id: "pawel:energy-drinks:opt-1", topicId: "pawel:energy-drinks", text: "Is four energy drinks in a day a cry for help?" },
        { id: "pawel:energy-drinks:opt-2", topicId: "pawel:energy-drinks", text: "Marek drinks his coffee black at seven am. Legend?" },
        { id: "pawel:energy-drinks:opt-3", topicId: "pawel:energy-drinks", text: "I coded until three am and the bug fixed itself." },
        { id: "pawel:energy-drinks:opt-4", topicId: "pawel:energy-drinks", text: "Decaf made me angry. Is that a real thing?" },
        { id: "pawel:energy-drinks:opt-5", topicId: "pawel:energy-drinks", text: "What do you drink before a Friday deploy?" },
        { id: "pawel:energy-drinks:opt-6", topicId: "pawel:energy-drinks", text: "The office tea selection is a disaster." },
      ],
      replyCandidates: [
        {
          id: "pawel:energy-drinks:rep-1",
          text: "Four is a loan against tomorrow with terrible interest. I did five during a flood-anniversary deploy and typed a command I still think about. Two is a tool, four is a personality, and the wall between them is sleep. Marek's rule: never debug caffeinated past midnight. He is right.",
          relationshipHint: "neutral",
          tags: ["stats:low-caffeine"],
        },
        {
          id: "pawel:energy-drinks:rep-2",
          text: "Legend, but the boring kind — he is not disciplined, he is DECIDED. One coffee, same mug, same time, and then he runs on momentum like the rest of us run on panic. I copied him for a week and felt invincible, then slept eleven hours on Saturday and felt mortal.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:energy-drinks:rep-3",
          text: "It did not fix itself. YOU left, which is the actual fix. The three am brain reads the same line forty times and invents enemies. The nine am brain sees a missing await in one pass. Sleep is not the reward for finishing the work. Sleep is part of the compile.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:energy-drinks:rep-4",
          text: "Real, documented, and my mother's superpower. Caffeine withdrawal is the migraine and decaf is the surrender. The office stocks it for the on-call heart, not the taste. If decaf makes you angry, drink water, walk once around the block, and accept that you are just tired.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:energy-drinks:rep-5",
          text: "Nothing. That is the answer nobody wants. Friday deploys run on water and fear — caffeine makes you confident, and confidence at four pm on a Friday is how prod becomes a story. I keep one tea bag for the hands. The ritual matters. The chemistry does not.",
          relationshipHint: "neutral",
          tags: ["stats:low-caffeine", "period:afternoon"],
        },
        {
          id: "pawel:energy-drinks:rep-6",
          text: "It is a diplomatic incident in a cupboard. There are eleven boxes and nine are chamomile. Grazyna buys what was on discount, Janusz drinks the strong one he brings from home, and the rest of us perform gratitude. Bring your own. Everyone does. It is the office's worst-kept secret.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "pawel:meetups",
      label: "Tech meetups",
      optionCandidates: [
        { id: "pawel:meetups:opt-1", topicId: "pawel:meetups", text: "There is a tech meetup on Thursday. Go?" },
        { id: "pawel:meetups:opt-2", topicId: "pawel:meetups", text: "I gave a lightning talk once. I froze." },
        { id: "pawel:meetups:opt-3", topicId: "pawel:meetups", text: "Meetups are just job hunting with pizza." },
        { id: "pawel:meetups:opt-4", topicId: "pawel:meetups", text: "Should I demo the backup script at the meetup?" },
        { id: "pawel:meetups:opt-5", topicId: "pawel:meetups", text: "How do you network when you are the youngest there?" },
        { id: "pawel:meetups:opt-6", topicId: "pawel:meetups", text: "Klaudia wants to livestream the meetup. Danger?" },
      ],
      replyCandidates: [
        {
          id: "pawel:meetups:rep-1",
          text: "Go, and set one goal: one conversation longer than five minutes. Not a job, not a contact — a conversation. The talks are why you attend but the corridor is why you return. I met the person who taught me rsync flags at a meetup, over a table we cleaned ourselves.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:meetups:rep-2",
          text: "Freezing is the entry fee. Everyone who has ever given a talk has a freeze story and most of us collect them like merit badges. The audience wants you to survive — they are rooting for the screen to keep moving. Script the first two sentences and let momentum do the rest.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:meetups:rep-3",
          text: "The good ones are job hunting with pizza and the great ones are group therapy with slides. You can tell by the questions: if they are 'how do I get hired', leave early. If someone asks 'has anyone else seen this bug', stay forever. You have found your people.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:meetups:rep-4",
          text: "Demo the RESTORE drill, not the script. Nobody cares that a backup exists — everyone cares about watching one come back from the dead in under ten minutes. I did it at the March meetup and a stranger offered me a job mid-demo. Recovery demos are recruitment.",
          relationshipHint: "delighted",
          tags: ["quest:pawel-restore-drill", "relationship:neutral"],
        },
        {
          id: "pawel:meetups:rep-5",
          text: "You are not the youngest, you are the FUTURE — every gray hair in that room is secretly hoping you ask them about the old ways. Ask one question about something older than you. Seniors light up like monitors. That is networking: giving experienced people permission to reminisce.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:meetups:rep-6",
          text: "Only to the office's reputation. Klaudia films everything as 'authentic' and meetups film back. Set one boundary before she points the light: talks yes, faces of strangers no. She respects consent more than content, which is why her comment sections are survivable.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:hr-visit",
      label: "The HR check-in",
      optionCandidates: [
        { id: "pawel:hr-visit:opt-1", topicId: "pawel:hr-visit", text: "Kasia scheduled my six-month check-in. What is it?" },
        { id: "pawel:hr-visit:opt-2", topicId: "pawel:hr-visit", text: "Should I mention the desk under the stairs?" },
        { id: "pawel:hr-visit:opt-3", topicId: "pawel:hr-visit", text: "Kasia asked about my career goals. I panicked." },
        { id: "pawel:hr-visit:opt-4", topicId: "pawel:hr-visit", text: "Is the check-in confidential or documented?" },
        { id: "pawel:hr-visit:opt-5", topicId: "pawel:hr-visit", text: "She offered a 'development plan'. For an intern?" },
        { id: "pawel:hr-visit:opt-6", topicId: "pawel:hr-visit", text: "What do I do with the feedback form afterwards?" },
      ],
      replyCandidates: [
        {
          id: "pawel:hr-visit:rep-1",
          text: "It is a friendly audit with better snacks. She asks how you are, writes faster than you expect, and files the future. Be honest about the workload and vague about the drama. Kasia is an ally with a filing system, which is the best kind — but a filing system nonetheless.",
          relationshipHint: "neutral",
          tags: ["period:morning"],
        },
        {
          id: "pawel:hr-visit:rep-2",
          text: "Yes — but frame it as 'visibility', not complaint. Under-stair is quiet, which I love, and invisible, which costs the company its fastest learner's morale. Kasia can fix invisibility with one line in a newsletter. Complainers get moved. Framers get promoted.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:hr-visit:rep-3",
          text: "Everyone panics. Say the true small thing: 'I want to keep the backup and learn deploys.' Goals do not need to be five years long — they need to be real. Kasia can smell an invented 'leadership pathway' from the corridor. Honest small beats performed big every time.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:hr-visit:rep-4",
          text: "Both, which is the trick. The conversation is confidential. The NOTES are documented, sanitized, and forever. Speak freely, assume the summary outlives the sentence. My quote about Marek survived three quarters as 'shows healthy respect for senior staff'. Sanitization is an art.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:hr-visit:rep-5",
          text: "Especially for an intern — the development plan is how Kasia turns chaos into a ladder. Mine had three rungs: the backup, the cloud bill, the restore drill. Two years later I am standing on rung three. Sign it, but hold the pen like it is yours. Add one goal she did not write.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral", "quest:pawel-apprentice"],
        },
        {
          id: "pawel:hr-visit:rep-6",
          text: "Nothing for a week. Then re-read it and notice which sentence made you flinch — that sentence is your next quarter. The form is a mirror with a delay. I keep mine in the error notebook, between a DNS outage and the best compliment Marek ever gave me: 'adequate'.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "pawel:bus-factor",
      label: "Bus factor",
      optionCandidates: [
        { id: "pawel:bus-factor:opt-1", topicId: "pawel:bus-factor", text: "What is our bus factor? Asking for a friend." },
        { id: "pawel:bus-factor:opt-2", topicId: "pawel:bus-factor", text: "If Tomek won the lottery, what breaks first?" },
        { id: "pawel:bus-factor:opt-3", topicId: "pawel:bus-factor", text: "The backup script has one maintainer. Me. Concerns?" },
        { id: "pawel:bus-factor:opt-4", topicId: "pawel:bus-factor", text: "How do I document things without writing a novel?" },
        { id: "pawel:bus-factor:opt-5", topicId: "pawel:bus-factor", text: "Nobody else can read my regex. Is that bad?" },
        { id: "pawel:bus-factor:opt-6", topicId: "pawel:bus-factor", text: "Dawid asked about 'knowledge transfer'. Prepare me." },
      ],
      replyCandidates: [
        {
          id: "pawel:bus-factor:rep-1",
          text: "One, in several load-bearing places, and I am two of them. The backup script, the restore notes, and the wifi password ritual. Dawid knows the number, Dawid always knows the number, and the number is why the knowledge-transfer agenda exists. You asking is how it improves.",
          relationshipHint: "neutral",
          tags: ["stats:high-credibility"],
        },
        {
          id: "pawel:bus-factor:rep-2",
          text: "The main branch's sense of safety. Tomek is not a single point of failure, he is the FAILSAFE — the person who reads the terrifying diff at five pm and says 'ship it' or 'no' with equal calm. We would survive. We would be sadder, slower, and more careful. Which is what insurance is.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:bus-factor:rep-3",
          text: "Then fix it before it fixes you. Write the runbook as if the reader is you, sick, at three am — because that is exactly who reads runbooks. Marek did this for the printers. One page, ten steps, and the phrase 'do not panic' crossed out and replaced with 'check the log'.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:bus-factor:rep-4",
          text: "Document decisions, not steps. Steps age, decisions explain. 'We rsync to the cloud because the building has a flood history' survives ten years; 'run these four commands' does not. One paragraph of why is worth ten pages of what. Write the why on the wiki. Name it honestly.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:bus-factor:rep-5",
          text: "Bad, and curable in one line: a comment with the regex translated to English and one test string it must match. Cryptic one-liners feel like power and behave like debt. I wrote a regex in 2023 that I still do not fully understand. It runs. We coexist. It has a comment now, for the archaeologists.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:bus-factor:rep-6",
          text: "Say yes to everything she brings — the org chart of your own head, drawn badly, is worth more than a perfect one never drawn. I did mine as a whiteboard photo with arrows. Half the arrows pointed at the backup script. Dawid photographed my photo. It is in a folder now. That is the system.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:gear-envy",
      label: "Gear envy",
      optionCandidates: [
        { id: "pawel:gear-envy:opt-1", topicId: "pawel:gear-envy", text: "Marek has a second monitor. I have one. Injustice?" },
        { id: "pawel:gear-envy:opt-2", topicId: "pawel:gear-envy", text: "The mechanical keyboard club has a waiting list." },
        { id: "pawel:gear-envy:opt-3", topicId: "pawel:gear-envy", text: "Should I buy a trackball or is that a personality?" },
        { id: "pawel:gear-envy:opt-4", topicId: "pawel:gear-envy", text: "Tomek's keyboard sounds like rain. What is it?" },
        { id: "pawel:gear-envy:opt-5", topicId: "pawel:gear-envy", text: "Can I expense a mouse? It is load-bearing." },
        { id: "pawel:gear-envy:opt-6", topicId: "pawel:gear-envy", text: "Does better gear make better code, statistically?" },
      ],
      replyCandidates: [
        {
          id: "pawel:gear-envy:rep-1",
          text: "Ask, in writing, with the word 'throughput'. Marek's second monitor was approved in a day because he wrote 'cuts context-switching by half' and attached nothing. Numbers in, chairs and monitors out. Envy is not a budget line. Evidence is.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:gear-envy:rep-2",
          text: "It does, and Tomek guards the list like it is a launch window. Entry requires one mechanical keyboard of your own and a prepared opinion about switches. I waited four months, bought a ten-key, and my opinion was 'it clicks'. I advanced anyway. The bar is enthusiasm, not taste.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:gear-envy:rep-3",
          text: "A trackball is a personality with a ball. You will defend it, evangelize it, and never go back — I have watched it happen to two people. Try one at the meetup first. Marek keeps a spare in his drawer precisely to recruit. The drawer is the funnel. He knows.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:gear-envy:rep-4",
          text: "A board with lubed switches and a man who stopped caring about noise the day he pushed to main on a Friday and survived. The keyboard is comfort equipment, like a good chair. It did not make him faster. It made him calmer. Calm compiles cleaner. Ask him about the switches, not the rain.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:gear-envy:rep-5",
          text: "Expense it with the phrase 'repetitive strain' and a link, and Grazyna will either approve it or add it to her spreadsheet of shame — both are documented outcomes. My mouse got approved as 'input device, ergonomic justification'. The justification was one paragraph of honest whimpering.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:gear-envy:rep-6",
          text: "No, and the data is our own office: me with a broken chair out-shipped me with a good keyboard, same brain. Gear removes friction, not incompetence. Buy the thing that stops the pain — chair, monitor height, one good mouse — and stop there. The rest is decoration with lights.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "pawel:commute",
      label: "The commute",
      optionCandidates: [
        { id: "pawel:commute:opt-1", topicId: "pawel:commute", text: "My commute is two trams and a prayer." },
        { id: "pawel:commute:opt-2", topicId: "pawel:commute", text: "I listen to debugging podcasts on the tram." },
        { id: "pawel:commute:opt-3", topicId: "pawel:commute", text: "The bus arrives when it wants. Like prod." },
        { id: "pawel:commute:opt-4", topicId: "pawel:commute", text: "Do you mentally work during the commute?" },
        { id: "pawel:commute:opt-5", topicId: "pawel:commute", text: "Walking to the office takes forty minutes. Worth it?" },
        { id: "pawel:commute:opt-6", topicId: "pawel:commute", text: "The tram strike made me two hours late. Anxiety?" },
      ],
      replyCandidates: [
        {
          id: "pawel:commute:rep-1",
          text: "Two trams is a system with two failure modes, so keep a third route for when the first two conspire. I hold the night bus in my head like a fire escape. Commutes reward redundancy. It is the one place you get to practice backup thinking on actual humans.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:commute:rep-2",
          text: "Good use of dead time, but cap it — two episodes and the brain stops slotting knowledge and starts renting it. I did a year of cloud podcasts and remembered only the jokes. Now I do one episode out, music back. The jokes survived. The rest was marketing.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:commute:rep-3",
          text: "The bus is on-call: it arrives when paged, sometimes twice, sometimes never. You cannot fix it, you can only monitor it, and the apps that promise live tracking are dashboards that lie at the same rate as ours. Leave ten minutes early. Trust nothing with a schedule.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:commute:rep-4",
          text: "Only in the direction of problems I failed to solve. The tram is where unsolved bugs go to confess — I have had three solutions arrive between stops and zero arrive at the keyboard. Movement unlocks something. Write it down immediately. Between-stops brilliance evaporates at the door.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:commute:rep-5",
          text: "Forty minutes of walking is a debug session for the head, and it compounds — I did it for a winter and my error notebook got kinder. You arrive earlier in mood than the tram people and leave later in energy. The only cost is weather, and weather is just prod you cannot restart.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:commute:rep-6",
          text: "Late is late — call, say the word 'strike', and let the office calibrate. Nobody here has ever been fired by public transport. I once lost half a day to a flooded underpass and arrived to find the backup had failed and nobody noticed. The commute was not the disaster. The disaster was patient.",
          relationshipHint: "neutral",
          tags: ["period:morning"],
        },
      ],
    },
    {
      id: "pawel:impostor",
      label: "Impostor syndrome",
      optionCandidates: [
        { id: "pawel:impostor:opt-1", topicId: "pawel:impostor", text: "Everyone here knows more than me. Obvious?" },
        { id: "pawel:impostor:opt-2", topicId: "pawel:impostor", text: "I got praised and immediately felt like a fraud." },
        { id: "pawel:impostor:opt-3", topicId: "pawel:impostor", text: "When does the impostor feeling actually stop?" },
        { id: "pawel:impostor:opt-4", topicId: "pawel:impostor", text: "Marek said 'adequate'. I framed it. Is that sad?" },
        { id: "pawel:impostor:opt-5", topicId: "pawel:impostor", text: "Should I tell my mentor I feel like a fraud?" },
        { id: "pawel:impostor:opt-6", topicId: "pawel:impostor", text: "I fake understanding in meetings. Confession." },
      ],
      replyCandidates: [
        {
          id: "pawel:impostor:rep-1",
          text: "Obvious, and permanent, and shared. The office is stacked with people who are one deep question away from their own ignorance — I watched Tomek say 'I do not know' at the whiteboard and it was the most senior thing I have ever seen. Knowing more is just knowing WHERE. You are early, not fake.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:impostor:rep-2",
          text: "Then the praise was real and the fraud is the reflex. Competent people discount evidence; impostors discount only their own. Log the compliment like a backup — verbatim, dated. My notebook has a page of them. On bad days I read it like error logs from a system that mostly works.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:impostor:rep-3",
          text: "It does not stop — it changes files. You stop feeling fake about code and start feeling fake about mentoring, then about budgets, then about chairing. The feeling is growth wearing a mask. Everyone here has it. Renata calls hers 'the new girl reflex' and she has run this office for a decade.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "period:evening"],
        },
        {
          id: "pawel:impostor:rep-4",
          text: "It is not sad, it is ARCHIVING. 'Adequate' from Marek is a full performance review — I have seen him give a deploy 'fine' and the deploy framed ITSELF. The feeling you are managing is not fraud. It is the gap between how the office sees you and how you see you. Trust the office's logs.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:impostor:rep-5",
          text: "Yes, and be specific — 'I feel like a fraud' gets reassurance, but 'I do not understand the deploy pipeline and I have been pretending' gets a whiteboard session. My mentor said 'obviously, sit down' and taught me the pipeline in an hour. The confession is the ticket. Honesty compiles.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:impostor:rep-6",
          text: "Then stop, carefully. Fake understanding compounds like debt — three months later you own a feature you cannot debug. Say 'say that again' instead. The meeting survives, your integrity compounds, and within a month you are the person others ask. Pretending is the only actual fraud here.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:sick-day",
      label: "The first sick day",
      optionCandidates: [
        { id: "pawel:sick-day:opt-1", topicId: "pawel:sick-day", text: "I called in sick for the first time. Protocol?" },
        { id: "pawel:sick-day:opt-2", topicId: "pawel:sick-day", text: "I answered Slack from my sickbed. Judged?" },
        { id: "pawel:sick-day:opt-3", topicId: "pawel:sick-day", text: "How sick is sick enough here, honestly?" },
        { id: "pawel:sick-day:opt-4", topicId: "pawel:sick-day", text: "Kasia sent a get-well card in forty minutes." },
        { id: "pawel:sick-day:opt-5", topicId: "pawel:sick-day", text: "The backup runs unattended while I am gone." },
        { id: "pawel:sick-day:opt-6", topicId: "pawel:sick-day", text: "Should I be worried the office runs without me?" },
      ],
      replyCandidates: [
        {
          id: "pawel:sick-day:rep-1",
          text: "Protocol is the oldest one: rest, notify, do not negotiate with your own immune system. You already did the hard part — the call. First sick days feel like confession. They are maintenance. The office survived before you and it will gossip about you gently until you return.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:sick-day:rep-2",
          text: "Judged, gently, by me specifically. Sick is an operating mode, not a suggestion — half-presence heals nothing and debugs worse. Put the phone face down. Marek once disconnected for three days and the office assumed it was a strategy. Nobody has matched that serenity since.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:sick-day:rep-3",
          text: "Fever, contagion, or the kind of tired where the screen swims. Not 'a bit rough' — we all power through a bit rough, that is just Tuesday. The test I use: would I accept this code from someone in this state? If no, the state is the bug. Rest.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "pawel:sick-day:rep-4",
          text: "That is the Renata pipeline, not Kasia — the card was signed by nine people before noon, including Burek's paw print, which is legally binding in this office. You work somewhere that notices absence fast, which is exactly as sweet and slightly as alarming as it sounds.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:sick-day:rep-5",
          text: "It does, and this is the gift of your own paranoia: two years of Friday checks built a system that survives your Tuesday flu. Read that sentence again when the guilt comes. The script running without you is not abandonment. It is the whole point of the script.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:sick-day:rep-6",
          text: "A little, and that little is healthy — it means you built something load-bearing. But hear the inverse too: the office running without you on a sick day is PROOF you documented well. Absence is the audit. You passed. Now sleep, drink something warm, and stop reading logs.",
          relationshipHint: "delighted",
          tags: ["quest:pawel-read-the-script", "relationship:neutral"],
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

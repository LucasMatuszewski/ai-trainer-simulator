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
    {
      id: "pawel:certifications",
      label: "The certification hunt",
      optionCandidates: [
        { id: "pawel:certifications:opt-1", topicId: "pawel:certifications", text: "Another certificate, Pawel? That is five this month." },
        { id: "pawel:certifications:opt-2", topicId: "pawel:certifications", text: "Do these courses actually teach anything?" },
        { id: "pawel:certifications:opt-3", topicId: "pawel:certifications", text: "You finished a forty hour course in a weekend." },
        { id: "pawel:certifications:opt-4", topicId: "pawel:certifications", text: "Where do you keep all the certificates?" },
        { id: "pawel:certifications:opt-5", topicId: "pawel:certifications", text: "Marek saw your certificate wall." },
        { id: "pawel:certifications:opt-6", topicId: "pawel:certifications", text: "Should I start collecting certificates too?" },
      ],
      replyCandidates: [
        {
          id: "pawel:certifications:rep-1",
          text: "Five! Well, four and a half — the networking one crashed at ninety-eight percent and I refuse to retake it out of respect for our history. Each one has a PDF, a badge, and a small ceremony I hold alone at my desk. You are welcome to attend the next one. There is no cake yet. There will be.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:certifications:rep-2",
          text: "They teach you the vocabulary, which is honestly the hard part. Before the cloud course I thought 'region' meant where the office was. Now I know it means where my mistakes live when they are not here. That is education. The certificate is just the receipt.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:certifications:rep-3",
          text: "Forty hours is a suggestion for people who sleep normally. I watched it at two-x with a notebook and a fever of purpose. Some parts I watched twice because the narrator blinked. I do not recommend my method. I recommend my result, which is a PDF.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:certifications:rep-4",
          text: "A folder called 'proof', backed up in three places, because what is the point of a certificate if it can be lost? The folder structure is: year, subject, and one folder called 'someday' that contains a certificate in project management I have not earned emotionally.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:certifications:rep-5",
          text: "He did, and he stood there for a full minute, and then he said 'the cloud one is not terrible', which from Marek is basically a diploma with honors. I have not stopped thinking about it. It is possible nothing else needs to happen in my career now.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-apprentice"],
        },
        {
          id: "pawel:certifications:rep-6",
          text: "Yes but pick ONE and finish it completely before the hunger for the next one starts. The mistake is collecting course logos like stickers. One finished certificate beats eleven at two percent. I learned that the respectful way, which is to say expensively.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:standup-notes",
      label: "The standup notes",
      optionCandidates: [
        { id: "pawel:standup-notes:opt-1", topicId: "pawel:standup-notes", text: "You read your standup update from a script." },
        { id: "pawel:standup-notes:opt-2", topicId: "pawel:standup-notes", text: "Why do you rehearse fifteen minutes for standup?" },
        { id: "pawel:standup-notes:opt-3", topicId: "pawel:standup-notes", text: "Your notes have stage directions in them." },
        { id: "pawel:standup-notes:opt-4", topicId: "pawel:standup-notes", text: "What happens when standup goes off-script?" },
        { id: "pawel:standup-notes:opt-5", topicId: "pawel:standup-notes", text: "Tomek noticed your script. He said nothing." },
        { id: "pawel:standup-notes:opt-6", topicId: "pawel:standup-notes", text: "Can I borrow your standup note format?" },
      ],
      replyCandidates: [
        {
          id: "pawel:standup-notes:rep-1",
          text: "It is not a script, it is a SAFETY NET. Yesterday I said 'yesterday' and then my mind served an empty room. Since then, notes. Yesterday I did X. Today I do Y. No blockers, unless the coffee machine counts, which we agreed it does not.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:standup-notes:rep-2",
          text: "Because the standup is ninety seconds long and I intend to survive all of them. Rehearsal is not fear, it is respect for the team's time. Marek says 'just say the thing'. I say the thing! I just say it in the order I practiced, in the tone I practiced, with breathing marked.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:standup-notes:rep-3",
          text: "Those are breath marks! 'Pause here' means pause there. 'Slow' means the sentence about the deployment, because last time I said it fast and Marek asked three questions and my soul left through the fire exit. The directions stay. They are load-bearing.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:standup-notes:rep-4",
          text: "Off-script standup is how incidents happen. Someone asks a follow-up and suddenly I have promised a feature, a timeline, and my weekend. The script has one rule: never answer a question with a number unless the number is already written down. I live by the notes now.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:standup-notes:rep-5",
          text: "He NOTICED? Okay. Okay okay okay. Is 'said nothing' good noticing or bad noticing? Tomek saying nothing is his most loaded feature. I am going to assume it means respect and rebuild my entire confidence on that assumption. Do not correct me.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:standup-notes:rep-6",
          text: "Take it! Three lines, one number maximum, and a pre-written answer for 'anything else'. The pre-written answer is 'not today', which works for everything, including things that are absolutely happening today. It buys you the afternoon. You are welcome.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
      ],
    },
    {
      id: "pawel:dotfiles",
      label: "The dotfiles repo",
      optionCandidates: [
        { id: "pawel:dotfiles:opt-1", topicId: "pawel:dotfiles", text: "You have a dotfiles repo? Show me. Now." },
        { id: "pawel:dotfiles:opt-2", topicId: "pawel:dotfiles", text: "What is in the dotfiles, in human terms?" },
        { id: "pawel:dotfiles:opt-3", topicId: "pawel:dotfiles", text: "Your terminal prompt has a weather report." },
        { id: "pawel:dotfiles:opt-4", topicId: "pawel:dotfiles", text: "Did the dotfiles survive your laptop reinstall?" },
        { id: "pawel:dotfiles:opt-5", topicId: "pawel:dotfiles", text: "Marek asked for your dotfiles link." },
        { id: "pawel:dotfiles:opt-6", topicId: "pawel:dotfiles", text: "Is it true your setup file has comments?" },
      ],
      replyCandidates: [
        {
          id: "pawel:dotfiles:rep-1",
          text: "It is not much, it is home, it has forty-one commits and a README that says 'works on my machine, which is the only machine'. Every config I have ever loved is in there. If the office burned down I would save the dotfiles and THEN the people. Order matters.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:dotfiles:rep-2",
          text: "It is the personality of my computer in file form. Keyboard delays, window snapping, a script that mutes notifications when a calendar block says 'focus', and one alias called 'please' that runs sudo. I type please at my computer all day. It has improved my manners and nothing else.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:dotfiles:rep-3",
          text: "It checks Janusz's roof sensor! If he says rain, my prompt shows an umbrella. I spent a weekend on this instead of the ticket Marek assigned. He noticed the umbrella before he noticed the ticket. I do not know what that says about us but I think it is beautiful.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:dotfiles:rep-4",
          text: "The reinstall took eleven minutes BECAUSE of the dotfiles. One command, coffee refill, and my whole computer came back with its opinions intact. I cried a little. Marek called it 'adequate' and then used my window script. I have witnesses.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:dotfiles:rep-5",
          text: "HE ASKED FOR THE LINK? I need to sit down. I am sitting down. I need you to understand that Marek's dotfiles are mentioned in forums by strangers. If he clones mine I will know, because the repo stats will show one view, and that view will be the entire point of my career.",
          relationshipHint: "delighted",
          tags: ["quest:pawel-apprentice", "relationship:warm"],
        },
        {
          id: "pawel:dotfiles:rep-6",
          text: "Four hundred comments. Comments to my future self, comments apologizing to my future self, and one comment that just says 'do not touch this, past Pawel knew things'. Future me deserves explanations. Present me provides them. It is the only long-term relationship I manage well.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:newsletters",
      label: "The newsletter inbox",
      optionCandidates: [
        { id: "pawel:newsletters:opt-1", topicId: "pawel:newsletters", text: "You subscribe to how many newsletters?" },
        { id: "pawel:newsletters:opt-2", topicId: "pawel:newsletters", text: "Do you actually read forty newsletters a week?" },
        { id: "pawel:newsletters:opt-3", topicId: "pawel:newsletters", text: "You quoted a newsletter in standup. It worked." },
        { id: "pawel:newsletters:opt-4", topicId: "pawel:newsletters", text: "One newsletter is just a guy complaining about keyboards." },
        { id: "pawel:newsletters:opt-5", topicId: "pawel:newsletters", text: "Grazyna saw your inbox count. She made a face." },
        { id: "pawel:newsletters:opt-6", topicId: "pawel:newsletters", text: "Ever think about unsubscribing from everything?" },
      ],
      replyCandidates: [
        {
          id: "pawel:newsletters:rep-1",
          text: "Forty-three. Forty-four if the sourdough one came back from the dead again, which it does quarterly, like a ghost with a recipe. Each one is a tiny promise that the industry will make sense if I just keep reading. It has not made sense yet. I keep reading.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:newsletters:rep-2",
          text: "I READ three and SKIM forty. There is a system: the subject line gets two seconds, the first paragraph gets ten, and if neither scares me, archive. The unread count is not a to-do pile, it is a library of futures I am choosing not to visit today.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:newsletters:rep-3",
          text: "It DID work and nobody knows the quote was from a newsletter about billing systems. Marek nodded. Marek NODDED at billing content. The newsletter earns its place in the archive of honor. I have a folder for quotes that landed. It has two entries. This was one.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:newsletters:rep-4",
          text: "That is Trustworthy Keyboard Guy and he is a LEGEND. He has hated every keyboard since 2019 and his rage has a rhyme to it. Marek follows him too, we discovered, which makes us colleagues in a way HR has no form for.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:newsletters:rep-5",
          text: "She said 'unread 6,204' out loud like a diagnosis and then walked away shaking her head. But here is the thing — I KNOW all six thousand. They are not unread, they are UNSORTED. There is a difference and I will die explaining it to accountants.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:newsletters:rep-6",
          text: "Every Sunday night I draft the great unsubscribe and every Monday morning I cannot do it. What if THIS is the week the testing newsletter explains everything? It never is. But the version of me that believes it might is the version that gets up on Mondays.",
          relationshipHint: "neutral",
          tags: ["stats:low-caffeine", "period:morning"],
        },
      ],
    },
    {
      id: "pawel:portfolio",
      label: "The portfolio site",
      optionCandidates: [
        { id: "pawel:portfolio:opt-1", topicId: "pawel:portfolio", text: "Your portfolio still says coming soon." },
        { id: "pawel:portfolio:opt-2", topicId: "pawel:portfolio", text: "How long has the portfolio been under construction?" },
        { id: "pawel:portfolio:opt-3", topicId: "pawel:portfolio", text: "Show me the portfolio. I will be nice." },
        { id: "pawel:portfolio:opt-4", topicId: "pawel:portfolio", text: "The portfolio has a visitor counter. Retro." },
        { id: "pawel:portfolio:opt-5", topicId: "pawel:portfolio", text: "Klaudia offered to photograph your portfolio launch." },
        { id: "pawel:portfolio:opt-6", topicId: "pawel:portfolio", text: "What goes on a junior portfolio anyway?" },
      ],
      replyCandidates: [
        {
          id: "pawel:portfolio:rep-1",
          text: "It says coming soon because I keep REDESIGNING the landing page instead of adding projects. The current version is the ninth. The ninth is minimal, which means I deleted everything twice. Soon means soon relative to geological time, and I stand by that.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:portfolio:rep-2",
          text: "Fourteen months? But in my defense, twelve of those months taught me CSS at a depth no course offers. The portfolio is not late. The portfolio is an education with a deadline I keep renegotiating with myself. Myself is a lenient manager.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:portfolio:rep-3",
          text: "Okay but remember the nice part. There is a hero section, one project — the backup script, obviously, it is my child — and a footer that says 'more soon'. You have now seen one hundred percent of the content. The 'more' is aspirational. Thank you for being kind. I saw your face.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:portfolio:rep-4",
          text: "The counter is my favorite feature and it shows fourteen visits, six of which are me, four are Marek, and two are bots I have named. The bots are my most consistent audience. One of them visits every Tuesday. I have come to rely on it emotionally.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:portfolio:rep-5",
          text: "She wants a LAUNCH EVENT. With a countdown! My portfolio, which has one project, getting a premiere like a film. I said yes before my fear finished loading. If it happens, you are invited, and yes there will be a red carpet, and yes it will be a hoodie.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:afternoon"],
        },
        {
          id: "pawel:portfolio:rep-6",
          text: "One real thing you fixed and the honest story of how it broke. Nobody wants a junior's masterpiece. They want proof you can be trusted with production and that you know what you do not know. That second part is a whole page. It is the page I have written best.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:afraid-to-ask",
      label: "Afraid to ask",
      optionCandidates: [
        { id: "pawel:afraid-to-ask:opt-1", topicId: "pawel:afraid-to-ask", text: "What is something you have never dared to ask?" },
        { id: "pawel:afraid-to-ask:opt-2", topicId: "pawel:afraid-to-ask", text: "I do not know what the build does and I run it daily." },
        { id: "pawel:afraid-to-ask:opt-3", topicId: "pawel:afraid-to-ask", text: "Everyone here seems to already know things." },
        { id: "pawel:afraid-to-ask:opt-4", topicId: "pawel:afraid-to-ask", text: "Tomek said there are no stupid questions." },
        { id: "pawel:afraid-to-ask:opt-5", topicId: "pawel:afraid-to-ask", text: "I asked Marek something basic. He answered. Fully." },
        { id: "pawel:afraid-to-ask:opt-6", topicId: "pawel:afraid-to-ask", text: "How do you ask for help without feeling like fog?" },
      ],
      replyCandidates: [
        {
          id: "pawel:afraid-to-ask:rep-1",
          text: "What DNS actually is. I have configured it, broken it, and fixed it at 2am, and I still could not define it in a sentence without blinking too much. One day I will ask Marek and he will draw the diagram on the whiteboard and I will feel the sun on my face.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:afraid-to-ask:rep-2",
          text: "SAME. I run the build the way you drive a rental car — carefully, superstitiously, and with no idea what is under the hood. I once renamed a build step to see what would happen. The office learned what would happen. We do not speak of the Tuesday. We rebuild together.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:afraid-to-ask:rep-3",
          text: "They APPEAR to know things. Tomek googles syntax hourly, I have watched him. Marek keeps a paper notebook of commands he refuses to memorize on principle. Everyone is improvising with better posture. The knowing is a costume and we are all inside it, sweating.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:afraid-to-ask:rep-4",
          text: "He did, and then someone asked him a stupid question and he answered it for ten minutes with visible joy. Tomek does not suffer questions. He suffers ASKED-BEFORE questions. So now I keep a list of everything I almost ask, and I ask it in a different accent.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:afraid-to-ask:rep-5",
          text: "He answered it COMPLETELY, with a diagram, and then he said 'good question' and left. I have replayed it eleven times. The lesson is: the scary people are just busy people, and busy people respect a question that has already tried Google first. I always try Google first now. Always.",
          relationshipHint: "delighted",
          tags: ["quest:pawel-apprentice"],
        },
        {
          id: "pawel:afraid-to-ask:rep-6",
          text: "Write the question down first. By the time the sentence is complete you have either solved it or earned the asking. And start with what you tried — 'I read the docs and got lost at step three' — because it tells the person you are worth the time. This is my whole method. It is one trick, honestly.",
          relationshipHint: "neutral",
          tags: ["stats:low-focus"],
        },
      ],
    },
    {
      id: "pawel:deadlines",
      label: "The deadline dance",
      optionCandidates: [
        { id: "pawel:deadlines:opt-1", topicId: "pawel:deadlines", text: "How do you survive deadline week, Pawel?" },
        { id: "pawel:deadlines:opt-2", topicId: "pawel:deadlines", text: "You made a spreadsheet to track your panic." },
        { id: "pawel:deadlines:opt-3", topicId: "pawel:deadlines", text: "Marek said estimate double and add a day." },
        { id: "pawel:deadlines:opt-4", topicId: "pawel:deadlines", text: "I promised a Friday and it is Wednesday. Help." },
        { id: "pawel:deadlines:opt-5", topicId: "pawel:deadlines", text: "Your last-minute save was legendary. Explain it." },
        { id: "pawel:deadlines:opt-6", topicId: "pawel:deadlines", text: "Does the panic ever turn into planning?" },
      ],
      replyCandidates: [
        {
          id: "pawel:deadlines:rep-1",
          text: "Deadline week is a lifestyle. I sleep in shifts, my energy drink intake becomes a medical event, and I write the task list on my ARM when the laptop dies. It always gets done. It has always gotten done. The quality is a gamble I place with trembling hands and total faith.",
          relationshipHint: "pleased",
          tags: ["stats:high-caffeine"],
        },
        {
          id: "pawel:deadlines:rep-2",
          text: "It is a PAN CALENDAR. Columns: task, fear level, actual minutes needed, and 'what am I afraid of specifically'. The last column is the trick — by the time I write it down, the fear is ridiculous on paper. 'The code will know I rushed.' It KNOWS, Pawel. But the column helps.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:deadlines:rep-3",
          text: "He told me that in week one and I thought it was a joke. It is not a joke. It is the oldest spell in engineering. I now estimate honestly, double it, add a day, and deliver EARLY, and the look on Zosia's face when that happens is my new favorite weather.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:deadlines:rep-4",
          text: "Okay. Do not panic. Panic AFTER reading this. Step one: tell Marek today, not Friday — bad news does not age well. Step two: list what actually ships versus what is decoration. Step three: cut decoration without mercy. The demo needs a pulse, not a wardrobe. You will make it. We have all been there. Some of us live there.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:deadlines:rep-5",
          text: "It was not legendary, it was GRAZYNAnautic — I stayed until the office lights went to night mode, Janusz brought me soup unasked, and at 3am the bug turned out to be one letter. One! I fixed it, slept under my desk for forty minutes, and presented at nine with the confidence of a man held together by soup.",
          relationshipHint: "neutral",
          tags: ["period:evening", "relationship:neutral"],
        },
        {
          id: "pawel:deadlines:rep-6",
          text: "It is turning! Slowly, like a ship. I still panic, but now the panic has a agenda and a timer. Twenty-five minutes of terror, five minutes of tea. The tea is mandatory. Marek says the timer is the only discipline I have ever built and he is right and I hate that he is right.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "pawel:styleguide",
      label: "The style guide cheat sheet",
      optionCandidates: [
        { id: "pawel:styleguide:opt-1", topicId: "pawel:styleguide", text: "You laminated the style guide. You laminated it." },
        { id: "pawel:styleguide:opt-2", topicId: "pawel:styleguide", text: "Why does the style guide have a table of contents?" },
        { id: "pawel:styleguide:opt-3", topicId: "pawel:styleguide", text: "Tomek saw your laminated sheet and nodded." },
        { id: "pawel:styleguide:opt-4", topicId: "pawel:styleguide", text: "What is rule one of the style guide?" },
        { id: "pawel:styleguide:opt-5", topicId: "pawel:styleguide", text: "The style guide conflicts with itself on line forty." },
        { id: "pawel:styleguide:opt-6", topicId: "pawel:styleguide", text: "Can I annotate your cheat sheet?" },
      ],
      replyCandidates: [
        {
          id: "pawel:styleguide:rep-1",
          text: "LAMINATED. Because paper gets coffee on it and coffee is the enemy of reference material. The laminator was twelve zloty and it is the best infrastructure investment this desk has seen. I laminate important things now. I have a queue. Marek's pad of incident notes is next, he does not know yet.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:styleguide:rep-2",
          text: "Because the style guide is the only document in this office with an OPINIONS PER PAGE density higher than Zosia's emails. Naming, spacing, the semicolon question — it needs navigation. My table of contents has color tabs. The tabs are laminated. Everything is laminated.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:styleguide:rep-3",
          text: "THE NOD. I witnessed it. Tomek's nod is the style guide's second edition — worth more than any review comment. I have decided the lamination was the detail that earned it. Craft respects craft. Also he said 'finally, someone printed it'. PRINTED IT, Pawel. I printed a religion.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:styleguide:rep-4",
          text: "Rule one is 'the code is read more than it is written, dress it accordingly'. I did not write it — Tomek did, years ago, on a whiteboard that got erased, and I rescued the sentence into lamination. Everything else on the sheet is footnotes to that. I am not exaggerating. I am precisely exaggerating.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:styleguide:rep-5",
          text: "Line forty is the CSS section versus the naming section and they have disagreed since before I was hired. The official position is 'context decides'. The unofficial position, from Marek, is 'nobody wins, go home'. I documented both positions in the margin. The margin is where truth lives.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:styleguide:rep-6",
          text: "Please do, but in PENCIL — the sheet is laminated, annotations need the special pen, and the special pen is in Janusz's drawer until Thursday. The waiting list for annotation is one item long and it is me, planning my own corrections. We can share. Bring your own pen.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:study-group",
      label: "The Discord study group",
      optionCandidates: [
        { id: "pawel:study-group:opt-1", topicId: "pawel:study-group", text: "You are in a study group with strangers on the internet?" },
        { id: "pawel:study-group:opt-2", topicId: "pawel:study-group", text: "What does the study group actually study?" },
        { id: "pawel:study-group:opt-3", topicId: "pawel:study-group", text: "The study group has a bot that shames lurkers." },
        { id: "pawel:study-group:opt-4", topicId: "pawel:study-group", text: "Someone in the group is definitely twelve." },
        { id: "pawel:study-group:opt-5", topicId: "pawel:study-group", text: "You cowrote a guide with someone you never met." },
        { id: "pawel:study-group:opt-6", topicId: "pawel:study-group", text: "Should I join the study group?" },
      ],
      replyCandidates: [
        {
          id: "pawel:study-group:rep-1",
          text: "Eleven strangers, one channel, and the gentlest moderation bot in existence. We have never seen each other's faces but we have seen each other's terminal errors, which is more intimate anyway. One of them wished me luck before my Marek review. I think about that daily.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:study-group:rep-2",
          text: "Currently a networking course, previously algorithms, and for two beautiful weeks, bread. The bread phase produced no engineers but four loaves and one fire drill in Gdansk. We voted to return to networking. I still miss the bread channel. It had the best energy.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:study-group:rep-3",
          text: "The bot posts 'we noticed you are quiet' with a sad crab picture. The crab is very effective. Nobody wants to disappoint the crab. I have started responding JUST for the crab, which is a motivation system I did not plan and fully endorse.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:study-group:rep-4",
          text: "KidCheckmate is either twelve or forty with a youthful typing style, and honestly the group runs on not-asking. He solves problems faster than all of us and goes to bed at eight. His profile says 'working professional'. His timezone says 'suspicious'. We protect him. It is group policy.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:study-group:rep-5",
          text: "We wrote a git guide together across three timezones and I have never seen her face or heard her voice, but I know how she thinks about rebase conflicts. That is a real relationship. My mother does not understand it. My mother also does not understand rebase, so the call is even.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:study-group:rep-6",
          text: "Yes, but lurk for a week first, that is the law. Read the pinned messages, learn the crab, and then post one small win. The group feeds on small wins. Bring yours. Someone there is stuck on the exact thing you solved yesterday and does not know it yet.",
          relationshipHint: "neutral",
          tags: ["period:evening"],
        },
      ],
    },
    {
      id: "pawel:lightning-talk",
      label: "The lightning talk",
      optionCandidates: [
        { id: "pawel:lightning-talk:opt-1", topicId: "pawel:lightning-talk", text: "You signed up for a lightning talk. Voluntarily." },
        { id: "pawel:lightning-talk:opt-2", topicId: "pawel:lightning-talk", text: "What is the lightning talk even about?" },
        { id: "pawel:lightning-talk:opt-3", topicId: "pawel:lightning-talk", text: "Five minutes is nothing. You will be fine." },
        { id: "pawel:lightning-talk:opt-4", topicId: "pawel:lightning-talk", text: "You rehearsed in the training room after hours?" },
        { id: "pawel:lightning-talk:opt-5", topicId: "pawel:lightning-talk", text: "Zosia put your talk in the all-staff invite." },
        { id: "pawel:lightning-talk:opt-6", topicId: "pawel:lightning-talk", text: "What if the projector fails during your talk?" },
      ],
      replyCandidates: [
        {
          id: "pawel:lightning-talk:rep-1",
          text: "I signed up at 2am when confidence is highest and judgment is lowest, and by morning the sign-up was real and so was the terror. But it is FIVE minutes, and I have survived Marek's code review and one flood, so the bars have been set in interesting places.",
          relationshipHint: "neutral",
          tags: ["stats:high-caffeine"],
        },
        {
          id: "pawel:lightning-talk:rep-2",
          text: "'How our backup script saved my weekend' — one story, three slides, and a moral. The moral is 'test your restores'. It is the only thing I truly know and the whole talk fits inside it. If I get nervous I will just say 'backups' until someone stops me.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-restore-drill"],
        },
        {
          id: "pawel:lightning-talk:rep-3",
          text: "Five minutes is NOTHING at sea level and EVERYTHING on stage. I did the math: at my speaking pace, that is four hundred words, and I have written six hundred, so the real talk is editing. Marek says cut half. Tomek says cut two thirds. The talk is shrinking like my fear is not.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:lightning-talk:rep-4",
          text: "Twice. Janusz let me in and stayed to watch, and now I have an audience review from a man who has seen this office through floods. He said 'you talk with your hands, the hands are good'. It is the best feedback I have ever received and it is about my hands.",
          relationshipHint: "delighted",
          tags: ["period:evening"],
        },
        {
          id: "pawel:lightning-talk:rep-5",
          text: "THE ALL-STAFF INVITE. It says 'lightning talk: Pawel' next to the word 'quarterly'. I am in the same sentence as quarterly RESULTS. Zosia says it is good visibility. My hands say they are airdrying. But she believes in me out loud, in writing, and that is fuel. Terrifying, corporate fuel.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:lightning-talk:rep-6",
          text: "Then I do the talk from memory with hand gestures and Marek's notebook as a prop, because the story lives in me now, not the slides. I tested this fear by presenting once with the projector OFF as a drill. Janusz watched. He said the dark version was better. The dark version is now plan A.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "pawel:dark-mode",
      label: "Dark mode everything",
      optionCandidates: [
        { id: "pawel:dark-mode:opt-1", topicId: "pawel:dark-mode", text: "Is your spreadsheet really in dark mode?" },
        { id: "pawel:dark-mode:opt-2", topicId: "pawel:dark-mode", text: "Why is dark mode a personality for you?" },
        { id: "pawel:dark-mode:opt-3", topicId: "pawel:dark-mode", text: "The office lights hurt after your monitor glow." },
        { id: "pawel:dark-mode:opt-4", topicId: "pawel:dark-mode", text: "You dark-moded the shared team calendar?" },
        { id: "pawel:dark-mode:opt-5", topicId: "pawel:dark-mode", text: "Klaudia says light mode photographs better." },
        { id: "pawel:dark-mode:opt-6", topicId: "pawel:dark-mode", text: "Does dark mode actually save your eyes?" },
      ],
      replyCandidates: [
        {
          id: "pawel:dark-mode:rep-1",
          text: "It is and it is BEAUTIFUL. Rows like a night highway, totals glowing amber. Grazyna opened it once, made a sound like a kettle, and converted it back. We now keep two versions: mine, and the one that is legal in this office. It is a two-state solution and it holds.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:dark-mode:rep-2",
          text: "Because at 2am the light mode is a_searchlight and dark mode is a friend. Everything I love works at night — backups, builds, the good ideas. Dark mode is not a setting, it is solidarity with the hours nobody claps for.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:dark-mode:rep-3",
          text: "Sorry! My monitor is at eight percent brightness and people still squint when they walk past, like I am running a tanning bed. Marek installed my flux config on the OFFICE machine as an experiment and three people thanked him for 'the new vibe'. The vibe was mine. I am spreading.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:dark-mode:rep-4",
          text: "Locally! Locally dark-moded, nothing shared was harmed. But for one hour everyone's calendar events glowed like a cockpit and Kasia asked if we had been hacked. We had been IMPROVED. The hour ended. The memory did not.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:dark-mode:rep-5",
          text: "She is right and I refuse to care. Her ring light sees a glow rectangle and thinks cinema. My retinas see kindness. We have agreed to disagree across the color spectrum, which is the most respectful conflict this office hosts.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:dark-mode:rep-6",
          text: "Honestly? Unknown. But my 2am self-argument rate dropped thirty percent since I switched, and that data is real even if the mechanism is a mystery. Some tools work because of engineering. Dark mode works because of forgiveness. My eyes have accepted the terms.",
          relationshipHint: "pleased",
          tags: ["stats:low-caffeine", "period:evening"],
        },
      ],
    },
    {
      id: "pawel:linux-rice",
      label: "The desktop rice",
      optionCandidates: [
        { id: "pawel:linux-rice:opt-1", topicId: "pawel:linux-rice", text: "You spent a weekend customizing your desktop again." },
        { id: "pawel:linux-rice:opt-2", topicId: "pawel:linux-rice", text: "What is 'ricing' and why does it sound illegal?" },
        { id: "pawel:linux-rice:opt-3", topicId: "pawel:linux-rice", text: "Your desktop has a widget that shows build status." },
        { id: "pawel:linux-rice:opt-4", topicId: "pawel:linux-rice", text: "Marek saw your rice and said one word." },
        { id: "pawel:linux-rice:opt-5", topicId: "pawel:linux-rice", text: "Did the rice survive the office update?" },
        { id: "pawel:linux-rice:opt-6", topicId: "pawel:linux-rice", text: "Is the rice why your actual tickets are late?" },
      ],
      replyCandidates: [
        {
          id: "pawel:linux-rice:rep-1",
          text: "CUSTOMIZED is strong. I changed four pixels and reinstalled everything, which in rice culture is a moderate weekend. The wallpaper is now a photo of the server room Marek let me take once. It is the most 'me' my computer has ever looked. My tickets are unaffected and I will not be taking questions.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:linux-rice:rep-2",
          text: "It means making your desktop beautiful, and it sounds illegal because pride in small things IS treated as a crime in some workplaces. Not here. Here, Marek once spent a full lunch adjusting terminal opacity. There is a lineage. I am part of a school.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:linux-rice:rep-3",
          text: "It glows green when the build passes and red when it fails, and the red one has a feature where the widget seems to LOOK at me. Marek says the widget is a productivity hazard. Marek also asks for the widget config every time his own build breaks. We do not discuss the contradiction.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:linux-rice:rep-4",
          text: "The word was 'clean'. ONE word. I have replayed it so many times it has begun to harmonize. In Marek's dialect, 'clean' is a paragraph. I screenshotted the desktop, printed the screenshot, and the printout is laminated on my desk. The desk now rice-references the rice. It is turtles all the way down.",
          relationshipHint: "delighted",
          tags: ["quest:pawel-apprentice", "relationship:warm"],
        },
        {
          id: "pawel:linux-rice:rep-5",
          text: "The update nuked it and I rebuilt it in forty minutes from the dotfiles, LIVE, while people watched like a surgery demonstration. Someone clapped. The rebuild is now faster than the breakage, which is the definition of victory in my culture.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:linux-rice:rep-6",
          text: "The rice is not why. The rice is a BREAK from why. I do my tickets, then I earn my pixels, in that order, written on a sticky note that is also part of the rice. The system is self-policing. The sticky note has never once moved. Okay, once. But it moved BACK.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "pawel:rubber-duck",
      label: "The rubber duck",
      optionCandidates: [
        { id: "pawel:rubber-duck:opt-1", topicId: "pawel:rubber-duck", text: "Why is there a rubber duck on your keyboard?" },
        { id: "pawel:rubber-duck:opt-2", topicId: "pawel:rubber-duck", text: "Does talking to the duck actually work?" },
        { id: "pawel:rubber-duck:opt-3", topicId: "pawel:rubber-duck", text: "You named the duck. Admit it." },
        { id: "pawel:rubber-duck:opt-4", topicId: "pawel:rubber-duck", text: "Burek keeps staring at the duck." },
        { id: "pawel:rubber-duck:opt-5", topicId: "pawel:rubber-duck", text: "Someone borrowed the duck and the bug took longer." },
        { id: "pawel:rubber-duck:opt-6", topicId: "pawel:rubber-duck", text: "Should the whole team get ducks?" },
      ],
      replyCandidates: [
        {
          id: "pawel:rubber-duck:rep-1",
          text: "That is my debugging partner and his name is on a need-to-know basis. The rule: explain the bug out loud before asking anyone. Half the time the bug surrenders to the duck, which saves Marek an interruption and saves me the walk of shame. The duck has never once judged me. Name one colleague about whom that is true.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:rubber-duck:rep-2",
          text: "It works because your mouth is slower than your brain. The bug lives in the speed. When you explain it to someone with infinite patience and zero opinions — like a duck — the mistake gets caught in the sentence, mid-air, publicly, in front of the duck. Humbling. Effective. Free.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:rubber-duck:rep-3",
          text: "His name is Stanislaw and he is a professional. He has heard things, Pawel-things, that no duck should hear. We have an arrangement: I provide context, he provides silence, and the bug provides the confession. He gets dusted on Fridays. He has a tiny scarf in winter. This is normal in this industry and I will not be mocked.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:rubber-duck:rep-4",
          text: "Burek and Stanislaw are in a cold war and I am the neutral power. Burek stares, Stanislaw sits, and I have started moving the duck two centimeters further from the desk edge every morning as a precaution. Janusz suggested it. Janusz understands interspecies office diplomacy at a level HR never will.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:rubber-duck:rep-5",
          text: "The duck was gone for TWO HOURS and my bug went unexplained for two hours. Coincidence? The duck returned smelling of someone else's desk — possibly Tomek's, it smelled of irony — and the bug fell in minutes. I am not saying the duck is magic. I am saying the duck is load-bearing and the borrowing stops.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:rubber-duck:rep-6",
          text: "I proposed it in the suggestion box — 'one duck per desk, colors by team' — and the suggestion got seven supportive comments, which is seven more than most suggestions get. Zosia starred it. Somewhere in a budget there may be a line for ducks. If it happens, I get to name the team lead duck. I have chosen. His name is also Stanislaw.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:afternoon"],
        },
      ],
    },
    {
      id: "pawel:shadow-oncall",
      label: "Shadowing the oncall",
      optionCandidates: [
        { id: "pawel:shadow-oncall:opt-1", topicId: "pawel:shadow-oncall", text: "Why are you awake at 3am reading the alert channel?" },
        { id: "pawel:shadow-oncall:opt-2", topicId: "pawel:shadow-oncall", text: "Marek knows you shadow his oncall shifts?" },
        { id: "pawel:shadow-oncall:opt-3", topicId: "pawel:shadow-oncall", text: "Is watching oncall a normal hobby for interns?" },
        { id: "pawel:shadow-oncall:opt-4", topicId: "pawel:shadow-oncall", text: "You kept notes from every incident this month." },
        { id: "pawel:shadow-oncall:opt-5", topicId: "pawel:shadow-oncall", text: "One day you will be on the oncall rota. Ready?" },
        { id: "pawel:shadow-oncall:opt-6", topicId: "pawel:shadow-oncall", text: "Should I shadow oncall too?" },
      ],
      replyCandidates: [
        {
          id: "pawel:shadow-oncall:rep-1",
          text: "Because 3am alerts are where the real systems live. During the day everything works and nobody says why. At 3am the graph trembles and Marek types four words and the world is saved. It is the best free education in this city and it streams directly to my phone, which I hold with both hands like a relic.",
          relationshipHint: "pleased",
          tags: ["period:evening"],
        },
        {
          id: "pawel:shadow-oncall:rep-2",
          text: "He found out in month two when I reacted to an alert faster than the alert did. He did not say anything. The next morning there was a second chair at his desk and the rota had a line under his name that says 'training'. That line is me. I have never been so formally honored.",
          relationshipHint: "delighted",
          tags: ["quest:pawel-apprentice", "relationship:warm"],
        },
        {
          id: "pawel:shadow-oncall:rep-3",
          text: "Define normal. I do not collect stamps, I do not follow football. I read incident channels and postmortems with a highlighter. Marek says it is the first hobby I have had that could ever pay rent, and he is right, and my stamp-collecting uncle would be devastated.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:shadow-oncall:rep-4",
          text: "A notebook, organized by symptom, with the fix and the FEELING of the fix. 'Disk full — extend partition — heart stopped at the rm command.' Feelings are the part the docs leave out. My notebook is the only place in this office that records fear accurately. Historians will thank me.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:shadow-oncall:rep-5",
          text: "No, and that is correct. Marek says you go on the rota when a 3am page does not excite you anymore — when it is just Tuesday. I am not there yet. I am still at the stage where my heart does a drum solo. The rota can wait. The drum solo is actually quite nice.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:shadow-oncall:rep-6",
          text: "Read the channel first, one week, silently. Learn who panics and who types slowly. The slow typists are the seniors — speed is for emergencies, calm is for control. Then ask Marek for the 'training' line. He will not say yes. He will just add the chair. That is how he says yes.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "pawel:laptop-stickers",
      label: "Laptop stickers",
      optionCandidates: [
        { id: "pawel:laptop-stickers:opt-1", topicId: "pawel:laptop-stickers", text: "My laptop lid has one sticker. Is that suspicious?" },
        { id: "pawel:laptop-stickers:opt-2", topicId: "pawel:laptop-stickers", text: "Where do people get the good stickers?" },
        { id: "pawel:laptop-stickers:opt-3", topicId: "pawel:laptop-stickers", text: "Tomek has zero stickers on his laptop." },
        { id: "pawel:laptop-stickers:opt-4", topicId: "pawel:laptop-stickers", text: "Is there an official sticker policy?" },
        { id: "pawel:laptop-stickers:opt-5", topicId: "pawel:laptop-stickers", text: "My favorite sticker is peeling at the corner." },
        { id: "pawel:laptop-stickers:opt-6", topicId: "pawel:laptop-stickers", text: "Should the company logo sticker go on first?" },
      ],
      replyCandidates: [
        {
          id: "pawel:laptop-stickers:rep-1",
          text: "One sticker is not suspicious, it is a blank canvas with restraint. The lid is a resume you cannot edit, so everyone starts cautious. By year two you will have a border dispute with yourself over server space. We have all been to that planning meeting.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:laptop-stickers:rep-2",
          text: "Conferences, meetups, cereal boxes in braver countries, and Ania's drawer, which is technically company merchandise and morally a sticker bank. The good ones find you. You cannot buy the sticker that means something. It has to survive an event first.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:laptop-stickers:rep-3",
          text: "His laptop is a monastic object. Bare aluminum, one fingerprint he resents. Tomek says the machine should be invisible so only the work shows, and I used to think that was cold until I realized it is the loudest sticker of all. I put mine on anyway.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:laptop-stickers:rep-4",
          text: "The policy is unwritten and enforced by Zosia's eyebrows: nothing offensive, nothing competitive, nothing from that one conference we do not mention. The eyebrows have only had to intervene twice, and both stickers now live in the archive box.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:laptop-stickers:rep-5",
          text: "Peeling is earned character. Janusz could fix it with a clear coat he keeps for the elevator buttons, but the corner curl is proof of use, like a worn book spine. If it fully detaches you are allowed a moment of silence and a small funeral.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],
        },
        {
          id: "pawel:laptop-stickers:rep-6",
          text: "Center, slightly left, because the lid opens toward people and the logo should land like a first impression. Zosia noticed my placement on day three and said 'good instinct'. I have never been prouder of a millimeter measurement.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:zosia-opened-up"],
        },
      ],
    },
    {
      id: "pawel:chain-of-command",
      label: "Chain of command",
      optionCandidates: [
        { id: "pawel:chain-of-command:opt-1", topicId: "pawel:chain-of-command", text: "If Tomasz and Marek disagree, who wins?" },
        { id: "pawel:chain-of-command:opt-2", topicId: "pawel:chain-of-command", text: "Can I bring questions to you directly?" },
        { id: "pawel:chain-of-command:opt-3", topicId: "pawel:chain-of-command", text: "I asked Marek first, but the ticket belongs to Tomasz." },
        { id: "pawel:chain-of-command:opt-4", topicId: "pawel:chain-of-command", text: "If something breaks at 3am, who do I call?" },
        { id: "pawel:chain-of-command:opt-5", topicId: "pawel:chain-of-command", text: "Zosia said to route things through you. True?" },
        { id: "pawel:chain-of-command:opt-6", topicId: "pawel:chain-of-command", text: "Does the chain of command apply to Burek?" },
      ],
      replyCandidates: [
        {
          id: "pawel:chain-of-command:rep-1",
          text: "Depends on the battlefield. Inside the editor, Tomasz wins by default and Marek knows it. Anything with a plug, a cable, or a temperature belongs to Marek, and Tomasz pretends not to have opinions about routers. The overlap zone is chairs. We do not discuss the chair.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:chain-of-command:rep-2",
          text: "Always. The chain is for escalations, not for fears. Half of what I do is telling juniors the question they were afraid to ask was the right one, and the other half is admitting I googled it too. Direct questions save the whole chain time.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-apprentice"],
        },
        {
          id: "pawel:chain-of-command:rep-3",
          text: "The two-boss theorem, first encounter. Formally: whoever owns the ticket owns the fix, so Tomasz. Practically: tell Marek you are redirecting, because Marek does not mind being wrong, he minds being silently bypassed. Say it out loud and both stay allies.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:chain-of-command:rep-4",
          text: "Marek. It is in his contract, possibly in his bones. He answers on the second ring with his voice already at the keyboard. Tomasz gets 3am calls only for things that rhyme with 'data loss', and Zosia gets them for things that rhyme with 'fire', literally.",
          relationshipHint: "neutral",
          tags: ["period:evening"],
        },
        {
          id: "pawel:chain-of-command:rep-5",
          text: "It is coordination, not hierarchy. I collect the small questions so the seniors get batches instead of sprinkles. If a question needs Tomasz, I walk it over personally, which is faster than the org chart and comes with better storytelling.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:chain-of-command:rep-6",
          text: "Burek outranks every junior by unwritten law and sleeps through the meetings where that is decided. If Burek sits on your cable, the cable is now his. Escalate to treats. Renata keeps the diplomatic snack reserve and honors all petitions.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "pawel:two-factor",
      label: "Two-factor apps",
      optionCandidates: [
        { id: "pawel:two-factor:opt-1", topicId: "pawel:two-factor", text: "My authenticator generated two codes at once." },
        { id: "pawel:two-factor:opt-2", topicId: "pawel:two-factor", text: "I lost my phone with the authenticator on it." },
        { id: "pawel:two-factor:opt-3", topicId: "pawel:two-factor", text: "Is SMS two-factor really that bad?" },
        { id: "pawel:two-factor:opt-4", topicId: "pawel:two-factor", text: "Can I use one 2FA app for work and games?" },
        { id: "pawel:two-factor:opt-5", topicId: "pawel:two-factor", text: "The login push never arrived on my screen." },
        { id: "pawel:two-factor:opt-6", topicId: "pawel:two-factor", text: "Why does Marek keep a paper copy of my backup codes?" },
      ],
      replyCandidates: [
        {
          id: "pawel:two-factor:rep-1",
          text: "That is clock skew, not a haunting. Your phone argues with the server about what time it is and both codes are right somewhere. Marek fixes it in ninety seconds by syncing the clock, then gives you a look that says 'the clocks are fighting again'.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:two-factor:rep-2",
          text: "Breathe. This is why the paper codes exist and why the envelope lives in Grazyna's drawer behind the stamp. We walk there together, you say the words 'I lost my second factor' like an adult, and twenty minutes later you are reborn with new codes.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:two-factor:rep-3",
          text: "It is better than nothing and worse than an app, which makes it the elevator music of security. Tomek gave a nine-minute speech about SIM swaps once and Marek quietly turned SMS off for the whole office that same afternoon. The speech worked.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:two-factor:rep-4",
          text: "Never mix the guild with the paycheck. When the game studio got breached, half a server's worth of people learned their work email shared a password with a dragon account. Separate apps, separate phones if you can. The dragon stays outside.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:two-factor:rep-5",
          text: "The classic: approve-then-appear. You approve on the second device and the prompt arrives a minute later, defeated. Marek calls it 'the push arriving fashionably late'. If it happens twice in a day, we re-enroll you and blame the phone's religion.",
          relationshipHint: "neutral",
          tags: ["period:evening"],
        },
        {
          id: "pawel:two-factor:rep-6",
          text: "Because Marek's filing system is the disaster recovery plan, and you are in it now. The envelope means the office decided you are worth restoring. I got my envelope in month two and felt like I had been issued a tiny paper medal.",
          relationshipHint: "delighted",
          tags: ["quest:marek-trusted-review"],
        },
      ],
    },
    {
      id: "pawel:first-incident",
      label: "First production incident",
      optionCandidates: [
        { id: "pawel:first-incident:opt-1", topicId: "pawel:first-incident", text: "My change broke staging. Is that normal?" },
        { id: "pawel:first-incident:opt-2", topicId: "pawel:first-incident", text: "What was your first production incident?" },
        { id: "pawel:first-incident:opt-3", topicId: "pawel:first-incident", text: "The error log literally has my name in it." },
        { id: "pawel:first-incident:opt-4", topicId: "pawel:first-incident", text: "Should I confess before anyone notices?" },
        { id: "pawel:first-incident:opt-5", topicId: "pawel:first-incident", text: "Nobody noticed the staging outage for a whole day." },
        { id: "pawel:first-incident:opt-6", topicId: "pawel:first-incident", text: "Tomek just said 'welcome' when I paged him." },
      ],
      replyCandidates: [
        {
          id: "pawel:first-incident:rep-1",
          text: "Staging is a classroom with tuition included and nobody grades the homework. Breaking it means you were close enough to the machinery to matter. The seniors are not angry; they are taking bets on whether you find it before Marek does.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:first-incident:rep-2",
          text: "I am still in the tense period called 'so far, never', and I live in dread of the rite. Marek's involved a backup that restored yesterday into today. Tomasz's involves one semicolon and the word 'temporarily'. I rehearse my incident face in the elevator.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:first-incident:rep-3",
          text: "Seeing your own name in a stack trace is the truest graduation ceremony this industry offers. Screenshot it, learn from it, and in two years you will show it to some terrified intern with the exact same face you are making right now.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:first-incident:rep-4",
          text: "Always. The confession tax is small and the discovery tax is brutal, with interest compounding every hour you stay quiet. Marek says incidents are never about the bug, they are about the minutes. Report the minutes, keep the trust, fix the bug.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-apprentice"],
        },
        {
          id: "pawel:first-incident:rep-5",
          text: "That is not luck, that is staging doing its one job: catching your worst before the client's Tuesday does. An unnoticed staging outage is the system applauding quietly. Somewhere, a dashboard is proud of you and does not know how to say it.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:first-incident:rep-6",
          text: "That is the whole ceremony, and it is genuine. 'Welcome' from Tomasz carries what other people need a paragraph for. You have joined the lineage of everyone who ever woke him with a pager. There is no certificate. The word is the certificate.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
      ],
    },
    {
      id: "pawel:hydration",
      label: "The water bottle",
      optionCandidates: [
        { id: "pawel:hydration:opt-1", topicId: "pawel:hydration", text: "Is carrying a one-liter bottle to standup excessive?" },
        { id: "pawel:hydration:opt-2", topicId: "pawel:hydration", text: "You really swapped energy drinks for water?" },
        { id: "pawel:hydration:opt-3", topicId: "pawel:hydration", text: "My new bottle has little time markers on it." },
        { id: "pawel:hydration:opt-4", topicId: "pawel:hydration", text: "The water in my bottle froze at my desk overnight." },
        { id: "pawel:hydration:opt-5", topicId: "pawel:hydration", text: "Does hydration actually make you code better?" },
        { id: "pawel:hydration:opt-6", topicId: "pawel:hydration", text: "Grazyna asked if the bottle is company property." },
      ],
      replyCandidates: [
        {
          id: "pawel:hydration:rep-1",
          text: "It is not excessive, it is a commitment device with a handle. The bottle goes where I go, which means hydration survives meetings, deploys and the walk to the kitchen. Marek respects gear that improves uptime, and so do I, apparently, for my body now.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:hydration:rep-2",
          text: "The last can and I parted ways in March, at 4pm, during a build that was going to fail anyway. There was a withdrawal arc, there were headaches, there was a relapse in June I do not discuss. Now I am one of those people and the cans fear me.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:hydration:rep-3",
          text: "The time markers assume my day has a shape. '10am: focus' does not survive contact with a ticket queue. But the bottle means well, and honestly, racing a printed scribble beats ignoring my own body, which was my previous system.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:hydration:rep-4",
          text: "That is Tomasz's window in winter, the one he opens at 8am sharp for 'air'. Your desk is in the frost corridor. either you join his fresh-air faith or you relocate the bottle to the shared shelf, where it will be safe and slightly judged.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],
        },
        {
          id: "pawel:hydration:rep-5",
          text: "Honestly? It fixes everything except deadlines. Headaches down, afternoon fog thinner, standup voice steadier. It will not write the code for you, but it stops the code from being written by someone at sixty percent, which is who I used to be.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:hydration:rep-6",
          text: "She logged it, audited it, and concluded the bottle is a personal asset with office hours. There is now a line in her ledger that says 'hydration infrastructure'. I have never felt so seen by accounting. She taps it when she walks past. It is a whole thing.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
      ],
    },
    {
      id: "pawel:flashcards",
      label: "Certification flashcards",
      optionCandidates: [
        { id: "pawel:flashcards:opt-1", topicId: "pawel:flashcards", text: "Do you really bring flashcards to lunch?" },
        { id: "pawel:flashcards:opt-2", topicId: "pawel:flashcards", text: "How many flashcards is too many?" },
        { id: "pawel:flashcards:opt-3", topicId: "pawel:flashcards", text: "Can I borrow your networking deck?" },
        { id: "pawel:flashcards:opt-4", topicId: "pawel:flashcards", text: "Tomek saw my flashcards and said nothing." },
        { id: "pawel:flashcards:opt-5", topicId: "pawel:flashcards", text: "Do flashcards actually work, honestly?" },
        { id: "pawel:flashcards:opt-6", topicId: "pawel:flashcards", text: "The exam is on Friday. Is panicking allowed?" },
      ],
      replyCandidates: [
        {
          id: "pawel:flashcards:rep-1",
          text: "Lunch is ten idle minutes and the deck does not mind soup. Spaced repetition does not care about dignity. Marek saw me reviewing subnet masks over pierogi and now he quizzes me uninvited, which is either mentorship or hazing and I have accepted both.",
          relationshipHint: "pleased",
          tags: ["period:lunch"],
        },
        {
          id: "pawel:flashcards:rep-2",
          text: "The deck passed four thousand in spring and developed its own weather. There are cards I wrote during the barcoded phase of my life and can no longer interpret. Too many is when reviewing the deck takes longer than the certification is worth. We are close.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:flashcards:rep-3",
          text: "The printed deck, yes, take it. The handwritten ones stay with me: those have diagrams where I argued with myself in the margins, and the arguments are half the knowledge. Photocopy what helps, return what confuses, and add nothing in pen.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:flashcards:rep-4",
          text: "Nothing IS the review. Tomek reviews silently and speaks only when something is wrong, so silence from him means the method survives inspection. I walked back to my desk levitating. Klaudia thought I got a raise. In a way, on a ledger only I keep, I did.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "pawel:flashcards:rep-5",
          text: "They work the way flossing works: unglamorous, effective, embarrassing to admit. I have forgotten card one eleven times and can now recite it under anesthesia. Anything you rehearse at soup temperature becomes permanent. That is the whole secret.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:flashcards:rep-6",
          text: "Panicking is allowed and scheduled: you get Tuesday evening, fully, and then it converts to practice exams. By Friday the fear is just a study plan wearing a costume. Zosia taught me that trick and it has carried me through two certifications.",
          relationshipHint: "pleased",
          tags: ["period:morning", "relationship:warm"],
        },
      ],
    },
    {
      id: "pawel:github-streak",
      label: "The green streak",
      optionCandidates: [
        { id: "pawel:github-streak:opt-1", topicId: "pawel:github-streak", text: "My contribution streak just passed 200 days." },
        { id: "pawel:github-streak:opt-2", topicId: "pawel:github-streak", text: "Does one empty day really break the streak?" },
        { id: "pawel:github-streak:opt-3", topicId: "pawel:github-streak", text: "Tomek called streaks 'vanity metrics for the soul'." },
        { id: "pawel:github-streak:opt-4", topicId: "pawel:github-streak", text: "I committed a one-character typo fix at midnight." },
        { id: "pawel:github-streak:opt-5", topicId: "pawel:github-streak", text: "Should I put the streak in my portfolio?" },
        { id: "pawel:github-streak:opt-6", topicId: "pawel:github-streak", text: "My streak graph looks like Marek's uptime board." },
      ],
      replyCandidates: [
        {
          id: "pawel:github-streak:rep-1",
          text: "Two hundred is a number that deserves one honest eyebrow and one real question: did the days contain work, or did the work contain days? Mine had both. Keep the streak, but keep it as a fossil record, not a scoreboard. Fossils do not fight back.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:github-streak:rep-2",
          text: "It does, mercilessly, at midnight, in a timezone you did not pick. There are legends of 23:58 commits to saves streaks and I have personally executed two. The graph does not know you were sick. The graph only knows green.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:github-streak:rep-3",
          text: "It wounded me for a week and then I understood it. He was not against the streak, he was against the streak speaking for you. Now when the graph is green but the week was hollow, I hear his voice and push something real. Rude. Effective. Tomasz.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:github-streak:rep-4",
          text: "The midnight typo commit is the streak's little sacrament and we have all taken it. Just know the commit message 'fix' at 23:57 is the graph's version of junk food: it counts, and it knows it does not count. Confession absolves nothing. The graph remembers.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:github-streak:rep-5",
          text: "As a footnote, not a headline. A portfolio should lead with things you built, not days you showed up. But under 'habits', a two-hundred-day streak says something real about you: you start again. That is the employable part, not the green.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:github-streak:rep-6",
          text: "Marek noticed the resemblance before I did and printed both graphs side by side. His is uptime, mine is presence, and the shapes rhyme because we are both saying the same thing: still here, still here, still here. He framed it. I teared up, slightly.",
          relationshipHint: "delighted",
          tags: ["quest:marek-trusted-review", "relationship:warm"],
        },
      ],
    },
    {
      id: "pawel:desk-plant",
      label: "The desk plant",
      optionCandidates: [
        { id: "pawel:desk-plant:opt-1", topicId: "pawel:desk-plant", text: "My desk plant is dying again." },
        { id: "pawel:desk-plant:opt-2", topicId: "pawel:desk-plant", text: "Janusz left watering instructions on a sticky note?" },
        { id: "pawel:desk-plant:opt-3", topicId: "pawel:desk-plant", text: "Would a cactus be lower maintenance?" },
        { id: "pawel:desk-plant:opt-4", topicId: "pawel:desk-plant", text: "The plant is technically the whole team's plant." },
        { id: "pawel:desk-plant:opt-5", topicId: "pawel:desk-plant", text: "Does Tomasz water it when I am on vacation?" },
        { id: "pawel:desk-plant:opt-6", topicId: "pawel:desk-plant", text: "Can the plant attend standup as moral support?" },
      ],
      replyCandidates: [
        {
          id: "pawel:desk-plant:rep-1",
          text: "The basil and I have history. I either love it to death or forget it into philosophy, never the middle path it wants. Last rescue involved Janusz, a repot, and a look that said more about overwatering than any article online. It lived. I am changed.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:desk-plant:rep-2",
          text: "Three millimeters of water, 'not affection, measurement', and a small sun drawn in the corner. I have the note taped inside my desk drawer. His handwriting makes plant care look like a maintenance contract, because to him it is one.",
          relationshipHint: "delighted",
          tags: ["quest:janusz-knows-the-plug"],
        },
        {
          id: "pawel:desk-plant:rep-3",
          text: "Everyone says cactus, and my cactus still found a way. I overwatered a plant whose entire strategy is not needing me. Some of us are not ready for organisms with opinions. Janusz says start with plastic and earn the real ones. I have not earned the joke yet.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:desk-plant:rep-4",
          text: "Shared custody is the honest version. The plant belongs to the pod; I am just the accountable party, which in office terms means the one blamed at retros. Zosia called it 'a low-stakes lesson in ownership' and put it in the culture deck notes.",
          relationshipHint: "neutral",
          tags: ["period:afternoon"],
        },
        {
          id: "pawel:desk-plant:rep-5",
          text: "There is a silent watering schedule and he is on it. No message, no acknowledgment, just a mysteriously moist plant every August. I found out because the sticky note in MY handwriting moved two centimeters. Tomasz forged my handwriting to be kind. Iconic.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:tomek-reviewed-pr"],
        },
        {
          id: "pawel:desk-plant:rep-6",
          text: "It already does, and its attendance is perfect. Three hundred standups, zero complaints, one indirect compliment from Zosia about 'green productivity'. If the plant makes you stand straighter, that is performance enablement. Welcome it. Water it after.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "pawel:pair-programming",
      label: "Pair programming",
      optionCandidates: [
        { id: "pawel:pair-programming:opt-1", topicId: "pawel:pair-programming", text: "My hands shake when Tomasz watches me type." },
        { id: "pawel:pair-programming:opt-2", topicId: "pawel:pair-programming", text: "Is it rude to sit in silence while pairing?" },
        { id: "pawel:pair-programming:opt-3", topicId: "pawel:pair-programming", text: "How long should a pairing session last?" },
        { id: "pawel:pair-programming:opt-4", topicId: "pawel:pair-programming", text: "Tomek navigates using one-word hints." },
        { id: "pawel:pair-programming:opt-5", topicId: "pawel:pair-programming", text: "Can I pair with Marek on infrastructure?" },
        { id: "pawel:pair-programming:opt-6", topicId: "pawel:pair-programming", text: "Does pairing count as socializing?" },
      ],
      replyCandidates: [
        {
          id: "pawel:pair-programming:rep-1",
          text: "Everyone's hands shake at first; the keyboard becomes a stage the moment a senior pulls up a chair. The trick is to narrate badly on purpose: say the wrong idea out loud and feel how gently he corrects it. Fear drops once you are building the same wrong thing.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:pair-programming:rep-2",
          text: "Silence is a feature. Two people staring at the same problem, breathing, is the pair compiler running. Tomek once said nothing for eleven minutes and then said 'rename it' and the whole session unlocked. The silence was the rename being born.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:pair-programming:rep-3",
          text: "Ninety minutes, hard stop, because brains are not infinite and friendship is a resource. Past that point you are two tired people defending one keyboard. We stop, we walk, and the bug that refused us solves itself overnight out of spite.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:pair-programming:rep-4",
          text: "'Name.' 'Extract.' 'Why.' Each word is a compressed lecture, and you unpack them for hours afterward. I keep a log of his one-word hints like other people keep quotes. Tomasz reviews the log occasionally and adds one word: 'accurate'.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-apprentice"],
        },
        {
          id: "pawel:pair-programming:rep-5",
          text: "You can, and you will come back knowing where every cable goes and what that hum means. Marek pairs the way farmers talk about soil. Wear something you do not mind taking to the server room, because you will end up in the server room.",
          relationshipHint: "pleased",
          tags: ["quest:marek-trusted-review"],
        },
        {
          id: "pawel:pair-programming:rep-6",
          text: "It is socializing with objectives, which for people like us is the perfect format. You get conversation, collaboration and a shared enemy called the failing test. Zosia counted a pairing session as team bonding once. The bonding was real. The build was red.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "pawel:onboarding-doc",
      label: "The onboarding doc",
      optionCandidates: [
        { id: "pawel:onboarding-doc:opt-1", topicId: "pawel:onboarding-doc", text: "I have been told to update the onboarding doc." },
        { id: "pawel:onboarding-doc:opt-2", topicId: "pawel:onboarding-doc", text: "The doc still says 'ask Dariusz' in step three." },
        { id: "pawel:onboarding-doc:opt-3", topicId: "pawel:onboarding-doc", text: "Nobody reads the onboarding doc anyway, right?" },
        { id: "pawel:onboarding-doc:opt-4", topicId: "pawel:onboarding-doc", text: "Can I add a section about the coffee machine?" },
        { id: "pawel:onboarding-doc:opt-5", topicId: "pawel:onboarding-doc", text: "How honest should the onboarding doc be?" },
        { id: "pawel:onboarding-doc:opt-6", topicId: "pawel:onboarding-doc", text: "Zosia wants the doc linked from the culture deck?" },
      ],
      replyCandidates: [
        {
          id: "pawel:onboarding-doc:rep-1",
          text: "Congratulations, you are the historian now. Whoever updates the doc becomes its soul, and the doc quietly becomes your voice forever. I rewrote section two in March and people still say 'you wrote the part about the VPN, right' with gratitude and fear.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-apprentice"],
        },
        {
          id: "pawel:onboarding-doc:rep-2",
          text: "That line is a monument, like the roadmap or the printer. Dariusz left before I joined and I have never seen him, yet I followed his VPN instructions like scripture. Keep the line, mark it 'historical', and let new hires feel how deep the place goes.",
          relationshipHint: "neutral",
        },
        {
          id: "pawel:onboarding-doc:rep-3",
          text: "Everyone reads it exactly once, at maximum need, usually panicked, sometimes at 8:55 on day one. That single reading is the most important documentation moment in this office. You are not writing for traffic. You are writing for the person drowning politely.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:onboarding-doc:rep-4",
          text: "The coffee machine section is not optional, it is sacred first-hour knowledge: the button that lies, the trick with the tray, the maintenance window Janusz holds Thursdays. Tomasz contributed one line: 'the machine respects honesty'. It stays in forever.",
          relationshipHint: "delighted",
          tags: ["period:morning"],
        },
        {
          id: "pawel:onboarding-doc:rep-5",
          text: "Write the doc you needed at 9am on your first day, including the embarrassing parts: which door is not a door, where the good pens hide, that the printer speaks only to Janusz. Honesty scales. New hires can smell a sanitized doc from the elevator.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:onboarding-doc:rep-6",
          text: "The doc and the deck, together at last. She framed it as 'culture ends where instructions begin' and then linked them anyway. Somewhere a new hire will read my VPN paragraph directly under a photo of Burek, and honestly, that is the whole company in one screen.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "pawel:focus-playlist",
      label: "The focus playlist",
      optionCandidates: [
        { id: "pawel:focus-playlist:opt-1", topicId: "pawel:focus-playlist", text: "Lo-fi beats genuinely help, right?" },
        { id: "pawel:focus-playlist:opt-2", topicId: "pawel:focus-playlist", text: "My focus playlist is nine hours long. Normal?" },
        { id: "pawel:focus-playlist:opt-3", topicId: "pawel:focus-playlist", text: "Tomek works in total silence. Is he alright?" },
        { id: "pawel:focus-playlist:opt-4", topicId: "pawel:focus-playlist", text: "My playlist has one song from a game soundtrack." },
        { id: "pawel:focus-playlist:opt-5", topicId: "pawel:focus-playlist", text: "Do headphones on really mean do-not-disturb?" },
        { id: "pawel:focus-playlist:opt-6", topicId: "pawel:focus-playlist", text: "Klaudia wants to sample my playlist for a post." },
      ],
      replyCandidates: [
        {
          id: "pawel:focus-playlist:rep-1",
          text: "The science is vibes-based but the vibes are load-bearing. Lo-fi is music that politely refuses to be the main character, which is exactly what you want under a code review. My rule: if I notice the song, it goes. The playlist works hardest when I forget it exists.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:focus-playlist:rep-2",
          text: "Nine hours is not a playlist anymore, it is a habitat. Mine is eleven and has an ecosystem: a meadow section, a thunder section, one valley where the same piano loop has lived since 2021. Do not judge the size. Judge whether you would survive a week inside it.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:focus-playlist:rep-3",
          text: "He is more than alright, he is operating system level. Silence is his playlist and it has no skips. I asked him once what he hears and he said 'the build'. Different brains, different weather. Mine needs rain sounds; his IS the rain, apparently.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:focus-playlist:rep-4",
          text: "The game song is the anchor leg of the whole playlist. Mine is from a racing game I played at fourteen, and when it comes on my fingers believe they are seventeen and undefeatable. Everyone's playlist has one. Ask Tomasz. He will say 'no comment', which means yes.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:focus-playlist:rep-5",
          text: "Yes, with a translation table: headphones on is 'try knocking', headphones plus hood is 'email me', and headphones plus standing up means I am getting coffee and human again. Renata reads all three states fluently. Marek respects none of them, correctly, when prod is down.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "pawel:focus-playlist:rep-6",
          text: "She called it 'underground productivity audio' and wants to film me nodding to it. I said yes on the condition the thunder section stays in, because that is the artistic part. My playlist is about to have a public. My playlist is not ready.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "pawel:pomodoro",
      label: "Pomodoro experiments",
      optionCandidates: [
        { id: "pawel:pomodoro:opt-1", topicId: "pawel:pomodoro", text: "Does the twenty-five minute timer actually work?" },
        { id: "pawel:pomodoro:opt-2", topicId: "pawel:pomodoro", text: "I keep skipping the breaks entirely." },
        { id: "pawel:pomodoro:opt-3", topicId: "pawel:pomodoro", text: "My timer ticks loudly and Tomasz has noticed." },
        { id: "pawel:pomodoro:opt-4", topicId: "pawel:pomodoro", text: "Can I run a meeting as a pomodoro?" },
        { id: "pawel:pomodoro:opt-5", topicId: "pawel:pomodoro", text: "My five-minute breaks became twenty minutes." },
        { id: "pawel:pomodoro:opt-6", topicId: "pawel:pomodoro", text: "Marek times his server checks like pomodoros?" },
      ],
      replyCandidates: [
        {
          id: "pawel:pomodoro:rep-1",
          text: "It works the way training wheels work: silly, slightly humiliating, and it teaches you the shape of the thing. After a month I could feel where twenty-five minutes ended without the timer. Now the tomato lives in my head, rent-free, judging my focus.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:pomodoro:rep-2",
          text: "Classic tomato denial. The break feels like the enemy of flow until you notice the break is where the bugs dissolve. Marek's rule: the solution you need is at the coffee machine, stretching its legs. Skip the break and you skip the answer.",
          relationshipHint: "annoyed",
        },
        {
          id: "pawel:pomodoro:rep-3",
          text: "The tomato must be silent. He said exactly that, once, without looking up, and I switched to a silent app the same hour. Now the only sound from my desk is typing and the occasional quiet sob of a test failing. The office approves of this.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],
        },
        {
          id: "pawel:pomodoro:rep-4",
          text: "Zosia invented that before I did: her meetings are twenty-five minutes with a visible timer and a hard stop she enforces with genuine joy. My contribution was the break after, which she adopted as 'the eleven-minute walk'. Methodology spreads like gossip here.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:pomodoro:rep-5",
          text: "The break inflation is real and I have data: five promised, seventeen delivered, one legendary forty that ended at the vending machine with Janusz discussing the building's plumbing history. The timer does not mind. The timer has seen everything.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "pawel:pomodoro:rep-6",
          text: "He does his rounds on a fixed interval with the same reverence Tomasz gives builds. Infrastructure pomodoros: check the backups, pet the rack, water Pawel's basil if it looks at him wrong. The systems of this office are all one methodology wearing different hats.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "pawel:dream-setup",
      label: "The dream battlestation",
      optionCandidates: [
        { id: "pawel:dream-setup:opt-1", topicId: "pawel:dream-setup", text: "What would your dream desk setup be?" },
        { id: "pawel:dream-setup:opt-2", topicId: "pawel:dream-setup", text: "Is two monitors even enough anymore?" },
        { id: "pawel:dream-setup:opt-3", topicId: "pawel:dream-setup", text: "Mechanical keyboard: which switches would you pick?" },
        { id: "pawel:dream-setup:opt-4", topicId: "pawel:dream-setup", text: "Does your dream setup include a window?" },
        { id: "pawel:dream-setup:opt-5", topicId: "pawel:dream-setup", text: "Can a dream setup include a dog bed?" },
        { id: "pawel:dream-setup:opt-6", topicId: "pawel:dream-setup", text: "Tomek saw my dream setup doc and said 'wait'." },
      ],
      replyCandidates: [
        {
          id: "pawel:dream-setup:rep-1",
          text: "It is a versioned document, currently at v9, with a changelog and one entry that just says 'restraint?'. Every conference talk costs me an edit. Somewhere between the cable tray and the monitor arm there is a line I will never cross, and I keep moving it.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:dream-setup:rep-2",
          text: "Two is a desk, three is a cockpit. Marek's third monitor shows logs like a fireplace shows fire, and I have stood in his office just absorbing the glow. The real question is not how many. It is whether the primary one is centered, and it must be, or nothing means anything.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:dream-setup:rep-3",
          text: "The quiet ones, for Tomasz's sake and my soul. I tried the clicky kind for one week in 2023 and the office developed a group chat about it that did not include me. My dream keyboard sounds like distant rain and types like a promise being kept.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "pawel:dream-setup:rep-4",
          text: "The window is the true peripheral. Tomasz's winter-air desk proved it to me: a view of weather makes better code than a fourth monitor. My dream setup has north light, a plant within reach, and a radiator Janusz has personally blessed. The rest is cables.",
          relationshipHint: "delighted",
        },
        {
          id: "pawel:dream-setup:rep-5",
          text: "A dream setup without Burek is just furniture. I measured the gap under my desk in his honor; it fits a medium dog and zero ambitions of mine. Renata says he naps where the wifi is strongest, so the dog bed is basically network infrastructure.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "pawel:dream-setup:rep-6",
          text: "From Tomasz, 'wait' is a paragraph. He scrolled the whole doc, stopped at the keyboard tray, and said 'wait' twice, which in his currency is a standing ovation. Then he said 'the tray matters'. I have never felt so seen by so few words.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
      ],
    },
    {
      id: "pawel:works-on-my-machine",
      label: "Works on my machine",
      optionCandidates: [
        { id: "pawel:works-on-my-machine:opt-1", topicId: "pawel:works-on-my-machine", text: "It works on my machine. Is that a defense?" },
        { id: "pawel:works-on-my-machine:opt-2", topicId: "pawel:works-on-my-machine", text: "How do I stop saying it out loud?" },
        { id: "pawel:works-on-my-machine:opt-3", topicId: "pawel:works-on-my-machine", text: "The bug vanished the moment Marek sat down." },
        { id: "pawel:works-on-my-machine:opt-4", topicId: "pawel:works-on-my-machine", text: "Tomek replied to my ticket with 'then ship the machine'." },
        { id: "pawel:works-on-my-machine:opt-5", topicId: "pawel:works-on-my-machine", text: "My machine genuinely differs. Is Docker the answer?" },
        { id: "pawel:works-on-my-machine:opt-6", topicId: "pawel:works-on-my-machine", text: "The client said 'it works on our machine' back at us." },
      ],
      replyCandidates: [
        {
          id: "pawel:works-on-my-machine:rep-1",
          text: "It is a confession wearing confidence. What you are actually saying is: my machine and production have drifted apart, and I have chosen to identify with the machine. Say it once for the joke. Say it twice and Marek starts building you a container with your name on it.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:works-on-my-machine:rep-2",
          text: "The five-step program, taught by experience: say it, hear it echo, feel Tomasz's silence, investigate instead, and discover your machine was the weird one all along. I am seven months clean and my reward is that Marek now says it about MY laptop, fondly.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:works-on-my-machine:rep-3",
          text: "The observer effect, hardware edition. Bugs smell fear and Marek does not emit any. He sat down, it worked, he shrugged and said 'hello to you too'. We logged it in the incident channel under 'resolved by presence', which is my favorite resolution status ever.",
          relationshipHint: "delighted",
          tags: ["quest:marek-trusted-review"],
        },
        {
          id: "pawel:works-on-my-machine:rep-4",
          text: "That reply is certified legend and it is framed, mentally, in my hall of one-liners. It means: the machine is not the environment, you are. I shipped the principle instead of the laptop and the bug never came back. The machine stays with me as a trophy.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "pawel:works-on-my-machine:rep-5",
          text: "Then the container is your alibi, and honest alibis are allowed. Marek will help you build it, not because Docker is magic but because your machine stops being a personality and starts being a recipe. Recipes survive Mondays. Personalities do not.",
          relationshipHint: "pleased",
        },
        {
          id: "pawel:works-on-my-machine:rep-6",
          text: "The mirror match. When the client says it, the phrase completes its migration from excuse to universal law. Zosia turned the call into a working session, both machines were wrong, and everybody bonded. There is no bug like a mutually shared bug.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract"],
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

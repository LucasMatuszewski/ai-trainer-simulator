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
          text: "npm install fixes ninety percent. What about the rest?",
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
  ],
  taskOffers: [
    {
      id: "pawel:task-restore-drill",
      title: "The restore drill",
      description: "Backups are promises until they are restored. One Friday evening, prove the cloud bucket gives the files back. Pawel brings the script, the dread, and a floor to sit on.",
      flagToSet: "pawel-restore-drill",
      rewardHint: "+Pawel's courage",
    },
  ],
};

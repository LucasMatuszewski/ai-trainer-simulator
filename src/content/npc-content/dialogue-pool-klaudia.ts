/**
 * WS3 dialogue v2 pool — Klaudia, The LinkedIn Influencer (C-77).
 *
 * Pure authored data. Topics: content collabs, the algorithm, what her
 * actual job is, and the iced-latte emergency (mornings and lunch). Task
 * offer: the coffee emergency cofounder video (sets the existing
 * `klaudia-rebranded-you` flag). Tone: maximum visibility, moderate depth,
 * the algorithm is a coworker who never books meetings.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const KLAUDIA_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "klaudia",
  topics: [
    {
      id: "klaudia:collab",
      label: "Content collab",
      optionCandidates: [
        {
          id: "klaudia:collab:opt-1",
          topicId: "klaudia:collab",
          text: "Fine. What does a collab actually involve?",
        },
        {
          id: "klaudia:collab:opt-2",
          topicId: "klaudia:collab",
          text: "What if my agent likes every post automatically?",
        },
        {
          id: "klaudia:collab:opt-3",
          topicId: "klaudia:collab",
          text: "I will collab, but no crying in thumbnails.",
        },
        {
          id: "klaudia:collab:opt-4",
          topicId: "klaudia:collab",
          text: "Can we make the content about something true?",
        },
        {
          id: "klaudia:collab:opt-5",
          topicId: "klaudia:collab",
          text: "What is your engagement rate, honestly?",
        },
        {
          id: "klaudia:collab:opt-6",
          topicId: "klaudia:collab",
          text: "The last collab got me three recruiter DMs. All spam.",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:collab:rep-1",
          text: "You show up, you say 'game-changing' twice, and you point at something off-camera like it owes you money. I edit. The edit is where the magic is. I once cut a fifteen-minute ramble into forty seconds and it outperformed the company's actual product launch.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:collab:rep-2",
          text: "Say less. Engagement on a schedule is called a CONTENT PIPELINE. Have it comment 'so true' with different punctuation so it looks organic. Honestly, your agent gets the hustle better than most humans. No offence. Some offence.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:collab:rep-3",
          text: "The crying IS the hook. Ugh, fine, we do 'surprised' instead. It is crying with eyebrows. The algorithm cannot tell the difference and neither can the comments, which are the only critics I respect, and only when they spell my name right.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:collab:rep-4",
          text: "True is a strong word. We say 'relatable'. Nobody screenshots true. They screenshot 'I feel seen' and then they do not buy anything, but the REACH, the reach is real, and reach is basically revenue with extra steps.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:collab:rep-5",
          text: "We do not say 'rate', we say 'momentum'. Numbers go up when I post and down when I post about numbers. The one metric that never dips is my confidence, and that is the metric I put in the deck.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:collab:rep-6",
          text: "Those DMs are a funnel. Spam is just a recruiter with ambition. Forward me two, I will intro you to one, and suddenly we are 'connected in the industry'. That is how networking works. Nobody meets anyone. Everyone forwards everyone.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:algorithm",
      label: "The algorithm",
      minRelationship: 40,
      optionCandidates: [
        {
          id: "klaudia:algorithm:opt-1",
          topicId: "klaudia:algorithm",
          text: "Explain the algorithm like I am a manager.",
        },
        {
          id: "klaudia:algorithm:opt-2",
          topicId: "klaudia:algorithm",
          text: "Your post got 200 likes and zero substance. How?",
        },
        {
          id: "klaudia:algorithm:opt-3",
          topicId: "klaudia:algorithm",
          text: "The algorithm hates me.",
        },
        {
          id: "klaudia:algorithm:opt-4",
          topicId: "klaudia:algorithm",
          text: "Should I post about AI before or after lunch?",
        },
        {
          id: "klaudia:algorithm:opt-5",
          topicId: "klaudia:algorithm",
          text: "What happens when the algorithm changes?",
        },
        {
          id: "klaudia:algorithm:opt-6",
          topicId: "klaudia:algorithm",
          text: "Is the algorithm okay? Like, emotionally?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:algorithm:rep-1",
          text: "Imagine a gym where the mirrors decide who is invisible. Post when the mirrors are hungry: Tuesday 8am, Sunday 7pm. That is it. That is the strategy. I once explained this to a manager and he called it 'operational excellence' and repeated it to the board.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:algorithm:rep-2",
          text: "Substance is friction. Two hundred likes means it was smooth enough to agree with and short enough to finish. The comments argued about nothing for two days. That thread paid for my ring light. Nothing is free, especially nothing.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:algorithm:rep-3",
          text: "The algorithm does not hate you. It just has not met you. We fix that: three posts. One hot take, one humble brag, one photo of Burek. Burek is off-brand for me but he is the internet's emotional support animal and I respect the meta.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:algorithm:rep-4",
          text: "After. Everyone scrolls at two pm looking for an excuse not to work. You are not content, you are a service. I once posted at nine am. Best-performing flop of my career. Never again. The morning belongs to coffee and denial.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:algorithm:rep-5",
          text: "Panic. Then pivot. Then a post about the pivot that does numbers the change never could. The algorithm has changed nine times since I started. My brand has survived nine apocalypses. The brand is load-bearing now.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:algorithm:rep-6",
          text: "Honestly? The algorithm is the only coworker who never books me into a meeting. We have a relationship. I feed it, it feeds me. Some nights I swear it reads my drafts and sighs. We are all just trying to be perceived, and the algorithm perceives hardest.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:job-title",
      label: "What is your actual job",
      optionCandidates: [
        {
          id: "klaudia:job-title:opt-1",
          topicId: "klaudia:job-title",
          text: "Senior Innovation Catalyst. Say it again, slowly.",
        },
        {
          id: "klaudia:job-title:opt-2",
          topicId: "klaudia:job-title",
          text: "Who invented your job title?",
        },
        {
          id: "klaudia:job-title:opt-3",
          topicId: "klaudia:job-title",
          text: "What did you do before this?",
        },
        {
          id: "klaudia:job-title:opt-4",
          topicId: "klaudia:job-title",
          text: "Does your manager know what you do?",
        },
        {
          id: "klaudia:job-title:opt-5",
          topicId: "klaudia:job-title",
          text: "What does a normal day look like for you?",
        },
        {
          id: "klaudia:job-title:opt-6",
          topicId: "klaudia:job-title",
          text: "Could a robot do your job?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:job-title:rep-1",
          text: "It means I catalyze innovation, senior-ly. I have never catalyzed anything on purpose, but I once replied-all at exactly the right moment and two departments merged. Since then nobody has asked me to define it. Define it and it becomes a job description. Job descriptions can be audited.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:job-title:rep-2",
          text: "I did. That is the secret nobody tells you: you invent the title, print the business cards, and wait for reality to catch up. It took eleven months. The cards were laminated. Lamination is a commitment the universe respects.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:job-title:rep-3",
          text: "Recruiting, briefly, until I realized the candidates were more interesting than the jobs. Then a six-month spell as a 'digital nomad', which is a word for 'laptop at a beach with bad wifi'. The content from that era still performs. Suffering scales.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:job-title:rep-4",
          text: "Zosia introduced me at the all-hands as 'our Instagram'. I have never corrected her. Correcting her means defining the role, and undefined roles cannot be cut. Ask Pawel what happens when your role has three bullets. His backup script has one.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:job-title:rep-5",
          text: "Morning: engagement. Midday: a meeting about content, which is content. Afternoon: content about the meeting. Evening: I draft tomorrow's authenticity. It is authentic because I scheduled it. The calendar does not lie. That is what makes it real.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:job-title:rep-6",
          text: "A robot does half of it already. The captions, the hashtags, the scheduling. What it cannot do is MEAN it. The camera can see effort. Robots do not have bills, so they cannot look hungry. When they fix that, I pivot to coaching the robots.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "klaudia:coffee-emergency",
      label: "Iced latte emergency",
      periods: ["morning", "lunch"],
      optionCandidates: [
        {
          id: "klaudia:coffee-emergency:opt-1",
          topicId: "klaudia:coffee-emergency",
          text: "Why does filming need an iced latte?",
        },
        {
          id: "klaudia:coffee-emergency:opt-2",
          topicId: "klaudia:coffee-emergency",
          text: "The machine only makes hot coffee. Tragedy.",
        },
        {
          id: "klaudia:coffee-emergency:opt-3",
          topicId: "klaudia:coffee-emergency",
          text: "I will get you the latte. What is in it for me?",
        },
        {
          id: "klaudia:coffee-emergency:opt-4",
          topicId: "klaudia:coffee-emergency",
          text: "Can the coffee emergency wait until after standup?",
        },
        {
          id: "klaudia:coffee-emergency:opt-5",
          topicId: "klaudia:coffee-emergency",
          text: "Klaudia, decaf exists.",
        },
        {
          id: "klaudia:coffee-emergency:opt-6",
          topicId: "klaudia:coffee-emergency",
          text: "Should I be in the video too?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:coffee-emergency:rep-1",
          text: "The latte is not a prop, it is a CHARACTER. It says 'I am casual but thriving'. Hot coffee says 'deadline'. Iced latte says 'I have engineered my life'. The gap between those two mugs is my entire personal brand.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:coffee-emergency:rep-2",
          text: "Hot coffee. In content. In THIS economy of attention? Fine. We pivot: the video becomes 'the office gave me hot coffee and I made it work'. The comments will say 'queen of adaptability'. I will say you saved the shoot. We both win, mostly me.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:coffee-emergency:rep-3",
          text: "You hold the phone, you hand me the latte at 0:09, and afterwards you are my 'cofounder' for the caption. It is one word in one post and it does numbers. Welcome to the cap table, metaphorically.",
          relationshipHint: "pleased",
          offersTaskId: "klaudia:task-coffee-emergency",
        },
        {
          id: "klaudia:coffee-emergency:rep-4",
          text: "The light is PERFECT until ten, and then the window becomes an office. Standup is a meeting about meetings. I am filming a Renaissance. History does not wait for Zosia's blocker round, and neither does golden-hour lighting.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:coffee-emergency:rep-5",
          text: "Do not say the D-word near the content. Decaf is coffee-shaped disappointment. I tried it once in 2023 and the post got fourteen likes. FOURTEEN. I do not test things on the audience twice.",
          relationshipHint: "offended",
        },
        {
          id: "klaudia:coffee-emergency:rep-6",
          text: "YES. One shot, over my shoulder, out of focus. Out-of-focus colleagues mean 'real company'. Focus is for ads. You will be credited as 'team'. The comments will ask about our culture. Our culture is you, holding a latte, at 0:09. Do not be late.",
          relationshipHint: "delighted",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "klaudia:task-coffee-emergency",
      title: "Coffee emergency",
      description: "Acquire one iced latte, appear at 0:09 of Klaudia's morning-routine video, and accept the title of cofounder in the caption. The cap table is metaphorical. The latte is not.",
      flagToSet: "klaudia-rebranded-you",
      rewardHint: "+reach, allegedly",
    },
  ],
};

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
    {
      id: "klaudia:personal-life",
      label: "How much of you is content",
      optionCandidates: [
        {
          id: "klaudia:personal-life:opt-1",
          topicId: "klaudia:personal-life",
          text: "Is any part of your life off camera?",
        },
        {
          id: "klaudia:personal-life:opt-2",
          topicId: "klaudia:personal-life",
          text: "Your Sunday hike — was that staged?",
        },
        {
          id: "klaudia:personal-life:opt-3",
          topicId: "klaudia:personal-life",
          text: "Do you ever just experience things?",
        },
        {
          id: "klaudia:personal-life:opt-4",
          topicId: "klaudia:personal-life",
          text: "What does your family think of the content?",
        },
        {
          id: "klaudia:personal-life:opt-5",
          topicId: "klaudia:personal-life",
          text: "You looked tired in the Thursday story.",
        },
        {
          id: "klaudia:personal-life:opt-6",
          topicId: "klaudia:personal-life",
          text: "If you stopped posting tomorrow, who are you?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:personal-life:rep-1",
          text: "There is a four-hour window every Sunday where the phone stays in the bag. I call it my off-grid hours. My most engaged post ever was the one announcing the off-grid hours, which taught me that even the boundary is content if you announce it. The second year, I did not announce it. Growth has a Silence setting.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:personal-life:rep-2",
          text: "The hike was real. The ENTHUSIASM was directed. I was alone on a mountain feeling genuinely small and insignificant, which is restorative, and then I took nine photos, deleted six, and shared a moment of manufactured solitude. The mountain did not mind. Mountains are above engagement, which is why I respect them.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:personal-life:rep-3",
          text: "Constantly. Experiencing is my raw material. The mistake people make is thinking the camera replaces the experience — it does not, it ARCHIVES it. I watched that sunset with both eyes, I promise you. One eye was also composing a caption. That is not less real. It is just real with a second channel.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:personal-life:rep-4",
          text: "My mother likes every post within four minutes, which is my real engagement metric — the algorithm can fake reach but it cannot fake a mother with her glasses on. My cousin asked for a shoutout for his plumbing business, I gave him one, and he now has more work than the entire regional competition. The channel is real. Respect the channel.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:personal-life:rep-5",
          text: "That was 'authentic exhaustion', posted at the exact minute the demographic scrolls in bed. Was I tired? Deeply. Was the tiredness usable? Also yes. Nothing is wasted in this economy, especially not a Tuesday. The comments said 'so relatable' and the follow-up post about my morning routine did numbers. The tiredness funded the routine.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:personal-life:rep-6",
          text: "Someone with excellent lighting instincts and a content calendar she would rewrite within a week, honestly. I have thought about this at 2am like everyone does, and the answer stopped scaring me: the persona is a tire, but the ROAD is mine. I built the road. The road is senior to the tire. That is the healthiest thing I have ever said on the record.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "klaudia:haters",
      label: "The comments section",
      optionCandidates: [
        {
          id: "klaudia:haters:opt-1",
          topicId: "klaudia:haters",
          text: "How do you deal with negative comments?",
        },
        {
          id: "klaudia:haters:opt-2",
          topicId: "klaudia:haters",
          text: "Someone called your content 'soulless'.",
        },
        {
          id: "klaudia:haters:opt-3",
          topicId: "klaudia:haters",
          text: "Do you ever reply to the trolls?",
        },
        {
          id: "klaudia:haters:opt-4",
          topicId: "klaudia:haters",
          text: "Your most-liked comment is an insult.",
        },
        {
          id: "klaudia:haters:opt-5",
          topicId: "klaudia:haters",
          text: "A client quoted a hate thread in a meeting.",
        },
        {
          id: "klaudia:haters:opt-6",
          topicId: "klaudia:haters",
          text: "Does it ever actually hurt?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:haters:rep-1",
          text: "There is a taxonomy. 'Cringe' means you were seen. 'Sellout' means you were seen earning. 'Who is this?' means the reach is working. Actual criticism — the kind with punctuation and a point — I screenshot and keep in a folder called 'free consulting'. The folder has paid for itself twice. Hate is just engagement wearing a bad outfit.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:haters:rep-2",
          text: "Soulless. In THIS attention economy. A soul is overhead — it wants breaks, privacy, and to not be A/B tested. I run a lean operation. But he wrote 'soulless' at 7am, meaning my content was the first thing he engaged with that day, and that is reach you cannot buy. I screen-recorded it. It is in my media kit.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:haters:rep-3",
          text: "Once. Never again. I replied to a troll with a calm paragraph and he screenshot it, framed it, and it became HIS content. That day I learned: the reply is a donation. Now I do silence — the algorithm cannot argue with silence, and silence does not need copy approval. The troll rage-posts into the void and the void does not tag me.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:haters:rep-4",
          text: "'This is everything wrong with LinkedIn' — four hundred likes, and it is pinned under a post of mine that got eleven thousand. Do the math on attention: my insult-to-impression ratio is elite. Hate comments are backlinks. I have suggested, gently, to the marketing textbooks of the future, that they chapter it.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:haters:rep-5",
          text: "Which one, the thread or the meme? Both performed. The client quoted it while renewing, which proves the deepest law of this industry: people do business with what they cannot stop discussing. I thanked them for the reach and the meeting moved on. The thread is now 'market feedback' in the deck. Nothing is wasted. Nothing.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:haters:rep-6",
          text: "The honest answer is one particular comment, 2023, about my voice. It was precise, it was fair, and it was from someone I went to school with, which is cheating. I took the note, adjusted the pacing, and the retention graph thanked me. The ones that hurt are the ones that are right, and I monetize those fastest. That is the whole coping strategy.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "klaudia:brand-course",
      label: "Teaching personal branding",
      optionCandidates: [
        {
          id: "klaudia:brand-course:opt-1",
          topicId: "klaudia:brand-course",
          text: "Could you teach personal branding? As a course.",
        },
        {
          id: "klaudia:brand-course:opt-2",
          topicId: "klaudia:brand-course",
          text: "What would lesson one even be?",
        },
        {
          id: "klaudia:brand-course:opt-3",
          topicId: "klaudia:brand-course",
          text: "Bartek says teaching is invoicing attention.",
        },
        {
          id: "klaudia:brand-course:opt-4",
          topicId: "klaudia:brand-course",
          text: "Could the course be filmed in this office?",
        },
        {
          id: "klaudia:brand-course:opt-5",
          topicId: "klaudia:brand-course",
          text: "Would Grazyna approve the course budget?",
        },
        {
          id: "klaudia:brand-course:opt-6",
          topicId: "klaudia:brand-course",
          text: "Who is the course actually for?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:brand-course:rep-1",
          text: "I have been workshopping the title for a year: 'Be Perceived'. Four modules, one workbook, and a graduation photo with ring lighting. Teaching the brand is the natural endgame of having one — the brand becomes the curriculum, and the curriculum becomes the content, and at that point the funnel eats its own tail, profitably.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:brand-course:rep-2",
          text: "Lesson one is 'audit yourself': google your own name in a private window and describe what a stranger would hire. Everyone is horrified. Horror is the hook. Lesson two fixes the horror, lesson three monetizes it, and lesson four is just me reading lesson one reviews. It is a perfect loop. I have the slides. Nine of them.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:brand-course:rep-3",
          text: "Bartek invoices attention, I COMPOUND it. He gets paid once; a recorded lesson gets paid while I sleep, which is the only honest passive income in this building — Pawel's backup claims to be passive and it hums anxiously all night. The course is my backup script: run once, pays forever, and I actually know what it does.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:brand-course:rep-4",
          text: "Filmed here, with the glass wall behind me — 'authentic workplace', the algorithm can smell a studio. Bruce in the background of one module, Burek in the intro if his agent agrees, and the printer NOT at all, because that monument has a licensing aura I am not equipped to negotiate. Zosia will want a values poster in shot. There will be negotiations.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:brand-course:rep-5",
          text: "Grazyna approves anything with 'recurring revenue' in the description — she said the words 'annuity with thumbnails' and I nearly fainted from respect. The budget line will read 'knowledge products', which is true, and the course will pay for the gear, which pays for the course. She called it a closed loop. She meant it as a compliment.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "stats:high-credibility"],
        },
        {
          id: "klaudia:brand-course:rep-6",
          text: "For the person who is excellent and invisible — this office employs eleven of them, starting with whoever is reading the wiki. The course is not for people like me; we are the demo. It is for the quietly competent who flinch at the word 'content'. I will teach them to be seen WITHOUT becoming me. One of me per office is plenty. Ask anyone.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "klaudia:gear",
      label: "The gear",
      optionCandidates: [
        {
          id: "klaudia:gear:opt-1",
          topicId: "klaudia:gear",
          text: "Is the ring light really that important?",
        },
        {
          id: "klaudia:gear:opt-2",
          topicId: "klaudia:gear",
          text: "Why do you need three microphones?",
        },
        {
          id: "klaudia:gear:opt-3",
          topicId: "klaudia:gear",
          text: "Your tripod is older than Tomek's career.",
        },
        {
          id: "klaudia:gear:opt-4",
          topicId: "klaudia:gear",
          text: "Grazyna flagged your gear on expenses.",
        },
        {
          id: "klaudia:gear:opt-5",
          topicId: "klaudia:gear",
          text: "Could the office pool money for a proper camera?",
        },
        {
          id: "klaudia:gear:opt-6",
          topicId: "klaudia:gear",
          text: "What gear would you take to a desert island?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:gear:rep-1",
          text: "The ring light is not equipment, it is a MENTOR. It flattens flaws, softens Tuesdays, and makes every face look like it sleeps eight hours a night. There are people in this office whose entire opinion of me was formed inside that halo, and I protect it the way Marek protects monitor six. We all have a monitor six. Mine glows.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:gear:rep-2",
          text: "One for the voice, one for the room, one for the car — the car mic has captured my best content, because the car is where the honesty lives. Everyone has a car mic, they just have not admitted it yet. Meetings about it happen at red lights. The red lights are my studio. Traffic is my producer.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:gear:rep-3",
          text: "That tripod has survived four phones, one flood-adjacent scare, and being sat on by Burek, who walked away unimpressed and slightly higher. New gear is a gamble. Old gear is a relationship. When it finally dies I will bury it in the storage room next to the banners, and the funeral content will do numbers.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:gear:rep-4",
          text: "She flagged it, I reclassified it, we met in the middle: the light is 'workplace lighting with a side hustle', the mics are 'client communication infrastructure', and the car mic is 'mobile office equipment'. She approved all three and called my expense descriptions 'the best fiction I audit'. From her that is a grant. It is framed. Mentally.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:gear:rep-5",
          text: "Pool money means shared custody, and shared custody means booking conflicts with the exact people who do not respect calendars. No. I will keep buying my own gear, and the office may RENT it from me at a rate Grazyna and I will describe as 'friendly'. This is how equipment becomes an annuity. I told you the course would fund itself.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:gear:rep-6",
          text: "The ring light and the phone, because the desert island content writes itself: 'day one of unplugging' — posted, obviously, once I get back. That is the joke AND the strategy. The gear is never the story. The gear just holds the story still long enough to be caught. Everything else is boxes and receipts, and Grazyna handles the receipts.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "klaudia:filming-rules",
      label: "The office filming rules",
      optionCandidates: [
        {
          id: "klaudia:filming-rules:opt-1",
          topicId: "klaudia:filming-rules",
          text: "Can you film me without asking first?",
        },
        {
          id: "klaudia:filming-rules:opt-2",
          topicId: "klaudia:filming-rules",
          text: "Why is the kitchen the best filming location?",
        },
        {
          id: "klaudia:filming-rules:opt-3",
          topicId: "klaudia:filming-rules",
          text: "Janusz photobombed the b-roll again.",
        },
        {
          id: "klaudia:filming-rules:opt-4",
          topicId: "klaudia:filming-rules",
          text: "Dawid wants approval on every office shot.",
        },
        {
          id: "klaudia:filming-rules:opt-5",
          topicId: "klaudia:filming-rules",
          text: "The out-of-focus colleague trick — explain it.",
        },
        {
          id: "klaudia:filming-rules:opt-6",
          topicId: "klaudia:filming-rules",
          text: "Is there a rule about filming the printer?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:filming-rules:rep-1",
          text: "Asking ruins the authenticity, and also the answer would be no, and also you would blink. The rules are: I never film faces without a release, I never film screens, and out-of-focus backs of heads are communal property. You have been an out-of-focus head in four posts. The comments called our office 'vibrant'. You are welcome.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:filming-rules:rep-2",
          text: "The kitchen has the only honest light in the building — the glass wall gives the morning side six usable minutes and the kitchen hoards five of them. Plus a kitchen says 'we are a real company with real humans' without a single word of copy. Every viral office video is secretly a kitchen video. I have spreadsheets.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:filming-rules:rep-3",
          text: "That is not a photobomb, that is a WALKTHROUGH — the man exists on routes and the routes are fixed. Honestly, the Janusz cameo outperforms my talking head by forty percent, so now I schedule around him. The internet has decided he is 'the real CEO'. I cannot argue. He has the keys, the robots, and the consent of the dog.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:filming-rules:rep-4",
          text: "Dawid's approval is a watermark with eyebrows. He reviews shots for 'graph energy', by which he means the angle where the company looks like it is ascending. I have learned to shoot everything pointing slightly upward. Nobody has noticed. Everyone has felt it. That is the difference between art and content, and content pays for the art.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:filming-rules:rep-5",
          text: "Focus is for advertisements. An out-of-focus colleague means 'real company, real work, real Tuesday' — the viewer's brain fills in the rest and what the brain fills in is always flattering. You were blurry in the latte post and a recruiter DMed you. Blur is a career strategy. I am planning a masterclass. The seats will be out of focus.",
          relationshipHint: "pleased",
          tags: ["quest:klaudia-rebranded-you", "relationship:warm"],
        },
        {
          id: "klaudia:filming-rules:rep-6",
          text: "The printer is not filmed for the same reason the server rack is not filmed: some infrastructure is load-bearing and attention is a load. Marek made me sign nothing, but he stood near me for the entire afternoon of the one time I tried, and the footage was unusable. His disapproval has a frequency. It interferes with the mic.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "klaudia:trends",
      label: "Trend chasing",
      optionCandidates: [
        {
          id: "klaudia:trends:opt-1",
          topicId: "klaudia:trends",
          text: "How fast do you have to jump on a trend?",
        },
        {
          id: "klaudia:trends:opt-2",
          topicId: "klaudia:trends",
          text: "Remember when everyone posted that AI office trend?",
        },
        {
          id: "klaudia:trends:opt-3",
          topicId: "klaudia:trends",
          text: "Quiet quitting — did you ride that one?",
        },
        {
          id: "klaudia:trends:opt-4",
          topicId: "klaudia:trends",
          text: "Maciek wants our content to be 'AI-first'.",
        },
        {
          id: "klaudia:trends:opt-5",
          topicId: "klaudia:trends",
          text: "Which trend are you embarrassed you missed?",
        },
        {
          id: "klaudia:trends:opt-6",
          topicId: "klaudia:trends",
          text: "How do you know a trend is dead?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:trends:rep-1",
          text: "Within forty-eight hours or you are not riding the trend, you are its historian. The first wave gets the reach, the second wave gets the mocking think-pieces, and the third wave gets cited in university courses. I have done all three with the same dance and only regretted one of them professionally.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:trends:rep-2",
          text: "The one where everyone's office turned into an AI-generated paradise? I did it, it did numbers, and three people asked if we were relocating. We are next to a parking lot with one heroic tree. The comment section believed in us more than the windows do. That is the whole job: believing harder than the evidence.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:trends:rep-3",
          text: "I posted 'quiet quitting is just loud boundaries' and the post outperformed my product announcements, which says everything about this economy. The trend was already dying when I posted, which is the sweet spot — the discourse is hungry and the contrarians have not arrived. Timing a trend is half astrology and half reading the replies first.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:trends:rep-4",
          text: "Maciek says AI-first like it is a destination. For content it is a HAT — I wear the hat, the feed wears the hat, and the actual work remains humans with ring lights. I told him the algorithm cannot tell what first means, only what fast means. He wrote that on the whiteboard. The whiteboard now outranks both of us.",
          relationshipHint: "neutral",
          tags: ["quest:maciek-briefed-you"],
        },
        {
          id: "klaudia:trends:rep-5",
          text: "The ice bucket era. I thought it was a plumbing trend — I was new, the office had real plumbing problems, and the ambiguity was reasonable. By the time I understood, the moment had passed and taken my reach with it. I keep a screenshot of my 'our pipes are fine' post as a reminder. The pipes were fine. The reach was not.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:trends:rep-6",
          text: "When the ACCOUNTANTS arrive. First come creators, then brands, then your bank's social team does one — and the moment the bank posts, the trend is a pension product. There is a two-day window between cool and deductible. I have timed it across nine trends and the bank has never once been early. God bless the bank. It is my closing bell.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:networking",
      label: "The DM economy",
      optionCandidates: [
        {
          id: "klaudia:networking:opt-1",
          topicId: "klaudia:networking",
          text: "How do you answer a cold DM from a stranger?",
        },
        {
          id: "klaudia:networking:opt-2",
          topicId: "klaudia:networking",
          text: "Kasia says networking is a census. You say?",
        },
        {
          id: "klaudia:networking:opt-3",
          topicId: "klaudia:networking",
          text: "I have four hundred contacts and zero jobs.",
        },
        {
          id: "klaudia:networking:opt-4",
          topicId: "klaudia:networking",
          text: "Is a conference just a DM with a venue?",
        },
        {
          id: "klaudia:networking:opt-5",
          topicId: "klaudia:networking",
          text: "Someone offered to collab. It feels scammy.",
        },
        {
          id: "klaudia:networking:opt-6",
          topicId: "klaudia:networking",
          text: "What is your connection request acceptance rate?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:networking:rep-1",
          text: "Three tiers. If they compliment a specific post, they read, and readers get replies. If they say 'love your content', they are a template, and templates get a template. If they pitch in the first message, they go in the folder marked 'later', which is where ambition goes to be appreciated from a distance.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:networking:rep-2",
          text: "Kasia counts people. I PERCEIVE them. The census tells you how many; the feed tells you who is about to move jobs, divorce, or rebrand, because people announce everything now — grief, gym, career. She has the spreadsheet, I have the timeline. Together we are an intelligence agency with lanyards, and neither of us has ever needed a warrant.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:networking:rep-3",
          text: "Contacts are not network. Network is contacts who would take your call at 11pm, and you get those by being useful in public. Post what you know, help one person per week with no ask, and in six months your inbox is a warm room. Four hundred cold contacts is a phonebook. Phonebooks do not get hired. People do.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:networking:rep-4",
          text: "A conference is a DM with a venue, a bar tab, and witnesses. It is the only place where following someone is legal in person. I work the room in circles of nine — small enough to be heard, large enough to escape politely. And the badge is a conversation-starting device that no cold message has ever matched. Wear it high. Print your real name.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:networking:rep-5",
          text: "Scammy collabs have a smell: they want your audience, not your work. The real ones ask about YOUR posting schedule before mentioning theirs. Test them: ask for one specific edit they would make to your last post. Scammers compliment. Professionals critique. I have closed more real partnerships from critiques than from love letters.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:networking:rep-6",
          text: "Sixty-two percent, and I can tell you the exact variable: your face in the profile picture. Not attractive — PRESENT. Half the rejections are people declining accounts with logos or cars instead of faces. The audience does not follow brands, it follows humans, and the connection request is the smallest possible audition. Show up. Be a face.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "klaudia:burnout",
      label: "Being perceived",
      optionCandidates: [
        {
          id: "klaudia:burnout:opt-1",
          topicId: "klaudia:burnout",
          text: "Are you ever exhausted by being perceived?",
        },
        {
          id: "klaudia:burnout:opt-2",
          topicId: "klaudia:burnout",
          text: "What do you do when the numbers dip?",
        },
        {
          id: "klaudia:burnout:opt-3",
          topicId: "klaudia:burnout",
          text: "Have you ever deleted a post?",
        },
        {
          id: "klaudia:burnout:opt-4",
          topicId: "klaudia:burnout",
          text: "Do you have an actual best friend here?",
        },
        {
          id: "klaudia:burnout:opt-5",
          topicId: "klaudia:burnout",
          text: "What happens when you take real holidays?",
        },
        {
          id: "klaudia:burnout:opt-6",
          topicId: "klaudia:burnout",
          text: "Would you do all this again?",
        },
      ],
      replyCandidates: [
        {
          id: "klaudia:burnout:rep-1",
          text: "Perception is a full-time audience and audiences do not respect the evening. I have a rule now: the phone sleeps in the kitchen, which is far enough to require intention and close enough to feel safe, like a fire extinguisher. The burnout is real but it is SCHEDULED, which makes it a sport. Athletes get tired. Nobody panics at athletes.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:burnout:rep-2",
          text: "First I check if the dip is me or the algorithm — the algorithm dips everyone twice a quarter like a tide with a grudge. If it is the tide, I post through it with archived content and call it 'consistency'. If it is me, I post the authentic exhaustion. Both recover. One of them is even true, and I no longer need to tell you which.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:burnout:rep-3",
          text: "Twice. Once for a typo that changed the meaning of a hashtag into something legal had to see, and once for a post that was honest at 9am and unrecognizable by noon. Deletion is the one superpower the timeline does not forgive — the screenshots live forever. The typo is why legal loves me now. Oddly mutual.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:burnout:rep-4",
          text: "Ania. We speak fluent funnel to each other and nothing else, which is either friendship or a very advanced working relationship with snacks. We once spent a full lunch planning a campaign for a brand that does not exist, and I have never felt more understood. Everyone needs one person with whom the metaphors are not performance.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:burnout:rep-5",
          text: "I schedule eleven posts, pin three stories, and vanish to my aunt's village where there is one bar of signal and zero bars of interest. The queue performs fine without me, which was humiliating the first year and liberating ever since. The brand survives my absence. I come back tanned and the graph does not even dip. We are colleagues, the graph and I. Not friends.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:burnout:rep-6",
          text: "With better lighting and an earlier therapist, yes. I turned being seen into a trade, and the trade has a pension, a ring light, and strangers who tell me my content helped them ask for a raise. The last one makes the 2am doubt negotiable. Perception costs. But it pays in both directions, and the invoice always balances. Eventually. On camera.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "klaudia:aesthetic",
      label: "The aesthetic philosophy",
      optionCandidates: [
        { id: "klaudia:aesthetic:opt-1", topicId: "klaudia:aesthetic", text: "Your aesthetic is 'thriving chaos'. Decode that." },
        { id: "klaudia:aesthetic:opt-2", topicId: "klaudia:aesthetic", text: "Beige or bold? The feed says beige. The person says?" },
        { id: "klaudia:aesthetic:opt-3", topicId: "klaudia:aesthetic", text: "Can aesthetic be learned or is it vibes?" },
        { id: "klaudia:aesthetic:opt-4", topicId: "klaudia:aesthetic", text: "The aesthetic changed in March. Rebrand or mood?" },
        { id: "klaudia:aesthetic:opt-5", topicId: "klaudia:aesthetic", text: "Do filters count as aesthetic or makeup?" },
        { id: "klaudia:aesthetic:opt-6", topicId: "klaudia:aesthetic", text: "Your aesthetic in one object. Go." },
      ],
      replyCandidates: [
        {
          id: "klaudia:aesthetic:rep-1",
          text: "'Thriving chaos' means: the calendar is a grid and the caption is a hurricane. Structure visible, personality audible. The grid is for the algorithm's comfort and the chaos is for the human's. Order attracts. Chaos retains. My aesthetic is the handshake between the two, and the handshake is scheduled.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:aesthetic:rep-2",
          text: "The feed is beige because beige is a BACKGROUND, and backgrounds let the subject scream. The person screams in pastel. It is the same trick museums use — quiet walls, loud art. Beige is not a personality. Beige is a stage. The stage is beige so the performance can be neon.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:aesthetic:rep-3",
          text: "Learned, taught, and drilled — aesthetic is a decision repeated until it looks like a personality. Mine took nine months and one notebook: every post that felt like me got a sticker. After sixty stickers, the pattern confessed. Aesthetic is a pattern you caught early and agreed to protect.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:aesthetic:rep-4",
          text: "Both. The mood shifted and the brand followed, which is either a rebrand or a diary entry — the difference is whether the grid matches after. In March the grid did not match for six days and the engagement DIPPED, which proves the audience was following the consistency, not me. We recovered together.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:aesthetic:rep-5",
          text: "Filters are makeup that ships in software, and I say that with respect — both are consent-based enhancement of reality. My line: filters that fix light are honest, filters that fix identity are fiction. The light is logistics. The identity is the product. I fix the logistics and ship the product as-is. Mostly.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:aesthetic:rep-6",
          text: "Not the ring light — everyone says the ring light. One object: the annotated content calendar, coffee-stained, corner-folded, with one week where every post is crossed out and replaced by the word 'LIVE'. The calendar is the aesthetic. Everything else is output. The source code is always a calendar with regrets.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:hashtags",
      label: "Hashtag theology",
      optionCandidates: [
        { id: "klaudia:hashtags:opt-1", topicId: "klaudia:hashtags", text: "Your hashtag sets are copy-pasted. Consistency?" },
        { id: "klaudia:hashtags:opt-2", topicId: "klaudia:hashtags", text: "How many hashtags before it looks desperate?" },
        { id: "klaudia:hashtags:opt-3", topicId: "klaudia:hashtags", text: "The niche hashtag with 40 posts. Goldmine?" },
        { id: "klaudia:hashtags:opt-4", topicId: "klaudia:hashtags", text: "Do hashtags even work anymore? Honestly." },
        { id: "klaudia:hashtags:opt-5", topicId: "klaudia:hashtags", text: "You invented a hashtag. It trended locally." },
        { id: "klaudia:hashtags:opt-6", topicId: "klaudia:hashtags", text: "Banned hashtags — real or urban legend?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:hashtags:rep-1",
          text: "Copy-paste is CONSISTENCY, and consistency is the uniform the feed recognizes. My sets are tested: three rotating, one signature, updated quarterly like a passport photo. The copy-paste is not laziness. It is branding wearing a clipboard. The audience learns the uniform. The uniform gets followed.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:hashtags:rep-2",
          text: "Desperate starts at twelve, dies at twenty, and resurrects as 'ironic' at thirty. The sweet spot is five: three for the niche, one for the community, one wildcard for the algorithm's amusement. The wildcard is where discovery lives. Wildcards have carried posts that the strategy had given up on.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:hashtags:rep-3",
          text: "Forty posts is a VILLAGE, and villages have the highest engagement per capita on the platform. Big hashtags are cities — great reach, no eye contact. The village knows your name, comments in full sentences, and buys things. I grow villages. Cities can be visited. Villages are lived in.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:hashtags:rep-4",
          text: "They work less and cost less — which means the return on the SAME effort went up. Hashtags are filing, not reach, but the reach they do give is the kind that STAYS: search traffic, the archive, the researcher at midnight. Every hashtag is a tiny permanent signpost. Signs are cheap. I plant them everywhere the niche lives.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:hashtags:rep-5",
          text: "It trended in two cities and one conference, and the flex is not the trend — the flex is that it was ACCIDENTAL. I coined it in a caption about printer grief and the office adopted it. Invented virality is a craft. Accidental virality is a blessing. Credit for the craft, prayers for the blessing. Both shipped.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:hashtags:rep-6",
          text: "Real, and undocumented, which is the algorithm's sense of humor — the banned list is not published, it is DISCOVERED, by people like me, at the cost of reach. My notebook has seventeen discovered bans. The funniest: a perfectly normal word the platform's filter confused with something spicy. The list is folklore. The folklore is accurate.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "klaudia:brand-deals",
      label: "The brand deals",
      optionCandidates: [
        { id: "klaudia:brand-deals:opt-1", topicId: "klaudia:brand-deals", text: "A brand offered you a deal. First questions?" },
        { id: "klaudia:brand-deals:opt-2", topicId: "klaudia:brand-deals", text: "You turned down a big brand. The story?" },
        { id: "klaudia:brand-deals:opt-3", topicId: "klaudia:brand-deals", text: "How do you price a brand deal? Formula?" },
        { id: "klaudia:brand-deals:opt-4", topicId: "klaudia:brand-deals", text: "The brand wants script approval. Give?" },
        { id: "klaudia:brand-deals:opt-5", topicId: "klaudia:brand-deals", text: "Your sponsored posts get flagged. Balance?" },
        { id: "klaudia:brand-deals:opt-6", topicId: "klaudia:brand-deals", text: "What makes a brand deal feel honest?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:brand-deals:rep-1",
          text: "Three, always: who owns the product, who owns the AUDIENCE, and what happens if it flops. The first question is legal, the second is everything, and the third is the personality test. A brand that has planned for the flop is a brand that has done this before. Brands that have done this before pay on time.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:brand-deals:rep-2",
          text: "The supplement one, 2023 — the product was fine, the CLAIMS were fiction, and fiction with a checkout link is not content, it is a liability with my face on it. I sent back the contract with one line: 'happy to post, the claims need to survive a fact-check'. They walked. My feed slept well. The audience never knew. That is the point.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:brand-deals:rep-3",
          text: "Audience times trust times effort. The formula lives in my notes app: my rate is not for the POST, it is for the years of credibility the post borrows. Brands rent the audience. The audience is the asset. Never let the rent undercut the mortgage. I have watched people do it. The feed recovered. The trust did not.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:brand-deals:rep-4",
          text: "Two rounds of notes, no rewrites, and my voice has veto — script approval is fine until the script stops sounding like me, and then the post is an ad wearing a costume, and the audience SMELLS costumes. My compromise: they write the facts, I write the sentences. Facts are theirs. Sentences are mine. Both survive.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:brand-deals:rep-5",
          text: "Flagged means disclosed, and disclosed means CLEAN — the flag is not a scar, it is a license plate. The posts perform eight percent lower and convert four times higher, which is the trade every honest creator signs. The eight percent was never my audience. It was the audience that enjoys being lied to. They unsubscribe themselves.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:brand-deals:rep-6",
          text: "When the brand's product is already in the content and the payment changes the ORDER, not the opinion. My test: would this post exist without the check? If yes, the check is a tip and the post is honest. If no, the check is the post, and the audience can smell the tip-to-post ratio. Honest deals are sponsored truths. Rare. Worth the search.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "klaudia:unfollows",
      label: "The unfollow purges",
      optionCandidates: [
        { id: "klaudia:unfollows:opt-1", topicId: "klaudia:unfollows", text: "You unfollowed 300 accounts. Purge logic?" },
        { id: "klaudia:unfollows:opt-2", topicId: "klaudia:unfollows", text: "Do you notice when someone unfollows you?" },
        { id: "klaudia:unfollows:opt-3", topicId: "klaudia:unfollows", text: "The mutual who never engages. Keep out of pity?" },
        { id: "klaudia:unfollows:opt-4", topicId: "klaudia:unfollows", text: "Unfollow purges — do audiences notice?" },
        { id: "klaudia:unfollows:opt-5", topicId: "klaudia:unfollows", text: "Is unfollowing a person ever personal?" },
        { id: "klaudia:unfollows:opt-6", topicId: "klaudia:unfollows", text: "Your rule for following brands back?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:unfollows:rep-1",
          text: "Twice a year, surgical: dead accounts, changed niches, and the ones I follow out of guilt. The purge is dental hygiene for the feed — the algorithm reads my following list like a diet plan, and three hundred stale accounts were feeding it junk. The feed got sharper. The recommendations got scary-good. The purge paid for itself in a week.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:unfollows:rep-2",
          text: "The numbers move and I do not chase them — unfollows are the audience breathing. What I watch is WHO: if a whole niche leaves in one week, I posted something wrong. If one person leaves every day, they were never in the niche. The exodus is data. The single departure is noise. Data gets answered. Noise gets ignored.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:unfollows:rep-3",
          text: "Pity is not a content strategy. The mutual who never engages is a statue in the garden — decorative, harmless, and taking a watering slot from something alive. I keep a handful of statues for history. The rest get the purge. Friendship lives in messages now. The follow button is a filing system.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:unfollows:rep-4",
          text: "They notice, they panic, they copy it — purges are contagious in the best way. My last one spawned four copycat purges from mutuals and the whole network got cleaner. The audience that stays after a purge is the real audience, finally alone with its opinions. Engagement per follower jumped eleven percent. Math loves a purge.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:unfollows:rep-5",
          text: "Always — and pretending otherwise is the lie every creator tells. The unfollow that hurt was not a number, it was a NAME, 2022, someone whose opinion I valued and whose feed I dominated by accident. I unfollowed back a month later, in the mutual amputation everyone pretends not to do. The feed healed. Adults adapt.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:unfollows:rep-6",
          text: "I follow brands like I audit them: with a test account, for a month, before the main feed meets them. The main following list is a RECOMMENDATION to my audience — every brand I follow is a brand I am vouching for. That is why the list is short. Vouching is expensive. I budget it like time. Exactly like time.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "klaudia:morning-routine",
      label: "The morning routine genre",
      optionCandidates: [
        { id: "klaudia:morning-routine:opt-1", topicId: "klaudia:morning-routine", text: "Your 5am routine video. Staged, right?" },
        { id: "klaudia:morning-routine:opt-2", topicId: "klaudia:morning-routine", text: "Why does the internet love morning routines?" },
        { id: "klaudia:morning-routine:opt-3", topicId: "klaudia:morning-routine", text: "Your routine has eleven steps. Real?" },
        { id: "klaudia:morning-routine:opt-4", topicId: "klaudia:morning-routine", text: "The routine breaks on holidays. Content?" },
        { id: "klaudia:morning-routine:opt-5", topicId: "klaudia:morning-routine", text: "Should I film my morning routine? You would say no." },
        { id: "klaudia:morning-routine:opt-6", topicId: "klaudia:morning-routine", text: "The most honest morning routine ever posted?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:morning-routine:rep-1",
          text: "Staged like a cooking show — the meal is real, the kitchen is cleaned between takes, and the audience knows both facts on some level. My 5am is real twice a week and filmed once. The other mornings are mine. The video says 'a morning', not 'the morning'. The grammar is honest. The audience reads the grammar. Mostly.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:morning-routine:rep-2",
          text: "Because a morning routine is a magic spell against chaos — watch someone stack habits and you feel your own life could be stacked. The genre sells the feeling of control by the hour. I sell it knowing it is a feeling. My routine works because I built it for me. The video works because everyone wants a spell. Both facts coexist.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:morning-routine:rep-3",
          text: "Nine real, two aspirational. The cold shower is aspirational — it appears in every video and happens in no month. The rest is load-bearing: water, light, phone in the other room, one page of the notebook. The aspirational steps are the genre's tax. Every creator pays it. I pay it knowingly.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:morning-routine:rep-4",
          text: "The break IS the content — 'my routine collapsed on holiday and here is what came back first' outperformed the routine itself by forty percent. Audiences do not love routines. They love RECOVERY. The routine is the setup. The collapse is the plot. I film the plot. The plot is the only honest genre left.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:morning-routine:rep-5",
          text: "I would say film the AUDIT first: one week of your real morning, unposted. If the real morning has anything worth teaching, the content writes itself and survives the algorithm. If it does not, fix the morning, not the footage. Filming a broken morning is documenting the problem in high definition.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:morning-routine:rep-6",
          text: "The one that got twelve views: a woman showing her actual alarm, her actual snooze, and her actual instant coffee, captioned 'this is the routine, there is no secret'. The comments were ferocious with love. Honesty is a niche audience and a permanent one. I think about that video weekly. Twelve views. The math is hard. The math is correct.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "klaudia:catchphrases",
      label: "The catchphrase inventory",
      optionCandidates: [
        { id: "klaudia:catchphrases:opt-1", topicId: "klaudia:catchphrases", text: "The 'so true' comment — origin story?" },
        { id: "klaudia:catchphrases:opt-2", topicId: "klaudia:catchphrases", text: "You say 'thriving' forty times a week. Self-aware?" },
        { id: "klaudia:catchphrases:opt-3", topicId: "klaudia:catchphrases", text: "Catchphrases — brand asset or verbal tic?" },
        { id: "klaudia:catchphrases:opt-4", topicId: "klaudia:catchphrases", text: "The office adopted one of your phrases. Which?" },
        { id: "klaudia:catchphrases:opt-5", topicId: "klaudia:catchphrases", text: "Can you retire a catchphrase on purpose?" },
        { id: "klaudia:catchphrases:opt-6", topicId: "klaudia:catchphrases", text: "Your catchphrase in a fight. Which one?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:catchphrases:rep-1",
          text: "Origin: 2021, a comment I left in four seconds on a post about printer grief, and it outperformed my whole week. 'So true' is the cheapest, warmest, most versatile unit of engagement in the language — it agrees without committing, supports without reading, and takes three characters. The comment section's folded twenty.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:catchphrases:rep-2",
          text: "Self-aware is the ENGINE. I say thriving the way other people say 'fine' — as a REPORT, not a fact. The audience knows the report is aspirational. The report is the bit. 'Thriving' is a status update from someone determined to file a good one. The performance is the honesty. It is thriving, obviously.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:catchphrases:rep-3",
          text: "Both, and the ledger matters — a catchphrase is a brand asset while it is FRESH and a tic the day after the audience notices it first. I audit mine quarterly. 'So true' passed. 'Manifesting' got retired with honors. The tic phase is the retirement party. You leave before the audience leaves. Timing is the craft.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:catchphrases:rep-4",
          text: "'Perceived', as in 'I feel perceived' — Marek said it in a standup, the office adopted it, and now the dog gets described as perceived. It escaped the feed and became OFFICE language. That is the highest achievement a catchphrase has: it stopped being content and became culture. I have seventeen screenshots.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:catchphrases:rep-5",
          text: "Yes, with a funeral — the retirement post, where the phrase is acknowledged, thanked, and never used again in a caption. The audience attends the funeral, mourns for one scroll, and adopts the successor by Friday. Catchphrases are mayflies. You do not ban them. You schedule them. The schedule is the brand.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:catchphrases:rep-6",
          text: "The same, at full volume: 'SO TRUE' — because a fight is a disagreement and agreement is my entire aesthetic. Disarm the argument by agreeing with the sentiment and defending the boundary. It works in comment sections. It has never been tested in a fight. In comment sections it remains undefeated. Statistically.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:editing-backlog",
      label: "The editing backlog",
      optionCandidates: [
        { id: "klaudia:editing-backlog:opt-1", topicId: "klaudia:editing-backlog", text: "Your editing backlog is 14 videos. Confession?" },
        { id: "klaudia:editing-backlog:opt-2", topicId: "klaudia:editing-backlog", text: "Raw footage pile or editing pile — which is worse?" },
        { id: "klaudia:editing-backlog:opt-3", topicId: "klaudia:editing-backlog", text: "The 2024 backlog you finally finished. Feelings?" },
        { id: "klaudia:editing-backlog:opt-4", topicId: "klaudia:editing-backlog", text: "Batch-edit or edit daily? The people want to know." },
        { id: "klaudia:editing-backlog:opt-5", topicId: "klaudia:editing-backlog", text: "Outsource editing? The control thing." },
        { id: "klaudia:editing-backlog:opt-6", topicId: "klaudia:editing-backlog", text: "The editing trick that saves you most?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:editing-backlog:rep-1",
          text: "Fourteen, and the backlog is not failure — it is a WAREHOUSE. Content ages in the vault and some of it ages WELL: the video I posted six months late hit harder because the trend circled back. The backlog is inventory. Inventory is only a problem in a panic. I do not panic. I publish. Slowly. On schedule.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:editing-backlog:rep-2",
          text: "Editing, always — raw footage is potential and potential does not guilt-trip. The editing pile is made of DECISIONS, and decisions are heavy. Every clip in that folder needs judgment, and judgment is the one resource the algorithm cannot schedule for me. The pile grows at the speed of my reluctance to choose.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:editing-backlog:rep-3",
          text: "Released, and it performed like a comeback tour — six videos in two weeks, the audience said 'she is BACK', and the algorithm agreed with the audience because agreement is the algorithm's whole personality. The lesson: a backlog released in a burst is a STRATEGY. The pile waits. It strikes. We are partners.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:editing-backlog:rep-4",
          text: "Batch, Sunday, two hours, four videos — editing daily is how editing becomes the whole life. The batch is a container: open the folder, close the folder, live the week. Batch editing is not about efficiency. It is about the boundary. The backlog respects containers. It does not respect daily intentions.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:editing-backlog:rep-5",
          text: "Outsourced the cuts, never the choices — an editor assembles what I decide. The control I refuse to surrender is WHICH fifteen seconds are the story. That choice is the voice. Assembly is labor and labor can be hired. Ania's cousin trained on my rhythm and the backlog went from fourteen to three. The voice is intact.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:editing-backlog:rep-6",
          text: "Edit the SOUND first — lay the audio, then drop the video on top of it. The ear forgives what the eye cannot, and a video that SOUNDS right survives any cut. I learned it from a podcast editor and it halved my editing time. Sound is the skeleton. The footage is the outfit. Dress the skeleton. Ship.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "klaudia:barter",
      label: "The barter economy",
      optionCandidates: [
        { id: "klaudia:barter:opt-1", topicId: "klaudia:barter", text: "You barter content for services. Define the trade." },
        { id: "klaudia:barter:opt-2", topicId: "klaudia:barter", text: "The dentist barter — cleaning for content. Fair?" },
        { id: "klaudia:barter:opt-3", topicId: "klaudia:barter", text: "When does barter exploit the creator? Red flags." },
        { id: "klaudia:barter:opt-4", topicId: "klaudia:barter", text: "Barter or cash — which do you prefer, honestly?" },
        { id: "klaudia:barter:opt-5", topicId: "klaudia:barter", text: "Grazyna has opinions on barter income. Threats?" },
        { id: "klaudia:barter:opt-6", topicId: "klaudia:barter", text: "The best barter you ever made. Story." },
      ],
      replyCandidates: [
        {
          id: "klaudia:barter:rep-1",
          text: "Simple version: I make their service visible, they make my life easier, and both sides invoice zero and gain more than zero. The rules: equal perceived value, a deadline, and one clause that says either side can walk after the first deliverable. Barter without exits is volunteering with better lighting.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:barter:rep-2",
          text: "Fair and then some — the cleaning was worth two hundred, the video did four thousand in bookings, and I renegotiated the SECOND deal at cash because the first one proved the value. Barter is a PILOT PROGRAM. The first trade is the demo. The demo exists to be priced. I have never left a demo at demo rates.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:barter:rep-3",
          text: "Red flags: 'exposure' valued in numbers they cannot show, trades that scale with MY effort and not theirs, and the word 'partnership' attached to a timeline without an end. If the trade cannot be written on one napkin with two columns, one party is donating. I napkin-test everything. Napkins do not lie.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:barter:rep-4",
          text: "Cash for rent, barter for range — cash is the mortgage and barter is the variety pack. The trades get me pilots, teeth, flights, and one motorcycle lesson, none of which I would have budgeted. The trick is the ledger: every barter logged at market rate, in ink, so I know what I am ACTUALLY earning. Unlogged barter is a costume.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:barter:rep-5",
          text: "Opinions, delivered in red ink: barter is taxable, barter is real income, and the words 'but it was free' have never once worked on her. Every trade is now valued, logged, and declared. She calls the file 'the favor ledger'. I call it the price of doing business with Grazyna. Both names are accurate.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "klaudia:barter:rep-6",
          text: "The driving instructor, 2023 — a month of lessons for a 'learning to drive at 31' series that outperformed every sponsored post I have made. He got three new students a week for a year. I got a license and the best content arc of my career. Barter with a plot is cinema. Cash with a plot is advertising.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "klaudia:content-calendar",
      label: "The content calendar",
      optionCandidates: [
        { id: "klaudia:content-calendar:opt-1", topicId: "klaudia:content-calendar", text: "You schedule a week ahead. Creative or factory?" },
        { id: "klaudia:content-calendar:opt-2", topicId: "klaudia:content-calendar", text: "The calendar is color-coded. Decode the colors." },
        { id: "klaudia:content-calendar:opt-3", topicId: "klaudia:content-calendar", text: "What happens when news breaks your calendar?" },
        { id: "klaudia:content-calendar:opt-4", topicId: "klaudia:content-calendar", text: "Sunday scheduling ritual — describe it." },
        { id: "klaudia:content-calendar:opt-5", topicId: "klaudia:content-calendar", text: "The calendar says post, you feel nothing. Post?" },
        { id: "klaudia:content-calendar:opt-6", topicId: "klaudia:content-calendar", text: "Could the calendar run itself? Fully automated?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:content-calendar:rep-1",
          text: "Factory inputs, artisan outputs — the schedule is the conveyor belt and the posts are hand-finished. Nobody admires the conveyor belt. Everybody admires the consistency the belt makes possible. The audience thinks I am inspired daily. The calendar knows I am inspired monthly and DISCIPLINED daily.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:content-calendar:rep-2",
          text: "Green is evergreen — posts that work any week. Blue is trend-dependent, with a shelf life. Red is collateral that needs the office's mood. Yellow is the wildcards, one per week, for the algorithm's amusement. The colors are a risk portfolio. The feed is balanced like a fund. The fund outperforms impulse.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:content-calendar:rep-3",
          text: "Then the calendar earns its keep: one slot flexes, three hold. News takes the flex slot — speed on news is the whole advantage of a calendar, because the OTHER slots are already full and you can afford the pivot. Creators without calendars chase news and lose their feed. The calendar is a guaranteed free slot.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:content-calendar:rep-4",
          text: "Sixty minutes, one pot of tea: review the week's numbers, pull two posts from the vault, write three captions from the notebook, schedule everything by six. The ritual is boring and the boring is the engine. Every viral post I have had was scheduled by a calmer version of me on a Sunday. The calm me plans.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:morning"],
        },
        {
          id: "klaudia:content-calendar:rep-5",
          text: "Post, because the feeling is not the assignment — the feeling is the WEATHER, and weather does not run the calendar. The audience cannot tell which posts came from fire and which from the vault. Only I know. The audience subscribes to the OUTPUT, and the output shows up regardless of weather. Farmers know this.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:content-calendar:rep-6",
          text: "The scheduling already runs itself. The JUDGMENT does not, and judgment is the product — knowing that this post is a Tuesday post and that one is a Friday post is the entire craft. Automate the pipeline and the feed would be fine. Fine is the enemy. The calendar runs logistics. The human runs taste. Forever.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "klaudia:viral-post",
      label: "The one viral post",
      optionCandidates: [
        { id: "klaudia:viral-post:opt-1", topicId: "klaudia:viral-post", text: "Your viral post — the printer one? The numbers." },
        { id: "klaudia:viral-post:opt-2", topicId: "klaudia:viral-post", text: "What did virality actually change for you?" },
        { id: "klaudia:viral-post:opt-3", topicId: "klaudia:viral-post", text: "Can virality be designed or only caught?" },
        { id: "klaudia:viral-post:opt-4", topicId: "klaudia:viral-post", text: "The viral post brought the wrong audience. Fix?" },
        { id: "klaudia:viral-post:opt-5", topicId: "klaudia:viral-post", text: "Your second-most viral post. Why less famous?" },
        { id: "klaudia:viral-post:opt-6", topicId: "klaudia:viral-post", text: "Would you delete the viral post if you could?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:viral-post:rep-1",
          text: "The printer eulogy — two million views, four hundred thousand shares, and one strongly worded email from a paper company. The numbers were a lightning strike. The content was a eulogy for an appliance this office treats as a colleague. The internet has printer trauma and I held the memorial. Grief did the rest.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:viral-post:rep-2",
          text: "Everything and nothing — the following tripled, the media called, and the engagement rate DROPPED for six weeks, because two million strangers are not my audience, they are my audience's audience. Virality is a flood. The flood leaves silt. The silt was three real clients and one dentist. Net: worth it. Barely. On a good day.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:viral-post:rep-3",
          text: "Designed like a fishing net and caught like lightning — you build the widest, most honest net you can, and the lightning decides. My viral post was the fourteenth version of a joke I had been refining for a year. The strike looked sudden. The net took eleven months. People see the lightning. I see the net.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:viral-post:rep-4",
          text: "You do not fix it — you CHANNEL it. The wrong audience floods in, you post five of your truest things in two weeks, and the flood sorts itself: the visitors who were lost were never coming back, and the ones who stayed are the new audience. My audience is twenty percent flood sediment. The sediment is loyal. Sediment always is.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:viral-post:rep-5",
          text: "The one where I cried about a parking ticket, one hundred thousand views, and a masterclass in specificity — nobody shares parking tickets and everybody HAS one. It outperformed its size. The viral post was a broadcast. The parking post was a mirror. Mirrors do not travel as far. Mirrors convert. I am prouder of the mirror.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:viral-post:rep-6",
          text: "Never — it is a museum piece with my name on it, and deleting a viral post is demolition of the one landmark the audience agrees on. The post has aged, the joke is dated, and the comments are a time capsule of 2024's whole personality. Landmarks are maintained by being THERE. It stays. Forever.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "klaudia:copycats",
      label: "The copycat economy",
      optionCandidates: [
        { id: "klaudia:copycats:opt-1", topicId: "klaudia:copycats", text: "Someone copied your format beat for beat. Rage?" },
        { id: "klaudia:copycats:opt-2", topicId: "klaudia:copycats", text: "How do you tell homage from theft?" },
        { id: "klaudia:copycats:opt-3", topicId: "klaudia:copycats", text: "Your copycat has more followers now. Justice?" },
        { id: "klaudia:copycats:opt-4", topicId: "klaudia:copycats", text: "Do you watermark anything anymore?" },
        { id: "klaudia:copycats:opt-5", topicId: "klaudia:copycats", text: "The office imitates your captions. Flattered?" },
        { id: "klaudia:copycats:opt-6", topicId: "klaudia:copycats", text: "What does copying actually cost the copier?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:copycats:rep-1",
          text: "Rage for one evening, then the audit: did they copy the FORMAT or the voice? Formats are open source — the internet remixes everything, and format theft is a compliment with a poor memory. Voice theft is different. Voice theft is identity fraud with worse lighting. My formats are free. My voice has a lawyer's number.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:copycats:rep-2",
          text: "The homage copies the STRUCTURE and signs the influence. The theft copies the structure and hopes you do not notice. One tag changes everything — 'inspired by' is a handshake, silence is a shoplift. My rule: steal a format, leave a breadcrumb. The breadcrumb is the entire ethics of the internet, and it costs nothing.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:copycats:rep-3",
          text: "Then they copied the format and outgrew the teacher, which stings exactly once and then becomes a data point: formats are not moats. VOICE is the moat. The copier has my format and their voice, and their voice is why they grew. Congratulations to them. Formats are bicycles. Everyone rides the same design. Nobody rides it like you.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:copycats:rep-4",
          text: "Only the expensive things — the course workbook, the calendar template. Watermarks on posts are security theater; the real watermark is the voice, and the voice cannot be cropped out. I watched a copycat repost my caption word for word. Their audience asked why they sounded like a budget version of a person. The audience polices. The audience is the watermark.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:copycats:rep-5",
          text: "Deeply — the office now writes captions with hooks, line breaks, and one word in caps. Janusz signed a post 'content by the closet'. The adoption means the craft LEAKED, which is the goal of every teacher: make the skill ambient. My captions were a course the office never paid for. The payment is the office sounding like itself, louder.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:copycats:rep-6",
          text: "The audience's trust, discovered at the worst moment — every copycat is one comment away from 'wait, is this the person who copies...?' and comment sections are forensic. The copier pays in permanent suspicion. The original pays in one evening of rage. Rage forgives. Suspicion compounds. I would not trade ledgers with a copycat.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:backdrop",
      label: "The backdrop wishlist",
      optionCandidates: [
        { id: "klaudia:backdrop:opt-1", topicId: "klaudia:backdrop", text: "The office is your backdrop. Favorite corner?" },
        { id: "klaudia:backdrop:opt-2", topicId: "klaudia:backdrop", text: "You want a neon sign for the backdrop. Budget?" },
        { id: "klaudia:backdrop:opt-3", topicId: "klaudia:backdrop", text: "The glass wall films beautifully. Physics or luck?" },
        { id: "klaudia:backdrop:opt-4", topicId: "klaudia:backdrop", text: "The plant behind you has a fan club. Yours?" },
        { id: "klaudia:backdrop:opt-5", topicId: "klaudia:backdrop", text: "Would you film at a client's office? Rules?" },
        { id: "klaudia:backdrop:opt-6", topicId: "klaudia:backdrop", text: "What backdrop have you never filmed and want to?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:backdrop:rep-1",
          text: "The corridor by the training room at 4pm — the light goes gold, the corridor has depth, and the doorframes make every shot look architectural. Corridors are the most underrated backdrop in content. Everyone films at desks. Desks are flat. Corridors have a FUTURE visible in frame. The eye wants a future.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:backdrop:rep-2",
          text: "Budget: whatever Grazyna rejects, which means the neon is currently theoretical and lives on a mood board between 'approved' and 'someday'. The sign says 'PERCEIVED' in pink. She flagged it as decorative lighting. I refiled it as 'workplace lighting for video infrastructure'. The case is open. The mood board is patient.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:backdrop:rep-3",
          text: "Physics, weaponized — the glass faces west, which means every afternoon the office gets a free softbox the size of a wall. I do not fight the sun. I SCHEDULE against it. The glass wall is the co-creator nobody bills. It has appeared in more content than most colleagues. It never misses a shoot.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:backdrop:rep-4",
          text: "The plant is named Fernando, has appeared in two hundred posts, and has a fan club of eleven people who ask after him in the comments. Fernando is the second-most consistent performer in the office. He does not know. His watering schedule is Janusz's business. His FAME is my business. We do not discuss the arrangement.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:backdrop:rep-5",
          text: "Only with a written yes from whoever owns the walls and a walk-through first — client offices are somebody's baby, and filming a baby without permission is how content careers end. The rule: one location recce, one shot list, one yes. The recce is where I earn the trust. The trust is where the backdrop gets interesting.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:backdrop:rep-6",
          text: "The roof at sunset. Janusz has the key, the light is unphotographed in this office's entire archive, and the city from up there at golden hour is the backdrop every creator would rent a studio to fake. The ask is in with Janusz. The answer is pending. Janusz does not rush. His yes will be my best approval ever.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "klaudia:analytics-app",
      label: "The analytics stack",
      optionCandidates: [
        { id: "klaudia:analytics-app:opt-1", topicId: "klaudia:analytics-app", text: "You check analytics eleven times a day. Normal?" },
        { id: "klaudia:analytics-app:opt-2", topicId: "klaudia:analytics-app", text: "Which metric do you actually trust?" },
        { id: "klaudia:analytics-app:opt-3", topicId: "klaudia:analytics-app", text: "The app says 'best time to post'. Believe it?" },
        { id: "klaudia:analytics-app:opt-4", topicId: "klaudia:analytics-app", text: "Do you track the office's content too?" },
        { id: "klaudia:analytics-app:opt-5", topicId: "klaudia:analytics-app", text: "Analytics apps all feel the same. Differentiate." },
        { id: "klaudia:analytics-app:opt-6", topicId: "klaudia:analytics-app", text: "What number would you delete from every app?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:analytics-app:rep-1",
          text: "Eleven is a REDUCTION — it was thirty-one in my first year, refreshed like a slot machine. Now it is structured: three checks at fixed times, one deep dive on Sunday. The number dropped when the discipline arrived. Analytics addiction is not a numbers problem. It is a SCHEDULE problem. The schedule won.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:analytics-app:rep-2",
          text: "Saves. Likes are applause, comments are conversation, and saves are people planning to RETURN. A save means the post was useful enough to keep — the only metric that measures the future instead of the moment. My best posts by saves are never my best posts by likes. The saves posts are the career. The likes posts are the party.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:analytics-app:rep-3",
          text: "Believe it as a PRIOR, not a promise — the suggested times are population averages and my audience is a specific herd with herding habits. I test the suggestion for two weeks against my own, keep the winner, re-test quarterly. The app is a consultant, not a boss. Consultants bill. This one does not. Still not a boss.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:analytics-app:rep-4",
          text: "I track everything with the office's name on it — Zosia's posts, Ania's reels, the company page, and Burek's unofficial tag. The office is a content ecosystem and nobody else reads the WHOLE board. My weekly summary goes to Zosia in one page. She calls it 'the gossip report'. It is the most accurate document here.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:morning"],
        },
        {
          id: "klaudia:analytics-app:rep-5",
          text: "They differ in one thing only: the explanation layer. The numbers are identical — the apps differ in how they explain WHY. My app has a notes field per post and I use it like a diary: what I posted, what the weather was, what happened in the office. Numbers without notes are a mirror. Numbers with notes are a MAP.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:analytics-app:rep-6",
          text: "Impressions. The most flattering, most useless number in the stack — impressions count the times my content was PRESENT, not the times it was experienced. Presence is not impact. I have had posts with a million impressions that changed nothing and posts with nine thousand saves that changed my quarter. Confetti does not file reports.",
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

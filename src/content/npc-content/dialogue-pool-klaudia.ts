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

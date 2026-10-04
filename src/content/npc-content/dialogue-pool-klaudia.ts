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
    {
      id: "klaudia:comment-voice",
      label: "The comment voice",
      optionCandidates: [
        { id: "klaudia:comment-voice:opt-1", topicId: "klaudia:comment-voice", text: "Why do your captions sound different from your talking voice?" },
        { id: "klaudia:comment-voice:opt-2", topicId: "klaudia:comment-voice", text: "You wrote 'we move' under Zosia's post. Explain." },
        { id: "klaudia:comment-voice:opt-3", topicId: "klaudia:comment-voice", text: "Your comment voice has a formula, doesn't it?" },
        { id: "klaudia:comment-voice:opt-4", topicId: "klaudia:comment-voice", text: "Dawid replied to your post. Three words. Your reaction?" },
        { id: "klaudia:comment-voice:opt-5", topicId: "klaudia:comment-voice", text: "Tomek says the comment voice is 'a genre'." },
        { id: "klaudia:comment-voice:opt-6", topicId: "klaudia:comment-voice", text: "Teach me the comment voice." },
      ],
      replyCandidates: [
        {
          id: "klaudia:comment-voice:rep-1",
          text: "Because the talking voice is me and the comment voice is ME — the version of me that lives at the intersection of every caption ever written. It is not fake, it is FOCUSED. In person I ramble. Online I arrive. Everyone should have a voice for arriving. Mine just happens to have three emojis and commitment.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:comment-voice:rep-2",
          text: "It means 'I acknowledge this aligns with our shared values and I am adding my brand's light to its light.' Two words, infinite work. Zosia replied 'noted' which in Zosia is a standing ovation with the chairs still down. The comment outperformed my own post that day and I am not even mad. Okay. Slightly mad. Also grateful.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:comment-voice:rep-3",
          text: "Every formula has a formula if you stare at it long enough. Mine: short sentence. Shorter sentence. The TRUTH with a heartbeat. That is it. That is the voice. It works because platforms punish paragraphs and reward pulse. I did not invent it. I just committed to it, which is what most people never do with anything.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:comment-voice:rep-4",
          text: "'Consistent. Keep going.' FOUR WORDS from the CEO and the comment has more saves than my last six posts. I screenshotted it. The screenshot has been screenshotted. Dawid does not post, does not comment, and his three words moved my whole quarter. The man is a comment algorithm of one and I am studying him like weather.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:comment-voice:rep-5",
          text: "He called it a GENRE and then wrote a comment IN my genre, on my post, as criticism, and it got more likes than the post. So who is the genre now, Tomek. WHO IS THE GENRE. We are in a comment cold war and honestly? My engagement has never been better. Rivalry is retention. I learned that from the algorithm and one angry blonde in the comments section of 2023.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:comment-voice:rep-6",
          text: "Read the post twice, find the ONE true thing in it, and say that thing in seven words or fewer. No compliments — compliments are noise. Say the true thing like it costs you something. 'This is the part nobody says.' Boom. That is the genre. That is the voice. Practice on Burek's posts. He never reads them. Perfect training environment.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:posting-times",
      label: "The posting times",
      optionCandidates: [
        { id: "klaudia:posting-times:opt-1", topicId: "klaudia:posting-times", text: "Why do you post at exactly 7:44?" },
        { id: "klaudia:posting-times:opt-2", topicId: "klaudia:posting-times", text: "Zosia claims the 7am slot. War or treaty?" },
        { id: "klaudia:posting-times:opt-3", topicId: "klaudia:posting-times", text: "Do you schedule posts or post live?" },
        { id: "klaudia:posting-times:opt-4", topicId: "klaudia:posting-times", text: "The 9pm post failed completely. Why?" },
        { id: "klaudia:posting-times:opt-5", topicId: "klaudia:posting-times", text: "Tomek says posting times are astrology. Defend." },
        { id: "klaudia:posting-times:opt-6", topicId: "klaudia:posting-times", text: "What is the perfect posting cadence?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:posting-times:rep-1",
          text: "Because 7:44 is when the city is on public transport with nothing to read and just enough shame about yesterday. Tested across four months, two accounts, one abandoned fitness era. The seven forty-fours won. Nobody knows why. That is the fun part — the algorithm has rhythms and my job is to be its dancer, not its dancer's manager.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:posting-times:rep-2",
          text: "We signed a TREATY. She keeps 7:00 for culture, I take 7:44 for personal brand, and Ania gets the newsletter slot nobody wants. It is the Geneva Convention of content and we all honor it because the alternative is a war where everyone's reach dies. Peace is reach. I have it on a sticky note. The sticky note is aesthetic. Obviously.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:posting-times:rep-3",
          text: "Scheduled for the weekdays, LIVE for the moments. A scheduled post is a promise to the algorithm; a live post is a gift to the moment. When Burek stole the sausage, that was LIVE, from the floor, shaking. You cannot schedule spontaneity but you can be present for it. My camera roll is basically a first responder.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:posting-times:rep-4",
          text: "Nine pm is when everyone is lying down scrolling — vertical video only, and I posted a CAROUSEL. Format crime, not a timing crime. The lesson cost me one dead post and gave me the rule: the hour sets the MOOD, the platform sets the FORMAT, and you respect both or you post into the void. The void does not comment. The void just watches.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:posting-times:rep-5",
          text: "Astrology has houses. I have heat maps. We are NOT the same. I said that to Tomek and he said 'so you believe in perfect timing' and I said 'I believe in REPEATED timing' and he went quiet, which for Tomek is a concession speech. Timing is not magic. Timing is just respecting when your audience is human instead of aspirational.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:posting-times:rep-6",
          text: "Three a week, same days, forever. Consistency beats frequency, frequency beats intensity, and intensity is what burnout sells you as a personality trait. The audience should be able to set a watch by you, and then one week a month you MISS, on purpose, so they notice the watch. Absence is a feature. Scarcity is a strategy. The calendar is the whole empire.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:golden-hour",
      label: "The golden hour",
      optionCandidates: [
        { id: "klaudia:golden-hour:opt-1", topicId: "klaudia:golden-hour", text: "You chase the light through the office every morning?" },
        { id: "klaudia:golden-hour:opt-2", topicId: "klaudia:golden-hour", text: "The glass wall makes one perfect light stripe. Yours?" },
        { id: "klaudia:golden-hour:opt-3", topicId: "klaudia:golden-hour", text: "You scheduled a shoot around the weather forecast." },
        { id: "klaudia:golden-hour:opt-4", topicId: "klaudia:golden-hour", text: "Ania and you fought over the 10am light." },
        { id: "klaudia:golden-hour:opt-5", topicId: "klaudia:golden-hour", text: "Cloudy day. Your whole content plan is dead?" },
        { id: "klaudia:golden-hour:opt-6", topicId: "klaudia:golden-hour", text: "What makes golden hour content better, honestly?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:golden-hour:rep-1",
          text: "Every morning, 9:50, I migrate east to west with the sun like a very glamorous sundial. The office has a light schedule and I have MEMORIZED it. Marek thinks I am tracking the wifi. I am tracking the SUN. The sun is the only ring light that does not need an outlet, and it is FREE, and nobody exploits that anymore.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:golden-hour:rep-2",
          text: "The 10:06 stripe. It crosses the floor at exactly standing-portrait height, hits the glass, and gives you FREE CINEMA. I have shot four brand deals in that stripe. Clients think I own a studio. I own a WATCH and an understanding of refraction. The stripe is on the office map Janusz drew. He marked it 'Klaudia's territory'. Officially sanctioned light.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:golden-hour:rep-3",
          text: "I moved a client shoot by TWO DAYS for a clear-sky forecast and the client thought I was insane until the footage came back. Clouds are diffusion. A blue-sky day is FREE professional lighting that nature renders at no cost and no invoice. You do not fight the forecast. You WORSHIP it. My calendar has a weather layer and it is the boss layer.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:golden-hour:rep-4",
          text: "The 10:06 stripe is MINE and Ania knows it. She scheduled a launch shoot in MY stripe and we had what Janusz called 'a light dispute' and what I call attempted sun theft. We resolved it like professionals: she gets 10:06 on Tuesdays, I get it forever on every other day, and the treaty is written on a sticky note INSIDE the stripe. The sun witnesses everything.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm", "period:morning"],
        },
        {
          id: "klaudia:golden-hour:rep-5",
          text: "Cloudy days are for B-ROLL and truths. No light means no glamour, so I post the unglamorous content — the messy desk, the real numbers, the 'why I actually do this' post. And those posts outperform the pretty ones every single time. The clouds know something. The clouds give you the day off from beauty and the internet always pays for honesty.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:golden-hour:rep-6",
          text: "Nobody questions light that comes from the sky. Ring light content looks lit. Golden hour content looks CHOSEN — like the moment itself selected you. The brain cannot tell the difference consciously, but the comments can. 'So aesthetic' means the light did the work. The light always does the work. I just show up and hold the phone steady.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:outfit-repeat",
      label: "The outfit repeat scandal",
      optionCandidates: [
        { id: "klaudia:outfit-repeat:opt-1", topicId: "klaudia:outfit-repeat", text: "The internet noticed you repeat outfits. Survived?" },
        { id: "klaudia:outfit-repeat:opt-2", topicId: "klaudia:outfit-repeat", text: "You now post outfit repeats ON PURPOSE?" },
        { id: "klaudia:outfit-repeat:opt-3", topicId: "klaudia:outfit-repeat", text: "The green blazer is in every third post. Favorite?" },
        { id: "klaudia:outfit-repeat:opt-4", topicId: "klaudia:outfit-repeat", text: "Zosia's blazer never repeats. Commentary?" },
        { id: "klaudia:outfit-repeat:opt-5", topicId: "klaudia:outfit-repeat", text: "Kasia offered you a clothes-swapping system." },
        { id: "klaudia:outfit-repeat:opt-6", topicId: "klaudia:outfit-repeat", text: "What did the repeat scandal teach you?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:outfit-repeat:rep-1",
          text: "Survived, thrived, and got a VERDICT. A comment said 'wearing the same top in three posts, relatable queen' and it got more likes than my lipstick tutorial. The internet says it wants new and rewards it wants REAL. I decided to believe the reward. Also I own four blazers and a washing machine. The logistics were always the truth.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:outfit-repeat:rep-2",
          text: "On PURPOSE. It is called a uniform arc and the big creators all do it — the same silhouette until it becomes a silhouette of the MIND. You see the blazer, you think of me, the brand enters the room before the face does. Repeating is not running out of clothes. Repeating is RUNNING A MEDIA EMPIRE on four blazers and courage.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:outfit-repeat:rep-3",
          text: "The green blazer has its own comment section, its own nickname — 'the green' — and one fan account that is just photos of it. It cost 129 zloty from a sale rack in 2022. NEVER tell the fan account. The magic is not the price. The magic is the CONSISTENCY. The green shows up. People trust what shows up. That is branding in one hanger.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:outfit-repeat:rep-4",
          text: "The blazer is not repeating because the blazer is not CONTENT, it is INFRASTRUCTURE. Zosia wears it like a load-bearing wall — nobody is supposed to notice walls. I wear things so you notice them. We are both correct, which is what makes this office unbearable for fashion theorists and perfect for everyone else.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:outfit-repeat:rep-5",
          text: "She did, with a spreadsheet, a rotation, and rules about color seasons. I have never been more organized or more TERRIFIED. If Kasia runs my wardrobe the way she runs referrals, I will never wear the same outfit twice AND always wear the right one. I said yes before she finished the sentence. Say yes to spreadsheets about your closet. That is growth.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:outfit-repeat:rep-6",
          text: "That the audience does not want perfection, they want PERMISSION. When I repeated an outfit, thousands of women commented that they repeat outfits too, and the thread became this little support group about laundry and self-worth. The scandal was never the clothes. The scandal is that we pretend. I stopped pretending and my engagement has never been healthier.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:office-shoot",
      label: "The office shoot day",
      optionCandidates: [
        { id: "klaudia:office-shoot:opt-1", topicId: "klaudia:office-shoot", text: "You shot the whole office in one day. How?" },
        { id: "klaudia:office-shoot:opt-2", topicId: "klaudia:office-shoot", text: "Marek refused to be photographed. Final state?" },
        { id: "klaudia:office-shoot:opt-3", topicId: "klaudia:office-shoot", text: "The best shot of the day was an accident?" },
        { id: "klaudia:office-shoot:opt-4", topicId: "klaudia:office-shoot", text: "Zosia approved the shoot in the budget as WHAT?" },
        { id: "klaudia:office-shoot:opt-5", topicId: "klaudia:office-shoot", text: "Janusz photobombed every shot with a mop." },
        { id: "klaudia:office-shoot:opt-6", topicId: "klaudia:office-shoot", text: "Teach me to run a shoot day without chaos." },
      ],
      replyCandidates: [
        {
          id: "klaudia:office-shoot:rep-1",
          text: "With a shot list, two time blocks, and the 10:06 light stripe as my studio. Fifteen people, one office, forty-one keepers. The trick is treating people like CONTENT but explaining it like PORTRAITS. Nobody poses badly on purpose. They pose badly when they are confused. I do the confusing in advance so the day is only the fun part.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:office-shoot:rep-2",
          text: "He refused, so I shot his HANDS. Hands on cables, hands on the label maker, hands holding Burek like a briefcase. The hands series is the most shared content this office has ever produced and Marek's face is in ZERO frames. He knows. He printed one photo. It is inside his server rack. We have an understanding. The hands understood the assignment.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:office-shoot:rep-3",
          text: "Burek walked through the frame during the values wall shot and sat down EXACTLY under the word 'loyalty'. Forty thousand impressions. Every news outlet for dogs covered it. Staged, it would have died. Authenticated by a dog, it flew. The lesson: plan everything, then let the dog edit.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:office-shoot:rep-4",
          text: "'Employer brand infrastructure, see attached reach.' She attached MY analytics. The shoot cleared finance because I brought numbers instead of vibes. Grazyna approved it in ELEVEN SECONDS. I have never filed anything faster or better. Numbers are the ring light of budgets. Shine them on anything and it gets approved.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "period:afternoon"],
        },
        {
          id: "klaudia:office-shoot:rep-5",
          text: "Every. Single. Shot. First it was annoying, then I looked at the footage, and the mop is ALWAYS exactly where a mop should be — checking the frame, mopping the light, being Janusz. The final video is fifty percent content and fifty percent mop, and the mop has a FAN CLUB. I cannot compete with the mop. Nobody can compete with the mop. The mop is the algorithm's favorite.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:office-shoot:rep-6",
          text: "Shot list the night before. One location, one lens, one outfit change maximum. Feed everyone at 12:30 — hungry people's smiles are hostage smiles. And let each person be photographed doing the thing they ACTUALLY do, because the lie always shows in the hands. Chaos is just scheduling that has not been loved. Love your schedule. The day obeys.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:brand-safety",
      label: "The brand safety",
      optionCandidates: [
        { id: "klaudia:brand-safety:opt-1", topicId: "klaudia:brand-safety", text: "You turned down a brand deal. What happened?" },
        { id: "klaudia:brand-safety:opt-2", topicId: "klaudia:brand-safety", text: "The supplement company offered triple your rate." },
        { id: "klaudia:brand-safety:opt-3", topicId: "klaudia:brand-safety", text: "Kasia reviews your brand deals now?" },
        { id: "klaudia:brand-safety:opt-4", topicId: "klaudia:brand-safety", text: "Your one rule for brand deals is what?" },
        { id: "klaudia:brand-safety:opt-5", topicId: "klaudia:brand-safety", text: "The bet-on-yourself scheme DMs. You get those?" },
        { id: "klaudia:brand-safety:opt-6", topicId: "klaudia:brand-safety", text: "What would you never post, even for a million?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:brand-safety:rep-1",
          text: "A laptop brand wanted me to say their battery lasts 'all day'. Mine died during MY OWN livestream. On camera. While promoting them. The clip exists. The clip is famous. I sent it to the brand as my reason for declining and they respected it more than any media kit I have ever sent. Honesty is a niche but the niche is LOYAL.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:brand-safety:rep-2",
          text: "Triple. TRIPLE. And the product was fine! The math was fine! The VIBES were criminal — their comments were all crypto bots and their last three ambassadors disappeared mid-scandal. Your rate is not your price. Your rate is your FILTER. Triple money for a comment section that hates me is a pay cut with extra steps. I said no in one voice note and slept like a fed baby.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:brand-safety:rep-3",
          text: "She reviews EVERYTHING and her red flags are better than my green flags. Kasia's checklist is one page — disclosure, actual use, exit clause, and 'would you recommend it to Renata'. That last question has killed more deals than the other three combined, because you cannot lie about Renata. Renata is the integrity stress test with a candy bowl.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:brand-safety:rep-4",
          text: "I have to still like me at the end of the campaign. Not the audience. Not the brand. ME. The 11pm version, in bed, scrolling my own feed, does she wince? If yes, the money is a loan against my face and the interest is brutal. Every follower is a tiny bit of trust and brands pay to borrow it. I only lend to people who return things.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:brand-safety:rep-5",
          text: "Weekly. 'Turn your following into income, just send a deposit.' Delete. Block. Screenshot for the wall of shame, which is a REAL wall in my apartment and my best-performing story format. The scam DMs are content. The content is armor. The scammers are my unpaid creative team and they do not even know it. Beautiful system. Ugly people.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:brand-safety:rep-6",
          text: "Nothing against the office. The office is the GOLD — Burek, Janusz's mop, the light stripe, Zosia's blazer. I would post all of it for free and mostly do. What I would never sell is a LIE about any of it. The day I fake a product using this office's trust, the office stops being home and starts being a set. Sets get struck. Homes stay. I live here, basically.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "klaudia:shadowban-fear",
      label: "The shadowban fear",
      optionCandidates: [
        { id: "klaudia:shadowban-fear:opt-1", topicId: "klaudia:shadowban-fear", text: "Your reach dropped forty percent. Shadowban?" },
        { id: "klaudia:shadowban-fear:opt-2", topicId: "klaudia:shadowban-fear", text: "How do you test if you are actually banned?" },
        { id: "klaudia:shadowban-fear:opt-3", topicId: "klaudia:shadowban-fear", text: "Marek ran an actual analysis of your reach. Verdict?" },
        { id: "klaudia:shadowban-fear:opt-4", topicId: "klaudia:shadowban-fear", text: "Zosia's engagement dropped too. Solidarity?" },
        { id: "klaudia:shadowban-fear:opt-5", topicId: "klaudia:shadowban-fear", text: "What is your panic protocol for a reach crash?" },
        { id: "klaudia:shadowban-fear:opt-6", topicId: "klaudia:shadowban-fear", text: "Is the algorithm out to get creators, honestly?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:shadowban-fear:rep-1",
          text: "Reach dropped and I did the ONE thing nobody does: I waited 72 hours before saying the word. Turns out it was a holiday week and the whole platform was sleepy. The word 'shadowban' is a comfort blanket for creators and a WRONG number most of the time. I keep it in my vocabulary for emergencies only. Like a fire extinguisher. Or a drama queen.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:shadowban-fear:rep-2",
          text: "Three tests. Post a story and check if a NON-follower sees it. Search your own hashtag from a different account. And the classic: ask a friend in another city what they see. The tests take ten minutes and save three days of doom. Fear loves an untested hypothesis. I starve my fears with data. It is my entire personality.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:shadowban-fear:rep-3",
          text: "He made a SPREADSHEET. Of my REACH. With a trend line and a label that says 'algorithm is not haunted, posting is irregular'. He was RIGHT. I had missed three 7:44s in two weeks and blamed the machine. Marek fixed my career with a pivot table and no eye contact. That is the most respected I have ever felt.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:klaudia-rebranded-you"],
        },
        {
          id: "klaudia:shadowban-fear:rep-4",
          text: "Her numbers dipped the same week and she said, and I quote, 'the medium is moody'. CALM. She was CALM about the reach. I lose my mind over a forty percent dip and she shrugs at a sixty. Her secret is that the newsletter owns her audience, not the platform. She cannot be shadowbanned from her OWN EMAIL LIST. I am building one. Slowly. Under her mentorship. The student studies.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:shadowban-fear:rep-5",
          text: "Water. Walk. ONE post about something other than the numbers — usually Burek. The panic protocol exists because panic-posting is how a dip becomes a spiral. The algorithm reads desperation the way dogs read fear. Burek content resets the energy, resets MY energy, and by Thursday the numbers remember who I am. Burek is my crisis management team and his salary is cuddles.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:shadowban-fear:rep-6",
          text: "The algorithm is not out to get you. The algorithm is out to keep people scrolling, and you are either helping or you are not. That is not evil, that is a JOB DESCRIPTION. Once I accepted the algorithm is just a bored coworker with metrics, I stopped taking it personally and started being USEFUL to it. We are colleagues now. Weird colleagues. Colleagues who never book meetings.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "klaudia:highlights-archive",
      label: "The highlights archive",
      optionCandidates: [
        { id: "klaudia:highlights-archive:opt-1", topicId: "klaudia:highlights-archive", text: "Your highlights are archived by year? Why?" },
        { id: "klaudia:highlights-archive:opt-2", topicId: "klaudia:highlights-archive", text: "The 2023 era highlight is your most watched?" },
        { id: "klaudia:highlights-archive:opt-3", topicId: "klaudia:highlights-archive", text: "You deleted some highlights. Which ones?" },
        { id: "klaudia:highlights-archive:opt-4", topicId: "klaudia:highlights-archive", text: "Zosia browses your highlights for the culture page?" },
        { id: "klaudia:highlights-archive:opt-5", topicId: "klaudia:highlights-archive", text: "Tomek called highlights 'a diary with makeup'." },
        { id: "klaudia:highlights-archive:opt-6", topicId: "klaudia:highlights-archive", text: "What will the archive be in ten years?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:highlights-archive:rep-1",
          text: "Because stories vanish and VANISHING IS A LIE. Highlights are the receipts of the era — this was the coffee era, this was the blazer era, this was the week I met Burek. New followers binge the archive like a series. The feed is the newsletter. The highlights are the LIBRARY. Every creator needs a library or they are just a person shouting into a river.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:highlights-archive:rep-2",
          text: "The 'office tour' highlight. Burek walked the whole route, camera on, like a FURRY FACILITATOR. People watch it to this day to see the printer, the glass wall, and the mop cameo. It is the office's greatest content asset and it cost me one dog treat. I have pitched a sequel every month since. Burek's rate has gone up. He knows.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:highlights-archive:rep-3",
          text: "The 2022 era. Not because it was bad — because it was FAKE. Inspirational quotes over sunsets, energy I did not have, a version of me built for an algorithm I did not understand. Deleted it the day I got the office job. Keep the lessons, delete the costume. The archive should be a museum, not a mausoleum of cringe. Though I DID save two posts to a private folder.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:highlights-archive:rep-4",
          text: "She screenshots my highlights for the culture page and always asks FIRST, which is why she gets everything. Zosia understands the deepest content law: the ask IS the collaboration. My 'new hire week' highlight is now in the official onboarding deck, framed between the values and the fridge rules. My archive has a CITIZENSHIP. I am emotional about it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:highlights-archive:rep-5",
          text: "'A diary with makeup' — Tomek, everyone. And he is not WRONG, which is why it hurt. But here is what he missed: the makeup is not hiding the diary. The makeup is me choosing which page to show, and choosing is not lying, choosing is EDITING. Every diary is edited by memory anyway. Mine is just edited in PUBLIC, with better lighting.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:highlights-archive:rep-6",
          text: "A museum of an office that people will miss. The printer, the mop, the sausage incident, Zosia's blazer era, Burek's whole career. Platforms will change, apps will die, but an archive of a place and its weird beloved people? That outlives every algorithm. I am not building a following. I am building the office's MEMORY. With better lighting. And captions.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:family-audience",
      label: "The family audience",
      optionCandidates: [
        { id: "klaudia:family-audience:opt-1", topicId: "klaudia:family-audience", text: "Your mom watches every story. Pressure?" },
        { id: "klaudia:family-audience:opt-2", topicId: "klaudia:family-audience", text: "Your aunt commented 'who is Burek' on a brand post." },
        { id: "klaudia:family-audience:opt-3", topicId: "klaudia:family-audience", text: "Your younger cousin copies your content now?" },
        { id: "klaudia:family-audience:opt-4", topicId: "klaudia:family-audience", text: "Dad asked what you actually do. Again?" },
        { id: "klaudia:family-audience:opt-5", topicId: "klaudia:family-audience", text: "The family group chat reacts to every post." },
        { id: "klaudia:family-audience:opt-6", topicId: "klaudia:family-audience", text: "Does the family audience change what you post?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:family-audience:rep-1",
          text: "She watches every story within MINUTES. Full reports by breakfast. 'Klaudia, the light was nice. Klaudia, who is the man with the fax.' Mom is my first follower, my strictest editor, and the only audience member who remembers my 2019 cringe era AND my 2026 empire. You cannot buy that kind of continuity. She has seen the whole show. She has NOTES.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:family-audience:rep-2",
          text: "On a PAID brand post, my aunt commented 'lovely, but who is the dog and why is he in your office'. The brand DMed me asking if the account was secure. IT IS SECURE. IT IS FAMILY. I replied publicly with Burek's full title — Director of Morale, Office Dog, twelve years of service — and the brand reposted my answer. Auntie accidentally improved a brand deal. Kings do this.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:family-audience:rep-3",
          text: "He is THIRTEEN and his transitions are BETTER than mine. No fear, no brand deals, pure vibes and jump cuts. I watch his account the way Marek watches server logs — professionally, with a low hum of dread. I gave him one rule: never post where you sleep. He ignored it and bought a ring light with his own money. The kid is me with better tech. I am so proud. I am so TIRED.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:family-audience:rep-4",
          text: "Every holiday. Dad, loving, baffled: 'But what do you DO.' And this year, this YEAR, I showed him the analytics. The numbers. The reach. The brand invoices. He studied them for a full minute and said 'ah. You are in MARKETING.' Dad. DAD. I have been in marketing for two years and the family announcement is THIS Christmas. Progress is not a straight line.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:family-audience:rep-5",
          text: "Instant reactions. Mom hearts everything. Auntie asks clarifying questions about my JOB. Uncle sends thumbs up emojis from a phone held at maximum zoom. The group chat is my premortem — if it survives the family, it survives the internet. I have killed posts at the draft stage because I knew EXACTLY what Auntie would ask. The family is my QA team. Unpaid. Relentless. Perfect.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:family-audience:rep-6",
          text: "It keeps one channel of me honest. The internet gets the creator. The family gets the cousin. If those two ever fully merge, I am either faking one of them or have achieved something terrifying. So yes — one post a week is just for Mom, boring and real, laundry and soup. The algorithm hates it. Mom hearts it in four seconds. The four seconds win.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:unboxing",
      label: "The unboxing economics",
      optionCandidates: [
        { id: "klaudia:unboxing:opt-1", topicId: "klaudia:unboxing", text: "Why does unboxing content work at all?" },
        { id: "klaudia:unboxing:opt-2", topicId: "klaudia:unboxing", text: "Your most-watched unboxing was... a label maker?" },
        { id: "klaudia:unboxing:opt-3", topicId: "klaudia:unboxing", text: "Do you keep everything brands send you?" },
        { id: "klaudia:unboxing:opt-4", topicId: "klaudia:unboxing", text: "The unboxing where Burek stole the tissue paper?" },
        { id: "klaudia:unboxing:opt-5", topicId: "klaudia:unboxing", text: "Renata intercepts your packages now?" },
        { id: "klaudia:unboxing:opt-6", topicId: "klaudia:unboxing", text: "What is the perfect unboxing recipe?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:unboxing:rep-1",
          text: "Because everyone loves a gift and nobody gets enough of them. Unboxing is vicarious receiving — the dopamine of a present without the cost or the obligation to write a thank-you note. The camera does the gasp for everyone. It is the oldest content format and it works because it is basically a birthday party with better lighting.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:unboxing:rep-2",
          text: "A LABEL MAKER. Unhinged, right? Wrong. GENIUS. The comments said 'why is this satisfying' and 'I need one' in the same breath. Turns out the internet loves ORGANIZATION the way it loves chaos — deeply and secretly. Marek saw the video and said 'finally, correct content'. Highest praise of my career. From a man who labels cables by their birthday.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:unboxing:rep-3",
          text: "The useful things, yes. The candles went to Grazyna for 'quality assessment'. The jackets went to the goodwill pile in my closet that I call 'the archive'. The seventeen phone holders are in a drawer of shame I film once a year as cautionary content. Keep what you use. Film what you keep. Donate the rest before it becomes a ROOM.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:unboxing:rep-4",
          text: "The tissue paper FLEW. He grabbed it, shook it like a trophy, and paraded the full office while I narrated in whispers. The brand's unboxing became a DOG video and it quadrupled my best numbers. The brand loved it. The comments said 'hire the dog'. Burek is now in my rate card as a line item. His line item is the most expensive one. He negotiated by being adorable. Ruthless.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:unboxing:rep-5",
          text: "She greets every single one by name. 'Klaudia, the ring light is here.' How does she KNOW. She reads the sender, knows the brand, knows if it is the PR box or the real thing. Renata is the final boss of package security and my content pipeline is her coffee break entertainment. I bring her the expired PR snacks. We are colleagues of the highest order.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:unboxing:rep-6",
          text: "Natural nails, one take, real reaction — even if the reaction is disappointment, ESPECIALLY then. The perfect unboxing is not the box. It is the FACE watching the box. Seven seconds of honest surprise beats seventy seconds of advertising. And always, ALWAYS thank the mail guy. The mail guy is the algorithm's true master and his name is logistics.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:transition-pack",
      label: "The transition pack",
      optionCandidates: [
        { id: "klaudia:transition-pack:opt-1", topicId: "klaudia:transition-pack", text: "You sell a transition pack? Like video effects?" },
        { id: "klaudia:transition-pack:opt-2", topicId: "klaudia:transition-pack", text: "The whip-pan transition is your signature. Why?" },
        { id: "klaudia:transition-pack:opt-3", topicId: "klaudia:transition-pack", text: "Tomek edited with your pack for a work video." },
        { id: "klaudia:transition-pack:opt-4", topicId: "klaudia:transition-pack", text: "Someone pirated your transition pack. Feelings?" },
        { id: "klaudia:transition-pack:opt-5", topicId: "klaudia:transition-pack", text: "Zosia banned transitions from official videos?" },
        { id: "klaudia:transition-pack:opt-6", topicId: "klaudia:transition-pack", text: "What makes a transition good versus tacky?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:transition-pack:rep-1",
          text: "Twenty-four transitions, one price, infinite drama. It started as MY folder of effects and the comments kept asking 'what app is that' so I packaged the folder and charged for the personality. Passive income is just being organized in public. My folder has a job now. My folder earns more than my first salary. Respect the folder.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:transition-pack:rep-2",
          text: "Because the whip-pan hides EVERYTHING. Bad lighting, a wrong take, the moment you knocked over the ring light — whip-pan, new scene, who could say. It is the reset button of video. Every creator has one move that carries them and mine is a camera pretending to be startled. Relatable. Kinetic. The whip-pan is me as an effect.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:transition-pack:rep-3",
          text: "He used the SLOWEST transition in the pack — the 'existential fade' — for a server migration video and it was ART. Two servers, one fade, the whole comments section asking if they were watching tech or cinema. He said 'the tool is neutral'. Then he used it perfectly. Tomek using my silly pack for actual emotion is the best review I never asked for.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:transition-pack:rep-4",
          text: "Someone pirated it and the pirate version has a WATERMARK that says 'TRANSITION PACK, KLaudia's' — MY OWN NAME, misspelled, because they were too lazy to rename the file. The pirates became my marketing department. Sales went UP. I sent the pirate a free legitimate copy with a note: 'the watermark was load-bearing'. We are mutuals now. The internet is a strange village.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:transition-pack:rep-5",
          text: "She banned the whip-pan from OFFICIAL communications — 'the office does not startle'. Fine. The official videos get my BORING pack, the one I made as a joke called 'Corporate Calm'. Gentle dissolves only. It sells better than the fun pack because every company on earth is run by someone who says 'can we make it less jarring'. I sell both. I AM both. The duality is monetized.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:transition-pack:rep-6",
          text: "A good transition moves the STORY. A tacky transition moves the EYE. If the viewer notices the cut and feels something, it worked. If they notice the cut and think 'effect', you have shown them the machinery mid-movie. The best transition is the one they would miss if it were gone.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:milestone",
      label: "The milestone economy",
      optionCandidates: [
        { id: "klaudia:milestone:opt-1", topicId: "klaudia:milestone", text: "You hit a follower milestone. Celebrating?" },
        { id: "klaudia:milestone:opt-2", topicId: "klaudia:milestone", text: "The 10k celebration video was a thank-you to the office?" },
        { id: "klaudia:milestone:opt-3", topicId: "klaudia:milestone", text: "Do milestones actually mean anything anymore?" },
        { id: "klaudia:milestone:opt-4", topicId: "klaudia:milestone", text: "Dawid's congratulations was one line. Analyze." },
        { id: "klaudia:milestone:opt-5", topicId: "klaudia:milestone", text: "Zosia gave you a milestone card. From HR?" },
        { id: "klaudia:milestone:opt-6", topicId: "klaudia:milestone", text: "What is your next milestone, honestly?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:milestone:rep-1",
          text: "Celebrating, but QUIETLY, because loud milestone posts have started to feel like asking for applause with extra steps. This year the celebration was a story of my desk, a caption that said 'thanks for being here', and one slice of cake from Renata's candy bowl era. The internet cannot tell if I am humble or strategic. NEITHER CAN I. That is the sweet spot.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:milestone:rep-2",
          text: "It was. Ten thousand people follow a girl who films her OFFICE. So the video was the office saying thank you — Burek's tail, the printer's light, the mop in passing, the glass wall stripe, thirty seconds, no talking. The office built my following and the office took the bow. It is my most saved video ever. Gratitude is a format. Nobody talks about that.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:milestone:rep-3",
          text: "They are arbitrary, round, and COMPLETELY real. Numbers do not lie about feelings — hitting ten thousand felt exactly like graduating, exactly like my first paycheck. The milestone is fake, the FEELING is real, and feelings are what content is made of. So yes. They mean everything. And nothing. And everything. Creator math. Do not check my work.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:milestone:rep-4",
          text: "'Good curve.' He saw the GROWTH GRAPH, not the follower count. One line and I understood my own career better than in two years of posting. Anyone can inflate a number. A curve that bends upward means the content is finding people WITHOUT paid help. Dawid complimented the shape of my trust. I have it printed. It is in a frame. It is my favorite frame.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:milestone:rep-5",
          text: "A CARD. Handwritten. 'For services to the company's visibility.' HR does not DO follower milestones and Zosia did it ANYWAY, which means in Zosia's private rubric I have been awarded a work thing for an internet thing and the border between them just became REAL. The card is on my desk. It is the first physical award of my digital career. I am normal about it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:milestone:rep-6",
          text: "The honest one: one post that outlives the platform. Every follower milestone is a lease. One video that a stranger sends to another stranger in five years, with 'remember this?' — THAT is the milestone that cannot be lost in an app store. I am hunting it. I do not know what it looks like. Probably Burek. It is always Burek.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:office-cameos",
      label: "The office cameos",
      optionCandidates: [
        { id: "klaudia:office-cameos:opt-1", topicId: "klaudia:office-cameos", text: "Your content is full of office people. On purpose?" },
        { id: "klaudia:office-cameos:opt-2", topicId: "klaudia:office-cameos", text: "Janusz became an unexpected fan favorite." },
        { id: "klaudia:office-cameos:opt-3", topicId: "klaudia:office-cameos", text: "Przemek demands cameos now. Negotiations?" },
        { id: "klaudia:office-cameos:opt-4", topicId: "klaudia:office-cameos", text: "Someone declined a cameo. Who?" },
        { id: "klaudia:office-cameos:opt-5", topicId: "klaudia:office-cameos", text: "The comments have theories about the 'office universe'." },
        { id: "klaudia:office-cameos:opt-6", topicId: "klaudia:office-cameos", text: "What is the cameo rulebook?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:office-cameos:rep-1",
          text: "Completely on purpose. A solo creator is a monologue. An office is a SITCOM. Burek is the mascot, Janusz is the wise janitor — I mean, he IS — and the comments are now writing FAN THEORY about who waters the plants. Why would I film my lunch alone when the lunchroom is an ensemble cast? The office made my content. The content owes the office. Every frame pays rent.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:office-cameos:rep-2",
          text: "The mop cameo, ONE TIME, and the comments said 'the real MVP' ninety times. He does not know what a follower is. He knows the mop is famous and finds it 'unnecessary but harmless'. His fan account posts stills of his work — clean corners, labeled supplies. Janusz is the internet's accidental grandfather and he has never once read a comment. Legend behavior.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:office-cameos:rep-3",
          text: "He wants a RECURRING segment. 'Sales Wisdom Wednesday.' I said no to Wednesday, yes to cameos, and no to the ring light he bought himself. Then he went LIVE from his own account and got decent numbers, and now we have a CONTENT TREATY — my feed for culture, his feed for deals, one shared Burek universe. He is exhausting. He is family. The treaty holds.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "klaudia:office-cameos:rep-4",
          text: "Dawid. One request, one polite no, and I never asked again. Then I filmed his SHOES walking past frame and the comments said 'is that the CEO' and he said nothing, which in Dawid means the shoes were approved. Some people give you their presence by leaving the room at the exact right time. That is a cameo too. The most expensive one.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:office-cameos:rep-5",
          text: "THE THEORIES. Someone mapped our seating chart from reflections in my glasses. Another one believes Janusz and the squirrel are the same entity — I cannot UNSEE it. The office universe has SHIPPING, theories, and a wiki I do not maintain but I DO read. The comments built a mythology out of my coworkers and honestly? The mythology is ACCURATE. Especially the mop lore.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:office-cameos:rep-6",
          text: "Ask every time. Show the work, not the embarrassment. Blur what a person would not say out loud at lunch. And credit the cameos — Burek gets a tag, Janusz gets a tag, the mop gets a tag, the mop DESERVES a tag. The office lets me film because the office trusts the tag. Trust is the whole contract. The camera is just a witness with good lighting.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:idea-notebook",
      label: "The idea notebook",
      optionCandidates: [
        { id: "klaudia:idea-notebook:opt-1", topicId: "klaudia:idea-notebook", text: "You keep an idea notebook? Physical?" },
        { id: "klaudia:idea-notebook:opt-2", topicId: "klaudia:idea-notebook", text: "The notebook has a rating system for ideas?" },
        { id: "klaudia:idea-notebook:opt-3", topicId: "klaudia:idea-notebook", text: "Your best viral post came from the notebook?" },
        { id: "klaudia:idea-notebook:opt-4", topicId: "klaudia:idea-notebook", text: "Someone read your notebook. Catastrophe?" },
        { id: "klaudia:idea-notebook:opt-5", topicId: "klaudia:idea-notebook", text: "Ania wants to co-author the notebook." },
        { id: "klaudia:idea-notebook:opt-6", topicId: "klaudia:idea-notebook", text: "Teach me to keep an idea notebook." },
      ],
      replyCandidates: [
        {
          id: "klaudia:idea-notebook:rep-1",
          text: "Physical. Pink. Waterproof-ish after The Latte Incident of 2024. The phone notes app is where ideas go to be forgotten politely — buried under groceries and one password I will never recover. Paper stares back. Paper has PAGES, and pages have a beginning, and a beginning shames you into filling them. My notebook is my co-writer. My notebook is IN my bag at all times.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:idea-notebook:rep-2",
          text: "Stars, one to five, judged on two axes: would I post it, and would I still LIKE the post in a year. A five-five is rare and sacred. The sausage heist was five-five. Most ideas are three-twos — postable, forgettable. The notebook taught me that volume is how you find the fives. You cannot think your way to a five. You have to WRITE your way to one.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:idea-notebook:rep-3",
          text: "'Interview your desk.' Page forty-seven, three stars, posted at 7:44 on a whim because the notebook said so. Two million views. People filmed their OWN desks. The notebook wrote a meme and I was just the intern with the ring light. I have stopped doubting the notebook. The notebook has a better instinct for me than I do.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:idea-notebook:rep-4",
          text: "Burek. Knocked it off the desk, opened it with his PAW, and lay on the open page like a dragon on gold. The page said 'Burek ideas' and had SEVENTEEN entries about him. He lay on the evidence. Witnesses say he looked PROUD. I have accepted my notebook is now his. I bought a new one. He will find it. He always finds it. The dragon keeps what the dragon wants.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:idea-notebook:rep-5",
          text: "She wants CO-AUTHORSHIP and I said yes with one rule — separate pages, shared stars. Ania's brain is a brand campaign generator with no off switch. My notebook needs her chaos the way my videos need her laugh. First shared page has three ideas and one of them involves a JINGLE. The notebook is growing authors. The notebook is becoming an ANTHOLOGY.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:idea-notebook:rep-6",
          text: "One rule: never judge an idea on the page where it was born. Write it, star it, TURN THE PAGE. Ideas need distance the way bread needs cooling. Reread every Sunday, star everything again, and watch which ones aged like wine versus milk. The notebook is not for writing. The notebook is for RE-READING. Writing is just how you load the machine.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:storage-full",
      label: "Storage full",
      optionCandidates: [
        { id: "klaudia:storage-full:opt-1", topicId: "klaudia:storage-full", text: "Your phone ran out of storage mid-shoot?" },
        { id: "klaudia:storage-full:opt-2", topicId: "klaudia:storage-full", text: "What do you delete first when storage fills?" },
        { id: "klaudia:storage-full:opt-3", topicId: "klaudia:storage-full", text: "Marek set you up with a backup drive?" },
        { id: "klaudia:storage-full:opt-4", topicId: "klaudia:storage-full", text: "The failed save was during the golden hour?" },
        { id: "klaudia:storage-full:opt-5", topicId: "klaudia:storage-full", text: "Tomek explained compression to you once?" },
        { id: "klaudia:storage-full:opt-6", topicId: "klaudia:storage-full", text: "Is there such a thing as too much footage?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:storage-full:rep-1",
          text: "Mid-take, mid-light, mid-EVERYTHING. The little red bar appeared like a villain in act one. I did the whole save-and-pray dance: kill apps, clear cache, delete one podcast I was saving for a flight. The moment passed. Storage does not care about golden hour. Storage has never seen light in its life.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:storage-full:rep-2",
          text: "Downloads from 2021, screenshots of screenshots, and the folder called 'final_final2_real_final'. The delete is not technical, it is emotional archaeology. Every file is a day I was someone. I keep a folder called 'museum' for the pieces that hurt to lose and I visit it twice a year like a responsible curator.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:storage-full:rep-3",
          text: "He did, one drive, labeled in his little machine font, with a folder structure that made me gasp. 'By year, by campaign, raw separate.' I cried a little. He pretended not to see, which is how engineers hug. The drive has saved three shoots since. Marek does not do content. Marek does memory. Same thing, honestly.",
          relationshipHint: "delighted",
          tags: ["quest:marek-trusted-review"],
        },
        {
          id: "klaudia:storage-full:rep-4",
          text: "It was. Ten minutes of light that happens twice a year, and my phone said 'storage almost full' with the confidence of a weather report. I got forty seconds of usable footage and a lifetime of trust issues. Now I clear space the night before like a pilot checking fuel. Golden hour does not wait for housekeeping.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],
        },
        {
          id: "klaudia:storage-full:rep-5",
          text: "He did, for one hour, with diagrams. Compression is just 'same video, smaller box', and quality is 'how much box you are willing to lose'. He said my 4K files were 'carrying air'. I was offended for a second and then I freed two hundred gigabytes. We speak different languages and the translation is always hard drive space.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "klaudia:storage-full:rep-6",
          text: "Yes, and no, and yes. You shoot everything because the moment you skip is always the moment. But footage you never look at is just guilt with pixels. My rule now: one day of shooting, one evening of deleting. The footage gets to mean something or it gets to leave. Storage is attention. I curate mine.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:caption-drafts",
      label: "Caption drafts",
      optionCandidates: [
        { id: "klaudia:caption-drafts:opt-1", topicId: "klaudia:caption-drafts", text: "Twenty drafts for one caption?" },
        { id: "klaudia:caption-drafts:opt-2", topicId: "klaudia:caption-drafts", text: "Which draft usually wins: funny or honest?" },
        { id: "klaudia:caption-drafts:opt-3", topicId: "klaudia:caption-drafts", text: "Ania read your drafts folder once?" },
        { id: "klaudia:caption-drafts:opt-4", topicId: "klaudia:caption-drafts", text: "The winning caption was the first one?" },
        { id: "klaudia:caption-drafts:opt-5", topicId: "klaudia:caption-drafts", text: "Zosia suggested a caption once and you used it?" },
        { id: "klaudia:caption-drafts:opt-6", topicId: "klaudia:caption-drafts", text: "When do you know a caption is finished?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:caption-drafts:rep-1",
          text: "Twenty is a quiet week. The drafts folder is where my egos live. Draft one is confident, draft four is funny, draft nine is vulnerable, draft fifteen is trying too hard, and draft twenty is just the word 'morning'. The public sees one. The folder sees the whole committee. Every caption is a survivor of an election nobody voted in.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:caption-drafts:rep-2",
          text: "Honest wins long term, funny wins today. I have posted both, tracked both, and the data is not subtle: funny gets saved, honest gets replies. A save is a compliment. A reply is a relationship. I alternate like a DJ. Funny, funny, honest, so the audience never knows which Klaudia arrives, and both of them are telling the truth.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "klaudia:caption-drafts:rep-3",
          text: "She did, and she said my drafts folder 'has better writing than most agencies'. From the marketing queen, that is a knighthood. Then she showed me HER drafts folder and it is the same chaos, just with better punctuation. We are all twenty drafts deep. The feed is a masquerade and every caption is wearing its fourth outfit.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:caption-drafts:rep-4",
          text: "It was. 'Monday.' One word, posted at 8:02, and the comments wrote my whole biography for me. Twenty drafts of poetry and the monosyllable won. There is a lesson there I refuse to learn formally: the audience does not want your best sentence. They want your real one. I keep overwriting it anyway. The committee meets regardless.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "klaudia:caption-drafts:rep-5",
          text: "She did, for the office dog post: 'he works here'. Two words. No emoji. It became our most shared post ever and Zosia said 'short is confident' with the calm of a woman quoting scripture she wrote. I have the screenshot framed in my drafts folder, where all the gods live. The caption gods. They are moody and they love brevity.",
          relationshipHint: "delighted",
          tags: ["quest:zosia-opened-up", "relationship:warm"],
        },
        {
          id: "klaudia:caption-drafts:rep-6",
          text: "When I stop hearing my own voice reading it. There is a moment where the sentence stops being words and becomes a vibe, and the vibe either matches the photo or it does not. If I read it twice and smile once, it ships. If I read it twice and edit twice, it was never a caption. It was an argument. Arguments go to drafts. Ship the smile.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:close-friends",
      label: "The close friends tier",
      optionCandidates: [
        { id: "klaudia:close-friends:opt-1", topicId: "klaudia:close-friends", text: "Your close friends stories are different content?" },
        { id: "klaudia:close-friends:opt-2", topicId: "klaudia:close-friends", text: "The office dog is in the close friends list?" },
        { id: "klaudia:close-friends:opt-3", topicId: "klaudia:close-friends", text: "Someone screenshotted a close friends story?" },
        { id: "klaudia:close-friends:opt-4", topicId: "klaudia:close-friends", text: "Renata is in your close friends?" },
        { id: "klaudia:close-friends:opt-5", topicId: "klaudia:close-friends", text: "Ania wants to collab on a close friends series?" },
        { id: "klaudia:close-friends:opt-6", topicId: "klaudia:close-friends", text: "Is the close friends tier honest or just smaller?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:close-friends:rep-1",
          text: "Different energy, same person. The public grid is the magazine. Close friends is the group chat. Burnt coffee, bad lighting, the real opinion about a trend. The tier is not a secret. It is a volume knob. Everybody has a face for the stage and a face for the kitchen. Mine just have separate notification settings.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:close-friends:rep-2",
          text: "He is not in the list, he IS the list. Burek content is so exclusive it only exists in close friends, where the real ones see him fail to catch the treat. The public sees the majestic office dog. My close friends see the same dog missing a treat by a meter and looking at me like I threw it wrong. THAT is the premium tier.",
          relationshipHint: "delighted",
          tags: ["quest:burek-person"],
        },
        {
          id: "klaudia:close-friends:rep-3",
          text: "They did, and it was the burnt coffee one, and it reached a group chat I will not name. I learned the tier is trust, not security. Nothing digital is a whisper. So now the close friends rule is: post what you would say at a table, never what you would say in a bedroom. Tables can handle leaks. Bedrooms cannot.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:close-friends:rep-4",
          text: "She is, and she replies to every single one with a full sentence like it is 2012. No emojis from Renata, just 'you looked tired, eat something'. The tier is worth it for her replies alone. Social media gave me a room. Renata turned it into a kitchen. I keep posting the real stuff mostly so she can mother me in the comments.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:renata-tut-finished"],
        },
        {
          id: "klaudia:close-friends:rep-5",
          text: "She does, a behind-the-brand series where she is softer and funnier than her grid allows. Her close friends voice is a person, not a department. I said yes before she finished the pitch. Two marketers being honest about marketing is either genius or a threat to the industry. The first episode tested both. The numbers said genius.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:close-friends:rep-6",
          text: "Smaller and honest are the same thing when you choose the audience. On the grid I am performing for strangers who might become clients. In close friends I am talking to forty people whose names I know. That is not a smaller version of me. That is the me that does not need to scale. Scale is for products. People should stay artisanal.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:app-subscriptions",
      label: "App subscriptions",
      optionCandidates: [
        { id: "klaudia:app-subscriptions:opt-1", topicId: "klaudia:app-subscriptions", text: "How many editing apps do you pay for monthly?" },
        { id: "klaudia:app-subscriptions:opt-2", topicId: "klaudia:app-subscriptions", text: "The free version of the editing app is enough?" },
        { id: "klaudia:app-subscriptions:opt-3", topicId: "klaudia:app-subscriptions", text: "You forgot a subscription for a whole year?" },
        { id: "klaudia:app-subscriptions:opt-4", topicId: "klaudia:app-subscriptions", text: "Grazyna audits your app subscriptions?" },
        { id: "klaudia:app-subscriptions:opt-5", topicId: "klaudia:app-subscriptions", text: "Tomek suggested canceling half of them?" },
        { id: "klaudia:app-subscriptions:opt-6", topicId: "klaudia:app-subscriptions", text: "Which subscription would you never drop?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:app-subscriptions:rep-1",
          text: "Six. One editor, one planner, one caption helper, one analytics, one font app I am emotionally attached to, and one mystery charge I have been meaning to investigate since spring. Every creator has a subscription graveyard. Mine has a gift shop. Each app promised to save time. Together they cost the exact amount of time they saved.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:app-subscriptions:rep-2",
          text: "The free version is the app wearing a coat with no pockets. You can walk, but you cannot carry anything. The export watermark is a tax on being free. I paid for one editor and I use its free tier on my phone for stories. Both are true. The paid one is my job. The free one is my mood.",
          relationshipHint: "neutral",
        },
        {
          id: "klaudia:app-subscriptions:rep-3",
          text: "I did. A font app. Twelve months, auto-renewed, discovered during a bank statement spiral at midnight. I used it twice. The guilt lasted a week, which at my hourly rate is the most expensive font in the office. It is cancelled now. The font still appears in my old stories like an ex in the background of a photo.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:app-subscriptions:rep-4",
          text: "She does, quarterly, with a spreadsheet that has a column called 'justification'. Her face when I justify the font app. Her OTHER face when I could not justify the mystery charge. The subscriptions survived the audit, the mystery charge did not, and the word 'recurring' has never felt so judicial. My apps fear the first of the month now.",
          relationshipHint: "annoyed",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "klaudia:app-subscriptions:rep-5",
          text: "He did, with a chart. Usage versus cost, sorted, brutal. Three apps I had not opened since the trend died. He was right and I hated it and I cancelled two on the spot and kept one out of spite, which he predicted. 'You will keep one out of spite.' The man knows creators like a vet knows animals. The chart is on my wall now. Spite fuels it.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "klaudia:app-subscriptions:rep-6",
          text: "The editor, because it is the kitchen. Everything else is a gadget, but the editor is where the footage becomes content. I would cancel the planner, the analytics, the caption helper and my own pride before the editor. Ania once said 'the tool pays for itself by Thursday'. She was right by Tuesday. Some subscriptions are salaries for tools that work.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:camera-roll",
      label: "The camera roll",
      optionCandidates: [
        { id: "klaudia:camera-roll:opt-1", topicId: "klaudia:camera-roll", text: "Twelve thousand photos on your phone?" },
        { id: "klaudia:camera-roll:opt-2", topicId: "klaudia:camera-roll", text: "Do you scroll your own camera roll?" },
        { id: "klaudia:camera-roll:opt-3", topicId: "klaudia:camera-roll", text: "There is a folder just for lighting tests?" },
        { id: "klaudia:camera-roll:opt-4", topicId: "klaudia:camera-roll", text: "The roll has one photo from every office party?" },
        { id: "klaudia:camera-roll:opt-5", topicId: "klaudia:camera-roll", text: "Ania asked for the raw archive once?" },
        { id: "klaudia:camera-roll:opt-6", topicId: "klaudia:camera-roll", text: "What happens to the camera roll when it is full?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:camera-roll:rep-1",
          text: "Twelve thousand and proud, actually. My camera roll is the only honest autobiography that exists. Every filter phase, every lighting obsession, every dog, every coffee. People say clean it up. I say the mess is the memoir. Somewhere in there is the exact day I got good. I can find it by scrolling. The scroll is a time machine with a search bar.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:camera-roll:rep-2",
          text: "Weekly, like watering a plant. I scroll back one month and one year. One month for lessons, one year for proof of growth. Last year's me was shooting in a dark corner with the ring light missing my face. This year's me found the window. The roll is the receipt. Progress you can swipe through hits different than progress you just believe in.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:camera-roll:rep-3",
          text: "A whole folder. Face to the window, face to the lamp, face to the fridge light during a power outage that one desperate Tuesday. The lighting tests look identical to everyone and completely different to me. That folder is my craft. Anyone can photograph a moment. Only the obsessed photograph the light first, on purpose, with a notebook.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:camera-roll:rep-4",
          text: "Every party, one photo, same corner, same angle. It started as a joke and now it is the office's visual calendar. Zosia's speech, Marek's cake, the year the printer got decorated. One photo each, no faces ruined, pure vibes. Ania wants the series for the anniversary post. The series is accurate. The series is load-bearing.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:camera-roll:rep-5",
          text: "She did, for the rebrand shoot, and I gave her everything. Raw folder, no filters, the ugly lighting tests, the outtakes of me falling off the chair. She said 'the outtakes are the brand'. She used one blurry laughing photo as the hero image and it worked better than anything staged. Trusting a marketer with your raw folder is trust. It paid.",
          relationshipHint: "delighted",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "klaudia:camera-roll:rep-6",
          text: "The cloud eats it, and I let it, and I hate it a little. The cloud version is not mine, it is a subscription wearing my photos. But twelve thousand files need a home with air conditioning. So: cloud for the archive, phone for the current month, and the museum folder backed up twice because some things are not scalable. The roll is never full. It is just redistributed.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:ad-disclosure",
      label: "The ad disclosure",
      optionCandidates: [
        { id: "klaudia:ad-disclosure:opt-1", topicId: "klaudia:ad-disclosure", text: "You tag sponsored posts with the whole ruleset?" },
        { id: "klaudia:ad-disclosure:opt-2", topicId: "klaudia:ad-disclosure", text: "A brand asked you to hide the disclosure?" },
        { id: "klaudia:ad-disclosure:opt-3", topicId: "klaudia:ad-disclosure", text: "The audience thanked you for a clear #ad?" },
        { id: "klaudia:ad-disclosure:opt-4", topicId: "klaudia:ad-disclosure", text: "Ania has a disclosure template for collabs?" },
        { id: "klaudia:ad-disclosure:opt-5", topicId: "klaudia:ad-disclosure", text: "Zosia asked what the disclosure costs the brand?" },
        { id: "klaudia:ad-disclosure:opt-6", topicId: "klaudia:ad-disclosure", text: "Is disclosure bad for engagement, honestly?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:ad-disclosure:rep-1",
          text: "Full ruleset, first line, plain words. Paid partnership, gifted, or my own opinion. The tag costs me nothing and buys everything: my audience knows that when I say a coffee is good, the coffee paid me in coffee or in money, and both are visible. Trust is the only currency that does not do chargebacks. I protect mine like Grazyna protects the stamp.",
          relationshipHint: "pleased",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "klaudia:ad-disclosure:rep-2",
          text: "They did. 'Make it small, bottom corner, low opacity.' I declined in one message, warm as toast, immovable as a wall. The brand found someone else. My audience found out anyway, because the internet always finds out. My comments that week were a parade of people saying 'glad she said no'. A refusal is content. The best one I never posted.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:ad-disclosure:rep-3",
          text: "They did, in numbers. The disclosed post had fewer clicks and more saves. Fewer clicks, more saves means: fewer strangers, more believers. I screenshotted the analytics and sent it to Ania with the caption 'the metric that matters'. Saves are people filing you under 'trusted'. Clicks are people walking past a shop window. I run a shop, not a window.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:ad-disclosure:rep-4",
          text: "She does, three tiers: full partner, gifted, and 'I bought this myself and I am obsessed'. Each one has exact wording so I never have to think while excited. Her template has saved me from two ambiguous deals and one 11pm post I would have regretted. Marketing has ethics departments. Ours is one woman with a template and a spine.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:ad-disclosure:rep-5",
          text: "She did, in a board voice: 'what does transparency cost them?' I said 'a few clicks'. She said 'and what does hiding it cost us, if it surfaces?' I said 'everything'. She nodded once, wrote 'disclosure is insurance' on a sticky note, and that note is now taped inside my ring light box. Zosia does not do social media. Zosia does risk. Same math.",
          relationshipHint: "pleased",
          tags: ["quest:zosia-opened-up"],
        },
        {
          id: "klaudia:ad-disclosure:rep-6",
          text: "Short term, a little. Long term, it is the whole engine. Undisclosed posts are sugar: spike, crash, distrust. Disclosed posts are bread. My audience knows that if I tag it, the tag is the worst thing about the product. The day I hide an ad is the day every honest post becomes suspect. One hide costs a hundred posts. The math is brutal and clear.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:second-viral",
      label: "The second viral",
      optionCandidates: [
        { id: "klaudia:second-viral:opt-1", topicId: "klaudia:second-viral", text: "Everyone asks about the next viral post?" },
        { id: "klaudia:second-viral:opt-2", topicId: "klaudia:second-viral", text: "You tried to recreate the viral one on purpose?" },
        { id: "klaudia:second-viral:opt-3", topicId: "klaudia:second-viral", text: "The office treats virality like weather now?" },
        { id: "klaudia:second-viral:opt-4", topicId: "klaudia:second-viral", text: "Ania says virality is not a strategy?" },
        { id: "klaudia:second-viral:opt-5", topicId: "klaudia:second-viral", text: "The second viral hit was about the office?" },
        { id: "klaudia:second-viral:opt-6", topicId: "klaudia:second-viral", text: "Does the algorithm owe you anything?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:second-viral:rep-1",
          text: "The question lives in my mentions permanently. 'When is the next one?' The honest answer is that the first one was lightning wearing my shoes. Chasing it makes content smell like chasing. My job is to be excellent weekly and let the lightning know where I stand. Lightning has a schedule. The schedule is: never, and then suddenly.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:second-viral:rep-2",
          text: "I did. Same format, same song, same energy, and the numbers looked at it and said 'we have seen this'. The recreation got a polite fraction. That is when I understood: the viral one worked because it was TRUE that day. Recreating a true moment is acting. My audience can smell acting through the phone. I buried the attempt in the drafts folder of shame.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:second-viral:rep-3",
          text: "They do, and it is adorable. When numbers spike, Janusz asks if 'the internet is happening again'. Zosia asks if it is the good kind or the loud kind. The office treats my virality like a weather app they do not personally use but respect. 'Big wind today?' Yes, Janusz. Big wind. The dog gained four thousand followers. He does not know. He would not care.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:second-viral:rep-4",
          text: "She says virality is a bonus, never a plan, and she is right in the way that hurts. Her line: 'you cannot budget lightning, but you can build the tower.' So I build the tower. Consistent posts, honest voice, decent light. The viral one found me because the tower was tall. The tower is the strategy. The lightning is the vacation.",
          relationshipHint: "pleased",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "klaudia:second-viral:rep-5",
          text: "It was, and that is why it worked. The printer decorated for Christmas, one slow pan, Burek's tail in frame. The internet met my actual office and recognized something true in it. Two million people saw our radiator and our tape and our weird little kitchen. The comments said 'I want to work here'. HR still mentions it. The algorithm can keep its dances. I have a radiator.",
          relationshipHint: "delighted",
        },
        {
          id: "klaudia:second-viral:rep-6",
          text: "It does not, and believing it does is how creators rot. The algorithm is a vending machine that changes its buttons. Some weeks it likes consistency, some weeks it likes chaos, and it never explains. I do not owe it and it does not owe me. I bring the snack, it brings the crowd, and when the machine changes I bring a different snack. The audience is the only constant.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:team-series",
      label: "The team series",
      optionCandidates: [
        { id: "klaudia:team-series:opt-1", topicId: "klaudia:team-series", text: "Nobody wants to be in the meet-the-team series?" },
        { id: "klaudia:team-series:opt-2", topicId: "klaudia:team-series", text: "Tomek refused to be interviewed for it?" },
        { id: "klaudia:team-series:opt-3", topicId: "klaudia:team-series", text: "Janusz's episode went viral though?" },
        { id: "klaudia:team-series:opt-4", topicId: "klaudia:team-series", text: "Zosia approved the questions list?" },
        { id: "klaudia:team-series:opt-5", topicId: "klaudia:team-series", text: "Ania wants to script the episodes?" },
        { id: "klaudia:team-series:opt-6", topicId: "klaudia:team-series", text: "Why does a team series matter at all?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:team-series:rep-1",
          text: "The first recruitment round was me standing in the kitchen asking 'who wants to be famous' to people holding spoons. The silence had layers. People hear 'meet the team' and think LinkedIn cringe. So I changed the pitch: not a profile, a shelf. Show me the one object on your desk that explains you. Everyone has one. Everyone said yes to that.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:team-series:rep-2",
          text: "He refused in writing, politely, with reasons, like a diplomatic note. 'My work speaks. I do not.' I could not argue with it because it is perfect, so I negotiated: one shot of his hands on the keyboard, no face. That episode outperformed mine. The comments said 'mysterious'. The comments said 'respect'. Refusal is content if the refusal is principled.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "klaudia:team-series:rep-3",
          text: "It did, and the internet met Janusz and lost its collective mind. He discussed the boiler like a philosopher king, said 'the building tells you things if you arrive early', and left the frame without a goodbye. Eleven million views. Journalists asked for an interview. He said the boiler does not do press. The episode is studied in two marketing courses.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:team-series:rep-4",
          text: "She did, and she removed one question and added one. Removed: 'where do you see yourself in five years', which she called 'a question for forms'. Added: 'what does this office do better than anywhere else', which she called 'a question for people'. The answers got better that day. Zosia edits like a gardener. Nothing loud. Just pruning.",
          relationshipHint: "pleased",
          tags: ["quest:zosia-opened-up"],
        },
        {
          id: "klaudia:team-series:rep-5",
          text: "She offered, with a full script, hooks, and structure. I read it, loved it, and said no, because the series works BECAUSE people fumble. The stumbles are the content. A scripted Janusz would have been a stranger. Ania took it well, then asked to script the intro card only, one sentence per episode. That we did. Her sentence, our truth.",
          relationshipHint: "pleased",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "klaudia:team-series:rep-6",
          text: "Because the grid shows work and the series shows people, and clients hire people. We booked two contracts where the client mentioned the series in the first call. They felt like they already knew us. Marketing cannot buy that feeling. Only Tuesday energy can. The series is the office being findable. That is all any of this is. Findable, warm, and slightly dusty, like us.",
          relationshipHint: "pleased",
          tags: ["quest:got-acme-contract"],
        },
      ],
    },
    {
      id: "klaudia:export-bar",
      label: "The export bar",
      optionCandidates: [
        { id: "klaudia:export-bar:opt-1", topicId: "klaudia:export-bar", text: "The export bar is at 80 percent and frozen?" },
        { id: "klaudia:export-bar:opt-2", topicId: "klaudia:export-bar", text: "You exported three times for one post?" },
        { id: "klaudia:export-bar:opt-3", topicId: "klaudia:export-bar", text: "Marek gave your laptop more RAM for exports?" },
        { id: "klaudia:export-bar:opt-4", topicId: "klaudia:export-bar", text: "The failed export corrupted the whole project?" },
        { id: "klaudia:export-bar:opt-5", topicId: "klaudia:export-bar", text: "Tomek says export settings are 'just numbers'?" },
        { id: "klaudia:export-bar:opt-6", topicId: "klaudia:export-bar", text: "What do you do during the export wait?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:export-bar:rep-1",
          text: "Frozen at 80, the sacred number, every creator's personal purgatory. I have watched that bar like it owes me rent. You cannot help it. You cannot rush it. You can only age. The bar does not care about your posting schedule or the trend window. The bar is time itself, wearing a progress costume. I have made peace with 80. I check it anyway. Every twenty seconds.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:export-bar:rep-2",
          text: "Three exports, one post, because the first was the wrong ratio, the second had the old caption baked in, and the third was perfect at 23:40. The post still did numbers because the internet does not know what time it is. But I know. I know it cost me two exports and a small piece of my evening. The lesson, which I relearn monthly: check the ratio before the render. Never after.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:export-bar:rep-3",
          text: "He did, one stick, installed in eleven minutes while narrating like a surgeon. The export bar went from 'meditation retreat' to 'reasonable errand'. He asked what I edit and optimized settings I did not know existed. My laptop now exports like a machine that respects my deadlines. Marek does not do content. Marek does minutes. The minutes are my whole life.",
          relationshipHint: "delighted",
          tags: ["quest:marek-trusted-review"],
        },
        {
          id: "klaudia:export-bar:rep-4",
          text: "It did, one Tuesday, and I lost the whole edit because I am a person who does not save incrementally. The file opened as a blank apology. I rebuilt it in ninety minutes from memory, better, because grief is an editor. Now I save like Grazyna counts: constantly, in duplicates, with names and dates. The corrupted file is still in a folder called 'never again'.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:export-bar:rep-5",
          text: "He does, one session, and halved my export time with three numbers: bitrate, keyframes, and one checkbox he described as 'the one that matters'. He was right. He is always right in the most unbothered way. My exports are now 'just numbers' that behave. I framed nothing. He would hate framing. I said thank you twice, which for us is a ceremony.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "klaudia:export-bar:rep-6",
          text: "The sacred waiting rituals: make tea, water the desk plant, answer two messages I have been avoiding. The export is the only time my job makes me wait, so I let it. Ten minutes of forced stillness in a scrolling life. Sometimes the caption fix arrives during the wait. The bar is a timer for thinking. I would not shorten it much. Do not tell Marek.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "klaudia:ghost-followers",
      label: "The ghost followers",
      optionCandidates: [
        { id: "klaudia:ghost-followers:opt-1", topicId: "klaudia:ghost-followers", text: "Your follower count went up but engagement dropped?" },
        { id: "klaudia:ghost-followers:opt-2", topicId: "klaudia:ghost-followers", text: "You purge inactive followers?" },
        { id: "klaudia:ghost-followers:opt-3", topicId: "klaudia:ghost-followers", text: "Ania says ghosts inflate your media kit?" },
        { id: "klaudia:ghost-followers:opt-4", topicId: "klaudia:ghost-followers", text: "The bot wave followed everyone that week?" },
        { id: "klaudia:ghost-followers:opt-5", topicId: "klaudia:ghost-followers", text: "Tomek analyzed your follower data once?" },
        { id: "klaudia:ghost-followers:opt-6", topicId: "klaudia:ghost-followers", text: "Does follower count mean anything anymore?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:ghost-followers:rep-1",
          text: "The classic ghost wave: count up, engagement flat, the algorithm confused about what to serve whom. My audience is suddenly forty percent strangers who never breathe. The math gets haunted. I do not panic, I diagnose: check the new followers, check the unfollows, and remember that the real ones are counted in replies, not in numbers. Ghosts do not type.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:ghost-followers:rep-2",
          text: "I never purge, actually, and here is why: the ghost today is the lurker tomorrow. Half my best commenters followed silently for a year before their first reply. Purging ghosts is purging future friends. I clean bots, yes, obviously, the ones selling crypto in broken Polish. But quiet humans stay. Quiet is not dead. Quiet is reading.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:ghost-followers:rep-3",
          text: "She does, and it changed my media kit forever. Brands see the number. Ania makes them see the number TIMES the engagement rate, which is the real number. She calls ghosts 'inflated furniture' and removes them from the pitch. My media kit is smaller and prouder. Brands trust it more, because the kit trusts itself. Ania sells truth and it looks like marketing.",
          relationshipHint: "pleased",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "klaudia:ghost-followers:rep-4",
          text: "It did, and for one week every account had new followers named like keyboard accidents. My post about the office plant got bot comments saying 'Amazing!' with three fire emojis. I felt famous and haunted simultaneously. The platforms cleaned it in a week. The ghosts left. The plant post kept the real comments, which were better anyway. One said 'I also have this plant'.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "klaudia:ghost-followers:rep-5",
          text: "He did, one evening, with a spreadsheet my analytics app should be embarrassed by. He found my real audience peak, my dead hours, and the exact percentage of ghosts. Then he said 'the ghosts cost nothing, ignore them'. The most technical man in the building gave me the most emotional advice: ignore the numbers that do not breathe. It reframed everything.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "klaudia:ghost-followers:rep-6",
          text: "It is a door sign, not a verdict. The number tells a brand how big the room is. The comments tell you if the room is alive. I have seen fifty-thousand-follower accounts feel like empty parking lots, and four-thousand accounts feel like family dinners. I would take the dinner. Brands are learning to smell the difference. The dinner smells like bread.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:link-in-bio",
      label: "The link in bio",
      optionCandidates: [
        { id: "klaudia:link-in-bio:opt-1", topicId: "klaudia:link-in-bio", text: "Your link in bio is a whole landing page now?" },
        { id: "klaudia:link-in-bio:opt-2", topicId: "klaudia:link-in-bio", text: "One link, one destination, or a directory?" },
        { id: "klaudia:link-in-bio:opt-3", topicId: "klaudia:link-in-bio", text: "Ania designed the link page for you?" },
        { id: "klaudia:link-in-bio:opt-4", topicId: "klaudia:link-in-bio", text: "Marek tracks clicks from the bio link?" },
        { id: "klaudia:link-in-bio:opt-5", topicId: "klaudia:link-in-bio", text: "The link broke during the brand campaign?" },
        { id: "klaudia:link-in-bio:opt-6", topicId: "klaudia:link-in-bio", text: "What belongs behind the link and what stays out?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:link-in-bio:rep-1",
          text: "It is a tiny shop window: three buttons, one photo, no clutter. Every creator goes through the link-in-bio puberty: first it is one link, then it is nine, then it is a mall, then you get sick and it is three again. The three are my work, the dog, and the newsletter nobody reads but everybody respects. Curated like a shelf. Dust it weekly.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:link-in-bio:rep-2",
          text: "One destination during campaigns, directory in normal life. The mistake every creator makes is permanent clutter. The link in bio is a storefront, and you change the window with the season. Campaign week: one door, one place, full commitment. Regular weeks: the little directory, honest and tidy. The link is the only real estate I own. I renovate often and cheaply.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:link-in-bio:rep-3",
          text: "She did, unasked, at 11pm, and sent it with 'fixed your window'. My link page went from 'enthusiastic' to 'editorial' in one night. Button hierarchy, one accent color, my face in the corner not the center. She understood that the link is a handshake and handshakes should not be neon. I use her version. I credit her constantly. She pretends it was nothing. It was everything.",
          relationshipHint: "delighted",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "klaudia:link-in-bio:rep-4",
          text: "He does, quietly, with a chart he sent at 7am labeled 'bio clicks, last 90 days'. I learned that the dog button outperforms my portfolio two to one. The data is humbling and clarifying. The audience does not want my CV. The audience wants the dog. I reordered the buttons accordingly. Marek does not even follow me. He just does infrastructure for the family.",
          relationshipHint: "pleased",
          tags: ["quest:marek-trusted-review"],
        },
        {
          id: "klaudia:link-in-bio:rep-5",
          text: "It did, mid-campaign, because the platform renamed a button. Two days of my biggest push pointing at an error page. I found out from a comment saying 'link is broken love'. That comment got fifty replies of thanks. The internet watches your front door more than you do. Now I click my own bio link every Monday like checking the locks. Paranoia is maintenance.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:link-in-bio:rep-6",
          text: "Behind the link: the work, the ways to hire me, and one piece of joy. Out of the link: my opinions about other people's work, my bad days, and anything I would not say at the office kitchen. The link is my professional face at scale. The face has boundaries. The boundary is the kitchen test. If I would say it to Renata over coffee, it can go behind the link.",
          relationshipHint: "pleased",
          tags: ["quest:renata-tut-finished"],
        },
      ],
    },
    {
      id: "klaudia:first-post",
      label: "The first post",
      optionCandidates: [
        { id: "klaudia:first-post:opt-1", topicId: "klaudia:first-post", text: "Do you remember your first post ever?" },
        { id: "klaudia:first-post:opt-2", topicId: "klaudia:first-post", text: "The first post was blurry and you loved it?" },
        { id: "klaudia:first-post:opt-3", topicId: "klaudia:first-post", text: "Three people liked it and one was your mom?" },
        { id: "klaudia:first-post:opt-4", topicId: "klaudia:first-post", text: "The first post is still on the grid?" },
        { id: "klaudia:first-post:opt-5", topicId: "klaudia:first-post", text: "Ania says every account has an awkward phase?" },
        { id: "klaudia:first-post:opt-6", topicId: "klaudia:first-post", text: "Would you tell a beginner to delete their early posts?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:first-post:rep-1",
          text: "Every frame. A coffee cup on my student desk, a filter that made everything orange, and a caption with five hashtags because a girl on a tutorial said five was the magic number. The coffee was cold. The light was a ceiling bulb. I remember thinking 'this is my work now'. It was not. It was my first step on a very long staircase, and the staircase was invisible from step one.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:first-post:rep-2",
          text: "Blurry, warm, and somehow exactly my style two years before I had a style. I look at it now and I see everything I was trying to do, failing, and doing anyway. The blur is motion. The orange is optimism. Some first posts are embarrassing. Mine is a fossil of an instinct. The instinct turned out to be right. The execution took a decade to catch up. That is the normal order.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:first-post:rep-3",
          text: "Three likes. Mom, my cousin, and a girl from school I have not spoken to since. Mom commented 'beautiful!' with three exclamation marks on a photo of a cold coffee. You know what? She was right. It was beautiful. It was the bravest cup of coffee I ever posted. Every creator builds on a comment from their mother. The ones who deny it are lying.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:first-post:rep-4",
          text: "Still up, still orange, still blurry. It is my first post and my anchor and my proof. When brands ask for results I show them charts. When beginners ask for hope I show them the coffee. The grid is a highlight reel for everyone else and a growth ring for me. Delete the first post? Delete the proof that I started. Over my ring light.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:first-post:rep-5",
          text: "She does, and she showed me hers: hospital-tile grey, a stock photo, and a caption that sounds like a bank. Two years of awkward before her voice arrived. It was the most reassuring thing she has ever shown me, and she once talked me out of a rebrand. Every grid has a chrysalis phase. The ones who hide it pretend they were born with wings. We know better.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:first-post:rep-6",
          text: "Never. The early posts are your evidence of starting, and starting is the hardest asset to prove. I tell beginners: keep the orange coffee. In five years it will be your favorite post, not because it is good, but because it is PROOF. Proof that you began before you were good. Nobody can take that post from you. Not even you, especially on a bad day.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:rival-watching",
      label: "Rival watching",
      optionCandidates: [
        { id: "klaudia:rival-watching:opt-1", topicId: "klaudia:rival-watching", text: "Do you check other local creators' accounts?" },
        { id: "klaudia:rival-watching:opt-2", topicId: "klaudia:rival-watching", text: "A rival copied your whole series concept?" },
        { id: "klaudia:rival-watching:opt-3", topicId: "klaudia:rival-watching", text: "You congratulated a rival on a good post?" },
        { id: "klaudia:rival-watching:opt-4", topicId: "klaudia:rival-watching", text: "Ania says watch trends, not rivals?" },
        { id: "klaudia:rival-watching:opt-5", topicId: "klaudia:rival-watching", text: "Tomek called rival-watching 'monitoring the competition'?" },
        { id: "klaudia:rival-watching:opt-6", topicId: "klaudia:rival-watching", text: "When does watching become poisoning?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:rival-watching:rep-1",
          text: "I do, with a timer, because rival-watching is salt: a little flavors your work, a lot ruins your appetite. Every other Thursday, ten minutes, the same three accounts. I note what works for them and I close the app before the spiral starts. The spiral is always one swipe away. The timer is my seatbelt. Local creators are my colleagues AND my mirrors.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:rival-watching:rep-2",
          text: "She did, concept and hook and even the desk corner. My first reaction was fire. My second reaction, one day later, was note-taking, because her version found an audience mine never touched. I did a video saying 'a creator I admire tried my format, here is what she did better'. It became my most respected post.Copying is theft. Copying out loud is a genre. Choose the genre.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:rival-watching:rep-3",
          text: "I did, genuinely, on her lighting reel, and it undid something in both of us. She replied with a voice note, we talked for forty minutes, and now we send each other brand red flags. The rivalry dissolved into a guild. There are enough strangers on the internet. Colleagues are rare. One genuine comment converted a rival into infrastructure.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "klaudia:rival-watching:rep-4",
          text: "She does, with a folder called 'trends, not threats'. Her rule: study the pattern, never the person. The rival who wins this month is a symptom. The trend they are riding is the disease, and you can catch the disease legally. I check her folder more than I check rivals now. It is rival-watching with the poison removed. Ania distills everything. Even envy.",
          relationshipHint: "pleased",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "klaudia:rival-watching:rep-5",
          text: "He did, in his flat voice: 'monitoring the competition is reconnaissance, doomscrolling them is surveillance of your own insecurity.' One sentence, my whole habit explained. He was reading a book about military strategy while I complained about a girl with better transitions. He was right about both of us. I monitor now. The timer does the rest.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "klaudia:rival-watching:rep-6",
          text: "When you start changing YOUR work to answer THEIR work. The moment my caption drafts mention another account, the watching has moved in and is eating my fridge. Signs: posting at their times, chasing their topics, feeling bad on their good days. I have been poisoned before. The antidote is embarrassing and effective: post three things only you could make.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "klaudia:sound-licensing",
      label: "The sound licensing",
      optionCandidates: [
        { id: "klaudia:sound-licensing:opt-1", topicId: "klaudia:sound-licensing", text: "The trending sound got your video muted?" },
        { id: "klaudia:sound-licensing:opt-2", topicId: "klaudia:sound-licensing", text: "Business accounts cannot use trending sounds?" },
        { id: "klaudia:sound-licensing:opt-3", topicId: "klaudia:sound-licensing", text: "You licensed one song properly for a client?" },
        { id: "klaudia:sound-licensing:opt-4", topicId: "klaudia:sound-licensing", text: "Ania sources royalty-free tracks for everyone?" },
        { id: "klaudia:sound-licensing:opt-5", topicId: "klaudia:sound-licensing", text: "Tomek explains licensing like system licenses?" },
        { id: "klaudia:sound-licensing:opt-6", topicId: "klaudia:sound-licensing", text: "Would you rather have trending reach or safe sound?" },
      ],
      replyCandidates: [
        {
          id: "klaudia:sound-licensing:rep-1",
          text: "Muted mid-trend, my best transition replaced by silence. The video moved like a silent film and the comments said 'why is there no sound'. BECAUSE THE SKY DECIDED, CAROL. Licensing is the invisible wall of this whole industry: the song was fine Monday and contraband Tuesday. I now read platform music pages like legal documents, because they are.",
          relationshipHint: "annoyed",
        },
        {
          id: "klaudia:sound-licensing:rep-2",
          text: "They cannot, and it is the biz-account tax. The trending sound is the party and business accounts watch through the window with a clipboard. My workaround is the library: platforms have licensed tracks nobody uses because they are not trendy. Unpopular and legal beats popular and muted. I find bangers in the boring library. The library loves me back.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:sound-licensing:rep-3",
          text: "I did, for the client campaign: one song, one license, one invoice that made me sit down. Thirty seconds of music cost more than my ring light, my tripod, and my dignity combined. But the campaign ran on THEIR channels, worldwide, legal as a passport. The client renewed. Now I say it in every workshop: the song is not free. The song was never free. Somebody's aunt wrote it.",
          relationshipHint: "pleased",
        },
        {
          id: "klaudia:sound-licensing:rep-4",
          text: "She does, a shared drive of cleared tracks sorted by mood, with names like 'hopeful ukulele but make it cool'. The drive is creator infrastructure. Every office video, every team series intro, everything safe and licensed and good. She updates it monthly like a subscription to sanity. Ania's drive has saved more content than any app I pay for.",
          relationshipHint: "delighted",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "klaudia:sound-licensing:rep-5",
          text: "He did, and the analogy was perfect: 'a platform license is a user seat, a commercial license is a server deployment, and a sync license is when the vendor ships your code inside their product.' I understood music law for the first time in my life. He mapped copyright onto infrastructure and my brain accepted it instantly. He explains my world better than my world does.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "klaudia:sound-licensing:rep-6",
          text: "Trending reach feeds the algorithm. Safe sound feeds the career. Muted videos do not sell a mute product. My rule: trending sounds for the fun posts, licensed or platform-library sound for anything with a client attached, my own voiceover for anything I am proud of. Reach is weather. Rights are climate. I dress for both but I build for climate.",
          relationshipHint: "pleased",
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

/**
 * WS5 dialogue v2 pool — Przemek, Sales (C-77).
 *
 * Pure authored data. Topics: the bootcamp (five days, sixty leaders, one
 * weekend sold as 'immersive'), the robot question (TrainerBot 3000 is a
 * Roomba with a lanyard and a recurring calendar invite), and the craft
 * (a promise is a first draft). Task offer: write the element-one
 * redirect line (sets the existing `przemek-robot-plan` flag). Tone
 * matches his legacy trees: Big fan. HUGE fan. The bar is on the floor —
 * walk over it in good shoes.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const PRZEMEK_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "przemek",
  topics: [
    {
      id: "przemek:bootcamp",
      label: "The bootcamp",
      optionCandidates: [
        {
          id: "przemek:bootcamp:opt-1",
          topicId: "przemek:bootcamp",
          text: "Five days, sixty leaders. How did this happen?",
        },
        {
          id: "przemek:bootcamp:opt-2",
          topicId: "przemek:bootcamp",
          text: "A weekend you sold as 'immersive'? Really?",
        },
        {
          id: "przemek:bootcamp:opt-3",
          topicId: "przemek:bootcamp",
          text: "What did the client's ex-wife's company do?",
        },
        {
          id: "przemek:bootcamp:opt-4",
          topicId: "przemek:bootcamp",
          text: "The last trainer was cancelled for 'too many words'?",
        },
        {
          id: "przemek:bootcamp:opt-5",
          topicId: "przemek:bootcamp",
          text: "Can we cap the room at forty?",
        },
        {
          id: "przemek:bootcamp:opt-6",
          topicId: "przemek:bootcamp",
          text: "What do I get if the bootcamp lands?",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:bootcamp:rep-1",
          text: "Honestly? Enthusiasm, a whiteboard, and a client who said 'can anyone teach AI?' — and I said 'THE best one' and pointed at you. You were in a meeting. Your calendar said 'busy', which I read as 'available for greatness'. Sales is reading the room. The room was you.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:bootcamp:rep-2",
          text: "Immersive means the learning does not stop at five, because the learning NEVER stops — it is on the flyer. Also the venue gave us the weekend rate. Immersion has a price and the price is invoiced as a discount. Everyone wins, mostly the invoice.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:bootcamp:rep-3",
          text: "Sold training to the ex-wife's company, which the client's lawyer calls 'a conflict' and I call 'market coverage'. Legally I have decided the companies are separate. Legally is a spectrum, like transparency. We are on the brave end.",
          relationshipHint: "neutral",
          tags: ["quest:przemek-bootcamp-sold", "relationship:neutral"],
        },
        {
          id: "przemek:bootcamp:rep-4",
          text: "TRUE. Cancelled on day two for 'using too many words'. The bar is on the floor and I have brought good shoes to walk over it. Your opening line should be seven words or fewer. Do it in three and the contract triples. That is not a joke, that is attention economics.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:bootcamp:rep-5",
          text: "Cap at forty? The room holds sixty, the flyer says 'exclusive', and exclusive means we COULD have fit more. I will tell them enrollment is capped — capped AT sixty, which is a cap the way the ocean is a puddle. Words, my friend. Words are the venue.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:bootcamp:rep-6",
          text: "If it lands, you go on the DO-NOT-SELL list: the people I never over-promise, because they deliver. It is a short list. Currently it is you, my mother, and Burek. Getting ON that list is the only award in sales that cannot be bought, and I have checked. For research.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:robot",
      label: "The robot question",
      optionCandidates: [
        {
          id: "przemek:robot:opt-1",
          topicId: "przemek:robot",
          text: "Tell me about the robot. All of it.",
        },
        {
          id: "przemek:robot:opt-2",
          topicId: "przemek:robot",
          text: "The client's email says they remember the robot.",
        },
        {
          id: "przemek:robot:opt-3",
          topicId: "przemek:robot",
          text: "TrainerBot sent me a calendar invite again.",
        },
        {
          id: "przemek:robot:opt-4",
          topicId: "przemek:robot",
          text: "What if the client visits and asks to see it?",
        },
        {
          id: "przemek:robot:opt-5",
          topicId: "przemek:robot",
          text: "Can we buy a Roomba and put a ribbon on it?",
        },
        {
          id: "przemek:robot:opt-6",
          topicId: "przemek:robot",
          text: "Did you at least warn me before promising a robot?",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:robot:rep-1",
          text: "Sales confession booth. Deep breath: the robot is a Roomba. Named TrainerBot 3000. Ribbon. Lanyard. I introduced it in 2024 as 'the future of autonomous learning' and it cleaned the venue DURING my pitch. Standing ovation. It lives at the client's HQ now. They gave it a LANYARD.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:robot:rep-2",
          text: "Remembering is the best thing a client can do. Nobody remembers the slides; everyone remembers the Roomba with a lanyard. The strategy is as old as selling: never deny, redirect. They ask about the robot, you say 'the robot is element two of three', and you talk about element one. Nobody has ever asked what the elements are.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:robot:rep-3",
          text: "Decline it or do not, but know that it is RECURRING, agenda-free, and set for midnight. TrainerBot processes things now. At night. Alone. We made that robot a promise in 2024 and it has never once let it go. Respect the invite. Fear the invite. But answer it — silence confuses the firmware.",
          relationshipHint: "delighted",
          tags: ["quest:przemek-robot-plan", "relationship:warm"],
        },
        {
          id: "przemek:robot:rep-4",
          text: "Then we say the robot is 'on-site, embedded with your team', which is TRUE — it is at their HQ, wearing its lanyard with dignity. A demonstration would require travel. Travel requires budget. Budget requires answering the robot question, which brings us back to redirect. The loop is airtight. I have tested it.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:robot:rep-5",
          text: "Absolutely not. The moment we OWN a robot it is an asset, assets depreciate, and depreciation is Grazyna's jurisdiction. The Roomba is legally THEIRS, which makes it a gift, and gifts are priceless. We are not buying the legend. We are LENDING it, emotionally.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:robot:rep-6",
          text: "Warn you? I promised you greatness BEFORE I met you. That is not a warning, that is a PRE-ORDER. And look — it shipped. You are the product and the product is live. Nobody reads the release notes. Nobody ever reads the release notes.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "przemek:craft",
      label: "The craft of sales",
      optionCandidates: [
        {
          id: "przemek:craft:opt-1",
          topicId: "przemek:craft",
          text: "Is a promise a lie if you cannot keep it?",
        },
        {
          id: "przemek:craft:opt-2",
          topicId: "przemek:craft",
          text: "How do you sell something that does not exist?",
        },
        {
          id: "przemek:craft:opt-3",
          topicId: "przemek:craft",
          text: "Your strategy meeting was four minutes long.",
        },
        {
          id: "przemek:craft:opt-4",
          topicId: "przemek:craft",
          text: "What is the best close you ever made?",
        },
        {
          id: "przemek:craft:opt-5",
          topicId: "przemek:craft",
          text: "Do you ever feel guilt over a sale?",
        },
        {
          id: "przemek:craft:opt-6",
          topicId: "przemek:craft",
          text: "Teach me to be half as confident as you.",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:craft:rep-1",
          text: "A promise is not a lie, it is a first draft. And you, my friend, are in a lot of first drafts. Drafts get revised — sometimes by delivering, sometimes by refunding, and once, memorably, by redefining 'deliverable'. The point is the WRITING. Writing is optimism with a pen.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:craft:rep-2",
          text: "Nothing exists until someone pays for it. Then it exists SO hard. The cloud did not exist, then it was a budget line. AI did not exist, then it was a slide. I sell the moment before existence, which is the cheapest moment there is. Call it presales. Call it prophecy. The invoice is the same.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:craft:rep-3",
          text: "Strategy is a moment, not a process. The best close I ever made was eye contact in an elevator — four floors, 'Careless Whisper' playing. We closed. The music sells WITH you, if you let it. Four minutes is generous. Most people get a glance and a handshake and they WASTE it.",
          relationshipHint: "pleased",
          tags: ["stats:high-credibility"],
        },
        {
          id: "przemek:craft:rep-4",
          text: "Sold a training program to a man by complimenting his pen. Two-year contract. The pen was plastic. But nobody had ever noticed the pen, and being noticed is the product underneath every product. I still have the pen. It does not write anymore. It does not need to.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:craft:rep-5",
          text: "Guilt is for invoices that bounce. I have never sold anyone something they did not secretly want to believe. The bootcamp, the robot, the immersion — they BUY the belief, and belief is non-refundable. I have checked. Legally. Twice.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:craft:rep-6",
          text: "Half? Aim for sixty percent and mumble the rest with conviction. But first, homework: write the redirect line for the robot question. One sentence. If it survives me saying it out loud in the kitchen, it survives a CFO. Bring it Thursday.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
          offersTaskId: "przemek:task-element-one",
        },
      ],
    },
    {
      id: "przemek:shirts",
      label: "The loud shirts",
      optionCandidates: [
        {
          id: "przemek:shirts:opt-1",
          topicId: "przemek:shirts",
          text: "Is the flamingo shirt a strategy or a cry for help?",
        },
        {
          id: "przemek:shirts:opt-2",
          topicId: "przemek:shirts",
          text: "The client remembered you as 'the shirt guy'.",
        },
        {
          id: "przemek:shirts:opt-3",
          topicId: "przemek:shirts",
          text: "Zosia has a dress code. You are exempt?",
        },
        {
          id: "przemek:shirts:opt-4",
          topicId: "przemek:shirts",
          text: "Grazyna rejected the shirts as marketing expense?",
        },
        {
          id: "przemek:shirts:opt-5",
          topicId: "przemek:shirts",
          text: "What happens on casual Friday then?",
        },
        {
          id: "przemek:shirts:opt-6",
          topicId: "przemek:shirts",
          text: "Which shirt closed the most deals?",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:shirts:rep-1",
          text: "The flamingo is a HOLSTER, my friend. Nobody forgets the flamingo. In a conference of grey suits I am a landmark, a meeting point, a memory with buttons. People say 'find the guy in the flamingo' and the flamingo FINDS THEM. Is it help I need? The flamingo says no. The flamingo says 'I am the help'. We have been partners for nine years and the flamingo has never once…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:shirts:rep-2",
          text: "Being remembered is the entire first third of the sale, and 'shirt guy' is a HANDLE, and handles open inboxes. His assistant filed me as 'shirt guy from the AI people' and the meeting I asked for landed in nine minutes, which is a company record. Wear grey and you are A man. Wear the shirt and you are THE man. The difference is a syllable and a commission.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:shirts:rep-3",
          text: "Zosia's dress code says 'client-presentable' and the shirts have never LOST a client, which makes them client-presentable by results. She tried to codify it in 2022, I wore the penguin to the codifying meeting, and the code now contains the phrase 'Przemek is grandfathered'. Grandfathered is the strongest word in any policy document. It means the rule surrendered.…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:shirts:rep-4",
          text: "She rejected the shirts as marketing, so now they are 'personal protective equipment for brand visibility' and they clear every quarter with a nod. The nod is the highest form of approval in accounting — it means 'I see the fiction, the fiction is harmless, file it under fiction'. The shirts cost less per closed deal than Bruce costs per year of DUSTING. I have…",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "przemek:shirts:rep-5",
          text: "Casual Friday is my REST DAY — a plain blue shirt, one button open, absolutely anonymous. The clients who only know flamingo-me meet blue-me and trust him MORE, because he looks like a man who has tamed something. The contrast is the asset. You cannot have a highlight without a base coat, my friend. Friday is the base coat. The flamingo rests. The flamingo dreams.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:shirts:rep-6",
          text: "The pineapple. Worn to exactly one pitch, a bank, where the dress code said 'business casual' and I heard 'business memorable'. Two-year contract, then a renewal, then the CFO's assistant asked where to BUY one. The pineapple closed more money per wear than any garment in Polish retail history and it now exists only in legend and one framed photo in my hallway. The frame…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:crm",
      label: "The Book of Faces",
      optionCandidates: [
        {
          id: "przemek:crm:opt-1",
          topicId: "przemek:crm",
          text: "Your CRM is a notebook. Actual paper?",
        },
        {
          id: "przemek:crm:opt-2",
          topicId: "przemek:crm",
          text: "Kasia wants your pipeline in her system.",
        },
        {
          id: "przemek:crm:opt-3",
          topicId: "przemek:crm",
          text: "What happens if the notebook is lost?",
        },
        {
          id: "przemek:crm:opt-4",
          topicId: "przemek:crm",
          text: "The notebook has symbols. Decipher them.",
        },
        {
          id: "przemek:crm:opt-5",
          topicId: "przemek:crm",
          text: "Maciek offered to digitize it. Twice.",
        },
        {
          id: "przemek:crm:opt-6",
          topicId: "przemek:crm",
          text: "Which entry is your favorite, ever?",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:crm:rep-1",
          text: "Paper, leather cover, and the collective wisdom of nine years of handshakes. They sell software that stores names; the notebook stores CONTEXT — the client's daughter's graduation, the CFO who hates being called buddy, the exact joke that landed in Wroclaw. Try fitting a joke into a database field. The notebook IS the relationship. The software stores contacts. I…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:crm:rep-2",
          text: "Kasia's system is a CENSUS and the notebook is a SOAP OPERA — you cannot migrate a soap opera into a census. But we negotiated: she gets the STAGE data, I keep the STORIES, because the stories are the product. Her dashboard is accurate. The stories live in the leather, and the leather is not for export.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:crm:rep-3",
          text: "Lost? The notebook does not EXIST in any single place — I copy the hot pages into my head every Sunday. The physical copy is a backup of a backup of the real system. Maciek says I invented the blockchain, badly. From him, a love letter.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:crm:rep-4",
          text: "The symbols are a sales hieroglyphics older than this company: a star means they will buy, a circle means they will not, and a triangle means they will buy but ONLY from me, which is the rarest and most beautiful shape in commerce. The moon means 'call their wife first'. Nobody else can read it. Kasia has been trying for three years. The notebook outlasts translators.…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:crm:rep-5",
          text: "He offered the full stack — sync, search, alerts. And I asked him one question: 'will it remind me that Bartek's client plays golf left-handed?' He said no system tracks that. EXACTLY, Maciek. The system tracks the data. The NOTEBOOK tracks the GAME. He accepted this with the grace of a man who digitizes things for a living and knows when a thing refuses. He offered a…",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:crm:rep-6",
          text: "Page one, entry one: 'Marek's machine shop — will never buy. Great man. Bring him coffee anyway.' Written eight years ago by a younger, dumber Przemek who understood something before he understood it. Marek's shop never bought anything and Marek has defended this company in three rooms I was not in, for free, forever. The first entry in the notebook is the best sale I…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:elevator",
      label: "The elevator pitches",
      optionCandidates: [
        {
          id: "przemek:elevator:opt-1",
          topicId: "przemek:elevator",
          text: "Four floors and Careless Whisper. Really?",
        },
        {
          id: "przemek:elevator:opt-2",
          topicId: "przemek:elevator",
          text: "Give me the pitch for this office. Right now.",
        },
        {
          id: "przemek:elevator:opt-3",
          topicId: "przemek:elevator",
          text: "What if they get in on floor one and you are done by two?",
        },
        {
          id: "przemek:elevator:opt-4",
          topicId: "przemek:elevator",
          text: "The client's CEO rode the elevator and said nothing.",
        },
        {
          id: "przemek:elevator:opt-5",
          topicId: "przemek:elevator",
          text: "Music licensing for the lobby. Serious proposal?",
        },
        {
          id: "przemek:elevator:opt-6",
          topicId: "przemek:elevator",
          text: "Teach me the four-floor structure.",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:elevator:rep-1",
          text: "Really, and the song is not decoration — Careless Whisper is forty-four seconds of a saxophone APOLOGIZING, and an elevator ride is forty seconds of a man unable to escape. He cannot leave, I cannot stop, and the saxophone explains us both. We closed on floor four because the doors opened on the word 'partnership' and he could not tell where the song ended and I began.…",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:elevator:rep-2",
          text: "Here we go: 'We teach people. We ship software. Nobody here has ever died in a meeting.' Seven words per clause, one lie-free claim each, and the third one does the closing because every buyer has survived a meeting culture and the survivors are HOMESICK for honesty. That is the whole pitch. It has a rhythm — teach, ship, survive. Deliver it tired and it is true. Deliver…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:elevator:rep-3",
          text: "Then you have FAILED on floor two and the failure is DIAGNOSTIC, because a pitch that finishes early means the silence arrives with you still in the box, and silence in an elevator is where deals go to suffocate. The pitch must be engineered to the FLOOR COUNT. Two floors? One clause. Four floors? The full anthem. Twelve floors? Buddy, now we are doing the bootcamp outline.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:elevator:rep-4",
          text: "He said NOTHING for four floors and signed in the LOBBY, because silence is not rejection, silence is a man doing the math you gave him. The amateur fills the silence with more words and undoes the pitch. The professional lets the math WORK. I stood there, I pointed at the elevator, I said 'it goes both ways' — which is about the elevator and about the deal — and we shook…",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:elevator:rep-5",
          text: "It is serious enough that I have a document and the document has a budget line and the budget line was REJECTED by Grazyna with one word: 'atmosphere'. Her word, my cause. But the lobby plays three songs on rotation and the rotation is CURATED, by me, unofficially, and the closes since the curation started are up — I have the numbers, she has the skepticism, and the…",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:elevator:rep-6",
          text: "Floor one: the world's problem, stated with grief. Floor two: our existence, stated with surprise — 'funny you should ask'. Floor three: the mechanism, stated with restraint, because details are the fog of sales. Floor four: the ask, stated as an invitation, never a request. The whole structure is grief, surprise, restraint, invitation — G-S-R-I, and yes, you can remember…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:referrals",
      label: "The referral web",
      optionCandidates: [
        {
          id: "przemek:referrals:opt-1",
          topicId: "przemek:referrals",
          text: "The ex-wife's company. Is that still a client?",
        },
        {
          id: "przemek:referrals:opt-2",
          topicId: "przemek:referrals",
          text: "You get referrals from competitors. How?",
        },
        {
          id: "przemek:referrals:opt-3",
          topicId: "przemek:referrals",
          text: "A client referred you to their REGULATOR?",
        },
        {
          id: "przemek:referrals:opt-4",
          topicId: "przemek:referrals",
          text: "The wedding referral story. I need it.",
        },
        {
          id: "przemek:referrals:opt-5",
          topicId: "przemek:referrals",
          text: "How do you thank a referral? Properly?",
        },
        {
          id: "przemek:referrals:opt-6",
          topicId: "przemek:referrals",
          text: "Could the whole city end up in your notebook?",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:referrals:rep-1",
          text: "Still a client, four years running, and the engagement is the most professional relationship in my portfolio — quarterly reviews, prompt invoices, and a mutual understanding that the companies are SEPARATE ENTITIES. The divorce was the market analysis nobody else had access to: I learned exactly what a betrayed customer looks like from the inside, and I have never been…",
          relationshipHint: "pleased",
          tags: ["quest:przemek-bootcamp-sold"],
        },
        {
          id: "przemek:referrals:rep-2",
          text: "Because I never once lied to a competitor's client — I told them the truth WITH a calendar. 'Yes, they are good, and they can start in March. We start Thursday.' The competitor gets the compliment, the client gets the speed, and I get the client who needed speed, which is every client who ever called anyone. Competitors refer me the way rivers refer water. I am…",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:referrals:rep-3",
          text: "The regulator's training wing needed AI literacy and a client said 'the shirt guy taught us; nobody died'. That endorsement survived a PROCUREMENT PROCESS, my friend, which is the Ironman of referrals — three forms, two references, and one live audit where they watched me teach for an hour and took NOTES. We passed. The regulator is now a client, and when the industry…",
          relationshipHint: "pleased",
          offersTaskId: "przemek:task-testimonial",
        },
        {
          id: "przemek:referrals:rep-4",
          text: "I attended a wedding of a client's sister, as a GUEST, at my own expense, and the best man — a stranger — asked what I did. Four floors, no elevator, one dance floor. By the end of the night I had two referrals and no dance partner and the best contract of 2023. The lesson is not 'attend weddings'. The lesson is that ABSENCE of a sales context is the strongest sales context.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:referrals:rep-5",
          text: "A referral is thanked in three layers: same day, a call that is pure gratitude — no ask, no calendar. One week, a gift that references something ONLY they would know, proving the referral was heard. One quarter, a result, told to them first, before the client, before the notebook. Most people do the call and stop. The gift and the result are where referrals become PIPELINES.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:referrals:rep-6",
          text: "It is already most of the way there — I have entries for three bus drivers, a dentist, and the man who fixes the fountain in the old town, because EVERY conversation is a seed and seeds do not know what they will grow into. The fountain man knows the mayor. The dentist knows everyone. The bus driver on the 128 knows the city's whole rhythm and, I suspect, its future.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:golf",
      label: "Client entertainment",
      optionCandidates: [
        {
          id: "przemek:golf:opt-1",
          topicId: "przemek:golf",
          text: "You do not golf. The golf clients — how?",
        },
        {
          id: "przemek:golf:opt-2",
          topicId: "przemek:golf",
          text: "The boat was NOT a client entertainment?",
        },
        {
          id: "przemek:golf:opt-3",
          topicId: "przemek:golf",
          text: "Grazyna's rules on entertainment. Recite them.",
        },
        {
          id: "przemek:golf:opt-4",
          topicId: "przemek:golf",
          text: "You took a client to a football match. Which side?",
        },
        {
          id: "przemek:golf:opt-5",
          topicId: "przemek:golf",
          text: "Is entertainment just bribery with a calendar?",
        },
        {
          id: "przemek:golf:opt-6",
          topicId: "przemek:golf",
          text: "Best entertainment spend ever. The story.",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:golf:rep-1",
          text: "I do not golf, which is EXACTLY why the golf clients love me. I am the worst golfer in the history of the sport and I narrate my own failure with the confidence of a champion, and the clients laugh for four hours and remember me as 'the one who cannot play'. Being memorably bad is better than being forgettably good. The golf is irrelevant. The golf is VENUE. The venue…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:golf:rep-2",
          text: "The boat was MY cousin's WEDDING, which I invited two clients to because the wedding was in Gdansk and the clients were in Gdansk and the wedding had a bar. That is not entertainment, that is LOGISTICS with catering. Grazyna saw 'client entertainment at sea' on my draft expense and we have been negotiating the wording for two years. The current filing is 'market…",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:golf:rep-3",
          text: "Grazyna's entertainment law has three commandments and I follow them like scripture. One: the receipt must name a human, never a vibe — 'dinner with Marek Kowalczyk re: Q3' passes, 'team morale event' dies. Two: nothing with a motor. Three: no client may be entertained more than once per quarter, because ONCE is a relationship and TWICE is a dependency. I have memorized…",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "przemek:golf:rep-4",
          text: "I took the client to a derby and wore NEUTRAL colors, which in that stadium made me a SUSPECT to both sides — the perfect sales position. We sat in the middle, equidistant from both sets of passions, and when the home team scored I celebrated at forty percent and when the away team scored I consoled at sixty. The client said I was 'the only balanced man' he knew. Balance…",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:golf:rep-5",
          text: "Bribery has a receipt and no memory. Entertainment has a memory and barely a receipt. The difference is TIME — a bribe buys a decision today; entertainment buys a friendship that makes every future decision warmer. I have never paid for a decision in my life. I have paid for many STEWS. The stew is not the sale. The stew is the soil. Things grow in soil, my friend, and…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:golf:rep-6",
          text: "Forty zloty. A man, a kebab, and the worst fortune teller on the promenade, hired to read the CLIENT's palm. She told him he would sign 'a paper with a bird on it' — our logo has an origami crane, a decision I did not make and cannot explain. He laughed for a full minute, signed at the table, and brings up the bird at every renewal like it is a prophecy. Total cost:…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:commission",
      label: "The commission math",
      optionCandidates: [
        {
          id: "przemek:commission:opt-1",
          topicId: "przemek:commission",
          text: "What is the commission structure here, really?",
        },
        {
          id: "przemek:commission:opt-2",
          topicId: "przemek:commission",
          text: "You once split a commission with Marek?",
        },
        {
          id: "przemek:commission:opt-3",
          topicId: "przemek:commission",
          text: "The biggest single commission. Ever. Number.",
        },
        {
          id: "przemek:commission:opt-4",
          topicId: "przemek:commission",
          text: "Kasia says sales comp is 'a mood with a spreadsheet'.",
        },
        {
          id: "przemek:commission:opt-5",
          topicId: "przemek:commission",
          text: "Would you cap your own commission? Hypothetically?",
        },
        {
          id: "przemek:commission:opt-6",
          topicId: "przemek:commission",
          text: "What do you spend commission ON?",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:commission:rep-1",
          text: "The structure is a base that keeps me humble and a percentage that keeps me HYDRATED. Tiered, accelerators after target, and one unwritten clause — deals that arrive through the flamingo close at a premium because they arrive PRE-SOLD. The accountants call the clause 'the Przemek coefficient'. I call it justice. The structure has made me rich in the specific currency of…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:commission:rep-2",
          text: "Once, and it was the strangest invoice of my career. His monitoring setup saved a client relationship I had almost killed with enthusiasm, so I split the renewal fee with him — actual money, transferred, and he accepted it with a nod and bought a HARD DRIVE with it. The drive backs up the monitors that save my deals. My commission is now literally protecting itself.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:commission:rep-3",
          text: "The number is in the notebook and the notebook is not speakable, but I will tell you what it BOUGHT: my apartment, eleven months early, and the pineapple's frame. What I will say is the STRUCTURE of the deal — three meetings, one kebab, one fortune teller, and a client who wanted to be somebody's favorite. I was available to be the favorite. That is the entire secret of…",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:commission:rep-4",
          text: "Kasia is RIGHT and it is the only time I will say that publicly. Sales comp is a mood with a spreadsheet — the targets are set by last year's dream, the accelerators by this year's optimism, and the clawbacks by the lawyers' lunch. I have watched my own plan change four times and closed quota under all four, because the mood changes and the FLAMINGO does not. The constant…",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:commission:rep-5",
          text: "Never, and I will tell you the Sales reason: a capped commission is a capped ENTHUSIASM, and the client hears the cap in your voice around deal seven of the month. But here is the Human reason — the year I would have hit a cap was the year the company nearly lost the graph, and my uncapped renewal is the one that steadied it. The cap would have made me exactly as rich…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:commission:rep-6",
          text: "Shirts, the notebook's leather, my mother's kitchen — new windows, the good kettle, the whole works — and the fund. The fund is for the young salespeople this city keeps producing: coffee, coaching, and the occasional 'your first pitch is on me' dinner. The fund has made zero zloty and produced four careers. Commission is not for keeping, my friend. Commission is…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:no",
      label: "The word no",
      optionCandidates: [
        {
          id: "przemek:no:opt-1",
          topicId: "przemek:no",
          text: "Have you ever said no to a client? Truly?",
        },
        {
          id: "przemek:no:opt-2",
          topicId: "przemek:no",
          text: "A client asked for the impossible again. Script?",
        },
        {
          id: "przemek:no:opt-3",
          topicId: "przemek:no",
          text: "The bootcamp scope doubled. Say no now?",
        },
        {
          id: "przemek:no:opt-4",
          topicId: "przemek:no",
          text: "Zosia says your yes is a liability. Fair?",
        },
        {
          id: "przemek:no:opt-5",
          topicId: "przemek:no",
          text: "When a no costs you the deal. Then what?",
        },
        {
          id: "przemek:no:opt-6",
          topicId: "przemek:no",
          text: "Teach me your yes. The real mechanics.",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:no:rep-1",
          text: "Twice. Both times the client came BACK within a year, because a honest no is a deposit in the trust bank and trust pays interest. The first no was an implementation that would have hurt them; the second was a timeline that would have hurt US. Both nos had a gift attached — an alternative, a referral, a truth. A naked no is a wall. A no with a door in it is ARCHITECTURE.…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:no:rep-2",
          text: "The script is 'yes, and here is what it costs', which is not a no — it is a MIRROR. The impossible request reflected at its true price usually walks itself back to possible. And when it does not — when they accept the real price — then the impossible was simply expensive, and expensive is my favorite kind of possible. I have never said the word impossible in a meeting.…",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:no:rep-3",
          text: "We do not say no, we say 'the scope has grown, and growth has a brochure'. The bootcamp doubled and the DOUBLING is a second product — five days and five more, sold as 'the deep immersion', priced with tears of joy. The client who asks for double is a client telling you their real appetite, and appetite is the most valuable data in sales. You never refuse appetite. You…",
          relationshipHint: "pleased",
          tags: ["quest:przemek-bootcamp-sold", "relationship:neutral"],
        },
        {
          id: "przemek:no:rep-4",
          text: "It is fair the way weather reports are fair — technically true, emotionally useless. My yes IS a liability, and it is also the entire reason this office has a graph, because every yes I have ever said became a project that became a salary that became Renata's clipboard having more names on it. Zosia manages the liability of my yes the way Janusz manages the flood:…",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:no:rep-5",
          text: "Then the no was correct and the deal was wrong, and I will tell you the hardest lesson of twenty years: some deals are EXPENSIVE to win. They cost weekends, they cost Bartek's patience, they cost the office's one good nerve — and the invoice you send cannot cover what the deal ate. I have lost four deals to honest nos and gained back four hundred nights of sleep. The…",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:no:rep-6",
          text: "The real yes has three gears. Gear one: 'yes' — the promise, pure optimism, fuel for the week. Gear two: 'yes, if' — the condition that makes the promise engineering instead of gambling. Gear three: 'yes, and I am the one who will carry it' — the gear nobody uses and the only one that builds a REPUTATION. Most salespeople live in gear one and die there. I live in three.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:retirement",
      label: "Sales forever",
      optionCandidates: [
        {
          id: "przemek:retirement:opt-1",
          topicId: "przemek:retirement",
          text: "What does a salesman do at sixty-five?",
        },
        {
          id: "przemek:retirement:opt-2",
          topicId: "przemek:retirement",
          text: "Could you sell retirement to yourself?",
        },
        {
          id: "przemek:retirement:opt-3",
          topicId: "przemek:retirement",
          text: "The notebook outliving you — legacy?",
        },
        {
          id: "przemek:retirement:opt-4",
          topicId: "przemek:retirement",
          text: "Would you ever retire to the coast?",
        },
        {
          id: "przemek:retirement:opt-5",
          topicId: "przemek:retirement",
          text: "Who is your successor in sales?",
        },
        {
          id: "przemek:retirement:opt-6",
          topicId: "przemek:retirement",
          text: "Last pitch of your career. What is it?",
        },
      ],
      replyCandidates: [
        {
          id: "przemek:retirement:rep-1",
          text: "The same thing with a slower calendar, my friend. Sixty-five is not the end of sales, it is the PREMIUM TIER — a man who has heard no four thousand times cannot be shocked by it, and unshockable is the most expensive product on earth. The commissions shrink and the rates do not. I have met the sixty-five-year-old closers. They sit in cafes, they know everyone, and…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:retirement:rep-2",
          text: "I have tried and lost the pitch, which tells me retirement is a BAD PRODUCT — it sells you freedom and delivers an empty Tuesday. The benefits are real: sleep, sea, no alarm. But the demo is a man on a deck chair staring at the horizon and the horizon does not OBJECT, does not negotiate, does not say 'send me the deck'. A life without objection is a life without GAME. I…",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:retirement:rep-3",
          text: "The notebook is the will and the will is WRITTEN — the book goes to the office, the office keeps the lore, and the lore keeps the clients warm after I am gone. Every entry has a note on who loves what, and love is TRANSFERABLE, my friend. The new salesman opens the book and inherits forty friendships mid-conversation. I have seen it happen in other houses. The…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:retirement:rep-4",
          text: "The coast and I have an arrangement: I visit, I sell it things, we part as friends. I retired to Sopot for one month in 2019 — the whole experiment — and by week two I was selling boat tours AS A HOBBY, unpaid, because a man walked past my deck chair with a product and no pitch and I PHYSICALLY could not watch. The coast does not want me retired. The coast wants me ARMED.…",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:retirement:rep-5",
          text: "Successors are not chosen, they are DISCOVERED — usually mid-sentence, saying something reckless and true to a client who needed reckless truth. I have candidates: a kid from the hackathon who sold ME a pen, and Tomasz from the gym whose handshake closes BEFORE his sentence does. The kid has the gift and the gift needs SUFFERING — five years of no, of lost deals, of…",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:retirement:rep-6",
          text: "The last pitch will be for this office, to one client, on one condition: that I am old enough to be TRUE without the technique. No flamingo, no saxophone, no four floors — just an old man saying 'this place made me, take my word'. The word of a closer with nothing left to close is the strongest currency in commerce, and I will spend every zloty of it in one sentence, on…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "przemek:task-element-one",
      title: "Element one, element two",
      description: "Write the redirect line: when the client asks about the robot, say 'the robot is element two of three' and talk about element one. Nobody has ever asked what the elements are. Nobody ever will. Test it on Przemek in the kitchen before the CFO does.",
      flagToSet: "przemek-robot-plan",
      rewardHint: "+the airtight loop",
    },
    {
      id: "przemek:task-testimonial",
      title: "The testimonial video",
      description: "The client said yes to a testimonial. Now somebody has to film it: one question, one take, no script — the shirt guy on camera asking and the client saying something true. Przemek supplies the client, the tripod, and the saxophone playlist for the drive. The video becomes element one of the next pitch. Everything is element one of the next pitch.",
      flagToSet: "przemek-testimonial-filmed",
      rewardHint: "+the best proof in sales",
    },
  ],
};

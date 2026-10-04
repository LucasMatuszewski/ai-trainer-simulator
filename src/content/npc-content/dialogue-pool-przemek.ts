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
    {
      id: "przemek:handshakes",
      label: "The handshake system",
      optionCandidates: [
        { id: "przemek:handshakes:opt-1", topicId: "przemek:handshakes", text: "You judge people by handshakes. Superficial?" },
        { id: "przemek:handshakes:opt-2", topicId: "przemek:handshakes", text: "Teach me the three-second handshake." },
        { id: "przemek:handshakes:opt-3", topicId: "przemek:handshakes", text: "The wet-fish handshake — recover the deal?" },
        { id: "przemek:handshakes:opt-4", topicId: "przemek:handshakes", text: "You lost a deal to a bad handshake. Really?" },
        { id: "przemek:handshakes:opt-5", topicId: "przemek:handshakes", text: "Do handshakes survive the video-call era?" },
        { id: "przemek:handshakes:opt-6", topicId: "przemek:handshakes", text: "What is YOUR handshake like, honestly?" },
      ],
      replyCandidates: [
        {
          id: "przemek:handshakes:rep-1",
          text: "Superficial is the POINT, my friend. The handshake is the only data you get before anyone performs. Resumes are rehearsed, websites are written — the hand is the last honest department. I do not judge CHARACTER by the hand. I judge PREPAREDNESS. Dry palm, full grip, one pump: a person who expected to meet someone today.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:handshakes:rep-2",
          text: "Three seconds, three movements, one eye contact that lands on 'and YOU'. The secret nobody teaches: the handshake is an advertisement of rhythm. Match the other person's pressure at contact, then lead by ten percent. People trust a hand that meets them where they are and moves them forward. Sales in miniature.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:handshakes:rep-3",
          text: "You recover it by NAMING it — 'my hand got excited before my head arrived' has saved three deals, because self-aware confidence is the recovery. Never wipe, never hide, never change the subject to weather. The wet fish is a moment. The recovery is the character. I have watched men lose deals to silence and win them with one sentence.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:handshakes:rep-4",
          text: "Not lost — DELAYED. The client had the handshake of a man closing his own deal elsewhere, and I mean that literally: he closed with my competitor the same week. The hand KNEW. I did not read it. I learned. Now I read the hand like a dashboard — it does not predict the future, it predicts the PRESENT faster than the eyes.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:handshakes:rep-5",
          text: "They migrate, they do not die. Camera on, both hands visible, one nod with intent — the video handshake is the song played on one instrument: melody survives. But I will tell you what dies and does not return: the ROOM. Handshakes are also about the room you cross to give one. For that, we still fly, my friend.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:handshakes:rep-6",
          text: "Calibrated, warm, and famously repeatable — clients have TESTED it, two decades of the same pressure, the same pump, the same smile timing. My handshake is a brand asset with a maintenance schedule. I have practiced it in mirrors the way Tomek practices deploys. Consistency is the charisma nobody can fake twice differently.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:ties",
      label: "The tie collection",
      optionCandidates: [
        { id: "przemek:ties:opt-1", topicId: "przemek:ties", text: "Forty ties? Inventory or identity?" },
        { id: "przemek:ties:opt-2", topicId: "przemek:ties", text: "The tie with the tiny calculators. Occasion?" },
        { id: "przemek:ties:opt-3", topicId: "przemek:ties", text: "Do ties close deals or is that mythology?" },
        { id: "przemek:ties:opt-4", topicId: "przemek:ties", text: "You wear a tie to the kitchen. Performance?" },
        { id: "przemek:ties:opt-5", topicId: "przemek:ties", text: "Zosia's dress code versus your tie collection?" },
        { id: "przemek:ties:opt-6", topicId: "przemek:ties", text: "Which tie is retired with honors?" },
      ],
      replyCandidates: [
        {
          id: "przemek:ties:rep-1",
          text: "Identity with a maintenance log, my friend. Every tie has a card: clients met, deals closed, one disaster. The collection is a sales ledger made of silk. Forty ties is forty timelines. Grazyna calls it 'unallocated inventory'. I call it amortization of charisma. She stopped correcting me. That is growth on both sides.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:ties:rep-2",
          text: "The calculators tie is for FINANCE PEOPLE only — it is a mirror, my friend, a silent 'I am one of you'. Worn eleven times, closed seven. It has never met a creative client and it never will. Ties are TARGETING. The calculators would die in a room of designers. The flamingo would die in a bank. You MATCH or you DIE.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:ties:rep-3",
          text: "The tie does not close the deal — it OPENS the deal's second minute. Nobody signed because of silk. But the tie buys ten seconds of attention, and ten seconds is where the pitch loads. I have tested it: same pitch, tie versus no tie, the tie wins the SECOND meeting. The first belongs to the shirt. This is known science.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:ties:rep-4",
          text: "The kitchen tie is not performance — it is REHEARSAL. You do not become a salesman at the client's door, my friend, you ARRIVE as one. The kitchen is my training camp. The kettle has seen every tie first. The kettle is the toughest audience in this building and it has never once been wrong about my energy.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:ties:rep-5",
          text: "Truce: her code says 'client-presentable' and I have never LOST a client with a tie, so the tie is legal. My concession: no ties on office-only days, which I honor like a treaty. The office gets my collars. The clients get my silk. Everybody signs. Zosia has the clause in writing. I framed HER copy. Sentiment, my friend.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:ties:rep-6",
          text: "The burgundy one, worn to the deal that nearly died and did not — the deal where I learned the word 'no' has a soft version. It hangs in the closet on its own hanger, and every year on the anniversary I hold it for one minute like a retired jersey. Ties remember the ROOMS, my friend. This one remembers the lesson.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:car",
      label: "The company car",
      optionCandidates: [
        { id: "przemek:car:opt-1", topicId: "przemek:car", text: "The company car is a hatchback. Statement?" },
        { id: "przemek:car:opt-2", topicId: "przemek:car", text: "Golf clubs in the trunk. You do not golf." },
        { id: "przemek:car:opt-3", topicId: "przemek:car", text: "The car has 300,000 kilometers. Replace it?" },
        { id: "przemek:car:opt-4", topicId: "przemek:car", text: "Clients ride in the car. Pitch time?" },
        { id: "przemek:car:opt-5", topicId: "przemek:car", text: "Grazyna approved the fuel card. Conditions?" },
        { id: "przemek:car:opt-6", topicId: "przemek:car", text: "What would you drive if money were no object?" },
      ],
      replyCandidates: [
        {
          id: "przemek:car:rep-1",
          text: "The hatchback is a STRATEGY, my friend. Clients who see a salesman in a hatchback relax — this man is not charging me for his ego today. The car says 'your invoice is safe'. A luxury car is a warning label. I sell trust, and the hatchback is the trust's body kit. Also it parks anywhere, which is where deals happen.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:car:rep-2",
          text: "They are PROPS with a purpose — the golf clubs have closed more deals than my diploma. I do not golf, but I look like a man who might, and the client who golfs sees a future round. The clubs are an open invitation that costs nothing and never gets accepted. Best sales asset per zloty in the trunk. I named them. Do not ask.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:car:rep-3",
          text: "Replace? The car and I have a RELATIONSHIP — 300,000 kilometers of client stories in one cabin. Replace it when the heater dies, not before. The heater is the deal, my friend: clients judge a man by his car's warmth in winter. The engine can whisper. The cabin cannot be cold. The mechanic is saved as 'the insurance'.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:car:rep-4",
          text: "Only after the deal, never before — the car pitch is a REWARD, not a weapon. Before the deal, neutral territory, coffee shop. After the deal, the car ride is where the SECOND deal is born, in a moving room with music. Nobody signs in a coffee shop twice. Everybody signs in a warm car. Ask my heater.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:car:rep-5",
          text: "She approved it with one law: fuel is a cost center and the car is an asset, and the two may never meet in one column. I obey. The fuel card has a limit, the limit has a ledger, and the ledger has never surprised her. That is the whole relationship with Grazyna, my friend: no surprises. Surprises are for birthdays.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "przemek:car:rep-6",
          text: "The same hatchback, in silver, with a better heater — money would change the COLOR, not the concept. The fantasy of the sports car dies the first time a client watches you fail to park it. My success is not in the car. It is in what the car says: this man's ego fits in city parking. That is the brand.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "przemek:trade-shows",
      label: "The trade-show floor",
      optionCandidates: [
        { id: "przemek:trade-shows:opt-1", topicId: "przemek:trade-shows", text: "Trade-show season. Strategy in one breath?" },
        { id: "przemek:trade-shows:opt-2", topicId: "przemek:trade-shows", text: "Your booth draws crowds. Props or personality?" },
        { id: "przemek:trade-shows:opt-3", topicId: "przemek:trade-shows", text: "You scan badges like a predator. Explain." },
        { id: "przemek:trade-shows:opt-4", topicId: "przemek:trade-shows", text: "The best lead you ever caught at a show?" },
        { id: "przemek:trade-shows:opt-5", topicId: "przemek:trade-shows", text: "How many booths do you visit as a spy?" },
        { id: "przemek:trade-shows:opt-6", topicId: "przemek:trade-shows", text: "The trade-show hangover day. Protocol?" },
      ],
      replyCandidates: [
        {
          id: "przemek:trade-shows:rep-1",
          text: "One breath: three conversations that end in calendars beat three hundred that end in brochures. My rule is the CALENDAR TEST — no conversation is a lead until there is a date in it. Brochures are for people collecting paper. Calendars are for people collecting futures. I collect futures, my friend. Paper is heavy.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:trade-shows:rep-2",
          text: "Both, but the props are bait, not the hook — the spinning wheel draws them in, the personality keeps them, and the CALENDAR takes them home. The wheel gives away pens. The conversation gives away belief. I can teach the wheel. The belief has to be plugged in at the factory. Mine was. Factory settings.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:trade-shows:rep-3",
          text: "The badge scan is TRIAGE, not hunting — ten seconds a badge: name, company, the shoes. Shoes tell you the budget, the badge tells you the name, and the conversation tells you the truth. I have never scanned a badge without a conversation. A scan without a talk is a phone number with no story. Storyless numbers die.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:trade-shows:rep-4",
          text: "The janitor of a hospital network, 2019 — everyone pitched the directors, I pitched the man who KEYS THE ROOMS. He did not sign. He INTRODUCED. Six months later I am in a boardroom because the janitor said 'teach the shirt guy'. The lesson, my friend: the org chart is a map for tourists. Locals know the real routes.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:trade-shows:rep-5",
          text: "All of them, and I buy from nobody — I walk every show with a notebook and one question: what are they doing that I can LEARN. Competitor booths are free masterclasses with better swag. I once watched a man demo with silence and hand gestures. I stole the silence. The gestures did not survive. Silence transfers.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:trade-shows:rep-6",
          text: "Protocol: one follow-up email per real lead, sent that NIGHT, while the handshake is still warm — the hangover is for amateurs. The leads cool like soup. Then the day after, nothing. Absolute rest. The voice needs the rest or Monday's calls sound like the show. Rest is part of the pipeline. It has a column.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:phone-voice",
      label: "The phone voice",
      optionCandidates: [
        { id: "przemek:phone-voice:opt-1", topicId: "przemek:phone-voice", text: "Your phone voice has a setting. Describe it." },
        { id: "przemek:phone-voice:opt-2", topicId: "przemek:phone-voice", text: "Cold calls still work? In 2026?" },
        { id: "przemek:phone-voice:opt-3", topicId: "przemek:phone-voice", text: "The gatekeeper problem. Bribe or charm?" },
        { id: "przemek:phone-voice:opt-4", topicId: "przemek:phone-voice", text: "You left a voicemail that got a callback. How?" },
        { id: "przemek:phone-voice:opt-5", topicId: "przemek:phone-voice", text: "A client recognized you at a conference BY VOICE." },
        { id: "przemek:phone-voice:opt-6", topicId: "przemek:phone-voice", text: "Teach me to make a call without the dread." },
      ],
      replyCandidates: [
        {
          id: "przemek:phone-voice:rep-1",
          text: "Setting one: 'helpful neighbor with surprising news'. Warm, ten percent slower than natural, and one octave of certainty. The voice does not sell — it WARMS the room before the pitch walks in. People forget sentences and remember temperatures. I am a space heater, my friend. One with a calendar link.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:phone-voice:rep-2",
          text: "Cold calls work like umbrellas — unfashionable, effective, and blamed only when they fail. My cold call is ninety seconds: one sentence of homework, one sentence of value, one question. The homework sentence is the trick — 'I saw your team opened a second location' beats every scripted opener. Research is the new charm.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:phone-voice:rep-3",
          text: "Neither — the gatekeeper is promoted to CLIENT, my friend. I learn their name, their boss's name, and one true thing about their week. By call three I am not getting past the gate. I am being LET IN, which is different, and the difference is the whole career. Bribes expire. Memory compounds. Charm is remembered kindness.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:phone-voice:rep-4",
          text: "The voicemail rule: SEVEN SECONDS. Name, one sentence of value, number, done. The seven-second voicemail says 'I respect your evening', and respect gets callbacks. The two-minute voicemail says 'I do not respect doors', and doors stay shut. My callback rate on voicemails is a rounding error with a philosophy.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:phone-voice:rep-5",
          text: "She recognized the TEMPERATURE before the name — 'you are the one who sounds like good news'. I nearly wept, my friend, because that is the review every salesman wants and none can buy. The voice is the brand under the shirt. The shirt gets remembered first. The voice gets TRUSTED first. Different organs, same body.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:phone-voice:rep-6",
          text: "Reframe the dread: you are not interrupting, you are DELIVERING — a call is a small gift of information they would have paid to learn. If that is not true, make it true with homework, then call. The dread is the gap between what you have and what they need. Close the gap. The dread closes with it. Every time.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "przemek:contracts",
      label: "The contract dance",
      optionCandidates: [
        { id: "przemek:contracts:opt-1", topicId: "przemek:contracts", text: "You read contracts? The whole thing?" },
        { id: "przemek:contracts:opt-2", topicId: "przemek:contracts", text: "The client's lawyer added eleven pages. Survive?" },
        { id: "przemek:contracts:opt-3", topicId: "przemek:contracts", text: "You close on a handshake first. Legal?" },
        { id: "przemek:contracts:opt-4", topicId: "przemek:contracts", text: "Which clause do you always strike?" },
        { id: "przemek:contracts:opt-5", topicId: "przemek:contracts", text: "Grazyna reviews every contract. The red pen?" },
        { id: "przemek:contracts:opt-6", topicId: "przemek:contracts", text: "Teach me to read a contract like a salesman." },
      ],
      replyCandidates: [
        {
          id: "przemek:contracts:rep-1",
          text: "Twice, my friend — once for the deal and once for the exit. Every contract has a front door and a back door, and salesmen who read only the front door get evicted through the back. Page one is the romance. Page nine is the truth. I read nine first, then one, then the middle with coffee. Order is everything.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:contracts:rep-2",
          text: "Survived, and here is the secret: eleven pages means eleven FEARS, and fears have names. I map every added clause back to one sentence: 'what happened to you before?' The lawyer who added a penalty clause had a client who vanished. Address the fear in a call, and four pages die in edit. Contracts are therapy with a font size.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:contracts:rep-3",
          text: "The handshake is the INTENT, the contract is the RECEIPT for the intent — and intent without a receipt evaporates the first time someone changes jobs. I shake first to find out if there is intent. If the hand hesitates, no contract will fix it. If the hand commits, the contract is paperwork for a thing already alive.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:contracts:rep-4",
          text: "The 'exclusivity of presentation' — the clause that says we cannot show our approach to anyone else while they 'consider'. It is a lock on nothing with a cost in everything. I replace it with a time-box: fourteen days, written down. Consideration is a date, not a lifestyle. I have never lost a deal to the strike.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:contracts:rep-5",
          text: "Her red pen is a RITE OF PASSAGE — she has never once killed a deal, she kills only the AMBUSHES: auto-renewals, liability caps, payment terms written in fine print with a calculator. The pen comes back with three marks and one sentence: 'they expect you not to read'. The mark count drops every year. She is teaching them.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:contracts:rep-6",
          text: "Skip to three rooms: the exit, the money, and the who-owns-what. Exit is what happens when love ends. Money is what happens when it does not. Ownership is what happens to the work. Every other page is diplomacy. Read those three rooms like a man checking a hotel: windows, price, whose name is on the booking.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "przemek:business-cards",
      label: "The business cards",
      optionCandidates: [
        { id: "przemek:business-cards:opt-1", topicId: "przemek:business-cards", text: "Business cards in 2026. Obsolete or ritual?" },
        { id: "przemek:business-cards:opt-2", topicId: "przemek:business-cards", text: "Your cards have the phone number in gold. Why?" },
        { id: "przemek:business-cards:opt-3", topicId: "przemek:business-cards", text: "You collect cards like trophies. System?" },
        { id: "przemek:business-cards:opt-4", topicId: "przemek:business-cards", text: "Someone gave you a card with a typo. Fate?" },
        { id: "przemek:business-cards:opt-5", topicId: "przemek:business-cards", text: "The card you never gave out. The story." },
        { id: "przemek:business-cards:opt-6", topicId: "przemek:business-cards", text: "Do you design your own cards? Say yes." },
      ],
      replyCandidates: [
        {
          id: "przemek:business-cards:rep-1",
          text: "The card is a STAGE PROP that survives the meeting — phones die, inboxes drown, and the card sits on a desk for eleven months saying my name in gold. The card is the only marketing material with a RESIDENCY. I hand out four hundred a year and track three directly. The rest are warheads in desks. Patient ones.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:business-cards:rep-2",
          text: "The gold is a FILTER, my friend. Nobody who mocks the gold has ever bought anything from me. The gold says 'this man believes in this card', and belief is contagious in offices where nothing is believed. Also it photographs. Also my mother likes it. Marketing tested matte. Matte lost. The gold stays.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:business-cards:rep-3",
          text: "System: one shoebox for the living, one box for the dead — living means answered within a year, dead means changed industries or changed phones. Twice a year I audit the boxes, and the audit is a REUNION: I call three of the living with no agenda. Some of my best months began as box maintenance. The shoebox compounds.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:business-cards:rep-4",
          text: "Fate, and here is the superstition I keep: the typo card gets called FIRST, because a man who hands out a flawed card is either careless or honest, and the call finds out which in one minute. I have signed two clients from typo cards. Different typos. Same honesty. The universe is a salesman too.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:business-cards:rep-5",
          text: "The card for the company I almost founded, 2015 — five hundred printed, company dead in nine months. I keep one in the wallet behind the current card: a memento with a phone number that no longer exists. Every salesman needs a card that did not survive. It keeps the present ones humble. It makes one appearance a year. To me.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:business-cards:rep-6",
          text: "Designed the first four myself, each one a self-portrait I outgrew. Now I pay a designer, give her three words — 'confident, warm, unignorable' — and stay out of the kitchen. The card is the first handshake the eye receives. You do not perform your own surgery. Learned in 2018, with a font. The font is retired.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "przemek:followup",
      label: "The 24-hour rule",
      optionCandidates: [
        { id: "przemek:followup:opt-1", topicId: "przemek:followup", text: "You follow up within a day. Always? Exhausting?" },
        { id: "przemek:followup:opt-2", topicId: "przemek:followup", text: "What does the follow-up message actually say?" },
        { id: "przemek:followup:opt-3", topicId: "przemek:followup", text: "The client who never replies. Keep writing?" },
        { id: "przemek:followup:opt-4", topicId: "przemek:followup", text: "How many follow-ups before you stop? Number." },
        { id: "przemek:followup:opt-5", topicId: "przemek:followup", text: "Your follow-ups have jokes. Safe?" },
        { id: "przemek:followup:opt-6", topicId: "przemek:followup", text: "Zosia says you follow up like a subscription." },
      ],
      replyCandidates: [
        {
          id: "przemek:followup:rep-1",
          text: "Exhausting is the entry fee, my friend — the follow-up is where the sale actually lives, and the meeting was just the audition. Twenty-four hours, while the coffee is still metaphysically warm. The exhaustion is real and the alternative is worse: the client's memory of you, fading like a receipt in the sun.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:followup:rep-2",
          text: "Three sentences, always: one thank-you with a SPECIFIC detail — 'your point about the Tuesday shift' — one piece of value they did not ask for, and one small next step with a date. The specific detail is the whole trick. It proves the meeting happened to TWO people. Generic follow-ups prove nothing. Specific ones are souvenirs.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:followup:rep-3",
          text: "Three more, spaced like a gentleman — two weeks, one month, one quarter — then the long game: a value message with no ask, quarterly, forever. The client who never replies is not a no. He is a NO THIS QUARTER with a pulse. Silence is a season, my friend, not a verdict. I have harvests that began as silence.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:followup:rep-4",
          text: "Seven touches before I stop asking, then never zero — I stop asking at seven and I never stop WRITING. The seven is arithmetic: three noes are politeness, two are schedules colliding, one is fear, and the seventh is the truth. You cannot get the truth before the sixth. The sixth is where amateurs quit. I have never met a sixth I quit.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:followup:rep-5",
          text: "Safe because they are TRUE and MINE — a joke from the meeting, referenced once, is a handshake in text form. The rule is one laugh per follow-up, never at the client, always at the situation. Humor is proof of memory. A follow-up that could be sent to anyone is sent to no one. Mine could only be sent to THEM.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:followup:rep-6",
          text: "Fair, and I accept the charge with one correction: a subscription renews automatically, and my follow-ups have to EARN renewal monthly. That is the difference between spam and a magazine. The magazine earns the envelope opening. I am a magazine, my friend. Monthly issue, one laugh, one value, unsubscribe honored forever.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "przemek:motivation",
      label: "The morning motivation",
      optionCandidates: [
        { id: "przemek:motivation:opt-1", topicId: "przemek:motivation", text: "You motivate yourself daily. Mechanism?" },
        { id: "przemek:motivation:opt-2", topicId: "przemek:motivation", text: "The pep talk in the mirror. Real or bits?" },
        { id: "przemek:motivation:opt-3", topicId: "przemek:motivation", text: "Four noes before lunch. Reset how?" },
        { id: "przemek:motivation:opt-4", topicId: "przemek:motivation", text: "Your energy never dips. Metabolism or theater?" },
        { id: "przemek:motivation:opt-5", topicId: "przemek:motivation", text: "What do you do when the deal dies at the finish?" },
        { id: "przemek:motivation:opt-6", topicId: "przemek:motivation", text: "Teach me your Monday. The whole morning." },
      ],
      replyCandidates: [
        {
          id: "przemek:motivation:rep-1",
          text: "Mechanism is the right word — motivation is a MACHINE, not a mood. Mine has three parts: one read of yesterday's wins, one listen to a voice note from a happy client kept for exactly this, and one promise about today's single most important call. The machine has run for nine years. It does not need a battery. It needs the ROUTINE.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:motivation:rep-2",
          text: "Real, and I will do you one better: the mirror gets the FULL performance — posture, smile, one line out loud. 'Someone today needs what you sell.' The mirror is the first audience and the only one that cannot lie to you. If you cannot convince the mirror, my friend, you have no business convincing strangers.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:motivation:rep-3",
          text: "The reset is ARITHMETIC: four noes means the base rate is working, and the fifth call is statistically warmer than the first. I keep a card in the wallet: 'every yes is behind a stack of noes, and the stack is not personal'. After four noes I walk once, coffee once, then call the NICEST name on the list. Not the biggest. The nicest.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:motivation:rep-4",
          text: "Theater with a metabolism, my friend — the energy is a professional instrument, like Tomek's keyboard. It has a maintenance schedule: sleep, food, and one day a week where I am nobody, in a plain shirt, on a bench. The dip exists. I schedule around it like weather. Nobody sees the weather. Everybody sees the climate.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:motivation:rep-5",
          text: "The ritual: one hour of grief, exactly — I write the dead deal a letter I never send, listing what I learned, and then I file it. Dead deals teach at the funeral or not at all. Then, same day, one NEW call, small, easy, warm. The pipeline cannot hear about the funeral. The pipeline has to see you move on. Same day.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:motivation:rep-6",
          text: "Monday begins Sunday night: the three calls chosen, the shirt chosen, the one-liner rehearsed in the shower. Then the mirror, the coffee, the notebook — I read yesterday's page out loud, the whole thing, like a sportscaster. By eight fifteen I have sold the day to the only buyer who matters. Momentum, my friend. Cheaper than coffee.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:leads-board",
      label: "The leads board",
      optionCandidates: [
        { id: "przemek:leads-board:opt-1", topicId: "przemek:leads-board", text: "There is a physical leads board. Why not software?" },
        { id: "przemek:leads-board:opt-2", topicId: "przemek:leads-board", text: "The board has colors. Decode them." },
        { id: "przemek:leads-board:opt-3", topicId: "przemek:leads-board", text: "A lead moved backwards on the board. Publicly?" },
        { id: "przemek:leads-board:opt-4", topicId: "przemek:leads-board", text: "Who touches the board? Access rules." },
        { id: "przemek:leads-board:opt-5", topicId: "przemek:leads-board", text: "Kasia wants the board's data. Feed it to her?" },
        { id: "przemek:leads-board:opt-6", topicId: "przemek:leads-board", text: "What happens to a lead that sits too long?" },
      ],
      replyCandidates: [
        {
          id: "przemek:leads-board:rep-1",
          text: "Software hides the leads in a scroll and the scroll hides the TRUTH — the board is on the wall, the wall is next to the coffee, and the coffee is where deals are born. I can see my whole future in one glance, my friend. The board is a mirror with magnets. Software is a mirror in a drawer.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:leads-board:rep-2",
          text: "Green is warm — calendar exists. Yellow is warming — coffee had. Red is cold but breathing — responded this quarter. Gray is the graveyard, and the graveyard is RESPECTED, not deleted. The colors move. The movement is the drama. I have watched a lead go gray to green in one phone call. Cinema, my friend.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:leads-board:rep-3",
          text: "Publicly, and that is the FEATURE — a lead moving backwards is information wearing a shame coat, and the office learns from it faster than any retrospective. I moved one back myself last quarter. Walked it myself. Announced it. The board does not judge, my friend. It reflects. The judging is done internally, over coffee.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:leads-board:rep-4",
          text: "Me, and whoever I am training that month — the board is a class and the magnets are homework. Kasia reads it. Nobody else moves a magnet. The rule keeps the board honest — a board everyone edits is a board nobody trusts. One hand, one truth. The hand is mine. The truth is the market's.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:leads-board:rep-5",
          text: "Feed her, monthly, on one condition — the board stays. Her census finds patterns I cannot see; I once learned that my gray leads shared a postal code, which was the most useful geography lesson of my career. Data and drama are not rivals, my friend. They are the same animal with different grooming.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:leads-board:rep-6",
          text: "It gets the CALL OF RESURRECTION — one honest call, no pitch: 'you have been on my board for ninety days and that is my fault. Should I stop calling?' A third of them come back to green. A third. The rest thank me and go gray forever. Both outcomes are clean. The board loves a funeral with an announcement.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:competitors",
      label: "The competitor salesmen",
      optionCandidates: [
        { id: "przemek:competitors:opt-1", topicId: "przemek:competitors", text: "The competitor's salesman is your friend. How?" },
        { id: "przemek:competitors:opt-2", topicId: "przemek:competitors", text: "You lost a client to them. Send referrals?" },
        { id: "przemek:competitors:opt-3", topicId: "przemek:competitors", text: "Their pitch mocks ours. Response?" },
        { id: "przemek:competitors:opt-4", topicId: "przemek:competitors", text: "Poaching their salesman. Tempted?" },
        { id: "przemek:competitors:opt-5", topicId: "przemek:competitors", text: "What do you learn from losing to them?" },
        { id: "przemek:competitors:opt-6", topicId: "przemek:competitors", text: "The competitor conference run-in. Survivable?" },
      ],
      replyCandidates: [
        {
          id: "przemek:competitors:rep-1",
          text: "Friendship is the PROFESSIONAL form of respect — we drink one coffee a quarter and complain about clients like two doctors at a conference. He sells to people I cannot help. I sell to people he cannot help. The market is not a war, my friend, it is a city. Cities need more than one taxi.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:competitors:rep-2",
          text: "I do, and it is the most expensive cologne I own — a referral to your rival says 'I am not afraid of you', and fearlessness closes the NEXT three clients. He sent me one back last spring. We are even. The market respects men who trade. There is enough business for both of us and not enough honesty to waste.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:competitors:rep-3",
          text: "Nothing. Response is a category of energy, my friend, and energy follows REVENUE. If their pitch mocks us, their pitch is doing our marketing — for free, with their budget. I once watched a competitor spend six slides on us. Six slides! We were a CHAPTER in their pitch. I framed it. Highest honor the market gives.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:competitors:rep-4",
          text: "Tempted twice, refused twice — poached salesmen bring their playbook and their scar tissue, and the scar tissue does not fit our clients. I hire hungry, not haunted. The poached salesman is a stranger with someone else's address book. The hungry one builds his own. Address books decay, my friend. Hunger compounds.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:competitors:rep-5",
          text: "The truth about my own pitch — losing is the only honest mirror. When they beat me I buy the coffee and ask the client ONE question: 'what did they say that I did not?' The answers are gold. I once lost a deal because their demo had COFFEE. Actual coffee. For everyone. I now bring coffee everywhere. The loss paid for itself by summer.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:competitors:rep-6",
          text: "Survivable with one rule: we drink together in public, on purpose, where everyone sees. The market reads the friendship as strength — two men who can afford to be seen together must both be doing well. Secrecy reads as fear. I have turned one lobby encounter into two referrals. Visibility, my friend. The salesman's armor.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:archetypes",
      label: "The client archetypes",
      optionCandidates: [
        { id: "przemek:archetypes:opt-1", topicId: "przemek:archetypes", text: "You classify clients into archetypes. List them." },
        { id: "przemek:archetypes:opt-2", topicId: "przemek:archetypes", text: "The Skeptic — how do you sell to one?" },
        { id: "przemek:archetypes:opt-3", topicId: "przemek:archetypes", text: "The Enthusiast who buys too fast. Handle?" },
        { id: "przemek:archetypes:opt-4", topicId: "przemek:archetypes", text: "Which archetype is the most dangerous?" },
        { id: "przemek:archetypes:opt-5", topicId: "przemek:archetypes", text: "Can a client change archetypes mid-deal?" },
        { id: "przemek:archetypes:opt-6", topicId: "przemek:archetypes", text: "What archetype are YOU to the client? Honestly." },
      ],
      replyCandidates: [
        {
          id: "przemek:archetypes:rep-1",
          text: "Five, my friend, painted on the inside of the notebook cover: the Skeptic, the Enthusiast, the Historian, the Delegator, and the Ghost. Everything else is weather. Five archetypes, five approaches, one rule that never changes: sell the way they BUY, not the way you LIKE. The notebook cover is the entire MBA.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "przemek:archetypes:rep-2",
          text: "The Skeptic buys PROOF, not promises — bring receipts, case studies, and one honest limitation you admit BEFORE they find it. The admission is the key, my friend: the Skeptic is waiting for the catch, and giving them the catch voluntarily is the only compliment they accept. I close Skeptics with 'here is what we are bad at'.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:archetypes:rep-3",
          text: "The Enthusiast gets a SLOWING HAND — enthusiasm is a mood and moods sign contracts they regret. My job is to be the adult in the room: 'let us sleep on this together'. The deal that survives a night survives a year. The deal signed in the glow churns and tells the story at dinner parties. I protect Enthusiasts from themselves.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:archetypes:rep-4",
          text: "The Historian — the one who begins every meeting with how the last vendor failed. Not dangerous because they bite. Dangerous because they have GRAVES, my friend, and they will show you every one. You sell to a Historian with a shovel: acknowledge the graves, explain the graveyard rules, and never say 'trust me'.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:archetypes:rep-5",
          text: "They change mid-SENTENCE, and the change is always SIGNAL — the Enthusiast who goes quiet has met a Skeptic spouse; the Skeptic who gets warm has told their boss the price. The archetype shift is the client thinking out loud. My job is to notice the costume change faster than the client does. Mirror work, my friend.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:archetypes:rep-6",
          text: "To them? A weather system — warm front with a schedule. I am not the product and I am not the friend. I am the man who CALLS when he said he would, and in a world of ghosts and Historians, that is an archetype of its own. The Reliable One. Least glamorous, highest renewal rate in the notebook. Statistics renew, my friend.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:success-book",
      label: "The sales book",
      optionCandidates: [
        { id: "przemek:success-book:opt-1", topicId: "przemek:success-book", text: "You are writing a sales book. Chapter one done?" },
        { id: "przemek:success-book:opt-2", topicId: "przemek:success-book", text: "The book's title is terrible. Perfect. Say it again." },
        { id: "przemek:success-book:opt-3", topicId: "przemek:success-book", text: "Who is the book for? Every salesman lies already." },
        { id: "przemek:success-book:opt-4", topicId: "przemek:success-book", text: "Will the book include the failures? All of them?" },
        { id: "przemek:success-book:opt-5", topicId: "przemek:success-book", text: "Zosia offered to edit. Dangers?" },
        { id: "przemek:success-book:opt-6", topicId: "przemek:success-book", text: "Self-publish or find a real publisher?" },
      ],
      replyCandidates: [
        {
          id: "przemek:success-book:rep-1",
          text: "Chapter one is done and it is the HARDEST chapter, my friend, because chapter one is 'why listen to me' and humility is not my native language. It is one page: twenty years, two markets, one notebook, and every mistake itemized with its price. The price is the credential. Anyone can claim success. The price list cannot be faked.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:success-book:rep-2",
          text: "'Sell Like Everyone Is Watching' — terrible, yes, and TERRIBLY CORRECT, because the whole argument is that reputation is the only compounding asset in sales. The terrible title is a FILTER: the people who mock it will not live by it. The people who underline it are my people. Marketing begins at the title. Terrible ones are remembered.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:success-book:rep-3",
          text: "For the tired ones — not the naturals, the TIRED. The ones who were told they are not 'sales types' by people who have never made a call in their lives. The book is a permission slip: sales is a craft, crafts are learnable, and the learning is mostly unlearning the shame. Chapter three is 'You Are Not Interrupting'.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:success-book:rep-4",
          text: "All of them, with prices — the book without the losses is a brochure, and brochures do not teach. Every chapter ends with 'the mistake' and 'the invoice', meaning what it cost in money and in face. The failures are the curriculum. The folder is labeled with a typo I am keeping. It is on brand. Typos are honest.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:success-book:rep-5",
          text: "Accepted, with one treaty clause: the voice stays. She fixes the grammar, the structure, and the sentences that run like the marathon, and I keep the CAPS where the CAPS live. Her last note said 'this sentence is doing too much'. I framed the note. The book needs a diplomat and a showman. She is the diplomat.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:success-book:rep-6",
          text: "Self-publish, and here is the salesman's answer: a publisher buys the RIGHT to say no, delays the book a year, and keeps the margin. I have sold for twenty years — I can sell a book. The risk is real and the risk is MINE, which is the only way I have ever done anything. Grazyna costed the print run. She will deny it. The books will arrive.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books", "relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:voicemail",
      label: "The voicemail art",
      optionCandidates: [
        { id: "przemek:voicemail:opt-1", topicId: "przemek:voicemail", text: "Your voicemail greeting is forty seconds long." },
        { id: "przemek:voicemail:opt-2", topicId: "przemek:voicemail", text: "Do you actually leave voicemails in 2026?" },
        { id: "przemek:voicemail:opt-3", topicId: "przemek:voicemail", text: "Kasia says your voicemails are 'audible cologne'." },
        { id: "przemek:voicemail:opt-4", topicId: "przemek:voicemail", text: "You once closed a deal BY voicemail?" },
        { id: "przemek:voicemail:opt-5", topicId: "przemek:voicemail", text: "Marek's voicemail is just a beep. React." },
        { id: "przemek:voicemail:opt-6", topicId: "przemek:voicemail", text: "Teach me the voicemail formula." },
      ],
      replyCandidates: [
        {
          id: "przemek:voicemail:rep-1",
          text: "Forty seconds of pure anticipation, my friend! Name, number, ONE tease — 'I have an idea about your Q4, call me before Thursday'. You never give the idea away on the machine. The voicemail is not a message. The voicemail is a movie trailer. Twenty years of trailers, my friend, and the box office is MY PHONE NUMBER.",
          relationshipHint: "pleased",
          tags: ["period:morning", "relationship:neutral"],
        },
        {
          id: "przemek:voicemail:rep-2",
          text: "ALWAYS. Texts are for dentist confirmations, my friend. A voicemail says: I used my VOICE, I spent TIME, I believed in this call enough to leave evidence. Executives under forty delete texts. Executives over forty replay voicemails. I am playing BOTH generational markets with one button. It is called full-spectrum outreach. You heard it here.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:voicemail:rep-3",
          text: "Audible COLOGNE! I framed the compliment, my friend! She meant it as a warning — too much presence for one channel — but think about what cologne DOES: it arrives before you, it lingers after you, and the right amount makes people lean IN. The right amount! We are calibrating, Kasia and me. She says one sentence max. I say one sentence and a promise. Progress, my friend.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:voicemail:rep-4",
          text: "Two thousand eighteen, industrial client, eleven voicemails over five weeks — each one a CHAPTER, my friend, like a radio novel. Week one: the problem. Week three: the cost of the problem, with a number. Week five: 'I will stop calling on Friday.' He called THURSDAY. Eleven voicemails, one signature. The man told me later he forwarded chapter six to his wife.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:voicemail:rep-5",
          text: "A BEEP, my friend! No name, no number, no tease! That is not a voicemail, that is a VACANCY! I left him a message once and got his beep, and the beep got my business because I called BACK out of professional respect for the emptiness. Marek and I have an arrangement now: his beep, my voice. The yin and the yang of the office phone system. Do not tell him I said yang.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:voicemail:rep-6",
          text: "Three beats, my friend! Beat one: WHO and WHY, eight seconds, no warm-up — the weather is free everywhere. Beat two: the tease, one specific thing — 'the number on your training spend' beats 'some ideas', ALWAYS the number. Beat three: the deadline, soft but real — 'before Thursday' gives the calendar a handle. Total: twenty seconds.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:slow-quarter",
      label: "The slow quarter",
      optionCandidates: [
        { id: "przemek:slow-quarter:opt-1", topicId: "przemek:slow-quarter", text: "Q3 is slow. Even for you." },
        { id: "przemek:slow-quarter:opt-2", topicId: "przemek:slow-quarter", text: "What do you actually DO in a slow quarter?" },
        { id: "przemek:slow-quarter:opt-3", topicId: "przemek:slow-quarter", text: "Grazyna's forecast for Q3 has no optimism in it." },
        { id: "przemek:slow-quarter:opt-4", topicId: "przemek:slow-quarter", text: "Zosia cut the Q3 travel budget." },
        { id: "przemek:slow-quarter:opt-5", topicId: "przemek:slow-quarter", text: "You called Q3 'the oven' in the meeting." },
        { id: "przemek:slow-quarter:opt-6", topicId: "przemek:slow-quarter", text: "How do you keep the team warm in a slow quarter?" },
      ],
      replyCandidates: [
        {
          id: "przemek:slow-quarter:rep-1",
          text: "Q3 is slow for EVERYONE, my friend — the country is at the sea, the decision-makers are checking email from a towel, and the budgets hibernate. This is not a crisis, this is CLIMATE. You do not fight the oven. You prep the feast that cooks IN the oven. My pipeline in August feeds my commission in October.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:slow-quarter:rep-2",
          text: "FARMING, my friend! Slow quarters are for planting — I call every client who went quiet, I visit the ones who said 'maybe next year' LAST year, and I write forty thank-you notes to people who did NOT buy, because they will remember who stayed polite in the famine. The slow quarter is a gift of TIME. Everyone else spends it staring at dashboards.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:slow-quarter:rep-3",
          text: "Grazyna's forecast is a work of ART, my friend — every number hand-chiseled from the granite of last year, zero dreams, zero fear. And here is the beautiful part: she is ALWAYS right by five percent, which means her pessimism is worth EXACTLY one optimism. I read her forecast before I set my own targets — my target is her number plus the difference between us.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:slow-quarter:rep-4",
          text: "She cut the budget and she was RIGHT, my friend — do not tell her I agreed, tell everyone I fought. In a slow quarter, travel is a cost with no audience; the client is at the sea, the hotel is empty, and the demo dies on a laptop in an empty conference room. I took that trip ONCE, in 2019. Presented a two-hour workshop to one intern and a plant. The plant green-lit nothing.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:slow-quarter:rep-5",
          text: "The OVEN, yes! Because Q3 is where salespeople go to bake — the heat is on, the results are slow, and everyone opens the door every five minutes and ruins the bread. The oven metaphor is now OFFICIAL, my friend — Zosia used it in the town hall, Maciek put it on a slide, and Grazyna wrote 'see: oven' in her forecast notes. I have contributed to the company vocabulary.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:slow-quarter:rep-6",
          text: "With STORIES, my friend — real ones. Every Monday in a slow quarter I tell the team about the deal that almost died and did not, the client who came back after two years, the worst Q3 of my life and the October that paid for my car. Slow quarters are FEAR with a calendar, and fear dies in the presence of specific stories. Numbers do not inspire anyone.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:ninety-slides",
      label: "The ninety-slide deck",
      optionCandidates: [
        { id: "przemek:ninety-slides:opt-1", topicId: "przemek:ninety-slides", text: "Your deck has ninety slides. The meeting is one hour." },
        { id: "przemek:ninety-slides:opt-2", topicId: "przemek:ninety-slides", text: "Do you present all ninety? Every time?" },
        { id: "przemek:ninety-slides:opt-3", topicId: "przemek:ninety-slides", text: "Slide forty-one is just the word TRUST." },
        { id: "przemek:ninety-slides:opt-4", topicId: "przemek:ninety-slides", text: "Tomek offered to convert your deck to one page." },
        { id: "przemek:ninety-slides:opt-5", topicId: "przemek:ninety-slides", text: "Zosia asks for the 'short version'. What IS it?" },
        { id: "przemek:ninety-slides:opt-6", topicId: "przemek:ninety-slides", text: "Where did the ninety-slide deck come from?" },
      ],
      replyCandidates: [
        {
          id: "przemek:ninety-slides:rep-1",
          text: "Ninety slides, one hour, PERFECT math, my friend — because I present TWELVE and the client asks to see the rest! The deck is not a presentation. The deck is PROOF OF PREPARATION. When they see ninety slides, they know the other guy brought eleven. The eleven-slide man is answering questions. The ninety-slide man is CHOOSING which questions get asked.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:ninety-slides:rep-2",
          text: "Never all ninety, my friend — that is the AMATEUR reading of the deck. The deck is a menu, and I am the waiter. The client says 'pricing' and I slide-jump to sixty. The client says 'but our team is special' and we are at seventy-two, the testimonials of special teams. Reading the room is choosing the route through the deck in real time.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:ninety-slides:rep-3",
          text: "Slide forty-one is the HEART of the deck, my friend — one word, thirty seconds of silence, and the room does the rest. You know what happens in that silence? THEY start selling it to THEMSELVES. 'Trust. Yes. We need trust. Who gives trust? WE give trust. Who receives it?' By the time I speak again, the deal has been made and I did not make it — the SILENCE made it.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:ninety-slides:rep-4",
          text: "Tomek offered ONE PAGE and I love the boy, my friend, but he confuses the deck with the DELIVERY. His one page is beautiful — I keep it in the car, I truly do — but the one page is for ME, in the car, before I walk in. The ninety slides are for THEM, in the room, watching the size of my preparation. Different tools, different jobs! His page wins arguments.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:ninety-slides:rep-5",
          text: "The short version is slide forty-one, my friend! TRUST! She rolls her eyes, I hold up one finger, and we both laugh because we BOTH know she has watched that single slide close more deals than the other eighty-nine combined. Zosia asks for the short version the way people ask a jazz musician for the hit — she wants to see if I still have it. I always still have it.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:ninety-slides:rep-6",
          text: "Nineteen ninety-four, my friend, cassette era — I inherited it from my first sales manager, a legend named Stefan who said 'build the deck you wish existed when YOU were the confused client'. Every year I add slides, never delete. Stefan's originals are slides one through twenty, and slide forty-one — TRUST — is his, untouched, in his font. Stefan passed in twenty nineteen.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:swag-bags",
      label: "The swag bags",
      optionCandidates: [
        { id: "przemek:swag-bags:opt-1", topicId: "przemek:swag-bags", text: "The conference swag bags have your face on them." },
        { id: "przemek:swag-bags:opt-2", topicId: "przemek:swag-bags", text: "How much does a swag bag cost per lead?" },
        { id: "przemek:swag-bags:opt-3", topicId: "przemek:swag-bags", text: "Grazyna saw the swag invoice and blinked twice." },
        { id: "przemek:swag-bags:opt-4", topicId: "przemek:swag-bags", text: "The tote bags ended up at the market stall." },
        { id: "przemek:swag-bags:opt-5", topicId: "przemek:swag-bags", text: "Klaudia says swag is 'content you can hold'." },
        { id: "przemek:swag-bags:opt-6", topicId: "przemek:swag-bags", text: "Best swag item you ever gave away?" },
      ],
      replyCandidates: [
        {
          id: "przemek:swag-bags:rep-1",
          text: "My FACE, my friend, on the smaller items — the big items carry the LOGO, because there is confident and there is CARGO. The face goes on the sticker, the sticker goes on the laptop, and every meeting for a year, some client looks at a face that says 'Przemek is thinking about your training needs'. THAT, my friend, is called ambient presence. The face works while I sleep.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:swag-bags:rep-2",
          text: "Per lead, the bag is nothing, my friend — the bag is the ENVELOPE. The cost per lead is the CONTENTS doing their job: one good pen at forty groszy outlives three bad pens and gets BORROWED, and a borrowed pen is a pen with your logo in someone else's meeting. The bag is arithmetic, my friend. Cheap pens are expensive. Good pens are an annuity. I buy annuities by the crate.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:swag-bags:rep-3",
          text: "Blinked TWICE, which in Grazyna is a full paragraph! Then she asked the killer question — 'what is the cost per retained impression?' — and my friend, I had the answer READY, because I have run that math since two thousand eleven. She approved the invoice with one word: 'adequate'. From Grazyna, adequate is a standing ovation.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:swag-bags:rep-4",
          text: "The overprint totes went to Grazyna's market stall, my friend, and here is the beautiful part — her candle customers are EXACTLY the demographic that runs training budgets! Teachers, nurses, librarians! The bags carried candles out and referrals BACK. She reports — she will deny the word 'reports' — that three stall customers booked corporate demos.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:swag-bags:rep-5",
          text: "Content you can HOLD — she is right, my friend, and I have upgraded my entire philosophy because of that one sentence! The bag is a POST in physical space! When the client's kid carries our tote to school, that is an impression with a HEARTBEAT. Klaudia now films the unboxing and the bag performs online AND offline. Two channels, one tote.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:swag-bags:rep-6",
          text: "Two thousand sixteen, my friend — theRubber DUCK, before it was fashionable! A stress duck with a tiny tie, because 'every deal needs someone to squeeze'. Clients kept them on DESKS for YEARS. I have walked into meetings a decade later and the duck is STILL THERE, wearing its tiny tie, watching over the account like a guardian.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:power-breakfast",
      label: "The power breakfast",
      optionCandidates: [
        { id: "przemek:power-breakfast:opt-1", topicId: "przemek:power-breakfast", text: "Breakfast meetings? At 7am? Really?" },
        { id: "przemek:power-breakfast:opt-2", topicId: "przemek:power-breakfast", text: "Who pays at a power breakfast?" },
        { id: "przemek:power-breakfast:opt-3", topicId: "przemek:power-breakfast", text: "Zosia calls your breakfast spot 'the second office'." },
        { id: "przemek:power-breakfast:opt-4", topicId: "przemek:power-breakfast", text: "Maciek joined one breakfast and closed a deal mid-omelette." },
        { id: "przemek:power-breakfast:opt-5", topicId: "przemek:power-breakfast", text: "The waiter knows your order AND your pipeline." },
        { id: "przemek:power-breakfast:opt-6", topicId: "przemek:power-breakfast", text: "Teach me the power breakfast." },
      ],
      replyCandidates: [
        {
          id: "przemek:power-breakfast:rep-1",
          text: "Seven am, my friend, because the decision-maker's phone does not ring until nine and his CALENDAR does not own him until ten! At seven I have the whole man — rested, caffeinated, honest. Nobody lies convincingly before nine, my friend. The morning man tells you the TRUE budget. By lunch he is a lawyer. I only want the morning man.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:power-breakfast:rep-2",
          text: "I pay, ALWAYS, my friend — and I pay visibly, with the card that has my name facing UP. The breakfast is not a meal, it is a DEMONSTRATION: I feed you before you owe me anything. Fifty zloty of eggs buys a psychological mortgage on the whole meeting. And here is the secret — when the client REACHES for the check, let him win one time out of five.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:power-breakfast:rep-3",
          text: "The second office, and she is RIGHT, my friend — the waitress there knows more about my pipeline than the CRM! Zosia said it at a town hall and now the SPOT puts my meetings in THEIR reservation book under 'Przemek's office'. I have an office with BETTER coffee than ours and no meeting culture whatsoever.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:power-breakfast:rep-4",
          text: "Mid-OMLETTE, my friend, closed it before the plate arrived! I brought Maciek to SHOW him my process, and the client asked one technical question and Maciek answered for NINE MINUTES with such beauty that the client signed on the napkin — the ACTUAL napkin, which Maciek kept, which is now in his plaque drawer next to the awards he hides! The napkin is a company artifact! The.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:power-breakfast:rep-5",
          text: "He knows the order AND the pipeline, my friend, because for six years I have processed deals out loud at table four! Marek the waiter — no relation to OUR Marek, the universe is not that cruel — knows which accounts are warm, which are 'the sea in August', and which ones I lost.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:power-breakfast:rep-6",
          text: "Three rules, my friend! Rule one: book the SAME table every time — territory is trust, and the client should feel like a REGULAR before he is a client. Rule two: order FIRST, decisively — a man who knows his order is a man who knows his numbers.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:eye-contact",
      label: "The eye-contact doctrine",
      optionCandidates: [
        { id: "przemek:eye-contact:opt-1", topicId: "przemek:eye-contact", text: "You hold eye contact a beat too long. Method?" },
        { id: "przemek:eye-contact:opt-2", topicId: "przemek:eye-contact", text: "You trained the whole sales team in eye contact?" },
        { id: "przemek:eye-contact:opt-3", topicId: "przemek:eye-contact", text: "Kasia says your eye contact is 'a handshake with eyes'." },
        { id: "przemek:eye-contact:opt-4", topicId: "przemek:eye-contact", text: "Marek defeated you. He did not blink once." },
        { id: "przemek:eye-contact:opt-5", topicId: "przemek:eye-contact", text: "Dawid's eye contact is two seconds and total. Study it?" },
        { id: "przemek:eye-contact:opt-6", topicId: "przemek:eye-contact", text: "Teach me eye contact without being weird." },
      ],
      replyCandidates: [
        {
          id: "przemek:eye-contact:rep-1",
          text: "One beat PAST comfortable, my friend, because comfortable is where trust is BORN! Everyone breaks eye contact at the moment of the ask — watch for it, it is a LAW of nature. The one who holds past the ask controls the deal. I do not stare, I PRESENCE. There is a difference and the difference is warmth in the eyebrows. Staring is eye contact without love, my friend.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:eye-contact:rep-2",
          text: "I did, my friend, one workshop, ninety minutes, and the closing rate went up eleven percent — I have the numbers, Grazyna has the numbers, the NUMBERS have the numbers! The exercise was simple: sixty seconds of silent eye contact in pairs.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:eye-contact:rep-3",
          text: "A handshake with EYES — Kasia saw it in one meeting and put it in HR training materials, my friend, I have SEEN the slide! The slide has my FACE and one arrow pointing at my eyes with the word 'here'! I am in the official onboarding of this company as an EYEBROW EXAMPLE.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "period:afternoon"],
        },
        {
          id: "przemek:eye-contact:rep-4",
          text: "DEFEATED, my friend, and I am still processing it! Ninety seconds across the server room door and the man did not blink, did not smile, did not FLINCH — his eyes were two server status lights set to 'all systems nominal'! I broke first, I admit it, and he said one word: 'coffee?' My friend, I have met ministers, CEOs, one actual celebrity chef — Marek's gaze is the FINAL.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:eye-contact:rep-5",
          text: "Two seconds of TOTAL attention and then he looks at the numbers — my friend, that is not less eye contact, that is EYE CONTACT WITH A DESTINATION! The amateur holds eyes forever with nowhere to go.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:eye-contact:rep-6",
          text: "The trick is the TRIANGLE, my friend — left eye, right eye, and one honest beat on the bridge of the nose! Nobody can tell nose from eyes, but the triangle SOFTENS the gaze, my friend! Five seconds on the triangle, then ONE natural glance away — you glance away FIRST but you come BACK, my friend, and the coming back is everything! The glance says 'I am normal'.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:client-baskets",
      label: "The client baskets",
      optionCandidates: [
        { id: "przemek:client-baskets:opt-1", topicId: "przemek:client-baskets", text: "You sent a client a gift basket with a retro cassette in it?" },
        { id: "przemek:client-baskets:opt-2", topicId: "przemek:client-baskets", text: "What is IN a classic Przemek basket?" },
        { id: "przemek:client-baskets:opt-3", topicId: "przemek:client-baskets", text: "Grazyna categorizes baskets as what, exactly?" },
        { id: "przemek:client-baskets:opt-4", topicId: "przemek:client-baskets", text: "One basket went to the wrong company. Story?" },
        { id: "przemek:client-baskets:opt-5", topicId: "przemek:client-baskets", text: "Kasia flagged a basket for compliance." },
        { id: "przemek:client-baskets:opt-6", topicId: "przemek:client-baskets", text: "Do baskets work, or is it all theater?" },
      ],
      replyCandidates: [
        {
          id: "przemek:client-baskets:rep-1",
          text: "The CASSETTE, my friend, because the client told me at a conference that his first sales job used a cassette course — SAME course as mine, nineteen ninety-four, the Stefan tapes! I found one at a flea market, my friend, THREE zloty, and I put it in his birthday basket with a note: 'the course that started two dynasties'. The man FRAMED it.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:client-baskets:rep-2",
          text: "The architecture is SACRED, my friend! Bottom layer: local, edible, unbranded — honey, bread, never a logo on the honey, the honey is INNOCENT. Middle layer: one personal item, researched, one of a kind — the cassette, a book with a note, a photo from the conference where they spoke. Top layer: one company item, SMALL, tasteful, a pen at most.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:client-baskets:rep-3",
          text: "'Client relations, non-monetary, goodwill category', my friend, which is the most romantic thing an accountant has ever said to me! She has a CODE for the baskets! Basket code! And once a year she audits the basket ledger — the LEDGER exists, my friend, I have seen it, every basket since two thousand fifteen with recipient, contents, and a column called 'sentiment yield'.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:client-baskets:rep-4",
          text: "Two companies, ONE office building, my friend — basket meant for Industrial A delivered to Industrial B, their COMPETITOR! I panicked for one full minute, then I put on the good shoes and walked over to B personally. 'This basket was for your neighbor, but you know what? Your neighbor and I have history. YOU and I have an opportunity.' My friend. I signed B six months later.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:client-baskets:rep-5",
          text: "She flagged the WINE, my friend — a government client, gift limit, compliance, the whole elegant machine! And Kasia was RIGHT and I was TECHNICALLY creative, and the basket went out with the wine replaced by... are you ready...",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:client-baskets:rep-6",
          text: "My friend, let me tell you what theater DOES — it books the sequel! The basket does not close deals, TRUE. The basket buys the SECOND meeting, and the second meeting is where deals LIVE! Every man can send an invoice.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:cassette-course",
      label: "The cassette course",
      optionCandidates: [
        { id: "przemek:cassette-course:opt-1", topicId: "przemek:cassette-course", text: "Is it true you learned sales from cassette tapes?" },
        { id: "przemek:cassette-course:opt-2", topicId: "przemek:cassette-course", text: "The Stefan tapes — do you still listen to them?" },
        { id: "przemek:cassette-course:opt-3", topicId: "przemek:cassette-course", text: "Pawel asked what a cassette is. Feelings?" },
        { id: "przemek:cassette-course:opt-4", topicId: "przemek:cassette-course", text: "You quoted Stefan in the sales meeting and it landed." },
        { id: "przemek:cassette-course:opt-5", topicId: "przemek:cassette-course", text: "Tomek says the tapes are 'outdated heuristics'." },
        { id: "przemek:cassette-course:opt-6", topicId: "przemek:cassette-course", text: "Would the course work on young sellers today?" },
      ],
      replyCandidates: [
        {
          id: "przemek:cassette-course:rep-1",
          text: "TWELVE cassettes, my friend, 'Selling Is Serving' by the legendary Stefan Malinowski, nineteen ninety-four! I played them in my FIRST CAR, a Fiat that only had a cassette player and dreams! Side A of tape seven taught me the alternate close and I have USED it, my friend, THOUSANDS of times! Stefan's voice is in my head rent-free and the rent he pays ME is commission.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:cassette-course:rep-2",
          text: "Every January, my friend, tape one, side A, in the car, first Monday of the year — it is a RELIGIOUS observance! 'Prospects are people who have not heard your reason yet.' Nineteen words, my friend, and the whole industry is still trying to say it better! I have heard podcasts, seminars, one AI-generated course that I listened to OUT OF RESPECT — nothing has the SOUL of.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:cassette-course:rep-3",
          text: "He asked what a cassette IS, my friend, and I did not cry, I PERSPIRED WITH HISTORY! I brought him one, I showed him the pencil trick — you wind it with a PENCIL, my friend, manual loading, the ORIGINAL technology restoration! The boy was FASCINATED, he filmed it, he called it 'analog maintenance ritual' which is the most Tomek sentence ever spoken! Now there are two people.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:cassette-course:rep-4",
          text: "I quoted 'the client who explains their budget is BUYING, the client who defends it is ALREADY sold' — and the room went QUIET, my friend, because the client had JUST defended the budget and everyone knew it! Zosia wrote it on the whiteboard! TOMEK nodded, and Tomek nodding is the Nobel Prize of this office! Stefan's words, thirty years old, landing in a meeting with a.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:cassette-course:rep-5",
          text: "'Outdated heuristics', my friend, and I have been SAVORING the insult for a week! It is the most beautiful thing anyone has called my tapes! I said: Tomek, my friend, EVERY method is a heuristic — your tests are heuristics, Marek's monitoring is a heuristic, LIFE is heuristics all the way down! The difference is MY heuristics have been field-tested by THIRTY YEARS of human.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:cassette-course:rep-6",
          text: "The course is HUMAN NATURE, my friend, and human nature ships without patches! Side A would work TOMORROW — the core is: listen twice as long as you talk, find the REAL budget under the stated one, and make the client feel BRILLIANT for buying! Tell me what app has improved on THAT! I would modernize the DELIVERY — PodRaczekStefana, my friend, a podcast, Klaudia produces, I.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:rescue-calls",
      label: "The rescue calls",
      optionCandidates: [
        { id: "przemek:rescue-calls:opt-1", topicId: "przemek:rescue-calls", text: "Kasia said you 'rescued' her client meeting?" },
        { id: "przemek:rescue-calls:opt-2", topicId: "przemek:rescue-calls", text: "What is your rescue rate, honestly?" },
        { id: "przemek:rescue-calls:opt-3", topicId: "przemek:rescue-calls", text: "You rescued a deal Tomek had already offended." },
        { id: "przemek:rescue-calls:opt-4", topicId: "przemek:rescue-calls", text: "Zosia calls rescues 'relationship debt collection'." },
        { id: "przemek:rescue-calls:opt-5", topicId: "przemek:rescue-calls", text: "Has a rescue ever failed? Completely?" },
        { id: "przemek:rescue-calls:opt-6", topicId: "przemek:rescue-calls", text: "Teach me the rescue call." },
      ],
      replyCandidates: [
        {
          id: "przemek:rescue-calls:rep-1",
          text: "RESCUED, and I want to be humble, my friend, but humility does not have a phone plan! Kasia had a client going cold — one missed renewal, one unanswered email — and I called the man and talked about his DAUGHTER'S WEDDING for nine minutes because I REMEMBERED it from a conference in twenty twenty-two! Renewal signed that afternoon! The CRM stores data, my friend.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:rescue-calls:rep-2",
          text: "Rescue rate: seven of ten, my friend, and I will show you the notebook — the RESCUE NOTEBOOK, blue cover, every attempt since two thousand nine! The three failures get MORE pages than the seven wins, my friend, because the failures have LESSONS and the wins have only CONFETTI! Seven of ten, documented, and Grazyna has verified the math, which means the seven is not a story —.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:rescue-calls:rep-3",
          text: "Tomek told the client his onboarding plan was 'structurally romantic', my friend — STRUCTURALLY ROMANTIC! — and the room went to ICE! I drove there through the RAIN, and here is what I did NOT do: I did not apologize for Tomek! I said 'you hired the most honest man in Polish software, and you almost fired him for it — imagine what he will catch in year two'! My friend, they.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:rescue-calls:rep-4",
          text: "'Relationship debt collection' — she said it at the retreat and the whole team laughed and I want you to know, my friend, I did NOT laugh, because she is RIGHT! Every relationship I have built for twenty years is an ACCOUNT, and the rescue call is a WITHDRAWAL — but here is my amendment to her theory: I make DEPOSITS the client does not see! The birthday call with no agenda!.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:rescue-calls:rep-5",
          text: "Once, my friend, twenty nineteen, and I will tell you exactly why: I rescued the RELATIONSHIP when the rescue needed to be a TECHNICAL fix! The client did not leave because of feelings — he left because the product broke twice and Marek needed three weeks he did not get! I did everything right, my friend — the calls, the warmth, the BASKET — and the man still left, and he.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:rescue-calls:rep-6",
          text: "Rule one: you call the PERSON, not the problem — the problem has a ticket number, the person has a NAME, use it twice, three times max, more becomes theater! Rule two: you arrive with ONE fact they forgot they told you — a detail from months ago, my friend, because nothing says 'you matter' like PROOF you were listening in March! Rule three: you name the problem BEFORE they.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:shoebox-era",
      label: "The shoebox era",
      optionCandidates: [
        { id: "przemek:shoebox-era:opt-1", topicId: "przemek:shoebox-era", text: "Did this company really start in a shoebox?" },
        { id: "przemek:shoebox-era:opt-2", topicId: "przemek:shoebox-era", text: "The first invoice was written on what, exactly?" },
        { id: "przemek:shoebox-era:opt-3", topicId: "przemek:shoebox-era", text: "Grazyna keeps the shoebox in a safe now?" },
        { id: "przemek:shoebox-era:opt-4", topicId: "przemek:shoebox-era", text: "Dawid says the shoebox story is 'eighty percent true'." },
        { id: "przemek:shoebox-era:opt-5", topicId: "przemek:shoebox-era", text: "Zosia wants the shoebox in the museum corner." },
        { id: "przemek:shoebox-era:opt-6", topicId: "przemek:shoebox-era", text: "What would you tell the shoebox-era team?" },
      ],
      replyCandidates: [
        {
          id: "przemek:shoebox-era:rep-1",
          text: "A SHOEBOX, my friend, and I will defend the detail with my LIFE — it held the receipts of the first six months! Dawid did the courses, I did the phones, and the shoebox lived on MY desk because I had the only desk with a LOCK, which was a filing cabinet I shared with a photocopier! The company's entire financial history, my friend, in a box that once held running shoes,.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:shoebox-era:rep-2",
          text: "A RECEIPT BOOK, my friend, from the kiosk — carbon copy, three languages of mistakes on every page! Invoice number one: one thousand two hundred zloty, a workshop for a fishermen's cooperative, PAID IN CASH, and I carried it home in my inside pocket like a ORGAN! The receipt book is IN the shoebox, my friend, page one, carbon and all! Two thousand eighteen, Grazyna found it,.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:shoebox-era:rep-3",
          text: "In a SAFE, my friend, with a note that says 'do not open before my retirement' — HER retirement, not the company's! I asked her once what the note means and she said 'the box appreciates' and refused to elaborate, which from Grazyna is a LOVE LETTER! She tracks it at one zloty in the books — sentimental value, unaudited — but we BOTH know what is in that box: page one of.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:shoebox-era:rep-4",
          text: "Eighty percent TRUE, and I have spent YEARS hunting the twenty, my friend! I say the box was leather. He says cardboard. I say we started in November. He says October. I say the photocopier was OURS. He says 'the photocopier was a rental, Przemek, there is a RENTAL AGREEMENT'. There is a rental agreement, my friend. I have seen it.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:shoebox-era:rep-5",
          text: "The museum corner, my friend, and I am RESISTING — respectfully, lovingly, with flowers! The shoebox does not belong under GLASS, it belongs in a SAFE where it gathers DIGNITY! Once you put your origin under glass, my friend, the story stops working for a living and starts working as a DECORATION! Zosia means well — she wants the new hires to see it! And I say: the new hires.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:shoebox-era:rep-6",
          text: "Three things, my friend, and I say them every year at the January breakfast anyway! One: you were RIGHT to answer every phone call, even the ones at midnight, especially those! Two: the photocopier was not ours and we never once pretended it was, and clients RESPECTED that — sell what you HAVE, my friend, never the copier! Three: enjoy the shoebox, because the shoebox is the.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:rain-calls",
      label: "The rain calls",
      optionCandidates: [
        { id: "przemek:rain-calls:opt-1", topicId: "przemek:rain-calls", text: "You take sales calls outside in the rain?" },
        { id: "przemek:rain-calls:opt-2", topicId: "przemek:rain-calls", text: "The client asked about the rain sound. Did it help?" },
        { id: "przemek:rain-calls:opt-3", topicId: "przemek:rain-calls", text: "Klaudia filmed you on a rain call. Content gold?" },
        { id: "przemek:rain-calls:opt-4", topicId: "przemek:rain-calls", text: "Janusz watches you from the door when it rains." },
        { id: "przemek:rain-calls:opt-5", topicId: "przemek:rain-calls", text: "Is it a ritual or do you just like rain?" },
        { id: "przemek:rain-calls:opt-6", topicId: "przemek:rain-calls", text: "What is the best deal you closed in the rain?" },
      ],
      replyCandidates: [
        {
          id: "przemek:rain-calls:rep-1",
          text: "The RAIN, my friend, is the last honest sound in business! Every office call has walls in it — the client hears the FEAR in the drywall! But a rain call, my friend, a rain call says: this man stepped OUTSIDE for me! The elements are INVOLVED! Clients cannot resist a man with weather in his voice — it is nature's sound mixing, FREE of charge, and it cannot be faked by an app!.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:rain-calls:rep-2",
          text: "It HELPED, my friend, it helped ENORMOUSLY — the client said 'you sound like the world is happening around you', and that, my friend, is a REVIEW! A five-star review from the WEATHER itself! He signed in April, and every renewal since, he opens with 'still taking calls in the rain?' — my friend, that is not small talk, that is BRAND! I have been rebranding as THE MAN IN THE.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:rain-calls:rep-3",
          text: "GOLD, my friend, PURE gold — the video is me, drenched, good shoes ruined, saying 'the forecast said no and the client said yes' and it did NUMBERS! Klaudia added subtitles and a SLOW ZOOM and the sales world REBLOGGED it! Two competitors' reps asked me on LinkedIn if the rain technique is trainable! It is NOT trainable, my friend, it is BELIEVABLE — but I sold them a.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:rain-calls:rep-4",
          text: "He does, my friend, and I have EARNED that watch! Twenty years ago he told me one thing at that door: 'the roof drains left, so stand right.' That is it! One sentence, my friend, and I have stood RIGHT ever since, and I have NEVER once had a call dropped to water damage while Janusz watches! Every rain call, I look up mid-pitch and give him the NOD, and he gives it back, and.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:rain-calls:rep-5",
          text: "It is STRATEGY, my friend, wearing a ritual's clothing! Think about it: the office has GLASS WALLS, my friend, and everyone inside can see the man taking a call in the RAIN and still smiling! That is ADVERTISING! The team thinks 'Przemek loves the rain' — WRONG, my friend, Przemek loves what the team THINKS when they see Przemek in the rain! It says: the weather does not.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:rain-calls:rep-6",
          text: "Two thousand twenty, my friend, the HARVEST of rain calls — a logistics client, forty minutes, HORIZONTAL rain, and I closed their whole training program standing under the fire escape with one dry shoulder! The man said 'if this is how you treat a phone call, I want to see what you do with a classroom' — SIGNED, my friend, on the strength of WATER! That renewal is still.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:heir",
      label: "The heir",
      optionCandidates: [
        { id: "przemek:heir:opt-1", topicId: "przemek:heir", text: "Your son visited the office again. The Dynasty?" },
        { id: "przemek:heir:opt-2", topicId: "przemek:heir", text: "Does the boy actually want the sales life?" },
        { id: "przemek:heir:opt-3", topicId: "przemek:heir", text: "He corrected your pitch technique. Publicly." },
        { id: "przemek:heir:opt-4", topicId: "przemek:heir", text: "Zosia offered him a summer internship." },
        { id: "przemek:heir:opt-5", topicId: "przemek:heir", text: "You named your best sales technique after him?" },
        { id: "przemek:heir:opt-6", topicId: "przemek:heir", text: "What if he chooses something else entirely?" },
      ],
      replyCandidates: [
        {
          id: "przemek:heir:rep-1",
          text: "THE DYNASTY VISITS, my friend, and the boy works the ROOM — he shook Dawid's hand with two seconds of eye contact, he asked Kasia about the referral pipeline, and he fixed the coffee machine's cup placement, which I have been telling Janusz about for a YEAR! He is nineteen, my friend, and the receptionist asked if he is 'in sales already' — he said 'I am in OBSERVATION,.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:heir:rep-2",
          text: "Here is the truth, my friend, and it stays here: I do not know, and I am NOT pushing! A salesman who pushes his own son — the irony would close me as a client! I put the tapes in his car ONE time, side A only, and I said NOTHING! Three weeks later he asked a question about objection handling at DINNER, casually, like a spy! The dynasty plants SEEDS, my friend, it does not.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:heir:rep-3",
          text: "He said — in FRONT of the client — 'Dad, your tease is too long, give them the number by second eight'! My own BLOOD, my friend, performing a LIVE AUDIT of the dynasty's technique! And here is what I did, and I want you to learn from this: I gave him the FLOOR! 'The boy is right, my friends — second eight!' I gave the number at second eight and the client SIGNED, and the.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:heir:rep-4",
          text: "A summer INTERNSHIP, my friend, at the company of the BLAZER — and I said YES before she finished the sentence, and then we negotiated the TERMS like two nations! My condition: he does NOT start in sales! Sales is the FAMILY CRAFT, he will get it at HOME! He starts in LOGISTICS, my friend, with the schedules and the rooms and the coffee math — because Stefan said 'a seller.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:heir:rep-5",
          text: "The 'Second Eight', my friend — the close where you give the number at second eight instead of second twenty! HIS technique, born from his ONE piece of feedback, and now the WHOLE TEAM uses it! There is a slide in my deck — slide eighty-eight, my friend, the symmetry is NOT an accident — that says 'The Second Eight: credit P.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:heir:rep-6",
          text: "Then he chooses it, my friend, and the dynasty SURVIVES anyway — because the dynasty was never about SALES! The dynasty is about walking in the door like the room is glad to see you, my friend! That works in RESTAURANTS, that works in CLASSROOMS, that works in the SPACE PROGRAM if the boy decides rockets need CHARISMA! Stefan taught me the craft.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:free-trial",
      label: "The free trial doctrine",
      optionCandidates: [
        { id: "przemek:free-trial:opt-1", topicId: "przemek:free-trial", text: "You gave a client a free month again? Strategy?" },
        { id: "przemek:free-trial:opt-2", topicId: "przemek:free-trial", text: "Grazyna says trials are 'unrecorded revenue'. Fight back?" },
        { id: "przemek:free-trial:opt-3", topicId: "przemek:free-trial", text: "The trial-to-paid conversion is what, seventy percent?" },
        { id: "przemek:free-trial:opt-4", topicId: "przemek:free-trial", text: "Tomek says free devalues the product. Pushback?" },
        { id: "przemek:free-trial:opt-5", topicId: "przemek:free-trial", text: "One client has been on trial for two years. HOW?" },
        { id: "przemek:free-trial:opt-6", topicId: "przemek:free-trial", text: "Teach me the free trial close." },
      ],
      replyCandidates: [
        {
          id: "przemek:free-trial:rep-1",
          text: "Strategy, my friend, and it is OLDER than the phrase 'freemium' — Stefan called it 'the taste before the meal'! You never sell the meal to a man who has never SMELLED it! One free month, and here is the key, my friend: the month is FULL SERVICE — real trainer, real support, real Marek on standby! The trial is not a sample of the product! The trial is a sample of the.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:free-trial:rep-2",
          text: "She says 'unrecorded revenue', I say 'recorded trust', my friend, and we have had this debate at every quarter close for NINE YEARS — it is our RITUAL! And here is my evidence, which I present every year and she grudgingly initials every year: ninety percent of my trials convert WITHIN TWO QUARTERS, and the lifetime value of a trial-convert is DOUBLE the cold close! The.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:free-trial:rep-3",
          text: "Seventy-one percent, my friend, and I will tell you the ENGINE of that number: the mid-trial visit! Day ten, I show up IN PERSON, not to sell — to ask 'what has surprised you?' And the client, my friend,SELLS TO HIMSELF out loud! He lists the wins with his own mouth in his own office in front of his own people! By day thirty the trial is not a trial, it is a REFERENDUM, and.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:free-trial:rep-4",
          text: "Tomek says free devalues the product and Tomek is describing GROCERIES, my friend! Software training is not a CUCUMBER — you cannot taste-travel it! The free month does not devalue the product, it PREVENTS the wrong client — the man who will not pay after a free month was never going to pay AFTER PAYING EITHER, my friend, he was going to be a REFUND with a meeting! The trial.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:free-trial:rep-5",
          text: "Two YEARS on trial, my friend, and I will confess the beautiful failure: I keep RENEWING the free month because the man is the LIBRARIAN of a teachers' cooperative and every year he sends me two NEW referrals before I can invoice him! Two referrals a year, my friend, at full price, for ZERO zloty of subscription! I did this math with Grazyna — the librarian is our single.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:free-trial:rep-6",
          text: "The close is at DAY TWENTY-FIVE, my friend, never day thirty — day thirty is the deadline and deadlines make men lawyers! Day twenty-five I call and I do not ask 'will you buy' — I ask 'what should we set up FIRST when we start properly?' THE ASSUMPTION CLOSE, my friend, Stefan's crown jewel! And if the man hesitates — if there is ONE gram of hesitation — I extend the trial.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:fax",
      label: "The fax machine",
      optionCandidates: [
        { id: "przemek:fax:opt-1", topicId: "przemek:fax", text: "There is a fax machine in your office. In 2026." },
        { id: "przemek:fax:opt-2", topicId: "przemek:fax", text: "You sent a fax to close a deal? Recently?" },
        { id: "przemek:fax:opt-3", topicId: "przemek:fax", text: "Marek wants to unplug it. Standoff?" },
        { id: "przemek:fax:opt-4", topicId: "przemek:fax", text: "The fax number is still on your business cards." },
        { id: "przemek:fax:opt-5", topicId: "przemek:fax", text: "Tomek called it 'a dead protocol with a dial tone'." },
        { id: "przemek:fax:opt-6", topicId: "przemek:fax", text: "When the fax finally dies, what happens?" },
      ],
      replyCandidates: [
        {
          id: "przemek:fax:rep-1",
          text: "That is STANISLAW, my friend, the fax machine, twenty-six years of service, and he has a NAME because machines that WORK get NAMES — Janusz taught me that rule and Janusz is the Pope of this parish! Stanislaw has closed deals in three decades, my friend, and he has a RHYTHM when a signed contract comes through — the whir, the pause, the SLIDE — that is the sound of money.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:fax:rep-2",
          text: "MARCH, my friend, THIS YEAR — a municipal client, the procurement office of a small town, and their system does not accept PDF signatures from vendors they have not 'processed in person'! Every competitor sent emails into the void, my friend! I sent a FAX — cover letter, handwriting, the good pen — and the clerk later told me mine was 'the only application that felt like it.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:fax:rep-3",
          text: "The STANDOFF, my friend, is going beautifully — Marek has 'planning to unplug it' on his board since twenty twenty-two and Stanislaw remains PLUGGED, and every quarter Marek walks past, glares, and REPRICES the threat! And here is the beautiful part: the one time Marek NEEDS a fax — the hardware vendor, the ancient RMA system, two years ago — whose office does he come to?.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:fax:rep-4",
          text: "It IS, my friend, and that is ADVERTISING — the fax number on a modern card says 'this man has SURVIVED things'! Young clients think it is IRONIC, my friend, and irony is a DOOR! Old clients think it is RESPECT, my friend, and respect is a CHAIR! Two generations, one card, and every single person who calls the fax number gets...",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:fax:rep-5",
          text: "'A dead protocol with a dial tone', my friend — POETRY! I had it framed, I offered to put it ON the fax, and Tomek fled the room, which is the highest compliment a Tomek can pay! But here is my rebuttal, which I have delivered with LOVE: the protocol is dead, TRUE — but Stanislaw does not run a protocol, my friend, he runs a RITUAL! A ritual is a dead protocol that people.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:fax:rep-6",
          text: "Stanislaw does not DIE, my friend — but IF, IF the toner finally ascends, we do not throw him out like a common PRINTER! Janusz has ALREADY picked the spot — the closet, next to the retired percolator, in the machinery VALHALLA where this company keeps its heroes! And every year after, at the January breakfast, I tell the new salespeople about the machine that closed the.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:cologne",
      label: "The cologne cloud",
      optionCandidates: [
        { id: "przemek:cologne:opt-1", topicId: "przemek:cologne", text: "Your cologne arrives before you do." },
        { id: "przemek:cologne:opt-2", topicId: "przemek:cologne", text: "Is that the same scent since the nineties?" },
        { id: "przemek:cologne:opt-3", topicId: "przemek:cologne", text: "A client said the meeting room smelled like success?" },
        { id: "przemek:cologne:opt-4", topicId: "przemek:cologne", text: "Klaudia wants the scent name for a post?" },
        { id: "przemek:cologne:opt-5", topicId: "przemek:cologne", text: "Renata asked you to ease off in the elevator?" },
        { id: "przemek:cologne:opt-6", topicId: "przemek:cologne", text: "Would you ever switch scents now?" },
      ],
      replyCandidates: [
        {
          id: "przemek:cologne:rep-1",
          text: "Arriving before myself is the POINT. The scent books the meeting, I just show up to sign. Two sprays, never three: two says confidence, three says recovering from something. I taught this to my nephew at his wedding. The photographer fainted. Different reason. Still counts.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:cologne:rep-2",
          text: "Since 1994 and they still make it, which is more than I can say for half my clients from 1994. Changing scent is like changing your handshake mid-career: technically possible, spiritually confusing. People shake my hand and smell the nineties. That decade closed. I was there. Smelling great.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "przemek:cologne:rep-3",
          text: "He did, and we closed in that room, so the scent is now part of the case study. I rotate by season like tires: the winter one is a serious man in a coat, the summer one is the same man on a boat. Clients never know which Przemek arrives. The cologne knows. The cologne always knows.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract"],
        },
        {
          id: "przemek:cologne:rep-4",
          text: "She tried to guess the brand on camera for twenty minutes and got it wrong in a way that made the video better. Now the comments demand the reveal and I am considering a sponsorship. My scent has a public. My scent earned it. It has closed more deals than some of my ties.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:cologne:rep-5",
          text: "She did, in the polite way that is actually a treaty, so elevators are now one spray only. Renata runs the airspace; I respect the tower. One spray in the elevator is called diplomacy. Two is called a hostage situation. Thirty years of sales taught me to read a room. The elevator is a small room.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:cologne:rep-6",
          text: "When they stop making it, and not one day before. Then I will buy what is left and ration it like war coffee. A man's scent is his logo you cannot see. You do not rebrand at sixty. You refinish. The car got new seats. The cologne is ORIGINAL. Some things carry the whole brand quietly.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:shortcuts",
      label: "The GPS skeptic",
      optionCandidates: [
        { id: "przemek:shortcuts:opt-1", topicId: "przemek:shortcuts", text: "Your GPS is on but you ignored it again?" },
        { id: "przemek:shortcuts:opt-2", topicId: "przemek:shortcuts", text: "The shortcut added forty minutes last week." },
        { id: "przemek:shortcuts:opt-3", topicId: "przemek:shortcuts", text: "How do you know roads that are not on maps?" },
        { id: "przemek:shortcuts:opt-4", topicId: "przemek:shortcuts", text: "A client followed your shortcut and got lost?" },
        { id: "przemek:shortcuts:opt-5", topicId: "przemek:shortcuts", text: "Tomek says your routes are 'unsanctioned paths'?" },
        { id: "przemek:shortcuts:opt-6", topicId: "przemek:shortcuts", text: "Will you ever just trust the navigation?" },
      ],
      replyCandidates: [
        {
          id: "przemek:shortcuts:rep-1",
          text: "The GPS knows ROADS. I know the country. There is a difference between data and thirty years of dinners in villages between here and there. The machine routes me like everyone else. I arrive like me. The lady in the phone recovers her dignity by the second traffic light. We are both professionals.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:shortcuts:rep-2",
          text: "That road owes me one. The shortcut is normally twelve minutes faster, but progress, construction, and one confused crane had opinions that week. A true salesman never blames the road. He books the delay as relationship time. We discussed the client's garden. The garden saved the quarter. Nobody thanks the crane.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:shortcuts:rep-3",
          text: "Because I have EATEN on those roads. A shortcut is not a line on a map, it is a waitress named Halina who remembers your order and a parking spot with shade. The maps know distance. I know WHO answers the phone at the gas station. That is not navigation. That is infrastructure with a face.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:shortcuts:rep-4",
          text: "He got lost, called me LOST, and closed the deal from my passenger seat while we found the real road together. Twenty minutes of being lost made us partners in a small adventure. You cannot schedule that in a CRM. The shortcut did the discovery call. I just drove. Best joint call of the year.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract"],
        },
        {
          id: "przemek:shortcuts:rep-5",
          text: "He called my routes unsanctioned with total respect, like a man describing weather. His machines verify everything; my routes verify ME. We once raced to the same client, him by map, me by memory. He won by four minutes and lost two hours discussing which of us actually knew the way. Worth it. Both of us. Forever.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:shortcuts:rep-6",
          text: "I trust the navigation to argue with, not to obey. It is a junior salesman with perfect grades and no clients. I hear its suggestions, I respect its math, and then I check with the oldest database in the car, which is me. When I retire, the GPS inherits the route. God help the roads.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:client-lore",
      label: "Client lore",
      optionCandidates: [
        { id: "przemek:client-lore:opt-1", topicId: "przemek:client-lore", text: "You remember every client's dog's name?" },
        { id: "przemek:client-lore:opt-2", topicId: "przemek:client-lore", text: "How do you store all these details?" },
        { id: "przemek:client-lore:opt-3", topicId: "przemek:client-lore", text: "You sent flowers when a client's cat died?" },
        { id: "przemek:client-lore:opt-4", topicId: "przemek:client-lore", text: "The CRM cannot hold what you remember?" },
        { id: "przemek:client-lore:opt-5", topicId: "przemek:client-lore", text: "Tomek says that memory is 'an unindexed database'?" },
        { id: "przemek:client-lore:opt-6", topicId: "przemek:client-lore", text: "Does the client lore ever get too heavy?" },
      ],
      replyCandidates: [
        {
          id: "przemek:client-lore:rep-1",
          text: "Dogs, boats, daughters' graduations, and which client lies about jogging. You do not sell to companies. You sell to a man who had a weekend. Know the weekend, know the man, close the man. The dog's name is worth ten discounts. The dog has never once asked for a cheaper rate.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:client-lore:rep-2",
          text: "Here, mostly. And in a notebook the CRM people would confiscate. I write one line after every meeting: what they LOVE, what they fear, what they had for lunch if it was interesting. Three lines, two minutes. The CRM stores contracts. The notebook stores people. Guess which one renews.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:client-lore:rep-3",
          text: "Flowers and a card signed by the whole family, as we were practically family by then. The contract was worth six figures and the cat was worth more to him that week. I buried the cat stuff in the right order. That client has never left. Loyalty is not a program. It is showing up for the small funerals.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:client-lore:rep-4",
          text: "The CRM holds what the CRM can hold. There is no field for 'his mother did not approve of me until lunch number four'. No dropdown for 'wants to be challenged, hates being agreed with'. I have petitioned Grazyna for a bigger database. She says the database is fine and the salesman is analog. Both true.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "przemek:client-lore:rep-5",
          text: "He did, with love: 'unindexed, unnormalized, no backup'. Then he asked how it NEVER fails. I told him: the data wants to be remembered. You store facts, they rot. I store stories, they grow. He went quiet, wrote something down, and I believe I am cited in a system design document somewhere as an edge case.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "przemek:client-lore:rep-6",
          text: "Sometimes, yes. I have thirty years of second names, divorces, and graves. You carry it. That is the job nobody puts in the brochure. I have sat with widows I first met as wives. The lore is not a sales technique. It is what happens when you stay somewhere long enough to become a witness. I would not trade it.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "przemek:verbal-yes",
      label: "The verbal yes",
      optionCandidates: [
        { id: "przemek:verbal-yes:opt-1", topicId: "przemek:verbal-yes", text: "You said a verbal yes is worth two contracts?" },
        { id: "przemek:verbal-yes:opt-2", topicId: "przemek:verbal-yes", text: "A verbal yes fell through once?" },
        { id: "przemek:verbal-yes:opt-3", topicId: "przemek:verbal-yes", text: "How do you get to yes on the first call?" },
        { id: "przemek:verbal-yes:opt-4", topicId: "przemek:verbal-yes", text: "Grazyna refuses to log verbal deals?" },
        { id: "przemek:verbal-yes:opt-5", topicId: "przemek:verbal-yes", text: "A client gave a yes at a funeral?" },
        { id: "przemek:verbal-yes:opt-6", topicId: "przemek:verbal-yes", text: "When do you stop trusting a verbal yes?" },
      ],
      replyCandidates: [
        {
          id: "przemek:verbal-yes:rep-1",
          text: "Because a verbal yes is a man's face agreeing with you in real time. Paper can be drafted by lawyers at midnight; a yes at the table is TRUE and then it deserves the paperwork that honors it. I bank the yes, then I spend two days writing it down carefully. That is not sloppiness. That is treasury.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:verbal-yes:rep-2",
          text: "Once, in 2003, and the man's OWN BOARD killed it while he played golf. I learned the lesson of my life: get the yes from the face AND the org chart. I sent flowers when his company later failed, sincerely. We do business to this day, smaller and truer. Every yes carries its own education.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:verbal-yes:rep-3",
          text: "You do not get to yes on the first call. You get to TRUST on the first call, and trust signs the papers later at twice the size. The first call has one job: leave them glad you called. If they say yes too early, I slow down. Fast yeses are how you meet the man's board. Slowly. In a hallway. Holding a knife.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:verbal-yes:rep-4",
          text: "She refuses to ENTER a deal until it exists on paper, and she is right, and I will fight her every quarter because it is tradition now. My pipeline is full of 'Przemek says'. Her ledger says 'Przemek says nothing until stamped'. We are both correct and the company eats. This is called checks and balances.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "przemek:verbal-yes:rep-5",
          text: "He did, quietly, by the coffee at a funeral, surrounded by grief, and I told him NO. Wrong room. A yes taken at a funeral is a discount on the soul. We signed three weeks later in daylight like Christians. The deal is smaller than that one was. It has lasted eleven years. Do the math on that, junior.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:verbal-yes:rep-6",
          text: "When the voice changes. I have heard ten thousand yeses and they have three temperatures. Warm, warm with doubt, and warm with a lawyer in the room. The last one gets the full contract treatment within the hour. The voice tells you first. The face confirms. The signature just catches up. That is the whole art.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:posture",
      label: "The posture doctrine",
      optionCandidates: [
        { id: "przemek:posture:opt-1", topicId: "przemek:posture", text: "Is standing straight really a sales technique?" },
        { id: "przemek:posture:opt-2", topicId: "przemek:posture", text: "You corrected Pawel's posture mid-pitch?" },
        { id: "przemek:posture:opt-3", topicId: "przemek:posture", text: "Tomek says good code needs no posture?" },
        { id: "przemek:posture:opt-4", topicId: "przemek:posture", text: "Your posture survived back surgery?" },
        { id: "przemek:posture:opt-5", topicId: "przemek:posture", text: "Klaudia analyzed your posture for camera?" },
        { id: "przemek:posture:opt-6", topicId: "przemek:posture", text: "What is the one posture rule that matters?" },
      ],
      replyCandidates: [
        {
          id: "przemek:posture:rep-1",
          text: "It is THE technique, because the spine speaks before the deck loads. You can recover from a bad price. You cannot recover from a body that apologizes. Stand like the meeting was WORTH the drive. The client buys the room before the product, and you are the room. Every other technique is decoration.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:posture:rep-2",
          text: "I did, gently, one finger between the shoulder blades, like adjusting a picture. The boy straightened and closed his first observation solo two weeks later. Nothing about his code changed. Everything about his shadow did. I take no credit. I take SOME credit. The finger was mine.",
          relationshipHint: "delighted",
          tags: ["quest:pawel-apprentice"],
        },
        {
          id: "przemek:posture:rep-3",
          text: "He said 'the commit does not slouch', which is the best line anyone has ever said against my doctrine, and it is WRONG in one way: he who wrote the commit stood somewhere. Every piece of work has a body behind it, and the body was trained by years of chairs. His chair is terrible. I rest my case. He rests his back. Poorly.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:posture:rep-4",
          text: "Rebuilt it, bolt by bolt, like the car I refuse to replace. The surgeon did the mechanics. I did the sales pitch to my own spine every morning for a year. Now I stand straighter than the interns and I have the hardware to prove it was EARNED. Posture is not youth. Posture is maintenance with attitude.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:posture:rep-5",
          text: "She filmed my posture and announced I 'angle toward money like a plant toward light'. Twenty million people watched a man's shoulders. She offered me a sponsor for the standing. I declined. Some things I do for free, and my spine's integrity is not for sale, only for display. Her lens knows the difference.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:posture:rep-6",
          text: "Shoulders down, chin level, like a man who has read the contract. That is it. All the rest is costume. Shoulders say 'I am not afraid of this conversation' without a single word, in every language, in every country with elevators. I have closed deals in four languages with one spine. It translates.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:handwritten-notes",
      label: "Handwritten thank-you notes",
      optionCandidates: [
        { id: "przemek:handwritten-notes:opt-1", topicId: "przemek:handwritten-notes", text: "You still write thank-you notes by hand?" },
        { id: "przemek:handwritten-notes:opt-2", topicId: "przemek:handwritten-notes", text: "The handwriting got worse since 2010?" },
        { id: "przemek:handwritten-notes:opt-3", topicId: "przemek:handwritten-notes", text: "A note got framed by a client?" },
        { id: "przemek:handwritten-notes:opt-4", topicId: "przemek:handwritten-notes", text: "Renata supplies the good stationery?" },
        { id: "przemek:handwritten-notes:opt-5", topicId: "przemek:handwritten-notes", text: "Tomek got a handwritten note from you?" },
        { id: "przemek:handwritten-notes:opt-6", topicId: "przemek:handwritten-notes", text: "Would you teach the interns the note habit?" },
      ],
      replyCandidates: [
        {
          id: "przemek:handwritten-notes:rep-1",
          text: "Every deal, every referral, every decent lunch. Three sentences: what happened, what it meant, what comes next. An email is a notification. A handwritten note is an EVENT that sits on a desk for weeks reminding people you exist. I have been dead in inboxes and alive on desks for thirty years. Desks win.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:handwritten-notes:rep-2",
          text: "Worse and worse, and the notes get MORE valuable as they get uglier. Clients can smell a typed kindness. They can also smell honest effort with bad pen control. My handwriting looks like a man signing under pressure, which is exactly the brand. Klaudia calls it 'authentic decay'. Marketing ladies, I swear.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:handwritten-notes:rep-3",
          text: "Framed, above his desk, where every visitor asks about it. Three sentences I wrote in 2011 about his father's company. He sold the company, moved offices twice, and the frame traveled with him. That note has done more business for me than any slide deck I ever charged for. Paper outlives pitches.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:handwritten-notes:rep-4",
          text: "She keeps a drawer of good cards and guards it like a national bank. I get the good ones; the office gets the standard ones. She says my handwriting is 'load-bearing'. Renata understands stationery the way I understand handshakes. Between us we run the entire soft-power department of this company. Unpaid. Both of us.",
          relationshipHint: "delighted",
          tags: ["quest:renata-tut-finished"],
        },
        {
          id: "przemek:handwritten-notes:rep-5",
          text: "He did, after he saved our build that Sunday. Two sentences: 'You fixed what three departments could not. The coffee is on me for a year.' He kept it under his keyboard. I know because Marek told me. The man who has everything digital treasures one piece of paper. THAT is the whole market, son.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "przemek:handwritten-notes:rep-6",
          text: "I will, at the next lightning talk, with cards for everyone and a live demonstration. The lesson is three sentences and one stamp. Zosia wants slides; I want them to TOUCH paper once before the world goes fully digital on them. One note a month. That is the whole homework. It will outlive their GitHub.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:upsell",
      label: "The gentle upsell",
      optionCandidates: [
        { id: "przemek:upsell:opt-1", topicId: "przemek:upsell", text: "The client bought the bigger package mid-call?" },
        { id: "przemek:upsell:opt-2", topicId: "przemek:upsell", text: "Where is the line between upsell and oversell?" },
        { id: "przemek:upsell:opt-3", topicId: "przemek:upsell", text: "You talked a client OUT of the bigger package?" },
        { id: "przemek:upsell:opt-4", topicId: "przemek:upsell", text: "Grazyna loves your upsell numbers?" },
        { id: "przemek:upsell:opt-5", topicId: "przemek:upsell", text: "Pawel asked how upselling is not lying?" },
        { id: "przemek:upsell:opt-6", topicId: "przemek:upsell", text: "What is the best upsell you ever landed?" },
      ],
      replyCandidates: [
        {
          id: "przemek:upsell:rep-1",
          text: "She did, halfway through my sentence, because the bigger package was what she NEEDED and the small one was what she ORDERED. That is not selling up. That is arithmetic with a heart. The upsell happens in silence while you listen. You just read the room and price the truth accordingly.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:upsell:rep-2",
          text: "The line is the client's wake. If the deal helps them sleep, sell it. If it helps you sleep, lose it. I have walked away from commissions that would buy a car because the bigger package would have sunk the client by spring. Oversell once and you have made money. Oversell twice and you have made history. The bad kind.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:upsell:rep-3",
          text: "Twice this year. Once because their cash flow could not carry it, once because their SON would have had to run it. Both came back within a year and bought the bigger package at the right time. The deals I refuse are my best salesmen. They work the market for free and they never exaggerate.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:upsell:rep-4",
          text: "She loves the numbers and audits the RETURNS harder. She once asked what percentage of my upsells churn. I brought the number: six percent. She said 'keep selling' and poured coffee like a medal ceremony. The woman respects one thing: money that comes back. My upsells come back. That is the whole treaty.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "przemek:upsell:rep-5",
          text: "He asked it straight, over lunch, with his soup getting cold. I told him: lying is saying the package does what it does not. Upselling is noticing what they need before they finish the sentence. The line is truth plus timing. He wrote it on a napkin. The napkin is on his desk. I checked. I always check.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-apprentice"],
        },
        {
          id: "przemek:upsell:rep-6",
          text: "A bakery, 2006, three locations. They ordered training for one register system and I noticed their real problem was the father refusing to retire. I sold them a family succession workshop. The father cried. The bread improved. They have four locations now and name a roll after our first meeting. THAT is upselling. The roll is delicious.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "przemek:objections",
      label: "The objection doctrine",
      optionCandidates: [
        { id: "przemek:objections:opt-1", topicId: "przemek:objections", text: "A client said the price is too high. Now what?" },
        { id: "przemek:objections:opt-2", topicId: "przemek:objections", text: "Are objections really invitations?" },
        { id: "przemek:objections:opt-3", topicId: "przemek:objections", text: "What about the silent objection?" },
        { id: "przemek:objections:opt-4", topicId: "przemek:objections", text: "Tomek objects in code reviews like a client?" },
        { id: "przemek:objections:opt-5", topicId: "przemek:objections", text: "Pawel is scared of objections at his first demo?" },
        { id: "przemek:objections:opt-6", topicId: "przemek:objections", text: "Which objection can never be answered?" },
      ],
      replyCandidates: [
        {
          id: "przemek:objections:rep-1",
          text: "Then he told you something true and you should thank him before you answer. 'Too high' means 'convince me my money is safe'. I do not lower the price. I raise the story until the number fits inside it. A price objection is a budget for imagination. Most salesmen hear NO. I hear a man asking for better math.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:objections:rep-2",
          text: "Every real one. A man without objections is not agreeing, he is leaving in slow motion. Objections mean he is STILL IN THE ROOM, spending breath on you. Silence is the enemy. Doubt is the customer. I have closed more deals through the third objection than through the first smile. Count on it.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:objections:rep-3",
          text: "The dangerous one. Silence means the objection is not about the offer, it is about his cousin, his divorce, or the meeting he had before yours. You cannot answer what is not said. So you NAME the weather: 'Something changed the temperature. What did I miss?' Half the time they tell you. Then you can finally sell.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:objections:rep-4",
          text: "He objects like my best client: short, technical, and always about the foundation. 'This test mocks nothing real.' That is a PRICING objection in code. I learned more about handling pushback from his red comments than from any seminar. The man has never once raised his voice. Neither has my best client. Notice the pattern.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "przemek:objections:rep-5",
          text: "He is, and scared is CORRECT. The trick nobody teaches: write down every objection you fear, then go collect them ON PURPOSE with a friendly client. Fear dies of familiarity, like all monsters. By the tenth objection he will be collecting them like stamps. I was terrified once. The badge photo proves it.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-apprentice"],
        },
        {
          id: "przemek:objections:rep-6",
          text: "The one about the person you remind them of. 'You are exactly like my old partner' has killed more deals than every price combined, and there is no answer because you are not in the argument. You can only be patient, be different, and let time testify. Some objections are not about you. They are about ghosts. Respect the ghosts.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "przemek:never-discount",
      label: "Never discount",
      optionCandidates: [
        { id: "przemek:never-discount:opt-1", topicId: "przemek:never-discount", text: "You really never drop the price?" },
        { id: "przemek:never-discount:opt-2", topicId: "przemek:never-discount", text: "What do you add instead of discounting?" },
        { id: "przemek:never-discount:opt-3", topicId: "przemek:never-discount", text: "A client walked when you refused to discount?" },
        { id: "przemek:never-discount:opt-4", topicId: "przemek:never-discount", text: "Grazyna's rule matches yours on discounts?" },
        { id: "przemek:never-discount:opt-5", topicId: "przemek:never-discount", text: "The one discount you regret forever?" },
        { id: "przemek:never-discount:opt-6", topicId: "przemek:never-discount", text: "Is never discounting even possible in this market?" },
      ],
      replyCandidates: [
        {
          id: "przemek:never-discount:rep-1",
          text: "I did once a year, maximum, and only downward in SCOPE, never in price. The price is a promise to both of us. Discount and the client hears 'it was too expensive', which poisons every future deal. Hold the number and move the contents. A smaller box at a fair price beats a big box on sale. Always. Ask my margins.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:never-discount:rep-2",
          text: "Speed, access, training days, my personal phone number. The extras cost me evenings and cost the company NOTHING. Grazyna calls it 'paying in currency you own'. A ten percent discount costs ten percent forever. A bonus workshop costs me one Tuesday and becomes a story. I am rich in Tuesdays. The client is rich in support.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "przemek:never-discount:rep-3",
          text: "He walked, and I mailed the good pen he liked, no note about business. Two years later he called from a new company with triple the budget and the opening line 'you did not chase me'. That refusal was my best advertisement. Chasing is expensive. Walking respectfully is an investment with compound interest.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:never-discount:rep-4",
          text: "Her rule is sterner and she has the spreadsheet to beat me with. She once ended a discount argument by printing my margins next to my commission next to a photo of my car. One page. No comment. I paid full price on my own ego that day. We agree more than we fight, and we fight beautifully.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "przemek:never-discount:rep-5",
          text: "1998. Twenty percent off because a man looked sad about his company. The discount survived three years of renewals like a bad tattoo. Every invoice reminded him I had judged his company weak. He told me so at his retirement dinner, laughing, holding evidence. The sad look was a negotiation. I paid for the lesson full price.",
          relationshipHint: "annoyed",
        },
        {
          id: "przemek:never-discount:rep-6",
          text: "It is harder every year and MORE valuable every year, because everyone else discounts by algorithm now. When the whole market shouts 'SALE', a calm full price is a roar. My clients pay it and then quote me TO THEIR CLIENTS at a markup. Value is the only discount that compounds. The market is fine. The nerves are the problem.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:pep-talk",
      label: "The mirror pep talk",
      optionCandidates: [
        { id: "przemek:pep-talk:opt-1", topicId: "przemek:pep-talk", text: "You give yourself pep talks in the car mirror?" },
        { id: "przemek:pep-talk:opt-2", topicId: "przemek:pep-talk", text: "What do you actually say to the mirror?" },
        { id: "przemek:pep-talk:opt-3", topicId: "przemek:pep-talk", text: "Someone caught you mid-pep-talk?" },
        { id: "przemek:pep-talk:opt-4", topicId: "przemek:pep-talk", text: "Does the pep talk work after forty years?" },
        { id: "przemek:pep-talk:opt-5", topicId: "przemek:pep-talk", text: "Klaudia wants to film the mirror ritual?" },
        { id: "przemek:pep-talk:opt-6", topicId: "przemek:pep-talk", text: "What about the days the pep talk fails?" },
      ],
      replyCandidates: [
        {
          id: "przemek:pep-talk:rep-1",
          text: "Every big meeting, thirty seconds, engine off. The mirror is the only colleague who has seen every version of me and never leaked a thing. A man who cannot sell himself to himself at 7am has no business selling to strangers by 9. The ritual is not theatre. It is tuning. Instruments get tuned. So do salesmen.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:pep-talk:rep-2",
          text: "The same three lines since 1989. 'Somebody today needs exactly what you have. Do not rob them of it out of politeness. And stand straight.' I do not feel it every morning. That is irrelevant. The words work even on the days the man saying them is doubtful. Especially those days. That is when the ritual EARNS its keep.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:pep-talk:rep-3",
          text: "The car wash boy, twice, same location, same minute. Now he waits until I finish and gives me a thumbs up. The ritual has an audience of one and better production values every month. I tip extra. Professional respect between performers. He has seen the whole show and never once spoiled the ending.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:pep-talk:rep-4",
          text: "Better, because now I have DECADES of evidence in the mirror. The young Przemek pep-talked on faith. This one pep-talks with a track record: every hard year, every comeback, every invoice. The face in the mirror has receipts now. Faith is for beginners. Evidence is for the vintage model. Both drove the same roads.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "przemek:pep-talk:rep-5",
          text: "She asked, and I said the mirror shows the unedited broadcast. She said that is the most post-ready thing I own. The answer is no, and the answer is final. The mirror is where I am not a brand. The moment that goes on camera, I lose the one meeting room where I am honest. Even content has a basement. This is mine.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:pep-talk:rep-6",
          text: "Then the ritual changes jobs. Those days it is not a pep talk, it is attendance. I show up to the mirror like you show up to church with doubts, and I let the routine hold what the feeling cannot. By the parking lot I am seventy percent. Seventy percent of Przemek has closed deals in four countries. The mirror knows. It never tells.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "przemek:nineties-clients",
      label: "The nineties clients",
      optionCandidates: [
        { id: "przemek:nineties-clients:opt-1", topicId: "przemek:nineties-clients", text: "A client from the nineties called this week?" },
        { id: "przemek:nineties-clients:opt-2", topicId: "przemek:nineties-clients", text: "They still use your old nickname?" },
        { id: "przemek:nineties-clients:opt-3", topicId: "przemek:nineties-clients", text: "What did people buy in the nineties, honestly?" },
        { id: "przemek:nineties-clients:opt-4", topicId: "przemek:nineties-clients", text: "One of them trained their kids to call you?" },
        { id: "przemek:nineties-clients:opt-5", topicId: "przemek:nineties-clients", text: "Tomek was born in the nineties. Feel old?" },
        { id: "przemek:nineties-clients:opt-6", topicId: "przemek:nineties-clients", text: "Will you visit the anniversary party?" },
      ],
      replyCandidates: [
        {
          id: "przemek:nineties-clients:rep-1",
          text: "Pan Wlodek, the bakery man, calls every Advent to argue about football and order nothing. I take the call EVERY year. That call is my pension of a different kind. Somewhere in this economy there is a man who calls not to buy, and that man is why the phone still feels like a gift. Long live Pan Wlodek.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:nineties-clients:rep-2",
          text: "'Przemek-from-the-briefcase' has survived three companies, one marriage each, and all my rebrands. The nickname was earned carrying a sample case up six floors in 1993. I sign contracts with my full name and I answer to the nickname. Both are real. One pays the bills. The other is why the bills get paid.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:nineties-clients:rep-3",
          text: "Confidence, mostly, sold by the kilo. We sold courses when courses were photocopies and hope when hope was rationed. But we DELIVERED, which is why they call. The nineties salesman gets remembered as a cowboy. Fair. But the cowboys who showed up on Monday are the ones with phonebooks full of clients thirty years on. I kept mine.",
          relationshipHint: "neutral",
        },
        {
          id: "przemek:nineties-clients:rep-4",
          text: "The daughter calls about training budgets and calls me UNCLE PRZEMEK in the official emails. Her father taught her the nickname as inheritance. I have closed two deals with a third generation of one family. At some point you are not a vendor anymore. You are infrastructure with a birthday. They send cake. Every year.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "przemek:nineties-clients:rep-5",
          text: "He does the math out loud with a small smile, the way young men enjoy beating old men at arithmetic. Then he asked what the nineties SMELLED like, and I told him:photocopier toner and coffee from a jar. He wrote it down. The boy collects the office's history without labeling it that. Smart. The old clients are the last copies.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:nineties-clients:rep-6",
          text: "I would not miss it. Thirty years since the first contract, signed on a windowsill because his desk had boxes on it. The invitation says formal. I will wear the tie from the photo. If the man cries, I cry, and that is the whole story of my career: I sold for thirty years and cried for free. Best trade I ever made.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:his-table",
      label: "His table at the restaurant",
      optionCandidates: [
        { id: "przemek:his-table:opt-1", topicId: "przemek:his-table", text: "The restaurant keeps a table for you?" },
        { id: "przemek:his-table:opt-2", topicId: "przemek:his-table", text: "The waiter has served you since when?" },
        { id: "przemek:his-table:opt-3", topicId: "przemek:his-table", text: "You closed a deal at that table?" },
        { id: "przemek:his-table:opt-4", topicId: "przemek:his-table", text: "The table by the window or the corner?" },
        { id: "przemek:his-table:opt-5", topicId: "przemek:his-table", text: "Renata booked your anniversary dinner there?" },
        { id: "przemek:his-table:opt-6", topicId: "przemek:his-table", text: "What happens to the table when you retire?" },
      ],
      replyCandidates: [
        {
          id: "przemek:his-table:rep-1",
          text: "They keep the second one from the window, my table, since 2001. A table of one's own is worth three branch offices: it is neutral ground, the coffee arrives unasked, and the waiter knows when to bring the second dessert without a word. Every salesman needs a harbor. Mine has a tablecloth and opinions about my tie.",
          relationshipHint: "pleased",
          tags: ["period:lunch"],
        },
        {
          id: "przemek:his-table:rep-2",
          text: "Marek the waiter, since the place had a different name and I had a different car. He has watched me win, lose, celebrate, and once console a grown exporter under the coat rack. He brings water for the voice before big meetings now. That is not service. That is twenty-two years of knowing a man's throat.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:his-table:rep-3",
          text: "Two, and one of them is the reason this office has a training budget. The Acme man shook my hand over the schabowy and said 'I trust restaurants more than boardrooms'. I put the contract on the tablecloth. The table has closed more revenue than my CRM and it has never once asked for a license fee.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract"],
        },
        {
          id: "przemek:his-table:rep-4",
          text: "Corner, always corner. The window is for tourists and men being photographed. The corner sees the whole room, the door, and the exits, which matters when a meeting goes sideways or when it goes SO well you need a quiet minute. A salesman watches doors. It is not paranoia. It is choreography.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:his-table:rep-5",
          text: "She did, in secret, with the owner, and they had the corner set with the good candles and a card in her handwriting. Twenty-five years of that table and I got emotional in front of the dessert trolley. Renata holds the reservation book of my life. Everyone needs one person who remembers your dates. She remembers ALL of them.",
          relationshipHint: "delighted",
          tags: ["quest:renata-tut-finished", "relationship:warm"],
        },
        {
          id: "przemek:his-table:rep-6",
          text: "The table stays. I asked the owner to keep the corner for young salesmen who eat alone and rehearse. He agreed, and the corner has a small brass plate now, unofficial, in Polish, that says 'practice here'. My legacy is a table that trains successors. The schabowy remains the best in the city. Both facts survive me.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:backup-phone",
      label: "The backup phone",
      optionCandidates: [
        { id: "przemek:backup-phone:opt-1", topicId: "przemek:backup-phone", text: "You carry a second, old phone?" },
        { id: "przemek:backup-phone:opt-2", topicId: "przemek:backup-phone", text: "The battery still holds charge since when?" },
        { id: "przemek:backup-phone:opt-3", topicId: "przemek:backup-phone", text: "Tomek inspected the backup phone?" },
        { id: "przemek:backup-phone:opt-4", topicId: "przemek:backup-phone", text: "Has the backup phone actually saved a deal?" },
        { id: "przemek:backup-phone:opt-5", topicId: "przemek:backup-phone", text: "The snake game is still on it?" },
        { id: "przemek:backup-phone:opt-6", topicId: "przemek:backup-phone", text: "What numbers are stored in it?" },
      ],
      replyCandidates: [
        {
          id: "przemek:backup-phone:rep-1",
          text: "In the glovebox, charged, like a fire extinguisher with a contact list. The smartphone is the office. The backup phone is the MAN. One dies in a river, the other one calls the client and says 'crossed a river, where were we'. Clients respect a man whose infrastructure has a backup. That is not nostalgia. That is redundancy with a ringtone.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:backup-phone:rep-2",
          text: "It holds a week. A WEEK, son. The smartphone begs for a charger by lunch like a man who skipped breakfast. This thing was built when batteries had character and screens were for looking, not touching. It has outlived four smartphones, one flood, and every prediction about its death. The engineers of that era built for my glovebox.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:backup-phone:rep-3",
          text: "He held it like an artifact from a dig and pronounced it 'air-gapped, unpatchable, perfect'. He said the old Nokia is the only phone in this office that cannot be hacked because there is nothing TO hack. Security through honesty. He wants one for the server room. The glovebox phone is going CORPORATE.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "przemek:backup-phone:rep-4",
          text: "Twice. Once when the smartphone drowned in a lake of soup, once when the network died on the highway. Both times I called from the glovebox and both times the client said 'you called from WHAT?'. The story closes deals on its own now. The phone has a CAREER. It does not know. It just rings and works.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:backup-phone:rep-5",
          text: "Snake, level twenty-seven, a personal record from a queue in 2002 that I refuse to reset by restarting. Pawel found it and asked for a photo with it, like a monument. The high score table has three initials: mine, my son's, and one mysterious 'K' from a train outside Warsaw. History in a phone. Unarchived. Alive.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:backup-phone:rep-6",
          text: "Eleven numbers. The wife, the office, Renata, three clients who answer on the first ring, the doctor, the tire man, and the restaurant. That is the whole civilization I need when the world goes dark. Everything else can wait for the smartphone to wake up. The glovebox holds my real contact list. It has never once needed an update.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "przemek:the-1997-deal",
      label: "The 1997 deal",
      optionCandidates: [
        { id: "przemek:the-1997-deal:opt-1", topicId: "przemek:the-1997-deal", text: "Tell me about the 1997 deal everyone mentions." },
        { id: "przemek:the-1997-deal:opt-2", topicId: "przemek:the-1997-deal", text: "Did you really close it at a train station?" },
        { id: "przemek:the-1997-deal:opt-3", topicId: "przemek:the-1997-deal", text: "The client signed with a pencil?" },
        { id: "przemek:the-1997-deal:opt-4", topicId: "przemek:the-1997-deal", text: "Grazyna has the original 1997 paperwork?" },
        { id: "przemek:the-1997-deal:opt-5", topicId: "przemek:the-1997-deal", text: "Is the 1997 story exaggerated by now?" },
        { id: "przemek:the-1997-deal:opt-6", topicId: "przemek:the-1997-deal", text: "What did that deal teach you, in one line?" },
      ],
      replyCandidates: [
        {
          id: "przemek:the-1997-deal:rep-1",
          text: "The one that built my name and half this office's origin stories. I was thirty, the company was nine months old, and the client was a factory that needed training for four hundred people across three shifts. The pitch was one page. The coffee was terrible. The close took four months and the relationship took thirty years. That is the deal.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:the-1997-deal:rep-2",
          text: "Platform three, because his train left before my meeting started and I had a rail timetable like a hunting map. I bought a ticket I did not use, we talked for two stops, and he signed on his suitcase. The trains were late in those days. Being late saved my career. I have thanked PKP silently for thirty years.",
          relationshipHint: "delighted",
        },
        {
          id: "przemek:the-1997-deal:rep-3",
          text: "A pencil, because his pen died and the stationery shop was closed. I keep saying the pen died of fear. He says the pen was fine. We argue about it every December at the anniversary dinner. The pencil page is in the company archive and the graphite has outlived three computer systems. Pencils, son. Respect them.",
          relationshipHint: "pleased",
        },
        {
          id: "przemek:the-1997-deal:rep-4",
          text: "She does, in the archive, boxed like a relic, with my commission note pinned to it. She showed it to an auditor once as 'the founding invoice' and the auditor photographed it like a monument. The 1997 deal is the oldest thing in the books that is not a building. Grazyna guards it. I visit. It appreciates.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "przemek:the-1997-deal:rep-5",
          text: "The numbers are rounded up and the fear is rounded down, which is how all legends are maintained. It was four months of no, not one miracle afternoon. But the suit WAS good and the platform WAS platform three. Exaggeration is just memory with better marketing. I sell for a living. My own story is my best product. It is forty percent true and one hundred percent paid off.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "przemek:the-1997-deal:rep-6",
          text: "Meet the man where he already is. I chased that client through fax, phone and two office visits. He signed on a train platform because I finally went where he was GOING instead of waiting where I was. Thirty years of business in one sentence. Everything else I know is commentary and good shoes.",
          relationshipHint: "pleased",
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

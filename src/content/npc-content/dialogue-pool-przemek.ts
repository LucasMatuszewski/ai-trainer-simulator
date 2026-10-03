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

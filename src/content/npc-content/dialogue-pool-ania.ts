/**
 * WS5 dialogue v2 pool — Ania, Marketing & Synergy (C-77).
 *
 * Pure authored data. Topics: the 'AI: Friend or Frenemy?' webinar, your
 * personal brand (a persona is a tire and tires rotate), and the growth
 * campaign. Task offer: the webinar goes live (sets the existing
 * `ania-webinar-volunteered` flag — two hundred tickets are already sold,
 * so it is canon). Tone matches her legacy trees: boundaries, love that
 * for you; the crying is the hook; the robot is doing the handshake.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const ANIA_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "ania",
  topics: [
    {
      id: "ania:webinar",
      label: "Friend or Frenemy logistics",
      optionCandidates: [
        {
          id: "ania:webinar:opt-1",
          topicId: "ania:webinar",
          text: "The webinar is Thursday. What is the plan?",
        },
        {
          id: "ania:webinar:opt-2",
          topicId: "ania:webinar",
          text: "Why am I crying in the thumbnail?",
        },
        {
          id: "ania:webinar:opt-3",
          topicId: "ania:webinar",
          text: "Two hundred tickets. For what, exactly?",
        },
        {
          id: "ania:webinar:opt-4",
          topicId: "ania:webinar",
          text: "Can the webinar be sixty seconds long?",
        },
        {
          id: "ania:webinar:opt-5",
          topicId: "ania:webinar",
          text: "What if the audience asks a real question?",
        },
        {
          id: "ania:webinar:opt-6",
          topicId: "ania:webinar",
          text: "I will host it. Where is the pizza clause?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:webinar:rep-1",
          text: "Plan: I welcome, you are vulnerable on purpose, slide four is the crying one, and at minute forty the chatbot answers questions while we nod. It is called a 'live AI experiment'. The AI is me, typing. The nodding is the value.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:webinar:rep-2",
          text: "Crying is the hook. The thumbnail was TESTED — I A/B tested your face against a stock robot and the robot lost. You beat a robot at sadness. That is the brand: human, relatable, mildly damp.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:webinar:rep-3",
          text: "Two hundred tickets for TRANSFORMATION. Also the tickets were free and I emailed the same list three times. The third email said 'last chance' and the last chance worked, which is marketing's only law: everyone opens the last email.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:webinar:rep-4",
          text: "Sixty seconds is a REEL, and reels are the funnel's mouth, not its stomach. But fine — we cut a sixty-second ad and the full thing becomes 'extended content'. You just invented a product tier by complaining. This is exactly why I signed you up.",
          relationshipHint: "delighted",
          tags: ["stats:low-patience", "relationship:neutral"],
        },
        {
          id: "ania:webinar:rep-5",
          text: "Then the chatbot answers it. If the chatbot fails, I say 'wow, raw' and we pivot to the crying slide. There is a slide for every emotion and the deck is only eleven slides, so we will be emotional efficiently.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:webinar:rep-6",
          text: "The pizza clause! You are a NATURAL. Yes: pizza at minute fifty, on camera, tagged 'culture win'. The last pizza tag is in the onboarding deck now. You will be in TWO decks. People retire without that.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
          offersTaskId: "ania:task-frenemy-live",
        },
      ],
    },
    {
      id: "ania:brand",
      label: "Your personal brand",
      optionCandidates: [
        {
          id: "ania:brand:opt-1",
          topicId: "ania:brand",
          text: "My persona did WHAT while I was offboarding?",
        },
        {
          id: "ania:brand:opt-2",
          topicId: "ania:brand",
          text: "Can my persona be 'quietly competent'?",
        },
        {
          id: "ania:brand:opt-3",
          topicId: "ania:brand",
          text: "The persona is outperforming the real me.",
        },
        {
          id: "ania:brand:opt-4",
          topicId: "ania:brand",
          text: "You said I have a persona. Where is it kept?",
        },
        {
          id: "ania:brand:opt-5",
          topicId: "ania:brand",
          text: "What is my brand voice? Say it gently.",
        },
        {
          id: "ania:brand:opt-6",
          topicId: "ania:brand",
          text: "Klaudia says my persona is derivative.",
        },
      ],
      replyCandidates: [
        {
          id: "ania:brand:rep-1",
          text: "It networked. Personas do not sleep, they CONNECT. While you were doing actual work, your persona got you two podcast invites and one funeral connection. You are welcome, and I am so sorry about the funeral one. That was a targeting error.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:brand:rep-2",
          text: "'Quietly competent' tested terribly. We soften to 'reliably present' or sharpen to 'the calm one with receipts'. The middle is where brands go to die. Pick an edge. Edges are free, which is the best thing about them.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:brand:rep-3",
          text: "Now you see the funnel. The persona eats first and the person eats what falls through, which is also the entire org chart wearing a costume. The fix is not less persona. The fix is a SECOND persona, and we rotate them like tires. Season two, basically.",
          relationshipHint: "pleased",
          tags: ["quest:ania-saw-the-funnel", "relationship:neutral"],
        },
        {
          id: "ania:brand:rep-4",
          text: "In a shared folder called 'personal brands', which is funny because none of the brands inside are personal — they are all approved by committee. Yours is version nine. Version four had a leather jacket. The committee was not ready.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:brand:rep-5",
          text: "Gently? Your voice is 'competent but approachable, like a teacher who owns a dog'. That is not an insult, that is a DEMOGRAPHIC. Burek alone is worth three points of relatability. Do not waste the dog.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:brand:rep-6",
          text: "Klaudia is welcome to her opinion, which she posted, captioned, and tagged as thought leadership. Derivative is how genres FORM. Also she called my funnel 'cute', and I have been to her engagement pod, so we are both armed and polite.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "ania:campaign",
      label: "The growth campaign",
      optionCandidates: [
        {
          id: "ania:campaign:opt-1",
          topicId: "ania:campaign",
          text: "What does 'Growth and Synergy' actually grow?",
        },
        {
          id: "ania:campaign:opt-2",
          topicId: "ania:campaign",
          text: "The campaign deck says 'disruption' nine times.",
        },
        {
          id: "ania:campaign:opt-3",
          topicId: "ania:campaign",
          text: "Is the funnel leaky or is that the design?",
        },
        {
          id: "ania:campaign:opt-4",
          topicId: "ania:campaign",
          text: "What is our biggest quick win right now?",
        },
        {
          id: "ania:campaign:opt-5",
          topicId: "ania:campaign",
          text: "Marketing wants 'AI integration' by Monday?",
        },
        {
          id: "ania:campaign:opt-6",
          topicId: "ania:campaign",
          text: "Do you ever miss real marketing?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:campaign:rep-1",
          text: "Awareness, mostly, and sometimes the tone of the Slack. Growth is a feeling that invoices later. I grow the feeling. The invoice is Bartek's problem, and he invoices beautifully, which is why we are a family.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:campaign:rep-2",
          text: "Nine is the minimum for a deck to feel decided. One 'disruption' is a word choice, three is a strategy, nine is a CULTURE. The stock robot photos carry the rest. The robot is doing the handshake. Nobody gets it and that is why it works.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:campaign:rep-3",
          text: "Every funnel leaks. The leak is where the learning lives. We measure the leak, we name the leak, and then the leak goes in the next deck as 'insights'. Nothing is wasted here, especially failure. Failure is content.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:campaign:rep-4",
          text: "Morning energy, love it. Quick win: you walk through the office with a coffee and a focused face while I film six seconds. It becomes 'a day in the life of our AI team'. Six seconds, one coffee, infinite credibility. This is the whole industry and I will not apologize for it.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "ania:campaign:rep-5",
          text: "Marketing does not want AI integration. Marketing wants the word 'integrated' next to the word 'AI' before a competitor says it first. The integration itself can be a loading spinner that thinks. We ship the spinner, the spinner ships the feeling.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:campaign:rep-6",
          text: "You mean billboards? I interned on a bus-stop campaign once. Five thousand posters and a prayer. Now I print nothing and measure everything. Nostalgia is just A/B testing with worse data. I do miss the posters, though. They were heavy and honest.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "ania:persona-season2",
      label: "Persona rotation, season two",
      optionCandidates: [
        {
          id: "ania:persona-season2:opt-1",
          topicId: "ania:persona-season2",
          text: "Season two of the persona. What changes?",
        },
        {
          id: "ania:persona-season2:opt-2",
          topicId: "ania:persona-season2",
          text: "Can season two be less exhausting?",
        },
        {
          id: "ania:persona-season2:opt-3",
          topicId: "ania:persona-season2",
          text: "Klaudia says rotating personas is 'brand chaos'.",
        },
        {
          id: "ania:persona-season2:opt-4",
          topicId: "ania:persona-season2",
          text: "What happens to season one's persona?",
        },
        {
          id: "ania:persona-season2:opt-5",
          topicId: "ania:persona-season2",
          text: "Does the real you audition for the role?",
        },
        {
          id: "ania:persona-season2:opt-6",
          topicId: "ania:persona-season2",
          text: "The persona did a podcast without me.",
        },
      ],
      replyCandidates: [
        {
          id: "ania:persona-season2:rep-1",
          text: "Season one was 'the calm one with receipts' and receipts are a Q3 energy. Season two is 'the curious one in the corridor' — softer launch, lower stakes, bigger heart. Personas are tires and tires rotate, but nobody talks about the SECOND set of tires. They are quieter. They have learned things. Season two is the persona with mileage and I am so proud of her already.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:persona-season2:rep-2",
          text: "That is the whole design brief and I love it. Season one ran at maximum sincerity and sincerity does not scale. Season two runs on LOWER authenticity — more scheduled, less spontaneous, which sounds backwards but is actually mercy. The persona has office hours now. The persona does not text at midnight. Boundaries for the brand are boundaries for the human. I am writing…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:persona-season2:rep-3",
          text: "Klaudia's brand has one personality and a posting calendar; my brand has an ENSEMBLE CAST. That is not chaos, that is a sitcom, and sitcoms outlast influencers because people get attached to the whole crew. She says the algorithm needs consistency. The algorithm needs CONTENT. The algorithm cannot tell the difference between consistency and a good writer with stamina. I…",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:persona-season2:rep-4",
          text: "Season one is not cancelled, she is EMERITUS. She lives in the archive, she gets a tribute post every quarter, and she comments 'so true' on season two from a verified account. Retiring a persona is like retiring a shirt: you do not burn it, you fold it somewhere respectful. The archive has three personas in it now. The archive is the deepest part of the brand. Nobody…",
          relationshipHint: "pleased",
        },
        {
          id: "ania:persona-season2:rep-5",
          text: "Every season. There is a audition, and the audition is me, in the meeting room, answering questions as five possible people. The real me never wins outright — the real me is too honest about being tired, and tired does not test well. But the real me is ON the casting couch, every season, influencing the final cut. The persona is the me that survived the edit. That is as…",
          relationshipHint: "neutral",
        },
        {
          id: "ania:persona-season2:rep-6",
          text: "The podcast appearance was SCHEDULED, which is how you find out the persona has outgrown you — when its bookings stop coming through your calendar. I listened to the whole thing. She was good. She was ME but better rested. This is the phase where brands either reconcile with their faces or split into a parent company. We are in therapy, the persona and I. The therapy…",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "ania:metrics",
      label: "Marketing metrics, explained",
      optionCandidates: [
        {
          id: "ania:metrics:opt-1",
          topicId: "ania:metrics",
          text: "What does 'engagement' actually measure?",
        },
        {
          id: "ania:metrics:opt-2",
          topicId: "ania:metrics",
          text: "Impressions are up and sales are flat. Explain.",
        },
        {
          id: "ania:metrics:opt-3",
          topicId: "ania:metrics",
          text: "Grazyna wants ROI on the candle campaign.",
        },
        {
          id: "ania:metrics:opt-4",
          topicId: "ania:metrics",
          text: "The dashboard has forty metrics. Which matter?",
        },
        {
          id: "ania:metrics:opt-5",
          topicId: "ania:metrics",
          text: "Maciek asked for 'leading indicators'.",
        },
        {
          id: "ania:metrics:opt-6",
          topicId: "ania:metrics",
          text: "What is a metric that cannot be gamed?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:metrics:rep-1",
          text: "Engagement measures the cost of scrolling past. A like is 'I paused', a comment is 'I was moved', and a share is 'this says something about ME, which is the highest compliment content can receive'. It measures friction inverted — the audience's inertia versus your pull. My whole job is the war against the thumb. The thumb has won for years. But wars are long and I have…",
          relationshipHint: "pleased",
        },
        {
          id: "ania:metrics:rep-2",
          text: "Impressions are the audience WAVING FROM A BUS. Sales are whether they got off. The gap between the two is the entire marketing industry, and the honest name for it is 'the distance'. Some of the distance is the funnel, some is the product, and some is a stranger on a bus with a full schedule. I report both numbers because hiding the bus makes the funnel a lie. I lie…",
          relationshipHint: "neutral",
        },
        {
          id: "ania:metrics:rep-3",
          text: "You cannot ROI a candle into a spreadsheet cell and she KNOWS it, which is why she asked — it is a test with two right answers. The wrong-right answer is a number. The right-right answer is 'the candle sells the course, the course sells the candle, and the loop's ROI is the loop'. She nodded at that answer once. I have been chasing that nod through every campaign since.…",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-candle-partner", "relationship:neutral"],
        },
        {
          id: "ania:metrics:rep-4",
          text: "Forty metrics and three matter: does the right person see it, do they remember it Tuesday, and do they DO anything by Friday. Everything else is a mood ring. Reach, impressions, engagement rate, sentiment — those are the orchestra. The three are the melody. Boards love the orchestra. Boards FEEL the melody. I bring the orchestra so nobody notices there are only…",
          relationshipHint: "pleased",
        },
        {
          id: "ania:metrics:rep-5",
          text: "Leading indicators are marketing's weather forecast: saves, shares, and DMs that ask questions instead of pitching. They arrive before the sales, which makes them either prophecy or noise depending on the quarter. Maciek loves them because they trend before the graph does, and a man with one black slide needs SOMETHING that moves weekly. I feed the leading indicators.…",
          relationshipHint: "neutral",
          tags: ["quest:maciek-briefed-you"],
        },
        {
          id: "ania:metrics:rep-6",
          text: "Retention. You cannot fake someone coming back — the bot farms have not cracked 'choosing to return', which is why I trust the newsletter opens of REAL humans over any follower count. Every other number can be bought, inflated, or performed. Return visits are the only metric with a memory. The audience that comes back is the audience. Everything else is a crowd…",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "ania:burek-content",
      label: "The Burek content strategy",
      optionCandidates: [
        {
          id: "ania:burek-content:opt-1",
          topicId: "ania:burek-content",
          text: "Is Burek the most valuable brand asset here?",
        },
        {
          id: "ania:burek-content:opt-2",
          topicId: "ania:burek-content",
          text: "His standup audit post did numbers. Repeatable?",
        },
        {
          id: "ania:burek-content:opt-3",
          topicId: "ania:burek-content",
          text: "Can we get him a dedicated account?",
        },
        {
          id: "ania:burek-content:opt-4",
          topicId: "ania:burek-content",
          text: "Burek walked out of frame. Twice. Filming notes?",
        },
        {
          id: "ania:burek-content:opt-5",
          topicId: "ania:burek-content",
          text: "Marek says the dog is not content. Fight?",
        },
        {
          id: "ania:burek-content:opt-6",
          topicId: "ania:burek-content",
          text: "What is Burek's engagement rate, honestly?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:burek-content:rep-1",
          text: "Bruce is forty thousand zloty of brand anchor and Burek has outperformed him for free. The bat is equity with wings; the dog is TRUST with fur, and trust is the only asset the algorithm cannot fake. Every top-performing post in our history features one of them, and the dog works for treats. I have done the math on treat-to-reach ratio. It is criminal. It is the best deal…",
          relationshipHint: "delighted",
        },
        {
          id: "ania:burek-content:rep-2",
          text: "The audit post worked because it was TRUE — the dog actually exhales at over-forecasting, and the internet can smell staged dogs through the screen. Repeatable? The truth repeats itself weekly at standup, so yes, but never on a schedule. You cannot book authenticity. You can only be in the room when it happens. I attend standup now. Officially for alignment. Actually…",
          relationshipHint: "pleased",
          tags: ["quest:burek-standup-observed"],
        },
        {
          id: "ania:burek-content:rep-3",
          text: "The dedicated account was my pitch of the year and it died in one meeting with one sentence from Renata: 'he is not available for content requests, he has a schedule'. A dog with BOUNDARIES. That is why he works. The account would turn him into an employee and employees are not magical. The scarcity is the brand. He remains a freelance icon with one client: the office.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:burek-content:rep-4",
          text: "Filming notes: never chase the dog. The camera follows, he does not — the moment you pursue, you become a paparazzi and the content becomes a hostage video. Both walkouts improved the footage, honestly. The empty frame where a dog was is the most relatable image our brand has ever produced. Absence performs. I have a slide about it called 'the dog decides'. The slide has…",
          relationshipHint: "pleased",
        },
        {
          id: "ania:burek-content:rep-5",
          text: "It was not a fight, it was a PHOTOGRAPH of a disagreement. Marek said 'the dog is a colleague' and I said 'the colleague is content' and we stared at each other across the dog, who was asleep through the entire negotiation of his likeness rights. We settled out of court: no filming him asleep, ever. Marek's respect for the dog is the only boundary he has ever enforced…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:burek-content:rep-6",
          text: "By any human metric he is a failure: he posts nothing, he has no account, and his engagement is one tail. By the only metric that matters he is undefeated — every single person in this building is emotionally invested in his whereabouts. One hundred percent of the office follows him in person. Klaudia's entire audience combined cannot say that. He is not ON the platform.…",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "ania:newsletter",
      label: "The company newsletter",
      optionCandidates: [
        {
          id: "ania:newsletter:opt-1",
          topicId: "ania:newsletter",
          text: "Nobody opens the newsletter. Confirm?",
        },
        {
          id: "ania:newsletter:opt-2",
          topicId: "ania:newsletter",
          text: "The subject lines are unhinged. 'Momentum #14'?",
        },
        {
          id: "ania:newsletter:opt-3",
          topicId: "ania:newsletter",
          text: "Grazyna reads every issue with a red pen.",
        },
        {
          id: "ania:newsletter:opt-4",
          topicId: "ania:newsletter",
          text: "Could the newsletter interview actual humans?",
        },
        {
          id: "ania:newsletter:opt-5",
          topicId: "ania:newsletter",
          text: "Janusz is the most popular section. He declined.",
        },
        {
          id: "ania:newsletter:opt-6",
          topicId: "ania:newsletter",
          text: "What would make issue fifteen the best one?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:newsletter:rep-1",
          text: "A nineteen percent open rate, and in THIS economy of attention that is a packed stadium. Everyone says nobody reads it and everyone knows what was in it — that is the paradox of internal comms. People lie about reading the way they lie about the gym, and the newsletter is the office's gym: universally skipped, secretly shaping everyone. I have the analytics. I have…",
          relationshipHint: "pleased",
        },
        {
          id: "ania:newsletter:rep-2",
          text: "Momentum is our SEASON WORD — Zosia's vocabulary, the values poster, the roadmap. Using it in the subject line is called brand reinforcement and it got the best open rate of the year, which tells you the office will open anything with the word momentum on it. I do not know if that is culture or conditioning. I do know I will keep pulling that lever until the lever files…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:newsletter:rep-3",
          text: "She does, in INK, and the corrections come back to me as a printed page with comments like 'this number disagrees with my number' — and her number is always the righter one. The newsletter is the only company document audited by hand, issue by issue, like a monk illuminating a manuscript with passive aggression. Issue twelve had zero corrections. I framed it. She saw…",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books", "relationship:warm"],
        },
        {
          id: "ania:newsletter:rep-4",
          text: "Interviews are the ONLY way this thing survives another year. The metrics say it: the issues with a human in them outperform the announcements by triple. People do not open newsletters, they open PEOPLE. So yes — three interviews, real questions, the humans of this office in their own words. Marek has already declined, which means he is thinking about it. The decline is…",
          relationshipHint: "pleased",
          offersTaskId: "ania:task-newsletter",
        },
        {
          id: "ania:newsletter:rep-5",
          text: "His robot care tips section is the most-forwarded content this company produces, INTERNAL or external, and he declines to be interviewed like a man declining a medal. His whole section is two sentences emailed to me at 6am. 'Clean the filter on the first Monday. The second shelf is for the good cloths.' That is the entire editorial voice and it is PERFECT. I will not fix it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:newsletter:rep-6",
          text: "Interviews. Three of them, real ones, with the humans the newsletter has been describing from orbit for fourteen issues. Fourteen issues of 'the team did amazing things' and zero issues where the team SAYS anything. Issue fifteen is the pivot from broadcasting to listening, and I need someone with fresh eyes and honest questions to do it. The fresh eyes are yours. The…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "ania:swag",
      label: "The swag box",
      optionCandidates: [
        {
          id: "ania:swag:opt-1",
          topicId: "ania:swag",
          text: "Why do we have four hundred stickers and no t-shirts?",
        },
        {
          id: "ania:swag:opt-2",
          topicId: "ania:swag",
          text: "The tote bags say 'MOMENTUM'. Who approved this?",
        },
        {
          id: "ania:swag:opt-3",
          topicId: "ania:swag",
          text: "Clients ask for the swag. Can I give it out?",
        },
        {
          id: "ania:swag:opt-4",
          topicId: "ania:swag",
          text: "The swag box lives in the storage room. Symbolic?",
        },
        {
          id: "ania:swag:opt-5",
          topicId: "ania:swag",
          text: "Grazyna rejected the hoodie order. Season?",
        },
        {
          id: "ania:swag:opt-6",
          topicId: "ania:swag",
          text: "Design me the perfect piece of swag.",
        },
      ],
      replyCandidates: [
        {
          id: "ania:swag:rep-1",
          text: "Stickers are the cheapest unit of loyalty ever invented. A sticker on a laptop is a billboard the EMPLOYEE pays for in adhesion. T-shirts commit you to a size; stickers commit you to nothing — they travel on water bottles, refrigerators, and the laptops of people who do not even work here. The sticker is the virus and the laptop is the host. I did not invent the model.…",
          relationshipHint: "pleased",
        },
        {
          id: "ania:swag:rep-2",
          text: "The totes were my concept and Zosia's vocabulary and I regret nothing. A tote bag is a walking mission statement that carries LUNCH. Every grocery queue is a brand impression. The elderly ask what momentum means and I tell them it is a value, and they nod like values are normal, which in a grocery queue they are. The totes have done more brand work than the website.…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:swag:rep-3",
          text: "Give it out with STAGING. Swag handed over is merchandise; swag DISCOVERED is a gift. Put three stickers on the contract folder, leave a tote on the visitor chair, and let them find it. People value what they find. The discovery does numbers in client meetings — 'oh this old thing' is the most powerful sentence in brand history and it works on CEOs and dentists equally.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:swag:rep-4",
          text: "The swag box lives next to the banner graveyard, which is either an insult or a family photo album depending on your tenure. I visit quarterly. The box and the banners are the same thing at different ages — this year's tote is next decade's ghost. Swag is merchandising racing against time. The storage room is where the race ends. I find it peaceful. Renata finds it full.…",
          relationshipHint: "neutral",
        },
        {
          id: "ania:swag:rep-5",
          text: "The hoodie order was rejected as 'unbudgeted warmth', which joins the extinguisher in her hall of rejections. But I re-submitted it as 'uniform, rotating' and it cleared in nine minutes — the SAME hoodie, wearing a different word. Grazyna audits words, not wool. This is not a loophole. This is literacy. I have learned the language of the ledger and the ledger has…",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "ania:swag:rep-6",
          text: "The perfect piece does not exist yet and I know its shape: a sticker that means something only to THIS office. The printer. Just the printer, in outline, with the years 2019 to forever underneath. Outsiders see a broken appliance. Insiders see the whole mythology in two dimensions. The best swag is a password disguised as decoration. I have the design. I need your…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "ania:reels",
      label: "The reels schedule",
      optionCandidates: [
        {
          id: "ania:reels:opt-1",
          topicId: "ania:reels",
          text: "Why do the reels post at 7:02 exactly?",
        },
        {
          id: "ania:reels:opt-2",
          topicId: "ania:reels",
          text: "The trending audio is a kids' song about Tuesday.",
        },
        {
          id: "ania:reels:opt-3",
          topicId: "ania:reels",
          text: "Our best reel is Burek walking away. Feelings?",
        },
        {
          id: "ania:reels:opt-4",
          topicId: "ania:reels",
          text: "Klaudia and I posted the same audio. Coincidence?",
        },
        {
          id: "ania:reels:opt-5",
          topicId: "ania:reels",
          text: "Filming me walking with coffee — that is the whole reel?",
        },
        {
          id: "ania:reels:opt-6",
          topicId: "ania:reels",
          text: "When does a reel format die?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:reels:rep-1",
          text: "7:02 because the office arrives at 7:58 and the algorithm's morning window closes at 7:30 — the reel is FOR the audience while THEY are still innocent. The two minutes matter. At 7:00 the feed is crowded with Americans; at 7:02 there is a gap in the schedule that belongs to us. I have watched the slot for a year. The gap is real. The gap is ours. Zosia thinks I made it…",
          relationshipHint: "pleased",
        },
        {
          id: "ania:reels:rep-2",
          text: "The Tuesday song is a phenomenon and I will not apologize — forty million views of children singing about Tuesdays means the concept of Tuesday is HAVING A MOMENT, and our office has intimate knowledge of Tuesdays. Marketing is proximity to the moment. The song is the moment. Our Tuesday content is the proximity. The reel writes itself, and I refuse to be the person who…",
          relationshipHint: "delighted",
        },
        {
          id: "ania:reels:rep-3",
          text: "Our most successful asset is nine seconds of a dog choosing to leave, and yes, I have feelings — they are the feelings of a professional watching the craft operate without her. No script, no lighting plan, no thumbnail strategy. Just Burek, choosing himself, at golden hour. I could not recreate it with a budget. That is the lesson the reels taught me: the best content is…",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:reels:rep-4",
          text: "The same audio within four hours of each other is either coincidence or the strongest signal of a saturated trend, and we BOTH know which. Klaudia and I have a treaty now: she takes morning audio, I take evening, and when we collide the algorithm reads it as a movement. The collision did numbers for both. War is expensive. Synchronized posting is FREE. We are not rivals.…",
          relationshipHint: "pleased",
        },
        {
          id: "ania:reels:rep-5",
          text: "That is the whole reel and it is GENIUS, you walking with coffee says more than a script could: employed, caffeinated, calm, in an office with plants. Six seconds of pure employability. The comments ask if we are hiring. We ARE hiring. The reel is a recruitment funnel that cost one coffee and your natural walk. You are a natural. The walk was perfect. Do not change the walk.",
          relationshipHint: "delighted",
          tags: ["period:morning", "relationship:warm"],
        },
        {
          id: "ania:reels:rep-6",
          text: "A format dies when the CLIENTS' KIDS recognize it. The lifecycle is creators, then brands, then family WhatsApp groups, then death. I watch the family groups like a seismograph — when a client's aunt shares a reel format, the countdown starts. You cannot save a format any more than you can save a trend. You can only exit respectfully and post the funeral reel, which, if…",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:booth",
      label: "The conference booth",
      optionCandidates: [
        {
          id: "ania:booth:opt-1",
          topicId: "ania:booth",
          text: "The booth budget is one folding table. Serious?",
        },
        {
          id: "ania:booth:opt-2",
          topicId: "ania:booth",
          text: "Przemek turns the booth into a sales floor.",
        },
        {
          id: "ania:booth:opt-3",
          topicId: "ania:booth",
          text: "Our banner is from 2022 and says 'AI-first'.",
        },
        {
          id: "ania:booth:opt-4",
          topicId: "ania:booth",
          text: "The swag ran out by noon. Again.",
        },
        {
          id: "ania:booth:opt-5",
          topicId: "ania:booth",
          text: "Can we bring Burek to the conference?",
        },
        {
          id: "ania:booth:opt-6",
          topicId: "ania:booth",
          text: "What makes a booth actually stop people?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:booth:rep-1",
          text: "One folding table, two chairs, and the honesty of a company that spends its money on training instead of furniture — that is the booth's entire aesthetic and I have LEANED IN. Startups spend forty thousand on booth walls; we spend it on a certified bat in the CEO office. The table says 'we are real'. The realness converts. The folding table has closed more deals than any…",
          relationshipHint: "pleased",
        },
        {
          id: "ania:booth:rep-2",
          text: "He does, every time, and the crime scene is always the same: three captive visitors, one opened laptop, and a man saying 'just one slide'. My job at the booth is extraction — I have a signal, I touch my ear, and he wraps the pitch within ninety seconds. The system works because Przemek respects EXACTLY one thing more than closing, and that is a well-executed extraction. I…",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:booth:rep-3",
          text: "The 2022 banner says AI-first and the year 2026 says 'we know'. Replacing it costs money we do not have and history we cannot erase, so I owned it — the banner is now displayed with a sticky note that says 'aged to perfection'. Visitors LOVE it. A brand that admits its own timeline is a brand with confidence. The banner has become the booth. The booth has become the pitch.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:booth:rep-4",
          text: "Swag scarcity is a strategy wearing an accident's clothes. Running out by noon means the morning visitors SAW abundance and the afternoon visitors saw demand, and the afternoon visitors are more interesting anyway — they came late on purpose, like people who arrive at parties fashionably. We do not reprint. The scarcity is the story. The story is 'everyone wanted this'.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:booth:rep-5",
          text: "I pitched the dog at the conference and the venue said no, insurance said no, and Marek said no before I finished the sentence — three nos, one of them PREEMPTIVE. But the venue no had a reason: liability. So next year: Burek OUTSIDE the venue, on a rug, with a sign that says 'our auditor'. The rug is public space. The auditor is legal. The foot traffic will bend toward…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:booth:rep-6",
          text: "Motion, meaning, and one honest question. A moving human stops feet; a meaning stops brains; the question stops hearts. Our booth motion is me rearranging the same stickers like a museum curator with anxiety. The meaning is 'we teach, we ship, we survive'. The question is 'what is burning in your office right now'. That question has started more conversations than…",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:brand-voice",
      label: "The brand voice document",
      optionCandidates: [
        {
          id: "ania:brand-voice:opt-1",
          topicId: "ania:brand-voice",
          text: "The brand voice doc says 'human but scalable'. What?",
        },
        {
          id: "ania:brand-voice:opt-2",
          topicId: "ania:brand-voice",
          text: "Three forbidden words: synergy, leverage, disruptor?",
        },
        {
          id: "ania:brand-voice:opt-3",
          topicId: "ania:brand-voice",
          text: "Who is the brand voice when it talks?",
        },
        {
          id: "ania:brand-voice:opt-4",
          topicId: "ania:brand-voice",
          text: "Maciek wants the voice to say 'scale' more.",
        },
        {
          id: "ania:brand-voice:opt-5",
          topicId: "ania:brand-voice",
          text: "The voice guide has a humor section. Real?",
        },
        {
          id: "ania:brand-voice:opt-6",
          topicId: "ania:brand-voice",
          text: "Does the brand voice have an opinion about the printer?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:brand-voice:rep-1",
          text: "'Human but scalable' means: write like a person, edit like a machine. First drafts are allowed contractions and feelings; the published version keeps the feelings and loses the typos. It is the centaur model of communication — half warmth, half process — and it is the only voice that survives growth. Pure human does not scale and pure scalable is a robot. I have been both.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:brand-voice:rep-2",
          text: "Synergy is banned, leverage is on PROBATION, and disruptor is banned with a special clause: it may never be used within one slide of 'AI'. The forbidden list is short because forbidden lists are cultures, and cultures with too many laws become the thing they were avoiding. Three and a half words, enforced by me, with love. The half is 'utilize'. Use 'use'. I will find you.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:brand-voice:rep-3",
          text: "The brand voice is a composite — my optimism, Zosia's vocabulary, Marek's bluntness and one unit of Klaudia's confidence, blended in a document like a smoothie of the office's best qualities. When it talks, it talks as all of us. Which is why the voice guide took four months: it is not a style guide, it is a TREATY. The treaty holds. The treaty has survived three rebrands.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:brand-voice:rep-4",
          text: "Maciek requested 'scale' appear more in the brand voice and I countered with data: 'scale' reads as cold and our voice's job is warm. We negotiated like nations — he got 'scale' in the vision statements where cold is currency, and I kept it out of the brand voice where warmth converts. The glass wall watched the whole negotiation. Diplomacy is content, Maciek. Everything…",
          relationshipHint: "annoyed",
          tags: ["quest:maciek-briefed-you"],
        },
        {
          id: "ania:brand-voice:rep-5",
          text: "The humor section is real and it is one page and it says 'the office laughs at itself, never at the client, and the printer is always fair game'. That is the whole policy. It was written after the incident where a campaign joked about a client's font choice and the client's brand guidelines contained that font. The printer exemption exists because the printer has never…",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:brand-voice:rep-6",
          text: "The voice guide has one line about the printer, in the legend section: 'the printer is retired, refer to it in the past tense or the present perfect, never the future'. It has happened. It is happening still. It will never print again — grammar as theology. I wrote that line at midnight and it is the only section nobody has ever edited. Some sentences arrive finished.…",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "ania:influencers",
      label: "Influencer collabs",
      optionCandidates: [
        { id: "ania:influencers:opt-1", topicId: "ania:influencers", text: "An influencer wants to collab. For exposure." },
        { id: "ania:influencers:opt-2", topicId: "ania:influencers", text: "Klaudia wants us in her brand deals. Conflict?" },
        { id: "ania:influencers:opt-3", topicId: "ania:influencers", text: "The influencer's rates exceed our swag budget." },
        { id: "ania:influencers:opt-4", topicId: "ania:influencers", text: "How do you vet an influencer in one afternoon?" },
        { id: "ania:influencers:opt-5", topicId: "ania:influencers", text: "The collab post got 40 likes and 3 clients." },
        { id: "ania:influencers:opt-6", topicId: "ania:influencers", text: "Should the influencer visit the office?" },
      ],
      replyCandidates: [
        {
          id: "ania:influencers:rep-1",
          text: "For exposure is the new 'for the portfolio', and sometimes it is worth it — IF their audience overlaps our buyers and their comment section is not a desert. I check three things: engagement ratio, comment quality, and whether they have ever sold anything. Exposure is a metric. Sales are a verdict.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:influencers:rep-2",
          text: "Klaudia is the safest collab we could sign — she already knows the product, the people, and the printer lore, and her audience trusts her taste. The conflict is family-shaped, not legal-shaped. We disclose, we price it like strangers, and the discount stays between her and her accountant.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:influencers:rep-3",
          text: "Then they are not a collab, they are a media buy, and media buys get treated like Grazyna treats subscriptions: annually, with a spreadsheet, and one polite no. Micro-influencers outperform megastars for products people actually use. Our buyer follows a dog and two teachers. Find those.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:influencers:rep-4",
          text: "Engagement ratio first — followers divided by likes tells you if the audience is real. Then comment depth: 'love this' is weather, 'how do I get this for my team' is intent. Then one DM asking for their media kit, which is a fingerprint. Fakes have templates. Real people have typos.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:influencers:rep-5",
          text: "Then it worked. Forty likes is the surface; three clients is the earthquake. The funnel is invisible at the top — nobody admits they came from a reel, they arrive saying 'I saw you somewhere'. Attribution is the ghost story of marketing. The ghost pays invoices.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:influencers:rep-6",
          text: "Only with a shoot plan, a signed release, and Burek's consent obtained through Renata. Office visits are where authenticity is MANUFACTURED, and manufactured authenticity photographs exactly like what it is. If they come, they come for the audit, not the aesthetics. The audit is unrepeatable.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "ania:seo",
      label: "The SEO wizard",
      optionCandidates: [
        { id: "ania:seo:opt-1", topicId: "ania:seo", text: "The SEO consultant says our blog is invisible." },
        { id: "ania:seo:opt-2", topicId: "ania:seo", text: "He promised page one in ninety days. Sign?" },
        { id: "ania:seo:opt-3", topicId: "ania:seo", text: "SEO writing killed our blog's voice. Undo?" },
        { id: "ania:seo:opt-4", topicId: "ania:seo", text: "Keywords feel like lying to robots. Feelings?" },
        { id: "ania:seo:opt-5", topicId: "ania:seo", text: "Grazyna asks what SEO even is. Script me." },
        { id: "ania:seo:opt-6", topicId: "ania:seo", text: "Our best-ranking page is Janusz's flood story." },
      ],
      replyCandidates: [
        {
          id: "ania:seo:rep-1",
          text: "He is half right — the blog is invisible, but so is everyone's, and 'invisible' is the natural state of a website nobody links to. Before any contract: can he show one client whose traffic survived an algorithm update? Survivors are the only reference that matters in this weather.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:seo:rep-2",
          text: "Ninety days is the standard promise because it outlives the average contract and the average memory. I countersign nothing without a baseline report FIRST — you cannot promise a journey without a map. If he refuses the baseline, he is selling weather. We have a printer for that.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:seo:rep-3",
          text: "Then we did SEO wrong. Optimization should dress the voice, not embalm it — the post that ranks is the one a human finishes. My rule: write it human, THEN ask where the honest keyword already lives in the sentence. If the keyword needs surgery, the sentence was wrong. Not the robot's fault.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:seo:rep-4",
          text: "It is not lying, it is translation — the robot is a librarian with no taste, and keywords are how you file the book so the reader finds it. The sin is writing FOR the robot. The craft is writing for the person and leaving the robot a map. Librarians deserve directions too.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:seo:rep-5",
          text: "Say: 'it is how customers find us instead of our competitors, and it costs less than the conference booth.' Then stop. She respects sentences with prices attached. If she asks follow-ups, the answer is 'twelve percent of traffic, growing, cheaper per lead than the booth'. Numbers end negotiations.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:seo:rep-6",
          text: "Of course it is — it is TRUE, specific, and ten years old, which are three of the four pillars of eternal ranking. The fourth is links, and the flood story has been linked by two industry blogs and one insurance company. Janusz outranks our entire funnel. I have made peace with the algorithm's taste for truth.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "ania:awards",
      label: "The industry awards",
      optionCandidates: [
        { id: "ania:awards:opt-1", topicId: "ania:awards", text: "The industry awards deadline is Friday. Enter?" },
        { id: "ania:awards:opt-2", topicId: "ania:awards", text: "Awards cost money we spend on beans. Enter anyway?" },
        { id: "ania:awards:opt-3", topicId: "ania:awards", text: "Who writes the award submission — you or me?" },
        { id: "ania:awards:opt-4", topicId: "ania:awards", text: "We won a local employer award once. Verify?" },
        { id: "ania:awards:opt-5", topicId: "ania:awards", text: "Maciek wants to pitch the judges directly. Allowed?" },
        { id: "ania:awards:opt-6", topicId: "ania:awards", text: "Is the award real or a subscription with a trophy?" },
      ],
      replyCandidates: [
        {
          id: "ania:awards:rep-1",
          text: "Enter, always enter — the submission is the prize. Writing the application is the one day a year marketing and finance sit in one room and agree on what we did. Even a loss produces a document the whole office can use. The trophy would be a bonus. The paperwork is the product.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:awards:rep-2",
          text: "The entry fee is four hundred zloty and the beans are sacred — I am not proposing cannibalization, I am proposing the training budget's 'industry presence' line, which Grazyna keeps warm for exactly this. Every budget has a shelf. This one expires Friday at midnight. Literally.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "ania:awards:rep-3",
          text: "Me first, you second, Grazyna as hostile reviewer. I write the emotion, you add the numbers, and Grazyna deletes every adjective that implies spending. What survives that gauntlet is the most honest marketing document this company produces. The judges get the survivor.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:awards:rep-4",
          text: "Verified, and the certificate hangs in the storage room between the banner graveyard and the crocodile. 'Local Employer of the Year, 2021'. We beat a dentist. The dentist sent flowers. It remains the only hardware this office has ever possessed and Grazyna has it insured for one zloty.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:awards:rep-5",
          text: "He can, and the judges will love him and score us zero — judges reward evidence and CEOs provide vision. My compromise: Maciek attends the ceremony, which is where his energy converts into contacts. The SUBMISSION is mine. The TUXEDO is his. Division of labor is the real award.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:awards:rep-6",
          text: "Half of them are, and the trick is checking the winner list — if every category has exactly one winner who is also a sponsor, it is a subscription with better lighting. The one I picked has judges from outside the sponsor list and a rejection rate. Rejections prove the award exists.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "ania:stock-photos",
      label: "Stock photo shame",
      optionCandidates: [
        { id: "ania:stock-photos:opt-1", topicId: "ania:stock-photos", text: "The website still has the handshake photo." },
        { id: "ania:stock-photos:opt-2", topicId: "ania:stock-photos", text: "We used the laughing-salad woman twice. Damage?" },
        { id: "ania:stock-photos:opt-3", topicId: "ania:stock-photos", text: "Can we afford real photos of real employees?" },
        { id: "ania:stock-photos:opt-4", topicId: "ania:stock-photos", text: "The stock model is now a competitor's CEO. Seriously?" },
        { id: "ania:stock-photos:opt-5", topicId: "ania:stock-photos", text: "Klaudia says stock is 'inauthentic'. Rebuttal?" },
        { id: "ania:stock-photos:opt-6", topicId: "ania:stock-photos", text: "Which stock photo shame haunts you most?" },
      ],
      replyCandidates: [
        {
          id: "ania:stock-photos:rep-1",
          text: "The handshake has tenure — it predates the rebrand, the Batman sign, and two of our interns. I keep meaning to replace it and every quarter the budget for photography competes with the budget for existence. One day it will retire to the storage room with full honors. It has earned them.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:stock-photos:rep-2",
          text: "Twice is a callback, three times is a brand. The salad woman has appeared in our onboarding deck and one client proposal, and a client ASKED ABOUT HER by name. She is canon now. I refuse to apologize for continuity. Marketing is crying in enough thumbnails to know lore when it happens.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:stock-photos:rep-3",
          text: "One afternoon and a phone — that is the entire budget for honest photos. The office is the asset: Burek at his audit, Janusz mid-repair, the training room with actual humans. Real photos convert better because they answer a question the handshake never could: are there people. There are people.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:stock-photos:rep-4",
          text: "Seriously, and it is my favorite LinkedIn coincidence of the decade — the woman who laughed at salad in our 2022 ebook now runs a fintech. We sent congratulations. She replied with the salad emoji. Enemies are just customers who have not renewed yet. The ebook stays up. History is content.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:stock-photos:rep-5",
          text: "Klaudia is right and the fix is not purity, it is RATIO — stock for concepts, real for proof. Nobody believes our office is full of laughing salad people, and everyone knows the handshake is a costume. One honest photo per page outperforms five purchased ones. I have the heatmap. I have receipts.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:stock-photos:rep-6",
          text: "The 'diverse team pointing at a whiteboard' from our first pitch deck — the whiteboard was BLANK, we photographed it mid-thought, and a client zoomed in during the call and asked what the roadmap said. The roadmap said nothing. It was a JPEG. We invented a roadmap live. That client renewed.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "ania:hashtags",
      label: "Hashtag strategy",
      optionCandidates: [
        { id: "ania:hashtags:opt-1", topicId: "ania:hashtags", text: "Our hashtags are a mess. Audit me." },
        { id: "ania:hashtags:opt-2", topicId: "ania:hashtags", text: "How many hashtags is too many for one post?" },
        { id: "ania:hashtags:opt-3", topicId: "ania:hashtags", text: "The branded hashtag has 12 posts. Resurrect?" },
        { id: "ania:hashtags:opt-4", topicId: "ania:hashtags", text: "Klaudia and I use conflicting hashtags. Arbitrate." },
        { id: "ania:hashtags:opt-5", topicId: "ania:hashtags", text: "Do hashtags even work in 2026?" },
        { id: "ania:hashtags:opt-6", topicId: "ania:hashtags", text: "Burek has an unofficial hashtag. Claim it?" },
      ],
      replyCandidates: [
        {
          id: "ania:hashtags:rep-1",
          text: "Send me the last ten posts and I will return a spreadsheet with three columns: carried over from 2022, invented on the day, and still load-bearing. My guess: two load-bearing, six inherited, two crimes. Hashtag hygiene is flossing. Nobody enjoys it and everybody benefits.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:hashtags:rep-2",
          text: "Three doing work beats thirty doing hope. The formula I coach: one branded, one community, one discovery. The rest is spam with a user interface. If the post needs thirty hashtags to be seen, the post was not the problem — the platform moved. Post anyway. The algorithm respects stubbornness.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:hashtags:rep-3",
          text: "Twelve posts is not dead, it is DORMANT — branded tags need a gardener, not a funeral. One post a week, tagged consistently, and by summer it is a portfolio instead of a graveyard. I will add it to my calendar between the webinar and the crying. The crying is scheduled. Everything is.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:hashtags:rep-4",
          text: "Let them conflict — hashtags are dialect, and dialects map territory. Hers is the influencer register, mine is the corporate register, and the overlap is where the audience actually lives. I will not standardize a conversation. I will standardize the tracking sheet, where the peace is signed.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:hashtags:rep-5",
          text: "Fewer than in 2020, more than zero — they are filing, not reach. The reach moved to the algorithm's mood, but hashtags still tell the archive what the post was FOR. You are not hashtagging for today's impressions. You are hashtagging for the researcher in 2027. Posterity is a strategy.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:hashtags:rep-6",
          text: "The tag exists, it has forty posts from strangers, and the audit photos are STUNNING — my professional opinion is jealousy. Claiming it means claiming his content calendar, which means Renata, which means a meeting. Some hashtags are better as folklore. I will archive it. Lovingly. From a distance.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "ania:case-studies",
      label: "The case studies",
      optionCandidates: [
        { id: "ania:case-studies:opt-1", topicId: "ania:case-studies", text: "Clients love the case study. Can we do ten?" },
        { id: "ania:case-studies:opt-2", topicId: "ania:case-studies", text: "The case study is 40 pages. Who reads page 38?" },
        { id: "ania:case-studies:opt-3", topicId: "ania:case-studies", text: "Can the case study admit what went wrong?" },
        { id: "ania:case-studies:opt-4", topicId: "ania:case-studies", text: "Grazyna redacted the budget numbers. Fair?" },
        { id: "ania:case-studies:opt-5", topicId: "ania:case-studies", text: "The client wants approval on every sentence." },
        { id: "ania:case-studies:opt-6", topicId: "ania:case-studies", text: "What makes a case study actually get read?" },
      ],
      replyCandidates: [
        {
          id: "ania:case-studies:rep-1",
          text: "Ten, no — one GOOD one beats ten thin ones, and thin case studies are detectable from the table of contents. The rule: one per season, chosen for a story nobody else can tell. Ours is never the feature list. Ours is the Tuesday the thing actually worked. Find ten of those and call me.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:case-studies:rep-2",
          text: "Page 38 is read by exactly one person: the procurement analyst comparing us to a competitor, and she reads it at eleven pm with a highlighter. Page 38 is where the implementation timeline lives. It is the least glamorous page and the only one that closes deals. Write it with fear.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:case-studies:rep-3",
          text: "The wrong-admission is the trust engine — every case study that says 'we got this wrong, here is the fix' outperforms the flawless ones by a factor I can measure and a factor I cannot. Clients do not believe perfection. Clients believe scars. Scars are our most credible asset.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:case-studies:rep-4",
          text: "Fair and fatal — redacted numbers turn evidence into adjectives. My counter-offer, which she accepted once: ranges instead of points. 'Reduced processing by hours per week' becomes 'reduced by four to nine hours'. She approved the range. Ranges are honest about being estimates. She respects that.",
          relationshipHint: "neutral",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "ania:case-studies:rep-5",
          text: "Then we publish it as a joint document — their logo on it, their edits in it, and the timeline doubles. The trade is worth it: client-approved case studies get SHARED by the client's own marketing, which is distribution we cannot buy. Let them hold the pen. We hold the relationship.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:case-studies:rep-6",
          text: "A person, a problem, and a number — in that order, on page one, before any branding. Most case studies open with our logo and a paragraph about ourselves, which is a diary, not evidence. Open with the client's Tuesday. The reader should think 'that is MY Tuesday' by sentence three. Then sell.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "ania:launch-day",
      label: "Launch day",
      optionCandidates: [
        { id: "ania:launch-day:opt-1", topicId: "ania:launch-day", text: "Launch day is Thursday. Rituals?" },
        { id: "ania:launch-day:opt-2", topicId: "ania:launch-day", text: "The landing page broke an hour before launch." },
        { id: "ania:launch-day:opt-3", topicId: "ania:launch-day", text: "Klaudia wants a countdown reel. Overkill?" },
        { id: "ania:launch-day:opt-4", topicId: "ania:launch-day", text: "Who runs the launch-day war room?" },
        { id: "ania:launch-day:opt-5", topicId: "ania:launch-day", text: "The launch email went out with a typo. Contained?" },
        { id: "ania:launch-day:opt-6", topicId: "ania:launch-day", text: "What does a successful launch day feel like?" },
      ],
      replyCandidates: [
        {
          id: "ania:launch-day:rep-1",
          text: "Rituals: everything staged the day before, one rehearsal at noon, and pizza on standby — the pizza clause has graduated from webinars to launches. The office does not do champagne. It does carbs and a shared dashboard. Launch day is a potluck with a deployment.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:launch-day:rep-2",
          text: "Of course it did, and this is why rehearsal exists — the hour before is when the universe reads your changelog and objects. We rolled back, fixed, and launched forty minutes late, which in launch terms is EARLY. The flaw the universe found was worse than the one we found. Thank the landing page.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:launch-day:rep-3",
          text: "Not overkill — the countdown is the funnel's heartbeat and her reels deliver the only anticipation our pipeline gets. My one condition: the final reel posts AFTER the launch link works. Anticipation without a door is just frustration. Klaudia knows doors. She has three million.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:launch-day:rep-4",
          text: "Me, nominally, Marek actually — the war room is wherever his laptop is, and the room exists the moment he opens the dashboard and says 'watch this number'. Attendance is voluntary. Snacks are Renata's. The dashboard is scripture. Everyone converts by the second spike.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:launch-day:rep-5",
          text: "Contained, yes — the typo was in the P.S., the P.S. was the funniest part, and engagement on that email beat the polished version by a margin I refuse to attribute. Authenticity wins, but we do not TELL anyone the mistake was contained. In marketing, panic is a renewable resource.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:launch-day:rep-6",
          text: "Like Tuesday with better numbers. The great launches are boring — no spikes, no fire, the queue drains, the dashboard stays green, and you go home at six feeling vaguely robbed. The dramatic launch is a warning sign wearing confetti. Boring is the review we give clients. Boring is sacred.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "ania:competitor-content",
      label: "Watching competitors",
      optionCandidates: [
        { id: "ania:competitor-content:opt-1", topicId: "ania:competitor-content", text: "The competitor copied our webinar format. Flattered?" },
        { id: "ania:competitor-content:opt-2", topicId: "ania:competitor-content", text: "Should we respond to their attack thread?" },
        { id: "ania:competitor-content:opt-3", topicId: "ania:competitor-content", text: "Their launch outperformed ours. Intelligence?" },
        { id: "ania:competitor-content:opt-4", topicId: "ania:competitor-content", text: "How do you stalk competitors ethically?" },
        { id: "ania:competitor-content:opt-5", topicId: "ania:competitor-content", text: "Their new site copied our Burek section." },
        { id: "ania:competitor-content:opt-6", topicId: "ania:competitor-content", text: "Zosia says competitors are 'market validation'." },
      ],
      replyCandidates: [
        {
          id: "ania:competitor-content:rep-1",
          text: "Flattered is the professional emotion; flattered is also the accurate one. Formats are not property, execution is — and their copy of our crying slide ran with stock crying, which tests at half our rate. Real tears beat purchased tears. The funnel has opinions about authenticity.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:competitor-content:rep-2",
          text: "Never the thread — the thread is their venue, their audience, their rules. The response is a POST, scheduled, on our turf, about the principle without the name. The internet remembers who swung first and who posted a case study. We are the case study. Be the case study.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:competitor-content:rep-3",
          text: "Yes — their launch is a free masterclass. I screenshot everything: the promise, the price, the follow-up cadence, the typo they will make in week two. By Friday I have a teardown. Competitor launches are the only research that arrives pre-funded by someone else's marketing budget.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:competitor-content:rep-4",
          text: "Ethically is the fun part: everything public is fair — posts, job ads, reviews, hiring pages. A job ad tells you their roadmap better than any leak. I keep a folder, not a dossier — folders are research, dossiers are lawsuits. The line is a screenshot of a PUBLIC page with a date. That is it.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:competitor-content:rep-5",
          text: "Then they are students, and students plagiarize what works. I will not litigate a dog section — Burek's appeal is his complete indifference to cameras, which cannot be copied, only demonstrated. Their version will feature a staged dog. Staged dogs test terribly. Let them try. The algorithm knows.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:competitor-content:rep-6",
          text: "True and generous — being copied means the market noticed, and noticing is the expensive part. Zosia's version is calmer than mine: she says 'imitation is a growth metric'. Mine is 'they copied us because their own funnel is haunted'. Both fit the slide. Hers goes first.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "ania:comments-section",
      label: "The comments section",
      optionCandidates: [
        { id: "ania:comments-section:opt-1", topicId: "ania:comments-section", text: "The comments turned feral under the webinar post." },
        { id: "ania:comments-section:opt-2", topicId: "ania:comments-section", text: "Do you hide negative comments or engage?" },
        { id: "ania:comments-section:opt-3", topicId: "ania:comments-section", text: "A client's CEO commented. With a joke. Respond?" },
        { id: "ania:comments-section:opt-4", topicId: "ania:comments-section", text: "The spam bots found our newsletter signup." },
        { id: "ania:comments-section:opt-5", topicId: "ania:comments-section", text: "Klaudia moderates with a light hand. Learn from her?" },
        { id: "ania:comments-section:opt-6", topicId: "ania:comments-section", text: "What is the meanest comment you ever kept up?" },
      ],
      replyCandidates: [
        {
          id: "ania:comments-section:rep-1",
          text: "Feral means visible, and visible means the algorithm fed it to strangers — our worst-case scenario is our best-performing distribution. I triage: real complaints get answers, jokes get likes, and the one conspiracy thread gets LEFT, because you cannot argue with a thread and win. Only outpace it.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:comments-section:rep-2",
          text: "Engage the specific, hide the performative. 'This feature failed me Tuesday' gets a reply and a ticket. 'This company is a scam' gets hidden — not for us, for the thousand readers deciding in silence. Moderation is not censorship. It is custodial work. Someone has to rake.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:comments-section:rep-3",
          text: "Respond, in the same register — CEO jokes are an invitation and declining it reads as fear. My reply will be shorter than his and funnier by one degree. The comment section is a dinner party and he brought wine. You do not out-shout the guest. You out-host him.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:comments-section:rep-4",
          text: "The bots found us because we RANKED, which is a compliment shaped like an infestation. The fix is a honeypot question: 'what is the office dog's name' kills ninety percent of them. The other ten percent are sophisticated. Those get the slow, manual, satisfying folder treatment.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:comments-section:rep-5",
          text: "Always — Klaudia deletes less and mutes more, which is the difference between a rule and a door. Her comment sections keep personality because she lets people be wrong in peace. My instinct is to correct. Hers is to curate. Watch her replies. It is a masterclass in letting go.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:comments-section:rep-6",
          text: "'I would rather be marketed to by a printer.' It is still up, I replied with printer lore, and it became the most-liked thread in company history. The meanest comments are the funniest assets, IF they are about the craft. Cruelty about the craft is critique. Cruelty about a person is a delete. That is the law.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "ania:merch-ideas",
      label: "Merch beyond swag",
      optionCandidates: [
        { id: "ania:merch-ideas:opt-1", topicId: "ania:merch-ideas", text: "Beyond stickers — what merch would actually sell?" },
        { id: "ania:merch-ideas:opt-2", topicId: "ania:merch-ideas", text: "The mug idea died in licensing. Resurrect?" },
        { id: "ania:merch-ideas:opt-3", topicId: "ania:merch-ideas", text: "Klaudia pitches a merch drop. Hype or inventory?" },
        { id: "ania:merch-ideas:opt-4", topicId: "ania:merch-ideas", text: "Would people buy a printer-themed calendar?" },
        { id: "ania:merch-ideas:opt-5", topicId: "ania:merch-ideas", text: "The plush Burek prototype exists. What now?" },
        { id: "ania:merch-ideas:opt-6", topicId: "ania:merch-ideas", text: "Merch is marketing that costs money. Defend it." },
      ],
      replyCandidates: [
        {
          id: "ania:merch-ideas:rep-1",
          text: "Merch that marks membership, not advertising — nobody wears a logo, everybody wears an inside joke. The standup-audit sticker works because only THIS office gets it. Sell the joke, not the brand. The joke is the brand wearing a disguise. Disguises sell.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:merch-ideas:rep-2",
          text: "The mug died on a technicality — a ceramic supplier wanted exclusive rights to 'Momentum' in three countries. The resurrection plan: a different supplier, a smaller run, and the word replaced with something we actually own. Trademark is the graveyard of merch. Read the contract. Then cry.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:merch-ideas:rep-3",
          text: "Both — a drop is inventory with a heartbeat, and Klaudia's audience converts on scarcity the way our clients convert on case studies. My conditions: presale only, one run, and unsold stock goes to the office, which is how the whole team ends up wearing the campaign. Inventory becomes uniform.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:merch-ideas:rep-4",
          text: "They would, and I have the poll data — the printer calendar tested as our strongest merch concept, which says everything about this office's relationship with grief. Twelve months, twelve outages, one haiku per month. Janusz wants to write October. Marek has claimed the illustrations.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:merch-ideas:rep-5",
          text: "The prototype is with Renata, who reports it is 'disturbingly accurate', and Burek is unbothered, which is the safety test — if the real dog approves, the plush ships. Licensing, a small run, and proceeds to the shelter. The plush audit officer. The joke sells itself. I just hold the invoice.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:merch-ideas:rep-6",
          text: "Merch is marketing that PAYS — every sold mug is a lead that funded itself, and every gifted sticker is a billboard the employee installs voluntarily. The failure mode is buying merch nobody asked for. The fix is polling first, preselling second, ordering third. Cost is a choice. Loyalty is the return.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:dark-social",
      label: "Dark social",
      optionCandidates: [
        { id: "ania:dark-social:opt-1", topicId: "ania:dark-social", text: "Nobody shares our posts publicly. It is all DMs." },
        { id: "ania:dark-social:opt-2", topicId: "ania:dark-social", text: "What even is dark social? Say it slowly." },
        { id: "ania:dark-social:opt-3", topicId: "ania:dark-social", text: "Our traffic spikes with no source. Ghosts?" },
        { id: "ania:dark-social:opt-4", topicId: "ania:dark-social", text: "Can we measure the group-chat funnel?" },
        { id: "ania:dark-social:opt-5", topicId: "ania:dark-social", text: "Screenshots of our site in group chats. Feelings?" },
        { id: "ania:dark-social:opt-6", topicId: "ania:dark-social", text: "Klaudia says dark social is where her audience is." },
      ],
      replyCandidates: [
        {
          id: "ania:dark-social:rep-1",
          text: "Then we are WINNING — shares moved from public feeds to private chats years ago, and the private share is the most valuable unit on the internet: one person vouching to another, in writing, with their own reputation. Public shares are broadcasting. Private shares are recommending. We want recommendations.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:dark-social:rep-2",
          text: "Slowly: dark social is sharing that analytics cannot see — the link pasted into a team chat, the screenshot in a family group, the 'look at this' sent at eleven pm. It is the oldest sharing there is. It predates the share button. We just stopped being able to count it. Counting is not sharing.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:dark-social:rep-3",
          text: "Not ghosts — screenshots. When the source says 'direct', the traffic usually arrived as a link in a message. I stopped chasing attribution and started asking clients where they came from, and the answer is always 'someone sent it to me'. Every 'someone' is a marketer with no budget. Bless them.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:dark-social:rep-4",
          text: "Not directly, and that is fine — you measure the weather, not the wind. I watch the proxies: branded search volume, direct traffic on launch days, and the phrase clients use in calls. If the group chats are working, the searches arrive speaking our slang. The slang is the attribution.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:dark-social:rep-5",
          text: "Proud and slightly violated, which is the correct ratio. The screenshot is the highest form of flattery — someone cropped our work and attached their identity to it. I screenshot the screenshots now. There is a folder. The folder is called 'evidence of affection'. Marketing is sentimental.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:dark-social:rep-6",
          text: "True, and she monetizes it better than we measure it — her audience forwards her reels in chats we will never see, which is why her 'reach' looks small and her pipeline does not. I have stopped teaching her about funnels. She is a funnel. The chat IS the funnel. We just cannot put a dashboard on it.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "ania:billboards",
      label: "The billboard dream",
      optionCandidates: [
        { id: "ania:billboards:opt-1", topicId: "ania:billboards", text: "Do you ever miss billboards? Real outdoor ads?" },
        { id: "ania:billboards:opt-2", topicId: "ania:billboards", text: "Could this office afford one billboard? Math?" },
        { id: "ania:billboards:opt-3", topicId: "ania:billboards", text: "A billboard for an IT training firm. What is on it?" },
        { id: "ania:billboards:opt-4", topicId: "ania:billboards", text: "Buses still run the campaign you interned on?" },
        { id: "ania:billboards:opt-5", topicId: "ania:billboards", text: "Klaudia says outdoor is dead. Debate her?" },
        { id: "ania:billboards:opt-6", topicId: "ania:billboards", text: "What would the billboard say about Burek?" },
      ],
      replyCandidates: [
        {
          id: "ania:billboards:rep-1",
          text: "Every quarter, quietly. Digital is measurable, targetable, and cheaper, and none of that is the POINT. A billboard is an object in the world — it weathers, it gets grafittied, someone photographs it while laughing. Immortality is not a metric. I still want one. The spreadsheet disagrees. We coexist.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:billboards:rep-2",
          text: "One billboard, one month, one arterial road: roughly the webinar budget plus the conference booth, which is to say it costs everything and measures nothing. Grazyna will ask for the conversion rate of a ROAD. There is none. That is the pitch and the problem, in one sentence.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:billboards:rep-3",
          text: "One line, one phone number, no logo bigger than the truth: 'Your team already knows this. We teach the rest.' That sentence tests better than any creative we have produced — it flatters the reader and sells the gap. Billboards have four seconds. Flattery loads faster than logos.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:billboards:rep-4",
          text: "The campaign was replaced in 2014 by a gym ad with the same fonts, which is its own lesson in impermanence. I visited the stop last year. The shelter now hosts a pest control poster. Everything outdoor is temporary. That is WHY it matters — digital never gets to be rained on.",
          relationshipHint: "annoyed",
          tags: ["period:afternoon"],
        },
        {
          id: "ania:billboards:rep-5",
          text: "I will, with love — outdoor is not dead, it is EXPENSIVE, which is different. Klaudia's feeds are her billboards: same traffic, better targeting, no rain. The place outdoor wins is prestige and grandmothers. Some campaigns need grandmothers. Ours, currently, does not. The budget resolves the debate.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:billboards:rep-6",
          text: "'He audits for free.' One line, his photo, no context — the best outdoor creative is the one that requires a stranger to ask someone. Every office park would explain it to every visitor. The billboard would generate more conversation than any funnel we own. And Burek would ignore it. Professionally.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "ania:marketing-budget",
      label: "The marketing budget",
      optionCandidates: [
        { id: "ania:marketing-budget:opt-1", topicId: "ania:marketing-budget", text: "Grazyna cut the marketing budget to one line. Read?" },
        { id: "ania:marketing-budget:opt-2", topicId: "ania:marketing-budget", text: "What does marketing actually cost per client?" },
        { id: "ania:marketing-budget:opt-3", topicId: "ania:marketing-budget", text: "The budget favors webinars over ads. Agree?" },
        { id: "ania:marketing-budget:opt-4", topicId: "ania:marketing-budget", text: "Can I spend my budget line on one experiment?" },
        { id: "ania:marketing-budget:opt-5", topicId: "ania:marketing-budget", text: "Zosia wants marketing to 'prove culture ROI'. Help?" },
        { id: "ania:marketing-budget:opt-6", topicId: "ania:marketing-budget", text: "What would you do with double the budget?" },
      ],
      replyCandidates: [
        {
          id: "ania:marketing-budget:rep-1",
          text: "The line says 'growth activities', which is the most romantic thing she has ever written — it is a blank check with a reporting clause. I read the clause twice: every spend needs a story with a number. She does not fear marketing. She fears unmeasured spending. Measured, she funds. That is the treaty.",
          relationshipHint: "neutral",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "ania:marketing-budget:rep-2",
          text: "Somewhere between a webinar and a handshake — I can tell you the cost of tickets, pizza, and follow-up emails to the zloty, and the handshake is the part that actually converts. Marketing costs are arithmetic. Marketing RESULTS are archaeology. I report both. Only one goes in the ledger.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:marketing-budget:rep-3",
          text: "Agreed, with receipts — webinars convert at a rate ads cannot touch because a webinar is a favor first and a pitch second. Ads buy attention; webinars earn it. The budget reflects what this office believes: teach first. The funnel is just teaching with a schedule.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:marketing-budget:rep-4",
          text: "One experiment, one hypothesis, one number, one month — I will co-sign that proposal faster than the pizza order. What I will not co-sign is 'exploration'. Experiments end. Explorations wander. Grazyna funds endings. Bring her a sentence that ends in a date and a digit.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:marketing-budget:rep-5",
          text: "Tell her the truth: culture is the product demo. Every audit photo, every newsletter issue, every crying thumbnail proves the thing we sell — that competent humans work here. The ROI of culture is that clients believe the brochure. Belief does not itemize. It renews.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:marketing-budget:rep-6",
          text: "Hire the intern back and film everything — one year of honest content buys ten years of credibility, and credibility is the only asset that appreciates while you sleep. The rest goes to the beans. Retention of the person who makes the content is a marketing expense. Grazyna can read that line standing.",
          relationshipHint: "delighted",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "ania:task-frenemy-live",
      title: "'Friend or Frenemy?' goes live",
      description: "Thursday. Eleven slides, one crying thumbnail, forty minutes of vulnerability, and a chatbot answering audience questions at minute forty (it is Ania, typing). The pizza clause activates at minute fifty. Two hundred tickets are already sold, so it is canon.",
      flagToSet: "ania-webinar-volunteered",
      rewardHint: "+persona season one, complete",
    },
    {
      id: "ania:task-newsletter",
      title: "Issue fifteen: the interviews",
      description: "Interview three humans of the office for the newsletter — real questions, their own words, the pivot from broadcasting to listening. Marek has declined, which is the first stage of yes. Ania supplies the questions, the red pen, and the byline. The byline is not negotiable. It is yours.",
      flagToSet: "ania-newsletter-interviews",
      rewardHint: "+the newsletter that gets opened",
    },
  ],
};

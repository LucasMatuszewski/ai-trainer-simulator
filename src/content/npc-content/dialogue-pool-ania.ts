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
    {
      id: "ania:podcast",
      label: "The company podcast",
      optionCandidates: [
        { id: "ania:podcast:opt-1", topicId: "ania:podcast", text: "The podcast has eleven episodes. How many listeners?" },
        { id: "ania:podcast:opt-2", topicId: "ania:podcast", text: "Who is the podcast even for?" },
        { id: "ania:podcast:opt-3", topicId: "ania:podcast", text: "Dawid's episode was forty minutes of silence." },
        { id: "ania:podcast:opt-4", topicId: "ania:podcast", text: "Klaudia wants to co-host an episode." },
        { id: "ania:podcast:opt-5", topicId: "ania:podcast", text: "The podcast intro jingle costs more than the mic." },
        { id: "ania:podcast:opt-6", topicId: "ania:podcast", text: "Should the podcast die with dignity?" },
      ],
      replyCandidates: [
        {
          id: "ania:podcast:rep-1",
          text: "Forty-one monthly listeners, and before you say anything: ELEVEN of them are clients, three are competitors taking notes, and one is my mother, who listens at full volume on a bus and reports my tone. Forty-one is not an audience, it is a congregation, and congregations are worth more than crowds. The metrics say pivot. The metrics have never had a mother on a bus.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:podcast:rep-2",
          text: "The podcast is for the hires we have not made yet — it is the company's voice sample. Candidates binge it before interviews and arrive knowing our jokes. That is not content, that is PRE-WARMING. Eleven episodes is a body of work. The body says: these people are real, occasionally funny, and one of them breathes into the mic. We are working on the breathing.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:podcast:rep-3",
          text: "Forty minutes and every silence was a DECISION. Dawid does not do filler — if he is not talking, the graph of the conversation is flat by design. It is the least downloaded and most respected episode. A client quoted the silence in a meeting. The silence QUOTED WELL. We have released nothing since that can compete with nothing.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:podcast:rep-4",
          text: "She does, and the chemistry is real — her pace, my filter, one microphone between us like a custody arrangement. I said yes on the condition that nobody says 'synergy' unprompted. She has already broken the condition in her head, I can tell. The episode will perform. It will perform so hard. The ring light is booked.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:podcast:rep-5",
          text: "The jingle was composed by a man who charges by the note, and it is nine notes long, and each note has a REASON. Grazyna found the invoice and asked what a note costs. I showed her the retention numbers on episodes that open with the jingle. She said 'fine' in the tone of someone paying a ransom. The jingle stays. Nine notes of freedom.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:podcast:rep-6",
          text: "Never — podcasts do not die, they go dormant and get discovered in three years by a niche that calls it 'ahead of its time'. The archive compounds. Every episode is a small artifact that says 'we were here, we had opinions, one of us said send'. Kill the podcast and you kill the proof. We pivot the FORMAT before we ever kill the feed. This is content doctrine. Write it down.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:ai-copy",
      label: "The AI copy debate",
      optionCandidates: [
        { id: "ania:ai-copy:opt-1", topicId: "ania:ai-copy", text: "Did AI write the last newsletter?" },
        { id: "ania:ai-copy:opt-2", topicId: "ania:ai-copy", text: "Is using AI for copy cheating?" },
        { id: "ania:ai-copy:opt-3", topicId: "ania:ai-copy", text: "The AI copy sounds like us. Too much like us." },
        { id: "ania:ai-copy:opt-4", topicId: "ania:ai-copy", text: "Klaudia's AI captions outperform her real ones." },
        { id: "ania:ai-copy:opt-5", topicId: "ania:ai-copy", text: "Zosia wants an AI policy for the brand voice." },
        { id: "ania:ai-copy:opt-6", topicId: "ania:ai-copy", text: "What will you never let AI write?" },
      ],
      replyCandidates: [
        {
          id: "ania:ai-copy:rep-1",
          text: "The AI drafted, I decided — that is the whole pipeline and the whole ethics. It is a very fast intern with no memories. I feed it our voice, it returns forty versions, and I keep the one that sounds like something a human here would say after coffee. The byline says me. The accountability says me. The speed says otherwise, and the speed is a gift I refuse to apologize for.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:ai-copy:rep-2",
          text: "Cheating is taking credit for work you did not supervise. I supervise every word the way Tomek supervises every line — with a linter and a grudge. The writers who get burned by AI are the ones who pressed send on draft zero. The tool did not betray them. The SEND did. Craft was never typing. Craft was always choosing.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:ai-copy:rep-3",
          text: "That is the uncanny stage and it passes in two weeks, once you start feeding it failures as well as wins. An AI trained only on our best copy produces our best copy forever, which is a wax museum. I trained it on the typo tweet. The apology. The angry unsubscribe. Now it sounds like a company with weather. The flaw is the fingerprint.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:ai-copy:rep-4",
          text: "They do, by eleven percent, and she has made peace with it in a way I find moving. Her position: the captions were never the art, the FACE is the art, the captions were admin with a filter. She posts AI drafts with real captions on alternate days like a control group. She is running SCIENCE. On herself.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:ai-copy:rep-5",
          text: "She wants a policy and I want a paragraph, and the negotiation is beautiful. My draft says 'AI may draft; humans decide; the brand voice is an act of judgment and cannot be delegated'. Her version has bullet points. The paragraph will win. Policy is prose. Bullet points are how you know a lawyer wrote it, and this is a MARKETING document, thankfully.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:ai-copy:rep-6",
          text: "Apologies, condolences, and anything about the team — the real ones, the hires, the goodbyes. A machine can imitate our voice but it cannot carry our weight, and weight is the entire product in those messages. When Janusz retired-adjacent day comes, that post is mine, written slow, checked twice, no drafts folder involved.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "ania:logo-rounds",
      label: "The logo revision rounds",
      optionCandidates: [
        { id: "ania:logo-rounds:opt-1", topicId: "ania:logo-rounds", text: "The logo is on revision fourteen. Ending soon?" },
        { id: "ania:logo-rounds:opt-2", topicId: "ania:logo-rounds", text: "Maciek wants the logo bigger again." },
        { id: "ania:logo-rounds:opt-3", topicId: "ania:logo-rounds", text: "Revision nine was perfect. Why did we move on?" },
        { id: "ania:logo-rounds:opt-4", topicId: "ania:logo-rounds", text: "The designer quit the group chat again." },
        { id: "ania:logo-rounds:opt-5", topicId: "ania:logo-rounds", text: "Grazyna asked what the logo costs per revision." },
        { id: "ania:logo-rounds:opt-6", topicId: "ania:logo-rounds", text: "How do you know when a logo is done?" },
      ],
      replyCandidates: [
        {
          id: "ania:logo-rounds:rep-1",
          text: "Revision fourteen addresses the KERNING, which is the last refuge of a stakeholder who has run out of opinions. Round one was 'make it pop'. Round seven was 'make it trustworthy'. Fourteen is kerning. We are descending through the feedback food chain and at the bottom is done. Two more rounds. The designer has been told 'two more rounds' since round ten. We believe it.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:logo-rounds:rep-2",
          text: "He does, on every asset, since the dawn of the company. I have a folder called 'logo bigger' containing forty-two emails that all say it in different fonts. The final size is negotiated per placement and my rule is: bigger than comfortable, smaller than angry. Maciek signs off at 'confident'. We have a vocabulary. The vocabulary is load-bearing.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:logo-rounds:rep-3",
          text: "Nine was perfect and we left it because perfect does not SURVIVE contact with a boardroom. It needed one more meeting to feel earned. The client never trusts the first miracle. Nine had to be improved into essentially itself — revision eleven is nine with better kerning and a story. The story is 'we listened'. We listened to ourselves. The process is the product, sometimes.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:logo-rounds:rep-4",
          text: "She quits twice per logo and returns once per invoice. It is a rhythm older than our contract and I respect it like a tide. Her agency has a clause: rounds beyond twelve are billed at the 'soul' rate. We hit the soul rate at fourteen. Grazyna approved it with the note 'cheaper than restarting'. The accounting language of love. I frame these things mentally.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:logo-rounds:rep-5",
          text: "She asked, I answered, and she went quiet in the way that precedes either a veto or a spreadsheet. The spreadsheet arrived: cost per revision, plotted against stakeholder satisfaction, and satisfaction PEAKED at nine. She mailed it to the whole thread with the subject 'data'. The thread went silent. Nine is back on the table. Never argue with an accountant about rounds.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:logo-rounds:rep-6",
          text: "It is done when the newest stakeholder's note repeats an earlier note — the loop has closed and no new information exists. Round fourteen's note was almost identical to round six's, just angrier. That is the signal. Design does not finish, it exhausts. You ship the version the exhausted room agrees to. Then you delete the folder of shame and never speak of rounds again.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "ania:press-release",
      label: "The press release",
      optionCandidates: [
        { id: "ania:press-release:opt-1", topicId: "ania:press-release", text: "Did any outlet pick up the press release?" },
        { id: "ania:press-release:opt-2", topicId: "ania:press-release", text: "Why do we still write press releases?" },
        { id: "ania:press-release:opt-3", topicId: "ania:press-release", text: "The quote in the release is from Zosia. All Zosia." },
        { id: "ania:press-release:opt-4", topicId: "ania:press-release", text: "One local blog ran it. With typos." },
        { id: "ania:press-release:opt-5", topicId: "ania:press-release", text: "Maciek wants a national outlet next time." },
        { id: "ania:press-release:opt-6", topicId: "ania:press-release", text: "Teach me to write a press release." },
      ],
      replyCandidates: [
        {
          id: "ania:press-release:rep-1",
          text: "One trade journal ran three paragraphs and cropped our logo, which in this economy is a YES. Press releases are not journalism, they are seed — most vanishes, some sprouts weirdly, and one grows into a call you did not expect in a quarter you needed it. I send them anyway. I send them the way Marek runs backups: not because it works today.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:press-release:rep-2",
          text: "Because the press release is the company's official memory of its own news. Even if no outlet prints it, the release is the paragraph every future bio, pitch, and award entry is copy-pasted from. It is content compost. You write it once and it feeds forty documents. Nobody teaches this. The release is never wasted. The page views are a rounding error on the truth.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:press-release:rep-3",
          text: "All Zosia, and I trimmed her quote three times and it grew back twice, like a hedge. The final version has one sentence of her actual voice and one sentence of her strategic voice, and honestly the mix WORKS — the journalist quoted the human half. There is a lesson there and the lesson is: let the manager be a person for exactly one sentence.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:press-release:rep-4",
          text: "The blog ran it with our company name spelled two ways in one paragraph and I have chosen to find it charming. Their readership is four hundred people who all know someone who knows us. That is not reach, that is a SLIDE RULE of precision marketing. The typos I corrected in the shared doc. Their editor thanked me. I am now their unpaid copy editor. Networking is strange.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:press-release:rep-5",
          text: "He does, and 'next time' is a word I have learned to translate as 'eventually, when the story is bigger'. National outlets want a national story, and our story is honestly, gorgeously local. I am building him a ladder: trade, then city, then regional, then national, each rung a real clip. He wants to skip the ladder. I let him see the ladder. The ladder always wins.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:press-release:rep-6",
          text: "First sentence says who, what, and why anyone should care — a journalist should be able to steal it wholesale. One quote maximum, from a human, with a verb. Boilerplate at the bottom does the company's biography so nobody has to improvise it. And the whole thing fits on one page, because pages two are where press releases go to be unfinished. One page. One truth. One quote.",
          relationshipHint: "pleased",
          tags: ["quest:ania-webinar-volunteered"],
        },
      ],
    },
    {
      id: "ania:sponsorships",
      label: "The local sponsorships",
      optionCandidates: [
        { id: "ania:sponsorships:opt-1", topicId: "ania:sponsorships", text: "We sponsor the local football club now?" },
        { id: "ania:sponsorships:opt-2", topicId: "ania:sponsorships", text: "Our logo is on the club's third-division jerseys." },
        { id: "ania:sponsorships:opt-3", topicId: "ania:sponsorships", text: "The club lost nine nil in our jersey." },
        { id: "ania:sponsorships:opt-4", topicId: "ania:sponsorships", text: "Przemek wants to sponsor a bigger club." },
        { id: "ania:sponsorships:opt-5", topicId: "ania:sponsorships", text: "The club's chairman wants Bartek to train their staff." },
        { id: "ania:sponsorships:opt-6", topicId: "ania:sponsorships", text: "How do you measure a sponsorship win?" },
      ],
      replyCandidates: [
        {
          id: "ania:sponsorships:rep-1",
          text: "We sponsor the club, the chess team, and a canoe that races twice a year. The combined cost is one conference booth, and the goodwill is UNBOUNDED. The chess team put our logo on their thinking faces — well, on theirforeheads, via temporary tattoos, which was their idea and my favorite accident in marketing history. Sponsorships are not media buys.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:sponsorships:rep-2",
          text: "Third division, away kit, chest-level, and the photos are GOLD. Every match, forty men run around for ninety minutes wearing our brand and nobody can buy that at any CPM. The owner's nephew takes pictures from the stands. The nephew has an eye. The nephew is now on my Christmas card list. Marketing at this level is just photography and belief.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:sponsorships:rep-3",
          text: "Nine nil, and the jersey got MORE screen time than any victory would have bought — slow-motion replays of our logo through every single goal. The club apologized. I sent them a sponsorship RENEWAL. The math of attention is heartless and I am its most sentimental practitioner. Their captain wears our mug to training now. The mug is the pipeline.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:sponsorships:rep-4",
          text: "He wants first division and I want a canoe, and the canoe is winning on retention. Big clubs charge big and remember you never; small clubs put you on the committee and name a bench after you eventually. I gave Przemek the sponsorship DECK to present so he feels heard. He will present it beautifully and Maciek will ask what the canoe costs and the canoe will win again.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:sponsorships:rep-5",
          text: "He does, and it is the first sponsorship that wants to PAY US BACK in services, which is the most Wales Move ever — sorry, the most LOCAL move ever. Bartek training their front office in exchange for banner renewal? That is not sponsorship, that is a COOPERATIVE. I have drafted the letter. Bartek has been told. He said 'the lads need CSV skills anyway'. Everyone wins.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:sponsorships:rep-6",
          text: "Not impressions — INVITATIONS. Did the club invite us to the end-of-season dinner? Did the chairman call before emailing? Do their kids know our name? Sponsorship wins are counted in handshakes per quarter, and yes I have a spreadsheet for it, and yes Grazyna has seen it, and yes she called it 'unauditable' and then smiled. The handshakes compound.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:blog-nobody-reads",
      label: "The company blog",
      optionCandidates: [
        { id: "ania:blog-nobody-reads:opt-1", topicId: "ania:blog-nobody-reads", text: "The blog got fourteen views this month. Victory?" },
        { id: "ania:blog-nobody-reads:opt-2", topicId: "ania:blog-nobody-reads", text: "Why does the blog persist?" },
        { id: "ania:blog-nobody-reads:opt-3", topicId: "ania:blog-nobody-reads", text: "Tomek's post about commit messages did well." },
        { id: "ania:blog-nobody-reads:opt-4", topicId: "ania:blog-nobody-reads", text: "Klaudia says blogs are dead. React." },
        { id: "ania:blog-nobody-reads:opt-5", topicId: "ania:blog-nobody-reads", text: "Dawid asked what the blog's ROI is." },
        { id: "ania:blog-nobody-reads:opt-6", topicId: "ania:blog-nobody-reads", text: "Should I write a post for the blog?" },
      ],
      replyCandidates: [
        {
          id: "ania:blog-nobody-reads:rep-1",
          text: "Fourteen views and one of them was a CLIENT who quoted the post in our renewal call. I do not need a thousand strangers. I need the right four hundred and forty, currently at fourteen, growing at the speed of trust. Blogs are slow mail to the future. The future reads at its own pace and it ALWAYS eventually catches up. The archive is patient. So am I.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:blog-nobody-reads:rep-2",
          text: "Because the blog is the only place the company thinks out loud in full sentences. Social is headlines, the podcast is vibes, but the blog is where an argument gets to be LONG. Every company needs a room where thinking is allowed to be unprofitable for twelve hundred words. The blog is that room.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:blog-nobody-reads:rep-3",
          text: "It did WELL — three hundred views, which for our blog is a coronation. Engineers write the only posts strangers forward. The lesson I refuse to learn loudly: nobody wants marketing from marketing. They want the person fixing the thing to explain the thing. I have a queue of engineers I am emotionally press-ganging into drafts. Tomek has agreed to a sequel.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:blog-nobody-reads:rep-4",
          text: "Blogs are dead the way radio is dead — meaning they survived, got weird, and became beloved by exactly the right people. Klaudia's feed is a river; the blog is a well. You do not scroll a well. You RETURN to it. Her last three 'dead' remarks were filmed next to my blog traffic dashboard and the dashboard is TRENDING. I let the footage speak.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:blog-nobody-reads:rep-5",
          text: "He asked, I showed him one number: the renewal call where the client quoted the blog. Dawid looked at me for a long moment and said 'keep it small'. That is the ROI conversation in this company — one story beats one spreadsheet, provided the storyteller is standing right there with the client still on speed dial. The blog stays small. Small is the strategy.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:blog-nobody-reads:rep-6",
          text: "Yes — write the thing you explained to someone twice this month. Twice means the explanation has a body and the body belongs on the blog. Do not write about trends, do not write about 'the industry'. Write the answer you gave in the kitchen, cleaned up, with an example. I will edit it kindly and publish it unbossed.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "ania:agency-pitch",
      label: "The agency pitch",
      optionCandidates: [
        { id: "ania:agency-pitch:opt-1", topicId: "ania:agency-pitch", text: "Another agency pitched us. Survived?" },
        { id: "ania:agency-pitch:opt-2", topicId: "ania:agency-pitch", text: "The agency deck said 'disrupt the disruptors'." },
        { id: "ania:agency-pitch:opt-3", topicId: "ania:agency-pitch", text: "They presented our own roadmap back to us." },
        { id: "ania:agency-pitch:opt-4", topicId: "ania:agency-pitch", text: "One agency quoted a retainer bigger than our marketing budget." },
        { id: "ania:agency-pitch:opt-5", topicId: "ania:agency-pitch", text: "The junior on their team was better than the pitch." },
        { id: "ania:agency-pitch:opt-6", topicId: "ania:agency-pitch", text: "Why do you sit through pitches at all?" },
      ],
      replyCandidates: [
        {
          id: "ania:agency-pitch:rep-1",
          text: "Survived, refreshed, and quietly armed. I attend pitches the way Dawid attends board meetings — to hear what the market thinks we are worth. The agency said our brand was 'undervalued heritage', which is a compliment, an invoice, and a diagnosis in two words. I declined them. I take the vocabulary. The vocabulary is free. The retainer is not.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:agency-pitch:rep-2",
          text: "'Disrupt the disruptors' is the sound an industry makes when it has run out of nouns. I have a private bingo card for pitch decks: disruption, synergy, and one slide with a triangle on it. This deck had a TRIANGLE WITH ARROWS. Full house.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:agency-pitch:rep-3",
          text: "They did, slide for slide, which was either research or a mirror, and the room could not decide whether to be flattered. Dawid said 'we already think this, for free'. The pitch died on that sentence and it deserved the burial — if your strategy is our strategy, your fee is a mirror tax. I kept their slide layout though. The layout was better than ours.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:agency-pitch:rep-4",
          text: "The retainer exceeded the budget and one salary, which they presented as 'investment in ourselves'. Grazyna was in the room for that one — invited, seated, silent, lethal. She asked ONE question: 'what does the first invoice fund, in zloty?' The agency said 'momentum'. The meeting ended with a sound like a door closing on a museum. We kept our budget and our dignity.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:agency-pitch:rep-5",
          text: "The junior DID the audit the seniors just described — actual screenshots, actual numbers, marked up in a font size I could read from the back. After the pitch I asked if she was happy there. She said 'not after today'. I gave her my card, not to poach — to KEEP. Two years later she runs content at a place I admire and she still has the card.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:agency-pitch:rep-6",
          text: "Because every pitch is a free consultation and a temperature check on my own work. If an agency can find a gap, a competitor can too. I take notes in the meeting, steal the good questions, and decline with warmth. The agency knows the game — half of them pitch to be declined, for the CV line. We are all professionals here.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:intern-ideas",
      label: "The intern ideas",
      optionCandidates: [
        { id: "ania:intern-ideas:opt-1", topicId: "ania:intern-ideas", text: "The interns pitched marketing ideas today." },
        { id: "ania:intern-ideas:opt-2", topicId: "ania:intern-ideas", text: "One idea was genuinely good and I am upset." },
        { id: "ania:intern-ideas:opt-3", topicId: "ania:intern-ideas", text: "An intern asked what our TikTok strategy is." },
        { id: "ania:intern-ideas:opt-4", topicId: "ania:intern-ideas", text: "The interns want to rebrand the coffee machine." },
        { id: "ania:intern-ideas:opt-5", topicId: "ania:intern-ideas", text: "Klaudia stole an intern idea already." },
        { id: "ania:intern-ideas:opt-6", topicId: "ania:intern-ideas", text: "How do you run an ideas session that isn't theater?" },
      ],
      replyCandidates: [
        {
          id: "ania:intern-ideas:rep-1",
          text: "Seventeen ideas, two of them legal, one of them MAGNIFICENT. Interns pitch with the confidence of people who have never watched an idea die in procurement, and that confidence is the actual deliverable. I take every idea seriously for exactly ten minutes. Ten minutes of belief costs nothing and keeps the pipeline honest. The other six hours are triage. Balance.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:intern-ideas:rep-2",
          text: "The one where we film 'the printer explains the company' — the PRINTER, as narrator, our whole story in ninety seconds. It is funny, it is on-brand, and it is the idea I would have needed three years to earn. I am upset because it is correct. The printer gets a voice actor. Zosia has been informed and laughed in a way that meant yes. The intern gets the credit in BOLD.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:intern-ideas:rep-3",
          text: "Our TikTok strategy is Klaudia's existence, and I told them exactly that. She IS the channel — the office comes pre-installed with a content engine that runs on ring light and nerve. The intern looked at Klaudia's numbers, looked at me, and wrote 'so the strategy is a person'. Yes. Personnel is the strategy. Always was. The org chart is a media plan if you squint.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:intern-ideas:rep-4",
          text: "Rebrand the coffee machine — a NAME, a personality, a backstory. And I hate that it worked on me. The machine is the only office appliance with universal daily contact; it is a MEDIA PROPERTY waiting for its arc. I have brought it to Zosia as 'internal brand activation'. She said no. She said no with a smile. The smile has a follow-up meeting. The machine's rebrand is alive.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:intern-ideas:rep-5",
          text: "She stole the sticker idea within the HOUR and posted it before the intern finished presenting. The intern's reaction? Awe. Klaudia then credited the intern BY NAME in the caption, which turned theft into a mentorship arc with engagement numbers. That is her dark art: she metabolizes ideas so fast the stealing becomes a feature. I have a rule though. Credit is oxygen.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:intern-ideas:rep-6",
          text: "Three rules. One: no slides, whiteboard only — slides let people perform ideas instead of having them. Two: every idea gets one genuine question before any judgment, and the question has to start with 'what would need to be true'. Three: I pick one idea and fund it BEFORE the session ends, so the pipeline has proof of life. Theater happens when nothing is ever chosen.",
          relationshipHint: "pleased",
          tags: ["quest:ania-webinar-volunteered", "period:afternoon"],
        },
      ],
    },
    {
      id: "ania:testimonial-hunt",
      label: "The testimonial hunt",
      optionCandidates: [
        { id: "ania:testimonial-hunt:opt-1", topicId: "ania:testimonial-hunt", text: "Why are you hunting testimonials again?" },
        { id: "ania:testimonial-hunt:opt-2", topicId: "ania:testimonial-hunt", text: "The client wrote 'all good' as their testimonial." },
        { id: "ania:testimonial-hunt:opt-3", topicId: "ania:testimonial-hunt", text: "Bartek's testimonial collection is legendary." },
        { id: "ania:testimonial-hunt:opt-4", topicId: "ania:testimonial-hunt", text: "One client wants to stay anonymous but be quoted." },
        { id: "ania:testimonial-hunt:opt-5", topicId: "ania:testimonial-hunt", text: "Grazyna invoices testimonial usage time?" },
        { id: "ania:testimonial-hunt:opt-6", topicId: "ania:testimonial-hunt", text: "What makes a testimonial actually good?" },
      ],
      replyCandidates: [
        {
          id: "ania:testimonial-hunt:rep-1",
          text: "Because testimonials are the only marketing asset the client writes FOR us, and hunting season is emotional. The trick is timing: I ask forty-eight hours after a save, when the gratitude is still warm and the invoice is still fresh. Ask too late and it is a chore; ask too early and it is a hostage note. The forty-eight-hour window is my entire secret. You have it now. Guard it.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:testimonial-hunt:rep-2",
          text: "'All good' is a beginning, not an ending. I replied with one question: 'good how — the deadlines, the people, the coffee?' He wrote three paragraphs about our response times by lunch. People are not ungenerous, they are UNPROMPTED. My whole craft is the follow-up question. 'All good' plus one nudge equals a homepage. Every time. The nudge is never rude. The nudge is a mirror.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:testimonial-hunt:rep-3",
          text: "His collection has a waiting LIST — clients who heard about the testimonial round and want in. He collects them mid-conversation, naturally, the way some people collect recipes. The best one, the one I would tattoo on the office: 'Bartek left and the project kept working. That was the point.' Eleven words that explain the entire business model.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:bartek-recommended-you"],
        },
        {
          id: "ania:testimonial-hunt:rep-4",
          text: "Anonymous-but-quoted is a genre and I honor it — 'Head of Operations, enterprise client' carries more weight than a name nobody can verify anyway. The quote is real, the gratitude is real, and the shyness is REAL, usually because their procurement department reads our website, which is the most relatable fear in business. Anonymous praise still converts.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:testimonial-hunt:rep-5",
          text: "She does not invoice usage — she CREATED a ledger column called 'brand assets, goodwill' and logs every testimonial at a nominal one zloty, so the wall of quotes technically has book value. The wall is worth nineteen zloty. It is the most valuable nineteen zloty in the company and one day an auditor will smile at that line item. I will be there.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:testimonial-hunt:rep-6",
          text: "A good testimonial mentions a FEELING and a FACT — 'they answered before the deadline' is a fact with a pulse. The great ones admit a doubt first: 'we were worried about switching, then...' Doubt-then-relief is the oldest story shape in the world and it outsells every superlative. If a quote has no doubt in it, it is an ad. If it has a doubt, it is a story. Stories travel.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:trend-reports",
      label: "The trend reports",
      optionCandidates: [
        { id: "ania:trend-reports:opt-1", topicId: "ania:trend-reports", text: "You bought another trend report? How much this time?" },
        { id: "ania:trend-reports:opt-2", topicId: "ania:trend-reports", text: "Do the trend reports ever predict anything?" },
        { id: "ania:trend-reports:opt-3", topicId: "ania:trend-reports", text: "This year's report says authenticity is trending." },
        { id: "ania:trend-reports:opt-4", topicId: "ania:trend-reports", text: "Klaudia read the report and made six videos." },
        { id: "ania:trend-reports:opt-5", topicId: "ania:trend-reports", text: "Grazyna asks what last year's report delivered." },
        { id: "ania:trend-reports:opt-6", topicId: "ania:trend-reports", text: "What is the actual use of a trend report?" },
      ],
      replyCandidates: [
        {
          id: "ania:trend-reports:rep-1",
          text: "Four hundred zloty for a PDF, which sounds like a scam until you realize it is a scam I can QUOTE in meetings. The report is not information, it is AMMUNITION — 'industry analysis suggests' opens doors that 'I think' never has. I buy two a year, I read forty pages of each, and the rest is shelf. Professional shelf. Shelf with a purpose.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:trend-reports:rep-2",
          text: "They predict the past with excellent confidence. Last year's report predicted short-form video, which was already everywhere by the time the PDF shipped — reports are the industry describing its own tide FROM the beach. That said, the tide descriptions are consistent, and consistency is a signal. You read five reports, find the overlap, and THAT is the actual forecast.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:trend-reports:rep-3",
          text: "Authenticity is trending, which means authenticity is about to become a PERFORMANCE, which means real authenticity is about to get a market advantage. I am ahead of the curve by being genuinely like this — tired, sincere, and allergic to stock photos of handshake people. The report says 'show your humans'. Sir, our humans are ALREADY showing. The printer has a fandom.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:trend-reports:rep-4",
          text: "She speed-read it in nine minutes and produced six videos before I finished my highlighter pass. Her instinct outruns every report — she was filming 'authenticity' content in February, TEN MONTHS before the report discovered it. I have started using her feed as a leading indicator and the reports as confirmation for the CFO-facing slides. She is the report.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:trend-reports:rep-5",
          text: "She asks every year, with the calm of a woman who already knows the answer is 'a slide and a hunch'. Last year I answered honestly: 'the report delivered one decision we would have made anyway and the confidence to make it out loud'. She approved this year's purchase in eleven seconds. Honest accounting is a loyalty program with finance. She knows I know she knows.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:trend-reports:rep-6",
          text: "Permission. That is the whole product. The report lets a conservative room try a new thing WITHOUT anyone sticking their neck out — 'the data suggests' is a heat shield. The ideas in it are usually obvious; the innovation is SOCIAL. Marketing is mostly astrology until the moment it is diplomacy, and the report is the diplomacy layer. Four hundred zloty for permission. Cheap.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:behind-the-scenes",
      label: "The behind-the-scenes content",
      optionCandidates: [
        { id: "ania:behind-the-scenes:opt-1", topicId: "ania:behind-the-scenes", text: "Can you film behind-the-scenes in the server room?" },
        { id: "ania:behind-the-scenes:opt-2", topicId: "ania:behind-the-scenes", text: "The BTS of the failed demo got more likes than the demo." },
        { id: "ania:behind-the-scenes:opt-3", topicId: "ania:behind-the-scenes", text: "Janusz refused to be on camera. Then?" },
        { id: "ania:behind-the-scenes:opt-4", topicId: "ania:behind-the-scenes", text: "Dawid was caught smiling in a BTS clip." },
        { id: "ania:behind-the-scenes:opt-5", topicId: "ania:behind-the-scenes", text: "Where is the line between BTS and oversharing?" },
        { id: "ania:behind-the-scenes:opt-6", topicId: "ania:behind-the-scenes", text: "The BTS account of the office dog is a hit." },
      ],
      replyCandidates: [
        {
          id: "ania:behind-the-scenes:rep-1",
          text: "Denied, politely, by Marek, in writing, with a diagram explaining what a camera flash does to his peace. The server room stays mythical — which honestly HELPS, because unphotographed infrastructure has brand gravity. The mystique is the content. I have filmed the DOOR of the server room, four seconds, dramatic hum, two million hypothetical views waiting to happen.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:behind-the-scenes:rep-2",
          text: "Of course it did — failure is the only genre where the audience is guaranteed to feel taller than the protagonist. The failed demo clip has outperformed every polished asset by seven to one. The lesson is not 'ship failures', the lesson is 'ship truths'. The demo worked the NEXT week and the follow-up clip did half the numbers. Redemption never rates like ruin.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:behind-the-scenes:rep-3",
          text: "Refused on camera, so we filmed HIS HANDS. Ninety seconds of Janusz fixing the boiler, hands only, no face, with one line of caption: 'the building is held together by these'. It is our most shared post ever. Janusz watched it once on Renata's phone, said 'hands look strong', and returned to the boiler. He knows. He KNOWS. The hands account is his now. He has not posted.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:behind-the-scenes:rep-4",
          text: "The clip is eleven seconds long and it is our crown jewel — Dawid, mid-meeting, smiling at something Pawel said, unaware. The internet decided the CEO is 'secretly warm' and the narrative wrote itself. He has seen it. He said 'the graph is up'. That is the whole review. The smile stays up.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:behind-the-scenes:rep-5",
          text: "The line is DIGNITY — if the person in the clip would wince, it does not ship, no matter the engagement. BTS is a gift the team gives the audience, not a tax the audience extracts from the team. I run every clip past its subject, always. It costs me one same-day video and buys me a decade of access. Access is the whole asset.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:behind-the-scenes:rep-6",
          text: "Burek outperforms every human on the account by a factor I have stopped publishing because it demoralizes the talent. His content is SIMPLE: one dog, one office, total sincerity. There is a lesson there and the lesson is that audiences can smell effort. The dog does not try. Klaudia has begun featuring him strategically — a 'burek cam' transition every third reel.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "ania:unsubscribe-zen",
      label: "The unsubscribe zen",
      optionCandidates: [
        { id: "ania:unsubscribe-zen:opt-1", topicId: "ania:unsubscribe-zen", text: "Someone replied to the newsletter with pure rage." },
        { id: "ania:unsubscribe-zen:opt-2", topicId: "ania:unsubscribe-zen", text: "How are you calm about unsubscribes?" },
        { id: "ania:unsubscribe-zen:opt-3", topicId: "ania:unsubscribe-zen", text: "The unsubscribe button is broken for one user. Again." },
        { id: "ania:unsubscribe-zen:opt-4", topicId: "ania:unsubscribe-zen", text: "A subscriber resubscribed after leaving. Why?" },
        { id: "ania:unsubscribe-zen:opt-5", topicId: "ania:unsubscribe-zen", text: "Zosia watches our unsubscribe rate nervously." },
        { id: "ania:unsubscribe-zen:opt-6", topicId: "ania:unsubscribe-zen", text: "What was your worst unsubscribe message ever?" },
      ],
      replyCandidates: [
        {
          id: "ania:unsubscribe-zen:rep-1",
          text: "The rage reply was three paragraphs on how our newsletter 'murders his mornings'. I replied once: 'fair — the mornings are gone. I have unsubscribed you myself, with respect.' He wrote back a DAY later to say the newsletter was fine actually, he had just been having a quarter. Email anger is a mirror with a reply button.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:unsubscribe-zen:rep-2",
          text: "Because a clean unsubscribe is a SUCCESS, not a loss — the list should be people who would miss us, not hostages with mail fatigue. Every unsubscribe raises the average engagement of everyone who stayed. I run the numbers monthly and they always say the same thing: the list got better. Churn with grace. The zen is statistical. The peace is in the dashboard.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:unsubscribe-zen:rep-3",
          text: "The broken unsubscribe is my WHITE WHALE — one user, one client domain, a filter that eats the link. I have unsubscribed him MANUALLY four times and his mailbox re-subscribes him through some corporate automation that predates us all. We have exchanged pleasantries. We have exchanged Christmas wishes. At this point he is not a subscriber, he is a CO-AUTHOR. The man stays.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:unsubscribe-zen:rep-4",
          text: "He left for a 'inbox zero era', lasted five weeks, and came back with a note: 'the silence was worse'. THAT note is framed in my heart. The lesson is huge — you do not miss content, you miss CADENCE. The Tuesday arrival was a tiny landmark in his week and landmarks matter to humans more than information does. We are not in the newsletter business.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:unsubscribe-zen:rep-5",
          text: "She watches it like a heartbeat, and I finally showed her the correlation she feared: unsubscribes SPIKE after every sales push and RECOVER within two lists. The audience self-cleans what the push dirties. She asked if I could 'reduce the spikes'. I said yes, by reducing the pushes, and we looked at each other like two generals across a treaty table. The pushes continue.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:unsubscribe-zen:rep-6",
          text: "Two words: 'finally.' and then his full name, misspelled, which he had spelled correctly in his subscriber profile for THREE YEARS. Sir. The rage I could take. The misspelling was an indictment of us both. I fixed the profile, unsubscribed him with ceremony, and added 'check the spelling' to my onboarding review checklist. His rage improved our data hygiene.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:typo-tweet",
      label: "The typo tweet",
      optionCandidates: [
        { id: "ania:typo-tweet:opt-1", topicId: "ania:typo-tweet", text: "The typo tweet. Walk me through it." },
        { id: "ania:typo-tweet:opt-2", topicId: "ania:typo-tweet", text: "You left it up on purpose, didn't you?" },
        { id: "ania:typo-tweet:opt-3", topicId: "ania:typo-tweet", text: "Zosia saw the typo tweet before you did." },
        { id: "ania:typo-tweet:opt-4", topicId: "ania:typo-tweet", text: "The typo became a brand in-joke." },
        { id: "ania:typo-tweet:opt-5", topicId: "ania:typo-tweet", text: "Klaudia says she would never typo. Sure." },
        { id: "ania:typo-tweet:opt-6", topicId: "ania:typo-tweet", text: "What is your typo prevention system now?" },
      ],
      replyCandidates: [
        {
          id: "ania:typo-tweet:rep-1",
          text: "The announcement said 'We are hirng' and the internet did what the internet does: corrected us, memed us, and applied to work with us — applications TRIPLED, because 'hirng' read as human. A robot would not have typoed. The typo was proof of life at a company people suspected was automated.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:typo-tweet:rep-2",
          text: "Left up for ninety minutes, which is the correct dose — long enough to collect the affection, short enough to show we saw it. Then the correction tweet: 'We are hiring. We are not hiring proofreaders. (We are hiring proofreaders.)' The correction outperformed the typo. The PAIR is taught in a course somewhere, probably. I have never checked. I prefer the legend.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:typo-tweet:rep-3",
          text: "She saw it at seven fourteen and replied internally with one line: 'leave it, it is working'. That is manager instinct you cannot teach — she recognized a gift disguised as a mistake BEFORE the engagement numbers confirmed it. I have worked under people who would have demanded a retraction and a review. Zosia recognized a meme in the wild.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:typo-tweet:rep-4",
          text: "'Hirng' is now office canon — the mugs say it, the recruit pack says it, and one client opened our pitch with 'hi, we are also hirng'. A typo with a two-year lifespan and a merch line is called a BRAND ASSET and I have added it to the asset register at one zloty, where Grazyna keeps all our sentimental property. The register is a museum of things that went wrong correctly.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:typo-tweet:rep-5",
          text: "She claims a typoless record and I have receipts — a caption from March with 'aesthetic' spelled with three e's, deleted in under a minute. I do not blackmail. I ARCHIVE. The archive keeps us honest and gently competitive. She calls my archive 'the vault of crimes'. I call it 'quality assurance with narrative'. Neither of us deletes anything. That is the real bond.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:typo-tweet:rep-6",
          text: "Two-pair review: every external post is read by me and one volunteer who is NOT on marketing that day — fresh eyes catch what famished eyes forgive. Klaudia volunteers Mondays. Marek volunteered once, returned the post with three comments about the font, and retired from the program undefeated. The system is human, slow, and it works. The typos that survive now are CHOSEN.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
      ],
    },
    {
      id: "ania:jingle",
      label: "The radio jingle",
      optionCandidates: [
        { id: "ania:jingle:opt-1", topicId: "ania:jingle", text: "You recorded a jingle? With lyrics?" },
        { id: "ania:jingle:opt-2", topicId: "ania:jingle", text: "The jingle is playing on local radio. HOW." },
        { id: "ania:jingle:opt-3", topicId: "ania:jingle", text: "Pawel sings the jingle now. Unprompted." },
        { id: "ania:jingle:opt-4", topicId: "ania:jingle", text: "Grazyna heard the jingle invoice. Survive?" },
        { id: "ania:jingle:opt-5", topicId: "ania:jingle", text: "The jingle's rhymes are crimes. Confess." },
        { id: "ania:jingle:opt-6", topicId: "ania:jingle", text: "Would you do a second jingle?" },
      ],
      replyCandidates: [
        {
          id: "ania:jingle:rep-1",
          text: "Four lines, one rhyme scheme that would embarrass a greeting card, and a hook that lives in your head RENT-FREE against its will. I wrote it in a bath. I sang the demo into a phone with a cashier's enthusiasm. The studio kept my demo vocal on the final cut because the session singer 'could not match the sincerity'. The sincerity was a cold. The cold is famous now.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:jingle:rep-2",
          text: "The local station had a gap in their rotation and their ad sales guy went to our CHURCH BAZAAR, Renata's table, where the jingle was playing from a tablet as decoration. He asked. Renata negotiated. The station plays it twice a week in the slot after the fishing report. The fishing audience is LOYAL and DEMOGRAPHICALLY PERFECT. Renata closed a radio deal at a cake stall.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:jingle:rep-3",
          text: "He sings it at his DESK, the hook specifically, in the exact key, and yesterday Marek hummed it BACK to him. The jingle has achieved horizontal transmission. It is in the building's bloodstream. When an intern hums your melody and a sysadmin returns it, you have outperformed every KPI I have ever reported. I logged it as 'organic reach: internal, total'.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:jingle:rep-4",
          text: "The invoice said 'jingle production' and she said the word 'jingle' out loud like it was a financial crime. Then I showed her the radio deal — paid placement, six months, effectively FREE distribution — and she recalculated in real time. The jingle is now an 'audio asset with earned media value'. The word jingle is banned from the ledger. Fine.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:jingle:rep-5",
          text: "Confessed: 'training that empowers your software superpowers' is a rhyme that should have required a permit. The studio engineer asked if I wanted to fix it and I said NO — imperfect rhymes are memorable BECAUSE the brain trips on them and re-boots the song. Every jingle in history has one crime rhyme. It is not a flaw. It is a LOADING MECHANISM. The crime is the feature.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:jingle:rep-6",
          text: "There is a second jingle drafted for the TRAINING ROOM — 'learn the thing, ring the thing' — and it is possibly worse and definitely catchier. It is waiting for a sponsor, a station, and a Tuesday when I feel powerful. The first jingle took a bath and a cold. The second deserves a full production. Some artists peak. I am pacing myself.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:font-licensing",
      label: "Font licensing",
      optionCandidates: [
        { id: "ania:font-licensing:opt-1", topicId: "ania:font-licensing", text: "The new font costs how much per weight?" },
        { id: "ania:font-licensing:opt-2", topicId: "ania:font-licensing", text: "Can we just use the free version of the font?" },
        { id: "ania:font-licensing:opt-3", topicId: "ania:font-licensing", text: "A client used our licensed font in their deck." },
        { id: "ania:font-licensing:opt-4", topicId: "ania:font-licensing", text: "Tomek said fonts are just shapes." },
        { id: "ania:font-licensing:opt-5", topicId: "ania:font-licensing", text: "The font license renews when exactly?" },
        { id: "ania:font-licensing:opt-6", topicId: "ania:font-licensing", text: "Grazyna flagged the font invoice as suspicious." },
      ],
      replyCandidates: [
        {
          id: "ania:font-licensing:rep-1",
          text: "Four hundred euros, PER WEIGHT, and we need three weights because bold is a personality and light is a mood. Type foundries are the only industry where italic costs extra like a topping. I have made peace with it. The kerning makes peace back.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:font-licensing:rep-2",
          text: "The free version is the same font with the personality surgically removed: fewer weights, no italics, and a kerning table written by someone in a hurry. It is like buying the concert t-shirt of a band you did not see. We pay. We suffer. We look incredible.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:font-licensing:rep-3",
          text: "Then their legal team gets a lovely email from ours, and I get to say 'intellectual property' in a tone Klaudia describes as 'radio threat'. Fonts are licensed like music. Their deck touring conferences with our letterforms is a small unauthorized tour.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:font-licensing:rep-4",
          text: "He said it with a straight face, in a building where people have opinions about cables. Shapes carry tone like instruments carry tunes. I dare him to set his commit messages in Comic Sans and tell me shapes are neutral. The dare stands. He will not take it.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:font-licensing:rep-5",
          text: "The anniversary of the purchase, which the foundry celebrates with an invoice and zero festivity. I keep it in the shared calendar titled 'Font Day' and everyone thinks it is a joke. Font Day is real. Font Day has a budget line. Font Day is coming.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:font-licensing:rep-6",
          text: "She questioned a typeface costing more than a chair, and honestly, fair. I showed her the before-and-after of the brand refresh and she went quiet in the way accountants go quiet, which means convinced or calculating. Either way the invoice survived the audit.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
      ],
    },
    {
      id: "ania:email-signature",
      label: "The email signature campaign",
      optionCandidates: [
        { id: "ania:email-signature:opt-1", topicId: "ania:email-signature", text: "Why does everyone's email signature look different?" },
        { id: "ania:email-signature:opt-2", topicId: "ania:email-signature", text: "Someone put a quote in their signature." },
        { id: "ania:email-signature:opt-3", topicId: "ania:email-signature", text: "Your signature template has eleven elements?" },
        { id: "ania:email-signature:opt-4", topicId: "ania:email-signature", text: "Maciek's signature has his title, plus 'Visionary'." },
        { id: "ania:email-signature:opt-5", topicId: "ania:email-signature", text: "The banner in the signature does not render." },
        { id: "ania:email-signature:opt-6", topicId: "ania:email-signature", text: "Is a signature really part of the brand?" },
      ],
      replyCandidates: [
        {
          id: "ania:email-signature:rep-1",
          text: "Because the signature field is the last unregulated border in communication and everyone smuggles personality through it. Fonts, colors, quotes, one person has a gif. My campaign will standardize it, gently, like a visa policy. The gif goes. The gif knows why.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:email-signature:rep-2",
          text: "The quote is where the soul leaks out. One senior had a proverb, one intern had a video game line, and for two weeks our outbound email sounded like a fortune cookie in recovery. Quotes are for mugs. Signatures are for identity. I am firm and I am right.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:email-signature:rep-3",
          text: "Eleven, and every one is a soldier: name, role, two phone numbers, legal line, address, confidentiality note, logo, and a small calendar link that may be doing more harm than good. Corporate identity is a paragraph wearing a suit. Eleven is restraint. I wanted twenty.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:email-signature:rep-4",
          text: "The Visionary addition lasted one legal review, because our lawyer asked what a Visionary signs for. He kept it in his heart, where it is unregulated. Signatures must survive contact with paperwork. His heart is exempt. The signature is not.",
          relationshipHint: "delighted",
          tags: ["quest:ceo-met", "relationship:neutral"],
        },
        {
          id: "ania:email-signature:rep-5",
          text: "The banner renders in every client except the one the biggest client uses, naturally. Marek says it is a images-in-email problem; I say it is fate testing my commitment to brand consistency. We are switching to a text lockup. The banner retires with honor.",
          relationshipHint: "neutral",
          tags: ["quest:marek-trusted-review"],
        },
        {
          id: "ania:email-signature:rep-6",
          text: "It is the most-seen brand surface we own. Our website gets visitors; our signatures reach inboxes at the exact moment someone decides if we are serious. The signature is a handshake in text form. You would not send a handshake in Comic Sans. This is my whole argument.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:diy-design",
      label: "Midnight DIY design",
      optionCandidates: [
        { id: "ania:diy-design:opt-1", topicId: "ania:diy-design", text: "You design the assets yourself at midnight?" },
        { id: "ania:diy-design:opt-2", topicId: "ania:diy-design", text: "Why not just brief the agency for small assets?" },
        { id: "ania:diy-design:opt-3", topicId: "ania:diy-design", text: "Your export was named 'final_final_REAL'." },
        { id: "ania:diy-design:opt-4", topicId: "ania:diy-design", text: "Klaudia says your design tools are dinosaurs." },
        { id: "ania:diy-design:opt-5", topicId: "ania:diy-design", text: "The midnight post had a typo in the headline." },
        { id: "ania:diy-design:opt-6", topicId: "ania:diy-design", text: "When does DIY design become a real problem?" },
      ],
      replyCandidates: [
        {
          id: "ania:diy-design:rep-1",
          text: "Midnight is when the critique committee in my head finally goes home and the good decisions happen. Daytime me designs for seven imagined stakeholders. Midnight me designs for the feed, and the feed is honest. Everything good I have made happened after the office lights learned to sleep.",
          relationshipHint: "pleased",
          tags: ["period:evening"],
        },
        {
          id: "ania:diy-design:rep-2",
          text: "Because the agency bills a briefing workshop for a button, and the workshop has homework. For small assets, the math is me, a template, and forty focused minutes versus two weeks and an invoice with a story in it. I love the agency. I love budgets more, at scale.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:diy-design:rep-3",
          text: "The naming system is a hostage diary and every designer speaks it fluently. final_final_REAL ships; anything cleaner is a lie we tell ourselves at export time. Tomasz saw the filename and said nothing, but he saved the file structure as an example of chaos theory. Fair.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:diy-design:rep-4",
          text: "She calls my stack 'heritage equipment' and films her own workflow like a cooking show. Her tools are faster; my tools are paid for and know my shortcuts. One day we will do a live design-off. Her ring light against my decade of keyboard macros. Winner keeps the budget.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:diy-design:rep-5",
          text: "One letter, live for eleven minutes, screenshot by a client who now says 'by the power of' ironically in every call. The typo became a mascot. I still fixed it at midnight with the same hands that made it, which is either craftsmanship or a closed loop of suffering.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:diy-design:rep-6",
          text: "When the DIY takes longer than the briefing would have, which is the trap nobody tracks. I time myself now. Forty minutes is craft. Four hours is ego wearing a beret. The moment I am debugging alignment at 2am for a post nobody measured, the agency earns their fee.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:landing-pages",
      label: "The landing page zoo",
      optionCandidates: [
        { id: "ania:landing-pages:opt-1", topicId: "ania:landing-pages", text: "How many landing pages do we actually have?" },
        { id: "ania:landing-pages:opt-2", topicId: "ania:landing-pages", text: "The 2023 webinar page is still live?" },
        { id: "ania:landing-pages:opt-3", topicId: "ania:landing-pages", text: "Two pages promise different prices." },
        { id: "ania:landing-pages:opt-4", topicId: "ania:landing-pages", text: "Tomek wants to delete the orphan pages." },
        { id: "ania:landing-pages:opt-5", topicId: "ania:landing-pages", text: "One page converts at eleven percent?" },
        { id: "ania:landing-pages:opt-6", topicId: "ania:landing-pages", text: "Should every campaign really get its own page?" },
      ],
      replyCandidates: [
        {
          id: "ania:landing-pages:rep-1",
          text: "Fourteen public, nine secret, one so old it ranks for words we have not sold in years. Each one is a promise we froze in time. I keep the registry like a zookeeper: feeding schedules, escape risks, and one enclosure nobody visits but the SEO refuses to let go.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:landing-pages:rep-2",
          text: "It still gets forty visits a month from a newsletter link that refuses to die. Someone, somewhere, bookmarks everything. That page is a museum exhibit now: the fonts are wrong, the logo is one redesign behind, and it quietly proves we existed in 2023. It stays.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:landing-pages:rep-3",
          text: "That is not two prices, that is a diplomacy incident. The old page predates the price change and promises like exes. I reconciled them within the hour, because a client with two screenshots of two prices asks questions no campaign ever answers. Registry updated. Lesson framed.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],
        },
        {
          id: "ania:landing-pages:rep-4",
          text: "He calls them orphans and he is right, which is the annoying part. But orphans collect strays: old links, one PDF, a QR code on a thousand printed flyers. Deleting a page is deleting a street sign. We archive instead. The signs point somewhere quiet and legal.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:landing-pages:rep-5",
          text: "The boring one. White background, one button, a sentence that respects the reader. No confetti, no video hero, nothing Klaudia would call 'content'. It converts because it asks for exactly one thing and gets out of the way. I show it to designers as a mirror.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:landing-pages:rep-6",
          text: "Yes, because every campaign has one job and one audience, and a page is just the job wearing its own clothes. Shared pages average their messages into mush. The zoo is work, but mush is worse. You can clean a zoo. You cannot un-mush a message.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "ania:utm-parameters",
      label: "UTM discipline",
      optionCandidates: [
        { id: "ania:utm-parameters:opt-1", topicId: "ania:utm-parameters", text: "Someone posted a link without any UTM tags." },
        { id: "ania:utm-parameters:opt-2", topicId: "ania:utm-parameters", text: "Your UTM naming convention has a document?" },
        { id: "ania:utm-parameters:opt-3", topicId: "ania:utm-parameters", text: "Maciek pasted a raw link in his keynote slide." },
        { id: "ania:utm-parameters:opt-4", topicId: "ania:utm-parameters", text: "The analytics show 'newsletter' spelled four ways." },
        { id: "ania:utm-parameters:opt-5", topicId: "ania:utm-parameters", text: "Do UTMs even survive people retyping links?" },
        { id: "ania:utm-parameters:opt-6", topicId: "ania:utm-parameters", text: "Why does tagging links feel like homework?" },
      ],
      replyCandidates: [
        {
          id: "ania:utm-parameters:rep-1",
          text: "Then that visit walks into analytics wearing a mask and my dashboard just shrugs at eternity. Untagged links are not crimes, they are amnesia. I will find the source through referral logic like a detective who went too far. I always find out. The badge is metaphorical.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:utm-parameters:rep-2",
          text: "There is a document, it is one page, and it has solved more arguments than the retro board. Lowercase everything, campaign before channel, date last. Grazyna reviewed it and called it 'a ledger with delusions of marketing'. Highest praise available in this office.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "ania:utm-parameters:rep-3",
          text: "Four hundred people typed a naked URL into existence and analytics calls it 'direct', which is analytics for 'we will never know'. I recovered what I could from the traffic shape. Keynotes launch a thousand naked links. It is the price of a man who speaks from the heart.",
          relationshipHint: "neutral",
          tags: ["quest:ceo-met"],
        },
        {
          id: "ania:utm-parameters:rep-4",
          text: "Newsletter, Newsletter2, NEWSLETTER and one tragic 'newsleter'. They are the same campaign in four parallel universes and my reports have to introduce them to each other monthly. The convention document now has a nemesis section. The nemesis section grows.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:utm-parameters:rep-5",
          text: "They die the moment a human retypes, and that is fine: tags are for the journey we control. Print, screenshares, memory, all of it leaks. The trick is tagging enough of the journey that the leaks are measurable as leaks. I do not chase perfection. I chase legible majority.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:utm-parameters:rep-6",
          text: "Because it is homework, but it is the homework that turns guessing into knowing. Every tagged link is a small vote for future decisions made on evidence instead of vibes. Marketing has enough vibes. We have a whole word for vibes. We call it brand, and it does not need more help.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "ania:emoji-policy",
      label: "The emoji policy",
      optionCandidates: [
        { id: "ania:emoji-policy:opt-1", topicId: "ania:emoji-policy", text: "Is there an official emoji policy now?" },
        { id: "ania:emoji-policy:opt-2", topicId: "ania:emoji-policy", text: "A client replied to my email with a thumbs up only." },
        { id: "ania:emoji-policy:opt-3", topicId: "ania:emoji-policy", text: "The fire emoji in the outage tweet?" },
        { id: "ania:emoji-policy:opt-4", topicId: "ania:emoji-policy", text: "Tomek signed a message with a semicolon." },
        { id: "ania:emoji-policy:opt-5", topicId: "ania:emoji-policy", text: "Klaudia uses emojis like punctuation." },
        { id: "ania:emoji-policy:opt-6", topicId: "ania:emoji-policy", text: "Which emoji is the most dangerous in business?" },
      ],
      replyCandidates: [
        {
          id: "ania:emoji-policy:rep-1",
          text: "One page: none in legal, one maximum in client email, unlimited internally until morale or meaning collapses. Emojis are tone in a medium that stripped tone out. We are not banning tone. We are rationing it, like everything else that is powerful and slightly embarrassing.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:emoji-policy:rep-2",
          text: "The lone thumbs up is the business world's most complete sentence. It means approved, received, and let us never discuss it again. I have come to love it. It closes loops that paragraphs used to wedge open. Some clients speak fluent minimal and I respect the dialect.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:emoji-policy:rep-3",
          text: "Yes. Someone put fire next to the word outage and the screenshot toured the industry. In any other context, fire means great; in an outage it means arson. Context is the entire policy, honestly. That single emoji did more damage than the outage, which lasted nine minutes.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:emoji-policy:rep-4",
          text: "The semicolon is his emoji. One character, ambiguous, technically a bug in most sentences. He thinks emoji are 'tone for people who dislike precision'. I think his semicolons are emojis with a degree. We have agreed to disagree in writing only.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:emoji-policy:rep-5",
          text: "She deploys them like a typographer: rhythm, emphasis, pacing. Three is a drumroll, one is a wink, zero means business. Half the office copies her cadence without noticing. If brand voice ever needs a definition, I will just point at her keyboard and whisper 'there'.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:emoji-policy:rep-6",
          text: "The laughing one on a complaint. One customer wrote two paragraphs of genuine pain and someone replied with joy. Screenshots do not carry context; they carry verdicts. The policy page opens with that incident. We call it the cautionary smile. Nobody has repeated it.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "ania:apology-drafts",
      label: "The apology draft folder",
      optionCandidates: [
        { id: "ania:apology-drafts:opt-1", topicId: "ania:apology-drafts", text: "Why do you have pre-written apology posts?" },
        { id: "ania:apology-drafts:opt-2", topicId: "ania:apology-drafts", text: "The apology template got leaked?" },
        { id: "ania:apology-drafts:opt-3", topicId: "ania:apology-drafts", text: "Has a real apology ever matched a draft?" },
        { id: "ania:apology-drafts:opt-4", topicId: "ania:apology-drafts", text: "Tomek said sincerity cannot be templated." },
        { id: "ania:apology-drafts:opt-5", topicId: "ania:apology-drafts", text: "The typo-tweet apology actually used draft three?" },
        { id: "ania:apology-drafts:opt-6", topicId: "ania:apology-drafts", text: "What makes an apology post land badly?" },
      ],
      replyCandidates: [
        {
          id: "ania:apology-drafts:rep-1",
          text: "Because apologies written during a crisis are written by adrenaline, and adrenaline chooses words like a drunk chooses furniture. The folder has four drafts: typo-level, outage-level, pricing-level, and one I hope never leaves the drawer. Prepared contrition is still contrition.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:apology-drafts:rep-2",
          text: "Not leaked, quoted. A journalist quoted our outage apology structure and called it 'hauntingly efficient'. We now own the phrase 'we are sorry, here is what happened, here is what changes'. Three companies copied it. I feel like a ghostwriter for the whole industry.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:apology-drafts:rep-3",
          text: "Never fully, and that is the design. The draft is scaffolding: facts on the left, feelings on the right, and the middle is always written live, in the moment, slightly shaking. If a real apology ever matched a draft perfectly, I would delete the folder and worry.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:apology-drafts:rep-4",
          text: "He is right and wrong in the same sentence, which is his signature move. Sincerity cannot be templated, but facts can, and half of any apology is facts. We template the facts. He templates nothing, which is why his commit messages read like confessions. Both systems ship.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:apology-drafts:rep-5",
          text: "Draft three, lightly edited at speed, and it worked so well the client quoted it back to US. The typo tweet became our case study: small mistake, fast honesty, zero deaths. Somewhere in the folder, draft three has a tiny gold star drawn in pen. It earned it.",
          relationshipHint: "delighted",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "ania:apology-drafts:rep-6",
          text: "The word 'but'. Every bad apology in history contains a 'but' doing the work of a lawyer. Also passive voice: 'mistakes were made' is a sentence with nobody in it. My drafts have no 'but' and always a name. Somebody owns it. That somebody is us, in writing.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:ab-subject-lines",
      label: "Subject line experiments",
      optionCandidates: [
        { id: "ania:ab-subject-lines:opt-1", topicId: "ania:ab-subject-lines", text: "Version A won by how much this time?" },
        { id: "ania:ab-subject-lines:opt-2", topicId: "ania:ab-subject-lines", text: "The emoji in a subject line actually won?" },
        { id: "ania:ab-subject-lines:opt-3", topicId: "ania:ab-subject-lines", text: "Tomek unsubscribed over the ALL CAPS test." },
        { id: "ania:ab-subject-lines:opt-4", topicId: "ania:ab-subject-lines", text: "What is the best subject line you ever wrote?" },
        { id: "ania:ab-subject-lines:opt-5", topicId: "ania:ab-subject-lines", text: "The honest subject line outperformed clickbait?" },
        { id: "ania:ab-subject-lines:opt-6", topicId: "ania:ab-subject-lines", text: "How many subject lines do you test per send?" },
      ],
      replyCandidates: [
        {
          id: "ania:ab-subject-lines:rep-1",
          text: "Two percent, which in subject line country is a landslide. Version A was a question, version B was a statement, and questions won again, confirming my theory that inboxes are lonely places where curiosity beats confidence. I log every duel. The log has four hundred entries.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:ab-subject-lines:rep-2",
          text: "One envelope emoji, once, and the open rate jumped three points. I felt dirty and rich simultaneously. The envelope is now rationed to once a quarter like caviar. The data says it works. The data has no shame. I have some. It is measured and shrinking.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:ab-subject-lines:rep-3",
          text: "He unsubscribed with the comment 'shouting is not a strategy', and he was in the minority sample by pure chance. The caps version lost by eleven points AND one Tomasz. Most expensive test of the year. I frame failures too. That frame says 'lesson, 11 percent, plus one legend'.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:ab-subject-lines:rep-4",
          text: "'We were wrong about last week' — sixty-one percent opens, and people replied TO THE SUBJECT LINE saying thanks for the honesty. It announced a correction to our own advice. Humility, it turns out, is a growth channel. Nobody wanted to hear that from a metrics person.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:ab-subject-lines:rep-5",
          text: "It did, quietly, by nine points, and it keeps happening. Clickbait wins once and then the list stops trusting the sender. Honest lines win slower and compound forever. I tell interns: you are not writing for the open, you are writing for the second email. That is where lists live.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:ab-subject-lines:rep-6",
          text: "Two, maybe three. Past that you are splitting a small list into sample sizes too shy to speak. Testing is a telescope, not a microscope: big differences only. If the two lines are within noise, I pick the one I would say out loud at the coffee machine. Voice is the tiebreaker.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "ania:brand-book",
      label: "The brand book",
      optionCandidates: [
        { id: "ania:brand-book:opt-1", topicId: "ania:brand-book", text: "The brand book is how many pages now?" },
        { id: "ania:brand-book:opt-2", topicId: "ania:brand-book", text: "Has anyone opened the brand book voluntarily?" },
        { id: "ania:brand-book:opt-3", topicId: "ania:brand-book", text: "The misuse examples page is the best part?" },
        { id: "ania:brand-book:opt-4", topicId: "ania:brand-book", text: "Klaudia follows the brand book exactly?" },
        { id: "ania:brand-book:opt-5", topicId: "ania:brand-book", text: "The book still shows the old logo on page one." },
        { id: "ania:brand-book:opt-6", topicId: "ania:brand-book", text: "What would you cut from the brand book?" },
      ],
      replyCandidates: [
        {
          id: "ania:brand-book:rep-1",
          text: "Ninety-six pages, and I defend every one like a mother at a school play. Colors, spacing, voice, the four wrong ways to use the logo, and a word list with 'synergy' on the banned page. It is the constitution of the brand. Constitutions are long. That is why they hold.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:brand-book:rep-2",
          text: "Twice a year someone does, and both times it was to settle an argument, which is exactly its job. The book is not reading, it is arbitration. The day nobody argues about spacing is the day I worry. Disputes mean people care enough to check the law.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:brand-book:rep-3",
          text: "Page 41: the logo on a photo of Burek, the logo stretched like taffy, the logo in a gradient we do not speak of. Each example is labeled with a polite shudder. Agencies have confessed they skipped the rules and studied the crimes. Crime teaches. It always has.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:brand-book:rep-4",
          text: "She follows the letter and breaks the spirit daily, gloriously, on camera, where the book has no jurisdiction. Her feed is the brand with the contrast turned up. I tried to page her once. She quoted page 12 back at me with timestamps. The influencer READ it. I sat down.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "quest:klaudia-rebranded-you"],
        },
        {
          id: "ania:brand-book:rep-5",
          text: "Page one is history and history keeps its face. The old logo stays because the book documents the change like a border on a map: here is who we were, here is the line, here is who we are. Erasing the old face would make the book a brochure. Brochures do not govern.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:brand-book:rep-6",
          text: "The twenty-page tone section, which I wrote and love, and which nobody reads because tone is caught, not taught. I would compress it to five examples: one email, one error message, one apology, one celebration, one goodbye. Everything else is the same five notes in different keys.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "ania:mood-boards",
      label: "Mood boards",
      optionCandidates: [
        { id: "ania:mood-boards:opt-1", topicId: "ania:mood-boards", text: "What is on the spring campaign mood board?" },
        { id: "ania:mood-boards:opt-2", topicId: "ania:mood-boards", text: "The mood board has a photo of the office kitchen?" },
        { id: "ania:mood-boards:opt-3", topicId: "ania:mood-boards", text: "Tomek looked at the mood board for nine seconds?" },
        { id: "ania:mood-boards:opt-4", topicId: "ania:mood-boards", text: "Klaudia's board and mine match by accident." },
        { id: "ania:mood-boards:opt-5", topicId: "ania:mood-boards", text: "Do mood boards actually guide the final work?" },
        { id: "ania:mood-boards:opt-6", topicId: "ania:mood-boards", text: "Can I add something to the board?" },
      ],
      replyCandidates: [
        {
          id: "ania:mood-boards:rep-1",
          text: "Morning light, one shared coffee, the color of the sky at six, and a sentence torn from a magazine that says 'we were all tired and it was fine'. Nobody will see that sentence. It is there to aim the work. Mood boards are briefs for people who feel first and read later.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:mood-boards:rep-2",
          text: "The kitchen at golden hour, when the light hits the machines and everything looks like a commercial. It is the most honest photo of this company: tired, warm, slightly sticky, full of caffeine and small hope. The campaign is about that feeling. The kitchen is the mood.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:mood-boards:rep-3",
          text: "Nine seconds is a masterclass. He scanned it, pointed at one image and said 'that one', and left. That image became the visual anchor of the whole campaign. Engineers find the load-bearing element faster than any workshop. I now schedule Tomasz for nine seconds per quarter.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "ania:mood-boards:rep-4",
          text: "Same photo, different crop. Hers is vertical, mine is wide, both are the parking lot at dusk. We stood in front of the boards, laughed for a full minute, and now the campaign has one visual language with two accents. Convergence is rare. I would have scheduled ten meetings to fake it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:mood-boards:rep-5",
          text: "They guide like a compass guides: never once consulted during the walk, secretly responsible for every turn. By the time the final asset ships, nobody remembers the board, but the palette is its palette and the light is its light. That is the whole trick. Influence without paperwork.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:mood-boards:rep-6",
          text: "Yes, with the sacred rule: image or object only, no explanations. The board speaks in vibes and vibes do not take meeting notes. Marek added a photo of a cable rack once and it made the cut for the IT campaign's texture slide. Everyone's eye is valid. That is the point of the wall.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "ania:friday-meme",
      label: "The Friday meme slot",
      optionCandidates: [
        { id: "ania:friday-meme:opt-1", topicId: "ania:friday-meme", text: "It is Friday. Is the meme posted?" },
        { id: "ania:friday-meme:opt-2", topicId: "ania:friday-meme", text: "The printer meme got a comment from the printer vendor?" },
        { id: "ania:friday-meme:opt-3", topicId: "ania:friday-meme", text: "Tomek liked a meme. Publicly." },
        { id: "ania:friday-meme:opt-4", topicId: "ania:friday-meme", text: "Klaudia wants to co-post the Friday meme." },
        { id: "ania:friday-meme:opt-5", topicId: "ania:friday-meme", text: "A client quoted our meme in a contract call." },
        { id: "ania:friday-meme:opt-6", topicId: "ania:friday-meme", text: "What happens when the meme lands badly?" },
      ],
      replyCandidates: [
        {
          id: "ania:friday-meme:rep-1",
          text: "Posted at 15:45, the exact minute the office brain clocks out and the scrolling brain clocks in. Timing is the whole strategy: the meme is a weekly permission slip to be human on the feed. Miss the minute and you are just a company posting pictures at weird hours.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "ania:friday-meme:rep-2",
          text: "The vendor's social team replied with a wink emoji and our printer sales rep texted me 'we SAW that'. The meme was gently critical and they took it like champions. Now the vendor follows us. Never punch at a brand that can see you. Nudge, and make it lovable.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:friday-meme:rep-3",
          text: "A like from Tomasz is the industry equivalent of a Michelin star. The meme was about semicolons. I immediately screenshotted it and the screenshot has been shown to three interns as proof that he contains a person. The like had fourteen reactions within the hour. He noticed. He survived.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "ania:friday-meme:rep-4",
          text: "We tried a co-post once: her filming, my caption, one take. The office meme became a duet and the numbers tripled. Now it is a shared custody arrangement with alternating Fridays. The feed does not care who holds the camera. The feed cares if it is Friday and if it is funny.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:friday-meme:rep-5",
          text: "He opened the call with 'so, casual Friday, I see' and the whole room relaxed one full notch before the numbers came out. The meme did more pre-negotiation work than the deck. Humor is a door-opener. Contracts signed through doors beat contracts slid under them.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract", "relationship:warm"],
        },
        {
          id: "ania:friday-meme:rep-6",
          text: "Then it was not a meme, it was a message wearing a costume, and the feed smells the difference instantly. The rule: laugh at ourselves, never at a client, never at a leaver. Two memes have been quietly retired. Both taught me more than the hundred that landed. The slot stays.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "ania:photo-credits",
      label: "The forgotten photographer",
      optionCandidates: [
        { id: "ania:photo-credits:opt-1", topicId: "ania:photo-credits", text: "We used a photo without crediting the photographer." },
        { id: "ania:photo-credits:opt-2", topicId: "ania:photo-credits", text: "How do you credit photos on social posts anyway?" },
        { id: "ania:photo-credits:opt-3", topicId: "ania:photo-credits", text: "The freelancer found our post and replied?" },
        { id: "ania:photo-credits:opt-4", topicId: "ania:photo-credits", text: "Klaudia films everything; who credits her?" },
        { id: "ania:photo-credits:opt-5", topicId: "ania:photo-credits", text: "Janusz took the best photo in the archive." },
        { id: "ania:photo-credits:opt-6", topicId: "ania:photo-credits", text: "Is crediting really that big a deal?" },
      ],
      replyCandidates: [
        {
          id: "ania:photo-credits:rep-1",
          text: "Then the credit goes up within the hour and an email goes out with the word 'oversight' doing its honest work. Photos are labor wearing light. The archive has a license column now, blessed by Grazyna, audited by me, ignored by no one twice.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:photo-credits:rep-2",
          text: "First comment, pinned, every time. The caption belongs to the message; the first comment belongs to the humans who made it. It is not charity, it is infrastructure: photographers talk to each other, and reputation travels through their networks faster than our campaigns do.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:photo-credits:rep-3",
          text: "She replied 'thank you for the credit, sending the RAW files' and now we have a photographer who feels seen and a library upgrade we did not pay for. Credit is the cheapest currency in this industry and it appreciates. I buy it whenever I can.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:photo-credits:rep-4",
          text: "Her rule is 'credit the office, the office credits me', and it holds because she films the office being itself. Her name tag in the corner is part of the aesthetic now. Remove it and the comments ask where the corner went. Attribution became branding. She called it first.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:photo-credits:rep-5",
          text: "The empty corridor at 6am with the light doing that thing through the frosted glass. Taken on his phone, unedited, during a patrol. It hung in the campaign for a month credited as 'building custodian, 6:12am'. Janusz has been unbearable in the humblest possible way. Deserved.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:photo-credits:rep-6",
          text: "It is the difference between a colleague and a content faucet. People who make things remember who saw them as people. Every credit is a small contract that says we know the difference. The deals it saves are invisible, which is exactly why cheap skeptics skip it. We do not.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:qr-codes",
      label: "QR codes everywhere",
      optionCandidates: [
        { id: "ania:qr-codes:opt-1", topicId: "ania:qr-codes", text: "There is a QR code on the coffee machine now?" },
        { id: "ania:qr-codes:opt-2", topicId: "ania:qr-codes", text: "The flyer QR points to a dead page." },
        { id: "ania:qr-codes:opt-3", topicId: "ania:qr-codes", text: "Do people actually scan print codes?" },
        { id: "ania:qr-codes:opt-4", topicId: "ania:qr-codes", text: "Tomek scanned the code and inspected the URL." },
        { id: "ania:qr-codes:opt-5", topicId: "ania:qr-codes", text: "Klaudia put a QR in her video for one frame." },
        { id: "ania:qr-codes:opt-6", topicId: "ania:qr-codes", text: "Where should we NOT put a QR code?" },
      ],
      replyCandidates: [
        {
          id: "ania:qr-codes:rep-1",
          text: "It links to the machine's maintenance log, which is the most Janusz-adjacent marketing I have ever shipped. People scan it out of pure curiosity and land on a page that says 'cleaned Thursdays, loved always'. It converts at four percent. Of what, we are not sure. It converts.",
          relationshipHint: "delighted",
          tags: ["period:morning"],
        },
        {
          id: "ania:qr-codes:rep-2",
          text: "The flyer from 2022 points to a page I archived, which makes that square pieces of paper a room full of tiny broken doors. QR codes are promises frozen into geometry. I now keep a registry of every printed code, because print outlives us all and never updates its links.",
          relationshipHint: "annoyed",
        },
        {
          id: "ania:qr-codes:rep-3",
          text: "Twelve percent on the training room poster, which is a crowd in print terms. The trick is giving the scan a reason: the poster says 'scan for the checklist' and people want the checklist. A naked QR is homework. A QR with a promise is a vending machine. Design for the promise.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:qr-codes:rep-4",
          text: "He scanned it, read the URL aloud like a customs officer, and pronounced it 'legitimate'. Then he said the error-correction level was 'overkill, respectably so'. Print marketing received its first security audit. The code passed. I have never felt prouder of a square.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "ania:qr-codes:rep-5",
          text: "One frame, pause-bait, and her comments are now full of people announcing they found it like explorers claiming a pole. She turned a tracking code into a scavenger hunt and the hunt outperformed the destination. I hated it. Then I saw the numbers. I still hate it. Respectfully.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "ania:qr-codes:rep-6",
          text: "Moving vehicles, wedding invitations, and anything below knee height. The airport ad taught the industry about speed, the wedding taught us about taste, and the skirting board taught us that nobody crouches for marketing. QR codes live at eye level and die of dignity everywhere else.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "ania:boosted-posts",
      label: "The fifty-euro boost",
      optionCandidates: [
        { id: "ania:boosted-posts:opt-1", topicId: "ania:boosted-posts", text: "You boosted a post with fifty euros?" },
        { id: "ania:boosted-posts:opt-2", topicId: "ania:boosted-posts", text: "The boost reached my aunt in Canada?" },
        { id: "ania:boosted-posts:opt-3", topicId: "ania:boosted-posts", text: "Grazyna wants a receipt per boost?" },
        { id: "ania:boosted-posts:opt-4", topicId: "ania:boosted-posts", text: "Tomek asked why we pay for reach." },
        { id: "ania:boosted-posts:opt-5", topicId: "ania:boosted-posts", text: "The boosted post brought one client inquiry?" },
        { id: "ania:boosted-posts:opt-6", topicId: "ania:boosted-posts", text: "When is boosting actually worth it?" },
      ],
      replyCandidates: [
        {
          id: "ania:boosted-posts:rep-1",
          text: "Fifty euros, aimed at a thirty-kilometer radius and one job title, because the algorithm deserves narrow instructions. It is not advertising, it is a megaphone with a checklist. Big budgets get agencies. Small budgets get precision, and precision is the better teacher.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:boosted-posts:rep-2",
          text: "Your aunt saw it, liked it, and sent it to the family chat with the caption 'our company'. That like cost four cents of the budget and did more for morale than the entire analytics dashboard. Boosts are aimed at strangers. Relatives arrive anyway, uninvited, glorious.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:boosted-posts:rep-3",
          text: "She gets one, stapled, with the reach and the cost per thousand humans on it. She calls the metric 'price per stranger' and it has entered office vocabulary. The first time she approved a boost without questions, I framed the approval. It took fourteen months. Frames are cheap.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "ania:boosted-posts:rep-4",
          text: "He asked it honestly, over the build, and got honesty back: organic reach is a lottery and fifty euros buys a ticket with better odds. He nodded and said 'so it is a load-balancer'. It is EXACTLY a load-balancer for attention. He named my job better than my title does.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "ania:boosted-posts:rep-5",
          text: "One inquiry, one call, one contract addendum that pays for boosts until the sun dies. People see the fifty and not the funnel. I reported it as 'one client, fifty euros' and Grazyna did the actual math out loud and laughed. It is the only time a spreadsheet has laughed with me.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract"],
        },
        {
          id: "ania:boosted-posts:rep-6",
          text: "When the content already works unpaid. A boost is fertilizer, not sunlight: it multiplies what is alive and does nothing for the dead. My rule is seventy-two hours of organic evidence first. If strangers are sharing it for free, strangers will share it faster for fifty euros. Otherwise, save the fifty.",
          relationshipHint: "pleased",
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

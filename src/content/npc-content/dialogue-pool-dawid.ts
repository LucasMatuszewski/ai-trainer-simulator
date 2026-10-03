/**
 * WS5 dialogue v2 pool — Dawid, The CEO (C-77).
 *
 * Pure authored data. Topics: the meeting economy (walking one-on-ones,
 * alignment as cardio), the graph (KPIs, hockey sticks, and the flat
 * part), and Bruce (forty thousand zloty of certified brand equity with
 * wings). Task offer: the one-pager (sets the existing
 * `ceo-workshop-offered` flag). Tone matches his legacy trees: you are
 * seen, you are valued, you are a number on a spreadsheet that goes up.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const DAWID_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "dawid",
  topics: [
    {
      id: "dawid:alignment",
      label: "The meeting economy",
      optionCandidates: [
        {
          id: "dawid:alignment:opt-1",
          topicId: "dawid:alignment",
          text: "Are you ever not in a meeting?",
        },
        {
          id: "dawid:alignment:opt-2",
          topicId: "dawid:alignment",
          text: "What is a walking one-on-one, exactly?",
        },
        {
          id: "dawid:alignment:opt-3",
          topicId: "dawid:alignment",
          text: "How do you prepare for so many meetings?",
        },
        {
          id: "dawid:alignment:opt-4",
          topicId: "dawid:alignment",
          text: "Can we book time that is not a meeting?",
        },
        {
          id: "dawid:alignment:opt-5",
          topicId: "dawid:alignment",
          text: "Who runs the company while you are aligned?",
        },
        {
          id: "dawid:alignment:opt-6",
          topicId: "dawid:alignment",
          text: "I need a decision. A real one. From you.",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:alignment:rep-1",
          text: "If I am not IN a meeting, I am walking TO one, or recovering from one, which I schedule as 'thinking time' so it shows on the graph. The calendar is full, but it is full of alignment, and alignment is the one thing this company cannot have too much of. Nobody has measured. I will not be the one who measures.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:alignment:rep-2",
          text: "We walk, we talk, and it counts as cardio and alignment at the same time. HR calls it overwork. I call it momentum. The route is fixed: past the server rack, past the window, past Burek. Burek has never once asked for a follow-up. Best attendee I have.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:alignment:rep-3",
          text: "Preparation is a strong word. I read the agenda in the elevator and I decide my mood in the lobby. The rest is listening with eyebrows. You noticed the eyebrows. Everyone notices the eyebrows. They are load-bearing.",
          relationshipHint: "pleased",
          tags: ["quest:ceo-met", "relationship:neutral"],
        },
        {
          id: "dawid:alignment:rep-4",
          text: "A non-meeting is called a coffee, and coffee is where the real decisions happen, which is why I hold so many meetings ABOUT coffee. Book one. If it goes well it becomes a walking one-on-one. If it goes very well it becomes a meeting, and then you know you have arrived.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:alignment:rep-5",
          text: "Three systems run it: the invoices, which handle themselves; the building, which handles itself; and the graph, which goes up. I align the people to the graph. Maciek aligns the words to the vision. Zosia aligns the people to the words. It is circles all the way down, and the circles are load-bearing.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:alignment:rep-6",
          text: "A real decision requires a real agenda, and a real agenda requires a proposal. Write me one page: what you would teach, to whom, and what the graph does afterward. If the page is good, it goes to the board as a workshop. That is how everything starts here — one page, then momentum.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
          offersTaskId: "dawid:task-one-pager",
        },
      ],
    },
    {
      id: "dawid:graph",
      label: "The graph",
      optionCandidates: [
        {
          id: "dawid:graph:opt-1",
          topicId: "dawid:graph",
          text: "Why does the graph always go up?",
        },
        {
          id: "dawid:graph:opt-2",
          topicId: "dawid:graph",
          text: "The graph went down once. What happened?",
        },
        {
          id: "dawid:graph:opt-3",
          topicId: "dawid:graph",
          text: "What is a hockey stick, in your words?",
        },
        {
          id: "dawid:graph:opt-4",
          topicId: "dawid:graph",
          text: "Are we a family or a set of KPIs?",
        },
        {
          id: "dawid:graph:opt-5",
          topicId: "dawid:graph",
          text: "Who else can see the graph?",
        },
        {
          id: "dawid:graph:opt-6",
          topicId: "dawid:graph",
          text: "What is the number I am on the spreadsheet?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:graph:rep-1",
          text: "Because it is pointed at up. Half of leadership is the angle you draw the line at, and the other half is believing the line. When it goes up and to the right, that is not a graph, it is a promise. When it goes down we do not panic — we pivot. The stick is always hockey.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:graph:rep-2",
          text: "It dipped, we pivoted, and the pivot became the story we tell at onboarding. The dip was Tuesday, the pivot was Wednesday, and by Thursday the slide said 'growth mindset' and the client had doubled the contract out of pity or respect. The graph cannot tell the difference and neither can I.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract", "relationship:warm"],
        },
        {
          id: "dawid:graph:rep-3",
          text: "A hockey stick is flat, flat, flat, then suddenly the sky. Every quarter is the flat part. Every founder lives in the flat part. The trick is to keep calling the flat part 'momentum' until the sky shows up. It works. Ask any slide.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:graph:rep-4",
          text: "A family, and families have quarterly reviews. The KPIs are how we show love in this economy: I measure you, therefore I care. The alternative is not measuring people, and I have read about companies that do that. They are all 'vibes-based' and none of them have a Batman.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:graph:rep-5",
          text: "You can see it, I can see it, and Burek sleeps next to the printout in the corridor — true story, the light is warm there. The graph does not need to be secret. The graph needs to be BELIEVED. Secrecy is for companies whose graphs go down.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:graph:rep-6",
          text: "A number that goes up. I genuinely do not remember which number you are, and that is a compliment — I remember the numbers that wobbled. You have never wobbled. Keep not wobbling and you will become a trend line, and trend lines get named after themselves.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "dawid:bruce",
      label: "Bruce",
      optionCandidates: [
        {
          id: "dawid:bruce:opt-1",
          topicId: "dawid:bruce",
          text: "Why is there a giant Batman in the CEO office?",
        },
        {
          id: "dawid:bruce:opt-2",
          topicId: "dawid:bruce",
          text: "Did Bruce really cost forty thousand zloty?",
        },
        {
          id: "dawid:bruce:opt-3",
          topicId: "dawid:bruce",
          text: "Can we take Bruce down for the photoshoot?",
        },
        {
          id: "dawid:bruce:opt-4",
          topicId: "dawid:bruce",
          text: "A client thought we do security because of Bruce?",
        },
        {
          id: "dawid:bruce:opt-5",
          topicId: "dawid:bruce",
          text: "Who named him Bruce?",
        },
        {
          id: "dawid:bruce:opt-6",
          topicId: "dawid:bruce",
          text: "What happens to Bruce if the company is sold?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:bruce:rep-1",
          text: "Brand agency, forty thousand zloty, 'a bold brand anchor'. They delivered, literally, a bat. Then a client assumed we do security and doubled the contract. Now removing him costs more than keeping him. That is not decor. That is equity with wings.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:bruce:rep-2",
          text: "Forty thousand, installed, with a certificate of authenticity for the BAT. The certificate lives in the same folder as the office plans. Some days I read it for calm. A company that can afford a certified bat is a company that will survive the quarter.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:bruce:rep-3",
          text: "The movers refuse to touch him, and I refuse to move him twice — once was a test and the test failed. We shoot AROUND Bruce. Klaudia filmed in front of him and the post did numbers no product announcement ever has. Bruce is content. Bruce has always been content.",
          relationshipHint: "annoyed",
          tags: ["period:lunch"],
        },
        {
          id: "dawid:bruce:rep-4",
          text: "Doubled it. Read the room, saw a bat, decided we are the kind of company that takes security seriously, and did not ask one follow-up question. That is the entire secret of this economy, and it has wings.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:bruce:rep-5",
          text: "The invoice. It said 'Batman wall feature' and the previous founder said 'like the city?' and the agency said 'exactly'. By the time anyone suggested 'Bob', the invoice was paid, and paid invoices are canon. Bruce he is, Bruce he stays.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:bruce:rep-6",
          text: "Bruce conveys with the building. It is in the lease fine print, one line, my favorite line. Whoever buys this company inherits a certified bat, and honestly, that is a legacy I can stand behind. Companies are bought for their graphs. They are REMEMBERED for their bats.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:suit",
      label: "The navy suit doctrine",
      optionCandidates: [
        {
          id: "dawid:suit:opt-1",
          topicId: "dawid:suit",
          text: "Is the navy suit a uniform or just one good suit?",
        },
        {
          id: "dawid:suit:opt-2",
          topicId: "dawid:suit",
          text: "You wore grey once. The office noticed.",
        },
        {
          id: "dawid:suit:opt-3",
          topicId: "dawid:suit",
          text: "Zosia had the suit dry-cleaned. Secretly?",
        },
        {
          id: "dawid:suit:opt-4",
          topicId: "dawid:suit",
          text: "Clients meet the suit before they meet you.",
        },
        {
          id: "dawid:suit:opt-5",
          topicId: "dawid:suit",
          text: "What happens when the suit finally wears out?",
        },
        {
          id: "dawid:suit:opt-6",
          topicId: "dawid:suit",
          text: "Did the suit close a deal by itself?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:suit:rep-1",
          text: "One good suit is a DECISION you make once so you can spend your decisions on the company. Mark Zuckerberg has the t-shirt; I have the navy; the office has the printer. Uniforms are not vanity, they are ARCHITECTURE — they hold a shape so the person inside can move. I bought two, one rests while the other works, and neither has ever been late. The suit has better…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:suit:rep-2",
          text: "The grey was a test — of the office, not the suit. One Thursday in grey and by eleven I had three questions, two jokes, and one written inquiry about whether I was 'okay', which in company terms means the culture is WATCHING, and a watched culture is a healthy one. The grey is retired. The navy returned. The experiment cost me a morning of explanations and bought me…",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:suit:rep-3",
          text: "Not secretly at all — she INVOICED it, quarterly, as 'executive presentation maintenance', and the invoice is the only one in this company I have never queried. The suit holds the graph together. If the man who points at the graph looks like the graph is down, the graph is down. Grazyna understood before I said a word. She understands most things before the words arrive.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:suit:rep-4",
          text: "Of course, and I let them. The suit does the first five minutes so I can spend mine listening. A client meets the suit and relaxes — the shape says 'bank, lawyer, adult' — and a relaxed client tells you the truth by minute six. The suit is not armor. The suit is a CONCESSION to the animal brain so the conversation can start at the human one. I have closed deals in a…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:suit:rep-5",
          text: "The tailor has instructions older than some employees: when the navy can no longer be repaired, he builds the successor on the same pattern, and the pattern lives in his drawer like a constitution. I will never wear a different cut. Companies change logos; the CEO does not change shoulders. The current navy is nine years old and has outlasted two board members. When…",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:suit:rep-6",
          text: "By itself, once — a client watched the whole pitch, said nothing, shook my hand, and signed. Six months later he admitted the deal closed 'somewhere between the handshake and the sleeve', because the sleeve was TELLING him something the slides did not. The suit is forty percent of my close rate and I am at peace with that arithmetic. Charisma is a costume that fits. I…",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "dawid:board-asks",
      label: "What the board asks",
      optionCandidates: [
        {
          id: "dawid:board-asks:opt-1",
          topicId: "dawid:board-asks",
          text: "What does the board actually ask you for?",
        },
        {
          id: "dawid:board-asks:opt-2",
          topicId: "dawid:board-asks",
          text: "The chairman wants 'a real AI strategy'.",
        },
        {
          id: "dawid:board-asks:opt-3",
          topicId: "dawid:board-asks",
          text: "Maciek's black slide survived the board again?",
        },
        {
          id: "dawid:board-asks:opt-4",
          topicId: "dawid:board-asks",
          text: "A board member visited the office. Unannounced.",
        },
        {
          id: "dawid:board-asks:opt-5",
          topicId: "dawid:board-asks",
          text: "They asked about the printer's asset value.",
        },
        {
          id: "dawid:board-asks:opt-6",
          topicId: "dawid:board-asks",
          text: "What question can no board ever answer?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:board-asks:rep-1",
          text: "Three things, always the same three: is the graph up, is anyone suing, and do we have a person for the thing that is coming. Everything else is DELIVERY STYLE. The board is not a brain, it is a heartbeat — four times a year it checks the pulse and asks the future to prove it is coming. My job is to be the pulse they trust and the future they can picture. Picture is…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:board-asks:rep-2",
          text: "Then the chairman gets 'a real AI strategy', which is a document with our name on it that says exactly what Maciek's black slide says, in forty pages he can hold. The chairman does not want AI. The chairman wants to say the word AI at HIS board with a document in his hand. I understand because I do the same thing one level down. The entire economy is people handing…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:board-asks:rep-3",
          text: "The black slide survived like it always does — the room nodded, the chairman underlined something, and one new board member asked what the slide MEANT, which is the moment the slide earns its keep. Silence while the room explains it to itself. Maciek presented it as if he had rehearsed the silence, which he had. That slide is the most successful document in this company…",
          relationshipHint: "delighted",
          tags: ["quest:maciek-briefed-you"],
        },
        {
          id: "dawid:board-asks:rep-4",
          text: "Unannounced visits are the board's way of testing the floor, and the floor passed with a distinction: the visitor watched Tomek recover a hotfix, Burek audit a standup, and Renata route a courier crisis without a single person performing for the guest. He reported back 'the company is real'. That phrase is worth more than any deck I have ever presented. You cannot…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:board-asks:rep-5",
          text: "The printer's asset value came up because the board reads everything and Grazyna's footnote is WRITTEN WELL — 'depreciating monument, fully amortized, carried at narrative value'. The room laughed for the first time in three years. The line item survived, the footnote is now quoted, and the printer has board-level protection. You cannot put a price on culture, but you…",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:board-asks:rep-6",
          text: "'When did you know?' — they can never answer when they knew, because knowing is not a moment, it is a slope. I ask it once a year, every year, and every year the room does the same thing: the eyes go up-left, the hands fold, and someone says 'you just know'. That answer is true and useless, which is the board's native genre. I keep asking. The question costs nothing and…",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:competitors",
      label: "The competitor problem",
      optionCandidates: [
        {
          id: "dawid:competitors:opt-1",
          topicId: "dawid:competitors",
          text: "A competitor copied our website. Word for word?",
        },
        {
          id: "dawid:competitors:opt-2",
          topicId: "dawid:competitors",
          text: "They hired away our best trainer. Response?",
        },
        {
          id: "dawid:competitors:opt-3",
          topicId: "dawid:competitors",
          text: "They undercut us by thirty percent.",
        },
        {
          id: "dawid:competitors:opt-4",
          topicId: "dawid:competitors",
          text: "They got the Batman too. A smaller one?",
        },
        {
          id: "dawid:competitors:opt-5",
          topicId: "dawid:competitors",
          text: "Do you ever talk to the competitor CEOs?",
        },
        {
          id: "dawid:competitors:opt-6",
          topicId: "dawid:competitors",
          text: "Which competitor scares you? Honestly.",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:competitors:rep-1",
          text: "Word for word, including the typo, which is the best news a company can receive. The typo proves origin, the theft proves relevance, and the typo is now our CANARY — when they fix it, they are reading closely, and when they copy the fix, we know their release cycle. I sent them a correction with a smiley face. The smiley face is legal. The typo is still theirs.…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:competitors:rep-2",
          text: "The response is a card, a genuine one, and a standing job offer that never expires. Poaching is a market signal — it means we TRAIN well enough to be worth stealing from. The trainers who leave take a syllabus; the ones who stay take a CULTURE, and culture does not fit in a handover doc. Renata's roster, Marek's perimeter, the dog's audit — the person left, the…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:competitors:rep-3",
          text: "Undercutting by thirty percent means their product costs thirty percent less to believe in, and I say that with love, because I have been cheap. Cheap is a strategy for companies still deciding what they are. We decided: we are the ones where nobody dies in a meeting and the graph goes up and the dog audits standup. That costs what it costs. The thirty percent is not…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:competitors:rep-4",
          text: "They bought a smaller bat and it hangs in their lobby at a height that says 'we saw the idea but not the commitment'. Forty thousand bought Bruce; eight thousand bought the FOOTNOTE. Clients walk in, see the small bat, and ask what it references — and I get to say 'the original is forty thousand and certified'. The competitor's bat is an advertisement for ours, installed…",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:competitors:rep-5",
          text: "Twice a year, at an industry thing, over the bad coffee, and we tell each other the truth because neither of us can act on most of it. He says 'the market is shrinking', I say 'the market is pricing', and we both go home and work harder. The wars are for the sales teams and the decks. At the CEO level it is two tired people agreeing that talent is scarce, clients…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:competitors:rep-6",
          text: "Not the copyist and not the discounter — the one that does not exist yet: the training company that treats AI the way we treat printers, as LORE, and the trainers as family, and charges half while meaning every word. That company is coming because every market births its honest rebel eventually. I cannot compete with sincere. Nobody can. All I can do is become…",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "dawid:investors",
      label: "The investor updates",
      optionCandidates: [
        {
          id: "dawid:investors:opt-1",
          topicId: "dawid:investors",
          text: "The monthly investor email — what is actually in it?",
        },
        {
          id: "dawid:investors:opt-2",
          topicId: "dawid:investors",
          text: "An investor asked about our exit plan. At dinner.",
        },
        {
          id: "dawid:investors:opt-3",
          topicId: "dawid:investors",
          text: "The one who wants a board seat. That guy.",
        },
        {
          id: "dawid:investors:opt-4",
          topicId: "dawid:investors",
          text: "You sent an update late once. Fallout?",
        },
        {
          id: "dawid:investors:opt-5",
          topicId: "dawid:investors",
          text: "Do investors read about Burek?",
        },
        {
          id: "dawid:investors:opt-6",
          topicId: "dawid:investors",
          text: "What makes an investor actually useful?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:investors:rep-1",
          text: "Three numbers, one lesson, one ask. The numbers are revenue, burn, and the graph — always in that order, because investors read top-down and the graph must be the last thing they see before their coffee. The lesson is one honest sentence about what we learned, because investors can smell a month with no learning and it makes them ITCHY. The ask is never money. The ask is…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:investors:rep-2",
          text: "Exit questions over dinner are tests of TEMPERS, not term sheets. He wanted to see if I flinch — the flinch tells him whether he owns the company's soul or just shares of it. I said 'the exit exists, it is called every morning, and the company exits into being a company again at 9am daily'. He laughed for a long time and invested more the following quarter. The flinch…",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:investors:rep-3",
          text: "The board seat guy — every portfolio has one. He wants the seat for the LOBBY, and I mean that literally: the last photo on his site has him in front of our glass wall, Bruce blurred behind him, captioned 'portfolio company'. He gets updates and coffee and never the seat, because the seat is a steering wheel and he wants a SOUVENIR. The polite no is a skill and I have…",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:investors:rep-4",
          text: "Late once, in 2021, by four days — the month the server room flooded and the office was literally mopping. The update went out with a photo of the water line and a sentence I am proud of: 'the graph dipped, the office did not'. Every investor replied. Three wired the next round early. One printed the photo. The lesson reshaped my entire communication doctrine: investors…",
          relationshipHint: "pleased",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "dawid:investors:rep-5",
          text: "They read about Burek more closely than the revenue, and I know because of the reply rate — the months with a dog sentence get answered by evening, the months without get answered by Thursday. The dog is not in the update for charm. The dog is in the update as EVIDENCE that the company is a place humans want to work, which is the asset under every line of the cap table.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:investors:rep-6",
          text: "A useful investor has seen their own graph go DOWN and lived — because the useful skill is not capital, it is CALIBRATION. The ones who have only known up advise like the weather from inside a house: confident, wrong, warm. The ones who have eaten a flat year ask about drains, about key people, about what happens when the printer of the business stops printing. I keep…",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:walk-route",
      label: "The walking one-on-one route",
      optionCandidates: [
        {
          id: "dawid:walk-route:opt-1",
          topicId: "dawid:walk-route",
          text: "The route past Burek — is the dog stop mandatory?",
        },
        {
          id: "dawid:walk-route:opt-2",
          topicId: "dawid:walk-route",
          text: "You always end at the window. Why there?",
        },
        {
          id: "dawid:walk-route:opt-3",
          topicId: "dawid:walk-route",
          text: "Rainy days ruin the walking one-on-ones?",
        },
        {
          id: "dawid:walk-route:opt-4",
          topicId: "dawid:walk-route",
          text: "Who walks fastest, you or Marek?",
        },
        {
          id: "dawid:walk-route:opt-5",
          topicId: "dawid:walk-route",
          text: "The route passes marketing. Ania waves?",
        },
        {
          id: "dawid:walk-route:opt-6",
          topicId: "dawid:walk-route",
          text: "Has a walking one-on-one ever ended badly?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:walk-route:rep-1",
          text: "Mandatory, and it is the most productive thirty seconds of the whole walk. Burek receives each walker with the same audit — one look, one exhale, a verdict — and I have learned to watch the employee WATCH the verdict. Their face tells me what kind of one-on-one this will be before a word is spoken. Relaxed by the dog: good news incoming. Nervous of the dog: we…",
          relationshipHint: "pleased",
          tags: ["quest:burek-standup-observed"],
        },
        {
          id: "dawid:walk-route:rep-2",
          text: "The window at the end of the corridor has the city's best free KPI: cranes. When cranes are moving, the economy builds, and when the economy builds, training budgets survive. I end every walk there, point at the cranes, and say 'that is the market. Ours is the graph. Both go up if we do the work.' Is it theater? It is THEATER WITH A VIEW. Zosia calls the window…",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:walk-route:rep-3",
          text: "Rain routes the walk INDOORS and the indoor version is better, which I will admit to no one who books meetings. The indoor circuit — lobby, corridor, past the server rack, around Bruce — has echoes, and echoes make people speak SOFTER, and soft talk is where the true sentences live. Some of my best one-on-ones happened under the ceiling in a downpour. The rain is…",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:walk-route:rep-4",
          text: "Marek, and it is not close — the man walks like the floor owes him money. I once attempted his pace to make a point about urgency and pulled something that reduced my board energy for a week. Now he walks, I follow, and the conversation happens at HIS rhythm, which turns out to be the exact rhythm of his infrastructure: steady, slightly faster than comfortable,…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:walk-route:rep-5",
          text: "Ania waves like she is in a parade, every time, and twice the wave became content — 'CEO walking meeting' did numbers and now investors mention the wave. I have decided the wave is strategy: it says the corner office walks THROUGH the office, not above it, and the video proves it better than any values poster. The wave stays. If she ever films it from behind Bruce I…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:walk-route:rep-6",
          text: "Once, and I still think about it. I gave a walking one-on-one to a man I was about to let go, and the route took us past the coffee machine, past Bruce, past the window with the cranes, and he said at the window: 'you practice this speech'. I said yes. We finished the lap in silence, which is the correct speed for grief, and he trained his replacement brilliantly for…",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "dawid:acquisition",
      label: "The offer he declined",
      optionCandidates: [
        {
          id: "dawid:acquisition:opt-1",
          topicId: "dawid:acquisition",
          text: "You turned down an acquisition. The number was real?",
        },
        {
          id: "dawid:acquisition:opt-2",
          topicId: "dawid:acquisition",
          text: "What would the buyers have done to the office?",
        },
        {
          id: "dawid:acquisition:opt-3",
          topicId: "dawid:acquisition",
          text: "Grazyna's model said yes. You said no.",
        },
        {
          id: "dawid:acquisition:opt-4",
          topicId: "dawid:acquisition",
          text: "Did you tell the team about the offer?",
        },
        {
          id: "dawid:acquisition:opt-5",
          topicId: "dawid:acquisition",
          text: "Would you sell if the graph went down for real?",
        },
        {
          id: "dawid:acquisition:opt-6",
          topicId: "dawid:acquisition",
          text: "What did the acquirer remember about us, after?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:acquisition:rep-1",
          text: "The number was real, verified, and correct — which is exactly why I had to hear the whole pitch before declining. A bad offer is easy to refuse; a CORRECT offer tests the founder's soul, and mine answered before I did. The number bought the company. It did not buy the Tuesday where the dog audits standup, the morning where the coffee works, the graph that goes up…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:acquisition:rep-2",
          text: "The deck said 'synergies', which means the first thing to go would be the second budget, then the weird, then the dog's standup, then the rituals that make the graph honest. Acquirers buy the machine and melt the SOUL for parts — I have watched it happen to two friendly companies, and the employees they kept describe the after as 'efficient'. Efficient is what a building…",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:acquisition:rep-3",
          text: "Grazyna's model said yes with a confidence interval so wide it could park a bus in it, and she said something I keep in the drawer with the offer: 'the model is correct. The model has never had to drink the coffee.' That sentence is the whole difference between valuation and value, and she SAW IT, the most numbers person in the building. We declined together. The…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:acquisition:rep-4",
          text: "I told them everything, at the all-hands, including the number — because a secret salary-sized fact curdles an office faster than any failure. I said: an offer came, it was real, I said no, and here is why in three sentences. Then I asked if anyone would have wanted me to say yes, and Janusz, who speaks eleven words a quarter, said 'the drains are not in their plan'.…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:acquisition:rep-5",
          text: "If the graph went down for REAL — not a dip, not a pivot, a genuine structural drop — then the suit and I would have the conversation I have rehearsed exactly once, at night, where it belongs. Selling is not defeat; letting twenty people's salaries drown for my pride is. I would sell to SAVE the people, and the buyer would get a broken graph and a working culture, and…",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:acquisition:rep-6",
          text: "They remember the bat and the coffee protocol, in that order, and I know because the acquiring CEO referenced both at a conference a year later. 'You are the bat people with the good coffee ritual.' That is the ENTIRE brand reduced to two data points an outsider carried for a year. The graph did not make his speech. The bat and the coffee did. Marketing spends…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "dawid:founding",
      label: "The founding story",
      optionCandidates: [
        {
          id: "dawid:founding:opt-1",
          topicId: "dawid:founding",
          text: "What was the company's first ever invoice?",
        },
        {
          id: "dawid:founding:opt-2",
          topicId: "dawid:founding",
          text: "Was there a garage? There is always a garage.",
        },
        {
          id: "dawid:founding:opt-3",
          topicId: "dawid:founding",
          text: "The first employee who was not you. Who?",
        },
        {
          id: "dawid:founding:opt-4",
          topicId: "dawid:founding",
          text: "Did you almost quit in year one?",
        },
        {
          id: "dawid:founding:opt-5",
          topicId: "dawid:founding",
          text: "What did the company teach first, actually?",
        },
        {
          id: "dawid:founding:opt-6",
          topicId: "dawid:founding",
          text: "If you started again today, what changes?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:founding:rep-1",
          text: "Invoice zero-zero-one: one Excel workshop, two hundred zloty, for a bakery that wanted 'the formulas to stop breaking'. The bakery still exists, the baker's daughter now runs it, and she sends us a cake every year on the anniversary. The first invoice is framed in my office next to Bruce, and guests always ask which is worth more. The cake company. The cake company…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:founding:rep-2",
          text: "A kitchen, which is humbler than a garage and truer to the industry — the garage myth is American and the kitchen myth is ours. The first two trainings ran at the kitchen table, Grazyna's kitchen table, and the fee was split in thirds before there were three people to split it among. The third third stayed in an envelope marked 'future'. The envelope is still sealed. It…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:founding:rep-3",
          text: "Renata. Before the title, before the desk, there was a woman who organized my calendar as a favor and organized my LIFE by accident. I offered equity; she asked for a door key and a plant instead. The key opened the office. The plant became the fleet's first patient. Every system this company runs on started as Renata solving a problem I had not noticed yet. The org…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:founding:rep-4",
          text: "Month seven. One client paid late, the second withdrew, and I sat in the empty office doing the math on a whiteboard that is still there, under a coat of respect and one coat of paint. The math said four weeks. What saved it was the printer printing one page by itself that week — 'OK' — and I laughed at the absurdity of encouragement from a dying machine, and un-quit…",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:founding:rep-5",
          text: "Excel, but badly — I taught the tool and not the fear, and the first class left more frightened of spreadsheets than when they arrived. The second class I taught the fear instead: what breaks, what it costs, what to press. The evaluations tripled. That pivot IS the company method — every course since has been fear first, tool second, and it is why our graduates actually…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:founding:rep-6",
          text: "Nothing structural — the shape is right, the rituals are load-bearing, and the dog was the best hire I never made. What I would change is the SPEED of the first trust. I spent two years checking everything because nobody had ever trusted me with anything, and the office ran fine for the one week I was sick. Two years of unnecessary checking, learned from a fever. If…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "dawid:succession",
      label: "The succession question",
      optionCandidates: [
        {
          id: "dawid:succession:opt-1",
          topicId: "dawid:succession",
          text: "Who could ever replace you? Honestly.",
        },
        {
          id: "dawid:succession:opt-2",
          topicId: "dawid:succession",
          text: "Maciek for CEO? He has the vision part.",
        },
        {
          id: "dawid:succession:opt-3",
          topicId: "dawid:succession",
          text: "Zosia runs more than you do. Why not her?",
        },
        {
          id: "dawid:succession:opt-4",
          topicId: "dawid:succession",
          text: "What does the CEO actually do that cannot transfer?",
        },
        {
          id: "dawid:succession:opt-5",
          topicId: "dawid:succession",
          text: "Have you written the succession memo?",
        },
        {
          id: "dawid:succession:opt-6",
          topicId: "dawid:succession",
          text: "What is the last thing you would let go of?",
        },
      ],
      replyCandidates: [
        {
          id: "dawid:succession:rep-1",
          text: "Nobody, temporarily, and then anyone — that is the honest succession curve. The first three months after me would be chaos shaped like a suit, and then the office would discover what I discovered in week one: the company runs on a clipboard, a roster, and eleven weird rituals, none of which require my face. The face does the narrating. The company IS the narrator's job,…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:succession:rep-2",
          text: "Maciek is the obvious answer, which is why it is wrong — the vision part is the EASY part, replaceable by a slide and a good afternoon. What Maciek lacks is the appetite for tedium, and a CEO is ninety percent tedium with vision sprinkled on for morale. He would last one budget season before the glass wall became a cage. He is a magnificent CTO and a future…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:succession:rep-3",
          text: "Because Zosia is already the CEO of everything that matters and the title would be a DEMOTION wearing better fabric. She runs people, calendar, culture, and the rumor economy — I run the graph and the suit. Give her the title and she inherits MY tedium while losing none of hers, and the company would gain a word and lose a manager. The smartest succession move is the…",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:succession:rep-4",
          text: "Three things: I remember which investor panics at which number, I know which client's contract is really about the divorce, and I can point at Bruce without laughing. The first two are MEMORY, transferable to a successor with two years of shadowing. The third is DIGNITY, transferable to no one, and it matters more than it should because the bat is load-bearing and so is…",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:succession:rep-5",
          text: "Written, sealed, and updated every year on the anniversary of the printer's retirement, which is as good a calendar anchor as any. The memo names nothing — it names a PROCESS: the office runs ninety days without me as the trial, the clipboard transfers to whoever Renata names, and the graph belongs to whoever kept it honest. The lawyers want names. The memo refuses.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:succession:rep-6",
          text: "The morning walk. Not the title, not the parking spot, not even Bruce — the ten minutes where I walk the floor before anyone arrives and the building belongs to the machines and the dog. Every CEO ritual I have is a variation of that walk: seeing the company asleep, untouched, surviving. Whoever succeeds me inherits a company. I would be leaving behind the only ten…",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "dawid:task-one-pager",
      title: "The one-pager",
      description: "One page for the CEO: what you would teach, to whom, and what the graph does afterward. If the page is good, it goes to the board as a workshop proposal, and momentum does the rest. One page, not two — the second page is where ideas go to wobble.",
      flagToSet: "dawid-graph-memo",
      rewardHint: "+Dawid remembers who does the homework",
    },
  ],
};

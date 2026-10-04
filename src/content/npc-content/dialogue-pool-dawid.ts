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
    {
      id: "dawid:silence",
      label: "The strategic silence",
      optionCandidates: [
        { id: "dawid:silence:opt-1", topicId: "dawid:silence", text: "You pause five seconds before answering. Why?" },
        { id: "dawid:silence:opt-2", topicId: "dawid:silence", text: "Silence in meetings — tactic or digestion?" },
        { id: "dawid:silence:opt-3", topicId: "dawid:silence", text: "I filled your silence with a discount. Lesson?" },
        { id: "dawid:silence:opt-4", topicId: "dawid:silence", text: "Does silence ever mean you disagree?" },
        { id: "dawid:silence:opt-5", topicId: "dawid:silence", text: "Trainees say you listen with your eyebrows." },
        { id: "dawid:silence:opt-6", topicId: "dawid:silence", text: "Could the office function if you never spoke?" },
      ],
      replyCandidates: [
        {
          id: "dawid:silence:rep-1",
          text: "Five seconds is the distance between hearing and understanding. Most people answer from the first half. I answer from both. The pause also tells me who is afraid of it — the room reveals itself in silence the way a floor reveals itself under weight. Five seconds is an audit. It is free. I run it daily.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:silence:rep-2",
          text: "Both. Digestion is the personal half. The tactic is that silence transfers the floor — someone will fill it, and what they fill it with is the real agenda. I learned this from a chairman who never spoke first. Twenty years of meetings and the pattern holds: the silence speaks, and everyone else transcribes.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:silence:rep-3",
          text: "Then you learned the lesson at tuition rates most people pay for years. The discount is yours to keep — it was your anxiety, not my ask. Next time, let the five seconds sit. Whatever you offer into silence becomes the new baseline. The silence is a ratchet. I did not invent it. I merely refuse to defeat it.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:silence:rep-4",
          text: "Disagreement is silence with weight. I disagree out loud exactly once per quarter, on the thing that matters. The rest of my disagreements are pauses of different lengths — two seconds means 'noted', five means 'wrong', and ten means withdraw the proposal before I name it. The office has learned the scale.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:silence:rep-5",
          text: "Accurate. The eyebrows carry the meeting so the mouth can carry the quarter. A raised brow is a question, a furrow is a veto, and the slow blink is 'we will revisit this in the next quarter'. The team has achieved full literacy. I could run this office in charades and the numbers would not notice for a month.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:silence:rep-6",
          text: "It has, for three days, twice a year. The silent operation is a test of the systems, and the systems pass, which is the point. The company should run on documents, defaults, and good hires — not on the founder's voice. My silence is the loudest thing I have ever built. It took ten years and it says everything.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "dawid:migration",
      label: "The great migration",
      optionCandidates: [
        { id: "dawid:migration:opt-1", topicId: "dawid:migration", text: "The big migration — when does it actually start?" },
        { id: "dawid:migration:opt-2", topicId: "dawid:migration", text: "Why migrate if the old system still works?" },
        { id: "dawid:migration:opt-3", topicId: "dawid:migration", text: "The migration plan is one page. Confidence?" },
        { id: "dawid:migration:opt-4", topicId: "dawid:migration", text: "What breaks first in every migration?" },
        { id: "dawid:migration:opt-5", topicId: "dawid:migration", text: "Marek says the migration is 'a mood'. Fair?" },
        { id: "dawid:migration:opt-6", topicId: "dawid:migration", text: "How will you know the migration succeeded?" },
      ],
      replyCandidates: [
        {
          id: "dawid:migration:rep-1",
          text: "When two things are true: the new system survives a fire drill, and the old system has become the thing we apologize for. Neither is true yet, which is why the start date is a quarter with no name. Migrations do not fail on technology. They fail on STARTING. The one-page plan exists so that starting is small.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:migration:rep-2",
          text: "Because 'still works' is a status, not a destination — the old system works the way a bridge works with one lane closed: technically, and at a cost nobody invoices. Every year we keep it, the migration gets harder and the apology gets longer. The graph says migrate. The graph has never once been sentimental.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:migration:rep-3",
          text: "One page is the confidence. A thick migration plan is a diary of fears; a one-page plan is a list of promises with owners. Mine has four lines: sequence, rollback, owner, date. Everything else is discovered, and discovery is what the team is FOR. I have seen forty-page plans. They migrate beautifully. In the plan.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:migration:rep-4",
          text: "The org chart. Every migration breaks the same thing first: the informal knowledge of who to ask. The tool moves in a weekend; the folklore takes a quarter. My whole preparation is documentation with pensions — write the folklore down before the move, pay the writers well, and the migration is a formality.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:migration:rep-5",
          text: "Fair, and partially intended. Migrations are moods before they are projects — the mood is 'we deserve better', and without the mood nothing moves. Marek's job is to distrust the mood with load tests. My job is to keep the mood alive until his tests pass. Between us, the truth gets built. It is a two-man engine.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:migration:rep-6",
          text: "Nobody notices. The success metric of a migration is a Tuesday where nothing is mentioned — no nostalgia, no complaints, no war stories. I will consider it done when the new system gets its first genuinely boring outage. Boring is the sound of a migration that finished. I am waiting for the boredom. It will come.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "dawid:reading",
      label: "The reading list",
      optionCandidates: [
        { id: "dawid:reading:opt-1", topicId: "dawid:reading", text: "You read one book a week. Retention or ritual?" },
        { id: "dawid:reading:opt-2", topicId: "dawid:reading", text: "What are you reading right now? Be specific." },
        { id: "dawid:reading:opt-3", topicId: "dawid:reading", text: "Business books or fiction? Your shelf is mixed." },
        { id: "dawid:reading:opt-4", topicId: "dawid:reading", text: "Do you recommend books to the team? Or assign?" },
        { id: "dawid:reading:opt-5", topicId: "dawid:reading", text: "The reading list is public. Intimidation?" },
        { id: "dawid:reading:opt-6", topicId: "dawid:reading", text: "Which book changed how you run meetings?" },
      ],
      replyCandidates: [
        {
          id: "dawid:reading:rep-1",
          text: "Ritual, with light retention — I read in the same chair at the same hour, and the book matters less than the hour does. A page a night before sleep is the cheapest brain maintenance in existence. Some books stay. Most are scaffolding. The habit is the asset. The habit has run for twenty years.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:reading:rep-2",
          text: "A history of the Suez Canal, for the second time. It is a book about one man's bet that a ditch could change the trade winds of the world — every chapter is a stakeholder meeting I have attended in another costume. Business books describe the present. History describes it in costume. Costume teaches better.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:reading:rep-3",
          text: "Mixed on purpose. Fiction is where I practice empathy at scale — a novel is a hundred hours inside someone else's balance sheet. Business books give frameworks. Fiction gives the reason the frameworks keep failing: people. I alternate. One for the machine, one for the machine's operators.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:reading:rep-4",
          text: "Recommend, never assign — assigned books die unread on desks and breed resentment. A recommendation carries no homework; it travels by curiosity. I leave books on the shelf by the coffee with a sticky note that says one word: 'chapter four'. Those who read it come back changed. The rest were never my audience.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:reading:rep-5",
          text: "It is transparency, not intimidation — the list is how I think in public, and reading my list tells you my fears six months early. The canal phase means I am worried about infrastructure bets. The biography phase means succession is on my mind. The list is a mood ring with footnotes. I update it. I mean it.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:reading:rep-6",
          text: "A book about parliamentary procedure, of all things — it taught me that a meeting is a machine for converting disagreement into decisions, and most meetings skip the second half. Now every meeting I chair ends with 'decision, owner, date', said out loud. Three words. The book gets the credit. The meetings get the exit.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "dawid:chair",
      label: "The chair question",
      optionCandidates: [
        { id: "dawid:chair:opt-1", topicId: "dawid:chair", text: "Your chair is fifteen years old. Sentiment or spine?" },
        { id: "dawid:chair:opt-2", topicId: "dawid:chair", text: "You stand for board calls. Why the change?" },
        { id: "dawid:chair:opt-3", topicId: "dawid:chair", text: "The office chairs — renew or endure?" },
        { id: "dawid:chair:opt-4", topicId: "dawid:chair", text: "Is there a chair hierarchy here? Be honest." },
        { id: "dawid:chair:opt-5", topicId: "dawid:chair", text: "Marek brought his own chair from home. Respect?" },
        { id: "dawid:chair:opt-6", topicId: "dawid:chair", text: "What does a chair say about a company?" },
      ],
      replyCandidates: [
        {
          id: "dawid:chair:rep-1",
          text: "Both. The chair is broken in exactly the places my spine prefers, which took two years of negotiation and has held for thirteen. Replacing it is a week of adjustment I decline annually. Grazyna has offered. The chair declines. Some equipment becomes a limb. The invoices stopped calling it an asset in 2015.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:chair:rep-2",
          text: "Standing keeps the board call at forty minutes — the body has opinions about sitting through a second agenda. I learned it from a general who reviewed troops standing. Decisions take the shape of the posture. Sitting says 'discuss'. Standing says 'decide'. The board gets the version of me that decides.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:chair:rep-3",
          text: "Endure, repair, and replace in secret — there is a standing order: when a chair dies, it is replaced overnight with the same model. Nobody grieves, nobody adjusts, nobody files a ticket. The chair fleet operates like a submarine service. Continuity without ceremony. The budget line is two lines long.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:chair:rep-4",
          text: "There is a hierarchy and it is light-based, not title-based — the window chairs belong to whoever's eyes suffer most, and the assignment changes with the season. I sit with my back to the window on principle. The CEO who takes the worst chair daily has ended every chair argument for a decade. A cheap, brilliant war.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:chair:rep-5",
          text: "Respect. The man audited every office chair, found them wanting, and imported his own — that is not diva behavior, that is infrastructure thinking. His chair has survived two floods and one rebrand. I have considered putting it in the org chart. Marek sits in Marek's chair. The company sits in continuity.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:chair:rep-6",
          text: "Whether it expects people to stay. Startups buy stools — light, cheap, mobile. Institutions buy chairs that outlive their occupants. This office buys the second kind now, deliberately. The day we buy stools again is the day we start over, and I would rather repair the chairs and the culture than replace either.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:whiteboard",
      label: "The whiteboard",
      optionCandidates: [
        { id: "dawid:whiteboard:opt-1", topicId: "dawid:whiteboard", text: "The whiteboard has not been erased since March." },
        { id: "dawid:whiteboard:opt-2", topicId: "dawid:whiteboard", text: "What is actually on it right now?" },
        { id: "dawid:whiteboard:opt-3", topicId: "dawid:whiteboard", text: "May I add something to the whiteboard?" },
        { id: "dawid:whiteboard:opt-4", topicId: "dawid:whiteboard", text: "It is a photo in the onboarding deck. Know?" },
        { id: "dawid:whiteboard:opt-5", topicId: "dawid:whiteboard", text: "Digital boards exist. Defend the wall." },
        { id: "dawid:whiteboard:opt-6", topicId: "dawid:whiteboard", text: "What happens when the board runs out of space?" },
      ],
      replyCandidates: [
        {
          id: "dawid:whiteboard:rep-1",
          text: "Because erasing is a decision and March's decision is still correct. The board is a standing hypothesis: as long as nobody has proven it wrong, it stays. Some companies run on roadmaps. This corner runs on one board that refuses to lie. When it is finally wrong, the erasing will feel like a funeral. None is scheduled.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:whiteboard:rep-2",
          text: "Three words, one arrow, and a question mark. The words are the strategy. The arrow is the sequence. The question mark is the part the market has not answered yet — I keep the question visible so nobody mistakes the plan for prophecy. The question mark is the most honest mark on the wall. It earns its ink.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:whiteboard:rep-3",
          text: "Ask first, in writing, on the board itself — there is a column for petitions. If your idea survives two weeks without anyone crossing it out, it has passed the office's test and moves to the main board. The whiteboard is a meritocracy with an entrance exam. The exam is other people's silence.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:whiteboard:rep-4",
          text: "I know, and the photo is out of date, which the deck's authors will discover when they compare it to the wall. The board changes; the PHOTO is a rumor. I have asked for the caption to say 'as of March'. Documentation that pretends to be current is worse than none. The board is current. The deck is folklore.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:whiteboard:rep-5",
          text: "The wall board is public, always-on, and impossible to secretly edit — a digital board has permissions, history, and deniability. The wall has none. Everyone sees the same truth at the same time, including me. The day strategy needs access controls, it has stopped being strategy. Digital can wait.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:whiteboard:rep-6",
          text: "Then it is full of decisions and we buy a second board and put them back to back, so the room has a past and a present facing each other. I have seen offices archive whiteboards digitally. I archive them by ADDING WALLS. The office grows one board per era. You can date any idea by which wall it lives on.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "dawid:decision-log",
      label: "The decision log",
      optionCandidates: [
        { id: "dawid:decision-log:opt-1", topicId: "dawid:decision-log", text: "Every decision gets one line in the log. Why?" },
        { id: "dawid:decision-log:opt-2", topicId: "dawid:decision-log", text: "What is the format of a decision line?" },
        { id: "dawid:decision-log:opt-3", topicId: "dawid:decision-log", text: "Can decisions be reopened once logged?" },
        { id: "dawid:decision-log:opt-4", topicId: "dawid:decision-log", text: "The log is public to the whole office. Risky?" },
        { id: "dawid:decision-log:opt-5", topicId: "dawid:decision-log", text: "The most expensive decision in the log?" },
        { id: "dawid:decision-log:opt-6", topicId: "dawid:decision-log", text: "You logged 'do nothing' once. Justify." },
      ],
      replyCandidates: [
        {
          id: "dawid:decision-log:rep-1",
          text: "Because a decision that is not written is a rumor with authority. The log costs thirty seconds per decision and saves quarters of archaeology — 'why did we do it this way' has an address instead of a memory. The log is the office's long-term memory. Brains are for the current quarter. The log is for the new hire in three years.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:decision-log:rep-2",
          text: "Date, decision, owner, and the option we declined. The declined option is the load-bearing part — six months later, when someone proposes the rejected path with fresh enthusiasm, the log shows them the grave, the date, and the reasons. Most meetings are people re-proposing logged options. The log is the anti-meeting.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:decision-log:rep-3",
          text: "Yes, with a ceremony: reopen in writing, log the reopening, and pay the reversal cost in one line. Decisions are not marriages. They are leases with renewal terms. The log does not judge reversals — it prices them. A reversal that cannot afford one honest line was not a decision. It was a mood in a suit.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:decision-log:rep-4",
          text: "The risk is the point. A public log means a junior can read why the office declined the acquisition — the real reasons, not the all-hands version. Some lines are uncomfortable. Discomfort is cheaper than mythology. The day the log needs a private layer is the day the office has two truths, and two truths rot.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:decision-log:rep-5",
          text: "The one that nearly sold the company — the full line includes the number, the counter-number, and Grazyna's confidence interval, which was wider than the offer. Reading it still raises my pulse. That is the log working as intended: expensive lessons stay expensive on paper so they stay cheap in practice.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:decision-log:rep-6",
          text: "Easily. 'Decision: do nothing. Owner: me. Declined option: panic.' The quarter before the flood anniversary, three vendors proposed three urgent rebuilds, and the correct move was patience. Doing nothing is a decision with a cost, a risk, and an owner. It is the rarest line in the log and the hardest to defend. I defend it annually.",
          relationshipHint: "pleased",
          tags: ["quest:janusz-told-the-flood", "relationship:warm"],
        },
      ],
    },
    {
      id: "dawid:oncall-creed",
      label: "The on-call creed",
      optionCandidates: [
        { id: "dawid:oncall-creed:opt-1", topicId: "dawid:oncall-creed", text: "You take night rotations with the team. Why?" },
        { id: "dawid:oncall-creed:opt-2", topicId: "dawid:oncall-creed", text: "The wall creed — 'the pager is a teacher'. Yours?" },
        { id: "dawid:oncall-creed:opt-3", topicId: "dawid:oncall-creed", text: "What did on-call teach you that meetings cannot?" },
        { id: "dawid:oncall-creed:opt-4", topicId: "dawid:oncall-creed", text: "Tomek slept through an alert. His defense?" },
        { id: "dawid:oncall-creed:opt-5", topicId: "dawid:oncall-creed", text: "Would you exempt the CEO from the rotation?" },
        { id: "dawid:oncall-creed:opt-6", topicId: "dawid:oncall-creed", text: "What does a final on-call week feel like?" },
      ],
      replyCandidates: [
        {
          id: "dawid:oncall-creed:rep-1",
          text: "Because the pager is the only meeting where the company tells the truth at three am. No slides, no agenda, no optics — just the system, its failures, and whoever showed up. A CEO who has never held the pager is a CEO who has read about the company. I hold it quarterly. My calendar holds itself.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:oncall-creed:rep-2",
          text: "Mine, and it is one sentence on purpose: 'the pager is a teacher, the alert is a lesson, and the postmortem is the tuition receipt.' Every rotation pays into the same education. The wall copy was Janusz's idea — he said the closet has a creed too, unwritten, and the pager deserved the same dignity.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:oncall-creed:rep-3",
          text: "The difference between urgency and importance. At three am everything is urgent and almost nothing is important — the skill is triage in pajamas. Meetings teach the opposite: everything feels important and nothing is urgent. A leader needs both lies and both truths. The pager keeps my truth calibrated.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:oncall-creed:rep-4",
          text: "His defense was 'the alert was noise and the graph agreed' — and he was RIGHT, which is worse than being wrong. We adjusted the thresholds that week. Sleeping through a false alert is a symptom, not a crime. The crime is tuning the alerts to protect sleep instead of signal. We tuned for signal. Tomek sleeps.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:oncall-creed:rep-5",
          text: "Exempting the CEO teaches the office that authority buys exemption, and exemption is how organizations learn to hide incidents from the top. I take the same rotation, the same phone, the same three am. The one concession: my rotation never lands on a board week. That is scheduling, not privilege. The pager does not know my title.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:oncall-creed:rep-6",
          text: "Quiet. The last rotation is the one where you finally do it right — fewer pages, cleaner handoffs, and one alert resolved before it wakes anyone. The senior on-call's reward is silence. I have watched three engineers finish their last rotation and smile at the phone like an old colleague. A good retirement.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "dawid:bats",
      label: "The bat merchandising",
      optionCandidates: [
        { id: "dawid:bats:opt-1", topicId: "dawid:bats", text: "The office accumulates bat merch. Sanctioned?" },
        { id: "dawid:bats:opt-2", topicId: "dawid:bats", text: "A client gifted a bat statue. Where does it go?" },
        { id: "dawid:bats:opt-3", topicId: "dawid:bats", text: "Is there a Batman line item in the budget? Truly?" },
        { id: "dawid:bats:opt-4", topicId: "dawid:bats", text: "Interns give bat gifts at every departure. Since?" },
        { id: "dawid:bats:opt-5", topicId: "dawid:bats", text: "Do you actually like bats? The animal." },
        { id: "dawid:bats:opt-6", topicId: "dawid:bats", text: "When does bat branding become a liability?" },
      ],
      replyCandidates: [
        {
          id: "dawid:bats:rep-1",
          text: "Tolerated, cataloged, and taxed — Klaudia keeps a registry, Grazyna assigns each item a value of one zloty, and the shelf acquires one item per month like a reef. I sanction nothing and forbid nothing. The bat merchandise is the office's folk art. Museums do not commission folk art. They provide the shelf.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:bats:rep-2",
          text: "The gift shelf, by height — it must never out-rank Bruce. The statue from the Warsaw client stands eleven centimeters tall, which is correct diplomacy: bats must observe the protocol of size. A client bat larger than OUR bat would be a statement. There is a rule and the rule has a ruler.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:bats:rep-3",
          text: "There is, and it is one zloty, line item 'brand heritage, miscellaneous', which Grazyna invented to stop ME from asking. The forty thousand was a one-time wound. The one zloty is a vaccine. Every year it renews, the auditors smile, and the bat costs nothing and anchors everything. Finance as folklore.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:bats:rep-4",
          text: "It started in 2021, with a felt bat, and it is now a tradition with rules: handmade, small, and one per person. The shelf is the archive of everyone who left. I know which intern gave which bat. It is the only farewell ceremony this office has never had to organize. The tradition organizes itself. Those are the best ones.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:bats:rep-5",
          text: "Genuinely — they are the only mammal that truly flies, they navigate by listening, and they keep the mosquito population of this city in balance. A company could do worse than a mascot that sees in the dark and eats problems. There is a bat house on the roof. Janusz approves of the pest control. The symmetry is intentional.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:bats:rep-6",
          text: "When a lawyer says the word 'trademark' in a sentence with ours in it, or when a client's child is frightened in the lobby — whichever comes first. So far the children adore it and the lawyers bill elsewhere. The day a bat costume at a conference outshines the product, I cap the merchandising. The bat serves the company.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:interview-loop",
      label: "The interview loop",
      optionCandidates: [
        { id: "dawid:interview-loop:opt-1", topicId: "dawid:interview-loop", text: "You redesigned the interview loop. Shorter. Why?" },
        { id: "dawid:interview-loop:opt-2", topicId: "dawid:interview-loop", text: "Four interviews was too many. Agreed?" },
        { id: "dawid:interview-loop:opt-3", topicId: "dawid:interview-loop", text: "The loop has no whiteboard coding. Brave?" },
        { id: "dawid:interview-loop:opt-4", topicId: "dawid:interview-loop", text: "Who says yes — the manager, HR, or you?" },
        { id: "dawid:interview-loop:opt-5", topicId: "dawid:interview-loop", text: "The loop rejects quietly. Feedback policy?" },
        { id: "dawid:interview-loop:opt-6", topicId: "dawid:interview-loop", text: "What does the loop optimize for? Honestly." },
      ],
      replyCandidates: [
        {
          id: "dawid:interview-loop:rep-1",
          text: "Because every extra round is a tax on the exact people we want — the good candidates have options and calendars, and a five-week loop is a rejection letter with a delay. We cut to two rounds and a working session. Time-to-offer dropped to nine days. The acceptance rate went up. Speed is a feature of respect.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:interview-loop:rep-2",
          text: "Agreed, and the fourth round was the worst one — it had no rubric, no owner, and a habit of testing culture fit, which is a scientific term for 'reminded me of myself'. The loop now measures the work, the honesty, and one question about deletion. Everything else was ceremony. Ceremonies are for weddings.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:interview-loop:rep-3",
          text: "Not brave — accurate. Whiteboard coding measures calligraphy under adrenaline, a skill the job does not contain. The working session hands the candidate a real bug from our past and a real afternoon. Three hours of that outperforms what the whiteboard pretended to measure. The whiteboard tutors interns now.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:interview-loop:rep-4",
          text: "The manager says yes, HR says the process was clean, and I say nothing unless the hire is senior — my veto is real and has been used twice in ten years, which is the correct dose. A veto that fires often is a dictator. A veto that never fires is a decoration. Twice a decade. The loop knows the difference.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:interview-loop:rep-5",
          text: "Every rejection gets one true sentence and one kind one, written by the interviewer, not a template. 'Your systems thinking is ahead of your debugging' has redirected two careers that I know of. Rejection is the most-read email we send. It should be written like it. Quiet rejections are rumor factories.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:interview-loop:rep-6",
          text: "For the Tuesday. Not the interview, not the offer — the first Tuesday, when the new hire is alone with the codebase and their courage. Everything in the loop predicts that Tuesday: will they ask, will they read, will they fix or perform. Charisma hires Tuesdays full of performance. Ours hires Tuesdays full of progress.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "dawid:patents",
      label: "The patents drawer",
      optionCandidates: [
        { id: "dawid:patents:opt-1", topicId: "dawid:patents", text: "We hold patents? The office does not feel patented." },
        { id: "dawid:patents:opt-2", topicId: "dawid:patents", text: "The patent drawer is locked. What is in it?" },
        { id: "dawid:patents:opt-3", topicId: "dawid:patents", text: "Is the rate limiter patented? It predates you." },
        { id: "dawid:patents:opt-4", topicId: "dawid:patents", text: "Should engineers file patents for career points?" },
        { id: "dawid:patents:opt-5", topicId: "dawid:patents", text: "A competitor cited our patent. Lawsuit?" },
        { id: "dawid:patents:opt-6", topicId: "dawid:patents", text: "The patent you let expire, and why?" },
      ],
      replyCandidates: [
        {
          id: "dawid:patents:rep-1",
          text: "Three, all defensive, all boring — which is exactly what patents should be. The office does not feel patented because the patents are fences, not flags: they exist so nobody fences US in. Aggressive patenting is for companies whose product is the lawyer. Our product is the training. The fences stay quiet.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:patents:rep-2",
          text: "Two granted, one pending, and the certificates live in the fireproof cabinet next to the archive because paper outlives platforms. The drawer is locked because patents are the one asset that appreciates when IGNORED — every year of silence raises their defensive value. Attention is depreciation. Silence is maintenance.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:patents:rep-3",
          text: "Unpatented, deliberately — Marek's rate limiter predates the company's patent era, and patenting it now would be a confession that we patent things engineers made in kitchens. It lives in prod as prior art with a birthday. Some code should never meet a lawyer. That one is folklore. Folklore does not file.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:patents:rep-4",
          text: "Never for career points — the point system corrupts the filing and fills the drawer with thin patents that collapse under the first lawyer's breath. We file when an idea is both valuable and defensive, and the engineer's name goes first on the document. Two engineers here are named inventors. Both earned it.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:patents:rep-5",
          text: "No lawsuit — a letter, one paragraph, and a licensing offer at a price they would laugh at and then accept. Defensive patents exist to be monetized politely, not weaponized. The competitor took the license. We buy their coffee at conferences now. The patent paid for the coffee for a decade. Best return in the drawer.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:patents:rep-6",
          text: "The first one, a mobile sync method from 2011 — the world walked around it, the maintenance fees outlived the relevance, and letting it go felt like deleting dead code. There was a small ceremony. The log has the line. Patents, like features, have lifecycles. The drawer should only hold things the future still fears.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:coffee-order",
      label: "The precise coffee order",
      optionCandidates: [
        { id: "dawid:coffee-order:opt-1", topicId: "dawid:coffee-order", text: "Your coffee order has specifications. Share them." },
        { id: "dawid:coffee-order:opt-2", topicId: "dawid:coffee-order", text: "Same coffee, same time, eleven years. Discipline?" },
        { id: "dawid:coffee-order:opt-3", topicId: "dawid:coffee-order", text: "The barista near the office knows your order." },
        { id: "dawid:coffee-order:opt-4", topicId: "dawid:coffee-order", text: "Grazyna priced your coffee habit. Findings?" },
        { id: "dawid:coffee-order:opt-5", topicId: "dawid:coffee-order", text: "Would you drink bad coffee for a good meeting?" },
        { id: "dawid:coffee-order:opt-6", topicId: "dawid:coffee-order", text: "What does the coffee order say about you?" },
      ],
      replyCandidates: [
        {
          id: "dawid:coffee-order:rep-1",
          text: "Flat white, one and a half sugars, cup warmed, no lid. Each element is a decision I made once so the morning makes none. The order is not about coffee — it is about removing one decision from a day that budgets them. The sugar fraction took two years. I do not discuss the fraction publicly. You asked. One and a half.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:coffee-order:rep-2",
          text: "Discipline, and it compounds like everything else — the same order means the same machine settings, the same taste, and one fewer variable between me and the first decision of the day. People call it boring. I call it a fixed cost. My mornings have a budget and the coffee is the only line that never argues.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:coffee-order:rep-3",
          text: "She knows the order, the fraction, and the days I travel — on Thursdays she sets the cup out at 8:14 without being asked. That is not service. That is a system with a memory, and I am a client in it. I tip like the operation depends on me. It does not. That is why the tip is correct.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:coffee-order:rep-4",
          text: "She did — the habit prices at nine hundred zloty a year, and the line item reads 'executive fuel, fixed cost, do not optimize'. Her footnote says the order is cheaper than therapy and more punctual than most vendors. Right on both counts. I have never once discussed the footnote with her. Some audits are love letters.",
          relationshipHint: "annoyed",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "dawid:coffee-order:rep-5",
          text: "I have, for years — client sites serve coffee as a personality test, and I drink whatever arrives with the face of a man being honored. The meeting is not about my palate. Refusing the cup refuses the room. I once drank machine coffee for three days and closed the deal. The deal tasted better than the coffee. Both counted.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:coffee-order:rep-6",
          text: "That it decided. Most people wander into the day and let the day choose. The order is one small architecture: fixed, known, defended. Start with one decision made forever and the rest of the day inherits the posture. The coffee is trivial. The posture is not. Everything I respect started as a small thing done the same way twice.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "dawid:boardgames",
      label: "Board games with the board",
      optionCandidates: [
        { id: "dawid:boardgames:opt-1", topicId: "dawid:boardgames", text: "You play board games with board members. Why?" },
        { id: "dawid:boardgames:opt-2", topicId: "dawid:boardgames", text: "Which game? Choose carefully. The room listens." },
        { id: "dawid:boardgames:opt-3", topicId: "dawid:boardgames", text: "A board member resigned mid-game. Story?" },
        { id: "dawid:boardgames:opt-4", topicId: "dawid:boardgames", text: "Does the game table leak into the boardroom?" },
        { id: "dawid:boardgames:opt-5", topicId: "dawid:boardgames", text: "Maciek refuses to play. Analyze." },
        { id: "dawid:boardgames:opt-6", topicId: "dawid:boardgames", text: "What has the game table taught about governance?" },
      ],
      replyCandidates: [
        {
          id: "dawid:boardgames:rep-1",
          text: "Because the game table is the only room where the board sees me lose. The boardroom never shows it — the deck is polished, the graph is up, and the members meet a performance. Over a board game they meet a player: patient, ruthless about the wrong things once a year, bad at bluffing. Boards fund companies. They trust players.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:boardgames:rep-2",
          text: "A trading game from the seventies, with negotiation and no dice — pure information and nerve. Dice games are lotteries, and I will not bond over luck. Negotiation games reveal how a person treats the table when nothing is at stake, which is exactly the data the boardroom hides. The seventies understood governance.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:boardgames:rep-3",
          text: "He did not resign — he surrendered a two-hour lead in one bad trade, laughed harder than anyone, and resigned from the GAME committee, not the board. We played three more hands. He is now the strongest advocate for our risk policy in the room, because he has FELT the downside in cardboard. Simulation beats consequence.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:boardgames:rep-4",
          text: "It informs, not leaks — I learned the chairman folds under time pressure in games, so in boardrooms I never rush his decisions. Another member bluffs at everything, so I put everything in writing. The game table is due diligence with snacks. Better learned over cardboard than during a crisis. Crises charge tuition.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:boardgames:rep-5",
          text: "He refuses because he does not lose gracefully, and he KNOWS this about himself, which is the most self-aware thing about him. His refusal is a leadership decision — he will not give the board a data point he cannot control. I respect it. The office would follow him anywhere if he once lost at cards. His loss, both senses.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:boardgames:rep-6",
          text: "That governance is a game of constrained honesty — everyone at the table knows roughly the same things, and the game is who says what first. The boardroom pretends otherwise. The table admits it. My governance improved the day I stopped treating board members as an audience and started treating them as players.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "dawid:predictions",
      label: "The predictions file",
      optionCandidates: [
        { id: "dawid:predictions:opt-1", topicId: "dawid:predictions", text: "You keep a predictions file with dates. Scored?" },
        { id: "dawid:predictions:opt-2", topicId: "dawid:predictions", text: "Your best call — the one you still mention?" },
        { id: "dawid:predictions:opt-3", topicId: "dawid:predictions", text: "Your worst call. The expensive one." },
        { id: "dawid:predictions:opt-4", topicId: "dawid:predictions", text: "What is the next prediction on the list?" },
        { id: "dawid:predictions:opt-5", topicId: "dawid:predictions", text: "Why date predictions? Confidence theater?" },
        { id: "dawid:predictions:opt-6", topicId: "dawid:predictions", text: "Should the office make collective predictions?" },
      ],
      replyCandidates: [
        {
          id: "dawid:predictions:rep-1",
          text: "Scored, annually, in front of the graph — twenty predictions a year, each with a date and a confidence level, because an un-scored prediction is just a mood with ambition. My ten-year average is sixty-two percent, which sounds humble until you learn most executives score forty by never writing anything down. Writing is the discipline.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:predictions:rep-2",
          text: "2019: 'the training market consolidates within four years and the survivors sell trust, not hours.' Everyone laughed at the trust clause. The consolidation came in three, and the survivors sell exactly that. I do not mention it for the victory lap — I mention it because the SECOND half of the file says what I believe now. Still laughable. Good.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:predictions:rep-3",
          text: "2021: 'remote work is a temporary correction.' I gave it eighteen months. The correction became the climate, and my eighteen months expired ungracefully. The line is still in the file, scored zero, annotated in red: 'you mistook your preferences for the market.' Most valuable sentence in the drawer. It cost one review of dignity.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:predictions:rep-4",
          text: "That the next great training brand will be built on a game, not a course — that attention is the new classroom and whoever makes learning playable takes the decade. Confidence: sixty percent. Horizon: three years. The filing is discipline, not prophecy. If it lands, you heard it here. If it misses, the graph and I will discuss.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:predictions:rep-5",
          text: "The date is the honesty — a prediction without a date is a horoscope, and horoscopes are why people distrust strategy. Every line in my file can fail measurably, in public, on schedule. Some leaders protect credibility by never predicting. I protect mine by predicting badly sometimes and saying so. The file is the anti-horoscope.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:predictions:rep-6",
          text: "We do, quarterly, at the all-hands — five predictions from the floor, scored the next quarter, no stakes except the scoreboard. The office averages forty-one percent and the exercise is priceless anyway: it teaches the company that forecasts are testable, including the ones from the front. The scoreboard hangs by the coffee. Janusz scores hardest.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "dawid:one-pencil",
      label: "The one pencil",
      optionCandidates: [
        { id: "dawid:one-pencil:opt-1", topicId: "dawid:one-pencil", text: "Is that the same pencil from the office photos?" },
        { id: "dawid:one-pencil:opt-2", topicId: "dawid:one-pencil", text: "Why a pencil and not a pen?" },
        { id: "dawid:one-pencil:opt-3", topicId: "dawid:one-pencil", text: "The pencil has no eraser left. Symbolic?" },
        { id: "dawid:one-pencil:opt-4", topicId: "dawid:one-pencil", text: "Klaudia wants to film the pencil." },
        { id: "dawid:one-pencil:opt-5", topicId: "dawid:one-pencil", text: "Tomek sharpened it for you once. Reaction?" },
        { id: "dawid:one-pencil:opt-6", topicId: "dawid:one-pencil", text: "What happens when the pencil is gone?" },
      ],
      replyCandidates: [
        {
          id: "dawid:one-pencil:rep-1",
          text: "Same pencil. 2011. It signed the lease of the second office, the first contract, and one apology I still mean. Objects that were present for things keep the things. I do not keep it for luck. I keep it for the record.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:one-pencil:rep-2",
          text: "A pen commits. A pencil considers. Most of what lands on this desk deserves considering, not committing. The pencil lets a thought stay provisional until it earns ink. Ink is for signatures. Thinking is for graphite. The office confuses the two more than I would like.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:one-pencil:rep-3",
          text: "Worn down to where it sits flat on the table. It will not roll away. Nothing on this desk rolls away — that is the design. The eraser went years ago, which means everything written since is final. You learn to write final thoughts when erasing is no longer offered.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:one-pencil:rep-4",
          text: "She asked. I said no. She asked why, and I said the pencil is not a story, it is a tool, and tools die when they become stories. She thought about that for a full day and came back with something better — she filmed Bruce instead. Correct call. Bruce was always the talent.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:one-pencil:rep-5",
          text: "He sharpened it to a point I had not seen since 2012 and looked quietly proud. I used it that afternoon and the line was beautiful. I told him so. He told Marek. Marek told the graph. The graph has no opinion, which is why I trust it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:one-pencil:rep-6",
          text: "It gets a drawer, not a bin. The drawer already has three predecessors, each worn past use. Same pencil, fifth body. The company does the same thing — new logo, new wall, same decision underneath. Tools end. The hand that holds them renews.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:typing-speed",
      label: "The typing speed",
      optionCandidates: [
        { id: "dawid:typing-speed:opt-1", topicId: "dawid:typing-speed", text: "You type with two fingers. Slower on purpose?" },
        { id: "dawid:typing-speed:opt-2", topicId: "dawid:typing-speed", text: "Your replies are short. The typing or the thinking?" },
        { id: "dawid:typing-speed:opt-3", topicId: "dawid:typing-speed", text: "Tomek clocked your typing speed. He told everyone." },
        { id: "dawid:typing-speed:opt-4", topicId: "dawid:typing-speed", text: "Would you learn to type properly now?" },
        { id: "dawid:typing-speed:opt-5", topicId: "dawid:typing-speed", text: "Maciek types faster than he thinks. Your take?" },
        { id: "dawid:typing-speed:opt-6", topicId: "dawid:typing-speed", text: "What did you type the most in your life?" },
      ],
      replyCandidates: [
        {
          id: "dawid:typing-speed:rep-1",
          text: "Two fingers is a speed I chose in 1998 and never had a reason to leave. Fast typing produces long emails. Long emails produce long replies. Long replies produce meetings. I type slowly so the company can move quickly. It is the most efficient bottleneck I own.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:typing-speed:rep-2",
          text: "The typing. The thinking is slower still. By the time two fingers reach the keyboard, the sentence has survived a budget check, a feelings check, and the question of whether it needs to exist. Most do not. Those are the replies you never see. They are my best work.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:typing-speed:rep-3",
          text: "Thirty-one words a minute. He announced it like a finding. Then he said 'sustainable' and went back to his terminal, which from Tomek is a standing ovation delivered at a whisper. The speed is fine. The review was better.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:typing-speed:rep-4",
          text: "No. Proper typing would triple my output and the company is not ready for that. Two fingers is a governance system. Every sentence costs me effort, so effort gets budgeted. Give me a keyboard shortcut habit and I would be dangerous by Thursday. Marek offered to teach me. I told him the company cannot afford it. He understood.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:typing-speed:rep-5",
          text: "Maciek types at the speed of enthusiasm and edits at the speed of regret. It works for him — his drafts are our strategy by Friday. I draft at the speed of stone and regret nothing because there is nothing to regret. Two schools. One company. The filing cabinet holds both of us.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:typing-speed:rep-6",
          text: "Invoices. For nine years, my own, by hand first and then typed, because nobody was coming to save the paperwork. Second place is the word 'no' — short, final, cheap to type, expensive to send. I have typed it less every year, which the graph tracks as growth. It is also just manners, learning when not to send it.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "dawid:printed-diagrams",
      label: "The printed diagrams",
      optionCandidates: [
        { id: "dawid:printed-diagrams:opt-1", topicId: "dawid:printed-diagrams", text: "You print the architecture diagrams. Why not on screen?" },
        { id: "dawid:printed-diagrams:opt-2", topicId: "dawid:printed-diagrams", text: "The printer must love you. Or hate you." },
        { id: "dawid:printed-diagrams:opt-3", topicId: "dawid:printed-diagrams", text: "Your printed diagrams have margin notes everywhere." },
        { id: "dawid:printed-diagrams:opt-4", topicId: "dawid:printed-diagrams", text: "Marek sends you PDFs anyway." },
        { id: "dawid:printed-diagrams:opt-5", topicId: "dawid:printed-diagrams", text: "Tomek's dependency graph covered your whole desk." },
        { id: "dawid:printed-diagrams:opt-6", topicId: "dawid:printed-diagrams", text: "Ever lost an important printout?" },
      ],
      replyCandidates: [
        {
          id: "dawid:printed-diagrams:rep-1",
          text: "A screen scrolls. Paper admits. On paper, the whole system lies flat and tells you everything at once — where the weight sits, what connects to what, where the single points of failure live. Architecture you scroll through is architecture you visit. Architecture on paper is architecture you understand. I invest in understanding.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:printed-diagrams:rep-2",
          text: "The printer and I have an arrangement older than most of the staff. It jams for everyone and for no one twice. Janusz services it, I feed it good paper, and it prints my diagrams straight. Respect the machine and the machine respects the roadmap. The office thinks I am superstitious. I am merely consistent.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:printed-diagrams:rep-3",
          text: "Margin notes are where the diagram confesses. The center says what we built. The margins say what we avoided, what we owe, and who warned us. Every acquisition I regret started as a confident center with an empty margin. I no longer trust diagrams that fit too neatly. Give me the ones with handwriting all over them.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:printed-diagrams:rep-4",
          text: "He does, and I print them, and he knows, and neither of us has ever said a word about it. He sends the PDF as the record. I make the paper as the reading. Between us the system gets both an archive and an audience. That is what a working relationship is — two people doing the same job from opposite ends.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:printed-diagrams:rep-5",
          text: "It did, and I read every node before lunch. That diagram told me the honest state of this company better than any deck that quarter — three services nobody used, one database doing the work of five, and one arrow labeled 'do not touch' in Tomek's handwriting. I asked about the arrow. He was right to draw it. The arrow stays.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:printed-diagrams:rep-6",
          text: "Once. 2016. A diagram of the whole payment flow, printed, annotated, and gone from my desk between meetings. Found it three days later in the training room, under a coffee cup, being used as a coaster by a visiting client. The flow was correct and the coffee was hot. I rebuilt the diagram from memory and laminated the second one. The coaster original is framed in my house.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "dawid:declined-meetings",
      label: "The declined meetings",
      optionCandidates: [
        { id: "dawid:declined-meetings:opt-1", topicId: "dawid:declined-meetings", text: "You declined Zosia's planning session. Bold." },
        { id: "dawid:declined-meetings:opt-2", topicId: "dawid:declined-meetings", text: "What gets a meeting accepted by you?" },
        { id: "dawid:declined-meetings:opt-3", topicId: "dawid:declined-meetings", text: "You decline with a one-line reason. The line?" },
        { id: "dawid:declined-meetings:opt-4", topicId: "dawid:declined-meetings", text: "Maciek attends everything. Contrast?" },
        { id: "dawid:declined-meetings:opt-5", topicId: "dawid:declined-meetings", text: "Did you ever regret a decline?" },
        { id: "dawid:declined-meetings:opt-6", topicId: "dawid:declined-meetings", text: "Przemek pitched you a meeting about a meeting." },
      ],
      replyCandidates: [
        {
          id: "dawid:declined-meetings:rep-1",
          text: "I declined it with a note: 'planning is your strongest room, do not dilute it.' She ran the session without me and produced the quarter's best roadmap. A declined meeting that improves the meeting is not an absence. It is a contribution with better manners.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:declined-meetings:rep-2",
          text: "Three things. A decision that cannot be made smaller. A person who cannot say it in writing. Or a failure that deserves faces. Everything else is a document wearing chairs. I accept maybe one in five invitations, and the one is never the loudest. It is the one where someone is stuck.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:declined-meetings:rep-3",
          text: "'Send it to me on paper and I will answer by Friday.' That is the whole line. It works because it is true — I do answer, by Friday, in the margin, in pencil. The decline costs them a meeting and gives them a deadline. Nobody has ever complained about the trade twice.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:declined-meetings:rep-4",
          text: "Maciek attends everything because Maciek is fuel and rooms run on him. I am not fuel. I am the gauge. Fuel belongs in every engine room. The gauge belongs wherever the reading matters. He fills the company; I read it. The design is not competition. The design is the point.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:declined-meetings:rep-5",
          text: "Once. 2019. Kasia flagged a team issue as 'worth a face', and I answered on paper, because paper is what I do. The paper was right and the room was wrong — some things need a face, and the face should have been mine. She never said a word. She did not have to. I attend her flags now. All of them. That is the tax I pay, gladly.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:declined-meetings:rep-6",
          text: "He did. 'A brief sync on the sync structure.' I declined with 'the sync is fine' and he called me to discuss my decline with great enthusiasm. The call was, against all odds, useful — he talked for ten minutes and buried one real client concern in the middle of it. I dug it out. The concern was handled. Never underestimate a meeting about meetings.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "dawid:windowsill",
      label: "The windowsill",
      optionCandidates: [
        { id: "dawid:windowsill:opt-1", topicId: "dawid:windowsill", text: "Your windowsill has exactly five objects. Curated?" },
        { id: "dawid:windowsill:opt-2", topicId: "dawid:windowsill", text: "The flat stone — where is it from?" },
        { id: "dawid:windowsill:opt-3", topicId: "dawid:windowsill", text: "One object is a broken watch. Intentional?" },
        { id: "dawid:windowsill:opt-4", topicId: "dawid:windowsill", text: "Renata dusts the windowsill without being asked." },
        { id: "dawid:windowsill:opt-5", topicId: "dawid:windowsill", text: "Klaudia says the windowsill is 'your feed, but physical'." },
        { id: "dawid:windowsill:opt-6", topicId: "dawid:windowsill", text: "Have you ever removed an object from the sill?" },
      ],
      replyCandidates: [
        {
          id: "dawid:windowsill:rep-1",
          text: "Five objects, yes, and the number is the point. A shelf with twenty things says nothing. A shelf with five says five things clearly. The sill holds the company in miniature — where we started, what broke, who stayed, how long, and what the light does at four. Everything else in this office is negotiable. The count is not.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:windowsill:rep-2",
          text: "The Baltic, 2009, the year the company nearly ended and did not. Flat, grey, unimpressive. I sat on a cold beach for two days deciding whether to fold, and the stone was in my pocket on the walk back to the car. It sat on the sill at the old office, the rented office, and this one. Three offices. One stone. The stone has seen worse quarters than you have.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:windowsill:rep-3",
          text: "It stopped at 11:47 on a day in 2014 when the server died and we lost a client and I learned the difference between a crisis and an emergency. I fixed the watch once, years later. It stopped again within a week. Some things only run at eleven forty-seven. I stopped arguing with it. The sill accepted its decision before I did.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:windowsill:rep-4",
          text: "She has dusted it since the old office, always on Fridays, always without comment. Once she moved the stone a centimeter to catch the light better and moved it back before I noticed. I noticed. The sill is the one square meter of this company that I keep, and Renata keeps it with me. That is the whole org chart of the windowsill.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:windowsill:rep-5",
          text: "She said it performs 'quiet luxury' and asked to shoot it for the culture page. I said no. She came back with one photo, taken from the door, sill slightly out of focus, and did not post it. She keeps it in her drafts folder. That is Klaudia understanding something deeper than content: some things market best unmarketed. The photo exists. The sill stays mine.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:windowsill:rep-6",
          text: "Once. A flask from a partner who turned out to be dishonest with our money. The flask left the sill the same afternoon the lawyer called. The sill is short — five objects — so something must go when something new earns a place. Usually the new thing waits. That day it did not. The sill has a memory and a policy and only I know both.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "dawid:retro-machines",
      label: "The retro machines",
      optionCandidates: [
        { id: "dawid:retro-machines:opt-1", topicId: "dawid:retro-machines", text: "There is a 1980s computer in your office. Working?" },
        { id: "dawid:retro-machines:opt-2", topicId: "dawid:retro-machines", text: "Why keep old machines at a software company?" },
        { id: "dawid:retro-machines:opt-3", topicId: "dawid:retro-machines", text: "Marek services them without being asked." },
        { id: "dawid:retro-machines:opt-4", topicId: "dawid:retro-machines", text: "Pawel saw the old machine and lost his mind quietly." },
        { id: "dawid:retro-machines:opt-5", topicId: "dawid:retro-machines", text: "Tomek asks to borrow them. You allow it?" },
        { id: "dawid:retro-machines:opt-6", topicId: "dawid:retro-machines", text: "Which machine would you keep if you kept one?" },
      ],
      replyCandidates: [
        {
          id: "dawid:retro-machines:rep-1",
          text: "Working. Slower than a payment cycle and completely honest about what it can do. I boot it once a quarter and write the next quarter's priorities on it, in its own word processor, saved to a floppy that lives in the safe with the shoebox. The machine cannot run our software. That is exactly why it runs my decisions.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:retro-machines:rep-2",
          text: "Because every machine in this building lies a little. The modern ones hide the work — spinning fans, silent disks, ten layers between the command and the consequence. The old machines show you the whole distance between your intent and the metal. A CEO who has watched a program load for four minutes makes slower, better promises. The machines are not nostalgia.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:retro-machines:rep-3",
          text: "He does. Dusting, belt checks, one recap he will not discuss. I have never asked him to and he has never mentioned doing it. The machines run, which is how I know. Some maintenance in this building is a love language conducted entirely without words, and the machines speak it fluently.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:retro-machines:rep-4",
          text: "He stood at the door for a full minute and then asked, very politely, if he could type one letter on it. One letter. He typed it, saved it to nothing, and thanked me like I had lent him a car. The letter was for nobody. It was for him. I understood it completely. Some machines are shrines and the boy knew the liturgy without being taught.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:retro-machines:rep-5",
          text: "Tomek is the one person I allow to take them home, one at a time, with rules. He returns them cleaner than they left and always with a note — 'capacitors fine', 'this keyboard is better than anything we own now'. The notes are correct. Old machines under new eyes find things the old eyes missed. That trade runs both directions and it has made both of us better at the work.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:retro-machines:rep-6",
          text: "The first one. Not because it is the oldest — because it is the one I wrote the first invoice on, back when the company was a shoebox and a phone number. It boots, it beeps, it holds one floppy at a time, and it has never once asked me for a subscription. If the office burned, the pencil and that machine go out together, under one arm. The rest is inventory.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:camera-off",
      label: "The camera-off doctrine",
      optionCandidates: [
        { id: "dawid:camera-off:opt-1", topicId: "dawid:camera-off", text: "Your camera is always off in calls. Policy?" },
        { id: "dawid:camera-off:opt-2", topicId: "dawid:camera-off", text: "Clients ever complain about the black square?" },
        { id: "dawid:camera-off:opt-3", topicId: "dawid:camera-off", text: "You turn it ON for one call type. Which?" },
        { id: "dawid:camera-off:opt-4", topicId: "dawid:camera-off", text: "Maciek's camera is on in every call. Friction?" },
        { id: "dawid:camera-off:opt-5", topicId: "dawid:camera-off", text: "Klaudia says a black square is 'mysterious branding'." },
        { id: "dawid:camera-off:opt-6", topicId: "dawid:camera-off", text: "What do you do while the camera is off?" },
      ],
      replyCandidates: [
        {
          id: "dawid:camera-off:rep-1",
          text: "Policy since 2020. A camera turns a conversation into a performance, and I do not perform — I listen. The black square levels the room. Nobody dresses for me, nobody arranges their shelf for me, and nobody watches me decide. The call is about the words. The square keeps it that way.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:camera-off:rep-2",
          text: "Once, in 2021, a client insisted. I turned it on, we signed, and at the end he said 'you look exactly like your decisions'. That was the whole review and it was accurate. The camera came back off the next call and he never asked again. One appearance, well spent, buys years of darkness.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:camera-off:rep-3",
          text: "Layoffs, closures, anything where people deserve a face. The black square is respect everywhere except the hard rooms. In the hard rooms the camera comes on, no matter what the news is, because news delivered by a voice alone is a memo. Memos are for good quarters. Faces are for the rest.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:camera-off:rep-4",
          text: "None. His camera is the office's window and mine is the office's door. Clients see the energy through him and hear the judgment through me, and the split works because we never rehearse it. If he ever turned his camera off, the company would seem to disappear. I will not ask that of him. The stage is his. The shadow is mine.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:camera-off:rep-5",
          text: "She called it 'the most followed black square in Polish ed-tech' and wanted to make it a character. I said no, and she respected it, and then she put a small black square sticker on her laptop instead. That was her compromise and it was funnier than anything I would have approved. The square stayed off. The joke stayed on. Both of us won.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:camera-off:rep-6",
          text: "Walk. The office is one hundred and ten steps around and I do the loop while listening. Clients hear a chair that never creaks and assume stillness. The truth is I have paced kilometers behind a black square, and the decisions came out better for it. A body in motion and a face off the screen — the thoughts meet in the middle. That is the whole trick.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "dawid:three-word-replies",
      label: "The three-word replies",
      optionCandidates: [
        { id: "dawid:three-word-replies:opt-1", topicId: "dawid:three-word-replies", text: "Your chat replies average three words. Efficient?" },
        { id: "dawid:three-word-replies:opt-2", topicId: "dawid:three-word-replies", text: "Your reply 'Good. Ship it.' — approval or brevity?" },
        { id: "dawid:three-word-replies:opt-3", topicId: "dawid:three-word-replies", text: "Zosia translates your three words for the team." },
        { id: "dawid:three-word-replies:opt-4", topicId: "dawid:three-word-replies", text: "You once sent one word: 'No.' Context?" },
        { id: "dawid:three-word-replies:opt-5", topicId: "dawid:three-word-replies", text: "Pawel panicked over 'ok' for a full day." },
        { id: "dawid:three-word-replies:opt-6", topicId: "dawid:three-word-replies", text: "When do you write long?" },
      ],
      replyCandidates: [
        {
          id: "dawid:three-word-replies:rep-1",
          text: "Efficient for me, and a puzzle for you, and both are fine. Short replies force the writer to carry the context. If three words are not enough, the message was not ready. The office has learned to send me finished thoughts. That is the hidden feature — brevity upstream is quality control downstream.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:three-word-replies:rep-2",
          text: "Both. The two are not in conflict. A long approval is an approval with doubt in it. 'Good. Ship it.' is approval with the doubt removed. If I had reservations you would have received them instead, in full, with margins. Silence around the yes is what makes the yes load-bearing.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:three-word-replies:rep-3",
          text: "She translates unprompted and her translations are generous — 'Fine' becomes 'approved, and he is pleased but will not say so'. She is right more than she should be. The company runs on her footnotes. My brevity created her job and I have never once apologized for it.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:three-word-replies:rep-4",
          text: "An acquisition offer for the training arm, 2018. Good money, wrong buyer, and everyone in the room knew my answer before I typed it. The one word took an hour to send because it cost a relationship. That is the true price list of brevity — the short words are the expensive ones. Everything since has been affordable.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:three-word-replies:rep-5",
          text: "He spent a day reading 'ok' in eleven emotional registers and built three contingency plans, one of which involved Janusz. The work he did to earn that 'ok' was better than the work I approved. The lesson, which he now teaches others: my short words are a floor, not a ceiling. Read them as permission and overbuild.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:three-word-replies:rep-6",
          text: "Twice a year, roughly. Apologies, goodbyes, and the one-page letter to the whole company when a quarter ends badly. Long writing is for the moments when people need to see the reasoning, not just the ruling. Any manager can type three words. The job is knowing the two occasions that deserve four hundred.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:margin-notes",
      label: "The margin notes",
      optionCandidates: [
        { id: "dawid:margin-notes:opt-1", topicId: "dawid:margin-notes", text: "Your margin notes are famous. What do they mean?" },
        { id: "dawid:margin-notes:opt-2", topicId: "dawid:margin-notes", text: "Zosia keeps a dictionary of your margin symbols." },
        { id: "dawid:margin-notes:opt-3", topicId: "dawid:margin-notes", text: "Grazyna received a margin note that just said 'show me'." },
        { id: "dawid:margin-notes:opt-4", topicId: "dawid:margin-notes", text: "Tomek's proposal came back with one circle. Meaning?" },
        { id: "dawid:margin-notes:opt-5", topicId: "dawid:margin-notes", text: "Pawel frames his margin notes. Healthy?" },
        { id: "dawid:margin-notes:opt-6", topicId: "dawid:margin-notes", text: "What note have you never sent?" },
      ],
      replyCandidates: [
        {
          id: "dawid:margin-notes:rep-1",
          text: "They mean exactly what they say and nothing they cannot say. A question mark means the number is load-bearing and unexplained. An exclamation means I checked it twice and it held. A circle means this paragraph is the whole document and the rest is furniture. The margins are the reading. The text is the material.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:margin-notes:rep-2",
          text: "She does, unofficially, and her dictionary is more accurate than my memory of my own system. Her entry for the double underline — 'he will fund this but wants it smaller' — has never been wrong. The company translated me years ago and I let it happen. A CEO who is legible is worth three who are brilliant.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:margin-notes:rep-3",
          text: "She was the only person to ever receive that note and it worked like a key. She brought the actual workbook, opened it to sheet one, and let me read for eleven minutes in silence. Nobody had ever asked to see the real numbers before — everyone had asked for her interpretation of them. 'Show me' is now the most expensive phrase in this company.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:margin-notes:rep-4",
          text: "One circle around his own sentence about deleting half the service. It meant: this is the proposal, the rest is fear. He deleted half the service. The half that remained is load-bearing and quiet and makes money while the office sleeps. Tomek reads margins the way some people read scripture — closely, and then acts. Dangerous, in the best way.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:margin-notes:rep-5",
          text: "He frames them, yes — there are two on his wall, both one-word notes. Kasia finds it excessive. I find it accurate: those two notes were permission slips he had already earned. The framing is not about me. It is about the day he stopped waiting for permission. I write notes. What he does with them belongs to him. That is the arrangement and it works.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:afternoon"],
        },
        {
          id: "dawid:margin-notes:rep-6",
          text: "'I was wrong.' I have written everything else — the questions, the circles, the one-page rulings. Those three words I always say in person, because a margin note survives and I would rather the wrongness age with me than on paper. Renata knows this. She has watched me start the note twice and stand up both times. Some handwriting is a pilgrimage.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:one-question",
      label: "The one question",
      optionCandidates: [
        { id: "dawid:one-question:opt-1", topicId: "dawid:one-question", text: "You ask exactly one question per meeting. Rule?" },
        { id: "dawid:one-question:opt-2", topicId: "dawid:one-question", text: "How do you pick which question to ask?" },
        { id: "dawid:one-question:opt-3", topicId: "dawid:one-question", text: "Zosia pre-briefs you so the question lands soft?" },
        { id: "dawid:one-question:opt-4", topicId: "dawid:one-question", text: "Your question once killed a project mid-meeting." },
        { id: "dawid:one-question:opt-5", topicId: "dawid:one-question", text: "Pawel prepared for weeks for your one question." },
        { id: "dawid:one-question:opt-6", topicId: "dawid:one-question", text: "What question do you ask yourself?" },
      ],
      replyCandidates: [
        {
          id: "dawid:one-question:rep-1",
          text: "Rule, method, and budget. Meetings produce one real question or none — the second question is always a softer copy of the first. I wait through the presentations, find the load-bearing claim, and ask about that. One question, aimed properly, outperforms a clipboard. The clipboard is Zosia's department. Aiming is mine.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:one-question:rep-2",
          text: "I ask the question whose honest answer changes the decision. Everything else is curiosity, and curiosity is a private expense. In the room, only the question that moves money or people earns the air. If no such question exists, the meeting has already ended and everyone is just staying warm.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:one-question:rep-3",
          text: "She pre-briefs nothing and everyone believes she does. What she does is build meetings where the real answer is safe to say out loud, which is harder and worth more. My question lands soft because the room is soft. Give her the credit I cannot take: the one question works because there is always somewhere true for it to land.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:morning"],
        },
        {
          id: "dawid:one-question:rep-4",
          text: "2017. Forty minutes of slides, and I asked 'who pays for the second year?' The answer did not exist. The project had been running eleven months on the assumption that year two was somebody else's decision. The room went quiet, the project ended honestly, and the team landed somewhere better within a quarter. One question saved us two years of drift.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:one-question:rep-5",
          text: "He prepared three binders for one question and I asked him a different one — 'what did you learn fixing the printer?' He answered for two minutes, honestly, and got the project. The binders told me he could prepare. The answer told me he could notice. I hire for noticing. The binders went back to his desk and I hear he keeps them ready anyway. Good. Stay ready.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:one-question:rep-6",
          text: "'What am I not seeing?' Every morning, at the window, with coffee, before the building fills. It is the only question I ask that has no room attached and no escape. Some mornings the answer is nothing, and those are good days. Most mornings it is a name, and I go find that person first. The company believes I visit people randomly. The visits are the answer to the question.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "dawid:bridges",
      label: "The bridge metaphor",
      optionCandidates: [
        { id: "dawid:bridges:opt-1", topicId: "dawid:bridges", text: "You compare systems to bridges. Expand on that." },
        { id: "dawid:bridges:opt-2", topicId: "dawid:bridges", text: "What is the bridge load limit in your metaphor?" },
        { id: "dawid:bridges:opt-3", topicId: "dawid:bridges", text: "Tomek called the metaphor 'structurally sound, emotionally unclear'." },
        { id: "dawid:bridges:opt-4", topicId: "dawid:bridges", text: "Does the bridge include the river?" },
        { id: "dawid:bridges:opt-5", topicId: "dawid:bridges", text: "Zosia says people are not bridges. Fair?" },
        { id: "dawid:bridges:opt-6", topicId: "dawid:bridges", text: "Which bridge is this company right now?" },
      ],
      replyCandidates: [
        {
          id: "dawid:bridges:rep-1",
          text: "A bridge is a promise made to weight. Not hoped weight, not average weight — the heaviest thing that will cross at the worst hour in the worst weather. Our systems, our schedules, and our word are all bridges. Every one of them should be built for the day the whole company crosses at once. That day comes. It has come twice. Both times, the bridge held.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:bridges:rep-2",
          text: "Eleven people and one deadline. That is the real maximum this company has ever carried at once, and I keep the number in my head the way Grazyna keeps decimals. Every new project adds weight to the same span. The bridge does not care how good the plans are. It cares what you put on it. Most disasters are bridges that were never told about the truck.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:bridges:rep-3",
          text: "He is right, which is why I keep saying it. The metaphor is sound on purpose and incomplete on purpose — the missing part is where each listener builds their own. Tomek builds something honest and a little cold. Pawel builds something with a flag on it. The metaphor is a mirror with girders. That is what makes it durable. It holds whatever crosses it.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:bridges:rep-4",
          text: "Always. The river is everything that moves whether or not we build — the market, the season, the mood of clients, the sea Grazyna's August forecast. A bridge is not built against still water. It is built against the water's opinion of your plans. Companies that forget the river design for a world that agreed to hold still. The river never signed.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:bridges:rep-5",
          text: "Fair, and she is my favorite correction. People are not bridges. Bridges hold whatever you put on them. People bend, rest, grow, and leave, and a company that loads them like girders deserves the collapse it schedules. So I run two books — the bridge book for systems, where load is honored, and Zosia's book for people, where capacity is asked, never assumed.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:bridges:rep-6",
          text: "A working truss, mid-repair, open to traffic. We carry weight every day and rebuild while crossing — the migration was six months of repairing the bridge while the company walked across it. Marek will tell you it should have been closed for the work. He is right, and the company could not afford to close, so we posted lookouts and went slow.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "dawid:headphones",
      label: "The headphones",
      optionCandidates: [
        { id: "dawid:headphones:opt-1", topicId: "dawid:headphones", text: "You own headphones but never wear them. Why?" },
        { id: "dawid:headphones:opt-2", topicId: "dawid:headphones", text: "The headphones sit on your monitor. Decoration?" },
        { id: "dawid:headphones:opt-3", topicId: "dawid:headphones", text: "Marek's headphones are always on. Opposite policy?" },
        { id: "dawid:headphones:opt-4", topicId: "dawid:headphones", text: "One time you wore them. The office noticed." },
        { id: "dawid:headphones:opt-5", topicId: "dawid:headphones", text: "Klaudia shot a video with your headphones as props." },
        { id: "dawid:headphones:opt-6", topicId: "dawid:headphones", text: "What do the headphones hear, finally?" },
      ],
      replyCandidates: [
        {
          id: "dawid:headphones:rep-1",
          text: "Because my job is the room. Headphones are how a person becomes unavailable on purpose, and I made the opposite deal years ago — I am available on purpose, all day, to anyone. It costs me focus and pays me the truth. People tell the boss with no headphones things the boss with headphones never hears. The silence between my ears is a company asset.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:headphones:rep-2",
          text: "They are a gift from the team, 2016, the year I said 'I should learn what the engineers hear'. I never wore them and never removed them. They sit there as a question I chose not to answer, and the team understands the answer anyway. Some objects are better as intentions than as habits.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:headphones:rep-3",
          text: "His are on because his listening is aimed at the machines. Mine are off because my listening is aimed at the hallway. Together the company hears everything — the servers through him, the people through me. Put my headphones on and the office goes half-deaf. The policy is not personal. It is coverage.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:headphones:rep-4",
          text: "One time, during the migration weekend. Marek handed me a pair at 2am and said 'just listen to it hold'. I wore them for ten minutes — the sound of a database syncing in the dark — and I understood the quarter in a way no graph had shown me. I took them off, said 'good', and went back to the hallway. The office noticed. The office need not know what I heard.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:headphones:rep-5",
          text: "She used them as the symbol of 'the quiet CEO' in a video that did very well — my headphones, never worn, on the monitor, while the office works around them. She asked if the symbolism was intentional. I said the headphones were a gift and the rest was her. That is the honest credit. She builds meaning out of what the rest of us leave on monitors.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:headphones:rep-6",
          text: "Ten minutes of a database syncing at 2am and one recording Pawel made of the office at 9am — keyboards, coffee machine, Burek's tag, the printer's complaint. He gave it to me as a joke. It is the company's true sound. The headphones have heard both the machine and the morning, and everything between them is the job I do without them. One day I will wear them again.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "dawid:pricing",
      label: "The pricing",
      optionCandidates: [
        { id: "dawid:pricing:opt-1", topicId: "dawid:pricing", text: "You personally set the prices. Still?" },
        { id: "dawid:pricing:opt-2", topicId: "dawid:pricing", text: "Your prices are not the lowest. Intentional?" },
        { id: "dawid:pricing:opt-3", topicId: "dawid:pricing", text: "Grazyna has a floor. You have a floor. Different?" },
        { id: "dawid:pricing:opt-4", topicId: "dawid:pricing", text: "You once raised a price mid-negotiation. Bold." },
        { id: "dawid:pricing:opt-5", topicId: "dawid:pricing", text: "Przemek discounts everything. Your counter?" },
        { id: "dawid:pricing:opt-6", topicId: "dawid:pricing", text: "How do you price a client you believe in?" },
      ],
      replyCandidates: [
        {
          id: "dawid:pricing:rep-1",
          text: "Still. Grazyna sets the floor, Przemek sets the mood, and I set the number, because the number is the one sentence this company says about itself that every client hears. Prices are not arithmetic. Prices are testimony. I sign my testimony, and I have signed it the same way for years — high enough to be true, low enough to be honest.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:pricing:rep-2",
          text: "The cheapest price buys you the clients who chose you for the price, and those clients leave for the next price. Our clients stay for the reason. Every year I lose two deals to cheaper competitors and keep ninety for the reason. That trade has compounded for eleven years. The discount is a loan against your own reputation, and I have never once needed the money that badly.",
          relationshipHint: "neutral",
        },
        {
          id: "dawid:pricing:rep-3",
          text: "Her floor is survival, mine is identity. She will tell me the number under which the company bleeds; I will not cross a different line above it, the one under which the company lies. Two floors, both respected, and in eleven years they have only argued once, over a client we both loved. We split the difference and the client paid it without blinking.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:pricing:rep-4",
          text: "I did, and the room went silent, and then the client said 'finally, an honest number'. The first price was the one my team thought they could get. The second was the one the work cost. The raise was not boldness. It was the truth arriving late, which is still better than the truth never arriving. We delivered above the second number and the client renewed at it, twice.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:pricing:rep-5",
          text: "No counter, only a condition. Przemek may discount anything except the reason. If the discount is for volume, for timing, for a client who pays clean — fine, that is weather, and he reads weather better than anyone alive. But the day we discount because a client does not believe in the training, we stop being this company. He knows the line.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:pricing:rep-6",
          text: "Lower than the market expects and firm once said. Belief is not charity — a client you believe in will make the training work, and working training is our best advertising. So the price becomes a partnership: they bring the belief, we bring the price, and both sides hold the thing up for five years. Half our flagship clients started this way. The discount is not a favor.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "dawid:friday-1700",
      label: "The Friday 17:00",
      optionCandidates: [
        { id: "dawid:friday-1700:opt-1", topicId: "dawid:friday-1700", text: "You leave at five on Friday. Always?" },
        { id: "dawid:friday-1700:opt-2", topicId: "dawid:friday-1700", text: "The office watches you walk out at five. Pressure?" },
        { id: "dawid:friday-1700:opt-3", topicId: "dawid:friday-1700", text: "Ever broken the five o'clock rule?" },
        { id: "dawid:friday-1700:opt-4", topicId: "dawid:friday-1700", text: "Zosia schedules nothing after four on Fridays. Aligned?" },
        { id: "dawid:friday-1700:opt-5", topicId: "dawid:friday-1700", text: "Marek starts his weekend at five too. Coordination?" },
        { id: "dawid:friday-1700:opt-6", topicId: "dawid:friday-1700", text: "What does Friday evening look like, honestly?" },
      ],
      replyCandidates: [
        {
          id: "dawid:friday-1700:rep-1",
          text: "Always, since 2012. A company watches what the boss does, not what the boss says, and the five o'clock walkout says more than any wellbeing policy ever drafted. The week ends because I end it, visibly, at the same hour the cleaning staff has always known is real. Everyone is free to stay. Nobody believes they have to.",
          relationshipHint: "pleased",
        },
        {
          id: "dawid:friday-1700:rep-2",
          text: "The watching is the point. If I lingered at my desk on Fridays, fifty people would find reasons to linger, and their families would meet a tired outline of them at dinner. One visible walkout per week is the cheapest culture this company owns. It costs me nothing and pays everyone.",
          relationshipHint: "delighted",
        },
        {
          id: "dawid:friday-1700:rep-3",
          text: "Twice. A breach in 2019 and a blackout in 2022 — both times the office stayed with me, both times it was unnecessary, and both times Marek told me so on Monday with the same three words: 'they had families.' The rule is not for me. It is for the version of me that forgets. The office enforces it better than I do, which is exactly how it should be.",
          relationshipHint: "annoyed",
        },
        {
          id: "dawid:friday-1700:rep-4",
          text: "She keeps the hour clear and has never once said why. The meetings end at four, the Friday sends go out at four, and by five the building exhales. We have never discussed it. She watched me institute the walkout and built the calendar around it, silently, the way she builds everything. The alignment is total and the conversation never happened.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "dawid:friday-1700:rep-5",
          text: "No coordination, just the same clock. He leaves at five because the machines are patched and the tickets are dead until Monday. I leave at five because the company is stable for the same reason. We meet at the door sometimes, nod, and walk out together. Two men leaving a building that will run all weekend without either of them. That is the whole point of the work.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "dawid:friday-1700:rep-6",
          text: "A long walk, no phone, and dinner where nobody discusses the graph. Renata holds my Friday mail until Monday — her policy, not mine, and she has never bent it, not once. The company gets six days of me and my family gets the seventh in one piece. The five o'clock walkout is not a boundary against work. It is a delivery guarantee for everything the work is supposed to protect.",
          relationshipHint: "pleased",
          tags: ["period:evening"],
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

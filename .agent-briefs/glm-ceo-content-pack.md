# Dawid (CEO) Content Pack

Deliverable for the DevPowers Group CEO, id `dawid`. Voice: IT Crowd x Silicon Valley. Pseudo-motivational, buzzword-salad, "we're a family" (with KPIs), meetings as cardio, hockey-stick worship, genuinely delighted that the player is "a number on a spreadsheet that goes up". All copy is ASCII only, no em dashes. Option `id` fields are set on every option (required by the dialogue-memory anti-repeat system; see the comment on `DialogueOption` in `src/types.ts`).

## Deliverable 1: Dialogue trees

Paste-ready replacement for the existing C-38 placeholder `dawid:` block at the bottom of `DIALOGUES` in `src/content/dialogues.ts` (delete the placeholder block, paste this one in its place). Every `nextNodeId` / `next` target resolves inside its own tree; every terminal flows to `_end`.

```ts
dawid: {
  default: {
    nodes: {
      greeting: {
        id: "greeting",
        text: "Dawid, CEO. Welcome. I would shake your hand, but I am in back-to-back meetings until Friday. Which Friday, I cannot say. You are seen. You are valued. You are a number on a spreadsheet that goes up. Come back when the number has a contract attached.",
        options: [
          { text: "Will do, boss.", id: "def-will-do", nextNodeId: "_end", effects: [{ type: "add-relationship", target: "dawid", delta: 5 }] },
          { text: "Are you ever NOT in a meeting?", id: "def-not-meeting", nextNodeId: "not-a-meeting" },
          { text: "What am I supposed to do in the meantime?", id: "def-meantime", nextNodeId: "meantime" },
        ],
      },
      "not-a-meeting": {
        id: "not-a-meeting",
        text: "Great question. If I am not IN a meeting, I am walking TO one. It is called a walking one-on-one. It counts as cardio and alignment at the same time. HR calls it overwork. I call it momentum.",
        next: "_end",
      },
      meantime: {
        id: "meantime",
        text: "Find Bartek. Get a contract. Any contract. Once revenue flows, everything I say starts sounding like wisdom. That is not motivation. That is physics.",
        next: "_end",
      },
      _end: { id: "_end", text: "", next: "_end" },
    },
  },
  "first-meeting": {
    nodes: {
      greeting: {
        id: "greeting",
        text: "The new trainer WITH a contract. Come in, come in. Sit in the expensive chair, it rotates and it means something. You brought revenue and the graph noticed. The graph notices everything. Now: questions. I can feel questions coming.",
        options: [
          { text: "What does DevPowers Group actually do?", id: "fm-company", nextNodeId: "company" },
          { text: "Why is there a giant Batman behind you?", id: "fm-batman", nextNodeId: "batman" },
          {
            text: "Thanks. Bartek taught me everything I know.",
            id: "fm-bartek",
            nextNodeId: "bartek-credit",
            effects: [
              { type: "add-relationship", target: "bartek", delta: 5 },
              { type: "add-relationship", target: "dawid", delta: 5 },
            ],
          },
        ],
      },
      company: {
        id: "company",
        text: "DevPowers builds software. Edukey teaches people. And I align. Nobody knows what that means, including me, and it has been on my business card since 2022. DevPowers writes the code, Edukey sells the course about the code, and I sit in the room where both invoices are born.",
        options: [
          { text: "And what is your management philosophy?", id: "fm-philosophy", nextNodeId: "philosophy" },
          { text: "Why is there a giant Batman behind you?", id: "fm-batman-2", nextNodeId: "batman" },
        ],
      },
      "bartek-credit": {
        id: "bartek-credit",
        text: "Bartek. He interviewed ME once. Best decision I never made. Loyalty, chain of command, podcast potential. I am noting all of it. But enough about staff. Let me tell you what we are building here.",
        next: "company",
      },
      philosophy: {
        id: "philosophy",
        text: "Three words: family, KPIs, hockey stick. We are a family, and families have quarterly reviews. When the line goes up and to the right, that is not a graph, it is a promise. When it goes down, we do not panic, we pivot. The stick is always hockey. The only question is whose teeth.",
        options: [
          {
            text: "I love that. Unironically.",
            id: "fm-phil-yes",
            nextNodeId: "philosophy-yes",
            effects: [
              { type: "add-relationship", target: "dawid", delta: 10 },
              { type: "add-stat", target: "credibility", delta: -3 },
            ],
          },
          {
            text: "That is three buzzwords in a trench coat.",
            id: "fm-phil-no",
            nextNodeId: "philosophy-no",
            effects: [
              { type: "add-relationship", target: "dawid", delta: -5 },
              { type: "add-stat", target: "credibility", delta: 5 },
            ],
          },
          { text: "How does this affect my invoice?", id: "fm-phil-money", nextNodeId: "philosophy-money", effects: [{ type: "add-relationship", target: "dawid", delta: 5 }] },
        ],
      },
      "philosophy-yes": {
        id: "philosophy-yes",
        text: "YES. Do you feel that? That is alignment. I say a vague thing, you feel something, and revenue becomes theoretically possible. It is my only skill and it paid for this chair. Hold that feeling. I am about to aim it.",
        next: "workshop",
      },
      "philosophy-no": {
        id: "philosophy-no",
        text: "Buzzwords are compressed strategy. You decompress them at scale. Nobody respects the format until the invoice clears, and then suddenly everyone speaks fluent trench coat. You will see. In about thirty seconds.",
        next: "workshop",
      },
      "philosophy-money": {
        id: "philosophy-money",
        text: "An invoice question. In my office. I have never respected a new employee faster. Money people keep companies alive and meetings short. Hold that energy. I am about to aim it.",
        next: "workshop",
      },
      batman: {
        id: "batman",
        text: "Ah, Bruce. In 2021 a branding agency billed us 40,000 zl for 'a bold brand anchor' and delivered, literally, a bat. Before I could demand a refund, a client saw it, assumed we do security, and doubled their contract. Now removing Bruce costs more than keeping him. That is called brand equity.",
        options: [
          { text: "Honestly? Iconic.", id: "fm-bat-yes", nextNodeId: "batman-yes", effects: [{ type: "add-relationship", target: "dawid", delta: 5 }] },
          { text: "That is sunk cost with wings.", id: "fm-bat-no", nextNodeId: "batman-no", effects: [{ type: "add-stat", target: "credibility", delta: 3 }] },
        ],
      },
      "batman-yes": {
        id: "batman-yes",
        text: "ICONIC. Say it louder. Ania will want that for the About page. Most people see a 40,000 zl mistake. You see a mascot with a legal department. You get this company. I am getting emotional. And tactical. Watch.",
        next: "workshop",
      },
      "batman-no": {
        id: "batman-no",
        text: "Sunk cost is only sunk if you admit it. I call it heritage. Same invoices, better lighting. Anyway. I can feel a Big Idea arriving. Brace.",
        next: "workshop",
      },
      workshop: {
        id: "workshop",
        text: "Here it is. A Big Idea, fresh from the idea shower. A workshop. Two days. React. For a client with real money and unusual beliefs. I am not saying yes yet. I am saying the graph says yes, and the graph has never lied. It has been renamed twice, but it has never lied.",
        options: [
          { text: "I am in. Tell me everything.", id: "fm-ws-yes", nextNodeId: "workshop-yes", effects: [{ type: "add-relationship", target: "dawid", delta: 5 }] },
          { text: "What is the catch? There is always a catch.", id: "fm-ws-catch", nextNodeId: "workshop-catch", effects: [{ type: "add-stat", target: "credibility", delta: 3 }] },
          { text: "How much money are we talking?", id: "fm-ws-money", nextNodeId: "workshop-money" },
        ],
      },
      "workshop-yes": {
        id: "workshop-yes",
        text: "THAT is founder energy. Do not sign anything yet, and not because of lawyers. Suspense is a leadership tool. Come find me tomorrow and there will be paper, a number, and one small catch you will barely notice.",
        next: "_end",
      },
      "workshop-catch": {
        id: "workshop-catch",
        text: "Why does everyone ask about the catch BEFORE hearing the number? Fine. The client believes AI means the computer does the work. All of the work. Including the React. Come back tomorrow and I will make the catch worth your while.",
        next: "_end",
      },
      "workshop-money": {
        id: "workshop-money",
        text: "Asking about money in my office. Respect. Numbers are a love language. Come back tomorrow with that exact energy and there will be a figure. A big one. Round. Confident. Confident is the important part.",
        next: "_end",
      },
      _end: { id: "_end", text: "", next: "_end" },
    },
  },
  "give-task": {
    nodes: {
      greeting: {
        id: "greeting",
        text: "There he is. My favorite line item. Remember the workshop from the idea shower? It survived the night, which makes it strategy. Two days of React, 1500 zl. The client is a fintech that processes mortgages with an Excel file and a dream. Deal or no deal?",
        options: [
          { text: "What exactly would I be teaching?", id: "gt-details", nextNodeId: "details" },
          {
            text: "Deal. Send the invoice gods my way.",
            id: "gt-accept",
            nextNodeId: "accepted",
            effects: [
              { type: "add-cash", target: "cash", delta: 1500 },
              { type: "set-flag", target: "ceo-workshop-offered", delta: 1 },
              { type: "add-relationship", target: "dawid", delta: 15 },
              { type: "add-stat", target: "patience", delta: -10 },
            ],
          },
          {
            text: "Hard pass.",
            id: "gt-decline",
            nextNodeId: "declined",
            effects: [
              { type: "add-relationship", target: "dawid", delta: -10 },
              { type: "add-stat", target: "credibility", delta: 3 },
            ],
          },
        ],
      },
      details: {
        id: "details",
        text: "Day one: React components. Day two: whatever the client asks about, which will be AI. Their whole engineering team believes AI means the computer does the work. Your real job is gently explaining that the computer cannot want things. Yet.",
        options: [
          {
            text: "Say no more. I am in.",
            id: "gt-accept-2",
            nextNodeId: "accepted",
            effects: [
              { type: "add-cash", target: "cash", delta: 1500 },
              { type: "set-flag", target: "ceo-workshop-offered", delta: 1 },
              { type: "add-relationship", target: "dawid", delta: 15 },
              { type: "add-stat", target: "patience", delta: -10 },
            ],
          },
          {
            text: "1500 is not enough for THAT.",
            id: "gt-decline-2",
            nextNodeId: "declined",
            effects: [
              { type: "add-relationship", target: "dawid", delta: -5 },
              { type: "add-stat", target: "credibility", delta: 3 },
            ],
          },
        ],
      },
      accepted: {
        id: "accepted",
        text: "You will not regret this. Or you will, but profitably. The 1500 zl is wired. I already told the client you are a 'world-class React sensei', so between us: be that. They believe the computer does the work. Manage the belief. Bill the hours.",
        options: [
          { text: "Any advice for the client?", id: "gt-advice", nextNodeId: "advice" },
          { text: "Great. I am off to prepare.", id: "gt-prepare", nextNodeId: "_end" },
        ],
      },
      advice: {
        id: "advice",
        text: "Lower the bar, then limbo under it. If anyone asks whether AI can write React by itself, say 'with the right prompting' and keep typing. Confidence is a framework. Invoice on day three.",
        next: "_end",
      },
      declined: {
        id: "declined",
        text: "Interesting. VERY interesting. I am writing 'networking instinct' in your file, and the quotation marks are doing a lot of work. No hard feelings. The slot goes to Pawel, and the client goes to therapy. We all grow.",
        next: "_end",
      },
      _end: { id: "_end", text: "", next: "_end" },
    },
  },
  "performance-review": {
    nodes: {
      greeting: {
        id: "greeting",
        text: "Sit. This is your performance review. The deck is 90 slides and 87 of them are the same graph. Highlights: your NPS among coworkers is strong. Your synergy velocity is flat. Your vibes-based output is through the roof, and the roof is a KPI now.",
        options: [
          {
            text: "Thank you. I have been working on my velocity.",
            id: "pr-suckup",
            nextNodeId: "suckup",
            effects: [
              { type: "add-relationship", target: "dawid", delta: 10 },
              { type: "add-stat", target: "credibility", delta: -5 },
            ],
          },
          { text: "What is synergy velocity, exactly?", id: "pr-metrics", nextNodeId: "metrics" },
          {
            text: "Is any of this measured by an actual human?",
            id: "pr-honest",
            nextNodeId: "honest",
            effects: [
              { type: "add-relationship", target: "dawid", delta: -5 },
              { type: "add-stat", target: "credibility", delta: 5 },
            ],
          },
        ],
      },
      suckup: {
        id: "suckup",
        text: "HA. THAT is what I look for. That is word for word what I wrote in my review of myself. I am putting 'high performer, promotable' in the deck. Do not let competence ruin this for you.",
        next: "_end",
      },
      metrics: {
        id: "metrics",
        text: "Nobody knows. I found it on a dashboard. The dashboard is fed by a survey Pawel built, and the survey asks one question: 'thoughts?'. But the tooling is real-time, and real-time is what makes it science.",
        options: [
          { text: "So what is my verdict?", id: "pr-verdict", nextNodeId: "verdict" },
        ],
      },
      verdict: {
        id: "verdict",
        text: "The verdict: exceeds expectations on culture. Meets expectations on knowing things. And one area of growth, which we will now discuss with the blinds open, like professionals.",
        options: [
          { text: "Which area of growth?", id: "pr-growth", nextNodeId: "growth-area" },
        ],
      },
      "growth-area": {
        id: "growth-area",
        text: "Saying no. Not to me. Never to me. To OTHER people. Distribute your noes evenly across the org, like snacks. That is the whole review. Deck adjourned. Same time next quarter, or sooner if the graph gets emotional.",
        next: "_end",
      },
      honest: {
        id: "honest",
        text: "Bold. I love bold in a slide and fear it in a meeting. Fine, one slide of real talk: you are doing fine. Better than fine. If I write that in normal words, the board asks why we are not paying you more. So we write 'synergy velocity'. It protects everyone. Mostly me.",
        next: "_end",
      },
      _end: { id: "_end", text: "", next: "_end" },
    },
  },
  fireside: {
    nodes: {
      greeting: {
        id: "greeting",
        text: "Hey. Quiet corner, right? The garden helps. Between us, and it stays between us: some mornings I stand right here and I genuinely do not know what this company does. DevPowers builds. Edukey teaches. And I align. I have never once known what that word means.",
        options: [
          { text: "Honestly? That makes me feel better.", id: "fs-better", nextNodeId: "better", effects: [{ type: "add-relationship", target: "dawid", delta: 10 }] },
          { text: "Then who is actually running things?", id: "fs-who", nextNodeId: "who", effects: [{ type: "add-relationship", target: "dawid", delta: 5 }] },
        ],
      },
      better: {
        id: "better",
        text: "It should. Every founder is one unpowered meeting away from the truth. The trick is not the doubt. The trick is the recovery. Watch this.",
        next: "recover",
      },
      who: {
        id: "who",
        text: "Structurally? Me. Operationally? Grazyna's spreadsheet. Emotionally? The printer. Spiritually? Burek. The dog has never read a single KPI and he is the only one here sleeping well.",
        next: "recover",
      },
      recover: {
        id: "recover",
        text: "I know EXACTLY what this company does. We win. Everything else is a feature of winning. Great chat. This corner does not exist, and if you ever quote me I will deny it in a keynote.",
        next: "_end",
      },
      _end: { id: "_end", text: "", next: "_end" },
    },
  },
},
```

### Gating note (wired by the orchestrator, not in this data)

`default` = show only while `got-acme-contract` is NOT set; `first-meeting` = `got-acme-contract`; `give-task` = `got-acme-contract` AND NOT `ceo-workshop-offered` (accepting sets `ceo-workshop-offered`); `performance-review` = `got-acme-contract` (or a mid-game trigger such as day >= 5); `fireside` = always available as the lowest-priority easter egg.

## Deliverable 2: CEO office decoration copy

Exact sign text per item, one `line` per rendered line (all ASCII, max 30 chars per line).

| # | Item | Location | Sign text (exact lines) |
|---|---|---|---|
| 1 | Keep Calm poster | north accent wall | `KEEP CALM AND SHIP IT` |
| 2 | LinkedIn plaque | west solid wall | `LINKEDIN TOP VOICE` / `IN: ARTIFICIAL INTELLIGENCE` / `(SELF-NOMINATED)` |
| 3 | IT Crowd poster | west solid wall | `HAVE YOU TRIED` / `TURNING IT OFF` / `AND ON AGAIN?` |
| 4 | Framed fake quote | north accent wall | `"DISRUPTION IS JUST` / `PIVOTING WITH` / `CONFIDENCE."` / `- DAWID, CEO` |
| 5 | Whiteboard | north accent wall, behind desk | `Q3 GOALS:` / `1. GROW` / `2. ??` / `3. EXIT` (line 4 `HOCKEY STICK` half-erased, smudge only) |
| 6 | Executive mug | desk | `WORLD'S OKAYEST` / `VISIONARY` |
| 7 | Bonsai label | desk | `SYNERGY` / `(DO NOT WATER` / `AFTER MIDNIGHT)` |
| 8 | Door sign | glass door, west side | `BATCAVE` / `KNOCK TWICE` |
| 9 | Rowing team poster | west solid wall | `ROWING TOGETHER.` / `SYNERGY IN MOTION.` |
| 10 | Award plaque | desk | `BEST CEO 2023` / `NOMINATED BY:` / `DAWID` |
| 11 | Bonus: cardio poster | west solid wall | `MEETINGS ARE CARDIO` / `STRETCH. ALIGN. DISRUPT.` |
| 12 | Bonus: desk plate | desk | `WE ARE FAMILY` / `(KPIs APPLY)` |

## Deliverable 3: Ambient speech bubbles (max ~30 chars each)

1. `Circle back? I never left.`
2. `Alignment is my cardio.`
3. `The graph must go up. Up!`
4. `We are family. KPIs apply.`
5. `Pivot! But with confidence.`
6. `Who moved my hockey stick?`
7. `Let us take this offline.`
8. `Burek gets it. No meetings.`

/**
 * General-office chatter as starter + response exchanges (PRD C-46).
 *
 * C-46 (Lucas, 2026-08-31): inter-NPC conversations are max TWO
 * turns - one NPC says the starter, the partner answers with one of
 * 2-3 candidate responses (picked randomly), and then the pair goes
 * on cooldown so a DIFFERENT pair talks next. This file is the
 * content for the "work hours" pool; the lunch-time pool is
 * hand-authored in `src/content/lunch-dialogues.ts` (LUNCH_CHATTER).
 *
 * Amended 2026-09-01 (Lucas): exchanges carry an optional `topic`
 * ("it" | "finance" | "janitor"; undefined = general). A speaker only
 * STARTS exchanges whose topic they are allowed (SPEAKER_TOPICS
 * below): non-tech roles do not tell IT jokes, finance exchanges are
 * for Grazyna (accountant) and Zosia (manager), janitor exchanges are
 * Janusz's. Responses are unrestricted - anyone can answer a joke.
 *
 * Amended 2026-09-02 (Lucas): every starter carries 5-6 responses
 * ("try to be funny - IT crowd, Silicon Valley style, stupid IT/tech
 * jokes, corporate humor"), and the sales / marketing / finance pools
 * got dedicated new exchanges.
 *
 * Constraints (enforced by tests/unit/office-chatter.test.ts):
 * - every line <= 60 chars (bubble: 36 chars x 2 lines via fitLine)
 * - plain ASCII only
 * - no duplicates inside the pool, no overlap with the lunch pool or
 *   the dog pool
 * - every exchange has 5-6 responses
 */

export type ChatterTopic = "it" | "finance" | "janitor" | "sales" | "marketing";

export interface ChatterExchange {
  /** The line the chattiness-weighted starter says. */
  starter: string;
  /** The partner answers with one of these (picked randomly). */
  responses: readonly string[];
  /** Undefined = general (everyone may start it). */
  topic?: ChatterTopic;
}

export const OFFICE_CHATTER: readonly ChatterExchange[] = [
  // --- IT-topic exchanges -----------------------------------------
  {
    starter: "Who broke the build? Again!",
    topic: "it",
    responses: [
      "I recycle bugs. It's called QA.",
      "The intern pushed to main. We're so proud.",
      "I asked AI to fix it. Now there are two bugs.",
      "It was legacy. Legacy broke it.",
      "Git blame pointed back at me. Twice.",
    ],
  },
  {
    starter: "Can you review my PR?",
    topic: "it",
    responses: [
      "I have 47 tabs open and one fear.",
      "LGTM. I read the first line.",
      "After standup. Or a sprint. Whichever first.",
      "Sure. Removing whitespace counts as reviewing.",
      "I'll approve it if you approve mine. Deal?",
    ],
  },
  {
    starter: "Did the deploy go out?",
    topic: "it",
    responses: [
      "Define 'out'.",
      "It's Friday. Whatever happens is canon now.",
      "It went out. So did the users.",
      "Deployed. Now we document. Kidding.",
      "Deployed. The logs are a mystery now.",
    ],
  },
  {
    starter: "Chat Bot is down again.",
    responses: [
      "It learned from us. We are sorry.",
      "Good. It was starting to have opinions.",
      "!!! $#%#$@$% !!!",
      "It heard 'requirements' and gave up.",
      "Send flowers. Or a parser.",
    ],
  },
  {
    starter: "I'll merge it after lunch.",
    topic: "it",
    responses: [
      "Famous last words, v2.",
      "The merge conflicts are load-bearing now.",
      "Lunch is a state of mind. So is main.",
      "The rebase will eat first anyway.",
      "Post-lunch merge is a horror genre.",
    ],
  },
  {
    starter: "Kubernetes is just astrology for sysadmins.",
    topic: "it",
    responses: [
      "And the cluster is 'in a mood' today.",
      "My horoscope said avoid prod. I ignored it.",
      "Mercury is in retrograde-pull.",
      "My pod crashed. Blame the moon.",
      "The cluster aligns with Jupiter. Barely.",
    ],
  },
  {
    starter: "I left a TODO in 2019. It's load-bearing now.",
    topic: "it",
    responses: [
      "We do not touch it. We gesture respectfully.",
      "Ancient code works best. Nobody knows why.",
      "TODOs are the real documentation.",
      "That TODO has seniority now.",
      "Archaeology. But with more cursing.",
    ],
  },
  {
    starter: "We don't need tests, our users test in prod for free.",
    topic: "it",
    responses: [
      "Bold strategy. The users are winning.",
      "HR wants a word about that sentence.",
      "Cheapest QA department on the market.",
      "They even file the bugs. For free!",
      "Prod is our beta. And our gamma.",
    ],
  },
  {
    starter: "My rubber duck got upgraded to an LLM. It lies.",
    topic: "it",
    responses: [
      "Mine quoted my own sprint goals back. Brutal.",
      "At least it does not judge. Out loud.",
      "Mine negotiated remote work.",
      "The duck was right though.",
      "Quack driven development. It stays.",
    ],
  },
  {
    starter: "Did you restart it?",
    topic: "it",
    responses: [
      "Twice. Now it fails at a higher speed.",
      "That is our only tool and it never works.",
      "Yes. It apologized and broke again.",
      "I unplugged it. It came back angry.",
      "Third restart summons the demo gods.",
    ],
  },
  // --- General exchanges (everyone) --------------------------------
  {
    starter: "The printer is jammed again.",
    responses: [
      "Just KISS, ok?",
      "I'm not touching it. It blinked at me last time.",
      "Unplug it. Count to 10. Scream.",
      "It jams when it senses deadlines.",
      "Paper jam is a lifestyle at this point.",
    ],
  },
  {
    starter: "Standup in 5, be ready.",
    responses: [
      "At 5?! Am or Pm?",
      "The standup ran 40 minutes. Nobody stood.",
      "I'll say 'no blockers'. I always say it.",
      "I rehearsed 'no blockers' twice.",
      "Five minutes? So, in 40 then.",
    ],
  },
  {
    starter: "Coffee? I just had 4.",
    responses: [
      "That is not a drink, that is a lifestyle.",
      "My blood type is espresso.",
      "Amateur. My IV bag is espresso.",
      "Four? That is a warm-up sip.",
      "Careful. The fifth one sees through time.",
    ],
  },
  {
    starter: "The wifi is being weird today.",
    responses: [
      "Have you tried sacrificing a router?",
      "It works. Nobody knows why. Touch nothing.",
      "Have you tried believing in it?",
      "It is not weird. It is haunted.",
      "The router heard you. It is offended.",
    ],
  },
  {
    starter: "Is he still staring at me?",
    responses: [
      "Shh... They are watching...",
      "Act natural. Open a spreadsheet.",
      "He knows you ate his pierogi.",
      "Wave back. Assert dominance.",
      "Slowly raise your sandwich. Claim it.",
    ],
  },
  {
    starter: "What Freud would say about that bat?",
    responses: [
      "I guess it's some bat-complex",
      "He bills by the hour. Just like us.",
      "It is a father figure with wings.",
      "Repressed dependencies. Classic.",
      "Everyone projects onto that bat.",
    ],
  },
  {
    starter: "Have you seen my pierogi?",
    responses: [
      "Check the fridge. Then check Burek.",
      "The fridge is a lossy storage system.",
      "Define 'seen'. Define 'your'.",
      "The fridge logs everything now.",
      "Burek pleads the fifth.",
    ],
  },
  {
    starter: "I'm not asleep, I'm doing deep mental architecture.",
    responses: [
      "With the eyes closed? Advanced technique.",
      "Save often. And maybe breathe too.",
      "The architecture has a snore module.",
      "Deploying to dreamland again?",
      "The deadline moves. The nap stays.",
    ],
  },
  {
    starter: "Did you see the game last night?",
    responses: [
      "I only watch esports. Same heartbreak.",
      "I fell asleep at halftime. Again.",
      "Was it on a screen? Then yes, a spreadsheet.",
      "I watch CI pipelines. Same drama.",
      "Sports are just IRL matchmaking.",
    ],
  },
  {
    starter: "This office is freezing again.",
    responses: [
      "I'm dressed for the tundra.",
      "Facilities says 18 degrees is 'energy efficient'.",
      "Type faster. It is the only heat source.",
      "HR issued blankets. As a perk.",
      "Wear the company hoodie. It is branded.",
    ],
  },
  {
    starter: "Another meeting that could've been an email.",
    responses: [
      "It could've been a nap.",
      "I billed an hour to 'synergy'.",
      "It could have been a sticky note.",
      "I scheduled a meeting about the meeting.",
      "Subject: 'quick sync'. Immediately doom.",
    ],
  },
  {
    starter: "Someone brought cake. Kitchen. Now.",
    responses: [
      "I'm only here for the cake.",
      "HR said no candles. Fire code.",
      "Cake is a valid deployment trigger.",
      "Save me frosting. This is vital.",
      "Diet starts after the cake. Standard.",
    ],
  },
  {
    starter: "Marketing hit 10k followers today.",
    responses: [
      "Half are bots. The good half.",
      "Do the bots click the ads though?",
      "And 9,999 are bots. One is a mom.",
      "Do they come to the webinar though?",
      "Engagement is engaged to the bots.",
    ],
  },
  {
    starter: "The client asked for 'something pop' again.",
    responses: [
      "Tell them pop costs extra.",
      "Make it bigger. Make it POP.",
      "Comic Sans. That will show them.",
      "Everything pops if the CDN is down.",
      "Client asked for 'wow'. That costs extra.",
    ],
  },
  // --- Finance exchanges (Grazyna the accountant, Zosia the manager)
  {
    starter: "Quarter closes on Friday. No expenses.",
    topic: "finance",
    responses: [
      "I've been charging snacks to 'team building'.",
      "My budget spreadsheet has trust issues.",
      "Friday? I cannot even close a tab.",
      "Expenses? The coffee counts as R&D.",
      "My wallet filed for overtime.",
    ],
  },
  {
    starter: "The audit found a receipt for a single bean.",
    topic: "finance",
    responses: [
      "That bean was a team lunch. Allegedly.",
      "Write it off as morale.",
      "One bean? Flexing on the budget.",
      "Was it organic? Then it is two lines.",
      "The bean had better prospects.",
    ],
  },
  {
    starter: "Invoices go out today.",
    topic: "finance",
    responses: [
      "May the payment terms be ever in our favor.",
      "Net 60 means they pay in 60 years, right?",
      "May they return from the dead.",
      "Stamp it with hope and Net 30.",
      "Clients pay in exposure and vibes.",
    ],
  },
  {
    starter: "The budget forecast reads like a horror story.",
    topic: "finance",
    responses: [
      "Excel said yes, reality said no.",
      "We are one coffee run from bankruptcy.",
      "Spoiler: the money dies.",
      "Chapter two is the coffee budget.",
      "The forecast is 'no'. In red.",
    ],
  },
  {
    starter: "Expense report denied. Again.",
    topic: "finance",
    responses: [
      "The hammock was for ergonomics!",
      "Write it off as team building.",
      "Grazyna smells receipts in her sleep.",
      "Receipts? In this economy?",
      "It was labeled 'research'. Legally.",
    ],
  },
  {
    starter: "Payroll is done. Someone cried.",
    topic: "finance",
    responses: [
      "Happy tears or net-gross tears?",
      "Brutto to netto is a scam arc.",
      "Gross pay is a rumor started by HR.",
      "I get paid in coffee and stress.",
      "Net pay is a jump scare.",
    ],
  },
  {
    starter: "New cost cutting: the good pens.",
    topic: "finance",
    responses: [
      "RIP the pens that wrote in gold.",
      "Next they take our second monitor.",
      "The pen budget died for our sins.",
      "The fancy pens fled to a startup.",
      "First they came for the pens.",
    ],
  },
  {
    starter: "I balanced the books. By hand. Once.",
    topic: "finance",
    responses: [
      "You are the chosen accountant.",
      "Did it balance, or did you decide?",
      "The books fear her now.",
      "She IS the audit. Run.",
      "The spreadsheet balanced itself. Scary.",
    ],
  },
  // --- Janitor exchanges (Janusz only, C-46 amendment story) -------
  // Janusz was hired to clean, quietly automated his own job with a
  // self-built AI cleaning-bot fleet, and since nobody ever checked
  // his contract he has been shipping code as a "developer" for
  // years. He keeps the mop "for old times' sake".
  {
    starter: "I was hired to mop. Nobody asked about the commits.",
    topic: "janitor",
    responses: [
      "Wait, YOU rewrote the deploy script?",
      "The mop pays less. The code ships more.",
      "The Roomba union will hear of this.",
      "Push to prod with a mop in hand.",
      "Clean code. Literally. It is mopped.",
    ],
  },
  {
    starter: "My cleaning bots handle floor two now.",
    topic: "janitor",
    responses: [
      "The Roomba fleet has better uptime than prod.",
      "Did you name them? Please tell me you did.",
      "Do they bill by the square metre?",
      "Floor two is now self-cleaning.",
      "Do they do code reviews too?",
    ],
  },
  {
    starter: "My server rack lives in the janitor closet.",
    topic: "janitor",
    responses: [
      "Best uptime per square metre in the building.",
      "The mop is load-bearing. Don't ask.",
      "Closet compute is the future.",
      "The closet has better AC than us.",
      "Ping is low. Soap is high.",
    ],
  },
  // --- Sales exchanges (C-47: told AT the Deal Wall) ---------------
  // Affinity: przemek (Sales), kasia (Recruiter), zosia (Manager),
  // dawid (CEO - he comes over to stare at the numbers).
  {
    starter: "Deal Wall update: we are number one!",
    topic: "sales",
    responses: [
      "Number one from the bottom?",
      "The bar was on the floor anyway.",
      "Screenshot it before Friday.",
      "Number one in spirit. The wall lies.",
      "The wall is aspirational.",
    ],
  },
  {
    starter: "The client ghosted the demo again.",
    topic: "sales",
    responses: [
      "Follow up with a meme. Works 60% of the time.",
      "Add them to the 'maybe' graveyard.",
      "Their 'no' was a 'not yet'. Probably.",
      "Ghosting is their love language.",
      "Read at 9:41. Silence since.",
    ],
  },
  {
    starter: "Q3 quota is a fantasy novel.",
    topic: "sales",
    responses: [
      "Epic. Tragic. Fictional.",
      "I sell hope and dashboard numbers.",
      "Rename it 'stretch goals' and breathe.",
      "Three books. None with an ending.",
      "The sequel is worse: Q4.",
    ],
  },
  {
    starter: "I closed the Acme renewal!",
    topic: "sales",
    responses: [
      "Ring the bell! Quietly. Finance is auditing.",
      "What discount did that renewal cost us?!",
      "Add it to the wall before someone else does.",
      "Acme renewed?! Quick, before they think.",
      "Invoice before legal reads it.",
    ],
  },
  {
    starter: "The lead list is just my LinkedIn feed.",
    topic: "sales",
    responses: [
      "At least your feed has leads.",
      "Connection requested. Now we pray.",
      "My inbox is 99% 'just circling back'.",
      "My feed is just influencers suing.",
      "Did you try liking everything?",
    ],
  },
  {
    starter: "Client wants 'AI integration' by Monday.",
    topic: "sales",
    responses: [
      "Does a rubber duck count as AI?",
      "Put a chatbot on the invoice. Done.",
      "It already autocorrects. Half done.",
      "Monday? So, never. Perfect.",
      "AI = 'Already Improved'. Ship it.",
    ],
  },
  {
    starter: "Cracked a call with the fleet buyer!",
    topic: "sales",
    responses: [
      "The taxi fleet? We sell software.",
      "A lead is a lead. Board it up.",
      "Add it to the wall. Any wall.",
      "Every call is a demo if you believe.",
      "We pivot to taxis. Write it down.",
    ],
  },
  {
    starter: "Sales deck slide 9 explains slide 3.",
    topic: "sales",
    responses: [
      "Slides 1 to 12 are one word: trust.",
      "Cut it. The logo pops more now.",
      "The deck is a tarot reading anyway.",
      "Slide 10 is just the word 'why'.",
      "The deck has lore now.",
    ],
  },
  // --- Marketing exchanges (C-47: told AT the Content Booth) -------
  // Affinity: ania (Marketing), klaudia (Influencer), zosia, dawid.
  {
    starter: "Filming a reel by the brand wall. Need a hand?",
    topic: "marketing",
    responses: [
      "Only if I don't have to talk.",
      "Can Burek cameo? He sells.",
      "Crop the server rack out. Again.",
      "Wait, we have a brand wall?",
      "Hold this light. Be the wall.",
    ],
  },
  {
    starter: "Our engagement is up 300%!",
    topic: "marketing",
    responses: [
      "From what? A screenshot of a spreadsheet?",
      "Three likes to twelve. Growth.",
      "The bots love us this quarter.",
      "300% of zero is still zero.",
      "Chart goes up. Morale goes down.",
    ],
  },
  {
    starter: "The logo must be bigger. Client's words.",
    topic: "marketing",
    responses: [
      "Bigger logo, smaller website.",
      "Make it POP. Make it PURPLE.",
      "Tell them the logo IS the product.",
      "Soon the logo will need a desk.",
      "Bigger logo. Smaller meaning.",
    ],
  },
  {
    starter: "Synergy workshop at 3. Bring Post-its.",
    topic: "marketing",
    responses: [
      "I'll bring buzzword bingo instead.",
      "Is 'synergy' load-bearing this quarter?",
      "Only if there's cake synergy.",
      "I am bringing a dictionary for 'synergy'.",
      "Post-its are the real deliverable.",
      "I will bring buzzwords. I have spares.",
    ],
  },
  {
    starter: "The campaign needs a mascot. Ideas?",
    topic: "marketing",
    responses: [
      "Burek. He works for treats.",
      "A cloud. Named Synergy.",
      "Marketing is mostly mascot science.",
      "A cloud with sunglasses. Deal.",
      "The mascot gets equity. Burek agrees.",
    ],
  },
  {
    starter: "Our hashtag is trending. In one city.",
    topic: "marketing",
    responses: [
      "Was it the right city?",
      "Any city is brand awareness.",
      "Screenshot it before it stops.",
      "Which city? Krasnystaw? Great.",
      "Trending locally is still trending.",
    ],
  },
  {
    starter: "CEO wants to 'do a podcast'.",
    topic: "marketing",
    responses: [
      "About what? Vision? Bees?",
      "Everyone quits before episode two.",
      "His 'hello, mic check' is already viral.",
      "Episode one: silence. Iconic.",
      "He will name it 'Vision Cast'. Run.",
    ],
  },
  {
    starter: "A/B test says everything wins.",
    topic: "marketing",
    responses: [
      "Then the test was a group hug.",
      "Ship both. Let the users fight.",
      "The B was for 'budget', right?",
      "C testing shipped straight to prod.",
      "The test tested itself. Passed.",
    ],
  },
];

/**
 * Which NON-general topics each NPC may start. Everyone may always
 * start general exchanges. Absent = general only. Per the C-46
 * amendment: techies + CEO tell IT jokes; Grazyna (accountant) and
 * Zosia (manager) tell finance ones; Janusz tells janitor ones.
 * C-47: sales topics for przemek/kasia (+ zosia, dawid), marketing
 * topics for ania/klaudia (+ zosia, dawid) - the revenue corner.
 */
export const SPEAKER_TOPICS: Readonly<Record<string, readonly ChatterTopic[]>> = {
  bartek: ["it"],
  tomek: ["it"],
  marek: ["it"],
  maciek: ["it"],
  pawel: ["it"],
  dawid: ["it", "sales", "marketing"],
  zosia: ["finance", "it", "sales", "marketing"],
  grazyna: ["finance"],
  janusz: ["janitor"],
  przemek: ["sales"],
  kasia: ["sales"],
  ania: ["marketing"],
  klaudia: ["marketing"],
  // marek (DevOps), burek (dog) -> general only.
};

/** Flat union of every line in OFFICE_CHATTER. Kept as a named export
 *  for the pool-separation tests (lunch / dog pools must not overlap
 *  it) and for any consumer that just wants all work-chatter lines. */
export const INTER_NPC_LINES: string[] = OFFICE_CHATTER.flatMap((exchange) => [
  exchange.starter,
  ...exchange.responses,
]);

/**
 * Chattiness weights (C-46, Lucas: "lower the chance of talking for
 * outsiders (CTO and DevOps), maybe make it higher for typical
 * talkative people (marketing, sales?)"). The weight only decides who
 * STARTS an exchange inside an already-chosen close pair; it does not
 * gate whether a pair talks. Unlisted NPCs weigh 1.
 */
export const TALKATIVE_WEIGHTS: Readonly<Record<string, number>> = {
  // Talkative: sales, marketing, recruiting, LinkedIn, management.
  przemek: 1.8, // Sales
  ania: 1.8, // Marketing & Synergy
  klaudia: 1.6, // The LinkedIn Influencer
  kasia: 1.5, // The Recruiter
  zosia: 1.2, // The Manager
  pawel: 1.2, // The Intern
  // Baseline.
  bartek: 1.0, // Senior Consultant
  tomek: 1.0, // Junior Developer
  burek: 1.0, // Office Dog
  // Quiet.
  grazyna: 0.7, // The Accountant
  janusz: 0.6, // The Janitor (with the highest uptime in the building)
  marek: 0.4, // DevOps / 10x Engineer (lunch outsider)
  maciek: 0.3, // The CTO (lunch outsider)
  dawid: 0.3, // The CEO
};

export function chatterWeightFor(npcId: string): number {
  return TALKATIVE_WEIGHTS[npcId] ?? 1;
}

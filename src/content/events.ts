/**
 * Random Office Events pool.
 *
 * Fired by the orchestrator on time-of-day transitions (morning -> afternoon
 * -> evening -> next morning). Each event is a small slice of IT-office life
 * with toast copy plus reducer-shaped effects. Comedy style: IT Crowd meets
 * Silicon Valley, trainer-flavored.
 */

export type Period = "morning" | "afternoon" | "evening";

export type StatName = "credibility" | "caffeine" | "patience" | "focus";

export type EventNpcId =
  | "klaudia"
  | "marek"
  | "zosia"
  | "pawel"
  | "bartek"
  | "kasia"
  | "tomek"
  | "ania"
  | "janusz"
  | "burek"
  | "grazyna"
  | "maciek"
  | "przemek";

export type RandomEventEffect =
  | { type: "add-cash"; delta: number }
  | { type: "spend-cash"; delta: number }
  | { type: "add-stat"; stat: StatName; delta: number }
  | { type: "add-relationship"; npcId: EventNpcId; delta: number }
  | { type: "set-flag"; flag: string; value: true };

export interface RandomEvent {
  /** Kebab-friendly slug, e.g. "slack-mention". */
  id: string;
  /** Weight (higher = more likely). Roughly 1-10, sum of all weights should be ~100. */
  weight: number;
  /** Time-of-day filter. If set, event only fires during these periods. */
  periods?: Array<"morning" | "afternoon" | "evening">;
  /** Hard requirements: a flag must be set (true) for the event to be available. */
  requiresFlags?: string[];
  /** Hard requirements: a flag must be NOT set (false) for the event to be available. */
  blocksFlags?: string[];
  /** Headline toast text the player sees. Should be 1 short sentence, punchy, IT-flavored. */
  toast: string;
  /** Optional secondary toast line (e.g. "you gained focus."). Keep it under 30 chars. */
  subline?: string;
  /** Toast type: 'info' | 'success' | 'warning' | 'error'. */
  toastType: "info" | "success" | "warning" | "error";
  /** Effects applied to game state when the event fires. */
  effects: RandomEventEffect[];
}

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: "slack-quick-sync",
    weight: 5,
    toast: "Bartek pinged #general with @here: 'quick sync?' - it is neither quick nor a sync, and you cannot attend a 45-minute meeting about meeting cadence.",
    subline: "-3 patience",
    toastType: "warning",
    effects: [{ type: "add-stat", stat: "patience", delta: -3 }],
  },
  {
    id: "coffee-machine-broken",
    weight: 3,
    toast: "The coffee machine is making a sound no machine should make - you bail to the gas station cafe downstairs and pay 15 zl for something legally adjacent to coffee.",
    subline: "-15 zl, +8 caffeine",
    toastType: "warning",
    effects: [
      { type: "spend-cash", delta: 15 },
      { type: "add-stat", stat: "caffeine", delta: 8 },
      { type: "set-flag", flag: "event-coffee-broken", value: true },
    ],
  },
  {
    id: "coffee-machine-avenged",
    weight: 2,
    requiresFlags: ["event-coffee-broken"],
    blocksFlags: ["event-coffee-fixed"],
    toast: "The coffee machine works again - nobody knows who fixed it, but Janusz is quietly smiling and smells faintly of descaler.",
    subline: "+10 caffeine",
    toastType: "success",
    effects: [
      { type: "add-stat", stat: "caffeine", delta: 10 },
      { type: "add-relationship", npcId: "janusz", delta: 2 },
      { type: "set-flag", flag: "event-coffee-fixed", value: true },
    ],
  },
  {
    id: "recruiter-dm-java",
    weight: 3,
    toast: "A recruiter slid into your DMs: 'perfect role for you!' - the role is a Java 6 insurance monolith, fully on-site, and you last wrote Java in 2014 (a hello world, since deleted).",
    subline: "-5 patience, oof",
    toastType: "info",
    effects: [
      { type: "add-stat", stat: "patience", delta: -5 },
      { type: "add-stat", stat: "credibility", delta: -5 },
    ],
  },
  {
    id: "birthday-cake",
    weight: 2,
    periods: ["morning", "afternoon"],
    toast: "It's someone's birthday - you don't know whose, the card just says 'Happy Birthday Tomek??' - and the office shames you into chipping in for the cake.",
    subline: "-50 zl, +5 patience",
    toastType: "success",
    effects: [
      { type: "spend-cash", delta: 50 },
      { type: "add-stat", stat: "patience", delta: 5 },
      { type: "add-stat", stat: "focus", delta: 3 },
    ],
  },
  {
    id: "fire-drill",
    weight: 2,
    periods: ["morning", "afternoon"],
    toast: "Fire drill - two hundred people stand in the parking lot in silence, enjoying fresh air and nicotine, while the alarm murders everyone's flow.",
    subline: "-5 focus, +2 patience",
    toastType: "warning",
    effects: [
      { type: "add-stat", stat: "focus", delta: -5 },
      { type: "add-stat", stat: "patience", delta: 2 },
    ],
  },
  {
    id: "printer-jam",
    weight: 3,
    toast: "Tomek's printer is jammed again, paper everywhere like confetti at the world's saddest parade - you fix it in four minutes and become the office hero.",
    subline: "the legend grows",
    toastType: "info",
    effects: [
      { type: "add-stat", stat: "patience", delta: -3 },
      { type: "add-stat", stat: "credibility", delta: 2 },
      { type: "add-relationship", npcId: "tomek", delta: 2 },
    ],
  },
  {
    id: "client-1730-email",
    weight: 4,
    periods: ["afternoon", "evening"],
    toast: "Client email at 17:30: 'just one quick thing' - it is never one, it is never quick, and it is never before 17:30.",
    subline: "-10 patience",
    toastType: "error",
    effects: [
      { type: "add-stat", stat: "patience", delta: -10 },
      { type: "add-stat", stat: "focus", delta: -5 },
    ],
  },
  {
    id: "marek-pizza",
    weight: 2,
    toast: "Marek ordered 'way too much pizza' again - the man negotiates with delivery apps like it's an enterprise contract, and everyone wins.",
    subline: "+10 patience, -30 zl",
    toastType: "success",
    effects: [
      { type: "spend-cash", delta: 30 },
      { type: "add-stat", stat: "patience", delta: 10 },
    ],
  },
  {
    id: "ceo-walkthrough",
    weight: 2,
    toast: "Maciek is doing a 'casual walkthrough' - nothing says casual like a CEO slowly reading your second monitor like a museum exhibit.",
    subline: "-5 focus",
    toastType: "warning",
    effects: [
      { type: "add-stat", stat: "focus", delta: -5 },
      { type: "add-stat", stat: "credibility", delta: 2 },
    ],
  },
  {
    id: "burek-demands-pets",
    weight: 3,
    toast: "Burek the office dog materializes at your desk and demands pets with the confidence of a stakeholder demanding a status update - you comply, obviously.",
    subline: "+8 patience, good boy",
    toastType: "success",
    effects: [
      { type: "add-stat", stat: "patience", delta: 8 },
      { type: "add-stat", stat: "focus", delta: 5 },
      { type: "add-relationship", npcId: "burek", delta: 3 },
    ],
  },
  {
    id: "janusz-life-advice",
    weight: 2,
    toast: "Janusz the janitor pauses mid-mop and delivers the secret to a good life: 'naps... and never learning Outlook' - the man is a philosopher.",
    subline: "+5 patience",
    toastType: "info",
    effects: [
      { type: "add-stat", stat: "patience", delta: 5 },
      { type: "add-stat", stat: "credibility", delta: 2 },
      { type: "add-relationship", npcId: "janusz", delta: 2 },
    ],
  },
  {
    id: "coffee-on-keyboard",
    weight: 3,
    toast: "Your coffee and your keyboard have finally merged - a beautiful union, a catastrophic outcome, RIP to both (mostly the keyboard).",
    subline: "-10 caffeine, RIP",
    toastType: "error",
    effects: [
      { type: "add-stat", stat: "caffeine", delta: -10 },
      { type: "add-stat", stat: "patience", delta: -5 },
    ],
  },
  {
    id: "tomek-pushed-to-main",
    weight: 3,
    toast: "Tomek pushed straight to main 'to save time' - production is on fire, and not the good kind of fire that ends with a retro and free pizza.",
    subline: "-10 credibility",
    toastType: "error",
    effects: [
      { type: "add-stat", stat: "patience", delta: -5 },
      { type: "add-stat", stat: "credibility", delta: -10 },
    ],
  },
  {
    id: "klaudia-carousel",
    weight: 2,
    toast: "Klaudia posted a new LinkedIn carousel ('10 Habits of 10x Devs - #7 will shock you') - it is somehow actually informative and you hate that.",
    subline: "+3 credibility",
    toastType: "info",
    effects: [
      { type: "add-stat", stat: "patience", delta: -5 },
      { type: "add-stat", stat: "credibility", delta: 3 },
    ],
  },
  {
    id: "kasia-referral-bounty",
    weight: 2,
    toast: "Kasia's 'exciting opportunity' is a Java role - you forward it to Marek, collect the 50 zl referral bounty, and feel a little dead inside.",
    subline: "+50 zl, dirty money",
    toastType: "info",
    effects: [
      { type: "add-stat", stat: "patience", delta: -5 },
      { type: "add-cash", delta: 50 },
    ],
  },
  {
    id: "ania-synergy-webinar",
    weight: 3,
    toast: "Ania wants you to 'hop on a quick 30-min thought-leadership synergy webinar drop' - every word in that sentence has been interrogated and none of them confessed.",
    subline: "-10 patience",
    toastType: "warning",
    effects: [
      { type: "add-stat", stat: "patience", delta: -10 },
      { type: "add-stat", stat: "focus", delta: -5 },
    ],
  },
  {
    id: "przemek-circles-back",
    weight: 5,
    toast: "Przemek is 'circling back' on the email you answered two days ago, asking exactly what you answered two days ago - you consider circling back to a farm.",
    subline: "-5 patience",
    toastType: "warning",
    effects: [{ type: "add-stat", stat: "patience", delta: -5 }],
  },
  {
    id: "free-coffee-kitchen",
    weight: 1,
    periods: ["morning"],
    toast: "Someone made a fresh pot of actually good coffee and left it in the kitchen with a sticky note: 'for whoever needs it' - the office can be beautiful.",
    subline: "+20 caffeine",
    toastType: "success",
    effects: [
      { type: "add-stat", stat: "caffeine", delta: 20 },
      { type: "add-stat", stat: "patience", delta: 3 },
    ],
  },
  {
    id: "suspiciously-quiet",
    weight: 2,
    toast: "It's quiet - suspiciously quiet, the kind of quiet that precedes either deep work or a group chat about who deleted the database - and you get two hours of pure focus.",
    subline: "+15 focus",
    toastType: "success",
    effects: [{ type: "add-stat", stat: "focus", delta: 15 }],
  },
  {
    id: "wifi-down",
    weight: 2,
    toast: "WiFi is down, IT is 'on it', and you spend twenty minutes staring at a wall realizing you have no skills without an internet connection - lovely wall, though.",
    subline: "-15 focus, +5 patience",
    toastType: "warning",
    effects: [
      { type: "add-stat", stat: "focus", delta: -15 },
      { type: "add-stat", stat: "patience", delta: 5 },
    ],
  },
  {
    id: "actions-quota-exceeded",
    weight: 3,
    toast: "GitHub Actions quota exceeded at 60% of the month - free tier strikes again and you quietly expense the team plan yourself.",
    subline: "-20 zl",
    toastType: "error",
    effects: [
      { type: "add-stat", stat: "focus", delta: -5 },
      { type: "spend-cash", delta: 20 },
    ],
  },
  {
    id: "so-answer-viral",
    weight: 2,
    toast: "Your four-year-old Stack Overflow answer about a CSS z-index nightmare got fifty upvotes overnight - you have peaked, and it happened while you slept.",
    subline: "+5 credibility",
    toastType: "success",
    effects: [
      { type: "add-stat", stat: "credibility", delta: 5 },
      { type: "add-stat", stat: "focus", delta: 10 },
    ],
  },
  {
    id: "standup-should-be-email",
    weight: 3,
    periods: ["afternoon"],
    toast: "The daily standup ran forty minutes because Bartek described his weekend 'as a user story' - this meeting should have been an email, which should also not exist.",
    subline: "-5 patience",
    toastType: "warning",
    effects: [
      { type: "add-stat", stat: "patience", delta: -5 },
      { type: "add-stat", stat: "focus", delta: -2 },
    ],
  },
  {
    id: "pawel-quick-question",
    weight: 3,
    toast: "Pawel the intern has 'a quick question' - fifty minutes later you have rewritten his entire mental model of DNS, and yourself as a mentor.",
    subline: "+2 credibility",
    toastType: "info",
    effects: [
      { type: "add-stat", stat: "patience", delta: -5 },
      { type: "add-stat", stat: "credibility", delta: 2 },
      { type: "add-relationship", npcId: "pawel", delta: 3 },
    ],
  },
  {
    id: "maciek-ai-pivot",
    weight: 3,
    toast: "Maciek has discovered AI and made a slide titled 'The AI Pivot' - the slide contains the word 'synergy' fourteen times and zero strategy.",
    subline: "-5 focus",
    toastType: "warning",
    effects: [
      { type: "add-stat", stat: "focus", delta: -5 },
      { type: "add-stat", stat: "credibility", delta: 1 },
    ],
  },
  {
    id: "zosia-status-update",
    weight: 3,
    toast: "Zosia asks for a 'quick status update' - you write three bullet points so clean she reads them aloud in the management meeting, with your name attached.",
    subline: "+5 credibility",
    toastType: "info",
    effects: [
      { type: "add-stat", stat: "patience", delta: -3 },
      { type: "add-stat", stat: "credibility", delta: 5 },
      { type: "add-relationship", npcId: "zosia", delta: 2 },
    ],
  },
  {
    id: "grazyna-expense-report",
    weight: 3,
    toast: "Grazyna from accounting materializes: expense reports were due Friday and 'no, a screenshot of the receipt is not the receipt' - you eat the loss.",
    subline: "-50 zl",
    toastType: "error",
    effects: [
      { type: "spend-cash", delta: 50 },
      { type: "add-stat", stat: "patience", delta: -5 },
    ],
  },
  {
    id: "klaudia-tags-you",
    weight: 3,
    toast: "Klaudia tagged you in a LinkedIn post about 'team heroes' - the photo of you is mid-sneeze, the comments are all 'so inspiring', and engagement is engagement.",
    subline: "-10 patience",
    toastType: "warning",
    effects: [
      { type: "add-stat", stat: "patience", delta: -10 },
      { type: "add-stat", stat: "credibility", delta: 2 },
    ],
  },
  {
    id: "all-hands-no-agenda",
    weight: 3,
    periods: ["morning"],
    toast: "There's an all-hands - there is no agenda, there is no food, and the word 'alignment' is doing more lifting than the entire engineering team.",
    subline: "-10 patience",
    toastType: "warning",
    effects: [
      { type: "add-stat", stat: "patience", delta: -10 },
      { type: "add-stat", stat: "focus", delta: -5 },
    ],
  },
  {
    id: "zosia-plant-wilting",
    weight: 2,
    toast: "Zosia's desk plant is wilting dramatically, like a developer at hour nine of a deployment - you water it and feel weirdly accomplished.",
    subline: "small victories",
    toastType: "info",
    effects: [
      { type: "add-stat", stat: "focus", delta: -1 },
      { type: "add-stat", stat: "patience", delta: 1 },
    ],
  },
  {
    id: "three-pm-wall",
    weight: 3,
    periods: ["afternoon"],
    toast: "The 3pm wall arrives on schedule - your body demands sugar, your brain demands YouTube, and your calendar demands a 'working session' you will attend as a ghost.",
    subline: "-8 focus",
    toastType: "warning",
    effects: [{ type: "add-stat", stat: "focus", delta: -8 }],
  },
  {
    id: "birthday-spam",
    weight: 2,
    toast: "Three people you met at a hackathon in 2019 have wished you a happy birthday on LinkedIn - it is not your birthday, but the emojis are nice.",
    subline: "pure flavor",
    toastType: "info",
    effects: [],
  },
  {
    id: "usb-stick-mystery",
    weight: 2,
    toast: "You found a USB stick labeled 'BACKUP_FINAL_v3_ACTUAL' - you will not plug it in, you absolutely will not plug it in (you are plugging it in).",
    subline: "pure flavor",
    toastType: "info",
    effects: [],
  },
  {
    id: "acme-2px-logo",
    weight: 3,
    requiresFlags: ["got-acme-contract"],
    toast: "ACME filed a 'critical' ticket: the logo is 2px off - you fix it in five minutes, bill it as an hour, and feel the warm glow of consultancy.",
    subline: "+40 zl",
    toastType: "info",
    effects: [
      { type: "add-stat", stat: "patience", delta: -8 },
      { type: "add-cash", delta: 40 },
    ],
  },
  {
    id: "friday-4pm-deploy",
    weight: 2,
    periods: ["afternoon"],
    toast: "Someone is deploying to prod at 4pm and Marek is whispering 'it's fine, it's fine' - statistically, it is not fine.",
    subline: "-4 patience",
    toastType: "warning",
    effects: [{ type: "add-stat", stat: "patience", delta: -4 }],
  },
  {
    id: "reply-all-storm",
    weight: 2,
    toast: "A reply-all storm is raging in a thread with forty-seven recipients - subject line 'RE: FW: RE: lunch?', and no lunch was ever agreed upon.",
    subline: "-4 patience",
    toastType: "warning",
    effects: [{ type: "add-stat", stat: "patience", delta: -4 }],
  },
  {
    id: "newsletter-hydra",
    weight: 2,
    toast: "You unsubscribe from a newsletter and two more arrive - cut one head off, two grow back, and one of them is somehow about Kubernetes now.",
    subline: "pure flavor",
    toastType: "info",
    effects: [],
  },
  {
    id: "mystery-profile-view",
    weight: 2,
    toast: "Someone from 'Confidential Company' viewed your LinkedIn profile - thrilling, terrifying, and almost certainly a bot selling lead-gen.",
    subline: "pure flavor",
    toastType: "info",
    effects: [],
  },
  {
    id: "evening-empty-office",
    weight: 2,
    periods: ["evening"],
    toast: "It's evening and the office is empty except for monitor glow and one distant keyboard - you feel like the last developer on Earth, and honestly, it's kind of great.",
    subline: "+10 focus",
    toastType: "success",
    effects: [
      { type: "add-stat", stat: "focus", delta: 10 },
      { type: "add-stat", stat: "patience", delta: 5 },
    ],
  },
  {
    id: "acme-early-bonus",
    weight: 1,
    requiresFlags: ["got-acme-contract"],
    toast: "ACME paid the invoice early and added a 150 zl bonus for 'responsiveness' - you answered one email at 6am once, and legends are built this way.",
    subline: "+150 zl (rare!)",
    toastType: "success",
    effects: [
      { type: "add-cash", delta: 150 },
      { type: "add-stat", stat: "credibility", delta: 3 },
    ],
  },
];

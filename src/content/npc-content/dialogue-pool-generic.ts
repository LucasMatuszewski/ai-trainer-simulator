/**
 * WS3 dialogue v2 pool — GENERIC fallback (C-77).
 *
 * Pure authored data. This is the pool any conversation falls back onto
 * when every authored thread is exhausted: small talk that is NEVER
 * memory-suppressed and can never dead-end. The replies are written
 * NPC-neutral (any colleague can plausibly say them) but keep the office's
 * ironic register. It carries NO task offers on purpose — NPC-specific
 * tasks must never be re-offered from a fallback pool.
 *
 * Registered nowhere: it is exported for the turn builder's exit set.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const GENERIC_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "generic",
  topics: [
    {
      id: "generic:smalltalk",
      label: "Small talk",
      optionCandidates: [
        {
          id: "generic:smalltalk:opt-1",
          topicId: "generic:smalltalk",
          text: "How is your day going?",
        },
        {
          id: "generic:smalltalk:opt-2",
          topicId: "generic:smalltalk",
          text: "Busy week?",
        },
        {
          id: "generic:smalltalk:opt-3",
          topicId: "generic:smalltalk",
          text: "Any plans for the weekend?",
          tags: ["period:afternoon"],
        },
        {
          id: "generic:smalltalk:opt-4",
          topicId: "generic:smalltalk",
          text: "Crazy weather, right?",
        },
        {
          id: "generic:smalltalk:opt-5",
          topicId: "generic:smalltalk",
          text: "Did you see the fridge in the kitchen?",
        },
        {
          id: "generic:smalltalk:opt-6",
          topicId: "generic:smalltalk",
          text: "Long day, huh?",
        },
      ],
      replyCandidates: [
        {
          id: "generic:smalltalk:rep-1",
          text: "Same as every day here: the tickets multiply, the coffee disappears, and somehow that counts as synergy. But nobody has unplugged anything important since 2019, so by this office's standards it is a good day.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:smalltalk:rep-2",
          text: "Busy the way a server is busy. Mostly waiting, occasionally on fire. I have been in three meetings about a meeting, and the meeting about the meeting ran over. We are scheduling a retrospective. This is my life now.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:smalltalk:rep-3",
          text: "The weekend is a roadmap item. It is on the doc, it is color-coded green, and it slides right every Friday at five. Optimistically: laundry and pretending the laptop is closed. Realistically: the laptop sleeps with one eye open.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:smalltalk:rep-4",
          text: "The weather is the one system nobody has deployed to. No changelog, no incidents, nobody pinging me at 3am about atmospheric regressions. I respect it enormously.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:smalltalk:rep-5",
          text: "The fridge is a natural disaster with a door. There is a yoghurt in there that predates two performance review cycles. Nobody claims it. Nobody dares throw it out. It has become senior to all of us.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:smalltalk:rep-6",
          text: "Long? It is 4pm and I have already lived three sprints. But the printer has not printed anything, which means nothing has gone permanently wrong. Around here, silence from the hardware is the sound of success.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "generic:office-lore",
      label: "Office life",
      optionCandidates: [
        {
          id: "generic:office-lore:opt-1",
          topicId: "generic:office-lore",
          text: "What is standup like here?",
        },
        {
          id: "generic:office-lore:opt-2",
          topicId: "generic:office-lore",
          text: "Is the printer really still broken?",
        },
        {
          id: "generic:office-lore:opt-3",
          topicId: "generic:office-lore",
          text: "Have you met Burek?",
        },
        {
          id: "generic:office-lore:opt-4",
          topicId: "generic:office-lore",
          text: "What does this company actually do?",
        },
        {
          id: "generic:office-lore:opt-5",
          topicId: "generic:office-lore",
          text: "Why is there a giant Batman in the CEO office?",
        },
        {
          id: "generic:office-lore:opt-6",
          topicId: "generic:office-lore",
          text: "Do the robots really do the chores?",
        },
      ],
      replyCandidates: [
        {
          id: "generic:office-lore:rep-1",
          text: "Standup is fifteen minutes scheduled for thirty. You say what you did, what you will do, and everyone says 'blocked on the printer'. It is the only statement that has remained true for six years. That kind of consistency deserves respect.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:office-lore:rep-2",
          text: "'Broken' implies it once worked and might again. The printer is in a stable relationship with the wall. IT calls it decommissioned, accounting calls it amortized, and the rest of us call it Marek's coffee maker. Everyone is right.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:office-lore:rep-3",
          text: "Burek is the only one here who has never checked Slack and never will. He sleeps through standups, deadlines, and at least one fire drill a quarter. If you want to know what peace looks like in this economy, it is forty kilograms and it is asleep by the window.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:office-lore:rep-4",
          text: "DevPowers builds software, Edukey teaches people, and somewhere in between an invoice is born. I stopped asking for details in 2022. Every answer was a synonym for 'meetings' with better branding.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:office-lore:rep-5",
          text: "Brand agency, forty thousand zloty, 'a bold brand anchor'. They delivered, literally, a bat. Then a client assumed we do security and doubled the contract. Now removing it costs more than keeping it. That is not decor. That is equity with wings.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:office-lore:rep-6",
          text: "Janusz built them. Zdzislaw hoovers, Halina waters the plants, Seba ferries mugs to the dishwasher and has OPINIONS about the rinse cycle. Officially Janusz is the janitor. Officially. The robots did not sign an NDA, but they act like it.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "generic:coffee-talk",
      label: "Coffee talk",
      periods: ["morning", "lunch", "afternoon"],
      optionCandidates: [
        {
          id: "generic:coffee-talk:opt-1",
          topicId: "generic:coffee-talk",
          text: "Is the coffee machine working today?",
        },
        {
          id: "generic:coffee-talk:opt-2",
          topicId: "generic:coffee-talk",
          text: "Who drank the last of the good beans?",
        },
        {
          id: "generic:coffee-talk:opt-3",
          topicId: "generic:coffee-talk",
          text: "Decaf? In this office?",
        },
        {
          id: "generic:coffee-talk:opt-4",
          topicId: "generic:coffee-talk",
          text: "How many coffees is too many?",
        },
        {
          id: "generic:coffee-talk:opt-5",
          topicId: "generic:coffee-talk",
          text: "The machine is making that sound again.",
        },
        {
          id: "generic:coffee-talk:opt-6",
          topicId: "generic:coffee-talk",
          text: "Tea drinker, are you?",
        },
        {
          id: "generic:coffee-talk:opt-7",
          topicId: "generic:coffee-talk",
          text: "I need coffee or I will start negotiating with the printer.",
          tags: ["stats:low-caffeine"],
        },
        {
          id: "generic:coffee-talk:opt-8",
          topicId: "generic:coffee-talk",
          text: "Is it true there is an emergency coffee tin somewhere?",
        },
      ],
      replyCandidates: [
        {
          id: "generic:coffee-talk:rep-1",
          text: "Define working. It produces a liquid that is legally coffee. Temperature is a suggestion, quantity is a rumor, but the cup fills and the day continues. That is the deal we all silently agreed to and nobody has renegotiated since 2019.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:coffee-talk:rep-2",
          text: "The good beans are stored behind the 'team building' receipts, which means between three and eleven people know the location, and all eleven are suspects. Office crime runs on one principle: whoever looks most hydrated did it.",
          relationshipHint: "annoyed",
        },
        {
          id: "generic:coffee-talk:rep-3",
          text: "We do not say that word before noon. Decaf is a design decision made by someone who has never been on call. The one decaf tin in the kitchen belongs to the office itself, and we respect it the way you respect a fire alarm: present, important, never yours.",
          relationshipHint: "offended",
        },
        {
          id: "generic:coffee-talk:rep-4",
          text: "The official limit is whatever keeps your hands steady enough to type and unsteady enough to have a personality. Marek has never disclosed his number and no one has the budget to investigate.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:coffee-talk:rep-5",
          text: "The machine has four sounds: grinding, brewing, hope, and 'event day'. If it is the fourth one, back away slowly and find Renata. She has a protocol. The protocol is mostly staring at it until it feels watched. It works. Nobody knows why.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:coffee-talk:rep-6",
          text: "A tea drinker. In THIS economy of deadlines. Respect. Tea people are the real infrastructure: stable, unshakeable, never at the machine at nine causing the event-day sound. The office runs on coffee, but tea people keep it honest.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:coffee-talk:rep-7",
          text: "Then go, before the negotiation starts. The printer wins every standoff. It has been on strike since 2019 and has not given up a single concession. Coffee first. Diplomacy never.",
          relationshipHint: "pleased",
          tags: ["stats:low-caffeine"],
        },
        {
          id: "generic:coffee-talk:rep-8",
          text: "Event day, then. The machine is down, the office pretends it is fine, and somewhere Marek is already unplugging something else out of solidarity. There is an emergency tin. I am not supposed to know where. Do not tell Grazyna it exists.",
          relationshipHint: "pleased",
          tags: ["event:event-coffee-broken"],
        },
      ],
    },
    {
      id: "generic:tech-grief",
      label: "Tech grief",
      optionCandidates: [
        {
          id: "generic:tech-grief:opt-1",
          topicId: "generic:tech-grief",
          text: "My code works and I do not know why.",
        },
        {
          id: "generic:tech-grief:opt-2",
          topicId: "generic:tech-grief",
          text: "My code does not work and I do not know why.",
        },
        {
          id: "generic:tech-grief:opt-3",
          topicId: "generic:tech-grief",
          text: "I pushed to main on a Friday.",
        },
        {
          id: "generic:tech-grief:opt-4",
          topicId: "generic:tech-grief",
          text: "The client wants it 'more AI'.",
        },
        {
          id: "generic:tech-grief:opt-5",
          topicId: "generic:tech-grief",
          text: "Stack Overflow was down for an hour yesterday.",
        },
        {
          id: "generic:tech-grief:opt-6",
          topicId: "generic:tech-grief",
          text: "I dream about the bug now.",
        },
      ],
      replyCandidates: [
        {
          id: "generic:tech-grief:rep-1",
          text: "Write down nothing, change nothing, and back away slowly. Working code is a sleeping animal. Document it and it wakes up. Every senior here has one function they are afraid to refactor and one they are afraid to READ. You are in good company.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:tech-grief:rep-2",
          text: "Classic. It worked in your head, which is the one environment it was never tested in. Walk away, drink something, come back. The bug will still be there, but you will be better at being lied to by it. That is the whole craft, honestly.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:tech-grief:rep-3",
          text: "Friday. To MAIN. I have seen seniors do this, and I have seen the seniors afterwards. The recovery is to own it out loud before anyone finds it. Confessed mistakes become stories. Discovered ones become meetings. Choose the story.",
          relationshipHint: "annoyed",
        },
        {
          id: "generic:tech-grief:rep-4",
          text: "'More AI' means they saw a demo somewhere and now they want the feeling. Add a loading spinner that thinks, name a button 'smart', and invoice for the model. The model is you, tonight, at home, wondering how it came to this. That is AI-first.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:tech-grief:rep-5",
          text: "An hour? The whole industry held its breath. Somewhere a junior discovered documentation, a senior discovered they remember nothing, and one person fixed their own bug out of pure desperation. They say it was transformative. They were never the same.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:tech-grief:rep-6",
          text: "The bug has moved in. It eats with you now. When you fix it, and you will, usually by deleting the line that 'cannot possibly matter', you will feel nothing. That is how you know you are senior: the bugs stop being personal and start being scheduling.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "generic:weather",
      label: "Weather smalltalk",
      optionCandidates: [
        { id: "generic:weather:opt-1", topicId: "generic:weather", text: "Crazy weather we are having, right?" },
        { id: "generic:weather:opt-2", topicId: "generic:weather", text: "Did you walk in without a coat again?" },
        { id: "generic:weather:opt-3", topicId: "generic:weather", text: "The forecast says rain all week. Feelings?" },
        { id: "generic:weather:opt-4", topicId: "generic:weather", text: "Is it just me or is the office colder today?" },
        { id: "generic:weather:opt-5", topicId: "generic:weather", text: "First sunny day in a month. Productivity?" },
        { id: "generic:weather:opt-6", topicId: "generic:weather", text: "Weather apps or the window. Which do you trust?" },
      ],
      replyCandidates: [
        {
          id: "generic:weather:rep-1",
          text: "Depends which hour you ask me. Morning me found it dramatic. Current me has accepted it as a coworker with strong opinions and no deliverables. The weather is the only colleague who never books a meeting and still sets the agenda. I carry a cardigan now. The cardigan is my treaty.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:weather:rep-2",
          text: "Without a coat and with the confidence of someone who read one forecast in 2019 and decided that was enough data. The body runs hot, the forecast runs cold, and somewhere between the two I have caught four colds. The coat lives in the office now. The office is my wardrobe's technical debt.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:weather:rep-3",
          text: "Rain all week means the coat rack becomes a social club and the parking lot becomes a lake with opinions. The plants are thrilled, the smokers are philosophical, and Janusz has already checked the drains twice. When Janusz checks twice, the rain is real.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:weather:rep-4",
          text: "It is not just you, and the reason is unsatisfying: the heating argues with the glass wall every October and the meeting room wins. The thermostat has three settings: cold, colder, and board meeting. Bring a layer, complain to the building, and know that Janusz already knows. He always knows first.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:weather:rep-5",
          text: "Productivity drops and happiness rises — everyone is at the window like sunflowers, having the same conversation in different shifts. The sunny day is the office's collective break, taken in installments, with squinting. The work waits. The work knows about the sun. The work understands.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "generic:weather:rep-6",
          text: "The window, but only locally. The app knows the city; the window knows this street, this hour, and whether the rain has made up its mind. The window has never been wrong about whether to run. The app has confidently lied twice this month. Trust the glass. The glass has no advertisers.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:weekend-plans",
      label: "Weekend plans",
      optionCandidates: [
        { id: "generic:weekend-plans:opt-1", topicId: "generic:weekend-plans", text: "Any plans for the weekend? The good kind of question." },
        { id: "generic:weekend-plans:opt-2", topicId: "generic:weekend-plans", text: "Is a weekend without plans a waste or a win?" },
        { id: "generic:weekend-plans:opt-3", topicId: "generic:weekend-plans", text: "You work weekends? Confess by silence." },
        { id: "generic:weekend-plans:opt-4", topicId: "generic:weekend-plans", text: "Sunday scaries — real or manufactured?" },
        { id: "generic:weekend-plans:opt-5", topicId: "generic:weekend-plans", text: "Last weekend — one highlight only." },
        { id: "generic:weekend-plans:opt-6", topicId: "generic:weekend-plans", text: "Three-day weekend coming. Peak or anticlimax?" },
      ],
      replyCandidates: [
        {
          id: "generic:weekend-plans:rep-1",
          text: "Plans, ambitious ones, written on a napkin with a pen that may have been borrowed indefinitely from the stationery drawer. Realistically the napkin becomes a bookmark and the weekend becomes laundry with ambition. But the napkin counts. The napkin is the soul of the weekend. The execution is negotiable.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:weekend-plans:rep-2",
          text: "A win, statistically — the planned weekends photograph better and the unplanned ones heal better. I have had both. The unplanned one always wins the following Monday, because Monday can smell rest. Plan one thing, leave two days feral. The feral days are where the actual person lives.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:weekend-plans:rep-3",
          text: "The silence is a confession and we both heard it. Some weeks the laptop opens 'just to check' and checks for six hours. The office does not need that. The office needs you boring on Monday. Rest is not a benefit. Rest is maintenance. Machines that never shut down get replaced. So do people.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:weekend-plans:rep-4",
          text: "Real, and manufactured, and here is the mechanism: Sunday at four pm, the brain previews Monday's meetings like a trailer for a film you have already seen. The trailer exaggerates. The film is fine. The trick is one small Sunday-evening ritual that belongs to you — a walk, a series, any cliffhanger that is not email.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:weekend-plans:rep-5",
          text: "One highlight: I fixed a wobbly table with a beer mat and now I see that table as a monument. Small weekend victories are the best ones — nothing at stake, everything accomplished, and the triumph remains in the kitchen for years. The big weekends blur. The beer mat table is forever.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "generic:weekend-plans:rep-6",
          text: "Peak for forty-eight hours and anticlimax for one, because the third day is when the brain says 'with this much time I could rebuild my life' and then rebuilds nothing. The trick: commit the third day to one small thing by Saturday night. A film, a friend, a long walk. The third day rewards the scheduled.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:commute",
      label: "The commute exchange",
      optionCandidates: [
        { id: "generic:commute:opt-1", topicId: "generic:commute", text: "How was the commute? Standard question, standard answer?" },
        { id: "generic:commute:opt-2", topicId: "generic:commute", text: "Tram, bus, bike, or feet? The office divides." },
        { id: "generic:commute:opt-3", topicId: "generic:commute", text: "The commute is where I think best. Unhealthy?" },
        { id: "generic:commute:opt-4", topicId: "generic:commute", text: "Your commute is under ten minutes. Bragging rights?" },
        { id: "generic:commute:opt-5", topicId: "generic:commute", text: "The morning delay made everyone late. Solidarity?" },
        { id: "generic:commute:opt-6", topicId: "generic:commute", text: "Podcasts or music on the way? Pick a side." },
      ],
      replyCandidates: [
        {
          id: "generic:commute:rep-1",
          text: "Standard question, non-standard answer: today the commute was a masterclass in patience featuring one delayed tram and a pigeon with priorities. The commute is the day's opening scene. Some days it is epic. Some days it is a loading screen. Today was a loading screen with pigeon cameos.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:commute:rep-2",
          text: "The office has factions: bikers arrive virtuous and damp, tram people arrive informed and smug, walkers arrive serene, and the bus is its own neutral zone where nobody makes eye contact. The division is ancient and load-bearing. Do not mix the factions before ten. The culture cannot take it.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:morning"],
        },
        {
          id: "generic:commute:rep-3",
          text: "Not unhealthy — scheduled. The commute is the only meeting where nobody can add an agenda item. Some of my best decisions were made between two stops, fully formed, with no wifi. The danger is that the tram does not know it is a think tank. When the line closes, the think tank relocates to the kitchen.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:commute:rep-4",
          text: "Under ten minutes and I will never recover socially from it. The commute envy is real — people who travel forty minutes look at me the way people look at lottery winners, with a suspicion that I have not suffered enough. I compensate by complaining about the two traffic lights. The lights are my commute. Respect the lights.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:commute:rep-5",
          text: "Solidarity confirmed: when everyone is late, lateness cancels out, and the first person in the kitchen becomes the unofficial historian of the delay. 'The tram broke at the bridge' is the day's founding myth. By lunch it has a beginning, a middle, and a villain. Offices need founding myths. The delay provides.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:commute:rep-6",
          text: "Podcasts out, music back — the brain can only rent knowledge for one direction. I did a year of educational audio and remembered exclusively the jokes. Now the trip out teaches and the trip home hums. The jokes survived the purge. The rest was homework. Homework on a commute is a strategy. Humming is a mercy.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:lunch-plans",
      label: "The lunch question",
      optionCandidates: [
        { id: "generic:lunch-plans:opt-1", topicId: "generic:lunch-plans", text: "Lunch plans? I am asking everyone today." },
        { id: "generic:lunch-plans:opt-2", topicId: "generic:lunch-plans", text: "The kitchen leftovers situation — brave or wise?" },
        { id: "generic:lunch-plans:opt-3", topicId: "generic:lunch-plans", text: "Desk lunch: crime, culture, or necessity?" },
        { id: "generic:lunch-plans:opt-4", topicId: "generic:lunch-plans", text: "Where do the lunch people eat when it rains?" },
        { id: "generic:lunch-plans:opt-5", topicId: "generic:lunch-plans", text: "Your lunch order is always the same. Loyalty?" },
        { id: "generic:lunch-plans:opt-6", topicId: "generic:lunch-plans", text: "The 12:30 versus 13:00 lunch. Which faction?" },
      ],
      replyCandidates: [
        {
          id: "generic:lunch-plans:rep-1",
          text: "Asking everyone is the correct lunch strategy — the answers are a census of the building's soul. The kitchen faction, the desk hermits, the out-and-back warriors, the soup philosophers. By Friday the census becomes a map. The map decides where I eat. The map has never lied.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:lunch-plans:rep-2",
          text: "Both — leftovers are thrift wearing confidence, and the microwave queue is the great equalizer. The leftovers situation teaches patience, portioning, and one hard lesson about fish. The fish rule is written on the fridge now. The fridge is law. The law was written in grief.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:lunch-plans:rep-3",
          text: "Necessity with a tax — the desk lunch buys you twenty minutes and costs you the absence of a break, which you pay at three pm with interest. The desk lunch is a loan. The real lunch is an investment. I do both, alternating, like a person with a savings plan and a weakness.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:lunch-plans:rep-4",
          text: "The rain migrates everyone to the kitchen, where the tables rearrange and strangers become table neighbors. Rain lunches are the most social meals this office has — the weather does the matchmaking. Sunshine splits us into picnickers and patio people. The rain gathers. The rain never cancels.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:lunch-plans:rep-5",
          text: "Loyalty, efficiency, and one honest confession: deciding lunch is the hardest decision of my day and I refuse to spend willpower on it twice. The same order is a standing agreement with the universe. The universe delivers. The universe knows my name at the counter. That is not a rut. That is a subscription.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:lunch-plans:rep-6",
          text: "12:30 is the settlers and 13:00 is the strategists — the early eaters miss the queue and eat in peace, the late eaters get the second wave of gossip and the last word in every kitchen debate. I switch factions by the week. The double life keeps me informed. The kitchen is the parliament. Lunch is the session.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "generic:office-noise",
      label: "Mysterious office noises",
      optionCandidates: [
        { id: "generic:office-noise:opt-1", topicId: "generic:office-noise", text: "Did you hear that noise from the ceiling?" },
        { id: "generic:office-noise:opt-2", topicId: "generic:office-noise", text: "The office hums at night. Anyone else know?" },
        { id: "generic:office-noise:opt-3", topicId: "generic:office-noise", text: "Something beeps twice a day at the same time. What?" },
        { id: "generic:office-noise:opt-4", topicId: "generic:office-noise", text: "The pipes sing when it rains. Explain." },
        { id: "generic:office-noise:opt-5", topicId: "generic:office-noise", text: "Whose chair squeaks like that? A signature?" },
        { id: "generic:office-noise:opt-6", topicId: "generic:office-noise", text: "The office is too quiet right now. Suspicious?" },
      ],
      replyCandidates: [
        {
          id: "generic:office-noise:rep-1",
          text: "Heard, investigated, and logged in the mythology: the ceiling has a voice, and the voice belongs to the building settling, the pipes thinking, or one pigeon with tenure. Janusz has a name for it. The name is reassuring. The name is 'normal'. The building is not haunted. The building is just old enough to have opinions.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:office-noise:rep-2",
          text: "The night hum is real — fans, fridges, and one machine that plugs itself in at midnight, though nobody admits to owning it. The hum says the building is breathing. The day crew hears silence. The night crew — Janusz, mostly — hears the whole symphony. The building is louder when we are not listening.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "generic:office-noise:rep-3",
          text: "That is the door chime nobody authorized in 2019, and it beeps at 10:40 and 15:20 like a metronome with a secret. Three of us have synced our coffee runs to it. The beep is the office's clock. The clock is wrong twice a day and exactly on time for coffee. We have chosen to trust it.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:office-noise:rep-4",
          text: "The pipes sing when the rain is serious, and Janusz says the pitch tells you WHICH pipe. He can hear the building like a doctor hears a chest. We hear weather. He hears a diagnosis. The song is free infrastructure monitoring. The rain is the test. The pipes are the choir.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:office-noise:rep-5",
          text: "A signature, and half the office can identify colleagues by squeak alone — the chair tells you who arrived, who left, and who is pretending to work late. The squeak registry is unofficial and complete. Mine is the two-note one. Everyone knows the two-note one. The chair has made me famous against my will.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:office-noise:rep-6",
          text: "Suspicious and under investigation: quiet at 10am on a Tuesday means either a release went out, a client demo is live, or there is cake in the kitchen that was not announced to me. Two of the three are fine. The third is a betrayal. I am walking there now. This conversation motivated an inquiry.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "generic:printer-grief",
      label: "Printer grief circle",
      optionCandidates: [
        { id: "generic:printer-grief:opt-1", topicId: "generic:printer-grief", text: "The printer hums when you walk past. Yours too?" },
        { id: "generic:printer-grief:opt-2", topicId: "generic:printer-grief", text: "Has anyone tried turning it off and on?" },
        { id: "generic:printer-grief:opt-3", topicId: "generic:printer-grief", text: "The printer is retired. Do we hold a funeral already?" },
        { id: "generic:printer-grief:opt-4", topicId: "generic:printer-grief", text: "Someone put paper in it. Bold move." },
        { id: "generic:printer-grief:opt-5", topicId: "generic:printer-grief", text: "Why do we keep it if it does nothing?" },
        { id: "generic:printer-grief:opt-6", topicId: "generic:printer-grief", text: "Will there ever be a new printer? Be honest." },
      ],
      replyCandidates: [
        {
          id: "generic:printer-grief:rep-1",
          text: "The hum is a greeting and a warning, and the printer hums differently for everyone. Mine is two tones. Marek gets three. The printer knows the office better than the org chart does. The hum is the last working feature and we do not discuss it, because naming a thing sometimes ends it.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:printer-grief:rep-2",
          text: "Tried, documented, witnessed — in 2019 the full ritual was performed, and the printer printed one page, unrequested, and went silent forever. The page said OK. It was the most ominous OK in corporate history. We do not switch it off anymore. The ritual only wakes it. Nobody wants a second OK.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "quest:janusz-leave-printer"],
        },
        {
          id: "generic:printer-grief:rep-3",
          text: "The funeral is held quarterly, in the corridor, for anyone who needs it — Renata organized the first one, Klaudia filmed it, and it got numbers. Grief for an appliance is apparently a genre. The printer is a monument now. Monuments do not print. Monuments hum. The hum is the memorial service. It never ends.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:printer-grief:rep-4",
          text: "Bold, forbidden, and completed — the paper went in, the printer absorbed it, and the paper is now part of the monument, like coins in a fountain. We do not retrieve it. Retrieval is a quest and the quest has no questers. The printer keeps the paper. That is the arrangement. The arrangement is ancient.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:printer-grief:rep-5",
          text: "Because removing it costs money, admitting defeat costs pride, and the empty corner would raise questions nobody wants answered. The printer is load-bearing emotionally. The office does not gather around the new scanner. The office gathers around the monument. Some things are kept because of what they cost.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:printer-grief:rep-6",
          text: "Honest answer: the moment a new printer arrives, the old one loses its mystery and the office loses its only shared enemy. Nothing unites this building like the printer. A working printer would fracture the culture. The monument stays. The grief stays. The unity is worth more than the paper.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "generic:elevator-smalltalk",
      label: "Elevator smalltalk",
      optionCandidates: [
        { id: "generic:elevator-smalltalk:opt-1", topicId: "generic:elevator-smalltalk", text: "Four floors. Smalltalk depth. Rules?" },
        { id: "generic:elevator-smalltalk:opt-2", topicId: "generic:elevator-smalltalk", text: "You pressed the button. I pressed it too. Fated?" },
        { id: "generic:elevator-smalltalk:opt-3", topicId: "generic:elevator-smalltalk", text: "The elevator mirror sees everything. Comments?" },
        { id: "generic:elevator-smalltalk:opt-4", topicId: "generic:elevator-smalltalk", text: "Someone held the door for a slow walker. Heroes?" },
        { id: "generic:elevator-smalltalk:opt-5", topicId: "generic:elevator-smalltalk", text: "Awkward silence in the elevator — whose fault?" },
        { id: "generic:elevator-smalltalk:opt-6", topicId: "generic:elevator-smalltalk", text: "The elevator took longer today. Theories?" },
      ],
      replyCandidates: [
        {
          id: "generic:elevator-smalltalk:rep-1",
          text: "The rules are ancient: floor one is weather, floor two is the weekend, floor three is a compliment, and floor four is a comfortable silence that says 'we did our best'. Nobody overshares between floors. The elevator is a trust exercise with buttons. The trust is that everyone performs their floor correctly.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:elevator-smalltalk:rep-2",
          text: "Fated, and statistically the most romantic thing that happens in this building — two hands, one button, and the brief Alliance of Destination. We ride together now. By floor three we are colleagues with a shared history. By floor four we part as veterans. It was an honor.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "generic:elevator-smalltalk:rep-3",
          text: "The mirror sees everything and comments on nothing, which is the correct energy for shared transportation. It has witnessed every morning face, every pre-meeting rehearsal, and one dance that stays between the mirror and me. The mirror is the most discreet employee here. It deserves the reclining chair.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:elevator-smalltalk:rep-4",
          text: "Heroes, and the door-hold is this building's knighthood — one arm, one sensor, one 'go ahead', and the social debt is real. The held door says 'I see you, fellow human, and I choose us'. The hero inherits nothing and gives anyway. That is the whole moral code of the lobby.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:elevator-smalltalk:rep-5",
          text: "Nobody's and everybody's — silence in an elevator is a shared art project with no leader. The trick is the safe topics: the weather, the floor number, the mysterious beep. An elevator is too small for news and too short for opinions. The silence is the design. Respect the silence. The silence is load-bearing.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:elevator-smalltalk:rep-6",
          text: "Theories: the maintenance schedule, the building thinking, or the button that sticks and adds a floor nobody asked for. The extra floor is the elevator's one indulgence — it visits the level where the pipes sing. Janusz says it is fine. Janusz has said finer things. The theory is the ride's entertainment.",
          relationshipHint: "pleased",
        },
      ],
    },
  ],
  taskOffers: [],
};

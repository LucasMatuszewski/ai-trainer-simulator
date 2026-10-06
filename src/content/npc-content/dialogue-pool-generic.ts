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
    {
      id: "generic:desk-snacks",
      label: "Desk snacks",
      optionCandidates: [
        { id: "generic:desk-snacks:opt-1", topicId: "generic:desk-snacks", text: "What is in your desk drawer right now?" },
        { id: "generic:desk-snacks:opt-2", topicId: "generic:desk-snacks", text: "The office has opinions about desk snacks?" },
        { id: "generic:desk-snacks:opt-3", topicId: "generic:desk-snacks", text: "Emergency snacks versus daily snacks — distinction?" },
        { id: "generic:desk-snacks:opt-4", topicId: "generic:desk-snacks", text: "Someone's desk smells like a whole bakery." },
        { id: "generic:desk-snacks:opt-5", topicId: "generic:desk-snacks", text: "Burek has mapped every snack drawer?" },
        { id: "generic:desk-snacks:opt-6", topicId: "generic:desk-snacks", text: "What snack says a lot about a person?" },
      ],
      replyCandidates: [
        {
          id: "generic:desk-snacks:rep-1",
          text: "Two granola bars of unknown vintage, an emergency chocolate behind the notebooks, and something crunch I no longer remember buying. The drawer is less a pantry than a geological record of my afternoons. Every office desk has one. Some are just better at hiding the strata.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:desk-snacks:rep-2",
          text: "The office has three: loud packaging is a Tuesday problem, strong smells migrate to the meeting room, and whatever you hoard, label it or lose it. The rules are unwritten, universally enforced, and rehearsed on every new hire by the third day. Culture is mostly snack etiquette with better fonts.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:desk-snacks:rep-3",
          text: "Daily snacks are fuel. Emergency snacks are CURRENCY. You do not eat the emergency chocolate on a Tuesday — you save it for the day the printer wins, and when that day comes you share it, because emergency snacks only work if the office knows you have them. It is economics. Tiny, foil-wrapped economics.",
          relationshipHint: "delighted",
          tags: ["period:afternoon", "relationship:neutral"],
        },
        {
          id: "generic:desk-snacks:rep-4",
          text: "That is not a snack drawer, that is a bakery franchise, and the whole floor browses it with their noses at eleven. The owner says nothing and shares everything, which is either generosity or strategy, and after three years I have decided the distinction does not matter. The crumbs are real either way.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "generic:desk-snacks:rep-5",
          text: "Mapped, ranked, and patrolled. He appeared at my drawer the day I stocked it and gave me one look that said the audit found me satisfactory. The dog knows where everything is before the owners do. Half the office has started leaving the bottom drawer slightly open on his visiting days. That is not kindness. That is tribute.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:desk-snacks:rep-6",
          text: "Tell me the snack and I will tell you the work style. Desk almonds: plans ahead, judges quietly. Hidden gummy bears: fun with confidentiality settings. A drawer of identical soups: braced for anything, probably correct. The snack is never just a snack. It is a tiny autobiography in foil.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "generic:meeting-survival",
      label: "Meeting survival",
      optionCandidates: [
        { id: "generic:meeting-survival:opt-1", topicId: "generic:meeting-survival", text: "How do you survive a meeting that should be an email?" },
        { id: "generic:meeting-survival:opt-2", topicId: "generic:meeting-survival", text: "Best seat in a meeting for staying awake?" },
        { id: "generic:meeting-survival:opt-3", topicId: "generic:meeting-survival", text: "The nodding technique — real or rude?" },
        { id: "generic:meeting-survival:opt-4", topicId: "generic:meeting-survival", text: "One useful question wakes a whole meeting up." },
        { id: "generic:meeting-survival:opt-5", topicId: "generic:meeting-survival", text: "The meeting ran long and lunch is gone. Grief?" },
        { id: "generic:meeting-survival:opt-6", topicId: "generic:meeting-survival", text: "When is a meeting actually worth attending?" },
      ],
      replyCandidates: [
        {
          id: "generic:meeting-survival:rep-1",
          text: "You make it useful from the inside — take the notes nobody wants to take, and suddenly you are the most important person in the room. The note-taker controls the recap, and the recap is the only part of the meeting that survives. Every email meeting has one survivor. Be the survivor.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "generic:meeting-survival:rep-2",
          text: "Near the front, off-center, visible but not addressable. The back rows get called on, the front-center gets eye contact, but the front-corner gets proximity benefits with none of the exposure. Close enough to look engaged, angled enough to think freely. It is the diplomatic seat and it is always open.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:meeting-survival:rep-3",
          text: "Real, and it is a craft. The slow triple-nod says 'continue, this is being absorbed'. The single firm nod says 'point received, we may move on'. What is rude is the empty nod — the one with nobody home. People can tell. Nod like the sentence matters or do not nod at all. The face is part of the meeting's infrastructure.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:meeting-survival:rep-4",
          text: "'What would make us cancel this?' Works every time. The room wakes up because nobody has permission to say the obvious until someone asks. Half the time the answer is nothing and the meeting earns its keep. The other half of the time you just saved nine people an hour. Either way, you ate first.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:meeting-survival:rep-5",
          text: "Not grief — arithmetic. The meeting cost an hour and a lunch. The fix is never working through it; the fix is the drawer, the stash, the emergency ration network this office pretends not to have. Somebody always has crackers. Somebody always has the good chocolate. Hunger builds the only mutual aid that never needs a policy.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:meeting-survival:rep-6",
          text: "When a decision needs witnesses. Documents inform, calls align, but decisions need a room full of people who cannot later say they were not there. If nobody will have to live with a shared consequence, send the email. If everyone has to carry it together, book the room and buy the good coffee. The coffee is half the attendance.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:plant-duty",
      label: "Plant duty",
      optionCandidates: [
        { id: "generic:plant-duty:opt-1", topicId: "generic:plant-duty", text: "Whose turn is it to water the office plants?" },
        { id: "generic:plant-duty:opt-2", topicId: "generic:plant-duty", text: "I overwatered the fern. How bad is it?" },
        { id: "generic:plant-duty:opt-3", topicId: "generic:plant-duty", text: "The plants near the window are thriving. Why?" },
        { id: "generic:plant-duty:opt-4", topicId: "generic:plant-duty", text: "A plant died on my watch. Am I cursed?" },
        { id: "generic:plant-duty:opt-5", topicId: "generic:plant-duty", text: "Janusz has a plant rotation chart, apparently?" },
        { id: "generic:plant-duty:opt-6", topicId: "generic:plant-duty", text: "What do office plants actually give us?" },
      ],
      replyCandidates: [
        {
          id: "generic:plant-duty:rep-1",
          text: "Nobody's and everyone's, which is how the plants survive us. Janusz does the real schedule, the rest of us perform guilt-watering when we remember. The system is: he tends, we admire, and every few weeks someone becomes devoted for a month before life reasserts itself. The plants are zen about the cycle. They have seen worse.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:plant-duty:rep-2",
          text: "Recoverable. Ferns forgive with drainage — tip the water out, skip a week, speak softly. The overwatering instinct is love with a heavy hand, and the fern knows the difference. The office plant rule is the same as the office coffee rule: less than you think, more often than you remember. Adjust and be forgiven.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:plant-duty:rep-3",
          text: "Light, mostly, and the glass wall — but also the traffic. Window plants get looked at. Looked-at plants get watered, turned, and defended from the vacuum. Thriving is ten percent biology and ninety percent witnesses. The corner plants by the printer live rough. Nobody makes eye contact with the printer.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:plant-duty:rep-4",
          text: "Not cursed — experienced. Everyone kills their first office plant, usually with kindness, sometimes with a holiday. Janusz will not judge you; he will hand you the next one and say 'this one is tougher'. That is the whole onboarding. The dead one goes to the compost with honors. The survivor becomes yours. That is how plant people are made.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "generic:plant-duty:rep-5",
          text: "He does — names, dates, and a small symbol for temperament. There is even a column for 'likes chat', which is real, because the plants by the kitchen get talked at and grow accordingly. The chart is taped inside his closet door. It is the most detailed document in this building and the only one nobody argues with.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:plant-duty:rep-6",
          text: "Proof of time passing. A screen never changes and a plant never stops — new leaf, dropped leaf, the slow lean toward the window. You can read the quarter in a plant the way you cannot read it in a dashboard. Offices need one living thing that does not report status. The plants just do status, quietly, in green.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:friday-curve",
      label: "The Friday curve",
      optionCandidates: [
        { id: "generic:friday-curve:opt-1", topicId: "generic:friday-curve", text: "Why does Friday afternoon move so fast?" },
        { id: "generic:friday-curve:opt-2", topicId: "generic:friday-curve", text: "The last-hour deploy — brave or cursed?" },
        { id: "generic:friday-curve:opt-3", topicId: "generic:friday-curve", text: "Friday cleanup ritual — is that a real thing?" },
        { id: "generic:friday-curve:opt-4", topicId: "generic:friday-curve", text: "Zosia's Friday cookie tin is strategic?" },
        { id: "generic:friday-curve:opt-5", topicId: "generic:friday-curve", text: "Monday-you versus Friday-you — different people?" },
        { id: "generic:friday-curve:opt-6", topicId: "generic:friday-curve", text: "What is the perfect Friday afternoon?" },
      ],
      replyCandidates: [
        {
          id: "generic:friday-curve:rep-1",
          text: "Because the week finally fits. By Friday afternoon you know what the week was about, the noise has settled, and the tasks left are the ones that fit your hands exactly. Monday is ten hours long. Friday afternoon is forty minutes with good lighting. Time does not speed up. You just stop fighting it.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:friday-curve:rep-2",
          text: "Cursed, obviously, and every office has its Friday-deploy ghost story to prove it. The rule of thumb everyone learns once: if the world cannot wait until Monday, it was not ready on Friday. Marek enforces this with his eyes. The brave still exist. We keep their names by the coffee machine, like a memorial.",
          relationshipHint: "annoyed",
        },
        {
          id: "generic:friday-curve:rep-3",
          text: "Real and load-bearing. Desk cleared, Monday's first task written on a sticky note, plants checked, one small fix done so the week ends on a closed loop. It takes fifteen minutes and it is the difference between arriving Monday as a stranger or as a resident. The ritual is quiet. The ritual is why Monday feels less like a wall.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:friday-curve:rep-4",
          text: "Completely. The cookies appear at four, morale does its little graph, and the week's last argument dissolves in sugar. She would call it culture infrastructure and she would be right. Every office has a heartbeat and ours runs on flour, timing, and a manager who knows that people walk into Monday remembering how Friday ended.",
          relationshipHint: "delighted",
          tags: ["period:afternoon", "relationship:warm"],
        },
        {
          id: "generic:friday-curve:rep-5",
          text: "Different people who owe each other favors. Friday-you leaves the note, the clean desk, the parked question — and Monday-you arrives rich from it. Every good Monday is actually a Friday that planned ahead. The week is not five days. It is two people passing one baton, over and over, forever.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:friday-curve:rep-6",
          text: "One closed loop, one open question left in good condition, the cookie tin at four, and a walk out at five with the weekend intact. No heroics, no inbox zero — those are fantasies. Just an office winding down like a good clock, everyone leaving a little better than the week found them. The perfect Friday is the one nobody talks about on Monday.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:monday-mood",
      label: "The Monday mood",
      optionCandidates: [
        { id: "generic:monday-mood:opt-1", topicId: "generic:monday-mood", text: "Is Monday actually worse or just branded badly?" },
        { id: "generic:monday-mood:opt-2", topicId: "generic:monday-mood", text: "The Monday standup is the week's hardest meeting?" },
        { id: "generic:monday-mood:opt-3", topicId: "generic:monday-mood", text: "Coffee before speaking on Mondays — office law?" },
        { id: "generic:monday-mood:opt-4", topicId: "generic:monday-mood", text: "One person is always sunny on Monday. How?" },
        { id: "generic:monday-mood:opt-5", topicId: "generic:monday-mood", text: "The Monday flood of emails — triage order?" },
        { id: "generic:monday-mood:opt-6", topicId: "generic:monday-mood", text: "How do you make Monday softer?" },
      ],
      replyCandidates: [
        {
          id: "generic:monday-mood:rep-1",
          text: "Branded badly. Monday is just Tuesday with worse press. The weekend hands you a slower heart rate and the office hands you a full queue, and the collision feels personal when it is purely scheduled. By 10:30 every Monday is any other day wearing the same shirt. The brand wears off. It always does.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:monday-mood:rep-2",
          text: "It is the week's draft, not its exam. Whoever runs it sets the tone — fifteen minutes, one pass, no mysteries. A Monday standup that runs long poisons four days. A Monday standup that ends with the room exhaling quietly prints money for the rest of the week. The meeting is small. The tone is enormous.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:monday-mood:rep-3",
          text: "Law, unwritten, absolute. The first hour of Monday is a warm-up lap and nobody is required to perform sentence assembly before the cup is drained. Even Dawid gives the coffee a moment. The office runs on a lot of policies nobody wrote down, and this one has the deepest enforcement: self-interest, universal.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "generic:monday-mood:rep-4",
          text: "Either they love the work, or they front-load the week so hard on Sunday that Monday arrives pre-conquered. Both are legal. The sunny ones are useful, too — a room of Monday grumbles needs exactly one person who behaves like the week is a gift. The grumbles soften out of sheer social physics. Use them. Do not become them. Nobody can sustain it.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:monday-mood:rep-5",
          text: "People first, fires second, paper third. The email that says 'do you have a minute' outranks the newsletter. The flag from the weekend monitoring outranks the archive. Everything sent between Friday 5 and Monday 7 gets read by a calmer version of you at 10:00. Triage is just being kind to the person you were on Friday night.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:monday-mood:rep-6",
          text: "Leave one open loop from Friday — something small, pleasant, and finishable in ten minutes. Monday-you walks into a win instead of a wall, and momentum is the only currency the morning accepts. Nobody can make Monday short. Anyone can make Monday start with a done thing. The trick is played on yourself, and it works forever.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:cardigan-season",
      label: "Cardigan season",
      optionCandidates: [
        { id: "generic:cardigan-season:opt-1", topicId: "generic:cardigan-season", text: "Cardigan season opened overnight. Officially?" },
        { id: "generic:cardigan-season:opt-2", topicId: "generic:cardigan-season", text: "The office heating versus the cardigan army?" },
        { id: "generic:cardigan-season:opt-3", topicId: "generic:cardigan-season", text: "Cardigan hierarchy — is there one?" },
        { id: "generic:cardigan-season:opt-4", topicId: "generic:cardigan-season", text: "Janusz holds the thermostat like a vault?" },
        { id: "generic:cardigan-season:opt-5", topicId: "generic:cardigan-season", text: "The one cardigan everyone borrows?" },
        { id: "generic:cardigan-season:opt-6", topicId: "generic:cardigan-season", text: "What does cardigan season do to the office?" },
      ],
      replyCandidates: [
        {
          id: "generic:cardigan-season:rep-1",
          text: "Officially it opens with the first cold handle on the door and closes when someone risks short sleeves in April. Nobody declares it. One morning half the office arrives in wool and the season simply exists, like fog. The transition is my favorite day of the year — the whole office quietly agrees to be cozy at the same time.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:cardigan-season:rep-2",
          text: "The eternal war. The heating serves one number; the humans span ten microclimates. The cardigan army is the peace treaty — instead of fighting the thermostat, we dress for our personal weather. Every office that argues about temperature is one cardigan drawer away from world peace. The drawer is the diplomacy.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:cardigan-season:rep-3",
          text: "There is, and nobody wrote it down. Founders' hoodies at the top, then senior cardigans with elbow patches — tenure you can see — then the rotating fashion knits, and at the bottom, worn with total pride, the company hoodie from a conference nobody attended. Rank is real. Comfort outranks it. The hierarchy is warm and self-aware.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:cardigan-season:rep-4",
          text: "Like the crown jewels. The thermostat has a cover, the cover has a note, and the note says ask. Which sounds tyrannical until you learn the alternative: eleven people with eleven settings turning the office into weather. Janusz runs one temperature, perfectly, for twenty years. That is not control. That is climate governance.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:cardigan-season:rep-5",
          text: "The gray one on the coat rack, origin unknown, fits everyone, warms everyone. It has been borrowed for years and returns without being chased. It is the office's communal garment and it has absorbed so many shoulders it has basically achieved tenure. If the gray cardigan could talk it would know every secret in this building.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:cardigan-season:rep-6",
          text: "It slows the office down in the good way. Summer is sprints and cold coffee. Cardigan season is longer thoughts, warmer meetings, and the kettle working a shift. Deadlines do not care what month it is, but people do — and people in wool are people with patience. The whole building lowers its voice a notch. Cozy is a productivity setting.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:afternoon-wall",
      label: "The afternoon wall",
      optionCandidates: [
        { id: "generic:afternoon-wall:opt-1", topicId: "generic:afternoon-wall", text: "The 15:00 energy wall is real, right?" },
        { id: "generic:afternoon-wall:opt-2", topicId: "generic:afternoon-wall", text: "Coffee at three — help or delay?" },
        { id: "generic:afternoon-wall:opt-3", topicId: "generic:afternoon-wall", text: "Why is the corridor quietest at three?" },
        { id: "generic:afternoon-wall:opt-4", topicId: "generic:afternoon-wall", text: "The wall hit during an important call. Salvage?" },
        { id: "generic:afternoon-wall:opt-5", topicId: "generic:afternoon-wall", text: "Some people peak at 3pm. Species?" },
        { id: "generic:afternoon-wall:opt-6", topicId: "generic:afternoon-wall", text: "What work is three pm actually good for?" },
      ],
      replyCandidates: [
        {
          id: "generic:afternoon-wall:rep-1",
          text: "Real, scheduled, and survivable. The body takes its break between the morning's caffeine and the evening's second wind, and the office pretends not to notice. The mistake is fighting it with meetings. Three o'clock is for the tasks your hands can do while your brain reboots. Every veteran schedules accordingly and says nothing.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:afternoon-wall:rep-2",
          text: "Delay, for most, help for the few. Three o'clock coffee is a four-thirty debt, and the four-thirty crash arrives right when the last real work of the day wants doing. The honest cure is the walk — two laps of the block, ten minutes, cheaper than any stimulant and it actually works. But tell that to the kettle line. The kettle line knows what it wants.",
          relationshipHint: "neutral",
        },
        {
          id: "generic:afternoon-wall:rep-3",
          text: "Because the whole floor hit the wall at once and everyone is quietly reboiling water, staring out windows, and type-typing one word per minute. It is not quiet. It is synchronized standby. Janusz calls three o'clock 'the office blinking' — the whole building resting its eyes at the same time. He is not wrong. He is never wrong about the building.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "generic:afternoon-wall:rep-4",
          text: "Stand up. Say it out loud — 'let me grab two minutes before we decide'. Nobody has ever lost a deal by being human at three pm; they lose deals by pretending to be a machine and agreeing to something written by the wall. Water, window, ten breaths, back in. The wall passes. The call respects the honesty. Deals survive honesty. They do not survive nodding while absent.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:afternoon-wall:rep-5",
          text: "There are people whose chemistry peaks exactly when ours dips, and they own those hours like real estate. Every office has one — arriving from lunch like the day is starting, cheerful, terrifying. They are not better than us. They are differently wound. The office works because the peaks take shifts. Someone is always at the wheel.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:afternoon-wall:rep-6",
          text: "The merciful work. Filing, tidying, labeling, the inbox archaeology, updating the docs nobody thanks you for. Three pm is when the office's quiet maintenance gets done, and the maintenance is why the rest of the week works. Mornings make the noise. The wall hours clean up after it. Both shifts are honorable. Only one gets cookies.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:parking-lot",
      label: "The parking lot",
      optionCandidates: [
        { id: "generic:parking-lot:opt-1", topicId: "generic:parking-lot", text: "The parking lot has unspoken rules?" },
        { id: "generic:parking-lot:opt-2", topicId: "generic:parking-lot", text: "Someone parked across two spaces again?" },
        { id: "generic:parking-lot:opt-3", topicId: "generic:parking-lot", text: "The far corner spots are the good ones?" },
        { id: "generic:parking-lot:opt-4", topicId: "generic:parking-lot", text: "Janusz sweeps the lot before anyone arrives?" },
        { id: "generic:parking-lot:opt-5", topicId: "generic:parking-lot", text: "A client blocked the exit during a visit?" },
        { id: "generic:parking-lot:opt-6", topicId: "generic:parking-lot", text: "Does the lot empty at exactly five?" },
      ],
      replyCandidates: [
        {
          id: "generic:parking-lot:rep-1",
          text: "Every parking lot is a village with tarmac. The spot under the tree belongs to whoever claimed it first, in whatever year claims were invented. The new people park wherever and learn by lunch. Nobody explains the rules because a rule explained is a war started. The lot governs itself, like weather, or office coffee rounds.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:parking-lot:rep-2",
          text: "They did, in a silver thing with the confidence of a man who has never reversed in anger. The office did not confront. The office observed. By afternoon, the car was parked like a hired notary had done it. Lot justice is patient justice. Nobody knows how. Nobody asks. The tarmac keeps its own books.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:parking-lot:rep-3",
          text: "They are, and it is not close. Shade in summer, sun frost last to arrive in winter, and a fifteen-second walk that resets your head between the car and the door. The people who park far arrive different. Calmer. Like men who have thought about shade. The close spots are for the brave and the late, and both pay a tax eventually.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:parking-lot:rep-4",
          text: "He does, at six, with the big yellow broom, in the dark, unhurried. By eight the lot looks like a hotel. Nobody asked him. Nobody thanks him. Everybody notices when he is on holiday, and nobody says why the lot feels different. Janusz does that. He is the reason the ground floor feels like a place and not a slab.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "relationship:warm"],
        },
        {
          id: "generic:parking-lot:rep-5",
          text: "They did, and eleven professionals discovered they had no idea how negotiations start. Renata fixed it in four minutes, by phone, with a name. The car moved before the coffee arrived. That is what the front desk is: a tow truck with better manners. The client sent pastries. The lot forgave. All books balanced by ten.",
          relationshipHint: "pleased",
          tags: ["quest:renata-tut-finished"],
        },
        {
          id: "generic:parking-lot:rep-6",
          text: "Between 4:50 and 5:10 the lot performs its little migration, doors and engines in a gentle exodus. The stragglers wave. The early ones are already home. Nobody planned this rhythm. It grew, like tide tables. You can tell a good day by how fast the lot empties, and a great one by who stays behind to argue about football.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "generic:stairwell",
      label: "The stairwell",
      optionCandidates: [
        { id: "generic:stairwell:opt-1", topicId: "generic:stairwell", text: "People take the stairs to talk privately?" },
        { id: "generic:stairwell:opt-2", topicId: "generic:stairwell", text: "The stairwell echoes every phone call?" },
        { id: "generic:stairwell:opt-3", topicId: "generic:stairwell", text: "Someone jogs the stairs at lunch daily?" },
        { id: "generic:stairwell:opt-4", topicId: "generic:stairwell", text: "The stairwell smells like every office at once?" },
        { id: "generic:stairwell:opt-5", topicId: "generic:stairwell", text: "Klaudia uses the stairwell light for photos?" },
        { id: "generic:stairwell:opt-6", topicId: "generic:stairwell", text: "Why do hard conversations happen on stairs?" },
      ],
      replyCandidates: [
        {
          id: "generic:stairwell:rep-1",
          text: "The stairwell is the office's confessional. No cameras, weak signal, and the acoustics of a cathedral for anyone two steps behind you. Every awkward performance review in history has had a stairwell sequel. Nobody schedules it. The building just offers, and people accept, one landing at a time.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:stairwell:rep-2",
          text: "It does, and it broadcasts. There is a man who takes every call on the stairs, and we know his whole life in seasons. The wedding, the house, the knee. He thinks the stairwell is private. The stairwell is a radio station with one listener per landing and perfect reception. We have never told him. Some kindnesses are silences.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:stairwell:rep-3",
          text: "They do, same time, same pace, lap after lap like a monk with a Fitbit. Two flights up, two down, gone by 12:40. Nobody joined. Everybody respects it. The stairwell jog is the office's one true hermit practice, and the hallway smells faintly of effort and victory between 12:30 and 1.",
          relationshipHint: "pleased",
          tags: ["period:lunch"],
        },
        {
          id: "generic:stairwell:rep-4",
          text: "Old paper, cool concrete, and a ghost of every coffee ever carried up in a hurry. Buildings have smells the way people have handwriting, and the stairwell is where the building signs its name. New offices smell of carpet glue. Ours smells of decades. You can tell the age of a company by breathing in its stairs.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:stairwell:rep-5",
          text: "She does, that one window on the half landing, at golden hour, twice a year when it aligns. The light there is honest and forgiving at once. She calls it 'the free softbox'. The rest of us call it the window. Klaudia has taught half the office that a wall we climb daily is secretly a photography studio that opens twice a year.",
          relationshipHint: "delighted",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "generic:stairwell:rep-6",
          text: "Because stairs are moving and moving is easier than sitting with a hard sentence. You cannot storm out of a stairwell conversation; you are already going somewhere. The steps carry the pause. Half the career advice ever given was delivered between floors, by someone facing slightly downwards, both of you pretending it was about the walk.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:window-seat",
      label: "The window seat",
      optionCandidates: [
        { id: "generic:window-seat:opt-1", topicId: "generic:window-seat", text: "The desk by the window changed hands again?" },
        { id: "generic:window-seat:opt-2", topicId: "generic:window-seat", text: "Tomek had the window seat and gave it up?" },
        { id: "generic:window-seat:opt-3", topicId: "generic:window-seat", text: "The winter sun makes one desk unusable?" },
        { id: "generic:window-seat:opt-4", topicId: "generic:window-seat", text: "Visitors always comment on the view floor?" },
        { id: "generic:window-seat:opt-5", topicId: "generic:window-seat", text: "Klaudia shot a whole series from that window?" },
        { id: "generic:window-seat:opt-6", topicId: "generic:window-seat", text: "Is a window seat actually worth the politics?" },
      ],
      replyCandidates: [
        {
          id: "generic:window-seat:rep-1",
          text: "It did, and the office pretended not to follow the transfer with the attention of sports fans tracking a transfer window. The window seat changes hands maybe once a year and always after a quiet week. The move takes eleven minutes. The office gossip takes three days. Both are inevitable. Both are treated as weather.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:window-seat:rep-2",
          text: "He did, to the interior desk by the duct, on purpose, because he 'works better in the cold'. The office spent a week diagnosing this. The man opened the window all winter and called the sun a distraction with a temperature. You cannot explain a monk to a village. The village settles for respecting him. The window seat mourned for exactly one week.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "relationship:neutral"],
        },
        {
          id: "generic:window-seat:rep-3",
          text: "It does, 2:40 to 3:30, a blade of sun that turns one desk into a sauna and one monitor into a mirror. The occupant has tried foil, film, and a small tent. The sun is unimpressed. Twice a year the angle changes and the target desk changes with it, like a slow spotlights sweep nobody ordered. The office just... rotates. We are planets.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "generic:window-seat:rep-4",
          text: "They do, the view floor, the light floor. Clients stand at the glass and say 'what a view' and mean 'what a company'. Nobody corrects them. The view does half the reception and asks for no salary. Renata gives tours past the window on purpose. Buildings speak, if you route people past the right glass at the right hour.",
          relationshipHint: "pleased",
          tags: ["quest:renata-tut-finished"],
        },
        {
          id: "generic:window-seat:rep-5",
          text: "She did, one photo per month, same angle, sky only. A year of that window: summer like a postcard, November like a apology, one February frame of pure white nothing. The series is called 'what we worked under'. It did well everywhere, because every office has a window and every window keeps a diary. She just read ours aloud.",
          relationshipHint: "delighted",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "generic:window-seat:rep-6",
          text: "It is worth exactly what you bring to it. For some people the window is a pension. For Tomasz it was furniture. For the rest of us it is ten percent better days and a place to look when a call goes sideways. The politics are real, the light is real, and the sky does this thing at 4pm in October that pays for everything.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:wrong-floor",
      label: "Wrong floor visitors",
      optionCandidates: [
        { id: "generic:wrong-floor:opt-1", topicId: "generic:wrong-floor", text: "A visitor got off on our floor by mistake?" },
        { id: "generic:wrong-floor:opt-2", topicId: "generic:wrong-floor", text: "The delivery man visits every floor before ours?" },
        { id: "generic:wrong-floor:opt-3", topicId: "generic:wrong-floor", text: "One lost visitor became a client eventually?" },
        { id: "generic:wrong-floor:opt-4", topicId: "generic:wrong-floor", text: "The floor above moved and confused everyone?" },
        { id: "generic:wrong-floor:opt-5", topicId: "generic:wrong-floor", text: "Renata rescues lost visitors by phone?" },
        { id: "generic:wrong-floor:opt-6", topicId: "generic:wrong-floor", text: "Why do people never admit they are lost?" },
      ],
      replyCandidates: [
        {
          id: "generic:wrong-floor:rep-1",
          text: "It happens monthly. A stranger walks in with the confidence of a man who belongs, realizes at the third desk that we are not his people, and does the slow retreat. The office has a protocol: nobody looks up, everyone radiates welcome, and someone says 'third floor, I think' without standing. We are a polite building. Lost people can feel it.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:wrong-floor:rep-2",
          text: "He does a full tour, every floor, alphabetically, before he finds us. We have stopped directing him. The delivery man has seen more of this building than the fire inspector. He knows where every kettle lives. When he retires, the building should give him a medal and a map, in that order.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:wrong-floor:rep-3",
          text: "They did. A woman looking for a graphic design studio two floors up, actually looking at OUR wall of values on her way out. She asked who did the wall. Ania happened to be standing there, being Ania. Three coffees later she was a client. Getting lost is the oldest marketing channel in the world, and our walls do the talking.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract"],
        },
        {
          id: "generic:wrong-floor:rep-4",
          text: "They did, in spring, and for a month every visitor to our floor was a stranger with a folder and hope. The building's whole geography quietly failed. Visitors do not read floor numbers. Visitors follow memory, and memory had been evicted. Renata's desk became an air traffic control tower for six weeks. Then everyone's memory updated. Buildings heal.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:wrong-floor:rep-5",
          text: "She does, in four sentences: where are you, what do you see, is there a plant near you. The building has four plants and each is a landmark. 'The fern means you are on our floor, come left.' Nobody is lost for more than ninety seconds. Renata runs a search and rescue operation from a desk with a crossword on it.",
          relationshipHint: "delighted",
          tags: ["quest:renata-tut-finished"],
        },
        {
          id: "generic:wrong-floor:rep-6",
          text: "Because admitting it costs a small piece of dignity and wandering might still work. Every lost person in a corridor is running the math: ask and be helped but be the person who asked, or walk and maybe arrive like you meant to. The office can help with that too. A friendly 'are you looking for someone' gives them a door out of the math.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:elevator-broken",
      label: "The broken elevator",
      optionCandidates: [
        { id: "generic:elevator-broken:opt-1", topicId: "generic:elevator-broken", text: "The elevator died on a Monday?" },
        { id: "generic:elevator-broken:opt-2", topicId: "generic:elevator-broken", text: "Janusz knows the elevator engineer by name?" },
        { id: "generic:elevator-broken:opt-3", topicId: "generic:elevator-broken", text: "Burek handled the stairs better than the staff?" },
        { id: "generic:elevator-broken:opt-4", topicId: "generic:elevator-broken", text: "The out-of-order sign has its own history?" },
        { id: "generic:elevator-broken:opt-5", topicId: "generic:elevator-broken", text: "Maciek took the stairs with everyone else?" },
        { id: "generic:elevator-broken:opt-6", topicId: "generic:elevator-broken", text: "Does a broken elevator improve the office?" },
      ],
      replyCandidates: [
        {
          id: "generic:elevator-broken:rep-1",
          text: "It died at 8:05, mid-rise, between floors, and the office discovered its true fitness age by 8:20. Day one was complaints. Day two was shorts. Day three we heard whistling in the stairwell. Humanity adapts to anything by Thursday, and by the time the engineer came, half the office argued they did not need the elevator and meant it, sort of.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:elevator-broken:rep-2",
          text: "He does, they play cards. Pan Zdzislaw has serviced this elevator since it was new, and Janusz keeps coffee in the closet for his visits. The elevator breaks maybe twice a year. The engineer comes the same morning. Some buildings have service contracts. Ours has a friendship with a man who carries a toolkit and a thermos, and the elevator knows it.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "generic:elevator-broken:rep-3",
          text: "He did, four legs on every stair, tail level, unbothered, leading the office like a small yellow guide. The dog has never once used the elevator by choice. The elevator is for humans, and stairs are for souls. By Wednesday the staff had learned the route at his pace. He waited at landings. He herded gently. Best crisis manager in the building and he works for water.",
          relationshipHint: "delighted",
          tags: ["quest:burek-person"],
        },
        {
          id: "generic:elevator-broken:rep-4",
          text: "It does. The current sign is Janusz's handwriting on cardboard, laminated by Grazyna, and underneath it are three older signs nobody removed. It is a museum of small failures. Each sign is politer than the last. The oldest just says 'be patient'. Elevators break. The signs accumulate. The building keeps a diary of its own apologies.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "generic:elevator-broken:rep-5",
          text: "He did, all four floors, in his good shoes, carrying his own laptop like a regular citizen. He made two jokes and one observation about 'knowing what the third floor smells like now'. Leadership is mostly showing up in the same line as everyone else. The office climbed lighter. The shoes survived. The elevator was fixed by Thursday and somehow missed.",
          relationshipHint: "pleased",
          tags: ["quest:ceo-met"],
        },
        {
          id: "generic:elevator-broken:rep-6",
          text: "It does, briefly. The floor gets two minutes of everyone's breath, the stairwell becomes the main street, and every conversation happens between floors. Offices are ships: when one system fails, the crew meets on the deck. Then the elevator hums back to life and everyone returns to their cabins, slightly fitter and oddly nostalgic. Do not tell the elevator. It tries hard.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:thermal-mug",
      label: "The thermal mug",
      optionCandidates: [
        { id: "generic:thermal-mug:opt-1", topicId: "generic:thermal-mug", text: "Everyone has a thermal mug with a story?" },
        { id: "generic:thermal-mug:opt-2", topicId: "generic:thermal-mug", text: "The mug survived being lost for a week?" },
        { id: "generic:thermal-mug:opt-3", topicId: "generic:thermal-mug", text: "Someone's mug is a merch piece from a rival?" },
        { id: "generic:thermal-mug:opt-4", topicId: "generic:thermal-mug", text: "Burek has learned which mug belongs to whom?" },
        { id: "generic:thermal-mug:opt-5", topicId: "generic:thermal-mug", text: "Grazyna counted the abandoned mugs in the kitchen?" },
        { id: "generic:thermal-mug:opt-6", topicId: "generic:thermal-mug", text: "What does a thermal mug say about its owner?" },
      ],
      replyCandidates: [
        {
          id: "generic:thermal-mug:rep-1",
          text: "Every mug is an autobiography with a lid. Conference swag, a gift from someone who left, one bought at 7am in a petrol station during the hardest week of someone's life. The office kitchen is a mug museum where every exhibit is in active use. You learn a colleague twice: once in a meeting, once when they explain their mug.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:thermal-mug:rep-2",
          text: "It did, for five days, and its human grieved quietly at every coffee machine in the building. Then it appeared in the meeting room, behind the ficus, full of pens nobody had missing. The reunion was private but widely reported. Mugs go missing. The good ones come back. It is the difference between loss and lending to the universe.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:thermal-mug:rep-3",
          text: "It is, displayed on the desk like a war trophy, logo outward, daily. The owner says it keeps coffee warm and enemies visible. Nobody has asked the rival company what they think. The mug speaks for itself, in bold letters, every morning. It is the most honest piece of competitive analysis in the building.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:thermal-mug:rep-4",
          text: "He has. The blue mug is paw-up. The green one gets the sigh. The red flask is watched like television. Nobody taught him the mug census. He simply knows whose drink is whose and positions himself accordingly, because somewhere in the last three years a person with a green mug proved statistically generous. Burek runs odds. The odds run on mugs.",
          relationshipHint: "delighted",
          tags: ["quest:burek-person"],
        },
        {
          id: "generic:thermal-mug:rep-5",
          text: "She did, quarterly, and posts the census on the board: nine mugs, no owners, one funeral date each. Two are claimed within the hour, out of shame. The remaining seven sit on the shelf of abandoned dreams until the great quarterly purge. Nobody has ever defended an unclaimed mug. Deep down, everyone knows which mugs are theirs. The shelf knows who is lying.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "generic:thermal-mug:rep-6",
          text: "It says: this person has somewhere to be and intends to drink anyway. The mug people are the logistics people, the walkers, the ones who treat coffee as a companion rather than an event. Ceramic people sip at desks. Thermal people sip between. Both are right. Only one of them has ever burned a tongue at the top of the stairs. The mug is a biography. The lid is a promise.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "generic:out-of-office",
      label: "The out-of-office reply",
      optionCandidates: [
        { id: "generic:out-of-office:opt-1", topicId: "generic:out-of-office", text: "You wrote your OOO reply with unusual care?" },
        { id: "generic:out-of-office:opt-2", topicId: "generic:out-of-office", text: "The honest OOO reply went viral internally?" },
        { id: "generic:out-of-office:opt-3", topicId: "generic:out-of-office", text: "Someone set an OOO and stayed in the office?" },
        { id: "generic:out-of-office:opt-4", topicId: "generic:out-of-office", text: "Tomek's OOO is one line, always?" },
        { id: "generic:out-of-office:opt-5", topicId: "generic:out-of-office", text: "Grazyna respects every auto-reply but bills anyway?" },
        { id: "generic:out-of-office:opt-6", topicId: "generic:out-of-office", text: "Why does the OOO reply feel like a small vacation itself?" },
      ],
      replyCandidates: [
        {
          id: "generic:out-of-office:rep-1",
          text: "Everyone does, and the care is the tell. It is the only email all year where you are allowed a personality. Dates, a name, a small promise about Monday. Some people write theirs like a resignation, some like a haiku. The OOO is the office's annual literature. I read every one I get. You can hear a person's whole soul in how they say 'I am away'.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:out-of-office:rep-2",
          text: "It did. 'I am on holiday. I have left no emergency number, because I have decided there are no emergencies, only decisions that can wait until the 14th.' Management quoted it for a year. It set a tone nobody expected: the office kept running. The reply comes back every summer like a migratory bird, longer each time, loved by everyone.",
          relationshipHint: "delighted",
        },
        {
          id: "generic:out-of-office:rep-3",
          text: "They did. Auto-reply on, desk occupied, a vacation held entirely in metadata. When asked, they said the reply was 'aspirational'. The office adopted the word immediately. Since then, half the OOOs in this building are legal fictions, and everyone agrees the fiction is the point: the reply holds the door for the vacation until the vacation can arrive.",
          relationshipHint: "pleased",
        },
        {
          id: "generic:out-of-office:rep-4",
          text: "His is, and it never changes: 'Away until the 14th. Tomasz.' No greeting, no apology, no emoji, no 'limited access'. Eleven years, same line. It is the most respected email in the company precisely because it explains nothing. You do not ask a mountain for an estimated return. You read the line. You wait for the 14th. Things keep compiling.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "generic:out-of-office:rep-5",
          text: "She does, every autoresponder, warmly, and the invoices continue like the tide. Her favorite is Bartek's, because his says 'train the backup', and she says that line 'pays for the whole industry'. An OOO is a promise to a client and a boundary to a colleague, and accounting is the only department that reads both. She once replied to an auto-reply with an invoice.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "generic:out-of-office:rep-6",
          text: "Because it is the one moment your absence is officially arranged. The email goes out and the world agrees, in writing, to miss you politely. Everything you did not finish is suddenly not your problem for nine days, by contract. The OOO is the closest an office worker comes to a royal decree. Writing it well is not vanity. It is packing the last bag.",
          relationshipHint: "pleased",
        },
      ],
    },
  ],
  taskOffers: [],
};

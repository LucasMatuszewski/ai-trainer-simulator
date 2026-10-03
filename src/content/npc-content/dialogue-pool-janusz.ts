/**
 * WS5 dialogue v2 pool — Janusz, The Janitor (C-77).
 *
 * Pure authored data. Topics: the robot fleet (Zdzislaw, Halina, Seba),
 * the cleaning philosophy (the bins are the only honest reports), and the
 * janitor closet (the rack, the locks, the good coffee, the retired
 * printer's socket). Task offer: the citizenship test — a guided tour of
 * the building's truth (sets the existing `janusz-knows-the-plug` flag).
 * Tone matches his legacy trees: eleven years, three CEOs, one flood, and
 * machines welded in his own garage.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const JANUSZ_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "janusz",
  topics: [
    {
      id: "janusz:fleet",
      label: "Robot fleet maintenance",
      optionCandidates: [
        {
          id: "janusz:fleet:opt-1",
          topicId: "janusz:fleet",
          text: "How is the fleet holding up?",
        },
        {
          id: "janusz:fleet:opt-2",
          topicId: "janusz:fleet",
          text: "Zdzislaw has been wheezing on the big rugs.",
        },
        {
          id: "janusz:fleet:opt-3",
          topicId: "janusz:fleet",
          text: "Seba broke another mug. I saw it.",
        },
        {
          id: "janusz:fleet:opt-4",
          topicId: "janusz:fleet",
          text: "Do the robots ever talk to each other?",
        },
        {
          id: "janusz:fleet:opt-5",
          topicId: "janusz:fleet",
          text: "What does Halina do in winter?",
        },
        {
          id: "janusz:fleet:opt-6",
          topicId: "janusz:fleet",
          text: "Could you build a robot for the printer?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:fleet:rep-1",
          text: "Better than the staff. Zdzislaw is due a belt, Halina is on her third pump — the first two drowned, which is a long story involving the flood — and Seba has not missed a mug run since 2021. The fleet does not take sick days. It takes maintenance, and maintenance is love with a schedule.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:fleet:rep-2",
          text: "That is not wheezing, that is Zdzislaw THINKING. He maps the room every run and the big rugs confuse the map. I could upgrade his sensors. I could also move the rug. The rug is cheaper and the rug learns nothing. Some problems you just relocate.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:fleet:rep-3",
          text: "Seba does not break mugs. Seba RELOCATES mugs the audit has flagged. Watch: whatever Burek sighed at in standup, Seba's route touches that desk by three. The fleet and the dog coordinate. Nobody assigned it. It emerged, like traffic.",
          relationshipHint: "delighted",
          tags: ["quest:burek-standup-observed", "relationship:neutral"],
        },
        {
          id: "janusz:fleet:rep-4",
          text: "Constantly, and it is none of our business. Halina pings the kettle so the plant water runs warm, and Seba waits out the dishwasher's first two cycles because they are theater. Machines with routines are colleagues. Machines with routines AND secrets are STAFF.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:fleet:rep-5",
          text: "The winter schedule. Halina waters less, the plants sulk, and I read her the forecast so she can plan. A robot that waters on data instead of habit. Some engineers in this building could learn from a watering can with a brain, but their loss is the ferns' gain.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:fleet:rep-6",
          text: "No. And you know why. The printer is retired with honors, and retirement is sacred. The day I build a printer robot, the printer becomes MAINTAINED, and maintained things ask for toner, and toner asks for budget, and budget asks Grazyna. The fleet ends where the legend begins.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "janusz:philosophy",
      label: "Cleaning philosophy",
      optionCandidates: [
        {
          id: "janusz:philosophy:opt-1",
          topicId: "janusz:philosophy",
          text: "What is your cleaning philosophy?",
        },
        {
          id: "janusz:philosophy:opt-2",
          topicId: "janusz:philosophy",
          text: "The bins know everything, do they.",
        },
        {
          id: "janusz:philosophy:opt-3",
          topicId: "janusz:philosophy",
          text: "Why does the office feel calmer at 7am?",
        },
        {
          id: "janusz:philosophy:opt-4",
          topicId: "janusz:philosophy",
          text: "Is a clean desk a good sign or a bad one?",
        },
        {
          id: "janusz:philosophy:opt-5",
          topicId: "janusz:philosophy",
          text: "You have cleaned this office through three CEOs.",
        },
        {
          id: "janusz:philosophy:opt-6",
          topicId: "janusz:philosophy",
          text: "What is the weirdest thing you have found?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:philosophy:rep-1",
          text: "I do not clean mess. I clean EVIDENCE. The mess is information — whose week is heavy, who is eating at the desk, who printed something in 2019 and hid it. Tidy a mess and the building stops talking to you. I mostly listen, then quietly remove the receipts.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:philosophy:rep-2",
          text: "The bins are the only honest reports in this company. Cans say crunch, apple cores say hope, shredded paper says somebody is starting over. I have read more truth from the bins than from every all-hands combined, and the bins have never once asked me for a deck.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:philosophy:rep-3",
          text: "Relax. The machine is down, not the OFFICE. There is a percolator in the closet, second shelf, behind the rack — it predates the flood and it has never once refused. I brew, the floor drinks, and the event passes without one ticket. This is why the closet has three locks. Emergencies need privacy.",
          relationshipHint: "pleased",
          tags: ["event:event-coffee-broken", "relationship:neutral"],
        },
        {
          id: "janusz:philosophy:rep-4",
          text: "A clean desk at nine is a person who arrived early and cares. A desk that was already clean at seven the night before is a person interviewing elsewhere. I dust both the same. I salute the second one quietly.",
          relationshipHint: "neutral",
          tags: ["period:morning"],
        },
        {
          id: "janusz:philosophy:rep-5",
          text: "Three CEOs, one flood, one rebrand. The building does not care who sits at the top; it cares who unplugs the kettle at Christmas. I have outlasted every vision statement on those walls, because the vision statements do not know where the drains are. I do. That is power, worn modestly.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:philosophy:rep-6",
          text: "A wedding ring, a live lobster, and a business plan for a robot company. The ring went to lost and found, the lobster went home with the founder — long week, that one — and the plan went in a drawer. If the world is ever ready, I know a man.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "janusz:closet",
      label: "The janitor closet",
      optionCandidates: [
        {
          id: "janusz:closet:opt-1",
          topicId: "janusz:closet",
          text: "What is humming inside the janitor closet?",
        },
        {
          id: "janusz:closet:opt-2",
          topicId: "janusz:closet",
          text: "Is that a server rack next to the mop heads?",
        },
        {
          id: "janusz:closet:opt-3",
          topicId: "janusz:closet",
          text: "Why does the closet have three locks?",
        },
        {
          id: "janusz:closet:opt-4",
          topicId: "janusz:closet",
          text: "What is the tin marked INDUSTRIAL?",
        },
        {
          id: "janusz:closet:opt-5",
          topicId: "janusz:closet",
          text: "The socket labeled DO NOT USE (FIRE). Explain.",
        },
        {
          id: "janusz:closet:opt-6",
          topicId: "janusz:closet",
          text: "Can I see the closet? Just once.",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:closet:rep-1",
          text: "The dehumidifier, mostly. And the network cabinet. And Halina's charging dock. The closet is the engine room of this entire building and it is the size of a confession booth. Every office has one room that actually matters. Ours smells of lemon.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:closet:rep-2",
          text: "Mop heads, then the rack, then the shelf of cables I have crimped myself. Marek thinks the office network runs on faith. It runs through MY closet, on MY shelf, with labels only I can read. The labels are in Polish. The important ones are in cursive.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:closet:rep-3",
          text: "One lock is for the cleaning supplies, one is for the equipment, and one is because some questions answer themselves if the door stays shut. The locks are not for thieves. Thieves take things. The locks are for the CURIOUS, who leave worse behind.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:closet:rep-4",
          text: "Grazyna's private reserve, and since the flood story you are one of four people who know it exists. One scoop. Two on a Friday. That coffee has been aging since 2019 — like the printer's retirement, like the drains' map, everything good in this building survives by being left alone.",
          relationshipHint: "delighted",
          tags: ["quest:janusz-told-the-flood", "relationship:warm"],
        },
        {
          id: "janusz:closet:rep-5",
          text: "There is no fire. There is only consequence. The printer is retired and the socket stays labeled. You do not un-retire a monument because a Tuesday is boring. Besides, plugged in, it prints ONE page, unrequested. It said 'OK' in 2019. Let the man rest.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:closet:rep-6",
          text: "Once, properly, with the lights on. I will show you the rack, the drains, and which floor squeak belongs to which office. Everyone should know the building they work in — the building already knows you. Consider it the citizenship test, first attempt, open book.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
          offersTaskId: "janusz:task-citizenship",
        },
      ],
    },
    {
      id: "janusz:flood",
      label: "The flood, fully",
      optionCandidates: [
        {
          id: "janusz:flood:opt-1",
          topicId: "janusz:flood",
          text: "Tell me the flood story. The whole thing.",
        },
        {
          id: "janusz:flood:opt-2",
          topicId: "janusz:flood",
          text: "What saved the server rack that night?",
        },
        {
          id: "janusz:flood:opt-3",
          topicId: "janusz:flood",
          text: "The high-water mark is still marked on the wall.",
        },
        {
          id: "janusz:flood:opt-4",
          topicId: "janusz:flood",
          text: "Who else was in the building that night?",
        },
        {
          id: "janusz:flood:opt-5",
          topicId: "janusz:flood",
          text: "Could the flood happen again?",
        },
        {
          id: "janusz:flood:opt-6",
          topicId: "janusz:flood",
          text: "Teach me what you learned. All of it.",
          tags: ["relationship:warm"],
        },
      ],
      replyCandidates: [
        {
          id: "janusz:flood:rep-1",
          text: "2019, October, a Sunday. The drain in the server closet backed up at two in the morning and by three there was an inch of water walking across the office like it owned the place. I live eleven minutes away. I was here in eight. The water was cold, the night was long, and by six the office was dry and I was a different janitor. Every building has one story that made it.…",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:flood:rep-2",
          text: "A mop, a bucket, and the fact that I had rebuilt that rack's shelf myself, higher than spec, because the floor 'felt wrong' in September. The felt wrong saved forty thousand zloty of equipment and nobody has ever questioned a feeling I have had since. The machines were in the air, the water went under, and the geometry held. Elevation is the oldest technology. I…",
          relationshipHint: "pleased",
          tags: ["quest:janusz-told-the-flood", "relationship:neutral"],
        },
        {
          id: "janusz:flood:rep-3",
          text: "The pencil line stays. I refresh it every spring, one stroke, so the wall does not forget and neither do the new floors. Marek once asked if it was a level marker for furniture. I said yes. Some truths are maintenance-only information. The wall knows. The wall and I have an arrangement about what gets remembered publicly.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:flood:rep-4",
          text: "Just me and the building. Marek was paged and answered in pajama pants by four, which was heroic for him. But the first three hours — me, the water, the machines, and the sound a building makes when it is drinking. Nobody talks about that sound. Once you have heard an office swallow, you hear drains in your sleep for a year. The building and I are close because of…",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:flood:rep-5",
          text: "Water always comes back. It is patient and the pipes are old, and the only question is whether the next pair of hands knows where the shut-off lives. That is why the closet has a map, the drains have a schedule, and the flood kit sits by the door like a fire extinguisher for weather. It will happen again. The difference is that this time, the building is ready, because…",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:flood:rep-6",
          text: "Lesson one: water wins, you just choose the score. Lesson two: elevation, always elevation — nothing important lives on the floor. Lesson three: the shut-off valve matters more than any mop, and knowing it is worth more than owning it. People ask me for the story. The story is free. The lessons cost one Sunday night, and I give those away too, because the next flood does…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
          offersTaskId: "janusz:task-flood-kit",
        },
      ],
    },
    {
      id: "janusz:kettle",
      label: "The kettle and the winters",
      optionCandidates: [
        {
          id: "janusz:kettle:opt-1",
          topicId: "janusz:kettle",
          text: "Why does the kettle get unplugged at Christmas?",
        },
        {
          id: "janusz:kettle:opt-2",
          topicId: "janusz:kettle",
          text: "The kettle makes a different sound in winter.",
        },
        {
          id: "janusz:kettle:opt-3",
          topicId: "janusz:kettle",
          text: "How old is the kettle, honestly?",
        },
        {
          id: "janusz:kettle:opt-4",
          topicId: "janusz:kettle",
          text: "Someone complained the tea is 'just okay'.",
        },
        {
          id: "janusz:kettle:opt-5",
          topicId: "janusz:kettle",
          text: "Could the kettle be smart? New one, app-connected?",
        },
        {
          id: "janusz:kettle:opt-6",
          topicId: "janusz:kettle",
          text: "You talk to the kettle. I have seen you.",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:kettle:rep-1",
          text: "Two weeks, every year, since the flood's little cousin in 2014 — a slow leak, nothing dramatic, but the kettle's socket sits low and I do not gamble with electricity and holidays. The office runs on the backup thermos for those two weeks and the tea is worse and nobody dies. Unplugging is not superstition. Unplugging is the cheapest insurance in the building and the…",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:kettle:rep-2",
          text: "Colder water, longer to boil, and the element hums a semitone lower. Anyone who has listened for ten years hears the season in it. Winter kettle is a slower, deeper voice — like the building talking with a coat on. I mark the first winter boil on the calendar. Not for records. For company. A man should know what time of year it is by his ears alone.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:kettle:rep-3",
          text: "Older than the flood, the blue chair, and three of the robots' spare parts. There is no manufacturing date left — I checked with a flashlight once, out of respect. It predates the rebrand, which means it has served under two names and one logo change without complaint. You do not count the years on a thing that works. You count the boils. The number is private. It is large.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:kettle:rep-4",
          text: "'Just okay' is the correct review. The tea is not a performance, it is infrastructure — hot water, a clean pot, and a leaf that has done nothing to nobody. The people who want extraordinary tea bring their own extraordinary tea and the kettle welcomes it equally. The kettle is not trying to be a star. The kettle is trying to be there. There is a difference and the…",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:kettle:rep-5",
          text: "The kettle does not need an app. It needs limescale removed, a lid that closes, and to be heard when it clicks. A smart kettle texts your phone when the water is ready — a thing your EARS have known for free since fire was invented. I will not wire the kettle for notifications. The kitchen has one screen already and it is the microwave clock, and even that is mostly wrong.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:kettle:rep-6",
          text: "I talk to everything I maintain. The robots get instructions, the plants get status updates, and the kettle gets gratitude, because the kettle has never once failed this office on a cold morning and that earns a few words. People who do not talk to machines are people who have never depended on one. Talk to your tools. They last longer, and not because of the words.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "janusz:drains",
      label: "The drain map",
      optionCandidates: [
        {
          id: "janusz:drains:opt-1",
          topicId: "janusz:drains",
          text: "There is a map of the drains behind the closet door.",
        },
        {
          id: "janusz:drains:opt-2",
          topicId: "janusz:drains",
          text: "Which drain is the dangerous one?",
        },
        {
          id: "janusz:drains:opt-3",
          topicId: "janusz:drains",
          text: "The building plans show different pipes. Who is right?",
        },
        {
          id: "janusz:drains:opt-4",
          topicId: "janusz:drains",
          text: "Why do you flush the drains on a schedule?",
        },
        {
          id: "janusz:drains:opt-5",
          topicId: "janusz:drains",
          text: "Has anyone else ever seen the map?",
        },
        {
          id: "janusz:drains:opt-6",
          topicId: "janusz:drains",
          text: "What does the building sound like when a drain blocks?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:drains:rep-1",
          text: "Eleven years of listening, one sheet of paper, drawn freehand. Every grate, every slope, every elbow the builders forgot and the renovations buried. The official plans show what they INTENDED to build. My map shows what is actually under your feet. Those are different documents and only one of them has ever stopped a flood. The map stays behind the door. The door…",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:drains:rep-2",
          text: "The one under the server closet — same drain, different decade, and it holds a grudge. Every autumn it slows like an old man on stairs, and every autumn I spend an evening with it before it spends a weekend with us. It has never fully blocked since 2019 because it knows I am watching. Drains are like people: predictable, until they are not, and by then you want to already…",
          relationshipHint: "neutral",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "janusz:drains:rep-3",
          text: "The plans show a pipe that does not exist, where a pipe absolutely exists, going somewhere the plans have never heard of. Renovations in 2011 and nobody updated anything. The paper is a rumor with a stamp on it. My map is a diary with a pencil. When the water rises, you do not call the stamp. You call the diary. That is why my number is on the map and the map is on my wall.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:drains:rep-4",
          text: "Because water in a pipe that never moves turns into water with OPINIONS. Sediment, smells, and one memorable smell I call the September Incident. Ten minutes with a hose on the first of the month keeps every drain honest. Preventive flushing is the whole philosophy of maintenance in one act: talk to the pipes before the pipes talk to you. Nobody thanks you for the…",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:drains:rep-5",
          text: "Four. You, Marek, Grazyna, and the insurance inspector who photographed it in 2020 and pronounced it 'technically illegible'. Technically. The map works like music works — it does not need to be legible to anyone but its player. I could redraw it neater and I will not, because a tidy map is a map other people follow, and other people following leads to other people flushing.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:drains:rep-6",
          text: "A gulp, then a gurgle, then a silence that is worse than either. The gulp is water asking permission, the gurgle is the pipe refusing, and the silence is the two of them settling in for a long night. I hear it from the corridor. Most people hear nothing — the office hum covers the conversation. Once you have heard it once, though, you hear it forever. That is what the…",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "janusz:parking",
      label: "The parking lot",
      optionCandidates: [
        {
          id: "janusz:parking:opt-1",
          topicId: "janusz:parking",
          text: "Are there really no bodies in the parking lot?",
        },
        {
          id: "janusz:parking:opt-2",
          topicId: "janusz:parking",
          text: "The parking lot floods in heavy rain. Why there?",
        },
        {
          id: "janusz:parking:opt-3",
          topicId: "janusz:parking",
          text: "Marek's car has not moved in three weeks.",
        },
        {
          id: "janusz:parking:opt-4",
          topicId: "janusz:parking",
          text: "The pothole by space twelve ate a wheel once.",
        },
        {
          id: "janusz:parking:opt-5",
          topicId: "janusz:parking",
          text: "Who parks in the visitor spot every day?",
        },
        {
          id: "janusz:parking:opt-6",
          topicId: "janusz:parking",
          text: "What have you swept out of that lot over the years?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:parking:rep-1",
          text: "Technically none, and I say that with the precision of a man who has swept that lot every morning for eleven years. Marek says the same thing and he has never swept a day in his life, which makes us the two most credible witnesses in the building. The lot holds no bodies. It holds a lot of coffee cups and one very confident hatchback. The rest is rumor with a flood light.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:parking:rep-2",
          text: "The lot sits where the old yard sloped toward the building, and the 2011 renovation moved the slope's opinion but not its memory. Water remembers where it used to go. It pools by the fence and stages there, and the drains take an hour to talk it down. Park at the fence in heavy rain and you will find a tide chart where your floor mats used to be. The lot warns…",
          relationshipHint: "pleased",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "janusz:parking:rep-3",
          text: "It moved Tuesday. Two meters, while you watched, for the shift in the light. Marek parks where the sun does not cook the dashboard and the shade moves with the seasons, so his spot migrates twice a year like a shepherd. I sweep around it. The car collects leaves and the leaves collect stories. I know what Marek had for breakfast by what the car reflects. Do not ask.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:parking:rep-4",
          text: "The pothole is not a defect, it is a landmark with a dent. It ate a wheel in 2022 — a courier, going too fast for a place where dogs audit standups — and the city filled it with a patch that lasted nine days. The pothole ate the patch. I now sweep AROUND it and put a cone in it every November like a memorial candle. Some infrastructure you report. Some infrastructure…",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:parking:rep-5",
          text: "The silver hatchback belongs to the therapist who shares the building's courtyard entrance, and she has parked there daily for six years with the confidence of someone who has never once been towed. The spot is a visitor spot in name only — visitors come four times a year and the hatchback comes daily, and in any fair system the daily wins. I have decided it is her spot.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:parking:rep-6",
          text: "Leaves by the ton, one wedding ring, seventeen coffee cups, a resignation letter someone drafted in a car and thought better of, and the tennis ball that started Burek's entire career. The lot is where the office's outsides live — everything arrives through it and everything leaves through it, and the ground keeps what people drop. I sweep it every morning before the…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "janusz:toolbox",
      label: "The toolbox and the garage",
      optionCandidates: [
        {
          id: "janusz:toolbox:opt-1",
          topicId: "janusz:toolbox",
          text: "Your toolbox has exactly nine tools. Why so few?",
        },
        {
          id: "janusz:toolbox:opt-2",
          topicId: "janusz:toolbox",
          text: "You weld robot parts in your own garage?",
        },
        {
          id: "janusz:toolbox:opt-3",
          topicId: "janusz:toolbox",
          text: "The screwdriver with the yellow tape on it?",
        },
        {
          id: "janusz:toolbox:opt-4",
          topicId: "janusz:toolbox",
          text: "Where did you learn to fabricate like this?",
        },
        {
          id: "janusz:toolbox:opt-5",
          topicId: "janusz:toolbox",
          text: "Marek offered you power tools. You declined?",
        },
        {
          id: "janusz:toolbox:opt-6",
          topicId: "janusz:toolbox",
          text: "What is the one tool you would never lend?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:toolbox:rep-1",
          text: "Nine tools, and I could do the whole building with five. A big toolbox is a confession that you do not know which problem you will meet. I know this building's problems by name. The nine are matched to them like a keyring — one for the chairs, one for the hinges, one for the robots, and a flat piece of steel I call 'the persuader', whose job description changes seasonally.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:toolbox:rep-2",
          text: "Some weekends, yes. Zdzislaw's chassis, Halina's pump housing, Seba's bumper after the mug route met a doorframe. The office procurement process could replace them in six weeks with something worse. My garage replaces them by Sunday with something better, because the garage has no meetings. The welds are ugly and they hold. Ugly and holding is the whole…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:toolbox:rep-3",
          text: "The yellow tape means it is MINE in the way that matters — it was my father's, the tape was his, and the handle has a wear pattern that fits exactly one hand in this world. It has tightened more screws than the rest of the toolbox combined. It does not leave the building. It does not leave my hand, mostly. When I retire, the tape goes with me, and the building will have…",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:toolbox:rep-4",
          text: "The railway, twenty years. Signal boxes, track circuits, and the understanding that if your weld fails, a train finds out first. That job teaches precision the way the sea teaches swimming. Everything I fabricate here is built to railway standards for a building that will never know how close to the standard it lives. The robots do not know either. They just run. Running…",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:toolbox:rep-5",
          text: "He offered, once, a whole trolley of them, cordless, the color of wasps. I declined and he took it personally for a week. But listen: a power tool does the work and you learn nothing, and I maintain this building with my HANDS so my hands stay current. The day I need a wasp-colored trolley is the day the building no longer needs me. Marek understood eventually. He…",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:toolbox:rep-6",
          text: "The persuader. Not because it is precious — because in the wrong hands it is a WEAPON, and I mean that legally and historically. It has persuading left in it and the building benefits from exactly the amount I use. Lending it would be like lending out the weather. Some tools are not equipment. Some tools are policy. The persuader is policy.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "janusz:schedule",
      label: "The five am schedule",
      optionCandidates: [
        {
          id: "janusz:schedule:opt-1",
          topicId: "janusz:schedule",
          text: "You are here at five am. Voluntarily?",
        },
        {
          id: "janusz:schedule:opt-2",
          topicId: "janusz:schedule",
          text: "What happens in the office before anyone arrives?",
        },
        {
          id: "janusz:schedule:opt-3",
          topicId: "janusz:schedule",
          text: "Do the robots run overnight shifts too?",
        },
        {
          id: "janusz:schedule:opt-4",
          topicId: "janusz:schedule",
          text: "Five am in winter must be dark and cold.",
        },
        {
          id: "janusz:schedule:opt-5",
          topicId: "janusz:schedule",
          text: "Could someone ever take over the early shift?",
        },
        {
          id: "janusz:schedule:opt-6",
          topicId: "janusz:schedule",
          text: "What is the best hour of your whole day?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:schedule:rep-1",
          text: "Voluntary the way breathing is voluntary. The building talks at five — the heating settles, the pipes tick through their morning stretch, and the fridge makes its one confession of the day. You cannot hear any of it at ten am with forty humans in the room. The quiet is not empty. The quiet is DIAGNOSTIC. I come for the same reason doctors look at charts before patients wake up.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:schedule:rep-2",
          text: "The robots finish their last routes, the plants tell Halina what they drank overnight, and the building does an inventory of everything that happened to it while you were all dreaming. Something always happened. A chair moved. A window crept open. One of the mugs migrated to a shelf it has never liked. At five I hear the news before the news becomes complaints. Then I…",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:schedule:rep-3",
          text: "Zdzislaw does one midnight pass, quiet as a rumor. Halina rests — plants sleep and so does she. Seba's last mug run is 9pm sharp because the dishwasher's third cycle is his and he does not share schedules. The fleet works in shifts like a proper crew, and the shifts have never been written down anywhere. They emerged. Same as the standup audit. Some rosters are too true…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:schedule:rep-4",
          text: "Dark, yes. Cold, no — I heat the building FROM cold, which means the building wakes up warm instead of waking up shocked. There is a difference and the difference is morale. Cold starts crack timber and moods. I arrive while the night is still in charge, walk the floors, and turn the building's coat on gently. Winter five am is mine. It is the one shift nobody envies…",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:schedule:rep-5",
          text: "The schedule can be taught in a week. The ears cannot — the ears are eleven years of listening to this specific building lie about its health. Someone will take the five am shift one day and they will run it by the book, and the book is good. But the book does not say what a fridge sounds like before it quits, and that knowledge is not teachable. It is inheritable. I…",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:schedule:rep-6",
          text: "Six forty-five. The building is warm, the coffee is on, the floor is dry, and the first key turns in the door — always Renata, always eight minutes early, always the same surprised face at the smell of coffee, as if eleven years could surprise a person. That minute is the whole job. The building ready, the first human arriving, and neither of us has to say it out loud.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "janusz:christmas",
      label: "The office at Christmas",
      optionCandidates: [
        {
          id: "janusz:christmas:opt-1",
          topicId: "janusz:christmas",
          text: "What does the office look like on Christmas Eve?",
        },
        {
          id: "janusz:christmas:opt-2",
          topicId: "janusz:christmas",
          text: "You unplug the kettle. Everyone panics.",
        },
        {
          id: "janusz:christmas:opt-3",
          topicId: "janusz:christmas",
          text: "Does anyone work between the holidays?",
        },
        {
          id: "janusz:christmas:opt-4",
          topicId: "janusz:christmas",
          text: "The tree by reception — real or synthetic?",
        },
        {
          id: "janusz:christmas:opt-5",
          topicId: "janusz:christmas",
          text: "Who checks on the plants during the holidays?",
        },
        {
          id: "janusz:christmas:opt-6",
          topicId: "janusz:christmas",
          text: "Do you get a gift from the office?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:christmas:rep-1",
          text: "Empty, warm, and honest. No bags, no coats, no borrowed postures — just the furniture saying what it always says when the humans step out. I walk every room with the lights low and the vacuum off, and the building hums like a house after guests. That is when I do the year's deep clean. You can only truly clean a room when nobody is performing in it. Christmas Eve is the…",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:christmas:rep-2",
          text: "They panic for one day and then the thermos teaches them patience. The kettle rests because sockets rest, that is the whole liturgy. Two weeks later the office switches it back on and the first boil of January is a small ceremony — whoever is in the kitchen at that moment gets the first cup and a story about why. The panic is tradition now. Traditions need a little fear…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:christmas:rep-3",
          text: "Between the holidays the office fills with people who want quiet more than they want Christmas — Marek, mostly, and one week the CEO's entire strategic thinking happened in a corner with the tree lights on. I keep the coffee strong and the questions zero. Those days are the most productive of the year and they are made of silence, batteries, and one man vacuuming very…",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:christmas:rep-4",
          text: "Real, and it is the twentieth year of the same species of tree because a synthetic tree cannot be composted into the plant beds in January. The tree dies into the garden and the garden feeds Halina's plants and the plants feed the office air. The tree is not decoration. The tree is a CYCLE with tinsel on. Grazyna signed off the real tree in 2016 with two words:…",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:christmas:rep-5",
          text: "Halina, on her winter schedule, which I wrote at a slower rate and she has followed without a single dropped fern. I come in twice regardless — once to check and once to apologize in person for the visitor-less quiet. The plants are the easiest employees to cover: they need water and to be looked at. Half the office could learn from the arrangement. The plants never…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:christmas:rep-6",
          text: "Every year, and every year it is the same envelope from the two people who run this company with clipboards and calendars — Renata and Zosia — and inside is enough for a good dinner and a card signed by everyone. The signatures are the gift. Eleven years of them. I keep every card in the closet, in the drawer with the good cloths, because that is where things that matter…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "janusz:successor",
      label: "Who inherits the closet",
      optionCandidates: [
        {
          id: "janusz:successor:opt-1",
          topicId: "janusz:successor",
          text: "Who takes the closet when you retire?",
        },
        {
          id: "janusz:successor:opt-2",
          topicId: "janusz:successor",
          text: "Would you train someone from outside?",
        },
        {
          id: "janusz:successor:opt-3",
          topicId: "janusz:successor",
          text: "Pawel asked about the robots' maintenance.",
        },
        {
          id: "janusz:successor:opt-4",
          topicId: "janusz:successor",
          text: "Could a robot eventually replace you?",
        },
        {
          id: "janusz:successor:opt-5",
          topicId: "janusz:successor",
          text: "What does the closet need that no one can learn?",
        },
        {
          id: "janusz:successor:opt-6",
          topicId: "janusz:successor",
          text: "What do you want said at your retirement?",
        },
      ],
      replyCandidates: [
        {
          id: "janusz:successor:rep-1",
          text: "Nobody yet, and that is the honest answer. There is a list forming where the drain map hangs — who listens, who shows up, who asks the second question — and the list has four names on it, and one of them is the dog's. The closet does not need a janitor. It needs a KEEPER. Keepers are not hired. They are noticed, usually doing something small very well at an hour nobody…",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:successor:rep-2",
          text: "I would train anyone who passes one test: one full week of five am, unpaid attention, no questions. The building either talks to them or it does not, and I cannot teach the building to talk. Everything else — the drains, the fleet, the kettle liturgy — that is six months of showing, not telling. The trade has always been apprenticeship. The certificate is the…",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:successor:rep-3",
          text: "He did, and he asked it the RIGHT way — not 'how do the robots work' but 'what do they need'. That is a maintenance question from a scripting man, and it moved him up the list by two places. The boy keeps a backup alive for two years out of stubbornness and now he asks after the fleet. Watch him. If he starts arriving early without being told, the list will shorten on…",
          relationshipHint: "delighted",
          tags: ["quest:pawel-restore-drill", "relationship:warm"],
        },
        {
          id: "janusz:successor:rep-4",
          text: "The robots can replace my hands and my schedule already — Zdzislaw hoovers better than I ever did and he does not complain about the rugs. What no fleet can do is DECIDE. Decide that today the third floor gets extra attention, that the smell in the kitchen is nothing, that the man in stairwell B needs ten minutes of silence and a mop to hold. Maintenance is judgment…",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:successor:rep-5",
          text: "Patience with things that cannot be rushed and attention for things that never complain. The closet is full of systems that whisper before they scream — a drain, a hinge, a man — and the whole job is hearing whispers. Everyone can learn the valves and the voltages in a season. The hearing takes years, and some folks never get it, because they never stop talking long…",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:successor:rep-6",
          text: "Nothing long. Say that the building was warm, the floors were dry, and nobody who worked here ever fell in the dark. Then let me hand over the keys — the closet keys, the drain map, the yellow-taped screwdriver stays with me, but the keys go on — and let the next keeper say nothing at all, because a good handover is quiet. Eleven years and the whole eulogy is…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "janusz:task-citizenship",
      title: "The citizenship test",
      description: "A guided tour of the building's truth: the rack in the closet, every drain, the third socket behind the cabinet, and the tin marked INDUSTRIAL. Knowing a thing in this office is a visa. What you do with the plug is the citizenship test.",
      flagToSet: "janusz-knows-the-plug",
      rewardHint: "+the building's trust",
    },
    {
      id: "janusz:task-flood-kit",
      title: "The flood kit drill",
      description: "Assemble and stage the flood kit by the door: the pump, the sandbags, the shut-off valve map, and one laminated page that says where the water wins. Janusz provides the map, the lesson, and one Sunday-night story nobody asks for. The next flood does not care who learned the lessons. Learn them anyway.",
      flagToSet: "janusz-flood-kit",
      rewardHint: "+the building's trust, waterproofed",
    },
  ],
};

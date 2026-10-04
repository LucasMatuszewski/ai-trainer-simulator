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
    {
      id: "janusz:keys",
      label: "The key hierarchy",
      optionCandidates: [
        { id: "janusz:keys:opt-1", topicId: "janusz:keys", text: "How many keys does one janitor need?" },
        { id: "janusz:keys:opt-2", topicId: "janusz:keys", text: "There is a key that opens nothing. Explain." },
        { id: "janusz:keys:opt-3", topicId: "janusz:keys", text: "The master key weighs more than the others." },
        { id: "janusz:keys:opt-4", topicId: "janusz:keys", text: "Who has keys to the closet besides you?" },
        { id: "janusz:keys:opt-5", topicId: "janusz:keys", text: "The server room key has a red fob. Why?" },
        { id: "janusz:keys:opt-6", topicId: "janusz:keys", text: "Could the office go keyless? Badge readers?" },
      ],
      replyCandidates: [
        {
          id: "janusz:keys:rep-1",
          text: "Fourteen, and each one earns its weight. The rest of the ring is history — keys to doors the renovation removed, a filing cabinet nobody owns, and the bicycle cage from a company that shared this floor in 2015. You do not throw away a key. You retire it to the hook. The hook has order.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:keys:rep-2",
          text: "It is the unknown. Every building has one lock nobody can name, and the key for it arrives with the building and outlives the staff. I keep it to remind myself that a building keeps secrets even from the man who sweeps it. Every few years, a door turns out to exist. The key was ready.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:keys:rep-3",
          text: "It should — the master is brass with a steel core and twenty-two years of turning. Weight is memory. That key has opened this building through a flood, three CEOs, and one night I do not discuss. The others are keys. The master is tenure. You can hear the difference in the lock.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:keys:rep-4",
          text: "Marek, for the equipment. Grazyna, for nothing, but the lock does not know that. And Renata holds the emergency key, which is a different thing from a key — it has a rule attached: use it, then call me, in that order. Emergency keys are promises. The others are permissions.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:keys:rep-5",
          text: "Red fob means 'alarm inside'. The room arms itself at eight, and the fob is the memory aid for the one key that bites. Colors on keys are not decoration, they are warnings — green is harmless, blue is the roof, red is the room where mistakes get expensive. I did not invent the system. I obey it.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:keys:rep-6",
          text: "A badge can be revoked by a spreadsheet and a key can only be taken from a hand. That difference matters when the power fails and the person holding the door is the one who fixes the power. Keyless is fine for the front. The basement stays brass. Some doors should know who is asking.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "janusz:recycling",
      label: "The recycling regime",
      optionCandidates: [
        { id: "janusz:recycling:opt-1", topicId: "janusz:recycling", text: "The recycling bins have more rules than git. Help?" },
        { id: "janusz:recycling:opt-2", topicId: "janusz:recycling", text: "Someone put coffee cups in the paper bin. Crime?" },
        { id: "janusz:recycling:opt-3", topicId: "janusz:recycling", text: "Where do the robot's dust bags go?" },
        { id: "janusz:recycling:opt-4", topicId: "janusz:recycling", text: "Is the sorting actually checked, or theater?" },
        { id: "janusz:recycling:opt-5", topicId: "janusz:recycling", text: "Grazyna charges departments for wrong bins?" },
        { id: "janusz:recycling:opt-6", topicId: "janusz:recycling", text: "What happens to the shredded paper mountain?" },
      ],
      replyCandidates: [
        {
          id: "janusz:recycling:rep-1",
          text: "Five bins, five laws, one sorting table by the window. The rules feel like bureaucracy until you see the invoice from the company that charges by contamination. The table is where the office learns: one sheet, one look, one correction. I correct with silence and a raised eyebrow. It works.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:recycling:rep-2",
          text: "Not a crime — a Tuesday. Coffee cups are lined with plastic, which makes them liars in the paper bin. I fish them out, I leave one clean cup on the table as a receipt, and by the third week people learn. Nobody has ever repeated it after the receipt appears. The cup does the teaching.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:recycling:rep-3",
          text: "Zdzislaw's dust goes with the general waste, but the bags are emptied into the compactor room, because a robot's dust is the building's autobiography — conference badge shreds, one earring, and last spring a milk tooth, which I did not ask about. The bags are inventoried. Not by me. By curiosity.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:recycling:rep-4",
          text: "Checked, photographed, and archived — the collection company sends a monthly contamination score and Grazyna reads it like a stock report. We sit at four percent, which is excellent, and I intend to keep it there. The score goes on the closet door. Shame, gently applied, is infrastructure.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:recycling:rep-5",
          text: "She does, five zloty per incident, and it is the fairest tax in the building because it is the only one you can see the reason for. The money buys the sorting table's replacement bags. Self-funding justice. She invented it after the cardboard winter of 2021. First Grazyna form I ever signed smiling.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:recycling:rep-6",
          text: "Twice a year, to the secure shredding van, where it is pulped and reborn as the next year's paper towels. The mountain is the only document that truly dies here. Everything else survives in a folder. The shredder is mercy. I run it on Fridays, for the sound and the finality.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "janusz:pigeon",
      label: "The pigeon incident",
      optionCandidates: [
        { id: "janusz:pigeon:opt-1", topicId: "janusz:pigeon", text: "There is a pigeon in the meeting room. Again?" },
        { id: "janusz:pigeon:opt-2", topicId: "janusz:pigeon", text: "How does a pigeon even get in?" },
        { id: "janusz:pigeon:opt-3", topicId: "janusz:pigeon", text: "The pigeon has a name. Official or not?" },
        { id: "janusz:pigeon:opt-4", topicId: "janusz:pigeon", text: "Who cleans after the pigeon leaves?" },
        { id: "janusz:pigeon:opt-5", topicId: "janusz:pigeon", text: "Renata wants a bird deterrent. Options?" },
        { id: "janusz:pigeon:opt-6", topicId: "janusz:pigeon", text: "Did the pigeon audit the standup too?" },
      ],
      replyCandidates: [
        {
          id: "janusz:pigeon:rep-1",
          text: "Fourth time this year, same bird, same window. The meeting room is the calmest space in the building, and animals know it. I will open the windows, dim the lights, and leave the room. A pigeon cannot resist an open window and cannot tolerate an audience. The retreat is the capture.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:pigeon:rep-2",
          text: "Through the loading door when the delivery holds it too long, then up the stairwell, which is a wind tunnel with rest stops. The building has two entrances and the pigeon uses the one without a door policy. Everything enters by the route that is most convenient and least supervised. Offices too.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:pigeon:rep-3",
          text: "The office calls him Stanislaw. I call him 'the recurring item'. He is the only visitor who attends without a badge, leaves without a review, and has never once blocked the printer. If he filed a complaint it would be the most reasonable one in the building's history. He does not file. He arrives.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:pigeon:rep-4",
          text: "Me, with the equipment I keep for exactly this, because this office has a pigeon frequency and I respect patterns. The kit lives under the sink: gloves, cloths, one lemon spray that makes the place presentable and philosophical. After Stanislaw leaves, the room smells like citrus and lessons.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:pigeon:rep-5",
          text: "Options: nets, which catch cables; spikes, which catch pigeons and dignity; or the owl, which is plastic and fooled nobody including me. The real deterrent is the door discipline, which is free and human. I told her: fix the delivery habit, and Stanislaw becomes a legend instead of a line item.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:pigeon:rep-6",
          text: "He sat through one, on the windowsill, and left at the forecasting — I noted the timing but I will not build a theory on one bird. The office built the theory FOR me. There is a chart. Marek made it. Stanislaw's exits now track Przemek's optimism within four percent. I neither confirm nor deny.",
          relationshipHint: "delighted",
          tags: ["quest:burek-standup-observed", "relationship:neutral"],
        },
      ],
    },
    {
      id: "janusz:roof",
      label: "The roof",
      optionCandidates: [
        { id: "janusz:roof:opt-1", topicId: "janusz:roof", text: "Is the roof accessible or legendary?" },
        { id: "janusz:roof:opt-2", topicId: "janusz:roof", text: "What is actually up there besides gravel?" },
        { id: "janusz:roof:opt-3", topicId: "janusz:roof", text: "The roof drains — yours or the drains' problem?" },
        { id: "janusz:roof:opt-4", topicId: "janusz:roof", text: "Marek wants an antenna on the roof. Verdict?" },
        { id: "janusz:roof:opt-5", topicId: "janusz:roof", text: "Who is allowed up there? Officially?" },
        { id: "janusz:roof:opt-6", topicId: "janusz:roof", text: "Is it true the flood was visible from the roof?" },
      ],
      replyCandidates: [
        {
          id: "janusz:roof:rep-1",
          text: "Accessible to me and legendary to everyone else, which is the correct ratio. The blue key opens it, the blue key stays on the ring, and the ring stays on my belt. The roof is not a place. It is a responsibility with a view. Everyone wants the view. The responsibility is the price of admission.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:roof:rep-2",
          text: "Gravel, the antenna mount from 2008, the ventilation nest that sounds like a choir, one garden chair of unknown origin, and the best view of the parking lot in the building. The chair has been there eleven years. I have never moved it. Some questions are structural.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:roof:rep-3",
          text: "Mine, and that is the answer that keeps the building dry. The roof drains are the first line and the closet drains are the last, and I walk the first line every autumn like a general walking a shore. Leaves are the enemy. One gutter, one hour, one ladder. The flood taught me the arithmetic.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:roof:rep-4",
          text: "Approved, on conditions: no drilling into the membrane, his hardware, and I hold the ladder. Marek at height is careful the way he is careful with prod — completely, silently, and with a checklist. The antenna went up in spring. The radio is better. The membrane held. Nobody thanked the ladder.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:roof:rep-5",
          text: "Officially, me, Marek when the antenna needs him, and the inspector once a year. Unofficially, in the office mythology, everyone who has ever needed to think. I find coffee cups up there. I collect them. I do not ask. The roof hears things. That is what roofs are for, besides drainage.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:roof:rep-6",
          text: "True — from the roof you could see the water find the parking lot and stop, like it knew the plan. I checked the drains from up there that night, at two, in the rain, and came down knowing the closet would hold. The roof is where the building tells you the truth early. That is why I go up.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "janusz:weather-sense",
      label: "Reading the weather",
      optionCandidates: [
        { id: "janusz:weather-sense:opt-1", topicId: "janusz:weather-sense", text: "You check the forecast before anyone arrives. Why?" },
        { id: "janusz:weather-sense:opt-2", topicId: "janusz:weather-sense", text: "The barometer in the closet actually works?" },
        { id: "janusz:weather-sense:opt-3", topicId: "janusz:weather-sense", text: "What does the building do before a storm?" },
        { id: "janusz:weather-sense:opt-4", topicId: "janusz:weather-sense", text: "Do you prepare the drains for every rain?" },
        { id: "janusz:weather-sense:opt-5", topicId: "janusz:weather-sense", text: "The storm last month — what did you see coming?" },
        { id: "janusz:weather-sense:opt-6", topicId: "janusz:weather-sense", text: "Climate changing — does the building feel it?" },
      ],
      replyCandidates: [
        {
          id: "janusz:weather-sense:rep-1",
          text: "The forecast is the day's terrain. Rain means mats at every door and the gutters walked twice. Wind means the parking lot gets swept twice. Frost means the pipes get a visit at five. The weather is not small talk in this job. It is the schedule wearing clouds.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:weather-sense:rep-2",
          text: "It is older than the flood and more honest than the app. The app says rain. The barometer says HOW the rain will arrive — slow, or with an opinion. I keep both. The phone for the office's benefit, the barometer for mine. The barometer has never once needed a software update.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:weather-sense:rep-3",
          text: "The gutters gurgle in a different key, the doors swell and catch, and Burek refuses the far corridor. Animals and buildings prepare. I watch the building prepare, and I prepare faster. The day the building and the forecast disagree, I trust the building. It lives here.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:weather-sense:rep-4",
          text: "Every rain worth naming, and the autumn leaves get swept toward the grates like customers toward a door. Prevention is ten minutes with a broom versus ten hours with a mop. I learned the ratio in 2019, at two in the morning, holding a mop that was losing. Never again the losing mop.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:weather-sense:rep-5",
          text: "The barometer dropped at noon, the gulls came inland at three, and the gutters were cleared by four. The storm arrived at nine and did nothing, because everything that could be done had been. The best weather work is invisible. The storm is still mentioned. My part is not. That is correct.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:weather-sense:rep-6",
          text: "The building feels it in the pipes — heavier rain, faster, and the drains get less warning between dry and drowned. So I adjusted: the autumn walk is now twice, and the map got two new arrows. Buildings do not have opinions. They have symptoms. My job is to read them early. The reading is changing.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "janusz:radio",
      label: "The back-room radio",
      optionCandidates: [
        { id: "janusz:radio:opt-1", topicId: "janusz:radio", text: "There is a radio in the closet. Since when?" },
        { id: "janusz:radio:opt-2", topicId: "janusz:radio", text: "What station does a building listen to?" },
        { id: "janusz:radio:opt-3", topicId: "janusz:radio", text: "The radio stayed on during the flood. True?" },
        { id: "janusz:radio:opt-4", topicId: "janusz:radio", text: "Marek offered you a smart speaker. Outcome?" },
        { id: "janusz:radio:opt-5", topicId: "janusz:radio", text: "Does the volume mean anything? A code?" },
        { id: "janusz:radio:opt-6", topicId: "janusz:radio", text: "The radio was silent on Monday. Concern?" },
      ],
      replyCandidates: [
        {
          id: "janusz:radio:rep-1",
          text: "Since 1998, and it has outlived four tape decks, three office managers, and every management philosophy since. It sits on the shelf above the dehumidifier and it has one job: to be the sound the building makes when it is alone with me. It is not entertainment. It is company.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:radio:rep-2",
          text: "The talk station, quietly. News at the hour, conversation between. Music makes me hum, and humming is for people with lighter jobs. Talk keeps the mind working the hands. The radio and I disagree about politics and agree about the weather, which is the correct arrangement for coworkers.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:radio:rep-3",
          text: "True, and the batteries died at three and it stopped mid-sentence, and that was the loudest moment of the night. I put fresh batteries in at dawn and let it finish the sentence that had been interrupted by a flood. Nobody knows that story. Now two people know. Keep it with the drain map.",
          relationshipHint: "delighted",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "janusz:radio:rep-4",
          text: "He offered, I listened, the speaker asked me to create an account. The radio has never asked me for anything but batteries and the occasional aerial adjustment. Some devices earn their shelf by needing nothing. The speaker went to the training room. I hear it there sometimes. It sounds lonely.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:radio:rep-5",
          text: "Low means normal day. Off means the closet is occupied by someone who should not hear my commentary. Loud, briefly, means a goal for the home team — Zdzislaw does not judge, and the closet deserves one celebration per season. The building knows the code. The building keeps it.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:radio:rep-6",
          text: "Batteries, or the aerial shifted in the wind, or the station was doing its silent maintenance hour. I checked all three by lunch. It was the aerial. Two degrees to the left and the world came back. Everything in this building is fine until it is two degrees off. That is the whole trade.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "janusz:soup",
      label: "The soup ritual",
      optionCandidates: [
        { id: "janusz:soup:opt-1", topicId: "janusz:soup", text: "You eat the same soup every day. Respect or ritual?" },
        { id: "janusz:soup:opt-2", topicId: "janusz:soup", text: "The kitchen at noon is yours. Claim or treaty?" },
        { id: "janusz:soup:opt-3", topicId: "janusz:soup", text: "Thermos or bowl? This matters to the office." },
        { id: "janusz:soup:opt-4", topicId: "janusz:soup", text: "What is in the soup? The office has theories." },
        { id: "janusz:soup:opt-5", topicId: "janusz:soup", text: "Someone microwaved fish at YOUR soup time." },
        { id: "janusz:soup:opt-6", topicId: "janusz:soup", text: "Will you ever eat in the meeting room like a boss?" },
      ],
      replyCandidates: [
        {
          id: "janusz:soup:rep-1",
          text: "Ritual, and rituals are how a body stays honest for eleven years of five am. Same soup, same bench, same twelve minutes. The doctors call it routine. The building calls it the sound of a man who will be back tomorrow. Both are correct. The soup is just soup. The twelve minutes are not.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:soup:rep-2",
          text: "Treaty, unwritten, older than most staff. The kettle is for everyone, the counter is for everyone, and the corner table at noon is the maintenance window — I eat, the kitchen rests, and the fridge gets its audit. Anyone can sit. Nobody does. The treaty holds by mutual respect and one eyebrow.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:soup:rep-3",
          text: "Thermos in winter, bowl in summer, and the office has SEEN me switch, which is how they know the seasons changed. The thermos is for days the closet cannot be left. The bowl is for days it can. The choice is a weather report. The office reads my lunch the way sailors read water.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:soup:rep-4",
          text: "Vegetable, whatever the market had, made on Sunday in a pot that predates the robots. The theories — seven kinds, a family recipe, diplomacy fuel — are all wrong and all welcome. The truth is boring. The truth is: soup travels well, heats evenly, and never once interrupted a repair.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:soup:rep-5",
          text: "It happened, once, in 2022. I waited. The fish finished. Then I opened every window and cleaned the microwave to surgical standards, and the office understood the message without a word. There has been no fish since. The microwave is not a weapon. It is a shared instrument. Now it is also mine.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:soup:rep-6",
          text: "The meeting room is for meetings and the bench is for soup. A boss eats at a desk and reads email with his spoon. I eat where the floor is honest and the day is half done. The bench has heard more of this building's truth than any meeting room. Titles change tables. I am not interested.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "janusz:elevator",
      label: "The elevator",
      optionCandidates: [
        { id: "janusz:elevator:opt-1", topicId: "janusz:elevator", text: "The elevator skips floor two. Superstition or fix?" },
        { id: "janusz:elevator:opt-2", topicId: "janusz:elevator", text: "It makes that sound on the third floor only." },
        { id: "janusz:elevator:opt-3", topicId: "janusz:elevator", text: "The mirror in the elevator has a crack. Story?" },
        { id: "janusz:elevator:opt-4", topicId: "janusz:elevator", text: "Janusz, when was its last inspection, honestly?" },
        { id: "janusz:elevator:opt-5", topicId: "janusz:elevator", text: "Stairs or elevator for two floors? Philosophy?" },
        { id: "janusz:elevator:opt-6", topicId: "janusz:elevator", text: "Could you fix the elevator if it stopped?" },
      ],
      replyCandidates: [
        {
          id: "janusz:elevator:rep-1",
          text: "Fix, and an old one — the panel was replaced in 2016 and floor two's button never learned its job properly. I reported it. The company said 'cosmetic'. The building and I disagree about cosmetic. Now the button gets pressed twice, once for the office and once for the panel's feelings.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:elevator:rep-2",
          text: "The counterweight passes a bracket on three, and the bracket is half a millimeter proud. That sound is the building clearing its throat. I have asked three engineers about it. Two said tolerance. One said character. I side with the third. Everything that old that still works has earned a sound.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:elevator:rep-3",
          text: "2009, a delivery trolley, and a courier who panic-reversed into it with his shoulder. The crack runs diagonal, like a scar that has decided to stay. I reported it, the mirror was never replaced, and now candidates see it and say 'this place has history'. The crack does recruitment. I let it.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:elevator:rep-4",
          text: "March, and the certificate is on the wall by the buttons where nobody reads it, which is correct — you read certificates AFTER the elevator works, not before. I ride it daily with the confidence of a man who knows the inspector's coffee order. Trust, but with paperwork. That is the modern building.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:elevator:rep-5",
          text: "Two floors, stairs, always — the elevator is for floors, tools, and people having a day. The stairs are where the office says things it would not say in a meeting. I take the stairs and I hear everything. The elevator is a machine. The staircase is a confessional with better lighting.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:elevator:rep-6",
          text: "Between floors, yes — there is a manual release and a crank, and one Tuesday in 2021 I walked Zosia out through the third floor doors with the crank and a flashlight. She now takes the stairs at any hint of noise. The machine and I understand each other. I fix what I understand.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "janusz:one-week-off",
      label: "The one week off",
      optionCandidates: [
        { id: "janusz:one-week-off:opt-1", topicId: "janusz:one-week-off", text: "You take one week off a year. What happens here?" },
        { id: "janusz:one-week-off:opt-2", topicId: "janusz:one-week-off", text: "Who holds the keys when you are gone?" },
        { id: "janusz:one-week-off:opt-3", topicId: "janusz:one-week-off", text: "Does the building behave while you are away?" },
        { id: "janusz:one-week-off:opt-4", topicId: "janusz:one-week-off", text: "Do you check messages? Be honest." },
        { id: "janusz:one-week-off:opt-5", topicId: "janusz:one-week-off", text: "Where does a man like you even go?" },
        { id: "janusz:one-week-off:opt-6", topicId: "janusz:one-week-off", text: "What do you come back to every year?" },
      ],
      replyCandidates: [
        {
          id: "janusz:one-week-off:rep-1",
          text: "The same experiment, every year: the building runs the experiment on itself. Marek holds the pager, Renata holds the floor, and the robots follow the schedule I wrote them in September. The week is a test of everything I built, graded by whether the phone stays quiet. It never fully passes. It gets closer.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:one-week-off:rep-2",
          text: "Marek, the emergency key, and one page of instructions with a map of what can wait. The page has three columns: must, should, and never. The never column has one line: 'the closet door stays shut'. He has held the keys twice. The never column has held. That is succession in miniature.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:one-week-off:rep-3",
          text: "It misbehaves in small, familiar ways — a gutter, a door, one robot with opinions. The building misses me the way a ship misses its engineer: not dramatically, but with a list to one side. I come back, I read the log, and I fix the list. The log is always shorter than my worry. That is the system working.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:one-week-off:rep-4",
          text: "First two days, no. Then one call to Marek 'about the antenna', which is about the antenna but also about the closet. I will not pretend I do not think about the building at the lake. I think about it fondly, like a man thinks about a dog that can feed itself. Mostly.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:one-week-off:rep-5",
          text: "A lake, a cabin, and a lake again — water without pipes, which is the only water I trust on holiday. My brother holds the other chair. We say little. The lake says less. After a year of listening to a building, silence with a view is the only luxury I have ever wanted. It is also free, which Grazyna respects.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:one-week-off:rep-6",
          text: "A dry floor, a warm hallway, and one note from Renata pinned by the kettle listing everything that survived me. The list gets shorter every year — this time it was one gutter and a mug. I read the list at the bench, with the soup, then take off my coat and go back to work. It is a good ritual.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "janusz:lost-found",
      label: "Lost and found",
      optionCandidates: [
        { id: "janusz:lost-found:opt-1", topicId: "janusz:lost-found", text: "The lost and found is a drawer? A system?" },
        { id: "janusz:lost-found:opt-2", topicId: "janusz:lost-found", text: "The wedding ring you found — ever claimed?" },
        { id: "janusz:lost-found:opt-3", topicId: "janusz:lost-found", text: "What sits in the drawer the longest?" },
        { id: "janusz:lost-found:opt-4", topicId: "janusz:lost-found", text: "Can I look in the box for my missing cable?" },
        { id: "janusz:lost-found:opt-5", topicId: "janusz:lost-found", text: "Is there anything you never gave back?" },
        { id: "janusz:lost-found:opt-6", topicId: "janusz:lost-found", text: "Why does lost property end with you?" },
      ],
      replyCandidates: [
        {
          id: "janusz:lost-found:rep-1",
          text: "A drawer with a ledger, because a drawer without a ledger is a burglary with extra steps. Every item gets a date, a location, and a description in my hand. Twelve years of entries. The drawer is the most honest department in the company. Nothing in it lies about where it was found.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:lost-found:rep-2",
          text: "Two years, then the owner came from another city, looked in the ledger, and said 'you wrote it down'. I did. She cried, I made tea, the kettle behaved. The ring went home and the ledger entry got a red line, which is how the drawer says goodbye. The drawer has better manners than most email.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:lost-found:rep-3",
          text: "One glove, left-handed, six winters. Nobody claims a single glove — grief for one glove is too small for anyone to carry, so I carry it. The glove stays. It is not lost anymore. It is a resident. The drawer knows the difference, and so do I, and that is all the philosophy a glove needs.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:lost-found:rep-4",
          text: "Look, describe, and sign — the ledger wants your name next to the recovery, because recovering your own property should leave a trace too. The cables live in the second tray, sorted by connector, because chaos in a drawer multiplies. Your cable is there. They are always there. The drawer is patient.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:lost-found:rep-5",
          text: "Nothing — the one exception was a letter, unsent, found in a coat pocket. I read the first line for sorting purposes and mailed it after two years when the coat came back for its owner. Some things are lost on purpose. The drawer respects that. It was the closest I have come to editing the archive.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:lost-found:rep-6",
          text: "Because I am here at five am when the cleaning happens, and lost is just misplaced with a timeline. The office hands things to the person who finds things. I did not volunteer. I was volunteered by the floor plan. The drawer came with the closet. The closet came with the job. The job came with the eyes.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "janusz:suppliers",
      label: "The suppliers",
      optionCandidates: [
        { id: "janusz:suppliers:opt-1", topicId: "janusz:suppliers", text: "The cleaning supplier knows you by name. How?" },
        { id: "janusz:suppliers:opt-2", topicId: "janusz:suppliers", text: "Grazyna switched the paper supplier. Consequences?" },
        { id: "janusz:suppliers:opt-3", topicId: "janusz:suppliers", text: "Do you negotiate with the suppliers yourself?" },
        { id: "janusz:suppliers:opt-4", topicId: "janusz:suppliers", text: "The delivery holds the door for the pigeon. Fix?" },
        { id: "janusz:suppliers:opt-5", topicId: "janusz:suppliers", text: "What do you refuse to buy cheap?" },
        { id: "janusz:suppliers:opt-6", topicId: "janusz:suppliers", text: "The chemical order was wrong twice this year." },
      ],
      replyCandidates: [
        {
          id: "janusz:suppliers:rep-1",
          text: "Twenty years of orders makes a friendship with paperwork — Bogdan at the depot knows my voice, my building, and my opinions about mop heads. He once held a delivery during the flood week without a form. The next year I ordered double. That is how supplier loyalty actually works. Not contracts. Floods.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:suppliers:rep-2",
          text: "Two months of complaints, then everyone forgot the old paper existed. People do not hate change. They hate the FIRST WEEK of change. The new paper is thinner and the dispensers were adjusted to compensate, by me, on a Sunday, with a screwdriver and a grievance. The grievance retired. The dispensers hold.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:suppliers:rep-3",
          text: "The small ones, yes — the big contracts are Grazyna's territory and I would not wander in there without a map. But the hardware store knows me, the electrical wholesaler knows me, and my word is my purchase order down there. Small suppliers run on handshakes. I keep my handshakes warm.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:suppliers:rep-4",
          text: "The fix is a wedge, a sign, and a conversation with the driver, in that order. Wedges fail, signs fail, the driver holds. He now props the door with his foot and scans the threshold like a man guarding a border. The pigeon still gets in twice a year. Perfection is not on offer. Management is.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:suppliers:rep-5",
          text: "Mops, rope, and door hardware. Cheap mops shed, cheap rope shrinks, and cheap hinges announce every departure to the whole floor. The building holds people's working lives together at the edges. The edges are not the place for savings. Grazyna has learned this. It took four invoices and one hinge.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:suppliers:rep-6",
          text: "It was, and I caught it before it caught the floors — wrong chemical on wax is a mistake you pay for in weeks, not minutes. I now check the order against the sheet, twice, and the supplier sends photos before shipping. The photos are new. The mistake is gone. That is how systems grow: one scar each.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "janusz:snow",
      label: "Snow duty",
      optionCandidates: [
        { id: "janusz:snow:opt-1", topicId: "janusz:snow", text: "Snow is coming. What does Janusz actually do?" },
        { id: "janusz:snow:opt-2", topicId: "janusz:snow", text: "The salt trail you lay has a pattern. Explain." },
        { id: "janusz:snow:opt-3", topicId: "janusz:snow", text: "Who shovels the parking lot at five am?" },
        { id: "janusz:snow:opt-4", topicId: "janusz:snow", text: "The snow day — does the office close or crawl?" },
        { id: "janusz:snow:opt-5", topicId: "janusz:snow", text: "Burek in snow. Report." },
        { id: "janusz:snow:opt-6", topicId: "janusz:snow", text: "What is the worst winter this building gave you?" },
      ],
      replyCandidates: [
        {
          id: "janusz:snow:rep-1",
          text: "Everything the night before, so the morning is arithmetic — grit in the hoppers, mats out, the shovel by the side door, and the pipes walked. Snow punishes preparation debt. This building carries none. By six the paths exist. By seven the office believes it snowed politely.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:snow:rep-2",
          text: "The pattern is the shortest dry line between every entrance and the kettle, plus one loop for the smokers and one straight run for the couriers. People follow paths that respect their purpose. I have watched the salt trail steer this office for nine winters. Architecture by calcium.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:snow:rep-3",
          text: "Me, at five, with the big shovel and the small rage. The lot takes forty minutes and the plow takes it back in ten when the city comes through too fast, so I shape the piles as walls. Marek brings coffee at five thirty in winter. He has never once been asked. That is the whole story of this office.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:snow:rep-4",
          text: "It crawls, and the crawlers are the best people — the ones who come in snow are the ones who fix things quietly. The office never closes; it thins. Renata makes the big pot of tea, the robots run their routes, and the day becomes a maintenance day by accident. Snow days are the building's spa.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:snow:rep-5",
          text: "He supervises from the window at first, then patrols the salt trail like an inspector, then eats a modest amount of it. The audit continues in all weathers. I keep a towel by the side door for the return. His paw prints on the fresh snow are the only thing in this lot I do not sweep.",
          relationshipHint: "neutral",
          tags: ["quest:burek-fed", "relationship:neutral"],
        },
        {
          id: "janusz:snow:rep-6",
          text: "2010, when the roof load was real and I was up there with a broom at four am, pushing snow over the edge like a man salting the earth. The building groaned once and settled. I stayed until dawn. That winter taught me the roof is not a view. It is a debt. I have swept it every heavy snow since.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "janusz:superstition",
      label: "Building superstitions",
      optionCandidates: [
        { id: "janusz:superstition:opt-1", topicId: "janusz:superstition", text: "Any superstitions after twenty years here?" },
        { id: "janusz:superstition:opt-2", topicId: "janusz:superstition", text: "The floor that squeaks before rain. Really?" },
        { id: "janusz:superstition:opt-3", topicId: "janusz:superstition", text: "Why does everyone touch the door frame before demos?" },
        { id: "janusz:superstition:opt-4", topicId: "janusz:superstition", text: "You have rituals too. Admit one." },
        { id: "janusz:superstition:opt-5", topicId: "janusz:superstition", text: "The office believes the closet hums luck. Verdict?" },
        { id: "janusz:superstition:opt-6", topicId: "janusz:superstition", text: "Which superstition would you kill if you could?" },
      ],
      replyCandidates: [
        {
          id: "janusz:superstition:rep-1",
          text: "Not superstitions. Observations with repetition. The building does the same things in the same order before the same events, and a man who sweeps for twenty years starts keeping score. Call it superstition if it helps. I call it the building's handwriting. I read it every morning.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:superstition:rep-2",
          text: "The board by the kitchen swells two hours before weather arrives, every time, and it has never once been wrong in a decade. The forecast apps agree with it eventually. The board is just honest about being wood. Wood does not perform. It reports. I have a soft spot for honest materials.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:superstition:rep-3",
          text: "Because in 2018 Bartek touched the frame before the biggest pitch of the year, the pitch landed, and now forty professionals perform structural maintenance on the doorway before every client call. It is nonsense. It is also free. The frame has never once failed us. I re-tighten the screws on Sundays.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "janusz:superstition:rep-4",
          text: "The kettle gets its water filled the night before, even when nobody will use it until six. There is no reason. There is no reward. But if I skip it, the morning starts wrong by one degree, and one degree is where buildings keep their secrets. That is not superstition. That is payments to the future.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:superstition:rep-5",
          text: "The hum is the dehumidifier at its happy frequency, and the office turned it into a charm. Fine by me — a team that believes the closet is lucky keeps the closet's door respected, which keeps the closet's equipment safe. Superstition is just maintenance wearing a costume. I approve of costumes.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:superstition:rep-6",
          text: "None. Every ritual in this office, even the silly ones, points at something true — care the floor, respect the closet, touch the frame. The silliest superstition here is a memory of something real that nobody wrote down. I would sooner sweep them into a ledger than kill them. Preservation first.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "janusz:soap",
      label: "The soap supply",
      optionCandidates: [
        { id: "janusz:soap:opt-1", topicId: "janusz:soap", text: "The bathroom soap smells like a forest now." },
        { id: "janusz:soap:opt-2", topicId: "janusz:soap", text: "Why did you switch soap suppliers?" },
        { id: "janusz:soap:opt-3", topicId: "janusz:soap", text: "Grazyna questioned the soap line item." },
        { id: "janusz:soap:opt-4", topicId: "janusz:soap", text: "The dispenser drips on the floor by the sink." },
        { id: "janusz:soap:opt-5", topicId: "janusz:soap", text: "Do you make anything yourself, Janusz?" },
        { id: "janusz:soap:opt-6", topicId: "janusz:soap", text: "Which soap lasts longest, honestly?" },
      ],
      replyCandidates: [
        {
          id: "janusz:soap:rep-1",
          text: "Pine. The old one was cherry and people lingered. Pine says: wash, look at the window, go back to work. A soap sets a pace. Twenty years of soap and I will tell you the scent is the cheapest management tool in this building.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:soap:rep-2",
          text: "The cherry supplier got bought by a bigger cherry supplier and the soap got worse quietly. Same bottle, thinner soap. Nobody reads soap. I read soap. Switched to a family outfit from outside Grodzisk. They deliver on Thursdays and their invoice is handwritten. Trust has a texture. So does soap.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:soap:rep-3",
          text: "She did. I showed her the cost per wash — not per bottle, per WASH — and the pine won on numbers alone. She approved it and added the calculation style to her own files. Grazyna respects a numerator change. That was a good Tuesday.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:soap:rep-4",
          text: "I know. It drips at nine, it drips at two. There is a mat, and the mat is washed, and the floor has never once been slippery in twenty years. The drip is not a fault. The drip is a drip. Some things you fix and some things you schedule around.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:soap:rep-5",
          text: "Soap, in winter, small batches. It is not a business. It is what you do with wax left from candles and patience left from evenings. Grazyna takes two bars a month and pretends it is an arrangement. The arrangement predates her new car and will outlast it.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:soap:rep-6",
          text: "The industrial pink. Ugly as a Monday and it outlasts everything. The pine is for the people who look. The pink is for the pump. You did not ask about the pump, but the pump is where the truth of soap lives.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "janusz:night-shift",
      label: "The night shifts",
      optionCandidates: [
        { id: "janusz:night-shift:opt-1", topicId: "janusz:night-shift", text: "You were here at midnight again?" },
        { id: "janusz:night-shift:opt-2", topicId: "janusz:night-shift", text: "What is the office like at 2am?" },
        { id: "janusz:night-shift:opt-3", topicId: "janusz:night-shift", text: "Do you ever sleep, Janusz?" },
        { id: "janusz:night-shift:opt-4", topicId: "janusz:night-shift", text: "Marek and you crossed paths at 3am." },
        { id: "janusz:night-shift:opt-5", topicId: "janusz:night-shift", text: "Is the building different at night?" },
        { id: "janusz:night-shift:opt-6", topicId: "janusz:night-shift", text: "Tomek fell asleep in the beanbag at 1am." },
      ],
      replyCandidates: [
        {
          id: "janusz:night-shift:rep-1",
          text: "Flood check. The pipes are honest at midnight — you hear the trouble before you see it. I walked the route, heard nothing, and went home. The nothing was the whole point. Quiet pipes is the sound of a job done for twenty years.",
          relationshipHint: "neutral",
          tags: ["period:evening"],
        },
        {
          id: "janusz:night-shift:rep-2",
          text: "Honest. The building at 2am has no audience and shows what it is — one flickering tube over the kitchen, a draft by the glass wall, and the hum Marek chases on his graphs. I know that hum like a voice. At night it sings. In the day it just pays rent.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:night-shift:rep-3",
          text: "Six hours, same time, since 1994. The body is a schedule you keep or it keeps you. Naps are a tool, not a lifestyle. The chair by the window at four is allowed fifteen minutes and has never once needed more.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:night-shift:rep-4",
          text: "We nodded. He had his laptop, I had my mop, and neither of us said a word, because at 3am the work is the conversation. He left a coffee on the trolley though. No note. Marek says things with objects. I kept the cup. It is in the closet with the others.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:night-shift:rep-5",
          text: "The walls settle and the floors let go of the day. You hear which door was slammed hardest. You hear who's chair squeaks still — that one is next on the list. A building talks all night. People just leave before it starts.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:night-shift:rep-6",
          text: "I covered him with the grey blanket from the closet and turned the lights to evening mode. He stayed till six. Woke up embarrassed, fixed the thing he stayed for, and now checks the beanbag before he settles in. That is how a person learns a building. Through one blanket, once.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "janusz:warnings",
      label: "The yellow warnings",
      optionCandidates: [
        { id: "janusz:warnings:opt-1", topicId: "janusz:warnings", text: "The yellow warning notes are everywhere." },
        { id: "janusz:warnings:opt-2", topicId: "janusz:warnings", text: "Why yellow paper specifically?" },
        { id: "janusz:warnings:opt-3", topicId: "janusz:warnings", text: "Your note said 'the door remembers'. Meaning?" },
        { id: "janusz:warnings:opt-4", topicId: "janusz:warnings", text: "Someone removed a warning note and touched the hot plate." },
        { id: "janusz:warnings:opt-5", topicId: "janusz:warnings", text: "How long does a warning stay up?" },
        { id: "janusz:warnings:opt-6", topicId: "janusz:warnings", text: "Klaudia filmed the warning notes for content." },
      ],
      replyCandidates: [
        {
          id: "janusz:warnings:rep-1",
          text: "Every note is a promise I made to someone's hand. The kettle, the plate, the third step — each one is a place the building could bite. The notes come down when the thing is fixed, and not one day before. People call it decoration. It is a contract.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:warnings:rep-2",
          text: "Yellow is seen by a tired eye. White vanishes into walls, red means fire and gets ignored like fire alarms. Yellow sits between — it says: nothing is burning, but slow down here. Twenty years of yellow and one burned palm. The palm was 2003. Before the system.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:warnings:rep-3",
          text: "The door by the storage closes on its own when the heating runs. It took a coat button in 2019. 'The door remembers' means: the door does that thing again when the radiators come on. People read it, smile, and slow down at that door. All the message needed to do was make them slow down.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:warnings:rep-4",
          text: "He is fine. Palm red for two days, pride red for longer. I did not say anything. The note was still there when it healed — I moved it to his monitor for a week. Some lessons want a witness. The witness was a sticky note and it worked.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:warnings:rep-5",
          text: "Until the fix, plus one week of quiet. Then it comes down and goes in the box. The box is a history of every small danger this building ever was. Some years the box is full. Good years, the box stays shut. You can read a decade in that box.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:warnings:rep-6",
          text: "She asked. I said the notes are not for the internet, they are for the thumb that presses the kettle. She put her phone down, thought, and asked instead what the notes were FOR. Best question anyone asked me that month. The video never happened. The respect did.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "janusz:chair-repairs",
      label: "The chair repairs",
      optionCandidates: [
        { id: "janusz:chair-repairs:opt-1", topicId: "janusz:chair-repairs", text: "My chair stopped squeaking overnight. Sorcery?" },
        { id: "janusz:chair-repairs:opt-2", topicId: "janusz:chair-repairs", text: "How many chairs have you fixed here?" },
        { id: "janusz:chair-repairs:opt-3", topicId: "janusz:chair-repairs", text: "The gas lift on the kitchen stool is gone." },
        { id: "janusz:chair-repairs:opt-4", topicId: "janusz:chair-repairs", text: "Zosia's chair gets serviced before everyone's." },
        { id: "janusz:chair-repairs:opt-5", topicId: "janusz:chair-repairs", text: "Where do the dead chairs go?" },
        { id: "janusz:chair-repairs:opt-6", topicId: "janusz:chair-repairs", text: "Can you teach me to fix my chair at home?" },
      ],
      replyCandidates: [
        {
          id: "janusz:chair-repairs:rep-1",
          text: "No sorcery. Thursday nights, after the lights go soft, I walk the floor and listen. A squeak is a question the chair is asking. I answer it with three drops of oil and five minutes. You will never see the work. The chair is quiet and that is the whole report.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:chair-repairs:rep-2",
          text: "Four hundred, give or take the ones that came back twice. I keep a card for every chair — date, part, mood. Chairs have moods. A chair that squeaks angry needs a part. A chair that squeaks tired needs oil. The cards are in a shoebox, in order, like a hospital's records but with more dignity.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:chair-repairs:rep-3",
          text: "On my list. The part arrives Thursday from a man in Piotrkow who has saved that model since 2011. Until then, do not trust the stool with your whole weight and your whole coffee at once. Choose one. The stool and I both thank you.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:chair-repairs:rep-4",
          text: "Her chair holds the calendar of this company, in a way. Eleven years of decisions in that seat. It gets the good casters and first oil. This is not favor. This is maintenance of infrastructure. The chair is where the budget lives. You keep the budget's chair healthy.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:chair-repairs:rep-5",
          text: "Downstairs, third basement, in rows. Not thrown — LAID. Parts go back into service; a dead chair is six living chairs, over time. Every chair in this office that rolls, rolls on some ancestor down there. The dead support the living. That is not a speech about chairs. It is just true.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:chair-repairs:rep-6",
          text: "Flip it, look at the five stars on the base, tighten what is loose, oil what is loud, and stop before you feel clever. The feeling of clever is where chairs die. Do the three things, drink tea, done. If it still complains after that, it is a part, and parts are a Thursday matter, not a pride matter.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "janusz:plant-corner",
      label: "The plant corner",
      optionCandidates: [
        { id: "janusz:plant-corner:opt-1", topicId: "janusz:plant-corner", text: "The plant corner is thriving. What is the secret?" },
        { id: "janusz:plant-corner:opt-2", topicId: "janusz:plant-corner", text: "One plant died anyway. Which one?" },
        { id: "janusz:plant-corner:opt-3", topicId: "janusz:plant-corner", text: "Renata brings you cuttings from home?" },
        { id: "janusz:plant-corner:opt-4", topicId: "janusz:plant-corner", text: "The fern by the glass wall leans at the sun." },
        { id: "janusz:plant-corner:opt-5", topicId: "janusz:plant-corner", text: "Can I take a plant for my desk?" },
        { id: "janusz:plant-corner:opt-6", topicId: "janusz:plant-corner", text: "Do the plants have names, Janusz?" },
      ],
      replyCandidates: [
        {
          id: "janusz:plant-corner:rep-1",
          text: "No secret. Water on Mondays, less than you think. Turn them on Thursdays, quarter turns. Talk is optional and I skip it — plants want consistency, not conversation. The corner thrives because nobody loves it too much. The hardest part of care is stopping.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:plant-corner:rep-2",
          text: "The bamboo, in 2021, and it still bothers me. Someone fed it tea. With sugar. It was loved wrong, which is worse than ignored. The pot is in the closet. I keep it for the reminder. Care is not what you feel. Care is what the thing needs. The bamboo taught that better than any manual.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:plant-corner:rep-3",
          text: "Every spring, wrapped in wet newspaper like a gift. Her balcony plants are stronger stock than any shop. We trade — she brings cuttings, I return jars of the winter soap. Twenty years of this economy. Neither of us ever calls it a trade.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:plant-corner:rep-4",
          text: "It knows where the light is. I could turn the pot and be done, but the lean is its own opinion and the fern has earned it. Plants that lean are paying attention. I trust a leaning plant more than a straight one. Same with people, if I am honest, and I am mostly honest before my second coffee.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:plant-corner:rep-5",
          text: "Take the pothos on the end — it forgives everything and it grows toward wherever your desk is happiest. Water it when the leaves speak, which is rarely. If it lives a year, take a cutting and give it to someone. That is how this corner has filled the whole floor. One plant, one borrower, one year at a time.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:plant-corner:rep-6",
          text: "No names. Names make you forgive them when they fail. The fern is the fern and the ivy is the ivy and the task stays the task. Naming is for dogs and boats. Plants want a schedule and a person who shows up. I show up. The plants do the rest, quietly, like most of the work in this building.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "janusz:tradesman",
      label: "The tradesmen gate",
      optionCandidates: [
        { id: "janusz:tradesman:opt-1", topicId: "janusz:tradesman", text: "Who decides which repairmen come in?" },
        { id: "janusz:tradesman:opt-2", topicId: "janusz:tradesman", text: "The electrician only speaks to you, Janusz." },
        { id: "janusz:tradesman:opt-3", topicId: "janusz:tradesman", text: "A salesman got in and pitched Maciek at the lift." },
        { id: "janusz:tradesman:opt-4", topicId: "janusz:tradesman", text: "How do you vet a new plumber?" },
        { id: "janusz:tradesman:opt-5", topicId: "janusz:tradesman", text: "The window guys left a mess last time." },
        { id: "janusz:tradesman:opt-6", topicId: "janusz:tradesman", text: "Grazyna wants three quotes for everything now." },
      ],
      replyCandidates: [
        {
          id: "janusz:tradesman:rep-1",
          text: "I do, and Renata signs, and Grazyna pays, in that order. A tradesman comes in once with me watching and I learn everything — the van, the shoes, whether the tools are clean. The van tells you the business. The shoes tell you the pride. The tools tell you the truth. Most decisions make themselves at the shoes.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:tradesman:rep-2",
          text: "Pan Zdzislaw has wired this building since before the glass wall. He speaks to me because I was here when the old panel was, and you cannot explain a building's history in a meeting. He drinks one coffee, points at things, and leaves. Twenty years of that. Cheaper than any contract and twice as reliable.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:tradesman:rep-3",
          text: "He did, through the delivery door, wearing a lanyard he does not have. Maciek bought a subscription to something before lunch. I found the lanyard in the bin — plastic, glossy, wrong weight. It is on the closet wall now as a lesson. The delivery door has a new rule since: boxes first, words after.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:tradesman:rep-4",
          text: "I give him the smallest job first — one tap, one valve — and I watch how he leaves the space. A good tradesman leaves it cleaner than a bad one found it. That is the whole test. The tap tells you the hands. The space tells you the character. Two visits, and you know a plumber for life.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:tradesman:rep-5",
          text: "They did, and they will not again. I swept it, photographed it, and sent the photo with the final payment question. The crew came back Sunday, own time, and finished clean. Nobody is angry forever when the evidence is a photo of dust. Pictures are quieter than words and they shout the same.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:tradesman:rep-6",
          text: "Good. Three quotes is how you learn a building's real price. I read the middle one closest — the low quote forgot something, the high one is paying for lunch. Grazyna knows this and lets me pick from the middle anyway. The system trusts two old men's instincts and a spreadsheet. It has not failed us yet.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "janusz:coffee-machine-doctor",
      label: "The coffee machine doctor",
      optionCandidates: [
        { id: "janusz:coffee-machine-doctor:opt-1", topicId: "janusz:coffee-machine-doctor", text: "You fixed the espresso machine yourself again?" },
        { id: "janusz:coffee-machine-doctor:opt-2", topicId: "janusz:coffee-machine-doctor", text: "Why not just buy a new machine?" },
        { id: "janusz:coffee-machine-doctor:opt-3", topicId: "janusz:coffee-machine-doctor", text: "The machine sings a high note on Tuesdays." },
        { id: "janusz:coffee-machine-doctor:opt-4", topicId: "janusz:coffee-machine-doctor", text: "Marek wants to put a sensor inside the machine." },
        { id: "janusz:coffee-machine-doctor:opt-5", topicId: "janusz:coffee-machine-doctor", text: "What is the machine's actual diagnosis?" },
        { id: "janusz:coffee-machine-doctor:opt-6", topicId: "janusz:coffee-machine-doctor", text: "Teach me the descale ritual." },
      ],
      replyCandidates: [
        {
          id: "janusz:coffee-machine-doctor:rep-1",
          text: "The gasket was tired, not the machine. One gasket, six zloty, forty minutes, and the office never knew it was one morning from cold coffee. That is the quiet work. Nobody thanks a disaster that did not happen. I have collected forty years of unthanked mornings. The collection keeps the coffee on.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:coffee-machine-doctor:rep-2",
          text: "New machines are strangers. This one I know — where it holds its heat, where it sulks, which button lies. A new machine means six months of learning its moods while the office drinks worse coffee. This machine and I have an arrangement older than half the staff. You do not fire someone you understand.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:coffee-machine-doctor:rep-3",
          text: "Tuesday is descale residue passing the narrow bend. Harmless, one note, always the same note. Marek says he can predict the day from the pitch drift, which makes two of us listening to that machine like it is a patient. It is a patient. It is the best-fed patient in the building and it takes eleven hundred people to work a day.",
          relationshipHint: "neutral",
          tags: ["period:morning"],
        },
        {
          id: "janusz:coffee-machine-doctor:rep-4",
          text: "I told him no, and he took it well, for a man with sensors in his blood. The machine is mechanical honesty — pressure, heat, water, no logs, no dashboards. Let it stay dumb. The office has enough charts. One machine should just be a machine, and I should just be the man who listens to it. Division of powers.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:coffee-machine-doctor:rep-5",
          text: "Old, cared for, and vain. It works better when people watch it — I am not joking, the pressure holds steadier on demo days. Machines and men. It will need a full service in two winters, and when that day comes it will be worth every zloty, because that machine has poured more goodwill than any budget line in this company.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:coffee-machine-doctor:rep-6",
          text: "Watch once, then do it yourself next month with me in the room, silent. Machine off, night before. Solution in, wait through two full cups of nothing — the waiting is the ritual, the waiting is where people cheat. Rinse three times, not two. Three. The ones who rinse twice taste it for a week and learn. The machine teaches patience or it teaches nothing.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "janusz:screw-drawer",
      label: "The screw drawer",
      optionCandidates: [
        { id: "janusz:screw-drawer:opt-1", topicId: "janusz:screw-drawer", text: "The screw drawer is famous. What is in it exactly?" },
        { id: "janusz:screw-drawer:opt-2", topicId: "janusz:screw-drawer", text: "Tomek needs a specific screw for his shelf." },
        { id: "janusz:screw-drawer:opt-3", topicId: "janusz:screw-drawer", text: "How is the drawer organized? It can't be." },
        { id: "janusz:screw-drawer:opt-4", topicId: "janusz:screw-drawer", text: "Grazyna tried to inventory the drawer once." },
        { id: "janusz:screw-drawer:opt-5", topicId: "janusz:screw-drawer", text: "You found the screw for the wobbly desk in minutes." },
        { id: "janusz:screw-drawer:opt-6", topicId: "janusz:screw-drawer", text: "What happens to the drawer in twenty more years?" },
      ],
      replyCandidates: [
        {
          id: "janusz:screw-drawer:rep-1",
          text: "Every screw this building has ever shed, plus the ones I saved from machines that left. Counted? No. Lost? Also no. It is not a drawer of screws, it is a drawer of answers to questions nobody has asked yet. The day someone needs the odd one, the drawer is the only place in the city it exists.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:screw-drawer:rep-2",
          text: "Tell him to bring the shelf's broken brother — no, tell him to bring the hole. You match the screw to the hole, never the picture. He will stand at the drawer five minutes and leave with the right one and a story. That drawer teaches patience better than any course the company ever bought.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:screw-drawer:rep-3",
          text: "It is organized by twenty years of my hand. Trays inside trays. The left third is metric, the middle is miscellany, and the right is 'someday' — the screws I cannot place yet. The someday section is the drawer's heart. Organization is not labels. Organization is knowing where you stopped.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:screw-drawer:rep-4",
          text: "She lasted eleven minutes, wrote 'assorted, quantity: yes' in her ledger, and closed it gently, like a lid on a jar of bees. We never spoke of it again. Some assets appreciate off the books. Her ledger and my drawer have a truce older than most marriages in this city.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:screw-drawer:rep-5",
          text: "Minutes, because the desk is a 2016 model and 2016 used that flat-head nobody stocks. The drawer had six. The desk got one and a quarter turn of care. People think the drawer is a hobby. The drawer is a parts department with a personality, and the personality is mine.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:screw-drawer:rep-6",
          text: "Same as now, with more history in it. Someone after me will curse it, then use it, then defend it. That is the life of every honest drawer. I found mine the same way — cursed it in 1998, used it in 1999, defended it ever since. The drawer outlives us all and holds the building together, screw by saved screw.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "janusz:winter-99",
      label: "The winter of 1999",
      optionCandidates: [
        { id: "janusz:winter-99:opt-1", topicId: "janusz:winter-99", text: "Tell me about the winter of 1999." },
        { id: "janusz:winter-99:opt-2", topicId: "janusz:winter-99", text: "Did the building really run on one heater?" },
        { id: "janusz:winter-99:opt-3", topicId: "janusz:winter-99", text: "Is the winter-99 story true or improved?" },
        { id: "janusz:winter-99:opt-4", topicId: "janusz:winter-99", text: "The boiler that survived that winter — still around?" },
        { id: "janusz:winter-99:opt-5", topicId: "janusz:winter-99", text: "Marek asked about winter-99 for the runbooks." },
        { id: "janusz:winter-99:opt-6", topicId: "janusz:winter-99", text: "Would the building survive that winter today?" },
      ],
      replyCandidates: [
        {
          id: "janusz:winter-99:rep-1",
          text: "Cold came early, the old boiler quit on the tenth of December, and this city forgot how to deliver parts in snow. We ran the building on one reserve heater, three electric ones, and the honesty of the walls. Everybody wore coats at their desks for a month. Productivity did not drop one percent. People are tougher than dashboards think.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:winter-99:rep-2",
          text: "One heater and a janitor who walked the pipes every four hours. The heater was a war model, orange, loud as a tractor. It heated the server room first, by my choice — the company dies with the machines, the people can wear gloves. Nobody argued. Cold makes meetings short and decisions honest.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:winter-99:rep-3",
          text: "Improved in the telling, true in the bones. The parts: boiler died, city froze, building stood. The legend added: I carried fuel upstairs at night, alone, in the storm. There was a young man with me. He is a grandfather now and we do not tell the story with him in it because the story is better simple. Legends are edited for weight, not for lies. There is a difference.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:winter-99:rep-4",
          text: "Downstairs, painted grey, cold since 2004, and it stays because it WORKED. Every new boiler man comes down, looks at it, and asks why it is still here. I say: it held in ninety-nine. That sentence ends the tour. Some machines earn a room for life. It held. That is the whole CV.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:winter-99:rep-5",
          text: "He wrote it down in that flat way of his — 'single point of failure: one heater, one janitor, four-hour checks'. He is right and he missed the point. The point is not the risk. The point is that it held anyway, because people walked the route. You cannot put a walk in a runbook. You can only hope the next tired man loves the building.",
          relationshipHint: "neutral",
          tags: ["relationship:warm", "quest:marek-showed-the-log"],
        },
        {
          id: "janusz:winter-99:rep-6",
          text: "Longer, warmer, and softer. The new glass holds heat the old windows never dreamed of. But I will tell you what is worse now — everyone works from home when the cold comes. Ninety-nine had every desk full and every coat on. The building survived on people staying. These days the building would survive on nobody noticing. Progress. Something is lost. The coats were community.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "janusz:five-am",
      label: "The five am start",
      optionCandidates: [
        { id: "janusz:five-am:opt-1", topicId: "janusz:five-am", text: "Is 5am really your start time?" },
        { id: "janusz:five-am:opt-2", topicId: "janusz:five-am", text: "What is the building like at five?" },
        { id: "janusz:five-am:opt-3", topicId: "janusz:five-am", text: "Does anything ever happen at five am?" },
        { id: "janusz:five-am:opt-4", topicId: "janusz:five-am", text: "Pawel tried to match your schedule for a week." },
        { id: "janusz:five-am:opt-5", topicId: "janusz:five-am", text: "Maciek claims he is also a five am person." },
        { id: "janusz:five-am:opt-6", topicId: "janusz:five-am", text: "Why five and not six?" },
      ],
      replyCandidates: [
        {
          id: "janusz:five-am:rep-1",
          text: "Five. The gate, the lights, the kettle in the closet. By six the building is warm and by seven it is ready to be used by people. A building does not wake up on its own. Somebody walks it into the day. I have walked this one into nine thousand days. You get to know its mornings.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:five-am:rep-2",
          text: "Empty and honest. The night lights still on in the corner Marek likes. One window someone left open in summer. The plants by the glass wall catching the first grey. It is the only hour the building belongs to itself and to me. I am not lonely at five. I am early. There is a difference and the difference is the plants.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:five-am:rep-3",
          text: "Once a season something happens. A pipe that announces itself. A window the wind found. A courier at the wrong door with the right van. Five am is when the building makes its small announcements, before the day can drown them out. Most mornings I hear nothing. The nothing is the announcement I prefer.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:five-am:rep-4",
          text: "He lasted four days and slept in the beanbag on the fifth. Good try, honest fall. I made him tea that morning and told him: your hours are a rhythm, not a virtue. His best work starts at ten and it is good work. The building needs five am men and ten am men. The trick is knowing which one you are.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "janusz:five-am:rep-5",
          text: "Maciek arrives at eight forty-five and calls it five because of his watch, which is set to a conference in another country. I let the claim stand. A man's watch is his own business. The building knows who walks it at five. The building does not gossip.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:five-am:rep-6",
          text: "Six misses the pipes. At five there is still night in the walls and the trouble sounds different — a drip at five is a drip, a drip at six is already a puddle with a meeting. The hour is not discipline. The hour is listening. Five is when the building still talks quietly.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "janusz:steps",
      label: "The step counter",
      optionCandidates: [
        { id: "janusz:steps:opt-1", topicId: "janusz:steps", text: "Renata says you do twenty thousand steps a day." },
        { id: "janusz:steps:opt-2", topicId: "janusz:steps", text: "You wear a step counter? Modern of you." },
        { id: "janusz:steps:opt-3", topicId: "janusz:steps", text: "Where do most of your steps happen?" },
        { id: "janusz:steps:opt-4", topicId: "janusz:steps", text: "Dawid saw your step count and said nothing." },
        { id: "janusz:steps:opt-5", topicId: "janusz:steps", text: "Did you ever hit zero steps? A day off?" },
        { id: "janusz:steps:opt-6", topicId: "janusz:steps", text: "Do you compete with anyone on steps?" },
      ],
      replyCandidates: [
        {
          id: "janusz:steps:rep-1",
          text: "Renata counts my steps the way she counts everything — better than I do. Twenty thousand on a good day, sixteen on a quiet one. The floor is two hundred meters end to end. Do the sums and you get a man who walks Warsaw twice a year without leaving the building. The building is my city and the rent is steps.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:steps:rep-2",
          text: "Renata gave it to me three birthdays ago. It beeps when I sit too long, which is the counter's whole opinion and it is usually right. I did not want it. Now I check it. That is how the machines get you — one beep at a time, politely, until you and the beep are colleagues.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:steps:rep-3",
          text: "The basement to the roof loop. Stairs, both directions, every day. The lift is for people and boxes and I am neither before noon. The stairs know my feet the way the floor knows the mop. Most of my steps are between a problem and its part, and the part is always in the basement. The basement is where I get my figure.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:steps:rep-4",
          text: "He looked, nodded once, and said 'sustainable'. From Dawid that is a parade. The CEO walks the block at lunch, I walk the floors since morning. Neither of us calls it exercise. It is just the route the work takes. The counter only counts what the work already was.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:steps:rep-5",
          text: "Once. Fever, four years back, and the building was fine without me — that was the harder lesson than the fever. Renata covered, Renata's way, which is a phone call and a notebook. The counter read forty steps, all to the kitchen and back. I rested. The building held. Both of us learned something and neither of us says what.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:steps:rep-6",
          text: "The courier dog, Burek. Not a real contest — his legs are shorter and his heart is bigger. On his days here he does my numbers by noon and naps on the achievement. I have started scoring myself against the napping. If the dog rests satisfied, the floor is clean enough. That is the only leaderboard that matters in this building.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "janusz:seasons",
      label: "The building's seasons",
      optionCandidates: [
        { id: "janusz:seasons:opt-1", topicId: "janusz:seasons", text: "Does the building change with the seasons?" },
        { id: "janusz:seasons:opt-2", topicId: "janusz:seasons", text: "What is the building's worst season?" },
        { id: "janusz:seasons:opt-3", topicId: "janusz:seasons", text: "Spring — what does the building do in spring?" },
        { id: "janusz:seasons:opt-4", topicId: "janusz:seasons", text: "The autumn drafts by the old wall are back." },
        { id: "janusz:seasons:opt-5", topicId: "janusz:seasons", text: "Which season do you like, Janusz?" },
        { id: "janusz:seasons:opt-6", topicId: "janusz:seasons", text: "Summer — does the building struggle in heat?" },
      ],
      replyCandidates: [
        {
          id: "janusz:seasons:rep-1",
          text: "Like an old man changes with weather — honestly, and in the joints. Winter the pipes talk, spring the walls dry and the paint lifts a hair, summer the glass wall expands its centimeter and autumn everything in between. I keep a calendar of it. Twenty years of the same complaints, on schedule. The building is the most reliable employee here.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:seasons:rep-2",
          text: "The turn — February into March. Frozen, then not, then frozen again. The pipes cannot decide and neither can the heating. That is when I sleep lightest. A building in two minds needs a man with one. The rest of the year it mostly manages itself and I mostly listen.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:seasons:rep-3",
          text: "Breathes. The windows open for the first time in six months and the building exhales a winter of held air. The plants get moved a meter toward the light. The outside stairs get their first wash. Spring is when I fix everything winter taught me about — on the building's schedule, not the budget's. The budget catches up in April.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:seasons:rep-4",
          text: "They are. Left wall, third window, a gap the size of a coin that swells in October. I know it by the sound it makes near the plants. The seal man comes in November, fixes it, and by next October the coin is back. We have an arrangement, the gap and me. Some things you fix forever. Some you greet.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],
        },
        {
          id: "janusz:seasons:rep-5",
          text: "September. The building is warm but the air is sharp, the windows open in the morning, the students come back and the coffee queue grows. The floor shines after the summer deep clean. September is the building at its best mood. Nobody notices. Noticing is my department.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:seasons:rep-6",
          text: "The glass wall becomes a promise the sun takes seriously. Afternoons, the west side bakes and Marek's machines hum louder and the plants drink double. We had a heat plan since 2015 — blinds down by two, fans up by three, and the good ice for the coffee machine at four. The building does not struggle. The building negotiates. I hold the pen.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "janusz:robot-apprentice",
      label: "The robot apprentice",
      optionCandidates: [
        { id: "janusz:robot-apprentice:opt-1", topicId: "janusz:robot-apprentice", text: "You built Halina? The plant robot?" },
        { id: "janusz:robot-apprentice:opt-2", topicId: "janusz:robot-apprentice", text: "Does Halina work or is she a mascot?" },
        { id: "janusz:robot-apprentice:opt-3", topicId: "janusz:robot-apprentice", text: "Marek offered to upgrade Halina's brain." },
        { id: "janusz:robot-apprentice:opt-4", topicId: "janusz:robot-apprentice", text: "Pawel asked to apprentice under you. For Halina?" },
        { id: "janusz:robot-apprentice:opt-5", topicId: "janusz:robot-apprentice", text: "Halina missed a plant last week. Scandal?" },
        { id: "janusz:robot-apprentice:opt-6", topicId: "janusz:robot-apprentice", text: "What is next for the robot fleet?" },
      ],
      replyCandidates: [
        {
          id: "janusz:robot-apprentice:rep-1",
          text: "Built in the garage, one winter, from a scooter motor and stubbornness. The plants were getting twice-a-day water from me and hating it. Halina does once, measured, on a rail I greased every Sunday. The plants perked up in a month. The lesson cost me a winter: care is not more. Care is exact.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:robot-apprentice:rep-2",
          text: "She works. Two hundred meters of rail, four stops, every morning at six twenty. The watering is boring and boring is what machines are for. I kept the interesting parts — noticing, pruning, judging. Halina carries the jug. I carry the opinion. Twenty years from now they will say a robot did my job. Let them. The robot has never once noticed a sad leaf.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:robot-apprentice:rep-3",
          text: "He offered sensors, a schedule brain, remote eyes. I said no and he accepted, which is Marek's best quality — he asks again in a year, never the same week. Halina is dumb on purpose. A dumb machine cannot be updated into nonsense. Her one job is water and she has never missed a Monday. There are CEOs who cannot say that.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:robot-apprentice:rep-4",
          text: "He asked for the rail, not the robot — wanted to see how a scooter became a gardener. We spent two Saturdays in the garage. He labeled everything, of course, the boy labels his labels. He left with grease under his nails and a respect for motors. That is the whole apprenticeship. Grease and respect. The robot came third.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "quest:pawel-apprentice"],
        },
        {
          id: "janusz:robot-apprentice:rep-5",
          text: "She did not miss. The plant moved. Klaudia rearranged the corner for light and did not tell the rail. I moved the stop back by a hand width and Halina found it the next morning. The robot is never wrong. The building around the robot is wrong, weekly, and I am the translator between them. That is management, in the end.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:robot-apprentice:rep-6",
          text: "Nothing new. Two are enough — Halina waters, Seba patrols the doors at night and naps more than he admits. A third robot would need a third opinion about what matters, and I only have two. Machines should arrive slowly, like furniture, one at a time, each with one job and one name. The fleet stays at two until the building asks. The building has not asked.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "janusz:boiler-room",
      label: "The boiler room",
      optionCandidates: [
        { id: "janusz:boiler-room:opt-1", topicId: "janusz:boiler-room", text: "Nobody goes to the boiler room but you." },
        { id: "janusz:boiler-room:opt-2", topicId: "janusz:boiler-room", text: "What is down there besides the boiler?" },
        { id: "janusz:boiler-room:opt-3", topicId: "janusz:boiler-room", text: "Marek wants to put servers in the boiler room." },
        { id: "janusz:boiler-room:opt-4", topicId: "janusz:boiler-room", text: "The boiler room is warm in winter. Candidates noticed." },
        { id: "janusz:boiler-room:opt-5", topicId: "janusz:boiler-room", text: "Ever found anything strange down there?" },
        { id: "janusz:boiler-room:opt-6", topicId: "janusz:boiler-room", text: "What happens to the building when the boiler fails?" },
      ],
      replyCandidates: [
        {
          id: "janusz:boiler-room:rep-1",
          text: "Good. It is not a room for visitors. It is the one place the building says what it really is — water, heat, pressure, no posters. Everything upstairs is the building dressed. Down there is the building thinking. I go down twice a day and I do not rush the visit.",
          relationshipHint: "pleased",
        },
        {
          id: "janusz:boiler-room:rep-2",
          text: "The boiler, the pumps, the winter-99 heater that earned its retirement, shelves of parts by winter, and one chair. The chair is mine since before some of your salaries. Down there is also where the building keeps its spare honesty. Every pipe is labeled in my hand. The labels have outlived three handwriting changes in the office upstairs.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "janusz:boiler-room:rep-3",
          text: "I told him no, and I was right, and he knew it by the second question. Heat, dust, and a boiler that hammers when it thinks — servers want the opposite of everything that room is. He took the no like an engineer: asked why, listened, nodded. The room stays what it is. Not every space needs a second career.",
          relationshipHint: "annoyed",
        },
        {
          id: "janusz:boiler-room:rep-4",
          text: "They have, and I chase them out gently. The warm is the boiler's work, not a lounge. One candidate fell asleep on the parts shelf in January and I let him sleep twenty minutes, because January, then walked him up. Renata asked where he was. I said: learning where the heat comes from. True and sufficient.",
          relationshipHint: "neutral",
        },
        {
          id: "janusz:boiler-room:rep-5",
          text: "A tin box, 2011, with keys to doors this building does not have anymore. Doors from before the renovation, doors from the firm before the firm. I gave the box to Renata — keys are her country, not mine. The boiler room gave up its one ghost and went back to being honest. Pipes and pressure. No more surprises since. I check anyway.",
          relationshipHint: "delighted",
        },
        {
          id: "janusz:boiler-room:rep-6",
          text: "Nothing dramatic. It fails like an old man, slowly, with symptoms I have a schedule for. The reserve heater comes out, the office wears coats, the meeting gets shorter. Cold is survivable. Cold with twenty years of notes is survivable politely. The boiler and I have an understanding: it warns me, and I never make it a surprise to anyone else.",
          relationshipHint: "pleased",
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

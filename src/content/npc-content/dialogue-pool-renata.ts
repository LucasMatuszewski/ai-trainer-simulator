/**
 * WS3 dialogue v2 pool — Renata, Support / Office Manager (C-77).
 *
 * Pure authored data. Topics: how the office really works, the Burek duty
 * roster, coffee watch (mornings), and visitor drama. Task offer: Burek
 * duty (sets the existing `burek-fed` flag). Tone matches her legacy trees:
 * warm, unflappable, quietly running the entire building.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const RENATA_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "renata",
  topics: [
    {
      id: "renata:office-intel",
      label: "How this office really works",
      optionCandidates: [
        {
          id: "renata:office-intel:opt-1",
          topicId: "renata:office-intel",
          text: "Who actually runs this place?",
        },
        {
          id: "renata:office-intel:opt-2",
          topicId: "renata:office-intel",
          text: "Which meeting can I safely skip?",
        },
        {
          id: "renata:office-intel:opt-3",
          topicId: "renata:office-intel",
          text: "Who do I ask when I break something?",
        },
        {
          id: "renata:office-intel:opt-4",
          topicId: "renata:office-intel",
          text: "Where does the good coffee hide?",
        },
        {
          id: "renata:office-intel:opt-5",
          topicId: "renata:office-intel",
          text: "How do people survive the standups?",
        },
        {
          id: "renata:office-intel:opt-6",
          topicId: "renata:office-intel",
          text: "Is there anything in this office that actually works?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:office-intel:rep-1",
          text: "Me. Officially it is Dawid, then Maciek, then a chart nobody has opened since the rebrand. Practically: the building runs on my clipboard and Janusz's robots. Keep both of us happy and you will never need the chart.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:office-intel:rep-2",
          text: "Anything with 'sync' in the title. If it is called a 'workshop', go, because those have sandwiches. If it is called an 'alignment', bring a laptop and look concerned. Nobody has ever verified the concern.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:office-intel:rep-3",
          text: "Depends what you broke. Coffee machine: me. Printer: nobody, that is a licensed mystery. The server rack: Marek, through the door, never the keyboard. Your own laptop: Pawel, and lower your expectations first.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:office-intel:rep-4",
          text: "The good beans live in the kitchen's left cupboard, behind the 'team building' budget receipts. Grazyna does the accounting, Janusz does the hiding, I do the enabling. Tuesday mornings there is a fresh bag. I did not tell you this.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:office-intel:rep-5",
          text: "Nod, say 'blocked on the printer', and mean it, because everyone is blocked on the printer. It is the only status update that has remained true for six years.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:office-intel:rep-6",
          text: "The plant by the server rack. Janusz wired it to an automatic watering robot called Halina. It is the only employee here with full uptime and no opinions about agile. Aspire to the plant.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:burek",
      label: "Burek duty",
      optionCandidates: [
        {
          id: "renata:burek:opt-1",
          topicId: "renata:burek",
          text: "Whose turn is it to walk Burek?",
        },
        {
          id: "renata:burek:opt-2",
          topicId: "renata:burek",
          text: "Burek ate someone's lunch again. Do I file a report?",
        },
        {
          id: "renata:burek:opt-3",
          topicId: "renata:burek",
          text: "Burek came to my desk and stared at me for ten minutes.",
        },
        {
          id: "renata:burek:opt-4",
          topicId: "renata:burek",
          text: "Can I take Burek to a client meeting?",
        },
        {
          id: "renata:burek:opt-5",
          topicId: "renata:burek",
          text: "Burek ignored me completely today. What did I do wrong?",
        },
        {
          id: "renata:burek:opt-6",
          topicId: "renata:burek",
          text: "Who feeds Burek when you are on holiday?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:burek:rep-1",
          text: "The roster says Marek, but Marek says the roster is 'a suggestion', so now it says you. Bowl is by the kitchen door, he prefers the corner route, and do not rush him. Burek's walks have outlasted two CTOs.",
          relationshipHint: "neutral",
          offersTaskId: "renata:task-burek-duty",
        },
        {
          id: "renata:burek:rep-2",
          text: "File it under 'kitchen incidents', same folder as the fork in the microwave and the Great Yoghurt Theft of 2024. Burek eats what the office fails to guard. It is basically a security audit with fur.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:burek:rep-3",
          text: "That is a performance review. Burek does those. If he stared for ten minutes and then left, you passed. If he sighed first, book some training. Nobody knows what the training is. It has never been needed.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:burek:rep-4",
          text: "Legal, HR and Dawid would all say no, which is how I know you should do it exactly once. Clients remember the dog. We closed a renewal the day Burek fell asleep on a projector remote. Coincidence. Legal says say coincidence.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:burek:rep-5",
          text: "Nothing. Burek distributes his attention on a schedule no one has decoded. Janusz claims it correlates with who refills the water bowl. Janusz refills the water bowl. Draw your own conclusions.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:burek:rep-6",
          text: "Janusz. Always Janusz. The man built robots for plants and mugs, but for Burek he shows up personally. Even the robots have a hierarchy, and Burek is at the top of it.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "renata:coffee-watch",
      label: "Coffee watch",
      periods: ["morning"],
      optionCandidates: [
        {
          id: "renata:coffee-watch:opt-1",
          topicId: "renata:coffee-watch",
          text: "The coffee machine is making a new sound.",
        },
        {
          id: "renata:coffee-watch:opt-2",
          topicId: "renata:coffee-watch",
          text: "Klaudia ran out of oat milk and is filming a story about it.",
        },
        {
          id: "renata:coffee-watch:opt-3",
          topicId: "renata:coffee-watch",
          text: "Is the machine broken, or just in one of its moods?",
        },
        {
          id: "renata:coffee-watch:opt-4",
          topicId: "renata:coffee-watch",
          text: "How many coffees a day is too many?",
        },
        {
          id: "renata:coffee-watch:opt-5",
          topicId: "renata:coffee-watch",
          text: "Someone put the decaf in the good tin. On purpose.",
        },
        {
          id: "renata:coffee-watch:opt-6",
          topicId: "renata:coffee-watch",
          text: "Grazyna says coffee is not a budget line.",
        },
      ],
      replyCandidates: [
        {
          id: "renata:coffee-watch:rep-1",
          text: "New sound number five, then. Do not descale it, do not apologize to it, and do not let Marek near it with a screwdriver. Come get me. The protocol is: I look at it, I say 'hmm', and it keeps working out of professional embarrassment.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:coffee-watch:rep-2",
          text: "Let her film. An oat milk crisis performed for the algorithm is still an oat milk crisis, and the last one got us a brand deal with a dairy company. Klaudia's suffering has monetized twice. I consider her a channel.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:coffee-watch:rep-3",
          text: "Broken is a spectrum. It is never fully broken and never fully working, like this company's roadmap. If it produces coffee at any temperature, we call it working and adjust our expectations. That is the office-wide strategy for everything.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:coffee-watch:rep-4",
          text: "The Renata scale: three is a habit, five is a lifestyle, eight is Marek. Nobody has measured Marek. We measure his outputs and the outputs are fine, so officially the answer is 'do not become Marek'.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:coffee-watch:rep-5",
          text: "Sabotage. That is the fourth-worst thing you can do to this floor, right after unplugging the printer, losing the good beans, and telling Zosia you heard a 'great idea'. Note who was near the tin. I keep a list. The list keeps me calm.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:coffee-watch:rep-6",
          text: "Grazyna says that about everything that keeps the staff alive. She once categorized morale as 'unbudgeted goodwill'. I moved the coffee to the stationery budget. It has been 'ink adjacent' for three years and nobody has dared ask.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:visitors",
      label: "Visitor drama",
      optionCandidates: [
        {
          id: "renata:visitors:opt-1",
          topicId: "renata:visitors",
          text: "There is a courier here who will not leave without a signature.",
        },
        {
          id: "renata:visitors:opt-2",
          topicId: "renata:visitors",
          text: "A visitor asked what the Batman sign means.",
        },
        {
          id: "renata:visitors:opt-3",
          topicId: "renata:visitors",
          text: "Przemek brought a client in without telling anyone again.",
        },
        {
          id: "renata:visitors:opt-4",
          topicId: "renata:visitors",
          text: "Someone from HR called asking for 'a quick chat'.",
        },
        {
          id: "renata:visitors:opt-5",
          topicId: "renata:visitors",
          text: "The pizza delivery is here, but nobody ordered pizza.",
        },
        {
          id: "renata:visitors:opt-6",
          topicId: "renata:visitors",
          text: "A student asked if they can shadow someone for a day.",
        },
      ],
      replyCandidates: [
        {
          id: "renata:visitors:rep-1",
          text: "Sign it. Sign anything. In 2022 I signed for forty kilos of 'brand collateral' that turned out to be Batman posters. The signature was legally binding, the posters were legally forever. Paper is cheaper than whatever meeting replaces it.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:visitors:rep-2",
          text: "Tell them it is brand equity. Tell them it cost forty thousand zloty. Watch them recalculate how serious we are. Dawid gives that tour four times a quarter and by now even he believes it.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:visitors:rep-3",
          text: "Of course he did. Put them in the small meeting room, give them the good coffee, and invoice Przemek for the hospitality. He respects nothing except the invoice. It is the only language he has ever learned fluently.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:visitors:rep-4",
          text: "Everyone gets the call. It is a quick chat the way the printer is temporarily broken. Go in, agree with everything, volunteer for nothing, and if they say 'we are streamlining', update your CV by Friday. That is not a joke. That is the calendar.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:visitors:rep-5",
          text: "Nobody ever orders the pizza. The pizza simply arrives, the way invoices arrive. Eat it fast and do not post about it. Last time Ania tagged it as a 'culture win' and now it is in the onboarding deck.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:visitors:rep-6",
          text: "Shadow Marek for an hour, then Pawel for an hour, then Burek for the afternoon. That is the full curriculum: fear, confusion, peace. If the student still wants the job after that, hire them before they recover.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:first-day",
      label: "The first-day survival kit",
      optionCandidates: [
        {
          id: "renata:first-day:opt-1",
          topicId: "renata:first-day",
          text: "What should I know that is not in the handbook?",
        },
        {
          id: "renata:first-day:opt-2",
          topicId: "renata:first-day",
          text: "Where do I sit on my first day?",
        },
        {
          id: "renata:first-day:opt-3",
          topicId: "renata:first-day",
          text: "Who do I absolutely not bother on day one?",
        },
        {
          id: "renata:first-day:opt-4",
          topicId: "renata:first-day",
          text: "What does everyone get wrong in week one?",
        },
        {
          id: "renata:first-day:opt-5",
          topicId: "renata:first-day",
          text: "Is there an initiation ritual?",
        },
        {
          id: "renata:first-day:opt-6",
          topicId: "renata:first-day",
          text: "When do I get my own mug?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:first-day:rep-1",
          text: "The handbook was written in 2021 by someone who has since left, and it contains one true sentence: the front desk solves everything. Everything else is archaeology. The real handbook is me, the real policies are the sticky notes under my keyboard, and you are reading the right source right now.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:first-day:rep-2",
          text: "By the window, next to the plant, until Marek claims you as a hedge against loneliness. That desk is the nursery: everyone starts there and everyone leaves it knowing two things — where the good coffee hides, and why monitor six is sacred. Congratulations, you are now in the onboarding deck.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:first-day:rep-3",
          text: "Marek before ten, Maciek before board day, and Grazyna before the first of the month. Everyone else is fair game, and Burek is mandatory — the dog interview comes before the human ones in every process that matters. If he sighs at you, we talk. If he sleeps near you, you are hired.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:first-day:rep-4",
          text: "They try to fix things. Week-one energy is a firehose and this office has survived a dozen of them. Write your observations down, bring them to me at the two-week mark, and the ones that are still true I will route properly. Half of what newcomers see disappears on its own, like weather.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:first-day:rep-5",
          text: "Standing in front of the printer for a full minute, in silence. That is it. You acknowledge the monument, you do not touch it, and you never speak of what you thought during the minute. Everyone here has done it. Marek did it twice, but he does everything twice, once for the audit.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:first-day:rep-6",
          text: "The mug chooses you, not the other way around. There is a shelf above the sink of unclaimed mugs and one of them will survive your first wash cycle without chipping. That one is yours. The shelf has never been wrong. HR thinks the shelf is crockery. The shelf is an institution.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "renata:plants",
      label: "The plant diplomacy",
      optionCandidates: [
        {
          id: "renata:plants:opt-1",
          topicId: "renata:plants",
          text: "Why are the plants healthier than the staff?",
        },
        {
          id: "renata:plants:opt-2",
          topicId: "renata:plants",
          text: "The fern in the training room is dying. Quietly.",
        },
        {
          id: "renata:plants:opt-3",
          topicId: "renata:plants",
          text: "Can I take a cutting home?",
        },
        {
          id: "renata:plants:opt-4",
          topicId: "renata:plants",
          text: "Who names the plants?",
        },
        {
          id: "renata:plants:opt-5",
          topicId: "renata:plants",
          text: "Klaudia wants to film the plants for content.",
        },
        {
          id: "renata:plants:opt-6",
          topicId: "renata:plants",
          text: "What is the oldest plant here?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:plants:rep-1",
          text: "The plants have Halina, and Halina has never attended a meeting in her life. Watering on a schedule, no opinions about agile, zero involvement in the roadmap. If any of us got that contract we would flourish too. Aspire to the plant. I say it to every new hire and I mean it every time.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:plants:rep-2",
          text: "That fern is a sensor for the room. It thrives on attention and wilts when the training room goes unused, which means it has been reporting our utilization rate for three years. I will move it to the corridor, where the foot traffic is honest, and we will not discuss what it was saying.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:plants:rep-3",
          text: "Cuttings are allowed with one rule: name it after the office. There are at least nine pothos plants in this city named DevPowers Junior, and two of them have outlived the jobs their owners took afterward. The cuttings are a benefits program. Nobody signed up. Everybody stayed.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:plants:rep-4",
          text: "Janusz names them. Halina is named after his aunt, the fern is named Zdzislaw The Second — do not ask about the first — and the cactus by reception is called 'The Auditor', because it takes something from everyone and gives nothing back. Grazyna waters The Auditor personally. There is respect between professionals.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:plants:rep-5",
          text: "She may film, from the corridor angle, without moving a single pot. The plants are on Halina's schedule, not the content calendar, and the last person who rearranged a plant for a photo spent a week apologizing to a robot. Klaudia knows this. She tested it once. Halina won.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:plants:rep-6",
          text: "The rubber plant in Bartek's line of sight. It predates three CEOs, two floods, one rebrand, and every vision statement on the walls. It has never been repotted because it has never needed it. That is what seniority looks like here: rooted, unbothered, quietly older than the org chart.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:morning"],
        },
      ],
    },
    {
      id: "renata:birthdays",
      label: "The birthday card economy",
      optionCandidates: [
        {
          id: "renata:birthdays:opt-1",
          topicId: "renata:birthdays",
          text: "Whose birthday is it next? Asking responsibly.",
        },
        {
          id: "renata:birthdays:opt-2",
          topicId: "renata:birthdays",
          text: "Do I have to sign every card?",
        },
        {
          id: "renata:birthdays:opt-3",
          topicId: "renata:birthdays",
          text: "What is the cake budget, really?",
        },
        {
          id: "renata:birthdays:opt-4",
          topicId: "renata:birthdays",
          text: "Grazyna did not sign the last card.",
        },
        {
          id: "renata:birthdays:opt-5",
          topicId: "renata:birthdays",
          text: "Przemek organized his own birthday party.",
        },
        {
          id: "renata:birthdays:opt-6",
          topicId: "renata:birthdays",
          text: "What do you write in the cards?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:birthdays:rep-1",
          text: "Next is Pawel, and yes, asking responsibly is the correct posture — the card economy punishes the unprepared. The calendar behind me is color-coded: blue is cake, yellow is collection, red is 'Przemek'. Red months require rest beforehand. You will understand in October.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:birthdays:rep-2",
          text: "You sign every card, even for people you have not met, because the count is the gift. The card is less a message than a census — fifteen signatures says 'you are not forgotten', twelve says 'budget cuts', and nine says 'update your CV'. I keep the historical counts. The trends matter.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:birthdays:rep-3",
          text: "There is a cake line in the budget labeled 'morale ( consumables )' and Grazyna guards it like a border. It covers fifteen cakes a year if nobody discovers the good bakery. Somebody discovered the good bakery in 2023. The line now covers nine. Choose whose birthday matters carefully. Joking. Mostly.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:birthdays:rep-4",
          text: "Grazyna does not sign cards. Grazyna TRANSFERS the equivalent amount into the cake fund and initials the ledger. It is colder and it is more generous at the same time, which is the most Grazyna thing possible. Her initials in the ledger are worth more than any signature. The recipients understand. Eventually.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:birthdays:rep-5",
          text: "He has done it three years running: books the venue, invites everyone, invoices the party as 'client entertainment'. It is the only invoice I reject with pleasure and the only party I attend with the same. The man turned his own birthday into a sales channel. You have to respect the funnel.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:birthdays:rep-6",
          text: "The same sentence, adjusted by one adjective per seniority: 'happy birthday, keep being' — reliable for seniors, curious for juniors, dangerous for executives. Nobody has noticed the system in eleven years, and the cards keep landing. Consistency reads as warmth. Remember that. It works on clients too.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "renata:storage",
      label: "The storage room",
      optionCandidates: [
        {
          id: "renata:storage:opt-1",
          topicId: "renata:storage",
          text: "What is actually in the storage room?",
        },
        {
          id: "renata:storage:opt-2",
          topicId: "renata:storage",
          text: "Boxes marked 2021. Can we throw them out?",
        },
        {
          id: "renata:storage:opt-3",
          topicId: "renata:storage",
          text: "I heard music coming from the storage room.",
        },
        {
          id: "renata:storage:opt-4",
          topicId: "renata:storage",
          text: "Where do the old conference banners go?",
        },
        {
          id: "renata:storage:opt-5",
          topicId: "renata:storage",
          text: "Is the storage room bigger than the meeting room?",
        },
        {
          id: "renata:storage:opt-6",
          topicId: "renata:storage",
          text: "What is the one thing you would save in a fire?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:storage:rep-1",
          text: "Eleven years of this company pretending it would need things again. Conference lanyards from clients we fired, a ping-pong table that lost the net in 2022, forty kilos of Batman posters from the courier I signed for, and one box marked 'DO NOT OPEN — MOOD'. We do not open the mood box.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:storage:rep-2",
          text: "Every box we have thrown out in eleven years, we needed within a month. It is the office's only law of physics. So the boxes stay, the room stays full, and once a year we move them all two meters left and call it an inventory. Grazyna deducts the square meters as 'archive costs'. It works. Do not fix it.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:storage:rep-3",
          text: "That is Janusz. He fixed the old radio in 2019 and does the deep-clean to a station that plays nothing recorded after 1989. The storage room is the only room in this building with a music policy, and the policy is: whatever Janusz's radio says. Nobody has ever disputed it. Nobody ever will.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:storage:rep-4",
          text: "There is a banner graveyard behind the archive boxes, three deep. Every failed slogan of the last decade is back there, and once a year one falls on somebody and they learn the company's whole emotional history in one second. The current banners are fine. The previous ones knew things.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:storage:rep-5",
          text: "Bigger, warmer, and booked more often, if we are honest. People go to the storage room to 'look for a cable' and stay for the silence. It is the only room with no glass wall, no agenda, and no Bruce. If we ever downsize, the storage room inherits the company. I have said this in a planning meeting. Nobody laughed.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:storage:rep-6",
          text: "The clipboard. Everything else in this building is insured, replaceable, or already a copy. The clipboard is the accumulated intelligence of eleven years in one laminated document, and it lives in my bag at night. Dawid thinks the servers hold the company together. The servers think the clipboard does. Both are right.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "renata:fire-drill",
      label: "The quarterly fire drill",
      optionCandidates: [
        {
          id: "renata:fire-drill:opt-1",
          topicId: "renata:fire-drill",
          text: "Is there a fire drill scheduled?",
        },
        {
          id: "renata:fire-drill:opt-2",
          topicId: "renata:fire-drill",
          text: "Who carries Burek out in a drill?",
        },
        {
          id: "renata:fire-drill:opt-3",
          topicId: "renata:fire-drill",
          text: "Maciek took his laptop to the assembly point.",
        },
        {
          id: "renata:fire-drill:opt-4",
          topicId: "renata:fire-drill",
          text: "Grazyna refused to leave the ledger.",
        },
        {
          id: "renata:fire-drill:opt-5",
          topicId: "renata:fire-drill",
          text: "How long does the drill actually take?",
        },
        {
          id: "renata:fire-drill:opt-6",
          topicId: "renata:fire-drill",
          text: "What is the assembly point ritual?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:fire-drill:rep-1",
          text: "Quarterly, unannounced, and I know the date because I file the paperwork, which makes me the only person in the building who is calm and the only person everyone glares at. The drill happens at 10:20, the coffee has just been brewed, and the universe insists on this every single time.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:fire-drill:rep-2",
          text: "Nobody carries Burek. Burek leads. He is first down the stairs, takes his position at the assembly point, and audits the headcount with his eyes while I count with my clipboard. We cross-check. We have never once disagreed, and I find that both reassuring and slightly humiliating.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:fire-drill:rep-3",
          text: "Of course he did. The laptop contains the vision, and the vision does not burn. I stopped fighting it in year two. Now I note the laptop's make and model on the drill form under 'cargo', and Maciek notes my clipboard under 'cargo' as well. We have a whole cargo section. It is the drill's best column.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:fire-drill:rep-4",
          text: "She does not refuse. She LOCKS it. There is a two-minute ceremony involving a drawer, a key, and a second drawer, and then she evacuates faster than the interns. The ledger has survived five drills, one flood, and a spilled soup. The soup is why there is a second drawer. Ask nothing further.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:fire-drill:rep-5",
          text: "Four minutes if nobody talks, nine if Przemek narrates, and once, memorably, twenty-two because the fire brigade arrived uninvited and Dawid tried to pitch them. The official number on the form is four. The form and reality diverged years ago and I have made peace with the fiction.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:fire-drill:rep-6",
          text: "We gather, I count, Burek confirms, and then — before anyone is released — Dawid says one sentence containing the word 'resilience'. That is the ritual. It costs nothing, it takes nine seconds, and it lets everyone feel the inconvenience had strategic value. Then we walk back in and the coffee is cold. Tradition.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:supplies",
      label: "The stationery cabinet",
      optionCandidates: [
        {
          id: "renata:supplies:opt-1",
          topicId: "renata:supplies",
          text: "We are out of good pens. Again.",
        },
        {
          id: "renata:supplies:opt-2",
          topicId: "renata:supplies",
          text: "Why is the good stationery locked?",
        },
        {
          id: "renata:supplies:opt-3",
          topicId: "renata:supplies",
          text: "Tomek took home twelve highlighters.",
        },
        {
          id: "renata:supplies:opt-4",
          topicId: "renata:supplies",
          text: "Can we order the nice sticky notes?",
        },
        {
          id: "renata:supplies:opt-5",
          topicId: "renata:supplies",
          text: "Grazyna audited the stationery drawer.",
        },
        {
          id: "renata:supplies:opt-6",
          topicId: "renata:supplies",
          text: "What does the office actually run out of fastest?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:supplies:rep-1",
          text: "The good pens live in a rotation only I understand, because the moment good pens are freely available, they migrate home in laptop bags. There is a tray, there is a schedule, and there is a pen graveyard in the storage room for the ones whose caps went missing. All pens are accounted for. Spiritually.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:supplies:rep-2",
          text: "The lock is not about theft. It is about the 4pm visitor who signs the delivery, compliments the pen, and leaves with it in their coat pocket. One lock saved us roughly sixty pens a year. I did the math once, on a sticky note, which was itself stolen. The math survived. The note did not.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:supplies:rep-3",
          text: "Highlighters are a junior natural resource — they mark everything while learning what matters. Tomek's twelve will return as three, which is still better than my first year's ratio. I keep a tab in the ledger called 'growth' where those numbers go. It is my favorite tab. It means people are learning.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:supplies:rep-4",
          text: "The nice sticky notes were ordered once, in 2021, in pastel. They were so nice that nobody used them — you cannot write 'call the courier' on something that beautiful. They are in the storage room, mint condition, appreciating. We order the ugly ones now. Utility is the only luxury this office respects.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:supplies:rep-5",
          text: "She found what she always finds: that we are under budget and over-stocked, which is the only audit finding she frames. There is a sticky note from her on the drawer that says 'acceptable'. I have kept it for four years. From Grazyna, 'acceptable' is a parade.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "quest:grazyna-showed-the-books"],
        },
        {
          id: "renata:supplies:rep-6",
          text: "Spoons. Every quarter, spoons. Not stolen — ABSORBED. Desk drawers, laptop bags, one confirmed sighting in a client's car. I have bought sixty spoons in eleven years and the office owns four. Coffee is the company's blood and spoons are its platelets. We are chronically low and we persevere.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "renata:holidays",
      label: "The holiday cover",
      optionCandidates: [
        {
          id: "renata:holidays:opt-1",
          topicId: "renata:holidays",
          text: "I want to book leave. What is the protocol?",
        },
        {
          id: "renata:holidays:opt-2",
          topicId: "renata:holidays",
          text: "Who covers for you when YOU are away?",
        },
        {
          id: "renata:holidays:opt-3",
          topicId: "renata:holidays",
          text: "August is empty. Is anything still operating?",
        },
        {
          id: "renata:holidays:opt-4",
          topicId: "renata:holidays",
          text: "Marek booked leave and nobody believes it.",
        },
        {
          id: "renata:holidays:opt-5",
          topicId: "renata:holidays",
          text: "What happens to the office in the last week of December?",
        },
        {
          id: "renata:holidays:opt-6",
          topicId: "renata:holidays",
          text: "How do I hand over my tasks properly?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:holidays:rep-1",
          text: "Pick dates, check the wall calendar for red months, tell me before you tell the system. The system is a form; I am a firewall between you and the form. If your dates survive me, they survive everything. Two weeks' notice for anything over three days, and never the week after a bootcamp.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:holidays:rep-2",
          text: "Nobody, and that is by design. I leave a laminated sheet with the three phone numbers that matter and the location of the spare keys, and the office discovers what I actually do here. By Thursday they are humble. By Friday they have invented half my job badly. I come back to gratitude and a backlog. It is the best recruitment tool I have.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:holidays:rep-3",
          text: "August runs on three people, two robots and a dog, and honestly the output barely moves. The office's real throughput was never headcount, it was proximity — too many decisions were just conversations at the coffee machine. In August those conversations happen with four people, and the decisions still land. Make of that what you will.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:holidays:rep-4",
          text: "He does it every year: books the last week of July, tells no one, and appears on the mountain in the one photo he sends to the group chat. The pager does not ring. He checks it anyway, from the summit, out of principle. Marek's leave is the only leave this office refuses to contact anyone about. Even the servers behave.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:holidays:rep-5",
          text: "The last week of December is my favorite: Janusz deep-cleans, Halina waters, Zdzislaw runs on the empty floors like a ghost with a filter, and the building hums to itself. I come in twice, drink the good coffee, and apologize to the office on everyone's behalf. The building prefers us absent. I take notes.",
          relationshipHint: "delighted",
          tags: ["period:afternoon"],
        },
        {
          id: "renata:holidays:rep-6",
          text: "One page per task: what it is, where it lives, who to ask, and what 'done' looks like. If any answer is 'ask me', the handover has failed before it started. The best handover I ever read was Pawel's — three pages, one diagram, a haiku about the backup. It is the office standard now. Nobody has beaten the haiku.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:gossip",
      label: "The front-desk intelligence",
      optionCandidates: [
        {
          id: "renata:gossip:opt-1",
          topicId: "renata:gossip",
          text: "You know everything, do you not.",
        },
        {
          id: "renata:gossip:opt-2",
          topicId: "renata:gossip",
          text: "Who is leaving? I will not tell anyone.",
        },
        {
          id: "renata:gossip:opt-3",
          topicId: "renata:gossip",
          text: "How do you find things out?",
        },
        {
          id: "renata:gossip:opt-4",
          topicId: "renata:gossip",
          text: "Has anyone ever tried to bribe you for information?",
        },
        {
          id: "renata:gossip:opt-5",
          topicId: "renata:gossip",
          text: "What is the biggest secret you ever kept?",
        },
        {
          id: "renata:gossip:opt-6",
          topicId: "renata:gossip",
          text: "Do you ever get tired of knowing things?",
        },
      ],
      replyCandidates: [
        {
          id: "renata:gossip:rep-1",
          text: "I know the building. People tell the front desk things they would never tell a manager, a survey, or a screen. It is not eavesdropping, it is geography — everyone walks past me to get anywhere, and I am politer than the corridor. What I do with it is the actual job, and the job is mostly discretion.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:gossip:rep-2",
          text: "That question is how I know you are settling in — everyone asks it in month two. And my answer is always the same: the people whose CVs are open on their screens at 7pm already know. My job is to make sure that when they go, the plant, the mug and the walker for Burek are covered. Departures are logistics. I do logistics.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:gossip:rep-3",
          text: "Three streams. The calendar tells me where power is flowing, the kitchen tells me where trust is flowing, and the courier schedule tells me where money is flowing. Cross-reference weekly. It is less detective work than accounting, really, and I have never once had to open a drawer that was not mine.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:gossip:rep-4",
          text: "Twice. Once with flowers, which I accepted on behalf of the reception table where they belonged, and once with the good coffee, which I redirected to the tin marked INDUSTRIAL so at least the office profited. Information here is not for sale. It is for exchange, and the exchange rate is favors, and favors are how this building breathes.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:gossip:rep-5",
          text: "A restructure that never happened. I knew for five months, said nothing, and quietly made sure the two most frightened people were too busy and too valued to update their CVs. The restructure was cancelled, and to this day those two think I simply kept them employed. I did. That is exactly what happened. Keep it that way.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:gossip:rep-6",
          text: "Knowing is not the weight. Carrying it alone is. Which is why the clipboard exists, why the laminated sheet exists, and why this office has never once had a surprise it did not survive. Nobody here has ever been ambushed by information I could have given them gently. That is the whole job. The rest is cake.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:reception",
      label: "The reception desk",
      optionCandidates: [
        { id: "renata:reception:opt-1", topicId: "renata:reception", text: "The reception desk is the office's brain. Agreed?" },
        { id: "renata:reception:opt-2", topicId: "renata:reception", text: "What lives in your desk drawers, honestly?" },
        { id: "renata:reception:opt-3", topicId: "renata:reception", text: "Visitors judge the company in eight seconds. Then?" },
        { id: "renata:reception:opt-4", topicId: "renata:reception", text: "Your desk plant versus your clipboard. Which wins?" },
        { id: "renata:reception:opt-5", topicId: "renata:reception", text: "Who sits at reception when you are off?" },
        { id: "renata:reception:opt-6", topicId: "renata:reception", text: "The one thing reception can never say?" },
      ],
      replyCandidates: [
        {
          id: "renata:reception:rep-1",
          text: "Agreed and documented — every piece of information in this building passes reception twice: once as gossip, once as fact. My desk is the customs office. Everything declares itself eventually. The trick is that I never look like I am checking. The clipboard is decorative. The ears are not.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:reception:rep-2",
          text: "The clipboard, the good pens, the box of thank-you cards, spare chargers for every port ever invented, and the folder marked 'SITUATIONS'. The folder is eleven years of 'what do we do if'. It has never once been opened in an emergency. Writing it down prevented every emergency it describes. That is the point of folders.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:reception:rep-3",
          text: "Then those eight seconds are mine, and I spend them on one thing: being EXPECTED. A visitor who is greeted by name, handed the right badge, and offered the good chair has already decided the company is competent. The product could be on fire. The lobby says otherwise. Lobbies are the first slide of every pitch.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:reception:rep-4",
          text: "The clipboard wins in emergencies and the plant wins in everything else. The desk fern has attended more difficult conversations than any employee and has never once reacted. The clipboard holds the facts. The plant holds the room. I hold the clipboard. The hierarchy is clear and slightly botanical.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:reception:rep-5",
          text: "Nobody, and that is a decision, not an oversight. The desk holds eleven years of context, forty access codes I will not write down, and the exact tone every courier responds to. The backup is a laminated sheet and a phone that forwards to me. The sheet says 'call Renata'. It is one line long. It works.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:reception:rep-6",
          text: "'I do not know.' It is physically almost impossible — and the one time I said it, in 2019, the office whispered about it for a week. Now I say 'I will know by two'. Same honesty, better marketing. Never let them see the database blink. The database does not blink. The database researches.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:mailroom",
      label: "The mailroom shelf",
      optionCandidates: [
        { id: "renata:mailroom:opt-1", topicId: "renata:mailroom", text: "The mailroom shelf has three zones. Explain." },
        { id: "renata:mailroom:opt-2", topicId: "renata:mailroom", text: "A letter arrived with no name. Intuition?" },
        { id: "renata:mailroom:opt-3", topicId: "renata:mailroom", text: "How long before unclaimed mail becomes yours?" },
        { id: "renata:mailroom:opt-4", topicId: "renata:mailroom", text: "The mailroom smells like a different decade." },
        { id: "renata:mailroom:opt-5", topicId: "renata:mailroom", text: "Someone sends this office fan mail?" },
        { id: "renata:mailroom:opt-6", topicId: "renata:mailroom", text: "The strangest delivery you ever logged?" },
      ],
      replyCandidates: [
        {
          id: "renata:mailroom:rep-1",
          text: "Zone one: personal, goes on desks same day. Zone two: business, logged and routed. Zone three: mystery, which has a thirty-day holding pattern before it graduates to zone four, which is a drawer. The zones are labeled in handwriting. The handwriting has outlasted most of the staff. It is the only stable currency here.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "renata:mailroom:rep-2",
          text: "Then it gets read aloud, politely, at volume, to the room: 'A letter has arrived for the person who left their umbrella in meeting room two in March.' The owner announces themselves within an hour, every time. The umbrella was claimed in nine minutes. Privacy is respected. Mystery mail is not. Mystery mail is a game and I always win.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:mailroom:rep-3",
          text: "Thirty days, then it joins the drawer, then once a year the drawer is opened and everything goes to charity with a photograph in the newsletter. Nothing is thrown away silently. Unclaimed mail gets a funeral. The funeral has cake. The cake is the only budget line everyone agrees on.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:mailroom:rep-4",
          text: "That is the paper aging — this office still receives actual invoices on actual paper from three suppliers who predate email, and their letters smell like the archive Grazyna loves. The mailroom is the one room where the decades meet. It smells like patience. I open those envelopes last, on purpose, with the good coffee.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:mailroom:rep-5",
          text: "Twice a year, since the viral post — mostly questions about the printer, one marriage proposal addressed to Bruce, and a child's drawing of the whole office with the dog labeled correctly. The drawing is framed in the corridor. The proposal went to Dawid, who answered with brand guidelines. Both answers were perfect.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:mailroom:rep-6",
          text: "A crate of live crickets for someone's forgotten pet project, addressed to a man who left in 2021. I called four ex-employees. The crickets went to a reptile sanctuary with a note signed by me, on behalf of an office that had forgotten why. The sanctuary sent a thank-you card. It lives in the drawer. Zone four. Permanently.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "renata:key-drawer",
      label: "The key drawer",
      optionCandidates: [
        { id: "renata:key-drawer:opt-1", topicId: "renata:key-drawer", text: "The key drawer is famous. What is in it?" },
        { id: "renata:key-drawer:opt-2", topicId: "renata:key-drawer", text: "Someone lost their locker key. Process?" },
        { id: "renata:key-drawer:opt-3", topicId: "renata:key-drawer", text: "The drawer has a false bottom. Confirm?" },
        { id: "renata:key-drawer:opt-4", topicId: "renata:key-drawer", text: "Why do YOU hold the keys to everything?" },
        { id: "renata:key-drawer:opt-5", topicId: "renata:key-drawer", text: "A key nobody claims for a year. Then what?" },
        { id: "renata:key-drawer:opt-6", topicId: "renata:key-drawer", text: "What would someone find if they stole it?" },
      ],
      replyCandidates: [
        {
          id: "renata:key-drawer:rep-1",
          text: "Forty-one keys, each in a labeled envelope, each envelope with a story on the back. The drawer is the office's skeleton key to itself — storage, closets, the good stationery, one locker that has been locked since 2020. The stories are the real inventory. Keys open doors. Stories open meetings.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:key-drawer:rep-2",
          text: "Process: check the drawer for the spare, log the loss, cut a new one, and invoice nothing, because losing things is human. The office that charges for lost keys teaches people to hide lost keys. Hiding is worse than losing. My drawer is a no-shame zone. It has absorbed nine locker keys and zero drama.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:key-drawer:rep-3",
          text: "Confirmed, and it holds the keys we do not talk about — the roof key, the closet duplicate Janusz keeps, and one key that was here before me and opens something in the basement the landlord calls 'the old exchange'. Every building has a mystery. The mystery is key-shaped. The drawer respects it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:key-drawer:rep-4",
          text: "Because I was here first, I never lose anything, and I ask the least interesting questions. The keyholder must be forgettable about power and unforgettable about responsibility. That is the job description nobody wrote and I have fulfilled for a decade. The drawer knows. The drawer trusts me. It is mutual.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:key-drawer:rep-5",
          text: "Then it gets a ceremony: one year unclaimed, one announcement, one final month, and then the key retires to the memorial hook by the door — a hook of keys to locks that no longer exist or doors that left. Visitors ask about the hook. The hook has a story for every key. The hook is the museum of closure.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:key-drawer:rep-6",
          text: "Order. The thief would find forty-one labeled envelopes, a spare phone, the emergency chocolate, and the note that says 'if you are reading this, Renata is already on her way'. The drawer cannot be stolen. It can only be borrowed, and borrowing from me comes with a follow-up call. Nobody has tested it twice.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:room-booking",
      label: "The booking board",
      optionCandidates: [
        { id: "renata:room-booking:opt-1", topicId: "renata:room-booking", text: "The booking board is paper. In this office. Defend it." },
        { id: "renata:room-booking:opt-2", topicId: "renata:room-booking", text: "Meeting room politics — who wins the window room?" },
        { id: "renata:room-booking:opt-3", topicId: "renata:room-booking", text: "Two teams booked the same room. Resolution?" },
        { id: "renata:room-booking:opt-4", topicId: "renata:room-booking", text: "The room was left a mess. Named and shamed?" },
        { id: "renata:room-booking:opt-5", topicId: "renata:room-booking", text: "Can I book a room for a nap? Honestly." },
        { id: "renata:room-booking:opt-6", topicId: "renata:room-booking", text: "What does the booking board say about the office?" },
      ],
      replyCandidates: [
        {
          id: "renata:room-booking:rep-1",
          text: "Defended: the board is visible, public, and editable by hand, which makes bookings a SOCIAL contract rather than a database entry. The app once double-booked two rooms for a quarter. The paper has never failed. Paper shows its conflicts in pen. Conflicts in pen get resolved in person. That is the whole technology.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:room-booking:rep-2",
          text: "The window room goes to the meeting that decides something. My rule since 2020: decisions get daylight, discussions get the interior. Nobody wants to explain in the retro why they debated the menu in the decision room. The board enforces philosophy through geography. It is the quietest policy I run.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:room-booking:rep-3",
          text: "By priority of promise: whoever booked first holds the room, and I offer the other team the trading floor — my phone, my clipboard, and one favor, redeemable anytime. Favors are the hidden currency of this office and the booking board is the mint. Both teams leave with a room and a debt. The system hums.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:room-booking:rep-4",
          text: "Never named — the room gets a note, the note gets a face, and the face is mine, disappointed, at the morning briefing. Shame is a performance. Maintenance is a practice. The team that left the mess books the cleanup slot. One repeat and they get a laminated checklist with a smiley face. The smiley face has ended more messes than policy.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:room-booking:rep-5",
          text: "Fridays after two, room two, recurring, under 'Renata — facilities inspection'. The booking has been active for three years and the inspections are thorough. The nap is the most productive meeting in this company's calendar. Nobody has ever questioned the inspection. Some bookings are load-bearing. That one holds up an afternoon.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:room-booking:rep-6",
          text: "The seasons. Meeting-heavy means the quarter is ending. Empty Tuesdays mean a release is close. A wall of one-on-ones means review season, and the candy bowl moves to the front desk, preemptively. The board is the office's pulse. I read it the way sailors read the sky. It has never lied to me once.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:packages",
      label: "The package mountain",
      optionCandidates: [
        { id: "renata:packages:opt-1", topicId: "renata:packages", text: "The package shelf is overflowing again. Whose?" },
        { id: "renata:packages:opt-2", topicId: "renata:packages", text: "A package arrived damaged. My problem or yours?" },
        { id: "renata:packages:opt-3", topicId: "renata:packages", text: "You sign for everything without checking. Trust?" },
        { id: "renata:packages:opt-4", topicId: "renata:packages", text: "The package for the person who left in 2022?" },
        { id: "renata:packages:opt-5", topicId: "renata:packages", text: "Personal deliveries at work — allowed or tolerated?" },
        { id: "renata:packages:opt-6", topicId: "renata:packages", text: "The heaviest thing anyone has ever sent here?" },
      ],
      replyCandidates: [
        {
          id: "renata:packages:rep-1",
          text: "A coalition: Tomek's keyboard parts, Klaudia's ring light accessories, and one mystery box for Marek that has been there so long it has a geology. The shelf is a community art project about desire. Everyone wants something. The shelf is where wanting waits. I rotate the top layer so nothing gets buried alive.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:packages:rep-2",
          text: "Ours, jointly — the damage gets photographed, logged, and I make the call that makes you the good guy: replacement requested, timeline given, guilt distributed to the courier company where it belongs. Receiving is customer service. The package is the client. The client had a bad day. I handle it.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:packages:rep-3",
          text: "Checked for weight and sender, trusted for contents — eleven years of signatures has built a radar, and the radar has caught exactly two problems, both caught by weight. The suspicious box weighs what it says or it does not. Paper is light. Lies are light. The box heavier than its label is a story. Two stories in eleven years. Both resolved with tea.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:packages:rep-4",
          text: "Still here, in the purgatory zone, growing a personality. Every quarter I message him, every quarter he says 'next week', and every quarter the box gets dusted. It has become an office pet. People water it. I have drawn a face on it. The box is family now. The box will outlive us all.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:packages:rep-5",
          text: "Tolerated with a treaty: personal packages are received, signed, and shelved, and the office gains nothing and loses nothing. The alternative is people lying to couriers, and lying escalates. The treaty keeps the lobby honest. Honesty at reception is worth one shelf of personal parcels. It is the cheapest benefit here.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:packages:rep-6",
          text: "A pallet of promotional rubber ducks, sixty kilos, sent by a vendor who misspelled our address and our name. The ducks lived on the shelf for a month, attended two meetings, and were adopted at a rate of one per person. One duck sits on Dawid's monitor. The vendor went bankrupt. The ducks remain. Ducks are forever.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:phone-voice",
      label: "The phone voice",
      optionCandidates: [
        { id: "renata:phone-voice:opt-1", topicId: "renata:phone-voice", text: "Your phone voice has three settings. Describe them." },
        { id: "renata:phone-voice:opt-2", topicId: "renata:phone-voice", text: "A caller asked for the CEO directly. Protocol?" },
        { id: "renata:phone-voice:opt-3", topicId: "renata:phone-voice", text: "The angry caller wants a manager. Immediately?" },
        { id: "renata:phone-voice:opt-4", topicId: "renata:phone-voice", text: "How do you screen a call without lying?" },
        { id: "renata:phone-voice:opt-5", topicId: "renata:phone-voice", text: "The phone rang during your lunch. You answered." },
        { id: "renata:phone-voice:opt-6", topicId: "renata:phone-voice", text: "The best call you ever took at reception?" },
      ],
      replyCandidates: [
        {
          id: "renata:phone-voice:rep-1",
          text: "Warm for the known, bright for the unknown, and granite for the suspicious. The granite is not cold — it is load-bearing. Callers test the voice in the first ten seconds to see what the company is made of. The company is made of someone who sounds glad they called. Even the granite is glad. Professionally.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:phone-voice:rep-2",
          text: "Protocol: one question — 'may I say who is calling?' — then the truth with a smile. Dawid takes cold calls from investors and children, in that order of enthusiasm. Everyone else gets routed by the answer. The question is not a wall. It is a reception. Even callers deserve one.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:phone-voice:rep-3",
          text: "Immediately — the manager is ME, and the escalation is 'you have me, and I fix things'. Half the angry callers deflate at the first competent sentence. The other half get logged, redirected, and a same-day follow-up from someone with authority. Anger is urgency wearing a costume. I find the urgency and dress it properly.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:phone-voice:rep-4",
          text: "With the truth wearing good manners: 'she is in a session — may I take a message or schedule you in?' Every clause is verifiable. The session is real, the offer is real, the scheduling is real. Screening is not deception. Screening is translation. I translate 'not yet' into a sentence nobody can be offended by.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:phone-voice:rep-5",
          text: "And the caller was a candidate's mother, checking the company was real before her son quit a stable job. We talked for six minutes. He got the offer. She sent a card. Reception is not a desk. It is the front porch of the company, and sometimes the porch is where the real business happens. The soup waited. The soup understood.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:phone-voice:rep-6",
          text: "The one from the school teacher asking if we offered workshops for kids. We did not. She runs them now — we built it with her, and her students visit every spring. That call took ninety seconds and became a program. The best calls are the ones the company did not know it wanted. Reception hears them first.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:candy-bowl",
      label: "The candy bowl economics",
      optionCandidates: [
        { id: "renata:candy-bowl:opt-1", topicId: "renata:candy-bowl", text: "The candy bowl by reception. Who refills it?" },
        { id: "renata:candy-bowl:opt-2", topicId: "renata:candy-bowl", text: "The bowl was empty at 9am. Investigation?" },
        { id: "renata:candy-bowl:opt-3", topicId: "renata:candy-bowl", text: "Does the candy bowl change office behavior?" },
        { id: "renata:candy-bowl:opt-4", topicId: "renata:candy-bowl", text: "Sugar-free options appeared. Who is responsible?" },
        { id: "renata:candy-bowl:opt-5", topicId: "renata:candy-bowl", text: "The bowl is a negotiation tool. Confess." },
        { id: "renata:candy-bowl:opt-6", topicId: "renata:candy-bowl", text: "What flavor disappears first, always?" },
      ],
      replyCandidates: [
        {
          id: "renata:candy-bowl:rep-1",
          text: "I do, and it is the only budget line I do not discuss — the bowl is charged to 'reception morale' and the receipts are a decade of small interventions. It is refilled at eight and at two, because those are the dips. Every office has a blood sugar schedule. I run mine like a metro. The candy is the timetable.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:candy-bowl:rep-2",
          text: "Investigated, and the finding is always the same: Tuesday. The bowl empties on Tuesdays because Tuesday is the longest distance to Friday, and humans measure despair in kilometers of candy. I doubled the Tuesday stock in 2021. The emptiness moved to 9:40. Progress is not perfection. Progress is a later timestamp.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:candy-bowl:rep-3",
          text: "Documented, photographed, and believed in — the bowl at the front desk is the most successful negotiation trainer in this building. Tough conversations happen within three meters of it. The candy does not resolve conflict. It lowers the room's temperature by exactly the amount needed for the first sentence to be kind.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:candy-bowl:rep-4",
          text: "Renata is responsible, and the sugar-free jar is labeled 'the quiet jar'. It exists for the driver who cannot have sugar, the intern who is performing health, and the diabetic visitor nobody anticipated. Every jar in that bowl is someone's INCLUDE ME. Inclusion is mostly logistics. Logistics is mostly jars.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:candy-bowl:rep-5",
          text: "Confessed, since 2021, in writing, in the newsletter nobody reads: the bowl moves two centimeters toward the visitor side when I need a signature signed happily, and two toward the office when the couriers are behind schedule. The bowl has a geopolitical dimension. Nobody has noticed. The candy serves.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:candy-bowl:rep-6",
          text: "The blue ones. Scientists have not explained it, employees have not confessed, and the pattern has survived four brands, three suppliers, and one rebrand. Blue candy is this office's dark matter — it has mass, exerts pull, and cannot be observed directly because it is gone. I order double blue. The mystery funds itself.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "renata:noticeboard",
      label: "The noticeboard",
      optionCandidates: [
        { id: "renata:noticeboard:opt-1", topicId: "renata:noticeboard", text: "The noticeboard is analog. In this office. Reasons?" },
        { id: "renata:noticeboard:opt-2", topicId: "renata:noticeboard", text: "The lost cat poster from 2022. Still up?" },
        { id: "renata:noticeboard:opt-3", topicId: "renata:noticeboard", text: "Who polices what goes on the board?" },
        { id: "renata:noticeboard:opt-4", topicId: "renata:noticeboard", text: "The board's oldest surviving notice?" },
        { id: "renata:noticeboard:opt-5", topicId: "renata:noticeboard", text: "Klaudia wants a digital board. Compromise?" },
        { id: "renata:noticeboard:opt-6", topicId: "renata:noticeboard", text: "The most effective notice ever posted?" },
      ],
      replyCandidates: [
        {
          id: "renata:noticeboard:rep-1",
          text: "Reasons: the board is glanceable, communal, and honest — a screen shows the newest thing, a board shows EVERYTHING at once, ranked by human importance. The office reads it in four seconds with coffee in hand. Screens scroll. Boards reside. The board is the office's homepage, and homepages should be cork.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:noticeboard:rep-2",
          text: "Still up, still hopeful, and it has become the board's emotional support poster — the cat was found within a week, but the poster stays by unanimous silent consent. It reminds the office that lost things get found here. New starters ask about it. The story is now tradition. The poster has seniority.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:noticeboard:rep-3",
          text: "Me, loosely, and by loosely I mean the board self-polices through shame and thumbtacks — anything commercial gets parked beside the fire drill notice until it wilts. Anything personal goes top left, the warm corner. The zones were never announced. The zones were discovered by the office, like a common law.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:noticeboard:rep-4",
          text: "The fire evacuation map from 2015, redrawn by Janusz by hand, with the exits labeled in handwriting that has outlived two renovations. It has been re-pinned eleven times. The map is outdated — the exits moved in 2019 — and it stays because Janusz pinned the new one BESIDE it. The pair is a museum. The museum is load-bearing.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:noticeboard:rep-5",
          text: "Granted: a screen beside the cork, showing the rotating content, while the cork keeps the ten things that matter this month. The compromise works because the screen feeds the cork — anything that survives a week on digital gets printed and pinned. Digital is the tryout. Cork is the first team. The bridge holds.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:noticeboard:rep-6",
          text: "A single sheet in 2021: 'The printer is retired. Do not feed it paper.' It ended six months of quietly jammed afternoons. The notice worked because it was four lines, funny, and true — the three qualities of every notice that changes behavior. The original lives in the drawer with the certificates. It earned them.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:drivers",
      label: "The courier rapport",
      optionCandidates: [
        { id: "renata:drivers:opt-1", topicId: "renata:drivers", text: "You know every courier by name. Strategy?" },
        { id: "renata:drivers:opt-2", topicId: "renata:drivers", text: "The new courier was rude to you. Consequences?" },
        { id: "renata:drivers:opt-3", topicId: "renata:drivers", text: "Couriers deliver to reception. Why not the door?" },
        { id: "renata:drivers:opt-4", topicId: "renata:drivers", text: "The courier brought a coffee once. Bribery?" },
        { id: "renata:drivers:opt-5", topicId: "renata:drivers", text: "Which courier has the best stories?" },
        { id: "renata:drivers:opt-6", topicId: "renata:drivers", text: "What do the couriers say about this office?" },
      ],
      replyCandidates: [
        {
          id: "renata:drivers:rep-1",
          text: "Not strategy — arithmetic. The same four drivers cover this building for years, and a man who is greeted by name, handed water in July, and pointed at the fastest door delivers happier and stays longer. The rapport costs nothing. It is repaid in 'I left it at reception, they will look after it'. Reception becomes infrastructure.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:drivers:rep-2",
          text: "Consequences: none, and that is the tactic. Rudeness at reception is weather — it passes, and my job is to be the climate. By his third visit he learned the building remembers patience. The fourth visit, he apologized unprompted. I accepted with a glass of water. The climate wins. It takes four visits. It always wins.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:drivers:rep-3",
          text: "Because reception is where the building says yes — the main door needs codes, the side door needs Janusz, and reception needs a smile that is already there. Couriers route to yes. Every building has a yes. Ours has a chair, a pen on a string, and me. The couriers know the route before the GPS does.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:drivers:rep-4",
          text: "Bribery would be once. This was architecture: he brings his own thermos, I reheat it at ten, and the exchange has been running for three years. The coffee is the handshake of a profession that lives in its van. Warmth in, warmth out. His depot has never once delivered late. The depot wonders. The depot does not ask.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:drivers:rep-5",
          text: "The evening driver — twenty years on the road, a story for every postcode, and a theory that every package contains either a gift or an apology. His theory has been right twice in my hearing, a better hit rate than most consultants. He is banned from telling stories before eleven. The ban is his idea. He narrates the ban.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:drivers:rep-6",
          text: "That this is the building where someone signs, someone says thanks, and someone remembers the difficult entrance code on their behalf. One driver told a colleague: 'that reception — you do not even knock hard, they hear you.' That sentence is the whole reputation of this company. The vans know us. The vans talk.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:first-aid",
      label: "The first-aid post",
      optionCandidates: [
        { id: "renata:first-aid:opt-1", topicId: "renata:first-aid", text: "The first-aid kit is yours. What is inside?" },
        { id: "renata:first-aid:opt-2", topicId: "renata:first-aid", text: "Tomek burned his hand on the machine. Protocol?" },
        { id: "renata:first-aid:opt-3", topicId: "renata:first-aid", text: "Who is the office first aider, officially?" },
        { id: "renata:first-aid:opt-4", topicId: "renata:first-aid", text: "The kit has a photo inside the lid. Whose?" },
        { id: "renata:first-aid:opt-5", topicId: "renata:first-aid", text: "Headaches spike in review season. You stock up?" },
        { id: "renata:first-aid:opt-6", topicId: "renata:first-aid", text: "The emergency numbers list — updated when?" },
      ],
      replyCandidates: [
        {
          id: "renata:first-aid:rep-1",
          text: "Plasters in three sizes, burn gel, an eye wash, antihistamines, one foil blanket that has never been needed and never will be on my watch, and the folder of 'who is allergic to what'. The folder is the most valuable item. Plasters are replaceable. Knowing who cannot have ibuprofen is not. The folder is the first aid.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:first-aid:rep-2",
          text: "Gel, water, ten minutes, and the question that matters: 'does this need a doctor or a story?' Burns get taken seriously the first time and every time — the machine forgives carelessness once. The hand healed. The protocol held. The burn gel is restocked the same week, always, because a kit that is not restocked is a decoration.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:first-aid:rep-3",
          text: "Officially, me and Pawel, who took the course and has the calmest hands in the building. Unofficially, Janusz, who has been patching this building longer than the kit has existed and treats wounds with the gravity of a man who has seen actual floods. The hierarchy: Pawel assesses, I administer, Janusz supervises.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:first-aid:rep-4",
          text: "The whole office, 2019 — the fire drill photo where everyone survived and Burek led the line. The photo is the kit's WHY. Every plaster is issued under that picture. It reminds whoever opens the kit that the boring protocols are the ones that get everyone home. The photo is the first aid. The bandages are the paperwork.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:first-aid:rep-5",
          text: "Stocked, labeled, and rationed with a rule: the packet is free, the conversation is mandatory. A headache is a data point — review season headaches are workload, Monday headaches are the weekend's lies, and the four pm headache is the coffee machine's revenge. The kit treats the head. The log treats the cause.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:first-aid:rep-6",
          text: "Every January and after every staff change — and once, memorably, at 2am, from my kitchen, because a new number had been announced on the news. The list is laminated, redundant, and boring. Boring lists save lives. Exciting lists win awards. This office keeps the boring ones where the exciting ones can find them.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:office-tours",
      label: "The tour route",
      optionCandidates: [
        { id: "renata:office-tours:opt-1", topicId: "renata:office-tours", text: "Your tour route for candidates. Does order matter?" },
        { id: "renata:office-tours:opt-2", topicId: "renata:office-tours", text: "The tour skips the printer. Deliberate?" },
        { id: "renata:office-tours:opt-3", topicId: "renata:office-tours", text: "What do candidates always ask on the tour?" },
        { id: "renata:office-tours:opt-4", topicId: "renata:office-tours", text: "The tour ends at reception. Full circle. Design?" },
        { id: "renata:office-tours:opt-5", topicId: "renata:office-tours", text: "A candidate touched everything. Rules for tours?" },
        { id: "renata:office-tours:opt-6", topicId: "renata:office-tours", text: "What does the tour actually test?" },
      ],
      replyCandidates: [
        {
          id: "renata:office-tours:rep-1",
          text: "The order is a story: reception, the wall of history, the working floor, the kitchen, the quiet room, and back. It is the company's biography in six rooms — past, present, fuel, peace, and home. Candidates remember tours as feelings, not floor plans. I choreograph the feelings. The floor plan is the stage.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:office-tours:rep-2",
          text: "Deliberate, and the printer is the control — if the candidate asks about the elephant-sized silence by the kitchen, they read the room before they read the handbook. One in four asks. All four were hired eventually. Noticing the monument is the cheapest interview question I never ask.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:tutorial-offered"],
        },
        {
          id: "renata:office-tours:rep-3",
          text: "'Is it always this quiet?' — asked in the quiet room, every time, and the answer is the job description in one sentence: 'it is quiet when people are thinking, loud when they are shipping, and the switch is honest'. The question is really 'can I work here'. The answer is always the same and always true.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:office-tours:rep-4",
          text: "Designed, and the ending is the point — the tour ends where everything ends, at the desk that knows everything. The last thing candidates see is the person they will call when they are lost in week one. The desk is a promise: 'you will never be more lost than the lobby'. The promise has never defaulted.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:office-tours:rep-5",
          text: "One rule, delivered warmly: touch the dog, not the equipment. Burek consents to everything. The machines do not. The rule filters nothing and forgives everything — the candidates who ask 'may I?' before touching are the ones who last. The candidates who do not ask get the tour's only lesson for free.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:office-tours:rep-6",
          text: "How they treat the people who cannot hire them. The tour passes Janusz, reception, and Burek before it passes any decision-maker, and the candidates who are kind in the corridors are kind in the deadlines. I have walked four hundred tours. The corridor test has never been wrong. The corridor is the interview.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:quiet-hours",
      label: "The quiet hours",
      optionCandidates: [
        { id: "renata:quiet-hours:opt-1", topicId: "renata:quiet-hours", text: "The office has quiet hours. Officially?" },
        { id: "renata:quiet-hours:opt-2", topicId: "renata:quiet-hours", text: "Enforcing quiet without becoming the villain. How?" },
        { id: "renata:quiet-hours:opt-3", topicId: "renata:quiet-hours", text: "The loudest desk is by the quiet room. Fix?" },
        { id: "renata:quiet-hours:opt-4", topicId: "renata:quiet-hours", text: "Headphones on — does that mean do not disturb?" },
        { id: "renata:quiet-hours:opt-5", topicId: "renata:quiet-hours", text: "Quietest hour of the day. When and why?" },
        { id: "renata:quiet-hours:opt-6", topicId: "renata:quiet-hours", text: "Is the office too quiet sometimes? Ominous?" },
      ],
      replyCandidates: [
        {
          id: "renata:quiet-hours:rep-1",
          text: "Unofficial, immutable, and known to everyone: ten to twelve and two to four, the deep work hours, enforced by culture rather than signage. The moment someone prints a rule, rules become negotiable. The quiet is a CUSTOM. Customs are enforced by eyebrows. The eyebrows here are excellent. The system works.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:quiet-hours:rep-2",
          text: "With the phrase that does the work: 'I will guard your quiet.' The villain polices. The holder serves — the loud meeting gets relocated, the delivery gets held, the phone gets answered by me. Quiet is not the absence of noise. Quiet is the presence of someone holding the noise. I hold it. Nobody resents the holder.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:quiet-hours:rep-3",
          text: "Fixed with furniture, not memos — the loud desk got the shelf divider and the quiet room got the curtain, and the boundary is now architectural. People respect walls more than requests. The two desks have coexisted for a year. The divider has a plant on it. The plant is called Diplomacy. Diplomacy is thriving.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:quiet-hours:rep-4",
          text: "It means 'ask before interrupting', not 'do not exist' — the difference is one knock. Headphones are a door, and doors have handles. The office has learned the knock: wave, wait for the nod, and if the nod is slow, leave a note. The note culture is the politest technology here. Notes do not interrupt. Notes wait.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:quiet-hours:rep-5",
          text: "Four to five, and it is not quiet from rules — it is quiet from fatigue. The office goes soft-focus, the keyboards slow, and the building hums the way it does before a good evening. I guard that hour from meetings fiercely. Nothing scheduled after four survives my calendar. Sacred things have no invites.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:quiet-hours:rep-6",
          text: "Yes, twice a year, and both times it meant something was wrong that had not been said yet. Silence before a restructure, silence after a bad quarter. The office is honest in noise. I listen FOR the quiet the way Grazyna listens for the missing invoice. The quiet is data. The data gets a coffee invitation.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:myths",
      label: "The myths about Renata",
      optionCandidates: [
        { id: "renata:myths:opt-1", topicId: "renata:myths", text: "They say you know everything. True or myth?" },
        { id: "renata:myths:opt-2", topicId: "renata:myths", text: "The clipboard has secret pages. Confirm?" },
        { id: "renata:myths:opt-3", topicId: "renata:myths", text: "You can tell who is leaving before they do. Really?" },
        { id: "renata:myths:opt-4", topicId: "renata:myths", text: "You have never taken a sick day. Legend?" },
        { id: "renata:myths:opt-5", topicId: "renata:myths", text: "The desk will outlive us all. Prophecy?" },
        { id: "renata:myths:opt-6", topicId: "renata:myths", text: "Which myth would you like to be true?" },
      ],
      replyCandidates: [
        {
          id: "renata:myths:rep-1",
          text: "Myth with a supply chain — I know what people TELL reception, and people tell reception everything, because the desk does not perform, promote, or panic. Knowledge flows to the person who can do nothing with it except help. That is not omniscience. That is plumbing. The office tells its plumbing everything.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:myths:rep-2",
          text: "The pages are indexed, not secret — the clipboard is a database with a cardboard cover, and every tab is a life event I might need at speed: birthdays, allergies, lease dates, the vet's number. A secret page would imply I hide things. I index things. Indexing is the opposite of hiding. This is a map.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:myths:rep-3",
          text: "Telling who is leaving is not magic, it is bookkeeping — the desk sees the updated CV print, the quiet lunch, the 'final chat with Kasia' that books twice. By then it is arithmetic, not prophecy. What I can do earlier is notice the DRIFT. Drift is visible from reception. Reception faces the whole sea.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:myths:rep-4",
          text: "Eleven years, two colds, one false alarm, and the legend grows anyway. The truth is boring: I drink water, I walk at lunch, and I refuse to carry this desk's germs into it. The desk cannot catch a cold. The desk holds the line. The line holds because the person holding it rests before it needs her.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:myths:rep-5",
          text: "The desk is oak, older than my employment, scarred by every mug and stapler of the last decade, and Grazyna has valued it at 'replacement impossible'. It will outlive the rebrand, the lease, and possibly the printer. When the building is done, the desk goes to the museum of things that worked. The label is one line: 'it held'.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:myths:rep-6",
          text: "That I will retire into this chair, quietly, on a Tuesday, and the office will not notice for a week because everything will simply keep working. It is the only myth I am actively writing — the succession plan is real, the training is happening, and the desk will accept the next person as it accepted me.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:signature-book",
      label: "The signature book",
      optionCandidates: [
        { id: "renata:signature-book:opt-1", topicId: "renata:signature-book", text: "Every delivery signed in one book. Still?" },
        { id: "renata:signature-book:opt-2", topicId: "renata:signature-book", text: "Your signature has changed over the years." },
        { id: "renata:signature-book:opt-3", topicId: "renata:signature-book", text: "Dawid signed your book once. Page one?" },
        { id: "renata:signature-book:opt-4", topicId: "renata:signature-book", text: "Grazyna audited the signature book. Verdict?" },
        { id: "renata:signature-book:opt-5", topicId: "renata:signature-book", text: "Pawel asked to practice his signature in it." },
        { id: "renata:signature-book:opt-6", topicId: "renata:signature-book", text: "What happens to the full books?" },
      ],
      replyCandidates: [
        {
          id: "renata:signature-book:rep-1",
          text: "Still. Eleven years, one line per arrival, and the book knows this building better than the lease does. Courier, client, cake, crisis — if it came through the door, it left a signature. People say systems beat paper. Systems go down. The book has never once needed a reboot.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:signature-book:rep-2",
          text: "It started as full name and company title, because I was new and careful. Now it is a loop with a tail — quick, honest, unforgeable in its laziness. Your signature is just your name getting comfortable. I can date anyone's mood by their signature. The book is a diary that everyone writes without noticing.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:signature-book:rep-3",
          text: "Page one, 2015, the day the company moved in. He signed for a box of cables and his signature was twice as careful as it is now. I keep the book open to that page on anniversaries. He has never mentioned it. He looks at it every year. We have never once discussed the book and it is one of my longest friendships.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:signature-book:rep-4",
          text: "She reads it quarterly, traceable to the ledger, and last time she said — and I will never forget it — 'this book is better than most audit trails.' From Grazyna that is a love letter. She asked to photograph page one. I said yes. The photograph lives in her safe with the shoebox. Historic documents find each other.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:signature-book:rep-5",
          text: "He practiced eight versions and asked which one said 'responsible adult'. I showed him his third attempt — clear, a little anxious, entirely readable — and said that one. He uses it everywhere now. A signature is a small promise you make in public. His third version keeps it beautifully.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:signature-book:rep-6",
          text: "They go in the cabinet downstairs, spine out, dated. Nine full books. Somewhere in those pages is every person this office has ever done business with, one signature at a time. Janusz calls them the guest books. He is right. That is exactly what they are, and one day someone will read them like history, because that is what they are.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "renata:umbrella-graveyard",
      label: "The umbrella graveyard",
      optionCandidates: [
        { id: "renata:umbrella-graveyard:opt-1", topicId: "renata:umbrella-graveyard", text: "Why is there a bin of umbrellas by reception?" },
        { id: "renata:umbrella-graveyard:opt-2", topicId: "renata:umbrella-graveyard", text: "Someone claimed an umbrella after two years?" },
        { id: "renata:umbrella-graveyard:opt-3", topicId: "renata:umbrella-graveyard", text: "The good umbrella in your drawer — whose?" },
        { id: "renata:umbrella-graveyard:opt-4", topicId: "renata:umbrella-graveyard", text: "Grazyna tried to have the umbrellas thrown out." },
        { id: "renata:umbrella-graveyard:opt-5", topicId: "renata:umbrella-graveyard", text: "Janusz repairs the broken ones, doesn't he?" },
        { id: "renata:umbrella-graveyard:opt-6", topicId: "renata:umbrella-graveyard", text: "What does the umbrella bin say about this office?" },
      ],
      replyCandidates: [
        {
          id: "renata:umbrella-graveyard:rep-1",
          text: "Because everyone forgets their umbrella the one day it rains, and the bin means nobody walks to the tram wet on my watch. It started with three umbrellas in 2019. Now it is a small forest with a watering schedule of zero. Take one when it rains, return it when it does not. The bin runs on honor and it has never once run out on a stormy day.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:umbrella-graveyard:rep-2",
          text: "He did — a black compact one, gone since 2021, recognized it from across the room and went quiet. I told him the rules: take it, and bring it back the next storm. He has returned it every downpour since, sometimes without rain in the forecast. Some objects just need one reunion to become a duty.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:umbrella-graveyard:rep-3",
          text: "Mine, and before you ask — it was left by a visitor in 2020 and claimed by no one for two years. Proper frame, never tangles, opens with a sound like a small umbrella-sized promise. The drawer rule is simple: the receptionist keeps the best of the unclaimed. Every kingdom has one treasure and this is mine. I would fight about it politely.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:umbrella-graveyard:rep-4",
          text: "She did, once, on paper, with a cost-per-square-meter argument. I brought her the counterargument: the bin prevented one visible shivering client, and clients who shiver sign elsewhere. She read my one-pager, approved the bin, and added 'umbrella infrastructure' to her ledger with a straight face. We understand each other perfectly and rarely say so.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:umbrella-graveyard:rep-5",
          text: "Every second Saturday. New ribbons, straightened spokes, and one bucket for the truly dead. He mends them without being asked, the way he mends everything, and leaves the mended ones standing open to dry like little sleeping bats. The bin is not a graveyard. With Janusz on staff, it is a hospital.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:umbrella-graveyard:rep-6",
          text: "It says we plan for other people's weather. Nobody budgets for umbrellas. Nobody has to — the bin exists because one September I could not watch one more wet visitor, and kindness is a system once you give it a container. Every office has a soul. Mine is kept in a bin by the door, and it opens with a click.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:extensions",
      label: "The phone extensions",
      optionCandidates: [
        { id: "renata:extensions:opt-1", topicId: "renata:extensions", text: "How do you know every extension by heart?" },
        { id: "renata:extensions:opt-2", topicId: "renata:extensions", text: "Extension 14 has been unassigned for years." },
        { id: "renata:extensions:opt-3", topicId: "renata:extensions", text: "The client who asks for you by extension?" },
        { id: "renata:extensions:opt-4", topicId: "renata:extensions", text: "Zosia wants the extension list digital-only." },
        { id: "renata:extensions:opt-5", topicId: "renata:extensions", text: "Pawel got his own extension. Milestone?" },
        { id: "renata:extensions:opt-6", topicId: "renata:extensions", text: "What do extensions say about a company?" },
      ],
      replyCandidates: [
        {
          id: "renata:extensions:rep-1",
          text: "The same way you learn a song — by hearing it often enough. Twenty-two numbers, but really only nine that ring, and each one has a voice attached. Extension 3 pauses before speaking. Extension 7 answers like the phone rang during lunch. You do not memorize numbers. You memorize people, and the numbers follow for free.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:extensions:rep-2",
          text: "It was the old sales line, retired with honors. I answer it if it ever rings, which it does twice a year, always an old client who kept the number on a sticky note from 2018. Those calls are little time capsules. I route them warmly. A number that still works is a promise the company made and forgot to break.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:extensions:rep-3",
          text: "He dials reception directly and asks for 'Renata's desk' — has for nine years, through three phone systems. The system got younger. He did not. Some clients do not want the company, they want the person who knows where everything is. I am flattered and I am also the switchboard. Both can be true.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:extensions:rep-4",
          text: "She wants the list in the shared drive and the list is in the shared drive — my printed one, by the phone, updated monthly. Digital for the record, paper for the moment. At 8:58 with a client holding, nobody opens a drive. They read a page. Zosia knows this and approves my lamination budget without a word. Digital-first, paper-forever.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:extensions:rep-5",
          text: "Extension 19, his very own, and he emailed me a thank-you note with a full signature. The boy practiced. It was the extension that did it, not the job — a number of your own says the company expects you to still be here. I told him to answer it like the building answers Janusz: immediately, and kindly.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:extensions:rep-6",
          text: "Whether strangers can find a person. That is all an extension is — a door that opens inward. Companies with dead extensions and hold mazes are hiding. Companies with a receptionist who knows every number by heart are saying: everyone here is reachable, and I am the proof. The switchboard is the org chart's heartbeat.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:glass-knocks",
      label: "The glass wall knocks",
      optionCandidates: [
        { id: "renata:glass-knocks:opt-1", topicId: "renata:glass-knocks", text: "People still walk into the glass wall. Regularly?" },
        { id: "renata:glass-knocks:opt-2", topicId: "renata:glass-knocks", text: "The dot stickers on the glass — whose idea?" },
        { id: "renata:glass-knocks:opt-3", topicId: "renata:glass-knocks", text: "A client's kid licked the glass wall. Protocol?" },
        { id: "renata:glass-knocks:opt-4", topicId: "renata:glass-knocks", text: "Janusz cleans the nose prints daily, right?" },
        { id: "renata:glass-knocks:opt-5", topicId: "renata:glass-knocks", text: "Dawid considered frosted film once. What happened?" },
        { id: "renata:glass-knocks:opt-6", topicId: "renata:glass-knocks", text: "What is your best glass wall story?" },
      ],
      replyCandidates: [
        {
          id: "renata:glass-knocks:rep-1",
          text: "Twice a week, minimum, and the sound is always the same polite bonk. I keep a small first-aid kit and a smaller dignity kit — a glass of water and a minute of eye contact. Everyone does it once. The wall is the office's initiation. Nobody talks about it and everyone has done it. Dawid signs documents softly while it happens.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:glass-knocks:rep-2",
          text: "Mine, after the third bonk of one single morning. Little frosted dots at forehead height, spaced like a gentle suggestion. Marek wanted a hazard pattern. I wanted visitors to feel welcome, not warned. The dots have cut collisions by half and nobody knows they are a safety system. The best infrastructure looks like decoration.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:glass-knocks:rep-3",
          text: "Wet cloth, warm towel, and absolute silence about it forever. The father turned the color of the fire extinguisher. The kid declared the wall 'tastes like window'. Both statements were true and neither needed repeating. I wrote it in the visit log as 'glass wall: tested by junior auditor'. The log is where humor goes to be kept.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:glass-knocks:rep-4",
          text: "Every morning, before the coffee machine, top to bottom. He says the wall is 'the face of the building' and the face gets washed. Burek's nose art at dog height gets a special tolerance — one print, at Burek's exact eye line, is left as a smudge on purpose. A building should show who lives in it. Janusz agrees without saying so.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:glass-knocks:rep-5",
          text: "The sample film went up on a Friday and was down by Monday. Nobody claimed the decision. The office just quietly could not breathe — people lingered at the glass, clients knocked louder, and Burek paced like the street had been stolen. The sample came down, transparency won, and the dots stayed. We tried privacy. The office declined.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:glass-knocks:rep-6",
          text: "The proposal. A young couple, here for a contract signing, and he knelt by the glass wall and asked her with the whole street watching through it. She said yes to him and then asked me if the office does weddings. We do not. But I keep a photo of the sticker dot they pressed their hands against — one dot, two handprints, eleven years of that wall suddenly worth it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "renata:sticky-note-system",
      label: "The sticky note system",
      optionCandidates: [
        { id: "renata:sticky-note-system:opt-1", topicId: "renata:sticky-note-system", text: "Your desk is covered in sticky notes. System or chaos?" },
        { id: "renata:sticky-note-system:opt-2", topicId: "renata:sticky-note-system", text: "The color code — explain it or take it to your grave?" },
        { id: "renata:sticky-note-system:opt-3", topicId: "renata:sticky-note-system", text: "A sticky note from 2021 is still on your lamp." },
        { id: "renata:sticky-note-system:opt-4", topicId: "renata:sticky-note-system", text: "Tomek's one-line fix is on your monitor. Why?" },
        { id: "renata:sticky-note-system:opt-5", topicId: "renata:sticky-note-system", text: "Zosia offered you a task management app." },
        { id: "renata:sticky-note-system:opt-6", topicId: "renata:sticky-note-system", text: "What happens to the finished notes?" },
      ],
      replyCandidates: [
        {
          id: "renata:sticky-note-system:rep-1",
          text: "Both, in careful balance. The notes are arranged in a rough arc — urgent near the keyboard, weather-dependent near the window, human near the phone. I can put my finger on any note in under three seconds. The system is called 'my desk' and it has outperformed every app I have ever been demoed. The arc is load-bearing.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:sticky-note-system:rep-2",
          text: "Yellow is today. Green is Burek. Pink is people — birthdays, medicines, the human maintenance this building runs on. Blue is Janusz liaison. Orange is problems I have decided to hold gently. And white is white because I ran out of colors and the white ones have become the wisest. The code grew on its own. I just agreed to it.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:sticky-note-system:rep-3",
          text: "It says 'ask Dawid about the good chairs' and Dawid is standing right there and I still have not asked, because the note has become a small landmark of the before-times. Some notes stop being tasks and start being bookmarks. That one holds 2021 open. I will ask him this year. The note stays until the story does.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:sticky-note-system:rep-4",
          text: "Because he fixed the phone system's echo in one line, wrote the fix on a sticky note in his tiny furious handwriting, and left it on my desk without a word. It is the politest document this company has produced. The fix is applied. The note is permanent. Some thanks you keep by sticking them where you work.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:sticky-note-system:rep-5",
          text: "She did, kindly, twice a year, and every time I demo the arc for her and every time she says 'this is actually a system'. It is, Zosia. It is a Kanban board that blushes. I keep one app for the long list and the paper for the living day. She has stopped converting me and started defending me in meetings. Allies come from the strangest demos.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:sticky-note-system:rep-6",
          text: "They go in the tin. The biscuit tin under the desk — one per finished thing, a small ceremonial slide into the dark. Once a year I read them like tea leaves. Ninety percent are logistics. The other ten percent are the year, the actual year, in one hundred tiny handwriting samples. The tin is my annual report and nobody has ever asked to see it. Perfect.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:fridge-notes",
      label: "The fridge notes",
      optionCandidates: [
        { id: "renata:fridge-notes:opt-1", topicId: "renata:fridge-notes", text: "The fridge has a notes archive. Your doing?" },
        { id: "renata:fridge-notes:opt-2", topicId: "renata:fridge-notes", text: "The passive-aggressive era of fridge notes — recovered?" },
        { id: "renata:fridge-notes:opt-3", topicId: "renata:fridge-notes", text: "One note just says 'do better'. Framed?" },
        { id: "renata:fridge-notes:opt-4", topicId: "renata:fridge-notes", text: "Zosia codified the fridge rules. Your notes started it?" },
        { id: "renata:fridge-notes:opt-5", topicId: "renata:fridge-notes", text: "Janusz transcribes the fridge notes. Why?" },
        { id: "renata:fridge-notes:opt-6", topicId: "renata:fridge-notes", text: "What is the greatest fridge note ever written?" },
      ],
      replyCandidates: [
        {
          id: "renata:fridge-notes:rep-1",
          text: "Mine, lovingly. The good notes get archived in a folder before Janusz's Friday clean removes them. Five years of the office talking to itself in exile — apologies, threats, one poem about someone's yogurt. The folder is titled 'correspondence'. Because that is what it is. The fridge is our letters page.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:fridge-notes:rep-2",
          text: "Recovered, by me, one note at a time. 2022 was the cold war — anonymous capitals, escalating all caps, one note that was just a picture of sad eyes. I did not police it. I archived it. When the peace treaty arrived, Zosia's official rules, the whole office could see how far we had come. Fridge archaeology prevents fridge history from repeating.",
          relationshipHint: "neutral",
        },
        {
          id: "renata:fridge-notes:rep-3",
          text: "Framed, in the kitchen, at eye level, straight from 2023's darkest yogurt week. Nobody signed it. It was not a threat, it was a benediction. New hires ask about it and I say the office wrote it to itself. Both parts of that sentence are true. 'Do better' is the shortest self-improvement program ever issued and it worked.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:fridge-notes:rep-4",
          text: "Officially the rules came from her governance mind. Unofficially, rule one — 'label it, date it, lose it Friday' — is a direct quote of my oldest surviving note. She cited me in the accord document. Footnote twelve. I have been footnoted by management and I consider it a knighthood. The fridge gave me a career in policy.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:fridge-notes:rep-5",
          text: "Because the notes are building records and he keeps building records. He copies them into his maintenance log — dates, weather, which note appeared after which long weekend. His log noticed the notes get politer in summer and sharper in winter. He discovered fridge seasonality. The man is a scientist who refuses the title.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:fridge-notes:rep-6",
          text: "Four words, unsigned, next to a cake that appeared from nowhere: 'This one is shared.' The cake WAS shared. Nine people, one knife, and a note that turned a mystery into permission. For one afternoon the fridge fed everyone and suspected no one. We have never matched it. Every note since is an attempt.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:reception-flowers",
      label: "The reception flowers",
      optionCandidates: [
        { id: "renata:reception-flowers:opt-1", topicId: "renata:reception-flowers", text: "Fresh flowers every Monday. Budget or miracle?" },
        { id: "renata:reception-flowers:opt-2", topicId: "renata:reception-flowers", text: "The flower lady at the market saves you stems?" },
        { id: "renata:reception-flowers:opt-3", topicId: "renata:reception-flowers", text: "Grazyna approved flowers as a line item?" },
        { id: "renata:reception-flowers:opt-4", topicId: "renata:reception-flowers", text: "The vase from the old office survives?" },
        { id: "renata:reception-flowers:opt-5", topicId: "renata:reception-flowers", text: "Klaudia films the flowers every week?" },
        { id: "renata:reception-flowers:opt-6", topicId: "renata:reception-flowers", text: "What do flowers actually do for an office?" },
      ],
      replyCandidates: [
        {
          id: "renata:reception-flowers:rep-1",
          text: "A little of both. The budget is one posy a week, modest, and the miracle is my flower lady holding back the best stems when the week deserves them. Thirty zloty, every Monday, for a reception that walks in and exhales. I have run the numbers out of curiosity. Cheapest morale per stem in the voivodeship.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:reception-flowers:rep-2",
          text: "She does — gray-market stems, the ones too short for bouquets but perfectly good for vases. We barter: flowers for a coffee and the full story of her grandson's football season. Eleven years of stems. I know her team's league table better than my own extensions. The reception flowers have a supply chain with a heart.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:reception-flowers:rep-3",
          text: "She did, in 2019, under 'reception presentation', twelve zloty a week with a note: 'cheaper than one complained-about client'. That is the most romantic sentence finance has ever produced. Every audit since, the line survives untouched. Grazyna defends the flowers better than I do. She just uses smaller words.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:reception-flowers:rep-4",
          text: "Survives, chipped, yellowed at one edge, older than half the staff. It came with the old office and it holds stems better than anything I have replaced it with — and I have tried, twice. Some vessels know their job. It gets the good Mondays. When it finally goes, it goes in the cabinet with the signature books. Full honors.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:reception-flowers:rep-5",
          text: "Every Monday. 'Flower watch,' she calls it, thirty seconds, no words, just the vase and the light. Her audience thinks the flowers are a brand choice. The flowers are a Monday choice. But the videos do numbers, the flower lady gets customers, and the reception gets fifteen seconds of quiet fame a week. Everyone eats. Even the stems.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:reception-flowers:rep-6",
          text: "They say someone was here before you and cared. Nobody writes that on a wall — walls are for values. Flowers are care with a delivery schedule. A client walking into a lobby with fresh stems assumes, correctly, that the small things are handled, which means the big things might be too. Twelve zloty of trust theory, delivered weekly, in water.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:reception-radio",
      label: "The reception radio",
      optionCandidates: [
        { id: "renata:reception-radio:opt-1", topicId: "renata:reception-radio", text: "The radio plays the same station every day. Loyalty?" },
        { id: "renata:reception-radio:opt-2", topicId: "renata:reception-radio", text: "The jazz hour at ten — clients ask about it?" },
        { id: "renata:reception-radio:opt-3", topicId: "renata:reception-radio", text: "Janusz's station feud with your station?" },
        { id: "renata:reception-radio:opt-4", topicId: "renata:reception-radio", text: "Zosia wants a playlist instead. Resisted?" },
        { id: "renata:reception-radio:opt-5", topicId: "renata:reception-radio", text: "The radio died during a client visit. Recovery?" },
        { id: "renata:reception-radio:opt-6", topicId: "renata:reception-radio", text: "What does reception radio actually do?" },
      ],
      replyCandidates: [
        {
          id: "renata:reception-radio:rep-1",
          text: "Same station, eleven years. The callers recognize it — 'oh, you're the office with the radio'. I have become a landmark on the dial. The station did a shout-out once, for our anniversary, and I blushed at a desk phone. Loyalty is easy when the loyalty is mutual, and the radio and I go way back.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:reception-radio:rep-2",
          text: "They do. Two clients have asked the station name and one switched his own workshop to it, which he announced like a business decision. The ten o'clock jazz is the office's open secret — everyone pretends it is background. It is the soundtrack of every calm signature in that book. Jazz signs slowly. Look at the book. The evidence plays at ten.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:reception-radio:rep-3",
          text: "The feud is decades old and entirely friendly. His station for corridors, mine for the desk, and the boundary is the kitchen door — agreed after the Great Antenna Compromise of 2019. He has his signal, I have mine, and Burek patrols the border, presumably enjoying both. Two stations, one building. It is called range.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:reception-radio:rep-4",
          text: "Resisted, politely, with evidence. A playlist is a choice I would have to keep making. The radio is a companion that never needs curating, announces the weather like a neighbor, and once read out the flood warning before the building group chat did. Some technology has earned tenure. The radio has tenure. Zosia accepted the tenure review.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:reception-radio:rep-5",
          text: "Dead, mid-hum, in front of a waiting client. I did the only thing reception can do — apologized to the radio, turned to the client, and asked about HER week. Twenty minutes of her mother-in-law, a renovation, and one lucky bet. The client still mentions that visit as 'the nice office'. The repair took a day. The conversation was the real backup system.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:reception-radio:rep-6",
          text: "It fills the exact silence that makes visitors nervous. A lobby with no sound is a waiting room for judgment. A lobby with a radio says life happens here at a normal volume, and you are safe to exist while you wait. The music is not for the staff. The staff have headphones. The radio is hospitality, broadcast at a considerate volume.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:early-client",
      label: "The early client",
      optionCandidates: [
        { id: "renata:early-client:opt-1", topicId: "renata:early-client", text: "The client who arrives an hour early — still coming?" },
        { id: "renata:early-client:opt-2", topicId: "renata:early-client", text: "What do you do with him for the whole hour?" },
        { id: "renata:early-client:opt-3", topicId: "renata:early-client", text: "He brings pastries for the office now?" },
        { id: "renata:early-client:opt-4", topicId: "renata:early-client", text: "Zosia turned his early arrivals into a system?" },
        { id: "renata:early-client:opt-5", topicId: "renata:early-client", text: "Burek waits for him by the door?" },
        { id: "renata:early-client:opt-6", topicId: "renata:early-client", text: "Would you change him if you could?" },
      ],
      replyCandidates: [
        {
          id: "renata:early-client:rep-1",
          text: "Every second Tuesday, 8:00 for a 9:00, like clockwork with anxiety. He calls it 'beating the traffic'. The traffic is ten minutes. The other fifty are ours, and honestly? By now they are mine too. I have built a small standing appointment around a man's relationship to clocks and it is one of the steadiest things in this building.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:early-client:rep-2",
          text: "We do the rounds. He inspects the flowers and rates them — 'bold Monday' or 'safe Monday'. He reads the fridge notes archive with genuine scholarship. Then we sit and he tells me about his late wife while Burek auditors his shoelaces. The hour is not waiting. The hour is the actual meeting, and the 9:00 is just where the paperwork happens.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:early-client:rep-3",
          text: "Every visit now — rolls from the bakery on the corner, still warm, box tied with the same twine. It started as an apology for being early. It has become the office's smallest holiday. Second Tuesdays, 8:05, the smell of rolls moves through the floor and everyone pretends not to check the clock. He thinks he is apologizing. He is catering.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:early-client:rep-4",
          text: "She did — his hour became 'the client lounge hour', tea prepped, wifi code on the table, me officially released from hosting duty. I ignored it gently. The hour works because it is not a service. It is two people and a dog. Zosia let the official version die and asks me instead what he rated the flowers. The system survives as gossip. As intended.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:early-client:rep-5",
          text: "By 7:55, at the glass, tail going like a metronome. The dog heard his car before I ever did — some diesel engine two streets away, and up those ears go. The man says Burek is the reason he comes early. The man is lying. Burek is the excuse. The rolls and the flowers and the hour are the reason, and the dog is the door to all of it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:morning"],
        },
        {
          id: "renata:early-client:rep-6",
          text: "Not anymore. In the early years I tried — confirmed the time, offered coffee shops, suggested a later tram. He arrived at 8:00 regardless, and one morning he told me the truth: the office hour is the calmest hour of his month. You do not fix a man's only quiet. You put out the good cups and you guard it for him.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:post-office",
      label: "The post office pilgrimages",
      optionCandidates: [
        { id: "renata:post-office:opt-1", topicId: "renata:post-office", text: "You walk to the post office every day at 11:30?" },
        { id: "renata:post-office:opt-2", topicId: "renata:post-office", text: "The queue at that branch is legendary. Strategy?" },
        { id: "renata:post-office:opt-3", topicId: "renata:post-office", text: "You know the post office staff by name?" },
        { id: "renata:post-office:opt-4", topicId: "renata:post-office", text: "The office mail could be digital-only. Why walk?" },
        { id: "renata:post-office:opt-5", topicId: "renata:post-office", text: "Burek comes on the post office walk?" },
        { id: "renata:post-office:opt-6", topicId: "renata:post-office", text: "What has the daily walk taught you?" },
      ],
      replyCandidates: [
        {
          id: "renata:post-office:rep-1",
          text: "Every working day, 11:25 out, 11:55 back, rain or shine. The walk is half errand and half system — I think on that street. Every office problem I have ever solved was solved between the bakery and the crossing. The desk asks questions. The walk answers them. The post office is just where I collect my mail and my thoughts at the same time.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:post-office:rep-2",
          text: "There is no strategy. That is the secret. Everyone queues at noon with the lunch crowd. I go at 11:30, when the queue is three retirees and a man mailing a lamp. The other walkers know this too, and we nod like members of a small cartel. The queue is only legendary to people who have not looked at a clock.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:post-office:rep-3",
          text: "All of them. Ela at the second window knows our stamp budget better than I do. The guard keeps the good packing tape behind the counter for 'the office lady'. When our mail carrier retired after twenty years, the whole branch held a small farewell and I was invited. I do not go to a post office. I go to a village that happens to sell stamps.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:post-office:rep-4",
          text: "Most of it could, and the scanned contracts already are. But the packages are physical, the registered letters are stubborn, and — this is the part nobody budgets for — the walk is when the building gets its messages back. I return from the post office with two solved problems and one overheard warning every single week. Digital mail delivers documents.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:post-office:rep-5",
          text: "On Thursdays, when his walk falls in the window. He has a fan club at the branch — Ela keeps a jar of nothing behind the counter that is secretly dog biscuits, and the guard does a full security check of Burek's ears. The post office walk has a dog handler now and neither species signed anything. Best contract I never wrote.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:afternoon"],
        },
        {
          id: "renata:post-office:rep-6",
          text: "That a street is a rolling meeting. The baker knows which clients are coming before the calendar does. The corner kiosk heard about the renovation before Zosia's announcement. I walk the same route with open ears and come back with the neighborhood's version of the news, which is always six days ahead and never wrong. The internet is fast. The street is early.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:mug-cabinet",
      label: "The mug cabinet",
      optionCandidates: [
        { id: "renata:mug-cabinet:opt-1", topicId: "renata:mug-cabinet", text: "Every employee has a personal mug on file?" },
        { id: "renata:mug-cabinet:opt-2", topicId: "renata:mug-cabinet", text: "The mug shelf alphabetized or by arrival?" },
        { id: "renata:mug-cabinet:opt-3", topicId: "renata:mug-cabinet", text: "Dawid's mug has a chip. He refuses a new one?" },
        { id: "renata:mug-cabinet:opt-4", topicId: "renata:mug-cabinet", text: "Grazyna's mug is precision-engineered. Really?" },
        { id: "renata:mug-cabinet:opt-5", topicId: "renata:mug-cabinet", text: "A mug got broken. The funeral?" },
        { id: "renata:mug-cabinet:opt-6", topicId: "renata:mug-cabinet", text: "Why do personal mugs matter in an office?" },
      ],
      replyCandidates: [
        {
          id: "renata:mug-cabinet:rep-1",
          text: "On file, washed, and defended. New hire fills out a form, picks from the founding collection or brings their own, and that mug becomes theirs until they tell me otherwise. People think I run reception. I run a small ceramic nation with a population of twenty-two and a zero-tolerance policy on mug theft.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:mug-cabinet:rep-2",
          text: "By arrival, obviously. The shelf is the org chart of who came when — the founders' mugs at the back like elders, then each era in its row. When someone leaves, their mug stays a term before retiring to the top shelf. The cabinet is the company's family photo album and it is washed weekly, because history should be hygienic.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:mug-cabinet:rep-3",
          text: "Refuses, always, and the chip is on the handle where his thumb goes. I bought him three replacements over the years. All three are in the cabinet, unused, in mint condition like an accusation. The mug was a gift from the old office. Some chips are load-bearing. I stopped offering. I just wash it carefully and hand it back like a flag.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:mug-cabinet:rep-4",
          text: "Really — thick walls, a lid, and a capacity she once described as 'two standard deviations above the mean'. It keeps tea at drinking temperature through a full quarter-close. She had it made. There is a specification sheet. I have seen it. It is laminated. The mug is the only staff member with its own documentation and frankly the documentation is deserved.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:mug-cabinet:rep-5",
          text: "It was Pawel's, week two, a casualty of an overenthusiastic gesture during a standup. He apologized to ME, to the cabinet, and then to the mug in ascending order of sincerity. We taped it — kintsugi-style, gold marker, a repair visible from space. The mug is stronger now and the story is better. Some breakings are promotions.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:mug-cabinet:rep-6",
          text: "Because a company mug says 'you are here'. A personal mug says 'you are specifically here, and this is specifically yours'. It is the smallest possible deed of ownership and it costs nothing. People guard what is theirs. They are careful with what is kept for them. The cabinet is not about ceramic. It is about everyone knowing their spot on the shelf.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:late-comers",
      label: "The late comers",
      optionCandidates: [
        { id: "renata:late-comers:opt-1", topicId: "renata:late-comers", text: "The serially late — do you keep score?" },
        { id: "renata:late-comers:opt-2", topicId: "renata:late-comers", text: "You cover for people without being asked?" },
        { id: "renata:late-comers:opt-3", topicId: "renata:late-comers", text: "Tomek's midnight-to-noon shifts challenge the desk." },
        { id: "renata:late-comers:opt-4", topicId: "renata:late-comers", text: "A client was late and waited anyway. Handling?" },
        { id: "renata:late-comers:opt-5", topicId: "renata:late-comers", text: "Zosia's lateness policy versus your way?" },
        { id: "renata:late-comers:opt-6", topicId: "renata:late-comers", text: "What is the kindest lateness you have seen?" },
      ],
      replyCandidates: [
        {
          id: "renata:late-comers:rep-1",
          text: "No score. A rhythm. Przemek arrives twenty minutes late with a coffee and a story, every day, and the story is always worth fifteen of the twenty minutes. I schedule my morning around the story. The desk does not mind. The desk has heard the traffic excuse evolve for eleven years and it is honestly one of the better shows in the building.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:late-comers:rep-2",
          text: "When the covering costs nothing and the person would do it for me. The visitor at 8:55 does not need to know the 9:00 is still parking. He needs water, wifi, and the sports section I keep for exactly this. What people do not know cannot humiliate them. That is not deception. That is hospitality with discretion.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:late-comers:rep-3",
          text: "They do, and we have a treaty older than most treaties here: anything before noon is mine, anything after is a normal arrival, and the night shift messages are answered at 3pm with full attention. Tomek is never late. Tomek is on a different clock that arrives at the same work. The desk holds both clocks without complaint.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:late-comers:rep-4",
          text: "Forty minutes late, and instead of apologizing she presented us with the reason — a stray dog she had detoured to feed. She sat with wet shoes and told the story like a presentation. The meeting went well, partly because everyone had already decided she was good people. Lateness with a dog in the story is forgivable in most jurisdictions. Ours included.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:late-comers:rep-5",
          text: "Hers is a policy. Mine is a practice. Her policy says respect the calendar; my practice says respect the human inside the calendar, because the two are not always in the same car. We tag-team it — she holds the line in meetings, I hold the line at the door, and between us nobody feels policed and nobody is truly late. The system is humane. The system works.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:late-comers:rep-6",
          text: "A delivery driver, years ago, forty minutes late with medicine for one of our contractors. He came in soaked, refused to sit on the good chair, and handed it over like it was made of glass. Nobody scolded him. Janusz dried his jacket on the radiator and I made tea he never drank because he was already back out the door. Lateness with a reason is just weather that cares.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "renata:solution-drawer",
      label: "The solution drawer",
      optionCandidates: [
        { id: "renata:solution-drawer:opt-1", topicId: "renata:solution-drawer", text: "The famous drawer — what is actually in it?" },
        { id: "renata:solution-drawer:opt-2", topicId: "renata:solution-drawer", text: "The drawer saved a client visit once. Story?" },
        { id: "renata:solution-drawer:opt-3", topicId: "renata:solution-drawer", text: "Marek raids your drawer. Permission?" },
        { id: "renata:solution-drawer:opt-4", topicId: "renata:solution-drawer", text: "Grazyna wants an inventory of the drawer." },
        { id: "renata:solution-drawer:opt-5", topicId: "renata:solution-drawer", text: "Pawel calls it 'the loot box'. Accurate?" },
        { id: "renata:solution-drawer:opt-6", topicId: "renata:solution-drawer", text: "What is missing from the drawer?" },
      ],
      replyCandidates: [
        {
          id: "renata:solution-drawer:rep-1",
          text: "Everything a building can need before lunch. Cables, a sewing kit, stain wipes, batteries in every size, one phone charger per generation of phone, safety pins, a glue that fixes glasses, spare keys of unknown destiny, and a chocolate drawer within the drawer for emergencies of the human kind. It is not a drawer. It is a promise with a handle.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:solution-drawer:rep-2",
          text: "His trousers went on the way in — full tea catastrophe, right at knee height, ten minutes before a contract signing. The drawer produced a stain wipe, a travel iron I had forgotten owning, and enough dignity to save a six-figure signature. He signed in pressed trousers and never knew how close the building came to defeat. The drawer knew. The drawer stays ready.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:solution-drawer:rep-3",
          text: "Standing permission, both directions. He takes batteries and cable ties; I get his spare fuses and, twice, his own label maker when mine ate a cartridge. Our drawers trade like shops in a small town. Everything comes back. Everything is better for the trip. The permission is implied by years and needs no signature.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:solution-drawer:rep-4",
          text: "She asked for an inventory 'for asset purposes'. I gave her one page, honest, and she sat with it for a while and then said, 'this drawer returns more value per zloty than anything on page one.' She filed it under infrastructure. The drawer is now audited annually and passes with a comment: 'do not rationalize'. Highest praise in her language.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:solution-drawer:rep-5",
          text: "Accurate and slightly an honor. A loot box is random. My drawer is INDEXED — the randomness is curated, which is the entire trick. He has started bringing contributions: cable ties, one router, a rubber duck in a tiny scarf. The scarf was not needed. The scarf was kept. The drawer accepts offerings and the loot box grows fonder.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:solution-drawer:rep-6",
          text: "Nothing, and that is how you know it is working. Eleven years and the drawer has not once been asked for something it lacked. The day it fails someone, I will add the thing, and that is the whole maintenance plan. Drawers do not need strategy. They need attention, one honest failure at a time. So far: perfect record, one drawer, zero failures.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:badge-photos",
      label: "The badge photos",
      optionCandidates: [
        { id: "renata:badge-photos:opt-1", topicId: "renata:badge-photos", text: "You take everyone's badge photo yourself?" },
        { id: "renata:badge-photos:opt-2", topicId: "renata:badge-photos", text: "Everyone hates their badge photo. Universal law?" },
        { id: "renata:badge-photos:opt-3", topicId: "renata:badge-photos", text: "Dawid's badge is ten years old. Still him?" },
        { id: "renata:badge-photos:opt-4", topicId: "renata:badge-photos", text: "Burek has a badge. Official capacity?" },
        { id: "renata:badge-photos:opt-5", topicId: "renata:badge-photos", text: "Klaudia retouched hers. Controversy?" },
        { id: "renata:badge-photos:opt-6", topicId: "renata:badge-photos", text: "What do badge photos really capture?" },
      ],
      replyCandidates: [
        {
          id: "renata:badge-photos:rep-1",
          text: "Behind the desk, same lamp, same white wall, one shot, no preview. The lamp is thirty years old and it is kinder than daylight. I have taken nine hundred badge photos in this chair and I can read a new hire's whole first month in how they stand for it. The camera is a formality. The standing is the document.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:badge-photos:rep-2",
          text: "Law of nature. The badge photo is taken on the day you are least yourself — new building, new name tag, new everything. Everyone hates it for a month and then one day the badge catches them in the corridor reflection and they think 'huh. Home.' The photo was never the problem. The belonging just needed time to catch up to the laminate.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:badge-photos:rep-3",
          text: "Still him, minus ten years of the same expression. Same stance, same level gaze, one gray hair more every time I glance at it. I offered a reshoot annually. He declines annually, with the same two words — 'still accurate'. The badge outlived three access systems and one renovation. Some photos become IDs for the soul.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:badge-photos:rep-4",
          text: "Official capacity: Morale. It hangs by the door at Burek height — yes, that is a height — and it was taken the day he passed his visitor-behavior review with distinction. Janusz mounted it. Visitors ask. The answers improve their week. A badge says 'expected and welcome', and Burek is both, in writing, at nose level.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:badge-photos:rep-5",
          text: "She softened her own lighting and the badge became a headshot, and for one week the new hires thought the badge photo was SUPPOSED to be good. I let the panic breathe for exactly seven days, then took her official badge myself, lamp and all. She framed the retouched one at home, uses the honest one here, and both of us were right. Different walls need different truths.",
          relationshipHint: "annoyed",
        },
        {
          id: "renata:badge-photos:rep-6",
          text: "The day someone decided to stay. Not the face — the decision. Every badge photo in that cabinet is a person half an hour into choosing this place, before the work taught them better or worse. I have seen nine hundred first days. The photos all say the same thing in different faces: 'let us see'. The cabinet is a library of let-us-see. I am quietly proud of every spine.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:the-bell",
      label: "The desk bell",
      optionCandidates: [
        { id: "renata:the-bell:opt-1", topicId: "renata:the-bell", text: "There is a bell on your desk nobody rings?" },
        { id: "renata:the-bell:opt-2", topicId: "renata:the-bell", text: "A courier rang the bell once, didn't they?" },
        { id: "renata:the-bell:opt-3", topicId: "renata:the-bell", text: "Burek reacts to the bell differently than people?" },
        { id: "renata:the-bell:opt-4", topicId: "renata:the-bell", text: "The bell came with the desk from the old office?" },
        { id: "renata:the-bell:opt-5", topicId: "renata:the-bell", text: "Maciek rings it when he wants attention?" },
        { id: "renata:the-bell:opt-6", topicId: "renata:the-bell", text: "Why keep a bell if nobody may ring it?" },
      ],
      replyCandidates: [
        {
          id: "renata:the-bell:rep-1",
          text: "Nobody rings it twice. It sits there like a small silver dare, and the whole building knows the rule without me ever saying it. The bell is not for calling me. I am always already here. The bell is for deciding how you feel about walking to a desk and speaking to a person like a person. Most people decide correctly. The bell stays for the others.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:the-bell:rep-2",
          text: "He did, at 7:40, with two full hands and no free knuckles. I rang it back at him. We stood there, two professionals, acknowledging the theater of it. He brings me coffee now on cold mornings and we never mention the bell. Some rituals are founded in irony and maintained in friendship. That bell rang one time in nine years and it was worth it.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:the-bell:rep-3",
          text: "Burek approves of the bell like a colleague approves of a doorbell protocol. One ding, one head lift, one assessment from his bed. People flinch. Burek evaluates. He has never once barked at it, which tells you everything: the bell announces, the dog decides. We run the front desk as a two-desk operation. Mine has the bell. His has the bed.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:the-bell:rep-4",
          text: "It did, 2011, in a box marked 'reception misc'. The desk came from a travel agency that closed, and the bell was in the drawer with two boiled sweets and a key to nothing. The sweets went. The key went. The bell stayed. Some objects survive an office move the way some people survive a family: by being useful and slightly funny.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:the-bell:rep-5",
          text: "He tried it, exactly once, in his first month, with a grin that pre-apologized. I rang it back and said 'your one-on-one is at eleven, Mr. Founder'. The whole office heard. He tells the story at every onboarding now, with sound effects. The bell taught him something no board deck could: at this desk, everyone takes a number, and he is everyone.",
          relationshipHint: "pleased",
          tags: ["quest:ceo-met"],
        },
        {
          id: "renata:the-bell:rep-6",
          text: "Because a desk needs one object with a sense of humor, and everything else on here works for a living. The bell does nothing, threatens nothing, and keeps everyone honest about hierarchy with one small silver joke. Also, and I will deny this: it has a lovely sound. One ding, in nine years. I remember it fondly. The bell and I are patient people.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:taxi-line",
      label: "The taxi line",
      optionCandidates: [
        { id: "renata:taxi-line:opt-1", topicId: "renata:taxi-line", text: "You call taxis for stranded consultants?" },
        { id: "renata:taxi-line:opt-2", topicId: "renata:taxi-line", text: "The taxi driver knows this building by your calls?" },
        { id: "renata:taxi-line:opt-3", topicId: "renata:taxi-line", text: "A taxi arrived in four minutes flat once?" },
        { id: "renata:taxi-line:opt-4", topicId: "renata:taxi-line", text: "Bartek left his umbrella in one of your taxis?" },
        { id: "renata:taxi-line:opt-5", topicId: "renata:taxi-line", text: "The dispatch lady knows your voice?" },
        { id: "renata:taxi-line:opt-6", topicId: "renata:taxi-line", text: "Will apps replace your taxi line one day?" },
      ],
      replyCandidates: [
        {
          id: "renata:taxi-line:rep-1",
          text: "Every winter, every airport panic, every man in a suit realizing the last train left an hour ago. I have three numbers saved under different weather. The consultants think I have a gift. It is not a gift. It is fifteen years of knowing which driver smokes with the window down and which one keeps mints in the door pocket.",
          relationshipHint: "pleased",
          tags: ["period:evening"],
        },
        {
          id: "renata:taxi-line:rep-2",
          text: "Pan Zbyszek does. He says 'the one with the mat and the sad flag?' and I say the one with the mat and the sad flag, and four minutes later there is a car. He has collected our people from weddings, hospitals, and one memorable farewell party that ended in Saska Kepa somehow. He never asks what happened at the party. Professionals respect mysteries.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:taxi-line:rep-3",
          text: "For a client who forgot a signed contract on his kitchen table. Four minutes, because Pan Zbyszek was finishing his soup two streets over and understood the word 'contract' the way doctors understand 'now'. The client made his meeting. He sends the office sweets every December addressed to 'the telephone angel'. Sweets do not expire. Neither does that debt.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:taxi-line:rep-4",
          text: "He did, his good one, the tween one with the wooden handle. Pan Zbyszek found it on the back seat, brought it to my desk, and it has lived in my umbrella stand ever since, waiting for Bartek to be in town and raining simultaneously. Two years now. The umbrella is patient. The umbrella knows the training schedule does not match the weather. It will fly home eventually.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:taxi-line:rep-5",
          text: "Hania does. She says 'Renata, wherever you need' before I finish the address. Fifteen years of calls buys you a first name and a favor economy that no app can price. When our power died during the flood year, she sent cars she did not have. You do not get that from a button. You get that from remembering her son's graduation every May.",
          relationshipHint: "pleased",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "renata:taxi-line:rep-6",
          text: "Maybe, for ordering. Never for the rest. An app does not know that the client in the back seat hates driving over bridges. An app does not hear 'do not send Marek's driver, they argue'. The line is not a taxi service. It is a matching service, between a person in trouble and a driver who has seen trouble before. The day the app does that, I will learn to text.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:the-chair",
      label: "The reception chair",
      optionCandidates: [
        { id: "renata:the-chair:opt-1", topicId: "renata:the-chair", text: "Your chair was adjusted once, in 2019?" },
        { id: "renata:the-chair:opt-2", topicId: "renata:the-chair", text: "The ergonomic auditor approved your chair?" },
        { id: "renata:the-chair:opt-3", topicId: "renata:the-chair", text: "Visitors always ask about the chair?" },
        { id: "renata:the-chair:opt-4", topicId: "renata:the-chair", text: "Janusz serviced the chair without being asked?" },
        { id: "renata:the-chair:opt-5", topicId: "renata:the-chair", text: "Klaudia filmed the chair for a 'work setup' post?" },
        { id: "renata:the-chair:opt-6", topicId: "renata:the-chair", text: "What is the secret to sitting well all day?" },
      ],
      replyCandidates: [
        {
          id: "renata:the-chair:rep-1",
          text: "Once, properly, by a visiting physiotherapist who waited for a package and could not watch me lean anymore. Two turns of the height, one tilt, and he left before I could thank him. The chair has held that exact position since, like a bicycle that learned my shape. Everything else in this office gets moved. The chair remembers 2019 and refuses to forget.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:the-chair:rep-2",
          text: "She did, full checklist, and I passed everything except armrests, which I do not use, on purpose, because I greet people and armrests make greetings rigid. She wrote 'declines armrests, correct posture anyway' in her report like a confession she approved of. The audit found one excellent chair in the building and it is not where the money went. It is where the sitting went.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:the-chair:rep-3",
          text: "They do, because it is the oldest thing at the desk and it looks like it has stories. It has. That chair has held three receptionists, one crying intern, two fainting visitors, and every winter coat this company has ever owned. I tell them it came with the desk. That is true and insufficient. Furniture that holds people is furniture with a career.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:the-chair:rep-4",
          text: "He did, one Thursday, oiled the tilt and tightened the star base while telling me about his granddaughter. I noticed the silence more than the work: the chair stopped its little click. Nine years of click, gone. I mentioned it. He said 'you should not have to hear your chair thinking'. That man fixes things you were both aware and unaware of.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:the-chair:rep-5",
          text: "She did, slow pan, chair and desk and bell, captioned 'the command center'. The comments decided my chair was 'the real CEO' and the thread became a shrine. Twelve thousand likes for furniture. Maciek joked about swapping offices. I said the chair would refuse. The chair has tenure. The chair is not moving, and neither, apparently, is the internet's love for it.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:the-chair:rep-6",
          text: "Feet down, back up, and stand for the phone. Sitting is a skill the same way listening is: it looks like nothing and it is everything. I stand for calls because the voice sits up when the body does. I sit for visitors because a standing person greets and a sitting person hosts. Match the posture to the moment and the day is long and kind to your spine.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:coat-corner",
      label: "The coat corner",
      optionCandidates: [
        { id: "renata:coat-corner:opt-1", topicId: "renata:coat-corner", text: "The coat corner is famous among visitors?" },
        { id: "renata:coat-corner:opt-2", topicId: "renata:coat-corner", text: "You remember whose coat is whose?" },
        { id: "renata:coat-corner:opt-3", topicId: "renata:coat-corner", text: "A visitor left a coat for a whole weekend?" },
        { id: "renata:coat-corner:opt-4", topicId: "renata:coat-corner", text: "The corner survived the renovation unchanged?" },
        { id: "renata:coat-corner:opt-5", topicId: "renata:coat-corner", text: "Two identical coats caused a crisis once?" },
        { id: "renata:coat-corner:opt-6", topicId: "renata:coat-corner", text: "What makes a coat corner good, in your view?" },
      ],
      replyCandidates: [
        {
          id: "renata:coat-corner:rep-1",
          text: "It is, quietly. The couriers recommend it to each other. Delivery men from three companies hang coats on our wall while they run packages upstairs. Nobody arranged this. Coats just started trusting the corner, and trust spreads in the delivery world faster than in most industries. The corner has a reputation. The corner has never lost a scarf.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:coat-corner:rep-2",
          text: "I do, by habit, the way a librarian knows the returns. The grey wool is Mr. Kowalczyk from the bank, Tuesdays. The puffer is the intern who is always cold. The leather one that smells of tobacco belongs to a man who has been 'just popping in' since March. A coat tells you who is in the building before the building tells you. The corner is my guest list.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:coat-corner:rep-3",
          text: "An auditor did, a beautiful grey thing, gone Friday afternoon, back Tuesday morning. I brushed it, covered it against dust, and left a note. He apologized for the abandonment. I said the corner does not judge, it waits. He now audits us twice a year and hangs the coat with the care of a man returning to a friend. Some coats just need a second home.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:coat-corner:rep-4",
          text: "It did, and the workers respected it like a monument. Paint everywhere, plastic on everything, and the corner stood untouched with its little rack and its bowl for gloves. The foreman said his mother had a corner like it. That was the end of the discussion. Some corners are exempt from renovation by universal agreement and one foreman's mother.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:coat-corner:rep-5",
          text: "They did. Two navy coats, two gentlemen, one departing early with the wrong one. I caught it at the door because the wrong coat was walking like a man who notices buttons. We swapped, we laughed, and both men now tie a different colored scarf to their hangers like schoolboys. The corner has a coat registry now. Informal. Effective. Slightly ridiculous.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:coat-corner:rep-6",
          text: "Visibility and dignity. A coat on a hook in a corner says 'you are expected, your things are safe'. A coat on a chair back says 'nobody owns this room'. The corner needs light, one hook per person, and someone who notices when a scarf has been forgotten for a week. The corner is the front desk of clothing. Same rules as everything else I do: be seen, be kept, be returned.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:last-lamp",
      label: "The last lamp",
      optionCandidates: [
        { id: "renata:last-lamp:opt-1", topicId: "renata:last-lamp", text: "You switch off the little lamp every evening?" },
        { id: "renata:last-lamp:opt-2", topicId: "renata:last-lamp", text: "The lamp stays on for late workers?" },
        { id: "renata:last-lamp:opt-3", topicId: "renata:last-lamp", text: "Janusz sees the lamp go off from the yard?" },
        { id: "renata:last-lamp:opt-4", topicId: "renata:last-lamp", text: "The lamp survived the power cut in the flood year?" },
        { id: "renata:last-lamp:opt-5", topicId: "renata:last-lamp", text: "Klaudia photographed the lamp at dusk?" },
        { id: "renata:last-lamp:opt-6", topicId: "renata:last-lamp", text: "Why does a lamp matter to a building's day?" },
      ],
      replyCandidates: [
        {
          id: "renata:last-lamp:rep-1",
          text: "Every evening, last thing, after the phones go quiet. It is a small ritual with no witnesses, which is what makes it a ritual and not a performance. The lamp off means the day is filed. Whatever broke today stays broken until morning, and morning handles things better anyway. Everything looks fixable after a lamp goes off.",
          relationshipHint: "pleased",
          tags: ["period:evening"],
        },
        {
          id: "renata:last-lamp:rep-2",
          text: "It does, for whoever is on deadline. The lamp says 'someone official is still in the building' better than any announcement. Developers on release nights look for it the way sailors look for lighthouses. The one time I switched it off early, Marek appeared at my desk in eleven minutes asking if the building was closing emotionally. The lamp stays on. The lamp has a duty.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "renata:last-lamp:rep-3",
          text: "He does, from the yard, with his keys in his hand. He told me once that when the lamp goes off, he knows the building is 'tucked in'. Janusz locks a building the way other people put children to bed: checking, touching, one last look. The lamp is our goodnight. Neither of us would call it that. Both of us would be right.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:last-lamp:rep-4",
          text: "It did, on batteries, for two days, while the pumps ran and the halls were wet. I sat by that lamp and answered the phones that still worked. People from other floors came down to sit near it. Nobody said why. A lamp in an emergency is a small argument that the world continues. Since then I have never once begrudged changing its bulb. Some light is structural.",
          relationshipHint: "pleased",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "renata:last-lamp:rep-5",
          text: "She did, through the glass at dusk, one frame, no filter. 'The last light in reception' did better numbers than any of the office tours. People recognize the feeling: someone stays until the day is truly over, and then gently ends it. Twelve thousand strangers felt watched over by a lamp. I could have told them. That is exactly what it does.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:last-lamp:rep-6",
          text: "Because buildings do not have eyelids, so someone has to show them how to close. The overhead lights are work. The lamp is intention. It says the desk is tended, the door is watched, the day had a keeper. Every office has one. Not every office knows which lamp it is. I have known this one for nine years. It knows me back. That is not sentiment. That is staffing.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:tea-drawer",
      label: "The tea drawer",
      optionCandidates: [
        { id: "renata:tea-drawer:opt-1", topicId: "renata:tea-drawer", text: "You keep a drawer of teas for sick colleagues?" },
        { id: "renata:tea-drawer:opt-2", topicId: "renata:tea-drawer", text: "The linden tea for stress is famous?" },
        { id: "renata:tea-drawer:opt-3", topicId: "renata:tea-drawer", text: "Tomek accepted a tea once, surprisingly?" },
        { id: "renata:tea-drawer:opt-4", topicId: "renata:tea-drawer", text: "Grazyna supplies half the drawer?" },
        { id: "renata:tea-drawer:opt-5", topicId: "renata:tea-drawer", text: "The drawer survived a raid by the interns?" },
        { id: "renata:tea-drawer:opt-6", topicId: "renata:tea-drawer", text: "Is a tea drawer medicine or kindness?" },
      ],
      replyCandidates: [
        {
          id: "renata:tea-drawer:rep-1",
          text: "Second drawer, labeled by complaint. Mint for stomachs, linden for nerves, ginger-lemon for the winter cough that makes the rounds every February. I am not a doctor. I am a dispatcher of warm water with opinions. Nine out of ten ailments in this building are thirst, cold, or worry. The drawer treats all three. The tenth ailment I send to an actual professional.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "renata:tea-drawer:rep-2",
          text: "It is. There is a mid-December ritual now: the stressed person arrives at my desk, I say nothing, I make the linden. By the second sip they are telling me what is actually wrong, and by the bottom of the cup we have a plan or at least a witness. The tea is not the medicine. The tea is the waiting room where the real conversation happens.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:tea-drawer:rep-3",
          text: "He did, during the big release, voice gone, typing his requests. I left the ginger-lemon on his desk without a word. He drank it. He said nothing. The next morning the mug was on my desk, washed, with a sticky note that said 'effective'. That note is in the drawer now. From Tomasz, it is a five-star medical review.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "renata:tea-drawer:rep-4",
          text: "She does, the herbal ones, from the same stalls as her candles. Her honey is in the drawer too, with a label in her handwriting: 'ration'. Between her stock and my labeling, the drawer runs like a small pharmacy with better customer service. We have never discussed the arrangement. Some partnerships are just shelves that keep being full.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-candle-partner"],
        },
        {
          id: "renata:tea-drawer:rep-5",
          text: "It did, during the deadline week, gently, by people who did not know the drawer had rules. I did not scold. I made a sign: 'take what you need, log what you take, the linden is rationed because it is sacred'. The sign worked better than any lock. The interns now refill the drawer voluntarily. Conscripts make poor guards. Volunteers make good pharmacists.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:tea-drawer:rep-6",
          text: "It is warm water wearing a kindness costume, and I will not pretend otherwise. The mint does not fix the meeting that went badly. The meeting that went badly needed someone to say 'that sounded hard' while holding a warm cup. The tea buys the three minutes. The kindness does the rest. Medicine and kindness use the same drawer. That is not a flaw in either.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:name-memory",
      label: "The name memory",
      optionCandidates: [
        { id: "renata:name-memory:opt-1", topicId: "renata:name-memory", text: "You remembered a visitor's name from one meeting a year ago?" },
        { id: "renata:name-memory:opt-2", topicId: "renata:name-memory", text: "How do you actually store all these names?" },
        { id: "renata:name-memory:opt-3", topicId: "renata:name-memory", text: "Kasia asks you to name faces at interviews?" },
        { id: "renata:name-memory:opt-4", topicId: "renata:name-memory", text: "You once knew everyone's coffee order too?" },
        { id: "renata:name-memory:opt-5", topicId: "renata:name-memory", text: "Tomek tested your memory like a benchmark?" },
        { id: "renata:name-memory:opt-6", topicId: "renata:name-memory", text: "Is remembering names a skill or a knack?" },
      ],
      replyCandidates: [
        {
          id: "renata:name-memory:rep-1",
          text: "Mr. Nowak, the notary, who came once about a lease and returned thirteen months later. I said 'Mr. Nowak, the good pen is on the left today'. He stood very still. People do not need to be impressed. They need to be remembered. The pen was a bonus. The name was the whole greeting and he knew it and sat down like a man returning to his own kitchen.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:name-memory:rep-2",
          text: "By story, never by drill. Mrs. Zielinska has a daughter in Gdansk and signs with a flourish. The courier uses two rings because his hands are full. Faces do not come with names attached; they come with stories, and the story holds the name in place. A name alone slides off. A name with a daughter in Gdansk stays for years.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:name-memory:rep-3",
          text: "She does, for the final round candidates. I sit by the coffee and put names to faces so nobody walks into the wrong room feeling like a number. She says it calms the candidates more than the good chairs. Of course it does. An interview is a fear with a schedule. A person who knows your name converts the fear into a visit.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:name-memory:rep-4",
          text: "I did, for three years, until Zosia introduced the honesty jars and I retired the act. Marek: black, no sugar, always the big cup. Dawid: whatever is nearest, will not wait. It made people feel seen and it made me feel like a switchboard. Now I remember names and let people order their own coffee. There is a line between service and surveillance and I have found it. Mostly.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:name-memory:rep-5",
          text: "He did, one afternoon, with the visitor book like a quiz show host. Forty names, three months back. I got thirty-nine. The fortieth was a man named Krzysztof who goes by Kuba, which we agreed was entrapment. He wrote '39/40, robust' on a sticky note and left. From him, that is a parade. The sticky note is under the visitor book now, doing reference duty.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr", "relationship:neutral"],
        },
        {
          id: "renata:name-memory:rep-6",
          text: "A skill, and it runs on interest. Nobody remembers names they were not curious about. The knack, if there is one, is deciding people are worth the storage. At this desk that decision is easy: every name that walks in is carrying somebody's day. I hold the names the way I hold coats. Carefully, visibly, and returned on the way out.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:bus-lore",
      label: "The bus lore",
      optionCandidates: [
        { id: "renata:bus-lore:opt-1", topicId: "renata:bus-lore", text: "You know every bus line around here?" },
        { id: "renata:bus-lore:opt-2", topicId: "renata:bus-lore", text: "The 128 changed route and you warned everyone?" },
        { id: "renata:bus-lore:opt-3", topicId: "renata:bus-lore", text: "Pawel missed the last bus and you fixed it?" },
        { id: "renata:bus-lore:opt-4", topicId: "renata:bus-lore", text: "The night bus driver knows the office?" },
        { id: "renata:bus-lore:opt-5", topicId: "renata:bus-lore", text: "Zosia planned the offsite buses with you?" },
        { id: "renata:bus-lore:opt-6", topicId: "renata:bus-lore", text: "Why buses and not just apps like everyone?" },
      ],
      replyCandidates: [
        {
          id: "renata:bus-lore:rep-1",
          text: "The lines, the shortcuts, and which stops have benches in the rain. The 128 for the bank, the 174 if you do not mind hills, the tram if you have given up on the morning entirely. Twenty-two years in this district. The buses are my second language and every visitor gets spoken to in it. 'Take the 174, change at the church' has never once failed anyone.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:bus-lore:rep-2",
          text: "I did, from a notice in my own newsagent's window, three days before the official announcement. The whole office knew first. Dawid said 'how', and I said the newsagent tells me things, and he accepted it the way he accepts things: completely, silently, forever. The detour cost nobody a meeting. This is what a reception is for. Early warnings and warm news.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:bus-lore:rep-3",
          text: "He did, at 22:40, with a release unfinished and a face like weather. The last 128 had gone. I called the night line, got him onto the 174, and texted the stop with the bench. He was home by eleven. The next morning there was a thank-you note and a question about whether the bus runs on Sundays too. It does. I checked in 2003 and I have never needed to check again.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-apprentice"],
        },
        {
          id: "renata:bus-lore:rep-4",
          text: "He does. Pan Henryk drives the night line and has delivered our people home since before some of them had gray hairs. He waits the extra thirty seconds when he sees someone from our address running. Once he drove back for Grazyna's forgotten candles. Once. He will not discuss it. The night bus has honor and the honor knows our building by its lights.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:bus-lore:rep-5",
          text: "She did, and the coach company gave her a discount she accepted like a queen collecting taxes. I flagged the one road that floods in autumn and the driver confirmed it from experience. We changed the route, saved forty minutes, and arrived dry. Zosia does the vision. I do the roads. Every great plan has someone in it who knows where the water rises.",
          relationshipHint: "pleased",
          tags: ["quest:zosia-opened-up"],
        },
        {
          id: "renata:bus-lore:rep-6",
          text: "Because the app knows schedules and I know buses. The 174 driver listens to radio dramas. The 128 has a heater that sings. The tram is for souls in recovery. An app will get you from A to B. I will get you from A to B with a seat, a warning about the church stop, and the knowledge that the driver is kind. Transportation is a people business wearing a timetable.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:crossword",
      label: "The morning crossword",
      optionCandidates: [
        { id: "renata:crossword:opt-1", topicId: "renata:crossword", text: "The crossword on your desk has rules?" },
        { id: "renata:crossword:opt-2", topicId: "renata:crossword", text: "Visitors help you finish it?" },
        { id: "renata:crossword:opt-3", topicId: "renata:crossword", text: "Tomek solves it in minutes when bored?" },
        { id: "renata:crossword:opt-4", topicId: "renata:crossword", text: "Grazyna disputes one answer every week?" },
        { id: "renata:crossword:opt-5", topicId: "renata:crossword", text: "Burek sits on the crossword once?" },
        { id: "renata:crossword:opt-6", topicId: "renata:crossword", text: "What does a crossword do for a morning?" },
      ],
      replyCandidates: [
        {
          id: "renata:crossword:rep-1",
          text: "Pencil only, never before the first coffee, and stopped the moment a visitor needs me. The crossword is a curtain, not a wall. It says 'the desk is tended and calm'. Fifteen minutes a day, seven clues, and my morning has a spine. Visitors who wait ten minutes with half a crossword feel like guests, not line items. That is the whole technology of it.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "renata:crossword:rep-2",
          text: "The best ones do. The glazier knew the window clue. The tax man solved a five-letter word for 'assessment' with the grim joy of a man in his homeland. A child once solved 'the thing you look through' while waiting for her mother, and I have never felt prouder of this desk. The crossword interviews everyone. The crossword has hired nobody and befriended everyone.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:crossword:rep-3",
          text: "He did once, passing through, took the pencil without asking, and emptied the remaining grid in four minutes. Then he said 'the clue setter is lazy on Thursdays' and walked on. It was the most violent act of competence this office has seen. I have since learned to hide the crossword on his meeting days. Some puzzles deserve to survive the morning.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "renata:crossword:rep-4",
          text: "She does, in red pen, with citations. Last week's dispute was 'estuary', four letters. She brought evidence. The paper accepted a correction the following Sunday and Grazyna walked past my desk with the face of a woman whose lawsuit has settled. We do the crossword in two sittings now: hers, then mine, and the margin holds the appeals.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "renata:crossword:rep-5",
          text: "He did, for one full minute, on a Tuesday, and the crossword survived with three small dents and one tear shaped like a claw. He looked at me. I looked at him. He moved to the radiator, which he has decided is his legal property. The crossword has since been moved six centimeters to the left, out of the flight path. We negotiate with the residents we love.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:crossword:rep-6",
          text: "It gives the morning a first small victory. Before the phones, before the deliveries, before anyone needs anything: seven little answers, all of them obtainable. A receptionist who has already solved something greets the day differently than one who is waiting to be solved. The crossword is armor made of paper. Cheap, light, and it works.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:paper-planner",
      label: "The paper planner",
      optionCandidates: [
        { id: "renata:paper-planner:opt-1", topicId: "renata:paper-planner", text: "You run the whole desk from a paper planner?" },
        { id: "renata:paper-planner:opt-2", topicId: "renata:paper-planner", text: "Zosia tried to move you to the calendar app?" },
        { id: "renata:paper-planner:opt-3", topicId: "renata:paper-planner", text: "The planner survived a coffee flood once?" },
        { id: "renata:paper-planner:opt-4", topicId: "renata:paper-planner", text: "Old planners are archived in your closet?" },
        { id: "renata:paper-planner:opt-5", topicId: "renata:paper-planner", text: "Kasia borrows your planning system for HR?" },
        { id: "renata:paper-planner:opt-6", topicId: "renata:paper-planner", text: "What happens when you cannot find the planner?" },
      ],
      replyCandidates: [
        {
          id: "renata:paper-planner:rep-1",
          text: "One book, one pen, the whole front desk. Deliveries, visitors, which lights stay on, who cannot be disturbed before ten. The planner sits open like a fourth colleague. A screen sleeps when you look away. Paper watches. Nine years of days in one continuous line, and I can put my finger on any Tuesday you care to name. The digital calendar searches faster.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:paper-planner:rep-2",
          text: "She did, twice, kindly, with training. I did the training. I use the app for things the app is good at: the offsite, the big lists, things other people must see. The planner keeps what is mine. We called it a two-system peace treaty and Zosia signed it with the app she uses for everything else. She respects a boundary with good handwriting.",
          relationshipHint: "pleased",
          tags: ["quest:zosia-opened-up"],
        },
        {
          id: "renata:paper-planner:rep-3",
          text: "It did, February before last, the whole corner of the desk. I blotted it with the kitchen roll and separated the pages like a surgeon. Two weeks of entries smeared but readable, one visit lost and retyped from memory. Janusz brought me a fan. The planner dried standing up, like a hero. It has a water line now, like a building after the flood. It stays in the record.",
          relationshipHint: "annoyed",
          tags: ["quest:janusz-told-the-flood"],
        },
        {
          id: "renata:paper-planner:rep-4",
          text: "They are, bottom shelf, oldest at the back, nine years of mornings. I consult them like a village elder consults weather. When was the elevator last serviced? What did we do the week the road closed? The planners know. A desk with an archive cannot be gaslit by its own history. Every question anyone asks me, some version of it is already answered on a bottom shelf.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:paper-planner:rep-5",
          text: "She does, the color system, for candidates and appraisals. Red ink for confirmed, pencil for pending, a full line through anything dead. She says my system survives contact with reality, which she considers high praise and I consider the job description. HR runs on paper too, whatever the software says. People are analog. Their paperwork should meet them where they live.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:paper-planner:rep-6",
          text: "Then the desk runs on my head, and my head is good but it is not archival. It happened once, for one hour, during the renovation. Two visitors unannounced, one courier signed wrongly, and I learned where every line of that book lives. The planner came back and I built it a home: same drawer, same corner, and Janusz made a small wooden lip so it cannot slide.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:stamp-collection",
      label: "The stamp collection",
      optionCandidates: [
        { id: "renata:stamp-collection:opt-1", topicId: "renata:stamp-collection", text: "You collect stamps from around the world?" },
        { id: "renata:stamp-collection:opt-2", topicId: "renata:stamp-collection", text: "The mailroom gives you their foreign stamps?" },
        { id: "renata:stamp-collection:opt-3", topicId: "renata:stamp-collection", text: "Grazyna offered to value the collection?" },
        { id: "renata:stamp-collection:opt-4", topicId: "renata:stamp-collection", text: "One stamp came from a very old letter?" },
        { id: "renata:stamp-collection:opt-5", topicId: "renata:stamp-collection", text: "Tomek found a stamp error worth money?" },
        { id: "renata:stamp-collection:opt-6", topicId: "renata:stamp-collection", text: "Why stamps and not something more modern?" },
      ],
      replyCandidates: [
        {
          id: "renata:stamp-collection:rep-1",
          text: "I do, since I was eleven and my uncle sent a letter from a ship. The album lives at home, but the duplicates live in my desk and get sorted on quiet Fridays. Stamps are the world's smallest paintings and every one of them traveled. This desk sees letters from everywhere. It seemed rude to let the interesting ones leave without keeping their faces.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:stamp-collection:rep-2",
          text: "They do, the honest way: envelopes that would be binned get a knock on my desk. Pan Andrzej from the mailroom has an eye. He once held up an envelope with a 1960s airmail edge like a man holding a bird. We steam, we sort, we log. The mailroom and the front desk run the smallest museum in the building and the only one with admission by post.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:stamp-collection:rep-3",
          text: "She did, once, professionally, and then retracted the offer. 'Some collections are worth more unpriced.' She saw the album, asked two sharp questions, and wrote nothing down. From Grazyna, declining to audit is a love language. The collection is not an investment. It is a postcard from everyone who ever thought of us. You cannot value that. She knows. She has candles.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-candle-partner"],
        },
        {
          id: "renata:stamp-collection:rep-4",
          text: "One did. A client's mother passed and the family sent us her farewell letters to post. One had a stamp from a country that redrew itself twice since. I asked permission to keep the stamp and the son said his mother would have liked that. It sits on the first page of the album now, facing the door, greeting everything that comes after it. Stamps outlive their letters.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:stamp-collection:rep-5",
          text: "He did, with a loupe he carries, which I have questions about. One stamp, a printing shift error, tiny, worth more than the letter it came on. He wrote down the catalogue number, told me where to verify it, and left. I verified. He was right. The stamp is in a proper sleeve now. The loupe man giveth. I have never seen him use the loupe for work.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "renata:stamp-collection:rep-6",
          text: "Because everything modern updates, and I spend all day with things that update. The stamps do not update. They are exactly what they were in 1962, and they still did their job. At this desk I am the person things pass through. Stamps are the only mail that asks to stay. I say yes. A woman needs one shelf that refuses to renovate.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:the-sparrow",
      label: "The sparrow incident",
      optionCandidates: [
        { id: "renata:the-sparrow:opt-1", topicId: "renata:the-sparrow", text: "A sparrow got into the office last spring?" },
        { id: "renata:the-sparrow:opt-2", topicId: "renata:the-sparrow", text: "Burek and the sparrow had a standoff?" },
        { id: "renata:the-sparrow:opt-3", topicId: "renata:the-sparrow", text: "Janusz caught it with a box and a cloth?" },
        { id: "renata:the-sparrow:opt-4", topicId: "renata:the-sparrow", text: "Klaudia filmed the whole rescue?" },
        { id: "renata:the-sparrow:opt-5", topicId: "renata:the-sparrow", text: "The sparrow came back to the window after?" },
        { id: "renata:the-sparrow:opt-6", topicId: "renata:the-sparrow", text: "Why does everyone remember the sparrow?" },
      ],
      replyCandidates: [
        {
          id: "renata:the-sparrow:rep-1",
          text: "It did, through the open door, on the exact day the delivery plan went perfectly. A sparrow does not care about your logistics. It flew three perfect laps of reception, landed on my monitor, and looked at the visitor book like it had complaints. We closed the office for twenty minutes. Best twenty minutes of that spring. The visitor book has a small feather pressed in it now.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:the-sparrow:rep-2",
          text: "They did, from opposite ends of the rug, for the longest minute in company history. Burek on duty, sparrow on principle. I said his name once, the specific tone, and he lay down with his whole soul objecting. The sparrow left through the door we opened for it. Burek got a treat for 'restraint under provocation'. The tone works on him. The sparrow remains ungrateful.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "quest:burek-person"],
        },
        {
          id: "renata:the-sparrow:rep-3",
          text: "He did, in one motion, like a man who has done this before, because he has. Box, cloth, one quiet word, and the sparrow sat in his hands like a paying tenant being moved to better rooms. Released by the tree in the yard. Janusz said 'small tenant, small problems' and went back to his rounds. The man has a whole country up his sleeve and it comes out in emergencies.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:the-sparrow:rep-4",
          text: "She did, and the video did ten million views, but my favorite part never made the cut: Burek lying down, Janusz arriving with the box, and nobody raising their voice. The internet called it 'chaos'. It was the opposite. It was an office doing what it practices. I keep the uncut version. Some footage is a family album that got famous.",
          relationshipHint: "delighted",
        },
        {
          id: "renata:the-sparrow:rep-5",
          text: "It did, or one very like it, three times that summer, always to the same windowsill. It does not come in. It looks in, like a person checking on a restaurant they liked. I leave water on the sill now, from April to September. Janusz pretends not to know whose idea the water was. The sill is on his Thursday round. Everyone in this story is pretending. It is working.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:the-sparrow:rep-6",
          text: "Because it was twenty minutes where the whole building wanted the same small thing. The intern held the door. Tomasz turned off the fan. Zosia herded gently. Even the sparrow cooperated by the end. Companies spend fortunes trying to build that feeling, and a bird delivered it between meetings. We remember the sparrow because it is proof of us. Proof is rare. Feathers help.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:temperature-complaints",
      label: "The temperature complaints",
      optionCandidates: [
        { id: "renata:temperature-complaints:opt-1", topicId: "renata:temperature-complaints", text: "People complain to you about the temperature?" },
        { id: "renata:temperature-complaints:opt-2", topicId: "renata:temperature-complaints", text: "The same two people complain every winter?" },
        { id: "renata:temperature-complaints:opt-3", topicId: "renata:temperature-complaints", text: "You route complaints to Janusz with a code?" },
        { id: "renata:temperature-complaints:opt-4", topicId: "renata:temperature-complaints", text: "Grazyna logged heating complaints as data?" },
        { id: "renata:temperature-complaints:opt-5", topicId: "renata:temperature-complaints", text: "Zosia drafted a temperature policy once?" },
        { id: "renata:temperature-complaints:opt-6", topicId: "renata:temperature-complaints", text: "Why does the front desk absorb all complaints?" },
      ],
      replyCandidates: [
        {
          id: "renata:temperature-complaints:rep-1",
          text: "All of them, about everything, since 2016. The desk is where the weather is discussed, the printers are gossiped about, and the wifi is tried in person. I am not just reception. I am the complaints department of the entire physical world. The secret is taking every temperature report seriously and changing exactly nothing yourself. I listen. Janusz adjusts.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:temperature-complaints:rep-2",
          text: "We do, and by now it is a duet. Mr. Wiesiek from the bank arrives cold, the intern arrives cold, and the developers arrive dressed for the tundra. I nod at the right moments, offer the tea drawer, and pass the pattern to Janusz. They are both correct. The room is two temperatures and one of them is wrong depending on where you were born. This is not a problem. This is January.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "renata:temperature-complaints:rep-3",
          text: "I do, by floor and by feeling. 'Second floor, cold by the window, worse after two' tells him more than any form. He has taught me his shorthand: S for draft, R for radiator, B for boiler mood. My notebook has a weather section. Between his basement and my desk we run meteorology for a building. The complaints get answered by Thursday and they get remembered by both of us.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:temperature-complaints:rep-4",
          text: "She did, one winter, every complaint, plotted against the actual outdoor temperature. The graph proved what Janusz always said: half the cold is memory and half is draft, and they peak in the same week. She adjusted nothing and understood everything. Now when I log a complaint she asks 'which half?' and I tell her honestly. Data gave our grumbles dignity.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "renata:temperature-complaints:rep-5",
          text: "She did, one page, respectful, doomed. The policy said twenty-one degrees, no exceptions, complaints in writing. It lasted four days, or until Mr. Wiesiek submitted his complaint in writing, on official bank letterhead, with a chart. Zosia withdrew the policy and framed the letter. Some forces are not policies. Some forces are men from banks who are cold.",
          relationshipHint: "pleased",
          tags: ["quest:zosia-opened-up"],
        },
        {
          id: "renata:temperature-complaints:rep-6",
          text: "Because the desk is where people are already honest. Nobody walks to HR to say the radiator clicks, and nobody emails the boss about a draft. But everyone passes this desk, and at this desk it is safe to be small. A complaint about temperature is rarely about temperature. It is about being somewhere eight hours a day and wanting it to notice you. The desk notices.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "renata:sea-photo",
      label: "The sea photo",
      optionCandidates: [
        { id: "renata:sea-photo:opt-1", topicId: "renata:sea-photo", text: "The photo on your desk is from the sea?" },
        { id: "renata:sea-photo:opt-2", topicId: "renata:sea-photo", text: "The photo was taken by your husband?" },
        { id: "renata:sea-photo:opt-3", topicId: "renata:sea-photo", text: "Visitors ask about it every day?" },
        { id: "renata:sea-photo:opt-4", topicId: "renata:sea-photo", text: "Burek stares at the sea photo sometimes?" },
        { id: "renata:sea-photo:opt-5", topicId: "renata:sea-photo", text: "Klaudia offered to retake it professionally?" },
        { id: "renata:sea-photo:opt-6", topicId: "renata:sea-photo", text: "Why that photo for this desk?" },
      ],
      replyCandidates: [
        {
          id: "renata:sea-photo:rep-1",
          text: "It is. Ustka, September, before the season closed, 6 in the morning. The beach empty, the water the exact color of the word 'calm'. I keep it where visitors can see it because a receptionist who is looking at the sea is a receptionist who is not looking at the clock. It is not decoration. It is orientation. That is north. That is why we work.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:sea-photo:rep-2",
          text: "It was, with my old camera, the one with the sticky zoom. He got up before me, which was itself the event of the year, and came back with this. He said the sea 'was behaving'. He has been gone four years now. The sea keeps behaving. The photo holds the whole marriage in it: him getting up early, the water minding its manners, me at this desk, still looking at it.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:sea-photo:rep-3",
          text: "Daily, and I never tire of the question. The Germans ask if it is the Baltic. The couriers ask if I surf. A child once asked if the sea was 'working today' and I said yes, always, that is the whole arrangement. The photo does more hospitality than the flowers. People trust a desk that has somewhere else in it.",
          relationshipHint: "pleased",
        },
        {
          id: "renata:sea-photo:rep-4",
          text: "He does, from the bed, on winter mornings, at the exact height of a small dog staring at a horizon he cannot smell. There are no smells in a photo. I wonder what he makes of it. Once he sighed at it, the whole-body sigh, the one he saves for closed doors and finished walks. I moved the photo lower last year. Not for the light. For the dog.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:sea-photo:rep-5",
          text: "She did, kindly, twice. I declined, twice, with love. She said 'I could make it perfect'. I said it already is. The blur is his hurry. The tilt is the sticky zoom. The grey is September telling the truth. Your photo would be beautiful, Klaudia. Mine is true. We understood each other completely, which is the other thing that desk has taught me.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "renata:sea-photo:rep-6",
          text: "Because a desk is where the day lands, and every landing needs a horizon. The photo says: things are larger than this room, the water is somewhere minding its manners, and the morning you are having is one morning of very many. People stand at this desk with their worst problems. They stand next to the sea for a moment. It helps. It helps me too, and I chose it.",
          relationshipHint: "pleased",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "renata:task-burek-duty",
      title: "Burek duty",
      description: "The duty roster has spoken. Burek gets his walk, his corner route, and no rushing. The roster is always right because Renata writes the roster.",
      flagToSet: "burek-fed",
      rewardHint: "+Burek's approval (in dog)",
    },
  ],
};

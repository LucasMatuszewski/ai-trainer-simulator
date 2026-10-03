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

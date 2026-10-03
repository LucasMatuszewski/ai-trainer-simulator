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

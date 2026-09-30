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

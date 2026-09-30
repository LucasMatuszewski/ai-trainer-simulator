/**
 * WS3 dialogue v2 pool — Marek, DevOps / 10x Engineer (C-77).
 *
 * Pure authored data. Topics: prod on fire (afternoons), the six-monitor
 * perimeter, documentation philosophy, and the printer he accidentally
 * named. Task offers: the Friday firewatch (sets the existing
 * `marek-trusted-review` flag) and sticker ops on the printer (sets the
 * existing `janusz-leave-printer` flag — Marek making Janusz's embargo
 * official is peak office diplomacy). Tone: few words, strong opinions.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const MAREK_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "marek",
  topics: [
    {
      id: "marek:prod",
      label: "Prod is on fire",
      periods: ["afternoon"],
      optionCandidates: [
        {
          id: "marek:prod:opt-1",
          topicId: "marek:prod",
          text: "Is prod down, or is it just slow?",
        },
        {
          id: "marek:prod:opt-2",
          topicId: "marek:prod",
          text: "Something is on fire in prod. Should I do anything?",
        },
        {
          id: "marek:prod:opt-3",
          topicId: "marek:prod",
          text: "Why do you deploy on Fridays?",
        },
        {
          id: "marek:prod:opt-4",
          topicId: "marek:prod",
          text: "The alert dashboard is red. All of it.",
        },
        {
          id: "marek:prod:opt-5",
          topicId: "marek:prod",
          text: "Can I watch how you fix prod?",
        },
        {
          id: "marek:prod:opt-6",
          topicId: "marek:prod",
          text: "Who is on call tonight?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:prod:rep-1",
          text: "Down is a state of mind. Slow means it is thinking. Prod has been 'thinking' since June and the clients call it stability. If it were actually down you would know, because Przemek would already have promised them a robot to fix it.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:prod:rep-2",
          text: "No. Watch, learn, and touch nothing. Every incident has two phases: the fire, and the intern with a bucket. Be no bucket. Actually, stay and take notes. Documentation happens to other people, but a witness is useful.",
          relationshipHint: "pleased",
          offersTaskId: "marek:task-firewatch",
        },
        {
          id: "marek:prod:rep-3",
          text: "Friday deploys are a focus ritual. The office empties, the tickets go quiet, and it is just me, the terminal, and consequences. Besides, if it breaks, it breaks while the people who would notice are emotionally committed to the weekend. Alignment.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:prod:rep-4",
          text: "The dashboard is red because red is free. Green dashboards get decommissioned. That panel has been red so long it is load-bearing. If it ever turns green I will assume the monitoring broke and declare a real incident.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:prod:rep-5",
          text: "Stand there. Be quiet. Hand me things if I say the name of the things. This is how apprenticeships worked for a thousand years and nobody wrote any of it down, which is the correct amount of documentation.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:prod:rep-6",
          text: "Me. Always me. On call is a title the rotation gave me in 2021 and forgot to take back. The pager has not rung in months. I check it anyway. Trust is not silence. Trust is silence you verify.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "marek:setup",
      label: "The setup",
      minRelationship: 45,
      optionCandidates: [
        {
          id: "marek:setup:opt-1",
          topicId: "marek:setup",
          text: "Why do you have six monitors?",
        },
        {
          id: "marek:setup:opt-2",
          topicId: "marek:setup",
          text: "Can I borrow a cable?",
        },
        {
          id: "marek:setup:opt-3",
          topicId: "marek:setup",
          text: "Your chair looks structurally significant.",
        },
        {
          id: "marek:setup:opt-4",
          topicId: "marek:setup",
          text: "What is monitor six for, really?",
        },
        {
          id: "marek:setup:opt-5",
          topicId: "marek:setup",
          text: "I touched your keyboard. Sorry.",
        },
        {
          id: "marek:setup:opt-6",
          topicId: "marek:setup",
          text: "Is the mechanical keyboard sound necessary?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:setup:rep-1",
          text: "One for code, one for logs, one for dashboards, one for the docs I do not write, one for the clock. Six is the clock. People always ask about six. Nobody asks why five is docs-I-do-not-write. The monitors are not for productivity. They are a perimeter.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:setup:rep-2",
          text: "Define borrow. If it returns, it is a loan and I log it. If it does not return, it was a gift and I log that too, in a different tone. Which cable. Be specific. Touch nothing while describing it.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:setup:rep-3",
          text: "Eleven years. The gas lift died in 2021, so now it sits at exactly my height, permanently, like a monument. I do not adjust it. It adjusted to me. There is a lesson about infrastructure in there and I am not going to write it down.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:setup:rep-4",
          text: "The clock is the only monitor that has never been wrong. Deadlines scroll across it in sixty-point font. Clients see it in video calls and suddenly their timelines get realistic. Monitor six closes more tickets than I do.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:setup:rep-5",
          text: "You WHAT. Okay. Okay. Nobody dies today. I am wiping it, rebinding everything, and we never speak of this again. There are oils on human hands that have ended friendships longer than your employment. Breathe. Just not near it.",
          relationshipHint: "offended",
        },
        {
          id: "marek:setup:rep-6",
          text: "The sound IS the feature. Every click broadcasts that work is happening. Marketing hears engines. Sales hears leverage. You hear it and you know to type quieter. It is a communication channel.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:docs",
      label: "Documentation",
      optionCandidates: [
        {
          id: "marek:docs:opt-1",
          topicId: "marek:docs",
          text: "Why do you not write documentation?",
        },
        {
          id: "marek:docs:opt-2",
          topicId: "marek:docs",
          text: "I cannot run your deploy script. There are no comments.",
        },
        {
          id: "marek:docs:opt-3",
          topicId: "marek:docs",
          text: "Is the wiki dead?",
        },
        {
          id: "marek:docs:opt-4",
          topicId: "marek:docs",
          text: "What if you get hit by a bus?",
        },
        {
          id: "marek:docs:opt-5",
          topicId: "marek:docs",
          text: "Pawel offered to document your systems.",
        },
        {
          id: "marek:docs:opt-6",
          topicId: "marek:docs",
          text: "Your scripts have opinions. Strong ones.",
        },
      ],
      replyCandidates: [
        {
          id: "marek:docs:rep-1",
          text: "Docs are a snapshot of a system that has already moved on. By the time you finish writing one, it is historical fiction. The code is the truth. If the code needs explaining, the code is wrong, and I fix the code instead of the reader.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:docs:rep-2",
          text: "The deploy script is a sequence of runic operations discovered through suffering. It has three comments. Each one says 'do not ask'. That is not laziness. That is a warning label.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:docs:rep-3",
          text: "The wiki was born in 2020 with four pages and died in 2020 with the same four pages. It is a museum. Visit it, respect it, contribute nothing. Writing 'the wiki is dead' in the wiki would be its final, honest page.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:docs:rep-4",
          text: "Then the systems fail, and when the systems fail, the company learns what I actually do here. The bus is the audit nobody budgets for. I am not saying I am irreplaceable. I am saying nobody has tested it, and nobody wants to.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:docs:rep-5",
          text: "Absolutely not. Pawel documented the backup script once. The document says 'it works'. Below that, in smaller text, 'do not touch it'. That is not documentation, that is a haiku, and the haiku is load-bearing.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:docs:rep-6",
          text: "Scripts that argue back are the only honest colleagues in this building. The deploy script refuses to run before nine. It was not designed to. It learned. I have stopped asking how. Some knowledge costs more than it pays.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:printer",
      label: "The printer situation",
      optionCandidates: [
        {
          id: "marek:printer:opt-1",
          topicId: "marek:printer",
          text: "Why does everyone call the printer your coffee maker?",
        },
        {
          id: "marek:printer:opt-2",
          topicId: "marek:printer",
          text: "I can fix the printer. I have time.",
        },
        {
          id: "marek:printer:opt-3",
          topicId: "marek:printer",
          text: "Did you ever try to fix it?",
        },
        {
          id: "marek:printer:opt-4",
          topicId: "marek:printer",
          text: "Janusz says the printer is unplugged. Is that true?",
        },
        {
          id: "marek:printer:opt-5",
          topicId: "marek:printer",
          text: "The printer is a health hazard at this point.",
        },
        {
          id: "marek:printer:opt-6",
          topicId: "marek:printer",
          text: "What would you do with a working printer?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:printer:rep-1",
          text: "In 2019 I left a mug on it. That is the entire story. The mug is still there. It has become furniture, then folklore, then policy. Around here, anything that does not move for a year becomes load-bearing culture.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:printer:rep-2",
          text: "You will not fix it. Nobody fixes it. But if you are going to stand near it anyway, put the 'PROPERTY OF DEVOPS - DO NOT OPERATE' sticker on it. Officially it is a safety sign. Unofficially it makes Janusz's quiet embargo legally binding.",
          relationshipHint: "pleased",
          offersTaskId: "marek:task-sticker",
        },
        {
          id: "marek:printer:rep-3",
          text: "Once. In 2019. I plugged it back in, it printed one page by itself, unrequested, and the page said 'OK'. I unplugged it and I have respected it ever since. You do not fix something that responds to being left alone. That is not repair. That is diplomacy.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:printer:rep-4",
          text: "Janusz says a lot of things. He also says there are no bodies in the parking lot, which is technically true, and technically true is this office's native language. The printer's power status is between it and Janusz. Keep it that way.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral", "relationship:hostile"],
        },
        {
          id: "marek:printer:rep-5",
          text: "It is a monument. Monuments do not need to pass inspections. The dust is patina. The blinking light is a memorial candle for the documentation we never wrote. It will outlive this company and possibly this economy.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:printer:rep-6",
          text: "Print the docs. All of them. One page, front and back, and tape it to the fridge. 'Here is everything Marek never wrote.' It would be the smallest, most accurate library in the building. Then I would unplug it again. Obviously.",
          relationshipHint: "pleased",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "marek:task-firewatch",
      title: "Friday firewatch",
      description: "Stand next to Marek during the Friday deploy and take notes he will never read. Touch nothing. Your presence is the rollback plan.",
      flagToSet: "marek-trusted-review",
      rewardHint: "+Marek's trust (rare)",
    },
    {
      id: "marek:task-sticker",
      title: "Sticker ops",
      description: "Apply the 'PROPERTY OF DEVOPS - DO NOT OPERATE' sticker to the printer. Janusz's six-year embargo becomes official signage, and nobody asks questions ever again.",
      flagToSet: "janusz-leave-printer",
      rewardHint: "+office-wide calm",
    },
  ],
};

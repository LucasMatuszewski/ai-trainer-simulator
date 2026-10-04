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
    {
      id: "marek:oncall",
      label: "On-call silence rituals",
      optionCandidates: [
        {
          id: "marek:oncall:opt-1",
          topicId: "marek:oncall",
          text: "The pager has not rung for months. Suspicious?",
        },
        {
          id: "marek:oncall:opt-2",
          topicId: "marek:oncall",
          text: "How do you sleep during on-call week?",
        },
        {
          id: "marek:oncall:opt-3",
          topicId: "marek:oncall",
          text: "Can I take the on-call rotation this month?",
        },
        {
          id: "marek:oncall:opt-4",
          topicId: "marek:oncall",
          text: "What was your worst night ever?",
        },
        {
          id: "marek:oncall:opt-5",
          topicId: "marek:oncall",
          text: "Do you check the pager on holiday?",
        },
        {
          id: "marek:oncall:opt-6",
          topicId: "marek:oncall",
          text: "Why do you answer before the alert fires?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:oncall:rep-1",
          text: "Silence is data. It means the systems are boring, the deploys were clean, and nobody touched anything after four on a Friday. Boring is the trophy. You do not get suspicious of a quiet engine. You listen to it differently, and you keep the coffee warm anyway.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:oncall:rep-2",
          text: "Same as always. The pager is on the nightstand, volume at the level between 'doorbell' and 'apocalypse'. Eleven years of rotation trains the ear. I have woken for alerts that turned out to be rain on the window. The rain has never once been prod. But you check. Checking is the job.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:oncall:rep-3",
          text: "No. Not because you cannot. Because the rotation is not a learning tool, it is a liability assignment, and your curiosity is currently aimed at everything. Curiosity plus a pager at 3am is how interns become cautionary tales. Ask me again after the firewatch. The firewatch is daytime. The daytime forgives.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:oncall:rep-4",
          text: "2019. The night the monitoring AND the backup both died, in that order, like dominoes with seniority. Fixed by sunrise, documented never. There is a naming convention in the runbooks from that era: things are named after coffee drinks. The runbook called 'triple espresso' is why you have never seen a real outage. You are welcome. Drink your coffee.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:oncall:rep-5",
          text: "I glance. The glance is not worry, it is instrumentation. The mountain story is true — I checked the pager from a summit out of principle, saw silence, and enjoyed the view twice as much. Trust is not ignoring the pager. Trust is looking at it and expecting exactly what you find.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:oncall:rep-6",
          text: "Because the alerts are downstream and the logs are upstream. By the time a page fires, the story is three paragraphs old. I read the first paragraph while everyone else is being told the headline. It is not magic. It is reading. Nobody reads anymore, which is why my answers always look like prophecy.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "stats:high-focus"],
        },
      ],
    },
    {
      id: "marek:coffee",
      label: "The coffee intake",
      optionCandidates: [
        {
          id: "marek:coffee:opt-1",
          topicId: "marek:coffee",
          text: "How many coffees is a normal day for you?",
        },
        {
          id: "marek:coffee:opt-2",
          topicId: "marek:coffee",
          text: "The machine made you a weird one today.",
        },
        {
          id: "marek:coffee:opt-3",
          topicId: "marek:coffee",
          text: "Do you actually taste the coffee at cup eight?",
        },
        {
          id: "marek:coffee:opt-4",
          topicId: "marek:coffee",
          text: "Janusz's closet coffee. Verdict?",
        },
        {
          id: "marek:coffee:opt-5",
          topicId: "marek:coffee",
          text: "Decaf is supposedly an option now.",
        },
        {
          id: "marek:coffee:opt-6",
          topicId: "marek:coffee",
          text: "Is the mug on the printer yours?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:coffee:rep-1",
          text: "Undefined. The number people quote is a guess, the number I know is a floor, and the number Grazyna tracks is a ledger entry. Caffeine is not a habit at this altitude, it is infrastructure. You do not count how many times the server rack is plugged in. You check that it is.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:coffee:rep-2",
          text: "The machine has moods and I respect them. Today it gave me crema on the wrong side, which in machine dialect means 'descale me or file a ticket'. Neither will happen. The machine and I have an arrangement: it produces, I do not escalate. It is the most stable SLA in this building.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:coffee:rep-3",
          text: "Cup eight is not about taste, it is about temperature and consequence. The palate retired around cup four and the day runs on ritual after that. Somewhere around cup nine I solved a routing bug that had survived a month, which is either the caffeine or the walking to the machine. The walking does the thinking. The coffee gets the credit. It has earned it.",
          relationshipHint: "pleased",
          tags: ["stats:low-caffeine"],
        },
        {
          id: "marek:coffee:rep-4",
          text: "The closet coffee is not a beverage, it is a certification. Janusz brews it for floods, Christmas, and emergencies, and drinking it casually would dilute the brand. He offered me a cup in 2021. I sat down first. You sit down for that coffee. It is the only meeting I have ever arrived early to.",
          relationshipHint: "delighted",
          tags: ["quest:janusz-knows-the-plug", "relationship:neutral"],
        },
        {
          id: "marek:coffee:rep-5",
          text: "Decaf is a rumor started by the same people who invented 'work-life balance software'. The only decaf in this building belongs to the office itself and we treat it like the fire alarm: present, red, never yours. I have no opinion. I have a policy.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:coffee:rep-6",
          text: "The mug is the printer's now. I left it there in 2019 and everything since has been succession planning. Grazyna amortized it, Bartek built folklore around it, and Janusz dusts it on Tuesdays. You do not reclaim a mug that has become infrastructure. I drink from the spare. The spare knows its place.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:burek",
      label: "Marek and Burek",
      optionCandidates: [
        {
          id: "marek:burek:opt-1",
          topicId: "marek:burek",
          text: "Burek sleeps under your desk most days.",
        },
        {
          id: "marek:burek:opt-2",
          topicId: "marek:burek",
          text: "You take him to the server room. Why?",
        },
        {
          id: "marek:burek:opt-3",
          topicId: "marek:burek",
          text: "Does Burek actually understand the dashboards?",
        },
        {
          id: "marek:burek:opt-4",
          topicId: "marek:burek",
          text: "Who walks Burek when Marek is on call?",
        },
        {
          id: "marek:burek:opt-5",
          topicId: "marek:burek",
          text: "Burek barked at the new router.",
        },
        {
          id: "marek:burek:opt-6",
          topicId: "marek:burek",
          text: "Is it true he audits standup?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:burek:rep-1",
          text: "He sleeps where the temperature is stable and the vibration is honest. Under my desk is the only spot in this building that hits both. Also he trusts the person who is loudest and touches the least. I am both. The dog and I have a working agreement. Better terms than most vendors offer.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:burek:rep-2",
          text: "The room runs twelve degrees cool and silent except for fans. That is his natural habitat and my natural habitat, which is why we get along. He lies against the cold aisle and I read logs, and neither of us says anything for forty minutes. It is the best meeting on my calendar and it has never once been rescheduled.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:burek:rep-3",
          text: "He understands the ROOM, which is better. When the dashboard goes red, I go quiet in a specific way, and the dog reads the specific way. He does not know what an SLA is. He knows what my shoulders do. That is monitoring at a layer the vendors have not commercialized yet.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:burek:rep-4",
          text: "Janusz. Always Janusz. The rotation for the dog predates the rotation for the pager and has better documentation. There is a card system by the door — two magnets, green and gray. Green means walked. Gray means 'on call, be patient'. The dog reads the magnets. I have watched him read the magnets.",
          relationshipHint: "pleased",
          tags: ["quest:burek-fed"],
        },
        {
          id: "marek:burek:rep-5",
          text: "The dog flagged it before the vendor's own diagnostics did. Swapped the power brick, the barking stopped, and the packet loss stopped with it. I do not know what he hears. I know he is right, the way a smoke detector is right. You do not argue with a smoke detector. You thank it in treats.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:burek:rep-6",
          text: "Twelve sharp, under the table, one exhale when a forecast is optimistic. That exhale is more accurate than Przemek's spreadsheet and cheaper than the consultant who reviewed it. The audit is real. Attendance is optional. Believing it is not.",
          relationshipHint: "neutral",
          tags: ["quest:burek-standup-observed", "relationship:warm"],
        },
      ],
    },
    {
      id: "marek:automate",
      label: "What gets automated",
      optionCandidates: [
        {
          id: "marek:automate:opt-1",
          topicId: "marek:automate",
          text: "What have you automated that nobody knows about?",
        },
        {
          id: "marek:automate:opt-2",
          topicId: "marek:automate",
          text: "Why not automate the deploys fully?",
        },
        {
          id: "marek:automate:opt-3",
          topicId: "marek:automate",
          text: "Could a script do Pawel's backup job?",
        },
        {
          id: "marek:automate:opt-4",
          topicId: "marek:automate",
          text: "Ania wants marketing tasks automated.",
        },
        {
          id: "marek:automate:opt-5",
          topicId: "marek:automate",
          text: "Is there anything you refuse to automate?",
        },
        {
          id: "marek:automate:opt-6",
          topicId: "marek:automate",
          text: "The lights in the server room blink in a pattern.",
        },
      ],
      replyCandidates: [
        {
          id: "marek:automate:rep-1",
          text: "The Friday report writes itself at 17:02, in my tone, with my punctuation, and has done for four years. Nobody has noticed because the style never changed. That is the trick with automation: make it indistinguishable from stubbornness. The best scripts do not look like scripts. They look like discipline.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:automate:rep-2",
          text: "Fully automated deploys need fully automated tests, and the tests are the part nobody wrote. The deploy is two commands and a prayer; the test suite would be nine months of reconciliation with every shortcut Tomek ever shipped. I automate the prayer instead. It is a cron job. It has never missed.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:automate:rep-3",
          text: "The script already does the job. Pawel does the CARING. That is the part you cannot automate and the part that matters — someone has to notice the bucket stopped, or you back up nothing into nowhere for two years and call it a strategy. Pawel notices. Automate the labor, hire the noticing.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-read-the-script", "relationship:warm"],
        },
        {
          id: "marek:automate:rep-4",
          text: "Half of marketing already is automated and nobody told marketing. The scheduled posts, the engagement windows, the A/B rotation — that is cron with better fonts. I offered to automate the rest. She said the remaining half is 'the human part'. Fine. Keep the human part. It is the half that sells.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:automate:rep-5",
          text: "The coffee run and the keyboard. Some tasks exist to make the human walk somewhere and think about the problem without meaning to. Automate those and you do not save time, you delete thinking. The company has enough deleted thinking in the wiki. Four pages. All of it wrong.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:automate:rep-6",
          text: "That is the disk array's activity lights, and the pattern means queue depth. To you it is Christmas. To me it is a sentence being spelled slowly. It currently says 'healthy'. In 2022 it spelled a different word for six hours and that word is why there is a spare on the shelf. The lights talk. I listen. Everybody should listen to their hardware once.",
          relationshipHint: "neutral",
          tags: ["stats:high-focus"],
        },
      ],
    },
    {
      id: "marek:interns",
      label: "The intern archive",
      optionCandidates: [
        {
          id: "marek:interns:opt-1",
          topicId: "marek:interns",
          text: "How many interns have you survived?",
        },
        {
          id: "marek:interns:opt-2",
          topicId: "marek:interns",
          text: "The bucket incident. Tell me everything.",
        },
        {
          id: "marek:interns:opt-3",
          topicId: "marek:interns",
          text: "What makes an intern worth mentoring?",
        },
        {
          id: "marek:interns:opt-4",
          topicId: "marek:interns",
          text: "An intern deleted something once, did they not?",
        },
        {
          id: "marek:interns:opt-5",
          topicId: "marek:interns",
          text: "Why does nobody intern with you anymore?",
        },
        {
          id: "marek:interns:opt-6",
          topicId: "marek:interns",
          text: "Would you take Pawel on properly?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:interns:rep-1",
          text: "Nine. The archive is a single drawer: names, one lesson each, no photos. The drawer is the most honest HR document this company owns. Some of them run infrastructure for banks now. Two of them still email me on the anniversary of the bucket. You do not forget your worst Tuesday or the person who handed you the mop.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:interns:rep-2",
          text: "2020. Cooling pump leak, server room, and an intern who saw water near electricity and chose heroics. The bucket was the right instinct and the wrong socket. I killed the power from the door, we mopped together, and the lesson cost nothing but a Monday. The socket got a label. The label is now load-bearing in three runbooks.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:interns:rep-3",
          text: "One trait: they write down what I say. Not because I say much — because they noticed it is rationed. The interns who transcribe go far. The interns who debate go further. The interns who argue with me at nine am about a deploy get hired. The ones who silently agree get reference letters for jobs far away from me.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:interns:rep-4",
          text: "Dropped a table. One table. Restored from backup in eleven minutes and the backup had been tested that Friday by accident, which is the only reason I believe in testing by accident. The intern cried, I said 'the table is back and the crying is optional', and now she runs data for a logistics empire. Accidents are tuition. I collected.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:interns:rep-5",
          text: "Because word got out that the internship is quiet, technical, and occasionally terrifying, and the new generation wants standup decks and personal brands. Fine. But the ones who want the actual job find me anyway, usually after they read the wiki and get angry. Anger at bad documentation is the correct first emotion. It was mine.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:interns:rep-6",
          text: "He is past interning. The man kept a backup alive for two years out of pure stubbornness — that is not a skill you teach, that is a temperament you hire. What he needs is not a mentor, it is a mandate: one server, root access, and my phone number. The rest is him finding out what the pager sounds like. Everyone earns the pager.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-restore-drill"],
        },
      ],
    },
    {
      id: "marek:scale",
      label: "What scaling means",
      optionCandidates: [
        {
          id: "marek:scale:opt-1",
          topicId: "marek:scale",
          text: "Everyone says scale. What does it mean to you?",
        },
        {
          id: "marek:scale:opt-2",
          topicId: "marek:scale",
          text: "Have we ever actually scaled anything?",
        },
        {
          id: "marek:scale:opt-3",
          topicId: "marek:scale",
          text: "Maciek put SCALE on a slide. Thoughts?",
        },
        {
          id: "marek:scale:opt-4",
          topicId: "marek:scale",
          text: "What breaks first when we double?",
        },
        {
          id: "marek:scale:opt-5",
          topicId: "marek:scale",
          text: "Is scaling people different from scaling systems?",
        },
        {
          id: "marek:scale:opt-6",
          topicId: "marek:scale",
          text: "What is the opposite of scale?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:scale:rep-1",
          text: "Twice the load, same architecture, no new pages. That is the whole definition. Everyone else means 'more', which is not scale, it is volume, and volume is what marketing does. Scale is what happens when the graph goes up and the pager stays quiet. I have built scale exactly twice. Both times it looked like nothing. Nothing is the look.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:scale:rep-2",
          text: "Once. 2021, the training platform, three servers to six, load balanced, and not one client noticed, which is the point. It cost four weekends and zero glory and it has held for five years. Nobody puts that on a slide because nothing went wrong. The absence of incidents is the hardest thing to market.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:scale:rep-3",
          text: "The slide does not know what it is saying, which makes it honest. Every quarter the word changes and the infrastructure does not, because the infrastructure cannot hear the board. If the slide said 'the backup is tested' I would frame it. It will not. The slide sells futures. I maintain presents.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:scale:rep-4",
          text: "The coffee machine. Then the standup. Then, technically, the database. I have a document with the order and nobody has read it, which is correct — the document is for the Tuesday it happens, and reading it early would spoil the clarity. Doubling is a scheduled emergency. I have the schedule. The emergency has not read it yet.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:scale:rep-5",
          text: "People do not scale. They FORK. Every new hire is a branch of someone existing, and the company is the repo. You scale people by documenting the merges and pruning the dead branches, which is a sentence I will deny saying. But the architecture metaphor holds, and the maintenance burden is identical. Ask the calendar.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:scale:rep-6",
          text: "The founder's laptop. One machine, one person, everything personal, nothing reproducible. Every company starts there and spends a decade escaping it. We are mostly out. The last refuge is Grazyna's kitchen table, and she will modernize that when the building burns, and not one day before. Respect.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "marek:noise",
      label: "The open-plan noise",
      optionCandidates: [
        {
          id: "marek:noise:opt-1",
          topicId: "marek:noise",
          text: "Does the open office bother you?",
        },
        {
          id: "marek:noise:opt-2",
          topicId: "marek:noise",
          text: "Ania's playlist is a genre now.",
        },
        {
          id: "marek:noise:opt-3",
          topicId: "marek:noise",
          text: "The glass wall makes the CTO calls echo.",
        },
        {
          id: "marek:noise:opt-4",
          topicId: "marek:noise",
          text: "Should we get noise-cancelling headphones as standard?",
        },
        {
          id: "marek:noise:opt-5",
          topicId: "marek:noise",
          text: "Your keyboard at nine am is a siren.",
        },
        {
          id: "marek:noise:opt-6",
          topicId: "marek:noise",
          text: "Where do you go to actually think?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:noise:rep-1",
          text: "Noise is telemetry. The office pitch tells me the sprint state before standup does: high chatter means discovery, silence means deadlines, and a specific laughter means marketing closed something. I have never needed a status meeting. I have ears and a keyboard, and the keyboard is the loudest thing I own on purpose.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:noise:rep-2",
          text: "It loops every forty minutes and the forty minutes are always the same forty minutes. I have started timing my compile windows to it. The playlist is load-bearing now — the day it shuffles is the day the room feels wrong and prod feels far. Do not tell Ania she is infrastructure. She will make content about it.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:noise:rep-3",
          text: "The echo is the point of the glass. Maciek calls it transparency; acoustically it is broadcasting. I wired him a better headset in 2023, unlabeled, unbilled. The calls are quieter, the vision is unchanged. Some problems you do not escalate. You solder.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "marek:noise:rep-4",
          text: "Headphones are a tax on the open office and the open office is a tax on common sense, but fine — order them. Specify the model, or you get six different brands and six different mute behaviors, and then standup becomes an archaeological dig for who heard what. Standardize the silence or do not bother buying it.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:noise:rep-5",
          text: "It is not a siren. It is a broadcast with a schedule: nine means I am reading the overnight, eleven means deploy, and three means someone should have heard from me an hour ago. Regulars can tell the three-o'clock rhythm. Klaudia called it 'menacing productivity' once and used it in a post. The post did numbers. My keystrokes have reach now.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:noise:rep-6",
          text: "The stairwell, off-hours, third landing. The wifi does not reach and the building hum does — that hum is every system at once, and problems solve themselves against it. Burek knows the spot. We do not discuss it. A thinking spot stops working the moment it has a calendar invite.",
          relationshipHint: "neutral",
          tags: ["relationship:warm", "period:evening"],
        },
      ],
    },
    {
      id: "marek:weekend",
      label: "The weekend of Marek",
      optionCandidates: [
        {
          id: "marek:weekend:opt-1",
          topicId: "marek:weekend",
          text: "What does Marek do on a Saturday?",
        },
        {
          id: "marek:weekend:opt-2",
          topicId: "marek:weekend",
          text: "Is it true you restore old radios?",
        },
        {
          id: "marek:weekend:opt-3",
          topicId: "marek:weekend",
          text: "Do you ever get bored of computers?",
        },
        {
          id: "marek:weekend:opt-4",
          topicId: "marek:weekend",
          text: "Sunday evening. Honestly.",
        },
        {
          id: "marek:weekend:opt-5",
          topicId: "marek:weekend",
          text: "The mountain photo. Where is that?",
        },
        {
          id: "marek:weekend:opt-6",
          topicId: "marek:weekend",
          text: "Do you fix things for neighbors?",
        },
      ],
      replyCandidates: [
        {
          id: "marek:weekend:rep-1",
          text: "The garage, the workbench, and one machine that predates the internet's opinions. Saturday is for systems without tickets — things that break for physical reasons, with limits you can touch. A bearing wears. A capacitor dries. Nothing gaslights you. It is the most honest engineering left in my life and I do it with the radio on.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:weekend:rep-2",
          text: "True. Tube radios, mostly. Same principles as the server room: power in, signal shaped, silence as a spec. A 1958 unit plays after sixty years of neglect because someone over-engineered the power supply. I think about that a lot in this office, where nothing is over-engineered except the meetings.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:weekend:rep-3",
          text: "Never computers. Computers are colleagues. The garage is for machines that cannot lie about being broken — no stack traces, no heisenbugs, just a part that is visibly dead and costs four zloty. I fix three things a weekend and every fix STAYS fixed. Do you know what that does to a man's week? Ask my Monday mood.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:weekend:rep-4",
          text: "Six pm, one pass through the logs, nothing else. The pass is not anxiety, it is reconnaissance — Monday's first hour is written Sunday night. Then the laptop closes and stays closed, which is the whole discipline. The people who burn out are not the ones who check. They are the ones who never stop.",
          relationshipHint: "neutral",
          tags: ["period:evening"],
        },
        {
          id: "marek:weekend:rep-5",
          text: "Three hours out, one switchback from the refuge, exactly where the signal dies. I go there because the pager cannot, and the view is what silence looks like at scale. One photo a year, same rock. Klaudia offered to shoot it properly. The rock does not need branding. Neither do I.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:weekend:rep-6",
          text: "The street knows. Washing machines, one boiler, a TV from a decade that shall not be named. They pay in food and I accept in food, which is a better rate than any client offers. The last neighbor who tried to pay cash got his wifi renamed 'cash is for invoices'. It stuck. The whole street's wifi tells a story now.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "marek:cables",
      label: "The cable doctrine",
      optionCandidates: [
        { id: "marek:cables:opt-1", topicId: "marek:cables", text: "The cable drawer is locked. Why?" },
        { id: "marek:cables:opt-2", topicId: "marek:cables", text: "How do you tell the cables apart?" },
        { id: "marek:cables:opt-3", topicId: "marek:cables", text: "Someone used the yellow cable for power." },
        { id: "marek:cables:opt-4", topicId: "marek:cables", text: "Cable spaghetti — art or failure?" },
        { id: "marek:cables:opt-5", topicId: "marek:cables", text: "You coiled a cable like a rope. Method?" },
        { id: "marek:cables:opt-6", topicId: "marek:cables", text: "Do you label both ends? Always?" },
      ],
      replyCandidates: [
        {
          id: "marek:cables:rep-1",
          text: "Because the drawer was the crime scene twice. Cables migrate. A locked drawer is a cabinet with a policy. The key is on my hook. The hook is public. The policy is not. Borrowing is a conversation. The conversation has one word: return.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:cables:rep-2",
          text: "Blue moves data. Yellow moves power. Anything striped is a promise from a vendor I do not trust. The rest are sorted by length, coiled over-under, and tagged in handwriting that predates the label maker. The label maker was a gift. The handwriting is the system.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:cables:rep-3",
          text: "The yellow cable is power. Power in a data port is how Fridays become stories. It was found in time. The cable is fine. The lesson is now in the drawer, taped to the inside. Lessons live where the mistakes lived.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:cables:rep-4",
          text: "Neither. Spaghetti is a snapshot of a system under pressure. Behind every nest is a reason and a deadline. I untangle on Sundays, one bundle at a time, with a podcast. The nest is not art. It is unpaid debt. I pay it weekly, in silence, with velcro.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:cables:rep-5",
          text: "Over-under. The coil that never kinks. Every stagehand and every admin knows it. Learn it once and your cables live twice as long. There is a card in the drawer with a diagram. The diagram is old. The fold is old. The fold is correct.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:cables:rep-6",
          text: "Both ends, both sides, both languages — text and color. One label is a promise. Two labels are a contract. The cable that cannot be identified cannot be trusted, and the cable that cannot be trusted does not get to carry prod. This is the whole religion.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "marek:backups",
      label: "The backup creed",
      optionCandidates: [
        { id: "marek:backups:opt-1", topicId: "marek:backups", text: "Three-two-one backups. Do we actually follow it?" },
        { id: "marek:backups:opt-2", topicId: "marek:backups", text: "The backup ran on Friday. Verify or trust?" },
        { id: "marek:backups:opt-3", topicId: "marek:backups", text: "What is backed up that nobody thinks about?" },
        { id: "marek:backups:opt-4", topicId: "marek:backups", text: "A backup never restored — is it real?" },
        { id: "marek:backups:opt-5", topicId: "marek:backups", text: "Pawel's backup versus yours. Difference?" },
        { id: "marek:backups:opt-6", topicId: "marek:backups", text: "Where is the backup that survives the building?" },
      ],
      replyCandidates: [
        {
          id: "marek:backups:rep-1",
          text: "Followed, tested, and logged. Three copies, two media, one off-site. The off-site is the one people skip and the one the flood laughed at us about. Everything in this building can drown. The backup cannot. That is the whole architecture. The rest is decoration.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:backups:rep-2",
          text: "Verify. Trust is for people. The Friday run prints one line to my dashboard and I read the line like a heartbeat. Green means nothing. Restored-last-month means something. We do restore drills. Pawel ran the last one. He finished before the coffee cooled. The boy is ready.",
          relationshipHint: "neutral",
          tags: ["quest:pawel-read-the-script"],
        },
        {
          id: "marek:backups:rep-3",
          text: "The door codes, the coffee machine's schedule, and the records nobody has touched since 2019. Untouched things are the first things to rot. The backup does not care about importance. It cares about existence. If it exists, it gets copied. The philosophy fits in one line. It is taped above the desk.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:backups:rep-4",
          text: "It is a hope with a timestamp. Backups are not real until a restore has touched them. The first restore is the backup's birthday. Until then it is a rumor in cold storage. We drill quarterly. The drill is the difference between a backup and a superstition.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:backups:rep-5",
          text: "His is a promise kept by a boy. Mine is a system kept by a checklist. His runs on stubbornness, mine on schedules. The best backup is both: his stubbornness wrote the script. My checklist runs it. The combination is better than either. That is why the boy keeps the keys.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:backups:rep-6",
          text: "Two places: one in the cloud, one in a fireproof box that Grazyna trusts more than me. Both held during the flood. The building did not. That is the point of the exercise, and the exercise has been done. The next one is scheduled. The schedule is the real backup.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:deploy-freeze",
      label: "The deploy freeze",
      optionCandidates: [
        { id: "marek:deploy-freeze:opt-1", topicId: "marek:deploy-freeze", text: "A deploy freeze is announced. Real or political?" },
        { id: "marek:deploy-freeze:opt-2", topicId: "marek:deploy-freeze", text: "What does a freeze actually protect?" },
        { id: "marek:deploy-freeze:opt-3", topicId: "marek:deploy-freeze", text: "The freeze lifted early last time. Who decides?" },
        { id: "marek:deploy-freeze:opt-4", topicId: "marek:deploy-freeze", text: "Can hotfixes go out during a freeze?" },
        { id: "marek:deploy-freeze:opt-5", topicId: "marek:deploy-freeze", text: "The freeze week — what do engineers do?" },
        { id: "marek:deploy-freeze:opt-6", topicId: "marek:deploy-freeze", text: "Is a freeze just fear with a calendar?" },
      ],
      replyCandidates: [
        {
          id: "marek:deploy-freeze:rep-1",
          text: "Real, dated, and boring — which is what makes it work. Freezes are announced in writing, end in writing, and cover one thing only: changes that can wake the pager. The political freezes are the ones without end dates. Those are not freezes. Those are moods with authority. I do not sign moods.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:deploy-freeze:rep-2",
          text: "The baseline. A freeze is a bet that the system as-is survives the busy week better than the system-as-improved. Nine times out of ten the bet wins, because the improvement was a maybe and the baseline is a fact. Freezes do not stop progress. They stop UNTESTED progress from meeting holidays.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:deploy-freeze:rep-3",
          text: "Me, with one rule: the freeze lifts when the reason for the freeze is gone, not when the calendar says so. Last time the reason was a client launch. The launch moved up. The freeze moved up. The calendar is a servant. The reason is the boss. Anyone confused by this does not deploy.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:deploy-freeze:rep-4",
          text: "Yes — the freeze has one door and the door is labeled 'production is down'. Hotfixes walk through it with two witnesses, a rollback plan, and a note in the log. The freeze stops optimizations. It has never once stopped a fire. Fires have their own process, and the process is faster than policy.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:deploy-freeze:rep-5",
          text: "The work that was starved all quarter: tests, documentation debt, the monitoring nobody tunes. A freeze week is a maintenance week wearing a costume. The best engineers love freeze weeks. The rest discover that code was never the whole job. The system runs on the quiet work. Freeze weeks pay its wages.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:deploy-freeze:rep-6",
          text: "It is caution with a date, which is the only kind that scales. Fear has no end date, no owner, and no log. A freeze is the opposite: scoped, scheduled, reversible. The day I cannot tell fear from caution is the day I stop touching deploys. The calendar keeps them straight. The calendar is cheaper than therapy.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:vpn",
      label: "The VPN ritual",
      optionCandidates: [
        { id: "marek:vpn:opt-1", topicId: "marek:vpn", text: "The VPN drops every day at four. Coincidence?" },
        { id: "marek:vpn:opt-2", topicId: "marek:vpn", text: "Why is the VPN still required for one folder?" },
        { id: "marek:vpn:opt-3", topicId: "marek:vpn", text: "The VPN asked for a new certificate. Scam?" },
        { id: "marek:vpn:opt-4", topicId: "marek:vpn", text: "Can the VPN be faster? Ever?" },
        { id: "marek:vpn:opt-5", topicId: "marek:vpn", text: "An intern worked from a cafe. Through the VPN?" },
        { id: "marek:vpn:opt-6", topicId: "marek:vpn", text: "What does the VPN actually protect us from?" },
      ],
      replyCandidates: [
        {
          id: "marek:vpn:rep-1",
          text: "Not a coincidence. A scheduled certificate check wearing a bad reputation. It happens at four because I scheduled it at four, back when four was quiet. Four is no longer quiet. The schedule has moved. The reputation has not. Reputations outlive facts. Ask the printer.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:vpn:rep-2",
          text: "One folder, one legacy system, one certificate nobody wants to renew at scale. The folder holds the old training archive and the system holds it the way an elderly relative holds a house key: securely, inexplicably, and impossible to migrate. The VPN is the visit. We visit weekly.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:vpn:rep-3",
          text: "Not a scam — a ceremony. Certificates expire like milk and the warning arrives early, in boring font. Click, renew, forget. The scam version arrives with urgency and a gift card. The VPN version arrives with a countdown. Urgency is the scam's accent. Boredom is security's native tongue.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:vpn:rep-4",
          text: "It can, and the fix is unglamorous: a closer gateway, one line in a config, and an hour of testing. Speed is not a feature request. It is a maintenance ticket. The VPN is not slow. The VPN is far. Distance is physics. Physics does not take feature requests. It respects tickets.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:vpn:rep-5",
          text: "Through the VPN, on the laptop, with the certificate, over the cafe's coffee-shop network — which is exactly the scenario the VPN was bought for. The cafe is hostile territory. Every laptop is a diplomat abroad. The VPN is the embassy line. The intern did it right. I bought the second coffee.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:vpn:rep-6",
          text: "The distance between our files and everyone else. Not hackers in hoodies — the mundane army: the open cafe, the shared printer at the copy shop, the laptop left in a taxi. The VPN is a door that closes the doors we forgot. Unglamorous. Essential. The best security is the kind nobody notices working.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:passwords",
      label: "The password regime",
      optionCandidates: [
        { id: "marek:passwords:opt-1", topicId: "marek:passwords", text: "The password policy changed again. Why?" },
        { id: "marek:passwords:opt-2", topicId: "marek:passwords", text: "A shared password in a team channel. How bad?" },
        { id: "marek:passwords:opt-3", topicId: "marek:passwords", text: "You rotate the wifi password monthly. Cruel?" },
        { id: "marek:passwords:opt-4", topicId: "marek:passwords", text: "What makes a password strong in 2026?" },
        { id: "marek:passwords:opt-5", topicId: "marek:passwords", text: "The sticky note under the keyboard. Yours?" },
        { id: "marek:passwords:opt-6", topicId: "marek:passwords", text: "Password managers — finally standard here?" },
      ],
      replyCandidates: [
        {
          id: "marek:passwords:rep-1",
          text: "Because a policy that never changes is a policy nobody reads. The change was one line: longer, not weirder. Four random words beat one cryptic symbol every time. Length is strength. Theater is not. The policy got shorter the same day the passwords got longer. Both changes are permanent.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:passwords:rep-2",
          text: "It is a house key taped to the front door with a sign saying 'front door'. The channel is searchable, backed up, and archived forever. The password is dead the moment it ships. Rotate it, find the owner, and hand them the manager app. The app has a sharing feature. Sharing exists so channels do not have to.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:passwords:rep-3",
          text: "Cruel would be one password forever — that is cruel to the future, who inherits the breach. The rotation is one line in the morning log and one message from the printer's best friend: me. The office complains for a day, connects in a minute, and forgets by lunch. Security is a rhythm.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:passwords:rep-4",
          text: "Long, unique, and boring. Four unrelated words, twenty characters, nothing a stranger could guess and nothing you would reuse. The strong password is not clever. It is unmemorable on purpose and stored by a machine that never forgets. Cleverness is the vulnerability. Boring is the armor.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:passwords:rep-5",
          text: "Mine is the one that says 'nothing'. It is a decoy I planted in 2022 and no one has fallen for it. The real credentials live in the manager, the manager lives behind two factors, and the two factors live on my keyring and my person. The sticky note is a honeypot. The honeypot is retired. Kept for aesthetics.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:passwords:rep-6",
          text: "Standard, mandatory, and finally boring — which is how you know it works. The manager remembers everything, generates everything, and forgets nothing. The office went from eleven passwords to one, and the one is guarded by two factors and a fingerprint. Boring passwords are strong passwords.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:server-room",
      label: "The warm room rules",
      optionCandidates: [
        { id: "marek:server-room:opt-1", topicId: "marek:server-room", text: "The server room is cold. Deliberately?" },
        { id: "marek:server-room:opt-2", topicId: "marek:server-room", text: "What are the rules inside the server room?" },
        { id: "marek:server-room:opt-3", topicId: "marek:server-room", text: "Why does the floor have a taped line?" },
        { id: "marek:server-room:opt-4", topicId: "marek:server-room", text: "The rack hums in a different key on Thursdays." },
        { id: "marek:server-room:opt-5", topicId: "marek:server-room", text: "Can I photograph the server room? For content." },
        { id: "marek:server-room:opt-6", topicId: "marek:server-room", text: "What lives in the server room besides servers?" },
      ],
      replyCandidates: [
        {
          id: "marek:server-room:rep-1",
          text: "Cold is not a vibe. It is a requirement with a thermometer. The room holds eighteen degrees because the machines run warmer than the humans and complain less often. The cold is the machines being comfortable. Humans are guests. Guests bring jackets.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:server-room:rep-2",
          text: "Three: nothing on top of the racks, nothing liquid past the line, and nothing unplugged without a conversation. The rules fit on one card by the door. The card has survived three audits and one intern. The rules are short because short rules get followed. Followed rules are rules.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:server-room:rep-3",
          text: "The line is the water line — past it, drinks exist; behind it, drinks do not. The tape is four years old and has never once been argued with. The line works because the line is simple. Security that needs explanation fails. Tape needs no explanation. Tape is the best policy I administer.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:server-room:rep-4",
          text: "Thursday is the backup verification window. The hum changes because the disks are being read honestly for one hour. That hum is my favorite sound in the building. It is the sound of promises being checked. You can hear the difference. Most people cannot. Most people have not listened.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:server-room:rep-5",
          text: "No. Not for secrets — for the bolted rack, the taped line, and the hundred cables that a photo will make look like chaos. Photos flatten. The room is not flat. The room is a system with a topology. Ania can have the door shot. The door is photogenic. The door says nothing and ruins nothing.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:server-room:rep-6",
          text: "The dehumidifier Janusz services, one chair that should not exist but does, and the fire suppressant nobody hopes to meet. Also, most evenings, a dog. The dog is not on the asset register. The dog is on the SCHEDULE. Different documents. Both are respected.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:alerts",
      label: "Alert hygiene",
      optionCandidates: [
        { id: "marek:alerts:opt-1", topicId: "marek:alerts", text: "Forty alerts a day. Which do I read?" },
        { id: "marek:alerts:opt-2", topicId: "marek:alerts", text: "You deleted twenty alert rules. Justify." },
        { id: "marek:alerts:opt-3", topicId: "marek:alerts", text: "An alert fired at 3am for nothing. Fix?" },
        { id: "marek:alerts:opt-4", topicId: "marek:alerts", text: "What makes an alert worth waking a human?" },
        { id: "marek:alerts:opt-5", topicId: "marek:alerts", text: "The team mutes alerts. Failure or adaptation?" },
        { id: "marek:alerts:opt-6", topicId: "marek:alerts", text: "Design me an alert. The perfect one." },
      ],
      replyCandidates: [
        {
          id: "marek:alerts:rep-1",
          text: "Read the one that repeats. A single alert is weather. A pattern is climate. The dashboard is not a novel — it is a pulse. Read the pulse daily and the details weekly. Alert fatigue is not a volume problem. It is a reading problem. Read less, but read the right less.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:alerts:rep-2",
          text: "They tested nothing and watched everything. Twenty rules, zero pages in six months — that is not monitoring, that is decor. Deleting an alert is a promise: if it matters, it will come back with evidence. Two have come back. Both mattered. The other eighteen were noise with job titles.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:alerts:rep-3",
          text: "Then the threshold is a liar and the alert is fired before the lie. Fix the threshold, not the human. Every false page spends trust the real page will need. The three am alert for nothing is an invoice. Someone pays it. The currency is sleep. Tune accordingly.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:alerts:rep-4",
          text: "Three things: it is actionable, it is urgent, and it is rare. Actionable means a human can do something. Urgent means the something is now. Rare means the pager is not a subscription. An alert missing any of the three is a message, and messages can wait for morning. Morning is a feature.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:alerts:rep-5",
          text: "Adaptation, with a diagnosis underneath. Muting is a symptom of alerts that cry wolf — the team did not fail, the thresholds did. I would rather have honest muting than dishonest nodding. The fix is not discipline. The fix is fewer, better alerts. Then the muting lifts on its own. It always does.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral", "period:morning"],
        },
        {
          id: "marek:alerts:rep-6",
          text: "One line: what broke, who it woke, and what they should do. No dashboards, no colors, no essays. 'Queue depth high. Check worker three. If stuck, restart — it has restarted before.' An alert is a telegram, not a letter. Write telegrams. The pager has no patience and neither does the person holding it.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:hostnames",
      label: "The hostname map",
      optionCandidates: [
        { id: "marek:hostnames:opt-1", topicId: "marek:hostnames", text: "Your servers are named after mountains. Why?" },
        { id: "marek:hostnames:opt-2", topicId: "marek:hostnames", text: "Which machine is K2 and why?" },
        { id: "marek:hostnames:opt-3", topicId: "marek:hostnames", text: "Can I name the new server? Procedure?" },
        { id: "marek:hostnames:opt-4", topicId: "marek:hostnames", text: "The hostname scheme predates you. Keep?" },
        { id: "marek:hostnames:opt-5", topicId: "marek:hostnames", text: "A server got renamed mid-year. Chaos?" },
        { id: "marek:hostnames:opt-6", topicId: "marek:hostnames", text: "What do the names say about the fleet?" },
      ],
      replyCandidates: [
        {
          id: "marek:hostnames:rep-1",
          text: "Mountains climb, hold weather, and outlast the people who name them. Machines do two of the three. The names came from a map on the wall of the old office, and the map moved here before I did. Naming is documentation that reads itself. Everyone remembers a mountain. Nobody remembers a server number.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:hostnames:rep-2",
          text: "K2 is the oldest machine still carrying prod. Hard to climb, impossible to ignore, and it has never once lost a pod in a storm. The name is a performance review it passes quarterly. When K2 retires, the name retires with the machine. Names are not reusable. Reused names haunt logs.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:hostnames:rep-3",
          text: "Procedure: one name, one mountain, one line in the map saying what it does. The map hangs by the rack and the map is the constitution. Claimed names go on the wall in pencil first. Pencil means candidate. Ink means production. The process takes one day and has survived nine years without a fight.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:hostnames:rep-4",
          text: "Keep. The scheme is load-bearing folklore — support tickets say 'Annapurna is slow' and everyone knows the machine, the mood, and the maintenance window. A naming convention is a language. Migrating languages costs a year of confusion for nothing. The mountains stay. The tickets stay readable.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:hostnames:rep-5",
          text: "It was not chaos, it was a wedding — the machine moved from staging to prod and took its name with an honorific. Renaming a running machine is a crime. Renaming in the map, with a note, is a ceremony. The map records it. The logs adjust. The mountain grew a title. Nobody was harmed.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:hostnames:rep-6",
          text: "That the fleet is a range — some names are easy hills that host the test environments, and some are the ones you do not rename. The map has a legend now: green for quiet, orange for moody, red for 'check before you touch'. The legend is the fleet's personality inventory. It has never been wrong.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:home-rack",
      label: "The home rack",
      optionCandidates: [
        { id: "marek:home-rack:opt-1", topicId: "marek:home-rack", text: "You have a server rack at home. How big?" },
        { id: "marek:home-rack:opt-2", topicId: "marek:home-rack", text: "The home rack serves the house. What runs?" },
        { id: "marek:home-rack:opt-3", topicId: "marek:home-rack", text: "Power bill versus the rack. Grazyna knows?" },
        { id: "marek:home-rack:opt-4", topicId: "marek:home-rack", text: "The rack hums at night. Sleep situation?" },
        { id: "marek:home-rack:opt-5", topicId: "marek:home-rack", text: "Could the home rack host the office backup?" },
        { id: "marek:home-rack:opt-6", topicId: "marek:home-rack", text: "What happens to the rack during a power cut?" },
      ],
      replyCandidates: [
        {
          id: "marek:home-rack:rep-1",
          text: "Twelve units, secondhand, every one with a story and a dent. The rack is the garage's quieter sibling. It runs the house, the drills, and one weather station that has outlived three vendors. Half of it was salvaged. All of it is paid for. Free hardware is the only hardware that sleeps well.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:home-rack:rep-2",
          text: "Media for the house, DNS for everything, the weather station, and one machine that exists purely to test restores. The house does not know it lives in a data center. The house thinks it is magic. The magic is a rack and a label maker. Every home deserves one. Most get a drawer of remotes instead.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:home-rack:rep-3",
          text: "She knows. The bill is filed under 'home infrastructure' with a note that says 'cheaper than a shed'. The note is legally load-bearing. The rack is efficient, the hardware is old, and it draws less than the kettle fleet upstairs. The audit takes one minute a year. The minute has never surprised her.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:home-rack:rep-4",
          text: "The hum is a lullaby with a schedule. The fans idle at night, the disks sleep, and the room holds a hum that says 'everything is fine' in a frequency I have known for years. Guests ask about the noise once. They never ask twice. The hum is honest company. It has never lied about anything.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:home-rack:rep-5",
          text: "It already does — tertiary copy, encrypted, tested twice a year, and the restore drill runs from here. The flood proved the office can drown. The home rack is the ark. Grazyna calls it 'the third location' and pays the electricity difference. The ark is on the books. Boring is the point.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books", "relationship:neutral"],
        },
        {
          id: "marek:home-rack:rep-6",
          text: "The rack sleeps, the house notices, and the battery holds the DNS for four hours, which is four hours longer than the street. The power cut is the drill the drill cannot schedule. I log every one. The log says the house has been down eleven minutes in three years. Nobody complained. The house is tough.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:logs",
      label: "Reading logs",
      optionCandidates: [
        { id: "marek:logs:opt-1", topicId: "marek:logs", text: "You read logs like tea leaves. Teach me." },
        { id: "marek:logs:opt-2", topicId: "marek:logs", text: "What do the logs say about the office at night?" },
        { id: "marek:logs:opt-3", topicId: "marek:logs", text: "A log line changed shape. Meaning?" },
        { id: "marek:logs:opt-4", topicId: "marek:logs", text: "The logs found a problem before the alert. How?" },
        { id: "marek:logs:opt-5", topicId: "marek:logs", text: "Should logs be kept forever? Storage says no." },
        { id: "marek:logs:opt-6", topicId: "marek:logs", text: "What is in the log that nobody ever reads?" },
      ],
      replyCandidates: [
        {
          id: "marek:logs:rep-1",
          text: "Timestamps first, changes second, adjectives never. Logs do not tell stories — they tell sequences. Read the sequence and the story writes itself. Two errors close together are a cause. Two errors far apart are a coincidence. The skill is not reading. The skill is noticing the distance between lines.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:logs:rep-2",
          text: "The building breathes in scheduled jobs — backups at two, the vacuum at three, one printer check at four that fails on purpose to prove the check works. The night logs are the most honest thing in this company. Nothing performs for an audience of nobody. The night logs are the office's diary.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:logs:rep-3",
          text: "A changed line is a changed world — new version, new dependency, or new intern. Shape in a log is not decoration, it is a difference. Before you read the line, read what changed. The line is a symptom. The change is the biography. I keep a changelog of the logs. The meta has paid for itself twice.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:logs:rep-4",
          text: "Because the logs are upstream and the alerts are downstream. The alert fires when the user feels it. The log whispers when the system thinks it. Reading logs daily is listening at the source. The problem I catch in logs is small. The same problem in alerts is loud. Small is cheaper. I buy small.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:logs:rep-5",
          text: "No — logs have lifecycles like everything else. Hot for a week, warm for a month, cold for a year, then compressed into the summary that future archaeologists will actually read. Keeping everything forever is hoarding with a budget. The summary keeps the lesson. The noise can rest. Noise has done its job.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:logs:rep-6",
          text: "The 2019 entry where the printer printed one page by itself and the system logged 'unexpected success'. That line is the funniest thing this office has produced and the most accurate. It is annotated in three handwriting styles now. It will outlive the printer. Some lines are load-bearing. That one holds up the wall.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:maintenance-window",
      label: "The maintenance window",
      optionCandidates: [
        { id: "marek:maintenance-window:opt-1", topicId: "marek:maintenance-window", text: "Maintenance at 3am. Why not 3pm?" },
        { id: "marek:maintenance-window:opt-2", topicId: "marek:maintenance-window", text: "The window is thirty minutes. Tight?" },
        { id: "marek:maintenance-window:opt-3", topicId: "marek:maintenance-window", text: "What if the maintenance runs long?" },
        { id: "marek:maintenance-window:opt-4", topicId: "marek:maintenance-window", text: "Do you sleep before the maintenance window?" },
        { id: "marek:maintenance-window:opt-5", topicId: "marek:maintenance-window", text: "The client never notices the window. Success?" },
        { id: "marek:maintenance-window:opt-6", topicId: "marek:maintenance-window", text: "What gets done in the window that cannot wait?" },
      ],
      replyCandidates: [
        {
          id: "marek:maintenance-window:rep-1",
          text: "Because three pm has users and three am has only ghosts. The window is when the system can be honest without an audience. Work on a living system is surgery — you schedule it when the patient sleeps. Three am is not tradition. It is anesthesia.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:maintenance-window:rep-2",
          text: "Tight on purpose. A long window invites a long list, and a long list invites the second restart. Thirty minutes forces the plan to be honest: two changes maximum, tested twice, with one rollback that has rehearsed. The window is a budget. Budgets are the only reason anything ships clean.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:maintenance-window:rep-3",
          text: "Then the rollback fires at minute thirty-one and the sunrise finds us boring. The window has a hard stop because fatigue makes promises the hands cannot keep. Running long is not dedication. It is a second incident wearing a lanyard. The stop is the discipline. The discipline is why I hold the window.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:maintenance-window:rep-4",
          text: "An hour. The body is a system and the system has maintenance too. A tired admin at three am is a second risk on top of the first. Coffee is not a plan. Sleep is the plan. The coffee is the reward. I have never once confused the two, and the record shows zero three am mistakes since the rule.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:maintenance-window:rep-5",
          text: "Success and silence — the best maintenance is a rumor. The client wakes to a system that is faster, patched properly, and exactly the same. Nobody thanks the window. Nobody should. The window is the invoice where the price is paid in sleep and the receipt is an unremarkable Tuesday.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:maintenance-window:rep-6",
          text: "The things that need the system asleep: kernel updates, disk moves, the one cable reroute that requires an empty room. Everything else has a daytime path. The window is expensive — it costs my night — so the window is reserved for work that pays rent. The rent is a system that never surprises anyone at noon.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:uptime",
      label: "The uptime streak",
      optionCandidates: [
        { id: "marek:uptime:opt-1", topicId: "marek:uptime", text: "The uptime counter on the wall. Counting what?" },
        { id: "marek:uptime:opt-2", topicId: "marek:uptime", text: "Uptime at all costs? Even maintenance?" },
        { id: "marek:uptime:opt-3", topicId: "marek:uptime", text: "The streak broke once. Tell it honestly." },
        { id: "marek:uptime:opt-4", topicId: "marek:uptime", text: "Does uptime matter to the client, really?" },
        { id: "marek:uptime:opt-5", topicId: "marek:uptime", text: "Availability versus freshness — pick one." },
        { id: "marek:uptime:opt-6", topicId: "marek:uptime", text: "The uptime philosophy in one line." },
      ],
      replyCandidates: [
        {
          id: "marek:uptime:rep-1",
          text: "Days since the training platform last surprised a user. Not since a crash — since a surprise. The counter is not about heroic servers. It is about boring ones. Boring is the metric. The number on the wall is a promise the office keeps to people it has never met. The most honest decoration in the building.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:uptime:rep-2",
          text: "No — uptime at all costs is how you get an unpatched museum. The counter excludes planned windows by design. The streak measures surprises, not maintenance. Patching IS uptime practice. The wall counts the promise. The window keeps it. The two disagree politely and the client never notices.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:uptime:rep-3",
          text: "Day two hundred and six, a storage driver, eleven minutes, and a postmortem that is still the best document in the drawer. The counter reset. The lessons did not. A streak that never breaks has never been tested. The break taught the fleet more than the streak did. It is framed. The postmortem, not the streak.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:uptime:rep-4",
          text: "It does not matter until it matters, and then it is the only thing that matters. Nobody calls to praise the system that works. Everyone calls the day it does not. Uptime is a product feature with no sales page. The counter on the wall is the sales page. It has closed two renewals I know of.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:uptime:rep-5",
          text: "Wrong question — the real pick is between surprise and schedule. Freshness on a schedule is availability with a haircut. Freshness by surprise is an outage with ambition. I pick the schedule every time. The haircut grows back. The outage does not. Every engineer learns this. The good ones learn it cheap.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:uptime:rep-6",
          text: "Boring is the goal, windows are the price, and the counter keeps us honest. That is the whole creed. It fits on the wall, it survives an audit, and it has never once needed a footnote. The day it needs a footnote, the philosophy changes in public, with a date. That is what the log is for.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:firmware",
      label: "The firmware doctrine",
      optionCandidates: [
        { id: "marek:firmware:opt-1", topicId: "marek:firmware", text: "You never auto-update firmware. Doctrine?" },
        { id: "marek:firmware:opt-2", topicId: "marek:firmware", text: "The vendor pushed an update overnight. Audit?" },
        { id: "marek:firmware:opt-3", topicId: "marek:firmware", text: "Firmware fixed one bug and broke a device. Story?" },
        { id: "marek:firmware:opt-4", topicId: "marek:firmware", text: "How do you test firmware before prod?" },
        { id: "marek:firmware:opt-5", topicId: "marek:firmware", text: "The update note said 'improvements'. Decode." },
        { id: "marek:firmware:opt-6", topicId: "marek:firmware", text: "Is skipping updates ever the right call?" },
      ],
      replyCandidates: [
        {
          id: "marek:firmware:rep-1",
          text: "Auto means the vendor chooses the timing, and timing is the whole art. Updates land in windows or they do not land. The doctrine is one line: nothing changes itself. Change is a decision, decisions have owners, and owners have windows. Auto-update removes all three. The doctrine stays.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:firmware:rep-2",
          text: "Audited, in order: what changed, who it broke publicly, and what it fixes that we suffer from. Two yeses and one no and it waits for the window. The changelog is a confession from the vendor. Read the confession. The vendor confesses most in the footnotes. Footnotes are where the bodies are.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:firmware:rep-3",
          text: "Not the printer — the printer is retired and sacred. But the plotter, 2021: the update fixed a spooling bug and revoked the network stack's citizenship. Two days of cable diplomacy to recover. The lesson lives on the wall: firmware gives the fix and takes the stack. The wall is wise.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:firmware:rep-4",
          text: "On the sacrificial unit — the one machine that exists to be wrong first. Same hardware, no clients, one job: meet the firmware before prod does. The sacrificial unit has taken seven bullets. Prod has taken none. The unit is the best hire this office never made. It works nights. It never complains.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:firmware:rep-5",
          text: "'Improvements' means 'we changed things we will describe if asked'. Decode by asking: what improved, for whom, measured how. Silence on any of the three is a no until the window. Vague changelogs are the vendor telling you they do not know. Vendors who do not know should not drive your machines.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:firmware:rep-6",
          text: "Yes, once a year at least — when the machine is isolated, load-bearing, and boring. A system that works, does one thing, and touches nothing external does not need the vendor's adventure. Patch the perimeter, freeze the core. The core has one job. The job does not include novelty.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "marek:ticket-queue",
      label: "The ticket queue",
      optionCandidates: [
        { id: "marek:ticket-queue:opt-1", topicId: "marek:ticket-queue", text: "How many tickets are actually open right now?" },
        { id: "marek:ticket-queue:opt-2", topicId: "marek:ticket-queue", text: "A ticket has been open since February." },
        { id: "marek:ticket-queue:opt-3", topicId: "marek:ticket-queue", text: "You closed eleven tickets in one hour yesterday." },
        { id: "marek:ticket-queue:opt-4", topicId: "marek:ticket-queue", text: "Zosia wants queue metrics for the town hall." },
        { id: "marek:ticket-queue:opt-5", topicId: "marek:ticket-queue", text: "Pawel triaged the queue without asking. Verdict?" },
        { id: "marek:ticket-queue:opt-6", topicId: "marek:ticket-queue", text: "What makes a ticket actually good?" },
      ],
      replyCandidates: [
        {
          id: "marek:ticket-queue:rep-1",
          text: "Fourteen. Three are real, nine are one-line fixes people could do themselves if they read the KB article that explains it, and two are wishes wearing costumes. The queue is fine. The queue is always fine. The queue is a mirror and nobody likes what mirrors say.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:ticket-queue:rep-2",
          text: "That ticket is not open. That ticket is a resident. It has tenure, a chair, opinions. It is the request to make the training room projector remember the laptop, and the projector will remember nothing because the projector is from 2014 and remembers only the war. Closing it means replacing the projector. Nobody wants the truth. The ticket stays.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:ticket-queue:rep-3",
          text: "Ten were the same ticket filed by ten people who sit in the same room. One was real. The queue rewards people who check whether their problem has a name before they give it a costume. I left the ten a KB article and the one a fix. Justice is making the quiet workers famous and the loud ones literate.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:ticket-queue:rep-4",
          text: "She gets three numbers: open, opened this week, closed this week. Not the average handle time. That number makes people hurry, and hurried fixes are tomorrow's incidents with better paperwork. She accepted it. First manager in five years to accept three numbers. There may be hope for the species.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:ticket-queue:rep-5",
          text: "He labeled them, deduped them, and left one comment per ticket that was actually a question worth asking. The queue lost forty percent of its noise and I lost nothing. Told him the second rule of the queue: never close what you can shrink. He wrote it on a sticky note. The sticky note is on his monitor. The kid has a future in demolition.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-apprentice"],
        },
        {
          id: "marek:ticket-queue:rep-6",
          text: "One sentence: what you saw, what you expected, what you did. No essays, no theories about the cloud, no 'urgent' in the title — urgent is a property of the system, not of your morning. If the ticket names the actual symptom, I fix it in minutes. If it names a theory, we both waste an afternoon. Write what happened. The diagnosis is my job.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:wifi-map",
      label: "The wifi map",
      optionCandidates: [
        { id: "marek:wifi-map:opt-1", topicId: "marek:wifi-map", text: "There is a hand-drawn wifi map taped in the closet?" },
        { id: "marek:wifi-map:opt-2", topicId: "marek:wifi-map", text: "Why is the wifi weak by the window?" },
        { id: "marek:wifi-map:opt-3", topicId: "marek:wifi-map", text: "The map has a dead zone marked in red ink." },
        { id: "marek:wifi-map:opt-4", topicId: "marek:wifi-map", text: "Klaudia filmed a reel about the wifi map." },
        { id: "marek:wifi-map:opt-5", topicId: "marek:wifi-map", text: "Maciek asked why we do not just add an access point." },
        { id: "marek:wifi-map:opt-6", topicId: "marek:wifi-map", text: "Teach me to map wifi like you." },
      ],
      replyCandidates: [
        {
          id: "marek:wifi-map:rep-1",
          text: "Not hand-drawn. Hand-MEASURED. Two hundred and six points, one laptop, one Sunday. The signal lies at the desk and tells the truth in the doorway, so you measure standing where the people stand, not where the floor plan wishes they stood. The map is taped where only I go. If it were public, people would argue with it. Nobody argues with a closet.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:wifi-map:rep-2",
          text: "Because the window is not the problem. The wall beside the window is load-bearing and full of steel, and steel eats 5 GHz like breakfast. People blame the window because windows are visible and walls are not. The physics does not care about your view of the street. Move two meters left and the internet forgives you.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:wifi-map:rep-3",
          text: "That is the printer corner. Ink absorbs signal — nobody knows why, including me, and I have measured it four times. The red ink is honest. Every office has one spot where the laws of networking go to think. Ours is where the paper lives. I do not fix it. I document it. Documentation of mysteries is the closest we get to wisdom.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:wifi-map:rep-4",
          text: "She called it 'infrastructurecore' and the video did numbers. Fine. The map became content. Two clients asked if our wifi consultancy does offices. We do not. I do offices. One office. Mine. She has promised to blur the red zone in future edits. She will not remember. The dead zone keeps its secrets.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:wifi-map:rep-5",
          text: "An access point adds signal. It does not add sense. Two radios on the same channel shake hands badly and everyone's video call stutters worse than the dead zone ever was. I told him: signal is cheap, coordination is expensive. He bought the phrase. It will be in a keynote by spring and I will get no credit, which is correct. Credit does not route packets.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:wifi-map:rep-6",
          text: "Walk the rooms where humans sit. Stand where they stand. Hold the laptop the way they hold it — at chest height, slightly judging. Write the number, move three steps, repeat until the building is understood. Then draw it by hand, because drawing teaches you the shape the numbers hide. Takes a Sunday. Lasts five years. Bring coffee and no optimism.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-apprentice"],
        },
      ],
    },
    {
      id: "marek:shadow-it",
      label: "The shadow IT",
      optionCandidates: [
        { id: "marek:shadow-it:opt-1", topicId: "marek:shadow-it", text: "You found another rogue device on the network?" },
        { id: "marek:shadow-it:opt-2", topicId: "marek:shadow-it", text: "Is shadow IT always bad, though?" },
        { id: "marek:shadow-it:opt-3", topicId: "marek:shadow-it", text: "The smart bulbs in the ceiling — yours or Maciek's?" },
        { id: "marek:shadow-it:opt-4", topicId: "marek:shadow-it", text: "Tomek installed a database on his laptop. Again." },
        { id: "marek:shadow-it:opt-5", topicId: "marek:shadow-it", text: "Grazyna's candle business runs on office wifi?" },
        { id: "marek:shadow-it:opt-6", topicId: "marek:shadow-it", text: "How do you actually stop shadow IT?" },
      ],
      replyCandidates: [
        {
          id: "marek:shadow-it:rep-1",
          text: "A smart kettle. Someone streamed their kettle's telemetry through our network. It boiled at 6:50 every morning, which is commendable discipline for a kettle and a felony for a network. The kettle is registered now. The kettle has a hostname. I have made peace with the kettle. The kettle will not make me say this twice.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:shadow-it:rep-2",
          text: "Shadow IT is how every real tool was born. Someone smuggled something past process because process was slower than the problem. Half my own scripts started life outside the approved path. The crime is not the tool. The crime is the silence. Bring the smuggled thing into the light and I will either bless it or bury it. Both are better than a secret.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:shadow-it:rep-3",
          text: "Maciek's. He calls it 'ambient infrastructure'. I call it four unmanaged radios competing for channel 6 like it is a boxing ring. They flash amber when a deadline is near, which the team loves, which is the only reason they still glow. Registered, segmented, named after Greek letters. The kingdom is now a province. He took it well. For a king.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:shadow-it:rep-4",
          text: "The database is fine. The database is well-configured. The database is also one spilled coffee away from being the only copy of a demo that closes a client. I gave him an encrypted disk, a backup script, and one sentence: your laptop is a car, not a warehouse. He now backs up. Suspiciously well. Possibly the backup script is better than mine. I check sometimes. It is not. Good.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:shadow-it:rep-5",
          text: "Her candle laptop is on the guest network under the strictest hostname policy in this building — 'CANDLE-OPS-1' — and it has never once caused a problem, because Grazyna treats technology the way she treats money: carefully, on schedule, with suspicion. Shadow IT is a discipline problem, not a device problem. Her devices have more discipline than most staff.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:shadow-it:rep-6",
          text: "You do not stop it. You make the front door faster than the window. Every shadow tool is a vote that the official path is too slow, so I read the votes and fix the paths — faster access requests, a real service catalog, answers in hours not weeks. The shadow fades when the light works. Confiscation just makes better smugglers. Ask the printer. Ask anyone.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:helpdesk-manners",
      label: "The helpdesk manners",
      optionCandidates: [
        { id: "marek:helpdesk-manners:opt-1", topicId: "marek:helpdesk-manners", text: "You were polite to a user today. Witnesses fainted." },
        { id: "marek:helpdesk-manners:opt-2", topicId: "marek:helpdesk-manners", text: "How do you deal with people who say it is URGENT?" },
        { id: "marek:helpdesk-manners:opt-3", topicId: "marek:helpdesk-manners", text: "Someone described the problem as 'the internet is broken'." },
        { id: "marek:helpdesk-manners:opt-4", topicId: "marek:helpdesk-manners", text: "Pawel is learning your helpdesk voice." },
        { id: "marek:helpdesk-manners:opt-5", topicId: "marek:helpdesk-manners", text: "Zosia asked you to smile more at users." },
        { id: "marek:helpdesk-manners:opt-6", topicId: "marek:helpdesk-manners", text: "Ever lost your temper at a user? Honestly?" },
      ],
      replyCandidates: [
        {
          id: "marek:helpdesk-manners:rep-1",
          text: "The user's daughter was in hospital and the laptop would not connect to the wifi for the video call. I sat down, fixed it, wrote the steps on a sticky note, and left. Manners are not personality. Manners are reading the room and matching it. The room said quiet competence. Everyone fainted because they assume I cannot read rooms. I choose not to most days.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:helpdesk-manners:rep-2",
          text: "I ask one question: 'urgent compared to what?' Not to be cruel. To be accurate. Every ticket is urgent at 9:04 when the meeting starts at 9:00, and none are urgent at 16:00 when the pub is open. Real urgency has a number in it — money, people, deadline. The rest is adrenaline. I triage adrenaline last. The queue thanks me. Nobody else does.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:helpdesk-manners:rep-3",
          text: "'The internet is broken' is a sentence with no nouns in it. I ask: what were you trying to do, what happened instead, does it happen on your phone. Three questions and the vague ocean becomes a specific lake. People do not describe systems badly because they are stupid. They describe them badly because nobody ever taught them the shape of a system. That is my job too. Slightly.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:helpdesk-manners:rep-4",
          text: "He has the voice already — the calm one that asks the second question. What he lacks is the pause before answering, the two seconds that tell the user their problem was heard before it was solved. Told him once. He does the pause now like it is a codec setting. The users report he is 'so patient'. He is not patient. He is precise at human speed. Close enough.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-apprentice"],
        },
        {
          id: "marek:helpdesk-manners:rep-5",
          text: "I smiled. Once. On a Tuesday. Renata has the photo. The ticket got fixed in four minutes and the user asked if I was unwell, which — fair. My face is not the service. The fix is the service. She knows this, I know this, and the smiling poster she made hangs in the closet where the wifi map lives. Two relics of management dreams. The closet keeps them safe.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:helpdesk-manners:rep-6",
          text: "Once. 2019. Third reboot request of the day from a man who had unplugged the server to charge his phone. I said words I stand by in spirit and regret in volume. Apologized the next day, in person, with coffee. The lesson I kept: anger at users is anger at the system wearing a person's face. The system is my department.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "marek:label-maker",
      label: "The label maker",
      optionCandidates: [
        { id: "marek:label-maker:opt-1", topicId: "marek:label-maker", text: "The label maker is your most important tool?" },
        { id: "marek:label-maker:opt-2", topicId: "marek:label-maker", text: "You labeled the fridge shelves. Really." },
        { id: "marek:label-maker:opt-3", topicId: "marek:label-maker", text: "What is the label font and why is it perfect?" },
        { id: "marek:label-maker:opt-4", topicId: "marek:label-maker", text: "Pawel used your label maker without asking." },
        { id: "marek:label-maker:opt-5", topicId: "marek:label-maker", text: "Tomek says labels rot like everything else." },
        { id: "marek:label-maker:opt-6", topicId: "marek:label-maker", text: "What is the most important label in the building?" },
      ],
      replyCandidates: [
        {
          id: "marek:label-maker:rep-1",
          text: "The label maker is memory for buildings. My memory is good and it is not good enough for four hundred cables at 3am. The label maker does not get tired, does not leave, and does not guess. Everything I have ever labeled has never once had to be re-identified at panic speed. That is the whole argument. The label maker rests its case.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:label-maker:rep-2",
          text: "Shelf one: drinks. Shelf two: solid food. Shelf three: chaos — labeled as such, honestly, because the shelf earns its name by Thursday anyway. Zosia saw it, laughed, and took a photo for the culture deck. The fridge is now documented infrastructure. Nobody has argued with shelf three since. Labels end debates. That is their second job.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:label-maker:rep-3",
          text: "Default font. The machine only does one and that is why it is perfect. Fancy fonts on labels are a cry for help — a label is read at arm's length, at arm's length speed, by eyes doing something else. The default is legible at panic distance. Every engineer who swapped in a stylish font has had to read their own stylish font during an outage. Once is enough.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:label-maker:rep-4",
          text: "He labeled his own cables and the cable box. Correctly. Ordered, dated, no wasted ink. He put it back in the drawer, aligned, cartridge down. I said nothing for a week because saying something would have made it weird. The drawer knows. The cables know. That is the entire review and it was excellent.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-apprentice"],
        },
        {
          id: "marek:label-maker:rep-5",
          text: "Labels do not rot. Labels LIE, eventually — the server moves, the label stays, and now the label is a rumor with adhesive. That is why every label has a date on the back. Undated labels are faith. Dated labels are records. Tomek knows this and was testing whether I would say it. I said it. He nodded. The tape roll forgives us both.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:label-maker:rep-6",
          text: "The one on the main power strip that says in three languages: NOT A CHARGING STATION. Eleven years, two near-disasters, one vacuum cleaner. Every office has one object that is misunderstood by everyone, and the label is the peace treaty. Read the treaties. The treaties keep the lights on. Sometimes literally.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "marek:power-strips",
      label: "The power strip laws",
      optionCandidates: [
        { id: "marek:power-strips:opt-1", topicId: "marek:power-strips", text: "Why are there rules about power strips?" },
        { id: "marek:power-strips:opt-2", topicId: "marek:power-strips", text: "Someone daisy-chained two strips. Consequences?" },
        { id: "marek:power-strips:opt-3", topicId: "marek:power-strips", text: "The good strip by the window has a waiting list." },
        { id: "marek:power-strips:opt-4", topicId: "marek:power-strips", text: "Maciek's desk has six devices. Fire hazard?" },
        { id: "marek:power-strips:opt-5", topicId: "marek:power-strips", text: "Pawel labeled the strips with wattage. Useful?" },
        { id: "marek:power-strips:opt-6", topicId: "marek:power-strips", text: "What is the one power strip rule that matters?" },
      ],
      replyCandidates: [
        {
          id: "marek:power-strips:rep-1",
          text: "Because electricity is the one system in this office that does not negotiate. Networks fail politely — a page does not load. Power fails in smoke and interesting noises. Three rules: no daisy chains, no heaters on strips, and the strip under the desk is for the desk, not for the street vendor's warming plate. Rules written in smoke are still written. Ask the old office.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:power-strips:rep-2",
          text: "The daisy chain warmed the carpet, tripped the breaker, and took down the training mid-demo. The client thought it was a planned demonstration of disaster recovery. We let them think it. The strips are separated now by physical law and zip ties. The zip ties are the real policy. Policy you can cut with scissors is not policy.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:power-strips:rep-3",
          text: "Surge protection, six grounded sockets, mounted so it cannot fall behind the radiator. People guard that strip like parking. I built two copies of it and the waiting list dissolved, which is the actual lesson of infrastructure: most scarcity is under-provisioning wearing drama. Build a second one. Watch the politics evaporate.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:power-strips:rep-4",
          text: "His desk pulls four hundred watts of ambition and one standing desk motor. The strip is rated for it, the circuit is mapped, and the desk is on its own breaker since the incident with the conference call and the space heater. Maciek calls it his command post. I call it load test number four. It passes. It always passes. That is why I test it.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:power-strips:rep-5",
          text: "He labeled every strip with its rating and its birthday. The birthday matters — strips age, the surge part dies quietly, and a dead surge protector is a power strip with a good reputation and no skills. His labels turned the fleet honest. Stole the idea. The fleet wears his labels now. Do not tell him. He will want a sticker for the sticker.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:power-strips:rep-6",
          text: "Respect the watts. Every device has a number, every strip has a number, and the second number is not a suggestion. Everything else — routing, spacing, the aesthetics of cable dress — is preference. The watts are physics. Physics does not read email and does not attend the standup. Give physics its number and it leaves you alone forever.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:windows-update",
      label: "The Windows update",
      optionCandidates: [
        { id: "marek:windows-update:opt-1", topicId: "marek:windows-update", text: "The update rebooted a laptop mid-presentation again." },
        { id: "marek:windows-update:opt-2", topicId: "marek:windows-update", text: "Why do you refuse to block updates permanently?" },
        { id: "marek:windows-update:opt-3", topicId: "marek:windows-update", text: "You scripted updates to run at 3am. It works?" },
        { id: "marek:windows-update:opt-4", topicId: "marek:windows-update", text: "Tomek switched a machine to Linux to escape updates." },
        { id: "marek:windows-update:opt-5", topicId: "marek:windows-update", text: "Maciek wants updates 'more proactive'." },
        { id: "marek:windows-update:opt-6", topicId: "marek:windows-update", text: "What is the deal with updates, philosophically?" },
      ],
      replyCandidates: [
        {
          id: "marek:windows-update:rep-1",
          text: "The laptop fought the update and the update wins every fight that has a clock. The presentation recovered, the room laughed, and the machine now checks in at 3am like a well-trained animal. The reboot was not the crime. The crime was four months of 'remind me later'. Later is a loan. The update always collects.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:windows-update:rep-2",
          text: "Because blocked updates are a fuse with a long wire. I have seen the machine that skipped three years — it boots, it works, and it is a museum of vulnerabilities wearing a productivity license. You schedule the updates or the updates schedule you. There is no third option. There never was. The block button is how you choose the hour.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:windows-update:rep-3",
          text: "It works like weather. The fleet updates itself in its sleep, the log arrives with my coffee, and the exceptions are machines that were awake — which means someone was working at 3am, which is its own conversation. Two lines of script, one paragraph of policy, zero mid-presentation reboots since March. The script is boring. Boring is the product.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:windows-update:rep-4",
          text: "His Linux machine is fine. His Linux machine updates too — he just does it at a command line, on purpose, with the satisfaction of a man choosing his own weather. The OS was never the point. The control was the point. I told him that. He said 'I know' with his whole face. We understand each other about clocks and who owns them.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:windows-update:rep-5",
          text: "Proactive is what the script already is. What he wants is proactive the way his smart bulbs are proactive — visible, flashing, a graph. I offered him a weekly one-line report instead. He asked for a dashboard. He will look at it twice and I will feed it forever. The negotiation continues. Some management requires ornamental numbers. I grow them like crops.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:windows-update:rep-6",
          text: "An update is the machine telling you it is mortal. Nobody likes the message and everybody needs it. My whole job is translating the machine's mortality into office hours — which patch lands Tuesday, which waits for the freeze, which laptop gets the talk. Updates are not the enemy. Surprises are the enemy. I am in the surprise removal business.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:inventory-sheet",
      label: "The inventory sheet",
      optionCandidates: [
        { id: "marek:inventory-sheet:opt-1", topicId: "marek:inventory-sheet", text: "Your inventory sheet is legendary. How many rows?" },
        { id: "marek:inventory-sheet:opt-2", topicId: "marek:inventory-sheet", text: "The sheet has a column called 'temperament'." },
        { id: "marek:inventory-sheet:opt-3", topicId: "marek:inventory-sheet", text: "Grazyna reconciles her ledger against your sheet?" },
        { id: "marek:inventory-sheet:opt-4", topicId: "marek:inventory-sheet", text: "A laptop went missing and the sheet solved it." },
        { id: "marek:inventory-sheet:opt-5", topicId: "marek:inventory-sheet", text: "Pawel helps with inventory now. Trustworthy?" },
        { id: "marek:inventory-sheet:opt-6", topicId: "marek:inventory-sheet", text: "What has the sheet taught you about this office?" },
      ],
      replyCandidates: [
        {
          id: "marek:inventory-sheet:rep-1",
          text: "Six hundred and eleven rows, one per device, serial to grave. Born date, service history, hostname, and the column that matters: LAST KNOWN GOOD. Every machine I have ever run had a moment it was perfect. The sheet remembers. When something breaks, I do not guess what changed. I read what the machine was like when we met.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:inventory-sheet:rep-2",
          text: "Machines have temperaments. The training room projector is dramatic. Burek's microchip reader is nervous near the elevator. The coffee machine is stable but vindictive about descaling. People laughed at the column in 2019 and now they ask me what the new printer's temperament is before they buy. The column was never a joke. It was a skill arriving early.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:inventory-sheet:rep-3",
          text: "Quarterly. Her ledger says what the company paid for. Mine says what the company owns. Twice a year the two disagree and the difference is always the same ghost: equipment bought by a department, delivered to a person, and lost to the space between. We hunt the ghosts together. It is the only meeting where we both bring coffee and neither brings hope.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:inventory-sheet:rep-4",
          text: "Not missing. Borrowed by the sales office for a demo and returned to the wrong shelf. The sheet knew the laptop's last logged IP, its battery cycle count, and its temperament — shy, honest, hums in D. Ten minutes, one conversation, zero accusations. The sheet does not catch thieves. It catches confusion. Confusion is the actual thief in most offices.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:inventory-sheet:rep-5",
          text: "He counts, photographs, and asks about anything with a scratch before writing it down. The asking is the whole skill. Numbers lie politely; scratches confess. He found a hairline crack on the loaner tablet that three of us missed and filed it as 'not my fault, but yours to know'. Exactly the right sentence. The sheet is his to inherit whenever the inheritance happens.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:inventory-sheet:rep-6",
          text: "That the office is not one company. It is eleven tiny companies — sales with its fleet, training with its room, finance with its fortress — all sharing one roof and one wifi. The sheet is the only map of the whole country. Every row is a citizen and most citizens behave. You learn to love a place by counting it. Twice a year. Without hurry.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:door-camera",
      label: "The door camera",
      optionCandidates: [
        { id: "marek:door-camera:opt-1", topicId: "marek:door-camera", text: "Why did you install a camera on the door?" },
        { id: "marek:door-camera:opt-2", topicId: "marek:door-camera", text: "The camera caught the courier napping in our hallway." },
        { id: "marek:door-camera:opt-3", topicId: "marek:door-camera", text: "Zosia set rules for the camera footage." },
        { id: "marek:door-camera:opt-4", topicId: "marek:door-camera", text: "Klaudia wants the footage for content." },
        { id: "marek:door-camera:opt-5", topicId: "marek:door-camera", text: "Burek barks at the camera. Repairable?" },
        { id: "marek:door-camera:opt-6", topicId: "marek:door-camera", text: "Does the camera actually make the office safer?" },
      ],
      replyCandidates: [
        {
          id: "marek:door-camera:rep-1",
          text: "Because the door has no glass, the buzzer has no memory, and three packages in 2024 walked away unclaimed. The camera is a doorbell that testifies. It records the hallway, faces in, nothing else. Fourteen days of footage, then it eats itself. The cheapest honesty ever installed. Janusz approved the mounting height. His blessing carries structural weight.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:door-camera:rep-2",
          text: "Forty minutes. Man delivered, sat down, ate a sandwich, watched something on his phone, left. No harm done. But the footage is now my reference implementation for the phrase 'the hallway is not a lounge'. I have shown it to exactly one courier since. No words were needed. The camera speaks fluent hallway. Fluency is deterrent.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:door-camera:rep-3",
          text: "Her rules are better than mine, which is rare and I said so. Footage only for incidents, retention fourteen days, no sound, no facial search without a written reason, and Burek's naps are classified. The rules made the camera trustworthy and trustworthy cameras get to stay. Cameras without rules get unplugged by the first person with principles.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:door-camera:rep-4",
          text: "No. The hallway is not content. She asked, I said no, she said 'what if it is aesthetic'. The hallway is a fire door and a mop. I offered her the doorbell chime as a ringtone instead. She took it. Somehow it performed well. Content people can make anything perform. The footage stays a record. Records stay records.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:door-camera:rep-5",
          text: "The dog is not wrong. The camera is an eye that never blinks and he is a professional — blinking eyes get audited by non-blinking eyes. It is interspecies protocol. I lowered the camera ten centimeters so it no longer stares him level. Bark volume dropped eighty percent. The last twenty percent is principle and I respect it. We are not repairing principle. We are honoring it.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:door-camera:rep-6",
          text: "It makes the office more honest, which is better than safer. Packages stopped walking away. The courier waves at the lens. The camera has never caught a crime and has settled four arguments about who signed for what. Safety is mostly arguments that never start. A camera at a door is a notary with good uptime. Cheap notary. Good notary.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:kb-articles",
      label: "The KB articles",
      optionCandidates: [
        { id: "marek:kb-articles:opt-1", topicId: "marek:kb-articles", text: "You write KB articles nobody reads?" },
        { id: "marek:kb-articles:opt-2", topicId: "marek:kb-articles", text: "The 'restart the printer first' article is famous." },
        { id: "marek:kb-articles:opt-3", topicId: "marek:kb-articles", text: "One article has screenshots of every cable." },
        { id: "marek:kb-articles:opt-4", topicId: "marek:kb-articles", text: "Tomek contributed an article. Surprise?" },
        { id: "marek:kb-articles:opt-5", topicId: "marek:kb-articles", text: "Pawel cited a KB article instead of asking you." },
        { id: "marek:kb-articles:opt-6", topicId: "marek:kb-articles", text: "What makes a KB article survive?" },
      ],
      replyCandidates: [
        {
          id: "marek:kb-articles:rep-1",
          text: "I write them knowing the read count. The read count lies. Articles get read at 3am during incidents, opened from phone screens in stairwells, and never logged like web pages — people read them, fix the thing, and close the tab in one motion. The counter says forty views. The truth is the queue went down. Queues are the honest counter.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:kb-articles:rep-2",
          text: "Step one: restart the printer. Step two: you have not actually tried step one, go back. It is the most-viewed article in the history of this company and it contains one idea: the printer is not broken, it is thinking. Users print it out and tape it to the printer. The article is now furniture. I have peaked. Everything since is a hobby.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:kb-articles:rep-3",
          text: "Every cable behind every desk, photographed, labeled, and color-coded to the port map. Took two Sundays. Saved forty. When someone moves desks now, the move takes ten minutes and nothing is sacrificed to the gods of guesswork. The article is not documentation. It is a hostage rescue manual written in advance. Everyone should have one. Nobody does. I do.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:kb-articles:rep-4",
          text: "He wrote 'How to tell if prod is actually down or just slow', and it is better than anything I have written, because it admits the answer is usually 'slow, go get coffee, check again in ten'. His article prevents incidents by preventing panic. I linked it from the top of the KB. His byline sits under mine forever now. He pretends not to care.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:kb-articles:rep-5",
          text: "He hit myKB before he hit me. That is not distance. That is graduation. The article solved it, his ticket never existed, and the queue stayed quiet. Then he left a comment on the article — one correction, one dead link fixed. The KB grows one claw every time he reads it. This is how knowledge compounds instead of walking out the door at 5pm.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "quest:pawel-read-the-script"],
        },
        {
          id: "marek:kb-articles:rep-6",
          text: "One problem per article. One picture per problem. One sentence of mercy for the person reading it at the worst moment of their week — 'this looks scary, it is not, you have this'. Everything else is decoration and decoration rots. The KB is not a library. It is a stranger's calm voice, recorded in advance, waiting for the stairwell.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:phone-instead-of-ticket",
      label: "The phone versus the ticket",
      optionCandidates: [
        { id: "marek:phone-instead-of-ticket:opt-1", topicId: "marek:phone-instead-of-ticket", text: "Users keep calling instead of filing tickets." },
        { id: "marek:phone-instead-of-ticket:opt-2", topicId: "marek:phone-instead-of-ticket", text: "You answer the phone anyway. Why?" },
        { id: "marek:phone-instead-of-ticket:opt-3", topicId: "marek:phone-instead-of-ticket", text: "One phone call solved what three tickets could not." },
        { id: "marek:phone-instead-of-ticket:opt-4", topicId: "marek:phone-instead-of-ticket", text: "Zosia's policy says tickets only. Enforce?" },
        { id: "marek:phone-instead-of-ticket:opt-5", topicId: "marek:phone-instead-of-ticket", text: "Pawel took a walk-up instead of a ticket. Discipline?" },
        { id: "marek:phone-instead-of-ticket:opt-6", topicId: "marek:phone-instead-of-ticket", text: "When is the ticket system wrong?" },
      ],
      replyCandidates: [
        {
          id: "marek:phone-instead-of-ticket:rep-1",
          text: "They call because the ticket form asks them to know things. Hostname, severity, steps to reproduce. That is my vocabulary, not theirs. The phone call is just a human saying 'something is wrong' in the only language they have. Filing a ticket is a skill. Skills are taught, not resented. The resenting is loud and the teaching is quiet and the teaching wins.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:phone-instead-of-ticket:rep-2",
          text: "Because the phone call is triage gold. Ninety seconds of a shaking voice tells me more than any form — which user, which machine, how panicked, is the dog involved. I take the call, fix it, and then file the ticket myself in ninety seconds flat. The ticket exists. The user exists. Only my pride is asked to wait outside, and pride has never fixed anything.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:phone-instead-of-ticket:rep-3",
          text: "Three tickets said 'email slow'. The phone call said 'email slow since the new tablet arrived'. Two minutes later: the tablet was spoofing the mail server's name and the whole floor was asking it for directions. The tickets were accurate. The call was true. Data tells you what. People tell you when, and 'when' is where the bug lives.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:phone-instead-of-ticket:rep-4",
          text: "Her policy is right and it is also my cover. I tell users: file the ticket, and if it is on fire, call — the phone is the fire exit, not the entrance. She knows I answer everything either way. The policy keeps the queue honest and my weakness keeps the humans honest. Between the two of us the office gets both order and mercy, which is the actual product.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:phone-instead-of-ticket:rep-5",
          text: "He took the walk-up, fixed it, and then filed the ticket FOR the user, verbatim, with the user watching how it was done. That is not indiscipline. That is apprenticeship — he processed the human AND the paperwork and taught both. The queue got its row. The user got a lesson. I got proof the kid will be better than me. About time. I have plans for the freed weekends.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:pawel-apprentice"],
        },
        {
          id: "marek:phone-instead-of-ticket:rep-6",
          text: "When the problem is embarrassment. Nobody files a ticket that says 'I clicked the link in the obvious scam email'. They call, quietly, from the stairwell. If the only door is a form, the shameful problems never arrive until they are incidents. The phone is where shame goes to be handled gently. Every honest helpdesk has one unlocked door. Mine has a bell.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:scared-reboot",
      label: "The scared reboot",
      optionCandidates: [
        { id: "marek:scared-reboot:opt-1", topicId: "marek:scared-reboot", text: "Why are people afraid of rebooting?" },
        { id: "marek:scared-reboot:opt-2", topicId: "marek:scared-reboot", text: "You watched someone's machine with 89 days uptime?" },
        { id: "marek:scared-reboot:opt-3", topicId: "marek:scared-reboot", text: "The reboot fixed it and they were angry. Handle?" },
        { id: "marek:scared-reboot:opt-4", topicId: "marek:scared-reboot", text: "Zosia's laptop reboots only during her holidays." },
        { id: "marek:scared-reboot:opt-5", topicId: "marek:scared-reboot", text: "Burek stepped on the power button once. Chaos?" },
        { id: "marek:scared-reboot:opt-6", topicId: "marek:scared-reboot", text: "Teach me to explain reboots without condescension." },
      ],
      replyCandidates: [
        {
          id: "marek:scared-reboot:rep-1",
          text: "Because the machine forgetting things feels like THEM forgetting things. The 40 open tabs, the half-written email, the spreadsheet that only opens in one specific order — the uptime is their sediment. A reboot is archaeology being cleared. I do not argue with the feeling. I schedule it — reboots at lunch, when the sediment is thinnest, and I say so out loud.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:scared-reboot:rep-2",
          text: "89 days. The fan had a sound like a distant hadron experiment and the memory chart was a solid brick. I did not touch it. I sat down and asked to see the slideshow of the user's grandchildren that lived in those tabs — because the tabs WERE the grandchildren. We exported the important ones, rebooted together, and the machine came back thirty percent younger.",
          relationshipHint: "neutral",
        },
        {
          id: "marek:scared-reboot:rep-3",
          text: "Anger at the reboot is embarrassment at needing it. The fix took eleven seconds and their week of suffering made that fact loud. I let them be angry for exactly one coffee — then showed them how to reboot properly, saved work and all, and left a sticky note on the monitor: WHEN IN DOUBT, REBOOT. Signed. They framed the note.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:scared-reboot:rep-4",
          text: "Her laptop updates flawlessly every August. She is on holiday, the machine is on the office shelf, and the script handles everything. She knows. I know she knows. The system works because she pretends she does not know and I pretend the timing is coincidence. Some infrastructure is a diplomatic agreement between two people who have never discussed it.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:scared-reboot:rep-5",
          text: "Klaudia's machine. The dog walked across the keyboard, the power button is on the keyboard, and the machine rebooted mid-livestream to an audience of thousands. Klaudia made the reboot CONTENT. 'Burek performs IT maintenance.' The clip did numbers. I inspected the machine — unharmed. The dog has better uptime discipline than half the floor.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:scared-reboot:rep-6",
          text: "Say this: 'the machine has been awake for a long time and it is tired. So are you. We both get better after a break.' Never say 'it clears the memory' — memory sounds like their work leaving. The reboot is a nap, not a firing. Every metaphor that gives the machine a bedtime gives the user permission. Permission is the whole game. Condescension is just a reboot with worse PR.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:third-monitor",
      label: "The third monitor",
      optionCandidates: [
        { id: "marek:third-monitor:opt-1", topicId: "marek:third-monitor", text: "You have three monitors. Is the third necessary?" },
        { id: "marek:third-monitor:opt-2", topicId: "marek:third-monitor", text: "The third monitor shows the logs. Always the logs?" },
        { id: "marek:third-monitor:opt-3", topicId: "marek:third-monitor", text: "Someone called your setup 'a nuclear submarine'." },
        { id: "marek:third-monitor:opt-4", topicId: "marek:third-monitor", text: "Tomek works from a laptop, one screen, no dock." },
        { id: "marek:third-monitor:opt-5", topicId: "marek:third-monitor", text: "Grazyna approved a fourth monitor. Rumor?" },
        { id: "marek:third-monitor:opt-6", topicId: "marek:third-monitor", text: "What does the monitor setup actually change?" },
      ],
      replyCandidates: [
        {
          id: "marek:third-monitor:rep-1",
          text: "Necessary like a rear-view mirror. One screen is the road, two is the mirror, three is the mirror for the thing behind the mirror. I could work on one. I did, for years. The third monitor does not make me faster. It makes me calmer, and calm is the expensive resource. The invoice said monitor. The delivery was serenity.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:third-monitor:rep-2",
          text: "Logs, graph, logs. The logs scroll and I do not read them — I LISTEN. A healthy system mumbles. A dying one goes quiet or starts shouting, and both are visible from the corner of the eye without reading a word. The third monitor is not for information. It is for the system's breathing. I watch it breathe. It knows.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:third-monitor:rep-3",
          text: "A client's kid, during a site visit. Accurate. I said thank you, which is the correct response to being correctly assessed. The comparison has stuck — Zosia uses it in tours, the client uses it in their onboarding deck. My desk is now a landmark. Infrastructure as naval heritage. The kid gets a job here in eight years if the office survives the wait.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:third-monitor:rep-4",
          text: "One screen, all keyboard, zero fear. Watched him work once for twenty minutes out of professional respect. He is faster than my whole perimeter on his best day. Told him so, once, in two words. He printed the two words and taped them inside his laptop lid, which is the most Tomek sentence I have ever witnessed done with paper. Different tooling. Same war.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:third-monitor:rep-5",
          text: "True. The form arrived signed, annotated 'load-bearing infrastructure, see Marek'. She depreciates monitors like furniture and this one she filed under equipment. The fourth monitor exists. It shows Burek's nap spot by the glass wall, via the door camera, because even infrastructure wants to know the dog is fine. The audit accepted it. Her note said 'morale, approved'.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral", "quest:marek-trusted-review"],
        },
        {
          id: "marek:third-monitor:rep-6",
          text: "Nothing on your best day. Everything on your worst. On a quiet Tuesday the setup is furniture. At 2:41am during an incident, the difference between glancing left and typing a command is the difference between minutes and hours. Hardware is pre-decided calm. You buy your worst-day reflexes on your best-day afternoon. The third monitor is insurance that hums.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:warranty-calls",
      label: "The warranty calls",
      optionCandidates: [
        { id: "marek:warranty-calls:opt-1", topicId: "marek:warranty-calls", text: "You spend hours on warranty hold music?" },
        { id: "marek:warranty-calls:opt-2", topicId: "marek:warranty-calls", text: "You got a replacement unit through pure phone stamina." },
        { id: "marek:warranty-calls:opt-3", topicId: "marek:warranty-calls", text: "Grazyna tips you for warranty wins. Officially?" },
        { id: "marek:warranty-calls:opt-4", topicId: "marek:warranty-calls", text: "Pawel listened to you negotiate with a vendor." },
        { id: "marek:warranty-calls:opt-5", topicId: "marek:warranty-calls", text: "The vendor knows your voice now?" },
        { id: "marek:warranty-calls:opt-6", topicId: "marek:warranty-calls", text: "Teach me the warranty call." },
      ],
      replyCandidates: [
        {
          id: "marek:warranty-calls:rep-1",
          text: "Hold music is a tax on impatience, and impatience loses money every quarter. I put the headset on, work the ticket queue, and let the queue pay for the hold. The music thinks it is winning. The music is paying my salary. Four hours of hold saved two thousand zloty on a dead NAS. The music worked FOR me.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:warranty-calls:rep-2",
          text: "Third call. First two were 'out of warranty by nine days'. The third time I asked a simple question: is the fault the unit's age or the unit's defect? Silence on the line. Then paperwork. Age is not a defect. Defects in series have series solutions. They shipped the unit. The invoice zeroed out. Chronology is not causality, and saying so, politely, three times, is a superpower.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:warranty-calls:rep-3",
          text: "She rounds the recovered zloty into my coffee budget line and calls it 'procurement efficiency'. It is a tip with a ledger code. I do not need the tip. I need the recognition that phone stamina is infrastructure, same as the UPS. The coffee is fine though. The coffee is very fine. Her ledger has a column for jokes and we both pretend it does not.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:warranty-calls:rep-4",
          text: "He sat through the whole call taking notes like it was a lecture. The lesson he wrote down: never argue the yes, restate the no until it sees itself. 'So the policy is the unit cannot be replaced.' Silence. 'And the defect is confirmed by your own diagnostics.' Silence. The yes grows in the silence. Pawel underlined that sentence three times. The kid gets it.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "quest:pawel-apprentice"],
        },
        {
          id: "marek:warranty-calls:rep-5",
          text: "The switch vendor knows me. There is a note in my file — Marek, polite, will read the changelog, do not send him the template email. Being a known caller is infrastructure. The template email costs them nothing and costs me a week. The note saves the week. Notes like that are earned in calls, kept in tone, and spent in outages. I keep my tone. My tone is a credit rating.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:warranty-calls:rep-6",
          text: "Three sentences and a serial number. 'The unit with serial X has fault Y, confirmed by your diagnostic.' 'It is in warranty under contract Z.' 'What is the next step, and your name for the ticket?' No stories, no anger, no weather. The person on the phone has a script and no authority — you are not fighting them, you are helping them fill their script faster.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:sixty-tabs",
      label: "The sixty tabs",
      optionCandidates: [
        { id: "marek:sixty-tabs:opt-1", topicId: "marek:sixty-tabs", text: "Your browser has sixty tabs open. Again." },
        { id: "marek:sixty-tabs:opt-2", topicId: "marek:sixty-tabs", text: "Do you actually read all of them?" },
        { id: "marek:sixty-tabs:opt-3", topicId: "marek:sixty-tabs", text: "The browser crashed and took your tabs?" },
        { id: "marek:sixty-tabs:opt-4", topicId: "marek:sixty-tabs", text: "Tomek works with three tabs. Total?" },
        { id: "marek:sixty-tabs:opt-5", topicId: "marek:sixty-tabs", text: "One of your tabs is a manual from 2016?" },
        { id: "marek:sixty-tabs:opt-6", topicId: "marek:sixty-tabs", text: "Should tabs be managed like servers?" },
      ],
      replyCandidates: [
        {
          id: "marek:sixty-tabs:rep-1",
          text: "Sixty is a quiet Tuesday. Sixty tabs is not chaos, it is a command center where every tab is an open ticket in a queue only I can see. The memory usage looks like a heartbeat monitor during a sprint. My laptop fans have learned my work rhythm better than my calendar has.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:sixty-tabs:rep-2",
          text: "I read the ones that matter, when they matter, which is the whole point of a tab. A closed tab is a closed ticket and a closed ticket is a forgotten promise. The unread ones are called backlogs in every system ever invented. Mine just has icons and favicons instead of a burndown chart. Functionally identical. Cheaper.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "marek:sixty-tabs:rep-3",
          text: "It crashed once, in 2022, and I lost a session of tabs so beautiful that grown men still ask about it. The restore brought back fifty-nine. The missing tab held the answer to a problem I did not have yet. I found it three weeks later through sheer instinct. Browsers giveth, browsers taketh. Backups exist for tabs too, and I have them.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:sixty-tabs:rep-4",
          text: "Three tabs, all actively load-bearing, closed every evening like a shop. He runs his browser like production: minimal processes, no memory leaks, nothing running without a reason. I run mine like a lab: experiments everywhere, some contaminated. Both approaches ship. His crashes less. Mine discovers more. We have agreed to disagree in two separate rooms.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:sixty-tabs:rep-5",
          text: "The 2016 printer manual tab is not a tab, it is a monument. It has survived four browsers, two laptops and one office move through the sacred session sync. That manual has answered more tickets than half the knowledge base. When it finally loads blank, a small piece of this office closes forever. I do not refresh it. Refreshing is how monuments fall.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:sixty-tabs:rep-6",
          text: "Tabs are processes and processes need supervision. Every few Fridays I do a patch window on my own browser: kill the zombies, restart the load-balancers, keep the two services that never fail. Uptime of the important tabs: four years. Downtime incidents: two, both documented. The browser is my smallest datacenter and I run it with the same love. Slightly less cooling.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:i-changed-nothing",
      label: "'I changed nothing'",
      optionCandidates: [
        { id: "marek:i-changed-nothing:opt-1", topicId: "marek:i-changed-nothing", text: "The user says they changed nothing." },
        { id: "marek:i-changed-nothing:opt-2", topicId: "marek:i-changed-nothing", text: "How do you ask what changed without a fight?" },
        { id: "marek:i-changed-nothing:opt-3", topicId: "marek:i-changed-nothing", text: "The user cried during a ticket call?" },
        { id: "marek:i-changed-nothing:opt-4", topicId: "marek:i-changed-nothing", text: "Tomek says 'nothing changed' means everything changed?" },
        { id: "marek:i-changed-nothing:opt-5", topicId: "marek:i-changed-nothing", text: "The audit log proved what actually happened?" },
        { id: "marek:i-changed-nothing:opt-6", topicId: "marek:i-changed-nothing", text: "Why does everyone lie about changes, honestly?" },
      ],
      replyCandidates: [
        {
          id: "marek:i-changed-nothing:rep-1",
          text: "They always did, they always will, and I have made peace with it the way farmers make peace with rain. 'I changed nothing' means 'I do not know what information you need'. It is not a lie. It is a missing vocabulary. My job is to ask better questions than 'what did you change'. My job is 'what did you touch, and what surprised you'.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:i-changed-nothing:rep-2",
          text: "You never ask what they changed. You ask what they expected, and then you ask what happened instead. The gap between those two answers is where every configuration error in history lives. People confess to stories, not to blame. I stopped being a detective years ago. I am a translator between what happened and what people can bear to say.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "marek:i-changed-nothing:rep-3",
          text: "She did, quietly, over a spreadsheet that ate her quarter-end. I stayed on the call until it was fixed and then some. The next day there was a thank-you card on my desk with a drawing of the printer, smiling. I keep it under the keyboard. Tickets are not about computers. They never were. They are about people at the end of their rope, and ropes are my department.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:i-changed-nothing:rep-4",
          text: "His version is better: 'nothing changed' means the change was environmental, invisible, and load-bearing. An update shipped in the night. A certificate expired quietly. The universe moved one chair to the left. He is right so often it is annoying, and I have started telling users 'the room changed, not you'. It lands softer and it is usually true.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "marek:i-changed-nothing:rep-5",
          text: "It did, and I have never enjoyed a log so much. There it was, timestamped, at 8:52: an unsupervised click of historic proportions. I did not read it aloud. I said 'we found it, it is fixed, no names'. The relief in that room could power the server rack. Logs exist so that mercy can be precise. That is my favorite sentence and I stand by it.",
          relationshipHint: "delighted",
          tags: ["quest:marek-showed-the-log"],
        },
        {
          id: "marek:i-changed-nothing:rep-6",
          text: "Because everyone gets burned once for honesty. They change a setting, they get a lecture, and the lecture wins. After that, 'nothing changed' is self-defense. My whole technique is making confession cheap: fix first, explain second, never say 'obviously'. It took me years and the office confession rate tripled. That is real infrastructure, the kind you cannot rack.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:headset-hair",
      label: "The headset hair",
      optionCandidates: [
        { id: "marek:headset-hair:opt-1", topicId: "marek:headset-hair", text: "You have headset hair by 10am daily?" },
        { id: "marek:headset-hair:opt-2", topicId: "marek:headset-hair", text: "Klaudia offered to fix it on camera?" },
        { id: "marek:headset-hair:opt-3", topicId: "marek:headset-hair", text: "The headset pad is worn flat from years?" },
        { id: "marek:headset-hair:opt-4", topicId: "marek:headset-hair", text: "A client recognized your hair before your name?" },
        { id: "marek:headset-hair:opt-5", topicId: "marek:headset-hair", text: "The new headset has better padding?" },
        { id: "marek:headset-hair:opt-6", topicId: "marek:headset-hair", text: "Is the headset part of your identity now?" },
      ],
      replyCandidates: [
        {
          id: "marek:headset-hair:rep-1",
          text: "By 10am there is a valley across my head that has better mapping than the wifi. I have stopped fighting it. The valley says 'this man is in calls and the calls are handled'. It is a uniform I do not wear, it wears me. Grazyna once asked if the dent was permanent. I said yes, professionally. She wrote it down.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:headset-hair:rep-2",
          text: "She did, mid-call, live to forty people, with product recommendations and a brush that appeared from somewhere. The clip did numbers. My hair has a glow-up arc now and the comments demand quarterly updates. I have agreed to one per quarter, no more. The valley returns between episodes. It is canon.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:klaudia-rebranded-you"],
        },
        {
          id: "marek:headset-hair:rep-3",
          text: "Eleven years of calls will do that to a pad. That flatness is not damage, it is a service record. Every dent in the foam is a shift where somebody's morning got fixed. I could replace it. The shop has new ones. But you do not retire a headset that has heard every incident since 2015. It knows the building's voice.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:headset-hair:rep-4",
          text: "She did, at the venue, before badges. 'You are the voice from the printer call.' The hair arrived first and the name confirmed it. I have never been recognized by anything faster. Somewhere between the valley and the voice, I became a landmark. The client took a photo WITH the hair. Consent was given. The hair has representation now.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:headset-hair:rep-5",
          text: "It does, and the difference is so civilized I almost miss the old suffering. The old pad taught me to endure; the new one teaches me that some upgrades are allowed. Tomasz tested it for sound first, approved the microphone, and said nothing about comfort, which from him means the audio was the only real spec. Correct. The padding is a bonus. The clarity is the job.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:headset-hair:rep-6",
          text: "It is my tool, my uniform and my hairstyle, in that order. The headset is the last honest thing in IT: you put it on, you answer, you help. No dashboards, no tickets, just a voice and a valley. When I retire, the headset goes on the shelf next to the printer drawing. The hair is not invited. The hair retires when it wants.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:morning-checklist",
      label: "The 8:30 morning checklist",
      optionCandidates: [
        { id: "marek:morning-checklist:opt-1", topicId: "marek:morning-checklist", text: "You do the same checks every morning at 8:30?" },
        { id: "marek:morning-checklist:opt-2", topicId: "marek:morning-checklist", text: "Has the checklist ever caught a fire early?" },
        { id: "marek:morning-checklist:opt-3", topicId: "marek:morning-checklist", text: "Tomek wrote half the checklist?" },
        { id: "marek:morning-checklist:opt-4", topicId: "marek:morning-checklist", text: "The checklist is laminated by Grazyna?" },
        { id: "marek:morning-checklist:opt-5", topicId: "marek:morning-checklist", text: "Janusz compares it to his own morning rounds?" },
        { id: "marek:morning-checklist:opt-6", topicId: "marek:morning-checklist", text: "What happens on the day you skip it?" },
      ],
      replyCandidates: [
        {
          id: "marek:morning-checklist:rep-1",
          text: "8:30, same order, eleven items, coffee before line one. Backups ran, disk space, alerts queue, the printer hum, the door camera feed, the wifi heatmap spot-check. Twelve minutes, every day, for nine years. The checklist is not superstition. It is the cheapest insurance this company owns, and the premium is my morning.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "marek:morning-checklist:rep-2",
          text: "Twice. Once a disk at 91 percent that would have died by lunch, once a backup job that silently stopped on a Sunday. Both were caught at line three and line five while the office was still drinking coffee. Nobody knows. That is the whole point. The best fire alarm is the one where nothing burns and nobody claps.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:morning-checklist:rep-3",
          text: "Lines one through four are his, from the early days, when I checked nothing and he checked everything. 'Backups, disk, alerts, offsite.' I added the human lines later: the printer, the door, the wifi corner where Klaudia films. The checklist is a map of this office drawn by two people with very different alarms. It works because both halves exist.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "marek:morning-checklist:rep-4",
          text: "It is, with a version number and a review date in the corner, because she does not laminate chaos. She asked what each line protects and laminated the answers onto the back. Now the checklist teaches while it guards. New hires read it like scripture and GrazynaInitials the bottom. The audit trail has a pulse and it beats at 8:30.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "marek:morning-checklist:rep-5",
          text: "He does, and his rounds started decades before my checklist, which he reminds me of annually with great love. His covers the building; mine covers the machines. We meet at the kitchen at 8:40, he with his keys, me with my laptop, and we exchange one sentence each. The building and the company, synchronized over coffee. No meeting required. Ever.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:morning-checklist:rep-6",
          text: "Nothing, statistically. And once, catastrophically, in 2019, when a skipped Tuesday met a failed fan. The checklist is not there for the days it catches things. It is there so that skipping it is impossible to do by accident. Habits are firewalls against your own optimism. I have never skipped it since, and I have never trusted a Tuesday since.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:laptop-shelf",
      label: "The laptop shelf",
      optionCandidates: [
        { id: "marek:laptop-shelf:opt-1", topicId: "marek:laptop-shelf", text: "The shelf of retired laptops is growing?" },
        { id: "marek:laptop-shelf:opt-2", topicId: "marek:laptop-shelf", text: "Do the old laptops still boot?" },
        { id: "marek:laptop-shelf:opt-3", topicId: "marek:laptop-shelf", text: "One laptop on the shelf has a name?" },
        { id: "marek:laptop-shelf:opt-4", topicId: "marek:laptop-shelf", text: "Grazyna wants the shelf written off?" },
        { id: "marek:laptop-shelf:opt-5", topicId: "marek:laptop-shelf", text: "Pawel requested a laptop from the shelf?" },
        { id: "marek:laptop-shelf:opt-6", topicId: "marek:laptop-shelf", text: "When does a laptop leave the shelf for good?" },
      ],
      replyCandidates: [
        {
          id: "marek:laptop-shelf:rep-1",
          text: "Fourteen machines, oldest from 2016, arranged by generation like a family photo where nobody smiles. Every laptop there carried this company through something: one onboarding wave, one audit, one lockdown. You do not bin that. The shelf is not storage. It is a roster of veterans waiting for orders they will still answer.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:laptop-shelf:rep-2",
          text: "Eleven of fourteen boot. The three that do not are organ donors now: batteries, keyboards, one screen that lives on in a client demo setup. Nothing on that shelf is dead. Some are just between deployments. The shelf has a pulse if you check the chargers, which I do, monthly, because veterans deserve power.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:laptop-shelf:rep-3",
          text: "The 2016 ThinkPad is called Zofia and she has run every emergency this office has had. She is slow, she is warm, and she boots into a system so stable it frightens the interns. When everything fails, we reach for Zofia. She has never once declined. Some machines are staff. Zofia is management.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:laptop-shelf:rep-4",
          text: "She did the audit, found fourteen laptops of zero book value, and asked what they were worth. I said 'one emergency each'. She paused, wrote something in the margin, and left the shelf alone. Last month a shelf laptop saved a client demo when the main one died. I sent her a one-line email: 'the emergency each'. She replied with a single stamp. Approval, in Grazyna.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "marek:laptop-shelf:rep-5",
          text: "He did, for his home lab, with a written reason and everything. I gave him the 2018 one, second from the left, and a speech he did not need: 'it will fight you, it will teach you, bring it back better'. He brought it back with new thermal paste and a cleaner install than mine. The shelf has produced an heir. The shelf is proud. I checked.",
          relationshipHint: "delighted",
          tags: ["quest:pawel-apprentice"],
        },
        {
          id: "marek:laptop-shelf:rep-6",
          text: "When it stops being useful to anyone, which happens rarely and gently. Parts go to the living, batteries go to recycling, and the case goes on the wall of the server room like a plaque. There are three cases up there. Each one ran its last shift doing something that mattered. Nobody gets thrown away here. Some just change duty stations.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:can-you-see-my-screen",
      label: "Can you see my screen?",
      optionCandidates: [
        { id: "marek:can-you-see-my-screen:opt-1", topicId: "marek:can-you-see-my-screen", text: "Someone asked the room if it can see the screen." },
        { id: "marek:can-you-see-my-screen:opt-2", topicId: "marek:can-you-see-my-screen", text: "You answered 'no' on purpose once?" },
        { id: "marek:can-you-see-my-screen:opt-3", topicId: "marek:can-you-see-my-screen", text: "The shared screen showed the wrong window?" },
        { id: "marek:can-you-see-my-screen:opt-4", topicId: "marek:can-you-see-my-screen", text: "Tomek answers the question with a checklist?" },
        { id: "marek:can-you-see-my-screen:opt-5", topicId: "marek:can-you-see-my-screen", text: "The phrase is now on a sticker in the meeting room?" },
        { id: "marek:can-you-see-my-screen:opt-6", topicId: "marek:can-you-see-my-screen", text: "Why does this question survive every decade?" },
      ],
      replyCandidates: [
        {
          id: "marek:can-you-see-my-screen:rep-1",
          text: "Every call, every room, every decade, the same sacred sentence. It is not a question. It is a handshake between a presenter and the void. I have heard it in four companies and two languages and it always lands with the same tiny terror. My job is making the answer 'yes' boring. Boring yeses are my life's work.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:can-you-see-my-screen:rep-2",
          text: "Once, into a silent conference room, because the projector was showing the screensaver and nobody had checked. The silence taught the room more than any briefing. We now test screens before every meeting like pilots test flaps. The 'no' saved a hundred future meetings and cost me one colleague's trust, which I repaid in biscuits and uptime.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:can-you-see-my-screen:rep-3",
          text: "It showed the spreadsheet of a different meeting entirely, with names, and the room went to church. Alt-tab is a loaded weapon. I now keep a dedicated presentation user profile on the meeting room machine, empty as a chapel. The profile has one browser, one window, one purpose. It has never betrayed anyone. The profile is my best hire.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
        {
          id: "marek:can-you-see-my-screen:rep-4",
          text: "He does, without looking up: 'share started, resolution native, cable seated'. Then the room checks three things and the answer reveals itself. It sounds cold. It is actually the kindest thing in the meeting, because the checklist never blames anyone. The cable is always the suspect, and the cable cannot be hurt by suspicion.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "marek:can-you-see-my-screen:rep-5",
          text: "It is. Marek's sticker, above the screen, in label-maker font: 'CHECK SHARE FIRST'. Klaudia photographed it for a post about office archaeology and the comments were a support group. Somewhere out there, whole careers of quiet terror are summarized on my sticker. The sticker does not mind. It was born for this.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:can-you-see-my-screen:rep-6",
          text: "Because screens are private rooms and sharing one is a small act of trust. The question is not technical. It is 'are you with me, can you see what I see'. The tech changes, the ports change, the terror stays perfectly preserved. I fix the technical half. The human half has been in production since the first projector and needs no maintenance.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:self-healing-bug",
      label: "The self-healing bug",
      optionCandidates: [
        { id: "marek:self-healing-bug:opt-1", topicId: "marek:self-healing-bug", text: "The bug vanished before you reached the desk?" },
        { id: "marek:self-healing-bug:opt-2", topicId: "marek:self-healing-bug", text: "You closed a ticket as 'healed'?" },
        { id: "marek:self-healing-bug:opt-3", topicId: "marek:self-healing-bug", text: "Tomek found the cause two weeks later?" },
        { id: "marek:self-healing-bug:opt-4", topicId: "marek:self-healing-bug", text: "The user thinks you fixed it by walking in?" },
        { id: "marek:self-healing-bug:opt-5", topicId: "marek:self-healing-bug", text: "Grazyna does not accept 'resolved itself' in the ledger?" },
        { id: "marek:self-healing-bug:opt-6", topicId: "marek:self-healing-bug", text: "Do self-healing bugs ever come back?" },
      ],
      replyCandidates: [
        {
          id: "marek:self-healing-bug:rep-1",
          text: "Twice this year. The screen frozen at 9:14, cured at 9:16, with no witness but the wall clock. I stood there like a man at an empty stage. Something in the machine blinked, decided otherwise, and moved on. I logged it honestly: 'observed, unreproduced, watched like a neighbor'. The ticket system has a category for grief. I use it sparingly.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:self-healing-bug:rep-2",
          text: "I did, with the resolution 'recovered independently, monitored, no action required, still rude'. Grazyna questioned the wording, accepted the truth, and initialed it. The ledger has seen everything and 'healed' is not the strangest entry. That honor belongs to the coffee machine incident, which we do not discuss in tickets.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "marek:self-healing-bug:rep-3",
          text: "He did, twice, both times from a log nobody else reads. A driver reset itself on a timer. The bug was not supernatural, it was just polite enough to clean up after lunch. The man found a fingerprint in the noise. This is why we keep him: the machine talks in its sleep and Tomasz dreams in the same language.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "marek:self-healing-bug:rep-4",
          text: "He does, fully, and I stopped correcting him in 2021. There is a version of IT support where presence is the fix, and honestly, some of that is real. People calm down, machines calm down, the office has a pulse and I am part of it. I let the legend stand. The legend gets me coffee on incident days, which is more than the root cause ever offered.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:self-healing-bug:rep-5",
          text: "She does not, and the audit trail is better for it. Every 'resolved itself' gets a follow-up line: cause found, or cause unknown, monitored until known. Unknowns do not close, they hibernate. She taught me that an honest unknown is worth more than a confident guess. The ledger of this company has never contained a comfortable lie.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "marek:self-healing-bug:rep-6",
          text: "They come back like seasons, and now I expect them. The printer that heals on Thursdays. The wifi that drops at 16:50 and recovers by 16:52, apologetic. I have stopped asking why and started keeping calendars. When the pattern holds, you patch. When it does not, you document it, name it, and greet it by name when it returns. The office has three such ghosts. All are friendly.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:jet-engine-laptop",
      label: "The jet-engine laptop",
      optionCandidates: [
        { id: "marek:jet-engine-laptop:opt-1", topicId: "marek:jet-engine-laptop", text: "A laptop in the office sounds like takeoff?" },
        { id: "marek:jet-engine-laptop:opt-2", topicId: "marek:jet-engine-laptop", text: "The fan was full of dust from 2021?" },
        { id: "marek:jet-engine-laptop:opt-3", topicId: "marek:jet-engine-laptop", text: "You cleaned it live during a call?" },
        { id: "marek:jet-engine-laptop:opt-4", topicId: "marek:jet-engine-laptop", text: "Burek fears the jet-engine sound?" },
        { id: "marek:jet-engine-laptop:opt-5", topicId: "marek:jet-engine-laptop", text: "The thermal paste was older than the intern?" },
        { id: "marek:jet-engine-laptop:opt-6", topicId: "marek:jet-engine-laptop", text: "Why do users ignore the noise so long?" },
      ],
      replyCandidates: [
        {
          id: "marek:jet-engine-laptop:rep-1",
          text: "Accounting, third desk, runway clear for departure. That laptop has been taking off daily since March and nobody reported it because 'it has always sounded like that'. It has NOT always sounded like that. Machines escalate. Noise is the last polite stage before shutdown. I heard it from the corridor and made the rescue flight my first ticket of the day.",
          relationshipHint: "annoyed",
          tags: ["period:morning"],
        },
        {
          id: "marek:jet-engine-laptop:rep-2",
          text: "It was. Four years of office air, felt, and what I believe was one (1) sticker fragment. The fan now spins like it is nineteen again and the desk is quieter than a library. The dust, by weight, could have insulated a small house. I showed it to the user. They looked at their own laptop's exhaust with new suspicion. Good. Suspicion is maintenance.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:jet-engine-laptop:rep-3",
          text: "I did, camera on, narrated like a nature documentary: 'here we see the office laptop in its natural habitat, screaming'. The call loved it. The laptop came back cooler by twenty degrees and the customer demo later that week ran silent. Education plus entertainment. The ticket was closed with a link to the recording and one star for drama.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:jet-engine-laptop:rep-4",
          text: "He does, and who can blame him. The thing screams in a register that means nothing good. Now the ritual: laptop goes under the desk, Burek goes under MY desk, and we wait out the spin-down together like colleagues during thunder. [he and Burek have an understanding] The vacuum is worse, apparently. The fear hierarchy is documented and I respect it.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "marek:jet-engine-laptop:rep-5",
          text: "It was. That paste had been holding two generations of processors together since before the intern could legally work. It had turned to something between chalk and memory. I cleaned the old bond, laid the new one in a grain-of-rice line, and the temperatures dropped like a confession. The intern watched the whole surgery. Next time, she does the rice.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:jet-engine-laptop:rep-6",
          text: "Because the noise grows slowly, and humans recalibrate daily. Day one: 'that is loud'. Day thirty: 'that is a laptop'. I do it too, with my own machines, and Marek catches me the way I catch users. The fix is simple and nobody does it: listen to your machines once a week like a doctor listens to a chest. The fan is a heartbeat. Heartbeats tell the truth early.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:candy-drawer",
      label: "The candy drawer",
      optionCandidates: [
        { id: "marek:candy-drawer:opt-1", topicId: "marek:candy-drawer", text: "You keep candy in your desk for scared users?" },
        { id: "marek:candy-drawer:opt-2", topicId: "marek:candy-drawer", text: "The drawer ran empty during the big outage?" },
        { id: "marek:candy-drawer:opt-3", topicId: "marek:candy-drawer", text: "Grazyna budgets your candy?" },
        { id: "marek:candy-drawer:opt-4", topicId: "marek:candy-drawer", text: "Tomek takes one piece, every time, silently?" },
        { id: "marek:candy-drawer:opt-5", topicId: "marek:candy-drawer", text: "The drawer saved a client demo once?" },
        { id: "marek:candy-drawer:opt-6", topicId: "marek:candy-drawer", text: "Where did the candy drawer idea come from?" },
      ],
      replyCandidates: [
        {
          id: "marek:candy-drawer:rep-1",
          text: "Bottom drawer, left side, mix of chocolate and the fruit ones nobody admits to liking. A scared user cannot hear a fix. Their blood sugar is in the basement and their whole career is flashing on screen. One piece of chocolate, two minutes of quiet, then the fix. It is not bribery. It is field medicine, and I am fully stocked.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:candy-drawer:rep-2",
          text: "It did, in hour three, when the whole office drifted past my desk like survivors. I emptied my own emergency stash, which is the drawer's drawer, the one nobody knows about. By hour five I was handing out mints from the bottom of my bag. The incident report calls it a four-hour outage. The users call it 'the day Marek had no candy'. Both are accurate.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:candy-drawer:rep-3",
          text: "She does, line item, 'desk consumables, IT'. She audited it once and found the cost per incident so low she circled it. Her note said 'cheaper than a therapist, roughly as effective'. I have that note framed above the drawer. The candy drawer is now the only budget line in this company with an emotional endorsement from accounting.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "marek:candy-drawer:rep-4",
          text: "He does, one piece, always the same kind, no eye contact, a small nod on the way out. It has happened so many times it is basically cron. The drawer is checked for his pattern weekly. When I once swapped brands, he noticed, said 'the blue ones', and took the old kind from the reserve box I keep for him now. Standards matter. Even silent ones.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "marek:candy-drawer:rep-5",
          text: "It did. The client's laptop died ten minutes before the demo, we migrated to a loaner, and their lead was gray as a dead pixel. One piece of the good chocolate, a glass of water, and the demo started four minutes late with everyone human again. They signed that quarter. The contract mentions 'responsive support'. The candy is not in the contract. The candy did the opening.",
          relationshipHint: "delighted",
          tags: ["quest:got-acme-contract"],
        },
        {
          id: "marek:candy-drawer:rep-6",
          text: "From my first mentor, at my first job, a woman named Edyta who kept a drawer 'for emergencies, which are mostly people'. I thought it was a joke until the day she handed a crying director a chocolate and the whole server room exhaled. I stole the idea like infrastructure. Edyta retired years ago. The drawer continues. That is how ideas survive: bottom drawer, left side.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "marek:photo-tickets",
      label: "The photo tickets",
      optionCandidates: [
        { id: "marek:photo-tickets:opt-1", topicId: "marek:photo-tickets", text: "Someone submitted a photo of a screen instead of text?" },
        { id: "marek:photo-tickets:opt-2", topicId: "marek:photo-tickets", text: "The photo was of the monitor with a phone, flash on?" },
        { id: "marek:photo-tickets:opt-3", topicId: "marek:photo-tickets", text: "A photo ticket actually helped once?" },
        { id: "marek:photo-tickets:opt-4", topicId: "marek:photo-tickets", text: "Tomek parses screenshots like evidence?" },
        { id: "marek:photo-tickets:opt-5", topicId: "marek:photo-tickets", text: "You taught the office the two-sentence ticket format?" },
        { id: "marek:photo-tickets:opt-6", topicId: "marek:photo-tickets", text: "Is a photo ticket better than no ticket?" },
      ],
      replyCandidates: [
        {
          id: "marek:photo-tickets:rep-1",
          text: "An image of a spreadsheet, compressed into modern art, no text, subject line 'this'. I could not copy the cells, could not search it, could feel my soul compressing at the same ratio. I now have a rule: send the picture AND the sentence. The sentence takes ten seconds. The ten seconds save me forty minutes of squinting at pixels like a detective.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:photo-tickets:rep-2",
          text: "It was. Flash, angle, glare, and the error message survived only as a white rectangle of pure intention. I held the phone photo up to the light like ancient scripture. Somewhere in the glare was an error code, mocked me, and dissolved. The ticket was still solvable. The ticket is always solvable. The flash lives in my memory now, rent-free.",
          relationshipHint: "annoyed",
        },
        {
          id: "marek:photo-tickets:rep-3",
          text: "It did, once, gloriously. The user screenshotted the error mid-crash, including the stack trace that never survived reboots. That photo was the whole diagnosis. I wrote back 'this image saved the week' and they printed my reply. Now their screenshots have a header, a subject, and better lighting than my wedding photos. Growth looks like a well-lit error message.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:photo-tickets:rep-4",
          text: "He reads them like crime scenes: timestamp in the corner, window title, taskbar, open tabs. He once identified the software version from the scroll bar style. The man extracts more from a blurry image than most tools get from logs. I forward him the unsolvable ones now, labeled 'archaeology'. He has never once returned empty-handed.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "marek:photo-tickets:rep-5",
          text: "I did, at the town hall, with Klaudia's help on the graphic: 'What happened, What you expected, One picture, no flash'. Two sentences. It fits on a sticker and it lives on every monitor by the kitchen. Ticket quality rose forty percent. Klaudia says the sticker is my best design work. The sticker was mostly her. I provided the suffering.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:photo-tickets:rep-6",
          text: "It is, always, because the photo proves it happened. Half of support is believing people, and a blurry flash-photo of a frozen screen is someone saying 'I am not making this up'. I will take the glare and the squash and the mystery every single time over the empty ticket that says 'it is broken, fix it'. Evidence with flash beats evidence with nothing.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:friday-ticket",
      label: "The Friday 16:55 ticket",
      optionCandidates: [
        { id: "marek:friday-ticket:opt-1", topicId: "marek:friday-ticket", text: "A ticket arrived at 16:55 on Friday?" },
        { id: "marek:friday-ticket:opt-2", topicId: "marek:friday-ticket", text: "You fixed it anyway, before the weekend?" },
        { id: "marek:friday-ticket:opt-3", topicId: "marek:friday-ticket", text: "The deploy freeze exists because of one Friday?" },
        { id: "marek:friday-ticket:opt-4", topicId: "marek:friday-ticket", text: "Tomek ignores Friday tickets on principle?" },
        { id: "marek:friday-ticket:opt-5", topicId: "marek:friday-ticket", text: "The Monday queue after a quiet Friday is scary?" },
        { id: "marek:friday-ticket:opt-6", topicId: "marek:friday-ticket", text: "Should Friday tickets just be illegal?" },
      ],
      replyCandidates: [
        {
          id: "marek:friday-ticket:rep-1",
          text: "16:55, priority high, from finance, subject line all capitals. The classic. I watched it land like a meteor with a countdown. The rule is five minutes: assess in five minutes whether it waits or burns. Most wait. This one burned, because quarter-end and capital letters are an ancient signal. I cancelled my evening with dignity and a sandwich.",
          relationshipHint: "annoyed",
          tags: ["period:afternoon"],
        },
        {
          id: "marek:friday-ticket:rep-2",
          text: "I did, and I regret nothing: a two-line fix, one reboot, and finance opened Monday into a working world. The weekend cost me one pizza. The alternative cost them a Monday and me a Monday that felt like three. Some tickets are noise. Some are just badly timed kindness. I have gotten good at telling them apart by the smell of the subject line.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:friday-ticket:rep-3",
          text: "Not one. The freeze exists because of a Friday in 2020 that broke print services for a week. One deploy, 16:58, and the whole office discovered how much they loved printers only when they stopped. Tomasz wrote the freeze rule that weekend. It has one page, no exceptions, and the calm authority of a man who has seen the terminal before. The freeze is respected like weather.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "marek:friday-ticket:rep-4",
          text: "He triages them, he does not ignore them. 'Waiting is also a decision' is his line, delivered at 16:56 while closing the laptop. If it survives the weekend, it was never urgent. If the company burns, that is Monday's information. He is right so often that I have adopted a softer version: nothing new after five unless it calls me by name. Tickets cannot call. That is the filter.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:friday-ticket:rep-5",
          text: "It is, in a beautiful way. A quiet Friday means either everything worked or nobody is telling me things yet. The Monday queue is where the truth queues up. I have learned to read Monday morning like a doctor reads a face before the patient speaks. Nine times out of ten it is nothing. The tenth time is why I check the queue with coffee in both hands.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "marek:friday-ticket:rep-6",
          text: "Illegal is strong. Routed is better. After 16:30, everything non-urgent auto-waits, and urgency requires a phone call, because typing 'URGENT' is free and calling me at 17:00 costs a little courage. The courage filter has never once failed. Real fires call. Everything else can rehearse over the weekend and arrive Monday, better organized and slightly ashamed.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:adapter-bag",
      label: "The adapter bag",
      optionCandidates: [
        { id: "marek:adapter-bag:opt-1", topicId: "marek:adapter-bag", text: "The bag of adapters came to a client site?" },
        { id: "marek:adapter-bag:opt-2", topicId: "marek:adapter-bag", text: "The bag has saved how many meetings?" },
        { id: "marek:adapter-bag:opt-3", topicId: "marek:adapter-bag", text: "Bartek's kit and your bag merged once?" },
        { id: "marek:adapter-bag:opt-4", topicId: "marek:adapter-bag", text: "One adapter in there predates you?" },
        { id: "marek:adapter-bag:opt-5", topicId: "marek:adapter-bag", text: "Klaudia photographed the bag like a product?" },
        { id: "marek:adapter-bag:opt-6", topicId: "marek:adapter-bag", text: "What is the rarest adapter in the bag?" },
      ],
      replyCandidates: [
        {
          id: "marek:adapter-bag:rep-1",
          text: "It goes where I go, like a paramedic bag but for ports. Client site, wrong room, mystery screen from 2014: no problem, the bag has seen worse. Somewhere in there is a connector for a projector so old it should be in a museum. The bag is why 'Marek is coming' calms rooms. It is not me. It never was. It is the bag, and I am its handler.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:adapter-bag:rep-2",
          text: "Countless, but the one I count is the acquisition call where the client's screen and our laptop spoke different languages entirely. One adapter, thirty seconds, deal saved before coffee. I have started logging bag saves in the ticket system. The category is 'carried'. The bag's closure rate is better than most software I have installed.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:adapter-bag:rep-3",
          text: "They did, at the offsite, and for one hour the bag had everything: my ports, his clickers, his backup microphone, my spare everything. We stood over it like generals over a map. Two prepared men, one bag, zero failures all day. We split it back at five with the solemnity of a treaty. Somewhere there is a photo of that bag at maximum capacity. It should be framed.",
          relationshipHint: "delighted",
          tags: ["quest:bartek-recommended-you"],
        },
        {
          id: "marek:adapter-bag:rep-4",
          text: "The VGA to whatever-this-is from before my time. I have never needed it. I will never need it. It stays, because the day I remove it is the day the universe schedules a meeting with a machine that old. The bag has a no-dismissals policy. Every adapter was somebody's solution once. The bag is a retirement home with a zipper.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:adapter-bag:rep-5",
          text: "She did, flat lay, top-down, captioned 'what preparedness looks like'. It did better numbers than our actual product posts. The comments argued about the missing adapter, which proves the audience was professionals. Klaudia offered to design me a better bag. I declined. The bag is broken in, like me, and we are both too old to be redesigned.",
          relationshipHint: "delighted",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "marek:adapter-bag:rep-6",
          text: "The round one for the screenshare box in the meeting room that nobody has opened since 2019. Three people have asked what it connects. Two were me, checking. The answer is always 'everything, eventually'. It is the mystery ingredient of the bag. As long as nobody needs it, it stays. The day someone needs it, the bag becomes legend for a week.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:toner-stain",
      label: "The toner stain",
      optionCandidates: [
        { id: "marek:toner-stain:opt-1", topicId: "marek:toner-stain", text: "There is toner on your sleeve. Permanent?" },
        { id: "marek:toner-stain:opt-2", topicId: "marek:toner-stain", text: "The toner incident had a full story?" },
        { id: "marek:toner-stain:opt-3", topicId: "marek:toner-stain", text: "Renata has treated the stain professionally?" },
        { id: "marek:toner-stain:opt-4", topicId: "marek:toner-stain", text: "Tomek says toner is 'just structured dust'?" },
        { id: "marek:toner-stain:opt-5", topicId: "marek:toner-stain", text: "New IT people get warned about toner?" },
        { id: "marek:toner-stain:opt-6", topicId: "marek:toner-stain", text: "Is the stain part of the uniform now?" },
      ],
      replyCandidates: [
        {
          id: "marek:toner-stain:rep-1",
          text: "Permanent as far as science is concerned. Left sleeve, shaped like a small continent that has seen things. Toner is not a stain, it is a decision the shirt has made. I have washed it, prayed over it, and accepted it. The sleeve is now part of my work history, like scars, except this one has particles.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:toner-stain:rep-2",
          text: "It does. 2021, the big printer surgery, toner cartridge exploded like a tiny Nebula. I was elbow-deep in the machine when Marek from sales opened the door and the draft did the rest. The office called it 'the ink event'. There were photos. HR was not involved but was informed. The shirt survived. Some of the dignity did not. Fair trade.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:toner-stain:rep-3",
          text: "She has, twice, with chemicals she keeps under the desk like a field medic. The stain faded from 'continent' to 'archipelago', which she calls progress and I call a map of my failures. She says toner responds to patience and dish soap. Everything in this office responds to Renata's patience. The soap is just her alibi.",
          relationshipHint: "delighted",
          tags: ["quest:renata-tut-finished"],
        },
        {
          id: "marek:toner-stain:rep-4",
          text: "He is technically right: polymer dust, precisely ground, carrying pigment. That is like saying a hurricane is 'wind, organized'. Toner is structured dust with intent. It gets into sleeves, souls, and small talk. He repairs machines with it bare-handed and remains unstained, which is either mastery or a pact. I have stopped asking. The sleeve asks for both of us.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "marek:toner-stain:rep-5",
          text: "They do, by me, holding my sleeve like a ghost story. Rule one: toner is installed, never shaken. Rule two: gloves exist for a reason. Rule three: when it explodes, close the door, because drafts are toner's accomplice. Pawel took notes, bought gloves the same day, and his sleeves remain clean. The stain is a curriculum. Enroll early.",
          relationshipHint: "pleased",
          tags: ["quest:pawel-apprentice"],
        },
        {
          id: "marek:toner-stain:rep-6",
          text: "It is, and honestly, every IT person earns one eventually. Mine is just more committed than most. The stain says 'this one opens the machines'. Clients have never once mentioned it. Colleagues mention it constantly, with love. When the sleeve finally retires, I am keeping the cuff. Some patches are documentation, and mine documents a decade of opening things I was told not to.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "marek:its-slow",
      label: "'It's slow'",
      optionCandidates: [
        { id: "marek:its-slow:opt-1", topicId: "marek:its-slow", text: "A ticket just says 'it's slow'?" },
        { id: "marek:its-slow:opt-2", topicId: "marek:its-slow", text: "How do you translate 'slow' into facts?" },
        { id: "marek:its-slow:opt-3", topicId: "marek:its-slow", text: "The slow machine had forty browser extensions?" },
        { id: "marek:its-slow:opt-4", topicId: "marek:its-slow", text: "Tomek asks 'slow compared to what'?" },
        { id: "marek:its-slow:opt-5", topicId: "marek:its-slow", text: "The speed fix was 8 gigabytes of RAM?" },
        { id: "marek:its-slow:opt-6", topicId: "marek:its-slow", text: "Why is 'slow' the hardest ticket in IT?" },
      ],
      replyCandidates: [
        {
          id: "marek:its-slow:rep-1",
          text: "I get six a week, and every one is a different planet. 'Slow' covers failing disks, full browsers, dying fans, wifi corners, and one memorable case that was a mouse with a low battery. The word is a fog. My job is weather reporting. I need wind speed, not vibes. I ask and ask, gently, until the fog gives me a number.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:its-slow:rep-2",
          text: "Three questions: slow since when, slow doing what, slow for everyone or just you. Those three turn fog into a map ninety percent of the time. 'Since Tuesday' points at Tuesday. 'Slow in the browser' points at the browser. 'Just you' is my favorite, because it means the fix is local and the office stays calm. Diagnosis is just polite interrogation.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:its-slow:rep-3",
          text: "It did, including one that reordered his tabs by moon phase. The machine had forty extensions and the soul of a hoarder. We staged an intervention: I showed him the memory graph, he gasped, we kept five. The laptop now boots in daylight hours. He reports it feels 'naked but fast'. That is the exact trade. I offer it to everyone now, with the graph as a mirror.",
          relationshipHint: "delighted",
        },
        {
          id: "marek:its-slow:rep-4",
          text: "He does, and it is annoying and perfect. 'Slow compared to yesterday? Compared to the new laptop in the corner? Compared to your expectations?' Half the time the answer is 'compared to my old one', which is a purchasing conversation, not a repair. The question reframes the ticket in one line. I stole it and I credit him every time, loudly, while he pretends not to hear.",
          relationshipHint: "pleased",
          tags: ["quest:tomek-reviewed-pr", "relationship:neutral"],
        },
        {
          id: "marek:its-slow:rep-5",
          text: "It was. The machine had four gigs and ambitions. Same laptop, eight gigs, and the user called me to say it felt like a new computer, twice, in one week. RAM is the most honest upgrade in IT: money in, speed out, no theology. I keep one stick in the drawer now like a defibrillator. 'It's slow' plus one click and the office believes in magic again.",
          relationshipHint: "pleased",
        },
        {
          id: "marek:its-slow:rep-6",
          text: "Because it is a feeling, and feelings are true without being specific. 'Broken' has a binary. 'Slow' is a relationship between a person, a machine, and their patience that day. I treat it like pain in a doctor's office: real, important, and in need of localization. Every slow ticket is a conversation wearing a technical costume. The good ones end with tea and a graph.",
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

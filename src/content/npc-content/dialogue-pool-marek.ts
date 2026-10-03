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

/**
 * WS5 dialogue v2 pool — Maciek, The CTO (C-77).
 *
 * Pure authored data. Topics: the board deck (one black slide, one word),
 * the buzzword of the quarter (blockchain is winning), and the technical
 * legacy (five years without code, and never stronger). Task offer:
 * second the 'training' nomination in the buzzword poll (sets the
 * existing `maciek-training-buzzword` flag). Tone matches his legacy
 * trees: vision, scale, find-and-replace, and a mercy script that updates
 * laptops during meetings that are going badly.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const MACIEK_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "maciek",
  topics: [
    {
      id: "maciek:board",
      label: "The board deck",
      optionCandidates: [
        {
          id: "maciek:board:opt-1",
          topicId: "maciek:board",
          text: "Thursday is the board. Are you ready?",
        },
        {
          id: "maciek:board:opt-2",
          topicId: "maciek:board",
          text: "One black slide with one word. Really?",
        },
        {
          id: "maciek:board:opt-3",
          topicId: "maciek:board",
          text: "The board asked for metrics.",
        },
        {
          id: "maciek:board:opt-4",
          topicId: "maciek:board",
          text: "What do you say when they ask how it works?",
        },
        {
          id: "maciek:board:opt-5",
          topicId: "maciek:board",
          text: "Can I sit in on a board meeting?",
        },
        {
          id: "maciek:board:opt-6",
          topicId: "maciek:board",
          text: "The chairman underlined 'compound'.",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:board:rep-1",
          text: "The deck is ready because the deck has not changed since 2021: one slide, black, 'SCALE' in white, forty-point font. It has survived three CEOs and one actual auditor. I change the word every quarter and the courage every year.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:board:rep-2",
          text: "Really. A busy slide says you are trying. An empty slide says you have decided. Boards are terrified of people who have decided, so they nod, and the nod is the deliverable. The slide does not know what it is saying. That is its superpower.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:board:rep-3",
          text: "Metrics is a mood, and the mood this quarter is 'compound'. You delivered 'compound' with a straight face, so Thursday I present the compound graph — which is the coffee spend curve, scaled, but the board will feel the future happening to them. That is the job.",
          relationshipHint: "pleased",
          tags: ["quest:maciek-briefed-you", "relationship:neutral"],
        },
        {
          id: "maciek:board:rep-4",
          text: "'Great question — it is a platform play.' Then I drink water slowly. The pause is where the roadmap lives. If they push, I say 'we are sequencing value', which is un-askable, because nobody wants to admit they do not know what it means. Including me. Especially me.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:board:rep-5",
          text: "No. The last trainer who sat in asked one question about margins and set the AI roadmap back two quarters. You may watch through the glass while I do not write code in real time. Radical visibility has tiers, and you are in the free one.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:board:rep-6",
          text: "Underlined it, and now it is company values, plural. The man wrote a sentence fragment on a whiteboard and it has more force of law than the employee handbook. Some days I do not know if I am a CTO or a poet. The invoice does not care either way.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:buzzword",
      label: "The buzzword of the quarter",
      optionCandidates: [
        {
          id: "maciek:buzzword:opt-1",
          topicId: "maciek:buzzword",
          text: "The buzzword poll. Who is winning?",
        },
        {
          id: "maciek:buzzword:opt-2",
          topicId: "maciek:buzzword",
          text: "Blockchain is winning. Do something.",
        },
        {
          id: "maciek:buzzword:opt-3",
          topicId: "maciek:buzzword",
          text: "What was the buzzword before AI-first?",
        },
        {
          id: "maciek:buzzword:opt-4",
          topicId: "maciek:buzzword",
          text: "Could the buzzword be an emoji?",
        },
        {
          id: "maciek:buzzword:opt-5",
          topicId: "maciek:buzzword",
          text: "How do you actually pick the next one?",
        },
        {
          id: "maciek:buzzword:opt-6",
          topicId: "maciek:buzzword",
          text: "The word 'training' is on the ballot. I did that.",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:buzzword:rep-1",
          text: "Blockchain leads, 'training' surges, and 'quantum' polls respectfully from the bottom like a third-party candidate. Democracy is beautiful, and each of those words costs the company roughly a quarter, so choose like it matters. It does. That is the horror.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:buzzword:rep-2",
          text: "If blockchain wins, the slide says 'TRUST', and I will not be able to stop it. The wheel turns, the budget renews, and somewhere a consultant gets a second boat. I have seen this movie. The boat has a lanyard.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:buzzword:rep-3",
          text: "Cloud-native, then mobile-first, then — blockchain, I think? The wheel turns and the slides stay the same: you find-and-replace the buzzword and the courage renews. Find-and-replace is the most senior engineering skill there is. That is not a joke, that is the industry.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:buzzword:rep-4",
          text: "One emoji. Black slide, forty-point emoji, alone. Honestly? It might work — the board cannot ask an emoji a follow-up. I am writing it on the shortlist behind 'scale', 'trust' and 'momentum'. Do not tell anyone the shortlist exists. The shortlist IS the strategy.",
          relationshipHint: "delighted",
          tags: ["stats:high-focus"],
        },
        {
          id: "maciek:buzzword:rep-5",
          text: "I do not pick it. I notice which word the vending-machine crowd is already using, and I claim it a quarter later, like a flag on a moon they landed on by accident. Leadership is noticing. Everything else is slides.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:buzzword:rep-6",
          text: "You did. And 'training' is the first word on that ballot with an actual meaning, which makes it dangerous and honest in the same breath. Second the nomination publicly. If it wins, the slide says 'GROWTH', and for once the slide is not lying. Finish what you started.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
          offersTaskId: "maciek:task-buzzword",
        },
      ],
    },
    {
      id: "maciek:legacy",
      label: "The technical legacy",
      optionCandidates: [
        {
          id: "maciek:legacy:opt-1",
          topicId: "maciek:legacy",
          text: "When did you last write code? Honestly.",
        },
        {
          id: "maciek:legacy:opt-2",
          topicId: "maciek:legacy",
          text: "Five years without coding and you are stronger?",
        },
        {
          id: "maciek:legacy:opt-3",
          topicId: "maciek:legacy",
          text: "The glass wall — whose idea was it?",
        },
        {
          id: "maciek:legacy:opt-4",
          topicId: "maciek:legacy",
          text: "Does Pawel know what his 'backup' script does?",
        },
        {
          id: "maciek:legacy:opt-5",
          topicId: "maciek:legacy",
          text: "What was your best code, ever?",
        },
        {
          id: "maciek:legacy:opt-6",
          topicId: "maciek:legacy",
          text: "Do you miss being an engineer?",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:legacy:rep-1",
          text: "Tuesday. I opened a terminal by accident, tried to close it, closed the browser instead, and lost my tabs. I told everyone the laptop was updating. It was — I made it update. There is a script. The script is the most reliable system I maintain.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:legacy:rep-2",
          text: "Stronger. Code ages you in commits; vision ages you in quarters. I used to solve problems one keyboard at a time. Now I solve them one meeting at a time, and meetings scale worse but the solutions get more budget. I do not make the rules. I fund them.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:legacy:rep-3",
          text: "Mine. I call it radical visibility: everyone can see everyone, and by 'everyone' I mean me not coding, which is the most honest thing a CTO has ever displayed. The blinds were budgeted, then Grazyna's folder ate them, so the transparency is now enforced by procurement. Architecture by invoice.",
          relationshipHint: "delighted",
          tags: ["period:morning", "relationship:neutral"],
        },
        {
          id: "maciek:legacy:rep-4",
          text: "He thinks it is a backup. The script updates laptops, quietly, during meetings that are going badly. It is a mercy deployed at scale. He is happy. Happiness is rare here. Do not tell him what it is actually for, or I will owe him a real backup, and then who protects the meetings?",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:legacy:rep-5",
          text: "A rate limiter, 2019. Forty lines, no dependencies, still in prod, and nobody knows it is there. It has outlived two rewrites, three rebrands, and every architecture diagram that ever claimed to contain it. The best engineering is invisible. That is also the problem with it, career-wise.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:legacy:rep-6",
          text: "Every Thursday, between the board call and the second board call, for exactly eleven minutes. I open the terminal, read the logs like other people read novels, and close it. Then I go say 'scale' at someone. The eleven minutes are mine. The scale is the company's.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "maciek:hiring",
      label: "Hiring seniors",
      optionCandidates: [
        {
          id: "maciek:hiring:opt-1",
          topicId: "maciek:hiring",
          text: "You interview seniors with one question. Which one?",
        },
        {
          id: "maciek:hiring:opt-2",
          topicId: "maciek:hiring",
          text: "A candidate quoted their salary. Huge number.",
        },
        {
          id: "maciek:hiring:opt-3",
          topicId: "maciek:hiring",
          text: "The best CV I have ever seen came in today.",
        },
        {
          id: "maciek:hiring:opt-4",
          topicId: "maciek:hiring",
          text: "Should Tomek sit in on senior interviews?",
        },
        {
          id: "maciek:hiring:opt-5",
          topicId: "maciek:hiring",
          text: "What makes you reject someone instantly?",
        },
        {
          id: "maciek:hiring:opt-6",
          topicId: "maciek:hiring",
          text: "Every senior wants remote. We are an office.",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:hiring:rep-1",
          text: "'Tell me about something you deleted.' Anyone can build; the seniors have DEMOLISHED. Deleted a feature they loved, killed their own microservice, removed an abstraction they authored in 2019 with tears in their eyes. The answer tells me if they optimize for the system or for their legacy. The system people get the offer. The legacy people get a very pleasant rejection…",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:hiring:rep-2",
          text: "The number is not a salary, it is a MOAT — they are pricing the cost of ever settling for less again. I do not negotiate the number down. I negotiate the number WIDER: more scope, more trust, more graph. Money is a fact; meaning is a multiplier. Some take the fact. The ones who take the multiplier are the ones whose black slide I will one day inherit. I hire those on…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:hiring:rep-3",
          text: "A beautiful CV is a marketing artifact and I market for a living, so I am IMMUNE. The best CV I ever read belonged to a man who could not answer the deletion question, because he had never deleted anything — his whole career was addition. Impressive addition. Cathedral-scale addition. But add-only engineers are how we got the wiki, and the wiki is four pages that are…",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:hiring:rep-4",
          text: "Tomek sits in as the CANARY. Seniors perform for me and negotiate with Kasia, but they show their true etiquette to the junior holding the notepad. How a candidate treats Tomek in minute forty is how they will treat Pawel in month four. Tomek has cost us two hires and saved us from five disasters, and he does not know the power he holds. That innocence IS the instrument.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:hiring:rep-5",
          text: "Cruelty to waiters, blame in the first five minutes, and the phrase 'that is not my job' with a straight face. I can teach a framework, a stack, and even vision — the vision I can install with one black slide and two quarters. I cannot install decency. The instant rejections are rare, which makes them memorable, and I remember every one. They are usually running something…",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:hiring:rep-6",
          text: "Then we sell the office as the differentiator — remote seniors are isolated seniors, and isolated seniors plateau. HERE they get a firewatch to stand beside, a wall of glass to be radically visible through, and a dog who audits standups. You cannot remote into this culture. The graph matters more than geography and the graph lives HERE. We lose some. The ones who stay…",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:vision-doc",
      label: "The vision document",
      optionCandidates: [
        {
          id: "maciek:vision-doc:opt-1",
          topicId: "maciek:vision-doc",
          text: "Nobody has finished reading the vision doc.",
        },
        {
          id: "maciek:vision-doc:opt-2",
          topicId: "maciek:vision-doc",
          text: "The doc is 84 pages. Was that a choice?",
        },
        {
          id: "maciek:vision-doc:opt-3",
          topicId: "maciek:vision-doc",
          text: "Page 40 has a diagram of a triangle. Yours?",
        },
        {
          id: "maciek:vision-doc:opt-4",
          topicId: "maciek:vision-doc",
          text: "Dawid quoted page 12 at the board. Accurate?",
        },
        {
          id: "maciek:vision-doc:opt-5",
          topicId: "maciek:vision-doc",
          text: "When does the vision doc get updated?",
        },
        {
          id: "maciek:vision-doc:opt-6",
          topicId: "maciek:vision-doc",
          text: "Summarize the vision in one sentence. Now.",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:vision-doc:rep-1",
          text: "The vision doc is not meant to be finished — it is meant to be STARTED. The first page carries the whole message; the other eighty-three are proof of seriousness, like the mass of a sculpture nobody climbs. People quote page one, Dawid quotes page twelve, and the doc is cited in board packs as 'the eighty-four page vision', where the number does the intimidation. Nobody…",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:vision-doc:rep-2",
          text: "Entirely. A five-page vision is a memo; a thirty-page vision is a plan; an eighty-four page vision is a MONUMENT, and monuments do not get edited by committee because nobody can lift the chisel. The length is not content, it is DEFENSE. Every revision cycle costs a weekend of my life at that page count, which is exactly the protection the vision needs. Bureaucracy as…",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:vision-doc:rep-3",
          text: "Page forty's triangle is MY triangle — people, process, platform — borrowed from a consultant who invoiced us for it in 2021 and drew it on a napkin I still have. The napkin is worth more than the doc. If the triangle ever appears in someone else's deck, I will know the doc finally got read, and I will not know whether to be proud or to update the security. Both, probably.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:vision-doc:rep-4",
          text: "Dawid quoted page twelve — 'the compounding of trust is the only non-linear asset' — and the BOARD LOVED IT. The sentence took me one evening and has done four years of board service without a sick day. Accurate to the doc, yes. Accurate to the company? The trust compound chart is the coffee spend curve, same as the slide, and the board cannot get enough of it. The vision…",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:vision-doc:rep-5",
          text: "Every three years, whether it needs it or not, because a vision that updates too often is a mood and one that never updates is a museum. The 2027 update is already drafting itself in the notes app: same first page, same triangle, one new word where 'scale' is starting to show its age. The word will be 'training'. Someone put it on the ballot. The ballot wins. The doc…",
          relationshipHint: "pleased",
          tags: ["quest:maciek-training-buzzword"],
        },
        {
          id: "maciek:vision-doc:rep-6",
          text: "'We believe people compound.' That is it. Eighty-four pages of elaboration, four years of board decks, one glass wall of radical visibility — all of it is that sentence wearing different fonts. You asked for it live, which means you wanted the version without the fonts, which means you understood the doc better than the doc's author planned. The summary is the vision.…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "maciek:vendors",
      label: "The vendor circus",
      optionCandidates: [
        {
          id: "maciek:vendors:opt-1",
          topicId: "maciek:vendors",
          text: "A vendor wants to show us their AI platform. Again.",
        },
        {
          id: "maciek:vendors:opt-2",
          topicId: "maciek:vendors",
          text: "The demo worked perfectly. Suspicious?",
        },
        {
          id: "maciek:vendors:opt-3",
          topicId: "maciek:vendors",
          text: "Grazyna cut the vendor lunch budget.",
        },
        {
          id: "maciek:vendors:opt-4",
          topicId: "maciek:vendors",
          text: "The same vendor pitched blockchain in 2022.",
        },
        {
          id: "maciek:vendors:opt-5",
          topicId: "maciek:vendors",
          text: "A vendor called me 'a visionary' in an email.",
        },
        {
          id: "maciek:vendors:opt-6",
          topicId: "maciek:vendors",
          text: "How do you end a vendor relationship kindly?",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:vendors:rep-1",
          text: "Book it. Vendor demos are free theater and this office DESERVES theater. The rule is one hour, our room, our wifi — because their wifi is a scripted experience and our wifi is a truth serum. Half the platforms die on office network in the first ten minutes, which is the cheapest due diligence in the industry. The other half get a second meeting. The second meeting is…",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:vendors:rep-2",
          text: "Perfect demos are rehearsed on perfect data by perfect people, which means the demo measured PREPARATION, not product. I ask to see the feature with OUR data — the haunted client workspace, Tomek's Portuguese comment, the rainforest API. A platform that survives our data has survived something real. None survive. That is not cynicism, it is SELECTION PRESSURE. Our mess…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:vendors:rep-3",
          text: "She did, and the vendor lunches died with a memo that quoted our own travel policy at us. The vendors now get coffee from the machine, which makes negotiations faster, humbler, and twice as honest — nobody closes a platform deal on bad coffee, and that is the POINT. The deals that survive machine coffee are the deals worth signing. Grazyna's budget cut was the best…",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:vendors:rep-4",
          text: "The same account manager, the same tie, and a pitch that survived a full rebrand by find-and-replace: 'blockchain' became 'AI', the architecture diagram did not change a single box. I keep the two decks side by side in a folder called 'archaeology'. When the NEXT word arrives, the folder gets a third deck and the circle completes itself. The vendor is not lying. The…",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:vendors:rep-5",
          text: "It is flattery with a commission structure, and it works on exactly the people it should not — which is why I read every word. 'Visionary' in a vendor email means they have identified the approver and skipped the evaluator, which tells me their product cannot survive the evaluator. I forward those emails to Grazyna with no comment. The email dies in her ledger like a fly…",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:vendors:rep-6",
          text: "You do not end it. You FADE it — slower replies, longer silences, and one final call where you thank them for the partnership and mention that 'the priorities have evolved'. Vendors understand evolution; it is their whole industry. The polite fade preserves the relationship for the day the wheel turns and you need them again, which it will, and you will. I have re-signed…",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:hackathon",
      label: "The hackathon he sponsors",
      optionCandidates: [
        {
          id: "maciek:hackathon:opt-1",
          topicId: "maciek:hackathon",
          text: "You sponsor a student hackathon. Why?",
        },
        {
          id: "maciek:hackathon:opt-2",
          topicId: "maciek:hackathon",
          text: "The winning project was a Roomba map. Yours?",
        },
        {
          id: "maciek:hackathon:opt-3",
          topicId: "maciek:hackathon",
          text: "Tomek wants to mentor at the hackathon.",
        },
        {
          id: "maciek:hackathon:opt-4",
          topicId: "maciek:hackathon",
          text: "Grazyna calls it 'the twenty-four hour invoice'.",
        },
        {
          id: "maciek:hackathon:opt-5",
          topicId: "maciek:hackathon",
          text: "Have you ever competed in one yourself?",
        },
        {
          id: "maciek:hackathon:opt-6",
          topicId: "maciek:hackathon",
          text: "What actually gets recruited at hackathons?",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:hackathon:rep-1",
          text: "Because twenty students, one weekend, and a pizza budget is the cheapest scouting operation in the industry. Recruiters pay for CVs; I pay for CAFFEINE and watch who emerges at hour nineteen — the hour when the demo is broken and the character shows. The CV tells me who they claim to be. Hour nineteen tells me who they are when the graph dips. I have hired four people…",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:hackathon:rep-2",
          text: "Mine, and I am not even ashamed — a Roomba drawing a map of the venue in real time on a projector. Simple, visible, and the demo DID THE THING at hour twenty-three while other teams were still importing libraries. I have carried the lesson into every board deck since: the winning demo is the one that works, and working beats ambitious by a landslide that ambition never…",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:hackathon:rep-3",
          text: "Tomek mentoring is the best idea anyone has had all quarter, and here is why: the students will ask him questions he once asked, and his answers will be the honest version — pasted, hotfixed, survived. A senior teaches WHAT to build. Tomek teaches HOW IT FEELS, which is the part that makes students stay in the industry. I will introduce him as 'our senior developer'…",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:tomek-apprentice"],
        },
        {
          id: "maciek:hackathon:rep-4",
          text: "She does, and the description is load-bearing — twenty-four hours, three invoices: pizza, t-shirts, and my time. She approved all three with a single signature and one comment: 'the graph better attend'. The graph attended. Two hires, one internship, and a student who now fixes our dashboards for coffee money. The twenty-four hour invoice is the best marketing spend…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:hackathon:rep-5",
          text: "2013, and our team built a ride-sharing app for a city with four taxis. We lost to a weather dashboard. The dashboard WORKED. I have been professionally haunted by working software ever since, which is why my demos are one slide and my hackathon judging rewards the team that ships by hour twenty. Losing taught me more than the win would have. The win would have taught…",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:hackathon:rep-6",
          text: "Nobody recruits at hackathons anymore — the T-shirt market collapsed, everyone has twelve hackathon shirts. What I recruit is STAMINA and TASTE. Stamina is hour nineteen. Taste is which of the ten possible features they cut when the clock bit. You cannot interview for taste; you can only watch someone delete their favorite feature at 3am and note whether their hands shake.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "maciek:kpis",
      label: "Engineering KPIs",
      optionCandidates: [
        {
          id: "maciek:kpis:opt-1",
          topicId: "maciek:kpis",
          text: "What KPIs do you report upward, honestly?",
        },
        {
          id: "maciek:kpis:opt-2",
          topicId: "maciek:kpis",
          text: "Lines of code as a metric. Anyone still defending it?",
        },
        {
          id: "maciek:kpis:opt-3",
          topicId: "maciek:kpis",
          text: "Grazyna wants engineering to have 'units'.",
        },
        {
          id: "maciek:kpis:opt-4",
          topicId: "maciek:kpis",
          text: "Marek's output is invisible. How do you measure him?",
        },
        {
          id: "maciek:kpis:opt-5",
          topicId: "maciek:kpis",
          text: "The board wants a velocity chart. Sigh?",
        },
        {
          id: "maciek:kpis:opt-6",
          topicId: "maciek:kpis",
          text: "Which KPI did you kill and never mourn?",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:kpis:rep-1",
          text: "Three numbers: incidents per month, hires who stay past a year, and the one I invented — 'surprises', which is anything that made the board ask a question I had not pre-answered. Surprises trend to zero, incidents trend to boring, and the retention number does what retention numbers do. Upward reporting is translation: the truth goes in, the graph comes out. The graph…",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:kpis:rep-2",
          text: "Lines of code measures the cost, never the value — it is an invoice pretending to be a scoreboard. The best engineer I ever employed deleted eleven thousand lines in one afternoon and the system got faster, cheaper, and calmer, and by the lines metric that afternoon was a CRIME. I defend zero metrics that punish subtraction. Any KPI that rewards typing is a KPI that…",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:kpis:rep-3",
          text: "She wants engineering measured in units because units convert to columns, and columns convert to peace. So we gave her 'trainings delivered' and 'incidents prevented', and both are real numbers with real sources. The deal beneath the deal: she gets units, I keep judgment. The day engineering becomes units ONLY is the day the rate limiter gets rewritten by someone…",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:kpis:rep-4",
          text: "You do not measure Marek. You measure the SPACE AROUND HIM — the incidents that do not happen, the alerts that stay quiet, the Fridays that pass like any other day. His KPI is the absence of evidence, which is the hardest number in management and the most valuable. I report it as 'stability: maintained' and the board nods, because the board has never once heard Marek's…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:kpis:rep-5",
          text: "The velocity chart goes to the board every quarter and every quarter it goes UP, which it manages by being measured in story points, which are a currency we print ourselves. Is it honest? It is CONSISTENT, and a consistent fiction outranks a chaotic truth in every boardroom on earth. The real velocity lives in my incidents-per-month. The chart is the diplomatic passport.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:kpis:rep-6",
          text: "Commit count. Killed in 2019, mourned by nobody who understood it. It died the day Marek shipped a one-line fix for an outage that had survived three 'productive' weeks, and I stood in front of the graph that said his month was empty while the building still stood. A metric that calls the man who saved prod 'unproductive' is not a metric, it is a LIABILITY. It went in…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "maciek:mentors",
      label: "Who mentored Maciek",
      optionCandidates: [
        {
          id: "maciek:mentors:opt-1",
          topicId: "maciek:mentors",
          text: "Who taught you the black slide?",
        },
        {
          id: "maciek:mentors:opt-2",
          topicId: "maciek:mentors",
          text: "Did you have a mentor before the CTO title?",
        },
        {
          id: "maciek:mentors:opt-3",
          topicId: "maciek:mentors",
          text: "Ever had a mentor who was wrong about you?",
        },
        {
          id: "maciek:mentors:opt-4",
          topicId: "maciek:mentors",
          text: "You mentor by delegation. Deliberate?",
        },
        {
          id: "maciek:mentors:opt-5",
          topicId: "maciek:mentors",
          text: "Who mentors YOU now, at the top?",
        },
        {
          id: "maciek:mentors:opt-6",
          topicId: "maciek:mentors",
          text: "What do you know now that you wish you knew then?",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:mentors:rep-1",
          text: "A CFO named Barbara, 2016, during a board prep that was going badly for my forty-slide deck. She looked at my prep, looked at the clock, closed the laptop, and said 'they have already decided. Tell them the decision.' One slide, black, the word in white. I have been stealing from Barbara for a decade and the industry has been stealing from me. The slide is a hand-me-down.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:mentors:rep-2",
          text: "A team lead named Andrzej who taught me the second-most important thing I know: READ THE LOGS. Not the ticket, not the standup notes — the logs, where the system tells the truth at volume. He read them aloud to me once, like poetry, and I heard the story the tickets had flattened. Every skill I have stacks on that afternoon. Andrzej drove a car that could not pass…",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:mentors:rep-3",
          text: "One, and he told me I was 'too visionary to be technical', which he meant as a eulogy for my engineering career. He was half right and completely wrong about the half — I am visionary BECAUSE I was technical, and the eleven minutes I still spend in a terminal weekly are the interest on his wrongness. Mentors are usually describing their own ceiling. His ceiling…",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:mentors:rep-4",
          text: "Deliberate, yes. I hand people a decision one size too big and stand far enough away that they cannot hand it back. That is how Barbara did it — she did not teach me the black slide, she LEFT THE ROOM with the deck unfinished, and the slide happened because nobody was left to ask. Mentoring by presence creates students. Mentoring by ABSENCE creates successors. The CTO…",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:mentors:rep-5",
          text: "Books, the graph, and Janusz — in that order. Books for frameworks, the graph for humility, and Janusz because he is the only person in this building who has watched three CEOs arrive believing things and leave knowing things, and he will tell you which beliefs survived contact with the drains. I have lunch with Janusz quarterly. Officially it does not appear on…",
          relationshipHint: "delighted",
          tags: ["quest:janusz-knows-the-plug", "relationship:warm"],
        },
        {
          id: "maciek:mentors:rep-6",
          text: "That the slides were never the work. I spent my first CTO year polishing decks like a craftsman and the company was being held together the whole time by a clipboard, a roster, and a man with a mop. The deck says 'SCALE'. The clipboard says who is leaving, who is lying, and where the drains are. If I could send one sentence back to 2016 Maciek it would be: 'learn…",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "maciek:demo",
      label: "The demo god rules",
      optionCandidates: [
        {
          id: "maciek:demo:opt-1",
          topicId: "maciek:demo",
          text: "Never demo live. Is that really the rule?",
        },
        {
          id: "maciek:demo:opt-2",
          topicId: "maciek:demo",
          text: "A client demanded live. What do you do?",
        },
        {
          id: "maciek:demo:opt-3",
          topicId: "maciek:demo",
          text: "The video demo is from 2023. Does it matter?",
        },
        {
          id: "maciek:demo:opt-4",
          topicId: "maciek:demo",
          text: "Tomek's live demo survived. Teach us.",
        },
        {
          id: "maciek:demo:opt-5",
          topicId: "maciek:demo",
          text: "What is the best demo failure you ever saw?",
        },
        {
          id: "maciek:demo:opt-6",
          topicId: "maciek:demo",
          text: "Why does every demo die at the login screen?",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:demo:rep-1",
          text: "The rule is law and the law has one exception: pre-recorded is a demo, live is a SEANCE. You are inviting the room to summon the product's spirit in real time and hoping nothing interrupts the connection to the other side. I have watched a hundred seances and the spirit showed maybe twice. The video plays the same way every time, which is the definition of professionalism.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:demo:rep-2",
          text: "Then you negotiate the SIZE of live, because 'live' is a spectrum wearing a demand. Full live is a seance; I offer 'live-ish' — the product running on our hardware, our data, from OUR room, with me narrating and one prepared failure we recover from together. The recovery is the demo. A client who demands live is a client buying trust, and trust is best demonstrated…",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:demo:rep-3",
          text: "It matters, and the date is the FEATURE. A 2023 video presented with confidence says 'the product was finished then and has been compounding since' — clients project forward from evidence, and your job is to give them old evidence and new confidence. I have presented the same core video for three years with a different first slide each year. The slide says what changed.…",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:demo:rep-4",
          text: "Tomek demoed live and the room held its breath for eleven minutes, and what saved him was not luck — it was that he had HOTFIXED that exact screen forty times and could narrate the failure paths like a tour guide. That is the whole secret: live demos survive when you know the product's failure modes intimately, because the demo breaks along the seams you have…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:demo:rep-5",
          text: "A vendor's flagship demo, 2024: the product opened with a 404 because their own API had moved. The presenter, a professional, did not flinch — he said 'and as you can see, the platform is now self-documenting the transition' and closed the laptop to applause. I was the only one in the room who knew it was a failure. That man is the best presenter I have ever seen and I…",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:demo:rep-6",
          text: "Because the login screen is the only part of the system that touches the whole truth at once — network, database, identity, and the one certificate nobody renewed. Every demo can fake everything EXCEPT getting in. So the rule behind the rule: demo from INSIDE the system, pre-logged-in, like a house tour that starts in the kitchen. Nobody tours a house by testing the…",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "maciek:bruce-glass",
      label: "The view from the glass",
      optionCandidates: [
        {
          id: "maciek:bruce-glass:opt-1",
          topicId: "maciek:bruce-glass",
          text: "What do you actually see from inside the glass office?",
        },
        {
          id: "maciek:bruce-glass:opt-2",
          topicId: "maciek:bruce-glass",
          text: "Bruce is visible over your shoulder on every call.",
        },
        {
          id: "maciek:bruce-glass:opt-3",
          topicId: "maciek:bruce-glass",
          text: "Do you ever miss having walls?",
        },
        {
          id: "maciek:bruce-glass:opt-4",
          topicId: "maciek:bruce-glass",
          text: "The glass fogs when the heating argues with winter.",
        },
        {
          id: "maciek:bruce-glass:opt-5",
          topicId: "maciek:bruce-glass",
          text: "Klaudia films against your glass for the light.",
        },
        {
          id: "maciek:bruce-glass:opt-6",
          topicId: "maciek:bruce-glass",
          text: "If you could change one thing about the office?",
        },
      ],
      replyCandidates: [
        {
          id: "maciek:bruce-glass:rep-1",
          text: "I see the company running without me, which is the entire point of the architecture and the reason I sleep in multiples of ninety minutes. Zosia routing, Marek watching, Renata carrying the clipboard — the glass wall is not transparency, it is a DASHBOARD, and the dashboard is load-bearing. Every CTO should be forced to watch the org function in their absence. The…",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:bruce-glass:rep-2",
          text: "Bruce appears on every investor call like a co-founder with wings, and I have stopped cropping him. The bat says what the deck cannot: this company is serious enough to survive and strange enough to remember. Two investors have opened meetings with Bruce questions, which means the bat is doing PRE-SALES. Dawid thinks Bruce is his. Bruce is the company's. Bruce works for…",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:bruce-glass:rep-3",
          text: "Walls are what you hide the company behind, and I spent one decade hiding behind them — the terminal in the corner, the door closed, the org guessing at my mood from my calendar. The glass ended the guessing. Now everyone sees me not coding in real time, which is radical honesty about what a CTO is. Do I miss walls? At 6pm, briefly, the way you miss a coat you outgrew.…",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:bruce-glass:rep-4",
          text: "The fog happens every January for a week and it is the only privacy the office offers me all year. I schedule the honest calls — the ones where the graph is being discussed as a person — during fog week. The glass clouds over and the radical visibility goes on a retreat. Janusz knows the fog schedule better than the heating technicians and told me once, with real…",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:bruce-glass:rep-5",
          text: "She films against my glass every Thursday because the afternoon light does something to skin tones that her ring light cannot. The arrangement is diplomatic: I get to be in the background of 'a real company at work', and she gets the light. My cameo rate is one out of every six reels, out of focus, near Bruce. The comments call me 'the CTO in the corner'. I have been…",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:bruce-glass:rep-6",
          text: "A door that locks. Not for secrecy — for the eleven minutes. The terminal, the logs, the weekly pilgrimage to being an engineer instead of a slide. The glass office means the pilgrimage happens in public, and there are versions of reading logs that an audience ruins. One lockable room, soundproof, no glass, no Bruce. I have asked. The answer is always the same word…",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "maciek:keynotes",
      label: "The keynote circuit",
      optionCandidates: [
        { id: "maciek:keynotes:opt-1", topicId: "maciek:keynotes", text: "You keynote twice a year. Where does it come from?" },
        { id: "maciek:keynotes:opt-2", topicId: "maciek:keynotes", text: "Forty minutes of stories. Where are the slides?" },
        { id: "maciek:keynotes:opt-3", topicId: "maciek:keynotes", text: "Klaudia clips your keynotes. Royalties?" },
        { id: "maciek:keynotes:opt-4", topicId: "maciek:keynotes", text: "Do you rehearse the pauses or do they land?" },
        { id: "maciek:keynotes:opt-5", topicId: "maciek:keynotes", text: "What is the keynote you refuse to give?" },
        { id: "maciek:keynotes:opt-6", topicId: "maciek:keynotes", text: "The audience laughed at the SCALE slide. Reaction?" },
      ],
      replyCandidates: [
        {
          id: "maciek:keynotes:rep-1",
          text: "Twice a year, from the same place: eleven minutes with the terminal on Thursday, one graph, and whatever the graph admits. A keynote is a quarter of office truth compressed onto a stage. I do not invent content. I schedule it into a room with better lighting and a clicker that works.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:keynotes:rep-2",
          text: "The slides exist in case the stories fail — four of them, mostly black, one number each. The stories carry the room; the slides carry the record. If the projector dies, the keynote survives. If the stories die, the projector cannot save me. That is the correct dependency graph for public speaking.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:keynotes:rep-3",
          text: "She clips, tags, and posts, and the clips outperform the talks — my best-performing sentence is nine seconds long and took eleven years. Royalties would be vulgar; what I get instead is reach, which is the only currency that compounds. She gets content. I get compound. The auditor gets neither. Fair.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:keynotes:rep-4",
          text: "Rehearsed. The pauses are written into the notes with timings, like rests in a score. A pause lands by accident once and then becomes luck. Luck is not a strategy. I have rehearsed the same silence for four years and it has never once missed. Repetition is what makes it sound spontaneous.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:keynotes:rep-5",
          text: "The one about failure. Not because I have none — because mine are boring, documented, and fixed, and the audience wants a scar with blood still on it. I cannot manufacture fresh failure on demand. I can only run experiments and wait. The talk will exist when the scar does. The scar is in progress.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:keynotes:rep-6",
          text: "Then the slide did its job. A laughed-at slide is a remembered slide, and remembered is the whole business. I have had slides applauded, photographed, and once tattooed — an intern, 2023, in eyeliner, for the afterparty. SCALE has outlived three product lines. It earns its forty points of font.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "maciek:business-books",
      label: "The business books",
      optionCandidates: [
        { id: "maciek:business-books:opt-1", topicId: "maciek:business-books", text: "Your shelf has thirty business books. Read?" },
        { id: "maciek:business-books:opt-2", topicId: "maciek:business-books", text: "Which business book changed you, honestly?" },
        { id: "maciek:business-books:opt-3", topicId: "maciek:business-books", text: "You gift books to new managers. Which ones?" },
        { id: "maciek:business-books:opt-4", topicId: "maciek:business-books", text: "The productivity genre is a scam. Defend it." },
        { id: "maciek:business-books:opt-5", topicId: "maciek:business-books", text: "You annotate your books. Evidence exists." },
        { id: "maciek:business-books:opt-6", topicId: "maciek:business-books", text: "What would YOUR book be called?" },
      ],
      replyCandidates: [
        {
          id: "maciek:business-books:rep-1",
          text: "Read, annotated, and pruned annually — the shelf is not decoration, it is a changelog of my confusions. Each book was the answer to a question I was asking at the time. The ones that stopped answering got donated to the office shelf, where they confuse new people at the correct dosage.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:business-books:rep-2",
          text: "'The Goal', again — Zosia and I converge there, which is the only book agreement this office has ever recorded. A factory novel taught me that systems hide their constraint in the last place you look. I have applied it to teams, pipelines, and one marriage of departments. The constraint is never where the noise is.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:business-books:rep-3",
          text: "Two, always: 'The Goal' for systems and 'The Mom Test' for listening. New managers arrive believing vision is the job. The books arrive to explain that the job is asking questions that survive honesty. I inscribe them with one line: 'the constraint is never where the noise is'. It ages well.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:business-books:rep-4",
          text: "The genre is a scam the way the gym is a scam — most buyers never apply it, the testimonials are cherry-picked, and yet the few who DO the work get real results and fund the whole industry. I am one of the few. I am also the industry's best customer. Both facts sit on my shelf without arguing.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:business-books:rep-5",
          text: "In pencil, in the margins, with dates — the annotations are the real book, and pencil means I may disagree with my younger self later. I once found a 2018 note calling delegation 'a loss of control'. I photographed that note. It hangs by my desk as a warning from a previous administration. Mine.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:business-books:rep-6",
          text: "'Compound Everything: Notes From the Eleventh Minute'. It will never be written — a book takes a year of not running the company, and the company is the better experiment. The outline exists, on one black slide, in a folder named 'someday'. Someday is a legitimate project phase. Just not this quarter.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "maciek:podcast-guest",
      label: "The podcast guest",
      optionCandidates: [
        { id: "maciek:podcast-guest:opt-1", topicId: "maciek:podcast-guest", text: "You did three podcasts this month. Why?" },
        { id: "maciek:podcast-guest:opt-2", topicId: "maciek:podcast-guest", text: "The host asked about revenue. You dodged. Artful?" },
        { id: "maciek:podcast-guest:opt-3", topicId: "maciek:podcast-guest", text: "Your podcast voice is calmer than your meeting voice." },
        { id: "maciek:podcast-guest:opt-4", topicId: "maciek:podcast-guest", text: "Klaudia wants to co-host an episode. Strategy?" },
        { id: "maciek:podcast-guest:opt-5", topicId: "maciek:podcast-guest", text: "What question does every podcast host ask?" },
        { id: "maciek:podcast-guest:opt-6", topicId: "maciek:podcast-guest", text: "The worst podcast you ever did. Details." },
      ],
      replyCandidates: [
        {
          id: "maciek:podcast-guest:rep-1",
          text: "Three is the maximum dose — podcasts are the only channel where the buyer hears the whole sentence. Ads buy seven seconds; a podcast gives you forty minutes of trusting voice. I do them in batches, in one week, so the office loses me once instead of three times. Batching is respect.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:podcast-guest:rep-2",
          text: "Not dodging — framing. Revenue is a photograph of one quarter; I offered the trend, the mechanics, and the shape. Numbers without context are gossip. The host accepted the frame because the frame was true. You cannot fake a trend on a forty-minute show. The format is honesty with a microphone.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:podcast-guest:rep-3",
          text: "Because podcasts record at the end of MY day and the middle of yours, and my voice knows the difference. The calm is not performed. It is the sound of a man who has already done his three calls. On stage I project. On podcasts I confess. Different rooms, different registers, same content.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:podcast-guest:rep-4",
          text: "Strategic and inevitable — her audience is younger than ours, her format is better than ours, and the co-host move is how I borrow both without buying anything. One episode, one topic, her editing. The risk is she outshines me. The reward is she does. Either way, the company trends. I accept set dressing.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:podcast-guest:rep-5",
          text: "'What is your morning routine?' — I have answered it eleven times and each answer was true for about a month, because routines change like weather. I finally give the SAME answer: 'I read the graph and I drink the coffee'. The hosts hate it. The honesty is load-bearing. The routine is not.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:podcast-guest:rep-6",
          text: "Recorded at eleven pm in a hotel lobby, the host reading questions for the first time, and my microphone died mid-sentence — I finished the thought into a sandwich. They ran it unedited. It is the most human I have ever sounded and the only episode with inbound that converted. Perfection is for demos.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "maciek:innovation-lab",
      label: "The innovation lab",
      optionCandidates: [
        { id: "maciek:innovation-lab:opt-1", topicId: "maciek:innovation-lab", text: "The innovation lab has a name. Does it have staff?" },
        { id: "maciek:innovation-lab:opt-2", topicId: "maciek:innovation-lab", text: "The lab's budget is one slide. Suspicious?" },
        { id: "maciek:innovation-lab:opt-3", topicId: "maciek:innovation-lab", text: "The lab produced three stickers and one bot. Win?" },
        { id: "maciek:innovation-lab:opt-4", topicId: "maciek:innovation-lab", text: "Who runs the lab — you, or whoever is free?" },
        { id: "maciek:innovation-lab:opt-5", topicId: "maciek:innovation-lab", text: "The lab should ship to prod sometimes. Agree?" },
        { id: "maciek:innovation-lab:opt-6", topicId: "maciek:innovation-lab", text: "Zosia wants the lab to have OKRs. Response?" },
      ],
      replyCandidates: [
        {
          id: "maciek:innovation-lab:rep-1",
          text: "A name, a room, and a rotation — the lab is two people at a time, six weeks at a stretch, chosen for curiosity rather than seniority. Staffing it permanently is how labs die: they become a department with opinions and no fingerprints. Rotation keeps the lab a verb. The moment it becomes a noun, dissolve it.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:innovation-lab:rep-2",
          text: "The budget is one slide because the lab runs on TIME, not capital — salaries already exist, the room already exists, and the only real cost is six weeks of attention. I defend the slide annually with one line: 'this is the cheapest option on every idea we are too busy to have'. The line survives. So does the lab.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:innovation-lab:rep-3",
          text: "Three stickers, one bot, and a teaching: the bot now signs for deliveries, which saved Janusz forty hours a year, and the stickers were the cheapest market research in company history. A lab does not need a product. It needs a PROOF — proof that the office can make something new on a Friday. The proof compounds.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:innovation-lab:rep-4",
          text: "Whoever is free is how the lab got three stickers and a bot — constraint is the mother of the prototype. A dedicated lead arrives when the lab finds the thing worth dedicating to. We are auditioning ideas, not managers. The day one idea survives two rotations, it earns a lead and a budget. That is the pipeline.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:innovation-lab:rep-5",
          text: "Agreed, with a quarantine — lab code ships to prod behind a flag, never onto main directly, and never into the billing module. The lab exists to make prod nervous in a controlled way. One rotation shipped a tiny feature clients noticed and praised. The lab ate well that week. Morale is a metric too.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:innovation-lab:rep-6",
          text: "Denied, gently — OKRs are a language for repeatable work, and the lab's whole value is that it is NOT repeatable yet. Measuring a lab by quarterly outcomes is measuring a seed by its shade. I gave Zosia one metric instead: ideas entering and experiments ending, counted monthly. The count is climbing. That is health.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "maciek:mornings",
      label: "The early routine",
      optionCandidates: [
        { id: "maciek:mornings:opt-1", topicId: "maciek:mornings", text: "You arrive at 5:30. Janusz reports this. Why?" },
        { id: "maciek:mornings:opt-2", topicId: "maciek:mornings", text: "The morning routine — optimization or theater?" },
        { id: "maciek:mornings:opt-3", topicId: "maciek:mornings", text: "What happens here before anyone else arrives?" },
        { id: "maciek:mornings:opt-4", topicId: "maciek:mornings", text: "Did you do the cold plunge the internet says?" },
        { id: "maciek:mornings:opt-5", topicId: "maciek:mornings", text: "The routine survived a weekend. Prove it." },
        { id: "maciek:mornings:opt-6", topicId: "maciek:mornings", text: "Would the company survive you sleeping in?" },
      ],
      replyCandidates: [
        {
          id: "maciek:mornings:rep-1",
          text: "He reports accurately and I appreciate the journalism. The early hour is the only time the company belongs to arithmetic instead of conversation — the graph, the coffee, and one hour of thinking nobody can schedule over. By eight I have done my quarter's thinking. The rest of the day is performance.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:mornings:rep-2",
          text: "Both, and the theater is load-bearing — a visible routine is a message about what the leaders respect. I think at 5:30 because it is true, and I am SEEN doing it because it is useful. The alarm does not know the difference. The office does. Both effects are real. I stopped feeling guilty about either.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:mornings:rep-3",
          text: "The building wakes in order: Janusz at five, the heating, the coffee machine's first ceremony, and then me — the only human witness. The office at 5:30 is the most honest room in the company: no postures, no calendars, just the furniture and the graph. I take notes. The notes beat any consultant's.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:mornings:rep-4",
          text: "The plunge lasted one January and produced one excellent lesson: I am not the internet's version of me, and the internet's version is more disciplined and less damp. Now it is coffee, the graph, and a walk to the window. The influencers moved on. I moved on faster. The routine that survives is the one that survives.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:mornings:rep-5",
          text: "It has survived two holidays, one flood anniversary, and a week of food poisoning, because the routine is one coffee and one graph — there is nothing to fail. Elaborate routines collapse; minimal ones compound. That is the actual productivity secret and it fits in one sentence, which is why it cannot be sold.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:mornings:rep-6",
          text: "It survived my appendix in 2022, which is stronger evidence than any fire drill. The company runs on systems, not on my alarm clock — that is what the graph is FOR. I sleep in when the body invoices. The graph does not notice. That is the highest compliment I can pay the machine we built.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "maciek:feng-shui",
      label: "The office energy",
      optionCandidates: [
        { id: "maciek:feng-shui:opt-1", topicId: "maciek:feng-shui", text: "You rearranged the plants for 'energy flow'. Believe?" },
        { id: "maciek:feng-shui:opt-2", topicId: "maciek:feng-shui", text: "Your desk has three objects. Explain the curation." },
        { id: "maciek:feng-shui:opt-3", topicId: "maciek:feng-shui", text: "The lobby feels different since the repaint. Why?" },
        { id: "maciek:feng-shui:opt-4", topicId: "maciek:feng-shui", text: "Should the meeting rooms have a chair hierarchy?" },
        { id: "maciek:feng-shui:opt-5", topicId: "maciek:feng-shui", text: "Feng shui or just tidying with better marketing?" },
        { id: "maciek:feng-shui:opt-6", topicId: "maciek:feng-shui", text: "Which corner of the office has the best energy?" },
      ],
      replyCandidates: [
        {
          id: "maciek:feng-shui:rep-1",
          text: "Believe is too strong; I OBSERVE. People walk where walls allow and linger where light allows, and moving a plant moved the lingering. Call it energy flow or call it foot traffic — the effect is identical and one of the names is free. The plants obey the traffic. The traffic does not obey the plants.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:feng-shui:rep-2",
          text: "The graph, a stone from the founding trip, and one empty frame. The frame is the message: there is always room for the next thing. Three objects is the maximum a desk can hold before the desk starts making decisions about you. I curate the desk the way I curate the roadmap — ruthlessly, annually, in pencil.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:feng-shui:rep-3",
          text: "Paint is the cheapest psychology in the building. The lobby went from beige to one deep color, and suddenly visitors wait with their shoulders down. Nobody can invoice the difference. I have tried to measure it and the measurement refuses. Some improvements are real precisely because they cannot be quantified.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:feng-shui:rep-4",
          text: "Never — the meeting room is the one place the org chart gets suspended, and assigned chairs reintroduce it through furniture. My one rule is the same for everyone: sit where the light does not kill the screen. Geometry decides. Geometry has never once been accused of politics.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:feng-shui:rep-5",
          text: "Tidying with better marketing, and I respect the marketing — 'energy' gets budgets that 'tidying' never will, and the office needed the tidying. I hired the consultant, kept the rearrangements that measurably worked, and let the crystals be a story. Stories do maintenance too. Cheaper than most.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:feng-shui:rep-6",
          text: "The corner by the training room, where the afternoon light lands and Burek naps. More real conversations happen there per week than in every meeting room combined. I have tried to install that energy elsewhere and failed. You cannot copy a corner. You can only protect it. That is my whole feng shui.",
          relationshipHint: "delighted",
          tags: ["quest:burek-standup-observed", "relationship:warm"],
        },
      ],
    },
    {
      id: "maciek:art",
      label: "The wall art budget",
      optionCandidates: [
        { id: "maciek:art:opt-1", topicId: "maciek:art", text: "The lobby has real art now. Who approved that?" },
        { id: "maciek:art:opt-2", topicId: "maciek:art", text: "Grazyna filed the art under 'morale infrastructure'?" },
        { id: "maciek:art:opt-3", topicId: "maciek:art", text: "The Batman sign has neighbors now. Who picks?" },
        { id: "maciek:art:opt-4", topicId: "maciek:art", text: "Should employees rotate the wall pieces?" },
        { id: "maciek:art:opt-5", topicId: "maciek:art", text: "A local artist wants a commission. Consider?" },
        { id: "maciek:art:opt-6", topicId: "maciek:art", text: "What does the art say that the decks cannot?" },
      ],
      replyCandidates: [
        {
          id: "maciek:art:rep-1",
          text: "I did, with a defense prepared in triplicate: clients judge the office in eight seconds and the walls speak first. The art cost less than one conference booth and lasts longer than any campaign. The booth says we spend. The art says we last. Grazyna approved the sentence before she approved the invoice.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:art:rep-2",
          text: "She did, and it is the finest category ever invented — 'morale infrastructure' survives every audit because morale measurably breaks and the art measurably helps. She has never once cut that line. I suspect she likes the paintings. She will deny it in writing. The paintings stay. Denial is her love language.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:art:rep-3",
          text: "A committee of one — me, with veto rights for Ania and Klaudia on the grounds of taste. The neighbors had to survive the Batman, which rules out anything shy. Current roster: two industrial photographs and one abstract everyone calls 'the printer's dream'. The wall has a canon now. Canons are managed.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:art:rep-4",
          text: "No — walls are infrastructure, not content. The art should be boring the way a good chair is boring: always right, never demanding attention. I rotate exactly once a year, in December, when the office is empty and the paintings can move with dignity. Any other rotation teaches people to ignore the walls.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:art:rep-5",
          text: "Considering, slowly — commissions are where offices get the art they deserve instead of the art they found. My one condition is the artist spends a week HERE first. The two best pieces in the building came from people who watched us work. The wall needs an insider's eye. Outsiders paint the Batman. Insiders paint the Tuesdays.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:art:rep-6",
          text: "Decks persuade; art permits — the wall gives everyone who walks in permission to believe this place is real. A deck is an argument that ends. Art is a decision that stays. I have watched candidates relax in front of the lobby piece before saying a word. The art does the first hour of every interview. Unpaid. Reliable.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "maciek:travel",
      label: "The travel policy",
      optionCandidates: [
        { id: "maciek:travel:opt-1", topicId: "maciek:travel", text: "You fly economy now. Publicity or principle?" },
        { id: "maciek:travel:opt-2", topicId: "maciek:travel", text: "The travel policy fits on one page. Yours?" },
        { id: "maciek:travel:opt-3", topicId: "maciek:travel", text: "Board travel is business class. Defense?" },
        { id: "maciek:travel:opt-4", topicId: "maciek:travel", text: "Klaudia films your trips. Noise or signal?" },
        { id: "maciek:travel:opt-5", topicId: "maciek:travel", text: "What is the best trip this office ever paid for?" },
        { id: "maciek:travel:opt-6", topicId: "maciek:travel", text: "Would you do a fully remote board forever?" },
      ],
      replyCandidates: [
        {
          id: "maciek:travel:rep-1",
          text: "Both, and the publicity is the cheap half — economy says the right thing and saves the company four thousand zloty a quarter, which is the good beans for a year. The principle: comfort above eight hours, honesty below. I am honest for three hours and then I pay for comfort like everyone else. One sentence. Whole policy.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:travel:rep-2",
          text: "Mine, and it is one page because travel rules are where policies go to multiply. The whole document: book early, fly sensible, sleep before the meeting, and expense the coffee. Every other rule I ever wrote got gamed within a quarter. You cannot game a sentence that trusts you. Three years. One audit. Holding.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:travel:rep-3",
          text: "Defense: the board travels to say yes in person, and a yes worth millions deserves sleep. That is not luxury; it is error insurance. My defense to the office is the same defense to myself — I fly economy wherever the decision is small. Class follows consequence. It survives scrutiny. Barely, but it survives.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:travel:rep-4",
          text: "Signal with noise attached. Her travel clips recruit better than the careers page because they show the REAL per diem of this job — trains, terminals, one good window. I curate nothing. One rule: no client is ever in frame without consent. Beyond that, the algorithm may have my boarding passes.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:travel:rep-5",
          text: "The student hackathon, every year — cheaper than any conference and it returns humans instead of contacts. Second place: the 2019 client visit where we fixed everything on-site and the client fed us. The lesson of both: the best trips take the office TO the problem. Conferences are the problem wearing lanyards.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:travel:rep-6",
          text: "Never entirely — the board meeting is a ritual with a body language budget, and some silences do not survive a screen. Remote works for information; the room works for trust. I will hybridize forever and remote the sub-committees. The once-a-quarter room is the price of the other eleven weeks. Cheap. I pay it.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "maciek:slack-etiquette",
      label: "The CEO chat etiquette",
      optionCandidates: [
        { id: "maciek:slack-etiquette:opt-1", topicId: "maciek:slack-etiquette", text: "The CEO is in the channel at 11 pm. Normal?" },
        { id: "maciek:slack-etiquette:opt-2", topicId: "maciek:slack-etiquette", text: "You react with one emoji max. Personal brand?" },
        { id: "maciek:slack-etiquette:opt-3", topicId: "maciek:slack-etiquette", text: "Should the CEO message new hires directly?" },
        { id: "maciek:slack-etiquette:opt-4", topicId: "maciek:slack-etiquette", text: "Your messages never have typos. Suspicious." },
        { id: "maciek:slack-etiquette:opt-5", topicId: "maciek:slack-etiquette", text: "The channel went quiet when you joined. Fix?" },
        { id: "maciek:slack-etiquette:opt-6", topicId: "maciek:slack-etiquette", text: "Do you read every channel? Honestly." },
      ],
      replyCandidates: [
        {
          id: "maciek:slack-etiquette:rep-1",
          text: "Normal and discouraged — I type at eleven and schedule for nine. The send button is a leadership act at every hour, and leadership at eleven pm tells forty phones that eleven pm is expected. The scheduled send is my most-used feature and my most-imitated habit. Copy the habit. Please.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:slack-etiquette:rep-2",
          text: "The single reaction is a whole vocabulary: thumbs means received, rocket means proud, and the rare heart means the whole company should look. Constraint forces meaning. I once reacted with two emoji and the channel ran a conspiracy thread for a day. Never again. Scarcity is communication.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:slack-etiquette:rep-3",
          text: "Yes, one message, on day one, asking one question: 'what surprised you this week?' The answers are the only honest audit this company gets, and they arrive before the new hire learns the official version. It costs ninety seconds and buys the truth at full price. Best ROI in my calendar.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:slack-etiquette:rep-4",
          text: "Drafted, scheduled, and reread — the typos I send are the ones that survive three readings, which makes them voluntary and worse. The suspicion is fair. Leaders' messages are read like scripture, so I write like it is scripture: slowly, one idea, and no sentence that could be screenshotted out of context.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:slack-etiquette:rep-5",
          text: "Then I leave, visibly, and return later — a channel that performs for the CEO is a channel lying to itself. The fix is not etiquette, it is absence. The best conversations in this company happen where I am not. I know this. I engineer it. The read receipts do not count. I have muted myself in spirit.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:slack-etiquette:rep-6",
          text: "No — I read the announcements, my mentions, and two channels I will not name, and the two unnamed ones are where the office is honest. Full readership is a fantasy; the CEO who reads everything hears only what is performative. Curation is the job. I curate the listening like I curate the desk.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "maciek:rivals",
      label: "The rival CEOs",
      optionCandidates: [
        { id: "maciek:rivals:opt-1", topicId: "maciek:rivals", text: "The rival CEO subtweeted the company. Respond?" },
        { id: "maciek:rivals:opt-2", topicId: "maciek:rivals", text: "You and the competitor CEO share a gym. Awkward?" },
        { id: "maciek:rivals:opt-3", topicId: "maciek:rivals", text: "Their product launched before ours. Panic?" },
        { id: "maciek:rivals:opt-4", topicId: "maciek:rivals", text: "Which CEO do you actually study?" },
        { id: "maciek:rivals:opt-5", topicId: "maciek:rivals", text: "The rivals invited you to a founders' dinner. Go?" },
        { id: "maciek:rivals:opt-6", topicId: "maciek:rivals", text: "What would you steal from a competitor legally?" },
      ],
      replyCandidates: [
        {
          id: "maciek:rivals:rep-1",
          text: "Nothing, publicly — a subtweet is an invitation to dance in their venue, and I decline venues I do not own. The response was a product post the same afternoon, unrelated, excellent. The market read both. Silence with good work attached is the loudest reply in the industry. It also annoys him more. Bonus.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:rivals:rep-2",
          text: "Awkward is the wrong word — useful. We spot each other on treadmills and exchange one honest sentence a month. I have learned more from those sentences than from any keynote. Rivalry is a long marriage of attention. He knows my weaknesses; he mentions none of them at the gym. Gym etiquette is truce etiquette.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:rivals:rep-3",
          text: "No — launching first means teaching the market, and teaching is expensive. We launch second, better, into a market their marketing educated for free. The only panic-worthy launch is the one that is better AND later. Ours was neither. The graph confirmed it by Thursday. The graph is my therapist.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:rivals:rep-4",
          text: "The one who stepped down — I study exits, not entrances. His last two years were a masterclass in making himself unnecessary: succession, documentation, and a final year of saying no gracefully. Every CEO studies growth. Growth is easy. Ending well is the skill nobody demos. I have notes. The notes are getting long.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:rivals:rep-5",
          text: "I go, and I eat, and I sign nothing — the founders' dinner is the only room where rivals tell the truth, because everyone present has the same scars. Deals happen there, but that is not the value. The value is discovering which of us is afraid of the same thing. This year's answer: the same regulation. We drank to it.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:rivals:rep-6",
          text: "Their support queue — the actual emails, the actual waits, the actual tone. I would read a hundred tickets before another hundred slides. Products are easy to copy and hard to understand, and the tickets are where the understanding lives. You cannot steal a support queue. You can only build one worth stealing.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "maciek:retreat",
      label: "The thinking retreat",
      optionCandidates: [
        { id: "maciek:retreat:opt-1", topicId: "maciek:retreat", text: "The annual solo retreat. Where and why?" },
        { id: "maciek:retreat:opt-2", topicId: "maciek:retreat", text: "A CEO alone in a cabin. Productive or cliche?" },
        { id: "maciek:retreat:opt-3", topicId: "maciek:retreat", text: "What comes back from the retreat — the artifact?" },
        { id: "maciek:retreat:opt-4", topicId: "maciek:retreat", text: "The office survives your absence. Feelings?" },
        { id: "maciek:retreat:opt-5", topicId: "maciek:retreat", text: "Grazyna categorized the retreat as 'R&D'. Real?" },
        { id: "maciek:retreat:opt-6", topicId: "maciek:retreat", text: "Take someone next time. Idea?" },
      ],
      replyCandidates: [
        {
          id: "maciek:retreat:rep-1",
          text: "A cabin, two lakes over, three days, in October — after the quarter closes and before the planning starts. The timing is the whole design: I bring the closed year and no open tabs. The why is arithmetic, not romance: strategy needs a room with no chairs to hide in. The cabin has one chair. It faces the water. That is the agenda.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:retreat:rep-2",
          text: "Cliche is a cost of the format, and I pay it — the alternative is strategy written in the gaps between meetings, which is how companies get roadmaps shaped like calendars. One man, one notebook, one lake. The cliche works. That is why it became one. I stopped apologizing for methods that predate their mockery.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:retreat:rep-3",
          text: "One page. Every year, one page, handwritten, and it goes to Dawid and Zosia on the Monday. Three years of pages are pinned behind my desk. The page is never a plan — it is a deletion list: what the company will stop believing this year. Companies die of accumulation. The retreat is where I subtract.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:retreat:rep-4",
          text: "It thrives, which I have stopped taking personally — the office running without me is the product. The first year I checked in daily. The second year, once. This year, nothing, and the quarter was fine. Better: it was fine in ways I would not have chosen, which is the entire argument for letting it run.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:retreat:rep-5",
          text: "Real — three days of thinking about the company IS research, and she priced it accordingly: cabin, fuel, one dinner. The receipt is smaller than any software license and produces more direction per zloty than anything else in the ledger. She renews it annually without being asked. That is her highest praise.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books", "relationship:warm"],
        },
        {
          id: "maciek:retreat:rep-6",
          text: "Tempted, and refused — the retreat is the one place my thinking is unsupervised, and bringing an audience changes thinking into performance. Instead: Dawid gets his own retreat, funded, scheduled, non-negotiable. The company needs more unsupervised thinking, not better accompanied thinking. The lake has room.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "maciek:numbers",
      label: "CEOs and numbers",
      optionCandidates: [
        { id: "maciek:numbers:opt-1", topicId: "maciek:numbers", text: "Do you actually read the financials? Honestly." },
        { id: "maciek:numbers:opt-2", topicId: "maciek:numbers", text: "The board packet is 60 pages. What do you read?" },
        { id: "maciek:numbers:opt-3", topicId: "maciek:numbers", text: "You quoted the churn number wrong once. Story?" },
        { id: "maciek:numbers:opt-4", topicId: "maciek:numbers", text: "Which number do you check first, every morning?" },
        { id: "maciek:numbers:opt-5", topicId: "maciek:numbers", text: "Grazyna says you 'feel numbers instead of reading'." },
        { id: "maciek:numbers:opt-6", topicId: "maciek:numbers", text: "What number would you ban from every deck?" },
      ],
      replyCandidates: [
        {
          id: "maciek:numbers:rep-1",
          text: "The dashboards yes, the ledgers no — I read the shape of the business and Grazyna reads the bones. This division is deliberate and I will defend it: a CEO who reads everything reads nothing well, and the one thing I must read well is the trend. Grazyna audits my trend-reading quarterly. It passes. She frightens me appropriately.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:numbers:rep-2",
          text: "Three pages, in order: cash, the one graph I asked for, and the appendix nobody else reads. Cash is oxygen, the graph is direction, and the appendix is where the honest footnotes hide from the deck. Sixty pages is a confidence test. The confident writer hides nothing. The insecure writer hides it all on page forty.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:numbers:rep-3",
          text: "Quoted churn at four percent when the deck said four point two, in front of the board, and Barbara — Barbara — corrected me from the third chair. I adopted her method on the spot: 'the number is X, the direction is Y, and here is what I will do about Z'. Numbers without verbs are decoration. The verb is the apology.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:numbers:rep-4",
          text: "Active users, on one graph, drawn by hand every morning into the same notebook. The hand-drawing is the discipline — copying the number forces the eye to notice the shape, and the shape notices things before the dashboard does. Twice the hand saw the dip before the alert. The notebook has never missed a day.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:numbers:rep-5",
          text: "Fair and precise. I feel the shape and she audits the feeling — that is the whole system, and it works because we distrust each other in the correct amounts. A CEO who reads alone believes his reading. A CEO whose CFO re-reads him believes the truth. I am the feeling. She is the proof. The company benefits.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:numbers:rep-6",
          text: "'Synergy'. Not because the idea is wrong but because the word has closed more bad decisions than any number ever was. Numbers can at least be checked against a ledger. Synergy is a mood wearing a suit. If a deck needs the word, the deck is hiding the math. I say this as its former heaviest user. Repentance is quarterly.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "maciek:origins",
      label: "The founding story",
      optionCandidates: [
        { id: "maciek:origins:opt-1", topicId: "maciek:origins", text: "The garage origin story. Your version, please." },
        { id: "maciek:origins:opt-2", topicId: "maciek:origins", text: "Dawid's founding version differs. Whose is right?" },
        { id: "maciek:origins:opt-3", topicId: "maciek:origins", text: "What actually was built in the garage?" },
        { id: "maciek:origins:opt-4", topicId: "maciek:origins", text: "The first client — do you still send them anything?" },
        { id: "maciek:origins:opt-5", topicId: "maciek:origins", text: "Why does the story change every all-hands?" },
        { id: "maciek:origins:opt-6", topicId: "maciek:origins", text: "The stone on your desk is FROM the garage. Prove it." },
      ],
      replyCandidates: [
        {
          id: "maciek:origins:rep-1",
          text: "Two desks, one radiator with opinions, and a servers-in-winter problem — we heated the room by running the machines, which is why my version features the radiator and Dawid's features the architecture. Both are true. Founding stories are not history. They are the first pitch, repeated until it calcifies. Mine is warmer.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:origins:rep-2",
          text: "His is organized, mine is warm, and the clients who were there agree with BOTH, which is the proof that memory is a team sport. We stopped correcting each other years ago — the story now has two official tellings and the all-hands alternates. The alternating is the most honest thing about it.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:origins:rep-3",
          text: "A scheduling tool for one tutoring center, sold for enough to buy the next month, and rebuilt four times in the first year. The tool is dead; the muscle it built is not. People think founding is the product. Founding is the reps. The garage did not make software. It made the habit of shipping on Fridays. Still in prod.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:origins:rep-4",
          text: "Every December, a card and one free training day — the tutoring center still exists, still teaches, and their director still calls me by the wrong name, which I have decided is the most honest relationship I have. The first client keeps you honest. They knew you when the servers were the heating system.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:origins:rep-5",
          text: "Because the story is the company's mirror — each year it grows the detail the office needs. The radiator year was about grit. The boiler-break year was about improvisation. Last year I added the part where we were wrong about the first hire, which the office needed more than the radiator. The story is a tool.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:origins:rep-6",
          text: "The stone is from the garage forecourt, carried out the day we left, and the proof is the paint on one edge — the same gray as the garage door, which I photographed that week for entirely sentimental reasons. Dawid calls it a rock. Grazyna called it 'unrecorded asset, immaterial'. It is the only asset I will never write off.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "maciek:elevator-pitch",
      label: "The elevator pitch",
      optionCandidates: [
        { id: "maciek:elevator-pitch:opt-1", topicId: "maciek:elevator-pitch", text: "Give me the pitch. We are in an elevator. Go." },
        { id: "maciek:elevator-pitch:opt-2", topicId: "maciek:elevator-pitch", text: "Your pitch has four versions now." },
        { id: "maciek:elevator-pitch:opt-3", topicId: "maciek:elevator-pitch", text: "The pitch mentions AI twice. Deliberate?" },
        { id: "maciek:elevator-pitch:opt-4", topicId: "maciek:elevator-pitch", text: "You pitched in an actual elevator once?" },
        { id: "maciek:elevator-pitch:opt-5", topicId: "maciek:elevator-pitch", text: "Dawid says the pitch is 'a sentence we already live'." },
        { id: "maciek:elevator-pitch:opt-6", topicId: "maciek:elevator-pitch", text: "Teach me to pitch like you." },
      ],
      replyCandidates: [
        {
          id: "maciek:elevator-pitch:rep-1",
          text: "We teach people and software to trust each other, at scale, in this decade. Twelve words, one breath, and the listener either leans in or tells me about their nephew's app. Both outcomes are data. The lean-in is the market. The nephew is the noise. I have ridden eleven floors on that sentence and it has never once stalled between floors.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:elevator-pitch:rep-2",
          text: "Four versions, one per audience: clients get the trust line, recruits get the mission line, the board gets the scale line, and my mother gets 'it is like a school but on computers and it never closes'. Version four performs the best by a distance. Mothers are the most honest focus group and the cheapest to assemble. I recommend one to every founder.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:elevator-pitch:rep-3",
          text: "Deliberate the way oxygen is deliberate — twice is presence, once is hiding, three times is a crypto pitch. AI is the water we swim in now; the pitch has to acknowledge the water without drinking it. The real discipline is what I cut: no 'synergy', no 'leverage', and never 'solutions'. We sell teaching. Teaching is not a solution. It is a relationship with a syllabus.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:elevator-pitch:rep-4",
          text: "Hotel, Warsaw, 2019 — twelve floors, one investor, and I got the whole pitch plus the follow-up question plus a yes in principle before the doors opened. The man claims he invested because of the pitch. I claim it was the seating. Never underestimate a captive audience; every good pitch is just a well-timed room. I have chased that geometry my whole career.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:elevator-pitch:rep-5",
          text: "Dawid's compliment, and it is the highest one available — he is saying the pitch has stopped being a pitch and become a description. That is the entire lifecycle of good company language: lie a little, then build until the lie is load-bearing, then retire the word 'pitch' and call it a sentence. We are in the retirement phase. The sentence just works. It pays salaries now.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:elevator-pitch:rep-6",
          text: "Three rules. One: lead with the verb — what DO we do, in the present tense, no throat clearing. Two: one number, and it must survive their skepticism — I use 'eleven years', because time is the one thing I cannot be talked out of. Three: end on a door, not a period — a sentence that invites the next question. A pitch is not a closing.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:standing-desk",
      label: "The standing desk era",
      optionCandidates: [
        { id: "maciek:standing-desk:opt-1", topicId: "maciek:standing-desk", text: "You switched back to sitting. Defeat?" },
        { id: "maciek:standing-desk:opt-2", topicId: "maciek:standing-desk", text: "The treadmill desk lasted how long, exactly?" },
        { id: "maciek:standing-desk:opt-3", topicId: "maciek:standing-desk", text: "Zosia's one approved chair rotates through the office." },
        { id: "maciek:standing-desk:opt-4", topicId: "maciek:standing-desk", text: "Standing desks for the whole floor. Serious?" },
        { id: "maciek:standing-desk:opt-5", topicId: "maciek:standing-desk", text: "Marek says desks are infrastructure, not fitness." },
        { id: "maciek:standing-desk:opt-6", topicId: "maciek:standing-desk", text: "What did standing teach you, at least?" },
      ],
      replyCandidates: [
        {
          id: "maciek:standing-desk:rep-1",
          text: "Tactical retreat. My back and my ambitions have reached a settlement: sitting for calls, standing for thinking, walking for dread. I call the new arrangement 'ergonomic federalism'. The desk goes up and down eleven times a day and the motors have opinions about me that I choose not to hear. Defeat implies a war. This is a rotation schedule with better branding.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:standing-desk:rep-2",
          text: "Nine days, four of them genuine. I took one call at 1.2 kilometers per hour and agreed to a contract clause I still regret. The body cannot lie while walking — something about the gait loosens the yes. Salesmen know this. That is why they walk you around the car. The treadmill is now a coat rack, which is the highest honor this office bestows on retired ambitions.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:standing-desk:rep-3",
          text: "One chair, whole company, and I respect the efficiency of the absurdity. It is the only piece of office furniture with a waiting list and a reputation. I had it for a week in 2023 and my posture has never recovered socially — people still reference it. The chair is less furniture than monarchy. I bow to whoever sits it this month.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:standing-desk:rep-4",
          text: "Serious, and I have the quote request to prove it — the quote came back and I have shown it to nobody, because the number would need Grazyna to sit down, and she never sits. Here is the pitch I will actually make: standing is not the point, MOVING is, and moving is free. Walk the corridor before every call. That costs nothing and outperforms any desk.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:standing-desk:rep-5",
          text: "He is right and wrong in the same sentence, which is his specialty. Desks are infrastructure, agreed — but the person at the desk is also infrastructure, and infrastructure that aches routes around itself all day. Marek solves aches with better keyboards. Some of us need the desk to move. We are the same man with different maintenance budgets.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:standing-desk:rep-6",
          text: "That thinking has a speed. Sitting, I edit. Standing, I decide. There is research on this and there is also my calendar, and my calendar agrees — every decision I am proud of was made vertical, near a window, before I could sit down and doubt it. The body posture is the decision posture. Stand up to commit. Sit down to refactor.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "maciek:big-call",
      label: "The big call ritual",
      optionCandidates: [
        { id: "maciek:big-call:opt-1", topicId: "maciek:big-call", text: "You have a ritual before big calls?" },
        { id: "maciek:big-call:opt-2", topicId: "maciek:big-call", text: "The ritual involves laps of the office?" },
        { id: "maciek:big-call:opt-3", topicId: "maciek:big-call", text: "You said the call 'needed a window'. Meaning?" },
        { id: "maciek:big-call:opt-4", topicId: "maciek:big-call", text: "Zosia's blazer and your ritual — same school?" },
        { id: "maciek:big-call:opt-5", topicId: "maciek:big-call", text: "Dawid does no ritual. Thoughts?" },
        { id: "maciek:big-call:opt-6", topicId: "maciek:big-call", text: "Teach me the pre-call routine." },
      ],
      replyCandidates: [
        {
          id: "maciek:big-call:rep-1",
          text: "A ritual is a warm-up for the nervous system, and my nervous system has performed better since I stopped pretending I do not have one. Water, two minutes of silence, and I say the client's problem out loud in my own words before they can say it in theirs. Whoever frames the problem first owns the call. The ritual is framing rehearsal. The water is for the voice.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:big-call:rep-2",
          text: "One lap minimum, two if the call is board-adjacent. The lap is where the pitch stops being memorized and becomes reflex. I pass the glass wall, I see the team working, and the nervousness turns into something else — responsibility with better posture. The team does not know they are part of the ritual. The glass wall was the best investment I never consciously made.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:big-call:rep-3",
          text: "Every big call has a weather requirement and mine is daylight. A morning call, the light coming through the glass, and I am a different negotiator — the light does something to confidence that coffee only imitates. Night calls are for empathy; day calls are for numbers.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:big-call:rep-4",
          text: "Same school, different faculty. Her blazer is external armor — it does the work where they can see it. My ritual is internal armor — nobody sees it, which means it cannot be mocked or copied. We compared notes once over coffee and concluded that every confident person in this building is wearing something invisible. Hers has shoulders. Mine has water and a lap.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:big-call:rep-5",
          text: "Dawid walks in with nothing and wins, and I have studied it like a match footage. His ritual is twenty years deep — it has stopped being visible even to him. What I do in ten minutes, he does by having been alive in that particular way for two decades. The rest of us need ceremonies because we have not yet BECOME the ceremony. Give me twenty years.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:big-call:rep-6",
          text: "Ten minutes, in this order: water, problem-said-aloud, one lap, and the sentence you will open with — written, not memorized. Written, because the hand remembers and the hand does not get nervous. Skip the power posing, skip the last-minute slides. The call is won in the ten minutes BEFORE it, when everyone else is still editing slides. While they polish, you arrive.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:jetlag",
      label: "The jetlag",
      optionCandidates: [
        { id: "maciek:jetlag:opt-1", topicId: "maciek:jetlag", text: "Back from the conference. How bad is the jetlag?" },
        { id: "maciek:jetlag:opt-2", topicId: "maciek:jetlag", text: "Your 4am emails are legendary. Cured?" },
        { id: "maciek:jetlag:opt-3", topicId: "maciek:jetlag", text: "Zosia schedules your first day back light." },
        { id: "maciek:jetlag:opt-4", topicId: "maciek:jetlag", text: "Dawid never flies. Ever think about that?" },
        { id: "maciek:jetlag:opt-5", topicId: "maciek:jetlag", text: "The best idea you had came from jetlag, admit it." },
        { id: "maciek:jetlag:opt-6", topicId: "maciek:jetlag", text: "How do you beat jetlag? Real answer." },
      ],
      replyCandidates: [
        {
          id: "maciek:jetlag:rep-1",
          text: "My body is in Warsaw and my cortisol is still in San Francisco arguing with hotel wifi. Three days to full reentry, and I have stopped fighting the schedule — I let the jetlag work the early shift, answer Asia, and limp westward through the week. Jetlag is not an illness. It is your calendar being honest about how many time zones your ambitions cross.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:jetlag:rep-2",
          text: "The 4am emails are not jetlag, they are my best writing window and I refuse to cure it — the world is silent, nobody can schedule anything, and my standards drop just enough for honesty. Renata filters anything I send before seven. The filter has saved two careers, possibly three. The jetlag writes the drafts. The daylight reads them. That is the system and it is undefeated.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:jetlag:rep-3",
          text: "She does, and she calls it 'letting the machine cool down', which is HR language for the exact thing I need. Day one back: no decisions, just presence — I walk the floor, I drink the office coffee, I remember who I hired. Day two: medium calls. Day three: the big room. The light schedule is why my return trips have never burned a relationship.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:jetlag:rep-4",
          text: "Never flies, and he built the same company I fly to build. That is the humbling of my career — every conference I take, he wins the same deal from a desk chair. I asked him once why he does not come along. He said 'they fly to us eventually'. He is right. They always fly here eventually, and they arrive pre-sold, because quiet CEOs read like confidence in every language.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:jetlag:rep-5",
          text: "The whole rebrand came from a 4am in a hotel where the minibar had better UX than our product. Jetlag brain has no defense mechanisms — the criticism arrives unfiltered and stays. I wrote eleven lines of notes on a hotel pad that became the roadmap. The pad is in my drawer. Every founder should take one trip far enough away that the company looks like a stranger.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:jetlag:rep-6",
          text: "No cure, only treaties. Light at the right hours, no big decisions for two days, and — this is the one nobody sells — eat on LOCAL time from the moment you board. The stomach is the second brain and it sets the clock faster than the head. My method is forty percent science, sixty percent surrender, and one hundred percent repeatable.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:borrowed-guru",
      label: "The borrowed gurus",
      optionCandidates: [
        { id: "maciek:borrowed-guru:opt-1", topicId: "maciek:borrowed-guru", text: "You flew in another leadership guru?" },
        { id: "maciek:borrowed-guru:opt-2", topicId: "maciek:borrowed-guru", text: "The guru's workshop got called 'a keynote with homework'." },
        { id: "maciek:borrowed-guru:opt-3", topicId: "maciek:borrowed-guru", text: "Zosia vetoes half your gurus. Criteria?" },
        { id: "maciek:borrowed-guru:opt-4", topicId: "maciek:borrowed-guru", text: "One guru was actually worth it. Which?" },
        { id: "maciek:borrowed-guru:opt-5", topicId: "maciek:borrowed-guru", text: "Marek called the guru circuit 'consulting theater'." },
        { id: "maciek:borrowed-guru:opt-6", topicId: "maciek:borrowed-guru", text: "Would you ever BE the guru?" },
      ],
      replyCandidates: [
        {
          id: "maciek:borrowed-guru:rep-1",
          text: "Flown in, hosted, and audited — I run gurus like software releases: try in a small room first, watch the metrics, ship to the whole org only if the sprint velocity of ideas actually rises. Half of them wash out at the small-room stage, which is where the fee was almost wasted. The guru industry is a funhouse mirror of my own industry. I pay for mirrors.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:borrowed-guru:rep-2",
          text: "It was, and the description stung because it was ACCURATE. Since then my rule is homework or nothing — a guru who cannot leave behind a practice, a template, or a habit was a speaker, and speakers are a different line item. The last one left us the 'one-page Friday' template. We still use it. That single page has amortized the entire workshop.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:borrowed-guru:rep-3",
          text: "Her criteria is brutal and correct: no guru who has not run anything bigger than a podcast. She once asked one, mid-workshop, how many people had ever reported to him. The pause is still discussed. Her veto has saved us more money than any client, and she does it without raising her voice, which is leadership in its purest observed form. I keep a list of her vetoes.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:borrowed-guru:rep-4",
          text: "The elderly engineer, not a leadership person at all — I brought him in to review architecture and he left us one sentence: 'your abstractions are ahead of your needs, which is a compliment and a warning.' We slowed down for a year and the year paid for a decade. The lesson: the best guru is a practitioner past their appetite for politics. They say true things cheap.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:borrowed-guru:rep-5",
          text: "He is right, and I will defend a little theater — the team cannot absorb a truth from ME some weeks, because I am the weather. A borrowed voice says the same thing and it lands. Is that manipulation? It is choreography. Marek runs the machines; I run the moods; the gurus are visiting weather I hire to rain on specific days. He knows this.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:borrowed-guru:rep-6",
          text: "I already am, on small stages, and the honesty is the product. When I speak to founder groups I sell nothing but scars — what the buzzword quarter cost, what the treadmill desk taught, why the glass wall works. No frameworks, no triangle slides. The guru industry has enough triangles. What it lacks is men who admit the homework they gave out was once homework they failed.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:logo-bigger",
      label: "The logo-bigger instinct",
      optionCandidates: [
        { id: "maciek:logo-bigger:opt-1", topicId: "maciek:logo-bigger", text: "You asked for the logo bigger again. Forty-two emails." },
        { id: "maciek:logo-bigger:opt-2", topicId: "maciek:logo-bigger", text: "Why bigger? Explain the instinct." },
        { id: "maciek:logo-bigger:opt-3", topicId: "maciek:logo-bigger", text: "Ania has a rule for it now. 'Confident' size?" },
        { id: "maciek:logo-bigger:opt-4", topicId: "maciek:logo-bigger", text: "Dawid's slides have a tiny logo. Thoughts?" },
        { id: "maciek:logo-bigger:opt-5", topicId: "maciek:logo-bigger", text: "The Batman sign is the biggest logo in the office." },
        { id: "maciek:logo-bigger:opt-6", topicId: "maciek:logo-bigger", text: "Ever seen a logo too big?" },
      ],
      replyCandidates: [
        {
          id: "maciek:logo-bigger:rep-1",
          text: "Forty-two documented requests and every single one was right in context. The email footer logo WAS too small. The conference banner WAS invisible from the back row. Ania keeps the folder like evidence. I keep it like a memoir. A CTO who never asks for the logo bigger has stopped believing the company is going somewhere. The instinct is not typographic. It is directional.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:logo-bigger:rep-2",
          text: "Because a logo is a promise to be recognizable, and being recognizable is half of trust. Every startup dies more from anonymity than from competition. When I say bigger, I am saying 'we intend to be seen' — the size is a strategy expressed in points and pixels. Also, and I admit this freely, big logos make me feel like the future is load-bearing. Both reasons are true.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:logo-bigger:rep-3",
          text: "Her rule is negotiation as art form — she never says no, she says 'bigger than comfortable, smaller than angry', and we meet in the middle every single time, and the middle is ALWAYS correct. I have stopped fighting it. The rule does what I actually want, which is not a big logo, it is a logo someone cared about. The debate IS the care. She knows. The folder knows.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:logo-bigger:rep-4",
          text: "His logo is ten percent of the slide and his CONTRACTS are ninety percent of the room. That is the power move I am still growing into — Dawid does not need the logo bigger because the name arrives before the slide does. My logos are ambition. His logo is a signature. I will get there, probably around the same age he was when he stopped needing the bigger logo.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:logo-bigger:rep-5",
          text: "It is, and it is not ours, which is the joke of my career. We tolerate the biggest brand statement in the building being a fictional billionaire's emblem, and clients LOVE it — one doubled a contract because of it. I have lobbied to add our logo small, in the corner, like a museum placard. Zosia said 'no, the wall is Bruce's'.",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:logo-bigger:rep-6",
          text: "A trade fair in 2018 — a booth with the logo floor to ceiling, and visitors kept asking whose booth it was, because the logo was too big to READ. There is a threshold where confident becomes wallpaper. Bigger works until it does not, and the 'until' is closer than any founder thinks.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:smart-office",
      label: "The smart office gadgets",
      optionCandidates: [
        { id: "maciek:smart-office:opt-1", topicId: "maciek:smart-office", text: "You installed smart bulbs without telling Marek?" },
        { id: "maciek:smart-office:opt-2", topicId: "maciek:smart-office", text: "The office playlist reacts to room occupancy now?" },
        { id: "maciek:smart-office:opt-3", topicId: "maciek:smart-office", text: "Marek calls your gadgets 'the shadow kingdom'." },
        { id: "maciek:smart-office:opt-4", topicId: "maciek:smart-office", text: "One gadget actually works. Which one?" },
        { id: "maciek:smart-office:opt-5", topicId: "maciek:smart-office", text: "Zosia banned cameras. Where do you stand?" },
        { id: "maciek:smart-office:opt-6", topicId: "maciek:smart-office", text: "Janusz unplugged something of yours. Conflict?" },
      ],
      replyCandidates: [
        {
          id: "maciek:smart-office:rep-1",
          text: "I installed them, announced them, and discovered Marek discovered them — sequence matters and mine was wrong. In my defense: the bulbs save energy, set meeting moods, and one of them flashes amber when a deadline is near, which the team has adopted as a shared emotion. The flash of amber is the new 'this is fine'. Marek has inventory rights now.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:smart-office:rep-2",
          text: "It does — occupancy sensors feed a playlist engine that goes from focus-synth when the floor is empty to something warmer when it fills. The team believes the office has 'a mood'. The mood is four sensors and a playlist I tuned during a jetlag. Art is just infrastructure with the serial numbers filed off. Nobody needs to know. The office has a soul and I am its unofficial DJ.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:smart-office:rep-3",
          text: "The shadow kingdom, and the name is accurate, which is why it wounds. My defense: every innovation starts as shadow IT — the Approved version of anything was once a prototype someone smuggled past process. Marek polices the border; I grow things across it. The tension is the R&D budget nobody had to approve. His kingdom has better security. My kingdom has better demos.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:smart-office:rep-4",
          text: "The meeting-room door tablet. Battery lasts a year, syncs the calendar, shows one word — free or busy — and the office reorganized itself around it in a week. No app, no login, one word. That is the entire lesson of the smart office in one device: the gadgets that work are the ones that say LESS. Everything else in my drawer flashes with ambition and says nothing.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:smart-office:rep-5",
          text: "Firmly on her side, and it cost me a gadget to learn why. I piloted a people-counting camera for 'energy optimization' and the spreadsheet was genuinely useful and the TRUST was genuinely gone by Thursday. Data about people is not neutral. Zosia's line — measure rooms, not humans — is now my line too.",
          relationshipHint: "annoyed",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:smart-office:rep-6",
          text: "He unplugged the scent diffuser, and I want to be clear — he was right. It was vaporizing 'focus blend' at the coffee machine, which is two signals fighting over one nose. Janusz said one sentence: 'the coffee has a smell. It is enough.' He is the only man in this building whose opinion about air I accept without appeal. The diffuser went home with me.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "maciek:announcement-voice",
      label: "The announcement voice",
      optionCandidates: [
        { id: "maciek:announcement-voice:opt-1", topicId: "maciek:announcement-voice", text: "Your town hall voice is a different register." },
        { id: "maciek:announcement-voice:opt-2", topicId: "maciek:announcement-voice", text: "You rehearse announcements in the stairwell?" },
        { id: "maciek:announcement-voice:opt-3", topicId: "maciek:announcement-voice", text: "The CTO voice versus the demo voice — same?" },
        { id: "maciek:announcement-voice:opt-4", topicId: "maciek:announcement-voice", text: "Zosia coaches your announcements. Since when?" },
        { id: "maciek:announcement-voice:opt-5", topicId: "maciek:announcement-voice", text: "Dawid's one-slide delivery. Do you study it?" },
        { id: "maciek:announcement-voice:opt-6", topicId: "maciek:announcement-voice", text: "Teach me the announcement voice." },
      ],
      replyCandidates: [
        {
          id: "maciek:announcement-voice:rep-1",
          text: "Register is everything — the demo voice sells certainty, the town hall voice borrows trust. One octave down, forty percent slower, and pauses where a sentence would normally rush. The team can hear the difference with their eyes closed. Voice is infrastructure and most leaders leave it in default settings.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:announcement-voice:rep-2",
          text: "Two run-throughs, stairwell, third floor landing where the acoustics are honest. The stairwell does not flatter — it returns exactly what you sound like, which is more than I can say for most mirrors. Zosia knows about the stairwell. She has never once mentioned it. Some coaching is silent and permanent.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:announcement-voice:rep-3",
          text: "Different animals. The demo voice is a scalpel — short sentences, present tense, no adjectives that cannot be measured. The announcement voice is a bridge — longer arcs, room for people's feelings about change, and one true sentence about what we do not know yet. Using the scalpel on a town hall is how you get applause and no alignment.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:announcement-voice:rep-4",
          text: "Since 2019, when she told me my announcements had 'energy but no floor'. Six words that rebuilt my delivery. She taught me the landing sentence — one line that tells people what happens to THEM by Friday. I had vision, she said; vision without a Friday is weather. Every announcement since has a Friday in it. Her invoice for this coaching was coffee, eleven times.",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "period:afternoon"],
        },
        {
          id: "maciek:announcement-voice:rep-5",
          text: "I study it constantly. One slide, three numbers, and silence where other leaders fill — his pauses are load-bearing and the room leans in to hold them. My instinct is to add slides when nervous; his instinct is to remove words. I have adopted one of his moves: the number said once, slowly, never repeated. Say it again and you are selling. Say it once and you are reporting.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:announcement-voice:rep-6",
          text: "Start with the Friday sentence — what changes for the listener, in their week, by Friday. Then work backward: the news is just the road to the Friday. Breathe before the first sentence; the first breath is the announcement. And slow down ten percent from comfortable, because comfortable is your nerves talking. That is the whole technique. The voice is not the instrument.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:biohacking",
      label: "The biohacking era",
      optionCandidates: [
        { id: "maciek:biohacking:opt-1", topicId: "maciek:biohacking", text: "Are you still tracking your sleep?" },
        { id: "maciek:biohacking:opt-2", topicId: "maciek:biohacking", text: "The standing desk, the gym, now cold plunges?" },
        { id: "maciek:biohacking:opt-3", topicId: "maciek:biohacking", text: "Marek says your ring is 'a Fitbit with ambition'." },
        { id: "maciek:biohacking:opt-4", topicId: "maciek:biohacking", text: "Zosia watches you optimize. Verdict?" },
        { id: "maciek:biohacking:opt-5", topicId: "maciek:biohacking", text: "Dawid sleeps eight hours by doing nothing." },
        { id: "maciek:biohacking:opt-6", topicId: "maciek:biohacking", text: "What did all the tracking actually teach you?" },
      ],
      replyCandidates: [
        {
          id: "maciek:biohacking:rep-1",
          text: "Two years of nightly data and the finding is humiliating: I am a machine that needs eight hours and has been arguing with the manual since university. The ring does not make me sleep. The ring makes me ACCOUNTABLE to the morning. There is a graph in my phone that shows exactly which decisions cost the company a groggy Tuesday. Sleep is a KPI now. I resisted the frame.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:biohacking:rep-2",
          text: "Cold plunges lasted a winter and produced one true insight: discomfort has a afterglow, and the afterglow is the product — not the cold. I do not recommend the plunge. I recommend finding one daily discomfort you CHOOSE, because chosen difficulty is the only known vaccine against grumpiness. The plunge is a coat rack now, joining the treadmill.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:biohacking:rep-3",
          text: "His roast is accurate and he is also the man who measured his OWN heart rate against server fans 'for calibration', so we are the same disease at different frequencies. His data goes to racks; mine goes to a ring; the office is run by two men who trust graphs more than feelings. The difference is he would never call it biohacking. He would call it 'monitoring'.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:biohacking:rep-4",
          text: "Her verdict, delivered over coffee, was: 'you optimize everything, Maciek, please leave the lunch alone'. She is right and wrong. I do not optimize lunch — lunch is where I stopped tracking on purpose. One unmeasured meal a day, like a secular sabbath. She approved of that clause immediately. The system needs one open window or the system becomes the cage.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:lunch"],
        },
        {
          id: "maciek:biohacking:rep-5",
          text: "Eight hours, no ring, no ritual, and better decisions than my entire quantified year. I asked him how. He said 'I go to bed'. Four words and forty years of consistency against my two hundred euro of sensors. That is the gap between us in one exchange: I build systems to get where he simply IS. I have started closing the laptop at ten because of him.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:biohacking:rep-6",
          text: "Three things. One: the basics were the whole game — sleep, walk, water; everything else was confetti. Two: what gets measured gets managed, but ONLY what you measure weekly; daily is a mood ring. Three: the point of tracking is to eventually DELETE the tracker — you are supposed to internalize the dashboard and then live.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:networking-events",
      label: "The networking circuit",
      optionCandidates: [
        { id: "maciek:networking-events:opt-1", topicId: "maciek:networking-events", text: "Another networking event tonight? You collect them." },
        { id: "maciek:networking-events:opt-2", topicId: "maciek:networking-events", text: "How do you work a room, honestly?" },
        { id: "maciek:networking-events:opt-3", topicId: "maciek:networking-events", text: "The name tag goes on your right shoulder. Why?" },
        { id: "maciek:networking-events:opt-4", topicId: "maciek:networking-events", text: "You left an event after twenty minutes once." },
        { id: "maciek:networking-events:opt-5", topicId: "maciek:networking-events", text: "Przemek networks harder than you. Concede?" },
        { id: "maciek:networking-events:opt-6", topicId: "maciek:networking-events", text: "Best contact you ever made at an event?" },
      ],
      replyCandidates: [
        {
          id: "maciek:networking-events:rep-1",
          text: "I collect them the way Marek collects cables — for the one that works. Nine events out of ten produce coffee and vocabulary. The tenth produces a hire, a client, or the sentence that reorganizes your roadmap. You cannot attend only the tenth. The tenth does not announce itself.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:networking-events:rep-2",
          text: "I do not work rooms; I run three good conversations and leave before the energy dips. The amateur mistake is coverage — trying to meet everyone, which means meeting no one twice. I pick two strangers and one competitor. Strangers are the future; competitors are the weather report.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:networking-events:rep-3",
          text: "Right shoulder, because a handshake naturally presents the right side of your chest — the name tag ends up readable at the exact moment of first contact. It is a small thing and small things compound; I have watched hundreds of people fumble the left-side tag and it costs each introduction a half-second of awkwardness. Half-seconds are where deals die. Wear it right.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:networking-events:rep-4",
          text: "I did — the room was full of people narrating their positions instead of describing their problems. Twenty minutes, one insight: nobody in that room wanted a conversation, they wanted an audience. I left, walked home, and wrote three emails to people who were NOT in the room. Two of them became clients. The lesson is not 'skip events'.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:networking-events:rep-5",
          text: "Conceded without a hearing — he networks like weather systems move, relentlessly and at scale. But here is the difference and I will die on this hill: Przemek collects CONTACTS. I collect CONTEXT. He knows three hundred people; I know eleven people's actual roadmaps. When one of my eleven moves companies, I inherit their whole org as warm trust.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:networking-events:rep-6",
          text: "A half-finished conversation with a woman about a failed course platform — we talked for nine minutes about what did NOT work. No pitch, no card. She emailed a month later: her company needed exactly our training for exactly the failure she described. Contract worth a year. The client chose us because we were the only ones who discussed the graveyard.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "maciek:plaque-shelf",
      label: "The plaque shelf",
      optionCandidates: [
        { id: "maciek:plaque-shelf:opt-1", topicId: "maciek:plaque-shelf", text: "Your plaque shelf has fifteen awards. Real ones?" },
        { id: "maciek:plaque-shelf:opt-2", topicId: "maciek:plaque-shelf", text: "One plaque is turned face-down. Why?" },
        { id: "maciek:plaque-shelf:opt-3", topicId: "maciek:plaque-shelf", text: "Klaudia wants to shoot the shelf for content." },
        { id: "maciek:plaque-shelf:opt-4", topicId: "maciek:plaque-shelf", text: "Grazyna values the plaques at zero." },
        { id: "maciek:plaque-shelf:opt-5", topicId: "maciek:plaque-shelf", text: "Dawid keeps his awards in a drawer, apparently." },
        { id: "maciek:plaque-shelf:opt-6", topicId: "maciek:plaque-shelf", text: "Which plaque would you grab in a fire?" },
      ],
      replyCandidates: [
        {
          id: "maciek:plaque-shelf:rep-1",
          text: "Fourteen — one is a plant — and every one is real, which is the joke, because half are for things like 'employer of the quarter, region of Mazovia, mid-size category, spring'. The plaques are less awards than receipts for effort. Nobody's shelf survives honesty. Mine survives because it is funny.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:plaque-shelf:rep-2",
          text: "The 2022 'Innovation Leader' plaque, face-down since the month we shipped a broken onboarding flow with the award still on the wall. It stays down until I feel the company has EARNED the word again — my own private audit. It has been down eleven months. The team does not know why and they do not need to. Some accountability is a private ceremony between a man and his shelf.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:plaque-shelf:rep-3",
          text: "She shot it, I approved it, and the video did numbers — but the frame that performed best was the face-down plaque. The comments wrote a whole lore about it. 'What did the CTO do?' The mystery outperformed the brass. She asked if I would flip it for a reveal. Never. The reveal would end a story that is currently doing my accountability FOR me. The shelf is content now.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:plaque-shelf:rep-4",
          text: "She values them at zero and she is technically correct, which is her entire love language. The plaques are worth nothing and cost something, which makes them pure culture — the one asset class that burns cash and pays morale. I once asked her to insure the shelf. She asked what it would cost to REPLACE. I said nothing could replace it.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:plaque-shelf:rep-5",
          text: "A drawer, and I have seen it — opened it once looking for a stapler and found a decade of awards lying flat like a deck of cards. He said 'they are not for showing'. I display mine and he files his and we are running the same company from two philosophies of recognition. My shelf recruits; his drawer calibrates him. Neither system is wrong.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:plaque-shelf:rep-6",
          text: "None of the plaques — the small bent photo of the first office, before the glass wall, when the whole company fit in one room and the ceiling leaked on the server. The plaques say we won. The photo says we STARTED, which is the rarer document. Everything else on that shelf is replaceable by next quarter's ceremony. The photo has no ceremony. It just has the leak.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "maciek:future-of-work",
      label: "The future-of-work monologue",
      optionCandidates: [
        { id: "maciek:future-of-work:opt-1", topicId: "maciek:future-of-work", text: "Give me the future-of-work take. The full one." },
        { id: "maciek:future-of-work:opt-2", topicId: "maciek:future-of-work", text: "Remote-first or office-first? Pick a side." },
        { id: "maciek:future-of-work:opt-3", topicId: "maciek:future-of-work", text: "AI takes the jobs — your honest read?" },
        { id: "maciek:future-of-work:opt-4", topicId: "maciek:future-of-work", text: "Four-day week. Would we survive it?" },
        { id: "maciek:future-of-work:opt-5", topicId: "maciek:future-of-work", text: "Zosia says the future is 'just Tuesday, managed well'." },
        { id: "maciek:future-of-work:opt-6", topicId: "maciek:future-of-work", text: "What skill should my future self learn?" },
      ],
      replyCandidates: [
        {
          id: "maciek:future-of-work:rep-1",
          text: "Full version, thirty seconds: the office is becoming a protocol, not a place — people will sync like devices, briefly and on purpose, and spend the rest of the time in deep focus wherever the wifi is honest. Companies will stop renting desks and start renting OCCASIONS. The ones that survive will be the ones worth traveling to.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:future-of-work:rep-2",
          text: "Neither — I am rhythm-first. Remote-first optimizes focus and loses the corridor; office-first optimizes the corridor and loses the focus. The corridor is where juniors absorb the profession and the focus is where seniors earn it, and any single-first policy amputates one half.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:future-of-work:rep-3",
          text: "AI does not take jobs; it takes TASKS, and every job is a bundle of tasks wrapped around a human being trusted by other human beings. The bundle gets thinner every year. The trust does not. We are in the trust business — people pay us because a human stood in a room and made material land. The material gets written by machines. The standing is ours. Teach the standing.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:future-of-work:rep-4",
          text: "We would survive it; the question is whether the CLIENTS would, and the honest answer is they would — after one quarter of renegotiated expectations and one tense week. Grazyna has modeled it. Her model says break-even, her face says doubt, and her face is the better forecaster. My position: trial it in August, when the country is at the sea anyway, and let the data argue.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:future-of-work:rep-5",
          text: "Zosia's line is the best correction of my career. I once gave the team a future-of-work keynote with horizons and paradigms, and afterward she said: 'Maciek, the future of work is just Tuesday, managed well.' It took me a year to admit she is right. Every revolution I have preached arrived as a better Tuesday — the focus block, the no-meeting morning, the Friday demo.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:future-of-work:rep-6",
          text: "Not a tool — tools expire in three years. Learn the thing that survives every tool cycle: explain complicated things to calm people and scared people, out loud, in rooms. Every profession of the last five decades was won by the person who could make the room understand. Machines will supply the complexity. Humans supply the rooms. Practice on Burek. Graduate to Pawel.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:failure-story",
      label: "The favorite failure",
      optionCandidates: [
        { id: "maciek:failure-story:opt-1", topicId: "maciek:failure-story", text: "Tell the failure story. The real one." },
        { id: "maciek:failure-story:opt-2", topicId: "maciek:failure-story", text: "The failed hardware course of 2016. Legend status?" },
        { id: "maciek:failure-story:opt-3", topicId: "maciek:failure-story", text: "You tell the failure in every pitch. Why?" },
        { id: "maciek:failure-story:opt-4", topicId: "maciek:failure-story", text: "Zosia was there for the failure. Her reaction?" },
        { id: "maciek:failure-story:opt-5", topicId: "maciek:failure-story", text: "Dawid's failures are quieter. Better?" },
        { id: "maciek:failure-story:opt-6", topicId: "maciek:failure-story", text: "What did the failure actually teach?" },
      ],
      replyCandidates: [
        {
          id: "maciek:failure-story:rep-1",
          text: "The real one: 2015, I raised money for a hardware course, ordered the hardware, and the shipment was three hundred identical devices that could not run the software. The vendor knew. The manifest said 'compatible' the way a menu says 'homemade'. We pivoted the whole cohort to software in one weekend and the pivot became this company's spine.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:failure-story:rep-2",
          text: "Legend status, and the details improve every retelling — last quarter the shipment was 'seventeen pallets' and I personally 'drove the forklift'. There was no forklift. There was me and Pawel's predecessor and one borrowed van. But the EMOTIONAL truth compounds correctly: we promised hardware, the hardware lied, and we taught anyway.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:failure-story:rep-3",
          text: "Because a pitch without a failure is an invoice, and nobody invests in an invoice — they invest in a survivor. The failure does three jobs in nine seconds: it proves I have been wrong at scale, it proves the scar taught me something, and it lowers my status JUST enough for the room to want me to win. The third job is the underrated one. Founder status is a dial, not a flag.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:failure-story:rep-4",
          text: "She was week three of her employment, watching me announce the pivot to a room of angry students, and her reaction became company law: she stood up and reframed it in one sentence — 'you are the first cohort to get two courses for the price of one'. The room turned.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:failure-story:rep-5",
          text: "Quieter, deeper, and I have only heard fragments — a partner from 2012, a product that never shipped, a silence where a company used to be. He does not tell it as a story. He carries it as a setting. My failure is a keynote; his is a compass, and honestly the compass is the more advanced technology. I am thirty percent keynote and rising compass. Twenty years to his level.",
          relationshipHint: "neutral",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:failure-story:rep-6",
          text: "Nothing motivational, I promise you that. The real lesson was supply chains — I now read a vendor's honesty faster than their catalog, because the manifest that said 'compatible' taught me that language can be load-bearing in the wrong direction. Every supplier meeting since, I ask for the failure rate unprompted. The ones who answer instantly are trustworthy.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:thought-leadership",
      label: "The thought leadership",
      optionCandidates: [
        { id: "maciek:thought-leadership:opt-1", topicId: "maciek:thought-leadership", text: "Your posts do numbers now. Strategy or accident?" },
        { id: "maciek:thought-leadership:opt-2", topicId: "maciek:thought-leadership", text: "Klaudia edits your posts. The process?" },
        { id: "maciek:thought-leadership:opt-3", topicId: "maciek:thought-leadership", text: "One post got called 'brave'. Fair?" },
        { id: "maciek:thought-leadership:opt-4", topicId: "maciek:thought-leadership", text: "Zosia posts too. Rivalry?" },
        { id: "maciek:thought-leadership:opt-5", topicId: "maciek:thought-leadership", text: "Dawid has never posted. Ever?" },
        { id: "maciek:thought-leadership:opt-6", topicId: "maciek:thought-leadership", text: "What is the one post you deleted?" },
      ],
      replyCandidates: [
        {
          id: "maciek:thought-leadership:rep-1",
          text: "Accident that became a strategy, like everything good in this company. I posted a rant about meeting culture at midnight and woke up famous in my industry. The lesson was not 'post at midnight' — it was 'midnight honesty outperforms daytime diplomacy'. Now I draft at midnight, and Klaudia decides at noon whether the honesty survives contact with my career.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:thought-leadership:rep-2",
          text: "I write long, she cuts to one idea and one image, and I sulk for exactly ten minutes, professionally. Her rule: 'a post is a headline with proof, not a memo with a headline'. She has never been wrong about a post. I have been wrong fourteen times, all documented in a folder she maintains titled 'the education of Maciek'. The folder is generous.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:thought-leadership:rep-3",
          text: "The one about us shipping a broken onboarding flow while holding an innovation plaque — brave, I suppose, in the way admitting a leak is brave while standing in the leak. The post did not feel brave. It felt like vacuuming: the room looked the same but breathed better. Thirty people from other companies messaged me their version of the leak.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:thought-leadership:rep-4",
          text: "No rivalry — we run a dual monarchy. Her posts are culture, mine are industry, and the algorithm treats us like two channels of one network, which is what we are. We DO compete for Tuesday mornings, silently, like two radio stations that discovered they share a frequency. She wins Tuesdays more often than I do. Her engagement is warmer. Mine is louder.",
          relationshipHint: "annoyed",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:thought-leadership:rep-5",
          text: "Never posted, never will, and his absence performs better than my presence — clients quote his silence the way they quote my posts. 'Dawid does not post' has become shorthand for confidence in our market. I asked him once if that was strategy. He said 'what is there to say'. Nine hundred of my posts, summarized by four words from a man with no account. I keep posting though.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:thought-leadership:rep-6",
          text: "A hot take on a competitor's collapse, drafted at 1am, deleted at 7am by my own hand with Klaudia's blessing pending. It would have done numbers. It would also have been the moment this account became a weapon instead of a window. The draft is saved as a reminder: the delete button is the most underused feature in thought leadership. Everyone optimizes for posting.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "maciek:desk-toys",
      label: "The executive desk toys",
      optionCandidates: [
        { id: "maciek:desk-toys:opt-1", topicId: "maciek:desk-toys", text: "Your Newton's cradle has been replaced twice?" },
        { id: "maciek:desk-toys:opt-2", topicId: "maciek:desk-toys", text: "Does the stress ball actually help?" },
        { id: "maciek:desk-toys:opt-3", topicId: "maciek:desk-toys", text: "Tomek said the toys are 'idle processes'." },
        { id: "maciek:desk-toys:opt-4", topicId: "maciek:desk-toys", text: "The magnetic desk sculpture eats paperclips?" },
        { id: "maciek:desk-toys:opt-5", topicId: "maciek:desk-toys", text: "Clients play with the toys during meetings?" },
        { id: "maciek:desk-toys:opt-6", topicId: "maciek:desk-toys", text: "What does the desk toy say about a CEO, honestly?" },
      ],
      replyCandidates: [
        {
          id: "maciek:desk-toys:rep-1",
          text: "Twice, because momentum matters and balls stop, which I find philosophically unacceptable. The first one died of dust. The second died of a pitch meeting where I demonstrated disruption a bit too literally. The third one is weighted, serviced, and ready. Like the roadmap, it keeps moving.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:desk-toys:rep-2",
          text: "The stress ball is not for stress, it is for hands. Meetings run smoother when the CEO's hands have a job and the mouth gets fewer side quests. Klaudia filmed me squeezing it through a budget call and the internet called it ASMR leadership. I have leaned in. We all lean in eventually.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:desk-toys:rep-3",
          text: "He walked past, said my desk was 'running background processes with no parent', and left. It is the most accurate performance review the toys have ever received. I told him idle processes keep systems warm. He almost smiled. Between us, that is a quarterly achievement.",
          relationshipHint: "delighted",
          tags: ["quest:ceo-met"],
        },
        {
          id: "maciek:desk-toys:rep-4",
          text: "It has consumed forty-one paperclips, one staple, and Grazyna's patience. She comes in for signatures, sees her clips holding up a tiny moon, and reclaims them like a librarian. The sculpture is the only object in this office with a predator-prey relationship. I feed it. She hunts it. Balance.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "maciek:desk-toys:rep-5",
          text: "Always the cradle, never the magnet. And here is the thing: the clients who fidget decide FASTER. The toys lower the room's temperature by two degrees and deals are closed at room temperature. I chose these toys like I chose the chairs. Nothing on this desk is an accident, including the mess.",
          relationshipHint: "pleased",
          tags: ["quest:got-acme-contract"],
        },
        {
          id: "maciek:desk-toys:rep-6",
          text: "That the CEO plans to stay. Toys are a promise to sit still, right here, through whatever comes. A bare desk says 'the boxes are labeled'. My desk says 'we are just getting started, and the balls will keep swinging'. Read any founder's desk like that and it never lies.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:karaoke",
      label: "The retreat karaoke incident",
      optionCandidates: [
        { id: "maciek:karaoke:opt-1", topicId: "maciek:karaoke", text: "The retreat karaoke video still exists?" },
        { id: "maciek:karaoke:opt-2", topicId: "maciek:karaoke", text: "You opened with a rock ballad, in public?" },
        { id: "maciek:karaoke:opt-3", topicId: "maciek:karaoke", text: "Did you plan the karaoke team building?" },
        { id: "maciek:karaoke:opt-4", topicId: "maciek:karaoke", text: "Tomek held the microphone for one second?" },
        { id: "maciek:karaoke:opt-5", topicId: "maciek:karaoke", text: "Klaudia's performance went on her channel?" },
        { id: "maciek:karaoke:opt-6", topicId: "maciek:karaoke", text: "Would you do karaoke with a client?" },
      ],
      replyCandidates: [
        {
          id: "maciek:karaoke:rep-1",
          text: "It exists, it is backed up in two clouds, and Grazyna has the only copy with my written permission to never delete. A CEO who cannot laugh at himself rents his own dignity by the hour. Mine is owned outright. The video is collateral. The team knows the terms. Morale is a long contract.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:karaoke:rep-2",
          text: "I opened with a ballad because a leader goes first into every awkward room. Was it good? No. Was it wholehearted? The neighbors called the hotel desk, so yes. Leadership is being the first fool so the team can be fools in safety. The second singer was the accountant. That is when I knew it worked.",
          relationshipHint: "delighted",
          tags: ["period:evening"],
        },
        {
          id: "maciek:karaoke:rep-3",
          text: "Planned? I scouted the venue on the retreat site, confirmed the machine had our decade of music, and packed the backup microphone. Spontaneity is a budget line, my friend. The RETRO says the night was 'unplanned magic'. The receipts say strategic culture investment. Both documents are true.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:karaoke:rep-4",
          text: "One second, one word, and the room went silent like a solar eclipse. He said 'no' with the mic an inch from his mouth and put it down like returning a borrowed tool. That single second is now our most referenced internal moment. 'Tomek-ing it' means declining with total peace. He coined a verb by refusing.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "maciek:karaoke:rep-5",
          text: "She performed like it was a stadium, posted it with the caption 'the office can SING', and it reached people we have never met. Two job applicants mentioned it in interviews. Culture that markets itself is the only marketing I fully trust. She understood that before my decks did.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:karaoke:rep-6",
          text: "I would, and the offer stands in every contract negotiation. You have not truly seen a partner until you have heard them miss a high note. Due diligence reports miss character. Karaoke does not. Acme sang. That is partly why we signed. The spreadsheets agreed afterwards. Spreadsheets always arrive late.",
          relationshipHint: "pleased",
          tags: ["quest:got-acme-contract"],
        },
      ],
    },
    {
      id: "maciek:first-tshirt",
      label: "The framed first t-shirt",
      optionCandidates: [
        { id: "maciek:first-tshirt:opt-1", topicId: "maciek:first-tshirt", text: "The framed t-shirt in your office is from when?" },
        { id: "maciek:first-tshirt:opt-2", topicId: "maciek:first-tshirt", text: "The shirt has a typo on the back?" },
        { id: "maciek:first-tshirt:opt-3", topicId: "maciek:first-tshirt", text: "Dawid's shirt is in the frame too?" },
        { id: "maciek:first-tshirt:opt-4", topicId: "maciek:first-tshirt", text: "Would you ever sell the framed shirt?" },
        { id: "maciek:first-tshirt:opt-5", topicId: "maciek:first-tshirt", text: "Klaudia photographed it for the anniversary post?" },
        { id: "maciek:first-tshirt:opt-6", topicId: "maciek:first-tshirt", text: "Why frame a shirt and not the first contract?" },
      ],
      replyCandidates: [
        {
          id: "maciek:first-tshirt:rep-1",
          text: "The first company shirts, ordered when we were five people and one dream with a domain name. The printer got the color wrong and delivered forty instead of ten, and we could not afford to be angry. I wore mine until the collar surrendered. The frame is the collar's pension.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:first-tshirt:rep-2",
          text: "Our own tagline, misspelled, on the FIRST shirts we ever ordered. We were too broke to reprint and too proud to hide. Clients pointed it out with love and we owned it for two years. The typo taught me more than any course: perfection is expensive, charm is cheap, and nobody buys from robots.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:first-tshirt:rep-3",
          text: "His is folded behind mine in the same frame, because he was there before the logo and he does not perform about it. He signed the frame's back in pencil: 'it compiled'. Two words from the first engineer. If the office ever burns, the frame leaves with the server and the dog. In that order. Argued.",
          relationshipHint: "delighted",
          tags: ["quest:dawid-graph-memo"],
        },
        {
          id: "maciek:first-tshirt:rep-4",
          text: "Never. A museum once asked, jokingly, and I said the frame is not for sale, it is for context. Money is how much. Context is why. The shirt is the 'why' with sleeves. The day I sell it is the day I have confused the balance sheet with the story, and that day is not on any roadmap I own.",
          relationshipHint: "annoyed",
        },
        {
          id: "maciek:first-tshirt:rep-5",
          text: "She shot it in one take, said 'the typo stays in focus', and the post is our best-performing culture content ever. People repost it calling it 'founder honesty core'. We simply call it the wall. She framed our wall better than the frame does. That is why she has the keys to the feed.",
          relationshipHint: "pleased",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "maciek:first-tshirt:rep-6",
          text: "Because the contract was written by lawyers and the shirt was written by us. Contracts say what we agreed. The shirt says who we were when agreeing was a risk. Frame the artifacts people made when nobody was watching. That is where companies keep their souls. Lawyers keep the copies. I keep the cotton.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:fancy-water",
      label: "The fancy water order",
      optionCandidates: [
        { id: "maciek:fancy-water:opt-1", topicId: "maciek:fancy-water", text: "You ordered boutique water for the office?" },
        { id: "maciek:fancy-water:opt-2", topicId: "maciek:fancy-water", text: "Grazyna saw the water invoice?" },
        { id: "maciek:fancy-water:opt-3", topicId: "maciek:fancy-water", text: "Does expensive water taste different?" },
        { id: "maciek:fancy-water:opt-4", topicId: "maciek:fancy-water", text: "Tomek brings tap water in a jar?" },
        { id: "maciek:fancy-water:opt-5", topicId: "maciek:fancy-water", text: "The glass bottles became a client talking point?" },
        { id: "maciek:fancy-water:opt-6", topicId: "maciek:fancy-water", text: "Was the fancy water a phase or a policy?" },
      ],
      replyCandidates: [
        {
          id: "maciek:fancy-water:rep-1",
          text: "I did, for the meeting room only, from a spring with a story. Hydration is hospitality and hospitality is the first slide of every deal. The spring's story is printed on the bottle. Clients read it in the first five minutes, and it breaks the ice better than any agenda item I have ever written.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:fancy-water:rep-2",
          text: "She saw it, titled the line 'liquid branding', and moved it from facilities to marketing without blinking. That woman can reclassify anything. The water survived the audit because it closed deals, which is the only language an invoice ever needs to speak. She respects results. So does the spring.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "maciek:fancy-water:rep-3",
          text: "Barely, and that is not the point, which I have learned to say out loud before someone else says it louder. The point is the pause. A bottle with a story makes people slow down for three seconds, and three seconds of slowness is where listening begins. I am not selling water. I am selling tempo.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:fancy-water:rep-4",
          text: "He does, from home, in a jar that has survived four years and one desk move. He looked at my bottles, looked at his jar, and said nothing, which from him is a full paragraph. The office runs on both: my story bottles and his jar. Between us we cover hydration and humility. Both are needed.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:fancy-water:rep-5",
          text: "It did. Two clients asked where the water is from, one ordered it for their own office, and it appeared in a client's LinkedIn photo with our logo in the background. The bottles are working harder than half my ads. I have considered a second spring. Grazyna has considered a second opinion. Stalemate.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:fancy-water:rep-6",
          text: "A policy with a budget cap, which is the only way I know to have phases responsibly. Meeting room yes, kitchen no, desks get the good ordinary stuff. Every luxury in a startup must be either load-bearing or seasonal. The water is load-bearing in the room where money changes hands. Verified quarterly.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:padel",
      label: "The padel conversion",
      optionCandidates: [
        { id: "maciek:padel:opt-1", topicId: "maciek:padel", text: "You switched from golf to padel?" },
        { id: "maciek:padel:opt-2", topicId: "maciek:padel", text: "Is padel the new golf for business?" },
        { id: "maciek:padel:opt-3", topicId: "maciek:padel", text: "Przemek still plays golf and judges you?" },
        { id: "maciek:padel:opt-4", topicId: "maciek:padel", text: "You invite clients to padel before contracts?" },
        { id: "maciek:padel:opt-5", topicId: "maciek:padel", text: "The padel court booking is a company expense?" },
        { id: "maciek:padel:opt-6", topicId: "maciek:padel", text: "What did golf teach you that padel cannot?" },
      ],
      replyCandidates: [
        {
          id: "maciek:padel:rep-1",
          text: "Golf is four hours of silence interrupted by business. Padel is one hour of noise interrupted by business, and modern deals move at noise speed. I sold the clubs to a founder who needed them more, metaphorically, and the transition cost me two toes' worth of pride and one wall lesson.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:padel:rep-2",
          text: "It is, and here is the tell: you can LOSE at padel together. Golf is parallel loneliness. Padel is a small room where two people chase one ball and their chemistry shows in eleven minutes. Any game that reveals partnership skills that fast belongs in business. I have seen marriages tested less.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:padel:rep-3",
          text: "He does, in his tie, with the confidence of a man whose sport predates the internet. We made a deal: he plays his golf, I play my padel, and the annual grudge match is ping pong in the office kitchen. Neutral ground, short game, maximum commentary. Grazyna referees. She keeps the real score.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:padel:rep-4",
          text: "Only after the first meeting, never before. Contracts signed on a court feel like ambushes, and ambushes have a refund policy. The court is the second date. By then we have seen each other's slides, and the game just confirms what the slides suspected. That is the whole choreography of trust.",
          relationshipHint: "pleased",
          tags: ["quest:got-acme-contract"],
        },
        {
          id: "maciek:padel:rep-5",
          text: "The Friday court is, filed as 'client relations, athletic', and Grazyna reclassified it twice before accepting it. Her spreadsheet has a category called 'Maciek explains' and the court lives there now. It pays for itself in one saved negotiation a year. The math survived the audit. Barely. Honestly.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "maciek:padel:rep-6",
          text: "Patience. Golf taught me to wait for my own swing while someone rich makes small talk at my elbow. That is a REAL skill and it built this company's manners. Padel teaches speed and forgiveness. A founder needs both: the long silent walk and the small loud room. I recommend the full curriculum.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:misquotes",
      label: "The garbled quotes",
      optionCandidates: [
        { id: "maciek:misquotes:opt-1", topicId: "maciek:misquotes", text: "You quoted a famous founder slightly wrong again?" },
        { id: "maciek:misquotes:opt-2", topicId: "maciek:misquotes", text: "Tomek keeps a list of your misquotes?" },
        { id: "maciek:misquotes:opt-3", topicId: "maciek:misquotes", text: "Klaudia turned a misquote into a graphic?" },
        { id: "maciek:misquotes:opt-4", topicId: "maciek:misquotes", text: "The team quoted YOUR words back at you?" },
        { id: "maciek:misquotes:opt-5", topicId: "maciek:misquotes", text: "Do you ever check the quotes before keynotes?" },
        { id: "maciek:misquotes:opt-6", topicId: "maciek:misquotes", text: "Why not just drop the quotes entirely?" },
      ],
      replyCandidates: [
        {
          id: "maciek:misquotes:rep-1",
          text: "I compress quotes for impact, and compression has casualties. The point of a borrowed line is the point, not the punctuation. That said, Ania now fact-checks me with a face that says 'we have discussed this'. Every CEO needs one person with sources and no fear. She is that person with a content calendar.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:misquotes:rep-2",
          text: "He does, in a file, with dates, like a changelog of my confidence. He shared it once, silently, during a board prep. Eleven entries. I read it twice and laughed until it hurt, because he is right and the file is generous. It ends each entry with 'the point survived'. The man respects the point.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr", "relationship:neutral"],
        },
        {
          id: "maciek:misquotes:rep-3",
          text: "She took my mangled quote, set it in the brand font, and it outperformed the correct version by four times. The caption said 'as misquoted by our CEO, improved in transit'. Now it is on a wall. My errors have better reach than most facts. The internet is a strange ledger and it balances in unexpected ways.",
          relationshipHint: "delighted",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "maciek:misquotes:rep-4",
          text: "They did, in the retro, MY OWN garbled line, used against a bad process. 'We are strategically pivoting the printer' shut down a two-hour debate in one sentence. My misquote became a tool. That is legacy, whatever the origin. I sat there like a proud father at a crime scene.",
          relationshipHint: "delighted",
        },
        {
          id: "maciek:misquotes:rep-5",
          text: "Ania checks now, and the checking survived exactly one keynote because it killed my timing. A quote lands in the pause, not the footnote. So we compromise: she verifies for the published decks, the live stage keeps my arithmetic. Live me is a rumor. Published us is a contract. Both coexist.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:misquotes:rep-6",
          text: "Because quotes are how a solo voice borrows a choir. A founder with no quotes is a founder who thinks history started at funding. I misattribute because I am busy, not because I am careless, and the correction is always welcome. My ego files corrections quickly. It has quarterly practice.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:electric-car",
      label: "The electric car",
      optionCandidates: [
        { id: "maciek:electric-car:opt-1", topicId: "maciek:electric-car", text: "Your car charges in the company parking spot?" },
        { id: "maciek:electric-car:opt-2", topicId: "maciek:electric-car", text: "The charger caused a parking politics incident?" },
        { id: "maciek:electric-car:opt-3", topicId: "maciek:electric-car", text: "Grazyna handles the car's tax benefits?" },
        { id: "maciek:electric-car:opt-4", topicId: "maciek:electric-car", text: "Janusz embraces the quiet car?" },
        { id: "maciek:electric-car:opt-5", topicId: "maciek:electric-car", text: "Klaudia filmed the car for a green post?" },
        { id: "maciek:electric-car:opt-6", topicId: "maciek:electric-car", text: "Would you go back to petrol, honestly?" },
      ],
      replyCandidates: [
        {
          id: "maciek:electric-car:rep-1",
          text: "It does, next to the building, on a charger Marek installed with suspicious ease. He tapped the wall, muttered something about amperage, and it worked. The car and I are a public commitment device: every morning the whole office watches whether my convictions survive the commute. They do. Quietly.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:electric-car:rep-2",
          text: "It did. The space is technically 'the CEO's' and practically 'next to the sun', and Janusz has opinions about the shade. We resolved it like adults: the car moves on hot days, the shade belongs to the building, and the resolution is laminated somewhere by Grazyna. Every parking lot is a small parliament.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:electric-car:rep-3",
          text: "She does, and she found benefits in the tax code I did not know existed, presented like weather news. The car pays for its electricity in depreciation poetry. I bought it for the future and she made it sensible for the quarter. That is the partnership this company actually runs on.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "maciek:electric-car:rep-4",
          text: "He does, completely. He says it is the first car that does not wake the building at 6am, and he has started leaving the gate open for it like a regular. Janusz trusting a machine is a slow ceremony. The car passed by being quiet. Most of us could learn from that career strategy.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:electric-car:rep-5",
          text: "She did, dawn light, charging cable, caption about quiet starts. It did numbers. Three people asked if we sell the cars. We do not. But the post recruited two engineers who care where their power comes from, so the car is now also an HR instrument. Assets in this office wear many chargers.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:electric-car:rep-6",
          text: "Every winter morning at 5am, briefly, and then I remember the noise is gone, the oil is gone, and the torque launches like a promise kept. Petrol had romance. Electric has mornings I do not apologize for. Nostalgia is a great passenger and a terrible driver. I keep it in the back seat.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:exit-strategy",
      label: "The exit strategy talk",
      optionCandidates: [
        { id: "maciek:exit-strategy:opt-1", topicId: "maciek:exit-strategy", text: "Do you actually have an exit strategy?" },
        { id: "maciek:exit-strategy:opt-2", topicId: "maciek:exit-strategy", text: "Dawid heard you mention 'the exit' at a party?" },
        { id: "maciek:exit-strategy:opt-3", topicId: "maciek:exit-strategy", text: "Investors always ask about the exit?" },
        { id: "maciek:exit-strategy:opt-4", topicId: "maciek:exit-strategy", text: "Ania made content about 'what if we sold'?" },
        { id: "maciek:exit-strategy:opt-5", topicId: "maciek:exit-strategy", text: "Grazyna models an acquisition scenario?" },
        { id: "maciek:exit-strategy:opt-6", topicId: "maciek:exit-strategy", text: "What is your real answer about selling this place?" },
      ],
      replyCandidates: [
        {
          id: "maciek:exit-strategy:rep-1",
          text: "I keep one, in a drawer, like a fire extinguisher. You maintain it, you hope never to use it, and you tell nobody where it hangs. An exit strategy is not a plan to leave. It is proof you could afford to stay. Nobody negotiates well from need. The drawer stays locked and full.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:exit-strategy:rep-2",
          text: "He heard me, and the next morning there was a one-page memo on my desk titled 'what selling would cost us', all numbers, zero adjectives. He is not against the exit. He is against the exit being vague. I keep the memo pinned inside the drawer. The drawer got heavier. That was the point.",
          relationshipHint: "delighted",
          tags: ["quest:dawid-graph-memo"],
        },
        {
          id: "maciek:exit-strategy:rep-3",
          text: "Always, in the first meeting, like doctors asking about family history. My answer is the same every time: the exit is an option we price, not a direction we steer. Some investors nod. The ones who nod get the second meeting. The ones who smile and say 'but ten times revenue' get the good coffee and the short visit.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:exit-strategy:rep-4",
          text: "She did, one post: 'the office, but if it were sold'. It was warm, it was beautiful, and the comments were a funeral for a company that is not for sale. I called her, laughing, slightly shaking. Content is powerful. We now run future posts past the desk where the drawer lives. Lesson priced in.",
          relationshipHint: "annoyed",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "maciek:exit-strategy:rep-5",
          text: "She does, one scenario, updated yearly, with a number I am not allowed to love. She calls it 'the price of everything'. I call it the fire extinguisher's price tag. Between her realism and my sentiment, this company has survived every offer. She prices. I stall. The combination is load-bearing.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "maciek:exit-strategy:rep-6",
          text: "This place is not a chip. It is a table where people became colleagues, and colleagues became the weird family that argues about parking. Tables do not exit. Tables host. When I am too old for the room, the right hand takes the keys, and the table stays set. That is the exit plan. It is terrible math and excellent strategy.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "maciek:writing-a-book",
      label: "The book he is writing",
      optionCandidates: [
        { id: "maciek:writing-a-book:opt-1", topicId: "maciek:writing-a-book", text: "Is the book actually happening?" },
        { id: "maciek:writing-a-book:opt-2", topicId: "maciek:writing-a-book", text: "What is chapter one about?" },
        { id: "maciek:writing-a-book:opt-3", topicId: "maciek:writing-a-book", text: "Ania refuses to design the cover until there is a manuscript?" },
        { id: "maciek:writing-a-book:opt-4", topicId: "maciek:writing-a-book", text: "You write on flights, like a movie executive?" },
        { id: "maciek:writing-a-book:opt-5", topicId: "maciek:writing-a-book", text: "Tomek proofread a chapter and marked it up?" },
        { id: "maciek:writing-a-book:opt-6", topicId: "maciek:writing-a-book", text: "What is the book's title, working version?" },
      ],
      replyCandidates: [
        {
          id: "maciek:writing-a-book:rep-1",
          text: "Forty-one thousand words of happening. The book is like any startup: a rough launch, a slow quarter, and a core loop that works. I have declared it to the office, which means it now has a board of directors wearing lanyards. Public commitment is my favorite productivity drug. Prescribed by me, to me.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:writing-a-book:rep-2",
          text: "The year we almost died, told through invoices. Chapter one is the month we could not make payroll and the client who paid early without being asked. Business books skip the terror. I am putting the terror in the first chapter, where it belongs. Terror is the only honest opener. Everything else is the appendix.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:writing-a-book:rep-3",
          text: "She designed three covers for a book that is forty percent real and the constraint is genius. The covers are DONE. The manuscript now has three beautiful doors and is embarrassed about the house. She knew exactly what she was doing. Marketing as parenting. I write out of shame now. It works.",
          relationshipHint: "delighted",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "maciek:writing-a-book:rep-4",
          text: "Flights are my writing retreat: no wifi, no exits, one audience of clouds. Two chapters were born at cruising altitude, which is where all my best decisions live, apparently. Landing kills momentum. Klaudia filmed me typing at 38,000 feet and the caption was 'CEO speedrunning a book'. Accurate. Unpaid.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:writing-a-book:rep-5",
          text: "He returned chapter three with nine comments and every single one was 'this paragraph does not compile'. He was right nine times. The chapter is now shorter, meaner, and true. I asked him to read the next one and he said 'send it'. From him, that is a standing ovation with a two-word runtime.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "maciek:writing-a-book:rep-6",
          text: "'Almost Died, Kept the Whiteboard'. It is honest, it has a typo risk Ania has vetoed twice, and it captures the whole method: survive first, organize second. The publisher wants something with 'leadership' in it. The publisher has not almost died. We are negotiating. Like everything, it is a relationship.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:espresso-machine",
      label: "The espresso machine",
      optionCandidates: [
        { id: "maciek:espresso-machine:opt-1", topicId: "maciek:espresso-machine", text: "The espresso machine cost more than my desk?" },
        { id: "maciek:espresso-machine:opt-2", topicId: "maciek:espresso-machine", text: "Janusz services it personally?" },
        { id: "maciek:espresso-machine:opt-3", topicId: "maciek:espresso-machine", text: "Grazyna categorizes it as equipment?" },
        { id: "maciek:espresso-machine:opt-4", topicId: "maciek:espresso-machine", text: "Tomek drinks tea next to it, defiantly?" },
        { id: "maciek:espresso-machine:opt-5", topicId: "maciek:espresso-machine", text: "Clients photograph the machine more than the logo wall?" },
        { id: "maciek:espresso-machine:opt-6", topicId: "maciek:espresso-machine", text: "Was the machine worth it, honestly?" },
      ],
      replyCandidates: [
        {
          id: "maciek:espresso-machine:rep-1",
          text: "It cost more than three desks and outperforms all of them. People sit at desks; people RETURN to machines. I have watched deals restart warmly at that machine after dying cold in the meeting room. It is not an appliance. It is a neutral embassy with steam. Cheapest diplomacy per cup in this city.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:espresso-machine:rep-2",
          text: "Thursdays, with the small brushes, in silence, like a man tuning a chapel organ. He accepted the machine the day it proved reliable, which took eleven months of probation. Janusz has now PERSONALIZED it: a descale log, a sticker from his supplier, and one rule nobody translated. The machine has a guardian.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:espresso-machine:rep-3",
          text: "She does, as 'staff welfare infrastructure, depreciating', a category she invented during our first argument about it. The machine depreciates over five years; the morale appreciates daily. She knows this. The ledger knows this. We signed a truce over a double espresso. Both parties caffeinated.",
          relationshipHint: "pleased",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "maciek:espresso-machine:rep-4",
          text: "He does, with his own kettle, at his own station, radiating the calm of a man immune to marketing. I respect it more than he will ever know. Every office needs one person whose wants are already met. He anchors our inflation. When even TOMASZ wants something, we will know the world has changed.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:espresso-machine:rep-5",
          text: "They do, steam and all, and the machine has its own hashtag we did not create. I have watched a client's whole team gather under it like a landmark in a city tour. We spent thousands on the logo wall. The machine does more work per watt. The logo wall is beautiful. The machine is useful. Both stay.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:espresso-machine:rep-6",
          text: "Every zloty, measured in returns I can partially prove: fewer coffee runs, faster mornings, two clients who renegotiated happily standing next to it. Was it rational on purchase day? No. Did it become rational through use? That is my whole management philosophy in one appliance. Buy courage. Use it daily.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:pivot-pizza",
      label: "The pivot pizza",
      optionCandidates: [
        { id: "maciek:pivot-pizza:opt-1", topicId: "maciek:pivot-pizza", text: "Bad news comes with pizza around here?" },
        { id: "maciek:pivot-pizza:opt-2", topicId: "maciek:pivot-pizza", text: "The last pivot pizza was for what exactly?" },
        { id: "maciek:pivot-pizza:opt-3", topicId: "maciek:pivot-pizza", text: "Zosia orders the pizza or you do?" },
        { id: "maciek:pivot-pizza:opt-4", topicId: "maciek:pivot-pizza", text: "Tomek refuses to eat pivot pizza on principle?" },
        { id: "maciek:pivot-pizza:opt-5", topicId: "maciek:pivot-pizza", text: "Klaudia documented one pizza night for the feed?" },
        { id: "maciek:pivot-pizza:opt-6", topicId: "maciek:pivot-pizza", text: "Is pizza for bad news not manipulative?" },
      ],
      replyCandidates: [
        {
          id: "maciek:pivot-pizza:rep-1",
          text: "Always, and I am never subtle about it. When the founder walks in with boxes, the office reads the room in four seconds. I gave up on softening years ago. The pizza says 'this is serious' and 'you will not face it hungry' at the same time. Two messages, one box. Efficient grief.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:pivot-pizza:rep-2",
          text: "The client who took eighteen months of work to a competitor, in one email, on a Tuesday. We pivoted the whole roadmap by Friday. The pizza night was quiet, honest, and nobody left. Two people cried, one laughed, and by slice four we had three new plans on napkins. That is what the boxes buy. Napkins with plans.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:pivot-pizza:rep-3",
          text: "She does, because she knows the office's orders better than the pizzeria does. Two vegetarian, one without olives for Klaudia, and the spicy one that only Marek eats while reading the postmortem. The logistics of grief matter. You cannot deliver bad news on the wrong pizza. It curdles the message.",
          relationshipHint: "pleased",
          tags: ["quest:zosia-opened-up"],
        },
        {
          id: "maciek:pivot-pizza:rep-4",
          text: "He eats it, quietly, which surprised everyone including him. He said 'refusing food at a funeral is also a statement'. The man found the one principle bigger than his principles: showing up. He takes the smallest slice and stays the longest. That slice does more for morale than the whole box.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr", "relationship:warm"],
        },
        {
          id: "maciek:pivot-pizza:rep-5",
          text: "She asked permission first, which I respected, and the post was about the togetherness, not the trouble. 'The office eats together when it matters' did quiet, warm numbers. No location tags, no client names. She understood the line perfectly. Pizza journalism has ethics. She wrote them.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:pivot-pizza:rep-6",
          text: "It would be, if the pizza replaced the truth. It does not. The truth comes first, plain, no slides. Then the boxes. The pizza is not a message. It is a chair at the table while the message settles. Nobody in this office has ever learned bad news from a box. They learn it from me, then we eat.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:rebrand-itch",
      label: "The rebrand itch",
      optionCandidates: [
        { id: "maciek:rebrand-itch:opt-1", topicId: "maciek:rebrand-itch", text: "You floated rebranding the company again?" },
        { id: "maciek:rebrand-itch:opt-2", topicId: "maciek:rebrand-itch", text: "The name-in-a-new-font idea lasted how long?" },
        { id: "maciek:rebrand-itch:opt-3", topicId: "maciek:rebrand-itch", text: "Ania has a protocol for your rebrand moods?" },
        { id: "maciek:rebrand-itch:opt-4", topicId: "maciek:rebrand-itch", text: "Klaudia mocked up a rebrand in one afternoon?" },
        { id: "maciek:rebrand-itch:opt-5", topicId: "maciek:rebrand-itch", text: "Grazyna prices a rebrand to end the conversation?" },
        { id: "maciek:rebrand-itch:opt-6", topicId: "maciek:rebrand-itch", text: "Why does a founder even want a rebrand?" },
      ],
      replyCandidates: [
        {
          id: "maciek:rebrand-itch:rep-1",
          text: "Twice a year, spring and budget season. It is not doubt, it is dandruff: chronic, visible, treatable. Every founder I know scratches the same itch. The company is fine. The logo is fine. I am a man occasionally allergic to stability, and the office has long since built an immunity to my moods.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:rebrand-itch:rep-2",
          text: "Eleven days, one Sunday of fonts, and a verdict from the least artistic person in the building. Tomasz said the new name 'is a rename, not a name' and went back to his compiler. Eleven days of exploration, one sentence of truth. Best consulting I never paid for. The itch scratched itself.",
          relationshipHint: "delighted",
          tags: ["quest:tomek-reviewed-pr"],
        },
        {
          id: "maciek:rebrand-itch:rep-3",
          text: "She does: I get one discovery call, no fonts, and a mood board with my own logo circled in it. The board is my logo from three angles, which is her saying 'look at what you HAVE'. It works for six months. Ania manages my brand the way a vet manages a large animal. Calm voice, firm hands.",
          relationshipHint: "delighted",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "maciek:rebrand-itch:rep-4",
          text: "She did, instantly, beautifully, with our name in a font that made the office gasp. Then she posted a poll and the audience chose the CURRENT brand by eighty percent. She engineered my rejection in public and called it 'market research'. The itch survived the data. Barely. Respectfully. She is dangerous.",
          relationshipHint: "pleased",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "maciek:rebrand-itch:rep-5",
          text: "She prices it at the exact cost of the thing we would postpone instead. Last time: 'one rebrand equals one hire plus half a server'. The conversation ended itself. Accounting as contraception for impulses. I have stopped being offended. The technique is elegant and the margins thank her.",
          relationshipHint: "delighted",
          tags: ["quest:grazyna-showed-the-books"],
        },
        {
          id: "maciek:rebrand-itch:rep-6",
          text: "Because the logo is the only part of the company a founder can fix in one afternoon. You cannot refactor the culture by lunch. You cannot pivot the market before dinner. But a logo? That is a Sunday project. The itch is really a wish to renovate what cannot be renovated. The logo just takes the beating.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:tv-dream",
      label: "The morning TV dream",
      optionCandidates: [
        { id: "maciek:tv-dream:opt-1", topicId: "maciek:tv-dream", text: "You want the company on morning television?" },
        { id: "maciek:tv-dream:opt-2", topicId: "maciek:tv-dream", text: "Ania pitched the producer already?" },
        { id: "maciek:tv-dream:opt-3", topicId: "maciek:tv-dream", text: "You practiced a TV laugh in the office?" },
        { id: "maciek:tv-dream:opt-4", topicId: "maciek:tv-dream", text: "Tomek said TV is 'a legacy medium'?" },
        { id: "maciek:tv-dream:opt-5", topicId: "maciek:tv-dream", text: "Klaudia could coach you for the camera?" },
        { id: "maciek:tv-dream:opt-6", topicId: "maciek:tv-dream", text: "What would you even say on morning TV?" },
      ],
      replyCandidates: [
        {
          id: "maciek:tv-dream:rep-1",
          text: "Morning TV is where the country eats breakfast, and I want this company at that table. My grandfather trusted what he saw at breakfast. So does every buyer over forty. The internet is where we work. Television is where we are believed. I contain both strategies and zero shame about either.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:tv-dream:rep-2",
          text: "She pitched, the producer called back, and the call lasted four minutes and changed nothing yet. But Ania filed the contact under 'warm' and the word 'warm' in her system is a door left ajar. We are one quiet news month away from the couch. She knows it. I check the folder. Quarterly. Calmly.",
          relationshipHint: "delighted",
          tags: ["quest:ania-season-two"],
        },
        {
          id: "maciek:tv-dream:rep-3",
          text: "I did, once, in the server room, and the room's acoustics gave me away. Marek heard the laugh echo and asked if the backup alarm was testing. I said yes. The real test continues, privately, quarterly. A founder's TV laugh must sound surprised by its own joke. Mine is in final rehearsals.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:tv-dream:rep-4",
          text: "He called it 'broadcast: write-only' and refused to elaborate, which is his highest form of commentary. He is right about reach and wrong about trust, and both of us know the other is half-right, which is why our arguments never die. They just compile and wait. The TV dream survives his comments. So does his respect.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "maciek:tv-dream:rep-5",
          text: "She already has, one session, her ring light, her rules. 'Stop performing, start talking' was the whole coaching. She films the office being real every day; she is the only qualified camera person I know. My homework was one minute to her lens, no slides. I passed on the third take. She kept the outtakes.",
          relationshipHint: "delighted",
          tags: ["quest:klaudia-rebranded-you"],
        },
        {
          id: "maciek:tv-dream:rep-6",
          text: "Sixty seconds: what we do, who we did it for, and one story about the almost-bankrupt year told with a smile. No buzzwords. Buzzwords die on TV; they are born in conference rooms and cannot breathe in daylight. The pitch is just the company, standing straight, in the morning light. Like the office. On a good day.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "maciek:dead-startups",
      label: "The friends with dead startups",
      optionCandidates: [
        { id: "maciek:dead-startups:opt-1", topicId: "maciek:dead-startups", text: "Do you still meet your old founder friends?" },
        { id: "maciek:dead-startups:opt-2", topicId: "maciek:dead-startups", text: "Their companies really all shut down?" },
        { id: "maciek:dead-startups:opt-3", topicId: "maciek:dead-startups", text: "How do you talk about wins with them?" },
        { id: "maciek:dead-startups:opt-4", topicId: "maciek:dead-startups", text: "One of them almost joined us last year?" },
        { id: "maciek:dead-startups:opt-5", topicId: "maciek:dead-startups", text: "Klaudia wants to film the founder reunion?" },
        { id: "maciek:dead-startups:opt-6", topicId: "maciek:dead-startups", text: "What did the graveyard teach you that winning did not?" },
      ],
      replyCandidates: [
        {
          id: "maciek:dead-startups:rep-1",
          text: "Every quarter, one long table, no agenda. Five of us started the same year with the same slide decks and different luck. Two sold, two folded, one of us is still here writing this story. The table has no KPIs. It has pierogi and the specific honesty of people who have all signed personal guarantees.",
          relationshipHint: "pleased",
          tags: ["period:lunch"],
        },
        {
          id: "maciek:dead-startups:rep-2",
          text: "Three folded, one sold for a song, one became a quiet department inside a giant. None of them failed stupidly. That is the part nobody prints. They failed the way good drivers crash: bad ice, bad timing, one wrong call at speed. The graveyard is full of talent that did the reading.",
          relationshipHint: "neutral",
        },
        {
          id: "maciek:dead-startups:rep-3",
          text: "Carefully, and then honestly, which is the only order that works. I share numbers with them I share with no investor. They asked for it once, all five, over one dinner: 'tell us the real ones'. Since then, wins land soft and losses land soft. The table is the only room where my numbers can rest.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:dead-startups:rep-4",
          text: "He almost did, and we shook hands and he stayed where he was. Best result possible. He would have been caged here, polite and useless, dreaming of his own thing. I wrote him a reference for HIS new venture instead. You do not adopt a wolf into a family. You wish it weather. He is doing well. Louder than us.",
          relationshipHint: "pleased",
        },
        {
          id: "maciek:dead-startups:rep-5",
          text: "She offered, and the table said no as one man. That dinner is the one place none of us perform. Cameras turn men into brands and that table runs on the opposite fuel. She took it well. She said 'the one room that refuses content is the realest content'. She is wise and slightly dangerous. Both useful.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "maciek:dead-startups:rep-6",
          text: "That survival is mostly weather and the rest is fast answers to simple questions: can you pay Friday, can you say no, can you sleep. Winning teaches you none of that because winning is a lucky run down a dry road. The graveyard teaches with rain. I visit the lessons every quarter. The table IS the visit.",
          relationshipHint: "pleased",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "maciek:task-buzzword",
      title: "Second the nomination",
      description: "The buzzword poll is open and 'blockchain' is winning, which means the slide will say 'TRUST'. Champion 'training' across the floor — one word, real meaning, dangerous. If it wins, the slide says 'GROWTH', and for once it is not lying.",
      flagToSet: "maciek-training-buzzword",
      rewardHint: "+one honest slide",
    },
  ],
};

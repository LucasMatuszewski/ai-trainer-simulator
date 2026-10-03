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

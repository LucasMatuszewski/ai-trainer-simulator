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

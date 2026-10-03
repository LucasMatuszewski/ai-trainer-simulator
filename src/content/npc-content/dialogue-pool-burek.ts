/**
 * WS5 dialogue v2 pool — Burek, Office Dog (C-77).
 *
 * Pure authored data. Species-appropriate half-size pools around his
 * existing themes: the standup audit (twelve sharp, under the table, one
 * exhale when Przemek over-forecasts) and creature comforts (food
 * security, the squeaky server toy, the toy contract). Every reply speaks
 * dog: *sound*, [action] or (thought), matching the legacy dog dialogues.
 * Task offer: the toy contract (sets the existing `burek-person` flag —
 * in dog, this is a contract, and there is no offboarding from it).
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const BUREK_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "burek",
  topics: [
    {
      id: "burek:audit",
      label: "The audit",
      optionCandidates: [
        {
          id: "burek:audit:opt-1",
          topicId: "burek:audit",
          text: "Burek, is prod really fine?",
        },
        {
          id: "burek:audit:opt-2",
          topicId: "burek:audit",
          text: "Przemek just over-forecast. Thoughts?",
        },
        {
          id: "burek:audit:opt-3",
          topicId: "burek:audit",
          text: "Can I see the standup audit today?",
        },
        {
          id: "burek:audit:opt-4",
          topicId: "burek:audit",
          text: "The numbers were corrected. Was that you?",
        },
        {
          id: "burek:audit:opt-5",
          topicId: "burek:audit",
          text: "Who audits the auditor?",
        },
        {
          id: "burek:audit:opt-6",
          topicId: "burek:audit",
          text: "You missed standup. Everything okay?",
        },
      ],
      replyCandidates: [
        {
          id: "burek:audit:rep-1",
          text: "*one short blast through the nose* (The dashboard says fine. The dashboard has never attended a Friday deploy.) [rests chin on paws]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:audit:rep-2",
          text: "*the exhale* (Conservatively, double. Realistically, half of that.) [watches Przemek correct himself in real time]",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:audit:rep-3",
          text: "*tail moves one centimeter* (Twelve sharp, meeting room, under the table. You may observe from the corridor. Do not acknowledge me. That is the ceremony.)",
          relationshipHint: "pleased",
          tags: ["period:lunch", "relationship:neutral"],
        },
        {
          id: "burek:audit:rep-4",
          text: "*ear tilts* (Correction implies guilt. I prefer 'governance'.) [stares at the forecast until it behaves]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:audit:rep-5",
          text: "*slow blink* (There is one. He is called Janusz. We do not speak of the arrangement.) [returns to the warm patch of floor]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:audit:rep-6",
          text: "*head up, both ears* (Twelve-oh-four is sacred, but the audit accepts delegation. The sigh you heard at nine was mine and it stands.) [sighs again, forgives]",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:treats",
      label: "Food and toys",
      optionCandidates: [
        {
          id: "burek:treats:opt-1",
          topicId: "burek:treats",
          text: "Burek, did you eat my lunch?",
        },
        {
          id: "burek:treats:opt-2",
          topicId: "burek:treats",
          text: "Want half of my sandwich?",
        },
        {
          id: "burek:treats:opt-3",
          topicId: "burek:treats",
          text: "Where is the squeaky server toy?",
        },
        {
          id: "burek:treats:opt-4",
          topicId: "burek:treats",
          text: "Fetch? One throw. I am busy.",
        },
        {
          id: "burek:treats:opt-5",
          topicId: "burek:treats",
          text: "Who is a good auditor? Who is?",
        },
        {
          id: "burek:treats:opt-6",
          topicId: "burek:treats",
          text: "Can I be your person?",
        },
      ],
      replyCandidates: [
        {
          id: "burek:treats:rep-1",
          text: "*stares at the empty hand, then at you* (The office failed to guard it. I performed the security audit.) [no remorse detected]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:treats:rep-2",
          text: "*sits instantly, at maximum posture* (Half is a down payment. Friendship is the interest.) [tail: one centimeter, which in dog is applause]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:treats:rep-3",
          text: "*ear perk* (Under the CEO's desk. It is called leverage. Even the chair rotates for me.)",
          relationshipHint: "pleased",
        },
        {
          id: "burek:treats:rep-4",
          text: "*stands, with the gravity of a mountain deciding to move* (One throw. You will want two. They always want two.) [awaits, professionally]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:treats:rep-5",
          text: "*the tail finally betrays him, full wag* (Yes. Obviously. The bowl says so.) [CHIEF AUDIT OFFICER, accepting the record]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:treats:rep-6",
          text: "*drops the squeaky server at your feet* (In dog, this is a contract. You throw, I return; the toy squeaks, the office survives; the audit continues. There is no offboarding. HR has tried.)",
          relationshipHint: "delighted",
          tags: ["quest:burek-standup-observed", "relationship:warm"],
          offersTaskId: "burek:task-toy-contract",
        },
      ],
    },
    {
      id: "burek:ball",
      label: "The ball protocol",
      optionCandidates: [
        { id: "burek:ball:opt-1", topicId: "burek:ball", text: "Burek, the ball is under the sofa again." },
        { id: "burek:ball:opt-2", topicId: "burek:ball", text: "Fetch? Best of three?" },
        { id: "burek:ball:opt-3", topicId: "burek:ball", text: "Who moved the ball? Confess." },
        { id: "burek:ball:opt-4", topicId: "burek:ball", text: "The ball squeaks less lately. Concern?" },
        { id: "burek:ball:opt-5", topicId: "burek:ball", text: "Can the ball come to the client meeting?" },
        { id: "burek:ball:opt-6", topicId: "burek:ball", text: "What does the ball mean to you, professionally?" },
      ],
      replyCandidates: [
        {
          id: "burek:ball:rep-1",
          text: "*one low woof* (The sofa protects it. The sofa understands custody.) [waits, patient as an invoice]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:ball:rep-2",
          text: "*tail: two centimeters* (Best of three is an amateur's contract. Best of FOREVER.) [sits at launch position]",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:ball:rep-3",
          text: "*ear rotation, slow* (The ball migrated. Balls migrate. I audit the migration.) [nudges sofa with one paw]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:ball:rep-4",
          text: "*sniff, dismissive* (It is tired from work. We are all tired from work.) [collects ball anyway, gently]",
          relationshipHint: "pleased",
          tags: ["quest:burek-person", "relationship:warm"],
        },
        {
          id: "burek:ball:rep-5",
          text: "*head tilt, seventy degrees* (The ball is not board-certified. Neither am I. We stay.) [lays down, final]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:ball:rep-6",
          text: "*long exhale through nose* (The ball is the deliverable. The squeak is the number. You are the vendor.) [drops ball at your shoe]",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "burek:standup",
      label: "The standup seat",
      optionCandidates: [
        { id: "burek:standup:opt-1", topicId: "burek:standup", text: "Burek, why the corner spot at standup?" },
        { id: "burek:standup:opt-2", topicId: "burek:standup", text: "You sighed during Przemek's forecast. On record?" },
        { id: "burek:standup:opt-3", topicId: "burek:standup", text: "Can I stand where you stand at standup?" },
        { id: "burek:standup:opt-4", topicId: "burek:standup", text: "What do you actually hear at standup?" },
        { id: "burek:standup:opt-5", topicId: "burek:standup", text: "Standup ran long. Your official position?" },
        { id: "burek:standup:opt-6", topicId: "burek:standup", text: "Do you rate the standup? Today's score?" },
      ],
      replyCandidates: [
        {
          id: "burek:standup:rep-1",
          text: "*sits, precisely* (Corner: sightlines of all humans, one exit, no eye contact. It is strategy, not shyness.) [one tail beat]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:standup:rep-2",
          text: "*the exhale, audible* (On record. Filed. The forecast was optimistic by a factor of dog.) [closes eyes, case closed]",
          relationshipHint: "annoyed",
          tags: ["quest:burek-standup-observed"],
        },
        {
          id: "burek:standup:rep-3",
          text: "*low growl, ceremonial* (The spot is earned in treats and silence. You have one of the two.) [shifts eight centimeters, a concession]",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:standup:rep-4",
          text: "*ears: both forward* (Who is blocked, who is lying, and which word rhymes with walk. Three channels. Full coverage.) [yawns, professionally]",
          relationshipHint: "delighted",
          tags: ["period:morning"],
        },
        {
          id: "burek:standup:rep-5",
          text: "*the deep sigh of management* (Long standups are standups that forgot the floor is cold. I will forgive. I will not forget.) [stands, stretches, ends it]",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:standup:rep-6",
          text: "*one bark, definitive* (Four. The muffins were five. Attendance was three. The trend is my concern now.) [collects crumbs as consulting fee]",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:courier",
      label: "The courier nemesis",
      optionCandidates: [
        { id: "burek:courier:opt-1", topicId: "burek:courier", text: "Burek, the courier is at the door. Plan?" },
        { id: "burek:courier:opt-2", topicId: "burek:courier", text: "Why the courier and not the postman?" },
        { id: "burek:courier:opt-3", topicId: "burek:courier", text: "The courier brought a treat once. Traitor?" },
        { id: "burek:courier:opt-4", topicId: "burek:courier", text: "Your bark at the courier has layers. Explain." },
        { id: "burek:courier:opt-5", topicId: "burek:courier", text: "Should we tell the courier you are friendly?" },
        { id: "burek:courier:opt-6", topicId: "burek:courier", text: "Did the courier and you reach a treaty?" },
      ],
      replyCandidates: [
        {
          id: "burek:courier:rep-1",
          text: "*up, instantly* (I do not chase. I OBSERVE the handoff. Every package is an audit.) [trots to the door, dignified]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:courier:rep-2",
          text: "*one sharp woof* (The postman completes routes. The courier RINGS. Rings are questions. I answer questions.) [sits by the door, armed]",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:courier:rep-3",
          text: "*stares into the distance* (The treaty of 2024. He paid tribute. The tribute was accepted. The war was archived.) [wags once, remembering]",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:courier:rep-4",
          text: "*the layered bark* (Layer one: announcement. Layer two: assessment. Layer three: respect between professionals. You heard all three.) [head high]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:courier:rep-5",
          text: "*slow blink* (He knows. He rings softer now. We are colleagues with a history.) [returns to bed, mission complete]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:courier:rep-6",
          text: "*two tail beats* (There was never a war. There was an AUDIT SCHEDULE and he respects it now. Every empire is a misunderstanding, documented.) [sighs, satisfied]",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
      ],
    },
    {
      id: "burek:pizza",
      label: "The pizza box",
      optionCandidates: [
        { id: "burek:pizza:opt-1", topicId: "burek:pizza", text: "Burek, there is a pizza box on the counter." },
        { id: "burek:pizza:opt-2", topicId: "burek:pizza", text: "Did you audition for the pizza at the party?" },
        { id: "burek:pizza:opt-3", topicId: "burek:pizza", text: "The pizza has pineapple. Your position?" },
        { id: "burek:pizza:opt-4", topicId: "burek:pizza", text: "Who guards the pizza when the office sleeps?" },
        { id: "burek:pizza:opt-5", topicId: "burek:pizza", text: "Can the pizza crumbs count as treats?" },
        { id: "burek:pizza:opt-6", topicId: "burek:pizza", text: "What is the pizza protocol, step by step?" },
      ],
      replyCandidates: [
        {
          id: "burek:pizza:rep-1",
          text: "*nose lifts, radar mode* (The box is a promise. The counter is a challenge. I am a professional. I wait for the WEAKENING.) [sits by counter, patient]",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:pizza:rep-2",
          text: "*one tail sweep* (I auditioned with eye contact alone. The crust fell. The crust was meant to fall. We both know.) [accepts crust, dignity intact]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:pizza:rep-3",
          text: "*head tilt, then dismissal* (Fruit is a topology error. I forgive the humans. I do not forgive the pineapple.) [leaves the room, briefly]",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:pizza:rep-4",
          text: "*blinks twice, slowly* (Night shift is mine. The counter is swept by midnight. The office wakes to a clean crime scene.) [yawns, guilty of nothing]",
          relationshipHint: "pleased",
          tags: ["period:evening"],
        },
        {
          id: "burek:pizza:rep-5",
          text: "*the crumb sigh* (Crumbs are AMBUSH treats. Ambush treats taste of luck. Luck is the best flavor.) [vacuums the floor, personally]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:pizza:rep-6",
          text: "*one authoritative woof* (Step one: the box opens. Step two: I am watching. Step three: the crust is mine. Step four: we never speak of the cheese.) [settles in for step one]",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:printer-fear",
      label: "The printer respect",
      optionCandidates: [
        { id: "burek:printer-fear:opt-1", topicId: "burek:printer-fear", text: "Burek, the printer made the sound again." },
        { id: "burek:printer-fear:opt-2", topicId: "burek:printer-fear", text: "Are you scared of the printer? Be honest." },
        { id: "burek:printer-fear:opt-3", topicId: "burek:printer-fear", text: "You bow to the printer hallway. Explain." },
        { id: "burek:printer-fear:opt-4", topicId: "burek:printer-fear", text: "The printer has not printed since 2019. Remember?" },
        { id: "burek:printer-fear:opt-5", topicId: "burek:printer-fear", text: "Would you guard the printer if asked?" },
        { id: "burek:printer-fear:opt-6", topicId: "burek:printer-fear", text: "What happens when they remove the printer?" },
      ],
      replyCandidates: [
        {
          id: "burek:printer-fear:rep-1",
          text: "*ears flat, then recovery* (I heard. The building heard. The printer is speaking in its sleep. Respect the sleep.) [exits the hallway, quietly]",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:printer-fear:rep-2",
          text: "*sits very still* (Fear is for the unprepared. I am PREPARED. I know the exits, the schedules, and the tone. It is respect with a tail.) [one tail beat, steady]",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:printer-fear:rep-3",
          text: "*low bow, ceremonial* (The hallway is its territory. Territory is acknowledged in my language. The bow costs nothing. Peace is cheap.) [holds the bow one second]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:printer-fear:rep-4",
          text: "*long stare at the horizon* (I remember the last page. It was a test page. It said OK. We have not been OK since, but we have been CALM.) [rests chin on paws]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:printer-fear:rep-5",
          text: "*stands, formal* (I guard what matters. The audit, the kitchen, and the sleeping giant. The giant has never asked. The offer stands.) [one bark, sealed]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:printer-fear:rep-6",
          text: "*head cocked, then a slow woof* (Removal is a myth. Like the vacuum that never returns. But if it goes, the hallway is MINE. I have plans.) [stretches, territorial]",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "burek:vacuum",
      label: "The vacuum treaty",
      optionCandidates: [
        { id: "burek:vacuum:opt-1", topicId: "burek:vacuum", text: "Burek, the vacuum is out. Stand down." },
        { id: "burek:vacuum:opt-2", topicId: "burek:vacuum", text: "Why the vacuum and not the courier?" },
        { id: "burek:vacuum:opt-3", topicId: "burek:vacuum", text: "The vacuum was silent yesterday. Peace?" },
        { id: "burek:vacuum:opt-4", topicId: "burek:vacuum", text: "Janusz says the vacuum is old. Does it matter?" },
        { id: "burek:vacuum:opt-5", topicId: "burek:vacuum", text: "Can you and the vacuum share the room?" },
        { id: "burek:vacuum:opt-6", topicId: "burek:vacuum", text: "The vacuum scared an intern. Your take?" },
      ],
      replyCandidates: [
        {
          id: "burek:vacuum:rep-1",
          text: "*retreats, strategically* (I do not flee. I REPOSITION. The treaty gives me the corridor and the corridor is good.) [settles in corridor, monitoring]",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:vacuum:rep-2",
          text: "*one hard stare* (The courier rings and leaves. The vacuum STAYS. It lingers. Lingering is the crime.) [watches the closet door]",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:vacuum:rep-3",
          text: "*one suspicious ear* (Silence is a tactic. Vacuums rehearse. I have not forgiven. I have merely relaxed by forty percent.) [one ear stays on duty]",
          relationshipHint: "neutral",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:vacuum:rep-4",
          text: "*slow blink* (Age is not weakness in an enemy. Age is experience. The old ones know the corners. I respect the veteran.) [groans, accepts fate]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:vacuum:rep-5",
          text: "*sits, maximally dignified* (We share the room. We do not share the TIMING. When it hums, I am elsewhere. Diplomacy.) [positions near exit, elegantly]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:vacuum:rep-6",
          text: "*one consoling woof* (The intern has met the true enemy. Now the intern understands the office. Welcome to knowledge.) [escorts intern to safety]",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:burek-person"],
        },
      ],
    },
    {
      id: "burek:hr-visit",
      label: "The HR meeting",
      optionCandidates: [
        { id: "burek:hr-visit:opt-1", topicId: "burek:hr-visit", text: "Burek, Kasia wants a performance review." },
        { id: "burek:hr-visit:opt-2", topicId: "burek:hr-visit", text: "Kasia asked about your career goals. Answer?" },
        { id: "burek:hr-visit:opt-3", topicId: "burek:hr-visit", text: "Your file says 'morale infrastructure'. Response?" },
        { id: "burek:hr-visit:opt-4", topicId: "burek:hr-visit", text: "Kasia offered you a title. Ceremony?" },
        { id: "burek:hr-visit:opt-5", topicId: "burek:hr-visit", text: "The review form has a barking section. Finally?" },
        { id: "burek:hr-visit:opt-6", topicId: "burek:hr-visit", text: "Kasia says you are 'unfireable'. Feelings?" },
      ],
      replyCandidates: [
        {
          id: "burek:hr-visit:rep-1",
          text: "*sits, cooperative* (I have prepared: I have attended everything, guarded everything, and exhaled at exactly one forecast. Let the record show.) [waits, composed]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:hr-visit:rep-2",
          text: "*head tilt, ninety degrees* (Goals are for those with thumbs. My trajectory is FLAT and PERFECT. Flat is the goal.) [one tail beat, complete]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:hr-visit:rep-3",
          text: "*the dignified sniff* (Accurate. I am the load-bearing dog. Remove me and watch the morale become arithmetic.) [leans against her leg, making the point]",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:hr-visit:rep-4",
          text: "*stands at full height* (Titles are collars with paperwork. I wear the collar. The paperwork is Kasia's hobby. We are both fulfilled.) [permits the title]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:hr-visit:rep-5",
          text: "*one excited circle* (A section for the voice. History. I have waited nine years to be measured in SOUND.) [barks once, for the record]",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:hr-visit:rep-6",
          text: "*the slow, satisfied blink* (Unfireable is not a compliment. It is a JOB DESCRIPTION. I fulfill it daily, at nap rate.) [settles, tenured]",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:renata",
      label: "The Renata file",
      optionCandidates: [
        { id: "burek:renata:opt-1", topicId: "burek:renata", text: "Burek, why does Renata get the full tail?" },
        { id: "burek:renata:opt-2", topicId: "burek:renata", text: "Renata feeds you at ten. Contractual?" },
        { id: "burek:renata:opt-3", topicId: "burek:renata", text: "You guard Renata's desk at lunch. Explain." },
        { id: "burek:renata:opt-4", topicId: "burek:renata", text: "Renata talks to you about her day. Listening?" },
        { id: "burek:renata:opt-5", topicId: "burek:renata", text: "Renata's chair is the good one. Claim it?" },
        { id: "burek:renata:opt-6", topicId: "burek:renata", text: "What would you do if Renata left the office?" },
      ],
      replyCandidates: [
        {
          id: "burek:renata:rep-1",
          text: "*the full tail, on cue* (Renata speaks at the frequency of the walk. The tail is translation. I do not make the rules. I AM the rules.) [wags, bilingual]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:renata:rep-2",
          text: "*sits at 9:58* (Contractual, witnessed by the kettle. Ten o'clock is the law. The law has gravy.) [waits, legal]",
          relationshipHint: "delighted",
          tags: ["quest:burek-fed", "relationship:warm"],
        },
        {
          id: "burek:renata:rep-3",
          text: "*circles her desk once* (The desk holds the treat tin and the good pens. The tin is mine. The pens are collateral.) [lays beneath, on duty]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:renata:rep-4",
          text: "*head on paws, eyes up* (She talks, I watch. Humans need an audience without advice. I am the audience that never interrupts. Rare. Valuable.) [one slow blink]",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:renata:rep-5",
          text: "*one glance at the chair, dismissal* (The chair holds her. The chair and I are COLLEAGUES. You do not poach a colleague's chair.) [takes the floor instead]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:renata:rep-6",
          text: "*stands, serious* (I would sit at the door. I would sit at the door for days. The door would understand.) [one solemn woof, case closed]",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:cables",
      label: "The cable nest",
      optionCandidates: [
        { id: "burek:cables:opt-1", topicId: "burek:cables", text: "Burek, you sleep in Marek's cable basket." },
        { id: "burek:cables:opt-2", topicId: "burek:cables", text: "Why the cables and not the beds?" },
        { id: "burek:cables:opt-3", topicId: "burek:cables", text: "The cables are warm. Explain the physics." },
        { id: "burek:cables:opt-4", topicId: "burek:cables", text: "Marek untangled you twice this week. Gratitude?" },
        { id: "burek:cables:opt-5", topicId: "burek:cables", text: "The blue cable is missing. Confess." },
        { id: "burek:cables:opt-6", topicId: "burek:cables", text: "Is the cable nest your second office?" },
      ],
      replyCandidates: [
        {
          id: "burek:cables:rep-1",
          text: "*emerges, unbothered* (The basket is warm, the cables are company, and the basket was NOT labeled. Unlabeled is finders-keepers.) [resettles, legal]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:cables:rep-2",
          text: "*one dismissive ear* (The beds are for SLEEPING. The cables are for THINKING. Different departments. Respect the org chart.) [one paw over nose]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:cables:rep-3",
          text: "*the professorial blink* (Electricity is warm. Warm rises. The basket catches it. I catch the basket. Physics is a ladder and I am the top.) [smug, warm]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:cables:rep-4",
          text: "*the slow, grateful wag* (Gratitude is documented: I have not sat on his keyboard since Tuesday. That is YEARS in dog. He knows.) [brings him the blue cable, suddenly]",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:cables:rep-5",
          text: "*stares directly into you* (Confession: the blue cable is under the CEO's desk with the toy. Assets rotate. The audit found nothing because I AM the audit.) [one innocent blink]",
          relationshipHint: "neutral",
          tags: ["quest:burek-person", "relationship:neutral"],
        },
        {
          id: "burek:cables:rep-6",
          text: "*one definitive woof* (The nest is the WAR ROOM. Strategy is drafted here, at nap rate, in a nest of warm wire. Every empire needs a modest headquarters.) [circles twice, adjourned]",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:rain",
      label: "The rain policy",
      optionCandidates: [
        { id: "burek:rain:opt-1", topicId: "burek:rain", text: "Burek, it is raining. The walk is compromised." },
        { id: "burek:rain:opt-2", topicId: "burek:rain", text: "You refuse the raincoat. Ideology?" },
        { id: "burek:rain:opt-3", topicId: "burek:rain", text: "Puddles: obstacle or opportunity?" },
        { id: "burek:rain:opt-4", topicId: "burek:rain", text: "The rain makes the office smell different. Notes?" },
        { id: "burek:rain:opt-5", topicId: "burek:rain", text: "Janusz laid the towels. Protocol?" },
        { id: "burek:rain:opt-6", topicId: "burek:rain", text: "Thunder last night. Your report." },
      ],
      replyCandidates: [
        {
          id: "burek:rain:rep-1",
          text: "*at the door, unbothered* (Rain is weather. Weather is not a manager. The walk happens. The pace is negotiable. The dignity is not.) [shakes once, preemptively]",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:rain:rep-2",
          text: "*turns from the coat* (The coat is a COSTUME. Costumes are for conferences. I am a working dog with waterproof heritage. The heritage is insulted.) [sits, firm]",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:rain:rep-3",
          text: "*the predator crouch* (Puddles are the floor becoming honest. One splash per puddle. Two for the deep ones. Science needs samples.) [waits at the door, vibrating]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:rain:rep-4",
          text: "*nose working, deeply* (Wet stone, cold metal, one pretzel from the courier, and the ghost of every dog before me. The rain is the library. I read.) [one long inhale]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:rain:rep-5",
          text: "*dries on towel two* (Towel one is for the paws. Towel two is for the drama. Janusz knows the difference. The man is fluent.) [rolls, thorough]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:rain:rep-6",
          text: "*under the desk, composed* (I stationed myself by Renata and monitored the building. The building held. I took credit.) [emerges, victorious]",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "burek:server-room",
      label: "The warm room",
      optionCandidates: [
        { id: "burek:server-room:opt-1", topicId: "burek:server-room", text: "Burek, you napped in the server room. Again?" },
        { id: "burek:server-room:opt-2", topicId: "burek:server-room", text: "Why the server room over the sun spot?" },
        { id: "burek:server-room:opt-3", topicId: "burek:server-room", text: "The hum of the servers. Opinion?" },
        { id: "burek:server-room:opt-4", topicId: "burek:server-room", text: "Marek found your fur on the rack. Comments?" },
        { id: "burek:server-room:opt-5", topicId: "burek:server-room", text: "Is the server room your second station?" },
        { id: "burek:server-room:opt-6", topicId: "burek:server-room", text: "The server room door was closed today. Feelings?" },
      ],
      replyCandidates: [
        {
          id: "burek:server-room:rep-1",
          text: "*the unrepentant stretch* (The room is thirty degrees of purpose. The nap was twenty minutes of infrastructure inspection. With eyes closed.) [exits, warm, justified]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:server-room:rep-2",
          text: "*one superior blink* (The sun moves. The servers are LOYAL. I do not chase warmth that leaves. I commit to warmth that stays.) [pads off, warm]",
          relationshipHint: "pleased",
          tags: ["quest:burek-person", "relationship:warm"],
        },
        {
          id: "burek:server-room:rep-3",
          text: "*deep ear relaxation* (The hum says all systems are fine. It is the building's heartbeat at a legal volume. Better than any toy.) [curls tighter, listening]",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:server-room:rep-4",
          text: "*grooms one paw, casually* (The fur was a GIFT. Marek's rack now has a guardian spirit. He knows. His uptime knows.) [one wag, spiritual]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:server-room:rep-5",
          text: "*sits at the door, formal* (Primary station: standup. Secondary: the warm room. The rotation keeps the audits fresh and the fur distributed.) [awaiting door]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:server-room:rep-6",
          text: "*one dramatic sigh at the threshold* (Closed doors are questions. I sat by it. I answered it with patience. The door opened. They always open.) [enters first, correct]",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:reflection",
      label: "The glass rival",
      optionCandidates: [
        { id: "burek:reflection:opt-1", topicId: "burek:reflection", text: "Burek, you barked at the glass wall. Why?" },
        { id: "burek:reflection:opt-2", topicId: "burek:reflection", text: "The other dog in the glass — identity unknown?" },
        { id: "burek:reflection:opt-3", topicId: "burek:reflection", text: "You bowed to your reflection. Ceremony?" },
        { id: "burek:reflection:opt-4", topicId: "burek:reflection", text: "Klaudia filmed you meeting yourself. Consent?" },
        { id: "burek:reflection:opt-5", topicId: "burek:reflection", text: "The reflection copies you perfectly. Rivalry?" },
        { id: "burek:reflection:opt-6", topicId: "burek:reflection", text: "Do you know it is you? Final answer." },
      ],
      replyCandidates: [
        {
          id: "burek:reflection:rep-1",
          text: "*one bark, historical* (The bark was for the dog of 2021, who barked first. We do not forget the FIRST BARK. We answer it forever.) [tail high, tradition kept]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:reflection:rep-2",
          text: "*the forensic stare* (Identity: unknown. Location: inside. Threat level: none. Shadow level: significant. I keep the file open.) [circles the glass, gathering data]",
          relationshipHint: "neutral",
        },
        {
          id: "burek:reflection:rep-3",
          text: "*holds the bow* (I honor any dog that bows back. Rare. Elegant. Possibly imaginary. Respect does not require existence.) [rises slowly, honored]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:reflection:rep-4",
          text: "*the dignified turn* (She filmed, I approved post-viewing — the angle was flattering, the dog was professional, the tail was legal. Rights waived.) [one gracious blink]",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:reflection:rep-5",
          text: "*slow head shake* (Rivals copy. The reflection IMPROVES — never blinks first, never misses a crumb. I do not compete with better. I mentor it.) [sits beside glass, mentoring]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:reflection:rep-6",
          text: "*long pause, then one woof* (Yes. But the answer is dull and the mystery is free entertainment. We keep the game. The game keeps the office sharp.) [wags, metronome of truth]",
          relationshipHint: "delighted",
          tags: ["relationship:warm", "quest:burek-person"],
        },
      ],
    },
    {
      id: "burek:janusz",
      label: "The janitor alliance",
      optionCandidates: [
        { id: "burek:janusz:opt-1", topicId: "burek:janusz", text: "Burek, Janusz slipped you bacon. Confirm?" },
        { id: "burek:janusz:opt-2", topicId: "burek:janusz", text: "You and Janusz walk the building at five. Report." },
        { id: "burek:janusz:opt-3", topicId: "burek:janusz", text: "Janusz talks to you about the building. You get it?" },
        { id: "burek:janusz:opt-4", topicId: "burek:janusz", text: "The alliance predates everyone here. Details." },
        { id: "burek:janusz:opt-5", topicId: "burek:janusz", text: "Janusz checks your water bowl first. Why him?" },
        { id: "burek:janusz:opt-6", topicId: "burek:janusz", text: "If Janusz retired, who gets the alliance?" },
      ],
      replyCandidates: [
        {
          id: "burek:janusz:rep-1",
          text: "*the bacon smile* (The record shows a maintenance inspection at 5:02 and a protein anomaly at 5:04. The anomaly was delicious. The record is sealed.) [licks chops, sealing]",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:janusz:rep-2",
          text: "*trots the route from memory* (Corridor, kitchen, radiator check, one stare at the drain. He sees the building. I see the building. We compare notes in silence.) [nods once, mutual]",
          relationshipHint: "pleased",
        },
        {
          id: "burek:janusz:rep-3",
          text: "*ears soft, fully present* (He speaks building and I speak building. The dialect is older than words. We have never needed a translator.) [leans against his leg]",
          relationshipHint: "delighted",
        },
        {
          id: "burek:janusz:rep-4",
          text: "*the historian's stare* (There was a flood, a mop, and a dog. The mop held the line. The dog held the mop's belief. Since then: treaty.) [one solemn wag]",
          relationshipHint: "neutral",
          tags: ["quest:burek-fed", "relationship:neutral"],
        },
        {
          id: "burek:janusz:rep-5",
          text: "*one respectful nod toward the closet* (He checks first because he checks EVERYTHING first. Order of operations is love, in maintenance. I am on the list. The list is the honor.) [sits, honored]",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:janusz:rep-6",
          text: "*long pause, the deep woof* (The alliance passes to whoever feeds the building at five. Renata knows the basics. Marek has the schedule. The bacon has no fixed heir. Democracy.) [eyes the kitchen, hopeful]",
          relationshipHint: "pleased",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "burek:task-toy-contract",
      title: "The toy contract",
      description: "Burek has dropped the squeaky server toy at your feet. In dog, this is a contract: you throw, he returns, the toy squeaks, the audit continues. There is no offboarding from being his person. HR has tried.",
      flagToSet: "burek-person",
      rewardHint: "+his person (permanent)",
    },
  ],
};

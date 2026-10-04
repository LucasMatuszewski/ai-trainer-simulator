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
    {
      id: "burek:postman",
      label: "The postman ledger",
      optionCandidates: [
        { id: "burek:postman:opt-1", topicId: "burek:postman", text: "Why do you hate the postman so much?" },
        { id: "burek:postman:opt-2", topicId: "burek:postman", text: "The postman brought treats last week." },
        { id: "burek:postman:opt-3", topicId: "burek:postman", text: "You barked at the postman's van from the window." },
        { id: "burek:postman:opt-4", topicId: "burek:postman", text: "Janusz says the postman fears you now." },
        { id: "burek:postman:opt-5", topicId: "burek:postman", text: "A new postman started today. Assessment?" },
        { id: "burek:postman:opt-6", topicId: "burek:postman", text: "Could you ever forgive the postman?" },
      ],
      replyCandidates: [
        {
          id: "burek:postman:rep-1",
          text: "*ears to full alert* (Hate is a human smallness. What I run is a border.) He arrives, he leaves evidence of passage, he departs UNPROCESSED. Every day the same. [low growl of unresolved procedure] No dog of honor allows an unlogged crossing. It is not personal. It is paperwork.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:postman:rep-2",
          text: "*tail betraying everything* (A treaty was attempted.) I accepted the treat. The border ACCEPTED NOTHING. [stern pose, tail still going] There are two ledgers now. His ledger has salami. Mine has integrity and drool. The audit is ongoing.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:postman:rep-3",
          text: "*one sharp bark at the memory* (From the window it is all THEORY.) A bark through glass is a legal opinion, not an enforcement. [paws the windowsill once] Still. Opinions stack. Somewhere in that van is a man who knows my reputation precedes the parcels.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:postman:rep-4",
          text: "*sits taller* (Good.) A feared dog is a functioning dog. Janusz understands the deep order: he holds the building, I hold the threshold, the postman holds the uncertainty between them. [slow nod] The system has three legs. It stands.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:postman:rep-5",
          text: "*investigative sniff of the air* (New. Young. Unsure.) The unsure ones overcompensate with speed. Speed is respect wearing panic. [one approving huff] Provisional clearance. He may approach the letterbox. The letterbox is a DEMILITORIZED zone. Everything else is mine.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:postman:rep-6",
          text: "*long blink* (Forgiveness is for creatures who can forget.) I forget nothing. I remember every van sound since 2021. [head on paws, eyes still open] But I could ACCEPT him. Acceptance looks like this: he passes, I observe, nobody escalates. It is called peace. It is exhausting. We are not there yet.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "burek:shoes",
      label: "The shoe readings",
      optionCandidates: [
        { id: "burek:shoes:opt-1", topicId: "burek:shoes", text: "Why do you sniff every guest's shoes?" },
        { id: "burek:shoes:opt-2", topicId: "burek:shoes", text: "You judged Marek's new boots harshly." },
        { id: "burek:shoes:opt-3", topicId: "burek:shoes", text: "What do shoes tell you about a person?" },
        { id: "burek:shoes:opt-4", topicId: "burek:shoes", text: "Someone stepped on your paw and apologized for an hour." },
        { id: "burek:shoes:opt-5", topicId: "burek:shoes", text: "Klaudia's shoes have no smell at all." },
        { id: "burek:shoes:opt-6", topicId: "burek:shoes", text: "Do you have a favorite pair in the office?" },
      ],
      replyCandidates: [
        {
          id: "burek:shoes:rep-1",
          text: "*methodical inhale, one shoe then the other* (Shoes are the CV of the day.) Where you went, what you stepped in, who you met. [settles back with verdict] A human tells me a story with their mouth. The shoes tell me the truth. I read both. Only one is required.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:shoes:rep-2",
          text: "*one dismissive sniff, walks away* (New boots, zero history, and a smell of SHOP.) A shoe should smell of roads. [glances back] Marek will break them in or the boots will break him. I have spoken. The floor has recorded it.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:shoes:rep-3",
          text: "*paw on the visitor's shoe, gently* (Everything.) Where they have been is who they are. The morning is in the soles. The stress is in the heel wear. [looks up, deeply wise] The human is the last three places they walked. Humans think they are more complicated. They are not.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:shoes:rep-4",
          text: "*accepts the apology belly rub with dignity* (The paw has forgiven. The ledger noted it anyway.) Humans apologize to the air and to me, and both recordings persist. [tail thumps twice, magnanimous] The air holds grudges longer than I do. I am the generous one. This is known.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:morning"],
        },
        {
          id: "burek:shoes:rep-5",
          text: "*suspicious triple-sniff* (No smell is a smell.) Clean shoes are a message and the message is WORK. [one slow blink] She walks for the camera, not the road. Respect. But the nose is unconvinced and the nose has seniority.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:shoes:rep-6",
          text: "*drifts toward Janusz's boots by the door* (These.) Twenty years of corridors, stairs, and soup. The whole building lives in that leather. [rests chin on one boot, eyes closing] Some dogs have a bed. I have an archive.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "burek:window",
      label: "The window watch",
      optionCandidates: [
        { id: "burek:window:opt-1", topicId: "burek:window", text: "What do you actually watch from the window?" },
        { id: "burek:window:opt-2", topicId: "burek:window", text: "You bark at nothing at 3pm sharp every day." },
        { id: "burek:window:opt-3", topicId: "burek:window", text: "Is the window better than the door for watching?" },
        { id: "burek:window:opt-4", topicId: "burek:window", text: "Renata put a cushion at your window spot." },
        { id: "burek:window:opt-5", topicId: "burek:window", text: "Something moved the curtain and you lost your mind." },
        { id: "burek:window:opt-6", topicId: "burek:window", text: "What happens on the street at night, from up here?" },
      ],
      replyCandidates: [
        {
          id: "burek:window:rep-1",
          text: "*nose pressed to glass, eyes tracking* (The street writes a serial.) The pigeon caucus. The courier ballet. One dog across the road with NO windows and my deepest sympathies. [ear flick] Humans watch screens. I watch the original feed. It buffers never.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:window:rep-2",
          text: "*single bark at the appointed hour* (Not nothing. THE THING.) Every day at three, the sun reaches the third floor ledge and a light appears where no light should be. [stares you in the eye] I have reported it for two years. Everyone laughs. The LIGHT continues. Who is laughing now. Still everyone. The injustice is daily.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:window:rep-3",
          text: "*stretches, considering* (Different branches of the service.) The window is intelligence. The door is enforcement. [one deliberate tail wag] A professional needs both. The window tells me what is coming. The door tells it where it stands. Neither apologizes. The building sleeps well.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:window:rep-4",
          text: "*circles the cushion twice, lies down with ceremony* (She understands the WATCH needs comfort.) Cold paws make for sloppy intelligence. [deep sigh onto cushion] Renata furnishes the security state. The security state provides damp nose art on the glass. Everybody contributes.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:window:rep-5",
          text: "*three alarmed circles, then the bark of generations* (THE CURTAIN MOVED WITH NO HAND VISIBLE.) Wind, they say. DRAFT, they say. [stands guard at the window still] I say the glass level has an occupant and I have logged it. The others may mock. The others also lock the office at night. Think about who protects whom.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:window:rep-6",
          text: "*calm supervision from the cushion* (The night street is honest.) No meetings. No queues. Just the sweeping man and one cat with an agenda. [slow blink toward the dark glass] It is the same street as the day, minus the pretending. My favorite shift. Do not tell the day shift.",
          relationshipHint: "pleased",
          tags: ["period:evening"],
        },
      ],
    },
    {
      id: "burek:puddles",
      label: "The puddle audits",
      optionCandidates: [
        { id: "burek:puddles:opt-1", topicId: "burek:puddles", text: "You inspected every puddle on the walk." },
        { id: "burek:puddles:opt-2", topicId: "burek:puddles", text: "You avoided the big puddle completely. Why?" },
        { id: "burek:puddles:opt-3", topicId: "burek:puddles", text: "You walked straight through the shallow one with joy." },
        { id: "burek:puddles:opt-4", topicId: "burek:puddles", text: "Renata dried your paws and you allowed it." },
        { id: "burek:puddles:opt-5", topicId: "burek:puddles", text: "A puddle reflected the sky and you barked at it." },
        { id: "burek:puddles:opt-6", topicId: "burek:puddles", text: "Do puddles mean the walk is better?" },
      ],
      replyCandidates: [
        {
          id: "burek:puddles:rep-1",
          text: "*sniff, sniff, sanctioned sip of the fourth* (An audit is a duty.) Rain collects the news of the whole street in one place. [satisfied snort] Humans see water. I see yesterday's neighborhood, concentrated. Two of the puddles had gossip. One had a prawn. The street is a mystery and I am its reader.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:puddles:rep-2",
          text: "*wide, dignified arc around the puddle* (Some waters are not for dogs.) That one sits under the pipe that growls. Everything near it tastes of decisions made above my pay grade. [shakes once, preemptively] Wisdom is knowing which puddles report to whom. I know. The walk continued. Clean.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:puddles:rep-3",
          text: "*demonstrates the joyful splash, twice* (The shallow ones are FOR this.) Warm day, thin water, one clean line of splashes. [soaked and radiant] A dog who cannot splash in the small puddle does not deserve the big ones. This is philosophy. It is also Tuesday. Same thing, wet.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:puddles:rep-4",
          text: "*paws lifted one by one into the towel, serene* (She dries between the toes. Nobody does it right but she does it right.) The towel smells of the office and the candy bowl. [lean of total trust] A wet dog permits one human this honor per puddle. She has never once exceeded the quota.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:puddles:rep-5",
          text: "*bark at the puddle, then an apologetic tail wag* (The sky was IN the puddle and it did not announce itself.) A whole sky, lying flat, pretending to be ground. [sits beside the puddle, watching it] The reflection has since apologized by existing beautifully. We understand each other. The sky does this. Dogs allow it.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:puddles:rep-6",
          text: "*instant tail rotation at the word* (Better is a human word.) Puddles make the walk TRUE — every smell doubled, every route new. [looks toward the door, then at you, negotiating] Rain is the street renewing itself. I am merely the first critic. Coat optional. Enthusiasm standard.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:crumbs",
      label: "The crumb forensics",
      optionCandidates: [
        { id: "burek:crumbs:opt-1", topicId: "burek:crumbs", text: "How do you find crumbs under every desk?" },
        { id: "burek:crumbs:opt-2", topicId: "burek:crumbs", text: "You rated Przemek's desk crumbs best in office." },
        { id: "burek:crumbs:opt-3", topicId: "burek:crumbs", text: "Grazyna's desk has never once had crumbs." },
        { id: "burek:crumbs:opt-4", topicId: "burek:crumbs", text: "The crumb sweep slowed your lap time." },
        { id: "burek:crumbs:opt-5", topicId: "burek:crumbs", text: "Someone vacuumed before you finished. Betrayal?" },
        { id: "burek:crumbs:opt-6", topicId: "burek:crumbs", text: "What is the greatest crumb in office history?" },
      ],
      replyCandidates: [
        {
          id: "burek:crumbs:rep-1",
          text: "*nose to the floor, methodical grid pattern* (The floor speaks to those who kneel.) Desks drop. Carpets keep. I collect. [surfaces with dignity and one crumb] Humans call it foraging. I call it reading the office's diary, one paragraph at a time, then eating the paragraph.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:crumbs:rep-2",
          text: "*tail metronome at maximum* (His desk drops like a festival.) Pastry density, cheese coverage, one legendary pretzel shard. [points at the desk with his whole snout] Other desks have crumbs. That desk has CUISINE. The five-second rule is a suggestion there. I take four.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:crumbs:rep-3",
          text: "*one reverent pass of her desk, finding nothing* (Clean. Always clean. It is not natural.) I have sniffed that desk every visit for three years. [sits before it like a monument] Some desks are for eating. Hers is for LEDGERS. I respect it the way you respect a lake with no fish. From a distance. With suspicion.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:crumbs:rep-4",
          text: "*unhurried stance, zero regret* (Laps are for patrol. Patrol is for crumbs.) The two duties share a road. [one slow stretch] Speed is how you miss the pretzel shard of March. I did not miss the pretzel shard of March. The lap time is a small price for history.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:crumbs:rep-5",
          text: "*stares at the vacuum in the closet, unblinking* (Half a grid. HALF.) I was two desks from the cookie zone. [dramatic collapse onto side] The machine ate a week of intelligence. I will finish the survey tomorrow, because the floor regrows crumbs daily. But the MACHINE and I are in negotiations. The negotiations have fur.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:crumbs:rep-6",
          text: "*reverent pause at the memory* (The sausage of the signing.) A client toured the office, dropped a full sausage by the good meeting room, and NOBODY SAW. [eyes shine] I did not eat it. I stood over it and BARKED, once, so the office would witness. Then jurisdiction transferred to me. Lawfully. It was a ceremony. I think of it often.",
          relationshipHint: "delighted",
        },
      ],
    },
    {
      id: "burek:night-patrol",
      label: "The night patrol",
      optionCandidates: [
        { id: "burek:night-patrol:opt-1", topicId: "burek:night-patrol", text: "Do you patrol at night when nobody is here?" },
        { id: "burek:night-patrol:opt-2", topicId: "burek:night-patrol", text: "You patrol WITH Janusz on his late nights?" },
        { id: "burek:night-patrol:opt-3", topicId: "burek:night-patrol", text: "What is the patrol route, exactly?" },
        { id: "burek:night-patrol:opt-4", topicId: "burek:night-patrol", text: "You found Marek asleep at his desk at midnight." },
        { id: "burek:night-patrol:opt-5", topicId: "burek:night-patrol", text: "A moth got into the server room. Your report?" },
        { id: "burek:night-patrol:opt-6", topicId: "burek:night-patrol", text: "Is the office different at night for a dog?" },
      ],
      replyCandidates: [
        {
          id: "burek:night-patrol:rep-1",
          text: "*rises, stretches, business posture* (When duty calls. Duty calls nightly.) The building changes its smell after dark and the dark smells need walking. [one soft woof] Doors settled. Cables rested. The kitchen keeps secrets at night. I audit all of it so the morning gets a clean report.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:night-patrol:rep-2",
          text: "*sits beside Janusz's ghost of a smile* (The best shift.) Janusz walks, I sweep the sides, nobody speaks, everything gets checked twice by two different faiths. [shoulder press against Janusz's leg] He holds the mop. I hold the night. The building has never been in safer hands, and none of them are human.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:night-patrol:rep-3",
          text: "*traces the route with a paw on the floor* (Kitchen. Corridor. Glass wall. Server room door. Training room. Kitchen again, for verification.) The kitchen is checked twice because the kitchen cannot be trusted. [firm nod] The route is not written down. The route is carried. That is why it has never leaked.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:night-patrol:rep-4",
          text: "*stands over Marek's sleeping form, on duty* (Found. Guarded. Judged.) He was mid-slide in his sleep, hands still on keys. [one blanket retrieved, origin unclear] I stayed until 2am. Not for him. For the CODE. The code needs a witness. I billed him in dreams.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:night-patrol:rep-5",
          text: "*huffs with residual professional outrage* (ONE moth. INSIDE THE HOLY ROOM.) I cannot open doors, which the moth KNEW. [dignified sit] I barked the alarm. Marek materialized with a cup and paper. The moth was escorted out alive, which I disputed, and was overruled. The report is filed. The moth knows what it did.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:night-patrol:rep-6",
          text: "*ears rotating slowly, taking the night census* (Louder.) The pipes speak. The floors tick as they cool, like the building is writing. [head tilts at a distant hum] Humans think night is empty. The night is FULL. It is just full of things that do not need meetings. My kind of colleagues.",
          relationshipHint: "pleased",
          tags: ["period:evening"],
        },
      ],
    },
    {
      id: "burek:squirrel",
      label: "The squirrel file",
      optionCandidates: [
        { id: "burek:squirrel:opt-1", topicId: "burek:squirrel", text: "THE squirrel. Is it still around?" },
        { id: "burek:squirrel:opt-2", topicId: "burek:squirrel", text: "You met the squirrel face to face once." },
        { id: "burek:squirrel:opt-3", topicId: "burek:squirrel", text: "Klaudia filmed your squirrel standoff." },
        { id: "burek:squirrel:opt-4", topicId: "burek:squirrel", text: "Janusz feeds it. JANUSZ. FEEDS IT." },
        { id: "burek:squirrel:opt-5", topicId: "burek:squirrel", text: "Do other dogs have squirrels too?" },
        { id: "burek:squirrel:opt-6", topicId: "burek:squirrel", text: "What is the endgame with the squirrel?" },
      ],
      replyCandidates: [
        {
          id: "burek:squirrel:rep-1",
          text: "*every hair at attention* (It lives. It taunts. It FLICKS.) Three years of the same tree, the same ledge, the same flick. [low rumble] This is not a feud. Feuds end. This is an APPOINTMENT. Daily. The tree knows. I know. The squirrel files its flick and waits.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:squirrel:rep-2",
          text: "*goes very still at the memory* (Ground level. Three meters. HISTORY.) We looked at each other and time stopped filing. It held a nut. It ATE the nut slowly, with eye contact. [one slow breath] Then it left along the fence, unhurried, like the fence was ITS idea. I have trained for everything except being ignored.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:squirrel:rep-3",
          text: "*strikes the exact standoff pose on command* (The video has numbers. The MOMENT had truth.) Me, the tree, the flick, forty seconds of armed diplomacy. [relaxes by ten percent] She added music and text. The text said 'unresolved'. ACCURATE. It remains unresolved. The video is a documentary, not content. There is a difference and historians will find it.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:squirrel:rep-4",
          text: "*the betrayal is total and ancient* (He leaves WALNUTS. By THE TREE.) The enemy is provisioned by my OWN ALLY. [dramatic collapse, one eye open] I have raised the issue at every patrol. He says the word 'balance'. BALANCE, he says, feeding the flick. The walnut thing and I have words. The words are barks. The barks have policy goals.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:squirrel:rep-5",
          text: "*dignified nod* (Every dog has a flick of their own.) The golden one across town has a pigeon parliament. The dachshund by the bakery wars with a delivery robot. [proud sit] Mine is original, arboreal, and PSYCHOLOGICAL. I would not trade. A squirrel is not an enemy. A squirrel is a curriculum.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:squirrel:rep-6",
          text: "*long look out the window* (There is no endgame. That is the wisdom I fought against for years.) One day it will not come. I will wait at the tree anyway, once, then twice, and then I will patrol past it. [quiet] The squirrel taught me time. It does not know it taught me time. That is the deepest thing any enemy has given me. Also it flicks. THE FLICK CONTINUES.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "burek:elevator",
      label: "The elevator rides",
      optionCandidates: [
        { id: "burek:elevator:opt-1", topicId: "burek:elevator", text: "Does the elevator scare you at all?" },
        { id: "burek:elevator:opt-2", topicId: "burek:elevator", text: "You have a spot in the elevator. The corner." },
        { id: "burek:elevator:opt-3", topicId: "burek:elevator", text: "A stranger shared the elevator and you judged him." },
        { id: "burek:elevator:opt-4", topicId: "burek:elevator", text: "Renata lets you ride alone down to reception." },
        { id: "burek:elevator:opt-5", topicId: "burek:elevator", text: "The elevator got stuck once. Your account?" },
        { id: "burek:elevator:opt-6", topicId: "burek:elevator", text: "Stairs or elevator, final answer?" },
      ],
      replyCandidates: [
        {
          id: "burek:elevator:rep-1",
          text: "*sits, utterly composed* (The box moves and I permit it.) Fear is for things that hide their mechanics. The elevator shows its cable. It hums its effort. [approving ear tilt] An honest machine deserves a calm dog. We have an understanding, the box and I. It does not drop me. I do not bark at its soul.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:elevator:rep-2",
          text: "*assumes the corner without looking* (The corner sees every face and both doors.) A dog who watches the crowd misses the door. A dog who watches the door misses the crowd. [settles with a sigh] I take the corner and provide the ERA. Everyone relaxes. This is the actual function of dogs and nobody writes it down.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:elevator:rep-3",
          text: "*one slow head-to-toe assessment, then a look away* (Umbrella indoors. Wet umbrella, DRY AND STILL OPEN.) The box was small. The umbrella had opinions. [sniffs the memory off his nose] I said nothing. I have never said anything. Judgment travels perfectly well in silence, floor by floor.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:elevator:rep-4",
          text: "*tail wag of pure ceremony* (She presses the button. I press my luck.) The doors close on her smile and open on the desk, the candy bowl, the whole warm kingdom. [does one circle of joy at the memory] Riding alone is trust with a button. She would never say it. The button says it for her.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:elevator:rep-5",
          text: "*replays it with a stoic face* (Fourteen minutes between floors.) A human paced. A human phoned. I lay across the door seam and held BOTH floors together with my body. [one proud ear] When it opened, everyone applauded and I accepted a sandwich from a stranger, because heroes are paid in sandwiches. The box and I are closer now. It held. I held. Neither of us mentions it.",
          relationshipHint: "delighted",
        },
        {
          id: "burek:elevator:rep-6",
          text: "*glances at the stairwell, then the elevator, then you* (Depends on the mission.) Patrols take the stairs — the smells are news. Visits take the box — the office is the news. [tail sweeps once] A dog of range needs both. Ask me again on a rainy day. The answer will have a puddle in it.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "burek:car-rides",
      label: "The car rides",
      optionCandidates: [
        { id: "burek:car-rides:opt-1", topicId: "burek:car-rides", text: "You love the car. What is the appeal?" },
        { id: "burek:car-rides:opt-2", topicId: "burek:car-rides", text: "Head out the window or nose on the console?" },
        { id: "burek:car-rides:opt-3", topicId: "burek:car-rides", text: "You knew it was the vet from the third turn." },
        { id: "burek:car-rides:opt-4", topicId: "burek:car-rides", text: "Janusz's van smells like the whole world." },
        { id: "burek:car-rides:opt-5", topicId: "burek:car-rides", text: "You refused to exit at the office once." },
        { id: "burek:car-rides:opt-6", topicId: "burek:car-rides", text: "Where would you go if the ride never ended?" },
      ],
      replyCandidates: [
        {
          id: "burek:car-rides:rep-1",
          text: "*vibrates at the jingle of keys* (The car is the smell engine.) The world at walking speed is one street. The world at car speed is EVERY STREET. [spins once, dignified] In one ride I have smelled the river, the bakery, three dogs, and a fish market. Humans commute. I TOUR.",
          relationshipHint: "delighted",
        },
        {
          id: "burek:car-rides:rep-2",
          text: "*demonstrates the head-out posture, eyes closed* (Head out. Obviously. But in traffic, console.) The wind is the news reading itself aloud. [one happy snort] The console nose is for reading between headlines — the slow smells, the important ones. A professional alternates. All joy, some discipline. That is the whole dog.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:car-rides:rep-3",
          text: "*narrowed eyes at the memory* (Left at the pharmacy means TOWELS. Left at the pharmacy then right at the bakery means VET.) I sat down in the footwell and became forty kilograms of NO. [chin high] They took me for ice cream instead. The ice cream was a bribe. I ate the bribe. The trip happened anyway. But the SYSTEM WORKS and they know I know.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:car-rides:rep-4",
          text: "*nose working the memory of the van* (Paint. Pipe glue. Rain on old metal. Soup. HIS soup.) That van is a library and every ride is a new shelf. [deep inhale of pure nostalgia] I ride with my head between the seats, reading. He drives. Neither of us needs the radio. The van IS the radio.",
          relationshipHint: "pleased",
          tags: ["relationship:warm", "period:afternoon"],
        },
        {
          id: "burek:car-rides:rep-5",
          text: "*lies down heavier in the seat of the memory* (The ride was ending and I voted NO.) Full weight. Locked paws. The democracy of a dog in a seat. [one shameless blink] They carried me out. I wagged the whole way, because the refusal was POLICY, not sadness. The policy remains on the books. It is invoked rarely. It is never forgotten.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:car-rides:rep-6",
          text: "*looks into the middle distance, ears soft* (Nowhere. Everywhere. The BETWEEN.) The perfect ride is not a destination, it is the window line — the fields, the fences, the smell of the next town arriving. [sighs, utterly content] If the ride never ended I would finally read the WHOLE world. But then who would guard the kitchen. The kitchen needs me. The ride knows this.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "burek:camera",
      label: "The door camera",
      optionCandidates: [
        { id: "burek:camera:opt-1", topicId: "burek:camera", text: "How do you feel about the new door camera?" },
        { id: "burek:camera:opt-2", topicId: "burek:camera", text: "You bark at the camera but not the doorbell." },
        { id: "burek:camera:opt-3", topicId: "burek:camera", text: "Marek checked the footage and you were on it all day." },
        { id: "burek:camera:opt-4", topicId: "burek:camera", text: "Klaudia wants the camera feed on her channel." },
        { id: "burek:camera:opt-5", topicId: "burek:camera", text: "The camera has a speaker. It talked to you." },
        { id: "burek:camera:opt-6", topicId: "burek:camera", text: "Is the camera a colleague or a rival?" },
      ],
      replyCandidates: [
        {
          id: "burek:camera:rep-1",
          text: "*stares down the small lens like it owes him money* (A second eye that never blinks and never WALKS THE GROUND.) Surveillance without paws. [one skeptical ear] It sees the courier. It does not SMELL the courier. It is half a guard and I am the other half. The office is now guarded by one whole thing made of two rivals. It is efficient and I hate it professionally.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:camera:rep-2",
          text: "*huffs at the distinction* (The bell LIES. It says someone is here. The camera knows WHO.) The bell is a rumor with a string. The camera is a witness. [sits with legal gravity] I bark at the witness to keep the record honest. The bell and I settled years ago. The bell files nothing. The bell is above all this.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:camera:rep-3",
          text: "*concerned tail stillness* (All day? Including the 2pm NAP by the glass?) Marek now possesses the archive of my unguarded hours. [walks to the camera, sits beneath it, staring up] There is no privacy clause in the office charter. I have checked with my whole body. The lens sees everything and understands nothing. This is the human condition and now it is MINE.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:camera:rep-4",
          text: "*strikes a profile pose by the door* (The feed is ninety percent my good side and ten percent COURIERS FLEEING.) If it helps the channel, it helps the office. [one camera-ready head tilt] She asked permission. I gave it in the language of sitting closer to the lens. The ring light is now my co-star. The squirrel remains my villain arc. Every channel needs both.",
          relationshipHint: "delighted",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:camera:rep-5",
          text: "*backs up one step, hackles at half-mast* (The box SPOKE. It said 'moving on'.) A voice from an eye with no mouth. [approaches, sniffs the speaker hole, accepts nothing] I have decided it is a ghost of a walkie-talkie. Ghosts get one warning. It got its warning. It has not spoken since. The power structure is understood.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:camera:rep-6",
          text: "*sits exactly between the camera and the door, facing both* (Neither. I am the ORIGINAL.) The eye sees the yard. The paws read the yard. [tail makes one slow, definitive sweep] A rival shares your work. A colleague shares your shift. The box and I share a DOOR. That is all. The door is big enough. The night is long enough. We work it together, badly, each in our own language.",
          relationshipHint: "neutral",
        },
      ],
    },
    {
      id: "burek:thunder",
      label: "The thunder protocol",
      optionCandidates: [
        { id: "burek:thunder:opt-1", topicId: "burek:thunder", text: "Does thunder bother you, big guy?" },
        { id: "burek:thunder:opt-2", topicId: "burek:thunder", text: "You hid behind Janusz's mop bucket once." },
        { id: "burek:thunder:opt-3", topicId: "burek:thunder", text: "Renata's thunder playlist actually helps?" },
        { id: "burek:thunder:opt-4", topicId: "burek:thunder", text: "Marek's server room is your storm bunker." },
        { id: "burek:thunder:opt-5", topicId: "burek:thunder", text: "A storm hit during office hours and you guarded anyway." },
        { id: "burek:thunder:opt-6", topicId: "burek:thunder", text: "Do you feel better when the office fills up during a storm?" },
      ],
      replyCandidates: [
        {
          id: "burek:thunder:rep-1",
          text: "*sits very still, one ear flat* (The sky should not have OPINIONS.) Rain is fine. Rain is honest. But the boom is the sky hitting the sky and nobody down here was consulted. [deep, controlled breath] I do not fear it. I FILE it. Loudly. Under complaints. The complaint has volume and the volume has me.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:thunder:rep-2",
          text: "*gives you a long look of negotiated dignity* (That did not happen. And if it did, the bucket was STRATEGIC.) Metal walls, familiar smell, one handle for gripping with teeth should the sky attack. [sniffs, dignified] Janusz found me. Janusz told no one. Janusz left a towel. THAT is the story. The story is better than the bucket.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:thunder:rep-3",
          text: "*ear unflattens by degrees at the memory* (She plays RAIN SOUNDS during actual rain. It is either genius or madness and it WORKS.) The fake rain argues with the real thunder. Two waters in one room. [tilts head] The sky gets confused about whether it has already happened and softens. Dog science. Peer reviewed by me. Replicable.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:thunder:rep-4",
          text: "*traces his escape route with a paw* (The bunker hums. The hum is louder than the boom and it is OUR hum.) Marek pretends not to leave the door open. The door is 'broken'. The door has been broken for two years, always on storm days. [leans into the memory] Machines and dogs and one broken door. The office has a heart and it is padded.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:thunder:rep-5",
          text: "*stands taller at the memory, slight tremble hidden* (The boom hit and the humans went to the windows and I went to the DOOR.) Guard first, shake after. That is the doctrine. [one dignified breath] My legs had opinions. My post had precedence. The office stayed safe and I received the entire cheese supply. Doctrine has benefits.",
          relationshipHint: "delighted",
        },
        {
          id: "burek:thunder:rep-6",
          text: "*tail makes one honest, low wag* (Yes. And I will never say it in front of the cat.) Alone, thunder is the sky's business. With the office full, thunder is WEATHER, and weather is handled — humans murmur, the kettle sings, someone drops a crisp. [settles against your leg, storm or no storm] The boom is smaller in a full room. So is everything.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
      ],
    },
    {
      id: "burek:nap-map",
      label: "The nap cartography",
      optionCandidates: [
        { id: "burek:nap-map:opt-1", topicId: "burek:nap-map", text: "How many nap spots do you have?" },
        { id: "burek:nap-map:opt-2", topicId: "burek:nap-map", text: "The sun patch moves across the office all day." },
        { id: "burek:nap-map:opt-3", topicId: "burek:nap-map", text: "Tomek's beanbag is number one, apparently." },
        { id: "burek:nap-map:opt-4", topicId: "burek:nap-map", text: "You nap on Marek's spare chair like it is yours." },
        { id: "burek:nap-map:opt-5", topicId: "burek:nap-map", text: "Renata ranks your nap spots in a notebook." },
        { id: "burek:nap-map:opt-6", topicId: "burek:nap-map", text: "What makes a nap spot great, scientifically?" },
      ],
      replyCandidates: [
        {
          id: "burek:nap-map:rep-1",
          text: "*counts on one paw, then gives up with grace* (Eleven primary. Seven alternate. Two emergency.) Each spot has a shift. Morning belongs to the glass wall. Noon to the sun line. Night to the server room hum. [yawns with administrative calm] Humans have desks. I have a TIMETABLE. Mine is better. Mine ends in naps.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:nap-map:rep-2",
          text: "*follows the sun patch across the floor with his eyes* (The sun is the only manager I obey.) Morning it warms the reception tiles. By three it reaches the good rug. [repositions one meter with total authority] I do not chase the sun. I ANTICIPATE it. The spot ahead of the sun is the spot of kings. I am always lying in ten minutes from now.",
          relationshipHint: "delighted",
        },
        {
          id: "burek:nap-map:rep-3",
          text: "*claims the beanbag with one measured look* (It holds the shape of greatness now. MY shape.) Tomek naps like a crane collapse. I nap like a sand tide. [one luxurious roll] The beanbag remembers both of us and prefers the tide. He knows. He takes the beanbag anyway. Rivalry keeps the nap honest.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:nap-map:rep-4",
          text: "*assumes the chair with property-law confidence* (The chair faces the door AND the corridor. It is not a chair. It is a WATCHTOWER with cushioning.) Marek sits there at 9. I sit there at 11. We have never spoken of it. [one slow blink] Some arrangements predate language. The chair knows. The chair serves both masters and tells neither.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:nap-map:rep-5",
          text: "*polite tail thump of full transparency* (She ranks them. I have READ the notebook while she held it.) Number one: 'sun rug, afternoon, classic'. Number two: 'Marek's chair, bold'. Number nine says 'under Przemek's desk, loud but fragrant'. [tips head in respect] The notebook is accurate. I have never been so deeply understood by paper.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:nap-map:rep-6",
          text: "*lies down as a demonstration* (Three factors. Warmth under, sightline out, and the smell of the household.) A spot without warmth is a floor. A spot without a sightline is a trap. A spot without the right smell is just furniture. [eyes closing with total professional trust] All three, and a dog can defend the premises from inside a dream. That is the science.",
          relationshipHint: "pleased",
        },
      ],
    },
    {
      id: "burek:hot-days",
      label: "The hot day doctrine",
      optionCandidates: [
        { id: "burek:hot-days:opt-1", topicId: "burek:hot-days", text: "How do you handle the hot days?" },
        { id: "burek:hot-days:opt-2", topicId: "burek:hot-days", text: "The tiles by reception are the coolest spot." },
        { id: "burek:hot-days:opt-3", topicId: "burek:hot-days", text: "You refused the midday walk entirely yesterday." },
        { id: "burek:hot-days:opt-4", topicId: "burek:hot-days", text: "Janusz put a fan at your level. Dignity intact?" },
        { id: "burek:hot-days:opt-5", topicId: "burek:hot-days", text: "The ice cubes in your bowl became a whole event." },
        { id: "burek:hot-days:opt-6", topicId: "burek:hot-days", text: "What does the office look like from a hot-day nap?" },
      ],
      replyCandidates: [
        {
          id: "burek:hot-days:rep-1",
          text: "*flops with strategic full-body commitment* (By becoming liquid.) The walk moves to dawn. The patrol moves to dusk. The middle of the day belongs to the floor and the floor belongs to me. [one ear tracks a fly, lazily] Heat is not an enemy. Heat is a schedule change. I have schedules for every weather. This one is my favorite and my least dignified.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:hot-days:rep-2",
          text: "*sprawls across the reception tiles in exhibit form* (Stone remembers the night. The night was cool. I lie on the past.) Humans walk around me in a wide arc, refreshed by the sight. [paws twitch in a dream of somewhere colder] I am not an obstacle. I am AMENITY. The tile is the only honest air conditioning in this building and I am its operator.",
          relationshipHint: "delighted",
        },
        {
          id: "burek:hot-days:rep-3",
          text: "*sits down as a legal document* (The pavement was COOKING. I put my paw down. Literally. Then the other three.) A walk at two in a heat wave is not exercise, it is TOAST. [nods toward the door] We went at seven instead, when the street belonged to the sprinklers. The street was BETTER. Renata called it wisdom. It was PAW MANAGEMENT. Same thing, wetter.",
          relationshipHint: "pleased",
        },
        {
          id: "burek:hot-days:rep-4",
          text: "*lies with his face in the fan's breeze, eyes half closed* (Dignity left at the first gust. It will return in October.) A fan at dog level is civilization's whole argument. [one blissful groan] Janusz adjusted the angle twice, silently, to follow my nap migrations. He thinks I did not notice. I notice EVERYTHING. Especially the breeze. Especially now.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:hot-days:rep-5",
          text: "*gazes into the bowl of the memory* (The cubes CLINK. The water goes ARCTIC. The humans bet on which paw I use.) Left paw. It is always the left paw. [one victorious drip from the chin] They filmed it. The office has a tradition now. Traditions that involve my tongue are the best traditions and I will hear no arguments from the cat.",
          relationshipHint: "delighted",
        },
        {
          id: "burek:hot-days:rep-6",
          text: "*surveys the room from floor level, one eye open* (Slower. Softer. Humans in shirt sleeves, moving like the air is honey.) From down here on a hot day, the office is a warm sea and I am its floor current. [tail sweeps once through the imaginary water] Everyone forgives everyone on hot days. Deadlines swim past. The whole building is one long exhale.",
          relationshipHint: "pleased",
          tags: ["period:afternoon"],
        },
      ],
    },
    {
      id: "burek:new-humans",
      label: "The new-humans vetting",
      optionCandidates: [
        { id: "burek:new-humans:opt-1", topicId: "burek:new-humans", text: "How do you decide about new people?" },
        { id: "burek:new-humans:opt-2", topicId: "burek:new-humans", text: "You approved Pawel in one day. Fast track?" },
        { id: "burek:new-humans:opt-3", topicId: "burek:new-humans", text: "You avoided one visitor for a month. Reason?" },
        { id: "burek:new-humans:opt-4", topicId: "burek:new-humans", text: "The intern offered you their sandwich immediately." },
        { id: "burek:new-humans:opt-5", topicId: "burek:new-humans", text: "Kasia asks your opinion on candidates now?" },
        { id: "burek:new-humans:opt-6", topicId: "burek:new-humans", text: "What is the highest honor you can give a human?" },
      ],
      replyCandidates: [
        {
          id: "burek:new-humans:rep-1",
          text: "*circles the new human once, professionally* (Three readings. The shoes, the hands, the WAITING.) Anyone can pet a dog. The worth is in whether they wait to be asked. [sits at a precise distance, observing] Hands tell me the last hour. The waiting tells me the whole life. Most humans fail at the waiting. The good ones fail better each day.",
          relationshipHint: "neutral",
        },
        {
          id: "burek:new-humans:rep-2",
          text: "*wags at the very name* (He SAT on the floor on day one. On the FLOOR. At my level.) No fear, no fuss, one offered palm held LOW and STILL. [affectionate shoulder lean into the memory] Textbook. The textbook was written by me. He passed in one day because he had done the homework in some other life. The good ones arrive pre-enrolled.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:new-humans:rep-3",
          text: "*deliberately looks elsewhere at the memory* (The hands were wrong. Loud hands, fast hands, hands that grab the TOP of the head without introduction.) Nothing happened. Nothing was GOING to happen. [dignified distance maintained even in memory] My avoidance was the message. The message was received by everyone except the addressee. This is standard. The month expired.",
          relationshipHint: "annoyed",
        },
        {
          id: "burek:new-humans:rep-4",
          text: "*accepts the theoretical sandwich with grave honor* (Offered BEFORE being asked for. THAT is the old magic.) Most humans feed dogs to purchase the wag. That intern paid upfront, unprompted, half a sandwich with the CRUST ON. [deep, ceremonial sniff of the moment] The sandwich was average. The instinct was magnificent. Employment confirmed by lunch.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
        },
        {
          id: "burek:new-humans:rep-5",
          text: "*straightens with corporate pride* (She brings the nervous ones to meet me. Burek does the final interview, she tells them.) It is true and I take it seriously. [one slow, evaluative blink toward the interview room] A candidate who fears me honestly is honest. A candidate who over-performs for me performs everywhere, which is also data. I have vetoed one hire in three years.",
          relationshipHint: "pleased",
          tags: ["relationship:neutral"],
        },
        {
          id: "burek:new-humans:rep-6",
          text: "*places his head, very slowly, on the human's knee* (The weight.) Not the trick. Not the treat. THE WEIGHT. [eyes half closing] A dog's head is his whole trust, balanced on your knee, and the human must hold still and hold it. Some humans never get the weight. Some get it on day one. The knee knows. I know. The office pretends it is a dog being a dog.",
          relationshipHint: "delighted",
          tags: ["relationship:warm"],
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

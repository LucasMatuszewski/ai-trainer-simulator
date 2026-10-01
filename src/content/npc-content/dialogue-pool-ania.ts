/**
 * WS5 dialogue v2 pool — Ania, Marketing & Synergy (C-77).
 *
 * Pure authored data. Topics: the 'AI: Friend or Frenemy?' webinar, your
 * personal brand (a persona is a tire and tires rotate), and the growth
 * campaign. Task offer: the webinar goes live (sets the existing
 * `ania-webinar-volunteered` flag — two hundred tickets are already sold,
 * so it is canon). Tone matches her legacy trees: boundaries, love that
 * for you; the crying is the hook; the robot is doing the handshake.
 */

import type { NpcDialoguePool } from "../dialogue-schema";

export const ANIA_DIALOGUE_POOL: NpcDialoguePool = {
  npcId: "ania",
  topics: [
    {
      id: "ania:webinar",
      label: "Friend or Frenemy logistics",
      optionCandidates: [
        {
          id: "ania:webinar:opt-1",
          topicId: "ania:webinar",
          text: "The webinar is Thursday. What is the plan?",
        },
        {
          id: "ania:webinar:opt-2",
          topicId: "ania:webinar",
          text: "Why am I crying in the thumbnail?",
        },
        {
          id: "ania:webinar:opt-3",
          topicId: "ania:webinar",
          text: "Two hundred tickets. For what, exactly?",
        },
        {
          id: "ania:webinar:opt-4",
          topicId: "ania:webinar",
          text: "Can the webinar be sixty seconds long?",
        },
        {
          id: "ania:webinar:opt-5",
          topicId: "ania:webinar",
          text: "What if the audience asks a real question?",
        },
        {
          id: "ania:webinar:opt-6",
          topicId: "ania:webinar",
          text: "I will host it. Where is the pizza clause?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:webinar:rep-1",
          text: "Plan: I welcome, you are vulnerable on purpose, slide four is the crying one, and at minute forty the chatbot answers questions while we nod. It is called a 'live AI experiment'. The AI is me, typing. The nodding is the value.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:webinar:rep-2",
          text: "Crying is the hook. The thumbnail was TESTED — I A/B tested your face against a stock robot and the robot lost. You beat a robot at sadness. That is the brand: human, relatable, mildly damp.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:webinar:rep-3",
          text: "Two hundred tickets for TRANSFORMATION. Also the tickets were free and I emailed the same list three times. The third email said 'last chance' and the last chance worked, which is marketing's only law: everyone opens the last email.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:webinar:rep-4",
          text: "Sixty seconds is a REEL, and reels are the funnel's mouth, not its stomach. But fine — we cut a sixty-second ad and the full thing becomes 'extended content'. You just invented a product tier by complaining. This is exactly why I signed you up.",
          relationshipHint: "delighted",
          tags: ["stats:low-patience", "relationship:neutral"],
        },
        {
          id: "ania:webinar:rep-5",
          text: "Then the chatbot answers it. If the chatbot fails, I say 'wow, raw' and we pivot to the crying slide. There is a slide for every emotion and the deck is only eleven slides, so we will be emotional efficiently.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:webinar:rep-6",
          text: "The pizza clause! You are a NATURAL. Yes: pizza at minute fifty, on camera, tagged 'culture win'. The last pizza tag is in the onboarding deck now. You will be in TWO decks. People retire without that.",
          relationshipHint: "pleased",
          tags: ["relationship:warm"],
          offersTaskId: "ania:task-frenemy-live",
        },
      ],
    },
    {
      id: "ania:brand",
      label: "Your personal brand",
      optionCandidates: [
        {
          id: "ania:brand:opt-1",
          topicId: "ania:brand",
          text: "My persona did WHAT while I was offboarding?",
        },
        {
          id: "ania:brand:opt-2",
          topicId: "ania:brand",
          text: "Can my persona be 'quietly competent'?",
        },
        {
          id: "ania:brand:opt-3",
          topicId: "ania:brand",
          text: "The persona is outperforming the real me.",
        },
        {
          id: "ania:brand:opt-4",
          topicId: "ania:brand",
          text: "You said I have a persona. Where is it kept?",
        },
        {
          id: "ania:brand:opt-5",
          topicId: "ania:brand",
          text: "What is my brand voice? Say it gently.",
        },
        {
          id: "ania:brand:opt-6",
          topicId: "ania:brand",
          text: "Klaudia says my persona is derivative.",
        },
      ],
      replyCandidates: [
        {
          id: "ania:brand:rep-1",
          text: "It networked. Personas do not sleep, they CONNECT. While you were doing actual work, your persona got you two podcast invites and one funeral connection. You are welcome, and I am so sorry about the funeral one. That was a targeting error.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:brand:rep-2",
          text: "'Quietly competent' tested terribly. We soften to 'reliably present' or sharpen to 'the calm one with receipts'. The middle is where brands go to die. Pick an edge. Edges are free, which is the best thing about them.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:brand:rep-3",
          text: "Now you see the funnel. The persona eats first and the person eats what falls through, which is also the entire org chart wearing a costume. The fix is not less persona. The fix is a SECOND persona, and we rotate them like tires. Season two, basically.",
          relationshipHint: "pleased",
          tags: ["quest:ania-saw-the-funnel", "relationship:neutral"],
        },
        {
          id: "ania:brand:rep-4",
          text: "In a shared folder called 'personal brands', which is funny because none of the brands inside are personal — they are all approved by committee. Yours is version nine. Version four had a leather jacket. The committee was not ready.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:brand:rep-5",
          text: "Gently? Your voice is 'competent but approachable, like a teacher who owns a dog'. That is not an insult, that is a DEMOGRAPHIC. Burek alone is worth three points of relatability. Do not waste the dog.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:brand:rep-6",
          text: "Klaudia is welcome to her opinion, which she posted, captioned, and tagged as thought leadership. Derivative is how genres FORM. Also she called my funnel 'cute', and I have been to her engagement pod, so we are both armed and polite.",
          relationshipHint: "annoyed",
        },
      ],
    },
    {
      id: "ania:campaign",
      label: "The growth campaign",
      optionCandidates: [
        {
          id: "ania:campaign:opt-1",
          topicId: "ania:campaign",
          text: "What does 'Growth and Synergy' actually grow?",
        },
        {
          id: "ania:campaign:opt-2",
          topicId: "ania:campaign",
          text: "The campaign deck says 'disruption' nine times.",
        },
        {
          id: "ania:campaign:opt-3",
          topicId: "ania:campaign",
          text: "Is the funnel leaky or is that the design?",
        },
        {
          id: "ania:campaign:opt-4",
          topicId: "ania:campaign",
          text: "What is our biggest quick win right now?",
        },
        {
          id: "ania:campaign:opt-5",
          topicId: "ania:campaign",
          text: "Marketing wants 'AI integration' by Monday?",
        },
        {
          id: "ania:campaign:opt-6",
          topicId: "ania:campaign",
          text: "Do you ever miss real marketing?",
        },
      ],
      replyCandidates: [
        {
          id: "ania:campaign:rep-1",
          text: "Awareness, mostly, and sometimes the tone of the Slack. Growth is a feeling that invoices later. I grow the feeling. The invoice is Bartek's problem, and he invoices beautifully, which is why we are a family.",
          relationshipHint: "pleased",
        },
        {
          id: "ania:campaign:rep-2",
          text: "Nine is the minimum for a deck to feel decided. One 'disruption' is a word choice, three is a strategy, nine is a CULTURE. The stock robot photos carry the rest. The robot is doing the handshake. Nobody gets it and that is why it works.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:campaign:rep-3",
          text: "Every funnel leaks. The leak is where the learning lives. We measure the leak, we name the leak, and then the leak goes in the next deck as 'insights'. Nothing is wasted here, especially failure. Failure is content.",
          relationshipHint: "neutral",
        },
        {
          id: "ania:campaign:rep-4",
          text: "Morning energy, love it. Quick win: you walk through the office with a coffee and a focused face while I film six seconds. It becomes 'a day in the life of our AI team'. Six seconds, one coffee, infinite credibility. This is the whole industry and I will not apologize for it.",
          relationshipHint: "pleased",
          tags: ["period:morning"],
        },
        {
          id: "ania:campaign:rep-5",
          text: "Marketing does not want AI integration. Marketing wants the word 'integrated' next to the word 'AI' before a competitor says it first. The integration itself can be a loading spinner that thinks. We ship the spinner, the spinner ships the feeling.",
          relationshipHint: "delighted",
        },
        {
          id: "ania:campaign:rep-6",
          text: "You mean billboards? I interned on a bus-stop campaign once. Five thousand posters and a prayer. Now I print nothing and measure everything. Nostalgia is just A/B testing with worse data. I do miss the posters, though. They were heavy and honest.",
          relationshipHint: "neutral",
        },
      ],
    },
  ],
  taskOffers: [
    {
      id: "ania:task-frenemy-live",
      title: "'Friend or Frenemy?' goes live",
      description: "Thursday. Eleven slides, one crying thumbnail, forty minutes of vulnerability, and a chatbot answering audience questions at minute forty (it is Ania, typing). The pizza clause activates at minute fifty. Two hundred tickets are already sold, so it is canon.",
      flagToSet: "ania-webinar-volunteered",
      rewardHint: "+persona season one, complete",
    },
  ],
};

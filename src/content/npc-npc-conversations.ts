/**
 * NPC↔NPC deep conversations — authored scripts v1 (C-78 REVISE).
 *
 * Twelve scripts across the cast × band axes (schema in
 * `npc-npc-conversations-schema.ts`), one per anchor pair:
 *
 *  - warm  3L  pawel + zosia   — the restore-drill victory lap
 *                                (flag `pawel-restore-drill`),
 *  - warm  2L  przemek + kasia — the referral banter
 *                                (flag `kasia-referral-open`),
 *  - neutral 2L kasia + pawel  — the pipeline handoff friction,
 *  - hostile 3L kasia + marek  — the ticket-queue dispute,
 *  - hostile 2L grazyna + tomek — the hotfix-vs-expense clash,
 *  - neutral 1L janusz + burek — the robot-and-dog beat.
 *
 * Depth pyramid (REVISE #6): two 3-level set pieces, three 2-level
 * scripts, one 1-level one-liner. Every line is <= 69 chars (bubble
 * bound). Voices follow each NPC's established pool in
 * `npc-content/dialogue-pool-*.ts`: Marek terse/telemetry, Zosia
 * corporate-speak, Kasia HR-official, Pawel self-deprecating, Przemek
 * BIG fan, Grazyna receipts, Tomek hotfix hope, Janusz cryptic sage,
 * Burek dog markers (*sound*, [action], (thought)).
 *
 * This module also owns the PURE selection + composition runtime for
 * the scripts (kept with the data, like `npc-schedule.ts`): the actual
 * playback lives in the runner (`src/engine/npc-npc-runner.ts`).
 *
 * NO Jev here: the REVISE contract is deterministic playback — the
 * whole path is pre-decided at pair formation (one seeded pick over
 * the eligible scripts); Jev branch-picking is deferred pending the
 * eval gate (plan §4).
 */

import type { NpcId } from "../types";
import type { NpcNpcConversation } from "./npc-npc-conversations-schema";
import {
  type RelationshipBand,
} from "./npc-npc-conversations-schema";

// ---------------------------------------------------------------------------
// Authored scripts
// ---------------------------------------------------------------------------

export const NPC_NPC_CONVERSATIONS: readonly NpcNpcConversation[] = [
  {
    id: "npcnpc-pz-restore-drill",
    label: "Restore drill victory lap",
    cast: ["pawel", "zosia"],
    bands: ["warm"],
    priority: 5,
    requiresFlags: ["pawel-restore-drill"],
    exchanges: [
      {
        starter: {
          id: "pz-s1",
          text: "The restore drill worked. The files came back. All of them.",
          next: "pz-s2",
          reaction: "pleased",
          onPlayerApproach: "…we were discussing backup hygiene.",
        },
        response: {
          id: "pz-r1",
          text: "Pawel. That is a wins narrative. Do you know what we have?",
        },
      },
      {
        starter: {
          id: "pz-s2",
          text: "Backups. Verified backups. I sat on the floor with pride.",
          next: "pz-s3",
          reaction: "delighted",
          onPlayerApproach: "…the floor was for the laptop. All normal.",
        },
        response: {
          id: "pz-r2",
          text: "A story. I am calling it 'resilience' in the roadmap.",
        },
      },
      {
        starter: {
          id: "pz-s3",
          text: "Can the roadmap also mention the bucket costs nine zloty?",
        },
        response: {
          id: "pz-r3",
          text: "It will say 'enterprise continuity at disruptive cost'.",
          endings: { warm: "Strategically proud of you, Pawel. Tell no one." },
        },
      },
    ],
  },
  {
    id: "npcnpc-kp-referral",
    label: "Referral banter",
    cast: ["przemek", "kasia"],
    bands: ["warm"],
    priority: 4,
    requiresFlags: ["kasia-referral-open"],
    exchanges: [
      {
        starter: {
          id: "kp-s1",
          text: "Kasia! HUGE news. I referred someone. My barber. He codes.",
          next: "kp-s2",
          reaction: "pleased",
          onPlayerApproach: "…a routine pipeline conversation.",
        },
        response: {
          id: "kp-r1",
          text: "Filed. Under 'culture add'. Does he have a pulse and GitHub?",
        },
      },
      {
        starter: {
          id: "kp-s2",
          text: "Pulse, GitHub, and he upsold a fade to the tax office.",
        },
        response: {
          id: "kp-r2",
          text: "He passes. The bonus lands on day ninety. Tell him that.",
          endings: { warm: "Big fan of this pipeline, Kasia. HUGE fan." },
        },
      },
    ],
  },
  {
    id: "npcnpc-pk-pipeline",
    label: "Pipeline handoff friction",
    cast: ["kasia", "pawel"],
    bands: ["neutral"],
    priority: 2,
    exchanges: [
      {
        starter: {
          id: "pk-s1",
          text: "Pawel, I booked two tech screens. Friday. Your backup day.",
          next: "pk-s2",
          reaction: "annoyed",
          onPlayerApproach: "…we are aligning on calendar hygiene.",
        },
        response: {
          id: "pk-r1",
          text: "Friday is backup day. The script does not do interviews.",
        },
      },
      {
        starter: {
          id: "pk-s2",
          text: "One is a referral. Przemek vouched. His barber, allegedly.",
        },
        response: {
          id: "pk-r2",
          text: "Fine. But if the restore fails live, the candidate watches.",
          endings: {
            neutral: "It is still technically a pair-programming session.",
          },
        },
      },
    ],
  },
  {
    id: "npcnpc-km-ticket-queue",
    label: "Ticket-queue dispute",
    cast: ["kasia", "marek"],
    bands: ["hostile"],
    priority: 3,
    exchanges: [
      {
        starter: {
          id: "km-s1",
          text: "Marek. Ticket 112, the fire door sign. It waited 40 days.",
          next: "km-s2",
          reaction: "annoyed",
          onPlayerApproach: "…we were aligning on priorities.",
        },
        response: {
          id: "km-r1",
          text: "Queue order: prod, then what breaks prod, then signage.",
        },
      },
      {
        starter: {
          id: "km-s2",
          text: "It is a legal compliance sign. Legal already escalated.",
          next: "km-s3",
        },
        response: {
          id: "km-r2",
          text: "Legal can file a ticket. It will sit behind the bean.",
        },
      },
      {
        starter: {
          id: "km-s3",
          text: "Forty days, Marek. The door could outlive this company.",
          next: "END",
          reaction: "offended",
        },
        response: {
          id: "km-r3",
          text: "Then the retrospective will note HR finally closed it.",
          endings: { hostile: "Queue position unchanged." },
        },
      },
    ],
  },
  {
    id: "npcnpc-tg-expense-clash",
    label: "Hotfix vs expense clash",
    cast: ["grazyna", "tomek"],
    bands: ["hostile"],
    priority: 3,
    exchanges: [
      {
        starter: {
          id: "tg-s1",
          text: "Tomek. An invoice says 'emergency productivity tool'. Talk.",
          next: "tg-s2",
          reaction: "annoyed",
          onPlayerApproach: "…we are settling an expense classification.",
        },
        response: {
          id: "tg-r1",
          text: "It fixes the hotfix that fixes the first hotfix. Mostly.",
        },
      },
      {
        starter: {
          id: "tg-s2",
          text: "I coded it under 'equipment'. Equipment has Marek in it.",
        },
        response: {
          id: "tg-r2",
          text: "Then I will resubmit it as a candle. That budget exists.",
          endings: {
            hostile: "Rejected. Mark it 'temporary'. Like your fixes.",
          },
        },
      },
    ],
  },
  {
    id: "npcnpc-jb-robot-dog",
    label: "Robot-and-dog beat",
    cast: ["janusz", "burek"],
    bands: ["neutral"],
    priority: 1,
    periods: ["afternoon", "evening"],
    exchanges: [
      {
        starter: {
          id: "jb-s1",
          text: "Burek. Seba says you flagged desk nine again. Good dog.",
          next: "END",
          reaction: "pleased",
          onPlayerApproach: "…fleet business. Nothing to audit here.",
        },
        response: {
          id: "jb-r1",
          text: "*one short blast* [sits by desk nine] (The fleet gets me.)",
          endings: {
            neutral: "The fleet and the dog. Nobody assigned it. It emerged.",
          },
        },
      },
    ],
  },

  // ── batch 2 (2026-10-06): desk-adjacent, evergreen, unflagged ──────
  // Chosen so the rendezvous staging + desk geography can actually
  // fire them: every cast below is desk-adjacent in the main office
  // (ania/marek, grazyna/kasia, tomek/bartek) or a staging classic
  // (CEO 1:1, reception escalation, the postmortem blame pair).

  {
    id: "npcnpc-am-launch-button",
    label: "The launch button",
    cast: ["ania", "marek"],
    bands: ["neutral"],
    priority: 2,
    exchanges: [
      {
        starter: {
          id: "am-s1",
          text: "Marek! The launch deck needs an AI button. By Friday.",
          next: "am-s2",
          reaction: "annoyed",
          onPlayerApproach: "…we are co-creating. Don't block the vibe.",
        },
        response: {
          id: "am-r1",
          text: "Buttons do things. What does yours do?",
        },
      },
      {
        starter: {
          id: "am-s2",
          text: "It says 'AI'. Investors love it. Details later.",
          next: "END",
        },
        response: {
          id: "am-r2",
          text: "Fine. It will run `echo AI`. Ship it. Nobody will diff.",
          endings: {
            neutral: "The demo worked. Nobody asked what it did. Classic.",
          },
        },
      },
    ],
  },

  {
    id: "npcnpc-gk-salary",
    label: "The salary expectation",
    cast: ["grazyna", "kasia"],
    bands: ["neutral"],
    priority: 2,
    exchanges: [
      {
        starter: {
          id: "gk-s1",
          text: "Kasia. Candidate 47 wants double. For a junior role.",
          next: "gk-s2",
          reaction: "annoyed",
          onPlayerApproach: "…salary banding is confidential. Walk on.",
        },
        response: {
          id: "gk-r1",
          text: "He cited 'market rates'. His source is a forum post.",
        },
      },
      {
        starter: {
          id: "gk-s2",
          text: "My ledger says juniors cost less than the coffee budget.",
          next: "END",
        },
        response: {
          id: "gk-r2",
          text: "I will tell him the coffee budget is non-negotiable.",
          endings: {
            neutral: "Candidate 47 withdrew. The coffee budget survived.",
          },
        },
      },
    ],
  },

  {
    id: "npcnpc-tb-rewrite",
    label: "The rewrite",
    cast: ["tomek", "bartek"],
    bands: ["neutral"],
    priority: 2,
    exchanges: [
      {
        starter: {
          id: "tb-s1",
          text: "Bartek, I rewrote the module overnight. All of it.",
          next: "tb-s2",
          onPlayerApproach: "…code review in progress. It's intense.",
        },
        response: {
          id: "tb-r1",
          text: "The module that works? The one billing clients?",
        },
      },
      {
        starter: {
          id: "tb-s2",
          text: "It works, but now it is BEAUTIFUL. Tests pending.",
          next: "END",
          reaction: "annoyed",
        },
        response: {
          id: "tb-r2",
          text: "Beauty waits. Billable waits for nobody. Revert, hero.",
          endings: {
            neutral: "He reverted. The beauty lives on in a gist.",
          },
        },
      },
    ],
  },

  {
    id: "npcnpc-db-debrief",
    label: "The CEO debrief",
    cast: ["dawid", "bartek"],
    bands: ["neutral"],
    priority: 3,
    exchanges: [
      {
        starter: {
          id: "db-s1",
          text: "Bartek. The client call. Give me the one-line version.",
          next: "db-s2",
          onPlayerApproach: "…strategic alignment in progress.",
        },
        response: {
          id: "db-r1",
          text: "They will renew if we stop calling it 'the experiment'.",
        },
      },
      {
        starter: {
          id: "db-s2",
          text: "Done. It is now 'the platform'. Same code, more money.",
          next: "db-s3",
        },
        response: {
          id: "db-r2",
          text: "That is either vision or fraud. I approve of both.",
        },
      },
      {
        starter: {
          id: "db-s3",
          text: "Vision. Write it down. Everything is a deck someday.",
          next: "END",
          reaction: "pleased",
        },
        response: {
          id: "db-r3",
          text: "Decking it now. The renewal is 40 percent likely.",
          endings: {
            neutral: "The platform shipped. Nobody mentioned the experiment.",
          },
        },
      },
    ],
  },

  {
    id: "npcnpc-kr-refund",
    label: "The refund call",
    cast: ["kasia", "renata"],
    bands: ["neutral"],
    priority: 2,
    exchanges: [
      {
        starter: {
          id: "kr-s1",
          text: "Renata, client 12 called you twice. What did you say?",
          next: "kr-s2",
          reaction: "annoyed",
          onPlayerApproach: "…escalation handling. Everything is fine.",
        },
        response: {
          id: "kr-r1",
          text: "I said you would call back. I transferred them to jazz.",
        },
      },
      {
        starter: {
          id: "kr-s2",
          text: "Jazz. Creative. They want a refund for the workshop.",
          next: "END",
        },
        response: {
          id: "kr-r2",
          text: "Hold music was jazz. The refund needs your signature.",
          endings: {
            neutral: "Refund signed. Client 12 keeps the jazz channel.",
          },
        },
      },
    ],
  },

  {
    id: "npcnpc-mg-postmortem",
    label: "The postmortem",
    cast: ["marek", "grazyna"],
    bands: ["neutral"],
    priority: 3,
    exchanges: [
      {
        starter: {
          id: "mg-s1",
          text: "Grazyna. The outage postmortem blames 'human error'.",
          next: "mg-s2",
          reaction: "annoyed",
          onPlayerApproach: "…blameless culture. Mostly.",
        },
        response: {
          id: "mg-r1",
          text: "Whose human? The invoice says the intern deployed.",
        },
      },
      {
        starter: {
          id: "mg-s2",
          text: "The intern deployed what a senior approved. Line 40.",
          next: "mg-s3",
        },
        response: {
          id: "mg-r2",
          text: "Then the postmortem will note line 40. And the senior.",
        },
      },
      {
        starter: {
          id: "mg-s3",
          text: "Note it gently. He is in my onboarding pipeline now.",
          next: "END",
        },
        response: {
          id: "mg-r3",
          text: "Gently. Right under the invoice. Filed. Filed hard.",
          endings: {
            neutral: "Line 40 became a runbook entry. And a warning.",
          },
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Selection runtime (pure)
// ---------------------------------------------------------------------------

function hasFlag(
  flags: Readonly<Record<string, boolean>>,
  id: string,
): boolean {
  return flags[id] === true;
}

function castMatches(
  script: NpcNpcConversation,
  a: NpcId,
  b: NpcId,
): boolean {
  const [first, second] = script.cast;
  return (first === a && second === b) || (first === b && second === a);
}

/**
 * Every script that may play for this pair right now: both NPCs in
 * `cast` (either order), the live relationship band inside `bands`,
 * all `requiresFlags` set, no `blockedByFlags` set, and the period
 * inside `periods` when one is authored. Pure; order follows the
 * authored pool order.
 */
export function eligibleConversations(
  a: NpcId,
  b: NpcId,
  bandValue: RelationshipBand,
  flags: Readonly<Record<string, boolean>> = {},
  period?: string,
  pool: readonly NpcNpcConversation[] = NPC_NPC_CONVERSATIONS,
): NpcNpcConversation[] {
  if (a === b) return [];
  return pool.filter((script) => {
    if (!castMatches(script, a, b)) return false;
    if (!script.bands.includes(bandValue)) return false;
    for (const flag of script.requiresFlags ?? []) {
      if (!hasFlag(flags, flag)) return false;
    }
    for (const flag of script.blockedByFlags ?? []) {
      if (hasFlag(flags, flag)) return false;
    }
    if (script.periods !== undefined && period !== undefined) {
      if (!script.periods.includes(period)) return false;
    }
    return true;
  });
}

/**
 * One seeded pick over the eligible scripts (REVISE #3: a seeded-
 * deterministic fallback instead of "first"). The highest-priority
 * tier wins outright (causality beats length); inside the tier the
 * seeded roll provides the variety across days. The sort tiebreak on
 * id keeps the tier order stable for identical seeds.
 */
export function pickConversation(
  conversations: readonly NpcNpcConversation[],
  seededRng: () => number,
): NpcNpcConversation | null {
  if (conversations.length === 0) return null;
  const sorted = [...conversations].sort(
    (x, y) =>
      y.priority - x.priority || (x.id < y.id ? -1 : x.id > y.id ? 1 : 0),
  );
  const topPriority = sorted[0]!.priority;
  const tier = sorted.filter((script) => script.priority === topPriority);
  const index = Math.min(
    tier.length - 1,
    Math.floor(seededRng() * tier.length),
  );
  return tier[index]!;
}

/**
 * Convenience composition used by the controller seam: eligible for
 * the pair right now, then one seeded pick. Returns null when nothing
 * is eligible (the caller falls back to the legacy single exchange).
 */
export function npcNpcConversationFor(
  a: NpcId,
  b: NpcId,
  bandValue: RelationshipBand,
  flags: Readonly<Record<string, boolean>> = {},
  period?: string,
  seededRng: () => number = Math.random,
  pool: readonly NpcNpcConversation[] = NPC_NPC_CONVERSATIONS,
): NpcNpcConversation | null {
  return pickConversation(
    eligibleConversations(a, b, bandValue, flags, period, pool),
    seededRng,
  );
}

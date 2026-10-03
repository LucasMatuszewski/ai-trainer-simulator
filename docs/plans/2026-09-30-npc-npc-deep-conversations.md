# Plan — NPC↔NPC Deep Conversations (branching, 1–5 levels) + Jev's proper role

**Date:** 2026-09-30 (evening) · **Author:** orchestrator (ZCode/GLM-5.3) ·
**For review by:** Codex CLI (gpt-6.1 Sol) + Claude CLI (Opus) · **Status:** DRAFT for CR
**Relates to:** C-77/C-78, ADR-0009 D-45…D-61, sacs-xtma.13/.14 · **Branch:** `feat/jev-npc-decision-steering`

---

## 1. The problem (Lucas)

NPC↔NPC talk today is always one starter + one response. Not natural. We want:

- **Deeper NPC↔NPC conversations**: 1–5 exchange levels on the same topic, some short, some branching.
- **Options at each step** for the NPCs themselves (they "choose" what to say next).
- **Only pre-selected, sensible options** — authored, connected, no random cross-talk (the player-dialogue lesson applied to NPC-NPC).
- **Jev decides which branch fits** the current game state (relationships, events, period, place) — OR deterministic selection if that works better and saves Jev for player conversations. Decide by measurement, not preference.
- **NPC↔NPC relationships** (friends, office-enemies, neutral) driving who talks to whom and how.

## 2. What exists (and stays)

- **Pairing contract (C-78)**: option ↔ its own replies. Player-side: deterministic; Jev only picks among multiple variants. This contract extends to NPC↔NPC — it is the anti-chaos guarantee.
- **World-tick** already: finds pairs within 4.6 m (chattiness-weighted, cooldowns), asks Jev to pick starter + exchange + destination, applies per-subject fallback.
- **Relationship matrix** (105 NPC↔NPC pairs, archetype-seeded, social stability rules) exists in the reducer — needs production dispatch + consumption.
- **v2 pool schema** supports any NPC id — NPC↔NPC exchanges are just data.

## 3. Architecture — "Conversation Script" pools (authored trees, Jev prunes)

New authored model `NpcNpcConversation` per pair-class (NOT per pair — 105 pairs can't be hand-authored; group by relationship class + role):

```
NpcNpcConversation {
  id, topic, minLevels: 1, maxLevels: 5,
  turns: [
    { starter: A-line,
      responses: [ { text: B-line, next?: turns-index | END } ]   // B always answers THIS
    },
    { starter: A-line2, ... },                                    // deeper level
  ],
  requires: { pairClass: "friends"|"enemies"|"neutral"|" coworkers",
              minRelationship, maxRelationship, periods?, place?, flags? },
  taskOffer?: ...   // NPC-NPC tasks also possible (janusz sends a robot!)
}
```

- **Deterministic core (default):** a full authored chain plays starter→response→starter→… to its `maxLevels` (1–5). Jev is NOT needed when the chain is authored linear — zero cost, always sensible.
- **Branch points (authored):** a response may offer 2–4 authored `next` options; at branch points, **Jev picks the branch** using the live state (events, period, relationship band, day) — this is the "Jev decides which branch to take from options based on the state" ask. If Jev is unavailable/times out: authored default branch (first).
- **Relationships gate + flavor:** pairClass gates which conversations can start; the same conversation's lines can have relationship-tagged variants. Enemies argue, friends banter — same skeleton, different authored lines.
- **Dispatch:** on conversation end, apply relationship deltas (bucket table, bounded ±5 total per conversation) — the matrix finally MOVES from real play.

## 4. Jev's role — decided by measurement, not taste

| Surface | Mechanism | Jev? |
|---|---|---|
| Pair formation | existing world-tick + relationship gates | No (deterministic) |
| Linear chain playback | authored script | No |
| Branch pick at authored branch points | Jev Choice over 2–4 branches; fallback = first | **Yes** (cheap, one per branch point) |
| Relationship variant flavor | authored `relationship:`-tagged line variants; Jev picks variant if >1 | Yes, same eval gate |
| Player-dialogue replies | C-78 pairing (deterministic) | No |

**Gate:** the eval harness (`scripts/jev-eval.mjs`) gains NPC↔NPC cases with known-correct branches; Jev branch-picking ships only above 80% measured accuracy (two iterations), else deterministic-first-branch ships and Jev stays for player conversations only. This is Lucas's "decide later after tests" made concrete.

## 5. Implementation order (3 PR-sized steps)

1. **Schema + runtime + 3 pilot pair-classes** (friends: klaudia+zosia; enemies: marek+grazyna; neutral: pawel+kasia) — 2 conversations per class, world-tick integration, tests. Playable in-game; Jev branch-pick behind the eval gate.
2. **Relationship matrix goes live** — archetype seeds become visible (gates pair formation), conversation deltas dispatch, nightly regression. NpcNeeds→coffee trip (AC-22) lands with this step.
3. **Content expansion** — 2–3 conversations per pair-class across ~8 classes (sacs-xtma.14 scope grows here; eval harness cases per class).

## 6. Open questions for the reviewers

- Is per-pair-CLASS grouping right, or per-relationship-band? (105 authored conversations is not sustainable; ~8 classes is.)
- Branch memory: should a pair avoid repeating the same conversation within N days (per-pair cooldown already exists — extend it)?
- Should deep conversations pause the walk (pairs stand and talk longer) or keep the 3.8s response cadence per level?
- Do NPC↔NPC conversations need the social bucket dispatch per LEVEL or once per conversation (bounded ±5 total is our pick)?

---

*Reviewer instructions: challenge the architecture (script-vs-pool, class grouping, Jev surfaces), the risk of another "options jump" regression, and the eval gate threshold. Output: findings by severity + your own game-direction take on NPC interaction depth for an office sim (what makes NPC-NPC talk feel alive vs scripted).*

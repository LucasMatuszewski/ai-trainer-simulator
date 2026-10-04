# NPC-NPC deep conversations v1 — delegate result (npcnpc-v1)

Branch `feat/jev-npc-decision-steering` (HEAD `f031cd8`). No commit, no push,
no `bd`, no version bump. `src/engine/npc-controller.ts` NOT modified — the
patch below was applied to a TEMPORARY COPY and proven to compile with
`pnpm typecheck`, then the copy was deleted.

## Files (exactly the Allowed list)

| File | Status |
|---|---|
| `src/content/npc-npc-conversations.ts` | NEW — 6 authored scripts + pure selection runtime |
| `src/engine/npc-npc-runner.ts` | EXTENDED — `flattenPath` + `BASE_DWELL_S` (+ schema type imports); the existing state machine untouched |
| `tests/unit/content/npc-npc-conversations.test.ts` | NEW — 22 tests |
| `tests/unit/engine/npc-npc-runner.test.ts` | NEW — 16 tests |

## TDD evidence (red -> green)

1. RED: both suites failed with `Failed to load url .../npc-npc-conversations`
   (module absent; runner exports absent). Output captured before
   implementation.
2. GREEN: first implementation run exposed 3 real failures — a genuine
   content bug (`pz-r2` carried `reaction` on a line without `next`, which the
   schema validator rightly rejects: "reaction on a terminal line is never
   settled" — moved the delighted beat to the chain-carrying `pz-s2`) and two
   test-math errors (km flatten includes its hostile ending, so 7 events not
   6; the dwell-scaling test advanced 0.01 s short of the short line's dwell).
   Fixed; **38/38 green**.
3. Mutation checks (PR-11), each reverted after:
   - band gate deleted -> 1 content test failure;
   - band-ending append deleted -> 3 runner test failures;
   - priority sort inverted (worst-first) -> 1 failure (tier test).
   (A first "tiebreak-always--1" mutation was behaviorally identical in V8's
   2-element sort — ineffective mutation, not a test gap.)

## Verification

- `pnpm typecheck` — exit 0 (also exit 0 with the patched controller copy in
  the tree).
- `pnpm test` — 1318 passed / 1 failed in 106 files. The 1 failure is
  PRE-EXISTING and unrelated: `tests/unit/content/npc-profiles.test.ts`
  expects `SOCIAL_PROFILES_VERSION` to be 1 but the branch has 2 (the C-78
  REVISE re-seed). Verified by `git stash -u` + rerun on the clean tree: same
  failure. Not fixable within this brief's Allowed list.
- 69-char bound: asserted for every line text, every `onPlayerApproach` and
  every band ending across all six scripts (content suite).

## The six scripts

| id | pair | band x levels | priority | gate | beat |
|---|---|---|---|---|---|
| `npcnpc-pz-restore-drill` | pawel+zosia | warm x3 | 5 | requires `pawel-restore-drill` | Restore-drill victory lap: files came back, Zosia mints the "resilience" roadmap story, Pawel asks to mention the 9-zl bucket; warm ending "Strategically proud of you, Pawel. Tell no one." |
| `npcnpc-kp-referral` | przemek+kasia | warm x2 | 4 | requires `kasia-referral-open` | Referral banter: Przemek referred his barber ("He codes"), Kasia files him as "culture add" (pulse + GitHub); warm ending "Big fan of this pipeline, Kasia. HUGE fan." |
| `npcnpc-pk-pipeline` | kasia+pawel | neutral x2 | 2 | evergreen | Pipeline handoff friction: tech screens booked on Friday backup day; "The script does not do interviews"; neutral ending "It is still technically a pair-programming session." |
| `npcnpc-km-ticket-queue` | kasia+marek | hostile x3 | 3 | evergreen | Ticket 112 (fire door sign) waited 40 days; Marek: "prod, then what breaks prod, then signage"; offended beat; hostile ending "Queue position unchanged." |
| `npcnpc-tg-expense-clash` | grazyna+tomek | hostile x2 | 3 | evergreen | "Emergency productivity tool" invoice vs expense alchemy; "It fixes the hotfix that fixes the first hotfix. Mostly."; hostile ending "Rejected. Mark it 'temporary'. Like your fixes." |
| `npcnpc-jb-robot-dog` | janusz+burek | neutral x1 | 1 | periods afternoon+evening | Robot-and-dog beat: Burek answers in dog markers ("*one short blast* [sits by desk nine] (The fleet gets me.)"); ending "The fleet and the dog. Nobody assigned it. It emerged." |

Every script has >= 1 authored `onPlayerApproach` hush line; reactions only
from the bucket vocabulary, only on chain-carrying lines (validator rule);
Burek's lines keep the *sound/[action]/(thought) marker convention.

## Runtime API (as shipped)

- `eligibleConversations(a, b, bandValue, flags?, period?, pool?)` — cast in
  either order, band match, `requiresFlags`/`blockedByFlags`, period gate.
- `pickConversation(conversations, seededRng)` — highest-priority tier wins,
  seeded pick inside the tier, id tiebreak for total determinism; null when
  empty.
- `npcNpcConversationFor(a, b, bandValue, flags?, period?, seededRng?, pool?)`
  — eligible + pick composition.
- `flattenPath(script, startExchangeId, bandValue, _rng?, maxLevels?)` (in the
  runner file) — deterministic chain walk (response.next ?? starter.next),
  cycle guard, maxLevels cap, band-keyed ending appended as one extra "B"
  event; throws on unknown start id.
- `BASE_DWELL_S = 3.8` (matches the legacy RESPONSE_DELAY_S cadence).

## Controller patch (apply to `src/engine/npc-controller.ts`)

Each hunk is an exact FIND -> REPLACE pair; all hunks were applied verbatim to
a copy of the current file and `pnpm typecheck` passed. Hunk order matches the
file order.

### Hunk 1 — imports (after the `./printer-flash` import block)

FIND:
```ts
import {
  PRINTER_FLASH_SWEEP_COUNT,
  PRINTER_FLASH_SWEEP_INTERVAL_S,
  printerFlashIntensity,
} from "./printer-flash";
```
REPLACE:
```ts
import {
  PRINTER_FLASH_SWEEP_COUNT,
  PRINTER_FLASH_SWEEP_INTERVAL_S,
  printerFlashIntensity,
} from "./printer-flash";
import {
  eligibleConversations,
  pickConversation,
} from "../content/npc-npc-conversations";
import type { NpcNpcConversation } from "../content/npc-npc-conversations-schema";
import { band, type ReactionBucket } from "../game/social";
import {
  BASE_DWELL_S,
  DEFAULT_HUSH,
  createNpcNpcRunner,
  flattenPath,
  type NpcNpcRunner,
} from "./npc-npc-runner";
```

### Hunk 2 — view interface (after `ActiveConversationView`)

FIND:
```ts
export interface ActiveConversationView {
  a: string;
  b: string;
  /** Seconds until the partner's response bubble fires. */
  responseIn: number;
  /** The line the starter said (debug/test/WebMCP visibility). */
  starterLine: string;
}
```
REPLACE: same block plus:
```ts

/** C-78 REVISE v1: debug/test view of one active deep conversation. */
export interface DeepConversationView {
  a: string;
  b: string;
  scriptId: string;
  phase: string;
  /** Index of the line currently on screen. */
  lineIndex: number;
  totalCount: number;
}
```

### Hunk 3 — `NpcController` interface (after `getActiveConversations`)

FIND:
```ts
  /** C-46 debug/test hook: the conversations currently in flight. */
  getActiveConversations: () => readonly ActiveConversationView[];
```
REPLACE:
```ts
  /** C-46 debug/test hook: the conversations currently in flight. */
  getActiveConversations: () => readonly ActiveConversationView[];
  /** C-78 REVISE v1: the authored deep conversations in flight. */
  getActiveDeepConversations: () => readonly DeepConversationView[];
```

### Hunk 4 — `NpcControllerOptions` (between `chatter?` and `playSfx?`)

FIND:
```ts
  chatter?: boolean;
  /** C-64: injectable so controller tests do not need a browser AudioContext. */
  playSfx?: (id: "sfx_photocopier" | "sfx_error_buzzer") => void;
```
REPLACE:
```ts
  chatter?: boolean;
  /**
   * C-78 REVISE v1 (NPC-NPC deep conversations): live game-state reads.
   * When omitted the controller assumes relationship 50 (neutral band)
   * and no flags, so only evergreen neutral scripts can fire and the
   * legacy single-exchange flow is otherwise unchanged. Production
   * wiring (scene.ts): getRelationship reads
   * `social.relationships[pairKey(a, b)]`, getFlags reads `state.flags`.
   */
  getRelationship?: (a: NpcId, b: NpcId) => number;
  getFlags?: () => Readonly<Record<string, boolean>>;
  /**
   * Settles ONE bounded reaction per finished deep conversation (the
   * last DELIVERED emotional beat; never "neutral" - a neutral dispatch
   * would still mark the pair "touched" and freeze its archetype
   * regression). Production wiring:
   * `(pair, bucket) => game.dispatch({ type: "apply-social-reaction", pair, bucket })`.
   */
  onConversationReaction?: (pair: [NpcId, NpcId], bucket: ReactionBucket) => void;
  /** C-64: injectable so controller tests do not need a browser AudioContext. */
  playSfx?: (id: "sfx_photocopier" | "sfx_error_buzzer") => void;
```

### Hunk 5 — state + helpers (right after `markSpoke`)

FIND:
```ts
  const markSpoke = (npcId: NpcId, now: number): void => {
    nextSpeechAt.set(npcId, now + SPEECH_COOLDOWN_S);
  };
```
REPLACE: the same block plus:

```ts
  // ── C-78 REVISE v1: NPC-NPC deep conversations ──────────────────────
  // One authored-script runner per active pair, keyed by pairKey. Deep
  // runs count toward MAX_CONVERSATIONS through the same room/busy
  // gates as the legacy single exchanges, and cool the pair down for
  // longer (an authored beat should not instantly repeat).
  interface DeepRun {
    runner: NpcNpcRunner;
    /** script.cast[0] - speaks the "A" lines. */
    aId: NpcId;
    /** script.cast[1] - speaks the "B" lines. */
    bId: NpcId;
    scriptId: string;
    /** The live pair, for the bounded social-reaction dispatch. */
    pair: [NpcId, NpcId];
    renderedIndex: number;
  }
  const deepRuns = new Map<string, DeepRun>();
  // usedReplyIds-style memory: every line an NPC has HEARD, bounded.
  // v1 records it; a later wave can gate selection on it.
  const heardLines = new Map<NpcId, Set<string>>();
  const HEARD_LINE_LIMIT = 24;
  const rememberLine = (npcId: NpcId, text: string): void => {
    let heard = heardLines.get(npcId);
    if (heard === undefined) {
      heard = new Set<string>();
      heardLines.set(npcId, heard);
    }
    heard.add(text);
    if (heard.size > HEARD_LINE_LIMIT) {
      const oldest = heard.values().next().value;
      if (oldest !== undefined) heard.delete(oldest);
    }
  };
  // Deep conversations repeat less often than single exchanges.
  const DEEP_PAIR_COOLDOWN_S = PAIR_COOLDOWN_S * 2;
  // Recent script ids (bounded ring) so the same pair/pool does not
  // replay the identical script back to back; falls back to the full
  // eligible set when everything is recent.
  const recentDeepScripts: string[] = [];
  const DEEP_RECENT_LIMIT = 3;
  // Deep script picks use their own LCG (same pattern as copyRandom):
  // consuming the SHARED rng here would reshuffle every seeded
  // movement/escape roll downstream.
  let deepRandomState = (getDay() * 40503) >>> 0;
  const deepRandom = (): number => {
    deepRandomState = (deepRandomState * 1664525 + 1013904223) >>> 0;
    return deepRandomState / 0x100000000;
  };
  /** Ends a deep run's bookkeeping: cooldown + one bounded reaction. */
  const settleDeepRun = (key: string, run: DeepRun): void => {
    deepRuns.delete(key);
    pairCooldowns.set(key, controllerElapsed + DEEP_PAIR_COOLDOWN_S);
    const snapshot = run.runner.snapshot();
    if (
      snapshot.reaction !== null && snapshot.reaction !== "neutral" &&
      options.onConversationReaction !== undefined
    ) {
      options.onConversationReaction(run.pair, snapshot.reaction);
    }
  };
  /** Period transition / new day: abandon every run (interruption
   *  table) with the same settlement as any other end. */
  const abandonDeepRuns = (): void => {
    for (const [key, run] of [...deepRuns]) {
      run.runner.abandon();
      settleDeepRun(key, run);
    }
  };
  /** Pre-decides the whole path (one seeded decision, REVISE #3) and
   *  puts the runner on the air with its first line. */
  const startDeepConversation = (
    script: NpcNpcConversation,
    pair: ChatterPair,
    relBand: "hostile" | "neutral" | "warm",
  ): void => {
    const [aId, bId] = script.cast;
    const firstExchange = script.exchanges[0];
    if (aId === undefined || bId === undefined || firstExchange === undefined) return;
    const events = flattenPath(script, firstExchange.starter.id, relBand, deepRandom);
    const runner = createNpcNpcRunner({
      lines: events,
      baseDwellS: BASE_DWELL_S,
      onEnd: () => {},
    });
    deepRuns.set(pairKey(pair.a, pair.b), {
      runner, aId, bId, scriptId: script.id,
      pair: [pair.a as NpcId, pair.b as NpcId],
      renderedIndex: 0,
    });
    recentDeepScripts.push(script.id);
    if (recentDeepScripts.length > DEEP_RECENT_LIMIT) recentDeepScripts.shift();
    const firstLine = runner.currentLine();
    if (firstLine !== null) {
      bubbleSystem?.show(npcObjects[aId].position, firstLine.text);
      markSpoke(aId, controllerElapsed);
      rememberLine(aId, firstLine.text);
      rememberLine(bId, firstLine.text);
    }
    // Face each other for the duration of the run.
    const aObject = npcObjects[aId];
    const bObject = npcObjects[bId];
    const dx = bObject.position.x - aObject.position.x;
    const dz = bObject.position.z - aObject.position.z;
    aObject.rotation.y = Math.atan2(dx, dz);
    bObject.rotation.y = Math.atan2(-dx, -dz);
  };
```

### Hunk 6 — `chattingNow` (update(), after the legacy conversations loop)

FIND:
```ts
    const chattingNow = new Set<NpcId>();
    for (const conversation of conversations.values()) {
      chattingNow.add(conversation.aId);
      chattingNow.add(conversation.bId);
    }
```
REPLACE:
```ts
    const chattingNow = new Set<NpcId>();
    for (const conversation of conversations.values()) {
      chattingNow.add(conversation.aId);
      chattingNow.add(conversation.bId);
    }
    // C-78 REVISE v1: deep-conversation participants hold still too.
    for (const run of deepRuns.values()) {
      chattingNow.add(run.aId);
      chattingNow.add(run.bId);
    }
```

### Hunk 7 — drive loop (head of the C-46 conversation manager)

FIND:
```ts
    // --- C-46 conversation manager ---------------------------------
    // Responses: each frame, deliver the partner's reply when the
    // starter's bubble has had its moment. The pair then cools down so
    // the NEXT exchange belongs to a different pair.
    for (const [key, conversation] of [...conversations]) {
```
REPLACE:
```ts
    // --- C-46 conversation manager ---------------------------------
    // Responses: each frame, deliver the partner's reply when the
    // starter's bubble has had its moment. The pair then cools down so
    // the NEXT exchange belongs to a different pair.
    // --- C-78 REVISE v1: deep conversation drive loop ---------------
    // Advance every active authored script and render each line as the
    // runner flips to it. A participant that leaves (departing,
    // walking, gone home, invisible) ABANDONS the run; the player
    // opening a dialogue with a participant HUSHES it (see
    // setTalkingToPlayer). Either way settleDeepRun fires once.
    for (const [key, run] of [...deepRuns]) {
      const aObject = npcObjects[run.aId];
      const bObject = npcObjects[run.bId];
      const aState = runtime.get(run.aId);
      const bState = runtime.get(run.bId);
      const left = aObject === undefined || bObject === undefined ||
        !aObject.visible || !bObject.visible ||
        aObject.userData.npcState === "gone-home" ||
        bObject.userData.npcState === "gone-home" ||
        departing.has(run.aId) || departing.has(run.bId) ||
        aState === undefined || bState === undefined ||
        aState.path !== null || bState.path !== null;
      if (left) {
        run.runner.abandon();
        settleDeepRun(key, run);
        continue;
      }
      const indexBefore = run.runner.snapshot().lineIndex;
      run.runner.advance(safeDt);
      const snapshot = run.runner.snapshot();
      if (snapshot.phase !== "running") {
        settleDeepRun(key, run);
        continue;
      }
      const current = run.runner.currentLine();
      if (current !== null && snapshot.lineIndex !== indexBefore) {
        const speakerId = current.speaker === "A" ? run.aId : run.bId;
        const speakerObject = speakerId === run.aId ? aObject : bObject;
        bubbleSystem?.show(speakerObject.position, current.text);
        markSpoke(speakerId, controllerElapsed);
        rememberLine(run.aId, current.text);
        rememberLine(run.bId, current.text);
      }
    }
    for (const [key, conversation] of [...conversations]) {
```

### Hunk 8 — start gate counts deep runs

FIND:
```ts
      if (conversations.size < MAX_CONVERSATIONS && controllerElapsed >= nextStartAt) {
```
REPLACE:
```ts
      if (conversations.size + deepRuns.size < MAX_CONVERSATIONS && controllerElapsed >= nextStartAt) {
```

### Hunk 9 — busy set includes deep participants

FIND:
```ts
        const busy = new Set<string>();
        for (const conversation of conversations.values()) {
          busy.add(conversation.aId); busy.add(conversation.bId);
        }
```
REPLACE:
```ts
        const busy = new Set<string>();
        for (const conversation of conversations.values()) {
          busy.add(conversation.aId); busy.add(conversation.bId);
        }
        for (const run of deepRuns.values()) {
          busy.add(run.aId); busy.add(run.bId);
        }
```

### Hunk 10 — activeRooms includes deep rooms

FIND:
```ts
        const activeRooms = new Set<RoomId>();
        for (const conversation of conversations.values()) {
          const a = npcObjects[conversation.aId];
          const b = npcObjects[conversation.bId];
          activeRooms.add(roomAt(a.position.x, a.position.z));
          activeRooms.add(roomAt(b.position.x, b.position.z));
        }
```
REPLACE:
```ts
        const activeRooms = new Set<RoomId>();
        for (const conversation of conversations.values()) {
          const a = npcObjects[conversation.aId];
          const b = npcObjects[conversation.bId];
          activeRooms.add(roomAt(a.position.x, a.position.z));
          activeRooms.add(roomAt(b.position.x, b.position.z));
        }
        for (const run of deepRuns.values()) {
          const runA = npcObjects[run.aId];
          const runB = npcObjects[run.bId];
          activeRooms.add(roomAt(runA.position.x, runA.position.z));
          activeRooms.add(roomAt(runB.position.x, runB.position.z));
        }
```

### Hunk 11 — the pairing branch (deep try first, legacy flow in `else`)

FIND: the entire block from
`if (pair !== null && first !== undefined && second !== undefined) {` through
its closing `nextStartAt = controllerElapsed + nextStartDelay(conversations.size, rng);\n        }`
(i.e. the current lines from the "C-46: the STARTER is a chattiness-weighted
coin flip" comment to the end of the pair branch).
REPLACE:
```ts
        if (pair !== null && first !== undefined && second !== undefined) {
          // --- C-78 REVISE v1: deep conversations first ----------------
          // When an authored script is eligible for this pair (cast x
          // live band x flags x period) it REPLACES the single-exchange
          // flow: the whole path is flattened NOW (one seeded decision
          // at formation) and the runner plays it as timed bubbles.
          const relBand = band(
            options.getRelationship?.(pair.a as NpcId, pair.b as NpcId) ?? 50,
          );
          const eligible = eligibleConversations(
            pair.a as NpcId,
            pair.b as NpcId,
            relBand,
            options.getFlags?.() ?? {},
            period,
          );
          const fresh = eligible.filter(
            (script) => !recentDeepScripts.includes(script.id),
          );
          const deepScript = pickConversation(
            fresh.length > 0 ? fresh : eligible,
            deepRandom,
          );
          if (deepScript !== null) {
            startDeepConversation(deepScript, pair, relBand);
            // Schedule the next start AFTER recording this one, so the
            // 35% overlap gap can fire against the just-started run.
            nextStartAt = controllerElapsed + nextStartDelay(conversations.size, rng);
          } else {
          // C-46: the STARTER is a chattiness-weighted coin flip
          // inside the pair - this is what stops "only one person
          // talks all the time".
          const starterId = pickChatterStarterFor(pair.a, pair.b) as NpcId;
          const responderId = (starterId === pair.a ? pair.b : pair.a) as NpcId;
          // C-46 (Lucas): lunch lines are TIME-gated, not
          // location-gated - during the lunch window every human pair
          // sounds like lunch, wherever they stand. The starter's
          // topic affinities filter the pool (C-46 amendment). The
          // pool selection stays at the call site (the hook receives
          // the active pool as its candidate list, WS0 seam).
          const chatterPool = isLunchActive() ? LUNCH_CHATTER : OFFICE_CHATTER;
          const exchange = pickChatterExchangeFor(chatterPool, starterId);
          // Burek cannot do small talk: as a starter he just barks
          // (one turn); as a responder he barks back.
          const starterLine = starterId === "burek"
            ? pickLine(BUREK_LINES, rng)
            : exchange.starter;
          const responseLine = starterId === "burek"
            ? null
            : responderId === "burek"
              ? pickLine(BUREK_LINES, rng)
              : pickLine(exchange.responses, rng);
          bubbleSystem?.show(npcObjects[starterId].position, starterLine);
          markSpoke(starterId, controllerElapsed);
          // Face each other for the exchange.
          const dx = second.position.x - first.position.x;
          const dz = second.position.z - first.position.z;
          first.rotation.y = Math.atan2(dx, dz);
          second.rotation.y = Math.atan2(-dx, -dz);
          if (starterId === "burek") lastBurekBubbleAt = controllerElapsed;
          const key = pairKey(pair.a, pair.b);
          if (responseLine === null) {
            pairCooldowns.set(key, controllerElapsed + PAIR_COOLDOWN_S);
          } else {
            conversations.set(key, { aId: starterId, bId: responderId, starterLine: starterLine, response: responseLine, starterAt: controllerElapsed });
          }
          // Schedule the next start AFTER recording this one, so the
          // 35% overlap gap can fire against the just-started exchange.
          nextStartAt = controllerElapsed + nextStartDelay(conversations.size, rng);
          }
        }
```
(The legacy body between `} else {` and the closing `}` is byte-identical to
today's code, only nested one level — `period` is already in scope from
`ensureCurrentPeriod()` earlier in `update()`.)

### Hunk 12 — hush on player dialogue open (`setTalkingToPlayer`)

FIND:
```ts
    setTalkingToPlayer: (npcId) => {
      playerTalkingTo = npcId;
    },
```
REPLACE:
```ts
    setTalkingToPlayer: (npcId) => {
      // C-78 REVISE v1: opening a player dialogue with a participant of
      // a deep conversation HUSHES the run (interruption table). The
      // current speaker plays the authored hush line, or "…anyway."
      // when none is authored for the line on screen.
      if (npcId !== null) {
        for (const [key, run] of [...deepRuns]) {
          if (run.aId !== npcId && run.bId !== npcId) continue;
          const line = run.runner.currentLine();
          const speakerId = line !== null && line.speaker === "A" ? run.aId : run.bId;
          const speakerObject = npcObjects[speakerId];
          bubbleSystem?.show(
            speakerObject.position,
            line?.onPlayerApproach ?? DEFAULT_HUSH,
          );
          markSpoke(speakerId, controllerElapsed);
          run.runner.hush();
          settleDeepRun(key, run);
        }
      }
      playerTalkingTo = npcId;
    },
```

### Hunk 13 — getter implementation (after `getActiveConversations` impl)

FIND:
```ts
      starterLine: conversation.starterLine,
    })),
    getChatterCandidatePairs: () => lastChatterCandidatePairs,
```
REPLACE:
```ts
      starterLine: conversation.starterLine,
    })),
    getActiveDeepConversations: () => [...deepRuns.values()].map((run) => {
      const snapshot = run.runner.snapshot();
      return {
        a: run.aId,
        b: run.bId,
        scriptId: run.scriptId,
        phase: snapshot.phase,
        lineIndex: snapshot.lineIndex,
        totalCount: snapshot.totalCount,
      };
    }),
    getChatterCandidatePairs: () => lastChatterCandidatePairs,
```

### Hunks 14-16 — abandon deep runs at the three period/day transitions

14. In `synchronizePeriod`:
FIND:
```ts
    // Everyone re-plans across the office, so any in-flight exchange
    // would end up as bubbles over NPCs walking away from each other.
    conversations.clear();
```
REPLACE:
```ts
    // Everyone re-plans across the office, so any in-flight exchange
    // would end up as bubbles over NPCs walking away from each other.
    // C-78 REVISE v1: deep runs are abandoned too (interruption table:
    // period transition) with their one-shot settlement.
    abandonDeepRuns();
    conversations.clear();
```
15. In `beginMorningArrivals`:
FIND:
```ts
    overrides.clear();
    validatedDestinations.clear();
    conversations.clear();
    pendingArrivals.clear();
```
REPLACE:
```ts
    overrides.clear();
    validatedDestinations.clear();
    abandonDeepRuns();
    conversations.clear();
    pendingArrivals.clear();
```
16. In `beginEveningDepartures`:
FIND:
```ts
    overrides.clear();
    validatedDestinations.clear();
    conversations.clear();
        const leavers: NpcId[] = [];
```
REPLACE:
```ts
    overrides.clear();
    validatedDestinations.clear();
    abandonDeepRuns();
    conversations.clear();
        const leavers: NpcId[] = [];
```

### Scene.ts wiring the orchestrator still owes (NOT part of this patch)

```ts
const npcController = createNpcController(NPCS, npcObjects, getCurrentPeriod, getDay, Math.random, isLunchActive, {
  ...(positionalSfx ? { playSfx: ... } : {}),
  getRelationship: (a, b) => game.getState().social?.relationships[pairKey(a, b)] ?? 50,
  getFlags: () => game.getState().flags,
  onConversationReaction: (pair, bucket) => game.dispatch({ type: "apply-social-reaction", pair, bucket }),
});
```

## Deviations / decisions (disagreement invited)

1. **No separate runtime file.** The brief's Build §2 named
   `src/content/npc-npc-conversations-runtime.ts`, but that file is not in the
   brief's own Allowed list (nor the coordinator's), so the selection runtime
   lives in `src/content/npc-npc-conversations.ts` with the data (repo
   precedent: `npc-schedule.ts`), and `flattenPath` lives in
   `src/engine/npc-npc-runner.ts` (explicitly extensible; it is
   runner-native: RunnerEvent, dwellFor).
2. **`flattenPath` gained a `bandValue` parameter** (before `rng`) — band-
   appropriate endings need the live band (REVISE #6). `rng` kept as unused
   `_rng` for the future Jev branch wave (`noUnusedParameters`).
3. **`pickConversation` is priority-tier + seeded pick, not literal
   round-robin** — a pure function cannot hold round-robin state; "highest
   priority first" is honored exactly; variety comes from the seed inside the
   top tier plus the controller's recent-scripts ring (DEEP_RECENT_LIMIT = 3).
4. **`eligibleConversations` takes an optional injectable `pool`** (default
   `NPC_NPC_CONVERSATIONS`) so `blockedByFlags` is unit-testable and a future
   event layer can pass a scoped pool.
5. **Controller reads state via new optional options** (`getRelationship`,
   `getFlags`, `onConversationReaction`) instead of importing the store
   singleton — engine layer stays store-free; defaults are inert (neutral
   band, no flags, no dispatch), so the patch changes nothing until scene.ts
   wires it. WS0 seam block untouched.
6. **Neutral reactions are not dispatched.** "One per conversation, bounded"
   holds — but dispatching `neutral` would still mark the pair "touched" and
   freeze its nightly archetype regression for a zero-delta write, so only
   offended/annoyed/pleased/delighted settle.
7. **Deep pair cooldown = 2x `PAIR_COOLDOWN_S` (80 s)** and a 3-script recent
   ring — an authored beat should not instantly repeat itself.
8. **Proximity hush is wired to dialogue-open only.** The interruption
   table's "player comes within range" radius-hush needs a player position;
   the controller has none. A `getPlayerPosition` option could be added by
   the orchestrator later; hush-on-dialogue-open covers the deterministic,
   player-caused case.
9. **`getActiveDeepConversations()` added** (mirrors the C-46 debug hook) so
   QA/Playwright/WebMCP can see in-flight deep runs.
10. **Deep picks use a private LCG** (same pattern as the existing
    `copyRandom`) — consuming the shared rng stream in the pairing block
    would reshuffle every downstream seeded movement/escape roll and break
    seed-stability of existing controller tests.

## Pre-existing failure (not mine, documented)

`tests/unit/content/npc-profiles.test.ts > SOCIAL_PROFILES_VERSION > is 1 for
the first authored profile table` — expects 1, branch constant is 2 (the
C-78 REVISE re-seed in `src/content/npc-profiles.ts`). Reproduced on a clean
tree (`git stash -u`), so it predates this work. Suggested fix for whoever
owns profiles: update the pinned expectation to 2 (or rename the test).

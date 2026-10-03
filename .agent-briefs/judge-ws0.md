You are a delegate code judge. The orchestrator owns commits: do NOT modify any file, do NOT commit, push, or run `bd`. Write your verdict to `.agent-briefs/judge-ws0-result.md`.

# Task: judge the WS0 seam change (uncommitted working diff)

Repo: /home/lucas/DEV/Projects/ai-trainer-simulator, branch `feat/jev-npc-decision-steering`. The WS0 delegate installed the injection seam for the Jev NPC-steering feature. Your job: independent adversarial review of the CURRENT UNCOMMITTED diff (`git status --short; git diff` for tracked files; new files under `src/jev/`, `src/content/npc-content/`, `tests/unit/jev/`, `tests/unit/content/`, `scripts/content-volume.mjs` are untracked — read them directly).

**Context (read first):** `.agent-briefs/ws0-seam.md` (the brief), `.agent-briefs/ws0-seam-result.md` (the delegate's report incl. two documented deviations), `docs/ADR/0009-jev-npc-decision-steering.md` §3.8 and §10 (the seam's design intent).

**Judge these specifically:**
1. **Behavior preservation** — the whole point of WS0 is zero behavior change: legacy defaults must consume the shared rng at the same points in the same order; `Math.random` + `state.day` semantics in the `events.ts` destination path must be identical to the pre-seam direct call.
2. **Seam correctness** — resolution order (options.hooks → `jevDecisionHooks` holder → legacy default) is consistent at every call site; live-read semantics can't leave a stale hook installed; no hook can throw into the frame loop uncaught.
3. **Scope** — nothing outside the allowed file set was changed; no unrelated edits; no behavior change smuggled in.
4. **Test quality** — do the 17 new tests actually guard the seam (would they fail if someone flipped the resolution order or broke rng order)? Was the red→green + mutation evidence plausible?
5. **Type contract sanity** — `src/jev/contracts.ts` matches ADR §4 (discriminated answers; Noul has NO confidence field; hook signatures match real call sites, incl. `ScheduleEntry | null` for the destination).

**Verdict:** end the report with exactly one line: `VERDICT: PASS` or `VERDICT: FAIL — <one-line reason>`. Findings list: file:line, severity (blocker/major/minor), and the concrete fix. Do not restate the diff; judge it.

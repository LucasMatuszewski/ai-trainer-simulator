# Wave 1 phase QA fifth verdict: commit `ff89c54`

Reviewed an isolated archive of `ff89c54`; the later commits at `HEAD` were excluded. For the browser run only, the isolated spec used port 5174 and a 600 s reroute timeout. `pnpm typecheck` exited 0; `pnpm test` passed 964/964 tests in 87 files; both focused Chromium E2Es passed (31.7 s and 2.4 min); `git diff --check ff89c54^ ff89c54` exited 0.

The earlier repairs remain present: New Game creates save v2; the social reducer lazy-seeds, clamps, and saves, with a jsdom storage round-trip test; v1 is backed up before the first v2 write; the legacy hook defaults preserve the controller RNG order; the greeting wrapper is installed and prefetched in `main.ts`; WS1 adapter tests stub `fetch`; WS2's 30-day stability test uses a seeded RNG; the robot step uses traced axis legs; and the no-robot regression test exists. The shadow repair also works: the wrapper logs a separate `shadow` outcome without installing its hook, and unit tests pin both shadow and live counters.

## Findings

- **Major - a dodge can route the robot through furniture.** `src/engine/agent-companion.ts:89-100` checks the dodge point and only the `robot -> dodge` leg, then appends the original target without checking `dodge -> target`. `update()` follows that replacement path directly at `src/engine/agent-companion.ts:864-879`; the static planner is not called again. A desk between the dodge point and target can therefore be crossed despite the office-crossing E2E passing. The new avoidance path has no focused collision regression test.
- **Major - the reroute E2E can still pass without a detour.** `tests/e2e/ws9a-robot-collision.spec.ts:249-264` accepts `stoodBeside` when any NPC comes within 0.8 m, increments `provers`, and exits even if `lineThrough` is false. That branch asserts neither forward movement nor a path around the robot; the only clearance assertion there is the 0.3 m overlap check at lines 214-216. The test can pass on a close approach that stops beside the robot, so it does not establish the WS9a Playwright Done criterion.
- **Minor - the committed reroute timeout is still 240 s.** `tests/e2e/ws9a-robot-collision.spec.ts:150` and `playwright.config.ts:7-11` both specify 240 s. The 600 s allowance requested for this review was applied only in the isolated test copy; a normal run of the reviewed commit retains the shorter limit.

PHASE-VERDICT: FAIL — The dodge path can cross furniture, and the E2E does not prove NPC rerouting.

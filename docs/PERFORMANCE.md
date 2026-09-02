# Performance notes

This document records measured performance concerns and links to their canonical Beads work items. Beads remains the source of truth for task status and priority.

## Optimization candidates

- **Bound test and browser CPU usage (`sacs-m2b9`, optional / P4).** A local QA run saturated Lucas's CPU on 2026-09-02. Profile Vitest and Playwright separately before changing configuration. Likely levers are explicit Vitest worker limits, an explicit Playwright worker limit, and guaranteed browser teardown after screenshots/tests. Keep the lightweight Vite HMR server running for live preview; stop only finite test runners and automated Chromium sessions when QA finishes. Any optimization must retain the full suite and compare elapsed time as well as peak CPU, so a lower peak does not silently make feedback impractically slow.

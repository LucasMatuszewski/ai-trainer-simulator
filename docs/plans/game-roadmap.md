# Stack Underflow Game Roadmap

This is the repository-local navigation map for the long-running AI Trainer Simulator project. Beads epic `sacs-xtma` is the authoritative source for current status, priorities, dependencies, and ownership; this document explains how the product phases fit together without duplicating the live task tracker.

The former roadmap path, `~/.claude/plans/glistening-napping-hinton.md`, was referenced throughout early project history but was no longer present when plans were consolidated on 2026-09-02. This roadmap reconstructs only the phase structure that remains supported by the PRD, changelog, architecture record, and shipped code. It does not claim to reproduce missing text.

## Sources of truth

- Product requirements and acceptance criteria: [`../PRD.md`](../PRD.md)
- Historical decisions and supersessions: [`../CHANGELOG.md`](../CHANGELOG.md)
- Architecture decisions: [`../ADR/000-main-architecture.md`](../ADR/000-main-architecture.md)
- User feedback: [`../LUCAS-FEEDBACK-INDEX.md`](../LUCAS-FEEDBACK-INDEX.md)
- Live roadmap/backlog: Beads epic `sacs-xtma` and its child issues
- Code-bound execution plans: this directory

## Product progression

1. **Playable foundation:** stable first-person controls, dialogue lifecycle, day ending, saves, and test/visual-QA discipline.
2. **Office onboarding:** exterior introduction, Renata-led tutorial/help, quests, and a clear player HUD.
3. **Lived-in office simulation:** deterministic schedules, first-class Morning/Lunch/Afternoon/Evening time, arrivals/departures, movement, speech bubbles, random micro-events, and individual NPC behavior.
4. **Multi-room workplace:** main office, reception, kitchen, toilet, meeting room, CEO office, training room, reusable detailed props, and readable navigation.
5. **RPG-depth career play:** longer branching dialogue, memory and relationship consequences, meaningful economy/challenges, and quests that unfold through simulated work instead of completing instantly.
6. **Courses, appointments, and calendar:** a separately specified scheduler connecting training-room courses, clients, meetings, participant paths, and future calendar UI. Requirements discovery is tracked separately because its rules are not yet decided.
7. **Agent play through WebMCP:** player-safe tools and observability that let an AI agent play by the same rules as a human, including the OpenAI WebMCP challenge direction.
8. **Shared offices:** invite-code multiplayer for roughly 5–10 human and AI-agent players planning and playing together. This remains an endgame direction until the single-player mechanics and multiplayer PRD are ready.
9. **Polish and longevity:** audio/visual refinement, accessibility, performance, authored story variety, balance, automated regression coverage, and sustained replayability.

## Planning convention

Every new implementation plan belongs in `docs/plans` with a descriptive dated filename. Its frontmatter links the relevant Beads issues and approval state. Plans explain intended code changes; Beads records whether the work is queued, claimed, blocked, or complete. Completed plans stay in this directory as durable decision context.

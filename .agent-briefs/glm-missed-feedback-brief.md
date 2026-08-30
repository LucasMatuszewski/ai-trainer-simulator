# GLM brief — find missed feedback

You are reading two files. Do NOT touch them. Do NOT commit or push. Do NOT edit any other file.

## Inputs (read both end to end)

1. `.agent-briefs/ALL-LUCAS-FEEDBACK-THIS-SESSION.txt` — every user message Lucas sent during this session.
2. `docs/LUCAS-FEEDBACK-INDEX.md` — the feedback Lucas sent TODAY, already captured.

## Task

Find any feedback item, idea, design request, bug report, or feature request that Lucas sent in the session transcript that is NOT already in the feedback index. Be exhaustive.

## Output

Write to `.agent-briefs/MISSED-FEEDBACK.md`. Use this exact format:

```
# Missed feedback (this session)

Each entry: [msg #N | timestamp | category] one-line summary — exact quote.

## Visual bugs
- [msg #42 | 2026-08-30 12:34 | visual-bug] broken shadow on the chair — "the chair shadow looks like a smudge"

## Gameplay bugs
- ...

## Design ideas
- ...

## Content ideas
- ...

## Audio
- ...

## Controls
- ...

## NPCs / dialogue
- ...

## WebMCP / tooling
- ...

## Performance / quality
- ...

## Other
- ...
```

Group by category. Be specific. Include the exact text of the feedback. Do not invent items. If a category has nothing, omit the section.

Do not edit any other file. Do not commit. Do not push. Do not run any other commands. Just read the two files, then write the missed feedback file.

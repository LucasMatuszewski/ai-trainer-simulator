#!/usr/bin/env python3
"""Extract Lucas's user messages from the current Claude Code session
transcript. Saves them to a text file. Only meaningful messages
(content > 50 chars, no system/tool content).

Usage:
  python3 scripts/extract_lucas_feedback.py

Output: .agent-briefs/ALL-LUCAS-FEEDBACK-THIS-SESSION.txt
"""
import json
import sys
from pathlib import Path

# Find the most recent session transcript under .claude/projects/
home = Path.home()
projects = home / ".claude/projects"
candidates = sorted(
    projects.glob("*.jsonl"),
    key=lambda p: p.stat().st_mtime,
    reverse=True,
)
if not candidates:
    print("No transcript found", file=sys.stderr)
    sys.exit(1)

# Use the most recent one (this session)
src = candidates[0]
print(f"Reading from: {src}")

dst = Path(__file__).resolve().parent.parent / ".agent-briefs" / "ALL-LUCAS-FEEDBACK-THIS-SESSION.txt"
dst.parent.mkdir(parents=True, exist_ok=True)

messages = []
with src.open() as f:
    for line in f:
        try:
            d = json.loads(line)
        except Exception:
            continue
        if d.get("type") != "user":
            continue
        msg = d.get("message", {})
        if not isinstance(msg, dict):
            continue
        content = msg.get("content", "")
        ts = d.get("timestamp", "")
        text = ""
        if isinstance(content, list):
            for c in content:
                if isinstance(c, dict) and c.get("type") == "text":
                    text += c.get("text", "") + "\n"
        elif isinstance(content, str):
            text = content
        text = text.strip()
        if text and len(text) > 50:  # only meaningful messages
            messages.append((ts, text))

messages.sort(key=lambda x: x[0])

with dst.open("w") as f:
    f.write(f"# All Lucas user messages (filtered, > 50 chars)\n")
    f.write(f"# Source: {src.name}\n")
    f.write(f"# Total messages: {len(messages)}\n\n")
    for i, (ts, text) in enumerate(messages, 1):
        f.write(f"=== MESSAGE {i} (timestamp={ts}) ===\n")
        f.write(text)
        f.write("\n\n")

print(f"Wrote {len(messages)} user messages to {dst}")

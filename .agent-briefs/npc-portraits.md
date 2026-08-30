# Brief: design 13 NPC portrait sketches for AI Trainer Simulator

## Context

`AI Trainer Simulator` is a 3D pixel-art browser game. The 13 NPCs are 3D models in the office; we also need 2D portrait sprites for the dialogue UI (top of the dialogue box, ~96x96 pixels each, pixel-art style).

Lucas (the user) has approved the existing visual style: "I love the style and how the game looks like!" The portraits must match the existing style.

The 13 NPCs:
- **bartek** — Senior Consultant, team lead. Mid-30s, glasses, beard, looks like he's been doing this too long. Plain shirt, sleeves rolled up. Dry humor.
- **klaudia** — LinkedIn Influencer. Late 20s, big hair, always on her phone. Loud. Wears a blazer and a "CEO energy" outfit. Posts #blessed.
- **marek** — DevOps / 10x engineer. Late 20s, hoodie, headphones around neck, terminal in front of him. Looks like he hasn't slept.
- **zosia** — The Manager. Mid-40s, blazer, clipboard. Calm but tired. Sighs a lot.
- **pawel** — The Intern. Early 20s, big eyes, eager. Notebook in hand. Sweater with a university logo.
- **kasia** — The Recruiter. Late 20s, big smile, headset. Wears a "talent acquisition" shirt. Calls everyone "talent."
- **tomek** — Junior Developer. Mid-20s, hoodie, Stack Overflow tab always open. Caffeinated. Looks at you with the guilt of someone who pushed to main on Friday.
- **ania** — Marketing. Mid-20s, blazer, "synergy" t-shirt underneath. Talks in buzzwords.
- **janusz** — The Janitor. Late 50s, polo shirt, mop in hand. Knows everything. Speaks in proverbs.
- **burek** — Office Dog. Golden retriever. Tongue out. Best boy.
- **grazyna** — The Accountant. Mid-50s, glasses, blazer, calculator. Watches every penny.
- **maciek** — The CTO. Mid-40s, button-down shirt, expensive watch, slicked-back hair. Pivots to AI every 3 sentences. Says "let's circle back."
- **przemek** — Sales. Late 30s, suit, no tie, confident smile. "Let's take this offline."

## What I want from you (NO CODE, no images — text description only)

13 portrait sketches, each as a text description that's specific enough for a pixel artist to draw from. The format:

### Per NPC:
- **Name + role**
- **Pose** (front-facing, 3/4 view, side view, etc.)
- **Expression** (neutral / smiling / skeptical / etc.)
- **Hair color + style** (specific)
- **Skin tone** (specific)
- **Clothing** (specific items, colors)
- **Accessories** (glasses, headphones, watch, etc.)
- **Background** (transparent / solid color / simple scene hint)
- **Distinctive feature** (the one thing that makes this NPC instantly recognizable at 96x96)
- **Color palette** (3-5 main hex colors)

The description should be 200-400 words per NPC. Be specific. Avoid generic terms like "casual" — say "navy blue hoodie with the zipper halfway down" instead.

## Style requirements

- Pixel-art, retro (Amiga / SNES / PC-98 era)
- 16x16 to 96x96 internal size
- 16-32 color palette per portrait (not the full spectrum)
- The 13 portraits should feel like a SET (consistent style, consistent lighting, consistent background)
- The 13 portraits should be VISUALLY DISTINCT (you can tell them apart at 96x96 in a list)
- No anime / chibi / cartoon style — pixel-art realism
- The user is Lucas, who likes Amiga / retro style

## What to deliver

Write to `.agent-briefs/npc-portraits-report.md`. 13 sections, one per NPC. Do not commit. Do not push.

If you have thoughts on:
- The 16-color palette that anchors the whole set
- The 1-2 "signature" colors per NPC (so a player can identify them from across the room)
- Any NPC that doesn't work in pixel art (e.g. too detailed)

Include those in a "Notes for the pixel artist" section at the bottom.

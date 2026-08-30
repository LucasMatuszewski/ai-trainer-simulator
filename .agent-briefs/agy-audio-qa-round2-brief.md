# Brief for agy (Gemini 3.1 Pro): audio QA round 2 — verify the loudness fix

## Context
Round 1 of the audio QA (agy-audio-qa-report.md) flagged that
sfx_footstep_1 / sfx_footstep_2 are severely under-amplified
(-15.7 dB / -20.8 dB peak) — the player can barely hear them
when walking. I applied ffmpeg's `loudnorm` filter
(I=-16 LUFS, TP=-1.5 dB, LRA=11) to every SFX and wrote the
output to `public/assets/audio/sfx/.normalized/`.

## Task
1. Read the round-1 report (`.agent-briefs/agy-audio-qa-report.md`).
2. For each SFX, compare the original
   (`public/assets/audio/sfx/<id>.mp3`) and the normalized
   version (`public/assets/audio/sfx/.normalized/<id>.mp3`).
   You do not need to decode the audio; the file size and the
   ID3 frame size are usually enough to confirm the
   normalization worked. If the new file is meaningfully larger
   AND no clipping warning is shown, the loudness is better.
3. For the three SFX that round 1 said were "most urgent to
   fix" (sfx_typing_burst, sfx_footstep_1+2, sfx_glitch),
   state explicitly whether the .normalized version is OK to
   ship, or whether a real source replacement is still needed.
4. Append a "Round 2" section to
   `.agent-briefs/agy-audio-qa-report.md` below the existing
   "Summary" section. Do not edit the round-1 text.

## Output
Markdown only. Do not touch any other file. Do not commit. Do
not push.

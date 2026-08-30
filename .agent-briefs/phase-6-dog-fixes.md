# Phase 6.4 — Fix the dog mesh + head animation grouping

## Context

Lucas just reported (2026-08-30):

> "fix that pure dog!!! it has body in wrong direction! looks
>  strange... And all heads animations are detached from other
>  elements of heads both for human and dog. And add more
>  nimations to have more variants, not all same movement in the
>  same time..."

The screenshot confirms:

1. **The dog's body is backwards.** The head is on the wrong end
   — the snout is pointing at the rear of the dog, not the front.
   The four legs are arranged in the right pattern (front pair
   closer to where the head should be, back pair behind) but the
   head is at the back. The user sees a dog whose face is at its
   butt.

2. **The dog's ears are detached from the head.** They appear
   floating above the back of the body, not attached to the
   skull. The user sees two tiny brown squares hovering in space.

3. **The head animations are decoupled from the rest of the head
   for both humans and dog.** When the head "bobs" or "turns",
   the eyes and ears stay in place relative to the world, NOT
   relative to the head. The user sees the head move while the
   face stays put. This is the classic "parenting bug" — the
   head's eyes/ears were added as separate root-level children of
   the NPC group, not as children of the head mesh.

4. **All NPCs animate identically at the same time.** The
   user wants each NPC to be on its OWN animation schedule
   (desynchronized) and to have MORE animation variants (not
   just the few listed in the plan, but more like tail-wagging,
   ear-twitching, head-scratching, etc.).

## Files to read

- `src/engine/npc-mesh.ts` — the gendered body and dog mesh
  factories. The dog has the body, head, snout, ears, eyes, tail,
  legs, and collar. The bug: the head is at the wrong end of
  the body, and the eyes/ears are probably not parented to the
  head.
- `src/engine/npc-idle.ts` — the per-NPC idle animation
  updater. The bug: the "head bob" and "head look" animations
  translate/rotate the head, but if the eyes and ears are NOT
  children of the head, they don't follow.
- `tests/unit/npc-mesh.test.ts` — existing tests for the dog mesh.
- `tests/unit/npc-idle.test.ts` — existing tests for idle.

## What to deliver

### 1. Fix the dog mesh

In `src/engine/npc-mesh.ts`, the dog's "createDogMesh" function
(or however the dog is named) has the head at the wrong end of
the body. Find the head's z-offset relative to the body and
FLIP ITS SIGN. For example, if the current code has:

```ts
const head = new THREE.Mesh(...);
head.position.set(0, 0.55, bodyLength / 2 + 0.2); // head at +Z (front)
```

and the snout is at +Z (further front) but the eyes/ears are at
-Z (back), the head is on the wrong end. The fix is either:

- Move the head to -Z and the snout, eyes, ears, tail to the
  correct ends; OR
- If the head is at -Z (back) and the snout is at +Z (front) but
  the body is oriented incorrectly, rotate the body 180°
  around the Y axis.

The fix depends on the current state. The simplest way to debug:
READ the current code in `createDogMesh` and figure out which
end the head is on. The dog should look like this from above:

```
        snout (front, +Z if Y is up and dog faces -Z)
       /
    head
   /    \
  ear  ear
  |
  body (long box)
  |    \
  leg  leg
  |    |
  leg  leg
       |
      tail (back, -Z)
```

Where +Z is "forward" (where the dog walks). The current
implementation may have the head on the wrong end — fix by
moving the head (and all its children: snout, ears, eyes) to
+Z (forward), and the tail to -Z (backward).

Also fix the ears: they should be attached to the head as
children, not floating in space. E.g.:

```ts
const head = new THREE.Group();
head.position.set(0, 0.55, bodyLength / 2 + 0.2);
const headMesh = new THREE.Mesh(...);
head.add(headMesh);
const leftEar = new THREE.Mesh(...);
leftEar.position.set(-0.15, 0.25, 0);
head.add(leftEar);
const rightEar = ...;
head.add(rightEar);
const leftEye = ...;
leftEye.position.set(-0.1, 0.05, 0.2);
head.add(leftEye);
const rightEye = ...;
head.add(rightEye);
const snout = new THREE.Mesh(...);
snout.position.set(0, -0.1, 0.2);
head.add(snout);
group.add(head);
```

This way the ears and eyes move WITH the head when the head bobs
or turns.

### 2. Fix the human mesh too

The current human mesh has eyes (and possibly hair) added as
top-level children of the NPC group, not as children of the head.
Apply the same fix: any sub-part of the head (eyes, hair, ears
for females with longer hair) should be a child of the head
group, not the body group.

For the existing code in `makeNpcMarker` (or the factory
function in `npc-mesh.ts`):

```ts
// BEFORE (broken):
const head = new THREE.Mesh(...);
head.position.set(0, 1.25, 0);
group.add(head);
const leftEye = new THREE.Mesh(...);
leftEye.position.set(-0.1, 1.3, 0.255);
group.add(leftEye); // ← attached to group, not head

// AFTER (fixed):
const headGroup = new THREE.Group();
headGroup.position.set(0, 1.25, 0);
const headMesh = new THREE.Mesh(...);
headGroup.add(headMesh);
const leftEye = new THREE.Mesh(...);
leftEye.position.set(-0.1, 0.05, 0.255);
headGroup.add(leftEye); // ← attached to head
group.add(headGroup);
```

The head bobs and turns: the eyes follow because they're
children of the head.

### 3. Desynchronize NPC animations

In `src/engine/npc-idle.ts`, the timing windows (4-8s for typing,
5-10s for look, etc.) are deterministic — every NPC's first
animation fires at roughly the same time relative to the page
load. Fix by seeding each NPC's `IdleState` with a per-NPC offset
based on the NPC's id (a hash of the string).

For example:

```ts
function hashNpcId(id: string): number {
  let h = 0;
  for (const c of id) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

export function createInitialIdleState(
  now: number,
  npcId?: string,
): IdleState {
  const offset = npcId ? (hashNpcId(npcId) % 4000) / 1000 : 0; // 0-4s offset
  return {
    nextTypeAt: now + 4 + Math.random() * 4 + offset,
    nextLookAt: now + 5 + Math.random() * 5 + offset,
    // ... etc.
  };
}
```

Also add MORE variants to the animation list. Beyond the existing
type/stretch/look/sip/lean, add:

- **Ear twitch** (human + dog): every 6-12s, the ear mesh
  rotates by 0.1 rad for 0.2s.
- **Tail wag** (dog only): every 1-2s, the tail rotates by
  0.2 rad back and forth, 0.3s period.
- **Head scratch** (human only): every 30-60s, the arm mesh
  raises toward the head for 0.5s.
- **Bounce/squash** (any): every 8-15s, the body scales by
  1.05 on Y for 0.15s.

### 4. Test it

`tests/unit/dog-mesh-fixes.test.ts`:
- The dog's head's z-position is POSITIVE (forward) and the
  tail's z-position is NEGATIVE (backward). The dog faces
  +Z (forward) and the tail is at -Z.
- The dog's head is a `THREE.Group` (not a `Mesh`) that contains
  at least the head mesh, two ear meshes, and two eye meshes.
- The dog's body is a parent group, and the head group is a
  child of the body group.

`tests/unit/npc-mesh-parenting.test.ts`:
- The male NPC mesh's head is a `THREE.Group` that contains at
  least the head mesh, two eye meshes, and the hair mesh.
- The female NPC mesh's head is a `THREE.Group` that contains
  at least the head mesh, two eye meshes, and the long-hair
  mesh.
- Walking the head (translating by 0.1m on Y, then back) makes
  the eye meshes move by 0.1m too (proves the parenting).

`tests/unit/npc-idle-desync.test.ts`:
- Two NPCs with different ids have different `nextTypeAt`
  values at the same `now` (proves desync).
- Two NPCs with the same id have the same `nextTypeAt` (deterministic).

### 5. Constraints

- Do NOT remove the existing tests; extend them.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-dog-fixes-sol.md`.

## Definition of done

- The dog mesh has the head on the FRONT end (+Z) and the tail on
  the BACK end (-Z). Ears and eyes are children of the head.
- The human mesh has the same parenting fix.
- The NPC idle animations are desynchronized per NPC id.
- At least two new animation variants are added (ear twitch, tail
  wag, head scratch, or bounce).
- `pnpm test` (full suite) still passes.
- The brief's report is written.

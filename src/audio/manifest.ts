/// <reference types="vite/client" />
/**
 * Audio manifest types + loader.
 *
 * The gen-assets.mjs script writes src/assets/audio/manifest.json with all the
 * MP3 paths it generated. We load that file at startup and use it to resolve
 * any id (e.g. "bartek_greeting", "sfx_click", "music_title") to a URL.
 *
 * If the manifest is missing or an id is not present, callers get null and
 * the AudioManager just silently skips playback (game keeps working).
 */

export interface ManifestEntry {
  path: string; // repo-relative, e.g. "src/assets/audio/speech/bartek_greeting.mp3"
  kind: "tts" | "music" | "sfx-tts";
  meta: Record<string, unknown>;
  bytes: number;
  ms: number; // generation time
}

export interface Manifest {
  generated: Record<string, ManifestEntry>;
  failed: Record<string, { error: string; ts: number }>;
}

let cached: Promise<Manifest | null> | null = null;

export function loadManifest(): Promise<Manifest | null> {
  if (cached) return cached;
  cached = (async () => {
    try {
      const r = await fetch(import.meta.env.BASE_URL + "assets/audio/manifest.json", { cache: "no-cache" });
      if (!r.ok) return null;
      return (await r.json()) as Manifest;
    } catch {
      return null;
    }
  })();
  return cached;
}

/** Resolve a manifest id to a browser-loadable URL. Returns null if not found. */
export function resolveUrl(manifest: Manifest | null, id: string): string | null {
  if (!manifest) return null;
  const e = manifest.generated[id];
  if (!e) return null;
  // Manifest paths are like "public/assets/audio/speech/x.mp3" (the gen-assets
  // script writes to public/ so Vite copies them as-is). Strip the leading
  // "public/" (or the older "src/assets/") and prefix the base.
  const rel = e.path.replace(/^public\//, "").replace(/^src\/assets\//, "assets/");
  return import.meta.env.BASE_URL + rel;
}

/** Get the meta blob for an entry (e.g. { use: "footstep", npc: "bartek" }). */
export function getMeta(manifest: Manifest | null, id: string): Record<string, unknown> | null {
  if (!manifest) return null;
  return manifest.generated[id]?.meta ?? null;
}

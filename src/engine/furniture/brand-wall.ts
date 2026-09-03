/**
 * Reception brand wall: "MADE BY" painted on the wall, with the Edukey and
 * DevPowers logos mounted below it as standoff signage.
 *
 * Lucas, 2026-09-03: a room-name plaque is fine for "MEETING ROOM" but wrong
 * for branding. "Made by" should read as paint applied directly to the wall,
 * and the logos should be the real SVGs, stacked, in the style of the raised
 * letters you actually see behind a reception desk.
 *
 * WHY FAKE THE 3D RATHER THAN EXTRUDE THE PATHS
 * Extruding the SVG outlines (SVGLoader + ExtrudeGeometry) would be true
 * geometry, but these marks are thousands of path segments each, the game
 * renders at a 480x270 internal buffer where that detail is invisible, and
 * real depth would need a shadow-casting setup the scene does not run. The
 * standoff illusion - the mark floating a few centimetres off the wall with
 * its own soft drop shadow behind it - is what the eye actually reads as
 * "raised letters", and it costs two textured planes per logo.
 *
 * TWO ASSET HAZARDS, BOTH HANDLED IN normaliseSvg():
 *  - The Edukey marks are pure white (fill="#fff"), which is invisible on a
 *    light wall.
 *  - The DevPowers marks are drawn with `currentColor` plus an internal
 *    `@media (prefers-color-scheme: dark)` rule, so rasterising them as-is
 *    makes the wall logo change colour with the VIEWER'S OS THEME.
 * Both are recoloured to an explicit ink before rasterising, so the wall
 * looks the same for everyone. Both marks are single-colour, so recolouring
 * is faithful rather than a distortion of the brand.
 */

import * as THREE from "three";

/**
 * Brushed-aluminium ink for the mounted letters.
 *
 * Light, not dark: the reception wall is a deep desaturated green, so the
 * graphite tone tried first was nearly invisible on it. Pale metal letters
 * on a dark wall is also the more convincing reception look, and it is what
 * both marks are natively drawn in (`fill="#fff"`), so this is closer to the
 * source artwork rather than further from it.
 */
export const LOGO_INK = "#e9eff5";

/** Wall paint for "MADE BY": a shade off the wall, like a stencil. */
export const PAINT_INK = "rgba(206, 220, 210, 0.55)";

/** How far the logo planes stand off the wall, in metres. */
export const STANDOFF = 0.045;

/** Texture resolution per metre of logo width. */
const PIXELS_PER_METRE = 512;

export interface BrandLogoSpec {
  url: string;
  /** Width on the wall, in metres. Height follows the SVG's aspect ratio. */
  width: number;
  /** Vertical centre of this logo, in metres above the floor. */
  y: number;
}

/**
 * Force a single-colour SVG to a known ink.
 *
 * Strips any embedded dark-mode rule first: a `@media (prefers-color-scheme:
 * dark)` block inside the SVG is honoured by the browser when it rasterises
 * the image, so without this the DevPowers mark flips to near-white for any
 * player whose OS is in dark mode - on a light wall, that is an invisible
 * logo, and it would have been invisible only for some players.
 */
export function normaliseSvg(source: string, ink: string): string {
  return source
    .replace(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{[^}]*\{[^}]*\}\s*\}/g, "")
    .replace(/currentColor/g, ink)
    .replace(/fill="#fff"/gi, `fill="${ink}"`)
    .replace(/fill="#ffffff"/gi, `fill="${ink}"`)
    .replace(/color:\s*#[0-9a-fA-F]{3,6}/g, `color:${ink}`)
    .replace(/fill:\s*#[0-9a-fA-F]{3,6}/g, `fill:${ink}`);
}

/** Rasterise an SVG string into a canvas of the given pixel width. */
async function rasterise(svg: string, pixelWidth: number): Promise<HTMLCanvasElement> {
  const image = new Image();
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await image.decode();

  const aspect = image.naturalHeight / image.naturalWidth || 1;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(pixelWidth));
  canvas.height = Math.max(1, Math.round(pixelWidth * aspect));
  canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/** A blurred, darkened copy of the mark, used as the drop shadow. */
function shadowFrom(source: HTMLCanvasElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const context = canvas.getContext("2d");
  if (context) {
    context.filter = "blur(6px)";
    context.drawImage(source, 0, 0);
    // Paint every opaque pixel black, keeping the blurred alpha.
    context.filter = "none";
    context.globalCompositeOperation = "source-in";
    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  return canvas;
}

function planeFrom(canvas: HTMLCanvasElement, width: number, lit: boolean): THREE.Mesh {
  const texture = new THREE.CanvasTexture(canvas);
  // Linear filtering, NOT the NearestFilter the room signs use: these are
  // real vector marks, and nearest-neighbour turns their curves into jagged
  // steps. The pixel-art look here comes from the low render buffer, which
  // resamples the whole frame anyway.
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 4;

  const height = width * (canvas.height / canvas.width);
  return new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    lit
      ? new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
          // A little self-illumination so the mark stays legible when the
          // reception's single point light is on the far side of the room.
          emissive: new THREE.Color(0x6f7b86),
          emissiveMap: texture,
          depthWrite: false,
        })
      : new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false }),
  );
}

/** "MADE BY", drawn as paint on the wall rather than on a plate. */
function makePaintedCaption(text: string, width: number, y: number): THREE.Mesh {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    // No clearRect: a freshly created canvas is already fully transparent,
    // and the call is the one 2D API the unit tests' context stub omits.
    context.fillStyle = PAINT_INK;
    context.font = "600 62px 'Press Start 2P', monospace";
    context.textAlign = "center";
    context.textBaseline = "middle";
    // Letter-spaced by hand: canvas letterSpacing is not universally
    // supported, and the spacing is what makes it read as signage paint.
    const spacing = 10;
    const glyphs = [...text];
    const total = glyphs.reduce((sum, g) => sum + context.measureText(g).width + spacing, -spacing);
    let cursor = canvas.width / 2 - total / 2;
    for (const glyph of glyphs) {
      const advance = context.measureText(glyph).width;
      context.fillText(glyph, cursor + advance / 2, canvas.height / 2);
      cursor += advance + spacing;
    }
  }
  const mesh = planeFrom(canvas, width, false);
  mesh.name = "brand-wall-caption";
  // Flush against the wall: this one is paint, not a mounted object.
  mesh.position.set(0, y, 0.004);
  return mesh;
}

/**
 * Build the brand wall. The group is returned synchronously and the logo
 * planes are attached when their SVGs finish rasterising, so scene building
 * never waits on the network.
 */
export function makeBrandWall(
  logos: readonly BrandLogoSpec[] = DEFAULT_LOGOS,
  captionY = 2.5,
): THREE.Group {
  const group = new THREE.Group();
  group.name = "brand-wall";
  group.add(makePaintedCaption("MADE BY", 0.95, captionY));

  for (const logo of logos) {
    void (async () => {
      try {
        const response = await fetch(logo.url);
        if (!response.ok) return;
        const canvas = await rasterise(
          normaliseSvg(await response.text(), LOGO_INK),
          logo.width * PIXELS_PER_METRE,
        );

        const shadow = planeFrom(shadowFrom(canvas), logo.width, false);
        shadow.name = "brand-wall-logo-shadow";
        // Behind and slightly down-right of the mark: the offset is what
        // sells the letters as standing off the wall.
        shadow.position.set(0.022, logo.y - 0.022, STANDOFF * 0.3);
        shadow.renderOrder = 0;
        group.add(shadow);

        const mark = planeFrom(canvas, logo.width, true);
        mark.name = "brand-wall-logo";
        mark.position.set(0, logo.y, STANDOFF);
        mark.renderOrder = 1;
        group.add(mark);
      } catch {
        // A missing asset must never break the room. The painted caption
        // still reads, and the wall is simply bare below it.
      }
    })();
  }

  return group;
}

/**
 * Edukey wordmark above the DevPowers vertical lockup (Lucas: "we can use
 * vertical version of devpowers now"). Edukey's mark is wide and short, so
 * it gets more width and less height than the DevPowers stack.
 */
export const DEFAULT_LOGOS: readonly BrandLogoSpec[] = [
  // The widths are tuned so the two brands read as equals: Edukey's file is
  // a wordmark alone, while the DevPowers vertical lockup spends most of its
  // height on the emblem, so matching their raw widths would leave the
  // DevPowers TEXT looking half the size of Edukey's.
  { url: "/assets/edukey/logo-edukey.svg", width: 1.4, y: 2.02 },
  { url: "/assets/devpowers/logo.svg", width: 1.28, y: 1.2 },
];

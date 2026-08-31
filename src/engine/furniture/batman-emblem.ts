/**
 * The classic Batman emblem: a yellow ellipse with the black bat
 * silhouette (pointed ears, swept wings, scalloped bottom edge).
 * L-2026-08-31-04 #4: "Make it huge on whole wall, in black
 * background. Make it identical to real Batman logo."
 *
 * The bat is a hand-tuned polygon that follows the classic comic
 * logo: two thin ear spikes, wings that sweep out and slightly up
 * to sharp tips, three scallop points per wing on the bottom
 * edge, and the center tail dropping to a point. Coordinates are
 * normalized to the ellipse radii so the ears and wing tips
 * touch the ellipse edge exactly like the real mark.
 */

/** Normalized bat outline, right half from the top of the head,
 *  clockwise to the tail tip. Mirror for the left half. */
const BAT_HALF: ReadonlyArray<readonly [number, number]> = [
  [0.0, -0.6], // top of head
  [0.1, -0.62], // head right shoulder
  [0.15, -0.98], // right ear tip (touches ellipse)
  [0.24, -0.64], // ear outer base
  [0.42, -0.66], // wing top rise
  [0.92, -0.4], // upper wing edge
  [0.98, -0.26], // wing tip (touches ellipse)
  [0.8, 0.04], // scallop 1 peak
  [0.68, -0.06], // scallop 1 valley
  [0.58, 0.12], // scallop 2 peak
  [0.45, 0.02], // scallop 2 valley
  [0.35, 0.18], // scallop 3 peak
  [0.22, 0.08], // scallop 3 valley
  [0.14, 0.2], // inner peak
  [0.0, 0.58], // tail tip
];

export function drawBatmanEmblem(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
): void {
  if (
    typeof context.beginPath !== "function" ||
    typeof context.ellipse !== "function" ||
    typeof context.fill !== "function"
  ) return;

  // Black background covering the whole wall sign.
  context.fillStyle = "#060608";
  context.fillRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2;
  const radiusX = width * 0.46;
  const radiusY = height * 0.44;

  // Yellow ellipse.
  context.fillStyle = "#ffcf1f";
  context.beginPath();
  context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  context.fill();

  // Black bat, mirrored from the half outline.
  context.fillStyle = "#060608";
  context.beginPath();
  const toPoint = (x: number, y: number): [number, number] => [
    centerX + x * radiusX,
    centerY + y * radiusY,
  ];
  const [startX, startY] = toPoint(BAT_HALF[0]![0], BAT_HALF[0]![1]);
  context.moveTo(startX, startY);
  for (let index = 1; index < BAT_HALF.length; index += 1) {
    const [x, y] = toPoint(BAT_HALF[index]![0], BAT_HALF[index]![1]);
    context.lineTo(x, y);
  }
  // Mirror: walk the half back up with negated x.
  for (let index = BAT_HALF.length - 2; index >= 0; index -= 1) {
    const [x, y] = toPoint(-BAT_HALF[index]![0], BAT_HALF[index]![1]);
    context.lineTo(x, y);
  }
  context.closePath();
  context.fill();
}

/**
 * A real bookshelf (L-2026-08-31, screenshot #48: the old
 * placeholder was one huge brown box). Wooden frame with four
 * shelves, rows of individually colored and sized books (a few
 * leaning), and small decor items on top: a trophy and a plant.
 *
 * The unit is 0.7 deep x 4 wide x 2.5 tall, standing against a
 * wall; local origin at floor level, centered.
 */
import * as THREE from "three";

const WOOD = 0x4a3320;
const WOOD_DARK = 0x3a2617;
const BOOK_COLORS = [0x6d3a3a, 0x3a5a6d, 0x5a6d3a, 0x6d5a3a, 0x4a3a5a, 0x7a4a2a, 0x2f4f4f];

function box(
  name: string,
  dimensions: [number, number, number],
  material: THREE.Material,
  position: [number, number, number],
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...dimensions), material);
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

/** One row of books along a shelf segment, with varied heights,
 *  colors and one leaning book near the end. */
function makeBookRow(
  startIndex: number,
  startX: number,
  endX: number,
  y: number,
): THREE.Group {
  const group = new THREE.Group();
  group.name = "book-row";
  let x = startX;
  let index = startIndex;
  while (x < endX - 0.12) {
    const width = 0.05 + ((index * 13) % 3) * 0.015;
    const height = 0.3 + ((index * 7) % 4) * 0.03;
    const color = BOOK_COLORS[index % BOOK_COLORS.length]!;
    const book = box(
      "book",
      [width, height, 0.24],
      new THREE.MeshLambertMaterial({ color }),
      [x + width / 2, y + height / 2, 0],
    );
    // Every 5th book leans against the next one.
    if (index % 5 === 4) {
      book.rotation.z = 0.12;
      book.position.y += 0.02;
    }
    group.add(book);
    x += width + 0.012;
    index += 1;
  }
  return group;
}

export function makeBookshelf(): THREE.Group {
  const group = new THREE.Group();
  group.name = "bookshelf";

  const wood = new THREE.MeshLambertMaterial({ color: WOOD });
  const woodDark = new THREE.MeshLambertMaterial({ color: WOOD_DARK });

  const WIDTH = 4;
  const HEIGHT = 2.5;
  const DEPTH = 0.7;
  const SHELF_COUNT = 4;
  const shelfGap = (HEIGHT - 0.3) / SHELF_COUNT;

  // Side panels, top and back.
  group.add(box("shelf-side-left", [0.08, HEIGHT, DEPTH], wood, [-WIDTH / 2 + 0.04, HEIGHT / 2, 0]));
  group.add(box("shelf-side-right", [0.08, HEIGHT, DEPTH], wood, [WIDTH / 2 - 0.04, HEIGHT / 2, 0]));
  group.add(box("shelf-top", [WIDTH, 0.08, DEPTH], wood, [0, HEIGHT - 0.04, 0]));
  group.add(box("shelf-back", [WIDTH - 0.16, HEIGHT, 0.05], woodDark, [0, HEIGHT / 2, -DEPTH / 2 + 0.025]));

  // Shelves with book rows (the top surface stays decorated below).
  for (let shelf = 0; shelf < SHELF_COUNT; shelf += 1) {
    const y = 0.1 + shelf * shelfGap;
    group.add(box("shelf-board", [WIDTH - 0.16, 0.05, DEPTH - 0.08], wood, [0, y, 0.02]));
    // Leave a breathing gap in the middle of one shelf for a
    // small photo frame + bookend look.
    const isDisplayShelf = shelf === 2;
    if (isDisplayShelf) {
      group.add(makeBookRow(shelf, -WIDTH / 2 + 0.12, -0.6, y + 0.025));
      group.add(makeBookRow(shelf + 3, 0.6, WIDTH / 2 - 0.12, y + 0.025));
      // A small framed picture standing on the shelf.
      group.add(box("shelf-picture", [0.36, 0.28, 0.03], new THREE.MeshLambertMaterial({ color: 0x8a7a5a }), [0, y + 0.17, 0.05]));
      group.add(box("shelf-picture-inner", [0.3, 0.22, 0.01], new THREE.MeshLambertMaterial({ color: 0xbfd0d8 }), [0, y + 0.17, 0.068]));
    } else {
      group.add(makeBookRow(shelf, -WIDTH / 2 + 0.12, WIDTH / 2 - 0.12, y + 0.025));
    }
  }

  // On top: a small trophy and a potted plant.
  const trophyCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.05, 0.12, 10),
    new THREE.MeshLambertMaterial({ color: 0xb8912f }),
  );
  trophyCup.name = "shelf-trophy";
  trophyCup.position.set(-1.2, HEIGHT + 0.14, 0);
  group.add(trophyCup);
  const trophyBase = box("shelf-trophy-base", [0.14, 0.06, 0.14], new THREE.MeshLambertMaterial({ color: 0x2c2c34 }), [-1.2, HEIGHT + 0.05, 0]);
  group.add(trophyBase);

  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.07, 0.16, 8),
    new THREE.MeshLambertMaterial({ color: 0x8a4a2a }),
  );
  pot.name = "shelf-plant-pot";
  pot.position.set(1.3, HEIGHT + 0.08, 0);
  group.add(pot);
  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 8, 6),
    new THREE.MeshLambertMaterial({ color: 0x2f8f3f }),
  );
  leaves.name = "shelf-plant-leaf";
  leaves.position.set(1.3, HEIGHT + 0.26, 0);
  group.add(leaves);

  return group;
}

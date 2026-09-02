/** @vitest-environment jsdom */

import { beforeAll, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { drawBatmanEmblem } from "../../src/engine/furniture/batman-emblem";
import { makeCeilingLight } from "../../src/engine/furniture/ceiling-light";
import { makeCoffeeTable } from "../../src/engine/furniture/coffee-table";
import { makeExecutiveChair } from "../../src/engine/furniture/executive-chair";
import { makeExecutiveDesk } from "../../src/engine/furniture/executive-desk";
import { makeGarden, GARDEN_BOUNDS, makeOutdoorScenery } from "../../src/engine/furniture/garden";
import { makeSofa } from "../../src/engine/furniture/sofa";
import { makeBookshelf } from "../../src/engine/furniture/bookshelf";
import { makeToiletStall } from "../../src/engine/furniture/toilet-stall";
import { makeToiletSink } from "../../src/engine/furniture/toilet-sink";
import { makeUrinal } from "../../src/engine/furniture/urinal";
import { makeReceptionDesk } from "../../src/engine/furniture/reception-desk";
import { makePlantWall } from "../../src/engine/furniture/plant-wall";
import { makeDeskLedBar } from "../../src/engine/furniture/desk-lights";
import { makeReceptionSofa } from "../../src/engine/furniture/reception-sofa";
import { makeReceptionCoffeeTable } from "../../src/engine/furniture/reception-coffee-table";
import { makeLobbyPlanter } from "../../src/engine/furniture/lobby-planter";
import { makeGlassDoors } from "../../src/engine/furniture/glass-doors";
import { makeXeroxPrinter } from "../../src/engine/furniture/xerox-printer";
import { makeReceptionGarden } from "../../src/engine/furniture/reception-garden";

function namedChildren(group: THREE.Object3D): string[] {
  return group.children.flatMap((child) =>
    child.name === "" ? [] : [child.name],
  );
}

describe("executive desk (C-44 #1 + #2)", () => {
  it("puts the desktop surface at a real desk height, not a reception counter", () => {
    const desk = makeExecutiveDesk();
    const top = desk.getObjectByName("desk-top") as THREE.Mesh;
    // Surface = center 0.72 + half height 0.03 = 0.75m.
    expect(top.position.y + 0.03).toBeCloseTo(0.75, 2);
  });

  it("carries the laptop, the second monitor and the premium details", () => {
    const desk = makeExecutiveDesk();
    for (const name of [
      "laptop-base",
      "laptop-lid",
      "laptop-screen",
      "monitor-bezel",
      "monitor-screen",
      "desk-nameplate",
      "desk-plant-pot",
      "desk-mug",
      "desk-book-0",
      "desk-book-1",
      "desk-book-2",
    ]) {
      expect(desk.getObjectByName(name), name).toBeDefined();
    }
  });

  it("faces the screens north toward the CEO seat", () => {
    const desk = makeExecutiveDesk();
    const monitorScreen = desk.getObjectByName("monitor-screen") as THREE.Mesh;
    // Plane default faces +Z; PI flips it to -Z (north).
    expect(monitorScreen.rotation.y).toBeCloseTo(Math.PI, 5);
  });
});

describe("executive chair (C-44 #3)", () => {
  it("is a real chair with seat, tall back, headrest, column, armrests and wheels", () => {
    const chair = makeExecutiveChair();
    for (const name of ["chair-seat", "chair-back", "chair-headrest", "chair-column"]) {
      expect(chair.getObjectByName(name), name).toBeDefined();
    }
    expect(namedChildren(chair).filter((name) => name === "chair-wheel")).toHaveLength(4);
    expect(namedChildren(chair).filter((name) => name === "chair-armrest")).toHaveLength(2);
  });
});

describe("ceiling light (C-44 #7)", () => {
  it("renders a visible self-lit lamp face in the fixture", () => {
    const light = makeCeilingLight();
    const lamp = light.getObjectByName("ceiling-light-lamp") as THREE.Mesh;
    expect(lamp).toBeDefined();
    expect((lamp.material as THREE.MeshBasicMaterial).color.getHex()).toBe(0xfff2cc);
  });
});

describe("sofa and coffee table (C-44 #8)", () => {
  it("builds a sofa with cushions and armrests", () => {
    const sofa = makeSofa();
    for (const name of ["sofa-base", "sofa-seat-left", "sofa-seat-right", "sofa-back-left", "sofa-arm-left", "sofa-arm-right"]) {
      expect(sofa.getObjectByName(name), name).toBeDefined();
    }
  });

  it("builds a bookshelf with shelves, books and decor, not one brown box", () => {
    const shelf = makeBookshelf();
    for (const name of ["shelf-side-left", "shelf-side-right", "shelf-top", "shelf-back", "shelf-trophy", "shelf-plant-pot"]) {
      expect(shelf.getObjectByName(name), name).toBeDefined();
    }
    expect(shelf.children.filter((child) => child.name === "shelf-board")).toHaveLength(4);
    expect(shelf.children.filter((child) => child.name === "book-row").length).toBeGreaterThanOrEqual(3);
    const books = shelf.children.flatMap((row) => row.children);
    expect(books.filter((book) => book.name === "book").length).toBeGreaterThanOrEqual(20);
  });

  it("builds a coffee table with a translucent glass top", () => {
    const table = makeCoffeeTable();
    const top = table.getObjectByName("coffee-table-top") as THREE.Mesh;
    expect(top).toBeDefined();
    expect((top.material as THREE.MeshLambertMaterial).transparent).toBe(true);
  });
});

describe("garden and outdoor scenery (C-44 #9)", () => {
  it("plants trees and grass inside the courtyard bounds", () => {
    const garden = makeGarden();
    const trees = garden.children.filter((child) => child.name === "tree");
    expect(trees.length).toBeGreaterThanOrEqual(5);
    for (const tree of trees) {
      expect(tree.position.x).toBeGreaterThanOrEqual(GARDEN_BOUNDS.minX);
      expect(tree.position.x).toBeLessThanOrEqual(GARDEN_BOUNDS.maxX);
      expect(tree.position.z).toBeGreaterThanOrEqual(GARDEN_BOUNDS.minZ);
      expect(tree.position.z).toBeLessThanOrEqual(GARDEN_BOUNDS.maxZ);
    }
  });

  it("gives the outdoor scenery a sun facing west toward the glass", () => {
    const outdoor = makeOutdoorScenery();
    const sun = outdoor.getObjectByName("outdoor-sun") as THREE.Mesh;
    expect(sun).toBeDefined();
    expect(sun.rotation.y).toBeCloseTo(-Math.PI / 2, 5);
    expect(outdoor.children.some((child) => child.name === "outdoor-hill")).toBe(true);
  });
});

describe("modern reception furniture (C-64)", () => {
  it("builds a raised reception counter with monitor, phone, paper and flowers", () => {
    const desk = makeReceptionDesk();
    const top = desk.getObjectByName("desk-top") as THREE.Mesh;
    expect(top.position.y + 0.025).toBeCloseTo(0.83, 2);
    for (const name of ["desk-ledge", "desk-monitor-screen", "desk-phone-handset", "desk-paper", "desk-vase", "desk-flower-bloom"]) {
      expect(desk.getObjectByName(name), name).toBeDefined();
    }
    expect(desk.children.filter((child) => child.name === "complimentary-dongle")).toHaveLength(5);
  });

  it("makes the plant wall dense, instanced and multi-toned", () => {
    const wall = makePlantWall();
    const leaves = wall.children.filter((child): child is THREE.InstancedMesh => child instanceof THREE.InstancedMesh);
    expect(leaves).toHaveLength(4);
    expect(leaves.reduce((sum, leaf) => sum + leaf.count, 0)).toBeGreaterThan(140);
    expect(new Set(leaves.map((leaf) => (leaf.material as THREE.MeshLambertMaterial).color.getHex())).size).toBe(4);
    expect(wall.children.filter((child) => child.name === "pw-flower")).toHaveLength(12);
  });

  it("uses self-lit cores and three downlights without creating real lights", () => {
    const lights = makeDeskLedBar();
    const core = lights.getObjectByName("led-core") as THREE.Mesh;
    expect(core.material).toBeInstanceOf(THREE.MeshBasicMaterial);
    expect(lights.children.filter((child) => child.name === "down-lamp")).toHaveLength(3);
    expect(lights.children.some((child) => child instanceof THREE.Light)).toBe(false);
  });

  it("builds a navy lobby sofa with two cushions, arms and two accent pillows", () => {
    const sofa = makeReceptionSofa();
    for (const name of ["sofa-seat-left", "sofa-seat-right", "sofa-back-left", "sofa-arm-left", "sofa-arm-right", "sofa-pillow", "sofa-pillow-2"]) {
      expect(sofa.getObjectByName(name), name).toBeDefined();
    }
  });

  it("adds magazines and the visitor SLA binder to the reception table", () => {
    const table = makeReceptionCoffeeTable();
    expect(table.getObjectByName("agile-waterfall-magazine")).toBeDefined();
    expect(table.getObjectByName("exit-vim-magazine")).toBeDefined();
    expect(table.getObjectByName("visitor-log-sign-the-sla")).toBeDefined();
  });

  it("builds a flowering planter that scales as one prop", () => {
    const planter = makeLobbyPlanter(0.85);
    expect(planter.scale.x).toBeCloseTo(0.85);
    expect(planter.getObjectByName("planter-pot")).toBeDefined();
    expect(planter.children.filter((child) => child.name === "planter-bloom")).toHaveLength(4);
  });

  it("builds framed double glass doors with handles and an open angle", () => {
    const doors = makeGlassDoors();
    const left = doors.getObjectByName("door-leaf-left") as THREE.Group;
    const right = doors.getObjectByName("door-leaf-right") as THREE.Group;
    expect(left.rotation.y).not.toBe(0);
    expect(right.rotation.y).toBeCloseTo(-left.rotation.y, 5);
    expect(doors.getObjectByName("leaf-handle")).toBeDefined();
    expect(doors.getObjectByName("devpowers-transom-logo")).toBeDefined();
  });

  it("builds the Xerox as a multi-part copier with a lit display", () => {
    const xerox = makeXeroxPrinter();
    for (const name of ["xerox-body", "xerox-scanner", "xerox-lid", "xerox-output", "xerox-control", "xerox-display", "xerox-paper"]) {
      expect(xerox.getObjectByName(name), name).toBeDefined();
    }
    expect((xerox.getObjectByName("xerox-display") as THREE.Mesh).material).toBeInstanceOf(THREE.MeshBasicMaterial);
  });

  it("shows a garden with rolling hills and a literal row of seven trees", () => {
    const garden = makeReceptionGarden();
    expect(garden.children.filter((child) => child.name === "reception-hill")).toHaveLength(4);
    const trees = garden.children.filter((child) => child.name === "reception-tree");
    expect(trees).toHaveLength(7);
    expect(Math.max(...trees.map((tree) => tree.position.x)) - Math.min(...trees.map((tree) => tree.position.x))).toBeLessThan(0.4);
    expect(garden.children.filter((child) => child.name === "reception-bush")).toHaveLength(6);
  });
});

describe("batman emblem (C-44 #4)", () => {
  beforeAll(() => {
    // jsdom has no real canvas 2D context; mock the API surface
    // the emblem drawer uses (same pattern as no-zfighting.test).
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => ({
      fillStyle: "",
      fillRect: vi.fn(),
      beginPath: vi.fn(),
      ellipse: vi.fn(),
      fill: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      closePath: vi.fn(),
    }) as unknown as CanvasRenderingContext2D);
  });

  it("fills the black background and draws the ellipse + mirrored bat path", () => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext("2d");
    expect(context).not.toBeNull();
    if (context === null) return;
    drawBatmanEmblem(context, canvas.width, canvas.height);
    // Background, yellow ellipse, then the black bat.
    expect(vi.mocked(context.fillRect)).toHaveBeenCalled();
    expect(vi.mocked(context.ellipse)).toHaveBeenCalledWith(256, 128, 512 * 0.46, 256 * 0.44, 0, 0, Math.PI * 2);
    // The mirrored bat outline: 15 half-points forward + 14 back.
    expect(vi.mocked(context.moveTo)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(context.lineTo)).toHaveBeenCalledTimes(28);
    expect(vi.mocked(context.closePath)).toHaveBeenCalled();
    expect(vi.mocked(context.fill)).toHaveBeenCalledTimes(2);
  });
});

describe("toilet stall (C-57)", () => {
  it("builds a stall with partitions, bowl, cistern, and toilet paper", () => {
    const group = makeToiletStall();
    // Partitions: left + right + their frame top + bottom.
    expect(namedChildren(group)).toContain("stall-partition-left");
    expect(namedChildren(group)).toContain("stall-partition-right");
    expect(namedChildren(group)).toContain("stall-partition-left-frame-top");
    expect(namedChildren(group)).toContain("stall-partition-right-frame-top");
    // Door panel + SIDE frame pieces. No top lintel: Lucas removed it
    // (2026-09-01) - the doorway is open at the top by design.
    expect(namedChildren(group)).toContain("stall-door");
    expect(namedChildren(group)).toContain("stall-door-frame-left");
    expect(namedChildren(group)).toContain("stall-door-frame-right");
    // Toilet bowl + cistern + seat + paper. No lid: removed by design
    // (Lucas, 2026-09-01).
    expect(namedChildren(group)).toContain("toilet-base");
    expect(namedChildren(group)).toContain("toilet-cistern");
    expect(namedChildren(group)).toContain("toilet-cistern-top");
    expect(namedChildren(group)).toContain("toilet-seat");
    expect(namedChildren(group)).toContain("toilet-paper-roll");
    expect(namedChildren(group)).toContain("toilet-paper-holder");
    // Sanity: the cistern sits at typical tank height (0.3-0.8m).
    const cistern = group.getObjectByName("toilet-cistern") as THREE.Mesh;
    expect(cistern.position.y + 0.3).toBeGreaterThan(0.4);
    expect(cistern.position.y + 0.3).toBeLessThan(0.9);
  });
});

describe("toilet sink (C-57)", () => {
  it("builds a wall-mounted basin with a mirror, soap dispenser, and paper-towel cabinet", () => {
    const group = makeToiletSink();
    // Counter + basin.
    expect(namedChildren(group)).toContain("toilet-sink-counter");
    expect(namedChildren(group)).toContain("toilet-sink-bowl");
    expect(namedChildren(group)).toContain("toilet-sink-bowl-inner");
    // Faucet: base + post + spout + tip + handle.
    expect(namedChildren(group)).toContain("toilet-sink-faucet-base");
    expect(namedChildren(group)).toContain("toilet-sink-faucet-post");
    expect(namedChildren(group)).toContain("toilet-sink-faucet-spout");
    // Mirror.
    expect(namedChildren(group)).toContain("toilet-sink-mirror-frame");
    expect(namedChildren(group)).toContain("toilet-sink-mirror-glass");
    // Soap dispenser + paper-towel cabinet.
    expect(namedChildren(group)).toContain("toilet-sink-soap-body");
    expect(namedChildren(group)).toContain("toilet-sink-paper-cabinet");
    // Mirror sits at eye level (1.5-1.9m).
    const mirror = group.getObjectByName("toilet-sink-mirror-frame") as THREE.Mesh;
    expect(mirror.position.y).toBeGreaterThan(1.4);
    expect(mirror.position.y).toBeLessThan(2.0);
  });
});

describe("urinal (C-57)", () => {
  it("builds a wall-mounted urinal with a chrome pipe, rim, drain, and privacy screen", () => {
    const group = makeUrinal();
    expect(namedChildren(group)).toContain("urinal-plate");
    expect(namedChildren(group)).toContain("urinal-bowl-upper");
    expect(namedChildren(group)).toContain("urinal-bowl-mid");
    expect(namedChildren(group)).toContain("urinal-bowl-lower");
    expect(namedChildren(group)).toContain("urinal-rim-front");
    expect(namedChildren(group)).toContain("urinal-drain");
    expect(namedChildren(group)).toContain("urinal-pipe-vertical");
    expect(namedChildren(group)).toContain("urinal-pipe-spout");
    expect(namedChildren(group)).toContain("urinal-screen");
    // Bowl is at a realistic height (0.4-1.0m off the floor).
    const bowl = group.getObjectByName("urinal-bowl-upper") as THREE.Mesh;
    expect(bowl.position.y).toBeGreaterThan(0.4);
    expect(bowl.position.y).toBeLessThan(1.0);
  });
});

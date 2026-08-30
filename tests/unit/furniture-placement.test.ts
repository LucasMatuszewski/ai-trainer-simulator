import { describe, expect, it } from "vitest";

import {
  MAIN_OFFICE_FILE_CABINETS,
  MAIN_OFFICE_PLANTS,
  OBSTACLES,
  OFFICE_BOUNDS,
} from "../../src/content/npcs";

function furniture(id: string) {
  const obstacle = OBSTACLES.find((candidate) => candidate.id === id);
  expect(obstacle, `${id} obstacle is missing`).toBeDefined();
  return obstacle!;
}

describe("main-office furniture placement", () => {
  it.each(["filing-cabinet-south"])(
    "places %s against a wall",
    (id) => {
      const cabinet = furniture(id);
      const againstWall =
        cabinet.minX - OFFICE_BOUNDS.minX <= 0.5 ||
        OFFICE_BOUNDS.maxX - cabinet.maxX <= 0.5 ||
        cabinet.minZ - OFFICE_BOUNDS.minZ <= 0.5 ||
        OFFICE_BOUNDS.maxZ - cabinet.maxZ <= 0.5;

      expect(againstWall).toBe(true);

      const visual = MAIN_OFFICE_FILE_CABINETS.find((placement) => placement.id === id);
      expect(visual).toBeDefined();
      expect(visual!.x).toBe((cabinet.minX + cabinet.maxX) / 2);
      expect(visual!.z).toBe((cabinet.minZ + cabinet.maxZ) / 2);
    },
  );

  it("keeps floor plants clear of furniture obstacles", () => {
    for (const plant of MAIN_OFFICE_PLANTS) {
      expect(plant.y).toBeLessThan(0.05);
      for (const obstacle of OBSTACLES) {
        const overlaps =
          plant.x + plant.radius > obstacle.minX &&
          plant.x - plant.radius < obstacle.maxX &&
          plant.z + plant.radius > obstacle.minZ &&
          plant.z - plant.radius < obstacle.maxZ;
        expect(overlaps, `${plant.id} overlaps ${obstacle.id}`).toBe(false);
      }
    }
  });

  it("tucks the coffee machine into the north-east corner", () => {
    const coffeeMachine = furniture("coffee-machine");

    expect(coffeeMachine.minZ - OFFICE_BOUNDS.minZ).toBeLessThanOrEqual(0.5);
    expect(OFFICE_BOUNDS.maxX - coffeeMachine.maxX).toBeLessThanOrEqual(0.5);
  });

  it("tucks the server rack into the south-west corner", () => {
    const serverRack = furniture("server-rack");

    expect(serverRack.minX - OFFICE_BOUNDS.minX).toBeLessThanOrEqual(0.5);
    expect(OFFICE_BOUNDS.maxZ - serverRack.maxZ).toBeLessThanOrEqual(0.5);
  });
});

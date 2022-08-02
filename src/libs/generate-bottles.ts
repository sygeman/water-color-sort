import { nanoid } from "nanoid";
import { Bottle } from "../types/bottle";
import { Liquide, LiquideType } from "../types/liquide";

const createBottle = (liquids: Set<Liquide> = new Set()): Bottle => ({
  id: nanoid(),
  liquids,
});
const createLiquide = (type: LiquideType): Liquide => ({ id: nanoid(), type });

export const generateBottles = (count: number) => {
  const bottles: Map<string, Bottle> = new Map();

  [
    createBottle(new Set([createLiquide("pink"), createLiquide("pink")])),
    createBottle(new Set([createLiquide("pink"), createLiquide("indigo")])),
    createBottle(
      new Set([
        createLiquide("indigo"),
        createLiquide("indigo"),
        createLiquide("pink"),
        createLiquide("indigo"),
      ])
    ),
    createBottle(),
  ].forEach((bottle) => bottles.set(bottle.id, bottle));

  return bottles;
};

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

  const input: LiquideType[][] = [
    ["pink", "red", "white", "green"],
    ["white", "green", "yellow", "yellow"],
    ["orange", "cyan", "red", "yellow"],
    ["white", "cyan", "yellow", "pink"],
    ["red", "orange", "orange", "orange"],
    ["cyan", "white", "pink", "green"],
    ["pink", "cyan", "green", "red"],
    [],
  ];

  input.forEach((liqs) => {
    const bottle = createBottle(new Set(liqs.reverse().map(createLiquide)));
    bottles.set(bottle.id, bottle);
  });

  return bottles;
};

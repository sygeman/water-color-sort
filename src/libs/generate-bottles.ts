import { nanoid } from "nanoid";
import {
  allCountVariants,
  bottleSize,
  emptyCountVariants,
  liquids,
} from "../constants";
import { Bottle } from "../types/bottle";
import { Liquide, LiquideType } from "../types/liquide";
import { shuffle } from "../utils/shuffle";

const createBottle = (liquids: Set<Liquide> = new Set()): Bottle => ({
  id: nanoid(),
  liquids,
});
const createLiquide = (type: LiquideType): Liquide => ({ id: nanoid(), type });

interface GenerateBottlesOptions {
  allCount?: number;
  emptyCount?: number;
}

export const generateBottles = (options?: GenerateBottlesOptions) => {
  const allCount = options?.allCount || shuffle(allCountVariants)[0];
  const emptyCount = options?.emptyCount || shuffle(emptyCountVariants)[0];
  const bottles: Map<string, Bottle> = new Map();
  const liquidsCount = allCount - emptyCount;
  const liquidsKeys = shuffle(Object.keys(liquids)).slice(0, liquidsCount);

  [
    ...liquidsKeys.map((liquid) => new Array(bottleSize).fill(liquid)),
    ...new Array(emptyCount).fill([]),
  ].forEach((liquids) => {
    const bottle = createBottle(new Set(liquids.map(createLiquide)));
    bottles.set(bottle.id, bottle);
  });

  return bottles;
};

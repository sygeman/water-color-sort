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
import { transfuse } from "./transfuse";

const createBottle = (liquids: Set<Liquide> = new Set()): Bottle => ({
  id: nanoid(),
  liquids,
});
const createLiquide = (type: LiquideType): Liquide => ({ id: nanoid(), type });

interface GenerateBottlesOptions {
  allCount?: number;
  emptyCount?: number;
}

const shuffleNext = (bottles: Map<string, Bottle>) => {
  const notEmptyBottles = [...bottles.values()].filter(
    (bottle) => bottle.liquids.size !== 0
  );
  const fromBottle = shuffle(notEmptyBottles)?.[0];

  const notFullBottles = [...bottles.values()].filter(
    (bottle) =>
      bottle.liquids.size !== bottleSize && bottle.id !== fromBottle.id
  );
  const toBottle = shuffle(notFullBottles)?.[0];

  const transfuseResult = transfuse(fromBottle, toBottle, true);

  if (transfuseResult) {
    const [bottle1, bottle2] = transfuseResult;
    bottles.set(bottle1.id, bottle1);
    bottles.set(bottle2.id, bottle2);
  }

  return bottles;
};

export const generateBottles = (options?: GenerateBottlesOptions) => {
  const allCount = options?.allCount || shuffle(allCountVariants)[0];
  const emptyCount = options?.emptyCount || shuffle(emptyCountVariants)[0];
  let bottles: Map<string, Bottle> = new Map();
  const liquidsCount = allCount - emptyCount;
  const liquidsKeys = shuffle(Object.keys(liquids)).slice(0, liquidsCount);

  [
    ...liquidsKeys.map((liquid) => new Array(bottleSize).fill(liquid)),
    ...new Array(emptyCount).fill([]),
  ].forEach((liquids) => {
    const bottle = createBottle(new Set(liquids.map(createLiquide)));
    bottles.set(bottle.id, bottle);
  });

  let shuffleCount = 0;

  while (shuffleCount < 20) {
    bottles = shuffleNext(bottles);
    shuffleCount++;
  }

  return bottles;
};

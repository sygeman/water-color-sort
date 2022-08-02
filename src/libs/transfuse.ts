import { bottleSize } from "../constants";
import { Bottle } from "../types/bottle";
import { Liquide } from "../types/liquide";
import { lastFrom } from "../utils/last-from";
import { bottleIsEmpty } from "./bottle-is-empty";
import { bottleIsFull } from "./bottle-is-full";

const isSameTopLiqide = (fromBottle?: Bottle, toBottle?: Bottle) => {
  if (!fromBottle || !toBottle) return false;
  const fromLiquide = lastFrom(Array.from(fromBottle.liquids))?.type;
  const toLiquide = lastFrom(Array.from(toBottle.liquids))?.type;
  return fromLiquide === toLiquide || !toLiquide;
};

const getLastLiqudeWithSameType = (bottle: Bottle) => {
  const liquids = Array.from(bottle.liquids).reverse();
  const container: Set<Liquide> = new Set();
  let type = "";

  for (const liquid of liquids) {
    if (type && type !== liquid.type) break;

    container.add(liquid);
    type = liquid.type;
  }

  return container;
};

export const transfuse = (fromBottle?: Bottle, toBottle?: Bottle) => {
  if (!fromBottle || !toBottle) return false;
  if (bottleIsEmpty(fromBottle)) return false;
  if (bottleIsFull(toBottle)) return false;
  if (!isSameTopLiqide(fromBottle, toBottle)) return false;

  const bottle1 = { ...fromBottle };
  const bottle2 = { ...toBottle };

  const liquide = lastFrom(Array.from(fromBottle.liquids));
  if (!liquide) return false;

  const liquids = Array.from(getLastLiqudeWithSameType(fromBottle));
  const spaceLeft = bottleSize - toBottle.liquids.size;

  liquids.slice(0, spaceLeft).forEach((liquide) => {
    bottle1.liquids.delete(liquide);
    bottle2.liquids.add(liquide);
  });

  return [bottle1, bottle2];
};

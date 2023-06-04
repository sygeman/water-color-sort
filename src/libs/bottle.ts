import {
  BOTTLE_SIZE,
  EMPTY_LIQUIDE,
  LIQUIDE_SEPARATOR,
  LIQUIDS_VARIANTS,
  flipedLiquidsVariants,
} from "../constants";
import type { LiquideType } from "../types/liquide-type";

export class Bottle {
  liquids: LiquideType[] = [];

  constructor(options?: {
    liquids?: LiquideType[];
    fill?: LiquideType;
    parse?: string;
  }) {
    if (options?.liquids) this.liquids = options.liquids;
    if (options?.fill) this.fill(options.fill);
    if (options?.parse) this.parse(options.parse);
  }

  get spaceLeft() {
    return BOTTLE_SIZE - this.count;
  }

  get count() {
    return this.liquids.length;
  }

  get full() {
    return this.count === BOTTLE_SIZE;
  }

  get empty() {
    return this.count === 0;
  }

  get asString() {
    return [
      ...this.liquids.map((liquid) => LIQUIDS_VARIANTS[liquid]),
      ...new Array(BOTTLE_SIZE - this.count).fill(EMPTY_LIQUIDE),
    ].join(LIQUIDE_SEPARATOR);
  }

  get done() {
    if (this.empty) return true;
    if (!this.full) return false;

    let sameType = true;
    let lastType = "";

    for (const liquid of this.liquids) {
      if (!lastType) {
        lastType = liquid;
        continue;
      }

      if (liquid !== lastType) {
        sameType = false;
        break;
      }
    }

    return sameType;
  }

  get topLiquids() {
    let type: LiquideType | null = null;
    let count = 0;

    for (let index = this.liquids.length - 1; index >= 0; index--) {
      const liquid = this.liquids[index];

      if (!type) {
        type = liquid;
      } else if (liquid !== type) {
        break;
      }

      count++;
    }

    return { type, count };
  }

  parse(bottleString: string) {
    this.liquids = bottleString
      .split(LIQUIDE_SEPARATOR)
      .map((liquid) => parseInt(liquid, 10))
      .filter((liquid) => liquid !== EMPTY_LIQUIDE)
      .map((liquid) => {
        return flipedLiquidsVariants[liquid];
      });
  }

  fill(liquid: LiquideType) {
    this.liquids = new Array(BOTTLE_SIZE).fill(liquid);
  }

  addLiquid(liquid: LiquideType, count: number = 1) {
    this.liquids = [...this.liquids, ...new Array(count).fill(liquid)];
  }

  deleteLiquid(count: number) {
    this.liquids = this.liquids.slice(0, -count);
  }
}

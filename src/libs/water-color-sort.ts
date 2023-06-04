import {
  ALL_COUNT_VARIANTS,
  BOTTLE_SEPARATOR,
  EMPTY_COUNT_VARIANTS,
  LIQUIDS_VARIANTS,
} from "../constants";
import { shuffle } from "../utils/shuffle";
import { Bottle } from "./bottle";

export class WaterColorSort {
  startString: string = "";
  bottles: Bottle[] = [];
  events: { [eventName: string]: (() => void)[] } = {};

  constructor(options?: { init: string }) {
    if (options?.init) this.parseBottlesString(options?.init);
  }

  get liquids() {
    const liquidsTypes = new Set<string>();

    for (const bottle of this.bottles) {
      for (const liquid of bottle.liquids) {
        liquidsTypes.add(liquid);
      }
    }

    return [...liquidsTypes.values()];
  }

  get liquidsCount() {
    return this.liquids.length;
  }

  get allCount() {
    return this.bottles.length;
  }

  get emptyCount() {
    return this.allCount - this.liquidsCount;
  }

  get bottlesAsString() {
    return this.bottles.map((bottle) => bottle.asString).join(BOTTLE_SEPARATOR);
  }

  get gameDone() {
    let done = true;

    for (const bottle of this.bottles) {
      if (bottle.done) continue;
      done = false;
      break;
    }

    return done;
  }

  parseBottlesString(bottlesString: string) {
    let bottles = bottlesString
      .split(BOTTLE_SEPARATOR)
      .map((liquids) => new Bottle({ parse: liquids }));

    this.bottles = bottles;

    return bottles;
  }

  transfuse(fromBottle: Bottle, toBottle: Bottle, once = false) {
    if (!fromBottle || !toBottle) return false;
    if (fromBottle.empty) return false;
    if (toBottle.full) return false;

    const fromLiquide = fromBottle.topLiquids;
    const toLiquide = toBottle.topLiquids;

    if (!fromLiquide.type) return false;
    if (!once && toLiquide.type && fromLiquide.type !== toLiquide.type)
      return false;

    let transfuseCount = fromLiquide.count;
    if (toBottle.spaceLeft < transfuseCount) {
      transfuseCount = toBottle.spaceLeft;
    }
    if (transfuseCount > 1 && once) {
      transfuseCount = 1;
    }

    fromBottle.deleteLiquid(transfuseCount);
    toBottle.addLiquid(fromLiquide.type, transfuseCount);
    this.emit("update");
  }

  shuffleNext() {
    const notEmptyBottles = this.bottles.filter((bottle) => !bottle.empty);
    const fromBottle = shuffle(notEmptyBottles)?.[0];

    const notFullBottles = this.bottles.filter(
      (bottle) => !bottle.full && bottle !== fromBottle
    );
    const toBottle = shuffle(notFullBottles)?.[0];

    this.transfuse(fromBottle, toBottle, true);
  }

  generate() {
    const allCount = shuffle(ALL_COUNT_VARIANTS)[0];
    const emptyCount = shuffle(EMPTY_COUNT_VARIANTS)[0];
    const liquidsCount = allCount - emptyCount;
    const liquids = shuffle(Object.keys(LIQUIDS_VARIANTS)).slice(
      0,
      liquidsCount
    );

    this.bottles = [
      ...liquids.map((liquidType) => new Bottle({ fill: liquidType })),
      ...new Array(emptyCount).fill(null).map(() => new Bottle()),
    ];

    let shuffleCount = 0;

    while (shuffleCount < 20) {
      this.shuffleNext();
      shuffleCount++;
    }

    console.log("game:", this.bottlesAsString);
    this.startString = this.bottlesAsString;
    this.emit("update");
  }

  on(name: string, handler: () => void) {
    if (!this.events[name]) this.events[name] = [];
    this.events[name].push(handler);
  }

  emit(name: string) {
    if (!this.events[name]) return;
    this.events[name].forEach((handler) => handler());
  }

  cleanup() {
    this.events = {};
  }

  reset() {
    this.bottles = this.parseBottlesString(this.startString);
    this.emit("update");
    this.emit("reset");
  }

  newGame() {
    this.generate();
    this.emit("newGame");
  }
}

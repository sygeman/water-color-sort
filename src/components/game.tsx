import { Component, createSignal, For } from "solid-js";
import { GITHUB_LINK } from "../constants";
import { BottleContainer } from "./bottle";
import { WaterColorSort } from "../libs/water-color-sort";
import { LiquideType } from "../types/liquide-type";

export const Game: Component = () => {
  const [bottles, setBottles] = createSignal<LiquideType[][]>([]);
  const [selected, setSelected] = createSignal<number | null>(null);

  const wcs = new WaterColorSort();

  wcs.on("reset", () => setSelected(null));
  wcs.on("newGame", () => setSelected(null));
  wcs.on("update", () => {
    if (wcs.gameDone) return wcs.newGame();
    setBottles(wcs.bottles.map((bottle) => bottle.liquids));
  });

  wcs.newGame();

  const newGame = () => wcs.newGame();
  const reset = () => wcs.reset();

  const select = (bottleIndex: number) => {
    const bottle = wcs.bottles[bottleIndex];

    if (!bottle || (bottle.empty && selected() === null)) return false;

    setSelected((prevBottleIndex) => {
      if (prevBottleIndex === bottleIndex) return null;
      if (prevBottleIndex === null) return bottleIndex;

      const prevBottle = wcs.bottles[prevBottleIndex];
      wcs.transfuse(prevBottle, bottle);

      return null;
    });
  };

  return (
    <div class="bg-slate-900 h-screen w-screen absolute inset-0 flex items-center justify-center">
      <a
        class="absolute right-4 top-2 text-white/50 font-medium"
        target="blank"
        href={GITHUB_LINK}
      >
        Github
      </a>
      <div class="w-80 md:scale-150 relative rounded overflow-hidden">
        <div class="flex w-full justify-between text-white/50">
          <div>Water Color Sort</div>
          <button onClick={newGame}>New Game</button>
          <button onClick={reset}>Reset</button>
        </div>
        <div class="w-80 h-80 bg-slate-800 flex flex-wrap justify-center items-center gap-6 px-4">
          <For each={bottles()}>
            {(bottle, bottleIndex) => (
              <BottleContainer
                selected={bottleIndex() === selected()}
                bottle={bottle}
                onClick={() => select(bottleIndex())}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

import { Component, For } from "solid-js";
import { liquidsColors } from "../constants";

interface BottleProps {
  bottle: string[];
  selected: boolean;
  onClick: () => void;
}

export const Bottle: Component<BottleProps> = (props) => (
  <button
    classList={{
      "flex flex-col-reverse w-6 h-32 bg-white/20": true,
      "rounded overflow-hidden transition-transform": true,
      "scale-110": props.selected,
    }}
    onClick={props.onClick}
  >
    <For each={props.bottle}>
      {(liquide) => <div class={`h-8 w-6 ${liquidsColors[liquide]}`} />}
    </For>
  </button>
);

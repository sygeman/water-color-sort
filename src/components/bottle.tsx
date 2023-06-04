import { Component, For } from "solid-js";

export const liquidsColors: { [key: string]: string } = {
  pink: "bg-pink-500/90",
  red: "bg-red-800/90",
  indigo: "bg-indigo-800/90",
  white: "bg-yellow-100/90",
  green: "bg-lime-500/90",
  greenDark: "bg-green-800/90",
  yellow: "bg-yellow-500/90",
  orange: "bg-orange-600/90",
  cyan: "bg-cyan-500/90",
};

export const BottleContainer: Component<{
  bottle: string[];
  selected: boolean;
  onClick: () => void;
}> = (props) => {
  return (
    <button
      class={`flex flex-col-reverse w-6 h-32 bg-white/20 rounded overflow-hidden transition-transform ${
        props.selected ? "scale-110" : ""
      }`}
      onClick={props.onClick}
    >
      <For each={props.bottle}>
        {(liquide) => <div class={`h-8 w-6 ${liquidsColors[liquide]}`} />}
      </For>
    </button>
  );
};

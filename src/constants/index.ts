export const GITHUB_LINK = "https://github.com/sygeman/water-color-sort";

export const BOTTLE_SIZE = 4;
export const EMPTY_LIQUIDE = 0;

export const BOTTLE_SEPARATOR = ":";
export const LIQUIDE_SEPARATOR = "-";

// 3/5, 5/7, 7/9, 5/6, 9/11, 7/8
export const ALL_COUNT_VARIANTS = [5, 7, 9, 8, 11];
export const EMPTY_COUNT_VARIANTS = [1, 2];

export const LIQUIDS_COLORS: { [key: string]: string } = {
  pink: "bg-pink-500",
  red: "bg-red-800",
  indigo: "bg-indigo-800",
  white: "bg-yellow-100",
  green: "bg-lime-500",
  greenDark: "bg-green-800",
  yellow: "bg-yellow-500",
  orange: "bg-orange-600",
  cyan: "bg-cyan-500",
};

export let LIQUIDS_VARIANTS: { [key: string]: number } = {};
export let FLIPED_LIQUIDS_VARIANTS: { [key: number]: string } = {};

Object.keys(LIQUIDS_COLORS).forEach((key, index) => {
  LIQUIDS_VARIANTS[key] = index + 1;
  FLIPED_LIQUIDS_VARIANTS[index + 1] = key;
});

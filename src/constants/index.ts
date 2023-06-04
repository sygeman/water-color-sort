import type { LiquideType } from "../types/liquide-type";
import { flipObject } from "../utils/flip-object";

export const GITHUB_LINK = "https://github.com/sygeman/water-color-sort";

export const BOTTLE_SIZE = 4;
export const EMPTY_LIQUIDE = 0;

export const BOTTLE_SEPARATOR = ":";
export const LIQUIDE_SEPARATOR = "-";

// 3/5, 5/7, 7/9, 5/6, 9/11, 7/8
export const ALL_COUNT_VARIANTS = [5, 7, 9, 8, 11];
export const EMPTY_COUNT_VARIANTS = [1, 2];

export const LIQUIDS_VARIANTS = {
  pink: 1,
  red: 2,
  indigo: 3,
  white: 4,
  green: 5,
  greenDark: 6,
  yellow: 7,
  cyan: 8,
  orange: 9,
};

export const flipedLiquidsVariants: { [key: number]: LiquideType } =
  flipObject(LIQUIDS_VARIANTS);

export const liquidsColors = {
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

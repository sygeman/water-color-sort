import { LIQUIDS_VARIANTS } from "../constants";

const obj = { ...LIQUIDS_VARIANTS } as const;
export type LiquideType = keyof typeof obj;

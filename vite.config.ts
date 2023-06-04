import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import { LIQUIDS_COLORS } from "./src/constants";

export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      presets: [presetAttributify(), presetUno()],
      safelist: Object.values(LIQUIDS_COLORS),
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});

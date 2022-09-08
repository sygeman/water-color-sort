import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import { liquids } from "./src/constants";

export default defineConfig({
  plugins: [
    solidPlugin(),
    Unocss({
      presets: [presetAttributify(), presetUno()],
      safelist: Object.values(liquids),
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});

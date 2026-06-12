import { wasp } from "wasp/client/vite"
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [wasp(), tailwindcss()],
  server: {
    port: 3011,
    open: true,
  },
});

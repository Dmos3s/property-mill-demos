import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// Three demo sites plus a chooser page, built as one static bundle for GitHub Pages.
// Set PM_ONLY=summit|midnight|windmill|estate|main to build a single entry while working on it.
const entries: Record<string, string> = {
  main: "index.html",
  summit: "summit/index.html",
  midnight: "midnight/index.html",
  windmill: "windmill/index.html",
  estate: "estate/index.html",
};
const only = process.env.PM_ONLY;
const input = Object.fromEntries(
  Object.entries(entries)
    .filter(([k]) => !only || k === only)
    .map(([k, v]) => [k, resolve(import.meta.dirname, v)]),
);

export default defineConfig({
  base: "/property-mill-demos/",
  plugins: [react(), tailwindcss()],
  build: { rollupOptions: { input } },
});

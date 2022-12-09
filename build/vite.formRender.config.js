import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, "../packages/formRender/dist"),
    lib: {
      entry: path.resolve(__dirname, "../packages/formRender/install.ts"),
      name: "formRender",
      formats: ["es", "umd"],
      // the proper extensions will be added
      fileName: (format) => {
        if (format === "es") {
          return "index_es.js";
        }
        return "index_umd.js";
      },
    },
    rollupOptions: {
      external: [
        "vue",
        "vuedraggable",
        "@lc/constants",
        "@lc/pcComponents",
        "@lc/types",
        "@lc/useHooks",
        "@lc/types",
      ],
    },
  },
});

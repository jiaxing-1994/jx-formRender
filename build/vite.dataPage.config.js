import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, "../packages/dataPage/dist"),
    lib: {
      entry: path.resolve(__dirname, "../packages/dataPage/install.ts"),
      name: "dataPage",
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
        "@lc/formRender",
        "@lc/pcComponents",
        "@lc/style",
        "@lc/types",
        "@lc/useHooks",
        "@wk-libs/utils",
      ],
    },
  },
});

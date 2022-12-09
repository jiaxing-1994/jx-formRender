import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, "../packages/pcComponents/dist"),
    lib: {
      entry: path.resolve(__dirname, "../packages/pcComponents/install.ts"),
      name: "pcComponents",
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
        "ant-design-vue",
        "@ant-design/icons-vue",
        "@wk-libs/utils",
        "@wk-libs/validator",
        "@lc/useHooks",
        "@lc/types",
      ],
    },
  },
});

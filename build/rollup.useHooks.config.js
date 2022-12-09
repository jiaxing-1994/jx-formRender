import path from "path";
import plugins from "./plugins.js";

export default {
  input: path.resolve(__dirname, "../packages/useHooks/index.ts"),
  output: [
    {
      file: path.resolve(__dirname, "../packages/useHooks/dist/index_umd.js"),
      name: "Hooks",
      format: "umd",
    },
    {
      file: path.resolve(__dirname, "../packages/useHooks/dist/index_es.js"),
      format: "es",
    },
  ],
  plugins: [...plugins],

  external: [
    "@lc/apiService",
    "@lc/constants",
    "@lc/types",
    "vue",
    "vue-router",
    "@wk-libs/storage",
  ],
};

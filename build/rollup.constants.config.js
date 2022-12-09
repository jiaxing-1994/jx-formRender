import path from "path";
import plugins from "./plugins.js";

export default {
  input: path.resolve(__dirname, "../packages/constants/index.ts"),
  output: [
    {
      file: path.resolve(__dirname, "../packages/constants/dist/index_umd.js"),
      name: "Hooks",
      format: "umd",
    },
    {
      file: path.resolve(__dirname, "../packages/constants/dist/index_es.js"),
      format: "es",
    },
  ],
  plugins: [...plugins],
};

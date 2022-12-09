import path from "path";
import plugins from "./plugins.js";

export default {
  input: path.resolve(__dirname, "../packages/apiService/index.ts"),
  output: [
    {
      file: path.resolve(__dirname, "../packages/apiService/dist/index_umd.js"),
      name: "Http",
      format: "umd",
    },
    {
      file: path.resolve(__dirname, "../packages/apiService/dist/index_es.js"),
      format: "es",
    },
  ],
  plugins: [...plugins],

  external: ["@wk-libs/http"],
};

import { resolve } from "path";

module.exports = {
  base: "/form-engine/",
  build: {
    outDir: resolve(__dirname, "../dist"),
    sourcemap: false,
  },
};

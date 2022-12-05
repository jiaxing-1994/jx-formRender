import { mergeConfig } from "vite";
const dev = require("./dev.config");
const prd = require("./pro.config");

const config = (mode: string) => {
  return mergeConfig({}, mode === "development" ? dev : prd);
};

module.exports = config;

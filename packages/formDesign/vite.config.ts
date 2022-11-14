import { defineConfig, mergeConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
const config = require("./config/index");

interface AliasesType {
  [key: string]: string | object;
}
const aliases: AliasesType = {
  "@libs": resolve(__dirname, "src/libs"),
  "@utils": resolve(__dirname, "utils"),
  "@myTypes": resolve(__dirname, "types"),
  "@assets": resolve(__dirname, "src/assets"),
  "@components": resolve(__dirname, "src/components"),
  "@componentsMobile": resolve(__dirname, "src/componentsMobile"),
  "@directive": resolve(__dirname, "src/directive"),
  "@layouts": resolve(__dirname, "src/layouts"),
  "@useHooks": resolve(__dirname, "src/useHooks"),
  "@apiService": resolve(__dirname, "src/apiService"),
  "@views": resolve(__dirname, "src/views"),
  "@controls": resolve(__dirname, "src/views/controls"),
  "@stores": resolve(__dirname, "src/stores"),
  cssAlias: {
    find: /^~style/,
    replacement: resolve(__dirname, "src/assets/style"),
  },
};
const resolveAlias = (aliases: AliasesType) => {
  const aliasEntryes = [];
  for (const key in aliases) {
    if (typeof aliases[key] === "string") {
      aliasEntryes.push({
        find: key,
        replacement: aliases[key],
      });
    } else {
      aliasEntryes.push(aliases[key]);
    }
  }
  return aliasEntryes;
};
export default defineConfig(({ mode }) => {
  return mergeConfig(
    {
      root: resolve(__dirname, "src"),
      envDir: resolve(__dirname, "env"),
      publicDir: resolve(__dirname, "public"),
      resolve: {
        alias: resolveAlias(aliases),
      },
      css: {
        preprocessorOptions: {
          less: {
            javascriptEnabled: true,
          },
        },
        modules: {
          preprocessorOptions: {
            css: {
              alias: {
                "~@assets": resolve(__dirname, "src/assets"),
              },
            },
            less: {
              alias: {
                "~@assets": resolve(__dirname, "src/assets"),
              },
            },
          },
        },
      },
      plugins: [vue()],
    },
    config(mode)
  );
});

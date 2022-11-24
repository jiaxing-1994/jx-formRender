import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(() => {
  return {
    root: resolve(__dirname, "src"),
    publicDir: resolve(__dirname, "public"),
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    alias: {
      lc: resolve(__dirname, "../packages"),
    },
    resolve: {
      // extensions: [".d.ts", ".ts", ".js"],
    },
    plugins: [vue()],
    server: {
      port: 8086,
    },
  };
});

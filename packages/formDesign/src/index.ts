import { createApp, App } from "vue";
import AppPage from "./App.vue";
import { setupRouter } from "./router";
import { registStorage, useGlobleComponents } from "@lc/useHooks";
import { STORAGE_NAME } from "@lc/constants";
import installPcComponents from "@lc/pcComponents";
import installFormRender from "@lc/formRender";
import { createPinia } from "pinia";

const initApp = (app: App<Element>) => {
  app.use(installPcComponents);
  app.use(installFormRender);
  app.use(createPinia());
  // 注册全局组件
  const { setupGlobleComponents, setupGlobleDirective } = useGlobleComponents();
  const globalComponents = import.meta.globEager("./components/**/*.vue");
  const globalTsComponents = import.meta.globEager("./components/**/*.ts");
  const componentsFile = {
    ...globalTsComponents,
    ...globalComponents,
  };
  setupGlobleComponents(app, componentsFile);
  // 注册全局指令
  const globalDirective = import.meta.globEager("../directive/**/*.ts");
  setupGlobleDirective(app, globalDirective);
};
// 注册本地存储
registStorage(STORAGE_NAME);
const app: App<Element> = createApp(AppPage);
setupRouter(app);
initApp(app);
app.mount("#app");

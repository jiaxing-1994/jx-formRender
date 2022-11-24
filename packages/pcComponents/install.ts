import antDesign from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { App } from "vue";
import { useGlobleComponents } from "@lc/useHooks";

const { setupGlobleComponents } = useGlobleComponents();
const installPcComponents = {
  install: (app: App<Element>) => {
    app.use(antDesign);
    const globalComponents = import.meta.globEager("./components/**/*.vue");
    setupGlobleComponents(app, globalComponents);
  },
};

export default installPcComponents;

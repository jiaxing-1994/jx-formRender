import { App } from "vue";
import installPcComponents from "@lc/pcComponents";
import installFormRender from "@lc/formRender";
import { useGlobleComponents } from "@lc/useHooks";
import "@lc/style";
import "@lc/pcComponents/dist/style.css";
import "@lc/formRender/dist/style.css";

const { setupGlobleComponents } = useGlobleComponents();

const installDataPage = {
  install: (app: App) => {
    app.use(installPcComponents); // pc端组件
    app.use(installFormRender);
    const globalComponents = import.meta.globEager("./**/*.vue");
    setupGlobleComponents(app, globalComponents);
  },
};

export default installDataPage;

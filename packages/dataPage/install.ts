import { App } from "vue";
import installPcComponents from "@lc/pcComponents";
import DataList from "./data/list.vue";
import DataAdd from "./data/add.vue";
import DataDetail from "./data/detail.vue";
import LcList from "./pages/default/list.vue";
import "@lc/style";

const components = [DataList, DataDetail, DataAdd, LcList];

const installDataPage = {
  install: (app: App) => {
    app.use(installPcComponents);
    components.forEach((component) => {
      app.component(component.name, component);
    });
  },
};

export default installDataPage;

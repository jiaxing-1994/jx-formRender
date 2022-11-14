import { App } from "vue";
import Render from "./render.vue";

const installFormRender = (app: App) => {
  app.component("FormRender", Render);
};

export default installFormRender;

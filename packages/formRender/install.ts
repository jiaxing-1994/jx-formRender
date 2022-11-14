import { App } from "vue";
import Render from "./render.vue";
import RenderForEdit from "./renderForEdit.vue";

const installFormRender = (app: App) => {
  app.component("FormRender", Render);
  app.component("FormRenderForEdit", RenderForEdit);
};

export default installFormRender;

import { App } from "vue";
import Render from "./render.vue";
import RenderForEdit from "./renderForEdit.vue";

const installFormRender = (app: App) => {
  app.component("LcFormRender", Render);
  app.component("LcFormRenderForEdit", RenderForEdit);
};

export default installFormRender;

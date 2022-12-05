import { App } from "vue";
import Render from "./render.vue";
import RenderForDesign from "./renderForDesign.vue";

const installFormRender = (app: App) => {
  app.component("LcFormRender", Render);
  app.component("LcFormRenderForDesign", RenderForDesign);
};

export default installFormRender;

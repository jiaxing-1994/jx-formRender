import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw, Router } from "vue-router";
// import c from "vue-router";
import routes from "./routes";

const router: Router = createRouter({
  history: createWebHistory("/form-engine"),
  strict: true,
  routes: routes as RouteRecordRaw[],
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router as Router;

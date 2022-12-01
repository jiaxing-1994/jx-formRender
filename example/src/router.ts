import { createRouter, createWebHistory, RouteRecordRaw, Router } from "vue-router";
import list from "./views/list.vue";
import add from "./views/add.vue";
import detail from "./views/detail.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/list",
    name: "list",
    component: list,
  },
  {
    path: "/add",
    name: "add",
    component: add,
  },
  {
    path: "/detail",
    name: "detail",
    component: detail,
  },
];

const router: Router = createRouter({
  history: createWebHistory("/"),
  strict: true,
  routes,
});

export default router;

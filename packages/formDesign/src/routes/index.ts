import { RouteConfigSingleView } from "vue-router/types/router";

const generateRoute = (): RouteConfigSingleView[] => {
  const pages = import.meta.globEager("../views/**/*.vue");
  const routers: RouteConfigSingleView[] = [
    {
      path: "/",
      redirect: "/design",
    },
  ];
  for (const key in pages) {
    const nameStr = key.replace(/^..\/views\//, "");
    if (/index.vue$/.test(key)) {
      const namePaths = nameStr.split("/");
      if (namePaths.length > 1) {
        namePaths.pop();
      }
      console.log(namePaths);
      routers.push({
        path: "/" + namePaths.join("/"),
        name: namePaths.join("/"),
        component: pages[key].default,
      });
    }
  }
  return routers;
};
const routes: RouteConfigSingleView[] = generateRoute();
export default routes;

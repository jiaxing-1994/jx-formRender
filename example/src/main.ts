import { createApp } from "vue";
import installDataPage from "@lc/dataPage";
import "@lc/dataPage/dist/style.css";
// import antDesign from "ant-design-vue";
import router from "./router";
import App from "./app.vue";

const app = createApp(App);
app.use(router);
app.use(installDataPage);
// app.use(antDesign);
app.mount("#app");

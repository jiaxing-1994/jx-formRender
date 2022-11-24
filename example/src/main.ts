import { createApp } from "vue";
import installDataPage from "@lc/dataPage";
// import antDesign from "ant-design-vue";
import App from "./app.vue";

const app = createApp(App);
app.use(installDataPage);
// app.use(antDesign);
app.mount("#app");

import { createApp } from "vue";
//styles
import "./style.css";
import "vue-toastification/dist/index.css";
import "vue-awesome-paginate/dist/style.css";
import "bootstrap/dist/css/bootstrap.css";
//componets
import App from "./App.vue";
//ui libraries
import "bootstrap/dist/js/bootstrap.js";
import Toast, { PluginOptions } from "vue-toastification";
import VueAwesomePaginate from "vue-awesome-paginate";
// libraries
import router from "./router/router";
//@ts-ignore
import vClickOutside from "click-outside-vue3"
import { createPinia } from "pinia";

const options: PluginOptions = {
  //@ts-ignore
  position: "top-right",
  timeout: 5000,
};

const app = createApp(App);
app.use(router);
app.use(vClickOutside)
app.use(Toast, options);
app.use(VueAwesomePaginate);
app.use(createPinia());
app.mount("#app");

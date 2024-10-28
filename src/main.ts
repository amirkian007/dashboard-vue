import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createPinia } from "pinia";
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from "./router/router";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";
import vClickOutside from "click-outside-vue3"

const options: PluginOptions = {
  // Optional toast configurations
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

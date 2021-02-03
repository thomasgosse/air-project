import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import vSelect from "vue-select";

import init from "./init";

init();

createApp(App)
  .use(store)
  .use(router)
  .component("v-select", vSelect)
  .mount("#app");

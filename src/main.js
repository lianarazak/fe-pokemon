import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import Index from "./pages/index.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);
// const app = createApp(Index);
app.use(createPinia());
app.use(router);

app.mount("#app");

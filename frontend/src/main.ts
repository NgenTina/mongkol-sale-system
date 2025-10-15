// src/main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/css/tailwind.css";
import "./assets/css/fonts.css";

createApp(App).use(createPinia()).use(router).mount("#app");

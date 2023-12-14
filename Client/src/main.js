import "./assets/main.css";
import { plugin, defaultConfig } from "@formkit/vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
const pinia = createPinia()
const firebaseConfig = {
    apiKey: "AIzaSyAo7xoGt0VZJXht-Z_ocQf_pxnLo3Z3If8",
    authDomain: "henrymoon-73a3e.firebaseapp.com",
    projectId: "henrymoon-73a3e",
    storageBucket: "henrymoon-73a3e.appspot.com",
    messagingSenderId: "368576881434",
    appId: "1:368576881434:web:3ac3c261d648cec6c542a3",
    measurementId: "G-JH4DJBGDRF"
  };
  
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(plugin, defaultConfig())
initializeApp(firebaseConfig);
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import data from "../__mocks__/data.json";
import "./styles/main.less";

store.commit("setData", data);

createApp(App).use(store).mount("#app");

import { createApp } from "vue";
// Self-hosted fonts: only the weights and styles the page uses
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/barlow-condensed/500-italic.css";
import "@fontsource/barlow-condensed/700-italic.css";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");

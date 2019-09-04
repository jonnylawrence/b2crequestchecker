import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import App from "./App.vue";
import Vuetify from "vuetify";
// import VueRouter from "vue-router";

Vue.use(Vuetify, {
  iconfont: "mdi"
});
// Vue.use(VueRouter);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");

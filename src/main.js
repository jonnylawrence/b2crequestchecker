import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import App from "./App.vue";
import Vuetify from "vuetify";
// import VueRouter from "vue-router";
// Import the styles directly. (Or you could add them via script tags.)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

Vue.use(Vuetify, {
  iconfont: "mdi"
});
// Vue.use(VueRouter);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");

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
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";

extend("required", {
  ...required,
  message: "{field} is required"
});

Vue.use(BootstrapVue);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.use(Vuetify, {
  iconfont: "mdi"
});
// Vue.use(VueRouter);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");

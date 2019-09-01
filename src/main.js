import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

Vue.use(Vuetify, {
  iconfont: "mdi"
});
Vue.use(VueRouter);

new Vue({
  render: h => h(App)
}).$mount("#app");

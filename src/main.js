import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(Vuetify, {
  iconfont: "mdi"
});
Vue.use(VueRouter);

new Vue({
  render: h => h(App)
}).$mount("#app");

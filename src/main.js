import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import router from "./router";
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

// Import the Auth0 configuration
import { domain, clientId } from "../auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

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

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");

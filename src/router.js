import Vue from "vue";
import Router from "vue-router";
import document from "@/components/Document.vue";
import stringbuilder from "@/components/StringBuilder.vue";
import Profile from "./views/Profile.vue";
import { authGuard } from "./auth/authGuard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: stringbuilder
    },
    {
      path: "/document",
      name: "document",
      component: document
    },
    {
      path: "/builder",
      name: "builder",
      component: stringbuilder,
      beforeEnter: authGuard
    },
    // NEW - add the route to the /profile component
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: authGuard
    }
  ]
});

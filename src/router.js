import Vue from "vue";
import Router from "vue-router";
import document from "@/components/Document.vue";
import stringbuilder from "@/components/StringBuilder.vue";

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
      component: stringbuilder
    }
  ]
});

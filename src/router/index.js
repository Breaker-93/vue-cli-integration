import Vue from "vue";
import VueRouter from "vue-router";
import demoRoutes from "./example";
import testRoutes from "./test";

import Home from "../views/Home.vue"
import Login from "../views/Login.vue"

Vue.use(VueRouter);

let routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
]

if (process.env.NODE_ENV !== 'production') {
  routes = routes.concat(demoRoutes)
  routes = routes.concat(testRoutes)
}

const router = new VueRouter({
  routes
})

export default router

import Vue from "vue";
import VueRouter from "vue-router";
import demoRoutes from "./example";
// import testRoutes from "./test";

import Login from "../views/Login.vue"
import NotFound from "../views/404"
import Layout from '@comp/Layout'

import home from '@/views/Home'

Vue.use(VueRouter);

let routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'home',
    hidden: true,
    children: [
      {
        path: 'home',
        component: home
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my/index')
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    hidden: true
  },
  { path: '/404', component: NotFound, hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

if (process.env.NODE_ENV !== 'production') {
  routes = routes.concat(demoRoutes)
  // routes = routes.concat(testRoutes)
}

const router = new VueRouter({
  routes
})

export default router

import Vue from "vue";
import VueRouter from "vue-router";
import demoRoutes from "./example";
// import testRoutes from "./test";

import Login from "../views/Login.vue"
import NotFound from "../views/404"
import Layout from '@comp/Layout'
import dashboard from '@/views/dashboard/index'

Vue.use(VueRouter);

let routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    meta: { title: '首页' },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: dashboard
    }]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
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

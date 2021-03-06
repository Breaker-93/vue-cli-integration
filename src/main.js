import Vue from "vue";
import App from "./App.vue";
import router from "@plugins/router"; // 比/src/router/index.js多做“token权限验证和页面重定向”处理
import store from './store'
import xhr from "@plugins/axios"

import '@assets/css/normailze.css';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n


import '@assets/icons' 

Vue.use(ElementUI, { locale })
Vue.prototype.$axios = xhr
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

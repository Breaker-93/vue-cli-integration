import Vue from "vue";
import App from "./App.vue";
import router from "@plugins/router"; // 比/src/router/index.js多做“token权限验证和页面重定向”处理
import xhr from "@plugins/axios"

import '@assets/css/normailze.css';
Vue.prototype.$axios = xhr
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

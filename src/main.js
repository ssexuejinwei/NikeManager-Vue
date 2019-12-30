import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './http/http'
// axios 拦截器
import './http/axios'
Vue.config.productionTip = false
Vue.prototype.$http = http;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

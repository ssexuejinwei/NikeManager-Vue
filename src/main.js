import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './http/http'
import axios from 'axios' 
import './http/axios'
Vue.prototype.$axios = axios; 
axios.defaults.baseURL = '/api'
// axios 拦截器

Vue.config.productionTip = false
Vue.prototype.$http = http;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

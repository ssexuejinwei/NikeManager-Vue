import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Container from '../components/Container'
import Calender from '../components/Calender'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calender',
      component: Calender
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Container from '../components/Container'
import StudentEntry from '../components/StudentEntry'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StudentEntry',
      component: StudentEntry
    }
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Schedule from '../components/Schedule.vue'
import StudentEntry from '../components/StudentEntry.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Student',
    name: 'StudentEntry',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: StudentEntry
  },
  {
    path: '/Schedule',
    name: 'Schedule',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Schedule
  },
  {
    path: '/activity',
    component: () => import('@/views/Activity/index')
  },
  {
    path: '/activity/add',
    component: () => import('@/views/Activity/add')
  },
  {
    path: '/product',
    component: () => import('@/views/Product/index')
  },
  {
    path: '/product/add',
    component: () => import('@/views/Product/add')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

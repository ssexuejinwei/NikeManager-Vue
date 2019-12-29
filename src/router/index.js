import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Student',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Student/index')
  },
  {
    path: '/Schedule',
    name: 'Schedule',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/Schedule/index')
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
  {
    path: '/order',
    component: () => import('@/views/Order/_layout'),
    children: [
      {
        path: '',
        component: () => import('@/views/Order/index'),
      },
      {
        path: 'add',
        component: () => import('@/views/Order/add-order')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

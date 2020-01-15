import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from '../store'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters['user/isLogin']) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters['user/isLogin']) {
    next()
    return
  }
  next('/auth')
}

/** @type {import('vue-router').RouteConfig[]} */
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/auth',
    component: () => import('@/views/Auth/index'),
    beforeEnter: ifNotAuthenticated
  },
  // {
  //   path: '/Student',
  //   component: () => import('@/views/Student/index'),
  //   beforeEnter: ifAuthenticated,
  // },
  {
    path: '/teach',
    component: () => import('@/views/TeachSystem/index'),
    beforeEnter: ifAuthenticated,
  },
  // {
  //   path: '/Schedule',
  //   name: 'Schedule',
  //   component: () => import('@/views/Schedule/index'),
  //   beforeEnter: ifAuthenticated,
  // },
  {
    path: '/activity',
    component: () => import('@/views/Activity/index'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/activity/add',
    component: () => import('@/views/Activity/add'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/product',
    component: () => import('@/views/Product/index'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/product/add',
    component: () => import('@/views/Product/add'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/order',
    component: () => import('@/views/Order/_layout'),
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '',
        component: () => import('@/views/Order/index'),
      },
      {
        path: 'add',
        component: () => import('@/views/Order/add-order')
      },
      {
        path: 'service',
        component: () => import('@/views/Order/service')
      },
      {
        path: 'service/return',
        component: () => import('@/views/Order/service-return')
      },
      {
        path: 'service/exchange',
        component: () => import('@/views/Order/service-exchange')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

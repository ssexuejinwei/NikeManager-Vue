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
    children:[
      //学员管理
      {
        path:'student',
        component: () => import('@/views/TeachSystem/student'),
      },
      //教练管理
      {
        path: 'coach',
        component: () => import('@/views/TeachSystem/coach'),
      },
      //课程管理
      {
        path: 'course',
        component: () => import('@/views/TeachSystem/course'),
      },
      //排课管理
      {
        path: 'schedule',
        component: () => import('@/views/TeachSystem/schedule')
      }
    ]
  },
  //添加课程
  {
    path: '/teach/course/add',
    component: () => import('@/views/TeachSystem/components/courseAdd'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/user',
    component: () => import('@/views/UserManager/index'),
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
      // {
      //   path: 'add',
      //   component: () => import('@/views/Order/add-order')
      // },
      // {
      //   path: 'service',
      //   component: () => import('@/views/Order/service')
      // },
      // {
      //   path: 'service/return',
      //   component: () => import('@/views/Order/service-return')
      // },
      // {
      //   path: 'service/exchange',
      //   component: () => import('@/views/Order/service-exchange')
      // },
    ]
  },
  {
    path: '/score',
    component: () => import('@/views/Score/index'),
    beforeEnter: ifAuthenticated,
    children: [
      { path: '', redirect: 'overview' },
      {
        path: 'overview',
        component: () => import('@/views/Score/overview')
      },
      {
        path: 'recharge-record',
        component: () => import('@/views/Score/recharge')
      },
      {
        path: 'bill-record',
        component: () => import('@/views/Score/bill')
      },
      {
        path: 'return-record',
        component: () => import('@/views/Score/return')
      },
    ]
  },
  {
    path: '*',
    component: () => import('@/views/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

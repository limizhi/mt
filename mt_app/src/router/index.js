import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reg',
    name: 'Reg',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Reg.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ '../components/Cart.vue')
  },
  {
    path: '/orderConfirm',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "about" */ '../views/OrderConfirm.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pay.vue')
  },
  // {
  //   path: '/mine',
  //   name: 'Mine',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue')
  // },
  {
    path: '/usercenter',
    name: 'UserCenter',
    component: () => import(/* webpackChunkName: "about" */ '../components/UserCenter.vue')
  },
  {
    path: '/orderlist',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "about" */ '../components/OrderList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

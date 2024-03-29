import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/userlogin'
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/ws',
    name:'ws',
    component:()=>import("@/views/wslint/wsIndex.vue")
  },
  {
    path:'/userlogin',
    name:'userlogin',
    component:()=>import('@/views/login/userlogin.vue')
  },
  {
    path:'/test_vform',
    name:'test_vform',
    component:()=>import('@/views/test_vform/test_vform.vue')
  }
]

const router = createRouter({
  // createWebHashHistory
  // createWebHistory
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router

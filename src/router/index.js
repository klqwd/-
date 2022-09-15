import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//首屏加载速度很慢
//路由懒加载
//使用到了路由页面，再去请求他
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video/index.vue')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA/')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router

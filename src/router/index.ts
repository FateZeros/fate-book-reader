import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/book-shelf',
        name: 'book-shelf',
        component: () =>
          import(/* webpackChunkName: "book-shelf" */ '@/views/book-shelf/index'),
        meta: {
          title: '书架'
        }
      },
      {
        path: '/mine',
        name: 'mine',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "mine" */ '@/views/mine/index.vue'),
        meta: {
          title: '我的'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

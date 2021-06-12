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
          import(/* webpackChunkName: "book-shelf" */ '@/views/book-shelf/index.vue'),
        meta: {
          title: '书架'
        }
      },
      {
        path: '/book-search',
        name: 'book-search',
        component: () =>
          import(/* webpackChunkName: "book-shelf" */ '@/views/book-search/index.vue'),
        meta: {
          title: '书城'
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
  },
  {
    path: '/book-detail',
    name: 'book-detail',
    component: () =>
      import(/* webpackChunkName: "mine" */ '@/views/book-detail/index.vue'),
    meta: {
      title: '书籍详情'
    }
  },
  {
    path: '/share-us',
    name: 'share-us',
    component: () => import('@/views/mine/share-us/index.vue'),
    meta: {
      title: '分享'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

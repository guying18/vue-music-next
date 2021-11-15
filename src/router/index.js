import { createRouter, createWebHashHistory } from 'vue-router'
// 采用路由懒加载，通过注释语法来提供 chunk name
const Recommend = () => import(/* webpackChunkName: "Recommend" */ '@/views/recommend.vue')
const Singer = () => import(/* webpackChunkName: "Singer" */ '@/views/singer.vue')
const TopList = () => import(/* webpackChunkName: "top-list" */ '@/views/top-list.vue')
const Search = () => import(/* webpackChunkName: "Search" */ '@/views/search.vue')
const SingerDetail = () => import(/* webpackChunkName: "singer-detail" */ '@/views/singer-detail.vue')
const Album = () => import(/* webpackChunkName: "Album" */ '@/views/album.vue')
const TopDetail = () => import(/* webpackChunkName: "top-detail" */ '@/views/top-detail.vue')
const UserCenter = () => import(/* webpackChunkName: "user-center" */ '@/views/user-center.vue')
// import Recommend from '@/views/recommend.vue'
// import Singer from '@/views/singer.vue'
// import TopList from '@/views/top-list.vue'
// import Search from '@/views/search.vue'
// import SingerDetail from '@/views/singer-detail.vue'
// import Album from '@/views/album.vue'
// import TopDetail from '@/views/top-detail.vue'
// import UserCenter from '@/views/user-center.vue'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    components: {
      user: UserCenter
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

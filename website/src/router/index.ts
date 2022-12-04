import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import FeedView from '../views/Feed.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FeedView
    },
    {
      path: '/post/:id',
      name: 'ViewPost',
      component: () => import('../views/ViewPost.vue')
    }
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ]
})

export default router

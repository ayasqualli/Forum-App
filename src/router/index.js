import { createRouter, createWebHistory } from 'vue-router'

import DiscussionDetail from '@/components/DiscussionDetail.vue'
import DiscussionList from '@/components/DiscussionList.vue'
const routes = [
  {
    path: '/',
    name: 'Discussionlist',
    component: DiscussionList,
  },
  {
    path: '/detail/:id', // :id est un paramètre dynamique
    name: 'DiscussionDetail',
    component: DiscussionDetail,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

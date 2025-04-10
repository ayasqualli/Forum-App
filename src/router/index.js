import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import DiscussionDetail from '@/components/DiscussionDetail.vue'
import DiscussionList from '@/components/DiscussionList.vue'
const routes = [
  {
    path: '/all',
    name: 'Discussionlist',
    component: DiscussionList,
  },
  {
    path: '/detail/:id', // :id est un paramètre dynamique
    name: 'DiscussionDetail',
    component: DiscussionDetail,
  },
  {  path: "/",
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

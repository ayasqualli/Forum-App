import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ProfileView from '../views/Profile.vue'
import DiscussionDetail from '@/components/DiscussionDetail.vue'
import DiscussionList from '@/components/DiscussionList.vue'
import NotFoundView from "../views/NotFoundView.vue"
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
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/404',
    name: 'Not Found',
    component: NotFoundView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

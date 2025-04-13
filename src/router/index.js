import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ProfileView from '../views/Profile.vue'
import DiscussionDetail from '@/components/DiscussionDetail.vue'
import DiscussionList from '@/components/DiscussionList.vue'
import NotFoundView from "../views/NotFoundView.vue"
import NewDiscussion from "@/components/NewDiscussionForm.vue"
import NewResponseForm from '@/components/NewResponseForm.vue'
const routes = [
  {
    path: '/all',
    name: 'Discussionlist',
    component: DiscussionList,
  },
  {
    path: '/discussion/:id', // :id est un paramètre dynamique
    name: 'detail',
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
    path: "/new-discussion",
    name: 'New Discussion',
    component: NewDiscussion
  },
  {
    path: "/new-response",
    name: 'New Response',
    component: NewDiscussion
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/Forgot',
    name: 'Forgot',
    component: () => import(/* webpackChunkName: "forgot" */ '../views/ForgotView.vue')
  },
  {
    path: '/reset',
    name: 'ResetPassword', 
    component: () => import(/* webpackChunkName: "reset" */ '../views/ResetPassword.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

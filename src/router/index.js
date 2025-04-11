import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignupView.vue')
  },
  { path: "/Forgot", 
    name : 'Forgot',
    component: () => import(/* webpackChunkName: "signup" */ '../views/ForgotView.vue') 
  },
  { path: "/reset", 
    name : 'ResetPassword',
    component: () => import(/* webpackChunkName: "signup" */ '../views/ResetPassword.vue') 
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

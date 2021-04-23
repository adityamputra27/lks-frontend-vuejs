import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import Board from '@/components/Board'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/board',
    name: 'Board',
    component: Board
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

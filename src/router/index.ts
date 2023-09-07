import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      meta: {
        index: 1
      }
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    }
  ]
})

export default router

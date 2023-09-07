import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import ProductDetail from '../views/ProductDetail.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    },
    {
      path: '/product/:id',
      component: ProductDetail,
      name: 'product'
    }
  ]
})

export default router

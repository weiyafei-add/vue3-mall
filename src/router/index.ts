import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import ProductDetail from '../views/ProductDetail.vue'
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
      name: 'login',
      meta: {
        index: 1
      }
    },
    {
      path: '/product/:id',
      component: ProductDetail,
      name: 'product'
    },
    {
      path: '/product-list',
      component: () => import('@/views/ProductList.vue'),
      name: 'product-list',
      meta: {
        index: 2
      }
    },
    {
      path: '/category',
      component: () => import('@/views/Category.vue'),
      name: 'category',
      meta: {
        index: 1
      }
    },
    {
      path: '/cart',
      component: () => import('@/views/Cart.vue'),
      name: 'cart',
      meta: {
        index: 1
      }
    },
    {
      path: '/user',
      component: () => import('@/views/User.vue'),
      name: 'user',
      meta: {
        index: 1
      }
    },
    {
      path: '/about',
      component: () => import('@/views/About.vue'),
      name: 'about',
      meta: {
        index: 2
      }
    },
    {
      path: '/address',
      component: () => import('@/views/Address.vue'),
      name: 'address',
      meta: {
        index: 2
      }
    },
    {
      path: '/address-edit',
      component: () => import('@/views/AddressEdit.vue'),
      name: 'address-edit',
      meta: {
        index: 3
      }
    }
  ]
})

export default router

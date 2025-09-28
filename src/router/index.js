import CarrinhoView from '@/views/CarrinhoView.vue'
import ComprarView from '@/views/ComprarView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: "/",
      name: "Home",
      component: HomeView
     },
     { 
      path: "/Login",
      name: "Login",
      component: LoginView
     },
     { 
      path: "/Comprar",
      name: "Comprar",
      component: ComprarView
     },
     { 
      path: "/Carrinho",
      name: "Carrinho",
      component: CarrinhoView
     },
    ],
})

export default router

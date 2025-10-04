import CarrinhoView from '@/views/CarrinhoView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProdutoView from '@/views/ProdutoView.vue'
import ContatosView from '@/views/ContatosView.vue'

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
      path: "/Produto",
      name: "Produto",
      component: ProdutoView
     },
     { 
      path: "/Carrinho",
      name: "Carrinho",
      component: CarrinhoView
     },
     {
      path: "/Contatos",
      name: "/Contatos",
      component: ContatosView
     }
    ],
})

export default router

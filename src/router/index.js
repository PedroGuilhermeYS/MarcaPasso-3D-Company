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
      path: "/Carrinho",
      name: "Carrinho",
      component: CarrinhoView
    },
    {
      path: "/Contatos",
      name: "/Contatos",
      component: ContatosView
    },
    { path: '/Produto/:id',
      name: 'Produto', 
      component: ProdutoView, 
      props: true 
    }
  ],
})

export default router

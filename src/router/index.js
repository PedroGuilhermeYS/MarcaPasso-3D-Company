import CarrinhoView from '@/views/CarrinhoView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ProdutoView from '@/views/ProdutoView.vue'
import ContatosView from '@/views/ContatosView.vue'
import FavoritosView from '@/views/FavoritosView.vue'
import AdminProdutosView from '@/views/AdminProdutosView.vue'
import PainelUserView from '@/views/PainelUserView.vue'
import EntregaView from '@/views/EntregaView.vue'
import FormaPagamentoView from '@/views/FormaPagamentoView.vue'
import EncomendasView from '@/views/EncomendasView.vue'

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
    },
    {
      path: "/Favoritos",
      name: "/Favoritos",
      component: FavoritosView
    },
    {
      path: "/admin",
      name: "AdminProdutos",
      component: AdminProdutosView
    },
    {
      path: "/Painel",
      name: "PainelUser",
      component: PainelUserView
    },
    {
      path: "/Entrega",
      name: "Entrega",
      component: EntregaView
    },
    {
      path: "/FormaPagamento", 
      name: "FormadePagamento",
      component: FormaPagamentoView
    },
    {
      path: "/Encomendas", 
      name: "Encomendas",
      component: EncomendasView
    }
  ],
})

export default router

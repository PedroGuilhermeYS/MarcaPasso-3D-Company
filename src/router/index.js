import CarrinhoView from '@/views/CarrinhoView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { createRouter, createWebHistory } from 'vue-router'
import ProdutoView from '@/views/ProdutoView.vue'
import ContatosView from '@/views/ContatosView.vue'
import FavoritosView from '@/views/FavoritosView.vue'
import AdminProdutosView from '@/views/AdicionarProdutosView.vue'
import AtualizarProdutoView from '@/views/AtualizarProdutoView.vue'
import RemoverProdutoView from '@/views/RemoverProdutoView.vue'
import CrudView from '@/views/CrudView.vue'
import AllProdutosView from '@/views/AllProdutosView.vue'
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
      name: "Contatos",
      component: ContatosView
    },
    { path: '/Produto/:id',
      name: 'Produto', 
      component: ProdutoView, 
      props: true 
    },
    {
      path: "/Favoritos",
      name: "Favoritos",
      component: FavoritosView,
      meta: { requiresAuth: true }
    },
    {
      path: "/Crud",
      name: "Crud",
      component: CrudView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/Produtos",
      name: "AllProdutos",
      component: AllProdutosView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/Atualizar",
      name: "AtualizarProdutos",
      component: AtualizarProdutoView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/Remover",
      name: "RemoverProdutos",
      component: RemoverProdutoView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/Painel",
      name: "PainelUser",
      component: PainelUserView
    },
    {
      path: "/Entrega",
      name: "Entrega",
      component: EntregaView,
      meta: { requiresAuth: true }
    },
    {
      path: "/FormaPagamento", 
      name: "FormadePagamento",
      component: FormaPagamentoView,
      meta: { requiresAuth: true }
    },
    {
      path: "/Encomendas", 
      name: "Encomendas",
      component: EncomendasView,
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
  const requiresAdmin = to.matched.some(r => r.meta.requiresAdmin)

  if (!requiresAuth) {
    return next()
  }

  const auth = getAuth()
  const user = auth.currentUser

  if (!user) {
    return next("/Login")
  }

  if (requiresAdmin && user.email !== "pedro210905@gmail.com") {
    return next("/")
  }

  return next()
})

export default router
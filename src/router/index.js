import CarrinhoView from '@/views/CarrinhoView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { getAuth } from "firebase/auth"
import { createRouter, createWebHistory } from 'vue-router'
import ProdutoView from '@/views/ProdutoView.vue'
import ContatosView from '@/views/ContatosView.vue'
import FavoritosView from '@/views/FavoritosView.vue'
import AdminProdutosView from '@/views/AdicionarProdutosView.vue'
import AtualizarProdutoView from '@/views/AtualizarProdutoView.vue'
import CrudView from '@/views/CrudView.vue'
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
      path: "/Adicionar",
      name: "AdicionarProdutos",
      component: AdminProdutosView,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/Atualizar/:id",
      name: "AtualizarProdutos",
      component: AtualizarProdutoView,
      props: true,
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
  const viaCrud = to.matched.some(r => r.meta.viaCrud)

  const auth = getAuth()
  const user = auth.currentUser

  // 🔓 Rotas públicas
  if (!requiresAuth) {
    return next()
  }

  // 🔐 Não logado
  if (!user) {
    return next("/Login")
  }

  // 👑 Não é admin
  if (requiresAdmin && user.email !== "pedro210905@gmail.com") {
    return next("/")
  }

  // 🚫 Bloqueio de acesso direto por URL
  if (viaCrud && from.name !== "AllProdutos") {
    return next("/Produtos")
  }

  return next()
})

export default router
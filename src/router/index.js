import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

import PadraoLayout from '@/layouts/PadraoLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CarrinhoView from '@/views/CarrinhoView.vue'
import ContatosView from '@/views/ContatosView.vue'
import PainelUserView from '@/views/PainelUserView.vue'
import EntregaView from '@/views/EntregaView.vue'
import FormaPagamentoView from '@/views/FormaPagamentoView.vue'
import EncomendasView from '@/views/EncomendasView.vue'
import SomenteLogoLayout from '@/layouts/SomenteLogoLayout.vue'

// Lazy-loaded / heavier views
const ProdutoView = () => import('@/views/ProdutoView.vue')
const FavoritosView = () => import('@/views/FavoritosView.vue')
const CrudView = () => import('@/views/CrudView.vue')
const AdminProdutosView = () => import('@/views/AdicionarProdutosView.vue')
const AtualizarProdutoView = () => import('@/views/AtualizarProdutoView.vue')

const routes = [
  {
    path: '/',
    component: PadraoLayout,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'produto/:id', name: 'Produto', component: ProdutoView, props: true },
      { path: 'carrinho', name: 'Carrinho', component: CarrinhoView },
      { path: 'contatos', name: 'Contatos', component: ContatosView },
    ]
  },

  {
    path: '/',
    component: LoginLayout,
    children: [
      { path: 'login', name: 'Login', component: LoginView },
      { path: 'formapagamento', name: 'FormaPagamento', component: FormaPagamentoView, meta: { requiresAuth: true } },
      { path: 'conta/painel', name: 'PainelUsuario', component: PainelUserView, meta: { requiresAuth: true } }
    ]
  },


  {
    path: '/conta',
    component: PadraoLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'entrega', name: 'Entrega', component: EntregaView },
      { path: 'encomendas', name: 'Encomendas', component: EncomendasView },
      { path: 'favoritos', name: 'Favoritos', component: FavoritosView }
    ]
  },

  {
    path: '/admin',
    component: DashboardLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: 'crud', name: 'Crud', component: CrudView },
      { path: 'adicionar', name: 'AdicionarProdutos', component: AdminProdutosView },
    ]
  },

  {
    path: '/admin',
    component: SomenteLogoLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: 'atualizar/:id', name: 'AtualizarProduto', component: AtualizarProdutoView, props: true }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


let authInitPromise = null

function waitForAuthInit() {
  if (!authInitPromise) {
    const auth = useAuthStore()
    authInitPromise = auth.sincronizarSessao().finally(() => {})
  }
  return authInitPromise
}

router.beforeEach(async (to) => {
  await waitForAuthInit()

  const requiresAuth = to.matched.some(r => r.meta?.requiresAuth)
  const requiresAdmin = to.matched.some(r => r.meta?.requiresAdmin)

  const auth = useAuthStore()
  const user = auth.usuario

  if (!requiresAuth) return true

  if (!user) {
    return { name: 'Login' }
  }

  if (requiresAdmin && !auth.isAdmin()) {
    return { name: 'Home' }
  }

  return true
})

export default router

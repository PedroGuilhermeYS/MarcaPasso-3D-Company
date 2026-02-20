import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFavoritoService } from '@/services/favoritoService'
import { useAsyncHandler } from '@/composables/useAsyncHandler'
import { normalizarIdObjeto } from '@/composables/useNormalizadorId'
import { useAuthStore } from './useAuthStore'

export const useFavoritosStore = defineStore('favoritos', () => {
  const favoritos = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  const authStore = useAuthStore()
  const favoritoService = useFavoritoService()

  const { run: withHandling } = useAsyncHandler({ carregando, erro })

  const total = computed(() =>
    favoritos.value.reduce((acc, item) => acc + (item.preco || 0), 0)
  )

  const favoritosIds = computed(() =>
    new Set(favoritos.value.map(f => f.id))
  )

  const isFavoritado = (id) =>
    favoritosIds.value.has(String(id))

  const quantidade = computed(() => favoritos.value.length)

  async function carregarFavoritos() {
    if (!authStore.usuario) {
      favoritos.value = []
      return
    }

    const lista = await withHandling(
      () => favoritoService.buscarTodos(),
      'Erro ao carregar favoritos'
    )

    favoritos.value = (lista || []).map(normalizarIdObjeto)
  }


  async function adicionarFavorito(produto) {
    const novo = await withHandling(
      () => favoritoService.adicionarFavorito(produto),
      'Erro ao adicionar favorito'
    )

    const favoritoNormalizado = normalizarIdObjeto(novo)

    if (!favoritos.value.some(f => f.id === favoritoNormalizado.id)) {
      favoritos.value.push(favoritoNormalizado)
    }

    return favoritoNormalizado
  }


  async function removerFavorito(id) {
    await withHandling(
      () => favoritoService.removerFavorito(id),
      'Erro ao remover favorito'
    )

    const sid = String(id)

    favoritos.value = favoritos.value.filter(f => String(f.id) !== sid)
  }

  async function limparFavoritos() {
    await withHandling(
      () => favoritoService.removerTodosFavoritos(),
      'Erro ao limpar favoritos'
    )

    favoritos.value = []
  }

  async function atualizarFavorito(id, dados) {
    const atualizado = await withHandling(
      () => favoritoService.atualizarFavorito(id, dados),
      'Erro ao atualizar favorito'
    )

    const favoritoNormalizado = normalizarIdObjeto(atualizado)

    favoritos.value = favoritos.value.map(f =>
      f.id === favoritoNormalizado.id
        ? { ...f, ...favoritoNormalizado }
        : f
    )

    return favoritoNormalizado
  }

  authStore.$subscribe((_, state) => {
    if (state.usuario) {
      carregarFavoritos()
    } else {
      favoritos.value = []
    }
  })

  return {
    favoritos,
    carregando,
    erro,

    total,
    quantidade,
    isFavoritado,

    carregarFavoritos,
    adicionarFavorito,
    removerFavorito,
    limparFavoritos,
    atualizarFavorito,
  }
})

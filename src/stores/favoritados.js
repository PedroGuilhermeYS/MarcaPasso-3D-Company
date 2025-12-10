import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useAuthStore } from './useAuthStore'
import { salvarFavoritos, carregarFavoritos } from '@/firebase/userData'

export const useFavoritadosStore = defineStore('favoritos', () => {
  const itens = ref([])
  const auth = useAuthStore()

  const total = computed(() =>
    itens.value.reduce((acc, item) => acc + item.preco, 0)
  )

  watch(itens, async (novo) => {
    if (auth.usuario) {
      await salvarFavoritos(auth.usuario.uid, novo)
    }
  }, { deep: true })

  async function carregarDoFirebase() {
    if (auth.usuario) {
      itens.value = await carregarFavoritos(auth.usuario.uid)
    }
  }

  function adicionarItem(produto) {
    const existente = itens.value.find(i => i.id === produto.id)
    if (!existente) {
      itens.value.push({
        id: produto.id,
        imagem: produto.imagem,
        nome: produto.nome,
        preco: produto.preco
      })
    }
  }

  function isFavoritado(id) {
    return itens.value.some(i => i.id === id)
  }

  function removerItem(id) {
    itens.value = itens.value.filter(i => i.id !== id)
  }

  function limparfavoritos() {
    itens.value = []
  }

  if (auth.usuario) carregarDoFirebase()
  auth.$subscribe((_, state) => {
    if (state.usuario) carregarDoFirebase()
    else itens.value = []
  })

  return { itens, total, adicionarItem, removerItem, limparfavoritos, isFavoritado }
})
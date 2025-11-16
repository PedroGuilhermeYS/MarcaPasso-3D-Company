import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useAuthStore } from './useAuthStore'
import { salvarCarrinho, carregarCarrinho } from '@/firebase/userData'

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref([])
  const auth = useAuthStore()

  const total = computed(() =>
    itens.value.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
  )

  // 🔹 Salva automaticamente no Firebase quando itens mudarem
  watch(itens, async (novo) => {
    if (auth.usuario) {
      await salvarCarrinho(auth.usuario.uid, novo)
    }
  }, { deep: true })

  async function carregarDoFirebase() {
    if (auth.usuario) {
      itens.value = await carregarCarrinho(auth.usuario.uid)
    }
  }

  const alterarQuantidade = (id, quantidade) => {
    const item = itens.value.find(p => p.id === id)
    if (item && quantidade > 0) {
      item.quantidade = quantidade
    }
  }

  function adicionarItem(produto, quantidades) {
    const quantidade = Number(quantidades) || 1
    const existente = itens.value.find(i => i.id === produto.id)

    if (existente) {
      existente.quantidade += quantidade
    } else {
      itens.value.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagem: produto.imagem,
        quantidade
      })
    }
  }

  function removerItem(id) {
    itens.value = itens.value.filter(i => i.id !== id)
  }

  function limparCarrinho() {
    itens.value = []
  }

  // 🔹 Carregar automaticamente quando logar
  if (auth.usuario) carregarDoFirebase()
  auth.$subscribe((_, state) => {
    if (state.usuario) carregarDoFirebase()
    else itens.value = [] // deslogou → limpa
  })

  return { itens, total, adicionarItem, removerItem, alterarQuantidade, limparCarrinho }
})
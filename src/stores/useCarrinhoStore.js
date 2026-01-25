import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './useAuthStore'
import { useCarrinhoService } from '@/services/carrinhoService'
import { useAsyncHandler } from '@/composables/useAsyncHandler'
import { normalizarIdObjeto } from '@/composables/useNormalizadorId'

export const useCarrinhoStore = defineStore('carrinho', () => {
  const itens = ref([])
  const freteSelecionado = ref(null)

  const carregando = ref(false)
  const erro = ref(null)

  const authStore = useAuthStore()
  const carrinhoService = useCarrinhoService()

  const { run: withHandling } = useAsyncHandler({ carregando, erro })

  const total = computed(() =>
    itens.value.reduce(
      (acc, item) => acc + (Number(item.preco || 0) * Number(item.quantidade || 0)),
      0
    )
  )

  async function carregarCarrinho() {
    if (!authStore.usuario) {
      itens.value = []
      return
    }

    const lista = await withHandling(
      () => carrinhoService.buscarTodos(),
      'Erro ao carregar carrinho'
    )

    itens.value = Array.isArray(lista) ? lista.map(normalizarIdObjeto) : []
  }

  async function adicionarItem(produto, quantidadeInformada = 1) {
    produto = normalizarIdObjeto(produto)
    const quantidade = Number(quantidadeInformada) || 1

    let existente = await withHandling(
      () => carrinhoService.buscarItem(produto.id),
      'Erro ao buscar item no carrinho'
    )

    if (existente) {
      existente = normalizarIdObjeto(existente)
      return await alterarQuantidade(existente.id, Number(existente.quantidade || 0) + quantidade)
    }

    const novo = await withHandling(
      () =>
        carrinhoService.adicionarItem({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagemPrincipal,
          quantidade,
        }),
      'Erro ao adicionar item ao carrinho'
    )

    if (!novo) return null

    const normalizado = normalizarIdObjeto(novo)

    if (!itens.value.some(p => p.id === normalizado.id)) {
      itens.value.push(normalizado)
    } else {
      const idx = itens.value.findIndex(p => p.id === normalizado.id)
      if (idx !== -1) itens.value.splice(idx, 1, normalizado)
    }

    return normalizado
  }

  async function alterarQuantidade(id, quantidade) {
    if (quantidade <= 0) return

    const atualizado = await withHandling(
      () => carrinhoService.alterarQuantidade(id, quantidade),
      'Erro ao alterar quantidade'
    )

    // atualiza localmente por comparação de string para garantir consistência de tipos
    itens.value = itens.value.map(item =>
      String(item.id) === String(id)
        ? { ...item, quantidade }
        : item
    )

    return atualizado
  }

  async function removerItem(id) {
    await withHandling(
      () => carrinhoService.removerItem(id),
      'Erro ao remover item do carrinho'
    )

    itens.value = itens.value.filter(i => String(i.id) !== String(id))
  }

  async function limparCarrinho() {
    await withHandling(
      () => carrinhoService.limparCarrinho(),
      'Erro ao limpar carrinho'
    )

    itens.value = []
  }

  function definirFrete(frete) {
    freteSelecionado.value = frete
  }

  authStore.$subscribe((_, state) => {
    if (state.usuario) {
      carregarCarrinho()
    } else {
      itens.value = []
    }
  })

  return {
    itens,
    freteSelecionado,
    carregando,
    erro,

    total,

    carregarCarrinho,
    adicionarItem,
    alterarQuantidade,
    removerItem,
    limparCarrinho,
    definirFrete,
  }
})

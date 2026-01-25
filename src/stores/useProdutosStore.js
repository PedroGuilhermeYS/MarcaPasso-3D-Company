import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useProdutoService } from '@/services/produtoService'
import { useAsyncHandler } from '@/composables/useAsyncHandler.js'
import { normalizarIdObjeto } from '@/composables/useNormalizadorId'

export const useProdutosStore = defineStore('produtos', () => {
  const produtos = ref([])
  const produtoSelecionado = ref(null)
  const carregando = ref(false)
  const erro = ref(null)

  const produtoService = useProdutoService()

  const { run: withHandling } = useAsyncHandler({ carregando, erro })

  const carregarProdutos = async () => {
    const lista = await withHandling(
      () => produtoService.buscarTodos(),
      'Erro ao carregar produtos'
    )

    produtos.value = (lista || []).map(normalizarIdObjeto)
    return produtos.value
  }

  const buscarProduto = async (id) => {
    const p = await withHandling(
      () => produtoService.buscarProduto(id),
      'Erro ao buscar produto'
    )
    produtoSelecionado.value = normalizarIdObjeto(p) || null
    return produtoSelecionado.value
  }

  const adicionarProduto = async (produto) => {
    const novo = await withHandling(
      () => produtoService.adicionarProduto(produto),
      'Erro ao adicionar produto'
    )

    const normalizado = normalizarIdObjeto(novo)

    if (!produtos.value.some(p => String(p.id) === String(normalizado.id))) {
      produtos.value.push(normalizado)
    }
    return normalizado
  }

  const atualizarProduto = async (id, dados) => {
    const atualizado = await withHandling(
      () => produtoService.atualizarProduto(id, dados),
      'Erro ao atualizar produto'
    )

    const normalizado = normalizarIdObjeto(atualizado)

    produtos.value = produtos.value.map(p =>
      String(p.id) === String(normalizado.id) ? normalizado : p
    )

    if (produtoSelecionado.value && String(produtoSelecionado.value.id) === String(normalizado.id)) {
      produtoSelecionado.value = normalizado
    }

    return normalizado
  }

  const removerProduto = async (id) => {
    await withHandling(
      () => produtoService.removerProduto(id),
      'Erro ao remover produto'
    )

    const sid = String(id)
    produtos.value = produtos.value.filter(p => String(p.id) !== sid)

    if (produtoSelecionado.value && String(produtoSelecionado.value.id) === sid) {
      produtoSelecionado.value = null
    }

    return id
  }

  return {
    produtos,
    produtoSelecionado,
    carregando,
    erro,
    carregarProdutos,
    buscarProduto,
    adicionarProduto,
    atualizarProduto,
    removerProduto,
  }
})

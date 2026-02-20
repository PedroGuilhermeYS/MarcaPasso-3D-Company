import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProdutosStore } from '@/stores/useProdutosStore'
import { useAsyncHandler } from '@/composables/useAsyncHandler.js'

export const usePesquisaStore = defineStore('pesquisa', () => {
  const termo = ref('')
  const categoriaSelecionada = ref('')
  const precoSelecionado = ref('') // '1', '2', '3' conforme sua lógica
  const personalizavelSelecionado = ref('') // esperado 'true' | 'false' | ''
  const ordenacaoSelecionada = ref('') // '' | 'az' | 'maior' | 'menor'

  const carregando = ref(false)
  const erro = ref(null)

  const produtosStore = useProdutosStore()
  const { run: withHandling } = useAsyncHandler({ carregando, erro })

  function getNome(p) {
    return String(p.nome ?? p.title ?? p.name ?? '').toLowerCase()
  }
  function getPreco(p) {
    return Number(p.preco ?? p.price ?? 0)
  }
  function getCategoria(p) {
    return p.categoria ?? p.category ?? ''
  }
  function getPersonalizavel(p) {
    const val = p.personalizavel ?? p.customizable ?? p.personalizable
    return String(val)
  }

  async function init({ forceRemote = false } = {}) {
    if (!forceRemote && Array.isArray(produtosStore.produtos) && produtosStore.produtos.length > 0) {
      return produtosStore.produtos
    }
    const res = await withHandling(() => produtosStore.carregarProdutos(), 'Erro ao carregar produtos')
    return produtosStore.produtos
  }

  function aplicaFiltros(lista) {
    const chave = termo.value?.trim().toLowerCase() ?? ''

    let filtrados = lista.filter(p => {
      let passa = true

      if (chave && !getNome(p).includes(chave)) {
        passa = false
      }

      if (categoriaSelecionada.value && getCategoria(p) !== categoriaSelecionada.value) {
        passa = false
      }

      if (precoSelecionado.value) {
        const preco = getPreco(p)
        if (precoSelecionado.value === '1' && preco > 50) passa = false // <=50
        if (precoSelecionado.value === '2' && (preco < 50 || preco > 100)) passa = false // 50..100
        if (precoSelecionado.value === '3' && preco < 100) passa = false // >=100
      }

      if (personalizavelSelecionado.value && String(getPersonalizavel(p)) !== personalizavelSelecionado.value) {
        passa = false
      }

      return passa
    })

    if (ordenacaoSelecionada.value === 'az') {
      filtrados.sort((a, b) => getNome(a).localeCompare(getNome(b)))
    } else if (ordenacaoSelecionada.value === 'maior') {
      filtrados.sort((a, b) => getPreco(b) - getPreco(a))
    } else if (ordenacaoSelecionada.value === 'menor') {
      filtrados.sort((a, b) => getPreco(a) - getPreco(b))
    }

    return filtrados
  }

  const produtosFiltrados = computed(() => {
    const lista = Array.isArray(produtosStore.produtos) ? produtosStore.produtos : []
    return aplicaFiltros(lista)
  })

  async function buscar({ forceRemote = false } = {}) {
    if (forceRemote) {
      await withHandling(async () => {
        await produtosStore.carregarProdutos()
      }, 'Erro ao atualizar produtos')
    } else {

      if (!Array.isArray(produtosStore.produtos) || produtosStore.produtos.length === 0) {
        await init()
      }
    }

    return produtosFiltrados.value
  }

  function setTerm(novo) {
    termo.value = novo
  }
  function setCategoria(novo) {
    categoriaSelecionada.value = novo
  }
  function setPreco(novo) {
    precoSelecionado.value = novo
  }
  function setPersonalizavel(novo) {
    personalizavelSelecionado.value = novo
  }
  function setOrdenacao(novo) {
    ordenacaoSelecionada.value = novo
  }

  function limparFiltros() {
    categoriaSelecionada.value = ''
    precoSelecionado.value = ''
    personalizavelSelecionado.value = ''
    ordenacaoSelecionada.value = ''
  }

  const count = computed(() => produtosFiltrados.value.length)

  return {
    termo,
    categoriaSelecionada,
    precoSelecionado,
    personalizavelSelecionado,
    ordenacaoSelecionada,

    carregando,
    erro,

    produtosFiltrados,
    count,

    init,
    buscar,
    setTerm,
    setCategoria,
    setPreco,
    setPersonalizavel,
    setOrdenacao,
    limparFiltros,
  }
})

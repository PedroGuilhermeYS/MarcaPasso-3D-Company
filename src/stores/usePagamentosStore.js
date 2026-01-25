import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usePagamentosService } from '@/services/pagamentosService'
import { useAsyncHandler } from '@/composables/useAsyncHandler'
import { normalizarIdObjeto } from '@/composables/useNormalizadorId'

export const usePagamentoStore = defineStore('pagamentos', () => {
  const pagamentos = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  const service = usePagamentosService()
  const { run: withHandling } = useAsyncHandler({ carregando, erro })

  async function buscarPagamentos() {
    const lista = await withHandling(
      () => service.getPagamentos(),
      'Erro ao carregar pagamentos'
    )
    pagamentos.value = Array.isArray(lista) ? lista.map(normalizarIdObjeto) : []
    return pagamentos.value
  }

  async function buscarPagamento(id) {
    const sid = String(id)
    const local = pagamentos.value.find(p => String(p.id) === sid)
    if (local) return local

    const p = await withHandling(
      () => service.getPagamento(id),
      'Erro ao buscar pagamento'
    )
    const normalizado = normalizarIdObjeto(p) || null
    if (normalizado) {
      const exists = pagamentos.value.some(x => String(x.id) === normalizado.id)
      if (!exists) pagamentos.value.push(normalizado)
    }
    return normalizado
  }

  async function addPagamento(pagamento) {
    const criado = await withHandling(
      () => service.addPagamento(pagamento),
      'Erro ao adicionar pagamento'
    )
    if (!criado) return null

    const normalizado = normalizarIdObjeto(criado)

    if (!pagamentos.value.some(p => String(p.id) === normalizado.id)) {
      pagamentos.value.push(normalizado)
    } else {
      const idx = pagamentos.value.findIndex(p => String(p.id) === normalizado.id)
      pagamentos.value.splice(idx, 1, normalizado)
    }

    return normalizado
  }

  async function atualizarPagamento(id, dados) {
    const atualizado = await withHandling(
      () => service.atualizaPagamento(id, dados),
      'Erro ao atualizar pagamento'
    )
    if (!atualizado) return null

    const normalizado = normalizarIdObjeto(atualizado)

    pagamentos.value = pagamentos.value.map(p =>
      String(p.id) === normalizado.id ? normalizado : p
    )

    return normalizado
  }

  async function removerPagamento(id) {
    await withHandling(
      () => service.removePagamento(id),
      'Erro ao remover pagamento'
    )

    const sid = String(id)
    pagamentos.value = pagamentos.value.filter(p => String(p.id) !== sid)
    return id
  }

  const totalPagamentos = computed(() => pagamentos.value.length)
  const totalValor = computed(() =>
    pagamentos.value.reduce((soma, p) => soma + Number(p?.valor ?? 0), 0)
  )

  return {
    pagamentos,
    carregando,
    erro,

    buscarPagamentos,
    buscarPagamento,
    addPagamento,
    atualizarPagamento,
    removerPagamento,

    totalPagamentos,
    totalValor
  }
})

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCupomService } from '@/services/cupomService'
import { useAsyncHandler } from '@/composables/useAsyncHandler'
import { normalizarIdObjeto } from '@/composables/useNormalizadorId'

export const useCupomStore = defineStore('cupons', () => {
  const cupons = ref([])
  const carregando = ref(false)
  const erro = ref(null)

  const service = useCupomService()
  const { run: withHandling } = useAsyncHandler({ carregando, erro })

  async function carregarCupons() {
    const lista = await withHandling(
      () => service.getTodosCupons(),
      'Erro ao carregar cupons'
    )
    cupons.value = lista.map(normalizarIdObjeto)
    return cupons.value
  }

  async function buscarCupom(id) {
    const sid = String(id)
    const local = cupons.value.find(c => c.id === sid)
    if (local) return local
    return await withHandling(
      () => service.getCupom(sid),
      'Erro ao buscar cupom'
    )
  }

  async function adicionarCupom(cupom) {
    const criado = await withHandling(
      () => service.addCupom(cupom),
      'Erro ao adicionar cupom'
    )
    if (!criado) return null

    const normalizado = normalizarIdObjeto(criado)

    if (!cupons.value.some(c => c.id === normalizado.id)) {
      cupons.value.push(normalizado)
    }
    return normalizado
  }

  async function atualizarCupom(id, dados) {
    const sid = String(id)
    const atualizado = await withHandling(
      () => service.atualizaCupom(id, dados),
      'Erro ao atualizar cupom'
    )
    if (!atualizado) return null

    const atualizadoNormalizado = normalizarIdObjeto(atualizado)

    cupons.value = cupons.value.map(c => (c.id === sid ? atualizadoNormalizado : c))
    return atualizadoNormalizado
  }

  async function removerCupom(id) {
    const sid = String(id)
    const removido = await withHandling(
      () => service.removeCupom(id),
      'Erro ao remover cupom'
    )
    cupons.value = cupons.value.filter(c => c.id !== sid)
    return removido
  }

  const totalCupons = computed(() => cupons.value.length)

  return {
    cupons,
    carregando,
    erro,

    carregarCupons,
    buscarCupom,
    adicionarCupom,
    atualizarCupom,
    removerCupom,
    totalCupons
  }
})

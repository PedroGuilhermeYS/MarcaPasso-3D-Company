import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFreteService } from '@/services/freteService'
import { useAsyncHandler } from '@/composables/useAsyncHandler'
import { normalizarIdObjeto } from '@/composables/useNormalizadorId'

export const useFretesStore = defineStore('fretes', () => {
  const fretes = ref([])
  const carregando = ref(false)
  const erro = ref(null)
  const adicionando = ref(false)

  const { run: withHandling } = useAsyncHandler({ carregando, erro })
  const freteService = useFreteService()

  async function carregarFretes() {
    const lista = await withHandling(
      () => freteService.getFretes(),
      'Erro ao carregar fretes'
    )

    fretes.value = lista.map(normalizarIdObjeto)
    return fretes.value
  }

  async function adicionarFrete(frete) {
    if (adicionando.value) return null
    adicionando.value = true

    try {
      const novo = await withHandling(
        () => freteService.addFrete(frete),
        'Erro ao adicionar frete'
      )
      if (!novo) return null

      const novoNormalizado = normalizarIdObjeto(novo)

      const existe = fretes.value.some(f => f.id === novoNormalizado.id)
      if (!existe) fretes.value.push(novoNormalizado)

      return novoNormalizado
    } finally {
      adicionando.value = false
    }
  }

  async function atualizarFrete(id, dados) {
    const sid = String(id)
    const atualizado = await withHandling(
      () => freteService.atualizaFrete(id, dados),
      'Erro ao atualizar frete'
    )
    if (!atualizado) return null

    fretes.value = fretes.value.map(f => (f.id === sid ? atualizado : f))
    return atualizado
  }

  async function removerFrete(id) {
    const sid = String(id)
    const removido = await withHandling(
      () => freteService.removeFrete(id),
      'Erro ao remover frete'
    )
    fretes.value = fretes.value.filter(f => f.id !== sid)
    return removido
  }

  return {
    fretes,
    carregando,
    erro,
    adicionando,

    carregarFretes,
    adicionarFrete,
    atualizarFrete,
    removerFrete
  }
})

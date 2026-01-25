import { ref } from "vue"
import { defineStore } from "pinia"
import { useAsyncHandler } from "@/composables/useAsyncHandler"
import { normalizarIdObjeto } from "@/composables/useNormalizadorId"
import { useEncomendasService } from "@/services/encomendasService"

export const useEncomendasStore = defineStore('encomendas', () => {

    const encomendas = ref([])

    const carregando = ref(false)
    const erro = ref(null)

    const { run: withHandling } = useAsyncHandler({ carregando, erro })

    const encomendasService = useEncomendasService()

    const carregarEncomendas = async () => {
        carregando.value = true
        erro.value = null

        const lista = await withHandling(async () => encomendasService.buscarEncomendas(), 'Erro ao carregar encomendas')

        encomendas.value = lista.map(normalizarIdObjeto)
    }

    const buscarEncomenda = async (id) => {
        return await withHandling(async () => encomendasService.buscarEncomenda(String(id)), 'Erro ao buscar encomenda')
    }

    const adicionarEncomenda = async (encomenda) => {
        encomenda = normalizarIdObjeto(encomenda)
        return await withHandling(async () => encomendasService.adicionarEncomenda(encomenda), 'Erro ao adicionar encomenda')
    }

    return {
        encomendas,
        carregando,
        erro,

        carregarEncomendas,
        buscarEncomenda,
        adicionarEncomenda
    }

})
import {
    getTodasEncomendasNaApi,
    getEncomendaNaApi,
    addEncomendaNaApi,
} from '@/api/encomenda'

export function useEncomendasService() {

    async function buscarEncomendas() {
        return await getTodasEncomendasNaApi()
    }

    async function buscarEncomenda(id) {
        return await getEncomendaNaApi(id)
    }

    async function adicionarEncomenda(encomenda) {
        return await addEncomendaNaApi(encomenda)
    }

    return {
        buscarEncomendas,
        buscarEncomenda,
        adicionarEncomenda,
    }

}


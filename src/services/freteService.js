import {
    getFreteNaApi,
    getTodosFretesNaApi,
    addFreteNaApi,
    removeFreteNaApi,
    atualizaFreteNaApi
} from '../api/frete'

export function useFreteService() {
    
    async function getFrete(id) {
        return await getFreteNaApi(id)
    }
    async function getFretes() {
        return await getTodosFretesNaApi()
    }
    async function addFrete(frete) {
        return await addFreteNaApi(frete)
    }
    async function removeFrete(id) {
        return await removeFreteNaApi(id)
    }
    async function atualizaFrete(id, frete) {
        return await atualizaFreteNaApi(id, frete)
    }

    return {
        getFrete,
        getFretes,
        addFrete,
        removeFrete,
        atualizaFrete
    }

}

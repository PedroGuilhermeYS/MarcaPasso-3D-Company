import {
    getTodosCuponsNaApi,
    getCupomNaApi,
    cadastrarCupomNaApi
} from '@/api/cupons'

export function useCupomService() {
    
    async function getCupom(id) {
        return await getCupomNaApi(id)
    }
    async function getTodosCupons() {
        return await getTodosCuponsNaApi()
    }
    async function addCupom(cupom) {
        return await cadastrarCupomNaApi(cupom)
    }
    async function removeCupom(id) {
        return await removeCupomNaApi(id)
    }
    async function atualizaCupom(id, cupom) {
        return await atualizaCupomNaApi(id, cupom)
    }

    return {
        getCupom,
        getTodosCupons,
        addCupom,
        removeCupom,
        atualizaCupom
    }

}


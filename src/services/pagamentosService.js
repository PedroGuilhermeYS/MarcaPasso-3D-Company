import {
    getTodosPagamentosNaApi,
    getPagamentoNaApi,
    addPagamentoNaApi,
    removePagamentoNaApi,
    atualizaPagamentoNaApi
} from '../api/pagamento'

export function usePagamentosService() {
    
    async function getPagamento(id) {
        return await getPagamentoNaApi(id)
    }
    async function getPagamentos() {
        return await getTodosPagamentosNaApi()
    }
    async function addPagamento(pagamento) {
        return await addPagamentoNaApi(pagamento)
    }
    async function removePagamento(id) {
        return await removePagamentoNaApi(id)
    }
    async function atualizaPagamento(id, pagamento) {
        return await atualizaPagamentoNaApi(id, pagamento)
    }

    return {
        getPagamento,
        getPagamentos,
        addPagamento,
        removePagamento,
        atualizaPagamento
    }

}


const useMock = import.meta.env.VITE_API_MOCK === 'true'

const freteApi = useMock
  ? await import('./pagamentoMock.js')
  : await import('./pagamentoApi.js')

export const {
    getTodosPagamentosNaApi,
    getPagamentoNaApi,
    addPagamentoNaApi,
    removePagamentoNaApi,
    atualizaPagamentoNaApi
} = freteApi


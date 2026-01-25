const useMock = import.meta.env.VITE_API_MOCK === 'true'

const cupomApi = useMock
    ? await import('./cupomMock.js')
    : await import('./cupomApi.js')

export const {
    getTodosCuponsNaApi,
    getCupomNaApi,
    cadastrarCupomNaApi
} = cupomApi

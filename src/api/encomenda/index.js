const useMock = import.meta.env.VITE_API_MOCK === 'true'

const encomendaApi = useMock
  ? await import('./encomendaMock.js')
  : await import('./encomendaApi.js')

export const {
  getTodasEncomendasNaApi,
  getEncomendaNaApi,
  addEncomendaNaApi
} = encomendaApi

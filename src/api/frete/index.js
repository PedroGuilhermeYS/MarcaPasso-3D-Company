const useMock = import.meta.env.VITE_API_MOCK === 'true'

const freteApi = useMock
  ? await import('./freteMock.js')
  : await import('./freteApi.js')

export const {
  getTodosFretesNaApi,
  getFreteNaApi,
  addFreteNaApi,
  removeFreteNaApi,
  removeTodosFretesNaApi,
  atualizaFreteNaApi
} = freteApi

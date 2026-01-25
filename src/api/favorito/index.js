const useMock = import.meta.env.VITE_API_MOCK === 'true'

const favoritoApi = useMock
  ? await import('./favoritoMock.js')
  : await import('./favoritoApi.js')

export const {
  getTodosFavoritosNaApi,
  getFavoritoNaApi,
  addFavoritoNaApi,
  removeFavoritoNaApi,
  removeTodosFavoritosNaApi,
  atualizaFavoritoNaApi
} = favoritoApi

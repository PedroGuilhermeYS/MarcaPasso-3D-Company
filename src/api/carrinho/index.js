const useMock = import.meta.env.VITE_API_MOCK === 'true'

const carrinhoApi = useMock
  ? await import('./carrinhoMock.js')
  : await import('./carrinhoApi.js')

export const {
  getCarrinhoNaApi,
  getItemCarrinhoNaApi,
  addItemCarrinhoNaApi,
  updateQuantidadeItemNaApi,
  removeItemCarrinhoNaApi,
  removeTodosItensCarrinhoNaApi
} = carrinhoApi

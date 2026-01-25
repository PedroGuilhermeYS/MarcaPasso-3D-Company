const useMock = import.meta.env.VITE_API_MOCK === 'true'

const produtoApi = useMock
  ? await import('./produtoMock.js')
  : await import('./produtoApi.js')

export const {
  getTodosProdutosNaApi,
  getProdutoNaApi,
  addProdutoNaApi,
  removeProdutoNaApi,
  atualizaProdutoNaApi,
} = produtoApi

import {
  getCarrinhoNaApi,
  getItemCarrinhoNaApi,
  addItemCarrinhoNaApi,
  updateQuantidadeItemNaApi,
  removeItemCarrinhoNaApi,
  removeTodosItensCarrinhoNaApi,
} from '@/api/carrinho'

export function useCarrinhoService() {
  async function buscarTodos() {
    return await getCarrinhoNaApi()
  }

  async function buscarItem(id) {
    return await getItemCarrinhoNaApi(id)
  }

  async function adicionarItem(item) {
    return await addItemCarrinhoNaApi(item)
  }

  async function alterarQuantidade(id, quantidade) {
    return await updateQuantidadeItemNaApi(id, quantidade)
  }

  async function removerItem(id) {
    return await removeItemCarrinhoNaApi(id)
  }

  async function limparCarrinho() {
    return await removeTodosItensCarrinhoNaApi()
  }

  return {
    buscarTodos,
    buscarItem,
    adicionarItem,
    alterarQuantidade,
    removerItem,
    limparCarrinho,
  }
}


import { ApiError } from "@/errors/ApiError"

const carrinho = []

export async function getCarrinhoNaApi() {
  return carrinho
}

export async function getItemCarrinhoNaApi(id) {
  return carrinho.find(item => item.id == id) || null
}

export async function addItemCarrinhoNaApi(item) {
  carrinho.push(item)
  return item
}

export async function updateQuantidadeItemNaApi(id, quantidade) {
  const itemEncontrado = carrinho.find(item => item.id == id)
  if (!itemEncontrado) {
    return Promise.reject(
      new ApiError("Item não encontrado", 404, null)
    );
  }
  itemEncontrado.quantidade = quantidade
  return itemEncontrado
}

export async function removeItemCarrinhoNaApi(id) {
  const itemEncontrado = carrinho.find(item => item.id == id)
  if (!itemEncontrado) {
    return Promise.reject(
      new ApiError("Item não encontrado", 404, null)
    );
  }
  const index = carrinho.indexOf(itemEncontrado)
  const itemRemovido = carrinho.splice(index, 1)[0]
  return itemRemovido
}

export async function removeTodosItensCarrinhoNaApi() {
  carrinho.splice(0, carrinho.length)
  return carrinho
}

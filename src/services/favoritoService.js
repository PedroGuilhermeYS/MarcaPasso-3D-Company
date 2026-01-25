import {
  getTodosFavoritosNaApi,
  getFavoritoNaApi,
  addFavoritoNaApi,
  removeFavoritoNaApi,
  removeTodosFavoritosNaApi,
  atualizaFavoritoNaApi
} from '@/api/favorito'

export function useFavoritoService() {
  async function buscarTodos() {
    return await getTodosFavoritosNaApi()
  }

  async function buscarFavorito(id) {
    return await getFavoritoNaApi(id)
  }

  async function adicionarFavorito(favorito) {
    return await addFavoritoNaApi(favorito)
  }

  async function removerFavorito(id) {
    return await removeFavoritoNaApi(id)
  }

  async function removerTodosFavoritos() {
    return await removeTodosFavoritosNaApi()
  }

  async function atualizarFavorito(id, favorito) {
    return await atualizaFavoritoNaApi(id, favorito)
  }

  return {
    buscarTodos,
    buscarFavorito,
    adicionarFavorito,
    removerFavorito,
    removerTodosFavoritos,
    atualizarFavorito,
  }
}

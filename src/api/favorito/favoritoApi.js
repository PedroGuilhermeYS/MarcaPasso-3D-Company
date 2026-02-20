import axiosInstance from "../config";

export async function getTodosFavoritosNaApi() {
  const { data } = await axiosInstance.get('/favoritos')
  return data
}

export async function getFavoritoNaApi(id) {
  const { data } = await axiosInstance.get(`/favoritos/${id}`)
  return data
}

export async function addFavoritoNaApi(favorito) {
  const { data } = await axiosInstance.post('/favoritos', favorito)
  return data
}

export async function removeFavoritoNaApi(id) {
  const { data } = await axiosInstance.delete(`/favoritos/${id}`)
  return data
}

export async function removeTodosFavoritosNaApi() {
  const { data } = await axiosInstance.delete('/favoritos')
  return data
}

export async function atualizaFavoritoNaApi(id, favorito) {
  const { data } = await axiosInstance.put(`/favoritos/${id}`, favorito)
  return data
}

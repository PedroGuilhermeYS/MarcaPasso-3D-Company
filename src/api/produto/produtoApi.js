import axiosInstance from "../config";

export async function getTodosProdutosNaApi() {
  const { data } = await axiosInstance.get('/produtos')
  return data
}

export async function getProdutoNaApi(id) {
  const { data } = await axiosInstance.get(`/produtos/${id}`)
  return data
}

export async function addProdutoNaApi(produto) {
  const { data } = await axiosInstance.post('/produtos', produto)
  return data
}

export async function removeProdutoNaApi(id) {
  const { data } = await axiosInstance.delete(`/produtos/${id}`)
  return data
}

export async function atualizaProdutoNaApi(id, produto) {
  const { data } = await axiosInstance.put(`/produtos/${id}`, produto)
  return data
}

import axiosInstance from "../config";

export async function getCarrinhoNaApi() {
    const { data } = await axiosInstance.get('/carrinho')
    return data
}

export async function getItemCarrinhoNaApi(id) {
    const { data } = await axiosInstance.get(`/carrinho/${id}`)
    return data
}

export async function addItemCarrinhoNaApi(item) {
    const { data } = await axiosInstance.post('/carrinho', item)
    return data
}

export async function updateQuantidadeItemNaApi(id, quantidade) {
    const { data } = await axiosInstance.put(`/carrinho/${id}`, { quantidade })
    return data
}

export async function removeItemCarrinhoNaApi(id) {
    const { data } = await axiosInstance.delete(`/carrinho/${id}`)
    return data
}

export async function removeTodosItensCarrinhoNaApi() {
    const { data } = await axiosInstance.delete('/carrinho')
    return data
}
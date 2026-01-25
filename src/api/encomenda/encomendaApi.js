import axiosInstance from "../config";

export async function getTodasEncomendasNaApi() {
    const { data } = await axiosInstance.get('/encomendas')
    return data
}

export async function getEncomendaNaApi(id) {
    const { data } = await axiosInstance.get(`/encomendas/${id}`)
    return data
}

export async function addEncomendaNaApi(encomenda) {
    const { data } = await axiosInstance.post('/encomendas', encomenda)
    return data
}

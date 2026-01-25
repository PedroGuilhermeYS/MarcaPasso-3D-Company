import axiosInstance from "../config";

export async function getTodosFretesNaApi() {
    const { data } = await axiosInstance.get('/fretes')
    return data
}

export async function getFreteNaApi(id) {
    const { data } = await axiosInstance.get(`/fretes/${id}`)
    return data
}

export async function addFreteNaApi(frete) {
    const { data } = await axiosInstance.post('/fretes', frete)
    return data
}

export async function removeFreteNaApi(id) {
    const { data } = await axiosInstance.delete(`/fretes/${id}`)
    return data
}

export async function removeTodosFretesNaApi() {
    const { data } = await axiosInstance.delete('/fretes')
    return data
}

export async function atualizaFreteNaApi(id, frete) {
    const { data } = await axiosInstance.put(`/fretes/${id}`, frete)
    return data
}


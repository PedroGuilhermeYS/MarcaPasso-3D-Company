import axiosInstance from "../config";

export async function getTodosCuponsNaApi() {
    const { data } = await axiosInstance.get('/cupons')
    return data
}

export async function getCupomNaApi(id) {
    const { data } = await axiosInstance.get(`/cupons/${id}`)
    return data
}

export async function cadastrarCupomNaApi(cupom) {
    const { data } = await axiosInstance.post('/cupons', cupom)
    return data
}
import axiosInstance from "../config";

export async function getTodosPagamentosNaApi() {
    const { data } = await axiosInstance.get('/pagamentos')
    return data
}

export async function getPagamentoNaApi(id) {
    const { data } = await axiosInstance.get(`/pagamentos/${id}`)
    return data
}

export async function addPagamentoNaApi(pagamento) {
    const { data } = await axiosInstance.post('/pagamentos', pagamento)
    return data
}

export async function removePagamentoNaApi(id) {
    const { data } = await axiosInstance.delete(`/pagamentos/${id}`)
    return data
}

export async function atualizaPagamentoNaApi(id, pagamento) {
    const { data } = await axiosInstance.put(`/pagamentos/${id}`, pagamento)
    return data
}

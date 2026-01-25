import { ApiError } from "@/errors/ApiError"

const encomendas = [
    {
        "id": "1",
        "pedidoNumero": "A1001",
        "data": "20/11/2025",
        "hora": "09:15",
        "formaDePagamento": "pix",
        "status": "pendente",
        "valor": 120.00
    },
    {
        "id": "2",
        "pedidoNumero": "A1002",
        "data": "20/11/2025",
        "hora": "10:40",
        "formaDePagamento": "cartao",
        "status": "pago",
        "valor": 89.90
    },
    {
        "id": "3",
        "pedidoNumero": "A1003",
        "data": "21/11/2025",
        "hora": "14:22",
        "formaDePagamento": "pix",
        "status": "enviado",
        "valor": 199.50
    }
]

export async function getTodasEncomendasNaApi() {
    return encomendas
}

export async function getEncomendaNaApi(id) {
    const encomenda = encomendas.find(encomenda => encomenda.id == id)
    if (!encomenda) {
        return Promise.reject(new ApiError("Encomenda não encontrada", 404, null))
    }
    return encomenda
}

export async function addEncomendaNaApi(encomenda) {
    const novaEncomenda = { ...encomenda, id: encomendas.length + 1 }
    encomendas.push(novaEncomenda)
    if (!novaEncomenda) {
        return Promise.reject(new ApiError("Erro ao adicionar encomenda", 500, null))
    }
    return novaEncomenda
}
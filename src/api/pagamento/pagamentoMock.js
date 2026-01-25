const pagamentos = [
    {
        "id": "1",
        "foto": "/imagem-produtos/logo-pix-icone-1024.png",
        "frase": "PAGUE COM PIX",
        "subfrase": "com desconto à vista no pix"
    },
    {
        "id": "2",
        "foto": "/imagem-produtos/8983163.png",
        "frase": "PAGUE COM CARTÃO DE CRÉDITO",
        "subfrase": ""
    }
]

export async function getTodosPagamentosNaApi() {
    return pagamentos
}

export async function getPagamentoNaApi(id) {
    const pagamentoEncontrado = pagamentos.find(pagamento => pagamento.id == id);
    if (!pagamentoEncontrado) {
        return Promise.reject(new ApiError("Pagamento não encontrado", 404, null));
    }
    return pagamentoEncontrado;
}

export async function addPagamentoNaApi(pagamento) {
    const novopagamento = {...pagamento, id: pagamentos.length + 1}
    pagamentos.push(novopagamento)
    return novopagamento
}

export async function removePagamentoNaApi(id) {
    const pagamentoEncontrado = pagamentos.find(pagamento => pagamento.id == id);
    if (!pagamentoEncontrado) {
        return Promise.reject(new ApiError("Pagamento não encontrado", 404, null));
    }
    const index = pagamentos.indexOf(pagamentoEncontrado);
    const pagamentoRemovido = pagamentos.splice(index, 1)[0];
    return pagamentoRemovido;
}

export async function atualizaPagamentoNaApi(id, pagamento) {
    const pagamentoEncontrado = pagamentos.find(pagamento => pagamento.id == id);
    if (!pagamentoEncontrado) {
        return Promise.reject(new ApiError("Pagamento não encontrado", 404, null));
    }
    Object.assign(pagamentoEncontrado, pagamento);
    return pagamentoEncontrado;
}


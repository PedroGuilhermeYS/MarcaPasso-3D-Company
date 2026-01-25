import { ApiError } from "@/errors/ApiError"

const fretes = [
    {
      "id": "1",
      "cidade": "Joaquim Nabuco",
      "cep_destino": "55535000",
      "cep_entrega": "55535-000",
      "valor_frete": 25.00,
      "prazo_entrega_dias": 5
    },
    {
      "id": "2",
      "cidade": "Recife",
      "cep_destino": "51160220",
      "cep_entrega": "51160-220",
      "valor_frete": 15.00,
      "prazo_entrega_dias": 7
    },
    {
      "id": "3",
      "cidade": "Amendaraé",
      "cep_destino": "55578000",
      "cep_entrega": "55578-000",
      "valor_frete": 30.00,
      "prazo_entrega_dias": 6
    },
    {
      "id": "4",
      "cidade": "Ribeirão",
      "cep_destino": "55520330",
      "cep_entrega": "55520-000",
      "valor_frete": 25.00,
      "prazo_entrega_dias": 5
    },
    {
      "id": "5",
      "cidade": "Palmares",
      "cep_destino": "55540000",
      "cep_entrega": "55540-000",
      "valor_frete": 15.00,
      "prazo_entrega_dias": 7
    },
    {
      "id": "6",
      "cidade": "Água Preta",
      "cep_destino": "55550000",
      "cep_entrega": "55550-000",
      "valor_frete": 30.00,
      "prazo_entrega_dias": 6
    }
]

export async function getTodosFretesNaApi() {
    return fretes
}

export async function getFreteNaApi(id) {
    const freteEncontrado = fretes.find(frete => frete.id == id);
    if (!freteEncontrado) {
        return Promise.reject(new ApiError("Frete não encontrado", 404, null));
    }
    return freteEncontrado;
}

export async function addFreteNaApi(frete) {
    const novofrete = {...frete, id: fretes.length + 1}
    fretes.push(novofrete)
    return novofrete
}

export async function removeFreteNaApi(id) {
    const freteEncontrado = fretes.find(p => p.id == id);
    if (!freteEncontrado) {
        return Promise.reject(new ApiError("Frete não encontrado", 404, null));
    }
    const index = fretes.indexOf(freteEncontrado);
    const freteRemovido = fretes.splice(index, 1)[0];
    return freteRemovido;
}

export async function removeTodosFretesNaApi() {
    fretes.splice(0, fretes.length)
    return fretes
}

export async function atualizaFreteNaApi(id, frete) {
    const freteEncontrado = fretes.find(p => p.id == id);
    if (!freteEncontrado) {
        return Promise.reject(new ApiError("Frete não encontrado", 404, null));
    }
    Object.assign(freteEncontrado, frete);
    return freteEncontrado;
}


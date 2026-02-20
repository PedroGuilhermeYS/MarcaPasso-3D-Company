const cupons = [{
    "id": "1",
    "cupom_nome": "PRIMEIRACOMPRA",
    "desconto": 20
},
{
    "id": "2",
    "cupom_nome": "FRETEGRATIS10",
    "desconto": 10
},
{
    "id": "3",
    "cupom_nome": "CLIENTEVIP",
    "desconto": 25
},
{
    "id": "4",
    "cupom_nome": "DESCONTO15",
    "desconto": 15
},
{
    "id": "5",
    "cupom_nome": "BLACKWEEK",
    "desconto": 30
},
{
    "id": "6",
    "cupom_nome": "BATTLEFIELD6",
    "desconto": 100
}]

export async function getTodosCuponsNaApi() {
    return cupons
}

export async function getCupomNaApi(id) {
    return cupons.find(cupom => cupom.id == id) || null
}

export async function cadastrarCupomNaApi(cupom) {
    cupons.push(cupom)
    return cupom
}
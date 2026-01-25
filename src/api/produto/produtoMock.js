import { ApiError } from "@/errors/ApiError"

const produtos = [
    {
        "id": "1",
        "imagemPrincipal": "/imagem-produtos/abajurcogumelo.jpg",
        "nome": "Abajur Cogumelo",
        "preco": 79.90,
        "categoria": "Decoração",
        "personalizavel": false,
        "descricao": "Abajur em formato de cogumelo com luz suave e design divertido. Ideal para o quarto ou sala geek.",
        "imagensSecundarias": ["/imagem-produtos/abajurcogumelo.jpg"]
    },
    {
        "id": "2",
        "imagemPrincipal": "/imagem-produtos/capivaraGamer.jpg",
        "nome": "Capivara Gamer",
        "preco": 149.90,
        "categoria": "Colecionáveis",
        "personalizavel": false,
        "descricao": "Estátua da Capivara Gamer com headset e controle, perfeita para decorar seu setup.",
        "imagensSecundarias": ["/imagem-produtos/capivaraGamer.jpg"]
    },
    {
        "id": "3",
        "imagemPrincipal": "/imagem-produtos/chaveiroCSGO.png",
        "nome": "Chaveiro CS:GO",
        "preco": 29.90,
        "categoria": "Acessórios",
        "personalizavel": true,
        "descricao": "Chaveiro metálico inspirado em CS:GO. Perfeito para fãs do jogo e colecionadores.",
        "imagensSecundarias": ["/imagem-produtos/chaveiroCSGO.png"]
    }
]

export async function getTodosProdutosNaApi() {
    return produtos
}

export async function getProdutoNaApi(id) {
    return produtos.find(produto => produto.id == id) || null
}

export async function addProdutoNaApi(produto) {
    produtos.push(produto)
    return produto
}

export async function removeProdutoNaApi(id) {
    const produtoEncontrado = produtos.find(p => p.id == id);
    if (!produtoEncontrado) {
        return Promise.reject(new ApiError("produto não encontrado", 404, null));
    }
    const index = produtos.indexOf(produtoEncontrado);
    const produtoRemovido = produtos.splice(index, 1)[0];
    return produtoRemovido;
}

export async function atualizaProdutoNaApi(id, produto) {
    const produtoEncontrado = produtos.find(p => p.id == id);
    if (!produtoEncontrado) {
        return Promise.reject(new ApiError("produto não encontrado", 404, null));
    }
    Object.assign(produtoEncontrado, produto);
    return produtoEncontrado;
}

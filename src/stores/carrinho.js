import { defineStore } from 'pinia'
import { ref, computed} from 'vue'

export const useCarrinhoStore = defineStore('carrinho', () => {
    const itens = ref([])


    const total = computed(() =>
        itens.value.reduce((acc, item) => acc + item.preco * item.quantidade, 0)
    )

    const alterarQuantidade = (id, quantidade) => {
    const item = itens.value.find(p => p.id === id)
        if (item && quantidade > 0) {
            item.quantidade = quantidade
        }
    }

    function adicionarItem(produto, quantidades) {
        const quantidade = Number(quantidades) || 1
        const existente = itens.value.find(i => i.id === produto.id)

        if (existente) {
            existente.quantidade += quantidade
        } else {
            itens.value.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade
            })
        }
        }
    function removerItem(id) {
        itens.value = itens.value.filter(i => i.id !== id)
        }

    function limparCarrinho() {
        itens.value = []
    }

    return { itens, total, adicionarItem, removerItem, alterarQuantidade, limparCarrinho }
})
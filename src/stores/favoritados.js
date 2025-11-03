import { defineStore } from 'pinia'
import { ref, computed} from 'vue'

export const useFavoritadosStore = defineStore('favoritos', () => {
    const itens = ref([])


    const total = computed(() =>
        itens.value.reduce((acc, item) => acc + item.preco, 0)
    )

    function adicionarItem(produto) {
        const existente = itens.value.find(i => i.id === produto.id)

        if (!existente) {
            itens.value.push({
            id: produto.id,
            imagem: produto.imagem,
            nome: produto.nome,
            preco: produto.preco
            })
        }
    }
    
    function isFavoritado(id) {
        return itens.value.some(i => i.id === id)
    }

    function removerItem(id) {
        itens.value = itens.value.filter(i => i.id !== id)
        }

    function limparfavoritos() {
        itens.value = []
    }

    return { itens, total, adicionarItem, removerItem, limparfavoritos, isFavoritado }
})
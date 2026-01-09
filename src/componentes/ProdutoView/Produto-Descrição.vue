<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useProdutosStore } from '@/stores/Produtos';

    const route = useRoute()
    const Produto = ref(null)
    const imagemAtual = ref(null)

    onMounted(async () => {
        const produtosStore = useProdutosStore()

        if (!produtosStore.produtos.length) {
            await produtosStore.carregarProdutos()
        }

        Produto.value = produtosStore.produtos.find(p => String(p.id) === String(route.params.id))

        if (!Produto.value) {
            console.warn('Produto não encontrado para o ID:', route.params.id)
        } else {
            imagemAtual.value = Produto.value.imagem
        }
    })
</script>

<template>
    <div v-if="Produto">
        <div class="modais">
            <div class="descricao">
                <h2>Descrição geral</h2>
            </div>
        </div>

        <div class="container3">
            <div class="describe">
                <h2>{{ Produto.descricao }}</h2>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .modais{
        width: 100%;
        justify-content: center;
        display: flex;
        gap: 1rem;
    }
    .container3{
        width: 99.7%;
        display: flex;
        justify-content: left;
        border: 2px solid var(--color-primary);
        padding: 2rem 0rem;
        margin-bottom: 2rem;
    }
    .describe{
        margin-left: 2rem;
        margin-right: 2rem;
    }
    a {
        text-decoration: none;
    }
</style>
<script setup>
    import { onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import Endereços from '@/componentes/EntregaView/Endereços.vue'
    import MarketEndereço from '@/componentes/EntregaView/MarketEndereço.vue'
    import { useCarrinhoStore } from '@/stores/useCarrinhoStore';
    
    const carrinho = useCarrinhoStore()
    const router = useRouter()
    
    onMounted(() => {
        if (carrinho.itens.length === 0) {
            router.push("/Carrinho")
        }
    })

</script>

<template>
    <main>       
        <div class="container1">
            <Endereços></Endereços>
            <MarketEndereço></MarketEndereço>
        </div>
    </main>
</template>

<style scoped>
    main{
        width: 1400px;
        margin: 0 auto;
        font-family: var(--font-family-base);
        font-weight: 300;
    }
    .container1{
        width: 100%;
        display: flex;
        gap: 2.9rem;
        justify-content: space-evenly;
        align-items: flex-start;
        margin-bottom: 2rem;
    }
</style>
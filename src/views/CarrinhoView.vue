<script setup>
    import { ref, onMounted } from 'vue'
    import Carrinho from '@/componentes/CarrinhoView/Carrinho.vue';
    import Market from '@/componentes/CarrinhoView/Market.vue';

    const fretes = ref([])
    const ValorFrete = ref(null)
    const DiaEntrega = ref('')
    const cidade = ref('')

    onMounted(async () => {
        const resposta = await fetch('http://localhost:3000/fretes')
        const data = await resposta.json()
        fretes.value = data
    })

    function calculardata(cepatual) {
        const frete = fretes.value.find(f => f.cep_destino === cepatual)

        if (frete){
            DiaEntrega.value = `${frete.prazo_entrega_dias} dias`
            ValorFrete.value = frete.valor_frete
            cidade.value = ` em ${frete.cidade}`
        } else {
            DiaEntrega.value = 'Cidade fora de rotas'
            ValorFrete.value = null
            cidade.value = ""
        }
    }
</script>

<template>
    <main>       
        <div class="container1">
            <Carrinho :ValorFrete="ValorFrete" :DiaEntrega="DiaEntrega" :cidade="cidade" @calcular-frete="calculardata"></Carrinho>
            <Market :ValorFrete="ValorFrete"></Market>
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
        padding: 0rem 0rem;
        margin-bottom: 2rem;
    }
</style>
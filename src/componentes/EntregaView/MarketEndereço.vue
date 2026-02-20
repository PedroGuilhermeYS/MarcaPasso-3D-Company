<script setup>
    import { ref, computed } from 'vue'
    import { useCarrinhoStore } from '@/stores/useCarrinhoStore';
    import { formatarPreco } from '@/composables/useFormatadorPreco.js'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()  

    const carrinho = useCarrinhoStore()
    const ValorFrete = computed(() => carrinho.freteSelecionado)

    function salvarFreteNoCarrinho() {
        if (carrinho.freteSelecionado == null) {
            alert("Selecione o endereço de entrega")
        }
        else {
            router.push({name: 'FormaPagamento'})
        }
    }

</script>

<template>
    <div class="market">
        <h2># RESUMO</h2>
            <div class="style-camp">
                <span>Valor dos Produtos:</span>
                <span>{{ formatarPreco(carrinho.total) }}</span>
            </div>

        <hr>

        <div class="style-camp">
            <span>Frete:</span>
            <span v-if="ValorFrete === null">R$ 0,00</span>
            <span v-if="ValorFrete">{{ formatarPreco(ValorFrete) }}</span>
        </div>

        <hr>
    
        <div class="style-camp destaque-prazo">
            <span>Total a prazo:</span>
            <div class="preco-market">
                <span v-if="ValorFrete === null" class="valor">{{ formatarPreco(((carrinho.total * 0.05) + carrinho.total)) }}</span>
                <span v-if="ValorFrete" class="valor">{{ formatarPreco((((carrinho.total * 0.05) + carrinho.total + ValorFrete))) }}</span>
                <small>(Em até 2x de R$ {{ formatarPreco((((carrinho.total * 0.05) + carrinho.total + (ValorFrete || 0))) / 2) }} sem juros)</small>
            </div>
        </div>
        <div class="style-camp destaque-vista">
            <span>Valor à vista no <b>Pix:</b></span>
            <div class="preco-market">
                <span v-if="ValorFrete === null" class="valor">{{ formatarPreco(carrinho.total) }}</span>
                <span v-if="ValorFrete" class="valor">{{ formatarPreco((carrinho.total + ValorFrete)) }}</span>
            </div>
        </div>

        <hr>
        <button class="button-comprar" @click="salvarFreteNoCarrinho">CONTINUAR PARA PAGAMENTO</button>
        <router-link to="/Carrinho"><button class="button-voltar" >VOLTAR PARA CARRINHO</button></router-link>
    </div>
</template>
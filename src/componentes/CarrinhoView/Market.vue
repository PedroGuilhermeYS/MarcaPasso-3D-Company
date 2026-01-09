<script setup>
    import { useCarrinhoStore } from '@/stores/carrinho';
    import { formatarPreco } from '@/utils/functionsFull.js'

    const props = defineProps({
        ValorFrete: {
            type: Number,
            default: null
        }
    })

    const carrinho = useCarrinhoStore()

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
            <span v-if="props.ValorFrete === null">R$ 0,00</span>
            <span v-if="props.ValorFrete">{{ formatarPreco(props.ValorFrete) }}</span>
        </div>

        <hr>
    
        <div class="style-camp destaque-prazo">
            <span>Total a prazo:</span>
            <div class="preco-market">
                <span v-if="props.ValorFrete === null" class="valor">{{ formatarPreco(((carrinho.total * 0.05) + carrinho.total)) }}</span>
                <span v-if="props.ValorFrete" class="valor">{{ formatarPreco((((carrinho.total * 0.05) + carrinho.total + props.ValorFrete))) }}</span>
                <small>(Em até 2x de R$ {{ formatarPreco((((carrinho.total * 0.05) + carrinho.total + (props.ValorFrete || 0))) / 2) }} sem juros)</small>
            </div>
        </div>
        <div class="style-camp destaque-vista">
            <span>Valor à vista no <b>Pix:</b></span>
            <div class="preco-market">
                <span v-if="props.ValorFrete === null" class="valor">{{ formatarPreco(carrinho.total) }}</span>
                <span v-if="props.ValorFrete" class="valor">{{ formatarPreco((carrinho.total + props.ValorFrete)) }}</span>
            </div>
        </div>

        <hr>
        
        <button v-if="carrinho.itens.length === 0" class="button-comprar">CARRINHO VAZIO!</button>

        <router-link v-else to="/Entrega">
            <button class="button-comprar">CONTINUAR PARA ENTREGA</button>
        </router-link>

        <router-link to="/"><button class="button-voltar" >VOLTAR</button></router-link>
    </div>
</template>
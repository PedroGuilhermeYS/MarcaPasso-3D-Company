<script setup>
import { ref, onMounted } from 'vue'
import { useCarrinhoStore } from '@/stores/useCarrinhoStore'
import { useCupomStore } from '@/stores/useCupomStore'
import { formatarPreco } from '@/composables/useFormatadorPreco.js'

const carrinho = useCarrinhoStore()
const cupons = useCupomStore()

const cupomatual = ref("")
const valordesconto = ref(0)
const descontostring = ref("")

onMounted(async () => {
    await cupons.carregarCupons()
})

function calcularcupom(cupomatual) {
    const cupom = cupons.cupons.find(c => c.cupom_nome === cupomatual.trim().toUpperCase())

    if (cupom) {
        valordesconto.value = cupom.desconto / 100
        descontostring.value = `Desconto de ${cupom.desconto}% aplicado com sucesso!`
    } else {
        valordesconto.value = 0
        descontostring.value = "Cupom inválido ou não encontrado"
    }
}
</script>

<template>
    <h2># RESUMO</h2>
    <div class="style-camp">
        <span>Valor dos Produtos:</span>
        <span>{{ formatarPreco(carrinho.total) }}</span>
    </div>

    <hr>

    <div class="style-camp">
        <span>Frete:</span>
        <span>{{ formatarPreco(carrinho.freteSelecionado) }}</span>
    </div>

    <hr>

    <div class="style-camp">
        <span>Cupom:</span>
        <div class="cupom-box">
            <input v-model="cupomatual" type="text" class="input-cupom" placeholder="Digite o cupom">
            <button class="btn-cupom" @click="calcularcupom(cupomatual)">Aplicar</button>
        </div>
    </div>

    <label v-if="descontostring" class="mensagem-cupom">{{ descontostring }}</label>

    <hr>

    <div class="style-camp destaque-prazo">
        <span>Total:</span>
        <div class="preco">
            <span class="valor">{{ formatarPreco((carrinho.total + carrinho.freteSelecionado) * (1 - valordesconto)) }}</span>
        </div>
    </div>

    <hr>

    <button class="button-comprar">PAGAMENTO</button>
    <router-link :to="{ name: 'Entrega' }"><button class="button-voltar">VOLTAR PARA ENTREGA</button></router-link>
</template>

<style scoped>
.market {
    width: 26rem;
    border-radius: 20px;
    border: 2px solid #0185FA;
    padding: 1.5rem;
    background: #fff;
    font-family: 'Open Sans', sans-serif;
}

.market h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: left;
}

.preco {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.valor {
    font-weight: 500;
}

.style-camp {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0.8rem 0;
    font-size: 0.95rem;
}

.style-camp span {
    font-weight: 500;
}

.cupom-box {
    display: flex;
    gap: 8px;
    align-items: center;
}

.input-cupom {
    padding: 6px;
    border: 1px solid #bbb;
    border-radius: 5px;
    flex: 1;
}

.btn-cupom {
    padding: 6px 12px;
    background: #0185FA;
    border: none;
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}

.btn-cupom:hover {
    transform: scale(1.05);
}

.mensagem-cupom {
    display: block;
    margin-top: 6px;
    font-size: 14px;
    color: green;
}

.mensagem-cupom:contains("inválido") {
    color: red;
}

.destaque-prazo {
    background: #f2f0f0;
    padding: 0.5rem;
    border-radius: 5px;
}

.button-comprar {
    width: 100%;
    background: #0185FA;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 1rem;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
    cursor: pointer;
}

.button-voltar {
    width: 100%;
    background: #fff;
    color: #0185FA;
    border: 2px solid #0185FA;
    border-radius: 8px;
    padding: 1rem;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 0.5rem;
    cursor: pointer;
}

.button-comprar:hover,
.button-voltar:hover {
    transform: scale(1.03);
}

button {
    margin: 0 !important;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>

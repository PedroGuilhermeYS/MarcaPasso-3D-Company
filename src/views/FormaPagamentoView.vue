<script setup>
import ListaPagamentos from '@/componentes/PagamentoView/ListaPagamentos.vue';
import MarketResumo from '@/componentes/PagamentoView/MarketResumo.vue';
import ModaisPagamento from '@/componentes/PagamentoView/ModaisPagamento.vue';
import { ref, onMounted } from 'vue'
import { useCarrinhoStore } from '@/stores/useCarrinhoStore';
import { useRouter } from 'vue-router'

const router = useRouter()
const carrinho = useCarrinhoStore()

const modaisPagamentoRef = ref(null)

function selecionarPagamento(pag) {
    if (pag.frase.includes("PIX")) {
        modaisPagamentoRef.value.abrirModalPix()
    }

    if (pag.frase.includes("CARTÃO")) {
        modaisPagamentoRef.value.abrirModalCartao()
    }
}

function fecharModais() {
    if (modaisPagamentoRef.value) {
        modaisPagamentoRef.value.fecharModais()
    }
}

onMounted(() => {
    if (carrinho.freteSelecionado == null) {
        alert("Selecione o endereço de entrega")
        router.push({ name: 'Entrega' })
    }
})
</script>

<template>
    <main>
        <div class="container1">
            <div class="products">
                <ListaPagamentos @selecionarPagamento="selecionarPagamento" />
            </div>
            <div class="market">
                <MarketResumo />
            </div>
        </div>

        <ModaisPagamento ref="modaisPagamentoRef" />

    </main>
</template>

<style scoped>
main {
    width: 1400px;
    margin: 0 auto;
    font-family: 'Open Sans';
    font-weight: 300;
}

.container1 {
    width: 100%;
    display: flex;
    gap: 2.9rem;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-bottom: 2rem;
}

.products {
    width: 60rem;
    border-radius: 20px;
    border: 2px solid #0185FA;
    text-align: center;
    padding: 2rem 2rem;
}

.market {
    width: 26rem;
    border-radius: 20px;
    border: 2px solid #0185FA;
    padding: 1.5rem;
    background: #fff;
    font-family: 'Open Sans', sans-serif;
}

.lista-pagamentos {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.pagamento {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: 2px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;
}

.pagamento.selecionado {
    border-color: black;
    background: #f7f7f7;
    transform: scale(1.02);
}

.pagamento-foto {
    width: 35px;
    height: 35px;
}

.pagamento-frase {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
}

.pagamento-subfrase {
    text-align: left;
    font-size: 14px;
    color: #555;
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

.divisor {
    height: 100%;
    border: 1px solid black;
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
.button-voltar:hover,
.excluir:hover,
.editar:hover {
    transform: scale(1.03);
}

button {
    margin: 0 !important;
}

a {
    text-decoration: none;
    color: inherit;
}

.modal-fundo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal {
    width: 370px;
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    text-align: center;
    animation: subir 0.2s ease-out;
}

@keyframes subir {
    from {
        transform: translateY(30px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.qrcode {
    width: 200px;
    height: 200px;
    margin: 15px auto;
    display: block;
}

.modal-botoes {
    display: flex;
    gap: 12px;
    margin-top: 18px;
}

.btn-confirmar {
    flex: 1;
    padding: 10px;
    background: #0185FA;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;
}

.btn-fechar {
    flex: 1;
    padding: 10px;
    background: #ccc;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.input-modal {
    text-align: left;
    margin: 10px 0;
}

.input-modal input {
    width: 100%;
    padding: 7px;
    border: 1px solid #bbb;
    border-radius: 6px;
}

.linha-dupla {
    display: flex;
    gap: 10px;
}
</style>
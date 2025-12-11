<script setup>
import LogoTop from '@/componentes/LogoTop.vue';
import UserAction from '@/componentes/UserAction.vue';
import Footer from '@/componentes/Footer.vue';
import { ref, onMounted } from 'vue'
import { useCarrinhoStore } from '@/stores/carrinho';
import { formatarPreco } from '@/utils/functionsFull.js'
import { useRouter } from 'vue-router'
const mostrarModalPix = ref(false)
const mostrarModalCartao = ref(false)

// Dados do cartão
const cartao = ref({
    nome: "",
    numero: "",
    validade: "",
    cvv: ""
})

function selecionarPagamento(pag) {
    pagamentoSelecionado.value = pag.id

    if (pag.frase.includes("PIX")) {
        mostrarModalPix.value = true
    }

    if (pag.frase.includes("CARTÃO")) {
        mostrarModalCartao.value = true
    }
}

function fecharModais() {
    mostrarModalPix.value = false
    mostrarModalCartao.value = false
}

function confirmarCartao() {
    // Aqui poderia validar, mas vamos só redirecionar
    router.push("/")
}

function confirmarPix() {
    router.push("/")
}

const router = useRouter()

const carrinho = useCarrinhoStore()

const pagamentos = ref([])
const pagamentoSelecionado = ref(null)

const cupons = ref([])
const cupomatual = ref("")
const valordesconto = ref(0)
const descontostring = ref("")

onMounted(async () => {
    const resposta = await fetch('http://localhost:3000/pagamentos')
    const data = await resposta.json()
    pagamentos.value = data
})

onMounted(async () => {
    const resposta = await fetch('http://localhost:3000/cupons')
    const data = await resposta.json()
    cupons.value = data
})

function calcularcupom(cupomatual) {
    const cupom = cupons.value.find(c => c.cupom_nome === cupomatual.trim().toUpperCase())

    if (cupom) {
        valordesconto.value = cupom.desconto / 100
        descontostring.value = `Desconto de ${cupom.desconto}% aplicado com sucesso!`
    } else {
        valordesconto.value = 0
        descontostring.value = "Cupom inválido ou não encontrado"
    }
}

onMounted(() => {
    if (carrinho.FreteSelecionado == null) {
        alert("Selecione o endereço de entrega")
        router.push("/Entrega")
    }
})
</script>

<template>
    <LogoTop></LogoTop>
    <UserAction></UserAction>
    <main>
        <div class="container1">
            <div class="products">

                <div class="lista-pagamentos">
                    <div v-for="pag in pagamentos" :key="pag.id" class="pagamento"
                        :class="{ selecionado: pagamentoSelecionado === pag.id }" @click="selecionarPagamento(pag)">
                        <img :src="pag.foto" alt="icone" class="pagamento-foto">
                        <div class="pagamento-texto">
                            <div class="pagamento-frase">{{ pag.frase }}</div>
                            <div class="pagamento-subfrase">{{ pag.subfrase }}</div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="market">
                <h2># RESUMO</h2>
                <div class="style-camp">
                    <span>Valor dos Produtos:</span>
                    <span>{{ formatarPreco(carrinho.total) }}</span>
                </div>

                <hr>

                <div class="style-camp">
                    <span>Frete:</span>
                    <span>{{ formatarPreco(carrinho.FreteSelecionado) }}</span>
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
                        <span class="valor">{{ formatarPreco((carrinho.total + carrinho.FreteSelecionado) * (1 - valordesconto)) }}</span>
                    </div>
                </div>

                <hr>

                <router-link><button class="button-comprar">PAGAMENTO</button></router-link>
                <router-link to="/Entrega"><button class="button-voltar">VOLTAR PARA ENTREGA</button></router-link>
            </div>
        </div>

        <div v-if="mostrarModalPix" class="modal-fundo">
            <div class="modal">
                <h2>PAGAMENTO VIA PIX</h2>
                <p>Escaneie o QR Code abaixo:</p>

                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PagamentoMock" alt="QR Code"
                    class="qrcode">

                <div class="modal-botoes">
                    <button class="btn-fechar" @click="fecharModais">Fechar</button>
                    <button class="btn-confirmar" @click="confirmarPix">Confirmar Pagamento</button>
                </div>
            </div>
        </div>

        <div v-if="mostrarModalCartao" class="modal-fundo">
            <div class="modal">
                <h2>PAGAMENTO COM CARTÃO</h2>

                <!-- FORM para validar antes de confirmar -->
                <form @submit.prevent="confirmarCartao">
                <div class="input-modal">
                    <label>Nome impresso no cartão</label>
                    <input v-model="cartao.nome" type="text" required>
                </div>

                <div class="input-modal">
                    <label>Número do cartão</label>
                    <input
                    v-model="cartao.numero"
                    type="text"
                    maxlength="19"
                    placeholder="0000 0000 0000 0000"
                    required
                    >
                </div>

                <div class="linha-dupla">
                    <div class="input-modal">
                        <label>Validade</label>
                        <input v-model="cartao.validade" type="text" placeholder="MM/AA" maxlength="5" required>
                    </div>

                    <div class="input-modal">
                        <label>CVV</label>
                        <input v-model="cartao.cvv" type="password" maxlength="4" required>
                    </div>
                </div>

                <div class="modal-botoes">
                    <button type="button" class="btn-fechar" @click="fecharModais">Fechar</button>
                    <button type="submit" class="btn-confirmar">Confirmar</button>
                </div>
                </form>
            </div>
        </div>

    </main>
    <Footer></Footer>
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
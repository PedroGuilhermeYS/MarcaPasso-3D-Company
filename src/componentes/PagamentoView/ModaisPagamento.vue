<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCarrinhoStore } from '@/stores/carrinho'

const emit = defineEmits(['fecharModais'])

const mostrarModalPix = ref(false)
const mostrarModalCartao = ref(false)

const cartao = ref({
    nome: "",
    numero: "",
    validade: "",
    cvv: ""
})

const router = useRouter()
const carrinho = useCarrinhoStore()

function abrirModalPix() {
    mostrarModalPix.value = true
}

function abrirModalCartao() {
    mostrarModalCartao.value = true
}

function fecharModais() {
    mostrarModalPix.value = false
    mostrarModalCartao.value = false
    emit('fecharModais')
}

function confirmarCartao() {
    carrinho.limparCarrinho()
    router.push("/")
}

function confirmarPix() {
    carrinho.limparCarrinho()
    router.push("/")
}

defineExpose({
    abrirModalPix,
    abrirModalCartao,
    fecharModais
})
</script>

<template>
    <div v-if="mostrarModalPix" class="modal-fundo">
        <div class="modal">
            <h2>PAGAMENTO VIA PIX</h2>
            <p>Escaneie o QR Code abaixo:</p>

            <img src="@\img\meupix.png" alt="QR Code" class="qrcode">

            <p>Pedro Guilherme - PicPay</p>

            <div class="modal-botoes">
                <button class="btn-fechar" @click="fecharModais">Fechar</button>
                <button class="btn-confirmar" @click="confirmarPix">Confirmar Pagamento</button>
            </div>
        </div>
    </div>

    <div v-if="mostrarModalCartao" class="modal-fundo">
        <div class="modal">
            <h2>PAGAMENTO COM CARTÃO</h2>

            <form @submit.prevent="confirmarCartao">
                <div class="input-modal">
                    <label>Nome impresso no cartão</label>
                    <input v-model="cartao.nome" type="text" maxlength="25" required>
                </div>

                <div class="input-modal">
                    <label>Número do cartão</label>
                    <input v-model="cartao.numero" type="text" maxlength="16" placeholder="0000 0000 0000 0000" required>
                </div>

                <div class="linha-dupla">
                    <div class="input-modal">
                        <label>Validade</label>
                        <input v-model="cartao.validade" type="text" placeholder="MM/AA" maxlength="4" required>
                    </div>

                    <div class="input-modal">
                        <label>CVV</label>
                        <input v-model="cartao.cvv" type="password" maxlength="3" required>
                    </div>
                </div>

                <div class="modal-botoes">
                    <button type="button" class="btn-fechar" @click="fecharModais">Fechar</button>
                    <button type="submit" class="btn-confirmar">Confirmar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
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

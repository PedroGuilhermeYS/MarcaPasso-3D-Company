<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['selecionarPagamento'])

const pagamentos = ref([])
const pagamentoSelecionado = ref(null)

onMounted(async () => {
    const resposta = await fetch('http://localhost:3000/pagamentos')
    const data = await resposta.json()
    pagamentos.value = data
})

function selecionarPagamento(pag) {
    pagamentoSelecionado.value = pag.id
    emit('selecionarPagamento', pag)
}
</script>

<template>
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
</template>

<style scoped>
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
</style>

<script setup>
import { onMounted } from 'vue';
import { formatarPreco } from '@/composables/useFormatadorPreco.js'
import { useEncomendasStore } from '@/stores/useEncomendasStore';

const encomendasStore = useEncomendasStore()

onMounted(async () => {
    await encomendasStore.carregarEncomendas()
})

function juntarDataHora(data, hora) {
    return `${data} ${hora}`;
}
</script>

<template>
    <main>
        <div class="container1">
            <div class="products">

                <div v-for="pedido in encomendasStore.encomendas" :key="pedido.id" class="pedido-card">

                    <div class="pedido-header">

                        <div class="col">
                            <span class="label">PEDIDO</span>
                            <span class="value orange">{{ pedido.pedidoNumero }}</span>
                        </div>

                        <div class="col">
                            <span class="label">DATA/HORA</span>
                            <span class="value">{{ juntarDataHora(pedido.data, pedido.hora) }}</span>
                        </div>

                        <div class="col">
                            <span class="label">PAGAMENTO</span>
                            <span class="value">{{ pedido.formaDePagamento }}</span>
                        </div>

                        <div class="col">
                            <span class="label">STATUS</span>
                            <span class="value">{{ pedido.status.toUpperCase() }}</span>
                        </div>

                        <div class="col valor-col">
                            <span class="label">VALOR</span>
                            <span class="value bold">{{ formatarPreco(pedido.valor) }}</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    width: 1400px;
    margin: 0 auto;
    font-family: var(--font-family-base);
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
    border: 2px solid var(--color-primary);
    text-align: center;
    padding: 2rem 2rem;
}

.pedido-card {
    width: 97%;
    background: var(--color-surface);
    border-radius: 10px;
    box-shadow: 0 3px 6px #00000015;
    padding: 1.3rem 1rem;
    margin-bottom: 1.3rem;
    cursor: pointer;
}

.pedido-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.col {
    display: flex;
    flex-direction: column;
    text-align: left;
    min-width: 140px;
}

.label {
    font-size: .7rem;
    font-weight: 600;
    letter-spacing: .5px;
}

.value {
    font-size: .85rem;
    margin-top: 2px;
}

.orange {
    color: var(--color-warning);
    font-weight: bold;
}

.bold {
    font-weight: 700;
}

.valor-col {
    min-width: 110px;
    text-align: right;
}

.pedido-card:hover {
    background-color: var(--color-bg-hover);
}
</style>
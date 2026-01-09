<script setup>
    import { ref, onMounted } from 'vue'
    import { useCarrinhoStore } from '@/stores/carrinho';
    import { formatarPreco } from '@/utils/functionsFull.js'

    const props = defineProps({
        ValorFrete: {
            type: Number,
            default: null
        },
        DiaEntrega: {
            type: String,
            default: ''
        },
        cidade: {
            type: String,
            default: ''
        }
    })

    const emit = defineEmits(['calcular-frete'])

    const carrinho = useCarrinhoStore()
    const fretes = ref([])
    const cepatual = ref('')

    onMounted(async () => {
        const resposta = await fetch('http://localhost:3000/fretes')
        const data = await resposta.json()
        fretes.value = data
    })

    function calculardata(cepatual) {
        emit('calcular-frete', cepatual)
    }
</script>

<template>
    <div class="products">
        <div class="topo">
            <h2># Carrinho</h2>
            <h4>Clique em continuar para efetuar o seu pedido</h4>
        </div>

        <hr>

        <div class="itens-products">
            <table>
                <thead>
                    <tr>
                    <th>Produto</th>
                    <th></th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in carrinho.itens" :key="item.id">
                        <td><img v-if="item.imagem" :src="item.imagem" :alt="item.nome" width="100px" @click="$router.push({ name: 'Produto', params: { id: item.id } })"></td>
                        <td class="valor">{{ item.nome }}</td>
                        <td>
                            <div class="quantidade">
                                <button @click="carrinho.alterarQuantidade(item.id, item.quantidade - 1)">-</button>
                                <h4>{{ item.quantidade }}</h4>
                                <button @click="carrinho.alterarQuantidade(item.id, item.quantidade + 1)">+</button>
                            </div>
                        </td>
                        <td class="valor">R$ {{ formatarPreco(item.preco * item.quantidade) }}</td>
                        <td><button @click="carrinho.removerItem(item.id)" class="remove">Excluir</button></td>
                    </tr>
                </tbody>
            </table>                  
        </div>  
        <div class="complements">
                <div class="frete">
                    <label for="cep">Calcule o frete:</label>
                    <input v-model="cepatual" class="cep" type="text" id="cep" placeholder="Digite seu CEP">
                    <button @click="calculardata(cepatual)">Calcular</button>
                    <a href="https://buscacepinter.correios.com.br/app/endereco/index.php"><span class="help">? Não sei meu CEP</span></a>
                </div>
                <label>Tempo estimado para entrega{{ props.cidade }}: {{ props.DiaEntrega }}</label>
        </div>
    </div>
</template>

<style scoped>
    .products{
        width: 60rem;
        border-radius: 20px;
        border: 2px solid var(--color-primary);
        text-align: center;
        padding: 2rem 2rem;
    }
    .topo{
        display: flex;
    }
    .topo h2{
        margin: 0;
        margin-right: 1rem;
    }
    .topo h4{
        margin: 0;
        line-height: 2.4rem;
        font-weight: lighter;
    }
    table{
        margin-bottom: 1rem;
    }
    table th {
        padding-left: 40px;
        padding-right: 40px;
    }
    img{
        border: 3px solid var(--color-primary);
        padding: 0;
        margin: 0;
    }
    .quantidade {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
    .quantidade h4{
        border: 2px solid var(--color-border-input);
        border-radius: 20px;
        width: 3rem;
    }
    .quantidade button{
        border: none;
        background-color: white;
        font-size: 1rem;
        cursor: pointer;
    }
    .remove{
        width: 50%;
        background: var(--color-primary);
        color: var(--color-on-primary);
        border: none;
        border-radius: 8px;
        padding: 2.5px;
        cursor: pointer;
    }
    .remove:hover {
        transform: scale(1.03);
    }
    .complements{
        font-family: inherit;
        text-align: left;
        background-color: var(--color-bg-subtle);
        padding: 2rem 0rem 2rem 1.5rem;
    }
    .complements label, .complements span, .complements button {
        font-family: var(--font-family-base);
        font-weight: 700;
        margin-bottom: 2rem;
    }
    .frete{
        margin-bottom: 1rem;
    }
    .cep, .help{ 
        margin-left: 2rem 
    }
</style>
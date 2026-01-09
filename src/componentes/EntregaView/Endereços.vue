<script setup>
    import { ref, onMounted } from 'vue'
    import { useCarrinhoStore } from '@/stores/carrinho';
    
    const carrinho = useCarrinhoStore()
    const enderecos = ref([])
    const fretes = ref([])
    const ValorFrete = ref(null)
    const enderecoSelecionado = ref(null);

    onMounted(async () => {
        const resposta = await fetch('http://localhost:3000/fretes')
        const data = await resposta.json()
        fretes.value = data
    })

    onMounted(async () => {
        const resposta = await fetch('http://localhost:3000/enderecos')
        const data = await resposta.json()
        enderecos.value = data
        
        // Sincronizar com frete já selecionado na store
        if (carrinho.FreteSelecionado) {
            ValorFrete.value = carrinho.FreteSelecionado
        }
    })

    function selecionarEndereco(endereco) {
        
        enderecoSelecionado.value = endereco.cep;
        
        const freteEncontrado = fretes.value.find(f => f.cep_entrega === enderecoSelecionado.value);
        
        if (freteEncontrado) {
            ValorFrete.value = freteEncontrado.valor_frete;
            carrinho.definirFrete(freteEncontrado.valor_frete);
        } else {
            ValorFrete.value = null;
            carrinho.definirFrete(null);
        }
    }

</script>

<template>
    <div class="products">
        <div class="topo">
            <h2># Endereço de Entrega</h2>
        <!--<h4>criar botão para adicionar+</h4>-->
        </div>

        <hr>
        <div class="lista-endereco">
            <div v-for="endereco in enderecos" :key="endereco.id" class="endereco" :class="{ selecionado: enderecoSelecionado === endereco.cep }" @click="selecionarEndereco(endereco)">
                <div class="endereco-esquerda">
                    <div class="endereco-nome"> {{endereco.titulo}} </div>

                    <div class="endereco-linha1">
                        {{endereco.rua}}  ,  {{endereco.numero}} 
                    </div>

                    <div class="endereco-linha2">
                        {{endereco.bairro}}  -  {{endereco.cidade}}  -  {{endereco.estado}}  -  {{endereco.cep}} 
                    </div>
                </div>

                <div class="endereco-botoes">
                    <!--<button class="editar">Editar</button>-->
                    <!--<button class="excluir" @click="excluirEndereco(endereco)">Excluir</button>-->
                </div>
            </div>
        </div>
    </div>
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
        margin-bottom: 2rem;
    }
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
    .lista-endereco{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .endereco{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border: 2px solid var(--color-border-input);
        border-radius: 6px;
        cursor: pointer;
        transition: 0.2s;
    }
    .endereco.selecionado {
        border-color: var(--color-text);
        background: var(--color-bg-muted);
        transform: scale(1.02);
    } 
    .endereco-esquerda {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    .endereco-nome {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
    }
    .endereco-linha1, .endereco-linha2 {
        font-size: 14px;
        color: var(--color-muted);
        margin-bottom: 2px;
    }
    .endereco-botoes {
        display: flex;
        gap: 10px;
    }
    .editar, .excluir {
        background: var(--color-surface);
        border: 1px solid var(--color-primary);
        color: var(--color-primary);
        padding: 5px 14px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
    }
    .excluir:hover, .editar:hover {
        transform: scale(1.03);
    }
</style>
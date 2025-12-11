<script setup>
    import LogoTop from '@/componentes/LogoTop.vue';
    import UserAction from '@/componentes/UserAction.vue';
    import Footer from '@/componentes/Footer.vue';
    import { ref, onMounted } from 'vue'
    import { useCarrinhoStore } from '@/stores/carrinho';
    import { formatarPreco } from '@/utils/functionsFull.js'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()  

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
    })

    function selecionarEndereco(endereco) {
        
        enderecoSelecionado.value = endereco.cep;
        
        const freteEncontrado = fretes.value.find(f => f.cep_entrega === enderecoSelecionado.value);
        
        if (freteEncontrado) {
            ValorFrete.value = freteEncontrado.valor_frete;
        } else {
            ValorFrete.value = null;
        }
    }

    function salvarFreteNoCarrinho() {
        if (ValorFrete.value == null) {
            alert("Selecione o endreço de entrega")
        }
        else {
            carrinho.definirFrete(ValorFrete.value)
            router.push('/FormaPagamento')
        }
    }
    onMounted(() => {
        if (carrinho.itens.length === 0) {
            router.push("/Carrinho")
        }
    })

</script>

<template>
    <LogoTop></LogoTop>
    <UserAction></UserAction>
    <main>       
        <div class="container1">
            <div class="products">
                <div class="topo">
                    <h2># Endereço de Entrega</h2>
                <!--<h4>criar botão para adicionar+</h4>-->
                </div>

                <hr>

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
                    <div class="preco">
                        <span v-if="ValorFrete === null" class="valor">{{ formatarPreco(((carrinho.total * 0.05) + carrinho.total)) }}</span>
                        <span v-if="ValorFrete" class="valor">{{ formatarPreco((((carrinho.total * 0.05) + carrinho.total + ValorFrete))) }}</span>
                        <small>(Em até 2x de R$ {{ formatarPreco((((carrinho.total * 0.05) + carrinho.total + (ValorFrete || 0))) / 2) }} sem juros)</small>
                    </div>
                </div>
                <div class="style-camp destaque-vista">
                    <span>Valor à vista no <b>Pix:</b></span>
                    <div class="preco">
                        <span v-if="ValorFrete === null" class="valor">{{ formatarPreco(carrinho.total) }}</span>
                        <span v-if="ValorFrete" class="valor">{{ formatarPreco((carrinho.total + ValorFrete)) }}</span>
                    </div>
                </div>

                <hr>

                <button class="button-comprar" @click="salvarFreteNoCarrinho">CONTINUAR PARA PAGAMENTO</button>
                <router-link to="/Carrinho"><button class="button-voltar" >VOLTAR PARA CARRINHO</button></router-link>
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>

<style scoped>
    main{
        width: 1400px;
        margin: 0 auto;
        font-family: 'Open Sans';
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
        border: 2px solid #0185FA;
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
    .endereco {
        border: 1px solid #b2bcc4;
        padding: 15px;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: Arial, sans-serif;
        margin-bottom: 10px;
        cursor: pointer;
        transition: 0.2s;
    }
    .endereco.selecionado {
        border: 2px solid rgb(0, 0, 0) !important;
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
        color: #333;
        margin-bottom: 2px;
    }
    .endereco-botoes {
        display: flex;
        gap: 10px;
    }
    .editar, .excluir {
        background: #fff;
        border: 1px solid #0185FA;
        color: #0185FA;
        padding: 5px 14px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
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
        font-weight:500;
    }
    small {
        font-size: 12px;
        color: gray;
    }
    .divisor{
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
    .style-camp small {
        font-size: 0.75rem;
        color: #555;
    }
    .destaque-prazo {
        background: #f2f0f0;
        padding: 0.5rem;
        border-radius: 5px;
    }
    .destaque-vista {
        background: #b7fbb7;
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
    .button-comprar:hover, .button-voltar:hover, .excluir:hover, .editar:hover {
        transform: scale(1.03);
    }
    button{
        margin: 0 !important;
    }
    a{
        text-decoration: none;
        color: inherit;
    }

</style>
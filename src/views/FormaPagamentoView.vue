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

    const pagamentos = ref([])
    const ValorFrete = ref()
    const pagamentoSelecionado = ref(null)

    const cupons = ref([])
    const cupomatual = ref("")
    const valordesconto = ref(0)
    const descontostring = ref("")

    function selecionarPagamento(pag) {
        pagamentoSelecionado.value = pag.id
    }   

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
                    <div 
                        v-for="pag in pagamentos" :key="pag.id" class="pagamento" :class="{ selecionado: pagamentoSelecionado === pag.id }" @click="selecionarPagamento(pag)">
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

                <router-link><button class="button-comprar">CONTINUAR</button></router-link>
                <router-link to="/Entrega"><button class="button-voltar" >VOLTAR</button></router-link>
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
        font-weight:500;
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
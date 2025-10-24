<script setup>
    import TopMenu from '@/componentes/TopMenu.vue';
    import UserAction from '@/componentes/UserAction.vue';
    import Footer from '@/componentes/Footer.vue';

    import { ref, onMounted } from 'vue'
    import { useCarrinhoStore } from '@/stores/carrinho';

    const carrinho = useCarrinhoStore()
    const fretes = ref([])
    const cepatual = ref('')
    const ValorFrete = ref("0.00")
    const ValorComFrete = ref(0)
    const DiaEntrega = ref('')
    const cidade = ref('')

    onMounted(async () => {
        const resposta = await fetch('http://localhost:3000/fretes')
        const data = await resposta.json()
        fretes.value = data
    })

    function calculardata(cepatual) {
        const frete = fretes.value.find(f => f.cep_destino === cepatual)

        if (frete){
            DiaEntrega.value = `${frete.prazo_entrega_dias} dias`
            ValorFrete.value = frete.valor_frete.toFixed(2)
            ValorComFrete.value = carrinho.total + frete.valor_frete
            cidade.value = ` em ${frete.cidade}`
        } else {
            DiaEntrega.value = 'Cidade fora de rotas'
            ValorFrete.value = `0.00`
            ValorComFrete.value = carrinho.total
            cidade.value = ""
        }
    }

    const cupons = ref([])
    const cupomatual = ref('')
    const descontostring = ref()
    const valordesconto = ref(0)

    onMounted(async () => {
        const resposta = await fetch('http://localhost:3000/cupons')
        const data = await resposta.json()
        cupons.value = data
    })

    function calcularcupom(cupomatual) {
        const cupom = cupons.value.find(c => c.cupom_nome === cupomatual.trim().toUpperCase())

        if(cupom) {
            valordesconto.value = cupom.desconto
            descontostring.value = `Desconto de R$ ${cupom.desconto.toFixed(2)} com o cupom`
        } else {
        valordesconto.value = 0
        descontostring.value = 'Cupom inválido ou não encontrado'
    }
    }

</script>

<template>
    <TopMenu></TopMenu>
    <UserAction></UserAction>
    <main>       
        <div class="container1">
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
                                <td><img v-if="item.imagem" :src="item.imagem" :alt="item.nome" width="100px"></td>
                                <td class="valor">{{ item.nome }}</td>
                                <td>
                                    <div class="quantidade">
                                        <button @click="carrinho.alterarQuantidade(item.id, item.quantidade - 1)">-</button>
                                        <h4>{{ item.quantidade }}</h4>
                                        <button @click="carrinho.alterarQuantidade(item.id, item.quantidade + 1)">+</button>
                                    </div>
                                </td>
                                <td class="valor">R$ {{ (item.preco * item.quantidade).toFixed(2) }}</td>
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
                        <label>Tempo estimado para entrega{{ cidade }}: {{ DiaEntrega }}</label>
                        <div class="cupom">
                            <label for="desconto">Cupom de desconto:</label>
                            <input v-model="cupomatual" class="desconto" type="text" id="desconto" placeholder="Digite o cupom">
                            <button @click="calcularcupom(cupomatual)">Usar cupom</button>
                        </div>
                        <label v-if="descontostring">{{ descontostring }}</label>
                </div>
            </div>
            <div class="market">
                <h2># RESUMO</h2>
                    <div class="style-camp">
                        <span>Valor dos Produtos:</span>
                        <span>R$ {{ carrinho.total.toFixed(2) }}</span>
                    </div>

                <hr>

                <div class="style-camp">
                    <span>Frete:</span>
                    <span v-if="ValorFrete">R$ {{ ValorFrete }}</span>
                </div>
        
                <hr>
            
                <div class="style-camp destaque-prazo">
                    <span>Total a prazo:</span>
                    <div class="preco">
                        <span class="valor">R$ {{ ((ValorComFrete * 0.05) + ValorComFrete - valordesconto).toFixed(2) }}</span>
                        <small>(Em até 2x de R$ {{ ((ValorComFrete * 0.05 + ValorComFrete - valordesconto) / 2).toFixed(2) }} sem juros)</small>
                    </div>
                </div>
                <div class="style-camp destaque-vista">
                    <span>Valor à vista no <b>Pix:</b></span>
                    <div class="preco">
                        <span class="valor">R$ {{ (ValorComFrete - valordesconto).toFixed(2) }}</span>
                    </div>
                </div>

                <hr>

                <button class="button-comprar">CONTINUAR</button>
                <router-link to="/"><button class="button-voltar" >VOLTAR</button></router-link>
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
        padding: 0rem 0rem;
        margin-bottom: 2rem;
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
    .products{
        width: 60rem;
        border-radius: 20px;
        border: 2px solid #0185FA;
        text-align: center;
        padding: 2rem 2rem;
    }
    table{
        margin-bottom: 1rem;
    }
    table th {
        padding-left: 40px;
        padding-right: 40px;
    }
    img{
        border: 3px solid #0185FA;
        padding: 0;
        margin: 0;
    }
    .quantidade {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }
    .quantidade button{
        border: none;
        background-color: white;
        font-size: 1rem;
        cursor: pointer;
    }
    .quantidade h4{
        border: 2px solid rgb(198, 198, 198);
        border-radius: 20px;
        width: 3rem;
    }
    .remove{
        width: 50%;
        background: #0185FA;
        color: #fff;
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
        background-color: rgb(235, 235, 235);
        padding: 2rem 0rem 5rem 1.5rem;
    }
    .complements label, .complements span, .complements button {
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
        margin-bottom: 2rem;
    }
    .frete{
        margin-bottom: 1rem;
    }
    .cupom{
        margin-bottom: 1rem;
    }
    .cupom{
        margin-top: 1rem;
    }
    .cep, .help{ 
        margin-left: 2rem 
    }
    .desconto{
        margin-left: 2rem;
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
    .button-comprar:hover, .button-voltar:hover {
        transform: scale(1.03);
    }
    button{
        margin: 0 !important;
    }
    a {
        text-decoration: none;
        color: inherit;
    }

</style>
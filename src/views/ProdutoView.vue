<script setup>
    import LogoTop from '@/componentes/LogoTop.vue';
    import UserAction from '@/componentes/UserAction.vue';
    import Footer from '@/componentes/Footer.vue';

    import { ref, onMounted, computed } from 'vue'
    import { useRoute } from 'vue-router'
    import { useCarrinhoStore } from '@/stores/carrinho'
    import { useFavoritadosStore } from '@/stores/favoritados';
    import { useProdutosStore } from '@/stores/Produtos';
    import { useAuthStore } from '@/stores/useAuthStore'
    import { formatarPreco } from '@/utils/functionsFull.js'

    const auth = useAuthStore()
    const usuarioLogado = computed(() => auth.usuario)
    const route = useRoute()
    const Produto = ref(null)
    const itens = ref(1)
    const carrinho = useCarrinhoStore()
    const favoritados = useFavoritadosStore()
    const currentUrl = window.location.href
    const imagemAtual = ref(null)

    onMounted(async () => {
        const produtosStore = useProdutosStore()

        if (!produtosStore.produtos.length) {
            await produtosStore.carregarProdutos()
        }

        Produto.value = produtosStore.produtos.find(p => String(p.id) === String(route.params.id))

        if (!Produto.value) {
            console.warn('Produto não encontrado para o ID:', route.params.id)
        } else {
            imagemAtual.value = Produto.value.imagem
        }
    })

    function validarQuantidade() {
        itens.value = Math.floor(itens.value);

        if (isNaN(itens.value) || itens.value < 1) itens.value = 1;
        if (itens.value > 100) itens.value = 100;
    }

    async function compartilharProduto() {
        const link = `http://localhost:5173/produto/${route.params.id}`
        const titulo = Produto.value.nome

        if (navigator.share) {
            await navigator.share({
                title: titulo,
                text: `Confira este produto: ${titulo}`,
                url: link,
            })
        } else {
            await navigator.clipboard.writeText(link)
            alert('Link copiado para a área de transferência!')
        }
    }
</script>

<template>
    <LogoTop></LogoTop>
    <UserAction></UserAction>
    <main v-if="Produto">
        <div class="container1">
            <div class="left">
                <h3>Home / {{ Produto.categoria }} / {{ Produto.nome }}</h3>
            </div>

            <div class="right">
                <div class="link">
                    <button class="material-symbols-outlined" @click="compartilharProduto">link</button>
                </div>

                <div class="whatsapp">
                    <a :href="`https://api.whatsapp.com/send?text=${encodeURIComponent('Confira este produto: ' + Produto.nome + ' - ' + currentUrl)}`"
                        target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-whatsapp"></i>
                    </a>
                </div>

                <div v-if="usuarioLogado" class="favorito">
                    <button class="material-symbols-outlined"
                        :style="{ color: favoritados.isFavoritado(Produto.id) ? 'red' : '#0185FA' }"
                        @click="favoritados.isFavoritado(Produto.id) ? favoritados.removerItem(Produto.id) : favoritados.adicionarItem(Produto)">
                        favorite
                    </button>   
                </div>
                <router-link v-if="!usuarioLogado" to="/Login">
                    <div class="favorito">
                        <button class="material-symbols-outlined">favorite</button>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="container2">
            <div class="photos">
                <div class="atual">
                    <img :src="imagemAtual" :alt="Produto.nome" width="600" height="700">
                </div>

                <div v-if="Produto.imagensSecundarias && Produto.imagensSecundarias.length" class="outrasimg">

                    <img :src="Produto.imagem" width="90" height="110" style="cursor:pointer" @click="imagemAtual = Produto.imagem" />

                    <div v-for="(foto, index) in Produto.imagensSecundarias" :key="index">
                        <img :src="foto" :alt="`Foto ${index + 1} de ${Produto.nome}`" width="90" height="110" style="cursor:pointer" @click="imagemAtual = foto" />
                    </div>
                </div>
            </div>

            <div class="market">
                <div class="text">
                    <div class="justify">
                        <h2 class="name">{{ Produto.nome }}</h2>

                        <p class="avaliacao">★★★★★</p>
                        <h6 class="sla2">Seja o primeiro a opinar</h6>

                        <h2 class="price">{{ formatarPreco(Produto.preco) }}</h2>
                        <h5 class="juros">ou 2x Sem juros</h5>

                        <div class="sub-container">
                            <input class="quantid" v-model.number="itens" type="number" min="1" max="100" @input="validarQuantidade" />

                            <div v-if="usuarioLogado" class="compra">
                                <button class="cart" @click="carrinho.adicionarItem(Produto, itens)">
                                    # Adicionar ao carrinho
                                </button>
                            </div>

                            <router-link v-else to="/Login">
                                <button class="cart">
                                    # Adicionar ao carrinho
                                </button>
                            </router-link>
                        </div>
                    </div>

                    <h6 class="aviso">Aqui sua compra é 100% segura, compre com tranquilidade.</h6>
                </div>
            </div>
        </div>

        <div class="modais">
            <div class="descricao">
                <h2>Descrição geral</h2>
            </div>
        </div>

        <div class="container3">
            <div class="describe">
                <h2>{{ Produto.descricao }}</h2>
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
    .container2{
        width: 100%;
        display: flex;
        gap: 2.9rem;
        justify-content: space-evenly;
        align-items: flex-start;
        padding: 0rem 0rem;
        margin-bottom: 2rem;
    }
    .photos{
        width: 60rem;
        height: 60rem;
        border-radius: 20px;
        border: 2px solid #0185FA;
        text-align: center;
    }
    .atual{
        margin-top: 3rem;
        margin-bottom: 2rem;
    }
    .outrasimg{
        display: inline-flex;
    }
    img{
        margin-right: 10px;
        margin-left: 10px;
    }
    .market{
        width: 26rem;
        border-radius: 20px;
        border: 2px solid #0185FA;
        text-align: center;
        padding: 3rem 0rem;
    }
    .justify{
        text-align: left;
        margin-left: 3rem;
        margin-right: 3rem;
    }
    .name, .sla2{
        margin: 0; 
    }
    .price{
        margin-bottom: 0;
    }
    .juros{
        margin-top: 0;
    }
    .sla{
        margin-top: 20px;
        margin-bottom: 0;
    }
    .aviso{
        margin-top: 10px;
        margin-left: 3rem;
        margin-right: 3rem;
    }
    .cart{
        width: 12rem;
        padding: 10px;
        border-radius: 6px;
        border-color: transparent;
        color: white;
        background-color: #0185FA;
    }
    .quantid{
        text-align: center;
        font-weight: 600;
        font-size: 0.9rem;
        width:1rem;
        padding: 11px;
        border: none;
        background-color: #DDDDDD;
        border-radius: 6px;
        margin-right: 1rem;
    }
    input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .container3{
        width: 99.7%;
        display: flex;
        justify-content: left;
        border: 2px solid #0185FA;
        padding: 2rem 0rem;
        margin-bottom: 2rem;
    }
    .sub-container {
        display: flex;
        align-items: center;
    }
    .compra {
        display: flex;
    }
    .modais{
        width: 100%;
        justify-content: center;
        display: flex;
        gap: 1rem;
    }
    .describe{
        margin-left: 2rem;
        margin-right: 2rem;
    }
    .avaliacao {
        color: gold;
        margin-bottom: 0;
    }
    .container1, .left, .right{
        display: flex;
        justify-content: space-between;
    }
    .right {
        margin-right: 9%;
    }
    .container1{
        align-items: center;
        margin-bottom: 1rem;
    }
    .link, .favorito, .whatsapp{
        padding: 0px 10px;
        display: flex;
        align-items: center;
    }
    .material-symbols-outlined {
        font-variation-settings: 
        'FILL' 0,
        'wght' 300,
        'GRAD' 0,
        'opsz' 24;
        font-size: 25px;
        color: #0185FA;
    }
    .bi-whatsapp{
        color: green;
        font-size: 20px;
    }
    button{
        background: none;
        border: none;
        cursor: pointer;
    }
    .cart:hover {
        background-color: #007acc;
        transform: scale(1.03);
    }
    a {
        text-decoration: none;
    }
</style>
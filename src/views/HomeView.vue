<script setup>
    import TopMenu from '@/componentes/TopMenu.vue';
    import UserAction from '@/componentes/UserAction.vue';
    import Footer from '@/componentes/Footer.vue';
    import { usePesquisaStore } from '@/stores/pesquisa'

    import { ref, onMounted, computed } from 'vue'

    const produtos = ref([])

    const categoriaSelecionada = ref('')
    const precoSelecionado = ref('')
    const personalizavelSelecionado = ref('')
    const ordenacaoSelecionada = ref('')
    const pesquisa = usePesquisaStore()

    onMounted(async () => {
        const resposta = await fetch('http://localhost:3000/produtos')
        const data = await resposta.json()
        produtos.value = data
    })

    const produtosSelecionado = computed(() => {
        let filtrados = produtos.value.filter(p => {
            let passa = true

            if (pesquisa.termo && !p.nome.toLowerCase().includes(pesquisa.termo.toLowerCase())) {
                passa = false
            }
            if (categoriaSelecionada.value && p.categoria !== categoriaSelecionada.value)
                passa = false
            
            if (precoSelecionado.value) {
                const preco = p.preco;
                if (precoSelecionado.value === '1' && preco > 50) passa = false
                if (precoSelecionado.value === '2' && (preco < 50 || preco > 100)) passa = false
                if (precoSelecionado.value === '3' && preco < 100) passa = false
            }

            if (personalizavelSelecionado.value && String(p.personalizavel) !== personalizavelSelecionado.value) {
                passa = false
            }

            return passa
        })  
            if (ordenacaoSelecionada.value === 'az') {
                filtrados.sort((a, b) => a.nome.localeCompare(b.nome))
            } else if (ordenacaoSelecionada.value === 'maior') {
                filtrados.sort((a, b) => b.preco - a.preco)
            } else if (ordenacaoSelecionada.value === 'menor') {
                filtrados.sort((a, b) => a.preco - b.preco)
            }

            return filtrados
    })

    const limparFiltros = () => {
        categoriaSelecionada.value = ''
        precoSelecionado.value = ''
        personalizavelSelecionado.value = ''
    }

</script>

<template>
    <TopMenu></TopMenu>
    <UserAction></UserAction>
    <main> 
        <div class="container">

            <div class="filter">
                <h3 style="margin-left: 10px;" class="MS-Reference"># Filtre sua busca</h3>
                <label for="categorias">
                    <select v-model="categoriaSelecionada" class="select-filter">
                        <option value="">Categorias</option>
                        <option value="Decoração">Decoração</option>
                        <option value="Roupas">Roupas</option>
                        <option value="Acessórios">Acessórios</option>
                    </select>
                </label>
                <label for="categorias">
                    <select v-model="precoSelecionado" class="select-filter">
                        <option value="">Preço</option>
                        <option value="1">Até R$ 50</option>
                        <option value="2">De R$ 50 a R$ 100</option>
                        <option value="3">Acima de R$ 100</option>
                    </select>
                </label>
                <label for="categorias">
                    <select v-model="personalizavelSelecionado" class="select-filter">
                        <option value="">Personalizavel</option>
                        <option value="true">Personalizável</option>
                        <option value="false">Não personalizável</option>
                    </select>
                </label>
                <button class="button-filter" @click="limparFiltros">Limpar filtros</button>
            </div>
            
            <div class="all-products">
                <h2 class="MS-Reference">Todos os produtos</h2>
                <label for="categorias">
                    <h3 class="MS-Reference">Ordenar por:
                        <select v-model="ordenacaoSelecionada" id="relevancia" class="relevance-filter">
                            <option value="">Relevância</option>
                            <option value="az">Nome (A-Z)</option>
                            <option value="menor">Maior Preço</option>
                            <option value="maior">Menor Preço</option>
                        </select>
                    </h3>
                </label>
                <div class="lista-produtos">
                    <div v-for="p in produtosSelecionado" :key="p.id" class="produto">
                        <img :src="p.imagem" :alt="p.nome">
                        <h3>{{ p.nome }}</h3>
                        <p class="preco">R$ {{ p.preco.toFixed(2) }}</p>
                        <p class="avaliacao">★★★★★</p>
                        <button @click="$router.push({ name: 'Produto', params: { id: p.id } })">Comprar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="information">
            <h3>Boletim Informativo</h3>
            <p>Receba notícias, ofertas e comunicações em seu e-mail!!!</p>
            <form action=""> 
                <input type="text" placeholder="Digite seu nome">
                <input type="text" placeholder="Digite seu e-mail">
                <button type="submit" class="button-register">CADASTRAR</button>
            </form>
        </div>
    </main>
    <Footer></Footer>
    <a href="http://localhost:5173/Login"><button>ir pra login</button></a>
</template>

<style scoped>

    main{
        width: 1400px;
        margin: 0 auto;
        font-family: 'Open Sans';
        font-weight: 300;
    }
    .container{
        margin-left: 20px;
        display: flex;
        align-items: flex-start;
        
    }
    .MS-Reference{
       font-family: "MS Reference Sans Serif", sans-serif;
       font-weight: 200;
    }
    .all-products{
        margin: 0 auto;
        border-radius: 20px;
        border: 2px solid #0185FA;
    }
    .all-products h3{
        margin-top: 5px;
        margin-left: 40px;
        font-size: .8rem;
    }
    .all-products h2{
        margin-top: 10px;
        margin-left: 50px;
        margin-bottom: 0px;
    }
    .relevance-filter{
        padding: 5px;
        border-radius: 20px;
        width: 140px;
        font-size: .8rem;
        background-color: #D2D2D2;
        border: none;
    }
    .filter{
        width: 250px;
        height: 300px;
        border-radius: 20px;
        border: 2px solid #0185FA;
    }
    .filter h3{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    
    .select-filter{
        width: 230px;
        padding: 5px;
        border-radius: 20px;
        border-color: #0185FA;
        margin-left: 10px;
        margin-bottom: 5px;
    }
    .button-filter{
        width: 130px;
        padding: 5px;
        border-radius: 20px;
        color: white;
        background-color: #0185FA;
        border-color: transparent;
        margin-top: 5px;
        margin-left: 10px;
    }
    .information{
        box-sizing: border-box;
        padding: 10px;
        margin-top: 30px;
        background-color: #DDDDDD;
        text-align: center;
        margin-bottom: 3rem;
    }
    .information p{
        margin: 0px;
        margin-bottom: 20px;
        line-height: 15px;
    }
    .information h3{
        margin: 0px;
    }
    input{
        border: none;
        border-radius: 3px;
        padding: 5px;
        margin-left: 10px;
        width: 10rem;
    }
    input::placeholder{
        color: #D2D2D2;
    }
    .button-register{
        width: 130px;
        padding: 3px;
        border-radius: 3px;
        border-color: transparent;
        color: white;
        background-color: #0185FA;
        margin-left: 10px;
    }
    .lista-produtos {
        display: grid;
        grid-template-columns: repeat(4, 1fr);;
        margin-top: 20px;
        gap: 20px;
        padding: 20px;
        justify-items: center;
    }
    .produto {
        width: 220px;
        text-align: center;
        padding: 10px;
        border-radius: 10px;
    }
    .produto:hover {
        transform: scale(1.03);
    }
    .produto img {
        width: 80%;
        height: 160px;
        object-fit: cover;
    }

    .produto h3 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 16px;
        margin: 10px 0 5px;
        height: 2.6em;
    }

    .preco {
        margin: 0;
        font-weight: bold;
    }

    .avaliacao {
        color: gold;
        margin: 0px 0;
    }

    button {
        background-color: #0099ff;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        cursor: pointer;
    }

    button:hover {
        background-color: #007acc;
    }
    
</style>
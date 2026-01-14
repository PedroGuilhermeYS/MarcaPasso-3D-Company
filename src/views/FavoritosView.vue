<script setup>
    import LogoTop from '@/componentes/LogoTop.vue';
    import UserAction from '@/componentes/UserAction.vue';
    import Footer from '@/componentes/Footer.vue';

    import { useFavoritadosStore } from '@/stores/useFavoritosStore';

    const favoritados = useFavoritadosStore()

    function limpartudo() {
        favoritados.limparfavoritos()
    }
</script>

<template>
    <LogoTop></LogoTop>
    <UserAction></UserAction>
    <main>
        <div class="container">
            <div class="all-products">
                <h2 class="MS-Reference">Todos os Favoritados</h2>
                <button class="apagar" @click="limpartudo">LIMPAR TUDO</button>
                <div class="lista-produtos">
                    <div v-for="item in favoritados.itens" :key="item.id" class="produto">
                        <img :src="item.imagem" :alt="item.nome">
                        <h3>{{ item.nome }}</h3>
                        <p class="preco">R$ {{ item.preco.toFixed(2) }}</p>
                        <p class="avaliacao">★★★★★</p>
                        <button @click="$router.push({ name: 'Produto', params: { id: item.id } })">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <Footer></Footer>
</template>

<style scoped>

    main{
        width: 1400px;
        margin: 0 auto;
        font-family: var(--font-family-base);
        font-weight: 300;
    }
    .container{
        margin-left: 20px;
        display: flex;
        align-items: flex-start;
        
    }
    .MS-Reference{
       font-family: var(--font-family-ms-reference);
       font-weight: 200;
    }
    .all-products{
        width: 90%;
        margin: 0 auto;
        border-radius: 20px;
        border: 2px solid var(--color-primary);
    }
    .all-products h3{
        margin-top: 5px;
        margin-left: 40px;
        font-size: .8rem;
    }
    .all-products h2, .apagar{
        margin-top: 10px;
        margin-left: 50px;
        margin-bottom: 0px;
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
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 16px;
        margin: 10px 0 5px;
        height: 2.6em;
    }
    .lista-produtos {
        display: grid;
        grid-template-columns: repeat(4, 1fr);;
        margin-top: 20px;
        gap: 20px;
        padding: 20px;
        justify-items: center;
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
        background-color: var(--color-primary);
        color: var(--color-on-primary);
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        cursor: pointer;
    }

</style>
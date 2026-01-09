<script setup>
    import LogoTop from '@/componentes/LogoTop.vue';
    import UserAction from '@/componentes/UserAction.vue';
    import Footer from '@/componentes/Footer.vue';
    import ProdutoProdutos from '@/componentes/ProdutoView/Produto-Produtos.vue';
    import ProdutoDescrição from '@/componentes/ProdutoView/Produto-Descrição.vue';
</script>

<template>
    <LogoTop></LogoTop>
    <UserAction></UserAction>
    <main>
        <ProdutoProdutos></ProdutoProdutos>
        <ProdutoDescrição></ProdutoDescrição>
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
</style>
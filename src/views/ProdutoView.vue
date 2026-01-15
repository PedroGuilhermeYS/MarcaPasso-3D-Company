<script setup>
    import ProdutoProdutos from '@/componentes/ProdutoView/Produto-Produtos.vue';
    import ProdutoDescrição from '@/componentes/ProdutoView/Produto-Descrição.vue';
</script>

<template>
    <main>
        <ProdutoProdutos></ProdutoProdutos>
        <ProdutoDescrição></ProdutoDescrição>
    </main>
</template>


<style scoped>
    main{
        width: 1400px;
        margin: 0 auto;
        font-family: var(--font-family-base);
        font-weight: 300;
    }
</style>
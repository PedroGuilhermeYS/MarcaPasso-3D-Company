<script setup>
    import HomeProducts from '@/componentes/HomeView/Home-Products.vue';
    import HomeInformation from '@/componentes/HomeView/Home-Information.vue';
</script>

<template>
    <main> 
        <HomeProducts></HomeProducts>
        <HomeInformation></HomeInformation>
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
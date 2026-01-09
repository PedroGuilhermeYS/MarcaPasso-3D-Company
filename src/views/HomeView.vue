<script setup>
    import TopMenu from '@/componentes/TopMenu.vue';
    import UserAction from '@/componentes/UserAction.vue';
    import Footer from '@/componentes/Footer.vue';
    import HomeProducts from '@/componentes/HomeView/Home-Products.vue';
    import HomeInformation from '@/componentes/HomeView/Home-Information.vue';
</script>

<template>
    <TopMenu></TopMenu>
    <UserAction></UserAction>
    <main> 
        <HomeProducts></HomeProducts>
        <HomeInformation></HomeInformation>
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
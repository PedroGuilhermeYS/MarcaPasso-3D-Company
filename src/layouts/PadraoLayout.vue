<script setup>
    import TopMenu from '@/componentes/TopMenu.vue';
    import UserAction from '@/componentes/UserAction.vue';
    import Footer from '@/componentes/Footer.vue';
</script>

<template>
    <TopMenu></TopMenu>
    <UserAction></UserAction>
    <main> 
        <router-view />
    </main>
    <Footer></Footer>
</template>

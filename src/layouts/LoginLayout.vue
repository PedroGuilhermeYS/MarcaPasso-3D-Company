<script setup>
import UserActionSimples from '@/componentes/UserActionSimples.vue';
import Footer from '@/componentes/Footer.vue';
import LogoTop from '@/componentes/LogoTop.vue';
</script>

<template>
    <LogoTop></LogoTop>
    <UserActionSimples></UserActionSimples>
    <main>
        <router-view />
    </main>
    <Footer></Footer>
</template>

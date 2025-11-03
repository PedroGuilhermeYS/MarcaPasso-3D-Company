<script setup>
import { usePesquisaStore } from '@/stores/pesquisa'
const pesquisa = usePesquisaStore()
</script>

<template>
  <main>
    <div class="container">
      <router-link to="/">
        <img src="@/img/marcapasso-logo.svg" alt="logo">
      </router-link>

      <div class="search-container">
        <input 
          type="text" 
          class="search" 
          placeholder="Compre na MarcaPasso 3D"
          v-model="pesquisa.termo"
        >
        <span class="icon">🔍</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
    main {
        background-color: rgb(255, 255, 255);
        font-family: "Open Sans";
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img {
        margin-right: 1.5rem;
    }
    .search-container {
        position: relative;
    }
    .search {
        width: 30rem;
        height: 2rem;
        border-radius: 20px;
        border: 2px solid #D9D9D9;
        padding-left: 10px;
    }
    .search::placeholder {
        color: #c0c0c0;
    }
    .icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        border: 1px solid #D9D9D9;
        border-radius: 50%;
        padding: 5px;
        background-color: #0185FA;
        cursor: pointer;
    }
</style>
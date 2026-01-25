<script setup>
import { useRouter } from 'vue-router';
import { usePesquisaStore } from '@/stores/usePesquisaStore'
const pesquisa = usePesquisaStore()

const router = useRouter()

function buscar () {
  if (router.currentRoute.value.name !== 'Home') {
    router.push({ name: 'Home', state: { veioPesquisar: true } });
  }
}

</script>

<template>
  <main>
    <div class="container">
      <router-link :to="{ name: 'Home' }">
        <img src="@/img/marcapasso-logo.svg" alt="logo">
      </router-link>

      <div class="search-container">
        <input 
          type="text" 
          class="search" 
          placeholder="Compre na MarcaPasso 3D"
          v-model="pesquisa.termo"
          @keyup.enter="buscar"
        >
        <span class="icon" @click="buscar">🔍</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
    main {
        background-color: var(--color-surface);
        font-family: var(--font-family-base);
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
        border: 2px solid var(--color-border-light);
        padding-left: 10px;
    }
    .search::placeholder {
        color: var(--color-placeholder);
    }
    .icon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        border: 1px solid var(--color-border-light);
        border-radius: 50%;
        padding: 5px;
        background-color: var(--color-primary);
        cursor: pointer;
    }
</style>
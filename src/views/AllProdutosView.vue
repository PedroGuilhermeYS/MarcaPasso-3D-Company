<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase/firebase';
import LogoTop from '@/componentes/LogoTop.vue'

const produtos = ref([]);

onMounted(async () => {
  try {
    const snap = await getDocs(collection(db, "produtos"));

    produtos.value = snap.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }));
  } catch (error) {
    console.error("Erro ao carregar produtos", error);
  }
});
</script>

<template>
    <LogoTop></LogoTop>
    <main>
        <div class="admin-wrapper">
            <h1 class="titulo">Lista de Produtos</h1>

            <div class="grid-produtos">
            <div v-for="item in produtos" :key="item.id" class="card-produto">
                
                <img :src="item.imagemPrincipal" alt="Foto do produto" class="foto" />

                <h2 class="nome">Nome: {{ item.nome }}</h2>
                <p class="id">ID: {{ item.id }}</p>

            </div>
            </div>
        </div>
    </main>
</template>

<style scoped>

.titulo {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.grid-produtos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.card-produto {
  background: var(--color-surface);
  border: 2px solid var(--color-primary);
  border-radius: 18px;
  padding: 15px;
  box-shadow: 0 4px 10px #00000015;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.foto {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
}
.id {
  font-size: 1rem;  
  font-weight: 700;
  margin: 0;
  color: var(--color-primary);
}
.nome {
  font-size: 1rem;  
  font-weight: 700;
  margin: 0;
  color: var(--color-text);
}
</style>

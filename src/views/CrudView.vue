<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import LogoTop from "@/componentes/LogoTop.vue";

// 👉 importa a lógica de exclusão
import { removerProduto } from "@/stores/RemoverProduto";

const produtos = ref([]);
const router = useRouter();

onMounted(async () => {
  const snap = await getDocs(collection(db, "produtos"));
  produtos.value = snap.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
  if (produtos.value.length === 0) {
    router.push("/Adicionar");
  }
});

const adicionarProduto = () => {
  router.push("/Adicionar");
};

const atualizarProduto = (id) => {
  router.push(`/Atualizar/${id}`);
};

const remover = async (id) => {
  const confirmar = confirm("Deseja remover este produto?");
  if (!confirmar) return;

  try {
    await removerProduto(id);
    produtos.value = produtos.value.filter(p => p.id !== id);
  } catch (e) {
    console.error(e);
    alert("Erro ao remover produto.");
  }
};
</script>

<template>
  <LogoTop />

  <div class="container-principal">
    <h2 class="titulo">Lista de Produtos</h2>

    <div class="barra-superior">
      <button class="button-comprar" @click="adicionarProduto">
        + Adicionar Produto
      </button>
    </div>

    <div class="grid-produtos">
      <div class="card-produto" v-for="produto in produtos" :key="produto.id">
        <img :src="produto.imagemPrincipal" alt="Produto" class="foto"/>

        <p class="nome-produto">
          {{ produto.nome }}
        </p>

        <div class="acoes">
          <button class="btn azul" @click="atualizarProduto(produto.id)">
            Atualizar
          </button> 

          <button class="btn vermelho" @click="remover(produto.id)">
            Remover
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-principal {
  border: 2px solid var(--color-primary);
  border-radius: 14px;
  padding: 30px;
  max-width: 1500px;
  margin: 0 auto;
}

.titulo {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.barra-superior {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.grid-produtos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
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

.nome-produto {
  margin: 12px 0;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}

.acoes {
  display: flex;
  gap: 10px;
}

.btn {
  width: 7rem;
  padding: 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: scale(1.03);
}

.azul {
  background: var(--color-primary);
  color: white;
}

.vermelho {
  background: var(--color-error);
  color: white;
}
</style>

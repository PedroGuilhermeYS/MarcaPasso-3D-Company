<script setup>
import { ref } from 'vue'
import AdicionarProdutosView from './AdicionarProdutosView.vue'
import AtualizarProdutoView from './AtualizarProdutoView.vue'
import RemoverProdutoView from './RemoverProdutoView.vue'
import AllProdutosView from './AllProdutosView.vue'

const currentTab = ref('adicionar')
</script>

<template>
  <div class="crud-container">
    <aside class="sidebar">
      <button @click="currentTab = 'adicionar'" :class="{ active: currentTab === 'adicionar' }">Adicionar Produto</button>
      <button @click="currentTab = 'atualizar'" :class="{ active: currentTab === 'atualizar' }">Atualizar Produto</button>
      <button @click="currentTab = 'remover'" :class="{ active: currentTab === 'remover' }">Remover Produto</button>
      <button @click="currentTab = 'todosprodutos'" :class="{ active: currentTab === 'todosprodutos' }">Todos os Produtos</button>
    </aside>

    <main class="content">
      <AdicionarProdutosView v-if="currentTab === 'adicionar'" />
      <AtualizarProdutoView v-if="currentTab === 'atualizar'" />
      <RemoverProdutoView v-if="currentTab === 'remover'" />
      <AllProdutosView v-if="currentTab === 'todosprodutos'" />
    </main>
  </div>
</template>

<style scoped>
.crud-container {
  display: flex;
  min-height: 100vh;
  background: #f7f7f7;
}

.sidebar {
  width: 220px;
  background: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.08);
}

.sidebar button {
  padding: 12px;
  border: 1px solid #0185fa;
  background: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.2s;
}

.sidebar button:hover {
  background: #e9f4ff;
}

.sidebar button.active {
  background: #0185fa;
  color: white;
}

.content {
  flex: 1;
  padding: 30px;
}
</style>

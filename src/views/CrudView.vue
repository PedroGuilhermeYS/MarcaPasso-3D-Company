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
}

.sidebar {
  width: 220px;
  background: var(--color-surface);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.08);
}

.sidebar button {
  padding: 12px;
  border: 1px solid var(--color-primary);
  background: var(--color-surface);
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.2s;
}

.sidebar button:hover {
  background: var(--color-primary-hover);
}

.sidebar button.active {
  background: var(--color-primary);
  color: var(--color-on-primary);
}

.content {
  flex: 1;
  padding: 30px;
}
</style>

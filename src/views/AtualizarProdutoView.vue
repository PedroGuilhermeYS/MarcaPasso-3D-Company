<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProdutosStore } from '@/stores/useProdutosStore'

const route = useRoute()

const produtosStore = useProdutosStore()

const id = computed(() => route.params.id)

const nome = ref('')
const preco = ref('')
const categoria = ref('')
const personalizavel = ref(false)
const descricao = ref('')

const mensagem = ref('')
const loading = ref(false)

onMounted(async () => {
  try {
    const p = await produtosStore.buscarProduto(id.value)

    nome.value = p.nome
    preco.value = p.preco
    categoria.value = p.categoria
    personalizavel.value = p.personalizavel
    descricao.value = p.descricao
  } catch (e) {
    console.error(e)
    mensagem.value = '❌ Erro ao carregar produto.'
  }
})

async function atualizarProduto() {
  loading.value = true
  mensagem.value = ''

  try {
    await produtosStore.atualizarProduto(id.value, {
      nome: nome.value,
      preco: parseFloat(preco.value),
      categoria: categoria.value,
      personalizavel: personalizavel.value,
      descricao: descricao.value
    })

    mensagem.value = '✅ Produto atualizado com sucesso!'
  } catch (e) {
    console.error(e)
    mensagem.value = '❌ Erro ao atualizar produto.'
  } finally {
    loading.value = false
  }
}
</script>

<template>

  <main class="admin-wrapper">
    <h1 class="titulo">Atualizar Produto</h1>

    <form @submit.prevent="atualizarProduto" class="admin-card">

      <div class="input-group">
        <label>Nome</label>
        <input v-model="nome" />
      </div>

      <div class="row">
        <div class="input-group">
          <label>Preço</label>
          <input v-model="preco" type="number" step="0.01" min="0" />
        </div>

        <div class="input-group">
          <label>Categoria</label>
          <input v-model="categoria" />
        </div>
      </div>

      <label class="checkbox-area">
        <input type="checkbox" v-model="personalizavel" />
        Produto Personalizável
      </label>

      <div class="input-group">
        <label>Descrição</label>
        <textarea v-model="descricao" rows="4"></textarea>
      </div>

      <button type="submit" :disabled="loading" class="btn-submit">
        {{ loading ? 'Atualizando...' : 'Atualizar Produto' }}
      </button>

      <p class="mensagem">{{ mensagem }}</p>
    </form>
  </main>
</template>


<style scoped>
    .row {
        display: flex;
        gap: 1.5rem;
    }
    input, textarea {
        padding: 12px;
        border: 1px solid var(--color-border-input);
        border-radius: 10px;
        font-size: 1rem;
        outline: none;
    }
    input:focus, textarea:focus {
        border-color: var(--color-primary);
    }
    .checkbox-area {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
    }

</style>

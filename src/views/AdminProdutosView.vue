<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/firebase.js'
import LogoTop from '@/componentes/LogoTop.vue';
import { supabase } from '@/supabase/supabase.js'
import { collection, doc, setDoc } from 'firebase/firestore'

const nome = ref('')
const preco = ref('')
const categoria = ref('')
const personalizavel = ref(false)
const descricao = ref('')
const imagemPrincipal = ref(null)
const imagensSecundarias = ref([])

const mensagem = ref('')
const loading = ref(false)

const onFilePrincipalChange = (e) => {
  imagemPrincipal.value = e.target.files[0]
}

const onFilesSecundariasChange = (e) => {
  imagensSecundarias.value = Array.from(e.target.files).slice(0, 5)
}

async function cadastrarProduto() {
  mensagem.value = ''
  loading.value = true

  try {
    const idProduto = Date.now().toString()

    let imagemPrincipalUrl = ''
    if (imagemPrincipal.value) {
      const { data, error } = await supabase.storage
        .from('produtos')
        .upload(`${idProduto}/principal_${imagemPrincipal.value.name}`, imagemPrincipal.value)

      if (error) throw error

      const { data: publicUrl } = supabase.storage
        .from('produtos')
        .getPublicUrl(data.path)

      imagemPrincipalUrl = publicUrl.publicUrl
    }

    const urlsSecundarias = []

    for (const arquivo of imagensSecundarias.value) {
      const { data, error } = await supabase.storage
        .from('produtos')
        .upload(`${idProduto}/secundaria_${arquivo.name}`, arquivo)

      if (error) throw error

      const { data: publicUrl } = supabase.storage
        .from('produtos')
        .getPublicUrl(data.path)

      urlsSecundarias.push(publicUrl.publicUrl)
    }

    await setDoc(doc(collection(db, 'produtos'), idProduto), {
      id: idProduto,
      nome: nome.value,
      preco: parseFloat(preco.value),
      categoria: categoria.value,
      personalizavel: personalizavel.value,
      descricao: descricao.value,
      imagemPrincipal: imagemPrincipalUrl,
      imagensSecundarias: urlsSecundarias,
      criadoEm: new Date()
    })

    mensagem.value = '✅ Produto cadastrado com sucesso!'

    nome.value = ''
    preco.value = ''
    categoria.value = ''
    personalizavel.value = false
    descricao.value = ''
    imagemPrincipal.value = null
    imagensSecundarias.value = []
  } catch (error) {
    console.error(error)
    mensagem.value = '❌ Erro ao cadastrar o produto.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <LogoTop></LogoTop>
  <main class="admin-wrapper">
    <h1 class="titulo">Cadastrar Novo Produto</h1>

    <form @submit.prevent="cadastrarProduto" class="admin-card">

      <div class="input-group">
        <label>Nome do Produto</label>
        <input v-model="nome" placeholder="Ex: Camiseta Oversized" required />
      </div>

      <div class="row">
        <div class="input-group">
          <label>Preço</label>
          <input v-model="preco" type="number" step="0.01" placeholder="0,00" required />
        </div>

        <div class="input-group">
          <label>Categoria</label>
          <input v-model="categoria" placeholder="Ex: Roupas" required />
        </div>
      </div>

      <label class="checkbox-area">
        <input type="checkbox" v-model="personalizavel" />
        Produto Personalizável
      </label>

      <div class="input-group">
        <label>Descrição</label>
        <textarea v-model="descricao" placeholder="Descreva o produto..." rows="4"></textarea>
      </div>

      <div class="upload-box">
        <label>Imagem Principal</label>
        <input type="file" accept="image/*" @change="onFilePrincipalChange" />

        <label>Imagens Secundárias (até 5)</label>
        <input type="file" accept="image/*" multiple @change="onFilesSecundariasChange" />
      </div>

      <button type="submit" :disabled="loading" class="btn-submit">
        {{ loading ? 'Cadastrando...' : 'Cadastrar Produto' }}
      </button>

      <p class="mensagem">{{ mensagem }}</p>
    </form>
  </main>
</template>

<style scoped>

.admin-wrapper {
  width: 1400px;
  margin: 0 auto;
  padding: 0;
  font-family: 'Open Sans';
}

.titulo {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.admin-card {
  background: white;
  border: 2px solid #0185FA;
  border-radius: 20px;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  box-shadow: 0 4px 12px #00000015;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 600;
}

input,
textarea {
  padding: 12px;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #0185FA;
}

.row {
  display: flex;
  gap: 1.5rem;
}

.checkbox-area {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.upload-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upload-box label {
  font-weight: 600;
}

.btn-submit {
  background: #0185FA;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: .2s;
}

.btn-submit:hover {
  background: #0070d6;
}

.btn-submit:disabled {
  background: #8dbcec;
  cursor: not-allowed;
}
.mensagem {
  text-align: center;
  font-weight: 600;
  margin-top: 10px;
}
</style>
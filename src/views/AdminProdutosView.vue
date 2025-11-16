<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/firebase.js'
import { supabase } from '@/supabase/supabase.js'
import { collection, doc, setDoc } from 'firebase/firestore'

// Campos do produto
const nome = ref('')
const preco = ref('')
const categoria = ref('')
const personalizavel = ref(false)
const descricao = ref('')
const imagemPrincipal = ref(null)
const imagensSecundarias = ref([])

const mensagem = ref('')
const loading = ref(false)

// Upload da imagem principal
const onFilePrincipalChange = (e) => {
  imagemPrincipal.value = e.target.files[0]
}

// Upload das imagens secundárias (até 5)
const onFilesSecundariasChange = (e) => {
  imagensSecundarias.value = Array.from(e.target.files).slice(0, 5)
}

// Função principal
async function cadastrarProduto() {
  mensagem.value = ''
  loading.value = true

  try {
    // Cria o ID manualmente para usar no Firebase e Supabase
    const idProduto = Date.now().toString()

    // === 1️⃣ Upload da imagem principal ===
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
      console.log(imagemPrincipalUrl)
    }

    // === 2️⃣ Upload das imagens secundárias ===
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

    // === 3️⃣ Salva o produto no Firestore ===
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

    // Limpa o formulário
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
  <main class="admin-container">
    <h1>Painel de Administração - Cadastrar Produto</h1>

    <form @submit.prevent="cadastrarProduto" class="form-admin">
      <input v-model="nome" placeholder="Nome do produto" required />
      <input v-model="preco" type="number" step="0.01" placeholder="Preço" required />
      <input v-model="categoria" placeholder="Categoria" required />

      <label>
        <input type="checkbox" v-model="personalizavel" />
        Personalizável
      </label>

      <textarea v-model="descricao" placeholder="Descrição do produto" rows="4"></textarea>

      <div class="upload-area">
        <label>Imagem Principal:</label>
        <input type="file" accept="image/*" @change="onFilePrincipalChange" />

        <label>Imagens Secundárias (até 5):</label>
        <input type="file" accept="image/*" multiple @change="onFilesSecundariasChange" />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Cadastrando...' : 'Cadastrar Produto' }}
      </button>
    </form>

    <p class="mensagem">{{ mensagem }}</p>
  </main>
</template>

<style scoped>
.admin-container {
  max-width: 650px;
  margin: 40px auto;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}
.form-admin {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.upload-area {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}
button:disabled {
  background-color: #aaa;
}
.mensagem {
  margin-top: 15px;
  font-weight: bold;
}
</style>

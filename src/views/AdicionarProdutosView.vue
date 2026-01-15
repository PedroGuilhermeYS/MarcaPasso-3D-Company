<script setup>
import { ref } from 'vue'
import { db } from '@/lib/firebase.js'
import LogoTop from '@/componentes/LogoTop.vue'
import { supabase } from '@/lib/supabase.js'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()
const nome = ref('')
const preco = ref('')
const categoria = ref('')
const personalizavel = ref(false)
const descricao = ref('')
const imagemPrincipal = ref(null)
const imagensSecundarias = ref([])

const mensagem = ref('')
const loading = ref(false)

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const onFilePrincipalChange = (e) => {
  imagemPrincipal.value = e.target.files[0]
}

const onFilesSecundariasChange = (e) => {
  imagensSecundarias.value = Array.from(e.target.files).slice(0, 5)
}

async function uploadArquivo(caminho, arquivo) {
  const { data, error } = await supabase.storage
    .from('produtos')
    .upload(caminho, arquivo)

  if (error) throw error

  const { data: url } = supabase.storage
    .from('produtos')
    .getPublicUrl(data.path)

  return url.publicUrl
}

async function cadastrarProduto() {
  mensagem.value = ''
  loading.value = true

  try {
    const idProduto = crypto.randomUUID();
    const basePath = `${idProduto}/`

    const imagemPrincipalUrl = imagemPrincipal.value
      ? await uploadArquivo(basePath + 'principal_' + imagemPrincipal.value.name, imagemPrincipal.value)
      : ''

    const imagensSec = []
    for (const img of imagensSecundarias.value) {
      const url = await uploadArquivo(basePath + 'secundaria_' + img.name, img)
      imagensSec.push(url)
    }

    await setDoc(doc(collection(db, 'produtos'), idProduto), {
      id: idProduto,
      nome: nome.value,
      preco: parseFloat(preco.value),
      categoria: categoria.value,
      personalizavel: personalizavel.value,
      descricao: descricao.value,
      imagemPrincipal: imagemPrincipalUrl,
      imagensSecundarias: imagensSec,
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
    
    await esperar(2000)
    router.push("/Crud");

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
          <input v-model="preco" type="number" step="0.01" min="0" placeholder="0,00" required />
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
  input,
  textarea {
    padding: 12px;
    border: 1px solid var(--color-border-input);
    border-radius: 10px;
    font-size: 1rem;
    outline: none;
  }
  input:focus,
  textarea:focus {
    border-color: var(--color-primary);
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
</style>
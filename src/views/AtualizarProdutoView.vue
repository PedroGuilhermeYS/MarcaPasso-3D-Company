<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import LogoTop from '@/componentes/LogoTop.vue'

const id = ref('')
const nome = ref('')
const preco = ref('')
const categoria = ref('')
const personalizavel = ref(false)
const descricao = ref('')

const carregado = ref(false)
const mensagem = ref('')
const loading = ref(false)

async function carregarProduto() {
    mensagem.value = ''
    carregado.value = false

    try {
        const refDoc = doc(db, 'produtos', id.value)
        const snap = await getDoc(refDoc)

        if (!snap.exists()) {
            mensagem.value = '❌ Produto não encontrado.'
            return
        }

        const p = snap.data()
        nome.value = p.nome
        preco.value = p.preco
        categoria.value = p.categoria
        personalizavel.value = p.personalizavel
        descricao.value = p.descricao

        carregado.value = true
    } catch (e) {
        console.error(e)
        mensagem.value = '❌ Erro ao carregar produto.'
    }
}

async function atualizarProduto() {
    loading.value = true
    mensagem.value = ''

    try {
        const refDoc = doc(db, 'produtos', id.value)

        const updates = {
            nome: nome.value,
            preco: parseFloat(preco.value),
            categoria: categoria.value,
            personalizavel: personalizavel.value,
            descricao: descricao.value
        }

        await updateDoc(refDoc, updates)

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
    <LogoTop></LogoTop>
    <main class="admin-wrapper">
        <h1 class="titulo">Atualizar Produto</h1>

        <div class="admin-card">
            <div class="input-group">
                <label>ID do Produto</label>
                <input v-model="id" placeholder="Digite o ID" />
            </div>

            <button class="btn-submit" @click="carregarProduto" :disabled="loading">
                Carregar Dados
            </button>
            <p class="mensagem">{{ mensagem }}</p>
        </div>

        <form v-if="carregado" @submit.prevent="atualizarProduto" class="admin-card">

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
    .row {
        display: flex;
        gap: 1.5rem;
    }
    .input-group label {
        font-size: 0.9rem;
        font-weight: 600;
    }
    input, textarea {
        padding: 12px;
        border: 1px solid #bbbbbb;
        border-radius: 10px;
        font-size: 1rem;
        outline: none;
    }
    input:focus, textarea:focus {
        border-color: #0185FA;
    }
    .checkbox-area {
        display: flex;
        align-items: center;
        gap: 8px;
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
</style>

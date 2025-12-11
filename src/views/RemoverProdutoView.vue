<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/firebase'
import { supabase } from '@/supabase/supabase'
import { doc, deleteDoc, getDoc } from 'firebase/firestore'
import LogoTop from '@/componentes/LogoTop.vue'

const id = ref('')
const mensagem = ref('')
const loading = ref(false)

async function removerProduto() {
    mensagem.value = ''
    if (!id.value) return
    loading.value = true

    try {
        const pasta = id.value

        const refDoc = doc(db, 'produtos', id.value)
        const snap = await getDoc(refDoc)

        if (!snap.exists()) {
            mensagem.value = '❌ Produto não encontrado.'
            loading.value = false
            return
        }

        const { data: arquivos } = await supabase.storage
            .from('produtos')
            .list(pasta, { limit: 1000 })

        if (arquivos && arquivos.length > 0) {
            const caminhos = arquivos.map(a => `${pasta}/${a.name}`)

            await supabase.storage
                .from('produtos')
                .remove(caminhos)
        }

        await deleteDoc(refDoc)

        mensagem.value = '✅ Produto removido com sucesso!'
    } catch (e) {
        console.error(e)
        mensagem.value = '❌ Erro ao remover produto.'
    } finally {
        loading.value = false
    }
}
</script>


<template>
    <LogoTop />
    <main class="admin-wrapper">
        <h1 class="titulo">Remover Produto</h1>


        <form @submit.prevent="removerProduto" class="admin-card">
            <div class="input-group">
                <label>ID do Produto</label>
                <input v-model="id" placeholder="ID gerado no cadastro" required />
            </div>


            <button type="submit" :disabled="loading" class="btn-submit">
                {{ loading ? 'Removendo...' : 'Remover Produto' }}
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

    input {
        padding: 12px;
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
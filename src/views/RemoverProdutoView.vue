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
    input{
        padding: 12px;
        border: 1px solid var(--color-border-input);
        border-radius: 10px;
        font-size: 1rem;
        outline: none;
    }
</style>
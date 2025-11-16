<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

const props = defineProps({
    mostrarModalCadastro: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['fecharModalCadastro', 'abrirLogin'])

const auth = useAuthStore()

const tipoPessoa = ref('fisica')
const nome = ref('')
const cpf = ref('')
const telefone = ref('')
const email = ref('')
const email2 = ref('')
const senha = ref('')
const senha2 = ref('')
const erro = ref('')
const loading = ref(false)

function fecharModalCadastro() {
    emit('fecharModalCadastro')
}

function abrirLogin() {
    fecharModalCadastro()
    emit('abrirLogin')
}

async function cadastrar() {
    erro.value = ''
    if (email.value !== email2.value) {
        erro.value = 'Os e-mails não coincidem.'
        return
    }
    if (senha.value !== senha2.value) {
        erro.value = 'As senhas não coincidem.'
        return
    }

    loading.value = true
    try {
        await auth.cadastrar(email.value, senha.value)
        fecharModalCadastro()
    } catch (e) {
        erro.value = e?.message ?? 'Erro ao cadastrar usuário.'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div v-if="mostrarModalCadastro" class="modal-overlay" @click.self="fecharModalCadastro">
        <div class="modal">
            <button class="fechar" @click="fecharModalCadastro">×</button>

            <h2 class="titulo">Cadastro de novo cliente</h2>

            <div class="tabs">
                <button @click="tipoPessoa = 'fisica'" :class="{ ativo: tipoPessoa === 'fisica' }">
                    Pessoa Física
                </button>
                <!--<button @click="tipoPessoa = 'juridica'" :class="{ ativo: tipoPessoa === 'juridica' }">
                    Pessoa Jurídica
                </button>-->
            </div>

            <h3 class="subtitulo">Dados Pessoais</h3>
            <p class="descricao">Todos os campos obrigatórios</p>

            <form @submit.prevent="cadastrar">
                <input v-model="nome" placeholder="Nome Completo:" required />
                <div class="linha">
                    <input v-model="cpf" type="number" placeholder="CPF:" required />
                    <input v-model="telefone" placeholder="Telefone Celular:" required />
                </div>
                <input v-model="email" type="email" placeholder="E-mail:" required />
                <input v-model="email2" type="email" placeholder="Digite novamente:" required />
                <input v-model="senha" type="password" placeholder="Crie sua Senha de acesso:" required />
                <input v-model="senha2" type="password" placeholder="Digite novamente:" required />

                <p class="termos">
                    Ao continuar você concorda com nossos <a href="#" class="link">termos de uso</a>.
                </p>

                <p v-if="erro" class="erro">{{ erro }}</p>

                <button type="submit" class="botao" :disabled="loading">
                    {{ loading ? 'Cadastrando...' : 'Continuar' }}
                </button>

                <p class="login-voltar">
                    Já tem conta? <a href="#" @click.prevent="abrirLogin">Faça login</a>
                </p>
            </form>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: #fff;
  padding: 2.5rem;
  border-radius: 8px;
  width: 22%;
  text-align: center;
}

.titulo {
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.tabs button {
  flex: 1;
  border: 1px solid #ccc;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 600;
  transition: 0.3s;
}

.tabs button.ativo {
  background: #0185fa;
  color: white;
  border-color: #0185fa;
}

.subtitulo {
  margin-bottom: 0.3rem;
}

.descricao {
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.linha {
  display: flex;
  gap: 0.5rem;
}

.linha input {
  width: 100%;
}

.termos {
  font-size: 0.8rem;
  color: #555;
  margin-top: 0.5rem;
}

.termos .link {
  color: #0185fa;
  font-weight: 600;
}

.erro {
  color: rgb(255, 0, 0);
  font-size: 0.85rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.botao {
  width: 100%;
  padding: 10px;
  background: #0185fa;
  color: white;
  border: none;
  border-radius: 6px;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.3s;
}

.botao:hover {
  background: #0172d1;
}

.fechar {
  position: absolute;
  top: 8px;
  right: 10px;
  border: none;
  background: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: #999;
  transition: 0.2s;
}

.fechar:hover {
  color: #555;
}

.login-voltar {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.login-voltar a {
  color: #0185fa;
  text-decoration: none;
  font-weight: 600;
}

.login-voltar a:hover {
  text-decoration: underline;
}
</style>
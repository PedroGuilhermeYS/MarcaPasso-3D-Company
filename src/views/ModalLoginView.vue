<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    mostrarModal: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['fecharModal'])

const fecharModal = () => {
    emit('fecharModal')
}
</script>

<template>
    <div v-if="mostrarModal" class="modal-overlay" @click.self="fecharModal">
        <div class="modal">
            <h2>Autenticação</h2>

            <div class="campo">
                <input type="text" placeholder="E-mail ou CPF/CNPJ" />
            </div>

            <div class="campo">
                <input type="password" placeholder="Digite sua senha" />
            </div>

            <a href="#" class="link">Esqueci minha senha</a>

            <button class="continuar">Continuar</button>

            <div class="linha-ou">
                <span>---------- ou utilize uma das opções abaixo ----------</span>
            </div>

            <div class="social-login">
                <button class="google">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="18" /> Login com o Google
                </button>
                <button class="facebook">
                    <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" width="18" /> Login com o Facebook
                </button>
            </div>

            <p class="termos">
                Ao continuar você concorda com nossos <a href="#">termos de uso</a>.
            </p>

            <button class="fechar" @click="fecharModal">×</button>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.modal {
    position: relative;
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    width: 380px;
    text-align: center;
}

.modal h2 {
    margin-bottom: 1rem;
}

.campo {
    margin-bottom: 1rem;
}

.campo input {
    justify-content: center;
    width: 90%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.link {
    display: block;
    margin-bottom: 1rem;
    color: #0185fa;
    text-decoration: none;
    font-size: 0.9rem;
}

.continuar {
    width: 100%;
    padding: 10px;
    background: #0185fa;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.linha-ou {
    margin: 1rem 0;
    color: #888;
    font-size: 0.9rem;
}

.social-login {
    display: flex;
    justify-content: space-between;
}

.social-login button {
    width: 48%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.termos {
    font-size: 0.8rem;
    color: #555;
    margin-top: 1rem;
}

.fechar {
    position: absolute;
    top: 5px;
    right: 10px;
    border: none;
    background: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #888;
}
</style>

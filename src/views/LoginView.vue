<script setup>
import { ref } from 'vue'
import ModalLoginView from '@/views/ModalLoginView.vue'
import ModalCadastroView from '@/views/ModalCadastroView.vue'

const mostrarModalLogin = ref(false)
const mostrarModalCadastro = ref(false)

const abrirLogin = () => {
    mostrarModalLogin.value = true
}

const fecharLogin = () => {
    mostrarModalLogin.value = false
}

const abrirCadastro = () => {
    mostrarModalCadastro.value = true
}

const fecharCadastro = () => {
    mostrarModalCadastro.value = false
}

</script>

<template>
    <main>
        <div class="container">
            <div class="yes-registered">
                <h2>Já sou cadastrado</h2>
                <p>Para se autenticar, informe seu e-mail ou CPF/CNPJ</p>
                <button class="button-login" @click="abrirLogin">ENTRAR</button>

                <ModalLoginView :mostrarModalLogin="mostrarModalLogin" @fecharModalLogin="fecharLogin" />
            </div>

            <div class="Essa-barra-que-é-gostar-de-você"></div>

            <div class="not-registered">
                <h2>Ainda não tenho cadastro</h2>
                <p>O cadastro em nossa loja é simples e rápido</p>
                <button class="button-registed" @click="abrirCadastro">CADASTRAR</button>

                <ModalCadastroView :mostrarModalCadastro="mostrarModalCadastro" @fecharModalCadastro="fecharCadastro" />
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    width: 1400px;
    margin: 0 auto;
    font-family: var(--font-family-base);
    font-weight: 300;
}

.container {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    border: 2px solid var(--color-primary);
    border-radius: 20px;
    box-sizing: border-box;
    padding: 10rem 4rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.yes-registered,
.not-registered {
    width: 20rem;
    margin: 0 auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
}

.yes-registered {
    width: 23rem;
}

.Essa-barra-que-é-gostar-de-você {
    border: 2px solid var(--color-primary);
    height: 1;
}

.button-login,
.button-registed {
    width: 12rem;
    padding: 10px;
    border-radius: 6px;
    border-color: transparent;
    color: var(--color-on-primary);
    background-color: var(--color-primary);
}

.button-registed {
    color: var(--color-primary);
    background-color: var(--color-surface);
    border: 2px solid var(--color-primary);
    font-weight: bold;
}

h2 {
    margin-bottom: 1px;
    font-weight: bolder;
}

p {
    margin-top: 0px;
    margin-bottom: 1.5rem;
    line-height: 15px;

}
</style>
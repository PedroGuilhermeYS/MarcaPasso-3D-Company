<script setup>
import UserActionSimples from '@/componentes/UserActionSimples.vue';
import Footer from '@/componentes/Footer.vue';
    import { ref } from 'vue'
    import ModalLoginView from '@/views/ModalLoginView.vue'

    const mostrarModal = ref(false)

    const abrirModal = () => {
        mostrarModal.value = true
    }

    const fecharModal = () => {
        mostrarModal.value = false
    }

</script>

<template>
    <UserActionSimples></UserActionSimples>
    <main>
        <div class="container">
            <div class="yes-registered">
                <h2>Já sou cadastrado</h2>
                <p>Para se autenticar, informe seu e-mail ou CPF/CNPJ</p>
                <button class="button-login" @click="abrirModal">ENTRAR</button>
                <ModalLoginView :mostrarModal="mostrarModal" @fecharModal="fecharModal"/>
            </div>

            <div class="Essa-barra-que-é-gostar-de-você"></div>

            <div class="not-registered">
                <h2>Ainda não tenho cadastro</h2>
                <p>O cadastro em nossa loja é simples e rápido</p>
                <button class="button-registed">ENTRAR</button>
            </div>
        </div>
    </main>
    <Footer></Footer>
    <a href="http://localhost:5173/Produto"><button>ir pra Produto</button></a>
</template>

<style scoped>
    main{
        width: 1400px;
        margin: 0 auto;
        font-family: 'Open Sans';
        font-weight: 300;
    }
    .container{
        width: 100%;
        display: flex;
        gap: 10px;
        justify-content: space-evenly;
        border: 2px solid #0185FA;
        border-radius: 20px;
        box-sizing: border-box;
        padding: 10rem 4rem;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
    .yes-registered, .not-registered{
        width: 20rem;
        margin: 0 auto;
        margin-top: 5rem;
        margin-bottom: 5rem;
    }
    .yes-registered {
        width: 23rem;
    }
    .Essa-barra-que-é-gostar-de-você{
        border: 2px solid #0185FA;
        height: 1;
    }
    .button-login, .button-registed{
        width: 12rem;
        padding: 10px;
        border-radius: 6px;
        border-color: transparent;
        color: white;
        background-color: #0185FA;
        
    }
    .button-registed{
        color: #0185FA;
        background-color: #ffffff;
        border: 2px solid #0185FA;
        font-weight: bold;
    }
    h2{
        margin-bottom: 1px;
        font-weight: bolder;
    }
    p{
        margin-top: 0px;
        margin-bottom: 1.5rem;
        line-height: 15px;
        
    }
</style>
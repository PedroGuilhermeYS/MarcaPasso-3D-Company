<script setup>
import { computed } from 'vue'
import { useCarrinhoStore } from '@/stores/carrinho'
import { useAuthStore } from '@/stores/useAuthStore'
import { formatarPreco } from '@/utils/functionsFull.js'

const carrinho = useCarrinhoStore()
const auth = useAuthStore()

const usuarioLogado = computed(() => auth.usuario)
</script>

<template>
  <main>
    <div class="container">

      <div class="left-buttons">
        <router-link to="/Contatos"><p class="space">Contatos</p></router-link>
        <div class="Essa-barra-que-é-gostar-de-você"></div>
        <p>Quem somos</p>
      </div>

      <div class="right-buttons">
        <div class="login">
          <span class="material-symbols-outlined">person</span>

          <router-link to="/Login">
          <h4 v-if="!usuarioLogado">Entrar/Cadastrar</h4>
          </router-link>

          <router-link to="/Painel">
            <h4 v-if="usuarioLogado">Olá, {{ usuarioLogado.displayName || usuarioLogado.email }}</h4>
          </router-link>
        </div>

        <router-link :to="usuarioLogado ? '/Encomendas' : '/Login'">
          <div class="pedidos">
            <span class="material-symbols-outlined">local_shipping</span>
            <h4>Encomendas</h4>
          </div>
        </router-link>

        <router-link :to="usuarioLogado ? '/Favoritos' : '/Login'">
          <div class="favorito">
          <span class="material-symbols-outlined">favorite</span>
          <h4>Favoritos</h4>
          </div>
        </router-link>

        <router-link :to="usuarioLogado ? '/Carrinho' : '/Login'">
          <div class="carrinho">
          <span class="material-symbols-outlined">shopping_cart</span>
          <h4>{{ formatarPreco(carrinho.total) }}</h4>
          </div>
        </router-link>
      </div>

    </div>
  </main>
</template>


<style scoped>

    main {
        width: 1400px;
        margin: 0 auto;
        background-color: #0185FA;
        font-family: "Open Sans";
    }
    .container{
        align-items: center;
        margin-bottom: 1rem;
    }
    .container, .left-buttons, .right-buttons{
        display: flex;
        justify-content: space-between;
    }
    p{
        color: white;
        font-family: "Open Sans";
        font-weight: 600;
        cursor: pointer;
    }
    h4{
        color: black;
        font-family: "Open Sans";
        font-weight: 700;
        font-style: italic;
        cursor: pointer;
    }
    .space{
        margin-left: 20px;
    }
    .Essa-barra-que-é-gostar-de-você{
        border: 1px solid #ffffff;
        margin: 10px;
    }
    .right-buttons h4{
        margin: 5px;
    }
    .login, .pedidos, .favorito, .carrinho{
        border: 2px solid #0185FA;
        background-color: white;
        border-radius: 20px;
        padding: 1px 10px;
        display: flex;
        align-items: center;
    }
    .material-symbols-outlined {
        font-variation-settings: 
        'FILL' 0,
        'wght' 300,
        'GRAD' 0,
        'opsz' 24;
        margin-top: 5px;
        font-size: 20px;
        color: #0185FA;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
</style>
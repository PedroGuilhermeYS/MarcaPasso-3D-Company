<script setup>
import { computed } from 'vue'
import { useCarrinhoStore } from '@/stores/useCarrinhoStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { formatarPreco } from '@/utils/functionsFull.js'

const carrinho = useCarrinhoStore()
const auth = useAuthStore()

const usuarioLogado = computed(() => auth.usuario)

  const funcionario = "pedro210905@gmail.com"

  const acessar = computed(() => {
    return usuarioLogado.value?.email === funcionario
  })
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

        <div class="crud" v-if="acessar">
          <span></span>

          <router-link :to="{ name: 'Crud' }">
            <h4>Admin</h4>
          </router-link>
        </div>

        <div class="login">
          <span class="material-symbols-outlined">person</span>

          <router-link :to="{ name: 'Login' }">
          <h4 v-if="!usuarioLogado">Entrar/Cadastrar</h4>
          </router-link>

          <router-link :to="{ name: 'PainelUsuario' }">
            <h4 v-if="usuarioLogado">Olá, {{ usuarioLogado.displayName || usuarioLogado.email }}</h4>
          </router-link>
        </div>

        <router-link :to="{ name: 'Encomendas' }">
          <div class="pedidos">
            <span class="material-symbols-outlined">local_shipping</span>
            <h4>Encomendas</h4>
          </div>
        </router-link>

        <router-link :to="{ name: 'Favoritos' }">
          <div class="favorito">
          <span class="material-symbols-outlined">favorite</span>
          <h4>Favoritos</h4>
          </div>
        </router-link>

        <router-link :to="{ name: 'Carrinho' }">
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
        background-color: var(--color-primary);
        font-family: var(--font-family-base);
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
        color: var(--color-on-primary);
        font-family: var(--font-family-base);
        font-weight: 600;
        cursor: pointer;
    }
    h4{
        color: var(--color-text);
        font-family: var(--font-family-base);
        font-weight: 700;
        font-style: italic;
        cursor: pointer;
    }

    .space{
        margin-left: 20px;
    }
    .Essa-barra-que-é-gostar-de-você{
        border: 1px solid var(--color-on-primary);
        margin: 10px;
    }

    .right-buttons h4{
        margin: 5px;
    }
    .crud, .login, .pedidos, .favorito, .carrinho{
        border: 2px solid var(--color-primary);
        background-color: var(--color-surface);
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
        color: var(--color-primary);
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>
<script setup>
  import { useCarrinhoStore } from '@/stores/carrinho';
  
  const carrinho = useCarrinhoStore()
  
</script>

<template>
  <main>
    <div class="container">

      <div class="left-buttons">
        <a href="http://localhost:5173/Contatos">
          <p class="space">Contatos</p>
        </a>
        <div class="Essa-barra-que-é-gostar-de-você"></div>
        <p>Quem somos</p>
      </div>

      <div class="right-buttons">
        
        <div class="login">
          <span class="material-symbols-outlined">person</span>
          <a href="http://localhost:5173/Login">
            <h4>Minha Conta</h4>
          </a>
        </div>

        <div class="pedidos">
          <span class="material-symbols-outlined">local_shipping</span>
          <h4>""Em criação""</h4>
        </div>

        <div class="favorito">
          <span class="material-symbols-outlined">favorite</span>
          <h4>""Em criação""</h4>
        </div>

        <div class="carrinho">
          <router-link to="/Carrinho"><span class="material-symbols-outlined">shopping_cart</span></router-link>
          <router-link to="/Carrinho"><h4>R$ {{ carrinho.total.toFixed(2) }}</h4></router-link>
        </div>

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
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
        font-size: 20px;
        color: #0185FA;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
</style>
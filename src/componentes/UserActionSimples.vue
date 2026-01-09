<script setup>
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
        text-align: center;
        margin-bottom: 1rem;
    }
    .container, .left-buttons{
        display: flex;
        justify-content: center;
    }
    p{
        color: var(--color-on-primary);
        font-family: var(--font-family-base);
        font-weight: 600;
        cursor: pointer;
    }
    .space{
        margin-left: 20px;
    }
    .Essa-barra-que-é-gostar-de-você{
        border: 1px solid var(--color-on-primary);
        margin: 10px;
    }  
    a {
        text-decoration: none;
        color: inherit;
    }
</style>
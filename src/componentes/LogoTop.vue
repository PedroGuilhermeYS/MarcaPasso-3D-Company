<script setup>
</script>

<template>
  <main>
    <div class="container">
      <router-link to="/">
        <img src="@/img/marcapasso-logo.svg" alt="logo">
      </router-link>
    </div>
  </main>
</template>

<style scoped>
    main {
        font-family: "Open Sans";
    }
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img {
        margin-right: 1.5rem;
    }
</style>
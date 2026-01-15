<script setup>
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();

// const editarDados = () => {
  // alert('Função de edição ainda será implementada.');
// };

const sair = async () => {
  await authStore.logout();
  window.location.href = '/';
};

const irParaLoja = () => {
  window.location.href = '/';
};
</script>

<template>
  <main>
    <div class="container">
      <div class="dados-pessoais">
        <h1>Minha conta</h1>
        <!-- <h3>Dados pessoais <span @click="editarDados" class="editar">Editar</span></h3> -->

        <div class="info">
          <p><strong>Nome:</strong> Pedro Guilherme</p>
          <p><strong>E-mail:</strong> pedro210905@gmail.com</p>
          <p><strong>Telefone:</strong> 81997076382</p>
        </div>

        <button class="sair" @click="sair">Sair</button>
      </div>

      <div class="painel-compra">
        <img src="@\img\reshot-icon-shopping-cart-WFDT3CVZMJ.svg" alt="Carrinho" class="cart-icon"/>
        <p>Realize sua primeira compra!</p>
        <button class="btn-loja" @click="irParaLoja">Ir para a loja</button>
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
  justify-content: space-between;
  align-items: flex-start;
  border: 2px solid var(--color-primary);
  border-radius: 20px;
  padding: 6rem 4rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  box-sizing: border-box;
}

.dados-pessoais {
  width: 40%;
  margin-left: 16rem;
}

.dados-pessoais h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.dados-pessoais h3 {
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.editar {
  color: var(--color-primary);
  cursor: pointer;
  font-weight: 600;
  margin-left: 1rem;
  text-decoration: underline;
}

.info {
  margin-top: 1rem;
  line-height: 1.8rem;
  font-size: 1rem;
}

.sair {
  margin-top: 2rem;
  background-color: transparent;
  color: var(--color-primary);
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.painel-compra {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.5rem;
  margin-right: 10rem;
}

.cart-icon {
  width: 5rem;
  margin-bottom: 1rem;
}

.painel-compra p {
  margin-bottom: 1rem;
  font-size: 1rem;
}

.btn-loja {
  background-color: var(--color-ink);
  color: var(--color-on-primary);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
}

.btn-loja:hover {
  background-color: var(--color-primary);
  transition: 0.3s;
}
</style>

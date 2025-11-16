<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-columnn logo">
        <a href="http://localhost:5173/">
          <router-link to="/"><img src="@\img\marcapasso-logo.svg" alt="logo" width="300"/></router-link>
        </a>
      </div>

      <div class="footer-column">
        <h4>Departamentos</h4>
        <ul>
          <li>Home</li>
          <li>Contato</li>
          <li>Quem Somos</li>
          <li>Trocas e Devoluções</li>
          <li>Políticas de Privacidade</li>
          <li>Dicas de Necessidade</li>
        </ul>
      </div>

      <div class="footer-column atendimento">
        <h4>Atendimento</h4>
        <h4>Fale no whatsapp</h4>
        <p><i class="bi bi-whatsapp"></i>81997076382</p>
        <hr>
        <h4>Envie um e-mail</h4>
        <p><span class="material-symbols-outlined">mail</span> MarcaPasso@company.com</p>
        <hr>
        <p class="horario">
          <strong>Horário de Atendimento</strong><br />
          Segunda à Sexta das 9:30h às 19h e Sábado das 9:30h às 13h
        </p>
      </div>

      <div class="footer-column">
        <h4>Formas de Pagamento</h4>
        <div class="pagamentos">
          <img src="@\img\pix.png" alt="Pix" />
          <img src="@\img\c5.png" alt="Elo" />
          <img src="@\img\c4.png" alt="Bradesco" /><br>
          <img src="@\img\c1.png" alt="Visa" />
          <img src="@\img\c3.png" alt="American Express" />
          <img src="@\img\c2.png" alt="Mastercard" />
        </div>

        <h4>Selos de Segurança</h4>
        <img src="@\img\selos.png" alt="Google Safe" class="selo" />
      </div>
    </div>

    <div class="footer-bottom">
      <p>
        MarcaPasso 3D Company CNPJ 33.210.687/0009-89 - Visite nosso Instagram
        <strong>@MarcaPasso3DCompany</strong>
      </p>
    </div>
  </footer>
</template>

<style scoped>
    .footer {
        background-color: rgb(255, 255, 255);
        font-family: "Open Sans", sans-serif;
        color: #000;
        border-top: 1px solid #ccc;
        font-size: 14px;
        width: 1400px;
        margin: 0 auto;
    }
    .footer-top {
        display: flex;
        padding: 2rem;
        justify-content: center;
    }
    .footer-column {
        align-items: center;
        margin: 1rem;
    }
    .footer-column h4 {
        margin-bottom: 0.5rem;
        font-size: 16px;
    }
    .footer-column ul {
        list-style: none;
        padding: 0;
        margin: 5;
    }
    .footer-column ul li {
        margin-bottom: 0.3rem;
        cursor: pointer;
    }
    .footer-columnn img{
        margin: 2rem;
    }
    .atendimento p {
        margin: 0.5rem 0;
    }
    .pagamentos img {
        height: 24px;
        margin: 5px;
    }
    .selo {
        height: 32px;
        margin-top: 10px;
    }
    .footer-bottom {
        border-top: 1px solid #999;
        padding: 1rem;
        text-align: center;
    }
    .material-symbols-outlined {
        font-variation-settings: 
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
        font-size: 20px;
    } 
    h4{
        margin: 0;
    }
    a{
        text-decoration: none;
        color: inherit;
      }

</style>
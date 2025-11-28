<script setup>
import LogoTop from '@/componentes/LogoTop.vue';
import UserAction from '@/componentes/UserAction.vue';
import Footer from '@/componentes/Footer.vue';
</script>

<template>
    <LogoTop></LogoTop>
    <UserAction></UserAction>
    <main>
        <div class="container">
            <div class="mini-msg">
                <h2>Fale conosco</h2>
                <h4>Precisa falar com a gente? Utilize uma das opções abaixo para entrar em contato conosco.</h4>
            </div>
            
            <hr>

            <div class="contacts">
                <div class="forms">
                    <form id="contato-form" @submit.prevent="handleSubmit">
                        <h2>Formulário de Contato</h2>
                        <h4>Campos marcados com barra são de preenchimento obrigatório.</h4>

                        <label for="nome">*Nome:</label>
                        <input type="text" name="nome" id="nome">

                        <label for="email">*E-mail:</label>
                        <input type="email" name="email" id="email">

                        <label for="telefone">Telefone:</label>
                        <input type="tel" name="telefone" id="telefone">

                        <label for="assunto">*Assunto:</label>
                        <input type="text" name="assunto" id="assunto">

                        <label for="texto">*Mensagem:</label>
                        <textarea name="texto" id="texto" rows="10" cols="100"></textarea>
                    </form>
                </div>

                <div class="infor">
                    <h3>Central de Atendimento ao Cliente</h3>
                    <p>(81) 99707-6382</p>
                    <p>(81) 99707-6382</p>

                    <hr>

                    <h3>Horário de Atendimento</h3>
                    <p>Atendimento ao cliente por whatsapp ou e-mail de 
                    Seg a Sex das 8h às 17h. Atendimento de 
                    Suporte Técnico somente com hora marcada.</p>

                    <hr>

                    <h3>E-mail</h3>
                    <p>Entre em contato conosco através do e-mail 
                    MarcaPasso@company.com</p>

                    <hr>

                    <h3>Dados da Empresa</h3>
                    <p>MarcaPasso 3D Company CNPJ</p> 
                    <p>33.210.687/0009-89</p>

                    <hr>

                    <h3>Nosso Endereço</h3>
                    <p>MarcaPasso 3D Company</p>
                    <p>Rua São José, 214</p>
                    <p>Joaquim Nabuco - PE</p>
                    <p>CEP: 55535-000</p>
                </div>
            </div>

            <div class="button">
                <button type="submit" form="contato-form">ENVIAR</button>
            </div>
        </div>
    </main>
    <Footer></Footer>
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
        border: 2px solid #0185FA;
        border-radius: 20px;
        box-sizing: border-box;
        padding: 4rem 4rem;
        margin-bottom: 3rem;
    }
    .contacts{
        display: flex;
    }
    h2, h3{
        margin-bottom: 10px;
        font-weight: 500;
    }
    p{
        margin-top: 0rem;
        margin-bottom: 0;
        font-size: 1rem;
        font-weight: 400;
    }
    .forms{
        width: 63%;
        margin-right: 10rem;
        flex-shrink: 1;
    }
    .infor{
        width: 30%;
        margin-right: 20px;
        flex-shrink: 0;
    }
    .forms label, .forms input{
        display: block;
        width: 99%;
        margin-bottom: 10px;
    }
    .forms label {
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 5px;
    }  
    .forms textarea{
        width: 100%;        
        max-width: 100%;    
        box-sizing: border-box;
        resize: vertical;
    }
    hr{
        border: none;
        height: 1px;
    }
    .button{
        width: 100%;
        text-align: center;
    }
    button{
        margin-right: 2rem;
        width: 12rem;
        padding: 10px;
        border-radius: 6px;
        border-color: transparent;
        color: white;
        background-color: #0185FA; 
        cursor: pointer;
    }
</style>
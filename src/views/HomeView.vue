<script setup>
import TopMenu from '@/componentes/TopMenu.vue';
import UserAction from '@/componentes/UserAction.vue';
import Footer from '@/componentes/Footer.vue';
</script>

<template>
    <TopMenu></TopMenu>
    <UserAction></UserAction>
    <main> 
        <div class="container">

            <div class="filter">
                <h3 style="margin-left: 10px;" class="MS-Reference"># Filtre sua busca</h3>
                <label for="categorias">
                    <select name="categorias" id="categoria" class="select-filter">
                        <option value="" selected disabled>Categorias</option>
                        <option value="1">Opção 1</option>
                        <option value="2">Opção 2</option>
                        <option value="3">Opção 3</option>
                    </select>
                </label>
                <label for="categorias">
                    <select name="preço" id="preço" class="select-filter">
                        <option value="" selected disabled>Preço</option>
                        <option value="1">Opção 1</option>
                        <option value="2">Opção 2</option>
                        <option value="3">Opção 3</option>
                    </select>
                </label>
                <label for="categorias">
                    <select name="personalizavel" id="personalizavel" class="select-filter">
                        <option value="" selected disabled>Personalizavel</option>
                        <option value="1">Opção 1</option>
                        <option value="2">Opção 2</option>
                        <option value="3">Opção 3</option>
                    </select>
                </label>
                <button class="button-filter">Filtrar</button>
            </div>
            
            <div class="all-products">
                <h2 class="MS-Reference">Todos os produtos</h2>
                <label for="categorias">
                    <h3 class="MS-Reference">Ordenar por:
                        <select name="relevancia" id="relevancia" class="relevance-filter">
                            <option value="" selected disabled>Relevância</option>
                            <option value="1">Opção 1</option>
                            <option value="2">Opção 2</option>
                            <option value="3">Opção 3</option>
                        </select>
                    </h3>
                </label>
            </div>
        </div>

        <div class="information">
            <h3>Boletim Informativo</h3>
            <p>Receba notícias, ofertas e comunicações em seu e-mail!!!</p>
            <form action=""> 
                <input type="text" placeholder="Digite seu nome">
                <input type="text" placeholder="Digite seu e-mail">
                <button type="submit" class="button-register">CADASTRAR</button>
            </form>
        </div>
    </main>
    <Footer></Footer>
    <a href="http://localhost:5173/Login"><button>ir pra login</button></a>
</template>

<style scoped>

    main{
        width: 1400px;
        margin: 0 auto;
        font-family: 'Open Sans';
        font-weight: 300;
    }
    .container{
        display: flex;
        align-items: flex-start;
        
    }
    .MS-Reference{
       font-family: "MS Reference Sans Serif", sans-serif;
       font-weight: 200;
    }
    .all-products{
        width: 78%;
        margin: 0 auto;
        border-radius: 20px;
        border: 2px solid #0185FA;
    }
    .all-products h3{
        margin-top: 5px;
        margin-left: 40px;
        font-size: .8rem;
    }
    .all-products h2{
        margin-top: 10px;
        margin-left: 50px;
        margin-bottom: 0px;
    }
    .relevance-filter{
        padding: 5px;
        border-radius: 20px;
        width: 140px;
        font-size: .8rem;
        background-color: #D2D2D2;
        border: none;
    }
    .filter{
        width: 250px;
        height: 300px;
        border-radius: 20px;
        border: 2px solid #0185FA;
    }
    .filter h3{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    
    .select-filter{
        width: 230px;
        padding: 5px;
        border-radius: 20px;
        border-color: #0185FA;
        margin-left: 10px;
        margin-bottom: 5px;
    }
    .button-filter{
        width: 130px;
        padding: 5px;
        border-radius: 20px;
        color: white;
        background-color: #0185FA;
        border-color: transparent;
        margin-top: 5px;
        margin-left: 10px;
    }
    .information{
        box-sizing: border-box;
        padding: 10px;
        margin-top: 30px;
        background-color: #DDDDDD;
        text-align: center;
        margin-bottom: 3rem;
    }
    .information p{
        margin: 0px;
        margin-bottom: 20px;
        line-height: 15px;
    }
    .information h3{
        margin: 0px;
    }
    input{
        border: none;
        border-radius: 3px;
        padding: 5px;
        margin-left: 10px;
        width: 10rem;
    }
    input::placeholder{
        color: #D2D2D2;
    }
    .button-register{
        width: 130px;
        padding: 3px;
        border-radius: 3px;
        border-color: transparent;
        color: white;
        background-color: #0185FA;
        margin-left: 10px;
    }
    
</style>
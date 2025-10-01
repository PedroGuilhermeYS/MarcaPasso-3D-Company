<script setup>
</script>

<template>
    <main>
        <h3>Home / Decorações / Suporte de Vinho Dragão Chinês</h3>
        <div class="container1">

            <div class="photos">
                <div class="atual">
                    <img src="" alt="teste" width="600" height="700">
                </div>
                <div class="outrasimg">
                    <img src="" alt="teste" width="90" height="110">
                </div>
            </div>

            <div class="market">
                <div class="text">
                    <div class="justify">
                        <h2 class="name">Suporte de vinho Dragão Chinês</h2>

                        <!-- script para estrelas de icone -->
                        <h6 class="sla">*****</h6>
                        <h6 class="sla2">Seja o primeiro a opinar</h6>

                        <h2 class="price">R$ 24,99</h2>
                        <h5 class="juros">ou 2x Sem juros</h5>
                        <div class="sub-container">
                            <!-- script para botão de quantidade-->
                            <button class="quantid">1</button>
                            <button class="cart"># Adicionar ao carrinho</button>
                        </div>
                    </div>
                    <h6 class="aviso">Aqui sua compra é 100% segura, compre com tranquilidade.</h6>
                </div>
            </div>
        </div>

        <div class="modais">
            <div class="descricao">
                <h2>Descrição geral</h2>
            </div>
            <div class="avaliacao">
                <h2>Avaliações</h2>
            </div>
        </div>
        <div class="container2">
            <div class="describe">
                <h2>descrição
                </h2>
            </div>

        </div>
        <a href="http://localhost:5173/Carrinho"><button>ir pra Produto</button></a>
    </main>
</template>

<style scoped>
    main{
        width: 1400px;
        margin: 0 auto;
        font-family: 'Open Sans';
        font-weight: 300;
    }
    .container1{
        width: 100%;
        display: flex;
        gap: 2.9rem;
        justify-content: space-evenly;
        align-items: flex-start;
        padding: 0rem 0rem;
        margin-bottom: 2rem;
    }
    .photos{
        width: 60rem;
        height: 60rem;
        border-radius: 20px;
        border: 2px solid #0185FA;
        text-align: center;
    }
    .atual{
        margin-top: 3rem;
        margin-bottom: 2rem;
    }
    img{
        margin-right: 10px;
        margin-left: 10px;
    }
    .market{
        width: 26rem;
        border-radius: 20px;
        border: 2px solid #0185FA;
        text-align: center;
        padding: 3rem 0rem;
    }
    .justify{
        text-align: left;
        margin-left: 3rem;
        margin-right: 3rem;
    }
    .name, .sla2{
        margin: 0; 
    }
    .price{
        margin-bottom: 0;
    }
    .juros{
        margin-top: 0;
    }
    .sla{
        margin-top: 20px;
        margin-bottom: 0;
    }
    .aviso{
        margin-top: 10px;
        margin-left: 3rem;
        margin-right: 3rem;
    }
    .cart{
        width: 12rem;
        padding: 10px;
        border-radius: 6px;
        border-color: transparent;
        color: white;
        background-color: #0185FA;
    }
    .quantid{
        width: 4rem;
        padding: 10px;
        border-radius: 6px;
        margin-right: 10px;
    }
    .container2{
        width: 99.7%;
        display: flex;
        justify-content: left;
        border: 2px solid #0185FA;
        padding: 2rem 0rem;
        margin-bottom: 2rem;
    }
    .modais{
        width: 100%;
        justify-content: center;
        display: flex;
        gap: 1rem;
    }
    .describe{
        margin-left: 2rem;
        margin-right: 2rem;
    }
</style>
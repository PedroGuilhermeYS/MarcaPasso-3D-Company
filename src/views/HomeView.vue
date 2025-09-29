<script setup></script>

<template>
    <body>
        <div class="container">

            <div class="filter">
                <h3 style="margin-left: 10px;"># Filtre sua busca</h3>
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
                <h2>Todos os produtos</h2>
                <label for="categorias">
                    <h3>Ordenar por:
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
    </body>
</template>
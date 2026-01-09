<template>
    <div class="information">
        <h3>Boletim Informativo</h3>
        <p>Receba notícias, ofertas e comunicações em seu e-mail!!!</p>
        <form action=""> 
            <input type="text" placeholder="Digite seu nome" required>
            <input type="email" placeholder="Digite seu e-mail" required>
            <button type="submit" class="button-register">CADASTRAR</button>
        </form>
    </div>
</template>

<style scoped>
    .information{
        box-sizing: border-box;
        padding: 10px;
        margin-top: 30px;
        background-color: var(--color-bg-light);
        text-align: center;
        margin-bottom: 3rem;
    }
    .information h3{
        margin: 0px;
    }
    .information p{
        margin: 0px;
        margin-bottom: 20px;
        line-height: 15px;
    }
    input{
        border: none;
        border-radius: 3px;
        padding: 5px;
        margin-left: 10px;
        width: 10rem;
    }
    input::placeholder{
        color: var(--color-bg-light-2);
    }
    .button-register{
        width: 130px;
        padding: 3px;
        border-radius: 3px;
        border-color: transparent;
        color: var(--color-on-primary);
        background-color: var(--color-primary);
        margin-left: 10px;
    }
</style>
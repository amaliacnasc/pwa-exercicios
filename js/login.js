
document.addEventListener('DOMContentLoaded', () => {
   
    const botao = document.querySelector('#botao');

    if (botao) {
        botao.addEventListener('click', clicou);
    } else {
        console.error('Elemento com ID "botao" não encontrado.');
    }

    async function clicou(event) {
        event.preventDefault();
        try {
            const userName = document.querySelector('#userName').value;
            const password = document.querySelector('#password').value;
            console.log(userName, password);

            const response = await fetch('https://api-exercicios.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, password })
            
            });

            const resposta = await response.json(); // pegando o token e o id do usuario 

            localStorage.setItem("token", resposta.token); 
            localStorage.setItem("userId", resposta.id);
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
        }
    }
});

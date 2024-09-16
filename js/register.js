

async function clicou (){

    try {
        const userName = document.querySelector('#userName').value;
        const password = document.querySelector('#password').value;     

       console.log({ userName, password }); // Verifica os valores capturados
        const response = await fetch('https://api-exercicios.onrender.com/api/auth/register', { // Certifique-se de que a rota da API está correta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({ userName, password })
            
        });
    
        if (response.ok) {
           form.reset();
           alert('usuário registrado com sucesso');
        } else {
            console.error('Erro ao adicionar usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar com a API:', error);
    }
    
}; 


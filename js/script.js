document.getElementById('form-exercicio').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const exerciseName = document.getElementById('exerciseName').value;
    const description = document.getElementById('description').value;
    const duration = document.getElementById('duration').value;
    const photoInput = document.getElementById('photo').files[0]; // Obtém o arquivo
    const user = localStorage.getItem('userId'); // ID do usuário salvo no localStorage

    try {
        // Converte a imagem para base64
        const photo = await convertImageToBase64(photoInput);

        const response = await fetch('https://api-exercicios.onrender.com/api/exercises/', { // Ajuste a URL conforme necessário
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ exerciseName, description, duration, photo, user })
        });

        if (response.ok) {
            console.log('Exercício adicionado com sucesso');
            document.getElementById('form-exercicio').reset();
            fetchExercises(); // Atualiza a lista de exercícios
        } else {
            console.error('Erro ao adicionar exercício:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao conectar com a API:', error);
    }
});

// Função para converter imagem em base64
 function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result); // Retorna a imagem em base64
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Função para buscar exercícios da API e exibir na página
async function fetchExercises() {
    try {
        const response = await fetch('http://localhost:3000/api/exercises/'); // Ajuste a URL conforme necessário
        if (!response.ok) {
            throw new Error('Erro ao buscar exercícios');
        }
        const exercises = await response.json();
        const list = document.getElementById('exercise-list');
        list.innerHTML = '';
        exercises.forEach(p => {
            const item = document.createElement('div');
            item.innerHTML = `
                <h3>${p.exerciseName}</h3>
                <p>${p.description}</p>
                <p>${p.duration} minutos</p>
                <img src="${p.photo}" alt="${p.exerciseName}" style="max-width: 100%; height: auto;">
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao carregar exercícios:', error);
    }
}

// Inicializa a busca dos exercícios quando a página carregar
fetchExercises();

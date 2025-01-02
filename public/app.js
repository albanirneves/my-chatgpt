document.getElementById('user-message').addEventListener('keypress', function(event) {
    // Verifica se a tecla pressionada é 'Enter' e não a tecla Shift
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Impede a quebra de linha ao pressionar Enter
        sendMessage(); // Chama a função para enviar a mensagem
    }
});

let started = false;

async function sendMessage() {
    const userMessage = document.getElementById('user-message').value;
    if (!userMessage) return;

    // Adiciona a mensagem do usuário no chat
    addMessageToChat(userMessage, 'user');

    // Limpa o campo de entrada
    document.getElementById('user-message').value = '';

    try {
        // Faz a requisição à API do ChatGPT
        const response = await fetch(`${location.origin}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: userMessage,
                started: started
            }),
        });

        const data = await response.json();
        const chatGPTMessage = data.response;
        const sessionPrice = data.sessionPrice
        
        // Adiciona a resposta do ChatGPT no chat
        addMessageToChat(chatGPTMessage, 'chatgpt');
        updatePricing(sessionPrice);

        started = true;
    } catch (error) {
        console.error('Erro ao chamar a API:', error);
    }
}

function addMessageToChat(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender;
    messageDiv.textContent = message;

    // Se for uma mensagem do ChatGPT, adiciona a classe 'chatgpt' para aplicar o estilo azul
    if (sender === 'chatgpt') {
        messageDiv.classList.add('chatgpt');
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Rola para a última mensagem
}

function updatePricing(pricing) {
    const pricingBox = document.getElementById('pricing-box');
    pricingBox.textContent = `$${pricing.toFixed(2)}`;
}

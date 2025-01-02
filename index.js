const { readFile } = require('fs/promises');
const { existsSync } = require('fs');
const express = require('express');
const OpenAI = require('openai');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
    const { prompt, started } = req.body;
    try {
        const response = await generateNextMessage({ lastMessage: prompt, started });
        res.json(response);
    } catch (error) {
        console.error('Erro ao chamar a API:', error);
        res.status(500).send('Erro interno no servidor');
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

let messages = [];
let sessionPrice = 0;

async function generateNextMessage({ lastMessage, started }) {
    try {
        if(!started) {
            sessionPrice = 0;

            if(existsSync('instructions.txt')) {
                const instructions = await readFile('instructions.txt', 'utf8');

                messages.push({
                    role: 'system',
                    content: instructions
                });
            }

        if (!lastMessage) {
            return 'Não entendi, pode repetir ou digitar novamente?'
        }

        messages.push({
            role: 'user',
            content: lastMessage
        });

        const chatResponse = await openAI.chat.completions.create({
            model: process.env.MODEL,
            temperature: process.env.TEMPERATURE,
            messages: messages
        });

        const inputPricing = process.env.INPUT_PRICE * chatResponse.usage.prompt_tokens / 1000000;
        const outputPricing = process.env.OUTPUT_PRICE * chatResponse.usage.completion_tokens / 1000000;
        
        sessionPrice += inputPricing + outputPricing;
      
        const response = chatResponse?.choices[0].message.content;

        if(!response) {
            return 'Não entendi, pode repetir ou digitar novamente?';
        }

        messages.push({
            role: 'assistant',
            content: response
        });

        return { response, sessionPrice };

    } catch (error) {
        console.error('Erro ao processar a mensagem:', error)
        return 'Houve um erro ao processar a mensagem. Aguarde alguns instantes e tente novamente.';
    }
}
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
}


async function chat(messages: Message[]): Promise<string> {
    const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "qwen3:8b",
            messages,
            stream: false,
        }),
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();

    return data.message.content;
}

const rl = readline.createInterface({
    input,
    output
});

console.log(`
Local AI
Model: qwen3:8b

Type /exit to quit.
`);

const messages: Message[] = [
  {
    role: "system",
    content: "Sei un assistente AI utile e conciso. Rispondi in italiano.",
  },
];

while(true) {
    const message = await rl.question('You >: ');
    if (message.trim() === '/exit') {
        console.log("\nBye!");
        rl.close();
        break;
    }

    // 1. Salviamo PRIMA il messaggio dell'utente
    messages.push({
        role: "user",
        content: message,
    });

    try {
        // 2. Inviamo tutta la cronologia a Ollama
        const answer = await chat(messages);
        
        // 3. Salviamo la risposta dell'AI`
        messages.push({
            role: "assistant",
            content: answer,
        });

        // 4. Mostriamo la risposta
        console.log(`\nAI > ${answer}\n`);
    } catch (error) {
        console.error("\nErrore durante la comunicazione con Ollama:", error);
    }

}
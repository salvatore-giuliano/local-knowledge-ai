import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

type Message = {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

type OllamaChatResponse = {
    model: string;
    created_at: string;
    message: {
        role: "assistant";
        content: string;
        thinking?: string;
    };
    done: boolean;
    done_reason?: string;
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_cached_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
};


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

    const data = (await response.json()) as OllamaChatResponse;

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
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
        continue;
    }

    if (trimmedMessage === '/exit') {
        console.log("\nBye!");
        rl.close();
        break;
    }

    if (trimmedMessage === "/help") {
        console.log(`
            Available commands:

            /help      Show available commands
            /history   Show conversation history
            /clear     Clear conversation
            /exit      Exit the application
        `);

        continue;
    }

    if (trimmedMessage === "/history") {
        console.log("\nConversation history:");
        for (const item of messages) {
            if (item.role === 'system') {
                continue;
            }

            const label = item.role === 'user' ? 'You' : 'Assistant';
            console.log(`${label}: ${item.content}`);
        }

        continue;
    }

    if (trimmedMessage === "/clear") {
        messages.splice(1);
        console.log("Conversation cleared.\n");
        continue;
    }

    // 1. Salviamo PRIMA il messaggio dell'utente
    messages.push({
        role: "user",
        content: trimmedMessage,
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
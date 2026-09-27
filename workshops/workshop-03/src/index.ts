import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { chatStream } from "./ollama.js";
import {
  clearConversationHistory,
  showHelp,
  showHistory,
} from "./commnds.js";
import type { Message } from "./types.js";

const rl = readline.createInterface({
    input,
    output
});

const messages: Message[] = [
  {
    role: "system",
    content: "Sei un assistente AI utile e conciso. Rispondi in italiano.",
  },
];

console.log(`
Local AI
Model: qwen3:8b

Type /help for commands.
`);


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
        showHelp();
        continue;
    }

    if (trimmedMessage === "/history") {
       showHistory(messages);
       continue;
    }

    if (trimmedMessage === "/clear") {
        clearConversationHistory(messages);
        continue;
    }

    // 1. Salviamo PRIMA il messaggio dell'utente
    messages.push({
        role: "user",
        content: trimmedMessage,
    });

    try {
        // 2. Inviamo tutta la cronologia a Ollama
        const answer = await chatStream(messages);
        
        // 3. Salviamo la risposta dell'AI`
        messages.push({
            role: "assistant",
            content: answer,
        });

        // 4. Mostriamo la risposta
        //console.log(`\nAI > ${answer}\n`);
    } catch (error) {
        console.error("\nErrore durante la comunicazione con Ollama:", error);
    }

}
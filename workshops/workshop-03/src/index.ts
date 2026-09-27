import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { chatStream } from "./ollama.js";
import {
  clearConversationHistory,
  showHelp,
  showHistory,
} from "./commnds.js";
import type { Message } from "./types.js";
import { config } from "./config.js";

const rl = readline.createInterface({
    input,
    output
});

rl.on("SIGINT", () => {
  console.log("\n\nBye!");
  rl.close();
  process.exit(0);
});

const messages: Message[] = [
  {
    role: "system",
    content: config.systemPrompt,
  },
];

console.log(`
Local AI
Model: ${config.model}

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
        if (error instanceof Error) {
            console.error(`\nError: ${error.message}\n`);
        } else {
            console.error("\nUnknown error while communicating with Ollama.\n");
        }
    }
}
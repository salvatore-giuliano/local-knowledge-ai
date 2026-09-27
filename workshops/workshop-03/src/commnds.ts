import type { Message } from "./types.js";

export function showHelp() {
    console.log(`
Available commands:

/help      Show available commands
/history   Show conversation history
/clear     Clear conversation
/exit      Exit the application
    `);
}

export function showHistory(messages: Message[]) {
    for (const message of messages) {
        if (message.role === 'system') {
            continue;
        }

        const label = message.role === 'user' ? 'You' : 'Assistant';
        console.log(`${label}: ${message.content}`);
    }
}

export function clearConversationHistory(messages: Message[]) {
    messages.splice(1);
    console.log("Conversation cleared.\n");
}
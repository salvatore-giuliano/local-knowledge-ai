export const config = {
    model: "qwen3:8b",
    url: "http://localhost:11434/api/chat",
    systemPrompt: 'Sei un assistente AI utile e conciso. Rispondi in italiano.',
} as const;
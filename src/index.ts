import { OllamaClient } from "./ollama/ollama.client";
const ollama = new OllamaClient();

async function main(){    
    const result = await ollama.generate({
        model: "qwen3:8b",
        prompt: "Spiegami cos'è TypeScript in massimo tre frasi.",
    });
    
    console.log('RESULT: ', result.response);
}

main().catch(console.error);

import type { Message, OllamaChatChunk, OllamaChatResponse } from "./types.js";
import { config } from "./config.js";

export async function chatStream(messages: Message[]): Promise<string> {
    const response = await fetch(config.url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: config.model,
            messages,
            stream: true,
        }),
    });

    if (!response.ok) {
        throw new Error(
            `Ollama request failed: ${response.status} ${response.statusText}`,
        );
    }

    if (!response.body) {
        throw new Error("Ollama response has no body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let answer = "";
    let buffer = "";

    process.stdout.write("AI > ");

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");

        buffer = lines.pop() || "";

        for (const line of lines) {
            if (!line.trim()) continue;

            const data = JSON.parse(line) as OllamaChatChunk;
            const content = data.message.content;

            if (content) {
                answer += content;

                process.stdout.write(content);
            }
        }
    }

    console.log("\n");
    return answer;
}

export async function chat(messages: Message[]): Promise<string> {
    const response = await fetch(config.url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: config.model,
            messages,
            stream: false,
        }),
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
    }

    if (!response.body) {
        throw new Error("Ollama response has no body");
    }

    const data = (await response.json()) as OllamaChatResponse;

    return data.message.content;
}
    
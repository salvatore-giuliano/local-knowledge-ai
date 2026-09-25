import type { OllamaGenerateRequest, OllamaGenerateResponse} from "./ollama.types";

export class OllamaClient {

    constructor(
        private readonly baseUrl: string = 'http://localhost:11434'
    ) {}

    async generate(
        request: OllamaGenerateRequest
    ): Promise<OllamaGenerateResponse>{
        const response = await fetch(`${this.baseUrl}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...request,
                stream: request.stream ?? false,
            }),
        });

        if (!response.ok) {
            throw new Error(`Errore Ollama: ${response.status} ${response.statusText}`);
        }

        return (await response.json()) as OllamaGenerateResponse;
    }
}
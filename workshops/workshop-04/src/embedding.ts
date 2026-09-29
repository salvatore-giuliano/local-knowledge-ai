const OLLAMA_URL = 'http://localhost:11434';
const EMBEDDING_MODEL = 'nomic-embed-text';

type OllamaEmbeddingResponse = {
    model: string;
    embeddings: number[][];
};

export async function createEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`${OLLAMA_URL}/api/embed`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: EMBEDDING_MODEL,
            input: text,
        }),
    });

    if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as OllamaEmbeddingResponse;
    const embedding: number[] = data.embeddings[0];

    if (!embedding || embedding.length === 0) {
        throw new Error("No embedding returned from Ollama");
    }

    return embedding;
}
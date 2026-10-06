import { createEmbedding } from "./embedding.js";
import { cosineSimilarity } from "./similarity.js";

const query = "Come posso creare un database per la mia applicazione"
const documents = [
    "PostgreSQL è un database relazionale open source",
    "Docker permette di eseguire applicazioni dentro container",
    "Next.js è un framework basato su React",
    "Il mio cane ama correre nel parco",
];

const queryEmbedding = await createEmbedding(query);


for (const document of documents) {
    const documentEmbedding = await createEmbedding(document);
    const similarity = cosineSimilarity(queryEmbedding, documentEmbedding);
    console.log(`"${document}"`);
    console.log("Similarity:", similarity);
    console.log();
}
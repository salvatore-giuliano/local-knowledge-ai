import { createEmbedding } from "./embedding.js";
import { cosineSimilarity } from "./similarity.js";

const textA = "il cane corre nel parco";
const textB = "Un animale sta correndo all'aperto";
const textC = "PostgreSQL è un database relazionale";

const embeddingA = await createEmbedding(textA);
const embeddingB = await createEmbedding(textB);
const embeddingC = await createEmbedding(textC);

const similarityAB = cosineSimilarity(embeddingA, embeddingB);
const similarityAC = cosineSimilarity(embeddingA, embeddingC);

console.log(`"${textA}"`);
console.log(`vs`);
console.log(`"${textB}"`);
console.log("Similarity:", similarityAB);

console.log();

console.log(`"${textA}"`);
console.log(`vs`);
console.log(`"${textC}"`);
console.log("Similarity:", similarityAC);
import { createEmbedding } from "./embedding.js";

const text = "il cane corre nel parco";

const embedding = await createEmbedding(text);

console.log("Testo:", text);
console.log("Dimensioni:", embedding.length);
console.log("Prime 10 dimensioni:", embedding.slice(0, 10));
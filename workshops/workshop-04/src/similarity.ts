export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
        throw new Error("Vectors must have the same length");
    }

    let dotProduct: number = 0;
    let magnitudeA: number = 0;
    let magnitudeB: number = 0;

    for (let i = 0; i < vectorA.length; i++) {
        const a: number = vectorA[i];
        const b: number = vectorB[i];

        dotProduct += a * b;
        magnitudeA += a * a;
        magnitudeB += b * b;
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) {
        throw new Error("Magnitude cannot be zero");
    }

    return dotProduct / (magnitudeA * magnitudeB);
}
const prompt = "Inventami un nome per una piattaforma AI che permette di interrogare documenti locali.";

async function ask(temperature: number){
    const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "qwen3:8b",

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],

            stream: false,

            options: {
                temperature,
            },
        }),
    });

    const data = await response.json();
    console.log(`\nTEMPERATURE: ${temperature}`);
    console.log(data.message.content);
}

async function main() {
    await ask(0);  // Risposte conservative, riutilizza conoscenza acquisita
    await ask(0.5); // Buona creatività, mai banale
    await ask(1);   //Estremamente creativo, mai banale
}

main().catch(console.error);
    
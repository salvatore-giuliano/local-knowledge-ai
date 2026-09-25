async function main() {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      model: "qwen3:8b",

      messages: [
        {
          role: "system",
          content: `
            Sei Local Knowledge AI.

            Sei un assistente specializzato nell'analisi dei documenti dell'utente.
            
            Devi rispondere in italiano.
            Devi essere preciso.
            Devi evitare informazioni non supportate.
            Devi spiegare chiaramente le tue risposte.
            Devi distinguere fatti e supposizioni.
            Devi dichiarare quando non possiedi
            informazioni sufficienti.
        `,
        },

        {
          role: "user",
          content: "Chi sei e quale sarà il tuo compito?",
        },
      ],

      stream: false,

      options: {
        temperature: 0.2,
      },
    }),
  });

  const data = await response.json();

  console.log("\n--- CONTENT ---");
  console.log(data.message.content);
  console.log("\n--- TOKEN STATS ---");
  console.log("Prompt tokens:", data.prompt_eval_count);
  console.log("Response tokens:", data.eval_count);
}

main().catch(console.error);
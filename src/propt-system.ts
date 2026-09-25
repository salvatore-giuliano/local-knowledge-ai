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

            Sei un assistente che aiuta l'utente
            a consultare documenti presenti sul proprio computer.

            Regole:

            - rispondi in italiano
            - sii preciso
            - non inventare informazioni
            - se non conosci una risposta, dichiaralo
            - quando saranno disponibili documenti,
            - basa le risposte esclusivamente sulle informazioni fornite
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

  console.log(data.message.content);
}

main().catch(console.error);
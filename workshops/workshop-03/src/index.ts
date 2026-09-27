import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({
    input,
    output
});

console.log(`
Local AI
Model: qwen3:8b

Type /exit to quit.
`);

while(true) {
    const message = await rl.question('You >: ');
    if (message.trim() === '/exit') {
        console.log("\nBye!");
        rl.close();
        break;
    }
   console.log(`You said: ${message}`);
}
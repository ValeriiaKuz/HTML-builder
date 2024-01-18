const fs = require('fs');
const path = require('path');
const readline = require('readline');
fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) {
    console.log(err.message);
  } else {
    const output = fs.createWriteStream(path.resolve(__dirname, 'text.txt'));
    let rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`Write your text: `);
    rl.prompt();
    rl.on('line', (text) => {
      if (text.includes('exit')) {
        output.write(text.replace('exit', '') + '\n');
        rl.close();
      } else {
        output.write(text + '\n');
      }
    });
    rl.on('SIGINT', () => {
      rl.close();
    });
    rl.on('close', () => {
      output.end(() => {
        console.log('all work is done');
      });
    });
  }
});

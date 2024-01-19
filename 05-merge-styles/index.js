const { readdir, readFile } = require('fs/promises');
const path = require('path');
const fs = require('fs');

const stylesPath = path.resolve(__dirname, 'styles');
const bundlePath = path.resolve(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
  try {
    const files = await readdir(stylesPath, {
      withFileTypes: true,
    });
    const output = fs.createWriteStream(bundlePath, { encoding: 'utf-8' });

    for (const file of files) {
      const filePath = path.resolve(__dirname, 'styles', file.name);
      if (file.isFile() && path.extname(filePath) === '.css') {
        const fileValue = await readFile(filePath, { encoding: 'utf-8' });
        output.write(fileValue + '\n');
      }
    }
    output.end();
  } catch (err) {
    console.log(err.message);
  }
}
mergeStyles().catch((err) => console.log(err.message));

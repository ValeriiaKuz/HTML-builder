const { readdir, stat } = require('fs/promises');
const path = require('path');

async function readDirectory() {
  try {
    const files = await readdir(path.resolve(__dirname, 'secret-folder'), {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isFile()) {
        const currentPath = path.resolve(__dirname, 'secret-folder', file.name);
        const baseNameOfFile = path.basename(
          currentPath,
          path.extname(currentPath),
        );
        const extensionOfFile = path.extname(currentPath).replace('.', '');
        const stats = await stat(currentPath);
        const size = stats.size;
        console.log(
          `${baseNameOfFile} - ${extensionOfFile} - ${(size / 1024).toFixed(
            3,
          )}kb`,
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}

readDirectory();

const { readdir, mkdir, rm, copyFile } = require('fs/promises');
const path = require('path');

const sourcePath = path.resolve(__dirname, 'files');
const destinationPath = path.resolve(__dirname, 'files-copy');

async function copyDir(sourcePath, destinationPath) {
  try {
    await rm(destinationPath, { force: true, recursive: true });
    await mkdir(destinationPath, {
      recursive: true,
    });
    const files = await readdir(sourcePath, {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isFile()) {
        await copyFile(
          path.resolve(sourcePath, file.name),
          path.resolve(destinationPath, file.name),
        );
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}
copyDir(sourcePath, destinationPath);

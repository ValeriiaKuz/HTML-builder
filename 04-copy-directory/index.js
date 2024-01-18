const { readdir, mkdir, rm, copyFile } = require('fs/promises');
const path = require('path');

const sourcePath = path.resolve(__dirname, 'files');
const destinationPath = path.resolve(__dirname, 'files-copy');

async function makeDirectory() {
  try {
    return await mkdir(destinationPath, {
      recursive: true,
    });
  } catch (err) {
    console.error(err.message);
  }
}
async function removeFilesFromDir() {
  try {
    return await rm(destinationPath, { force: true, recursive: true });
  } catch (err) {
    console.error(err.message);
  }
}
async function copyFiles() {
  try {
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
    console.error(err.message);
  }
}
removeFilesFromDir().then(() => {
  makeDirectory().then(() => {
    copyFiles().catch((err) => console.log(err.message));
  });
});

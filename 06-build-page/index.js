const { readdir, mkdir, readFile, writeFile } = require('fs/promises');
const path = require('path');
const fs = require('fs');

const destinationPath = path.resolve(__dirname, 'project-dist');
const templatePath = path.resolve(__dirname, 'template.html');
const indexPath = path.resolve(__dirname, 'project-dist', 'index.html');
const componentsPath = path.resolve(__dirname, 'components');

async function makeDirectory(path) {
  try {
    return await mkdir(path, {
      recursive: true,
    });
  } catch (err) {
    console.log(err.message);
  }
}
async function readAndSaveFile(pathForReading, pathForWriting) {
  const output = fs.createWriteStream(pathForWriting, { encoding: 'utf-8' });
  try {
    const fileValue = await readFile(pathForReading, { encoding: 'utf-8' });
    output.write(fileValue);
  } catch (err) {
    console.log(err.message);
  }
  output.close();
}

async function replaceTags() {
  const componentsFiles = await readdir(componentsPath, {
    withFileTypes: true,
  });
  let fileValue = await readFile(indexPath, { encoding: 'utf-8' });

  for (const componentFile of componentsFiles) {
    const currentPath = path.resolve(
      __dirname,
      'components',
      componentFile.name,
    );
    const baseNameOfFile = path.basename(
      currentPath,
      path.extname(currentPath),
    );
    if (componentFile.isFile()) {
      const componentName = baseNameOfFile;
      const componentValue = await readFile(currentPath, 'utf-8');
      fileValue = fileValue.replace(`{{${componentName}}}`, componentValue);
    }
  }
  return fileValue;
}
makeDirectory(destinationPath).then(() => {
  readAndSaveFile(templatePath, indexPath).then(() => {
    replaceTags().then(async (file) => await writeFile(indexPath, file));
  });
});

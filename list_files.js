import fs from 'fs';
import path from 'path';

function listAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (file === 'node_modules' || file === '.git') return;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      listAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log(JSON.stringify(listAllFiles('.'), null, 2));

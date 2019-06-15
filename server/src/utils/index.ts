import fs from 'fs';
import crypto from 'crypto';
import requireContext from 'require-context';

export const requireAll = (path: string, recursive: boolean, regExp: RegExp, filter: any) => {
  const files = requireContext(path, recursive, regExp);
  let filenames = files.keys();

  if (typeof filter === 'function') {
    filenames = filenames.filter(filter);
  }

  const moduleObj: any = {};
  filenames.map( (filename: string) => {
    moduleObj[filename.slice(0, filename.lastIndexOf('.'))]= files(filename);
  });

  return moduleObj;
};

/******************** 文件操作 **************************/
function readFile(path: string, filesList: any[]) {
  const files = fs.readdirSync(path);
  files.forEach(walk);
  function walk(file: string) {
    const states = fs.statSync(path + '/' + file);
    if (states.isDirectory()) {
      readFile(path + '/' + file, filesList);
    } else {
      filesList.push({
        size: states.size,
        name: file,
        path: path + '/' + file,
      });
    }
  }
}

function getDirFiles(path: string) {
  const filesList: File[] = [];
  readFile(path, filesList);
  return filesList;
}

function getFileName(path: string) {
  const pathList = path.split('/');
  const fileName = pathList[pathList.length - 1];
  return fileName;
}

function getFileContent(filePath: string, cb: (e: Error, buf: Buffer) => void) {
  fs.readFile(filePath, (err, buf) => {
    cb(err, buf);
  });
}

function writeFileAsync(filePath: string, text: string, cb: (e: Error) => void) {
  fs.writeFile(filePath, text,err => {
    cb(err);
  });
}

export const fileUtil = {
  getDirFiles,
  getFileName,
  getFileContent,
  writeFileAsync,
  writeFileSync: fs.writeFileSync,
};

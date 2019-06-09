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

const fileUtil = {
  getDirFiles,
  getFileName,
  getFileContent,
  writeFileAsync,
  writeFileSync: fs.writeFileSync,
};
exports.fileUtil = fileUtil;

/******************** 加密解密 **************************/
function sha256(str: string) {
  return crypto
    .createHash('sha256')
    .update(str)
    .digest('hex');
}

function encode(content: Buffer, cryptkey: string) {
  const cipher = crypto.createCipheriv(
    'aes-128-cbc',
    cryptkey,
    '9cd5b4cf89949207',
  );
  const bf = [];
  bf.push(cipher.update(content));
  bf.push(cipher.final());
  return Buffer.concat(bf);
}

function decode(content: Buffer, cryptkey: string) {
  const decipher = crypto.createDecipheriv(
    'aes-128-cbc',
    cryptkey,
    '9cd5b4cf89949207',
  );
  try {
    const a = [];
    a.push(decipher.update(content));
    a.push(decipher.final());
    return Buffer.concat(a);
  } catch (e) {
    console.error('decode error:', e.message);
    return null;
  }
}

function fileCrypto(inFilePath: string, outFilePath: string, secretKey: string, mode: 'encode' | 'decode') {
  fileUtil.getFileContent(inFilePath, (err, content) => {
    if (err) {
      console.error('get file error:', err);
      return null;
    }
    fileUtil.writeFileSync(outFilePath, cryptoUtil[mode](content, secretKey));
  });
}

const encodeFile = (inFilePath: string, outFilePath: string, secretKey: string) =>
fileCrypto(inFilePath, outFilePath, secretKey, 'encode');
const decodeFile = (inFilePath: string, outFilePath: string, secretKey: string ) =>
fileCrypto(inFilePath, outFilePath, secretKey, 'decode');

export const cryptoUtil = {
  sha256,
  encode,
  decode,
  encodeFile,
  decodeFile,
};

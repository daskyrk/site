const fs = require('fs');
const crypto = require('crypto');
const requireContext = require('require-context');

exports.requireAll = function(path, recursive, regExp, filter) {
  const files = requireContext(path, recursive, regExp);
  let filenames = files.keys();

  if (typeof filter === 'function') {
    filenames = filenames.filter(filter);
  }

  const moduleObj = {};
  filenames.map(
    filename =>
      (moduleObj[filename.slice(0, filename.lastIndexOf('.'))] = files(
        filename,
      )),
  );

  return moduleObj;
};

/******************** 文件操作 **************************/
function readFile(path, filesList) {
  files = fs.readdirSync(path);
  files.forEach(walk);
  function walk(file) {
    states = fs.statSync(path + '/' + file);
    if (states.isDirectory()) {
      readFile(path + '/' + file, filesList);
    } else {
      const obj = new Object();
      obj.size = states.size;
      obj.name = file;
      obj.path = path + '/' + file;
      filesList.push(obj);
    }
  }
}

function getDirFiles(path) {
  const filesList = [];
  readFile(path, filesList);
  return filesList;
}

function getFileName(path) {
  const pathList = path.split('/');
  const fileName = pathList[pathList.length - 1];
  return fileName;
}

function getFileContent(filePath, cb) {
  fs.readFile(filePath, function(err, buf) {
    cb(err, buf);
  });
}

function writeFileAsync(filePath, text, cb) {
  fs.writeFile(filePath, text, function(err) {
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
function sha256(str) {
  return crypto
    .createHash('sha256')
    .update(str)
    .digest('hex');
}

function encode(content, cryptkey) {
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

function decode(content, cryptkey) {
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

function fileCrypto(inFilePath, outFilePath, secretKey, mode) {
  fileUtil.getFileContent(inFilePath, (err, content) => {
    if (err) {
      console.error('get file error:', err);
      return null;
    }
    fileUtil.writeFileSync(outFilePath, cryptoUtil[mode](content, secretKey));
  });
}

const encodeFile = (...args) => fileCrypto(...args, 'encode');
const decodeFile = (...args) => fileCrypto(...args, 'decode');

const cryptoUtil = {
  sha256,
  encode,
  decode,
  encodeFile,
  decodeFile,
};
exports.cryptoUtil = cryptoUtil;

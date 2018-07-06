const path = require('path');
const { cryptoUtil } = require('./utils/index');

const args = process.argv.splice(2);
const argMap = args.reduce((o, a) => {
  const [k, v] = a.split('=');
  o[k] = v;
  return o;
}, {});

const secretKey = argMap.sk;

if (!secretKey) {
  throw new Error('no secretKey provided!');
}
if (secretKey.length !== 16) {
  throw new Error('secretKey length must be 16!');
}

// 加密配置文件
cryptoUtil.encodeFile(
  path.join(__dirname, './my-config.js'),
  path.join(__dirname, './config.aes'),
  secretKey,
);
// 解密配置文件
// cryptoUtil.decodeFile(
//   path.join(__dirname, './config.aes'),
//   path.join(__dirname, './config.js'),
//   secretKey,
// );

import { cryptoUtil } from '.';
import path from 'path';

interface IArg {
  sk: string;
  de?: boolean;
}
const args = process.argv.splice(2);
const argMap: IArg = args.reduce((o, a) => {
  const [k, v] = a.split('=');
  o[k] = v;
  return o;
}, {} as any);

const secretKey = argMap.sk;

if (!secretKey) {
  throw new Error('no secretKey provided!');
}
if (secretKey.length !== 16) {
  throw new Error('secretKey length must be 16!');
}

// npm run decode -- sk=secretKey
if (argMap.de) {
  // 解密配置文件
  cryptoUtil.decodeFile(
    path.join(__dirname, '../config/config.aes'),
    path.join(__dirname, '../config/config.ts'),
    secretKey,
  );
} else {
  // 加密配置文件
  cryptoUtil.encodeFile(
    path.join(__dirname, '../config/my-config.ts'),
    path.join(__dirname, '../config/config.aes'),
    secretKey,
  );
}

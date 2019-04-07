import config from '../config';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  email: string;
  password?: string;
}

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, config.TOKEN_KEY, { expiresIn: config.TOKEN_TIME });
}

export function verifyToken(token: string) {
  return jwt.verify(token, config.TOKEN_KEY, { maxAge: config.TOKEN_TIME });
}

export function checkToken(token: string) {
  try {
    // const decoded = verifyToken(token) as TokenPayload;
    // // console.log('过期时间:', getTime(decoded.expireTime));
    // const now = Math.floor(Date.now() / 1000);
    // // console.log('当前时间:', getTime(Date.now()));
    // return Number(decoded.expireTime) > now;
    return verifyToken(token);
  } catch (err) {
    console.log('token error:', err);
  }
}

// function getToken(ctx) {
//   // const authHeader = req.headers && req.headers.authorization;
//   // if (!authHeader) {
//   //   return false;
//   // }

//   // const [type, token] = authHeader.split(' ');
//   // if (type !== 'Bearer') {
//   //   log.warn('auth type 不是 Bearer');
//   //   return false;
//   // }
//   const token = ctx.cookies.get('token');
//   if (!token) {
//     return false;
//   }

//   return token;
// }

// function checkAuth(ctx) {
//   const token = getToken(ctx);
//   if (!token) {
//     return false;
//   }
//   return checkToken(token);
// }

const jwt = require('jsonwebtoken');
const config = require('../config');
const log = require('../log');

function generateToken(data) {
  return jwt.sign(data, config.AUTH.secretKey);
}

function verifyToken(token) {
  return jwt.verify(token, config.AUTH.secretKey);
}

function getTime(tmp) {
  var time = new Date(tmp);
  var y = time.getFullYear(); //年
  var m = time.getMonth() + 1; //月
  var d = time.getDate(); //日
  var h = time.getHours(); //时
  var mm = time.getMinutes(); //分
  var s = time.getSeconds(); //秒
  return (y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s);
}

function checkToken(token) {
  try {
    const decoded = verifyToken(token);
    // console.log('过期时间:', getTime(decoded.expireTime * 1000));
    const now = Math.floor(Date.now() / 1000);
    // console.log('当前时间:', getTime(Date.now()));
    return decoded.expireTime > now;
  } catch (err) {
    log.warn('token 错误', err);
  }
}

function getToken(ctx) {
  // const authHeader = req.headers && req.headers.authorization;
  // if (!authHeader) {
  //   return false;
  // }

  // const [type, token] = authHeader.split(' ');
  // if (type !== 'Bearer') {
  //   log.warn('auth type 不是 Bearer');
  //   return false;
  // }
  const token = ctx.cookies.get('token');
  if (!token) {
    return false;
  }

  return token;
}

function checkAuth(ctx) {
  const token = getToken(ctx);
  if (!token) {
    return false;
  }
  return checkToken(token);
}

module.exports = {
  generateToken,
  verifyToken,
  checkAuth,
  getToken,
};

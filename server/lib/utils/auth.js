const jwt = require('jsonwebtoken');
const config = require('../config');
const log = require('../log');

function generateToken(data) {
  return jwt.sign(data, config.AUTH.secretKey);
}

function verifyToken(token) {
  return jwt.verify(token, config.AUTH.secretKey);
}

function checkToken(token) {
  try {
    const decoded = verifyToken(token);
    console.log('decoded.expireTime:', decoded.expireTime);
    const now = Math.floor(Date.now() / 1000);
    console.log('now:', now);
    if (decoded.expireTime > Math.floor(Date.now() / 1000)) {
      return true;
    }
  } catch (err) {
    log.warn('token 错误', err);
  }
}

function getToken(req) {
  const authHeader = req.headers && req.headers.authorization;
  if (!authHeader) {
    return false;
  }

  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') {
    log.warn('auth type 不是 Bearer');
    return false;
  }

  return token;
}

function checkAuth(req) {
  return checkToken(getToken(req));
}

module.exports = {
  generateToken,
  verifyToken,
  checkAuth,
  getToken,
};

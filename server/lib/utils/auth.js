const jwt = require('jsonwebtoken');
const config = require('../config');
const log = require('../log');

function getToken(data) {
  return jwt.sign(data, config.AUTH.secretKey);
}

function checkToken(token) {
  try {
    const decoded = jwt.verify(token, config.AUTH.secretKey);
    if (decoded.expireTime > Math.floor(Date.now() / 1000)) {
      return true;
    }
  } catch (err) {
    log.warn('token 错误', err)
  }
}

function checkAuth(req) {
  const authHeader = req.headers && req.headers.authorization;
  if (!authHeader) {
    return false;
  }

  const [type, token] = authHeader.split(' ');
  if (type === 'Bearer') {
    return checkToken(token);
  }
  log.warn('auth type 不是 Bearer');
  return false;
}

module.exports = {
  getToken,
  checkAuth,
};


const log = require('../log');

module.exports = ({ ctx, msg = '服务器内部错误' }) => err => {
  log.error(err.message);
  // ctx.throw(500, msg);
}
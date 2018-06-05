const qn = require('qn');
const config = require('../config');
const { handleError, handleResult } = require('../utils/handle');
 
const client = qn.create(config.UPLOAD);

exports.getToken = async ctx => {
  client.uploadToken();

  handleResult({
    ctx,
    result: client.uploadToken(),
    success: '获取uploadToken成功',
    fail: '获取uploadToken失败',
  })
}

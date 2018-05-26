exports.handleError = ({ ctx, msg = '请求失败', error }) => {
  ctx.body = { code: 0, msg, error };
}

exports.handleSuccess = ({ ctx, msg = '请求成功', result }) => {
  ctx.body = { code: 1, msg, result };
}
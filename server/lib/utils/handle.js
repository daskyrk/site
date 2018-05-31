exports.handleError = ({ ctx, msg = '请求失败', error = null }) => {
  ctx.body = { code: 0, msg, error };
};

exports.handleSuccess = ({ ctx, msg = '请求成功', result }) => {
  ctx.body = { code: 1, msg, result };
};

exports.handleResult = ({
  ctx,
  data: result,
  deal,
  error = null,
  success = '请求成功',
  fail = '请求失败',
}) => {
  if (data) {
    ctx.body = {
      code: 1,
      msg: success,
      result: typeof deal === 'function' ? deal(data) : data,
    };
  } else {
    ctx.body = { code: 0, msg: fail, error };
  }
};

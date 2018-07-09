exports.handleError = ({ ctx, msg = '请求失败', error }) => {
  ctx.body = { code: 0, msg, error };
};

exports.handleSuccess = ({ ctx, msg = '请求成功', result }) => {
  ctx.body = { code: 1, msg, result };
};

exports.handleResult = ({
  ctx,
  result: data,
  deal,
  error,
  success = '请求成功',
  fail = '请求失败',
}) => {
  if (data !== undefined) {
    ctx.body = {
      code: 1,
      msg: success,
      result: typeof deal === 'function' ? deal(data) : data,
    };
  } else {
    ctx.body = { code: 0, msg: fail, error };
  }
};

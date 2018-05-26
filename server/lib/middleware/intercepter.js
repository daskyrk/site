

module.exports = async (ctx, next) => {
  // 测试一下过滤：不允许OPTION请求
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 200;
    ctx.body = 'OPTIONS method not allowed!';
    // ctx.response.status(500).json({code: 0, message: err.message, err})
    return false;// 直接return的话，不调用next，就不会走后面的中间件了
  }

  await next();
}
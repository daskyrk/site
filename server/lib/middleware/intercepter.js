const { checkAuth } = require('../utils/auth');

module.exports = async (ctx, next) => {
  // 拦截器
  const allowedOrigins = ['file://'];
  const origin = ctx.request.headers.origin || '';
  if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
    ctx.set('Access-Control-Allow-Origin', origin);
  }

  ctx.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers':
      'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
    'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
    'Access-Control-Max-Age': '1728000',
    'Content-Type': 'application/json;charset=utf-8',
    'X-Powered-By': 'my_blog 1.0.0',
  });

  // OPTIONS
  if (ctx.request.method == 'OPTIONS') {
    ctx.status = 200;
    return false;
  }

  const url = ctx.request.url;
  const method = ctx.request.method;
  // TODO: add more
  if (
    !(url.startsWith('/api/article') && method === 'GET') &&
    url !== '/api/login' &&
    (url !== '/api/user' && method === 'GET')
  ) {
    const hasAuth = checkAuth(ctx);
    if (!hasAuth) {
      ctx.status = 401;
      // ctx.set('WWW-Authenticate', 'Bearer realm="admin"');
      ctx.body = '没有权限';
      return false;
    }
  }

  await next();
};

const config = require('../config');
const { checkAuth } = require('../utils/auth');

module.exports = async (ctx, next) => {
  // 拦截器
  const allowedOrigins = ['file://', 'http://lijun.space'];
  const { origin = '', referer = '' } = ctx.request.headers;
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

  // 如果是生产环境，需要验证请求来源渠道，防止非正常请求
  if (Object.is(process.env.NODE_ENV, 'production')) {
    if (origin !== 'file://') {
      const site = config.APP.site;
      const originVerified = origin.includes(site) && referer.includes(site);
      if (!originVerified) {
        ctx.throw(403, { code: 0, message: '身份验证失败！' });
        return false;
      }
    }
  }

  const url = ctx.request.url;
  const method = ctx.request.method;

  // 有admin前缀的需要登录
  if (url.startsWith('/api/admin')) {
    const hasAuth = checkAuth(ctx);
    if (!hasAuth) {
      ctx.status = 401;
      // ctx.set('WWW-Authenticate', 'Bearer realm="admin"');
      ctx.body = '没有权限';
      return false;
    }
    ctx.isAdmin = true;
  }
  ctx.isAdmin = false;

  await next();
};

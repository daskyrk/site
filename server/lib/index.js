'use strict';

const Koa = require('koa');
const koaBody = require('koa-body');
const helmet = require('koa-helmet');
// const cors = require('koa-cors')
const mongoosePaginate = require('mongoose-paginate');

const log = require('./log');
const mongodb = require('./mongodb');
const router = require('./route');
const config = require('./config');
const intercepter = require('./middleware/intercepter');

// log.info('config: \n', JSON.stringify(config, null, 2));
mongodb.connect(config.MONGODB);

mongoosePaginate.paginate.options = {
  limit: config.APP.limit,
};

const app = new Koa();

// log request time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  log.info(`${ctx.method} ${ctx.url} - ${ms}`);
});
// 请求按中间件注册顺序执行，所以先做请求过滤、权限校验等可以提前返回的
app.use(intercepter);

// use middleware
app.use(helmet());
app.use(
  koaBody({
    jsoinLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb',
  }),
);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log('error:', error.message);
    ctx.body = { code: 0, msg: '服务器内部错误' };
  }
});

app.use(router.routes());

app.listen(config.APP.port);
log.info(`server started on port: ${config.APP.port}`);

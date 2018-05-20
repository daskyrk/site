'use strict';

const Koa = require('koa');
const koaBody = require('koa-body')
const helmet = require('koa-helmet')
// const cors = require('koa-cors')
const mongoosePaginate = require('mongoose-paginate')

const mongodb = require('./mongodb');
const config = require('./config')

console.log('config: \n', JSON.stringify(config, null, 2));
mongodb.connect(config.MONGODB);

const app = new Koa();
// use middleware
app.use(helmet())
app.use(koaBody({
  jsoinLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
}))


app.use(async ctx => {
  ctx.body = 'Hello World';
});

// log request time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.listen(config.APP.port);
console.log(`server started on port: ${config.APP.port}`);
const Article = require('../model/article');

exports.getArts = async (ctx) => {
  const result = await Article
    .paginate()
    .catch(err => ctx.throw(500, '服务器内部错误'))
  ctx.body = JSON.stringify(result);
}

exports.saveArt = (ctx) => {
  console.log('ctx.request.body:', ctx.request);
  const result = new Article(ctx.request.body).save();
  if (result) {// result is a promise
    ctx.body = 'you saved art success! :)' + result;
  }
}
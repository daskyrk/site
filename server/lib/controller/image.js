const logError = require('../utils/logError');
const Images = require('../model/image');
const { handleResult } = require('../utils/handle');

exports.getImages = async ctx => {
  const { pageNo = 1, pageSize = 20, articleId, filename } = ctx.query;
  const query = {};
  const options = {
    page: Number(pageNo),
    limit: Number(pageSize),
  };

  if (articleId !== undefined) {
    query.articleId = articleId;
  }

  if (filename !== undefined) {
    query.filename = filename;
  }

  const result = await Images.paginate(query, options).catch(logError({ ctx }));

  handleResult({
    ctx,
    result,
    success: '获取图片列表成功',
    fail: '获取图片列表失败',
    deal: data => ({
      total: result.total,
      list: result.docs,
    }),
  });
};

exports.addImage = async ctx => {
  const { filename, url, timestamp, articleId, ...extra } = ctx.request.body;

  const result = await new Images({
    filename,
    url,
    timestamp,
    articleId,
    extra,
  })
    .save()
    .catch(logError({ ctx }));

  handleResult({
    ctx,
    result,
    success: '添加图片记录成功',
    fail: '添加图片记录失败',
  });
};

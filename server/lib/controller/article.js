const logError = require('../utils/logError');
const Article = require('../model/article');
const { handleError, handleResult } = require('../utils/handle');

exports.getArts = async ctx => {
  const { pageNo = 1, pageSize = 10, keyword, tag } = ctx.query;
  const querys = {};
  const options = {
    page: Number(pageNo),
    limit: Number(pageSize),
  };

  // 关键词查询
  if (keyword) {
    const keywordReg = new RegExp(keyword)
    querys['$or'] = [
      { 'title': keywordReg },
      { 'content': keywordReg },
      { 'description': keywordReg }
    ]
  }

  if (tag) {
    querys.tags = tag;
  }

  const result = await Article.paginate(querys, options).catch(
    logError({ ctx }),
  );

  handleResult({
    ctx,
    result,
    success: '获取文章列表成功',
    fail: '获取文章列表失败',
    deal: data => ({
      total: data.total,
      list: data.docs,
    }),
  });
};

exports.getArt = async ctx => {
  const id = ctx.params.id;
  if (!id) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }
  const result = await Article.findById(id).catch(logError({ ctx }));

  if (result) {
    result.meta.views += 1;
    result.save();
  }

  handleResult({
    ctx,
    result,
    success: '获取文章详情成功',
    fail: '获取文章详情失败',
  });
};

exports.addArt = async ctx => {
  const result = await new Article(ctx.request.body)
    .save()
    .catch(logError({ ctx }));

  handleResult({
    ctx,
    result,
    success: '添加文章成功',
    fail: '添加文章失败',
  });
};

exports.updateArt = async ctx => {
  const id = ctx.params.id;
  if (!id) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }

  const result = await Article.findByIdAndUpdate(id, ctx.request.body).catch(
    logError({ ctx }),
  );

  handleResult({
    ctx,
    result,
    success: '更新文章成功',
    fail: '更新文章失败',
  });
};

exports.delArt = async ctx => {
  const id = ctx.params.id;
  if (!id) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }

  const result = await Article.findByIdAndRemove(id).catch(logError({ ctx }));
  handleResult({
    ctx,
    result,
    success: '删除文章成功',
    fail: '删除文章失败',
  });
};

exports.likeArt = async ctx => {
  const id = ctx.params.id;
  if (!id) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }

  const result = await Article.findById(id).catch(logError({ ctx }));
  if (result) {
    result.meta.likes += 1;
    result.save();
  }
  handleResult({
    ctx,
    result,
    success: '喜欢文章成功',
    fail: '喜欢文章失败',
  });
};

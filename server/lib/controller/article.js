const logError = require('../utils/logError');
const Article = require('../model/article');
const { handleError, handleResult } = require('../utils/handle');

exports.getArts = async ctx => {
  const {
    pageNo = 1,
    pageSize = 10,
    keyword,
    tag,
    state,
    public,
    type,
    startAt,
    endAt,
    hot,
  } = ctx.query;
  const querys = {};
  const options = {
    sort: { createdAt: -1 },
    page: Number(pageNo),
    limit: Number(pageSize),
    select: '-content -__v',
    populate: ['tag'],
  };

  // 关键词查询
  if (keyword !== undefined) {
    const keywordReg = new RegExp(keyword);
    querys['$or'] = [
      { title: keywordReg },
      { content: keywordReg },
      { description: keywordReg },
    ];
  }

  if (tag !== undefined) {
    querys.tags = tag;
  }

  if (state !== undefined) {
    querys.state = state;
  }

  if (public !== undefined) {
    querys.public = public;
  }

  const startTime = new Date(startAt);
  if (startTime.toString() !== 'Invalid Date') {
    querys.createdAt = {
      $gte: startTime,
    };
  }

  const endTime = new Date(endAt);
  if (endTime.toString() !== 'Invalid Date') {
    querys.createdAt = querys.createdAt || {};
    querys.createdAt.$lt = endTime;
  }

  // 按热度排行
  if (hot) {
    options.sort = {
      'meta.views': -1,
      'meta.likes': -1,
      'meta.comments': -1
    }
  }

  // 非后台请求 重置查询参数
  if (!ctx.isAdmin) {
    querys.state = 1;
    querys.public = true;
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

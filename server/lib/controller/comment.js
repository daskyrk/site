const logError = require('../utils/logError');
const Comment = require('../model/comment');
const Article = require('../model/article');
const { handleError, handleResult } = require('../utils/handle');

exports.getComments = async ctx => {
  const { pageNo = 1, pageSize = 20, articleId, state } = ctx.query;
  const query = {};
  const options = {
    page: Number(pageNo),
    limit: Number(pageSize),
  };

  if (articleId !== undefined) {
    query.articleId = articleId;
  }

  if (state !== undefined && [1, 2, 3].includes(state)) {
    query.state = state;
  }

  const result = await Comment.paginate(query, options).catch(
    logError({ ctx }),
  );

  handleResult({
    ctx,
    result,
    success: '获取评论列表成功',
    fail: '获取评论列表失败',
    deal: data => ({
      total: result.total,
      list: result.docs,
    }),
  });
};

exports.addComment = async ctx => {
  const articleId = ctx.request.body.articleId;

  const result = await new Comment(ctx.request.body)
    .save()
    .catch(logError({ ctx }));

  const article = await Article.findById(articleId).catch(logError({ ctx }));
  if (article) {
    article.meta.comments++;
    article.save();
  }

  handleResult({
    ctx,
    result,
    success: '发布评论成功',
    fail: '发布评论失败',
  });
};

exports.likeComment = async ctx => {
  const id = ctx.params.id;
  if (!id) {
    handleError({
      ctx,
      msg: '无效的参数',
    });
  }

  const result = await Comment.findById(id).catch(logError({ ctx }));
  if (result) {
    result.likes += 1;
    result.save();
  }
  handleResult({
    ctx,
    result,
    success: '点赞评论成功',
    fail: '点赞评论失败',
  });
};

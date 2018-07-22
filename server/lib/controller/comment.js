const config = require('../config');
const logError = require('../utils/logError');
const Comment = require('../model/comment');
const Article = require('../model/article');
const { handleError, handleResult } = require('../utils/handle');
const { sendMail } = require('../utils/email');

exports.getComments = async ctx => {
  const { pageNo = 1, pageSize = 20, articleId, state } = ctx.query;
  const query = {};
  const options = {
    sort: { createdAt: -1 },
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

  const { pageUrl, ...comment } = ctx.request.body;

  const result = await new Comment(comment).save().catch(logError({ ctx }));
  if (result) {
    // 发布成功后，向网站主及被回复者发送邮件提醒，并更新网站聚合
    sendMailToAdminAndTargetUser(result, pageUrl);
  }

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

// 邮件通知网站主及目标对象
const sendMailToAdminAndTargetUser = (comment, permalink) => {
  sendMail({
    to: config.APP.mail,
    subject: '博客有新的留言',
    text: `来自 ${comment.author.name} 的留言：${comment.content}`,
    html: `<p> 来自 ${comment.author.name} 的留言：${
      comment.content
    }</p><br><a href="${permalink}" target="_blank">[ 点击查看 ]</a>`,
  });
  if (comment.pid) {
    Comment.findOne({ id: comment.pid }).then(parentComment => {
      sendMail({
        to: parentComment.author.email,
        subject: `你在http://${config.APP.site}有新的评论回复`,
        text: `来自 ${comment.author.name} 的评论回复：${comment.content}`,
        html: `<p> 来自${comment.author.name} 的评论回复：${
          comment.content
        }</p><br><a href="${permalink}" target="_blank">[ 点击查看 ]</a>`,
      });
    });
  }
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

const geoip = require('geoip-lite');
const config = require('../config');
const logError = require('../utils/logError');
const Comment = require('../model/comment');
const Article = require('../model/article');
const { handleError, handleResult } = require('../utils/handle');
const { sendMail } = require('../utils/email');

exports.getComments = async ctx => {
  const { pageNo = 1, pageSize = 20, postId, state } = ctx.query;
  const query = {};
  const options = {
    sort: { createdAt: -1 },
    page: Number(pageNo),
    limit: Number(pageSize),
    select: '-state -ip',
  };

  if (postId !== undefined) {
    query.postId = postId;
  }

  query.state = 1;

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
  const postId = ctx.request.body.postId;

  const { pageUrl, ...comment } = ctx.request.body;

  // 获取ip地址以及物理地理地址
  const ip = (
    ctx.req.headers['x-forwarded-for'] ||
    ctx.req.headers['x-real-ip'] ||
    ctx.req.connection.remoteAddress ||
    ctx.req.socket.remoteAddress ||
    ctx.req.connection.socket.remoteAddress ||
    ctx.req.ip ||
    ctx.req.ips[0]
  ).replace('::ffff:', '');
  comment.ip = ip;
  comment.agent = ctx.headers['user-agent'] || comment.agent;

  const ip_location = geoip.lookup(ip);

  if (ip_location) {
    console.log('ip_location:', ip_location);
    comment.city = ip_location.city;
    comment.range = ip_location.range;
    comment.country = ip_location.country;
  }

  const result = await new Comment(comment).save().catch(logError({ ctx }));
  if (result) {
    // 发布成功后，向网站主及被回复者发送邮件提醒，并更新网站聚合
    sendMailToAdminAndTargetUser(result, pageUrl);
  }

  const article = await Article.findById(postId).catch(logError({ ctx }));
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

exports.getCommentsForAdmin = async ctx => {
  const {
    pageNo = 1,
    pageSize = 10,
    keyword,
    postId,
    state,
    startAt,
    endAt,
  } = ctx.query;
  console.log('ctx.query:', ctx.query);
  const querys = {};
  const options = {
    sort: { createdAt: -1 },
    page: Number(pageNo),
    limit: Number(pageSize),
  };

  // 关键词查询
  if (typeof keyword === 'string' && keyword.length) {
    const keywordReg = new RegExp(keyword);
    querys['$or'] = [
      { content: keywordReg },
      { 'author.name': keywordReg },
    ];
  }


  if (postId !== undefined) {
    querys.postId = postId;
  }

  if (state !== undefined && ['1', '2', '3'].includes(state)) {
    querys.state = +state;
  }

  const startTime = new Date(+startAt);
  if (startTime.toString() !== 'Invalid Date') {
    querys.createdAt = {
      $gte: startTime,
    };
  }

  const endTime = new Date(+endAt);
  if (endTime.toString() !== 'Invalid Date') {
    querys.createdAt = querys.createdAt || {};
    querys.createdAt.$lt = endTime;
  }

  const result = await Comment.paginate(querys, options).catch(
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

exports.updateComment = async ctx => {
  const { id, state } = ctx.request.body;

  const result = await Comment.findByIdAndUpdate(id, { state }).catch(
    logError({ ctx }),
  );

  handleResult({
    ctx,
    result,
    success: '更新评论成功',
    fail: '更新评论失败',
  });
};
